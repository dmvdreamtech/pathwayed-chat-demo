import { describe, it, expect } from 'vitest'
import { parseVerdict, summarizeAttempts } from './questions'

describe('parseVerdict (the server grades; the browser only reads the verdict)', () => {
  it('reads a practice verdict with the key and the misconception', () => {
    expect(
      parseVerdict({
        attempt_id: 'a1',
        is_correct: false,
        correct_index: 0,
        correct_answer: '56',
        misconception_token: 'skip-count-error',
        solution: '7 x 8 = 56',
      }),
    ).toEqual({
      attemptId: 'a1',
      isCorrect: false,
      correctIndex: 0,
      correctAnswer: '56',
      misconceptionToken: 'skip-count-error',
      solution: '7 x 8 = 56',
    })
  })
  it('a placement verdict carries right or wrong only', () => {
    expect(parseVerdict({ attempt_id: 'a2', is_correct: true })).toEqual({
      attemptId: 'a2',
      isCorrect: true,
      correctIndex: null,
      correctAnswer: null,
      misconceptionToken: null,
      solution: null,
    })
  })
  it('anything that is not a verdict is null, never a guessed result', () => {
    expect(parseVerdict(null)).toBeNull()
    expect(parseVerdict({ attempt_id: 'a3' })).toBeNull()
    expect(parseVerdict([true])).toBeNull()
  })
})

describe('summarizeAttempts', () => {
  it('counts correct and rounds accuracy', () => {
    expect(summarizeAttempts([{ isCorrect: true }, { isCorrect: true }, { isCorrect: false }])).toEqual({
      total: 3,
      correct: 2,
      accuracy: 67, // round(66.67)
    })
  })
  it('all correct -> 100', () => {
    expect(summarizeAttempts([{ isCorrect: true }, { isCorrect: true }]).accuracy).toBe(100)
  })
  it('all wrong -> 0', () => {
    expect(summarizeAttempts([{ isCorrect: false }, { isCorrect: false }]).accuracy).toBe(0)
  })
  it('0-question edge -> total 0, accuracy 0', () => {
    expect(summarizeAttempts([])).toEqual({ total: 0, correct: 0, accuracy: 0 })
  })
})
