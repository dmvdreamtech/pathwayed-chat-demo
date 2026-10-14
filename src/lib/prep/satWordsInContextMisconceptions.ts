/**
 * Misconception tokens and their plain-language explanations for satWordsInContext.
 *
 * Split out of the question bank so the browser can explain a wrong answer
 * without importing the bank itself: the bank holds every item and its answer,
 * and anything the app imports ships in the JavaScript bundle. Only the token
 * names and their explanations live here. See noQuestionBanksInBundle.test.ts.
 */

export const WIC_WRONG_CONNOTATION = 'sat-wic-wrong-connotation' // right topic, wrong positive/negative feeling
export const WIC_TOO_EXTREME = 'sat-wic-too-extreme' // meaning too strong for what the context supports
export const WIC_RELATED_NOT_PRECISE = 'sat-wic-related-not-precise' // related to the idea but not the precise word demanded
export const WIC_WRONG_SENSE = 'sat-wic-wrong-sense' // matches a DIFFERENT sense/meaning than the context uses
export const WIC_OFF_CONTEXT = 'sat-wic-off-context' // a real word that simply ignores the context clue

export const SAT_WORDS_IN_CONTEXT_MISCONCEPTIONS: Record<string, string> = {
  [WIC_WRONG_CONNOTATION]:
    'This word is about the right topic, but its feeling, positive or negative, is wrong for what the passage is describing. Match the tone the context sets.',
  [WIC_TOO_EXTREME]:
    'This word means something too strong or extreme for what the passage actually supports. The context calls for a milder, more measured word.',
  [WIC_RELATED_NOT_PRECISE]:
    'This word is related to the idea, but it is not the precise word the context demands. A more exact word fits the specific clue better.',
  [WIC_WRONG_SENSE]:
    'This word matches a DIFFERENT sense or meaning than the one the passage is using. Reread the clue to see which meaning the context needs.',
  [WIC_OFF_CONTEXT]:
    'This is a real word, but it ignores the clue in the passage, so it does not actually make sense in the blank. Anchor your choice to the context.',
}
