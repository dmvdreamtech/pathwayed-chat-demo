// No sale to an account a school provides for.
//
// create-checkout, purchase-prep and update-seats call refuseIfSchoolProvided
// right after the caller is authenticated, before Stripe is touched. It refuses
// (403 school_provided) any account that is:
//
//   platform_admin   on platform_admins
//   school_staff     an active school_staff row, by user id or email
//   covered_student  owns a school-covered student
//   school_domain    email at a school domain: the database's school_domains,
//                    or a key of SCHOOL_DOMAIN_MAP (the same map school sign-in
//                    and the email guard use)
//
// The first four come from school_provided_reason (migration 0037). A failed
// read refuses too: the cost is a parent retrying in a minute, where the other
// way round a school account could be charged.
import type { SupabaseClient } from "@supabase/supabase-js"
import type { VercelResponse } from "@vercel/node"
import { isSchoolDomainEmail, parseSchoolDomains } from "./email-core.js"

export type SchoolProvidedReason = "platform_admin" | "school_staff" | "covered_student" | "school_domain"

/** Why this account must not be billed, null when it may be, "unknown" when the check failed. */
export async function schoolProvidedReason(
  svc: SupabaseClient,
  userId: string,
  email: string | null,
  rawMap: string | undefined = process.env.SCHOOL_DOMAIN_MAP,
): Promise<SchoolProvidedReason | "unknown" | null> {
  const { data, error } = await svc.rpc("school_provided_reason", { p_user: userId })
  if (error) {
    console.error("billing-guard: school_provided_reason failed:", error.message)
    return "unknown"
  }
  if (data) return data as SchoolProvidedReason
  // A malformed map cannot say anything about a domain; the database answer
  // above still applies, so a broken env never blocks every parent.
  const domains = parseSchoolDomains(rawMap)
  if (domains && isSchoolDomainEmail(email, domains)) return "school_domain"
  return null
}

/**
 * Send the refusal and return true when this caller must not be billed. A
 * handler does `if (await refuseIfSchoolProvided(res, auth)) return`.
 */
export async function refuseIfSchoolProvided(
  res: VercelResponse,
  auth: { userId: string; email: string | null; svc: SupabaseClient },
): Promise<boolean> {
  const reason = await schoolProvidedReason(auth.svc, auth.userId, auth.email)
  if (reason === null) return false
  if (reason === "unknown") {
    res.status(503).json({ error: "billing_check_unavailable", message: "Please try again in a minute." })
    return true
  }
  res.status(403).json({ error: "school_provided", reason, message: "Your school provides PathwayEd." })
  return true
}
