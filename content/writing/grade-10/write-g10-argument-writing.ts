import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g10-argument-writing',
  subject: 'writing',
  grade: 10,
  group: 'Composition',
  name: 'Argument Writing',
  standards: ['W.9-10.1'],
  passages: [
    {
      code: 'wg10-argument-writing-p01',
      title: 'A Weather Station for Calder High',
      body: `(1) Calder High School's earth science classes study weather almost entirely from textbook charts and data collected hundreds of miles away. (2) Weather is something that affects everyone every day. (3) The science department should install a rooftop weather station so that students can collect and analyze local data themselves. (4) A basic station measures temperature, humidity, wind speed and rainfall, and it uploads readings every ten minutes to a free online classroom portal. (5) At nearby Fairlow High, which installed a similar station two years ago, the average score on the regional earth science exam rose from 71 to 79 percent. (6) Fairlow's teachers reported that students asked more questions when the numbers came from their own neighborhood. (7) Fairlow also has a very large parking lot that was repaved last summer.

(8) Some members of the school board argue that the station's cost of about $2,400 is too high when the department already struggles to replace broken microscopes. (9) That concern deserves a serious answer. (10) The Calder Parent Association has offered to cover half the cost through its spring fundraiser, and the station's sensors carry a ten-year warranty. (11) Spread across a decade, the district's share would come to roughly $120 a year, less than the price of a single new microscope.

(12) The station would also support classes beyond earth science. (13) Math students could graph a month of temperature readings, and the journalism club could publish weekly weather reports for the school website. (14) So yeah, a weather station is a really good idea and people should stop complaining about it.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            no(`sentence (5)`, 'removes-key-evidence'),
            no(`sentence (9)`, 'removes-concession'),
            ok(`sentence (7)`),
            no(`sentence (13)`, 'removes-supporting-detail'),
          ],
          solution: `Sentence (7) describes Fairlow's parking lot, which has nothing to do with whether Calder should install a weather station. Sentence (5) must stay because it is the writer's strongest evidence that a station improves learning.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence (14) as a formal conclusion that follows from the argument?`,
          choices: [
            no(`In conclusion, weather is important, and everyone should pay closer attention to it.`, 'too-general'),
            ok(`Because a station would improve learning in several subjects at a modest yearly cost, the department should install one.`),
            no(`Anyone who still opposes the station clearly does not care about science education at all.`, 'dismissive-tone'),
            no(`The school should also build a greenhouse beside the station for the biology classes.`, 'introduces-new-topic'),
          ],
          solution: `The correct conclusion restates the claim and draws on both the learning evidence and the cost reasoning in sentences (10) and (11). The general statement about weather drops the writer's actual position.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `The writer wants to begin sentence (12) with a transition. Which choice best shows how sentence (12) relates to the paragraphs before it?`,
          choices: [
            no(`In contrast,`, 'contrast-for-addition'),
            no(`As a result,`, 'cause-effect-for-addition'),
            no(`For instance,`, 'example-for-addition'),
            ok(`In addition,`),
          ],
          solution: `Sentence (12) introduces another benefit of the station, so "In addition" signals that a new reason is being added. "As a result" is wrong because help for math and journalism classes is not caused by the cost plan just described.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `In sentences (8) and (9), the writer mainly:`,
          choices: [
            ok(`acknowledges an opposing claim fairly before responding to it`),
            no(`presents new evidence that the station improves exam scores`, 'misreads-function'),
            no(`changes position and agrees that the station costs too much`, 'confuses-concession-with-reversal'),
            no(`summarizes the argument before reaching the final conclusion`, 'misidentifies-structure'),
          ],
          solution: `Sentence (8) states the board's cost objection and sentence (9) grants that it is serious, setting up the answer in sentences (10) and (11). The writer does not change position, because the next sentences show the cost is manageable.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `A reader might say the score increase in sentence (5) could have happened for other reasons. Which sentence, added after sentence (5), would best answer that concern?`,
          choices: [
            no(`Fairlow High is well known throughout the region for its strong athletic teams.`, 'irrelevant-detail'),
            no(`Many students say they enjoy learning about storms, floods and hurricanes.`, 'unsupported-generalization'),
            ok(`Fairlow's teachers made no other changes to the earth science course during those years.`),
            no(`The regional earth science exam is given to every tenth grader each spring.`, 'evidence-off-point'),
          ],
          solution: `If nothing else in the course changed, the station becomes a more likely reason for the higher scores, which strengthens the reasoning behind sentence (5). The detail about when the exam is given explains the test but does nothing to rule out other causes.`,
        },
      ],
    },
    {
      code: 'wg10-argument-writing-p02',
      title: 'Voices of Westvale',
      body: `(1) Every spring, sophomores at Westvale High write a research paper on a historical event using only books and websites. (2) This year the history department should replace that paper with an oral history project in which each student interviews an older resident about a local event. (3) Oral history asks students to do what historians actually do: gather firsthand accounts, compare them with written records and explain where they differ. (4) When the Westvale Historical Society piloted the project with one class last year, students recorded 26 interviews about the 1987 flood that closed the Marsh Road bridge for eight months. (5) Several of those recordings described evacuation routes that appeared in no newspaper from the time. (6) The interviews are now stored in the society's archive, where future researchers can use them.

(7) Some teachers worry that the project would weaken students' research writing skills. (8) Students in the pilot class still wrote a five-page paper analyzing their interview alongside at least three written sources. (9) Their average writing score on the department rubric was 3.4 out of 4, slightly higher than the 3.2 average in classes that wrote the traditional paper.

(10) Other teachers point out that some students may struggle to find someone to interview. (11) The historical society has offered a list of more than sixty volunteers who are willing to be interviewed at the public library. (12) The society's building on Pike Street used to be a general store. (13) Honestly, it's kind of obvious this project is better.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            no(`sentence (5)`, 'removes-key-evidence'),
            no(`sentence (9)`, 'removes-key-evidence'),
            no(`sentence (11)`, 'removes-rebuttal'),
            ok(`sentence (12)`),
          ],
          solution: `Sentence (12) gives a fact about the society's building that has no bearing on whether the project should replace the paper. Sentence (11) must stay because it answers the concern raised in sentence (10).`,
        },
        {
          slot: 7,
          difficulty: 'medium',
          stem: `The writer wants to add a transition at the beginning of sentence (8). Which choice best shows that sentence (8) responds to the worry in sentence (7)?`,
          choices: [
            no(`Likewise,`, 'similarity-for-contrast'),
            ok(`However,`),
            no(`Therefore,`, 'cause-effect-for-contrast'),
            no(`In other words,`, 'restatement-for-contrast'),
          ],
          solution: `Sentence (8) pushes back against the worry that writing skills would weaken, so "However" signals the contrast. "Therefore" is wrong because the pilot paper is not a result of the teachers' worry.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (13) to give the essay a conclusion with a formal style?`,
          choices: [
            no(`Anyone who disagrees has obviously never listened to a really good interview.`, 'dismissive-tone'),
            no(`In conclusion, history is a very interesting subject that everyone should study.`, 'too-general'),
            ok(`Because oral history builds real research skills without weakening writing, the department should adopt it this spring.`),
            no(`The department should also take every sophomore on a field trip to the state capital.`, 'introduces-new-topic'),
          ],
          solution: `The correct choice restates the claim formally and connects it to the evidence about research skills and writing scores. The choice "Anyone who disagrees has obviously never listened to a really good interview" keeps an unfair, dismissive tone toward those who disagree.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which statement best describes the role of sentences (10) and (11) in the argument?`,
          choices: [
            no(`They provide evidence that the pilot class improved its writing scores.`, 'misreads-function'),
            no(`They restate the writer's claim that the paper should be replaced.`, 'misidentifies-structure'),
            no(`They concede that the project should be delayed until next year.`, 'confuses-concession-with-reversal'),
            ok(`They raise a second opposing concern and answer it with a practical solution.`),
          ],
          solution: `Sentence (10) presents another objection, and sentence (11) answers it with the society's list of volunteers. The writing scores appear in sentence (9), not in these sentences.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `A skeptical reader says the scores in sentence (9) might only mean the pilot class had stronger writers to begin with. Which added sentence would best address that objection?`,
          choices: [
            ok(`The pilot class and the comparison classes had nearly identical writing scores at the start of the year.`),
            no(`The pilot students said the project was more enjoyable than any other assignment.`, 'opinion-not-evidence'),
            no(`The department rubric was written by the history teachers several years ago.`, 'irrelevant-detail'),
            no(`Most teachers agree that writing is one of the most important skills in school.`, 'unsupported-generalization'),
          ],
          solution: `If both groups started at the same level, the later difference is more likely linked to the project, which answers the objection directly. Student enjoyment may be true, but it says nothing about whether the groups began as equal writers.`,
        },
      ],
    },
    {
      code: 'wg10-argument-writing-p03',
      title: 'Protected Lanes on Tamsin Avenue',
      body: `(1) Tamsin Avenue connects Harrow Middle School, Lindell High School and the public pool, yet cyclists on the avenue share a narrow lane with cars and delivery trucks. (2) Bikes are a topic that many people have opinions about. (3) A city traffic count last fall found that about 340 students ride bicycles along the avenue on a typical school day. (4) During the same year, the police department recorded eleven collisions between cyclists and vehicles on the avenue, more than on any other street in town. (5) In the town of Bellmere, which added curb-separated bike lanes to a busy street in 2021, collisions involving cyclists dropped by 60 percent over the next two years. (6) Bellmere is also famous for its annual pumpkin festival.

(7) Shop owners in the Riverside district worry that removing street parking to make room for the lanes would drive away customers. (8) Their concern is understandable, since many of them depend on drivers who stop for quick errands. (9) A study of 40 small businesses on Bellmere's redesigned street found that sales held steady or rose at 34 of them. (10) The city could also turn the empty lot behind the post office into a small parking area to replace the lost spaces.

(11) Protected lanes on Tamsin Avenue would make daily trips safer for hundreds of students. (12) Bikes are fun, and that is about all there is to say.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence (2) as a precise statement of the writer's claim?`,
          choices: [
            no(`Bicycles have been a popular form of transportation for well over a century.`, 'too-general'),
            ok(`The city council should build curb-separated bike lanes along Tamsin Avenue to protect student riders.`),
            no(`Some people might think bike lanes could possibly be helpful in certain cases.`, 'hedged-no-position'),
            no(`The city should ban every car and truck from Tamsin Avenue permanently.`, 'overstated-claim'),
          ],
          solution: `The correct choice takes a clear, specific position that the evidence about student riders and collisions supports. Banning all vehicles goes far beyond the evidence and ignores the writer's own concern for the shops in sentences (7) through (10).`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which sentence is least relevant to the argument and should be removed?`,
          choices: [
            no(`sentence (4)`, 'removes-key-evidence'),
            no(`sentence (8)`, 'removes-concession'),
            no(`sentence (10)`, 'removes-rebuttal'),
            ok(`sentence (6)`),
          ],
          solution: `Sentence (6) mentions a pumpkin festival, which does not help show that bike lanes are needed. Sentence (8) should stay because it fairly acknowledges the shop owners' concern.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `The writer wants to add a transition at the beginning of sentence (9). Which choice best links the evidence to the concern in sentences (7) and (8)?`,
          choices: [
            no(`For example,`, 'example-for-contrast'),
            no(`Similarly,`, 'similarity-for-contrast'),
            ok(`Nevertheless,`),
            no(`As a result,`, 'cause-effect-for-contrast'),
          ],
          solution: `Sentence (9) presents evidence that cuts against the shop owners' fear, so "Nevertheless" shows that contrast. "For example" is wrong because the Bellmere study does not illustrate the owners' concern; it challenges it.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (12) as a conclusion that follows from the argument?`,
          choices: [
            no(`Safety is something that people in every town should think about all the time.`, 'too-general'),
            no(`Shop owners who oppose the lanes care more about money than about children.`, 'dismissive-tone'),
            no(`The council should also lower the speed limit on every street in the town.`, 'introduces-new-topic'),
            ok(`The council should approve the lanes this year and add replacement parking so riders and shops both benefit.`),
          ],
          solution: `The correct choice restates the claim and reflects both the safety evidence and the parking solution in sentence (10). The comment about shop owners abandons the fair treatment of their concern shown in sentence (8).`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Sentence (5) uses Bellmere as evidence. Which added detail would best show that Bellmere is a fair comparison to Tamsin Avenue?`,
          choices: [
            no(`Bellmere's council voted unanimously for the lanes after a long public meeting.`, 'evidence-off-point'),
            ok(`Like Tamsin Avenue, Bellmere's street carried similar daily traffic and passed two schools.`),
            no(`Bellmere's lanes were painted bright green so that drivers would notice them easily.`, 'describes-not-compares'),
            no(`Many cities across the country have been building more bike lanes in recent years.`, 'too-general'),
          ],
          solution: `A comparison is only convincing if the two streets are alike, and the correct detail shows similar traffic and nearby schools. The vote and the paint color describe Bellmere's lanes but never show that the streets are comparable.`,
        },
      ],
    },
    {
      code: 'wg10-argument-writing-p04',
      title: 'Pitch Limits in the Lakemont League',
      body: `(1) The Lakemont Youth Baseball League, which serves players ages 11 to 15, currently places no limit on how many pitches a player may throw in a game. (2) The league should adopt a rule limiting each pitcher to 85 pitches per game and requiring rest days after any outing over 50 pitches. (3) Arm injuries in young pitchers often develop slowly, as repeated stress strains muscles and growth plates that are still developing. (4) A five-year study of 1,200 youth pitchers by the Northgate Sports Medicine Clinic found that players who regularly threw more than 85 pitches in a game were three times as likely to need elbow treatment. (5) Last season, two Lakemont pitchers missed the playoffs because of sore elbows, and one needed months of physical therapy. (6) The league's uniforms were redesigned in navy and gold last season.

(7) Some coaches argue that pitch limits would force teams to use weaker pitchers in close games, making competition less fair. (8) It is true that a limit would change how coaches plan their games. (9) Leagues in neighboring Carroway County adopted the same limits four years ago. (10) Their coaches now train six or seven pitchers per team instead of three, and the share of close games, those decided by two runs or fewer, has stayed about the same.

(11) Coaches who complain about pitch counts are just being selfish. (12) Protecting young arms now means more players will still be able to pitch in high school and beyond.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which revision of sentence (11) best keeps a formal style and an objective tone?`,
          choices: [
            no(`Coaches who disagree simply do not understand how the game of baseball works.`, 'dismissive-tone'),
            ok(`Although coaches' concerns are reasonable, the Carroway results suggest limits need not make games less fair.`),
            no(`Honestly, coaches should kind of just get over it and follow the new rules.`, 'keeps-informal-tone'),
            no(`Coaches have many opinions, and every opinion matters a great deal in a debate.`, 'vague-wording'),
          ],
          solution: `The correct revision respects the coaches' view while pointing to the evidence in sentences (9) and (10). The choice "Coaches who disagree simply do not understand how the game of baseball works" still attacks the coaches instead of answering their reasoning.`,
        },
        {
          slot: 17,
          difficulty: 'medium',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            no(`sentence (4)`, 'removes-key-evidence'),
            ok(`sentence (6)`),
            no(`sentence (8)`, 'removes-concession'),
            no(`sentence (10)`, 'removes-rebuttal'),
          ],
          solution: `Sentence (6) is about uniform colors, which has nothing to do with protecting pitchers' arms. Sentence (8) may look unhelpful to the writer's side, but it fairly concedes part of the coaches' point before the writer answers it.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which transition, added at the beginning of sentence (9), best links the concession in sentence (8) to the evidence that follows?`,
          choices: [
            no(`Furthermore,`, 'addition-for-contrast'),
            no(`In summary,`, 'summary-for-contrast'),
            no(`Because of this,`, 'cause-effect-for-contrast'),
            ok(`Even so,`),
          ],
          solution: `After admitting that limits change game planning, the writer turns to evidence that competition stayed fair, so "Even so" signals the shift. "Furthermore" would wrongly suggest that the Carroway evidence adds to the coaches' objection.`,
        },
        {
          slot: 19,
          difficulty: 'hard',
          stem: `Which statement best explains how sentence (5) strengthens the argument in a way that sentence (4) does not?`,
          choices: [
            ok(`It shows that the risk found in the study is already affecting players in Lakemont's own league.`),
            no(`It provides a larger and more reliable sample of players than the clinic's study.`, 'misreads-evidence'),
            no(`It answers the coaches' objection that pitch limits would make games less fair.`, 'misidentifies-function'),
            no(`It proves that high pitch counts alone caused every elbow injury in the league.`, 'overstates-evidence'),
          ],
          solution: `Sentence (4) gives general research, while sentence (5) shows the problem happening locally, which makes the claim feel urgent for this league. Two injured players is a much smaller sample than 1,200, so sentence (5) is not stronger for its size.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `The claim in sentence (2) has two parts, but the evidence supports mainly the pitch limit. Which sentence would best support the second part, the required rest days?`,
          choices: [
            no(`Many professional pitchers ice their arms carefully after every game they pitch.`, 'evidence-off-point'),
            no(`Rest days would also give young players more time to finish their homework.`, 'irrelevant-benefit'),
            ok(`The same Northgate study found that pitchers who rested two days after long outings reported elbow pain far less often.`),
            no(`Some parents say their children enjoy pitching more than playing any other position.`, 'off-topic-evidence'),
          ],
          solution: `The correct choice gives evidence about rest days for youth pitchers, the exact part of the claim that lacks support. Icing by professional pitchers concerns a different practice and a different age group.`,
        },
      ],
    },
    {
      code: 'wg10-argument-writing-p05',
      title: 'A Piano for Eastbrook Station',
      body: `(1) Each weekday, nearly 6,000 commuters pass through the waiting hall of Eastbrook Station, most of them staring at their phones in silence. (2) The Eastbrook Arts Council should place a public piano in the waiting hall for anyone to play. (3) When the town of Wren Harbor placed a piano in its ferry terminal three years ago, a survey of 500 travelers found that 72 percent said the music made their wait more pleasant. (4) A public piano also gives young musicians, including students who cannot afford practice space, a place to perform for a real audience. (5) Wren Harbor's terminal staff reported that litter in the waiting area decreased after the piano arrived, possibly because travelers began treating the space with more care. (6) My cousin plays the trumpet in her school band.

(7) Some commuters worry that a piano would create noise in a space where people make phone calls or rest. (8) This objection is reasonable, since not everyone wants music during a stressful trip. (9) The council could limit playing hours to the daytime and place the piano at the far end of the hall, away from the quiet seating area. (10) Others fear the instrument would be damaged. (11) Wren Harbor's piano, which is covered and locked each night, has needed only one repair in three years.

(12) Overall, everybody would love it.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            ok(`sentence (6)`),
            no(`sentence (3)`, 'removes-key-evidence'),
            no(`sentence (8)`, 'removes-concession'),
            no(`sentence (11)`, 'removes-rebuttal'),
          ],
          solution: `Sentence (6) is a personal detail about a cousin's trumpet playing that does not support placing a piano in the station. Sentence (11) must stay because it answers the worry about damage.`,
        },
        {
          slot: 22,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence (12) as a conclusion that follows from the argument?`,
          choices: [
            no(`In the end, music is one of the greatest inventions in all of human history.`, 'too-general'),
            no(`Commuters who dislike music should simply find some other way to get to work.`, 'dismissive-tone'),
            ok(`With sensible hours and placement, a piano would make the station more welcoming and give musicians an audience.`),
            no(`The council should also paint the waiting hall a brighter color sometime next year.`, 'introduces-new-topic'),
          ],
          solution: `The correct conclusion sums up the benefits and the solutions to the noise concern from sentence (9). The statement about music in history is too general and drops the claim about Eastbrook Station.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which revision of sentence (10) best uses a transition to show that the writer is turning to a second opposing concern?`,
          choices: [
            no(`As a result, others fear the instrument would be damaged.`, 'cause-effect-for-addition'),
            ok(`A second concern is that the instrument would be damaged.`),
            no(`For example, others fear the instrument would be damaged.`, 'example-for-addition'),
            no(`In conclusion, others fear the instrument would be damaged.`, 'summary-for-addition'),
          ],
          solution: `"A second concern" clearly signals that a new objection follows the noise worry. "As a result" is wrong because fear of damage is not caused by the plan for playing hours in sentence (9).`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `Which statement best describes how the writer handles the evidence in sentence (5)?`,
          choices: [
            no(`The writer proves that the piano was the only reason litter decreased.`, 'overstates-evidence'),
            no(`The writer introduces an opposing claim and then answers it.`, 'misidentifies-function'),
            ok(`The writer reports a result but avoids claiming the piano definitely caused it.`),
            no(`The writer admits that the piano made the waiting area less clean.`, 'misreads-evidence'),
          ],
          solution: `The word "possibly" shows the writer is careful not to overstate what the litter data proves, which keeps the reasoning honest. The sentence does not claim proof, so the choice "The writer proves that the piano was the only reason litter decreased" misreads it.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (9), would best strengthen the response to the noise concern in sentence (7)?`,
          choices: [
            no(`Pianos come in many sizes, from small uprights to large concert grands.`, 'irrelevant-detail'),
            no(`Music has been shown to improve people's moods in many situations.`, 'too-general'),
            no(`Some commuters already listen to music through earbuds while they wait.`, 'evidence-off-point'),
            ok(`In Wren Harbor's survey, only 4 percent said the piano made calls or announcements harder to hear.`),
          ],
          solution: `The correct choice gives specific evidence that noise was rarely a problem in a similar setting, which directly answers sentence (7). The general claim about mood does not address whether the piano interferes with calls or rest.`,
        },
      ],
    },
    {
      code: 'wg10-argument-writing-p06',
      title: 'Repairable Laptops for Dunmore Schools',
      body: `(1) The Dunmore School District replaces about 900 student laptops every year, most of them because of a single broken part such as a cracked screen or a worn-out battery. (2) When the district signs its next equipment contract in March, it should choose laptops designed with parts that can be replaced at school. (3) On the current models, a cracked screen costs $210 to fix through the manufacturer, which is nearly half the price of a new device. (4) On repairable models sold by several companies, a replacement screen costs about $45 and can be installed by a trained technician in under fifteen minutes. (5) Laptops can be used for many things, like writing essays and watching videos. (6) Fewer discarded devices would also reduce the electronic waste the district sends to recycling centers each year.

(7) Opponents argue that repairable laptops cost about $60 more per device up front. (8) This difference is real, and the district would need to plan for it. (9) The district's technology office estimates that repairing instead of replacing broken laptops would save roughly $95,000 a year, more than covering the higher purchase price within two years. (10) In addition, a pilot at Grayson Middle School trained eight students as repair assistants, giving them practical experience with electronics.

(11) To conclude, laptops are expensive, so whatever the district decides is fine.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            no(`sentence (3)`, 'removes-key-evidence'),
            no(`sentence (6)`, 'removes-supporting-detail'),
            ok(`sentence (5)`),
            no(`sentence (8)`, 'removes-concession'),
          ],
          solution: `Sentence (5) lists general uses for laptops and does not help show why repairable models are the better purchase. Sentence (6) stays because reduced waste is a second reason supporting the claim.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which transition, added at the beginning of sentence (9), best shows how it responds to sentences (7) and (8)?`,
          choices: [
            ok(`Over time, however,`),
            no(`For instance,`, 'example-for-contrast'),
            no(`Likewise,`, 'similarity-for-contrast'),
            no(`First of all,`, 'sequence-for-contrast'),
          ],
          solution: `Sentence (9) argues that the higher up-front price is outweighed by savings over several years, so "Over time, however" signals both the contrast and the longer view. "Likewise" would wrongly suggest that the savings agree with the opponents' cost point.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (11) as a conclusion that follows from the argument?`,
          choices: [
            no(`To conclude, technology changes so quickly that no one can predict the future.`, 'too-general'),
            no(`Anyone who prefers the old laptops is wasting the district's money on purpose.`, 'dismissive-tone'),
            no(`The district should also buy every teacher a brand new tablet next year.`, 'introduces-new-topic'),
            ok(`Because repairable laptops pay for themselves within two years and cut waste, the district should choose them in March.`),
          ],
          solution: `The correct conclusion restates the claim and draws on the savings and waste evidence. The current sentence (11) gives up the writer's position, and the choice about predicting the future is just as vague.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `The writer wants to add a sentence after sentence (2) that distinguishes the claim from an alternate approach. Which sentence does this best?`,
          choices: [
            no(`Laptops have become a necessary tool in nearly every classroom in the district.`, 'too-general'),
            ok(`Buying cheaper laptops and replacing them often may seem simpler, but it costs more over time.`),
            no(`Some students prefer to write their essays by hand instead of typing them.`, 'off-topic'),
            no(`Repairable laptops are the single most important issue facing the district today.`, 'overstated-claim'),
          ],
          solution: `The correct sentence names the alternate approach, buying cheaper laptops, and explains why the writer's plan differs from it. The statement about laptops in classrooms is true but does not set the claim apart from any other option.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `A skeptical reader questions the estimate in sentence (9). Which added information would make that estimate most convincing?`,
          choices: [
            no(`The technology office has six employees and is located in the district headquarters.`, 'irrelevant-detail'),
            no(`Saving money is always a wise goal for any school district to pursue.`, 'too-general'),
            ok(`The estimate is based on the district's own repair records from the past three years.`),
            no(`Other districts may also be thinking about switching to repairable laptops.`, 'vague-evidence'),
          ],
          solution: `Showing that the estimate comes from real local records makes the number credible and relevant. The office's size says nothing about whether its estimate is accurate.`,
        },
      ],
    },
    {
      code: 'wg10-argument-writing-p07',
      title: 'Swim Lessons at Pell Harbor High',
      body: `(1) Pell Harbor sits on a bay with four public beaches, yet many students at Pell Harbor High cannot swim the length of a pool. (2) Swimming is something a lot of people do in the summer. (3) A fall survey by the physical education department found that 31 percent of ninth graders could not swim 25 meters without stopping. (4) The town's lifeguard captain reported that most of the rescues at local beaches last summer involved teenagers. (5) Pell Harbor High already has access to the community center's indoor pool, which sits empty most weekday mornings. (6) The pool was built in 1974 and has eight lanes.

(7) Some parents worry that a swimming unit would take time away from other activities, such as team sports and fitness testing. (8) The department could shorten the volleyball unit from six weeks to three, a change the physical education teachers themselves have proposed. (9) Other parents are concerned that students who already swim well would be bored. (10) Strong swimmers could instead earn certification in basic water rescue, a skill that could lead to summer lifeguard jobs.

(11) So basically, swimming is cool and the school should do it.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence (2) as a precise statement of the writer's claim?`,
          choices: [
            no(`Water covers most of the surface of the planet that we live on.`, 'too-general'),
            no(`Swimming might be something that some students could think about learning.`, 'hedged-no-position'),
            no(`Every student in the state should be required to become a certified lifeguard.`, 'overstated-claim'),
            ok(`Pell Harbor High should add a required four-week swimming unit to ninth-grade physical education.`),
          ],
          solution: `The correct choice states a specific, arguable position that fits the survey and the plan for using the pool. Requiring every student in the state to be a lifeguard goes far beyond what the evidence about one school supports.`,
        },
        {
          slot: 32,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            no(`sentence (3)`, 'removes-key-evidence'),
            ok(`sentence (6)`),
            no(`sentence (5)`, 'removes-supporting-detail'),
            no(`sentence (8)`, 'removes-rebuttal'),
          ],
          solution: `The pool's age and number of lanes in sentence (6) do not help show that students need swimming lessons. Sentence (5) stays because an empty pool shows the plan is practical.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which transition, added at the beginning of sentence (8), best shows that it responds to the worry in sentence (7)?`,
          choices: [
            ok(`To address this concern,`),
            no(`Similarly,`, 'similarity-for-response'),
            no(`In conclusion,`, 'summary-for-response'),
            no(`For example,`, 'example-for-response'),
          ],
          solution: `Sentence (8) offers a solution to the parents' worry about lost time, so "To address this concern" makes that relationship clear. "For example" is wrong because shortening volleyball is not an example of the worry; it is an answer to it.`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (11) as a formal conclusion that follows from the argument?`,
          choices: [
            no(`Parents who object to the plan clearly do not care about their children's safety.`, 'dismissive-tone'),
            ok(`By using an empty pool and a shorter volleyball unit, the school could teach every student to swim at little cost.`),
            no(`Overall, safety should always be the top priority for everyone in every situation.`, 'too-general'),
            no(`The school should also start a sailing club for students who enjoy the bay.`, 'introduces-new-topic'),
          ],
          solution: `The correct conclusion follows from the evidence and the answers to both objections. The sentence about parents attacks people who disagree instead of keeping an objective tone.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Sentence (4) is less precise than sentence (3). Which revision would make sentence (4) the strongest evidence for the claim?`,
          choices: [
            no(`The town's lifeguard captain, who has worked at the beaches for years, said rescues are always stressful.`, 'evidence-off-point'),
            no(`The town's lifeguard captain believes that swimming is the best form of exercise for teenagers.`, 'opinion-not-evidence'),
            ok(`The town's lifeguard captain reported that 19 of the 27 rescues at local beaches last summer involved swimmers ages 13 to 18.`),
            no(`The town's lifeguard captain reported that the local beaches were very crowded last summer.`, 'vague-evidence'),
          ],
          solution: `Exact numbers showing that most rescues involved teenagers make the danger concrete and connect it to students. The captain's opinion about exercise is not evidence that students need swimming instruction for safety.`,
        },
      ],
    },
    {
      code: 'wg10-argument-writing-p08',
      title: 'Saving the Ashby Hemlocks',
      body: `(1) The hemlock trees in Ashby Town Forest shade the cold streams where native brook trout lay their eggs. (2) Over the past three years, an invasive sap-feeding insect has spread into the forest, and a survey by the Ashby Conservation Commission found that 40 percent of the hemlocks now show damage. (3) The commission should fund a treatment program that protects the 600 largest hemlocks along the forest's streams. (4) Without the hemlocks' shade, stream temperatures can rise several degrees in summer, which makes it harder for trout eggs to survive. (5) In nearby Thornbury Forest, where the same insect went untreated, nearly half the streamside hemlocks died within eight years. (6) Hiking in the forest is one of my favorite weekend activities.

(7) Some residents argue that the commission should simply let nature take its course. (8) They point out that forests have always changed and that the treatment would cost about $18,000 a year. (9) However, the insect is not part of the forest's natural history, since it arrived on nursery plants shipped from overseas. (10) The treatment would also be needed only until a beetle that feeds on the insect, now being tested at Marlowe State University, becomes available.

(11) Other residents suggest cutting the damaged trees and replanting with different species. (12) Young trees, however, would take decades to cast enough shade to cool the streams.

(13) In the end, the hemlocks are nice trees.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            no(`sentence (4)`, 'removes-key-evidence'),
            no(`sentence (8)`, 'removes-concession'),
            no(`sentence (12)`, 'removes-rebuttal'),
            ok(`sentence (6)`),
          ],
          solution: `Sentence (6) shares a personal preference about hiking that does not help show why the hemlocks should be treated. Sentence (4) stays because it explains why the trees matter for the trout.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (13) as a conclusion that follows from the argument?`,
          choices: [
            no(`In the end, every tree in every forest deserves to be protected forever.`, 'too-general'),
            ok(`Treating the streamside hemlocks now would keep the trout streams cool until the beetle is ready, which neither waiting nor replanting can do.`),
            no(`Residents who want to let nature take its course simply do not care about trout.`, 'dismissive-tone'),
            no(`The commission should also build a larger parking lot at the forest entrance.`, 'introduces-new-topic'),
          ],
          solution: `The correct conclusion restates the claim and reflects the writer's answers to both opposing views. The statement about every tree overreaches and loses the specific focus on streamside hemlocks.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `How do sentences (11) and (12) strengthen the argument?`,
          choices: [
            no(`They provide new evidence about how quickly the insect is spreading.`, 'misreads-function'),
            no(`They concede that replanting is a better choice than treatment.`, 'confuses-concession-with-reversal'),
            ok(`They address an alternate solution and explain why it would not protect the streams in time.`),
            no(`They restate the claim from sentence (3) using different words.`, 'misidentifies-structure'),
          ],
          solution: `Sentence (11) presents replanting as an alternative, and sentence (12) shows why it falls short. The word "however" in sentence (12) makes clear that the writer does not accept replanting as the better choice.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Sentence (9) answers the idea that forests have always changed, but the cost raised in sentence (8) is answered only indirectly. Which sentence, added after sentence (10), would best address the cost directly?`,
          choices: [
            no(`Healthy hemlocks can live for several hundred years if they are protected.`, 'evidence-off-point'),
            no(`Many people in town enjoy fishing for brook trout each spring.`, 'irrelevant-detail'),
            no(`Money should never matter when the future of nature is at stake.`, 'unsupported-assertion'),
            ok(`The commission's land fund can cover the treatment for five years, by which time the beetle is expected to be ready.`),
          ],
          solution: `The correct choice shows that the $18,000 yearly cost can be paid for the limited time the treatment is needed. Saying money should never matter dismisses the objection instead of answering it with evidence.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Why is it effective that the writer limits the claim in sentence (3) to the largest hemlocks along the streams rather than every hemlock in the forest?`,
          choices: [
            ok(`The evidence centers on shade for trout streams, so a narrower claim matches the evidence and keeps costs lower.`),
            no(`The passage states that the insect attacks only trees growing near water.`, 'unsupported-inference'),
            no(`The passage states that the commission has already treated all the other hemlocks.`, 'invents-fact'),
            no(`The writer believes the hemlocks away from the streams are not worth saving at all.`, 'overreads-omission'),
          ],
          solution: `Sentences (1), (4) and (5) all focus on streamside trees and trout, so a precise claim about those trees fits the evidence. The passage never says the insect attacks only trees near water, so that choice relies on information not given.`,
        },
      ],
    },
  ],
}

export default skill
