/**
 * K–2 PRE-READER item format — a curated pool of AUDIO-FIRST, TAP-A-PICTURE items
 * for children who cannot yet read. The prompt is SPOKEN by Nikki (auto-read via
 * the existing ElevenLabs path); the answers are large TILES that are numbers or
 * groups of simple pictures — never a text stem the child must read.
 *
 * This rides the SAME generated_questions row as text items, marked with
 * render_mode = 'audio_picture', plus an optional visual `prompt`; each choice
 * carries a `tile`. Text items are untouched (render_mode defaults to 'text').
 *
 * FEEDBACK FOR THIS AGE IS WARM, NOT DIAGNOSTIC: unlike the older bank, K–2 items
 * carry NO misconception tokens. A wrong tap gets a gentle "let's count together"
 * (the item's spoken `solution`), never an error label. Distractors are KIND —
 * off-by-one or a clearly-different, easily-countable quantity, never tricky.
 *
 * PHASE 1 ships ONE proof skill: Kindergarten Counting (CCSS K.CC), both
 * directions (count -> number, number -> group). Images come from a small,
 * curated, safe inline-SVG set (see KID_IMAGES / the KidIcon component).
 */

import { KID_IMAGES, type KidImage } from './kidImages'

export type Difficulty = 'easy' | 'medium' | 'hard'

/** The curated, controlled illustration set: every picture the app can draw
 *  (src/lib/kidImages.ts; each name is one inline SVG in KidIcon). */
export { KID_IMAGES, type KidImage }

/** A tappable answer tile: a big numeral, a big LETTER, or a group of N icons. */
export type Tile =
  | { kind: 'number'; value: string }
  | { kind: 'letter'; value: string }
  | { kind: 'object_group'; image: KidImage; count: number }

/** The optional VISUAL prompt shown above the tiles (e.g. the group to count).
 *  null when the prompt is audio-only (e.g. "Tap the group that shows four"). */
export type Prompt = { kind: 'object_group'; image: KidImage; count: number } | null

export interface PreReaderChoice {
  /** Accessible label / scoring value (e.g. "3"). The child sees the tile, not this. */
  text: string
  is_correct: boolean
  tile: Tile
}

export interface PreReaderItem {
  slot: number
  difficulty: Difficulty
  /** The SPOKEN prompt — Nikki reads it aloud; the child does not read it. */
  stem: string
  prompt: Prompt
  choices: PreReaderChoice[] // 2-4 tiles, exactly one correct, kind distractors
  /** A short, warm, count-it-together message — spoken on a wrong tap and to explain. */
  solution: string
  /**
   * How distractors relate to the answer. Default (counting) = distinct quantities
   * off-by 1..3. 'match' = the choices are distinct by IDENTITY (a shape, or a
   * clearly-different number/quantity in a more/fewer comparison) with no
   * closeness rule — a comparison is meant to be an easy, clear difference.
   */
  variant?: 'match'
}

export interface PreReaderSkill {
  slug: string
  name: string
  subject: 'math' | 'reading'
  ccssGrade: string // 'K'
  ccssGradeNum: number // 0
  ccssCode: string
  satAlignment: string
  gradeBand: string // 'k-2'
  /** Taxonomy placement for the self-contained seed (domain + its parent subject). */
  domainKey: string
  domainName: string
  parentSubjectKey: string // 'subj-math' | 'subj-reading'
  renderMode: 'audio_picture'
  items: PreReaderItem[]
}

const num = (v: number): Tile => ({ kind: 'number', value: String(v) })
const grp = (image: KidImage, count: number): Tile => ({ kind: 'object_group', image, count })
const ltr = (v: string): Tile => ({ kind: 'letter', value: v })

// Choice helpers (label + tile + correctness) for the deepening skills.
const numChoice = (v: number, correct = false): PreReaderChoice => ({ text: String(v), is_correct: correct, tile: num(v) })
const ltrChoice = (v: string, correct = false): PreReaderChoice => ({ text: v, is_correct: correct, tile: ltr(v) })
const shapeChoice = (name: KidImage, correct = false): PreReaderChoice => ({ text: name, is_correct: correct, tile: grp(name, 1) })
const grpChoice = (image: KidImage, count: number, correct = false): PreReaderChoice => ({ text: String(count), is_correct: correct, tile: grp(image, count) })
// A single-picture answer whose spoken label is the object's name (reused for
// shapes, coins, and reading-comprehension "tap the picture" answers).
const picChoice = shapeChoice

// ============================================================================
// Kindergarten — Counting (CCSS K.CC.B.5): count to answer "how many?", and
// match a number to a group. Audio-first, tap a tile. 28 items, both directions.
// ============================================================================

const COUNTING_K: PreReaderSkill = {
  slug: 'counting', name: 'Counting', subject: 'math',
  ccssGrade: 'K', ccssGradeNum: 0, ccssCode: 'CCSS.MATH.CONTENT.K.CC.B.5',
  satAlignment: 'problem-solving-data-analysis', gradeBand: 'k-2',
  domainKey: 'dom-math-cc', domainName: 'Counting & Cardinality', parentSubjectKey: 'subj-math',
  renderMode: 'audio_picture',
  items: [
    // --- Direction A: count the pictures, tap the number ---
    { slot: 1, difficulty: 'easy', stem: 'How many apples do you see? Tap the number.', prompt: { kind: 'object_group', image: 'apple', count: 3 }, choices: [
      { text: '3', is_correct: true, tile: num(3) },
      { text: '2', is_correct: false, tile: num(2) },
      { text: '4', is_correct: false, tile: num(4) },
    ], solution: "Let's count the apples together: one, two, three. There are 3 apples!" },
    { slot: 2, difficulty: 'easy', stem: 'How many stars do you see? Tap the number.', prompt: { kind: 'object_group', image: 'star', count: 5 }, choices: [
      { text: '5', is_correct: true, tile: num(5) },
      { text: '4', is_correct: false, tile: num(4) },
      { text: '6', is_correct: false, tile: num(6) },
    ], solution: "Let's count the stars: one, two, three, four, five. There are 5 stars!" },
    { slot: 3, difficulty: 'easy', stem: 'How many balls do you see? Tap the number.', prompt: { kind: 'object_group', image: 'ball', count: 2 }, choices: [
      { text: '2', is_correct: true, tile: num(2) },
      { text: '1', is_correct: false, tile: num(1) },
      { text: '3', is_correct: false, tile: num(3) },
    ], solution: "Let's count the balls: one, two. There are 2 balls!" },
    { slot: 4, difficulty: 'medium', stem: 'How many flowers do you see? Tap the number.', prompt: { kind: 'object_group', image: 'flower', count: 7 }, choices: [
      { text: '7', is_correct: true, tile: num(7) },
      { text: '6', is_correct: false, tile: num(6) },
      { text: '8', is_correct: false, tile: num(8) },
      { text: '5', is_correct: false, tile: num(5) },
    ], solution: "Let's touch each flower and count: one, two, three, four, five, six, seven. There are 7 flowers!" },
    { slot: 5, difficulty: 'medium', stem: 'How many ducks do you see? Tap the number.', prompt: { kind: 'object_group', image: 'duck', count: 4 }, choices: [
      { text: '4', is_correct: true, tile: num(4) },
      { text: '3', is_correct: false, tile: num(3) },
      { text: '5', is_correct: false, tile: num(5) },
      { text: '6', is_correct: false, tile: num(6) },
    ], solution: "Let's count the ducks: one, two, three, four. There are 4 ducks!" },
    { slot: 6, difficulty: 'medium', stem: 'How many fish do you see? Tap the number.', prompt: { kind: 'object_group', image: 'fish', count: 6 }, choices: [
      { text: '6', is_correct: true, tile: num(6) },
      { text: '5', is_correct: false, tile: num(5) },
      { text: '7', is_correct: false, tile: num(7) },
      { text: '8', is_correct: false, tile: num(8) },
    ], solution: "Let's count the fish: one, two, three, four, five, six. There are 6 fish!" },
    { slot: 7, difficulty: 'hard', stem: 'How many apples do you see? Tap the number.', prompt: { kind: 'object_group', image: 'apple', count: 9 }, choices: [
      { text: '9', is_correct: true, tile: num(9) },
      { text: '8', is_correct: false, tile: num(8) },
      { text: '10', is_correct: false, tile: num(10) },
      { text: '7', is_correct: false, tile: num(7) },
    ], solution: "Let's touch each apple and count all the way to nine. There are 9 apples!" },
    { slot: 8, difficulty: 'easy', stem: 'How many stars do you see? Tap the number.', prompt: { kind: 'object_group', image: 'star', count: 1 }, choices: [
      { text: '1', is_correct: true, tile: num(1) },
      { text: '2', is_correct: false, tile: num(2) },
      { text: '3', is_correct: false, tile: num(3) },
    ], solution: "There is just one star. The answer is 1!" },
    { slot: 9, difficulty: 'medium', stem: 'How many balls do you see? Tap the number.', prompt: { kind: 'object_group', image: 'ball', count: 8 }, choices: [
      { text: '8', is_correct: true, tile: num(8) },
      { text: '7', is_correct: false, tile: num(7) },
      { text: '9', is_correct: false, tile: num(9) },
      { text: '6', is_correct: false, tile: num(6) },
    ], solution: "Let's count the balls all the way to eight. There are 8 balls!" },
    // --- Direction B: hear a number, tap the matching group ---
    { slot: 10, difficulty: 'easy', stem: 'Tap the group that shows 3.', prompt: null, choices: [
      { text: '3', is_correct: true, tile: grp('star', 3) },
      { text: '2', is_correct: false, tile: grp('star', 2) },
      { text: '4', is_correct: false, tile: grp('star', 4) },
    ], solution: "Let's count each group. One, two, three, this group shows 3!" },
    { slot: 11, difficulty: 'easy', stem: 'Tap the group that shows 4.', prompt: null, choices: [
      { text: '4', is_correct: true, tile: grp('apple', 4) },
      { text: '3', is_correct: false, tile: grp('apple', 3) },
      { text: '5', is_correct: false, tile: grp('apple', 5) },
    ], solution: "Let's count each group. The group with four apples is the one that shows 4!" },
    { slot: 12, difficulty: 'easy', stem: 'Tap the group that shows 2.', prompt: null, choices: [
      { text: '2', is_correct: true, tile: grp('duck', 2) },
      { text: '1', is_correct: false, tile: grp('duck', 1) },
      { text: '3', is_correct: false, tile: grp('duck', 3) },
    ], solution: "Let's count. The group with two ducks shows 2!" },
    { slot: 13, difficulty: 'medium', stem: 'Tap the group that shows 6.', prompt: null, choices: [
      { text: '6', is_correct: true, tile: grp('ball', 6) },
      { text: '5', is_correct: false, tile: grp('ball', 5) },
      { text: '7', is_correct: false, tile: grp('ball', 7) },
      { text: '4', is_correct: false, tile: grp('ball', 4) },
    ], solution: "Let's count each group carefully. The group with six balls shows 6!" },
    { slot: 14, difficulty: 'medium', stem: 'Tap the group that shows 5.', prompt: null, choices: [
      { text: '5', is_correct: true, tile: grp('flower', 5) },
      { text: '4', is_correct: false, tile: grp('flower', 4) },
      { text: '6', is_correct: false, tile: grp('flower', 6) },
      { text: '7', is_correct: false, tile: grp('flower', 7) },
    ], solution: "Let's count. The group with five flowers shows 5!" },
    { slot: 15, difficulty: 'medium', stem: 'Tap the group that shows 8.', prompt: null, choices: [
      { text: '8', is_correct: true, tile: grp('fish', 8) },
      { text: '7', is_correct: false, tile: grp('fish', 7) },
      { text: '9', is_correct: false, tile: grp('fish', 9) },
      { text: '6', is_correct: false, tile: grp('fish', 6) },
    ], solution: "Let's count each group all the way. The group with eight fish shows 8!" },
    { slot: 16, difficulty: 'hard', stem: 'Tap the group that shows 10.', prompt: null, choices: [
      { text: '10', is_correct: true, tile: grp('star', 10) },
      { text: '9', is_correct: false, tile: grp('star', 9) },
      { text: '11', is_correct: false, tile: grp('star', 11) },
      { text: '8', is_correct: false, tile: grp('star', 8) },
    ], solution: "Let's count each group of stars all the way to ten. The group of 10 is the answer!" },
    { slot: 17, difficulty: 'easy', stem: 'Tap the group that shows 1.', prompt: null, choices: [
      { text: '1', is_correct: true, tile: grp('apple', 1) },
      { text: '2', is_correct: false, tile: grp('apple', 2) },
      { text: '3', is_correct: false, tile: grp('apple', 3) },
    ], solution: "The group with just one apple shows 1!" },
    { slot: 18, difficulty: 'medium', stem: 'Tap the group that shows 7.', prompt: null, choices: [
      { text: '7', is_correct: true, tile: grp('duck', 7) },
      { text: '6', is_correct: false, tile: grp('duck', 6) },
      { text: '8', is_correct: false, tile: grp('duck', 8) },
      { text: '5', is_correct: false, tile: grp('duck', 5) },
    ], solution: "Let's count each group. The group with seven ducks shows 7!" },
    // --- More count -> number (fresh pictures for variety) ---
    { slot: 19, difficulty: 'easy', stem: 'How many cats do you see? Tap the number.', prompt: { kind: 'object_group', image: 'cat', count: 4 }, choices: [
      { text: '4', is_correct: true, tile: num(4) },
      { text: '3', is_correct: false, tile: num(3) },
      { text: '5', is_correct: false, tile: num(5) },
    ], solution: "Let's count the cats: one, two, three, four. There are 4 cats!" },
    { slot: 20, difficulty: 'medium', stem: 'How many hats do you see? Tap the number.', prompt: { kind: 'object_group', image: 'hat', count: 6 }, choices: [
      { text: '6', is_correct: true, tile: num(6) },
      { text: '5', is_correct: false, tile: num(5) },
      { text: '7', is_correct: false, tile: num(7) },
      { text: '4', is_correct: false, tile: num(4) },
    ], solution: "Let's count the hats: one, two, three, four, five, six. There are 6 hats!" },
    { slot: 21, difficulty: 'easy', stem: 'How many keys do you see? Tap the number.', prompt: { kind: 'object_group', image: 'key', count: 3 }, choices: [
      { text: '3', is_correct: true, tile: num(3) },
      { text: '2', is_correct: false, tile: num(2) },
      { text: '4', is_correct: false, tile: num(4) },
    ], solution: "Let's count the keys: one, two, three. There are 3 keys!" },
    { slot: 22, difficulty: 'medium', stem: 'How many leaves do you see? Tap the number.', prompt: { kind: 'object_group', image: 'leaf', count: 8 }, choices: [
      { text: '8', is_correct: true, tile: num(8) },
      { text: '7', is_correct: false, tile: num(7) },
      { text: '9', is_correct: false, tile: num(9) },
      { text: '6', is_correct: false, tile: num(6) },
    ], solution: "Let's touch each leaf and count all the way to eight. There are 8 leaves!" },
    { slot: 23, difficulty: 'medium', stem: 'How many pigs do you see? Tap the number.', prompt: { kind: 'object_group', image: 'pig', count: 5 }, choices: [
      { text: '5', is_correct: true, tile: num(5) },
      { text: '4', is_correct: false, tile: num(4) },
      { text: '6', is_correct: false, tile: num(6) },
      { text: '7', is_correct: false, tile: num(7) },
    ], solution: "Let's count the pigs: one, two, three, four, five. There are 5 pigs!" },
    // --- More number -> group (fresh pictures for variety) ---
    { slot: 24, difficulty: 'easy', stem: 'Tap the group that shows 5.', prompt: null, choices: [
      { text: '5', is_correct: true, tile: grp('cat', 5) },
      { text: '4', is_correct: false, tile: grp('cat', 4) },
      { text: '6', is_correct: false, tile: grp('cat', 6) },
    ], solution: "Let's count each group. The group with five cats shows 5!" },
    { slot: 25, difficulty: 'hard', stem: 'Tap the group that shows 9.', prompt: null, choices: [
      { text: '9', is_correct: true, tile: grp('ring', 9) },
      { text: '8', is_correct: false, tile: grp('ring', 8) },
      { text: '10', is_correct: false, tile: grp('ring', 10) },
      { text: '7', is_correct: false, tile: grp('ring', 7) },
    ], solution: "Let's count carefully. The group with nine rings shows 9!" },
    { slot: 26, difficulty: 'easy', stem: 'Tap the group that shows 2.', prompt: null, choices: [
      { text: '2', is_correct: true, tile: grp('sun', 2) },
      { text: '1', is_correct: false, tile: grp('sun', 1) },
      { text: '3', is_correct: false, tile: grp('sun', 3) },
    ], solution: "Let's count. The group with two suns shows 2!" },
    { slot: 27, difficulty: 'medium', stem: 'Tap the group that shows 6.', prompt: null, choices: [
      { text: '6', is_correct: true, tile: grp('tree', 6) },
      { text: '5', is_correct: false, tile: grp('tree', 5) },
      { text: '7', is_correct: false, tile: grp('tree', 7) },
      { text: '4', is_correct: false, tile: grp('tree', 4) },
    ], solution: "Let's count each group. The group with six trees shows 6!" },
    { slot: 28, difficulty: 'hard', stem: 'Tap the group that shows 10.', prompt: null, choices: [
      { text: '10', is_correct: true, tile: grp('van', 10) },
      { text: '9', is_correct: false, tile: grp('van', 9) },
      { text: '11', is_correct: false, tile: grp('van', 11) },
      { text: '8', is_correct: false, tile: grp('van', 8) },
    ], solution: "Let's count all the way to ten. The group with ten vans shows 10!" },
  ],
}

// ============================================================================
// Kindergarten — Letter Sounds (CCSS RF.K.3.A / RF.K.2.C): WORD + PICTURE
// beginning-sound recognition. Nikki says a familiar word clearly (TTS handles
// whole words well) and its picture is shown; the child taps the letter the word
// STARTS with. This is the reliable path (no fragile isolated phonemes) and how
// phonics is actually taught ("b is for ball"). Tiles are LETTERS. 15 items.
//
// Distractors are clearly-different letters — never b/d/p look-alikes or minimal
// pairs. Feedback is warm: "Ball starts with buh… B! Nice listening!" 28 items.
// ============================================================================

const word = (image: KidImage): Prompt => ({ kind: 'object_group', image, count: 1 })

const LETTER_SOUNDS_K: PreReaderSkill = {
  slug: 'letter-sounds', name: 'Letter Sounds', subject: 'reading',
  ccssGrade: 'K', ccssGradeNum: 0, ccssCode: 'CCSS.ELA-LITERACY.RF.K.3.A',
  satAlignment: 'information-and-ideas', gradeBand: 'k-2',
  domainKey: 'dom-reading-foundational', domainName: 'Reading Foundational Skills', parentSubjectKey: 'subj-reading',
  renderMode: 'audio_picture',
  items: [
    { slot: 1, difficulty: 'easy', stem: 'Listen: ball. Which letter does ball start with?', prompt: word('ball'), choices: [
      { text: 'B', is_correct: true, tile: ltr('B') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Ball starts with buh… B! Nice listening!' },
    { slot: 2, difficulty: 'easy', stem: 'Listen: cat. Which letter does cat start with?', prompt: word('cat'), choices: [
      { text: 'C', is_correct: true, tile: ltr('C') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'S', is_correct: false, tile: ltr('S') },
    ], solution: 'Cat starts with kuh… C! Nice listening!' },
    { slot: 3, difficulty: 'easy', stem: 'Listen: duck. Which letter does duck start with?', prompt: word('duck'), choices: [
      { text: 'D', is_correct: true, tile: ltr('D') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'S', is_correct: false, tile: ltr('S') },
    ], solution: 'Duck starts with duh… D! Nice listening!' },
    { slot: 4, difficulty: 'easy', stem: 'Listen: fish. Which letter does fish start with?', prompt: word('fish'), choices: [
      { text: 'F', is_correct: true, tile: ltr('F') }, { text: 'L', is_correct: false, tile: ltr('L') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Fish starts with fff… F! Nice listening!' },
    { slot: 5, difficulty: 'easy', stem: 'Listen: moon. Which letter does moon start with?', prompt: word('moon'), choices: [
      { text: 'M', is_correct: true, tile: ltr('M') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Moon starts with mmm… M! Nice listening!' },
    { slot: 6, difficulty: 'easy', stem: 'Listen: sun. Which letter does sun start with?', prompt: word('sun'), choices: [
      { text: 'S', is_correct: true, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'B', is_correct: false, tile: ltr('B') },
    ], solution: 'Sun starts with sss… S! Nice listening!' },
    { slot: 7, difficulty: 'easy', stem: 'Listen: tree. Which letter does tree start with?', prompt: word('tree'), choices: [
      { text: 'T', is_correct: true, tile: ltr('T') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'S', is_correct: false, tile: ltr('S') },
    ], solution: 'Tree starts with tuh… T! Nice listening!' },
    { slot: 8, difficulty: 'medium', stem: 'Listen: leaf. Which letter does leaf start with?', prompt: word('leaf'), choices: [
      { text: 'L', is_correct: true, tile: ltr('L') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'F', is_correct: false, tile: ltr('F') }, { text: 'S', is_correct: false, tile: ltr('S') },
    ], solution: 'Leaf starts with lll… L! Nice listening!' },
    { slot: 9, difficulty: 'medium', stem: 'Listen: pig. Which letter does pig start with?', prompt: word('pig'), choices: [
      { text: 'P', is_correct: true, tile: ltr('P') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Pig starts with puh… P! Nice listening!' },
    { slot: 10, difficulty: 'medium', stem: 'Listen: ring. Which letter does ring start with?', prompt: word('ring'), choices: [
      { text: 'R', is_correct: true, tile: ltr('R') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Ring starts with rrr… R! Nice listening!' },
    { slot: 11, difficulty: 'medium', stem: 'Listen: hat. Which letter does hat start with?', prompt: word('hat'), choices: [
      { text: 'H', is_correct: true, tile: ltr('H') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Hat starts with hhh… H! Nice listening!' },
    { slot: 12, difficulty: 'medium', stem: 'Listen: key. Which letter does key start with?', prompt: word('key'), choices: [
      { text: 'K', is_correct: true, tile: ltr('K') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'T', is_correct: false, tile: ltr('T') }, { text: 'M', is_correct: false, tile: ltr('M') },
    ], solution: 'Key starts with kuh… K! Nice listening!' },
    { slot: 13, difficulty: 'medium', stem: 'Listen: gift. Which letter does gift start with?', prompt: word('gift'), choices: [
      { text: 'G', is_correct: true, tile: ltr('G') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'T', is_correct: false, tile: ltr('T') }, { text: 'M', is_correct: false, tile: ltr('M') },
    ], solution: 'Gift starts with guh… G! Nice listening!' },
    { slot: 14, difficulty: 'hard', stem: 'Listen: van. Which letter does van start with?', prompt: word('van'), choices: [
      { text: 'V', is_correct: true, tile: ltr('V') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Van starts with vvv… V! Nice listening!' },
    { slot: 15, difficulty: 'hard', stem: 'Listen: apple. Which letter does apple start with?', prompt: word('apple'), choices: [
      { text: 'A', is_correct: true, tile: ltr('A') }, { text: 'E', is_correct: false, tile: ltr('E') }, { text: 'O', is_correct: false, tile: ltr('O') }, { text: 'S', is_correct: false, tile: ltr('S') },
    ], solution: 'Apple starts with A… aaa, apple! Nice listening!' },
    // --- Deepening: more familiar words (2nd word per letter + new letters J/N/W/Y) ---
    { slot: 16, difficulty: 'medium', stem: 'Listen: house. Which letter does house start with?', prompt: word('house'), choices: [
      { text: 'H', is_correct: true, tile: ltr('H') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'House starts with hhh… H! Nice listening!' },
    { slot: 17, difficulty: 'medium', stem: 'Listen: cap. Which letter does cap start with?', prompt: word('cap'), choices: [
      { text: 'C', is_correct: true, tile: ltr('C') }, { text: 'T', is_correct: false, tile: ltr('T') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'S', is_correct: false, tile: ltr('S') },
    ], solution: 'Cap starts with kuh… C! Nice listening!' },
    { slot: 18, difficulty: 'easy', stem: 'Listen: bus. Which letter does bus start with?', prompt: word('bus'), choices: [
      { text: 'B', is_correct: true, tile: ltr('B') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'T', is_correct: false, tile: ltr('T') }, { text: 'M', is_correct: false, tile: ltr('M') },
    ], solution: 'Bus starts with buh… B! Nice listening!' },
    { slot: 19, difficulty: 'medium', stem: 'Listen: door. Which letter does door start with?', prompt: word('door'), choices: [
      { text: 'D', is_correct: true, tile: ltr('D') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'F', is_correct: false, tile: ltr('F') },
    ], solution: 'Door starts with duh… D! Nice listening!' },
    { slot: 20, difficulty: 'medium', stem: 'Listen: jet. Which letter does jet start with?', prompt: word('jet'), choices: [
      { text: 'J', is_correct: true, tile: ltr('J') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Jet starts with juh… J! Nice listening!' },
    { slot: 21, difficulty: 'medium', stem: 'Listen: net. Which letter does net start with?', prompt: word('net'), choices: [
      { text: 'N', is_correct: true, tile: ltr('N') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Net starts with nnn… N! Nice listening!' },
    { slot: 22, difficulty: 'hard', stem: 'Listen: web. Which letter does web start with?', prompt: word('web'), choices: [
      { text: 'W', is_correct: true, tile: ltr('W') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Web starts with wuh… W! Nice listening!' },
    { slot: 23, difficulty: 'hard', stem: 'Listen: yo-yo. Which letter does yo-yo start with?', prompt: word('yoyo'), choices: [
      { text: 'Y', is_correct: true, tile: ltr('Y') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Yo-yo starts with yuh… Y! Nice listening!' },
    { slot: 24, difficulty: 'easy', stem: 'Listen: sock. Which letter does sock start with?', prompt: word('sock'), choices: [
      { text: 'S', is_correct: true, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'T', is_correct: false, tile: ltr('T') }, { text: 'B', is_correct: false, tile: ltr('B') },
    ], solution: 'Sock starts with sss… S! Nice listening!' },
    { slot: 25, difficulty: 'easy', stem: 'Listen: mug. Which letter does mug start with?', prompt: word('mug'), choices: [
      { text: 'M', is_correct: true, tile: ltr('M') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'T', is_correct: false, tile: ltr('T') }, { text: 'B', is_correct: false, tile: ltr('B') },
    ], solution: 'Mug starts with mmm… M! Nice listening!' },
    { slot: 26, difficulty: 'medium', stem: 'Listen: pot. Which letter does pot start with?', prompt: word('pot'), choices: [
      { text: 'P', is_correct: true, tile: ltr('P') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Pot starts with puh… P! Nice listening!' },
    { slot: 27, difficulty: 'medium', stem: 'Listen: kite. Which letter does kite start with?', prompt: word('kite'), choices: [
      { text: 'K', is_correct: true, tile: ltr('K') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'T', is_correct: false, tile: ltr('T') },
    ], solution: 'Kite starts with kuh… K! Nice listening!' },
    { slot: 28, difficulty: 'medium', stem: 'Listen: tent. Which letter does tent start with?', prompt: word('tent'), choices: [
      { text: 'T', is_correct: true, tile: ltr('T') }, { text: 'S', is_correct: false, tile: ltr('S') }, { text: 'M', is_correct: false, tile: ltr('M') }, { text: 'B', is_correct: false, tile: ltr('B') },
    ], solution: 'Tent starts with tuh… T! Nice listening!' },
  ],
}

// ============================================================================
// Kindergarten — Letter Naming (CCSS RF.K.1.D): recognize & name upper- AND
// lowercase letters. Nikki says a letter's name; the child taps that letter tile.
// Uppercase first, then lowercase. Distractors are clearly-different letters
// (never b/d/p/q look-alikes; those are avoided as answers). 26 items.
// ============================================================================

const LETTER_NAMING_K: PreReaderSkill = {
  slug: 'letter-naming', name: 'Letter Naming', subject: 'reading',
  ccssGrade: 'K', ccssGradeNum: 0, ccssCode: 'CCSS.ELA-LITERACY.RF.K.1.D',
  satAlignment: 'information-and-ideas', gradeBand: 'k-2',
  domainKey: 'dom-reading-foundational', domainName: 'Reading Foundational Skills', parentSubjectKey: 'subj-reading',
  renderMode: 'audio_picture',
  items: [
    // --- Uppercase: hear a letter name, tap the capital letter ---
    { slot: 1, difficulty: 'easy', stem: 'Can you find the letter A? Tap it.', prompt: null, choices: [ltrChoice('A', true), ltrChoice('S'), ltrChoice('M')], solution: "That's A! Great finding!" },
    { slot: 2, difficulty: 'easy', stem: 'Can you find the letter B? Tap it.', prompt: null, choices: [ltrChoice('B', true), ltrChoice('S'), ltrChoice('T')], solution: "That's B! Nice work!" },
    { slot: 3, difficulty: 'easy', stem: 'Can you find the letter C? Tap it.', prompt: null, choices: [ltrChoice('C', true), ltrChoice('M'), ltrChoice('S')], solution: "That's C! Well done!" },
    { slot: 4, difficulty: 'easy', stem: 'Can you find the letter E? Tap it.', prompt: null, choices: [ltrChoice('E', true), ltrChoice('S'), ltrChoice('M')], solution: "That's E! Great!" },
    { slot: 5, difficulty: 'medium', stem: 'Can you find the letter F? Tap it.', prompt: null, choices: [ltrChoice('F', true), ltrChoice('S'), ltrChoice('T'), ltrChoice('M')], solution: "That's F! Nice finding!" },
    { slot: 6, difficulty: 'medium', stem: 'Can you find the letter H? Tap it.', prompt: null, choices: [ltrChoice('H', true), ltrChoice('S'), ltrChoice('M'), ltrChoice('T')], solution: "That's H! Well done!" },
    { slot: 7, difficulty: 'medium', stem: 'Can you find the letter K? Tap it.', prompt: null, choices: [ltrChoice('K', true), ltrChoice('S'), ltrChoice('M'), ltrChoice('T')], solution: "That's K! Great!" },
    { slot: 8, difficulty: 'medium', stem: 'Can you find the letter L? Tap it.', prompt: null, choices: [ltrChoice('L', true), ltrChoice('S'), ltrChoice('M'), ltrChoice('T')], solution: "That's L! Nice!" },
    { slot: 9, difficulty: 'easy', stem: 'Can you find the letter O? Tap it.', prompt: null, choices: [ltrChoice('O', true), ltrChoice('S'), ltrChoice('M')], solution: "That's O, the round one! Great!" },
    { slot: 10, difficulty: 'medium', stem: 'Can you find the letter R? Tap it.', prompt: null, choices: [ltrChoice('R', true), ltrChoice('S'), ltrChoice('M'), ltrChoice('T')], solution: "That's R! Well done!" },
    { slot: 11, difficulty: 'easy', stem: 'Can you find the letter S? Tap it.', prompt: null, choices: [ltrChoice('S', true), ltrChoice('M'), ltrChoice('T'), ltrChoice('B')], solution: "That's S! Nice finding!" },
    { slot: 12, difficulty: 'easy', stem: 'Can you find the letter T? Tap it.', prompt: null, choices: [ltrChoice('T', true), ltrChoice('S'), ltrChoice('M'), ltrChoice('B')], solution: "That's T! Great!" },
    { slot: 13, difficulty: 'medium', stem: 'Can you find the letter W? Tap it.', prompt: null, choices: [ltrChoice('W', true), ltrChoice('S'), ltrChoice('M'), ltrChoice('T')], solution: "That's W! Well done!" },
    { slot: 14, difficulty: 'hard', stem: 'Can you find the letter Z? Tap it.', prompt: null, choices: [ltrChoice('Z', true), ltrChoice('S'), ltrChoice('M'), ltrChoice('T')], solution: "That's Z, the very last letter! Great!" },
    // --- Lowercase: hear a letter name, tap the little letter ---
    { slot: 15, difficulty: 'medium', stem: 'Tap the little letter a.', prompt: null, choices: [ltrChoice('a', true), ltrChoice('s'), ltrChoice('m')], solution: "Yes, that's little a! Nice!" },
    { slot: 16, difficulty: 'medium', stem: 'Tap the little letter c.', prompt: null, choices: [ltrChoice('c', true), ltrChoice('s'), ltrChoice('m')], solution: "Yes, little c! Great!" },
    { slot: 17, difficulty: 'medium', stem: 'Tap the little letter e.', prompt: null, choices: [ltrChoice('e', true), ltrChoice('s'), ltrChoice('m'), ltrChoice('t')], solution: "That's little e! Well done!" },
    { slot: 18, difficulty: 'medium', stem: 'Tap the little letter f.', prompt: null, choices: [ltrChoice('f', true), ltrChoice('s'), ltrChoice('m'), ltrChoice('t')], solution: "That's little f! Nice!" },
    { slot: 19, difficulty: 'medium', stem: 'Tap the little letter h.', prompt: null, choices: [ltrChoice('h', true), ltrChoice('s'), ltrChoice('m'), ltrChoice('t')], solution: "That's little h! Great!" },
    { slot: 20, difficulty: 'hard', stem: 'Tap the little letter k.', prompt: null, choices: [ltrChoice('k', true), ltrChoice('s'), ltrChoice('m'), ltrChoice('t')], solution: "That's little k! Well done!" },
    { slot: 21, difficulty: 'medium', stem: 'Tap the little letter l.', prompt: null, choices: [ltrChoice('l', true), ltrChoice('s'), ltrChoice('m'), ltrChoice('a')], solution: "That's little l! Nice!" },
    { slot: 22, difficulty: 'medium', stem: 'Tap the little letter m.', prompt: null, choices: [ltrChoice('m', true), ltrChoice('s'), ltrChoice('t'), ltrChoice('a')], solution: "That's little m! Great!" },
    { slot: 23, difficulty: 'easy', stem: 'Tap the little letter o.', prompt: null, choices: [ltrChoice('o', true), ltrChoice('s'), ltrChoice('m'), ltrChoice('t')], solution: "That's little o, nice and round! Nice!" },
    { slot: 24, difficulty: 'medium', stem: 'Tap the little letter r.', prompt: null, choices: [ltrChoice('r', true), ltrChoice('s'), ltrChoice('m'), ltrChoice('t')], solution: "That's little r! Well done!" },
    { slot: 25, difficulty: 'easy', stem: 'Tap the little letter s.', prompt: null, choices: [ltrChoice('s', true), ltrChoice('m'), ltrChoice('t'), ltrChoice('a')], solution: "That's little s! Great!" },
    { slot: 26, difficulty: 'medium', stem: 'Tap the little letter t.', prompt: null, choices: [ltrChoice('t', true), ltrChoice('s'), ltrChoice('m'), ltrChoice('a')], solution: "That's little t! Nice!" },
  ],
}

// ============================================================================
// Kindergarten — Shapes (CCSS K.G.A.2): name & identify 2-D shapes. Nikki names a
// shape; the child taps the matching shape picture. Distractors are clearly-
// different shapes (kind). 26 items. Uses `variant: 'match'` — the answers differ
// by SHAPE, not by quantity, so there is no off-by-one closeness rule.
// ============================================================================

const SHAPES_K: PreReaderSkill = {
  slug: 'shapes', name: 'Shapes', subject: 'math',
  ccssGrade: 'K', ccssGradeNum: 0, ccssCode: 'CCSS.MATH.CONTENT.K.G.A.2',
  satAlignment: 'problem-solving-data-analysis', gradeBand: 'k-2',
  domainKey: 'dom-math-geo', domainName: 'Geometry', parentSubjectKey: 'subj-math',
  renderMode: 'audio_picture',
  items: [
    { slot: 1, difficulty: 'easy', variant: 'match', stem: 'Can you find the circle? Tap it.', prompt: null, choices: [shapeChoice('circle', true), shapeChoice('square'), shapeChoice('triangle')], solution: 'Yes! That round shape is a circle. Great!' },
    { slot: 2, difficulty: 'easy', variant: 'match', stem: 'Can you find the square? Tap it.', prompt: null, choices: [shapeChoice('square', true), shapeChoice('circle'), shapeChoice('triangle')], solution: 'Yes! A square has four equal sides. Nice!' },
    { slot: 3, difficulty: 'easy', variant: 'match', stem: 'Can you find the triangle? Tap it.', prompt: null, choices: [shapeChoice('triangle', true), shapeChoice('circle'), shapeChoice('square')], solution: 'Yes! A triangle has three sides. Well done!' },
    { slot: 4, difficulty: 'medium', variant: 'match', stem: 'Can you find the rectangle? Tap it.', prompt: null, choices: [shapeChoice('rectangle', true), shapeChoice('circle'), shapeChoice('triangle')], solution: 'Yes! A rectangle is like a long box. Great!' },
    { slot: 5, difficulty: 'medium', variant: 'match', stem: 'Can you find the oval? Tap it.', prompt: null, choices: [shapeChoice('oval', true), shapeChoice('square'), shapeChoice('triangle')], solution: 'Yes! An oval is like a stretched circle. Nice!' },
    { slot: 6, difficulty: 'medium', variant: 'match', stem: 'Can you find the diamond? Tap it.', prompt: null, choices: [shapeChoice('diamond', true), shapeChoice('circle'), shapeChoice('triangle')], solution: "Yes! That's a diamond. Well done!" },
    { slot: 7, difficulty: 'hard', variant: 'match', stem: 'Can you find the hexagon? Tap it.', prompt: null, choices: [shapeChoice('hexagon', true), shapeChoice('circle'), shapeChoice('square')], solution: 'Yes! A hexagon has six sides. Great!' },
    { slot: 8, difficulty: 'easy', variant: 'match', stem: 'Can you find the star? Tap it.', prompt: null, choices: [shapeChoice('star', true), shapeChoice('circle'), shapeChoice('square')], solution: "Yes! That's a star. Nice!" },
    { slot: 9, difficulty: 'easy', variant: 'match', stem: 'Can you find the heart? Tap it.', prompt: null, choices: [shapeChoice('heart', true), shapeChoice('square'), shapeChoice('triangle')], solution: "Yes! That's a heart. Great!" },
    { slot: 10, difficulty: 'medium', variant: 'match', stem: 'Can you find the circle? Tap it.', prompt: null, choices: [shapeChoice('circle', true), shapeChoice('triangle'), shapeChoice('star'), shapeChoice('heart')], solution: 'That round shape is the circle! Well done!' },
    { slot: 11, difficulty: 'medium', variant: 'match', stem: 'Can you find the square? Tap it.', prompt: null, choices: [shapeChoice('square', true), shapeChoice('triangle'), shapeChoice('star'), shapeChoice('heart')], solution: 'The square has four equal sides! Nice!' },
    { slot: 12, difficulty: 'medium', variant: 'match', stem: 'Can you find the triangle? Tap it.', prompt: null, choices: [shapeChoice('triangle', true), shapeChoice('circle'), shapeChoice('star'), shapeChoice('heart')], solution: 'The triangle has three corners! Great!' },
    { slot: 13, difficulty: 'medium', variant: 'match', stem: 'Can you find the rectangle? Tap it.', prompt: null, choices: [shapeChoice('rectangle', true), shapeChoice('triangle'), shapeChoice('star'), shapeChoice('circle')], solution: "That's the rectangle! Well done!" },
    { slot: 14, difficulty: 'medium', variant: 'match', stem: 'Can you find the oval? Tap it.', prompt: null, choices: [shapeChoice('oval', true), shapeChoice('triangle'), shapeChoice('star'), shapeChoice('square')], solution: "That's the oval! Nice!" },
    { slot: 15, difficulty: 'medium', variant: 'match', stem: 'Can you find the diamond? Tap it.', prompt: null, choices: [shapeChoice('diamond', true), shapeChoice('circle'), shapeChoice('star'), shapeChoice('heart')], solution: "That's the diamond! Great!" },
    { slot: 16, difficulty: 'hard', variant: 'match', stem: 'Can you find the hexagon? Tap it.', prompt: null, choices: [shapeChoice('hexagon', true), shapeChoice('circle'), shapeChoice('triangle'), shapeChoice('heart')], solution: 'The hexagon has six sides! Well done!' },
    { slot: 17, difficulty: 'easy', variant: 'match', stem: 'Can you find the star? Tap it.', prompt: null, choices: [shapeChoice('star', true), shapeChoice('heart'), shapeChoice('circle'), shapeChoice('square')], solution: "That's the star! Nice!" },
    { slot: 18, difficulty: 'easy', variant: 'match', stem: 'Can you find the heart? Tap it.', prompt: null, choices: [shapeChoice('heart', true), shapeChoice('star'), shapeChoice('circle'), shapeChoice('triangle')], solution: "That's the heart! Great!" },
    { slot: 19, difficulty: 'medium', variant: 'match', stem: 'Can you find the triangle? Tap it.', prompt: null, choices: [shapeChoice('triangle', true), shapeChoice('rectangle'), shapeChoice('circle'), shapeChoice('star')], solution: 'The triangle has three sides! Well done!' },
    { slot: 20, difficulty: 'easy', variant: 'match', stem: 'Can you find the square? Tap it.', prompt: null, choices: [shapeChoice('square', true), shapeChoice('circle'), shapeChoice('heart'), shapeChoice('star')], solution: "That's the square! Nice!" },
    // Descriptive prompts (still tap the matching shape).
    { slot: 21, difficulty: 'easy', variant: 'match', stem: 'Tap the round shape.', prompt: null, choices: [shapeChoice('circle', true), shapeChoice('square'), shapeChoice('triangle')], solution: 'A circle is perfectly round! Great!' },
    { slot: 22, difficulty: 'medium', variant: 'match', stem: 'Tap the shape with three corners.', prompt: null, choices: [shapeChoice('triangle', true), shapeChoice('circle'), shapeChoice('square')], solution: 'A triangle has three corners! Well done!' },
    { slot: 23, difficulty: 'hard', variant: 'match', stem: 'Tap the shape with six sides.', prompt: null, choices: [shapeChoice('hexagon', true), shapeChoice('circle'), shapeChoice('square')], solution: 'A hexagon has six sides! Nice counting!' },
    { slot: 24, difficulty: 'medium', variant: 'match', stem: 'Tap the shape that looks like a long box.', prompt: null, choices: [shapeChoice('rectangle', true), shapeChoice('circle'), shapeChoice('triangle')], solution: 'A rectangle is like a long box! Great!' },
    { slot: 25, difficulty: 'medium', variant: 'match', stem: 'Tap the shape that is stretched like an egg.', prompt: null, choices: [shapeChoice('oval', true), shapeChoice('square'), shapeChoice('triangle')], solution: 'An oval is like a stretched circle! Nice!' },
    { slot: 26, difficulty: 'easy', variant: 'match', stem: 'Can you find the heart? Tap it.', prompt: null, choices: [shapeChoice('heart', true), shapeChoice('star'), shapeChoice('circle')], solution: "That's the heart! Well done!" },
  ],
}

// ============================================================================
// Kindergarten — Comparing Numbers (CCSS K.CC.C.6/7): compare groups (more/fewer)
// and written numerals (bigger/smaller). Nikki reads it aloud; the child taps the
// group or number. `variant: 'match'` — differences are meant to be CLEAR (not
// off-by-one), so there is no closeness rule. 26 items.
// ============================================================================

const COMPARING_NUMBERS_K: PreReaderSkill = {
  slug: 'comparing-numbers', name: 'Comparing Numbers', subject: 'math',
  ccssGrade: 'K', ccssGradeNum: 0, ccssCode: 'CCSS.MATH.CONTENT.K.CC.C.6',
  satAlignment: 'problem-solving-data-analysis', gradeBand: 'k-2',
  domainKey: 'dom-math-cc', domainName: 'Counting & Cardinality', parentSubjectKey: 'subj-math',
  renderMode: 'audio_picture',
  items: [
    // --- Compare groups: more / fewer (K.CC.C.6) ---
    { slot: 1, difficulty: 'easy', variant: 'match', stem: 'Which group has more? Tap the group with more.', prompt: null, choices: [grpChoice('apple', 5, true), grpChoice('apple', 2)], solution: 'This group has 5 and this one has 2. Five is more! Great looking!' },
    { slot: 2, difficulty: 'easy', variant: 'match', stem: 'Which group has more? Tap the group with more.', prompt: null, choices: [grpChoice('star', 6, true), grpChoice('star', 3)], solution: 'Six is more than three! Nice!' },
    { slot: 3, difficulty: 'easy', variant: 'match', stem: 'Which group has fewer? Tap the group with fewer.', prompt: null, choices: [grpChoice('ball', 2, true), grpChoice('ball', 7)], solution: 'Two is fewer than seven! Well done!' },
    { slot: 4, difficulty: 'easy', variant: 'match', stem: 'Which group has more? Tap the group with more.', prompt: null, choices: [grpChoice('duck', 4, true), grpChoice('duck', 1)], solution: 'Four is more than one! Great!' },
    { slot: 5, difficulty: 'medium', variant: 'match', stem: 'Which group has fewer? Tap the group with fewer.', prompt: null, choices: [grpChoice('fish', 3, true), grpChoice('fish', 8)], solution: 'Three is fewer than eight! Nice!' },
    { slot: 6, difficulty: 'medium', variant: 'match', stem: 'Which group has more? Tap the group with more.', prompt: null, choices: [grpChoice('cat', 8, true), grpChoice('cat', 5)], solution: 'Eight is more than five! Well done!' },
    { slot: 7, difficulty: 'medium', variant: 'match', stem: 'Which group has fewer? Tap the group with fewer.', prompt: null, choices: [grpChoice('hat', 2, true), grpChoice('hat', 6)], solution: 'Two is fewer than six! Great!' },
    { slot: 8, difficulty: 'medium', variant: 'match', stem: 'Which group has more? Tap the group with more.', prompt: null, choices: [grpChoice('flower', 7, true), grpChoice('flower', 4)], solution: 'Seven is more than four! Nice!' },
    { slot: 9, difficulty: 'medium', variant: 'match', stem: 'Which group has more? Tap the group with more.', prompt: null, choices: [grpChoice('sun', 6, true), grpChoice('sun', 3)], solution: 'Six is more than three! Well done!' },
    { slot: 10, difficulty: 'easy', variant: 'match', stem: 'Which group has fewer? Tap the group with fewer.', prompt: null, choices: [grpChoice('tree', 1, true), grpChoice('tree', 5)], solution: 'One is the fewest! Great!' },
    { slot: 11, difficulty: 'medium', variant: 'match', stem: 'Which group has more? Tap the group with more.', prompt: null, choices: [grpChoice('pig', 9, true), grpChoice('pig', 6)], solution: 'Nine is more than six! Nice!' },
    { slot: 12, difficulty: 'medium', variant: 'match', stem: 'Which group has fewer? Tap the group with fewer.', prompt: null, choices: [grpChoice('ring', 4, true), grpChoice('ring', 9)], solution: 'Four is fewer than nine! Well done!' },
    { slot: 13, difficulty: 'hard', variant: 'match', stem: 'Which group has the most? Tap it.', prompt: null, choices: [grpChoice('apple', 8, true), grpChoice('apple', 5), grpChoice('apple', 2)], solution: 'Eight is the most! Great counting!' },
    // --- Compare numerals: bigger / smaller (K.CC.C.7) ---
    { slot: 14, difficulty: 'easy', variant: 'match', stem: 'Which number is bigger? Tap it.', prompt: null, choices: [numChoice(7, true), numChoice(3)], solution: '7 is bigger than 3! Nice!' },
    { slot: 15, difficulty: 'easy', variant: 'match', stem: 'Which number is bigger? Tap it.', prompt: null, choices: [numChoice(9, true), numChoice(5)], solution: '9 is bigger than 5! Great!' },
    { slot: 16, difficulty: 'easy', variant: 'match', stem: 'Which number is smaller? Tap it.', prompt: null, choices: [numChoice(2, true), numChoice(8)], solution: '2 is smaller than 8! Well done!' },
    { slot: 17, difficulty: 'medium', variant: 'match', stem: 'Which number is bigger? Tap it.', prompt: null, choices: [numChoice(6, true), numChoice(4)], solution: '6 is bigger than 4! Nice!' },
    { slot: 18, difficulty: 'medium', variant: 'match', stem: 'Which number is smaller? Tap it.', prompt: null, choices: [numChoice(3, true), numChoice(7)], solution: '3 is smaller than 7! Great!' },
    { slot: 19, difficulty: 'medium', variant: 'match', stem: 'Which number is bigger? Tap it.', prompt: null, choices: [numChoice(10, true), numChoice(6)], solution: '10 is bigger than 6! Well done!' },
    { slot: 20, difficulty: 'easy', variant: 'match', stem: 'Which number is smaller? Tap it.', prompt: null, choices: [numChoice(1, true), numChoice(5)], solution: '1 is the smallest! Nice!' },
    { slot: 21, difficulty: 'medium', variant: 'match', stem: 'Which number is bigger? Tap it.', prompt: null, choices: [numChoice(8, true), numChoice(5)], solution: '8 is bigger than 5! Great!' },
    { slot: 22, difficulty: 'medium', variant: 'match', stem: 'Which number is smaller? Tap it.', prompt: null, choices: [numChoice(4, true), numChoice(9)], solution: '4 is smaller than 9! Well done!' },
    { slot: 23, difficulty: 'easy', variant: 'match', stem: 'Which number is bigger? Tap it.', prompt: null, choices: [numChoice(9, true), numChoice(2)], solution: '9 is bigger than 2! Nice!' },
    { slot: 24, difficulty: 'hard', variant: 'match', stem: 'Which number is the biggest? Tap it.', prompt: null, choices: [numChoice(9, true), numChoice(6), numChoice(3)], solution: '9 is the biggest! Great!' },
    { slot: 25, difficulty: 'medium', variant: 'match', stem: 'Which number is smaller? Tap it.', prompt: null, choices: [numChoice(6, true), numChoice(10)], solution: '6 is smaller than 10! Well done!' },
    { slot: 26, difficulty: 'medium', variant: 'match', stem: 'Which number is bigger? Tap it.', prompt: null, choices: [numChoice(7, true), numChoice(5)], solution: '7 is bigger than 5! Nice!' },
  ],
}

// ============================================================================
// GRADE 1
// ============================================================================

// Addition within 20 (CCSS 1.OA.C.6): audio arithmetic, tap the number. Some
// items show the first group as a picture prompt. Distractors are near-misses
// (off-by 1..3) — the default (counting) variant.
const ADDITION_WITHIN_20_G1: PreReaderSkill = {
  slug: 'addition-within-20', name: 'Addition within 20', subject: 'math',
  ccssGrade: '1', ccssGradeNum: 1, ccssCode: 'CCSS.MATH.CONTENT.1.OA.C.6',
  satAlignment: 'problem-solving-data-analysis', gradeBand: 'k-2',
  domainKey: 'dom-math-oa', domainName: 'Operations & Algebraic Thinking', parentSubjectKey: 'subj-math',
  renderMode: 'audio_picture',
  items: [
    { slot: 1, difficulty: 'easy', stem: 'Here are 2 apples. Add 1 more. How many in all? Tap the answer.', prompt: { kind: 'object_group', image: 'apple', count: 2 }, choices: [numChoice(3, true), numChoice(2), numChoice(4)], solution: '2 and 1 more is 3! Nice adding!' },
    { slot: 2, difficulty: 'easy', stem: 'What is 3 plus 2? Tap the answer.', prompt: null, choices: [numChoice(5, true), numChoice(4), numChoice(6)], solution: '3 plus 2 is 5! Great!' },
    { slot: 3, difficulty: 'easy', stem: 'Here are 4 stars. Add 3 more. How many in all? Tap the answer.', prompt: { kind: 'object_group', image: 'star', count: 4 }, choices: [numChoice(7, true), numChoice(6), numChoice(8), numChoice(5)], solution: '4 and 3 more is 7! Nice counting on!' },
    { slot: 4, difficulty: 'easy', stem: 'What is 5 plus 2? Tap the answer.', prompt: null, choices: [numChoice(7, true), numChoice(6), numChoice(8)], solution: '5 plus 2 is 7! Well done!' },
    { slot: 5, difficulty: 'easy', stem: 'Here are 3 balls. Add 3 more. How many in all? Tap the answer.', prompt: { kind: 'object_group', image: 'ball', count: 3 }, choices: [numChoice(6, true), numChoice(5), numChoice(7), numChoice(4)], solution: '3 and 3 more is 6! Great!' },
    { slot: 6, difficulty: 'medium', stem: 'What is 6 plus 2? Tap the answer.', prompt: null, choices: [numChoice(8, true), numChoice(7), numChoice(9), numChoice(6)], solution: '6 plus 2 is 8! Nice!' },
    { slot: 7, difficulty: 'medium', stem: 'What is 4 plus 4? Tap the answer.', prompt: null, choices: [numChoice(8, true), numChoice(7), numChoice(9), numChoice(10)], solution: '4 plus 4 is 8! Well done!' },
    { slot: 8, difficulty: 'medium', stem: 'What is 5 plus 5? Tap the answer.', prompt: null, choices: [numChoice(10, true), numChoice(9), numChoice(11), numChoice(8)], solution: '5 plus 5 is 10! Great!' },
    { slot: 9, difficulty: 'medium', stem: 'What is 7 plus 2? Tap the answer.', prompt: null, choices: [numChoice(9, true), numChoice(8), numChoice(10), numChoice(7)], solution: '7 plus 2 is 9! Nice!' },
    { slot: 10, difficulty: 'medium', stem: 'What is 6 plus 3? Tap the answer.', prompt: null, choices: [numChoice(9, true), numChoice(8), numChoice(10), numChoice(7)], solution: '6 plus 3 is 9! Well done!' },
    { slot: 11, difficulty: 'medium', stem: 'What is 8 plus 2? Tap the answer.', prompt: null, choices: [numChoice(10, true), numChoice(9), numChoice(11), numChoice(12)], solution: '8 plus 2 is 10! Great!' },
    { slot: 12, difficulty: 'medium', stem: 'What is 5 plus 4? Tap the answer.', prompt: null, choices: [numChoice(9, true), numChoice(8), numChoice(10), numChoice(7)], solution: '5 plus 4 is 9! Nice!' },
    { slot: 13, difficulty: 'medium', stem: 'What is 7 plus 3? Tap the answer.', prompt: null, choices: [numChoice(10, true), numChoice(9), numChoice(11), numChoice(8)], solution: '7 plus 3 is 10! Well done!' },
    { slot: 14, difficulty: 'medium', stem: 'What is 8 plus 4? Tap the answer.', prompt: null, choices: [numChoice(12, true), numChoice(11), numChoice(13), numChoice(10)], solution: '8 plus 4 is 12! Great!' },
    { slot: 15, difficulty: 'medium', stem: 'What is 9 plus 3? Tap the answer.', prompt: null, choices: [numChoice(12, true), numChoice(11), numChoice(13), numChoice(10)], solution: '9 plus 3 is 12! Nice!' },
    { slot: 16, difficulty: 'medium', stem: 'What is 7 plus 5? Tap the answer.', prompt: null, choices: [numChoice(12, true), numChoice(11), numChoice(13), numChoice(14)], solution: '7 plus 5 is 12! Well done!' },
    { slot: 17, difficulty: 'medium', stem: 'What is 6 plus 6? Tap the answer.', prompt: null, choices: [numChoice(12, true), numChoice(11), numChoice(13), numChoice(10)], solution: '6 plus 6 is 12! Great!' },
    { slot: 18, difficulty: 'hard', stem: 'What is 8 plus 5? Tap the answer.', prompt: null, choices: [numChoice(13, true), numChoice(12), numChoice(14), numChoice(11)], solution: '8 plus 5 is 13! Nice adding!' },
    { slot: 19, difficulty: 'hard', stem: 'What is 9 plus 4? Tap the answer.', prompt: null, choices: [numChoice(13, true), numChoice(12), numChoice(14), numChoice(11)], solution: '9 plus 4 is 13! Well done!' },
    { slot: 20, difficulty: 'hard', stem: 'What is 7 plus 7? Tap the answer.', prompt: null, choices: [numChoice(14, true), numChoice(13), numChoice(15), numChoice(12)], solution: '7 plus 7 is 14! Great!' },
    { slot: 21, difficulty: 'hard', stem: 'What is 8 plus 6? Tap the answer.', prompt: null, choices: [numChoice(14, true), numChoice(13), numChoice(15), numChoice(12)], solution: '8 plus 6 is 14! Nice!' },
    { slot: 22, difficulty: 'hard', stem: 'What is 9 plus 6? Tap the answer.', prompt: null, choices: [numChoice(15, true), numChoice(14), numChoice(16), numChoice(13)], solution: '9 plus 6 is 15! Well done!' },
    { slot: 23, difficulty: 'hard', stem: 'What is 8 plus 8? Tap the answer.', prompt: null, choices: [numChoice(16, true), numChoice(15), numChoice(17), numChoice(14)], solution: '8 plus 8 is 16! Great!' },
    { slot: 24, difficulty: 'hard', stem: 'What is 9 plus 7? Tap the answer.', prompt: null, choices: [numChoice(16, true), numChoice(15), numChoice(17), numChoice(14)], solution: '9 plus 7 is 16! Nice!' },
    { slot: 25, difficulty: 'hard', stem: 'What is 9 plus 8? Tap the answer.', prompt: null, choices: [numChoice(17, true), numChoice(16), numChoice(18), numChoice(15)], solution: '9 plus 8 is 17! Well done!' },
    { slot: 26, difficulty: 'hard', stem: 'What is 9 plus 9? Tap the answer.', prompt: null, choices: [numChoice(18, true), numChoice(17), numChoice(19), numChoice(16)], solution: '9 plus 9 is 18! Great adding!' },
  ],
}

// Subtraction within 20 (CCSS 1.OA.C.6): audio arithmetic, tap the number.
const SUBTRACTION_WITHIN_20_G1: PreReaderSkill = {
  slug: 'subtraction-within-20', name: 'Subtraction within 20', subject: 'math',
  ccssGrade: '1', ccssGradeNum: 1, ccssCode: 'CCSS.MATH.CONTENT.1.OA.C.6',
  satAlignment: 'problem-solving-data-analysis', gradeBand: 'k-2',
  domainKey: 'dom-math-oa', domainName: 'Operations & Algebraic Thinking', parentSubjectKey: 'subj-math',
  renderMode: 'audio_picture',
  items: [
    { slot: 1, difficulty: 'easy', stem: 'Here are 5 apples. Take away 2. How many are left? Tap the answer.', prompt: { kind: 'object_group', image: 'apple', count: 5 }, choices: [numChoice(3, true), numChoice(2), numChoice(4)], solution: '5 take away 2 is 3! Nice!' },
    { slot: 2, difficulty: 'easy', stem: 'What is 4 minus 1? Tap the answer.', prompt: null, choices: [numChoice(3, true), numChoice(2), numChoice(4), numChoice(5)], solution: '4 minus 1 is 3! Great!' },
    { slot: 3, difficulty: 'easy', stem: 'Here are 6 balls. Take away 2. How many are left? Tap the answer.', prompt: { kind: 'object_group', image: 'ball', count: 6 }, choices: [numChoice(4, true), numChoice(3), numChoice(5), numChoice(6)], solution: '6 take away 2 is 4! Well done!' },
    { slot: 4, difficulty: 'easy', stem: 'What is 5 minus 1? Tap the answer.', prompt: null, choices: [numChoice(4, true), numChoice(3), numChoice(5)], solution: '5 minus 1 is 4! Nice!' },
    { slot: 5, difficulty: 'easy', stem: 'What is 3 minus 1? Tap the answer.', prompt: null, choices: [numChoice(2, true), numChoice(1), numChoice(3)], solution: '3 minus 1 is 2! Great!' },
    { slot: 6, difficulty: 'medium', stem: 'What is 7 minus 3? Tap the answer.', prompt: null, choices: [numChoice(4, true), numChoice(3), numChoice(5), numChoice(6)], solution: '7 minus 3 is 4! Well done!' },
    { slot: 7, difficulty: 'medium', stem: 'What is 8 minus 2? Tap the answer.', prompt: null, choices: [numChoice(6, true), numChoice(5), numChoice(7), numChoice(4)], solution: '8 minus 2 is 6! Nice!' },
    { slot: 8, difficulty: 'medium', stem: 'What is 6 minus 3? Tap the answer.', prompt: null, choices: [numChoice(3, true), numChoice(2), numChoice(4), numChoice(5)], solution: '6 minus 3 is 3! Great!' },
    { slot: 9, difficulty: 'medium', stem: 'What is 9 minus 4? Tap the answer.', prompt: null, choices: [numChoice(5, true), numChoice(4), numChoice(6), numChoice(7)], solution: '9 minus 4 is 5! Well done!' },
    { slot: 10, difficulty: 'medium', stem: 'What is 7 minus 2? Tap the answer.', prompt: null, choices: [numChoice(5, true), numChoice(4), numChoice(6), numChoice(3)], solution: '7 minus 2 is 5! Nice!' },
    { slot: 11, difficulty: 'medium', stem: 'What is 10 minus 4? Tap the answer.', prompt: null, choices: [numChoice(6, true), numChoice(5), numChoice(7), numChoice(8)], solution: '10 minus 4 is 6! Great!' },
    { slot: 12, difficulty: 'medium', stem: 'What is 8 minus 5? Tap the answer.', prompt: null, choices: [numChoice(3, true), numChoice(2), numChoice(4), numChoice(5)], solution: '8 minus 5 is 3! Well done!' },
    { slot: 13, difficulty: 'medium', stem: 'What is 9 minus 3? Tap the answer.', prompt: null, choices: [numChoice(6, true), numChoice(5), numChoice(7), numChoice(4)], solution: '9 minus 3 is 6! Nice!' },
    { slot: 14, difficulty: 'medium', stem: 'What is 10 minus 3? Tap the answer.', prompt: null, choices: [numChoice(7, true), numChoice(6), numChoice(8), numChoice(9)], solution: '10 minus 3 is 7! Great!' },
    { slot: 15, difficulty: 'hard', stem: 'What is 12 minus 4? Tap the answer.', prompt: null, choices: [numChoice(8, true), numChoice(7), numChoice(9), numChoice(10)], solution: '12 minus 4 is 8! Well done!' },
    { slot: 16, difficulty: 'hard', stem: 'What is 11 minus 5? Tap the answer.', prompt: null, choices: [numChoice(6, true), numChoice(5), numChoice(7), numChoice(8)], solution: '11 minus 5 is 6! Nice!' },
    { slot: 17, difficulty: 'hard', stem: 'What is 13 minus 4? Tap the answer.', prompt: null, choices: [numChoice(9, true), numChoice(8), numChoice(10), numChoice(7)], solution: '13 minus 4 is 9! Great!' },
    { slot: 18, difficulty: 'hard', stem: 'What is 12 minus 5? Tap the answer.', prompt: null, choices: [numChoice(7, true), numChoice(6), numChoice(8), numChoice(9)], solution: '12 minus 5 is 7! Well done!' },
    { slot: 19, difficulty: 'hard', stem: 'What is 14 minus 6? Tap the answer.', prompt: null, choices: [numChoice(8, true), numChoice(7), numChoice(9), numChoice(10)], solution: '14 minus 6 is 8! Nice!' },
    { slot: 20, difficulty: 'hard', stem: 'What is 15 minus 7? Tap the answer.', prompt: null, choices: [numChoice(8, true), numChoice(7), numChoice(9), numChoice(6)], solution: '15 minus 7 is 8! Great!' },
    { slot: 21, difficulty: 'medium', stem: 'What is 11 minus 4? Tap the answer.', prompt: null, choices: [numChoice(7, true), numChoice(6), numChoice(8), numChoice(9)], solution: '11 minus 4 is 7! Well done!' },
    { slot: 22, difficulty: 'hard', stem: 'What is 13 minus 6? Tap the answer.', prompt: null, choices: [numChoice(7, true), numChoice(6), numChoice(8), numChoice(9)], solution: '13 minus 6 is 7! Nice!' },
    { slot: 23, difficulty: 'hard', stem: 'What is 16 minus 8? Tap the answer.', prompt: null, choices: [numChoice(8, true), numChoice(7), numChoice(9), numChoice(10)], solution: '16 minus 8 is 8! Great!' },
    { slot: 24, difficulty: 'medium', stem: 'What is 10 minus 6? Tap the answer.', prompt: null, choices: [numChoice(4, true), numChoice(3), numChoice(5), numChoice(6)], solution: '10 minus 6 is 4! Well done!' },
    { slot: 25, difficulty: 'hard', stem: 'What is 14 minus 5? Tap the answer.', prompt: null, choices: [numChoice(9, true), numChoice(8), numChoice(10), numChoice(7)], solution: '14 minus 5 is 9! Nice!' },
    { slot: 26, difficulty: 'hard', stem: 'What is 18 minus 9? Tap the answer.', prompt: null, choices: [numChoice(9, true), numChoice(8), numChoice(10), numChoice(7)], solution: '18 minus 9 is 9! Great subtracting!' },
  ],
}

// Place value to 100 (CCSS 1.NBT.B.2, with .A.1 / .C.5): tens & ones, ten more/
// less, and the counting sequence. Number tiles; `match` variant (distractors are
// place-value confusions like a digit swap, not off-by-one).
const PLACE_VALUE_TO_100_G1: PreReaderSkill = {
  slug: 'place-value-to-100', name: 'Place Value to 100', subject: 'math',
  ccssGrade: '1', ccssGradeNum: 1, ccssCode: 'CCSS.MATH.CONTENT.1.NBT.B.2',
  satAlignment: 'problem-solving-data-analysis', gradeBand: 'k-2',
  domainKey: 'dom-math-nbt', domainName: 'Number & Operations in Base Ten', parentSubjectKey: 'subj-math',
  renderMode: 'audio_picture',
  items: [
    { slot: 1, difficulty: 'easy', variant: 'match', stem: 'What number is 2 tens and 3 ones? Tap it.', prompt: null, choices: [numChoice(23, true), numChoice(32), numChoice(20), numChoice(25)], solution: '2 tens and 3 ones make 23! Nice!' },
    { slot: 2, difficulty: 'medium', variant: 'match', stem: 'What number is 3 tens and 4 ones? Tap it.', prompt: null, choices: [numChoice(34, true), numChoice(43), numChoice(30), numChoice(35)], solution: '3 tens and 4 ones make 34! Great!' },
    { slot: 3, difficulty: 'medium', variant: 'match', stem: 'What number is 4 tens and 1 one? Tap it.', prompt: null, choices: [numChoice(41, true), numChoice(14), numChoice(40), numChoice(44)], solution: '4 tens and 1 one make 41! Well done!' },
    { slot: 4, difficulty: 'medium', variant: 'match', stem: 'What number is 5 tens and 6 ones? Tap it.', prompt: null, choices: [numChoice(56, true), numChoice(65), numChoice(50), numChoice(55)], solution: '5 tens and 6 ones make 56! Nice!' },
    { slot: 5, difficulty: 'medium', variant: 'match', stem: 'What number is 1 ten and 7 ones? Tap it.', prompt: null, choices: [numChoice(17, true), numChoice(71), numChoice(10), numChoice(18)], solution: '1 ten and 7 ones make 17! Great!' },
    { slot: 6, difficulty: 'medium', variant: 'match', stem: 'What number is 6 tens and 0 ones? Tap it.', prompt: null, choices: [numChoice(60, true), numChoice(6), numChoice(16), numChoice(50)], solution: '6 tens and no ones make 60! Well done!' },
    { slot: 7, difficulty: 'medium', variant: 'match', stem: 'What number is 7 tens and 2 ones? Tap it.', prompt: null, choices: [numChoice(72, true), numChoice(27), numChoice(70), numChoice(73)], solution: '7 tens and 2 ones make 72! Nice!' },
    { slot: 8, difficulty: 'hard', variant: 'match', stem: 'What number is 8 tens and 5 ones? Tap it.', prompt: null, choices: [numChoice(85, true), numChoice(58), numChoice(80), numChoice(88)], solution: '8 tens and 5 ones make 85! Great!' },
    { slot: 9, difficulty: 'hard', variant: 'match', stem: 'What number is 9 tens and 9 ones? Tap it.', prompt: null, choices: [numChoice(99, true), numChoice(90), numChoice(89), numChoice(9)], solution: '9 tens and 9 ones make 99! Well done!' },
    { slot: 10, difficulty: 'easy', variant: 'match', stem: 'How many tens are in 30? Tap the number.', prompt: null, choices: [numChoice(3, true), numChoice(2), numChoice(4), numChoice(30)], solution: 'There are 3 tens in 30! Nice!' },
    { slot: 11, difficulty: 'easy', variant: 'match', stem: 'How many tens are in 50? Tap the number.', prompt: null, choices: [numChoice(5, true), numChoice(4), numChoice(6), numChoice(50)], solution: 'There are 5 tens in 50! Great!' },
    { slot: 12, difficulty: 'medium', variant: 'match', stem: 'How many tens are in 70? Tap the number.', prompt: null, choices: [numChoice(7, true), numChoice(6), numChoice(8), numChoice(70)], solution: 'There are 7 tens in 70! Well done!' },
    { slot: 13, difficulty: 'medium', variant: 'match', stem: 'How many tens are in 24? Tap the number.', prompt: null, choices: [numChoice(2, true), numChoice(4), numChoice(3), numChoice(24)], solution: '24 has 2 tens! Nice!' },
    { slot: 14, difficulty: 'medium', variant: 'match', stem: 'How many ones are in 46? Tap the number.', prompt: null, choices: [numChoice(6, true), numChoice(4), numChoice(7), numChoice(5)], solution: '46 has 6 ones! Great!' },
    { slot: 15, difficulty: 'medium', variant: 'match', stem: 'How many ones are in 38? Tap the number.', prompt: null, choices: [numChoice(8, true), numChoice(3), numChoice(9), numChoice(7)], solution: '38 has 8 ones! Well done!' },
    { slot: 16, difficulty: 'medium', variant: 'match', stem: 'How many ones are in 51? Tap the number.', prompt: null, choices: [numChoice(1, true), numChoice(5), numChoice(2), numChoice(0)], solution: '51 has 1 one! Nice!' },
    { slot: 17, difficulty: 'easy', variant: 'match', stem: 'What is 4 tens? Tap the number.', prompt: null, choices: [numChoice(40, true), numChoice(4), numChoice(14), numChoice(44)], solution: '4 tens is 40! Great!' },
    { slot: 18, difficulty: 'medium', variant: 'match', stem: 'What is 8 tens? Tap the number.', prompt: null, choices: [numChoice(80, true), numChoice(8), numChoice(18), numChoice(88)], solution: '8 tens is 80! Well done!' },
    { slot: 19, difficulty: 'medium', variant: 'match', stem: 'What is 10 more than 30? Tap the number.', prompt: null, choices: [numChoice(40, true), numChoice(20), numChoice(31), numChoice(50)], solution: '10 more than 30 is 40! Nice!' },
    { slot: 20, difficulty: 'medium', variant: 'match', stem: 'What is 10 more than 45? Tap the number.', prompt: null, choices: [numChoice(55, true), numChoice(35), numChoice(46), numChoice(44)], solution: '10 more than 45 is 55! Great!' },
    { slot: 21, difficulty: 'medium', variant: 'match', stem: 'What is 10 less than 60? Tap the number.', prompt: null, choices: [numChoice(50, true), numChoice(70), numChoice(59), numChoice(40)], solution: '10 less than 60 is 50! Well done!' },
    { slot: 22, difficulty: 'hard', variant: 'match', stem: 'What is 10 less than 28? Tap the number.', prompt: null, choices: [numChoice(18, true), numChoice(38), numChoice(27), numChoice(8)], solution: '10 less than 28 is 18! Nice!' },
    { slot: 23, difficulty: 'medium', variant: 'match', stem: 'What number comes right after 49? Tap it.', prompt: null, choices: [numChoice(50, true), numChoice(48), numChoice(40), numChoice(59)], solution: 'After 49 comes 50! Great!' },
    { slot: 24, difficulty: 'medium', variant: 'match', stem: 'What number comes right after 79? Tap it.', prompt: null, choices: [numChoice(80, true), numChoice(78), numChoice(70), numChoice(89)], solution: 'After 79 comes 80! Well done!' },
    { slot: 25, difficulty: 'medium', variant: 'match', stem: 'What number comes right before 30? Tap it.', prompt: null, choices: [numChoice(29, true), numChoice(31), numChoice(28), numChoice(20)], solution: 'Before 30 comes 29! Nice!' },
    { slot: 26, difficulty: 'hard', variant: 'match', stem: 'What number is 3 tens and 8 ones? Tap it.', prompt: null, choices: [numChoice(38, true), numChoice(83), numChoice(30), numChoice(28)], solution: '3 tens and 8 ones make 38! Great!' },
  ],
}

// Main Idea, Grade 1 (CCSS RI.1.2) — AUDIO-PASSAGE: Nikki reads a short original
// story aloud, then asks what it is mostly about; the child taps the picture.
// `match` variant (distractors are pictures NOT in the story). SHORT + concrete.
const MAIN_IDEA_G1: PreReaderSkill = {
  slug: 'main-idea-1', name: 'Main Idea (Grade 1)', subject: 'reading',
  ccssGrade: '1', ccssGradeNum: 1, ccssCode: 'CCSS.ELA-LITERACY.RI.1.2',
  satAlignment: 'information-and-ideas', gradeBand: 'k-2',
  domainKey: 'dom-reading-ri', domainName: 'Reading: Informational Text', parentSubjectKey: 'subj-reading',
  renderMode: 'audio_picture',
  items: [
    { slot: 1, difficulty: 'easy', variant: 'match', stem: 'Listen to the story. Meg has a red ball. She bounces it up and down all day. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('ball', true), picChoice('cat'), picChoice('tree')], solution: 'This story is all about the ball! Great listening!' },
    { slot: 2, difficulty: 'easy', variant: 'match', stem: 'Listen. A little duck swims in the pond. It says quack, quack. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('duck', true), picChoice('ball'), picChoice('sun')], solution: 'The story is all about the duck! Nice!' },
    { slot: 3, difficulty: 'easy', variant: 'match', stem: 'Listen. The sun is bright today. It makes the sky warm and yellow. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('sun', true), picChoice('fish'), picChoice('hat')], solution: 'The story is all about the sun! Well done!' },
    { slot: 4, difficulty: 'easy', variant: 'match', stem: 'Listen. Sam plants a tree. He gives it water so it can grow tall. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('tree', true), picChoice('ball'), picChoice('duck')], solution: 'The story is all about the tree! Great!' },
    { slot: 5, difficulty: 'easy', variant: 'match', stem: 'Listen. The cat naps on the mat. It is soft and warm. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('cat', true), picChoice('bus'), picChoice('star')], solution: 'The story is all about the cat! Nice!' },
    { slot: 6, difficulty: 'easy', variant: 'match', stem: 'Listen. A pig rolls in the mud. It is happy and messy. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('pig', true), picChoice('kite'), picChoice('moon')], solution: 'The story is all about the pig! Well done!' },
    { slot: 7, difficulty: 'medium', variant: 'match', stem: 'Listen. Ana flies a kite. It goes high up in the wind. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('kite', true), picChoice('apple'), picChoice('fish')], solution: 'The story is all about the kite! Great!' },
    { slot: 8, difficulty: 'medium', variant: 'match', stem: 'Listen. The fish swims in the tank. It blows tiny bubbles. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('fish', true), picChoice('tree'), picChoice('van')], solution: 'The story is all about the fish! Nice!' },
    { slot: 9, difficulty: 'medium', variant: 'match', stem: 'Listen. Ben gets a gift. He opens the box and smiles big. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('gift', true), picChoice('sun'), picChoice('duck')], solution: 'The story is all about the gift! Well done!' },
    { slot: 10, difficulty: 'medium', variant: 'match', stem: 'Listen. An apple grows on the tree. It turns red and sweet. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('apple', true), picChoice('ball'), picChoice('cat')], solution: 'The story is all about the apple! Great!' },
    { slot: 11, difficulty: 'medium', variant: 'match', stem: 'Listen. The bus takes the kids to school. It is big and yellow. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('bus', true), picChoice('pig'), picChoice('star')], solution: 'The story is all about the bus! Nice!' },
    { slot: 12, difficulty: 'medium', variant: 'match', stem: 'Listen. A flower opens in the garden. Bees come to say hello. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('flower', true), picChoice('sock'), picChoice('moon')], solution: 'The story is all about the flower! Well done!' },
    { slot: 13, difficulty: 'medium', variant: 'match', stem: 'Listen. The moon shines at night. It is round and white. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('moon', true), picChoice('ball'), picChoice('cat')], solution: 'The story is all about the moon! Great!' },
    { slot: 14, difficulty: 'medium', variant: 'match', stem: 'Listen. Tim wears his hat. It keeps the sun off his head. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('hat', true), picChoice('duck'), picChoice('tree')], solution: 'The story is all about the hat! Nice!' },
    { slot: 15, difficulty: 'medium', variant: 'match', stem: 'Listen. A van drives down the road. It carries lots of boxes. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('van', true), picChoice('fish'), picChoice('sun')], solution: 'The story is all about the van! Well done!' },
    { slot: 16, difficulty: 'medium', variant: 'match', stem: 'Listen. The star twinkles in the dark sky. It is far, far away. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('star', true), picChoice('pig'), picChoice('kite')], solution: 'The story is all about the star! Great!' },
    { slot: 17, difficulty: 'hard', variant: 'match', stem: 'Listen. Lily builds a house with blocks. It has a door and a roof. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('house', true), picChoice('ball'), picChoice('fish')], solution: 'The story is all about the house! Nice!' },
    { slot: 18, difficulty: 'hard', variant: 'match', stem: 'Listen. A ring sparkles on Mom’s hand. It is shiny and gold. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('ring', true), picChoice('bus'), picChoice('apple')], solution: 'The story is all about the ring! Well done!' },
    { slot: 19, difficulty: 'hard', variant: 'match', stem: 'Listen. A leaf falls from the tree. It floats down to the ground. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('leaf', true), picChoice('ball'), picChoice('duck')], solution: 'The story is all about the leaf! Great!' },
    { slot: 20, difficulty: 'hard', variant: 'match', stem: 'Listen. A sock is missing! Ravi looks under the bed for it. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('sock', true), picChoice('fish'), picChoice('sun')], solution: 'The story is all about the sock! Nice!' },
    { slot: 21, difficulty: 'medium', variant: 'match', stem: 'Listen. The mug is full of warm milk. It keeps Nia cozy. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('mug', true), picChoice('ball'), picChoice('tree')], solution: 'The story is all about the mug! Well done!' },
    { slot: 22, difficulty: 'hard', variant: 'match', stem: 'Listen. A tent stands in the yard. The kids camp inside it. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('tent', true), picChoice('duck'), picChoice('apple')], solution: 'The story is all about the tent! Great!' },
    { slot: 23, difficulty: 'hard', variant: 'match', stem: 'Listen. The key opens the little box. Inside is a surprise! What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('key', true), picChoice('pig'), picChoice('sun')], solution: 'The story is all about the key! Nice!' },
    { slot: 24, difficulty: 'hard', variant: 'match', stem: 'Listen. A jet flies across the sky. It leaves a long white trail. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('jet', true), picChoice('cat'), picChoice('ball')], solution: 'The story is all about the jet! Well done!' },
    { slot: 25, difficulty: 'medium', variant: 'match', stem: 'Listen. A pot of soup cooks on the stove. It smells so good. What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('pot', true), picChoice('star'), picChoice('duck')], solution: 'The story is all about the pot! Great!' },
    { slot: 26, difficulty: 'medium', variant: 'match', stem: 'Listen. The yo-yo goes down and up on its string. Round and round! What is the story mostly about? Tap the picture.', prompt: null, choices: [picChoice('yoyo', true), picChoice('fish'), picChoice('tree')], solution: 'The story is all about the yo-yo! Nice!' },
  ],
}

// ============================================================================
// GRADE 2
// ============================================================================

// Addition within 100 (CCSS 2.NBT.B.5): two-digit audio arithmetic, tap the
// number. `match` variant — distractors are plausible errors (a place slip of 10,
// or a regrouping miss), so no off-by-one closeness rule.
const ADDITION_WITHIN_100_G2: PreReaderSkill = {
  slug: 'addition-within-100', name: 'Addition within 100', subject: 'math',
  ccssGrade: '2', ccssGradeNum: 2, ccssCode: 'CCSS.MATH.CONTENT.2.NBT.B.5',
  satAlignment: 'problem-solving-data-analysis', gradeBand: 'k-2',
  domainKey: 'dom-math-nbt', domainName: 'Number & Operations in Base Ten', parentSubjectKey: 'subj-math',
  renderMode: 'audio_picture',
  items: [
    { slot: 1, difficulty: 'easy', variant: 'match', stem: 'What is 24 plus 13? Tap the answer.', prompt: null, choices: [numChoice(37, true), numChoice(36), numChoice(47), numChoice(27)], solution: '24 plus 13 is 37! Nice adding!' },
    { slot: 2, difficulty: 'easy', variant: 'match', stem: 'What is 31 plus 25? Tap the answer.', prompt: null, choices: [numChoice(56, true), numChoice(55), numChoice(66), numChoice(46)], solution: '31 plus 25 is 56! Great!' },
    { slot: 3, difficulty: 'easy', variant: 'match', stem: 'What is 42 plus 16? Tap the answer.', prompt: null, choices: [numChoice(58, true), numChoice(57), numChoice(68), numChoice(48)], solution: '42 plus 16 is 58! Well done!' },
    { slot: 4, difficulty: 'easy', variant: 'match', stem: 'What is 53 plus 24? Tap the answer.', prompt: null, choices: [numChoice(77, true), numChoice(76), numChoice(87), numChoice(67)], solution: '53 plus 24 is 77! Nice!' },
    { slot: 5, difficulty: 'easy', variant: 'match', stem: 'What is 20 plus 30? Tap the answer.', prompt: null, choices: [numChoice(50, true), numChoice(40), numChoice(60), numChoice(51)], solution: '20 plus 30 is 50! Great!' },
    { slot: 6, difficulty: 'easy', variant: 'match', stem: 'What is 45 plus 14? Tap the answer.', prompt: null, choices: [numChoice(59, true), numChoice(58), numChoice(69), numChoice(49)], solution: '45 plus 14 is 59! Well done!' },
    { slot: 7, difficulty: 'medium', variant: 'match', stem: 'What is 27 plus 12? Tap the answer.', prompt: null, choices: [numChoice(39, true), numChoice(38), numChoice(49), numChoice(29)], solution: '27 plus 12 is 39! Nice!' },
    { slot: 8, difficulty: 'medium', variant: 'match', stem: 'What is 34 plus 23? Tap the answer.', prompt: null, choices: [numChoice(57, true), numChoice(56), numChoice(67), numChoice(47)], solution: '34 plus 23 is 57! Great!' },
    { slot: 9, difficulty: 'medium', variant: 'match', stem: 'What is 16 plus 22? Tap the answer.', prompt: null, choices: [numChoice(38, true), numChoice(37), numChoice(48), numChoice(28)], solution: '16 plus 22 is 38! Well done!' },
    { slot: 10, difficulty: 'medium', variant: 'match', stem: 'What is 50 plus 25? Tap the answer.', prompt: null, choices: [numChoice(75, true), numChoice(74), numChoice(85), numChoice(65)], solution: '50 plus 25 is 75! Nice!' },
    { slot: 11, difficulty: 'medium', variant: 'match', stem: 'What is 25 plus 25? Tap the answer.', prompt: null, choices: [numChoice(50, true), numChoice(49), numChoice(60), numChoice(40)], solution: '25 plus 25 is 50! Great!' },
    { slot: 12, difficulty: 'medium', variant: 'match', stem: 'What is 33 plus 33? Tap the answer.', prompt: null, choices: [numChoice(66, true), numChoice(65), numChoice(76), numChoice(56)], solution: '33 plus 33 is 66! Well done!' },
    { slot: 13, difficulty: 'medium', variant: 'match', stem: 'What is 40 plus 40? Tap the answer.', prompt: null, choices: [numChoice(80, true), numChoice(70), numChoice(90), numChoice(81)], solution: '40 plus 40 is 80! Nice!' },
    { slot: 14, difficulty: 'hard', variant: 'match', stem: 'What is 28 plus 15? Tap the answer.', prompt: null, choices: [numChoice(43, true), numChoice(33), numChoice(42), numChoice(44)], solution: '28 plus 15 is 43! Great regrouping!' },
    { slot: 15, difficulty: 'hard', variant: 'match', stem: 'What is 37 plus 18? Tap the answer.', prompt: null, choices: [numChoice(55, true), numChoice(45), numChoice(54), numChoice(56)], solution: '37 plus 18 is 55! Well done!' },
    { slot: 16, difficulty: 'hard', variant: 'match', stem: 'What is 46 plus 27? Tap the answer.', prompt: null, choices: [numChoice(73, true), numChoice(63), numChoice(72), numChoice(74)], solution: '46 plus 27 is 73! Nice!' },
    { slot: 17, difficulty: 'hard', variant: 'match', stem: 'What is 29 plus 26? Tap the answer.', prompt: null, choices: [numChoice(55, true), numChoice(45), numChoice(54), numChoice(56)], solution: '29 plus 26 is 55! Great!' },
    { slot: 18, difficulty: 'hard', variant: 'match', stem: 'What is 58 plus 14? Tap the answer.', prompt: null, choices: [numChoice(72, true), numChoice(62), numChoice(71), numChoice(73)], solution: '58 plus 14 is 72! Well done!' },
    { slot: 19, difficulty: 'hard', variant: 'match', stem: 'What is 35 plus 29? Tap the answer.', prompt: null, choices: [numChoice(64, true), numChoice(54), numChoice(63), numChoice(65)], solution: '35 plus 29 is 64! Nice!' },
    { slot: 20, difficulty: 'hard', variant: 'match', stem: 'What is 47 plus 38? Tap the answer.', prompt: null, choices: [numChoice(85, true), numChoice(75), numChoice(84), numChoice(86)], solution: '47 plus 38 is 85! Great!' },
    { slot: 21, difficulty: 'hard', variant: 'match', stem: 'What is 26 plus 49? Tap the answer.', prompt: null, choices: [numChoice(75, true), numChoice(65), numChoice(74), numChoice(76)], solution: '26 plus 49 is 75! Well done!' },
    { slot: 22, difficulty: 'hard', variant: 'match', stem: 'What is 55 plus 27? Tap the answer.', prompt: null, choices: [numChoice(82, true), numChoice(72), numChoice(81), numChoice(83)], solution: '55 plus 27 is 82! Nice!' },
    { slot: 23, difficulty: 'hard', variant: 'match', stem: 'What is 39 plus 43? Tap the answer.', prompt: null, choices: [numChoice(82, true), numChoice(72), numChoice(81), numChoice(83)], solution: '39 plus 43 is 82! Great!' },
    { slot: 24, difficulty: 'hard', variant: 'match', stem: 'What is 64 plus 28? Tap the answer.', prompt: null, choices: [numChoice(92, true), numChoice(82), numChoice(91), numChoice(93)], solution: '64 plus 28 is 92! Well done!' },
    { slot: 25, difficulty: 'medium', variant: 'match', stem: 'What is 18 plus 18? Tap the answer.', prompt: null, choices: [numChoice(36, true), numChoice(26), numChoice(35), numChoice(37)], solution: '18 plus 18 is 36! Nice!' },
    { slot: 26, difficulty: 'medium', variant: 'match', stem: 'What is 60 plus 35? Tap the answer.', prompt: null, choices: [numChoice(95, true), numChoice(85), numChoice(94), numChoice(96)], solution: '60 plus 35 is 95! Great adding!' },
  ],
}

// Money & place value (CCSS 2.MD.C.8 with 2.NBT.A.1): coin values, counting
// coins, and building 3-digit numbers. Coin picture tiles + number tiles;
// `match` variant. Coins are drawn with colour, size, and a value label.
const MONEY_PLACE_VALUE_G2: PreReaderSkill = {
  slug: 'money-place-value', name: 'Money & Place Value', subject: 'math',
  ccssGrade: '2', ccssGradeNum: 2, ccssCode: 'CCSS.MATH.CONTENT.2.MD.C.8',
  satAlignment: 'problem-solving-data-analysis', gradeBand: 'k-2',
  domainKey: 'dom-math-md', domainName: 'Measurement & Data', parentSubjectKey: 'subj-math',
  renderMode: 'audio_picture',
  items: [
    { slot: 1, difficulty: 'easy', variant: 'match', stem: 'How many cents is a penny worth? Tap the number.', prompt: null, choices: [numChoice(1, true), numChoice(5), numChoice(10), numChoice(25)], solution: 'A penny is 1 cent! Nice!' },
    { slot: 2, difficulty: 'easy', variant: 'match', stem: 'How many cents is a nickel worth? Tap the number.', prompt: null, choices: [numChoice(5, true), numChoice(1), numChoice(10), numChoice(25)], solution: 'A nickel is 5 cents! Great!' },
    { slot: 3, difficulty: 'easy', variant: 'match', stem: 'How many cents is a dime worth? Tap the number.', prompt: null, choices: [numChoice(10, true), numChoice(1), numChoice(5), numChoice(25)], solution: 'A dime is 10 cents! Well done!' },
    { slot: 4, difficulty: 'easy', variant: 'match', stem: 'How many cents is a quarter worth? Tap the number.', prompt: null, choices: [numChoice(25, true), numChoice(1), numChoice(5), numChoice(10)], solution: 'A quarter is 25 cents! Nice!' },
    { slot: 5, difficulty: 'easy', variant: 'match', stem: 'Which coin is worth 10 cents? Tap it.', prompt: null, choices: [picChoice('dime', true), picChoice('penny'), picChoice('nickel')], solution: 'The dime is worth 10 cents! Great!' },
    { slot: 6, difficulty: 'easy', variant: 'match', stem: 'Which coin is worth 5 cents? Tap it.', prompt: null, choices: [picChoice('nickel', true), picChoice('penny'), picChoice('dime')], solution: 'The nickel is worth 5 cents! Well done!' },
    { slot: 7, difficulty: 'medium', variant: 'match', stem: 'Which coin is worth 25 cents? Tap it.', prompt: null, choices: [picChoice('quarter', true), picChoice('dime'), picChoice('nickel')], solution: 'The quarter is worth 25 cents! Nice!' },
    { slot: 8, difficulty: 'easy', variant: 'match', stem: 'Which coin is worth 1 cent? Tap it.', prompt: null, choices: [picChoice('penny', true), picChoice('nickel'), picChoice('dime')], solution: 'The penny is worth 1 cent! Great!' },
    { slot: 9, difficulty: 'medium', variant: 'match', stem: 'Here are 2 dimes. How many cents in all? Tap the number.', prompt: { kind: 'object_group', image: 'dime', count: 2 }, choices: [numChoice(20, true), numChoice(10), numChoice(25), numChoice(2)], solution: '2 dimes is 20 cents! Well done!' },
    { slot: 10, difficulty: 'medium', variant: 'match', stem: 'Here are 3 nickels. How many cents in all? Tap the number.', prompt: { kind: 'object_group', image: 'nickel', count: 3 }, choices: [numChoice(15, true), numChoice(10), numChoice(20), numChoice(3)], solution: '3 nickels is 15 cents! Nice!' },
    { slot: 11, difficulty: 'medium', variant: 'match', stem: 'Here are 2 nickels. How many cents in all? Tap the number.', prompt: { kind: 'object_group', image: 'nickel', count: 2 }, choices: [numChoice(10, true), numChoice(5), numChoice(15), numChoice(2)], solution: '2 nickels is 10 cents! Great!' },
    { slot: 12, difficulty: 'medium', variant: 'match', stem: 'Here are 4 pennies. How many cents in all? Tap the number.', prompt: { kind: 'object_group', image: 'penny', count: 4 }, choices: [numChoice(4, true), numChoice(3), numChoice(5), numChoice(40)], solution: '4 pennies is 4 cents! Well done!' },
    { slot: 13, difficulty: 'hard', variant: 'match', stem: 'Here are 2 quarters. How many cents in all? Tap the number.', prompt: { kind: 'object_group', image: 'quarter', count: 2 }, choices: [numChoice(50, true), numChoice(25), numChoice(75), numChoice(20)], solution: '2 quarters is 50 cents! Nice!' },
    { slot: 14, difficulty: 'hard', variant: 'match', stem: 'Here are 3 dimes. How many cents in all? Tap the number.', prompt: { kind: 'object_group', image: 'dime', count: 3 }, choices: [numChoice(30, true), numChoice(20), numChoice(40), numChoice(3)], solution: '3 dimes is 30 cents! Great counting!' },
    { slot: 15, difficulty: 'easy', variant: 'match', stem: 'Which coin is worth the most? Tap it.', prompt: null, choices: [picChoice('quarter', true), picChoice('dime'), picChoice('penny')], solution: 'The quarter is worth the most! Well done!' },
    { slot: 16, difficulty: 'easy', variant: 'match', stem: 'Which coin is worth the least? Tap it.', prompt: null, choices: [picChoice('penny', true), picChoice('quarter'), picChoice('dime')], solution: 'The penny is worth the least! Nice!' },
    // Place value to 1000 (2.NBT.A.1) — building 3-digit numbers.
    { slot: 17, difficulty: 'medium', variant: 'match', stem: 'What number is 1 hundred, 2 tens, and 3 ones? Tap it.', prompt: null, choices: [numChoice(123, true), numChoice(321), numChoice(132), numChoice(120)], solution: '1 hundred, 2 tens, 3 ones make 123! Great!' },
    { slot: 18, difficulty: 'hard', variant: 'match', stem: 'What number is 2 hundreds, 0 tens, and 5 ones? Tap it.', prompt: null, choices: [numChoice(205, true), numChoice(250), numChoice(25), numChoice(502)], solution: '2 hundreds and 5 ones make 205! Well done!' },
    { slot: 19, difficulty: 'hard', variant: 'match', stem: 'What number is 3 hundreds, 4 tens, and 0 ones? Tap it.', prompt: null, choices: [numChoice(340, true), numChoice(304), numChoice(34), numChoice(430)], solution: '3 hundreds and 4 tens make 340! Nice!' },
    { slot: 20, difficulty: 'medium', variant: 'match', stem: 'How many hundreds are in 500? Tap the number.', prompt: null, choices: [numChoice(5, true), numChoice(4), numChoice(6), numChoice(500)], solution: 'There are 5 hundreds in 500! Great!' },
    { slot: 21, difficulty: 'medium', variant: 'match', stem: 'What is 100 more than 300? Tap the number.', prompt: null, choices: [numChoice(400, true), numChoice(200), numChoice(301), numChoice(500)], solution: '100 more than 300 is 400! Well done!' },
    { slot: 22, difficulty: 'medium', variant: 'match', stem: 'What is 10 more than 240? Tap the number.', prompt: null, choices: [numChoice(250, true), numChoice(230), numChoice(241), numChoice(340)], solution: '10 more than 240 is 250! Nice!' },
    { slot: 23, difficulty: 'medium', variant: 'match', stem: 'Skip count by 5: 5, 10, 15, and then? Tap the next number.', prompt: null, choices: [numChoice(20, true), numChoice(16), numChoice(25), numChoice(30)], solution: 'After 15 comes 20! Great skip counting!' },
    { slot: 24, difficulty: 'medium', variant: 'match', stem: 'Skip count by 10: 10, 20, 30, and then? Tap the next number.', prompt: null, choices: [numChoice(40, true), numChoice(31), numChoice(35), numChoice(50)], solution: 'After 30 comes 40! Well done!' },
    { slot: 25, difficulty: 'easy', variant: 'match', stem: 'Skip count by 2: 2, 4, 6, and then? Tap the next number.', prompt: null, choices: [numChoice(8, true), numChoice(7), numChoice(10), numChoice(9)], solution: 'After 6 comes 8! Nice!' },
    { slot: 26, difficulty: 'hard', variant: 'match', stem: 'What number is 4 hundreds, 5 tens, and 6 ones? Tap it.', prompt: null, choices: [numChoice(456, true), numChoice(654), numChoice(465), numChoice(450)], solution: '4 hundreds, 5 tens, 6 ones make 456! Great!' },
  ],
}

// Reading Comprehension, Grade 2 (CCSS RI.2.1) — AUDIO-PASSAGE: Nikki reads a
// short original story aloud, then a who/what/where question; the child taps the
// picture. `match` variant (distractors are pictures NOT the answer).
const READING_COMPREHENSION_G2: PreReaderSkill = {
  slug: 'reading-comprehension-2', name: 'Reading Comprehension (Grade 2)', subject: 'reading',
  ccssGrade: '2', ccssGradeNum: 2, ccssCode: 'CCSS.ELA-LITERACY.RI.2.1',
  satAlignment: 'information-and-ideas', gradeBand: 'k-2',
  domainKey: 'dom-reading-ri', domainName: 'Reading: Informational Text', parentSubjectKey: 'subj-reading',
  renderMode: 'audio_picture',
  items: [
    { slot: 1, difficulty: 'easy', variant: 'match', stem: 'Listen. A cat and a duck went to the pond. The duck jumped in and swam. The cat sat by the water and watched. Who swam in the pond? Tap the picture.', prompt: null, choices: [picChoice('duck', true), picChoice('cat'), picChoice('pig')], solution: 'The duck swam in the pond! Great listening!' },
    { slot: 2, difficulty: 'easy', variant: 'match', stem: 'Listen. Ben had an apple and a ball. He ate the apple for a snack. Then he played with the ball. What did Ben eat? Tap the picture.', prompt: null, choices: [picChoice('apple', true), picChoice('ball'), picChoice('fish')], solution: 'Ben ate the apple! Nice!' },
    { slot: 3, difficulty: 'easy', variant: 'match', stem: 'Listen. The kids went to the park. They flew a kite up high. Then it rained, so they ran home. What did the kids fly? Tap the picture.', prompt: null, choices: [picChoice('kite', true), picChoice('ball'), picChoice('duck')], solution: 'The kids flew a kite! Well done!' },
    { slot: 4, difficulty: 'easy', variant: 'match', stem: 'Listen. Mom drove the van to the store. She bought a big pot for soup. At home she made dinner. What did Mom buy? Tap the picture.', prompt: null, choices: [picChoice('pot', true), picChoice('van'), picChoice('hat')], solution: 'Mom bought a pot! Nice!' },
    { slot: 5, difficulty: 'easy', variant: 'match', stem: 'Listen. A pig and a duck are friends. The pig likes the mud. The duck likes the water. Who likes the mud? Tap the picture.', prompt: null, choices: [picChoice('pig', true), picChoice('duck'), picChoice('cat')], solution: 'The pig likes the mud! Great!' },
    { slot: 6, difficulty: 'medium', variant: 'match', stem: 'Listen. Lin got a gift in a box. Inside was a soft hat. She put it on her head. What was inside the gift box? Tap the picture.', prompt: null, choices: [picChoice('hat', true), picChoice('gift'), picChoice('ball')], solution: 'A hat was inside! Well done!' },
    { slot: 7, difficulty: 'medium', variant: 'match', stem: 'Listen. The cat was cold. It found a warm house and went inside. It slept by the door. Where did the cat go? Tap the picture.', prompt: null, choices: [picChoice('house', true), picChoice('tree'), picChoice('bus')], solution: 'The cat went into the house! Nice!' },
    { slot: 8, difficulty: 'medium', variant: 'match', stem: 'Listen. A duck made a nest under the tree. It kept its eggs warm there. Where did the duck make its nest? Tap the picture.', prompt: null, choices: [picChoice('tree', true), picChoice('house'), picChoice('tent')], solution: 'Under the tree! Great!' },
    { slot: 9, difficulty: 'medium', variant: 'match', stem: 'Listen. The family went camping. They set up a tent in the woods. They slept inside it. Where did the family sleep? Tap the picture.', prompt: null, choices: [picChoice('tent', true), picChoice('house'), picChoice('van')], solution: 'They slept in the tent! Well done!' },
    { slot: 10, difficulty: 'medium', variant: 'match', stem: 'Listen. Sam has a red ball and a blue kite. On windy days he flies the kite. On sunny days he kicks the ball. What does Sam fly on windy days? Tap the picture.', prompt: null, choices: [picChoice('kite', true), picChoice('ball'), picChoice('sun')], solution: 'Sam flies the kite on windy days! Nice!' },
    { slot: 11, difficulty: 'medium', variant: 'match', stem: 'Listen. A cat chased a ball across the room. The ball rolled under the bed. What did the cat chase? Tap the picture.', prompt: null, choices: [picChoice('ball', true), picChoice('fish'), picChoice('duck')], solution: 'The cat chased the ball! Great!' },
    { slot: 12, difficulty: 'medium', variant: 'match', stem: 'Listen. Ana picked a flower and a leaf in the garden. She gave the flower to her mom. What did Ana give to her mom? Tap the picture.', prompt: null, choices: [picChoice('flower', true), picChoice('leaf'), picChoice('apple')], solution: 'Ana gave the flower! Well done!' },
    { slot: 13, difficulty: 'medium', variant: 'match', stem: 'Listen. It was dark out. Ravi looked up at the round, white moon in the sky. What did Ravi look at? Tap the picture.', prompt: null, choices: [picChoice('moon', true), picChoice('sun'), picChoice('ball')], solution: 'Ravi looked at the moon! Nice!' },
    { slot: 14, difficulty: 'medium', variant: 'match', stem: 'Listen. The bus was full of kids. It stopped at the school. The kids got off and went inside. What was full of kids? Tap the picture.', prompt: null, choices: [picChoice('bus', true), picChoice('van'), picChoice('house')], solution: 'The bus was full of kids! Great!' },
    { slot: 15, difficulty: 'hard', variant: 'match', stem: 'Listen. A pig sat in the sun. It got too hot, so it went to sit under a tree. Where did the pig go to cool off? Tap the picture.', prompt: null, choices: [picChoice('tree', true), picChoice('house'), picChoice('tent')], solution: 'The pig went under the tree! Well done!' },
    { slot: 16, difficulty: 'hard', variant: 'match', stem: 'Listen. Nia lost her sock. She looked in the box and under the mug. She found it in her shoe. What did Nia lose? Tap the picture.', prompt: null, choices: [picChoice('sock', true), picChoice('mug'), picChoice('hat')], solution: 'Nia lost her sock! Nice!' },
    { slot: 17, difficulty: 'hard', variant: 'match', stem: 'Listen. The key was tiny and gold. It opened the little door on the toy house. What did the key open? Tap the picture.', prompt: null, choices: [picChoice('door', true), picChoice('gift'), picChoice('tent')], solution: 'The key opened the door! Great!' },
    { slot: 18, difficulty: 'hard', variant: 'match', stem: 'Listen. A jet flew over the house. It was loud and fast. The cat hid under the bed. What flew over the house? Tap the picture.', prompt: null, choices: [picChoice('jet', true), picChoice('bus'), picChoice('kite')], solution: 'A jet flew over! Well done!' },
    { slot: 19, difficulty: 'medium', variant: 'match', stem: 'Listen. Meg made soup in a big pot. She added carrots and beans. It smelled great. What did Meg make the soup in? Tap the picture.', prompt: null, choices: [picChoice('pot', true), picChoice('mug'), picChoice('hat')], solution: 'Meg made soup in the pot! Nice!' },
    { slot: 20, difficulty: 'medium', variant: 'match', stem: 'Listen. The duck and the fish live in the pond. The duck swims on top. The fish swims down deep. Who swims down deep? Tap the picture.', prompt: null, choices: [picChoice('fish', true), picChoice('duck'), picChoice('pig')], solution: 'The fish swims down deep! Great!' },
    { slot: 21, difficulty: 'medium', variant: 'match', stem: 'Listen. Tom wore a warm cap and a scarf. The cap kept his ears warm. What kept Tom’s ears warm? Tap the picture.', prompt: null, choices: [picChoice('cap', true), picChoice('sock'), picChoice('mug')], solution: 'The cap kept his ears warm! Well done!' },
    { slot: 22, difficulty: 'hard', variant: 'match', stem: 'Listen. A yo-yo spun down the string and back up again. The kids clapped. What spun down the string? Tap the picture.', prompt: null, choices: [picChoice('yoyo', true), picChoice('ball'), picChoice('ring')], solution: 'The yo-yo spun down the string! Nice!' },
    { slot: 23, difficulty: 'medium', variant: 'match', stem: 'Listen. The tree had red apples. Ben climbed up and picked one. Then he took a big bite. What did Ben pick from the tree? Tap the picture.', prompt: null, choices: [picChoice('apple', true), picChoice('leaf'), picChoice('flower')], solution: 'Ben picked an apple! Great!' },
    { slot: 24, difficulty: 'hard', variant: 'match', stem: 'Listen. A ring rolled off the table. It rolled under the door. Dad found it there. What rolled under the door? Tap the picture.', prompt: null, choices: [picChoice('ring', true), picChoice('ball'), picChoice('key')], solution: 'The ring rolled under the door! Well done!' },
    { slot: 25, difficulty: 'hard', variant: 'match', stem: 'Listen. The kite got stuck in the tall tree. Dad reached up and got it down. Where did the kite get stuck? Tap the picture.', prompt: null, choices: [picChoice('tree', true), picChoice('house'), picChoice('tent')], solution: 'The kite got stuck in the tree! Nice!' },
    { slot: 26, difficulty: 'easy', variant: 'match', stem: 'Listen. The sun came up in the morning. It was bright and warm. The flowers opened up. What came up in the morning? Tap the picture.', prompt: null, choices: [picChoice('sun', true), picChoice('moon'), picChoice('star')], solution: 'The sun came up! Great listening!' },
  ],
}

export const PRE_READER_SKILLS: PreReaderSkill[] = [
  COUNTING_K,
  LETTER_SOUNDS_K,
  LETTER_NAMING_K,
  SHAPES_K,
  COMPARING_NUMBERS_K,
  ADDITION_WITHIN_20_G1,
  SUBTRACTION_WITHIN_20_G1,
  PLACE_VALUE_TO_100_G1,
  MAIN_IDEA_G1,
  ADDITION_WITHIN_100_G2,
  MONEY_PLACE_VALUE_G2,
  READING_COMPREHENSION_G2,
]

// --- Deterministic build of a served item (shuffle the tiles) ----------------

function mulberry32(a: number): () => number {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function seedForSlot(slot: number): number {
  return Math.imul(slot, 0x9e3779b1) >>> 0
}

export interface BuiltPreReaderItem {
  stem: string
  prompt: Prompt
  choices: PreReaderChoice[]
  correct_answer: string
  solution: string
  difficulty: Difficulty
}

/** Shuffle the answer tiles deterministically; correct_answer is the correct
 *  tile's label. Pure — same (item, seed) -> identical. */
export function buildPreReaderItem(item: PreReaderItem, seed: number): BuiltPreReaderItem {
  const rng = mulberry32(seed >>> 0)
  const choices = [...item.choices]
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[choices[i], choices[j]] = [choices[j], choices[i]]
  }
  const correct = choices.find((c) => c.is_correct)
  return {
    stem: item.stem,
    prompt: item.prompt,
    choices,
    correct_answer: correct ? correct.text : '',
    solution: item.solution,
    difficulty: item.difficulty,
  }
}
