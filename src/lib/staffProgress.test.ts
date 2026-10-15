import { describe, it, expect } from 'vitest'
import {
  buildActivity,
  buildCards,
  buildSubjectGroups,
  formatDateKey,
  formatLastActive,
  formatMinutes,
  localDateKey,
  quietLine,
  staffDisplayName,
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
  ['sat-wic', { id: 'sat-wic', name: 'SAT Words in Context', subject: 'prep-sat-rw' }],
  ['hspt-syn', { id: 'hspt-syn', name: 'Synonyms', subject: 'prep-verbal' }],
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

  it('tags carry their status, so each wears the one badge color for that status', () => {
    expect(cards.workingOn.map((c) => c.tagStatus)).toEqual(['advanced', null])
    expect(cards.recentWins.map((c) => c.tagStatus)).toEqual(['mastered', 'advanced'])
  })

  it('is empty for a student with no activity', () => {
    expect(buildCards([], [], skills, NOW)).toEqual({ workingOn: [], stuckOn: [], recentWins: [] })
  })
})

describe('buildSubjectGroups', () => {
  const groups = buildSubjectGroups(mastery, attempts, skills)

  it('returns Reading, Writing, Math and Test prep in that order', () => {
    expect(groups.map((g) => g.label)).toEqual(['Reading', 'Writing', 'Math', 'Test prep'])
  })

  it('Test prep gathers every prep subject, HSPT, ISEE and SAT alike', () => {
    const prep: MasteryRow[] = [
      { skill_id: 'sat-wic', status: 'practicing', advanced_at: null, recheck_passed_at: null },
      { skill_id: 'hspt-syn', status: 'advanced', advanced_at: daysAgo(2), recheck_passed_at: null },
    ]
    const box = buildSubjectGroups(prep, [], skills)[3]
    expect(box.skills.map((s) => s.skillName)).toEqual(['Synonyms', 'SAT Words in Context'])
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

describe('buildActivity with tutoring sessions', () => {
  const session = (subject: string, d: number) => ({
    subject,
    started_at: daysAgo(d + 30),
    ended_at: daysAgo(d),
    updated_at: daysAgo(d),
  })

  it('shows what a student worked on when they answered no check questions', () => {
    const out = buildActivity([], skills, [session('math', 1), session('reading', 3)])
    expect(out.map((g) => [g.dateKey, g.subject, g.kind])).toEqual([
      ['2026-10-13', 'math', 'session'],
      ['2026-10-11', 'reading', 'session'],
    ])
  })

  it('does not add a session row where check questions already show that day and subject', () => {
    const out = buildActivity(answers('lin', 2, 1, daysAgo(1)), skills, [session('math', 1)])
    expect(out.map((g) => [g.subject, g.kind, g.total])).toEqual([['math', 'checks', 3]])
  })
})

describe('quietLine', () => {
  it('says not active only when the last activity is over 14 days old', () => {
    expect(quietLine(daysAgo(20), NOW)).toBe('Not active in the last 14 days. Last active Sep 24.')
  })
  it('says no check questions when the student was in a session recently', () => {
    expect(quietLine(daysAgo(3), NOW)).toBe('No check questions in the last 14 days. Last active Oct 11.')
  })
  it('handles a student who never started', () => {
    expect(quietLine(null, NOW)).toBe('No tutoring activity yet.')
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

describe('staffDisplayName', () => {
  it('shows first and last name, or the first name alone', () => {
    expect(staffDisplayName({ first_name: 'Ana', last_name: 'Lopez' })).toBe('Ana Lopez')
    expect(staffDisplayName({ first_name: 'Ana', last_name: null })).toBe('Ana')
    expect(staffDisplayName({ first_name: 'Ana', last_name: ' ' })).toBe('Ana')
  })
})
