import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/supabase', () => ({ supabase: {} }))

import { headline, isComplete, rowStatus, summarize, type TargetRow } from './contentCoverage'

const row = (over: Partial<TargetRow> & { name: string }): TargetRow => ({
  subject: 'reading',
  grade: 8,
  group: 'Literature',
  standards: ['RL.8.2'],
  slugs: ['read-g8-x'],
  sort: 1,
  target: 40,
  exists: true,
  drafted: 0,
  checksPassing: 0,
  reviewed: 0,
  published: 0,
  publishedReviewed: 0,
  ...over,
})

describe('K-12 coverage', () => {
  const rows = [
    row({ name: 'Done', drafted: 45, checksPassing: 45, reviewed: 45, published: 45, publishedReviewed: 45, sort: 1 }),
    row({ name: 'Published not reviewed', drafted: 20, checksPassing: 20, published: 20, sort: 2 }),
    row({ name: 'Missing', exists: false, sort: 3, grade: 9 }),
    row({ name: 'Math one', subject: 'math', group: 'Geometry', drafted: 40, checksPassing: 38, sort: 4 }),
    row({ name: 'Writing one', subject: 'writing', group: 'Conventions', drafted: 40, checksPassing: 40, reviewed: 40, sort: 5 }),
  ]
  const c = summarize(rows)

  it('complete means 40 published and reviewed', () => {
    expect(rows.map(isComplete)).toEqual([true, false, false, false, false])
    expect(c.complete).toBe(1)
  })

  it('counts each skill up to its target', () => {
    expect([c.counted, c.needed]).toEqual([40, 200])
    expect(headline(c)).toBe('1 of 5 skills complete. 40 of 200 questions published and reviewed.')
  })

  it('groups by subject, then grade', () => {
    expect(c.subjects.map((s) => [s.label, s.total])).toEqual([
      ['Reading', 3],
      ['Writing', 1],
      ['Math', 1],
    ])
    expect(c.subjects[0].grades.map((g) => [g.label, g.rows.length, g.complete, g.exists])).toEqual([
      ['Grade 8', 2, 1, 2],
      ['Grade 9', 1, 0, 0],
    ])
  })

  it('says what each row still needs', () => {
    expect(rows.map(rowStatus)).toEqual(['Complete', '20 to draft', 'Not built', '2 failing checks', '40 to publish'])
  })

  it('formats the full catalog with separators', () => {
    expect(headline({ complete: 0, total: 455, counted: 0, needed: 18200 })).toBe(
      '0 of 455 skills complete. 0 of 18,200 questions published and reviewed.',
    )
  })
})
