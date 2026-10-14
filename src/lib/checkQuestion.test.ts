import { describe, it, expect } from 'vitest'
import {
  CHECK_MARKER,
  CHECK_MAX_PER_SESSION,
  CHECK_MIN_ASSISTANT_TURNS,
  CHECK_COOLDOWN_TURNS,
  chooseCheckQuestion,
  shouldServeCheck,
  CHECK_STRUGGLE_BACKOFF,
  stripCheckMarker,
  stripStreamingCheckMarker,
} from './checkQuestion'
import { checkAnswerSummary } from './checkQuestionCopy'
import type { PracticeQuestion } from './questions'

const q = (id: string): PracticeQuestion => ({
  id,
  skill_id: 's1',
  sat_alignment: null,
  stem: `stem ${id}`,
  passage: null,
  choices: [{ text: 'a' }, { text: 'b' }],
  render_mode: 'text',
  prompt: null,
  difficulty: null,
})

describe('stripCheckMarker', () => {
  it('reports and removes the marker', () => {
    const r = stripCheckMarker(`Nice work. Try this one.\n${CHECK_MARKER}`)
    expect(r.requested).toBe(true)
    expect(r.text).toBe('Nice work. Try this one.')
    expect(r.text).not.toContain('[[')
  })

  it('leaves ordinary text alone', () => {
    const r = stripCheckMarker('Nice work. Try this one.')
    expect(r.requested).toBe(false)
    expect(r.text).toBe('Nice work. Try this one.')
  })

  it('tolerates case and inner whitespace', () => {
    expect(stripCheckMarker('ok [[ CHECK ]]').requested).toBe(true)
    expect(stripCheckMarker('ok [[Check]]').requested).toBe(true)
  })

  it('removes every marker when the model emits more than one', () => {
    const r = stripCheckMarker(`${CHECK_MARKER} middle ${CHECK_MARKER}`)
    expect(r.text).toBe('middle')
    expect(r.requested).toBe(true)
  })

  it('is stable across repeated calls (no lastIndex leakage)', () => {
    const s = `hi ${CHECK_MARKER}`
    expect(stripCheckMarker(s).requested).toBe(true)
    expect(stripCheckMarker(s).requested).toBe(true)
    expect(stripCheckMarker(s).requested).toBe(true)
  })
})

describe('stripStreamingCheckMarker', () => {
  it('hides a half-streamed marker so it never flashes on screen', () => {
    expect(stripStreamingCheckMarker('All good. [[che')).toBe('All good.')
    expect(stripStreamingCheckMarker('All good. [[')).toBe('All good.')
    expect(stripStreamingCheckMarker('All good. [')).toBe('All good.')
  })

  it('hides the complete marker too', () => {
    expect(stripStreamingCheckMarker(`All good. ${CHECK_MARKER}`)).toBe('All good.')
  })

  it('does not eat ordinary trailing text', () => {
    expect(stripStreamingCheckMarker('What do you think?')).toBe('What do you think?')
  })
})

describe('shouldServeCheck', () => {
  const base = { assistantTurns: 10, checksServed: 0, turnOfLastCheck: null, consecutiveWrong: 0 }

  it('fires on the app trigger alone, with nobody having asked', () => {
    // The regression this whole change exists for. It used to require Nikki's
    // marker, the prompt told her most turns should have none, and the live
    // database recorded zero checks across every session ever run.
    expect(shouldServeCheck(base, 'app')).toBe(true)
  })

  it('fires when Nikki asks', () => {
    expect(shouldServeCheck(base, 'nikki')).toBe(true)
  })

  it('teaches first: no check before the minimum turns, whoever asks', () => {
    const early = { ...base, assistantTurns: CHECK_MIN_ASSISTANT_TURNS - 1 }
    expect(shouldServeCheck(early, 'app')).toBe(false)
    expect(shouldServeCheck(early, 'nikki')).toBe(false)
    expect(shouldServeCheck({ ...base, assistantTurns: CHECK_MIN_ASSISTANT_TURNS }, 'app')).toBe(true)
  })

  it('holds the app to the cooldown but lets Nikki bring a check forward', () => {
    const nearly = { ...base, assistantTurns: 10 + CHECK_COOLDOWN_TURNS - 1, checksServed: 1, turnOfLastCheck: 10 }
    expect(shouldServeCheck(nearly, 'app')).toBe(false)
    // She can see the moment landed; the cadence cannot. That is the only gate she
    // is allowed to skip.
    expect(shouldServeCheck(nearly, 'nikki')).toBe(true)
    const due = { ...base, assistantTurns: 10 + CHECK_COOLDOWN_TURNS, checksServed: 1, turnOfLastCheck: 10 }
    expect(shouldServeCheck(due, 'app')).toBe(true)
  })

  it('never serves two checks on one turn, even for Nikki', () => {
    const sameTurn = { ...base, assistantTurns: 10, checksServed: 1, turnOfLastCheck: 10 }
    expect(shouldServeCheck(sameTurn, 'nikki')).toBe(false)
  })

  it('caps the lesson so tutoring does not become testing', () => {
    const atCap = { ...base, assistantTurns: 100, checksServed: CHECK_MAX_PER_SESSION, turnOfLastCheck: 1 }
    expect(shouldServeCheck(atCap, 'app')).toBe(false)
    expect(shouldServeCheck(atCap, 'nikki')).toBe(false)
  })

  it('stops checking entirely after a run of wrong answers', () => {
    // The all-wrong lesson. A child who is not getting it should be taught, not
    // measured, so the rest of the lesson is teaching. Nikki cannot override it:
    // she has no way to see the streak break without another check.
    const struggling = { ...base, consecutiveWrong: CHECK_STRUGGLE_BACKOFF }
    expect(shouldServeCheck(struggling, 'app')).toBe(false)
    expect(shouldServeCheck(struggling, 'nikki')).toBe(false)
  })

  it('keeps checking a child who stumbles once and recovers', () => {
    expect(shouldServeCheck({ ...base, consecutiveWrong: CHECK_STRUGGLE_BACKOFF - 1 }, 'app')).toBe(true)
    // A correct answer resets the streak to 0 in the hook, so this is the state a
    // recovered child is in.
    expect(shouldServeCheck({ ...base, consecutiveWrong: 0 }, 'app')).toBe(true)
  })

  it('lands a lesson in the 3-to-5 band as turns accumulate', () => {
    const served = (turns: number) => {
      let n = 0
      let last: number | null = null
      for (let turn = 0; turn <= turns; turn++) {
        if (shouldServeCheck({ assistantTurns: turn, checksServed: n, turnOfLastCheck: last, consecutiveWrong: 0 }, 'app')) {
          n++
          last = turn
        }
      }
      return n
    }
    // A short lesson still produces evidence; a full one reaches the cap and stops.
    expect(served(12)).toBe(3)
    expect(served(20)).toBe(CHECK_MAX_PER_SESSION)
    expect(served(60)).toBe(CHECK_MAX_PER_SESSION)
  })

  it('an all-wrong lesson stops at the backoff however long it runs', () => {
    let n = 0
    let last: number | null = null
    let wrong = 0
    for (let turn = 0; turn <= 60; turn++) {
      if (shouldServeCheck({ assistantTurns: turn, checksServed: n, turnOfLastCheck: last, consecutiveWrong: wrong }, 'app')) {
        n++
        last = turn
        wrong++ // every answer wrong
      }
    }
    expect(n).toBe(CHECK_STRUGGLE_BACKOFF)
  })
})

describe('chooseCheckQuestion', () => {
  it('never returns an item already asked this lesson, even if it is the only one', () => {
    // "A wrong answer is recorded, and the next item is a DIFFERENT one." Falling
    // back to an already-asked item would be re-asking for credit.
    expect(chooseCheckQuestion([q('a')], new Set(), () => 0, new Set(['a']))).toBeNull()
  })

  it('picks a fresh item over one already asked this lesson', () => {
    const picked = chooseCheckQuestion([q('a'), q('b')], new Set(), () => 0, new Set(['a']))
    expect(picked?.id).toBe('b')
  })

  it('prefers unseen among the fresh ones', () => {
    const picked = chooseCheckQuestion([q('a'), q('b'), q('c')], new Set(['b']), () => 0, new Set(['a']))
    expect(picked?.id).toBe('c')
  })

  it('prefers a question the student has not seen', () => {
    const picked = chooseCheckQuestion([q('a'), q('b'), q('c')], new Set(['a', 'b']), () => 0)
    expect(picked?.id).toBe('c')
  })

  it('falls back to the seen pool only when everything is used', () => {
    const picked = chooseCheckQuestion([q('a'), q('b')], new Set(['a', 'b']), () => 1)
    expect(picked?.id).toBe('b')
  })

  it('returns null when the skill has no published questions', () => {
    expect(chooseCheckQuestion([], new Set(), () => 0)).toBeNull()
  })

  it('stays in bounds for a misbehaving picker', () => {
    expect(chooseCheckQuestion([q('a')], new Set(), () => 99)?.id).toBe('a')
    expect(chooseCheckQuestion([q('a')], new Set(), () => -5)?.id).toBe('a')
  })
})

describe('checkAnswerSummary', () => {
  it('states the choice and the verdict from the answer key', () => {
    expect(checkAnswerSummary({ chosenText: '24', isCorrect: true })).toBe(
      'I picked "24". That one was right.',
    )
    expect(checkAnswerSummary({ chosenText: '18', isCorrect: false })).toBe(
      'I picked "18". That one was not right.',
    )
  })

  it('handles an empty choice label', () => {
    expect(checkAnswerSummary({ chosenText: '  ', isCorrect: true })).toBe(
      'I picked an answer. That one was right.',
    )
  })

  it('contains no em-dashes', () => {
    expect(checkAnswerSummary({ chosenText: '24', isCorrect: false })).not.toContain('—')
  })
})
