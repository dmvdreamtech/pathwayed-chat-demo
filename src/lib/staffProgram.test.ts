import { describe, it, expect, vi } from 'vitest'

const query = vi.hoisted(() => ({ select: '' }))
vi.mock('@/lib/questions', () => ({ listPracticeableSkills: async () => [] }))
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: (cols: string) => {
        query.select = cols
        return { in: async () => ({ data: [], error: null }) }
      },
    }),
  },
}))

import { LEVELS, NIKKI_HOW, buildProgramView, loadProgram, type CatalogRow } from './staffProgram'

const row = (over: Partial<CatalogRow> & { id: string; name: string; subject: string }): CatalogRow => ({
  level: 'skill',
  parent_id: null,
  ccss_grade_num: null,
  sat_skill_code: null,
  ...over,
})

const rows: CatalogRow[] = [
  row({ id: 'm1', name: 'Fractions', subject: 'math', ccss_grade_num: 4 }),
  row({ id: 'm2', name: 'Area', subject: 'math', ccss_grade_num: 4 }),
  row({ id: 'm3', name: 'Counting', subject: 'math', ccss_grade_num: 0 }),
  row({ id: 'r1', name: 'Main Idea', subject: 'reading', ccss_grade_num: 3 }),
  row({ id: 'd-ei', name: 'Expression of Ideas', subject: 'prep-sat-rw', level: 'domain' }),
  row({ id: 'd-al', name: 'Algebra', subject: 'prep-sat-math', level: 'domain' }),
  row({ id: 's1', name: 'SAT Transitions', subject: 'prep-sat-rw', parent_id: 'd-ei', sat_skill_code: 'transitions' }),
  row({ id: 's2', name: 'SAT Linear functions', subject: 'prep-sat-math', parent_id: 'd-al', sat_skill_code: 'linear-functions' }),
  row({ id: 'x', name: 'A math domain row', subject: 'math', level: 'domain' }),
]

describe('program guide', () => {
  const v = buildProgramView(rows)

  it('Reading, Writing and Math by grade, Kindergarten first, skills only', () => {
    const math = v.core.find((s) => s.subject === 'math')!
    expect(math.grades.map((g) => [g.label, g.skills])).toEqual([
      ['Kindergarten', ['Counting']],
      ['Grade 4', ['Area', 'Fractions']],
    ])
    expect(math.total).toBe(3)
    expect(v.core.map((s) => s.label)).toEqual(['Reading', 'Writing', 'Math'])
    expect(v.core.find((s) => s.subject === 'writing')!.grades).toEqual([])
  })

  it('SAT: official skills under their domains, Reading and Writing first', () => {
    expect(v.sat).toEqual([
      { section: 'Reading and Writing', domains: [{ name: 'Expression of Ideas', skills: ['Transitions'] }] },
      { section: 'Math', domains: [{ name: 'Algebra', skills: ['Linear functions'] }] },
    ])
    expect([v.satSkillCount, v.satDomainCount]).toEqual([2, 2])
  })

  it('HSPT and ISEE, each with a description and their timed sections', () => {
    expect(v.otherTests.map((t) => t.name)).toEqual(['HSPT', 'ISEE'])
    for (const t of v.otherTests) {
      expect(t.description.length).toBeGreaterThan(20)
      expect(t.sections.length).toBeGreaterThan(0)
    }
  })

  it('the levels use the engine numbers', () => {
    expect(LEVELS.map((l) => l.label)).toEqual(['Practicing', 'Ready to move on', 'Mastered'])
    expect(LEVELS[1].text).toContain('70% right over at least 5')
    expect(LEVELS[2].text).toContain('85% right over at least 8')
    expect(LEVELS[2].text).toContain('at least 3 days later')
  })

  it('hides Reading, Writing and Math skills with no published questions yet', () => {
    const live = new Set(['m1', 'r1'])
    const v2 = buildProgramView(rows, live)
    expect(v2.core.find((s) => s.subject === 'math')!.grades.map((g) => g.skills)).toEqual([['Fractions']])
    expect(v2.core.find((s) => s.subject === 'reading')!.total).toBe(1)
    // SAT still lists every official skill.
    expect(v2.satSkillCount).toBe(2)
  })

  it('Nikki is two sentences', () => {
    expect(NIKKI_HOW.split(/(?<=\.)\s+/).length).toBe(2)
  })

  it('reads skill names only: never descriptions, questions or answers', async () => {
    await loadProgram()
    expect(query.select).toBe('id, level, parent_id, subject, name, ccss_grade_num, sat_skill_code')
    expect(query.select).not.toMatch(/description|question|answer|choice|solution/)
  })
})
