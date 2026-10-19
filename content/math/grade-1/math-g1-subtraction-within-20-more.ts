import type { ContentChoice, ContentSkill, PictureTile } from '../../types'

const num = (v: number, correct = false): ContentChoice => ({ text: String(v), is_correct: correct, tile: { kind: 'number', value: String(v) } })
const word = (w: string, correct = false): ContentChoice => ({ text: w, is_correct: correct, tile: { kind: 'word', value: w } })
const grp = (image: string, count: number, text: string, correct = false): ContentChoice => ({
  text,
  is_correct: correct,
  tile: { kind: 'object_group', image, count } satisfies PictureTile,
})
const group = (image: string, count: number) => ({ kind: 'object_group' as const, image, count })

const skill: ContentSkill = {
  slug: 'math-g1-subtraction-within-20-more',
  subject: 'math',
  grade: 1,
  group: 'Operations and Algebraic Thinking',
  name: 'Subtraction Within 20',
  standards: ['1.OA.C'],
  renderMode: 'audio_picture',
  extends: 'subtraction-within-20',
  topUpItems: 14,
  items: [
    // Easy: picture groups, counting back, fluency within 10
    {
      slot: 1,
      difficulty: 'easy',
      stem: 'Listen. 8 ducks are in the pond. 3 ducks swim away. How many ducks are left? Tap the number.',
      prompt: group('duck', 8),
      choices: [num(5, true), num(11), num(3)],
      solution: 'Start with 8 ducks and take away 3. Count back: seven, six, five. 5 ducks are left.',
    },
    {
      slot: 2,
      difficulty: 'easy',
      stem: 'What is 9 minus 5? Tap the number.',
      prompt: null,
      choices: [num(4, true), num(14), num(6)],
      solution: '9 minus 5 is 4, because 5 plus 4 makes 9.',
    },
    {
      slot: 3,
      difficulty: 'easy',
      stem: 'Start at 7. Count back 1. What number do you land on? Tap the number.',
      prompt: null,
      choices: [num(6, true), num(8), num(1)],
      solution: 'One less than 7 is 6. So 7 minus 1 is 6.',
    },
    {
      slot: 4,
      difficulty: 'easy',
      stem: 'Listen. There are 6 cookies on a plate. Lena eats 4 cookies. Which picture shows the cookies that are left? Tap the picture.',
      prompt: group('cookie', 6),
      choices: [grp('cookie', 2, 'two cookies', true), grp('cookie', 4, 'four cookies'), grp('cookie', 6, 'six cookies')],
      solution: '6 cookies take away 4 cookies leaves 2 cookies. 6 minus 4 is 2.',
    },

    // Medium: making ten, counting up, the related addition fact
    {
      slot: 5,
      difficulty: 'medium',
      stem: 'What is 15 minus 6? You can take away 5 to get to 10, then take away 1 more. Tap the number.',
      prompt: null,
      choices: [num(9, true), num(11), num(21)],
      solution: '15 minus 5 is 10. Then 10 minus 1 is 9. So 15 minus 6 is 9.',
    },
    {
      slot: 6,
      difficulty: 'medium',
      stem: 'What is 12 minus 9? Think: 9 plus what number makes 12? Tap the number.',
      prompt: null,
      choices: [num(3, true), num(21), num(9)],
      solution: '9 plus 3 makes 12. So 12 minus 9 is 3.',
    },
    {
      slot: 7,
      difficulty: 'medium',
      stem: 'To find 11 minus 8, start at 8 and count up to 11. How many numbers did you count? Tap the number.',
      prompt: null,
      choices: [num(3, true), num(8), num(19)],
      solution: 'Start at 8 and count up: nine, ten, eleven. That is 3 numbers. So 11 minus 8 is 3.',
    },
    {
      slot: 8,
      difficulty: 'medium',
      stem: 'Listen. Omar has 10 apples and 7 pears. How many more apples than pears does Omar have? Tap the number.',
      prompt: { kind: 'object_rows', labels: false, rows: [{ image: 'apple', count: 10 }, { image: 'pear', count: 7 }] },
      choices: [num(3, true), num(17), num(7)],
      solution: 'Match each pear with an apple. 3 apples have no pear. 10 minus 7 is 3.',
    },
    {
      slot: 9,
      difficulty: 'medium',
      stem: 'Listen. Kai has 7 crayons. Kai wants 12 crayons. How many more crayons does Kai need? Tap the number.',
      prompt: group('crayon', 7),
      choices: [num(5, true), num(19), num(7)],
      solution: 'Count up from 7 to 12: eight, nine, ten, eleven, twelve. That is 5 more. 12 minus 7 is 5.',
    },
    {
      slot: 10,
      difficulty: 'medium',
      stem: 'What is 10 minus 8? Tap the number.',
      prompt: null,
      choices: [num(2, true), num(18), num(8)],
      solution: '8 plus 2 makes 10. So 10 minus 8 is 2.',
    },

    // Hard: teen numbers with making ten and related facts
    {
      slot: 11,
      difficulty: 'hard',
      stem: 'What is 17 minus 8? Tap the number.',
      prompt: null,
      choices: [num(9, true), num(11), num(25)],
      solution: 'Take away 7 to get to 10. Then take away 1 more to get 9. So 17 minus 8 is 9.',
    },
    {
      slot: 12,
      difficulty: 'hard',
      stem: 'Which one makes 7? Look at each one. Tap it.',
      prompt: null,
      choices: [word('16 - 9', true), word('14 - 8'), word('13 - 5')],
      solution: '9 plus 7 makes 16, so 16 minus 9 is 7. 14 minus 8 is 6, and 13 minus 5 is 8.',
    },
    {
      slot: 13,
      difficulty: 'hard',
      stem: 'What is 13 minus 8? Think of an adding fact you know. Tap the number.',
      prompt: null,
      choices: [num(5, true), num(21), num(8)],
      solution: '8 plus 5 makes 13. So 13 minus 8 is 5.',
    },
    {
      slot: 14,
      difficulty: 'hard',
      stem: 'Which one is the same as 16 minus 7? Look at each one. Tap it.',
      prompt: null,
      choices: [word('16 - 6 - 1', true), word('16 - 6 - 3'), word('16 - 1 - 1')],
      solution: 'Break 7 into 6 and 1. 16 minus 6 is 10, and 10 minus 1 is 9. So 16 minus 7 is 9.',
    },
  ],
}

export default skill
