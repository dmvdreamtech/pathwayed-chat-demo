/**
 * Prep verbal question bank — SAT Digital "Expression of Ideas: Transitions".
 *
 * The sibling of sentenceCompletionTemplates.ts, held to the SAME bar: every item
 * is a short 2-3 sentence passage with a blank "______" where a transition word or
 * phrase belongs, four choices, exactly one correct, and THREE distractors that are
 * each a SPECIFIC wrong path — a transition that misreads the logical relationship
 * between the ideas (a contrast word where the ideas agree, a cause word where there
 * is no cause and effect, and so on). Never a random or equally-valid transition:
 * the correct choice is uniquely right, each distractor clearly wrong.
 *
 * Choices are served through the same generated_questions path as the rest of the
 * bank. The CORRECT choice is listed FIRST with no token; buildPrepQuestion reorders
 * positions by slot so there is no positional tell. Every distractor token has an
 * explanation in SAT_TRANSITIONS_MISCONCEPTIONS below (a test asserts coverage).
 */

import {
  buildPrepQuestion,
  seedForSlot,
  type Difficulty,
  type PrepItem,
  type PrepSkill,
} from './verbalTemplates'
import { SAT_TRANSITIONS_MISCONCEPTIONS, TRANS_WRONG_CONTRAST, TRANS_WRONG_CONTINUATION, TRANS_WRONG_CAUSE, TRANS_WRONG_EXAMPLE, TRANS_WRONG_SEQUENCE } from './satTransitionsMisconceptions'
export { SAT_TRANSITIONS_MISCONCEPTIONS }

// Re-export the shared engine bits so callers of this module have them in one place.
export { buildPrepQuestion, seedForSlot }

// Misconception tokens and their explanations live in ./satTransitionsMisconceptions.ts, so the
// browser can explain a wrong answer without importing this bank.

// --- The curated frame bank -------------------------------------------------
type Relation = 'contrast' | 'continuation' | 'cause' | 'example' | 'sequence'

interface D {
  text: string
  token: string
}
interface Frame {
  tier: Difficulty
  relation: Relation // the ACTUAL relationship between the two ideas (what makes the answer correct)
  stem: string // the passage, with ______ where the transition belongs
  answer: string // correct transition (listed first, no token)
  d: [D, D, D] // three distractors, each a DISTINCT wrong-relationship token
  solution: string
}

const d = (text: string, token: string): D => ({ text, token })

const FRAMES: Frame[] = [
  // ============================= EASY =============================
  {
    tier: 'easy', relation: 'contrast',
    stem: 'The city promised that the new bridge would ease the morning traffic. ______ commuters found their drive downtown just as slow as before.',
    answer: 'However,',
    d: [d('Similarly,', TRANS_WRONG_CONTINUATION), d('As a result,', TRANS_WRONG_CAUSE), d('For example,', TRANS_WRONG_EXAMPLE)],
    solution: 'The second sentence contradicts the promise in the first (traffic did not improve), so the contrast transition "However," fits.',
  },
  {
    tier: 'easy', relation: 'cause',
    stem: 'A sudden cold snap swept through the orchard overnight. ______ many of the young apple blossoms froze and dropped to the ground.',
    answer: 'As a result,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('For instance,', TRANS_WRONG_EXAMPLE), d('Meanwhile,', TRANS_WRONG_SEQUENCE)],
    solution: 'The freeze CAUSED the blossoms to die, so the result transition "As a result," fits.',
  },
  {
    tier: 'easy', relation: 'example',
    stem: 'Some animals have surprising ways of staying cool in the heat. ______ elephants flap their huge ears to release extra body warmth.',
    answer: 'For example,',
    d: [d('In contrast,', TRANS_WRONG_CONTRAST), d('Therefore,', TRANS_WRONG_CAUSE), d('In addition,', TRANS_WRONG_CONTINUATION)],
    solution: 'The elephant is a specific example of the surprising cooling methods, so "For example," fits.',
  },
  {
    tier: 'easy', relation: 'continuation',
    stem: 'The volunteers spent Saturday morning clearing trash from the riverbank. ______ they planted dozens of young trees along the trail.',
    answer: 'In addition,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('For instance,', TRANS_WRONG_EXAMPLE), d('Therefore,', TRANS_WRONG_CAUSE)],
    solution: 'The second sentence adds another thing the volunteers did, so the addition transition "In addition," fits.',
  },
  {
    tier: 'easy', relation: 'contrast',
    stem: 'Reading the recipe, Mateo expected the dish to be difficult. ______ it turned out to be one of the easiest meals he had ever made.',
    answer: 'However,',
    d: [d('Likewise,', TRANS_WRONG_CONTINUATION), d('Consequently,', TRANS_WRONG_CAUSE), d('For example,', TRANS_WRONG_EXAMPLE)],
    solution: 'What actually happened is the opposite of what Mateo expected, so the contrast transition "However," fits.',
  },
  {
    tier: 'easy', relation: 'cause',
    stem: 'Nadia practiced her free throws every day after school for months. ______ she calmly sank the game-winning shot in the championship.',
    answer: 'As a result,',
    d: [d('Nevertheless,', TRANS_WRONG_CONTRAST), d('For instance,', TRANS_WRONG_EXAMPLE), d('Similarly,', TRANS_WRONG_CONTINUATION)],
    solution: 'Her daily practice CAUSED her success under pressure, so the result transition "As a result," fits.',
  },
  {
    tier: 'easy', relation: 'example',
    stem: 'The museum displays tools from many ancient trades. ______ visitors can see the heavy hammers and tongs once used by village blacksmiths.',
    answer: 'For instance,',
    d: [d('On the other hand,', TRANS_WRONG_CONTRAST), d('Therefore,', TRANS_WRONG_CAUSE), d('Moreover,', TRANS_WRONG_CONTINUATION)],
    solution: 'The blacksmith tools are a specific example of the ancient trade tools, so "For instance," fits.',
  },
  {
    tier: 'easy', relation: 'continuation',
    stem: 'The new library lets residents borrow thousands of e-books for free. ______ it hosts free coding classes for teenagers on weekends.',
    answer: 'In addition,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('As a result,', TRANS_WRONG_CAUSE), d('For example,', TRANS_WRONG_EXAMPLE)],
    solution: 'The coding classes are a second, separate service the library offers, so the addition transition "In addition," fits.',
  },
  {
    tier: 'easy', relation: 'contrast',
    stem: 'The forecast called for clear skies all weekend long. ______ a heavy thunderstorm rolled in on Saturday afternoon.',
    answer: 'However,',
    d: [d('Similarly,', TRANS_WRONG_CONTINUATION), d('Therefore,', TRANS_WRONG_CAUSE), d('Meanwhile,', TRANS_WRONG_SEQUENCE)],
    solution: 'The storm is the opposite of the clear skies that were predicted, so the contrast transition "However," fits.',
  },
  {
    tier: 'easy', relation: 'cause',
    stem: 'The little bakery used only the freshest local ingredients in everything it made. ______ customers lined up around the block every morning.',
    answer: 'As a result,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('For instance,', TRANS_WRONG_EXAMPLE), d('Likewise,', TRANS_WRONG_CONTINUATION)],
    solution: 'The bakery\'s quality CAUSED the crowds, so the result transition "As a result," fits.',
  },
  {
    tier: 'easy', relation: 'example',
    stem: 'Many everyday objects were first invented for space travel. ______ the memory foam in your mattress was designed to cushion astronauts at launch.',
    answer: 'For example,',
    d: [d('In contrast,', TRANS_WRONG_CONTRAST), d('Consequently,', TRANS_WRONG_CAUSE), d('Afterward,', TRANS_WRONG_SEQUENCE)],
    solution: 'Memory foam is a specific example of an everyday object born from space travel, so "For example," fits.',
  },
  {
    tier: 'easy', relation: 'continuation',
    stem: 'The coach praised the team for its stubborn, well-organized defense. ______ she pointed out how quickly the players moved the ball upfield.',
    answer: 'In addition,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('Therefore,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'The coach adds a second thing she praised, so the addition transition "In addition," fits.',
  },
  {
    tier: 'easy', relation: 'sequence',
    stem: 'The chef carefully seared the vegetables in a screaming-hot pan. ______ she lowered the heat and let them simmer for a full hour.',
    answer: 'Then,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('As a result,', TRANS_WRONG_CAUSE), d('For example,', TRANS_WRONG_EXAMPLE)],
    solution: 'The two sentences describe cooking steps done in time order, so the sequence transition "Then," fits.',
  },
  {
    tier: 'easy', relation: 'contrast',
    stem: 'Penguins are birds, so you might expect them to be able to fly. ______ they use their stiff wings as flippers to swim instead.',
    answer: 'However,',
    d: [d('Similarly,', TRANS_WRONG_CONTINUATION), d('Therefore,', TRANS_WRONG_CAUSE), d('For example,', TRANS_WRONG_EXAMPLE)],
    solution: 'The second sentence overturns what you would expect of a bird, so the contrast transition "However," fits.',
  },
  {
    tier: 'easy', relation: 'cause',
    stem: 'A thick layer of ash from the eruption blanketed the surrounding fields. ______ the farmers could not plant their crops that spring.',
    answer: 'As a result,',
    d: [d('Nevertheless,', TRANS_WRONG_CONTRAST), d('For instance,', TRANS_WRONG_EXAMPLE), d('In addition,', TRANS_WRONG_CONTINUATION)],
    solution: 'The ash CAUSED the planting to fail, so the result transition "As a result," fits.',
  },
  {
    tier: 'easy', relation: 'example',
    stem: 'Coral reefs support an astonishing variety of ocean life. ______ a single healthy reef can shelter thousands of different fish species.',
    answer: 'For example,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('Therefore,', TRANS_WRONG_CAUSE), d('Subsequently,', TRANS_WRONG_SEQUENCE)],
    solution: 'The single reef sheltering thousands of species is a specific example of that variety, so "For example," fits.',
  },

  // ============================= MEDIUM =============================
  {
    tier: 'medium', relation: 'contrast',
    stem: 'Solar panels were once so expensive that only wealthy homeowners could afford them. ______ falling manufacturing costs have made them a practical choice for ordinary families.',
    answer: 'However,',
    d: [d('Moreover,', TRANS_WRONG_CONTINUATION), d('For instance,', TRANS_WRONG_EXAMPLE), d('Meanwhile,', TRANS_WRONG_SEQUENCE)],
    solution: 'The second sentence reverses the first (once out of reach, now affordable), so the contrast transition "However," fits.',
  },
  {
    tier: 'medium', relation: 'cause',
    stem: 'The company shifted its entire staff to permanent remote work. ______ it no longer needed to pay rent on a downtown office.',
    answer: 'Consequently,',
    d: [d('Nevertheless,', TRANS_WRONG_CONTRAST), d('For example,', TRANS_WRONG_EXAMPLE), d('Similarly,', TRANS_WRONG_CONTINUATION)],
    solution: 'Going remote CAUSED the office to become unnecessary, so the result transition "Consequently," fits.',
  },
  {
    tier: 'medium', relation: 'continuation',
    stem: 'The documentary reveals how drifting plastic waste harms nesting ocean birds. ______ it shows the damage that same waste inflicts on coral reefs.',
    answer: 'Moreover,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('Therefore,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'The reef damage is a second piece of harm the film documents, so the addition transition "Moreover," fits.',
  },
  {
    tier: 'medium', relation: 'example',
    stem: 'Ancient Roman engineers built structures designed to last for many centuries. ______ the Pantheon still stands with the largest unreinforced concrete dome on Earth.',
    answer: 'For instance,',
    d: [d('On the other hand,', TRANS_WRONG_CONTRAST), d('Thus,', TRANS_WRONG_CAUSE), d('Likewise,', TRANS_WRONG_CONTINUATION)],
    solution: 'The Pantheon is a specific example of a long-lasting Roman structure, so "For instance," fits.',
  },
  {
    tier: 'medium', relation: 'contrast',
    stem: 'Critics predicted that the tiny independent film would vanish from theaters within a week. ______ it became the most talked-about movie of the entire year.',
    answer: 'However,',
    d: [d('In addition,', TRANS_WRONG_CONTINUATION), d('Therefore,', TRANS_WRONG_CAUSE), d('Afterward,', TRANS_WRONG_SEQUENCE)],
    solution: 'The outcome is the opposite of the critics\' prediction, so the contrast transition "However," fits.',
  },
  {
    tier: 'medium', relation: 'cause',
    stem: 'Years of overfishing had emptied the once-teeming bay of nearly every catch. ______ the local fishing families were forced to seek work in other towns.',
    answer: 'As a result,',
    d: [d('Even so,', TRANS_WRONG_CONTRAST), d('For instance,', TRANS_WRONG_EXAMPLE), d('Furthermore,', TRANS_WRONG_CONTINUATION)],
    solution: 'The empty bay CAUSED the families to leave, so the result transition "As a result," fits.',
  },
  {
    tier: 'medium', relation: 'continuation',
    stem: 'Regular aerobic exercise strengthens the muscles of the heart. ______ it improves the body\'s ability to deliver oxygen to every tissue.',
    answer: 'Furthermore,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('As a result,', TRANS_WRONG_CAUSE), d('For example,', TRANS_WRONG_EXAMPLE)],
    solution: 'The second sentence lists another parallel benefit of exercise, so the addition transition "Furthermore," fits.',
  },
  {
    tier: 'medium', relation: 'example',
    stem: 'Some plants have evolved clever tricks to survive the punishing desert. ______ the barrel cactus stores months of water inside its thick, pleated stem.',
    answer: 'For example,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('Consequently,', TRANS_WRONG_CAUSE), d('Meanwhile,', TRANS_WRONG_SEQUENCE)],
    solution: 'The barrel cactus is a specific example of a desert survival trick, so "For example," fits.',
  },
  {
    tier: 'medium', relation: 'contrast',
    stem: 'The new check-in policy was designed to shorten the wait at the clinic. ______ patients reported waiting even longer than they had before.',
    answer: 'However,',
    d: [d('Similarly,', TRANS_WRONG_CONTINUATION), d('Therefore,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'The result clashes with the policy\'s goal, so the contrast transition "However," fits.',
  },
  {
    tier: 'medium', relation: 'cause',
    stem: 'The bridge inspectors found dangerous cracks running through the main support beams. ______ the city closed the span to all traffic that same night.',
    answer: 'Therefore,',
    d: [d('Nevertheless,', TRANS_WRONG_CONTRAST), d('For example,', TRANS_WRONG_EXAMPLE), d('Moreover,', TRANS_WRONG_CONTINUATION)],
    solution: 'The dangerous cracks CAUSED the closure, so the result transition "Therefore," fits.',
  },
  {
    tier: 'medium', relation: 'sequence',
    stem: 'The archaeologists first mapped the entire site from the air using drones. ______ they began the slow, painstaking work of digging by hand.',
    answer: 'Afterward,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('As a result,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'The two sentences describe steps of the dig in time order, so the sequence transition "Afterward," fits.',
  },
  {
    tier: 'medium', relation: 'continuation',
    stem: 'The scholarship covers the full cost of tuition for four years. ______ it provides a yearly stipend for books and living expenses.',
    answer: 'In addition,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('Thus,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'The stipend is a second, added benefit of the scholarship, so the addition transition "In addition," fits.',
  },
  {
    tier: 'medium', relation: 'contrast',
    stem: 'On paper, the two job candidates had nearly identical qualifications. ______ their interviews revealed strikingly different attitudes toward teamwork.',
    answer: 'However,',
    d: [d('Likewise,', TRANS_WRONG_CONTINUATION), d('Consequently,', TRANS_WRONG_CAUSE), d('Subsequently,', TRANS_WRONG_SEQUENCE)],
    solution: 'The interviews reveal a difference that contradicts how alike they looked on paper, so "However," fits.',
  },
  {
    tier: 'medium', relation: 'cause',
    stem: 'The factory switched to machines that run entirely on captured rainwater. ______ its demand for city water dropped by nearly half.',
    answer: 'As a result,',
    d: [d('Still,', TRANS_WRONG_CONTRAST), d('For example,', TRANS_WRONG_EXAMPLE), d('Similarly,', TRANS_WRONG_CONTINUATION)],
    solution: 'The new machines CAUSED the drop in water demand, so the result transition "As a result," fits.',
  },
  {
    tier: 'medium', relation: 'example',
    stem: 'Bird migrations can cover truly astonishing distances across the globe. ______ the Arctic tern flies from the North Pole to the South Pole and back every year.',
    answer: 'For instance,',
    d: [d('On the other hand,', TRANS_WRONG_CONTRAST), d('Therefore,', TRANS_WRONG_CAUSE), d('Moreover,', TRANS_WRONG_CONTINUATION)],
    solution: 'The Arctic tern is a specific example of an astonishing migration, so "For instance," fits.',
  },
  {
    tier: 'medium', relation: 'continuation',
    stem: 'The health app lets users track how much water they drink each day. ______ it reminds them to stand up and stretch after long stretches of sitting.',
    answer: 'Moreover,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('As a result,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'The stretch reminders are a second feature the app offers, so the addition transition "Moreover," fits.',
  },

  // ============================= HARD =============================
  {
    tier: 'hard', relation: 'contrast',
    stem: 'The senator\'s memoir presents her as a tireless champion of the working poor. ______ the voting record from her years in office tells a far more complicated story.',
    answer: 'However,',
    d: [d('Moreover,', TRANS_WRONG_CONTINUATION), d('Therefore,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'The voting record complicates and pushes against the memoir\'s flattering picture, so "However," fits.',
  },
  {
    tier: 'hard', relation: 'cause',
    stem: 'The editor cut nearly a third of the manuscript\'s tangents and repetitions. ______ the argument that survived was leaner and far more persuasive.',
    answer: 'Consequently,',
    d: [d('On the other hand,', TRANS_WRONG_CONTRAST), d('For example,', TRANS_WRONG_EXAMPLE), d('Meanwhile,', TRANS_WRONG_SEQUENCE)],
    solution: 'The cutting CAUSED the sharper argument, so the result transition "Consequently," fits.',
  },
  {
    tier: 'hard', relation: 'continuation',
    stem: 'Rising sea temperatures push many fish species toward the cooler poles. ______ they shrink the range of the warm-water corals those same fish once depended on.',
    answer: 'Furthermore,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('As a result,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'The second sentence adds another effect of warming seas alongside the first, so the addition transition "Furthermore," fits.',
  },
  {
    tier: 'hard', relation: 'example',
    stem: 'Great inventions often emerge not from a single flash of genius but from decades of incremental tinkering. ______ the light bulb was the product of countless experiments by many rival inventors.',
    answer: 'For instance,',
    d: [d('On the other hand,', TRANS_WRONG_CONTRAST), d('Therefore,', TRANS_WRONG_CAUSE), d('Likewise,', TRANS_WRONG_CONTINUATION)],
    solution: 'The light bulb is a specific example of invention through slow tinkering, so "For instance," fits.',
  },
  {
    tier: 'hard', relation: 'contrast',
    stem: 'Economists had long assumed that raising the local minimum wage would sharply reduce the number of available jobs. ______ several recent studies have found little to no effect on hiring.',
    answer: 'However,',
    d: [d('Similarly,', TRANS_WRONG_CONTINUATION), d('Consequently,', TRANS_WRONG_CAUSE), d('Afterward,', TRANS_WRONG_SEQUENCE)],
    solution: 'The recent findings contradict the long-held assumption, so the contrast transition "However," fits.',
  },
  {
    tier: 'hard', relation: 'cause',
    stem: 'The vaccine had to be stored at temperatures far colder than any ordinary freezer can reach. ______ distributing it to remote rural clinics posed an enormous logistical challenge.',
    answer: 'As a result,',
    d: [d('Even so,', TRANS_WRONG_CONTRAST), d('For instance,', TRANS_WRONG_EXAMPLE), d('Moreover,', TRANS_WRONG_CONTINUATION)],
    solution: 'The extreme cold requirement CAUSED the distribution problem, so the result transition "As a result," fits.',
  },
  {
    tier: 'hard', relation: 'continuation',
    stem: 'The proposed regulation would force chemical plants to disclose every pollutant they release. ______ it would impose steep fines on any company that falsifies its reports.',
    answer: 'Moreover,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('Thus,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'The fines are a second provision the regulation adds, so the addition transition "Moreover," fits.',
  },
  {
    tier: 'hard', relation: 'example',
    stem: 'Languages constantly borrow words from one another as cultures meet and mingle. ______ English took "kindergarten" from German and "safari" from Swahili.',
    answer: 'For example,',
    d: [d('Nevertheless,', TRANS_WRONG_CONTRAST), d('Therefore,', TRANS_WRONG_CAUSE), d('Subsequently,', TRANS_WRONG_SEQUENCE)],
    solution: 'The borrowed English words are a specific example of languages borrowing from one another, so "For example," fits.',
  },
  {
    tier: 'hard', relation: 'contrast',
    stem: 'The startup\'s founders were certain that customers wanted still more features packed into the app. ______ user surveys made it plain that people were longing for something simpler.',
    answer: 'However,',
    d: [d('Likewise,', TRANS_WRONG_CONTINUATION), d('As a result,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'What users wanted turned out to be the opposite of what the founders assumed, so "However," fits.',
  },
  {
    tier: 'hard', relation: 'cause',
    stem: 'The novelist refused every interview and let her books speak entirely for themselves. ______ readers came to imagine her as a figure of deep and deliberate mystery.',
    answer: 'Consequently,',
    d: [d('On the other hand,', TRANS_WRONG_CONTRAST), d('For example,', TRANS_WRONG_EXAMPLE), d('Similarly,', TRANS_WRONG_CONTINUATION)],
    solution: 'Her silence CAUSED the mysterious image readers formed, so the result transition "Consequently," fits.',
  },
  {
    tier: 'hard', relation: 'sequence',
    stem: 'The committee spent months gathering testimony from every affected department. ______ it retreated behind closed doors to draft its final recommendations.',
    answer: 'Afterward,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('Therefore,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'The two sentences describe stages of the committee\'s work in time order, so the sequence transition "Afterward," fits.',
  },
  {
    tier: 'hard', relation: 'continuation',
    stem: 'The report documents how the long drought devastated the region\'s wheat harvest. ______ it details the sharp rise in food prices that swept the country soon after.',
    answer: 'In addition,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('Thus,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'The price data is a second thing the report covers alongside the harvest, so the addition transition "In addition," fits.',
  },
  {
    tier: 'hard', relation: 'contrast',
    stem: 'In theory, handing every student a laptop should have widened their access to information. ______ in the poorest districts the missing piece was never the hardware but a reliable internet connection.',
    answer: 'However,',
    d: [d('Moreover,', TRANS_WRONG_CONTINUATION), d('Consequently,', TRANS_WRONG_CAUSE), d('Meanwhile,', TRANS_WRONG_SEQUENCE)],
    solution: 'Reality in the poorest districts undercuts the hopeful theory, so the contrast transition "However," fits.',
  },
  {
    tier: 'hard', relation: 'cause',
    stem: 'The museum quietly returned the looted artifacts to their country of origin. ______ its reputation among international scholars rose to new heights.',
    answer: 'As a result,',
    d: [d('Nevertheless,', TRANS_WRONG_CONTRAST), d('For instance,', TRANS_WRONG_EXAMPLE), d('Likewise,', TRANS_WRONG_CONTINUATION)],
    solution: 'The return of the artifacts CAUSED the museum\'s rising reputation, so the result transition "As a result," fits.',
  },
  {
    tier: 'hard', relation: 'example',
    stem: 'Throughout history, ordinary materials have occasionally become more precious than gold. ______ in the 1800s aluminum was so hard to refine that emperors dined from aluminum plates.',
    answer: 'For instance,',
    d: [d('On the other hand,', TRANS_WRONG_CONTRAST), d('Therefore,', TRANS_WRONG_CAUSE), d('Moreover,', TRANS_WRONG_CONTINUATION)],
    solution: 'The story of aluminum is a specific example of an ordinary material once prized above gold, so "For instance," fits.',
  },
  {
    tier: 'hard', relation: 'continuation',
    stem: 'The treaty commits each signing nation to cut its carbon emissions by a third within a decade. ______ it establishes a shared fund to help poorer countries adapt to a warming climate.',
    answer: 'Furthermore,',
    d: [d('However,', TRANS_WRONG_CONTRAST), d('As a result,', TRANS_WRONG_CAUSE), d('For instance,', TRANS_WRONG_EXAMPLE)],
    solution: 'The shared fund is a second commitment the treaty adds, so the addition transition "Furthermore," fits.',
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

export const PREP_SAT_TRANSITIONS_SKILLS: PrepSkill[] = [
  {
    slug: 'prep-sat-transitions',
    name: 'SAT Transitions',
    subject: 'prep-sat-rw', // migration 0034: an official SAT skill
    gradeBand: '9-12',
    items: FRAMES.map((f, i) => frameItem(f, i + 1)),
  },
]
