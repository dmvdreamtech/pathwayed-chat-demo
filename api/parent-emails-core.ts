// The weekly and monthly parent progress emails: who gets one, and what it says.
// Pure functions only, so all of it is unit tested; api/parent-emails.ts does the
// reading, sending and logging.
//
// THE RULES
//   Weekly   Goes to a family only in a week (Monday to Sunday, New York time)
//            when at least one of its children did something: a tutoring
//            session, a check question, a skill mastered, a practice test
//            section finished or an essay submitted. One section per child
//            who did something.
//   Monthly  Goes to a family only in a month when NONE of its children did
//            anything, and only if no weekly email went to that family for a
//            week overlapping the month. So a family never gets both for the
//            same stretch of time. Paying families only when the account is
//            active or in a trial; school families whenever their school has
//            the emails turned on in the console.
//   Both     One email per family with a section per child. Nobody whose
//            address unsubscribed. Measured results only, no projections.
//
// WHO A FAMILY IS
//   Paying   The account that owns the children (students.parent_id); the
//            address is the account's own email.
//   School   A guardian address from the console roster, read at send time
//            through the bridge and never stored. A guardian of two covered
//            students gets one email with both.
//
// "Tutoring sessions: 3" from the draft is shown as the subjects tutored
// instead ("Tutoring: Math and Reading"): a session row keeps only its last
// touch, one per subject, so a count of sessions cannot be measured.
import { createHash, createHmac, timingSafeEqual } from "node:crypto"
import { showKidSatFraming } from "../src/lib/satFraming.js"
import { getPrepModule } from "../src/lib/prep/registry.js"
import { APP_URL, type RenderedEmail } from "./email-core.js"

export type ParentEmailKind = "weekly" | "monthly"
export const TIME_ZONE = "America/New_York"

/** One row of parent_email_activity (migration 0036). */
export interface ActivityRow {
  student_id: string
  parent_id: string
  first_name: string
  grade: string
  above_grade_ok: boolean
  school_covered: boolean
  school_id: string | null
  dean_student_id: string | null
  account_email: string | null
  subscription_status: string | null
  subjects: string[]
  checks_answered: number
  checks_right: number
  mastered: string[]
  tests: { module_id: string; section_id: string; at: string }[]
  essays: number
  active: boolean
  last_active_at: string | null
  /** When the student was added. A child added after a month never gets that
   *  month's email. */
  created_at: string
}

/** A row of parent_email_sends that matters to this run. */
export interface SentRow {
  student_id: string
  kind: ParentEmailKind
  period_start: string
  period_end: string
}

export interface Period {
  kind: ParentEmailKind
  /** School-local dates, inclusive. */
  start: string
  end: string
  /** The same span as instants, end exclusive, for the database. */
  from: Date
  to: Date
}

export interface PlannedEmail {
  to: string
  recipientType: "account" | "guardian"
  /** The children this email is about, in name order. */
  children: ActivityRow[]
}

/** Paying-family statuses that get the monthly email. */
export const MONTHLY_STATUSES: ReadonlySet<string> = new Set(["active", "trialing", "free_trial"])

// ---------------------------------------------------------------------------
// Dates, in New York time
// ---------------------------------------------------------------------------

/** "2026-10-14" for the New York calendar day of an instant. */
export function localDate(at: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" })
    .format(at)
}

/** Minutes New York is ahead of UTC at an instant (negative: -240 in summer). */
function offsetMinutes(at: Date): number {
  const name = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, timeZoneName: "shortOffset" })
    .formatToParts(at)
    .find((p) => p.type === "timeZoneName")?.value ?? "GMT"
  const m = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(name)
  if (!m) return 0
  return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] ?? 0))
}

/** The instant New York midnight begins on a local date. */
export function localMidnight(date: string): Date {
  const [y, mo, d] = date.split("-").map(Number)
  const guess = new Date(Date.UTC(y, mo - 1, d, 12)) // noon: never near a DST switch
  return new Date(Date.UTC(y, mo - 1, d) - offsetMinutes(guess) * 60_000)
}

function addDays(date: string, n: number): string {
  const [y, mo, d] = date.split("-").map(Number)
  const t = new Date(Date.UTC(y, mo - 1, d + n))
  return t.toISOString().slice(0, 10)
}

/** The last full Monday to Sunday week, or the last full month, before `now`. */
export function previousPeriod(kind: ParentEmailKind, now: Date): Period {
  const today = localDate(now)
  let start: string
  let end: string
  if (kind === "weekly") {
    const [y, mo, d] = today.split("-").map(Number)
    const dow = new Date(Date.UTC(y, mo - 1, d)).getUTCDay() // 0 Sunday
    const thisMonday = addDays(today, -((dow + 6) % 7))
    start = addDays(thisMonday, -7)
    end = addDays(thisMonday, -1)
  } else {
    const [y, mo] = today.split("-").map(Number)
    const first = new Date(Date.UTC(y, mo - 2, 1))
    start = first.toISOString().slice(0, 10)
    end = addDays(`${today.slice(0, 7)}-01`, -1)
  }
  return { kind, start, end, from: localMidnight(start), to: localMidnight(addDays(end, 1)) }
}

const fmtDay = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
const fmtWeekday = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" })
const fmtMonth = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", timeZone: "UTC" })

// ---------------------------------------------------------------------------
// Who gets an email
// ---------------------------------------------------------------------------

/** SHA-256 of the lower-cased, trimmed address: how email_suppressions keys it. */
export function emailHash(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex")
}

function mailable(email: string | null): email is string {
  return !!email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && !/@covered\.pathwayed\.local$/i.test(email)
}

const byName = (a: ActivityRow, b: ActivityRow) => a.first_name.localeCompare(b.first_name) || a.student_id.localeCompare(b.student_id)

/**
 * The emails this run should send.
 *
 * @param rows        parent_email_activity for the period.
 * @param guardians   console dean_student_id to guardian addresses (school
 *                    families; only schools that turned the emails on).
 * @param sent        sends already logged for this period, and for monthly,
 *                    weekly sends for weeks overlapping the month.
 * @param suppressed  email_hash values that unsubscribed.
 */
export function planEmails(
  period: Period,
  rows: ActivityRow[],
  guardians: Map<string, string[]>,
  sent: SentRow[],
  suppressed: Set<string>,
): PlannedEmail[] {
  const already = new Set(
    sent.filter((s) => s.kind === period.kind && s.period_start === period.start).map((s) => s.student_id),
  )
  const weeklyOverlap = new Set(
    sent
      .filter((s) => s.kind === "weekly" && s.period_start <= period.end && s.period_end >= period.start)
      .map((s) => s.student_id),
  )

  // Families: account address for paying children, each guardian address for
  // covered children.
  const families = new Map<string, { to: string; type: "account" | "guardian"; kids: ActivityRow[] }>()
  const add = (to: string, type: "account" | "guardian", kid: ActivityRow) => {
    const key = `${type}:${to.trim().toLowerCase()}`
    const f = families.get(key) ?? { to: to.trim(), type, kids: [] }
    if (!f.kids.some((k) => k.student_id === kid.student_id)) f.kids.push(kid)
    families.set(key, f)
  }
  for (const r of rows) {
    if (r.school_covered) {
      for (const g of (r.dean_student_id && guardians.get(r.dean_student_id.toLowerCase())) || []) {
        if (mailable(g)) add(g, "guardian", r)
      }
    } else if (mailable(r.account_email)) {
      add(r.account_email, "account", r)
    }
  }

  const out: PlannedEmail[] = []
  for (const f of families.values()) {
    if (suppressed.has(emailHash(f.to))) continue
    const kids = [...f.kids].sort(byName)
    if (period.kind === "weekly") {
      const busy = kids.filter((k) => k.active && !already.has(k.student_id))
      if (busy.length === 0) continue
      out.push({ to: f.to, recipientType: f.type, children: busy })
    } else {
      // Only children who were on PathwayEd during the month.
      const kidsThen = kids.filter((k) => Date.parse(k.created_at) < period.to.getTime())
      if (kidsThen.length === 0) continue
      if (kids.some((k) => k.active)) continue
      if (kids.some((k) => weeklyOverlap.has(k.student_id))) continue
      if (kids.some((k) => already.has(k.student_id))) continue
      if (f.type === "account" && !kids.every((k) => MONTHLY_STATUSES.has(k.subscription_status ?? ""))) continue
      out.push({ to: f.to, recipientType: f.type, children: kidsThen })
    }
  }
  return out.sort((a, b) => a.to.localeCompare(b.to))
}

// ---------------------------------------------------------------------------
// Unsubscribe links
// ---------------------------------------------------------------------------

const sign = (hash: string, secret: string) =>
  createHmac("sha256", secret).update(`unsubscribe:v1:${hash}`).digest("base64url")

/** "<hash>.<signature>": names the address only by its hash. */
export function unsubscribeToken(email: string, secret: string): string {
  const hash = emailHash(email)
  return `${hash}.${sign(hash, secret)}`
}

/** The hash a token names, or null when it was not signed with this secret. */
export function verifyUnsubscribeToken(token: string, secret: string): string | null {
  const m = /^([0-9a-f]{64})\.([A-Za-z0-9_-]{43})$/.exec(token ?? "")
  if (!m || !secret) return null
  const expected = Buffer.from(sign(m[1], secret))
  const given = Buffer.from(m[2])
  return expected.length === given.length && timingSafeEqual(expected, given) ? m[1] : null
}

export function unsubscribeUrl(email: string, secret: string): string {
  return `${APP_URL}/api/email-unsubscribe?t=${unsubscribeToken(email, secret)}`
}

// ---------------------------------------------------------------------------
// The copy
// ---------------------------------------------------------------------------

const SUBJECT_NAME: Record<string, string> = {
  math: "Math",
  reading: "Reading",
  writing: "Writing",
  "prep-verbal": "Test prep",
  "prep-quant": "Test prep",
  "prep-sat-rw": "SAT Reading and Writing",
  "prep-sat-math": "SAT Math",
}

/** "Ana", "Ana and Leo", "Ana, Leo and Mia". */
export function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? ""
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
}

function subjectList(subjects: string[]): string {
  const names = [...new Set(subjects.map((s) => SUBJECT_NAME[s] ?? s.charAt(0).toUpperCase() + s.slice(1)))]
  return joinNames(names)
}

function testName(moduleId: string, sectionId: string): string {
  const m = getPrepModule(moduleId as never)
  const s = m?.sections.find((x) => x.id === sectionId)
  return m && s ? `${m.name} ${s.name}` : `${moduleId.toUpperCase()} practice section`
}

const possessive = (names: string) => `${names}'s`

/** The measured lines for one child's week. */
export function weeklyLines(k: ActivityRow): string[] {
  const lines: string[] = []
  if (k.subjects.length) lines.push(`Tutoring: ${subjectList(k.subjects)}`)
  if (k.mastered.length) lines.push(`Skills mastered: ${k.mastered.length} (${k.mastered.join(", ")})`)
  if (k.checks_answered > 0) lines.push(`Check questions: ${k.checks_right} of ${k.checks_answered} right`)
  for (const t of k.tests) lines.push(`Practice test finished: ${testName(t.module_id, t.section_id)} on ${fmtDay(localDate(new Date(t.at)))}`)
  if (k.essays > 0) lines.push(`Practice essays submitted: ${k.essays}`)
  return lines
}

/** The sentence for one child's quiet month. */
export function monthlyLine(k: ActivityRow, period: Period): string {
  const sat = showKidSatFraming({ grade: k.grade, above_grade_ok: k.above_grade_ok }) ? " or SAT practice" : ""
  const first = `${k.first_name} did not have any tutoring sessions${sat} in ${fmtMonth(period.start)}.`
  const last = k.last_active_at
    ? ` ${k.first_name} was last active on ${fmtDay(localDate(new Date(k.last_active_at)))}.`
    : ` ${k.first_name} has not used PathwayEd yet.`
  return first + last
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

function shell(bodyHtml: string, cta: { label: string; url: string } | null, footerHtml: string): string {
  const button = cta
    ? `<a href="${cta.url}" style="display:inline-block;margin-top:18px;background:#CC543C;color:#fff;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:999px">${esc(cta.label)}</a>`
    : ""
  return `<!doctype html><html><body style="margin:0;background:#F7F2EA;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1C2230">
  <div style="max-width:520px;margin:0 auto;padding:28px 22px">
    <div style="background:#fff;border:1px solid #ECE4D8;border-radius:20px;padding:28px">
      ${bodyHtml}
      ${button}
    </div>
    <p style="font-size:12px;color:#8A8F9C;text-align:center;margin:16px 0 0">${footerHtml}</p>
  </div></body></html>`
}

const P = (s: string, top = 10) => `<p style="font-size:15px;line-height:1.55;margin:${top}px 0 0">${s}</p>`

/** Render one planned email. `unsubscribe` is the signed link for its address. */
export function renderParentEmail(period: Period, plan: PlannedEmail, unsubscribe: string): RenderedEmail {
  const kids = plan.children
  const names = joinNames(kids.map((k) => k.first_name))
  const one = kids.length === 1
  // A guardian has no PathwayEd account to see progress in, so their weekly
  // email has no button; the monthly one opens PathwayEd for the student.
  const progressUrl = `${APP_URL}/parent`

  if (period.kind === "weekly") {
    const intro = `Here is what ${names} did on PathwayEd this week, ${fmtWeekday(period.start)} ${fmtDay(period.start)} to ${fmtWeekday(period.end)} ${fmtDay(period.end)}.`
    const footer = one
      ? `You get this email in weeks when ${kids[0].first_name} uses PathwayEd.`
      : "You get this email in weeks when your children use PathwayEd."
    const cta =
      plan.recipientType === "account"
        ? { label: one ? `See ${possessive(kids[0].first_name)} progress` : "See their progress", url: progressUrl }
        : null
    const blocks = kids.map((k) => ({ name: k.first_name, lines: weeklyLines(k) }))
    const text = [
      "Hi,",
      intro,
      ...blocks.map((b) => (one ? "" : `${b.name}\n`) + b.lines.join("\n")),
      ...(cta ? [`${cta.label}: ${cta.url}`] : []),
      `${footer} Unsubscribe: ${unsubscribe}`,
    ].join("\n\n")
    const html = shell(
      P("Hi,", 0) +
        P(esc(intro)) +
        blocks
          .map(
            (b) =>
              (one ? "" : P(`<b>${esc(b.name)}</b>`, 16)) +
              P(b.lines.map(esc).join("<br>"), one ? 12 : 4),
          )
          .join(""),
      cta,
      `${esc(footer)} <a href="${unsubscribe}" style="color:#8A8F9C">Unsubscribe</a>`,
    )
    return { subject: `${possessive(names)} week on PathwayEd`, text, html }
  }

  const lines = kids.map((k) => monthlyLine(k, period))
  const ready = one
    ? `When ${kids[0].first_name} is ready, everything they have learned so far is saved, and they can pick up where they left off.`
    : "When they are ready, everything they have learned so far is saved, and they can pick up where they left off."
  const footer = one
    ? `You get this email only in months when ${kids[0].first_name} has not used PathwayEd.`
    : "You get this email only in months when your children have not used PathwayEd."
  const cta = { label: "Open PathwayEd", url: APP_URL }
  const text = ["Hi,", ...lines, ready, `${cta.label}: ${cta.url}`, `${footer} Unsubscribe: ${unsubscribe}`].join("\n\n")
  const html = shell(
    P("Hi,", 0) + lines.map((l) => P(esc(l))).join("") + P(esc(ready)),
    cta,
    `${esc(footer)} <a href="${unsubscribe}" style="color:#8A8F9C">Unsubscribe</a>`,
  )
  return { subject: `${names} did not use PathwayEd in ${fmtMonth(period.start)}`, text, html }
}
