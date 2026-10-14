import { useCallback, useEffect, useRef, useState } from 'react'
import type { Student } from '@/lib/students'
import { recordQuestionAttempt, scoreChoice, type PracticeQuestion } from '@/lib/questions'
import { explainMisconception } from '@/lib/misconceptions'
import { fetchCheckQuestion, shouldServeCheck, type CheckTrigger } from '@/lib/checkQuestion'
import { checkAnswerSummary } from '@/lib/checkQuestionCopy'

/**
 * Drives every check question in a lesson through its whole life: decide, fetch,
 * show, grade, record, hand back to the conversation.
 *
 * WHERE THE WRITE HAPPENS, AND WHY HERE. The attempt is recorded from the BROWSER
 * through the existing recordQuestionAttempt, under the same owns_student RLS
 * policy, with the same shape Practice writes. No new server credential is
 * introduced. api/chat.ts stays a stateless proxy with no database access at all:
 * it has no authentication today, so attaching the service role to it would let any
 * caller fabricate graded attempts for any student_id, which is precisely the
 * evidence the parent and school dashboards now depend on.
 *
 * WHO STARTS A CHECK. Both Nikki and the app. Her [[check]] marker is the better
 * signal, because she can see that something just landed, so it skips the cooldown.
 * But a lesson cannot depend on her volunteering: the prompt tells her most turns
 * should have no check, and across the live database that produced zero recorded
 * checks in every session ever run. So the cadence also fires on its own once the
 * window opens. Nikki moves checks earlier; she is not what makes them happen.
 *
 * NO CREDIT FOR PARTICIPATION. The ONLY write is in `pick`, from a real tap on a
 * real choice, graded against the stored key. A card that is shown and ignored, a
 * lesson abandoned mid-question, a hint, a conversation about the answer: none of
 * them record anything, correct or otherwise. Silence is never evidence.
 */
export interface UseCheckQuestionOptions {
  student: Student
  focusSlug: string | null
  checkRequested: boolean
  clearCheckRequest: () => void
  assistantTurns: number
  isLoading: boolean
  /** Called once the child answers, with the nudge to thread and the turn to send. */
  onAnswered: (result: { nudge: string | null; summary: string }) => void
}

export interface CheckQuestionState {
  question: PracticeQuestion | null
  selectedIndex: number | null
  pick: (index: number) => void
}

export function useCheckQuestion(opts: UseCheckQuestionOptions): CheckQuestionState {
  const { student, focusSlug, checkRequested, clearCheckRequest, assistantTurns, isLoading } = opts

  const [question, setQuestion] = useState<PracticeQuestion | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [checksServed, setChecksServed] = useState(0)
  const [turnOfLastCheck, setTurnOfLastCheck] = useState<number | null>(null)
  const [consecutiveWrong, setConsecutiveWrong] = useState(0)
  const shownAtRef = useRef(0)
  /** Every item asked THIS lesson, so a wrong answer is never re-asked for credit. */
  const askedIdsRef = useRef<Set<string>>(new Set())
  /**
   * True from the moment a fetch starts until its card is on screen or it failed.
   *
   * Without it the app trigger can double-serve: clearCheckRequest() is a state
   * update, so it re-runs this effect while the first fetch is still in flight, and
   * on that pass checksServed and turnOfLastCheck have not been written yet, so the
   * cadence looks clear and a second question is fetched. The old code got this for
   * free from its `if (!checkRequested) return` guard, which no longer exists now
   * that the app can start a check on its own.
   */
  const servingRef = useRef(false)
  // Latest-callback ref: kept current in an effect (never during render) so `pick`
  // can stay stable without going stale on the caller's closure.
  const onAnsweredRef = useRef(opts.onAnswered)
  useEffect(() => {
    onAnsweredRef.current = opts.onAnswered
  }, [opts.onAnswered])

  useEffect(() => {
    // Wait for the turn to finish streaming, and never stack a second card on an
    // unanswered one or on one still being fetched.
    if (isLoading || question || servingRef.current) return

    const trigger: CheckTrigger = checkRequested ? 'nikki' : 'app'
    const allowed = shouldServeCheck(
      { assistantTurns, checksServed, turnOfLastCheck, consecutiveWrong },
      trigger,
    )
    // Consume Nikki's request either way: a check she asked for and did not get is
    // dropped, not queued. Queuing would fire it several turns later, out of
    // context, which is worse than not checking.
    if (checkRequested) clearCheckRequest()
    if (!allowed) return

    let active = true
    servingRef.current = true
    void (async () => {
      try {
        const q = await fetchCheckQuestion(student, focusSlug, askedIdsRef.current)
        if (!active || !q) return
        askedIdsRef.current.add(q.id)
        setQuestion(q)
        setSelectedIndex(null)
        shownAtRef.current = Date.now()
        setChecksServed((n) => n + 1)
        setTurnOfLastCheck(assistantTurns)
      } finally {
        servingRef.current = false
      }
    })()
    return () => {
      active = false
    }
  }, [
    checkRequested,
    isLoading,
    question,
    assistantTurns,
    checksServed,
    turnOfLastCheck,
    consecutiveWrong,
    clearCheckRequest,
    student,
    focusSlug,
  ])

  const pick = useCallback(
    (index: number) => {
      if (!question || selectedIndex !== null) return
      setSelectedIndex(index)
      const { isCorrect, misconceptionToken } = scoreChoice(question.choices, index)

      // Identical to the Practice write path, so generated_question_id is populated
      // and the per-question time median keeps filtering guesses.
      void recordQuestionAttempt({
        studentId: student.id,
        generatedQuestionId: question.id,
        chosenChoiceIndex: index,
        shownAtMs: shownAtRef.current || null,
      })

      // Drives the struggle backoff. A correct answer clears the streak, so a child
      // who stumbles once and recovers keeps being checked normally.
      setConsecutiveWrong((n) => (isCorrect ? 0 : n + 1))

      // The nudge names the SPECIFIC misconception behind the distractor they chose,
      // so Nikki's next turn teaches into their actual error instead of asking them
      // to try again. This is what makes a wrong answer a lesson rather than a mark.
      const nudge = isCorrect ? null : explainMisconception(misconceptionToken)
      const summary = checkAnswerSummary({
        chosenText: question.choices[index]?.text ?? '',
        isCorrect,
      })
      // Clear the card so the conversation moves on; the answered state has already
      // been recorded and Nikki responds to it in her next turn.
      setQuestion(null)
      setSelectedIndex(null)
      onAnsweredRef.current({ nudge, summary })
    },
    [question, selectedIndex, student.id],
  )

  return { question, selectedIndex, pick }
}
