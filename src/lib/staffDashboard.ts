import { supabase } from '@/lib/supabase'
import { staffDisplayName } from '@/lib/staffProgress'

/**
 * The /staff dashboard, counted by the database for the staff member's own
 * school (staff_dashboard, migration 0039). Measured results only.
 */

export interface DashboardPayload {
  week_start: string
  most_active: { student_id: string; first_name: string; last_name: string | null; days: number; questions: number }[]
  recent_wins: { student_id: string; first_name: string; last_name: string | null; skill: string; level: 'advanced' | 'mastered'; at: string }[]
  stuck: { student_id: string; first_name: string; last_name: string | null; skill: string; answered: number; right: number }[]
  snapshot: { active_this_week: number; students: number; mastered_this_month: number }
}

export interface DashboardView {
  weekLabel: string
  mostActive: { studentId: string; name: string; detail: string }[]
  recentWins: { studentId: string; name: string; skill: string; level: 'advanced' | 'mastered'; label: string; date: string }[]
  stuck: { studentId: string; name: string; skill: string; detail: string }[]
  snapshot: { activeLine: string; masteredLine: string; students: number }
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/New_York' })

/** Pure: shape the payload for the page. */
export function buildDashboardView(p: DashboardPayload): DashboardView {
  return {
    weekLabel: `This week, since Monday ${day(`${p.week_start}T12:00:00Z`)}`,
    mostActive: p.most_active.map((s) => ({
      studentId: s.student_id,
      name: staffDisplayName(s),
      detail: `${plural(s.days, 'day', 'days')} active, ${plural(s.questions, 'check question', 'check questions')}`,
    })),
    recentWins: p.recent_wins.map((w) => ({
      studentId: w.student_id,
      name: staffDisplayName(w),
      skill: w.skill,
      level: w.level,
      label: w.level === 'mastered' ? 'Mastered' : 'Ready to move on',
      date: day(w.at),
    })),
    stuck: p.stuck.map((s) => ({
      studentId: s.student_id,
      name: staffDisplayName(s),
      skill: s.skill,
      detail: `${s.right} of ${s.answered} right`,
    })),
    snapshot: {
      activeLine: `${p.snapshot.active_this_week} of ${plural(p.snapshot.students, 'student', 'students')} active this week`,
      masteredLine: `${plural(p.snapshot.mastered_this_month, 'skill', 'skills')} mastered this month`,
      students: p.snapshot.students,
    },
  }
}

export async function loadDashboard(): Promise<DashboardView> {
  const { data, error } = await supabase.rpc('staff_dashboard')
  if (error) throw error
  return buildDashboardView(data as unknown as DashboardPayload)
}
