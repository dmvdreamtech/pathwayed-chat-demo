import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Search } from 'lucide-react'
import { StaffGate } from '@/components/staff/StaffGate'
import { StaffShell } from '@/components/staff/StaffShell'
import { gradeLabel } from '@/lib/students'
import { formatLastActive, searchStaffStudents, type StaffStudentRow } from '@/lib/staffProgress'

/** The server returns at most this many rows (staff_search_students). */
const RESULT_CAP = 200
const DEBOUNCE_MS = 250

export function StaffSearch() {
  return (
    <StaffGate>
      <StaffSearchInner />
    </StaffGate>
  )
}

function StaffSearchInner() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState<StaffStudentRow[] | null>(null)
  const [failed, setFailed] = useState(false)
  const now = useMemo(() => new Date(), [])

  useEffect(() => {
    let active = true
    const timer = setTimeout(() => {
      searchStaffStudents(query.trim())
        .then((r) => {
          if (!active) return
          setRows(r)
          setFailed(false)
        })
        .catch((e: unknown) => {
          console.error('[staff] search failed', e)
          if (active) setFailed(true)
        })
    }, DEBOUNCE_MS)
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [query])

  const searching = query.trim() !== ''

  return (
    <StaffShell>
      <h1 className="greet" style={{ marginTop: 18 }}>
        Student progress
      </h1>
      <p className="muted">Tutoring progress for students at your school. Read only.</p>

      <div className="staff-search">
        <Search className="staff-search-icon" size={18} aria-hidden />
        <input
          className="input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, grade, or email"
          aria-label="Search students by name, grade, or email"
          autoFocus
        />
      </div>

      {failed ? (
        <div className="panel">
          <p className="muted">We could not load students right now. Refreshing usually fixes it.</p>
        </div>
      ) : rows === null ? (
        <div className="panel">
          <p className="muted">Loading students...</p>
        </div>
      ) : rows.length === 0 ? (
        <div className="panel">
          <p className="muted">
            {searching
              ? `No students match "${query.trim()}". Try a first name, a grade like 9, or part of an email.`
              : 'No students from your school have signed in to tutoring yet.'}
          </p>
        </div>
      ) : (
        <>
          <p className="staff-count muted">
            {rows.length >= RESULT_CAP
              ? `Showing the first ${RESULT_CAP}. Search to narrow the list.`
              : `${rows.length} ${rows.length === 1 ? 'student' : 'students'}`}
          </p>
          <ul className="staff-results" aria-label="Students">
            {rows.map((r) => (
              <li key={r.student_id}>
                <button
                  type="button"
                  className="staff-result"
                  onClick={() => navigate(`/staff/students/${r.student_id}`)}
                >
                  <span className="staff-result-main">
                    <span className="staff-result-name">{r.first_name}</span>
                    <span className="staff-result-meta">
                      {gradeLabel(r.grade)}
                      {r.email ? ` · ${r.email}` : ''}
                    </span>
                  </span>
                  <span className="staff-result-active">
                    <span className="staff-label">Last active</span>
                    {formatLastActive(r.last_active_at, now)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </StaffShell>
  )
}
