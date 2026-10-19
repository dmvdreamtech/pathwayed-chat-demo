import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { StaffShell } from '@/components/staff/StaffShell'
import { MathText } from '@/components/MathText'
import { PictureFigure } from '@/components/PictureFigure'
import { speakWithNikki } from '@/lib/voice'
import { spokenPictureItem } from '@/lib/pictureModel'
import { useAuth } from '@/context/AuthContext'
import {
  buildFlags,
  decideFix,
  finishBlocker,
  finishReview,
  loadFixes,
  loadFullReview,
  loadQueue,
  loadSample,
  queueStatus,
  reviewQuestion,
  startReview,
  type Choice,
  type FixRow,
  type QueueRow,
  type ReviewItem,
} from '@/lib/contentReview'

/**
 * /admin/review: a named reviewer approves content one skill at a time
 * (migration 0043). Open a skill and read the 5 questions the database drew at
 * random. All 5 clean publishes the skill; any flag sends the whole skill to
 * full review. Fixes to live questions are approved or rejected one at a time.
 * Platform admins only; the database refuses everyone else.
 */

const NAME_KEY = 'pe-reviewer-name'
const readName = () => {
  try {
    return localStorage.getItem(NAME_KEY) ?? ''
  } catch {
    return ''
  }
}
const saveName = (v: string) => {
  try {
    localStorage.setItem(NAME_KEY, v)
  } catch {
    /* private mode: the name just is not remembered */
  }
}

type View =
  | { kind: 'queue' }
  | { kind: 'sample'; skill: QueueRow; reviewId: string }
  | { kind: 'full'; skill: QueueRow }
  | { kind: 'fixes' }

function Choices({ choices }: { choices: Choice[] }) {
  return (
    <ol className="review-choices">
      {choices.map((c, i) => (
        <li key={i} className={c.correct ? 'review-correct' : undefined}>
          <MathText content={c.text} /> {c.correct ? <b>(key)</b> : <span className="muted staff-small">{c.misconception ?? 'no tag'}</span>}
        </li>
      ))}
    </ol>
  )
}

/**
 * A K-2 picture item as the child gets it: the stem is spoken, the tiles are
 * pictures. The reviewer hears it with the same voice and sees each tile with
 * its spoken label and the key.
 */
function PictureItem({ item }: { item: ReviewItem }) {
  const spoken = spokenPictureItem(item.stem, item.choices)
  return (
    <div className="kid-screen review-picture">
      <p>
        <button type="button" className="staff-btn staff-small" onClick={() => void speakWithNikki(spoken)}>
          Play the question
        </button>{' '}
        <button type="button" className="staff-btn staff-small" onClick={() => void speakWithNikki(item.solution)}>
          Play the feedback
        </button>
      </p>
      <p>
        <b>Spoken:</b> {item.stem}
      </p>
      {item.prompt && (
        <div className="picq">
          <div className="picq-prompt">
            <PictureFigure figure={item.prompt} place="prompt" />
          </div>
        </div>
      )}
      <div className="picq">
        <div className="picq-tiles" data-count={item.choices.length}>
          {item.choices.map((c, i) => (
            <div key={i} className={`picq-tile ${c.correct ? 'correct' : ''}`}>
              {c.tile ? <PictureFigure figure={c.tile} place="tile" label={c.text} /> : <span className="picq-num">{c.text}</span>}
              <span className="staff-small review-tile-label">
                {c.text} {c.correct ? <b>(key)</b> : null}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="staff-small">
        <b>Spoken feedback:</b> {item.solution}
      </p>
      <p className="muted staff-small">Difficulty: {item.difficulty}</p>
    </div>
  )
}

function Question({ item }: { item: ReviewItem }) {
  if (item.renderMode === 'audio_picture') return <PictureItem item={item} />
  return (
    <>
      {item.passageBody && (
        <details className="review-passage">
          <summary className="staff-small">Passage{item.passageTitle ? `: ${item.passageTitle}` : ''}</summary>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            <MathText content={item.passageBody} />
          </div>
        </details>
      )}
      <p>
        <MathText content={item.stem} />
      </p>
      <Choices choices={item.choices} />
      <p className="staff-small">
        <b>Solution:</b> <MathText content={item.solution} />
      </p>
      <p className="muted staff-small">Difficulty: {item.difficulty}</p>
    </>
  )
}

export function ContentReview() {
  const { user, loading } = useAuth()
  const [name, setName] = useState(readName)
  const [view, setView] = useState<View>({ kind: 'queue' })
  const [queue, setQueue] = useState<QueueRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [denied, setDenied] = useState(false)

  const refresh = useCallback(async () => {
    const r = await loadQueue()
    if (r.ok) setQueue(r.data)
    else if (r.reason === 'not_admin') setDenied(true)
    else setError('We could not load the review queue. Refreshing usually fixes it.')
  }, [])

  useEffect(() => {
    if (loading || !user) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- loads once the user is known
    void refresh()
  }, [loading, user, refresh])

  const shell = (body: React.ReactNode) => (
    <StaffShell>
      <div className="panel">{body}</div>
    </StaffShell>
  )
  if (!loading && !user) return shell(<p className="muted">Sign in with a platform admin account to review content.</p>)
  if (denied) return shell(<p className="muted">This page is for PathwayEd platform admins.</p>)
  if (!queue) return shell(<p className="muted">{error ?? 'Loading the review queue...'}</p>)

  const back = (msg?: string) => {
    setNotice(msg ?? null)
    setView({ kind: 'queue' })
    void refresh()
  }

  return (
    <StaffShell>
      <h1 className="greet" style={{ marginTop: 18 }}>
        Content review
      </h1>
      <p className="muted staff-small">
        Open a skill to read 5 questions drawn at random. If all 5 are clean, every passing draft in the skill is
        published under your name. If any is flagged, nothing is published and the whole skill goes to full review.
        Coverage is on <Link to="/admin/coverage">its own page</Link>.
      </p>
      <label className="staff-small" style={{ display: 'block', margin: '10px 0' }}>
        Your name (signed on every approval){' '}
        <input
          className="input"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            saveName(e.target.value)
          }}
          placeholder="First and last name"
          style={{ maxWidth: 260 }}
        />
      </label>
      {notice && <p className="staff-small" role="status">{notice}</p>}

      {view.kind === 'queue' && (
        <QueueView
          rows={queue}
          name={name}
          onOpen={async (row) => {
            setNotice(null)
            if (row.state === 'full_review') return setView({ kind: 'full', skill: row })
            const r = row.openReviewId ? { ok: true as const, data: row.openReviewId } : await startReview(row.skillId, name)
            if (!r.ok) return setNotice(r.message ?? 'Could not open that skill.')
            setView({ kind: 'sample', skill: row, reviewId: r.data })
          }}
          onFixes={() => setView({ kind: 'fixes' })}
        />
      )}
      {view.kind === 'sample' && <SampleView skill={view.skill} reviewId={view.reviewId} onDone={back} />}
      {view.kind === 'full' && <FullView skill={view.skill} name={name} onDone={back} />}
      {view.kind === 'fixes' && <FixesView name={name} onDone={back} />}
    </StaffShell>
  )
}

function QueueView({
  rows,
  name,
  onOpen,
  onFixes,
}: {
  rows: QueueRow[]
  name: string
  onOpen: (r: QueueRow) => void
  onFixes: () => void
}) {
  const noName = name.trim() === ''
  return (
    <div className="panel staff-activity">
      <p className="staff-small">
        <button type="button" className="btn" onClick={onFixes}>
          Review fixes to live questions
        </button>
      </p>
      {noName && <p className="muted staff-small">Enter your name above to open a skill.</p>}
      <table>
        <thead>
          <tr>
            <th scope="col">Skill</th>
            <th scope="col">Subject</th>
            <th scope="col">Grade</th>
            <th scope="col">Passing drafts</th>
            <th scope="col">Failing checks</th>
            <th scope="col">Status</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const canOpen = !noName && (r.state === 'open' || r.state === 'full_review' || r.drafts >= 5)
            return (
              <tr key={r.skillId}>
                <td className="sat-cov-name" title={r.slug}>
                  {r.name}
                </td>
                <td>{r.subject}</td>
                <td>{r.grade === 0 ? 'K' : (r.grade ?? '')}</td>
                <td>{r.drafts}</td>
                <td>{r.draftsFailing}</td>
                <td>{queueStatus(r)}</td>
                <td>
                  <button type="button" className="btn" disabled={!canOpen} onClick={() => onOpen(r)}>
                    {r.state === 'full_review' ? 'Review one by one' : r.state === 'open' ? 'Continue' : 'Open sample'}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function SampleView({ skill, reviewId, onDone }: { skill: QueueRow; reviewId: string; onDone: (msg?: string) => void }) {
  const [items, setItems] = useState<ReviewItem[] | null>(null)
  const [read, setRead] = useState<Record<string, boolean>>({})
  const [flagged, setFlagged] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    loadSample(reviewId).then((r) => {
      if (!active) return
      if (r.ok) setItems(r.data)
      else setErr(r.message ?? 'Could not load the sample.')
    })
    return () => {
      active = false
    }
  }, [reviewId])

  if (!items) return <p className="muted">{err ?? 'Loading the sample...'}</p>
  const ids = items.map((i) => i.id)
  const blocker = finishBlocker(ids, flagged, notes, read)
  const anyFlag = ids.some((id) => flagged[id])

  return (
    <div>
      <h2 className="staff-h2">{skill.name}: sample of 5</h2>
      {items.map((it, i) => (
        <div key={it.id} className="panel staff-activity">
          <p className="muted staff-small">
            Question {i + 1} of {items.length}
          </p>
          <Question item={it} />
          <p className="staff-small">
            <label>
              <input
                type="radio"
                name={`q-${it.id}`}
                checked={read[it.id] === true && !flagged[it.id]}
                onChange={() => {
                  setRead({ ...read, [it.id]: true })
                  setFlagged({ ...flagged, [it.id]: false })
                }}
              />{' '}
              Clean
            </label>{' '}
            <label>
              <input
                type="radio"
                name={`q-${it.id}`}
                checked={flagged[it.id] === true}
                onChange={() => setFlagged({ ...flagged, [it.id]: true })}
              />{' '}
              Flag
            </label>
          </p>
          {flagged[it.id] && (
            <textarea
              className="input"
              rows={2}
              placeholder="What is wrong (required)"
              value={notes[it.id] ?? ''}
              onChange={(e) => setNotes({ ...notes, [it.id]: e.target.value })}
              style={{ width: '100%' }}
            />
          )}
        </div>
      ))}
      {err && <p className="staff-small">{err}</p>}
      <p className="staff-small">{blocker ?? (anyFlag ? 'Finishing sends the whole skill to full review.' : 'Finishing publishes every passing draft in this skill.')}</p>
      <button
        type="button"
        className="btn btn-primary"
        disabled={busy || blocker !== null}
        onClick={async () => {
          setBusy(true)
          const r = await finishReview(reviewId, buildFlags(notes, flagged))
          setBusy(false)
          if (!r.ok) return setErr(r.message ?? 'Could not finish the review.')
          onDone(
            r.data.status === 'approved'
              ? `${skill.name}: approved, ${r.data.published} questions published.`
              : `${skill.name}: ${r.data.flagged} flagged, sent to full review.`,
          )
        }}
      >
        {anyFlag ? 'Send to full review' : 'Approve and publish'}
      </button>{' '}
      <button type="button" className="btn" onClick={() => onDone()}>
        Back (the sample stays the same)
      </button>
    </div>
  )
}

function FullView({ skill, name, onDone }: { skill: QueueRow; name: string; onDone: (msg?: string) => void }) {
  const [items, setItems] = useState<ReviewItem[] | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [err, setErr] = useState<string | null>(null)

  const load = useCallback(async () => {
    const r = await loadFullReview(skill.skillId)
    if (r.ok) setItems(r.data)
    else setErr(r.message ?? 'Could not load the drafts.')
  }, [skill.skillId])
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- loads the skill's drafts on open
    void load()
  }, [load])

  if (!items) return <p className="muted">{err ?? 'Loading drafts...'}</p>
  const act = async (id: string, approve: boolean) => {
    const r = await reviewQuestion(id, name, approve, notes[id] ?? '')
    if (!r.ok) return setErr(r.message ?? 'Could not save that decision.')
    setErr(null)
    if (approve) setItems(items.filter((i) => i.id !== id))
    else void load()
  }

  return (
    <div>
      <h2 className="staff-h2">
        {skill.name}: full review, {items.length} waiting
      </h2>
      <button type="button" className="btn" onClick={() => onDone()}>
        Back to the queue
      </button>
      {err && <p className="staff-small">{err}</p>}
      {items.map((it) => (
        <div key={it.id} className="panel staff-activity">
          {it.lastFlag && <p className="staff-small"><b>Flagged:</b> {it.lastFlag}</p>}
          {it.issues.length > 0 && <p className="staff-small"><b>Fails checks:</b> {it.issues.join(', ')}. Fix it in the content file first.</p>}
          <Question item={it} />
          <textarea
            className="input"
            rows={2}
            placeholder="Note (required to flag)"
            value={notes[it.id] ?? ''}
            onChange={(e) => setNotes({ ...notes, [it.id]: e.target.value })}
            style={{ width: '100%' }}
          />
          <p>
            <button type="button" className="btn btn-primary" disabled={it.issues.length > 0} onClick={() => act(it.id, true)}>
              Approve and publish
            </button>{' '}
            <button type="button" className="btn" disabled={(notes[it.id] ?? '').trim() === ''} onClick={() => act(it.id, false)}>
              Flag
            </button>
          </p>
        </div>
      ))}
    </div>
  )
}

function FixesView({ name, onDone }: { name: string; onDone: (msg?: string) => void }) {
  const [rows, setRows] = useState<FixRow[] | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    loadFixes().then((r) => {
      if (!active) return
      if (r.ok) setRows(r.data)
      else setErr(r.message ?? 'Could not load the fixes.')
    })
    return () => {
      active = false
    }
  }, [])

  if (!rows) return <p className="muted">{err ?? 'Loading fixes...'}</p>
  const act = async (id: string, approve: boolean) => {
    const r = await decideFix(id, name, approve, notes[id] ?? '')
    if (!r.ok) return setErr(r.message ?? 'Could not save that decision.')
    setErr(null)
    setRows(rows.filter((x) => x.draftId !== id))
  }
  const noName = name.trim() === ''

  return (
    <div>
      <h2 className="staff-h2">Fixes to live questions: {rows.length} waiting</h2>
      <p className="muted staff-small">
        Approving publishes the fix and retires the live question. Rejecting keeps the live question as it is.
      </p>
      <button type="button" className="btn" onClick={() => onDone()}>
        Back to the queue
      </button>
      {noName && <p className="muted staff-small">Enter your name above to decide fixes.</p>}
      {err && <p className="staff-small">{err}</p>}
      {rows.slice(0, 25).map((f) => (
        <div key={f.draftId} className="panel staff-activity">
          <p className="muted staff-small">
            {f.slug}: {f.reasons.join(', ')}. {f.changes}
          </p>
          <div className="review-compare">
            <div>
              <p className="staff-small"><b>Live now</b></p>
              <p><MathText content={f.original.stem} /></p>
              <Choices choices={f.original.choices} />
              <p className="staff-small"><MathText content={f.original.solution} /></p>
            </div>
            <div>
              <p className="staff-small"><b>Fix</b></p>
              <p><MathText content={f.draft.stem} /></p>
              <Choices choices={f.draft.choices} />
              <p className="staff-small"><MathText content={f.draft.solution} /></p>
            </div>
          </div>
          <textarea
            className="input"
            rows={2}
            placeholder="Note (required to reject)"
            value={notes[f.draftId] ?? ''}
            onChange={(e) => setNotes({ ...notes, [f.draftId]: e.target.value })}
            style={{ width: '100%' }}
          />
          <p>
            <button type="button" className="btn btn-primary" disabled={noName || f.draftIssues.length > 0} onClick={() => act(f.draftId, true)}>
              Approve fix
            </button>{' '}
            <button type="button" className="btn" disabled={noName || (notes[f.draftId] ?? '').trim() === ''} onClick={() => act(f.draftId, false)}>
              Reject
            </button>
          </p>
        </div>
      ))}
      {rows.length > 25 && <p className="muted staff-small">Showing 25 of {rows.length}. Decide these to see more.</p>}
    </div>
  )
}
