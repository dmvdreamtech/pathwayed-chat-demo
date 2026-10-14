import { describe, it, expect, vi, beforeEach } from 'vitest'

// Shared mutable state for the mocks (hoisted above the vi.mock factories).
const state = vi.hoisted(() => ({
  rpcCalls: [] as { fn: string; args: Record<string, unknown> }[],
  rpcResult: { data: null as unknown, error: null as unknown },
  refreshed: [] as string[],
}))

// The readiness recompute now runs on the server; only its trigger is asserted.
vi.mock('@/lib/readiness', () => ({
  refreshReadiness: vi.fn(async (id: string) => {
    state.refreshed.push(id)
  }),
}))

// The database scores the set. The browser only names the answers it recorded.
vi.mock('@/lib/supabase', () => ({
  supabase: {
    rpc: (fn: string, args: Record<string, unknown>) => {
      state.rpcCalls.push({ fn, args })
      return Promise.resolve(state.rpcResult)
    },
  },
}))

import { recordPracticeResult, seedDiagnosticMastery } from '@/lib/skills'

beforeEach(() => {
  state.rpcCalls = []
  state.rpcResult = { data: null, error: null }
  state.refreshed = []
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

describe('recordPracticeResult — the database scores the recorded answers', () => {
  it('sends the recorded answer ids, never an accuracy', async () => {
    state.rpcResult = { data: { attempts: 1, accuracy: 30, mastery_percentage: 8 }, error: null }
    const update = await recordPracticeResult('stu-1', 'skill-mult', ['a1', 'a2', 'a2', ''])

    expect(state.rpcCalls).toEqual([
      {
        fn: 'record_practice_result',
        args: { p_student_id: 'stu-1', p_skill_id: 'skill-mult', p_attempt_ids: ['a1', 'a2'] },
      },
    ])
    expect(update).toEqual({ skill_id: 'skill-mult', slug: '', attempts: 1, accuracy: 30, mastery_percentage: 8 })
    expect(state.refreshed).toEqual(['stu-1'])
  })

  it('returns null when the database recorded nothing, and still refreshes readiness', async () => {
    state.rpcResult = { data: null, error: null }
    expect(await recordPracticeResult('stu-1', 'skill-mult', ['a1'])).toBeNull()
    expect(state.refreshed).toEqual(['stu-1'])
  })

  it('returns null on a refused call without throwing', async () => {
    state.rpcResult = { data: null, error: { message: 'not authorized for this student' } }
    expect(await recordPracticeResult('stu-1', 'skill-mult', ['a1'])).toBeNull()
    expect(console.error).toHaveBeenCalled()
  })

  it('skips the call when no answer was recorded', async () => {
    expect(await recordPracticeResult('stu-1', 'skill-mult', [])).toBeNull()
    expect(state.rpcCalls).toEqual([])
  })
})

describe('seedDiagnosticMastery — the database seeds from its own grades', () => {
  it('sends each placement skill once, never a right/wrong flag', async () => {
    state.rpcResult = { data: 2, error: null }
    const written = await seedDiagnosticMastery('stu-1', ['s1', 's2', 's1'])
    expect(state.rpcCalls).toEqual([
      { fn: 'seed_placement_mastery', args: { p_student_id: 'stu-1', p_skill_ids: ['s1', 's2'] } },
    ])
    expect(written).toBe(2)
    expect(state.refreshed).toEqual(['stu-1'])
  })

  it('returns 0 on a refused call and does not refresh', async () => {
    state.rpcResult = { data: null, error: { message: 'nope' } }
    expect(await seedDiagnosticMastery('stu-1', ['s1'])).toBe(0)
    expect(state.refreshed).toEqual([])
  })
})
