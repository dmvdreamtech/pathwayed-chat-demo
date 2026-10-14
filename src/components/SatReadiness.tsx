import type { SatDomainResult, SatResultsPayload, SatSectionResult } from '@/lib/readiness'

/**
 * Shared SAT results presentation for BOTH surfaces — the student dashboard card
 * (variant 'student') and the parent dashboard per-child section (variant
 * 'parent'). Read-only: it renders the stored 'sat' payload, no engine logic.
 *
 * MEASURED PERFORMANCE ONLY. Every number here is something that happened: the
 * share of SAT-level practice answers that were right, per section and per SAT
 * domain, and how many SAT-level skills have been practiced. There is no
 * estimated score, no range, and no "potential". PathwayEd never estimates an
 * SAT score; only the College Board reports one (see practiceDisclosure).
 *
 * Shared by both surfaces so the wording cannot drift between them (a school sees
 * the parent view, so this matters).
 */

type Variant = 'student' | 'parent'

const SECTIONS: { key: 'math' | 'reading-writing'; label: string; accent: string }[] = [
  { key: 'math', label: 'Math', accent: 'var(--math)' },
  { key: 'reading-writing', label: 'Reading & Writing', accent: 'var(--reading)' },
]

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

function intro(variant: Variant, firstName: string): string {
  return variant === 'student'
    ? 'Measured on SAT-level practice: how many answers you got right in each section, and how many SAT skills you have practiced.'
    : `Measured on SAT-level practice: how many answers ${firstName} got right in each section, and how many SAT skills they have practiced.`
}

function emptyCopy(variant: Variant, firstName: string): string {
  return variant === 'student'
    ? 'Your SAT practice results will show here once you practice SAT-level skills.'
    : `${firstName}'s SAT practice results will show here once they practice SAT-level skills.`
}

/** "48 answers across 5 skills", or "Not started". */
function sectionDetail(s: SatSectionResult): string {
  if (s.answers === 0) return 'Not started'
  return `${plural(s.answers, 'answer', 'answers')} across ${plural(s.skillsPracticed, 'skill', 'skills')}`
}

/** "Algebra · 80% right · 2 of 12 skills practiced". */
function domainLine(d: SatDomainResult): string {
  if (d.skillsTotal === 0) return 'No SAT-level skills yet'
  const practiced = `${d.skillsPracticed} of ${plural(d.skillsTotal, 'skill', 'skills')} practiced`
  return d.pctRight == null ? `Not started · ${practiced}` : `${d.pctRight}% right · ${practiced}`
}

export function SatReadiness({
  payload,
  firstName,
  variant,
}: {
  payload: SatResultsPayload | null
  firstName: string
  variant: Variant
}) {
  const heading = (text: string) =>
    variant === 'parent' ? <div className="pd-label">{text}</div> : <h3>{text}</h3>
  const wrap = (children: React.ReactNode) =>
    variant === 'parent' ? (
      <div className="pd-section">{children}</div>
    ) : (
      <section className="panel">{children}</section>
    )

  // No row yet, an old-format row, or nothing practiced: a plain empty state.
  if (!payload || payload.answers === 0) {
    return wrap(
      <>
        {heading('SAT Practice')}
        <p className="muted sat-intro">{emptyCopy(variant, firstName)}</p>
        {payload && payload.skillsTotal > 0 && (
          <p className="sat-note">{`SAT-level skills practiced: 0 of ${payload.skillsTotal}.`}</p>
        )}
      </>,
    )
  }

  const notStarted = payload.skillsTotal - payload.skillsPracticed

  return wrap(
    <>
      {heading('SAT Practice')}
      <p className="muted sat-intro">{intro(variant, firstName)}</p>

      <div className="sat-sections">
        {SECTIONS.map(({ key, label, accent }) => {
          const s = payload.sections[key]
          return (
            <div key={key} className="sat-section">
              <div className="skill-row">
                <div className="skill-top">
                  <span className="skill-name">{label}</span>
                  <span className="skill-pct">{s.pctRight == null ? 'Not started' : `${s.pctRight}% right`}</span>
                </div>
                {s.pctRight != null && (
                  <div className="bar">
                    <i style={{ width: `${s.pctRight}%`, background: accent }} />
                  </div>
                )}
                <p className="sat-sub">{sectionDetail(s)}</p>
              </div>
              <ul className="sat-domains">
                {s.domains.map((d) => (
                  <li key={d.token}>
                    <span className="sat-domain-name">{d.label}</span>
                    <span className="sat-domain-val">{domainLine(d)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <p className="sat-note">
        {`SAT-level skills practiced: ${payload.skillsPracticed} of ${payload.skillsTotal}. Not started: ${notStarted}.`}
      </p>

      {payload.toPractice.length > 0 && (
        <div className="sat-missing">
          <div className="subj-head">Skills to practice next</div>
          <ul>
            {payload.toPractice.slice(0, 4).map((s) => (
              <li key={s.slug}>{s.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>,
  )
}
