import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { StaffShell } from '@/components/staff/StaffShell'
import { useAuth } from '@/context/AuthContext'
import {
  headline,
  isComplete,
  loadCoverage,
  rowStatus,
  summarize,
  type CoverageLoad,
  type CoverageSubject,
} from '@/lib/contentCoverage'

/**
 * /admin/coverage: every Reading, Writing and Math skill the standards call
 * for, K to 12, with live counts. Platform admins only; the database refuses
 * everyone else (content_coverage, migration 0040), and this page says so.
 * SAT has its own page, /admin/sat-coverage.
 */
export function ContentCoverage() {
  const { user, loading } = useAuth()
  const [state, setState] = useState<CoverageLoad | null>(null)
  const [tab, setTab] = useState<CoverageSubject>('reading')

  useEffect(() => {
    if (loading || !user) return
    let active = true
    loadCoverage().then((r) => {
      if (active) setState(r)
    })
    return () => {
      active = false
    }
  }, [loading, user])

  const notice = (text: string) => (
    <StaffShell>
      <div className="panel">
        <p className="muted">{text}</p>
      </div>
    </StaffShell>
  )
  if (!loading && !user) return notice('Sign in with a platform admin account to see coverage.')
  if (!state) return notice('Loading coverage...')
  if (!state.ok) {
    return notice(
      state.reason === 'not_admin'
        ? 'This page is for PathwayEd platform admins.'
        : 'We could not load coverage right now. Refreshing usually fixes it.',
    )
  }

  const c = summarize(state.rows)
  const subject = c.subjects.find((s) => s.subject === tab)!

  return (
    <StaffShell>
      <h1 className="greet" style={{ marginTop: 18 }}>
        K-12 coverage
      </h1>
      <p className="staff-headline">{headline(c)}</p>
      <p className="muted staff-small">
        Complete means the skill exists and has at least 40 published questions a named reviewer approved. Each skill
        counts up to its target. SAT is on <Link to="/admin/sat-coverage">its own page</Link>.
      </p>

      <div className="staff-tabs" role="tablist">
        {c.subjects.map((s) => (
          <button key={s.subject} type="button" role="tab" aria-selected={tab === s.subject} onClick={() => setTab(s.subject)}>
            {s.label} <span className="muted">{s.complete} of {s.total}</span>
          </button>
        ))}
      </div>

      <p className="staff-small" style={{ marginTop: 10 }}>
        <b>{subject.label}:</b> {headline(subject)}
      </p>

      {subject.grades.map((g) => (
        <details key={g.grade} className="panel staff-activity sat-cov-domain" open={g.complete < g.rows.length && g.exists > 0}>
          <summary className="staff-h2" style={{ cursor: 'pointer' }}>
            {g.label}{' '}
            <span className="muted staff-small">
              {g.complete} of {g.rows.length} complete, {g.exists} built
            </span>
          </summary>
          <table>
            <thead>
              <tr>
                <th scope="col">Skill</th>
                <th scope="col">Group</th>
                <th scope="col">Exists</th>
                <th scope="col">Drafted</th>
                <th scope="col">Checks passing</th>
                <th scope="col">Reviewed</th>
                <th scope="col">Published</th>
                <th scope="col">Target</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {g.rows.map((r) => (
                <tr key={r.name}>
                  <td className="sat-cov-name" title={`${r.standards.join(', ')}  ${r.slugs.join(', ')}`}>
                    {r.name}
                  </td>
                  <td>{r.group}</td>
                  <td>{r.exists ? 'Yes' : 'No'}</td>
                  <td>{r.drafted}</td>
                  <td>{r.checksPassing}</td>
                  <td>{r.reviewed}</td>
                  <td>{r.published}</td>
                  <td>{r.target}</td>
                  <td>
                    <span className={`staff-level staff-level-${isComplete(r) ? 'mastered' : 'not_started'}`}>{rowStatus(r)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      ))}
    </StaffShell>
  )
}
