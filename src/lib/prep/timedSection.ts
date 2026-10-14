import { supabase } from '@/lib/supabase'
import { fetchQuestionsByIds, type PracticeQuestion } from '@/lib/questions'
import type { PrepModule, PrepSection } from '@/lib/prep/types'

/**
 * Client wrapper for the timed-section engine. The DATABASE owns time, transitions
 * and scoring (migration 0016): started_at is server now(), remaining time and
 * expiry are computed server-side, and score is graded from the bank in the
 * finalize RPC. Since migration 0033 the database also picks the questions and the
 * time limit (prep_section_config), and the answer keys reach the browser only in
 * the review of a finished section. This module only orchestrates and renders.
 */

/** Fewest questions a timed section will run with; below this we show a friendly
 *  "not enough questions yet" state rather than a stub test. */
export const MIN_QUESTIONS = 5

export interface PrepAttempt {
  id: string
  studentId: string
  moduleId: string
  sectionId: string
  mode: string
  status: 'in_progress' | 'submitted' | 'expired'
  startedAt: string | null
  submittedAt: string | null
  timeLimitSec: number | null
  questionIds: string[]
  /** questionId -> chosen choice index (into the fetched choice order). */
  answers: Record<string, number>
  score: number | null
  /** Server-authoritative remaining seconds when the RPC provided it, else null. */
  remainingSeconds: number | null
}

interface RawAttempt {
  id: string
  student_id: string
  module_id: string
  section_id: string
  mode: string
  status: string
  started_at: string | null
  submitted_at: string | null
  time_limit_sec: number | null
  question_ids: unknown
  answers: unknown
  score: number | string | null
  remaining_seconds?: number | null
}

function parseAttempt(raw: RawAttempt): PrepAttempt {
  const answers =
    raw.answers && typeof raw.answers === 'object' && !Array.isArray(raw.answers)
      ? (raw.answers as Record<string, number>)
      : {}
  return {
    id: raw.id,
    studentId: raw.student_id,
    moduleId: raw.module_id,
    sectionId: raw.section_id,
    mode: raw.mode,
    status: raw.status as PrepAttempt['status'],
    startedAt: raw.started_at ?? null,
    submittedAt: raw.submitted_at ?? null,
    timeLimitSec: raw.time_limit_sec ?? null,
    questionIds: Array.isArray(raw.question_ids) ? (raw.question_ids as string[]) : [],
    answers,
    score: raw.score != null ? Number(raw.score) : null,
    remainingSeconds: typeof raw.remaining_seconds === 'number' ? raw.remaining_seconds : null,
  }
}

export interface StartResult {
  attempt: PrepAttempt
  questions: PracticeQuestion[]
}

/**
 * Start a timed section, or resume the in-progress attempt for it. The SERVER
 * picks the questions and the time limit and freezes them at creation; on resume
 * it returns the original attempt and we reload its frozen questions (without
 * keys). Returns { notEnough } when the bank can't supply MIN_QUESTIONS.
 */
export async function startOrResumeSection(
  studentId: string,
  module: PrepModule,
  section: PrepSection,
): Promise<StartResult | { notEnough: true; available: number }> {
  const { data, error } = await supabase.rpc('prep_start_section', {
    p_student_id: studentId,
    p_module_id: module.id,
    p_section_id: section.id,
  })
  if (error) {
    const short = /prep_not_enough_questions: (\d+)/.exec(error.message ?? '')
    if (short) return { notEnough: true, available: Number(short[1]) }
    throw new Error('Could not start the section')
  }
  if (!data) throw new Error('Could not start the section')
  const attempt = parseAttempt(data as unknown as RawAttempt)
  const questions = await fetchQuestionsByIds(attempt.questionIds)
  return { attempt, questions }
}

/** Authoritative remaining seconds from the server (for the countdown's periodic
 *  re-sync). Returns null if it can't be read. */
export async function getRemaining(attemptId: string): Promise<number | null> {
  const { data, error } = await supabase.rpc('prep_remaining_seconds', { p_attempt_id: attemptId })
  if (error) return null
  return typeof data === 'number' ? data : null
}

/**
 * Persist the full answers map. The guard trigger rejects writes once the attempt
 * is finalized or past its window, so a false return means "not saved" (out of
 * time / already ended), never a silent success.
 */
export async function saveAnswers(attemptId: string, answers: Record<string, number>): Promise<boolean> {
  const { error } = await supabase.from('prep_attempts').update({ answers }).eq('id', attemptId)
  if (error) {
    console.warn('prep saveAnswers rejected:', error.message)
    return false
  }
  return true
}

/** Finalize (submit or expire) and score, server-side. Idempotent. */
export async function finalizeAttempt(attemptId: string, clientExpired: boolean): Promise<PrepAttempt> {
  const { data, error } = await supabase.rpc('prep_finalize_attempt', {
    p_attempt_id: attemptId,
    p_client_expired: clientExpired,
  })
  if (error || !data) throw new Error('Could not finalize the attempt')
  return parseAttempt(data as unknown as RawAttempt)
}

/** Find the in-progress attempt for a section, if any, without creating one (so the
 *  pre-start screen can decide whether to resume straight into the test). */
export async function findInProgressAttempt(
  studentId: string,
  moduleId: string,
  sectionId: string,
): Promise<PrepAttempt | null> {
  const { data, error } = await supabase
    .from('prep_attempts')
    .select('*')
    .eq('student_id', studentId)
    .eq('module_id', moduleId)
    .eq('section_id', sectionId)
    .eq('status', 'in_progress')
    .maybeSingle()
  if (error || !data) return null
  return parseAttempt(data as unknown as RawAttempt)
}

/** One question's key, from the review of a finished section. */
export interface ReviewKey {
  correctIndex: number | null
  correctAnswer: string | null
  solution: string | null
  /** Each choice's misconception token, by choice index (null for the right one). */
  tokens: (string | null)[]
}

/** Pure: read prep_attempt_review's keys into a map by question id. */
export function parseReviewKeys(raw: unknown): Map<string, ReviewKey> {
  const out = new Map<string, ReviewKey>()
  const keys = raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, unknown>).keys : null
  if (!Array.isArray(keys)) return out
  for (const k of keys) {
    if (!k || typeof k !== 'object' || Array.isArray(k)) continue
    const r = k as Record<string, unknown>
    if (typeof r.question_id !== 'string') continue
    out.set(r.question_id, {
      correctIndex: typeof r.correct_index === 'number' ? r.correct_index : null,
      correctAnswer: typeof r.correct_answer === 'string' ? r.correct_answer : null,
      solution: typeof r.solution === 'string' ? r.solution : null,
      tokens: Array.isArray(r.tokens) ? r.tokens.map((t) => (typeof t === 'string' ? t : null)) : [],
    })
  }
  return out
}

/**
 * The answer keys for a FINISHED section, from the server. The server refuses
 * while the section is still running, and for anyone but the student's family.
 */
export async function getReviewKeys(attemptId: string): Promise<Map<string, ReviewKey> | null> {
  const { data, error } = await supabase.rpc('prep_attempt_review', { p_attempt_id: attemptId })
  if (error || !data) return null
  return parseReviewKeys(data)
}

/** Read one attempt (for the review screen). */
export async function getAttempt(attemptId: string): Promise<PrepAttempt | null> {
  const { data, error } = await supabase.from('prep_attempts').select('*').eq('id', attemptId).maybeSingle()
  if (error || !data) return null
  return parseAttempt(data as unknown as RawAttempt)
}

/** Past attempts for a module, newest first (for the Test tab's history list). */
export async function listAttempts(studentId: string, moduleId: string): Promise<PrepAttempt[]> {
  const { data, error } = await supabase
    .from('prep_attempts')
    .select('*')
    .eq('student_id', studentId)
    .eq('module_id', moduleId)
    .order('started_at', { ascending: false })
  if (error || !data) return []
  return data.map((r) => parseAttempt(r as unknown as RawAttempt))
}
