import type { ContentSkill } from '../../types'

const skill: ContentSkill = {
  slug: 'read-g3-story-details-inference',
  subject: 'reading',
  grade: 3,
  group: 'Literature',
  name: 'Key Details and Inference in Stories',
  standards: ["RL.3.1"],
  passages: [
    {
      code: 'rg3-story-details-inference-p01',
      title: 'The Bean Race',
      body: `Priya and Tomas each planted a bean seed in a paper cup of soil. Tomas is Priya's younger brother, and he loves contests. "Let's have a bean race," he said. "Whoever's plant grows tallest in two weeks wins."

Priya set one cup on the sunny kitchen windowsill. Tomas carried the other cup into the hall closet. "The closet is nice and warm," he explained. "My bean will grow super fast in there."

Every morning, both children gave their cups three spoonfuls of water. After five days, a tiny green loop poked out of Priya's soil. Tomas opened the closet and found a pale, skinny stem. It was taller than Priya's sprout, but it was yellow instead of green.

By the end of the second week, Priya's plant had four wide, dark green leaves. Tomas's plant was tall, but it drooped over the side of the cup. Its two small leaves were the color of butter.

Tomas frowned at his floppy plant. Then he picked up the cup and walked to the window. He set it right next to Priya's bean.

"The race is not over yet," he said with a grin. "Now my bean gets a fair start."`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: "Where did Priya put the bean cup?",
          choices: [
            { text: "In the hall closet", is_correct: false, misconception_token: 'confuses-characters' },
            { text: "On the sunny kitchen windowsill", is_correct: true },
            { text: "On a table in the garden", is_correct: false, misconception_token: 'not-in-text' },
            { text: "Next to the warm stove", is_correct: false, misconception_token: 'not-in-text' },
          ],
          solution: "The story says, \"Priya set one cup on the sunny kitchen windowsill.\" The hall closet is where Tomas put his cup, not Priya.",
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: "How did the children take care of both plants every morning?",
          choices: [
            { text: "They measured the plants with a ruler.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "They moved the cups into the sun.", is_correct: false, misconception_token: 'unsupported-inference' },
            { text: "They gave each cup three spoonfuls of water.", is_correct: true },
            { text: "They added fresh soil to each cup.", is_correct: false, misconception_token: 'not-in-text' },
          ],
          solution: "The text says, \"Every morning, both children gave their cups three spoonfuls of water.\" Only Priya's cup was in the sun, so moving the cups into the sun is wrong.",
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: "Which detail shows that the plant in the closet was NOT healthy?",
          choices: [
            { text: "It drooped over the cup and had butter-colored leaves.", is_correct: true },
            { text: "It was taller than Priya's sprout after five days.", is_correct: false, misconception_token: 'misreads-detail' },
            { text: "It got three spoonfuls of water every morning.", is_correct: false, misconception_token: 'irrelevant-detail' },
            { text: "It was planted in a paper cup full of soil.", is_correct: false, misconception_token: 'irrelevant-detail' },
          ],
          solution: "A healthy plant stands up and has green leaves, but this one \"drooped over the side of the cup\" and its leaves were \"the color of butter.\" Being taller sounds good, but the story says the tall stem was pale and yellow.",
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: "Why did Tomas think the closet was a good place for the bean?",
          choices: [
            { text: "The closet was close to the kitchen sink.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "Tomas thought plants grow best in the dark.", is_correct: false, misconception_token: 'unsupported-inference' },
            { text: "Priya told Tomas the closet was the best spot.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "Tomas said the closet was nice and warm.", is_correct: true },
          ],
          solution: "Tomas explains, \"The closet is nice and warm,\" so warmth was the reason. The story never says Tomas chose the closet because it was dark.",
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: "Why does Tomas move his plant to the window at the end of the story?",
          choices: [
            { text: "Tomas wants to give up and end the race.", is_correct: false, misconception_token: 'contradicts-text' },
            { text: "Tomas sees that sunlight helped Priya's plant grow strong.", is_correct: true },
            { text: "Tomas wants to hide the plant from Priya.", is_correct: false, misconception_token: 'unsupported-inference' },
            { text: "Tomas thinks the closet has become too cold.", is_correct: false, misconception_token: 'unsupported-inference' },
          ],
          solution: "Priya's plant by the sunny window had dark green leaves, so Tomas moves his bean there to give it \"a fair start.\" Tomas is not giving up, because he says, \"The race is not over yet.\"",
        },
      ],
    },
    {
      code: 'rg3-story-details-inference-p02',
      title: 'The Puddle Sky',
      body: `The storm rolled off at half past three.
The sun came out to look at me.
I pulled my boots on, red and tall,
and ran outside past the garden wall.

A puddle sat in the middle of the street.
It held the sky beneath my feet.
A cloud went sailing, soft and slow,
across the water down below.

I jumped. The sky broke into rings.
A sparrow shook its dripping wings.
The cloud was gone, the sun was too.
Just muddy splashes, brown and blue.

I stood as still as I could stand.
I held my breath and dropped my hand.
The ripples faded, one by one,
and back came the cloud, and back came the sun.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: "What did the speaker see in the puddle before jumping?",
          choices: [
            { text: "A sparrow shaking its wings", is_correct: false, misconception_token: 'wrong-sequence' },
            { text: "A pair of tall red boots", is_correct: false, misconception_token: 'misreads-detail' },
            { text: "A cloud sailing across the water", is_correct: true },
            { text: "Muddy splashes, brown and blue", is_correct: false, misconception_token: 'wrong-sequence' },
          ],
          solution: "Stanza 2 says, \"A cloud went sailing, soft and slow, across the water down below.\" The sparrow and the muddy splashes come after the jump, not before.",
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: "When did the storm end?",
          choices: [
            { text: "Early in the morning", is_correct: false, misconception_token: 'not-in-text' },
            { text: "At half past three", is_correct: true },
            { text: "Right at noon", is_correct: false, misconception_token: 'not-in-text' },
            { text: "Just after sunset", is_correct: false, misconception_token: 'not-in-text' },
          ],
          solution: "The first line says, \"The storm rolled off at half past three.\" The poem never mentions morning, noon or sunset.",
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: "What made the sky in the puddle \"break into rings\"?",
          choices: [
            { text: "New raindrops falling from the storm", is_correct: false, misconception_token: 'contradicts-text' },
            { text: "The sparrow flapping its wet wings", is_correct: false, misconception_token: 'confuses-cause-effect' },
            { text: "The wind blowing over the street", is_correct: false, misconception_token: 'not-in-text' },
            { text: "The speaker jumping into the puddle", is_correct: true },
          ],
          solution: "The line says, \"I jumped. The sky broke into rings,\" so the jump made the rings. The storm was already over, so it was not new raindrops.",
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: "Why did the cloud and the sun come back at the end of the poem?",
          choices: [
            { text: "The storm came back and brought new clouds.", is_correct: false, misconception_token: 'literal-reading' },
            { text: "The ripples faded and the water was smooth again.", is_correct: true },
            { text: "The speaker walked back inside the house.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "The sparrow flew away from the puddle.", is_correct: false, misconception_token: 'confuses-cause-effect' },
          ],
          solution: "The poem says, \"The ripples faded, one by one, and back came the cloud,\" so the smooth water showed the sky again. Nothing in the poem says the storm returned.",
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: "Which line best shows that the speaker was patient at the end?",
          choices: [
            { text: "\"I pulled my boots on, red and tall\"", is_correct: false, misconception_token: 'irrelevant-detail' },
            { text: "\"I jumped. The sky broke into rings.\"", is_correct: false, misconception_token: 'opposite-meaning' },
            { text: "\"I stood as still as I could stand.\"", is_correct: true },
            { text: "\"A sparrow shook its dripping wings.\"", is_correct: false, misconception_token: 'irrelevant-detail' },
          ],
          solution: "Standing as still as possible and waiting for the ripples to fade shows patience. Jumping is a quick, busy action, the opposite of waiting.",
        },
      ],
    },
    {
      code: 'rg3-story-details-inference-p03',
      title: 'The Softest Light',
      body: `In a meadow lived a group of fireflies who loved to show off. Every night they held a contest to see whose light was brightest. Dot, the smallest firefly, always came in last. Dot's glow was soft and gold, like a candle far away.

"Your light is so weak," said Flash, the brightest firefly. "Why do you even come?"

Dot did not answer. Dot just kept glowing quietly at the edge of the meadow.

One evening, a thick fog rolled in from the pond. A young mouse named Pip had wandered too far from home and could not find the way back. The fireflies rushed over to help. Flash and the others blazed as brightly as they could. But the fog caught their strong light and turned the whole meadow into a glowing white blur. Pip could not see anything at all.

Then Dot flew close to the ground. The soft little glow did not fill up the fog. It made one small, steady spot that Pip could follow. Slowly, Dot led Pip through the tall grass, all the way to the mouse hole under the old oak tree.

The next night, nobody held a contest. Flash flew over to Dot and asked, "Will you teach me how to glow softly?"`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: "Why did Dot always come in last in the contest?",
          choices: [
            { text: "Dot's light was the softest of all.", is_correct: true },
            { text: "Dot flew more slowly than the others.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "Dot always arrived late to the meadow.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "Dot did not want to enter the contest.", is_correct: false, misconception_token: 'unsupported-inference' },
          ],
          solution: "The contest was about \"whose light was brightest,\" and Dot's glow was \"soft and gold, like a candle far away.\" The story never says Dot was slow or late.",
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: "Where was Pip's home?",
          choices: [
            { text: "Beside the pond", is_correct: false, misconception_token: 'misreads-detail' },
            { text: "Under the old oak tree", is_correct: true },
            { text: "At the edge of the meadow", is_correct: false, misconception_token: 'misreads-detail' },
            { text: "Inside the tall grass", is_correct: false, misconception_token: 'misreads-detail' },
          ],
          solution: "Dot led Pip \"to the mouse hole under the old oak tree.\" The pond is only where the fog came from.",
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: "Why could Pip not see when Flash and the others glowed brightly?",
          choices: [
            { text: "The bright fireflies flew too high above Pip.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "The bright fireflies turned their lights off.", is_correct: false, misconception_token: 'contradicts-text' },
            { text: "The fog turned their strong light into a white blur.", is_correct: true },
            { text: "Pip was too tired to keep both eyes open.", is_correct: false, misconception_token: 'not-in-text' },
          ],
          solution: "The story says the fog \"caught their strong light and turned the whole meadow into a glowing white blur.\" The fireflies did not turn their lights off; they \"blazed as brightly as they could.\"",
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: "How did Dot help Pip get home?",
          choices: [
            { text: "Dot shouted directions from high in the sky.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "Dot carried Pip on a ride over the grass.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "Dot glowed brighter than Flash for the first time.", is_correct: false, misconception_token: 'contradicts-text' },
            { text: "Dot flew low and made a small spot Pip could follow.", is_correct: true },
          ],
          solution: "Dot \"flew close to the ground\" and made \"one small, steady spot that Pip could follow.\" Dot's glow stayed soft; it did not become brighter than Flash's light.",
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: "What does Flash's question at the end show?",
          choices: [
            { text: "Flash wants to win the next brightness contest.", is_correct: false, misconception_token: 'contradicts-text' },
            { text: "Flash now sees that a soft light can be useful.", is_correct: true },
            { text: "Flash is still making fun of Dot's weak light.", is_correct: false, misconception_token: 'ignores-character-change' },
            { text: "Flash is lost in the fog and needs help.", is_correct: false, misconception_token: 'unsupported-inference' },
          ],
          solution: "After seeing Dot's soft glow save Pip, Flash asks Dot, \"Will you teach me how to glow softly?\" Flash is not teasing anymore, and \"nobody held a contest\" that night.",
        },
      ],
    },
    {
      code: 'rg3-story-details-inference-p04',
      title: 'The Smooth Handoff',
      body: `Field Day was on Friday, and Mateo's class was ready for the relay race. Four runners would each run one lap around the track. They would pass a striped baton from hand to hand.

Mateo would run third. All week, Mateo practiced handing the baton to Ruby, who would run last. On Monday, the baton slipped and rolled into the grass. On Tuesday, the two runners bumped elbows.

"Try this," said Ms. Okafor, the gym teacher. "Ruby, start jogging before Mateo reaches you. Hold your hand back with your palm open. Mateo, call out 'Now!' when the baton is close."

By Thursday, the handoff was smooth every single time.

On Friday, the class was in second place when Mateo grabbed the baton. Mateo's legs pumped hard. The runner in first place stayed a few steps ahead. As Mateo came near, Ruby began to jog forward with one open hand stretched back.

"Now!" Mateo shouted.

The baton landed in Ruby's palm with a soft slap. The other team fumbled their handoff, and their baton clattered onto the track. Ruby zoomed past them and crossed the finish line first.

Mateo's whole class cheered. Still out of breath, Mateo gave Ruby a big thumbs-up.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: "Which part of the relay did Mateo run?",
          choices: [
            { text: "The first lap", is_correct: false, misconception_token: 'misreads-detail' },
            { text: "The second lap", is_correct: false, misconception_token: 'misreads-detail' },
            { text: "The third lap", is_correct: true },
            { text: "The last lap", is_correct: false, misconception_token: 'confuses-characters' },
          ],
          solution: "The story says, \"Mateo would run third.\" Ruby, not Mateo, ran the last lap.",
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: "What happened at practice on Monday?",
          choices: [
            { text: "The two runners bumped elbows.", is_correct: false, misconception_token: 'wrong-sequence' },
            { text: "The baton slipped and rolled into the grass.", is_correct: true },
            { text: "The handoff was smooth every time.", is_correct: false, misconception_token: 'wrong-sequence' },
            { text: "Ruby tripped and fell on the track.", is_correct: false, misconception_token: 'not-in-text' },
          ],
          solution: "The text says, \"On Monday, the baton slipped and rolled into the grass.\" Bumping elbows happened on Tuesday.",
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: "What did Ms. Okafor tell Ruby to do?",
          choices: [
            { text: "Start jogging early with an open hand held back", is_correct: true },
            { text: "Stand still and wait for Mateo to arrive", is_correct: false, misconception_token: 'contradicts-text' },
            { text: "Turn around and grab the baton with both hands", is_correct: false, misconception_token: 'not-in-text' },
            { text: "Shout \"Now!\" when the baton came close", is_correct: false, misconception_token: 'confuses-characters' },
          ],
          solution: "Ms. Okafor says, \"Ruby, start jogging before Mateo reaches you. Hold your hand back with your palm open.\" Calling out \"Now!\" was Mateo's job, not Ruby's.",
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: "How did the class move from second place to first place?",
          choices: [
            { text: "Mateo passed the first-place runner on the third lap.", is_correct: false, misconception_token: 'contradicts-text' },
            { text: "Ruby started running before the race began.", is_correct: false, misconception_token: 'misreads-detail' },
            { text: "The other team fumbled their baton during the handoff.", is_correct: true },
            { text: "The other team stopped to cheer for Ruby.", is_correct: false, misconception_token: 'not-in-text' },
          ],
          solution: "The other team \"fumbled their handoff,\" and Ruby \"zoomed past them.\" Mateo did not pass anyone, because the first-place runner \"stayed a few steps ahead.\"",
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: "Which detail best supports the idea that practice helped the class win?",
          choices: [
            { text: "\"Four runners would each run one lap around the track.\"", is_correct: false, misconception_token: 'irrelevant-detail' },
            { text: "\"The runner in first place stayed a few steps ahead.\"", is_correct: false, misconception_token: 'opposite-meaning' },
            { text: "\"Still out of breath, Mateo gave Ruby a big thumbs-up.\"", is_correct: false, misconception_token: 'irrelevant-detail' },
            { text: "\"By Thursday, the handoff was smooth every single time.\"", is_correct: true },
          ],
          solution: "After a week of practice the handoff became smooth, and that smooth handoff let Ruby pass the team that fumbled. The first-place runner staying ahead shows the class was behind, not how practice helped.",
        },
      ],
    },
    {
      code: 'rg3-story-details-inference-p05',
      title: 'The Phone on the Wall',
      body: `Nia found a heavy black object in the back of Grandpa Felix's closet. It had a curly cord and a round dial with holes for fingers.

"What is this?" Nia asked.

Grandpa Felix laughed. "That was our telephone when I was your age. It hung on the kitchen wall."

He showed Nia how it worked. To call someone, you put a finger in a hole and turned the dial all the way around. Then you let go, and it clicked back. You did that for every number.

"That takes forever," Nia said.

"It did," Grandpa agreed. "And the cord was short. If you wanted to talk, you had to stand right in the kitchen. My whole family shared that one phone. Sometimes my sisters and I argued about whose turn it was."

"Could you call Great-Aunt Rosa in another country?" Nia asked.

"Only on special days," Grandpa said. "Calls that far away cost a lot of money. We talked fast and said only the important things."

Nia looked at the tablet on the table. Just last night, Nia had video chatted with cousins in three different cities for a whole hour.

"Grandpa," Nia said, "can we call Great-Aunt Rosa right now? I think she would love to see your old phone."`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: "Where did the old telephone hang when Grandpa Felix was young?",
          choices: [
            { text: "In the back of the closet", is_correct: false, misconception_token: 'confuses-time' },
            { text: "On the kitchen wall", is_correct: true },
            { text: "In the living room", is_correct: false, misconception_token: 'not-in-text' },
            { text: "Next to the front door", is_correct: false, misconception_token: 'not-in-text' },
          ],
          solution: "Grandpa says the phone \"hung on the kitchen wall.\" The closet is where Nia finds it today, not where it hung long ago.",
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: "Why did Grandpa Felix and his sisters sometimes argue?",
          choices: [
            { text: "The phone was broken most of the time.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "The dial was too hard for them to turn.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "The whole family had to share one phone.", is_correct: true },
            { text: "Calls to far places cost a lot of money.", is_correct: false, misconception_token: 'wrong-cause' },
          ],
          solution: "Grandpa says, \"My whole family shared that one phone,\" and they argued \"about whose turn it was.\" The cost of faraway calls is a different detail that explains why they talked fast.",
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: "Why did Grandpa's family talk fast when they called Great-Aunt Rosa?",
          choices: [
            { text: "Calls that far away cost a lot of money.", is_correct: true },
            { text: "Great-Aunt Rosa was always in a hurry.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "The cord was too short to sit down.", is_correct: false, misconception_token: 'wrong-cause' },
            { text: "The sisters were waiting for a turn.", is_correct: false, misconception_token: 'wrong-cause' },
          ],
          solution: "Grandpa says, \"Calls that far away cost a lot of money. We talked fast.\" The short cord is true, but Grandpa uses it to explain why you had to stand in the kitchen.",
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: "When Nia says \"That takes forever,\" what is Nia talking about?",
          choices: [
            { text: "Waiting for a special day to call", is_correct: false, misconception_token: 'wrong-sequence' },
            { text: "Turning the dial for every number", is_correct: true },
            { text: "Finding the phone in the closet", is_correct: false, misconception_token: 'misreads-detail' },
            { text: "Carrying the heavy black phone", is_correct: false, misconception_token: 'misreads-detail' },
          ],
          solution: "Nia says it right after Grandpa explains that you turned the dial and let it click back \"for every number.\" Special days are not mentioned until later in the story.",
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: "Which detail best shows how calling faraway people is different for Nia than it was for Grandpa?",
          choices: [
            { text: "\"Only on special days,\" Grandpa said.", is_correct: false, misconception_token: 'too-narrow' },
            { text: "It had a curly cord and a round dial.", is_correct: false, misconception_token: 'irrelevant-detail' },
            { text: "My whole family shared that one phone.", is_correct: false, misconception_token: 'too-narrow' },
            { text: "Nia video chatted with cousins in three cities.", is_correct: true },
          ],
          solution: "Grandpa could call far away only on special days, but Nia talked with cousins in three cities \"for a whole hour\" just last night. The special days detail tells only about Grandpa, so by itself it does not show a difference.",
        },
      ],
    },
    {
      code: 'rg3-story-details-inference-p06',
      title: 'Library Tuesday',
      body: `Every Tuesday after lunch,
our class lines up in a quiet bunch.
We tiptoe down the long blue hall.
Mr. Lee is waiting by the wall.

The shelves stand tall like sleepy trees.
The pages rustle like a breeze.
I search the rows for something new.
Last week I read about a zoo.

Today I want a book on space,
with planets spinning into place.
I find it on the bottom shelf.
I scan the card all by myself.

I tuck it in my bag with care.
Tomorrow morning, in my chair,
before the morning work's begun,
I'll read about the moon and sun.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: "When does the class go to the library?",
          choices: [
            { text: "Every morning before the bell", is_correct: false, misconception_token: 'confuses-time' },
            { text: "Every Friday at the end of the day", is_correct: false, misconception_token: 'not-in-text' },
            { text: "Every Tuesday after lunch", is_correct: true },
            { text: "Every day right after recess", is_correct: false, misconception_token: 'not-in-text' },
          ],
          solution: "The first line says, \"Every Tuesday after lunch, our class lines up.\" The morning is when the speaker plans to read, not when the class visits the library.",
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: "What kind of book does the speaker choose this week?",
          choices: [
            { text: "A book about animals at a zoo", is_correct: false, misconception_token: 'wrong-sequence' },
            { text: "A book about space and planets", is_correct: true },
            { text: "A book about tall trees", is_correct: false, misconception_token: 'literal-reading' },
            { text: "A book about the ocean", is_correct: false, misconception_token: 'not-in-text' },
          ],
          solution: "The speaker says, \"Today I want a book on space, with planets spinning into place.\" The zoo book was the one the speaker read last week.",
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: "How does the class act on the way to the library?",
          choices: [
            { text: "They race each other down the hall.", is_correct: false, misconception_token: 'contradicts-text' },
            { text: "They sing a song as they walk.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "They talk about the books they want.", is_correct: false, misconception_token: 'unsupported-inference' },
            { text: "They walk quietly on their tiptoes.", is_correct: true },
          ],
          solution: "The poem says the class lines up \"in a quiet bunch\" and they \"tiptoe down the long blue hall.\" Racing would not be quiet, so it does not fit the text.",
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: "How does the speaker get the space book?",
          choices: [
            { text: "Mr. Lee hands it over at the door.", is_correct: false, misconception_token: 'unsupported-inference' },
            { text: "The speaker finds it on the bottom shelf.", is_correct: true },
            { text: "A classmate shares it from a bag.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "The speaker reaches it on the top shelf.", is_correct: false, misconception_token: 'misreads-detail' },
          ],
          solution: "The poem says, \"I find it on the bottom shelf. I scan the card all by myself.\" Mr. Lee is only waiting by the wall; the poem never says he hands out books.",
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: "What can the reader tell about the speaker from the last stanza?",
          choices: [
            { text: "The speaker plans to return the book tomorrow.", is_correct: false, misconception_token: 'unsupported-inference' },
            { text: "The speaker does not enjoy reading very much.", is_correct: false, misconception_token: 'opposite-meaning' },
            { text: "The speaker is eager to start reading the book.", is_correct: true },
            { text: "The speaker forgot the book at the library.", is_correct: false, misconception_token: 'contradicts-text' },
          ],
          solution: "The speaker tucks the book away \"with care\" and plans to read it \"before the morning work's begun,\" which shows eagerness. Nothing says the book goes back tomorrow; the speaker plans to read it then.",
        },
      ],
    },
    {
      code: 'rg3-story-details-inference-p07',
      title: 'Three Turns Too Many',
      body: `Ayesha and Ben built a small robot for the school science fair. It had two wheels, a blinking light, and a tiny computer for a brain. They wrote a program that told the robot to roll forward, turn left, and stop at a paper finish line.

On the first test, the robot rolled forward perfectly. Then it spun in a circle three times and crashed into a chair leg.

"Maybe the batteries are low," Ben said. They put in new batteries. The robot spun in circles again.

Ayesha sat down with the laptop and read the program one line at a time. Each line was a step for the robot to follow. Near the bottom, Ayesha found the problem. The turn step said "repeat 3 times" instead of "repeat 1 time."

"We told it to turn three times!" Ayesha said. "The robot did exactly what we said."

Ben changed the 3 to a 1. They set the robot at the starting line and held their breath. The robot rolled forward, made one neat left turn, and stopped right on the paper line.

At the fair, a judge asked what they had learned. Ben pointed to the laptop. "Robots are not smart on their own," Ben said. "They follow every step, even the wrong ones. So you have to check your steps carefully."`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: "What did the robot use for a brain?",
          choices: [
            { text: "A tiny computer", is_correct: true },
            { text: "The laptop", is_correct: false, misconception_token: 'misreads-detail' },
            { text: "A set of batteries", is_correct: false, misconception_token: 'misreads-detail' },
            { text: "A blinking light", is_correct: false, misconception_token: 'misreads-detail' },
          ],
          solution: "The story says the robot had \"a tiny computer for a brain.\" The laptop is what the children used to read and change the program.",
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: "What did the children try first to fix the robot?",
          choices: [
            { text: "They read the program line by line.", is_correct: false, misconception_token: 'wrong-sequence' },
            { text: "They changed the 3 to a 1.", is_correct: false, misconception_token: 'wrong-sequence' },
            { text: "They put in new batteries.", is_correct: true },
            { text: "They moved the chair away.", is_correct: false, misconception_token: 'not-in-text' },
          ],
          solution: "Right after the crash, Ben said, \"Maybe the batteries are low,\" and \"They put in new batteries.\" Reading the program came next, after the batteries did not help.",
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: "What was the real reason the robot spun in circles?",
          choices: [
            { text: "The batteries in the robot were too low.", is_correct: false, misconception_token: 'contradicts-text' },
            { text: "The program told it to turn three times.", is_correct: true },
            { text: "One of the two wheels was broken.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "The chair leg was in the robot's way.", is_correct: false, misconception_token: 'confuses-cause-effect' },
          ],
          solution: "Ayesha found that the turn step said \"repeat 3 times\" instead of \"repeat 1 time.\" The batteries were not the cause, because the robot still spun after new ones went in.",
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: "Ayesha says, \"The robot did exactly what we said.\" What does Ayesha understand?",
          choices: [
            { text: "The robot was broken and needed new parts.", is_correct: false, misconception_token: 'contradicts-text' },
            { text: "The robot was smarter than the two children.", is_correct: false, misconception_token: 'unsupported-inference' },
            { text: "The robot was not listening to the program.", is_correct: false, misconception_token: 'opposite-meaning' },
            { text: "The mistake was in their steps, not the robot.", is_correct: true },
          ],
          solution: "Ayesha sees that the robot followed the program, and the program had the wrong number. Saying the robot was not listening is the opposite of \"did exactly what we said.\"",
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: "Which detail best supports Ben's lesson that \"you have to check your steps carefully\"?",
          choices: [
            { text: "Ayesha read the program one line at a time and found the error.", is_correct: true },
            { text: "The children put new batteries into the robot after it crashed.", is_correct: false, misconception_token: 'wrong-detail' },
            { text: "The robot had two wheels, a blinking light, and a tiny computer.", is_correct: false, misconception_token: 'irrelevant-detail' },
            { text: "A judge at the science fair asked what the children had learned.", is_correct: false, misconception_token: 'irrelevant-detail' },
          ],
          solution: "Checking the program \"one line at a time\" is how Ayesha found and fixed the wrong step. Changing the batteries did not involve the steps at all, and it did not fix the robot.",
        },
      ],
    },
    {
      code: 'rg3-story-details-inference-p08',
      title: 'The Neighborhood Tree',
      body: `The wall behind the Maple Street Community Center was gray and covered in old scratches. Ms. Haddad, the art teacher, had an idea. "Let's paint a mural," she said. "Everyone on the street can help."

On Saturday, people of all ages came with brushes and old shirts. Ms. Haddad drew the outline in chalk: a big tree with long branches. Each family would paint one leaf with something they loved.

Lin painted a leaf with a soccer ball. Lin's neighbor, Mr. Adebayo, painted a leaf with a loaf of bread, because he ran the bakery on the corner. Two little twins painted a leaf with their dog, Biscuit. Grandma Sofia painted tiny musical notes for the songs she sang on her porch.

Lin noticed an empty space near the bottom of the trunk. "Who gets this spot?" Lin asked.

Ms. Haddad smiled. "That spot is for people who move here later. We will leave room for new neighbors."

By sunset, the tree was covered with colorful leaves. People stood back and pointed out their own leaves to each other. Some people who had lived on the street for years met each other for the very first time that day.

A week later, a new family moved into the yellow house. Lin watched them unpack boxes. Then Lin ran to get a paintbrush.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: "What did Ms. Haddad draw in chalk on the wall?",
          choices: [
            { text: "A soccer ball", is_correct: false, misconception_token: 'confuses-characters' },
            { text: "A loaf of bread", is_correct: false, misconception_token: 'confuses-characters' },
            { text: "A big tree", is_correct: true },
            { text: "A yellow house", is_correct: false, misconception_token: 'misreads-detail' },
          ],
          solution: "The story says, \"Ms. Haddad drew the outline in chalk: a big tree with long branches.\" The soccer ball is what Lin painted on a leaf.",
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: "Why did Mr. Adebayo paint a loaf of bread?",
          choices: [
            { text: "He ran the bakery on the corner.", is_correct: true },
            { text: "He was hungry while painting.", is_correct: false, misconception_token: 'unsupported-inference' },
            { text: "Lin asked him to paint bread.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "Ms. Haddad gave him that leaf.", is_correct: false, misconception_token: 'not-in-text' },
          ],
          solution: "The text says Mr. Adebayo painted bread \"because he ran the bakery on the corner.\" Nothing in the story says he was hungry.",
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: "Why did Ms. Haddad leave a space empty near the bottom of the trunk?",
          choices: [
            { text: "The group ran out of paint before sunset.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "The spot was saved for Lin's second leaf.", is_correct: false, misconception_token: 'unsupported-inference' },
            { text: "The spot was too low for people to reach.", is_correct: false, misconception_token: 'not-in-text' },
            { text: "The spot was saved for new neighbors.", is_correct: true },
          ],
          solution: "Ms. Haddad says, \"That spot is for people who move here later. We will leave room for new neighbors.\" Lin asks about the spot, but it is never saved for Lin.",
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: "Which detail best shows that the mural helped neighbors get to know each other?",
          choices: [
            { text: "The wall was gray and covered in old scratches.", is_correct: false, misconception_token: 'irrelevant-detail' },
            { text: "People of all ages came with brushes and old shirts.", is_correct: false, misconception_token: 'too-narrow' },
            { text: "Some people who lived there for years met for the first time.", is_correct: true },
            { text: "By sunset, the tree was covered with colorful leaves.", is_correct: false, misconception_token: 'too-narrow' },
          ],
          solution: "Neighbors who had \"lived on the street for years met each other for the very first time\" while painting, so the mural brought them together. Coming with brushes shows people showed up, but not that they got to know each other.",
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: "Why does Lin most likely run to get a paintbrush at the end?",
          choices: [
            { text: "To help paint the outside of the yellow house", is_correct: false, misconception_token: 'unsupported-inference' },
            { text: "To help the new family paint a leaf in the empty spot", is_correct: true },
            { text: "To paint over the gray wall one more time", is_correct: false, misconception_token: 'contradicts-text' },
            { text: "To add another soccer ball to the mural", is_correct: false, misconception_token: 'misses-key-detail' },
          ],
          solution: "Ms. Haddad saved the empty spot \"for new neighbors,\" and Lin grabs a brush right after a new family moves in. Nothing in the story says the yellow house needs paint, so painting the house is not supported.",
        },
      ],
    },
  ],
}

export default skill
