import type { ContentChoice, ContentSkill, PictureTile } from '../../types'

const num = (v: number, correct = false): ContentChoice => ({ text: String(v), is_correct: correct, tile: { kind: 'number', value: String(v) } })
const blocks = (tens: number, ones: number, correct = false): ContentChoice => {
  const tile: PictureTile = { kind: 'base_ten', tens, ones }
  return { text: `${tens} tens and ${ones} ones`, is_correct: correct, tile }
}

const skill: ContentSkill = {
  slug: 'math-g2-addition-within-100-more',
  subject: 'math',
  grade: 2,
  group: 'Number and Operations in Base Ten',
  name: 'Addition Within 100',
  standards: ['2.NBT.B.5'],
  renderMode: 'audio_picture',
  extends: 'addition-within-100',
  topUpItems: 14,
  items: [
    // Easy: add or take away whole tens, take away ones, tens with tens and ones with ones
    {
      slot: 1,
      difficulty: 'easy',
      stem: 'What is 43 plus 20? Add the tens to the tens. Tap the number.',
      prompt: { kind: 'word', value: '43 + 20' },
      choices: [num(63, true), num(45), num(73)],
      solution: '4 tens plus 2 tens is 6 tens. The 3 ones stay the same. So 43 plus 20 is 63.',
    },
    {
      slot: 2,
      difficulty: 'easy',
      stem: 'These blocks show 57. Take away 3 ones. What number is left? Tap the number.',
      prompt: { kind: 'base_ten', tens: 5, ones: 7 },
      choices: [num(54, true), num(60), num(44)],
      solution: '7 ones take away 3 ones leaves 4 ones. The 5 tens stay. So 57 minus 3 is 54.',
    },
    {
      slot: 3,
      difficulty: 'easy',
      stem: 'What is 68 minus 40? Take tens away from the tens. Tap the number.',
      prompt: { kind: 'word', value: '68 - 40' },
      choices: [num(28, true), num(64), num(38)],
      solution: '6 tens take away 4 tens leaves 2 tens. The 8 ones stay. So 68 minus 40 is 28.',
    },
    {
      slot: 4,
      difficulty: 'easy',
      stem: 'Which blocks show the answer to 22 plus 14? Tap the blocks.',
      prompt: { kind: 'word', value: '22 + 14' },
      choices: [blocks(3, 6, true), blocks(2, 6), blocks(3, 4)],
      solution: 'Tens with tens: 2 tens and 1 ten make 3 tens. Ones with ones: 2 and 4 make 6 ones. 3 tens and 6 ones is 36.',
    },
    // Medium: making a new ten, subtraction with tens and ones, the link between adding and subtracting
    {
      slot: 5,
      difficulty: 'medium',
      stem: 'Here are 4 tens and 12 ones. Trade 10 ones for 1 new ten. What number do the blocks show? Tap the number.',
      prompt: { kind: 'base_ten', tens: 4, ones: 12 },
      choices: [num(52, true), num(42), num(412)],
      solution: '10 of the ones make a new ten. Now there are 5 tens and 2 ones left over. That is 52.',
    },
    {
      slot: 6,
      difficulty: 'medium',
      stem: 'What is 36 plus 7? Tap the number.',
      prompt: { kind: 'word', value: '36 + 7' },
      choices: [num(43, true), num(33), num(42)],
      solution: '6 ones plus 7 ones is 13 ones. That makes a new ten with 3 ones left. 3 tens and 1 more ten is 4 tens. So 36 plus 7 is 43.',
    },
    {
      slot: 7,
      difficulty: 'medium',
      stem: 'What is 75 minus 32? Tap the number.',
      prompt: { kind: 'word', value: '75 - 32' },
      choices: [num(43, true), num(53), num(47)],
      solution: 'Tens from tens: 7 tens take away 3 tens is 4 tens. Ones from ones: 5 take away 2 is 3. So 75 minus 32 is 43.',
    },
    {
      slot: 8,
      difficulty: 'medium',
      stem: 'Kai knows that 45 plus 30 is 75. So what is 75 minus 30? Tap the number.',
      prompt: null,
      choices: [num(45, true), num(75), num(15)],
      solution: '45 and 30 make 75. If you take the 30 back away from 75, you are back at 45. Adding and taking away undo each other.',
    },
    {
      slot: 9,
      difficulty: 'medium',
      stem: 'What number plus 20 makes 86? Tap the number.',
      prompt: { kind: 'word', value: '? + 20 = 86' },
      choices: [num(66, true), num(76), num(46)],
      solution: 'Think 86 minus 20. 8 tens take away 2 tens is 6 tens, and the 6 ones stay. So 66 plus 20 makes 86.',
    },
    {
      slot: 10,
      difficulty: 'medium',
      stem: 'Listen. Rosa has 34 stickers. Rosa gets 25 more stickers. How many stickers does Rosa have now? Tap the number.',
      prompt: null,
      choices: [num(59, true), num(69), num(9)],
      solution: 'Rosa gets more, so we add. 3 tens and 2 tens make 5 tens. 4 ones and 5 ones make 9 ones. 34 plus 25 is 59 stickers.',
    },
    // Hard: breaking apart a ten to subtract, adding with a new ten, a take away story
    {
      slot: 11,
      difficulty: 'hard',
      stem: 'What is 52 minus 17? Tap the number.',
      prompt: { kind: 'word', value: '52 - 17' },
      choices: [num(35, true), num(45), num(25)],
      solution: '2 ones is not enough to take away 7. Break apart a ten: 52 is 4 tens and 12 ones. 12 take away 7 is 5. 4 tens take away 1 ten is 3 tens. So 35.',
    },
    {
      slot: 12,
      difficulty: 'hard',
      stem: 'These blocks show 63. Take away 26. You may need to break apart a ten. What number is left? Tap the number.',
      prompt: { kind: 'base_ten', tens: 6, ones: 3 },
      choices: [num(37, true), num(43), num(27)],
      solution: 'Break apart a ten so 63 is 5 tens and 13 ones. 13 ones take away 6 is 7 ones. 5 tens take away 2 tens is 3 tens. So 63 minus 26 is 37.',
    },
    {
      slot: 13,
      difficulty: 'hard',
      stem: 'What is 19 plus 57? Tap the number.',
      prompt: { kind: 'word', value: '19 + 57' },
      choices: [num(76, true), num(66), num(86)],
      solution: '9 ones plus 7 ones is 16 ones, so make a new ten with 6 ones left. 1 ten plus 5 tens plus the new ten is 7 tens. So 19 plus 57 is 76.',
    },
    {
      slot: 14,
      difficulty: 'hard',
      stem: 'Listen. A baker made 81 muffins. The baker sold 45 muffins. How many muffins are left? Tap the number.',
      prompt: null,
      choices: [num(36, true), num(44), num(26)],
      solution: 'Some were sold, so we take away. Break apart a ten: 81 is 7 tens and 11 ones. 11 take away 5 is 6. 7 tens take away 4 tens is 3 tens. 36 muffins are left.',
    },
  ],
}

export default skill
