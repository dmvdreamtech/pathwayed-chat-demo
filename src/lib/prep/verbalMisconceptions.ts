/**
 * Misconception tokens and their plain-language explanations for verbalTemplates.
 *
 * Split out of the question bank so the browser can explain a wrong answer
 * without importing the bank itself: the bank holds every item and its answer,
 * and anything the app imports ships in the JavaScript bundle. Only the token
 * names and their explanations live here. See noQuestionBanksInBundle.test.ts.
 */

export const SYN_SAME_TOPIC = 'verbal-same-topic-not-meaning' // same subject, different meaning
export const SYN_NEAR_MISS = 'verbal-near-miss-shade' // right neighborhood, wrong shade/strength
export const SYN_OTHER_SENSE = 'verbal-other-sense' // matches a DIFFERENT sense of the stem
export const SYN_OPPOSITE = 'verbal-opposite-not-synonym' // picked the opposite by mistake
export const SYN_SOUNDALIKE = 'verbal-soundalike' // a look/sound-alike word, different meaning
export const ANT_SYNONYM = 'verbal-opposite-picked-synonym' // gave a synonym, not the opposite
export const ANT_SAME_TOPIC = 'verbal-opposite-same-topic' // related to the topic, not the opposite
export const ANT_NEAR_MISS = 'verbal-opposite-near-miss' // opposite-ish, not the exact reverse

export const VERBAL_MISCONCEPTIONS: Record<string, string> = {
  [SYN_SAME_TOPIC]:
    'That word is about the same topic, but it does not mean the same thing. A synonym has to match the MEANING, not just the subject.',
  [SYN_NEAR_MISS]:
    'Close! That word is in the same neighborhood of meaning, but the shade or strength is a little off. Pick the one that matches most exactly.',
  [SYN_OTHER_SENSE]:
    'That word matches a DIFFERENT meaning of the word in the question. Decide which sense is being used here, then match that one.',
  [SYN_OPPOSITE]:
    'Careful, that word means the OPPOSITE. A synonym has to mean the same thing, not the reverse.',
  [SYN_SOUNDALIKE]:
    'That word looks or sounds like the word in the question, but it means something different. Match the meaning, not the spelling.',
  [ANT_SYNONYM]:
    'That word means about the SAME thing, not the opposite. An antonym has to flip the meaning.',
  [ANT_SAME_TOPIC]:
    'That word is related to the topic, but it is not the opposite. The antonym has to reverse the meaning.',
  [ANT_NEAR_MISS]:
    'Close! That is in the opposite direction, but not quite the true opposite. Pick the word that most exactly reverses the meaning.',
}
