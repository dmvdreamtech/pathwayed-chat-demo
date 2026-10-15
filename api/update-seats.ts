import Stripe from "stripe"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import {
  addonPriceEnv,
  extraKids as computeExtraKids,
  isBillingPeriod,
  isPlanId,
  paidSeats as computePaidSeats,
  type PlanId,
} from "./billing-core.js"
import { requireUser } from "./require-auth.js"
import { refuseIfSchoolProvided } from "./billing-guard.js"
import { rateLimit, BILLING_LIMIT } from "./rate-limit.js"

/**
 * IDENTITY COMES FROM THE SESSION. userId used to be read from the body and used
 * for a service-role profiles lookup, so an unauthenticated caller who knew a user
 * id could change what a stranger is billed in either direction, prorated against
 * their saved card. There is no userId in the request shape any more.
 *
 * totalKids is DELIBERATELY unchanged: still taken from the body, still fed to the
 * same computeExtraKids. This commit changes who you are allowed to act as, not
 * what anyone is charged.
 */
interface UpdateSeatsRequest {
  totalKids?: number
}

/**
 * Store the seat count Stripe now bills for, straight away.
 *
 * WHY NOT LEAVE IT TO THE WEBHOOK. The database refuses adding an active child
 * beyond profiles.paid_seats (migration 0031), and AddChild adds the child the
 * moment this route returns. The webhook writes these same two values a little
 * later; waiting for it would refuse the child the parent just paid for. Both
 * writers derive the numbers the same way, so whichever lands last agrees.
 */
async function storeSeats(
  supabase: SupabaseClient,
  userId: string,
  plan: PlanId,
  extra: number,
): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({ extra_kids: extra, paid_seats: computePaidSeats(plan, extra) })
    .eq("id", userId)
  if (error) console.error("update-seats: storing the seat count failed", error.message)
}

// Subscriptions we're willing to mutate seats on. A child added while the
// parent has one of these must be billed.
const BILLABLE_STATUSES = new Set(["active", "trialing", "past_due"])

/**
 * Increase (or decrease) the per-child add-on quantity on a parent's existing
 * subscription so it matches a new total child count, prorating the change.
 *
 * The add-on quantity is set to max(0, totalKids - includedSeats(plan)). We also
 * write the new count to the subscription metadata (`extra_kids`) so the
 * customer.subscription.updated webhook keeps profiles.extra_kids in sync —
 * the webhook reads extra_kids from metadata, not from the line-item quantity.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const auth = await requireUser(req, res)
  if (!auth) return
  // Never sell to an account a school provides for (migration 0037).
  if (await refuseIfSchoolProvided(res, auth)) return

  const limited = rateLimit(`seats:${auth.userId}`, BILLING_LIMIT)
  if (!limited.allowed) {
    res.setHeader("Retry-After", String(limited.retryAfterSec))
    return res.status(429).json({ error: "rate_limited", retry_after: limited.retryAfterSec })
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return res.status(500).json({ error: "Billing is not configured" })
  }

  try {
    const { totalKids } = req.body as UpdateSeatsRequest
    if (typeof totalKids !== "number" || !Number.isFinite(totalKids)) {
      return res.status(400).json({ error: "a numeric totalKids is required" })
    }
    const userId = auth.userId

    // The CALLER's own billing state. auth.userId comes from the verified token.
    const supabase = auth.svc
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, plan, billing_period, subscription_status")
      .eq("id", userId)
      .maybeSingle()

    const customerId = profile?.stripe_customer_id as string | null | undefined
    const plan = profile?.plan
    const billingPeriod = profile?.billing_period
    const status = profile?.subscription_status as string | null | undefined

    // No subscription on file → caller should just add the child for free.
    if (!customerId || !status || !BILLABLE_STATUSES.has(status)) {
      return res.status(400).json({ error: "No active subscription to update" })
    }
    if (!isPlanId(plan) || !isBillingPeriod(billingPeriod)) {
      return res.status(500).json({ error: "Subscription plan is not recognized" })
    }

    const desiredExtra = computeExtraKids(plan, totalKids)
    const addonPriceId = process.env[addonPriceEnv(billingPeriod)]
    if (!addonPriceId) {
      return res.status(500).json({ error: "Add-on price is not configured" })
    }

    const stripe = new Stripe(secretKey)

    // We don't store the subscription id, so find the customer's live one.
    const subs = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 20 })
    const sub = subs.data.find((s) => BILLABLE_STATUSES.has(s.status))
    if (!sub) {
      return res.status(400).json({ error: "No active subscription found" })
    }

    const addonItem = sub.items.data.find((it) => it.price?.id === addonPriceId)

    // Already at the desired quantity — nothing to charge (guards double-submits).
    // The stored count is still brought in line, in case the webhook is behind.
    if (desiredExtra > 0 && addonItem && addonItem.quantity === desiredExtra) {
      await storeSeats(supabase, userId, plan, desiredExtra)
      return res.status(200).json({ extraKids: desiredExtra, changed: false })
    }
    if (desiredExtra === 0 && !addonItem) {
      await storeSeats(supabase, userId, plan, 0)
      return res.status(200).json({ extraKids: 0, changed: false })
    }

    const items: Stripe.SubscriptionUpdateParams.Item[] = []
    if (desiredExtra > 0) {
      items.push(addonItem ? { id: addonItem.id, quantity: desiredExtra } : { price: addonPriceId, quantity: desiredExtra })
    } else if (addonItem) {
      // Back down to included seats: drop the add-on line entirely.
      items.push({ id: addonItem.id, deleted: true })
    }

    const updated = await stripe.subscriptions.update(sub.id, {
      items,
      // Prorate for the remaining period, the same way a plan change does.
      proration_behavior: "create_prorations",
      // Merged into existing metadata so the webhook syncs extra_kids; plan,
      // billing_period and user_id are preserved.
      metadata: { extra_kids: String(desiredExtra) },
    })
    await storeSeats(supabase, userId, plan, desiredExtra)

    return res.status(200).json({ extraKids: desiredExtra, changed: true, status: updated.status })
  } catch (error) {
    console.error("update-seats error:", error)
    return res.status(500).json({ error: "Could not update your subscription" })
  }
}
