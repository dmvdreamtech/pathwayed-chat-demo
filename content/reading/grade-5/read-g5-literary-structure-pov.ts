import type { ContentChoice, ContentSkill } from '../../types'

const right = (text: string): ContentChoice => ({ text, is_correct: true })
const wrong = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'read-g5-literary-structure-pov',
  subject: 'reading',
  grade: 5,
  group: 'Literature',
  name: 'Structure and Point of View in Literature',
  standards: ['RL.5.5', 'RL.5.6'],
  passages: [
    {
      code: 'rg5-literary-structure-pov-p01',
      title: 'Glaze Day',
      body: `Grandma Ines lets me use her pottery wheel every Saturday. Last week I finally made a bowl that did not collapse. It was a little lopsided, but it was mine.

Today was glaze day. Grandma handed me a bucket of thick gray liquid. "This will turn deep blue," she said. I did not believe her. It looked like puddle water. I dipped my bowl anyway, and it came out the color of a rainy sidewalk.

"It looks terrible," I said.

"Wait," said Grandma. That is her answer to almost everything.

She loaded my bowl into the kiln with her own pots. The kiln is a big metal box that gets hotter than any oven. We could not open it until the next afternoon, so I spent the whole night imagining a gray, ugly bowl.

The next day, Grandma lifted the lid slowly. Rows of pots sat inside, still warm. Then I saw mine. It was the blue of a deep lake, shiny as glass. The lopsided edge caught the light like a wave.

"Wait," Grandma said again, smiling. This time I understood what she meant.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Who is telling this story?`,
          choices: [
            right(`A young person learning pottery from Grandma Ines`),
            wrong(`Grandma Ines, who owns the pottery wheel and kiln`, 'confuses-narrator-with-character'),
            wrong(`An outside narrator who knows what everyone thinks`, 'confuses-first-and-third-person'),
            wrong(`A visitor who watches the two of them make pots`, 'unsupported-inference'),
          ],
          solution: `The narrator uses "I" and talks about "my bowl" and "Grandma," so a young person learning pottery is telling the story. Grandma Ines is described from the outside, so she is not the narrator.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Because the story is told by the narrator, readers mostly learn:`,
          choices: [
            wrong(`how Grandma Ines first learned to make pottery`, 'unsupported-inference'),
            right(`what the narrator thinks and feels about the bowl`),
            wrong(`what every pot in the kiln looked like afterward`, 'too-broad'),
            wrong(`how the kiln heats up hotter than any oven`, 'too-narrow'),
          ],
          solution: `The story shares the narrator's doubts, such as "I did not believe her," and worries about a "gray, ugly bowl." The kiln's heat is mentioned only once as a detail, so it is not what readers mostly learn.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `The narrator says the glazed bowl was "the color of a rainy sidewalk." What does this description show?`,
          choices: [
            wrong(`The narrator is excited about how the bowl looks.`, 'reverses-meaning'),
            wrong(`The bowl was left outside in the rain overnight.`, 'literal-reading'),
            right(`The narrator is disappointed and thinks the bowl is ruined.`),
            wrong(`Grandma Ines does not like the color of the glaze.`, 'confuses-character-views'),
          ],
          solution: `Right after this description the narrator says, "It looks terrible," so the gray comparison shows disappointment. The bowl was never outside; the rain is only a comparison.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `How does the paragraph where Grandma opens the kiln fit into the structure of the story?`,
          choices: [
            wrong(`It introduces the problem by showing the gray glaze for the first time.`, 'wrong-plot-stage'),
            right(`It solves the problem by showing the bowl turned a beautiful blue.`),
            wrong(`It gives background about how long Grandma has made pottery.`, 'unsupported-inference'),
            wrong(`It adds a new problem when the lopsided bowl cracks in the heat.`, 'contradicts-text'),
          ],
          solution: `The earlier paragraphs build the narrator's worry about a gray bowl, and this paragraph ends that worry when the bowl is "the blue of a deep lake." The gray glaze was introduced earlier, on glaze day, not in this paragraph.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Why does the author have Grandma say "Wait" both in the middle and at the end of the story?`,
          choices: [
            wrong(`To show that Grandma forgets what she has already said.`, 'unsupported-inference'),
            wrong(`To show that the narrator still has to wait for another firing.`, 'contradicts-text'),
            wrong(`To explain how long a kiln takes to cool down after firing.`, 'misreads-purpose'),
            right(`To tie the two parts together and show the narrator now sees why patience matters.`),
          ],
          solution: `The first "Wait" comes when the narrator doubts the glaze, and the second comes after the bowl turns blue, when the narrator says, "This time I understood what she meant." The bowl is already finished at the end, so there is no second firing to wait for.`,
        },
      ],
    },
    {
      code: 'rg5-literary-structure-pov-p02',
      title: 'The Creek Through the Year',
      body: `In spring the creek is loud and fast.
It tumbles over every stone.
I stand on the bank in rubber boots
and listen to it shout alone.

In summer it slows to a lazy hum,
as warm as bathwater on my knees.
I count the minnows, silver quick,
beneath the shade of willow trees.

In fall it carries painted leaves,
red boats that sail away from me.
I wave to each one as it goes
around the bend I cannot see.

In winter it is still and white,
a quiet road of frozen glass.
I tap it once and whisper, "Rest.
I'll hear you shout when cold days pass."`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `How is this poem organized?`,
          choices: [
            wrong(`Each stanza tells about a different creek the speaker visits.`, 'misreads-structure'),
            right(`Each stanza shows the same creek in a different season, in order.`),
            wrong(`Each stanza describes a different animal that lives in the creek.`, 'too-narrow'),
            wrong(`Each stanza tells about one day from morning until night.`, 'misreads-structure'),
          ],
          solution: `The stanzas begin "In spring," "In summer," "In fall" and "In winter," so they follow one creek through the year. Minnows appear in only one stanza, so the stanzas are not organized by animals.`,
        },
        {
          slot: 7,
          difficulty: 'medium',
          stem: `In every stanza, what does the third line do?`,
          choices: [
            wrong(`It names the season the stanza is about.`, 'misreads-structure'),
            wrong(`It describes the weather near the creek.`, 'unsupported-inference'),
            right(`It tells something the speaker does at the creek.`),
            wrong(`It asks the creek a question about itself.`, 'contradicts-text'),
          ],
          solution: `The third lines are "I stand on the bank," "I count the minnows," "I wave to each one" and "I tap it once," which are all actions by the speaker. The season is named in the first line of each stanza, not the third.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `How does the speaker seem to think about the creek?`,
          choices: [
            right(`Like a friend whose moods change through the year`),
            wrong(`Like a danger that must be watched very carefully`, 'unsupported-inference'),
            wrong(`Like a science project to measure and record`, 'misreads-tone'),
            wrong(`Like a boring place the speaker visits only once`, 'contradicts-text'),
          ],
          solution: `The speaker listens to the creek, waves to its leaves and whispers "Rest" to it, the way someone treats a friend. Counting minnows is one activity, but the speaker never measures or records anything like a scientist.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `The speaker calls the fall leaves "red boats that sail away from me." What does this description show about the speaker's point of view?`,
          choices: [
            wrong(`The speaker is upset that the leaves are dirtying the water.`, 'misreads-tone'),
            wrong(`The speaker has built tiny boats and set them on the creek.`, 'literal-reading'),
            wrong(`The speaker is afraid of the deep water around the bend.`, 'unsupported-inference'),
            right(`The speaker sees the creek with imagination and enjoys it.`),
          ],
          solution: `Calling leaves "boats" and waving to each one shows a playful, imaginative view. The boats are a comparison, not real boats the speaker made.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `How does the last stanza connect back to the first stanza?`,
          choices: [
            wrong(`It repeats the first stanza word for word to end the poem.`, 'contradicts-text'),
            right(`The speaker looks forward to the loud spring creek, bringing the poem full circle.`),
            wrong(`It shows the creek drying up forever, the opposite of spring.`, 'misreads-detail'),
            wrong(`It introduces a new creek that the speaker likes better.`, 'misreads-structure'),
          ],
          solution: `In the first stanza the creek likes to "shout," and in the last the speaker promises, "I'll hear you shout when cold days pass," which points back to spring. The creek is frozen, not dried up, and it is expected to return.`,
        },
      ],
    },
    {
      code: 'rg5-literary-structure-pov-p03',
      title: 'The Weather Vane and the Windmill',
      body: `On top of a red barn stood a tin weather vane shaped like a rooster. Whenever it turned, the wind seemed to blow in that direction. So the vane decided that it was in charge of the wind.

"Look how the breeze obeys me," it crowed to the windmill in the next field. "When I point east, the wind blows east. When I point north, it blows north."

The windmill said nothing. It kept turning its long arms and grinding the farmer's corn into meal.

Of course, the vane had it backward. The wind pushed the vane, not the other way around. But no one had ever told it so.

One afternoon a wild storm rolled across the hills. The wind changed direction again and again. The vane spun in circles until its tin head ached. "Stop!" it shouted, but the wind did not listen.

When the storm passed, the vane hung crooked and dizzy. The windmill was still turning, and the farmer was carrying home a full sack of meal.

Those who boast the loudest are often the ones who do the least.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `What kind of narrator tells this fable?`,
          choices: [
            wrong(`The weather vane, telling its own story with "I"`, 'confuses-narrator-with-character'),
            wrong(`The windmill, telling what it saw from the field`, 'confuses-narrator-with-character'),
            right(`A narrator outside the story who is not a character`),
            wrong(`The farmer, describing the barn and the corn`, 'unsupported-inference'),
          ],
          solution: `The fable calls the characters "it" and "the farmer," so the narrator stands outside the story. The vane speaks with "me" only inside quotation marks, which is dialogue, not narration.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which part of the fable states its lesson?`,
          choices: [
            wrong(`The first paragraph, which describes the barn`, 'wrong-plot-stage'),
            wrong(`The paragraph where the storm rolls across the hills`, 'wrong-plot-stage'),
            wrong(`The paragraph where the vane brags to the windmill`, 'wrong-plot-stage'),
            right(`The last sentence, which stands by itself at the end`),
          ],
          solution: `The last sentence, "Those who boast the loudest are often the ones who do the least," states the lesson, as fables often do at the end. The bragging paragraph shows the problem but does not state a lesson.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `How does the storm paragraph fit into the structure of the fable?`,
          choices: [
            right(`It is the turning point that proves the vane does not control the wind.`),
            wrong(`It is the beginning, where readers first meet the weather vane.`, 'wrong-plot-stage'),
            wrong(`It is the ending, where the farmer thanks the windmill for its work.`, 'contradicts-text'),
            wrong(`It is a side story that has nothing to do with the vane's bragging.`, 'misreads-structure'),
          ],
          solution: `In the storm the vane shouts "Stop!" but "the wind did not listen," which shows its bragging was wrong. Readers meet the vane in the first paragraph, and the farmer never thanks anyone.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `The narrator says the windmill "said nothing" and "kept turning its long arms." How does this description present the windmill?`,
          choices: [
            wrong(`As rude, because it will not answer the vane's questions`, 'misreads-character'),
            wrong(`As broken, because it cannot speak like the vane can`, 'unsupported-inference'),
            right(`As quiet and hardworking, the opposite of the bragging vane`),
            wrong(`As jealous, because the vane gets to sit up on the barn`, 'unsupported-inference'),
          ],
          solution: `The narrator shows the windmill silently grinding corn while the vane brags, so the two are set up as opposites. The vane never asks a question, so the windmill is not being rude by staying quiet.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `The narrator says, "Of course, the vane had it backward." How does this sentence affect the way readers see the vane's bragging?`,
          choices: [
            wrong(`It makes readers believe the vane until the very last sentence.`, 'contradicts-text'),
            wrong(`It shows that the windmill has explained the truth to the vane.`, 'contradicts-text'),
            wrong(`It tells readers that the vane will win against the storm.`, 'unsupported-inference'),
            right(`It lets readers know the truth before the vane does, so the bragging seems foolish.`),
          ],
          solution: `The narrator explains that "the wind pushed the vane," while the vane still thinks it is in charge, so readers know more than the vane. The text says "no one had ever told it so," so the windmill did not explain anything.`,
        },
      ],
    },
    {
      code: 'rg5-literary-structure-pov-p04',
      title: 'The Fossil Table',
      body: `SCENE 1

(A museum hall on a Saturday morning. RAVI stands with his older cousin LENA, a museum volunteer, beside a table of fossils.)

LENA: Today you are my helper. Visitors may touch everything on this table except what is in the glass case.

RAVI: What is in the case?

LENA: A real tooth from a giant shark that lived millions of years ago. It is the star of the table.

RAVI: (peering in) It is as big as my hand!

LENA: Guard it well. I will be back after I get more labels.

(LENA exits. A small boy named MILO runs up with his father.)

MILO: Can I hold the shark tooth?

RAVI: Sorry, that one stays in the case. But you can hold this snail shell. It is a fossil too.

MILO: (frowning) A snail is boring.

SCENE 2

(Ten minutes later. MILO is still at the table, holding a magnifying glass over the snail fossil.)

MILO: Look at all these tiny lines! Did the snail make them?

RAVI: They show the shell growing. Each line is a little bit of new shell.

(LENA returns with a stack of labels.)

LENA: Ravi, you kept a visitor here for ten whole minutes. Most people stay for one.

RAVI: (grinning) I guess the star of the table is not always in the case.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `How is this drama divided?`,
          choices: [
            wrong(`Into two stanzas that rhyme at the end of each line`, 'confuses-genre'),
            right(`Into two scenes, with the second one ten minutes later`),
            wrong(`Into two chapters told by a narrator who uses "I"`, 'confuses-genre'),
            wrong(`Into two scenes set in two different museums`, 'contradicts-text'),
          ],
          solution: `The drama is labeled SCENE 1 and SCENE 2, and the stage directions for Scene 2 say "Ten minutes later." Both scenes happen at the same fossil table, not in different museums.`,
        },
        {
          slot: 17,
          difficulty: 'medium',
          stem: `What do the stage directions at the start of Scene 2 show readers?`,
          choices: [
            wrong(`That Milo has left and a new visitor has arrived`, 'contradicts-text'),
            wrong(`That Lena has come back from getting labels`, 'reverses-sequence'),
            right(`That Milo has become interested in the snail fossil`),
            wrong(`That Ravi has opened the glass case for Milo`, 'unsupported-inference'),
          ],
          solution: `The directions say Milo is "still at the table, holding a magnifying glass over the snail fossil," which shows he is now interested. Lena does not return until later in Scene 2.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `How does Scene 1 set up what happens in Scene 2?`,
          choices: [
            right(`Scene 1 shows Milo calling the snail boring, so his interest in Scene 2 is a change.`),
            wrong(`Scene 1 shows Milo breaking the case, so Scene 2 shows Ravi fixing it.`, 'unsupported-inference'),
            wrong(`Scene 1 shows Lena teaching Milo, so Scene 2 shows Milo teaching Ravi.`, 'confuses-character-roles'),
            wrong(`Scene 1 shows Ravi bored by fossils, so Scene 2 shows him finally liking them.`, 'misreads-character'),
          ],
          solution: `At the end of Scene 1 Milo says, "A snail is boring," and in Scene 2 he is studying its tiny lines, so the first scene sets up a change. Ravi is never bored; he is amazed by the tooth in Scene 1.`,
        },
        {
          slot: 19,
          difficulty: 'hard',
          stem: `Ravi's last line, "the star of the table is not always in the case," points back to an earlier line. What does this connection show?`,
          choices: [
            wrong(`Ravi thinks the shark tooth should be taken out of the case.`, 'literal-reading'),
            wrong(`Ravi is teasing Lena because she forgot to bring the labels.`, 'unsupported-inference'),
            right(`Ravi now sees that an ordinary fossil can be just as special as the tooth.`),
            wrong(`Ravi is worried that someone took the shark tooth while he was busy.`, 'contradicts-text'),
          ],
          solution: `Lena called the shark tooth "the star of the table" in Scene 1, and Ravi reuses her words after Milo spends ten minutes with the snail. He is not saying the tooth should leave the case; he is saying the snail turned out to be a star too.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Because this story is written as a drama, how do readers learn how Milo feels?`,
          choices: [
            wrong(`A narrator explains Milo's thoughts in long paragraphs.`, 'confuses-genre'),
            wrong(`Milo tells the story himself, using the word "I" throughout.`, 'confuses-first-and-third-person'),
            wrong(`Lena describes Milo's feelings to his father at the end.`, 'contradicts-text'),
            right(`Through his own lines and stage directions such as "(frowning)."`),
          ],
          solution: `A drama has no narrator, so feelings come through dialogue like "A snail is boring" and directions like "(frowning)." Lena speaks only to Ravi at the end, not to Milo's father.`,
        },
      ],
    },
    {
      code: 'rg5-literary-structure-pov-p05',
      title: 'Two Sides of the Board',
      body: `PRIYA

My hands were shaking when I sat down across from Daniel. He had won the city chess tournament last year, and everyone said he never made mistakes. He stared at the board without blinking, like a hawk. I was sure he could already see how he would beat me. When I moved my knight, he frowned. I thought he was annoyed that I was taking so long. After forty minutes, I offered a draw, and he agreed. I walked away feeling like I had escaped from a lion.

DANIEL

The girl across from me seemed so calm. She sat very still and took her time with every move. I kept staring at the board because I had no idea what to do. My stomach hurt. When she moved her knight, I frowned because I had completely missed that move. I spent the rest of the game just trying not to lose. When she offered a draw, I said yes as fast as I could. Later, I asked my coach who she was. I wanted to know how she stayed so calm.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `How is this story organized?`,
          choices: [
            wrong(`It tells two different chess games, one played by each player.`, 'misreads-structure'),
            wrong(`It tells the game in order, then explains the rules of chess.`, 'misreads-structure'),
            right(`It tells the same chess game twice, first by Priya, then by Daniel.`),
            wrong(`It tells the game through a narrator who watches from the crowd.`, 'confuses-first-and-third-person'),
          ],
          solution: `Both sections describe the same knight move and the same draw, so it is one game told twice. Each section uses "I," so there is no outside narrator watching from the crowd.`,
        },
        {
          slot: 22,
          difficulty: 'easy',
          stem: `How does Priya describe Daniel?`,
          choices: [
            right(`As a confident player who stares at the board like a hawk`),
            wrong(`As a nervous player whose stomach hurts during the game`, 'confuses-character-views'),
            wrong(`As a friendly player who gives her tips about her moves`, 'unsupported-inference'),
            wrong(`As a careless player who makes many mistakes in the game`, 'contradicts-text'),
          ],
          solution: `Priya says Daniel stared "without blinking, like a hawk" and that "he never made mistakes." It is Daniel who says his stomach hurt, which Priya never knew.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Priya thinks Daniel frowned because she was slow. According to Daniel, why did he really frown?`,
          choices: [
            wrong(`He was annoyed that Priya took so long to move.`, 'confuses-character-views'),
            wrong(`He wanted the game to end so he could see his coach.`, 'unsupported-inference'),
            right(`He was surprised by a move he had completely missed.`),
            wrong(`He knew he was about to win the game with his next move.`, 'contradicts-text'),
          ],
          solution: `Daniel says, "I frowned because I had completely missed that move." Being annoyed at her slowness is only what Priya imagined from her side of the board.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `What does Daniel's section reveal that Priya's section does not?`,
          choices: [
            wrong(`That the game took forty minutes to finish`, 'misreads-detail'),
            right(`That Daniel was nervous and unsure during the game`),
            wrong(`That Daniel won the city tournament last year`, 'misreads-detail'),
            wrong(`That the two players agreed to a draw at the end`, 'misreads-detail'),
          ],
          solution: `Only Daniel's section shares that he "had no idea what to do" and that his stomach hurt. The tournament win and the draw both appear in Priya's section too.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `What is the main effect of telling this story from two points of view?`,
          choices: [
            wrong(`It shows that Daniel is a much better chess player than Priya.`, 'unsupported-inference'),
            wrong(`It proves that Priya was right to be afraid of Daniel all along.`, 'contradicts-text'),
            right(`It shows that each player misread the other, since both were nervous.`),
            wrong(`It explains the rules of chess from a beginner's and an expert's view.`, 'misreads-purpose'),
          ],
          solution: `Priya thinks Daniel is fearless, and Daniel thinks Priya is calm, but each section shows the speaker was worried, so readers see what neither player could. Daniel's section shows he was struggling, so Priya's fear of him was not proven right.`,
        },
      ],
    },
    {
      code: 'rg5-literary-structure-pov-p06',
      title: 'Route Nine',
      body: `Before the sun, I start to hum.
My doors swing wide. Here, riders come:
a baker dusted white with flour,
a nurse who worked the midnight hour.

At three o'clock the students climb,
with backpacks bumping, right on time.
They laugh and trade their snacks and jokes.
I carry all these noisy folks.

By night my seats are mostly bare.
One man is reading in his chair.
I bring him safely down his street,
then rest my wheels and empty seats.

Tomorrow, when the sky is gray,
I'll hum and start another day.
The faces change, but I stay true.
I'll always come around for you.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Who is the speaker of this poem?`,
          choices: [
            wrong(`The baker who rides the bus to work`, 'confuses-speaker-with-character'),
            wrong(`A student riding home after school`, 'confuses-speaker-with-character'),
            right(`The city bus that drives Route Nine`),
            wrong(`The man reading a book late at night`, 'confuses-speaker-with-character'),
          ],
          solution: `The speaker says "My doors swing wide" and "rest my wheels," so the speaker is the bus. The baker and students are riders the bus describes, not the speaker.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `How are the first three stanzas arranged?`,
          choices: [
            right(`They follow one day in order, from early morning to night.`),
            wrong(`They follow the bus through four seasons of the year.`, 'misreads-structure'),
            wrong(`They each tell about a different bus in the city.`, 'misreads-structure'),
            wrong(`They move backward in time, from night to morning.`, 'reverses-sequence'),
          ],
          solution: `The stanzas move from "Before the sun" to "three o'clock" to "By night," which is one day in order. The poem never mentions seasons, so they are not arranged by time of year.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Because the bus is the speaker, how are the riders described?`,
          choices: [
            wrong(`Through their private thoughts about their own lives`, 'confuses-speaker-with-character'),
            right(`As people the bus watches come and go along its route`),
            wrong(`Through a long conversation between the riders`, 'contradicts-text'),
            wrong(`As strangers the bus does not notice at all`, 'contradicts-text'),
          ],
          solution: `The bus notices outside details, like a baker "dusted white with flour" and backpacks bumping, as riders get on and off. A bus cannot know their private thoughts, and the poem never shares them.`,
        },
        {
          slot: 29,
          difficulty: 'hard',
          stem: `How does the last stanza fit into the structure of the poem?`,
          choices: [
            wrong(`It describes a fourth group of riders who come late at night.`, 'misreads-detail'),
            wrong(`It goes back to the start of the same day the poem described.`, 'reverses-sequence'),
            right(`It moves from one day to every day, showing the routine repeats.`),
            wrong(`It ends the poem with the bus being taken off its route.`, 'contradicts-text'),
          ],
          solution: `The first three stanzas cover one day, and the last says "Tomorrow" and "I'll hum and start another day," so the poem widens to show the cycle repeating. The bus promises to keep coming, not to leave its route.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which line best shows that the speaker feels loyal to its riders?`,
          choices: [
            wrong(`"My doors swing wide. Here, riders come:"`, 'too-narrow'),
            wrong(`"By night my seats are mostly bare."`, 'misreads-tone'),
            wrong(`"At three o'clock the students climb,"`, 'too-narrow'),
            right(`"I'll always come around for you."`),
          ],
          solution: `"I'll always come around for you" is a promise to riders, which shows loyalty. "My doors swing wide" only describes riders getting on and does not show how the bus feels about them.`,
        },
      ],
    },
    {
      code: 'rg5-literary-structure-pov-p07',
      title: 'The Clicking Machine',
      body: `Chapter 1: Learning the Code

Rosa Delgado's aunt ran the telegraph office in the small railroad town of Pine Flats. All day a brass machine clicked with messages from faraway towns. To most people, the clicks sounded like rain on a roof. To Aunt Marisol, they were words. Every evening, eleven-year-old Rosa sat beside her and practiced. Short clicks and long clicks slowly turned into letters in her head.

Chapter 2: The Storm

One spring night, a storm knocked a tree onto the road, and Aunt Marisol hurried out to help a neighbor. Rosa was alone when the machine began to click. She held her breath and listened. Bridge. Out. Cedar Creek. Hold. Evening. Train. Rosa wrote each word down. Then she grabbed her coat and ran through the rain to the stationmaster. He read her note and rushed to stop the train before it left the station.

Chapter 3: Morning

The next day, the whole town was talking about the girl who had heard the warning. Aunt Marisol set a small brass key on the table in front of Rosa. "Every operator needs her own," she said.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `From what point of view is this story told?`,
          choices: [
            wrong(`First person, by Rosa telling her own story`, 'confuses-first-and-third-person'),
            right(`Third person, by a narrator outside the story`),
            wrong(`First person, by Aunt Marisol about her niece`, 'confuses-narrator-with-character'),
            wrong(`Third person, by the stationmaster in the town`, 'confuses-narrator-with-character'),
          ],
          solution: `The narrator calls the characters "Rosa," "she" and "her," and never uses "I" outside of dialogue, so it is third person. The stationmaster is a character in the story, not the one telling it.`,
        },
        {
          slot: 32,
          difficulty: 'easy',
          stem: `What is the main purpose of Chapter 1?`,
          choices: [
            wrong(`To show the storm that knocks over the tree`, 'wrong-plot-stage'),
            wrong(`To show how the town thanks Rosa for her help`, 'wrong-plot-stage'),
            right(`To introduce the setting and show Rosa learning the code`),
            wrong(`To explain how a bridge is built over a creek`, 'misreads-purpose'),
          ],
          solution: `Chapter 1 describes the telegraph office in Pine Flats and Rosa practicing the clicks each evening. The storm does not happen until Chapter 2.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Why is it important that Chapter 1 shows Rosa practicing every evening?`,
          choices: [
            wrong(`It explains why Aunt Marisol leaves Rosa alone during storms.`, 'confuses-cause-effect'),
            right(`It explains how Rosa is able to understand the warning in Chapter 2.`),
            wrong(`It shows that Rosa wants to become a train driver someday.`, 'unsupported-inference'),
            wrong(`It shows that the telegraph machine was broken most of the time.`, 'contradicts-text'),
          ],
          solution: `Because Rosa practiced until clicks "turned into letters in her head," she can decode "Bridge. Out. Cedar Creek." when she is alone. Aunt Marisol leaves to help a neighbor, not because Rosa practiced.`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `How does Chapter 3 fit into the structure of the story?`,
          choices: [
            wrong(`It brings in a new problem for Rosa to solve.`, 'wrong-plot-stage'),
            wrong(`It goes back in time to show Rosa's first lesson.`, 'reverses-sequence'),
            wrong(`It is the most exciting moment, when Rosa runs.`, 'wrong-plot-stage'),
            right(`It shows the results of Rosa's actions the night before.`),
          ],
          solution: `Chapter 3 takes place "the next day," when the town praises Rosa and her aunt gives her a key, which wraps up the story. Rosa's run through the rain happens in Chapter 2.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `The narrator says, "To most people, the clicks sounded like rain on a roof. To Aunt Marisol, they were words." How does this description shape the story?`,
          choices: [
            wrong(`It shows that the telegraph office had a leaky roof.`, 'literal-reading'),
            wrong(`It shows that Aunt Marisol did not like rainy weather.`, 'unsupported-inference'),
            right(`It shows reading the clicks is a rare skill, which makes Rosa's moment matter.`),
            wrong(`It shows that most people in town could read the code.`, 'reverses-meaning'),
          ],
          solution: `The contrast shows that most people hear only noise, so when Rosa hears words in Chapter 2, readers see why her skill is special. The comparison to rain is about sound, not a real leaky roof.`,
        },
      ],
    },
    {
      code: 'rg5-literary-structure-pov-p08',
      title: 'Biscuit and the City of Boxes',
      body: `For three days, my humans have been building a city of boxes. I approve. Boxes are the finest invention in the world. Each morning a new tower appears, and I climb to the top to inspect it.

But the humans are acting strangely. The small one, Aiko, keeps hugging me and saying, "You'll love the new place, Biscuit." I do not know what a new place is. I already have a place. It is the sunny spot under the kitchen window.

Today the humans rolled up the rug that lies in my sunny spot. Then they carried all the boxes outside, one by one, into a large truck that rumbled like an angry dog.

Last of all, they put me in my carrier. I complained loudly for the entire ride.

Now I am in a strange room that smells like paint. Everything is wrong. But wait. There is my rug, lying under a window. The sun is pouring across it. Aiko smiles at me.

I suppose a sunny spot can move after all.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Who is the narrator of this story?`,
          choices: [
            wrong(`Aiko, the child who is moving with the family`, 'confuses-narrator-with-character'),
            right(`Biscuit, the family's cat`),
            wrong(`A narrator outside the story who is not a character`, 'confuses-first-and-third-person'),
            wrong(`The driver of the large moving truck`, 'unsupported-inference'),
          ],
          solution: `Aiko calls the narrator "Biscuit," and the narrator rides in a carrier and loves boxes, so the narrator is the cat. Aiko is described from the outside, so Aiko is not telling the story.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `What does the reader understand that the narrator does not?`,
          choices: [
            wrong(`That boxes are fun to climb on`, 'confuses-character-views'),
            wrong(`That the new room smells like paint`, 'too-narrow'),
            right(`That the family is moving to a new home`),
            wrong(`That the rug sat in a sunny spot`, 'confuses-character-views'),
          ],
          solution: `The narrator says, "I do not know what a new place is," but the boxes, truck and Aiko's words show readers the family is moving. The cat already knows boxes are fun, so that is not something only the reader understands.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `The narrator says the truck "rumbled like an angry dog." What does this comparison show about the narrator's point of view?`,
          choices: [
            right(`To a cat, the loud truck seems unfriendly and scary.`),
            wrong(`The family brought a dog with them on the truck.`, 'literal-reading'),
            wrong(`The narrator is excited to ride inside the truck.`, 'contradicts-text'),
            wrong(`The truck driver was angry about carrying boxes.`, 'unsupported-inference'),
          ],
          solution: `A cat would see an angry dog as a threat, so the comparison shows how frightening the truck seems to Biscuit. There is no real dog in the story; the dog is only a comparison.`,
        },
        {
          slot: 39,
          difficulty: 'medium',
          stem: `How does the last paragraph connect to the second paragraph?`,
          choices: [
            wrong(`Both paragraphs describe the tower of boxes in the kitchen.`, 'misreads-detail'),
            wrong(`Both paragraphs show Biscuit complaining during the ride.`, 'misreads-detail'),
            wrong(`The last paragraph shows Biscuit still has no sunny spot.`, 'contradicts-text'),
            right(`The cat learns its special place, the sunny spot, can move.`),
          ],
          solution: `In the second paragraph Biscuit says, "I already have a place," meaning the sunny spot, and the ending says "a sunny spot can move after all." The ending shows the rug in the sun, so Biscuit does have a sunny spot again.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `How would the story most likely be different if Aiko were the narrator?`,
          choices: [
            wrong(`Readers would never learn that the family owns a cat.`, 'unsupported-inference'),
            right(`Readers would know about the move at once, and the cat's funny confusion would be lost.`),
            wrong(`The family would not move, because Aiko would not want to.`, 'confuses-pov-with-plot'),
            wrong(`The story would describe the move exactly the same way.`, 'ignores-pov-effect'),
          ],
          solution: `Aiko knows the family is moving, so Aiko would explain it right away, and readers would lose the humor of a cat calling it "a city of boxes." Changing the narrator changes how events are described, not what happens, so the move would still take place.`,
        },
      ],
    },
  ],
}

export default skill
