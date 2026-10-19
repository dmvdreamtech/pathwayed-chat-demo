import type { ContentChoice, ContentSkill, PictureTile } from '../../types'

const pic = (image: string, correct = false, text = image): ContentChoice => ({ text, is_correct: correct, tile: { kind: 'object_group', image, count: 1 } })
const one = (image: string): PictureTile => ({ kind: 'object_group', image, count: 1 })

const ABOUT = 'Tap the picture.'

const skill: ContentSkill = {
  slug: 'write-gk-informative-writing',
  subject: 'writing',
  grade: 0,
  group: 'Composition',
  name: 'Informative writing',
  standards: ['W.K.2'],
  renderMode: 'audio_picture',
  items: [
    // Name the topic of a short informative writing.
    {
      slot: 1, difficulty: 'easy',
      stem: `Listen to Leo's writing. Frogs. Frogs can jump. Many frogs live in ponds. What is Leo writing about? ${ABOUT}`,
      prompt: null,
      choices: [pic('frog', true), pic('bus'), pic('cake')],
      solution: 'Leo names the topic at the start: frogs. Every sentence tells about frogs, so Leo is writing about frogs.',
    },
    // Supply one more fact about the topic.
    {
      slot: 2, difficulty: 'easy',
      stem: `Leo is writing about frogs. Which fact could Leo add about frogs? ${ABOUT}`,
      prompt: null,
      choices: [pic('bug', true, 'Many frogs eat bugs.'), pic('cake', false, 'I like cake.'), pic('car', false, 'Cars go fast.')],
      solution: 'Many frogs eat bugs is a fact about frogs. The other sentences tell about cake and cars, not frogs.',
    },
    // Match a drawing to a sentence.
    {
      slot: 3, difficulty: 'easy',
      stem: `Which drawing goes with this sentence? Many cows eat grass. ${ABOUT}`,
      prompt: null,
      choices: [pic('cow', true), pic('truck'), pic('cupcake')],
      solution: 'The sentence tells about cows, so a drawing of a cow goes with it.',
    },
    // Choose what to draw for a topic.
    {
      slot: 4, difficulty: 'easy',
      stem: `Ana wants to write about the moon. Which picture should Ana draw? ${ABOUT}`,
      prompt: null,
      choices: [pic('moon', true), pic('fish'), pic('shoe')],
      solution: 'Ana is writing about the moon, so Ana should draw the moon. A drawing shows the reader the topic.',
    },
    {
      slot: 5, difficulty: 'easy',
      stem: `Mei wants to write about bikes. Which picture should Mei draw? ${ABOUT}`,
      prompt: null,
      choices: [pic('bike', true), pic('pie'), pic('sheep')],
      solution: 'Mei is writing about bikes, so a drawing of a bike goes with Mei\'s writing.',
    },
    {
      slot: 6, difficulty: 'easy',
      stem: `Listen to Omar's writing. Ducks. Ducks can swim. Ducks have webbed feet. Many ducks say quack. What is Omar writing about? ${ABOUT}`,
      prompt: null,
      choices: [pic('duck', true), pic('lamp'), pic('train')],
      solution: 'Omar names the topic first: ducks. Then Omar tells facts about ducks, like how they swim and quack.',
    },
    {
      slot: 7, difficulty: 'easy',
      stem: `Which drawing goes with this sentence? A boat floats on the water. ${ABOUT}`,
      prompt: null,
      choices: [pic('boat', true), pic('comb'), pic('carrot')],
      solution: 'The sentence tells about a boat on the water, so a drawing of a boat goes with it.',
    },
    // A drawing comes first; pick the sentence that tells about it.
    {
      slot: 8, difficulty: 'easy',
      stem: `Kofi drew this picture. Which sentence could Kofi write about it? ${ABOUT}`,
      prompt: one('umbrella'),
      choices: [pic('umbrella', true, 'Umbrellas keep us dry.'), pic('pig', false, 'Pigs say oink.'), pic('pizza', false, 'Pizza is hot.')],
      solution: 'Kofi drew an umbrella. Umbrellas keep us dry tells about the drawing.',
    },
    // A sentence that does not belong.
    {
      slot: 9, difficulty: 'easy',
      stem: `Jada is writing about dogs. Which sentence does not belong in Jada's writing? ${ABOUT}`,
      prompt: null,
      choices: [pic('pear', true, 'I ate a pear.'), pic('dog', false, 'Many dogs bark.'), pic('bowl', false, 'Dogs need water.')],
      solution: 'I ate a pear is not about dogs, so it does not belong. Many dogs bark and dogs need water both tell about dogs.',
    },
    {
      slot: 10, difficulty: 'easy',
      stem: `Rosa wants to write about rain. Which picture should Rosa draw? ${ABOUT}`,
      prompt: null,
      choices: [pic('rain', true), pic('cheese'), pic('bed')],
      solution: 'Rosa is writing about rain, so Rosa should draw rain falling from a cloud.',
    },
    {
      slot: 11, difficulty: 'easy',
      stem: `Listen to Sam's writing. Hats. Hats go on your head. Some hats keep you warm. Some hats keep the sun out of your eyes. What is Sam writing about? ${ABOUT}`,
      prompt: null,
      choices: [pic('hat', true), pic('fox'), pic('corn')],
      solution: 'Sam names the topic first: hats. Each sentence tells something about hats.',
    },
    {
      slot: 12, difficulty: 'easy',
      stem: `Which drawing goes with this sentence? Many owls hunt at night. ${ABOUT}`,
      prompt: null,
      choices: [pic('owl', true), pic('banana'), pic('wagon')],
      solution: 'The sentence tells about owls, so a drawing of an owl goes with it.',
    },
    // Topic versus a detail named in the writing.
    {
      slot: 13, difficulty: 'medium',
      stem: `Listen to Priya's writing. Crabs. Crabs have hard shells. Crabs have claws. Many crabs walk sideways. What is Priya writing about? ${ABOUT}`,
      prompt: null,
      choices: [pic('crab', true), pic('shell'), pic('bowl')],
      solution: 'Priya names the topic first: crabs. Hard shells are one fact about crabs, but the whole writing is about crabs.',
    },
    {
      slot: 14, difficulty: 'medium',
      stem: `Listen to Ben's writing. Apples. Apples grow on trees. Apples can be red or green. You can eat an apple for a snack. What is Ben writing about? ${ABOUT}`,
      prompt: null,
      choices: [pic('apple', true), pic('tree'), pic('leaf')],
      solution: 'Ben names the topic first: apples. Trees are where apples grow, but every sentence tells about apples.',
    },
    {
      slot: 15, difficulty: 'medium',
      stem: `Nia is writing about horses. Which fact could Nia add about horses? ${ABOUT}`,
      prompt: null,
      choices: [pic('grass', true, 'Many horses eat grass.'), pic('jet', false, 'Jets fly fast.'), pic('cap', false, 'I have a red cap.')],
      solution: 'Many horses eat grass is a fact about horses. The other sentences are about jets and a cap.',
    },
    {
      slot: 16, difficulty: 'medium',
      stem: `Ravi is writing about the sun. Which fact could Ravi add about the sun? ${ABOUT}`,
      prompt: null,
      choices: [pic('sun', true, 'The sun helps plants grow.'), pic('mug', false, 'Mugs hold drinks.'), pic('dog', false, 'Dogs can dig.')],
      solution: 'The sun helps plants grow tells about the sun. Plants need sunlight to grow.',
    },
    // Dictating facts to a grown up.
    {
      slot: 17, difficulty: 'medium',
      stem: `Ivy tells the teacher facts about winter, and the teacher writes them down. Which fact is about winter? ${ABOUT}`,
      prompt: null,
      choices: [pic('snow', true, 'It can snow in winter.'), pic('pie', false, 'Pie is sweet.'), pic('van', false, 'A van has wheels.')],
      solution: 'In many places, snow falls in winter. That fact goes with Ivy\'s topic. Pie and vans are not about winter.',
    },
    {
      slot: 18, difficulty: 'medium',
      stem: `Lin is writing about cats. Which sentence does not belong in Lin's writing? ${ABOUT}`,
      prompt: null,
      choices: [pic('drum', true, 'A drum goes boom.'), pic('cat', false, 'Many cats purr.'), pic('bed', false, 'Cats like to nap.')],
      solution: 'A drum goes boom is not about cats, so it does not belong. Purring and napping are both facts about cats.',
    },
    // Match a drawing to a description that does not name the thing.
    {
      slot: 19, difficulty: 'medium',
      stem: `Which drawing goes with these sentences? This animal has a long trunk. It has big ears. ${ABOUT}`,
      prompt: null,
      choices: [pic('elephant', true), pic('mouse'), pic('horse')],
      solution: 'An elephant has a long trunk and big ears, so a drawing of an elephant goes with these sentences.',
    },
    {
      slot: 20, difficulty: 'medium',
      stem: `Which drawing goes with these sentences? This animal has long ears. It hops. ${ABOUT}`,
      prompt: null,
      choices: [pic('rabbit', true), pic('fox'), pic('pig')],
      solution: 'A rabbit has long ears and hops, so a drawing of a rabbit goes with these sentences.',
    },
    {
      slot: 21, difficulty: 'medium',
      stem: `Omar wants to write about how plants grow. Which picture should Omar draw? ${ABOUT}`,
      prompt: null,
      choices: [pic('seed', true), pic('shoe'), pic('bus')],
      solution: 'Many plants grow from a seed, so a seed fits a writing about how plants grow.',
    },
    {
      slot: 22, difficulty: 'medium',
      stem: `Jada wants to write about things that keep you warm in the snow. Which picture should Jada draw? ${ABOUT}`,
      prompt: null,
      choices: [pic('coat', true), pic('fan'), pic('lemon')],
      solution: 'A warm coat helps keep you warm in the snow. A fan cools you off, and a lemon is a food.',
    },
    // Naming the topic in a sentence.
    {
      slot: 23, difficulty: 'medium',
      stem: `Tomas is writing about monkeys. Which sentence tells the reader what the writing is about? ${ABOUT}`,
      prompt: null,
      choices: [pic('monkey', true, 'This is about monkeys.'), pic('tree', false, 'I see a big tree.'), pic('car', false, 'My car is blue.')],
      solution: 'This is about monkeys names the topic, so the reader knows the writing will tell about monkeys.',
    },
    {
      slot: 24, difficulty: 'medium',
      stem: `Lin drew a nest. Which fact could Lin write next to the drawing? ${ABOUT}`,
      prompt: one('nest'),
      choices: [pic('egg', true, 'Many birds lay eggs in nests.'), pic('pizza', false, 'Pizza is hot.'), pic('ball', false, 'I can kick a ball.')],
      solution: 'Many birds lay eggs in nests is a fact about nests, so it goes with Lin\'s drawing.',
    },
    {
      slot: 25, difficulty: 'medium',
      stem: `Rosa is writing about rain. Which sentence does not belong in Rosa's writing? ${ABOUT}`,
      prompt: null,
      choices: [pic('cat', true, 'My cat is gray.'), pic('cloud', false, 'Rain falls from clouds.'), pic('flower', false, 'Rain helps plants grow.')],
      solution: 'My cat is gray is not about rain, so it does not belong. The other two sentences tell facts about rain.',
    },
    {
      slot: 26, difficulty: 'medium',
      stem: `Zuri is writing about a farm. Which drawing could go with Zuri's writing? ${ABOUT}`,
      prompt: null,
      choices: [pic('barn', true), pic('rocket'), pic('whale')],
      solution: 'Many farms have a barn, so a barn fits a writing about a farm. A rocket and a whale are not farm things.',
    },
    {
      slot: 27, difficulty: 'medium',
      stem: `Listen to Hugo's writing. Kites. A kite can fly in the wind. Many kites have long tails. You hold a kite by its string. What is Hugo writing about? ${ABOUT}`,
      prompt: null,
      choices: [pic('kite', true), pic('cloud'), pic('ring')],
      solution: 'Hugo names the topic first: kites. Every sentence tells something about kites.',
    },
    {
      slot: 28, difficulty: 'medium',
      stem: `Sora is writing about goats. Which fact could Sora add about goats? ${ABOUT}`,
      prompt: null,
      choices: [pic('rock', true, 'Many goats can climb rocks.'), pic('cookie', false, 'Cookies are sweet.'), pic('bus', false, 'Some buses are yellow.')],
      solution: 'Many goats can climb rocks is a fact about goats. Cookies and buses are not about goats.',
    },
    {
      slot: 29, difficulty: 'medium',
      stem: `Mei is writing about the beach. Which drawing belongs in Mei's writing? ${ABOUT}`,
      prompt: null,
      choices: [pic('shell', true), pic('snowman'), pic('school')],
      solution: 'You can find shells on many beaches, so a shell belongs in a writing about the beach.',
    },
    {
      slot: 30, difficulty: 'medium',
      stem: `Ivy is writing about milk. Which fact could Ivy add about milk? ${ABOUT}`,
      prompt: null,
      choices: [pic('cow', true, 'Lots of milk comes from cows.'), pic('car', false, 'A car has a horn.'), pic('kite', false, 'Kites fly up high.')],
      solution: 'Lots of milk comes from cows is a fact about milk. The other sentences tell about cars and kites.',
    },
    // Harder: the writing names other things too.
    {
      slot: 31, difficulty: 'hard',
      stem: `Listen to Nia's writing. Foxes. Foxes have bushy tails. Many foxes hunt mice. Foxes can hear very well. What is Nia writing about? ${ABOUT}`,
      prompt: null,
      choices: [pic('fox', true), pic('mouse'), pic('rabbit')],
      solution: 'Nia names the topic first: foxes. Mice come up in one sentence, but every sentence tells about foxes.',
    },
    {
      slot: 32, difficulty: 'hard',
      stem: `Listen to Max's writing. Trees are tall plants. Birds build nests in trees. Many trees lose their leaves in the fall. What is Max writing about? ${ABOUT}`,
      prompt: null,
      choices: [pic('tree', true), pic('nest'), pic('bird'), pic('leaf')],
      solution: 'Max names the topic in the very beginning: trees. Birds, nests and leaves are details, and each one tells something about trees.',
    },
    {
      slot: 33, difficulty: 'hard',
      stem: `Ben is writing about cows. Which sentence does not belong in Ben's writing? ${ABOUT}`,
      prompt: null,
      choices: [pic('frog', true, 'Frogs can jump far.'), pic('grass', false, 'Many cows eat grass.'), pic('barn', false, 'Many cows live on farms.'), pic('cow', false, 'Cows say moo.')],
      solution: 'Frogs can jump far is about frogs, not cows, so it does not belong. The other sentences all tell facts about cows.',
    },
    {
      slot: 34, difficulty: 'hard',
      stem: `Hugo is writing about boats. Hugo needs a sentence that names the topic. Which sentence tells the reader the topic? ${ABOUT}`,
      prompt: null,
      choices: [pic('boat', true, 'This is about boats.'), pic('pond', false, 'They float on water.'), pic('fish', false, 'Some carry fish.')],
      solution: 'This is about boats says the word boats, so the reader knows the topic. The other sentences say they and some, but do not name boats.',
    },
    {
      slot: 35, difficulty: 'hard',
      stem: `Ana is writing true facts about the moon. Which sentence is a true fact? ${ABOUT}`,
      prompt: null,
      choices: [pic('moon', true, 'We can see it at night.'), pic('cheese', false, 'It is made of cheese.'), pic('pie', false, 'It is a big pie.')],
      solution: 'On many nights, we can see the moon in the sky. That is a true fact. The moon is not made of cheese or pie.',
    },
    {
      slot: 36, difficulty: 'hard',
      stem: `Omar wrote: Many birds have wings and feathers. Omar wants to add one more fact about birds. Which fact fits? ${ABOUT}`,
      prompt: null,
      choices: [pic('egg', true, 'Many birds lay eggs.'), pic('fin', false, 'Sharks have fins.'), pic('frog', false, 'Frogs say ribbit.')],
      solution: 'Many birds lay eggs is about birds, so it fits. Fins and ribbits are facts about sharks and frogs, not birds.',
    },
    {
      slot: 37, difficulty: 'hard',
      stem: `Which drawing goes with this sentence? Many spiders spin webs to catch bugs. ${ABOUT}`,
      prompt: null,
      choices: [pic('web', true), pic('net'), pic('nest')],
      solution: 'Spiders spin webs, so a drawing of a web goes with the sentence. A net is made by people, and a nest is made by birds.',
    },
    {
      slot: 38, difficulty: 'hard',
      stem: `Sora wants to write about things that give us light at night. Which picture should Sora draw? ${ABOUT}`,
      prompt: null,
      choices: [pic('lamp', true), pic('rug'), pic('spoon')],
      solution: 'A lamp gives light, so you can see at night. A rug and a spoon do not give light.',
    },
    {
      slot: 39, difficulty: 'hard',
      stem: `Kofi is writing about things in the sky. Which sentence does not belong in Kofi's writing? ${ABOUT}`,
      prompt: null,
      choices: [pic('fish', true, 'Fish swim in ponds.'), pic('cloud', false, 'Clouds float in the sky.'), pic('plane', false, 'Planes fly in the sky.')],
      solution: 'Fish swim in water, not in the sky, so that sentence does not belong. Clouds and planes are things in the sky.',
    },
    {
      slot: 40, difficulty: 'hard',
      stem: `Zuri forgot to name the topic. Listen to Zuri's writing. They give us wool. They say baa. They eat grass. What is Zuri writing about? ${ABOUT}`,
      prompt: null,
      choices: [pic('sheep', true), pic('cow'), pic('dog')],
      solution: 'Sheep give us wool and say baa, so Zuri is writing about sheep. Zuri could add a sentence that names sheep.',
    },
  ],
}

export default skill
