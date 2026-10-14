import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { getStudent, setAboveGradeConsent, avatarModeOf, type Student } from '@/lib/students'
import {
  fetchDiagnosticQuestions,
  fetchEarlyGradeDiagnostic,
  listPracticeableSkills,
  recordQuestionAttempt,
  scoreChoice,
  type DiagnosticQuestion,
  type PracticeQuestion,
  type PracticeableSkill,
} from '@/lib/questions'
import { seedDiagnosticMastery } from '@/lib/skills'
import {
  studentGradeNum,
  availableGrades,
  startGrade,
  rungAccuracy,
  nextRung,
  settledGrade,
  placementSeeds,
  PLACEMENT_MIN_QUESTIONS,
  type DiagnosticResult,
  type LadderDirection,
} from '@/lib/diagnostic'
import {
  loadDiagnosticProgress,
  saveDiagnosticProgress,
  clearDiagnosticProgress,
} from '@/lib/diagnosticProgress'
import { MathText } from '@/components/MathText'
import { MathFigure } from '@/components/MathFigure'
import { TopMenu } from '@/components/TopMenu'
import { NikkiFace } from '@/components/NikkiFace'
import { QuestionAudio } from '@/components/QuestionAudio'
import { PictureQuestion } from '@/components/PictureQuestion'
import { useVoiceMuted } from '@/hooks/useVoiceMuted'
import { useAutoRead } from '@/hooks/useAutoRead'
import { useAnswerWrites } from '@/hooks/useAnswerWrites'
import { stopNikkiSpeech } from '@/lib/voice'
import '@/styles/app-screens.css'

/**
 * Read-aloud text for a question. For audio-picture (K-2) items, Nikki reads the
 * spoken prompt AND names each answer tile — a pre-reader can't read the
 * numbers/letters/pictures they tap, so the choices must be voiced too. For text
 * items (grades 3-12) it stays passage+stem only; choices are not read there.
 */
function readableText(q: PracticeQuestion | undefined): string {
  if (!q) return ''
  if (q.render_mode === 'audio_picture') {
    const labels = q.choices.map((c) => c.text).filter(Boolean)
    return labels.length ? `${q.stem} Your choices are: ${labels.join(', ')}.` : q.stem
  }
  return [q.passage, q.stem].filter(Boolean).join('\n\n')
}

/**
 * Placement diagnostic — PHASE 2 (adaptive + placement). Still silent: present ->
 * record -> advance, with NO teaching feedback. Differences from Phase 1:
 *  - GRADE-ANCHORED ADAPTIVE sampling: starts at the student's ACTUAL grade
 *    (CCSS grade), then adapts one grade at a time — UP while they answer well,
 *    DOWN while they struggle — to locate their true working level, instead of
 *    anchoring to a coarse grade band. Bounds/decisions live in nextRung.
 *  - PLACEMENT: at the end it seeds student_skill_mastery from the answers
 *    (correct 60 / wrong 25) and recomputes readiness, so the dashboard/path pick
 *    up at the student's real level. A plain summary is shown on completion.
 * Still behind the direct /students/:id/diagnostic route; not wired into onboarding.
 */
/** Only honor a known same-app return path (guards against open redirects):
 *  this student's own routes, or the parent dashboard (parent-triggered reassess). */
function resolveReturn(raw: string | null, studentId: string): string {
  if (raw && (raw.startsWith(`/students/${studentId}`) || raw === '/parent')) return raw
  return `/students/${studentId}`
}

/** Grades at/below this (K, 1, 2) get the short, playful audio-picture placement. */
const EARLY_GRADE_MAX = 2
/** K-2 placement budget — short and gentle (~a few per anchor skill; counting +
 *  phonics = 3 each = 6 questions), not a test. */
const EARLY_TARGET = 6
/**
 * The K-2 placement samples ONLY these two anchor skills — early math (counting)
 * and early literacy (letter-sounds) — to keep it short for a 5-year-old. The
 * other K skills (letter-naming, shapes, comparing-numbers) are taught in lessons,
 * not the placement check.
 */
const EARLY_ANCHOR_SLUGS = ['counting', 'letter-sounds']

export function Diagnostic() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [student, setStudent] = useState<Student | null>(null)
  const [questions, setQuestions] = useState<DiagnosticQuestion[] | null>(null)
  // K-2 initial placement: a short, playful audio-picture set (no grade ladder).
  const [early, setEarly] = useState(false)
  // Grade-ladder state: the skill pool, which grades have content, and the walk.
  const [allSkills, setAllSkills] = useState<PracticeableSkill[]>([])
  const [available, setAvailable] = useState<number[]>([])
  const [currentGrade, setCurrentGrade] = useState(0)
  const [direction, setDirection] = useState<LadderDirection>('none')
  const [stepsTaken, setStepsTaken] = useState(0)
  const [visited, setVisited] = useState<number[]>([])
  const [index, setIndex] = useState(0)
  const [results, setResults] = useState<DiagnosticResult[]>([])
  const [busy, setBusy] = useState(false) // fetching the next rung, or seeding at the end
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const [consent, setConsent] = useState(false) // parent OK to show above-grade / SAT framing
  const shownAtRef = useRef(0)
  // Seeding waits for these, because the database seeds from the answers it
  // has recorded and graded, not from this page's tally.
  const answerWrites = useAnswerWrites()

  // Auto-read each question aloud once it's shown (after the parent starts the
  // assessment — a user gesture), respecting the app-wide mute.
  const [muted, toggleMuted] = useVoiceMuted()
  const activeQuestion = questions?.[index]
  const { speaking, replay } = useAutoRead({
    questionId: started && !done ? activeQuestion?.id : null,
    text: readableText(activeQuestion),
    muted,
  })
  const onToggleMute = () => {
    if (!muted) stopNikkiSpeech()
    toggleMuted()
  }

  useEffect(() => {
    if (!id) return
    let active = true
    ;(async () => {
      const s = await getStudent(id)
      if (!active) return
      if (!s) {
        navigate('/students', { replace: true })
        return
      }
      setStudent(s)

      // A reassessment (?fresh=1) always starts clean; otherwise resume a paused
      // run (device-local) instead of re-fetching a new set.
      if (searchParams.get('fresh')) clearDiagnosticProgress(s.id)
      const saved = searchParams.get('fresh') ? null : loadDiagnosticProgress(s.id)
      if (saved) {
        setConsent(saved.consent)
        setStarted(saved.started)
        setEarly(saved.early)
        setQuestions(saved.questions)
        setAllSkills(saved.allSkills)
        setAvailable(saved.available)
        setCurrentGrade(saved.currentGrade)
        setDirection(saved.direction)
        setStepsTaken(saved.stepsTaken)
        setVisited(saved.visited)
        setIndex(saved.index)
        setResults(saved.results)
        return
      }

      const practiceable = await listPracticeableSkills()
      if (!active) return

      // K-2 initial placement: a SHORT, gentle, audio-picture set from the two
      // anchor skills (counting + phonics) only — never higher-grade text, and no
      // ladder. The rest of the K skills are covered in lessons, not placement.
      if (studentGradeNum(s.grade) <= EARLY_GRADE_MAX) {
        const anchors = practiceable.filter((sk) => EARLY_ANCHOR_SLUGS.includes(sk.slug))
        const k2Skills = anchors.length ? anchors : practiceable.filter((sk) => (sk.ccss_grade_num ?? 99) <= EARLY_GRADE_MAX)
        const qs = await fetchEarlyGradeDiagnostic(k2Skills, EARLY_TARGET)
        if (!active) return
        setEarly(true)
        setAllSkills(k2Skills)
        setAvailable(availableGrades(k2Skills.map((sk) => sk.ccss_grade_num).filter((n): n is number => n != null)))
        setCurrentGrade(studentGradeNum(s.grade))
        setDirection('none')
        setStepsTaken(0)
        setVisited([studentGradeNum(s.grade)])
        setQuestions(qs)
        return
      }

      // Grades 3-12 — GRADE-ANCHORED ladder: start at the student's real grade rung
      // (the skills whose true CCSS grade equals the student's grade), degrading
      // to the nearest grade that has content when the exact grade has a gap.
      const avail = availableGrades(
        practiceable.map((sk) => sk.ccss_grade_num).filter((n): n is number => n != null),
      )
      const start = startGrade(studentGradeNum(s.grade), avail)
      setAllSkills(practiceable)
      setAvailable(avail)
      if (start == null) {
        setQuestions([]) // nothing published to place against → empty-state screen
        return
      }
      const rungSkills = practiceable.filter((sk) => sk.ccss_grade_num === start)
      const qs = await fetchDiagnosticQuestions(rungSkills, PLACEMENT_MIN_QUESTIONS)
      if (!active) return
      setCurrentGrade(start)
      setDirection('none')
      setStepsTaken(0)
      setVisited([start])
      setQuestions(qs)
    })()
    return () => {
      active = false
    }
  }, [id, navigate])

  // Persist the running assessment so it can be paused and resumed. Only once
  // started and before completion (finishing clears it in finish()).
  useEffect(() => {
    if (!student || !started || done || !questions) return
    saveDiagnosticProgress(student.id, {
      consent,
      started,
      early,
      questions,
      allSkills,
      available,
      currentGrade,
      direction,
      stepsTaken,
      visited,
      index,
      results,
    })
  }, [
    student,
    started,
    early,
    done,
    questions,
    allSkills,
    available,
    currentGrade,
    direction,
    stepsTaken,
    visited,
    index,
    results,
    consent,
  ])

  // Stamp the presented-at time whenever a new question is shown, including when
  // the quiz starts (so reading the consent intro isn't counted). Date.now() is
  // only valid outside render, so it lives in an effect, not the click handler.
  useEffect(() => {
    shownAtRef.current = Date.now()
  }, [index, questions, started])

  // Parent-consent step: record the above-grade framing choice, then begin. Either
  // choice proceeds to the same questions — consent governs framing, not learning.
  // A school-covered student is never asked: students do not consent for
  // themselves, the school's setting stands, and the database refuses the write.
  const handleStart = (ok: boolean) => {
    if (!student) return
    setConsent(ok)
    if (!student.school_covered) void setAboveGradeConsent(student.id, ok)
    setStarted(true)
  }

  // K-2 begin: no parent/SAT framing — just start the playful game. The tap is
  // the user gesture that lets Nikki's audio autoplay.
  const beginEarly = () => setStarted(true)

  const finish = async (allResults: DiagnosticResult[], stu: Student) => {
    setBusy(true)
    // The settled working grade is logged for observability; the kid never sees a
    // score or grade. For grades 3-12 the placement is the seeded mastery (behind
    // the scenes). K-2 does NOT seed: a couple of correct answers must not pre-mark
    // counting/phonics "mastered" — placement is routing into Skills building, and
    // the lessons should teach those skills fully from fresh. (Attempts are still
    // recorded via recordQuestionAttempt for history either way.)
    console.info('[diagnostic] settled working grade', settledGrade(allResults, studentGradeNum(stu.grade)))
    // Only seed a real placement when a grades-3-12 run cleared the minimum
    // question floor. A too-short run (a thin grade that settled the ladder after
    // a couple of answers) is DISCARDED — seeding from it would pin the child with
    // junk mastery. K-2 never seeds by design (see note above). Either way the
    // child still lands on the positive done screen and can start learning; an
    // unseeded child is simply offered placement again at their next visit.
    if (!early && placementSeeds(allResults.length)) {
      // Let this run's answer writes land first: the database seeds from them.
      await answerWrites.recordedIds()
      await seedDiagnosticMastery(
        stu.id,
        allResults.map((r) => r.skillId),
      )
    } else if (!early) {
      // Below the floor, so nothing is seeded: a placement is only claimed from
      // enough answers to mean something. This is no longer a dead end. Rungs are
      // now drawn to PLACEMENT_MIN_QUESTIONS (see fetchDiagnosticQuestions), so a
      // run reaching here means the catalogue itself is too thin, and hasPlacement
      // counts the answers the child just gave, so the offer is not re-made
      // identically. They land in Skills building either way.
      console.info('[diagnostic] run below placement floor, discarded, not seeded', allResults.length)
    }
    clearDiagnosticProgress(stu.id)
    setBusy(false)
    setDone(true)
  }

  // After the last question of a grade rung: adapt UP (if strong) or DOWN (if
  // struggling) to the next grade to find the student's true level, or settle
  // and finish. Grade selection/bounds live in nextRung (pure, tested).
  const advanceLadder = async (allResults: DiagnosticResult[], stu: Student) => {
    const accuracy = rungAccuracy(allResults, currentGrade) ?? 0
    const step = nextRung({ currentGrade, accuracy, available, visited, direction, stepsTaken })
    if (step.grade != null) {
      setBusy(true)
      const rungSkills = allSkills.filter((sk) => sk.ccss_grade_num === step.grade)
      const more = await fetchDiagnosticQuestions(rungSkills, PLACEMENT_MIN_QUESTIONS)
      setBusy(false)
      if (more.length) {
        setQuestions((qs) => [...(qs ?? []), ...more])
        setCurrentGrade(step.grade)
        setDirection(step.direction)
        setStepsTaken((n) => n + 1)
        setVisited((v) => [...v, step.grade as number])
        setIndex((i) => i + 1)
        return
      }
    }
    await finish(allResults, stu)
  }

  // Silent scoring: score, record the attempt, accumulate the result, advance.
  const handlePick = (choiceIndex: number) => {
    if (!student || !questions || busy) return
    const current = questions[index]
    if (!current) return
    // Drives the ladder on this page only. The database grades the record.
    const { isCorrect } = scoreChoice(current.choices, choiceIndex)
    answerWrites.track(
      recordQuestionAttempt({
        studentId: student.id,
        generatedQuestionId: current.id,
        chosenChoiceIndex: choiceIndex,
        shownAtMs: shownAtRef.current,
        isDiagnostic: true,
      }),
    )
    const nextResults: DiagnosticResult[] = [
      ...results,
      { skillId: current.skill_id, gradeNum: current.ccss_grade_num ?? currentGrade, isCorrect },
    ]
    setResults(nextResults)
    if (index + 1 < questions.length) {
      setIndex(index + 1)
    } else if (early) {
      // K-2 is a fixed short set — no ladder; just finish and place.
      void finish(nextResults, student)
    } else {
      void advanceLadder(nextResults, student)
    }
  }

  if (!student || !questions || busy) {
    return (
      <div className="kid-screen">
        <div className="shell">
          <p className="muted">{busy ? 'Finding the right level for you…' : 'Loading…'}</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="kid-screen">
        <div className="shell">
          <TopMenu />
          <h1 className="greet">Check back soon</h1>
          <p className="muted">No diagnostic questions are ready yet.</p>
          <button className="btn btn-navy" onClick={() => navigate(`/students/${student.id}`)}>
            Back to my dashboard
          </button>
        </div>
      </div>
    )
  }

  if (done) {
    // No score, no band, no verdict to the child — just a positive forward line
    // and straight into learning.
    return (
      <div className="kid-screen">
        <div className="shell">
          <TopMenu />
          <h1 className="greet">
            {early ? `Yay, great job, ${student.first_name}!` : 'Perfect, I know just where to start you!'}
          </h1>
          <p className="muted">
            {early ? 'Let’s go learn together!' : `Great effort, ${student.first_name}. Let’s jump into your first lesson.`}
          </p>
          <button
            className="btn btn-navy"
            style={{ marginTop: 14 }}
            onClick={() =>
              navigate(early ? `/students/${student.id}/learn` : resolveReturn(searchParams.get('return'), student.id))
            }
          >
            Let’s go →
          </button>
        </div>
      </div>
    )
  }

  // K-2: a warm, playful start — no parent/SAT framing. The tap starts the game
  // and unlocks Nikki's read-aloud (autoplay needs a user gesture).
  if (!started && early) {
    return (
      <div className="kid-screen">
        <div className="shell">
          <TopMenu />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 6 }}>
            <NikkiFace mode={avatarModeOf(student)} size={96} />
            <h1 className="greet">Let’s play, {student.first_name}!</h1>
            <p className="muted">
              A quick counting and letters game. I’ll say each one out loud, just tap the picture. Ready?
            </p>
          </div>
          <button className="btn btn-navy" style={{ marginTop: 14 }} onClick={beginEarly}>
            Let’s play →
          </button>
        </div>
      </div>
    )
  }

  // A school-covered student starts straight away: no consent question, since
  // students never consent for themselves. The school's setting stands.
  if (!started && student.school_covered) {
    return (
      <div className="kid-screen">
        <div className="shell">
          <TopMenu />
          <h1 className="greet">Let’s find your level, {student.first_name}</h1>
          <div className="panel">
            <p className="muted" style={{ margin: 0 }}>
              A few quick questions help Nikki start you at the right level, not too easy, not too hard. There’s
              nothing to study; just answer what you can.
            </p>
          </div>
          <button className="btn btn-navy" onClick={() => handleStart(student.above_grade_ok)}>
            Start
          </button>
        </div>
      </div>
    )
  }

  // Parent-consent step (above-grade / SAT framing) before the questions begin.
  if (!started) {
    return (
      <div className="kid-screen">
        <div className="shell">
          <TopMenu />
          <h1 className="greet">Let’s find {student.first_name}’s level</h1>
          <div className="panel">
            <p className="muted" style={{ margin: '0 0 10px' }}>
              A few quick questions help us start {student.first_name} at the right level, not too easy, not too
              hard. There’s nothing to study; they just answer what they can.
            </p>
            <p className="muted" style={{ margin: '0 0 10px' }}>
              Sometimes a child is ready for work beyond their grade. For example, if your 1st grader reads at a
              3rd-grade level, we can let them move ahead. Is that okay with you?
            </p>
            <p className="muted" style={{ margin: 0, fontSize: 12.5 }}>
              Either way, {student.first_name} practices at the level that fits them, your choice only controls
              whether we show above-grade and SAT progress.
            </p>
          </div>
          <button className="btn btn-navy" onClick={() => handleStart(true)}>
            Yes, let {student.first_name} get ahead when ready
          </button>
          <button className="btn btn-soft" style={{ marginTop: 10 }} onClick={() => handleStart(false)}>
            Keep it grade-focused for now
          </button>
        </div>
      </div>
    )
  }

  const current = questions[index]
  return (
    <div className="kid-screen">
      <div className="shell">
        <TopMenu />
        <p className="practice-solo">
          {early ? 'Listen to Nikki, then tap your answer!' : 'Just do your best, this helps us find the right level for you.'}
        </p>
        {!early && (
          <div className="practice-progress muted">
            Question {index + 1} of {questions.length}
          </div>
        )}
        <QuestionAudio muted={muted} speaking={speaking} onToggleMute={onToggleMute} onReplay={replay} />
        <div className="panel practice-q">
          {current.render_mode === 'audio_picture' ? (
            <PictureQuestion
              prompt={current.prompt}
              choices={current.choices}
              answered={false}
              selected={null}
              onPick={handlePick}
              showState={false}
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
                {current.choices.map((c, i) => (
                  <button key={i} className="practice-choice" onClick={() => handlePick(i)}>
                    <MathText content={c.text} />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
