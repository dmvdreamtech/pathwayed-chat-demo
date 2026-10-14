import type { Json } from './database.types'
import type { MasteryStatus } from './masteryStatus'

/**
 * Academic OS Phase 2 — the readiness / Pathway Score ENGINE.
 *
 * `computePathwayScore` is a PURE, documented, NO-ML function: a confidence-
 * weighted average of per-skill mastery, plus per-subject sub-scores, strengths,
 * gaps, and the next skill to practice. `computeSatResults` reports measured SAT
 * results (% right per section and domain) from the same evidence. `buildReadinessUpserts` turns a
 * student's mastery rows into the readiness_scores rows to store.
 *
 * WHY THIS IS ITS OWN FILE. Readiness is a RESULT, so since migration 0031 only
 * the server writes it: api/readiness.ts reads the evidence with the service
 * role, runs this engine, and upserts. The browser still uses the same pure
 * functions (re-exported by readiness.ts) for its views and tests. So this file
 * must stay importable from api/: relative imports only, no `@/`, nothing
 * browser-only or server-only.
 *
 * What it rests on: the evidence columns the database computes from graded
 * answers (migration 0010), never a number a browser supplied.
 */

// Per-skill confidence weight = attemptsWeight x recencyWeight. A skill counts
// fully only once it's been practiced a few times and recently; a single, stale
// practice barely moves the score.
const CONFIDENCE_ATTEMPTS = 3 // attempts for full attempts-weight (tunable)
const RECENCY_HALFLIFE_DAYS = 30 // mastery weight halves every ~month of no practice
const RECENCY_FLOOR = 0.25 // old practice still counts a little, never zero
const TOP_N = 3 // strengths / gaps list size
// Percentage thresholds used ONLY by the SAT results, which still group by
// accuracy band. The Pathway strengths/gaps no longer use them: they classify on
// the evidence bars (advanced/mastered vs practicing) so a skill can never be
// called a strength or a gap without graded attempts behind it.
const STRENGTH_MIN = 70
const GAP_MAX = 60

// Bumped whenever the scoring/classification logic changes. Stored on each
// readiness_scores row so a row computed by an older engine is detected as stale
// and recomputed on next view. (v2 = the threshold-based strengths/gaps fix;
// v3 = adds the SAT readiness projection — existing rows self-heal on next view;
// v5 = SAT results are measured only, SAT-level skills only, no projected range.)
export const ENGINE_VERSION = 5
const DAY_MS = 86_400_000

// Subjects we publish a per-subject sub-score for (seeded subjects). The overall
// Pathway Score still aggregates ALL practiced skills regardless of subject.
export const SUBJECTS = ['math', 'reading', 'writing'] as const

/**
 * One skill's EVIDENCE for the readiness engine.
 *
 * `mastery_percentage` and `attempts` used to carry the legacy self-rating ramp.
 * They now carry `evidence_accuracy` and `attempts_counted` from the evidence
 * engine (migration 0010), and `status` comes along so strengths and gaps can be
 * classified by the real bars rather than by a percentage threshold.
 *
 * The field names are kept so computeBreakdown and computeSatResults did not
 * need rewriting; what changed is what is put in them, at the one place that reads
 * the database (recordReadiness).
 */
export interface ReadinessSkillRow {
  slug: string
  name: string
  subject: string
  /** evidence_accuracy: accuracy over counted attempts, 0 when there is none. */
  mastery_percentage: number
  /** attempts_counted: graded, non-diagnostic, not-too-fast attempts. */
  attempts: number
  last_practiced: string | null
  /** Evidence status. Absent is treated as 'not_started'. */
  status?: MasteryStatus
}

export interface SkillRef {
  slug: string
  name: string
  subject: string
  mastery: number
}

export interface ReadinessBreakdown {
  score: number // 0..100, confidence-weighted average of evidence accuracy
  strengths: SkillRef[] // skills cleared on evidence (advanced or mastered)
  gaps: SkillRef[] // skills with evidence that have not cleared the advance bar
  nextSkillSlug: string | null // highest-leverage weak skill to practice next
  /** Skills with counted evidence behind the score. 0 means NOT MEASURED. */
  measuredSkills: number
}

export interface PathwayResult {
  /** Overall readiness across every practiced skill. */
  pathway: ReadinessBreakdown
  /** Per-subject readiness, only for subjects that have practiced skills. */
  bySubject: Partial<Record<(typeof SUBJECTS)[number], ReadinessBreakdown>>
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n))
}

/** More attempts -> more confident the mastery number is real. */
function attemptsWeight(attempts: number): number {
  return clamp(attempts / CONFIDENCE_ATTEMPTS, 0, 1)
}

/** Recent practice counts more; weight decays with a 30-day half-life, floored. */
function recencyWeight(lastPracticed: string | null, now: number): number {
  if (!lastPracticed) return RECENCY_FLOOR
  const t = Date.parse(lastPracticed)
  if (Number.isNaN(t)) return RECENCY_FLOOR
  const days = Math.max(0, (now - t) / DAY_MS)
  return clamp(Math.pow(0.5, days / RECENCY_HALFLIFE_DAYS), RECENCY_FLOOR, 1)
}

function toRef(r: ReadinessSkillRow): SkillRef {
  return { slug: r.slug, name: r.name, subject: r.subject, mastery: Math.round(r.mastery_percentage) }
}

/**
 * Readiness for a set of skill rows: confidence-weighted mean of mastery, plus
 * the strongest/weakest skills and the next one to practice.
 *   score = sum(mastery_i * w_i) / sum(w_i),  w_i = attemptsWeight x recencyWeight
 */
/** A skill only counts once it has real graded evidence behind it. */
function hasEvidence(r: ReadinessSkillRow): boolean {
  return r.attempts > 0
}

function computeBreakdown(allRows: ReadinessSkillRow[], now: number): ReadinessBreakdown {
  // EVIDENCE ONLY. A skill with zero counted attempts is not a strength, not a
  // gap, and contributes nothing to the score. Before this filter the dashboard
  // showed 39 strength/gap chips across live accounts, 27 of them for skills the
  // child had never answered a graded question about, because a placement seed had
  // written 25 or 70 into the legacy column.
  const rows = allRows.filter(hasEvidence)
  let weighted = 0
  let totalWeight = 0
  for (const r of rows) {
    const w = attemptsWeight(r.attempts) * recencyWeight(r.last_practiced, now)
    weighted += r.mastery_percentage * w
    totalWeight += w
  }
  const score = totalWeight > 0 ? clamp(Math.round(weighted / totalWeight), 0, 100) : 0

  // Strengths: skills the child has actually CLEARED, by the evidence bars, not by
  // a percentage threshold. advanced = >=70% over >=5 graded attempts; mastered
  // adds a spaced re-check. Strongest first.
  const strengths = [...rows]
    .filter((r) => r.status === 'advanced' || r.status === 'mastered')
    .sort((a, b) => b.mastery_percentage - a.mastery_percentage || a.name.localeCompare(b.name))
    .slice(0, TOP_N)
    .map(toRef)

  // Gaps: skills with real evidence that have NOT cleared the advance bar, weakest
  // first; tie-break toward MORE attempts (a persistent weakness is higher-leverage
  // than a brand-new skill). A skill nobody has answered is neither a gap nor a
  // strength, it is simply unmeasured.
  const gaps = [...rows]
    .filter((r) => r.status !== 'advanced' && r.status !== 'mastered')
    .sort(
      (a, b) =>
        a.mastery_percentage - b.mastery_percentage ||
        b.attempts - a.attempts ||
        a.name.localeCompare(b.name),
    )
    .slice(0, TOP_N)
    .map(toRef)

  return {
    score,
    strengths,
    gaps,
    // Next skill to practice = the weakest gap with real evidence behind it.
    nextSkillSlug: gaps[0]?.slug ?? null,
    // How many skills the score actually rests on. ZERO is the honest
    // "not measured yet", and is NOT the same thing as a score of 0. The UI must
    // distinguish them: a child who has answered nothing has not scored badly.
    measuredSkills: rows.length,
  }
}

/**
 * Pure: compute overall + per-subject readiness from the student's mastery rows.
 * `now` (epoch ms) is passed in so the recency weighting is deterministic/testable.
 */
export function computePathwayScore(rows: ReadinessSkillRow[], now: number): PathwayResult {
  const bySubject: PathwayResult['bySubject'] = {}
  for (const subject of SUBJECTS) {
    const subjectRows = rows.filter((r) => r.subject === subject)
    if (subjectRows.length) bySubject[subject] = computeBreakdown(subjectRows, now)
  }
  return { pathway: computeBreakdown(rows, now), bySubject }
}

// ===========================================================================
// SAT results (pure, NO-ML). MEASURED PERFORMANCE ONLY: how many answers on
// SAT-level skills were right, per section and per SAT domain, and how many of
// those skills have been practiced. No projected score, no range, no ceiling.
// PathwayEd never estimates an SAT score; only the College Board reports one.
// ===========================================================================

export type SatSection = 'math' | 'reading-writing'

/** A practiced-or-untouched skill row fed to the SAT engine. */
export interface SatSkillRow extends ReadinessSkillRow {
  /** SAT domain token from skills.sat_alignment (e.g. 'algebra'). */
  sat_alignment: string | null
  /** True Common Core grade (K = 0), null for test-prep skills. */
  ccss_grade_num: number | null
}

/** Measured results for one SAT domain. */
export interface SatDomainResult {
  token: string
  label: string
  section: SatSection
  /** Answers right out of answers counted, 0..100; null when none counted. */
  pctRight: number | null
  /** Graded answers counted across the domain's SAT-level skills. */
  answers: number
  /** SAT-level skills in this domain with at least one counted answer. */
  skillsPracticed: number
  /** SAT-level skills in this domain. 0 means we have none to offer yet. */
  skillsTotal: number
}

/** Measured results for one SAT section. */
export interface SatSectionResult {
  pctRight: number | null
  answers: number
  skillsPracticed: number
  skillsTotal: number
  domains: SatDomainResult[]
}

/** The stored 'sat' payload (readiness_scores.recommendations). */
export interface SatResultsPayload {
  schemaVersion: number
  sections: Record<SatSection, SatSectionResult>
  /** Answers right out of answers counted, both sections; null when none. */
  overallPctRight: number | null
  answers: number
  skillsPracticed: number
  skillsTotal: number
  /** Measured skills under GAP_MAX first, then not-started skills, lowest grade first. */
  toPractice: SkillRef[]
  nextSkillSlug: string | null
}

/** What the SAT engine returns: the stored payload plus the row scalars. */
export interface SatEngineResult {
  payload: SatResultsPayload
  /** 0..100 overall % right, for the readiness_scores.score column (0 when none). */
  score: number
  strengths: SkillRef[]
  gaps: SkillRef[]
  nextSkillSlug: string | null
}

// The 8 digital-SAT domains -> section. Mirrors the domain rows seeded in
// seeds/0002_taxonomy_sat_6-12.sql (their `description` carries the section
// token). Static because the digital-SAT domain set is fixed.
export const SAT_DOMAINS: { token: string; label: string; section: SatSection }[] = [
  { token: 'algebra', label: 'Algebra', section: 'math' },
  { token: 'advanced-math', label: 'Advanced Math', section: 'math' },
  { token: 'problem-solving-data-analysis', label: 'Problem-Solving & Data Analysis', section: 'math' },
  { token: 'geometry-trigonometry', label: 'Geometry & Trigonometry', section: 'math' },
  { token: 'information-and-ideas', label: 'Information & Ideas', section: 'reading-writing' },
  { token: 'craft-and-structure', label: 'Craft & Structure', section: 'reading-writing' },
  { token: 'expression-of-ideas', label: 'Expression of Ideas', section: 'reading-writing' },
  { token: 'standard-english-conventions', label: 'Standard English Conventions', section: 'reading-writing' },
]
const SECTION_BY_DOMAIN = new Map(SAT_DOMAINS.map((d) => [d.token, d.section] as const))
const SAT_SECTIONS: SatSection[] = ['math', 'reading-writing']

// v2: measured results only. v1 rows (projected ranges) are read as empty.
export const SAT_SCHEMA_VERSION = 2

/**
 * The lowest Common Core grade that counts as SAT-level. Almost every K-12 skill
 * carries an sat_alignment (Counting maps to Problem-Solving & Data Analysis),
 * so the domain alone would put kindergarten skills in a 9th grader's SAT list.
 */
export const SAT_MIN_GRADE = 6
const SAT_TO_PRACTICE_CAP = 6

/**
 * Is this skill SAT-level? It must map to a digital-SAT domain AND be either
 * grade 6 or above, or a test-prep skill (subject prep-*) that has been mapped to
 * an SAT domain on purpose (SAT Words in Context, SAT Transitions; migration
 * 0032). Prep skills carry no grade, so the floor alone would drop them.
 */
export function isSatLevelSkill(row: {
  sat_alignment: string | null
  ccss_grade_num: number | null
  subject: string
}): boolean {
  if (!row.sat_alignment || !SECTION_BY_DOMAIN.has(row.sat_alignment)) return false
  if (row.subject.startsWith('prep-')) return true
  return row.ccss_grade_num != null && row.ccss_grade_num >= SAT_MIN_GRADE
}

/** Pooled % right over rows: answers right / answers counted. Null with none. */
function measured(rows: SatSkillRow[]): Omit<SatSectionResult, 'domains'> {
  let answers = 0
  let right = 0
  let practiced = 0
  for (const r of rows) {
    if (r.attempts <= 0) continue
    answers += r.attempts
    right += (r.mastery_percentage / 100) * r.attempts
    practiced += 1
  }
  return {
    pctRight: answers > 0 ? clamp(Math.round((100 * right) / answers), 0, 100) : null,
    answers,
    skillsPracticed: practiced,
    skillsTotal: rows.length,
  }
}

// What to practice next: measured weaknesses first (lowest % right first), then
// skills not started, lowest grade first so the foundations come before the
// hardest material. Prep skills (no grade) sort with grade 9, where SAT prep
// begins.
function toPracticeCompare(a: SatSkillRow, b: SatSkillRow): number {
  const ap = a.attempts > 0 ? 0 : 1
  const bp = b.attempts > 0 ? 0 : 1
  if (ap !== bp) return ap - bp
  if (ap === 0 && a.mastery_percentage !== b.mastery_percentage) return a.mastery_percentage - b.mastery_percentage
  const ag = a.ccss_grade_num ?? 9
  const bg = b.ccss_grade_num ?? 9
  if (ag !== bg) return ag - bg
  return a.name.localeCompare(b.name)
}

/**
 * Measured SAT results. `rows` should be the SAT catalog with this student's
 * evidence filled in (untouched skills present with attempts 0). Rows that are
 * not SAT-level (isSatLevelSkill) are ignored. `mastery_percentage` and
 * `attempts` carry evidence_accuracy and attempts_counted, so % right is the
 * share of graded, counted answers that were right.
 */
export function computeSatResults(rows: SatSkillRow[]): SatEngineResult {
  const satRows = rows.filter(isSatLevelSkill)

  const domainResults: SatDomainResult[] = SAT_DOMAINS.map((d) => ({
    token: d.token,
    label: d.label,
    section: d.section,
    ...measured(satRows.filter((r) => r.sat_alignment === d.token)),
  }))

  const sections = {} as Record<SatSection, SatSectionResult>
  for (const section of SAT_SECTIONS) {
    sections[section] = {
      ...measured(satRows.filter((r) => SECTION_BY_DOMAIN.get(r.sat_alignment as string) === section)),
      domains: domainResults.filter((d) => d.section === section),
    }
  }

  const overall = measured(satRows)
  const toPracticeRows = satRows
    .filter((r) => r.attempts === 0 || r.mastery_percentage < GAP_MAX)
    .sort(toPracticeCompare)
  const toPractice = toPracticeRows.slice(0, SAT_TO_PRACTICE_CAP).map(toRef)
  const nextSkillSlug = toPracticeRows[0]?.slug ?? null

  const strengths = satRows
    .filter((r) => r.attempts > 0 && r.mastery_percentage >= STRENGTH_MIN)
    .sort((a, b) => b.mastery_percentage - a.mastery_percentage || a.name.localeCompare(b.name))
    .slice(0, TOP_N)
    .map(toRef)

  const payload: SatResultsPayload = {
    schemaVersion: SAT_SCHEMA_VERSION,
    sections,
    overallPctRight: overall.pctRight,
    answers: overall.answers,
    skillsPracticed: overall.skillsPracticed,
    skillsTotal: overall.skillsTotal,
    toPractice,
    nextSkillSlug,
  }

  return {
    payload,
    score: overall.pctRight ?? 0,
    strengths,
    gaps: toPractice,
    nextSkillSlug,
  }
}

// ---------------------------------------------------------------------------
// The readiness_scores rows. Built here; written only by api/readiness.ts.
// ---------------------------------------------------------------------------

export function readinessRow(studentId: string, readinessType: string, b: ReadinessBreakdown) {
  return {
    student_id: studentId,
    readiness_type: readinessType,
    score: b.score,
    strengths: b.strengths as unknown as Json,
    gaps: b.gaps as unknown as Json,
    next_skill_slug: b.nextSkillSlug,
    // Carries how many skills the score rests on, so the dashboard can tell
    // "not measured yet" apart from "scored zero". Uses the spare jsonb column
    // rather than a migration.
    recommendations: { measuredSkills: b.measuredSkills } as unknown as Json,
    engine_version: ENGINE_VERSION,
  }
}

/**
 * The single readiness_scores row for readiness_type='sat'. The per-section and
 * per-domain results don't fit numeric(5,2), so the full SAT payload lives in
 * `recommendations`; `score` holds the overall % right (0..100).
 */
export function satReadinessRow(studentId: string, sat: SatEngineResult) {
  return {
    student_id: studentId,
    readiness_type: 'sat',
    score: sat.score,
    strengths: sat.strengths as unknown as Json,
    gaps: sat.gaps as unknown as Json,
    next_skill_slug: sat.nextSkillSlug,
    recommendations: sat.payload as unknown as Json,
    engine_version: ENGINE_VERSION,
  }
}

export type ReadinessUpsert = ReturnType<typeof readinessRow>

/** The student_skill_mastery columns readiness reads. Evidence only. */
export interface ReadinessMasteryInput {
  skill_id: string
  status: string | null
  evidence_accuracy: number | string | null
  attempts_counted: number | null
  last_practiced: string | null
}

/** The skills columns readiness reads, for the student's own mastery rows. */
export interface ReadinessSkillInput {
  id: string
  name: string
  subject: string
  slug: string | null
}

/** One row of the SAT catalog (level 'skill', sat_alignment set). */
export interface SatCatalogInput {
  id: string
  slug: string | null
  name: string
  subject: string
  sat_alignment: string | null
  ccss_grade_num: number | null
}

/**
 * Every readiness_scores row for one student, from a FRESH read of all their
 * mastery rows: 'pathway', one per practiced subject, and 'sat' when the SAT
 * catalog is known. Empty when there is nothing to compute from, in which case
 * the caller writes nothing (the same as before the move to the server).
 */
export function buildReadinessUpserts(
  studentId: string,
  masteryRows: ReadinessMasteryInput[],
  skillRows: ReadinessSkillInput[],
  satCatalog: SatCatalogInput[],
  now: number,
): ReadinessUpsert[] {
  if (!masteryRows.length) return []
  const skillById = new Map(skillRows.map((s) => [s.id, s]))

  // EVIDENCE COLUMNS, not the legacy self-rating ramp. This is what makes the
  // Pathway score, the strengths, and the gaps honest.
  const rows: ReadinessSkillRow[] = []
  for (const m of masteryRows) {
    const s = skillById.get(m.skill_id)
    if (!s || !s.slug) continue // only skill-level rows (with a slug) feed readiness
    rows.push({
      slug: s.slug,
      name: s.name,
      subject: s.subject,
      mastery_percentage: m.evidence_accuracy == null ? 0 : Number(m.evidence_accuracy),
      attempts: m.attempts_counted ?? 0,
      last_practiced: m.last_practiced,
      status: (m.status as MasteryStatus) ?? 'not_started',
    })
  }
  if (!rows.length) return []

  const result = computePathwayScore(rows, now)
  const upserts = [
    readinessRow(studentId, 'pathway', result.pathway),
    ...Object.entries(result.bySubject).map(([subject, b]) => readinessRow(studentId, subject, b)),
  ]

  // SAT results over the FULL SAT catalog (so untouched SAT-level skills count as
  // not started and can be suggested next), left-joined to this student's
  // mastery (untouched -> attempts:0). computeSatResults keeps SAT-level only.
  const masteryById = new Map(masteryRows.map((m) => [m.skill_id, m]))
  const satRows: SatSkillRow[] = []
  for (const c of satCatalog) {
    if (!c.slug || !c.sat_alignment) continue
    const m = masteryById.get(c.id)
    satRows.push({
      slug: c.slug,
      name: c.name,
      subject: c.subject,
      sat_alignment: c.sat_alignment,
      ccss_grade_num: c.ccss_grade_num,
      // Evidence, same as the pathway rows above. A skill with a mastery row but
      // no counted attempts reads as untouched here, which is what it is.
      mastery_percentage: m?.evidence_accuracy == null ? 0 : Number(m.evidence_accuracy),
      attempts: m?.attempts_counted ?? 0,
      last_practiced: m ? m.last_practiced : null,
      status: (m?.status as MasteryStatus) ?? 'not_started',
    })
  }
  if (satRows.length) {
    upserts.push(satReadinessRow(studentId, computeSatResults(satRows)))
  }
  return upserts
}
