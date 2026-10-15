import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/supabase', () => ({ supabase: {} }))

import { buildDashboardView, type DashboardPayload } from './staffDashboard'

const payload: DashboardPayload = {
  week_start: '2026-10-12',
  most_active: [
    { student_id: 'a', first_name: 'Ana', last_name: 'Lopez', days: 3, questions: 14 },
    { student_id: 'b', first_name: 'Ben', last_name: null, days: 1, questions: 1 },
  ],
  recent_wins: [
    { student_id: 'a', first_name: 'Ana', last_name: 'Lopez', skill: 'Fractions', level: 'mastered', at: '2026-10-13T15:00:00Z' },
    { student_id: 'b', first_name: 'Ben', last_name: null, skill: 'Main Idea', level: 'advanced', at: '2026-10-05T15:00:00Z' },
  ],
  stuck: [{ student_id: 'c', first_name: 'Cy', last_name: 'Ng', skill: 'Ratios', answered: 6, right: 2 }],
  snapshot: { active_this_week: 2, students: 84, mastered_this_month: 1 },
}

describe('staff dashboard view', () => {
  const v = buildDashboardView(payload)

  it('names the week it counts', () => {
    expect(v.weekLabel).toBe('This week, since Monday Oct 12')
  })

  it('most active: days and check questions, first and last name', () => {
    expect(v.mostActive.map((s) => [s.name, s.detail])).toEqual([
      ['Ana Lopez', '3 days active, 14 check questions'],
      ['Ben', '1 day active, 1 check question'],
    ])
  })

  it('recent wins: student, skill and the level reached, with the date', () => {
    expect(v.recentWins.map((w) => [w.name, w.skill, w.label, w.date])).toEqual([
      ['Ana Lopez', 'Fractions', 'Mastered', 'Oct 13'],
      ['Ben', 'Main Idea', 'Ready to move on', 'Oct 5'],
    ])
  })

  it('stuck: the measured count', () => {
    expect(v.stuck.map((s) => [s.name, s.skill, s.detail])).toEqual([['Cy Ng', 'Ratios', '2 of 6 right']])
  })

  it('snapshot lines', () => {
    expect(v.snapshot.activeLine).toBe('2 of 84 students active this week')
    expect(v.snapshot.masteredLine).toBe('1 skill mastered this month')
  })
})
