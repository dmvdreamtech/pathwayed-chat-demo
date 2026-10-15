import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g8-argument-writing',
  subject: 'writing',
  grade: 8,
  group: 'Composition',
  name: 'Argument Writing',
  standards: ['W.8.1'],
  passages: [
    {
      code: 'wg8-argument-writing-p01',
      title: 'A Later Start for Westbrook',
      body: `(1) Many students at Westbrook Middle School arrive at first period yawning and struggling to focus. (2) Our school should move the start of the day from 7:30 to 8:30 in the morning. (3) Scientists who study sleep report that teenagers' bodies naturally fall asleep later at night than younger children's bodies do. (4) As a result, an early bell forces many students to wake up before they have rested enough. (5) In a survey our student council gave last spring, 68 percent of eighth graders said they feel tired during morning classes. (6) My cousin goes to a school in another state, and he likes his teachers a lot.

(7) Some parents argue that a later start would make after-school sports end too late. (8) This concern is reasonable, since practices already run until 5:00. (9) However, teams could use the gym lights and shorten warm-ups, and several nearby schools have adjusted their schedules this way without canceling any games. (10) A later start would also cut down on the number of students who are late for first period.

(11) Honestly, waking up early is the worst and everybody hates it. (12) For all these reasons, I think we should do something about the schedule.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the claim?`,
          choices: [
            no(`sentence (3)`, 'removes-key-evidence'),
            no(`sentence (8)`, 'removes-counterclaim'),
            ok(`sentence (6)`),
            no(`sentence (4)`, 'removes-reasoning'),
          ],
          solution: `Sentence (6) is about a cousin liking his teachers, which has nothing to do with school start times. Sentence (8) should stay because it fairly acknowledges the opposing claim before the writer answers it.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Sentence (11) is too informal for an argument. Which revision best keeps a formal style?`,
          choices: [
            no(`Honestly, early mornings are the absolute worst for basically everyone.`, 'keeps-informal-tone'),
            ok(`Waking up before the body is ready makes mornings difficult for many students.`),
            no(`Everybody hates waking up early, and that is just a fact.`, 'overgeneralization'),
            no(`Waking up early is bad, and it is bad for a lot of reasons.`, 'vague-wording'),
          ],
          solution: `The correct revision uses precise, formal language and connects to the sleep evidence in sentences (3) and (4). The other choices keep slang, exaggerate with "everybody," or stay vague.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `The writer wants to add a transition at the beginning of sentence (10). Which choice best shows that the sentence gives another reason supporting the claim?`,
          choices: [
            no(`Nevertheless,`, 'contrast-for-addition'),
            no(`For instance,`, 'example-for-addition'),
            no(`As a result,`, 'cause-effect-for-addition'),
            ok(`In addition,`),
          ],
          solution: `Sentence (10) adds a new benefit of a later start, so "In addition" signals another reason. "As a result" is wrong because fewer late arrivals do not result from the sports solution in sentence (9).`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (12) as a conclusion that follows from the argument?`,
          choices: [
            ok(`Because a later start would help students rest and the sports concern can be solved, Westbrook should begin classes at 8:30.`),
            no(`In conclusion, some students are tired and some are not, so the schedule is probably fine either way.`, 'contradicts-claim'),
            no(`Next year, the student council should also plan a spring dance for all of the eighth graders.`, 'introduces-new-topic'),
            no(`Sleep is something that every living creature on Earth needs in order to survive.`, 'too-general'),
          ],
          solution: `The correct choice restates the claim and sums up both the main reason and the answer to the opposing view. The choice about some students being tired abandons the writer's own position.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `How do sentences (7) through (9) strengthen the writer's argument?`,
          choices: [
            no(`They prove that sports are less important to students than getting enough sleep.`, 'overstates-purpose'),
            ok(`They state an opposing claim, admit it has some merit, and answer it with a practical solution and an example.`),
            no(`They introduce the writer's main claim about the school schedule for the first time.`, 'misidentifies-claim'),
            no(`They give statistical evidence that eighth graders feel tired in morning classes.`, 'confuses-evidence-location'),
          ],
          solution: `Sentence (7) gives the parents' concern, sentence (8) concedes it is reasonable, and sentence (9) responds with a solution and nearby schools' experience. The statistic about tired students is in sentence (5), not in this paragraph.`,
        },
      ],
    },
    {
      code: 'wg8-argument-writing-p02',
      title: 'A Garden on Elm Street',
      body: `(1) On the corner of Elm Street and Third Avenue sits an empty lot covered in weeds and broken glass. (2) Gardens are nice. (3) The city should turn this lot into a community garden that neighbors can share. (4) A garden would give families who live in apartments a place to grow fresh vegetables. (5) According to the county health department, residents in our neighborhood must travel more than a mile to reach a store that sells fresh produce. (6) A garden would also bring people together. (7) Neighbors who work side by side on weekends tend to get to know one another, and they look out for each other afterward.

(8) Some people claim that a garden would cost the city too much money. (9) A local hardware store has already offered to donate tools and lumber for raised beds, and volunteers from the high school have signed up to help build them. (10) The city's main expense would be a water connection, which the parks office estimates at about $2,000. (11) That's like nothing compared to what the city spends cleaning up the lot every year.

(12) A community garden would turn an eyesore into something the whole neighborhood can be proud of.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence states the writer's claim most clearly?`,
          choices: [
            no(`sentence (2)`, 'vague-claim'),
            no(`sentence (1)`, 'background-as-claim'),
            no(`sentence (6)`, 'reason-as-claim'),
            ok(`sentence (3)`),
          ],
          solution: `Sentence (3) states exactly what the writer wants: the city should turn the lot into a community garden. Sentence (2) is too vague to argue for, since it does not say what should be done.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which revision of sentence (11) best fits the formal style of an argument?`,
          choices: [
            no(`That's basically nothing, so people should stop complaining about the cost.`, 'keeps-informal-tone'),
            no(`Two thousand dollars is like no big deal at all for a city.`, 'keeps-informal-tone'),
            ok(`That amount is small compared to what the city spends each year to clean up the lot.`),
            no(`That cost is, like, honestly not really that much money.`, 'keeps-informal-tone'),
          ],
          solution: `The correct revision makes the same point with formal wording and a clear comparison. The other choices keep casual words such as "like," "basically," and "no big deal."`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which transition best begins sentence (9) to show that it answers the opposing claim in sentence (8)?`,
          choices: [
            ok(`However,`),
            no(`Similarly,`, 'similarity-for-contrast'),
            no(`For this reason,`, 'cause-effect-for-contrast'),
            no(`In other words,`, 'restatement-for-contrast'),
          ],
          solution: `Sentence (9) pushes back against the claim that the garden is too costly, so a contrast transition like "However" fits. "Similarly" would wrongly suggest that the donations agree with the cost concern.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which detail would best support the reason given in sentences (6) and (7)?`,
          choices: [
            no(`Tomatoes grow best when they receive at least six hours of sunlight each day.`, 'off-topic-detail'),
            no(`The empty lot on Elm Street has stood vacant for nearly ten years.`, 'supports-different-point'),
            ok(`At a garden in a nearby town, more than 40 neighbors attend monthly work days, and many had never met before.`),
            no(`Some neighbors would rather buy their vegetables at the weekend farmers market.`, 'undermines-claim'),
          ],
          solution: `Sentences (6) and (7) argue that a garden brings people together, and the correct detail shows neighbors meeting through a garden. The detail about the lot being vacant is true background but does not show people coming together.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (12), would best strengthen the conclusion by following from the argument?`,
          choices: [
            no(`Of course, the city could build a parking lot there instead, which might also be useful.`, 'undercuts-claim'),
            ok(`With donated supplies, willing volunteers, and a modest water cost, the city has every reason to approve this garden.`),
            no(`People in many cultures have planted gardens for thousands of years.`, 'unsupported-new-idea'),
            no(`Every person in the city will eat healthy food once the garden is finally built.`, 'overgeneralization'),
          ],
          solution: `The correct sentence pulls together the evidence from sentences (9) and (10) and ties it back to the claim. The parking lot sentence weakens the argument by offering an alternative the writer never supports.`,
        },
      ],
    },
    {
      code: 'wg8-argument-writing-p03',
      title: 'Room for the Arts',
      body: `(1) At Lakeview Middle School, eighth graders can choose between study hall and an elective in art or music. (2) Most students choose study hall because it seems easier. (3) Our school should require every eighth grader to take at least one semester of art or music. (4) Studying the arts teaches skills that matter in every subject. (5) When students learn to read sheet music, for example, they practice recognizing patterns, which is also an important skill in math. (6) Art classes ask students to plan a project, revise it after feedback, and finish it on time. (7) My favorite painter uses a lot of bright colors in her landscapes.

(8) Critics of this idea say students need study hall to keep up with homework. (9) It is true that eighth graders have a heavy workload. (10) Teachers at Lakeview report that many students spend study hall talking instead of working. (11) Also, a single semester of art or music would still leave students a full semester of study hall.

(12) The arts should not be treated as an extra. (13) They help students become better learners, and every eighth grader deserves the chance to experience them.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not support the writer's argument?`,
          choices: [
            no(`sentence (5)`, 'removes-key-evidence'),
            ok(`sentence (7)`),
            no(`sentence (9)`, 'removes-counterclaim'),
            no(`sentence (10)`, 'removes-key-evidence'),
          ],
          solution: `Sentence (7) describes the writer's favorite painter, which does not show why art or music should be required. Sentence (9) stays because it fairly admits part of the opposing view.`,
        },
        {
          slot: 12,
          difficulty: 'medium',
          stem: `Which transition best begins sentence (10)?`,
          choices: [
            no(`For example,`, 'example-for-contrast'),
            no(`Therefore,`, 'cause-effect-for-contrast'),
            ok(`However,`),
            no(`Likewise,`, 'similarity-for-contrast'),
          ],
          solution: `Sentence (9) admits that students have a heavy workload, and sentence (10) turns against the critics' point, so "However" shows the contrast. "Therefore" is wrong because students talking in study hall is not a result of a heavy workload.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `The writer wants to add evidence after sentence (6) to support the reason in sentence (4). Which sentence is most relevant?`,
          choices: [
            ok(`In a survey of Lakeview art students, 75 percent said the class helped them manage deadlines in other subjects.`),
            no(`The art room at Lakeview was painted a bright new shade of blue last summer.`, 'off-topic-detail'),
            no(`Some well-known musicians never took a single music class while they were in school.`, 'undermines-claim'),
            no(`Music class can be loud, so it meets in a separate wing of the building.`, 'off-topic-detail'),
          ],
          solution: `Sentence (4) claims the arts teach skills useful in every subject, and the survey shows art students applying deadline skills elsewhere. The sentence about musicians who skipped music class actually works against the writer's claim.`,
        },
        {
          slot: 14,
          difficulty: 'hard',
          stem: `What is the main purpose of sentence (9) in the second paragraph?`,
          choices: [
            no(`It states the writer's main claim about requiring art or music.`, 'misidentifies-claim'),
            no(`It shows that the writer now agrees study hall should be required.`, 'concession-read-as-reversal'),
            no(`It summarizes all of the reasons given in the first paragraph.`, 'misreads-structure'),
            ok(`It admits that part of the opposing view is reasonable before the writer responds to it.`),
          ],
          solution: `Sentence (9) concedes that eighth graders are busy, which makes the writer seem fair before answering in sentences (10) and (11). It does not mean the writer has switched sides, since the response that follows still supports requiring the arts.`,
        },
        {
          slot: 15,
          difficulty: 'easy',
          stem: `Which sentence introduces the opposing claim?`,
          choices: [
            no(`sentence (2)`, 'background-as-counterclaim'),
            ok(`sentence (8)`),
            no(`sentence (12)`, 'conclusion-as-counterclaim'),
            no(`sentence (11)`, 'rebuttal-as-counterclaim'),
          ],
          solution: `Sentence (8) presents what critics believe: that students need study hall for homework. Sentence (11) is part of the writer's answer to that claim, not the claim itself.`,
        },
      ],
    },
    {
      code: 'wg8-argument-writing-p04',
      title: 'Refill Stations for Ridgeview',
      body: `(1) Each week, the trash cans in our cafeteria fill up with empty plastic water bottles. (2) The district should install water bottle refill stations in every hallway of Ridgeview Middle School. (3) First, refill stations would reduce plastic waste. (4) The environmental club counted the bottles thrown away in the cafeteria for one week and found more than 900. (5) Second, refill stations would encourage students to drink more water during the day. (6) Students who stay hydrated tend to concentrate better in class. (7) Plastic was invented more than a hundred years ago.

(8) Opponents point out that the stations are expensive, costing about $1,200 each. (9) The stations are obviously worth it, and anyone who disagrees just doesn't care about the planet. (10) In fact, the parent association has offered to pay for half of the stations through its spring fundraiser.

(11) So yeah, refill stations would be pretty cool.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not support the claim?`,
          choices: [
            no(`sentence (4)`, 'removes-key-evidence'),
            no(`sentence (6)`, 'removes-reasoning'),
            no(`sentence (8)`, 'removes-counterclaim'),
            ok(`sentence (7)`),
          ],
          solution: `Sentence (7) is a fact about when plastic was invented, and it does not help show why the school needs refill stations. Sentence (8) should stay because a strong argument addresses the opposing view.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which revision of sentence (11) provides the best formal conclusion?`,
          choices: [
            ok(`By installing refill stations, the district can cut plastic waste and help students stay focused.`),
            no(`So yeah, refill stations would be totally awesome for real.`, 'keeps-informal-tone'),
            no(`Refill stations are a thing that a lot of schools have.`, 'vague-wording'),
            no(`Anyway, that is about all I have to say about water.`, 'no-restated-claim'),
          ],
          solution: `The correct revision is formal and restates both reasons from the essay, waste and focus. The other choices are casual or vague and do not follow from the argument.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Sentence (6) makes a statement without support. Which sentence, added after it, provides the most relevant evidence?`,
          choices: [
            no(`Water covers most of the surface of Earth.`, 'off-topic-detail'),
            no(`Many students prefer sports drinks to plain water.`, 'undermines-claim'),
            ok(`A university study found that students who drank water during tests scored higher than those who did not.`),
            no(`The cafeteria sells bottled water for one dollar.`, 'supports-different-point'),
          ],
          solution: `The study links drinking water to better performance, which directly supports the idea that hydrated students concentrate better. The fact about sports drinks does not support sentence (6) and even weakens the second reason.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Why does the writer begin sentences (3) and (5) with "First" and "Second"?`,
          choices: [
            no(`To show that the events in the two sentences happened in time order`, 'sequence-for-listing'),
            ok(`To show that each sentence introduces a separate reason supporting the claim`),
            no(`To show that sentence (5) disagrees with the idea in sentence (3)`, 'listing-read-as-contrast'),
            no(`To show that sentence (5) is an example of the idea in sentence (3)`, 'listing-read-as-example'),
          ],
          solution: `"First" and "Second" mark two different reasons for refill stations: less waste and more water drinking. They are not telling events in time order, since nothing in these sentences has happened yet.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Which revision of sentence (9) best responds to the opposing claim with sound reasoning?`,
          choices: [
            no(`The stations are obviously worth it, since everyone knows plastic is bad.`, 'circular-reasoning'),
            no(`However, people who worry about money are not thinking about the future.`, 'attacks-opponent'),
            ok(`However, each station can replace thousands of plastic bottles, so its cost is spread across years of use.`),
            no(`The stations do cost a lot, so maybe the district should wait a few years.`, 'abandons-claim'),
          ],
          solution: `The correct revision answers the cost concern with a reason: the price is spread over long use. The choice about people not thinking about the future attacks opponents instead of answering their point.`,
        },
      ],
    },
    {
      code: 'wg8-argument-writing-p05',
      title: 'Save the Old Depot',
      body: `(1) The brick train depot on Mill Road has stood empty since the last passenger train left Harlow in 1962. (2) The town council should restore the depot and open it as a local history museum. (3) The building itself is a piece of history. (4) It was built in 1898, and records at the town library show that it once handled shipments of grain, lumber, and mail for the entire county. (5) A museum would also give students a place to learn about Harlow's past. (6) Right now, the closest history museum is forty miles away, so few classes can visit.

(7) Some residents believe the town should tear the depot down and build a parking lot. (8) More parking would help shoppers downtown. (9) Yet a museum could draw visitors who would also shop and eat downtown. (10) The nearby town of Corwin restored its old mill as a museum, and its downtown businesses reported more customers the following year.

(11) Old things are cool. (12) The depot connects Harlow to its past, and with care it can connect Harlow to its future as well.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence best states the writer's claim?`,
          choices: [
            no(`sentence (1)`, 'background-as-claim'),
            ok(`sentence (2)`),
            no(`sentence (3)`, 'reason-as-claim'),
            no(`sentence (8)`, 'counterclaim-as-claim'),
          ],
          solution: `Sentence (2) states the position the whole essay defends: restore the depot as a museum. Sentence (3) is one reason for that claim, not the claim itself.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which revision of sentence (11) best fits a formal style and the argument?`,
          choices: [
            no(`Old stuff is super cool and really fun to look at.`, 'keeps-informal-tone'),
            no(`The depot is old.`, 'vague-wording'),
            no(`Who doesn't love checking out old things, right?`, 'keeps-informal-tone'),
            ok(`Historic buildings help a community remember where it came from.`),
          ],
          solution: `The correct revision uses formal language and supports the idea in sentence (12) that the depot connects Harlow to its past. "The depot is old" is formal but too vague to add anything to the conclusion.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `How does sentence (10) support the writer's response to the opposing claim?`,
          choices: [
            ok(`It gives an example from a nearby town showing that a museum can bring more customers downtown.`),
            no(`It proves that parking lots always hurt the businesses in a downtown area.`, 'overstates-evidence'),
            no(`It shows that the town of Corwin has more parking spaces than Harlow does.`, 'unsupported-inference'),
            no(`It introduces a second opposing claim that the writer does not answer.`, 'misreads-structure'),
          ],
          solution: `Sentence (10) backs up sentence (9) with a real case where a museum led to more downtown customers. It says nothing about parking lots hurting businesses, so that choice overstates the evidence.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `The writer wants to add a transition at the beginning of sentence (8) to show that the writer accepts part of the opposing view. Which transition works best?`,
          choices: [
            no(`As a result,`, 'cause-effect-for-concession'),
            no(`For example,`, 'example-for-concession'),
            ok(`Admittedly,`),
            no(`In conclusion,`, 'summary-for-concession'),
          ],
          solution: `"Admittedly" signals that the writer grants a fair point (parking helps shoppers) before responding in sentence (9). "For example" is wrong because sentence (8) is not an example of tearing the depot down.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (4), would best explain how the evidence in sentence (4) supports the reason in sentence (3)?`,
          choices: [
            no(`Brick is a strong building material that can last for many centuries.`, 'fact-without-reasoning'),
            ok(`Because the depot played such a central role in county trade, preserving it saves a real record of how people here lived and worked.`),
            no(`Many people today send packages through delivery services instead of by train.`, 'off-topic-detail'),
            no(`The depot's roof would need to be replaced before a museum could open inside.`, 'undermines-claim'),
          ],
          solution: `The correct sentence explains why the depot's history of shipping grain, lumber, and mail makes the building historically valuable. The sentence about brick is true but does not connect the evidence to the reason.`,
        },
      ],
    },
    {
      code: 'wg8-argument-writing-p06',
      title: 'Intramurals for Everyone',
      body: `(1) At Pinecrest Middle School, only about sixty students make the competitive sports teams each year. (2) Hundreds of other students who enjoy sports have no chance to play at school. (3) Pinecrest should create an intramural program that lets any student join a team, regardless of skill. (4) Intramurals would help more students stay active. (5) Health experts recommend that young people get about an hour of physical activity each day, but many students sit for most of the afternoon. (6) Intramurals also teach teamwork. (7) Players learn to communicate, share responsibilities, and support one another. (8) Basketball was invented in the winter of 1891 as an indoor game.

(9) Coaches of the competitive teams worry that intramurals would compete for gym time. (10) This is a fair concern. (11) Intramural games could be scheduled during lunch or on mornings before school, when the gym sits empty.

(12) Every student who wants to play deserves a team, and an intramural program would give them one.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not support the claim?`,
          choices: [
            no(`sentence (5)`, 'removes-key-evidence'),
            no(`sentence (7)`, 'removes-reasoning'),
            ok(`sentence (8)`),
            no(`sentence (10)`, 'removes-concession'),
          ],
          solution: `Sentence (8) is a fact about the history of basketball and does not show why Pinecrest needs intramurals. Sentence (10) stays because it fairly grants the coaches' concern.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which transition best begins sentence (11)?`,
          choices: [
            no(`Furthermore,`, 'addition-for-contrast'),
            ok(`However,`),
            no(`Similarly,`, 'similarity-for-contrast'),
            no(`In summary,`, 'summary-for-contrast'),
          ],
          solution: `After admitting the concern in sentence (10), the writer turns to a solution, so "However" shows the shift. "Furthermore" would wrongly suggest that sentence (11) adds to the coaches' worry.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which detail would best support the reason in sentence (6)?`,
          choices: [
            no(`The Pinecrest gym was renovated with new floors three years ago.`, 'off-topic-detail'),
            no(`Some students prefer to exercise alone, such as by running.`, 'undermines-claim'),
            no(`Competitive teams travel to away games on a school bus.`, 'off-topic-detail'),
            ok(`At a nearby school, most intramural players said they learned to work with classmates they had not known.`),
          ],
          solution: `Sentence (6) says intramurals teach teamwork, and the survey shows players learning to work with new classmates. The detail about students who exercise alone does not support teamwork at all.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `Which statement best describes how the writer organizes the first paragraph?`,
          choices: [
            ok(`The writer describes a problem, states a claim, and then gives two reasons with support.`),
            no(`The writer compares two sports and explains which one is better for students.`, 'misreads-structure'),
            no(`The writer tells the story of one student's first game in time order.`, 'narrative-for-argument'),
            no(`The writer presents the opposing view first and then rejects it.`, 'misreads-structure'),
          ],
          solution: `Sentences (1) and (2) describe the problem, sentence (3) gives the claim, and sentences (4) through (7) give two supported reasons. The opposing view does not appear until the second paragraph.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (11), best explains why the writer's solution would work?`,
          choices: [
            no(`The coaches should simply stop worrying so much about the gym.`, 'dismisses-counterclaim'),
            no(`Lunch is the most popular time of day for many students.`, 'irrelevant-reasoning'),
            ok(`Because these times do not overlap with after-school practices, both programs could share the gym.`),
            no(`Competitive teams matter more than intramurals, so they should get the gym first.`, 'contradicts-claim'),
          ],
          solution: `The correct sentence gives the reasoning behind the solution: the times do not conflict with team practices. The sentence telling coaches to stop worrying dismisses their concern instead of answering it.`,
        },
      ],
    },
    {
      code: 'wg8-argument-writing-p07',
      title: 'A Coding Course for Brookside',
      body: `(1) Computers are part of almost every job today, from farming to filmmaking. (2) Some people like computers and some people do not. (3) Brookside Middle School should offer a required coding course for all eighth graders. (4) Learning to code builds problem-solving skills. (5) When a program does not work, students must find the error, test a new idea, and try again. (6) This process is the same kind of careful thinking that scientists and engineers use. (7) Coding also prepares students for future careers. (8) A report from the state labor department predicts that jobs requiring computer skills will grow faster than most other jobs over the next ten years.

(9) Some students argue that coding is too difficult for beginners. (10) Beginner courses use simple, block-based programs that let students build games and animations without typing complicated commands. (11) Lots of kids at my old school did it and they were fine.

(12) A required coding course would give every Brookside student skills for the classroom and beyond.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Sentence (2) does not help introduce the claim. Which revision of sentence (2) best leads into the claim in sentence (3)?`,
          choices: [
            no(`Some people like computers a lot more than other people do.`, 'keeps-irrelevant-idea'),
            no(`Computers were much larger and slower in the past.`, 'off-topic-detail'),
            ok(`Yet many students at our school never learn how computer programs actually work.`),
            no(`Many students enjoy playing video games after school.`, 'off-topic-detail'),
          ],
          solution: `The correct revision names a gap that the claim in sentence (3) would fill, so it leads smoothly into the claim. The other choices are about likes, history, or games and do not set up a need for a coding course.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which transition best begins sentence (8) to introduce evidence for the reason in sentence (7)?`,
          choices: [
            no(`On the other hand,`, 'contrast-for-example'),
            ok(`For instance,`),
            no(`Instead,`, 'contrast-for-example'),
            no(`Even so,`, 'concession-for-example'),
          ],
          solution: `Sentence (8) gives a specific piece of evidence for the idea that coding prepares students for careers, so "For instance" fits. "On the other hand" would suggest the report disagrees with sentence (7), which it does not.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which revision of sentence (11) uses a formal style and provides stronger evidence?`,
          choices: [
            no(`Tons of kids did it at my old school and nobody really had a problem.`, 'keeps-informal-tone'),
            no(`Coding is easy, so anyone who says otherwise is simply wrong.`, 'attacks-opponent'),
            no(`Kids at my old school did it, and that is a fact.`, 'anecdote-as-proof'),
            ok(`At a nearby middle school that began a similar course last year, 90 percent of students completed the final project.`),
          ],
          solution: `The correct revision is formal and gives a specific result from a comparable school. The choice ending "that is a fact" still relies on a vague personal story instead of real evidence.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `Which statement best explains why sentence (6) is important to the argument?`,
          choices: [
            ok(`It explains how the example in sentence (5) connects to the reason that coding builds problem-solving skills.`),
            no(`It introduces the opposing claim that coding is too difficult for most beginners.`, 'misreads-structure'),
            no(`It provides statistical evidence from an expert source about future jobs.`, 'confuses-evidence-location'),
            no(`It states the writer's claim about a required coding course for the first time.`, 'misidentifies-claim'),
          ],
          solution: `Sentence (6) is reasoning: it tells why fixing errors in code, described in sentence (5), counts as valuable problem solving. The expert evidence about jobs appears in sentence (8), not sentence (6).`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence (12) as a conclusion that follows from the whole argument, including the counterargument?`,
          choices: [
            no(`Coding is fun, and everyone should try it at least once in life.`, 'vague-conclusion'),
            no(`Although coding may truly be too hard for some, Brookside should require it anyway.`, 'contradicts-rebuttal'),
            ok(`Because coding sharpens problem solving, prepares students for careers, and can be taught simply, Brookside should require it.`),
            no(`In the future, robots may write every computer program without help from people.`, 'undercuts-claim'),
          ],
          solution: `The correct conclusion restates the claim and sums up both reasons plus the answer to the difficulty concern. The choice that says coding may truly be too hard contradicts the writer's own response in sentence (10).`,
        },
      ],
    },
    {
      code: 'wg8-argument-writing-p08',
      title: 'Wildflowers Instead of Lawn',
      body: `(1) Behind Cedar Hill Middle School lies a wide lawn that the grounds crew mows every week from April to October. (2) The school should replace part of this lawn with a garden of native wildflowers and grasses. (3) Native plants support local wildlife. (4) Bees, butterflies, and birds depend on these plants for food and shelter, and many of these animals are becoming harder to find. (5) A native garden would also save the school money. (6) Because native plants are adapted to the local climate, they need little watering and no weekly mowing. (7) The grounds crew estimates that shrinking the lawn by half would cut mowing costs by about $3,000 a year.

(8) Some teachers worry that a wild garden would look messy. (9) A garden with clear paths, signs, and neatly edged borders can look just as tidy as a lawn. (10) Science classes could also use the garden as an outdoor classroom to study insects and plant life. (11) I saw a really pretty butterfly last summer at the beach.

(12) A lawn may look neat, but it does very little for the school or the environment.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence is least relevant to the writer's argument?`,
          choices: [
            no(`sentence (4)`, 'removes-key-evidence'),
            no(`sentence (7)`, 'removes-key-evidence'),
            no(`sentence (10)`, 'removes-reason'),
            ok(`sentence (11)`),
          ],
          solution: `Sentence (11) is a personal memory about a butterfly at the beach and gives no reason for planting a native garden at school. Sentence (10) adds a real benefit, an outdoor classroom, so it should stay in the essay.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which transition best begins sentence (9)?`,
          choices: [
            ok(`With good planning, though,`),
            no(`For this reason,`, 'cause-effect-for-contrast'),
            no(`In the same way,`, 'similarity-for-contrast'),
            no(`As a result,`, 'cause-effect-for-contrast'),
          ],
          solution: `Sentence (9) answers the teachers' worry about messiness, so a contrast like "though" fits, and "with good planning" connects to the paths and borders. "For this reason" would wrongly suggest the tidy garden is caused by the teachers' worry.`,
        },
        {
          slot: 38,
          difficulty: 'hard',
          stem: `Sentence (10) gives a new reason for the garden but does not answer the teachers' worry. Where would it best fit in the essay?`,
          choices: [
            no(`Before sentence (1), as the opening sentence of the essay`, 'reason-as-introduction'),
            ok(`After sentence (7), as another reason in the first paragraph`),
            no(`After sentence (8), in the middle of the opposing claim`, 'interrupts-counterclaim'),
            no(`Where it is now, because it responds to the concern about messiness`, 'misreads-relationship'),
          ],
          solution: `The first paragraph lists the reasons for the garden (wildlife and money), so the outdoor classroom reason belongs there after sentence (7). It does not respond to the concern about messiness, so leaving it in the counterargument paragraph blurs that paragraph's focus.`,
        },
        {
          slot: 39,
          difficulty: 'medium',
          stem: `Which revision of sentence (12) provides the conclusion that best follows from the argument?`,
          choices: [
            no(`A lawn may look neat, but no place anywhere should ever have a lawn.`, 'overgeneralization'),
            no(`Some schools have lawns, and some schools have gardens instead.`, 'no-restated-claim'),
            ok(`By trading part of its lawn for native plants, Cedar Hill can help wildlife, save money, and keep its grounds attractive.`),
            no(`Next, the school should also build a new parking area for visitors.`, 'introduces-new-topic'),
          ],
          solution: `The correct conclusion restates the claim and sums up the reasons and the answer to the messiness concern. The choice saying no place should ever have a lawn goes far beyond what the essay argues.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (8), would best acknowledge the opposing claim fairly before the writer responds?`,
          choices: [
            no(`These teachers clearly do not know very much about plants.`, 'attacks-opponent'),
            ok(`This concern makes sense, since tall, unmanaged plants can make a space look neglected.`),
            no(`A messy garden would be the worst thing a school could have.`, 'sides-with-opposition'),
            no(`Teachers have many responsibilities during the school day.`, 'irrelevant-reasoning'),
          ],
          solution: `The correct sentence grants that the worry is reasonable and explains why, which sets up the response in sentence (9). The sentence about teachers not knowing plants insults the opponents instead of treating their view fairly.`,
        },
      ],
    },
  ],
}

export default skill
