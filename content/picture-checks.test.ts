import { describe, expect, it } from 'vitest'
import { skillIssues } from './checks'
import type { ContentItem, ContentSkill } from './types'

const num = (v: number, correct = false) => ({ text: String(v), is_correct: correct, tile: { kind: 'number' as const, value: String(v) } })
const item = (slot: number, over: Partial<ContentItem> = {}): ContentItem => ({
  slot,
  difficulty: 'easy',
  stem: `How many apples do you see? Tap the number ${slot}.`,
  prompt: { kind: 'object_group', image: 'apple', count: 3 },
  choices: [num(3, true), num(2), num(4)],
  solution: "Let's count together: one, two, three. Three apples!",
  ...over,
})
const skill = (items: ContentItem[], over: Partial<ContentSkill> = {}): ContentSkill => ({
  slug: 'math-gk-test-picture',
  subject: 'math',
  grade: 0,
  group: 'Counting and Cardinality',
  name: 'Test',
  standards: ['K.CC.B.5'],
  renderMode: 'audio_picture',
  items,
  ...over,
})
const forty = Array.from({ length: 40 }, (_, i) => item(i + 1))
const issues = (it: ContentItem) => skillIssues(skill([...forty.slice(0, 39), { ...it, slot: 40 }]))

describe('picture item checks', () => {
  it('accepts a clean picture skill: spoken stems, tiles, no tokens', () => {
    expect(skillIssues(skill(forty))).toEqual([])
  })
  it('accepts 2 tiles, words, clocks, and an audio-only prompt', () => {
    expect(issues(item(40, { prompt: null, choices: [num(5, true), num(2)] }))).toEqual([])
    expect(
      issues(item(40, {
        stem: 'Tap the word the.',
        prompt: null,
        choices: [
          { text: 'the', is_correct: true, tile: { kind: 'word', value: 'the' } },
          { text: 'and', is_correct: false, tile: { kind: 'word', value: 'and' } },
        ],
      })),
    ).toEqual([])
    expect(
      issues(item(40, {
        stem: 'Tap the clock that shows three o clock.',
        prompt: null,
        choices: [
          { text: '3:00', is_correct: true, tile: { kind: 'clock', hour: 3, minute: 0 } },
          { text: '6:00', is_correct: false, tile: { kind: 'clock', hour: 6, minute: 0 } },
        ],
      })),
    ).toEqual([])
  })
  it('refuses a misconception token, a missing tile, or an unknown picture', () => {
    expect(issues(item(40, { choices: [num(3, true), { ...num(2), misconception_token: 'counted-one-short' }, num(4)] })).join()).toContain('no misconception_token')
    expect(issues(item(40, { choices: [num(3, true), { text: '2', is_correct: false }, num(4)] })).join()).toContain('has no picture')
    expect(issues(item(40, { prompt: { kind: 'object_group', image: 'unicorn', count: 2 } })).join()).toContain('not in KID_IMAGES')
  })
  it('refuses a tile whose spoken label does not match it, and repeated tiles', () => {
    expect(issues(item(40, { choices: [num(3, true), { text: 'two', is_correct: false, tile: { kind: 'number', value: '2' } }] })).join()).toContain('spoken label must be "2"')
    expect(issues(item(40, { choices: [num(3, true), num(2), num(2)] })).join()).toContain('same')
  })
  it('refuses 5 tiles, two right, a stem that points at a place, and dashes', () => {
    expect(issues(item(40, { choices: [num(3, true), num(2), num(4), num(5), num(6)] })).join()).toContain('2 to 4 tiles')
    expect(issues(item(40, { choices: [num(3, true), num(2, true)] })).join()).toContain('exactly one correct')
    expect(issues(item(40, { stem: 'Tap the first one.' })).join()).toContain('by its place')
    expect(issues(item(40, { solution: 'Three apples — count them again with me.' })).join()).toContain('dash')
  })
  it('keeps picture skills to K-2, with no passages', () => {
    expect(skillIssues(skill(forty, { grade: 3, slug: 'math-g3-test-picture' })).join()).toContain('grades K to 2')
    expect(skillIssues(skill(forty, { passages: [{ code: 'x', body: 'A short story.', items: [] }] })).join()).toContain('no passages')
  })
  it('lets a top-up of a live picture skill add just what it needs', () => {
    expect(skillIssues(skill(forty.slice(0, 12), { slug: 'math-gk-counting-more', extends: 'counting', topUpItems: 12 }))).toEqual([])
    expect(skillIssues(skill(forty.slice(0, 11), { slug: 'math-gk-counting-more', extends: 'counting', topUpItems: 12 })).join()).toContain('needs at least 12')
  })
})
