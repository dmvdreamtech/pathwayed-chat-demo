/**
 * Misconception tokens and their plain-language explanations for analogyTemplates.
 *
 * Split out of the question bank so the browser can explain a wrong answer
 * without importing the bank itself: the bank holds every item and its answer,
 * and anything the app imports ships in the JavaScript bundle. Only the token
 * names and their explanations live here. See noQuestionBanksInBundle.test.ts.
 */

export const WRONG_REL = 'analogy-wrong-relationship' // applied a real but DIFFERENT relation
export const SAME_CAT = 'analogy-same-category-not-relation' // grabbed a word from a category, not the relation
export const REVERSED = 'analogy-reversed-relation' // matched the relation backwards (B:A, not A:B)
export const ASSOCIATED = 'analogy-associated-not-parallel' // a word merely associated with C

export const ANALOGY_MISCONCEPTIONS: Record<string, string> = {
  [WRONG_REL]:
    'That pair does have a real connection, but it is a DIFFERENT one than the example shows. First figure out exactly how the first two words are linked, then use that same link for the second pair.',
  [SAME_CAT]:
    'That word is in the same general group as one of the words, but just being in the same category is not the connection. Match the SPECIFIC relationship the first pair shows.',
  [REVERSED]:
    'You matched the relationship backwards. Watch the order: whatever the first word does to the second, the third word should do to your answer in that SAME direction.',
  [ASSOCIATED]:
    'That word just goes along with the third word, but the analogy needs the SAME relationship as the first pair, not a word that is simply related to it.',
}
