import { createHmac, randomUUID } from "node:crypto"
import type { SupabaseClient } from "@supabase/supabase-js"

// Minting for the K-8 covered-student identity (school-bridge, Option A).
//
// A covered K-8 student has no email and never authenticates directly. On a
// staff-supervised covered PIN resolve, the server ensures ONE tutoring auth user
// exists for them (keyed to dean_student_id via their students row) and hand-signs
// a SHORT-LIVED access token for it. The identity has no password, no email
// sign-in, no magic link, and no refresh token is ever issued — a token can only
// be produced HERE, server-side, after Dean returns covered:true inside a valid
// staff session. There is no client-reachable credential.

const SESSION_TTL_SEC = 60 * 60 // one class session; deliberately short, no refresh

function b64url(input: string): string {
  return Buffer.from(input).toString("base64url")
}

/** Hand-sign a Supabase-compatible HS256 access token (no refresh) for a uid. */
function signAccessToken(uid: string): { token: string; expiresAt: number } | null {
  const secret = process.env.SUPABASE_JWT_SECRET
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  if (!secret || !url) return null
  const now = Math.floor(Date.now() / 1000)
  const exp = now + SESSION_TTL_SEC
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const payload = b64url(
    JSON.stringify({
      sub: uid,
      role: "authenticated",
      aud: "authenticated",
      iss: `${url}/auth/v1`,
      iat: now,
      exp,
    }),
  )
  const data = `${header}.${payload}`
  const sig = createHmac("sha256", secret).update(data).digest("base64url")
  return { token: `${data}.${sig}`, expiresAt: exp }
}

/**
 * Undo the free trial the signup trigger stamps on a freshly minted identity.
 *
 * WHY IT NEEDS UNDOING RATHER THAN SKIPPING. The profiles row is not created here;
 * handle_new_user creates it inside the createUser transaction, and the BEFORE
 * INSERT trigger pathwayed_start_trial (migration 0014) stamps free_trial + a
 * 7-day trial_end on any never-trialed profile. So the row already carries a trial
 * by the time createUser returns, and the earliest this code can act is after it.
 *
 * WHY IT MATTERS AT ALL. A covered K-8 student's school holds the licence, so a
 * trial is simply not a true statement about their account: they are not 7 days
 * from losing access, and has_trialed = true would wrongly say they have spent the
 * one trial their account gets. This is hygiene, not a mail fix — these identities
 * carry a random @covered.pathwayed.local address that no mailbox receives, and
 * api/trial-emails.ts suppresses them on coverage anyway.
 *
 * BEST EFFORT, NEVER FATAL. This handler's standing rule is that a student who
 * cannot practice beats a student who cannot sign in, and a stale trial flag costs
 * a covered student nothing — the access gate short-circuits on coverage before it
 * ever reads trial state. So a failure is logged and the sign-in continues.
 */
async function clearMintedTrial(svc: SupabaseClient, uid: string): Promise<void> {
  const { error } = await svc
    .from("profiles")
    .update({ subscription_status: "inactive", trial_end: null, has_trialed: false })
    .eq("id", uid)
  if (error) {
    console.error("mint-session could not clear the trial flag:", error.message)
  }
}

export type MintResult =
  | { localId: string; accessToken: string; expiresAt: number }
  | { error: string }

/**
 * Ensure a minted tutoring identity + local students row for a covered Dean
 * student, then hand-sign a short-lived session. Idempotent per dean_student_id:
 * subsequent logins reuse the SAME auth uid and the SAME students row.
 */
export async function provisionAndMint(
  svc: SupabaseClient,
  dean: { student_id: string; first_name: string; grade: string },
): Promise<MintResult> {
  let uid: string
  let localId: string

  const existing = await svc
    .from("students")
    .select("id, parent_id")
    .eq("dean_student_id", dean.student_id)
    .maybeSingle()

  if (existing.data) {
    uid = existing.data.parent_id as string
    localId = existing.data.id as string
    await svc
      .from("students")
      .update({ first_name: dean.first_name, grade: dean.grade, school_covered: true })
      .eq("id", localId)
  } else {
    // Fresh identity: NO password, random non-routable email — nothing to sign in
    // against. Only this server, post-resolve, ever produces a token for it.
    const email = `covered-${randomUUID()}@covered.pathwayed.local`
    const created = await svc.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: { school_covered: true, dean_student_id: dean.student_id },
    })
    if (created.error || !created.data.user) return { error: "mint_failed" }
    uid = created.data.user.id

    // The signup trigger has just stamped a free trial on this identity's profile.
    // A school-covered student never had one, so take it back off.
    await clearMintedTrial(svc, uid)

    const ins = await svc
      .from("students")
      .insert({
        parent_id: uid,
        first_name: dean.first_name,
        grade: dean.grade,
        level: "on",
        dean_student_id: dean.student_id,
        school_covered: true,
        above_grade_ok: false, // a school does not consent on a parent's behalf
      })
      .select("id")
      .single()

    if (ins.error) {
      // Lost a race to a concurrent first-login — adopt the winner's row/identity
      // and drop our now-orphan auth user.
      const again = await svc
        .from("students")
        .select("id, parent_id")
        .eq("dean_student_id", dean.student_id)
        .maybeSingle()
      if (!again.data) return { error: "provision_conflict" }
      await svc.auth.admin.deleteUser(uid).catch(() => {})
      uid = again.data.parent_id as string
      localId = again.data.id as string
    } else {
      localId = ins.data.id as string
    }
  }

  const signed = signAccessToken(uid)
  if (!signed) return { error: "not_configured" }
  return { localId, accessToken: signed.token, expiresAt: signed.expiresAt }
}
