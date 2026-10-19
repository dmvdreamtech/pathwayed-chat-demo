import type { ContentChoice, ContentSkill } from '../../types'

const num = (v: number, correct = false): ContentChoice => ({ text: String(v), is_correct: correct, tile: { kind: 'number', value: String(v) } })
const grp = (image: string, count: number, correct = false): ContentChoice => ({ text: String(count), is_correct: correct, tile: { kind: 'object_group', image, count } })

const skill: ContentSkill = {
  slug: 'math-gk-counting-more',
  subject: 'math',
  grade: 0,
  group: 'Counting and Cardinality',
  name: 'Counting',
  standards: ['K.CC.B'],
  renderMode: 'audio_picture',
  extends: 'counting',
  topUpItems: 12,
  items: [
    // --- Easy: the last number tells how many, one more, a small array, count out a group ---
    {
      slot: 1,
      difficulty: 'easy',
      stem: 'Listen. Kai touches each frog and counts: one, two, three, four, five. How many frogs are there? Tap the number.',
      prompt: { kind: 'object_group', image: 'frog', count: 5 },
      choices: [num(5, true), num(1), num(3)],
      solution: 'The last number Kai says tells how many. Kai stops at five, so there are 5 frogs!',
    },
    {
      slot: 2,
      difficulty: 'easy',
      stem: 'Here are 3 cupcakes. One more cupcake comes. How many cupcakes are there now? Tap the number.',
      prompt: { kind: 'object_group', image: 'cupcake', count: 3 },
      choices: [num(4, true), num(3), num(6)],
      solution: 'One more than 3 is the next number we count: 1, 2, 3, 4. Now there are 4 cupcakes!',
    },
    {
      slot: 3,
      difficulty: 'easy',
      stem: 'The birds sit in rows. How many birds do you see? Tap the number.',
      prompt: { kind: 'array', image: 'bird', rows: 2, cols: 3 },
      choices: [num(6, true), num(3), num(9)],
      solution: "Let's count each bird one time: one, two, three, four, five, six. There are 6 birds!",
    },
    {
      slot: 4,
      difficulty: 'easy',
      stem: 'Listen. Ella needs 4 spoons for the table. Which group has 4 spoons? Tap the picture.',
      prompt: null,
      choices: [grp('spoon', 4, true), grp('spoon', 2), grp('spoon', 7)],
      solution: "Let's count out spoons: one, two, three, four. Stop at four. That group has 4 spoons for Ella!",
    },
    // --- Medium: counts to 12, staying the same when moved, one more, counting out ---
    {
      slot: 5,
      difficulty: 'medium',
      stem: 'The eggs are in two rows. How many eggs do you see? Tap the number.',
      prompt: { kind: 'array', image: 'egg', rows: 2, cols: 5 },
      choices: [num(10, true), num(5), num(8)],
      solution: "Let's count across each row: one, two, three, four, five, six, seven, eight, nine, ten. There are 10 eggs!",
    },
    {
      slot: 6,
      difficulty: 'medium',
      stem: 'Listen. Nia counts 6 toy cars. Then Nia moves the cars around. No cars are added, and none are taken away. How many cars are there now? Tap the number.',
      prompt: { kind: 'object_group', image: 'car', count: 6 },
      choices: [num(6, true), num(4), num(8)],
      solution: 'Moving the cars does not change how many there are. Count them: one, two, three, four, five, six. Still 6 cars!',
    },
    {
      slot: 7,
      difficulty: 'medium',
      stem: 'Here are 8 boats. One more boat sails in. How many boats are there now? Tap the number.',
      prompt: { kind: 'object_group', image: 'boat', count: 8 },
      choices: [num(9, true), num(8), num(6)],
      solution: 'One more than 8 is the next number: 7, 8, 9. Now there are 9 boats!',
    },
    {
      slot: 8,
      difficulty: 'medium',
      stem: 'Listen. Omar wants to fill a basket with 9 acorns. Which group has 9 acorns? Tap the picture.',
      prompt: null,
      choices: [grp('acorn', 9, true), grp('acorn', 6), grp('acorn', 12)],
      solution: "Let's count out acorns and stop at nine: one, two, three, four, five, six, seven, eight, nine. That group has 9 acorns!",
    },
    {
      slot: 9,
      difficulty: 'medium',
      stem: 'How many carrots do you see? Tap the number.',
      prompt: { kind: 'object_group', image: 'carrot', count: 12 },
      choices: [num(12, true), num(10), num(15)],
      solution: "Let's touch each carrot and count: one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve. There are 12 carrots!",
    },
    // --- Hard: counts to 20 in a line or an array, one more after a teen number ---
    {
      slot: 10,
      difficulty: 'hard',
      stem: 'The shells are in rows. How many shells do you see? Tap the number.',
      prompt: { kind: 'array', image: 'shell', rows: 4, cols: 5 },
      choices: [num(20, true), num(16), num(18)],
      solution: 'Count each shell one time, row by row. The first row ends at five, the next row at ten, then fifteen, then twenty. There are 20 shells!',
    },
    {
      slot: 11,
      difficulty: 'hard',
      stem: 'How many pencils do you see? Count carefully. Tap the number.',
      prompt: { kind: 'object_group', image: 'pencil', count: 17 },
      choices: [num(17, true), num(14), num(19)],
      solution: 'Count each pencil one time. After ten, keep going: eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen. There are 17 pencils!',
    },
    {
      slot: 12,
      difficulty: 'hard',
      stem: 'Count the bugs. Then one more bug crawls in. How many bugs are there now? Tap the number.',
      prompt: { kind: 'object_group', image: 'bug', count: 13 },
      choices: [num(14, true), num(13), num(11)],
      solution: 'There are 13 bugs. One more than 13 is the next number we count: 12, 13, 14. Now there are 14 bugs!',
    },
  ],
}

export default skill
