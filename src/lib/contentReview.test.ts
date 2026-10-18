import { describe, expect, it } from 'vitest'
import { buildFlags, finishBlocker, parseChoices, queueStatus, type QueueRow } from './contentReview'

const row = (over: Partial<QueueRow>): QueueRow => ({
  skillId: 's',
  slug: 'math-g4-x',
  name: 'X',
  subject: 'math',
  grade: 4,
  drafts: 40,
  draftsFailing: 0,
  state: 'none',
  openReviewId: null,
  lastReviewer: null,
  lastDecidedAt: null,
  ...over,
})

describe('contentReview', () => {
  it('reads choices, including picture tiles with no text', () => {
    expect(
      parseChoices([
        { text: '4', is_correct: true },
        { text: '', is_correct: false, misconception_token: 'counted-one-extra', tile: { label: 'five apples' } },
      ]),
    ).toEqual([
      { text: '4', correct: true, misconception: null },
      { text: 'five apples', correct: false, misconception: 'counted-one-extra' },
    ])
    expect(parseChoices(null)).toEqual([])
  })

  it('sends only flagged questions, with trimmed notes', () => {
    expect(buildFlags({ a: ' wrong key ', b: 'ignored' }, { a: true, b: false })).toEqual({ a: 'wrong key' })
  })

  it('blocks finishing until every question is decided and every flag has a note', () => {
    const ids = ['a', 'b']
    expect(finishBlocker(ids, {}, {}, { a: true })).toBe('Mark 1 more question clean or flagged.')
    expect(finishBlocker(ids, { b: true }, {}, { a: true })).toBe('Write what is wrong for 1 flagged question.')
    expect(finishBlocker(ids, { b: true }, { b: 'key' }, { a: true })).toBeNull()
    expect(finishBlocker(ids, {}, {}, { a: true, b: true })).toBeNull()
  })

  it('says what each skill needs', () => {
    expect(queueStatus(row({}))).toBe('Ready to sample')
    expect(queueStatus(row({ drafts: 3 }))).toBe('3 passing, needs 5')
    expect(queueStatus(row({ state: 'open' }))).toBe('Sample open')
    expect(queueStatus(row({ state: 'full_review', drafts: 2 }))).toBe('Full review')
    expect(queueStatus(row({ state: 'full_review', drafts: 0 }))).toBe('Full review done')
  })
})
