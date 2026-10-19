import { describe, expect, it } from 'vitest'
import { skillIssues } from './checks'
import type { ContentSkill } from './types'

const ok = (text: string) => ({ text, is_correct: true as const })
const no = (text: string) => ({ text, is_correct: false as const, misconception_token: 'guessed' })
const skill = (stem: string) =>
  ({
    slug: 'math-g3-test-skill',
    subject: 'math',
    grade: 3,
    name: 'Test',
    group: 'Test',
    standards: ['3.OA.A'],
    passages: [],
    items: [{ slot: 1, difficulty: 'easy', stem, choices: [ok('$1$'), no('$2$'), no('$3$'), no('$4$')], solution: 'One plus one makes two, so the box holds one.' }],
  }) as unknown as ContentSkill
const flagged = (stem: string) => skillIssues(skill(stem)).some((s) => s.includes('no backslash'))

describe('LaTeX command that lost its backslash', () => {
  it('flags a bare command name inside $...$', () => {
    expect(flagged('What goes in $square + 1 = 2$?')).toBe(true)
    expect(flagged('What is $3 times 4$?')).toBe(true)
  })
  it('accepts the command with its backslash, and the word outside math', () => {
    expect(flagged('What goes in $\\square + 1 = 2$?')).toBe(false)
    expect(flagged('A square garden has a side of $4$ feet. What is its perimeter?')).toBe(false)
  })
})
