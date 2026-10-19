import type { ContentChoice, ContentSkill, PictureTile } from '../../types'

const num = (v: number, correct = false): ContentChoice => ({ text: String(v), is_correct: correct, tile: { kind: 'number', value: String(v) } })
const pic = (image: string, correct = false, text = image): ContentChoice => ({ text, is_correct: correct, tile: { kind: 'object_group', image, count: 1 } })
const g = (image: string, count: number): PictureTile => ({ kind: 'object_group', image, count })
const grp = (image: string, count: number, text: string, correct = false): ContentChoice => ({ text, is_correct: correct, tile: g(image, count) })

const skill: ContentSkill = {
  slug: 'math-gk-comparing-numbers-more',
  extends: 'comparing-numbers',
  topUpItems: 14,
  subject: 'math',
  grade: 0,
  group: 'Counting and Cardinality',
  name: 'Comparing Numbers',
  standards: ['K.CC.C'],
  renderMode: 'audio_picture',
  items: [
    {
      slot: 1, difficulty: 'easy',
      stem: 'Look at the dogs. Which group of birds has the same number as the dogs? Tap the group.',
      prompt: g('dog', 2),
      choices: [grp('bird', 2, 'two birds', true), grp('bird', 5, 'five birds'), grp('bird', 8, 'eight birds')],
      solution: 'Let\'s count. One, two dogs. One, two birds. Two and two are the same number!',
    },
    {
      slot: 2, difficulty: 'easy',
      stem: 'Which group has more cows? Tap the group with more.',
      prompt: null,
      choices: [grp('cow', 7, 'seven cows', true), grp('cow', 2, 'two cows')],
      solution: 'One group has 7 cows. The other group has 2 cows. Seven is more than two!',
    },
    {
      slot: 3, difficulty: 'easy',
      stem: 'Which number is smaller? Tap the number.',
      prompt: null,
      choices: [num(3, true), num(10)],
      solution: 'When we count, 3 comes before 10. So 3 is smaller than 10.',
    },
    {
      slot: 4, difficulty: 'easy',
      stem: 'Each bird wants its own nest. Are there more birds or more nests? Tap the picture.',
      prompt: { kind: 'object_rows', labels: false, rows: [{ image: 'bird', count: 5 }, { image: 'nest', count: 3 }] },
      choices: [pic('bird', true), pic('nest')],
      solution: 'Give each nest one bird. Two birds have no nest. There are 5 birds and 3 nests, so there are more birds.',
    },
    {
      slot: 5, difficulty: 'medium',
      stem: 'Each rabbit gets one carrot. Count the carrots. Which group of rabbits has the same number? Tap the group.',
      prompt: g('carrot', 6),
      choices: [grp('rabbit', 6, 'six rabbits', true), grp('rabbit', 4, 'four rabbits'), grp('rabbit', 9, 'nine rabbits')],
      solution: 'There are 6 carrots. Six rabbits get one carrot each, with none left over. Six and six are the same number!',
    },
    {
      slot: 6, difficulty: 'medium',
      stem: 'Which group has fewer frogs? Tap the group with fewer.',
      prompt: null,
      choices: [grp('frog', 4, 'four frogs', true), grp('frog', 8, 'eight frogs')],
      solution: 'One group has 4 frogs. The other group has 8 frogs. Four is fewer than eight.',
    },
    {
      slot: 7, difficulty: 'medium',
      stem: 'Which number is less than 5? Tap the number.',
      prompt: null,
      choices: [num(3, true), num(7), num(9)],
      solution: 'Count up: 1, 2, 3, 4, 5. The number 3 comes before 5, so 3 is less than 5.',
    },
    {
      slot: 8, difficulty: 'medium',
      stem: 'Which number is more than 6? Tap the number.',
      prompt: null,
      choices: [num(8, true), num(2), num(4)],
      solution: 'Count up: 6, 7, 8. The number 8 comes after 6, so 8 is more than 6.',
    },
    {
      slot: 9, difficulty: 'medium',
      stem: 'Each cup gets one spoon. Are there fewer cups or fewer spoons? Tap the picture.',
      prompt: { kind: 'object_rows', labels: false, rows: [{ image: 'cup', count: 4 }, { image: 'spoon', count: 6 }] },
      choices: [pic('cup', true), pic('spoon')],
      solution: 'Put one spoon with each cup. Two spoons are left over. There are 4 cups and 6 spoons, so there are fewer cups.',
    },
    {
      slot: 10, difficulty: 'medium',
      stem: 'Here are some cupcakes. Which group of bowls has the same number as the cupcakes? Tap the group.',
      prompt: g('cupcake', 4),
      choices: [grp('bowl', 4, 'four bowls', true), grp('bowl', 2, 'two bowls'), grp('bowl', 7, 'seven bowls')],
      solution: 'Let\'s count: one, two, three, four cupcakes. Four bowls match them. Four and four are the same number!',
    },
    {
      slot: 11, difficulty: 'hard',
      stem: 'Which group has more animals? Count them carefully. Tap the group with more.',
      prompt: null,
      choices: [grp('ant', 6, 'six ants', true), grp('elephant', 3, 'three elephants')],
      solution: 'Big animals do not make a bigger number. Count them: 3 elephants and 6 ants. Six is more than three, so there are more ants.',
    },
    {
      slot: 12, difficulty: 'hard',
      stem: 'Which number is the smallest? Tap the number.',
      prompt: null,
      choices: [num(5, true), num(8), num(10)],
      solution: 'Count up: 5 comes first, then 8, then 10. So 5 is the smallest number.',
    },
    {
      slot: 13, difficulty: 'hard',
      stem: 'Count the pears. Which group of bananas has the same number as the pears? Tap the group.',
      prompt: g('pear', 8),
      choices: [grp('banana', 8, 'eight bananas', true), grp('banana', 6, 'six bananas'), grp('banana', 10, 'ten bananas')],
      solution: 'There are 8 pears. Count the bananas: eight bananas match. Eight and eight are the same number!',
    },
    {
      slot: 14, difficulty: 'hard',
      stem: 'Count the cookies. Which number is more than the number of cookies? Tap the number.',
      prompt: g('cookie', 4),
      choices: [num(7, true), num(1), num(2)],
      solution: 'There are 4 cookies. The number 7 comes after 4 when we count, so 7 is more than 4.',
    },
  ],
}

export default skill
