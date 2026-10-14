import type { SupabaseClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { requireUser, requireOwnedStudent } from "./require-auth.js"
import { rateLimit, READINESS_LIMIT } from "./rate-limit.js"
import {
  buildReadinessUpserts,
  type ReadinessMasteryInput,
  type ReadinessSkillInput,
  type SatCatalogInput,
} from "../src/lib/readinessEngine.js"

/**
 * Recompute one student's readiness (Pathway score, subject scores, SAT
 * projection) and store it.
 *
 * WHY THIS IS A SERVER ROUTE. Readiness is a result shown to parents and schools,
 * and it used to be computed and upserted by the browser, so anyone could write
 * any score for their own child. Migration 0031 removed every browser write to
 * readiness_scores. The browser now only names the student; everything the score
 * is computed from is read here, with the service role, from columns the database
 * itself computes from graded answers.
 *
 * Request: POST { studentId }. The caller must own the student.
 * Response: 200 { written } where written is the number of rows stored (0 when
 * the student has no evidence yet, exactly as before).
 */
interface ReadinessRequest {
  studentId?: unknown
}

export async function recomputeReadiness(svc: SupabaseClient, studentId: string, now: number): Promise<number> {
  const { data: masteryRows, error: masteryError } = await svc
    .from("student_skill_mastery")
    .select("skill_id, status, evidence_accuracy, attempts_counted, last_practiced")
    .eq("student_id", studentId)
  if (masteryError) throw new Error(`mastery read failed: ${masteryError.message}`)
  const mastery = (masteryRows ?? []) as ReadinessMasteryInput[]
  if (!mastery.length) return 0

  const { data: skillRows, error: skillError } = await svc
    .from("skills")
    .select("id, name, subject, slug")
    .in(
      "id",
      mastery.map((m) => m.skill_id),
    )
  if (skillError) throw new Error(`skills read failed: ${skillError.message}`)

  // A failed SAT catalog read is logged, not fatal: pathway and subject rows
  // still store, which is how the browser version behaved.
  const { data: satCatalog, error: satError } = await svc
    .from("skills")
    .select("id, slug, name, subject, sat_alignment")
    .eq("level", "skill")
    .not("sat_alignment", "is", null)
  if (satError) console.error("readiness: SAT catalog read failed", satError.message)

  const upserts = buildReadinessUpserts(
    studentId,
    mastery,
    (skillRows ?? []) as ReadinessSkillInput[],
    (satCatalog ?? []) as SatCatalogInput[],
    now,
  )
  if (!upserts.length) return 0

  const { error } = await svc.from("readiness_scores").upsert(upserts, { onConflict: "student_id,readiness_type" })
  if (error) throw new Error(`readiness upsert failed: ${error.message}`)
  return upserts.length
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const auth = await requireUser(req, res)
  if (!auth) return

  const limited = rateLimit(`readiness:${auth.userId}`, READINESS_LIMIT)
  if (!limited.allowed) {
    res.setHeader("Retry-After", String(limited.retryAfterSec))
    return res.status(429).json({ error: "rate_limited", retry_after: limited.retryAfterSec })
  }

  const { studentId } = (req.body ?? {}) as ReadinessRequest
  if (!(await requireOwnedStudent(res, auth, studentId))) return

  try {
    const written = await recomputeReadiness(auth.svc, studentId as string, Date.now())
    return res.status(200).json({ written })
  } catch (error) {
    console.error("readiness recompute failed:", error)
    return res.status(500).json({ error: "readiness_failed" })
  }
}
