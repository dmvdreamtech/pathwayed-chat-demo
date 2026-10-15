import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g11-writing-with-evidence',
  subject: 'writing',
  grade: 11,
  group: 'Composition',
  name: 'Writing About Texts with Evidence',
  standards: ['W.11-12.9'],
  passages: [
    {
      code: 'wg11-writing-with-evidence-p01',
      title: 'Draft: What the Lichen Reveals',
      body: `(1) In her article "Gray Crust, Clean Air," ecologist Ingrid Solberg describes a five-year survey of the lichens growing on street trees in the city of Port Avalon. (2) Lichens are interesting organisms that come in many colors and shapes. (3) Solberg explains that leafy lichens absorb water and nutrients directly from the air, so they cannot filter out pollutants the way rooted plants can. (4) Because of this, she notes, "the leafy species are the first to disappear when nitrogen levels rise and the last to return when they fall." (5) This detail suggests that the presence or absence of certain lichens can tell residents something real about the air they breathe.

(6) Solberg's survey data support this idea. (7) Her team recorded leafy lichens on only 12 percent of trees along the harbor highway but on 64 percent of trees in a park two miles inland. (8) ____, after the city replaced its diesel buses with electric ones in 2019, leafy lichens reappeared on several trees along the main bus route within three years. (9) The change on the bus route matters because it shows lichens responding to one specific improvement, not just to the many differences between a park and a highway. (10) Solberg also mentions that one oak near the harbor is more than a century old.

(11) In the end, lichens are a good thing to have in a city.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should replace sentence 2 so that the draft states a clear claim its evidence supports?`,
          choices: [
            ok(`Solberg's survey shows that leafy lichens act as a living record of air quality because they react directly to pollution.`),
            no(`Solberg's article is mostly about lichens and the trees they grow on in one coastal city.`, 'topic-not-claim'),
            no(`Every city should plant more oak trees so that lichens have more places to grow.`, 'opinion-not-analysis'),
            no(`Lichens are made of a fungus and an alga living together as a single organism.`, 'off-topic-fact'),
          ],
          solution: `Sentences 3 through 9 all explain how lichens respond to pollution, so a claim about lichens recording air quality fits the evidence. The choice about the article's subject only names a topic and makes no point the evidence could prove.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the analysis?`,
          choices: [
            ok(`Sentence 10, because the age of one oak says nothing about how lichens reflect air quality.`),
            no(`Sentence 4, because a direct quotation from the article repeats what sentence 3 says.`, 'removes-key-evidence'),
            no(`Sentence 7, because percentages make the paragraph harder to read.`, 'removes-key-evidence'),
            no(`Sentence 9, because it explains evidence instead of giving new facts.`, 'removes-analysis'),
          ],
          solution: `Sentence 10 adds a fact about a tree's age that has no link to pollution or lichens. Sentence 9 is the writer's explanation of why the bus route evidence matters, which is exactly what an evidence-based response needs.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 8?`,
          choices: [
            ok(`Even more convincing`),
            no(`In contrast to these results`, 'false-contrast'),
            no(`As a result of the park data`, 'confuses-cause-effect'),
            no(`To summarize the article`, 'premature-conclusion'),
          ],
          solution: `Sentence 8 adds a second, stronger piece of evidence that agrees with sentence 7, and sentence 9 explains why it is stronger, so "Even more convincing" fits. The bus route finding does not contradict the park data, so "In contrast" signals the wrong relationship.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Solberg's survey shows that leafy lichens vanish near pollution and return when the air improves, making them a free record of a city's air.`),
            no(`Solberg's team found leafy lichens on 64 percent of the trees in a park two miles inland from the harbor highway.`, 'evidence-without-analysis'),
            no(`Lichens are clearly the most accurate way to measure air pollution, so cities can stop buying air sensors.`, 'overgeneralization'),
            no(`Many people walk past lichens every day without noticing them, which is a shame because they are beautiful.`, 'off-topic-opinion'),
          ],
          solution: `A strong conclusion restates the claim and ties together both kinds of evidence, disappearing near pollution and returning after improvement. The choice about replacing air sensors goes far beyond anything Solberg's survey shows.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `What is the main purpose of sentence 9 in the writer's argument?`,
          choices: [
            ok(`It explains why the bus route evidence is stronger, since a change on one street rules out other differences between a park and a highway.`),
            no(`It introduces a new claim that electric buses are cheaper to run than diesel buses.`, 'misreads-purpose'),
            no(`It shows that Solberg disagrees with the city's decision to replace its diesel buses.`, 'unsupported-inference'),
            no(`It repeats the survey percentages from sentence 7 so the reader remembers them.`, 'misreads-repetition'),
          ],
          solution: `A park and a highway differ in shade, soil and traffic, so sentence 7 alone could have other explanations; sentence 9 points out that the before and after change on one route isolates the effect of cleaner air. The draft never says Solberg disagrees with the bus decision.`,
        },
      ],
    },
    {
      code: 'wg11-writing-with-evidence-p02',
      title: 'Draft: The School at Lock Nine',
      body: `(1) Historian Kwame Adjei's essay "The School at Lock Nine" tells the story of a night school that operated beside the Merrow Canal from 1846 to 1871. (2) Adjei argues that the school lasted twenty-five years because its founders built it around the lives of canal workers instead of expecting the workers to adjust. (3) The founders held classes only in winter, when ice closed the canal and the boat crews had no work. (4) Adjei also points out that the first lessons taught arithmetic through cargo weights and toll charges, problems the students faced every week on the water. (5) By tying lessons to work the students already knew, the founders gave tired crews a practical reason to attend.

(6) Attendance records support Adjei's reading. (7) According to Adjei, enrollment grew from nine students in the first winter to more than eighty by 1855. (8) Many of these students were teenagers who had left village schools early to work on the boats. (9) Canal boats in that period were usually pulled by mules walking along a towpath. (10) "I learned to read the toll book myself, and no clerk could cheat me after that." (11) ____`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not help explain why the school lasted?`,
          choices: [
            ok(`Sentence 9`),
            no(`Sentence 3`, 'removes-key-evidence'),
            no(`Sentence 5`, 'removes-analysis'),
            no(`Sentence 8`, 'removes-key-evidence'),
          ],
          solution: `Sentence 9 describes how canal boats were pulled, which has nothing to do with the school's success. Sentence 5 is the writer's explanation of why the lessons drew students, so cutting it would remove analysis the draft needs.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which detail from Adjei's essay, added after sentence 3, would best support the claim in sentence 2?`,
          choices: [
            ok(`Adjei notes that the founders moved the start of class to seven o'clock after crews said they could not arrive by six.`),
            no(`Adjei notes that the schoolhouse was built of gray stone taken from a quarry near the canal.`, 'irrelevant-detail'),
            no(`Adjei notes that one of the founders had been born in a large city far from the canal.`, 'irrelevant-detail'),
            no(`Adjei notes that the Merrow Canal was more than ninety miles long when it first opened.`, 'off-topic-fact'),
          ],
          solution: `Changing the class time because of the crews' schedules is direct evidence that the founders adjusted the school to the workers' lives. The building's stone has no connection to that claim.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which revision of sentence 10 best integrates the quotation into the draft?`,
          choices: [
            ok(`Adjei quotes a letter from a former student who explained the lessons' value: "I learned to read the toll book myself, and no clerk could cheat me after that."`),
            no(`Adjei says that "I learned to read the toll book myself, and no clerk could cheat me after that."`, 'misattributed-quotation'),
            no(`"I learned to read the toll book myself, and no clerk could cheat me after that," this shows the school was useful.`, 'comma-splice-unfixed'),
            no(`A quotation: "I learned to read the toll book myself, and no clerk could cheat me after that."`, 'dropped-quotation'),
          ],
          solution: `The first choice names the speaker and sets up the quotation with a complete sentence and a colon. Writing "Adjei says that" wrongly makes it sound as if Adjei himself learned to read the toll book.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which sentence would best fill the blank in sentence 11 by explaining how the quotation supports the claim?`,
          choices: [
            ok(`The student valued reading because it protected his pay, which shows that the school taught skills tied directly to canal work.`),
            no(`The student was clearly the smartest person who ever attended the school at Lock Nine.`, 'unsupported-inference'),
            no(`Toll books listed the charges that boats paid each time they passed through a lock.`, 'summary-not-analysis'),
            no(`Adjei's essay also includes several other letters written by students of the school.`, 'evidence-without-analysis'),
          ],
          solution: `The quotation shows a worker using reading to guard his earnings, so the first choice connects it to the claim about lessons built around canal life. Defining a toll book only adds information and never explains why the quotation matters.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Sentence 7 shows that enrollment grew, but by itself it does not prove the claim in sentence 2. Which revision would make this evidence support the claim most effectively?`,
          choices: [
            ok(`Add a sentence explaining how the winter schedule and practical lessons drew those new students to the school.`),
            no(`Add the exact enrollment for every winter from 1846 to 1871 so the growth is shown in full detail.`, 'more-data-not-analysis'),
            no(`Move sentence 7 to the start of the draft so the reader sees the enrollment numbers first.`, 'reorder-not-explain'),
            no(`Replace sentence 7 with a description of the classroom and the desks the students used.`, 'irrelevant-detail'),
          ],
          solution: `Growth shows the school was popular but not why, so the writer must connect the numbers to the schedule and lessons named in the claim. Adding more yearly numbers gives more data without explaining the cause.`,
        },
      ],
    },
    {
      code: 'wg11-writing-with-evidence-p03',
      title: 'Draft: The Bell on the Last Ferry',
      body: `(1) In Delphine Osei's short story "The Last Ferry to Calloway," sixteen-year-old Marisol spends a summer helping her grandfather run a small passenger ferry. (2) At first Marisol treats the job as a chore she must finish before she can see her friends. (3) Osei writes that Marisol "rang the departure bell the way someone slams a door, quick and without looking." (4) The comparison to a slammed door shows that Marisol wants the task over with and gives no thought to the passengers who depend on the signal.

(5) By the end of the story, the bell means something different to her. (6) When her grandfather's hands grow too stiff to steer, Marisol takes the wheel for the final crossing of the season. (7) Before leaving the dock, she "waited until the last runner from the bakery reached the ramp, then rang the bell twice, slowly, so the whole harbor could hear." (8) Ferries have carried passengers across rivers and bays for thousands of years. (9) The slow, careful ringing contrasts sharply with the hurried ringing at the start of the story. (10) This shows that Marisol changed.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `The writer wants to add a claim after sentence 1. Which sentence states the claim the draft best supports?`,
          choices: [
            ok(`Osei uses the ferry bell to show Marisol growing from a reluctant helper into someone who takes responsibility for others.`),
            no(`Osei's story takes place on a ferry that carries passengers to a town called Calloway.`, 'topic-not-claim'),
            no(`Osei shows that working with family members is always harder than working with strangers.`, 'unsupported-inference'),
            no(`Osei should have explained why Marisol's grandfather's hands became too stiff to steer.`, 'opinion-not-analysis'),
          ],
          solution: `Both paragraphs track how Marisol rings the bell, first carelessly and then carefully, so a claim about the bell showing her growth fits. The setting choice only names where the story happens and makes no arguable point.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which sentence interrupts the analysis and should be removed?`,
          choices: [
            ok(`Sentence 8`),
            no(`Sentence 4`, 'removes-analysis'),
            no(`Sentence 6`, 'removes-key-evidence'),
            no(`Sentence 9`, 'removes-analysis'),
          ],
          solution: `Sentence 8 gives a general fact about ferries that says nothing about Marisol or the bell. Sentence 4 explains the slammed door comparison, which is the heart of the first paragraph's analysis.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which revision of sentence 10 best explains how the evidence in sentences 7 and 9 supports the writer's analysis?`,
          choices: [
            ok(`By waiting for the late runner and ringing so everyone can hear, Marisol shows she now sees the bell as a duty to every passenger.`),
            no(`Marisol rang the bell twice, slowly, after the last runner from the bakery reached the ramp before the crossing.`, 'summary-not-analysis'),
            no(`Marisol will probably take over the ferry for good and run it for the rest of her life.`, 'unsupported-inference'),
            no(`The bell is the most important object in the story, and readers should pay close attention to it.`, 'vague-explanation'),
          ],
          solution: `The first choice explains what the waiting and the slow ringing reveal about Marisol's new sense of responsibility. The second choice only retells the events in sentence 7 without saying what they show.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which quotation from the story, added after sentence 6, would best strengthen the second paragraph?`,
          choices: [
            ok(`"She counted the passengers twice before untying the rope, the way her grandfather always had."`),
            no(`"The water by the dock was green and full of floating willow leaves."`, 'description-not-relevant'),
            no(`"Her friends waved from the beach as the ferry slid past the point."`, 'irrelevant-detail'),
            no(`"The ferry's engine was older than Marisol's father and twice as loud."`, 'description-not-relevant'),
          ],
          solution: `Counting the passengers twice is another careful act that shows Marisol taking responsibility, which is the paragraph's point. The description of the water sets a scene but says nothing about how Marisol has changed.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Why is it more effective for the writer to quote sentence 3 directly than to paraphrase it?`,
          choices: [
            ok(`Sentence 4 analyzes the exact comparison "the way someone slams a door," so a paraphrase would lose the wording being interpreted.`),
            no(`Direct quotations always count as stronger evidence than paraphrases in any kind of writing.`, 'overgeneralization'),
            no(`A paraphrase would make the first paragraph too short to count as a full paragraph.`, 'irrelevant-reason'),
            no(`Quoting the line proves that Marisol's friends were waiting for her on the beach.`, 'misreads-text'),
          ],
          solution: `The writer's analysis depends on Osei's specific simile, so the precise words must appear for sentence 4 to make sense. Quotations are not always stronger; they are best when the exact language is what the writer analyzes.`,
        },
      ],
    },
    {
      code: 'wg11-writing-with-evidence-p04',
      title: 'Draft: Waiting Less, Riding More',
      body: `(1) In her study "Waiting Less, Riding More," transportation researcher Fatima Haddad examines what happened after the city of Brennick installed arrival-time screens at 140 bus stops. (2) Haddad argues that the screens increased ridership mainly by making waiting feel shorter, even though buses did not actually arrive more often. (3) Her team found that the average wait stayed almost the same, about nine minutes, before and after the screens went up. (4) Yet in a rider survey, people at stops with screens estimated their wait at six minutes, while people at stops without screens guessed thirteen. (5) ____

(6) Haddad's ridership numbers point the same way. (7) Over two years, weekday boardings rose 11 percent at stops with screens and only 2 percent at stops without them. (8) One rider told the survey team that the screens were "the best thing the city has done in a decade." (9) Haddad notes that all 140 screens together cost the city less than a single new bus. (10) Still, Haddad admits that the stops chosen for screens were often busier to begin with, which could explain part of the difference in boardings.

(11) Overall, the screens seem pretty good.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence best fills the blank in sentence 5 by explaining the evidence in sentences 3 and 4?`,
          choices: [
            ok(`This gap suggests that knowing when the bus will arrive makes the same nine minutes feel far shorter to riders.`),
            no(`This gap suggests that buses arrived much more often at the stops that had arrival-time screens.`, 'contradicts-evidence'),
            no(`This survey was given to riders at many different bus stops across the city of Brennick.`, 'summary-not-analysis'),
            no(`This gap suggests that riders at stops without screens were simply less honest in the survey.`, 'unsupported-inference'),
          ],
          solution: `Actual waits were the same, but riders with screens felt they waited less, which supports Haddad's claim about perceived waiting. The choice saying buses came more often contradicts sentence 3.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not support the claim about why ridership rose?`,
          choices: [
            ok(`Sentence 9`),
            no(`Sentence 3`, 'removes-key-evidence'),
            no(`Sentence 7`, 'removes-key-evidence'),
            no(`Sentence 10`, 'removes-counterevidence'),
          ],
          solution: `The cost of the screens is interesting but says nothing about how they changed waiting or ridership. Sentence 10 is a limitation Haddad admits, and acknowledging it makes the response more honest and accurate.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Why is sentence 8 the weakest evidence in the second paragraph?`,
          choices: [
            ok(`It is one rider's general praise and does not show how the screens changed waiting or ridership.`),
            no(`It is a direct quotation, and quotations should never appear in a research response.`, 'overgeneralization'),
            no(`It contradicts the ridership numbers reported in sentence 7.`, 'misreads-text'),
            no(`It comes from Haddad's own survey, so it cannot be trusted at all.`, 'dismisses-source'),
          ],
          solution: `A single enthusiastic opinion is not sufficient evidence for a claim about how screens raise ridership across 140 stops. The quotation does not contradict sentence 7; it simply adds little.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Haddad's study suggests that screens raised ridership by changing how waits felt, though busier stops may explain some of the gain.`),
            no(`Haddad's study proves that arrival-time screens will raise ridership in every city that installs them.`, 'overgeneralization'),
            no(`Weekday boardings rose 11 percent at stops with screens and 2 percent at stops without them.`, 'evidence-without-analysis'),
            no(`Haddad's study shows that Brennick should spend its money on new buses instead of screens.`, 'unsupported-inference'),
          ],
          solution: `The first choice restates the claim and keeps the limitation from sentence 10, so it matches what the evidence can support. Claiming the result holds in every city stretches one study far beyond its data.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `How should the writer handle the limitation in sentence 10?`,
          choices: [
            ok(`Keep it, and point out that the survey about how waits felt still supports the claim even if busy stops grew faster.`),
            no(`Delete it, because mentioning any weakness in a source makes the whole response less convincing.`, 'hides-counterevidence'),
            no(`Keep it, and conclude that the screens probably had no effect on ridership at all.`, 'overcorrects'),
            no(`Move it to the first sentence of the draft so that readers see the problem right away.`, 'reorder-not-explain'),
          ],
          solution: `The limitation weakens only the boarding numbers, while the survey evidence in sentences 3 and 4 is untouched, so the writer can acknowledge it and lean on the stronger evidence. Deleting it would hide a point Haddad herself admits.`,
        },
      ],
    },
    {
      code: 'wg11-writing-with-evidence-p05',
      title: 'Draft: Why Halvern Keeps Its Rowers',
      body: `(1) For my research paper, I investigated why the Halvern Rowing Club keeps far more of its first-year rowers than other clubs in the region. (2) I used three sources: a club report by coach Tavita Leaupepe, a regional survey of rowing clubs by researcher Daniel Abebe, and interviews I conducted with four current rowers. (3) Leaupepe's report says the club pairs every new rower with an experienced partner for the first season. (4) Leaupepe's report also says new rowers stay because the club lets them choose morning or evening practices. (5) Leaupepe's report adds that the club "never cuts a beginner for being slow." (6) According to Leaupepe's report, these policies are the reason 81 percent of new rowers return for a second year.

(7) Abebe's survey of twenty clubs found that the average return rate for new rowers is 46 percent. (8) His survey also found that clubs with flexible practice times kept more new rowers than clubs with a single fixed schedule. (9) Three of the four rowers I interviewed said that their partner was the main reason they came back. (10) One rower, Seo-yeon Park, said she nearly quit after tipping her boat in her first week but stayed because her partner "made it feel like a normal part of learning."

(11) ____`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `What is the main weakness of the first paragraph (sentences 3 to 6)?`,
          choices: [
            ok(`Every point comes from the club's own report, which may present the club in a favorable light.`),
            no(`It uses too many sources, which makes the paragraph confusing and hard to follow.`, 'misidentifies-problem'),
            no(`It never states a percentage, so the reader cannot judge how many rowers return.`, 'misreads-text'),
            no(`It quotes the coach directly, and quotations from coaches are not allowed.`, 'invented-rule'),
          ],
          solution: `Sentences 3 through 6 all rely on Leaupepe's report, a single source written by the club itself. The paragraph does give a percentage (81 percent in sentence 6), so that choice misreads the draft.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which revision of sentence 4 best uses the writer's other sources to support the point it makes?`,
          choices: [
            ok(`Abebe's survey backs up Leaupepe's point about schedules, since clubs with flexible practice times kept more new rowers than clubs with one fixed time.`),
            no(`Leaupepe's report also says, once again, that new rowers stay because the club lets them choose morning or evening practices.`, 'repeats-single-source'),
            no(`Most rowers probably prefer evening practices because they are tired early in the morning.`, 'unsupported-inference'),
            no(`Abebe's survey found that the average return rate for new rowers across twenty clubs is 46 percent.`, 'mismatched-evidence'),
          ],
          solution: `The first choice pairs Leaupepe's claim with independent evidence from sentence 8 that addresses the same point, schedules. The 46 percent figure is from another source but does not speak to practice times.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `How does sentence 7 help the writer's argument?`,
          choices: [
            ok(`It shows that Halvern's 81 percent return rate is unusually high, which is why the club's policies are worth explaining.`),
            no(`It proves that the partner system is the only reason Halvern's rowers come back.`, 'overgeneralization'),
            no(`It shows that Abebe disagrees with Leaupepe about why rowers quit their clubs.`, 'unsupported-inference'),
            no(`It explains how Halvern chooses which experienced rowers become partners.`, 'misreads-text'),
          ],
          solution: `Comparing 81 percent with a regional average of 46 percent establishes that Halvern really is different, giving the research question its point. Sentence 7 says nothing about partners or about Abebe disagreeing with anyone.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `Which sentence would best fill the blank as the conclusion in sentence 11?`,
          choices: [
            ok(`Taken together, the club report, the regional survey and the interviews suggest that partners and flexible schedules keep Halvern's rowers coming back.`),
            no(`Taken together, these sources prove that every rowing club should copy Halvern's policies starting next season.`, 'overgeneralization'),
            no(`Taken together, these sources show that Leaupepe is an excellent coach whom every rower admires.`, 'unsupported-inference'),
            no(`Taken together, these sources show that rowing is a difficult sport that takes a great deal of practice.`, 'off-topic-conclusion'),
          ],
          solution: `The first choice draws on all three sources and names the two policies that more than one source supports. Saying every club should copy Halvern goes beyond what a study of one club can show.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `The writer wants to argue that the partner system matters most among Halvern's policies. Which evidence in the draft most directly supports that claim?`,
          choices: [
            ok(`Sentences 9 and 10, because three of four interviewed rowers named a partner as their main reason for staying.`),
            no(`Sentence 8, because clubs with flexible practice times kept more new rowers than other clubs.`, 'mismatched-evidence'),
            no(`Sentence 5, because the club never cuts a beginner for being slow.`, 'mismatched-evidence'),
            no(`Sentence 7, because the regional average return rate is only 46 percent.`, 'mismatched-evidence'),
          ],
          solution: `Only the interviews compare the policies from rowers' own view, and most named the partner as the main reason. Sentence 8 supports flexible schedules, a different policy, so it cannot show that partners matter most.`,
        },
      ],
    },
    {
      code: 'wg11-writing-with-evidence-p06',
      title: 'Draft: Patience in "Kiln Morning"',
      body: `(1) In Nadia Ferreira-Hale's poem "Kiln Morning," a potter sits beside her studio window through the night, waiting for her kiln to cool so she can see whether her bowls survived the firing. (2) The poem is about pottery and waiting.

(3) Each of the first three stanzas ends with the line "Not yet, not yet," which the speaker repeats every time she reaches for the kiln door. (4) The repetition slows the poem down and makes the reader wait along with the speaker, feeling each small delay just as she does. (5) In the second stanza, the speaker admits that "the fire decides what my hands began," suggesting that she cannot control the final result. (6) Pottery kilns can reach temperatures of more than two thousand degrees.

(7) ____, the final stanza drops the refrain entirely. (8) When the speaker at last opens the door, she finds one cracked bowl among the rest and writes, "Even this one rang when I tapped it." (9) The speaker likes the cracked bowl.

(10) Ferreira-Hale's poem suggests that patience is not only waiting but also accepting whatever the waiting brings.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not support the analysis of the poem?`,
          choices: [
            ok(`Sentence 6`),
            no(`Sentence 3`, 'removes-key-evidence'),
            no(`Sentence 4`, 'removes-analysis'),
            no(`Sentence 8`, 'removes-key-evidence'),
          ],
          solution: `The temperature of kilns is a general fact, not evidence from the poem or analysis of it. Sentence 4 explains the effect of the refrain, so removing it would leave the quotation in sentence 3 unexplained.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which revision of sentence 2 best states a claim the rest of the draft supports?`,
          choices: [
            ok(`Through a repeated refrain and the image of a cracked bowl, Ferreira-Hale shows that patience means accepting results one cannot fully control.`),
            no(`Ferreira-Hale's poem describes a potter, a kiln, a night of waiting and a set of bowls in four stanzas.`, 'summary-not-claim'),
            no(`Ferreira-Hale suggests that anyone who practices pottery long enough will stop making mistakes.`, 'contradicts-evidence'),
            no(`Ferreira-Hale's poem is beautiful and is one of the best poems written about making art.`, 'opinion-not-analysis'),
          ],
          solution: `The draft analyzes the refrain, the line about the fire deciding, and the cracked bowl, all of which point to accepting what cannot be controlled. The summary choice lists the poem's contents but makes no claim to prove.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 7?`,
          choices: [
            ok(`Breaking this pattern`),
            no(`For example`, 'wrong-relationship'),
            no(`Because of the heat`, 'confuses-cause-effect'),
            no(`In the same way`, 'false-similarity'),
          ],
          solution: `Sentence 3 sets up a refrain in the first three stanzas, and sentence 7 reports that the last stanza departs from it, so "Breaking this pattern" signals the change. "In the same way" wrongly suggests the final stanza continues the pattern.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `Which revision of sentence 9 best explains how the quotation in sentence 8 supports the claim?`,
          choices: [
            ok(`By noting that the cracked bowl still "rang," the speaker values it for what it can still do, accepting what the fire decided.`),
            no(`The speaker finds a cracked bowl when she finally opens the door of the kiln in the morning.`, 'summary-not-analysis'),
            no(`The speaker will most likely throw the cracked bowl away and start the whole process over.`, 'contradicts-evidence'),
            no(`Cracked bowls usually happen when a kiln heats up or cools down too quickly.`, 'off-topic-fact'),
          ],
          solution: `The first choice connects the word "rang" to the speaker's acceptance, which is the draft's claim. Saying she will throw the bowl away contradicts the admiring tone of the quoted line.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `The writer is thinking about cutting sentence 5 to shorten the draft. Why should the writer keep it?`,
          choices: [
            ok(`It shows the speaker cannot control the outcome, which links the waiting in the refrain to the acceptance shown in sentence 8.`),
            no(`It is the only direct quotation in the draft, and a response needs at least one.`, 'misreads-text'),
            no(`It proves that the speaker is a beginner who has never fired a kiln before.`, 'unsupported-inference'),
            no(`It explains why the first three stanzas all end with the same refrain.`, 'misreads-purpose'),
          ],
          solution: `Without the line about the fire deciding, the draft would jump from waiting to acceptance with no evidence that the outcome is out of the potter's hands. The draft has several other quotations, so it is not the only one.`,
        },
      ],
    },
    {
      code: 'wg11-writing-with-evidence-p07',
      title: 'Draft: Dimming the Coast',
      body: `(1) In "Dimming the Coast," entomologist Rafael Quispe reports on an experiment in the town of Selby Point, where half of the streetlights were switched from bright white bulbs to dim amber ones. (2) Quispe argues that the change helped night-flying moths. (3) His team counted the moths circling each lamp and found an average of forty-one around white lamps but only six around amber ones. (4) Quispe explains that moths circling a lamp "are not feeding and are often exhausted by morning." (5) This means amber lights leave more moths free to spend the night among flowers instead of around bulbs.

(6) ____, Quispe checked the evening primrose along the roads, a wildflower that moths pollinate at night. (7) Plants near amber lamps produced 30 percent more seed pods than plants near white lamps. (8) ____

(9) Some residents worried that dimmer lights would make the streets less safe, but Quispe found no change in the number of traffic accidents reported during the experiment. (10) Quispe first became interested in moths as a child, when he raised caterpillars in a glass jar.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it adds nothing to the analysis?`,
          choices: [
            ok(`Sentence 10`),
            no(`Sentence 4`, 'removes-key-evidence'),
            no(`Sentence 5`, 'removes-analysis'),
            no(`Sentence 7`, 'removes-key-evidence'),
          ],
          solution: `Quispe's childhood hobby says nothing about whether the amber lights helped moths. Sentence 7 is the draft's strongest evidence, so removing it would weaken the argument.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 6?`,
          choices: [
            ok(`To test whether this mattered for the flowers`),
            no(`In contrast to the moth counts`, 'false-contrast'),
            no(`As a result of the traffic data`, 'confuses-cause-effect'),
            no(`Despite having no interest in plants`, 'unsupported-inference'),
          ],
          solution: `Sentence 5 suggests moths near amber lights can visit flowers, and the primrose check tests that idea, so the first phrase connects the two. The plant study does not contrast with the moth counts; it builds on them.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which sentence would best fill the blank in sentence 8?`,
          choices: [
            ok(`Since moths pollinate this flower, the extra seed pods suggest that moths were actually visiting flowers near the amber lamps.`),
            no(`Evening primrose is a yellow wildflower that opens in the evening and closes again by noon.`, 'off-topic-fact'),
            no(`The extra seed pods prove that amber light helps every kind of plant grow faster and taller.`, 'overgeneralization'),
            no(`Plants near amber lamps produced more seed pods than plants near white lamps during the study.`, 'restates-evidence'),
          ],
          solution: `The first choice explains why the seed pods matter: they show moths doing the pollinating the claim is about. The last choice only repeats sentence 7 without explaining it.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `Why does sentence 7 support the claim more strongly than sentence 3 does?`,
          choices: [
            ok(`Sentence 3 shows fewer moths at lamps, but sentence 7 shows a result in the flowers, evidence that moths were out feeding instead.`),
            no(`Sentence 7 uses a percentage, and percentages always count as stronger evidence than averages.`, 'overgeneralization'),
            no(`Sentence 3 comes from a different scientist, so it is less reliable than sentence 7.`, 'misreads-text'),
            no(`Sentence 7 includes more plants, so it proves that the moth counts in sentence 3 were wrong.`, 'unsupported-inference'),
          ],
          solution: `Fewer moths at amber lamps could mean many things, but more seed pods show that moths were doing useful work elsewhere, which is what "helped" means here. Both findings come from Quispe's team, so the source is not the difference.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `The writer wants to keep sentence 9. Which revision of sentence 2 would make sentence 9 relevant to the claim?`,
          choices: [
            ok(`Quispe argues that the change helped night-flying moths without creating new problems for the town.`),
            no(`Quispe argues that night-flying moths are more important than the town's streetlights.`, 'unsupported-claim'),
            no(`Quispe argues that bright white streetlights are the main cause of traffic accidents.`, 'contradicts-evidence'),
            no(`Quispe argues that moths prefer white light because it is brighter than amber light.`, 'misreads-text'),
          ],
          solution: `Sentence 9 shows the town lost nothing in safety, so a claim that includes "without creating new problems" gives it a job in the argument. Quispe found no change in accidents, so a claim that white lights cause accidents contradicts the evidence.`,
        },
      ],
    },
    {
      code: 'wg11-writing-with-evidence-p08',
      title: 'Draft: A Teacher\'s Thermometer',
      body: `(1) In the article "A Teacher's Thermometer," science writer Mira Castellanos describes how researchers are using the weather diaries of Lucinda Ferrante, a schoolteacher who recorded conditions at Lake Tamsin every day from 1871 to 1912. (2) Castellanos shows that careful amateur records can become valuable scientific evidence when researchers test them against other sources. (3) Ferrante wrote down the temperature each morning at seven o'clock and noted the date the lake froze each winter. (4) Climate researcher Oluwaseun Bello compared her readings with records from a government weather station forty miles away and found that the two sets of numbers rose and fell together almost exactly. (5) This match matters because it shows that Ferrante's thermometer and habits were reliable, not just that she was hardworking. (6) Bello's team then used the diaries to extend the lake's ice record back by forty years. (7) Castellanos reports that the lake now freezes, on average, about three weeks later than it did in Ferrante's time.

(8) Castellanos also describes the challenges. (9) In some years Ferrante was away visiting family, and her students took the readings for her. (10) Bello found that those weeks contained more errors, so his team removed them before finishing the analysis. (11) Ferrante also taught music and directed the town's children's choir.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the claim in sentence 2?`,
          choices: [
            ok(`Sentence 11`),
            no(`Sentence 4`, 'removes-key-evidence'),
            no(`Sentence 9`, 'removes-key-evidence'),
            no(`Sentence 5`, 'removes-analysis'),
          ],
          solution: `Ferrante's music teaching has no bearing on whether her records are useful scientific evidence. Sentence 9 explains where the weaker readings came from, which sets up the testing described in sentence 10.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `How does the second paragraph (sentences 8 to 10) strengthen the writer's claim?`,
          choices: [
            ok(`It shows that testing caught and removed weaker readings, supporting the idea that records become useful once they are checked.`),
            no(`It shows that Ferrante's diaries are full of errors and should not be used by scientists at all.`, 'overcorrects'),
            no(`It shows that Ferrante's students were better at taking readings than she was.`, 'contradicts-evidence'),
            no(`It shows that Castellanos disagrees with Bello about how to use the diaries.`, 'unsupported-inference'),
          ],
          solution: `The claim says amateur records become valuable when tested, and paragraph 2 shows that testing in action: weak weeks were found and removed. The draft says the students' weeks had more errors, so they were not better at it.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `The writer wants to add this quotation after sentence 7: the ice record "turns a teacher's habit into a measuring stick for a changing lake." Which version integrates it most smoothly?`,
          choices: [
            ok(`Castellanos sums up the value of this work when she writes that the ice record "turns a teacher's habit into a measuring stick for a changing lake."`),
            no(`Ferrante wrote in her diary that the ice record "turns a teacher's habit into a measuring stick for a changing lake."`, 'misattributed-quotation'),
            no(`Castellanos says that "turns a teacher's habit into a measuring stick for a changing lake."`, 'grammar-mismatch'),
            no(`"Turns a teacher's habit into a measuring stick for a changing lake." This is from the article.`, 'dropped-quotation'),
          ],
          solution: `The first choice names Castellanos as the source and builds the quotation into a complete, grammatical sentence. The version beginning "Castellanos says that" leaves the quoted phrase without a subject, so the sentence does not work.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Which sentence would best conclude the draft without claiming more than the evidence shows?`,
          choices: [
            ok(`Castellanos's account shows that Ferrante's diaries became trustworthy evidence because Bello checked them against a second source and removed weak readings.`),
            no(`Castellanos's account shows that any old diary is just as accurate as the instruments used by scientists today.`, 'overgeneralization'),
            no(`Castellanos's account shows that Lake Tamsin will stop freezing completely within the next few decades.`, 'unsupported-inference'),
            no(`Castellanos's account shows that Ferrante kept weather diaries at Lake Tamsin from 1871 to 1912.`, 'summary-not-analysis'),
          ],
          solution: `The first choice restates the claim and names the two checks that made the records trustworthy, staying within the evidence. The draft reports one carefully tested diary, so it cannot support a claim about every old diary.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `A classmate suggests replacing sentence 4 with Castellanos's remark that Ferrante "rarely missed a morning in forty-one years." Why would this be a weaker choice?`,
          choices: [
            ok(`It shows Ferrante's dedication but not that her readings were accurate, which the claim about testing records requires.`),
            no(`It is a quotation, and the writer has already used too many quotations in the first paragraph.`, 'misidentifies-problem'),
            no(`It contradicts sentence 9, which proves that Ferrante never took any readings herself.`, 'misreads-text'),
            no(`It is more specific than sentence 4, and specific evidence is less convincing than general evidence.`, 'reverses-principle'),
          ],
          solution: `Sentence 5 already points out that being hardworking is not the same as being reliable, and only the comparison with the government station tests accuracy. Sentence 9 says students took readings only in some years, not that Ferrante never did.`,
        },
      ],
    },
  ],
}

export default skill
