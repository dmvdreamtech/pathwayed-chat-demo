import { supabase } from '@/lib/supabase'
import type { WorkingGradeRaise } from '@/lib/gradeLadder'

/**
 * Ceiling detection — the write side of the grade ladder. Run after a practice
 * session records its result: if that session was the one that cleared the last
 * skill at the student's working grade in a subject, move them up a rung.
 *
 * THE DATABASE DECIDES. Working grade is a result, so since migration 0031 the
 * browser cannot write it. raise_working_grade_if_earned applies the same rule as
 * shouldRaiseWorkingGrade in gradeLadder.ts to the evidence the database computed
 * itself, and promotes by exactly one rung when it is earned.
 *
 * Deliberately called from the END of a session rather than from a trigger, so the
 * promotion lands on freshly recomputed evidence (recompute_skill_mastery runs on
 * every graded attempt insert) and a student sees the new rung on their next visit.
 *
 * Best-effort and non-blocking: a failure leaves the student where they are, and
 * the next completed session gets another chance.
 */
export async function checkAndRaiseWorkingGrade(student: { id: string }): Promise<WorkingGradeRaise | null> {
  try {
    const { data, error } = await supabase.rpc('raise_working_grade_if_earned', { p_student_id: student.id })
    if (error) {
      console.error('raise_working_grade_if_earned failed', { error, studentId: student.id })
      return null
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return null
    const r = data as Record<string, unknown>
    return { from: Number(r.from), to: Number(r.to), reason: String(r.reason ?? '') }
  } catch (err) {
    console.error('checkAndRaiseWorkingGrade threw', { err, studentId: student.id })
    return null
  }
}
