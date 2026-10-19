import type { ContentChoice, ContentSkill, PictureTile } from '../../types'

const num = (v: number, correct = false): ContentChoice => ({ text: String(v), is_correct: correct, tile: { kind: 'number', value: String(v) } })
const word = (w: string, correct = false): ContentChoice => ({ text: w, is_correct: correct, tile: { kind: 'word', value: w } })
const time = (hour: number, minute: number): string => `${hour}:${String(minute).padStart(2, '0')}`
const clock = (hour: number, minute: number): PictureTile => ({ kind: 'clock', hour, minute })
const clk = (hour: number, minute: number, correct = false): ContentChoice => ({ text: time(hour, minute), is_correct: correct, tile: clock(hour, minute) })
const coins = (n: number, image: string, name: string, correct = false): ContentChoice => ({ text: `${n} ${name}`, is_correct: correct, tile: { kind: 'object_group', image, count: n } })

const skill: ContentSkill = {
  slug: 'math-g2-money-place-value-more',
  subject: 'math',
  grade: 2,
  group: 'Measurement and Data',
  name: 'Money',
  standards: ['2.MD.C'],
  renderMode: 'audio_picture',
  extends: 'money-place-value',
  topUpItems: 14,
  items: [
    // Easy: count minutes by fives, read a clock, find a clock, count a small mix of coins
    {
      slot: 1,
      difficulty: 'easy',
      stem: 'Look at the clock. The short hand tells the hour. The long hand tells the minutes, and we count by fives for each number it passes. What time is it? Tap the time.',
      prompt: clock(6, 15),
      choices: [word('6:15', true), word('6:03'), word('3:30')],
      solution: 'The short hand is just past six. The long hand points to three, so count by fives: 5, 10, 15. It is 6:15.',
    },
    {
      slot: 2,
      difficulty: 'easy',
      stem: 'Look at the long hand. Each number on the clock means 5 more minutes. How many minutes after the hour is it? Tap the number.',
      prompt: clock(2, 20),
      choices: [num(20, true), num(4), num(40)],
      solution: 'The long hand points to four. Count by fives four times: 5, 10, 15, 20. It is 20 minutes after two.',
    },
    {
      slot: 3,
      difficulty: 'easy',
      stem: 'Tap the clock that shows ten minutes after eight.',
      prompt: null,
      choices: [clk(8, 10, true), clk(10, 40), clk(8, 50)],
      solution: 'Ten minutes after eight has the short hand just past eight and the long hand on two. Count by fives: 5, 10.',
    },
    {
      slot: 4,
      difficulty: 'easy',
      stem: 'Listen. Kai has these 2 dimes, and 3 pennies too. How many cents does Kai have in all? Tap the number.',
      prompt: { kind: 'object_group', image: 'dime', count: 2 },
      choices: [num(23, true), num(5), num(50)],
      solution: 'Count the dimes by tens: 10, 20. Then count on the pennies by ones: 21, 22, 23. That is 23 cents.',
    },
    // Medium: hour hand near the next hour, a.m. and p.m., where the long hand points, mixed coins
    {
      slot: 5,
      difficulty: 'medium',
      stem: 'Look at the clock. The short hand is close to the next number, but it has not reached it yet. What time is it? Tap the time.',
      prompt: clock(9, 45),
      choices: [word('9:45', true), word('10:45'), word('9:09')],
      solution: 'The short hand is between nine and ten, so the hour is still nine. The long hand is on nine, which means 45 minutes. It is 9:45.',
    },
    {
      slot: 6,
      difficulty: 'medium',
      stem: 'Listen. Maya eats breakfast at this time, before going to school. Is it a.m. or p.m.? Tap the time.',
      prompt: clock(7, 30),
      choices: [word('7:30 a.m.', true), word('7:30 p.m.')],
      solution: 'Times in the morning, from midnight until noon, are a.m. Breakfast before school is in the morning, so it is 7:30 a.m.',
    },
    {
      slot: 7,
      difficulty: 'medium',
      stem: 'Listen. Leo goes to bed at this time, when the sky is dark. Is it a.m. or p.m.? Tap the time.',
      prompt: clock(8, 25),
      choices: [word('8:25 p.m.', true), word('8:25 a.m.')],
      solution: 'Times after noon, in the afternoon and night, are p.m. Bedtime is at night, so it is 8:25 p.m.',
    },
    {
      slot: 8,
      difficulty: 'medium',
      stem: 'The time is 4:35. Which number does the long minute hand point to? Tap the number.',
      prompt: { kind: 'word', value: '4:35' },
      choices: [num(7, true), num(35), num(4)],
      solution: 'Count by fives around the clock: 5, 10, 15, 20, 25, 30, 35. That is seven numbers, so the long hand points to seven.',
    },
    {
      slot: 9,
      difficulty: 'medium',
      stem: 'Listen. Pat has one quarter, and these 3 nickels too. How many cents does Pat have in all? Tap the number.',
      prompt: { kind: 'object_group', image: 'nickel', count: 3 },
      choices: [num(40, true), num(4), num(28)],
      solution: 'Start with the quarter: 25. Then count on the nickels by fives: 30, 35, 40. Pat has 40 cents.',
    },
    {
      slot: 10,
      difficulty: 'medium',
      stem: 'Listen. Ana has these 2 quarters in a piggy bank, and 1 dime too. How many cents does Ana have in all? Tap the number.',
      prompt: { kind: 'object_group', image: 'quarter', count: 2 },
      choices: [num(60, true), num(3), num(35)],
      solution: 'Two quarters are 25 and 25, which makes 50. One dime is 10 more. 50 and 10 make 60 cents.',
    },
    // Hard: hour hand almost at the next hour, a clock for a spoken time, dollars, paying an exact price
    {
      slot: 11,
      difficulty: 'hard',
      stem: 'Look closely at the short hand. It is almost at three, but not quite. What time is it? Tap the time.',
      prompt: clock(2, 50),
      choices: [word('2:50', true), word('3:50'), word('10:15')],
      solution: 'The short hand has not reached three yet, so the hour is still two. The long hand is on ten, and ten fives make 50. It is 2:50.',
    },
    {
      slot: 12,
      difficulty: 'hard',
      stem: 'Tap the clock that shows twenty five minutes after eleven.',
      prompt: null,
      choices: [clk(11, 25, true), clk(5, 55), clk(11, 35)],
      solution: 'At twenty five minutes after eleven, the short hand is just past eleven and the long hand points to five. Count by fives: 5, 10, 15, 20, 25.',
    },
    {
      slot: 13,
      difficulty: 'hard',
      stem: 'Listen. One dollar bill is worth 100 cents. Jo has 1 dollar bill and these 2 dimes. How many cents does Jo have in all? Tap the number.',
      prompt: { kind: 'object_group', image: 'dime', count: 2 },
      choices: [num(120, true), num(102), num(3)],
      solution: 'The dollar bill is 100 cents. Two dimes are 10 and 10, which makes 20. 100 and 20 make 120 cents.',
    },
    {
      slot: 14,
      difficulty: 'hard',
      stem: 'Listen. A toy car costs 35 cents. Which group of coins is worth exactly 35 cents? Tap the coins.',
      prompt: null,
      choices: [coins(7, 'nickel', 'nickels', true), coins(5, 'nickel', 'nickels'), coins(2, 'quarter', 'quarters')],
      solution: 'Count the nickels by fives: 5, 10, 15, 20, 25, 30, 35. Seven nickels make 35 cents. Five nickels make only 25 cents, and two quarters make 50 cents.',
    },
  ],
}

export default skill
