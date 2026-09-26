// The one door every outbound email leaves through.
//
// Both senders in api/ (the trial cron and the admissions-season mail) used to
// carry their own copy of the Resend call and build links from whatever host
// header the request arrived with. This module owns three things instead:
//
//   1. APP_URL, the fixed public origin every email link is built from. The
//      Vercel cron invokes the function on its deployment URL, so a link built
//      from req.headers.host pointed at pathwayed-chat-demo-<hash>.vercel.app
//      rather than app.pathwayed.org. Mail must never depend on who called.
//   2. The school-domain guard. A trial or billing template is REFUSED to any
//      address at a domain in SCHOOL_DOMAIN_MAP, inside sendEmail itself, so a
//      future caller cannot mail a school by forgetting to filter its list.
//   3. sendEmail, the raw Resend HTTP call (no SDK dependency).
//
// The guard is a MAIL rule only. It never feeds the access gate: suppressing a
// mail on a domain grants nothing, so a wrong answer costs an unsent reminder,
// whereas granting access on a domain would be a paywall bypass for anyone with
// a school address. See the domain-vs-roster note in api/school-login.ts.

const EMAIL_PROVIDER_API_KEY = process.env.EMAIL_PROVIDER_API_KEY
const EMAIL_FROM = process.env.EMAIL_FROM

/** The public origin every email link is built from. Fixed on purpose. */
export const APP_URL = "https://app.pathwayed.org"

export interface RenderedEmail {
  subject: string
  html: string
  text: string
}

/**
 * Every template this codebase can send, with the category the guard keys on.
 * Adding a template means adding it here, which is the point: there is no way
 * to send an unlisted one, and no way to list one without saying what it is.
 *
 *   trial   - the countdown and the ended notice. A school holds the licence,
 *             so a trial is not a true statement about a school account.
 *   billing - anything that asks the recipient to pay. The admissions-season
 *             upsell is billing: it quotes a price and links to checkout.
 */
export const EMAIL_TEMPLATES = {
  trial_reminder: "trial",
  trial_ended: "trial",
  admissions_season: "billing",
} as const

export type EmailTemplate = keyof typeof EMAIL_TEMPLATES
export type EmailCategory = (typeof EMAIL_TEMPLATES)[EmailTemplate]

const SCHOOL_SUPPRESSED_CATEGORIES: ReadonlySet<EmailCategory> = new Set(["trial", "billing"])

/**
 * The domains a licensed school owns: the KEYS of SCHOOL_DOMAIN_MAP, the same
 * map api/school-login.ts maps to a Dean school_id. The school_id values are
 * Dean's business, not mail's.
 *
 * Returns null for a MALFORMED map, and the guard then refuses every trial and
 * billing mail. Unset is not malformed: it is the legitimate "no schools
 * configured" state and yields an empty set. The distinction matters, because
 * unparseable JSON means a school address cannot be told from a consumer one,
 * and mailing every school in the pilot is worse than skipping a run.
 *
 * Keys are trimmed and lowercased on the way in. school-login lowercases only
 * the lookup side and so assumes lowercase, untrimmed keys; doing both here can
 * only ever suppress MORE mail, which is the safe direction for a rule that
 * grants nothing.
 */
export function parseSchoolDomains(raw: string | undefined): Set<string> | null {
  if (!raw || raw.trim() === "") return new Set<string>()
  try {
    const map = JSON.parse(raw) as Record<string, string>
    if (typeof map !== "object" || map === null || Array.isArray(map)) return null
    return new Set(Object.keys(map).map((d) => d.trim().toLowerCase()))
  } catch {
    return null
  }
}

/** True when this address sits at a domain a licensed school owns. */
export function isSchoolDomainEmail(email: string | null, domains: Set<string>): boolean {
  if (!email) return false
  const domain = email.trim().split("@")[1]?.trim().toLowerCase()
  return Boolean(domain) && domains.has(domain as string)
}

/**
 * Why this template must not go to this address, or null when it may.
 *
 * Exported so a caller that has to act BEFORE sending (the trial cron flips an
 * account to 'expired' before its ended mail goes out) can ask the same question
 * the send itself will ask. sendEmail applies it unconditionally either way.
 *
 * `rawMap` is injectable for the unit test; production reads the env at call
 * time so a redeploy with a changed map needs no restart.
 */
export function schoolDomainRefusal(
  to: string,
  template: EmailTemplate,
  rawMap: string | undefined = process.env.SCHOOL_DOMAIN_MAP,
): string | null {
  const category = EMAIL_TEMPLATES[template]
  if (!SCHOOL_SUPPRESSED_CATEGORIES.has(category)) return null
  const domains = parseSchoolDomains(rawMap)
  if (!domains) return "SCHOOL_DOMAIN_MAP is not valid JSON, so school and consumer addresses cannot be told apart"
  if (isSchoolDomainEmail(to, domains)) return "recipient is at a school-owned domain"
  return null
}

/** Thrown by sendEmail when the guard refuses. Callers may match on it. */
export class EmailRefusedError extends Error {
  readonly template: EmailTemplate
  constructor(template: EmailTemplate, reason: string) {
    super(`refused ${template}: ${reason}`)
    this.name = "EmailRefusedError"
    this.template = template
  }
}

/** True when EMAIL_PROVIDER_API_KEY and EMAIL_FROM are both set. */
export function emailProviderConfigured(): boolean {
  return Boolean(EMAIL_PROVIDER_API_KEY && EMAIL_FROM)
}

/**
 * Send one email through Resend. The school-domain guard runs FIRST and throws
 * EmailRefusedError, so no caller can reach the provider with a trial or billing
 * template addressed to a school, whatever list it built the recipient from.
 */
export async function sendEmail(to: string, mail: RenderedEmail, template: EmailTemplate): Promise<void> {
  const refusal = schoolDomainRefusal(to, template)
  if (refusal) throw new EmailRefusedError(template, refusal)

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${EMAIL_PROVIDER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: EMAIL_FROM, to, subject: mail.subject, html: mail.html, text: mail.text }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    throw new Error(`Email provider responded ${res.status}: ${detail.slice(0, 180)}`)
  }
}
