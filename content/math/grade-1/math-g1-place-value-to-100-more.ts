import type { ContentChoice, ContentSkill, PictureTile } from '../../types'

const num = (v: number, correct = false): ContentChoice => ({ text: String(v), is_correct: correct, tile: { kind: 'number', value: String(v) } })

const tensOnes = (tens: number, ones: number): string => {
  const t = tens === 1 ? '1 ten' : `${tens} tens`
  const o = ones === 1 ? '1 one' : `${ones} ones`
  if (ones === 0) return t
  if (tens === 0) return o
  return `${t} and ${o}`
}
const blocks = (tens: number, ones: number): PictureTile => ({ kind: 'base_ten', tens, ones })
const bt = (tens: number, ones: number, correct = false): ContentChoice => ({ text: tensOnes(tens, ones), is_correct: correct, tile: blocks(tens, ones) })

const skill: ContentSkill = {
  slug: 'math-g1-place-value-to-100-more',
  subject: 'math',
  grade: 1,
  group: 'Number and Operations in Base Ten',
  name: 'Place Value to 100',
  standards: ['1.NBT.B'],
  renderMode: 'audio_picture',
  extends: 'place-value-to-100',
  topUpItems: 14,
  items: [
    // Easy: read blocks, a ten is ten ones, a teen number, compare by tens
    {
      slot: 1,
      difficulty: 'easy',
      stem: 'Look at the blocks. Count the tens, then count the ones. What number do the blocks show? Tap the number.',
      prompt: blocks(6, 1),
      choices: [num(61, true), num(16), num(51)],
      solution: 'Let\'s count the tens: 10, 20, 30, 40, 50, 60. Then 1 one more. 6 tens and 1 one make 61.',
    },
    {
      slot: 2,
      difficulty: 'easy',
      stem: 'Here are 10 little cubes. Each cube is one. If we bundle all 10 ones together, what do we make? Tap the blocks.',
      prompt: blocks(0, 10),
      choices: [bt(1, 0, true), bt(0, 1), bt(2, 0)],
      solution: '10 ones bundled together make 1 ten. A ten is one long stick of 10 cubes.',
    },
    {
      slot: 3,
      difficulty: 'easy',
      stem: 'The number 14 is 1 ten and some ones. How many ones are in 14? Tap the number.',
      prompt: blocks(1, 4),
      choices: [num(4, true), num(1), num(14)],
      solution: '14 is 1 ten and 4 ones. The 1 tells the tens, and the 4 tells the ones.',
    },
    {
      slot: 4,
      difficulty: 'easy',
      stem: 'Which number is greater, 36 or 63? Tap the number.',
      prompt: null,
      choices: [num(63, true), num(36)],
      solution: '63 has 6 tens. 36 has only 3 tens. 6 tens is more than 3 tens, so 63 is greater than 36.',
    },
    // Medium: build numbers with blocks, decade numbers, teens, compare
    {
      slot: 5,
      difficulty: 'medium',
      stem: 'Tap the blocks that show 93.',
      prompt: null,
      choices: [bt(9, 3, true), bt(3, 9), bt(9, 0)],
      solution: '93 is 9 tens and 3 ones. That is 9 long tens and 3 little ones.',
    },
    {
      slot: 6,
      difficulty: 'medium',
      stem: 'The number 90 is 9 tens. How many ones are in 90? Tap the number.',
      prompt: blocks(9, 0),
      choices: [num(0, true), num(9), num(90)],
      solution: '90 is 9 tens and 0 ones. The 0 in 90 tells us there are no extra ones.',
    },
    {
      slot: 7,
      difficulty: 'medium',
      stem: 'Which number is less, 67 or 76? Tap the number.',
      prompt: null,
      choices: [num(67, true), num(76)],
      solution: '67 has 6 tens and 76 has 7 tens. 6 tens is less than 7 tens, so 67 is less than 76.',
    },
    {
      slot: 8,
      difficulty: 'medium',
      stem: 'Tap the blocks that show 18.',
      prompt: null,
      choices: [bt(1, 8, true), bt(8, 1), bt(0, 8)],
      solution: '18 is 1 ten and 8 ones. One long ten and 8 little ones make 18.',
    },
    {
      slot: 9,
      difficulty: 'medium',
      stem: 'Which number is equal to 7 tens and 4 ones? Tap the number.',
      prompt: null,
      choices: [num(74, true), num(47), num(11)],
      solution: '7 tens is 70, and 4 more ones makes 74. So 7 tens and 4 ones is equal to 74. The tens digit comes first when we write 74.',
    },
    {
      slot: 10,
      difficulty: 'medium',
      stem: 'Look at 87 and 82. Which sign goes where the question mark is, to make it true? Tap the sign.',
      prompt: { kind: 'word', value: '87 ? 82' },
      choices: [
        { text: '>', is_correct: true, tile: { kind: 'word', value: '>' } },
        { text: '<', is_correct: false, tile: { kind: 'word', value: '<' } },
        { text: '=', is_correct: false, tile: { kind: 'word', value: '=' } },
      ],
      solution: 'Both numbers have 8 tens, so we look at the ones: 7 ones is more than 2 ones. 87 is greater than 82, so we use the greater than sign. Its open mouth faces the bigger number, 87.',
    },
    // Hard: compare three numbers, tens beat ones, regroup ones into a ten
    {
      slot: 11,
      difficulty: 'hard',
      stem: 'Which number is the biggest: 95, 59, or 88? Tap the number.',
      prompt: null,
      choices: [num(95, true), num(59), num(88)],
      solution: '95 has 9 tens. 88 has 8 tens and 59 has 5 tens. 9 tens is the most, so 95 is the biggest.',
    },
    {
      slot: 12,
      difficulty: 'hard',
      stem: 'Which number is less, 71 or 68? Tap the number.',
      prompt: null,
      choices: [num(68, true), num(71)],
      solution: 'Look at the tens first. 68 has 6 tens and 71 has 7 tens. 6 tens is less, so 68 is less than 71.',
    },
    {
      slot: 13,
      difficulty: 'hard',
      stem: 'Look at the tens first, then the ones. Tap the blocks that show the biggest number.',
      prompt: null,
      choices: [bt(7, 3, true), bt(6, 9), bt(4, 8)],
      solution: '7 tens and 3 ones is 73. That has the most tens, so 73 is bigger than 69 and 48, even with fewer ones.',
    },
    {
      slot: 14,
      difficulty: 'hard',
      stem: 'Here are 15 ones. Make a ten from 10 of them. How many tens and ones is that? Tap the blocks.',
      prompt: blocks(0, 15),
      choices: [bt(1, 5, true), bt(5, 1), bt(1, 0)],
      solution: '10 of the ones make 1 ten, and 5 ones are left over. 15 is 1 ten and 5 ones.',
    },
  ],
}

export default skill
