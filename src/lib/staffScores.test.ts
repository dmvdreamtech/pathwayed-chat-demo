import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/supabase', () => ({ supabase: {} }))

import { buildTestScoresView, pct, type ScoresPayload } from './staffScores'

const payload: ScoresPayload = {
  working_grade: 9,
  placement: [
    { subject: 'math', answered: 12, right: 9, first_at: '2026-09-02T14:00:00Z', last_at: '2026-09-02T14:20:00Z' },
    { subject: 'reading', answered: 10, right: 7, first_at: '2026-09-03T14:00:00Z', last_at: '2026-09-03T14:15:00Z' },
  ],
  timed: [
    { module_id: 'hspt', section_id: 'verbal-skills', status: 'submitted', pct: 75, questions: 60, at: '2026-10-08T15:00:00Z' },
    { module_id: 'sat', section_id: 'math-1', status: 'expired', pct: 41, questions: 22, at: '2026-10-01T15:00:00Z' },
  ],
  sat_sections: [
    { section: 'math', answered: 20, right: 15 },
    { section: 'reading-writing', answered: 8, right: 4 },
  ],
  sat_domains: [
    { domain: 'geometry-trigonometry', section: 'math', answered: 5, right: 5 },
    { domain: 'algebra', section: 'math', answered: 15, right: 10 },
    { domain: 'expression-of-ideas', section: 'reading-writing', answered: 8, right: 4 },
  ],
  sat_skills_practiced: 3,
  sat_skills_total: 30,
}

describe('Test Scores tab, measured only', () => {
  const v = buildTestScoresView(payload)

  it('placement: right out of answered, by subject, with the date taken', () => {
    expect(v.placement.map((p) => [p.label, `${p.right} of ${p.answered}`, p.pct, p.date])).toEqual([
      ['Math', '9 of 12', 75, 'Sep 2, 2026'],
      ['Reading', '7 of 10', 70, 'Sep 3, 2026'],
    ])
    expect(v.workingGrade).toBe(9)
  })

  it('timed sections: the test and section names, percent right, date, and when time ran out', () => {
    expect(v.timed.map((t) => [t.test, t.section, t.pct, t.questions, t.date, t.ranOut])).toEqual([
      ['HSPT', expect.any(String), 75, 60, 'Oct 8, 2026', false],
      ['SAT', 'Math, Module 1', 41, 22, 'Oct 1, 2026', true],
    ])
  })

  it('SAT practice: Reading and Writing first, domains in test order, skills of 30', () => {
    expect(v.satSections.map((s) => [s.label, s.pct])).toEqual([
      ['Reading and Writing', 50],
      ['Math', 75],
    ])
    expect(v.satDomains.map((d) => [d.label, d.section, d.pct])).toEqual([
      ['Algebra', 'Math', 67],
      ['Geometry & Trigonometry', 'Math', 100],
      ['Expression of Ideas', 'Reading and Writing', 50],
    ])
    expect([v.satSkillsPracticed, v.satSkillsTotal]).toEqual([3, 30])
  })

  it('a student with nothing yet', () => {
    const e = buildTestScoresView({ ...payload, placement: [], timed: [], sat_sections: [], sat_domains: [], sat_skills_practiced: 0 })
    expect(e.isEmpty).toBe(true)
  })

  it('never divides by zero', () => {
    expect(pct(0, 0)).toBe(0)
    expect(pct(2, 3)).toBe(67)
  })
})
