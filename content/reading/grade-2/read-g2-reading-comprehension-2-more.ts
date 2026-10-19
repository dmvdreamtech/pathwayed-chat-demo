import type { ContentChoice, ContentSkill } from '../../types'

const num = (v: number, correct = false): ContentChoice => ({ text: String(v), is_correct: correct, tile: { kind: 'number', value: String(v) } })
const pic = (image: string, correct = false, text = image): ContentChoice => ({ text, is_correct: correct, tile: { kind: 'object_group', image, count: 1 } })
const word = (w: string, correct = false): ContentChoice => ({ text: w, is_correct: correct, tile: { kind: 'word', value: w } })

const skill: ContentSkill = {
  slug: 'read-g2-reading-comprehension-2-more',
  subject: 'reading',
  grade: 2,
  group: 'Informational text',
  name: 'Reading Comprehension',
  standards: ['RI.2.1'],
  renderMode: 'audio_picture',
  extends: 'reading-comprehension-2',
  topUpItems: 14,
  items: [
    // Easy: what and who questions, picture tiles
    { slot: 1, difficulty: 'easy', stem: 'Listen. A caterpillar is a small, crawly bug. This caterpillar eats lots of leaves and grows bigger. Then it makes a hard case around its body. Inside the case, it changes. One day it comes out as a butterfly with wings! What does this caterpillar turn into? Tap the picture.', prompt: null,
      choices: [pic('butterfly', true), pic('bird'), pic('frog')],
      solution: 'The text says the caterpillar comes out of its case as a butterfly with wings. This caterpillar turns into a butterfly.' },
    { slot: 2, difficulty: 'easy', stem: 'Listen. Many farms have hens. A hen is a grown up chicken. Hens lay eggs, often one egg a day. The farmer gathers the eggs from the nest boxes each morning. Who lays the eggs on the farm? Tap the picture.', prompt: null,
      choices: [pic('hen', true), pic('cow'), pic('horse')],
      solution: 'The text says hens lay eggs. The farmer gathers the eggs that the hens lay.' },
    { slot: 3, difficulty: 'easy', stem: 'Listen. A train rolls on long metal tracks. These tracks are called rails. The rails go from town to town. Long cars hook together and carry people and boxes. What rolls on rails? Tap the picture.', prompt: null,
      choices: [pic('train', true), pic('boat'), pic('bike')],
      solution: 'A train rolls on long metal rails. Its cars hook together to carry people and boxes.' },
    { slot: 4, difficulty: 'easy', stem: 'Listen. Many plants start out very small. A plant can begin as a tiny seed in the dirt. The seed gets water from the rain. A little root grows down, and a green stem grows up. What can a plant grow from? Tap the picture.', prompt: null,
      choices: [pic('seed', true), pic('rock'), pic('shell')],
      solution: 'The text says a plant can begin as a tiny seed. Roots grow down and a stem grows up.' },

    // Medium: how, when, where, what
    { slot: 5, difficulty: 'medium', stem: 'Listen. Many frogs eat bugs. A frog sits very still and waits. When a bug flies close, the frog shoots out its long, sticky tongue. The bug sticks to it! What does a frog use to catch a bug? Tap the words.', prompt: null,
      choices: [word('its tongue', true), word('a net'), word('its tail')],
      solution: 'The text says the frog shoots out its long, sticky tongue, and the bug sticks to it.' },
    { slot: 6, difficulty: 'medium', stem: 'Listen. Many owls sleep all day in trees. When the sky gets dark, they wake up. Their big eyes help them see in the dark. They fly out to hunt for mice. When do many owls hunt? Tap the words.', prompt: null,
      choices: [word('at night', true), word('at noon'), word('in the day')],
      solution: 'The text says owls wake up when the sky gets dark. Many owls hunt at night.' },
    { slot: 7, difficulty: 'medium', stem: 'Listen. In the fall, many squirrels are very busy. They find acorns that drop from oak trees. They dig small holes and bury the acorns. In winter, they dig many of them up to eat. What do squirrels bury in the fall? Tap the picture.', prompt: null,
      choices: [pic('acorn', true), pic('carrot'), pic('cookie')],
      solution: 'The text says squirrels bury acorns from oak trees, then dig many of them up to eat in winter.' },
    { slot: 8, difficulty: 'medium', stem: 'Listen. On a dairy farm, cows give milk. Each day the cows walk into a big barn. Inside the barn, the farmer milks them. Then the milk goes to the store. Where do the cows get milked? Tap the picture.', prompt: null,
      choices: [pic('barn', true), pic('school'), pic('tent')],
      solution: 'The text says the cows walk into a big barn, and the farmer milks them inside.' },
    { slot: 9, difficulty: 'medium', stem: 'Listen. Blue whales are the biggest animals on Earth. They live in the ocean. They swim up to the top of the water to breathe air. They eat tiny animals called krill. Where do blue whales live? Tap the words.', prompt: null,
      choices: [word('in the ocean', true), word('in the woods'), word('on a farm')],
      solution: 'The text says blue whales live in the ocean. They swim up to the top to breathe air.' },
    { slot: 10, difficulty: 'medium', stem: 'Listen. Brushing your teeth keeps them strong. Dentists say to brush two times every day. Brush in the morning, and brush again before bed. How many times a day should you brush? Tap the number.', prompt: null,
      choices: [num(2, true), num(5), num(10)],
      solution: 'Dentists say to brush two times a day: once in the morning and once before bed. That is 2.' },

    // Hard: why, how, when, where with close details
    { slot: 11, difficulty: 'hard', stem: 'Listen. A turtle has a hard shell on its back. The shell is like a little house it always carries. Many turtles can pull their head and legs inside when they are scared. Then it is hard for other animals to hurt them. The shell keeps them safe. Why does a turtle pull its head inside its shell? Tap the words.', prompt: null,
      choices: [word('to stay safe', true), word('to eat lunch'), word('to dry off')],
      solution: 'The text says a turtle pulls in when it is scared, so it is hard for other animals to hurt it. The shell keeps it safe.' },
    { slot: 12, difficulty: 'hard', stem: 'Listen. Sometimes you see a rainbow in the sky. A rainbow shows up when the sun shines through drops of rain. The light bends and splits into many colors. So look for a rainbow when it is sunny and rainy at once. What two things make a rainbow? Tap the words.', prompt: null,
      choices: [word('sun and rain', true), word('snow and ice'), word('moon and fog')],
      solution: 'The text says a rainbow shows up when the sun shines through drops of rain. The sun and the rain make a rainbow.' },
    { slot: 13, difficulty: 'hard', stem: 'Listen. In summer and fall, many bears eat and eat. They get very fat. When the cold winter weather comes, food is hard to find. So many bears crawl into a den and sleep for a long time. In which season do many bears take their long sleep? Tap the word.', prompt: null,
      choices: [word('winter', true), word('summer'), word('fall')],
      solution: 'The text says the bears eat in summer and fall. When cold winter weather comes, many bears sleep in a den. They sleep in winter.' },
    { slot: 14, difficulty: 'hard', stem: 'Listen. Ants live in big groups called colonies. Many ants dig tunnels and rooms underground. Some rooms hold food. Other rooms hold baby ants. Worker ants carry food down into the tunnels. Where do many ants make their home? Tap the words.', prompt: null,
      choices: [word('underground', true), word('in the sky'), word('in the sea')],
      solution: 'The text says many ants dig tunnels and rooms underground, where they keep food and baby ants.' },
  ],
}

export default skill
