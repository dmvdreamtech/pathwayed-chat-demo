import { supabase } from '@/lib/supabase'

// Evidence-driven mastery read API. The AUTHORITATIVE computation lives in the
// Postgres function recompute_skill_mastery() (migration 0010), which recomputes
// from graded question_attempts on every graded attempt. This module only READS
// the stored result and derives one purely time-relative fact — whether a spaced
// re-check is now DUE — which must not require a recompute to become true.
//
// The two bars (mirrored here for callers/tests; the DB is the source of truth):
//   ADVANCE  — >= 70% over >= 5 graded, non-diagnostic attempts.
//   MASTERED — >= 85% over >= 8 quality attempts, held on a spaced re-check
//              (>= 3 days later, >= 2 further attempts, still >= 85%).

import type { MasteryStatus } from '@/lib/masteryStatus'
export type { MasteryStatus }

export const ADVANCE_MIN_ATTEMPTS = 5
export const ADVANCE_MIN_ACCURACY = 70
export const MASTERED_MIN_ATTEMPTS = 8
export const MASTERED_MIN_ACCURACY = 85
export const RECHECK_DELAY_DAYS = 3
export const RECHECK_MIN_ATTEMPTS = 2

const DAY_MS = 24 * 60 * 60 * 1000

export interface SkillMastery {
  skill_id: string
  status: MasteryStatus
  /** Accuracy over the counted (quality) evidence, or null when there is none. */
  accuracy: number | null
  /** Graded, non-diagnostic, not-too-fast attempts behind the claim. */
  attempts_counted: number
  first_bar_met_at: string | null
  recheck_passed_at: string | null
  /** The mastered bar was met but the spaced re-check is now due (path schedules it). */
  recheck_due: boolean
}

/**
 * A spaced re-check is DUE when the mastered accuracy/count bar was met, the
 * re-check has NOT yet passed, and at least RECHECK_DELAY_DAYS have elapsed since
 * the bar was first met. Time-relative, so it flips true on its own without a
 * recompute — callers derive it at read time.
 */
export function isRecheckDue(
  row: { first_bar_met_at: string | null; recheck_passed_at: string | null },
  now: Date = new Date(),
): boolean {
  if (!row.first_bar_met_at || row.recheck_passed_at) return false
  const dueAt = Date.parse(row.first_bar_met_at) + RECHECK_DELAY_DAYS * DAY_MS
  return !Number.isNaN(dueAt) && now.getTime() >= dueAt
}

/** Per-skill mastery for a student: status, accuracy, attempts counted, and
 *  whether a spaced re-check is due. RLS scopes the read to the parent's child. */
export async function getSkillMastery(studentId: string): Promise<SkillMastery[]> {
  const { data, error } = await supabase
    .from('student_skill_mastery')
    .select('skill_id, status, evidence_accuracy, attempts_counted, first_bar_met_at, recheck_passed_at')
    .eq('student_id', studentId)
  if (error) {
    console.error('getSkillMastery read failed', error)
    return []
  }
  return (data ?? []).map((r) => ({
    skill_id: r.skill_id,
    status: (r.status as MasteryStatus) ?? 'not_started',
    accuracy: r.evidence_accuracy == null ? null : Number(r.evidence_accuracy),
    attempts_counted: r.attempts_counted ?? 0,
    first_bar_met_at: r.first_bar_met_at,
    recheck_passed_at: r.recheck_passed_at,
    recheck_due: isRecheckDue(r),
  }))
}

/**
 * "What should this child re-check?" — skill_ids whose mastered bar was met but
 * whose spaced re-check has not happened yet and is now due. The learning path
 * uses this to schedule re-checks.
 */
export async function rechecksDue(studentId: string): Promise<Set<string>> {
  const rows = await getSkillMastery(studentId)
  return new Set(rows.filter((m) => m.recheck_due).map((m) => m.skill_id))
}
