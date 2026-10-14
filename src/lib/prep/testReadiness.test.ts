import { describe, expect, it } from 'vitest'
import { HSPT } from './hspt'
import { ISEE } from './isee'
import type { PrepAttemptLite } from './prepProgress'
import {
  BAND_SOLID_MIN,
  BAND_STRONG_MIN,
  HISTORY_LIMIT,
  HSPT_COMPOSITES,
  ISEE_PERCENTILE_STANINE,
  ISEE_SCORED_SECTION_IDS,
  bandFor,
  buildHistory,
  buildModuleReadiness,
  practiceDisclosure,
  scaleReferenceFor,
  type HistoryAttemptInput,
} from './testReadiness'

const A = (
  sectionId: string,
  score: number | null,
  startedAt: string,
  status: 'submitted' | 'expired' = 'submitted',
): PrepAttemptLite => ({ sectionId, status, score, startedAt })

const H = (
  id: string,
  moduleId: string,
  sectionId: string,
  status: HistoryAttemptInput['status'],
  score: number | null,
  submittedAt: string | null,
): HistoryAttemptInput => ({
  id,
  moduleId,
  sectionId,
  mode: 'timed_section',
  status,
  score,
  startedAt: submittedAt,
  submittedAt,
})

describe('bandFor', () => {
  it('splits at the named thresholds', () => {
    expect(bandFor(BAND_STRONG_MIN)).toBe('Strong')
    expect(bandFor(BAND_STRONG_MIN - 1)).toBe('Solid')
    expect(bandFor(BAND_SOLID_MIN)).toBe('Solid')
    expect(bandFor(BAND_SOLID_MIN - 1)).toBe('Developing')
    expect(bandFor(0)).toBe('Developing')
    expect(bandFor(100)).toBe('Strong')
  })
})

describe('buildModuleReadiness', () => {
  it('reports the most recent submitted percent and the submitted attempt count', () => {
    const m = buildModuleReadiness(
      HSPT,
      [A('reading', 0.4, '2026-01-01T00:00:00Z'), A('reading', 0.9, '2026-02-01T00:00:00Z')],
      HSPT_COMPOSITES,
    )
    const reading = m.sections.find((s) => s.sectionId === 'reading')
    expect(reading?.percent).toBe(90)
    expect(reading?.attempts).toBe(2)
    expect(reading?.band).toBe('Strong')
    expect(m.hasResults).toBe(true)
  })

  it('excludes expired attempts from percents, counts and bands', () => {
    const m = buildModuleReadiness(
      HSPT,
      [A('reading', 0.8, '2026-01-01T00:00:00Z'), A('reading', 0.1, '2026-02-01T00:00:00Z', 'expired')],
      HSPT_COMPOSITES,
    )
    const reading = m.sections.find((s) => s.sectionId === 'reading')
    expect(reading?.percent).toBe(80) // the expired later run does not overwrite it
    expect(reading?.attempts).toBe(1)
  })

  it('marks a section with no submitted attempt as not yet attempted', () => {
    const m = buildModuleReadiness(HSPT, [A('reading', 0.8, '2026-01-01T00:00:00Z')], HSPT_COMPOSITES)
    const math = m.sections.find((s) => s.sectionId === 'mathematics')
    expect(math?.notAttempted).toBe(true)
    expect(math?.percent).toBeNull()
    expect(math?.band).toBeNull()
  })

  it('averages full composites and leaves them not partial', () => {
    const m = buildModuleReadiness(
      HSPT,
      [A('verbal-skills', 0.6, '2026-01-01T00:00:00Z'), A('quantitative-skills', 0.8, '2026-01-02T00:00:00Z')],
      HSPT_COMPOSITES,
    )
    const cognitive = m.composites.find((c) => c.id === 'total-cognitive-skills')
    expect(cognitive?.percent).toBe(70)
    expect(cognitive?.partial).toBe(false)
    expect(cognitive?.band).toBe('Solid')
  })

  it('excludes missing sections from a composite and labels it partial', () => {
    const m = buildModuleReadiness(
      HSPT,
      [A('reading', 0.9, '2026-01-01T00:00:00Z'), A('mathematics', 0.7, '2026-01-02T00:00:00Z')],
      HSPT_COMPOSITES,
    )
    const basic = m.composites.find((c) => c.id === 'total-basic-skills')
    expect(basic?.percent).toBe(80) // mean of the two present, Language dropped
    expect(basic?.partial).toBe(true)
    expect(basic?.missing).toEqual(['Language'])

    const battery = m.composites.find((c) => c.id === 'battery-composite')
    expect(battery?.partial).toBe(true)
    expect(battery?.missing).toHaveLength(3)
  })

  it('gives a composite no percent when none of its sections are attempted', () => {
    const m = buildModuleReadiness(HSPT, [A('reading', 0.9, '2026-01-01T00:00:00Z')], HSPT_COMPOSITES)
    const cognitive = m.composites.find((c) => c.id === 'total-cognitive-skills')
    expect(cognitive?.percent).toBeNull()
    expect(cognitive?.partial).toBe(true)
  })

  it('lists the four scored ISEE sections and never the essay', () => {
    const m = buildModuleReadiness(ISEE, [], [], ISEE_SCORED_SECTION_IDS)
    expect(m.sections.map((s) => s.sectionId)).toEqual(ISEE_SCORED_SECTION_IDS)
    expect(m.sections.some((s) => s.sectionId === 'essay')).toBe(false)
    expect(m.composites).toHaveLength(0)
    expect(m.hasResults).toBe(false)
  })
})

describe('buildHistory', () => {
  const modules = [HSPT, ISEE]

  it('sorts most recent first and keeps expired rows without a percent', () => {
    const rows = buildHistory(
      [
        H('a', 'hspt', 'reading', 'submitted', 0.75, '2026-01-01T00:00:00Z'),
        H('b', 'hspt', 'mathematics', 'expired', 0.2, '2026-03-01T00:00:00Z'),
      ],
      [],
      modules,
    )
    expect(rows.map((r) => r.key)).toEqual(['attempt:b', 'attempt:a'])
    expect(rows[0].incomplete).toBe(true)
    expect(rows[0].percent).toBeNull()
    expect(rows[1].percent).toBe(75)
    expect(rows[1].mode).toBe('Timed section')
  })

  it('drops in-progress attempts and unsubmitted essays', () => {
    const rows = buildHistory(
      [H('a', 'hspt', 'reading', 'in_progress', null, null)],
      [{ id: 'e1', startedAt: '2026-01-01T00:00:00Z', submittedAt: null, hasFeedback: false }],
      modules,
    )
    expect(rows).toHaveLength(0)
  })

  it('shows a submitted essay with no percent and its feedback state', () => {
    const rows = buildHistory(
      [],
      [{ id: 'e1', startedAt: '2026-01-01T00:00:00Z', submittedAt: '2026-01-01T00:30:00Z', hasFeedback: true }],
      modules,
    )
    expect(rows).toHaveLength(1)
    expect(rows[0].kind).toBe('essay')
    expect(rows[0].percent).toBeNull()
    expect(rows[0].essayHasFeedback).toBe(true)
    expect(rows[0].moduleName).toBe('ISEE')
  })

  it('caps the list at HISTORY_LIMIT', () => {
    const many = Array.from({ length: HISTORY_LIMIT + 5 }, (_, i) =>
      H(`a${i}`, 'hspt', 'reading', 'submitted', 0.5, `2026-01-${String(i + 1).padStart(2, '0')}T00:00:00Z`),
    )
    expect(buildHistory(many, [], modules)).toHaveLength(HISTORY_LIMIT)
  })
})

describe('ISEE percentile to stanine reference', () => {
  it('is the published nine-band table, contiguous from 1 to 99', () => {
    expect(ISEE_PERCENTILE_STANINE.map((r) => r.stanine)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(ISEE_PERCENTILE_STANINE.map((r) => r.percentile)).toEqual([
      '1-3',
      '4-10',
      '11-22',
      '23-39',
      '40-59',
      '60-76',
      '77-88',
      '89-95',
      '96-99',
    ])
  })
})

/**
 * The disclosure names tests, and naming a test the student cannot sit is how a
 * 9-12 student ended up reading about Scholastic Testing Service and ERB. These
 * guard both halves: irrelevant tests stay out, and every branch still says
 * someone else produces the official score.
 */
describe('practiceDisclosure', () => {
  it('names HSPT, ISEE and their publishers for a 6-8 student', () => {
    const text = practiceDisclosure(['hspt', 'isee'])
    expect(text).toBe(
      'Practice performance on PathwayEd questions. Official HSPT and ISEE scaled scores are produced by Scholastic Testing Service and ERB using their own national norming data.',
    )
  })

  it('never names HSPT, ISEE, STS or ERB for a SAT-only student', () => {
    const text = practiceDisclosure(['sat'])
    for (const word of ['HSPT', 'ISEE', 'Scholastic Testing Service', 'ERB']) {
      expect(text).not.toContain(word)
    }
  })

  it('still disclaims for SAT: practice results only, and the College Board owns the real score', () => {
    const text = practiceDisclosure(['sat'])
    expect(text).toContain('Practice performance on PathwayEd questions.')
    expect(text).toContain('Official SAT scores come only from the College Board.')
    expect(text).toContain('never an SAT score')
    expect(text).not.toMatch(/estimate|range/i)
  })

  it('uses singular agreement when only one norm-referenced test applies', () => {
    expect(practiceDisclosure(['isee'])).toContain('produced by ERB using its own national norming data')
    expect(practiceDisclosure(['isee'])).not.toContain('HSPT')
  })

  it('covers every test present, e.g. a transfer carrying HSPT results into grade 9', () => {
    const text = practiceDisclosure(['hspt', 'sat'])
    expect(text).toContain('Scholastic Testing Service')
    expect(text).toContain('College Board')
    expect(text).not.toContain('ERB')
  })

  it('keeps the practice claim even when no test applies', () => {
    expect(practiceDisclosure([])).toBe('Practice performance on PathwayEd questions.')
  })
})

describe('scaleReferenceFor', () => {
  it('returns only the tests the student has, in card order', () => {
    expect(scaleReferenceFor(['sat']).map((r) => r.test)).toEqual(['SAT'])
    expect(scaleReferenceFor(['isee', 'hspt']).map((r) => r.test)).toEqual(['HSPT', 'ISEE'])
    expect(scaleReferenceFor([])).toEqual([])
  })
})
