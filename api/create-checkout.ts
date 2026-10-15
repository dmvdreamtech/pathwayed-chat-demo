import Stripe from "stripe"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import {
  addonPriceEnv,
  extraKids as computeExtraKids,
  isBillingPeriod,
  isPlanId,
  planPriceEnv,
  type BillingPeriod,
  type PlanId,
} from "./billing-core.js"
import { requireUser } from "./require-auth.js"
import { refuseIfSchoolProvided } from "./billing-guard.js"
import { rateLimit, BILLING_LIMIT } from "./rate-limit.js"

/**
 * Start a Stripe Checkout session for the SIGNED-IN parent.
 *
 * IDENTITY COMES FROM THE SESSION, NOT THE BODY. userId and email used to be taken
 * from the request. metadata.user_id drives the webhook, which writes
 * subscription_status, plan, paid_seats, and stripe_customer_id onto that profile
 * with the service role, bypassing RLS. A caller who knew someone else's user id
 * could therefore stamp a subscription with it and later cancel it, flipping a
 * paying customer's account to 'canceled'. Both fields are now ignored if sent.
 *
 * totalKids is DELIBERATELY still taken from the body and left exactly as it was.
 * Deriving it server-side would change the add-on quantity, and therefore what
 * live customers are billed. That is a pricing change, not a security fix, and it
 * is scoped separately.
 */
interface CheckoutRequest {
  plan: PlanId
  billingPeriod: BillingPeriod
  totalKids: number
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const auth = await requireUser(req, res)
  if (!auth) return
  // Never sell to an account a school provides for (migration 0037).
  if (await refuseIfSchoolProvided(res, auth)) return

  const limited = rateLimit(`checkout:${auth.userId}`, BILLING_LIMIT)
  if (!limited.allowed) {
    res.setHeader("Retry-After", String(limited.retryAfterSec))
    return res.status(429).json({ error: "rate_limited", retry_after: limited.retryAfterSec })
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return res.status(500).json({ error: "Stripe is not configured" })
  }
  const stripe = new Stripe(secretKey)

  try {
    const { plan, billingPeriod, totalKids } = req.body as CheckoutRequest
    // From the verified auth record. A minted K-8 identity has a non-routable
    // placeholder email, but those accounts are school-covered and never reach
    // checkout; undefined simply lets Stripe collect the address on its page.
    const email = auth.email ?? undefined
    const userId = auth.userId

    if (!isPlanId(plan) || !isBillingPeriod(billingPeriod)) {
      return res.status(400).json({ error: "Invalid plan or billing period" })
    }

    const basePriceId = process.env[planPriceEnv(plan, billingPeriod)]
    if (!basePriceId) {
      return res.status(500).json({ error: "Plan price is not configured" })
    }

    const extraKids = computeExtraKids(plan, totalKids)

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [{ price: basePriceId, quantity: 1 }]
    if (extraKids > 0) {
      const addonPriceId = process.env[addonPriceEnv(billingPeriod)]
      if (!addonPriceId) {
        return res.status(500).json({ error: "Add-on price is not configured" })
      }
      lineItems.push({ price: addonPriceId, quantity: extraKids })
    }

    const origin = req.headers.origin || `https://${req.headers.host}`
    const metadata: Record<string, string> = {
      // The verified caller. This is what the webhook matches a profile on.
      user_id: userId,
      plan,
      billing_period: billingPeriod,
      extra_kids: String(extraKids),
    }

    // Pay-now checkout: no trial_period_days. The 7-day trial is app-managed
    // (profiles.subscription_status = 'free_trial'); subscribing here charges
    // immediately and the webhook flips the account to 'active'.
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: lineItems,
      customer_email: email,
      subscription_data: {
        metadata,
      },
      metadata,
      success_url: `${origin}/settings?billing=success`,
      cancel_url: `${origin}/settings?billing=cancel`,
    })

    return res.status(200).json({ id: session.id, url: session.url })
  } catch (error) {
    console.error("create-checkout error:", error)
    return res.status(500).json({ error: "Could not start checkout" })
  }
}
