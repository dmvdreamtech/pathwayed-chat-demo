import { useEffect, useState } from 'react'
import { getStudent, type Student } from '@/lib/students'
import { getSatPayload, type SatResultsPayload } from '@/lib/readiness'
import { trajectorySummary, type ModuleTrajectory } from '@/lib/prep/testTrajectory'
import { showKidSatFraming } from '@/lib/satFraming'
import { SatReadiness } from '@/components/SatReadiness'
import { loadTestReadiness, type TestReadinessData } from '@/lib/prep/testReadinessLoad'
import { prepModulesForGrade } from '@/lib/prep/access'
import {
  ISEE_PERCENTILE_STANINE,
  practiceDisclosure,
  scaleReferenceFor,
  type CompositeRow,
  type HistoryRow,
  type ModuleReadiness,
  type ReadinessBand,
  type SectionRow,
} from '@/lib/prep/testReadiness'

/**
 * One read-only card covering all three admissions tests, on both dashboards.
 *
 * READ ONLY. It selects the child's finalized prep attempts, essays and stored
 * SAT payload, and renders them. No writes, no recompute, no change to the timed
 * engine or to the SAT results.
 *
 * Order is HSPT, then ISEE, then SAT.
 *
 * HSPT and ISEE show percent correct on PathwayEd practice questions plus a band.
 * There is no scaled score, stanine or percentile anywhere: PathwayEd does not
 * hold STS or ERB norming data, so inventing one would be a claim we cannot back.
 * The published scale facts sit in a collapsed reference block, clearly separated
 * from the child's results.
 *
 * The disclosure and that reference block name only the tests THIS student has.
 * A 9-12 student is SAT-only (see prepModulesForGrade), and telling them how
 * Scholastic Testing Service scales the HSPT is true, useless, and reads like the
 * product cannot tell one child from another. See practiceDisclosure: the honesty
 * is per test, never dropped.
 *
 * SAT is NOT recomputed here. This card composes the existing SatReadiness
 * component, which renders the stored readiness_scores payload exactly as before.
 * SatReadiness used to be mounted standalone on each dashboard; those two mounts
 * were removed when this card landed, so SAT renders once per dashboard, here.
 *
 * SAT gating, unchanged from those two mounts plus one addition:
 *   parent  - the child's above_grade_ok consent gate.
 *   student - showKidSatFraming (consent AND grade >= 9). Below grade 9 the SAT
 *             row is omitted entirely: no placeholder, no locked state, and the
 *             word SAT never reaches the page.
 * SatReadiness shows measured results only, with its own empty state.
 */

export function TestReadinessCard({
  studentId,
  audience,
}: {
  studentId: string
  audience: 'student' | 'parent'
}) {
  const [student, setStudent] = useState<Student | null>(null)
  const [data, setData] = useState<TestReadinessData | null>(null)
  const [sat, setSat] = useState<SatResultsPayload | null>(null)

  useEffect(() => {
    let active = true
    void (async () => {
      const [s, d, p] = await Promise.all([
        getStudent(studentId),
        loadTestReadiness(studentId),
        getSatPayload(studentId),
      ])
      if (!active) return
      setStudent(s)
      setData(d)
      setSat(p)
    })()
    return () => {
      active = false
    }
  }, [studentId])

  // Both dashboards render their own loader above; stay silent until the reads
  // land rather than flashing a half-built card.
  if (!data || !student) return null

  const grade = student.grade
  const showSat =
    audience === 'parent'
      ? student.above_grade_ok
      : showKidSatFraming({ grade, above_grade_ok: student.above_grade_ok })

  // Which tests this card is actually talking about for THIS student. Driven by
  // what renders, not by grade alone: the HSPT and ISEE blocks are not grade-gated
  // (loadTestReadiness always loads both), so a grade 9 transfer can carry real
  // 8th-grade HSPT results onto the card and the disclosure has to cover them.
  // Grade eligibility is the fallback for a student who has attempted nothing yet.
  const shown = new Set<string>()
  for (const m of data.modules) if (m.hasResults) shown.add(m.moduleId)
  for (const t of data.trajectories) shown.add(t.moduleId)
  if (showSat) shown.add('sat')
  if (shown.size === 0) for (const m of prepModulesForGrade(grade)) shown.add(m.id)
  const shownModuleIds = [...shown]

  const heading = (text: string) =>
    audience === 'parent' ? <div className="pd-label">{text}</div> : <h3>{text}</h3>

  const body = (
    <>
      {heading('Test Readiness')}

      {data.isEmpty ? (
        <p className="muted trc-empty">Complete an assessment to see section results.</p>
      ) : (
        data.modules
          .filter((m) => m.hasResults)
          .map((m) => <ModuleBlock key={m.moduleId} module={m} />)
      )}

      <p className="trc-disclosure">{practiceDisclosure(shownModuleIds)}</p>

      {showSat && (
        <div className="trc-sat">
          <SatReadiness payload={sat} firstName={student.first_name} variant={audience} />
        </div>
      )}

      {/* Direction BEFORE the raw list. A parent should see that Mathematics went
          38% to 45% without having to scan two rows and subtract.

          NOT "Direction over time". That sat a scroll away from the practice
          panel called "Growth over time", and two near-identical names on one
          page invite a parent to read one panel's numbers as the other's. This
          one is per test section; growth is everyday practice. */}
      {data.trajectories.length > 0 && (
        <div className="trc-trajectory">
          {heading('How each section is trending')}
          {data.trajectories.map((t) => (
            <TrajectoryBlock key={t.moduleId} trajectory={t} firstName={student.first_name} />
          ))}
        </div>
      )}

      <ScaleReference moduleIds={shownModuleIds} />
      <History rows={data.history} />
    </>
  )

  return audience === 'parent' ? (
    <div className="pd-section trc">{body}</div>
  ) : (
    <section className="panel trc">{body}</section>
  )
}

/** HSPT or ISEE: scored sections, then composites where the module defines them. */
function ModuleBlock({ module }: { module: ModuleReadiness }) {
  return (
    <div className="trc-module">
      <div className="subj-head">
        <span className="subj-name">{module.moduleName}</span>
      </div>

      {module.sections.map((s) => (
        <SectionLine key={s.sectionId} section={s} />
      ))}

      {module.composites.length > 0 && (
        <div className="trc-composites">
          {module.composites.map((c) => (
            <CompositeLine key={c.id} composite={c} />
          ))}
          <p className="trc-note">
            Composites are averages of the section percents above, on the same practice scale.
          </p>
        </div>
      )}
    </div>
  )
}

function SectionLine({ section }: { section: SectionRow }) {
  if (section.notAttempted) {
    return (
      <div className="skill-row trc-row">
        <div className="skill-top">
          <span className="skill-name">{section.name}</span>
          <span className="trc-none">Not yet attempted</span>
        </div>
      </div>
    )
  }
  const pct = section.percent as number
  return (
    <div className="skill-row trc-row">
      <div className="skill-top">
        <span className="skill-name">{section.name}</span>
        <span className="skill-right">
          <BandPill band={section.band as ReadinessBand} />
          <span className="skill-pct">{pct}%</span>
        </span>
      </div>
      <div className="bar">
        <i style={{ width: `${pct}%` }} />
      </div>
      <div className="skill-meta">
        {section.attempts} {section.attempts === 1 ? 'attempt' : 'attempts'}
      </div>
    </div>
  )
}

function CompositeLine({ composite }: { composite: CompositeRow }) {
  return (
    <div className="trc-composite">
      <span className="trc-composite-name">
        {composite.name}
        {composite.partial && <span className="trc-partial">Partial</span>}
      </span>
      <span className="skill-right">
        {composite.percent == null ? (
          <span className="trc-none">Not yet attempted</span>
        ) : (
          <>
            <BandPill band={composite.band as ReadinessBand} />
            <span className="skill-pct">{composite.percent}%</span>
          </>
        )}
      </span>
      {composite.partial && composite.missing.length > 0 && (
        <span className="trc-partial-note">Missing: {composite.missing.join(', ')}</span>
      )}
    </div>
  )
}

const BAND_CLASS: Record<ReadinessBand, string> = {
  Developing: 'developing',
  Solid: 'solid',
  Strong: 'strong',
}

function BandPill({ band }: { band: ReadinessBand }) {
  return <span className={`trc-band ${BAND_CLASS[band]}`}>{band}</span>
}

/**
 * Published scale facts and the ISEE percentile to stanine table, as static
 * reference for families reading an official score report. Collapsed by default,
 * and never applied to the practice percents above.
 *
 * Narrowed to the tests the student has. The stanine table is ISEE's alone, so it
 * only appears for a student who has ISEE; a SAT-only family has no score report
 * it could help them read.
 */
function ScaleReference({ moduleIds }: { moduleIds: string[] }) {
  const rows = scaleReferenceFor(moduleIds)
  if (rows.length === 0) return null
  return (
    <details className="trc-scale">
      <summary>How the official tests are scored</summary>
      <div className="trc-scale-body">
        {rows.map((s) => (
          <p key={s.test}>
            <b>{s.test}.</b> {s.text}
          </p>
        ))}
        {moduleIds.includes('isee') && (
          <>
            <div className="trc-label">ISEE percentile to stanine</div>
            <table className="trc-table">
              <thead>
                <tr>
                  <th>Percentile</th>
                  <th>Stanine</th>
                </tr>
              </thead>
              <tbody>
                {ISEE_PERCENTILE_STANINE.map((r) => (
                  <tr key={r.stanine}>
                    <td>{r.percentile}</td>
                    <td>{r.stanine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </details>
  )
}

/** Prior results, most recent first. Expired runs appear flagged, without a percent. */
function History({ rows }: { rows: HistoryRow[] }) {
  if (!rows.length) return null
  return (
    <div className="trc-history">
      <div className="trc-label">Assessment history</div>
      {rows.map((r) => (
        <div key={r.key} className="trc-hist-row">
          <span className="trc-hist-date">{formatDate(r.date)}</span>
          <span className="trc-hist-what">
            {r.moduleName} {r.sectionName}
            {r.kind === 'essay' ? (
              <span className="trc-hist-mode">
                {r.essayHasFeedback ? 'Essay submitted, feedback provided' : 'Essay submitted'}
              </span>
            ) : (
              <span className="trc-hist-mode">{r.mode}</span>
            )}
          </span>
          <span className="trc-hist-score">
            {r.incomplete ? (
              <span className="trc-incomplete">Incomplete</span>
            ) : r.percent == null ? (
              ''
            ) : (
              `${r.percent}%`
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

/** Short date like "Mar 4, 2026", or an empty string when the timestamp is missing. */
function formatDate(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

/**
 * One test's direction, section by section. Measured percent correct only, with
 * the same qualitative band the readiness blocks use. No projected scaled score,
 * no percentile, and no arrow drawn from a single attempt.
 */
function TrajectoryBlock({
  trajectory,
  firstName,
}: {
  trajectory: ModuleTrajectory
  firstName: string
}) {
  return (
    <div className="trc-module">
      <div className="subj-head">
        <span className="subj-name">{trajectory.moduleName}</span>
      </div>
      {trajectory.sections.map((s) => (
        <div key={s.sectionId} className="trj-row">
          <div className="trj-top">
            <span className="trj-name">{s.sectionName}</span>
            <span className={`trj-dir trj-${s.direction ?? 'none'}`}>
              {s.direction === 'up' ? 'Improving' : null}
              {s.direction === 'down' ? 'Slipping' : null}
              {s.direction === 'flat' ? 'Steady' : null}
              {s.direction === null ? 'First attempt' : null}
            </span>
          </div>
          <p className="trj-summary">{trajectorySummary(s, firstName)}</p>
          <div className="trj-points">
            {s.points.map((p, i) => (
              <span key={i} className="trj-point">
                {p.percent}%
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}