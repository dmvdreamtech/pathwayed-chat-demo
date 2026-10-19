import type { ContentChoice, ContentSkill, PictureTile } from '../../types'

const num = (v: number, correct = false): ContentChoice => ({ text: String(v), is_correct: correct, tile: { kind: 'number', value: String(v) } })
const word = (w: string, correct = false): ContentChoice => ({ text: w, is_correct: correct, tile: { kind: 'word', value: w } })
const grp = (image: string, count: number, correct = false): ContentChoice => ({ text: `${count} ${image}s`, is_correct: correct, tile: { kind: 'object_group', image, count } })
const blocks = (tens: number, ones: number, correct = false): ContentChoice => {
  const tile: PictureTile = { kind: 'base_ten', tens, ones }
  return { text: `${tens} ten and ${ones} ones`, is_correct: correct, tile }
}

const skill: ContentSkill = {
  slug: 'math-g1-addition-within-20-more',
  subject: 'math',
  grade: 1,
  group: 'Operations and Algebraic Thinking',
  name: 'Addition Within 20',
  standards: ['1.OA.C'],
  renderMode: 'audio_picture',
  extends: 'addition-within-20',
  topUpItems: 14,
  items: [
    // Easy: fluency within 10, counting on by 1, a small double
    {
      slot: 1,
      difficulty: 'easy',
      stem: 'Here are 4 ducks and 2 more ducks. How many ducks in all? Tap the number.',
      prompt: { kind: 'object_rows', labels: false, rows: [{ image: 'duck', count: 4 }, { image: 'duck', count: 2 }] },
      choices: [num(6, true), num(5), num(7)],
      solution: 'Start at 4 and count on 2 more: five, six. 4 plus 2 is 6 ducks.',
    },
    {
      slot: 2,
      difficulty: 'easy',
      stem: 'What is 2 plus 2? Tap the group that shows the answer.',
      prompt: { kind: 'word', value: '2 + 2' },
      choices: [grp('cookie', 4, true), grp('cookie', 3), grp('cookie', 6)],
      solution: '2 plus 2 is a double. Two and two more make 4. Let\'s count: one, two, three, four cookies.',
    },
    {
      slot: 3,
      difficulty: 'easy',
      stem: 'What is 8 plus 1? Tap the number.',
      prompt: { kind: 'word', value: '8 + 1' },
      choices: [num(9, true), num(7), num(10)],
      solution: 'Adding 1 means the next number. After 8 comes 9, so 8 plus 1 is 9.',
    },
    {
      slot: 4,
      difficulty: 'easy',
      stem: 'Which one makes 5? Tap the number sentence.',
      prompt: null,
      choices: [word('4 + 1', true), word('4 + 4'), word('1 + 1')],
      solution: '4 plus 1 is 5. 4 plus 4 is 8, and 1 plus 1 is 2.',
    },

    // Medium: making ten, near doubles, ten and some ones
    {
      slot: 5,
      difficulty: 'medium',
      stem: 'Here are 9 apples and 5 apples. Move 1 apple over to make 10. How many apples in all? Tap the number.',
      prompt: { kind: 'object_rows', labels: false, rows: [{ image: 'apple', count: 9 }, { image: 'apple', count: 5 }] },
      choices: [num(14, true), num(13), num(15)],
      solution: '9 and 1 more make 10. That leaves 4 apples. 10 plus 4 is 14, so 9 plus 5 is 14.',
    },
    {
      slot: 6,
      difficulty: 'medium',
      stem: 'Which double can help you add 6 plus 5? Tap the number sentence.',
      prompt: { kind: 'word', value: '6 + 5' },
      choices: [word('5 + 5', true), word('2 + 2'), word('9 + 9')],
      solution: '5 plus 5 is 10. 6 is one more than 5, so 6 plus 5 is one more than 10. That is 11.',
    },
    {
      slot: 7,
      difficulty: 'medium',
      stem: 'Tap the blocks that show 10 plus 7.',
      prompt: { kind: 'word', value: '10 + 7' },
      choices: [blocks(1, 7, true), blocks(1, 5), blocks(1, 8)],
      solution: '10 plus 7 is 1 ten and 7 ones. That makes 17.',
    },
    {
      slot: 8,
      difficulty: 'medium',
      stem: 'Here are 8 cookies and 3 cookies. Move 2 cookies over to make 10. How many cookies in all? Tap the number.',
      prompt: { kind: 'object_rows', labels: false, rows: [{ image: 'cookie', count: 8 }, { image: 'cookie', count: 3 }] },
      choices: [num(11, true), num(10), num(12)],
      solution: '8 and 2 more make 10. There is 1 cookie left over. 10 plus 1 is 11, so 8 plus 3 is 11.',
    },
    {
      slot: 9,
      difficulty: 'medium',
      stem: 'What is 10 plus 10? Tap the number.',
      prompt: { kind: 'word', value: '10 + 10' },
      choices: [num(20, true), num(18), num(11)],
      solution: '10 plus 10 is a double. One ten and one more ten make two tens. That is 20.',
    },
    {
      slot: 10,
      difficulty: 'medium',
      stem: 'Which one makes 7? Tap the number sentence.',
      prompt: null,
      choices: [word('1 + 6', true), word('1 + 4'), word('6 + 3')],
      solution: '1 plus 6 is 7. 1 plus 4 is 5, and 6 plus 3 is 9.',
    },

    // Hard: near doubles, making ten as an equation, counting on past ten
    {
      slot: 11,
      difficulty: 'hard',
      stem: 'What is 7 plus 8? Think of a double you know. Tap the number.',
      prompt: { kind: 'word', value: '7 + 8' },
      choices: [num(15, true), num(14), num(16), num(13)],
      solution: '7 plus 7 is 14. 8 is one more than 7, so 7 plus 8 is one more than 14. That is 15.',
    },
    {
      slot: 12,
      difficulty: 'hard',
      stem: 'Which one has the same answer as 9 plus 2? Make a ten to find out. Tap the number sentence.',
      prompt: { kind: 'word', value: '9 + 2' },
      choices: [word('10 + 1', true), word('10 + 2'), word('10 + 3')],
      solution: 'Take 1 from the 2 and give it to the 9. Now we have 10 plus 1. Both make 11.',
    },
    {
      slot: 13,
      difficulty: 'hard',
      stem: 'What is 13 plus 3? Start at 13 and count on. Tap the number.',
      prompt: { kind: 'word', value: '13 + 3' },
      choices: [num(16, true), num(15), num(17)],
      solution: 'Start at 13 and count on 3: fourteen, fifteen, sixteen. 13 plus 3 is 16.',
    },
    {
      slot: 14,
      difficulty: 'hard',
      stem: 'What is 4 plus 7? Tap the group that shows the answer.',
      prompt: { kind: 'word', value: '4 + 7' },
      choices: [grp('star', 11, true), grp('star', 8), grp('star', 14)],
      solution: 'Start at 7 and count on 4: eight, nine, ten, eleven. 4 plus 7 is 11 stars.',
    },
  ],
}

export default skill
