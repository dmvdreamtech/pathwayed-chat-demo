import { supabase } from '@/lib/supabase'
import { SAT_DOMAINS } from '@/lib/readinessEngine'
import { getPrepModule } from '@/lib/prep/registry'
import { subjectLabel } from '@/lib/staffProgress'

/**
 * The staff Test Scores tab: measured results only, counted by the database
 * (staff_student_test_scores, migration 0038), which answers only guidance,
 * admin and academic_dean at the student's school. Nothing here estimates,
 * projects or scales a score: every number is answers right out of answers
 * given, or the percent a timed section recorded.
 */

export interface ScoresPayload {
  working_grade: number | null
  placement: { subject: string; answered: number; right: number; first_at: string; last_at: string }[]
  timed: { module_id: string; section_id: string; status: string; pct: number; questions: number; at: string }[]
  sat_sections: { section: string; answered: number; right: number }[]
  sat_domains: { domain: string; section: string; answered: number; right: number }[]
  sat_skills_practiced: number
  sat_skills_total: number
}

export interface ScoreRow {
  label: string
  right: number
  answered: number
  pct: number
  date?: string
}

export interface TestScoresView {
  workingGrade: number | null
  placement: ScoreRow[]
  timed: { test: string; section: string; pct: number; questions: number; date: string; ranOut: boolean }[]
  satSections: ScoreRow[]
  satDomains: (ScoreRow & { section: string })[]
  satSkillsPracticed: number
  satSkillsTotal: number
  isEmpty: boolean
}

const SECTION_LABEL: Record<string, string> = { 'reading-writing': 'Reading and Writing', math: 'Math' }
const DOMAIN_LABEL = new Map(SAT_DOMAINS.map((d) => [d.token, d.label]))

export const pct = (right: number, answered: number) => (answered > 0 ? Math.round((right / answered) * 100) : 0)

const dateOf = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' })

function timedNames(moduleId: string, sectionId: string): { test: string; section: string } {
  const m = getPrepModule(moduleId as never)
  const s = m?.sections.find((x) => x.id === sectionId)
  return { test: m?.name ?? moduleId.toUpperCase(), section: s?.name ?? sectionId }
}

/** Pure: shape the database payload for the tab. */
export function buildTestScoresView(p: ScoresPayload): TestScoresView {
  const placement = p.placement.map((x) => ({
    label: subjectLabel(x.subject),
    right: x.right,
    answered: x.answered,
    pct: pct(x.right, x.answered),
    date: dateOf(x.last_at),
  }))
  const timed = p.timed.map((t) => ({
    ...timedNames(t.module_id, t.section_id),
    pct: t.pct,
    questions: t.questions,
    date: dateOf(t.at),
    ranOut: t.status === 'expired',
  }))
  const satSections = [...p.sat_sections]
    .sort((a, b) => (a.section === 'reading-writing' ? -1 : b.section === 'reading-writing' ? 1 : 0))
    .map((x) => ({ label: SECTION_LABEL[x.section] ?? x.section, right: x.right, answered: x.answered, pct: pct(x.right, x.answered) }))
  const order = new Map(SAT_DOMAINS.map((d, i) => [d.token, i]))
  const satDomains = [...p.sat_domains]
    .sort((a, b) => (order.get(a.domain) ?? 99) - (order.get(b.domain) ?? 99))
    .map((x) => ({
      label: DOMAIN_LABEL.get(x.domain) ?? x.domain,
      section: SECTION_LABEL[x.section] ?? x.section,
      right: x.right,
      answered: x.answered,
      pct: pct(x.right, x.answered),
    }))
  return {
    workingGrade: p.working_grade,
    placement,
    timed,
    satSections,
    satDomains,
    satSkillsPracticed: p.sat_skills_practiced,
    satSkillsTotal: p.sat_skills_total,
    isEmpty: placement.length === 0 && timed.length === 0 && satSections.length === 0,
  }
}

/** Whether the signed-in staff member may see scores at this school. */
export async function canViewTestScores(schoolId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('can_view_test_scores', { p_school_id: schoolId })
  if (error) {
    console.warn('[staff] can_view_test_scores failed', error.message)
    return false
  }
  return data === true
}

export async function loadTestScores(studentId: string): Promise<TestScoresView> {
  const { data, error } = await supabase.rpc('staff_student_test_scores', { p_student_id: studentId })
  if (error) throw error
  return buildTestScoresView(data as unknown as ScoresPayload)
}
