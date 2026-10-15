import { useEffect, useState } from 'react'
import { loadTestScores, type TestScoresView } from '@/lib/staffScores'

/**
 * The Test Scores tab on /staff/students/:id, shown only to guidance, admin and
 * academic_dean (the page asks can_view_test_scores first; the database
 * refuses everyone else either way, migration 0038). Measured results only:
 * answers right out of answers given, and the percent each timed section
 * recorded. No estimated or projected scores.
 */
export function TestScoresTab({ studentId, firstName }: { studentId: string; firstName: string }) {
  const [state, setState] = useState<{ id: string; view: TestScoresView | null; failed: boolean } | null>(null)

  useEffect(() => {
    let active = true
    loadTestScores(studentId)
      .then((view) => {
        if (active) setState({ id: studentId, view, failed: false })
      })
      .catch((e: unknown) => {
        console.error('[staff] test scores failed', e)
        if (active) setState({ id: studentId, view: null, failed: true })
      })
    return () => {
      active = false
    }
  }, [studentId])

  const current = state?.id === studentId ? state : null
  if (!current) {
    return (
      <div className="panel">
        <p className="muted">Loading test scores...</p>
      </div>
    )
  }
  if (current.failed || !current.view) {
    return (
      <div className="panel">
        <p className="muted">We could not load test scores right now. Refreshing usually fixes it.</p>
      </div>
    )
  }
  const v = current.view
  if (v.isEmpty) {
    return (
      <div className="panel">
        <p className="muted">
          No test results yet. Scores show here once {firstName} takes the placement check, a timed practice
          section, or SAT practice.
        </p>
      </div>
    )
  }

  return (
    <>
      <section className="panel staff-activity">
        <h2 className="staff-h2">Placement</h2>
        {v.placement.length === 0 ? (
          <p className="muted">{firstName} has not taken the placement check.</p>
        ) : (
          <>
            {v.workingGrade !== null && (
              <p className="staff-small">
                Working grade: <b>{v.workingGrade === 0 ? 'K' : v.workingGrade}</b>, set by the placement check and
                updated as skills are cleared.
              </p>
            )}
            <table>
              <thead>
                <tr>
                  <th scope="col">Subject</th>
                  <th scope="col">Right</th>
                  <th scope="col">Percent right</th>
                  <th scope="col">Taken</th>
                </tr>
              </thead>
              <tbody>
                {v.placement.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    <td>
                      {r.right} of {r.answered}
                    </td>
                    <td>{r.pct}%</td>
                    <td>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>

      <section className="panel staff-activity">
        <h2 className="staff-h2">Timed practice sections</h2>
        <p className="muted staff-small">HSPT, ISEE and SAT practice sections taken under time, newest first.</p>
        {v.timed.length === 0 ? (
          <p className="muted">No timed sections finished yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th scope="col">Test</th>
                <th scope="col">Section</th>
                <th scope="col">Percent right</th>
                <th scope="col">Questions</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {v.timed.map((t, i) => (
                <tr key={i}>
                  <td>{t.test}</td>
                  <td>{t.section}</td>
                  <td>
                    {t.pct}%{t.ranOut ? ' (time ran out)' : ''}
                  </td>
                  <td>{t.questions || 'Not recorded'}</td>
                  <td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="panel staff-activity">
        <h2 className="staff-h2">SAT practice</h2>
        <p className="staff-small">
          Skills practiced: <b>{v.satSkillsPracticed}</b> of {v.satSkillsTotal} official SAT skills.
        </p>
        {v.satSections.length === 0 ? (
          <p className="muted">No SAT practice questions answered yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th scope="col">Section or domain</th>
                <th scope="col">Right</th>
                <th scope="col">Percent right</th>
              </tr>
            </thead>
            <tbody>
              {v.satSections.map((s) => (
                <SatSectionRows key={s.label} section={s} domains={v.satDomains.filter((d) => d.section === s.label)} />
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  )
}

function SatSectionRows({
  section,
  domains,
}: {
  section: TestScoresView['satSections'][number]
  domains: TestScoresView['satDomains']
}) {
  return (
    <>
      <tr>
        <td>
          <b>{section.label}</b>
        </td>
        <td>
          <b>
            {section.right} of {section.answered}
          </b>
        </td>
        <td>
          <b>{section.pct}%</b>
        </td>
      </tr>
      {domains.map((d) => (
        <tr key={d.label}>
          <td style={{ paddingLeft: 16 }}>{d.label}</td>
          <td>
            {d.right} of {d.answered}
          </td>
          <td>{d.pct}%</td>
        </tr>
      ))}
    </>
  )
}
