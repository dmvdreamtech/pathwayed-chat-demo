import type { ContentChoice, ContentItem, ContentSkill } from '../../types'

const num = (v: number, correct = false): ContentChoice => ({ text: String(v), is_correct: correct, tile: { kind: 'number', value: String(v) } })
const word = (w: string, correct = false): ContentChoice => ({ text: w, is_correct: correct, tile: { kind: 'word', value: w } })
const group = (image: string, count: number, text: string, correct = false): ContentChoice => ({ text, is_correct: correct, tile: { kind: 'object_group', image, count } })
const tf = (isTrue: boolean): ContentChoice[] => [word('true', isTrue), word('false', !isTrue)]
const eq = (value: string) => ({ kind: 'word' as const, value })

const items: ContentItem[] = [
  // Easy
  {
    slot: 1, difficulty: 'easy', stem: 'Listen. 6 equals 6. Is that true or false? Tap the word.', prompt: eq('6 = 6'),
    choices: tf(true), solution: 'True! 6 is the same as 6. The equal sign means both sides are the same.',
  },
  {
    slot: 2, difficulty: 'easy', stem: 'Listen. 4 equals 5. Is that true or false? Tap the word.', prompt: eq('4 = 5'),
    choices: tf(false), solution: 'False. 4 is not the same as 5, so 4 equals 5 is not true.',
  },
  {
    slot: 3, difficulty: 'easy', stem: '3 plus 2 equals what number? Tap the number.', prompt: eq('3 + 2 = ?'),
    choices: [num(5, true), num(6), num(1)], solution: '3 and 2 more make 5: 4, 5. So 3 plus 2 equals 5.',
  },
  {
    slot: 4, difficulty: 'easy', stem: 'Here are 4 apples. Tap the group of stars that is the same number as the apples.', prompt: { kind: 'object_group', image: 'apple', count: 4 },
    choices: [group('star', 4, 'four stars', true), group('star', 2, 'two stars'), group('star', 6, 'six stars')],
    solution: '4 apples and 4 stars. They are the same number! The equal sign means the same as.',
  },
  {
    slot: 5, difficulty: 'easy', stem: 'Listen. 2 plus 2 equals 4. Is that true or false? Tap the word.', prompt: eq('2 + 2 = 4'),
    choices: tf(true), solution: 'True! 2 and 2 more make 4, so both sides are 4.',
  },
  {
    slot: 6, difficulty: 'easy', stem: 'Look at each one. Which one is true? Tap the true one.', prompt: null,
    choices: [word('1 + 1 = 2', true), word('1 + 1 = 3'), word('1 + 1 = 5')],
    solution: '1 and 1 more make 2. So 1 plus 1 equals 2 is true!',
  },
  {
    slot: 7, difficulty: 'easy', stem: '5 plus 1 equals what number? Tap the number.', prompt: eq('5 + 1 = ?'),
    choices: [num(6, true), num(8), num(4)], solution: '1 more than 5 is 6. So 5 plus 1 equals 6.',
  },
  {
    slot: 8, difficulty: 'easy', stem: 'Listen. 3 plus 0 equals 3. Is that true or false? Tap the word.', prompt: eq('3 + 0 = 3'),
    choices: tf(true), solution: 'True! Adding 0 adds nothing, so 3 plus 0 is still 3.',
  },
  {
    slot: 9, difficulty: 'easy', stem: 'Listen. 5 equals 2. Is that true or false? Tap the word.', prompt: eq('5 = 2'),
    choices: tf(false), solution: 'False. 5 and 2 are not the same number, so 5 equals 2 is not true.',
  },
  {
    slot: 10, difficulty: 'easy', stem: '4 plus what number equals 5? Tap the number.', prompt: eq('4 + ? = 5'),
    choices: [num(1, true), num(9), num(5)], solution: 'Count on from 4 to 5. That is just 1 more. 4 plus 1 equals 5.',
  },
  {
    slot: 11, difficulty: 'easy', stem: '6 minus 1 equals what number? Tap the number.', prompt: eq('6 - 1 = ?'),
    choices: [num(5, true), num(7), num(3)], solution: 'Take 1 away from 6 and 5 are left. 6 minus 1 equals 5.',
  },
  {
    slot: 12, difficulty: 'easy', stem: 'Tap the group that is the same as 2 plus 1.', prompt: null,
    choices: [group('ball', 3, 'three balls', true), group('ball', 2, 'two balls'), group('ball', 5, 'five balls')],
    solution: '2 plus 1 makes 3. So 3 balls is the same as 2 plus 1.',
  },
  // Medium
  {
    slot: 13, difficulty: 'medium', stem: 'Listen. 7 equals 8 minus 1. Is that true or false? Tap the word.', prompt: eq('7 = 8 - 1'),
    choices: tf(true), solution: 'True! 8 minus 1 is 7, so both sides are 7.',
  },
  {
    slot: 14, difficulty: 'medium', stem: 'Listen. 5 plus 2 equals 2 plus 5. Is that true or false? Tap the word.', prompt: eq('5 + 2 = 2 + 5'),
    choices: tf(true), solution: 'True! 5 plus 2 is 7, and 2 plus 5 is 7 too. Both sides are the same.',
  },
  {
    slot: 15, difficulty: 'medium', stem: 'Listen. 9 equals 4 plus 4. Is that true or false? Tap the word.', prompt: eq('9 = 4 + 4'),
    choices: tf(false), solution: 'False. 4 plus 4 is 8, not 9. The two sides are not the same.',
  },
  {
    slot: 16, difficulty: 'medium', stem: '8 plus what number equals 11? Tap the number.', prompt: eq('8 + ? = 11'),
    choices: [num(3, true), num(5), num(11)], solution: 'Count on from 8: 9, 10, 11. That is 3 more. 8 plus 3 equals 11.',
  },
  {
    slot: 17, difficulty: 'medium', stem: 'What number equals 4 plus 5? Tap the number.', prompt: eq('? = 4 + 5'),
    choices: [num(9, true), num(1), num(7)], solution: '4 plus 5 is 9. The answer can come first: 9 equals 4 plus 5.',
  },
  {
    slot: 18, difficulty: 'medium', stem: 'Listen. 8 equals 3 plus 5. Is that true or false? Tap the word.', prompt: eq('8 = 3 + 5'),
    choices: tf(true), solution: 'True! 3 plus 5 is 8. The total can be on either side of the equal sign.',
  },
  {
    slot: 19, difficulty: 'medium', stem: 'Look at each one. Which of these is true? Tap the true one.', prompt: null,
    choices: [word('6 = 3 + 3', true), word('6 = 3 + 4'), word('6 = 2 + 2')],
    solution: '3 plus 3 is 6, so 6 equals 3 plus 3 is true. Both sides are 6!',
  },
  {
    slot: 20, difficulty: 'medium', stem: '10 minus what number equals 7? Tap the number.', prompt: eq('10 - ? = 7'),
    choices: [num(3, true), num(5), num(7)], solution: 'Count back from 10: 9, 8, 7. That is 3. 10 minus 3 equals 7.',
  },
  {
    slot: 21, difficulty: 'medium', stem: 'There are 5 cats and 3 dogs. How many more dogs would make the dogs the same as the cats? Tap the number.',
    prompt: { kind: 'object_rows', rows: [{ image: 'cat', count: 5 }, { image: 'dog', count: 3 }] },
    choices: [num(2, true), num(3), num(8)], solution: '3 dogs and 2 more make 5 dogs. Then 5 cats and 5 dogs are the same!',
  },
  {
    slot: 22, difficulty: 'medium', stem: 'One of these is false. Look at each one, then tap the false one.', prompt: null,
    choices: [word('2 + 3 = 5'), word('5 = 5'), word('2 + 3 = 6', true)],
    solution: '2 plus 3 is 5, not 6. So 2 plus 3 equals 6 is false.',
  },
  {
    slot: 23, difficulty: 'medium', stem: 'What number plus 2 equals 6? Tap the number.', prompt: eq('? + 2 = 6'),
    choices: [num(4, true), num(8), num(6)], solution: 'What number and 2 more make 6? 4 and 2 more make 6. So 4 plus 2 equals 6.',
  },
  {
    slot: 24, difficulty: 'medium', stem: 'Listen. 9 minus 2 equals 3 plus 4. Is that true or false? Tap the word.', prompt: eq('9 - 2 = 3 + 4'),
    choices: tf(true), solution: 'True! 9 minus 2 is 7, and 3 plus 4 is 7. Both sides are 7.',
  },
  {
    slot: 25, difficulty: 'medium', stem: 'Listen. 6 plus 3 equals 3 plus 5. Is that true or false? Tap the word.', prompt: eq('6 + 3 = 3 + 5'),
    choices: tf(false), solution: 'False. 6 plus 3 is 9, but 3 plus 5 is 8. The two sides are not the same.',
  },
  {
    slot: 26, difficulty: 'medium', stem: 'Tap the group that is the same as 9 minus 3.', prompt: null,
    choices: [group('star', 6, 'six stars', true), group('star', 9, 'nine stars'), group('star', 3, 'three stars')],
    solution: '9 minus 3 is 6. So 6 stars is the same as 9 minus 3.',
  },
  {
    slot: 27, difficulty: 'medium', stem: '12 minus what number equals 8? Tap the number.', prompt: eq('12 - ? = 8'),
    choices: [num(4, true), num(6), num(8)], solution: 'Count back from 12: 11, 10, 9, 8. That is 4. 12 minus 4 equals 8.',
  },
  {
    slot: 28, difficulty: 'medium', stem: '15 equals 8 plus what number? Tap the number.', prompt: eq('15 = 8 + ?'),
    choices: [num(7, true), num(9), num(15)], solution: 'Count on from 8 to 15: 9, 10, 11, 12, 13, 14, 15. That is 7. 15 equals 8 plus 7.',
  },
  {
    slot: 29, difficulty: 'medium', stem: 'Only one of these has two sides that are the same. Tap the true one.', prompt: null,
    choices: [word('4 + 6 = 6 + 4', true), word('4 + 6 = 6 + 5'), word('4 + 6 = 4 + 4')],
    solution: '4 plus 6 is 10, and 6 plus 4 is 10 too. Switching the order keeps the same amount!',
  },
  {
    slot: 30, difficulty: 'medium', stem: 'Listen. Leo has 5 shells. Maya has 2 shells and finds some more. Now they have the same number. How many shells did Maya find? Tap the number.',
    prompt: { kind: 'object_rows', rows: [{ image: 'shell', count: 5 }, { image: 'shell', count: 2 }] },
    choices: [num(3, true), num(5), num(7)], solution: 'Maya needs 5, the same as Leo. 2 and 3 more make 5. So 2 plus 3 equals 5.',
  },
  // Hard
  {
    slot: 31, difficulty: 'hard', stem: '6 plus 4 equals what number plus 4? Tap the number.', prompt: eq('6 + 4 = ? + 4'),
    choices: [num(6, true), num(10), num(4)], solution: 'Both sides add 4, so the missing number is 6. 6 plus 4 equals 6 plus 4. Both sides make 10.',
  },
  {
    slot: 32, difficulty: 'hard', stem: '8 plus 2 equals what number plus 3? Tap the number.', prompt: eq('8 + 2 = ? + 3'),
    choices: [num(7, true), num(10), num(5)], solution: '8 plus 2 is 10. What number plus 3 is 10? 7 plus 3 is 10. So the missing number is 7.',
  },
  {
    slot: 33, difficulty: 'hard', stem: '5 plus what number equals 4 plus 6? Tap the number.', prompt: eq('5 + ? = 4 + 6'),
    choices: [num(5, true), num(6), num(10)], solution: '4 plus 6 is 10. 5 plus 5 is 10 too. So the missing number is 5.',
  },
  {
    slot: 34, difficulty: 'hard', stem: 'Listen. 4 plus 9 equals 5 plus 8. Is that true or false? Tap the word.', prompt: eq('4 + 9 = 5 + 8'),
    choices: tf(true), solution: 'True! 4 plus 9 is 13, and 5 plus 8 is 13. Different numbers can still make the same amount.',
  },
  {
    slot: 35, difficulty: 'hard', stem: 'Listen. 9 minus 2 equals 6 plus 2. Is that true or false? Tap the word.', prompt: eq('9 - 2 = 6 + 2'),
    choices: tf(false), solution: 'False. 9 minus 2 is 7, but 6 plus 2 is 8. The two sides are not the same.',
  },
  {
    slot: 36, difficulty: 'hard', stem: 'Both sides must make the same amount. Which one is true? Tap it.', prompt: null,
    choices: [word('8 + 6 = 9 + 5', true), word('8 + 6 = 8 + 7'), word('8 + 6 = 9 + 4')],
    solution: '8 plus 6 is 14, and 9 plus 5 is 14 too. Both sides are 14, so that one is true!',
  },
  {
    slot: 37, difficulty: 'hard', stem: '9 minus what number equals 3 plus 2? Tap the number.', prompt: eq('9 - ? = 3 + 2'),
    choices: [num(4, true), num(5), num(6)], solution: '3 plus 2 is 5. 9 minus 4 is 5 too. So the missing number is 4.',
  },
  {
    slot: 38, difficulty: 'hard', stem: '7 plus 6 equals 6 plus what number? Tap the number.', prompt: eq('7 + 6 = 6 + ?'),
    choices: [num(7, true), num(13), num(6)], solution: 'Switching the order keeps the same amount. 7 plus 6 equals 6 plus 7. Both make 13.',
  },
  {
    slot: 39, difficulty: 'hard', stem: 'What number minus 6 equals 9 minus 3? Tap the number.', prompt: eq('? - 6 = 9 - 3'),
    choices: [num(12, true), num(6), num(3)], solution: '9 minus 3 is 6. 12 minus 6 is 6 too. So the missing number is 12.',
  },
  {
    slot: 40, difficulty: 'hard', stem: 'Two of these are true and one is false. Tap the false one.', prompt: null,
    choices: [word('9 + 1 = 5 + 5'), word('9 + 1 = 10'), word('9 + 1 = 8 + 3', true)],
    solution: '9 plus 1 is 10, but 8 plus 3 is 11. The sides are not the same, so that one is false.',
  },
]

const skill: ContentSkill = {
  slug: 'math-g1-equations-and-the-equal-sign',
  subject: 'math',
  grade: 1,
  group: 'Operations and Algebraic Thinking',
  name: 'Equations and the Equal Sign',
  standards: ['1.OA.D'],
  renderMode: 'audio_picture',
  items,
}

export default skill
