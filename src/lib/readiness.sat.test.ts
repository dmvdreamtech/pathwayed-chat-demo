import { describe, it, expect } from 'vitest'
import {
  computeSatResults,
  buildReadinessView,
  buildTodaysPlan,
  isSatLevelSkill,
  parseSatPayload,
  SAT_DOMAINS,
  SAT_MIN_GRADE,
  SAT_SCHEMA_VERSION,
  type SatSkillRow,
} from './readiness'

const NOW_ISO = '2026-10-14T12:00:00Z'

function srow(over: Partial<SatSkillRow> & { slug: string; sat_alignment: string | null }): SatSkillRow {
  return {
    name: over.slug,
    subject: 'math',
    mastery_percentage: 50,
    attempts: 4,
    last_practiced: NOW_ISO,
    ccss_grade_num: 9,
    ...over,
  }
}

const domain = (res: ReturnType<typeof computeSatResults>, token: string) =>
  res.payload.sections[SAT_DOMAINS.find((d) => d.token === token)!.section].domains.find((d) => d.token === token)!

describe('isSatLevelSkill — only SAT-level skills count', () => {
  it('drops K-5 skills even though they carry an SAT domain', () => {
    // The production shape: Counting (K) and Letter Naming (K) map to SAT domains.
    expect(isSatLevelSkill({ sat_alignment: 'problem-solving-data-analysis', ccss_grade_num: 0, subject: 'math' })).toBe(false)
    expect(isSatLevelSkill({ sat_alignment: 'information-and-ideas', ccss_grade_num: 0, subject: 'reading' })).toBe(false)
    expect(isSatLevelSkill({ sat_alignment: 'problem-solving-data-analysis', ccss_grade_num: 5, subject: 'math' })).toBe(false)
  })

  it(`keeps grade ${SAT_MIN_GRADE} and above`, () => {
    expect(isSatLevelSkill({ sat_alignment: 'algebra', ccss_grade_num: SAT_MIN_GRADE, subject: 'math' })).toBe(true)
    expect(isSatLevelSkill({ sat_alignment: 'advanced-math', ccss_grade_num: 12, subject: 'math' })).toBe(true)
  })

  it('keeps a test-prep skill mapped to an SAT domain, which has no grade', () => {
    expect(isSatLevelSkill({ sat_alignment: 'craft-and-structure', ccss_grade_num: null, subject: 'prep-verbal' })).toBe(true)
  })

  it('drops skills without a known SAT domain, and ungraded non-prep skills', () => {
    expect(isSatLevelSkill({ sat_alignment: null, ccss_grade_num: 10, subject: 'math' })).toBe(false)
    expect(isSatLevelSkill({ sat_alignment: 'not-a-domain', ccss_grade_num: 10, subject: 'math' })).toBe(false)
    expect(isSatLevelSkill({ sat_alignment: null, ccss_grade_num: null, subject: 'prep-verbal' })).toBe(false)
    expect(isSatLevelSkill({ sat_alignment: 'algebra', ccss_grade_num: null, subject: 'math' })).toBe(false)
  })
})

describe('computeSatResults — gaps and next skill are SAT-level only', () => {
  it('never lists or suggests a K-5 skill', () => {
    const res = computeSatResults([
      srow({ slug: 'counting', name: 'Counting', sat_alignment: 'problem-solving-data-analysis', ccss_grade_num: 0, attempts: 0, mastery_percentage: 0 }),
      srow({ slug: 'letter-naming', name: 'Letter Naming', subject: 'reading', sat_alignment: 'information-and-ideas', ccss_grade_num: 0, attempts: 0, mastery_percentage: 0 }),
      srow({ slug: 'add-subtract-fractions-unlike', name: 'Add & Subtract Fractions', sat_alignment: 'problem-solving-data-analysis', ccss_grade_num: 5, attempts: 0, mastery_percentage: 0 }),
      srow({ slug: 'ratios', name: 'Ratios', sat_alignment: 'problem-solving-data-analysis', ccss_grade_num: 6, attempts: 0, mastery_percentage: 0 }),
      srow({ slug: 'linear-equations', name: 'Linear Equations', sat_alignment: 'algebra', ccss_grade_num: 9, attempts: 0, mastery_percentage: 0 }),
    ])
    const listed = [...res.payload.toPractice, ...res.gaps].map((s) => s.slug)
    expect(listed).not.toContain('counting')
    expect(listed).not.toContain('letter-naming')
    expect(listed).not.toContain('add-subtract-fractions-unlike')
    expect(res.nextSkillSlug).toBe('ratios') // lowest grade SAT-level skill, not the first alphabetically
    expect(res.payload.skillsTotal).toBe(2)
  })

  it('suggests measured weaknesses before skills not started', () => {
    const res = computeSatResults([
      srow({ slug: 'untouched', sat_alignment: 'algebra', ccss_grade_num: 6, attempts: 0, mastery_percentage: 0 }),
      srow({ slug: 'weak', sat_alignment: 'algebra', ccss_grade_num: 11, attempts: 5, mastery_percentage: 40 }),
      srow({ slug: 'strong', sat_alignment: 'algebra', ccss_grade_num: 9, attempts: 5, mastery_percentage: 90 }),
    ])
    expect(res.payload.toPractice.map((s) => s.slug)).toEqual(['weak', 'untouched'])
    expect(res.nextSkillSlug).toBe('weak')
    expect(res.strengths.map((s) => s.slug)).toEqual(['strong'])
  })
})

describe('computeSatResults — measured % right, pooled over answers', () => {
  it('reports answers right out of answers counted, per domain and section', () => {
    const res = computeSatResults([
      // 8 of 10 right
      srow({ slug: 'a1', sat_alignment: 'algebra', attempts: 10, mastery_percentage: 80 }),
      // 2 of 10 right
      srow({ slug: 'a2', sat_alignment: 'algebra', attempts: 10, mastery_percentage: 20 }),
      // not started
      srow({ slug: 'a3', sat_alignment: 'algebra', attempts: 0, mastery_percentage: 0 }),
      // 3 of 4 right
      srow({ slug: 'g1', sat_alignment: 'geometry-trigonometry', attempts: 4, mastery_percentage: 75 }),
    ])
    const alg = domain(res, 'algebra')
    expect(alg.pctRight).toBe(50) // 10 of 20
    expect(alg.answers).toBe(20)
    expect(alg.skillsPracticed).toBe(2)
    expect(alg.skillsTotal).toBe(3)
    const math = res.payload.sections.math
    expect(math.pctRight).toBe(54) // 13 of 24
    expect(math.answers).toBe(24)
    expect(res.payload.overallPctRight).toBe(54)
    expect(res.score).toBe(54)
  })

  it('a domain or section with nothing practiced reads as not started, never zero', () => {
    const res = computeSatResults([srow({ slug: 'a1', sat_alignment: 'algebra', attempts: 4, mastery_percentage: 75 })])
    expect(res.payload.sections['reading-writing'].pctRight).toBeNull()
    expect(res.payload.sections['reading-writing'].answers).toBe(0)
    expect(domain(res, 'craft-and-structure').skillsTotal).toBe(0)
    expect(domain(res, 'craft-and-structure').pctRight).toBeNull()
  })

  it('an empty catalog is all zero counts and no % right', () => {
    const res = computeSatResults([])
    expect(res.payload.overallPctRight).toBeNull()
    expect(res.score).toBe(0)
    expect(res.payload.skillsTotal).toBe(0)
    expect(res.nextSkillSlug).toBeNull()
  })
})

describe('computeSatResults — no projection of any kind', () => {
  it('the stored payload has no range, ceiling, gate or timeline', () => {
    const res = computeSatResults([
      srow({ slug: 'a1', sat_alignment: 'algebra', attempts: 10, mastery_percentage: 80 }),
      srow({ slug: 'r1', subject: 'reading', sat_alignment: 'information-and-ideas', attempts: 10, mastery_percentage: 60 }),
    ])
    const json = JSON.stringify(res.payload)
    for (const key of ['today', 'trajectory', 'gate', 'timeline', 'low', 'high', 'ceiling']) {
      expect(json).not.toContain(`"${key}"`)
    }
    expect(json.toLowerCase()).not.toMatch(/project|estimat|potential/)
    expect(res.payload.schemaVersion).toBe(SAT_SCHEMA_VERSION)
  })
})

describe('parseSatPayload — old-format rows read as empty', () => {
  it('rejects a schema version 1 row, which carries projected ranges', () => {
    const v1 = {
      schemaVersion: 1,
      gate: 'ok',
      today: { low: 1050, high: 1180 },
      trajectory: { low: 1200, high: 1320 },
      sections: { math: { pct: 60, today: null, trajectory: null, domains: [] }, 'reading-writing': { pct: 50, today: null, trajectory: null, domains: [] } },
      timeline: 'Projected ranges are transparent estimates',
    }
    expect(parseSatPayload(v1)).toBeNull()
  })

  it('reads back exactly what the engine stores', () => {
    const res = computeSatResults([srow({ slug: 'a1', sat_alignment: 'algebra', attempts: 4, mastery_percentage: 75 })])
    const parsed = parseSatPayload(JSON.parse(JSON.stringify(res.payload)))
    expect(parsed).toEqual(res.payload)
  })

  it('rejects a malformed v2 payload rather than guessing', () => {
    expect(parseSatPayload({ schemaVersion: SAT_SCHEMA_VERSION, sections: {} })).toBeNull()
    expect(parseSatPayload(null)).toBeNull()
  })
})

describe("buildReadinessView / buildTodaysPlan — 'sat' is never a subject", () => {
  it("excludes a 'sat' row from bySubject and from Today's Plan", () => {
    const view = buildReadinessView([
      { readiness_type: 'pathway', score: 70, strengths: [], gaps: [], next_skill_slug: null },
      { readiness_type: 'math', score: 60, strengths: [], gaps: [], next_skill_slug: null },
      { readiness_type: 'sat', score: 55, strengths: [], gaps: [], next_skill_slug: null },
    ])
    expect(view.pathway?.score).toBe(70)
    expect(Object.keys(view.bySubject)).toEqual(['math'])
    expect(view.bySubject.sat).toBeUndefined()

    const plan = buildTodaysPlan(view)
    expect(plan.some((p) => p.subject === 'sat')).toBe(false)
    expect(plan.some((p) => /sat/i.test(p.label))).toBe(false)
  })
})
