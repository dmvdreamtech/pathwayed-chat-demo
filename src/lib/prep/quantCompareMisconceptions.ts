/**
 * Misconception tokens and their plain-language explanations for quantCompareTemplates.
 *
 * Split out of the question bank so the browser can explain a wrong answer
 * without importing the bank itself: the bank holds every item and its answer,
 * and anything the app imports ships in the JavaScript bundle. Only the token
 * names and their explanations live here. See noQuestionBanksInBundle.test.ts.
 */

export const QC_COMPUTED_ONE = 'qc-computed-one-side' // worked out one column / stopped early, then guessed
export const QC_SWAPPED = 'qc-swapped-columns' // flipped which value belongs to which column
export const QC_ARITH = 'qc-off-by-arithmetic' // an order-of-operations / times / plus slip
export const QC_IGNORED_COND = 'qc-ignored-condition' // skipped a given fact that settles it
export const QC_MISREAD = 'qc-misread-expression' // read one column's expression wrong
export const QC_TESTED_ONE = 'qc-tested-one-value' // tried one number and generalized
export const QC_ASSUMED_POS = 'qc-assumed-positive' // assumed the value must be positive
export const QC_ASSUMED_INT = 'qc-assumed-integer' // assumed the value must be a whole number
export const QC_IGNORED_NEG = 'qc-ignored-negative' // forgot the value could be negative
export const QC_IGNORED_FRAC = 'qc-ignored-fraction' // forgot the value could be a fraction 0<x<1
export const QC_ASSUMED_EVEN = 'qc-assumed-even-split' // treated an average as if every value equalled it

export const QUANT_COMPARE_MISCONCEPTIONS: Record<string, string> = {
  [QC_COMPUTED_ONE]:
    'You worked out only one column (or stopped partway) and then guessed. Figure out BOTH columns all the way, then compare them.',
  [QC_SWAPPED]:
    'You mixed up the columns, the value you put in Column A really belongs to Column B, or the other way around. Check which value goes with which column.',
  [QC_ARITH]:
    'A small arithmetic slip (order of operations, or a times/plus mistake) changed your result. Redo the calculation one careful step at a time.',
  [QC_IGNORED_COND]:
    'You skipped a fact the problem told you. That given condition settles the answer, go back and use it.',
  [QC_MISREAD]:
    'You read one of the expressions wrong. Re-read exactly what each column says before you compute anything.',
  [QC_TESTED_ONE]:
    'You tried a single number, saw what happened, and assumed it is always that way. Test a few DIFFERENT kinds of numbers (big, small, a fraction, a negative) before deciding.',
  [QC_ASSUMED_POS]:
    'You assumed the value has to be positive. If it could be zero or negative, the comparison can flip.',
  [QC_ASSUMED_INT]:
    'You assumed the value has to be a whole number. If it could be a fraction or decimal, the comparison can flip.',
  [QC_IGNORED_NEG]:
    'You forgot the value could be negative. Negative numbers can reverse which column is larger.',
  [QC_IGNORED_FRAC]:
    'You forgot the value could be a fraction between 0 and 1. Fractions like 1/2 can flip results such as squaring or multiplying.',
  [QC_ASSUMED_EVEN]:
    'You assumed the numbers were all equal to the average. An average hides how spread out the real values are.',
}
