import { describe, it, expect, vi, beforeEach } from 'vitest'

/**
 * Regression tests for the Skills Building placement loop.
 *
 * A grade 12 student answered ten diagnostic questions across two hours, every one
 * of them the SAME skill, and never got past the opening screen. Three defects
 * lined up to do that, and each gets a test here:
 *
 *   1. listPracticeableSkills read the whole published catalogue unbounded, so
 *      PostgREST capped it at max-rows and silently hid most skills. Grade 12
 *      collapsed to one visible skill.
 *   2. A one-skill rung produced a one-question run, below PLACEMENT_MIN_QUESTIONS.
 *   3. A below-floor run is discarded rather than seeded, and the gate deciding
 *      whether to offer placement read mastery only, so it re-offered the identical
 *      run forever.
 */

const state = vi.hoisted(() => ({
  /** Pages served for the paginated generated_questions read, in order. */
  pages: [] as { skill_id: string; passage_id: string | null }[][],
  /** Every .range() the catalogue read asked for. */
  ranges: [] as [number, number][],
  skills: [] as Record<string, unknown>[],
  /** Per-skill question pool sizes for fetchPracticeQuestions, keyed by skill id. */
  pool: {} as Record<string, number>,
  /** head:true count reads, keyed by table (diagnostic attempts get their own key). */
  counts: {} as Record<string, number>,
}))

/**
 * Chainable, THENABLE supabase stub. Thenable matters: the real calls differ in how
 * many filters they chain (hasPlacement's diagnostic read is .eq().eq()), so the
 * builder cannot resolve on a particular link. It resolves when awaited, from
 * whatever filters accumulated.
 */
vi.mock('@/lib/supabase', () => {
  // What the browser can read since migration 0033: the text, never the key.
  const choice = () => ({ text: 't' })

  const makeBuilder = (table: string) => {
    let head = false
    let skillId: string | null = null
    let isDiagnostic: boolean | null = null

    const result = () => {
      if (head) {
        const key = isDiagnostic === true ? 'question_attempts_diagnostic' : table
        return { count: state.counts[key] ?? 0, error: null }
      }
      if (table === 'generated_questions' && skillId) {
        const n = state.pool[skillId] ?? 0
        return {
          data: Array.from({ length: n }, (_, i) => ({
            id: `${skillId}-q${i}`,
            skill_id: skillId,
            sat_alignment: null,
            stem: 's',
            choices_public: [choice(), choice()],
            passage_id: null,
            render_mode: 'text',
            prompt: null,
            difficulty: null,
          })),
          error: null,
        }
      }
      return { data: [], error: null }
    }

    const b = {
      select(_cols?: string, opts?: { head?: boolean }) {
        if (opts?.head) head = true
        return b
      },
      order: () => b,
      // resolveSkillIdsBySlug and listPracticeableSkills both end on .in().
      in: () => Promise.resolve({ data: state.skills, error: null }),
      eq(col: string, val: unknown) {
        if (col === 'skill_id') skillId = val as string
        if (col === 'is_diagnostic') isDiagnostic = val as boolean
        return b
      },
      range(from: number, to: number) {
        state.ranges.push([from, to])
        return Promise.resolve({ data: state.pages.shift() ?? [], error: null })
      },
      then<T>(onOk: (v: ReturnType<typeof result>) => T) {
        return Promise.resolve(result()).then(onOk)
      },
    }
    return b
  }
  return { supabase: { from: (table: string) => makeBuilder(table) } }
})

import { listPracticeableSkills, fetchDiagnosticQuestions } from '@/lib/questions'
import { hasPlacement } from '@/lib/skills'
import { PLACEMENT_MIN_QUESTIONS, placementSeeds } from '@/lib/diagnostic'

beforeEach(() => {
  state.pages = []
  state.ranges = []
  state.skills = []
  state.pool = {}
  state.counts = {}
})

const skillRow = (id: string, slug: string) => ({
  id,
  slug,
  name: slug,
  subject: 'math',
  grade_band: '9-12',
  ccss_grade: '12',
  ccss_grade_num: 12,
  prerequisite_skills: null,
})

describe('listPracticeableSkills pages past the PostgREST row cap', () => {
  it('keeps reading until a short page, so skills beyond row 1000 still count', async () => {
    const full = (skillId: string) =>
      Array.from({ length: 1000 }, () => ({ skill_id: skillId, passage_id: null }))
    state.pages = [full('s1'), full('s2'), [{ skill_id: 's3', passage_id: null }]]
    state.skills = [skillRow('s1', 'a'), skillRow('s2', 'b'), skillRow('s3', 'c')]

    const skills = await listPracticeableSkills()

    // Contiguous, non-overlapping reads. The old single unbounded read stopped at
    // the first 1000 rows and would have seen only 's1'.
    expect(state.ranges).toEqual([
      [0, 999],
      [1000, 1999],
      [2000, 2999],
    ])
    expect(skills.map((s) => s.slug).sort()).toEqual(['a', 'b', 'c'])
  })

  it('stops after one read when the first page is short', async () => {
    state.pages = [[{ skill_id: 's1', passage_id: null }]]
    state.skills = [skillRow('s1', 'a')]
    await listPracticeableSkills()
    expect(state.ranges).toEqual([[0, 999]])
  })
})

describe('fetchDiagnosticQuestions widens a thin rung to the placement floor', () => {
  const rung = (n: number) =>
    Array.from({ length: n }, (_, i) => ({
      skill_id: `s${i}`,
      slug: `slug${i}`,
      name: `n${i}`,
      subject: 'math',
      grade_band: '9-12',
      ccss_grade: '12',
      ccss_grade_num: 12,
      has_passages: false,
      prerequisite_skills: null,
    }))

  beforeEach(() => {
    // Deep pools, matching the live catalogue (every skill has at least 20).
    for (let i = 0; i < 8; i++) state.pool[`s${i}`] = 20
    state.skills = Array.from({ length: 8 }, (_, i) => skillRow(`s${i}`, `slug${i}`))
  })

  it('a ONE-skill rung still clears the floor (the grade 12 case)', async () => {
    const qs = await fetchDiagnosticQuestions(rung(1), PLACEMENT_MIN_QUESTIONS)
    expect(qs.length).toBe(PLACEMENT_MIN_QUESTIONS)
    // The whole point: this run now seeds instead of being discarded and re-offered.
    expect(placementSeeds(qs.length)).toBe(true)
  })

  it('a two-skill rung clears the floor', async () => {
    const qs = await fetchDiagnosticQuestions(rung(2), PLACEMENT_MIN_QUESTIONS)
    expect(qs.length).toBeGreaterThanOrEqual(PLACEMENT_MIN_QUESTIONS)
    expect(placementSeeds(qs.length)).toBe(true)
  })

  it('leaves an already-wide rung at one question per skill', async () => {
    const qs = await fetchDiagnosticQuestions(rung(6), PLACEMENT_MIN_QUESTIONS)
    expect(qs.length).toBe(6)
  })

  it('defaults to one per skill when no floor is asked for', async () => {
    const qs = await fetchDiagnosticQuestions(rung(3))
    expect(qs.length).toBe(3)
  })
})

describe('hasPlacement stops the identical retry', () => {
  it('is true once the child has answered diagnostic questions, with no mastery', async () => {
    // The live case exactly: ten diagnostic answers, zero mastery rows. The old
    // mastery-only gate returned false here and re-offered the same check.
    state.counts = { student_skill_mastery: 0, question_attempts_diagnostic: 10 }
    await expect(hasPlacement('answered-but-unseeded')).resolves.toBe(true)
  })

  it('is true when mastery exists and nothing has been answered', async () => {
    state.counts = { student_skill_mastery: 3, question_attempts_diagnostic: 0 }
    await expect(hasPlacement('placed')).resolves.toBe(true)
  })

  it('is false for a genuinely new child, so the check is still offered', async () => {
    state.counts = { student_skill_mastery: 0, question_attempts_diagnostic: 0 }
    await expect(hasPlacement('new')).resolves.toBe(false)
  })
})
