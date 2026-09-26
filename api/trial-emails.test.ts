import { describe, it, expect } from "vitest"
import { coveredParentIds, endedEmail, reminderEmail } from "./trial-emails.js"
import { APP_URL, isSchoolDomainEmail, parseSchoolDomains } from "./email-core.js"

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

/**
 * The second suppression rule: anyone at a domain a licensed school owns, staff
 * included. Staff are not on the STUDENT roster, so Dean returns covered:false for
 * them and no school_covered row is ever written — the coverage rule above cannot
 * see them at all, and they are the people who reported receiving these mails.
 *
 * This rule governs MAIL AND STATUS ONLY, never access. That is what makes an
 * over-broad answer here cheap (an unsent reminder) where the same rule feeding the
 * access gate would be a paywall bypass for anyone with a school address.
 */
describe("parseSchoolDomains", () => {
  it("reads the domains out of the same map school-login keys on", () => {
    const domains = parseSchoolDomains('{"pallotti.org":"uuid-1","stjohns.edu":"uuid-2"}')
    expect(domains && [...domains].sort()).toEqual(["pallotti.org", "stjohns.edu"])
  })

  it("treats an unset or empty map as no schools configured, not as an error", () => {
    // The B2C-only deployment. Every account is mailable and nothing is suppressed.
    expect(parseSchoolDomains(undefined)?.size).toBe(0)
    expect(parseSchoolDomains("")?.size).toBe(0)
    expect(parseSchoolDomains("   ")?.size).toBe(0)
  })

  it("returns null for a malformed map so the caller can refuse to send", () => {
    // Unparseable config means school and consumer addresses are indistinguishable.
    // Mailing every school in the pilot is worse than skipping the run.
    expect(parseSchoolDomains("{not json")).toBeNull()
    expect(parseSchoolDomains('["pallotti.org"]')).toBeNull()
    expect(parseSchoolDomains("null")).toBeNull()
  })

  it("lowercases keys, so a capitalised map entry still suppresses", () => {
    const domains = parseSchoolDomains('{"Pallotti.ORG":"uuid-1"}')
    expect(isSchoolDomainEmail("staff@pallotti.org", domains!)).toBe(true)
  })
})

describe("isSchoolDomainEmail", () => {
  const domains = new Set(["pallotti.org"])

  it("suppresses a school address whatever its case", () => {
    expect(isSchoolDomainEmail("staff@pallotti.org", domains)).toBe(true)
    expect(isSchoolDomainEmail("Staff@Pallotti.ORG", domains)).toBe(true)
  })

  it("leaves consumer addresses alone, including lookalikes", () => {
    expect(isSchoolDomainEmail("parent@gmail.com", domains)).toBe(false)
    // A subdomain and a suffix match are NOT the school's domain. Matching them
    // would let notpallotti.org mute its own trial mail.
    expect(isSchoolDomainEmail("someone@mail.pallotti.org", domains)).toBe(false)
    expect(isSchoolDomainEmail("someone@notpallotti.org", domains)).toBe(false)
  })

  it("is false for an address that could not be resolved or has no domain", () => {
    // The caller treats these as unknown: not mailed, not flipped, retried.
    expect(isSchoolDomainEmail(null, domains)).toBe(false)
    expect(isSchoolDomainEmail("nodomain", domains)).toBe(false)
  })
})

/**
 * The rendered templates. Links must point at the public app, never at whichever
 * host the cron happened to call (a Pallotti student received a link to
 * pathwayed-chat-demo-<hash>.vercel.app), and user-facing copy carries no dashes.
 */
describe("trial templates", () => {
  const dash = /[–—]/

  it("builds every link from the fixed APP_URL", () => {
    for (const mail of [reminderEmail("Sam", 2), endedEmail("Sam")]) {
      expect(mail.text).toContain(`${APP_URL}/settings`)
      expect(mail.html).toContain(`href="${APP_URL}/settings"`)
      expect(mail.html).not.toMatch(/vercel\.app/)
    }
  })

  it("carries no em-dash or en-dash in the ended template", () => {
    const mail = endedEmail(null)
    expect(mail.subject).not.toMatch(dash)
    expect(mail.text).not.toMatch(dash)
    expect(mail.html).not.toMatch(dash)
  })

  it("carries no em-dash or en-dash in the reminder template", () => {
    const mail = reminderEmail(null, 1)
    expect(mail.subject).not.toMatch(dash)
    expect(mail.text).not.toMatch(dash)
    expect(mail.html).not.toMatch(dash)
  })
})
