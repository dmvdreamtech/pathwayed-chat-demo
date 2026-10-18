import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g6-paragraph-transitions',
  subject: 'writing',
  grade: 6,
  group: 'Sentence and paragraph',
  name: 'Paragraph Organization and Transitions',
  standards: ['W.6.2c'],
  passages: [
    {
      code: 'wg6-paragraph-transitions-p01',
      title: 'Building a Cup Telephone',
      body: `(1) A cup telephone is a simple project that shows how sound travels. (2) First, gather two paper cups, a sharp pencil, and a piece of string about ten meters long. (3) ____, poke a small hole in the bottom of each cup with the pencil. (4) Push one end of the string through each hole and tie a thick knot inside the cup so the string cannot slip out. (5) Paper cups are also useful for planting seeds on a sunny windowsill. (6) Finally, walk away from your partner until the string is pulled tight.

(7) When you speak into one cup, your voice makes the bottom of the cup shake back and forth very quickly. (8) These tiny shakes, called vibrations, travel along the tight string. (9) When they reach the other cup, its bottom shakes in the same pattern. (10) As a result, your partner hears your words. (11) If the string sags, however, the vibrations fade and the message is lost.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 3?`,
          choices: [
            ok(`Next,`),
            no(`However,`, 'contrast-for-sequence'),
            no(`For example,`, 'example-for-sequence'),
            no(`In conclusion,`, 'conclusion-too-early'),
          ],
          solution: `Sentence 3 gives the second step after gathering supplies in sentence 2, so the time-order word "Next" fits. "However" is wrong because poking a hole does not go against anything in sentence 2.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the first paragraph?`,
          choices: [
            no(`Sentence 2`, 'removes-supporting-detail'),
            no(`Sentence 4`, 'removes-supporting-detail'),
            ok(`Sentence 5`),
            no(`Sentence 6`, 'removes-final-step'),
          ],
          solution: `The first paragraph gives the steps for building a cup telephone, and planting seeds is not one of those steps. Sentence 4 belongs because tying the string to the cups is a needed step.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `What does the transition "As a result" at the beginning of sentence 10 show?`,
          choices: [
            no(`It shows that sentence 10 gives an example of a vibration.`, 'effect-read-as-example'),
            no(`It shows that sentence 10 disagrees with sentence 9.`, 'effect-read-as-contrast'),
            ok(`It shows that hearing the words is caused by the shaking cup in sentence 9.`),
            no(`It shows that sentence 10 is the first step of the project.`, 'effect-read-as-sequence'),
          ],
          solution: `"As a result" tells the reader that sentence 10 is an effect: the second cup shakes, so the partner hears the words. Sentence 10 does not disagree with sentence 9; it follows from it.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Why does the writer use the word "however" in sentence 11?`,
          choices: [
            no(`To add one more step for building the telephone`, 'contrast-read-as-addition'),
            ok(`To show a situation where the telephone does not work, unlike sentences 7 to 10`),
            no(`To give the reason the string must be ten meters long`, 'contrast-read-as-cause'),
            no(`To repeat the idea in sentence 8 using different words`, 'contrast-read-as-restatement'),
          ],
          solution: `Sentences 7 to 10 explain how the telephone works, and "however" signals the opposite case, when a saggy string makes the message fade. It does not add a building step, because the building steps are in the first paragraph.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence at the beginning of the second paragraph that connects it to the first paragraph. Which sentence works best?`,
          choices: [
            no(`Paper cups come in many different sizes and colors.`, 'off-topic-detail'),
            no(`Be sure to tie the knot tightly so the string stays in place.`, 'misplaced-step'),
            ok(`Once your telephone is built, you can find out why it works.`),
            no(`Some people like to use tin cans instead of paper cups.`, 'off-topic-detail'),
          ],
          solution: `This sentence points back to building the telephone in paragraph 1 and forward to the explanation of how it works in paragraph 2. The sentence about tying the knot is a building step, so it belongs in the first paragraph, not at the start of the second.`,
        },
      ],
    },
    {
      code: 'wg6-paragraph-transitions-p02',
      title: 'Telling Time Before Clocks',
      body: `(1) Long before anyone wore a watch, people still needed to know the time. (2) Early farmers watched the sun rise and set to plan their work in the fields. (3) Later, people invented the sundial, a flat plate with a pointer that casts a shadow. (4) As the sun moved across the sky, the shadow moved around the plate and pointed to the hour. (5) ____, a sundial was useless on cloudy days and at night.

(6) To solve this problem, some people built water clocks. (7) A water clock was a container with a tiny hole near the bottom. (8) Water dripped out slowly and steadily, so the level inside dropped little by little. (9) Marks on the inside of the container showed how many hours had passed. (10) Many kitchens today have a small clock on the oven. (11) Each of these tools helped people measure their days a little more exactly.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 5?`,
          choices: [
            no(`For instance,`, 'example-for-contrast'),
            ok(`However,`),
            no(`Therefore,`, 'cause-for-contrast'),
            no(`Similarly,`, 'similarity-for-contrast'),
          ],
          solution: `Sentence 4 explains how a sundial works, and sentence 5 tells when it does not work, so the contrast word "However" fits. "Therefore" is wrong because the sun moving across the sky does not cause the sundial to fail.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which sentence should be removed from the second paragraph because it does not fit?`,
          choices: [
            no(`Sentence 7`, 'removes-supporting-detail'),
            no(`Sentence 9`, 'removes-supporting-detail'),
            ok(`Sentence 10`),
            no(`Sentence 11`, 'removes-concluding-sentence'),
          ],
          solution: `The passage is about how people told time before clocks, and an oven clock in a modern kitchen does not fit that idea. Sentence 11 belongs because it wraps up the passage.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `The phrase "To solve this problem" in sentence 6 links back to which idea?`,
          choices: [
            no(`Farmers had to plan their work in the fields.`, 'wrong-reference'),
            no(`The shadow on a sundial pointed to the hour.`, 'wrong-reference'),
            ok(`A sundial did not work on cloudy days or at night.`),
            no(`Marks inside the container showed the hours.`, 'reference-points-forward'),
          ],
          solution: `"This problem" refers to the trouble named just before it in sentence 5: sundials failed without sunlight. The shadow pointing to the hour is how a sundial works, which is not a problem.`,
        },
        {
          slot: 9,
          difficulty: 'hard',
          stem: `The writer wants to revise sentence 11 so that it wraps up both paragraphs more clearly. Which revision works best?`,
          choices: [
            ok(`From moving shadows to dripping water, each tool helped people measure their days more exactly.`),
            no(`Water clocks were the most useful invention ever made by anyone.`, 'ignores-first-paragraph'),
            no(`Marks on the inside of the container showed the number of hours.`, 'restates-one-detail'),
            no(`Today, most people simply check the time on a phone or a watch.`, 'new-topic-conclusion'),
          ],
          solution: `"Moving shadows" points to the sundial in paragraph 1 and "dripping water" points to the water clock in paragraph 2, so this sentence ties both together. The sentence about water clocks leaves out the first paragraph and makes a claim the passage does not support.`,
        },
      ],
    },
    {
      code: 'wg6-paragraph-transitions-p03',
      title: 'The Snow Shovel Crew',
      body: `(1) Last winter, my friends and I started a group called the Snow Shovel Crew. (2) Our street has many older neighbors who find it hard to clear their own sidewalks. (3) Our first job came after a heavy storm dropped almost a foot of snow overnight in January. (4) The next morning, five of us grabbed shovels and knocked on doors. (5) We cleared six walkways before lunch, and Mr. Okafor brought us mugs of hot cocoa.

(6) Running the crew taught us how to work as a team. (7) At first, everyone shoveled wherever they wanted, and we kept bumping into each other. (8) Then Priya suggested that two people shovel while a third person sprinkled salt behind them. (9) My favorite winter activity is sledding down the hill behind the library. (10) After we tried her plan, we finished each walkway in half the time. (11) ____, we could clear the whole block in a single morning.`,
      items: [
        {
          slot: 10,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 7`, 'removes-supporting-detail'),
            no(`Sentence 8`, 'removes-supporting-detail'),
            ok(`Sentence 9`),
            no(`Sentence 10`, 'removes-supporting-detail'),
          ],
          solution: `The second paragraph explains how the crew learned to work as a team, and sledding has nothing to do with that. Sentence 8 belongs because Priya's idea is how the team improved.`,
        },
        {
          slot: 11,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 11?`,
          choices: [
            no(`For example,`, 'example-for-sequence'),
            no(`On the other hand,`, 'contrast-for-sequence'),
            no(`Before we started,`, 'wrong-time-order'),
            ok(`By the end of the season,`),
          ],
          solution: `Sentence 11 tells how fast the crew became after practicing, which happened later in the winter, so "By the end of the season" fits. "Before we started" is wrong because the crew could not clear the block quickly before they had even begun.`,
        },
        {
          slot: 12,
          difficulty: 'medium',
          stem: `Which sentence is the topic sentence of the second paragraph?`,
          choices: [
            ok(`Sentence 6`),
            no(`Sentence 7`, 'detail-as-topic'),
            no(`Sentence 10`, 'detail-as-topic'),
            no(`Sentence 11`, 'concluding-for-topic'),
          ],
          solution: `Sentence 6 states the main idea, that the crew learned teamwork, and the sentences after it show how. Sentence 7 is only one detail about the early problem the team had.`,
        },
        {
          slot: 13,
          difficulty: 'hard',
          stem: `Why would it be confusing to move sentence 10 so that it comes right before sentence 8?`,
          choices: [
            no(`Sentence 10 is the topic sentence, so it must come first in the paragraph.`, 'wrong-sentence-role'),
            ok(`The words "her plan" would appear before the reader learns what Priya's plan was.`),
            no(`Sentence 10 does not belong in the paragraph at all.`, 'misjudges-relevance'),
            no(`Sentence 8 would then describe a different storm from sentence 10.`, 'unsupported-inference'),
          ],
          solution: `"Her plan" in sentence 10 refers to Priya's idea in sentence 8, so sentence 8 must come first for the phrase to make sense. Sentence 10 is not the topic sentence; it is a detail showing the result of the plan.`,
        },
      ],
    },
    {
      code: 'wg6-paragraph-transitions-p04',
      title: 'Playing Fair Without a Referee',
      body: `(1) Ultimate is a team sport played with a flying disc, and it has one unusual rule. (2) In most games, there is no referee on the field. (3) ____, the players call their own fouls and settle their own disagreements. (4) If a player believes someone pushed them, that player calls out "Foul!" and play stops. (5) The two players then talk about what happened and decide together how to continue.

(6) Some people worry that this system would lead to cheating. (7) In practice, players learn that honesty keeps the game fun for everyone. (8) Many teams even give an award to the opponent who showed the most fairness. (9) The disc is usually made of light, smooth plastic. (10) Teams also gather in a short circle after each game, where both sides share what went well. (11) ____, ultimate teaches players that being trusted matters as much as winning.`,
      items: [
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 3?`,
          choices: [
            ok(`Instead,`),
            no(`For example,`, 'example-for-replacement'),
            no(`Similarly,`, 'similarity-for-replacement'),
            no(`Finally,`, 'wrong-time-order'),
          ],
          solution: `Sentence 2 says there is no referee, and sentence 3 tells what happens in place of a referee, so "Instead" fits. "For example" is wrong because players calling fouls is not an example of having no referee; it is what replaces the referee.`,
        },
        {
          slot: 15,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 7`, 'removes-supporting-detail'),
            no(`Sentence 8`, 'removes-supporting-detail'),
            ok(`Sentence 9`),
            no(`Sentence 10`, 'removes-supporting-detail'),
          ],
          solution: `The second paragraph is about honesty and fairness in the game, and the material the disc is made of does not support that idea. Sentence 10 belongs because the circle after the game is another way teams show fairness.`,
        },
        {
          slot: 16,
          difficulty: 'medium',
          stem: `How does the phrase "In practice" connect sentence 7 to sentence 6?`,
          choices: [
            no(`It shows that sentence 7 describes a team practice before a game.`, 'literal-reading'),
            ok(`It shows that what really happens is different from the worry in sentence 6.`),
            no(`It shows that sentence 7 gives an example of cheating.`, 'contrast-read-as-example'),
            no(`It shows that sentence 7 happens earlier in time than sentence 6.`, 'contrast-read-as-time'),
          ],
          solution: `Sentence 6 gives a worry about cheating, and "In practice" introduces what actually happens in real games, which is honesty. It does not mean a team practice; the phrase means "in real life."`,
        },
        {
          slot: 17,
          difficulty: 'hard',
          stem: `Which transition best fills the blank at the beginning of sentence 11?`,
          choices: [
            no(`For instance,`, 'example-for-summary'),
            no(`However,`, 'contrast-for-summary'),
            ok(`In this way,`),
            no(`At the same time,`, 'time-for-summary'),
          ],
          solution: `Sentence 11 sums up how the awards and the circle after games teach players to value trust, so "In this way" fits. "However" is wrong because sentence 11 agrees with the details before it instead of going against them.`,
        },
        {
          slot: 18,
          difficulty: 'hard',
          stem: `Sentence 6 tells a worry but does not state the main idea of the second paragraph. Which sentence would best replace it as a topic sentence?`,
          choices: [
            ok(`Calling their own fouls actually helps players build habits of honesty and respect.`),
            no(`Ultimate was first played many years ago by a group of students.`, 'off-topic-topic-sentence'),
            no(`A player who believes someone pushed them can call out a foul.`, 'restates-one-detail'),
            no(`Some games use helpers on the sideline to watch for hard calls.`, 'off-topic-topic-sentence'),
          ],
          solution: `The details in sentences 7, 8, 10, and 11 all show honesty and respect, so this sentence states the idea they support. The sentence about calling a foul only repeats a detail from the first paragraph.`,
        },
      ],
    },
    {
      code: 'wg6-paragraph-transitions-p05',
      title: 'Making a Clay Animation',
      body: `(1) A stop-motion movie makes clay figures seem to move on their own. (2) To make one, you need a camera on a stand, some modeling clay, and plenty of patience. (3) Start by shaping a simple character, such as a frog or a snail. (4) Next, set the character on a table and take one photo. (5) ____, move the character a tiny bit and take another photo. (6) Repeat these two steps again and again until the scene is finished.

(7) When the photos are played quickly, one after another, your eyes blend them into smooth motion. (8) This trick takes a lot of work. (9) For example, a scene that lasts only ten seconds can need more than one hundred photos. (10) Modeling clay comes in many bright colors, such as green and orange. (11) ____, animators may spend a whole afternoon creating just a few seconds of film.`,
      items: [
        {
          slot: 19,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 5?`,
          choices: [
            no(`However,`, 'contrast-for-sequence'),
            ok(`Then,`),
            no(`In conclusion,`, 'conclusion-too-early'),
            no(`For instance,`, 'example-for-sequence'),
          ],
          solution: `Sentence 5 gives the step that comes after taking the first photo, so the time-order word "Then" fits. "In conclusion" is wrong because the steps are not finished yet, and sentence 6 still follows.`,
        },
        {
          slot: 20,
          difficulty: 'easy',
          stem: `Which sentence should be removed from the second paragraph?`,
          choices: [
            no(`Sentence 7`, 'removes-supporting-detail'),
            no(`Sentence 8`, 'removes-topic-sentence'),
            no(`Sentence 9`, 'removes-supporting-detail'),
            ok(`Sentence 10`),
          ],
          solution: `The second paragraph explains how motion appears and why it takes so much work, and the colors of clay do not fit that idea. Sentence 9 belongs because it shows how much work a short scene needs.`,
        },
        {
          slot: 21,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 11?`,
          choices: [
            no(`In contrast,`, 'contrast-for-effect'),
            no(`Before that,`, 'wrong-time-order'),
            ok(`Because of this,`),
            no(`Similarly,`, 'similarity-for-effect'),
          ],
          solution: `Needing over one hundred photos for ten seconds causes animators to spend a long time on a short film, so "Because of this" shows the cause and effect. "In contrast" is wrong because a long afternoon of work agrees with sentence 9 instead of differing from it.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `What is the job of "For example" at the beginning of sentence 9?`,
          choices: [
            ok(`It shows that sentence 9 gives proof that the trick in sentence 8 takes a lot of work.`),
            no(`It shows that sentence 9 is the next step in making the movie.`, 'example-read-as-sequence'),
            no(`It shows that sentence 9 disagrees with sentence 8.`, 'example-read-as-contrast'),
            no(`It shows that sentence 9 is the main idea of the paragraph.`, 'example-read-as-topic'),
          ],
          solution: `Sentence 8 claims the trick takes a lot of work, and sentence 9 gives a specific case, one hundred photos for ten seconds, that supports it. It is not a new step, because the steps were all given in the first paragraph.`,
        },
        {
          slot: 23,
          difficulty: 'hard',
          stem: `A classmate suggests moving sentence 6 so that it comes right after sentence 3. Why is this a poor idea?`,
          choices: [
            no(`Sentence 6 is the topic sentence of the whole passage.`, 'wrong-sentence-role'),
            no(`Sentence 6 describes shaping the character, so it belongs earlier.`, 'misreads-sentence'),
            ok(`Sentence 6 tells the reader to repeat two steps that would not have been described yet.`),
            no(`Sentence 6 explains why the eyes see smooth motion.`, 'misreads-sentence'),
          ],
          solution: `"These two steps" in sentence 6 refers to taking a photo and moving the character in sentences 4 and 5, so it must come after them. Sentence 6 does not describe shaping the character; that is sentence 3.`,
        },
      ],
    },
    {
      code: 'wg6-paragraph-transitions-p06',
      title: 'Why Leaves Change Color',
      body: `(1) Every autumn, the leaves on many trees turn from green to yellow, orange, and red. (2) This change actually begins inside each leaf. (3) During spring and summer, leaves are full of a green substance called chlorophyll. (4) Chlorophyll helps the tree use sunlight to make its food. (5) ____, it covers up other colors that are already in the leaf.

(6) As the days grow shorter and cooler, the tree stops making new chlorophyll. (7) The green color slowly fades away. (8) Once the green is gone, the yellow and orange colors that were hidden can finally be seen. (9) Some trees also make new red colors in their leaves during the fall. (10) Pine trees keep their green needles all year long. (11) Soon after the colors appear, the leaves dry out and drop to the ground.`,
      items: [
        {
          slot: 24,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 5?`,
          choices: [
            no(`As a result,`, 'false-cause'),
            ok(`At the same time,`),
            no(`In contrast,`, 'contrast-for-addition'),
            no(`Finally,`, 'wrong-time-order'),
          ],
          solution: `Chlorophyll does two things during the summer: it helps make food and it covers other colors, so "At the same time" links the two jobs. "As a result" is wrong because making food is not what causes the other colors to be covered.`,
        },
        {
          slot: 25,
          difficulty: 'medium',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 7`, 'removes-supporting-detail'),
            no(`Sentence 9`, 'removes-supporting-detail'),
            ok(`Sentence 10`),
            no(`Sentence 11`, 'removes-final-step'),
          ],
          solution: `The second paragraph explains, step by step, how a leaf changes color in the fall, and trees that keep their needles do not change at all. Sentence 9 belongs because it explains where red colors come from.`,
        },
        {
          slot: 26,
          difficulty: 'medium',
          stem: `Which words in the second paragraph show that the yellow and orange appear only after the green fades?`,
          choices: [
            no(`"As the days grow shorter"`, 'wrong-transition-located'),
            ok(`"Once the green is gone"`),
            no(`"also"`, 'wrong-transition-located'),
            no(`"Soon after the colors appear"`, 'wrong-transition-located'),
          ],
          solution: `"Once the green is gone" in sentence 8 tells the reader that the hidden colors show up after the green fades. "Soon after the colors appear" points to a later event, the leaves dropping, not to the colors showing up.`,
        },
        {
          slot: 27,
          difficulty: 'hard',
          stem: `The writer wants to add a concluding sentence after sentence 11 that wraps up the whole passage. Which sentence works best?`,
          choices: [
            no(`Chlorophyll helps a tree use sunlight to make its food.`, 'restates-one-detail'),
            no(`Raking up fallen leaves is a common chore in the fall.`, 'off-topic-conclusion'),
            ok(`So the bright colors of autumn were really hiding inside the leaves all summer.`),
            no(`Trees in very warm places may stay green the whole year.`, 'new-topic-conclusion'),
          ],
          solution: `This sentence connects paragraph 1, where green covers the other colors, with paragraph 2, where those colors finally appear. The sentence about chlorophyll only repeats one detail from the first paragraph.`,
        },
      ],
    },
  ],
  items: [
    {
      slot: 28,
      difficulty: 'easy',
      stem: `Read: "Maya practiced her piano piece every day for a month. ____, she played it perfectly at the spring recital." Which transition best completes the sentences?`,
      choices: [
        no(`For example,`, 'example-for-effect'),
        ok(`As a result,`),
        no(`On the other hand,`, 'contrast-for-effect'),
        no(`Instead,`, 'replacement-for-effect'),
      ],
      solution: `Playing perfectly is the effect of a month of practice, so "As a result" fits. "On the other hand" is wrong because the second sentence agrees with the first instead of showing something different.`,
    },
    {
      slot: 29,
      difficulty: 'easy',
      stem: `Read: "Owls cannot move their eyes the way people can. ____, they turn their heads to look around." Which transition best completes the sentences?`,
      choices: [
        no(`Similarly,`, 'similarity-for-replacement'),
        no(`For example,`, 'example-for-replacement'),
        ok(`Instead,`),
        no(`Finally,`, 'wrong-time-order'),
      ],
      solution: `Turning their heads is what owls do in place of moving their eyes, so "Instead" fits. "Similarly" is wrong because turning the head is different from moving the eyes, not like it.`,
    },
    {
      slot: 30,
      difficulty: 'medium',
      stem: `Read the sentences: (A) Rinse all the soap out with warm water. (B) Wet the dog's fur with warm water. (C) Dry the dog with a large, soft towel. (D) Rub dog shampoo into the wet fur. Which is the most logical order?`,
      choices: [
        no(`D, B, A, C`, 'ignores-time-order'),
        no(`B, A, D, C`, 'ignores-time-order'),
        ok(`B, D, A, C`),
        no(`B, D, C, A`, 'ignores-time-order'),
      ],
      solution: `The fur must be wet before the shampoo goes on, the soap must be rinsed out after it is added, and drying comes last. Order B, D, C, A is wrong because it dries the dog before rinsing out the soap.`,
    },
    {
      slot: 31,
      difficulty: 'medium',
      stem: `Read the sentences: (A) Within a year, the shelves held more than two thousand books. (B) Long ago, the small town of Millbrook had no public library. (C) To change this, a teacher named Ada Brooks asked each family to donate one book. (D) She set up the donated books in an empty room above the post office. Which is the most logical order?`,
      choices: [
        ok(`B, C, D, A`),
        no(`C, B, D, A`, 'ignores-pronoun-reference'),
        no(`B, D, C, A`, 'ignores-pronoun-reference'),
        no(`B, A, C, D`, 'conclusion-too-early'),
      ],
      solution: `"To change this" in sentence C needs the problem in sentence B before it, "the donated books" in D needs the request in C, and "Within a year" in A tells the later result. Order C, B, D, A is wrong because "this" would come before the reader knows the problem.`,
    },
    {
      slot: 32,
      difficulty: 'medium',
      stem: `Read: "____ The new paths connect the middle school to Lakeside Park. Riders no longer have to share the road with cars and buses. Since the paths opened, twice as many students ride bikes to school." Which topic sentence best begins this paragraph?`,
      choices: [
        no(`Riding a bike is good exercise for people of all ages.`, 'too-broad'),
        ok(`The new bike paths in Riverton have made biking safer and more popular.`),
        no(`Twice as many students now ride their bikes to school.`, 'too-narrow'),
        no(`Many cars in Riverton are driven much too fast.`, 'off-topic-topic-sentence'),
      ],
      solution: `Every detail is about the new paths making biking safer and drawing more riders, so this sentence covers them all. The sentence about twice as many students is only one detail and leaves out the safety idea.`,
    },
    {
      slot: 33,
      difficulty: 'medium',
      stem: `Read: "Our class built a small weather station on the school roof. Each morning, we read the thermometer and the rain gauge. We record the numbers in a shared notebook. At the end of each month, we make graphs to look for patterns." Which concluding sentence best ends this paragraph?`,
      choices: [
        no(`A rain gauge can be made from a clear plastic bottle.`, 'off-topic-conclusion'),
        no(`Each morning, we read the thermometer and the rain gauge.`, 'restates-one-detail'),
        no(`Next year, our class might study ocean animals instead.`, 'new-topic-conclusion'),
        ok(`Tracking the weather every day has helped us think like real scientists.`),
      ],
      solution: `This sentence wraps up the whole routine of measuring, recording, and graphing by telling what the class gained from it. Repeating the sentence about reading the thermometer only restates one step instead of closing the paragraph.`,
    },
    {
      slot: 34,
      difficulty: 'easy',
      stem: `Read: "(1) Every spring, our town holds a kite festival in Harbor Park. (2) Families build kites shaped like dragons, fish, and stars. (3) Judges give ribbons for the highest, the most colorful, and the funniest kites. (4) My cousin lives in a town near the mountains. (5) When the festival ends, everyone helps pick up string and paper from the grass." Which sentence does not belong?`,
      choices: [
        no(`Sentence 2`, 'removes-supporting-detail'),
        no(`Sentence 3`, 'removes-supporting-detail'),
        ok(`Sentence 4`),
        no(`Sentence 5`, 'removes-concluding-sentence'),
      ],
      solution: `The paragraph is about the kite festival, and where the cousin lives has nothing to do with it. Sentence 5 belongs because it tells how the festival ends.`,
    },
    {
      slot: 35,
      difficulty: 'medium',
      stem: `Read: "A cactus stores water inside its thick stem to survive long dry spells. ____, some desert frogs store water inside their bodies and wait underground for rain." Which transition best completes the sentences?`,
      choices: [
        ok(`Likewise,`),
        no(`However,`, 'contrast-for-similarity'),
        no(`As a result,`, 'false-cause'),
        no(`First,`, 'sequence-for-similarity'),
      ],
      solution: `Both the cactus and the frogs survive dry times by storing water, so "Likewise" shows the two are alike. "As a result" is wrong because the cactus storing water does not cause the frogs to do anything.`,
    },
    {
      slot: 36,
      difficulty: 'easy',
      stem: `Which transition word shows time order?`,
      choices: [
        no(`Therefore`, 'cause-for-time'),
        no(`However`, 'contrast-for-time'),
        ok(`Afterward`),
        no(`Likewise`, 'similarity-for-time'),
      ],
      solution: `"Afterward" tells the reader that something happens later, so it shows time order. "Therefore" shows a result, not when something happens.`,
    },
    {
      slot: 37,
      difficulty: 'hard',
      stem: `The first paragraph of an essay explains the benefits of a school recycling club. The second paragraph explains problems the club has faced. Which sentence best begins the second paragraph?`,
      choices: [
        no(`In addition, the club collects paper and cans every Friday.`, 'addition-for-contrast'),
        ok(`Despite these benefits, the club has also faced some challenges.`),
        no(`As a result, more students joined the club this year.`, 'cause-for-contrast'),
        no(`For example, the club made colorful posters for the hallway.`, 'example-for-contrast'),
      ],
      solution: `"Despite these benefits" points back to paragraph 1, and "challenges" introduces the problems in paragraph 2, so this sentence links the two. "In addition" is wrong because it adds another positive detail instead of turning to the problems.`,
    },
    {
      slot: 38,
      difficulty: 'hard',
      stem: `Read: "The museum's new dinosaur hall was crowded on opening day. ____, the line to see the giant skeleton stretched all the way out the front door." Which transition best completes the sentences?`,
      choices: [
        no(`Nevertheless,`, 'contrast-for-emphasis'),
        ok(`In fact,`),
        no(`Instead,`, 'replacement-for-emphasis'),
        no(`In the past,`, 'wrong-time-order'),
      ],
      solution: `The second sentence gives a stronger detail that shows just how crowded the hall was, and "In fact" signals that kind of emphasis. "Nevertheless" is wrong because a long line agrees with a crowded hall instead of going against it.`,
    },
    {
      slot: 39,
      difficulty: 'hard',
      stem: `Read the sentences: (A) After that, they tested the water at each spot every week for a month. (B) To begin, the students picked three spots along Willow Creek. (C) Finally, they shared their results with the town council. (D) When the month was over, they made a chart comparing the three spots. Which is the most logical order?`,
      choices: [
        no(`B, D, A, C`, 'ignores-time-order'),
        no(`A, B, D, C`, 'ignores-time-order'),
        ok(`B, A, D, C`),
        no(`B, A, C, D`, 'conclusion-too-early'),
      ],
      solution: `"To begin" starts the project, "After that" follows the first step, "When the month was over" comes after a month of testing, and "Finally" ends it. Order B, D, A, C is wrong because the chart is made "when the month was over," which must come after the month of testing in A.`,
    },
    {
      slot: 40,
      difficulty: 'hard',
      stem: `Read: "Hummingbirds beat their wings many times every second. Flying this way uses a great deal of energy. They must eat often." Which revision of the last sentence best shows how it connects to the sentences before it?`,
      choices: [
        no(`However, they must eat often.`, 'contrast-for-effect'),
        ok(`For this reason, they must eat often.`),
        no(`For instance, they must eat often.`, 'example-for-effect'),
        no(`Before that, they must eat often.`, 'wrong-time-order'),
      ],
      solution: `The second sentence says flying uses a great deal of energy, and needing to eat often is the result of that, so "For this reason" shows the cause and effect. "However" is wrong because eating often fits with using lots of energy instead of going against it.`,
    },
  ],
}

export default skill
