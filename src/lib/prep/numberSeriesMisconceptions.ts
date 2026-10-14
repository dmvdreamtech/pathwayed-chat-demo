/**
 * Misconception tokens and their plain-language explanations for numberSeriesTemplates.
 *
 * Split out of the question bank so the browser can explain a wrong answer
 * without importing the bank itself: the bank holds every item and its answer,
 * and anything the app imports ships in the JavaScript bundle. Only the token
 * names and their explanations live here. See noQuestionBanksInBundle.test.ts.
 */

export const OFF_BY_ONE_STEP = 'series-off-by-one-step'
export const WRONG_OPERATION = 'series-wrong-operation'
export const TEMPTING_MISREAD = 'series-tempting-misread'
export const MISREAD_INTERLEAVED = 'series-misread-interleaved'

export const NUMBER_SERIES_MISCONCEPTIONS: Record<string, string> = {
  [OFF_BY_ONE_STEP]:
    'You applied the rule one time too many or too few. Count the steps carefully and stop exactly at the missing term, do not go one extra step or come up one short.',
  [WRONG_OPERATION]:
    'You continued with the wrong operation. Check whether the pattern adds, multiplies, or does something else, then use that SAME rule to find the next term.',
  [TEMPTING_MISREAD]:
    'You read the pattern as the wrong kind. Look again at how each term changes, adding, multiplying, or squaring, before you pick the next number.',
  [MISREAD_INTERLEAVED]:
    'This is really TWO sequences taking turns. Follow only the terms in the same position (every other number), not all of the numbers as one single list.',
}
