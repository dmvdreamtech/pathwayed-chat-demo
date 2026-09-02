/**
 * The school-coverage rule, in ONE place, so the browser gate and the api/
 * serverless functions decide coverage identically.
 *
 * WHY IT LIVES HERE AND NOT IN accessGate.ts. accessGate imports @/lib/billing
 * and @/lib/profile, and the `@/` alias is not configured for api/tsconfig.json,
 * so a serverless handler cannot import it. This module is dependency-free —
 * no imports at all, nothing browser-only, nothing server-only — exactly the
 * arrangement src/lib/prep/access.ts uses for the prep rules. accessGate
 * re-exports hasCoveredStudent from here, so every existing UI caller is
 * unchanged and there is still only one implementation.
 *
 * Do NOT add an import to this file without checking it resolves under
 * api/tsconfig.json (relative paths only, no `@/`).
 */

/** The only two student columns coverage depends on. */
export interface CoverageStudent {
  active: boolean
  school_covered: boolean
}

/**
 * Is this account covered by a school licence, according to the DATABASE?
 *
 * WHY THIS EXISTS ALONGSIDE isSchoolCovered(). The sessionStorage flag is written
 * only after a verified Dean resolve, so it is trustworthy, but it lives for one
 * tab and one session. A covered student who signs in normally (ordinary SSO, no
 * trip through the school station) has no school session at all, so the flag reads
 * false and the trial lock closes on them. students.school_covered is the durable
 * record of the same fact, so the gate consults both. Server-side callers (the
 * trial-email cron) have no session at all, so this column is ALL they have.
 *
 * TRUSTING THIS COLUMN IS CONDITIONAL, AND THE CONDITION IS A GRANT. It is only
 * safe to read school_covered as an access grant because migration 0025 revokes
 * INSERT/UPDATE on that column from `authenticated` and `anon`, leaving the service
 * role the only writer. Before that migration a parent could set it from the
 * browser (the students_own policy checks only parent_id = auth.uid()), which would
 * have made this a self-serve paywall bypass. If that grant is ever restored, this
 * function stops being an access check and becomes a hole. Do not read this column
 * as an entitlement anywhere without re-reading migration 0025 first.
 *
 * Inactive children are ignored: an over-seat-cap child the parent switched off
 * must not keep the account's paywall open.
 */
export function hasCoveredStudent(students: CoverageStudent[]): boolean {
  return students.some((s) => s.active && s.school_covered)
}
