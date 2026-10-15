import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g5-paragraph-transitions',
  subject: 'writing',
  grade: 5,
  group: 'Sentence and paragraph',
  name: 'Paragraph Organization and Transitions',
  standards: ['W.5.2c'],
  passages: [
    {
      code: 'wg5-paragraph-transitions-p01',
      title: 'The Erie Canal',
      body: `(1) In the early 1800s, moving goods across New York was slow and expensive. (2) Farmers in the west had to haul their crops over rough roads in heavy wagons. (3) ____, a trip from Buffalo to New York City could take weeks. (4) Leaders in New York decided to dig a canal that would connect Lake Erie to the Hudson River. (5) Workers began digging in 1817, and they finished the canal in 1825.

(6) The canal changed life in the state in several ways. (7) Boats pulled by mules could carry heavy loads for a much lower price. (8) ____, towns along the route, such as Rochester and Syracuse, grew quickly. (9) Mules are known for being strong and sure-footed animals. (10) New York City also became one of the busiest ports in the country. (11) ____`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which phrase best fills the blank at the beginning of sentence 3?`,
          choices: [
            ok(`As a result,`),
            no(`On the other hand,`, 'contrast-for-result'),
            no(`Instead,`, 'replacement-for-result'),
            no(`Similarly,`, 'similarity-for-result'),
          ],
          solution: `Sentence 3 tells what happened because the roads were rough and the wagons were heavy, so "As a result" shows that link. "On the other hand" is wrong because sentence 3 does not go against sentence 2; it follows from it.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 7`, 'removes-supporting-detail'),
            ok(`Sentence 9`),
            no(`Sentence 10`, 'removes-supporting-detail'),
            no(`Sentence 6`, 'removes-topic-sentence'),
          ],
          solution: `The second paragraph is about how the canal changed life in New York, and a fact about what mules are like does not show a change. Sentence 10 belongs because it gives another way the canal changed the state.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which word best fills the blank at the beginning of sentence 8?`,
          choices: [
            no(`Nevertheless,`, 'contrast-for-result'),
            ok(`Consequently,`),
            no(`Previously,`, 'wrong-time-order'),
            no(`Instead,`, 'replacement-for-result'),
          ],
          solution: `Cheaper shipping in sentence 7 helped the towns along the route grow, so "Consequently" shows cause and effect. "Previously" is wrong because the towns grew after the canal opened, not before.`,
        },
        {
          slot: 4,
          difficulty: 'hard',
          stem: `Which sentence would best fill blank 11 as a concluding sentence for the second paragraph?`,
          choices: [
            no(`Today, people can ride bikes on paths beside parts of the old canal.`, 'introduces-new-idea'),
            no(`Workers used shovels, picks, and wheelbarrows to dig the canal.`, 'detail-from-other-paragraph'),
            ok(`In these ways, the Erie Canal helped the whole state grow and succeed.`),
            no(`Syracuse is a city in the middle of New York State.`, 'too-narrow'),
          ],
          solution: `A concluding sentence sums up the paragraph, and "In these ways" gathers the changes in sentences 7, 8, and 10 into one idea. The sentence about bike paths is tempting because it is about the canal, but it adds a new idea instead of wrapping up the changes.`,
        },
        {
          slot: 5,
          difficulty: 'medium',
          stem: `The writer wants to add this sentence: "The finished canal stretched about 363 miles across the state." Where would it fit best?`,
          choices: [
            no(`After sentence 2`, 'ignores-time-order'),
            ok(`After sentence 5`),
            no(`After sentence 9`, 'wrong-paragraph'),
            no(`After sentence 10`, 'wrong-paragraph'),
          ],
          solution: `The new sentence describes the finished canal, so it fits right after sentence 5, which says the canal was finished in 1825. After sentence 2 is wrong because the canal had not even been planned yet at that point in the paragraph.`,
        },
      ],
    },
    {
      code: 'wg5-paragraph-transitions-p02',
      title: 'Racing to the Sea',
      body: `(1) On certain warm beaches, something amazing happens on summer nights. (2) Tiny loggerhead sea turtles dig their way out of nests buried in the sand. (3) ____, they must find their way to the ocean. (4) Scientists think the hatchlings move toward the brightest horizon, which is usually the moonlit water. (5) Bright lights from houses and streets can confuse them, however. (6) ____, some hatchlings crawl toward roads instead of the sea.

(7) Many beach towns now work to help the young turtles. (8) Some towns ask people to turn off outdoor lights during nesting season. (9) Others use special amber lights that turtles do not notice as much. (10) Volunteers also mark nests with stakes and tape so that no one steps on them. (11) Loggerheads are named for their large heads. (12) Thanks to these efforts, more hatchlings can reach the waves safely.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which phrase best fills the blank at the beginning of sentence 3?`,
          choices: [
            no(`In contrast,`, 'contrast-for-sequence'),
            ok(`As soon as they are out,`),
            no(`For example,`, 'example-for-sequence'),
            no(`Long before they hatch,`, 'wrong-time-order'),
          ],
          solution: `Sentence 2 tells how the turtles climb out of their nests, and sentence 3 tells what they must do next, so "As soon as they are out" fits. "Long before they hatch" is wrong because the turtles cannot crawl to the ocean before they hatch.`,
        },
        {
          slot: 7,
          difficulty: 'medium',
          stem: `Which word best fills the blank at the beginning of sentence 6?`,
          choices: [
            no(`Similarly,`, 'similarity-for-result'),
            no(`Earlier,`, 'wrong-time-order'),
            ok(`Consequently,`),
            no(`Otherwise,`, 'condition-for-result'),
          ],
          solution: `Sentence 6 tells what happens because bright lights confuse the hatchlings, so "Consequently" shows the result. "Similarly" is wrong because crawling toward roads is not like being confused; it is caused by it.`,
        },
        {
          slot: 8,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 8`, 'removes-supporting-detail'),
            no(`Sentence 10`, 'removes-supporting-detail'),
            ok(`Sentence 11`),
            no(`Sentence 12`, 'removes-concluding-sentence'),
          ],
          solution: `The second paragraph is about how beach towns help young turtles, and how loggerheads got their name does not tell about that help. Sentence 12 belongs because it wraps up what the efforts do.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which sentence is the topic sentence of the second paragraph?`,
          choices: [
            ok(`Sentence 7`),
            no(`Sentence 8`, 'detail-as-topic'),
            no(`Sentence 10`, 'detail-as-topic'),
            no(`Sentence 12`, 'conclusion-as-topic'),
          ],
          solution: `Sentence 7 states the main idea that towns help the turtles, and sentences 8 to 10 give the ways they help. Sentence 12 is tempting, but it is the conclusion that tells the result of those efforts.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `The word "however" in sentence 5 shows that sentence 5:`,
          choices: [
            no(`gives an example of the moonlit water in sentence 4`, 'misreads-contrast-as-example'),
            ok(`turns from how hatchlings find the sea to a problem that can mislead them`),
            no(`tells the next step the hatchlings take after reaching the water`, 'misreads-contrast-as-sequence'),
            no(`explains what causes the water to be bright at night`, 'misreads-contrast-as-cause'),
          ],
          solution: `Sentence 4 tells how hatchlings usually find the water, and "however" signals a change to something that goes wrong: bright lights confuse them. It does not tell a next step, because the hatchlings in sentence 5 have not reached the water.`,
        },
      ],
    },
    {
      code: 'wg5-paragraph-transitions-p03',
      title: 'Learning the Steel Pan',
      body: `(1) This fall, our music class started learning to play the steel pan. (2) The steel pan is a drum that was first made on the island of Trinidad. (3) It is shaped like a large, shallow bowl, and its top is divided into many dented sections. (4) Each section plays a different note when you tap it with a rubber-tipped stick. (5) ____, the small sections near the center make high notes, while the larger ones near the edge make low notes.

(6) Learning to play was harder than I expected. (7) At first, I kept hitting the space between two notes. (8) ____, my songs sounded more like clanging pots than music. (9) My teacher, Mr. Baptiste, showed me how to keep my wrist loose and bounce the stick off the metal. (10) I practiced every day for two weeks. (11) My sister plays the clarinet in the middle school band. (12) By our winter concert, I could play a whole song without a single wrong note.`,
      items: [
        {
          slot: 11,
          difficulty: 'medium',
          stem: `Which word best fills the blank at the beginning of sentence 5?`,
          choices: [
            ok(`Specifically,`),
            no(`Nevertheless,`, 'contrast-for-detail'),
            no(`Afterward,`, 'sequence-for-detail'),
            no(`On the other hand,`, 'contrast-for-detail'),
          ],
          solution: `Sentence 4 says each section plays a different note, and sentence 5 gives the exact details of which sections make high and low notes, so "Specifically" fits. "On the other hand" is wrong because sentence 5 explains sentence 4 instead of going against it.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which phrase best fills the blank at the beginning of sentence 8?`,
          choices: [
            no(`In contrast,`, 'contrast-for-result'),
            ok(`As a result,`),
            no(`Finally,`, 'conclusion-too-early'),
            no(`Similarly,`, 'similarity-for-result'),
          ],
          solution: `Hitting the space between notes in sentence 7 caused the songs to sound like clanging pots, so "As a result" shows the effect. "Finally" is wrong because the writer is still at the start of learning, not at the end.`,
        },
        {
          slot: 13,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 7`, 'removes-supporting-detail'),
            no(`Sentence 9`, 'removes-supporting-detail'),
            ok(`Sentence 11`),
            no(`Sentence 12`, 'removes-concluding-sentence'),
          ],
          solution: `The second paragraph tells how the writer learned to play the steel pan, and a sister playing the clarinet is not part of that story. Sentence 12 belongs because it tells how the learning turned out.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which revision of sentence 10 best connects it to sentence 9?`,
          choices: [
            no(`However, I practiced every day for two weeks.`, 'contrast-for-sequence'),
            no(`For example, I practiced every day for two weeks.`, 'example-for-sequence'),
            ok(`After that lesson, I practiced every day for two weeks.`),
            no(`Before I ever tried it, I practiced every day for two weeks.`, 'wrong-time-order'),
          ],
          solution: `Sentence 9 describes a lesson from Mr. Baptiste, and "After that lesson" shows that the daily practice came next. "For example" is wrong because practicing for two weeks is not an example of the wrist tip in sentence 9.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 6 so that it introduces the second paragraph and links it to the first?`,
          choices: [
            ok(`Knowing how the steel pan works did not make it easy to play, though.`),
            no(`The steel pan is often played in bands with many other instruments.`, 'off-topic'),
            no(`At first, I could not hit the right notes at all.`, 'detail-as-topic'),
            no(`Trinidad is an island in the Caribbean Sea.`, 'detail-from-other-paragraph'),
          ],
          solution: `This sentence looks back at the first paragraph (how the pan works) and points ahead to the second (it was hard to play), so it links them. "At first, I could not hit the right notes" is a detail that repeats sentence 7 instead of introducing the paragraph.`,
        },
      ],
    },
    {
      code: 'wg5-paragraph-transitions-p04',
      title: 'Wheelchair Basketball',
      body: `(1) Wheelchair basketball is a fast and exciting sport. (2) Players move their chairs with their hands and dribble the ball at the same time. (3) The rules are mostly the same as in regular basketball. (4) ____, the hoop is the same height, and a basket still counts for two or three points. (5) There are a few differences, though. (6) ____, a player must pass, shoot, or dribble after pushing the wheels twice. (7) Players also use special chairs with slanted wheels that make sharp turns easier.

(8) Last spring, a wheelchair basketball team visited our school. (9) The players let us try their chairs during gym class. (10) I learned that turning and dribbling at the same time takes a lot of practice. (11) Our gym floor had been waxed the week before. (12) Most of all, the visit showed me how much skill and strength the sport takes.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which phrase best fills the blank at the beginning of sentence 4?`,
          choices: [
            no(`However,`, 'contrast-for-example'),
            no(`Instead,`, 'replacement-for-example'),
            ok(`For example,`),
            no(`Finally,`, 'sequence-for-example'),
          ],
          solution: `Sentence 3 says the rules are mostly the same, and sentence 4 gives examples of rules that match, so "For example" fits. "However" is wrong because sentence 4 agrees with sentence 3 instead of showing a difference.`,
        },
        {
          slot: 17,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the beginning of sentence 6?`,
          choices: [
            no(`In the same way,`, 'similarity-for-difference'),
            ok(`For instance,`),
            no(`Consequently,`, 'cause-for-example'),
            no(`In conclusion,`, 'conclusion-too-early'),
          ],
          solution: `Sentence 5 says there are a few differences, and sentence 6 gives one of them, so "For instance" introduces the example. "In the same way" is wrong because sentence 6 describes a difference from regular basketball, not a sameness.`,
        },
        {
          slot: 18,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 9`, 'removes-supporting-detail'),
            no(`Sentence 10`, 'removes-supporting-detail'),
            no(`Sentence 12`, 'removes-concluding-sentence'),
            ok(`Sentence 11`),
          ],
          solution: `The second paragraph is about what the writer learned from the team's visit, and a freshly waxed floor does not add to that. Sentence 10 belongs because it tells something the writer learned while trying the chairs.`,
        },
        {
          slot: 19,
          difficulty: 'hard',
          stem: `The writer wants to add this sentence: "These special chairs are also much lighter than everyday wheelchairs." Where would it fit best?`,
          choices: [
            no(`After sentence 2`, 'ignores-reference-word'),
            no(`After sentence 4`, 'breaks-example-link'),
            ok(`After sentence 7`),
            no(`After sentence 10`, 'wrong-paragraph'),
          ],
          solution: `The words "these special chairs" and "also" point back to sentence 7, which first describes the special chairs, so the new sentence belongs right after it. After sentence 2 is tempting because it mentions chairs, but the chairs have not been called special yet, so "these special chairs" would not make sense there.`,
        },
      ],
    },
    {
      code: 'wg5-paragraph-transitions-p05',
      title: 'How a 3D Printer Works',
      body: `(1) A 3D printer can turn a computer drawing into a real object you can hold. (2) ____, a person designs the object on a computer. (3) Next, a program slices the design into hundreds of thin, flat layers. (4) The printer then heats a thin plastic string until it is soft. (5) A nozzle squeezes out the melted plastic, drawing the bottom layer first. (6) As each layer cools, it hardens and sticks to the one below it. (7) ____, the printer builds the whole object one layer at a time, from bottom to top.

(8) 3D printers are useful in many places. (9) Engineers use them to test models of new parts before making the real thing. (10) Doctors use them to make models that help them plan treatments. (11) Even students can print a new knob for a broken drawer. (12) My uncle's printer at home is always running out of ink.`,
      items: [
        {
          slot: 20,
          difficulty: 'easy',
          stem: `Which word best fills the blank at the beginning of sentence 2?`,
          choices: [
            ok(`First,`),
            no(`Finally,`, 'wrong-time-order'),
            no(`However,`, 'contrast-for-sequence'),
            no(`Therefore,`, 'cause-for-sequence'),
          ],
          solution: `Sentence 2 gives the first step in making an object, and sentence 3 begins with "Next," so "First" fits. "Finally" is wrong because many steps still come after designing the object.`,
        },
        {
          slot: 21,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the beginning of sentence 7?`,
          choices: [
            no(`In contrast,`, 'contrast-for-summary'),
            no(`For example,`, 'example-for-summary'),
            no(`At first,`, 'wrong-time-order'),
            ok(`In this way,`),
          ],
          solution: `Sentence 7 sums up how the steps in sentences 3 to 6 work together, so "In this way" fits. "At first" is wrong because building the whole object is the end of the process, not the beginning.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 9`, 'removes-supporting-detail'),
            no(`Sentence 10`, 'removes-supporting-detail'),
            no(`Sentence 11`, 'removes-supporting-detail'),
            ok(`Sentence 12`),
          ],
          solution: `The paragraph is about places where 3D printers are useful, and a paper printer running out of ink is a different kind of printer and a different idea. Sentence 11 belongs because students are one more group that finds 3D printers useful.`,
        },
        {
          slot: 23,
          difficulty: 'hard',
          stem: `Which sentence would make the best conclusion for the second paragraph after sentence 12 is removed?`,
          choices: [
            no(`A 3D printer heats plastic until it is soft.`, 'repeats-other-paragraph'),
            ok(`As these examples show, 3D printers help people solve problems in many fields.`),
            no(`Some 3D printers are as large as a car.`, 'introduces-new-idea'),
            no(`Doctors work hard to take care of their patients.`, 'off-topic'),
          ],
          solution: `The paragraph gives examples of 3D printers being useful, and this sentence sums up those examples with "As these examples show." The sentence about printers as large as a car is tempting because it is about 3D printers, but it adds a new fact instead of wrapping up the paragraph.`,
        },
      ],
    },
    {
      code: 'wg5-paragraph-transitions-p06',
      title: 'Our Class Book Swap',
      body: `(1) Last month, our fifth-grade class held a book swap. (2) Many of us had shelves full of books we had already read. (3) ____, we wanted new stories without spending any money. (4) Our teacher, Ms. Okafor, suggested that everyone bring two books to trade. (5) For each book a student brought, that student received a ticket. (6) Each ticket could be traded for one book from the swap table.

(7) The swap was a bigger success than we expected. (8) Students brought more than eighty books in all. (9) ____, the second-grade classes heard about it and asked to join next time. (10) We gave the leftover books to the town library, especially the picture books, which the children's room needed most. (11) ____`,
      items: [
        {
          slot: 24,
          difficulty: 'easy',
          stem: `Which phrase best fills the blank at the beginning of sentence 3?`,
          choices: [
            no(`For example,`, 'example-for-addition'),
            ok(`At the same time,`),
            no(`Instead,`, 'replacement-for-addition'),
            no(`In conclusion,`, 'conclusion-too-early'),
          ],
          solution: `Sentence 3 adds a second fact that goes along with sentence 2: the students had old books and also wanted new ones, so "At the same time" fits. "For example" is wrong because wanting new stories is not an example of having old books.`,
        },
        {
          slot: 25,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the beginning of sentence 9?`,
          choices: [
            ok(`Before long,`),
            no(`Before the swap began,`, 'wrong-time-order'),
            no(`In contrast,`, 'contrast-for-addition'),
            no(`Instead,`, 'replacement-for-addition'),
          ],
          solution: `The second graders heard about the swap after it happened, so "Before long" shows that this came soon after. "Before the swap began" is wrong because no one could hear about how the swap went before it took place.`,
        },
        {
          slot: 26,
          difficulty: 'medium',
          stem: `Which sentence would best fill blank 11 as a concluding sentence for the second paragraph?`,
          choices: [
            no(`Ms. Okafor teaches fifth grade at our school.`, 'off-topic'),
            no(`Each student brought two books to trade.`, 'repeats-detail'),
            ok(`Our book swap gave old books new readers and brought our school together.`),
            no(`Libraries let people borrow books for free.`, 'too-broad'),
          ],
          solution: `The paragraph is about how successful the swap was, and this sentence sums up that success. "Each student brought two books to trade" is tempting because it is about the swap, but it repeats a detail from the first paragraph instead of wrapping up the second.`,
        },
        {
          slot: 27,
          difficulty: 'hard',
          stem: `The word "especially" in sentence 10 tells the reader that:`,
          choices: [
            ok(`the picture books were the most important part of the gift to the library`),
            no(`the picture books were the only leftover books the class gave away`, 'misreads-especially-as-only'),
            no(`the picture books were given to the library before the other books`, 'misreads-as-time-order'),
            no(`the picture books were left over because nobody wanted to read them`, 'misreads-as-cause'),
          ],
          solution: `"Especially" points out one part of a group as the most important, and the sentence says the children's room needed the picture books most. It does not mean "only," because the sentence says the class gave all the leftover books to the library.`,
        },
      ],
    },
  ],
  items: [
    {
      slot: 28,
      difficulty: 'easy',
      stem: `Read: "Most birds sleep at night. ____, bats sleep during the day and hunt for insects after dark." Which phrase best fills the blank?`,
      choices: [
        ok(`In contrast,`),
        no(`For example,`, 'example-for-contrast'),
        no(`As a result,`, 'confuses-cause-effect'),
        no(`Similarly,`, 'similarity-for-contrast'),
      ],
      solution: `Bats do the opposite of most birds, so "In contrast" shows the difference. "Similarly" is wrong because bats sleeping in the day is not like birds sleeping at night.`,
    },
    {
      slot: 29,
      difficulty: 'easy',
      stem: `Read: "The desert gets very little rain. ____, cactus plants store water in their thick stems." Which phrase best fills the blank?`,
      choices: [
        no(`In contrast,`, 'contrast-for-result'),
        ok(`As a result,`),
        no(`Before that,`, 'wrong-time-order'),
        no(`On the other hand,`, 'contrast-for-result'),
      ],
      solution: `Cactus plants store water because the desert gets so little rain, so "As a result" shows cause and effect. "In contrast" is wrong because storing water does not go against the idea of little rain; it follows from it.`,
    },
    {
      slot: 30,
      difficulty: 'medium',
      stem: `Read the sentences: (A) Finally, she gently pulled the wings apart, and the paper crane was done. (B) Mei began with a square sheet of paper. (C) Next, she made a series of careful folds to form a diamond shape. (D) First, she folded the paper in half to make a triangle. Which order is most logical?`,
      choices: [
        ok(`B, D, C, A`),
        no(`D, B, C, A`, 'step-before-introduction'),
        no(`B, C, D, A`, 'ignores-signal-words'),
        no(`A, B, D, C`, 'conclusion-first'),
      ],
      solution: `Sentence B sets up the task, then the signal words "First," "Next," and "Finally" give the order D, C, A. Order D, B, C, A is wrong because Mei cannot fold the paper before she has the sheet in sentence B.`,
    },
    {
      slot: 31,
      difficulty: 'medium',
      stem: `Read: "Kites need a steady wind to stay in the air. ____, a calm, still day is a poor day for kite flying." Which word best fills the blank?`,
      choices: [
        no(`Nevertheless,`, 'contrast-for-result'),
        no(`Meanwhile,`, 'time-for-result'),
        ok(`Consequently,`),
        no(`Specifically,`, 'detail-for-result'),
      ],
      solution: `Because kites need wind, a day with no wind is bad for flying them, so "Consequently" shows the result. "Specifically" is wrong because the second sentence does not give a more exact detail about wind; it tells what follows from needing wind.`,
    },
    {
      slot: 32,
      difficulty: 'medium',
      stem: `Read: "Our town holds many summer events that families enjoy, ____ the outdoor concert on the last night of summer." Which word best completes the sentence?`,
      choices: [
        no(`however`, 'contrast-for-emphasis'),
        ok(`especially`),
        no(`therefore`, 'cause-for-emphasis'),
        no(`instead`, 'replacement-for-emphasis'),
      ],
      solution: `"Especially" singles out one event as a favorite among many, which is what the sentence does with the outdoor concert. "Instead" is wrong because the concert is one of the events, not a replacement for them.`,
    },
    {
      slot: 33,
      difficulty: 'medium',
      stem: `A paragraph has these details: A rover on Mars drills into rocks to study what they are made of. It takes clear photos of the land around it. It sends all of its information back to scientists on Earth. Which is the best topic sentence for this paragraph?`,
      choices: [
        no(`Mars is the fourth planet from the sun.`, 'off-topic'),
        ok(`A rover on Mars does several important jobs for scientists.`),
        no(`The rover's camera can take very clear photos.`, 'too-narrow'),
        no(`Someday, people may be able to travel to Mars.`, 'off-topic'),
      ],
      solution: `All three details are jobs the rover does, so a topic sentence about its several jobs covers them all. The sentence about the camera is too narrow because it fits only one of the three details.`,
    },
    {
      slot: 34,
      difficulty: 'medium',
      stem: `Read: "People learn sign language for many reasons. ____, Jamal learned it so he could talk with his grandfather, who is deaf." Which phrase best fills the blank?`,
      choices: [
        no(`However,`, 'contrast-for-example'),
        ok(`For example,`),
        no(`As a result,`, 'cause-for-example'),
        no(`Finally,`, 'sequence-for-example'),
      ],
      solution: `Jamal's reason is one example of the many reasons in the first sentence, so "For example" fits. "As a result" is wrong because people having many reasons did not cause Jamal to learn sign language.`,
    },
    {
      slot: 35,
      difficulty: 'medium',
      stem: `Read: "Indoor ice rinks stay open for skating all year long. ____, outdoor ponds are safe for skating only during the coldest weeks of winter." Which phrase best fills the blank?`,
      choices: [
        no(`Similarly,`, 'similarity-for-contrast'),
        no(`As a result,`, 'confuses-cause-effect'),
        ok(`On the other hand,`),
        no(`For example,`, 'example-for-contrast'),
      ],
      solution: `Indoor rinks are open all year, but outdoor ponds can be used only a few weeks, so "On the other hand" shows the contrast. "Similarly" is wrong because the two kinds of skating places are being shown as different, not alike.`,
    },
    {
      slot: 36,
      difficulty: 'hard',
      stem: `Read the paragraph: "(1) Recycling aluminum cans saves energy. (2) Making a can from old cans uses much less power than making one from new metal. (3) Old cans can also be melted down and turned into new cans again and again. (4) ____" Which sentence best concludes the paragraph?`,
      choices: [
        no(`Aluminum is a light, shiny kind of metal.`, 'off-topic'),
        no(`First, rinse the cans before putting them in the bin.`, 'introduces-new-idea'),
        no(`However, some people still throw cans in the trash.`, 'introduces-new-idea'),
        ok(`For these reasons, putting cans in the recycling bin is a smart choice.`),
      ],
      solution: `"For these reasons" pulls together the benefits in sentences 2 and 3 and restates the main idea. The sentence about people throwing cans away is tempting because it is about recycling, but it starts a new idea instead of wrapping up the paragraph.`,
    },
    {
      slot: 37,
      difficulty: 'hard',
      stem: `In which pair of sentences is the transition used incorrectly?`,
      choices: [
        no(`The old bridge was cracked and weak. Consequently, the town closed it for repairs.`, 'misreads-cause-effect'),
        no(`An octopus can change its color. Specifically, it can match the brown and gray of nearby rocks.`, 'misreads-specific-detail'),
        ok(`Our team lost the first game. Similarly, we won the next three games.`),
        no(`Rosa practiced the violin every day. As a result, she played well at her recital.`, 'misreads-cause-effect'),
      ],
      solution: `Losing a game and winning games are opposites, so "Similarly" is the wrong transition; a word like "However" would fit. The octopus pair is correct because the second sentence gives a specific example of how an octopus changes color.`,
    },
    {
      slot: 38,
      difficulty: 'hard',
      stem: `Read the sentences: (A) As it rises, the air around it gets thinner, so the balloon slowly grows larger. (B) Before launch, scientists tie a small box of weather tools to a large balloon. (C) Eventually, the balloon stretches so much that it pops, and the box floats down on a parachute. (D) Then they let it go, and it begins to rise into the sky. If the sentences are put in the most logical order, which sentence comes third?`,
      choices: [
        ok(`Sentence A`),
        no(`Sentence B`, 'ignores-signal-words'),
        no(`Sentence C`, 'skips-middle-step'),
        no(`Sentence D`, 'ignores-signal-words'),
      ],
      solution: `The logical order is B (before launch), D (then they let it go), A (as it rises), C (eventually it pops), so A is third. Sentence D is tempting, but "Then they let it go" must come right after the balloon is prepared, which makes it second.`,
    },
    {
      slot: 39,
      difficulty: 'hard',
      stem: `Nadia's first paragraph explains the good things about having a class pet. Her second paragraph will explain the challenges of caring for one. Which sentence would best begin the second paragraph?`,
      choices: [
        no(`As a result, our class hamster is very happy.`, 'cause-for-contrast'),
        no(`For example, a class pet teaches responsibility.`, 'example-for-contrast'),
        ok(`Even with these benefits, caring for a class pet can be hard work.`),
        no(`In addition, class pets are fun to watch.`, 'addition-for-contrast'),
      ],
      solution: `"Even with these benefits" looks back at the good things and turns to the challenges, so it links the two paragraphs. "In addition, class pets are fun to watch" is wrong because it adds another good thing instead of introducing the challenges.`,
    },
    {
      slot: 40,
      difficulty: 'medium',
      stem: `Read the paragraph: "(1) Long ago, sailors used the stars to find their way at sea. (2) The North Star stays in nearly the same spot in the night sky. (3) By finding it, sailors could tell which way was north. (4) Many sailors also carried a compass, a tool whose needle points north. (5) Sea water is too salty for people to drink. (6) With these tools, sailors could cross wide oceans without getting lost." Which sentence does not belong?`,
      choices: [
        no(`Sentence 2`, 'removes-supporting-detail'),
        no(`Sentence 4`, 'removes-supporting-detail'),
        ok(`Sentence 5`),
        no(`Sentence 6`, 'removes-concluding-sentence'),
      ],
      solution: `The paragraph is about how sailors found their way, and salty sea water has nothing to do with finding directions. Sentence 4 belongs because a compass is another tool that helped sailors know which way was north.`,
    },
  ],
}

export default skill
