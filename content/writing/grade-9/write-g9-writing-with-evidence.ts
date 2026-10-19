import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g9-writing-with-evidence',
  subject: 'writing',
  grade: 9,
  group: 'Composition',
  name: 'Writing About Texts with Evidence',
  standards: ['W.9-10.9'],
  passages: [
    {
      code: 'wg9-writing-with-evidence-p01',
      title: 'Draft: Catching Water from the Air',
      body: `(1) In the article "Nets That Drink the Fog," water scientist Tomas Arriaga describes how the hillside village of Las Brisas began collecting drinking water from fog. (2) Fog is a cloud that forms close to the ground. (3) Arriaga explains that villagers stretched fine plastic mesh between tall poles on a ridge where fog drifts in from the ocean almost every morning. (4) Tiny droplets cling to the mesh, join together, and run down into a gutter that feeds a storage tank. (5) According to Arriaga, the twelve nets on the ridge collected an average of 2,400 liters of water on foggy days during their first year. (6) This shows that fog nets can turn an ordinary weather pattern into a steady supply of water.

(7) Arriaga also describes how the water changed daily life in Las Brisas. (8) Before the nets were built, students at the village school spent nearly two hours each morning carrying water up from a stream in the valley. (9) ____, many of those students now arrive at class on time and stay for the full school day. (10) Arriaga mentions that the poles were painted bright blue so that pilots could see them. (11) These details suggest that the real value of the nets is not only the water itself but also the time it gives back to families.

(12) In the end, fog is very interesting.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should replace sentence 2 so that the draft states a clear claim that its evidence supports?`,
          choices: [
            ok(`Arriaga shows that fog nets gave Las Brisas a reliable source of water and gave families back valuable time.`),
            no(`Arriaga's article is about a village called Las Brisas and the fog that rolls in each morning.`, 'topic-not-claim'),
            no(`Every dry village in the world should build fog nets on its hills before next year.`, 'opinion-not-analysis'),
            no(`Fog usually forms when warm, damp air passes over cooler ground or cooler water.`, 'off-topic-fact'),
          ],
          solution: `The rest of the draft gives evidence about the water collected and the time saved, so the claim should name both. The choice about Las Brisas and the fog only names a topic and does not make a point the evidence can prove.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not support the writer's analysis?`,
          choices: [
            ok(`Sentence 10, because the color of the poles has nothing to do with the water supply or the time saved.`),
            no(`Sentence 8, because it describes life before the nets instead of after them.`, 'removes-key-evidence'),
            no(`Sentence 5, because numbers are too hard for readers to understand.`, 'removes-key-evidence'),
            no(`Sentence 11, because it explains the evidence instead of quoting the article.`, 'removes-analysis'),
          ],
          solution: `Sentence 10 is a true detail from the article, but the paint color does not support any point about water or time. Sentence 8 should stay because the two hours of carrying water is what makes the time saved meaningful.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 9?`,
          choices: [
            ok(`Because water now comes from the ridge`),
            no(`In contrast to the nets`, 'false-contrast'),
            no(`Long before the nets were built`, 'wrong-time-relationship'),
            no(`Even though the nets collect water`, 'reversed-logic'),
          ],
          solution: `Sentence 9 describes a result of the nets: students no longer have to haul water, so they get to school on time. "Long before the nets were built" places the change in the wrong time, since the improvement came after the nets.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which revision of sentence 12 would best conclude the draft?`,
          choices: [
            ok(`Arriaga's article shows that fog nets turned morning fog into thousands of liters of water and gave students hours of their day back.`),
            no(`Arriaga explains that tiny droplets cling to the mesh and run down into a gutter that feeds a tank.`, 'evidence-without-analysis'),
            no(`Fog nets will completely end water problems in every village on every continent.`, 'overgeneralization'),
            no(`Fog is also important because it keeps many coastal forests cool and damp.`, 'off-topic-detail'),
          ],
          solution: `A strong conclusion restates the claim and ties together the two kinds of evidence, the water collected and the time saved. The choice about ending water problems everywhere goes far beyond one village's experience.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to add one more detail from Arriaga's article to support sentence 11. Which detail would be most relevant?`,
          choices: [
            ok(`Parents who once walked to the stream now use those morning hours to tend vegetable plots and run small shops.`),
            no(`The mesh used in the nets is woven from a material similar to the kind used in fishing nets.`, 'irrelevant-detail'),
            no(`The ridge where the nets stand is about six hundred meters above the level of the sea.`, 'irrelevant-detail'),
            no(`Scientists in other countries hope to test larger fog nets on their own hillsides someday.`, 'off-point-evidence'),
          ],
          solution: `Sentence 11 claims the nets give time back to families, and parents using freed hours for gardens and shops shows exactly that. The other countries detail is about future research, not about time saved in Las Brisas.`,
        },
      ],
    },
    {
      code: 'wg9-writing-with-evidence-p02',
      title: 'Draft: A Library on Rails',
      body: `(1) Historian Ines Kowalczyk's article "The Reading Car" tells the story of a railroad car that worked as a traveling library in the farm towns of the Calder Valley from 1921 to 1934. (2) Kowalczyk shows that the reading car did more than lend books, because it connected isolated towns to the wider world. (3) Kowalczyk explains that most of the valley's towns had no library, and the nearest bookstore was a full day's ride away. (4) ____ (5) This detail shows how eager families were for reading material that their own towns could not provide.

(6) The car also brought news and ideas. (7) Kowalczyk notes that the librarian, a former teacher named Ruth Okonkwo, pinned newspapers from three different cities to a board inside the car. (8) Farmers who came in for seed catalogs often stayed to read about new inventions and events in distant places. (9) The railroad company later replaced its wooden cars with steel ones. (10) Kowalczyk adds that several towns started their own reading clubs after the car's visits, and two of them eventually built permanent libraries. (11) ____, the reading car left behind something that lasted longer than any single visit.

(12) Overall, Kowalczyk's article shows that the reading car opened a door to the world for valley families, and that its effects lasted long after its final trip.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence would best fill the blank in sentence 4 by giving evidence for the idea in sentence 5?`,
          choices: [
            ok(`According to Kowalczyk, when the car stopped in Pell Creek, more than two hundred people lined up before it opened.`),
            no(`The reading car was painted dark green and had gold letters along each of its sides.`, 'irrelevant-detail'),
            no(`Railroads in the 1920s carried farm goods such as wheat and cattle to cities in the east.`, 'general-fact-not-text'),
            no(`Many people today still enjoy reading library books while they ride on trains.`, 'off-topic-detail'),
          ],
          solution: `Sentence 5 says families were eager for reading material, and a line of two hundred people waiting for the car proves that eagerness. The paint color is from the article but says nothing about how people felt about the books.`,
        },
        {
          slot: 7,
          difficulty: 'medium',
          stem: `Which sentence should be removed from the second paragraph, and why?`,
          choices: [
            ok(`Sentence 9, because the type of railroad car does not show how the car brought news or ideas.`),
            no(`Sentence 7, because the librarian's name is not important to the writer's analysis.`, 'removes-key-evidence'),
            no(`Sentence 10, because it describes events that happened after the car left town.`, 'removes-key-evidence'),
            no(`Sentence 8, because farmers are not the main subject of Kowalczyk's article.`, 'removes-key-evidence'),
          ],
          solution: `Sentence 9 is a fact about the railroad, but it does not support the point that the car spread news and ideas. Sentence 10 should stay because the new reading clubs and libraries are the strongest proof of the car's lasting effect.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which word or phrase best fills the blank at the start of sentence 11?`,
          choices: [
            ok(`In this way`),
            no(`For example`, 'example-instead-of-summary'),
            no(`However`, 'false-contrast'),
            no(`At first`, 'wrong-time-relationship'),
          ],
          solution: `Sentence 11 sums up what sentence 10 shows, that the clubs and libraries outlasted the visits, so "In this way" fits. "However" signals a contrast, but sentence 11 agrees with sentence 10.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 8, would best explain how the evidence in sentences 7 and 8 supports the point in sentence 6?`,
          choices: [
            ok(`These farmers show that the car gave people a view of the world beyond their own fields, not only the books they came for.`),
            no(`Seed catalogs were popular because farmers needed to order supplies for planting each spring.`, 'off-topic-detail'),
            no(`Ruth Okonkwo had taught school for many years before becoming a librarian.`, 'irrelevant-detail'),
            no(`Every farmer in the valley read every newspaper on the board during every single visit.`, 'overgeneralization'),
          ],
          solution: `The best explanation connects the farmers reading city newspapers to the claim that the car brought news and ideas. The choice about every farmer reading every newspaper claims far more than Kowalczyk's evidence shows.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `A classmate says the claim in sentence 2 is not supported because the draft only lists facts about a train. Which response best defends the draft?`,
          choices: [
            ok(`Sentences 3 through 5 show how cut off the towns were, and sentences 7 through 10 show the car bringing outside news and inspiring new libraries.`),
            no(`The claim does not need support, because historians like Kowalczyk are always correct about the past.`, 'appeal-to-authority'),
            no(`Sentence 1 gives the dates 1921 to 1934, which proves that the reading car was important.`, 'weak-evidence'),
            no(`Sentence 12 repeats the claim, and repeating a claim is enough to prove that it is true.`, 'repetition-as-proof'),
          ],
          solution: `The claim says the car connected isolated towns to the world, and the draft shows both the isolation and the connection with specific evidence. The dates in sentence 1 only tell when the car ran, not what it accomplished.`,
        },
      ],
    },
    {
      code: 'wg9-writing-with-evidence-p03',
      title: 'Draft: Warming Up the Right Way',
      body: `(1) In "Move Before You Move," sports scientist Keiko Brandt describes a study of how warm-up routines affect young soccer players. (2) Brandt's team followed sixty high school players for one season and split them into two groups. (3) One group warmed up by holding still stretches, such as reaching for their toes for thirty seconds. (4) The other group used moving exercises like high knees, side shuffles and short sprints. (5) At the end of the season, players in the moving group sprinted an average of four percent faster and missed fewer practices because of sore or strained muscles. (6) ____

(7) Brandt also explains why moving warm-ups may work better. (8) Brandt writes that these exercises raise body temperature and heart rate, which prepares muscles for the quick starts and stops that soccer requires. (9) Still stretches, Brandt notes, relax the muscles instead of waking them up. (10) Soccer is the most widely played sport in the world. (11) ____, a warm-up that copies the motions of the game seems to prepare players more completely than one that keeps them standing still.

(12) In conclusion, Brandt's study suggests that coaches should replace still stretches with moving exercises before games and practices.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not help the writer analyze Brandt's study?`,
          choices: [
            ok(`Sentence 10`),
            no(`Sentence 8`, 'removes-key-evidence'),
            no(`Sentence 4`, 'removes-key-evidence'),
            no(`Sentence 9`, 'removes-key-evidence'),
          ],
          solution: `Sentence 10 is a general fact about soccer's popularity and says nothing about warm-ups. Sentence 9 should stay because it explains why still stretches are less helpful, which supports the comparison.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which phrase best fills the blank at the start of sentence 11?`,
          choices: [
            ok(`For this reason`),
            no(`On the other hand`, 'false-contrast'),
            no(`Before the season began`, 'wrong-time-relationship'),
            no(`In spite of this`, 'reversed-logic'),
          ],
          solution: `Sentence 11 draws a conclusion from Brandt's explanation in sentences 8 and 9, so "For this reason" fits. "On the other hand" signals a contrast, but sentence 11 follows from the point before it.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which sentence would best fill the blank in sentence 6 by explaining what the evidence in sentence 5 shows?`,
          choices: [
            ok(`These results suggest that moving warm-ups helped players both perform better and stay healthier during the season.`),
            no(`High knees are an exercise in which players lift each knee toward the chest while jogging.`, 'definition-not-analysis'),
            no(`These results prove that still stretches cause almost every soccer injury that players suffer.`, 'overstatement'),
            no(`The season lasted several months, and the players practiced four times every week.`, 'new-detail-without-analysis'),
          ],
          solution: `Sentence 5 gives two results, faster sprints and fewer missed practices, and the correct choice explains what both mean. The choice about still stretches causing almost every injury goes far beyond what the study measured.`,
        },
        {
          slot: 14,
          difficulty: 'hard',
          stem: `The draft never states its main claim. Which sentence, added after sentence 1, would best state a claim the evidence supports?`,
          choices: [
            ok(`Brandt's findings show that moving warm-ups prepare players' bodies for soccer better than still stretches do.`),
            no(`Brandt's study proves that still stretches are dangerous and should be banned in every sport.`, 'overstatement'),
            no(`Many soccer teams warm up before games, and some teams warm up longer than others do.`, 'topic-not-claim'),
            no(`Warming up is boring, so young players should be allowed to skip it before practice.`, 'unsupported-opinion'),
          ],
          solution: `The draft compares two warm-ups and shows the moving one led to faster sprints and fewer missed practices, so the claim should say that. The choice about banning stretches in every sport claims far more than a study of sixty soccer players can prove.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `A reader points out that Brandt studied only sixty players for one season. Which revision of sentence 12 best accounts for this limit while keeping the writer's claim?`,
          choices: [
            ok(`Although Brandt studied only sixty players for one season, the results give coaches a strong reason to try moving warm-ups.`),
            no(`Because Brandt's study was so small, its results are useless, and coaches should ignore them completely.`, 'dismisses-evidence'),
            no(`Brandt's study proves that every athlete in every sport must stop using still stretches forever.`, 'overgeneralization'),
            no(`Brandt's team followed sixty high school soccer players and split them into two equal groups.`, 'evidence-without-conclusion'),
          ],
          solution: `The correct revision admits the study's size but still draws a reasonable conclusion from its results. Calling the results useless throws away real evidence instead of weighing it.`,
        },
      ],
    },
    {
      code: 'wg9-writing-with-evidence-p04',
      title: 'Draft: Learning to Share the Spotlight',
      body: `(1) In Nadia Ferreira's short story "Second Chair," a boy named Mateo who plays trumpet learns that being a good musician means more than being the best one in the room. (2) At the start of the story, Mateo has played first chair in his school band for two years. (3) When a new girl named Priya wins the first chair audition, Mateo "stared at the list until the letters blurred." (4) ____ (5) For the next week, he refuses to look at Priya during rehearsals and practices his solo loudly in the hallway so that everyone can hear.

(6) Mateo begins to change when the band prepares for the spring concert. (7) During one rehearsal, Priya misses her entrance in a difficult passage, and the whole band stops. (8) Instead of smiling, Mateo quietly plays the first two notes of her part so she can find her place. (9) Later, he stays after school to help her practice the hardest measures. (10) The story is set in a small town that hosts a music festival every summer. (11) By the end, Mateo stands beside Priya at the concert, and Ferreira writes that "the two trumpets sounded like one."

(12) ____`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence would best fill the blank in sentence 4 by explaining the quotation in sentence 3?`,
          choices: [
            ok(`This image shows how shocked and hurt Mateo feels when he loses the position he has worked for.`),
            no(`This shows that Mateo needs new glasses because he cannot read small letters well.`, 'literal-reading'),
            no(`This shows that Mateo is happy for Priya and proud of how well she played.`, 'contradicts-text'),
            no(`This shows that the band director posted the audition results on a list.`, 'summary-not-analysis'),
          ],
          solution: `Staring until the letters blur suggests Mateo is stunned and upset, which the next sentence about ignoring Priya confirms. Reading the blur as an eyesight problem takes the image literally and misses the feeling it shows.`,
        },
        {
          slot: 17,
          difficulty: 'medium',
          stem: `Which sentence should be removed because it does not support the writer's analysis of Mateo?`,
          choices: [
            ok(`Sentence 10, because the town's festival does not show anything about how Mateo changes.`),
            no(`Sentence 7, because it focuses on Priya's mistake instead of on Mateo.`, 'removes-key-evidence'),
            no(`Sentence 2, because it happens before the main events of the story begin.`, 'removes-key-evidence'),
            no(`Sentence 11, because quotations should not appear near the end of a draft.`, 'removes-key-evidence'),
          ],
          solution: `Sentence 10 describes the setting but gives no evidence about Mateo's growth. Sentence 7 should stay because Priya's mistake creates the moment when Mateo chooses to help her.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which sentence would best fill the blank in sentence 12 to conclude the draft?`,
          choices: [
            ok(`Mateo's journey from jealousy to support shows that a musician's real strength is helping the whole group sound its best.`),
            no(`Priya wins the first chair audition, and Mateo practices his solo loudly in the hallway for a week.`, 'summary-not-analysis'),
            no(`Every student who loses an audition will always become kinder by the end of the school year.`, 'overgeneralization'),
            no(`Trumpets are brass instruments that need careful breathing and strong lips to play well.`, 'off-topic-fact'),
          ],
          solution: `The conclusion should return to the claim in sentence 1 and name the change the evidence shows, from jealousy to support. Retelling the audition and hallway practice only repeats early events without stating what they mean.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `The writer wants to add a quotation from the story after sentence 8. Which quotation would best support the idea that Mateo has started to change?`,
          choices: [
            ok(`"He told himself the concert mattered more than the chair."`),
            no(`"The band room smelled of valve oil and old sheet music."`, 'irrelevant-detail'),
            no(`"Mateo had bought his first trumpet with money from mowing lawns."`, 'irrelevant-backstory'),
            no(`"Priya's family had moved from a city three hours away."`, 'focus-on-wrong-character'),
          ],
          solution: `This quotation shows Mateo putting the group's success ahead of his own position, which is the change the paragraph describes. The quotation about buying his trumpet is about Mateo, but it tells about his past, not his growth.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Which statement best explains why sentence 5 strengthens the writer's analysis?`,
          choices: [
            ok(`It gives specific actions that show Mateo's jealousy, which sets up a clear contrast with his later kindness.`),
            no(`It proves that Mateo is a better trumpet player than Priya and should have won the audition.`, 'unsupported-inference'),
            no(`It explains the rules for how first chair auditions work in most school bands.`, 'misreads-purpose'),
            no(`It shows that the story's main conflict is between Mateo and the band director.`, 'misidentifies-conflict'),
          ],
          solution: `A character's change is easiest to see when the draft shows both the before and the after, and sentence 5 gives the before. Nothing in the draft suggests Mateo is the better player, so that choice is an unsupported inference.`,
        },
      ],
    },
    {
      code: 'wg9-writing-with-evidence-p05',
      title: 'Draft: Reading While Watching',
      body: `(1) In the article "Words on the Screen," education researcher Samuel Adeyemi reports on a study of students learning a new language through short videos. (2) Videos are a common part of many classes today. (3) Adeyemi's team showed the same ten Spanish cartoons to 120 ninth graders, but only half of the students saw Spanish captions at the bottom of the screen. (4) After each video, every student took a short quiz on new vocabulary words. (5) The students who watched with captions scored an average of 18 percent higher on the quizzes. (6) ____, they remembered more of the words when they were tested again a month later.

(7) Adeyemi suggests a reason for these results. (8) Adeyemi explains that captions let students see and hear a word at the same time, which gives the brain two ways to remember it. (9) Some students in the study said the captions also helped them follow fast speakers. (10) My cousin always watches movies with the captions turned on. (11) This shows that captions are not a distraction but a tool that helps learners connect sounds with written words.

(12) ____`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence should replace sentence 2 so that the draft states a clear claim about Adeyemi's study?`,
          choices: [
            ok(`Adeyemi's study shows that captions help language learners learn and remember new words.`),
            no(`Adeyemi's article is about students, cartoons and a language called Spanish.`, 'topic-not-claim'),
            no(`Teachers should show cartoons in every class because students enjoy them.`, 'unsupported-opinion'),
            no(`Spanish is spoken by many millions of people in countries around the world.`, 'off-topic-fact'),
          ],
          solution: `The evidence in the draft is about captions improving quiz scores and memory, so the claim should say that. The choice listing students, cartoons and Spanish only names a topic and makes no point.`,
        },
        {
          slot: 22,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it is not evidence from Adeyemi's article?`,
          choices: [
            ok(`Sentence 10`),
            no(`Sentence 9`, 'removes-key-evidence'),
            no(`Sentence 4`, 'removes-key-evidence'),
            no(`Sentence 8`, 'removes-key-evidence'),
          ],
          solution: `Sentence 10 is a personal story about the writer's cousin, not evidence from the text being analyzed. Sentence 9 should stay because it reports what students in Adeyemi's study said.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which word or phrase best fills the blank at the start of sentence 6?`,
          choices: [
            ok(`In addition`),
            no(`Instead`, 'false-contrast'),
            no(`As a result of forgetting`, 'confuses-cause-effect'),
            no(`Earlier in the study`, 'wrong-time-relationship'),
          ],
          solution: `Sentence 6 adds a second finding that points the same way as sentence 5, so "In addition" fits. "Instead" signals that the second result replaces the first, but both results are true together.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `Which sentence would best fill the blank in sentence 12 to conclude the draft?`,
          choices: [
            ok(`Adeyemi's findings show that captions lead to higher quiz scores and longer memory, so they deserve a place in language classes.`),
            no(`Adeyemi's team showed ten Spanish cartoons to 120 ninth graders in the study.`, 'evidence-without-analysis'),
            no(`Captions are the only thing any student will ever need to learn a new language.`, 'overgeneralization'),
            no(`Cartoons have been popular with young viewers for a very long time.`, 'off-topic-detail'),
          ],
          solution: `A strong conclusion restates the claim and connects it to the key results. The choice about captions being the only thing students need goes far beyond a study of vocabulary quizzes.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `A peer reviewer says that sentence 9 is weaker evidence than sentence 5. Which explanation best supports this comment?`,
          choices: [
            ok(`Sentence 9 reports what some students said they felt, while sentence 5 reports measured quiz scores for every student.`),
            no(`Sentence 9 is about a different language from the one studied in sentence 5.`, 'misreads-text'),
            no(`Sentence 9 appears later in the draft, so it must be less important than sentence 5.`, 'position-equals-importance'),
            no(`Sentence 9 disagrees with Adeyemi's main finding about how captions help students.`, 'false-contradiction'),
          ],
          solution: `Measured results for all 120 students are stronger evidence than the opinions of some students. Sentence 9 does not disagree with the main finding; it supports it, just less strongly.`,
        },
      ],
    },
    {
      code: 'wg9-writing-with-evidence-p06',
      title: 'Draft: Letters Across the Years',
      body: `(1) Journalist Hana Lindqvist's article "Dear Friend" describes a program at Ridgeview High School that pairs forty ninth graders with residents of a nearby senior center as pen pals. (2) Lindqvist's reporting shows that the letters benefit both generations, not just the older adults. (3) Each student writes one handwritten letter a month and receives a reply within about two weeks. (4) According to the center's activities director, residents who join the program are more likely to attend group events and to talk about their pen pals with staff. (5) ____ (6) Lindqvist also quotes a ninth grader who says that writing letters "made me slow down and actually think about what I wanted to say."

(7) Some readers might argue that letters are old-fashioned when video calls are so easy. (8) ____ (9) Lindqvist notes that several residents have trouble hearing on calls but can reread a letter as many times as they like. (10) Handwriting also takes time, which shows the reader that the writer cared enough to make the effort. (11) Ridgeview High School was built in 1962 and has a large football stadium.

(12) Overall, Lindqvist's article shows that a simple letter can build real friendships across generations.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not support the writer's claim?`,
          choices: [
            ok(`Sentence 11, because the age of the school and its stadium say nothing about the letters.`),
            no(`Sentence 3, because it explains how the program works instead of giving results.`, 'removes-key-evidence'),
            no(`Sentence 6, because a quotation from one student cannot be used as evidence.`, 'removes-key-evidence'),
            no(`Sentence 9, because it is about the residents instead of the students.`, 'removes-key-evidence'),
          ],
          solution: `Sentence 11 is a fact about the school building with no connection to the pen pal program. Sentence 9 should stay because it supports the writer's answer to the video call argument.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which sentence would best fill the blank in sentence 5 by supporting the claim that the students benefit too?`,
          choices: [
            ok(`Lindqvist reports that the students' English teacher saw their essays grow longer and more detailed during the program.`),
            no(`Residents at the center also enjoy weekly music nights and craft afternoons in the main hall.`, 'irrelevant-detail'),
            no(`Many teenagers today send dozens of text messages to their friends every single day.`, 'general-fact-not-text'),
            no(`Lindqvist believes every school in the country should start a pen pal program right away.`, 'opinion-not-evidence'),
          ],
          solution: `Sentence 4 covers the residents, so sentence 5 needs evidence that students gain something, and better essays show that. The music nights detail is about the center, not about the students or the letters.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which sentence would best fill the blank in sentence 8 to respond to the argument in sentence 7?`,
          choices: [
            ok(`However, Lindqvist's article suggests that letters offer some advantages that calls cannot.`),
            no(`This is true, so the program should probably switch to video calls next year.`, 'concedes-claim'),
            no(`Video calls were invented many years after people first began writing letters.`, 'irrelevant-history'),
            no(`People who disagree with pen pal programs simply do not understand them.`, 'dismisses-counterclaim'),
          ],
          solution: `The correct choice answers the objection and leads into the evidence in sentences 9 and 10. The choice that says people simply do not understand dismisses the argument instead of answering it with evidence.`,
        },
        {
          slot: 29,
          difficulty: 'hard',
          stem: `Sentence 10 is different from sentences 4, 6 and 9 because it:`,
          choices: [
            ok(`gives the writer's own reasoning instead of reporting a detail from Lindqvist's article.`),
            no(`quotes a resident of the senior center directly instead of a student.`, 'misreads-text'),
            no(`argues against the writer's claim that letters benefit both generations.`, 'false-contradiction'),
            no(`gives numbers and data instead of describing people's experiences.`, 'misreads-text'),
          ],
          solution: `Sentences 4, 6 and 9 each credit Lindqvist or a person Lindqvist interviewed, while sentence 10 is the writer's own explanation. Sentence 10 does not argue against the claim; it adds a reason that supports it.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which revision of sentence 12 best ties the conclusion to the evidence in the draft?`,
          choices: [
            ok(`Overall, Lindqvist shows that monthly letters draw residents into center life and make students more careful writers.`),
            no(`Overall, pen pals are the most important program that any school could ever offer to students.`, 'overstatement'),
            no(`Overall, students write one letter a month and get a reply in about two weeks.`, 'summary-of-procedure'),
            no(`Overall, Lindqvist's article proves that video calls should not be allowed at senior centers.`, 'unsupported-extension'),
          ],
          solution: `The best conclusion names the benefit for each group that the draft actually proved. The choice about banning video calls goes beyond the article, which only shows that letters have some advantages.`,
        },
      ],
    },
    {
      code: 'wg9-writing-with-evidence-p07',
      title: 'Draft: Pencils in the Gallery',
      body: `(1) In "Look Longer," museum educator Rafael Tanaka writes about a change at the Harborview Art Museum, which began handing out free sketchbooks and pencils at its entrance. (2) Tanaka argues that sketching helps visitors notice far more than they would by simply walking past the art. (3) Tanaka explains that museum staff timed visitors in front of a large painting of a harbor at sunset. (4) Visitors without sketchbooks looked at the painting for an average of nineteen seconds. (5) Visitors who sketched it stayed for an average of eleven minutes. (6) ____

(7) Tanaka also describes what the sketchers noticed. (8) In short interviews after their visits, sketchers mentioned details such as a small dog on the dock and the way the light changed color across the water. (9) Most visitors who did not sketch could describe only the sunset itself. (10) The museum's gift shop sells postcards of the painting for two dollars each. (11) ____, the act of drawing seems to turn a quick glance into careful study.

(12) In conclusion, I think museums are fun places to visit on weekends.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which phrase best fills the blank at the start of sentence 11?`,
          choices: [
            ok(`In other words`),
            no(`For instance`, 'example-instead-of-summary'),
            no(`Unlike sketching`, 'false-contrast'),
            no(`Before the change`, 'wrong-time-relationship'),
          ],
          solution: `Sentence 11 restates what the interviews mean in a broader way, so "In other words" fits. "For instance" would introduce a new example, but sentence 11 sums up the examples already given.`,
        },
        {
          slot: 32,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not support the writer's analysis?`,
          choices: [
            ok(`Sentence 10`),
            no(`Sentence 9`, 'removes-key-evidence'),
            no(`Sentence 4`, 'removes-key-evidence'),
            no(`Sentence 3`, 'removes-key-evidence'),
          ],
          solution: `The price of postcards has nothing to do with how sketching affects what visitors notice. Sentence 9 should stay because it gives the comparison that makes the sketchers' details stand out.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which sentence would best fill the blank in sentence 6 by explaining what the evidence in sentences 4 and 5 shows?`,
          choices: [
            ok(`This large difference suggests that sketching slows visitors down and leads them to study the painting closely.`),
            no(`Eleven minutes is equal to six hundred sixty seconds, which is a long time to stand still.`, 'math-not-analysis'),
            no(`This proves that people who cannot draw well should not visit art museums at all.`, 'unsupported-inference'),
            no(`The painting of the harbor hangs in the largest room on the museum's second floor.`, 'new-detail-without-analysis'),
          ],
          solution: `The correct choice explains what the jump from nineteen seconds to eleven minutes means for the claim about noticing more. Converting minutes to seconds is accurate, but it only restates the number without explaining its importance.`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `Which revision of sentence 12 would best conclude the draft?`,
          choices: [
            ok(`Tanaka's evidence shows that sketching keeps visitors looking much longer and helps them notice details others miss.`),
            no(`Tanaka writes about the Harborview Art Museum and its free sketchbooks and pencils.`, 'topic-not-claim'),
            no(`Every museum in the world should require all visitors to sketch every painting they see.`, 'overgeneralization'),
            no(`Painting a sunset is difficult because the colors in the sky change so quickly.`, 'off-topic-detail'),
          ],
          solution: `The conclusion should restate the claim using both kinds of evidence, the longer viewing time and the details noticed. Requiring every visitor to sketch every painting is far beyond what Tanaka's study supports.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `The writer wants to add one more piece of evidence from Tanaka's article to support the claim in sentence 2. Which detail would be most relevant?`,
          choices: [
            ok(`When shown a photo of the painting later, sketchers could point out about nine details, and non-sketchers about two.`),
            no(`The museum gave away more than three thousand sketchbooks during the first year of the program.`, 'popularity-not-evidence'),
            no(`As a child, Tanaka first learned to draw at a grandmother's kitchen table.`, 'irrelevant-anecdote'),
            no(`A few visitors said the museum's pencils were too short and hard to hold.`, 'off-point-detail'),
          ],
          solution: `Sentence 2 claims sketchers notice far more, and a direct count of details remembered measures exactly that. The number of sketchbooks given away shows the program was popular, not that it helped people notice more.`,
        },
      ],
    },
    {
      code: 'wg9-writing-with-evidence-p08',
      title: 'Draft: The Share Table',
      body: `(1) Environmental reporter Leila Haddad's article "Saved from the Trash" examines a share table in the cafeteria at Westbrook High School. (2) Haddad's evidence suggests that a simple table can cut food waste and help students who are still hungry. (3) A share table is a spot where students leave unopened food they do not want, such as a sealed yogurt or a whole apple, so that others can take it. (4) ____ (5) Haddad adds that the custodial staff now empties one fewer trash bin after each lunch period, since far fewer sealed snacks and pieces of fruit end up thrown away.

(6) The table also helps students directly. (7) Haddad interviewed a cafeteria worker who noticed that athletes with late practices often pick up extra fruit before leaving. (8) Some students who skip breakfast also stop by the table for a second item at lunch. (9) Students like the share table a lot. (10) Apples are one of the most common fruits grown in the country. (11) Haddad does point out one challenge: staff must check the table each day to make sure nothing spoils.

(12) ____`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence would best fill the blank in sentence 4 by giving evidence that the table cuts food waste?`,
          choices: [
            ok(`Haddad reports that in two months, students left more than 1,500 items on the table, and nearly all were taken.`),
            no(`The cafeteria at Westbrook High School has long tables and seats about three hundred students.`, 'irrelevant-detail'),
            no(`Yogurt is a good source of protein, and apples are a good source of fiber.`, 'off-topic-fact'),
            no(`Haddad thinks that the share table is a very clever and creative idea.`, 'opinion-not-evidence'),
          ],
          solution: `Fifteen hundred items taken by other students instead of thrown away is direct evidence of less waste. Haddad's opinion that the idea is clever does not show any food was actually saved.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which sentence should be removed from the second paragraph, and why?`,
          choices: [
            ok(`Sentence 10, because a fact about apple farming does not support any point about the share table.`),
            no(`Sentence 11, because a draft should never mention a problem with the thing it describes.`, 'removes-balance'),
            no(`Sentence 7, because the cafeteria worker is not a student at the school.`, 'removes-key-evidence'),
            no(`Sentence 8, because students who skip breakfast are not mentioned in the claim.`, 'removes-key-evidence'),
          ],
          solution: `Sentence 10 is a general fact unrelated to waste or hungry students. Sentence 11 should stay, because mentioning a challenge from the article makes the analysis more honest and balanced.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `What is the main purpose of sentence 11 in the draft?`,
          choices: [
            ok(`It notes a limitation that Haddad reports, which makes the writer's analysis more balanced.`),
            no(`It proves that the share table does not work and should be removed from the cafeteria.`, 'overstates-limitation'),
            no(`It introduces a new main claim that the rest of the draft goes on to support.`, 'misreads-structure'),
            no(`It gives the main evidence that students at Westbrook waste less food.`, 'misidentifies-support'),
          ],
          solution: `Sentence 11 admits that the table takes daily work, which shows the writer is weighing the evidence fairly. It does not say the table fails, so the choice about removing it overstates the problem.`,
        },
        {
          slot: 39,
          difficulty: 'medium',
          stem: `Which sentence would best fill the blank in sentence 12 to conclude the draft?`,
          choices: [
            ok(`Overall, Haddad shows that the share table keeps good food out of the trash and feeds hungry students, though it needs daily care.`),
            no(`Overall, a share table is a spot where students leave sealed food they do not want to eat.`, 'definition-not-conclusion'),
            no(`Overall, share tables will end hunger and food waste in every school in the country.`, 'overgeneralization'),
            no(`Overall, cafeterias should serve smaller portions so that students throw away less food.`, 'unsupported-extension'),
          ],
          solution: `The best conclusion restates both parts of the claim and keeps the limit from sentence 11. The choice about ending hunger and waste everywhere claims far more than one school's share table can show.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Sentence 9 does not explain the evidence well. Which revision best explains how sentences 7 and 8 support the point in sentence 6?`,
          choices: [
            ok(`These examples show that the table quietly fills real gaps, giving students extra food when they need it most.`),
            no(`Everyone at Westbrook High School would go hungry every day without the share table.`, 'overgeneralization'),
            no(`Athletes at Westbrook usually practice for about two hours after the last class ends.`, 'new-detail-without-analysis'),
            no(`The cafeteria worker Haddad interviewed has worked at the school for many years.`, 'irrelevant-detail'),
          ],
          solution: `The correct revision links the athletes and breakfast skippers to the point that the table helps students directly. Saying everyone would go hungry exaggerates evidence about only some students.`,
        },
      ],
    },
  ],
}

export default skill
