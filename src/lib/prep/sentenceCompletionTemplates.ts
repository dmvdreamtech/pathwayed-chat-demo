/**
 * Prep verbal question bank — Sentence Completions (ISEE-style), grades 6-8.
 *
 * The sibling of verbalTemplates.ts, held to the SAME bar: every item has 4
 * choices, exactly one correct, and THREE distractors that are each a specific
 * wrong path a real 6-8 grader takes — never a random word. Each frame carries a
 * CLEAR context clue (contrast, causation, or restatement) that determines the
 * answer, and every distractor fits GRAMMATICALLY but VIOLATES that clue.
 *
 * Frames come in two shapes: one-blank (choices are single words) and two-blank
 * (choices are word PAIRS rendered "word1 . . . word2"). Both are served through
 * the same generated_questions path as the rest of the bank. The CORRECT choice is
 * listed FIRST with no token; buildPrepQuestion reorders positions by slot so there
 * is no positional tell. Every distractor token has an explanation in
 * SENTENCE_COMPLETION_MISCONCEPTIONS below (a test asserts coverage).
 */

import {
  buildPrepQuestion,
  seedForSlot,
  type Difficulty,
  type PrepItem,
  type PrepSkill,
} from './verbalTemplates'
import { SENTENCE_COMPLETION_MISCONCEPTIONS, SC_IGNORED_CONTRAST, SC_IGNORED_CAUSATION, SC_REVERSED_CAUSATION, SC_IGNORED_RESTATEMENT, SC_WRONG_TONE, SC_OFF_TOPIC, SC_SECOND_BLANK_MISMATCH, SC_FIRST_BLANK_MISMATCH } from './sentenceCompletionMisconceptions'
export { SENTENCE_COMPLETION_MISCONCEPTIONS }

// Re-export the shared engine bits so callers of this module have them in one place.
export { buildPrepQuestion, seedForSlot }

// Misconception tokens and their explanations live in ./sentenceCompletionMisconceptions.ts, so the
// browser can explain a wrong answer without importing this bank.

// --- The curated frame bank -------------------------------------------------
type Clue = 'contrast' | 'causation' | 'restatement'

interface D {
  text: string
  token: string
}
interface Frame {
  tier: Difficulty
  clue: Clue
  blanks: 1 | 2
  stem: string // the sentence, with ___ for each blank
  answer: string // correct choice (single word, or "word1 . . . word2" pair)
  d: [D, D, D]
  solution: string
}

const d = (text: string, token: string): D => ({ text, token })

const FRAMES: Frame[] = [
  // ============================= EASY =============================
  // ---- easy · contrast ----
  {
    tier: 'easy', clue: 'contrast', blanks: 1,
    stem: 'Although the morning began sunny and warm, by afternoon the sky turned dark and ___.',
    answer: 'stormy',
    d: [d('sunny', SC_IGNORED_CONTRAST), d('lovely', SC_WRONG_TONE), d('distant', SC_OFF_TOPIC)],
    solution: 'The word "Although" signals CONTRAST with "sunny and warm," so the blank needs an opposite weather word: stormy.',
  },
  {
    tier: 'easy', clue: 'contrast', blanks: 1,
    stem: 'The puppy was usually gentle, but when the stranger approached it became surprisingly ___.',
    answer: 'fierce',
    d: [d('friendly', SC_IGNORED_CONTRAST), d('playful', SC_WRONG_TONE), d('furry', SC_OFF_TOPIC)],
    solution: 'The word "but" signals CONTRAST with "gentle," so the blank needs the opposite: fierce.',
  },
  {
    tier: 'easy', clue: 'contrast', blanks: 1,
    stem: 'Unlike his messy older brother, Sam kept his room perfectly ___.',
    answer: 'tidy',
    d: [d('cluttered', SC_IGNORED_CONTRAST), d('dusty', SC_WRONG_TONE), d('spacious', SC_OFF_TOPIC)],
    solution: 'The word "Unlike" signals CONTRAST with "messy," so the blank must oppose it: tidy.',
  },
  {
    tier: 'easy', clue: 'contrast', blanks: 1,
    stem: 'The first draft was dull, however the final version was lively and ___.',
    answer: 'engaging',
    d: [d('boring', SC_IGNORED_CONTRAST), d('lengthy', SC_OFF_TOPIC), d('gloomy', SC_WRONG_TONE)],
    solution: 'The word "however" signals CONTRAST with "dull," so the blank matches "lively": engaging.',
  },
  {
    tier: 'easy', clue: 'contrast', blanks: 1,
    stem: 'The soup was supposed to be spicy, but to everyone\'s surprise it tasted rather ___.',
    answer: 'bland',
    d: [d('fiery', SC_IGNORED_CONTRAST), d('lovely', SC_WRONG_TONE), d('warm', SC_OFF_TOPIC)],
    solution: 'The word "but" signals CONTRAST with "spicy," so the blank needs the opposite: bland.',
  },
  {
    tier: 'easy', clue: 'contrast', blanks: 1,
    stem: 'My grandmother is quiet and reserved, while my grandfather is loud and ___.',
    answer: 'bold',
    d: [d('shy', SC_IGNORED_CONTRAST), d('grumpy', SC_WRONG_TONE), d('elderly', SC_OFF_TOPIC)],
    solution: 'The word "while" signals CONTRAST with "quiet and reserved," so the blank matches "loud": bold.',
  },
  // ---- easy · causation ----
  {
    tier: 'easy', clue: 'causation', blanks: 1,
    stem: 'Because Maria had studied every night, she felt completely ___ for the big exam.',
    answer: 'prepared',
    d: [d('nervous', SC_WRONG_TONE), d('unready', SC_IGNORED_CAUSATION), d('hungry', SC_OFF_TOPIC)],
    solution: 'The word "Because" signals CAUSE and effect: studying every night makes her prepared.',
  },
  {
    tier: 'easy', clue: 'causation', blanks: 1,
    stem: 'Since it had not rained for weeks, the once-green fields turned dry and ___.',
    answer: 'brown',
    d: [d('lush', SC_IGNORED_CAUSATION), d('muddy', SC_REVERSED_CAUSATION), d('fenced', SC_OFF_TOPIC)],
    solution: 'The word "Since" signals CAUSE and effect: no rain makes the fields dry and brown.',
  },
  {
    tier: 'easy', clue: 'causation', blanks: 1,
    stem: 'The team practiced hard all season, so they easily ___ the championship game.',
    answer: 'won',
    d: [d('lost', SC_IGNORED_CAUSATION), d('quit', SC_WRONG_TONE), d('forgot', SC_OFF_TOPIC)],
    solution: 'The word "so" signals CAUSE and effect: hard practice leads them to have won.',
  },
  {
    tier: 'easy', clue: 'causation', blanks: 1,
    stem: 'Because Jonah forgot to set his alarm, he was ___ for the first class.',
    answer: 'late',
    d: [d('early', SC_IGNORED_CAUSATION), d('eager', SC_WRONG_TONE), d('seated', SC_OFF_TOPIC)],
    solution: 'The word "Because" signals CAUSE and effect: a missed alarm makes him late.',
  },
  {
    tier: 'easy', clue: 'causation', blanks: 1,
    stem: 'Since the store was having a huge sale, the shelves were quickly left nearly ___.',
    answer: 'empty',
    d: [d('full', SC_IGNORED_CAUSATION), d('crowded', SC_REVERSED_CAUSATION), d('sturdy', SC_OFF_TOPIC)],
    solution: 'The word "Since" signals CAUSE and effect: a huge sale leaves the shelves empty.',
  },
  {
    tier: 'easy', clue: 'causation', blanks: 1,
    stem: 'Because the movie was so boring, several people ___ before it ended.',
    answer: 'left',
    d: [d('applauded', SC_WRONG_TONE), d('stayed', SC_IGNORED_CAUSATION), d('arrived', SC_OFF_TOPIC)],
    solution: 'The word "Because" signals CAUSE and effect: a boring movie makes people leave, so they left.',
  },
  // ---- easy · restatement ----
  {
    tier: 'easy', clue: 'restatement', blanks: 1,
    stem: 'The old bridge was unstable; in other words, it was too ___ to cross safely.',
    answer: 'shaky',
    d: [d('sturdy', SC_IGNORED_RESTATEMENT), d('reliable', SC_WRONG_TONE), d('wooden', SC_OFF_TOPIC)],
    solution: 'The phrase "in other words" signals RESTATEMENT, so the blank must match "unstable": shaky.',
  },
  {
    tier: 'easy', clue: 'restatement', blanks: 1,
    stem: 'The instructions were brief; that is, they were short and ___.',
    answer: 'simple',
    d: [d('complicated', SC_IGNORED_RESTATEMENT), d('colorful', SC_OFF_TOPIC), d('tedious', SC_WRONG_TONE)],
    solution: 'The phrase "that is" signals RESTATEMENT of "brief," so the blank matches "short": simple.',
  },
  {
    tier: 'easy', clue: 'restatement', blanks: 1,
    stem: 'Ms. Lee is generous, or in other words, very ___ with her time and money.',
    answer: 'giving',
    d: [d('stingy', SC_IGNORED_RESTATEMENT), d('busy', SC_OFF_TOPIC), d('wealthy', SC_WRONG_TONE)],
    solution: 'The phrase "in other words" signals RESTATEMENT of "generous," so the blank matches it: giving.',
  },
  {
    tier: 'easy', clue: 'restatement', blanks: 1,
    stem: 'The lake was tranquil, that is, completely ___ and still.',
    answer: 'calm',
    d: [d('choppy', SC_IGNORED_RESTATEMENT), d('murky', SC_OFF_TOPIC), d('chilly', SC_WRONG_TONE)],
    solution: 'The phrase "that is" signals RESTATEMENT of "tranquil," so the blank matches it: calm.',
  },
  {
    tier: 'easy', clue: 'restatement', blanks: 1,
    stem: 'The directions were clear, or in other words, easy to ___.',
    answer: 'follow',
    d: [d('misunderstand', SC_IGNORED_RESTATEMENT), d('ignore', SC_OFF_TOPIC), d('rewrite', SC_WRONG_TONE)],
    solution: 'The phrase "in other words" signals RESTATEMENT of "clear," so the blank fits "easy to": follow.',
  },
  {
    tier: 'easy', clue: 'restatement', blanks: 1,
    stem: 'The scientist was meticulous, that is, extremely ___ about every detail.',
    answer: 'careful',
    d: [d('careless', SC_IGNORED_RESTATEMENT), d('curious', SC_OFF_TOPIC), d('famous', SC_WRONG_TONE)],
    solution: 'The phrase "that is" signals RESTATEMENT of "meticulous," so the blank matches it: careful.',
  },
  // ---- easy · two-blank ----
  {
    tier: 'easy', clue: 'contrast', blanks: 2,
    stem: "The critic ___ the film's acting, but she ___ its confusing plot.",
    answer: 'praised . . . faulted',
    d: [d('praised . . . admired', SC_SECOND_BLANK_MISMATCH), d('mocked . . . faulted', SC_FIRST_BLANK_MISMATCH), d('enjoyed . . . praised', SC_IGNORED_CONTRAST)],
    solution: 'The word "but" signals CONTRAST between the blanks: she liked the acting (praised) but disliked the plot (faulted).',
  },
  {
    tier: 'easy', clue: 'causation', blanks: 2,
    stem: 'Because the road was ___, the drivers had to slow down and proceed with ___.',
    answer: 'icy . . . caution',
    d: [d('icy . . . speed', SC_SECOND_BLANK_MISMATCH), d('clear . . . caution', SC_FIRST_BLANK_MISMATCH), d('dry . . . confidence', SC_IGNORED_CAUSATION)],
    solution: 'The word "Because" signals CAUSE and effect: an icy road (cause) makes drivers use caution (effect).',
  },
  {
    tier: 'easy', clue: 'contrast', blanks: 2,
    stem: 'The morning was ___, but by noon the weather had become warm and ___.',
    answer: 'chilly . . . pleasant',
    d: [d('warm . . . pleasant', SC_FIRST_BLANK_MISMATCH), d('chilly . . . freezing', SC_SECOND_BLANK_MISMATCH), d('cold . . . harsh', SC_IGNORED_CONTRAST)],
    solution: 'The word "but" signals CONTRAST: a chilly morning turns into a warm, pleasant afternoon.',
  },
  {
    tier: 'easy', clue: 'restatement', blanks: 2,
    stem: 'The guide was ___; that is, he was ___ and eager to help everyone.',
    answer: 'kind . . . helpful',
    d: [d('kind . . . unhelpful', SC_SECOND_BLANK_MISMATCH), d('mean . . . helpful', SC_FIRST_BLANK_MISMATCH), d('harsh . . . cold', SC_IGNORED_RESTATEMENT)],
    solution: 'The phrase "that is" signals RESTATEMENT: both blanks must describe a friendly guide, kind and helpful.',
  },

  // ============================= MEDIUM =============================
  // ---- medium · contrast ----
  {
    tier: 'medium', clue: 'contrast', blanks: 1,
    stem: "The senator's speech was expected to be inspiring, but it turned out to be tedious and ___.",
    answer: 'dull',
    d: [d('rousing', SC_IGNORED_CONTRAST), d('brief', SC_OFF_TOPIC), d('formal', SC_WRONG_TONE)],
    solution: 'The word "but" signals CONTRAST with "inspiring," so the blank matches "tedious": dull.',
  },
  {
    tier: 'medium', clue: 'contrast', blanks: 1,
    stem: 'Although the plan seemed foolproof, a single overlooked detail made it utterly ___.',
    answer: 'flawed',
    d: [d('perfect', SC_IGNORED_CONTRAST), d('complex', SC_OFF_TOPIC), d('costly', SC_WRONG_TONE)],
    solution: 'The word "Although" signals CONTRAST with "foolproof," so the blank needs the opposite: flawed.',
  },
  {
    tier: 'medium', clue: 'contrast', blanks: 1,
    stem: 'Ordinarily punctual, Devon was uncharacteristically ___ to the meeting this morning.',
    answer: 'tardy',
    d: [d('prompt', SC_IGNORED_CONTRAST), d('polite', SC_OFF_TOPIC), d('weary', SC_WRONG_TONE)],
    solution: 'The word "uncharacteristically" signals CONTRAST with "punctual," so the blank needs the opposite: tardy.',
  },
  {
    tier: 'medium', clue: 'contrast', blanks: 1,
    stem: "The critic praised the actor's talent but ___ his poor choice of roles.",
    answer: 'lamented',
    d: [d('admired', SC_IGNORED_CONTRAST), d('noticed', SC_OFF_TOPIC), d('applauded', SC_WRONG_TONE)],
    solution: 'The word "but" signals CONTRAST with "praised," so the blank must be negative: lamented.',
  },
  {
    tier: 'medium', clue: 'contrast', blanks: 1,
    stem: 'While the first experiment yielded clear results, the second produced data that was hopelessly ___.',
    answer: 'muddled',
    d: [d('obvious', SC_IGNORED_CONTRAST), d('useful', SC_WRONG_TONE), d('lengthy', SC_OFF_TOPIC)],
    solution: 'The word "While" signals CONTRAST with "clear," so the blank needs the opposite: muddled.',
  },
  {
    tier: 'medium', clue: 'contrast', blanks: 1,
    stem: 'Though normally frugal, Aunt Rosa was surprisingly ___ during the holidays.',
    answer: 'lavish',
    d: [d('thrifty', SC_IGNORED_CONTRAST), d('cheerful', SC_OFF_TOPIC), d('grumpy', SC_WRONG_TONE)],
    solution: 'The word "Though" signals CONTRAST with "frugal," so the blank needs the opposite: lavish.',
  },
  {
    tier: 'medium', clue: 'contrast', blanks: 1,
    stem: 'The first witness seemed credible, but the second was clearly ___.',
    answer: 'dishonest',
    d: [d('believable', SC_IGNORED_CONTRAST), d('nervous', SC_WRONG_TONE), d('elderly', SC_OFF_TOPIC)],
    solution: 'The word "but" signals CONTRAST with "credible," so the blank needs the opposite: dishonest.',
  },
  // ---- medium · causation ----
  {
    tier: 'medium', clue: 'causation', blanks: 1,
    stem: 'Since the evidence was overwhelming, the jury reached a ___ verdict without much debate.',
    answer: 'swift',
    d: [d('hesitant', SC_IGNORED_CAUSATION), d('lengthy', SC_REVERSED_CAUSATION), d('harsh', SC_WRONG_TONE)],
    solution: 'The word "Since" signals CAUSE and effect: overwhelming evidence leads to a swift verdict.',
  },
  {
    tier: 'medium', clue: 'causation', blanks: 1,
    stem: 'Because the coach demanded discipline, the once-chaotic team became remarkably ___.',
    answer: 'orderly',
    d: [d('unruly', SC_IGNORED_CAUSATION), d('talented', SC_OFF_TOPIC), d('exhausted', SC_WRONG_TONE)],
    solution: 'The word "Because" signals CAUSE and effect: demanding discipline makes the team orderly.',
  },
  {
    tier: 'medium', clue: 'causation', blanks: 1,
    stem: 'Since the directions were ambiguous, many hikers grew ___ about which trail to take.',
    answer: 'confused',
    d: [d('certain', SC_IGNORED_CAUSATION), d('excited', SC_WRONG_TONE), d('thirsty', SC_OFF_TOPIC)],
    solution: 'The word "Since" signals CAUSE and effect: ambiguous directions make the hikers confused.',
  },
  {
    tier: 'medium', clue: 'causation', blanks: 1,
    stem: 'Because she rehearsed for months, the pianist performed with effortless ___.',
    answer: 'grace',
    d: [d('fear', SC_IGNORED_CAUSATION), d('boredom', SC_WRONG_TONE), d('volume', SC_OFF_TOPIC)],
    solution: 'The word "Because" signals CAUSE and effect: months of rehearsal produce effortless grace.',
  },
  {
    tier: 'medium', clue: 'causation', blanks: 1,
    stem: 'Since no one maintained the garden, it soon became ___ with weeds.',
    answer: 'overgrown',
    d: [d('manicured', SC_IGNORED_CAUSATION), d('fragrant', SC_OFF_TOPIC), d('blooming', SC_WRONG_TONE)],
    solution: 'The word "Since" signals CAUSE and effect: a neglected garden becomes overgrown.',
  },
  {
    tier: 'medium', clue: 'causation', blanks: 1,
    stem: 'Because the ice was dangerously thin, the skaters were warned to be ___.',
    answer: 'cautious',
    d: [d('reckless', SC_IGNORED_CAUSATION), d('joyful', SC_WRONG_TONE), d('swift', SC_OFF_TOPIC)],
    solution: 'The word "Because" signals CAUSE and effect: thin, dangerous ice means the skaters should be cautious.',
  },
  {
    tier: 'medium', clue: 'causation', blanks: 1,
    stem: 'Since the recipe called for precise measurements, careless cooks often ___ the dish.',
    answer: 'ruined',
    d: [d('perfected', SC_IGNORED_CAUSATION), d('garnished', SC_OFF_TOPIC), d('praised', SC_WRONG_TONE)],
    solution: 'The word "Since" signals CAUSE and effect: precise measurements plus carelessness lead cooks to have ruined the dish.',
  },
  // ---- medium · restatement ----
  {
    tier: 'medium', clue: 'restatement', blanks: 1,
    stem: 'The professor was renowned; that is, she was widely ___ in her field.',
    answer: 'celebrated',
    d: [d('unknown', SC_IGNORED_RESTATEMENT), d('criticized', SC_WRONG_TONE), d('employed', SC_OFF_TOPIC)],
    solution: 'The phrase "that is" signals RESTATEMENT of "renowned," so the blank matches it: celebrated.',
  },
  {
    tier: 'medium', clue: 'restatement', blanks: 1,
    stem: 'His excuse was unconvincing; that is, it seemed ___.',
    answer: 'false',
    d: [d('truthful', SC_IGNORED_RESTATEMENT), d('lengthy', SC_OFF_TOPIC), d('amusing', SC_WRONG_TONE)],
    solution: 'The phrase "that is" signals RESTATEMENT of "unconvincing," so the blank matches it: false.',
  },
  {
    tier: 'medium', clue: 'restatement', blanks: 1,
    stem: 'The room was immaculate; in other words, absolutely ___.',
    answer: 'spotless',
    d: [d('filthy', SC_IGNORED_RESTATEMENT), d('spacious', SC_OFF_TOPIC), d('gloomy', SC_WRONG_TONE)],
    solution: 'The phrase "in other words" signals RESTATEMENT of "immaculate," so the blank matches it: spotless.',
  },
  {
    tier: 'medium', clue: 'restatement', blanks: 1,
    stem: 'The old contract is now obsolete; in other words, completely ___.',
    answer: 'outdated',
    d: [d('current', SC_IGNORED_RESTATEMENT), d('binding', SC_OFF_TOPIC), d('costly', SC_WRONG_TONE)],
    solution: 'The phrase "in other words" signals RESTATEMENT of "obsolete," so the blank matches it: outdated.',
  },
  {
    tier: 'medium', clue: 'restatement', blanks: 1,
    stem: 'The general was resolute; that is, absolutely ___ in his decision.',
    answer: 'firm',
    d: [d('unsure', SC_IGNORED_RESTATEMENT), d('tired', SC_OFF_TOPIC), d('kindly', SC_WRONG_TONE)],
    solution: 'The phrase "that is" signals RESTATEMENT of "resolute," so the blank matches it: firm.',
  },
  // ---- medium · two-blank ----
  {
    tier: 'medium', clue: 'contrast', blanks: 2,
    stem: "The novel's opening was ___, yet its ending felt rushed and ___.",
    answer: 'gripping . . . flat',
    d: [d('gripping . . . thrilling', SC_SECOND_BLANK_MISMATCH), d('boring . . . flat', SC_FIRST_BLANK_MISMATCH), d('dull . . . weak', SC_IGNORED_CONTRAST)],
    solution: 'The word "yet" signals CONTRAST: a gripping opening set against a flat, rushed ending.',
  },
  {
    tier: 'medium', clue: 'causation', blanks: 2,
    stem: 'Because the funding was ___, the researchers were forced to ___ their ambitious project.',
    answer: 'cut . . . abandon',
    d: [d('cut . . . expand', SC_SECOND_BLANK_MISMATCH), d('secured . . . abandon', SC_FIRST_BLANK_MISMATCH), d('increased . . . fund', SC_REVERSED_CAUSATION)],
    solution: 'The word "Because" signals CAUSE and effect: funding that was cut (cause) forces them to abandon the project (effect).',
  },
  {
    tier: 'medium', clue: 'restatement', blanks: 2,
    stem: 'The witness gave a ___ account; that is, a report that was ___ and easy to follow.',
    answer: 'coherent . . . clear',
    d: [d('coherent . . . muddled', SC_SECOND_BLANK_MISMATCH), d('rambling . . . clear', SC_FIRST_BLANK_MISMATCH), d('confusing . . . vague', SC_IGNORED_RESTATEMENT)],
    solution: 'The phrase "that is" signals RESTATEMENT: both blanks describe an easy-to-follow account, coherent and clear.',
  },

  // ============================= HARD =============================
  // ---- hard · contrast ----
  {
    tier: 'hard', clue: 'contrast', blanks: 1,
    stem: "Although the diplomat's tone was conciliatory, his actual demands remained utterly ___.",
    answer: 'rigid',
    d: [d('agreeable', SC_IGNORED_CONTRAST), d('eloquent', SC_OFF_TOPIC), d('courteous', SC_WRONG_TONE)],
    solution: 'The word "Although" signals CONTRAST with "conciliatory," so the blank needs the opposite: rigid.',
  },
  {
    tier: 'hard', clue: 'contrast', blanks: 1,
    stem: 'Far from being a novice, the young chess player displayed the poise of a seasoned ___.',
    answer: 'veteran',
    d: [d('beginner', SC_IGNORED_CONTRAST), d('spectator', SC_OFF_TOPIC), d('gambler', SC_WRONG_TONE)],
    solution: 'The phrase "Far from being a novice" signals CONTRAST, so the blank needs the opposite of novice: veteran.',
  },
  {
    tier: 'hard', clue: 'contrast', blanks: 1,
    stem: 'Whereas his early paintings were somber, his later works burst with ___ color.',
    answer: 'bold',
    d: [d('dull', SC_IGNORED_CONTRAST), d('costly', SC_OFF_TOPIC), d('faded', SC_WRONG_TONE)],
    solution: 'The word "Whereas" signals CONTRAST with "somber," so the blank needs a lively opposite: bold.',
  },
  {
    tier: 'hard', clue: 'contrast', blanks: 1,
    stem: 'Although the report appeared exhaustive, experts noted that its analysis was strangely ___.',
    answer: 'shallow',
    d: [d('thorough', SC_IGNORED_CONTRAST), d('lengthy', SC_OFF_TOPIC), d('tedious', SC_WRONG_TONE)],
    solution: 'The word "Although" signals CONTRAST with "exhaustive," so the blank needs the opposite: shallow.',
  },
  {
    tier: 'hard', clue: 'contrast', blanks: 1,
    stem: 'Though touted as revolutionary, the gadget was in fact quite ___.',
    answer: 'ordinary',
    d: [d('groundbreaking', SC_IGNORED_CONTRAST), d('expensive', SC_OFF_TOPIC), d('fragile', SC_WRONG_TONE)],
    solution: 'The word "Though" signals CONTRAST with "revolutionary," so the blank needs the opposite: ordinary.',
  },
  {
    tier: 'hard', clue: 'contrast', blanks: 1,
    stem: 'Unlike her candid sister, Priya tended to be evasive and ___ about her plans.',
    answer: 'secretive',
    d: [d('forthright', SC_IGNORED_CONTRAST), d('cheerful', SC_OFF_TOPIC), d('anxious', SC_WRONG_TONE)],
    solution: 'The word "Unlike" signals CONTRAST with "candid," so the blank matches "evasive": secretive.',
  },
  {
    tier: 'hard', clue: 'contrast', blanks: 1,
    stem: "The essay's argument was cogent, yet its conclusion felt oddly ___.",
    answer: 'weak',
    d: [d('convincing', SC_IGNORED_CONTRAST), d('lengthy', SC_OFF_TOPIC), d('formal', SC_WRONG_TONE)],
    solution: 'The word "yet" signals CONTRAST with "cogent," so the blank needs the opposite: weak.',
  },
  // ---- hard · causation ----
  {
    tier: 'hard', clue: 'causation', blanks: 1,
    stem: 'Because the theory rested on flawed assumptions, its conclusions were inevitably ___.',
    answer: 'unsound',
    d: [d('valid', SC_IGNORED_CAUSATION), d('intricate', SC_OFF_TOPIC), d('elegant', SC_WRONG_TONE)],
    solution: 'The word "Because" signals CAUSE and effect: flawed assumptions make the conclusions unsound.',
  },
  {
    tier: 'hard', clue: 'causation', blanks: 1,
    stem: 'Since the manager delegated tasks so effectively, the department ran with unusual ___.',
    answer: 'ease',
    d: [d('turmoil', SC_IGNORED_CAUSATION), d('secrecy', SC_OFF_TOPIC), d('tension', SC_WRONG_TONE)],
    solution: 'The word "Since" signals CAUSE and effect: effective delegation lets the department run with ease.',
  },
  {
    tier: 'hard', clue: 'causation', blanks: 1,
    stem: 'Because the audience found the lecture ___, attendance dwindled with each passing week.',
    answer: 'tiresome',
    d: [d('captivating', SC_IGNORED_CAUSATION), d('affordable', SC_OFF_TOPIC), d('scholarly', SC_WRONG_TONE)],
    solution: 'The word "Because" signals CAUSE and effect: a tiresome lecture makes attendance dwindle.',
  },
  {
    tier: 'hard', clue: 'causation', blanks: 1,
    stem: 'Since the negotiations had reached an impasse, both sides reluctantly agreed to ___.',
    answer: 'yield',
    d: [d('persist', SC_IGNORED_CAUSATION), d('rejoice', SC_WRONG_TONE), d('depart', SC_OFF_TOPIC)],
    solution: 'The word "Since" signals CAUSE and effect: an impasse forces both sides to yield.',
  },
  {
    tier: 'hard', clue: 'causation', blanks: 1,
    stem: 'Because the soil was so ___, the farmers harvested an unusually bountiful crop.',
    answer: 'fertile',
    d: [d('barren', SC_IGNORED_CAUSATION), d('rocky', SC_REVERSED_CAUSATION), d('distant', SC_OFF_TOPIC)],
    solution: 'The word "Because" signals CAUSE and effect: a bountiful crop means the soil must be fertile.',
  },
  {
    tier: 'hard', clue: 'causation', blanks: 1,
    stem: 'Since the medicine was administered promptly, the patient\'s recovery was remarkably ___.',
    answer: 'swift',
    d: [d('sluggish', SC_IGNORED_CAUSATION), d('painful', SC_WRONG_TONE), d('costly', SC_OFF_TOPIC)],
    solution: 'The word "Since" signals CAUSE and effect: prompt medicine makes the recovery swift.',
  },
  {
    tier: 'hard', clue: 'causation', blanks: 1,
    stem: "Since the witness's testimony was corroborated by others, the judge deemed it ___.",
    answer: 'credible',
    d: [d('dubious', SC_IGNORED_CAUSATION), d('lengthy', SC_OFF_TOPIC), d('hostile', SC_WRONG_TONE)],
    solution: 'The word "Since" signals CAUSE and effect: corroborated testimony is judged credible.',
  },
  // ---- hard · restatement ----
  {
    tier: 'hard', clue: 'restatement', blanks: 1,
    stem: 'The manuscript was replete with errors; that is, it was thoroughly ___.',
    answer: 'flawed',
    d: [d('polished', SC_IGNORED_RESTATEMENT), d('lengthy', SC_OFF_TOPIC), d('elegant', SC_WRONG_TONE)],
    solution: 'The phrase "that is" signals RESTATEMENT of "replete with errors," so the blank matches it: flawed.',
  },
  {
    tier: 'hard', clue: 'restatement', blanks: 1,
    stem: 'Her prose was verbose; in other words, unnecessarily ___.',
    answer: 'wordy',
    d: [d('concise', SC_IGNORED_RESTATEMENT), d('elegant', SC_WRONG_TONE), d('factual', SC_OFF_TOPIC)],
    solution: 'The phrase "in other words" signals RESTATEMENT of "verbose," so the blank matches it: wordy.',
  },
  {
    tier: 'hard', clue: 'restatement', blanks: 1,
    stem: 'The old miser was notoriously parsimonious; that is, extremely ___ with money.',
    answer: 'stingy',
    d: [d('generous', SC_IGNORED_RESTATEMENT), d('reckless', SC_OFF_TOPIC), d('anxious', SC_WRONG_TONE)],
    solution: 'The phrase "that is" signals RESTATEMENT of "parsimonious," so the blank matches it: stingy.',
  },
  {
    tier: 'hard', clue: 'restatement', blanks: 1,
    stem: 'The instructions were unequivocal; in other words, perfectly ___.',
    answer: 'clear',
    d: [d('ambiguous', SC_IGNORED_RESTATEMENT), d('tedious', SC_OFF_TOPIC), d('forceful', SC_WRONG_TONE)],
    solution: 'The phrase "in other words" signals RESTATEMENT of "unequivocal," so the blank matches it: clear.',
  },
  {
    tier: 'hard', clue: 'restatement', blanks: 1,
    stem: 'The tycoon was ostentatious; that is, he loved to ___ his wealth.',
    answer: 'flaunt',
    d: [d('conceal', SC_IGNORED_RESTATEMENT), d('donate', SC_OFF_TOPIC), d('squander', SC_WRONG_TONE)],
    solution: 'The phrase "that is" signals RESTATEMENT of "ostentatious," so the blank matches showing off: flaunt.',
  },
  // ---- hard · two-blank ----
  {
    tier: 'hard', clue: 'restatement', blanks: 2,
    stem: 'The scholar was ___; that is, she was ___ and reluctant to boast of her many achievements.',
    answer: 'modest . . . humble',
    d: [d('modest . . . boastful', SC_SECOND_BLANK_MISMATCH), d('arrogant . . . humble', SC_FIRST_BLANK_MISMATCH), d('vain . . . proud', SC_IGNORED_RESTATEMENT)],
    solution: 'The phrase "that is" signals RESTATEMENT: both blanks describe someone who will not boast, modest and humble.',
  },
  {
    tier: 'hard', clue: 'contrast', blanks: 2,
    stem: "The senator's public image was ___, but her private conduct proved deeply ___.",
    answer: 'pristine . . . corrupt',
    d: [d('pristine . . . noble', SC_SECOND_BLANK_MISMATCH), d('tainted . . . corrupt', SC_FIRST_BLANK_MISMATCH), d('flawless . . . honest', SC_IGNORED_CONTRAST)],
    solution: 'The word "but" signals CONTRAST: a pristine public image against deeply corrupt private conduct.',
  },
  {
    tier: 'hard', clue: 'causation', blanks: 2,
    stem: "Because the terms were so ___, even the company's allies were ___ to sign the agreement.",
    answer: 'onerous . . . reluctant',
    d: [d('onerous . . . eager', SC_SECOND_BLANK_MISMATCH), d('generous . . . reluctant', SC_FIRST_BLANK_MISMATCH), d('favorable . . . unwilling', SC_REVERSED_CAUSATION)],
    solution: 'The word "Because" signals CAUSE and effect: onerous terms (cause) make even allies reluctant to sign (effect).',
  },
]

// --- Skill construction -----------------------------------------------------
function frameItem(f: Frame, slot: number): PrepItem {
  return {
    slot,
    difficulty: f.tier,
    stem: f.stem,
    choices: [
      { text: f.answer, is_correct: true },
      ...f.d.map((x) => ({ text: x.text, is_correct: false, misconception_token: x.token })),
    ],
    solution: f.solution,
  }
}

export const PREP_SENTENCE_COMPLETION_SKILLS: PrepSkill[] = [
  {
    slug: 'prep-sentence-completion',
    name: 'Sentence Completion',
    subject: 'prep-verbal',
    gradeBand: '6-8',
    items: FRAMES.map((f, i) => frameItem(f, i + 1)),
  },
]
