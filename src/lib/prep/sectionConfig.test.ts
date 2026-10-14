import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { prepSectionConfigRows, prepSectionConfigValuesSql } from './sectionConfig'
import { prepModulesUsingSkill } from './entitlements'

/**
 * Since migration 0033 the SERVER picks a timed section's questions and its time
 * limit from public.prep_section_config, seeded by the migration. The browser
 * still shows the same section from the TypeScript modules. If the two disagree,
 * the countdown a student sees and the one the server enforces drift apart, so
 * this fails the moment either side changes alone.
 */
const MIGRATION = join(process.cwd(), 'migrations', '0033_server_side_answer_keys.sql')

describe('prep_section_config matches the TypeScript modules', () => {
  it('the migration seeds exactly the generated rows', () => {
    const sql = readFileSync(MIGRATION, 'utf8').replace(/\r\n/g, '\n')
    expect(sql).toContain(prepSectionConfigValuesSql())
  })

  it('covers every section of HSPT, ISEE and SAT, with skills for each', () => {
    const rows = prepSectionConfigRows()
    expect(rows.length).toBe(14)
    for (const r of rows) {
      expect(r.skillSlugs.length).toBeGreaterThan(0)
      expect(r.timeLimitSec).toBeGreaterThan(0)
      expect(r.questionCount).toBeGreaterThan(0)
    }
    expect(rows.filter((r) => r.isEssay).map((r) => `${r.moduleId}/${r.sectionId}`)).toEqual(['isee/essay'])
  })
})

describe('prepModulesUsingSkill (opens Practice for a prep-only family)', () => {
  it('finds the modules whose sections use a skill', () => {
    expect(prepModulesUsingSkill('prep-sat-transitions')).toEqual(['sat'])
    expect(prepModulesUsingSkill('prep-synonyms').sort()).toEqual(['hspt', 'isee'])
  })

  it('finds nothing for a skill no prep module uses', () => {
    expect(prepModulesUsingSkill('counting')).toEqual([])
  })
})
