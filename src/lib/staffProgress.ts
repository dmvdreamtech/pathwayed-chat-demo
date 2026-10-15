import { supabase } from '@/lib/supabase'
import type { MasteryStatus } from '@/lib/mastery'

/**
 * Staff progress view (/staff), read only. Data comes from migration 0030:
 * the safe-column functions (staff_search_students, staff_student_profile) for
 * who a student is, and the staff SELECT policies on student_skill_mastery and
 * the graded rows of question_attempts for what they have done. Chat content,
 * PINs and billing never reach this module.
 *
 * Everything shown is measured: counts of check questions answered and right,
 * the engine's own status, and the dates it stamped. No percentages are
 * projected and no scores are scaled.
 */

export type StaffRole = 'teacher' | 'guidance' | 'admin' | 'academic_dean'

export interface StaffMembership {
  school_id: string
  role: StaffRole
}

export interface StaffStudentRow {
  student_id: string
  school_id: string
  first_name: string
  grade: string
  email: string | null
  last_active_at: string | null
}

export interface StaffStudentProfile extends StaffStudentRow {
  days_active_this_month: number
}

export interface SkillInfo {
  id: string
  name: string
  subject: string
}

export interface MasteryRow {
  skill_id: string
  status: MasteryStatus
  advanced_at: string | null
  recheck_passed_at: string | null
}

export interface AttemptRow {
  skill_id: string
  is_correct: boolean
  time_ms: number | null
  created_at: string
}

/** A tutoring session row from staff_student_sessions: one per subject, last touch only. */
export interface SessionRow {
  subject: string
  started_at: string
  ended_at: string | null
  updated_at: string
}

/** The school's local time. Pallotti is the only school today. */
export const SCHOOL_TIME_ZONE = 'America/New_York'

const DAY_MS = 86_400_000
export const WORKING_ON_DAYS = 14
export const RECENT_WINS_DAYS = 30
/**
 * The engine's ADVANCE bar needs at least this many graded answers, so a skill
 * still Practicing past it is under 70% right.
 */
export const STUCK_MIN_ANSWERS = 5
/**
 * One answer's time is counted up to this cap. A question left open while the
 * student walks away would otherwise read as an hour of work.
 */
export const ANSWER_TIME_CAP_MS = 5 * 60_000

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------

export const STATUS_LABEL: Record<MasteryStatus, string> = {
  not_started: 'Not started',
  practicing: 'Practicing',
  advanced: 'Ready to move on',
  mastered: 'Mastered',
}

const STATUS_RANK: Record<MasteryStatus, number> = {
  mastered: 0,
  advanced: 1,
  practicing: 2,
  not_started: 3,
}

const SUBJECT_LABEL: Record<string, string> = {
  math: 'Math',
  reading: 'Reading',
  writing: 'Writing',
  'prep-verbal': 'Test prep: verbal',
  'prep-quant': 'Test prep: quantitative',
  'prep-sat-rw': 'Test prep: SAT Reading and Writing',
  'prep-sat-math': 'Test prep: SAT Math',
}

export function subjectLabel(subject: string): string {
  return SUBJECT_LABEL[subject] ?? subject.charAt(0).toUpperCase() + subject.slice(1)
}

/** The boxes in "Skills by subject", in this order. Test prep gathers every
 *  prep-* subject (HSPT, ISEE and SAT prep skills). */
export const SUBJECT_BOXES: { key: string; label: string; matches: (subject: string) => boolean }[] = [
  { key: 'reading', label: 'Reading', matches: (s) => s === 'reading' },
  { key: 'writing', label: 'Writing', matches: (s) => s === 'writing' },
  { key: 'math', label: 'Math', matches: (s) => s === 'math' },
  { key: 'test-prep', label: 'Test prep', matches: (s) => s.startsWith('prep-') },
]

export function rightOf(right: number, total: number): string {
  return `${right} of ${total} right`
}

/** "Under 1 min", "12 min", "1 hr 5 min". */
export function formatMinutes(ms: number): string {
  if (ms < 60_000) return 'Under 1 min'
  const mins = Math.round(ms / 60_000)
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`
}

/** YYYY-MM-DD for an instant, in the school's time zone. */
export function localDateKey(iso: string): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: SCHOOL_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso))
}

/** "Tue, Oct 14" for a YYYY-MM-DD key. */
export function formatDateKey(key: string): string {
  const [y, m, d] = key.split('-').map(Number)
  // Noon UTC keeps the calendar date stable whatever the viewer's zone.
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m - 1, d, 12)))
}

/** "Oct 14" for an instant, in the school's time zone. */
export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: SCHOOL_TIME_ZONE,
  }).format(new Date(iso))
}

/** "Today", "Yesterday", "3 days ago", or a date, in the school's time zone. */
export function formatLastActive(iso: string | null, now: Date): string {
  if (!iso) return 'No tutoring activity yet'
  const then = localDateKey(iso)
  const today = localDateKey(now.toISOString())
  const days = Math.round(
    (Date.parse(`${today}T00:00:00Z`) - Date.parse(`${then}T00:00:00Z`)) / DAY_MS,
  )
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return formatShortDate(iso)
}

// ---------------------------------------------------------------------------
// Tallies
// ---------------------------------------------------------------------------

export interface SkillTally {
  right: number
  total: number
  lastAt: string | null
}

/** Graded answers per skill. Callers pass non-diagnostic attempts only. */
export function tallyBySkill(attempts: AttemptRow[]): Map<string, SkillTally> {
  const out = new Map<string, SkillTally>()
  for (const a of attempts) {
    const t = out.get(a.skill_id) ?? { right: 0, total: 0, lastAt: null }
    t.total += 1
    if (a.is_correct) t.right += 1
    if (!t.lastAt || a.created_at > t.lastAt) t.lastAt = a.created_at
    out.set(a.skill_id, t)
  }
  return out
}

// ---------------------------------------------------------------------------
// The three cards
// ---------------------------------------------------------------------------

export interface CardItem {
  skillId: string
  skillName: string
  subject: string
  /** Measured detail, e.g. "4 of 11 right" or "Oct 3". */
  detail: string
  /** A status tag, e.g. "Ready to move on" or "Mastered". */
  tag: string | null
  /** The status the tag names, so it wears the same badge color as everywhere else. */
  tagStatus: MasteryStatus | null
}

export interface ProgressCards {
  workingOn: CardItem[]
  stuckOn: CardItem[]
  recentWins: CardItem[]
}

/**
 * Working on: Practicing or Ready to move on, answered in the last 14 days, and
 *   not stuck. Most recent first.
 * Stuck on: still Practicing after 5 or more graded answers, which under the
 *   engine's ADVANCE bar means under 70% right. Lowest share right first.
 * Recent wins: Mastered (recheck_passed_at) or first Ready to move on
 *   (advanced_at) in the last 30 days, and still at that level or higher. One
 *   entry per skill, Mastered preferred. Newest first.
 */
export function buildCards(
  mastery: MasteryRow[],
  attempts: AttemptRow[],
  skills: Map<string, SkillInfo>,
  now: Date,
): ProgressCards {
  const tallies = tallyBySkill(attempts)
  const nowMs = now.getTime()
  const within = (iso: string | null, days: number) =>
    !!iso && nowMs - Date.parse(iso) <= days * DAY_MS && Date.parse(iso) <= nowMs + DAY_MS

  const named = mastery.filter((m) => skills.has(m.skill_id))
  const base = (m: MasteryRow) => {
    const s = skills.get(m.skill_id) as SkillInfo
    return { skillId: m.skill_id, skillName: s.name, subject: s.subject }
  }

  const stuck = named
    .map((m) => ({ m, t: tallies.get(m.skill_id) }))
    .filter(({ m, t }) => m.status === 'practicing' && !!t && t.total >= STUCK_MIN_ANSWERS)
    .sort((a, b) => {
      const ra = a.t!.right / a.t!.total
      const rb = b.t!.right / b.t!.total
      return ra - rb || b.t!.total - a.t!.total
    })
  const stuckIds = new Set(stuck.map(({ m }) => m.skill_id))

  const working = named
    .map((m) => ({ m, t: tallies.get(m.skill_id) }))
    .filter(
      ({ m, t }) =>
        (m.status === 'practicing' || m.status === 'advanced') &&
        !stuckIds.has(m.skill_id) &&
        !!t &&
        within(t.lastAt, WORKING_ON_DAYS),
    )
    .sort((a, b) => (b.t!.lastAt ?? '').localeCompare(a.t!.lastAt ?? ''))

  const wins: { item: CardItem; at: string }[] = []
  for (const m of named) {
    if (m.status === 'mastered' && within(m.recheck_passed_at, RECENT_WINS_DAYS)) {
      wins.push({
        item: {
          ...base(m),
          detail: formatShortDate(m.recheck_passed_at!),
          tag: STATUS_LABEL.mastered,
          tagStatus: 'mastered',
        },
        at: m.recheck_passed_at!,
      })
    } else if (
      (m.status === 'advanced' || m.status === 'mastered') &&
      within(m.advanced_at, RECENT_WINS_DAYS)
    ) {
      wins.push({
        item: {
          ...base(m),
          detail: formatShortDate(m.advanced_at!),
          tag: STATUS_LABEL.advanced,
          tagStatus: 'advanced',
        },
        at: m.advanced_at!,
      })
    }
  }
  wins.sort((a, b) => b.at.localeCompare(a.at))

  return {
    workingOn: working.map(({ m, t }) => ({
      ...base(m),
      detail: rightOf(t!.right, t!.total),
      tag: m.status === 'advanced' ? STATUS_LABEL.advanced : null,
      tagStatus: m.status === 'advanced' ? ('advanced' as const) : null,
    })),
    stuckOn: stuck.map(({ m, t }) => ({
      ...base(m),
      detail: rightOf(t!.right, t!.total),
      tag: null,
      tagStatus: null,
    })),
    recentWins: wins.map((w) => w.item),
  }
}

/**
 * The one line that replaces Working on and Stuck on when both are empty.
 * "Not active in the last 14 days" is only said when it is true: a student who
 * was in a tutoring session recently but answered no check questions gets the
 * narrower statement instead.
 */
export function quietLine(lastActiveAt: string | null, now: Date): string {
  if (!lastActiveAt) return 'No tutoring activity yet.'
  const recent = now.getTime() - Date.parse(lastActiveAt) <= WORKING_ON_DAYS * DAY_MS
  return recent
    ? `No check questions in the last ${WORKING_ON_DAYS} days. Last active ${formatShortDate(lastActiveAt)}.`
    : `Not active in the last ${WORKING_ON_DAYS} days. Last active ${formatShortDate(lastActiveAt)}.`
}

// ---------------------------------------------------------------------------
// Skills by subject
// ---------------------------------------------------------------------------

export interface SubjectSkill {
  skillId: string
  skillName: string
  status: MasteryStatus
  statusLabel: string
  /** "7 of 9 right", or null when the skill has no graded answers. */
  detail: string | null
}

export interface SubjectGroup {
  subject: string
  label: string
  skills: SubjectSkill[]
  /** Skills placed for this student but not practiced yet. Counted, not listed. */
  notStarted: number
}

export function buildSubjectGroups(
  mastery: MasteryRow[],
  attempts: AttemptRow[],
  skills: Map<string, SkillInfo>,
): SubjectGroup[] {
  const tallies = tallyBySkill(attempts)
  return SUBJECT_BOXES.map((box) => {
    const rows = mastery.filter((m) => {
      const subject = skills.get(m.skill_id)?.subject
      return !!subject && box.matches(subject)
    })
    const practiced = rows.filter(
      (m) => m.status !== 'not_started' || (tallies.get(m.skill_id)?.total ?? 0) > 0,
    )
    const list = practiced
      .map((m) => {
        const t = tallies.get(m.skill_id)
        return {
          skillId: m.skill_id,
          skillName: (skills.get(m.skill_id) as SkillInfo).name,
          status: m.status,
          statusLabel: STATUS_LABEL[m.status],
          detail: t && t.total > 0 ? rightOf(t.right, t.total) : null,
        }
      })
      .sort(
        (a, b) =>
          STATUS_RANK[a.status] - STATUS_RANK[b.status] || a.skillName.localeCompare(b.skillName),
      )
    return {
      subject: box.key,
      label: box.label,
      skills: list,
      notStarted: rows.length - practiced.length,
    }
  })
}

// ---------------------------------------------------------------------------
// Recent activity
// ---------------------------------------------------------------------------

export interface ActivityGroup {
  dateKey: string
  subject: string
  subjectLabel: string
  /** 'checks': graded check questions. 'session': a tutoring session that day
   *  in this subject with no check questions answered. */
  kind: 'checks' | 'session'
  right: number
  total: number
  /** Sum of measured answer times (each capped), or null if none were timed. */
  timeMs: number | null
}

export const ACTIVITY_LIMIT = 10

/**
 * The last 10 day-and-subject groups of graded check questions, plus tutoring
 * sessions on a day and subject with no check questions, so a student who only
 * talked with Nikki still shows what they worked on. A "day" is a calendar day
 * in the school's time zone. Sessions keep one row per subject, so each adds the
 * day it was last used.
 */
export function buildActivity(
  attempts: AttemptRow[],
  skills: Map<string, SkillInfo>,
  sessions: SessionRow[] = [],
  limit = ACTIVITY_LIMIT,
): ActivityGroup[] {
  const groups = new Map<string, ActivityGroup & { lastAt: string }>()
  for (const a of attempts) {
    const subject = skills.get(a.skill_id)?.subject ?? 'other'
    const dateKey = localDateKey(a.created_at)
    const key = `${dateKey}|${subject}`
    const g = groups.get(key) ?? {
      dateKey,
      subject,
      subjectLabel: subject === 'other' ? 'Other' : subjectLabel(subject),
      kind: 'checks' as const,
      right: 0,
      total: 0,
      timeMs: null,
      lastAt: a.created_at,
    }
    g.total += 1
    if (a.is_correct) g.right += 1
    if (a.time_ms != null && a.time_ms >= 0) {
      g.timeMs = (g.timeMs ?? 0) + Math.min(a.time_ms, ANSWER_TIME_CAP_MS)
    }
    if (a.created_at > g.lastAt) g.lastAt = a.created_at
    groups.set(key, g)
  }
  for (const s of sessions) {
    const dateKey = localDateKey(s.updated_at)
    const key = `${dateKey}|${s.subject}`
    if (groups.has(key)) continue
    groups.set(key, {
      dateKey,
      subject: s.subject,
      subjectLabel: subjectLabel(s.subject),
      kind: 'session',
      right: 0,
      total: 0,
      timeMs: null,
      lastAt: s.updated_at,
    })
  }
  return [...groups.values()]
    .sort((a, b) => b.dateKey.localeCompare(a.dateKey) || b.lastAt.localeCompare(a.lastAt))
    .slice(0, limit)
    .map((g) => ({
      dateKey: g.dateKey,
      subject: g.subject,
      subjectLabel: g.subjectLabel,
      kind: g.kind,
      right: g.right,
      total: g.total,
      timeMs: g.timeMs,
    }))
}

// ---------------------------------------------------------------------------
// Data access
// ---------------------------------------------------------------------------

let membershipCache: { uid: string; promise: Promise<StaffMembership[]> } | null = null

/**
 * The caller's active staff rows, after linking any unlinked row at their
 * confirmed email. Memoized per user so the gate and Welcome share one call.
 * Resolves to [] on any failure, so a broken staff check never blocks the
 * family sign-in path.
 */
export function loadStaffMembership(uid: string): Promise<StaffMembership[]> {
  if (membershipCache?.uid === uid) return membershipCache.promise
  const promise = (async () => {
    const link = await supabase.rpc('link_staff_account')
    if (link.error) console.warn('[staff] link_staff_account failed', link.error.message)
    const { data, error } = await supabase
      .from('school_staff')
      .select('school_id, role')
      .eq('active', true)
    if (error) throw error
    return (data ?? []) as StaffMembership[]
  })().catch((e: unknown) => {
    console.warn('[staff] membership check failed', e instanceof Error ? e.message : e)
    membershipCache = null
    return [] as StaffMembership[]
  })
  membershipCache = { uid, promise }
  return promise
}

/** 'recent': most recently active first (the default). 'name': A to Z. */
export type StaffSort = 'recent' | 'name'

export async function searchStaffStudents(query: string, order: StaffSort = 'recent'): Promise<StaffStudentRow[]> {
  const { data, error } = await supabase.rpc('staff_search_students', { p_query: query, p_order: order })
  if (error) throw error
  return (data ?? []) as StaffStudentRow[]
}

/** Rows per PostgREST page; the API caps a single response at 1000. */
const PAGE = 1000
/** Ids per .in() filter, so the request URL stays a few kilobytes. */
const ID_BATCH = 100

export interface StudentProgressData {
  profile: StaffStudentProfile | null
  mastery: MasteryRow[]
  attempts: AttemptRow[]
  sessions: SessionRow[]
  skills: Map<string, SkillInfo>
}

export async function loadStudentProgress(studentId: string): Promise<StudentProgressData> {
  const profileReq = supabase.rpc('staff_student_profile', { p_student_id: studentId })
  // Subject and dates only (0030): never the chat itself.
  const sessionsReq = supabase.rpc('staff_student_sessions', { p_student_id: studentId })
  const masteryReq = supabase
    .from('student_skill_mastery')
    .select('skill_id, status, advanced_at, recheck_passed_at')
    .eq('student_id', studentId)

  // Graded answers only. Placement answers are test scores, and guidance staff
  // can read them under RLS, so the filter is explicit rather than relying on
  // the policy.
  const attempts: AttemptRow[] = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from('question_attempts')
      .select('skill_id, is_correct, time_ms, created_at')
      .eq('student_id', studentId)
      .eq('is_diagnostic', false)
      .order('created_at', { ascending: false })
      .range(from, from + PAGE - 1)
    if (error) throw error
    attempts.push(...((data ?? []) as AttemptRow[]))
    if (!data || data.length < PAGE) break
  }

  const [profileRes, masteryRes, sessionsRes] = await Promise.all([profileReq, masteryReq, sessionsReq])
  if (profileRes.error) throw profileRes.error
  if (masteryRes.error) throw masteryRes.error
  if (sessionsRes.error) throw sessionsRes.error
  const sessions = (sessionsRes.data ?? []) as SessionRow[]
  const profile = ((profileRes.data ?? []) as StaffStudentProfile[])[0] ?? null
  const mastery = (masteryRes.data ?? []) as MasteryRow[]

  const ids = [...new Set([...mastery.map((m) => m.skill_id), ...attempts.map((a) => a.skill_id)])]
  const skills = new Map<string, SkillInfo>()
  for (let i = 0; i < ids.length; i += ID_BATCH) {
    const { data, error } = await supabase
      .from('skills')
      .select('id, name, subject')
      .in('id', ids.slice(i, i + ID_BATCH))
    if (error) throw error
    for (const s of (data ?? []) as SkillInfo[]) skills.set(s.id, s)
  }

  return { profile, mastery, attempts, sessions, skills }
}
