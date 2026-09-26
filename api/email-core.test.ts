import { describe, it, expect } from "vitest"
import { EmailRefusedError, schoolDomainRefusal, sendEmail } from "./email-core.js"

/**
 * The guard inside the send door. Every trial or billing template addressed to a
 * SCHOOL_DOMAIN_MAP domain is refused here, whatever list the caller built the
 * recipient from, so no future code path can mail a school by forgetting to
 * filter. The map is injected so these tests never read process.env.
 */
describe("schoolDomainRefusal", () => {
  const map = '{"pallottihs.info":"uuid-1","stjohns.edu":"uuid-2"}'

  it("refuses every trial and billing template to a school-domain address", () => {
    expect(schoolDomainRefusal("arkin.kukadia27@pallottihs.info", "trial_ended", map)).not.toBeNull()
    expect(schoolDomainRefusal("staff@pallottihs.info", "trial_reminder", map)).not.toBeNull()
    expect(schoolDomainRefusal("dean@stjohns.edu", "admissions_season", map)).not.toBeNull()
  })

  it("lets a consumer address through", () => {
    expect(schoolDomainRefusal("parent@gmail.com", "trial_ended", map)).toBeNull()
    expect(schoolDomainRefusal("parent@gmail.com", "admissions_season", map)).toBeNull()
  })

  it("ignores case and surrounding whitespace on the address", () => {
    expect(schoolDomainRefusal("  Arkin.Kukadia27@PallottiHS.INFO  ", "trial_ended", map)).not.toBeNull()
  })

  it("ignores case and surrounding whitespace on the map keys", () => {
    const sloppy = '{" PallottiHS.info ":"uuid-1"}'
    expect(schoolDomainRefusal("student@pallottihs.info", "trial_ended", sloppy)).not.toBeNull()
  })

  it("does not match a subdomain or a lookalike suffix", () => {
    expect(schoolDomainRefusal("x@mail.pallottihs.info", "trial_ended", map)).toBeNull()
    expect(schoolDomainRefusal("x@notpallottihs.info", "trial_ended", map)).toBeNull()
  })

  it("treats an unset map as no schools configured", () => {
    expect(schoolDomainRefusal("student@pallottihs.info", "trial_ended", undefined)).toBeNull()
    expect(schoolDomainRefusal("student@pallottihs.info", "trial_ended", "")).toBeNull()
  })

  it("refuses everything when the map is malformed", () => {
    // School and consumer addresses cannot be told apart, so nobody is mailed.
    expect(schoolDomainRefusal("parent@gmail.com", "trial_ended", "{not json")).not.toBeNull()
    expect(schoolDomainRefusal("parent@gmail.com", "admissions_season", "[]")).not.toBeNull()
  })
})

describe("sendEmail", () => {
  it("throws EmailRefusedError before touching the provider for a school address", async () => {
    const previous = process.env.SCHOOL_DOMAIN_MAP
    process.env.SCHOOL_DOMAIN_MAP = '{"pallottihs.info":"uuid-1"}'
    try {
      await expect(
        sendEmail("student@pallottihs.info", { subject: "s", html: "h", text: "t" }, "trial_ended"),
      ).rejects.toBeInstanceOf(EmailRefusedError)
    } finally {
      if (previous === undefined) delete process.env.SCHOOL_DOMAIN_MAP
      else process.env.SCHOOL_DOMAIN_MAP = previous
    }
  })
})
