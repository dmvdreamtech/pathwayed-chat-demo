import { describe, it, expect, vi, beforeEach } from "vitest"
import type { VercelRequest, VercelResponse } from "@vercel/node"

// Every key is set: provider, sender and unsubscribe secret. Only the start date
// decides whether anything is sent.
const state = vi.hoisted(() => {
  process.env.EMAIL_PROVIDER_API_KEY = "re_test"
  process.env.EMAIL_FROM = "PathwayEd <updates@mail.pathwayed.org>"
  process.env.UNSUBSCRIBE_SECRET = "unsub-secret"
  process.env.SUPABASE_URL = "https://example.supabase.co"
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service"
  return { sent: 0, logged: 0 }
})

vi.mock("./require-auth.js", () => ({ requireCronSecret: () => true }))
vi.mock("./school-bridge.js", () => ({ deanPost: async () => ({ ok: true, status: 200, data: { students: [] } }) }))
vi.mock("./email-core.js", async (orig) => ({
  ...(await orig<typeof import("./email-core.js")>()),
  sendEmail: async () => {
    state.sent++
  },
}))

// One paying family whose child was active in every period asked about.
const activeKid = {
  student_id: "s1", parent_id: "p1", first_name: "Ana", grade: "7", above_grade_ok: false,
  school_covered: false, school_id: null, dean_student_id: null, account_email: "parent@example.com",
  subscription_status: "active", subjects: ["math:expressions"], checks_answered: 3, checks_right: 2,
  mastered: [], tests: [], essays: 0, active: true, last_active_at: "2026-10-15T15:00:00Z",
  created_at: "2026-01-01T00:00:00Z",
}
const chain = (result: unknown): unknown =>
  new Proxy(() => {}, {
    get: (_t, prop) => (prop === "then" ? (r: (v: unknown) => void) => r(result) : () => chain(result)),
    apply: () => chain(result),
  })
vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    rpc: async () => ({ data: [activeKid], error: null }),
    from: (table: string) => {
      if (table === "parent_email_sends") {
        return {
          select: () => chain({ data: [], error: null }),
          upsert: async () => {
            state.logged++
            return { error: null }
          },
        }
      }
      if (table === "skills") return chain({ data: [{ slug: "expressions", name: "Expressions" }], error: null })
      return chain({ data: [], error: null })
    },
  }),
}))

import handler from "./parent-emails"

async function run(kind: "weekly" | "monthly", now: string) {
  vi.setSystemTime(new Date(now))
  const out = { status: 0, body: {} as { mode?: string; dry_reasons: string[]; families?: number } }
  const res = {
    status(c: number) {
      out.status = c
      return res
    },
    json(b: unknown) {
      out.body = b as typeof out.body
      return res
    },
  } as unknown as VercelResponse
  await handler({ method: "GET", query: { kind }, headers: {} } as unknown as VercelRequest, res)
  return out
}

beforeEach(() => {
  vi.useFakeTimers()
  state.sent = 0
  state.logged = 0
  process.env.PARENT_EMAILS_START_DATE = "2026-10-19"
})

describe("parent emails with every key set", () => {
  it("before the start date, the Monday run only reports counts", async () => {
    const out = await run("weekly", "2026-10-19T13:00:00Z") // covers Oct 12 to 18
    expect(out.body.mode).toBe("dry_run")
    expect(out.body.dry_reasons.join(" ")).toMatch(/before PARENT_EMAILS_START_DATE/)
    expect(out.body.families).toBe(1)
    expect(state.sent).toBe(0)
    expect(state.logged).toBe(0)
  })

  it("the first full week on or after the start date is sent", async () => {
    const out = await run("weekly", "2026-10-26T13:00:00Z") // covers Oct 19 to 25
    expect(out.body.mode).toBe("sent")
    expect(state.sent).toBe(1)
    expect(state.logged).toBe(1)
  })

  it("missing start date: nothing sends, ever", async () => {
    delete process.env.PARENT_EMAILS_START_DATE
    const out = await run("weekly", "2027-03-01T14:00:00Z")
    expect(out.body.mode).toBe("dry_run")
    expect(state.sent).toBe(0)
  })

  it("invalid start date: nothing sends", async () => {
    process.env.PARENT_EMAILS_START_DATE = "October 19"
    const out = await run("monthly", "2027-03-01T14:00:00Z")
    expect(out.body.mode).toBe("dry_run")
    expect(state.sent).toBe(0)
  })

  it("monthly: October (begun before the date) is counts only on Nov 1", async () => {
    const out = await run("monthly", "2026-11-01T14:00:00Z")
    expect(out.body.mode).toBe("dry_run")
    expect(state.sent).toBe(0)
  })
})
