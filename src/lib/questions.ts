import { supabase } from '@/lib/supabase'
import { resolveSkillIdsBySlug } from '@/lib/skills'
import { getActiveFocusSkillIds } from '@/lib/focusSkills'
import { pickNextSkill, type SkillEvidence } from '@/lib/pickNextSkill'
import { eligibleSkills, type LadderStudent } from '@/lib/gradeLadder'
import {
  bandFor,
  parseDifficulty,
  selectRamped,
  RAMP_WINDOW,
  type Difficulty,
  type RampBand,
} from '@/lib/difficultyRamp'
import { readStatus, type ReadStatus } from '@/lib/readStatus'
import type { GrowthAttempt, MilestoneSkill } from '@/lib/growth'
import type { Json } from '@/lib/database.types'
import { parsePicturePrompt, parsePictureTile, type PicturePrompt, type PictureTile } from '@/lib/pictureModel'

/** The student fields the grade ladder needs, plus the id used for the reads. */
export type LadderStudentRow = LadderStudent & { id: string }

/**
 * Question Engine, Stage 3 — serve + score. Read-only access to PUBLISHED
 * generated_questions (RLS allows authenticated SELECT on status='published')
 * plus an append-only question_attempts writer (RLS owns_student). The pure
 * scoring/aggregation helpers are unit-tested; the DB calls are best-effort.
 */

/** K-2 picture-tap tiles and prompts (numerals, words, picture groups, clocks,
 *  base-ten blocks, ...). One definition shared with the content checker: see
 *  src/lib/pictureModel.ts. */
export type { PicturePrompt, PictureTile }

/**
 * A choice as the browser sees it: the text (and a tile for K-2 picture items),
 * never whether it is right. Since migration 0033 the answer key stays on the
 * server; the verdict arrives from submitAnswer after the child answers.
 */
export interface PracticeChoice {
  text: string
  /** Present only on audio-picture (K–2) items; the child taps this tile. */
  tile?: PictureTile
}

export interface PracticeQuestion {
  id: string
  skill_id: string
  sat_alignment: string | null
  stem: string
  // The reading passage this question is asked about, or null for standalone
  // (math/writing) stems. Rendered above the stem by the practice/diagnostic UI.
  passage: string | null
  choices: PracticeChoice[]
  // 'text' (default) or 'audio_picture' (K–2 pre-reader: spoken prompt + tiles).
  render_mode: string
  // Visual prompt for audio-picture items (e.g. a group of objects to count).
  prompt: PicturePrompt | null
  // Within-skill item hardness, or null when unlabelled. For 15 legacy math skills
  // this tags the SKILL's staircase position rather than the item, which is why the
  // ramp checks for a real spread before weighting (see difficultyRamp.ts).
  difficulty: Difficulty | null
}

// --- Pure aggregation (unit-tested) ------------------------------------------

/** Aggregate a session's answers into total / correct / accuracy (0-100). */
export function summarizeAttempts(results: { isCorrect: boolean }[]): {
  total: number
  correct: number
  accuracy: number
} {
  const total = results.length
  const correct = results.filter((r) => r.isCorrect).length
  const accuracy = total === 0 ? 0 : Math.round((100 * correct) / total)
  return { total, correct, accuracy }
}

// --- Read path: fetch published questions for a skill ------------------------

const parseTile = parsePictureTile
const parsePrompt = (raw: Json) => parsePicturePrompt(raw)

function parseChoices(raw: Json): PracticeChoice[] {
  if (!Array.isArray(raw)) return []
  const out: PracticeChoice[] = []
  for (const c of raw) {
    if (!c || typeof c !== 'object' || Array.isArray(c)) continue
    const obj = c as Record<string, unknown>
    if (typeof obj.text !== 'string') continue
    const tile = parseTile(obj.tile)
    out.push({ text: obj.text, ...(tile ? { tile } : {}) })
  }
  return out
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Fetch up to `limit` PUBLISHED questions for a skill (by slug), shuffled. The
 * full cache is tiny (~20/skill), so we fetch and pick client-side. Returns []
 * if the skill or questions can't be read (RLS/empty), never throws.
 */
export async function fetchPracticeQuestions(skillSlug: string, limit: number): Promise<PracticeQuestion[]> {
  const idBySlug = await resolveSkillIdsBySlug([skillSlug])
  const skillId = idBySlug.get(skillSlug)
  if (!skillId) return []

  const { data, error } = await supabase
    .from('generated_questions')
    .select('id, skill_id, sat_alignment, stem, choices_public, passage_id, render_mode, prompt, difficulty')
    .eq('skill_id', skillId)
    .eq('status', 'published')
  if (error) {
    console.error('fetchPracticeQuestions failed', error)
    return []
  }
  const rows = data ?? []

  // Resolve passages in one follow-up query (a reading set shares one passage
  // across several questions, so we fetch each distinct passage once). Best-effort:
  // a passage read failure just leaves the passage null — the question still serves.
  const passageIds = [...new Set(rows.map((r) => r.passage_id).filter((v): v is string => !!v))]
  const passageById = new Map<string, string>()
  if (passageIds.length) {
    const { data: pRows, error: pError } = await supabase
      .from('passages')
      .select('id, body')
      .in('id', passageIds)
      .eq('status', 'published')
    if (pError) console.error('fetchPracticeQuestions: passages read failed', pError)
    for (const p of pRows ?? []) passageById.set(p.id, p.body)
  }

  const parsed: PracticeQuestion[] = []
  for (const row of rows) {
    const choices = parseChoices(row.choices_public)
    if (choices.length < 2) continue // skip anything malformed
    parsed.push({
      id: row.id,
      skill_id: row.skill_id,
      sat_alignment: row.sat_alignment,
      stem: row.stem,
      passage: row.passage_id ? passageById.get(row.passage_id) ?? null : null,
      choices,
      render_mode: typeof row.render_mode === 'string' ? row.render_mode : 'text',
      prompt: parsePrompt(row.prompt),
      difficulty: parseDifficulty(row.difficulty),
    })
  }
  return shuffle(parsed).slice(0, limit)
}

/**
 * Published skills plus this student's evidence, for the grade-position panel.
 * One place so the panel cannot drift from what the picker considers published.
 *
 * loadFailed is true when either read errored. The panel must say so rather than
 * quietly rendering nothing, which reads to a parent as "no progress".
 */
export async function fetchGradePositionInputs(studentId: string): Promise<{
  skills: PracticeableSkill[]
  evidence: Map<string, SkillEvidence>
  loadFailed: boolean
}> {
  const skillStatus = readStatus()
  const evidenceStatus = readStatus()
  const [skills, evidence] = await Promise.all([
    listPracticeableSkills(skillStatus),
    fetchSkillEvidence(studentId, evidenceStatus),
  ])
  return { skills, evidence, loadFailed: skillStatus.failed || evidenceStatus.failed }
}

/**
 * Everything the growth panel needs: this student's graded attempt history, and
 * the name/subject/status of every skill they have a mastery row for.
 *
 * Attempts are read WHOLE, not windowed. The weekly series only shows a window,
 * but a milestone is dated by replaying a skill's history from its first attempt,
 * and a truncated stream would move that date later than it happened. Per-student
 * volumes are small (the busiest child in the live database has 52), so the cap
 * exists to bound a pathological read, not to trim normal ones.
 */
const GROWTH_ATTEMPT_CAP = 5000

export async function fetchGrowthInputs(studentId: string): Promise<{
  attempts: GrowthAttempt[]
  skills: MilestoneSkill[]
  loadFailed: boolean
}> {
  const [attemptsRes, masteryRes] = await Promise.all([
    supabase
      .from('question_attempts')
      .select('skill_id, is_correct, created_at')
      .eq('student_id', studentId)
      .eq('is_diagnostic', false)
      .order('created_at', { ascending: true })
      .limit(GROWTH_ATTEMPT_CAP),
    supabase
      .from('student_skill_mastery')
      .select('skill_id, status')
      .eq('student_id', studentId),
  ])
  if (attemptsRes.error) console.error('fetchGrowthInputs: attempts read failed', attemptsRes.error)
  if (masteryRes.error) console.error('fetchGrowthInputs: mastery read failed', masteryRes.error)

  const attempts: GrowthAttempt[] = (attemptsRes.data ?? []).map((a) => ({
    skillId: a.skill_id,
    isCorrect: a.is_correct,
    createdAt: a.created_at,
  }))

  const masteryRows = masteryRes.data ?? []
  const skillIds = [...new Set(masteryRows.map((m) => m.skill_id))]
  let nameRows: { id: string; name: string; subject: string }[] = []
  let nameFailed = false
  if (skillIds.length) {
    const { data, error } = await supabase.from('skills').select('id, name, subject').in('id', skillIds)
    if (error) {
      console.error('fetchGrowthInputs: skills read failed', error)
      nameFailed = true
    }
    nameRows = data ?? []
  }
  const byId = new Map(nameRows.map((s) => [s.id, s]))

  const skills: MilestoneSkill[] = []
  for (const m of masteryRows) {
    const s = byId.get(m.skill_id)
    if (!s) continue // a skill we cannot name is one we cannot put in a list
    skills.push({
      skillId: m.skill_id,
      name: s.name,
      subject: s.subject,
      status: (m.status as MilestoneSkill['status']) ?? 'not_started',
    })
  }

  return {
    attempts,
    skills,
    loadFailed: !!attemptsRes.error || !!masteryRes.error || nameFailed,
  }
}

/**
 * Has this child ever answered a DIAGNOSTIC question?
 *
 * The parent dashboard needs it to decide between "No activity yet" and the real
 * panels. Practice alone is not enough to detect: K-2 placement deliberately does
 * not seed student_skill_mastery (see seedDiagnosticMastery), so a K-2 child who
 * has completed the diagnostic has attempts but no mastery and no readiness. A
 * head count is all that is needed, and it is cheaper than the placement read
 * that used to stand in for this.
 */
export async function hasDiagnosticAttempts(studentId: string): Promise<boolean> {
  const { count, error } = await supabase
    .from('question_attempts')
    .select('id', { count: 'exact', head: true })
    .eq('student_id', studentId)
    .eq('is_diagnostic', true)
  if (error) {
    console.error('hasDiagnosticAttempts read failed', error)
    return false
  }
  return (count ?? 0) > 0
}

/** generated_question_ids this student has already answered on a graded turn. */
export async function fetchSeenQuestionIds(studentId: string, skillId: string): Promise<Set<string>> {
  const { data, error } = await supabase
    .from('question_attempts')
    .select('generated_question_id')
    .eq('student_id', studentId)
    .eq('skill_id', skillId)
    .eq('is_diagnostic', false)
  if (error) {
    console.error('fetchSeenQuestionIds read failed', error)
    return new Set()
  }
  return new Set((data ?? []).map((r) => r.generated_question_id).filter((v): v is string => !!v))
}

/**
 * The last RAMP_WINDOW graded, non-diagnostic attempts on a skill, newest first,
 * as is_correct flags. Feeds the ramp band. Best-effort: [] on a read failure,
 * which lands the student on 'balanced' rather than guessing.
 */
export async function fetchRecentAttempts(studentId: string, skillId: string): Promise<boolean[]> {
  const { data, error } = await supabase
    .from('question_attempts')
    .select('is_correct, created_at')
    .eq('student_id', studentId)
    .eq('skill_id', skillId)
    .eq('is_diagnostic', false)
    .order('created_at', { ascending: false })
    .limit(RAMP_WINDOW)
  if (error) {
    console.error('fetchRecentAttempts read failed', error)
    return []
  }
  return (data ?? []).map((r) => r.is_correct === true)
}

export interface RampedQuestions {
  questions: PracticeQuestion[]
  /** Which band was served. Exposed for logging and tests, not for the UI. */
  band: RampBand
}

/**
 * Serve a practice set RAMPED to this student's rolling performance on the skill.
 *
 * Deliberately a SEPARATE function from fetchPracticeQuestions rather than an
 * optional parameter on it. The plain path is shared by the placement diagnostic,
 * the practice SAT, and the timed prep engine, none of which may adapt to the
 * student: a diagnostic that ramps is circular, and a mock exam that ramps stops
 * being comparable. Keeping them on the untouched function means those callers get
 * a zero-line diff and cannot be broken by anything here.
 *
 * Best-effort throughout: any failure degrades to the plain shuffled set.
 */
export async function fetchRampedQuestions(
  skillSlug: string,
  limit: number,
  studentId: string,
): Promise<RampedQuestions> {
  const pool = await fetchPracticeQuestions(skillSlug, Number.MAX_SAFE_INTEGER)
  if (!pool.length) return { questions: [], band: 'balanced' }

  const skillId = pool[0].skill_id
  const [recent, evidence, seenIds] = await Promise.all([
    fetchRecentAttempts(studentId, skillId),
    fetchSkillEvidence(studentId),
    fetchSeenQuestionIds(studentId, skillId),
  ])

  const band = bandFor({ recent, status: evidence.get(skillId)?.status })
  return { questions: selectRamped({ questions: pool, band, seenIds, limit }), band }
}

/**
 * Fetch specific PUBLISHED questions by id, returned in the order of `ids`. Used to
 * load the frozen question set of a timed attempt so resume shows the same
 * questions in the same order. Returns [] on read failure; skips malformed rows.
 */
export async function fetchQuestionsByIds(ids: string[]): Promise<PracticeQuestion[]> {
  if (ids.length === 0) return []
  const { data, error } = await supabase
    .from('generated_questions')
    .select('id, skill_id, sat_alignment, stem, choices_public, passage_id, render_mode, prompt, difficulty')
    .in('id', ids)
    .eq('status', 'published')
  if (error) {
    console.error('fetchQuestionsByIds failed', error)
    return []
  }
  const rows = data ?? []

  const passageIds = [...new Set(rows.map((r) => r.passage_id).filter((v): v is string => !!v))]
  const passageById = new Map<string, string>()
  if (passageIds.length) {
    const { data: pRows, error: pError } = await supabase
      .from('passages')
      .select('id, body')
      .in('id', passageIds)
      .eq('status', 'published')
    if (pError) console.error('fetchQuestionsByIds: passages read failed', pError)
    for (const p of pRows ?? []) passageById.set(p.id, p.body)
  }

  const byId = new Map<string, PracticeQuestion>()
  for (const row of rows) {
    const choices = parseChoices(row.choices_public)
    if (choices.length < 2) continue
    byId.set(row.id, {
      id: row.id,
      skill_id: row.skill_id,
      sat_alignment: row.sat_alignment,
      stem: row.stem,
      passage: row.passage_id ? passageById.get(row.passage_id) ?? null : null,
      choices,
      render_mode: typeof row.render_mode === 'string' ? row.render_mode : 'text',
      prompt: parsePrompt(row.prompt),
      difficulty: parseDifficulty(row.difficulty),
    })
  }
  // Preserve the requested order (the frozen attempt order).
  return ids.map((id) => byId.get(id)).filter((q): q is PracticeQuestion => !!q)
}

// --- Read path: which skills are practiceable (have published questions) -----

export interface PracticeableSkill {
  skill_id: string
  slug: string
  name: string
  subject: string
  grade_band: string | null
  // True Common Core grade (re-level). Kept alongside grade_band; ccss_grade_num
  // ('K'=0 .. 12) is the orderable key used to sequence skills grade-appropriately.
  ccss_grade: string | null
  ccss_grade_num: number | null
  /** True when at least one published question for this skill is passage-backed.
   *  Drives the content age ceiling in gradeLadder.ts. */
  has_passages: boolean
  /** skills.prerequisite_skills — slugs, used to justify reaching below band. */
  prerequisite_skills: string[] | null
}

// Display order for grouping the practice picker by subject (mirrors the
// dashboard's SUBJECT_DISPLAY_ORDER); unknown subjects sort last, then by name.
const PRACTICE_SUBJECT_ORDER = ['math', 'reading', 'writing', 'science']

/**
 * Catalogue paging. CATALOGUE_PAGE matches Supabase's default PostgREST max-rows,
 * so a full page means "there is probably more"; a smaller value would still be
 * correct, just chattier. CATALOGUE_MAX_PAGES is a runaway guard, not a limit we
 * expect to reach: at 1000 rows a page it allows 50k published questions.
 */
const CATALOGUE_PAGE = 1000
const CATALOGUE_MAX_PAGES = 50

/**
 * List the skills a student can actually practice right now: every skill with at
 * least one PUBLISHED question, joined to its skill metadata and sorted by
 * subject then name. Drives the dashboard practice picker — skills without
 * questions never appear. Best-effort: returns [] on any read error, never throws.
 */
export async function listPracticeableSkills(status?: ReadStatus): Promise<PracticeableSkill[]> {
  // RLS already limits the client to status='published'; the filter is explicit
  // so the intent is clear and it still holds if policies change.
  //
  // PAGINATED, and it has to be. PostgREST silently caps an unbounded select at the
  // project's max-rows (1000 on Supabase), with no error and no flag on the
  // response — you just get fewer rows than you asked for. This read is "every
  // published question", which passed 1000 rows and started returning an arbitrary
  // ~1/3 of the catalogue. Because the truncated slice is what defines which skills
  // exist, whole grades collapsed to one or two skills: grade 12 went to a single
  // skill, which made the placement diagnostic a one-question run that could never
  // clear PLACEMENT_MIN_QUESTIONS, so it was discarded and re-offered forever.
  // Anything that reads the whole catalogue MUST page.
  const qRows: { skill_id: string; passage_id: string | null }[] = []
  for (let page = 0; page < CATALOGUE_MAX_PAGES; page++) {
    const from = page * CATALOGUE_PAGE
    const { data, error: qError } = await supabase
      .from('generated_questions')
      .select('skill_id, passage_id')
      // Range pagination needs a total order or pages can overlap and drop rows.
      // skill_id alone is not unique, so id breaks the ties.
      .order('skill_id', { ascending: true })
      .order('id', { ascending: true })
      .eq('status', 'published')
      .range(from, from + CATALOGUE_PAGE - 1)
    if (qError) {
      console.error('listPracticeableSkills: questions read failed', qError)
      if (status) status.failed = true
      return []
    }
    const batch = data ?? []
    qRows.push(...batch)
    // A short page is the last page. An exactly-full final page costs one extra
    // empty read, which is the right trade against guessing.
    if (batch.length < CATALOGUE_PAGE) break
    if (page === CATALOGUE_MAX_PAGES - 1) {
      // Never truncate silently — that is the bug this loop exists to kill.
      console.error(
        'listPracticeableSkills: hit CATALOGUE_MAX_PAGES, the skill list is incomplete',
        { pagesRead: CATALOGUE_MAX_PAGES, rowsRead: qRows.length },
      )
      if (status) status.failed = true
    }
  }
  const skillIds = [...new Set((qRows ?? []).map((r) => r.skill_id).filter(Boolean))]
  if (!skillIds.length) return []

  // Which skills serve passage-backed items. A passage carries age-bearing subject
  // matter, so this is what pins those skills to the child's chronological grade.
  const passageBacked = new Set(
    (qRows ?? []).filter((r) => !!r.passage_id).map((r) => r.skill_id),
  )

  const { data: skillRows, error: sError } = await supabase
    .from('skills')
    .select('id, slug, name, subject, grade_band, ccss_grade, ccss_grade_num, prerequisite_skills')
    .in('id', skillIds)
  if (sError) {
    console.error('listPracticeableSkills: skills read failed', sError)
    if (status) status.failed = true
    return []
  }

  const skills: PracticeableSkill[] = []
  for (const s of skillRows ?? []) {
    if (!s.slug || !s.name) continue // need a slug to route practice to
    // Prep-only skills (subject 'prep-*') are isolated from the K-12 practice
    // picker + diagnostic; the prep engine reaches them by slug directly.
    if (typeof s.subject === 'string' && s.subject.startsWith('prep-')) continue
    skills.push({
      skill_id: s.id,
      slug: s.slug,
      name: s.name,
      subject: s.subject,
      grade_band: s.grade_band,
      ccss_grade: s.ccss_grade,
      ccss_grade_num: s.ccss_grade_num,
      has_passages: passageBacked.has(s.id),
      prerequisite_skills: s.prerequisite_skills ?? null,
    })
  }

  const orderOf = (subject: string) => {
    const i = PRACTICE_SUBJECT_ORDER.indexOf(subject)
    return i === -1 ? PRACTICE_SUBJECT_ORDER.length : i
  }
  // Order by subject, then TRUE Common Core grade (ccss_grade_num), then name.
  // Skills without a ccss grade sort last within a subject, so anything untagged
  // falls back to the prior name ordering rather than jumping to the front.
  const gradeKey = (n: number | null) => (n == null ? Number.POSITIVE_INFINITY : n)
  return skills.sort(
    (a, b) =>
      orderOf(a.subject) - orderOf(b.subject) ||
      gradeKey(a.ccss_grade_num) - gradeKey(b.ccss_grade_num) ||
      a.name.localeCompare(b.name),
  )
}

/**
 * Read this student's evidence-driven mastery, keyed by skill. These are the
 * signals the DB computes from real graded attempts (migration 0010), NOT the
 * legacy self-rating ramp. Best-effort: an empty map on read failure just means
 * every skill looks untouched.
 */
export async function fetchSkillEvidence(studentId: string, status?: ReadStatus): Promise<Map<string, SkillEvidence>> {
  const { data, error } = await supabase
    .from('student_skill_mastery')
    .select('skill_id, status, evidence_accuracy, attempts_counted')
    .eq('student_id', studentId)
  if (error) {
    console.error('fetchSkillEvidence read failed', error)
    if (status) status.failed = true
  }
  const byId = new Map<string, SkillEvidence>()
  for (const m of data ?? []) {
    byId.set(m.skill_id, {
      status: (m.status as SkillEvidence['status']) ?? 'not_started',
      evidence_accuracy: m.evidence_accuracy == null ? null : Number(m.evidence_accuracy),
      attempts_counted: m.attempts_counted ?? 0,
    })
  }
  return byId
}

/**
 * Skill ids this student has ever answered INCORRECTLY on a graded (non-diagnostic)
 * attempt. One of the three pieces of evidence that justify reaching below the
 * student's own band. Best-effort: an empty set just means no downward reach.
 */
export async function fetchMissedSkillIds(studentId: string): Promise<Set<string>> {
  const { data, error } = await supabase
    .from('question_attempts')
    .select('skill_id')
    .eq('student_id', studentId)
    .eq('is_diagnostic', false)
    .eq('is_correct', false)
  if (error) {
    console.error('fetchMissedSkillIds read failed', error)
    return new Set()
  }
  return new Set((data ?? []).map((r) => r.skill_id).filter(Boolean))
}

/**
 * The skills this student may practice right now: every practiceable skill, minus
 * the ones they have cleared, capped by the grade ladder, with below-band skills
 * admitted only on evidence. The rules live in gradeLadder.ts.
 *
 * NOTE: this scopes the PICKER. It deliberately does not gate
 * fetchPracticeQuestions, so a skill reached directly by slug still serves. The
 * prep engine depends on that: it routes a grade 9 student to grade 3
 * Multiplication for HSPT arithmetic on purpose.
 */
export async function listEligibleSkills(student: LadderStudentRow): Promise<PracticeableSkill[]> {
  const practiceable = await listPracticeableSkills()
  if (!practiceable.length) return []
  const [evidence, focusSkillIds, missedSkillIds] = await Promise.all([
    fetchSkillEvidence(student.id),
    getActiveFocusSkillIds(student.id),
    fetchMissedSkillIds(student.id),
  ])
  return eligibleSkills({
    student,
    skills: practiceable,
    evidence,
    focusSkillIds,
    missedSkillIds,
  }) as PracticeableSkill[]
}

/**
 * The next skill to "keep going" on: the student's weakest ELIGIBLE skill that they
 * have NOT already cleared the ADVANCE bar on. Ranking lives in pickNextSkill.ts
 * (pure, unit-tested) and reads evidence — status, evidence_accuracy,
 * attempts_counted — not mastery_percentage.
 *
 * Returns null when every eligible skill is already 'advanced' or 'mastered'. That
 * is deliberate: re-serving a cleared skill is the exact loop this replaces.
 * Best-effort.
 */
export async function nextPracticeSkill(student: LadderStudentRow): Promise<PracticeableSkill | null> {
  const eligible = await listEligibleSkills(student)
  if (!eligible.length) return null
  const evidence = await fetchSkillEvidence(student.id)
  return pickNextSkill(eligible, evidence)
}

// --- Read path: placement diagnostic set -------------------------------------

/** A diagnostic item carries its skill's grade_band (used today for band scoring)
 *  and its true Common Core grade (available for grade-accurate placement). */
export interface DiagnosticQuestion extends PracticeQuestion {
  grade_band: string | null
  ccss_grade: string | null
  ccss_grade_num: number | null
}

/**
 * Placement diagnostic set (Phase 2): PUBLISHED questions drawn from the given
 * skills, each tagged with its grade_band, shuffled into a mixed order. Reuses the
 * normal per-skill serve path, so diagnostic items are exactly the questions a
 * student would practice. Returns [] for an empty skill list.
 *
 * `minQuestions` is a FLOOR on the rung, not a cap: it raises how many are drawn
 * per skill when the rung has few skills, and changes nothing when the rung is
 * already wide. Pass the caller's placement minimum so a thin grade still produces
 * a run long enough to place from.
 */
export async function fetchDiagnosticQuestions(
  skills: PracticeableSkill[],
  minQuestions = 1,
): Promise<DiagnosticQuestion[]> {
  if (!skills.length) return []
  // Draw enough per skill that a THIN rung still reaches minQuestions. A rung used
  // to be exactly one question per skill, so a grade with few published skills
  // produced a run too short to place from, which the caller then discarded and
  // re-offered identically. Widening fixes that at the source: the run gets longer
  // rather than the placement bar getting lower, so a placement is still only
  // claimed from enough answers to mean something.
  //
  // Rungs that are already wide enough are unchanged: 6 skills against a minimum of
  // 4 still draws 1 each. Only a thin rung draws more.
  const perSkill = Math.max(1, Math.ceil(minQuestions / skills.length))
  const sets = await Promise.all(
    skills.map(async (s) => {
      const qs = await fetchPracticeQuestions(s.slug, perSkill)
      return qs.map((q) => ({
        ...q,
        grade_band: s.grade_band,
        ccss_grade: s.ccss_grade,
        ccss_grade_num: s.ccss_grade_num,
      }))
    }),
  )
  return shuffle(sets.flat())
}

/**
 * K-2 initial-placement set: a SHORT (~`target`) audio-picture set drawn ONLY
 * from the given early-grade skills (counting, letter-sounds) — several questions
 * per skill, shuffled and capped. Reuses the normal per-skill serve path, so items
 * carry render_mode='audio_picture' + prompt exactly like a lesson. Returns [] if
 * no early-grade skills are published. Used to keep the youngest placement short,
 * grade-appropriate, and never pulling higher-grade text.
 */
export async function fetchEarlyGradeDiagnostic(
  skills: PracticeableSkill[],
  target: number,
): Promise<DiagnosticQuestion[]> {
  if (!skills.length) return []
  // A few questions from EVERY early skill so placement always reads BOTH early
  // math (counting) AND early literacy (phonics) — balanced and bounded short
  // (2-4 per skill), never relying on a cap that could drop a whole skill.
  const perSkill = Math.min(4, Math.max(2, Math.floor(target / skills.length)))
  const sets = await Promise.all(
    skills.map(async (s) => {
      const qs = await fetchPracticeQuestions(s.slug, perSkill)
      return qs.map((q) => ({
        ...q,
        grade_band: s.grade_band,
        ccss_grade: s.ccss_grade,
        ccss_grade_num: s.ccss_grade_num,
      }))
    }),
  )
  // Round-robin across skills so counting and phonics alternate (gentle variety),
  // and BOTH are always represented — no skill is dropped by a length cap.
  const maxLen = Math.max(...sets.map((s) => s.length))
  const out: DiagnosticQuestion[] = []
  for (let i = 0; i < maxLen; i++) {
    for (const set of sets) if (set[i]) out.push(set[i])
  }
  return out
}

// --- Write path: answer through the server ----------------------------------

export interface AnswerInput {
  studentId: string
  generatedQuestionId: string
  chosenChoiceIndex: number
  /** Epoch ms when the question was shown; time_ms is computed here (null skips). */
  shownAtMs: number | null
  /** Time already measured by the caller (a deferred-scoring test), used instead. */
  timeMs?: number | null
  /** True when recorded by the placement diagnostic (kept out of practice history). */
  isDiagnostic?: boolean
}

/** What the server says about an answer once it is recorded. */
export interface AnswerVerdict {
  attemptId: string | null
  isCorrect: boolean
  /** The right choice's index. Null for a placement answer, which stays silent. */
  correctIndex: number | null
  correctAnswer: string | null
  misconceptionToken: string | null
  solution: string | null
}

/** Pure: read submit_answer's jsonb reply. Null when it is not a verdict. */
export function parseVerdict(raw: unknown): AnswerVerdict | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const r = raw as Record<string, unknown>
  if (typeof r.is_correct !== 'boolean') return null
  return {
    attemptId: typeof r.attempt_id === 'string' ? r.attempt_id : null,
    isCorrect: r.is_correct,
    correctIndex: typeof r.correct_index === 'number' ? r.correct_index : null,
    correctAnswer: typeof r.correct_answer === 'string' ? r.correct_answer : null,
    misconceptionToken: typeof r.misconception_token === 'string' ? r.misconception_token : null,
    solution: typeof r.solution === 'string' ? r.solution : null,
  }
}

/**
 * Answer one question. The server records it (append-only), grades it from the
 * stored question, and only then returns the verdict: right or wrong, the correct
 * choice, the misconception behind a wrong choice, and the worked solution. A
 * placement answer returns right or wrong only.
 *
 * Never throws: null means the answer was not recorded (a network failure, or the
 * account has no access to practice this skill), and the caller says so rather
 * than guessing a verdict.
 */
export async function submitAnswer(a: AnswerInput): Promise<AnswerVerdict | null> {
  const timeMs =
    a.timeMs !== undefined ? a.timeMs : a.shownAtMs == null ? null : Math.max(0, Date.now() - a.shownAtMs)
  try {
    const { data, error } = await supabase.rpc('submit_answer', {
      p_student_id: a.studentId,
      p_question_id: a.generatedQuestionId,
      p_choice_index: a.chosenChoiceIndex,
      p_time_ms: timeMs,
      p_is_diagnostic: a.isDiagnostic ?? false,
    })
    if (error) {
      console.error('submit_answer failed', { error, questionId: a.generatedQuestionId })
      return null
    }
    return parseVerdict(data)
  } catch (err) {
    console.error('submit_answer threw', { err, questionId: a.generatedQuestionId })
    return null
  }
}
