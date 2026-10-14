import { describe, it, expect } from 'vitest'
import { SAT } from './sat'
import { HSPT } from './hspt'
import { ISEE } from './isee'
import { prepSkillFor, questionTypeLabel } from './prepSkills'
import { SAT_MATH_SKILLS, SAT_READING_SKILLS, SAT_WRITING_SKILLS } from '../practiceSat'

/**
 * The SAT module's interim stand-ins are grade 9+ skills (or the two authored SAT
 * prep skills), never the grade 3-8 banks it used to borrow. Data Analysis (grade
 * 6) is the one exception kept until the official Problem-Solving skills exist.
 * Grades are not in the code, so the expected slugs are pinned here; changing a
 * stand-in means checking its grade in the skills table and updating this list.
 */
const SAT_STAND_INS = new Set([
  'evidence-based-reading', // grade 9
  'prep-sat-words-in-context',
  'prep-sat-transitions',
  'advanced-punctuation', // grade 9
  'linear-equations', // grade 9
  'quadratic-functions', // grade 11
  'data-analysis', // grade 6, interim exception
  'similarity-right-triangles', // grade 10
])

const BELOW_LEVEL = ['main-idea', 'geometry', 'expressions', 'algebra-1-concepts']

describe('SAT module stand-ins', () => {
  const satSlugs = SAT.sections.flatMap((s) => s.questionTypes.map((t) => prepSkillFor(t)?.slug))

  it('maps every SAT question type to a pinned stand-in', () => {
    expect(satSlugs.every((s) => !!s && SAT_STAND_INS.has(s))).toBe(true)
  })

  it('no longer serves the grade 3 to 8 banks', () => {
    for (const slug of BELOW_LEVEL) expect(satSlugs).not.toContain(slug)
  })

  it('keeps HSPT and ISEE algebra on their own grade 6-8 skill', () => {
    const algebraIn = (sections: { questionTypes: string[] }[]) =>
      sections.flatMap((s) => s.questionTypes).filter((t) => t === 'algebra')
    expect(algebraIn(HSPT.sections).length + algebraIn(ISEE.sections).length).toBeGreaterThan(0)
    expect(prepSkillFor('algebra')?.slug).toBe('algebra-1-concepts')
    expect(prepSkillFor('sat_algebra')?.slug).toBe('linear-equations')
  })

  it('labels the SAT algebra type plainly', () => {
    expect(questionTypeLabel('sat_algebra')).toBe('Algebra')
  })
})

describe('Practice SAT page skills', () => {
  it('draws only from grade 9+ skills', () => {
    // Grades checked in the skills table on 2026-10-14.
    const GRADE_9_PLUS = new Set(['algebra-2', 'advanced-functions', 'hs-geometry', 'evidence-based-reading', 'advanced-punctuation'])
    for (const slug of [...SAT_MATH_SKILLS, ...SAT_READING_SKILLS, ...SAT_WRITING_SKILLS]) {
      expect(GRADE_9_PLUS.has(slug)).toBe(true)
    }
  })
})
