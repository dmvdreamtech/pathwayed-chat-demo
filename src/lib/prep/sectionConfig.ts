import { PREP_MODULES } from './registry.js'
import { prepSkillFor } from './prepSkills.js'

/**
 * The timed-section settings the SERVER uses, generated from the TypeScript
 * module definitions (hspt.ts, isee.ts, sat.ts) and the question-type to skill
 * map (prepSkills.ts).
 *
 * Since migration 0033 the database picks a timed section's questions and its
 * time limit (prep_start_section), so it needs each section's question count,
 * time limit and skills. Migration 0033 seeds public.prep_section_config with
 * exactly the VALUES list this file produces, and sectionConfig.test.ts fails if
 * the two drift. To change a section: edit the TypeScript module, then add a
 * migration that upserts the regenerated rows.
 *
 * Not imported by the app; only by its test and by migrations.
 */

export interface SectionConfigRow {
  moduleId: string
  sectionId: string
  questionCount: number
  timeLimitSec: number
  skillSlugs: string[]
  isEssay: boolean
}

export function prepSectionConfigRows(): SectionConfigRow[] {
  const rows: SectionConfigRow[] = []
  for (const m of PREP_MODULES) {
    for (const s of m.sections) {
      const slugs = [...new Set(s.questionTypes.map((t) => prepSkillFor(t)?.slug).filter((x): x is string => !!x))]
      rows.push({
        moduleId: m.id,
        sectionId: s.id,
        questionCount: s.questionCount,
        timeLimitSec: s.timeLimitSec,
        skillSlugs: slugs,
        isEssay: !!s.essay,
      })
    }
  }
  return rows
}

const q = (s: string) => `'${s.replace(/'/g, "''")}'`

/** The VALUES rows for the seed insert, one per line, exactly as the migration has them. */
export function prepSectionConfigValuesSql(): string {
  return prepSectionConfigRows()
    .map(
      (r) =>
        `  (${q(r.moduleId)}, ${q(r.sectionId)}, ${r.questionCount}, ${r.timeLimitSec}, ` +
        `array[${r.skillSlugs.map(q).join(', ')}]::text[], ${r.isEssay})`,
    )
    .join(',\n')
}
