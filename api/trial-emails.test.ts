import { describe, it, expect } from "vitest"
import { coveredParentIds } from "./trial-emails.js"

/**
 * School-covered accounts must never be mailed about a trial or a subscription —
 * their school holds the license. The cron's only job here is to turn a flat list
 * of student rows into the set of accounts to skip, using the same rule the access
 * gate applies (hasCoveredStudent). These tests pin the grouping: a covered child
 * must cover their OWN account and nobody else's, and the inactive-child exclusion
 * the gate makes must survive the trip through the group-by.
 */
describe("coveredParentIds", () => {
  const row = (parent_id: string, over: Partial<{ active: boolean; school_covered: boolean }> = {}) => ({
    parent_id,
    active: true,
    school_covered: false,
    ...over,
  })

  it("covers no account when nothing is school covered (the B2C default)", () => {
    expect(coveredParentIds([]).size).toBe(0)
    expect(coveredParentIds([row("a"), row("a"), row("b")]).size).toBe(0)
  })

  it("covers an account with one covered child among uncovered siblings", () => {
    const covered = coveredParentIds([row("a"), row("a", { school_covered: true }), row("a")])
    expect([...covered]).toEqual(["a"])
  })

  it("covers only the account the covered child belongs to", () => {
    // The bug this guards: one licensed account must not silence every other
    // family's trial mail, and one B2C family must not un-silence a school's.
    const covered = coveredParentIds([row("pallotti", { school_covered: true }), row("b2c")])
    expect(covered.has("pallotti")).toBe(true)
    expect(covered.has("b2c")).toBe(false)
  })

  it("ignores an inactive covered child, matching the gate", () => {
    // An over-seat-cap child the parent switched off does not hold the gate open,
    // so it must not suppress the mail either.
    expect(coveredParentIds([row("a", { active: false, school_covered: true })]).size).toBe(0)
    // ...but an active covered sibling on the same account still counts.
    expect(
      coveredParentIds([
        row("a", { active: false, school_covered: true }),
        row("a", { school_covered: true }),
      ]).has("a"),
    ).toBe(true)
  })
})
