import { describe, it, expect, vi, beforeEach } from "vitest"
import type { VercelRequest, VercelResponse } from "@vercel/node"

// The routes run for real. Only the signed-in caller (requireUser) and Stripe are
// stand-ins, so the tests see exactly what each route does for each account.
const state = vi.hoisted(() => ({
  reason: null as string | null,
  rpcError: false,
  email: "parent@example.com" as string | null,
  stripeConstructed: 0,
  checkoutCreated: 0,
}))

vi.mock("./require-auth.js", () => ({
  requireUser: async () => ({
    userId: "u-1",
    email: state.email,
    svc: {
      rpc: async (fn: string) => {
        if (fn !== "school_provided_reason") throw new Error(`unexpected rpc ${fn}`)
        return state.rpcError ? { data: null, error: { message: "down" } } : { data: state.reason, error: null }
      },
      from: () => {
        throw new Error("a blocked caller must not reach the database reads")
      },
    },
  }),
  requireOwnedStudents: async () => true,
}))

vi.mock("stripe", () => ({
  default: class {
    constructor() {
      state.stripeConstructed++
    }
    checkout = {
      sessions: {
        create: async () => {
          state.checkoutCreated++
          return { id: "cs_test", url: "https://checkout.stripe.com/test" }
        },
      },
    }
  },
}))

import createCheckout from "./create-checkout"
import purchasePrep from "./purchase-prep"
import updateSeats from "./update-seats"
import { schoolProvidedReason } from "./billing-guard"

function call(handler: (req: VercelRequest, res: VercelResponse) => unknown, body: unknown) {
  const out = { status: 0, body: null as unknown }
  const res = {
    status(code: number) {
      out.status = code
      return res
    },
    json(b: unknown) {
      out.body = b
      return res
    },
    setHeader() {
      return res
    },
  } as unknown as VercelResponse
  const req = { method: "POST", body, headers: { origin: "https://app.pathwayed.org" }, query: {} } as unknown as VercelRequest
  return Promise.resolve(handler(req, res)).then(() => out)
}

const ROUTES = [
  ["create-checkout", createCheckout, { plan: "middle", billingPeriod: "monthly", totalKids: 1 }],
  ["purchase-prep", purchasePrep, { moduleId: "sat", studentIds: ["s-1"] }],
  ["update-seats", updateSeats, { totalKids: 3 }],
] as const

beforeEach(() => {
  state.reason = null
  state.rpcError = false
  state.email = "parent@example.com"
  state.stripeConstructed = 0
  state.checkoutCreated = 0
  process.env.STRIPE_SECRET_KEY = "sk_test_x"
  process.env.STRIPE_PRICE_MIDDLE_MONTHLY = "price_middle_monthly"
  delete process.env.SCHOOL_DOMAIN_MAP
})

describe("school-provided accounts are refused before Stripe", () => {
  for (const reason of ["school_staff", "covered_student", "platform_admin", "school_domain"]) {
    for (const [name, handler, body] of ROUTES) {
      it(`${reason}: ${name} is refused`, async () => {
        state.reason = reason
        const out = await call(handler, body)
        expect(out.status).toBe(403)
        expect(out.body).toMatchObject({ error: "school_provided", reason, message: "Your school provides PathwayEd." })
        expect(state.stripeConstructed).toBe(0)
      })
    }
  }

  it("an address at a SCHOOL_DOMAIN_MAP domain is refused even when the database list lacks it", async () => {
    process.env.SCHOOL_DOMAIN_MAP = JSON.stringify({ "school.example.org": "school-1" })
    state.email = "teacher@School.Example.org"
    const out = await call(createCheckout, ROUTES[0][2])
    expect(out.status).toBe(403)
    expect(out.body).toMatchObject({ reason: "school_domain" })
    expect(state.stripeConstructed).toBe(0)
  })

  it("a failed check refuses rather than risk charging a school account", async () => {
    state.rpcError = true
    for (const [, handler, body] of ROUTES) {
      const out = await call(handler, body)
      expect(out.status).toBe(503)
    }
    expect(state.stripeConstructed).toBe(0)
  })
})

describe("a normal paying parent can still check out", () => {
  it("create-checkout opens a Stripe Checkout session", async () => {
    const out = await call(createCheckout, ROUTES[0][2])
    expect(out.status).toBe(200)
    expect(out.body).toEqual({ id: "cs_test", url: "https://checkout.stripe.com/test" })
    expect(state.checkoutCreated).toBe(1)
  })

  it("a malformed SCHOOL_DOMAIN_MAP does not block parents", async () => {
    process.env.SCHOOL_DOMAIN_MAP = "{not json"
    expect(await schoolProvidedReason({ rpc: async () => ({ data: null, error: null }) } as never, "u-1", "parent@example.com")).toBeNull()
  })
})
