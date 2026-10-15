import { supabase } from '@/lib/supabase'

/**
 * /admin/coverage: K-12 Reading, Writing and Math coverage, counted live by
 * content_coverage() (migration 0040), which refuses anyone but a platform
 * admin. One row per skill the standards call for, built or not.
 *
 * A skill is COMPLETE when it exists and has at least its target (40)
 * published questions that a named reviewer approved.
 */

export type CoverageSubject = 'reading' | 'writing' | 'math'

export interface TargetRow {
  subject: CoverageSubject
  grade: number
  group: string
  name: string
  standards: string[]
  slugs: string[]
  sort: number
  target: number
  exists: boolean
  drafted: number
  checksPassing: number
  reviewed: number
  published: number
  publishedReviewed: number
}

export interface GradeSummary {
  grade: number
  label: string
  rows: TargetRow[]
  complete: number
  exists: number
}

export interface SubjectSummary {
  subject: CoverageSubject
  label: string
  grades: GradeSummary[]
  complete: number
  total: number
  counted: number
  needed: number
}

export interface Coverage {
  complete: number
  total: number
  /** Published and reviewed, each skill counted up to its target. */
  counted: number
  needed: number
  subjects: SubjectSummary[]
}

export const isComplete = (r: TargetRow) => r.exists && r.publishedReviewed >= r.target
export const gradeLabel = (g: number) => (g === 0 ? 'Kindergarten' : `Grade ${g}`)
const SUBJECTS: { subject: CoverageSubject; label: string }[] = [
  { subject: 'reading', label: 'Reading' },
  { subject: 'writing', label: 'Writing' },
  { subject: 'math', label: 'Math' },
]

/** Pure: group by subject and grade and add up. */
export function summarize(rows: TargetRow[]): Coverage {
  const counted = (rs: TargetRow[]) => rs.reduce((n, r) => n + Math.min(r.publishedReviewed, r.target), 0)
  const needed = (rs: TargetRow[]) => rs.reduce((n, r) => n + r.target, 0)
  const subjects = SUBJECTS.map(({ subject, label }) => {
    const mine = rows.filter((r) => r.subject === subject).sort((a, b) => a.sort - b.sort)
    const grades = [...new Set(mine.map((r) => r.grade))]
      .sort((a, b) => a - b)
      .map((g) => {
        const gr = mine.filter((r) => r.grade === g)
        return { grade: g, label: gradeLabel(g), rows: gr, complete: gr.filter(isComplete).length, exists: gr.filter((r) => r.exists).length }
      })
    return { subject, label, grades, complete: mine.filter(isComplete).length, total: mine.length, counted: counted(mine), needed: needed(mine) }
  })
  return {
    complete: rows.filter(isComplete).length,
    total: rows.length,
    counted: counted(rows),
    needed: needed(rows),
    subjects,
  }
}

const n = (x: number) => x.toLocaleString('en-US')

/** "12 of 455 skills complete. 480 of 18,200 questions published and reviewed." */
export function headline(c: { complete: number; total: number; counted: number; needed: number }): string {
  return `${c.complete} of ${n(c.total)} skills complete. ${n(c.counted)} of ${n(c.needed)} questions published and reviewed.`
}

/** What a row still needs, in plain words. */
export function rowStatus(r: TargetRow): string {
  if (isComplete(r)) return 'Complete'
  if (!r.exists) return 'Not built'
  if (r.drafted < r.target) return `${r.target - r.drafted} to draft`
  if (r.checksPassing < r.target) return `${r.target - r.checksPassing} failing checks`
  if (r.reviewed < r.target) return `${r.target - r.reviewed} to review`
  return `${r.target - r.publishedReviewed} to publish`
}

export type CoverageLoad = { ok: true; rows: TargetRow[] } | { ok: false; reason: 'not_admin' | 'failed' }

export async function loadCoverage(): Promise<CoverageLoad> {
  const { data, error } = await supabase.rpc('content_coverage')
  if (error) {
    const notAdmin = error.code === '42501' || /platform_admin_required|permission denied/i.test(error.message ?? '')
    if (!notAdmin) console.error('content_coverage failed', error)
    return { ok: false, reason: notAdmin ? 'not_admin' : 'failed' }
  }
  return {
    ok: true,
    rows: (data ?? []).map((r) => ({
      subject: r.subject as CoverageSubject,
      grade: r.grade,
      group: r.grp,
      name: r.name,
      standards: r.standards,
      slugs: r.skill_slugs,
      sort: r.sort,
      target: r.target,
      exists: r.skill_exists,
      drafted: r.drafted,
      checksPassing: r.checks_passing,
      reviewed: r.reviewed,
      published: r.published,
      publishedReviewed: r.published_reviewed,
    })),
  }
}
