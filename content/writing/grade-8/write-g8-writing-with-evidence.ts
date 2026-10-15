import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g8-writing-with-evidence',
  subject: 'writing',
  grade: 8,
  group: 'Composition',
  name: 'Writing About Texts with Evidence',
  standards: ['W.8.9'],
  passages: [
    {
      code: 'wg8-writing-with-evidence-p01',
      title: 'Draft: Why the Otters Returned',
      body: `(1) In the article "Otters Come Home," Lena Marsh describes how river otters returned to the Alder River after forty years away. (2) Otters are some of the most playful animals anyone could hope to see. (3) Marsh explains that a paper mill once poured waste into the river, and the small fish that otters eat almost vanished. (4) After the town passed new water rules in 2009, the fish slowly began to return. (5) Marsh reports that "by 2018, volunteers counted otter tracks along six miles of riverbank." (6) This timeline shows that the otters came back only after their food supply recovered.

(7) ____, Marsh describes how students from Alder Middle School planted willow trees along the banks. (8) The roots held the soil in place, so less mud washed into the water. (9) Marsh adds that otters later dug dens among those same roots. (10) This detail shows that people helped the otters by repairing their habitat, not just by cleaning the water.

(11) The otters are back, and the river is a nice place to visit now.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `The writer wants to add a claim right after sentence 1. Which sentence best states a claim the rest of the draft supports?`,
          choices: [
            ok(`Marsh shows that the otters returned because people repaired the river they depend on.`),
            no(`River otters can hold their breath underwater for several minutes at a time.`, 'off-topic-fact'),
            no(`The article is about some otters and a river in a small town.`, 'topic-not-claim'),
            no(`Everyone should take a trip to see the otters on the Alder River.`, 'opinion-not-analysis'),
          ],
          solution: `Sentences 3 through 10 all show how cleaner water and new trees brought the otters back, so the claim about people repairing the river fits. "The article is about some otters" only names the topic and makes no point the evidence could prove.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Why should the writer remove sentence 2?`,
          choices: [
            ok(`It shares a general opinion about otters instead of analyzing evidence from the article.`),
            no(`It states the main claim, so it belongs at the very end of the draft.`, 'misidentifies-claim'),
            no(`It contains a quotation from the article that the writer never explains.`, 'misidentifies-problem'),
            no(`It repeats the information about the paper mill given in sentence 3.`, 'misreads-repetition'),
          ],
          solution: `Sentence 2 is the writer's own opinion about otters and does not help explain why they returned. It contains no quotation and says nothing about the paper mill.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 7?`,
          choices: [
            ok(`Beyond cleaning the water`),
            no(`As a result of the otter tracks`, 'confuses-cause-effect'),
            no(`Instead of planting trees`, 'false-contrast'),
            no(`In conclusion`, 'premature-conclusion'),
          ],
          solution: `Paragraph 2 adds a second way people helped, so "Beyond cleaning the water" links it to paragraph 1. The planting did not happen because of the otter tracks, so "As a result of the otter tracks" gets the cause and effect backward.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Marsh's article shows that the otters returned because the town cleaned the water and rebuilt the banks, giving them food and shelter.`),
            no(`The otters are back now, and everyone in the town is very happy about it.`, 'unsupported-inference'),
            no(`River otters can be found in many rivers and lakes across the whole country.`, 'off-topic-fact'),
            no(`Marsh says that volunteers counted otter tracks along six miles of riverbank.`, 'evidence-without-analysis'),
          ],
          solution: `A strong conclusion sums up the analysis from both paragraphs, and only the first choice ties clean water and new banks to food and shelter. Repeating the six miles of tracks restates one piece of evidence without explaining it.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Why does the writer place sentence 4 before the quotation in sentence 5?`,
          choices: [
            ok(`It sets up the order of events, so the reader sees that the fish returned before the otters did.`),
            no(`It proves that the students were the ones who passed the new water rules.`, 'misreads-text'),
            no(`It gives a second example of otters digging dens along the riverbank.`, 'misplaces-detail'),
            no(`It shows that Marsh disagrees with the water rules the town passed.`, 'unsupported-inference'),
          ],
          solution: `Sentence 6 explains that the timeline matters, and sentence 4 supplies the first step of that timeline (2009, fish return) before the 2018 otter count. Nothing in the draft says the students passed the rules; the students planted trees.`,
        },
      ],
    },
    {
      code: 'wg8-writing-with-evidence-p02',
      title: 'Draft: A Family Job at Gull Point',
      body: `(1) In "The Lamp Keepers of Gull Point," Marisol Ibarra writes about the families who ran a lighthouse in the 1800s. (2) Ibarra shows that keeping the light burning was a demanding job that shaped the whole family's life. (3) According to the article, the keeper had to trim the lamp's wick every four hours, even in the middle of the night. (4) Ibarra also notes that the keeper wrote the weather in a logbook. (5) Ships passing the point depended on the light to avoid the rocks. (6) Lighthouses are tall, and some have more than two hundred steps.

(7) The work did not belong to the keeper alone. (8) Ibarra explains that keeper Abel Hansen's daughter, Clara, learned to clean the lens by age ten. (9) When Abel fell ill one winter, Clara kept the lamp lit for eleven nights in a row. (10) ____.

(11) In conclusion, the lighthouse was important.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not support the claim in sentence 2?`,
          choices: [
            ok(`sentence 6`),
            no(`sentence 3`, 'removes-relevant-evidence'),
            no(`sentence 8`, 'removes-relevant-evidence'),
            no(`sentence 9`, 'removes-relevant-evidence'),
          ],
          solution: `Sentence 6 is a general fact about lighthouse height and says nothing about the keeper's demanding job. Sentence 3, about trimming the wick at night, directly shows how demanding the work was.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which sentence would best fill blank 10 by explaining how sentences 8 and 9 support the claim?`,
          choices: [
            ok(`This shows that the job demanded so much that even a child had to be ready to take it over.`),
            no(`Clara must have been a very tired and hungry girl after those eleven nights.`, 'explanation-off-claim'),
            no(`Today most lighthouses run on their own without any family living there.`, 'outside-knowledge'),
            no(`Ibarra writes that Clara later moved away to live in a large city.`, 'new-evidence-no-analysis'),
          ],
          solution: `The claim is that the job shaped the whole family's life, and a ten-year-old keeping the lamp lit shows exactly that. Guessing that Clara was tired and hungry does not connect the evidence back to the claim.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which detail from the article would best support sentence 7 if the writer added it?`,
          choices: [
            ok(`Ibarra notes that the keeper's wife carried oil up the tower every evening.`),
            no(`Ibarra notes that the tower was painted white with one wide red stripe.`, 'irrelevant-detail'),
            no(`Ibarra notes that the Gull Point lighthouse was finished in the year 1852.`, 'irrelevant-detail'),
            no(`Ibarra notes that winter storms at the point often lasted several days.`, 'weak-link-to-claim'),
          ],
          solution: `Sentence 7 says other family members shared the work, and the wife hauling oil is a second family member doing a job. The storms detail is about weather, not about who did the work.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Ibarra's details about late-night chores and a ten-year-old keeper show that a lighthouse took the effort of an entire family.`),
            no(`In conclusion, lighthouses were built in many places along the rocky coasts of the world.`, 'off-topic-fact'),
            no(`In conclusion, I would never want to be a lighthouse keeper, because it sounds lonely.`, 'personal-opinion'),
            no(`In conclusion, Clara kept the lamp at Gull Point lit for eleven nights in a row.`, 'restates-single-detail'),
          ],
          solution: `The best conclusion pulls evidence from both paragraphs back to the claim about a demanding family job. Repeating Clara's eleven nights restates one detail and does not sum up the analysis.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `The writer wants sentence 4 to support the claim more clearly. Which revision does that best?`,
          choices: [
            ok(`Ibarra also notes that the keeper recorded the weather in a logbook every single day of the year, holidays included.`),
            no(`Ibarra also notes that the keeper's logbook was bound in thick brown leather with a brass clasp.`, 'irrelevant-detail'),
            no(`Ibarra also notes that the keeper's old logbook can be seen today in a small town museum.`, 'off-claim-detail'),
            no(`Ibarra also notes, in a very interesting part of the article, that the keeper wrote in a logbook.`, 'vague-wording'),
          ],
          solution: `Adding that the record was kept every day, holidays included, shows why the job was demanding, which is the claim in sentence 2. Calling the detail "very interesting" adds no evidence at all.`,
        },
      ],
    },
    {
      code: 'wg8-writing-with-evidence-p03',
      title: 'Draft: The Robot and the Berries',
      body: `(1) In "Robots in the Strawberry Field," Hollis Grant describes a farm that tested a picking robot for one season. (2) ____. (3) On the one hand, the robot could work through the night, and Grant reports that it picked "about the same number of berries as four workers." (4) It also never needed a break on hot afternoons. (5) On the other hand, the robot had trouble finding ripe berries hidden under leaves. (6) Grant writes that it "left nearly one berry in five on the plant." (7) My cousin has a robot vacuum that also gets stuck under furniture. (8) In the end, the farm owner, Rosa Delgado, kept her human pickers and used the robot only for night shifts.

(9) Delgado's choice shows that the article's real point is about balance. (10) The robot added speed, while people added the careful eye that the machine lacked.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which claim best fills blank 2?`,
          choices: [
            ok(`Grant presents the robot as a helpful tool that still cannot fully replace human pickers.`),
            no(`Robots will surely take over every single farm job within a few short years.`, 'overgeneralization'),
            no(`The farm in the article grows its strawberries in long, straight rows.`, 'detail-not-claim'),
            no(`Grant's article about the farm is very interesting and well written.`, 'vague-opinion'),
          ],
          solution: `The draft gives the robot's strengths, its weakness, and the owner's choice to keep people, which all support a claim about a helpful but limited tool. The claim about robots taking every farm job goes far beyond what the article shows.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Why should the writer remove sentence 7?`,
          choices: [
            ok(`It uses a personal story instead of evidence from the article.`),
            no(`It is too short to count as a complete sentence.`, 'length-not-relevance'),
            no(`It includes a quotation that the writer never explains.`, 'misidentifies-problem'),
            no(`It repeats the same evidence that appears in sentence 6.`, 'misreads-repetition'),
          ],
          solution: `A cousin's robot vacuum is not from Grant's article, so it cannot support an analysis of the article. Sentence 7 is a complete sentence and contains no quotation.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 6, best explains how that evidence supports the claim?`,
          choices: [
            ok(`Missing that many berries means the robot's speed alone was not enough to do the whole job.`),
            no(`This quotation comes from the middle section of Grant's article about the farm.`, 'cites-location-not-meaning'),
            no(`Strawberries are one of the most popular summer fruits in many places.`, 'off-topic-fact'),
            no(`This proves that robots are completely useless on any kind of farm.`, 'overstates-evidence'),
          ],
          solution: `Explaining that one berry in five was left behind shows a real limit, which connects the quotation to the claim. Calling robots "completely useless" ignores the evidence in sentence 3 that the robot picked as much as four workers.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which detail from the article would best support the point in sentence 10 that people "added the careful eye that the machine lacked"?`,
          choices: [
            ok(`Grant writes that pickers lifted leaves to find berries the robot's camera missed.`),
            no(`Grant writes that the robot cost less to run each day than a tractor.`, 'irrelevant-detail'),
            no(`Grant writes that the robot's gripping arms were made of soft plastic.`, 'irrelevant-detail'),
            no(`Grant writes that the farm sells its berries at a roadside stand.`, 'off-topic-detail'),
          ],
          solution: `Pickers finding berries the camera missed is direct evidence of the careful eye people provided. The cost of running the robot says nothing about what people could see that the machine could not.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Which statement best describes how sentence 8 works in the draft?`,
          choices: [
            ok(`It gives the outcome the writer uses in sentence 9 to argue that the article is about balance.`),
            no(`It introduces a new claim that the farm should get rid of the robot.`, 'misreads-outcome'),
            no(`It presents a counterargument that the writer then disproves.`, 'misidentifies-function'),
            no(`It is a direct quotation that shows Grant's own opinion.`, 'misidentifies-quotation'),
          ],
          solution: `Sentence 9 begins "Delgado's choice shows," so sentence 8 is the evidence the analysis builds on. The farm kept the robot for night shifts, so sentence 8 does not suggest getting rid of it.`,
        },
      ],
    },
    {
      code: 'wg8-writing-with-evidence-p04',
      title: 'Draft: The Underpass Mural',
      body: `(1) The article "Painting the Underpass" by Nadia Fofanah tells how a group of neighbors turned a gray tunnel into a bright mural. (2) Fofanah suggests that the mural changed the underpass from a place people avoided into a place they gathered. (3) Before the project, Fofanah writes, "most walkers crossed the busy road above rather than use the tunnel." (4) ____ the mural was finished, a neighborhood group began holding a small Saturday market inside the tunnel. (5) The mural uses blue, orange and green paint. (6) Fofanah also reports that the city counted three times as many walkers in the tunnel the following spring.

(7) The people who painted it also changed. (8) Fofanah describes retired teacher Hamid Saleh, who had never met most of his neighbors before he picked up a brush. (9) By the end, he knew forty of them by name. (10) This shows that the project built friendships as well as a mural.

(11) Overall, the article shows that art can make a neighborhood better.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which word best fills the blank at the start of sentence 4?`,
          choices: [
            ok(`After`),
            no(`Although`, 'contrast-signal'),
            no(`Unless`, 'condition-signal'),
            no(`Because`, 'cause-signal'),
          ],
          solution: `Sentence 4 tells what happened next in time, once the mural was done, so "After" fits. "Because" claims the finished mural caused the market, which the article does not state.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which sentence is least connected to the claim in sentence 2?`,
          choices: [
            ok(`sentence 5`),
            no(`sentence 3`, 'removes-relevant-evidence'),
            no(`sentence 4`, 'removes-relevant-evidence'),
            no(`sentence 6`, 'removes-relevant-evidence'),
          ],
          solution: `Sentence 5 only lists paint colors and says nothing about whether people avoided or used the tunnel. Sentence 6, about three times as many walkers, is strong evidence for the claim.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `The writer wants to add one more piece of evidence to the first paragraph. Which detail from the article would best support the claim in sentence 2?`,
          choices: [
            ok(`Fofanah notes that families now stop in the tunnel to point out their favorite painted animals.`),
            no(`Fofanah notes that a local hardware store donated most of the paint for the mural.`, 'irrelevant-detail'),
            no(`Fofanah notes that the tunnel was first built under the road in the year 1961.`, 'irrelevant-detail'),
            no(`Fofanah notes that the neighbors took six weekends to finish painting the walls.`, 'process-not-effect'),
          ],
          solution: `Families stopping in the tunnel shows it has become a place people gather, which is the claim. The six weekends describe how the mural was made, not how people use the tunnel now.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which revision of sentence 7 best connects the second paragraph to the first?`,
          choices: [
            ok(`The project changed more than the tunnel, because it also changed the people who painted it.`),
            no(`Painting is a relaxing hobby that many retired people enjoy in their free time.`, 'off-topic-fact'),
            no(`Some people in the neighborhood did not like the mural when it was first finished.`, 'unsupported-claim'),
            no(`The painters used brushes, rollers and ladders to reach the top of the walls.`, 'irrelevant-detail'),
          ],
          solution: `The first choice links back to the tunnel's change in paragraph 1 and introduces the new point about the painters. Nothing in the draft says people disliked the mural, so that sentence adds an unsupported claim.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Which revision of sentence 11 best concludes the draft while staying true to the evidence?`,
          choices: [
            ok(`Fofanah's details, from the busier tunnel to Mr. Saleh's new friendships, show that the mural helped neighbors connect.`),
            no(`Overall, Fofanah shows that the city should pay to paint murals in every tunnel it owns.`, 'unsupported-recommendation'),
            no(`Overall, Fofanah shows that Mr. Saleh was the most important painter in the whole project.`, 'too-narrow'),
            no(`Overall, the walkers counted in the spring prove that the Saturday market made money.`, 'confuses-evidence'),
          ],
          solution: `The best conclusion gathers evidence from both paragraphs and restates the analysis about connection. The article reports on one mural, so saying the city should paint every tunnel is a recommendation the evidence does not support.`,
        },
      ],
    },
    {
      code: 'wg8-writing-with-evidence-p05',
      title: 'Draft: What Rest Days Do',
      body: `(1) In "Rest Days Win Races," Kofi Mensah argues that young runners improve faster when they take regular rest days. (2) Mensah explains that muscles grow stronger during rest, not during the workout itself. (3) He describes a study in which two groups of middle school runners trained for eight weeks. (4) One group ran every day, and the other rested two days a week. (5) Mensah reports that the group that rested "cut an average of forty seconds from their mile times," while the other group improved by only twelve seconds. (6) ____.

(7) Mensah also points out that rest protects runners from injury. (8) In the study, four runners in the everyday group hurt their shins, but only one runner in the rest group did. (9) My friend Ji-woo runs every day and has never been hurt. (10) Mensah's evidence shows that rest helps runners both get faster and stay healthy.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Why should the writer remove sentence 9?`,
          choices: [
            ok(`It is one personal example from outside the article, and it weakens the analysis.`),
            no(`It is the claim of the draft, so it should come first in the paragraph.`, 'misidentifies-claim'),
            no(`It quotes Mensah directly without explaining what the words mean.`, 'misidentifies-problem'),
            no(`It repeats the study results already given in sentence 8.`, 'misreads-repetition'),
          ],
          solution: `Ji-woo is the writer's friend, not part of Mensah's article, and one person's experience works against the point being made. Sentence 9 contains no quotation from Mensah.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which sentence best fills blank 6 by explaining the evidence in sentence 5?`,
          choices: [
            ok(`Since the rested group improved more than three times as much, the study supports Mensah's point that rest builds speed.`),
            no(`Forty seconds is quite a long time for anyone to wait during a race.`, 'vague-explanation'),
            no(`This shows that running every day is the only real way for a runner to improve.`, 'contradicts-evidence'),
            no(`The study that Mensah describes lasted for a total of eight weeks.`, 'repeats-detail'),
          ],
          solution: `Forty seconds compared with twelve is more than three times the improvement, and the first choice ties that comparison to the claim. Saying that daily running is the only way to improve contradicts the results in sentence 5.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which phrase, added to the start of sentence 8, best shows how it relates to sentence 7?`,
          choices: [
            ok(`For example,`),
            no(`However,`, 'false-contrast'),
            no(`As a result,`, 'confuses-cause-effect'),
            no(`In conclusion,`, 'premature-conclusion'),
          ],
          solution: `Sentence 7 makes a point about injuries, and sentence 8 gives a specific case from the study, so "For example" fits. Sentence 8 does not disagree with sentence 7, so "However" signals a contrast that is not there.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `The writer wants to add a detail that supports sentence 2. Which detail from the article would work best?`,
          choices: [
            ok(`Mensah explains that hard runs cause tiny tears in muscle fibers, which heal and thicken on rest days.`),
            no(`Mensah explains that running shoes should be replaced after a few hundred miles of use.`, 'irrelevant-detail'),
            no(`Mensah explains that many young runners like to listen to music during long runs.`, 'irrelevant-detail'),
            no(`Mensah explains that the study took place during the fall cross-country season.`, 'weak-link-to-claim'),
          ],
          solution: `Sentence 2 says muscles grow stronger during rest, and the detail about fibers healing and thickening on rest days explains how. When the study took place does not show anything about how muscles grow.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Why is sentence 5 stronger evidence than sentence 2 for the claim in sentence 1?`,
          choices: [
            ok(`Sentence 5 gives measured results comparing runners who rested with runners who did not, while sentence 2 only explains an idea.`),
            no(`Sentence 5 is longer than sentence 2 and uses more words taken straight from the article.`, 'length-as-strength'),
            no(`Sentence 2 is an opinion the writer made up, while sentence 5 comes from Mensah's article.`, 'misreads-source'),
            no(`Sentence 5 describes injuries, which matter more to runners than how fast they get.`, 'misreads-detail'),
          ],
          solution: `Sentence 5 shows a measured difference (forty seconds against twelve) between the two groups, which tests the claim directly. Sentence 2 also comes from Mensah, so calling it the writer's made-up opinion misreads the draft.`,
        },
      ],
    },
    {
      code: 'wg8-writing-with-evidence-p06',
      title: 'Draft: Lunch Without Phones',
      body: `(1) In "The Quiet Phone Experiment," Ruth Abara reports on a school that asked students to leave their phones in lockers during lunch for one month. (2) Abara shows that the rule led students to talk with each other more, even though many disliked it at first. (3) At the start, Abara writes, "a petition against the rule gathered more than two hundred names." (4) By the third week, however, lunch monitors noticed more students playing board games and chatting across tables. (5) ____, the cafeteria had become noticeably louder. (6) Phones have changed a great deal since they were first invented. (7) In a survey at the end of the month, sixty percent of students said they had made a new friend at lunch.

(8) Abara also includes the view of eighth grader Tobias Lindqvist. (9) He told her that he missed checking game scores during lunch but liked "actually knowing the kids at my table." (10) Tobias's mixed feelings match the article as a whole.

(11) That is why phones should be banned everywhere.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not help analyze the article?`,
          choices: [
            ok(`sentence 6`),
            no(`sentence 3`, 'removes-relevant-evidence'),
            no(`sentence 7`, 'removes-relevant-evidence'),
            no(`sentence 9`, 'removes-relevant-evidence'),
          ],
          solution: `Sentence 6 is a general comment about phone history and does not relate to the lunch experiment. Sentence 7 gives survey results that directly support the claim.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 5?`,
          choices: [
            ok(`By the fourth week`),
            no(`Before the experiment began`, 'wrong-sequence'),
            no(`On the other hand`, 'false-contrast'),
            no(`Unless students agreed`, 'condition-signal'),
          ],
          solution: `Sentence 4 begins "By the third week," so "By the fourth week" continues the order of events as students talked more. "Before the experiment began" would place the louder cafeteria before the rule, which breaks the timeline.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `How does sentence 3 support the claim in sentence 2?`,
          choices: [
            ok(`It supports the part of the claim saying many students disliked the rule at first.`),
            no(`It proves that the phone rule was a failure that the school regretted.`, 'overstates-evidence'),
            no(`It shows that students made new friends during lunch that month.`, 'misreads-evidence'),
            no(`It shows that lunch monitors saw more students playing board games.`, 'misattributes-detail'),
          ],
          solution: `The claim says students disliked the rule at first, and a petition with more than two hundred names shows that dislike. The petition does not prove the rule failed, since later sentences show students talking more.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `Sentence 10 needs more explanation. Which sentence, added after it, best explains how the evidence supports the claim?`,
          choices: [
            ok(`Like the article, he shows that students gave something up but gained closer ties with classmates.`),
            no(`Tobias is in eighth grade, just like me, so I understand how he feels.`, 'personal-connection'),
            no(`Tobias probably wants the school to bring phones back next year.`, 'unsupported-inference'),
            no(`He was one of the students that Abara interviewed for the article.`, 'restates-fact'),
          ],
          solution: `Tobias missed scores but liked knowing his tablemates, and the first choice explains how that matches the claim of giving something up and gaining connection. Nothing in the draft says what Tobias wants next year, so that choice is a guess.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which revision of sentence 11 best concludes the draft while staying true to the evidence?`,
          choices: [
            ok(`Abara's evidence suggests that a phone-free lunch, though unpopular at first, gave students more chances to connect.`),
            no(`That is why every school should ban phones in every class and every hallway.`, 'overgeneralization'),
            no(`That is why the students who signed the petition were wrong to complain.`, 'unsupported-judgment'),
            no(`That is why sixty percent of the students made a new friend at lunch.`, 'restates-single-detail'),
          ],
          solution: `The first choice sums up both parts of the claim, the early dislike and the new connections, without going beyond the article. The article studied only lunch at one school, so banning phones in every class overstates the evidence.`,
        },
      ],
    },
    {
      code: 'wg8-writing-with-evidence-p07',
      title: 'Draft: The Bees That Live Alone',
      body: `(1) In "The Bees That Live Alone," Sung-min Park explains that most bee species do not live in hives. (2) ____. (3) Park writes that "about nine out of ten bee species live alone," nesting in small holes in wood or soil. (4) Because they have no hive to guard, these bees rarely sting. (5) Park also explains that one mason bee can pollinate as many flowers as dozens of honeybees. (6) This is because the mason bee carries pollen loosely on its belly, so it drops more pollen on each flower.

(7) Park ends by describing a class that built a "bee hotel" from hollow plant stems. (8) Within a month, the students counted thirty sealed nesting tubes. (9) Honey is a sweet food that people have eaten for thousands of years. (10) This result shows that ordinary people can help solitary bees with simple projects.

(11) ____`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Why should the writer remove sentence 9?`,
          choices: [
            ok(`It is about honey, which does not relate to the solitary bees the draft analyzes.`),
            no(`It is the main claim, so it should be moved to the start of the draft.`, 'misidentifies-claim'),
            no(`It quotes Park's article but does not explain the quotation.`, 'misidentifies-problem'),
            no(`It repeats the result about the bee hotel from sentence 8.`, 'misreads-repetition'),
          ],
          solution: `The draft is about bees that live alone and do not make hives, so a fact about honey does not support it. Sentence 9 is not a quotation and says nothing about the bee hotel.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which claim best fills blank 2?`,
          choices: [
            ok(`Park argues that these solitary bees are gentle, hard-working pollinators that people can easily help.`),
            no(`Bees are insects with six legs, four wings and two antennae on their heads.`, 'off-topic-fact'),
            no(`Park argues that honeybees are the most important insects living on Earth.`, 'contradicts-source'),
            no(`Park's article has seven paragraphs, one photo and a short list of sources.`, 'structure-not-claim'),
          ],
          solution: `The draft goes on to show that solitary bees rarely sting, pollinate well and can be helped with a bee hotel, so the first claim previews all of it. The draft praises mason bees over honeybees, so a claim about honeybees being most important does not fit.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `How does sentence 6 support sentence 5?`,
          choices: [
            ok(`It explains the reason behind the fact in sentence 5, showing why a mason bee pollinates so well.`),
            no(`It gives a contrasting fact that weakens the point made in sentence 5.`, 'false-contrast'),
            no(`It introduces a new topic about why solitary bees rarely sting people.`, 'misreads-topic'),
            no(`It repeats sentence 5 using different words without adding anything.`, 'misreads-repetition'),
          ],
          solution: `Sentence 6 begins "This is because" and explains how loose pollen lets a mason bee pollinate more flowers. It agrees with sentence 5 rather than weakening it.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `The writer wants to add evidence that supports the claim in sentence 10. Which detail from the article would be most effective?`,
          choices: [
            ok(`Park notes that the class's bee hotel cost under ten dollars and took one afternoon to build.`),
            no(`Park notes that most solitary bees are busiest during the warm weeks of spring.`, 'irrelevant-detail'),
            no(`Park notes that the class later used a microscope to study the wings of the bees.`, 'irrelevant-detail'),
            no(`Park notes that some solitary bees are smaller than a single grain of rice.`, 'irrelevant-detail'),
          ],
          solution: `Sentence 10 says simple projects can help, and a cheap bee hotel built in one afternoon proves the project was simple. Studying bee wings with a microscope is about the class, not about how easy it is to help the bees.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which sentence would best fill blank 11 as a conclusion to the draft?`,
          choices: [
            ok(`Park's facts about gentle, efficient bees and the class's bee hotel show that these overlooked insects matter and are easy to support.`),
            no(`Everyone should stop eating honey right away so that the solitary bees can be protected.`, 'unsupported-recommendation'),
            no(`Park's facts show that mason bees are better than honeybees in every possible way.`, 'overstates-evidence'),
            no(`Park's facts show that most bees live together in hives and make honey for people.`, 'contradicts-source'),
          ],
          solution: `The first choice connects evidence from both paragraphs back to the claim. Park compares mason bees and honeybees only on pollination, so saying mason bees are better "in every possible way" goes beyond the evidence.`,
        },
      ],
    },
    {
      code: 'wg8-writing-with-evidence-p08',
      title: 'Draft: The Rolling Classroom',
      body: `(1) In "The Rolling Classroom," Ezekiel Moana describes a school bus that was rebuilt into a science lab for rural students in Pine Hollow County. (2) Moana suggests that the lab gave students experiences their own schools could not offer. (3) He explains that the county's three small schools shared one microscope among them. (4) The bus, by contrast, carried twelve microscopes, a weather station and a small telescope. (5) Moana quotes science teacher Adaeze Nwosu, who said students "lined up before sunrise when the bus came to town." (6) ____.

(7) The lab also changed what students hoped to do later. (8) Moana reports that after two years, twice as many Pine Hollow students signed up for advanced science classes in high school. (9) The bus is painted bright yellow with green stripes. (10) One student, Lupe Ortega, told Moana she now plans to study weather.

(11) Moana's article shows that bringing science to students can open doors that distance once closed.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence does not support the writer's analysis?`,
          choices: [
            ok(`sentence 9`),
            no(`sentence 4`, 'removes-relevant-evidence'),
            no(`sentence 5`, 'removes-relevant-evidence'),
            no(`sentence 8`, 'removes-relevant-evidence'),
          ],
          solution: `The bus's paint colors have nothing to do with what students experienced or hoped to do. Sentence 8 shows a measured change in students' plans, so it is key evidence.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which sentence best fills blank 6 by explaining the quotation in sentence 5?`,
          choices: [
            ok(`Students arriving that early shows how eager they were for hands-on science they could not get at school.`),
            no(`In Pine Hollow County, the sun rises very early during the summer months.`, 'off-topic-fact'),
            no(`This shows that the bus driver must have arrived late every single time.`, 'unsupported-inference'),
            no(`Ms. Nwosu is a science teacher who works in one of the county schools.`, 'restates-fact'),
          ],
          solution: `The first choice explains what lining up before sunrise reveals and ties it to the claim in sentence 2. Nothing in the article suggests the driver was late, so that choice is a guess.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Why does the writer place sentence 4 right after sentence 3?`,
          choices: [
            ok(`To contrast the schools' one microscope with the bus's equipment, supporting the claim in sentence 2.`),
            no(`To show that the county schools had better tools than the bus did.`, 'reverses-contrast'),
            no(`To prove that students liked using telescopes more than microscopes.`, 'unsupported-inference'),
            no(`To explain why the bus needed to be painted bright colors.`, 'irrelevant-detail'),
          ],
          solution: `Sentence 4 begins "by contrast" and sets twelve microscopes against the schools' single one, showing the bus offered something new. That comparison shows the bus had more tools, not fewer.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Which revision of sentence 10 best connects it to the claim in sentence 7?`,
          choices: [
            ok(`One student, Lupe Ortega, told Moana that using the bus's weather station made her decide to study weather.`),
            no(`One student, Lupe Ortega, told Moana that her favorite part was the bright color of the bus.`, 'irrelevant-detail'),
            no(`One student, Lupe Ortega, told Moana she plans to study weather, which is a popular subject.`, 'adds-irrelevant-comment'),
            no(`One student, Lupe Ortega, told Moana she has always wanted to study weather since she was small.`, 'undercuts-claim'),
          ],
          solution: `Sentence 7 says the lab changed students' plans, and the first choice shows the bus's weather station caused Lupe's new plan. Saying she "always wanted" to study weather means the bus did not change anything, which weakens the claim.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `A classmate suggests replacing sentence 8 with "Many students probably liked science more after the bus came." Why is the original sentence 8 better?`,
          choices: [
            ok(`Sentence 8 gives a specific, measured result from the article, while the suggestion is a guess with no evidence.`),
            no(`The suggested sentence is much too long and would make the paragraph hard to read.`, 'length-not-relevance'),
            no(`Sentence 8 is a direct quotation from Moana, and quotations are always the best evidence.`, 'misidentifies-quotation'),
            no(`The suggested sentence is about a different county than the one in the article.`, 'misreads-text'),
          ],
          solution: `"Twice as many" students signing up is a measured fact from the article, while "probably liked" is the writer's guess. Sentence 8 is a paraphrase, not a direct quotation, so that reason is wrong.`,
        },
      ],
    },
  ],
}

export default skill
