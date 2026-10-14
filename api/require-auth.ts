import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Server-side authentication for api/ endpoints.
 *
 * ONE MECHANISM COVERS ALL THREE IDENTITY PATHS, because they all converge on a
 * normal Supabase session:
 *
 *   B2C parent      — ordinary email/password sign-in.
 *   School SSO 9-12 — ordinary SSO sign-in; api/school-login.ts only ADDS coverage
 *                     to an already-authenticated user, it does not replace the auth.
 *   K-8 minted PIN  — api/mint-session.ts hand-signs an HS256 token with the project
 *                     SUPABASE_JWT_SECRET, carrying sub/role/aud/iss exactly as GoTrue
 *                     does, for a real auth user created via admin.createUser. The
 *                     client adopts it with supabase.auth.setSession (SchoolStation),
 *                     so it IS the session from then on.
 *
 * So getUser() validates all three. There is no separate code path to maintain and
 * no way for one of them to silently stop working: if a minted token stopped
 * validating, PIN login would already be broken everywhere else too.
 *
 * OWNERSHIP. students.parent_id is the auth uid in every path, including minted K-8
 * identities (mint-session sets parent_id to the minted uid), so a single
 * parent_id = uid check authorizes all three.
 */

export interface AuthedCaller {
  userId: string
  /** The VERIFIED account email, from the auth record. Never from a request body. */
  email: string | null
  /** Service-role client, already constructed. Reuse it rather than making another. */
  svc: SupabaseClient
}

/**
 * Guard a cron-triggered endpoint with the shared CRON_SECRET.
 *
 * FAILS CLOSED. The three cron endpoints previously guarded themselves with
 * `if (CRON_SECRET && header !== ...)`, which means an UNSET secret skipped the
 * check entirely and left the endpoint open to anyone. Those endpoints read every
 * profile in the database and send mail, so an unset environment variable silently
 * turned a private job into a public one. Missing configuration now returns 503 and
 * refuses to run, which is the only safe reading of "we do not know who is calling".
 *
 * On failure this SENDS the response and returns false, so a handler can
 * `if (!requireCronSecret(req, res)) return`.
 */
export function requireCronSecret(req: VercelRequest, res: VercelResponse): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    console.error("CRON_SECRET is not set; refusing to run a cron endpoint unauthenticated")
    res.status(503).json({ error: "cron_secret_not_configured" })
    return false
  }
  if (req.headers.authorization !== `Bearer ${secret}`) {
    res.status(401).json({ error: "Unauthorized" })
    return false
  }
  return true
}

/** Pull a bearer token from the Authorization header, or "" when absent. */
export function bearerToken(req: VercelRequest): string {
  const h = req.headers.authorization
  if (typeof h !== "string") return ""
  return h.toLowerCase().startsWith("bearer ") ? h.slice(7).trim() : ""
}

/**
 * Require an authenticated caller. On failure this SENDS the response (401/500)
 * and returns null, so a handler can simply `if (!auth) return`.
 *
 * Error codes are distinct on purpose so a production failure is diagnosable from
 * the client without leaking anything: missing_token (no header) vs invalid_token
 * (rejected by GoTrue) vs not_configured (server env missing).
 */
export async function requireUser(
  req: VercelRequest,
  res: VercelResponse,
): Promise<AuthedCaller | null> {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    res.status(500).json({ error: "not_configured" })
    return null
  }

  const token = bearerToken(req)
  if (!token) {
    res.status(401).json({ error: "missing_token" })
    return null
  }

  const svc = createClient(supabaseUrl, serviceKey)
  const { data, error } = await svc.auth.getUser(token)
  const userId = data?.user?.id
  if (error || !userId) {
    res.status(401).json({ error: "invalid_token" })
    return null
  }
  // A minted K-8 identity has a non-routable placeholder email; only real accounts
  // carry a usable one. Callers that need it must handle null.
  const email = data.user?.email?.trim().toLowerCase() || null
  return { userId, email, svc }
}

/**
 * Does this authenticated user own this student? Uses the service-role client
 * deliberately: RLS would also answer this, but reading it explicitly means the
 * check is visible in the handler rather than implied by a policy, and it returns
 * the same answer for a covered K-8 student as for a B2C child.
 *
 * Fails CLOSED: a read error returns false.
 */
export async function ownsStudent(
  svc: SupabaseClient,
  userId: string,
  studentId: string,
): Promise<boolean> {
  if (!studentId) return false
  const { data, error } = await svc
    .from("students")
    .select("id")
    .eq("id", studentId)
    .eq("parent_id", userId)
    .maybeSingle()
  if (error) {
    console.error("ownsStudent check failed", { error, userId, studentId })
    return false
  }
  return !!data
}

/**
 * Does this authenticated user own EVERY one of these students?
 *
 * One query, not N: select the ids that match both the id list and the owning uid,
 * then require the returned count to equal the requested count. A student that
 * does not exist and a student that belongs to someone else are indistinguishable
 * from the outside, which is deliberate.
 *
 * Fails CLOSED: a read error returns false, so an entitlement is never granted or
 * revoked on the strength of a failed check.
 */
export async function ownsAllStudents(
  svc: SupabaseClient,
  userId: string,
  studentIds: string[],
): Promise<boolean> {
  const ids = Array.from(new Set(studentIds.filter((s) => typeof s === "string" && s.length > 0)))
  if (!ids.length) return false
  const { data, error } = await svc
    .from("students")
    .select("id")
    .eq("parent_id", userId)
    .in("id", ids)
  if (error) {
    console.error("ownsAllStudents check failed", { error, userId, count: ids.length })
    return false
  }
  return (data?.length ?? 0) === ids.length
}

/**
 * Require that the caller owns every student named in the request. Sends 403 and
 * returns false otherwise, without revealing which id was the problem or whether
 * it exists at all.
 */
export async function requireOwnedStudents(
  res: VercelResponse,
  auth: AuthedCaller,
  studentIds: string[],
): Promise<boolean> {
  if (!(await ownsAllStudents(auth.svc, auth.userId, studentIds))) {
    res.status(403).json({ error: "not_your_student" })
    return false
  }
  return true
}

/**
 * Require that the caller owns the student named in the request. Sends 400/403 and
 * returns false when it does not hold.
 */
export async function requireOwnedStudent(
  res: VercelResponse,
  auth: AuthedCaller,
  studentId: unknown,
): Promise<boolean> {
  if (typeof studentId !== "string" || !studentId) {
    res.status(400).json({ error: "student_id_required" })
    return false
  }
  if (!(await ownsStudent(auth.svc, auth.userId, studentId))) {
    // Deliberately not 404: the caller is authenticated, they simply may not act
    // on this child. Never reveal whether the id exists.
    res.status(403).json({ error: "not_your_student" })
    return false
  }
  return true
}

/**
 * Require that the caller's account may use learning features right now: an
 * active school-covered child on the account, a paid plan, or a trial that has
 * not ended. The database decides (account_has_learning_access, migration 0033),
 * with the same rule as the app's SubscriptionGate, so calling an api/ route
 * directly cannot get past an ended trial.
 *
 * FAILS CLOSED: a failed check answers 503 rather than letting the call through.
 * On failure this SENDS the response and returns false.
 */
export async function requireLearningAccess(res: VercelResponse, auth: AuthedCaller): Promise<boolean> {
  const { data, error } = await auth.svc.rpc("account_has_learning_access", { p_user_id: auth.userId })
  if (error) {
    console.error("learning access check failed", { error: error.message, userId: auth.userId })
    res.status(503).json({ error: "access_check_failed" })
    return false
  }
  if (data !== true) {
    res.status(403).json({ error: "subscription_required" })
    return false
  }
  return true
}
