import type { ContentChoice, ContentSkill, PictureTile } from '../../types'

const word = (w: string, correct = false): ContentChoice => ({ text: w, is_correct: correct, tile: { kind: 'word', value: w } })
const see = (image: string): PictureTile => ({ kind: 'object_group', image, count: 1 })

const TAP = 'Tap the sentence.'

const skill: ContentSkill = {
  slug: 'write-g2-informative-writing',
  subject: 'writing',
  grade: 2,
  group: 'Composition',
  name: 'Informative writing',
  standards: ['W.2.2'],
  renderMode: 'audio_picture',
  items: [
    // Introduce the topic: find or choose the opening sentence.
    {
      slot: 1, difficulty: 'easy',
      stem: `Listen to Kofi's report. Sheep live on farms. They eat grass. Sheep give us wool for warm socks. So sheep help us! Which sentence introduces the topic? ${TAP}`,
      prompt: see('sheep'),
      choices: [word('Sheep live on farms.', true), word('They eat grass.'), word('So sheep help us!')],
      solution: 'Sheep live on farms comes first and names the topic, sheep. It tells the reader what the whole report is about.',
    },
    {
      slot: 2, difficulty: 'easy',
      stem: `Listen to Ana's report. Whales are huge. They live in the sea. They come up for air. Whales are amazing! Which sentence tells the reader the topic at the start? ${TAP}`,
      prompt: see('whale'),
      choices: [word('Whales are huge.', true), word('They live in the sea.'), word('They come up for air.')],
      solution: 'Whales are huge is the first sentence, and it names the topic, whales. The other sentences add facts about whales.',
    },
    {
      slot: 3, difficulty: 'medium',
      stem: `Ravi wants to write a report about corn. The first sentence should tell the reader the topic. Which sentence is the best way to begin? ${TAP}`,
      prompt: see('corn'),
      choices: [word('Corn is a tall plant.', true), word('It is yellow.'), word('I ate lunch.')],
      solution: 'Corn is a tall plant names the topic, corn, so the reader knows what the report is about. It is yellow does not say what it is.',
    },
    {
      slot: 4, difficulty: 'medium',
      stem: `Mei is writing a report about boats. Which sentence would be a good topic sentence to start the report? ${TAP}`,
      prompt: see('boat'),
      choices: [word('Boats move on water.', true), word('My hat is red.'), word('They have sails.')],
      solution: 'Boats move on water names the topic, boats, right away. They have sails does not name the topic, and a hat is not the topic.',
    },
    {
      slot: 5, difficulty: 'medium',
      stem: `Here is the middle and end of Zara's report. Carrots grow under the ground. The part we eat is the root. Many carrots are orange. Next time you eat a carrot, think of its roots! Zara needs a first sentence. Which sentence would introduce the topic? ${TAP}`,
      prompt: see('carrot'),
      choices: [word('Carrots are vegetables.', true), word('Then we ate pie.'), word('Now you know!')],
      solution: 'Carrots are vegetables names the topic, carrots, so it is a good first sentence. Now you know is a way to end, not to begin.',
    },
    {
      slot: 6, difficulty: 'hard',
      stem: `Listen to Tomas's report. Maps show places. A map key tells what the little pictures mean. Many maps show roads. So maps help us! Which sentence introduces the topic? ${TAP}`,
      prompt: see('map'),
      choices: [word('Maps show places.', true), word('Many maps show roads.'), word('So maps help us!'), word('A map key helps.')],
      solution: 'Maps show places comes first and tells what maps are for. The other sentences add details or wrap up the report at the end.',
    },
    {
      slot: 7, difficulty: 'hard',
      stem: `Nia is starting a report about goats. Nia wants a first sentence that names the topic and makes the reader curious. Which sentence should Nia use? ${TAP}`,
      prompt: see('goat'),
      choices: [word('Have you seen a goat?', true), word('A kid is a baby goat.'), word('That is all for goats.'), word('I lost my shoe.')],
      solution: 'Have you seen a goat? names the topic and asks the reader a question, so the reader wants to learn more. A kid is a baby goat is a detail.',
    },
    {
      slot: 8, difficulty: 'hard',
      stem: `Listen to Sami's report. Clouds float up high. Clouds are made of tiny drops of water or bits of ice. Rain falls from clouds. Look up and learn! Which sentence introduces the topic? ${TAP}`,
      prompt: see('cloud'),
      choices: [word('Clouds float up high.', true), word('Rain falls from clouds.'), word('Look up and learn!')],
      solution: 'Clouds float up high is the first sentence, and it names the topic, clouds. Look up and learn is how Sami ends the report.',
    },

    // Use facts to develop a point.
    {
      slot: 9, difficulty: 'easy',
      stem: `Kofi's report says that sheep help people. Which fact would help develop that point? ${TAP}`,
      prompt: see('sheep'),
      choices: [word('Sheep give us wool.', true), word('Sheep have four legs.'), word('Sheep say baa.')],
      solution: 'Sheep give us wool shows how sheep help people. Wool can be made into warm clothes like socks and hats.',
    },
    {
      slot: 10, difficulty: 'easy',
      stem: `Ana's report says that mice are very small animals. Which fact would show that mice are small? ${TAP}`,
      prompt: see('mouse'),
      choices: [word('Mice fit in a hand.', true), word('Mice have long tails.'), word('Mice eat seeds.')],
      solution: 'Mice fit in a hand shows how small mice are. Long tails and seeds are facts about mice, but they do not show size.',
    },
    {
      slot: 11, difficulty: 'easy',
      stem: `Ravi's report says that corn can be many colors. Which fact would help develop that point? ${TAP}`,
      prompt: see('corn'),
      choices: [word('Some corn is blue.', true), word('Corn grows in fields.'), word('I like corn.')],
      solution: 'Some corn is blue shows a color of corn that is not yellow. That fact helps show that corn can be many colors.',
    },
    {
      slot: 12, difficulty: 'medium',
      stem: `Mei's report says that boats can move in different ways. Which fact would help develop that point? ${TAP}`,
      prompt: see('boat'),
      choices: [word('Some boats use sails.', true), word('Boats can be big.'), word('My boat is red.')],
      solution: 'Some boats use sails tells one way a boat can move: the wind pushes the sails. Being big or red does not tell how a boat moves.',
    },
    {
      slot: 13, difficulty: 'medium',
      stem: `Zara's report says that the part of a carrot we eat grows under the ground. Which fact would help develop that point? ${TAP}`,
      prompt: see('carrot'),
      choices: [word('We eat the root.', true), word('Carrot tops are green.'), word('Carrots are crunchy.')],
      solution: 'We eat the root helps, because a carrot root grows down under the ground. The green top grows up above the ground.',
    },
    {
      slot: 14, difficulty: 'medium',
      stem: `Luis is writing that glasses help many people. Which fact would help develop that point? ${TAP}`,
      prompt: see('glasses'),
      choices: [word('They make words clear.', true), word('Some are round.'), word('Glasses can be red.')],
      solution: 'They make words clear tells how glasses help people see. The shape or color of glasses does not show how they help.',
    },
    {
      slot: 15, difficulty: 'medium',
      stem: `Ezra's report says that bread is made from simple things. Which fact would help develop that point? ${TAP}`,
      prompt: see('bread'),
      choices: [word('Most bread has flour.', true), word('Bread can be sliced.'), word('Toast is warm.')],
      solution: 'Most bread has flour tells one simple thing bread is made from. Slicing bread and warm toast do not tell what bread is made of.',
    },
    {
      slot: 16, difficulty: 'medium',
      stem: `Nia's report says that rabbits are good at hearing. Which fact would help develop that point? ${TAP}`,
      prompt: see('rabbit'),
      choices: [word('Big ears catch sounds.', true), word('Some are white.'), word('Rabbits like to hop.')],
      solution: 'Big ears catch sounds tells how a rabbit can hear so well. A white coat or hopping does not tell about hearing.',
    },
    {
      slot: 17, difficulty: 'hard',
      stem: `Tomas is writing that people use lemons to make foods and drinks. Which fact would help develop that point? ${TAP}`,
      prompt: see('lemon'),
      choices: [word('Lemonade uses lemons.', true), word('Lemons are yellow.'), word('Lemons grow on trees.'), word('Lemons are bumpy.')],
      solution: 'Lemonade uses lemons tells about a drink people make with lemons. The other sentences are true, but they do not tell how people use lemons.',
    },
    {
      slot: 18, difficulty: 'hard',
      stem: `Mei's report says that bananas change as they ripen. Which fact would help develop that point? ${TAP}`,
      prompt: see('banana'),
      choices: [word('Green ones turn yellow.', true), word('They grow in bunches.'), word('Most bananas are long.'), word('Bikes have wheels.')],
      solution: 'Green ones turn yellow tells how many bananas change as they ripen. Bunches and long shapes do not show a change.',
    },
    {
      slot: 19, difficulty: 'hard',
      stem: `Sami's report says that a shell keeps a sea animal safe. Which fact would help develop that point? ${TAP}`,
      prompt: see('shell'),
      choices: [word('A shell is hard.', true), word('Some wash up on sand.'), word('Some shells are pink.'), word('I keep some in a box.')],
      solution: 'A shell is hard tells how a shell guards the soft animal inside. Color, a beach, or a box do not show how shells keep animals safe.',
    },

    // Use definitions: find the sentence that tells what a word means.
    {
      slot: 20, difficulty: 'easy',
      stem: `Listen to Luis's report. Goats eat plants. A kid is a baby goat. Kids drink milk from their moms. A definition tells what a word means. Which sentence is a definition? ${TAP}`,
      prompt: see('goat'),
      choices: [word('A kid is a baby goat.', true), word('Goats eat plants.'), word('Kids drink milk.')],
      solution: 'A kid is a baby goat tells what the word kid means in a report about goats. That makes it a definition.',
    },
    {
      slot: 21, difficulty: 'easy',
      stem: `Ana's report on mice uses the word pup. Which sentence tells the reader what the word pup means? ${TAP}`,
      prompt: see('mouse'),
      choices: [word('A pup is a baby mouse.', true), word('Pups are pink.'), word('Mice have tails.')],
      solution: 'A pup is a baby mouse tells what the word pup means. Pups are pink tells what a pup looks like, not what the word means.',
    },
    {
      slot: 22, difficulty: 'easy',
      stem: `Kofi is writing about farm animals and uses the word hay. Which sentence is a definition of hay? ${TAP}`,
      prompt: see('barn'),
      choices: [word('Hay is dried grass.', true), word('We keep hay in a barn.'), word('Cows eat hay.')],
      solution: 'Hay is dried grass tells what hay is made of, so it is a definition. The other sentences tell where hay is and who eats it.',
    },
    {
      slot: 23, difficulty: 'medium',
      stem: `Listen to Sami's report on clouds. Some clouds float very low. Fog is a low cloud. It can be hard to see in fog. Which sentence is a definition? ${TAP}`,
      prompt: see('cloud'),
      choices: [word('Fog is a low cloud.', true), word('It can be hard to see.'), word('We had fog today.')],
      solution: 'Fog is a low cloud tells what the word fog means. It is a cloud that sits down near the ground.',
    },
    {
      slot: 24, difficulty: 'medium',
      stem: `Listen to Ezra's report on rocks. Deep under the ground, it is very hot. Some rock gets so hot that it melts. Magma is melted rock. When magma cools, it turns into hard rock again. Which sentence is a definition? ${TAP}`,
      prompt: see('rock'),
      choices: [word('Magma is melted rock.', true), word('It is hot deep down.'), word('Rocks can be big.')],
      solution: 'Magma is melted rock tells what the word magma means. A definition helps the reader learn a new word.',
    },
    {
      slot: 25, difficulty: 'medium',
      stem: `Mei's boat report uses the word deck. All of these sentences say deck, but only one tells what a deck is. Which sentence is the definition? ${TAP}`,
      prompt: see('boat'),
      choices: [word("A deck is a boat floor.", true), word('We stood on the deck.'), word('The deck was wet.')],
      solution: 'A deck is a boat floor tells what the word deck means. The other sentences use the word, but they do not explain it.',
    },
    {
      slot: 26, difficulty: 'hard',
      stem: `Ravi wants to add a definition to the corn report, so readers will know the word kernel. Which sentence should Ravi add? ${TAP}`,
      prompt: see('corn'),
      choices: [word('A kernel is a seed.', true), word('Corn has many kernels.'), word('Kernels can be yellow.'), word('I like kernels.')],
      solution: 'A kernel is a seed tells what the word kernel means: each kernel is a corn seed. The other sentences use the word kernel, but they do not explain it.',
    },
    {
      slot: 27, difficulty: 'hard',
      stem: `Zara is writing about weather. Which sentence would help a reader understand the word hail? ${TAP}`,
      prompt: see('cloud'),
      choices: [word('Hail is balls of ice.', true), word('Hail fell on our car.'), word('Hail can be loud.'), word('We saw hail at noon.')],
      solution: 'Hail is balls of ice tells what hail is, so it helps the reader understand the word. The other sentences tell about times hail fell.',
    },
    {
      slot: 28, difficulty: 'hard',
      stem: `Kofi's sheep report uses the word wool. Which sentence is a definition that tells what wool is? ${TAP}`,
      prompt: see('sheep'),
      choices: [word('Wool is sheep hair.', true), word('Wool keeps us warm.'), word('My hat is wool.'), word('Wool can be dyed.')],
      solution: 'Wool is sheep hair tells what wool is. The other sentences tell what wool does or what is made of it.',
    },

    // Provide a concluding statement.
    {
      slot: 29, difficulty: 'easy',
      stem: `Listen to Zara's report. Cheese is made from milk. Some cheese has holes. Many people put cheese on pizza. Zara needs an ending. Which is the best concluding statement? ${TAP}`,
      prompt: see('cheese'),
      choices: [word('That is all for cheese.', true), word('Some cheese has holes.'), word('My cat is gray.')],
      solution: 'That is all for cheese wraps up the report and tells the reader it is over. Some cheese has holes is a fact from the middle.',
    },
    {
      slot: 30, difficulty: 'easy',
      stem: `Listen to Tomas's report. Some dogs help people who cannot see. Some dogs herd sheep. Some dogs help find lost people. Which sentence would make a good ending? ${TAP}`,
      prompt: see('dog'),
      choices: [word('Dogs help in many ways.', true), word('Some dogs herd sheep.'), word('I ate a pear.')],
      solution: 'Dogs help in many ways sums up all the facts about dog helpers, so it makes a good ending for the report.',
    },
    {
      slot: 31, difficulty: 'medium',
      stem: `Listen to Nia's report. Umbrellas keep us dry in the rain. Some umbrellas fold up small. Big umbrellas give shade at the beach. Which sentence wraps up the report? ${TAP}`,
      prompt: see('umbrella'),
      choices: [word('Umbrellas are useful.', true), word('Some fold up small.'), word('Rain is wet.')],
      solution: 'Umbrellas are useful sums up the report: they keep us dry and give shade. That ties the facts together at the end.',
    },
    {
      slot: 32, difficulty: 'medium',
      stem: `Listen to Sami's report. Garbage trucks pick up trash. Dump trucks carry dirt and rocks. Fire trucks carry ladders and hoses. Which is the best concluding statement for Sami's report? ${TAP}`,
      prompt: see('truck'),
      choices: [word('Trucks do many jobs.', true), word('Dump trucks carry dirt.'), word("Let's go to the park.")],
      solution: 'Trucks do many jobs sums up every fact in the report: each truck has its own job. That makes it a good concluding statement.',
    },
    {
      slot: 33, difficulty: 'medium',
      stem: `Listen to Ezra's report. Grass is a plant. Many animals eat grass, like cows and sheep. Grass roots help hold soil in place. Which ending sums up Ezra's main point? ${TAP}`,
      prompt: see('grass'),
      choices: [word('Grass helps in two ways.', true), word('Cows eat grass.'), word('The sky is blue.')],
      solution: 'Grass helps in two ways sums up the report: grass feeds animals and holds soil in place. Cows eat grass is just one detail.',
    },
    {
      slot: 34, difficulty: 'medium',
      stem: `Listen to Mei's report. Some horses carry riders on trails. Some horses pull carts. Some horses help farmers move cows. Which concluding statement fits best? ${TAP}`,
      prompt: see('horse'),
      choices: [word('So horses help people!', true), word('Some horses pull carts.'), word('I need a nap.')],
      solution: 'So horses help people sums up every fact in the report: each one tells a way horses help. Pulling carts is just one detail.',
    },
    {
      slot: 35, difficulty: 'hard',
      stem: `Listen to Ana's report. Let's learn about fish. Fish live in water. Many fish have gills to breathe. Most fish have fins to swim. Which is the best concluding statement? ${TAP}`,
      prompt: see('fish'),
      choices: [word('Fish are made for water.', true), word("Let's learn about fish."), word('Many fish have gills.'), word('I have a red bike.')],
      solution: 'Fish are made for water sums up the gills and fins facts, so it ends the report. Let\'s learn about fish is how the report begins.',
    },

    // Keep a report factual: tell an opinion from a fact.
    {
      slot: 36, difficulty: 'easy',
      stem: `Nia wants a goat report with only facts. Which sentence is an opinion, not a fact? ${TAP}`,
      prompt: see('goat'),
      choices: [word('Goats are the best!', true), word('Goats eat plants.'), word('Goats have hooves.')],
      solution: 'Goats are the best tells what someone thinks, so it is an opinion. Goats eat plants and have hooves are facts that can be checked.',
    },
    {
      slot: 37, difficulty: 'easy',
      stem: `Kofi's carrot report should tell facts. Which sentence tells how someone feels, not a fact? ${TAP}`,
      prompt: see('carrot'),
      choices: [word('Carrots taste yummy.', true), word('Carrots grow in dirt.'), word('Some are purple.')],
      solution: 'Carrots taste yummy is an opinion, because some people may not like carrots. Growing in dirt and some purple carrots are facts.',
    },
    {
      slot: 38, difficulty: 'medium',
      stem: `An opinion tells what someone thinks or feels. A fact can be checked. Which sentence in Zara's sheep report is an opinion? ${TAP}`,
      prompt: see('sheep'),
      choices: [word('Lambs are so cute.', true), word('Lambs drink milk.'), word('Sheep give wool.')],
      solution: 'Lambs are so cute is an opinion: it tells how someone feels. We can check that lambs drink milk and sheep give wool.',
    },
    {
      slot: 39, difficulty: 'medium',
      stem: `Luis wants the boat report to have only facts. Which sentence should Luis take out? ${TAP}`,
      prompt: see('boat'),
      choices: [word('Boat rides are best.', true), word('Some boats have sails.'), word('Boats float on water.')],
      solution: 'Boat rides are best is an opinion, so it does not belong in a report of facts. The other two sentences can be checked.',
    },
    {
      slot: 40, difficulty: 'medium',
      stem: `This time, find the fact. Which sentence in Tomas's map report is a fact that can be checked, not an opinion? ${TAP}`,
      prompt: see('map'),
      choices: [word('Maps can show roads.', true), word('Maps are so cool.'), word('I love old maps.')],
      solution: 'Maps can show roads is a fact: we can look at a map and check. So cool and I love tell how someone feels.',
    },
  ],
}

export default skill
