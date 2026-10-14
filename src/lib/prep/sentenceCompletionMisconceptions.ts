/**
 * Misconception tokens and their plain-language explanations for sentenceCompletionTemplates.
 *
 * Split out of the question bank so the browser can explain a wrong answer
 * without importing the bank itself: the bank holds every item and its answer,
 * and anything the app imports ships in the JavaScript bundle. Only the token
 * names and their explanations live here. See noQuestionBanksInBundle.test.ts.
 */

export const SC_IGNORED_CONTRAST = 'sc-ignored-contrast' // contrast clue, but picked a word that MATCHES instead of opposes
export const SC_IGNORED_CAUSATION = 'sc-ignored-causation' // cause/effect clue, but picked a word that breaks the logic
export const SC_REVERSED_CAUSATION = 'sc-reversed-causation' // swapped cause and effect (picked what CAUSES, not what RESULTS)
export const SC_IGNORED_RESTATEMENT = 'sc-ignored-restatement' // restatement clue, but picked a word that does NOT match the clue
export const SC_WRONG_TONE = 'sc-wrong-tone' // right topic, wrong feeling (positive vs. negative)
export const SC_OFF_TOPIC = 'sc-off-topic' // grammatically fine, but ignores the clue entirely
export const SC_SECOND_BLANK_MISMATCH = 'sc-second-blank-mismatch' // two-blank: first word fits, second word breaks the logic
export const SC_FIRST_BLANK_MISMATCH = 'sc-first-blank-mismatch' // two-blank: second word fits, first word breaks the logic

export const SENTENCE_COMPLETION_MISCONCEPTIONS: Record<string, string> = {
  [SC_IGNORED_CONTRAST]:
    'This sentence has a contrast word like "but," "although," or "unlike," so the blank needs the OPPOSITE idea. This choice matches the first idea instead of flipping it.',
  [SC_IGNORED_CAUSATION]:
    'This sentence shows a cause and its effect (words like "because," "since," or "so"). This choice breaks that cause-and-effect logic instead of following it.',
  [SC_REVERSED_CAUSATION]:
    'You have the cause and the effect switched. Find which part makes the other happen, then pick the word that fits the RESULT.',
  [SC_IGNORED_RESTATEMENT]:
    'The sentence restates the clue with a phrase like "that is" or "in other words," so the blank should MATCH the clue\'s meaning. This choice does not mean the same thing.',
  [SC_WRONG_TONE]:
    'This word is about the right topic, but its feeling, positive or negative, is wrong for what the sentence is describing.',
  [SC_OFF_TOPIC]:
    'This word can fit the grammar, but it ignores the clue in the sentence, so it does not actually make sense in the blank.',
  [SC_SECOND_BLANK_MISMATCH]:
    'The first word fits, but the second word breaks the sentence\'s logic. In a two-blank question BOTH words have to work.',
  [SC_FIRST_BLANK_MISMATCH]:
    'The second word fits, but the first word breaks the sentence\'s logic. In a two-blank question BOTH words have to work.',
}
