import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g12-writing-with-evidence',
  subject: 'writing',
  grade: 12,
  group: 'Composition',
  name: 'Writing About Texts with Evidence',
  standards: ['W.11-12.9'],
  passages: [
    {
      code: 'wg12-writing-with-evidence-p01',
      title: 'Draft: Reefs Versus Walls',
      body: `(1) In her report "Living Edges of Calder Bay," marine ecologist Renata Okafor describes a six-year experiment that compared three ways of protecting an eroding salt marsh. (2) Salt marshes are found along many coastlines and are home to crabs, snails and wading birds. (3) Okafor's team divided a two-mile stretch of shoreline into sections protected by a concrete seawall, by restored oyster reefs, or by nothing at all. (4) After six years, the marsh behind the seawall had lost almost as much ground as the unprotected marsh, because waves bounced off the wall and scoured the mud at its base. (5) Behind the oyster reefs, by contrast, the marsh edge had actually advanced by about four feet. (6) Okafor explains that a reef will "break one wave into a hundred smaller ones" instead of throwing its full force back at the shore.

(7) ____, the reefs did more than slow erosion. (8) Okafor's divers counted three times as many young fish among the reefs as along the seawall, and the reefs grew taller each year as new oysters settled on old shells. (9) This growth matters because it means the reef barrier repairs itself, while a seawall can only weaken with age. (10) Oysters were once harvested heavily in Calder Bay and sold in markets up and down the coast. (11) Okafor does admit that young reefs need fairly calm water to take hold, and one reef planted at a site exposed to heavy storms failed in its first year.

(12) So oyster reefs are better than seawalls in every way.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should replace sentence 2 so that the draft opens with a clear claim that its evidence supports?`,
          choices: [
            no(`Okafor's report is mainly about salt marshes and the different animals that depend on them for food.`, 'topic-not-claim'),
            ok(`Okafor's experiment suggests that oyster reefs protect a marsh better than a seawall because they absorb wave energy.`),
            no(`Every coastal town should tear down its seawalls this year and replace them with oyster reefs.`, 'opinion-not-analysis'),
            no(`Concrete seawalls have been built along many shorelines for more than a hundred years.`, 'off-topic-fact'),
          ],
          solution: `Sentences 3 through 9 compare how the seawall and the reefs handled waves, so a claim that reefs protect better by absorbing wave energy fits the evidence. The choice about what the report is about names a topic but makes no point that evidence could prove.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the analysis?`,
          choices: [
            no(`Sentence 6, because a quotation from Okafor repeats what the numbers already show.`, 'removes-key-evidence'),
            no(`Sentence 9, because it explains evidence instead of adding new facts.`, 'removes-analysis'),
            ok(`Sentence 10, because the history of oyster harvests says nothing about erosion.`),
            no(`Sentence 11, because it admits a weakness in the reefs.`, 'avoids-counterclaim'),
          ],
          solution: `Sentence 10 is a historical fact about selling oysters and has no link to how well reefs protect the marsh. Sentence 11 should stay, because honestly noting the storm failure keeps the analysis accurate.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 7?`,
          choices: [
            no(`Despite these results`, 'false-contrast'),
            no(`For this reason`, 'confuses-cause-effect'),
            no(`In conclusion`, 'premature-conclusion'),
            ok(`Just as important`),
          ],
          solution: `Sentences 7 through 9 add a second advantage of the reefs that agrees with the erosion results, so "Just as important" signals added support. "Despite these results" wrongly suggests the new evidence works against the first paragraph.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `What is the main purpose of sentence 9 in the writer's argument?`,
          choices: [
            no(`It adds a new statistic about how many fish live among the oyster reefs.`, 'misreads-purpose'),
            ok(`It explains why the reefs' yearly growth makes them a stronger choice than a seawall over time.`),
            no(`It shows that Okafor believes seawalls should never be built anywhere along the coast.`, 'unsupported-inference'),
            no(`It repeats the erosion results from sentence 5 so that readers remember them.`, 'misreads-repetition'),
          ],
          solution: `Sentence 8 reports that the reefs grow taller each year, and sentence 9 explains what that means: the barrier repairs itself while a wall weakens. The fish count is in sentence 8, not sentence 9, so sentence 9 adds analysis rather than a new statistic.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Which revision of sentence 12 best concludes the draft while staying accurate to all of the evidence, including sentence 11?`,
          choices: [
            no(`Oyster reefs are better than seawalls in every way, so every coastal town should build them right away.`, 'overgeneralization'),
            no(`Because one reef failed in a storm, Okafor's experiment shows that reefs are too unreliable to depend on.`, 'overweights-exception'),
            ok(`Where the water is calm enough for oysters to settle, Okafor's results show reefs offer a stronger, self-repairing defense.`),
            no(`Seawalls and oyster reefs both have strengths and weaknesses, so neither one is truly better than the other.`, 'false-balance'),
          ],
          solution: `The correct conclusion keeps the main claim but limits it to calm water, which is exactly the condition sentence 11 sets. The "every way" version ignores the storm failure, while the "too unreliable" version lets one failed site outweigh six years of results.`,
        },
      ],
    },
    {
      code: 'wg12-writing-with-evidence-p02',
      title: 'Draft: The Wagon That Listened',
      body: `(1) Historian Hyun-woo Baek's essay "Shelves on Wheels" examines a horse-drawn book wagon that carried library books to farms in Larch County from 1905 to 1921. (2) Baek argues that the wagon succeeded not simply because it brought books closer to farm families but because its librarian treated each stop as a conversation about what readers wanted. (3) The librarian, Odile Fairweather, kept a notebook of requests at every farm and returned two weeks later with the titles people had asked for. (4) She also left pamphlets on soil, canning and bookkeeping for parents, along with storybooks for younger children. (5) Baek notes that a state-run book wagon in a neighboring county, which carried a fixed set of titles chosen by an office in the capital, stopped running after only three years.

(6) The loan records support Baek's reading. (7) In the wagon's first year, Fairweather lent about 600 books, but by 1912 she was lending more than 4,000 books a year. (8) ____ (9) Baek also quotes a farmer's letter thanking Fairweather for "remembering that my boy wanted the book about bridges." (10) The wagon was painted dark green and pulled by two horses named Pepper and Sage. (11) These details suggest that families kept borrowing because the wagon answered their own questions.

(12) Overall, the book wagon was an important part of history.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not help explain why the wagon succeeded?`,
          choices: [
            no(`Sentence 3`, 'removes-key-evidence'),
            no(`Sentence 9`, 'removes-key-evidence'),
            ok(`Sentence 10`),
            no(`Sentence 11`, 'removes-analysis'),
          ],
          solution: `Sentence 10 describes the wagon's paint and horses, which has nothing to do with Baek's explanation of its success. Sentence 11 is the writer's own explanation of the evidence, so cutting it would remove analysis the draft needs.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which revision of sentence 12 would best conclude the draft?`,
          choices: [
            ok(`Baek's evidence shows that the wagon lasted because Fairweather built each visit around what families asked to read.`),
            no(`Fairweather lent about 600 books in her first year and more than 4,000 books a year by 1912.`, 'evidence-without-analysis'),
            no(`Book wagons were clearly the best way to bring reading to people in every rural place.`, 'overgeneralization'),
            no(`Many people today forget how hard it once was for farm families to find good books.`, 'off-topic-opinion'),
          ],
          solution: `A strong conclusion returns to the claim in sentence 2 and connects it to the evidence about requests. The loan numbers alone repeat a detail without saying what it proves.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which sentence, placed in the blank at sentence 8, would best support Baek's claim in sentence 2?`,
          choices: [
            no(`Baek found that the wagon traveled about thirty miles a week on dirt roads that turned to mud each spring.`, 'irrelevant-detail'),
            no(`Baek found that many farm families in the county could not afford to buy books of their own at the time.`, 'supports-rejected-explanation'),
            no(`Baek found that the county built a brick library in town in 1921, the same year the wagon stopped running.`, 'off-claim'),
            ok(`Baek found that more than half of the books lent after 1910 were titles listed in Fairweather's request notebook.`),
          ],
          solution: `The claim is that the wagon succeeded because it responded to requests, and the notebook finding ties the rising loans directly to those requests. The point about families being unable to afford books supports the "closer to readers" explanation that Baek says is not enough.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Why does the writer include the information about the neighboring county in sentence 5?`,
          choices: [
            no(`To show that the state government did not care about readers living on farms`, 'unsupported-inference'),
            ok(`To show that a wagon that only delivered books, without taking requests, did not last`),
            no(`To give background on how book wagons were first invented and paid for`, 'misreads-purpose'),
            no(`To suggest that Fairweather once worked for the state-run wagon as well`, 'unsupported-inference'),
          ],
          solution: `The neighboring wagon also brought books to farms but used a fixed list, and it failed, which supports Baek's point that delivery alone was not enough. Nothing in the draft says the state did not care about readers; the contrast is about how titles were chosen.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `A classmate objects that the loans in sentence 7 may have grown only because more families moved to Larch County. Which detail from Baek's essay, if added, would best answer this objection?`,
          choices: [
            no(`Baek reports that farm families often shared borrowed books with neighbors who lived nearby.`, 'does-not-address-objection'),
            no(`Baek reports that the wagon added four new stops between 1905 and 1912.`, 'supports-objection'),
            ok(`Baek reports that the county's farm population stayed nearly the same between 1905 and 1912.`),
            no(`Baek reports that Fairweather kept careful records of every book she lent.`, 'irrelevant-detail'),
          ],
          solution: `If the population barely changed, a nearly sevenfold rise in loans cannot be explained by new families, so the objection loses its force. The four new stops actually feed the objection, because more stops could raise loans without any change in how Fairweather chose books.`,
        },
      ],
    },
    {
      code: 'wg12-writing-with-evidence-p03',
      title: 'Draft: A Bridge That Reports on Itself',
      body: `(1) In the article "A Bridge That Reports on Itself," structural engineer Farida Haddad describes how forty small sensors were attached to the Kessel River Bridge in 2020. (2) The sensors measure how much the steel stretches and vibrates as traffic crosses, and they send readings to an engineering office every ten minutes. (3) Before the sensors, inspectors climbed the bridge once every two years and judged its condition mostly by eye. (4) Haddad argues that the sensors do not replace inspectors but instead tell them where to look. (5) In 2022, the readings showed that one joint was vibrating more on cold mornings than on warm afternoons. (6) An inspection team was sent to that joint and found a cracked bearing that had not appeared in the previous visual report.

(7) This example shows that sensors are good. (8) ____, Haddad cautions that the system produced more than two hundred false alarms in its first year, mostly set off by heavy trucks and strong wind. (9) Engineers had to study months of readings before they could tell a real warning from ordinary noise. (10) The bridge is about 1,200 feet long and first opened to traffic in 1958. (11) These false alarms help explain why Haddad insists that people, not software, must make the final decisions about repairs.

(12) In conclusion, technology is changing the world in many ways.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which phrase best fills the blank at the start of sentence 8?`,
          choices: [
            no(`As a result`, 'confuses-cause-effect'),
            no(`For example`, 'misreads-relationship'),
            ok(`At the same time`),
            no(`Similarly`, 'false-similarity'),
          ],
          solution: `Sentence 8 turns from the sensors' success to a problem with them, so "At the same time" signals a balancing point. The false alarms were not caused by finding the cracked bearing, so "As a result" sets up the wrong relationship.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which sentence does not support the writer's analysis and should be deleted?`,
          choices: [
            no(`Sentence 3`, 'removes-key-evidence'),
            ok(`Sentence 10`),
            no(`Sentence 9`, 'removes-key-evidence'),
            no(`Sentence 11`, 'removes-analysis'),
          ],
          solution: `The bridge's length and opening year do not help show how sensors and inspectors work together. Sentence 3 should stay, because it describes the older method the sensors are being compared with.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which revision of sentence 7 best explains how the evidence in sentences 5 and 6 supports Haddad's claim?`,
          choices: [
            ok(`Because the visual report missed the cracked bearing and the vibration data pointed straight to it, the sensors sent inspectors to damage they had overlooked.`),
            no(`In 2022, the sensors noticed that one joint vibrated more on cold mornings, and a team went out to look at it.`, 'restates-evidence'),
            no(`This example proves that visual inspections are useless and that engineers should stop climbing bridges altogether.`, 'contradicts-source'),
            no(`This example shows that cold weather is the main cause of damage to steel bridges in most parts of the country.`, 'unsupported-inference'),
          ],
          solution: `The correct revision explains why the example matters: the data pointed inspectors to damage the eye had missed, which is Haddad's "where to look" claim. The "useless" version contradicts sentence 4, where Haddad says sensors do not replace inspectors.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which revision of sentence 12 would best conclude the draft?`,
          choices: [
            no(`Haddad's article explains how forty sensors were attached to the Kessel River Bridge in 2020.`, 'summary-not-analysis'),
            no(`Every bridge in the country should install sensors as soon as possible to prevent accidents.`, 'overgeneralization'),
            no(`Bridges are some of the most impressive structures that engineers have ever designed.`, 'off-topic-opinion'),
            ok(`Haddad's evidence shows that sensors are most useful when they guide skilled inspectors rather than replace them.`),
          ],
          solution: `The best conclusion ties both paragraphs together: the cracked bearing shows the sensors' value, and the false alarms show why people must decide. The summary choice only repeats a fact from sentence 1 without stating what the evidence shows.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `The writer wants to add a thesis after sentence 4 that captures the analysis both paragraphs develop. Which sentence works best?`,
          choices: [
            no(`Haddad's evidence shows that sensors are more accurate than human inspectors and should take over bridge safety.`, 'contradicts-source'),
            ok(`Haddad's evidence shows that the sensors can reveal hidden damage but raise too many false alarms to act on alone.`),
            no(`Haddad's evidence shows that the false alarms make the sensors more trouble than they are worth on most bridges.`, 'ignores-key-evidence'),
            no(`Haddad's evidence shows that the Kessel River Bridge is in poor condition and will soon need to be replaced.`, 'unsupported-inference'),
          ],
          solution: `Paragraph 1 shows the sensors finding hidden damage and paragraph 2 shows the false alarms that require human judgment, so a thesis naming both fits. The "more trouble than they are worth" choice ignores the cracked bearing the sensors helped find.`,
        },
      ],
    },
    {
      code: 'wg12-writing-with-evidence-p04',
      title: 'Draft: Learning to Listen in "The Tuner\'s Apprentice"',
      body: `(1) In Lena Okonjo-Hart's short story "The Tuner's Apprentice," a young man named Teodor spends a winter learning to tune pianos from an older craftsman, Mr. Abara. (2) At the start of the story, Teodor works quickly and checks each string against an electronic meter. (3) Okonjo-Hart writes that he "finished the church piano before the kettle boiled and left without playing a single chord." (4) Mr. Abara, by contrast, plays a slow scale after every adjustment and listens with his eyes closed. (5) Teodor is not a very good piano tuner at the beginning.

(6) Near the end of the story, Teodor returns alone to the same church piano after a cold snap has pulled it out of tune. (7) This time, the narrator says, he "left the meter in its case and played until the room seemed to agree with him." (8) The author's choice to send Teodor back to the same piano invites the reader to compare the two visits directly. (9) Pianos usually need tuning once or twice a year, depending on the weather and how often they are played. (10) ____ (11) The quiet ending suggests that Teodor has learned that his craft depends on patience and careful listening, not on speed.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence should replace sentence 5 so that it states a claim the draft goes on to support?`,
          choices: [
            no(`Teodor and Mr. Abara both work as piano tuners in the same small town during one long winter.`, 'summary-not-claim'),
            no(`Pianos are difficult instruments to care for, and tuning them takes many years of practice.`, 'off-topic-fact'),
            ok(`Okonjo-Hart contrasts the two tuners to set up Teodor's change from a hurried worker to a patient listener.`),
            no(`Mr. Abara is the most interesting character because he keeps his eyes closed while he works.`, 'opinion-not-analysis'),
          ],
          solution: `The rest of the draft traces how Teodor changes from rushing to listening, so a claim about that change fits the evidence. The summary choice only states who the characters are, not what the story shows.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not support the analysis of the story?`,
          choices: [
            ok(`Sentence 9, because a general fact about pianos says nothing about how Teodor changes.`),
            no(`Sentence 4, because describing Mr. Abara takes attention away from Teodor.`, 'removes-key-evidence'),
            no(`Sentence 8, because it does not include a quotation from the story.`, 'removes-analysis'),
            no(`Sentence 3, because the quotation is too short to be useful.`, 'removes-key-evidence'),
          ],
          solution: `Sentence 9 is a general fact about piano care, not evidence from the story. Sentence 4 matters because Mr. Abara's slow, careful method is the model that Teodor later follows.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which detail from the story, placed in the blank at sentence 10, would best support the claim in sentence 11?`,
          choices: [
            no(`Mr. Abara tells Teodor that he once tuned a piano for a concert hall in a large city.`, 'irrelevant-detail'),
            no(`Teodor notices that frost has covered the tall church windows during the cold snap.`, 'setting-not-evidence'),
            no(`Teodor decides that he will open a tuning shop of his own when spring arrives.`, 'does-not-show-change'),
            ok(`On this second visit, he plays a slow scale after each adjustment, just as Mr. Abara did.`),
          ],
          solution: `Playing a slow scale after each adjustment shows Teodor taking on Mr. Abara's patient method, which directly supports the claim about learning to listen. The plan to open a shop is about his future, not about how he now works.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Why is the quotation in sentence 7 especially effective evidence for the writer's analysis?`,
          choices: [
            no(`It is the longest quotation in the draft, so it gives the reader the most information.`, 'length-equals-strength'),
            ok(`It mirrors sentence 3, showing Teodor now putting the meter away and playing instead of leaving without a chord.`),
            no(`It proves that electronic meters are less accurate than the human ear for tuning pianos.`, 'overgeneralization'),
            no(`It shows that the cold snap made the piano much harder to tune than it was before.`, 'misreads-focus'),
          ],
          solution: `Sentence 3 shows Teodor leaving "without playing a single chord," and sentence 7 shows him playing until the room agrees, so the two quotations together reveal his change. The story is about Teodor's growth, not about whether meters are accurate in general.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `A peer suggests deleting sentence 8 because it does not quote the story. Which response best explains what the writer should do?`,
          choices: [
            no(`Delete it, because an analysis of a story should be built only from direct quotations.`, 'misunderstands-analysis'),
            no(`Delete it, because it repeats the plot event already described in sentence 6.`, 'misreads-repetition'),
            no(`Keep it, because it adds new plot information about the cold snap and the church.`, 'misreads-purpose'),
            ok(`Keep it, because it explains the author's choice that makes the comparison of sentences 3 and 7 meaningful.`),
          ],
          solution: `Sentence 8 is analysis: it points out that returning Teodor to the same piano is a deliberate structural choice that sets up the comparison. Sentence 6 reports the event, but sentence 8 explains why it matters, so it is not a repetition.`,
        },
      ],
    },
    {
      code: 'wg12-writing-with-evidence-p05',
      title: 'Draft: Slow Starts, Strong Finishes',
      body: `(1) In "Running Together," exercise researcher Bongani Mthembu studies what happened after the Harlow City Marathon introduced pace groups in 2018. (2) A pace group is a cluster of runners who follow an experienced volunteer carrying a sign with a target finishing time. (3) Mthembu argues that the groups help first-time marathoners finish mainly by keeping them from starting too fast. (4) Before 2018, about 81 percent of first-time entrants finished the race. (5) In the four years after pace groups began, that figure rose to 89 percent. (6) Mthembu's split times show why: runners in pace groups ran the first ten miles an average of four minutes slower than first-timers running alone, yet they finished an average of nine minutes faster.

(7) In other words, the runners who held back early had more energy left for the final miles, where most dropouts happen. (8) Some readers might suspect that the higher finishing rate came from better weather instead. (9) ____ (10) The race course passes a historic train station and crosses the river twice. (11) Taken together, Mthembu's numbers show that pace groups make running fun for everyone.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not support the writer's analysis?`,
          choices: [
            no(`Sentence 2`, 'removes-needed-context'),
            no(`Sentence 7`, 'removes-analysis'),
            no(`Sentence 8`, 'avoids-counterclaim'),
            ok(`Sentence 10`),
          ],
          solution: `The train station and river crossings have nothing to do with why first-time runners finish. Sentence 8 should stay, because raising a possible objection lets the writer answer it.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which sentence, placed in the blank at sentence 9, best responds to the objection in sentence 8?`,
          choices: [
            ok(`However, Mthembu reports that race-day temperatures were about the same in the four years before and after 2018.`),
            no(`However, Mthembu reports that many runners prefer cool weather because it keeps them from overheating.`, 'does-not-address-objection'),
            no(`However, Mthembu reports that the number of entrants grew steadily each year after pace groups began.`, 'irrelevant-statistic'),
            no(`However, Mthembu admits that weather can affect how many runners are able to finish any marathon.`, 'concedes-without-rebuttal'),
          ],
          solution: `If the weather was about the same before and after 2018, it cannot explain the rise in finishers, so this evidence answers the objection directly. Admitting that weather matters only agrees with the objection without showing it is wrong here.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 best concludes the draft?`,
          choices: [
            no(`Taken together, Mthembu's numbers show that 89 percent of first-time entrants finished after 2018.`, 'evidence-without-analysis'),
            ok(`Taken together, Mthembu's numbers show that pace groups help first-timers finish by teaching them to save energy early.`),
            no(`Taken together, Mthembu's numbers show that every runner should join a pace group in every race.`, 'overgeneralization'),
            no(`Taken together, Mthembu's numbers show that the Harlow City Marathon is the best race in the region.`, 'unsupported-inference'),
          ],
          solution: `The correct conclusion restates the claim and links it to the split times and finishing rates. The "every runner" version stretches findings about first-time marathoners into a rule for all runners and races.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `What is the main function of sentence 7 in the draft?`,
          choices: [
            no(`It introduces a new statistic about where most runners drop out of the race.`, 'misreads-purpose'),
            no(`It summarizes the whole draft before the writer turns to a new topic.`, 'premature-conclusion'),
            ok(`It explains how the slower early miles in sentence 6 connect to the claim about starting too fast.`),
            no(`It raises a possible objection to Mthembu's argument for the reader to consider.`, 'misidentifies-counterclaim'),
          ],
          solution: `Sentence 6 gives the numbers, and sentence 7 explains what they mean: holding back early saved energy for the end, which is Mthembu's claim. The objection appears in sentence 8, not sentence 7.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Which additional finding, if added after sentence 6, would most strongly show that pacing itself, rather than some other benefit of the groups, explains the result?`,
          choices: [
            no(`Runners in pace groups said they enjoyed talking with others and felt less lonely during the race.`, 'supports-rival-explanation'),
            no(`The volunteers who led the pace groups had each completed at least ten marathons of their own.`, 'indirect-detail'),
            ok(`First-timers who ran alone but started as slowly as the groups finished at nearly the same rate as group runners.`),
            no(`Most first-time entrants signed up for the race at least six months before the starting date.`, 'irrelevant-detail'),
          ],
          solution: `If solo runners who started slowly did just as well, the slow start, not the group itself, explains the higher finishing rate, which is exactly Mthembu's claim. The finding about enjoying company points to a different cause, social support, instead of pacing.`,
        },
      ],
    },
    {
      code: 'wg12-writing-with-evidence-p06',
      title: 'Draft: Lights on Mercer Street',
      body: `(1) Urban planner Yusra Bakr's report "After Dark on Mercer Street" examines a weekly night market that the town of Elmhurst Falls began hosting in 2019. (2) Every Friday from May to September, the town closes four blocks to cars, and local cooks, artists and farmers set up stalls under strings of lights. (3) Bakr argues that the market's most important effect was not the sales at the stalls but the change in how residents thought about the street after dark. (4) Before the market, Bakr notes, most of the street's shops closed by six o'clock, and residents described Mercer Street in surveys as "empty" and "forgotten." (5) ____, by 2022 eleven shops had extended their hours to nine o'clock on every weeknight, not just on market nights.

(6) This detail is the strongest support for Bakr's claim. (7) If the market helped only the stall owners, the shops would have no reason to stay open on Tuesdays and Wednesdays. (8) Bakr also reports that the number of empty storefronts fell from fourteen to five over the same period. (9) My cousin went to the market last summer and bought a painted clay bowl. (10) Bakr admits that a new apartment building opened two blocks away in 2021, which may have brought in more customers. (11) However, the shops began extending their hours in 2020, a full year before the apartments opened, which suggests the market started the change.

(12) Overall, night markets are fun events that every town should try.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which phrase best fills the blank at the start of sentence 5?`,
          choices: [
            no(`Similarly`, 'false-similarity'),
            ok(`In contrast`),
            no(`For this reason`, 'confuses-cause-effect'),
            no(`To sum up`, 'premature-conclusion'),
          ],
          solution: `Sentence 4 describes the street before the market and sentence 5 describes a very different situation afterward, so "In contrast" fits. Shops closing at six did not cause later hours, so "For this reason" sets up the wrong link.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which sentence should the writer remove, and why?`,
          choices: [
            ok(`Sentence 9, because a personal story about one purchase is not evidence from Bakr's report.`),
            no(`Sentence 10, because admitting another possible cause weakens the writer's argument.`, 'avoids-counterclaim'),
            no(`Sentence 8, because a second statistic distracts from the shop hours.`, 'removes-key-evidence'),
            no(`Sentence 2, because describing the stalls has nothing to do with the claim.`, 'removes-needed-context'),
          ],
          solution: `Sentence 9 is an anecdote from outside the text and says nothing about how residents view the street. Sentence 10 should stay, because naming the apartment building lets sentence 11 answer it.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which revision of sentence 12 best concludes the draft?`,
          choices: [
            no(`Overall, Bakr's report shows that eleven shops on Mercer Street now stay open until nine o'clock.`, 'evidence-without-analysis'),
            no(`Overall, Bakr's report shows that the apartment building had no effect on Mercer Street's shops.`, 'overstates-evidence'),
            ok(`Overall, Bakr's report shows that the market turned Mercer Street into a place residents use at night.`),
            no(`Overall, Bakr's report shows that every small town should close its main street to cars on weekends.`, 'overgeneralization'),
          ],
          solution: `The correct conclusion restates Bakr's claim about how residents think about the street after dark, which the shop hours support. The apartment version claims more than sentence 11 shows, since the timing only suggests the market came first.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `What does sentence 7 add to the writer's argument?`,
          choices: [
            no(`It gives a new statistic about the number of shoppers on weeknights.`, 'misreads-purpose'),
            no(`It raises an objection that the writer answers later in the draft.`, 'misidentifies-counterclaim'),
            no(`It shows that stall owners earned more money than the shop owners did.`, 'unsupported-inference'),
            ok(`It explains why weeknight hours show a lasting change rather than a boost limited to market nights.`),
          ],
          solution: `Sentence 7 spells out the reasoning behind sentence 6: shops staying open on nights without a market shows that residents now visit the street at night in general. It contains no statistic; it explains why the evidence in sentence 5 matters.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which statement best describes how sentence 11 strengthens the draft?`,
          choices: [
            no(`It proves that the apartment building had no effect at all on business along Mercer Street.`, 'overstates-evidence'),
            ok(`It answers the alternative cause in sentence 10 with timing evidence that points back to the market.`),
            no(`It replaces Bakr's claim with a new claim about when the apartment building was finished.`, 'misreads-purpose'),
            no(`It shows that the writer disagrees with Bakr's decision to mention the apartment building.`, 'unsupported-inference'),
          ],
          solution: `Because the longer hours began a year before the apartments opened, the market is the more likely starting point, which answers the objection. The writer says this "suggests" the market started the change; it does not prove the apartments had no effect at all.`,
        },
      ],
    },
    {
      code: 'wg12-writing-with-evidence-p07',
      title: 'Draft: Waiting for the Wind',
      body: `(1) In "Riding the North Wind," entomologist Tavita Faleolo describes how her team attached tiny radio tags to forty dragonflies and tracked them south along the coast each autumn for three years. (2) Many people are surprised to learn that some dragonflies migrate at all. (3) Faleolo found that the dragonflies did not fly a little every day, as her team had expected. (4) Instead, they stayed in one place for several days at a time and then traveled long distances in a single burst. (5) Nearly every long flight began within two days after a cold front passed, when steady winds blew from the north. (6) On those days, tagged insects covered an average of 58 kilometers, compared with fewer than 5 kilometers on calm days.

(7) These patterns suggest that the dragonflies save energy by letting the wind do much of the work. (8) Faleolo supports this idea with a second finding. (9) ____ (10) Faleolo is careful to note that forty insects is a small sample and that her tags could be detected only near receiving towers along the coast. (11) Dragonflies have four wings that can move independently, which makes them skilled hunters. (12) Still, her results offer strong evidence that, for these small travelers, timing a trip well matters as much as flying hard.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence should replace sentence 2 so that the draft states a clear claim near its opening?`,
          choices: [
            no(`Dragonflies are among the oldest flying insects, and they can be found on nearly every continent.`, 'off-topic-fact'),
            no(`Faleolo's study is about dragonflies and the way they travel along the coast during autumn.`, 'topic-not-claim'),
            no(`More scientists should study dragonflies, since they are far more interesting than butterflies.`, 'opinion-not-analysis'),
            ok(`Faleolo's tracking data suggest that migrating dragonflies wait for favorable winds instead of flying steadily.`),
          ],
          solution: `Sentences 3 through 6 show the insects resting and then flying far on north wind days, so a claim about waiting for favorable winds fits. The choice about what the study is about names a topic without making a point.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which sentence, placed in the blank at sentence 9, would best support the idea in sentence 7?`,
          choices: [
            ok(`The few dragonflies tracked flying far on calm days used up their stored fat much faster per kilometer than the others.`),
            no(`The tagged dragonflies were most active hunting smaller insects during the warm hours just after noon.`, 'irrelevant-detail'),
            no(`Cold fronts in the region usually arrive every five to eight days during the autumn months.`, 'context-not-support'),
            no(`Faleolo's team had first expected the dragonflies to fly a short distance each day, like many songbirds.`, 'repeats-without-support'),
          ],
          solution: `Sentence 7 claims the wind saves the insects energy, and fat burning faster on calm days is direct evidence of that energy cost. The cold front timing explains how often good winds come, but it says nothing about energy.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which sentence should be deleted because it does not support the writer's analysis of the study?`,
          choices: [
            no(`Sentence 3, because it describes what the researchers expected rather than what they found.`, 'removes-needed-context'),
            no(`Sentence 10, because pointing out limits in the study weakens the writer's claim.`, 'avoids-counterclaim'),
            ok(`Sentence 11, because how dragonflies hunt has nothing to do with how they migrate.`),
            no(`Sentence 6, because the exact distances are too detailed for a short response.`, 'removes-key-evidence'),
          ],
          solution: `Sentence 11 is about hunting, not about how wind shapes migration. Sentence 10 should stay, because naming the study's limits makes the writer's careful conclusion more believable.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `How does sentence 10 affect the writer's argument?`,
          choices: [
            no(`It shows that Faleolo's results are unreliable and should be set aside entirely.`, 'overreads-limitation'),
            no(`It introduces a new claim about where receiving towers ought to be built.`, 'misreads-purpose'),
            ok(`It admits the study's limits, which makes the qualified conclusion in sentence 12 more credible.`),
            no(`It adds further evidence that north winds help dragonflies travel farther.`, 'misidentifies-evidence'),
          ],
          solution: `By noting the small sample and limited tracking, the writer shows awareness of what the data can and cannot prove, and sentence 12 still calls the results "strong evidence" rather than final proof. Nothing in the draft says the results should be thrown out.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Why is the comparison in sentence 6 stronger evidence for the writer's claim than sentence 4 alone?`,
          choices: [
            no(`It gives exact numbers, and numbers are always more convincing than a description.`, 'numbers-equal-proof'),
            no(`It proves that dragonflies cannot travel at all unless a strong wind is blowing.`, 'overgeneralization'),
            no(`It shows that calm days are more common than windy days during the autumn.`, 'unsupported-inference'),
            ok(`It links the long bursts to wind conditions, showing a cause rather than just a travel pattern.`),
          ],
          solution: `Sentence 4 only describes resting and then flying far; sentence 6 shows the long flights happen on north wind days, which connects the pattern to the wind. The insects still moved a little on calm days, so the data do not show they cannot travel without wind.`,
        },
      ],
    },
    {
      code: 'wg12-writing-with-evidence-p08',
      title: 'Draft: Counting What Cannot Be Counted',
      body: `(1) Noor Halabi's poem "Inventory" is spoken by a woman counting the stock in her father's hardware store on the night before it closes for good. (2) The poem is written as a list, and Halabi uses that plain form to show that the speaker cannot reduce the store to objects that can be counted. (3) The first stanza sounds like an ordinary record: "forty hinges, brass; nine coils of rope; a drawer of keys with no locks." (4) Even here, though, the "keys with no locks" hint at things that have lost the purpose they once served. (5) ____, the items begin to slip from objects into memories.

(6) The second stanza lists "one stool, its seat worn pale by forty years of waiting customers," and "the bell above the door, which knew every name." (7) These lines still follow the pattern of a count, but the details describe people and time instead of goods. (8) Hardware stores often sell paint, lumber and garden supplies as well as tools. (9) By the final stanza, the speaker gives up counting altogether. (10) The poem ends, "I write: one store. I cannot make the number smaller." (11) ____

(12) In conclusion, "Inventory" is a sad poem about a store closing.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not support the analysis of the poem?`,
          choices: [
            no(`Sentence 4`, 'removes-analysis'),
            ok(`Sentence 8`),
            no(`Sentence 6`, 'removes-key-evidence'),
            no(`Sentence 9`, 'removes-key-evidence'),
          ],
          solution: `Sentence 8 is a general fact about hardware stores, not evidence from the poem. Sentence 4 is the writer's reading of an image in the first stanza, so cutting it would remove analysis.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which phrase best fills the blank at the start of sentence 5?`,
          choices: [
            no(`For instance`, 'misreads-relationship'),
            no(`Despite this`, 'false-contrast'),
            ok(`As the poem moves forward`),
            no(`In summary`, 'premature-conclusion'),
          ],
          solution: `Sentence 5 describes a shift that develops later in the poem, so a phrase about the poem moving forward fits and leads into the second stanza. "Despite this" is wrong because the slide into memories builds on the hint in sentence 4 rather than working against it.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Which sentence, placed in the blank at sentence 11, best explains how the final line supports the writer's claim?`,
          choices: [
            no(`The last line shows that the speaker was tired and simply lost track of her count.`, 'literal-reading'),
            no(`The last line shows that the speaker plans to reopen the store under a new name.`, 'unsupported-inference'),
            no(`The poem ends with a quotation, which is a common way for poets to finish a work.`, 'summary-not-analysis'),
            ok(`By refusing to make "one store" smaller, the speaker shows the place is more than the total of its parts.`),
          ],
          solution: `The claim in sentence 2 is that the store cannot be reduced to counted objects, and the speaker's refusal to shrink "one store" shows exactly that. Reading the line as simple tiredness ignores the poem's movement from goods to memories.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Which revision of sentence 12 best concludes the draft?`,
          choices: [
            ok(`By turning a list of goods into a list of memories, Halabi shows that the speaker's loss cannot be measured as stock.`),
            no(`Halabi's poem shows that small hardware stores are closing because larger chains sell goods for less money.`, 'outside-claim'),
            no(`In "Inventory," the speaker counts hinges, rope, keys, a stool and a bell before she finally stops counting.`, 'summary-not-analysis'),
            no(`Halabi's poem proves that writing a list is the best way for anyone to deal with a painful loss.`, 'overgeneralization'),
          ],
          solution: `The correct conclusion restates the claim about the list form and ties it to the shift traced through all three stanzas. The summary choice lists items from the poem without saying what they show, and the chain store choice relies on an idea the poem never mentions.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `What does sentence 4 contribute to the writer's argument?`,
          choices: [
            no(`It shows that the first stanza is the most important part of the poem.`, 'overstates-evidence'),
            no(`It points out that the store sold some items that did not work.`, 'literal-reading'),
            ok(`It shows the shift toward loss is hinted at even in the plainest part of the list.`),
            no(`It proves that the speaker had lost the keys to her father's store.`, 'unsupported-inference'),
          ],
          solution: `By finding loss in the "keys with no locks," the writer shows the list form carries meaning from the very start, which supports the claim in sentence 2. Reading the keys as broken merchandise misses that the writer treats them as an image of lost purpose.`,
        },
      ],
    },
  ],
}

export default skill
