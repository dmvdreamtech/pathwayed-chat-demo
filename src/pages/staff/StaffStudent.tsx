import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { StaffGate } from '@/components/staff/StaffGate'
import { StaffShell } from '@/components/staff/StaffShell'
import { SHOW_TEST_SCORES_TAB, TestScoresTab } from '@/components/staff/TestScoresTab'
import { gradeLabel } from '@/lib/students'
import {
  RECENT_WINS_DAYS,
  STUCK_MIN_ANSWERS,
  WORKING_ON_DAYS,
  buildActivity,
  buildCards,
  buildSubjectGroups,
  formatDateKey,
  formatLastActive,
  formatMinutes,
  loadStudentProgress,
  rightOf,
  subjectLabel,
  type CardItem,
  type StudentProgressData,
} from '@/lib/staffProgress'

export function StaffStudent() {
  return (
    <StaffGate>
      <StaffStudentInner />
    </StaffGate>
  )
}

const CARD_ITEMS = 3

function StaffStudentInner() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  // Keyed by the student it was loaded for, so moving between students never
  // shows the previous student's progress while the next one loads.
  const [loaded, setLoaded] = useState<{ id: string; data: StudentProgressData | null } | null>(null)
  const [tab, setTab] = useState<'progress' | 'scores'>('progress')
  const now = useMemo(() => new Date(), [])

  useEffect(() => {
    let active = true
    loadStudentProgress(id)
      .then((d) => {
        if (active) setLoaded({ id, data: d })
      })
      .catch((e: unknown) => {
        console.error('[staff] student progress failed', e)
        if (active) setLoaded({ id, data: null })
      })
    return () => {
      active = false
    }
  }, [id])

  const current = loaded?.id === id ? loaded : null
  const data = current?.data ?? null
  const failed = current !== null && current.data === null

  const back = (
    <button type="button" className="link staff-back" onClick={() => navigate('/staff')}>
      <ArrowLeft size={16} aria-hidden /> All students
    </button>
  )

  if (failed) {
    return (
      <StaffShell>
        {back}
        <div className="panel">
          <p className="muted">We could not load this student right now. Refreshing usually fixes it.</p>
        </div>
      </StaffShell>
    )
  }
  if (!data) {
    return (
      <StaffShell>
        {back}
        <div className="panel">
          <p className="muted">Loading progress...</p>
        </div>
      </StaffShell>
    )
  }
  if (!data.profile) {
    return (
      <StaffShell>
        {back}
        <div className="panel">
          <p className="muted">
            This student is not available to you. They may be at a different school, or no longer
            covered by your school.
          </p>
        </div>
      </StaffShell>
    )
  }

  const p = data.profile
  const hasActivity = data.attempts.length > 0

  return (
    <StaffShell>
      {back}

      <div className="panel staff-header">
        <h1 className="staff-name">{p.first_name}</h1>
        <p className="muted staff-sub">
          {gradeLabel(p.grade)}
          {p.email ? ` · ${p.email}` : ''}
        </p>
        <div className="staff-stats">
          <div>
            <span className="staff-label">Last active</span>
            <span className="staff-stat">{formatLastActive(p.last_active_at, now)}</span>
          </div>
          <div>
            <span className="staff-label">Days active this month</span>
            <span className="staff-stat">{p.days_active_this_month}</span>
          </div>
        </div>
      </div>

      {SHOW_TEST_SCORES_TAB && (
        <div className="staff-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'progress'} onClick={() => setTab('progress')}>
            Progress
          </button>
          <button type="button" role="tab" aria-selected={tab === 'scores'} onClick={() => setTab('scores')}>
            Test scores
          </button>
        </div>
      )}

      {SHOW_TEST_SCORES_TAB && tab === 'scores' ? (
        <TestScoresTab />
      ) : !hasActivity ? (
        <div className="panel">
          <p className="muted">
            {p.last_active_at ? 'No check questions answered yet.' : 'No tutoring activity yet.'}{' '}
            Progress shows here once {p.first_name} answers check questions in a tutoring session.
          </p>
        </div>
      ) : (
        <ProgressTab data={data} now={now} />
      )}
    </StaffShell>
  )
}

function ProgressTab({ data, now }: { data: StudentProgressData; now: Date }) {
  const cards = buildCards(data.mastery, data.attempts, data.skills, now)
  const groups = buildSubjectGroups(data.mastery, data.attempts, data.skills)
  const activity = buildActivity(data.attempts, data.skills)

  return (
    <>
      <div className="staff-cards">
        <Card
          title="Working on"
          caption={`Practiced in the last ${WORKING_ON_DAYS} days`}
          items={cards.workingOn}
          empty={`No skills practiced in the last ${WORKING_ON_DAYS} days.`}
          tone="work"
        />
        <Card
          title="Stuck on"
          caption={`${STUCK_MIN_ANSWERS} or more questions, under 70% right`}
          items={cards.stuckOn}
          empty="Nothing stuck right now."
          tone="stuck"
        />
        <Card
          title="Recent wins"
          caption={`Last ${RECENT_WINS_DAYS} days`}
          items={cards.recentWins}
          empty={`No new wins in the last ${RECENT_WINS_DAYS} days.`}
          tone="win"
        />
      </div>

      <h2 className="staff-h2">Skills by subject</h2>
      <div className="staff-subjects">
        {groups.map((g) => (
          <div key={g.subject} className="panel staff-subject">
            <h3>{g.label}</h3>
            {g.skills.length === 0 ? (
              <p className="muted staff-small">No {g.label} practice yet.</p>
            ) : (
              <ul className="staff-skill-list">
                {g.skills.map((s) => (
                  <li key={s.skillId}>
                    <span className="staff-skill-name">{s.skillName}</span>
                    <span className={`staff-level staff-level-${s.status}`}>{s.statusLabel}</span>
                    {s.detail && <span className="staff-skill-detail">{s.detail}</span>}
                  </li>
                ))}
              </ul>
            )}
            {g.notStarted > 0 && (
              <p className="muted staff-small">
                {g.notStarted} more {g.notStarted === 1 ? 'skill' : 'skills'} placed, not practiced yet.
              </p>
            )}
          </div>
        ))}
      </div>

      <h2 className="staff-h2">Recent activity</h2>
      <div className="panel staff-activity">
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Subject</th>
              <th scope="col">Time on check questions</th>
              <th scope="col">Check questions</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((a) => (
              <tr key={`${a.dateKey}-${a.subject}`}>
                <td>{formatDateKey(a.dateKey)}</td>
                <td>{a.subject === 'other' ? 'Other' : subjectLabel(a.subject)}</td>
                <td>{a.timeMs == null ? 'Not timed' : formatMinutes(a.timeMs)}</td>
                <td>{rightOf(a.right, a.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted staff-small">
          Days with check questions, by subject. Time counts how long answers took, up to 5 minutes
          per question.
        </p>
      </div>
    </>
  )
}

function Card({
  title,
  caption,
  items,
  empty,
  tone,
}: {
  title: string
  caption: string
  items: CardItem[]
  empty: string
  tone: 'work' | 'stuck' | 'win'
}) {
  const shown = items.slice(0, CARD_ITEMS)
  const more = items.length - shown.length
  return (
    <section className={`panel staff-card staff-card-${tone}`} aria-label={title}>
      <h3>{title}</h3>
      <p className="staff-caption">{caption}</p>
      {shown.length === 0 ? (
        <p className="muted staff-small">{empty}</p>
      ) : (
        <ul>
          {shown.map((c) => (
            <li key={c.skillId}>
              <span className="staff-card-skill">{c.skillName}</span>
              <span className="staff-card-meta">
                {subjectLabel(c.subject)} · {c.detail}
                {c.tag && <span className="staff-tag">{c.tag}</span>}
              </span>
            </li>
          ))}
        </ul>
      )}
      {more > 0 && <p className="muted staff-small">and {more} more</p>}
    </section>
  )
}
