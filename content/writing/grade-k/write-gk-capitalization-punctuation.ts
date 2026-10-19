import type { ContentChoice, ContentSkill, PictureTile } from '../../types'

const word = (w: string, correct = false): ContentChoice => ({ text: w, is_correct: correct, tile: { kind: 'word', value: w } })
const ltr = (v: string, correct = false): ContentChoice => ({ text: v, is_correct: correct, tile: { kind: 'letter', value: v } })
const one = (image: string): PictureTile => ({ kind: 'object_group', image, count: 1 })
const says = (value: string): PictureTile => ({ kind: 'word', value })

const START = 'Which sentence starts the right way? Tap the sentence.'
const END = 'Tap the sentence with the right mark at the end.'
const MARK = 'Which mark goes at the end? Tap the mark.'

const skill: ContentSkill = {
  slug: 'write-gk-capitalization-punctuation',
  subject: 'writing',
  grade: 0,
  group: 'Conventions',
  name: 'Capitalization and punctuation',
  standards: ['L.K.2'],
  renderMode: 'audio_picture',
  items: [
    // Capital letter at the start of a sentence (L.K.2.A).
    {
      slot: 1, difficulty: 'easy',
      stem: 'Listen: The cat ran. ' + START,
      prompt: null,
      choices: [word('The cat ran.', true), word('the cat ran.')],
      solution: 'A sentence starts with a capital letter. The cat ran starts with a big capital letter T.',
    },
    {
      slot: 2, difficulty: 'easy',
      stem: 'Listen: We can hop. ' + START,
      prompt: null,
      choices: [word('We can hop.', true), word('we can hop.')],
      solution: 'The first word in a sentence gets a capital letter. We starts with a capital letter W.',
    },
    {
      slot: 3, difficulty: 'easy',
      stem: 'Listen: My hat is red. ' + START,
      prompt: null,
      choices: [word('My hat is red.', true), word('my hat is red.')],
      solution: 'Every sentence starts with a capital letter. My starts with a capital letter M, so the sentence starts the right way.',
    },
    {
      slot: 4, difficulty: 'medium',
      stem: 'Listen: A pig can dig. ' + START,
      prompt: null,
      choices: [word('A pig can dig.', true), word('a pig can dig.'), word('a Pig can dig.')],
      solution: 'Only the first word of the sentence needs a capital letter. A pig can dig starts with a capital letter A, and pig stays small.',
    },
    {
      slot: 5, difficulty: 'medium',
      stem: 'Listen: The sun is up. ' + START,
      prompt: null,
      choices: [word('The sun is up.', true), word('the sun is up.'), word('the Sun is up.')],
      solution: 'The capital letter goes on the first word. The sun is up starts with a capital letter T.',
    },
    {
      slot: 6, difficulty: 'medium',
      stem: 'Listen: We like cake. ' + START,
      prompt: null,
      choices: [word('We like cake.', true), word('we like cake.'), word('we like Cake.')],
      solution: 'A sentence starts with a capital letter on its first word. We like cake starts with a capital letter W.',
    },
    {
      slot: 7, difficulty: 'medium',
      stem: 'Look at the start of each sentence. Which one starts with a capital letter? Tap the sentence.',
      prompt: null,
      choices: [word('Go to bed.', true), word('go to bed.'), word('go To bed.')],
      solution: 'Go to bed starts with a capital letter G. The first word of a sentence always gets a capital letter.',
    },
    {
      slot: 8, difficulty: 'hard',
      stem: 'Listen: The dog sat. Which sentence has a capital letter at the start and a mark at the end? Tap the sentence.',
      prompt: null,
      choices: [word('The dog sat.', true), word('the dog sat.'), word('The dog sat'), word('the dog sat')],
      solution: 'The dog sat starts with a capital letter T and ends with a period. A sentence needs both.',
    },
    {
      slot: 9, difficulty: 'hard',
      stem: 'Listen: A bug is on it. Which sentence has a capital letter at the start and a mark at the end? Tap the sentence.',
      prompt: null,
      choices: [word('A bug is on it.', true), word('a bug is on it.'), word('A bug is on it'), word('a bug is on it')],
      solution: 'A bug is on it starts with a capital letter A and ends with a period. A sentence needs both.',
    },
    // The word I (L.K.2.A).
    {
      slot: 10, difficulty: 'easy',
      stem: 'Which word is the word I, written the right way? Tap the word.',
      prompt: null,
      choices: [word('I', true), word('i')],
      solution: 'When we write the word I, we always use a capital letter I. It is a tall straight line.',
    },
    {
      slot: 11, difficulty: 'easy',
      stem: 'Listen: I can run. Which sentence writes the word I the right way? Tap the sentence.',
      prompt: one('kid_run'),
      choices: [word('I can run.', true), word('i can run.')],
      solution: 'The word I is always written with a capital letter I. Here it is also the first word of the sentence.',
    },
    {
      slot: 12, difficulty: 'medium',
      stem: 'Listen: I see a dog. Which sentence writes the word I the right way? Tap the sentence.',
      prompt: one('dog'),
      choices: [word('I see a dog.', true), word('i see a dog.')],
      solution: 'The word I is always a capital letter, a tall straight line. I see a dog.',
    },
    {
      slot: 13, difficulty: 'medium',
      stem: 'When you talk about yourself, you use the word I. Which word is I, written the right way? Tap the word.',
      prompt: one('kid_wave'),
      choices: [word('I', true), word('i'), word('a')],
      solution: 'The word I is written with a capital letter I, a tall straight line. We use it when we talk about ourselves.',
    },
    {
      slot: 14, difficulty: 'hard',
      stem: 'Listen: Can I go? Which sentence writes the word I the right way? Tap the sentence.',
      prompt: null,
      choices: [word('Can I go?', true), word('Can i go?')],
      solution: 'The word I is always a capital letter, even in the middle of a sentence. Can I go?',
    },
    {
      slot: 15, difficulty: 'hard',
      stem: 'Listen: Mom and I sat. Which sentence writes the word I the right way? Tap the sentence.',
      prompt: null,
      choices: [word('Mom and I sat.', true), word('Mom and i sat.'), word('mom and i sat.')],
      solution: 'The word I is always a capital letter, and the first word, Mom, gets a capital letter too. Mom and I sat.',
    },
    // A period at the end (L.K.2.B).
    {
      slot: 16, difficulty: 'easy',
      stem: 'Listen: I see a cat. ' + END,
      prompt: null,
      choices: [word('I see a cat.', true), word('I see a cat')],
      solution: 'A telling sentence ends with a period, a small dot. I see a cat ends with a period.',
    },
    {
      slot: 17, difficulty: 'medium',
      stem: 'Listen: We can swim. ' + END,
      prompt: null,
      choices: [word('We can swim.', true), word('We can swim'), word('We. can swim')],
      solution: 'The period goes at the very end of the sentence, after the last word. We can swim ends with a period.',
    },
    {
      slot: 18, difficulty: 'medium',
      stem: 'Listen: The hen is big. ' + END,
      prompt: null,
      choices: [word('The hen is big.', true), word('The hen is big'), word('The. hen is big')],
      solution: 'A period is a small dot that goes after the last word. The hen is big ends with a period.',
    },
    {
      slot: 19, difficulty: 'medium',
      stem: 'Listen: I like my bed. ' + END,
      prompt: null,
      choices: [word('I like my bed.', true), word('I like my bed'), word('I. like my bed')],
      solution: 'This sentence tells us something, so it ends with a period after the last word. I like my bed.',
    },
    {
      slot: 20, difficulty: 'hard',
      stem: 'Listen: The fox ran. This sentence tells us something. Tap the sentence with the right mark at the end.',
      prompt: null,
      choices: [word('The fox ran.', true), word('The fox ran'), word('The. fox ran'), word('The fox. ran')],
      solution: 'A telling sentence ends with a period after the very last word. The fox ran ends with a period.',
    },
    {
      slot: 21, difficulty: 'hard',
      stem: 'Listen: My mug is hot. This sentence tells us something. Tap the sentence with the right mark at the end.',
      prompt: null,
      choices: [word('My mug is hot.', true), word('My mug is hot'), word('My mug. is hot'), word('My. mug is hot')],
      solution: 'A period goes after the last word of a telling sentence. My mug is hot ends with a period.',
    },
    // Naming end marks (L.K.2.B).
    {
      slot: 22, difficulty: 'easy',
      stem: 'Tap the question mark.',
      prompt: null,
      choices: [word('?', true), word('.'), word('!')],
      solution: 'A question mark has a curvy hook with a dot under it. It goes at the end of an asking sentence.',
    },
    {
      slot: 23, difficulty: 'easy',
      stem: 'Tap the period.',
      prompt: null,
      choices: [word('.', true), word('?'), word('!')],
      solution: 'A period is one small dot. It goes at the end of a telling sentence.',
    },
    {
      slot: 24, difficulty: 'easy',
      stem: 'Tap the exclamation mark.',
      prompt: null,
      choices: [word('!', true), word('?'), word('.')],
      solution: 'An exclamation mark is a tall line with a dot under it. It shows a big, strong feeling.',
    },
    {
      slot: 25, difficulty: 'medium',
      stem: 'Listen: Can you hop? This sentence asks a question. ' + MARK,
      prompt: says('Can you hop'),
      choices: [word('?', true), word('.'), word('!')],
      solution: 'An asking sentence ends with a question mark. Can you hop?',
    },
    {
      slot: 26, difficulty: 'medium',
      stem: 'Listen: I like my dog. This sentence tells us something. ' + MARK,
      prompt: says('I like my dog'),
      choices: [word('.', true), word('?'), word('!')],
      solution: 'A telling sentence ends with a period, a small dot. I like my dog.',
    },
    {
      slot: 27, difficulty: 'medium',
      stem: 'Listen: Hooray, we won! This sentence shows a big, happy feeling. ' + MARK,
      prompt: says('Hooray, we won'),
      choices: [word('!', true), word('.'), word('?')],
      solution: 'A sentence with a big, strong feeling ends with an exclamation mark. Hooray, we won!',
    },
    {
      slot: 28, difficulty: 'medium',
      stem: 'One sentence asks a question. Look at the marks at the end. Tap the sentence that asks a question.',
      prompt: null,
      choices: [word('Is it a cat?', true), word('It is a cat.'), word('It is a cat!')],
      solution: 'An asking sentence ends with a question mark. Is it a cat? asks a question.',
    },
    {
      slot: 29, difficulty: 'hard',
      stem: 'Listen: Where is my hat? Does this sentence ask or tell? ' + MARK,
      prompt: says('Where is my hat'),
      choices: [word('?', true), word('.'), word('!')],
      solution: 'Where is my hat asks a question, so it ends with a question mark.',
    },
    // Writing a letter for a sound (L.K.2.C).
    {
      slot: 30, difficulty: 'easy',
      stem: 'Listen: sun. Which letter makes the sound at the start of sun? Tap the letter.',
      prompt: one('sun'),
      choices: [ltr('s', true), ltr('m'), ltr('t')],
      solution: 'Sun starts with the letter s. Listen: sun, sock, sit. They all start with the same sound.',
    },
    {
      slot: 31, difficulty: 'easy',
      stem: 'Listen: map. Which letter makes the sound at the start of map? Tap the letter.',
      prompt: one('map'),
      choices: [ltr('m', true), ltr('s'), ltr('k')],
      solution: 'Map starts with the letter m. Listen: map, mop, mug. They all start with the same sound.',
    },
    {
      slot: 32, difficulty: 'medium',
      stem: 'Listen: hen. Which letter would you write first for hen? Tap the letter.',
      prompt: one('hen'),
      choices: [ltr('h', true), ltr('f'), ltr('s')],
      solution: 'Hen starts with the letter h. Listen: hen, hat, hop. They all start with the same sound.',
    },
    {
      slot: 33, difficulty: 'medium',
      stem: 'Listen: log. Which letter makes the sound at the start of log? Tap the letter.',
      prompt: one('log'),
      choices: [ltr('l', true), ltr('s'), ltr('m')],
      solution: 'Log starts with the letter l. Listen: log, leg, lid. They all start with the same sound.',
    },
    {
      slot: 34, difficulty: 'medium',
      stem: 'Listen: cat. Which letter makes the sound in the middle of cat? Tap the letter.',
      prompt: one('cat'),
      choices: [ltr('a', true), ltr('i'), ltr('u')],
      solution: 'The middle sound in cat is the sound of the letter a. Listen: cat, hat, fan. They have the same middle sound.',
    },
    {
      slot: 35, difficulty: 'hard',
      stem: 'Listen: bus. Which letter makes the sound at the end of bus? Tap the letter.',
      prompt: one('bus'),
      choices: [ltr('s', true), ltr('t'), ltr('m')],
      solution: 'Bus ends with the letter s. Say it slowly: bus. The last sound is the same sound that starts sun.',
    },
    {
      slot: 36, difficulty: 'hard',
      stem: 'Listen: pig. Which letter makes the sound in the middle of pig? Tap the letter.',
      prompt: one('pig'),
      choices: [ltr('i', true), ltr('a'), ltr('o')],
      solution: 'The middle sound in pig is the sound of the letter i. Listen: pig, wig, pin. They have the same middle sound.',
    },
    // Spelling simple words by their sounds (L.K.2.D).
    {
      slot: 37, difficulty: 'easy',
      stem: 'Listen: hat. Which word spells hat? Tap the word.',
      prompt: one('hat'),
      choices: [word('hat', true), word('dog'), word('sun')],
      solution: 'Say it slowly: hat. Hat starts with the letter h. Dog and sun start with other sounds.',
    },
    {
      slot: 38, difficulty: 'medium',
      stem: 'Listen: mop. Which word spells mop? Tap the word.',
      prompt: one('mop'),
      choices: [word('mop', true), word('mug'), word('sit')],
      solution: 'Say it slowly: mop. Mop and mug start with the same sound, but the middle and end of mop sound different from mug.',
    },
    {
      slot: 39, difficulty: 'medium',
      stem: 'Listen: web. Which word spells web? Tap the word.',
      prompt: one('web'),
      choices: [word('web', true), word('wig'), word('cap')],
      solution: 'Say it slowly: web. Web starts like wig, but the middle sound of web is the sound of the letter e.',
    },
    {
      slot: 40, difficulty: 'hard',
      stem: 'Listen: cat. Which word spells cat? Listen for the middle sound. Tap the word.',
      prompt: one('cat'),
      choices: [word('cat', true), word('cut'), word('cot')],
      solution: 'Say it slowly: cat. The middle sound in cat is the sound of the letter a, so the word is cat.',
    },
  ],
}

export default skill
