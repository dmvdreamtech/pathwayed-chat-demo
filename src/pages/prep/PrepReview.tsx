import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getStudent, avatarModeOf, type Student } from '@/lib/students'
import { getPrepModule } from '@/lib/prep/registry'
import type { PrepModule } from '@/lib/prep/types'
import { getPrepEntitlements, isKidEntitled } from '@/lib/prep/entitlements'
import { getAttempt, getReviewKeys, type PrepAttempt, type ReviewKey } from '@/lib/prep/timedSection'
import { fetchQuestionsByIds, type PracticeQuestion } from '@/lib/questions'
import { explainMisconception } from '@/lib/misconceptions'
import { NikkiFace } from '@/components/NikkiFace'
import { MathText } from '@/components/MathText'
import '@/styles/app-screens.css'

type Outcome = 'correct' | 'incorrect' | 'unanswered'

/**
 * Post-test review. This is the ONE prep-test screen where Nikki returns: each
 * missed question shows the existing misconception explanation in her voice. The
 * timed screens themselves never involve Nikki.
 */
export function PrepReview() {
  const { id, moduleId, attemptId } = useParams<{ id: string; moduleId: string; attemptId: string }>()
  const navigate = useNavigate()

  const module: PrepModule | undefined = moduleId ? getPrepModule(moduleId as PrepModule['id']) : undefined

  const [student, setStudent] = useState<Student | null>(null)
  const [attempt, setAttempt] = useState<PrepAttempt | null>(null)
  // The answer keys, from the server, once the section is finished.
  const [keys, setKeys] = useState<Map<string, ReviewKey>>(new Map())
  const [questions, setQuestions] = useState<PracticeQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    if (!id || !moduleId || !attemptId) return
    let active = true
    ;(async () => {
      const s = await getStudent(id)
      if (!active) return
      if (!s) {
        navigate('/students', { replace: true })
        return
      }
      const ents = await getPrepEntitlements([id])
      if (!active) return
      if (!module || !ents.some((e) => e.moduleId === moduleId && isKidEntitled(e.status))) {
        navigate(`/students/${id}`, { replace: true })
        return
      }
      const a = await getAttempt(attemptId)
      if (!active) return
      if (!a || a.studentId !== id || a.moduleId !== moduleId) {
        navigate(`/students/${id}/prep/${moduleId}?tab=test`, { replace: true })
        return
      }
      const [qs, k] = await Promise.all([fetchQuestionsByIds(a.questionIds), getReviewKeys(a.id)])
      if (!active) return
      setStudent(s)
      setAttempt(a)
      setQuestions(qs)
      setKeys(k ?? new Map())
      setLoading(false)
    })().catch(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [id, moduleId, attemptId, module, navigate])

  const correctIndexOf = (q: PracticeQuestion) => keys.get(q.id)?.correctIndex ?? -1

  const outcomeOf = (q: PracticeQuestion): Outcome => {
    const chosen = attempt?.answers[q.id]
    if (chosen === undefined) return 'unanswered'
    return chosen === correctIndexOf(q) ? 'correct' : 'incorrect'
  }

  const correctCount = useMemo(
    () => questions.filter((q) => outcomeOf(q) === 'correct').length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questions, attempt, keys],
  )

  if (loading || !attempt || !module || !student) {
    return (
      <div className="kid-screen">
        <div className="shell">
          <p className="muted">Loading…</p>
        </div>
      </div>
    )
  }

  const total = questions.length
  const expired = attempt.status === 'expired'

  return (
    <div className="kid-screen">
      <div className="shell">
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <NikkiFace mode={avatarModeOf(student)} size={120} />
          <h1 className="greet" style={{ margin: '6px 0 2px' }}>
            You got {correctCount} out of {total}!
          </h1>
          <p className="muted" style={{ margin: 0 }}>
            {expired ? 'Time ran out, so we scored what you finished. ' : ''}
            Tap any question to see how it went.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
          {questions.map((q, i) => {
            const outcome = outcomeOf(q)
            const chosen = attempt.answers[q.id]
            const correctIdx = correctIndexOf(q)
            const token = chosen !== undefined && outcome === 'incorrect' ? keys.get(q.id)?.tokens[chosen] ?? null : null
            const nudge = token ? explainMisconception(token) : null
            const isOpen = open === q.id
            const badge =
              outcome === 'correct'
                ? { t: 'Correct', bg: '#E7F5EF', c: '#1F9E6F' }
                : outcome === 'incorrect'
                  ? { t: 'Incorrect', bg: '#FBE3DE', c: '#C0492F' }
                  : { t: 'Skipped', bg: '#F1EEE8', c: '#8A7F6D' }
            return (
              <div key={q.id} className="panel" style={{ padding: '12px 14px' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : q.id)}
                  style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', gap: 10, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#1C2230' }}>Question {i + 1}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: badge.bg, color: badge.c }}>
                    {badge.t}
                  </span>
                </button>

                {isOpen && (
                  <div style={{ marginTop: 10 }}>
                    {q.passage && (
                      <div style={{ fontSize: 13, color: '#5A6172', marginBottom: 8, whiteSpace: 'pre-wrap' }}>
                        <MathText content={q.passage} />
                      </div>
                    )}
                    <div style={{ fontSize: 15, color: '#1C2230', marginBottom: 10 }}>
                      <MathText content={q.stem} />
                    </div>
                    <div style={{ display: 'grid', gap: 6 }}>
                      {q.choices.map((c, ci) => {
                        const isCorrect = ci === correctIdx
                        const isChosen = chosen === ci
                        const border = isCorrect ? '1.8px solid #1F9E6F' : isChosen ? '1.8px solid #C0492F' : '1.4px solid #ECE4D8'
                        const bg = isCorrect ? '#E7F5EF' : isChosen ? '#FBE3DE' : '#fff'
                        return (
                          <div key={ci} style={{ padding: '9px 12px', border, borderRadius: 10, background: bg, fontSize: 14 }}>
                            <MathText content={c.text} />
                            {isCorrect && <span style={{ color: '#1F9E6F', fontWeight: 700, fontSize: 12 }}> · correct answer</span>}
                            {isChosen && !isCorrect && <span style={{ color: '#C0492F', fontWeight: 700, fontSize: 12 }}> · your answer</span>}
                          </div>
                        )
                      })}
                    </div>
                    {outcome === 'unanswered' && (
                      <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>You didn’t answer this one.</p>
                    )}
                    {nudge && (
                      <div style={{ marginTop: 10, background: '#FBF8F3', border: '1px solid #ECE4D8', borderRadius: 10, padding: '10px 12px' }}>
                        <p style={{ margin: 0, fontSize: 13.5, color: '#1C2230' }}>
                          <b>Nikki:</b> {nudge}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <button className="btn btn-soft" style={{ marginTop: 16 }} onClick={() => navigate(`/students/${id}/prep/${moduleId}?tab=test`)}>
          Back to {module.name} Prep
        </button>
      </div>
    </div>
  )
}
