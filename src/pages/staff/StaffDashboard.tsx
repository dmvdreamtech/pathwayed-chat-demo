import { useEffect, useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router'
import { Search } from 'lucide-react'
import { StaffGate } from '@/components/staff/StaffGate'
import { StaffShell } from '@/components/staff/StaffShell'
import { gradeLabel } from '@/lib/students'
import { searchStaffStudents, staffDisplayName, type StaffStudentRow } from '@/lib/staffProgress'
import { loadDashboard, type DashboardView } from '@/lib/staffDashboard'

const DEBOUNCE_MS = 250
/** Search results shown on the dashboard; the full list is a link away. */
const QUICK_RESULTS = 8

/**
 * /staff: the staff dashboard. Search at the top, then this week's most active
 * students, recent wins, students stuck right now, and a school snapshot, all
 * counted by the database for the staff member's own school
 * (staff_dashboard, migration 0039). The full sortable list is /staff/students.
 */
export function StaffDashboard() {
  return (
    <StaffGate>
      <StaffDashboardInner />
    </StaffGate>
  )
}

function StaffDashboardInner() {
  const [view, setView] = useState<DashboardView | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    loadDashboard()
      .then((v) => {
        if (active) setView(v)
      })
      .catch((e: unknown) => {
        console.error('[staff] dashboard failed', e)
        if (active) setFailed(true)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <StaffShell>
      <h1 className="greet" style={{ marginTop: 18 }}>
        Student progress
      </h1>
      <p className="muted">
        Tutoring progress for students at your school. Read only.{' '}
        <Link to="/staff/students">See all students</Link>
        {' · '}
        <Link to="/staff/program">What students learn</Link>
      </p>

      <QuickSearch />

      {failed ? (
        <div className="panel">
          <p className="muted">We could not load the dashboard right now. Refreshing usually fixes it.</p>
        </div>
      ) : !view ? (
        <div className="panel">
          <p className="muted">Loading...</p>
        </div>
      ) : view.snapshot.students === 0 ? (
        <div className="panel">
          <p className="muted">No students from your school have signed in to tutoring yet.</p>
        </div>
      ) : (
        <>
          <div className="panel staff-snapshot">
            <span className="staff-label">School snapshot</span>
            <span className="staff-snapshot-line">{view.snapshot.activeLine}</span>
            <span className="staff-snapshot-line">{view.snapshot.masteredLine}</span>
          </div>

          <div className="staff-dash-grid">
            <DashCard
              title="Most active this week"
              caption={view.weekLabel}
              empty="No students have been active yet this week."
              items={view.mostActive.map((s) => ({ key: s.studentId, studentId: s.studentId, main: s.name, sub: s.detail }))}
            />
            <DashCard
              title="Recent wins"
              caption="Skills reaching Ready to move on or Mastered in the last 14 days"
              empty="No new wins in the last 14 days."
              items={view.recentWins.map((w, i) => ({
                key: `${w.studentId}-${i}`,
                studentId: w.studentId,
                main: w.name,
                sub: w.skill,
                tag: (
                  <span className={`staff-level staff-level-${w.level}`}>
                    {w.label}, {w.date}
                  </span>
                ),
              }))}
            />
            <DashCard
              title="Stuck right now"
              caption="Under 70% right after 5 or more graded questions, worst first"
              empty="Nobody is stuck right now."
              items={view.stuck.map((s) => ({
                key: s.studentId,
                studentId: s.studentId,
                main: s.name,
                sub: `${s.skill}: ${s.detail}`,
              }))}
            />
          </div>
        </>
      )}
    </StaffShell>
  )
}

function DashCard({
  title,
  caption,
  empty,
  items,
}: {
  title: string
  caption: string
  empty: string
  items: { key: string; studentId: string; main: string; sub: string; tag?: ReactNode }[]
}) {
  const navigate = useNavigate()
  return (
    <section className="panel staff-dash-card">
      <h2 className="staff-h2" style={{ marginTop: 0 }}>
        {title}
      </h2>
      <p className="muted staff-small">{caption}</p>
      {items.length === 0 ? (
        <p className="muted">{empty}</p>
      ) : (
        <ul className="staff-dash-list">
          {items.map((it) => (
            <li key={it.key}>
              <button type="button" className="staff-dash-item" onClick={() => navigate(`/staff/students/${it.studentId}`)}>
                <span className="staff-dash-main">{it.main}</span>
                <span className="staff-dash-sub">{it.sub}</span>
                {it.tag}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/** Results as you type; clicking one opens the student page. */
function QuickSearch() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ q: string; rows: StaffStudentRow[] } | null>(null)

  useEffect(() => {
    const q = query.trim()
    if (!q) return
    let active = true
    const timer = setTimeout(() => {
      searchStaffStudents(q, 'recent')
        .then((rows) => {
          if (active) setResults({ q, rows })
        })
        .catch((e: unknown) => console.error('[staff] search failed', e))
    }, DEBOUNCE_MS)
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [query])

  const q = query.trim()
  const current = q && results?.q === q ? results.rows : null

  return (
    <div className="staff-quicksearch">
      <div className="staff-search">
        <Search className="staff-search-icon" size={18} aria-hidden />
        <input
          className="input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by first or last name, grade, or email"
          aria-label="Search students by first or last name, grade, or email"
          autoFocus
        />
      </div>
      {q && (
        <div className="panel staff-quick-results" role="region" aria-label="Search results">
          {!current ? (
            <p className="muted">Searching...</p>
          ) : current.length === 0 ? (
            <p className="muted">No students match "{q}". Try a first or last name, or a grade like 9.</p>
          ) : (
            <>
              <ul className="staff-dash-list">
                {current.slice(0, QUICK_RESULTS).map((r) => (
                  <li key={r.student_id}>
                    <button
                      type="button"
                      className="staff-dash-item"
                      onClick={() => navigate(`/staff/students/${r.student_id}`)}
                    >
                      <span className="staff-dash-main">{staffDisplayName(r)}</span>
                      <span className="staff-dash-sub">{gradeLabel(r.grade)}</span>
                    </button>
                  </li>
                ))}
              </ul>
              {current.length > QUICK_RESULTS && (
                <p className="staff-small">
                  <Link to="/staff/students">See all students</Link> to browse the other {current.length - QUICK_RESULTS}.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
