// One-time backfill of students.last_name (migration 0035) through the console
// bridge, for covered students who signed in before the console returned last
// names. New sign-ins write it themselves (api/school-login.ts,
// api/mint-session.ts), so this runs once, by hand, after 0035 is applied and
// the console's student-last-names function is deployed.
//
//   curl -X POST https://app.pathwayed.org/api/backfill-last-names \
//        -H "Authorization: Bearer $CRON_SECRET"              (dry run: counts only)
//   curl -X POST "https://app.pathwayed.org/api/backfill-last-names?apply=1" \
//        -H "Authorization: Bearer $CRON_SECRET"              (writes)
//
// Dry run by default. The response is counts only, never names. Safe to run
// again: it only touches covered students whose last_name is still null, and a
// student the console no longer lists is left alone.
import { createClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { requireCronSecret } from "./require-auth.js"
import { deanPost, type LastNamesResponse } from "./school-bridge.js"

const BATCH = 500

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" })
  if (!requireCronSecret(req, res)) return

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) return res.status(500).json({ error: "not_configured" })
  const apply = req.query.apply === "1"
  const svc = createClient(supabaseUrl, serviceKey)

  const { data, error } = await svc
    .from("students")
    .select("id, school_id, dean_student_id")
    .eq("school_covered", true)
    .is("last_name", null)
    .not("dean_student_id", "is", null)
    .not("school_id", "is", null)
  if (error) {
    console.error("backfill-last-names read failed:", error.message)
    return res.status(500).json({ error: "read_failed" })
  }

  // school id -> (dean student id -> local student id)
  const bySchool = new Map<string, Map<string, string>>()
  for (const s of (data ?? []) as { id: string; school_id: string; dean_student_id: string }[]) {
    const m = bySchool.get(s.school_id) ?? new Map<string, string>()
    m.set(s.dean_student_id.toLowerCase(), s.id)
    bySchool.set(s.school_id, m)
  }

  let found = 0
  let written = 0
  let noLastName = 0
  const failures: string[] = []
  for (const [schoolId, ids] of bySchool) {
    const deanIds = [...ids.keys()]
    for (let i = 0; i < deanIds.length; i += BATCH) {
      const r = await deanPost<LastNamesResponse>("student-last-names", {
        school_id: schoolId,
        student_ids: deanIds.slice(i, i + BATCH),
      })
      if (!r.ok) {
        failures.push(`${schoolId}: ${r.error} (${r.status})`)
        continue
      }
      for (const s of r.data.students ?? []) {
        const localId = ids.get(s.student_id.toLowerCase())
        if (!localId) continue
        const last = (s.last_name ?? "").trim()
        if (!last) {
          noLastName++
          continue
        }
        found++
        if (!apply) continue
        const upd = await svc
          .from("students")
          .update({ last_name: last })
          .eq("id", localId)
          .eq("school_covered", true)
          .is("last_name", null)
        if (upd.error) failures.push(`${localId}: ${upd.error.message}`)
        else written++
      }
    }
  }

  return res.status(200).json({
    mode: apply ? "applied" : "dry_run",
    covered_without_last_name: data?.length ?? 0,
    schools: bySchool.size,
    last_names_found: found,
    roster_name_is_one_word: noLastName,
    written,
    failures,
  })
}
