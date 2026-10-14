import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getStudent, avatarModeOf, type Student } from '@/lib/students'
import { getPrepModule } from '@/lib/prep/registry'
import type { PrepModule, PrepSection } from '@/lib/prep/types'
import { getPrepEntitlements, isKidEntitled } from '@/lib/prep/entitlements'
import {
  finalizeEssay,
  findInProgressEssay,
  getEssayAttempt,
  getEssayRemaining,
  listEssayAttempts,
  requestEssayFeedback,
  saveEssayDraft,
  startOrResumeEssay,
  type EssayAttempt,
} from '@/lib/prep/prepEssay'
import { essayPromptById, pickEssayPrompt } from '@/lib/prep/essayPrompts'
import { NikkiFace } from '@/components/NikkiFace'
import '@/styles/app-screens.css'

// NOTE: No Nikki / voice imports drive the WRITING phase. Nikki appears ONLY on the
// review screen, after the essay is submitted — never while the child is writing.

type Phase = 'loading' | 'unavailable' | 'prestart' | 'intest' | 'finalizing' | 'review' | 'error'
const SYNC_MS = 20000
const URGENT_SEC = 120

function mmss(total: number | null): string {
  const s = Math.max(0, Math.floor(total ?? 0))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}

function wordCount(text: string): number {
  const t = text.trim()
  return t ? t.split(/\s+/).length : 0
}

/**
 * ISEE practice essay (kid-facing). A server-authoritative 30:00 timer (0018)
 * against prep_essay_attempts: a plain textarea, autosaved drafts, word count, and
 * NO Nikki while writing. On submit or expiry the essay is finalized server-side and
 * Nikki's feedback is generated server-side and shown on a review screen.
 *
 * With an :attemptId param this renders the review of a past (finalized) essay.
 */
export function PrepEssay() {
  const { id, moduleId, attemptId } = useParams<{ id: string; moduleId: string; attemptId?: string }>()
  const navigate = useNavigate()

  const module: PrepModule | undefined = moduleId ? getPrepModule(moduleId as PrepModule['id']) : undefined
  const essaySection: PrepSection | undefined = module?.sections.find((s) => s.essay)

  const [phase, setPhase] = useState<Phase>('loading')
  const [student, setStudent] = useState<Student | null>(null)
  const [attempt, setAttempt] = useState<EssayAttempt | null>(null)
  const [promptId, setPromptId] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [remaining, setRemaining] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [starting, setStarting] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [confirmSubmit, setConfirmSubmit] = useState(false)

  const textRef = useRef('')
  const finalizedRef = useRef(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const backToPrep = `/students/${id}/prep/${moduleId}?tab=test`

  const timeLimitSec = essaySection?.timeLimitSec ?? 1800

  // ---- Finalize (submit or expiry): flush, finalize, fetch feedback, review ----
  const finalize = useCallback(
    async (a: EssayAttempt) => {
      if (finalizedRef.current) return
      finalizedRef.current = true
      if (saveTimer.current) clearTimeout(saveTimer.current)
      setPhase('finalizing')
      try {
        const fin = await finalizeEssay(a.id, textRef.current)
        setAttempt(fin)
        setPromptId(fin.promptId)
        setText(fin.essayText)
        const fb = await requestEssayFeedback(fin.id)
        setFeedback(fb ?? fin.nikkiFeedback)
        setPhase('review')
      } catch {
        finalizedRef.current = false
        setPhase('error')
      }
    },
    [],
  )

  // ---- Load / guard / resume / review ------------------------------------------
  useEffect(() => {
    if (!id || !moduleId) return
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
      const ok = !!module && !!essaySection && ents.some((e) => e.moduleId === moduleId && isKidEntitled(e.status))
      if (!ok) {
        navigate(`/students/${id}`, { replace: true })
        return
      }
      setStudent(s)

      // Review of a specific past essay.
      if (attemptId) {
        const a = await getEssayAttempt(attemptId)
        if (!active) return
        if (!a || a.studentId !== id || !a.submittedAt) {
          navigate(backToPrep, { replace: true })
          return
        }
        setAttempt(a)
        setPromptId(a.promptId)
        setText(a.essayText)
        if (a.nikkiFeedback) {
          setFeedback(a.nikkiFeedback)
          setPhase('review')
        } else {
          // Finalized but feedback never landed — fetch it now.
          setPhase('finalizing')
          const fb = await requestEssayFeedback(a.id)
          if (!active) return
          setFeedback(fb)
          setPhase('review')
        }
        return
      }

      // Active flow: resume an in-progress essay, or set up a fresh prompt.
      const existing = await findInProgressEssay(id)
      if (!active) return
      if (existing) {
        const rem = await getEssayRemaining(existing.id)
        if (!active) return
        if (rem !== null && rem <= 0) {
          void finalize(existing)
          return
        }
        setAttempt(existing)
        setPromptId(existing.promptId)
        setText(existing.essayText)
        textRef.current = existing.essayText
        setRemaining(rem)
        setPhase('intest')
      } else {
        const past = await listEssayAttempts(id)
        if (!active) return
        const next = pickEssayPrompt(id, past.map((p) => p.promptId))
        setPromptId(next.id)
        setPhase('prestart')
      }
    })().catch(() => {
      if (active) setPhase('error')
    })
    return () => {
      active = false
    }
  }, [id, moduleId, module, essaySection, attemptId, navigate, backToPrep, finalize])

  // ---- Countdown tick ----------------------------------------------------------
  useEffect(() => {
    if (phase !== 'intest' || remaining === null) return
    if (remaining <= 0) {
      const a = attempt
      const t = setTimeout(() => a && void finalize(a), 0)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setRemaining((r) => (r === null ? r : r - 1)), 1000)
    return () => clearTimeout(t)
  }, [phase, remaining, attempt, finalize])

  // ---- Periodic + on-focus re-sync to the server clock -------------------------
  useEffect(() => {
    if (phase !== 'intest' || !attempt) return
    let active = true
    const sync = async () => {
      const rem = await getEssayRemaining(attempt.id)
      if (active && rem !== null) setRemaining(rem)
    }
    const iv = setInterval(sync, SYNC_MS)
    const onVis = () => {
      if (document.visibilityState === 'visible') void sync()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      active = false
      clearInterval(iv)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [phase, attempt])

  const attemptIdRef = useRef('')
  useEffect(() => {
    attemptIdRef.current = attempt?.id ?? ''
  }, [attempt])

  const onType = (value: string) => {
    setText(value)
    textRef.current = value
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      if (attemptIdRef.current) void saveEssayDraft(attemptIdRef.current, textRef.current)
    }, 800)
  }

  const start = async () => {
    if (starting || !promptId || !id || !moduleId) return
    setStarting(true)
    try {
      const a = await startOrResumeEssay(id, moduleId, promptId)
      setAttempt(a)
      setPromptId(a.promptId)
      setText(a.essayText)
      textRef.current = a.essayText
      setRemaining(a.remainingSeconds)
      setPhase('intest')
    } catch {
      setPhase('error')
      setStarting(false)
    }
  }

  const prompt = essayPromptById(promptId)

  // ---- Render ------------------------------------------------------------------
  if (!module || !essaySection) {
    // Only the ISEE module (essay:true) has an essay; anything else -> home.
    return (
      <div className="kid-screen">
        <div className="shell">
          <p className="muted">Loading…</p>
        </div>
      </div>
    )
  }

  if (phase === 'loading') {
    return (
      <div className="kid-screen">
        <div className="shell">
          <p className="muted">Loading…</p>
        </div>
      </div>
    )
  }

  if (phase === 'error') {
    return (
      <div className="kid-screen">
        <div className="shell">
          <div className="panel" style={{ padding: 20, textAlign: 'center' }}>
            <h3>Something went wrong</h3>
            <p className="muted" style={{ fontSize: 13.5 }}>Let’s head back and try again.</p>
            <button className="btn btn-soft" style={{ marginTop: 12 }} onClick={() => navigate(backToPrep)}>
              Back to {module.name} Prep
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'finalizing') {
    return (
      <div className="kid-screen">
        <div className="shell">
          <div className="panel" style={{ padding: 24, textAlign: 'center', maxWidth: 420, margin: '24px auto 0' }}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>📖</div>
            <h3 style={{ margin: '0 0 6px' }}>Nikki is reading your essay…</h3>
            <p className="muted" style={{ fontSize: 13.5, margin: 0 }}>
              This takes just a moment. Nice work finishing your essay!
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'prestart') {
    return (
      <div className="kid-screen">
        <div className="shell">
          <div className="panel" style={{ padding: 24, maxWidth: 520, margin: '18px auto 0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>✍️</div>
              <h2 style={{ margin: '0 0 4px' }}>Practice essay</h2>
              <p className="muted" style={{ margin: '0 0 14px', fontSize: 13.5 }}>
                You’ll have {Math.round(timeLimitSec / 60)} minutes to write, just like the real ISEE. The schools you
                apply to will read this essay, so do your best, and Nikki will give you feedback when you’re done.
              </p>
            </div>
            <div style={{ background: '#FBF8F3', border: '1.4px solid #ECE4D8', borderRadius: 12, padding: '14px 16px', margin: '0 0 16px' }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#8A7F6D', letterSpacing: 0.3 }}>YOUR PROMPT</p>
              <p style={{ margin: '6px 0 0', fontSize: 15.5, color: '#1C2230', lineHeight: 1.5 }}>{prompt.text}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" disabled={starting} onClick={() => void start()}>
                {starting ? 'Getting ready…' : 'Start writing'}
              </button>
              <div>
                <button className="link" style={{ marginTop: 12 }} onClick={() => navigate(backToPrep)}>
                  Not now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'review') {
    return (
      <div className="kid-screen">
        <div className="shell">
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <NikkiFace mode={student ? avatarModeOf(student) : undefined} size={110} />
            <h1 className="greet" style={{ margin: '6px 0 2px' }}>Essay done. Great work!</h1>
            <p className="muted" style={{ margin: 0 }}>Here’s Nikki’s feedback on your writing.</p>
          </div>

          <div className="panel" style={{ padding: '14px 16px', marginTop: 16 }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#8A7F6D', letterSpacing: 0.3 }}>PROMPT</p>
            <p style={{ margin: '5px 0 0', fontSize: 14, color: '#1C2230', lineHeight: 1.5 }}>{prompt.text}</p>
          </div>

          <div className="panel" style={{ padding: '14px 16px', marginTop: 10 }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#8A7F6D', letterSpacing: 0.3 }}>WHAT YOU WROTE</p>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: '#1C2230', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
              {text.trim() || 'You didn’t write anything this time, give it a try next round!'}
            </p>
          </div>

          <div className="panel" style={{ padding: '14px 16px', marginTop: 10, background: '#FBF8F3', border: '1px solid #ECE4D8' }}>
            {feedback ? (
              <p style={{ margin: 0, fontSize: 14, color: '#1C2230', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                <b>Nikki:</b> {feedback}
              </p>
            ) : (
              <p className="muted" style={{ margin: 0, fontSize: 13.5 }}>
                Nikki’s feedback isn’t ready just yet. Check back in a moment.
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => navigate(`/students/${id}/prep/${moduleId}/essay`)}>
              Write another
            </button>
            <button className="btn btn-soft" style={{ width: 'auto' }} onClick={() => navigate(backToPrep)}>
              Back to {module.name} Prep
            </button>
          </div>
        </div>
      </div>
    )
  }

  // phase === 'intest'
  const urgent = remaining !== null && remaining <= URGENT_SEC
  const words = wordCount(text)
  return (
    <div className="kid-screen">
      <div className="shell">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
          <button className="btn btn-soft" style={{ width: 'auto', fontSize: 13, padding: '6px 12px' }} onClick={() => setLeaving(true)}>
            ← Leave
          </button>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: '#5A6172' }}>{words} {words === 1 ? 'word' : 'words'}</span>
          <span
            aria-live="polite"
            style={{
              fontVariantNumeric: 'tabular-nums',
              fontWeight: 800,
              fontSize: 18,
              padding: '4px 12px',
              borderRadius: 999,
              color: urgent ? '#B0432E' : '#003078',
              background: urgent ? '#FBE3DE' : '#EAF0FB',
            }}
          >
            {mmss(remaining)}
          </span>
        </div>
        {urgent && (
          <p style={{ textAlign: 'center', color: '#B0432E', fontSize: 12.5, fontWeight: 600, margin: '0 0 8px' }}>
            Under two minutes, start wrapping up your last thoughts.
          </p>
        )}

        <div className="panel" style={{ padding: '12px 14px', marginBottom: 10 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#8A7F6D', letterSpacing: 0.3 }}>YOUR PROMPT</p>
          <p style={{ margin: '5px 0 0', fontSize: 14.5, color: '#1C2230', lineHeight: 1.5 }}>{prompt.text}</p>
        </div>

        <textarea
          value={text}
          onChange={(e) => onType(e.target.value)}
          placeholder="Start writing your essay here…"
          autoFocus
          style={{
            width: '100%',
            minHeight: 320,
            resize: 'vertical',
            padding: '14px 16px',
            border: '1.6px solid #ECE4D8',
            borderRadius: 12,
            fontSize: 15.5,
            lineHeight: 1.6,
            color: '#1C2230',
            fontFamily: 'inherit',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        <div style={{ marginTop: 14 }}>
          {confirmSubmit ? (
            <div className="panel" style={{ padding: '14px 16px' }}>
              <p style={{ margin: '0 0 10px', fontSize: 14, color: '#1C2230' }}>
                Ready to turn in your essay? Nikki will read it and give you feedback.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => attempt && void finalize(attempt)}>
                  Turn it in
                </button>
                <button className="btn btn-soft" style={{ width: 'auto' }} onClick={() => setConfirmSubmit(false)}>
                  Keep writing
                </button>
              </div>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => setConfirmSubmit(true)}>
              Turn in essay
            </button>
          )}
        </div>
      </div>

      {leaving && (
        <div style={overlayStyle}>
          <div className="panel" style={{ padding: 20, maxWidth: 380, textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 6px' }}>Leave your essay?</h3>
            <p className="muted" style={{ fontSize: 13.5, margin: '0 0 14px' }}>
              Your timer keeps running while you’re away, and your writing is saved. You can come back and keep going
              as long as there’s time left.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button className="btn btn-soft" style={{ width: 'auto' }} onClick={() => setLeaving(false)}>
                Stay
              </button>
              <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => navigate(backToPrep)}>
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(28,34,48,.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  zIndex: 50,
}
