/**
 * Prep verbal question bank — Analogies (HSPT/ISEE verbal), grades 6-8.
 *
 * Iteration 2 of the prep verbal build, held to the SAME bar as the synonyms /
 * antonyms bank in verbalTemplates.ts: every item has 4 choices, exactly one
 * correct, and THREE distractors that are each a specific wrong path a real 7th
 * grader takes on an analogy — never a random word. The classic analogy trap is a
 * distractor that satisfies a REAL but DIFFERENT relationship to C, so each
 * distractor is one of a small set of "wrong-relationship" archetypes, and every
 * token has an explanation in ANALOGY_MISCONCEPTIONS (merged into misconceptions.ts
 * centrally; a test asserts local coverage).
 *
 * Stem format: `${A} is to ${B} as ${C} is to ___` — the student completes the
 * fourth term D. The correct D is authored FIRST in the choices array (is_correct,
 * no token); buildPrepQuestion reorders positions deterministically from the slot.
 *
 * Relationship taxonomy covered across the bank: part/whole, cause/effect,
 * worker/tool, degree/intensity, category/member, function, antonym, synonym,
 * sequence. Each item tags its relationship in the solution.
 */
import {
  buildPrepQuestion,
  seedForSlot,
  type Difficulty,
  type PrepChoice,
  type PrepItem,
  type PrepSkill,
} from './verbalTemplates'
import { ANALOGY_MISCONCEPTIONS, WRONG_REL, SAME_CAT, REVERSED, ASSOCIATED } from './analogyMisconceptions'
export { ANALOGY_MISCONCEPTIONS }

// Re-export so callers importing analogy pieces get the shared plumbing too.
export { buildPrepQuestion, seedForSlot }
export type { Difficulty, PrepChoice, PrepItem, PrepSkill }

// Misconception tokens and their explanations live in ./analogyMisconceptions.ts, so the
// browser can explain a wrong answer without importing this bank.

// --- The curated analogy bank -----------------------------------------------
type Relationship =
  | 'part/whole'
  | 'cause/effect'
  | 'worker/tool'
  | 'degree/intensity'
  | 'category/member'
  | 'function'
  | 'antonym'
  | 'synonym'
  | 'sequence'

interface D {
  text: string
  token: string
}
interface AnalogyEntry {
  a: string
  b: string
  c: string
  answer: string
  rel: Relationship
  tier: Difficulty
  d: [D, D, D]
}

const d = (text: string, token: string): D => ({ text, token })

// How each relationship reads in the worked solution (words are UPPERCASED when
// inserted, so keep these article-free to avoid "a APPLE" style bugs).
const REL_TEXT: Record<Relationship, (x: string, y: string) => string> = {
  'part/whole': (x, y) => `${x} is a part of ${y}`,
  'cause/effect': (x, y) => `${x} leads to ${y}`,
  'worker/tool': (x, y) => `${x} uses ${y}`,
  'degree/intensity': (x, y) => `${x} is a milder form of ${y}`,
  'category/member': (x, y) => `${y} is a type of ${x}`,
  'function': (x, y) => `${x} is used to ${y}`,
  'antonym': (x, y) => `${x} is the opposite of ${y}`,
  'synonym': (x, y) => `${x} means the same as ${y}`,
  'sequence': (x, y) => `${x} comes right before ${y}`,
}

const ANALOGY_BANK: AnalogyEntry[] = [
  // ---------------- part/whole ----------------
  { a: 'petal', b: 'flower', c: 'finger', answer: 'hand', rel: 'part/whole', tier: 'easy',
    d: [d('knuckle', REVERSED), d('toe', SAME_CAT), d('glove', ASSOCIATED)] },
  { a: 'page', b: 'book', c: 'brick', answer: 'wall', rel: 'part/whole', tier: 'easy',
    d: [d('stone', SAME_CAT), d('mortar', ASSOCIATED), d('builder', WRONG_REL)] },
  { a: 'root', b: 'tree', c: 'fin', answer: 'fish', rel: 'part/whole', tier: 'easy',
    d: [d('gill', SAME_CAT), d('water', ASSOCIATED), d('swim', WRONG_REL)] },
  { a: 'wheel', b: 'car', c: 'wing', answer: 'airplane', rel: 'part/whole', tier: 'easy',
    d: [d('engine', SAME_CAT), d('bird', ASSOCIATED), d('fly', WRONG_REL)] },
  { a: 'branch', b: 'tree', c: 'tributary', answer: 'river', rel: 'part/whole', tier: 'hard',
    d: [d('stream', SAME_CAT), d('bank', ASSOCIATED), d('flood', WRONG_REL)] },
  { a: 'keyboard', b: 'computer', c: 'string', answer: 'guitar', rel: 'part/whole', tier: 'medium',
    d: [d('fret', SAME_CAT), d('music', ASSOCIATED), d('strum', WRONG_REL)] },
  { a: 'crust', b: 'pie', c: 'shell', answer: 'egg', rel: 'part/whole', tier: 'easy',
    d: [d('yolk', SAME_CAT), d('nest', ASSOCIATED), d('hatch', WRONG_REL)] },
  { a: 'lens', b: 'camera', c: 'screen', answer: 'television', rel: 'part/whole', tier: 'medium',
    d: [d('speaker', SAME_CAT), d('remote', ASSOCIATED), d('watch', WRONG_REL)] },
  { a: 'rung', b: 'ladder', c: 'spoke', answer: 'wheel', rel: 'part/whole', tier: 'medium',
    d: [d('rim', SAME_CAT), d('bicycle', ASSOCIATED), d('roll', WRONG_REL)] },
  { a: 'verse', b: 'poem', c: 'scene', answer: 'play', rel: 'part/whole', tier: 'medium',
    d: [d('chapter', SAME_CAT), d('actor', ASSOCIATED), d('perform', WRONG_REL)] },

  // ---------------- cause/effect ----------------
  { a: 'rain', b: 'flood', c: 'fire', answer: 'smoke', rel: 'cause/effect', tier: 'easy',
    d: [d('ash', SAME_CAT), d('heat', ASSOCIATED), d('match', REVERSED)] },
  { a: 'germ', b: 'illness', c: 'spark', answer: 'fire', rel: 'cause/effect', tier: 'medium',
    d: [d('ember', SAME_CAT), d('smoke', WRONG_REL), d('flint', REVERSED)] },
  { a: 'exercise', b: 'fitness', c: 'study', answer: 'knowledge', rel: 'cause/effect', tier: 'medium',
    d: [d('reading', SAME_CAT), d('school', ASSOCIATED), d('test', WRONG_REL)] },
  { a: 'drought', b: 'famine', c: 'virus', answer: 'infection', rel: 'cause/effect', tier: 'hard',
    d: [d('bacteria', SAME_CAT), d('doctor', ASSOCIATED), d('vaccine', WRONG_REL)] },
  { a: 'joke', b: 'laughter', c: 'insult', answer: 'anger', rel: 'cause/effect', tier: 'medium',
    d: [d('rudeness', SAME_CAT), d('argument', ASSOCIATED), d('smile', WRONG_REL)] },
  { a: 'heat', b: 'sweat', c: 'cold', answer: 'shiver', rel: 'cause/effect', tier: 'easy',
    d: [d('sneeze', SAME_CAT), d('winter', ASSOCIATED), d('ice', REVERSED)] },
  { a: 'practice', b: 'improvement', c: 'rest', answer: 'recovery', rel: 'cause/effect', tier: 'medium',
    d: [d('sleep', SAME_CAT), d('bed', ASSOCIATED), d('tired', REVERSED)] },
  { a: 'flood', b: 'damage', c: 'earthquake', answer: 'destruction', rel: 'cause/effect', tier: 'medium',
    d: [d('tremor', SAME_CAT), d('rescue', WRONG_REL), d('fault', REVERSED)] },
  { a: 'pollution', b: 'smog', c: 'overeating', answer: 'indigestion', rel: 'cause/effect', tier: 'hard',
    d: [d('feast', SAME_CAT), d('stomach', ASSOCIATED), d('hunger', WRONG_REL)] },

  // ---------------- worker/tool ----------------
  { a: 'painter', b: 'brush', c: 'writer', answer: 'pen', rel: 'worker/tool', tier: 'easy',
    d: [d('author', SAME_CAT), d('paper', ASSOCIATED), d('book', WRONG_REL)] },
  { a: 'carpenter', b: 'hammer', c: 'chef', answer: 'knife', rel: 'worker/tool', tier: 'easy',
    d: [d('waiter', SAME_CAT), d('apron', ASSOCIATED), d('meal', WRONG_REL)] },
  { a: 'farmer', b: 'plow', c: 'barber', answer: 'scissors', rel: 'worker/tool', tier: 'easy',
    d: [d('stylist', SAME_CAT), d('chair', ASSOCIATED), d('hair', WRONG_REL)] },
  { a: 'surgeon', b: 'scalpel', c: 'tailor', answer: 'needle', rel: 'worker/tool', tier: 'medium',
    d: [d('seamstress', SAME_CAT), d('dress', ASSOCIATED), d('fabric', WRONG_REL)] },
  { a: 'gardener', b: 'rake', c: 'fisherman', answer: 'rod', rel: 'worker/tool', tier: 'medium',
    d: [d('sailor', SAME_CAT), d('boat', ASSOCIATED), d('fish', WRONG_REL)] },
  { a: 'sculptor', b: 'chisel', c: 'blacksmith', answer: 'anvil', rel: 'worker/tool', tier: 'hard',
    d: [d('welder', SAME_CAT), d('forge', ASSOCIATED), d('iron', WRONG_REL)] },
  { a: 'photographer', b: 'camera', c: 'astronomer', answer: 'telescope', rel: 'worker/tool', tier: 'medium',
    d: [d('scientist', SAME_CAT), d('observatory', ASSOCIATED), d('star', WRONG_REL)] },
  { a: 'conductor', b: 'baton', c: 'dentist', answer: 'drill', rel: 'worker/tool', tier: 'medium',
    d: [d('doctor', SAME_CAT), d('office', ASSOCIATED), d('tooth', WRONG_REL)] },
  { a: 'lumberjack', b: 'axe', c: 'locksmith', answer: 'key', rel: 'worker/tool', tier: 'medium',
    d: [d('mechanic', SAME_CAT), d('door', ASSOCIATED), d('lock', WRONG_REL)] },

  // ---------------- degree/intensity ----------------
  { a: 'warm', b: 'hot', c: 'cool', answer: 'cold', rel: 'degree/intensity', tier: 'easy',
    d: [d('chilly', SAME_CAT), d('ice', ASSOCIATED), d('freeze', WRONG_REL)] },
  { a: 'damp', b: 'soaked', c: 'tired', answer: 'exhausted', rel: 'degree/intensity', tier: 'medium',
    d: [d('sleepy', SAME_CAT), d('nap', ASSOCIATED), d('rest', WRONG_REL)] },
  { a: 'like', b: 'love', c: 'dislike', answer: 'hate', rel: 'degree/intensity', tier: 'easy',
    d: [d('annoy', SAME_CAT), d('anger', ASSOCIATED), d('avoid', WRONG_REL)] },
  { a: 'big', b: 'gigantic', c: 'small', answer: 'tiny', rel: 'degree/intensity', tier: 'easy',
    d: [d('little', SAME_CAT), d('size', ASSOCIATED), d('shrink', WRONG_REL)] },
  { a: 'hungry', b: 'starving', c: 'thirsty', answer: 'parched', rel: 'degree/intensity', tier: 'hard',
    d: [d('dry', SAME_CAT), d('water', ASSOCIATED), d('drink', WRONG_REL)] },
  { a: 'upset', b: 'furious', c: 'glad', answer: 'ecstatic', rel: 'degree/intensity', tier: 'hard',
    d: [d('happy', SAME_CAT), d('joy', ASSOCIATED), d('smile', WRONG_REL)] },
  { a: 'breeze', b: 'gale', c: 'drizzle', answer: 'downpour', rel: 'degree/intensity', tier: 'hard',
    d: [d('sprinkle', SAME_CAT), d('umbrella', ASSOCIATED), d('wet', WRONG_REL)] },
  { a: 'tap', b: 'pound', c: 'whisper', answer: 'shout', rel: 'degree/intensity', tier: 'medium',
    d: [d('murmur', SAME_CAT), d('voice', ASSOCIATED), d('talk', WRONG_REL)] },
  { a: 'good', b: 'excellent', c: 'bad', answer: 'terrible', rel: 'degree/intensity', tier: 'easy',
    d: [d('poor', SAME_CAT), d('problem', ASSOCIATED), d('fail', WRONG_REL)] },

  // ---------------- category/member ----------------
  { a: 'fruit', b: 'apple', c: 'vegetable', answer: 'carrot', rel: 'category/member', tier: 'easy',
    d: [d('banana', SAME_CAT), d('garden', ASSOCIATED), d('food', REVERSED)] },
  { a: 'instrument', b: 'violin', c: 'tool', answer: 'hammer', rel: 'category/member', tier: 'easy',
    d: [d('flute', SAME_CAT), d('toolbox', ASSOCIATED), d('equipment', REVERSED)] },
  { a: 'bird', b: 'robin', c: 'dog', answer: 'poodle', rel: 'category/member', tier: 'medium',
    d: [d('sparrow', SAME_CAT), d('bone', ASSOCIATED), d('animal', REVERSED)] },
  { a: 'metal', b: 'copper', c: 'gas', answer: 'helium', rel: 'category/member', tier: 'hard',
    d: [d('iron', SAME_CAT), d('balloon', ASSOCIATED), d('matter', REVERSED)] },
  { a: 'sport', b: 'tennis', c: 'dance', answer: 'ballet', rel: 'category/member', tier: 'medium',
    d: [d('soccer', SAME_CAT), d('music', ASSOCIATED), d('art', REVERSED)] },
  { a: 'color', b: 'crimson', c: 'shape', answer: 'hexagon', rel: 'category/member', tier: 'hard',
    d: [d('scarlet', SAME_CAT), d('corner', ASSOCIATED), d('symmetry', WRONG_REL)] },
  { a: 'tree', b: 'oak', c: 'flower', answer: 'rose', rel: 'category/member', tier: 'easy',
    d: [d('pine', SAME_CAT), d('vase', ASSOCIATED), d('plant', REVERSED)] },
  { a: 'planet', b: 'mars', c: 'ocean', answer: 'pacific', rel: 'category/member', tier: 'medium',
    d: [d('venus', SAME_CAT), d('wave', ASSOCIATED), d('water', REVERSED)] },
  { a: 'language', b: 'spanish', c: 'currency', answer: 'dollar', rel: 'category/member', tier: 'hard',
    d: [d('french', SAME_CAT), d('bank', ASSOCIATED), d('money', REVERSED)] },

  // ---------------- function ----------------
  { a: 'knife', b: 'cut', c: 'broom', answer: 'sweep', rel: 'function', tier: 'easy',
    d: [d('mop', SAME_CAT), d('floor', ASSOCIATED), d('dustpan', WRONG_REL)] },
  { a: 'pen', b: 'write', c: 'scissors', answer: 'cut', rel: 'function', tier: 'easy',
    d: [d('knife', SAME_CAT), d('paper', ASSOCIATED), d('sharp', WRONG_REL)] },
  { a: 'oven', b: 'bake', c: 'freezer', answer: 'freeze', rel: 'function', tier: 'medium',
    d: [d('refrigerator', SAME_CAT), d('kitchen', ASSOCIATED), d('cold', WRONG_REL)] },
  { a: 'key', b: 'unlock', c: 'match', answer: 'light', rel: 'function', tier: 'medium',
    d: [d('lighter', SAME_CAT), d('candle', ASSOCIATED), d('fire', WRONG_REL)] },
  { a: 'umbrella', b: 'shelter', c: 'fence', answer: 'enclose', rel: 'function', tier: 'hard',
    d: [d('wall', SAME_CAT), d('yard', ASSOCIATED), d('gate', WRONG_REL)] },
  { a: 'soap', b: 'clean', c: 'glue', answer: 'stick', rel: 'function', tier: 'easy',
    d: [d('tape', SAME_CAT), d('paper', ASSOCIATED), d('mess', WRONG_REL)] },
  { a: 'lamp', b: 'illuminate', c: 'heater', answer: 'warm', rel: 'function', tier: 'medium',
    d: [d('furnace', SAME_CAT), d('room', ASSOCIATED), d('cold', WRONG_REL)] },
  { a: 'brake', b: 'stop', c: 'accelerator', answer: 'accelerate', rel: 'function', tier: 'hard',
    d: [d('pedal', SAME_CAT), d('car', ASSOCIATED), d('fast', WRONG_REL)] },
  { a: 'shield', b: 'protect', c: 'sword', answer: 'attack', rel: 'function', tier: 'medium',
    d: [d('spear', SAME_CAT), d('knight', ASSOCIATED), d('sharp', WRONG_REL)] },

  // ---------------- antonym ----------------
  { a: 'hot', b: 'cold', c: 'up', answer: 'down', rel: 'antonym', tier: 'easy',
    d: [d('north', SAME_CAT), d('ladder', ASSOCIATED), d('above', WRONG_REL)] },
  { a: 'day', b: 'night', c: 'light', answer: 'dark', rel: 'antonym', tier: 'easy',
    d: [d('color', SAME_CAT), d('sun', ASSOCIATED), d('bright', WRONG_REL)] },
  { a: 'open', b: 'close', c: 'enter', answer: 'exit', rel: 'antonym', tier: 'easy',
    d: [d('come', SAME_CAT), d('doorway', ASSOCIATED), d('arrive', WRONG_REL)] },
  { a: 'wet', b: 'dry', c: 'full', answer: 'empty', rel: 'antonym', tier: 'easy',
    d: [d('fill', SAME_CAT), d('stomach', ASSOCIATED), d('complete', WRONG_REL)] },
  { a: 'brave', b: 'cowardly', c: 'generous', answer: 'stingy', rel: 'antonym', tier: 'hard',
    d: [d('kind', SAME_CAT), d('money', ASSOCIATED), d('giving', WRONG_REL)] },
  { a: 'victory', b: 'defeat', c: 'success', answer: 'failure', rel: 'antonym', tier: 'medium',
    d: [d('goal', SAME_CAT), d('trophy', ASSOCIATED), d('triumph', WRONG_REL)] },
  { a: 'ancient', b: 'modern', c: 'expand', answer: 'shrink', rel: 'antonym', tier: 'hard',
    d: [d('stretch', SAME_CAT), d('balloon', ASSOCIATED), d('grow', WRONG_REL)] },
  { a: 'accept', b: 'reject', c: 'praise', answer: 'criticize', rel: 'antonym', tier: 'hard',
    d: [d('compliment', SAME_CAT), d('award', ASSOCIATED), d('applaud', WRONG_REL)] },
  { a: 'rough', b: 'smooth', c: 'loud', answer: 'quiet', rel: 'antonym', tier: 'easy',
    d: [d('sound', SAME_CAT), d('music', ASSOCIATED), d('noisy', WRONG_REL)] },
  { a: 'gather', b: 'scatter', c: 'build', answer: 'destroy', rel: 'antonym', tier: 'medium',
    d: [d('create', SAME_CAT), d('house', ASSOCIATED), d('construct', WRONG_REL)] },

  // ---------------- synonym ----------------
  { a: 'big', b: 'large', c: 'small', answer: 'little', rel: 'synonym', tier: 'easy',
    d: [d('size', SAME_CAT), d('mouse', ASSOCIATED), d('big', WRONG_REL)] },
  { a: 'happy', b: 'glad', c: 'sad', answer: 'unhappy', rel: 'synonym', tier: 'easy',
    d: [d('mood', SAME_CAT), d('tears', ASSOCIATED), d('happy', WRONG_REL)] },
  { a: 'begin', b: 'start', c: 'end', answer: 'finish', rel: 'synonym', tier: 'easy',
    d: [d('pause', SAME_CAT), d('goal', ASSOCIATED), d('begin', WRONG_REL)] },
  { a: 'quick', b: 'fast', c: 'smart', answer: 'clever', rel: 'synonym', tier: 'medium',
    d: [d('quick', SAME_CAT), d('school', ASSOCIATED), d('dumb', WRONG_REL)] },
  { a: 'angry', b: 'mad', c: 'scared', answer: 'afraid', rel: 'synonym', tier: 'medium',
    d: [d('feeling', SAME_CAT), d('dark', ASSOCIATED), d('brave', WRONG_REL)] },
  { a: 'rich', b: 'wealthy', c: 'poor', answer: 'needy', rel: 'synonym', tier: 'hard',
    d: [d('money', SAME_CAT), d('beggar', ASSOCIATED), d('rich', WRONG_REL)] },
  { a: 'brave', b: 'courageous', c: 'honest', answer: 'truthful', rel: 'synonym', tier: 'hard',
    d: [d('polite', SAME_CAT), d('lie', ASSOCIATED), d('dishonest', WRONG_REL)] },
  { a: 'tired', b: 'weary', c: 'calm', answer: 'peaceful', rel: 'synonym', tier: 'hard',
    d: [d('gentle', SAME_CAT), d('sleep', ASSOCIATED), d('anxious', WRONG_REL)] },
  { a: 'smart', b: 'intelligent', c: 'funny', answer: 'humorous', rel: 'synonym', tier: 'medium',
    d: [d('silly', SAME_CAT), d('clown', ASSOCIATED), d('boring', WRONG_REL)] },
  { a: 'tiny', b: 'minuscule', c: 'huge', answer: 'enormous', rel: 'synonym', tier: 'medium',
    d: [d('wide', SAME_CAT), d('elephant', ASSOCIATED), d('tiny', WRONG_REL)] },

  // ---------------- sequence ----------------
  { a: 'monday', b: 'tuesday', c: 'thursday', answer: 'friday', rel: 'sequence', tier: 'easy',
    d: [d('month', SAME_CAT), d('weekend', ASSOCIATED), d('wednesday', REVERSED)] },
  { a: 'spring', b: 'summer', c: 'fall', answer: 'winter', rel: 'sequence', tier: 'easy',
    d: [d('season', SAME_CAT), d('snow', ASSOCIATED), d('summer', REVERSED)] },
  { a: 'january', b: 'february', c: 'june', answer: 'july', rel: 'sequence', tier: 'easy',
    d: [d('calendar', SAME_CAT), d('summer', ASSOCIATED), d('may', REVERSED)] },
  { a: 'first', b: 'second', c: 'third', answer: 'fourth', rel: 'sequence', tier: 'easy',
    d: [d('number', SAME_CAT), d('place', ASSOCIATED), d('second', REVERSED)] },
  { a: 'morning', b: 'afternoon', c: 'evening', answer: 'night', rel: 'sequence', tier: 'easy',
    d: [d('time', SAME_CAT), d('dinner', ASSOCIATED), d('afternoon', REVERSED)] },
  { a: 'infant', b: 'toddler', c: 'teenager', answer: 'adult', rel: 'sequence', tier: 'medium',
    d: [d('person', SAME_CAT), d('school', ASSOCIATED), d('child', REVERSED)] },
  { a: 'seed', b: 'sprout', c: 'caterpillar', answer: 'butterfly', rel: 'sequence', tier: 'medium',
    d: [d('insect', SAME_CAT), d('leaf', ASSOCIATED), d('egg', REVERSED)] },
  { a: 'dawn', b: 'noon', c: 'dusk', answer: 'midnight', rel: 'sequence', tier: 'hard',
    d: [d('hour', SAME_CAT), d('sunset', ASSOCIATED), d('noon', REVERSED)] },
  { a: 'appetizer', b: 'entree', c: 'entree', answer: 'dessert', rel: 'sequence', tier: 'medium',
    d: [d('food', SAME_CAT), d('restaurant', ASSOCIATED), d('appetizer', REVERSED)] },
]

// --- Skill construction (one entry -> one analogy item) ---------------------
const up = (s: string) => s.toUpperCase()

function analogyItem(e: AnalogyEntry, slot: number): PrepItem {
  const A = up(e.a)
  const B = up(e.b)
  const C = up(e.c)
  const ANS = up(e.answer)
  return {
    slot,
    difficulty: e.tier,
    stem: `${A} is to ${B} as ${C} is to ___`,
    choices: [
      { text: e.answer, is_correct: true },
      ...e.d.map((x) => ({ text: x.text, is_correct: false, misconception_token: x.token })),
    ],
    solution: `The relationship is ${e.rel}: ${REL_TEXT[e.rel](A, B)}, so ${REL_TEXT[e.rel](C, ANS)}.`,
  }
}

export const PREP_ANALOGY_SKILLS: PrepSkill[] = [
  {
    slug: 'prep-analogies',
    name: 'Analogies',
    subject: 'prep-verbal',
    gradeBand: '6-8',
    items: ANALOGY_BANK.map((e, i) => analogyItem(e, i + 1)),
  },
]
