import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g4-paragraph-transitions',
  subject: 'writing',
  grade: 4,
  group: 'Sentence and paragraph',
  name: 'Paragraph Organization and Transitions',
  standards: ['W.4.2c'],
  passages: [
    {
      code: 'wg4-paragraph-transitions-p01',
      title: 'A Pinecone Bird Feeder',
      body: `(1) You can make a bird feeder with a pinecone. (2) First, tie a long piece of yarn around the top of a large pinecone. (3) ____, spread sunflower seed butter all over the pinecone with a spoon. (4) Push the butter into the spaces between the scales. (5) Next, roll the sticky pinecone in a plate of birdseed. (6) My cousin has a pet parrot named Mango. (7) Finally, hang the feeder from a tree branch near a window.

(8) Now you can watch the birds come to eat. (9) Small birds like chickadees will land on the pinecone and peck at the seeds. (10) ____, some birds may come back every single day. (11) Making a pinecone feeder is an easy way to help birds and enjoy nature.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which word best fills the blank at the beginning of sentence 3?`,
          choices: [
            ok(`Then,`),
            no(`However,`, 'contrast-for-sequence'),
            no(`For example,`, 'example-for-sequence'),
            no(`In the end,`, 'conclusion-too-early'),
          ],
          solution: `Sentence 3 tells the step that comes after tying the yarn in sentence 2, so the time-order word "Then" fits. "In the end" is wrong because more steps still come after sentence 3.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the first paragraph?`,
          choices: [
            no(`Sentence 2`, 'removes-supporting-detail'),
            no(`Sentence 4`, 'removes-supporting-detail'),
            ok(`Sentence 6`),
            no(`Sentence 7`, 'removes-final-step'),
          ],
          solution: `The first paragraph gives the steps for making a feeder, and a cousin's pet parrot is not one of those steps. Sentence 7 belongs because it gives the last step.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `The writer wants to add this sentence: "Press the seeds gently so they stick." Where should it go?`,
          choices: [
            no(`After sentence 2`, 'ignores-time-order'),
            ok(`After sentence 5`),
            no(`After sentence 7`, 'step-after-ending'),
            no(`After sentence 10`, 'wrong-paragraph'),
          ],
          solution: `The new sentence is about the seeds, so it belongs right after sentence 5, where the pinecone is rolled in birdseed. After sentence 2 is wrong because there are no seeds on the pinecone yet.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the beginning of sentence 10?`,
          choices: [
            no(`First of all,`, 'sequence-for-addition'),
            no(`Instead,`, 'replacement-for-addition'),
            ok(`In fact,`),
            no(`On the other hand,`, 'contrast-for-addition'),
          ],
          solution: `Sentence 10 adds a stronger detail to sentence 9: the birds do not just visit, they may come every day, so "In fact" fits. "On the other hand" is wrong because sentence 10 agrees with sentence 9 instead of going against it.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Sentence 1 is the topic sentence of the first paragraph. Which revision tells the reader most clearly what the paragraph will explain?`,
          choices: [
            ok(`Follow these easy steps to make a bird feeder from a pinecone.`),
            no(`Pinecones fall to the ground from pine trees every autumn.`, 'off-topic'),
            no(`Chickadees are small birds that often visit bird feeders.`, 'too-narrow'),
            no(`Wild birds need to find food in every season of the year.`, 'too-broad'),
          ],
          solution: `The first paragraph is a list of steps, and this sentence tells the reader that steps for making a feeder are coming. The sentence about birds needing food all year is too broad because it does not say the paragraph will explain how to make anything.`,
        },
      ],
    },
    {
      code: 'wg4-paragraph-transitions-p02',
      title: 'How a Butterfly Grows',
      body: `(1) A butterfly goes through four stages as it grows. (2) First, a female butterfly lays tiny eggs on a leaf. (3) After a few days, a small caterpillar hatches from each egg. (4) The caterpillar eats and eats, and it grows bigger every day. (5) ____, it hangs upside down and forms a hard shell called a chrysalis. (6) Inside the chrysalis, its body slowly changes. (7) Finally, an adult butterfly pushes its way out and spreads its wings.

(8) Butterflies help plants in an important way. (9) When a butterfly drinks nectar from a flower, a yellow dust called pollen sticks to its legs. (10) Then the butterfly carries the pollen to the next flower. (11) This helps the flowers make seeds. (12) Moths usually fly at night instead of during the day. (13) Because of butterflies, gardens and fields can keep growing year after year.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which phrase best fills the blank at the beginning of sentence 5?`,
          choices: [
            no(`For example,`, 'example-for-sequence'),
            ok(`Once it is big enough,`),
            no(`In contrast,`, 'contrast-for-sequence'),
            no(`Before it hatches,`, 'wrong-time-order'),
          ],
          solution: `Sentence 4 says the caterpillar keeps growing, and sentence 5 tells what happens after that, so "Once it is big enough" fits. "Before it hatches" is wrong because the caterpillar has already hatched in sentence 3.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 9`, 'removes-supporting-detail'),
            no(`Sentence 11`, 'removes-supporting-detail'),
            ok(`Sentence 12`),
            no(`Sentence 13`, 'removes-concluding-sentence'),
          ],
          solution: `The second paragraph is about how butterflies help plants, and a fact about when moths fly does not tell about that. Sentence 13 belongs because it wraps up the idea that butterflies help plants grow.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which sentence is the topic sentence of the second paragraph?`,
          choices: [
            ok(`Sentence 8`),
            no(`Sentence 9`, 'detail-as-topic'),
            no(`Sentence 11`, 'detail-as-topic'),
            no(`Sentence 13`, 'conclusion-as-topic'),
          ],
          solution: `Sentence 8 tells the main idea, that butterflies help plants, and the other sentences explain how. Sentence 13 is the concluding sentence because it comes at the end and sums up the paragraph.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `What does the word "Then" in sentence 10 show the reader?`,
          choices: [
            no(`It shows that sentence 10 gives an example of sentence 9.`, 'misreads-as-example'),
            ok(`It shows that sentence 10 happens after sentence 9.`),
            no(`It shows that sentence 10 is the opposite of sentence 9.`, 'misreads-as-contrast'),
            no(`It shows that sentence 10 ends the whole passage.`, 'misreads-as-conclusion'),
          ],
          solution: `"Then" is a time-order word, so it shows that carrying the pollen happens after the pollen sticks to the butterfly. It does not show an opposite, because sentence 10 continues the same action.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `The writer wants a sentence that links the first paragraph to the second paragraph. Which sentence would work best at the start of the second paragraph?`,
          choices: [
            no(`Caterpillars eat a great many leaves as they grow.`, 'looks-back-only'),
            no(`Some butterflies have bright orange and black wings.`, 'unlinked-detail'),
            ok(`Once a butterfly has its wings, it can do an important job.`),
            no(`In conclusion, a butterfly is a kind of insect.`, 'conclusion-too-early'),
          ],
          solution: `"Once a butterfly has its wings" points back to the end of paragraph 1, and "an important job" leads into how butterflies help plants in paragraph 2. The sentence about caterpillars only looks back and does not lead into the new idea.`,
        },
      ],
    },
    {
      code: 'wg4-paragraph-transitions-p03',
      title: 'The First Bicycles',
      body: `(1) Bicycles did not always look the way they do today. (2) More than two hundred years ago, the first bicycle-like machine was made of wood. (3) It had no pedals at all. (4) Instead, riders pushed their feet against the ground to roll forward. (5) Later, inventors added pedals to the front wheel. (6) ____, riding was still bumpy because the wheels were made of wood or iron.

(7) Some later bicycles had a giant front wheel and a tiny back wheel. (8) These bikes went fast, but riders often fell off the high seat. (9) Then builders made a safer bicycle with two wheels of the same size. (10) Rubber tires filled with air made the ride smooth. (11) My bike is blue and has a shiny bell on it. (12) Step by step, the bicycle became the safe and simple machine we ride today.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which word best fills the blank at the beginning of sentence 6?`,
          choices: [
            no(`First,`, 'sequence-for-contrast'),
            ok(`However,`),
            no(`For example,`, 'example-for-contrast'),
            no(`Because of this,`, 'cause-for-contrast'),
          ],
          solution: `Sentence 5 tells about an improvement, but sentence 6 tells about a problem that was still there, so the contrast word "However" fits. "Because of this" is wrong because adding pedals did not cause the bumpy ride.`,
        },
        {
          slot: 12,
          difficulty: 'medium',
          stem: `Which sentence should be taken out of the second paragraph because it does not fit?`,
          choices: [
            no(`Sentence 8`, 'removes-supporting-detail'),
            no(`Sentence 10`, 'removes-supporting-detail'),
            ok(`Sentence 11`),
            no(`Sentence 12`, 'removes-concluding-sentence'),
          ],
          solution: `The passage tells how bicycles changed over time, and the color of the writer's own bike has nothing to do with that history. Sentence 10 belongs because air-filled tires were one of the changes.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `What does the word "Instead" in sentence 4 tell the reader?`,
          choices: [
            ok(`Riders did something in place of using pedals.`),
            no(`Riders used pedals after they pushed with their feet.`, 'misreads-as-sequence'),
            no(`Pushing with their feet is an example of using pedals.`, 'misreads-as-example'),
            no(`Pushing with their feet was the last step of the ride.`, 'misreads-as-conclusion'),
          ],
          solution: `Sentence 3 says there were no pedals, and "Instead" tells what riders did in place of pedals: they pushed with their feet. It does not show time order, because the first machine never had pedals at all.`,
        },
        {
          slot: 14,
          difficulty: 'hard',
          stem: `Why must sentences 7 and 8 come before sentence 9?`,
          choices: [
            no(`Sentence 9 gives an example of a bike with a giant front wheel.`, 'misreads-as-example'),
            ok(`Sentence 9 tells about a safer bike, which only makes sense after the reader learns that riders fell off.`),
            no(`Sentence 9 is the topic sentence, so it must come near the end.`, 'confuses-topic-and-conclusion'),
            no(`Sentences 7 and 8 tell about the very first bicycle made of wood.`, 'misreads-details'),
          ],
          solution: `Sentence 8 names a problem, riders falling off, and sentence 9 says builders made a "safer" bike, so the problem has to come first. Sentence 9 is not an example of the giant-wheel bike, because its wheels are the same size.`,
        },
        {
          slot: 15,
          difficulty: 'medium',
          stem: `What is the main job of sentence 12?`,
          choices: [
            no(`It gives one more step in making a bicycle.`, 'conclusion-as-detail'),
            no(`It starts a new topic about riding safely.`, 'new-topic-conclusion'),
            ok(`It sums up how the bicycle changed over time.`),
            no(`It gives an example of a bike with a bell.`, 'misreads-as-example'),
          ],
          solution: `"Step by step" pulls together all the changes in the passage, so sentence 12 is the concluding sentence. It does not start a new topic, because it returns to the main idea from sentence 1.`,
        },
      ],
    },
    {
      code: 'wg4-paragraph-transitions-p04',
      title: 'Our Class Book Swap',
      body: `(1) Our class held a book swap so we could share stories with each other. (2) Each student brought one or two books from home that they had already read. (3) ____, Malik brought a mystery about a missing dog, and Sofia brought a book of jokes. (4) We set all the books on long tables in the library. (5) Then each student got one ticket for every book they brought. (6) Students traded their tickets for new books to take home.

(7) The swap was a big success. (8) Almost everyone found a book they were excited to read. (9) We also had some extra books left over. (10) We gave those to the children's room at the town library. (11) Our school lunch on Friday was pizza. (12) Next year, we hope to invite the whole school to join.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which phrase best fills the blank at the beginning of sentence 3?`,
          choices: [
            no(`Finally,`, 'sequence-for-example'),
            no(`However,`, 'contrast-for-example'),
            ok(`For example,`),
            no(`Instead,`, 'replacement-for-example'),
          ],
          solution: `Sentence 3 names two books that students brought, which are examples of sentence 2, so "For example" fits. "However" is wrong because sentence 3 does not go against sentence 2.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 8`, 'removes-supporting-detail'),
            no(`Sentence 10`, 'removes-supporting-detail'),
            ok(`Sentence 11`),
            no(`Sentence 12`, 'removes-concluding-sentence'),
          ],
          solution: `The second paragraph tells why the book swap was a success, and the Friday lunch has nothing to do with the swap. Sentence 10 belongs because it tells what happened to the extra books.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `What does the word "also" in sentence 9 tell the reader?`,
          choices: [
            ok(`Sentence 9 adds another good result of the swap.`),
            no(`Sentence 9 tells about a problem with the swap.`, 'misreads-as-contrast'),
            no(`Sentence 9 tells what happened before the swap.`, 'misreads-as-sequence'),
            no(`Sentence 9 is the main idea of the paragraph.`, 'detail-as-topic'),
          ],
          solution: `"Also" adds an idea, so sentence 9 gives one more thing that went well: there were extra books to give away. It is not a problem, because the books went to the town library.`,
        },
        {
          slot: 19,
          difficulty: 'hard',
          stem: `Suppose sentences 5 and 6 were switched. What problem would this cause?`,
          choices: [
            no(`The paragraph would no longer have a topic sentence.`, 'confuses-topic-sentence'),
            no(`Malik and Sofia would not be named as examples.`, 'misreads-details'),
            ok(`Students would trade their tickets before they got any tickets.`),
            no(`The books would be set on the tables after the swap ended.`, 'misreads-details'),
          ],
          solution: `Students must get tickets (sentence 5) before they can trade them (sentence 6), so switching the sentences would break the time order. The topic sentence is sentence 1, which would not move.`,
        },
      ],
    },
    {
      code: 'wg4-paragraph-transitions-p05',
      title: 'Learning the Recorder',
      body: `(1) This fall, our class started learning to play the recorder in music class. (2) At first, my recorder only made loud squeaks. (3) Mr. Haddad showed us how to cover the holes with the pads of our fingers. (4) He also taught us to blow softly, as if we were cooling warm soup. (5) ____, my notes started to sound clear and smooth.

(6) Every week, we practice a new song. (7) Last week, we learned a song with only three notes. (8) This week's song is harder because it has five notes. (9) Practicing at home helps me keep up with the class. (10) ____, I play for ten minutes each night after dinner.

(11) Learning an instrument takes patience. (12) I still make mistakes, but I can hear myself getting better.`,
      items: [
        {
          slot: 20,
          difficulty: 'easy',
          stem: `Which phrase best fills the blank at the beginning of sentence 5?`,
          choices: [
            ok(`After a few days,`),
            no(`For example,`, 'example-for-sequence'),
            no(`On the other hand,`, 'contrast-for-sequence'),
            no(`Before I started,`, 'wrong-time-order'),
          ],
          solution: `Sentence 5 tells what happened after the writer learned Mr. Haddad's tips, so "After a few days" fits. "Before I started" is wrong because clear notes came after the lessons, not before them.`,
        },
        {
          slot: 21,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the beginning of sentence 10?`,
          choices: [
            no(`However,`, 'contrast-for-effect'),
            ok(`For this reason,`),
            no(`Instead,`, 'replacement-for-effect'),
            no(`In the past,`, 'wrong-time-order'),
          ],
          solution: `Sentence 9 gives a reason (practice helps), and sentence 10 tells what the writer does because of it, so "For this reason" fits. "However" is wrong because playing each night agrees with sentence 9 instead of going against it.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `In sentence 2, what do the words "At first" help the reader understand?`,
          choices: [
            no(`The writer is giving an example of a good song.`, 'misreads-as-example'),
            ok(`The squeaks happened at the start, before the writer got better.`),
            no(`The writer is ending the story about the recorder.`, 'misreads-as-conclusion'),
            no(`The squeaks are the opposite of what Mr. Haddad said.`, 'misreads-as-contrast'),
          ],
          solution: `"At first" tells the reader about the beginning, and later sentences show the writer improving, so the squeaks came early. It does not end the story, because the passage goes on to tell what happened next.`,
        },
        {
          slot: 23,
          difficulty: 'hard',
          stem: `The writer wants to add one more sentence at the very end. Which sentence best wraps up the whole passage?`,
          choices: [
            no(`Mr. Haddad has taught music at our school for many years.`, 'new-detail-conclusion'),
            no(`This week's song is the hardest one because it has five notes.`, 'restates-one-detail'),
            ok(`With patience and practice, my squeaks are turning into songs.`),
            no(`Next, I would like to learn how to play the drums.`, 'new-topic-conclusion'),
          ],
          solution: `This sentence connects the squeaks from paragraph 1, the songs and practice from paragraph 2, and the patience from paragraph 3. The sentence about the five-note song only repeats one detail instead of wrapping up the whole passage.`,
        },
      ],
    },
    {
      code: 'wg4-paragraph-transitions-p06',
      title: 'Field Day',
      body: `(1) Field Day is my favorite day of the school year. (2) In the morning, every class meets on the big field behind the school. (3) The first event is the sack race, where we hop to the finish line in cloth bags. (4) After that, we play tug of war against the other fourth-grade class. (5) Then we cool off with the water balloon toss. (6) ____, everyone sits in the shade and eats frozen fruit bars.

(7) Field Day is not only about winning. (8) Our teachers give out ribbons for teamwork and good sportsmanship. (9) Last year, Ana won a ribbon for cheering for every single runner. (10) My older brother's favorite subject is science. (11) At the end of the day, we are tired, but we are all smiling.`,
      items: [
        {
          slot: 24,
          difficulty: 'easy',
          stem: `Which word best fills the blank at the beginning of sentence 6?`,
          choices: [
            no(`First,`, 'wrong-time-order'),
            no(`For example,`, 'example-for-sequence'),
            ok(`Finally,`),
            no(`But,`, 'contrast-for-sequence'),
          ],
          solution: `Sentence 6 tells the last thing that happens after the events in sentences 3 to 5, so "Finally" fits. "First" is wrong because other events already came before it.`,
        },
        {
          slot: 25,
          difficulty: 'medium',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 8`, 'removes-supporting-detail'),
            no(`Sentence 9`, 'removes-supporting-detail'),
            ok(`Sentence 10`),
            no(`Sentence 11`, 'removes-concluding-sentence'),
          ],
          solution: `The second paragraph is about how Field Day is more than winning, and a brother's favorite subject does not tell about that. Sentence 9 belongs because Ana's ribbon shows a prize that was not for winning.`,
        },
        {
          slot: 26,
          difficulty: 'medium',
          stem: `Sentence 9 shows an example of the ribbons described in sentence 8. Which phrase could begin sentence 9 to make this clear?`,
          choices: [
            ok(`For example,`),
            no(`However,`, 'contrast-for-example'),
            no(`Next,`, 'sequence-for-example'),
            no(`In the end,`, 'conclusion-for-example'),
          ],
          solution: `Ana's ribbon is one case of the teamwork ribbons named in sentence 8, so "For example" fits. "Next" is wrong because sentence 9 does not tell a later step; it tells about something from last year.`,
        },
        {
          slot: 27,
          difficulty: 'hard',
          stem: `Which choice best explains how the passage is organized?`,
          choices: [
            no(`Both paragraphs list the Field Day events in time order.`, 'misreads-structure'),
            ok(`The first paragraph tells the events in time order, and the second tells what Field Day is really about.`),
            no(`The first paragraph tells a problem, and the second tells how it was solved.`, 'invents-problem-solution'),
            no(`The first paragraph compares two classes, and the second compares two ribbons.`, 'invents-comparison'),
          ],
          solution: `Paragraph 1 uses time words like "first," "After that," and "Then" to list events, and paragraph 2 explains that Field Day is not only about winning. Paragraph 2 does not list events in time order, so the choice "Both paragraphs list the Field Day events in time order" does not fit.`,
        },
      ],
    },
  ],
  items: [
    {
      slot: 28,
      difficulty: 'easy',
      stem: `Read: "Frogs start life as tadpoles that swim in ponds. ____, they grow legs and lose their tails." Which word best fills the blank?`,
      choices: [
        no(`Instead,`, 'replacement-for-sequence'),
        ok(`Later,`),
        no(`However,`, 'contrast-for-sequence'),
        no(`For example,`, 'example-for-sequence'),
      ],
      solution: `Growing legs happens after the tadpole stage, so the time-order word "Later" fits. "Instead" is wrong because the frog does not grow legs in place of being a tadpole; it grows legs after.`,
    },
    {
      slot: 29,
      difficulty: 'easy',
      stem: `Read: "Jada likes many sports. She plays basketball on Mondays. ____, she swims on Wednesdays." Which word best fills the blank?`,
      choices: [
        no(`However,`, 'contrast-for-addition'),
        no(`Because,`, 'cause-for-addition'),
        ok(`Also,`),
        no(`Instead,`, 'replacement-for-addition'),
      ],
      solution: `Swimming is another sport Jada likes, so "Also" adds it to the list. "However" is wrong because swimming does not go against playing basketball.`,
    },
    {
      slot: 30,
      difficulty: 'easy',
      stem: `Read: "Rain fell for three days in a row. ____, the river rose over its banks." Which phrase best fills the blank?`,
      choices: [
        ok(`Because of this,`),
        no(`For example,`, 'example-for-effect'),
        no(`On the other hand,`, 'contrast-for-effect'),
        no(`First,`, 'sequence-for-effect'),
      ],
      solution: `The rain caused the river to rise, so "Because of this" shows cause and effect. "For example" is wrong because the river rising is a result of the rain, not an example of it.`,
    },
    {
      slot: 31,
      difficulty: 'medium',
      stem: `Read the paragraph: (1) The moon seems to change shape during the month. (2) Sometimes we see a full, round moon. (3) Astronauts have walked on the moon. (4) Other times we see only a thin sliver. (5) These changes are called phases. Which sentence does not belong?`,
      choices: [
        no(`Sentence 1`, 'removes-topic-sentence'),
        no(`Sentence 2`, 'removes-supporting-detail'),
        ok(`Sentence 3`),
        no(`Sentence 5`, 'removes-concluding-sentence'),
      ],
      solution: `The paragraph is about how the moon seems to change shape, and astronauts walking on it is a different topic. Sentence 3 is the tricky one because it mentions the moon, but it does not tell about the moon's shape.`,
    },
    {
      slot: 32,
      difficulty: 'medium',
      stem: `Read the sentences: (A) Finally, he handed the card to his grandmother. (B) First, Ravi folded a sheet of paper in half. (C) Then he drew flowers on the front. (D) Next, he wrote a kind message under the flowers he drew. Which is the most logical order?`,
      choices: [
        no(`B, D, C, A`, 'ignores-time-order'),
        ok(`B, C, D, A`),
        no(`A, B, C, D`, 'conclusion-too-early'),
        no(`B, C, A, D`, 'conclusion-too-early'),
      ],
      solution: `Ravi folds the paper first, draws the flowers, writes under the flowers, and finally gives the card away. B, D, C, A is wrong because he cannot write under the flowers before he has drawn them.`,
    },
    {
      slot: 33,
      difficulty: 'medium',
      stem: `Read: "____ Some owls can turn their heads very far to look around. They have large eyes that help them see in the dark. Their soft feathers let them fly without making a sound." Which sentence is the best topic sentence for this paragraph?`,
      choices: [
        no(`Owls are a kind of bird.`, 'too-broad'),
        no(`Owls have very large eyes.`, 'too-narrow'),
        ok(`Owls have special features that help them find food at night.`),
        no(`Many birds fly south for the winter.`, 'off-topic'),
      ],
      solution: `Every detail tells about a special owl feature, so a topic sentence about owls' special features covers all of them. "Owls have very large eyes" is too narrow because it fits only one of the three details.`,
    },
    {
      slot: 34,
      difficulty: 'medium',
      stem: `Read: "Video calls help my family stay close. My grandparents live far away in another state. Every Sunday, we call them on the computer. We can see their faces and show them our art projects. ____" Which sentence is the best concluding sentence?`,
      choices: [
        no(`My grandparents have a fluffy cat named Pepper.`, 'off-topic'),
        no(`Computers can be used for many different things.`, 'too-broad'),
        no(`Every Sunday, we call them on the computer.`, 'repeats-detail'),
        ok(`Even though they live far away, video calls make us feel close.`),
      ],
      solution: `This sentence returns to the main idea from the first sentence, that video calls keep the family close. Repeating "Every Sunday, we call them" only restates one detail instead of wrapping up the paragraph.`,
    },
    {
      slot: 35,
      difficulty: 'medium',
      stem: `Read: "Ants in a colony share the work. Some ants go out to gather food. ____, other ants stay inside and care for the young." Which phrase best fills the blank?`,
      choices: [
        no(`For example,`, 'example-for-simultaneous'),
        ok(`At the same time,`),
        no(`As a result,`, 'cause-for-simultaneous'),
        no(`Finally,`, 'sequence-for-simultaneous'),
      ],
      solution: `The two groups of ants do their jobs during the same time, so "At the same time" fits. "As a result" is wrong because gathering food does not cause other ants to care for the young.`,
    },
    {
      slot: 36,
      difficulty: 'hard',
      stem: `Read: "Snowflakes all have six sides. ____, no two snowflakes look exactly alike." Which phrase best fills the blank?`,
      choices: [
        no(`In addition,`, 'addition-for-contrast'),
        no(`As a result,`, 'cause-for-contrast'),
        ok(`Even so,`),
        no(`For example,`, 'example-for-contrast'),
      ],
      solution: `The first sentence tells how snowflakes are the same, and the second tells how they are different, so "Even so" shows the contrast. "As a result" is wrong because having six sides does not cause snowflakes to look different.`,
    },
    {
      slot: 37,
      difficulty: 'hard',
      stem: `In which pair of sentences is the transition word used incorrectly?`,
      choices: [
        no(`We mixed the blue and yellow paint. Then we painted the box green.`, 'misreads-sequence'),
        no(`It was very cold outside. So I wore my warm hat.`, 'misreads-cause-effect'),
        no(`I love fruit. For example, I eat an apple every day.`, 'misreads-example'),
        ok(`The park was crowded. However, there were people everywhere.`),
      ],
      solution: `"However" shows a contrast, but people being everywhere agrees with a crowded park, so the transition is wrong there. The cold weather pair is correct because "So" shows that the cold caused the writer to wear a hat.`,
    },
    {
      slot: 38,
      difficulty: 'hard',
      stem: `Read the sentences: (A) For example, they turn off the lights when a room is empty. (B) Our school has a team of students called the Energy Helpers. (C) They also check that classroom windows are closed in winter. (D) Because of their work, our school uses less power. Which sentence should come first?`,
      choices: [
        no(`Sentence A`, 'example-before-topic'),
        ok(`Sentence B`),
        no(`Sentence C`, 'addition-before-topic'),
        no(`Sentence D`, 'conclusion-as-topic'),
      ],
      solution: `Sentence B introduces the Energy Helpers, so it is the topic sentence and must come first. Sentence A starts with "For example," so it needs an idea before it to give an example of.`,
    },
    {
      slot: 39,
      difficulty: 'hard',
      stem: `Leo's first paragraph tells about the good things about living in a city. His second paragraph will tell about the hard things. Which sentence would best begin the second paragraph?`,
      choices: [
        no(`For example, the city has a big science museum.`, 'example-for-contrast'),
        ok(`On the other hand, city life can also be hard.`),
        no(`In the same way, city life is a lot of fun.`, 'similarity-for-contrast'),
        no(`First, my family moved to the city last year.`, 'sequence-for-contrast'),
      ],
      solution: `"On the other hand" turns from the good things to the hard things, so it links the two paragraphs. "For example" is wrong because a museum is one more good thing, not a hard thing.`,
    },
    {
      slot: 40,
      difficulty: 'medium',
      stem: `Read: "(1) Volunteers cleaned up Maple Street Park on Saturday. (2) First, they picked up trash along the paths. (3) Next, they painted the old benches. (4) ____ the park looked bright and clean." Which phrase best begins sentence 4?`,
      choices: [
        no(`For instance,`, 'example-for-conclusion'),
        no(`At the beginning,`, 'wrong-time-order'),
        ok(`By the end of the day,`),
        no(`On the other hand,`, 'contrast-for-conclusion'),
      ],
      solution: `Sentence 4 tells how the park looked after all the work was done, so "By the end of the day" fits. "At the beginning" is wrong because the park was not clean until the volunteers had finished.`,
    },
  ],
}

export default skill
