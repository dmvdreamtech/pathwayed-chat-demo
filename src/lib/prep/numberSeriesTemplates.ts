/**
 * Prep quantitative question bank — Number Series (HSPT/ISEE quantitative), grades 6-8.
 *
 * The number-pattern analogue of verbalTemplates.ts, held to the SAME bar: every
 * item has 4 numeric choices, exactly one correct, and THREE distractors that are
 * each a specific wrong path a real 7th grader takes — never a random number. Each
 * distractor is one of a small set of series misconception archetypes, and every
 * token has an explanation in NUMBER_SERIES_MISCONCEPTIONS (a test asserts coverage).
 *
 * Generation is fully DETERMINISTIC: the item bank is produced from a fixed list of
 * pattern specs (no Math.random anywhere), so the emitted content is reproducible.
 * Served through the same generated_questions path as the rest of the prep bank.
 */

import {
  buildPrepQuestion,
  seedForSlot,
  type Difficulty,
  type PrepChoice,
  type PrepItem,
  type PrepSkill,
} from './verbalTemplates'
import { NUMBER_SERIES_MISCONCEPTIONS, OFF_BY_ONE_STEP, WRONG_OPERATION, TEMPTING_MISREAD, MISREAD_INTERLEAVED } from './numberSeriesMisconceptions'
export { NUMBER_SERIES_MISCONCEPTIONS }

// Re-export so downstream seed/build scripts can pull position + build helpers
// straight from this module, mirroring the verbal bank's ergonomics.
export { buildPrepQuestion, seedForSlot }
export type { Difficulty, PrepChoice, PrepItem, PrepSkill }

// Misconception tokens and their explanations live in ./numberSeriesMisconceptions.ts, so the
// browser can explain a wrong answer without importing this bank.

// --- Pattern specs (the deterministic source of the whole bank) -------------
type Tier = Difficulty

type Spec =
  | { kind: 'arithmetic'; tier: Tier; a: number; d: number }
  | { kind: 'arithmetic-mid'; tier: Tier; a: number; d: number }
  | { kind: 'geometric'; tier: Tier; a: number; r: number }
  | { kind: 'alternating'; tier: Tier; a: number; p: number; q: number }
  | { kind: 'interleaved'; tier: Tier; o0: number; e: number; e0: number; f: number }
  | { kind: 'squares'; tier: Tier; k: number }
  | { kind: 'cubes'; tier: Tier; k: number }
  | { kind: 'add-multiply'; tier: Tier; a: number; q: number; p: number }

interface Distractor {
  v: number
  token: string
}

interface Built {
  stem: string
  correct: number
  distractors: [Distractor, Distractor, Distractor]
  solution: string
}

const n = (x: number): string => String(x)
const nextStem = (series: (number | '___')[]): string =>
  `What number comes next: ${series.join(', ')}, ___ ?`
const midStem = (series: (number | '___')[]): string =>
  `What number is missing: ${series.join(', ')} ?`

// Each builder returns the correct value FIRST-in-intent plus three archetype
// distractors. All arithmetic below is integer and collision-free by construction
// (proved for the parameter ranges used in SPECS); a test re-checks distinctness.
function build(spec: Spec): Built {
  switch (spec.kind) {
    case 'arithmetic': {
      const { a, d } = spec
      const t3 = a + 2 * d
      const t4 = a + 3 * d
      const correct = t4 + d // next term
      return {
        stem: nextStem([a, a + d, t3, t4]),
        correct,
        distractors: [
          { v: t4 + 2 * d, token: OFF_BY_ONE_STEP }, // added the step one time too many
          { v: 2 * t4, token: WRONG_OPERATION }, // doubled the last term instead of adding
          { v: t3 + t4, token: TEMPTING_MISREAD }, // added the last two terms (Fibonacci trap)
        ],
        solution: `Each term adds ${d} (arithmetic): ${t4} + ${d} = ${correct}.`,
      }
    }
    case 'arithmetic-mid': {
      const { a, d } = spec
      const t2 = a + d
      const t4 = a + 3 * d
      const t5 = a + 4 * d
      const correct = a + 2 * d // the missing middle term
      return {
        stem: midStem([a, t2, '___', t4, t5]),
        correct,
        distractors: [
          { v: t4, token: OFF_BY_ONE_STEP }, // went one step too far (gave the next slot)
          { v: 2 * t2, token: WRONG_OPERATION }, // doubled the term before it instead of adding
          { v: t2 + t4, token: TEMPTING_MISREAD }, // added the two neighbors instead of one step
        ],
        solution: `Each term adds ${d} (arithmetic): ${t2} + ${d} = ${correct}.`,
      }
    }
    case 'geometric': {
      const { a, r } = spec
      const t1 = a
      const t2 = a * r
      const t3 = a * r * r
      const t4 = a * r * r * r
      const correct = t4 * r
      return {
        stem: nextStem([t1, t2, t3, t4]),
        correct,
        distractors: [
          { v: correct * r, token: OFF_BY_ONE_STEP }, // multiplied one time too many
          { v: t4 + (t4 - t3), token: WRONG_OPERATION }, // added the last difference instead of multiplying
          { v: t4 + (t2 - t1), token: TEMPTING_MISREAD }, // read it as arithmetic using an early gap
        ],
        solution: `Each term multiplies by ${r} (geometric): ${t4} × ${r} = ${correct}.`,
      }
    }
    case 'alternating': {
      const { a, p, q } = spec
      const t1 = a
      const t2 = t1 + p
      const t3 = t2 * q
      const t4 = t3 + p
      const correct = t4 * q // next operation is the multiply
      return {
        stem: nextStem([t1, t2, t3, t4]),
        correct,
        distractors: [
          { v: correct + p, token: OFF_BY_ONE_STEP }, // did one extra +${p} operation
          { v: t4 + p, token: WRONG_OPERATION }, // added instead of multiplying (used the wrong op)
          { v: t4 + (t3 - t2), token: TEMPTING_MISREAD }, // treated it as one arithmetic sequence
        ],
        solution: `The operations alternate +${p}, ×${q}: after ${t4}, multiply by ${q} to get ${correct}.`,
      }
    }
    case 'interleaved': {
      const { o0, e, e0, f } = spec
      const p1 = o0 // odd-position sequence start
      const p2 = e0 // even-position sequence start
      const p3 = o0 + e
      const p4 = e0 + f
      const correct = o0 + 2 * e // next odd-position term
      return {
        stem: nextStem([p1, p2, p3, p4]),
        correct,
        distractors: [
          { v: o0 + 3 * e, token: OFF_BY_ONE_STEP }, // one extra step in the odd sequence
          { v: e0 + 2 * f, token: WRONG_OPERATION }, // continued the OTHER sequence's rule
          { v: p4 + (p4 - p3), token: MISREAD_INTERLEAVED }, // treated all the numbers as one list
        ],
        solution: `Two sequences take turns. The 1st, 3rd, 5th terms go ${o0}, ${p3}, ${correct} (adding ${e}), so the next term is ${correct}.`,
      }
    }
    case 'squares': {
      const { k } = spec
      const t1 = k * k
      const t2 = (k + 1) * (k + 1)
      const t3 = (k + 2) * (k + 2)
      const t4 = (k + 3) * (k + 3)
      const correct = (k + 4) * (k + 4)
      return {
        stem: nextStem([t1, t2, t3, t4]),
        correct,
        distractors: [
          { v: (k + 5) * (k + 5), token: OFF_BY_ONE_STEP }, // counted one square too far
          { v: t4 + (t4 - t3), token: WRONG_OPERATION }, // added the last gap again (gaps actually grow)
          { v: 2 * t4, token: TEMPTING_MISREAD }, // read it as doubling
        ],
        solution: `These are perfect squares: ${k}², ${k + 1}², ${k + 2}², ${k + 3}², so the next is ${k + 4}² = ${correct}.`,
      }
    }
    case 'cubes': {
      const { k } = spec
      const t1 = k ** 3
      const t2 = (k + 1) ** 3
      const t3 = (k + 2) ** 3
      const t4 = (k + 3) ** 3
      const correct = (k + 4) ** 3
      return {
        stem: nextStem([t1, t2, t3, t4]),
        correct,
        distractors: [
          { v: (k + 5) ** 3, token: OFF_BY_ONE_STEP }, // counted one cube too far
          { v: t4 + (t4 - t3), token: WRONG_OPERATION }, // added the last gap instead of cubing
          { v: 2 * t4, token: TEMPTING_MISREAD }, // read it as doubling
        ],
        solution: `These are perfect cubes: ${k}³, ${k + 1}³, ${k + 2}³, ${k + 3}³, so the next is ${k + 4}³ = ${correct}.`,
      }
    }
    case 'add-multiply': {
      const { a, q, p } = spec
      const t1 = a
      const t2 = t1 * q + p
      const t3 = t2 * q + p
      const t4 = t3 * q + p
      const correct = t4 * q + p // ×q then +p
      return {
        stem: nextStem([t1, t2, t3, t4]),
        correct,
        distractors: [
          { v: t4 * q + 2 * p, token: OFF_BY_ONE_STEP }, // added the +${p} one time too many
          { v: t4 * q, token: WRONG_OPERATION }, // multiplied but forgot to add ${p}
          { v: t4 + (t4 - t3), token: TEMPTING_MISREAD }, // treated it as one arithmetic sequence
        ],
        solution: `Each term is ×${q} then +${p}: ${t4} × ${q} + ${p} = ${correct}.`,
      }
    }
  }
}

// --- The fixed spec list (84 items). Order sets the slot, which drives the ----
// deterministic answer position (slot % 4) so positions stay balanced.
const SPECS: Spec[] = [
  // ---- Arithmetic, next term (12) ----
  { kind: 'arithmetic', tier: 'easy', a: 2, d: 3 },
  { kind: 'arithmetic', tier: 'easy', a: 1, d: 5 },
  { kind: 'arithmetic', tier: 'easy', a: 4, d: 2 },
  { kind: 'arithmetic', tier: 'easy', a: 3, d: 4 },
  { kind: 'arithmetic', tier: 'easy', a: 5, d: 5 },
  { kind: 'arithmetic', tier: 'easy', a: 6, d: 3 },
  { kind: 'arithmetic', tier: 'easy', a: 2, d: 7 },
  { kind: 'arithmetic', tier: 'easy', a: 10, d: 10 },
  { kind: 'arithmetic', tier: 'medium', a: 7, d: 6 },
  { kind: 'arithmetic', tier: 'medium', a: 12, d: 8 },
  { kind: 'arithmetic', tier: 'medium', a: 9, d: 11 },
  { kind: 'arithmetic', tier: 'medium', a: 15, d: 9 },

  // ---- Arithmetic, missing middle term (6) ----
  { kind: 'arithmetic-mid', tier: 'easy', a: 2, d: 3 },
  { kind: 'arithmetic-mid', tier: 'easy', a: 5, d: 2 },
  { kind: 'arithmetic-mid', tier: 'medium', a: 3, d: 7 },
  { kind: 'arithmetic-mid', tier: 'medium', a: 8, d: 3 },
  { kind: 'arithmetic-mid', tier: 'medium', a: 4, d: 9 },
  { kind: 'arithmetic-mid', tier: 'medium', a: 10, d: 4 },

  // ---- Geometric (12) ----
  { kind: 'geometric', tier: 'medium', a: 1, r: 2 },
  { kind: 'geometric', tier: 'medium', a: 2, r: 2 },
  { kind: 'geometric', tier: 'medium', a: 3, r: 2 },
  { kind: 'geometric', tier: 'medium', a: 4, r: 2 },
  { kind: 'geometric', tier: 'medium', a: 5, r: 2 },
  { kind: 'geometric', tier: 'medium', a: 6, r: 2 },
  { kind: 'geometric', tier: 'hard', a: 1, r: 3 },
  { kind: 'geometric', tier: 'hard', a: 2, r: 3 },
  { kind: 'geometric', tier: 'hard', a: 3, r: 3 },
  { kind: 'geometric', tier: 'hard', a: 1, r: 4 },
  { kind: 'geometric', tier: 'hard', a: 2, r: 4 },
  { kind: 'geometric', tier: 'hard', a: 1, r: 5 },

  // ---- Alternating operations +p, ×q (12) ----
  { kind: 'alternating', tier: 'medium', a: 2, p: 3, q: 2 },
  { kind: 'alternating', tier: 'medium', a: 3, p: 2, q: 2 },
  { kind: 'alternating', tier: 'medium', a: 2, p: 4, q: 2 },
  { kind: 'alternating', tier: 'medium', a: 1, p: 4, q: 2 },
  { kind: 'alternating', tier: 'medium', a: 4, p: 2, q: 2 },
  { kind: 'alternating', tier: 'medium', a: 1, p: 5, q: 2 },
  { kind: 'alternating', tier: 'medium', a: 5, p: 3, q: 2 },
  { kind: 'alternating', tier: 'hard', a: 1, p: 2, q: 3 },
  { kind: 'alternating', tier: 'hard', a: 1, p: 3, q: 3 },
  { kind: 'alternating', tier: 'hard', a: 2, p: 2, q: 3 },
  { kind: 'alternating', tier: 'hard', a: 2, p: 5, q: 2 },
  { kind: 'alternating', tier: 'hard', a: 3, p: 5, q: 2 },

  // ---- Two interleaved sequences (12) ----
  { kind: 'interleaved', tier: 'medium', o0: 1, e: 3, e0: 5, f: 4 },
  { kind: 'interleaved', tier: 'medium', o0: 2, e: 5, e0: 3, f: 2 },
  { kind: 'interleaved', tier: 'medium', o0: 2, e: 6, e0: 1, f: 4 },
  { kind: 'interleaved', tier: 'medium', o0: 1, e: 6, e0: 4, f: 2 },
  { kind: 'interleaved', tier: 'hard', o0: 1, e: 4, e0: 10, f: 3 },
  { kind: 'interleaved', tier: 'hard', o0: 3, e: 2, e0: 8, f: 5 },
  { kind: 'interleaved', tier: 'hard', o0: 5, e: 4, e0: 2, f: 6 },
  { kind: 'interleaved', tier: 'hard', o0: 4, e: 3, e0: 10, f: 6 },
  { kind: 'interleaved', tier: 'hard', o0: 1, e: 5, e0: 20, f: 10 },
  { kind: 'interleaved', tier: 'hard', o0: 3, e: 4, e0: 8, f: 6 },
  { kind: 'interleaved', tier: 'hard', o0: 2, e: 7, e0: 5, f: 3 },
  { kind: 'interleaved', tier: 'hard', o0: 6, e: 5, e0: 2, f: 8 },

  // ---- Perfect squares (8) ----
  { kind: 'squares', tier: 'easy', k: 1 },
  { kind: 'squares', tier: 'easy', k: 2 },
  { kind: 'squares', tier: 'easy', k: 3 },
  { kind: 'squares', tier: 'medium', k: 4 },
  { kind: 'squares', tier: 'medium', k: 5 },
  { kind: 'squares', tier: 'medium', k: 6 },
  { kind: 'squares', tier: 'hard', k: 7 },
  { kind: 'squares', tier: 'hard', k: 8 },

  // ---- Perfect cubes (6) ----
  { kind: 'cubes', tier: 'medium', k: 1 },
  { kind: 'cubes', tier: 'medium', k: 2 },
  { kind: 'cubes', tier: 'hard', k: 3 },
  { kind: 'cubes', tier: 'hard', k: 4 },
  { kind: 'cubes', tier: 'hard', k: 5 },
  { kind: 'cubes', tier: 'hard', k: 6 },

  // ---- Add-then-multiply recurrence ×q then +p (16) ----
  { kind: 'add-multiply', tier: 'medium', a: 1, q: 2, p: 1 },
  { kind: 'add-multiply', tier: 'medium', a: 1, q: 2, p: 2 },
  { kind: 'add-multiply', tier: 'medium', a: 2, q: 2, p: 1 },
  { kind: 'add-multiply', tier: 'medium', a: 3, q: 2, p: 2 },
  { kind: 'add-multiply', tier: 'medium', a: 2, q: 2, p: 2 },
  { kind: 'add-multiply', tier: 'medium', a: 3, q: 2, p: 1 },
  { kind: 'add-multiply', tier: 'medium', a: 1, q: 2, p: 3 },
  { kind: 'add-multiply', tier: 'medium', a: 4, q: 2, p: 3 },
  { kind: 'add-multiply', tier: 'hard', a: 2, q: 2, p: 3 },
  { kind: 'add-multiply', tier: 'hard', a: 1, q: 3, p: 2 },
  { kind: 'add-multiply', tier: 'hard', a: 2, q: 3, p: 1 },
  { kind: 'add-multiply', tier: 'hard', a: 1, q: 4, p: 1 },
  { kind: 'add-multiply', tier: 'hard', a: 1, q: 3, p: 1 },
  { kind: 'add-multiply', tier: 'hard', a: 2, q: 4, p: 1 },
  { kind: 'add-multiply', tier: 'hard', a: 1, q: 2, p: 5 },
  { kind: 'add-multiply', tier: 'hard', a: 3, q: 3, p: 2 },
]

// --- Skill construction -----------------------------------------------------
function toItem(spec: Spec, slot: number): PrepItem {
  const b = build(spec)
  return {
    slot,
    difficulty: spec.tier,
    stem: b.stem,
    choices: [
      { text: n(b.correct), is_correct: true }, // correct FIRST; buildPrepQuestion reorders
      ...b.distractors.map((x) => ({ text: n(x.v), is_correct: false, misconception_token: x.token })),
    ],
    solution: b.solution,
  }
}

export const PREP_QUANT_SUBJECT = { key: 'subj-prep-quant', subject: 'prep-quant', name: 'Test Prep, Quantitative' }
export const PREP_QUANT_DOMAIN = { key: 'dom-prep-quant', name: 'Quantitative Reasoning' }

export const PREP_NUMBER_SERIES_SKILLS: PrepSkill[] = [
  {
    slug: 'prep-number-series',
    name: 'Number Series',
    subject: 'prep-quant',
    gradeBand: '6-8',
    items: SPECS.map((spec, i) => toItem(spec, i + 1)),
  },
]

/** The pattern kind behind each 1-based slot, for reporting/analytics. */
export const NUMBER_SERIES_PATTERN_BY_SLOT: Record<number, Spec['kind']> = Object.fromEntries(
  SPECS.map((spec, i) => [i + 1, spec.kind]),
)
