import { describe, it, expect } from "vitest"
import {
  parseStartDate,
  previousPeriod,
  renderParentEmail,
  startDateRefusal,
  subjectList,
  type ActivityRow,
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

const skillNames = new Map([
  ["expressions", "Expressions"],
  ["functions", "Functions"],
  ["main-idea", "Main Idea"],
])

describe("session subjects in the emails", () => {
  it("shows the subject and the skill, never the raw key", () => {
    expect(subjectList(["math:expressions"], skillNames)).toBe("Math (Expressions)")
    expect(subjectList(["math:expressions", "math", "math:functions", "reading:main-idea"], skillNames)).toBe(
      "Math (Expressions, Functions) and Reading (Main Idea)",
    )
    expect(subjectList(["math:algebra", "reading:vocabulary-in-context"], skillNames)).toBe("Math and Reading")
  })

  it("the weekly email line reads plainly", () => {
    const week = previousPeriod("weekly", new Date("2026-10-14T16:00:00Z"))
    const evan = kid({ student_id: "e", first_name: "Evan", active: true, subjects: ["math:expressions"] })
    const m = renderParentEmail(week, { to: "g@example.com", recipientType: "guardian", children: [evan] }, "u", skillNames)
    expect(m.text).toContain("Tutoring: Math (Expressions)")
    expect(m.text).not.toContain("Math:expressions")
  })
})

describe("monthly copy for a child who never started", () => {
  const month = previousPeriod("monthly", new Date("2026-10-14T16:00:00Z"))
  const render = (...kids: ActivityRow[]) =>
    renderParentEmail(month, { to: "p@example.com", recipientType: "account", children: kids }, "u").text

  it("says they can start any time, not that progress is saved", () => {
    const t = render(kid({ student_id: "b", first_name: "Becca" }))
    expect(t).toContain("Becca has not used PathwayEd yet.")
    expect(t).toContain("When Becca is ready, they can start any time.")
    expect(t).not.toContain("everything they have learned")
  })
  it("keeps the approved copy for a child who has used it", () => {
    const t = render(kid({ student_id: "b", first_name: "Becca", last_active_at: "2026-08-28T16:00:00Z" }))
    expect(t).toContain("When Becca is ready, everything they have learned so far is saved, and they can pick up where they left off.")
  })
  it("two children who never started", () => {
    expect(render(kid({ student_id: "a", first_name: "Ana" }), kid({ student_id: "b", first_name: "Ben" }))).toContain(
      "When they are ready, they can start any time.",
    )
  })
})

describe("PARENT_EMAILS_START_DATE", () => {
  it("is a real YYYY-MM-DD date", () => {
    expect(parseStartDate("2026-10-19")).toBe("2026-10-19")
    expect(parseStartDate(" 2026-10-19 ")).toBe("2026-10-19")
    for (const bad of [undefined, "", "2026-02-30", "10/19/2026", "2026-10-19T00:00:00Z", "2026-1-9", "soon"]) {
      expect(parseStartDate(bad)).toBeNull()
    }
  })

  it("missing or invalid: nothing ever sends", () => {
    const week = previousPeriod("weekly", new Date("2027-06-01T16:00:00Z"))
    expect(startDateRefusal(week, undefined)).toMatch(/missing/)
    expect(startDateRefusal(week, "next monday")).toMatch(/missing/)
  })

  it("weekly: the first email covers the first full week starting on or after the date, no catch-up", () => {
    const start = "2026-10-19" // a Monday
    // Monday Oct 19 run covers Oct 12 to 18: before the start, counts only.
    expect(startDateRefusal(previousPeriod("weekly", new Date("2026-10-19T13:00:00Z")), start)).toMatch(/before/)
    // Monday Oct 26 run covers Oct 19 to 25: the first one sent.
    expect(startDateRefusal(previousPeriod("weekly", new Date("2026-10-26T13:00:00Z")), start)).toBeNull()
  })

  it("weekly: a mid-week date waits for the next full week", () => {
    const start = "2026-10-21" // a Wednesday
    expect(startDateRefusal(previousPeriod("weekly", new Date("2026-10-26T13:00:00Z")), start)).toMatch(/before/)
    expect(startDateRefusal(previousPeriod("weekly", new Date("2026-11-02T14:00:00Z")), start)).toBeNull()
  })

  it("monthly: the first email covers the first full month starting on or after the date", () => {
    const start = "2026-10-19"
    // Nov 1 run covers October, which began before the date: counts only.
    expect(startDateRefusal(previousPeriod("monthly", new Date("2026-11-01T14:00:00Z")), start)).toMatch(/before/)
    // Dec 1 run covers November: the first one sent.
    expect(startDateRefusal(previousPeriod("monthly", new Date("2026-12-01T14:00:00Z")), start)).toBeNull()
    // A date on the 1st counts that month.
    expect(startDateRefusal(previousPeriod("monthly", new Date("2026-12-01T14:00:00Z")), "2026-11-01")).toBeNull()
  })
})
