/**
 * Prep quantitative-comparison bank — HSPT-style comparisons and ISEE
 * "Column A / Column B" quantitative comparisons, grades 6-8.
 *
 * The quant analogue of verbalTemplates.ts, held to the SAME bar: every item has
 * 4 choices, exactly one correct, and THREE distractors that are each a specific
 * wrong path a real 7th grader takes — never a random pick. Here the FOUR choices
 * are always the same four relationship sentences ("Column A is greater", ...),
 * so there is no length or wording tell by construction; buildPrepQuestion still
 * balances WHICH position holds the correct answer, and every wrong relationship
 * carries a misconception token explaining why a careless student would land on
 * THAT relationship for THIS item.
 *
 * The hard part is the "cannot be determined" items: each one is written to LOOK
 * determinable (a variable that seems pinned down but could be a fraction, zero,
 * or negative; an average that hides its spread). A student who computes one case
 * feels sure — and is wrong. The solution for those proves indeterminacy with two
 * cases that disagree.
 *
 * Deterministic: fixed content, no runtime randomness. Served through the same
 * generated_questions path as the rest of the prep bank.
 */

import {
  buildPrepQuestion,
  seedForSlot,
  type Difficulty,
  type PrepChoice,
  type PrepItem,
  type PrepSkill,
} from './verbalTemplates'
import { QUANT_COMPARE_MISCONCEPTIONS, QC_COMPUTED_ONE, QC_SWAPPED, QC_ARITH, QC_IGNORED_COND, QC_MISREAD, QC_TESTED_ONE, QC_ASSUMED_POS, QC_ASSUMED_INT, QC_IGNORED_NEG, QC_IGNORED_FRAC, QC_ASSUMED_EVEN } from './quantCompareMisconceptions'
export { QUANT_COMPARE_MISCONCEPTIONS }

// Re-export the shared helpers so seed/build scripts can import from this module too.
export { buildPrepQuestion, seedForSlot }

// --- The four fixed relationship options -----------------------------------
// The choice TEXTS are identical across every item — four different relationship
// sentences. Because they are fixed, there is no "longest answer" or wording tell
// a test-taker could exploit; buildPrepQuestion only shuffles which POSITION holds
// the correct one.
type Rel = 'A' | 'B' | 'EQ' | 'ND'

const REL_TEXT: Record<Rel, string> = {
  A: 'Column A is greater',
  B: 'Column B is greater',
  EQ: 'The two are equal',
  ND: 'It cannot be determined from the information given',
}

// Misconception tokens and their explanations live in ./quantCompareMisconceptions.ts, so the
// browser can explain a wrong answer without importing this bank.

// --- Item specs -------------------------------------------------------------
interface Spec {
  tier: Difficulty
  stem: string
  correct: Rel
  tokens: Partial<Record<Rel, string>> // token for each of the 3 WRONG relationships
  solution: string
}

// Determinable-item builders assign the archetype tokens automatically:
//   correct A -> B looks bigger (swapped), EQ (arithmetic slip), ND (didn't finish / ignored a condition)
//   correct B -> A looks bigger (swapped), EQ (arithmetic slip), ND (didn't finish / ignored a condition)
//   correct EQ-> A looks bigger (arithmetic slip), B looks bigger (misread), ND (didn't finish / ignored a condition)
const detA = (tier: Difficulty, stem: string, hasCond: boolean, solution: string): Spec => ({
  tier,
  stem,
  correct: 'A',
  tokens: { B: QC_SWAPPED, EQ: QC_ARITH, ND: hasCond ? QC_IGNORED_COND : QC_COMPUTED_ONE },
  solution,
})
const detB = (tier: Difficulty, stem: string, hasCond: boolean, solution: string): Spec => ({
  tier,
  stem,
  correct: 'B',
  tokens: { A: QC_SWAPPED, EQ: QC_ARITH, ND: hasCond ? QC_IGNORED_COND : QC_COMPUTED_ONE },
  solution,
})
const detEQ = (tier: Difficulty, stem: string, hasCond: boolean, solution: string): Spec => ({
  tier,
  stem,
  correct: 'EQ',
  tokens: { A: QC_ARITH, B: QC_MISREAD, ND: hasCond ? QC_IGNORED_COND : QC_COMPUTED_ONE },
  solution,
})
// Cannot-be-determined builder: tokens are the three overlooked scenarios, one per
// determinate relationship a careless student would confidently pick.
const nd = (
  tier: Difficulty,
  stem: string,
  tokens: { A: string; B: string; EQ: string },
  solution: string,
): Spec => ({ tier, stem, correct: 'ND', tokens, solution })

const SPECS: Spec[] = [
  // =====================================================================
  // Column A is greater (21)
  // =====================================================================
  detA('easy', 'Column A: 3/4.  Column B: 2/3.  Which is greater?', false,
    '3/4 = 0.75 and 2/3 ≈ 0.667, so Column A is greater.'),
  detA('easy', 'Column A: 25% of 80.  Column B: 15.  Which is greater?', false,
    '25% of 80 = 20, which is greater than 15.'),
  detA('medium', 'Column A: 2^5.  Column B: 5^2.  Which is greater?', false,
    '2^5 = 32 and 5^2 = 25, so Column A is greater.'),
  detA('medium', 'Column A: the perimeter of a square with side 6.  Column B: the perimeter of a 5-by-6 rectangle.  Which is greater?', false,
    'Square perimeter = 4 × 6 = 24; rectangle perimeter = 2 × (5 + 6) = 22. Column A is greater.'),
  detA('easy', 'Column A: 0.5.  Column B: 0.45.  Which is greater?', false,
    '0.5 > 0.45, so Column A is greater.'),
  detA('medium', 'Column A: the least common multiple of 4 and 6.  Column B: 10.  Which is greater?', false,
    'LCM(4, 6) = 12 > 10, so Column A is greater.'),
  detA('easy', 'Column A: 7 × 8.  Column B: 6 × 9.  Which is greater?', false,
    '7 × 8 = 56 and 6 × 9 = 54, so Column A is greater.'),
  detA('medium', 'Column A: the average of 10, 20, and 30.  Column B: 18.  Which is greater?', false,
    'Average = 60 ÷ 3 = 20 > 18, so Column A is greater.'),
  detA('medium', 'Column A: 3/5.  Column B: 0.55.  Which is greater?', false,
    '3/5 = 0.6 > 0.55, so Column A is greater.'),
  detA('hard', 'Column A: 2^10.  Column B: 1000.  Which is greater?', false,
    '2^10 = 1024 > 1000, so Column A is greater.'),
  detA('medium', 'Given x = 4, Column A: x².  Column B: 3x + 2.  Which is greater?', true,
    'With x = 4: x² = 16 and 3x + 2 = 14, so Column A is greater.'),
  detA('medium', 'Column A: 15% of 200.  Column B: 25% of 100.  Which is greater?', false,
    '15% of 200 = 30 and 25% of 100 = 25, so Column A is greater.'),
  detA('hard', 'Column A: 5!.  Column B: 100.  Which is greater?', false,
    '5! = 5 × 4 × 3 × 2 × 1 = 120 > 100, so Column A is greater.'),
  detA('medium', 'Column A: 1/2 + 1/3.  Column B: 3/4.  Which is greater?', false,
    '1/2 + 1/3 = 5/6 ≈ 0.833, which is greater than 3/4 = 0.75.'),
  detA('easy', 'Column A: the sum of the first 5 positive integers.  Column B: 14.  Which is greater?', false,
    '1 + 2 + 3 + 4 + 5 = 15 > 14, so Column A is greater.'),
  detA('medium', 'Column A: (-3)².  Column B: 8.  Which is greater?', false,
    '(-3)² = 9 > 8, so Column A is greater.'),
  detA('medium', 'Given x > 10, Column A: x.  Column B: 9.  Which is greater?', true,
    'Since x > 10, x is always greater than 9. Column A is greater.'),
  detA('easy', 'Column A: 2/5 of 50.  Column B: 18.  Which is greater?', false,
    '2/5 of 50 = 20 > 18, so Column A is greater.'),
  detA('easy', 'Column A: 6².  Column B: 30.  Which is greater?', false,
    '6² = 36 > 30, so Column A is greater.'),
  detA('medium', 'Given x = 5, Column A: x².  Column B: 4x + 3.  Which is greater?', true,
    'With x = 5: x² = 25 and 4x + 3 = 23, so Column A is greater.'),
  detA('easy', 'Column A: the number of days in 3 weeks.  Column B: 20.  Which is greater?', false,
    '3 weeks = 3 × 7 = 21 days > 20, so Column A is greater.'),

  // =====================================================================
  // Column B is greater (21)
  // =====================================================================
  detB('easy', 'Column A: 2/3.  Column B: 3/4.  Which is greater?', false,
    '2/3 ≈ 0.667 and 3/4 = 0.75, so Column B is greater.'),
  detB('medium', 'Column A: 3².  Column B: 2^4.  Which is greater?', false,
    '3² = 9 and 2^4 = 16, so Column B is greater.'),
  detB('easy', 'Column A: 10.  Column B: 12.  Which is greater?', false,
    '12 > 10, so Column B is greater.'),
  detB('medium', 'Column A: 0.3.  Column B: 1/3.  Which is greater?', false,
    '1/3 ≈ 0.333 > 0.3, so Column B is greater.'),
  detB('easy', 'Column A: 5 × 6.  Column B: 4 × 8.  Which is greater?', false,
    '5 × 6 = 30 and 4 × 8 = 32, so Column B is greater.'),
  detB('medium', 'Column A: the average of 5 and 10.  Column B: 8.  Which is greater?', false,
    'Average = 15 ÷ 2 = 7.5 < 8, so Column B is greater.'),
  detB('medium', 'Column A: 20% of 50.  Column B: 30% of 40.  Which is greater?', false,
    '20% of 50 = 10 and 30% of 40 = 12, so Column B is greater.'),
  detB('medium', 'Given x = 3, Column A: 2x.  Column B: x².  Which is greater?', true,
    'With x = 3: 2x = 6 and x² = 9, so Column B is greater.'),
  detB('medium', 'Column A: the perimeter of a square with side 4.  Column B: the perimeter of a 5-by-4 rectangle.  Which is greater?', false,
    'Square perimeter = 4 × 4 = 16; rectangle perimeter = 2 × (5 + 4) = 18. Column B is greater.'),
  detB('medium', 'Column A: 3/8.  Column B: 2/5.  Which is greater?', false,
    '3/8 = 0.375 and 2/5 = 0.4, so Column B is greater.'),
  detB('hard', 'Column A: 4!.  Column B: 5².  Which is greater?', false,
    '4! = 24 and 5² = 25, so Column B is greater.'),
  detB('hard', 'Column A: 100.  Column B: 2^7.  Which is greater?', false,
    '2^7 = 128 > 100, so Column B is greater.'),
  detB('medium', 'Given y < 0, Column A: y.  Column B: 0.  Which is greater?', true,
    'Since y < 0, y is always less than 0, so Column B is greater.'),
  detB('easy', 'Column A: 1/4 + 1/4.  Column B: 0.6.  Which is greater?', false,
    '1/4 + 1/4 = 0.5 < 0.6, so Column B is greater.'),
  detB('medium', 'Column A: 7².  Column B: 50.  Which is greater?', false,
    '7² = 49 < 50, so Column B is greater.'),
  detB('easy', 'Column A: the sum of the first 4 positive integers.  Column B: 11.  Which is greater?', false,
    '1 + 2 + 3 + 4 = 10 < 11, so Column B is greater.'),
  detB('medium', 'Column A: 15.  Column B: the least common multiple of 5 and 6.  Which is greater?', false,
    'LCM(5, 6) = 30 > 15, so Column B is greater.'),
  detB('medium', 'Given x > 5, Column A: 10.  Column B: x + 7.  Which is greater?', true,
    'Since x > 5, x + 7 > 12, which is always greater than 10. Column B is greater.'),
  detB('medium', 'Column A: 3/7.  Column B: 1/2.  Which is greater?', false,
    '3/7 ≈ 0.429 < 0.5 = 1/2, so Column B is greater.'),
  detB('easy', 'Column A: 40.  Column B: 6² + 5.  Which is greater?', false,
    '6² + 5 = 36 + 5 = 41 > 40, so Column B is greater.'),
  detB('easy', 'Column A: 2^3.  Column B: 3².  Which is greater?', false,
    '2^3 = 8 and 3² = 9, so Column B is greater.'),

  // =====================================================================
  // The two are equal (21)
  // =====================================================================
  detEQ('easy', 'Column A: 1/2.  Column B: 0.5.  Which is greater?', false,
    '1/2 = 0.5, so the two are equal.'),
  detEQ('easy', 'Column A: 3/6.  Column B: 2/4.  Which is greater?', false,
    'Both fractions reduce to 1/2, so the two are equal.'),
  detEQ('easy', 'Column A: 2^3.  Column B: 2 × 4.  Which is greater?', false,
    '2^3 = 8 and 2 × 4 = 8, so the two are equal.'),
  detEQ('medium', 'Column A: 25% of 40.  Column B: 10% of 100.  Which is greater?', false,
    '25% of 40 = 10 and 10% of 100 = 10, so the two are equal.'),
  detEQ('medium', 'Column A: 3 + 4 × 2.  Column B: 22 ÷ 2.  Which is greater?', false,
    'Order of operations: 3 + 4 × 2 = 3 + 8 = 11; and 22 ÷ 2 = 11. The two are equal.'),
  detEQ('medium', 'Column A: the perimeter of a square with side 5.  Column B: the perimeter of a 6-by-4 rectangle.  Which is greater?', false,
    'Square perimeter = 4 × 5 = 20; rectangle perimeter = 2 × (6 + 4) = 20. The two are equal.'),
  detEQ('easy', 'Column A: 0.25.  Column B: 1/4.  Which is greater?', false,
    '1/4 = 0.25, so the two are equal.'),
  detEQ('medium', 'Column A: the average of 5 and 7.  Column B: the average of 4 and 8.  Which is greater?', false,
    'Average of 5 and 7 = 6; average of 4 and 8 = 6. The two are equal.'),
  detEQ('easy', 'Column A: 5².  Column B: 100 ÷ 4.  Which is greater?', false,
    '5² = 25 and 100 ÷ 4 = 25, so the two are equal.'),
  detEQ('hard', 'Column A: 6! ÷ 5!.  Column B: 2 × 3.  Which is greater?', false,
    '6! ÷ 5! = 6 and 2 × 3 = 6, so the two are equal.'),
  detEQ('medium', 'Column A: 1/3 + 1/6.  Column B: 2/4.  Which is greater?', false,
    '1/3 + 1/6 = 1/2 and 2/4 = 1/2, so the two are equal.'),
  detEQ('medium', 'Column A: 2^4.  Column B: 4².  Which is greater?', false,
    '2^4 = 16 and 4² = 16, so the two are equal.'),
  detEQ('easy', 'Column A: 0.75.  Column B: 3/4.  Which is greater?', false,
    '3/4 = 0.75, so the two are equal.'),
  detEQ('medium', 'Column A: 30% of 200.  Column B: 60% of 100.  Which is greater?', false,
    '30% of 200 = 60 and 60% of 100 = 60, so the two are equal.'),
  detEQ('easy', 'Column A: 7 × 6.  Column B: 84 ÷ 2.  Which is greater?', false,
    '7 × 6 = 42 and 84 ÷ 2 = 42, so the two are equal.'),
  detEQ('hard', 'Column A: 9².  Column B: 3^4.  Which is greater?', false,
    '9² = 81 and 3^4 = 81, so the two are equal.'),
  detEQ('medium', 'Given x = 5, Column A: 2x + 3.  Column B: 3x - 2.  Which is greater?', true,
    'With x = 5: 2x + 3 = 13 and 3x - 2 = 13, so the two are equal.'),
  detEQ('easy', 'Column A: 1/5 of 100.  Column B: 4 × 5.  Which is greater?', false,
    '1/5 of 100 = 20 and 4 × 5 = 20, so the two are equal.'),
  detEQ('hard', 'Column A: (2 + 3)².  Column B: 2² + 3² + (2 × 2 × 3).  Which is greater?', false,
    '(2 + 3)² = 25; and 2² + 3² + (2 × 2 × 3) = 4 + 9 + 12 = 25. The two are equal.'),
  detEQ('easy', 'Column A: the number of minutes in an hour.  Column B: 5 × 12.  Which is greater?', false,
    'An hour has 60 minutes and 5 × 12 = 60, so the two are equal.'),
  detEQ('medium', 'Given x = 2, Column A: 4x.  Column B: x³.  Which is greater?', true,
    'With x = 2: 4x = 8 and x³ = 8, so the two are equal.'),

  // =====================================================================
  // It cannot be determined (21) — each LOOKS determinable
  // =====================================================================
  nd('medium', 'Given x > 0, Column A: x.  Column B: x².  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_IGNORED_FRAC, EQ: QC_ASSUMED_INT },
    'If x = 3, A = 3 and B = 9, so B is greater. But if x = 1/2, A = 0.5 and B = 0.25, so A is greater. Since x is only "positive," it cannot be determined.'),
  nd('medium', 'For a number x, Column A: x².  Column B: 5x.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_IGNORED_FRAC, EQ: QC_IGNORED_NEG },
    'If x = 6, A = 36 and B = 30, so A is greater. If x = 2, A = 4 and B = 10, so B is greater. It cannot be determined.'),
  nd('hard', 'Given a > b, Column A: a².  Column B: b².  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_IGNORED_NEG, EQ: QC_ASSUMED_POS },
    'If a = 3 and b = 2, A = 9 and B = 4, so A is greater. But if a = 1 and b = -5, A = 1 and B = 25, so B is greater. It cannot be determined.'),
  nd('easy', 'For a number x, Column A: 3x.  Column B: 2x.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_IGNORED_NEG, EQ: QC_ASSUMED_POS },
    'If x = 4, A = 12 and B = 8, so A is greater. If x = -4, A = -12 and B = -8, so B is greater (and if x = 0 they are equal). It cannot be determined.'),
  nd('medium', 'For a nonzero number x, Column A: 1/x.  Column B: x.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_IGNORED_FRAC, EQ: QC_IGNORED_NEG },
    'If x = 2, A = 0.5 and B = 2, so B is greater. If x = 1/2, A = 2 and B = 0.5, so A is greater. It cannot be determined.'),
  nd('medium', 'Given x > 0, Column A: x².  Column B: 2x.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_IGNORED_FRAC, EQ: QC_ASSUMED_INT },
    'If x = 3, A = 9 and B = 6, so A is greater. If x = 1, A = 1 and B = 2, so B is greater. It cannot be determined.'),
  nd('medium', 'The average of two numbers is 10.  Column A: the larger of the two numbers.  Column B: 12.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_ASSUMED_EVEN, EQ: QC_ASSUMED_INT },
    'If the numbers are 5 and 15, the larger is 15, so A is greater. If the numbers are 10 and 10, the larger is 10, so B is greater. It cannot be determined.'),
  nd('medium', 'A class has an average test score of 80.  Column A: the highest score in the class.  Column B: 80.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_ASSUMED_EVEN, EQ: QC_ASSUMED_POS },
    'If one student scored 95, the highest is 95, so A is greater. If everyone scored exactly 80, the highest is 80, so the two are equal. Since it could be either, it cannot be determined.'),
  nd('hard', 'Given that x is an integer and x² = 9, Column A: x.  Column B: 0.  Which is greater?',
    { A: QC_ASSUMED_POS, B: QC_IGNORED_NEG, EQ: QC_TESTED_ONE },
    'x² = 9 means x = 3 or x = -3. If x = 3, A is greater; if x = -3, A = -3 < 0, so B is greater. It cannot be determined.'),
  nd('medium', 'Given |x| = 5, Column A: x.  Column B: 4.  Which is greater?',
    { A: QC_ASSUMED_POS, B: QC_IGNORED_NEG, EQ: QC_TESTED_ONE },
    '|x| = 5 means x = 5 or x = -5. If x = 5, A is greater; if x = -5, A = -5 < 4, so B is greater. It cannot be determined.'),
  nd('hard', 'Given that xy > 0, Column A: x.  Column B: 0.  Which is greater?',
    { A: QC_ASSUMED_POS, B: QC_IGNORED_NEG, EQ: QC_TESTED_ONE },
    'xy > 0 means x and y share the same sign. If x = 2 and y = 3, then A = 2 > 0, so A is greater. If x = -2 and y = -3, then A = -2 < 0, so B is greater. It cannot be determined.'),
  nd('easy', 'Given that x + y = 10, Column A: x.  Column B: 5.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_ASSUMED_EVEN, EQ: QC_ASSUMED_INT },
    'If x = 6 (so y = 4), A is greater. If x = 3 (so y = 7), A = 3 < 5, so B is greater. It cannot be determined.'),
  nd('hard', 'Given that x² > 4, Column A: x.  Column B: 2.  Which is greater?',
    { A: QC_ASSUMED_POS, B: QC_IGNORED_NEG, EQ: QC_TESTED_ONE },
    'x² > 4 means x > 2 or x < -2. If x = 3, A is greater. If x = -3, A = -3 < 2, so B is greater. It cannot be determined.'),
  nd('medium', 'For a number x, Column A: 2x.  Column B: x + 3.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_IGNORED_NEG, EQ: QC_ASSUMED_INT },
    'If x = 5, A = 10 and B = 8, so A is greater. If x = 1, A = 2 and B = 4, so B is greater. It cannot be determined.'),
  nd('medium', 'The average of 5 numbers is 12.  Column A: the largest of the numbers.  Column B: 12.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_ASSUMED_EVEN, EQ: QC_ASSUMED_INT },
    'If all five numbers are 12, the largest is 12, so the two are equal. If the numbers are 10, 10, 10, 10, 20, the largest is 20, so A is greater. It cannot be determined.'),
  nd('medium', 'Given that a > 0 and b > 0, Column A: a/b.  Column B: 1.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_IGNORED_FRAC, EQ: QC_ASSUMED_INT },
    'If a = 3 and b = 2, then A = 1.5, so A is greater. If a = 2 and b = 3, then A ≈ 0.67, so B is greater. It cannot be determined.'),
  nd('easy', 'Given that x < 5, Column A: x.  Column B: 3.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_IGNORED_NEG, EQ: QC_ASSUMED_INT },
    'If x = 4, A is greater. If x = 1, A = 1 < 3, so B is greater. It cannot be determined.'),
  nd('medium', 'For a number x, Column A: -x.  Column B: x.  Which is greater?',
    { A: QC_ASSUMED_POS, B: QC_IGNORED_NEG, EQ: QC_TESTED_ONE },
    'If x = -3, then A = 3 and B = -3, so A is greater. If x = 3, then A = -3 and B = 3, so B is greater (and if x = 0 they are equal). It cannot be determined.'),
  nd('hard', 'Given x > 0, Column A: x + 1/x.  Column B: 2.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_IGNORED_FRAC, EQ: QC_ASSUMED_INT },
    'If x = 2, A = 2.5, so A is greater. If x = 1, A = 2, so the two are equal. Since A is sometimes greater and sometimes equal, it cannot be determined.'),
  nd('medium', 'For a number m, Column A: m².  Column B: 1.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_IGNORED_FRAC, EQ: QC_ASSUMED_INT },
    'If m = 2, A = 4, so A is greater. If m = 1/2, A = 0.25, so B is greater. It cannot be determined.'),
  nd('hard', 'Given that p > 0 and q > 0, Column A: p + q.  Column B: pq.  Which is greater?',
    { A: QC_TESTED_ONE, B: QC_IGNORED_FRAC, EQ: QC_ASSUMED_INT },
    'If p = 1 and q = 1, then A = 2 and B = 1, so A is greater. If p = 3 and q = 3, then A = 6 and B = 9, so B is greater. It cannot be determined.'),
]

// --- Item construction ------------------------------------------------------
// The CORRECT choice goes FIRST (is_correct, no token); buildPrepQuestion reorders
// positions deterministically from the slot. Each of the 3 remaining relationship
// options carries the misconception token for the specific error that leads there.
function buildItem(slot: number, s: Spec): PrepItem {
  const order: Rel[] = ['A', 'B', 'EQ', 'ND']
  const wrong = order.filter((r) => r !== s.correct)
  const choices: PrepChoice[] = [
    { text: REL_TEXT[s.correct], is_correct: true },
    ...wrong.map((r) => {
      const token = s.tokens[r]
      if (!token) throw new Error(`slot ${slot}: missing misconception token for wrong option ${r}`)
      return { text: REL_TEXT[r], is_correct: false, misconception_token: token }
    }),
  ]
  return { slot, difficulty: s.tier, stem: s.stem, choices, solution: s.solution }
}

export const PREP_QUANT_SUBJECT = { key: 'subj-prep-quant', subject: 'prep-quant', name: 'Test Prep, Quantitative' }
export const PREP_QUANT_DOMAIN = { key: 'dom-prep-quant', name: 'Quantitative Reasoning' }

export const PREP_QUANT_COMPARE_SKILLS: PrepSkill[] = [
  {
    slug: 'prep-quantitative-comparison',
    name: 'Quantitative Comparison',
    subject: 'prep-quant',
    gradeBand: '6-8',
    items: SPECS.map((s, i) => buildItem(i + 1, s)),
  },
]
