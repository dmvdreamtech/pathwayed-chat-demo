// Admissions-season email (manually triggered — NO cron schedule).
//
// Audience: parent accounts with a qualifying ACTIVE plan (Middle or High — the
// tiers that qualify for a 6-8 prep module) and at least one grade 6-8 child WITHOUT
// a prep entitlement. ONE email per account, regardless of child count. Idempotent:
// each send is stamped on the profile (admissions_season_email_sent_at, migration
// 0019) so a re-trigger never emails the same account twice.
//
// Mirrors api/trial-emails.ts exactly: sends through api/email-core.ts (raw Resend
// HTTP, no SDK dep, links built from the fixed APP_URL, and the school-domain guard
// applied on every send), the service role for DB access, and graceful degradation:
// if the email provider isn't configured the run is a no-op that reports what it
// WOULD send. A required dry-run mode reports the audience count WITHOUT sending
// or stamping anything.
//
// There is deliberately NO cron entry in vercel.json: this is triggered by hand
// when admissions season opens. GET and POST both work; guard with CRON_SECRET.

import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { requireCronSecret } from "./require-auth.js"
import { APP_URL, emailProviderConfigured, sendEmail, type RenderedEmail } from "./email-core.js"

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// Plans whose grade coverage reaches a 6-8 prep module (mirrors
// billing.PLAN_GRADES / planQualifiesForBand: Elementary K-5 is excluded).
const QUALIFYING_PLANS = ["middle", "high"]
const PREP_GRADES = ["6", "7", "8"]
const PRICE_LABEL = "$19/mo per student"

interface CandidateProfile {
  id: string
  display_name: string | null
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

function seasonEmail(name: string | null): RenderedEmail {
  const hi = name ? `Hi ${name},` : "Hi there,"
  return {
    subject: "Admissions test season is coming — HSPT & ISEE prep is built in",
    text: `${hi}

If your child might take the HSPT or ISEE this year, admissions test season is almost here. PathwayEd now has HSPT and ISEE prep built right into the tutoring your child already uses — the same Nikki, the same saved progress, with timed practice sections and a practice essay. It's ${PRICE_LABEL}, and you can add it to any child from your settings.

Add test prep: ${APP_URL}/settings

— The PathwayEd team`,
    html: shell(
      "Admissions test season is coming",
      `<p style="font-size:15px;line-height:1.55;margin:0">${hi}</p>
       <p style="font-size:15px;line-height:1.55;margin:10px 0 0">If your child might take the HSPT or ISEE this year, admissions test season is almost here. PathwayEd now has <b>HSPT and ISEE prep</b> built right into the tutoring your child already uses — the same Nikki, the same saved progress, with timed practice sections and a practice essay. It’s ${PRICE_LABEL}, and you can add it to any child from your settings.</p>`,
      "Add test prep",
      `${APP_URL}/settings`,
    ),
  }
}

/** Resolve the parent's email from Supabase Auth (profiles doesn't store it). */
async function emailFor(supabase: SupabaseClient, userId: string): Promise<string | null> {
  const { data, error } = await supabase.auth.admin.getUserById(userId)
  if (error) {
    console.warn(`[admissions-season-email] could not look up email for ${userId}: ${error.message}`)
    return null
  }
  return data.user?.email ?? null
}

/**
 * Compute the audience: qualifying active-plan accounts, not yet emailed, that have
 * at least one grade 6-8 child WITHOUT an active prep entitlement.
 */
async function computeAudience(
  supabase: SupabaseClient,
): Promise<{ audience: CandidateProfile[]; error?: string }> {
  // 1) Candidate accounts: active + qualifying plan + not yet emailed.
  const { data: profileRows, error: profileErr } = await supabase
    .from("profiles")
    .select("id, display_name")
    .eq("subscription_status", "active")
    .in("plan", QUALIFYING_PLANS)
    .is("admissions_season_email_sent_at", null)
  if (profileErr) return { audience: [], error: profileErr.message }
  const candidates = (profileRows ?? []) as CandidateProfile[]
  if (candidates.length === 0) return { audience: [] }

  const candidateIds = candidates.map((p) => p.id)

  // 2) Their grade 6-8 children.
  const { data: studentRows, error: studentErr } = await supabase
    .from("students")
    .select("id, parent_id, grade")
    .in("parent_id", candidateIds)
    .in("grade", PREP_GRADES)
  if (studentErr) return { audience: [], error: studentErr.message }
  const students = (studentRows ?? []) as { id: string; parent_id: string; grade: string }[]
  if (students.length === 0) return { audience: [] }

  // 3) Which of those children already have an active prep entitlement.
  const studentIds = students.map((s) => s.id)
  const { data: entRows, error: entErr } = await supabase
    .from("prep_entitlements")
    .select("student_id, status")
    .in("student_id", studentIds)
    .in("status", ["active", "past_due"])
  if (entErr) return { audience: [], error: entErr.message }
  const entitledStudentIds = new Set((entRows ?? []).map((r) => r.student_id as string))

  // 4) A parent qualifies if they have >=1 grade 6-8 child with NO active entitlement.
  const parentsWithUnentitledChild = new Set<string>()
  for (const s of students) {
    if (!entitledStudentIds.has(s.id)) parentsWithUnentitledChild.add(s.parent_id)
  }

  return { audience: candidates.filter((p) => parentsWithUnentitledChild.has(p.id)) }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  // Requires CRON_SECRET as a bearer token. Fails CLOSED: an unset secret returns
  // 503 rather than running this unauthenticated (see requireCronSecret).
  if (!requireCronSecret(req, res)) return
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: "Server is missing Supabase configuration." })
  }

  // Dry run: ?dryRun=1 (or {"dryRun":true}) reports the audience count WITHOUT
  // sending or stamping anything.
  const dryRun =
    req.query?.dryRun === "1" ||
    req.query?.dryRun === "true" ||
    (typeof req.body === "object" && req.body !== null && (req.body as { dryRun?: unknown }).dryRun === true)

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
  const nowIso = new Date().toISOString()

  const { audience, error } = await computeAudience(supabase)
  if (error) {
    console.error("[admissions-season-email] audience query failed:", error)
    return res.status(502).json({ error: "Could not read audience", message: error })
  }

  if (dryRun) {
    return res.status(200).json({
      dry_run: true,
      audience_count: audience.length,
      would_send: audience.length,
      message: `Dry run — ${audience.length} account(s) would receive the admissions-season email. Nothing sent.`,
    })
  }

  if (!emailProviderConfigured()) {
    return res.status(200).json({
      provider_configured: false,
      audience_count: audience.length,
      message: "EMAIL_PROVIDER_API_KEY / EMAIL_FROM not set — no mail sent.",
    })
  }

  let sent = 0
  let failed = 0
  for (const p of audience) {
    try {
      const to = await emailFor(supabase, p.id)
      if (!to) {
        failed++
        continue
      }
      // A school-domain address is refused inside sendEmail (billing template);
      // it lands in `failed` and is never stamped, so it is re-examined next run.
      await sendEmail(to, seasonEmail(p.display_name), "admissions_season")
      await supabase.from("profiles").update({ admissions_season_email_sent_at: nowIso }).eq("id", p.id)
      sent++
    } catch (err) {
      failed++
      console.error(`[admissions-season-email] send failed for ${p.id}:`, err instanceof Error ? err.message : err)
    }
  }

  return res.status(200).json({ provider_configured: true, audience_count: audience.length, sent, failed })
}
