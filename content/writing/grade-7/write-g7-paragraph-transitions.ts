import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g7-paragraph-transitions',
  subject: 'writing',
  grade: 7,
  group: 'Sentence and paragraph',
  name: 'Paragraph Organization and Transitions',
  standards: ['W.7.2c'],
  passages: [
    {
      code: 'wg7-paragraph-transitions-p01',
      title: 'How a Hot Air Balloon Flies',
      body: `(1) A hot air balloon can float high above the ground without wings or a motor. (2) The secret is simple: warm air is lighter than cool air. (3) A burner under the balloon shoots a flame upward into the large fabric bag, called the envelope. (4) The flame heats the air trapped inside the envelope. (5) As that air warms, it spreads out and becomes less dense than the cooler air outside. (6) ____, the balloon begins to rise, lifting the basket and its passengers with it.

(7) Steering a balloon is much harder than lifting it. (8) The pilot cannot turn the balloon left or right the way a driver turns a car. (9) Instead, the pilot raises or lowers the balloon to find winds blowing in different directions. (10) Balloon fabric is often sewn in bright stripes of red, yellow, and blue. (11) A careful pilot studies weather reports before every flight to learn which winds to expect at each height.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not support the main idea of the second paragraph?`,
          choices: [
            no(`Sentence 7`, 'removes-topic-sentence'),
            no(`Sentence 8`, 'removes-supporting-detail'),
            no(`Sentence 9`, 'removes-supporting-detail'),
            ok(`Sentence 10`),
          ],
          solution: `The second paragraph is about how a pilot steers a balloon, and the colors of the fabric have nothing to do with steering. Sentence 9 belongs because it explains the pilot's main steering method.`,
        },
        {
          slot: 2,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 6?`,
          choices: [
            ok(`As a result,`),
            no(`For example,`, 'example-for-cause'),
            no(`However,`, 'contrast-for-cause'),
            no(`Before that,`, 'wrong-time-order'),
          ],
          solution: `Sentence 5 explains that the warm air becomes less dense, and sentence 6 tells what that causes: the balloon rises. "However" is wrong because rising is exactly what the warm air should cause, not a surprise.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `What does the transition "Instead" at the beginning of sentence 9 show?`,
          choices: [
            no(`It shows that sentence 9 happens later in time than sentence 8.`, 'contrast-read-as-time'),
            ok(`It shows what the pilot does in place of the turning described in sentence 8.`),
            no(`It shows that sentence 9 is an example of the idea in sentence 8.`, 'contrast-read-as-example'),
            no(`It shows that sentence 9 repeats sentence 8 in different words.`, 'contrast-read-as-restatement'),
          ],
          solution: `Sentence 8 says the pilot cannot turn like a car, and "Instead" introduces the different method the pilot uses. It does not show a later time; both sentences describe the same flight at once.`,
        },
        {
          slot: 4,
          difficulty: 'hard',
          stem: `The writer wants to add a concluding sentence after sentence 11 that wraps up the whole passage. Which sentence works best?`,
          choices: [
            no(`The flame from the burner can roar loudly during takeoff.`, 'too-narrow'),
            ok(`Whether rising or steering, a balloon pilot depends on how air behaves.`),
            no(`Airplanes are much faster than balloons and can fly at night.`, 'off-topic-conclusion'),
            no(`A pilot can never turn a balloon the way a driver turns a car.`, 'restates-one-detail'),
          ],
          solution: `The first paragraph explains how warm air lifts the balloon and the second explains how winds steer it, so a sentence about rising, steering, and air ties both together. The sentence about turning only repeats a detail from the second paragraph.`,
        },
      ],
    },
    {
      code: 'wg7-paragraph-transitions-p02',
      title: 'Letters to Valentina',
      body: `(1) This year, our seventh-grade class started writing letters to students at a school in a small town in Chile. (2) Each of us was matched with one partner who was learning English, while we were learning Spanish. (3) In my first letter, I described my family, my dog, and my favorite foods. (4) Three weeks later, a thick envelope arrived from my partner, Valentina. (5) She had written half of her letter in English and half in Spanish so that we could both practice.

(6) Writing to a real person changed the way I learn. (7) Before the project, I memorized vocabulary lists only to pass quizzes. (8) Now, I look up new words because I want to tell Valentina about my life. (9) Our school cafeteria serves tacos every Tuesday. (10) ____, I have learned more about daily life in Chile from her letters than from any textbook. (11) By June, our letters had become longer, funnier, and much easier to write.`,
      items: [
        {
          slot: 5,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 7`, 'removes-supporting-detail'),
            no(`Sentence 8`, 'removes-supporting-detail'),
            ok(`Sentence 9`),
            no(`Sentence 11`, 'removes-concluding-sentence'),
          ],
          solution: `The second paragraph is about how the letters changed the way the writer learns, and the cafeteria menu has nothing to do with that. Sentence 8 belongs because it shows the change in how the writer studies words.`,
        },
        {
          slot: 6,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 10?`,
          choices: [
            no(`Nevertheless,`, 'contrast-for-addition'),
            ok(`On top of that,`),
            no(`In other words,`, 'restatement-for-addition'),
            no(`Before that,`, 'wrong-time-order'),
          ],
          solution: `Sentence 10 adds another way the letters helped the writer, so an addition transition like "On top of that" fits. "In other words" is wrong because sentence 10 brings in a new idea about life in Chile instead of repeating sentence 8.`,
        },
        {
          slot: 7,
          difficulty: 'medium',
          stem: `Which sentence is the topic sentence of the second paragraph?`,
          choices: [
            ok(`Sentence 6`),
            no(`Sentence 7`, 'detail-as-topic'),
            no(`Sentence 8`, 'detail-as-topic'),
            no(`Sentence 11`, 'concluding-for-topic'),
          ],
          solution: `Sentence 6 states the main idea, that writing to a real person changed how the writer learns, and the sentences after it give details. Sentence 8 is one of those details, not the main idea.`,
        },
        {
          slot: 8,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence 5 that ends the first paragraph and leads into the second. Which sentence works best?`,
          choices: [
            no(`Chile is a long, narrow country on the west coast of South America.`, 'off-topic-detail'),
            no(`My dog is a beagle named Pepper who loves long walks in the park.`, 'off-topic-detail'),
            ok(`Her letter made me eager to write back, and soon I was studying in a whole new way.`),
            no(`In conclusion, pen pal letters are the greatest school project ever invented.`, 'overgeneralized-conclusion'),
          ],
          solution: `This sentence finishes the story of the first letters and points ahead to the new way of studying in paragraph 2, so it works as a bridge. The sentence about Chile's shape is a fact that does not connect the letters to the change in learning.`,
        },
      ],
    },
    {
      code: 'wg7-paragraph-transitions-p03',
      title: 'The Short Life of the Pony Express',
      body: `(1) In 1860, sending a letter across the western United States could take weeks or even months. (2) A new mail service called the Pony Express promised to cut that time to about ten days. (3) Riders carried mail in leather pouches from Missouri to California, a distance of nearly two thousand miles. (4) Along the route, workers kept stations where riders could switch to rested horses every ten to fifteen miles. (5) Each rider galloped about seventy-five miles before handing the mail to a fresh rider. (6) This system kept the mail moving day and night.

(7) The Pony Express became famous, but it did not last long. (8) In October 1861, workers finished a telegraph line that connected the East and West coasts. (9) ____, a message that once took ten days by horse could now cross the country in minutes. (10) The Pony Express closed just two days later. (11) Today, people remember it as a bold experiment in speed and teamwork.`,
      items: [
        {
          slot: 9,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 9?`,
          choices: [
            no(`For example,`, 'example-for-cause'),
            ok(`Thanks to this new line,`),
            no(`On the other hand,`, 'contrast-for-cause'),
            no(`Long before then,`, 'wrong-time-order'),
          ],
          solution: `The telegraph line in sentence 8 is what made fast messages possible, so "Thanks to this new line" shows the cause and effect. "Long before then" is wrong because messages could only travel in minutes after the line was finished.`,
        },
        {
          slot: 10,
          difficulty: 'medium',
          stem: `What is the main job of sentence 7 in the passage?`,
          choices: [
            ok(`It links the success of the service to the idea that it ended quickly.`),
            no(`It gives one more example of how fast the riders carried mail.`, 'detail-as-transition'),
            no(`It concludes the passage by summing up both paragraphs.`, 'transition-read-as-conclusion'),
            no(`It explains why the telegraph line was built in 1861.`, 'unsupported-inference'),
          ],
          solution: `Sentence 7 looks back at the service's fame and then turns, with "but," to the new idea that it did not last, which the second paragraph explains. It cannot be the conclusion because it comes at the start of the paragraph and leads into new details.`,
        },
        {
          slot: 11,
          difficulty: 'medium',
          stem: `In sentence 6, what does the phrase "This system" refer to?`,
          choices: [
            no(`The telegraph line that connected the two coasts`, 'wrong-referent'),
            no(`The leather pouches that held the letters`, 'too-narrow'),
            ok(`The chain of riders and fresh horses described in sentences 4 and 5`),
            no(`The weeks it once took to send a letter west`, 'wrong-referent'),
          ],
          solution: `"This system" points back to the stations and the riders who handed off the mail, which together kept it moving day and night. The telegraph is not mentioned until the second paragraph, so it cannot be what sentence 6 refers to.`,
        },
        {
          slot: 12,
          difficulty: 'hard',
          stem: `If sentence 10 were moved so that it came right after sentence 7, what problem would it create?`,
          choices: [
            no(`The first paragraph would no longer have a topic sentence.`, 'wrong-paragraph'),
            no(`The passage would no longer explain how the riders changed horses.`, 'misreads-move'),
            ok(`The closing would come before the telegraph line that caused it.`),
            no(`Sentence 11 would have to become the first sentence of the second paragraph.`, 'unsupported-inference'),
          ],
          solution: `Sentence 10 says the service closed "two days later," which only makes sense after the telegraph is finished in sentence 8, the event that caused the closing. The move stays inside the second paragraph, so it does not affect the first paragraph's topic sentence.`,
        },
      ],
    },
    {
      code: 'wg7-paragraph-transitions-p04',
      title: 'A Sport Without Referees',
      body: `(1) Ultimate is a team sport played with a flying disc on a long field. (2) Two teams of seven players try to score by catching the disc in the opposing end zone. (3) A player who catches the disc must stop running and pass it within ten seconds. (4) ____, if a pass is dropped or knocked down, the other team takes over. (5) What makes ultimate truly unusual, though, is the way games are judged.

(6) In most youth ultimate games, there are no referees on the field. (7) Instead, players make their own calls about fouls and about whether a catch was in bounds. (8) When two players disagree, they talk it over calmly and decide how to restart play. (9) This idea is called the "spirit of the game," and teams even give each other spirit scores after a match. (10) Our school's track team practices on the field next to ours. (11) For me, learning to settle arguments fairly has been just as valuable as learning to throw a perfect pass.`,
      items: [
        {
          slot: 13,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not fit the second paragraph?`,
          choices: [
            no(`Sentence 8`, 'removes-supporting-detail'),
            no(`Sentence 9`, 'removes-supporting-detail'),
            ok(`Sentence 10`),
            no(`Sentence 11`, 'removes-concluding-sentence'),
          ],
          solution: `The second paragraph is about players judging their own games, and the track team's practice field has nothing to do with that. Sentence 11 belongs because it concludes the paragraph by telling what the writer learned from making fair calls.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 4?`,
          choices: [
            no(`As a result,`, 'false-cause'),
            ok(`In addition,`),
            no(`In contrast,`, 'contrast-for-addition'),
            no(`To sum up,`, 'conclusion-too-early'),
          ],
          solution: `Sentence 4 adds another basic rule of the game, so "In addition" fits. "As a result" is wrong because the ten-second passing rule in sentence 3 does not cause the other team to take over after a dropped pass.`,
        },
        {
          slot: 15,
          difficulty: 'medium',
          stem: `What is the purpose of sentence 5?`,
          choices: [
            no(`It gives another rule about how a team scores.`, 'detail-as-transition'),
            ok(`It closes the first paragraph and introduces the topic of the second.`),
            no(`It gives an example of a foul that players might call.`, 'transition-read-as-example'),
            no(`It concludes the passage by summing up all the rules.`, 'transition-read-as-conclusion'),
          ],
          solution: `Sentence 5 uses "though" to turn from ordinary rules to the unusual way games are judged, which is what the second paragraph is about. It does not describe a scoring rule; those come in sentences 2 through 4.`,
        },
        {
          slot: 16,
          difficulty: 'hard',
          stem: `The writer wants to add this sentence: "For example, a player who thinks she was pushed calls out 'Foul!' and play stops." Where should it go?`,
          choices: [
            no(`After sentence 2`, 'wrong-paragraph'),
            ok(`After sentence 7`),
            no(`After sentence 9`, 'ignores-transition-cue'),
            no(`After sentence 11`, 'ignores-transition-cue'),
          ],
          solution: `"For example" needs a general idea right before it, and sentence 7 says players make their own calls about fouls, so the new sentence gives an example of that. After sentence 11 it would follow a sentence about what the writer learned, which a foul call does not illustrate.`,
        },
      ],
    },
    {
      code: 'wg7-paragraph-transitions-p05',
      title: 'The Journey of a Snowflake',
      body: `(1) Every snowflake begins high in a cloud as a tiny speck of dust or pollen. (2) When the air is below freezing, water vapor sticks to the speck and freezes into a small ice crystal. (3) The crystal has six sides because of the way water molecules fit together as they freeze. (4) As the crystal falls through the cloud, more water vapor freezes onto its six corners. (5) ____, these corners grow into the long, lacy arms that people notice on snowflakes.

(6) No two snowflakes take exactly the same path to the ground. (7) Each one passes through pockets of air that are slightly warmer, colder, wetter, or drier. (8) Every change in the air changes how the arms grow. (9) Because of this, the arms of one flake might be thin and feathery while the arms of another are short and flat. (10) That is why scientists say it is very unlikely that any two snowflakes are exactly alike.`,
      items: [
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 5?`,
          choices: [
            ok(`Little by little,`),
            no(`For example,`, 'example-for-sequence'),
            no(`Instead,`, 'contrast-for-sequence'),
            no(`In contrast,`, 'contrast-for-sequence'),
          ],
          solution: `Sentence 4 says vapor keeps freezing onto the corners as the crystal falls, so the arms grow slowly over time, and "Little by little" shows that. "Instead" is wrong because the arms grow from the corners, not in place of them.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `The writer wants to add a topic sentence before sentence 1. Which sentence would introduce the first paragraph best?`,
          choices: [
            no(`Snow can make roads slippery and close schools for the day.`, 'off-topic'),
            ok(`A snowflake's delicate shape forms step by step as it falls.`),
            no(`Water vapor is the gas form of water.`, 'too-narrow'),
            no(`Weather is one of the most interesting topics in all of science.`, 'too-broad'),
          ],
          solution: `The first paragraph describes, in order, how a speck becomes a crystal with lacy arms, so a sentence about the shape forming step by step introduces it. The sentence about weather is too broad because the paragraph is only about how snowflakes form.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `In sentence 9, what does "Because of this" refer to?`,
          choices: [
            no(`The tiny speck of dust inside every snowflake`, 'wrong-referent'),
            no(`The six sides of the first ice crystal`, 'wrong-referent'),
            ok(`The changes in the air that affect how the arms grow`),
            no(`The scientists who study snowflakes`, 'wrong-referent'),
          ],
          solution: `Sentence 8 says each change in the air changes how the arms grow, and sentence 9 gives the result: arms of different shapes. The six sides are the same on every flake, so they cannot explain why the arms differ.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Which choice best combines sentences 7 and 8 while keeping the relationship between the ideas clear?`,
          choices: [
            ok(`Each one passes through pockets of air that are slightly warmer, colder, wetter, or drier, and every change affects how the arms grow.`),
            no(`Each one passes through pockets of air that are slightly warmer, colder, wetter, or drier, although every change affects how the arms grow.`, 'contrast-for-addition'),
            no(`Each one passes through pockets of air that are slightly warmer, colder, wetter, or drier, unless every change affects how the arms grow.`, 'condition-for-addition'),
            no(`Each one passes through pockets of air that are slightly warmer, colder, wetter, or drier, for example, every change affects how the arms grow.`, 'example-for-addition'),
          ],
          solution: `Sentence 8 builds on sentence 7 by explaining what the changing air does, so joining them with "and" keeps the meaning. "Although" is wrong because nothing in sentence 8 goes against sentence 7.`,
        },
      ],
    },
    {
      code: 'wg7-paragraph-transitions-p06',
      title: 'Our Clay Turtle Film',
      body: `(1) For our art unit, my group made a one-minute stop-motion film about a clay turtle who wins a race. (2) First, we sketched a storyboard that showed each scene in a small box. (3) Then we shaped a turtle and a rabbit out of modeling clay. (4) Once the characters were ready, we set up a tablet on a stand so the camera would not move. (5) After that, we moved the clay figures a tiny bit and snapped a photo, over and over. (6) It took twelve photos to make just one second of film.

(7) Making the film was harder than we expected. (8) Our first attempt looked jumpy because someone bumped the table between shots. (9) ____, we taped the table legs to the floor and started that scene over. (10) The rabbit's long ears also kept drooping, so we hid toothpicks inside to hold them up. (11) When we finally played the finished film for the class, everyone cheered for the turtle.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 9?`,
          choices: [
            no(`Similarly,`, 'similarity-for-cause'),
            ok(`To fix this problem,`),
            no(`In the beginning,`, 'wrong-time-order'),
            no(`On the other hand,`, 'contrast-for-cause'),
          ],
          solution: `Sentence 8 describes a problem, and sentence 9 tells how the group solved it, so "To fix this problem" fits. "Similarly" is wrong because taping the table is a solution, not another problem like the bumped table.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which word in sentence 4 shows that one step had to be finished before the next one began?`,
          choices: [
            ok(`Once`),
            no(`so`, 'cause-word-for-sequence'),
            no(`ready`, 'non-transition-word'),
            no(`would`, 'non-transition-word'),
          ],
          solution: `"Once" means "as soon as," which tells the reader that the clay characters were finished before the tablet was set up. The word "so" shows a purpose (keeping the camera still), not the order of steps.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which sentence is the topic sentence of the second paragraph?`,
          choices: [
            ok(`Sentence 7`),
            no(`Sentence 8`, 'detail-as-topic'),
            no(`Sentence 10`, 'detail-as-topic'),
            no(`Sentence 11`, 'concluding-for-topic'),
          ],
          solution: `Sentence 7 says the film was harder than expected, and sentences 8 through 10 describe the problems that made it hard. Sentence 8 is only the first of those problems, so it is a detail.`,
        },
        {
          slot: 24,
          difficulty: 'hard',
          stem: `Which revision of sentence 11 would best conclude the whole passage by tying both paragraphs together?`,
          choices: [
            no(`The rabbit's toothpick ears finally stayed up for the rest of the film.`, 'too-narrow'),
            no(`Stop-motion films are popular with people of all ages around the world.`, 'too-broad'),
            ok(`All our careful planning and problem solving paid off when the class cheered for our clay turtle.`),
            no(`Next year, I hope our art unit will be about painting instead.`, 'off-topic-conclusion'),
          ],
          solution: `"Careful planning" points back to the steps in paragraph 1, and "problem solving" points back to the fixes in paragraph 2, so this sentence ties the passage together. The sentence about the rabbit's ears is too narrow because it covers only one fix.`,
        },
      ],
    },
  ],
  items: [
    {
      slot: 25,
      difficulty: 'easy',
      stem: `Read: "Diego practiced his recorder piece every night for a month. ____, he still missed two notes at the spring concert." Which transition best completes the sentences?`,
      choices: [
        no(`Therefore,`, 'cause-for-contrast'),
        ok(`Still,`),
        no(`For instance,`, 'example-for-contrast'),
        no(`Likewise,`, 'similarity-for-contrast'),
      ],
      solution: `All that practice would make you expect a perfect concert, so missing notes is a contrast, and "Still" signals it. "Therefore" is wrong because practicing would not cause Diego to miss notes.`,
    },
    {
      slot: 26,
      difficulty: 'easy',
      stem: `Read: "The library's old computers froze several times a day. ____, the school bought twelve new laptops for students to use." Which transition best completes the sentences?`,
      choices: [
        ok(`Because of this,`),
        no(`In contrast,`, 'contrast-for-cause'),
        no(`For example,`, 'example-for-cause'),
        no(`Even so,`, 'contrast-for-cause'),
      ],
      solution: `The freezing computers are the reason the school bought new laptops, so the cause and effect transition "Because of this" fits. "Even so" is wrong because buying new laptops is the expected response to broken computers, not a surprise.`,
    },
    {
      slot: 27,
      difficulty: 'easy',
      stem: `Read: "Octopuses are clever problem solvers. ____, some can twist open a jar lid to reach a crab sealed inside." Which transition best completes the sentences?`,
      choices: [
        no(`However,`, 'contrast-for-example'),
        no(`As a result,`, 'cause-for-example'),
        ok(`For instance,`),
        no(`Finally,`, 'sequence-for-example'),
      ],
      solution: `Opening a jar is one case that shows octopuses solving problems, so "For instance" introduces it as an example. "However" is wrong because the second sentence supports the first instead of going against it.`,
    },
    {
      slot: 28,
      difficulty: 'easy',
      stem: `Read the sentences: (A) Next, she found the hole and covered it with a patch. (B) Imani took the flat tire off her bike and pulled out the inner tube. (C) Finally, she pumped up the tire and took a test ride. (D) After the patch dried, she put the tube back inside the tire. Which is the most logical order?`,
      choices: [
        ok(`B, A, D, C`),
        no(`B, D, A, C`, 'ignores-transition-cues'),
        no(`A, B, D, C`, 'ignores-transition-cues'),
        no(`B, A, C, D`, 'ignores-finally'),
      ],
      solution: `Imani must remove the tube first, then patch it ("Next"), then put it back after the patch dries, and pump it up last ("Finally"). Order B, D, A, C is wrong because sentence D mentions a patch that has dried before the patch is added in sentence A.`,
    },
    {
      slot: 29,
      difficulty: 'easy',
      stem: `Read: "Walking to school saves families money on gas. ____, it gives students some exercise before class begins." Which transition best completes the sentences?`,
      choices: [
        no(`On the contrary,`, 'contrast-for-addition'),
        ok(`In addition,`),
        no(`For this reason,`, 'false-cause'),
        no(`At first,`, 'sequence-for-addition'),
      ],
      solution: `The second sentence adds another benefit of walking to school, so "In addition" fits. "For this reason" is wrong because saving money on gas is not what causes students to get exercise.`,
    },
    {
      slot: 30,
      difficulty: 'easy',
      stem: `Read: "A tree adds one new ring to its trunk every year. In years with plenty of rain, the ring is wide. In dry years, the ring is thin." Which sentence would best conclude this paragraph?`,
      choices: [
        ok(`By reading the rings, scientists can learn a tree's age and the weather it lived through.`),
        no(`Some trees have leaves that turn bright orange in the fall.`, 'off-topic-conclusion'),
        no(`In dry years, the new ring is very thin.`, 'repeats-detail'),
        no(`Forests cover large parts of many different countries.`, 'too-broad'),
      ],
      solution: `The paragraph explains that rings show each year and its rainfall, so a sentence about learning age and weather from rings sums it up. Repeating that dry years make thin rings only restates the last detail without concluding.`,
    },
    {
      slot: 31,
      difficulty: 'medium',
      stem: `Read: "Chess club members learn to plan several moves ahead. They also practice staying calm when a game is not going well. Many members say the club has helped them focus better in class." Which topic sentence best introduces these details?`,
      choices: [
        no(`Chess was invented a very long time ago.`, 'off-topic'),
        no(`Club members learn to plan several moves ahead.`, 'too-narrow'),
        no(`Many clubs meet after school every week.`, 'too-broad'),
        ok(`Joining the chess club helps students build useful skills.`),
      ],
      solution: `Planning, staying calm, and focusing are all skills members gain, so a sentence about building useful skills covers every detail. The sentence about planning moves is too narrow because it matches only the first detail.`,
    },
    {
      slot: 32,
      difficulty: 'medium',
      stem: `Read the paragraph: (A) People have flown kites for more than two thousand years. (B) Long ago, some kites were used to send signals across long distances. (C) Later, scientists tied instruments to kites to measure wind and temperature high in the air. (D) My uncle flies a kite at the beach every summer. Which sentence does not belong?`,
      choices: [
        no(`Sentence A`, 'removes-topic-sentence'),
        no(`Sentence B`, 'removes-supporting-detail'),
        no(`Sentence C`, 'removes-supporting-detail'),
        ok(`Sentence D`),
      ],
      solution: `The paragraph is about how kites have been used throughout history, and an uncle's beach trips are a personal detail that does not fit. Sentence C belongs because "Later" continues the history that sentence B begins.`,
    },
    {
      slot: 33,
      difficulty: 'medium',
      stem: `Read: "Mapmakers long ago drew coastlines by hand after sailing along them. ____, mapmakers today use photos taken from satellites far above the Earth." Which transition best completes the sentences?`,
      choices: [
        no(`Similarly,`, 'similarity-for-contrast'),
        no(`As a result,`, 'false-cause'),
        ok(`In contrast,`),
        no(`For example,`, 'example-for-contrast'),
      ],
      solution: `The sentences compare an old way of making maps with a very different new way, so "In contrast" fits. "Similarly" is wrong because drawing by hand from a ship and using satellite photos are different methods, not alike.`,
    },
    {
      slot: 34,
      difficulty: 'medium',
      stem: `Read the sentences: (A) After the walks, they refilled every water bowl. (B) When the volunteers arrived at the animal shelter, they signed in at the front desk. (C) By the end of the day, every dog had been walked and fed. (D) Then each volunteer took two dogs out for a walk. Which is the most logical order?`,
      choices: [
        no(`B, A, D, C`, 'ignores-transition-cues'),
        no(`D, B, A, C`, 'ignores-transition-cues'),
        ok(`B, D, A, C`),
        no(`B, D, C, A`, 'ignores-closing-cue'),
      ],
      solution: `The volunteers sign in when they arrive, then walk the dogs, then refill bowls "after the walks," and "By the end of the day" wraps it up. Order B, A, D, C is wrong because sentence A says the walks are over before sentence D describes them starting.`,
    },
    {
      slot: 35,
      difficulty: 'medium',
      stem: `A paragraph ends: "Folding paper cranes helped our class practice measuring angles and finding lines of symmetry." The next paragraph describes how engineers use paper folding to design solar panels that fold up for space travel. Which sentence would best begin the second paragraph?`,
      choices: [
        ok(`Paper folding is useful far beyond a math classroom, too.`),
        no(`A paper crane needs about twenty separate folds.`, 'repeats-first-paragraph'),
        no(`For example, our class also folded paper frogs.`, 'example-for-shift'),
        no(`In conclusion, paper folding is a fun hobby.`, 'conclusion-for-transition'),
      ],
      solution: `This sentence links the classroom idea from the first paragraph to the new idea of paper folding outside school, which is what the engineers paragraph is about. "For example, our class also folded paper frogs" stays in the classroom, so it does not lead into the engineers.`,
    },
    {
      slot: 36,
      difficulty: 'medium',
      stem: `Read: "The class camping trip was canceled. A thunderstorm was in the forecast." Which choice best combines these sentences?`,
      choices: [
        no(`The class camping trip was canceled, although a thunderstorm was in the forecast.`, 'contrast-for-cause'),
        ok(`The class camping trip was canceled because a thunderstorm was in the forecast.`),
        no(`The class camping trip was canceled, so a thunderstorm was in the forecast.`, 'reverses-cause-effect'),
        no(`The class camping trip was canceled; for example, a thunderstorm was in the forecast.`, 'example-for-cause'),
      ],
      solution: `The storm forecast is the reason for the cancellation, so "because" shows the correct cause and effect. Using "so" reverses the relationship, making it sound as if canceling the trip caused the storm.`,
    },
    {
      slot: 37,
      difficulty: 'hard',
      stem: `Read: "Students must return their signed permission slips by Friday. ____, they will not be able to go on the museum trip." Which transition best completes the sentences?`,
      choices: [
        no(`Consequently,`, 'cause-for-condition'),
        no(`Likewise,`, 'similarity-for-condition'),
        ok(`Otherwise,`),
        no(`Nevertheless,`, 'contrast-for-condition'),
      ],
      solution: `"Otherwise" means "if they do not," which explains what happens to students who miss the deadline. "Consequently" is tempting, but it would mean that returning the slip causes students to miss the trip, which is the opposite of the meaning.`,
    },
    {
      slot: 38,
      difficulty: 'hard',
      stem: `Read: "Volunteers at the river cleanup collected forty bags of trash. They also planted sixty young trees along the bank. A group of students tested the water and posted the results online." Which topic sentence best introduces these details?`,
      choices: [
        no(`Rivers are important to many communities.`, 'too-broad'),
        ok(`The river cleanup day included several projects to help the river.`),
        no(`Volunteers picked up forty bags of trash from the river.`, 'too-narrow'),
        no(`Volunteering is more fun than spending the day indoors.`, 'opinion-off-focus'),
      ],
      solution: `Collecting trash, planting trees, and testing water are all projects from the same cleanup day, so this sentence covers every detail. "Rivers are important to many communities" is too broad because it does not mention the cleanup at all.`,
    },
    {
      slot: 39,
      difficulty: 'hard',
      stem: `Read: "Many people believe that camels store water in their humps. ____, the humps store fat, which the camel's body can turn into energy when food is scarce." Which transition best completes the sentences?`,
      choices: [
        no(`Similarly,`, 'similarity-for-correction'),
        ok(`In reality,`),
        no(`As a result,`, 'false-cause'),
        no(`For example,`, 'example-for-correction'),
      ],
      solution: `The second sentence corrects the common belief in the first, so "In reality" signals the truth that replaces it. "Similarly" is wrong because storing fat is different from the belief about storing water, not like it.`,
    },
    {
      slot: 40,
      difficulty: 'hard',
      stem: `Read the sentences: (A) This energy is stored in a small battery inside the charger. (B) A solar charger has a panel that turns sunlight into electricity. (C) Later, when you plug in a phone, the battery sends the stored energy to it. (D) Because of this design, you can charge a phone even after the sun goes down. Which is the most logical order?`,
      choices: [
        no(`A, B, C, D`, 'ignores-pronoun-reference'),
        ok(`B, A, C, D`),
        no(`B, C, A, D`, 'ignores-pronoun-reference'),
        no(`B, D, A, C`, 'conclusion-too-early'),
      ],
      solution: `"This energy" in sentence A needs sentence B before it, sentence C uses "Later" and "the stored energy" after the battery is mentioned, and D sums up the whole design. Order A, B, C, D is wrong because "This energy" would come before any energy has been named.`,
    },
  ],
}

export default skill
