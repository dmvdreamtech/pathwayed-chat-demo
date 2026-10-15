import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g11-argument-writing',
  subject: 'writing',
  grade: 11,
  group: 'Composition',
  name: 'Argument Writing',
  standards: ['W.11-12.1'],
  passages: [
    {
      code: 'wg11-argument-writing-p01',
      title: 'Evening Hours at the Corwin Library',
      body: `(1) The Corwin Public Library currently closes at 6:00 on weekday evenings, just as many working adults and high school students finally have time to visit. (2) The library is a pretty cool place. (3) In a survey of 410 residents conducted by the library's own advisory board, 57 percent said they had skipped a visit in the past month because the building was already closed. (4) Students are affected most sharply, since many hold part-time jobs or attend practices that end after 5:30. (5) Extended hours would also give residents without home internet a quiet place to complete job applications and coursework. (6) The library's reading room was renovated in 1998 with oak shelving donated by a local mill.

(7) Critics of the proposal point out that staying open three additional hours each night would raise staffing costs by roughly 14 percent. (8) This is a legitimate concern for a library whose budget has not grown in four years. (9) The library could open three hours later on weekday mornings, when its own records show that fewer than a dozen patrons typically enter before 10:00. (10) Shifting hours rather than adding them would keep staffing costs nearly level while serving far more people.

(11) Anyway, people who say the library should keep its hours just do not get it. (12) So that is why the hours should change.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence (2) as a precise statement of the writer's claim?`,
          choices: [
            no(`Libraries have played an important role in communities for many centuries.`, 'too-general'),
            ok(`The library board should move its weekday closing time to 9:00, shifting morning hours to the evening to control costs.`),
            no(`Some residents may or may not want the library to stay open later in the evening.`, 'hedged-no-position'),
            no(`The library should stay open twenty-four hours a day on every day of the year.`, 'overstated-claim'),
          ],
          solution: `The correct choice states a specific, arguable position that matches the evidence and the cost solution in sentences (9) and (10). The twenty-four-hour claim overreaches and contradicts the writer's own concern about staffing costs.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            no(`sentence (3)`, 'removes-key-evidence'),
            no(`sentence (8)`, 'removes-concession'),
            ok(`sentence (6)`),
            no(`sentence (9)`, 'removes-rebuttal'),
          ],
          solution: `Sentence (6) gives a historical detail about shelving that has nothing to do with the library's hours. Sentence (8) should stay because it fairly concedes the cost concern before the writer answers it.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `The writer wants to add a transition at the beginning of sentence (9). Which choice best shows that the sentence answers the concern raised in sentences (7) and (8)?`,
          choices: [
            no(`Similarly,`, 'similarity-for-contrast'),
            no(`For example,`, 'example-for-contrast'),
            ok(`However,`),
            no(`Consequently,`, 'cause-effect-for-contrast'),
          ],
          solution: `Sentence (9) turns from the cost concern to a solution, so "However" signals that shift. "Consequently" is wrong because the morning schedule change is not a result of the budget staying flat.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Sentence (11) dismisses those who disagree. Which revision best keeps a formal style and an objective tone?`,
          choices: [
            no(`Anyone who opposes later hours has clearly never needed the library after work.`, 'dismissive-tone'),
            no(`Honestly, keeping the old hours is kind of a bad idea for basically everybody.`, 'keeps-informal-tone'),
            ok(`Although the cost concern is reasonable, the evidence shows that shifting hours addresses it without reducing service.`),
            no(`Many people feel strongly about libraries, and those feelings are important to respect.`, 'vague-wording'),
          ],
          solution: `The correct revision acknowledges the opposing view respectfully and points back to the evidence in sentences (9) and (10). The first choice still attacks opponents personally instead of answering their reasoning.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence (12) as a conclusion that follows from the argument?`,
          choices: [
            no(`Therefore, the town should double the library's budget so that it can stay open all day.`, 'contradicts-reasoning'),
            ok(`By moving morning hours to the evening, the library could reach the students and workers its survey identified while holding costs nearly level.`),
            no(`In conclusion, libraries matter, and reading is a valuable habit for people of every age.`, 'too-general'),
            no(`The board should also consider adding a small cafe to attract more weekend visitors.`, 'introduces-new-topic'),
          ],
          solution: `The correct conclusion restates the claim and draws together the survey evidence and the cost solution. Doubling the budget contradicts the writer's reasoning that shifting hours avoids new costs.`,
        },
      ],
    },
    {
      code: 'wg11-argument-writing-p02',
      title: 'Open Textbooks for Ridgeway',
      body: `(1) Each fall, Ridgeway High School spends about $180,000 replacing worn or outdated printed textbooks. (2) The district should adopt openly licensed digital textbooks for its core science and history courses. (3) Openly licensed texts are written by educators and released for free use, so the district would pay only for review and for optional paper copies. (4) A pilot in the neighboring Alder Valley district found that students using open texts scored about the same on end-of-course exams as students using purchased books. (5) Digital texts can also be updated each year, which matters in fields like biology, where findings change quickly. (6) Printed books are also heavy.

(7) Opponents argue that digital texts disadvantage students who lack reliable devices or internet access at home. (8) Ridgeway already lends a laptop to every student, but home internet remains a real gap for roughly one in eight families. (9) The district could address this gap by letting students download chapters at school for offline reading and by printing low-cost copies for any family that requests one.

(10) Some teachers also say they prefer the familiar layout of the books they have used for years. (11) Familiarity has value, but teachers in the Alder Valley pilot reported adjusting to the new texts within a single semester.

(12) Open digital textbooks would save money, stay current and, with sensible supports, serve every student fairly. (13) The board should approve them for next fall.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Sentence (6) is undeveloped. Which revision best turns it into relevant support for the claim?`,
          choices: [
            no(`Everyone knows that heavy books are annoying to carry around all day long.`, 'unsupported-generalization'),
            ok(`Printed books are also heavy: the school nurse found that many students carry backpacks well above the weight recommended for their size.`),
            no(`Paper for printed books is made from trees, which grow in forests around the world.`, 'irrelevant-detail'),
            no(`Some students prefer backpacks with wheels, while others like shoulder straps.`, 'off-topic'),
          ],
          solution: `The correct revision adds specific evidence that connects book weight to a real problem for students. The first choice appeals to what "everyone knows" instead of offering evidence.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which transition best begins sentence (12) to signal that it draws the argument together?`,
          choices: [
            ok(`Taken together,`),
            no(`For instance,`, 'example-for-summary'),
            no(`Nevertheless,`, 'contrast-for-summary'),
            no(`Meanwhile,`, 'time-for-summary'),
          ],
          solution: `Sentence (12) sums up the savings, currency and fairness points, so "Taken together" signals a conclusion. "Nevertheless" would wrongly suggest the sentence contradicts what came before.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Why does the writer include sentence (8) instead of moving directly from sentence (7) to sentence (9)?`,
          choices: [
            no(`It proves that the opposing claim about home access is entirely false.`, 'overstates-purpose'),
            no(`It introduces the writer's main claim about digital textbooks for the first time.`, 'misidentifies-claim'),
            ok(`It concedes the accurate part of the opposing claim, which makes the solution in sentence (9) more credible.`),
            no(`It provides the cost figure that supports the writer's main claim.`, 'confuses-evidence-location'),
          ],
          solution: `Sentence (8) admits that one in eight families lacks home internet, so the solution in sentence (9) answers a real problem fairly. It does not prove the opposing claim false; it partly agrees with it.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `The writer wants to strengthen the response in sentence (11). Which addition provides the most relevant evidence?`,
          choices: [
            no(`Change can be hard for everyone, but it is simply a part of life.`, 'too-general'),
            no(`Teachers at Ridgeway work very hard and deserve the community's respect.`, 'irrelevant-detail'),
            ok(`In a follow-up survey, 21 of the pilot's 24 teachers said they would choose the open texts again.`),
            no(`Most teachers would probably get used to the new books eventually.`, 'unsupported-speculation'),
          ],
          solution: `The survey result gives concrete evidence that teachers adapted and approved of the texts, which directly answers the concern in sentence (10). The guess that teachers "would probably" adjust offers no evidence at all.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `A reviewer warns that sentence (2) could be mistaken for a call to eliminate printed books entirely. Which revision best distinguishes the writer's claim from that more extreme position?`,
          choices: [
            no(`The district should stop using printed books in every course, starting immediately.`, 'overstated-claim'),
            ok(`The district should make openly licensed digital textbooks the standard text for core science and history courses, while keeping low-cost printed copies available on request.`),
            no(`Digital textbooks are the future, and printed textbooks belong to the past.`, 'vague-slogan'),
            no(`The district should think about whether digital textbooks might possibly work.`, 'hedged-no-position'),
          ],
          solution: `The correct revision names the courses and keeps printed copies available, which matches the supports described in sentence (9). The slogan about the future is memorable but does not state a precise, arguable claim.`,
        },
      ],
    },
    {
      code: 'wg11-argument-writing-p03',
      title: 'Uncovering Fenwick Creek',
      body: `(1) For nearly ninety years, Fenwick Creek has flowed through a concrete pipe beneath the parking lots of downtown Haldane. (2) The city council should fund a project to "daylight" the creek by removing a 600-meter section of pipe and restoring an open channel with planted banks. (3) Buried streams carry runoff quickly but cannot absorb heavy rain, and the Fenwick pipe has overflowed onto Market Street four times in the past decade. (4) An open channel with wide banks would hold more water during storms, reducing the flooding that has damaged nearby shops. (5) A restored creek would also cool the surrounding blocks on summer afternoons, according to temperature readings taken by students at Haldane Community College.

(6) The strongest objection is cost, since the project is estimated at $9 million. (7) The loss of roughly 140 parking spaces also worries downtown business owners. (8) These concerns deserve a serious answer. (9) State flood-prevention grants could cover about half of the cost, and the city already spends nearly $400,000 a year repairing the existing pipe. (10) A new parking structure two blocks away, which the city has already planned, would replace most of the lost spaces.

(11) Fish are cool to look at too. (12) Daylighting Fenwick Creek would protect Market Street from floods, cool downtown and, over time, cost less than repairing a failing pipe forever.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence least fits the formal style of the argument and should be revised or removed?`,
          choices: [
            no(`sentence (6)`, 'removes-counterclaim'),
            ok(`sentence (11)`),
            no(`sentence (8)`, 'removes-concession'),
            no(`sentence (3)`, 'removes-key-evidence'),
          ],
          solution: `Sentence (11) uses casual language and offers an undeveloped point with no evidence. Sentence (6) is needed because it states the main opposing concern that the writer answers.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which transition best begins sentence (10) to show that it answers the second concern?`,
          choices: [
            no(`As a result of the grants,`, 'false-cause'),
            no(`For example,`, 'example-for-new-point'),
            ok(`As for the parking concern,`),
            no(`On the other hand,`, 'contrast-misused'),
          ],
          solution: `Sentence (9) answers the cost concern, and sentence (10) turns to the parking concern from sentence (7), so "As for the parking concern" links them clearly. The parking structure is not a result of the grants.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `The writer wants to add a sentence after sentence (4). Which sentence provides the most relevant evidence for that point?`,
          choices: [
            ok(`In the nearby town of Pell Ridge, a similar daylighting project cut street flooding by an estimated 60 percent in its first five years.`),
            no(`Many people enjoy walking beside running water on warm summer evenings.`, 'weak-relevance'),
            no(`Concrete was first widely used as a building material in the ancient world.`, 'irrelevant-detail'),
            no(`Floods are among the most upsetting things that can happen to any town.`, 'emotional-appeal-no-evidence'),
          ],
          solution: `Sentence (4) claims an open channel would reduce flooding, and the Pell Ridge result is direct evidence for that claim. The choice about walking by water describes a pleasant effect but says nothing about flooding.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `How does sentence (9) respond to the objection in sentence (6)?`,
          choices: [
            no(`It denies that the project will cost the city any money.`, 'misreads-rebuttal'),
            no(`It changes the subject to the problem of lost parking spaces.`, 'confuses-sentences'),
            ok(`It reduces the apparent cost by pointing to outside funding and the ongoing expense of keeping the pipe.`),
            no(`It admits that the project is too expensive for the city to pursue.`, 'contradicts-claim'),
          ],
          solution: `Sentence (9) cites state grants and the yearly repair bill to show the project's real cost is lower than it first appears. It does not deny the cost; it puts the cost in context.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Which revision of sentence (8) most clearly links the objections to the writer's responses while keeping an objective tone?`,
          choices: [
            ok(`Both concerns are reasonable, yet each can be addressed with resources the city already has or has already planned.`),
            no(`Business owners complain about every change downtown, so their concerns carry little weight.`, 'dismissive-tone'),
            no(`Cost and parking are important issues, and so are many other things in a city.`, 'vague-wording'),
            no(`These concerns are serious enough that the project should probably wait several years.`, 'contradicts-claim'),
          ],
          solution: `The correct revision concedes that both concerns are fair and previews the answers in sentences (9) and (10), which makes the relationship clear. The choice about business owners dismisses opponents instead of answering them.`,
        },
      ],
    },
    {
      code: 'wg11-argument-writing-p04',
      title: 'The Harlow Street Depot',
      body: `(1) The Harlow Street Depot, a brick rail station built in 1911, has stood empty since passenger service to Kessington ended in 1974. (2) Old buildings are interesting. (3) The depot is the last surviving structure from the period when Kessington grew from a farming village into a regional market town, and its waiting room still contains the original ticket windows and tile floor. (4) A 2023 engineering review commissioned by the county found that the foundation and roof framing are sound. (5) Restoring the depot as a local history museum and rentable community hall would preserve that record while giving the building a practical use.

(6) A developer has proposed demolishing the depot to build forty apartments. (7) Kessington does need more housing, and this need should not be dismissed. (8) The developer's own site plan shows that the apartments could be built on the vacant lot directly behind the depot, leaving the station standing. (9) Some residents suggest saving only the front wall of the depot and building new space behind it. (10) This approach keeps the building's appearance but loses the interior, which is the part that tells the town's story.

(11) My grandmother remembers taking the train from the depot to visit her sister. (12) In the end, Kessington can have both new housing and its history if the council requires the apartments to use the rear lot and funds the depot's restoration.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence (2) as the writer's claim?`,
          choices: [
            no(`Old buildings are interesting, and some are more interesting than others.`, 'vague-wording'),
            no(`The Harlow Street Depot was built of brick in the year 1911.`, 'fact-not-claim'),
            ok(`The county should restore the Harlow Street Depot as a museum and community hall rather than allow its demolition.`),
            no(`Every old building in Kessington must be saved, no matter what it costs.`, 'overstated-claim'),
          ],
          solution: `The correct choice takes a clear, arguable position that the rest of the essay supports. The date of construction is a fact, not a claim anyone could argue against.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `What should the writer do with sentence (11)?`,
          choices: [
            no(`Keep it, because it is the strongest evidence in the essay.`, 'overvalues-anecdote'),
            ok(`Remove it, because a family memory is weaker than the documented evidence the argument relies on elsewhere.`),
            no(`Move it to the first paragraph so that it becomes the main claim.`, 'misidentifies-claim'),
            no(`Keep it, because it answers the developer's proposal for apartments.`, 'misreads-function'),
          ],
          solution: `The argument rests on documented evidence such as the engineering review in sentence (4), and a personal memory adds little to that case. The memory does not respond to the developer's proposal at all.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which transition best begins sentence (8) to show its relationship to sentence (7)?`,
          choices: [
            no(`Therefore,`, 'cause-effect-for-contrast'),
            ok(`However,`),
            no(`Likewise,`, 'similarity-for-contrast'),
            no(`For instance,`, 'example-for-contrast'),
          ],
          solution: `Sentence (7) concedes the need for housing, and sentence (8) turns to show that the need can be met without demolition, so "However" signals the shift. "Therefore" wrongly suggests the site plan follows from the housing need.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `How do sentences (9) and (10) develop the argument?`,
          choices: [
            ok(`They address an alternate proposal and explain why it falls short of the writer's goal.`),
            no(`They provide the engineering evidence that the building is structurally sound.`, 'confuses-evidence-location'),
            no(`They concede that the depot should be demolished to make room for housing.`, 'contradicts-claim'),
            no(`They introduce the developer's proposal to build forty apartments.`, 'confuses-sentences'),
          ],
          solution: `Sentence (9) presents the front-wall compromise, and sentence (10) explains that it would lose the interior that matters most. The engineering evidence appears in sentence (4), not here.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Which statement best explains why sentence (7) strengthens rather than weakens the argument?`,
          choices: [
            no(`It shows that the writer agrees the depot should be replaced with apartments.`, 'misreads-concession'),
            no(`It proves that housing is more important to the town than history.`, 'overstates-purpose'),
            ok(`By granting that the housing need is real, the writer appears fair and sets up the solution in sentence (8) that meets that need without demolition.`),
            no(`It adds a statistic showing how many families in Kessington need housing.`, 'invents-evidence'),
          ],
          solution: `Acknowledging a valid opposing point builds credibility and prepares the reader for a solution that satisfies both sides. Sentence (7) contains no statistic, so the last choice describes evidence that is not in the text.`,
        },
      ],
    },
    {
      code: 'wg11-argument-writing-p05',
      title: 'Video Review in the Playoffs',
      body: `(1) In last year's Tri-County girls' soccer semifinal, a goal that video later showed was clearly offside decided the match. (2) The Tri-County Athletic League should allow limited video review during playoff games for goals and penalty decisions only. (3) High school referees work without video assistants, and even skilled officials miss fast plays seen from poor angles. (4) Most playoff games are already filmed by both schools and by the league's own streaming crew, so the footage exists. (5) A league review of the 2024 playoffs counted six goals that video showed were awarded in error, and four of those changed the outcome.

(6) Opponents raise two concerns. (7) First, they argue that stopping play to review footage would slow the game and frustrate players. (8) Limiting review to goals and penalties, with a two-minute maximum per check, would keep stoppages brief and rare. (9) Second, some coaches warn that review would undermine respect for referees. (10) Video review would support referees by giving them a way to correct honest mistakes rather than defend them.

(11) Soccer is the most popular sport in the world. (12) Given that the footage already exists and the stakes of playoff games are high, the league should adopt limited review beginning next season.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the claim?`,
          choices: [
            no(`sentence (5)`, 'removes-key-evidence'),
            no(`sentence (8)`, 'removes-rebuttal'),
            no(`sentence (9)`, 'removes-counterclaim'),
            ok(`sentence (11)`),
          ],
          solution: `Sentence (11) is a general statement about soccer's popularity that does not help prove the league needs video review. Sentence (5) is the key evidence that officiating errors changed playoff results.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which transition best begins sentence (10) to show that it disputes the coaches' warning in sentence (9)?`,
          choices: [
            no(`Similarly,`, 'similarity-for-contrast'),
            ok(`On the contrary,`),
            no(`As a result,`, 'cause-effect-for-contrast'),
            no(`For example,`, 'example-for-contrast'),
          ],
          solution: `Sentence (10) argues the opposite of the warning, that review would support referees, so "On the contrary" fits. "As a result" is wrong because the claim in sentence (10) does not follow from the coaches' warning.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which detail would best strengthen the response in sentence (8)?`,
          choices: [
            no(`Players often get tired and lose focus when games run longer than usual.`, 'restates-opposing-claim'),
            ok(`During a one-season trial in the Lakemont league, reviews averaged ninety seconds and occurred about once every three games.`),
            no(`Many professional leagues use video review with very expensive camera systems.`, 'weak-relevance'),
            no(`Two minutes is not very long compared with an entire school day.`, 'faulty-comparison'),
          ],
          solution: `The Lakemont trial gives direct evidence that limited review causes short, infrequent stoppages, which is exactly what sentence (8) claims. The note about players tiring supports the opposing side instead.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `How do sentences (6), (7) and (9) help organize the second paragraph?`,
          choices: [
            ok(`They announce two objections and use ordering words so that each response clearly matches its objection.`),
            no(`They list the writer's own main reasons for supporting video review.`, 'confuses-claim-with-counterclaim'),
            no(`They provide statistics about how often referees make mistakes in playoff games.`, 'confuses-evidence-location'),
            no(`They show that the writer has decided to abandon the original claim.`, 'contradicts-claim'),
          ],
          solution: `Sentence (6) previews two concerns, and "First" and "Second" in sentences (7) and (9) pair each concern with the response that follows it. These sentences present opponents' views, not the writer's reasons.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Sentence (10) asserts that review would support referees but offers no evidence. Which revision best develops it while keeping an objective tone?`,
          choices: [
            no(`Anyone who thinks review hurts referees has obviously never refereed a game.`, 'dismissive-tone'),
            no(`Referees deserve respect, and respect is very important in every sport.`, 'circular-reasoning'),
            no(`Video review would make referees perfect and end every dispute about calls.`, 'overstated-claim'),
            ok(`Review could support referees: in a survey by the league's officials' association, most referees said they would welcome a way to correct errors before a result became final.`),
          ],
          solution: `The correct revision adds evidence from referees themselves, which directly answers the concern in sentence (9). The claim that review would make referees perfect overstates what the evidence can support.`,
        },
      ],
    },
    {
      code: 'wg11-argument-writing-p06',
      title: 'A Semester on Stage',
      body: `(1) Brightwater High School requires one credit in visual art but none in the performing arts, such as theater, music or dance. (2) Brightwater should require every student to complete one semester in a performing art before graduation. (3) Performing in front of others builds the confidence to speak clearly under pressure, a skill that college interviews and most careers demand. (4) A three-year study at Merriton State University followed 600 high school students and found that those who took a theater or choir course reported less anxiety about public speaking than those who did not. (5) Ensemble work also teaches students to listen and adjust to others, since a choir or cast succeeds only when every member does.

(6) Some students and parents object that the schedule is already crowded, especially for students in advanced courses. (7) The requirement could be met through a semester course, a summer workshop or two seasons in an after-school production. (8) Others argue that shy students should not be forced onto a stage. (9) Performing arts courses include roles in lighting, sound, set design and stage management, so no student must perform alone to earn the credit.

(10) The arts make life better. (11) A single semester in the performing arts would build skills that students carry into every field, and flexible options make the requirement fair to all.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence states the writer's main claim?`,
          choices: [
            no(`sentence (1)`, 'background-not-claim'),
            ok(`sentence (2)`),
            no(`sentence (6)`, 'counterclaim-not-claim'),
            no(`sentence (9)`, 'rebuttal-not-claim'),
          ],
          solution: `Sentence (2) states the position the whole essay defends: a required semester in a performing art. Sentence (1) only gives background about the current requirements.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which transition best begins sentence (7) to show how it relates to sentence (6)?`,
          choices: [
            no(`In addition,`, 'addition-for-response'),
            ok(`To address this concern,`),
            no(`For instance,`, 'example-for-response'),
            no(`Even so,`, 'concession-misplaced'),
          ],
          solution: `Sentence (7) offers flexible options in response to the crowded schedule objection, so "To address this concern" shows that relationship. "For instance" is wrong because sentence (7) is not an example of a crowded schedule.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Sentence (10) is vague. Which revision best connects the discussion of objections to the conclusion?`,
          choices: [
            no(`The arts make life better for everyone in almost every possible way.`, 'vague-wording'),
            no(`Some people enjoy music more than they enjoy sports or other activities.`, 'irrelevant-detail'),
            ok(`Because both objections can be answered with flexible options, the case for the requirement remains strong.`),
            no(`However, these objections show that the requirement may be unfair after all.`, 'contradicts-claim'),
          ],
          solution: `The correct revision sums up the responses in sentences (7) and (9) and leads into the conclusion in sentence (11). The choice beginning with "However" reverses the writer's position.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `Which detail would most strengthen the response in sentence (9)?`,
          choices: [
            ok(`Last year, nearly a third of the students in Brightwater's spring production worked entirely behind the scenes.`),
            no(`Shy people can be very talented in many other areas of life.`, 'weak-relevance'),
            no(`Stage lighting equipment has become much more advanced in recent years.`, 'irrelevant-detail'),
            no(`Shy students should simply learn to get over their fear of the stage.`, 'dismissive-tone'),
          ],
          solution: `The production figure shows that backstage roles are common and real, which supports the claim that no student must perform. The choice telling shy students to get over their fear dismisses the concern rather than answering it.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which statement best evaluates the evidence in sentence (4) as support for sentence (3)?`,
          choices: [
            no(`It proves that performing arts courses guarantee success in college and careers.`, 'overstated-claim'),
            no(`It is irrelevant, because it studied university students rather than high school students.`, 'misreads-evidence'),
            ok(`It supports the confidence part of sentence (3), but it measures reported anxiety, not actual success in interviews or careers.`),
            no(`It weakens the argument, because it shows that performing makes students more anxious.`, 'reverses-evidence'),
          ],
          solution: `The study shows students reported less public speaking anxiety, which supports confidence but not proven career results. The study followed high school students, so calling it irrelevant misreads sentence (4).`,
        },
      ],
    },
    {
      code: 'wg11-argument-writing-p07',
      title: 'Darker Skies for Marrow Bay',
      body: `(1) On a clear night, residents of Marrow Bay can see only a few dozen stars, while visitors who drive twenty miles inland can see thousands. (2) Marrow Bay should require that new and replaced outdoor lights be shielded to point downward and use warmer, lower-intensity bulbs. (3) Unshielded fixtures send much of their light sideways and upward, where it brightens the sky without making streets any safer. (4) Bright night skies also disrupt wildlife, and the town's beaches are a nesting site for sea turtles whose hatchlings crawl toward artificial light instead of the ocean. (5) Shielded fixtures direct light where people need it, so the town could use fewer watts and lower its electricity bills.

(6) Some residents fear that dimmer lighting will make streets less safe at night. (7) This fear is understandable. (8) Shielded lights reduce glare, which often makes it harder for drivers and walkers to see. (9) When the inland town of Corrigan switched to shielded fixtures, its police department reported no increase in nighttime incidents over the following three years. (10) Other residents say replacing lights would be expensive. (11) The rule would apply only when lights are installed or replaced, so no one would have to remove working fixtures.

(12) Stars are super pretty and everyone should get to see them. (13) Shielded lighting would protect the town's turtles and its view of the sky without making streets less safe or forcing costly replacements.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which revision of sentence (12) best maintains a formal style?`,
          choices: [
            no(`Stars are really pretty, so obviously everyone deserves to see them.`, 'keeps-informal-tone'),
            ok(`Restoring a darker sky would also return a view of the stars that most residents now lack.`),
            no(`Everybody loves looking at stars, and that is simply a fact.`, 'overgeneralization'),
            no(`Stars are nice to look at in a lot of different ways.`, 'vague-wording'),
          ],
          solution: `The correct revision uses precise, formal language and ties back to the contrast in sentence (1). The other choices keep casual wording, overgeneralize, or stay vague.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which transition best begins sentence (8) to show that it challenges the fear described in sentence (6)?`,
          choices: [
            no(`Likewise,`, 'similarity-for-contrast'),
            no(`For this reason,`, 'false-cause'),
            ok(`In fact,`),
            no(`In other words,`, 'restatement-for-contrast'),
          ],
          solution: `Sentence (8) introduces a fact that undercuts the safety fear, so "In fact" signals that turn. "In other words" is wrong because sentence (8) does not restate sentence (7).`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `What is the role of sentence (9) in the argument?`,
          choices: [
            no(`It states the writer's main claim about outdoor lighting.`, 'misidentifies-claim'),
            no(`It presents an opposing claim that the writer must answer.`, 'confuses-claim-with-counterclaim'),
            ok(`It provides evidence from a comparable town to support the response to the safety concern.`),
            no(`It explains how bright lights affect the town's sea turtles.`, 'confuses-evidence-location'),
          ],
          solution: `Sentence (9) uses Corrigan's experience to show that shielded lights did not reduce safety, backing up the response in sentence (8). The turtle evidence appears in sentence (4).`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `A reader objects that sentence (5) claims savings without support. Which revision best develops it with reasoning and evidence?`,
          choices: [
            no(`Saving money is always good for a town and for the people who live there.`, 'too-general'),
            no(`Electricity bills in Marrow Bay are very, very high for everyone in town.`, 'unsupported-assertion'),
            ok(`Because shielded fixtures aim all their light downward, a lower-wattage bulb can light the same street, and Corrigan cut its streetlight energy use by about a fifth after switching.`),
            no(`Shielded lights would save the town millions of dollars every single year.`, 'overstated-claim'),
          ],
          solution: `The correct revision explains why shielding saves energy and adds a measured result from a comparable town. The claim of millions saved each year is a large figure with no source.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which change would most improve the fairness and thoroughness of the response to the cost objection in sentences (10) and (11)?`,
          choices: [
            ok(`Acknowledge that replacement costs are real for some owners before explaining that the rule applies only to new or replaced lights.`),
            no(`Remove sentence (10) so that readers do not think about the cost of new lights.`, 'suppresses-counterclaim'),
            no(`Add that residents worried about cost care more about money than about the town.`, 'dismissive-tone'),
            no(`Place sentence (11) before sentence (10) so the answer comes before the objection.`, 'illogical-order'),
          ],
          solution: `The safety objection receives a concession in sentence (7), but the cost objection does not, so adding one makes the treatment fair and complete. Removing sentence (10) would hide an opposing view instead of answering it.`,
        },
      ],
    },
    {
      code: 'wg11-argument-writing-p08',
      title: 'Real Dishes at Oakhurst',
      body: `(1) Each school day, the Oakhurst High cafeteria throws away about 1,100 plastic trays, cups and utensils. (2) Oakhurst should replace disposable dishware with reusable trays, cups and utensils that are washed on site. (3) Disposable items fill roughly forty bags of trash daily, according to a two-week count by the school's environmental club. (4) The district also spends about $21,000 per year buying items that are used for a single meal. (5) Reusable dishware, by contrast, can last for several years with ordinary care.

(6) The main objection is that washing would require a commercial dishwasher and extra labor. (7) Oakhurst's kitchen already contains a dishwasher that was installed in 2009 but has sat unused since the switch to disposables. (8) A district facilities report estimates that repairing it and paying a part-time worker would cost about $16,000 a year. (9) This cost is about $5,000 less than current spending on disposables. (10) Others worry that students will not return trays and utensils. (11) Schools in the Wren Valley district solved this problem by placing return stations at each exit and assigning student volunteers to staff them during the first month.

(12) Plastic is bad. (13) Okay, so just switch to reusable stuff already.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence (13) as a conclusion?`,
          choices: [
            no(`In conclusion, some schools use reusable dishware and some schools do not.`, 'no-position'),
            no(`The cafeteria should also begin serving healthier lunches next year.`, 'introduces-new-topic'),
            ok(`Because reusable dishware would cut daily trash, cost less than disposables and use the kitchen's existing equipment, Oakhurst should make the switch next fall.`),
            no(`Switching is obviously the only choice that any sensible person would make.`, 'dismissive-tone'),
          ],
          solution: `The correct conclusion restates the claim and sums up the trash, cost and equipment points. The choice about healthier lunches introduces a new topic instead of concluding this argument.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which transition best begins sentence (7) to show its relationship to the objection in sentence (6)?`,
          choices: [
            ok(`However,`),
            no(`Similarly,`, 'similarity-for-contrast'),
            no(`For example,`, 'example-for-contrast'),
            no(`As a result,`, 'cause-effect-for-contrast'),
          ],
          solution: `Sentence (7) answers the objection by showing the school already owns a dishwasher, so "However" marks the turn. "As a result" is wrong because the dishwasher's existence is not caused by the objection.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Sentence (12) is vague and informal. Which revision best supports the argument?`,
          choices: [
            no(`Plastic is very bad, and everyone already knows it.`, 'unsupported-generalization'),
            no(`Plastic was first developed in the early twentieth century.`, 'irrelevant-detail'),
            no(`Plastic is the worst thing that humans have ever made.`, 'overstated-claim'),
            ok(`Ending single-use dishware would also shrink the forty daily bags of trash the cafeteria now sends to the landfill.`),
          ],
          solution: `The correct revision replaces a vague judgment with a specific benefit tied to the evidence in sentence (3). The claim that plastic is the worst thing humans have made is exaggerated and unsupported.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Which statement best explains how sentences (8) and (9) answer the objection in sentence (6)?`,
          choices: [
            no(`They deny that washing dishes would require any additional labor.`, 'misreads-rebuttal'),
            ok(`They concede that washing has a real cost but show that it is lower than what the district now spends on disposables.`),
            no(`They show that the old dishwasher is too damaged to be repaired.`, 'misreads-evidence'),
            no(`They prove that reusable dishware will never need to be replaced.`, 'overstated-claim'),
          ],
          solution: `Sentence (8) admits a $16,000 yearly cost, and sentence (9) compares it with the $21,000 from sentence (4), showing a savings. The text says the dishwasher can be repaired, so the third choice misreads it.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Which change to sentence (5) would most strengthen the reasoning of the argument?`,
          choices: [
            no(`Remove it, because the lifespan of reusable dishware has nothing to do with the claim.`, 'misjudges-relevance'),
            ok(`Add a specific lifespan and yearly replacement cost for reusable items, so the cost comparison in sentences (8) and (9) is complete.`),
            no(`Replace it with a statement that disposable items look cheap and unattractive.`, 'emotional-appeal'),
            no(`Add that the writer personally prefers metal forks to plastic ones.`, 'anecdotal-preference'),
          ],
          solution: `The cost comparison leaves out the price of buying and replacing reusable items, so specific figures would close that gap in the reasoning. Lifespan is directly relevant to cost, so removing sentence (5) would weaken the argument.`,
        },
      ],
    },
  ],
}

export default skill
