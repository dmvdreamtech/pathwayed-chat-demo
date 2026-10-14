/**
 * Misconception tokens and their plain-language explanations for logicTemplates.
 *
 * Split out of the question bank so the browser can explain a wrong answer
 * without importing the bank itself: the bank holds every item and its answer,
 * and anything the app imports ships in the JavaScript bundle. Only the token
 * names and their explanations live here. See noQuestionBanksInBundle.test.ts.
 */

export const LOGIC_REVERSED = 'logic-reversed-implication' // flipped "all A are B" into "all B are A"
export const LOGIC_OVERGEN = 'logic-overgeneralized' // concluded more than the clues prove
export const LOGIC_ASSUMPTION = 'logic-unstated-assumption' // added a fact the problem never gave
export const LOGIC_ORDER = 'logic-wrong-order' // mixed up the order in a ranking problem
export const CLASS_WRONG_ATTR = 'class-wrong-attribute' // sorted by color/size/spelling, not category
export const CLASS_TOO_BROAD = 'class-too-broad-category' // reached for a category that is too general
export const CLASS_ASSOCIATED = 'class-associated-not-member' // related to the group but not a member
export const CLASS_MEMBER = 'class-picked-a-member' // in odd-one-out, flagged a word that DOES belong

export const LOGIC_MISCONCEPTIONS: Record<string, string> = {
  [LOGIC_REVERSED]:
    'You flipped the rule around. "All A are B" does not mean "all B are A", an arrow only points one way.',
  [LOGIC_OVERGEN]:
    'That says more than the clues prove. Stick to exactly what you were told; do not stretch it any further.',
  [LOGIC_ASSUMPTION]:
    'You added a fact the problem never gave you. Use only the clues that are actually written down.',
  [LOGIC_ORDER]:
    'The order got mixed up. Line the clues up carefully (tallest to shortest, first to last) before you choose.',
  [CLASS_WRONG_ATTR]:
    'You matched the wrong feature, like color, size, or spelling, instead of the group the word belongs to. Sort by category, not by how it looks.',
  [CLASS_TOO_BROAD]:
    'That word names a broader, more general category. It is too loose to be the exact match, and it still shares the group, so it is not the odd one out either.',
  [CLASS_ASSOCIATED]:
    'That word is connected to the group, but it is not a member of it. Being related is not the same as belonging.',
  [CLASS_MEMBER]:
    'That word actually DOES belong with the others, it shares the same category, so it cannot be the odd one out. Look for the ONE word that breaks the pattern.',
}
