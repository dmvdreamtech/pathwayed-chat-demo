import { describe, expect, it } from 'vitest'
import { computePrepProgress } from './prepProgress'
import type { PrepModule } from './types'
import type { PracticeEvidence, PrepAttemptLite } from './prepProgress'

/** Practice evidence: % right over `answers` counted answers (10 by default). */
const ev = (accuracy: number, answers = 10): PracticeEvidence => ({ accuracy, answers })

// A tiny module with two timed sections whose types resolve to real prep slugs.
const MODULE: PrepModule = {
  id: 'hspt',
  name: 'HSPT',
  gradeBand: [6, 8],
  sections: [
    { id: 'verbal-skills', name: 'Verbal Skills', questionCount: 10, timeLimitSec: 600, questionTypes: ['synonyms', 'antonyms'] },
    { id: 'quantitative-skills', name: 'Quantitative Skills', questionCount: 10, timeLimitSec: 600, questionTypes: ['number_series'] },
  ],
  fullTestComposition: ['verbal-skills', 'quantitative-skills'],
}

const A = (sectionId: string, score: number, startedAt: string, status: 'submitted' | 'expired' = 'submitted'): PrepAttemptLite => ({
  sectionId,
  status,
  score,
  startedAt,
})

describe('computePrepProgress', () => {
  it('empty state: no attempts, no practice results', () => {
    const p = computePrepProgress(MODULE, [], new Map())
    expect(p.hasAttempts).toBe(false)
    expect(p.sections).toEqual([])
    expect(p.weakestTypes).toEqual([])
    expect(p.practicePctRight).toBeNull()
    expect(p.practiceAnswers).toBe(0)
    expect(p.coveredSkillCount).toBe(0)
    expect(p.coveredSubjects).toEqual([])
  })

  it('practice % right + coverage for a not-yet-entitled child (no timed attempts)', () => {
    // No attempts (unentitled child can't take timed sections), only practice mastery.
    const acc = new Map<string, PracticeEvidence | null>([
      ['prep-synonyms', ev(40)], // reading
      ['prep-antonyms', ev(50)], // reading
      ['prep-number-series', ev(60)], // math
    ])
    const p = computePrepProgress(MODULE, [], acc)
    expect(p.hasAttempts).toBe(false)
    expect(p.practicePctRight).toBe(50) // 15 of 30 answers right
    expect(p.practiceAnswers).toBe(30)
    expect(p.coveredSkillCount).toBe(3)
    expect(p.coveredSubjects).toEqual(['math', 'reading']) // stable order, writing->language absent here
  })

  it('per-section trend + personal best from timed scores', () => {
    const attempts = [
      A('verbal-skills', 0.5, '2026-07-01T10:00:00Z'),
      A('verbal-skills', 0.8, '2026-07-05T10:00:00Z'),
      A('quantitative-skills', 0.6, '2026-07-03T10:00:00Z'),
    ]
    const p = computePrepProgress(MODULE, attempts, new Map())
    expect(p.hasAttempts).toBe(true)
    // Most-recent activity first: verbal last attempt (Jul 5) beats quant (Jul 3).
    expect(p.sections[0].sectionId).toBe('verbal-skills')
    const verbal = p.sections.find((s) => s.sectionId === 'verbal-skills')!
    expect(verbal.latestScore).toBe(80)
    expect(verbal.priorScore).toBe(50)
    expect(verbal.bestScore).toBe(80)
    expect(verbal.isBest).toBe(true)
    expect(verbal.trend).toBe('up')
    const quant = p.sections.find((s) => s.sectionId === 'quantitative-skills')!
    expect(quant.trend).toBeNull() // single attempt
    expect(quant.isBest).toBe(false) // needs >=2 attempts to be a "best"
  })

  it('a later dip is not a personal best and trends down', () => {
    const attempts = [A('verbal-skills', 0.9, '2026-07-01T10:00:00Z'), A('verbal-skills', 0.7, '2026-07-02T10:00:00Z')]
    const p = computePrepProgress(MODULE, attempts, new Map())
    const verbal = p.sections[0]
    expect(verbal.latestScore).toBe(70)
    expect(verbal.bestScore).toBe(90)
    expect(verbal.isBest).toBe(false)
    expect(verbal.trend).toBe('down')
  })

  it('weakest types come from practice mastery, lowest first, deduped by skill', () => {
    // synonyms->prep-synonyms, antonyms->prep-antonyms, number_series->prep-number-series
    const acc = new Map<string, PracticeEvidence | null>([
      ['prep-synonyms', ev(82)],
      ['prep-antonyms', ev(40)],
      ['prep-number-series', ev(65)],
    ])
    const p = computePrepProgress(MODULE, [], acc)
    expect(p.weakestTypes.map((t) => t.slug)).toEqual(['prep-antonyms', 'prep-number-series', 'prep-synonyms'])
    expect(p.weakestTypes[0].accuracy).toBe(40)
    expect(p.weakestTypes[0].label).toBe('Antonyms')
  })

  it('does not send a student back to a skill they have cleared', () => {
    // The production shape: the prep tile kept offering a skill the student was
    // already 'advanced' on, because nothing here knew.
    const acc = new Map<string, PracticeEvidence | null>([
      ['prep-synonyms', ev(82)],
      ['prep-antonyms', ev(40)],
      ['prep-number-series', ev(65)],
    ])
    const p = computePrepProgress(MODULE, [], acc, new Set(['prep-antonyms']))
    expect(p.weakestTypes.map((t) => t.slug)).toEqual(['prep-number-series', 'prep-synonyms'])
  })

  it('leaves % right and coverage untouched when a skill is cleared', () => {
    // The guard is presentational: it must not move the prep engine's numbers.
    const acc = new Map<string, PracticeEvidence | null>([
      ['prep-synonyms', ev(82)],
      ['prep-antonyms', ev(40)],
      ['prep-number-series', ev(65)],
    ])
    const plain = computePrepProgress(MODULE, [], acc)
    const guarded = computePrepProgress(MODULE, [], acc, new Set(['prep-antonyms']))
    expect(guarded.practicePctRight).toBe(plain.practicePctRight)
    expect(guarded.practiceAnswers).toBe(plain.practiceAnswers)
    expect(guarded.coveredSkillCount).toBe(plain.coveredSkillCount)
    expect(guarded.coveredSubjects).toEqual(plain.coveredSubjects)
  })

  it('offers nothing rather than a cleared skill when everything is cleared', () => {
    const acc = new Map<string, PracticeEvidence | null>([['prep-synonyms', ev(82)], ['prep-antonyms', ev(40)]])
    const p = computePrepProgress(MODULE, [], acc, new Set(['prep-synonyms', 'prep-antonyms']))
    expect(p.weakestTypes).toEqual([])
    expect(p.coveredSkillCount).toBe(2)
  })

  it('types without graded evidence are excluded', () => {
    const acc = new Map<string, PracticeEvidence | null>([['prep-synonyms', ev(70)], ['prep-antonyms', null]])
    const p = computePrepProgress(MODULE, [], acc)
    expect(p.weakestTypes.map((t) => t.slug)).toEqual(['prep-synonyms'])
  })

  it('% right pools answers across skills instead of averaging skill percents', () => {
    // 9 of 10 right on one skill, 1 of 2 on another: 10 of 12 overall, not mean(90, 50).
    const acc = new Map<string, PracticeEvidence | null>([['prep-synonyms', ev(90, 10)], ['prep-antonyms', ev(50, 2)]])
    const p = computePrepProgress(MODULE, [], acc)
    expect(p.practicePctRight).toBe(83)
    expect(p.practiceAnswers).toBe(12)
  })

  it('timed sections never blend into the practice % right', () => {
    const acc = new Map<string, PracticeEvidence | null>([['prep-synonyms', ev(90)]])
    const p = computePrepProgress(MODULE, [A('verbal-skills', 0.5, '2026-07-05T10:00:00Z')], acc)
    expect(p.practicePctRight).toBe(90)
    expect(p.sections[0].latestScore).toBe(50)
  })
})
