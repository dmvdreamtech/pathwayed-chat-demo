import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { deanPost, type ResolveResponse } from "./school-bridge.js"
import {
  ACTIVE_PREP_STATUS,
  ACTIVE_PREP_STATUSES,
  prepModulesForGrade,
} from "../src/lib/prep/access.js"

// Post-SSO school check for a 9-12 covered student. The client sends only its
// OWN Supabase access token; the server derives the trusted email + uid from it,
// maps the email domain -> Dean school_id (server env — the client never supplies
// school_id), asks Dean whether the email is a covered tutoring student, and on
// success lookup-or-creates ONE real students row keyed to the Dean student id.
//
// school_covered is set HERE, only after a verified Dean resolve — never by the
// client — because it drives the Stripe bypass. The row is owned by the student's
// own auth uid so it flows through the normal owns_student() RLS unchanged.

/** Maps a verified SSO email domain -> Dean school_id. JSON in SCHOOL_DOMAIN_MAP. */
function schoolIdForDomain(domain: string): string | null {
  const raw = process.env.SCHOOL_DOMAIN_MAP
  if (!raw) return null
  try {
    const map = JSON.parse(raw) as Record<string, string>
    return map[domain.toLowerCase()] ?? null
  } catch {
    return null
  }
}

/**
 * Give a covered student every prep module their GRADE qualifies for. The school
 * bought a grade-band license, so grade decides this, not the school id: grade 12
 * gets SAT (band 9-12), grade 7 gets HSPT + ISEE (band 6-8). A new school needs no
 * config and a new module in the registry is picked up automatically.
 *
 * Nobody paid Stripe for these, so the rows carry a null subscription item and a
 * null ends_at. Writes run as the service role (which bypasses the read-only RLS
 * on prep_entitlements, exactly like the Stripe webhook); nothing here is
 * client-callable.
 *
 * Idempotent and never a downgrade:
 *   - an entitlement already in an entitled status is left untouched;
 *   - a Stripe-backed row (non-null stripe_subscription_item_id) is never written,
 *     even when it is canceled, so real billing state always wins;
 *   - a lapsed school-covered row (canceled, no Stripe item) is reactivated.
 * The insert is an ON CONFLICT DO NOTHING upsert on the (student_id, module_id)
 * unique constraint, so two concurrent sign-ins cannot duplicate a row.
 *
 * Never throws: a student who cannot practice is a far smaller problem than a
 * student who cannot sign in, so every failure is logged and swallowed.
 */
async function grantCoveredPrepEntitlements(
  svc: SupabaseClient,
  studentId: string,
  grade: string,
): Promise<void> {
  try {
    const modules = prepModulesForGrade(grade.trim())
    if (modules.length === 0) return

    const existing = await svc
      .from("prep_entitlements")
      .select("module_id, status, stripe_subscription_item_id")
      .eq("student_id", studentId)
    if (existing.error) {
      console.error("school-login entitlement read error:", existing.error.message)
      return
    }
    const byModule = new Map<string, { status: string; stripe_subscription_item_id: string | null }>(
      (existing.data ?? []).map((r) => [r.module_id as string, r]),
    )

    const toInsert: Array<Record<string, unknown>> = []
    for (const mod of modules) {
      const row = byModule.get(mod.id)
      if (!row) {
        toInsert.push({
          student_id: studentId,
          module_id: mod.id,
          status: ACTIVE_PREP_STATUS,
          stripe_subscription_item_id: null,
          ends_at: null,
        })
        continue
      }
      if (ACTIVE_PREP_STATUSES.has(row.status) || row.stripe_subscription_item_id) continue

      // Lapsed and not Stripe-backed. The is(...) guard re-checks the Stripe item
      // at write time so a webhook landing in between still wins.
      const upd = await svc
        .from("prep_entitlements")
        .update({ status: ACTIVE_PREP_STATUS, ends_at: null })
        .eq("student_id", studentId)
        .eq("module_id", mod.id)
        .is("stripe_subscription_item_id", null)
      if (upd.error) {
        console.error(`school-login entitlement update error (${mod.id}):`, upd.error.message)
      }
    }

    if (toInsert.length > 0) {
      const ins = await svc
        .from("prep_entitlements")
        .upsert(toInsert, { onConflict: "student_id,module_id", ignoreDuplicates: true })
      if (ins.error) {
        console.error("school-login entitlement insert error:", ins.error.message)
      }
    }
  } catch (error) {
    console.error("school-login entitlement grant error:", error)
  }
}

/**
 * One structured line per student who reached a MAPPED school domain and still did
 * not come back covered. These are the students who are now using the app on their
 * own unverified grade, so they need to be findable in the logs rather than being
 * indistinguishable from ordinary B2C traffic.
 *
 * An UNMAPPED domain is deliberately NOT logged: that is every consumer sign-in in
 * the product, and logging it would bury the handful of lines that matter.
 *
 * No email, no name, no token. The uid is enough to find the row, and the domain is
 * enough to see which school is misconfigured; the address itself adds nothing that
 * is worth putting in a log.
 */
function logUnresolved(
  uid: string,
  domain: string,
  schoolId: string,
  reason: string,
  status: number,
): void {
  console.warn(
    JSON.stringify({
      event: "school_login_unresolved",
      uid,
      domain,
      school_id: schoolId,
      reason,
      status,
      at: new Date().toISOString(),
    }),
  )
}

/**
 * Find an existing local row to LINK to this Dean student, for a student who used
 * the app before their school roster existed.
 *
 * WHY THIS EXISTS. The lookup above keys on dean_student_id, which is null for
 * every student who signed in before the bridge resolved. Without this step that
 * lookup misses and the handler inserts a SECOND row: the student gets a fresh
 * covered profile while their real one, holding all their mastery, sessions and
 * entitlements, is orphaned under the same parent_id.
 *
 * ONLY WHEN IT IS UNAMBIGUOUS. Adoption overwrites first_name and grade from the
 * console roster, so adopting the wrong row would rename a sibling and move them to
 * another grade. Accounts in this product really do own several children (one holds
 * six today), so this adopts ONLY when the account owns exactly one unlinked row.
 * Zero means there is nothing to adopt and the caller inserts. Two or more means the
 * Dean student cannot be told apart from their siblings, so the caller inserts a
 * fresh row and this logs the ambiguity for a human to merge. Guessing is the one
 * outcome that loses data.
 *
 * Rows already carrying a dean_student_id are excluded: those belong to a DIFFERENT
 * Dean student, and the partial unique index on the column would reject the write
 * anyway.
 */
export function chooseAdoptionTarget(rows: { id: string }[]): string | null {
  return rows.length === 1 ? rows[0].id : null
}

async function adoptLocalStudent(
  svc: SupabaseClient,
  uid: string,
  deanStudentId: string,
): Promise<string | null> {
  const { data, error } = await svc
    .from("students")
    .select("id")
    .eq("parent_id", uid)
    .is("dean_student_id", null)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("school-login adopt lookup error:", error.message)
    return null
  }
  const rows = (data ?? []) as { id: string }[]
  const target = chooseAdoptionTarget(rows)
  if (!target && rows.length > 1) {
    console.warn(
      JSON.stringify({
        event: "school_login_adopt_ambiguous",
        uid,
        dean_student_id: deanStudentId,
        candidates: rows.length,
        at: new Date().toISOString(),
      }),
    )
  }
  return target
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" })

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) return res.status(500).json({ error: "not_configured" })

  try {
    // The student's OWN access token may arrive in the JSON body (how the app
    // sends it) OR as an Authorization: Bearer header (how a manual/other caller
    // may send it). Accept either so a header-style caller isn't rejected before
    // anything runs. Distinct error codes make the failure mode observable:
    // missing_token = no token supplied; invalid_token = getUser rejected it.
    const bodyToken = (req.body ?? {}) as { access_token?: unknown }
    const authHeader = req.headers.authorization
    const headerToken =
      typeof authHeader === "string" && authHeader.toLowerCase().startsWith("bearer ")
        ? authHeader.slice(7).trim()
        : ""
    const access_token =
      (typeof bodyToken.access_token === "string" && bodyToken.access_token) || headerToken
    if (!access_token) {
      return res.status(401).json({ error: "missing_token" })
    }

    const svc = createClient(supabaseUrl, serviceKey)

    // Trust only what the student's own verified session says.
    const { data: userData, error: userErr } = await svc.auth.getUser(access_token)
    const email = userData?.user?.email?.trim().toLowerCase()
    const uid = userData?.user?.id
    if (userErr || !email || !uid) return res.status(401).json({ error: "invalid_token" })

    const domain = email.split("@")[1] ?? ""
    const schoolId = schoolIdForDomain(domain)
    // Unknown domain -> not a school student; client falls through to consumer path.
    if (!schoolId) return res.status(200).json({ covered: false })

    const r = await deanPost<ResolveResponse>("resolve-student", {
      school_id: schoolId,
      product: "tutoring",
      email,
    })
    // A MAPPED domain that does not come back covered is the case worth seeing: the
    // student is about to use the app on their own unverified grade. Distinguish
    // "the roster said no" from "we never got an answer", because the first is a
    // missing roster row and the second is a broken bridge.
    if (!r.ok) {
      logUnresolved(uid, domain, schoolId, r.error, r.status)
      return res.status(200).json({ covered: false })
    }
    if (!r.data.covered) {
      logUnresolved(uid, domain, schoolId, "not_on_roster", r.status)
      return res.status(200).json({ covered: false })
    }
    const dean = r.data

    // Lookup-or-create the local row keyed by the stable Dean student id.
    const existing = await svc
      .from("students")
      .select("id")
      .eq("dean_student_id", dean.student_id)
      .maybeSingle()

    // Nothing carries this Dean id yet. Before creating a second profile for
    // someone who already has one, try to adopt the row they have been using.
    let localId: string | null =
      existing.data?.id ?? (await adoptLocalStudent(svc, uid, dean.student_id))
    if (localId) {
      // Keep it owned by the current session and refresh authoritative fields.
      // dean_student_id is written here rather than only on insert, so this same
      // statement LINKS an adopted row and is a no-op rewrite for a row that
      // already matched. The console is authoritative for name and grade.
      // school_id rides along so staff at this school can see the student
      // (migration 0030); like school_covered, only this server writes it.
      const upd = await svc
        .from("students")
        .update({
          parent_id: uid,
          first_name: dean.first_name,
          grade: dean.grade,
          school_covered: true,
          dean_student_id: dean.student_id,
          school_id: schoolId,
        })
        .eq("id", localId)

      // BEST EFFORT, NEVER FATAL. This handler's standing rule is that a student who
      // cannot practice beats a student who cannot sign in, so a failed refresh is
      // logged and the sign-in continues on the row we already have. The next
      // sign-in re-runs all of this and self-heals, because every write here is
      // idempotent.
      if (upd.error) {
        // 23505 = the partial unique index on dean_student_id. Two sign-ins raced
        // and the other linked a different row first, so that row is the real one.
        if (upd.error.code === "23505") {
          const winner = await svc
            .from("students")
            .select("id")
            .eq("dean_student_id", dean.student_id)
            .maybeSingle()
          if (winner.data?.id) localId = winner.data.id
          else console.error("school-login link conflict with no winner:", upd.error.message)
        } else {
          console.error("school-login update error:", upd.error.message)
        }
      }
    } else {
      const ins = await svc
        .from("students")
        .insert({
          parent_id: uid,
          first_name: dean.first_name,
          grade: dean.grade,
          level: "on",
          dean_student_id: dean.student_id,
          school_covered: true,
          school_id: schoolId,
          above_grade_ok: false, // a school does not consent on a parent's behalf
        })
        .select("id")
        .single()
      if (ins.error) {
        console.error("school-login insert error:", ins.error.message)
        return res.status(500).json({ error: "server_error" })
      }
      localId = ins.data.id
    }

    // Unreachable in practice: every branch above either sets an id or has already
    // returned. It is here so the grant below cannot be handed a null, and so a
    // future branch that forgets to set one fails loudly instead of silently
    // skipping the entitlement.
    if (!localId) {
      console.error("school-login resolved no local student id")
      return res.status(500).json({ error: "server_error" })
    }

    // Adopted, matched, or freshly inserted, so a student created before this
    // shipped picks their modules up on the next sign-in rather than only new
    // students getting them.
    await grantCoveredPrepEntitlements(svc, localId, dean.grade)

    return res.status(200).json({
      covered: true,
      student_id: localId,
      first_name: dean.first_name,
      grade: dean.grade,
      school_id: schoolId,
    })
  } catch (error) {
    console.error("school-login error:", error)
    return res.status(500).json({ error: "server_error" })
  }
}
