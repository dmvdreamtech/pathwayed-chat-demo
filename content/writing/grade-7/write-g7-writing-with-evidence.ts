import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g7-writing-with-evidence',
  subject: 'writing',
  grade: 7,
  group: 'Composition',
  name: 'Writing About Texts with Evidence',
  standards: ['W.7.9'],
  passages: [
    {
      code: 'wg7-writing-with-evidence-p01',
      title: 'Draft: Where Did the Fireflies Go?',
      body: `(1) In the article "Lights Out for Fireflies," Priya Desai explains why fireflies are harder to find in many neighborhoods than they used to be. (2) I remember catching fireflies in a jar at my cousin's house every July. (3) Desai writes that fireflies use their flashing lights to find each other at night. (4) She reports that in one study, "fireflies in brightly lit yards flashed about half as often as fireflies in dark fields." (5) This means bright lights make it harder for fireflies to send signals to each other.

(6) ____, Desai points out that fireflies spend most of their lives as larvae in damp soil and leaf piles. (7) When people rake away every leaf and mow their lawns very short, the larvae lose their hiding places. (8) Desai notes that one park left a strip of tall grass and leaves alone, and the number of fireflies there doubled in three summers. (9) This example shows that giving larvae a safe place to grow can help bring fireflies back.

(10) Fireflies are really cool bugs.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `The writer wants to add a claim right after sentence 1. Which sentence best states a claim that the rest of the draft supports?`,
          choices: [
            ok(`Desai shows that fireflies are disappearing because bright lights and very tidy yards disrupt how they live.`),
            no(`Fireflies are insects that can be found in many parks and backyards in the summer.`, 'topic-not-claim'),
            no(`Desai thinks that every family should stop using outdoor lights at night.`, 'unsupported-inference'),
            no(`Catching fireflies is one of the best parts of spending summer outside.`, 'opinion-not-analysis'),
          ],
          solution: `Paragraph 1 explains the problem with bright lights and paragraph 2 explains the problem with raked and mowed yards, so a claim naming both causes fits. The draft never says Desai wants every family to stop using lights, so that choice goes beyond the text.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Why should the writer remove sentence 2?`,
          choices: [
            ok(`It is a personal memory, not evidence from the article that explains why fireflies are disappearing.`),
            no(`It is the main claim of the draft, so it should be moved to the conclusion instead.`, 'misidentifies-claim'),
            no(`It is a quotation from the article that the writer forgot to explain.`, 'misidentifies-problem'),
            no(`It repeats the same study about bright yards that sentence 4 describes.`, 'misreads-repetition'),
          ],
          solution: `Sentence 2 tells about the writer's own summers and gives no information from Desai's article. It is not a quotation, and it says nothing about the study in sentence 4.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 6?`,
          choices: [
            ok(`Besides the problem of bright lights`),
            no(`Because the fireflies flash less often`, 'confuses-cause-effect'),
            no(`On the other hand, unlike real problems`, 'false-contrast'),
            no(`To sum up everything in the article`, 'premature-conclusion'),
          ],
          solution: `Paragraph 2 adds a second reason fireflies are disappearing, so "Besides the problem of bright lights" links it to paragraph 1. Larvae living in soil is not caused by fireflies flashing less, so "Because the fireflies flash less often" sets up a false cause.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which revision of sentence 10 would best conclude the draft?`,
          choices: [
            ok(`Desai's evidence shows that fireflies need both dark nights and messy, leafy ground, so small changes in yards can help them.`),
            no(`Fireflies are really cool bugs, and everyone in my neighborhood loves to watch them glow.`, 'unsupported-inference'),
            no(`Some fireflies flash green light, while other kinds of fireflies flash yellow light.`, 'off-topic-fact'),
            no(`Desai reports that fireflies in bright yards flashed about half as often as others.`, 'evidence-without-analysis'),
          ],
          solution: `A strong conclusion sums up the analysis from both paragraphs, and only the choice about "dark nights and messy, leafy ground" joins the light problem and the larvae problem. Repeating the study from sentence 4 restates one piece of evidence without pulling the draft together.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to add one more piece of evidence after sentence 4 to strengthen paragraph 1. Which detail from the article would work best?`,
          choices: [
            ok(`Desai explains that a female firefly answers a flash only when she can see it clearly against the dark.`),
            no(`Desai mentions that fireflies are called lightning bugs in some parts of the country.`, 'irrelevant-evidence'),
            no(`Desai notes that firefly larvae live in damp soil and under piles of fallen leaves.`, 'misplaced-evidence'),
            no(`Desai says that many people think fireflies make summer nights feel magical.`, 'opinion-not-evidence'),
          ],
          solution: `Paragraph 1 argues that bright lights block firefly signals, and a detail about females needing to see flashes clearly against the dark directly supports that point. The detail about larvae in damp soil is accurate, but it belongs to paragraph 2, which is about where larvae live.`,
        },
      ],
    },
    {
      code: 'wg7-writing-with-evidence-p02',
      title: 'Draft: The Ice Harvest',
      body: `(1) Before electric refrigerators, families kept food cold with ice cut from frozen ponds, and Tomas Ferreira's article "When Ice Came from Ponds" explains how this work was done. (2) ____. (3) Ferreira describes workers sawing the pond ice into blocks that weighed about one hundred pounds each. (4) The blocks were then floated along open channels in the ice to an icehouse beside the shore. (5) Ferreira writes that "a skilled crew could cut and store two thousand blocks in a single day." (6) This number shows that ice harvesting took careful teamwork, not just strong arms.

(7) The ice also had to last all summer. (8) Ferreira explains that workers packed the blocks in thick layers of sawdust, which kept warm air away from the ice. (9) Ice is frozen water. (10) Because of this packing, much of the ice stayed frozen until late August. (11) Ferreira's details show that ____.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (2) as the claim of the draft?`,
          choices: [
            ok(`Ferreira shows that harvesting ice was a skilled, organized job that required planning for the whole year.`),
            no(`Ice harvesting was a kind of job that people used to do a long time ago.`, 'topic-not-claim'),
            no(`Today most people simply buy bags of ice at a store when they need it.`, 'off-topic-fact'),
            no(`Ferreira believes that icehouses were better than modern refrigerators.`, 'unsupported-inference'),
          ],
          solution: `The draft gives evidence about teamwork in cutting the ice and planning to store it until August, which supports the claim about a skilled, year-round job. "A kind of job people used to do" only names the topic and makes no point for the evidence to prove.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not help support the analysis?`,
          choices: [
            ok(`Sentence 9`),
            no(`Sentence 5`, 'removes-key-evidence'),
            no(`Sentence 8`, 'removes-key-evidence'),
            no(`Sentence 3`, 'removes-key-evidence'),
          ],
          solution: `Sentence 9 states a general fact that every reader already knows and says nothing about Ferreira's article. Sentence 5 is the quotation that proves the crews worked as a skilled team, so removing it would weaken the draft.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which revision of sentence 7 best connects paragraph 2 to paragraph 1?`,
          choices: [
            ok(`Cutting the ice was only half the job, because the ice also had to last all summer.`),
            no(`For example, the ice also had to last all summer long after it was cut.`, 'wrong-transition'),
            no(`In conclusion, the ice also had to last all summer in the icehouse.`, 'premature-conclusion'),
            no(`Even so, the ice did not really need to last for very long at all.`, 'contradicts-text'),
          ],
          solution: `"Cutting the ice was only half the job" reminds the reader of paragraph 1 (cutting) and introduces paragraph 2 (storing). "In conclusion" signals the end of the draft even though a whole paragraph of new evidence follows.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which ending best completes sentence 11?`,
          choices: [
            ok(`the workers planned for the hot months, not just the cold ones, so that families had ice all year.`),
            no(`each block of ice weighed about one hundred pounds when it was cut.`, 'evidence-without-analysis'),
            no(`people in those days enjoyed working outside in the cold more than people today.`, 'unsupported-inference'),
            no(`sawdust is the best material ever invented for keeping things cold.`, 'overgeneralizes'),
          ],
          solution: `Sentences 8 and 10 show that the ice was packed to last until August, so the ending about planning for the hot months explains what those details mean. The block weight is a detail from paragraph 1 that does not explain the packing evidence.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `What is the main job of sentence 6 in the draft?`,
          choices: [
            ok(`It explains how the quotation in sentence 5 supports the claim that the work took skill and organization.`),
            no(`It introduces a brand new piece of evidence that the article does not mention anywhere.`, 'misidentifies-function'),
            no(`It gives the writer's personal opinion about whether ice harvesting was enjoyable.`, 'opinion-not-analysis'),
            no(`It summarizes the whole article, including the sawdust, in a single short sentence.`, 'overgeneralizes'),
          ],
          solution: `Sentence 6 tells the reader what the number two thousand proves, which is teamwork, so it connects evidence to the claim. It adds no new facts, and it does not mention the sawdust from paragraph 2.`,
        },
      ],
    },
    {
      code: 'wg7-writing-with-evidence-p03',
      title: 'Draft: Rosa Learns to Pace Herself',
      body: `(1) In the short story "The Long Lane," by Imani Okafor, a swimmer named Rosa learns that swimming her best race takes patience as well as speed. (2) At the start of the story, Rosa sprints as hard as she can from the very first stroke. (3) Okafor writes that by the last lap, Rosa's "arms felt like wet sand." (4) ____. (5) Her coach, Mr. Halvorsen, then teaches her to count her strokes and save energy for the end.

(6) Later in the story, Rosa swims the same race at a meet against a rival team. (7) This time she stays calm during the first lap and lets other swimmers pull ahead. (8) Okafor writes that on the final lap, Rosa "had something left, and she used every bit of it." (9) Rosa wears a blue swim cap with a white stripe. (10) She finishes second, but she cuts four seconds from her best time. (11) Rosa is happy at the end.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (4) to explain the quotation in sentence 3?`,
          choices: [
            ok(`This detail shows that sprinting early left Rosa too tired to finish the race strongly.`),
            no(`This detail shows that Rosa's arms were wet because she was swimming in a pool.`, 'literal-reading'),
            no(`This detail shows that sand can be found at the bottom of many lakes and rivers.`, 'off-topic-fact'),
            no(`This detail shows that Rosa should quit the swim team and try a different sport.`, 'unsupported-inference'),
          ],
          solution: `Saying her arms "felt like wet sand" means they felt heavy and tired, which shows the cost of sprinting early. Reading it as her arms simply being wet misses what the comparison means.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Why should the writer remove sentence 9?`,
          choices: [
            ok(`It describes how Rosa looks, which does not help show how she learns to be patient.`),
            no(`It is the claim of the draft, so it should come at the start of paragraph 1.`, 'misidentifies-claim'),
            no(`It is a quotation from the story that needs to be explained in the next sentence.`, 'misidentifies-problem'),
            no(`It disagrees with the quotation about the final lap in sentence 8.`, 'misreads-text'),
          ],
          solution: `The color of Rosa's swim cap has nothing to do with her learning to pace herself, so it distracts from the analysis. It is not a quotation, and it does not disagree with sentence 8.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Rosa's change from sprinting early to pacing herself shows that patience helped her swim her fastest race.`),
            no(`Okafor writes that Rosa "had something left, and she used every bit of it."`, 'evidence-without-analysis'),
            no(`This story is about a girl named Rosa who is a swimmer on a team.`, 'topic-not-claim'),
            no(`Swimming is a good sport because it keeps people strong and healthy.`, 'off-topic-fact'),
          ],
          solution: `The choice about "sprinting early to pacing herself" ties the beginning and end of the story back to the claim about patience. Repeating the quotation from sentence 8 gives evidence again but does not sum up what it shows.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `The writer wants to add a quotation after sentence 7 to show that Rosa used her coach's advice. Which quotation works best?`,
          choices: [
            ok(`Okafor writes that Rosa "counted each stroke, just the way Mr. Halvorsen had shown her."`),
            no(`Okafor writes that the pool "smelled of chlorine and somebody's sunscreen."`, 'irrelevant-evidence'),
            no(`Okafor writes that the rival team wore "bright orange suits that matched."`, 'irrelevant-evidence'),
            no(`Okafor writes that Rosa "wanted to win more than she wanted anything."`, 'does-not-show-change'),
          ],
          solution: `Counting strokes is exactly what the coach taught in sentence 5, so this quotation proves Rosa used his advice. Wanting to win shows her goal but not that she changed how she swims.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `A classmate says sentence 10 weakens the draft because Rosa does not win. Which response best explains why sentence 10 actually supports the claim?`,
          choices: [
            ok(`The claim is about swimming her best race, and cutting four seconds shows that pacing made her faster.`),
            no(`Finishing second proves that Rosa's new plan failed and she should go back to sprinting.`, 'contradicts-claim'),
            no(`Finishing second shows that the rival team must have broken the rules of the meet.`, 'unsupported-inference'),
            no(`Finishing second shows that Mr. Halvorsen gave Rosa poor advice about saving energy.`, 'misreads-text'),
          ],
          solution: `Sentence 1 says patience helps Rosa swim "her best race," not win, so a new best time is strong support. Nothing in the draft suggests the plan failed, since she improved by four seconds.`,
        },
      ],
    },
    {
      code: 'wg7-writing-with-evidence-p04',
      title: 'Draft: Hands from a Printer',
      body: `(1) In "Hands from a Printer," Kenji Mori writes about a group of volunteers who use 3D printers to make plastic hands for children. (2) Mori shows that these printed hands help children because they are cheap, easy to replace, and fun to design. (3) Mori explains that a regular artificial hand can cost thousands of dollars, while a printed one costs about fifty dollars in plastic. (4) ____ children grow quickly and often need a new hand every year. (5) Mori writes that "when a child outgrows a printed hand, the volunteers simply print a bigger one." (6) The low cost makes it possible for families to replace the hand as often as needed.

(7) The children also help design their own hands. (8) Mori describes a girl named Ana who asked for a hand with purple fingers and silver stars. (9) According to Mori, children who choose their own colors are more likely to wear their hands every day. (10) 3D printers can also make toys, phone cases, and bike parts. (11) In the end, the printed hands are good.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which words best fill the blank at the start of sentence 4?`,
          choices: [
            ok(`This low price is important because`),
            no(`As a result of the stars and colors,`, 'confuses-cause-effect'),
            no(`On the other hand, it is surprising that`, 'false-contrast'),
            no(`To conclude, it is very clear that`, 'premature-conclusion'),
          ],
          solution: `Sentence 4 explains why the low cost in sentence 3 matters, so "This low price is important because" links the two ideas. Children growing has nothing to do with stars and colors, so that choice creates a false cause.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Why should the writer remove sentence 10?`,
          choices: [
            ok(`It lists other things printers make, which does not help explain how the hands help children.`),
            no(`It is the strongest piece of evidence, so it should be moved to the conclusion.`, 'misjudges-evidence'),
            no(`It repeats the information about cost that appears in sentence 3.`, 'misreads-repetition'),
            no(`It is a quotation from Mori that the writer never explains.`, 'misidentifies-problem'),
          ],
          solution: `Toys, phone cases, and bike parts have nothing to do with the claim about printed hands helping children. Sentence 10 does not mention cost and is not a quotation.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which sentence states the claim that the rest of the draft supports?`,
          choices: [
            ok(`Sentence 2`),
            no(`Sentence 1`, 'introduction-not-claim'),
            no(`Sentence 3`, 'evidence-not-claim'),
            no(`Sentence 6`, 'explanation-not-claim'),
          ],
          solution: `Sentence 2 names three reasons the hands help (cheap, easy to replace, fun to design), and the later sentences give evidence for each. Sentence 1 only introduces the article and its topic without making a point.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Mori's article shows that printed hands work well because families can afford new ones and children enjoy wearing them.`),
            no(`In the end, the printed hands are good, and the volunteers are very nice people.`, 'vague-conclusion'),
            no(`Mori writes that a regular artificial hand can cost thousands of dollars to make.`, 'evidence-without-analysis'),
            no(`In the end, every child in the world will soon have a printed plastic hand.`, 'overgeneralizes'),
          ],
          solution: `The choice saying "families can afford new ones and children enjoy wearing them" sums up both paragraphs, cost and design, and links them to the claim. Saying the hands "are good" stays vague and does not explain what the evidence showed.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence 9 that explains the evidence. Which sentence works best?`,
          choices: [
            ok(`This shows that letting children design their hands does more than make them look nice, because it helps the children actually use them.`),
            no(`This shows that purple is the most popular color for children who wear printed hands.`, 'overgeneralizes'),
            no(`This shows that a printed hand costs far less than a regular artificial hand does.`, 'misplaced-analysis'),
            no(`This shows that Ana is a very creative girl who likes to draw stars and planets.`, 'too-narrow'),
          ],
          solution: `Sentence 9 says children who choose colors wear their hands more, so the best explanation connects design to daily use. The point about cost is true but explains paragraph 1, not the evidence in sentence 9.`,
        },
      ],
    },
    {
      code: 'wg7-writing-with-evidence-p05',
      title: 'Draft: A Song Passed Down',
      body: `(1) In the story "The Steel Pan," by Celeste Moreau, a boy named Darnell learns to play the steel pan from his grandfather. (2) ____. (3) At first, Darnell finds the old instrument boring and would rather play video games. (4) Moreau writes that Grandpa "played the same song every evening, the one his own father had taught him." (5) This detail shows that the song has been passed down through the family for many years.

(6) As the story goes on, Darnell begins to practice the song himself. (7) He makes many mistakes, but Grandpa only laughs and says, "My notes were worse." (8) Moreau writes that by the end of summer, the two of them "played side by side, and nobody could tell whose notes were whose." (9) Steel pans are made from large metal drums. (10) The steel pan becomes a way for Darnell and Grandpa to understand each other.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (2) as the claim of the draft?`,
          choices: [
            ok(`Moreau shows that sharing music can bring family members from different generations closer together.`),
            no(`The steel pan is a musical instrument that people play by striking it with sticks.`, 'topic-not-claim'),
            no(`Darnell should spend much less time playing video games after school.`, 'opinion-not-analysis'),
            no(`Moreau's story takes place over the course of one long summer.`, 'too-narrow'),
          ],
          solution: `The draft traces how one song connects Darnell, Grandpa, and Grandpa's father, so a claim about music bringing generations together fits. The summer setting is true, but it is a small detail, not a point the evidence proves.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `The writer wants to add a sentence after sentence 7 to explain Grandpa's words. Which sentence works best?`,
          choices: [
            ok(`Grandpa's joke shows that he is patient and wants Darnell to keep trying instead of giving up.`),
            no(`Grandpa's joke shows that he was a poor musician for his whole life.`, 'literal-reading'),
            no(`Grandpa's joke shows that Darnell will never be able to learn the song.`, 'contradicts-text'),
            no(`Grandpa's joke shows that the steel pan is very hard to keep in tune.`, 'unsupported-inference'),
          ],
          solution: `Grandpa laughs and compares Darnell's mistakes to his own early ones, which encourages Darnell to keep going. Taking the joke to mean Grandpa was always a poor musician ignores that he plays the song every evening.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which sentence should the writer remove because it does not support the analysis?`,
          choices: [
            ok(`Sentence 9`),
            no(`Sentence 3`, 'removes-key-evidence'),
            no(`Sentence 5`, 'removes-key-evidence'),
            no(`Sentence 8`, 'removes-key-evidence'),
          ],
          solution: `Sentence 9 explains how the instrument is made, which has nothing to do with the family connection. Sentence 3 shows how Darnell felt before he changed, so removing it would hide the change the draft is analyzing.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `What does the phrase "As the story goes on" do at the start of sentence 6?`,
          choices: [
            ok(`It signals that the draft is moving to a later part of the story, where Darnell begins to change.`),
            no(`It signals that the writer is about to give an opinion that disagrees with Moreau.`, 'false-contrast'),
            no(`It signals that the draft is ending and the writer is summing up the main claim.`, 'premature-conclusion'),
            no(`It signals that Darnell's practice was caused by the video games in sentence 3.`, 'confuses-cause-effect'),
          ],
          solution: `The phrase is a time transition that moves the reader from the beginning of the story to later events. It does not introduce disagreement, and the draft does not end there.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Which explanation best shows how the quotation in sentence 8 supports the draft's claim?`,
          choices: [
            ok(`It shows that Darnell and Grandpa now play as equals, so the old song has joined them together.`),
            no(`It shows that the two of them played so loudly that no one could hear the notes.`, 'literal-reading'),
            no(`It shows that Grandpa stopped playing the song once Darnell learned it.`, 'contradicts-text'),
            no(`It shows that summer is the best season for anyone to learn a new instrument.`, 'overgeneralizes'),
          ],
          solution: `When "nobody could tell whose notes were whose," the boy and his grandfather sound like one player, which shows the music has brought them close. The quotation says they played side by side, so Grandpa did not stop playing.`,
        },
      ],
    },
    {
      code: 'wg7-writing-with-evidence-p06',
      title: 'Draft: From Tracks to Trail',
      body: `(1) In "From Tracks to Trail," Noor Haddad describes how the town of Millbrook turned an old railroad line into a walking and biking path. (2) Haddad shows that the trail helped the town in more ways than one. (3) She explains that the rails had not been used in thirty years, and the strip of land was full of weeds and trash. (4) ____. (5) After volunteers cleared the land and the town paved it, the path opened in the spring of 2021.

(6) Haddad gives several examples of how people now use the trail. (7) Students ride their bikes to school on it instead of riding along a busy road. (8) Haddad writes that "the bakery near the old station had twice as many customers the first summer." (9) Older residents walk the trail each morning, and some have formed a walking club. (10) Trains used to be one of the fastest ways to travel long distances. (11) These examples show that the trail helped ____.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Sentence 2 is too vague. Which revision makes the claim clearer?`,
          choices: [
            ok(`Haddad shows that the trail made Millbrook safer, healthier, and better for local shops.`),
            no(`Haddad shows that the new trail in Millbrook is very nice to look at.`, 'vague-claim'),
            no(`Haddad shows that the path opened to the public in the spring of 2021.`, 'fact-not-claim'),
            no(`Haddad shows that Millbrook should bring back trains on the old line.`, 'contradicts-text'),
          ],
          solution: `Paragraph 2 gives evidence about safe bike routes, active older residents, and a busier bakery, so the claim naming safety, health, and shops matches it. The opening date is a single fact, not a point the evidence proves.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which detail from the article would best fill blank (4)?`,
          choices: [
            ok(`Haddad notes that many neighbors called the area an eyesore and avoided walking near it.`),
            no(`Haddad notes that bike helmets now come in many different sizes and colors.`, 'off-topic-fact'),
            no(`Haddad notes that the bakery near the old station doubled its customers.`, 'misplaced-evidence'),
            no(`Haddad notes that the old trains were painted dark red with gold letters.`, 'irrelevant-evidence'),
          ],
          solution: `Sentence 3 describes the land before the trail, and a detail about neighbors avoiding the eyesore adds to that picture of the problem. The bakery detail is real evidence, but it shows the results after the trail opened and is already used in sentence 8.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Why should the writer remove sentence 10?`,
          choices: [
            ok(`It gives a general fact about trains instead of showing how people use the trail today.`),
            no(`It is the main claim of the draft, so it belongs at the beginning instead.`, 'misidentifies-claim'),
            no(`It repeats the quotation about the bakery that appears in sentence 8.`, 'misreads-repetition'),
            no(`It is the strongest example of how the trail helped older residents.`, 'misjudges-evidence'),
          ],
          solution: `Paragraph 2 lists examples of how the trail is used now, and a fact about old train travel does not fit that list. Sentence 10 says nothing about the bakery or older residents.`,
        },
        {
          slot: 29,
          difficulty: 'hard',
          stem: `Which ending best completes sentence 11?`,
          choices: [
            ok(`students travel more safely, older neighbors stay active, and nearby shops earn more money.`),
            no(`the bakery near the old station, which now has a lot of new customers.`, 'too-narrow'),
            no(`every single person in Millbrook, who now walks the trail every day.`, 'overgeneralizes'),
            no(`prove that trains are no longer useful for anyone in any town.`, 'unsupported-inference'),
          ],
          solution: `Sentence 11 should explain all three examples in paragraph 2, and only the ending about students, older neighbors, and nearby shops covers all three. The bakery ending is accurate but covers just one of the three examples.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence 8 to explain the quotation. Which sentence works best?`,
          choices: [
            ok(`This shows that people using the trail also spend money at the shops along it.`),
            no(`This shows that the bakery near the station makes the best bread in Millbrook.`, 'unsupported-inference'),
            no(`This shows that the bakery is located close to where the old station stood.`, 'restates-evidence'),
            no(`This shows that summer is the busiest season for every business in the country.`, 'overgeneralizes'),
          ],
          solution: `The quotation shows the bakery got more customers once the trail opened, which supports the claim that the trail helped local shops. Saying the bakery is near the station only repeats part of the quotation without explaining why it matters.`,
        },
      ],
    },
    {
      code: 'wg7-writing-with-evidence-p07',
      title: 'Draft: How Octopuses Hide',
      body: `(1) In the article "Masters of Disguise," Ines Alvarado explains how octopuses hide from the animals that hunt them. (2) Alvarado shows that octopuses survive by changing both their color and their shape. (3) She explains that an octopus's skin contains thousands of tiny color cells that can open or close in less than a second. (4) Alvarado writes that "an octopus resting on a spotted rock can turn spotted before a fish swims past." (5) This shows that ____.

(6) Color is not the octopus's only trick. (7) Alvarado describes how an octopus can raise small bumps on its skin so it looks like rough coral or seaweed. (8) One kind of octopus can even stretch out its arms and drift like a loose strand of seaweed. (9) I think octopuses are the smartest animals in the whole ocean. (10) Because octopuses have no hard shell to protect them, these disguises are their main defense.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which ending best completes sentence 5?`,
          choices: [
            ok(`an octopus can match its surroundings fast enough to stay hidden from passing fish.`),
            no(`octopuses like resting on spotted rocks more than on any other kind of rock.`, 'unsupported-inference'),
            no(`fish are not able to see any colors at all when they swim past.`, 'unsupported-inference'),
            no(`an octopus's skin has thousands of tiny color cells inside it.`, 'restates-evidence'),
          ],
          solution: `The quotation shows the octopus changes before the fish arrives, so the explanation should be about hiding quickly. Saying the skin has thousands of color cells only repeats sentence 3 instead of explaining the quotation.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Why should the writer remove sentence 9?`,
          choices: [
            ok(`It is the writer's own opinion about intelligence, which is not about how octopuses hide.`),
            no(`It is a quotation from Alvarado that the writer forgot to explain.`, 'misidentifies-problem'),
            no(`It is the main claim of the draft and should be moved to sentence 2.`, 'misidentifies-claim'),
            no(`It repeats the detail about color cells that appears in sentence 3.`, 'misreads-repetition'),
          ],
          solution: `The draft is about disguise, and the writer's belief that octopuses are smartest is an opinion with no evidence from the article. It is not a quotation, and the real claim is already in sentence 2.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which sentence gives evidence for the "shape" part of the claim in sentence 2?`,
          choices: [
            ok(`Sentence 7`),
            no(`Sentence 3`, 'confuses-color-and-shape'),
            no(`Sentence 4`, 'confuses-color-and-shape'),
            no(`Sentence 10`, 'explanation-not-evidence'),
          ],
          solution: `Sentence 7 describes the octopus raising bumps so it looks like coral, which is a change in shape and texture. Sentences 3 and 4 are about color, not shape.`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `The writer wants to add a quotation to paragraph 2. Which quotation from the article would best support that paragraph?`,
          choices: [
            ok(`Alvarado writes that "a hunting eel swam within inches of a bumpy, coral-shaped octopus and never noticed it."`),
            no(`Alvarado writes that "an octopus has three hearts and blue blood."`, 'irrelevant-evidence'),
            no(`Alvarado writes that "octopuses eat crabs, clams, and small fish."`, 'irrelevant-evidence'),
            no(`Alvarado writes that "the color cells open or close in under a second."`, 'misplaced-evidence'),
          ],
          solution: `Paragraph 2 is about changing shape, and the eel missing a bumpy, coral-shaped octopus shows that the shape trick works. The quotation about color cells is accurate, but it supports paragraph 1, which is about color.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `What does sentence 10 add to the draft?`,
          choices: [
            ok(`It explains why the disguises in both paragraphs matter so much for the octopus's survival.`),
            no(`It starts a new topic about shells that the writer should develop in another paragraph.`, 'misidentifies-function'),
            no(`It gives a direct quotation from the article to support the shape claim.`, 'misidentifies-function'),
            no(`It repeats sentence 7 using different words without adding any new idea.`, 'misreads-repetition'),
          ],
          solution: `By pointing out that octopuses have no shell, sentence 10 shows why color and shape changes are so important, tying both paragraphs to the word "survive" in the claim. It mentions shells only to explain the disguises, not to start a new topic.`,
        },
      ],
    },
    {
      code: 'wg7-writing-with-evidence-p08',
      title: 'Draft: Cooler Roofs',
      body: `(1) Abena Mensah's article "Cooler Roofs, Cooler Cities" explains how painting roofs a light color can help cities stay cooler in summer. (2) ____. (3) Mensah explains that dark roofs soak up sunlight and turn it into heat. (4) She reports that on one hot afternoon, "a black roof measured 150 degrees, while a white roof nearby measured 95 degrees." (5) That is a big difference.

(6) Mensah also describes how cooler roofs help the people inside the buildings. (7) In one apartment building that painted its roof white, residents ran their air conditioners less often. (8) Mensah writes that the building's electric bills "dropped by about one fifth over the summer." (9) In addition, some cities now pay part of the cost for families who want to paint their roofs. (10) Mensah does point out that white roofs must be cleaned every few years, or they slowly turn gray and lose some of their cooling power. (11) Still, her evidence shows that light roofs are a simple way to fight summer heat.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (2) as the claim of the draft?`,
          choices: [
            ok(`Mensah shows that light roofs keep buildings cooler and help the people inside save energy.`),
            no(`This article is about roofs and the different colors they can be painted.`, 'topic-not-claim'),
            no(`Everyone should move to a city where all of the roofs are painted white.`, 'opinion-not-analysis'),
            no(`Mensah shows that black roofs look much nicer than white roofs do.`, 'unsupported-inference'),
          ],
          solution: `Paragraph 1 shows the roof temperatures and paragraph 2 shows lower energy use, so the claim about cooler buildings and saved energy fits both. The choice about roof colors only names the topic without making a point.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which revision of sentence 5 best explains the evidence in sentence 4?`,
          choices: [
            ok(`This gap shows that a light roof stays much cooler because it does not soak up as much sunlight.`),
            no(`That is a big difference, and 150 degrees is a very hot temperature.`, 'restates-evidence'),
            no(`This gap shows that people should never use black paint on anything.`, 'overgeneralizes'),
            no(`This gap shows that the white roof must have been newer than the black one.`, 'unsupported-inference'),
          ],
          solution: `The best revision connects the temperature gap to the reason in sentence 3, that dark roofs soak up sunlight. Calling 150 degrees very hot only repeats the number without explaining what it proves.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Why does sentence 9 not fit well in paragraph 2?`,
          choices: [
            ok(`It is about who pays for the paint, not about how cool roofs help the people inside buildings.`),
            no(`It is a quotation from Mensah that the writer does not explain afterward.`, 'misidentifies-problem'),
            no(`It repeats the information about air conditioners from sentence 7.`, 'misreads-repetition'),
            no(`It argues that light roofs do not actually save any energy at all.`, 'misreads-text'),
          ],
          solution: `Sentence 6 says paragraph 2 is about how cooler roofs help people inside, and city payments do not show that. Sentence 9 is not a quotation, and it does not mention air conditioners.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Why is it helpful for the writer to include sentence 10?`,
          choices: [
            ok(`It admits a limit that Mensah mentions, which makes the response fairer and more accurate before the conclusion.`),
            no(`It proves that light roofs do not really work, so the writer should change the claim.`, 'overgeneralizes'),
            no(`It is off topic because cleaning roofs has nothing to do with the article at all.`, 'misjudges-relevance'),
            no(`It states the main claim of the draft, which the rest of the paragraph supports.`, 'misidentifies-claim'),
          ],
          solution: `Sentence 10 reports a real drawback from the article, and sentence 11 shows the writer still finds the evidence convincing, which is an honest way to handle a limit. The drawback is only that roofs need cleaning, so it does not prove light roofs fail.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence 8 to explain the quotation. Which sentence works best?`,
          choices: [
            ok(`This shows that a cooler roof can save families money because their air conditioners run less.`),
            no(`This shows that apartment buildings use more electricity than houses do.`, 'unsupported-inference'),
            no(`This shows that one fifth is too small an amount for anyone to notice.`, 'misreads-text'),
            no(`This shows that air conditioners break down more often during the summer.`, 'unsupported-inference'),
          ],
          solution: `Sentence 7 says residents ran air conditioners less, and sentence 8 shows lower bills, so the best explanation links the two as saved money. Nothing in the draft compares apartments to houses, so that choice goes beyond the evidence.`,
        },
      ],
    },
  ],
}

export default skill
