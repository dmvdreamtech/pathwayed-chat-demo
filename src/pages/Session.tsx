import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { getStudent, avatarModeOf, type Student } from '@/lib/students'
import { loadTranscript } from '@/lib/sessions'
import { subjectDisplayName } from '@/lib/subjects'
import { skillLabel, scopeBandForGrade, isScopeSubject } from '@/lib/lessonPath'
import { isCompositionSkill, pickWritingPrompt } from '@/lib/writingComposition'
import { useSessionChat, type ChatMessage } from '@/hooks/useSessionChat'
import { useCheckQuestion } from '@/hooks/useCheckQuestion'
import { CheckQuestionCard } from '@/components/CheckQuestionCard'
import { useAudioRecorder } from '@/hooks/useAudioRecorder'
import { useConversationMic } from '@/hooks/useConversationMic'
import { CallStage, type CallState } from '@/components/CallStage'
import { SessionWorkspace } from '@/components/SessionWorkspace'
import { NikkiFace } from '@/components/NikkiFace'
import { MathText } from '@/components/MathText'
import { NikkiMarkdown } from '@/components/chat/NikkiMarkdown'
import { getSkillNameBySlug, recordSessionMastery } from '@/lib/skills'
import { resolveFocusForSlug } from '@/lib/focusSkills'
import { speakWithNikki, stopNikkiSpeech } from '@/lib/voice'
import { getVoiceMuted, setVoiceMuted } from '@/lib/voicePrefs'
import { getAvatarLarge, isAvatarCompact, setAvatarLarge } from '@/lib/avatarSizePref'
import { stripMarkdownForTTS } from '@/lib/stripMarkdownForTTS'
import { transcribeAudio, NO_SPEECH_MESSAGE } from '@/lib/transcribe'
import { buildTranscriptionPrompt } from '@/lib/transcriptionPrompt'
import '@/styles/app-screens.css'

const VALID_SUBJECTS = new Set(['math', 'reading', 'writing', 'science', 'homework'])

// Speak in Nikki's ElevenLabs voice (falls back to the browser voice on
// failure). setSpeaking drives the avatar's speaking ring while audio plays.
// onBlocked (optional) fires when the browser refused all playback for lack of
// a user gesture — passed only for the entry greeting, where no gesture may
// exist yet (e.g. a hard reload straight into the session URL).
function speak(text: string, setSpeaking: (v: boolean) => void, onBlocked?: () => void) {
  void speakWithNikki(text, {
    onStart: () => setSpeaking(true),
    onEnd: () => setSpeaking(false),
    onBlocked,
  })
}

function stopSpeak(setSpeaking: (v: boolean) => void) {
  stopNikkiSpeech()
  setSpeaking(false)
}

/** Id of the last assistant message, or null — used to avoid auto-speaking a
 *  message that's already on screen when the session mounts. */
function lastAssistantId(msgs: ChatMessage[]): string | null {
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i].role === 'assistant') return msgs[i].id
  }
  return null
}

function makeGreeting(
  name: string,
  subject: string,
  focusLabel?: string | null,
  isHomework?: boolean,
  fromSat?: boolean,
  isComposition?: boolean,
): string {
  if (subject === 'homework' || isHomework) {
    const subjPhrase = subject === 'homework' ? '' : ` ${subjectDisplayName(subject).toLowerCase()}`
    return `Hi ${name}! I'm Nikki. Upload a photo or PDF of your${subjPhrase} homework using the panel on the right, and we'll work through it together. You can also just tell me what it's about.`
  }
  if (isComposition) {
    return `Hi ${name}! I'm Nikki. Today we're going to write a paragraph together. I've put a writing prompt in your writing space on the right, read it, give it your best try, and then tap "Share with Nikki." I'll tell you what's working and help you make it even stronger. Take your time, ready when you are!`
  }
  if (focusLabel) {
    const satPhrase = fromSat ? ` This came up in your SAT Math practice, so let's strengthen it.` : ''
    return `Hi ${name}! I'm Nikki. Today we're working on ${focusLabel}.${satPhrase} I might ask a quick question first to see what you already know, then we'll learn it together. Ready to start?`
  }
  return `Hi ${name}! I'm Nikki. I'm glad you're here. What are we working on in ${subjectDisplayName(subject).toLowerCase()} today? You can ask me a question, or use the workspace on the right to show me your work.`
}

interface ReadyState {
  student: Student
  initialMessages: ChatMessage[]
  focusLabel: string | null
  focusSlug: string | null
  transcriptKey: string
  homeworkMode: boolean
  /** Original writing prompt for a writing-composition lesson, else null. */
  writingPrompt: string | null
}

export function Session() {
  const { id, subject } = useParams<{ id: string; subject: string }>()
  const [searchParams] = useSearchParams()
  const focusSlug = searchParams.get('skill')
  const isHomework = searchParams.get('mode') === 'homework'
  const fromSat = searchParams.get('from') === 'sat'
  const navigate = useNavigate()
  const [ready, setReady] = useState<ReadyState | null>(null)

  useEffect(() => {
    if (!id || !subject || !VALID_SUBJECTS.has(subject)) {
      navigate('/students', { replace: true })
      return
    }
    // Transcript is keyed per skill (subject:skill) so each new lesson opens fresh
    // and re-entering the same skill resumes; homework/plain sessions key on subject.
    const transcriptKey = focusSlug ? `${subject}:${focusSlug}` : subject
    let active = true
    Promise.all([getStudent(id), loadTranscript(id, transcriptKey)]).then(async ([s, saved]) => {
      if (!active) return
      if (!s) {
        navigate('/students', { replace: true })
        return
      }
      // Invariant: K-2 skill lessons are audio-picture pre-reader content. The
      // chat can't render picture questions, so a pre-reader must never land here
      // as text — divert any k-2 skill lesson to the Practice audio-picture UI.
      // (SkillsBuilding already routes there; this guards every other entry.)
      if (focusSlug && !isHomework && scopeBandForGrade(s.grade) === 'k-2') {
        navigate(`/students/${id}/practice/${encodeURIComponent(focusSlug)}`, { replace: true })
        return
      }
      // Skills-building launches carry ?skill=<slug>; name it so the lesson is
      // focused (the diagnose-first prompt then checks that skill before teaching).
      const band = scopeBandForGrade(s.grade)
      // Prep skills (prep-*) carry their display name in the taxonomy (skills.name),
      // so resolve it there rather than through the K-12 scopeSequence label, which
      // doesn't know them and would leave the raw slug in Nikki's greeting.
      let focusLabel: string | null = null
      if (focusSlug?.startsWith('prep-')) {
        focusLabel = await getSkillNameBySlug(focusSlug)
        if (!active) return
      } else if (focusSlug && band && isScopeSubject(subject)) {
        focusLabel = skillLabel(band, subject, focusSlug)
      }
      // Writing-composition lessons run the writing studio: pick the original
      // prompt (stable per student+skill) shown in the writing space and coached
      // against by Nikki.
      const isComposition = subject === 'writing' && isCompositionSkill(focusSlug)
      const writingPrompt = isComposition && focusSlug ? pickWritingPrompt(focusSlug, s.id) : null
      const initialMessages: ChatMessage[] = saved.length
        ? saved.map((m, i) => ({ id: `saved-${i}`, role: m.role, content: m.content }))
        : [
            {
              id: 'greeting',
              role: 'assistant',
              content: makeGreeting(s.first_name, subject, focusLabel, isHomework, fromSat, isComposition),
            },
          ]
      setReady({ student: s, initialMessages, focusLabel, focusSlug, transcriptKey, homeworkMode: isHomework, writingPrompt })
    })
    return () => {
      active = false
    }
  }, [id, subject, focusSlug, isHomework, fromSat, navigate])

  if (!ready || !subject) {
    return (
      <div className="session">
        <div className="feed">
          <p className="muted">Loading…</p>
        </div>
      </div>
    )
  }

  return (
    <SessionView
      student={ready.student}
      subject={subject}
      initialMessages={ready.initialMessages}
      focusLabel={ready.focusLabel}
      focusSlug={ready.focusSlug}
      transcriptKey={ready.transcriptKey}
      homeworkMode={ready.homeworkMode}
      writingPrompt={ready.writingPrompt}
    />
  )
}

function SessionView({
  student,
  subject,
  initialMessages,
  focusLabel,
  focusSlug,
  transcriptKey,
  homeworkMode,
  writingPrompt,
}: {
  student: Student
  subject: string
  initialMessages: ChatMessage[]
  focusLabel: string | null
  focusSlug: string | null
  transcriptKey: string
  homeworkMode: boolean
  writingPrompt: string | null
}) {
  const navigate = useNavigate()
  const {
    messages,
    isLoading,
    sendMessage,
    sendImageTurn,
    checkRequested,
    clearCheckRequest,
    assistantTurns,
  } = useSessionChat({
    studentId: student.id,
    subject,
    childName: student.first_name,
    grade: student.grade,
    level: student.level,
    focusAreas: focusLabel ? [focusLabel] : [],
    focusSkill: focusSlug,
    writingPrompt,
    transcriptKey,
    initialMessages,
  })

  // Nikki's mid-lesson check questions. A missed one threads its misconception
  // nudge into the very next turn, so she works that specific mistake.
  const check = useCheckQuestion({
    student,
    focusSlug,
    checkRequested,
    clearCheckRequest,
    assistantTurns,
    isLoading,
    onAnswered: ({ nudge, summary }) => void sendMessage(summary, { misconceptionNudge: nudge }),
  })

  const [pane, setPane] = useState<'chat' | 'work'>('chat')
  // On wide screens the chat and workspace show side-by-side and the pane toggle
  // is hidden (see .panetabs @media <=900px), so `pane` stays 'chat'. Track the
  // breakpoint so the workspace counts as active/visible on desktop — otherwise
  // the MathLive field, which mounts only while the workspace is active, never
  // renders on desktop.
  const [isWide, setIsWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 901px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const onChange = () => setIsWide(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  // Nikki auto-speaks her responses by default; this mutes that. Seeded from and
  // written back to the app-wide voice-mute preference, so a child's "read aloud
  // off" choice carries between the lesson, the diagnostic, and practice.
  const [muted, setMuted] = useState(getVoiceMuted)
  const [speaking, setSpeaking] = useState(false)
  // True when the entry greeting could not autoplay (no user gesture yet, e.g.
  // a hard reload straight into this URL) — shows the tap-to-hear cue instead
  // of staying silent. In the normal tapped-through flow autoplay is allowed
  // and this never turns on.
  const [greetingBlocked, setGreetingBlocked] = useState(false)
  const [draft, setDraft] = useState('')
  const [showLeaveWarning, setShowLeaveWarning] = useState(false)
  const [niceWork, setNiceWork] = useState(false)
  // A fresh lesson opens with just the greeting (id 'greeting'); seed null so it
  // auto-speaks on entry. A resumed lesson opens from saved messages; seed the
  // last assistant id so resuming doesn't replay it.
  const spokenRef = useRef<string | null>(
    initialMessages.length === 1 && initialMessages[0].id === 'greeting'
      ? null
      : lastAssistantId(initialMessages),
  )
  const feedRef = useRef<HTMLDivElement>(null)

  // Nikki's avatar: large until the student first replies (her greeting shows
  // with the large view), then a compact header row so the chat fills the
  // pane. The child can switch back to large; that choice is kept per device.
  const [avatarLarge, setAvatarLargeState] = useState(getAvatarLarge)
  const conversationStarted = messages.some((m) => m.role === 'user')
  const avatarCompact = isAvatarCompact(conversationStarted, avatarLarge)
  const toggleAvatarSize = () => {
    const next = !avatarLarge
    setAvatarLargeState(next)
    setAvatarLarge(next)
  }

  // Voice input. Reading uses continuous "conversation mode" (tap once, stays
  // listening); other subjects use tap-to-talk. Both transcribe via Whisper and
  // send the text exactly like a typed message.
  const isReading = subject === 'reading'
  const recorder = useAudioRecorder()
  const [transcribing, setTranscribing] = useState(false)
  const [micError, setMicError] = useState('')

  // The most recent Nikki turn is the question the child is now answering; its
  // text lets the biasing prompt detect a numeric question and expect digits.
  const lastNikkiText = useMemo(
    () => [...messages].reverse().find((m) => m.role === 'assistant')?.content ?? '',
    [messages],
  )

  // Context-biasing hint for transcription: math framing, the child's name, this
  // lesson's vocabulary, and an explicit "expect a number" when the last question
  // was numeric, so short/soft utterances resolve to digits instead of a
  // hallucinated phrase ("277" heard as "New York City 7").
  const transcriptionPrompt = useMemo(
    () => buildTranscriptionPrompt({ childName: student.first_name, subject, focusLabel, lastNikkiText }),
    [student.first_name, subject, focusLabel, lastNikkiText],
  )

  const handleUtterance = (blob: Blob, mime: string) => {
    setTranscribing(true)
    setMicError('')
    transcribeAudio(blob, mime, transcriptionPrompt)
      .then(({ text, noSpeech }) => {
        // Silence, noise, or a hallucinated transcript: never send it to Nikki.
        if (noSpeech || !text) setMicError(NO_SPEECH_MESSAGE)
        else void sendMessage(text)
      })
      .catch(() => setMicError("Sorry, I couldn't hear that. Try again or type your message."))
      .finally(() => setTranscribing(false))
  }

  // Conversation mode pauses capturing while Nikki is thinking/speaking (turn-taking).
  const convoMic = useConversationMic({
    onUtterance: handleUtterance,
    isPaused: () => speaking || isLoading || transcribing,
  })

  useEffect(() => {
    const f = feedRef.current
    if (f) f.scrollTop = f.scrollHeight
  }, [messages, isLoading, check.question])

  // The feed changes height while the avatar grows or shrinks: keep the newest
  // message in view at the start and once the 0.32s transition has finished.
  useEffect(() => {
    const toBottom = () => {
      const f = feedRef.current
      if (f) f.scrollTop = f.scrollHeight
    }
    toBottom()
    const t = window.setTimeout(toBottom, 360)
    return () => window.clearTimeout(t)
  }, [avatarCompact])

  // Auto-speak each new completed Nikki response (unless muted). speakWithNikki
  // stops any prior audio first, so a newer message interrupts an older one.
  // Math/LaTeX is converted to speech-friendly text (no "backslash frac").
  useEffect(() => {
    if (muted || isLoading) return
    const last = messages[messages.length - 1]
    if (last && last.role === 'assistant' && last.content && spokenRef.current !== last.id) {
      spokenRef.current = last.id
      const spoken = stripMarkdownForTTS(last.content)
      // Only the entry greeting gets the blocked-playback cue: every later
      // message follows a user interaction, so autoplay is allowed by then.
      if (spoken) {
        speak(
          spoken,
          setSpeaking,
          last.id === 'greeting' ? () => setGreetingBlocked(true) : undefined,
        )
      }
    }
  }, [muted, isLoading, messages])

  // Tap-to-hear rescue for the blocked entry greeting. The tap itself is the
  // user gesture that unblocks audio, so this replay is allowed to play.
  const hearGreeting = () => {
    setGreetingBlocked(false)
    const greeting = messages.find((m) => m.id === 'greeting')
    const spoken = greeting ? stripMarkdownForTTS(greeting.content) : ''
    if (spoken) speak(spoken, setSpeaking)
  }

  useEffect(() => () => stopSpeak(setSpeaking), [])

  // When a recording finishes, transcribe it and send it like a typed message.
  useEffect(() => {
    if (!recorder.audioBlob || !recorder.mimeType) return
    let cancelled = false
    setTranscribing(true)
    setMicError('')
    transcribeAudio(recorder.audioBlob, recorder.mimeType, transcriptionPrompt)
      .then(({ text, noSpeech }) => {
        if (cancelled) return
        // Silence, noise, or a hallucinated transcript: never send it to Nikki.
        if (noSpeech || !text) setMicError(NO_SPEECH_MESSAGE)
        else void sendMessage(text)
      })
      .catch(() => {
        if (!cancelled) setMicError("Sorry, I couldn't hear that. Try again or type your message.")
      })
      .finally(() => {
        if (!cancelled) setTranscribing(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recorder.audioBlob, recorder.mimeType])

  // Surface a friendly message if mic permission is denied / unavailable.
  useEffect(() => {
    if (recorder.state === 'error' && recorder.error) setMicError(recorder.error)
  }, [recorder.state, recorder.error])
  useEffect(() => {
    if (convoMic.error) setMicError(convoMic.error)
  }, [convoMic.error])

  const toggleMic = () => {
    setMicError('')
    if (isReading) {
      // Conversation mode: tap once to start listening, tap again to stop.
      if (convoMic.active) convoMic.stop()
      else void convoMic.start()
    } else if (recorder.state === 'recording') {
      recorder.stopRecording()
    } else {
      void recorder.startRecording()
    }
  }

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m
      if (next) {
        // Muting: stop any speech in progress.
        stopSpeak(setSpeaking)
      } else {
        // Unmuting: don't replay the message already on screen — only new ones.
        spokenRef.current = lastAssistantId(messages)
      }
      setVoiceMuted(next) // persist app-wide (diagnostic/practice honor the same flag)
      return next
    })
  }

  const send = () => {
    const text = draft
    setDraft('')
    void sendMessage(text)
  }

  const returnToWelcome = () => navigate(`/students/${student.id}`)

  // Record WHAT THIS SESSION COVERED onto the session row (client-side under RLS).
  // It no longer writes mastery: completing a lesson is participation, and mastery
  // is claimed only from graded check questions. Best-effort — a failure here must
  // never block the child returning to their welcome.
  const recordSessionSummary = async () => {
    try {
      await recordSessionMastery({
        studentId: student.id,
        subject,
        grade: student.grade,
        messages: messages.map(({ role, content }) => ({ role, content })),
      })
    } catch (err) {
      console.error('session summary recording failed', err)
    }
  }

  // Mid-lesson exit (the ✕): nothing is completed, so warn before leaving.
  const attemptLeave = () => setShowLeaveWarning(true)
  const confirmLeave = () => {
    stopSpeak(setSpeaking)
    convoMic.stop()
    returnToWelcome()
  }

  // Practice-SAT Phase 2: completing a lesson on a focus skill resolves it (keyed
  // off the launch slug, so it's reliable even when the HS mastery signal isn't).
  // No-op for a non-focus lesson. Only on COMPLETION — leaving mid-lesson doesn't
  // count as addressing it.
  const resolveFocusIfAny = async () => {
    if (focusSlug) await resolveFocusForSlug(student.id, focusSlug)
  }

  // Completing the lesson (the "Done" button): a brief positive close, the session
  // summary, then a smooth auto-return. The write is awaited so it isn't cut off.
  // A completed lesson never shows the leave warning — nothing is lost.
  //
  // Finishing moves no mastery on its own. Whatever the child's check answers
  // earned was already recorded, question by question, as they answered them.
  const completeLesson = async () => {
    stopSpeak(setSpeaking)
    convoMic.stop()
    setNiceWork(true)
    await recordSessionSummary()
    await resolveFocusIfAny()
    window.setTimeout(returnToWelcome, 900)
  }

  const callState: CallState = isLoading ? 'thinking' : speaking ? 'speaking' : 'idle'
  const avatarMode = avatarModeOf(student)
  const recording = isReading
    ? convoMic.active
    : recorder.state === 'recording' || recorder.state === 'requesting'

  const visibleMessages = messages.filter((m) => m.content.length > 0)
  const last = messages[messages.length - 1]
  const showTyping = isLoading && (!last || last.role !== 'assistant' || last.content.length === 0)

  return (
    <div className="session">
      <div className="shead">
        <div className="who">
          <div className="s1">{subjectDisplayName(subject)}</div>
          <div className="s2">{student.first_name}</div>
        </div>
        <button
          className={`iconbtn ${muted ? 'muted' : ''}`}
          title={muted ? "Unmute Nikki's voice" : "Mute Nikki's voice"}
          aria-label={muted ? "Unmute Nikki's voice" : "Mute Nikki's voice"}
          aria-pressed={muted}
          onClick={toggleMute}
        >
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
            </svg>
          )}
        </button>
        <button className="iconbtn" title="Leave lesson" aria-label="Leave lesson" onClick={attemptLeave}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <button
          type="button"
          title="Finish this lesson"
          onClick={() => void completeLesson()}
          style={{
            flexShrink: 0,
            padding: '11px 20px',
            borderRadius: 999,
            border: 'none',
            background: 'var(--orange)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14.5,
            fontFamily: 'var(--body)',
            cursor: 'pointer',
          }}
        >
          Done
        </button>
      </div>

      <div className="panetabs">
        <button className={pane === 'chat' ? 'on' : ''} onClick={() => setPane('chat')}>
          Chat with Nikki
        </button>
        <button className={pane === 'work' ? 'on' : ''} onClick={() => setPane('work')}>
          Workspace
        </button>
      </div>

      <div className="work" data-pane={pane}>
        <div className="chatpane">
          <CallStage
            state={callState}
            mode={avatarMode}
            compact={avatarCompact}
            onToggle={conversationStarted ? toggleAvatarSize : undefined}
          />
          {/* Shown only when the entry greeting could not autoplay: hidden
              while muted (respect the mute switch) and once the conversation
              has moved on (messages beyond the greeting follow a gesture, so
              they autoplay fine). */}
          {greetingBlocked && !muted && messages.length === 1 && (
            <div style={{ textAlign: 'center' }}>
              <button type="button" className="hearcue" onClick={hearGreeting}>
                🔊 Tap to hear Nikki
              </button>
            </div>
          )}
          <div className="feed" ref={feedRef}>
            {visibleMessages.map((m) => (
              <div key={m.id} className={`msg ${m.role === 'assistant' ? 'nikki' : 'me'}`}>
                {m.role === 'assistant' ? (
                  <NikkiMarkdown content={m.content} />
                ) : (
                  <MathText content={m.content} />
                )}
              </div>
            ))}
            {/* Nikki's check question, sitting in the feed as one of her turns. */}
            {check.question && (
              <div className="msg nikki">
                <CheckQuestionCard
                  question={check.question}
                  selectedIndex={check.selectedIndex}
                  onPick={check.pick}
                />
              </div>
            )}
            {showTyping && (
              <div className="typing">
                <i />
                <i />
                <i />
              </div>
            )}
          </div>
          {(recording || transcribing || micError) && (
            <div className={`mic-status ${micError ? 'err' : ''}`}>
              {micError
                ? micError
                : transcribing
                  ? 'Transcribing…'
                  : isReading
                    ? '🎙️ Listening, say it out loud. Tap the mic to stop.'
                    : recorder.secondsLeft !== null
                      ? `Listening… ${recorder.secondsLeft}s left, tap the mic to stop`
                      : 'Listening… tap the mic to stop'}
            </div>
          )}
          <div className="composer">
            <button
              type="button"
              className={`mic ${recording ? 'rec' : ''}`}
              title={recording ? (isReading ? 'Stop listening' : 'Stop recording') : isReading ? 'Start talking with Nikki' : 'Speak to Nikki'}
              aria-label={recording ? (isReading ? 'Stop listening' : 'Stop recording') : isReading ? 'Start talking with Nikki' : 'Speak to Nikki'}
              aria-pressed={recording}
              disabled={!isReading && (transcribing || isLoading)}
              onClick={toggleMic}
            >
              {transcribing ? (
                <span className="mic-spin" aria-hidden="true" />
              ) : recording ? (
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              )}
            </button>
            <textarea
              rows={1}
              placeholder="Type to Nikki..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
            />
            <button className="send" onClick={send} disabled={!draft.trim() || isLoading}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
              </svg>
            </button>
          </div>
        </div>

        <SessionWorkspace
          subject={subject}
          childName={student.first_name}
          grade={student.grade}
          level={student.level}
          paneActive={pane === 'work' || isWide}
          homeworkMode={homeworkMode}
          writingPrompt={writingPrompt}
          onSendText={(t) => {
            setPane('chat')
            void sendMessage(t)
          }}
          onSendImage={(turn) => {
            setPane('chat')
            void sendImageTurn(turn)
          }}
        />
      </div>

      {showLeaveWarning && (
        <div className="feedback-overlay">
          <div className="feedback-card">
            <NikkiFace mode={avatarMode} size={84} />
            <h1 style={{ fontSize: 22, margin: '20px 0 4px' }}>Leave this lesson?</h1>
            <p className="muted" style={{ margin: '0 0 20px' }}>
              Leaving now will end this session, we haven’t finished this lesson yet.
            </p>
            <button type="button" className="btn btn-primary" onClick={() => setShowLeaveWarning(false)}>
              Keep going
            </button>
            <button
              type="button"
              className="link"
              style={{ display: 'block', margin: '12px auto 0' }}
              onClick={confirmLeave}
            >
              Leave anyway
            </button>
          </div>
        </div>
      )}

      {niceWork && (
        <div className="feedback-overlay">
          <div className="feedback-card">
            <NikkiFace mode={avatarMode} size={84} />
            <h1 style={{ fontSize: 23, margin: '20px 0 4px' }}>Nice work, {student.first_name}!</h1>
            <p className="muted" style={{ margin: 0 }}>Taking you back…</p>
          </div>
        </div>
      )}
    </div>
  )
}
