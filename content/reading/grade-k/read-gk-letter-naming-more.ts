import type { ContentChoice, ContentSkill } from '../../types'

const num = (v: number, correct = false): ContentChoice => ({ text: String(v), is_correct: correct, tile: { kind: 'number', value: String(v) } })
const ltr = (v: string, correct = false): ContentChoice => ({ text: v, is_correct: correct, tile: { kind: 'letter', value: v } })
const word = (w: string, correct = false): ContentChoice => ({ text: w, is_correct: correct, tile: { kind: 'word', value: w } })

const skill: ContentSkill = {
  slug: 'read-gk-letter-naming-more',
  subject: 'reading',
  grade: 0,
  group: 'Vocabulary and word study',
  name: 'Letter Naming',
  standards: ['RF.K.1'],
  renderMode: 'audio_picture',
  extends: 'letter-naming',
  topUpItems: 14,
  items: [
    // Big letters the live skill does not ask for
    { slot: 1, difficulty: 'easy', stem: 'Can you find the big letter N? Tap the letter.', prompt: null,
      choices: [ltr('N', true), ltr('A'), ltr('O')],
      solution: 'This is big N. N has two tall lines with a slanted line in between.' },
    { slot: 2, difficulty: 'easy', stem: 'Can you find the big letter U? Tap the letter.', prompt: null,
      choices: [ltr('U', true), ltr('T'), ltr('X')],
      solution: 'This is big U. U is shaped like a cup that could hold water.' },
    { slot: 3, difficulty: 'medium', stem: 'Can you find the big letter G? Tap the letter.', prompt: null,
      choices: [ltr('G', true), ltr('A'), ltr('L')],
      solution: 'This is big G. G curves around like a C and has a little shelf inside.' },
    { slot: 4, difficulty: 'medium', stem: 'Can you find the big letter X? Tap the letter.', prompt: null,
      choices: [ltr('X', true), ltr('O'), ltr('E')],
      solution: 'This is big X. X is two lines that cross in the middle.' },
    // Little letters the live skill does not ask for
    { slot: 5, difficulty: 'easy', stem: 'Can you find the little letter n? Tap the letter.', prompt: null,
      choices: [ltr('n', true), ltr('o'), ltr('t')],
      solution: 'This is little n. Little n has one short line and one bump.' },
    { slot: 6, difficulty: 'medium', stem: 'Can you find the little letter i? Tap the letter.', prompt: null,
      choices: [ltr('i', true), ltr('o'), ltr('s')],
      solution: 'This is little i. Little i is a short line with a dot on top.' },
    { slot: 7, difficulty: 'medium', stem: 'Can you find the little letter y? Tap the letter.', prompt: null,
      choices: [ltr('y', true), ltr('o'), ltr('e')],
      solution: 'This is little y. Little y has two arms up top and a tail that hangs down low.' },
    { slot: 8, difficulty: 'hard', stem: 'Can you find the little letter u? Tap the letter.', prompt: null,
      choices: [ltr('u', true), ltr('s'), ltr('e'), ltr('a')],
      solution: 'This is little u. Little u is shaped like a cup, with a short line on one side.' },
    // Match a big letter to its little letter
    { slot: 9, difficulty: 'medium', stem: 'Look at the big letter. Tap the little letter that goes with it.', prompt: { kind: 'word', value: 'R' },
      choices: [ltr('r', true), ltr('s'), ltr('o')],
      solution: 'Big R and little r go together. They are both the letter R.' },
    { slot: 10, difficulty: 'hard', stem: 'Here is a big letter. Find its little letter partner. Tap the letter.', prompt: { kind: 'word', value: 'E' },
      choices: [ltr('e', true), ltr('t'), ltr('s')],
      solution: 'Big E and little e go together. They are both the letter E, even though they look different.' },
    // Print concepts: letter, word, number, spaces, left to right
    { slot: 11, difficulty: 'easy', stem: 'One of these is a letter, one is a number, and one is a word. Tap the word.', prompt: null,
      choices: [word('sun', true), ltr('m'), num(5)],
      solution: 'Sun is a word. A word is a group of letters put together: s, u, n.' },
    { slot: 12, difficulty: 'medium', stem: 'One of these is a letter, one is a number, and one is a word. Tap the number.', prompt: null,
      choices: [num(4, true), ltr('k'), word('hat')],
      solution: 'This is the number 4. We use numbers to count, and we use letters to make words.' },
    { slot: 13, difficulty: 'hard', stem: 'We put a little space between words so we can read them. Tap the sentence that has spaces between the words.', prompt: null,
      choices: [word('I like my dog.', true), word('Ilikemydog.')],
      solution: 'The sentence I like my dog has a space between the words, so we can see every word: I, like, my, dog.' },
    { slot: 14, difficulty: 'hard', stem: 'Look at this sentence. How many words are in it? Tap the number.', prompt: { kind: 'word', value: 'We can run.' },
      choices: [num(3, true), num(2), num(5)],
      solution: 'We read from left to right. We can point to each word: We, can, run. There is a space between each word, so we count 3 words.' },
  ],
}

export default skill
