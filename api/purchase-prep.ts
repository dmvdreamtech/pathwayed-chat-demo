import Stripe from "stripe"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { isPrepModuleId, prepPriceEnv, prepStudentsMetaKey } from "./prep-core.js"
import { planQualifiesForBand } from "./billing-core.js"
import { getPrepModule } from "../src/lib/prep/registry.js"
import { requireUser, requireOwnedStudents } from "./require-auth.js"
import { refuseIfSchoolProvided } from "./billing-guard.js"
import { rateLimit, BILLING_LIMIT } from "./rate-limit.js"

/**
 * IDENTITY COMES FROM THE SESSION. userId and email used to be read from the body.
 * userId drove a service-role profiles lookup whose stripe_customer_id was then
 * used to ADD A PAID ITEM to that subscription, so an unauthenticated caller who
 * knew a user id could charge a stranger's saved card and hand the resulting
 * entitlement to any student ids they liked. Both fields are gone from the shape.
 *
 * studentIds is still supplied, because the parent genuinely chooses which of their
 * children to buy for, but every id is now verified to belong to the caller before
 * anything is billed or entitled.
 *
 * No billing arithmetic changed: same price env, same quantity (ids.length), same
 * proration behaviour.
 */
interface PurchasePrepRequest {
  moduleId?: string
  studentIds?: string[]
}

// Subscriptions we can add a prep item to — the same set update-seats mutates.
const BILLABLE_STATUSES = new Set(["active", "trialing", "past_due"])

/**
 * Buy a test-prep module for one or more children. The subscription item quantity
 * equals the number of chosen children, and their ids ride along in subscription
 * metadata (prep_<module>_students) so the webhook knows exactly which children to
 * entitle.
 *
 * If the family already has a billable subscription we ADD the prep price as an
 * item on it (prorated), exactly like the per-child seat add-on (update-seats) —
 * never a second subscription. Only when there is no subscription to add to do we
 * open a Checkout session (which creates a prep-only subscription; the webhook is
 * careful not to let that flip the learning subscription_status).
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const auth = await requireUser(req, res)
  if (!auth) return
  // Never sell to an account a school provides for (migration 0037).
  if (await refuseIfSchoolProvided(res, auth)) return

  const limited = rateLimit(`prep-buy:${auth.userId}`, BILLING_LIMIT)
  if (!limited.allowed) {
    res.setHeader("Retry-After", String(limited.retryAfterSec))
    return res.status(429).json({ error: "rate_limited", retry_after: limited.retryAfterSec })
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return res.status(500).json({ error: "Billing is not configured" })
  }

  try {
    const { moduleId, studentIds } = req.body as PurchasePrepRequest
    const userId = auth.userId
    const email = auth.email ?? undefined
    if (!isPrepModuleId(moduleId)) {
      return res.status(400).json({ error: "Unknown prep module" })
    }
    if (
      !Array.isArray(studentIds) ||
      studentIds.length === 0 ||
      !studentIds.every((s) => typeof s === "string" && s.length > 0)
    ) {
      return res.status(400).json({ error: "studentIds must be a non-empty array" })
    }
    const ids = Array.from(new Set(studentIds))

    // Every child must be the caller's OWN before anything is billed or entitled.
    // Fails closed, and a foreign id is indistinguishable from a missing one.
    if (!(await requireOwnedStudents(res, auth, ids))) return

    const priceId = process.env[prepPriceEnv(moduleId)]
    if (!priceId) {
      return res.status(500).json({ error: "Prep module price is not configured" })
    }

    // The CALLER's own billing state.
    const supabase = auth.svc
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, subscription_status, plan")
      .eq("id", userId)
      .maybeSingle()

    const customerId = profile?.stripe_customer_id as string | null | undefined
    const status = profile?.subscription_status as string | null | undefined
    const plan = profile?.plan as string | null | undefined

    // Eligibility (enforced here, not just in the UI): the account needs an active
    // or trialing learning plan whose grade coverage reaches the module's band.
    // Elementary is excluded for a 6-8 module (HSPT/ISEE); SAT's band is [9,12], so
    // planQualifiesForBand excludes a Middle-only plan too — SAT is High-tier only.
    const mod = getPrepModule(moduleId)
    if (!mod || !planQualifiesForBand(status, plan, mod.gradeBand)) {
      // Message reflects the module's required tier: SAT ([9,12]) needs a High plan.
      const tier = mod && mod.gradeBand[0] >= 9 ? "a High School plan" : "a Middle or High School plan"
      return res.status(403).json({ error: `Admissions Prep requires an active ${tier}.` })
    }

    const stripe = new Stripe(secretKey)
    const metaKey = prepStudentsMetaKey(moduleId)
    const idsCsv = ids.join(",")

    // Existing billable subscription → add (or resize) the prep item on it.
    if (customerId && status && BILLABLE_STATUSES.has(status)) {
      const subs = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 20 })
      const sub = subs.data.find((s) => BILLABLE_STATUSES.has(s.status))
      if (sub) {
        const existing = sub.items.data.find((it) => it.price?.id === priceId)
        const item: Stripe.SubscriptionUpdateParams.Item = existing
          ? { id: existing.id, quantity: ids.length }
          : { price: priceId, quantity: ids.length }
        await stripe.subscriptions.update(sub.id, {
          items: [item],
          proration_behavior: "create_prorations",
          // Merged into existing metadata (Stripe merges per key), so the webhook
          // learns which children this module covers without disturbing the plan
          // metadata (plan, billing_period, user_id, extra_kids).
          metadata: { [metaKey]: idsCsv },
        })
        return res.status(200).json({ added: true })
      }
      // Had a customer id but no live subscription — fall through to Checkout.
    }

    // No subscription to add to → Checkout for the prep price. Creates a prep-only
    // subscription; the webhook stores the customer id and the entitlements
    // without touching the learning subscription_status/plan.
    const origin = req.headers.origin || `https://${req.headers.host}`
    const metadata: Record<string, string> = {
      user_id: userId,
      purchase_type: "prep",
      prep_module: moduleId,
      [metaKey]: idsCsv,
    }
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: ids.length }],
      customer: customerId ?? undefined,
      customer_email: customerId ? undefined : email,
      subscription_data: { metadata },
      metadata,
      success_url: `${origin}/settings?billing=success`,
      cancel_url: `${origin}/settings?billing=cancel`,
    })

    return res.status(200).json({ url: session.url })
  } catch (error) {
    console.error("purchase-prep error:", error)
    return res.status(500).json({ error: "Could not start the prep purchase" })
  }
}
