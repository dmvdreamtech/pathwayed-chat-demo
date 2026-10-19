import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getStudent, type Student } from '@/lib/students'
import {
  fetchRampedQuestions,
  submitAnswer,
  summarizeAttempts,
  type AnswerVerdict,
  type PracticeQuestion,
} from '@/lib/questions'
import { recordPracticeResult } from '@/lib/skills'
import { checkAndRaiseWorkingGrade } from '@/lib/promotion'
import { explainMisconception } from '@/lib/misconceptions'
import { MathText } from '@/components/MathText'
import { MathFigure } from '@/components/MathFigure'
import { TopMenu } from '@/components/TopMenu'
import { QuestionAudio } from '@/components/QuestionAudio'
import { PictureQuestion } from '@/components/PictureQuestion'
import { useVoiceMuted } from '@/hooks/useVoiceMuted'
import { useAutoRead } from '@/hooks/useAutoRead'
import { useAnswerWrites } from '@/hooks/useAnswerWrites'
import { speakWithNikki, stopNikkiSpeech } from '@/lib/voice'
import '@/styles/app-screens.css'
import { spokenPictureItem } from '@/lib/pictureModel'

/**
 * Assemble the read-aloud text for a served question. For audio-picture (K-2)
 * items, Nikki reads the spoken prompt AND names the answer tiles (a pre-reader
 * can't read the numbers/letters/pictures they tap). For text items it stays
 * passage+stem — choices are not read there (grades 3-12 unchanged).
 */
function readableText(q: PracticeQuestion | undefined): string {
  if (!q) return ''
  if (q.render_mode === 'audio_picture') return spokenPictureItem(q.stem, q.choices)
  return [q.passage, q.stem].filter(Boolean).join('\n\n')
}

const SESSION_LENGTH = 10

/**
 * Question Engine, Stage 3 — minimal serve -> score -> mastery Practice flow.
 * One question at a time, immediate feedback + solution, and at session end the
 * database scores the answers this set recorded (recordPracticeResult). Kept
 * deliberately simple. Encouraging throughout — a low score never feels punishing.
 */
export function Practice() {
  const { id, skill } = useParams<{ id: string; skill: string }>()
  const skillSlug = skill ?? 'multiplication'
  const navigate = useNavigate()

  const [student, setStudent] = useState<Student | null>(null)
  const [questions, setQuestions] = useState<PracticeQuestion[] | null>(null)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [results, setResults] = useState<{ isCorrect: boolean }[]>([])
  // The server's verdict on the current answer; null until it arrives.
  const [verdict, setVerdict] = useState<AnswerVerdict | null>(null)
  // The answer could not be checked (offline, or no access). Never guessed.
  const [checkFailed, setCheckFailed] = useState(false)
  const [shownAt, setShownAt] = useState(0)
  const [done, setDone] = useState(false)
  const [saving, setSaving] = useState(false)
  // The end of the set waits for these so the database scores exactly the
  // answers this set recorded.
  const answerWrites = useAnswerWrites()

  // Auto-read the question aloud in Nikki's voice (respecting the app-wide mute).
  const [muted, toggleMuted] = useVoiceMuted()
  const activeQuestion = questions?.[index]
  const { speaking, replay } = useAutoRead({
    questionId: done ? null : activeQuestion?.id,
    text: readableText(activeQuestion),
    muted,
  })
  const onToggleMute = () => {
    if (!muted) stopNikkiSpeech() // muting → silence any current read immediately
    toggleMuted()
  }

  useEffect(() => {
    if (!id) return
    let active = true
    // Ramped to this student's rolling performance on the skill, preferring
    // questions they have not seen. Falls back to the plain shuffled pool for
    // skills with no internal difficulty spread.
    fetchRampedQuestions(skillSlug, SESSION_LENGTH, id).then(async ({ questions: qs }) => {
      const s = await getStudent(id)
      if (!active) return
      if (!s) {
        navigate('/students', { replace: true })
        return
      }
      setStudent(s)
      setQuestions(qs)
      setShownAt(Date.now())
    })
    return () => {
      active = false
    }
  }, [id, skillSlug, navigate])

  if (!student || !questions) {
    return (
      <div className="kid-screen">
        <div className="shell">
          <p className="muted">Loading…</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="kid-screen">
        <div className="shell">
          <TopMenu />
          <h1 className="greet">Practice</h1>
          <p className="muted">No practice questions are ready yet, check back soon!</p>
          <button className="btn btn-navy" onClick={() => navigate(`/students/${student.id}`)}>
            Back to my dashboard
          </button>
        </div>
      </div>
    )
  }

  const handlePick = async (choiceIndex: number) => {
    const current = questions[index]
    if (selected !== null || !current) return
    setSelected(choiceIndex)
    // The server records the answer, grades it, and only then sends the verdict.
    // The answer key never reaches the browser before the child answers.
    const write = submitAnswer({
      studentId: student.id,
      generatedQuestionId: current.id,
      chosenChoiceIndex: choiceIndex,
      shownAtMs: shownAt,
    })
    answerWrites.track(write.then((v) => v?.attemptId ?? null))
    const v = await write
    if (!v) {
      setCheckFailed(true)
      return
    }
    setVerdict(v)
    setResults((r) => [...r, { isCorrect: v.isCorrect }])
    // Pre-reader items: Nikki SPEAKS the warm "let's count together" feedback,
    // since the child can't read it. Respects the app-wide mute.
    if (current.render_mode === 'audio_picture' && !muted && v.solution) {
      void speakWithNikki(v.solution)
    }
  }

  const handleNext = async () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1)
      setSelected(null)
      setVerdict(null)
      setCheckFailed(false)
      setShownAt(Date.now())
      return
    }
    // Last question answered -> finish. One practice session = one legacy ramp
    // increment, scored by the database from the answers this set recorded.
    setDone(true)
    setSaving(true)
    try {
      const attemptIds = await answerWrites.recordedIds()
      const update = await recordPracticeResult(student.id, questions[0].skill_id, attemptIds)
      // null means nothing was recorded for this set (the cause is already
      // logged) — surface that the session didn't persist.
      if (!update) {
        console.error('recordPracticeResult returned null, mastery not written', {
          studentId: student.id,
          skillId: questions[0].skill_id,
          answersRecorded: attemptIds.length,
        })
      }
    } catch (err) {
      console.error('recordPracticeResult threw', err)
    }
    // Ceiling detection: this session may have cleared the last skill at the
    // student's working grade. Runs after the result is recorded so it sees freshly
    // recomputed evidence. Best-effort — a failure never blocks the summary screen.
    await checkAndRaiseWorkingGrade(student)
    setSaving(false)
  }

  if (done) {
    const summary = summarizeAttempts(results)
    return (
      <div className="kid-screen">
        <div className="shell">
          <TopMenu />
          <h1 className="greet">Nice work, {student.first_name}!</h1>
          <div className="panel practice-summary">
            <p className="practice-score">
              {summary.correct} <span className="muted">/ {summary.total}</span>
            </p>
            <p className="practice-encourage">{encouragement(summary.accuracy)}</p>
            {saving && <p className="muted">Saving your progress…</p>}
          </div>
          <button className="btn btn-navy" disabled={saving} onClick={() => navigate(`/students/${student.id}`)}>
            Back to my dashboard
          </button>
        </div>
      </div>
    )
  }

  const current = questions[index]
  const answered = verdict !== null || checkFailed
  // For a wrong answer, a nudge targeted at the specific mistake the student made
  // (from the misconception the server names), shown instead of just "the answer is N".
  const mistakeHint = verdict && !verdict.isCorrect ? explainMisconception(verdict.misconceptionToken) : null

  return (
    <div className="kid-screen">
      <div className="shell">
        <TopMenu />
        <p className="practice-solo">This part’s on you. Give it your best shot!</p>
        <div className="practice-progress muted">
          Question {index + 1} of {questions.length}
        </div>
        <QuestionAudio muted={muted} speaking={speaking} onToggleMute={onToggleMute} onReplay={replay} />
        <div className="panel practice-q">
          {current.render_mode === 'audio_picture' ? (
            <PictureQuestion
              prompt={current.prompt}
              choices={current.choices}
              answered={answered}
              selected={selected}
              correctIndex={verdict?.correctIndex ?? null}
              onPick={(i) => void handlePick(i)}
              showState
            />
          ) : (
            <>
              {current.passage && (
                <div className="practice-passage">
                  <MathText content={current.passage} />
                </div>
              )}
              <div className="practice-stem">
                <MathText content={current.stem} />
              </div>
              <MathFigure stem={current.stem} />
              <div className="practice-choices">
                {current.choices.map((c, i) => {
                  const state = !verdict
                    ? i === selected
                      ? 'chosen'
                      : ''
                    : i === verdict.correctIndex
                      ? 'correct'
                      : i === selected
                        ? 'chosen-wrong'
                        : 'dim'
                  return (
                    <button
                      key={i}
                      className={`practice-choice ${state}`}
                      disabled={selected !== null}
                      onClick={() => void handlePick(i)}
                    >
                      <MathText content={c.text} />
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {selected !== null && !answered && <p className="muted">Checking your answer…</p>}

          {answered && (
            <div className="practice-feedback">
              {verdict ? (
                <p className={`practice-verdict ${verdict.isCorrect ? 'good' : 'soft'}`}>
                  {verdict.isCorrect
                    ? 'Correct! 🎉'
                    : verdict.correctAnswer
                      ? `Good try, the answer is ${verdict.correctAnswer}.`
                      : 'Good try.'}
                </p>
              ) : (
                <p className="practice-verdict soft">We couldn’t check that answer just now. Tap below to keep going.</p>
              )}
              {mistakeHint && <p className="practice-explain">{mistakeHint}</p>}
              {verdict?.solution && (
                <div className="practice-solution">
                  <MathText content={verdict.solution} />
                </div>
              )}
              <button className="btn btn-navy" onClick={() => void handleNext()}>
                {index + 1 < questions.length ? 'Next question' : 'Finish'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Always encouraging — even a low score is framed as progress, never punishing.
function encouragement(accuracy: number): string {
  if (accuracy >= 80) return "You're really getting this. Keep up the great work!"
  if (accuracy >= 50) return 'Nice effort! Every round of practice makes you stronger.'
  return 'Great job sticking with it, practice is exactly how we get better. Try another round soon!'
}
