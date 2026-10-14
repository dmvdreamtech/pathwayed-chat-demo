import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * A THROWN RECOMPUTE MUST RENDER THE ERROR STATE, NOT THE EMPTY STATE.
 *
 * ensureFreshReadiness wraps its work in try/catch and falls back to the stored
 * rows. That fallback is right, but on its own it made a failure indistinguishable
 * from a clean load with no evidence: the parent was told there was nothing to say
 * when the truth was that we failed to look.
 *
 * These drive the real ensureFreshReadiness against a mocked Supabase client.
 * The recompute itself is a call to api/readiness.ts (migration 0031 moved it to
 * the server), so a failed recompute is a failed fetch.
 */

const state: {
  readinessRows: unknown[]
  readinessError: unknown
  masteryError: unknown
  throwOnRefresh: boolean
  refreshCalls: number
} = { readinessRows: [], readinessError: null, masteryError: null, throwOnRefresh: false, refreshCalls: 0 }

const NEWER = '2099-01-01T00:00:00.000Z'
const OLDER = '2000-01-01T00:00:00.000Z'

/** One mastery row: newer than the stored readiness, so a recompute is due. */
const MASTERY = [
  {
    skill_id: 'sk-1',
    status: 'advanced',
    evidence_accuracy: 80,
    attempts_counted: 6,
    last_practiced: OLDER,
    updated_at: NEWER,
  },
]
const SKILLS = [{ id: 'sk-1', name: 'Fractions', subject: 'math', slug: 'fractions', sat_alignment: null }]

vi.mock('@/lib/supabase', () => {
  /** A thenable that mimics a PostgREST builder: every filter returns itself. */
  const query = (result: () => { data: unknown; error: unknown }, extra: Record<string, unknown> = {}) => {
    const b: Record<string, unknown> = {
      select: () => b,
      eq: () => b,
      in: () => b,
      not: () => b,
      maybeSingle: async () => result(),
      then: (res: (v: unknown) => unknown) => res(result()),
      ...extra,
    }
    return b
  }
  const from = (table: string) => {
    if (table === 'readiness_scores') {
      return query(() => ({ data: state.readinessRows, error: state.readinessError }))
    }
    if (table === 'student_skill_mastery') {
      return query(() => ({ data: state.masteryError ? null : MASTERY, error: state.masteryError }))
    }
    return query(() => ({ data: SKILLS, error: null }))
  }
  return { supabase: { from, auth: { getSession: async () => ({ data: { session: null } }) } } }
})

const storedRow = (over: Record<string, unknown> = {}) => ({
  readiness_type: 'pathway',
  score: 65,
  strengths: [],
  gaps: [],
  next_skill_slug: null,
  recommendations: { measuredSkills: 8 },
  updated_at: OLDER,
  engine_version: 4,
  ...over,
})

let ensureFreshReadiness: (id: string) => Promise<{ loadFailed: boolean; pathway: unknown }>

beforeEach(async () => {
  vi.resetModules()
  state.readinessRows = []
  state.readinessError = null
  state.masteryError = null
  state.throwOnRefresh = false
  state.refreshCalls = 0
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.stubGlobal('fetch', async () => {
    state.refreshCalls += 1
    if (state.throwOnRefresh) throw new Error('recompute exploded')
    return new Response('{"written":1}', { status: 200 })
  })
  ;({ ensureFreshReadiness } = await import('./readiness'))
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('ensureFreshReadiness failure reporting', () => {
  it('reports loadFailed when the RECOMPUTE THROWS', async () => {
    // Mastery is newer than readiness, so it recomputes; the server call blows up.
    state.readinessRows = [storedRow()]
    state.throwOnRefresh = true
    const view = await ensureFreshReadiness('stu-1')
    expect(view.loadFailed).toBe(true)
  })

  it('still logs the failure to the console', async () => {
    state.readinessRows = [storedRow()]
    state.throwOnRefresh = true
    await ensureFreshReadiness('stu-1')
    expect(console.error).toHaveBeenCalled()
  })

  it('reports loadFailed when the readiness READ errors', async () => {
    state.readinessError = { message: 'permission denied' }
    const view = await ensureFreshReadiness('stu-1')
    expect(view.loadFailed).toBe(true)
  })

  it('reports loadFailed when the MASTERY read errors', async () => {
    state.readinessRows = [storedRow({ updated_at: NEWER })]
    state.masteryError = { message: 'permission denied' }
    const view = await ensureFreshReadiness('stu-1')
    expect(view.loadFailed).toBe(true)
  })

  it('does NOT report loadFailed on a clean load with fresh rows', async () => {
    // Readiness newer than mastery and at the current engine version: no recompute.
    state.readinessRows = [storedRow({ updated_at: NEWER })]
    const view = await ensureFreshReadiness('stu-1')
    expect(view.loadFailed).toBe(false)
  })

  it('asks the server to recompute stale rows instead of writing them itself', async () => {
    state.readinessRows = [storedRow()]
    const view = await ensureFreshReadiness('stu-1')
    expect(state.refreshCalls).toBe(1)
    expect(view.loadFailed).toBe(false)
  })
})
