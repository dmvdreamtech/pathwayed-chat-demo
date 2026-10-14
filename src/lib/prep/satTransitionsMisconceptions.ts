/**
 * Misconception tokens and their plain-language explanations for satTransitions.
 *
 * Split out of the question bank so the browser can explain a wrong answer
 * without importing the bank itself: the bank holds every item and its answer,
 * and anything the app imports ships in the JavaScript bundle. Only the token
 * names and their explanations live here. See noQuestionBanksInBundle.test.ts.
 */

export const TRANS_WRONG_CONTRAST = 'sat-trans-wrong-contrast' // picked a contrast word where the ideas actually agree/continue
export const TRANS_WRONG_CONTINUATION = 'sat-trans-wrong-continuation' // picked an addition word where the ideas actually contrast
export const TRANS_WRONG_CAUSE = 'sat-trans-wrong-cause' // picked a cause/result word where there is no cause and effect
export const TRANS_WRONG_EXAMPLE = 'sat-trans-wrong-example' // picked "For example/instance" where sentence 2 is not an example
export const TRANS_WRONG_SEQUENCE = 'sat-trans-wrong-sequence' // picked a time/sequence word where the link is logical, not chronological

export const SAT_TRANSITIONS_MISCONCEPTIONS: Record<string, string> = {
  [TRANS_WRONG_CONTRAST]:
    'This is a contrast transition (like "However," or "In contrast,"). It tells the reader the second idea pushes AGAINST the first. Here the ideas do not clash, they agree or build on each other, so a contrast word sends the wrong signal.',
  [TRANS_WRONG_CONTINUATION]:
    'This is an addition transition (like "In addition," or "Similarly,"). It tells the reader the second idea keeps going in the SAME direction. Here the ideas actually turn or clash, so an addition word hides the shift.',
  [TRANS_WRONG_CAUSE]:
    'This is a cause-and-effect transition (like "Therefore," or "As a result,"). It says the first idea MAKES the second one happen. Here there is no cause and effect, so this word invents a link that is not there.',
  [TRANS_WRONG_EXAMPLE]:
    'This is an example transition ("For example," / "For instance,"). It promises the second sentence is a specific example of the first. Here the second sentence is not an example, so it leaves the reader waiting for one.',
  [TRANS_WRONG_SEQUENCE]:
    'This is a time or sequence transition (like "Meanwhile," or "Afterward,"). It signals WHEN things happen. Here the link between the ideas is logical, not a matter of timing, so a time word misreads the relationship.',
}
