import { describe, it, expect } from "vitest"
import {
  emailHash,
  joinNames,
  localMidnight,
  planEmails,
  previousPeriod,
  renderParentEmail,
  unsubscribeToken,
  verifyUnsubscribeToken,
  type ActivityRow,
  type SentRow,
} from "./parent-emails-core"

const kid = (over: Partial<ActivityRow> & { student_id: string; first_name: string }): ActivityRow => ({
  parent_id: "p1",
  grade: "7",
  above_grade_ok: false,
  school_covered: false,
  school_id: null,
  dean_student_id: null,
  account_email: "parent@example.com",
  subscription_status: "active",
  subjects: [],
  checks_answered: 0,
  checks_right: 0,
  mastered: [],
  tests: [],
  essays: 0,
  active: false,
  last_active_at: null,
  created_at: "2026-01-01T00:00:00Z",
  ...over,
})

// Wednesday Oct 14 2026, noon in New York.
const NOW = new Date("2026-10-14T16:00:00Z")
const WEEK = previousPeriod("weekly", NOW)
const MONTH = previousPeriod("monthly", NOW)

describe("periods, New York time", () => {
  it("weekly is the last full Monday to Sunday", () => {
    expect([WEEK.start, WEEK.end]).toEqual(["2026-10-05", "2026-10-11"])
    expect(WEEK.from.toISOString()).toBe("2026-10-05T04:00:00.000Z")
    expect(WEEK.to.toISOString()).toBe("2026-10-12T04:00:00.000Z")
  })
  it("a Monday run covers the week that just ended", () => {
    const p = previousPeriod("weekly", new Date("2026-10-19T13:00:00Z"))
    expect([p.start, p.end]).toEqual(["2026-10-12", "2026-10-18"])
  })
  it("monthly is the last full month", () => {
    expect([MONTH.start, MONTH.end]).toEqual(["2026-09-01", "2026-09-30"])
  })
  it("January's run covers December", () => {
    const p = previousPeriod("monthly", new Date("2027-01-01T14:00:00Z"))
    expect([p.start, p.end]).toEqual(["2026-12-01", "2026-12-31"])
  })
  it("midnight follows daylight saving", () => {
    expect(localMidnight("2026-11-02").toISOString()).toBe("2026-11-02T05:00:00.000Z")
    expect(localMidnight("2026-03-09").toISOString()).toBe("2026-03-09T04:00:00.000Z")
  })
})

describe("weekly plan", () => {
  it("goes only to families with a child who did something, one section per busy child", () => {
    const rows = [
      kid({ student_id: "a", first_name: "Ana", active: true, subjects: ["math"] }),
      kid({ student_id: "b", first_name: "Leo" }),
      kid({ student_id: "c", first_name: "Mia", parent_id: "p2", account_email: "quiet@example.com" }),
    ]
    const plan = planEmails(WEEK, rows, new Map(), [], new Set())
    expect(plan.map((p) => [p.to, p.children.map((c) => c.first_name)])).toEqual([["parent@example.com", ["Ana"]]])
  })
  it("does not send a week twice", () => {
    const rows = [kid({ student_id: "a", first_name: "Ana", active: true })]
    const sent: SentRow[] = [{ student_id: "a", kind: "weekly", period_start: WEEK.start, period_end: WEEK.end }]
    expect(planEmails(WEEK, rows, new Map(), sent, new Set())).toEqual([])
  })
  it("skips an unsubscribed address", () => {
    const rows = [kid({ student_id: "a", first_name: "Ana", active: true, account_email: "Parent@Example.com " })]
    expect(planEmails(WEEK, rows, new Map(), [], new Set([emailHash("parent@example.com")]))).toEqual([])
  })
  it("never mails a covered student's placeholder account", () => {
    const rows = [kid({ student_id: "a", first_name: "Ana", active: true, school_covered: true, account_email: "covered-x@covered.pathwayed.local" })]
    expect(planEmails(WEEK, rows, new Map(), [], new Set())).toEqual([])
  })
  it("sends covered students to each guardian, siblings together", () => {
    const rows = [
      kid({ student_id: "a", first_name: "Ana", active: true, school_covered: true, dean_student_id: "D1", account_email: null }),
      kid({ student_id: "b", first_name: "Ben", active: true, school_covered: true, dean_student_id: "d2", account_email: null }),
    ]
    const guardians = new Map([
      ["d1", ["mom@example.com", "dad@example.com"]],
      ["d2", ["mom@example.com"]],
    ])
    const plan = planEmails(WEEK, rows, guardians, [], new Set())
    expect(plan.map((p) => [p.to, p.recipientType, p.children.map((c) => c.first_name).join("+")])).toEqual([
      ["dad@example.com", "guardian", "Ana"],
      ["mom@example.com", "guardian", "Ana+Ben"],
    ])
  })
})

describe("monthly plan", () => {
  const idle = (over: Partial<ActivityRow> = {}) => kid({ student_id: "a", first_name: "Ana", ...over })
  it("goes to an idle active or trialing family", () => {
    expect(planEmails(MONTH, [idle()], new Map(), [], new Set())).toHaveLength(1)
    expect(planEmails(MONTH, [idle({ subscription_status: "free_trial" })], new Map(), [], new Set())).toHaveLength(1)
    expect(planEmails(MONTH, [idle({ subscription_status: "trialing" })], new Map(), [], new Set())).toHaveLength(1)
  })
  it("not to expired, canceled or inactive families", () => {
    for (const s of ["expired", "canceled", "inactive", "past_due"]) {
      expect(planEmails(MONTH, [idle({ subscription_status: s })], new Map(), [], new Set())).toEqual([])
    }
  })
  it("not when any child did something that month", () => {
    const rows = [idle(), kid({ student_id: "b", first_name: "Leo", active: true })]
    expect(planEmails(MONTH, rows, new Map(), [], new Set())).toEqual([])
  })
  it("not when a weekly email covered a week overlapping the month", () => {
    const sent: SentRow[] = [{ student_id: "a", kind: "weekly", period_start: "2026-08-31", period_end: "2026-09-06" }]
    expect(planEmails(MONTH, [idle()], new Map(), sent, new Set())).toEqual([])
  })
  it("a weekly email for a week outside the month does not block it", () => {
    const sent: SentRow[] = [{ student_id: "a", kind: "weekly", period_start: "2026-08-24", period_end: "2026-08-30" }]
    expect(planEmails(MONTH, [idle()], new Map(), sent, new Set())).toHaveLength(1)
  })
  it("is only about children who were on PathwayEd that month", () => {
    const late = kid({ student_id: "b", first_name: "Leo", created_at: "2026-10-02T12:00:00Z" })
    expect(planEmails(MONTH, [late], new Map(), [], new Set())).toEqual([])
    const plan = planEmails(MONTH, [idle(), late], new Map(), [], new Set())
    expect(plan.map((p) => p.children.map((c) => c.first_name))).toEqual([["Ana"]])
  })
  it("school guardians get it whatever the account status", () => {
    const row = idle({ school_covered: true, dean_student_id: "d1", account_email: null, subscription_status: "inactive" })
    expect(planEmails(MONTH, [row], new Map([["d1", ["g@example.com"]]]), [], new Set())).toHaveLength(1)
  })
})

describe("unsubscribe tokens", () => {
  it("round-trips and names the address only by hash", () => {
    const t = unsubscribeToken("Parent@Example.com", "s3cret")
    expect(t).not.toContain("parent")
    expect(verifyUnsubscribeToken(t, "s3cret")).toBe(emailHash("parent@example.com"))
  })
  it("refuses a token signed with another secret or edited", () => {
    const t = unsubscribeToken("parent@example.com", "s3cret")
    expect(verifyUnsubscribeToken(t, "other")).toBeNull()
    expect(verifyUnsubscribeToken(emailHash("x@example.com") + t.slice(64), "s3cret")).toBeNull()
    expect(verifyUnsubscribeToken("", "s3cret")).toBeNull()
  })
})

describe("copy", () => {
  const busy = kid({
    student_id: "a",
    first_name: "Ana",
    active: true,
    subjects: ["reading", "math"],
    mastered: ["Fractions", "Main idea"],
    checks_answered: 18,
    checks_right: 14,
    tests: [{ module_id: "sat", section_id: "math-1", at: "2026-10-08T15:00:00Z" }],
  })

  it("weekly: the approved lines, measured only", () => {
    const m = renderParentEmail(WEEK, { to: "p@example.com", recipientType: "account", children: [busy] }, "https://u")
    expect(m.subject).toBe("Ana's week on PathwayEd")
    expect(m.text).toContain("Here is what Ana did on PathwayEd this week, Monday Oct 5 to Sunday Oct 11.")
    expect(m.text).toContain("Tutoring: Reading and Math")
    expect(m.text).toContain("Skills mastered: 2 (Fractions, Main idea)")
    expect(m.text).toContain("Check questions: 14 of 18 right")
    expect(m.text).toContain("Practice test finished: SAT Math, Module 1 on Oct 8")
    expect(m.text).toContain("See Ana's progress: https://app.pathwayed.org/parent")
    expect(m.text).toContain("You get this email in weeks when Ana uses PathwayEd. Unsubscribe: https://u")
  })

  it("weekly to a guardian has no progress button (they have no account)", () => {
    const m = renderParentEmail(WEEK, { to: "g@example.com", recipientType: "guardian", children: [busy] }, "https://u")
    expect(m.text).not.toContain("progress:")
    expect(m.html).not.toContain("/parent")
  })

  it("weekly for two children names both and sections each", () => {
    const leo = kid({ student_id: "b", first_name: "Leo", active: true, checks_answered: 4, checks_right: 3 })
    const m = renderParentEmail(WEEK, { to: "p@example.com", recipientType: "account", children: [busy, leo] }, "https://u")
    expect(m.subject).toBe("Ana and Leo's week on PathwayEd")
    expect(m.text).toContain("Leo\nCheck questions: 3 of 4 right")
    expect(m.text).toContain("in weeks when your children use PathwayEd")
  })

  it("monthly: the approved copy, SAT practice only with SAT framing on", () => {
    const quiet = kid({ student_id: "a", first_name: "Ana", last_active_at: "2026-08-28T16:00:00Z" })
    const m = renderParentEmail(MONTH, { to: "p@example.com", recipientType: "account", children: [quiet] }, "https://u")
    expect(m.subject).toBe("Ana did not use PathwayEd in September")
    expect(m.text).toContain("Ana did not have any tutoring sessions in September. Ana was last active on Aug 28.")
    expect(m.text).toContain("When Ana is ready, everything they have learned so far is saved, and they can pick up where they left off.")
    expect(m.text).toContain("Open PathwayEd: https://app.pathwayed.org")
    expect(m.text).toContain("You get this email only in months when Ana has not used PathwayEd.")
    const sat = { ...quiet, grade: "11", above_grade_ok: true }
    expect(renderParentEmail(MONTH, { to: "p@example.com", recipientType: "account", children: [sat] }, "u").text)
      .toContain("tutoring sessions or SAT practice in September")
  })

  it("monthly: a child who never started", () => {
    const m = renderParentEmail(MONTH, { to: "p@example.com", recipientType: "account", children: [kid({ student_id: "a", first_name: "Ana" })] }, "u")
    expect(m.text).toContain("Ana has not used PathwayEd yet.")
  })

  it("no em dashes, no projections, names escaped in HTML", () => {
    const odd = { ...busy, first_name: "<b>Al</b>" }
    for (const period of [WEEK, MONTH]) {
      const m = renderParentEmail(period, { to: "p@example.com", recipientType: "account", children: [odd] }, "https://u")
      expect(m.subject + m.text + m.html).not.toMatch(/[—–]/)
      expect(m.text).not.toMatch(/\b(will|on track|projected|expected to|likely)\b/i)
      expect(m.html).not.toContain("<b>Al</b>")
    }
  })

  it("joins names", () => {
    expect(joinNames(["Ana"])).toBe("Ana")
    expect(joinNames(["Ana", "Leo", "Mia"])).toBe("Ana, Leo and Mia")
  })
})
