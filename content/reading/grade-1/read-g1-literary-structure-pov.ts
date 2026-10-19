import type { ContentChoice, ContentSkill } from '../../types'

const pic = (image: string, correct = false, text = image): ContentChoice => ({ text, is_correct: correct, tile: { kind: 'object_group', image, count: 1 } })
const word = (w: string, correct = false): ContentChoice => ({ text: w, is_correct: correct, tile: { kind: 'word', value: w } })

// RL.1.5: a story (characters, things happen) or facts (true facts)
const story = (isStory: boolean): ContentChoice[] => [word('story', isStory), word('facts', !isStory)]
// RL.1.6: is this character the one telling the story?
const yesNo = (yes: boolean): ContentChoice[] => [word('yes', yes), word('no', !yes)]

const skill: ContentSkill = {
  slug: 'read-g1-literary-structure-pov',
  subject: 'reading',
  grade: 1,
  group: 'Literature',
  name: 'Structure and point of view in literature',
  standards: ['RL.1.5', 'RL.1.6'],
  renderMode: 'audio_picture',
  items: [
    // RL.1.5 easy: storybook or fact book
    { slot: 1, difficulty: 'easy', stem: 'Listen to this part of a book. Pig put on a red hat. Pig went to see Duck. They had a picnic in the sun. Is this from a storybook or a fact book? Tap the word story or the word facts.', prompt: null,
      choices: story(true),
      solution: 'This part has characters, Pig and Duck, and things happen to them: a hat, a visit, a picnic. That makes it a story.' },
    { slot: 2, difficulty: 'easy', stem: 'Listen to three books. One book is about a pig who wears a crown and lives in a castle. One book is about a duck who drives a car. One book tells true facts about real cows. Which one is a fact book? Tap the picture.', prompt: null,
      choices: [pic('cow', true), pic('pig'), pic('duck')],
      solution: 'A fact book tells true things, like facts about real cows. A pig in a crown and a duck who drives a car are pretend, so those books are storybooks.' },
    { slot: 3, difficulty: 'easy', stem: 'Listen to three books. One book tells true facts about apples. One book tells true facts about rain. One book is about a sun who wears a hat and tells jokes. Which one is a storybook? Tap the picture.', prompt: null,
      choices: [pic('sun', true), pic('apple'), pic('rain')],
      solution: 'A sun that wears a hat and tells jokes is pretend, so that book tells a story. The books about apples and rain tell true facts.' },
    { slot: 4, difficulty: 'easy', stem: 'Listen to this part of a book. The sun is a star. The sun gives us light. The sun keeps the earth warm. Is this from a storybook or a fact book? Tap the word story or the word facts.', prompt: null,
      choices: story(false),
      solution: 'Each sentence tells a true fact about the sun. There are no characters and nothing happens to anyone. It is from a fact book.' },
    { slot: 5, difficulty: 'easy', stem: 'Ana wants a book with true facts about bugs. Ana can pick a book about an ant who throws a party, a book about a worm who sings songs, or a book about how real butterflies drink from flowers. Which book should Ana pick? Tap the picture.', prompt: null,
      choices: [pic('butterfly', true), pic('ant'), pic('worm')],
      solution: 'Real butterflies do drink from flowers, so that book tells true facts. An ant at a party and a singing worm are pretend, so those books are storybooks.' },

    // RL.1.5 medium
    { slot: 6, difficulty: 'medium', stem: 'Which of these would you find in a fact book about animals? Listen. A fish puts on a hat and goes to school. A whale breathes air. A crab bakes a cake for a party. Tap the picture.', prompt: null,
      choices: [pic('whale', true), pic('fish'), pic('crab')],
      solution: 'A whale breathes air, and that is true, so it belongs in a fact book. A fish that goes to school and a crab that bakes a cake are pretend, like in a storybook.' },
    { slot: 7, difficulty: 'medium', stem: 'This storybook has a talking pig. Some things in it could only happen in a storybook. Listen. A bird builds a nest. A dog reads a book to a kid. A hen lays an egg. Which one could only happen in a storybook? Tap the picture.', prompt: null,
      choices: [pic('dog', true), pic('bird'), pic('hen')],
      solution: 'Real dogs cannot read, so a dog reading a book is pretend, and pretend things happen in storybooks. Birds really build nests, and hens really lay eggs.' },
    { slot: 8, difficulty: 'medium', stem: 'Sam wants to learn true facts about space. Sam can pick a book about a star who makes a wish, a book about how real rockets carry people into space, or a book about a moon who sings a song. Which book should Sam pick? Tap the picture.', prompt: null,
      choices: [pic('rocket', true), pic('star'), pic('moon')],
      solution: 'Real rockets do carry people into space, so that book tells true facts. A star that makes a wish and a moon that sings are pretend, so those books are storybooks.' },
    { slot: 9, difficulty: 'medium', stem: 'Listen to this part of a book. One day, Lena and Sam made a kite. The wind took the kite up high. Lena and Sam ran after it across the park. Is this from a storybook or a fact book? Tap the word story or the word facts.', prompt: null,
      choices: story(true),
      solution: 'Lena and Sam are characters, and things happen to them: they make a kite, the wind takes it, and they run. That is a story.' },
    { slot: 10, difficulty: 'medium', stem: 'Which of these would you find in a storybook? Listen. Snow is cold. A snowman talks and dances with a fox. Rain falls from clouds. Tap the picture.', prompt: null,
      choices: [pic('snowman', true), pic('snow'), pic('rain')],
      solution: 'A snowman that talks and dances is pretend, so it belongs in a storybook. Snow is cold, and rain falls from clouds. Those are true facts, like in a fact book.' },
    { slot: 11, difficulty: 'medium', stem: 'Listen to this part of a book. The little red bus woke up early. Beep, beep, said the bus. The bus picked up all the kids and took them to school. Is this from a storybook or a fact book? Tap the word story or the word facts.', prompt: null,
      choices: story(true),
      solution: 'The little bus is a character that wakes up and talks, and things happen to it on the way to school. That makes it a story.' },
    { slot: 12, difficulty: 'medium', stem: 'Listen to this part of a book. Many owls hunt at night. Owls have big eyes. Big eyes help owls see in the dark. Does this part tell a story or give facts? Tap the word story or the word facts.', prompt: null,
      choices: story(false),
      solution: 'This part tells true facts about owls: when many owls hunt and how their big eyes help them. It gives facts.' },

    // RL.1.5 hard: a story about real animal things, facts that say you, a story told with I
    { slot: 13, difficulty: 'hard', stem: 'Listen to this part of a book. Tim the turtle woke up by the pond. Tim crawled onto a log to sit in the sun. Then Tim went for a swim. Is this from a storybook or a fact book? Tap the word story or the word facts.', prompt: null,
      choices: story(true),
      solution: 'Real turtles do these things, but Tim is a character with a name, and the part tells what happened to Tim one day. That makes it a story.' },
    { slot: 14, difficulty: 'hard', stem: 'Listen to this part of a book. Snow is made of tiny bits of ice. You can roll snow into a big ball. Snow melts when it gets warm. Is this from a storybook or a fact book? Tap the word story or the word facts.', prompt: null,
      choices: story(false),
      solution: 'There is no character and nothing happens to anyone. Each sentence tells something true about snow. It is from a fact book.' },
    { slot: 15, difficulty: 'hard', stem: 'Listen to this part of a book. I woke up and looked outside. Snow! I put on my coat. Then I ran out to play in the snow with my dog. Does this part tell a story or give facts? Tap the word story or the word facts.', prompt: null,
      choices: story(true),
      solution: 'A character tells what happened to them one snowy morning: waking up, putting on a coat, and playing. Things happen, so it tells a story.' },
    { slot: 16, difficulty: 'hard', stem: 'Listen carefully. Which one is a true fact, the kind you find in a fact book? A frog named Fred woke up and hopped into the pond. A bear named Bo rode a bike to the park. Owls can see well at night. Tap the picture.', prompt: null,
      choices: [pic('owl', true), pic('frog'), pic('bear')],
      solution: 'Owls really can see well at night, so that is a fact. Real frogs hop, but Fred is a character, and it tells what Fred did one day, so it is a story. So is a bear on a bike.' },

    // RL.1.6 easy: a character says I and names itself
    { slot: 17, difficulty: 'easy', stem: 'Listen. I am a little duck. I swim in the pond all day. Who is telling this story? Tap the picture.', prompt: null,
      choices: [pic('duck', true), pic('frog'), pic('fish')],
      solution: 'The story says, I am a little duck. When a character says I, that character is telling the story. The duck is telling it.' },
    { slot: 18, difficulty: 'easy', stem: 'Listen. I am a big brown bear. I sleep in my den all winter. Who is telling this story? Tap the picture.', prompt: null,
      choices: [pic('bear', true), pic('lion'), pic('cow')],
      solution: 'The story says, I am a big brown bear. The bear uses the word I, so the bear is telling the story.' },
    { slot: 19, difficulty: 'easy', stem: 'Listen. Hello! I am a hen. I live on a farm, and I lay eggs. Who is telling this story? Tap the picture.', prompt: null,
      choices: [pic('hen', true), pic('pig'), pic('horse')],
      solution: 'The story says, I am a hen. The hen tells about the farm and the eggs, so the hen is telling the story.' },
    { slot: 20, difficulty: 'easy', stem: 'Listen. I am a fish. I swim in the water, and I have shiny fins. Who is telling this story? Tap the picture.', prompt: null,
      choices: [pic('fish', true), pic('bird'), pic('dog')],
      solution: 'The story says, I am a fish. The fish uses the word I, so the fish is telling the story.' },

    // RL.1.6 medium: the teller is not named, so use the clues; is this character telling it?
    { slot: 21, difficulty: 'medium', stem: 'Listen. I like to hop in the grass. I have long ears, and I love to munch carrots. Who is telling this story? Tap the picture.', prompt: null,
      choices: [pic('rabbit', true), pic('frog'), pic('bear')],
      solution: 'The one telling the story says I hop, I have long ears, and I munch carrots. A frog hops too, but long ears and carrots tell us it is the rabbit.' },
    { slot: 22, difficulty: 'medium', stem: 'Listen. I live by the sea. I walk sideways on the sand, and I have two big claws. Who is telling this story? Tap the picture.', prompt: null,
      choices: [pic('crab', true), pic('whale'), pic('cat')],
      solution: 'The one saying I walks sideways on the sand and has two big claws. That is a crab, so the crab is telling the story.' },
    { slot: 23, difficulty: 'medium', stem: 'Listen. Moo! I live in a big red barn. I eat grass all day long. Who is telling this story? Tap the picture.', prompt: null,
      choices: [pic('cow', true), pic('duck'), pic('cat')],
      solution: 'The one telling the story says moo and eats grass all day. A cow says moo, so the cow is telling the story.' },
    { slot: 24, difficulty: 'medium', stem: 'Listen. I am very big and gray. I use my long trunk to drink water. Who is telling this story? Tap the picture.', prompt: null,
      choices: [pic('elephant', true), pic('mouse'), pic('horse')],
      solution: 'The one saying I is big and gray and has a long trunk. An elephant has a trunk, so the elephant is telling the story.' },
    { slot: 25, difficulty: 'medium', stem: 'Listen. The frog sat on a log. The frog said ribbit. Then the frog jumped into the pond. Is the frog telling this story? Tap yes or no.', prompt: null,
      choices: yesNo(false),
      solution: 'The story says the frog, not I. Someone else, called the narrator, is telling us about the frog. So the frog is not telling it.' },
    { slot: 26, difficulty: 'medium', stem: 'Listen. I am a pig. I love to roll in the mud. Then I take a nap in the sun. Is the pig telling this story? Tap yes or no.', prompt: null,
      choices: yesNo(true),
      solution: 'The story says, I am a pig. The pig uses the word I to tell about its own day. So the pig is telling this story.' },

    // RL.1.6 hard: another character is named, or the teller changes
    { slot: 27, difficulty: 'hard', stem: 'Listen. I quack and swim on the pond. One day, my friend Frog jumped in to swim with me. We splashed and played. Who is telling this story? Tap the picture.', prompt: null,
      choices: [pic('duck', true), pic('frog'), pic('fish')],
      solution: 'Frog is in the story, but the one saying I quacks and swims with a friend named Frog. A duck quacks, so the duck is telling the story.' },
    { slot: 28, difficulty: 'hard', stem: 'Listen. My friend Bear is very big. I am very small. I like to eat cheese, and I hide in a little hole. Who is telling this story? Tap the picture.', prompt: null,
      choices: [pic('mouse', true), pic('bear'), pic('cat')],
      solution: 'Bear is the friend. The one saying I is very small, eats cheese, and hides in a little hole. That is the mouse, so the mouse is telling the story.' },
    { slot: 29, difficulty: 'hard', stem: 'Listen. This book has two parts. In part one, a cat says: I like to nap in the sun. In part two, a new animal says: I like to dig in the yard and bark. Who is telling part two? Tap the picture.', prompt: null,
      choices: [pic('dog', true), pic('cat'), pic('bird')],
      solution: 'The cat tells part one. In part two, the one saying I digs and barks. A dog barks, so the dog is telling part two.' },

    // RL.1.6 easy: which character is talking in a line of dialogue
    { slot: 30, difficulty: 'easy', stem: 'Listen. "Woof! Let\'s play ball!" said Dog. Who said, let\'s play ball? Tap the picture.', prompt: null,
      choices: [pic('dog', true), pic('cat'), pic('pig')],
      solution: 'The story says, said Dog. Dog is the one talking, and Dog wants to play ball.' },
    { slot: 31, difficulty: 'easy', stem: 'Listen. "Moo! I am so hungry," said Cow. Who is talking? Tap the picture.', prompt: null,
      choices: [pic('cow', true), pic('pig'), pic('horse')],
      solution: 'The words, said Cow, tell us who is talking. Cow says moo and is hungry.' },
    { slot: 32, difficulty: 'easy', stem: 'Listen. "Ribbit! Look how far I can jump!" said Frog. Who is talking? Tap the picture.', prompt: null,
      choices: [pic('frog', true), pic('duck'), pic('bear')],
      solution: 'The story says, said Frog. Frog is the one talking about jumping far.' },

    // RL.1.6 medium: two characters, find who said a line
    { slot: 33, difficulty: 'medium', stem: 'Listen. Fish and Bird met by the lake. "I love to swim," said Fish. "I love to fly," said Bird. Who said, I love to fly? Tap the picture.', prompt: null,
      choices: [pic('bird', true), pic('fish'), pic('cat')],
      solution: 'Fish said, I love to swim. Then the story says, I love to fly, said Bird. So Bird said it.' },
    { slot: 34, difficulty: 'medium', stem: 'Listen. Cat and Mouse met in the house. "Please do not chase me," said Mouse. "Okay, let\'s be friends," said Cat. Who said, please do not chase me? Tap the picture.', prompt: null,
      choices: [pic('mouse', true), pic('cat'), pic('dog')],
      solution: 'The story says, please do not chase me, said Mouse. Cat answered, let\'s be friends.' },
    { slot: 35, difficulty: 'medium', stem: 'Listen. Hen saw Pig in the mud. "You are so muddy!" said Hen. "I like the mud!" said Pig. Who said, I like the mud? Tap the picture.', prompt: null,
      choices: [pic('pig', true), pic('hen'), pic('cow')],
      solution: 'Hen said, you are so muddy. Then the story says, I like the mud, said Pig. So Pig said it.' },
    { slot: 36, difficulty: 'medium', stem: 'Listen. "May I have a carrot?" asked Rabbit. "Yes, here you go," said Horse. Who asked for a carrot? Tap the picture.', prompt: null,
      choices: [pic('rabbit', true), pic('horse'), pic('goat')],
      solution: 'The story says, may I have a carrot, asked Rabbit. Horse is the one who gave it.' },
    { slot: 37, difficulty: 'medium', stem: 'Listen. "Hoot, hoot! I can see in the dark," said a bird in the tree. Which bird is talking? Tap the picture.', prompt: null,
      choices: [pic('owl', true), pic('hen'), pic('duck')],
      solution: 'The bird says hoot and can see in the dark. An owl says hoot, so the owl is talking.' },

    // RL.1.6 hard: the speaker is not named, so use the clues in the words
    { slot: 38, difficulty: 'hard', stem: 'Listen. A duck and a frog sat by the pond. One said, "Quack! Come swim with me!" The other said, "No thanks. I will hop on my lily pad." Who said, come swim with me? Tap the picture.', prompt: null,
      choices: [pic('duck', true), pic('frog'), pic('fish')],
      solution: 'The one who said come swim with me also said quack. A duck says quack. The frog is the one who wants to hop.' },
    { slot: 39, difficulty: 'hard', stem: 'Listen. A lion and a mouse met in the grass. One said, "Squeak! Please do not eat me." The other said, "Roar! I will let you go." Who said, please do not eat me? Tap the picture.', prompt: null,
      choices: [pic('mouse', true), pic('lion'), pic('bear')],
      solution: 'The one who said please do not eat me also said squeak. A mouse squeaks. The lion is the one who roars.' },
    { slot: 40, difficulty: 'hard', stem: 'Listen. Monkey and Elephant had lunch. "Have a banana," said Monkey. "Thank you! Now I will spray you with water from my trunk to cool you off." Who said thank you? Tap the picture.', prompt: null,
      choices: [pic('elephant', true), pic('monkey'), pic('lion')],
      solution: 'Monkey gave a banana. The one who said thank you sprays water from a trunk, and only Elephant has a trunk. So Elephant said it.' },
  ],
}

export default skill
