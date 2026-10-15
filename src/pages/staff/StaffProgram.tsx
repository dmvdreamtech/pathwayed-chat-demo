import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { StaffGate } from '@/components/staff/StaffGate'
import { StaffShell } from '@/components/staff/StaffShell'
import { LEVELS, NIKKI_HOW, TEST_DESCRIPTIONS, loadProgram, type ProgramView } from '@/lib/staffProgram'

/**
 * /staff/program, "What students learn": the skills catalog by subject and
 * grade, the test prep that is offered, and what each level means. Read only,
 * from the live catalog. No questions, answers or answer keys.
 */
export function StaffProgram() {
  return (
    <StaffGate>
      <StaffProgramInner />
    </StaffGate>
  )
}

function StaffProgramInner() {
  const [view, setView] = useState<ProgramView | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    loadProgram()
      .then((v) => {
        if (active) setView(v)
      })
      .catch((e: unknown) => {
        console.error('[staff] program failed', e)
        if (active) setFailed(true)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <StaffShell>
      <Link to="/staff" className="link staff-back">
        <ArrowLeft size={16} aria-hidden /> Dashboard
      </Link>
      <h1 className="greet" style={{ marginTop: 10 }}>
        What students learn
      </h1>
      <p className="muted">{NIKKI_HOW}</p>

      <section className="panel">
        <h2 className="staff-h2" style={{ marginTop: 0 }}>
          How a skill moves forward
        </h2>
        <dl className="staff-levels">
          {LEVELS.map((l) => (
            <div key={l.label}>
              <dt>{l.label}</dt>
              <dd>{l.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      {failed ? (
        <div className="panel">
          <p className="muted">We could not load the skills list right now. Refreshing usually fixes it.</p>
        </div>
      ) : !view ? (
        <div className="panel">
          <p className="muted">Loading...</p>
        </div>
      ) : (
        <>
          {view.core.map((s) => (
            <section key={s.subject} className="panel">
              <h2 className="staff-h2" style={{ marginTop: 0 }}>
                {s.label} <span className="muted staff-small">{s.total} skills</span>
              </h2>
              {s.grades.length === 0 ? (
                <p className="muted">No {s.label.toLowerCase()} skills yet.</p>
              ) : (
                s.grades.map((g) => (
                  <details key={g.grade} className="staff-grade">
                    <summary>
                      {g.label} <span className="muted">({g.skills.length})</span>
                    </summary>
                    <ul>
                      {g.skills.map((k) => (
                        <li key={k}>{k}</li>
                      ))}
                    </ul>
                  </details>
                ))
              )}
            </section>
          ))}

          <section className="panel">
            <h2 className="staff-h2" style={{ marginTop: 0 }}>
              Test prep
            </h2>
            <h3 className="staff-h3">SAT</h3>
            <p className="muted staff-small">
              {TEST_DESCRIPTIONS.SAT} Practice covers {view.satDomainCount} domains and the {view.satSkillCount} official
              skills.
            </p>
            {view.sat.map((sec) => (
              <div key={sec.section}>
                <h4 className="staff-h4">{sec.section}</h4>
                {sec.domains.map((d) => (
                  <details key={d.name} className="staff-grade">
                    <summary>
                      {d.name} <span className="muted">({d.skills.length})</span>
                    </summary>
                    <ul>
                      {d.skills.map((k) => (
                        <li key={k}>{k}</li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            ))}
            {view.otherTests.map((t) => (
              <div key={t.name}>
                <h3 className="staff-h3">{t.name}</h3>
                <p className="muted staff-small">{t.description}</p>
                <p className="staff-small">Timed practice sections: {t.sections.join(', ')}.</p>
              </div>
            ))}
          </section>
        </>
      )}
    </StaffShell>
  )
}
