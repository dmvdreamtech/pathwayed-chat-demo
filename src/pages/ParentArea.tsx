import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/context/AuthContext'
import { avColor, gradeLabel, initials, levelLabel, listStudents, type Student } from '@/lib/students'
import { getLastActivity } from '@/lib/sessions'
import { ensureFreshReadiness, pathwayBandLabel, type ReadinessView } from '@/lib/readiness'
import { getStudentMastery, type StudentMasteryView } from '@/lib/skills'
import { masteryDisplay, subjectSummary } from '@/lib/masteryDisplay'
import { workingGradeNotice } from '@/lib/workingGradeCopy'
import { buildGradePosition, positionCopy, type SubjectPosition } from '@/lib/gradePosition'
import { fetchGradePositionInputs, fetchGrowthInputs, hasDiagnosticAttempts } from '@/lib/questions'
import {
  buildGrowth,
  growthCopy,
  milestoneLabel,
  shortDate,
  undatedNote,
  weekLabel,
  GROWTH_MAX_MILESTONES,
  type GrowthSummary,
} from '@/lib/growth'
import { readStatus } from '@/lib/readStatus'
import { getDisplayName } from '@/lib/profile'
import { subjectDisplayName } from '@/lib/subjects'
import { formatRelativeDay } from '@/lib/format'
import { TopMenu } from '@/components/TopMenu'
import { TestReadinessCard } from '@/components/TestReadinessCard'
import '@/styles/app-screens.css'

const SUBJECT_ACCENT: Record<string, string> = {
  math: 'var(--math)',
  reading: 'var(--reading)',
  writing: 'var(--writing)',
  science: 'var(--science)',
}
const accentFor = (s: string) => SUBJECT_ACCENT[s] ?? 'var(--grow)'

interface ChildData {
  student: Student
  readiness: ReadinessView
  mastery: StudentMasteryView
  lastActivity: string | null
  /** Completed the diagnostic. K-2 placement deliberately seeds no mastery, so
   *  for those children this is the only sign they have done anything at all. */
  placed: boolean
  positions: SubjectPosition[]
  /** The skills/evidence read behind `positions` failed. An empty panel would
   *  otherwise be indistinguishable from a child who has cleared nothing. */
  positionsFailed: boolean
  growth: GrowthSummary
  growthFailed: boolean
}

/**
 * The real parent dashboard (/parent). For every child of the logged-in parent
 * (students.parent_id = auth.uid()) it READS the engine outputs — readiness_scores
 * (Pathway score, per-subject readiness, strengths, gaps) and student_skill_mastery
 * (mastery by subject) — plus last activity. No recompute, no LLM, no mock data.
 */
export function ParentArea() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [children, setChildren] = useState<ChildData[]>([])
  const [loading, setLoading] = useState(true)
  // Captured at load time (not during render — keeps render pure) for the
  // relative "last activity" labels.
  const [now, setNow] = useState(0)
  // The load threw, or the children read itself failed. Without this an exception
  // left the page on "Loading…" for good, and a failed children read rendered
  // "No children yet", inviting a parent to re-add a child who already exists.
  const [pageFailed, setPageFailed] = useState(false)

  useEffect(() => {
    if (!user) return
    let active = true
    void (async () => {
      try {
        const kidsStatus = readStatus()
        const [kids, displayName] = await Promise.all([
          listStudents(user.id, kidsStatus),
          getDisplayName(user.id),
        ])
        const data = await Promise.all(
          kids.map(async (student) => {
            const [readiness, mastery, lastActivity, placed, gp, gw] = await Promise.all([
              ensureFreshReadiness(student.id),
              getStudentMastery(student.id, student.grade),
              getLastActivity(student.id),
              hasDiagnosticAttempts(student.id),
              fetchGradePositionInputs(student.id),
              fetchGrowthInputs(student.id),
            ])
            const positions = buildGradePosition({
              grade: student.grade,
              subjects: ['math', 'reading', 'writing'],
              skills: gp.skills,
              evidence: gp.evidence,
            })
            const growth = buildGrowth(gw.attempts, gw.skills, new Date())
            // The 'sat' row that ensureFreshReadiness just wrote is read by
            // TestReadinessCard, which owns the SAT row on this surface now.
            return {
              student,
              readiness,
              mastery,
              lastActivity,
              placed,
              positions,
              positionsFailed: gp.loadFailed,
              growth,
              growthFailed: gw.loadFailed,
            }
          }),
        )
        if (!active) return
        setName(displayName)
        setChildren(data)
        setPageFailed(kidsStatus.failed)
        setNow(Date.now())
        setLoading(false)
      } catch (err) {
        console.error('parent dashboard load failed', err)
        if (!active) return
        setPageFailed(true)
        setLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [user])

  return (
    <div className="kid-screen">
      <div className="shell">
        <TopMenu />
        <h1 className="greet" style={{ marginTop: 18 }}>
          Parent dashboard
        </h1>
        <p className="muted">{name ? `Signed in as ${name}.` : "Your children's progress."}</p>

        <div style={{ marginTop: 20 }}>
          {loading ? (
            <div className="panel">
              <p className="muted">Loading…</p>
            </div>
          ) : pageFailed ? (
            /* NOT "no children yet". We could not read them, which is a different
               thing to tell a parent. */
            <div className="panel">
              <p className="muted">
                We could not load your children's progress right now. Refreshing usually fixes it.
              </p>
            </div>
          ) : children.length === 0 ? (
            <div className="panel">
              <p className="muted">No children yet. Add one to get started.</p>
            </div>
          ) : (
            children.map((c, i) => <ChildPanel key={c.student.id} data={c} index={i} now={now} />)
          )}
        </div>

        {/* The "More insights" placeholder claimed practice history was not stored.
            That was false: question_attempts has carried dated history since
            migration 0004. Rather than replace one vague promise with another, the
            panel is gone until the real panels land (test trajectory, grade-level
            position, growth over time). */}

        <button className="btn btn-soft" onClick={() => navigate('/children/new')}>
          + Add a child
        </button>
        <button className="btn btn-navy" style={{ marginTop: 12 }} onClick={() => navigate('/settings')}>
          Settings
        </button>
      </div>
    </div>
  )
}

/**
 * GROWTH OVER TIME. Two shapes: below the gate we say what is missing, above it
 * we show measured weekly accuracy and the dated milestones behind it.
 *
 * Every number comes from graded question_attempts. Nothing here reads the legacy
 * self-rating ramp or a mastery snapshot, and no date is taken from a stamped
 * column, because those record when a recompute ran rather than when a child did
 * something (see growth.ts).
 */
function GrowthPanel({ growth, firstName }: { growth: GrowthSummary; firstName: string }) {
  const copy = growthCopy(growth, firstName)
  const shown = growth.milestones.slice(0, GROWTH_MAX_MILESTONES)
  const moreDated = growth.milestones.length - shown.length
  const undated = undatedNote(growth, firstName)

  return (
    <>
      <p className="gw-headline">{copy.headline}</p>
      {copy.detail && <p className="gw-detail">{copy.detail}</p>}

      {growth.gateMet && (
        <div className="gw-weeks">
          {growth.weeks.map((w) => (
            <div key={w.start} className="gw-row">
              <span className="gw-week">{weekLabel(w)}</span>
              <span className={`gw-track ${w.percent == null ? 'gw-empty' : ''}`}>
                {w.percent != null && <i style={{ width: `${w.percent}%` }} />}
              </span>
              <span className="gw-count">
                {w.percent == null ? (
                  'No practice'
                ) : (
                  <>
                    <span className="gw-pct">{w.percent}%</span> of {w.attempts}
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      {shown.length > 0 && (
        <div className="gw-ms">
          {shown.map((m) => (
            <div key={m.skillId} className="gw-ms-row">
              <span className="gw-ms-dot" style={{ background: accentFor(m.subject) }} />
              <span>{milestoneLabel(m)}</span>
              <span className="gw-ms-date">{shortDate(m.date)}</span>
            </div>
          ))}
        </div>
      )}

      {(moreDated > 0 || undated) && (
        <p className="gp-note">
          {moreDated > 0 &&
            `${firstName} has cleared ${moreDated} more ${moreDated === 1 ? 'skill' : 'skills'} before these. `}
          {undated}
        </p>
      )}

      {growth.gateMet && (
        <p className="gp-note">
          Each week counts the questions {firstName} answered that week and how many were right.
          Milestone dates are the day the work itself cleared the bar, which is 70% or better over
          at least 5 questions.
        </p>
      )}
    </>
  )
}

function ChildPanel({ data, index, now }: { data: ChildData; index: number; now: number }) {
  const navigate = useNavigate()
  const {
    student,
    readiness,
    mastery,
    lastActivity,
    placed,
    positions,
    positionsFailed,
    growth,
    growthFailed,
  } = data
  const pathway = readiness.pathway
  // A read error or a thrown recompute. Distinct from having no evidence: a child
  // with NO readiness row at all has not been measured yet, which is a true and
  // ordinary state, so only an unreadable EXISTING row counts as a failure here.
  const loadFailed = readiness.loadFailed || (!!pathway && pathway.measuredSkills == null)
  const hasActivity = readiness.hasAny || mastery.hasAny || !!lastActivity || placed
  // Shown only once the child's earned working grade has overtaken their real
  // grade. Consent (above_grade_ok) decides the FRAMING, never the serving.
  const promotion = workingGradeNotice(student)

  // Mastery-by-subject collapse. Collapsed by default so the panel opens clean;
  // the header still shows a "N of M mastered" summary without expanding.
  const [openSubjects, setOpenSubjects] = useState<Set<string>>(new Set())
  const toggleSubject = (subject: string) =>
    setOpenSubjects((prev) => {
      const next = new Set(prev)
      if (next.has(subject)) next.delete(subject)
      else next.add(subject)
      return next
    })

  return (
    <div className="panel">
      <div className="pd-head">
        <div className="pd-av" style={{ background: avColor(index) }}>
          {initials(student.first_name)}
        </div>
        <div className="pd-id">
          <div className="pd-name">{student.first_name}</div>
          <div className="pd-sub">
            {gradeLabel(student.grade)} · {levelLabel(student.level)}
          </div>
        </div>
        {/* THREE states, never two. A score is shown ONLY when graded evidence
            stands behind it; with no measured skills we say "not measured yet",
            never a 0 (a child who has not answered anything has not scored badly).
            A failed read is the third state and must never be dressed up as
            having nothing to report. */}
        {loadFailed ? (
          <div className="pd-score pd-score-unmeasured">
            <span className="pd-score-cap">Pathway · could not load</span>
          </div>
        ) : pathway && pathway.measuredSkills != null && pathway.measuredSkills > 0 ? (
          <div className="pd-score">
            <span className="pd-score-num">{pathway.score}</span>
            <span className="pd-score-cap">Pathway · {pathwayBandLabel(pathway.score)}</span>
          </div>
        ) : (
          <div className="pd-score pd-score-unmeasured">
            <span className="pd-score-cap">Pathway · not measured yet</span>
          </div>
        )}
      </div>

      {!hasActivity ? (
        <p className="empty-progress">
          No activity yet. When {student.first_name} starts practicing, their progress will show
          here.
        </p>
      ) : (
        <>
          {promotion && (
            <div className="pd-section">
              <div className="pd-label">Moving up</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>{promotion.headline}</p>
              {promotion.detail && (
                <p className="muted" style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.5 }}>
                  {promotion.detail}
                </p>
              )}
            </div>
          )}
          {/* A failed read shows the panel with an honest message. Hiding it would
              have said, by omission, that there was nothing to report. */}
          {positionsFailed && (
            <div className="pd-section">
              <div className="pd-label">Grade level by subject</div>
              <p className="empty-progress">
                We could not load this right now. Refreshing usually fixes it.
              </p>
            </div>
          )}
          {!positionsFailed && positions.length > 0 && (
            <div className="pd-section">
              <div className="pd-label">Grade level by subject</div>
              {positions.map((p) => {
                const copy = positionCopy(p, student.first_name, subjectDisplayName(p.subject))
                return (
                  <div key={p.subject} className="gp-row">
                    <div className="subj-head">
                      <span className="dot" style={{ background: accentFor(p.subject) }} />
                      <span className="subj-name">{subjectDisplayName(p.subject)}</span>
                      {p.workingGrade != null && (
                        <span className="gp-badge">
                          {p.workingGrade === 0 ? 'Kindergarten' : `Grade ${p.workingGrade}`}
                        </span>
                      )}
                    </div>
                    <p className="gp-headline">{copy.headline}</p>
                    {copy.context && <p className="gp-line">{copy.context}</p>}
                    {copy.next && <p className="gp-line">{copy.next}</p>}
                  </div>
                )
              })}
              <p className="gp-note">
                This counts the skills {student.first_name} has cleared at each grade, which means
                70% or better over at least 5 questions. It is not a grade-equivalent score or a
                grade-level test result.
              </p>
            </div>
          )}

          {/* "Placement by subject" removed. It read the DIAGNOSTIC only, banded to
              k-2/3-5/6-8/9-12 rather than a grade, never updated as the child
              practiced, and could rest on a single answered question. It also
              softened an above-grade result to "On grade level" when consent was
              off, which sitting directly under counted facts read as a
              contradiction rather than as tact. Grade level by subject reports the
              same thing from graded evidence. The one thing placement had that a
              count does not, the next-step sentence, now lives in positionCopy.
              getSubjectPlacements and computeLevel are untouched: the diagnostic
              still drives initial skill selection. */}

          {/* "Readiness by subject" removed. It was the same computation as the
              test-readiness card lower down, rendered as a bare percentage with none
              of that card's framing, so the page showed one number twice and the
              weaker presentation first. */}

          {pathway && (
            <div className="pd-section">
              <div className="pd-label">Strengths</div>
              {loadFailed ? (
                <p className="empty-progress">
                  We could not load this right now. Nothing is wrong with {student.first_name}'s
                  progress, we just could not read it. Refreshing usually fixes it.
                </p>
              ) : pathway.measuredSkills === 0 ? (
                <p className="empty-progress">
                  Not measured yet. Strengths appear once {student.first_name} has answered
                  enough questions on a skill for us to be sure, which is 70% or better over at
                  least 5 questions.
                </p>
              ) : pathway.strengths.length > 0 ? (
                <div className="subject-chips">
                  {pathway.strengths.map((sk) => (
                    <span
                      key={sk.slug}
                      className="chip"
                      style={{ color: accentFor(sk.subject), borderColor: accentFor(sk.subject) }}
                    >
                      {sk.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="empty-progress">
                  No skill has cleared the bar yet. Keep practicing and they will appear here.
                </p>
              )}
            </div>
          )}

          {pathway && (
            <div className="pd-section">
              <div className="pd-label">Areas needing support</div>
              {loadFailed ? (
                <p className="empty-progress">
                  We could not load this right now. Refreshing usually fixes it.
                </p>
              ) : pathway.measuredSkills === 0 ? (
                <p className="empty-progress">
                  Not measured yet. We only flag a skill once {student.first_name} has actually
                  answered questions on it, so nothing here is a guess.
                </p>
              ) : pathway.gaps.length > 0 ? (
                <div className="subject-chips">
                  {pathway.gaps.map((sk) => (
                    <span
                      key={sk.slug}
                      className="chip"
                      style={{ color: 'var(--orange)', borderColor: 'var(--orange)' }}
                    >
                      {sk.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="empty-progress">
                  Nothing flagged, {student.first_name} is doing well across the board.
                </p>
              )}
            </div>
          )}

          <div className="pd-section">
            <div className="pd-label">Growth over time</div>
            {growthFailed ? (
              <p className="empty-progress">
                We could not load this right now. Refreshing usually fixes it.
              </p>
            ) : (
              <GrowthPanel growth={growth} firstName={student.first_name} />
            )}
          </div>

          {mastery.hasAny && (
            <div className="pd-section">
              <div className="pd-label">Mastery by subject</div>
              <p className="mastery-key">
                These come from the questions {student.first_name} has actually answered.{' '}
                <strong>Advanced</strong> means 70% or better over at least 5 questions, so we move on.{' '}
                <strong>Mastered</strong> means 85% or better over at least 8 questions, checked again a few
                days later to be sure it stuck. Where we have not asked enough questions yet, we say so
                instead of showing a score.
              </p>
              {mastery.bySubject.map((group) => {
                const open = openSubjects.has(group.subject)
                return (
                  <div key={group.subject} className="subj-group">
                    <button
                      type="button"
                      className="subj-head subj-toggle"
                      aria-expanded={open}
                      onClick={() => toggleSubject(group.subject)}
                    >
                      <span className="dot" style={{ background: accentFor(group.subject) }} />
                      <span className="subj-name">{subjectDisplayName(group.subject)}</span>
                      <span className="subj-summary">{subjectSummary(group.skills)}</span>
                      <svg
                        className={`chev ${open ? 'open' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {open &&
                      group.skills.map((sk) => {
                        const d = masteryDisplay(sk)
                        return (
                          <div key={sk.skill_id} className="skill-row">
                            <div className="skill-top">
                              <span className="skill-name">{sk.name}</span>
                              <span className="skill-right">
                                <span className={`skill-state ${d.state}`}>{d.label}</span>
                                {/* No percentage without evidence: a number here would
                                    imply a claim we have not earned. */}
                                {d.percent != null && <span className="skill-pct">{d.percent}%</span>}
                              </span>
                            </div>
                            {d.percent != null && (
                              <div className="bar">
                                <i
                                  style={{
                                    width: `${d.percent}%`,
                                    background: accentFor(group.subject),
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        )
                      })}
                  </div>
                )
              })}
            </div>
          )}

          {/* HSPT, ISEE and SAT in one read-only card. It owns the SAT row and
              the above-grade consent gate that used to sit here, so SatReadiness
              is no longer mounted standalone and SAT renders exactly once. */}
          <TestReadinessCard studentId={student.id} audience="parent" />

          <div className="stat-row">
            <span className="muted">Last activity</span>
            <b>{formatRelativeDay(lastActivity, now)}</b>
          </div>
        </>
      )}

      {/* Reassessment layers on top of existing mastery (earned mastery is kept;
          new/higher-band skills get re-placed), then the path picks up from there. */}
      <button
        type="button"
        className="btn btn-soft"
        style={{ marginTop: 14 }}
        onClick={() => navigate(`/students/${student.id}/diagnostic?fresh=1&return=/parent`)}
      >
        Reassess {student.first_name}’s level
      </button>
    </div>
  )
}
