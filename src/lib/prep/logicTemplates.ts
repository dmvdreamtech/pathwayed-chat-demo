/**
 * Prep verbal question bank — Logic & Verbal Classification (HSPT verbal reasoning),
 * grades 6-8.
 *
 * Sibling of verbalTemplates.ts (Synonyms/Antonyms), held to the SAME bar: every
 * item has 4 choices, exactly one correct, and THREE distractors that are each a
 * specific wrong path a real 7th grader takes — never a random word.
 *
 *   • Logic — short deductive statements followed by a conclusion to evaluate
 *     (transitive syllogisms, ordering, conditional traps). Every distractor is a
 *     conclusion that does NOT follow but looks like it does: a reversed
 *     implication, an over-generalization, a smuggled-in assumption, or a mixed-up
 *     order.
 *   • Verbal Classification — "which word belongs with the group" / "which word
 *     does NOT belong". Every distractor is a word a student picks by sorting on
 *     the WRONG attribute, by grabbing something merely associated, by reaching for
 *     a category that is too broad, or (in odd-one-out) by flagging a word that
 *     actually DOES belong.
 *
 * Self-contained: LOGIC_MISCONCEPTIONS holds every token used by BOTH skills, so
 * the test can assert coverage without importing the shared misconceptions layer.
 */

import {
  buildPrepQuestion,
  seedForSlot,
  type Difficulty,
  type PrepChoice,
  type PrepItem,
  type PrepSkill,
} from './verbalTemplates'
import { LOGIC_MISCONCEPTIONS, LOGIC_REVERSED, LOGIC_OVERGEN, LOGIC_ASSUMPTION, LOGIC_ORDER, CLASS_WRONG_ATTR, CLASS_TOO_BROAD, CLASS_ASSOCIATED, CLASS_MEMBER } from './logicMisconceptions'
export { LOGIC_MISCONCEPTIONS }

// re-export so downstream builders can reach the shared helpers from one module
export { buildPrepQuestion, seedForSlot }
export type { Difficulty, PrepChoice, PrepItem, PrepSkill }

// Misconception tokens and their explanations live in ./logicMisconceptions.ts, so the
// browser can explain a wrong answer without importing this bank.

// --- Raw item shape ---------------------------------------------------------
interface RawDistractor {
  text: string
  token: string
}
interface RawItem {
  tier: Difficulty
  stem: string
  answer: string
  d: [RawDistractor, RawDistractor, RawDistractor]
  solution: string
}

const dd = (text: string, token: string): RawDistractor => ({ text, token })

// ============================================================================
// LOGIC
// ============================================================================
const LOGIC_ITEMS: RawItem[] = [
  // ---- Easy ----
  {
    tier: 'easy',
    stem: 'Sara is taller than Tom. Tom is taller than Bea. Who is the SHORTEST?',
    answer: 'Bea',
    d: [
      dd('Sara', LOGIC_ORDER),
      dd('Tom', LOGIC_OVERGEN),
      dd('They are all the same height', LOGIC_ASSUMPTION),
    ],
    solution: 'Line them up: Sara > Tom > Bea. Bea is at the bottom, so Bea is the shortest.',
  },
  {
    tier: 'easy',
    stem: 'All robins are birds. All birds are animals. So all robins are definitely ___?',
    answer: 'animals',
    d: [
      dd('the only birds there are', LOGIC_OVERGEN),
      dd('the same as "all animals are robins"', LOGIC_REVERSED),
      dd('also fish', LOGIC_ASSUMPTION),
    ],
    solution: 'Robins are birds, and every bird is an animal, so every robin must be an animal.',
  },
  {
    tier: 'easy',
    stem: 'Maya is older than Leo. Leo is older than Kim. Who is the OLDEST?',
    answer: 'Maya',
    d: [
      dd('Kim', LOGIC_ORDER),
      dd('Leo', LOGIC_OVERGEN),
      dd('It cannot be known', LOGIC_ASSUMPTION),
    ],
    solution: 'In age order it is Maya > Leo > Kim, so Maya is the oldest.',
  },
  {
    tier: 'easy',
    stem: 'All Bloops are Razzies. All Razzies are Lazzies. So all Bloops are definitely ___?',
    answer: 'Lazzies',
    d: [
      dd('all Razzies (and nothing more)', LOGIC_OVERGEN),
      dd('the same as "all Lazzies are Bloops"', LOGIC_REVERSED),
      dd('also Wuzzies', LOGIC_ASSUMPTION),
    ],
    solution: 'Every Bloop is a Razzie, and every Razzie is a Lazzie, so every Bloop must be a Lazzie.',
  },
  {
    tier: 'easy',
    stem: 'The store is closer than the school. The school is closer than the park. Which is FARTHEST away?',
    answer: 'the park',
    d: [
      dd('the store', LOGIC_ORDER),
      dd('the school', LOGIC_OVERGEN),
      dd('they are all the same distance', LOGIC_ASSUMPTION),
    ],
    solution: 'By distance it is store < school < park, so the park is the farthest.',
  },
  {
    tier: 'easy',
    stem: 'Every dog at the shelter has a collar. Rex is a dog at the shelter. So Rex definitely ___?',
    answer: 'has a collar',
    d: [
      dd('is the only dog with a collar', LOGIC_OVERGEN),
      dd('is proof that anything with a collar is Rex', LOGIC_REVERSED),
      dd('also has a leash', LOGIC_ASSUMPTION),
    ],
    solution: 'Every dog there has a collar, and Rex is one of those dogs, so Rex has a collar.',
  },
  {
    tier: 'easy',
    stem: 'Ann runs faster than Bea. Bea runs faster than Cara. Who is the SLOWEST runner?',
    answer: 'Cara',
    d: [
      dd('Ann', LOGIC_ORDER),
      dd('Bea', LOGIC_OVERGEN),
      dd('They all tie', LOGIC_ASSUMPTION),
    ],
    solution: 'By speed it is Ann > Bea > Cara, so Cara is the slowest.',
  },
  {
    tier: 'easy',
    stem: 'All squares are rectangles. All rectangles have four sides. So every square definitely ___?',
    answer: 'has four sides',
    d: [
      dd('is the only kind of rectangle', LOGIC_OVERGEN),
      dd('means every four-sided shape is a square', LOGIC_REVERSED),
      dd('has four sides that are all equal', LOGIC_ASSUMPTION),
    ],
    solution: 'A square is a rectangle, and every rectangle has four sides, so every square has four sides.',
  },
  {
    tier: 'easy',
    stem: 'The cat weighs more than the rabbit. The rabbit weighs more than the mouse. Which is the LIGHTEST?',
    answer: 'the mouse',
    d: [
      dd('the cat', LOGIC_ORDER),
      dd('the rabbit', LOGIC_OVERGEN),
      dd('cannot tell', LOGIC_ASSUMPTION),
    ],
    solution: 'By weight it is cat > rabbit > mouse, so the mouse is the lightest.',
  },
  {
    tier: 'easy',
    stem: 'Everyone in the chess club can play chess. Tom can play chess. Is Tom definitely in the chess club?',
    answer: 'No, playing chess does not prove he is a member',
    d: [
      dd('Yes, he must be a member', LOGIC_REVERSED),
      dd('Yes, everyone who can play is a member', LOGIC_OVERGEN),
      dd('Yes, the club made him learn', LOGIC_ASSUMPTION),
    ],
    solution: 'Members can all play, but the rule does not say only members can play, so Tom might not be in the club.',
  },
  {
    tier: 'easy',
    stem: 'Book A is thicker than Book B. Book C is thinner than Book B. Which book is the THICKEST?',
    answer: 'Book A',
    d: [
      dd('Book C', LOGIC_ORDER),
      dd('Book B', LOGIC_OVERGEN),
      dd('they are equal', LOGIC_ASSUMPTION),
    ],
    solution: 'From the clues, Book A > Book B > Book C, so Book A is the thickest.',
  },
  {
    tier: 'easy',
    stem: 'All roses are flowers. This plant is a flower. Is it definitely a rose?',
    answer: 'No',
    d: [
      dd('Yes, all flowers are roses', LOGIC_REVERSED),
      dd('Yes, it has to be a rose', LOGIC_OVERGEN),
      dd('Yes, it smells like a rose', LOGIC_ASSUMPTION),
    ],
    solution: 'Roses are flowers, but many other plants are flowers too, so a flower is not always a rose.',
  },
  {
    tier: 'easy',
    stem: 'Monday was warmer than Tuesday. Tuesday was warmer than Wednesday. Which day was the COLDEST?',
    answer: 'Wednesday',
    d: [
      dd('Monday', LOGIC_ORDER),
      dd('Tuesday', LOGIC_OVERGEN),
      dd('all the same', LOGIC_ASSUMPTION),
    ],
    solution: 'By warmth it is Monday > Tuesday > Wednesday, so Wednesday was the coldest.',
  },
  {
    tier: 'easy',
    stem: 'All Zibs are Zabs. All Zabs are Zubs. So every Zib is definitely a ___?',
    answer: 'Zub',
    d: [
      dd('Zab and only a Zab', LOGIC_OVERGEN),
      dd('proof that every Zub is a Zib', LOGIC_REVERSED),
      dd('Zeb', LOGIC_ASSUMPTION),
    ],
    solution: 'Every Zib is a Zab, and every Zab is a Zub, so every Zib must be a Zub.',
  },

  // ---- Medium ----
  {
    tier: 'medium',
    stem: 'All sharks are fish. Some fish live in rivers. Can we be sure all sharks live in rivers?',
    answer: 'No',
    d: [
      dd('Yes, all sharks live in rivers', LOGIC_OVERGEN),
      dd('Yes, since all river fish are sharks', LOGIC_REVERSED),
      dd('Yes, sharks need river water', LOGIC_ASSUMPTION),
    ],
    solution: 'Only SOME fish live in rivers, so we cannot say every shark does, the word "some" does not cover all.',
  },
  {
    tier: 'medium',
    stem: 'If a number is even, it can be divided by 2. The number 14 is even. So 14 definitely ___?',
    answer: 'can be divided by 2',
    d: [
      dd('is the only even number', LOGIC_OVERGEN),
      dd('means anything divisible by 2 equals 14', LOGIC_REVERSED),
      dd('can also be divided by 4', LOGIC_ASSUMPTION),
    ],
    solution: '14 is even, and every even number can be divided by 2, so 14 can be divided by 2.',
  },
  {
    tier: 'medium',
    stem: 'Jo is taller than Kay. Kay is taller than Lee. Lee is taller than Moe. Who is the SHORTEST?',
    answer: 'Moe',
    d: [
      dd('Jo', LOGIC_ORDER),
      dd('Lee', LOGIC_OVERGEN),
      dd('cannot be determined', LOGIC_ASSUMPTION),
    ],
    solution: 'The order is Jo > Kay > Lee > Moe, so Moe is the shortest.',
  },
  {
    tier: 'medium',
    stem: 'No reptiles have fur. A snake is a reptile. So a snake definitely ___?',
    answer: 'does not have fur',
    d: [
      dd('is the only reptile', LOGIC_OVERGEN),
      dd('means anything without fur is a snake', LOGIC_REVERSED),
      dd('lives underground', LOGIC_ASSUMPTION),
    ],
    solution: 'No reptile has fur, and a snake is a reptile, so a snake has no fur.',
  },
  {
    tier: 'medium',
    stem: 'All athletes on the team train daily. Priya trains daily. Is Priya definitely on the team?',
    answer: 'No, not necessarily',
    d: [
      dd('Yes, she must be on the team', LOGIC_REVERSED),
      dd('Yes, everyone who trains is on the team', LOGIC_OVERGEN),
      dd('Yes, the coach requires it', LOGIC_ASSUMPTION),
    ],
    solution: 'Team athletes all train daily, but others can train daily too, so training does not prove Priya is on the team.',
  },
  {
    tier: 'medium',
    stem: 'Rosa scored higher than Sam. Sam scored higher than Tia. Tia scored higher than Uma. Who scored the HIGHEST?',
    answer: 'Rosa',
    d: [
      dd('Uma', LOGIC_ORDER),
      dd('Sam', LOGIC_OVERGEN),
      dd('it was a tie', LOGIC_ASSUMPTION),
    ],
    solution: 'Scores run Rosa > Sam > Tia > Uma, so Rosa scored the highest.',
  },
  {
    tier: 'medium',
    stem: 'If the alarm rings, everyone must leave. The alarm did NOT ring. What must happen?',
    answer: 'Nothing is required, they may stay',
    d: [
      dd('Everyone must leave anyway', LOGIC_OVERGEN),
      dd('The alarm rang because they left', LOGIC_REVERSED),
      dd('They must leave a little later', LOGIC_ASSUMPTION),
    ],
    solution: 'The rule only says what happens WHEN the alarm rings. It did not ring, so nothing is required.',
  },
  {
    tier: 'medium',
    stem: 'Some students play soccer. All soccer players wear cleats. Does every student wear cleats?',
    answer: 'No',
    d: [
      dd('Yes, all students wear cleats', LOGIC_OVERGEN),
      dd('Yes, since all cleat-wearers are students', LOGIC_REVERSED),
      dd('Yes, the school hands them out', LOGIC_ASSUMPTION),
    ],
    solution: 'Only SOME students play soccer, so only those students must wear cleats, not every student.',
  },
  {
    tier: 'medium',
    stem: 'All maple trees drop their leaves in fall. This tree drops its leaves in fall. Is it definitely a maple?',
    answer: 'No',
    d: [
      dd('Yes, it must be a maple', LOGIC_REVERSED),
      dd('Yes, only maples drop leaves', LOGIC_OVERGEN),
      dd('Yes, it is tall like a maple', LOGIC_ASSUMPTION),
    ],
    solution: 'Maples drop their leaves, but so do many other trees, so dropping leaves does not prove it is a maple.',
  },
  {
    tier: 'medium',
    stem: 'Ben is younger than Cal. Cal is younger than Dan. Who is the OLDEST?',
    answer: 'Dan',
    d: [
      dd('Ben', LOGIC_ORDER),
      dd('Cal', LOGIC_OVERGEN),
      dd('unknown', LOGIC_ASSUMPTION),
    ],
    solution: 'From youngest to oldest it is Ben, Cal, Dan, so Dan is the oldest.',
  },
  {
    tier: 'medium',
    stem: 'All poodles are dogs. All dogs are mammals. All mammals are warm-blooded. So every poodle is definitely ___?',
    answer: 'warm-blooded',
    d: [
      dd('the only mammal', LOGIC_OVERGEN),
      dd('proof that every warm-blooded animal is a poodle', LOGIC_REVERSED),
      dd('a strong swimmer', LOGIC_ASSUMPTION),
    ],
    solution: 'Follow the chain: poodle -> dog -> mammal -> warm-blooded, so every poodle is warm-blooded.',
  },
  {
    tier: 'medium',
    stem: 'If Ada studies, she passes. Ada passed the test. Can we be sure she studied?',
    answer: 'No',
    d: [
      dd('Yes, she must have studied', LOGIC_REVERSED),
      dd('Yes, passing always means studying', LOGIC_OVERGEN),
      dd('Yes, a tutor helped her', LOGIC_ASSUMPTION),
    ],
    solution: 'Studying leads to passing, but the rule does not say passing only happens after studying, so she might have passed another way.',
  },
  {
    tier: 'medium',
    stem: 'Town P is north of Town Q. Town Q is north of Town R. Which town is FARTHEST south?',
    answer: 'Town R',
    d: [
      dd('Town P', LOGIC_ORDER),
      dd('Town Q', LOGIC_OVERGEN),
      dd('they are level', LOGIC_ASSUMPTION),
    ],
    solution: 'From north to south the order is P, Q, R, so Town R is the farthest south.',
  },
  {
    tier: 'medium',
    stem: 'No Glorks are Plinks. Every Snib is a Glork. So no Snib is a ___?',
    answer: 'Plink',
    d: [
      dd('proof that every Plink is a Snib', LOGIC_REVERSED),
      dd('the only Glork', LOGIC_OVERGEN),
      dd('Trib', LOGIC_ASSUMPTION),
    ],
    solution: 'Every Snib is a Glork, and no Glork is a Plink, so no Snib can be a Plink.',
  },

  // ---- Hard ----
  {
    tier: 'hard',
    stem: 'All A are B. No B are C. Can something be both an A and a C?',
    answer: 'No',
    d: [
      dd('Yes, some A are C', LOGIC_OVERGEN),
      dd('Yes, if some C turn out to be A', LOGIC_REVERSED),
      dd('Yes, if a group D links them', LOGIC_ASSUMPTION),
    ],
    solution: 'Every A is a B, and no B is a C, so an A (being a B) can never also be a C.',
  },
  {
    tier: 'hard',
    stem: 'Only members can enter the library. Sara entered the library. What can we conclude?',
    answer: 'Sara is a member',
    d: [
      dd('Every member entered today', LOGIC_OVERGEN),
      dd('Anyone who is a member entered', LOGIC_REVERSED),
      dd('Sara left her card at home', LOGIC_ASSUMPTION),
    ],
    solution: '"Only members can enter" means anyone inside must be a member, and Sara entered, so Sara is a member.',
  },
  {
    tier: 'hard',
    stem: 'No fish can survive without water. A goldfish is a fish. What must be true?',
    answer: 'A goldfish cannot survive without water',
    d: [
      dd('A goldfish is the only kind of fish', LOGIC_OVERGEN),
      dd('Anything that needs water is a fish', LOGIC_REVERSED),
      dd('A goldfish also needs sunlight', LOGIC_ASSUMPTION),
    ],
    solution: 'No fish survives without water, and a goldfish is a fish, so a goldfish cannot survive without water.',
  },
  {
    tier: 'hard',
    stem: 'All J are K. All K are L. Some L are M. Is every J definitely an M?',
    answer: 'No',
    d: [
      dd('Yes, all J are M', LOGIC_OVERGEN),
      dd('Yes, since some M are J', LOGIC_REVERSED),
      dd('Yes, J reaches M through L', LOGIC_ASSUMPTION),
    ],
    solution: 'Every J is an L, but only SOME L are M, so we cannot be sure any given J is an M.',
  },
  {
    tier: 'hard',
    stem: 'W is heavier than X. Y is heavier than W. Z is lighter than X. Which is the HEAVIEST?',
    answer: 'Y',
    d: [
      dd('Z', LOGIC_ORDER),
      dd('W', LOGIC_OVERGEN),
      dd('cannot be determined', LOGIC_ASSUMPTION),
    ],
    solution: 'Ordering the clues gives Y > W > X > Z, so Y is the heaviest.',
  },
  {
    tier: 'hard',
    stem: 'The shop closes if and ONLY if it is a weekend. Today the shop is open. Is today a weekend?',
    answer: 'No',
    d: [
      dd('Yes, it might still be a weekend', LOGIC_OVERGEN),
      dd('Yes, being open means it is a weekend', LOGIC_REVERSED),
      dd('Yes, it is a holiday weekend', LOGIC_ASSUMPTION),
    ],
    solution: '"Closes only on weekends" means open days are NOT weekends, and the shop is open, so today is not a weekend.',
  },
  {
    tier: 'hard',
    stem: 'All experts passed the exam. Some who passed are teenagers. Are all experts teenagers?',
    answer: 'No',
    d: [
      dd('Yes, all experts are teenagers', LOGIC_OVERGEN),
      dd('Yes, all teenagers are experts', LOGIC_REVERSED),
      dd('Yes, the exam was easy for them', LOGIC_ASSUMPTION),
    ],
    solution: 'Only SOME who passed are teenagers, so we cannot say every expert is a teenager.',
  },
  {
    tier: 'hard',
    stem: 'No reptiles are warm-blooded. All snakes are reptiles. All warm-blooded animals have a fast heartbeat. From this, do snakes definitely have a fast heartbeat?',
    answer: 'No',
    d: [
      dd('Yes, all snakes have fast heartbeats', LOGIC_OVERGEN),
      dd('Yes, a fast heartbeat means a warm-blooded snake', LOGIC_REVERSED),
      dd('Yes, snakes move quickly', LOGIC_ASSUMPTION),
    ],
    solution: 'Snakes are reptiles and therefore NOT warm-blooded, so the fast-heartbeat rule (which is about warm-blooded animals) tells us nothing about them.',
  },
  {
    tier: 'hard',
    stem: 'In the race, Rae finished ahead of Sy. Sy finished ahead of Ty. Vic finished ahead of Rae. Who came in LAST?',
    answer: 'Ty',
    d: [
      dd('Vic', LOGIC_ORDER),
      dd('Sy', LOGIC_OVERGEN),
      dd('it ended in a tie', LOGIC_ASSUMPTION),
    ],
    solution: 'The finish order is Vic, Rae, Sy, Ty, so Ty came in last.',
  },
  {
    tier: 'hard',
    stem: 'Every G is an H. No H is an I. Some I are J. Can a G ever be an I?',
    answer: 'No',
    d: [
      dd('Yes, some G are I', LOGIC_OVERGEN),
      dd('Yes, if some I are G', LOGIC_REVERSED),
      dd('Yes, through the J group', LOGIC_ASSUMPTION),
    ],
    solution: 'Every G is an H, and no H is an I, so no G can be an I. The "some I are J" clue is a distraction.',
  },
  {
    tier: 'hard',
    stem: 'Some birds cannot fly. A penguin is a bird. From this fact ALONE, can we be sure a penguin cannot fly?',
    answer: 'No, this alone does not prove it',
    d: [
      dd('Yes, penguins are the birds that cannot fly', LOGIC_OVERGEN),
      dd('Yes, all flightless birds are penguins', LOGIC_REVERSED),
      dd('Yes, penguins are too heavy to fly', LOGIC_ASSUMPTION),
    ],
    solution: '"Some birds cannot fly" does not tell us WHICH ones, so being a bird alone does not prove a penguin cannot fly.',
  },
  {
    tier: 'hard',
    stem: 'If a plant is a cactus, it stores water. This plant stores water. Must it be a cactus?',
    answer: 'No',
    d: [
      dd('Yes, it must be a cactus', LOGIC_REVERSED),
      dd('Yes, all water-storing plants are cacti', LOGIC_OVERGEN),
      dd('Yes, it grows in a desert', LOGIC_ASSUMPTION),
    ],
    solution: 'Cacti store water, but other plants store water too, so storing water does not prove it is a cactus.',
  },
  {
    tier: 'hard',
    stem: 'Card 1 is worth more than Card 2. Card 3 is worth more than Card 1. Card 2 is worth more than Card 4. Which card is worth the LEAST?',
    answer: 'Card 4',
    d: [
      dd('Card 3', LOGIC_ORDER),
      dd('Card 2', LOGIC_OVERGEN),
      dd('cannot be determined', LOGIC_ASSUMPTION),
    ],
    solution: 'Putting it in order: Card 3 > Card 1 > Card 2 > Card 4, so Card 4 is worth the least.',
  },
  {
    tier: 'hard',
    stem: 'All chefs can cook. All who can cook can boil water. Some who boil water are kids. Are all chefs kids?',
    answer: 'No',
    d: [
      dd('Yes, all chefs are kids', LOGIC_OVERGEN),
      dd('Yes, all kids are chefs', LOGIC_REVERSED),
      dd('Yes, kids help the chefs', LOGIC_ASSUMPTION),
    ],
    solution: 'Chefs can boil water, but only SOME water-boilers are kids, so we cannot say chefs are kids.',
  },
]

// ============================================================================
// VERBAL CLASSIFICATION
// ============================================================================
const CLASSIFICATION_ITEMS: RawItem[] = [
  // ---- "belongs with the group" (Easy) ----
  {
    tier: 'easy',
    stem: 'Which word belongs in the same group as: rose, tulip, daisy?',
    answer: 'lily',
    d: [
      dd('ruby', CLASS_WRONG_ATTR),
      dd('vase', CLASS_ASSOCIATED),
      dd('plant', CLASS_TOO_BROAD),
    ],
    solution: 'Rose, tulip, and daisy are all FLOWERS, and a lily is a flower, so it belongs. ("Ruby" is just red like a rose, a vase only holds flowers, and "plant" is too broad.)',
  },
  {
    tier: 'easy',
    stem: 'Which word belongs in the same group as: apple, banana, grape?',
    answer: 'orange',
    d: [
      dd('basketball', CLASS_WRONG_ATTR),
      dd('juice', CLASS_ASSOCIATED),
      dd('food', CLASS_TOO_BROAD),
    ],
    solution: 'Apple, banana, and grape are FRUITS, and an orange is a fruit. ("Basketball" is just round and orange-colored, juice is made from fruit, and "food" is too broad.)',
  },
  {
    tier: 'easy',
    stem: 'Which word belongs in the same group as: poodle, beagle, boxer?',
    answer: 'collie',
    d: [
      dd('cat', CLASS_WRONG_ATTR),
      dd('leash', CLASS_ASSOCIATED),
      dd('animal', CLASS_TOO_BROAD),
    ],
    solution: 'Poodle, beagle, and boxer are all DOG BREEDS, and a collie is a dog breed. ("Cat" is a pet but a different animal, a leash is just used on dogs, and "animal" is too broad.)',
  },
  {
    tier: 'easy',
    stem: 'Which word belongs in the same group as: red, blue, green?',
    answer: 'yellow',
    d: [
      dd('ruby', CLASS_WRONG_ATTR),
      dd('crayon', CLASS_ASSOCIATED),
      dd('shade', CLASS_TOO_BROAD),
    ],
    solution: 'Red, blue, and green are COLORS, and yellow is a color. ("Ruby" is a red gem, a crayon only makes colors, and "shade" is too broad.)',
  },
  {
    tier: 'easy',
    stem: 'Which word belongs in the same group as: arm, leg, hand?',
    answer: 'foot',
    d: [
      dd('table', CLASS_WRONG_ATTR),
      dd('sock', CLASS_ASSOCIATED),
      dd('body', CLASS_TOO_BROAD),
    ],
    solution: 'Arm, leg, and hand are BODY PARTS, and a foot is a body part. ("Table" only shares the word "leg," a sock just goes on a foot, and "body" is too broad.)',
  },
  {
    tier: 'easy',
    stem: 'Which word belongs in the same group as: Mars, Venus, Jupiter?',
    answer: 'Saturn',
    d: [
      dd('Sun', CLASS_WRONG_ATTR),
      dd('telescope', CLASS_ASSOCIATED),
      dd('space', CLASS_TOO_BROAD),
    ],
    solution: 'Mars, Venus, and Jupiter are PLANETS, and Saturn is a planet. (The Sun is in the sky but is a star, a telescope only looks at planets, and "space" is too broad.)',
  },
  {
    tier: 'easy',
    stem: 'Which word belongs in the same group as: guitar, piano, drums?',
    answer: 'violin',
    d: [
      dd('radio', CLASS_WRONG_ATTR),
      dd('concert', CLASS_ASSOCIATED),
      dd('object', CLASS_TOO_BROAD),
    ],
    solution: 'Guitar, piano, and drums are MUSICAL INSTRUMENTS, and a violin is one. (A radio only plays music, a concert is where instruments are used, and "object" is too broad.)',
  },
  {
    tier: 'easy',
    stem: 'Which word belongs in the same group as: carrot, potato, onion?',
    answer: 'broccoli',
    d: [
      dd('apple', CLASS_WRONG_ATTR),
      dd('salad', CLASS_ASSOCIATED),
      dd('food', CLASS_TOO_BROAD),
    ],
    solution: 'Carrot, potato, and onion are VEGETABLES, and broccoli is a vegetable. (An apple is produce but a fruit, salad is made from vegetables, and "food" is too broad.)',
  },

  // ---- "belongs with the group" (Medium) ----
  {
    tier: 'medium',
    stem: 'Which word belongs in the same group as: sparrow, robin, eagle?',
    answer: 'falcon',
    d: [
      dd('bat', CLASS_WRONG_ATTR),
      dd('nest', CLASS_ASSOCIATED),
      dd('animal', CLASS_TOO_BROAD),
    ],
    solution: 'Sparrow, robin, and eagle are BIRDS, and a falcon is a bird. (A bat flies but is a mammal, a nest is where birds live, and "animal" is too broad.)',
  },
  {
    tier: 'medium',
    stem: 'Which word belongs in the same group as: iron, copper, gold?',
    answer: 'silver',
    d: [
      dd('wood', CLASS_WRONG_ATTR),
      dd('ring', CLASS_ASSOCIATED),
      dd('element', CLASS_TOO_BROAD),
    ],
    solution: 'Iron, copper, and gold are METALS, and silver is a metal. (Wood is a material but not a metal, a ring can be made of metal, and "element" is too broad.)',
  },
  {
    tier: 'medium',
    stem: 'Which word belongs in the same group as: soccer, tennis, hockey?',
    answer: 'baseball',
    d: [
      dd('chess', CLASS_WRONG_ATTR),
      dd('trophy', CLASS_ASSOCIATED),
      dd('activity', CLASS_TOO_BROAD),
    ],
    solution: 'Soccer, tennis, and hockey are SPORTS, and baseball is a sport. (Chess is a game but not a physical sport, a trophy is a prize for sports, and "activity" is too broad.)',
  },
  {
    tier: 'medium',
    stem: 'Which word belongs in the same group as: Texas, Ohio, Nevada?',
    answer: 'Florida',
    d: [
      dd('Paris', CLASS_WRONG_ATTR),
      dd('flag', CLASS_ASSOCIATED),
      dd('place', CLASS_TOO_BROAD),
    ],
    solution: 'Texas, Ohio, and Nevada are U.S. STATES, and Florida is a state. (Paris is a place but a city, a flag represents a state, and "place" is too broad.)',
  },
  {
    tier: 'medium',
    stem: 'Which word belongs in the same group as: ant, bee, beetle?',
    answer: 'grasshopper',
    d: [
      dd('spider', CLASS_WRONG_ATTR),
      dd('hive', CLASS_ASSOCIATED),
      dd('creature', CLASS_TOO_BROAD),
    ],
    solution: 'Ant, bee, and beetle are INSECTS (six legs), and a grasshopper is an insect. (A spider is a small crawler but has eight legs, a hive is where bees live, and "creature" is too broad.)',
  },
  {
    tier: 'medium',
    stem: 'Which word belongs in the same group as: triangle, square, circle?',
    answer: 'pentagon',
    d: [
      dd('cube', CLASS_WRONG_ATTR),
      dd('ruler', CLASS_ASSOCIATED),
      dd('figure', CLASS_TOO_BROAD),
    ],
    solution: 'Triangle, square, and circle are flat SHAPES, and a pentagon is a flat shape. (A cube has square faces but is 3-D, a ruler is used to draw shapes, and "figure" is too broad.)',
  },
  {
    tier: 'medium',
    stem: 'Which word belongs in the same group as: oak, pine, maple?',
    answer: 'birch',
    d: [
      dd('bush', CLASS_WRONG_ATTR),
      dd('acorn', CLASS_ASSOCIATED),
      dd('plant', CLASS_TOO_BROAD),
    ],
    solution: 'Oak, pine, and maple are TREES, and a birch is a tree. (A bush is leafy but not a tree, an acorn comes from an oak, and "plant" is too broad.)',
  },
  {
    tier: 'medium',
    stem: 'Which word belongs in the same group as: water, milk, juice?',
    answer: 'oil',
    d: [
      dd('ice', CLASS_WRONG_ATTR),
      dd('cup', CLASS_ASSOCIATED),
      dd('substance', CLASS_TOO_BROAD),
    ],
    solution: 'Water, milk, and juice are LIQUIDS, and oil is a liquid. (Ice is made of water but is solid, a cup holds liquid, and "substance" is too broad.)',
  },

  // ---- "belongs with the group" (Hard) ----
  {
    tier: 'hard',
    stem: 'Which word belongs in the same group as: whale, tiger, bat?',
    answer: 'dolphin',
    d: [
      dd('shark', CLASS_WRONG_ATTR),
      dd('ocean', CLASS_ASSOCIATED),
      dd('animal', CLASS_TOO_BROAD),
    ],
    solution: 'Whale, tiger, and bat are MAMMALS, and a dolphin is a mammal. (A shark swims in the sea but is a fish, the ocean is where whales live, and "animal" is too broad.)',
  },
  {
    tier: 'hard',
    stem: 'Which word belongs in the same group as: diamond, ruby, emerald?',
    answer: 'sapphire',
    d: [
      dd('glass', CLASS_WRONG_ATTR),
      dd('ring', CLASS_ASSOCIATED),
      dd('rock', CLASS_TOO_BROAD),
    ],
    solution: 'Diamond, ruby, and emerald are GEMSTONES, and a sapphire is a gemstone. (Glass sparkles but is not a gem, a ring holds gems, and "rock" is too broad.)',
  },
  {
    tier: 'hard',
    stem: 'Which word belongs in the same group as: basil, mint, thyme?',
    answer: 'parsley',
    d: [
      dd('lettuce', CLASS_WRONG_ATTR),
      dd('garden', CLASS_ASSOCIATED),
      dd('plant', CLASS_TOO_BROAD),
    ],
    solution: 'Basil, mint, and thyme are HERBS, and parsley is an herb. (Lettuce is green and leafy but a salad green, a garden is where herbs grow, and "plant" is too broad.)',
  },
  {
    tier: 'hard',
    stem: 'Which word belongs in the same group as: Africa, Asia, Europe?',
    answer: 'Australia',
    d: [
      dd('Atlantic', CLASS_WRONG_ATTR),
      dd('map', CLASS_ASSOCIATED),
      dd('landmass', CLASS_TOO_BROAD),
    ],
    solution: 'Africa, Asia, and Europe are CONTINENTS, and Australia is a continent. (The Atlantic is a huge geographic name but an ocean, a map shows continents, and "landmass" is too broad.)',
  },
  {
    tier: 'hard',
    stem: 'Which word belongs in the same group as: dollar, euro, yen?',
    answer: 'peso',
    d: [
      dd('gold', CLASS_WRONG_ATTR),
      dd('wallet', CLASS_ASSOCIATED),
      dd('money', CLASS_TOO_BROAD),
    ],
    solution: 'Dollar, euro, and yen are CURRENCIES, and the peso is a currency. (Gold is valuable but not a currency, a wallet holds money, and "money" is too broad.)',
  },
  {
    tier: 'hard',
    stem: 'Which word belongs in the same group as: lizard, snake, turtle?',
    answer: 'crocodile',
    d: [
      dd('frog', CLASS_WRONG_ATTR),
      dd('scales', CLASS_ASSOCIATED),
      dd('animal', CLASS_TOO_BROAD),
    ],
    solution: 'Lizard, snake, and turtle are REPTILES, and a crocodile is a reptile. (A frog is a cold-blooded pond animal but an amphibian, scales cover reptiles, and "animal" is too broad.)',
  },
  {
    tier: 'hard',
    stem: 'Which word belongs in the same group as: wheat, rice, oats?',
    answer: 'barley',
    d: [
      dd('bean', CLASS_WRONG_ATTR),
      dd('bread', CLASS_ASSOCIATED),
      dd('food', CLASS_TOO_BROAD),
    ],
    solution: 'Wheat, rice, and oats are GRAINS, and barley is a grain. (A bean is a crop seed but a legume, bread is made from grain, and "food" is too broad.)',
  },
  {
    tier: 'hard',
    stem: 'Which word belongs in the same group as: whisper, shout, mumble?',
    answer: 'yell',
    d: [
      dd('listen', CLASS_WRONG_ATTR),
      dd('voice', CLASS_ASSOCIATED),
      dd('speak', CLASS_TOO_BROAD),
    ],
    solution: 'Whisper, shout, and mumble are all WAYS OF SAYING something, and "yell" is one too. (Listen is about the ears, not talking; a voice is what you use to talk; and "speak" is too broad.)',
  },

  // ---- "which does NOT belong" (Easy) ----
  {
    tier: 'easy',
    stem: 'Which word does NOT belong with the others: apple, banana, carrot, grape?',
    answer: 'carrot',
    d: [
      dd('apple', CLASS_MEMBER),
      dd('grape', CLASS_MEMBER),
      dd('banana', CLASS_MEMBER),
    ],
    solution: 'Apple, banana, and grape are all FRUITS, but a carrot is a vegetable, so the carrot does not belong.',
  },
  {
    tier: 'easy',
    stem: 'Which word does NOT belong with the others: car, truck, bus, boat?',
    answer: 'boat',
    d: [
      dd('car', CLASS_MEMBER),
      dd('bus', CLASS_MEMBER),
      dd('truck', CLASS_MEMBER),
    ],
    solution: 'Car, truck, and bus all travel on ROADS, but a boat travels on water, so the boat does not belong.',
  },
  {
    tier: 'easy',
    stem: 'Which word does NOT belong with the others: red, green, blue, tall?',
    answer: 'tall',
    d: [
      dd('red', CLASS_MEMBER),
      dd('blue', CLASS_MEMBER),
      dd('green', CLASS_MEMBER),
    ],
    solution: 'Red, green, and blue are all COLORS, but "tall" describes size, so "tall" does not belong.',
  },
  {
    tier: 'easy',
    stem: 'Which word does NOT belong with the others: dog, cat, rabbit, oak?',
    answer: 'oak',
    d: [
      dd('dog', CLASS_MEMBER),
      dd('rabbit', CLASS_MEMBER),
      dd('cat', CLASS_MEMBER),
    ],
    solution: 'Dog, cat, and rabbit are all ANIMALS, but an oak is a tree, so "oak" does not belong.',
  },
  {
    tier: 'easy',
    stem: 'Which word does NOT belong with the others: circle, square, triangle, red?',
    answer: 'red',
    d: [
      dd('circle', CLASS_MEMBER),
      dd('triangle', CLASS_MEMBER),
      dd('square', CLASS_MEMBER),
    ],
    solution: 'Circle, square, and triangle are all SHAPES, but "red" is a color, so "red" does not belong.',
  },
  {
    tier: 'easy',
    stem: 'Which word does NOT belong with the others: spoon, fork, knife, plate?',
    answer: 'plate',
    d: [
      dd('spoon', CLASS_MEMBER),
      dd('knife', CLASS_MEMBER),
      dd('fork', CLASS_MEMBER),
    ],
    solution: 'Spoon, fork, and knife are UTENSILS you hold to eat, but a plate is a dish, so the plate does not belong.',
  },

  // ---- "which does NOT belong" (Medium) ----
  {
    tier: 'medium',
    stem: 'Which word does NOT belong with the others: robin, sparrow, eagle, bat?',
    answer: 'bat',
    d: [
      dd('robin', CLASS_MEMBER),
      dd('eagle', CLASS_MEMBER),
      dd('sparrow', CLASS_MEMBER),
    ],
    solution: 'Robin, sparrow, and eagle are all BIRDS, but a bat is a mammal that flies, so the bat does not belong.',
  },
  {
    tier: 'medium',
    stem: 'Which word does NOT belong with the others: rose, tulip, daisy, oak?',
    answer: 'oak',
    d: [
      dd('rose', CLASS_MEMBER),
      dd('daisy', CLASS_MEMBER),
      dd('tulip', CLASS_MEMBER),
    ],
    solution: 'Rose, tulip, and daisy are all FLOWERS, but an oak is a tree, so "oak" does not belong.',
  },
  {
    tier: 'medium',
    stem: 'Which word does NOT belong with the others: copper, iron, gold, wood?',
    answer: 'wood',
    d: [
      dd('copper', CLASS_MEMBER),
      dd('gold', CLASS_MEMBER),
      dd('iron', CLASS_MEMBER),
    ],
    solution: 'Copper, iron, and gold are all METALS, but wood is not a metal, so "wood" does not belong.',
  },
  {
    tier: 'medium',
    stem: 'Which word does NOT belong with the others: shark, whale, tuna, salmon?',
    answer: 'whale',
    d: [
      dd('tuna', CLASS_MEMBER),
      dd('shark', CLASS_MEMBER),
      dd('salmon', CLASS_MEMBER),
    ],
    solution: 'Shark, tuna, and salmon are all FISH, but a whale is a mammal that lives in the sea, so the whale does not belong.',
  },
  {
    tier: 'medium',
    stem: 'Which word does NOT belong with the others: Mercury, Venus, Mars, Moon?',
    answer: 'Moon',
    d: [
      dd('Mercury', CLASS_MEMBER),
      dd('Mars', CLASS_MEMBER),
      dd('Venus', CLASS_MEMBER),
    ],
    solution: 'Mercury, Venus, and Mars are all PLANETS, but the Moon orbits Earth and is not a planet, so the Moon does not belong.',
  },
  {
    tier: 'medium',
    stem: 'Which word does NOT belong with the others: guitar, violin, drum, singer?',
    answer: 'singer',
    d: [
      dd('guitar', CLASS_MEMBER),
      dd('drum', CLASS_MEMBER),
      dd('violin', CLASS_MEMBER),
    ],
    solution: 'Guitar, violin, and drum are INSTRUMENTS, but a singer is a person, so "singer" does not belong.',
  },

  // ---- "which does NOT belong" (Hard) ----
  {
    tier: 'hard',
    stem: 'Which word does NOT belong with the others: python, cobra, lizard, frog?',
    answer: 'frog',
    d: [
      dd('python', CLASS_MEMBER),
      dd('lizard', CLASS_MEMBER),
      dd('cobra', CLASS_MEMBER),
    ],
    solution: 'Python, cobra, and lizard are all REPTILES, but a frog is an amphibian, so the frog does not belong.',
  },
  {
    tier: 'hard',
    stem: 'Which word does NOT belong with the others: square, rectangle, rhombus, triangle?',
    answer: 'triangle',
    d: [
      dd('square', CLASS_MEMBER),
      dd('rhombus', CLASS_MEMBER),
      dd('rectangle', CLASS_MEMBER),
    ],
    solution: 'Square, rectangle, and rhombus all have FOUR sides, but a triangle has three sides, so the triangle does not belong.',
  },
  {
    tier: 'hard',
    stem: 'Which word does NOT belong with the others: violet, indigo, crimson, canvas?',
    answer: 'canvas',
    d: [
      dd('violet', CLASS_MEMBER),
      dd('crimson', CLASS_MEMBER),
      dd('indigo', CLASS_MEMBER),
    ],
    solution: 'Violet, indigo, and crimson are all COLORS, but canvas is a cloth you paint on, so "canvas" does not belong.',
  },
  {
    tier: 'hard',
    stem: 'Which word does NOT belong with the others: sonnet, haiku, limerick, novel?',
    answer: 'novel',
    d: [
      dd('sonnet', CLASS_MEMBER),
      dd('limerick', CLASS_MEMBER),
      dd('haiku', CLASS_MEMBER),
    ],
    solution: 'Sonnet, haiku, and limerick are all kinds of POEMS, but a novel is a long prose story, so "novel" does not belong.',
  },
  {
    tier: 'hard',
    stem: 'Which word does NOT belong with the others: oxygen, hydrogen, helium, water?',
    answer: 'water',
    d: [
      dd('oxygen', CLASS_MEMBER),
      dd('helium', CLASS_MEMBER),
      dd('hydrogen', CLASS_MEMBER),
    ],
    solution: 'Oxygen, hydrogen, and helium are all ELEMENTS, but water is a compound made of two elements, so "water" does not belong.',
  },
  {
    tier: 'hard',
    stem: 'Which word does NOT belong with the others: addition, subtraction, division, equation?',
    answer: 'equation',
    d: [
      dd('addition', CLASS_MEMBER),
      dd('division', CLASS_MEMBER),
      dd('subtraction', CLASS_MEMBER),
    ],
    solution: 'Addition, subtraction, and division are all OPERATIONS, but an equation is a full math statement, so "equation" does not belong.',
  },
]

// --- Skill construction (raw item -> PrepItem, correct choice FIRST) ---------
function toPrepItems(raws: RawItem[]): PrepItem[] {
  return raws.map((r, i) => ({
    slot: i + 1,
    difficulty: r.tier,
    stem: r.stem,
    choices: [
      { text: r.answer, is_correct: true },
      ...r.d.map((x) => ({ text: x.text, is_correct: false, misconception_token: x.token })),
    ],
    solution: r.solution,
  }))
}

export const PREP_LOGIC_SKILLS: PrepSkill[] = [
  {
    slug: 'prep-logic',
    name: 'Logic',
    subject: 'prep-verbal',
    gradeBand: '6-8',
    items: toPrepItems(LOGIC_ITEMS),
  },
  {
    slug: 'prep-verbal-classification',
    name: 'Verbal Classification',
    subject: 'prep-verbal',
    gradeBand: '6-8',
    items: toPrepItems(CLASSIFICATION_ITEMS),
  },
]
