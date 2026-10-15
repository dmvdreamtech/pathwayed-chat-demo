import { describe, it, expect } from 'vitest'
import { groupSessionKeys, sessionSkillSlugs, splitSessionKey, subjectWithSkills } from './sessionSubject'

const names = new Map([
  ['expressions', 'Expressions'],
  ['functions', 'Functions'],
  ['main-idea', 'Main Idea'],
])

describe('session keys', () => {
  it('splits a key at the colon', () => {
    expect(splitSessionKey('math:functions')).toEqual({ subject: 'math', skillSlug: 'functions' })
    expect(splitSessionKey('math')).toEqual({ subject: 'math', skillSlug: null })
    expect(splitSessionKey('math:')).toEqual({ subject: 'math', skillSlug: null })
  })

  it('names known skills in parentheses and leaves unknown slugs out', () => {
    expect(subjectWithSkills('Math', ['expressions'], names)).toBe('Math (Expressions)')
    expect(subjectWithSkills('Math', ['functions', 'expressions', 'algebra'], names)).toBe('Math (Expressions, Functions)')
    expect(subjectWithSkills('Math', ['algebra'], names)).toBe('Math')
    expect(subjectWithSkills('Math', [], names)).toBe('Math')
  })

  it('groups keys by subject', () => {
    expect(groupSessionKeys(['math:expressions', 'reading', 'math', 'math:functions'])).toEqual([
      { subject: 'math', slugs: ['expressions', 'functions'] },
      { subject: 'reading', slugs: [] },
    ])
  })

  it('collects the slugs to look up once', () => {
    expect(sessionSkillSlugs(['math:functions', 'math', 'reading:main-idea', 'math:functions'])).toEqual([
      'functions',
      'main-idea',
    ])
  })
})
