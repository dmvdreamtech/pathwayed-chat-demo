import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getAvatarLarge, isAvatarCompact, setAvatarLarge } from './avatarSizePref'

describe('session avatar size', () => {
  beforeEach(() => {
    const store = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
    })
  })

  it('is large before the student replies, whatever the saved choice', () => {
    expect(isAvatarCompact(false, false)).toBe(false)
    expect(isAvatarCompact(false, true)).toBe(false)
  })

  it('is compact once the conversation has started, unless the child chose large', () => {
    expect(isAvatarCompact(true, false)).toBe(true)
    expect(isAvatarCompact(true, true)).toBe(false)
  })

  it('falls back to compact when storage is blocked', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('blocked')
      },
    })
    expect(getAvatarLarge()).toBe(false)
    expect(() => setAvatarLarge(true)).not.toThrow()
  })

  it('remembers the choice on this device, compact by default', () => {
    expect(getAvatarLarge()).toBe(false)
    setAvatarLarge(true)
    expect(getAvatarLarge()).toBe(true)
    setAvatarLarge(false)
    expect(getAvatarLarge()).toBe(false)
  })
})
