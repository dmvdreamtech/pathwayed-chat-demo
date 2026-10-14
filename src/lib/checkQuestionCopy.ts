/**
 * The turn the app sends on the child's behalf after they answer a check question.
 *
 * It is written in the child's voice because it appears in the transcript as their
 * message, and because Nikki's next turn should respond to a person, not to a
 * status code. It states what they picked and whether it was right, so Nikki does
 * not have to guess and does not re-ask the question. Correctness comes from the
 * stored answer key, never from Nikki's reading of it.
 */
export function checkAnswerSummary({
  chosenText,
  isCorrect,
}: {
  chosenText: string
  /** Null when the server could not check it: say what was picked, claim nothing. */
  isCorrect: boolean | null
}): string {
  const answer = chosenText.trim()
  const said = answer ? `I picked "${answer}".` : 'I picked an answer.'
  if (isCorrect === null) return said
  return isCorrect
    ? `${said} That one was right.`
    : `${said} That one was not right.`
}
