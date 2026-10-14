import { supabase } from '@/lib/supabase'
import { focusAreasByGrade } from '@/lib/focusAreas'
import { gradeBand, type GradeBand } from '@/lib/gradeBand'
import { refreshReadiness } from '@/lib/readiness'
import { masteryDisplay, displayRank } from '@/lib/masteryDisplay'
import type { MasteryStatus } from '@/lib/mastery'
import type { StoredMessage } from '@/lib/sessions'
import type { Json } from '@/lib/database.types'

/**
 * Academic OS Phase 1 — skill resolution + mastery (client-side, Option A).
 *
 * The taxonomy (migration 0001 + seed 0001) keys every Skill row by `slug`,
 * which is exactly a focusAreas value (src/lib/focusAreas.ts). So mapping a
 * focus area a student practiced to its skill_id is a clean slug join — no fuzzy
 * name matching. Mastery itself is written only by the database (migration
 * 0031): the browser records answers and asks for results, never sends them.
 *
 * Everything here is deliberately simple and inspectable. No ML.
 */

// focusAreas only defines the 3-5/6-8/9-12 bands (no k-2). Narrow the canonical
// 4-band type (src/lib/gradeBand — the single source of truth, also re-exported
// by api/teaching-cycle) to the bands that have focus areas / seeded skills.
type FocusBand = Extract<GradeBand, '3-5' | '6-8' | '9-12'>
type FocusSubject = 'math' | 'reading' | 'writing'

function focusBand(grade: string): FocusBand | null {
  const band = gradeBand(grade)
  return band === 'k-2' ? null : band
}

function isFocusSubject(subject: string): subject is FocusSubject {
  return subject === 'math' || subject === 'reading' || subject === 'writing'
}

// ---------------------------------------------------------------------------
// Resolver: focusAreas value -> skills.slug -> skill_id
// ---------------------------------------------------------------------------

/**
 * Resolve focusAreas slugs to skill_ids via the unique `slug` join. Unknown
 * slugs are simply absent from the returned map (never throws on a typo).
 */
export async function resolveSkillIdsBySlug(slugs: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(slugs)].filter(Boolean)
  const map = new Map<string, string>()
  if (!unique.length) return map
  const { data, error } = await supabase.from('skills').select('id, slug').in('slug', unique)
  if (error || !data) return map
  for (const row of data) if (row.slug) map.set(row.slug, row.id)
  return map
}

/**
 * The taxonomy display name for a skill slug (skills.name), or null if unknown.
 * Used so a session greeting names the skill properly ("Synonyms") instead of the
 * raw slug — the display name lives in the taxonomy, not in the client.
 */
export async function getSkillNameBySlug(slug: string): Promise<string | null> {
  if (!slug) return null
  const { data } = await supabase.from('skills').select('name').eq('slug', slug).maybeSingle()
  return data?.name ?? null
}

// ---------------------------------------------------------------------------
// "Skills practiced" detection (Phase 1 heuristic)
// ---------------------------------------------------------------------------

// Which focus areas were actually practiced this session. We scan the transcript
// for transparent keyword stems per focus area. This is intentionally simple and
// inspectable (NO ML, no prompt changes); Phase 2 can replace it with an LLM /
// structured-practice signal. Keys are focusAreas values (= skill slugs).
const PRACTICE_KEYWORDS: Record<string, string[]> = {
  // Math (3-5)
  multiplication: ['multipl', 'times table', ' times ', 'product of'],
  division: ['divis', 'divid', 'quotient', 'shared equally', 'split into'],
  fractions: ['fraction', 'numerator', 'denominator'],
  geometry: ['geometr', 'perimeter', 'area of', 'angle', 'triangle', 'rectangle', 'shape'],
  // Reading (3-5)
  'main-idea': ['main idea', 'central idea', 'mostly about', 'mainly about', 'the gist'],
  vocabulary: ['vocabular', 'what does the word', 'word mean', 'definition of', 'synonym'],
  'reading-comprehension': ['comprehens', 'the passage', 'the text says', 'reread', 'what happened in the story'],
  'story-elements': ['character', 'setting', 'plot', 'story element', 'beginning, middle'],
  // Writing (3-5)
  'sentence-writing': ['sentence'],
  'short-response': ['short response', 'short answer', 'constructed response', 'cite evidence'],
  'paragraph-writing': ['paragraph', 'topic sentence'],
  'creative-writing': ['creative writing', 'narrative', 'make up a story', 'imagine a'],
}

/**
 * Focus areas evidenced in the transcript, scoped to the session's subject +
 * grade band. Returns focusAreas values (= skill slugs). Subjects without focus
 * areas (science/homework) or bands without seeded skills (k-2) return [].
 */
export function detectPracticedSlugs(subject: string, grade: string, messages: StoredMessage[]): string[] {
  const band = focusBand(grade)
  if (!band || !isFocusSubject(subject)) return []
  const subjectAreas = focusAreasByGrade[band][subject]
  const haystack = messages.map((m) => m.content).join('\n').toLowerCase()
  const found: string[] = []
  for (const { value } of subjectAreas) {
    const keywords = PRACTICE_KEYWORDS[value] ?? [value.replace(/-/g, ' ')]
    if (keywords.some((k) => haystack.includes(k))) found.push(value)
  }
  return found
}

// ---------------------------------------------------------------------------
// The legacy self-rating ramp (mastery_percentage / accuracy / attempts)
// ---------------------------------------------------------------------------
//
// Since migration 0031 the database computes this, in record_practice_result,
// from answers it graded itself, so the browser can no longer send the number.
// nextMastery below is the readable, unit-tested statement of the same rule;
// change both together. Nothing reads these three columns for a decision:
// status and evidence_accuracy drive the path, the dashboards and readiness.
// They are kept current for history and the nightly snapshot.

// Weight on the latest session signal in the running accuracy average. Higher =
// more reactive to the most recent practice; lower = smoother / more history-
// weighted.
const RECENCY_WEIGHT = 0.4

// Attempts needed before mastery can reach 100% of accuracy. Mastery ramps
// linearly with attempts up to this cap, so a single strong session never reads
// as "mastered" — practice has to accumulate. Tunable (3-5).
const MASTERY_FULL_CREDIT_ATTEMPTS = 4

export interface MasteryComputation {
  accuracy: number // recency-weighted running average of the session signal (0..100)
  mastery_percentage: number // accuracy scaled by an attempts-based ramp (0..100)
  attempts: number
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)))
}

/**
 * Phase-1 mastery update. `accuracy` is a recency-weighted running average of
 * the per-session signal: the first session seeds it to the signal, later
 * sessions blend prior_accuracy*(1-RECENCY_WEIGHT) + signal*RECENCY_WEIGHT, so
 * recent practice moves the needle without erasing history. `mastery_percentage`
 * then RAMPS that accuracy with attempts — round(accuracy * min(1, attempts/K))
 * — so mastery only approaches accuracy after K sessions of practice; one strong
 * session never reads as mastered. No ML.
 */
export function nextMastery(
  prior: { accuracy: number; attempts: number } | null,
  sessionSignal: number,
): MasteryComputation {
  const attempts = (prior?.attempts ?? 0) + 1
  const accuracy = clamp(
    prior ? prior.accuracy * (1 - RECENCY_WEIGHT) + sessionSignal * RECENCY_WEIGHT : sessionSignal,
  )
  const ramp = Math.min(1, attempts / MASTERY_FULL_CREDIT_ATTEMPTS)
  return { accuracy, mastery_percentage: clamp(accuracy * ramp), attempts }
}

// ---------------------------------------------------------------------------
// Orchestration: record mastery after a finished session
// ---------------------------------------------------------------------------

export interface MasteryUpdate {
  skill_id: string
  slug: string
  attempts: number
  accuracy: number
  mastery_percentage: number
}

/** Persist the per-session summary onto the existing sessions row. */
async function saveSessionSkills(
  studentId: string,
  subject: string,
  skillsPracticed: string[],
  masteryUpdates: MasteryUpdate[],
): Promise<void> {
  await supabase
    .from('sessions')
    .update({
      skills_practiced: skillsPracticed as unknown as Json,
      mastery_updates: masteryUpdates as unknown as Json,
    })
    .eq('student_id', studentId)
    .eq('subject', subject)
}

/**
 * After a finished tutoring session: detect which skills the transcript shows were
 * practiced and record that summary onto the session row.
 *
 * IT NO LONGER WRITES MASTERY, DELIBERATELY. It used to convert the child's
 * end-of-session self-rating into a number and push it through
 * commitMasterySignals into student_skill_mastery. Three things were wrong with
 * that, and they compounded:
 *
 *   1. It was not even self-rating by the end. No rating is collected on
 *      completion any more, so every session passed a hard-coded 'ok', which is a
 *      constant 70 written for whichever skills a keyword scan of the transcript
 *      happened to match.
 *   2. It was a SECOND writer to a table whose meaning had moved. Since migration
 *      0010 the column that matters is `status`, computed by a trigger from graded
 *      question_attempts. Nothing reads the columns this wrote any more: nextLesson
 *      stopped reading mastery_percentage, and readiness.ts repurposed that field
 *      to carry evidence_accuracy.
 *   3. Its INSERTs created rows with status defaulting to 'not_started', which is
 *      much of why the table filled with rows that assert nothing. Those rows then
 *      made "a mastery row exists" a misleading proxy for "has been placed".
 *
 * Mastery is now claimed only where graded work supports it: the trigger, fed by
 * Practice and by chat check questions. Participation is not evidence.
 *
 * sessions.mastery_updates is stamped EMPTY rather than left stale, so the column
 * says "mastery ran and claimed nothing" instead of holding an older run's numbers.
 *
 * Best-effort and side-effect-only. Never throws into the caller's happy path.
 */
export async function recordSessionMastery(params: {
  studentId: string
  subject: string
  grade: string
  messages: StoredMessage[]
}): Promise<void> {
  const { studentId, subject, grade, messages } = params
  // Still detected and still saved: the session summary is a legible record of what
  // the lesson covered. It is a description of the conversation, not a claim about
  // what the child now knows.
  const slugs = detectPracticedSlugs(subject, grade, messages)
  await saveSessionSkills(studentId, subject, slugs, [])
}

/**
 * The end of a Practice set: ask the database to update the legacy ramp from the
 * answers this set recorded, then refresh readiness. The database counts only
 * this student's graded, non-placement answers on this skill from the last day,
 * so naming an answer it did not grade, or another child's, changes nothing.
 * Best-effort: returns null when nothing was recorded, never throws.
 */
export async function recordPracticeResult(
  studentId: string,
  skillId: string,
  attemptIds: string[],
): Promise<MasteryUpdate | null> {
  const ids = [...new Set(attemptIds.filter(Boolean))]
  let update: MasteryUpdate | null = null
  if (ids.length) {
    const { data, error } = await supabase.rpc('record_practice_result', {
      p_student_id: studentId,
      p_skill_id: skillId,
      p_attempt_ids: ids,
    })
    if (error) {
      console.error('record_practice_result failed', { error, studentId, skillId })
    } else if (data && typeof data === 'object' && !Array.isArray(data)) {
      const r = data as Record<string, unknown>
      update = {
        skill_id: skillId,
        slug: '',
        attempts: Number(r.attempts),
        accuracy: Number(r.accuracy),
        mastery_percentage: Number(r.mastery_percentage),
      }
    }
  }

  // The answers themselves moved the evidence, so readiness is refreshed even
  // when the legacy ramp had nothing to record. Must never block the kid's flow.
  try {
    await refreshReadiness(studentId)
  } catch (err) {
    console.error('readiness recompute failed', err)
  }
  return update
}

/**
 * The end of a placement run: ask the database to seed the legacy numbers for
 * the skills this run asked about (a right placement answer seeds 60, a wrong one
 * 25), then refresh readiness so the dashboard and path pick up the child's real
 * level.
 *
 * The database grades from the child's own most recent placement answer on each
 * skill, skips a skill they never answered in placement, and never touches a
 * skill with real practice history, so earned mastery is never reset. Callers
 * must let the run's answer writes land first. Best-effort: returns the number of
 * rows written, 0 on empty/guarded/error.
 */
export async function seedDiagnosticMastery(studentId: string, skillIds: string[]): Promise<number> {
  const unique = [...new Set(skillIds.filter(Boolean))]
  if (!unique.length) return 0

  const { data, error } = await supabase.rpc('seed_placement_mastery', {
    p_student_id: studentId,
    p_skill_ids: unique,
  })
  if (error) {
    console.error('seed_placement_mastery failed', { error, studentId })
    return 0
  }

  try {
    await refreshReadiness(studentId)
  } catch (err) {
    console.error('readiness recompute after diagnostic failed', err)
  }
  return typeof data === 'number' ? data : 0
}

/**
 * Whether a child has already been placed, so neither the child's home nor Skills
 * building should offer the check again. TRUE on either signal:
 *
 *   1. a mastery row exists — a placement seeded, or real practice landed, or
 *   2. the child has already ANSWERED diagnostic questions.
 *
 * Clause 2 is a loop guard, and it is the whole reason this is not just a mastery
 * read. A diagnostic run that ends below PLACEMENT_MIN_QUESTIONS is deliberately
 * discarded rather than seeded (see Diagnostic.finish), which used to leave the
 * child pinned on the offer: the same check, re-offered identically, with nothing
 * on the other side of it. Having answered counts as having taken it.
 *
 * It claims NO MASTERY. Nothing here writes, and nothing downstream reads it as
 * evidence — nextLesson still advances only on graded status. Deliberate retakes
 * stay available from the child's home, the parent dashboard, and a grade change,
 * all of which pass ?fresh=1.
 *
 * (K-2 placement intentionally doesn't seed, so the offer is gated to 3-12 by the
 * caller.) Fails safe to `true` on error so we never nag a child on a read glitch.
 */
export async function hasPlacement(studentId: string): Promise<boolean> {
  const [mastery, answered] = await Promise.all([
    supabase
      .from('student_skill_mastery')
      .select('id', { count: 'exact', head: true })
      .eq('student_id', studentId),
    supabase
      .from('question_attempts')
      .select('id', { count: 'exact', head: true })
      .eq('student_id', studentId)
      .eq('is_diagnostic', true),
  ])
  if (mastery.error || answered.error) {
    console.error('hasPlacement read failed', { mastery: mastery.error, answered: answered.error })
    return true
  }
  return (mastery.count ?? 0) > 0 || (answered.count ?? 0) > 0
}

// ---------------------------------------------------------------------------
// Dashboard reads (read-only; Step 4). No writes here.
// ---------------------------------------------------------------------------

export interface SkillMasteryRow {
  skill_id: string
  name: string
  subject: string
  /** Legacy self-rating ramp. Retained for the Pathway score and history; it is
   *  NOT what the dashboard states as a mastery claim. See masteryDisplay.ts. */
  mastery_percentage: number
  attempts: number
  /** Evidence-driven signals (migration 0010) — what the dashboard presents. */
  status: MasteryStatus
  evidence_accuracy: number | null
  attempts_counted: number
}
export interface SubjectMastery {
  subject: string
  skills: SkillMasteryRow[]
}
export interface StudentMasteryView {
  /** Subjects that have in-band mastery rows, in display order. */
  bySubject: SubjectMastery[]
  /** Subjects the student is currently working (have mastery rows) or — on day
   *  one with no rows yet — the grade band's focus-area subjects. */
  currentSubjects: string[]
  /** Whether any in-band mastery exists at all (drives the empty state). */
  hasAny: boolean
}

const SUBJECT_DISPLAY_ORDER = ['math', 'reading', 'writing', 'science']

/** Subjects that have focus areas (= seedable skills) for a band. */
function bandFocusSubjects(band: GradeBand): string[] {
  if (band === 'k-2') return []
  return SUBJECT_DISPLAY_ORDER.filter((s) => s in focusAreasByGrade[band])
}

/**
 * Pure transform: mastery rows + their skills -> a per-subject view of ALL
 * practiced skills. We organize by mastery, not grade: every practiced skill
 * that resolves to a real skill row is shown, regardless of its grade band, so
 * (e.g.) a grade-9 student practicing 6-8 skills still sees that work instead of
 * "No progress yet." Only rows we can't resolve to a skill are dropped. Kept
 * pure so it is unit-testable without the database. `band` is still used to pick
 * the day-one fallback subjects when there's no practice yet.
 */
export function buildMasteryView(
  masteryRows: {
    skill_id: string
    mastery_percentage: number
    attempts: number
    status?: string | null
    evidence_accuracy?: number | string | null
    attempts_counted?: number | null
  }[],
  skills: { id: string; name: string; subject: string; grade_band: string | null }[],
  band: GradeBand,
): StudentMasteryView {
  const skillById = new Map(skills.map((s) => [s.id, s]))
  const rows: SkillMasteryRow[] = []
  for (const m of masteryRows) {
    const s = skillById.get(m.skill_id)
    if (!s) continue // skip rows that don't resolve to a skill (e.g. domain rows)
    rows.push({
      skill_id: m.skill_id,
      name: s.name,
      subject: s.subject,
      mastery_percentage: Number(m.mastery_percentage),
      attempts: m.attempts,
      status: (m.status as MasteryStatus) ?? 'not_started',
      evidence_accuracy: m.evidence_accuracy == null ? null : Number(m.evidence_accuracy),
      attempts_counted: m.attempts_counted ?? 0,
    })
  }

  // Ordered by the strength of the claim we can actually make: mastered, then
  // advanced, then building by accuracy, then the skills we have no evidence for.
  const bySubject: SubjectMastery[] = []
  for (const subject of SUBJECT_DISPLAY_ORDER) {
    const subjectSkills = rows
      .filter((r) => r.subject === subject)
      .sort((a, b) => {
        const da = masteryDisplay(a)
        const db = masteryDisplay(b)
        return (
          displayRank(da.state) - displayRank(db.state) ||
          (db.percent ?? -1) - (da.percent ?? -1) ||
          a.name.localeCompare(b.name)
        )
      })
    if (subjectSkills.length) bySubject.push({ subject, skills: subjectSkills })
  }

  const currentSubjects = bySubject.length ? bySubject.map((b) => b.subject) : bandFocusSubjects(band)
  return { bySubject, currentSubjects, hasAny: rows.length > 0 }
}

/**
 * Read a student's skill mastery, grade-band-scoped (canonical gradeBand(grade)),
 * grouped by subject. Two simple selects + a JS join (no PostgREST embedding) so
 * it doesn't depend on relationship metadata. Read-only.
 */
export async function getStudentMastery(studentId: string, grade: string): Promise<StudentMasteryView> {
  const band = gradeBand(grade)
  const { data: masteryRows, error } = await supabase
    .from('student_skill_mastery')
    .select('skill_id, mastery_percentage, attempts, status, evidence_accuracy, attempts_counted')
    .eq('student_id', studentId)
  if (error || !masteryRows || !masteryRows.length) {
    return { bySubject: [], currentSubjects: bandFocusSubjects(band), hasAny: false }
  }
  const { data: skillRows } = await supabase
    .from('skills')
    .select('id, name, subject, grade_band')
    .in(
      'id',
      masteryRows.map((r) => r.skill_id),
    )
  return buildMasteryView(masteryRows, skillRows ?? [], band)
}
