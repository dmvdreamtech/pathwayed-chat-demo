// Vercel Cron: the weekly and monthly parent progress emails.
//
//   GET  /api/parent-emails?kind=weekly    Mondays 13:00 UTC, for last Monday to Sunday
//   GET  /api/parent-emails?kind=monthly   the 1st, 14:00 UTC, for last month
//   POST the same, by hand. Add &dry=1 for counts only.
//
// Who gets what is decided in api/parent-emails-core.ts (planEmails), which has
// the rules. This file reads, sends and logs:
//
//   1. parent_email_activity (migration 0036) for the period.
//   2. Guardian addresses for school-covered students, from the console's
//      guardian-contacts bridge, at send time. Only schools that turned
//      "Tutoring progress emails" on in console Settings return any. The
//      addresses are used for this run and never written anywhere.
//   3. parent_email_sends for this period (no repeats) and, for the monthly
//      email, weekly sends for overlapping weeks (never both).
//   4. email_suppressions for the candidate addresses, by hash.
//
// A run is a dry run, counts only, when ?dry=1, when the email provider is not
// configured, when UNSUBSCRIBE_SECRET is unset (every email must carry a
// working unsubscribe link), or when the period starts before
// PARENT_EMAILS_START_DATE (YYYY-MM-DD, New York time; missing or invalid means
// never). The response never contains an address or a name.
//
// Sends come from PARENT_EMAIL_FROM, or PathwayEd <updates@mail.pathwayed.org>.
import { createClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { requireCronSecret } from "./require-auth.js"
import { emailProviderConfigured, sendEmail } from "./email-core.js"
import { deanPost, type GuardianContactsResponse } from "./school-bridge.js"
import { sessionSkillSlugs } from "../src/lib/sessionSubject.js"
import {
  emailHash,
  planEmails,
  previousPeriod,
  renderParentEmail,
  startDateRefusal,
  unsubscribeUrl,
  type ActivityRow,
  type ParentEmailKind,
  type SentRow,
} from "./parent-emails-core.js"

const DEFAULT_FROM = "PathwayEd <updates@mail.pathwayed.org>"
const BRIDGE_BATCH = 500

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" })
  if (!requireCronSecret(req, res)) return

  const kind = req.query.kind
  if (kind !== "weekly" && kind !== "monthly") return res.status(400).json({ error: "kind must be weekly or monthly" })

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) return res.status(500).json({ error: "not_configured" })
  const svc = createClient(supabaseUrl, serviceKey)

  const secret = process.env.UNSUBSCRIBE_SECRET ?? ""
  const period = previousPeriod(kind as ParentEmailKind, new Date())
  const dryReasons = [
    req.query.dry === "1" && "dry=1",
    !emailProviderConfigured() && "email provider not configured",
    !secret && "UNSUBSCRIBE_SECRET not set",
    startDateRefusal(period, process.env.PARENT_EMAILS_START_DATE),
  ].filter(Boolean)
  const dry = dryReasons.length > 0

  // 1. Activity.
  const act = await svc.rpc("parent_email_activity", { p_from: period.from.toISOString(), p_to: period.to.toISOString() })
  if (act.error) {
    console.error("parent-emails activity failed:", act.error.message)
    return res.status(500).json({ error: "activity_failed" })
  }
  const rows = (act.data ?? []) as ActivityRow[]

  // 2. Guardian addresses for covered students, per school, from the console.
  const guardians = new Map<string, string[]>()
  const bySchool = new Map<string, string[]>()
  for (const r of rows) {
    if (!r.school_covered || !r.school_id || !r.dean_student_id) continue
    bySchool.set(r.school_id, [...(bySchool.get(r.school_id) ?? []), r.dean_student_id.toLowerCase()])
  }
  const bridgeFailures: string[] = []
  for (const [schoolId, ids] of bySchool) {
    for (let i = 0; i < ids.length; i += BRIDGE_BATCH) {
      const r = await deanPost<GuardianContactsResponse>("guardian-contacts", {
        school_id: schoolId,
        student_ids: ids.slice(i, i + BRIDGE_BATCH),
      })
      if (!r.ok) {
        bridgeFailures.push(`${schoolId}: ${r.error} (${r.status})`)
        continue
      }
      for (const s of r.data.students ?? []) guardians.set(s.student_id.toLowerCase(), s.emails ?? [])
    }
  }

  // 3. What was already sent.
  const sentRes = await svc
    .from("parent_email_sends")
    .select("student_id, kind, period_start, period_end")
    .or(
      `and(kind.eq.${kind},period_start.eq.${period.start}),` +
        `and(kind.eq.weekly,period_start.lte.${period.end},period_end.gte.${period.start})`,
    )
  if (sentRes.error) {
    console.error("parent-emails send log read failed:", sentRes.error.message)
    return res.status(500).json({ error: "send_log_failed" })
  }

  // 4. Unsubscribed addresses, by hash.
  const candidates = new Set<string>()
  for (const r of rows) if (r.account_email) candidates.add(emailHash(r.account_email))
  for (const list of guardians.values()) for (const g of list) candidates.add(emailHash(g))
  const suppressed = new Set<string>()
  const hashes = [...candidates]
  for (let i = 0; i < hashes.length; i += 200) {
    const sup = await svc.from("email_suppressions").select("email_hash").in("email_hash", hashes.slice(i, i + 200))
    if (sup.error) {
      console.error("parent-emails suppression read failed:", sup.error.message)
      return res.status(500).json({ error: "suppression_read_failed" })
    }
    for (const s of sup.data ?? []) suppressed.add(s.email_hash as string)
  }

  const plan = planEmails(period, rows, guardians, (sentRes.data ?? []) as SentRow[], suppressed)
  const summary = {
    kind,
    period: { start: period.start, end: period.end },
    mode: dry ? "dry_run" : "sent",
    dry_reasons: dryReasons,
    families: plan.length,
    to_paying_accounts: plan.filter((p) => p.recipientType === "account").length,
    to_school_guardians: plan.filter((p) => p.recipientType === "guardian").length,
    students: new Set(plan.flatMap((p) => p.children.map((c) => c.student_id))).size,
    unsubscribed_addresses: suppressed.size,
    schools_asked: bySchool.size,
    bridge_failures: bridgeFailures,
  }
  if (dry) return res.status(200).json(summary)

  // Session keys name skills by slug ("math:functions"); look the names up.
  const skillNames = new Map<string, string>()
  const slugs = sessionSkillSlugs(plan.flatMap((p) => p.children.flatMap((c) => c.subjects)))
  if (slugs.length) {
    const sk = await svc.from("skills").select("slug, name").in("slug", slugs)
    if (sk.error) console.error("parent-emails skill names read failed:", sk.error.message)
    for (const k of (sk.data ?? []) as { slug: string; name: string }[]) skillNames.set(k.slug, k.name)
  }

  // Send, then log each student once per recipient type.
  const from = process.env.PARENT_EMAIL_FROM || DEFAULT_FROM
  const template = kind === "weekly" ? "parent_weekly" : "parent_monthly"
  const logged = new Map<string, { type: "account" | "guardian"; n: number }>()
  let sent = 0
  let failed = 0
  for (const p of plan) {
    const unsub = unsubscribeUrl(p.to, secret)
    try {
      await sendEmail(p.to, renderParentEmail(period, p, unsub, skillNames), template, {
        from,
        headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
      })
      sent++
      for (const c of p.children) {
        const key = `${c.student_id}|${p.recipientType}`
        const l = logged.get(key) ?? { type: p.recipientType, n: 0 }
        l.n++
        logged.set(key, l)
      }
    } catch (e) {
      failed++
      // Never log the address.
      console.error(`parent-emails ${kind} send failed (${p.recipientType}, ${p.children.length} children):`, (e as Error).message)
    }
  }
  const logRows = [...logged].map(([key, l]) => ({
    student_id: key.split("|")[0],
    kind,
    period_start: period.start,
    period_end: period.end,
    recipient_type: l.type,
    recipients: l.n,
  }))
  if (logRows.length) {
    const ins = await svc.from("parent_email_sends").upsert(logRows, {
      onConflict: "student_id,kind,period_start,recipient_type",
      ignoreDuplicates: true,
    })
    if (ins.error) console.error("parent-emails send log write failed:", ins.error.message)
  }
  return res.status(200).json({ ...summary, emails_sent: sent, emails_failed: failed, students_logged: logRows.length })
}
