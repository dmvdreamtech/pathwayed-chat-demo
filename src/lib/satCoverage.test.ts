import { describe, it, expect } from 'vitest'
import { coverageHeadline, isComplete, summarizeCoverage, type CoverageRow } from './satCoverage'

const row = (over: Partial<CoverageRow> & { code: string; domain: string; sort: number }): CoverageRow => ({
  name: over.code,
  section: 'reading-writing',
  target: 40,
  skillId: 'skill-' + over.code,
  skillSlug: 'prep-sat-' + over.code,
  drafted: 0,
  checksPassing: 0,
  reviewed: 0,
  published: 0,
  ...over,
})

describe('SAT coverage summary', () => {
  const rows: CoverageRow[] = [
    row({ code: 'words-in-context', domain: 'craft-and-structure', sort: 5, published: 48, drafted: 48 }),
    row({ code: 'transitions', domain: 'expression-of-ideas', sort: 9, published: 40 }),
    row({ code: 'boundaries', domain: 'standard-english-conventions', sort: 10, published: 12 }),
    row({ code: 'circles', domain: 'geometry-trigonometry', section: 'math', target: 60, sort: 30, published: 75 }),
    row({ code: 'percentages', domain: 'problem-solving-data-analysis', section: 'math', target: 60, sort: 21, skillId: null, skillSlug: null }),
  ]
  const s = summarizeCoverage(rows)

  it('complete means the skill exists and published reaches the target', () => {
    expect(rows.map(isComplete)).toEqual([true, true, false, true, false])
    expect(s.complete).toBe(3)
  })

  it('counts published toward targets, each skill up to its target', () => {
    // 40 + 40 + 12 + 60 + 0, of 40 + 40 + 40 + 60 + 60.
    expect(s.publishedTowardTarget).toBe(152)
    expect(s.targetTotal).toBe(240)
    expect(coverageHeadline(s)).toBe('3 of 5 skills complete. 152 of 240 questions published.')
  })

  it('groups by all 8 domains, Reading and Writing first', () => {
    expect(s.domains).toHaveLength(8)
    expect(s.domains.slice(0, 4).every((d) => d.section === 'reading-writing')).toBe(true)
    expect(s.domains.find((d) => d.token === 'geometry-trigonometry')?.complete).toBe(1)
    expect(s.domains.find((d) => d.token === 'information-and-ideas')?.rows).toEqual([])
  })

  it('formats large totals with separators, as the full catalog will be', () => {
    expect(coverageHeadline({ ...s, complete: 2, totalSkills: 30, publishedTowardTarget: 96, targetTotal: 1580 })).toBe(
      '2 of 30 skills complete. 96 of 1,580 questions published.',
    )
  })
})
