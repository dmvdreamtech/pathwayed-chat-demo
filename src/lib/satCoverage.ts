import { supabase } from '@/lib/supabase'
import { SAT_DOMAINS, type SatSection } from '@/lib/readinessEngine'

/**
 * The SAT coverage report (/admin/sat-coverage), counted live from the database
 * by sat_coverage() (migration 0034), which refuses anyone but a platform admin.
 *
 * Per official College Board skill: whether the skill exists, how many questions
 * are drafted, pass the automated checks, have been reviewed, and are published,
 * against the target (Math 60, Reading and Writing 40). A skill is COMPLETE when
 * it exists and its published questions reach the target.
 */

export interface CoverageRow {
  code: string
  name: string
  section: SatSection
  domain: string
  sort: number
  target: number
  skillId: string | null
  skillSlug: string | null
  drafted: number
  checksPassing: number
  reviewed: number
  published: number
}

export interface CoverageDomain {
  token: string
  label: string
  section: SatSection
  rows: CoverageRow[]
  complete: number
}

export interface CoverageSummary {
  /** Skills that exist and have published at or above their target. */
  complete: number
  totalSkills: number
  /** Published questions counted toward targets: each skill counts up to its target. */
  publishedTowardTarget: number
  /** The sum of every skill's target. */
  targetTotal: number
  domains: CoverageDomain[]
}

export function isComplete(r: CoverageRow): boolean {
  return r.skillId !== null && r.published >= r.target
}

/** Pure: group the rows by SAT domain, in test order, and add up the totals. */
export function summarizeCoverage(rows: CoverageRow[]): CoverageSummary {
  const sorted = [...rows].sort((a, b) => a.sort - b.sort)
  const domains: CoverageDomain[] = SAT_DOMAINS.map((d) => {
    const dr = sorted.filter((r) => r.domain === d.token)
    return { token: d.token, label: d.label, section: d.section, rows: dr, complete: dr.filter(isComplete).length }
  })
  // Reading and Writing first, as on the test.
  domains.sort((a, b) => (a.section === b.section ? 0 : a.section === 'reading-writing' ? -1 : 1))
  return {
    complete: sorted.filter(isComplete).length,
    totalSkills: sorted.length,
    publishedTowardTarget: sorted.reduce((n, r) => n + Math.min(r.published, r.target), 0),
    targetTotal: sorted.reduce((n, r) => n + r.target, 0),
    domains,
  }
}

/** "12 of 30 skills complete. 480 of 1,580 questions published." */
export function coverageHeadline(s: CoverageSummary): string {
  const n = (x: number) => x.toLocaleString('en-US')
  return `${s.complete} of ${s.totalSkills} skills complete. ${n(s.publishedTowardTarget)} of ${n(s.targetTotal)} questions published.`
}

export type CoverageLoad = { ok: true; rows: CoverageRow[] } | { ok: false; reason: 'not_admin' | 'failed' }

export async function loadSatCoverage(): Promise<CoverageLoad> {
  const { data, error } = await supabase.rpc('sat_coverage')
  if (error) {
    const notAdmin = /platform_admin_required|permission denied/i.test(error.message ?? '')
    if (!notAdmin) console.error('sat_coverage failed', error)
    return { ok: false, reason: notAdmin ? 'not_admin' : 'failed' }
  }
  return {
    ok: true,
    rows: (data ?? []).map((r) => ({
      code: r.code,
      name: r.name,
      section: (r.section === 'math' ? 'math' : 'reading-writing') as SatSection,
      domain: r.domain,
      sort: r.sort,
      target: r.target,
      skillId: r.skill_id,
      skillSlug: r.skill_slug,
      drafted: r.drafted,
      checksPassing: r.checks_passing,
      reviewed: r.reviewed,
      published: r.published,
    })),
  }
}
