import type { ContentChoice, ContentSkill } from '../../types'

const num = (v: number, correct = false): ContentChoice => ({ text: String(v), is_correct: correct, tile: { kind: 'number', value: String(v) } })
const pic = (image: string, correct = false, text = image): ContentChoice => ({ text, is_correct: correct, tile: { kind: 'object_group', image, count: 1 } })
const word = (w: string, correct = false): ContentChoice => ({ text: w, is_correct: correct, tile: { kind: 'word', value: w } })

const PIC = 'Tap the picture.'
const SENT = 'Read the sentences. Tap the sentence.'

const skill: ContentSkill = {
  slug: 'write-g1-informative-writing',
  subject: 'writing',
  grade: 1,
  group: 'Composition',
  name: 'Informative writing',
  standards: ['W.1.2'],
  renderMode: 'audio_picture',
  items: [
    // Name the topic of a short informative writing.
    {
      slot: 1, difficulty: 'easy',
      stem: `Listen to Ana's writing. Owls are birds. Many owls hunt at night. Owls can turn their heads far around. What is the topic of Ana's writing? ${PIC}`,
      prompt: null,
      choices: [pic('owl', true), pic('sock'), pic('train')],
      solution: 'The topic is what the whole writing is about. Every sentence Ana wrote tells about owls, so the topic is owls.',
    },
    {
      slot: 2, difficulty: 'easy',
      stem: `Listen to Jamal's writing. Snakes have no legs. Snakes move by sliding on the ground. Many snakes are long and thin. What is the topic of Jamal's writing? ${PIC}`,
      prompt: null,
      choices: [pic('snake', true), pic('cake'), pic('lamp')],
      solution: 'Jamal tells three facts, and each one is about snakes. So the topic of the writing is snakes.',
    },
    {
      slot: 3, difficulty: 'easy',
      stem: `Listen to Mei's writing. Trains run on tracks. Some trains carry people. Some trains carry boxes from place to place. What is the topic of Mei's writing? ${PIC}`,
      prompt: null,
      choices: [pic('train', true), pic('pear'), pic('hat')],
      solution: 'Mei writes about tracks, people, and boxes, but every sentence is about trains. The topic is trains.',
    },
    // Topic versus a detail named in the writing.
    {
      slot: 4, difficulty: 'medium',
      stem: `Listen to Theo's writing. Bears are big animals. Many bears eat fish and berries. Some bears sleep for most of the winter. What is the topic of Theo's writing? ${PIC}`,
      prompt: null,
      choices: [pic('bear', true), pic('fish'), pic('snow')],
      solution: 'Theo says that bears eat fish and sleep in winter. Fish and winter are small parts. The whole writing is about bears.',
    },
    {
      slot: 5, difficulty: 'medium',
      stem: `Listen to Rosa's writing. A rainbow is a bow of colors in the sky. You might see a rainbow when the sun comes out after rain. Rainbows do not last long. What is the topic of Rosa's writing? ${PIC}`,
      prompt: null,
      choices: [pic('rainbow', true), pic('rain'), pic('sun')],
      solution: 'Rosa talks about the sun and rain to explain when we see a rainbow. Every sentence is about rainbows, so the topic is rainbows.',
    },
    // The writer forgot to name the topic: figure it out from the facts.
    {
      slot: 6, difficulty: 'hard',
      stem: `Zuri forgot to name the topic. Listen. They start out as caterpillars. They have big, bright wings. Many of them drink from flowers. What is Zuri writing about? ${PIC}`,
      prompt: null,
      choices: [pic('butterfly', true), pic('flower'), pic('bird')],
      solution: 'Butterflies start out as caterpillars, have bright wings, and drink from flowers. Birds have wings too, but they do not start as caterpillars. The topic is butterflies.',
    },
    {
      slot: 7, difficulty: 'hard',
      stem: `Omar forgot to name the topic. Listen. They have a hard shell on their back. Some of them live in ponds. Many of them can pull their heads into their shells. What is Omar writing about? ${PIC}`,
      prompt: null,
      choices: [pic('turtle', true), pic('crab'), pic('pond')],
      solution: 'Many turtles can pull their heads into their shells, and some turtles live in ponds. A crab has a shell too, but it cannot pull its head inside. The topic is turtles.',
    },
    {
      slot: 8, difficulty: 'hard',
      stem: `Lily forgot to name the topic. Listen. It has a pointy top. It blasts off with fire and smoke. It can carry people far into space. What is Lily writing about? ${PIC}`,
      prompt: null,
      choices: [pic('rocket', true), pic('plane'), pic('moon')],
      solution: 'A rocket blasts off with fire and smoke and can carry people into space. A plane flies in the sky, but not into space. The topic is rockets.',
    },
    // Supply a fact about the topic.
    {
      slot: 9, difficulty: 'easy',
      stem: `Ana is writing about bees. Which fact could Ana add about bees? ${SENT}`,
      prompt: null,
      choices: [word('Bees can fly.', true), word('Cats can purr.'), word('I like bees.')],
      solution: 'Bees can fly is a true fact about bees. Cats can purr is about cats. I like bees tells what Ana likes, not a fact.',
    },
    {
      slot: 10, difficulty: 'easy',
      stem: `Leo is writing about snow. Which fact could Leo add about snow? ${SENT}`,
      prompt: null,
      choices: [word('Snow is cold.', true), word('Pigs say oink.'), word('Snow is so fun!')],
      solution: 'Snow is cold is a true fact about snow. Pigs say oink is about pigs. Snow is so fun tells a feeling, and some people may not agree.',
    },
    {
      slot: 11, difficulty: 'medium',
      stem: `Kai is writing about lions. Which fact could Kai add about lions? ${SENT}`,
      prompt: null,
      choices: [word('Lions can roar.', true), word('Bears have fur.'), word('Lions are the best!')],
      solution: 'Lions can roar is a true fact about lions. Bears have fur is true, but it is about bears. Lions are the best is what someone thinks, not a fact.',
    },
    {
      slot: 12, difficulty: 'medium',
      stem: `Nora is writing about carrots. Which fact could Nora add about carrots? ${SENT}`,
      prompt: null,
      choices: [word('Carrots grow in dirt.', true), word('Eggs have shells.'), word('Carrots taste yummy.')],
      solution: 'Carrots grow in the dirt, so that fact fits. Eggs have shells is about eggs. Carrots taste yummy is a feeling, and not everyone agrees.',
    },
    {
      slot: 13, difficulty: 'easy',
      stem: `Hugo is writing about drums. Which fact could Hugo add about drums? ${SENT}`,
      prompt: null,
      choices: [word('You hit a drum.', true), word('Bells can ring.'), word('Drums are the best!')],
      solution: 'You hit a drum to make a sound, so that is a fact about drums. Bells can ring is about bells. Drums are the best is what someone thinks.',
    },
    {
      slot: 14, difficulty: 'medium',
      stem: `Maya is writing about worms. Which fact could Maya add about worms? ${SENT}`,
      prompt: null,
      choices: [word('Many worms dig.', true), word('Hens lay eggs.'), word('Worms are cute.')],
      solution: 'Many worms dig tunnels in the soil, so that fact fits. Hens lay eggs is about hens. Worms are cute is what someone thinks, not a fact.',
    },
    {
      slot: 15, difficulty: 'hard',
      stem: `Omar is writing about mittens. Omar wrote: Mittens keep your hands warm. Which fact could Omar add next? ${SENT}`,
      prompt: null,
      choices: [word('Mittens come in pairs.', true), word('Hats go on heads.'), word('Red is the best.')],
      solution: 'Mittens come in pairs, one for each hand. That fact tells more about mittens. Hats are a different topic, and red is the best is a feeling.',
    },
    {
      slot: 16, difficulty: 'hard',
      stem: `Sora is writing about rocks. Which fact could Sora add about rocks? ${SENT}`,
      prompt: null,
      choices: [word('Some rocks are smooth.', true), word('Most grass is green.'), word('Rocks are pretty.')],
      solution: 'Some rocks are smooth is a true fact about rocks. Grass is a different topic. Rocks are pretty is what someone thinks, not a fact.',
    },
    // A topic sentence names the topic.
    {
      slot: 17, difficulty: 'easy',
      stem: `A topic sentence tells what the writing is about. Which sentence is a good topic sentence for a writing about bees? ${SENT}`,
      prompt: null,
      choices: [word('Here are bee facts.', true), word('I ate a pear.'), word('Cars go fast.')],
      solution: 'Here are bee facts tells the reader the writing is about bees. The other sentences are about a pear and cars.',
    },
    {
      slot: 18, difficulty: 'easy',
      stem: `A topic sentence tells what the writing is about. Which sentence is a good topic sentence for a writing about trucks? ${SENT}`,
      prompt: null,
      choices: [word('This is about trucks.', true), word('Fish can swim.'), word('I have a cat.')],
      solution: 'This is about trucks names the topic, so the reader knows the writing will tell about trucks.',
    },
    {
      slot: 19, difficulty: 'medium',
      stem: `Ravi wants to start a writing about planes. Which sentence would be a good topic sentence to start with? ${SENT}`,
      prompt: null,
      choices: [word('Learn about planes!', true), word('Now you know about planes.'), word('Boats can float.')],
      solution: 'Learn about planes names the topic at the start. Now you know about planes sounds like an ending, and boats are a different topic.',
    },
    {
      slot: 20, difficulty: 'medium',
      stem: `Gia wants to start a writing about shells. Which sentence would be a good topic sentence to start with? ${SENT}`,
      prompt: null,
      choices: [word('Here are shell facts.', true), word('That is all on shells.'), word('Pigs like mud.')],
      solution: 'Here are shell facts tells the reader what is coming. That is all on shells sounds like an ending, and pigs are a different topic.',
    },
    {
      slot: 21, difficulty: 'medium',
      stem: `Ben wants to start a writing about cheese. Which sentence would be a good topic sentence to start with? ${SENT}`,
      prompt: null,
      choices: [word('This is about cheese.', true), word('So that is cheese!'), word('My shoe is red.')],
      solution: 'This is about cheese names the topic at the start. So that is cheese sounds like an ending, and a red shoe is not about cheese.',
    },
    {
      slot: 22, difficulty: 'medium',
      stem: `Lin wrote these facts. Some seeds are tiny. Many seeds need water to grow. Lin needs a topic sentence to go first. Which one fits Lin's facts? ${SENT}`,
      prompt: null,
      choices: [word('All about seeds!', true), word('All about rain!'), word('All about cake!')],
      solution: 'Both of Lin\'s facts are about seeds, so the topic sentence should name seeds. Rain and cake are not the topic.',
    },
    // A good ending gives a sense of closure.
    {
      slot: 23, difficulty: 'easy',
      stem: `Listen to Ana's writing. Here are bee facts. Bees fly from flower to flower. Some bees make honey. Ana needs an ending. Which sentence would be a good ending? ${SENT}`,
      prompt: null,
      choices: [word('So bees are busy helpers!', true), word('I have a blue cup.'), word('Here are bee facts.')],
      solution: 'So bees are busy helpers wraps up the writing about bees. Here are bee facts is how Ana started, and a blue cup is not about bees.',
    },
    {
      slot: 24, difficulty: 'easy',
      stem: `Listen to Eli's writing. Crayons come in many colors. You can draw with crayons. Many crayons are made of wax. Which sentence would be a good ending? ${SENT}`,
      prompt: null,
      choices: [word('Now you know about crayons!', true), word('Dogs dig holes.'), word('Pigs say oink.')],
      solution: 'Now you know about crayons wraps up the writing and tells the reader it is done. Dogs and pigs are not about crayons.',
    },
    {
      slot: 25, difficulty: 'medium',
      stem: `Listen to Kofi's writing. A school bus is big and yellow. A school bus takes kids to school. Many school buses have a stop sign on the side. Which sentence would be a good ending? ${SENT}`,
      prompt: null,
      choices: [word('That is all on buses.', true), word('Here are bus facts.'), word('My cat is soft.')],
      solution: 'That is all on buses tells the reader the writing is done. Here are bus facts sounds like a start, and a soft cat is not about buses.',
    },
    {
      slot: 26, difficulty: 'medium',
      stem: `Listen to Ivy's writing. Mountains are very tall. Some mountains have snow on top. People can hike up mountains. Which sentence would be a good ending? ${SENT}`,
      prompt: null,
      choices: [word('So mountains are big!', true), word('Learn about mountains!'), word('A cup holds milk.')],
      solution: 'So mountains are big wraps up the facts Ivy told. Learn about mountains sounds like a start, and a cup is not about mountains.',
    },
    {
      slot: 27, difficulty: 'medium',
      stem: `Listen to Pablo's writing. A tent is like a little house made of cloth. People sleep in tents when they camp. Tents can fold up small. Which sentence would be a good ending? ${SENT}`,
      prompt: null,
      choices: [word('Tents help us camp!', true), word('Read about tents!'), word('I like grapes.')],
      solution: 'Tents help us camp sums up Pablo\'s facts and finishes the writing. Read about tents sounds like a start, and grapes are not about tents.',
    },
    {
      slot: 28, difficulty: 'hard',
      stem: `Listen to Tess's writing. Here are mouse facts. Mice are small animals. Many mice have long tails. Some mice eat seeds. Which sentence would be a good ending? ${SENT}`,
      prompt: null,
      choices: [word('So mice are tiny!', true), word('Here are mouse facts.'), word('Ducks can swim.'), word('My bed is soft.')],
      solution: 'So mice are tiny wraps up Tess\'s facts about small mice. Here are mouse facts is already the start. Ducks and a bed are not about mice.',
    },
    // A sentence that does not belong.
    {
      slot: 29, difficulty: 'easy',
      stem: `Mia is writing about school. Which sentence does not belong in Mia's writing? ${SENT}`,
      prompt: null,
      choices: [word('A fox has a tail.', true), word('We learn at school.'), word('Kids read at school.')],
      solution: 'A fox has a tail is not about school, so it does not belong. Learning and reading at school both fit the topic.',
    },
    {
      slot: 30, difficulty: 'easy',
      stem: `Noah is writing about snowmen. Which sentence does not belong in Noah's writing? ${SENT}`,
      prompt: null,
      choices: [word('My dog is brown.', true), word('We roll the snow.'), word('A snowman can melt.')],
      solution: 'My dog is brown is not about snowmen, so it does not belong. Rolling snow and melting both tell about snowmen.',
    },
    {
      slot: 31, difficulty: 'medium',
      stem: `Jada is writing about lemons. Which sentence does not belong in Jada's writing? ${SENT}`,
      prompt: null,
      choices: [word('Cows eat grass.', true), word('Lemons taste sour.'), word('Lemons grow on trees.')],
      solution: 'Cows eat grass is true, but it is about cows, not lemons. Lemons taste sour and grow on trees, so those sentences belong.',
    },
    {
      slot: 32, difficulty: 'medium',
      stem: `Amir is writing about books. Which sentence does not belong in Amir's writing? ${SENT}`,
      prompt: null,
      choices: [word('Rain makes puddles.', true), word('Books have pages.'), word('We read books.')],
      solution: 'Rain makes puddles is true, but it is about rain, not books. Pages and reading both tell about books.',
    },
    {
      slot: 33, difficulty: 'medium',
      stem: `Listen to Diego's writing about hens. Hens are birds. Hens lay eggs. I have a red bike. Many hens eat seeds. One sentence does not belong. Which picture goes with that sentence? ${PIC}`,
      prompt: null,
      choices: [pic('bike', true), pic('egg'), pic('seed')],
      solution: 'I have a red bike is not about hens, so it does not belong. Eggs and seeds go with the facts about hens.',
    },
    {
      slot: 34, difficulty: 'hard',
      stem: `Rae is writing about bats. Which sentence does not belong in Rae's writing? ${SENT}`,
      prompt: null,
      choices: [word('Birds lay eggs.', true), word('Bats can fly.'), word('Bats have wings.')],
      solution: 'Birds can fly too, but birds are not bats. Birds lay eggs is about birds, so it does not belong in a writing about bats.',
    },
    {
      slot: 35, difficulty: 'hard',
      stem: `Sam is writing about rain. Which sentence does not belong in Sam's writing? ${SENT}`,
      prompt: null,
      choices: [word('The sun is a star.', true), word('Rain makes puddles.'), word('Plants need rain.')],
      solution: 'The sun is a star is true, and the sun is in the sky, but it is not about rain. Puddles and plants that need rain fit the topic.',
    },
    // Facts, not feelings.
    {
      slot: 36, difficulty: 'medium',
      stem: `Zoe is writing facts about pizza. A fact is true for everyone, not just what someone likes. Which sentence is a fact? ${SENT}`,
      prompt: null,
      choices: [word('Pizza has a crust.', true), word('Pizza is the best!'), word('I love pizza.')],
      solution: 'Pizza has a crust is true for everyone. Pizza is the best and I love pizza tell what someone likes.',
    },
    {
      slot: 37, difficulty: 'medium',
      stem: `Max is writing facts about oranges. A fact is true for everyone, not just what someone likes. Which sentence is a fact? ${SENT}`,
      prompt: null,
      choices: [word('Oranges have peels.', true), word('Oranges are yummy.'), word('Oranges are the best.')],
      solution: 'Oranges have peels is true for everyone. Some people may not think oranges are yummy or the best, so those are feelings.',
    },
    // Counting the facts in a writing.
    {
      slot: 38, difficulty: 'medium',
      stem: `Listen to Luca's writing. Here are bike facts. Bikes have two wheels. You push the pedals to make a bike go. Many bikes have a bell. So bikes are fun to ride! How many facts about bikes did Luca tell in the middle? Tap the number.`,
      prompt: null,
      choices: [num(3, true), num(2), num(5)],
      solution: 'Luca starts with a topic sentence and ends with a wrap up. In the middle are 3 facts: two wheels, pedals, and a bell.',
    },
    // Which part is missing?
    {
      slot: 39, difficulty: 'hard',
      stem: `Listen to Kim's writing. Here are corn facts. Corn grows tall. Many people eat corn. Kim stopped there. Which part does Kim still need? Read the words. Tap the words.`,
      prompt: null,
      choices: [word('an ending', true), word('a new topic'), word('a topic sentence')],
      solution: 'Kim already named the topic and told facts. An ending would wrap up the writing, like: So corn is a great plant.',
    },
    {
      slot: 40, difficulty: 'hard',
      stem: `Listen to Ivy's writing. Many shoes have laces. Some shoes have straps. So shoes help our feet! Which part is missing from Ivy's writing? Read the words. Tap the words.`,
      prompt: null,
      choices: [word('a topic sentence', true), word('an ending'), word('a new topic')],
      solution: 'Ivy did not name the topic first. A topic sentence at the start, like: Here are shoe facts, tells the reader what the writing is about.',
    },
  ],
}

export default skill
