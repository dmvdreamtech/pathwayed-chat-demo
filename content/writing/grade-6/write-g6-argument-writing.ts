import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g6-argument-writing',
  subject: 'writing',
  grade: 6,
  group: 'Composition',
  name: 'Argument Writing',
  standards: ['W.6.1'],
  passages: [
    {
      code: 'wg6-argument-writing-p01',
      title: 'Pen Pals Across the Ocean',
      body: `(1) Most students at Westbrook Middle School have never spoken with a student their age from another country. (2) Our school should start a pen pal program with a partner school overseas. (3) Writing real letters gives students a reason to practice careful spelling and clear sentences. (4) When students know a real person will read their words, they usually take more care. (5) ______ letters teach students about daily life, food, and holidays in another place.

(6) Some teachers worry that a pen pal program would take time away from regular lessons. (7) This is a fair concern, since class time is limited. (8) However, the letters could be written during the writing block that already exists, so no lesson would be lost. (9) Mr. Okafor's class tried this last spring, and his students still finished every required writing assignment on time. (10) My cousin collects stamps from twelve different countries.

(11) A pen pal program would help students write better and understand the wider world. (12) Westbrook should find a partner school before the new term begins.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the claim?`,
          choices: [
            no(`sentence (4)`, 'removes-reasoning'),
            no(`sentence (7)`, 'removes-counterclaim'),
            no(`sentence (9)`, 'removes-key-evidence'),
            ok(`sentence (10)`),
          ],
          solution: `Sentence (10) is about a cousin's stamp collection, which has nothing to do with starting a pen pal program. Sentence (7) should stay because it fairly admits the teachers' concern before the writer answers it.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence (5)?`,
          choices: [
            no(`Instead,`, 'contrast-for-addition'),
            ok(`In addition,`),
            no(`As a result,`, 'cause-effect-for-addition'),
            no(`On the other hand,`, 'contrast-for-addition'),
          ],
          solution: `Sentence (5) adds a second benefit of letters after the writing benefit in sentences (3) and (4), so "In addition" fits. "On the other hand" would wrongly signal that sentence (5) disagrees with what came before.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which sentence states the writer's main claim?`,
          choices: [
            no(`sentence (1)`, 'confuses-hook-with-claim'),
            ok(`sentence (2)`),
            no(`sentence (3)`, 'confuses-reason-with-claim'),
            no(`sentence (6)`, 'confuses-counterclaim-with-claim'),
          ],
          solution: `Sentence (2) states the position the whole essay defends: the school should start a pen pal program. Sentence (1) only describes the situation that leads into the claim.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which piece of evidence would best support sentence (4)?`,
          choices: [
            no(`The first postage stamp was printed almost two hundred years ago.`, 'irrelevant-detail'),
            no(`Many students say their favorite school lunch is pizza on Fridays.`, 'off-topic-evidence'),
            ok(`A teacher survey found that letters written to pen pals had fewer spelling errors than regular class assignments.`),
            no(`The writer once wrote a thank you note to a neighbor and liked it.`, 'weak-anecdote'),
          ],
          solution: `Sentence (4) says students take more care when a real person will read their work, and the survey shows fewer errors in pen pal letters. The writer's single thank you note does not show anything about how carefully students write.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Why does the writer include sentences (6) and (7)?`,
          choices: [
            no(`to show that the writer has changed sides and now opposes the program`, 'mistakes-counterclaim-for-position'),
            ok(`to admit a fair opposing concern before answering it with a reason and evidence`),
            no(`to prove that every teacher at the school dislikes pen pal programs`, 'overgeneralization'),
            no(`to begin a new topic about how the school plans its daily schedule`, 'misreads-purpose'),
          ],
          solution: `Sentences (6) and (7) acknowledge the worry about lost class time, and sentences (8) and (9) then answer it. The writer never changes sides, because sentence (8) begins with "However" and argues back.`,
        },
      ],
    },
    {
      code: 'wg6-argument-writing-p02',
      title: 'Shade for Main Street',
      body: `(1) On summer afternoons, the sidewalks on Main Street in Pinecrest become so hot that many people avoid walking there, even to reach their favorite shops. (2) The town has many problems. (3) Trees cool the air around them by shading the ground and releasing water through their leaves. (4) Our county parks department measured shaded sidewalks that were up to fifteen degrees cooler than sunny ones. (5) Cooler sidewalks would bring more shoppers, which would help the small businesses on the street.

(6) Some business owners argue that tree roots could crack the sidewalks. (7) ______ city planners can choose kinds of trees whose roots grow deep instead of spreading sideways. (8) Planters with root barriers can also protect the pavement around each tree for many years.

(9) Trees would make Main Street cooler, friendlier, and better for business. (10) I think trees are pretty and stuff, so whatever.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Sentence (2) does not state a clear claim. Which revision of sentence (2) is best?`,
          choices: [
            no(`Main Street is one of the oldest streets in Pinecrest.`, 'fact-not-claim'),
            ok(`Pinecrest should plant shade trees along Main Street to cool the sidewalks and help local shops.`),
            no(`Summer in Pinecrest can be very hot for many weeks in a row.`, 'too-vague'),
            no(`Some people like trees on their streets, and some people do not.`, 'no-position'),
          ],
          solution: `The correct revision takes a clear position that the rest of the essay supports. The sentence about hot summers is true but does not tell readers what the writer wants the town to do.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence (7)?`,
          choices: [
            no(`For instance,`, 'example-for-contrast'),
            no(`Also,`, 'addition-for-contrast'),
            no(`Because of this,`, 'cause-effect-for-contrast'),
            ok(`However,`),
          ],
          solution: `Sentence (7) answers the business owners' worry in sentence (6), so a contrast word like "However" is needed. "For instance" would wrongly treat sentence (7) as an example of roots cracking sidewalks.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Sentence (10) is too informal for an argument. Which sentence is the best replacement?`,
          choices: [
            ok(`For these reasons, the town council should approve a plan to plant trees on Main Street this year.`),
            no(`Honestly, trees are really nice to look at, and everybody should just like them.`, 'keeps-informal-tone'),
            no(`The town should also paint the benches on Main Street a brighter color.`, 'introduces-new-topic'),
            no(`Still, tree roots might crack the sidewalks, so maybe the town should wait.`, 'contradicts-claim'),
          ],
          solution: `The correct sentence uses a formal tone and calls for the action the essay argues for. The choice about waiting gives in to the opposing claim the writer already answered in sentences (7) and (8).`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which detail would best support the reasoning in sentence (5)?`,
          choices: [
            no(`Oak trees can live for more than two hundred years in the right conditions.`, 'irrelevant-detail'),
            no(`Main Street has a bakery, a shoe store, and a small bookshop.`, 'lists-without-support'),
            ok(`After a nearby town planted trees downtown, its store owners reported more customers on summer afternoons.`),
            no(`The writer enjoys walking to the library on cool autumn days.`, 'weak-anecdote'),
          ],
          solution: `Sentence (5) claims that cooler sidewalks would help businesses, and the nearby town's results show that happening. Listing the shops on Main Street names businesses but gives no proof that shade would help them.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence (8) that explains how the response answers the business owners. Which sentence is best?`,
          choices: [
            no(`This proves that tree roots have never damaged a sidewalk anywhere.`, 'overgeneralization'),
            no(`Some roots may still break through the pavement after many years.`, 'weakens-claim'),
            no(`Planters can be made from wood, stone, or recycled plastic.`, 'adds-detail-not-reasoning'),
            ok(`With careful planning, the town can enjoy cooler streets without damaging the sidewalks shoppers use.`),
          ],
          solution: `The correct sentence connects the solutions in sentences (7) and (8) back to the worry about cracked sidewalks. The choice saying roots have never damaged a sidewalk claims far more than the writer's evidence can show.`,
        },
      ],
    },
    {
      code: 'wg6-argument-writing-p03',
      title: 'Typing Lessons Should Start Early',
      body: `(1) Students at Ridgeview Middle School type almost every assignment, yet many of them still hunt for each letter one key at a time. (2) Ridgeview's elementary schools should teach keyboarding lessons starting in fourth grade. (3) Students who learn to type correctly can finish written work much faster. (4) ______ a student who types thirty words per minute can type a one-page report in less than half the time it takes a student who types ten. (5) Typing quickly also lets students spend their energy on ideas instead of on finding keys.

(6) Some parents believe young children should practice handwriting instead. (7) Handwriting is important, and it should still be taught. (8) Even so, typing lessons need only fifteen minutes a few times each week. (9) Keyboards come in many colors now, and some even light up.

(10) Typing is a skill students will use in middle school, high school, and beyond. (11) Teaching it early would give every Ridgeview student a strong start.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not help the argument?`,
          choices: [
            no(`sentence (3)`, 'removes-reasoning'),
            no(`sentence (7)`, 'removes-counterclaim'),
            ok(`sentence (9)`),
            no(`sentence (10)`, 'removes-conclusion'),
          ],
          solution: `Sentence (9) describes colorful keyboards, which has nothing to do with when typing should be taught. Sentence (7) belongs because it fairly grants part of the parents' view before the writer responds.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence (4)?`,
          choices: [
            ok(`For example,`),
            no(`However,`, 'contrast-for-example'),
            no(`Instead,`, 'contrast-for-example'),
            no(`In conclusion,`, 'conclusion-for-example'),
          ],
          solution: `Sentence (4) gives a specific case that shows the idea in sentence (3), so "For example" fits. "However" would wrongly signal that sentence (4) disagrees with sentence (3).`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which sentence presents an opposing claim?`,
          choices: [
            no(`sentence (1)`, 'confuses-hook-with-counterclaim'),
            ok(`sentence (6)`),
            no(`sentence (8)`, 'confuses-rebuttal-with-counterclaim'),
            no(`sentence (11)`, 'confuses-conclusion-with-counterclaim'),
          ],
          solution: `Sentence (6) gives the view of parents who disagree with the writer and prefer handwriting practice. Sentence (8) is the writer's answer to that view, not the opposing claim itself.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `The writer wants to add evidence after sentence (8) to show that typing lessons would not hurt handwriting. Which sentence is best?`,
          choices: [
            no(`Many adults today type far more often than they write by hand.`, 'off-topic-evidence'),
            ok(`In a nearby district, fourth graders who had short typing lessons scored just as well on handwriting checks as those who had none.`),
            no(`Handwriting was taught in schools long before computers were invented.`, 'irrelevant-detail'),
            no(`The writer's younger sister already likes to type stories at home.`, 'weak-anecdote'),
          ],
          solution: `The correct sentence directly shows that typing lessons did not lower handwriting scores, which answers the parents' worry. The fact about adults typing more is true but does not show anything about handwriting skills.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `How does sentence (5) help the writer's argument?`,
          choices: [
            no(`It gives a number that measures how fast students can type.`, 'mislabels-reasoning-as-data'),
            no(`It admits that the opposing side has a reasonable point.`, 'mislabels-reason-as-counterclaim'),
            ok(`It explains why speed matters by connecting faster typing to more focus on ideas.`),
            no(`It repeats the main claim in the same words as sentence (2).`, 'misreads-purpose'),
          ],
          solution: `Sentence (5) is reasoning: it tells readers why typing speed is worth caring about, because students can think about ideas instead of keys. The numbers about words per minute appear in sentence (4), not sentence (5).`,
        },
      ],
    },
    {
      code: 'wg6-argument-writing-p04',
      title: 'Free Museum Visits for Students',
      body: `(1) The Hollis County History Museum holds old maps, farm tools, and letters written by the people who founded our town. (2) Yet few students ever see these treasures, because a single ticket costs twelve dollars. (3) The museum should let visitors under eighteen enter for free. (4) Seeing real objects helps students understand history in a way that textbooks alone cannot. (5) A student who studies a settler's handwritten letter may remember that lesson for many years.

(6) Museum leaders might say that free tickets would cost them money they need. (7) ______ more student visitors could actually bring in more money. (8) Students who enjoy a visit often return with their parents, who pay full price. (9) Those families may also buy books, maps, or postcards at the museum shop before they leave.

(10) In conclusion, museums are fun.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence states the writer's claim?`,
          choices: [
            no(`sentence (1)`, 'confuses-background-with-claim'),
            no(`sentence (2)`, 'confuses-problem-with-claim'),
            ok(`sentence (3)`),
            no(`sentence (4)`, 'confuses-reason-with-claim'),
          ],
          solution: `Sentence (3) says what the writer wants to happen: free entry for visitors under eighteen. Sentence (2) describes the problem that the claim is meant to solve.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence (7)?`,
          choices: [
            no(`Likewise,`, 'similarity-for-contrast'),
            ok(`However,`),
            no(`As a result,`, 'cause-effect-for-contrast'),
            no(`First,`, 'sequence-for-contrast'),
          ],
          solution: `Sentence (7) pushes back against the worry in sentence (6), so the contrast word "However" fits. "As a result" would wrongly suggest that losing money causes more money to come in.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Sentence (10) is a weak conclusion. Which revision best follows from the argument?`,
          choices: [
            no(`In conclusion, museums are very fun places that most people enjoy a lot.`, 'keeps-vague-conclusion'),
            no(`In conclusion, the museum should also stay open later on Saturdays.`, 'introduces-new-topic'),
            ok(`Free student tickets would help young people connect with local history while bringing new visitors to the museum.`),
            no(`In conclusion, the museum might need ticket money more than students need visits.`, 'contradicts-claim'),
          ],
          solution: `The correct revision restates the claim and sums up both reasons from the essay. The choice about Saturday hours brings in a new idea instead of closing the argument the writer made.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which piece of evidence would best support sentence (8)?`,
          choices: [
            ok(`At a museum in a nearby city, paid family visits rose by one third in the year after it began free student tickets.`),
            no(`The Hollis County History Museum first opened more than seventy years ago.`, 'irrelevant-detail'),
            no(`Many students say that history is one of their favorite school subjects.`, 'off-topic-evidence'),
            no(`The writer visited the museum once with a grandparent and enjoyed it.`, 'weak-anecdote'),
          ],
          solution: `Sentence (8) claims that students bring back paying family members, and the nearby museum's rise in paid family visits shows exactly that. One visit by the writer and a grandparent is a single story, not proof of a pattern.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `A classmate suggests adding "Everyone knows textbooks are boring." after sentence (4). Why should the writer NOT add it?`,
          choices: [
            no(`It repeats the claim from sentence (3) in the very same words.`, 'misidentifies-problem'),
            no(`It gives too much evidence, which makes the paragraph too long.`, 'misidentifies-problem'),
            ok(`It is an unsupported opinion stated informally, so it weakens the writer's credibility.`),
            no(`It presents an opposing claim, which should only appear in the conclusion.`, 'mislabels-sentence-role'),
          ],
          solution: `"Everyone knows" is not evidence, and calling textbooks boring is informal and unfair, which makes the writer seem less trustworthy. The sentence does not repeat sentence (3), which is about free tickets.`,
        },
      ],
    },
    {
      code: 'wg6-argument-writing-p05',
      title: 'Swimming in Gym Class',
      body: `(1) Lakeside Middle School sits just three blocks from Harbor Lake, yet many of its students cannot swim. (2) The school should add a four-week swimming unit to physical education class. (3) The community pool is right across the street, so students could walk there during class. (4) Knowing how to swim keeps people safe near water. (5) Swimming is also a sport that people can enjoy for their whole lives.

(6) Some families might object that a swimming unit would cost too much. (7) Actually, the community pool already offers free lane time to schools on weekday mornings. (8) ______ the only real cost would be a few boxes of swim caps.

(9) Other people say that students can simply take lessons in the summer. (10) Summer lessons fill up quickly, though, and many families cannot drive their children to the pool. (11) A school unit would reach every student, not only the lucky ones.

(12) Every student deserves the chance to be safe and confident in the water, and a swimming unit would give them that chance.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence (8)?`,
          choices: [
            no(`For example,`, 'example-for-cause-effect'),
            no(`On the other hand,`, 'contrast-for-cause-effect'),
            ok(`As a result,`),
            no(`Before that,`, 'sequence-for-cause-effect'),
          ],
          solution: `Because the pool time is free (sentence 7), the only cost left is swim caps, so "As a result" shows that cause and effect. "On the other hand" would wrongly signal that sentence (8) disagrees with sentence (7).`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which two sentences present opposing claims that the writer then answers?`,
          choices: [
            no(`sentences (2) and (4)`, 'confuses-reasons-with-counterclaims'),
            ok(`sentences (6) and (9)`),
            no(`sentences (7) and (10)`, 'confuses-rebuttal-with-counterclaim'),
            no(`sentences (1) and (3)`, 'confuses-background-with-counterclaim'),
          ],
          solution: `Sentence (6) raises the cost worry and sentence (9) suggests summer lessons instead, and the writer answers each one. Sentences (7) and (10) are the writer's answers, not the opposing claims.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which piece of evidence would best support sentence (4)?`,
          choices: [
            no(`Harbor Lake is the largest lake in the county and has two beaches.`, 'irrelevant-detail'),
            ok(`A water safety group reports that people who passed a basic swim course were far less likely to need rescue at lakes.`),
            no(`Swimming uses many muscles in the arms, legs, and back.`, 'supports-wrong-point'),
            no(`The writer's best friend says swimming is the most relaxing sport.`, 'weak-anecdote'),
          ],
          solution: `Sentence (4) is about safety, and the water safety report links swim lessons to fewer rescues. The fact about muscles is true, but it supports a fitness point rather than the safety point in sentence (4).`,
        },
        {
          slot: 24,
          difficulty: 'hard',
          stem: `Why is sentence (1) an effective way to begin this argument?`,
          choices: [
            ok(`It shows the problem matters to these students because a lake is close to their school.`),
            no(`It states the exact claim that the rest of the essay will defend.`, 'confuses-hook-with-claim'),
            no(`It answers an opposing claim before anyone has raised it.`, 'mislabels-sentence-role'),
            no(`It gives the main evidence about how much the program would cost.`, 'misreads-purpose'),
          ],
          solution: `By pointing out that a lake is nearby and many students cannot swim, sentence (1) makes the problem feel real and urgent. The claim itself comes in sentence (2), not sentence (1).`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (10), would best support the writer's response?`,
          choices: [
            no(`Summer is the most popular season for swimming in most towns.`, 'does-not-support-rebuttal'),
            no(`Some families prefer to hire private swim coaches for their children.`, 'weakens-claim'),
            no(`The writer's older brother did not learn to swim until he was ten.`, 'weak-anecdote'),
            ok(`Last year, the town's summer swim classes were full within two days of opening sign-ups.`),
          ],
          solution: `Sentence (10) says summer lessons fill up quickly, and classes filling in two days is evidence for that. The fact that summer is a popular swimming season does not show that lessons are hard to get.`,
        },
      ],
    },
    {
      code: 'wg6-argument-writing-p06',
      title: 'Keep Art Twice a Week',
      body: `(1) Next year, Maplewood Middle School plans to cut art class from two days a week to one. (2) This change would be a mistake, and the school should keep art class twice a week. (3) Art teaches students to solve problems in creative ways. (4) When a clay sculpture keeps falling over, students must test new ideas until one works. (5) Art also gives students a calm break during a busy school day. (6) The art room has two sinks and a big window.

(7) The principal explains that the extra time would go toward math practice. (8) Math is certainly important. (9) ______ students who take art regularly often do just as well in math as those who do not. (10) Some researchers believe that art builds the same careful thinking that math requires.

(11) Art class is not just for fun. (12) It helps students think, create, and focus, and Maplewood should protect it.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the claim?`,
          choices: [
            no(`sentence (4)`, 'removes-key-example'),
            ok(`sentence (6)`),
            no(`sentence (8)`, 'removes-counterclaim'),
            no(`sentence (11)`, 'removes-conclusion'),
          ],
          solution: `Sentence (6) describes the art room, which does not give a reason to keep art twice a week. Sentence (8) belongs because it fairly grants part of the principal's point before the writer responds.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence (9)?`,
          choices: [
            no(`Therefore,`, 'cause-effect-for-contrast'),
            no(`For instance,`, 'example-for-contrast'),
            ok(`Nevertheless,`),
            no(`Similarly,`, 'similarity-for-contrast'),
          ],
          solution: `Sentence (8) grants that math matters, and sentence (9) turns back to the writer's side, so "Nevertheless" shows that contrast. "Therefore" would wrongly suggest that math being important causes art students to do well in math.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `What is the purpose of sentence (8) in the argument?`,
          choices: [
            no(`It states the writer's main claim about art class.`, 'confuses-concession-with-claim'),
            ok(`It admits that part of the opposing view has value before the writer responds.`),
            no(`It gives evidence that art class improves math scores.`, 'mislabels-concession-as-evidence'),
            no(`It shows the writer now agrees that art should be cut.`, 'mistakes-concession-for-position'),
          ],
          solution: `Sentence (8) is a concession: the writer agrees math matters, which makes the response in sentence (9) seem fair. The writer does not switch sides, because sentence (12) still says Maplewood should protect art.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `Sentence (10) is vague. Which revision gives the strongest evidence?`,
          choices: [
            no(`Many people think that art is helpful for almost everyone in some way.`, 'vague-evidence'),
            no(`Art has been part of human life for thousands of years.`, 'irrelevant-detail'),
            no(`Researchers are very smart, so they are probably right about art.`, 'vague-appeal-to-authority'),
            ok(`A study of three hundred middle school students found that those in weekly art classes scored higher on problem-solving tests.`),
          ],
          solution: `The correct revision names a specific study and a result that connects art to careful thinking. Saying researchers are smart does not give any actual finding, so it is no stronger than the original.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which sentence would best follow sentence (4) to explain how the example supports the claim?`,
          choices: [
            ok(`Learning to keep trying after an idea fails is a skill students need in every subject.`),
            no(`Sculptures can be made from clay, wire, paper, or even old cardboard.`, 'adds-detail-not-reasoning'),
            no(`Some students do not enjoy making sculptures and would rather draw.`, 'weakens-claim'),
            no(`Therefore, the school should teach art every single day of the week.`, 'shifts-claim'),
          ],
          solution: `The correct sentence explains why the sculpture example matters: it builds a skill students use everywhere. The choice about teaching art every day changes the writer's claim, which asks only to keep art twice a week.`,
        },
      ],
    },
    {
      code: 'wg6-argument-writing-p07',
      title: 'A Weather Station for Cedar Grove',
      body: `(1) Every morning, students at Cedar Grove Middle School check a phone app to learn whether it will rain. (2) Instead of relying only on apps, our school should build its own weather station. (3) A weather station would let students collect real data about temperature, rainfall, and wind speed right outside their classrooms. (4) Science classes could use those numbers to make graphs and test their predictions. (5) Working with real numbers makes science feel useful instead of distant.

(6) Some people may say that a weather station is too expensive for a school. (7) However, a basic station costs about as much as one classroom set of calculators. (8) ______ the parent group has already offered to raise half of the money at the spring fair.

(9) A weather station would turn our schoolyard into an outdoor science lab that every grade could use.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence (8)?`,
          choices: [
            no(`Instead,`, 'contrast-for-addition'),
            no(`On the other hand,`, 'contrast-for-addition'),
            no(`In conclusion,`, 'conclusion-for-addition'),
            ok(`In addition,`),
          ],
          solution: `Sentence (8) adds another answer to the cost worry on top of sentence (7), so "In addition" fits. "On the other hand" would wrongly signal that the parent group's offer goes against the point in sentence (7).`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which sentence would best follow sentence (9) to complete the conclusion?`,
          choices: [
            no(`Some weather stations can even measure how deep the snow is.`, 'new-detail-in-conclusion'),
            ok(`For these reasons, Cedar Grove should build a weather station before the next school year.`),
            no(`Maybe the school could think about it someday, if it wants to.`, 'hedged-claim'),
            no(`Phone apps are always wrong about the weather anyway.`, 'unsupported-exaggeration'),
          ],
          solution: `The correct sentence restates the claim as a clear call to action that follows from the reasons given. The "maybe someday" choice is so uncertain that it weakens the writer's own position.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `What makes sentence (7) an effective response to the opposing claim?`,
          choices: [
            no(`It agrees that the station costs too much for the school to afford.`, 'misreads-rebuttal'),
            ok(`It compares the price to a familiar school purchase, showing the cost is reasonable.`),
            no(`It changes the subject from cost to the science that students would learn.`, 'misreads-purpose'),
            no(`It proves that weather stations are free for every school.`, 'overgeneralization'),
          ],
          solution: `By comparing the station to one set of calculators, sentence (7) helps readers see the cost as normal for a school. It does not say the station is free, only that the price is manageable.`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `Which piece of evidence would best support sentence (5)?`,
          choices: [
            no(`Weather stations were first used by scientists hundreds of years ago.`, 'irrelevant-detail'),
            no(`Cedar Grove gets more rain in April than in any other month.`, 'off-topic-evidence'),
            ok(`After one class graphed its own rainfall data, more students said science connected to their daily lives.`),
            no(`The writer thinks graphs are the most interesting part of math class.`, 'opinion-not-evidence'),
          ],
          solution: `Sentence (5) says real data makes science feel useful, and the class survey shows students felt that connection. The writer's liking for graphs is a personal opinion, not evidence about other students.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which statement best describes how sentence (2) relates to sentence (1)?`,
          choices: [
            no(`Sentence (2) gives evidence that proves sentence (1) is true.`, 'mislabels-claim-as-evidence'),
            no(`Sentence (2) presents an opposing view that disagrees with sentence (1).`, 'mislabels-claim-as-counterclaim'),
            ok(`Sentence (1) describes a current habit, and sentence (2) states a claim that offers a different approach.`),
            no(`Sentence (2) repeats sentence (1) using different words.`, 'misreads-relationship'),
          ],
          solution: `Sentence (1) sets up the situation of relying on apps, and sentence (2) states the writer's claim that the school should build its own station. Sentence (2) is not evidence for sentence (1), because it argues for a change rather than proving a fact.`,
        },
      ],
    },
    {
      code: 'wg6-argument-writing-p08',
      title: 'Walk to School Fridays',
      body: `(1) Each morning, a long line of cars crawls past Brookside Middle School, and the air near the entrance smells of exhaust. (2) Brookside should start Walk to School Fridays, when students who live nearby walk or ride bikes in groups led by adult volunteers. (3) Walking gives students exercise before class begins. (4) Students who are active in the morning often find it easier to pay attention in class. (5) Fewer cars would also mean cleaner air and safer streets near the school.

(6) Some parents worry that walking to school is not safe. (7) ______ each walking group would follow a set route with crossing guards at the busiest corners. (8) One adult volunteer would walk at the front of each group and another at the back.

(9) Others argue that students would arrive late. (10) Groups would leave from meeting spots at set times, so arrivals could be more predictable than the car line.

(11) Walking to school would make Brookside healthier and calmer. (12) Plus, my friend Dante said it sounds fun.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it is informal and does not support the claim?`,
          choices: [
            no(`sentence (8)`, 'removes-key-evidence'),
            no(`sentence (10)`, 'removes-rebuttal'),
            no(`sentence (11)`, 'removes-conclusion'),
            ok(`sentence (12)`),
          ],
          solution: `Sentence (12) relies on a friend's casual opinion, which is informal and gives no real reason. Sentence (10) must stay because it answers the worry about arriving late.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence (7)?`,
          choices: [
            ok(`To address this concern,`),
            no(`For example,`, 'example-for-response'),
            no(`In the same way,`, 'similarity-for-response'),
            no(`Even worse,`, 'strengthens-counterclaim'),
          ],
          solution: `Sentence (7) answers the safety worry in sentence (6), so "To address this concern" shows that relationship. "Even worse" would suggest the writer is adding to the danger instead of answering it.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Which piece of evidence would best support sentence (4)?`,
          choices: [
            no(`Brookside Middle School has about six hundred students in three grades.`, 'irrelevant-detail'),
            no(`Bicycles were invented more than two hundred years ago.`, 'off-topic-evidence'),
            no(`The writer feels more awake after walking the family dog.`, 'weak-anecdote'),
            ok(`A study found that students who walked to school did better on attention tasks during morning classes.`),
          ],
          solution: `Sentence (4) links morning activity to paying attention, and the study shows exactly that link. The writer's own feeling after walking the dog is one person's experience, not reliable evidence.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Why is sentence (10) an effective response to the claim in sentence (9)?`,
          choices: [
            no(`It agrees that students would arrive late but says that is acceptable.`, 'misreads-rebuttal'),
            no(`It gives exact numbers showing how many students are late each week.`, 'mislabels-reasoning-as-data'),
            ok(`It answers the worry directly, explaining that set leaving times could make arrivals more dependable.`),
            no(`It moves the argument to a new topic about safety at busy corners.`, 'misreads-purpose'),
          ],
          solution: `Sentence (10) meets the lateness worry head on with a reason: groups leave at set times. It contains no numbers, so it works through reasoning rather than data.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Which revision of sentence (11) best restates the claim and sums up the writer's reasons?`,
          choices: [
            no(`Walking is something people have done for thousands of years.`, 'irrelevant-detail'),
            no(`Some students may still choose to ride in cars on Fridays.`, 'weakens-claim'),
            ok(`By starting Walk to School Fridays, Brookside would give students exercise, cleaner air, and safer streets.`),
            no(`Brookside should also start a bike repair club next spring.`, 'introduces-new-topic'),
          ],
          solution: `The correct revision names the program the writer wants and gathers the reasons from sentences (3) through (5). The bike repair club is a new idea that does not follow from this argument.`,
        },
      ],
    },
  ],
}

export default skill
