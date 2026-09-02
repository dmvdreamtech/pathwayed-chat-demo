// Vercel Cron: app-managed trial emails.
//
//   Day 5 (≈2 days left)  -> "2 days left in your PathwayEd trial"
//   Day 7 (trial ended)   -> "Your PathwayEd trial has ended" + flip to 'expired'
//
// Mirrors the discipline console's send-email cron: raw Resend HTTP (no SDK dep),
// the service role for DB access, and graceful degradation — if the email
// provider isn't configured the run is a no-op that reports what it WOULD send,
// so a missing key never throws. Each send is stamped on the profile so a mail
// fires at most once (idempotent across the every-few-hours cron cadence).
//
// Scheduling lives in vercel.json (crons). GET = Vercel cron; POST = manual flush.
//
// SCHOOL-COVERED ACCOUNTS ARE NEVER MAILED. Their school holds the license, so a
// trial countdown and an "asking you to subscribe" mail are both simply wrong —
// staff at a licensed school were receiving them. Coverage is decided by the SAME
// rule the access gate uses (hasCoveredStudent: an active student row carrying
// school_covered), imported rather than restated so the two can never drift.

import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { requireCronSecret } from "./require-auth.js"
import { hasCoveredStudent } from "../src/lib/schoolCoverage.js"

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const EMAIL_PROVIDER_API_KEY = process.env.EMAIL_PROVIDER_API_KEY
const EMAIL_FROM = process.env.EMAIL_FROM

const DAY_MS = 24 * 60 * 60 * 1000

interface TrialProfile {
  id: string
  display_name: string | null
  trial_end: string | null
}

interface RenderedEmail {
  subject: string
  html: string
  text: string
}

function shell(heading: string, bodyHtml: string, ctaLabel: string, ctaUrl: string): string {
  return `<!doctype html><html><body style="margin:0;background:#F7F2EA;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1C2230">
  <div style="max-width:520px;margin:0 auto;padding:28px 22px">
    <div style="background:#fff;border:1px solid #ECE4D8;border-radius:20px;padding:28px">
      <h1 style="font-size:20px;color:#003078;margin:0 0 12px">${heading}</h1>
      ${bodyHtml}
      <a href="${ctaUrl}" style="display:inline-block;margin-top:18px;background:#CC543C;color:#fff;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:999px">${ctaLabel}</a>
    </div>
    <p style="font-size:12px;color:#8A8F9C;text-align:center;margin:16px 0 0">PathwayEd · AI tutoring that meets your child where they are</p>
  </div></body></html>`
}

function reminderEmail(name: string | null, daysLeft: number, appUrl: string): RenderedEmail {
  const hi = name ? `Hi ${name},` : "Hi there,"
  const days = `${daysLeft} ${daysLeft === 1 ? "day" : "days"}`
  return {
    subject: `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left in your PathwayEd trial`,
    text: `${hi}\n\nYou have ${days} left in your PathwayEd free trial. Subscribe any time to keep your children's learning sessions and homework help going without interruption. Their progress is saved either way.\n\nSubscribe: ${appUrl}/settings\n\n— The PathwayEd team`,
    html: shell(
      `${days} left in your free trial`,
      `<p style="font-size:15px;line-height:1.55;margin:0">${hi}</p>
       <p style="font-size:15px;line-height:1.55;margin:10px 0 0">You have <b>${days}</b> left in your PathwayEd free trial. Subscribe any time to keep your children’s learning sessions and homework help going without interruption — their progress is saved either way.</p>`,
      "Subscribe now",
      `${appUrl}/settings`,
    ),
  }
}

function endedEmail(name: string | null, appUrl: string): RenderedEmail {
  const hi = name ? `Hi ${name},` : "Hi there,"
  return {
    subject: "Your PathwayEd trial has ended",
    text: `${hi}\n\nYour PathwayEd free trial has ended. Learning sessions and homework help are paused until you subscribe — but nothing has been deleted. Every child's saved progress is right where they left it.\n\nSubscribe to pick up where you left off: ${appUrl}/settings\n\n— The PathwayEd team`,
    html: shell(
      "Your free trial has ended",
      `<p style="font-size:15px;line-height:1.55;margin:0">${hi}</p>
       <p style="font-size:15px;line-height:1.55;margin:10px 0 0">Your PathwayEd free trial has ended. Learning sessions and homework help are paused until you subscribe — but <b>nothing has been deleted</b>. Every child’s saved progress is right where they left it.</p>`,
      "Subscribe to continue",
      `${appUrl}/settings`,
    ),
  }
}

async function sendEmail(to: string, mail: RenderedEmail): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${EMAIL_PROVIDER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: EMAIL_FROM, to, subject: mail.subject, html: mail.html, text: mail.text }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    throw new Error(`Email provider responded ${res.status}: ${detail.slice(0, 180)}`)
  }
}

/** Resolve the parent's email from Supabase Auth (profiles doesn't store it). */
async function emailFor(supabase: SupabaseClient, userId: string): Promise<string | null> {
  const { data, error } = await supabase.auth.admin.getUserById(userId)
  if (error) {
    console.warn(`[trial-emails] could not look up email for ${userId}: ${error.message}`)
    return null
  }
  return data.user?.email ?? null
}

/** Chunk size for the parent_id `in` filter, so a long candidate list cannot
 *  overflow the PostgREST request URL. */
const COVERAGE_BATCH = 200

interface CoverageRow {
  parent_id: string
  active: boolean
  school_covered: boolean
}

/**
 * Group student rows by account and ask the gate's own rule about each one.
 * Grouping is the only part of this that is not hasCoveredStudent itself, which
 * is why it is the only part written here. Exported for the unit test.
 */
export function coveredParentIds(rows: CoverageRow[]): Set<string> {
  const byParent = new Map<string, CoverageRow[]>()
  for (const row of rows) {
    const existing = byParent.get(row.parent_id)
    if (existing) existing.push(row)
    else byParent.set(row.parent_id, [row])
  }
  const covered = new Set<string>()
  for (const [parentId, students] of byParent) {
    if (hasCoveredStudent(students)) covered.add(parentId)
  }
  return covered
}

/**
 * Which of these accounts a school licence covers, read in batches.
 *
 * FAILS CLOSED — a read error returns null and the caller sends NOTHING. A
 * skipped run costs a reminder a few hours, and the same rows are still there on
 * the next pass because nothing is stamped until a mail goes out. Sending anyway
 * would mail a licensed school's staff about a bill they do not owe, which is the
 * exact failure this guard exists to prevent.
 */
async function coveredAccounts(
  supabase: SupabaseClient,
  parentIds: string[],
): Promise<Set<string> | null> {
  if (parentIds.length === 0) return new Set<string>()

  const rows: CoverageRow[] = []
  for (let i = 0; i < parentIds.length; i += COVERAGE_BATCH) {
    const { data, error } = await supabase
      .from("students")
      .select("parent_id, active, school_covered")
      .in("parent_id", parentIds.slice(i, i + COVERAGE_BATCH))
    if (error) {
      console.error("[trial-emails] could not read school coverage:", error.message)
      return null
    }
    rows.push(...((data ?? []) as CoverageRow[]))
  }
  return coveredParentIds(rows)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  // Vercel cron sends CRON_SECRET as a bearer token. Fails CLOSED: an unset secret
  // returns 503 rather than leaving this open (see requireCronSecret).
  if (!requireCronSecret(req, res)) return
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: "Server is missing Supabase configuration." })
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
  const now = new Date()
  const nowIso = now.toISOString()
  const twoDaysIso = new Date(now.getTime() + 2 * DAY_MS).toISOString()
  const origin = req.headers.origin || (req.headers.host ? `https://${req.headers.host}` : "")

  // Day-5 reminder: still on trial, ≤2 days left, not yet reminded.
  const { data: reminderRows, error: reminderErr } = await supabase
    .from("profiles")
    .select("id, display_name, trial_end")
    .eq("subscription_status", "free_trial")
    .is("trial_reminder_sent_at", null)
    .gt("trial_end", nowIso)
    .lte("trial_end", twoDaysIso)
  // Day-7 ended: still marked on trial but the window has closed, not yet emailed.
  const { data: endedRows, error: endedErr } = await supabase
    .from("profiles")
    .select("id, display_name, trial_end")
    .eq("subscription_status", "free_trial")
    .is("trial_ended_email_sent_at", null)
    .lte("trial_end", nowIso)

  if (reminderErr || endedErr) {
    const message = reminderErr?.message ?? endedErr?.message ?? "query failed"
    console.error("[trial-emails] could not read trial profiles:", message)
    return res.status(502).json({ error: "Could not read trial profiles", message })
  }

  const reminderCandidates = (reminderRows ?? []) as TrialProfile[]
  const endedCandidates = (endedRows ?? []) as TrialProfile[]

  // Drop school-covered accounts from BOTH lists before anything is counted or
  // sent, so the dry run below reports exactly what a live run would send. One
  // read covers both lists.
  //
  // A covered account keeps 'free_trial' forever — nothing is stamped and the
  // ended loop no longer flips it to 'expired' — so it re-appears as a candidate
  // on every run. That is deliberate (stamping a mail that never went out, or
  // marking a licensed account 'expired', would both be lies) and is why the
  // read below is batched rather than assuming a short list.
  const coveredIds = await coveredAccounts(
    supabase,
    [...new Set([...reminderCandidates, ...endedCandidates].map((p) => p.id))],
  )
  if (!coveredIds) {
    return res.status(502).json({ error: "Could not read school coverage" })
  }
  const reminders = reminderCandidates.filter((p) => !coveredIds.has(p.id))
  const ended = endedCandidates.filter((p) => !coveredIds.has(p.id))
  const skippedCovered =
    reminderCandidates.length - reminders.length + (endedCandidates.length - ended.length)

  const providerConfigured = Boolean(EMAIL_PROVIDER_API_KEY && EMAIL_FROM)

  if (!providerConfigured) {
    return res.status(200).json({
      provider_configured: false,
      reminder_candidates: reminders.length,
      ended_candidates: ended.length,
      school_covered_skipped: skippedCovered,
      message: "EMAIL_PROVIDER_API_KEY / EMAIL_FROM not set — no mail sent.",
    })
  }

  let remindersSent = 0
  let endedSent = 0
  let failed = 0

  for (const p of reminders) {
    try {
      const to = await emailFor(supabase, p.id)
      if (!to) {
        failed++
        continue
      }
      const daysLeft = p.trial_end
        ? Math.max(1, Math.ceil((Date.parse(p.trial_end) - now.getTime()) / DAY_MS))
        : 2
      await sendEmail(to, reminderEmail(p.display_name, daysLeft, origin))
      await supabase.from("profiles").update({ trial_reminder_sent_at: nowIso }).eq("id", p.id)
      remindersSent++
    } catch (err) {
      failed++
      console.error(`[trial-emails] reminder failed for ${p.id}:`, err instanceof Error ? err.message : err)
    }
  }

  for (const p of ended) {
    try {
      const to = await emailFor(supabase, p.id)
      // Flip to 'expired' regardless of email success so the account state is
      // truthful; stamp the email marker only when the mail actually went out.
      await supabase.from("profiles").update({ subscription_status: "expired" }).eq("id", p.id)
      if (!to) {
        failed++
        continue
      }
      await sendEmail(to, endedEmail(p.display_name, origin))
      await supabase.from("profiles").update({ trial_ended_email_sent_at: nowIso }).eq("id", p.id)
      endedSent++
    } catch (err) {
      failed++
      console.error(`[trial-emails] ended email failed for ${p.id}:`, err instanceof Error ? err.message : err)
    }
  }

  return res.status(200).json({
    provider_configured: true,
    reminders_sent: remindersSent,
    ended_sent: endedSent,
    school_covered_skipped: skippedCovered,
    failed,
  })
}
