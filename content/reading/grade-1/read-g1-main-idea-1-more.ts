import type { ContentChoice, ContentSkill } from '../../types'

const pic = (image: string, correct = false, text = image): ContentChoice => ({ text, is_correct: correct, tile: { kind: 'object_group', image, count: 1 } })

const skill: ContentSkill = {
  slug: 'read-g1-main-idea-1-more',
  subject: 'reading',
  grade: 1,
  group: 'Informational text',
  name: 'Main Idea',
  standards: ['RI.1.2'],
  renderMode: 'audio_picture',
  extends: 'main-idea-1',
  topUpItems: 14,
  items: [
    // Easy: the main topic, with distractors the text never mentions
    { slot: 1, difficulty: 'easy', stem: 'Listen. Frogs live near ponds. Frogs can jump far with their strong back legs. Many frogs eat bugs. What is this mostly about? Tap the picture.', prompt: null,
      choices: [pic('frog', true), pic('cake'), pic('bed')],
      solution: 'Every sentence tells about frogs: where frogs live, how frogs jump, and what frogs eat. So it is mostly about frogs.' },
    { slot: 2, difficulty: 'easy', stem: 'Listen. Cows live on farms. Cows eat grass. Many cows give milk that people drink. What is this mostly about? Tap the picture.', prompt: null,
      choices: [pic('cow', true), pic('rocket'), pic('shoe')],
      solution: 'Each sentence tells something about cows: where they live, what they eat, and the milk they give. It is mostly about cows.' },
    { slot: 3, difficulty: 'easy', stem: 'Listen. Rain falls from the clouds. Rain gives plants the water they need to grow. After it rains, you may see puddles. What is this mostly about? Tap the picture.', prompt: null,
      choices: [pic('rain', true), pic('pizza'), pic('horse')],
      solution: 'The sentences tell where rain comes from, how rain helps plants, and the puddles it leaves. It is mostly about rain.' },
    { slot: 4, difficulty: 'easy', stem: 'Listen. A hen is a mother chicken. Hens lay eggs. A hen sits on the eggs to keep them warm. What do hens lay? Tap the picture.', prompt: null,
      choices: [pic('egg', true), pic('ball'), pic('shoe')],
      solution: 'The text says hens lay eggs, and a hen sits on the eggs to keep them warm.' },

    // Medium: a mix of main topic and key detail questions
    { slot: 5, difficulty: 'medium', stem: 'Listen. Whales live in the ocean. Whales are very big. A whale must swim up to the top of the water to breathe air. Some whales eat small fish. What is this mostly about? Tap the picture.', prompt: null,
      choices: [pic('whale', true), pic('fish'), pic('boat')],
      solution: 'Fish come up once, but every sentence tells about whales: where they live, how big they are, and how they breathe. It is mostly about whales.' },
    { slot: 6, difficulty: 'medium', stem: 'Listen. Many owls are awake at night. Owls have big eyes that help them see in the dark. Owls hunt mice and other small animals. What do owls hunt? Tap the picture.', prompt: null,
      choices: [pic('mouse', true), pic('cake'), pic('carrot')],
      solution: 'The text says owls hunt mice and other small animals. Their big eyes help them find mice in the dark.' },
    { slot: 7, difficulty: 'medium', stem: 'Listen. Many plants begin as a seed. Put a seed in the dirt. Give it water and sun. Soon a little plant will grow from the seed. What is this mostly about? Tap the picture.', prompt: null,
      choices: [pic('seed', true), pic('sun'), pic('car')],
      solution: 'The sun helps, but the text is mostly about the seed: how to plant a seed and how a plant grows from it.' },
    { slot: 8, difficulty: 'medium', stem: 'Listen. A butterfly starts life as a tiny egg. A caterpillar comes out of the egg. The caterpillar eats leaves and grows big. Then it turns into a butterfly. What does the caterpillar eat? Tap the picture.', prompt: null,
      choices: [pic('leaf', true), pic('cheese'), pic('bread')],
      solution: 'The text says the caterpillar eats leaves and grows big. Then it turns into a butterfly.' },
    { slot: 9, difficulty: 'medium', stem: 'Listen. Snow falls when it is very cold. Snow is made of tiny bits of ice. Kids can build a snowman with snow. Snow melts when it gets warm. What is this mostly about? Tap the picture.', prompt: null,
      choices: [pic('snow', true), pic('snowman'), pic('grapes')],
      solution: 'A snowman comes up once, but every sentence tells about snow: when it falls, what it is made of, and how it melts. It is mostly about snow.' },
    { slot: 10, difficulty: 'medium', stem: 'Listen. Ants are tiny bugs. Ants live together in big groups. They dig tunnels under the ground. Ants work as a team to carry food home. What is this mostly about? Tap the picture.', prompt: null,
      choices: [pic('ant', true), pic('elephant'), pic('bus')],
      solution: 'Each sentence tells about ants: they are tiny, they live in groups, they dig tunnels, and they work as a team. It is mostly about ants.' },

    // Hard: details from the text appear as tiles, or a detail must be recalled
    { slot: 11, difficulty: 'hard', stem: 'Listen. Many birds build nests to keep their eggs safe. They make nests with twigs, grass, and mud. Some birds put soft feathers inside. The nest holds the eggs until the baby birds hatch. What is this mostly about? Tap the picture.', prompt: null,
      choices: [pic('nest', true), pic('grass'), pic('egg')],
      solution: 'Grass and eggs are details. The whole text tells about nests: why birds build them, what nests are made of, and what they hold. It is mostly about nests.' },
    { slot: 12, difficulty: 'hard', stem: 'Listen. Rabbits have long ears that help them hear well. Rabbits eat plants, like grass and clover. Some rabbits dig holes in the ground to rest in. What is this mostly about? Tap the picture.', prompt: null,
      choices: [pic('rabbit', true), pic('grass'), pic('fox')],
      solution: 'Grass is one detail about what rabbits eat. Every sentence tells about rabbits: their ears, their food, and their holes. It is mostly about rabbits.' },
    { slot: 13, difficulty: 'hard', stem: 'Listen. A train runs on long metal tracks. Some trains carry people to work. Other trains carry big loads, like logs and new cars. What does the text say a train can carry? Tap the picture.', prompt: null,
      choices: [pic('car', true), pic('whale'), pic('snowman')],
      solution: 'The text says some trains carry people, and other trains carry big loads, like logs and new cars.' },
    { slot: 14, difficulty: 'hard', stem: 'Listen. People have made bread for a very long time. Bread is made from flour and water. Bakers mix it, let it rise, and bake it in a hot oven. Many people eat bread in a sandwich. What is this mostly about? Tap the picture.', prompt: null,
      choices: [pic('bread', true), pic('sandwich'), pic('cake')],
      solution: 'A sandwich is one way to eat bread. The text tells what bread is made of and how bakers make it, so it is mostly about bread.' },
  ],
}

export default skill
