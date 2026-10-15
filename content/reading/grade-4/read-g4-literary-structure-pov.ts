import type { ContentChoice, ContentSkill } from '../../types'

const right = (text: string): ContentChoice => ({ text, is_correct: true })
const wrong = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'read-g4-literary-structure-pov',
  subject: 'reading',
  grade: 4,
  group: 'Literature',
  name: 'Structure and Point of View in Literature',
  standards: ['RL.4.5', 'RL.4.6'],
  passages: [
    {
      code: 'rg4-literary-structure-pov-p01',
      title: 'The Paper Dragon',
      body: `Every spring, our town holds a kite festival at Miller Field. This year I decided to build my own kite instead of buying one.

I chose a dragon shape with a long tail made from strips of old newspaper. My little brother Tomas helped me paint green scales on the wings. It took us four afternoons, and our kitchen table was covered in glue.

On the morning of the festival, the wind was strong. My hands shook as I let out the string. For a moment, the dragon dipped toward the grass, and my stomach dipped with it. Then a gust caught the wings, and the kite climbed higher than the trees.

Tomas jumped up and down. "Go, Lina!" he shouted. A woman next to us asked where we had bought such a fine kite. I felt my face get warm.

"We made it," I said. Then I handed Tomas the string so he could feel the dragon pull.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Who is telling this story?`,
          choices: [
            right(`Lina, the girl who built the dragon kite with her brother`),
            wrong(`Tomas, the little brother who helped paint the kite`, 'confuses-narrator-with-character'),
            wrong(`The woman at the festival who asked about the kite`, 'confuses-narrator-with-character'),
            wrong(`An outside narrator who is not part of the story`, 'confuses-first-and-third-person'),
          ],
          solution: `The narrator says "I decided to build my own kite," and Tomas shouts "Go, Lina!" to her, so Lina is telling her own story. Tomas is a character she describes, not the narrator.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which clue best shows that this story is told in the first person?`,
          choices: [
            wrong(`The story takes place at a town kite festival.`, 'confuses-setting-with-pov'),
            right(`The narrator uses words like "I," "my," and "we."`),
            wrong(`The story includes a character named Tomas.`, 'confuses-character-with-pov'),
            wrong(`The kite is shaped like a green dragon.`, 'irrelevant-detail'),
          ],
          solution: `A first person narrator is a character who uses "I," "my," and "we," as Lina does throughout. The setting and the other characters do not tell us who is narrating.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Because Lina tells the story herself, which detail can the reader learn?`,
          choices: [
            wrong(`What Tomas was thinking as he jumped up and down`, 'narrator-cannot-know'),
            wrong(`Where the woman at the festival bought her own kite`, 'unsupported-inference'),
            right(`How nervous Lina felt when the kite dipped toward the grass`),
            wrong(`What every person at Miller Field felt about the kite`, 'narrator-cannot-know'),
          ],
          solution: `Lina can share her own feelings, like her shaking hands and her stomach that "dipped with it." She cannot know what Tomas was thinking; she can only describe what he did.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which feature shows that "The Paper Dragon" is written as prose?`,
          choices: [
            wrong(`It is written in short lines grouped into stanzas.`, 'confuses-prose-and-poetry'),
            wrong(`It has a list of characters and stage directions.`, 'confuses-prose-and-drama'),
            wrong(`It has rhyming words at the end of each line.`, 'confuses-prose-and-poetry'),
            right(`It is written in full sentences grouped into paragraphs.`),
          ],
          solution: `Prose is ordinary writing in sentences and paragraphs, which is how this story is built. It has no stanzas or rhymes like a poem, and no stage directions like a drama.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `If this story were retold by a third person narrator, how would the sentence "My hands shook as I let out the string" most likely change?`,
          choices: [
            wrong(`"My hands shook as Lina let out the string."`, 'mixes-points-of-view'),
            right(`"Lina's hands shook as she let out the string."`),
            wrong(`"Tomas's hands shook as he let out the string."`, 'changes-character'),
            wrong(`"Your hands shook as you let out the string."`, 'confuses-second-person'),
          ],
          solution: `A third person narrator calls the character by name and uses "she" instead of "I," so the sentence becomes "Lina's hands shook as she let out the string." Mixing "My" with "Lina" blends two points of view, and the Tomas choice changes who is doing the action.`,
        },
      ],
    },
    {
      code: 'rg4-literary-structure-pov-p02',
      title: 'The Night Train',
      body: `Clack and clatter, clack and hum.
Through the dark the night trains come.
Past the farms where cattle sleep.
Past the hills so wide and deep.

Windows glow like golden squares.
Riders rest in cozy chairs.
One reads a book, one hums a tune.
One waves hello up to the moon.

A conductor walks from car to car.
She checks the tickets, near and far.
She tips her hat and smiles at me.
I count the stars I still can see.

Down the tracks and round the bend,
Rolling on to journey's end.
By morning light the city wakes.
It hears the squeal of iron brakes.

Clack and clatter, clack and hum.
Home at last the night trains come.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `The poem is divided into groups of lines with space between them. What are these groups called?`,
          choices: [
            wrong(`Paragraphs`, 'confuses-prose-and-poetry'),
            right(`Stanzas`),
            wrong(`Scenes`, 'confuses-poetry-and-drama'),
            wrong(`Chapters`, 'confuses-prose-and-poetry'),
          ],
          solution: `In a poem, a group of lines is called a stanza. Paragraphs are groups of sentences in prose, and scenes are parts of a drama.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which pair of words rhymes in the first stanza?`,
          choices: [
            wrong(`clack and dark`, 'confuses-rhyme-with-sound'),
            wrong(`trains and farms`, 'confuses-rhyme-with-sound'),
            right(`hum and come`),
            wrong(`clatter and cattle`, 'confuses-rhyme-with-sound'),
          ],
          solution: `"Hum" ends the first line and "come" ends the second, and they share the same ending sound. "Clatter" and "cattle" start alike, but they do not rhyme.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Why does the poet repeat the line "Clack and clatter, clack and hum" at the beginning and the end?`,
          choices: [
            right(`To echo the steady sound of the train and close the poem the way it began`),
            wrong(`To show that the train broke down and had to start its trip over`, 'literal-reading'),
            wrong(`To introduce a new character who rides the train at the very end`, 'unsupported-inference'),
            wrong(`To tell the reader the exact time when the train left the station`, 'misreads-purpose'),
          ],
          solution: `The repeated line sounds like train wheels, and using it first and last makes the poem feel like one full trip from start to finish. Nothing in the poem says the train broke down.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `What is one way this poem is different from a story written in prose?`,
          choices: [
            wrong(`It has a setting, and stories in prose never have a setting.`, 'overgeneralizes'),
            wrong(`It tells events in order, and prose never tells events in order.`, 'overgeneralizes'),
            wrong(`It uses stage directions to show how the riders move.`, 'confuses-poetry-and-drama'),
            right(`It uses short lines with a regular beat and rhyming words.`),
          ],
          solution: `Poems are often built from lines with rhythm and rhyme, like "hum" and "come," while prose uses sentences in paragraphs. Prose stories also have settings and events in order, so those are not differences.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Read the line "Clack and clatter, clack and hum." How does the beat of this line connect to what the poem is about?`,
          choices: [
            wrong(`Its slow, uneven beat sounds like a passenger falling asleep.`, 'misreads-meter'),
            right(`Its steady, repeating beat sounds like train wheels on the tracks.`),
            wrong(`Its quiet beat sounds like the conductor checking each ticket.`, 'misreads-meter'),
            wrong(`Its loud beat sounds like the city waking up in the morning.`, 'too-narrow'),
          ],
          solution: `The line repeats a strong, even pattern of beats, the same way wheels go "clack" over and over on a track. The beat is steady, not slow and uneven, so it does not sound like someone falling asleep.`,
        },
      ],
    },
    {
      code: 'rg4-literary-structure-pov-p03',
      title: 'The Missing Map',
      body: `CHARACTERS: NADIA, a fourth grader. OWEN, her classmate. MR. HALVORSEN, the school librarian.

SETTING: The school library after lunch. A long table holds old photos of the town.

NADIA: (looking under the table) It has to be here somewhere. The map was on this table an hour ago.

OWEN: (holding up a stack of photos) Maybe it got mixed in with these.

MR. HALVORSEN: (entering with a cart of books) What are you two searching for?

NADIA: The old town map from 1890. It is the center of our history display.

OWEN: Without it, nobody will know where the first school stood.

MR. HALVORSEN: (smiling) Did you check the frame?

(NADIA turns around. A wooden frame leans against the wall. The map is inside it, behind glass.)

NADIA: (laughing) You framed it for us!

MR. HALVORSEN: Old paper tears easily. Now it will stay safe for the whole display.

OWEN: (lifting the frame carefully) Let's hang it where everyone can see it.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `What do the words in parentheses, such as "(looking under the table)," tell the reader?`,
          choices: [
            wrong(`They are words the character says out loud to the others.`, 'confuses-directions-with-dialogue'),
            right(`They are stage directions that tell how a character moves or acts.`),
            wrong(`They are the title and the list of characters in the play.`, 'confuses-drama-parts'),
            wrong(`They are rhyming lines that make the play sound like a poem.`, 'confuses-poetry-and-drama'),
          ],
          solution: `In a drama, words in parentheses are stage directions that show actions, like Nadia looking under the table. Actors do not say these words out loud.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which part of the drama tells where and when the scene takes place?`,
          choices: [
            wrong(`The list of characters at the top`, 'confuses-drama-parts'),
            wrong(`Owen's last line about hanging the map`, 'too-narrow'),
            right(`The line that begins with "SETTING"`),
            wrong(`Mr. Halvorsen's question about the frame`, 'too-narrow'),
          ],
          solution: `The SETTING line says the scene happens in "the school library after lunch." The character list tells who is in the play, not where it happens.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `How does the reader learn what the characters are feeling in this drama?`,
          choices: [
            wrong(`A narrator explains each character's private thoughts.`, 'confuses-prose-and-drama'),
            right(`Their spoken lines and stage directions, like "(laughing)," show it.`),
            wrong(`Each character tells the story in a separate paragraph.`, 'confuses-prose-and-drama'),
            wrong(`The rhyming lines at the end of each stanza reveal it.`, 'confuses-poetry-and-drama'),
          ],
          solution: `A drama has no narrator, so feelings come through what characters say and through stage directions such as "(laughing)" and "(smiling)." There is no narrator in this scene sharing thoughts.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Why does the drama begin with a list of characters?`,
          choices: [
            right(`To tell readers and actors who will appear before the scene starts`),
            wrong(`To show the order in which the characters will leave the stage`, 'unsupported-inference'),
            wrong(`To explain the problem the characters must solve in the scene`, 'confuses-drama-parts'),
            wrong(`To tell which character is narrating the events of the story`, 'confuses-prose-and-drama'),
          ],
          solution: `A cast list at the start of a play names and briefly describes each character, such as "MR. HALVORSEN, the school librarian." It does not explain the problem; the dialogue does that.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `If this scene were rewritten as a story in prose, which change would most likely happen?`,
          choices: [
            wrong(`The scene would be broken into stanzas with rhyming lines.`, 'confuses-prose-and-poetry'),
            wrong(`The characters would stop speaking to each other at all.`, 'overgeneralizes'),
            right(`Names before each line would become quotation marks and "Nadia said."`),
            wrong(`More stage directions in parentheses would be added to each line.`, 'confuses-prose-and-drama'),
          ],
          solution: `Prose shows talking with quotation marks and tags like "Nadia said," and a narrator would describe actions instead of stage directions. Prose characters can still talk, so they would not stop speaking.`,
        },
      ],
    },
    {
      code: 'rg4-literary-structure-pov-p04',
      title: 'Four Tiny Specks',
      body: `Amara had never stayed up past ten on a school night, but tonight was special. Uncle Rafael had promised to show her Jupiter through his telescope.

They set up the telescope in the backyard. Amara peered into the eyepiece and saw only a blur. She worried that she was doing it wrong. She worried that her uncle would think she was too young for this.

Uncle Rafael noticed her frown. He remembered his own first night with a telescope, when he had seen nothing but his own eyelash. He knelt down and turned a small knob on the side.

"Try now," he said.

Amara looked again. This time a bright, round dot floated in the dark. Next to it were four tiny specks lined up in a row.

"Those are Jupiter's moons," Uncle Rafael said.

Amara counted them twice. She decided right then that she would draw them every clear night for a month to see how they moved.

Uncle Rafael smiled as she ran inside for her sketchbook. He thought that the telescope had just found a new owner.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `From what point of view is this story told?`,
          choices: [
            wrong(`First person, by Amara using the word "I"`, 'confuses-first-and-third-person'),
            wrong(`First person, by Uncle Rafael using the word "I"`, 'confuses-first-and-third-person'),
            right(`Third person, by a narrator who uses "she" and "he"`),
            wrong(`Second person, by a narrator who uses the word "you"`, 'confuses-second-person'),
          ],
          solution: `The narrator is not a character and calls the characters "she" and "he," as in "She worried that she was doing it wrong." Neither Amara nor her uncle tells the story using "I."`,
        },
        {
          slot: 17,
          difficulty: 'medium',
          stem: `What does the narrator tell the reader that Amara does not know?`,
          choices: [
            right(`That Uncle Rafael once saw only his eyelash on his first try`),
            wrong(`That Amara worried she was too young to use the telescope`, 'narrator-cannot-know'),
            wrong(`That four tiny specks were lined up next to Jupiter`, 'too-narrow'),
            wrong(`That Uncle Rafael turned a knob on the side of the telescope`, 'too-narrow'),
          ],
          solution: `The narrator shares Uncle Rafael's private memory of seeing "nothing but his own eyelash," which he never says aloud. Amara knows her own worries, and she sees the specks and the knob turning herself.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which sentence shows Amara's private worry?`,
          choices: [
            wrong(`"Amara counted them twice."`, 'misreads-character'),
            wrong(`"Uncle Rafael noticed her frown."`, 'confuses-characters'),
            wrong(`"This time a bright, round dot floated in the dark."`, 'too-narrow'),
            right(`"She worried that her uncle would think she was too young for this."`),
          ],
          solution: `This sentence tells what Amara feels inside but does not say out loud. Uncle Rafael noticing her frown shows what he sees on the outside, not the worry itself.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `How would the story be different if Amara told it in the first person?`,
          choices: [
            wrong(`Readers would no longer learn that Amara saw Jupiter's moons.`, 'contradicts-text'),
            right(`Readers would not learn Uncle Rafael's memory unless he said it aloud.`),
            wrong(`Readers would learn less about how Amara felt at the telescope.`, 'reverses-pov-effect'),
            wrong(`Readers would hear the story told as a poem with rhyming lines.`, 'confuses-pov-and-structure'),
          ],
          solution: `A first person narrator only knows her own thoughts, so Amara could not share her uncle's private memory or his thought about a new owner. She would still tell about her own feelings, so readers would not learn less about them.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Why might the author have chosen a narrator who can share the thoughts of both characters?`,
          choices: [
            wrong(`To keep the reader from knowing whether Amara ever saw Jupiter`, 'reverses-pov-effect'),
            wrong(`To show that Uncle Rafael is annoyed that Amara is too young`, 'contradicts-text'),
            right(`To show Amara's worry and her uncle's understanding and pride`),
            wrong(`To make the story sound like a play with lines for each actor`, 'confuses-pov-and-structure'),
          ],
          solution: `The narrator shows Amara's nervous thoughts and also Uncle Rafael's memory and his thought that the telescope "had just found a new owner," so readers see both sides. Nothing shows the uncle is annoyed; he understands because the same thing happened to him.`,
        },
      ],
    },
    {
      code: 'rg4-literary-structure-pov-p05',
      title: 'I Am the Old Stone Bridge',
      body: `I am the old stone bridge.
I stretch across the creek.
I have stood here a hundred years
Through rainy month and windy week.

In the morning, bikes roll over me.
Their spinning tires sing.
At noon, a farmer leads her goats.
Their tiny hooves go ting.

In the evening, I watch the water.
It sparkles pink and gold.
Children lean on my rough gray rail.
They drop in sticks and leaves they hold.

I do not talk. I do not walk.
I simply hold the way.
But everyone who crosses me
Gets safely home each day.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Who is the speaker of this poem?`,
          choices: [
            wrong(`A farmer who walks her goats to the creek`, 'confuses-speaker-with-character'),
            wrong(`A child who drops sticks into the water`, 'confuses-speaker-with-character'),
            wrong(`A poet who is describing a bridge from far away`, 'confuses-first-and-third-person'),
            right(`The old stone bridge that stretches across the creek`),
          ],
          solution: `The poem begins "I am the old stone bridge," so the bridge is the speaker telling about its own day. The farmer and the children are people the bridge describes.`,
        },
        {
          slot: 22,
          difficulty: 'easy',
          stem: `Which pair of words rhymes in the second stanza?`,
          choices: [
            right(`sing and ting`),
            wrong(`morning and noon`, 'confuses-rhyme-with-sound'),
            wrong(`bikes and goats`, 'confuses-rhyme-with-sound'),
            wrong(`over and farmer`, 'confuses-rhyme-with-sound'),
          ],
          solution: `"Sing" and "ting" end the second and fourth lines of that stanza and share the same ending sound. "Morning" and "noon" are both times of day, but they do not rhyme.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `How is this poem organized?`,
          choices: [
            wrong(`Each stanza tells about a different bridge in the town.`, 'unsupported-inference'),
            right(`It moves through the bridge's day, then ends with a big idea.`),
            wrong(`It starts at night and moves backward to the early morning.`, 'reverses-sequence'),
            wrong(`It is a list of questions that the bridge asks the children.`, 'contradicts-text'),
          ],
          solution: `The second and third stanzas move from morning to noon to evening, and the last stanza explains that the bridge helps everyone get home. The poem goes forward in time, not backward.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `Suppose the line "I stretch across the creek" were changed to "The bridge stretches across the creek." How would the poem change?`,
          choices: [
            wrong(`The poem would turn into a drama with stage directions.`, 'confuses-pov-and-structure'),
            wrong(`The bridge would become a different kind of building.`, 'literal-reading'),
            right(`The poem would be in third person, not in the bridge's own voice.`),
            wrong(`The poem would be in first person and spoken by a child.`, 'confuses-first-and-third-person'),
          ],
          solution: `Using "The bridge" instead of "I" means someone outside is describing it, which is third person. In the poem as written, the bridge speaks for itself in first person.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `The bridge says, "I do not talk. I do not walk." What is surprising about this line?`,
          choices: [
            wrong(`It shows that the bridge is sad because it is too old to move.`, 'unsupported-inference'),
            right(`The bridge says it does not talk, yet it is telling the whole poem.`),
            wrong(`It proves that someone else is secretly the speaker of the poem.`, 'confuses-speaker-with-character'),
            wrong(`It is the only line in the poem that does not belong to a stanza.`, 'contradicts-text'),
          ],
          solution: `The whole poem is in the bridge's voice, so it is surprising when the speaker says "I do not talk." The poet imagines how a bridge would speak; the line does not mean someone else is the speaker.`,
        },
      ],
    },
    {
      code: 'rg4-literary-structure-pov-p06',
      title: 'The Bravest Potato',
      body: `CHARACTERS: JUNO, age nine. MARCO, her brother, age seven. GRANDMA BEA.

SETTING: A living room on a rainy Saturday. A blanket hangs over two chairs to make a puppet stage.

(Rain taps on the window. JUNO kneels behind the blanket with a sock puppet on each hand.)

JUNO: Ready, Marco? Grandma will be here any minute.

MARCO: (frowning at his paper bag puppet) My lion looks more like a potato.

JUNO: Then let him be a potato who wants to be a lion. That is a better story anyway.

MARCO: (thinking, then grinning) A potato with a big roar!

(The doorbell rings. GRANDMA BEA enters, shaking water from her umbrella.)

GRANDMA BEA: I heard there is a show today. Do I need a ticket?

JUNO: (handing her a folded paper) Here you go. Front row seat.

(GRANDMA BEA sits on the couch. MARCO lifts his puppet above the blanket.)

MARCO: (in a deep voice) ROAR! I am the bravest potato in the garden!

(GRANDMA BEA laughs so hard that she has to wipe her eyes.)`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `What does the first stage direction, "(Rain taps on the window...)," help the reader picture?`,
          choices: [
            wrong(`What Grandma Bea says when she first comes inside`, 'confuses-directions-with-dialogue'),
            right(`The rainy day and Juno getting ready behind the blanket`),
            wrong(`The words Marco will say when he lifts his puppet`, 'confuses-directions-with-dialogue'),
            wrong(`The ending, when Grandma Bea laughs at the show`, 'wrong-plot-stage'),
          ],
          solution: `This stage direction describes the rain and shows Juno kneeling behind the blanket with puppets, so readers can picture the start of the scene. It does not include any spoken words.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `How does the reader find out that Marco is unhappy with his puppet at first?`,
          choices: [
            wrong(`A narrator says that Marco feels upset and wants to quit.`, 'confuses-prose-and-drama'),
            wrong(`Juno tells Grandma Bea that Marco's puppet is ruined.`, 'contradicts-text'),
            wrong(`Marco says so in a rhyming line at the end of a stanza.`, 'confuses-poetry-and-drama'),
            right(`The direction "(frowning)" and his line about a potato show it.`),
          ],
          solution: `In a drama, feelings come through actions and words, and Marco is "(frowning at his paper bag puppet)" while saying it "looks more like a potato." There is no narrator in a play to tell us how he feels.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which of these is meant to be spoken aloud by an actor?`,
          choices: [
            right(`"Here you go. Front row seat."`),
            wrong(`"The doorbell rings."`, 'confuses-directions-with-dialogue'),
            wrong(`"A living room on a rainy Saturday."`, 'confuses-drama-parts'),
            wrong(`"Sits on the couch."`, 'confuses-directions-with-dialogue'),
          ],
          solution: `"Here you go. Front row seat." comes after JUNO's name and is her dialogue. The other choices come from stage directions or the setting, which tell what happens but are not spoken.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `How is the structure of this drama different from the structure of a poem?`,
          choices: [
            wrong(`It is written in stanzas, and a poem is written in paragraphs.`, 'confuses-poetry-and-drama'),
            right(`It is built from characters' lines and stage directions, not stanzas.`),
            wrong(`It has no characters, and a poem always has many characters.`, 'contradicts-text'),
            wrong(`It uses a narrator, and a poem never has anyone speaking in it.`, 'confuses-prose-and-drama'),
          ],
          solution: `A drama is written as lines for each character plus stage directions in parentheses, while a poem is usually written in lines grouped into stanzas. This play clearly has characters, so it is not missing them.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `The scene ends with a stage direction instead of a spoken line. What does this ending show?`,
          choices: [
            wrong(`That Grandma Bea is crying because she is sad about the rain`, 'misreads-character'),
            wrong(`That the actors forgot their lines before the play was over`, 'unsupported-inference'),
            right(`That the show is a success, shown through action instead of words`),
            wrong(`That a narrator has stepped in to explain the lesson of the play`, 'confuses-prose-and-drama'),
          ],
          solution: `Grandma Bea "laughs so hard that she has to wipe her eyes," so her action shows the potato show worked. She wipes her eyes from laughing, not from sadness.`,
        },
      ],
    },
    {
      code: 'rg4-literary-structure-pov-p07',
      title: 'The Hummingbird and the Heron',
      body: `Beside a quiet pond lived a heron who could stand still for hours. Each morning a hummingbird zipped past him, buzzing from flower to flower.

"How can you stand there doing nothing?" the hummingbird asked one day. "I have visited fifty flowers since sunrise."

The heron did not answer. He kept his eyes on the water.

The hummingbird laughed and darted away. She was sure that being fast was the only way to get things done.

By afternoon, the hummingbird was tired and hungry. The bees had already emptied the flowers near the pond. She drooped onto a reed beside the heron.

Just then, the heron's long neck shot down into the water. He came up with a fat fish in his beak.

"I was not doing nothing," the heron said kindly. "I was waiting for the right moment."

The hummingbird thought about this as she rested. The next day, she sat and watched the flowers before choosing which ones to visit.

Moral: Being busy is not always the same as being wise.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which statement best describes the narrator of this fable?`,
          choices: [
            wrong(`The hummingbird, who tells the story using "I"`, 'confuses-first-and-third-person'),
            wrong(`The heron, who tells the story using "I"`, 'confuses-first-and-third-person'),
            wrong(`A bee, who watches the birds from the flowers`, 'unsupported-inference'),
            right(`An outside narrator who calls the birds "he" and "she"`),
          ],
          solution: `The narrator is not one of the animals and uses "he" for the heron and "she" for the hummingbird, which is third person. The birds only say "I" inside their spoken lines.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which detail does the narrator share about the hummingbird's private thinking?`,
          choices: [
            right(`She was sure that being fast was the only way to get things done.`),
            wrong(`She asked the heron how he could stand there doing nothing.`, 'confuses-dialogue-with-thought'),
            wrong(`She had visited fifty flowers since the sun came up.`, 'confuses-dialogue-with-thought'),
            wrong(`She drooped onto a reed beside the heron in the afternoon.`, 'confuses-action-with-thought'),
          ],
          solution: `The narrator tells us "She was sure that being fast was the only way," which is a belief she never says out loud. Her question to the heron is spoken dialogue, not a private thought.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `What is the purpose of the line that begins "Moral:" at the end of the fable?`,
          choices: [
            wrong(`It is a stage direction that tells the heron how to move.`, 'confuses-prose-and-drama'),
            right(`It states the lesson of the fable directly for the reader.`),
            wrong(`It is the last thing the hummingbird says to the heron.`, 'confuses-dialogue-with-narration'),
            wrong(`It begins a new stanza that rhymes with the line before it.`, 'confuses-prose-and-poetry'),
          ],
          solution: `Fables often end with a moral, a sentence that states the lesson plainly. It is not in quotation marks, so it is not something the hummingbird says.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `The narrator tells what the hummingbird thinks but never tells what the heron is thinking while he stands still. How does this affect the story?`,
          choices: [
            right(`Like the hummingbird, readers do not know why he waits until he catches the fish.`),
            wrong(`Readers know from the start that the heron is hunting, so nothing is a surprise.`, 'reverses-pov-effect'),
            wrong(`Readers learn that the heron is angry at the hummingbird for laughing at him.`, 'unsupported-inference'),
            wrong(`Readers cannot tell which bird is speaking when the dialogue is in quotes.`, 'confuses-dialogue-with-narration'),
          ],
          solution: `Because the heron's thoughts are hidden, readers share the hummingbird's confusion until his neck "shot down into the water," which makes the catch a surprise. Nothing tells readers early that he is hunting.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `If the heron told this fable in the first person, which detail would most likely be added?`,
          choices: [
            wrong(`The hummingbird's private belief that speed was everything`, 'narrator-cannot-know'),
            right(`The heron's own reason for watching the water so closely`),
            wrong(`A list of the fifty flowers the hummingbird visited`, 'narrator-cannot-know'),
            wrong(`Stage directions that tell how each bird should move`, 'confuses-pov-and-structure'),
          ],
          solution: `A first person narrator shares his own thoughts, so the heron could explain early that he was waiting for a fish. He could not know the hummingbird's private belief unless she told him.`,
        },
      ],
    },
    {
      code: 'rg4-literary-structure-pov-p08',
      title: 'The Relay, Told Two Ways',
      body: `Version One

I stood on the starting block and stared at the water. Our relay team was in last place, and I was the final swimmer. My heart pounded so loudly that I could barely hear the crowd. When Keiko touched the wall, I dove in. I kicked as hard as I could and never looked at the other lanes. I did not know we had won until I lifted my head and saw my team cheering.

Version Two

Diego stood on the starting block and stared at the water. His team was in last place, and he was the final swimmer. In the stands, his father gripped the railing and whispered, "Come on, Diego." When Keiko touched the wall, Diego dove in. He kicked hard and passed one swimmer, then another. The swimmer in lane four looked over in surprise. Diego touched the wall first. He did not know it until he lifted his head and saw his team cheering.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Who tells Version One of the relay?`,
          choices: [
            wrong(`Keiko, the swimmer who touched the wall before Diego`, 'confuses-narrator-with-character'),
            wrong(`Diego's father, who watched from the stands`, 'confuses-narrator-with-character'),
            right(`Diego, the final swimmer, telling it in his own words`),
            wrong(`An outside narrator who calls Diego "he"`, 'confuses-first-and-third-person'),
          ],
          solution: `Version One uses "I" and "my," and the speaker is "the final swimmer," who is named Diego in Version Two. The outside narrator who calls him "he" tells Version Two, not Version One.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which detail appears only in Version One?`,
          choices: [
            wrong(`The team was in last place before the final swimmer dove in.`, 'misses-shared-detail'),
            right(`The swimmer's heart pounded so loudly he could barely hear the crowd.`),
            wrong(`Keiko touched the wall right before the final swimmer dove in.`, 'misses-shared-detail'),
            wrong(`The swimmer saw his team cheering when he lifted his head.`, 'misses-shared-detail'),
          ],
          solution: `Only Version One describes Diego's pounding heart, a feeling from inside him. Last place, Keiko's touch, and the cheering team appear in both versions.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Which detail appears only in Version Two?`,
          choices: [
            right(`Diego's father gripped the railing and whispered his name.`),
            wrong(`Diego stood on the starting block and stared at the water.`, 'misses-shared-detail'),
            wrong(`Diego never looked at the other lanes while he swam.`, 'confuses-versions'),
            wrong(`Diego did not know he won until he lifted his head.`, 'misses-shared-detail'),
          ],
          solution: `Only Version Two shows Diego's father in the stands. Not looking at the other lanes is from Version One, and the starting block and the ending are in both.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Why can Version Two include the father's whisper while Version One cannot?`,
          choices: [
            wrong(`Because the father was not at the swim meet in Version One`, 'unsupported-inference'),
            wrong(`Because Version One is a poem and has no room for dialogue`, 'confuses-prose-and-poetry'),
            right(`Because Diego, in the pool, could not hear it, but an outside narrator can tell it`),
            wrong(`Because Diego chose to keep his father's words a secret from readers`, 'unsupported-inference'),
          ],
          solution: `A first person narrator can only tell what he sees, hears, and feels, and Diego was on the block and in the water, too far to hear a whisper. A third person narrator is not limited to Diego's view, so Version Two can include it.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Which statement best compares the two versions?`,
          choices: [
            wrong(`Version One shows more of the crowd, and Version Two shows only Diego's feelings.`, 'reverses-pov-effect'),
            wrong(`Both versions use "I," but Version Two is longer and has more details.`, 'confuses-first-and-third-person'),
            wrong(`Version One is a drama with lines, and Version Two is a story in prose.`, 'confuses-prose-and-drama'),
            right(`Version One shows the race from inside Diego, and Version Two shows a wider view.`),
          ],
          solution: `Version One stays inside Diego's head with his pounding heart, while Version Two adds his father and the surprised swimmer in lane four. Only Version One uses "I," so the claim that both versions use "I" is wrong.`,
        },
      ],
    },
  ],
}

export default skill
