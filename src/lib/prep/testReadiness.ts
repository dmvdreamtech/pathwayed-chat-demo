import type { PrepModule } from '@/lib/prep/types'
import { computePrepProgress, type PrepAttemptLite, type SectionProgress } from '@/lib/prep/prepProgress'

/**
 * Pure engine behind TestReadinessCard: HSPT and ISEE practice results only.
 *
 * WHAT THIS IS NOT. It does not produce a scaled score, a stanine, a percentile,
 * or any projected number. PathwayEd does not hold STS or ERB norming data, so
 * every value here is percent correct on PathwayEd practice questions, plus a
 * plain-language band. The published scale facts in SCALE_REFERENCE and
 * ISEE_PERCENTILE_STANINE are STATIC reference copy, never applied to a student.
 *
 * SAT is deliberately absent: the card composes the existing SatReadiness
 * component, which renders the stored readiness_scores payload. No SAT logic
 * lives here.
 *
 * Section aggregation is delegated to computePrepProgress (prepProgress.ts) so
 * attempt counts and per-section latest/best/trend stay identical to the kid
 * Progress tab and the parent prep card. The one difference this engine imposes
 * is the input filter: EXPIRED attempts are excluded from every percent, band and
 * composite, because a run that ran out of time is not a result. Expired rows
 * still surface in history, flagged Incomplete.
 */

// ---------------------------------------------------------------------------
// Bands. Tunable in one place: percent correct -> plain-language label. These are
// PathwayEd practice bands, not concordance with any published scale.
// ---------------------------------------------------------------------------
export const BAND_STRONG_MIN = 75
export const BAND_SOLID_MIN = 50

export type ReadinessBand = 'Developing' | 'Solid' | 'Strong'

export function bandFor(percent: number): ReadinessBand {
  if (percent >= BAND_STRONG_MIN) return 'Strong'
  if (percent >= BAND_SOLID_MIN) return 'Solid'
  return 'Developing'
}

/** Tests whose official score needs the publisher's own norming data, in card order. */
const NORM_REFERENCED: { id: string; test: string; publisher: string }[] = [
  { id: 'hspt', test: 'HSPT', publisher: 'Scholastic Testing Service' },
  { id: 'isee', test: 'ISEE', publisher: 'ERB' },
]

/** "A", "A and B", "A, B and C". */
function joinAnd(xs: string[]): string {
  if (xs.length <= 1) return xs[0] ?? ''
  return `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`
}

/**
 * The practice disclosure, built from the tests actually on the card for THIS
 * student.
 *
 * It used to be one constant naming HSPT, ISEE, Scholastic Testing Service and ERB
 * to everybody. A grade 9-12 student only ever has SAT (gradeBand [9,12], against
 * [6,8] for HSPT and ISEE), so that copy was accurate and irrelevant at once, and
 * irrelevant copy on a parent-facing readiness panel reads like the product does
 * not know who it is talking to.
 *
 * Every branch keeps the same promise: what PathwayEd shows is practice
 * performance, and the official score is somebody else's to produce. Nothing here
 * converts a practice percent onto anyone's published scale.
 */
export function practiceDisclosure(moduleIds: readonly string[]): string {
  const ids = new Set(moduleIds)
  const parts = ['Practice performance on PathwayEd questions.']

  // HSPT and ISEE share a shape: a published scale we cannot compute because the
  // norming data is the publisher's. One sentence, so it reads as one fact.
  const normed = NORM_REFERENCED.filter((t) => ids.has(t.id))
  if (normed.length > 0) {
    parts.push(
      `Official ${joinAnd(normed.map((t) => t.test))} scaled scores are produced by ` +
        `${joinAnd(normed.map((t) => t.publisher))} using ${normed.length > 1 ? 'their' : 'its'} ` +
        'own national norming data.',
    )
  }

  // SAT: the card shows measured practice results only, never an SAT score or
  // range. Only the College Board reports one.
  if (ids.has('sat')) {
    parts.push('Official SAT scores come only from the College Board. PathwayEd shows practice results, never an SAT score.')
  }

  return parts.join(' ')
}

/** Cap on the history list (most recent first). */
export const HISTORY_LIMIT = 10

// ---------------------------------------------------------------------------
// Static scale reference. Copy only, rendered collapsed. Nothing here is computed
// from, or applied to, a student's practice results.
// ---------------------------------------------------------------------------
export const SCALE_REFERENCE: { id: string; test: string; text: string }[] = [
  {
    id: 'hspt',
    test: 'HSPT',
    text: 'Reports standard scores with 500 as the national mean, plus national and local percentiles and a Cognitive Skills Quotient.',
  },
  {
    id: 'isee',
    test: 'ISEE',
    text: 'Reports a scaled score for each section, a national percentile, and a stanine.',
  },
  { id: 'sat', test: 'SAT', text: 'The College Board reports a total score; PathwayEd does not.' },
]

/**
 * The reference rows for the tests this student actually has, in card order. A
 * SAT-only student has no use for how ERB scales the ISEE, and seeing it named is
 * the same irrelevance the disclosure had.
 */
export function scaleReferenceFor(moduleIds: readonly string[]): typeof SCALE_REFERENCE {
  const ids = new Set(moduleIds)
  return SCALE_REFERENCE.filter((s) => ids.has(s.id))
}

/**
 * The published ISEE percentile-to-stanine table, as static reference data. It is
 * rendered as a table for families who receive an official ISEE report; it is
 * never used to convert a PathwayEd practice percent into a stanine.
 */
export const ISEE_PERCENTILE_STANINE: { percentile: string; stanine: number }[] = [
  { percentile: '1-3', stanine: 1 },
  { percentile: '4-10', stanine: 2 },
  { percentile: '11-22', stanine: 3 },
  { percentile: '23-39', stanine: 4 },
  { percentile: '40-59', stanine: 5 },
  { percentile: '60-76', stanine: 6 },
  { percentile: '77-88', stanine: 7 },
  { percentile: '89-95', stanine: 8 },
  { percentile: '96-99', stanine: 9 },
]

// ---------------------------------------------------------------------------
// Composites (HSPT only). Averages of the member sections' percents, so a
// composite is on the same practice-percent scale as its parts. A member section
// with no submitted attempt is dropped and the composite is marked partial.
// ---------------------------------------------------------------------------
export const HSPT_COMPOSITES: { id: string; name: string; sectionIds: string[] }[] = [
  {
    id: 'total-cognitive-skills',
    name: 'Total Cognitive Skills',
    sectionIds: ['verbal-skills', 'quantitative-skills'],
  },
  {
    id: 'total-basic-skills',
    name: 'Total Basic Skills',
    sectionIds: ['reading', 'mathematics', 'language'],
  },
  {
    id: 'battery-composite',
    name: 'Battery Composite',
    sectionIds: ['verbal-skills', 'quantitative-skills', 'reading', 'mathematics', 'language'],
  },
]

/**
 * The ISEE sections that carry a score. The Essay is excluded by design: ERB sends
 * it unscored to schools, and prep_essay_attempts has no score column.
 */
export const ISEE_SCORED_SECTION_IDS = [
  'verbal-reasoning',
  'quantitative-reasoning',
  'reading-comprehension',
  'mathematics-achievement',
]

// ---------------------------------------------------------------------------
// Result shapes
// ---------------------------------------------------------------------------

export interface SectionRow {
  sectionId: string
  name: string
  /** Percent correct on the most recent SUBMITTED attempt, or null when none. */
  percent: number | null
  /** Count of SUBMITTED attempts (expired runs are not results). */
  attempts: number
  band: ReadinessBand | null
  /** True when the section has no submitted attempt yet. */
  notAttempted: boolean
}

export interface CompositeRow {
  id: string
  name: string
  /** Mean of the member sections that have a percent, or null when none do. */
  percent: number | null
  band: ReadinessBand | null
  /** True when at least one member section has no submitted attempt. */
  partial: boolean
  /** Member sections still missing, by display name (drives the partial note). */
  missing: string[]
}

export interface ModuleReadiness {
  moduleId: string
  moduleName: string
  sections: SectionRow[]
  composites: CompositeRow[]
  /** True when at least one section has a submitted attempt. */
  hasResults: boolean
}

export type HistoryKind = 'section' | 'essay'

export interface HistoryRow {
  key: string
  kind: HistoryKind
  /** ISO date of the attempt (submitted_at when present, else started_at). */
  date: string | null
  moduleName: string
  sectionName: string
  /** Percent correct, or null for expired runs and essays. */
  percent: number | null
  /** Display label for prep_attempts.mode, empty for essays. */
  mode: string
  /** Expired: shown in history, excluded from all math above. */
  incomplete: boolean
  /** Essay rows only: whether Nikki feedback is on the row. */
  essayHasFeedback: boolean
}

// prep_attempts.mode -> parent and student facing label.
const MODE_LABELS: Record<string, string> = {
  train: 'Train',
  practice: 'Practice',
  timed_section: 'Timed section',
  full_test: 'Full test',
}

export function modeLabel(mode: string): string {
  return MODE_LABELS[mode] ?? mode
}

const mean = (xs: number[]) => Math.round(xs.reduce((a, b) => a + b, 0) / xs.length)

/**
 * Build one module's section rows and composites from its finalized attempts.
 *
 * `attempts` may contain expired rows; they are filtered out here so the caller
 * can hand over everything it loaded. Section aggregation itself is delegated to
 * computePrepProgress, which already derives attempt counts and the most recent
 * score per section.
 */
export function buildModuleReadiness(
  module: PrepModule,
  attempts: PrepAttemptLite[],
  compositeDefs: { id: string; name: string; sectionIds: string[] }[] = [],
  scoredSectionIds?: string[],
): ModuleReadiness {
  const submitted = attempts.filter((a) => a.status === 'submitted' && a.score != null)
  // Empty slug map: this card uses only the per-section aggregation, never the
  // practice % right those inputs would produce.
  const progress = computePrepProgress(module, submitted, new Map())
  const bySection = new Map<string, SectionProgress>(progress.sections.map((s) => [s.sectionId, s]))

  const scored = module.sections.filter((s) => {
    if (s.essay) return false // unscored by design
    return scoredSectionIds ? scoredSectionIds.includes(s.id) : true
  })

  const sections: SectionRow[] = scored.map((s) => {
    const found = bySection.get(s.id)
    const percent = found ? found.latestScore : null
    return {
      sectionId: s.id,
      name: s.name,
      percent,
      attempts: found ? found.attempts : 0,
      band: percent == null ? null : bandFor(percent),
      notAttempted: percent == null,
    }
  })

  const percentById = new Map(sections.filter((s) => s.percent != null).map((s) => [s.sectionId, s.percent as number]))
  const nameById = new Map(module.sections.map((s) => [s.id, s.name]))

  const composites: CompositeRow[] = compositeDefs.map((def) => {
    const present = def.sectionIds.filter((id) => percentById.has(id))
    const missing = def.sectionIds.filter((id) => !percentById.has(id)).map((id) => nameById.get(id) ?? id)
    const percent = present.length ? mean(present.map((id) => percentById.get(id) as number)) : null
    return {
      id: def.id,
      name: def.name,
      percent,
      band: percent == null ? null : bandFor(percent),
      partial: missing.length > 0,
      missing,
    }
  })

  return {
    moduleId: module.id,
    moduleName: module.name,
    sections,
    composites,
    hasResults: percentById.size > 0,
  }
}

/** A finalized prep attempt as the history list needs it. */
export interface HistoryAttemptInput {
  id: string
  moduleId: string
  sectionId: string
  mode: string
  status: 'in_progress' | 'submitted' | 'expired'
  score: number | null
  startedAt: string | null
  submittedAt: string | null
}

/** A submitted essay attempt as the history list needs it. */
export interface HistoryEssayInput {
  id: string
  startedAt: string | null
  submittedAt: string | null
  hasFeedback: boolean
}

/**
 * Merge section attempts and essays into one history list, most recent first and
 * capped at HISTORY_LIMIT. In-progress runs are excluded (they are not results
 * yet). Expired runs are included, without a percent, flagged incomplete.
 */
export function buildHistory(
  attempts: HistoryAttemptInput[],
  essays: HistoryEssayInput[],
  modules: PrepModule[],
): HistoryRow[] {
  // Keyed by plain string: module ids arrive from the database as text, so a
  // lookup must accept any string and simply miss. Every read below already
  // handles undefined.
  const moduleById = new Map<string, PrepModule>(modules.map((m) => [m.id, m]))
  const iseeName = moduleById.get('isee')?.name ?? 'ISEE'

  const rows: HistoryRow[] = []

  for (const a of attempts) {
    if (a.status !== 'submitted' && a.status !== 'expired') continue
    const mod = moduleById.get(a.moduleId)
    rows.push({
      key: `attempt:${a.id}`,
      kind: 'section',
      date: a.submittedAt ?? a.startedAt,
      moduleName: mod?.name ?? a.moduleId.toUpperCase(),
      sectionName: mod?.sections.find((s) => s.id === a.sectionId)?.name ?? a.sectionId,
      percent: a.status === 'submitted' && a.score != null ? Math.round(a.score * 100) : null,
      mode: modeLabel(a.mode),
      incomplete: a.status === 'expired',
      essayHasFeedback: false,
    })
  }

  for (const e of essays) {
    if (!e.submittedAt) continue // only submitted essays are results
    rows.push({
      key: `essay:${e.id}`,
      kind: 'essay',
      date: e.submittedAt,
      moduleName: iseeName,
      sectionName: 'Essay',
      percent: null, // unscored by design, never a percent
      mode: '',
      incomplete: false,
      essayHasFeedback: e.hasFeedback,
    })
  }

  rows.sort((a, b) => timeOf(b.date) - timeOf(a.date))
  return rows.slice(0, HISTORY_LIMIT)
}

function timeOf(iso: string | null): number {
  if (!iso) return 0
  const t = Date.parse(iso)
  return Number.isNaN(t) ? 0 : t
}
