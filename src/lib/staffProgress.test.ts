import { describe, it, expect } from 'vitest'
import {
  buildActivity,
  buildCards,
  buildSubjectGroups,
  formatDateKey,
  formatLastActive,
  formatMinutes,
  localDateKey,
  type AttemptRow,
  type MasteryRow,
  type SkillInfo,
} from '@/lib/staffProgress'

const NOW = new Date('2026-10-14T16:00:00Z') // noon in New York

const daysAgo = (d: number, hourUtc = 16) => {
  const t = new Date(NOW.getTime() - d * 86_400_000)
  t.setUTCHours(hourUtc, 0, 0, 0)
  return t.toISOString()
}

const skills = new Map<string, SkillInfo>([
  ['lin', { id: 'lin', name: 'Linear equations', subject: 'math' }],
  ['frac', { id: 'frac', name: 'Fractions', subject: 'math' }],
  ['main', { id: 'main', name: 'Main idea', subject: 'reading' }],
  ['punc', { id: 'punc', name: 'Punctuation', subject: 'writing' }],
  ['old', { id: 'old', name: 'Old skill', subject: 'math' }],
  ['seed', { id: 'seed', name: 'Placed only', subject: 'reading' }],
])

function answers(skill: string, right: number, wrong: number, at: string, timeMs: number | null = 30_000): AttemptRow[] {
  return [
    ...Array.from({ length: right }, () => ({ skill_id: skill, is_correct: true, time_ms: timeMs, created_at: at })),
    ...Array.from({ length: wrong }, () => ({ skill_id: skill, is_correct: false, time_ms: timeMs, created_at: at })),
  ]
}

const mastery: MasteryRow[] = [
  { skill_id: 'lin', status: 'advanced', advanced_at: daysAgo(3), recheck_passed_at: null },
  { skill_id: 'frac', status: 'practicing', advanced_at: null, recheck_passed_at: null },
  { skill_id: 'main', status: 'mastered', advanced_at: daysAgo(60), recheck_passed_at: daysAgo(2) },
  { skill_id: 'punc', status: 'practicing', advanced_at: null, recheck_passed_at: null },
  { skill_id: 'old', status: 'advanced', advanced_at: daysAgo(45), recheck_passed_at: null },
  { skill_id: 'seed', status: 'not_started', advanced_at: null, recheck_passed_at: null },
]

const attempts: AttemptRow[] = [
  ...answers('lin', 6, 2, daysAgo(1)),
  ...answers('frac', 4, 7, daysAgo(2)), // 11 answers, under 70%: stuck
  ...answers('main', 9, 1, daysAgo(2)),
  ...answers('punc', 1, 2, daysAgo(5)), // 3 answers: practicing, not stuck yet
  ...answers('old', 5, 0, daysAgo(40)),
]

describe('buildCards', () => {
  const cards = buildCards(mastery, attempts, skills, NOW)

  it('stuck on: practicing with 5 or more answers, showing the measured count', () => {
    expect(cards.stuckOn.map((c) => [c.skillName, c.detail])).toEqual([['Fractions', '4 of 11 right']])
  })

  it('working on: recent, not mastered, not stuck, most recent first', () => {
    expect(cards.workingOn.map((c) => [c.skillName, c.detail, c.tag])).toEqual([
      ['Linear equations', '6 of 8 right', 'Ready to move on'],
      ['Punctuation', '1 of 3 right', null],
    ])
  })

  it('working on: leaves out skills not practiced in the last 14 days', () => {
    expect(cards.workingOn.find((c) => c.skillId === 'old')).toBeUndefined()
  })

  it('recent wins: mastered preferred over ready to move on, last 30 days only', () => {
    expect(cards.recentWins.map((c) => [c.skillName, c.tag])).toEqual([
      ['Main idea', 'Mastered'],
      ['Linear equations', 'Ready to move on'],
    ])
  })

  it('recent wins: a skill that slipped back to practicing is not a win', () => {
    const slipped: MasteryRow[] = [{ skill_id: 'frac', status: 'practicing', advanced_at: daysAgo(5), recheck_passed_at: null }]
    expect(buildCards(slipped, attempts, skills, NOW).recentWins).toEqual([])
  })

  it('is empty for a student with no activity', () => {
    expect(buildCards([], [], skills, NOW)).toEqual({ workingOn: [], stuckOn: [], recentWins: [] })
  })
})

describe('buildSubjectGroups', () => {
  const groups = buildSubjectGroups(mastery, attempts, skills)

  it('returns Reading, Writing, Math in that order', () => {
    expect(groups.map((g) => g.label)).toEqual(['Reading', 'Writing', 'Math'])
  })

  it('lists practiced skills strongest first and counts placed-only skills', () => {
    const reading = groups[0]
    expect(reading.skills.map((s) => [s.skillName, s.statusLabel, s.detail])).toEqual([
      ['Main idea', 'Mastered', '9 of 10 right'],
    ])
    expect(reading.notStarted).toBe(1)
    const math = groups[2]
    expect(math.skills.map((s) => s.statusLabel)).toEqual(['Ready to move on', 'Ready to move on', 'Practicing'])
  })
})

describe('buildActivity', () => {
  it('groups by school-local day and subject, newest first, capped at 10', () => {
    const many: AttemptRow[] = Array.from({ length: 12 }, (_, i) => answers('lin', 1, 0, daysAgo(i))).flat()
    const out = buildActivity(many, skills)
    expect(out).toHaveLength(10)
    expect(out[0].dateKey).toBe('2026-10-14')
  })

  it('uses the New York calendar day, not UTC', () => {
    // 02:00 UTC on Oct 14 is 22:00 on Oct 13 in New York.
    expect(localDateKey('2026-10-14T02:00:00Z')).toBe('2026-10-13')
  })

  it('sums measured answer time, caps one answer at 5 minutes, and reports untimed as null', () => {
    const rows: AttemptRow[] = [
      { skill_id: 'main', is_correct: true, time_ms: 60_000, created_at: daysAgo(0) },
      { skill_id: 'main', is_correct: false, time_ms: 3_600_000, created_at: daysAgo(0) },
      { skill_id: 'punc', is_correct: true, time_ms: null, created_at: daysAgo(0) },
    ]
    const out = buildActivity(rows, skills)
    const reading = out.find((g) => g.subject === 'reading')!
    expect([reading.right, reading.total, reading.timeMs]).toEqual([1, 2, 6 * 60_000])
    expect(out.find((g) => g.subject === 'writing')!.timeMs).toBeNull()
  })
})

describe('formatting', () => {
  it('formats minutes', () => {
    expect(formatMinutes(20_000)).toBe('Under 1 min')
    expect(formatMinutes(12 * 60_000)).toBe('12 min')
    expect(formatMinutes(65 * 60_000)).toBe('1 hr 5 min')
    expect(formatMinutes(120 * 60_000)).toBe('2 hr')
  })

  it('formats a date key', () => {
    expect(formatDateKey('2026-10-14')).toBe('Wed, Oct 14')
  })

  it('formats last active in school-local days', () => {
    expect(formatLastActive(null, NOW)).toBe('No tutoring activity yet')
    expect(formatLastActive(daysAgo(0), NOW)).toBe('Today')
    expect(formatLastActive(daysAgo(1), NOW)).toBe('Yesterday')
    expect(formatLastActive(daysAgo(3), NOW)).toBe('3 days ago')
    expect(formatLastActive(daysAgo(10), NOW)).toBe('Oct 4')
  })
})
