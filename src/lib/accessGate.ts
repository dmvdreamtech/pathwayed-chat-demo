// Pure access-gate + seat math for the app-managed trial. No React, no Supabase,
// no clock of its own (callers pass `now`) so it unit-tests cleanly and renders
// deterministically.
//
// The gate answers two questions:
//   1. May this account run learning sessions / homework help right now?
//   2. How many child profiles may be active for this account?
//
// School-covered students BYPASS the gate entirely — their school holds the
// license. Callers must check coverage FIRST (isSchoolCovered()) and pass the
// result in, so the covered path never depends on trial state. See BillingPanel
// and the route-level SubscriptionGate.

import { PLANS, type PlanId } from '@/lib/billing'
import type { Subscription } from '@/lib/profile'

/** Paid Stripe states that grant access regardless of trial_end. 'trialing' is
 *  kept only for the one pre-existing live subscription (we no longer create it). */
export const PAID_STATUSES = new Set(['active', 'trialing', 'past_due'])

/** Max active children during the free trial before a subscription is required. */
export const TRIAL_SEAT_CAP = 2

const DAY_MS = 24 * 60 * 60 * 1000

function parseTime(iso: string | null): number | null {
  if (!iso) return null
  const t = Date.parse(iso)
  return Number.isNaN(t) ? null : t
}

/** Seats included in a plan before the per-child add-on, from the display table. */
export function includedSeatsForPlan(plan: string | null): number {
  return PLANS.find((p) => p.id === plan)?.included ?? 1
}

/** True while an app-managed trial is still within its window. */
export function isTrialActive(sub: Pick<Subscription, 'trialEnd'>, now: number): boolean {
  const end = parseTime(sub.trialEnd)
  return end != null && now < end
}

/**
 * The core gate: may this account enter learning sessions / homework help?
 *   - School-covered → always yes (checked first, never touches trial state).
 *   - A paid subscription (active / trialing / past_due) → yes.
 *   - An in-window free trial → yes.
 *   - Otherwise (trial_end < now and not active) → no.
 */
export function hasLearningAccess(
  sub: Pick<Subscription, 'status' | 'trialEnd'>,
  now: number,
  schoolCovered: boolean,
): boolean {
  if (schoolCovered) return true
  if (sub.status && PAID_STATUSES.has(sub.status)) return true
  return isTrialActive(sub, now)
}

/** Whole days left in the trial, rounded up, never negative. 0 once expired. */
export function trialDaysLeft(sub: Pick<Subscription, 'trialEnd'>, now: number): number {
  const end = parseTime(sub.trialEnd)
  if (end == null) return 0
  return Math.max(0, Math.ceil((end - now) / DAY_MS))
}

export type BillingPhase = 'active' | 'trial' | 'expired'

/**
 * Which billing card / gate copy to show:
 *   'active'  — a paid subscription is in force (plan summary, manage billing).
 *   'trial'   — free trial still running (countdown + Subscribe now).
 *   'expired' — trial ended and not subscribed (subscribe prompt + plan picker).
 */
export function billingPhase(
  sub: Pick<Subscription, 'status' | 'trialEnd'>,
  now: number,
): BillingPhase {
  if (sub.status && PAID_STATUSES.has(sub.status)) return 'active'
  if (isTrialActive(sub, now)) return 'trial'
  return 'expired'
}

/**
 * Maximum number of ACTIVE child profiles this account may have.
 *   - Subscribed → the stored paid_seats (included plan seats + Additional Child
 *     quantity). Falls back to the plan's included seats if paid_seats is unset.
 *   - Free trial / expired → the trial cap (2).
 */
export function seatCap(
  sub: Pick<Subscription, 'status' | 'plan' | 'paidSeats'>,
): number {
  if (sub.status && PAID_STATUSES.has(sub.status)) {
    return sub.paidSeats && sub.paidSeats > 0 ? sub.paidSeats : includedSeatsForPlan(sub.plan)
  }
  return TRIAL_SEAT_CAP
}

/**
 * Coverage lives in src/lib/schoolCoverage.ts, which is dependency-free so the
 * api/ serverless functions can import the SAME rule (accessGate cannot be
 * imported server-side — it pulls in @/lib/billing, and the `@/` alias is not
 * configured for api/tsconfig.json). Re-exported here so every existing caller
 * keeps importing coverage from the gate it belongs to.
 */
export { hasCoveredStudent, type CoverageStudent } from './schoolCoverage.js'

export type { PlanId }
