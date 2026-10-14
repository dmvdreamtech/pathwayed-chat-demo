import { supabase } from '@/lib/supabase'
import { authedJsonHeaders } from '@/lib/apiAuth'
import type { PrepModule } from '@/lib/prep/types'
import { PREP_MODULES } from '@/lib/prep/registry'
import { prepSkillFor } from '@/lib/prep/prepSkills'

/** A child's entitlement to a prep module, as read from prep_entitlements. */
export interface PrepEntitlement {
  studentId: string
  moduleId: string
  status: string
  endsAt: string | null
}

/**
 * The status set and the grade-band gate live in ./access, which is server-safe so
 * api/school-login.ts can apply the same rules when granting a school-covered
 * student their modules. Re-exported here so existing UI imports are unchanged.
 */
export { ACTIVE_PREP_STATUSES, isGradeEligible } from '@/lib/prep/access'

/**
 * Kid-facing surfaces grant access on 'active' or 'past_due'. past_due is a grace
 * state while Stripe retries a failing card — a child mid-retry must not be locked
 * out of their prep experience. Access ends only on 'canceled'.
 */
export function isKidEntitled(status: string): boolean {
  return status === 'active' || status === 'past_due'
}

/**
 * The prep modules whose sections use this skill. A child entitled to one of them
 * may practice the skill (prep Train/Practice) without a learning plan. The server
 * applies the same rule in can_practice_skill (migration 0033).
 */
export function prepModulesUsingSkill(slug: string): string[] {
  return PREP_MODULES.filter((m) =>
    m.sections.some((s) => s.questionTypes.some((t) => prepSkillFor(t)?.slug === slug)),
  ).map((m) => m.id)
}

/** Short reason shown next to a disabled (ineligible) child, e.g. "Grades 6-8 only". */
export function eligibilityReason(module: PrepModule): string {
  const [lo, hi] = module.gradeBand
  return `Grades ${lo}-${hi} only`
}

/** Read prep entitlements for a set of children. RLS scopes to the parent's own
 *  children, so callers just pass the child ids they know about. */
export async function getPrepEntitlements(studentIds: string[]): Promise<PrepEntitlement[]> {
  if (studentIds.length === 0) return []
  const { data, error } = await supabase
    .from('prep_entitlements')
    .select('student_id, module_id, status, ends_at')
    .in('student_id', studentIds)
  if (error || !data) return []
  return data.map((r) => ({
    studentId: r.student_id,
    moduleId: r.module_id,
    status: r.status,
    endsAt: r.ends_at,
  }))
}

/**
 * Read prep_settings for a set of children as a map keyed `studentId:moduleId` ->
 * test_date (ISO date string or null). RLS scopes to the parent's own children.
 */
export async function getPrepSettings(studentIds: string[]): Promise<Map<string, string | null>> {
  const out = new Map<string, string | null>()
  if (studentIds.length === 0) return out
  const { data, error } = await supabase
    .from('prep_settings')
    .select('student_id, module_id, test_date')
    .in('student_id', studentIds)
  if (error || !data) return out
  for (const r of data) out.set(`${r.student_id}:${r.module_id}`, r.test_date)
  return out
}

/**
 * Upsert a child's test date for a module (student_id + module_id is the primary
 * key). Direct client write — prep_settings has insert/update grants under
 * owns_student per migration 0015. Pass null to clear the date.
 */
export async function setPrepTestDate(
  studentId: string,
  moduleId: string,
  testDate: string | null,
): Promise<void> {
  const { error } = await supabase
    .from('prep_settings')
    .upsert({ student_id: studentId, module_id: moduleId, test_date: testDate }, { onConflict: 'student_id,module_id' })
  if (error) throw new Error('Could not save the test date')
}

/** Whole days from today (local midnight) until an ISO date string; negative once
 *  passed, or null when unset/invalid. */
export function daysUntilDate(dateStr: string | null): number | null {
  if (!dateStr) return null
  const target = new Date(`${dateStr}T00:00:00`)
  if (isNaN(target.getTime())) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - today.getTime()) / (24 * 60 * 60 * 1000))
}

/** Kid-friendly countdown copy for a test date, or null when there is nothing to
 *  show (no date, or a date already in the past). */
export function testDayCountdown(dateStr: string | null): string | null {
  const d = daysUntilDate(dateStr)
  if (d == null || d < 0) return null
  if (d === 0) return 'Test day is today!'
  if (d === 1) return '1 day to test day'
  return `${d} days to test day`
}

interface PurchasePrepInput {
  moduleId: string
  /** The caller's OWN children. The server verifies every id before billing. */
  studentIds: string[]
}

/**
 * Start a prep purchase. Resolves with { added: true } when the module was added
 * to an existing subscription (proration, no redirect — the caller should refresh
 * its entitlements). When a new subscription is needed the server returns a Stripe
 * Checkout URL and this navigates to it (the page then unloads).
 */
export async function purchasePrep(input: PurchasePrepInput): Promise<{ added: boolean }> {
  const res = await fetch('/api/purchase-prep', {
    method: 'POST',
    headers: await authedJsonHeaders(),
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('Could not start the prep purchase')
  const data = (await res.json()) as { url?: string; added?: boolean }
  if (data.url) {
    window.location.href = data.url
    return { added: false }
  }
  return { added: !!data.added }
}

/** Which cancellation path the endpoint would run for a given request. */
export type CancelPrepPath = 'reduce' | 'delete' | 'schedule' | 'none'

export interface CancelPrepPreview {
  /** 'schedule' = access continues until periodEnd; 'reduce'/'delete' = ends now. */
  path: CancelPrepPath
  periodEnd: string | null
}

interface CancelPrepInput {
  moduleId: string
  /** The caller's OWN children, or empty to cancel the whole module. Verified server-side. */
  studentIds: string[]
}

/**
 * Ask which path a cancel would take (and the period end) WITHOUT changing
 * anything, so the UI can show the right confirm copy: an immediate credit vs.
 * access continuing until the period end.
 */
export async function previewCancelPrep(input: CancelPrepInput): Promise<CancelPrepPreview> {
  const res = await fetch('/api/cancel-prep', {
    method: 'POST',
    headers: await authedJsonHeaders(),
    body: JSON.stringify({ ...input, preview: true }),
  })
  if (!res.ok) throw new Error('Could not load cancel details')
  const data = (await res.json()) as Partial<CancelPrepPreview>
  return { path: data.path ?? 'none', periodEnd: data.periodEnd ?? null }
}

/**
 * Cancel a prep module for the given children (or all of them for the module when
 * studentIds is empty). Stripe is mutated first; the caller should refresh
 * entitlements after. Returns the path the server actually ran.
 */
export async function cancelPrep(input: CancelPrepInput): Promise<CancelPrepPath> {
  const res = await fetch('/api/cancel-prep', {
    method: 'POST',
    headers: await authedJsonHeaders(),
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('Could not cancel the prep module')
  const data = (await res.json()) as { path?: CancelPrepPath }
  return data.path ?? 'none'
}
