import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g10-writing-with-evidence',
  subject: 'writing',
  grade: 10,
  group: 'Composition',
  name: 'Writing About Texts with Evidence',
  standards: ['W.9-10.9'],
  passages: [
    {
      code: 'wg10-writing-with-evidence-p01',
      title: 'Draft: The Shade Map',
      body: `(1) In her article "Hot Pavement, Cool Shade," geographer Amara Okafor reports on a summer study of sidewalk temperatures in the city of Millbrook. (2) Summer is the hottest season of the year in most places. (3) Okafor's team measured the same sidewalks at three in the afternoon on twenty clear days, comparing blocks with full tree cover to blocks with no trees at all. (4) She writes that shaded sidewalks were "on average nineteen degrees cooler to the touch than the bare concrete one street over." (5) This difference shows that tree cover changes the heat people actually feel, not just a number on a weather report.

(6) Okafor also points out who lives on the hottest blocks. (7) According to her map, the five neighborhoods with the least shade were also the ones with the fewest parks and the most bus stops without shelters. (8) ____, people waiting for buses in those areas stand on the hottest ground in the city for the longest time. (9) Okafor notes that her favorite tree in the study was a tall sycamore near the public library. (10) This pattern suggests that shade is not shared equally, and that planting trees could ease the heat where people need relief most.

(11) In conclusion, trees are nice to have on a street.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should replace sentence 2 so that the draft states a clear claim its evidence supports?`,
          choices: [
            ok(`Okafor's study shows that street trees lower the heat people feel and that a lack of shade falls hardest on certain neighborhoods.`),
            no(`Okafor's article is about sidewalks, trees and temperatures in a city called Millbrook during one summer.`, 'topic-not-claim'),
            no(`Every city in the country should plant a tree on every block before next summer begins.`, 'opinion-not-analysis'),
            no(`Concrete absorbs sunlight during the day and slowly releases that heat during the night.`, 'off-topic-fact'),
          ],
          solution: `Sentences 3 through 10 describe how shade cools sidewalks and how shade is unevenly shared, so the claim about both ideas fits the evidence. The choice about the article's subject only names a topic and makes no point that evidence could prove.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the analysis?`,
          choices: [
            ok(`Sentence 9, because Okafor's favorite tree says nothing about heat or how shade is shared.`),
            no(`Sentence 4, because the quotation repeats the measurements described in sentence 3.`, 'removes-key-evidence'),
            no(`Sentence 7, because details about bus stops belong in a different essay.`, 'removes-key-evidence'),
            no(`Sentence 10, because it gives the writer's ideas instead of facts from the article.`, 'removes-analysis'),
          ],
          solution: `Sentence 9 is a personal detail with no link to temperature or to which neighborhoods lack shade. Sentence 10 is the writer's explanation of what the evidence means, which an evidence-based response needs.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 8?`,
          choices: [
            ok(`As a result`),
            no(`On the other hand`, 'false-contrast'),
            no(`Before the study began`, 'wrong-time-relationship'),
            no(`Despite this pattern`, 'reversed-logic'),
          ],
          solution: `Sentence 8 describes a consequence of sentence 7: because the least shaded areas also lack bus shelters, riders stand on hot ground, so "As a result" fits. "On the other hand" signals a contrast, but sentence 8 continues the same point.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Okafor's data show that shade makes sidewalks far cooler and that the neighborhoods with the least of it could gain the most from new trees.`),
            no(`Okafor's team measured the same sidewalks at three in the afternoon on twenty clear days during the summer.`, 'evidence-without-analysis'),
            no(`Planting trees would completely solve every heat problem in Millbrook and in every other city as well.`, 'overgeneralization'),
            no(`Trees are also important because they give birds and squirrels a safe place to build their nests.`, 'off-topic-detail'),
          ],
          solution: `A strong conclusion restates the claim and ties together both parts of the evidence, the cooling effect and the uneven shade. The choice about solving every heat problem goes far beyond what Okafor's study measured.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to add one more piece of evidence from Okafor's article to support the point in sentences 6 through 8. Which detail would be most relevant?`,
          choices: [
            ok(`The busiest bus stop in Millbrook, used by about 900 riders a day, has no tree within a full block of it.`),
            no(`Okafor's team bought its surface thermometers with a grant from the local university.`, 'irrelevant-detail'),
            no(`Okafor grew up in a coastal town where summers were cool and breezy.`, 'irrelevant-detail'),
            no(`Many other cities around the world have also studied summer heat on their streets.`, 'too-general'),
          ],
          solution: `The paragraph argues that riders in unshaded areas face the most heat, and a busy stop with no nearby tree is direct, specific support for that point. The detail about other cities is too vague to show anything about Millbrook's shade.`,
        },
      ],
    },
    {
      code: 'wg10-writing-with-evidence-p02',
      title: 'Draft: Rowing in Time',
      body: `(1) In Rosa Delgado's short story "The Long Stroke," a ninth grader named Mei joins her school's rowing team expecting to win races on strength alone. (2) Rowing is a sport that takes place on rivers and lakes. (3) Early in the story, Mei pulls her oar harder than anyone else, and the coach tells her, "Your power is real, but right now it is fighting the boat." (4) This comment shows that Mei's effort is actually slowing the team down, because she is out of rhythm with the other rowers. (5) Mei is frustrated and spends a whole practice "glaring at the back of Tessa's head," blaming her teammate for the uneven strokes.

(6) The turning point comes during a foggy morning practice when Mei cannot see the shore. (7) With nothing else to watch, she listens to the oars and notices that the boat glides fastest when every blade enters the water at the same moment. (8) ____, she stops forcing each stroke and begins matching Tessa's timing. (9) The story ends with the crew finishing a race in second place, and Mei realizes she is "smiling at a loss for the first time." (10) Delgado also describes the bright yellow paint on the team's boat.

(11) Mei learns a lot in this story.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence should replace sentence 2 to state a claim that the rest of the draft supports?`,
          choices: [
            ok(`Delgado shows Mei growing from a rower who trusts only her own strength into one who values moving in time with her team.`),
            no(`Delgado's story is about a girl named Mei who joins a rowing team at her high school.`, 'topic-not-claim'),
            no(`Mei is the strongest and most talented athlete on her team throughout the whole story.`, 'unsupported-inference'),
            no(`Rowing is one of the hardest sports in high school, so more students should try it.`, 'opinion-not-analysis'),
          ],
          solution: `The draft traces Mei's change from forcing strokes to matching her crew, so a claim about that growth fits. The choice that Mei is the most talented athlete is not supported, since the coach says her power is "fighting the boat."`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which sentence does not help the writer's analysis and should be removed?`,
          choices: [
            ok(`Sentence 10, because the color of the boat has nothing to do with how Mei changes.`),
            no(`Sentence 3, because the coach is a minor character in the story.`, 'removes-key-evidence'),
            no(`Sentence 7, because the fog is only a description of the setting.`, 'removes-key-evidence'),
            no(`Sentence 9, because the crew does not win the race at the end.`, 'removes-key-evidence'),
          ],
          solution: `Sentence 10 adds a visual detail with no link to Mei's growth. Sentence 7 is tempting to cut as mere setting, but the fog is what forces Mei to listen and discover the rhythm, so it is key evidence.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 8?`,
          choices: [
            ok(`From that moment on`),
            no(`Nevertheless`, 'false-contrast'),
            no(`For instance`, 'wrong-relationship'),
            no(`Earlier in the season`, 'wrong-time-relationship'),
          ],
          solution: `Sentence 8 describes what Mei does after her discovery in sentence 7, so "From that moment on" shows the change in time. "Nevertheless" would suggest she changes in spite of the discovery, which reverses the logic.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Mei's smile after a loss shows that she now measures success by how well the crew moves together, not by her own strength.`),
            no(`Mei's crew finishes the final race of the story in second place after a long season of practice.`, 'evidence-without-analysis'),
            no(`Mei will probably become the captain of the team next year and lead the crew to a championship.`, 'unsupported-prediction'),
            no(`Stories about sports are popular with readers because many people enjoy watching athletes compete.`, 'off-topic-generalization'),
          ],
          solution: `The best conclusion uses the final quotation to show how Mei's idea of success has changed, tying back to the claim. The choice about becoming captain predicts events that the story never describes.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence 5, best explains how the quotation in sentence 5 supports the writer's analysis?`,
          choices: [
            ok(`Blaming Tessa shows that, at this point, Mei cannot yet see that the real problem is her own refusal to match the crew.`),
            no(`This shows that Tessa is the weakest rower on the team and is the true cause of the uneven strokes.`, 'unsupported-inference'),
            no(`Glaring at a teammate is rude, and a good athlete should always show respect during practice.`, 'judgment-not-analysis'),
            no(`This quotation appears near the beginning of the story, before the foggy morning practice.`, 'location-not-analysis'),
          ],
          solution: `The quotation matters because it shows Mei blaming someone else before she understands the rhythm problem, which sets up her later change. The choice blaming Tessa accepts Mei's view, even though the coach says Mei's own power is "fighting the boat."`,
        },
      ],
    },
    {
      code: 'wg10-writing-with-evidence-p03',
      title: 'Draft: Young Hands on the Telegraph',
      body: `(1) In "Messages on the Wire," historian Kofi Asante describes the telegraph office that opened in the river town of Larkfield in 1872. (2) Asante's article is about a telegraph office in a small town. (3) He explains that the office hired several operators who were only fifteen or sixteen years old, because young people learned the clicking code faster than most adults did. (4) According to Asante, the station manager wrote in his logbook that his youngest operator "could take down a message faster than I could read it aloud." (5) This record shows that the town relied on the skill of teenagers to keep its news and business moving.

(6) Asante gives more evidence of how much responsibility these operators carried. (7) During the spring flood of 1874, a sixteen-year-old operator named Hattie Brennan stayed at her station for two days, sending warnings to farms downstream. (8) ____ her messages, Asante reports, every family on the lower river reached high ground before the water rose. (9) The telegraph itself had been invented several decades before the Larkfield office opened. (10) Her story suggests that the young operators were not just helpers but people whose quick work protected the whole community.

(11) That is what I learned about the telegraph.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence should replace sentence 2 to give the draft a clear, arguable claim?`,
          choices: [
            ok(`Asante's article shows that Larkfield's teenage telegraph operators held real responsibility and that the town depended on their skill.`),
            no(`Asante's article describes a telegraph office that opened in Larkfield during the year 1872.`, 'topic-not-claim'),
            no(`Teenagers today should be allowed to work any job they want, just like the operators in Larkfield.`, 'opinion-not-analysis'),
            no(`The telegraph was one of the most important inventions of the nineteenth century around the world.`, 'off-topic-generalization'),
          ],
          solution: `Both paragraphs give evidence that the young operators were skilled and trusted, so this claim matches the draft. The choice about the office opening in 1872 only restates a fact from sentence 1 and makes no point.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not support the claim about Larkfield's operators?`,
          choices: [
            ok(`Sentence 9, because when the telegraph was invented says nothing about the young operators.`),
            no(`Sentence 4, because a logbook entry is less important than a historian's opinion.`, 'removes-key-evidence'),
            no(`Sentence 7, because the flood is a separate event from the daily work of the office.`, 'removes-key-evidence'),
            no(`Sentence 10, because it repeats information that appears earlier in the paragraph.`, 'removes-analysis'),
          ],
          solution: `Sentence 9 is a general history fact unrelated to the operators' skill or responsibility. Sentence 10 is the writer's explanation of the flood evidence, so removing it would leave the evidence unexplained.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which word or phrase best fills the blank at the start of sentence 8?`,
          choices: [
            ok(`Thanks to`),
            no(`Despite`, 'reversed-logic'),
            no(`Instead of`, 'false-contrast'),
            no(`Similar to`, 'wrong-relationship'),
          ],
          solution: `Families reached safety because of Brennan's warnings, so "Thanks to" shows that cause. "Despite" would mean the families escaped even though she sent warnings, which reverses the relationship.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`From a manager's logbook to a flood rescue, Asante's evidence shows that Larkfield trusted its teenage operators with work that truly mattered.`),
            no(`Hattie Brennan stayed at her station for two full days during the spring flood of 1874 in Larkfield.`, 'evidence-without-analysis'),
            no(`Teenagers were the only reason that the town of Larkfield survived at all during the nineteenth century.`, 'overgeneralization'),
            no(`Today, people send messages by phone instead, which is much faster than using a telegraph.`, 'off-topic-detail'),
          ],
          solution: `The best conclusion links both pieces of evidence back to the claim about trust and responsibility. The choice saying teenagers were the only reason the town survived exaggerates far beyond Asante's evidence.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `A classmate suggests replacing sentence 7 with "The operators worked very hard during emergencies." Why is the original sentence 7 the stronger choice?`,
          choices: [
            ok(`It gives a specific event with a name, a date and an outcome, which proves the point better than a general statement.`),
            no(`It is longer, and longer sentences always make an essay sound more convincing to readers.`, 'length-equals-strength'),
            no(`It includes a direct quotation from Hattie Brennan describing how she felt during the flood.`, 'misreads-passage'),
            no(`It tells the reader how the telegraph machine itself worked, which explains the operators' skill.`, 'misreads-passage'),
          ],
          solution: `Specific, documented details make evidence convincing, and sentence 7 names who acted, when and what happened. Sentence 7 contains no quotation from Brennan, so the choice claiming it does misreads the draft.`,
        },
      ],
    },
    {
      code: 'wg10-writing-with-evidence-p04',
      title: 'Draft: The Silent Distraction',
      body: `(1) In her report "The Buzz in the Background," psychologist Hana Kobayashi describes an experiment with 240 students at Ridgeview High School. (2) Many teenagers own phones and use them every day. (3) Each student read the same science article and then answered questions about it, but some kept their phones face down on the desk while others left them in a locker down the hall. (4) Kobayashi reports that the students whose phones were in lockers scored an average of 14 percent higher on the questions. (5) Because the phones on the desks were silent and never lit up, this result suggests that simply having a phone in sight pulls some attention away from reading.

(6) Kobayashi's interviews with the students point in the same direction. (7) Several students in the desk group admitted that they "kept wondering if something had come in," even though they knew their phones were set to silent. (8) ____, students in the locker group described the article as easy to follow, although both groups read identical text. (9) One student in the study said she prefers reading paper books to reading on a screen. (10) Taken together, the scores and the students' own words show that a phone does not have to ring to be a distraction.

(11) So phones are bad.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence should replace sentence 2 so that the draft begins with a claim its evidence supports?`,
          choices: [
            ok(`Kobayashi's experiment suggests that a phone can weaken reading focus even when it stays silent on the desk.`),
            no(`Kobayashi's report describes an experiment that took place at a high school called Ridgeview.`, 'topic-not-claim'),
            no(`Phones should be banned from every school in the country starting next year.`, 'opinion-not-analysis'),
            no(`Science articles are often harder to read than stories because they use technical words.`, 'off-topic-generalization'),
          ],
          solution: `Both the test scores and the interviews support the idea that a silent phone still distracts, so this claim fits. The choice about banning phones is a policy opinion the experiment does not test.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it is not relevant to the claim?`,
          choices: [
            ok(`Sentence 9, because a preference for paper books does not show whether a nearby phone distracts readers.`),
            no(`Sentence 4, because a percentage is harder for readers to picture than a description.`, 'removes-key-evidence'),
            no(`Sentence 7, because students' own words are less reliable than test scores.`, 'removes-key-evidence'),
            no(`Sentence 5, because it explains the evidence rather than adding new facts.`, 'removes-analysis'),
          ],
          solution: `Sentence 9 concerns paper versus screens, not whether a phone in sight affects focus. Sentence 5 is the writer's reasoning about why the score gap matters, so it should stay.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 8?`,
          choices: [
            ok(`By contrast`),
            no(`As a result`, 'confuses-cause-effect'),
            no(`For example`, 'wrong-relationship'),
            no(`To sum up the study`, 'premature-conclusion'),
          ],
          solution: `Sentence 8 compares the locker group's experience with the desk group's worry in sentence 7, so "By contrast" fits. "As a result" is tempting, but the locker group's ease was not caused by the desk group's wondering.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Kobayashi's findings suggest that students who want to read with full focus should put their phones out of sight, not just on silent.`),
            no(`Kobayashi's study included 240 students who all read the same science article and answered questions.`, 'evidence-without-analysis'),
            no(`Phones are the main reason that students around the world struggle in every school subject.`, 'overgeneralization'),
            no(`Phones can also be helpful because students use them to check the weather and call home.`, 'off-topic-detail'),
          ],
          solution: `The best conclusion draws a reasonable lesson directly from the experiment's comparison between silent phones in sight and phones out of sight. The choice about every school subject claims far more than one reading study can show.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Which detail from Kobayashi's report, if added, would most strengthen the conclusion that the phones caused the difference in scores?`,
          choices: [
            ok(`The two groups had earned nearly the same scores on a reading test given one week before the experiment.`),
            no(`The science article that every student read was about ocean currents and was 900 words long.`, 'irrelevant-detail'),
            no(`Kobayashi has studied attention and memory in teenagers for more than ten years.`, 'appeal-to-authority'),
            no(`Most of the students in the experiment had owned their own phones for at least two years.`, 'irrelevant-detail'),
          ],
          solution: `If both groups started as equally strong readers, the score gap is more likely due to the phones than to differences between the students. Kobayashi's experience makes her credible but does not rule out other explanations for this particular result.`,
        },
      ],
    },
    {
      code: 'wg10-writing-with-evidence-p05',
      title: 'Draft: Dark Towers, Safe Birds',
      body: `(1) In his article "Lights Out for the Flyway," ornithologist Rafael Moreno examines a program in the city of Port Winslow that asks office towers to switch off their lights after eleven at night during bird migration season. (2) Moreno explains that many songbirds migrate at night and use the stars to find their way. (3) Bright windows can confuse these birds, drawing them toward buildings where they circle until they are exhausted or strike the glass. (4) ____, the program targets the exact hours and weeks when birds are most at risk.

(5) The results Moreno reports are striking. (6) Before the program, volunteers walking downtown each morning found an average of 31 injured or stunned birds per week during migration. (7) In the first two seasons with the lights off, that number fell to 9. (8) Moreno adds that one building manager joked that the dark tower "finally looks like it is getting some sleep." (9) Moreno also notes that the volunteers used the same routes and the same start time every morning, both before and after the program began.

(10) Moreno's evidence shows that a simple, inexpensive change can protect birds.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `The draft never states a clear claim near the beginning. Which sentence, added after sentence 1, would best state one?`,
          choices: [
            ok(`Moreno's evidence shows that turning off tower lights at night sharply reduces the number of migrating birds harmed downtown.`),
            no(`Moreno's article is about office buildings and birds in a city called Port Winslow.`, 'topic-not-claim'),
            no(`Songbirds are some of the most beautiful animals, and everyone should learn to identify them.`, 'opinion-not-analysis'),
            no(`Office towers in large cities use a great deal of electricity for lights and heating.`, 'off-topic-fact'),
          ],
          solution: `The draft's evidence, the drop from 31 to 9 harmed birds, supports a claim that dark towers protect migrating birds. The choice naming the article's subject identifies a topic but makes no point to prove.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 4?`,
          choices: [
            ok(`By switching lights off only at night during migration`),
            no(`Although most songbirds rarely fly after dark`, 'contradicts-passage'),
            no(`During the rest of the year, when few birds pass`, 'wrong-time-relationship'),
            no(`Unlike every other city in the world`, 'unsupported-claim'),
          ],
          solution: `Sentences 2 and 3 explain that birds are at risk at night during migration, so this phrase connects that danger to how the program works. The choice saying songbirds rarely fly after dark contradicts sentence 2.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which sentence adds the least support to the writer's argument and could be removed?`,
          choices: [
            ok(`Sentence 8, because a manager's joke about the tower does not show anything about birds being protected.`),
            no(`Sentence 9, because details about the volunteers' routes are not about birds at all.`, 'removes-key-evidence'),
            no(`Sentence 6, because the number of birds before the program is no longer important.`, 'removes-key-evidence'),
            no(`Sentence 3, because it describes a problem instead of the solution the program offers.`, 'removes-key-evidence'),
          ],
          solution: `The quotation in sentence 8 is entertaining but proves nothing about bird safety. Sentence 9 is tempting to cut, but it shows the counts were collected the same way, which makes the before and after numbers trustworthy.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 7, best explains how the evidence in sentences 6 and 7 supports the writer's point?`,
          choices: [
            ok(`Since the weekly count dropped by more than two thirds once the towers went dark, the darker skyline appears to be protecting many birds.`),
            no(`This proves that every bird flying over Port Winslow is now completely safe from all harm.`, 'overgeneralization'),
            no(`Thirty-one birds a week is a large number, and nine birds a week is a smaller number.`, 'restates-without-analysis'),
            no(`Volunteers in many cities enjoy spending their mornings walking and looking for wildlife.`, 'off-topic-detail'),
          ],
          solution: `A good explanation interprets the numbers and connects them to the claim that dark towers help birds. The choice about every bird being completely safe overstates the evidence, since 9 birds a week were still harmed.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `What is the main purpose of sentence 9 in the draft?`,
          choices: [
            ok(`To show the counts were gathered the same way each time, so the drop can be trusted rather than blamed on a change in method.`),
            no(`To introduce a new claim that volunteers are more important to the program than the building managers.`, 'misreads-purpose'),
            no(`To give a second example of how bright windows confuse birds that migrate at night.`, 'misreads-purpose'),
            no(`To suggest that Moreno doubts whether the lights out program has actually helped any birds.`, 'misreads-purpose'),
          ],
          solution: `Sentence 9 explains that the method stayed the same, which strengthens the comparison in sentences 6 and 7. It introduces no new claim about volunteers, and nothing in it shows Moreno doubting the program.`,
        },
      ],
    },
    {
      code: 'wg10-writing-with-evidence-p06',
      title: 'Draft: A Quilt Full of People',
      body: `(1) In Leilani Kahale's poem "Patchwork," the speaker describes a quilt her grandmother sewed from the family's old clothing. (2) The poem has four stanzas and does not rhyme. (3) In the first stanza, the speaker notices "my father's blue work shirt, / cut into a square no bigger than my hand." (4) By naming whose clothing each patch came from, the speaker shows that the quilt holds pieces of people, not just pieces of fabric. (5) Later, she points to "the yellow of a dress my aunt outgrew / the summer she learned to swim," which connects a scrap of cloth to a single family memory.

(6) The final stanza shifts from looking at the quilt to using it. (7) On a cold night, the speaker wraps the quilt around her shoulders and says she is "wearing the whole family at once." (8) This image suggests that the memories stitched into the quilt can still comfort the speaker in the present. (9) ____, the poem presents the quilt as a way for a family's past to stay close and useful. (10) My own grandmother knits scarves for everyone in our family every winter.

(11) Kahale is a good poet.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should replace sentence 2 to state a claim about the poem that the draft supports?`,
          choices: [
            ok(`Kahale uses the quilt to show that family memories can be kept safe and carried into the present.`),
            no(`Kahale's poem describes a quilt that a grandmother made out of clothing.`, 'topic-not-claim'),
            no(`Sewing a quilt by hand takes many weeks of careful and patient work.`, 'off-topic-fact'),
            no(`Every family should save its old clothes instead of giving them away.`, 'opinion-not-analysis'),
          ],
          solution: `The draft argues that the patches stand for people and memories that still comfort the speaker, so this claim fits. The choice describing the quilt only summarizes the poem's subject without making a point.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which sentence should the writer remove, and why?`,
          choices: [
            ok(`Sentence 10, because a story about the writer's grandmother is not evidence from Kahale's poem.`),
            no(`Sentence 5, because it repeats the same idea already shown by the quotation in sentence 3.`, 'removes-key-evidence'),
            no(`Sentence 8, because it gives the writer's interpretation instead of the poet's exact words.`, 'removes-analysis'),
            no(`Sentence 6, because it describes the order of the poem instead of its meaning.`, 'removes-key-evidence'),
          ],
          solution: `An analysis of a poem should use evidence from the poem, and sentence 10 is a personal detail. Sentence 5 is tempting to cut, but it adds a second patch tied to a specific memory, which builds sufficient evidence.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 9?`,
          choices: [
            ok(`Through these images`),
            no(`On the other hand`, 'false-contrast'),
            no(`For example`, 'wrong-relationship'),
            no(`Before the final stanza`, 'wrong-time-relationship'),
          ],
          solution: `Sentence 9 sums up what all the quoted images show, so "Through these images" links the evidence to the overall point. "For example" would introduce a new detail, but sentence 9 states a general conclusion.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`From the father's shirt to the speaker "wearing the whole family," Kahale turns a quilt into a lasting home for family memories.`),
            no(`The poem "Patchwork" was written by Leilani Kahale and has four stanzas that do not rhyme.`, 'summary-not-conclusion'),
            no(`Kahale must have had a very close family, since Kahale wrote a whole poem about a quilt.`, 'unsupported-inference'),
            no(`Quilts are a popular craft in many countries, and some are displayed in museums.`, 'off-topic-generalization'),
          ],
          solution: `The best conclusion recalls key evidence and restates the claim about memory. The choice about Kahale's own family assumes the speaker is the poet, which the draft never establishes.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `The writer first wrote sentence 7 as: The speaker is cold. "wearing the whole family at once." Why is the revised sentence 7 better?`,
          choices: [
            ok(`It sets up the moment and blends the quotation into a complete sentence, so readers know who says it and when.`),
            no(`It is shorter than the first version, and short sentences are always clearer for readers.`, 'length-equals-strength'),
            no(`It changes the poet's words slightly so that the quotation fits the writer's own style.`, 'misquotes-source'),
            no(`It moves the quotation to the start of the paragraph, where evidence should always appear.`, 'misreads-passage'),
          ],
          solution: `The first version drops a quotation fragment in with no lead-in, while the revision gives context and integrates the words smoothly. The revision does not alter Kahale's words, and quoting accurately is required.`,
        },
      ],
    },
    {
      code: 'wg10-writing-with-evidence-p07',
      title: 'Draft: Recess Before Lunch',
      body: `(1) In his article "Play First, Eat Second," nutrition researcher Sanjay Mehta reports on a year-long study at four elementary schools in Fairhaven County. (2) Two of the schools moved recess so that it came before lunch, while the other two kept recess after lunch. (3) Mehta's team weighed the food left on students' trays every Friday. (4) At the schools with recess first, students threw away 30 percent less fruit and vegetables than students at the other schools. (5) Mehta suggests that children who eat right before recess hurry through lunch to get outside, often leaving their vegetables behind.

(6) The study also includes evidence from the cafeteria staff. (7) One lunch monitor told Mehta's team that, after the change, students "actually sat down and ate instead of watching the clock." (8) ____, the schools that switched reported fewer students visiting the nurse with stomachaches in the afternoon. (9) Fairhaven County is well known for its apple orchards. (10) These details show that the order of the school day can shape how well students eat.

(11) Schools should think about recess.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the analysis?`,
          choices: [
            ok(`Sentence 9, because the county's orchards have nothing to do with when recess is scheduled.`),
            no(`Sentence 3, because explaining how food was measured is a minor detail.`, 'removes-key-evidence'),
            no(`Sentence 7, because a lunch monitor is not a trained researcher.`, 'removes-key-evidence'),
            no(`Sentence 10, because it states an opinion rather than a fact from the study.`, 'removes-analysis'),
          ],
          solution: `Sentence 9 is an unrelated fact about the county. Sentence 10 is the writer's explanation linking the evidence to the claim, so it belongs in the draft.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 8?`,
          choices: [
            ok(`In addition`),
            no(`However`, 'false-contrast'),
            no(`Because of the monitor's comment`, 'confuses-cause-effect'),
            no(`For the two schools that did not switch`, 'misreads-passage'),
          ],
          solution: `Sentence 8 adds another benefit at the switched schools, so "In addition" fits. The monitor's comment did not cause fewer stomachaches, so that phrase confuses a report with a cause.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Mehta's study suggests that moving recess before lunch helps students eat more of their meals, a small schedule change with real benefits.`),
            no(`Mehta's team weighed the leftover food on students' trays every Friday for an entire school year.`, 'evidence-without-analysis'),
            no(`Recess before lunch would make every student in the country healthy and successful in school.`, 'overgeneralization'),
            no(`Recess is also important because students need time to make friends and play outdoor games.`, 'off-topic-detail'),
          ],
          solution: `The best conclusion restates the claim and reflects the study's main finding about eating. The choice about every student becoming healthy and successful claims much more than one four-school study shows.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `A reader objects that the recess-first schools might simply have served tastier food. Which detail from Mehta's article, if added, would best answer this objection?`,
          choices: [
            ok(`All four schools served the same menu each day, prepared in the same county kitchen.`),
            no(`The study took place over an entire school year rather than just a few weeks.`, 'does-not-address-objection'),
            no(`Students at all four schools were allowed to bring lunch from home if they wished.`, 'does-not-address-objection'),
            no(`Mehta has written several popular books about healthy eating for families.`, 'appeal-to-authority'),
          ],
          solution: `If every school served identical food, taste cannot explain the difference in waste, so the schedule becomes the likely cause. The study's length is a strength, but it does nothing to rule out differences in the food.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `In sentence 5, why is it important that the writer says "Mehta suggests" instead of stating the explanation as a plain fact?`,
          choices: [
            ok(`The explanation is Mehta's interpretation of the data, not something the tray weights measured directly, so it should be credited to him.`),
            no(`Mehta did not take part in the study himself, so the writer is showing that Mehta disagrees with it.`, 'misreads-passage'),
            no(`Using a researcher's name in every sentence is required in any essay that uses evidence.`, 'overgeneralized-rule'),
            no(`The phrase shows that the writer believes the explanation is false and wants readers to doubt it.`, 'misreads-purpose'),
          ],
          solution: `The trays showed how much food was wasted, but the reason why is Mehta's reasoned guess, and attributing it keeps fact and interpretation separate. "Suggests" signals a careful claim, not disagreement or doubt.`,
        },
      ],
    },
    {
      code: 'wg10-writing-with-evidence-p08',
      title: 'Draft: Rain on the Rooftops',
      body: `(1) In "Every Drop on the Roof," engineer Farah Haddad describes how the dry hill town of Sela Verde began collecting rainwater from its rooftops. (2) Haddad explains that the town receives most of its yearly rain in only six weeks, and that this water once ran down the streets and into a dry riverbed. (3) In 2018, residents installed gutters and storage tanks on 400 homes. (4) ____, Haddad reports, the tanks held enough water to supply each household's garden for most of the dry season.

(5) Haddad gives several reasons the project worked. (6) The tanks were built by local workers using parts that could be repaired in town, so broken pipes did not have to wait for shipments from the city. (7) In addition, the town held workshops where families learned to clean their gutters before the rainy season. (8) Haddad writes that the workshops mattered because "a tank fed by a dirty roof soon becomes a tank no one wants to use." (9) Haddad has written two other articles about water in dry regions.

(10) Clearly, Haddad's article shows that rooftop tanks would work in every town in the world.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not help explain why the project worked?`,
          choices: [
            ok(`Sentence 9, because the number of articles Haddad has written is not evidence about Sela Verde.`),
            no(`Sentence 6, because details about repairs are less important than the amount of rain.`, 'removes-key-evidence'),
            no(`Sentence 8, because a quotation repeats what sentence 7 already says.`, 'removes-key-evidence'),
            no(`Sentence 2, because it describes the town before the project began.`, 'removes-key-evidence'),
          ],
          solution: `Sentence 9 is about the author's career, not the project. Sentence 2 is needed because it shows the problem the tanks solved, which makes the results meaningful.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 4?`,
          choices: [
            ok(`By the end of the first rainy season`),
            no(`Before the tanks were installed`, 'wrong-time-relationship'),
            no(`In contrast to the new gutters`, 'false-contrast'),
            no(`Despite collecting no rain at all`, 'contradicts-passage'),
          ],
          solution: `Sentence 4 reports the result after the tanks were installed in sentence 3, so a phrase showing time passing after installation fits. "Before the tanks were installed" is impossible, since the tanks could not hold water before they existed.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `The draft needs a claim that matches the second paragraph. Which sentence, added after sentence 1, would work best?`,
          choices: [
            ok(`Haddad's account shows that Sela Verde's tanks succeeded because the town paired repairable equipment with training for the families who used it.`),
            no(`Haddad's account describes the gutters and storage tanks that were installed on 400 homes in 2018.`, 'topic-not-claim'),
            no(`Haddad's account shows that Sela Verde receives far more rain each year than most other towns.`, 'contradicts-passage'),
            no(`Haddad's account proves that engineers are the most important workers in any small town.`, 'overgeneralization'),
          ],
          solution: `Paragraph 2 gives two reasons for success, local repairs and cleaning workshops, so the claim naming both fits. The choice about the 400 homes restates a detail from sentence 3 instead of making an arguable point.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Sentence 10 claims more than the evidence shows. Which revision is best supported by the draft?`,
          choices: [
            ok(`Haddad's article suggests that rooftop tanks can serve a dry town well when parts are repairable locally and families know how to care for them.`),
            no(`Haddad's article shows that rooftop tanks would work in most towns, no matter how much rain they receive.`, 'overgeneralization'),
            no(`Haddad's article shows that Sela Verde no longer has any water problems of any kind.`, 'overgeneralization'),
            no(`Haddad's article suggests that the workshops were unnecessary once the tanks were built.`, 'contradicts-passage'),
          ],
          solution: `The revision limits the claim to the conditions the evidence actually describes, a dry town with local repairs and trained families. The "most towns" choice still overreaches, since one town's results cannot show that tanks work regardless of rainfall.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence 8, best explains how the quotation supports the writer's point?`,
          choices: [
            ok(`Haddad's warning shows that the tanks were only useful if families kept the water clean, which is why the workshops mattered as much as the tanks.`),
            no(`This quotation is the longest one in Haddad's article, so it must be the most important idea in the article.`, 'length-equals-strength'),
            no(`Dirty water can carry many kinds of bacteria and minerals that are harmful for people to drink.`, 'outside-knowledge'),
            no(`Haddad means that the town should stop using tanks and find a cleaner source of water instead.`, 'misreads-quotation'),
          ],
          solution: `The quotation explains why cleaning mattered, so the best explanation ties it to the claim that training was a key reason for success. The fact about bacteria may be true, but it relies on outside knowledge and does not connect the quotation to the writer's claim.`,
        },
      ],
    },
  ],
}

export default skill
