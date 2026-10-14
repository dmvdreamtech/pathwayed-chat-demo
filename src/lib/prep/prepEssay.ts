import { supabase } from '@/lib/supabase'

/**
 * Client wrapper for the ISEE practice-essay engine. Like the timed-section engine
 * (timedSection.ts), the DATABASE owns time and transitions (migration 0018):
 * started_at is server now(), remaining time is computed server-side, submitted_at
 * is stamped only by prep_essay_finalize, and Nikki feedback is written only by the
 * server. This module orchestrates and renders; it never decides time.
 */

export interface EssayAttempt {
  id: string
  studentId: string
  promptId: string
  essayText: string
  nikkiFeedback: string | null
  startedAt: string | null
  submittedAt: string | null
  timeLimitSec: number | null
  /** Server-authoritative remaining seconds when the RPC provided it, else null. */
  remainingSeconds: number | null
}

interface RawEssay {
  id: string
  student_id: string
  prompt_id: string
  essay_text: string | null
  nikki_feedback: string | null
  started_at: string | null
  submitted_at: string | null
  time_limit_sec: number | null
  remaining_seconds?: number | null
}

function parseEssay(raw: RawEssay): EssayAttempt {
  return {
    id: raw.id,
    studentId: raw.student_id,
    promptId: raw.prompt_id,
    essayText: raw.essay_text ?? '',
    nikkiFeedback: raw.nikki_feedback ?? null,
    startedAt: raw.started_at ?? null,
    submittedAt: raw.submitted_at ?? null,
    timeLimitSec: raw.time_limit_sec ?? null,
    remainingSeconds: typeof raw.remaining_seconds === 'number' ? raw.remaining_seconds : null,
  }
}

/** Start the essay, or resume the in-progress one. On resume the server returns the
 *  existing attempt (same started_at, same prompt); the passed promptId is used only
 *  when creating a fresh attempt. The time limit comes from the server's section
 *  settings (migration 0033), never from the browser. */
export async function startOrResumeEssay(
  studentId: string,
  moduleId: string,
  promptId: string,
): Promise<EssayAttempt> {
  const { data, error } = await supabase.rpc('prep_essay_start', {
    p_student_id: studentId,
    p_module_id: moduleId,
    p_prompt_id: promptId,
  })
  if (error || !data) throw new Error('Could not start the essay')
  return parseEssay(data as unknown as RawEssay)
}

/** Authoritative remaining seconds from the server (for the countdown re-sync). */
export async function getEssayRemaining(attemptId: string): Promise<number | null> {
  const { data, error } = await supabase.rpc('prep_essay_remaining_seconds', { p_attempt_id: attemptId })
  if (error) return null
  return typeof data === 'number' ? data : null
}

/** Autosave the draft. The guard rejects writes once submitted or past the window,
 *  so a false return means "not saved" (out of time / already ended). */
export async function saveEssayDraft(attemptId: string, essayText: string): Promise<boolean> {
  const { error } = await supabase.from('prep_essay_attempts').update({ essay_text: essayText }).eq('id', attemptId)
  if (error) {
    console.warn('prep essay saveDraft rejected:', error.message)
    return false
  }
  return true
}

/** Finalize (stamp submitted_at + store the final draft), server-side. Idempotent. */
export async function finalizeEssay(attemptId: string, essayText: string): Promise<EssayAttempt> {
  const { data, error } = await supabase.rpc('prep_essay_finalize', {
    p_attempt_id: attemptId,
    p_essay_text: essayText,
    p_client_expired: false,
  })
  if (error || !data) throw new Error('Could not finalize the essay')
  return parseEssay(data as unknown as RawEssay)
}

/** Read one essay attempt (for the review screen / resume decision). */
export async function getEssayAttempt(attemptId: string): Promise<EssayAttempt | null> {
  const { data, error } = await supabase.from('prep_essay_attempts').select('*').eq('id', attemptId).maybeSingle()
  if (error || !data) return null
  return parseEssay(data as unknown as RawEssay)
}

/** The in-progress essay for a student, if any (there is at most one — 0018 index). */
export async function findInProgressEssay(studentId: string): Promise<EssayAttempt | null> {
  const { data, error } = await supabase
    .from('prep_essay_attempts')
    .select('*')
    .eq('student_id', studentId)
    .is('submitted_at', null)
    .maybeSingle()
  if (error || !data) return null
  return parseEssay(data as unknown as RawEssay)
}

/** Past essays for a student, newest first (history + used-prompt bookkeeping). */
export async function listEssayAttempts(studentId: string): Promise<EssayAttempt[]> {
  const { data, error } = await supabase
    .from('prep_essay_attempts')
    .select('*')
    .eq('student_id', studentId)
    .order('started_at', { ascending: false })
  if (error || !data) return []
  return data.map((r) => parseEssay(r as unknown as RawEssay))
}

/**
 * Ask the server to generate Nikki's feedback for a finalized essay and store it.
 * The essay text never leaves via the client for grading — the endpoint reads it
 * under the caller's RLS, calls Claude with the server-held key, and writes
 * nikki_feedback. Returns the feedback text, or null on failure.
 */
export async function requestEssayFeedback(attemptId: string): Promise<string | null> {
  const { data: sessionData } = await supabase.auth.getSession()
  const token = sessionData.session?.access_token
  if (!token) return null
  try {
    const res = await fetch('/api/prep-essay-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ attemptId }),
    })
    if (!res.ok) return null
    const body = (await res.json()) as { feedback?: string }
    return body.feedback ?? null
  } catch {
    return null
  }
}
