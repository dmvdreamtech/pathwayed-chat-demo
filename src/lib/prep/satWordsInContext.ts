/**
 * Prep verbal question bank — SAT Digital "Craft & Structure: Words in Context".
 *
 * The sibling of sentenceCompletionTemplates.ts, held to the SAME bar: every item
 * has 4 choices, exactly one correct, and THREE distractors that are each a
 * specific wrong path a real SAT taker (grades 9-12 reading level) is tempted by —
 * never a random word and never an equally-valid synonym. Each item is a short 1-3
 * sentence passage whose CONTEXT (a defining clue, a contrast, or an example) makes
 * exactly one precise word the best fit for the blank "______". Every distractor
 * fits the grammar but is ruled OUT by that context for a nameable reason.
 *
 * Choices are single words. The CORRECT choice is listed FIRST with no token;
 * buildPrepQuestion reorders positions by slot so there is no positional tell.
 * Every distractor token has an explanation in SAT_WORDS_IN_CONTEXT_MISCONCEPTIONS
 * below (a test asserts coverage).
 *
 * NOTE on taxonomy: the exported skill keeps subject 'prep-verbal' and gradeBand
 * '6-8' to match the isolated prep taxonomy the seed pipeline and tests expect. The
 * grade-band here is the content authoring band, deliberately separate from the
 * SAT reading level of the passages and from purchase eligibility.
 */

import {
  buildPrepQuestion,
  seedForSlot,
  type Difficulty,
  type PrepItem,
  type PrepSkill,
} from './verbalTemplates'
import { SAT_WORDS_IN_CONTEXT_MISCONCEPTIONS, WIC_WRONG_CONNOTATION, WIC_TOO_EXTREME, WIC_RELATED_NOT_PRECISE, WIC_WRONG_SENSE, WIC_OFF_CONTEXT } from './satWordsInContextMisconceptions'
export { SAT_WORDS_IN_CONTEXT_MISCONCEPTIONS }

// Re-export the shared engine bits so callers of this module have them in one place.
export { buildPrepQuestion, seedForSlot }

// Misconception tokens and their explanations live in ./satWordsInContextMisconceptions.ts, so the
// browser can explain a wrong answer without importing this bank.

// --- The curated item bank --------------------------------------------------
type Clue = 'definition' | 'contrast' | 'example'

interface D {
  text: string
  token: string
}
interface Frame {
  tier: Difficulty
  clue: Clue
  stem: string // the passage, with ______ for the blank
  answer: string // correct single-word choice
  d: [D, D, D]
  solution: string
}

const d = (text: string, token: string): D => ({ text, token })

const FRAMES: Frame[] = [
  // ================================ EASY ================================
  {
    tier: 'easy', clue: 'definition',
    stem: "The museum's newest exhibit was so ______ that visitors lingered for hours, reluctant to leave.",
    answer: 'captivating',
    d: [d('pleasant', WIC_RELATED_NOT_PRECISE), d('tiresome', WIC_WRONG_CONNOTATION), d('costly', WIC_OFF_CONTEXT)],
    solution: 'The clue "lingered for hours, reluctant to leave" signals a strongly engaging exhibit, so "captivating" is precise, not merely "pleasant."',
  },
  {
    tier: 'easy', clue: 'example',
    stem: 'After days of heavy rain, the hiking trail became so ______ that our boots sank deep into the mud.',
    answer: 'soggy',
    d: [d('dusty', WIC_WRONG_SENSE), d('rugged', WIC_RELATED_NOT_PRECISE), d('scenic', WIC_OFF_CONTEXT)],
    solution: 'The example "boots sank deep into the mud" points to waterlogged ground, so "soggy" fits; "dusty" is the wrong (dry) sense.',
  },
  {
    tier: 'easy', clue: 'definition',
    stem: 'The instructions were so ______ that even a first-time user assembled the shelf without any confusion.',
    answer: 'clear',
    d: [d('complicated', WIC_WRONG_CONNOTATION), d('brief', WIC_RELATED_NOT_PRECISE), d('colorful', WIC_OFF_CONTEXT)],
    solution: 'Because a first-timer finished "without any confusion," the instructions must be "clear," not complicated or merely brief.',
  },
  {
    tier: 'easy', clue: 'example',
    stem: 'The comedian was famous for his ______ wit, delivering jokes so fast the audience could barely keep up.',
    answer: 'quick',
    d: [d('dull', WIC_WRONG_CONNOTATION), d('clever', WIC_RELATED_NOT_PRECISE), d('loud', WIC_OFF_CONTEXT)],
    solution: 'The clue "so fast the audience could barely keep up" is about speed, so "quick" is precise; "clever" is related but not what the clue measures.',
  },
  {
    tier: 'easy', clue: 'example',
    stem: 'The old floorboards were so ______ that they creaked loudly with every step we took.',
    answer: 'loose',
    d: [d('worn', WIC_RELATED_NOT_PRECISE), d('sturdy', WIC_OFF_CONTEXT), d('ancient', WIC_TOO_EXTREME)],
    solution: 'Boards that "creaked loudly with every step" are "loose"; "worn" is related but imprecise and "ancient" overstates their age.',
  },
  {
    tier: 'easy', clue: 'definition',
    stem: 'Because she had skipped both breakfast and lunch, Mara felt absolutely ______ by dinnertime.',
    answer: 'starving',
    d: [d('full', WIC_OFF_CONTEXT), d('tired', WIC_RELATED_NOT_PRECISE), d('cheerful', WIC_WRONG_CONNOTATION)],
    solution: 'Skipping breakfast and lunch makes "starving" the precise fit for how Mara feels; "full" ignores the clue entirely.',
  },
  {
    tier: 'easy', clue: 'example',
    stem: 'The library reading room was completely ______, so I could hear the faint tick of the wall clock.',
    answer: 'silent',
    d: [d('crowded', WIC_OFF_CONTEXT), d('noisy', WIC_WRONG_CONNOTATION), d('empty', WIC_RELATED_NOT_PRECISE)],
    solution: 'Hearing "the faint tick of the wall clock" shows the room was "silent," not merely empty or (contradicting the clue) noisy.',
  },
  {
    tier: 'easy', clue: 'example',
    stem: 'The puppy was so ______ that it wagged its tail and greeted every stranger who walked by.',
    answer: 'friendly',
    d: [d('shy', WIC_WRONG_CONNOTATION), d('fluffy', WIC_OFF_CONTEXT), d('obedient', WIC_RELATED_NOT_PRECISE)],
    solution: 'Greeting every stranger with a wagging tail shows the puppy is "friendly"; "obedient" is a related trait the clue does not demonstrate.',
  },
  {
    tier: 'easy', clue: 'example',
    stem: 'The soup was far too ______ for me; even a single spoonful left my mouth burning from the chili.',
    answer: 'spicy',
    d: [d('bland', WIC_OFF_CONTEXT), d('salty', WIC_RELATED_NOT_PRECISE), d('cold', WIC_WRONG_SENSE)],
    solution: '"Mouth burning from the chili" points to "spicy"; "cold" mistakes "burning" for temperature rather than heat.',
  },
  {
    tier: 'easy', clue: 'definition',
    stem: 'The twins looked so ______ that even their own teacher often mixed up their names.',
    answer: 'alike',
    d: [d('different', WIC_OFF_CONTEXT), d('familiar', WIC_RELATED_NOT_PRECISE), d('close', WIC_WRONG_SENSE)],
    solution: 'Because the teacher "mixed up their names," the twins must look "alike"; "close" uses the wrong sense (emotional nearness, not resemblance).',
  },
  {
    tier: 'easy', clue: 'definition',
    stem: 'After the long drought, the farmers were ______ when steady rain finally soaked their fields.',
    answer: 'relieved',
    d: [d('furious', WIC_WRONG_CONNOTATION), d('curious', WIC_OFF_CONTEXT), d('hopeful', WIC_RELATED_NOT_PRECISE)],
    solution: 'Rain ending a long drought makes the farmers "relieved"; "hopeful" is related but wrong in timing, since the rain has already come.',
  },
  {
    tier: 'easy', clue: 'example',
    stem: 'The trail was so ______ that we reached the summit without stopping to rest even once.',
    answer: 'easy',
    d: [d('steep', WIC_OFF_CONTEXT), d('exhausting', WIC_WRONG_CONNOTATION), d('long', WIC_RELATED_NOT_PRECISE)],
    solution: 'Reaching the summit "without stopping to rest" shows the trail was "easy"; "long" is a trail trait but not what the clue proves.',
  },
  {
    tier: 'easy', clue: 'example',
    stem: 'The witness gave such a ______ description of the car that the police identified it within minutes.',
    answer: 'detailed',
    d: [d('vague', WIC_WRONG_CONNOTATION), d('lengthy', WIC_RELATED_NOT_PRECISE), d('false', WIC_OFF_CONTEXT)],
    solution: 'Police identifying the car "within minutes" shows the description was "detailed"; a merely "lengthy" one need not be precise.',
  },
  {
    tier: 'easy', clue: 'example',
    stem: 'My grandfather is a ______ storyteller; relatives gather every holiday just to hear his tales.',
    answer: 'gifted',
    d: [d('forgetful', WIC_WRONG_CONNOTATION), d('loud', WIC_OFF_CONTEXT), d('frequent', WIC_WRONG_SENSE)],
    solution: 'Relatives gathering "just to hear his tales" shows he is a "gifted" storyteller; "frequent" answers how often, not how well.',
  },
  {
    tier: 'easy', clue: 'example',
    stem: 'The lake was so ______ that we could see straight down to the smooth pebbles on the bottom.',
    answer: 'clear',
    d: [d('murky', WIC_WRONG_CONNOTATION), d('deep', WIC_RELATED_NOT_PRECISE), d('frozen', WIC_OFF_CONTEXT)],
    solution: 'Seeing "straight down to the pebbles" shows the water was "clear"; depth is related but not why the bottom is visible.',
  },
  {
    tier: 'easy', clue: 'definition',
    stem: 'Because the deadline was only an hour away, the reporter typed with ______ speed.',
    answer: 'frantic',
    d: [d('leisurely', WIC_WRONG_CONNOTATION), d('steady', WIC_RELATED_NOT_PRECISE), d('careful', WIC_OFF_CONTEXT)],
    solution: 'An hour from the deadline makes "frantic" the precise word for the reporter\'s speed; "steady" understates the pressure.',
  },

  // =============================== MEDIUM ===============================
  {
    tier: 'medium', clue: 'example',
    stem: "The critic's review was ______: she praised the film's visuals in one paragraph and condemned its plot in the next.",
    answer: 'contradictory',
    d: [d('enthusiastic', WIC_WRONG_CONNOTATION), d('lengthy', WIC_OFF_CONTEXT), d('balanced', WIC_RELATED_NOT_PRECISE)],
    solution: 'Praising the visuals but condemning the plot makes the review "contradictory"; "balanced" implies fair harmony, not the clash described.',
  },
  {
    tier: 'medium', clue: 'definition',
    stem: 'Though the negotiations dragged on for months, the two sides finally reached a ______ that satisfied everyone.',
    answer: 'compromise',
    d: [d('stalemate', WIC_WRONG_CONNOTATION), d('argument', WIC_OFF_CONTEXT), d('agreement', WIC_RELATED_NOT_PRECISE)],
    solution: 'Long talks ending so everyone is satisfied point to a "compromise," the precise give-and-take; "agreement" is broader and less exact.',
  },
  {
    tier: 'medium', clue: 'example',
    stem: "The manager's tone stayed ______; she never raised her voice, even when the project fell apart.",
    answer: 'calm',
    d: [d('hostile', WIC_WRONG_CONNOTATION), d('quiet', WIC_RELATED_NOT_PRECISE), d('timid', WIC_WRONG_SENSE)],
    solution: 'Not raising her voice in a crisis shows a "calm" tone; "timid" misreads composure as fearfulness.',
  },
  {
    tier: 'medium', clue: 'definition',
    stem: 'The scientist remained ______ about the new theory, neither endorsing it nor dismissing it until more data arrived.',
    answer: 'neutral',
    d: [d('enthusiastic', WIC_WRONG_CONNOTATION), d('confused', WIC_RELATED_NOT_PRECISE), d('certain', WIC_OFF_CONTEXT)],
    solution: '"Neither endorsing nor dismissing" shows the scientist stayed "neutral"; withholding judgment is deliberate, not "confused."',
  },
  {
    tier: 'medium', clue: 'example',
    stem: 'Volunteers described the flood damage as ______, with entire neighborhoods reduced to rubble.',
    answer: 'severe',
    d: [d('minor', WIC_WRONG_CONNOTATION), d('recent', WIC_OFF_CONTEXT), d('noticeable', WIC_RELATED_NOT_PRECISE)],
    solution: '"Entire neighborhoods reduced to rubble" makes "severe" precise; "noticeable" is far too mild for the clue.',
  },
  {
    tier: 'medium', clue: 'example',
    stem: 'His apology sounded ______; he mumbled it while staring at his phone and walking away.',
    answer: 'insincere',
    d: [d('heartfelt', WIC_WRONG_CONNOTATION), d('brief', WIC_RELATED_NOT_PRECISE), d('loud', WIC_OFF_CONTEXT)],
    solution: 'Mumbling an apology while distracted makes it "insincere"; its being "brief" is not what the clue reveals.',
  },
  {
    tier: 'medium', clue: 'example',
    stem: 'The ancient manuscript was so ______ that curators handled it with gloves, fearing the pages would crumble.',
    answer: 'fragile',
    d: [d('valuable', WIC_RELATED_NOT_PRECISE), d('sturdy', WIC_OFF_CONTEXT), d('damp', WIC_WRONG_SENSE)],
    solution: 'Handling it gently lest "the pages crumble" shows it is "fragile"; "valuable" is related but not what the crumbling clue names.',
  },
  {
    tier: 'medium', clue: 'definition',
    stem: 'The senator gave an ______ answer, using many words yet somehow revealing nothing about her actual position.',
    answer: 'evasive',
    d: [d('honest', WIC_WRONG_CONNOTATION), d('brief', WIC_OFF_CONTEXT), d('thoughtful', WIC_RELATED_NOT_PRECISE)],
    solution: 'Many words that reveal "nothing about her position" make the answer "evasive"; "brief" contradicts "using many words."',
  },
  {
    tier: 'medium', clue: 'example',
    stem: "The city's growth has been ______: its population has doubled in just five years.",
    answer: 'rapid',
    d: [d('steady', WIC_RELATED_NOT_PRECISE), d('sudden', WIC_WRONG_SENSE), d('stagnant', WIC_WRONG_CONNOTATION)],
    solution: 'Doubling in five years makes the growth "rapid"; "sudden" wrongly implies an instant rather than a fast span.',
  },
  {
    tier: 'medium', clue: 'example',
    stem: 'Although the recipe looked complicated, the chef made it seem ______, finishing the dish in minutes without one glance at the instructions.',
    answer: 'effortless',
    d: [d('exhausting', WIC_WRONG_CONNOTATION), d('quick', WIC_RELATED_NOT_PRECISE), d('impossible', WIC_TOO_EXTREME)],
    solution: 'Finishing in minutes without checking the recipe makes it look "effortless"; "quick" captures speed but not the ease emphasized.',
  },
  {
    tier: 'medium', clue: 'definition',
    stem: 'The documentary aimed to be ______, presenting both supporters and critics of the policy without taking a side.',
    answer: 'impartial',
    d: [d('biased', WIC_WRONG_CONNOTATION), d('thorough', WIC_RELATED_NOT_PRECISE), d('boring', WIC_OFF_CONTEXT)],
    solution: 'Presenting both sides "without taking a side" makes the film "impartial"; "thorough" is about completeness, not fairness.',
  },
  {
    tier: 'medium', clue: 'example',
    stem: "By the end of the marathon, the runner's pace had grown ______, each step slower and heavier than the last.",
    answer: 'sluggish',
    d: [d('swift', WIC_WRONG_CONNOTATION), d('tired', WIC_RELATED_NOT_PRECISE), d('steady', WIC_WRONG_SENSE)],
    solution: 'Steps "slower and heavier than the last" make the pace "sluggish"; "steady" would mean unchanging, but the pace is worsening.',
  },
  {
    tier: 'medium', clue: 'example',
    stem: "The teacher praised Dana's essay as ______, noting that every claim was backed by evidence and logic.",
    answer: 'convincing',
    d: [d('creative', WIC_RELATED_NOT_PRECISE), d('lengthy', WIC_OFF_CONTEXT), d('flimsy', WIC_WRONG_CONNOTATION)],
    solution: 'Claims "backed by evidence and logic" make the essay "convincing"; "creative" praises imagination, not the soundness cited.',
  },
  {
    tier: 'medium', clue: 'example',
    stem: 'The old radio gave off a ______ signal, fading in and out so often that whole sentences were lost.',
    answer: 'weak',
    d: [d('strong', WIC_WRONG_CONNOTATION), d('steady', WIC_WRONG_SENSE), d('modern', WIC_OFF_CONTEXT)],
    solution: 'A signal "fading in and out" until sentences are lost is "weak"; "steady" contradicts the fading described.',
  },
  {
    tier: 'medium', clue: 'example',
    stem: "The coach's instructions were ______: run to the cone, turn left, and pass the ball, nothing was left to guesswork.",
    answer: 'precise',
    d: [d('vague', WIC_WRONG_CONNOTATION), d('harsh', WIC_OFF_CONTEXT), d('lengthy', WIC_RELATED_NOT_PRECISE)],
    solution: 'Steps with "nothing left to guesswork" are "precise"; "lengthy" describes length, not the exactness the clue shows.',
  },
  {
    tier: 'medium', clue: 'example',
    stem: 'The volunteers were ______ in their efforts, showing up before dawn and staying long after dark.',
    answer: 'tireless',
    d: [d('reluctant', WIC_WRONG_CONNOTATION), d('occasional', WIC_OFF_CONTEXT), d('skilled', WIC_RELATED_NOT_PRECISE)],
    solution: 'Arriving before dawn and staying past dark makes the volunteers "tireless"; "occasional" contradicts their constant hours.',
  },

  // ================================ HARD ================================
  {
    tier: 'hard', clue: 'example',
    stem: 'The architect was ______ in her planning, checking every measurement three times before approving the blueprints.',
    answer: 'meticulous',
    d: [d('careless', WIC_WRONG_CONNOTATION), d('confident', WIC_RELATED_NOT_PRECISE), d('hurried', WIC_OFF_CONTEXT)],
    solution: 'Checking "every measurement three times" shows the architect is "meticulous"; "confident" is a related trait the clue does not name.',
  },
  {
    tier: 'hard', clue: 'definition',
    stem: 'Offered his dream job in a distant city, Marcus felt ______, torn between excitement and the fear of leaving home.',
    answer: 'ambivalent',
    d: [d('overjoyed', WIC_WRONG_CONNOTATION), d('indifferent', WIC_WRONG_SENSE), d('certain', WIC_OFF_CONTEXT)],
    solution: '"Torn between excitement and fear" makes Marcus "ambivalent"; "indifferent" means not caring, but he cares on both sides.',
  },
  {
    tier: 'hard', clue: 'example',
    stem: 'The fashion trend proved ______: wildly popular one summer and completely forgotten by the next.',
    answer: 'ephemeral',
    d: [d('enduring', WIC_WRONG_CONNOTATION), d('sudden', WIC_RELATED_NOT_PRECISE), d('expensive', WIC_OFF_CONTEXT)],
    solution: 'Popular one summer and forgotten the next, the trend was "ephemeral"; "sudden" describes its start, not how briefly it lasted.',
  },
  {
    tier: 'hard', clue: 'contrast',
    stem: 'Rather than chase an ideal that could never work, the mayor took a ______ approach, choosing the solution that was realistic and affordable.',
    answer: 'pragmatic',
    d: [d('idealistic', WIC_WRONG_CONNOTATION), d('reckless', WIC_OFF_CONTEXT), d('cautious', WIC_RELATED_NOT_PRECISE)],
    solution: 'Choosing the "realistic and affordable" option over an ideal makes the approach "pragmatic"; "idealistic" is the very thing rejected.',
  },
  {
    tier: 'hard', clue: 'definition',
    stem: 'The essay offered a ______ view of the issue, acknowledging the subtle trade-offs that simpler arguments ignored.',
    answer: 'nuanced',
    d: [d('simplistic', WIC_WRONG_CONNOTATION), d('lengthy', WIC_OFF_CONTEXT), d('balanced', WIC_RELATED_NOT_PRECISE)],
    solution: 'Acknowledging "subtle trade-offs" makes the view "nuanced"; "balanced" is related but does not capture the fine distinctions.',
  },
  {
    tier: 'hard', clue: 'definition',
    stem: "The critic's praise was ______, so overstated that readers suspected she was exaggerating for effect.",
    answer: 'hyperbolic',
    d: [d('measured', WIC_WRONG_CONNOTATION), d('sincere', WIC_RELATED_NOT_PRECISE), d('brief', WIC_OFF_CONTEXT)],
    solution: 'Praise "so overstated" it seems exaggerated is "hyperbolic"; "measured" is its opposite, restrained tone.',
  },
  {
    tier: 'hard', clue: 'example',
    stem: 'Witnesses gave ______ accounts of the accident, each one flatly contradicting the others.',
    answer: 'conflicting',
    d: [d('identical', WIC_WRONG_CONNOTATION), d('detailed', WIC_RELATED_NOT_PRECISE), d('delayed', WIC_OFF_CONTEXT)],
    solution: 'Accounts "flatly contradicting the others" are "conflicting"; "identical" is ruled out by the contradiction.',
  },
  {
    tier: 'hard', clue: 'example',
    stem: "The professor's lectures were famously ______, wandering from topic to topic with no clear point.",
    answer: 'meandering',
    d: [d('focused', WIC_WRONG_CONNOTATION), d('brief', WIC_OFF_CONTEXT), d('lively', WIC_RELATED_NOT_PRECISE)],
    solution: 'Lectures "wandering from topic to topic with no clear point" are "meandering"; "brief" contradicts the aimless wandering.',
  },
  {
    tier: 'hard', clue: 'definition',
    stem: 'The evidence against the theory was ______; not a single expert could find a flaw in it.',
    answer: 'solid',
    d: [d('flimsy', WIC_WRONG_CONNOTATION), d('disputed', WIC_OFF_CONTEXT), d('technical', WIC_RELATED_NOT_PRECISE)],
    solution: 'Evidence in which "not a single expert could find a flaw" is "solid"; "disputed" contradicts that unanimous acceptance.',
  },
  {
    tier: 'hard', clue: 'example',
    stem: 'The billionaire was surprisingly ______, donating most of his fortune to schools and hospitals.',
    answer: 'generous',
    d: [d('selfish', WIC_WRONG_CONNOTATION), d('wealthy', WIC_RELATED_NOT_PRECISE), d('reluctant', WIC_OFF_CONTEXT)],
    solution: 'Donating "most of his fortune" shows he is "generous"; "wealthy" describes having money, not the giving the clue highlights.',
  },
  {
    tier: 'hard', clue: 'definition',
    stem: 'The peace talks collapsed because neither side would ______, each insisting on every one of its original demands.',
    answer: 'concede',
    d: [d('negotiate', WIC_RELATED_NOT_PRECISE), d('surrender', WIC_TOO_EXTREME), d('listen', WIC_OFF_CONTEXT)],
    solution: 'Refusing to give ground on any demand means neither side would "concede"; "surrender" overstates it as total defeat.',
  },
  {
    tier: 'hard', clue: 'example',
    stem: "The novel's hero is deeply ______, capable of great kindness one moment and shocking cruelty the next.",
    answer: 'complex',
    d: [d('predictable', WIC_WRONG_CONNOTATION), d('gentle', WIC_RELATED_NOT_PRECISE), d('fictional', WIC_OFF_CONTEXT)],
    solution: 'Swinging between "great kindness" and "shocking cruelty" makes the hero "complex"; "gentle" captures only one half.',
  },
  {
    tier: 'hard', clue: 'example',
    stem: 'The reforms brought only ______ change; within a year the old problems had returned exactly as before.',
    answer: 'temporary',
    d: [d('lasting', WIC_WRONG_CONNOTATION), d('radical', WIC_RELATED_NOT_PRECISE), d('sudden', WIC_WRONG_SENSE)],
    solution: 'Change after which "the old problems had returned" was "temporary"; "sudden" describes speed of onset, not that it faded.',
  },
  {
    tier: 'hard', clue: 'definition',
    stem: 'The diplomat chose her words with great ______, careful never to offend either delegation.',
    answer: 'tact',
    d: [d('haste', WIC_OFF_CONTEXT), d('honesty', WIC_RELATED_NOT_PRECISE), d('hostility', WIC_WRONG_CONNOTATION)],
    solution: 'Choosing words so as "never to offend" shows "tact"; "honesty" is a virtue, but not the diplomatic care the clue names.',
  },
  {
    tier: 'hard', clue: 'definition',
    stem: 'Faced with the same crisis every winter, the town grew ______, having long since stopped reacting with alarm.',
    answer: 'numb',
    d: [d('alarmed', WIC_WRONG_CONNOTATION), d('prepared', WIC_RELATED_NOT_PRECISE), d('curious', WIC_OFF_CONTEXT)],
    solution: 'A town that "stopped reacting with alarm" has grown "numb"; "prepared" is related but describes readiness, not the emotional flatness.',
  },
  {
    tier: 'hard', clue: 'example',
    stem: 'The memo was intentionally ______, worded so vaguely that each department read it to mean something different.',
    answer: 'ambiguous',
    d: [d('precise', WIC_WRONG_CONNOTATION), d('brief', WIC_RELATED_NOT_PRECISE), d('hostile', WIC_OFF_CONTEXT)],
    solution: 'Wording so vague that "each department read it differently" makes the memo "ambiguous"; "precise" is its opposite.',
  },
]

// --- Skill construction -----------------------------------------------------
const SAT_PROMPT =
  'Which choice completes the text with the most logical and precise word?'

function frameItem(f: Frame, slot: number): PrepItem {
  return {
    slot,
    difficulty: f.tier,
    stem: `${f.stem}\n\n${SAT_PROMPT}`,
    choices: [
      { text: f.answer, is_correct: true },
      ...f.d.map((x) => ({ text: x.text, is_correct: false, misconception_token: x.token })),
    ],
    solution: f.solution,
  }
}

export const PREP_SAT_WORDS_IN_CONTEXT_SKILLS: PrepSkill[] = [
  {
    slug: 'prep-sat-words-in-context',
    name: 'SAT Words in Context',
    subject: 'prep-sat-rw', // migration 0034: an official SAT skill
    gradeBand: '9-12',
    items: FRAMES.map((f, i) => frameItem(f, i + 1)),
  },
]
