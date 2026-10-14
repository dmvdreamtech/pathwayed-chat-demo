import { supabase } from '@/lib/supabase'
import { authedJsonHeaders } from '@/lib/apiAuth'
import { subjectDisplayName } from '@/lib/subjects'
import type { Json } from '@/lib/database.types'
import {
  ENGINE_VERSION,
  SAT_SCHEMA_VERSION,
  SUBJECTS,
  type SatDomainResult,
  type SatResultsPayload,
  type SatSection,
  type SatSectionResult,
  type SkillRef,
} from '@/lib/readinessEngine'

/**
 * Readiness in the browser: reading it, deciding when it is stale, asking the
 * server to recompute, and the templated coach copy.
 *
 * The engine (computePathwayScore, computeSatResults and the row builders)
 * lives in readinessEngine.ts and is re-exported here, so existing imports keep
 * working. Since migration 0031 the browser never writes readiness_scores:
 * refreshReadiness asks api/readiness.ts, which recomputes from the database's
 * own evidence with the service role.
 *
 * IMPORTANT — what this rests on: the underlying mastery signal is SOFT. Skills
 * practiced are detected by keyword matching over the transcript, and accuracy is
 * proxied by the child's end-of-session self-rating (confidence/sentiment), not
 * graded answers. So the Pathway Score is DIRECTIONALLY USEFUL (it moves the
 * right way as a student practices and improves) but is NOT yet school-grade
 * precise. Treat it as a coaching signal, not an assessment.
 */

export * from '@/lib/readinessEngine'

/**
 * Ask the server to recompute this student's readiness from a fresh read of
 * their evidence. The server checks the caller owns the student. Throws on a
 * network failure; a refused or failed recompute is logged and leaves the stored
 * rows as they were, which is how a failed upsert behaved before the move.
 */
export async function refreshReadiness(studentId: string): Promise<void> {
  const res = await fetch('/api/readiness', {
    method: 'POST',
    headers: await authedJsonHeaders(),
    body: JSON.stringify({ studentId }),
  })
  if (!res.ok) console.error('readiness refresh failed', res.status)
}

// ---------------------------------------------------------------------------
// Dashboard read + templated (NO-LLM) Coach message and Today's Plan.
// computeXxx above is the engine; the below is read-only presentation, pure
// where possible, so the student dashboard can show "what should I do next".
// ---------------------------------------------------------------------------

export interface ReadinessRecord {
  score: number
  strengths: SkillRef[]
  gaps: SkillRef[]
  nextSkillSlug: string | null
  /**
   * Skills with counted evidence behind the score.
   *   > 0  - show the score.
   *   0    - NOT MEASURED YET; show the empty state, never a score of 0.
   *   null - UNKNOWN; the stored value was missing or malformed, so we could not
   *          tell. Show the error state, never the empty state.
   */
  measuredSkills: number | null
}
export interface ReadinessView {
  pathway: ReadinessRecord | null
  bySubject: Record<string, ReadinessRecord>
  hasAny: boolean
  /**
   * TRUE when a read failed or a recompute threw. This is NOT the same as having
   * no evidence, and the UI must not conflate them: telling a parent there is
   * nothing to say, when the truth is that we failed to look, is the one failure
   * mode this whole surface exists to avoid.
   */
  loadFailed: boolean
}

/**
 * Narrow stored jsonb into SkillRefs. Written as a loop with an explicit cast
 * rather than a `x is SkillRef` predicate: TypeScript rejects that predicate
 * because SkillRef has no index signature and so is not assignable to Json, even
 * though the runtime shape check is exactly right. The behaviour is unchanged.
 */
function asRefs(v: Json | null | undefined): SkillRef[] {
  if (!Array.isArray(v)) return []
  const out: SkillRef[] = []
  for (const x of v) {
    if (!x || typeof x !== 'object' || Array.isArray(x)) continue
    if ('slug' in x && 'name' in x && 'subject' in x) out.push(x as unknown as SkillRef)
  }
  return out
}

interface ReadinessRowLite {
  readiness_type: string
  score: number
  strengths: Json
  gaps: Json
  next_skill_slug: string | null
  recommendations?: Json
}

/**
 * Pull measuredSkills out of the spare jsonb column.
 *
 * Returns null for UNKNOWN, which is deliberately distinct from 0. Zero means we
 * looked and there is no evidence. Null means we could not tell: the column was
 * not selected, or holds a shape we do not recognise. Collapsing those two into 0
 * is what let a missing SELECT column render as "not measured yet" on an account
 * whose score was 65.
 *
 * A legacy empty array IS a known benign shape (older engines wrote it), so it
 * reports 0; the engine-version bump recomputes those rows on next view anyway.
 */
function readMeasuredSkills(raw: Json | undefined): number | null {
  if (raw === undefined) return null // column not selected: a bug, not an empty state
  if (Array.isArray(raw)) return raw.length === 0 ? 0 : null // legacy [] is benign
  if (!raw || typeof raw !== 'object') return null
  const v = (raw as Record<string, unknown>).measuredSkills
  return typeof v === 'number' && Number.isFinite(v) ? v : null
}

// Only these readiness_type values are subjects. Other types (notably 'sat')
// must NEVER be treated as a subject — they have their own dedicated view and
// must not leak into bySubject or Today's Plan (no "Practice Sat" item).
const SUBJECT_TYPES = new Set<string>(SUBJECTS)

/** Pure: shape raw readiness_scores rows into a view. Exported for testing. */
export function buildReadinessView(rows: ReadinessRowLite[], loadFailed = false): ReadinessView {
  if (!rows.length) return { pathway: null, bySubject: {}, hasAny: false, loadFailed }
  let pathway: ReadinessRecord | null = null
  const bySubject: Record<string, ReadinessRecord> = {}
  for (const r of rows) {
    const rec: ReadinessRecord = {
      score: Number(r.score),
      strengths: asRefs(r.strengths),
      gaps: asRefs(r.gaps),
      nextSkillSlug: r.next_skill_slug,
      measuredSkills: readMeasuredSkills(r.recommendations),
    }
    if (r.readiness_type === 'pathway') pathway = rec
    else if (SUBJECT_TYPES.has(r.readiness_type)) bySubject[r.readiness_type] = rec
    // else (e.g. 'sat'): ignored here; read directly by the SAT view.
  }
  return { pathway, bySubject, hasAny: true, loadFailed }
}

/** Read this student's readiness_scores (pathway + per-subject). Read-only,
 *  anon client under RLS (owns_student). Always resolves to a view. */
export async function getReadiness(studentId: string): Promise<ReadinessView> {
  const { data, error } = await supabase
    .from('readiness_scores')
    .select('readiness_type, score, strengths, gaps, next_skill_slug, recommendations')
    .eq('student_id', studentId)
  if (error || !data) {
    console.error('getReadiness read failed', error)
    return { pathway: null, bySubject: {}, hasAny: false, loadFailed: true }
  }
  return buildReadinessView(data)
}

const isCount = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 0
const isPct = (v: unknown): v is number | null => v === null || (typeof v === 'number' && v >= 0 && v <= 100)

function isDomain(v: unknown): v is SatDomainResult {
  if (!v || typeof v !== 'object') return false
  const d = v as SatDomainResult
  return (
    typeof d.token === 'string' &&
    typeof d.label === 'string' &&
    isPct(d.pctRight) &&
    isCount(d.answers) &&
    isCount(d.skillsPracticed) &&
    isCount(d.skillsTotal)
  )
}

function isSection(v: unknown): v is SatSectionResult {
  if (!v || typeof v !== 'object') return false
  const s = v as SatSectionResult
  return (
    isPct(s.pctRight) &&
    isCount(s.answers) &&
    isCount(s.skillsPracticed) &&
    isCount(s.skillsTotal) &&
    Array.isArray(s.domains) &&
    s.domains.every(isDomain)
  )
}

/**
 * Defensive parse of a stored 'sat' row's `recommendations` into a
 * SatResultsPayload. Returns null on anything it doesn't fully recognise, so the
 * card shows its empty state rather than crashing on a stale payload.
 *
 * ONLY schema version 2 is read. Version 1 rows carry projected SAT score ranges,
 * which PathwayEd no longer shows, so an old row reads as empty until the server
 * recomputes it (engine version 5 marks it stale on the next parent visit, and
 * scripts/recompute-readiness.ts rewrites every row at once).
 */
export function parseSatPayload(raw: Json | null | undefined): SatResultsPayload | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const p = raw as Record<string, unknown>
  if (p.schemaVersion !== SAT_SCHEMA_VERSION) return null // only the version we know
  const sections = p.sections as Record<string, unknown> | undefined
  if (!sections || !isSection(sections.math) || !isSection(sections['reading-writing'])) return null
  if (!isPct(p.overallPctRight) || !isCount(p.answers) || !isCount(p.skillsPracticed) || !isCount(p.skillsTotal)) {
    return null
  }
  const toPractice = Array.isArray(p.toPractice)
    ? (p.toPractice as SkillRef[]).filter((s) => s && typeof s.name === 'string' && typeof s.slug === 'string')
    : []
  return {
    schemaVersion: SAT_SCHEMA_VERSION,
    sections: sections as unknown as Record<SatSection, SatSectionResult>,
    overallPctRight: p.overallPctRight,
    answers: p.answers,
    skillsPracticed: p.skillsPracticed,
    skillsTotal: p.skillsTotal,
    toPractice,
    nextSkillSlug: typeof p.nextSkillSlug === 'string' ? p.nextSkillSlug : null,
  }
}

/**
 * Read-only fetch of the student's SAT results payload (the 'sat'
 * readiness_scores row's `recommendations`). Returns null when there is no row
 * or the payload is an unrecognised shape/version. Does NOT touch the pathway/
 * subject view or Today's Plan. Call after ensureFreshReadiness so it reflects
 * any just-written recompute.
 */
export async function getSatPayload(studentId: string): Promise<SatResultsPayload | null> {
  const { data, error } = await supabase
    .from('readiness_scores')
    .select('recommendations')
    .eq('student_id', studentId)
    .eq('readiness_type', 'sat')
    .maybeSingle()
  if (error) {
    console.error('SAT payload read failed', error)
    return null
  }
  return parseSatPayload(data?.recommendations)
}

export interface ReadinessFreshnessInput {
  /** Existing readiness rows for the student (any/all readiness_type). */
  readiness: { readiness_type: string; updated_at: string; engine_version: number }[]
  /** updated_at of every student_skill_mastery row for the student. */
  masteryUpdatedAt: string[]
  currentEngineVersion: number
}

/**
 * Pure staleness predicate. Readiness should be recomputed iff there is mastery
 * to compute from AND any of: (a) no readiness row exists, (b) some mastery row
 * is newer than the readiness, (c) the stored engine_version is behind the
 * current one, or (d) the SAT row is missing. Otherwise the stored readiness is
 * current — no write needed.
 */
export function isReadinessStale(input: ReadinessFreshnessInput): boolean {
  if (input.masteryUpdatedAt.length === 0) return false // nothing to compute from
  if (input.readiness.length === 0) return true // (a)
  if (input.readiness.some((r) => r.engine_version < input.currentEngineVersion)) return true // (c)
  // (d) SAT readiness was added after some students were last recomputed: a
  // student with mastery but no 'sat' row must recompute, independent of the
  // engine_version (those rows are already at the current version, so (c) won't
  // catch them). Self-heals existing students without another version bump.
  if (!input.readiness.some((r) => r.readiness_type === 'sat')) return true // (d)
  // (b) any mastery written after the readiness was last computed.
  const readinessTimes = input.readiness.map((r) => Date.parse(r.updated_at)).filter((n) => !Number.isNaN(n))
  const masteryTimes = input.masteryUpdatedAt.map((s) => Date.parse(s)).filter((n) => !Number.isNaN(n))
  if (!readinessTimes.length || !masteryTimes.length) return false
  return Math.max(...masteryTimes) > Math.min(...readinessTimes)
}

/**
 * Return the student's readiness, recomputing+upserting first ONLY if it's stale
 * (see isReadinessStale) — so readiness is current when viewed without writing on
 * every load. Best-effort: client-side under RLS; on any failure it falls back to
 * whatever is stored (or an empty view) and never throws.
 */
export async function ensureFreshReadiness(studentId: string): Promise<ReadinessView> {
  try {
    const [readinessRes, masteryRes] = await Promise.all([
      supabase
        .from('readiness_scores')
        // MUST include recommendations. When the stored rows turn out to be FRESH
        // these exact rows are returned to the view, and measuredSkills lives in
        // that column. Omitting it made every fresh row render as "not measured
        // yet" with its real score sitting unread in the same object.
        .select(
          'readiness_type, score, strengths, gaps, next_skill_slug, recommendations, updated_at, engine_version',
        )
        .eq('student_id', studentId),
      supabase.from('student_skill_mastery').select('updated_at').eq('student_id', studentId),
    ])
    // Never let an RLS denial look like "no data" — a read error is not the
    // same as an empty result (it's why mastery came back empty for a non-owner).
    if (readinessRes.error) console.error('readiness_scores read failed', readinessRes.error)
    if (masteryRes.error) console.error('student_skill_mastery read failed', masteryRes.error)
    // Either read failing means what we are about to show may be incomplete or
    // stale. Carry that to the view so the parent is told we could not look,
    // rather than being told there is nothing to see.
    const readFailed = !!readinessRes.error || !!masteryRes.error

    const readinessRows = readinessRes.data ?? []
    const masteryUpdatedAt = (masteryRes.data ?? []).map((m) => m.updated_at)
    const stale = isReadinessStale({
      readiness: readinessRows.map((r) => ({
        readiness_type: r.readiness_type,
        updated_at: r.updated_at,
        engine_version: r.engine_version,
      })),
      masteryUpdatedAt,
      currentEngineVersion: ENGINE_VERSION,
    })
    if (!stale) return buildReadinessView(readinessRows, readFailed)

    await refreshReadiness(studentId)
    const { data: fresh, error: freshError } = await supabase
      .from('readiness_scores')
      .select('readiness_type, score, strengths, gaps, next_skill_slug, recommendations')
      .eq('student_id', studentId)
    if (freshError) console.error('readiness_scores re-read failed', freshError)
    return buildReadinessView(fresh ?? readinessRows, readFailed || !!freshError)
  } catch (err) {
    console.error('ensureFreshReadiness failed', err)
    // Fall back to whatever is stored, but STILL report the failure. The stored
    // rows may be stale or absent precisely because the recompute threw, so a
    // successful fallback read must not be allowed to look like a clean load.
    const fallback = await getReadiness(studentId)
    return { ...fallback, loadFailed: true }
  }
}

type ScoreBand = 'strong' | 'growing' | 'getting-started' | 'just-beginning'
function scoreBand(s: number): ScoreBand {
  if (s >= 80) return 'strong'
  if (s >= 50) return 'growing'
  if (s >= 20) return 'getting-started'
  return 'just-beginning'
}

/** Human band label for a Pathway/readiness score (for the dashboards). */
export function pathwayBandLabel(score: number): string {
  switch (scoreBand(score)) {
    case 'strong':
      return 'Strong'
    case 'growing':
      return 'Growing'
    case 'getting-started':
      return 'Getting started'
    case 'just-beginning':
      return 'Just beginning'
  }
}

// Deterministic pick so the same data always yields the same message (no
// per-render flicker) while different students/states get varied phrasing.
function pick(templates: string[], seed: string): string {
  let h = 5381
  for (let i = 0; i < seed.length; i++) h = ((h << 5) + h + seed.charCodeAt(i)) >>> 0
  return templates[h % templates.length]
}

// Warm, varied, plain-text templates. NO emojis (matches the chat rule).
const COACH_TEMPLATES: Record<'none' | 'encourage' | 'focus' | 'celebrate', string[]> = {
  none: ["Start a practice session and I'll build a plan just for you."],
  encourage: [
    "You're just getting started, and every session makes you stronger. Let's keep going.",
    'Great start. A little practice each day adds up fast.',
    "You're on your way. One short session today keeps the momentum going.",
  ],
  focus: [
    "Let's give {skill} some attention next. A few focused minutes there will pay off.",
    '{skill} is the best thing to practice next. You can do this.',
    "Here's a tip: spend your next session on {skill} to level it up.",
  ],
  celebrate: [
    "You're doing great. {skill} is really strong. Keep it going with a quick session.",
    "Nice work. {skill} is one of your strengths. Let's build on it.",
    '{skill} is looking strong. A short session today will keep you sharp.',
  ],
}

/**
 * Pure, templated (NO-LLM) coach message from readiness. Picks a category —
 * celebrate a strength when the student is strong, focus on the weakest gap
 * when there's one to work on, otherwise encourage — and fills the skill name.
 */
export function buildCoachMessage(readiness: ReadinessView): string {
  const p = readiness.pathway
  if (!readiness.hasAny || !p) return pick(COACH_TEMPLATES.none, 'none')

  const band = scoreBand(p.score)
  let category: keyof typeof COACH_TEMPLATES = 'encourage'
  let skill = ''
  if (band === 'strong' && p.strengths.length) {
    category = 'celebrate'
    skill = p.strengths[0].name
  } else if (p.gaps.length) {
    category = 'focus'
    skill = p.gaps[0].name
  } else {
    category = 'encourage'
  }
  return pick(COACH_TEMPLATES[category], `${category}:${skill}:${p.score}`).replace('{skill}', skill)
}

export interface PlanItem {
  label: string
  /** Subject session to deep-link into (math | reading | writing). */
  subject: string
}

/**
 * Pure: a short ordered plan (2-4 items) from readiness — review the weakest
 * skill, practice the weakest subject, and build on a strength. Empty array when
 * there's no readiness data yet (the card shows an empty state). Labels are
 * deduped so items never repeat.
 */
export function buildTodaysPlan(readiness: ReadinessView): PlanItem[] {
  const p = readiness.pathway
  if (!readiness.hasAny || !p) return []

  const items: PlanItem[] = []
  const seen = new Set<string>()
  const push = (label: string, subject: string) => {
    if (!seen.has(label)) {
      seen.add(label)
      items.push({ label, subject })
    }
  }

  // 1) Review the highest-leverage weak skill.
  const gap = p.gaps[0]
  if (gap) push(`Review ${gap.name}`, gap.subject)

  // 2) Practice the weakest subject(s).
  const subjectsByScore = Object.entries(readiness.bySubject).sort((a, b) => a[1].score - b[1].score)
  for (const [subject] of subjectsByScore) {
    if (items.length >= 3) break
    push(`Practice ${subjectDisplayName(subject)}`, subject)
  }

  // 3) End on a strength.
  const strong = p.strengths[0]
  if (strong && items.length < 4) push(`Keep building ${strong.name}`, strong.subject)

  // Guarantee at least a couple of items when there's any data.
  if (items.length < 2) {
    const anySubject = Object.keys(readiness.bySubject)[0] ?? gap?.subject ?? strong?.subject
    if (anySubject) push(`Try a new skill in ${subjectDisplayName(anySubject)}`, anySubject)
  }

  return items.slice(0, 4)
}
