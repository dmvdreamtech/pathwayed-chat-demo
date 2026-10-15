import { supabase } from '@/lib/supabase'
import { PREP_MODULES } from '@/lib/prep/registry'
import { listPracticeableSkills } from '@/lib/questions'
import {
  ADVANCE_MIN_ACCURACY,
  ADVANCE_MIN_ATTEMPTS,
  MASTERED_MIN_ACCURACY,
  MASTERED_MIN_ATTEMPTS,
  RECHECK_DELAY_DAYS,
} from '@/lib/mastery'

/**
 * /staff/program, "What students learn": the live skills catalog, read only.
 * Skill names and grades come from public.skills (readable by any signed-in
 * user); the page never reads questions, answers or skill descriptions.
 */

export interface CatalogRow {
  id: string
  level: string
  parent_id: string | null
  subject: string
  name: string
  ccss_grade_num: number | null
  sat_skill_code: string | null
}

export interface GradeGroup {
  grade: number
  label: string
  skills: string[]
}

export interface ProgramView {
  core: { subject: string; label: string; grades: GradeGroup[]; total: number }[]
  sat: { section: string; domains: { name: string; skills: string[] }[] }[]
  satSkillCount: number
  satDomainCount: number
  otherTests: { name: string; description: string; sections: string[] }[]
}

const CORE = [
  { subject: 'reading', label: 'Reading' },
  { subject: 'writing', label: 'Writing' },
  { subject: 'math', label: 'Math' },
]

export const gradeName = (n: number) => (n === 0 ? 'Kindergarten' : `Grade ${n}`)

/** One line on each admissions test, for staff. */
export const TEST_DESCRIPTIONS: Record<string, string> = {
  SAT: 'The college admissions test: Reading and Writing, and Math, each in two timed modules.',
  HSPT: 'The High School Placement Test many Catholic high schools use for admission and placement.',
  ISEE: 'The Independent School Entrance Exam used by many independent and private schools, with an essay.',
}

/** "SAT Boundaries" reads as "Boundaries" under an SAT heading. */
const satName = (name: string) => name.replace(/^SAT\s+/, '')

/** Pure: group the catalog for the page. */
export function buildProgramView(rows: CatalogRow[], live?: Set<string>): ProgramView {
  const skills = rows.filter((r) => r.level === 'skill')
  const core = CORE.map(({ subject, label }) => {
    // Only skills students can practice now (at least one published question).
    // A new skill whose questions are still drafts is not shown yet.
    const mine = skills.filter((r) => r.subject === subject && r.ccss_grade_num !== null && (!live || live.has(r.id)))
    const grades = [...new Set(mine.map((r) => r.ccss_grade_num as number))].sort((a, b) => a - b)
    return {
      subject,
      label,
      total: mine.length,
      grades: grades.map((g) => ({
        grade: g,
        label: gradeName(g),
        skills: mine.filter((r) => r.ccss_grade_num === g).map((r) => r.name).sort((a, b) => a.localeCompare(b)),
      })),
    }
  })

  const byId = new Map(rows.map((r) => [r.id, r]))
  const official = skills.filter((r) => r.sat_skill_code)
  const sections = [
    { subject: 'prep-sat-rw', section: 'Reading and Writing' },
    { subject: 'prep-sat-math', section: 'Math' },
  ]
  const sat = sections.map(({ subject, section }) => {
    const domains = new Map<string, string[]>()
    for (const s of official.filter((r) => r.subject === subject)) {
      const domain = (s.parent_id && byId.get(s.parent_id)?.name) || 'Other'
      domains.set(domain, [...(domains.get(domain) ?? []), satName(s.name)])
    }
    return {
      section,
      domains: [...domains]
        .map(([name, list]) => ({ name, skills: list.sort((a, b) => a.localeCompare(b)) }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    }
  })

  return {
    core,
    sat,
    satSkillCount: official.length,
    satDomainCount: sat.reduce((n, s) => n + s.domains.length, 0),
    otherTests: PREP_MODULES.filter((m) => m.id !== 'sat').map((m) => ({
      name: m.name,
      description: TEST_DESCRIPTIONS[m.name] ?? '',
      sections: m.sections.map((s) => s.name),
    })),
  }
}

/** How a skill moves between levels, from the same numbers the engine uses. */
export const LEVELS = [
  {
    label: 'Practicing',
    text: 'The student is working on the skill. Every skill starts here, and stays here until the student shows it.',
  },
  {
    label: 'Ready to move on',
    text: `At least ${ADVANCE_MIN_ACCURACY}% right over at least ${ADVANCE_MIN_ATTEMPTS} graded check questions. The student can go on to the next skill.`,
  },
  {
    label: 'Mastered',
    text:
      `At least ${MASTERED_MIN_ACCURACY}% right over at least ${MASTERED_MIN_ATTEMPTS} graded check questions, ` +
      `then a short recheck passed at least ${RECHECK_DELAY_DAYS} days later, so the skill has stuck.`,
  },
]

export const NIKKI_HOW =
  'Nikki is the AI tutor students talk with by typing or speaking. She explains one step at a time, asks the student to try ' +
  'each step, and checks understanding with short graded questions that move a skill through the levels above.'

export async function loadProgram(): Promise<ProgramView> {
  const [{ data, error }, practiceable] = await Promise.all([
    supabase
      .from('skills')
      .select('id, level, parent_id, subject, name, ccss_grade_num, sat_skill_code')
      .in('subject', ['reading', 'writing', 'math', 'prep-sat-rw', 'prep-sat-math']),
    listPracticeableSkills(),
  ])
  if (error) throw error
  // If the practiceable read fails it returns []; show the full catalog then
  // rather than an empty page.
  const live = practiceable.length ? new Set(practiceable.map((p) => p.skill_id)) : undefined
  return buildProgramView((data ?? []) as CatalogRow[], live)
}
