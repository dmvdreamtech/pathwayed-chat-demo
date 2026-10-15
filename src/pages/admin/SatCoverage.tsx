import { useEffect, useState } from 'react'
import { StaffShell } from '@/components/staff/StaffShell'
import { useAuth } from '@/context/AuthContext'
import {
  coverageHeadline,
  isComplete,
  loadSatCoverage,
  summarizeCoverage,
  type CoverageLoad,
} from '@/lib/satCoverage'

/**
 * /admin/sat-coverage: how far along each of the 30 official SAT skills is,
 * counted live from the database. Platform admins only; the database refuses
 * everyone else (sat_coverage, migration 0034), and this page says so.
 */
export function SatCoverage() {
  const { user, loading } = useAuth()
  const [state, setState] = useState<CoverageLoad | null>(null)

  useEffect(() => {
    if (loading || !user) return
    let active = true
    loadSatCoverage().then((r) => {
      if (active) setState(r)
    })
    return () => {
      active = false
    }
  }, [loading, user])

  if (!loading && !user) {
    return (
      <StaffShell>
        <div className="panel">
          <p className="muted">Sign in with a platform admin account to see SAT coverage.</p>
        </div>
      </StaffShell>
    )
  }
  if (!state) {
    return (
      <StaffShell>
        <div className="panel">
          <p className="muted">Loading coverage...</p>
        </div>
      </StaffShell>
    )
  }
  if (!state.ok) {
    return (
      <StaffShell>
        <div className="panel">
          <p className="muted">
            {state.reason === 'not_admin'
              ? 'This page is for PathwayEd platform admins.'
              : 'We could not load coverage right now. Refreshing usually fixes it.'}
          </p>
        </div>
      </StaffShell>
    )
  }

  const summary = summarizeCoverage(state.rows)

  return (
    <StaffShell>
      <h1 className="greet" style={{ marginTop: 18 }}>
        SAT coverage
      </h1>
      <p className="staff-headline">{coverageHeadline(summary)}</p>
      <p className="muted staff-small">
        Complete means published at or above the target: Math 60, Reading and Writing 40. Published counts each
        skill up to its target. Checks are the automated item checks; reviewed means a named reviewer approved it.
      </p>

      {summary.domains.map((d) => (
        <section key={d.token} className="panel staff-activity sat-cov-domain">
          <h2 className="staff-h2" style={{ marginTop: 0 }}>
            {d.label}{' '}
            <span className="muted staff-small">
              {d.complete} of {d.rows.length} complete
            </span>
          </h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Skill</th>
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
              {d.rows.map((r) => (
                <tr key={r.code}>
                  <td className="sat-cov-name">{r.name}</td>
                  <td>{r.skillId ? 'Yes' : 'No'}</td>
                  <td>{r.drafted}</td>
                  <td>{r.checksPassing}</td>
                  <td>{r.reviewed}</td>
                  <td>{r.published}</td>
                  <td>{r.target}</td>
                  <td>
                    {isComplete(r) ? (
                      <span className="staff-level staff-level-mastered">Complete</span>
                    ) : (
                      <span className="staff-level staff-level-not_started">{r.target - r.published} to go</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </StaffShell>
  )
}
