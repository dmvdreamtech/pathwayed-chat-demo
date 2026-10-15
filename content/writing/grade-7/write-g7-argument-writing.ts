import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g7-argument-writing',
  subject: 'writing',
  grade: 7,
  group: 'Composition',
  name: 'Argument Writing',
  standards: ['W.7.1'],
  passages: [
    {
      code: 'wg7-argument-writing-p01',
      title: 'No More Late Fees',
      body: `(1) Every year, many children in Harlow stop borrowing books because they owe money to the public library. (2) The Harlow Public Library should stop charging fines for overdue books. (3) Late fees are supposed to teach responsibility, but they often punish families who simply cannot pay. (4) When a student owes even a few dollars, the library blocks that student's card until the fee is paid. (5) The library also has a nice reading corner with beanbag chairs.

(6) Some people believe that without fines, borrowers will keep books forever. (7) This worry makes sense, because the library needs its books returned. (8) ______ a nearby town that ended fines two years ago found that most overdue books still came back within a month. (9) Its librarians also reported that three hundred former members returned and opened new cards.

(10) Libraries exist so that everyone can read and learn. (11) Fines are dumb and nobody likes them.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the claim?`,
          choices: [
            no(`sentence (3)`, 'removes-reasoning'),
            ok(`sentence (5)`),
            no(`sentence (7)`, 'removes-counterclaim'),
            no(`sentence (9)`, 'removes-key-evidence'),
          ],
          solution: `Sentence (5) describes the reading corner, which has nothing to do with ending late fees. Sentence (7) should stay because it fairly acknowledges the opposing view before the writer answers it.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence (8)?`,
          choices: [
            no(`Similarly,`, 'similarity-for-contrast'),
            no(`Therefore,`, 'cause-effect-for-contrast'),
            ok(`However,`),
            no(`For example,`, 'example-for-contrast'),
          ],
          solution: `Sentence (8) gives evidence that goes against the worry in sentences (6) and (7), so "However" shows the contrast. "For example" would wrongly suggest the sentence is an example of the worry.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Sentence (11) is too informal for an argument. Which revision best keeps a formal style and follows from the argument?`,
          choices: [
            no(`Fines are really unfair, and honestly they are kind of pointless.`, 'keeps-informal-tone'),
            no(`Some fines may be fair, so the library could keep them for now.`, 'contradicts-claim'),
            no(`The library should also stay open later on weekends.`, 'introduces-new-topic'),
            ok(`Ending late fees would welcome readers back while the books still come home.`),
          ],
          solution: `The correct revision is formal and sums up both the benefit and the answer to the opposing worry. The choice about keeping some fines gives up the writer's own claim.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which piece of evidence would best support sentence (3)?`,
          choices: [
            ok(`A library report found that most cards blocked for fines belonged to families with the lowest incomes in town.`),
            no(`The Harlow Public Library first opened its doors in 1928 on a quiet street near the river.`, 'irrelevant-detail'),
            no(`A survey found that many students in Harlow say their favorite books are mystery novels.`, 'off-topic-evidence'),
            no(`The writer once paid a fine of fifty cents after returning a book two days late.`, 'weak-anecdote'),
          ],
          solution: `Sentence (3) says fines punish families who cannot pay, and the report shows blocked cards belong mostly to lower income families. The writer's own fifty cent fine does not show that families cannot afford to pay.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence (9) that explains how the evidence answers the opposing claim. Which sentence is best?`,
          choices: [
            no(`The nearby town also built a new playground next to its library that same year.`, 'irrelevant-detail'),
            ok(`These results suggest that removing fines brings readers back without causing the library to lose its books.`),
            no(`This proves that no library anywhere has ever lost a book after it ended fines.`, 'overgeneralization'),
            no(`Some borrowers in that town still kept their books for longer than a month.`, 'weakens-claim'),
          ],
          solution: `The correct sentence explains what the evidence in sentences (8) and (9) means for the worry about lost books. The choice claiming no library ever lost a book overstates what one town's results can prove.`,
        },
      ],
    },
    {
      code: 'wg7-argument-writing-p02',
      title: 'Saving Birds at Crestview',
      body: `(1) Last fall, students at Crestview Middle School found more than forty birds stunned or hurt below the windows of the new library wing. (2) ______ (3) Birds cannot see clear glass, so they fly straight toward the trees and sky reflected in it. (4) Scientists who study birds estimate that window strikes harm millions of birds in our country every year. (5) Small dot stickers placed about two inches apart break up the reflection and warn birds that something solid is there.

(6) Some teachers worry that the dots would block the view from the library. (7) However, the dots are small and spaced apart, so readers could still see outside clearly. (8) The science club tested a sample panel in October, and no student who sat near it said the view was harder to see. (9) Also, the stickers for the whole wing cost about two hundred dollars, which the club could raise at one bake sale. (10) Crestview's new building is the largest one in the district.

(11) A simple layer of dots would let Crestview keep its bright new library and protect the birds that share our campus.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence would best fill the blank as sentence (2) and state the writer's claim?`,
          choices: [
            no(`Birds are some of the most interesting animals that live near our school.`, 'topic-not-claim'),
            no(`The library wing was built last summer with very large glass windows.`, 'fact-not-claim'),
            ok(`Crestview should cover the library windows with bird-safe dot stickers to prevent these collisions.`),
            no(`Some birds fly into windows at our school, and some birds do not.`, 'no-position'),
          ],
          solution: `Only this choice takes a clear position that the rest of the essay supports with reasons and evidence. The sentence about the library being built is a fact, not something a reader could argue for or against.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not support the argument?`,
          choices: [
            no(`sentence (4)`, 'removes-key-evidence'),
            no(`sentence (6)`, 'removes-counterclaim'),
            no(`sentence (8)`, 'removes-key-evidence'),
            ok(`sentence (10)`),
          ],
          solution: `The size of the building does not support adding stickers or answer the teachers' concern. Sentence (6) should stay because it presents the opposing claim that the writer answers.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which replacement for "Also," at the start of sentence (9) is more formal and shows that the sentence adds another reason?`,
          choices: [
            ok(`In addition,`),
            no(`Plus,`, 'keeps-informal-tone'),
            no(`Instead,`, 'replacement-for-addition'),
            no(`In contrast,`, 'contrast-for-addition'),
          ],
          solution: `Sentence (9) adds the low cost as one more point in the writer's favor, and "In addition" says so formally. "Plus" shows addition too, but it is informal for an argument essay.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `How does sentence (8) strengthen the writer's response to the teachers' concern?`,
          choices: [
            no(`It restates the teachers' worry about the view in different words.`, 'confuses-counterclaim-and-response'),
            ok(`It gives the result of a real test showing that the dots did not make the view harder to see.`),
            no(`It explains why birds are unable to see clear glass windows.`, 'confuses-evidence-location'),
            no(`It shows that the stickers are cheap enough for the club to buy.`, 'confuses-evidence-location'),
          ],
          solution: `Sentence (8) reports the science club's test, which is evidence that directly answers the worry about blocking the view. The cost of the stickers comes in sentence (9), not sentence (8).`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence (5) that explains why this evidence supports the claim. Which sentence is best?`,
          choices: [
            no(`Dot stickers come in many colors and shapes, such as stars, circles, and squares.`, 'irrelevant-detail'),
            no(`Stickers are the only way that anyone has ever protected birds from glass.`, 'overgeneralization'),
            no(`Some birds that hit windows are able to fly away after resting for a few minutes.`, 'weakens-claim'),
            ok(`Because the stickers stop the reflections that fool birds, they address the cause of the collisions at our school.`),
          ],
          solution: `The correct sentence connects the evidence in sentences (3) and (5) to the claim by showing the stickers fix the real cause. The sentence about birds flying away actually weakens the argument instead of explaining it.`,
        },
      ],
    },
    {
      code: 'wg7-argument-writing-p03',
      title: 'Ultimate Disc for Gym Class',
      body: `(1) In physical education at Rivera Middle School, we rotate through the same three sports every year: basketball, volleyball, and soccer. (2) Ultimate disc should be added to the seventh grade gym schedule. (3) In this game, players pass a flying disc down a field and score by catching it in an end zone. (4) The game requires constant running, so students get a strong workout. (5) It also has no referees, which means players must call their own fouls and settle disagreements fairly. (6) This rule teaches honesty and teamwork in a way that few other sports do.

(7) Some students say ultimate disc is too hard to learn. (8) Throwing a disc does take practice, but most beginners can make short passes after one class. (9) Our gym teacher, Mr. Okafor, already owns twelve discs from a summer camp he ran. (10) The school would not need to buy much new equipment.

(11) Ultimate disc combines exercise with fairness and cooperation. (12) It is time for Rivera to give this sport a turn on the schedule.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence states the writer's claim?`,
          choices: [
            no(`sentence (1)`, 'background-as-claim'),
            no(`sentence (3)`, 'definition-as-claim'),
            no(`sentence (4)`, 'reason-as-claim'),
            ok(`sentence (2)`),
          ],
          solution: `Sentence (2) states the position the whole essay argues for: adding ultimate disc to gym class. Sentence (4) is one reason that supports the claim, not the claim itself.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which choice best combines sentences (9) and (10) to show how the ideas are related?`,
          choices: [
            ok(`Because Mr. Okafor already owns twelve discs from a summer camp he ran, the school would not need to buy much new equipment.`),
            no(`Mr. Okafor already owns twelve discs from a summer camp he ran, but the school would not need to buy much new equipment.`, 'contrast-for-cause'),
            no(`Although Mr. Okafor already owns twelve discs from a summer camp he ran, the school would not need to buy much new equipment.`, 'contrast-for-cause'),
            no(`Mr. Okafor already owns twelve discs from a summer camp he ran, or the school would not need to buy much new equipment.`, 'wrong-conjunction'),
          ],
          solution: `The discs Mr. Okafor owns are the reason the school would not need much equipment, so "Because" shows cause and effect. "But" and "Although" signal a contrast that is not there.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which piece of evidence would best support the response in sentence (8)?`,
          choices: [
            no(`Ultimate disc was first played by a group of high school students many years ago.`, 'irrelevant-history'),
            ok(`In a trial lesson last spring, 25 of 28 seventh graders completed five passes in a row by the end of class.`),
            no(`Some professional players can throw a disc more than seventy yards in a single toss.`, 'does-not-address-beginners'),
            no(`Basketball is also hard to learn at first, especially dribbling with the weaker hand.`, 'shifts-focus'),
          ],
          solution: `Sentence (8) says beginners can make short passes after one class, and the trial lesson shows exactly that. The fact about professional players says nothing about how quickly beginners learn.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which sentence, if added after sentence (1), would best explain why the current schedule is a problem?`,
          choices: [
            no(`Basketball was the first sport our school ever offered when it opened.`, 'irrelevant-history'),
            no(`The volleyball nets are stored in the closet behind the auditorium stage.`, 'irrelevant-detail'),
            ok(`Students who dislike these three sports often sit out and miss the exercise gym class is meant to provide.`),
            no(`Many famous athletes started playing soccer when they were very young.`, 'off-topic-evidence'),
          ],
          solution: `This sentence shows a real problem with offering only three sports, which gives a reason to add a new one. The other choices are facts about the sports or the school that do not point to any problem.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Which statement best describes the role of sentence (6) in the argument?`,
          choices: [
            no(`It introduces an opposing claim that the writer answers in the next paragraph.`, 'misidentifies-counterclaim'),
            no(`It gives a statistic proving that ultimate disc players are more honest.`, 'reasoning-as-statistic'),
            ok(`It explains why the fact in sentence (5) supports the claim by showing what students would learn.`),
            no(`It restates the claim in nearly the same words as sentence (2).`, 'misidentifies-claim'),
          ],
          solution: `Sentence (5) gives a fact about the game, and sentence (6) is the reasoning that links that fact to the benefit for students. It contains no numbers, so it is not a statistic.`,
        },
      ],
    },
    {
      code: 'wg7-argument-writing-p04',
      title: 'Keep the Old Depot',
      body: `(1) The brick train depot on Front Street has stood in Millbrook since 1891, but the town council plans to tear it down for a parking lot. (2) I kind of think maybe the depot should stay. (3) The depot was where the town's first farmers shipped grain to the city, so it explains how Millbrook grew. (4) A museum inside it could display old photographs, tickets, and tools that the historical society now keeps in storage boxes. (5) Students could visit on field trips and learn local history from real objects instead of only from textbooks. (6) My grandmother says the town had a great ice cream shop in the 1950s.

(7) Supporters of the parking lot argue that downtown shoppers cannot find places to park. (8) ______ (9) A lot two blocks away on Mill Road sits half empty most afternoons, according to a count taken by the historical society. (10) Better signs pointing drivers to that lot would solve the problem without destroying a landmark.

(11) The depot connects Millbrook's past to its present. (12) Once it is gone, it can never be replaced.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Sentence (2) is informal and unclear. Which revision states the claim most clearly and formally?`,
          choices: [
            no(`I kind of think the depot is pretty cool and should maybe stay.`, 'keeps-informal-tone'),
            ok(`Millbrook should turn the old depot into a history museum instead of tearing it down.`),
            no(`The depot is a very old building on Front Street.`, 'fact-not-claim'),
            no(`Some people like the depot, and other people like parking lots.`, 'no-position'),
          ],
          solution: `The correct revision takes a precise, formal position that the reasons in sentences (3) through (5) support. The first choice keeps the casual, uncertain wording of the original.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            no(`sentence (3)`, 'removes-reasoning'),
            no(`sentence (7)`, 'removes-counterclaim'),
            ok(`sentence (6)`),
            no(`sentence (9)`, 'removes-key-evidence'),
          ],
          solution: `The ice cream shop has nothing to do with saving the depot or turning it into a museum. Sentence (7) belongs because it states the opposing claim that the writer then answers.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which sentence would best fill the blank as sentence (8)?`,
          choices: [
            no(`Parking lots are ugly, and no sensible person should want one downtown.`, 'dismissive-tone'),
            no(`Many shoppers also enjoy visiting the bakery on Front Street.`, 'off-topic'),
            no(`Therefore, the depot should probably be torn down after all.`, 'contradicts-claim'),
            ok(`Parking is a real concern, but a new lot is not the only answer.`),
          ],
          solution: `The correct sentence admits the opposing point has merit and then leads into the writer's response in sentences (9) and (10). The choice calling parking lots ugly insults the other side instead of answering it.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `How does sentence (9) help the writer respond to the supporters of the parking lot?`,
          choices: [
            ok(`It gives evidence from a count that parking already exists nearby, which weakens the need for a new lot.`),
            no(`It explains how the depot helped the town grow when farmers shipped grain.`, 'confuses-evidence-location'),
            no(`It admits that the parking lot is a better plan than the museum.`, 'misreads-concession'),
            no(`It describes the objects that the museum would display for visitors.`, 'confuses-evidence-location'),
          ],
          solution: `The supporters say shoppers cannot park, and sentence (9) shows a half empty lot only two blocks away. The grain shipping detail is in sentence (3) and supports a different reason.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence (12) so that the conclusion follows from the whole argument. Which sentence is best?`,
          choices: [
            no(`Parking lots are needed in every town, so the council's plan has some value.`, 'weakens-claim'),
            no(`The council should also repave Front Street sometime next summer.`, 'introduces-new-topic'),
            ok(`By opening a museum and guiding drivers to Mill Road, the council can protect this landmark and still help shoppers.`),
            no(`History is important, and everyone should care about it more.`, 'too-general'),
          ],
          solution: `The correct sentence ties together both parts of the argument: the museum plan and the answer to the parking concern. The sentence about history is true but too general to sum up this specific argument.`,
        },
      ],
    },
    {
      code: 'wg7-argument-writing-p05',
      title: 'Students Can Fix It',
      body: `(1) At Lakeside Middle School, broken laptops sit in a cart for weeks because one technician serves all five schools in our district. (2) Lakeside should create a student tech help desk where trained students handle simple laptop repairs. (3) Most problems are small, such as a loose key, a forgotten password, or a program that will not open. (4) Last year, the technician's log showed that 70 percent of repair requests at Lakeside took less than ten minutes to fix. (5) ______ students could solve these problems during study hall and return laptops the same day. (6) Students on the help desk would also learn real skills that could lead to careers in technology.

(7) Some parents worry that students might damage the laptops further. (8) To prevent this, the help desk would handle only simple tasks, and anything that requires opening a laptop case would still go to the technician. (9) Our neighboring school, Pine Hill, has run a similar desk for two years with no reports of damaged equipment.

(10) Laptops are really important for school.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence (5)?`,
          choices: [
            no(`However,`, 'contrast-for-result'),
            no(`For example,`, 'example-for-result'),
            ok(`Therefore,`),
            no(`Meanwhile,`, 'time-for-result'),
          ],
          solution: `Sentence (5) tells what follows from the quick repair times in sentence (4), so "Therefore" shows the result. "However" would signal a contrast, but sentence (5) agrees with sentence (4).`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (10) as a conclusion?`,
          choices: [
            no(`Laptops are useful in class, but printed books are useful too.`, 'off-claim'),
            no(`Computers have changed a great deal since they were first invented.`, 'too-general'),
            ok(`A student help desk would return laptops faster and teach volunteers useful skills, so Lakeside should start one this year.`),
            no(`The district technician should simply work faster when visiting Lakeside.`, 'unsupported-solution'),
          ],
          solution: `The correct choice restates the claim and sums up the two main reasons from the essay. The choice about the technician working faster offers a new idea the essay never supports.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which piece of evidence would best support sentence (6)?`,
          choices: [
            ok(`At Pine Hill, three former help desk volunteers went on to join the high school's computer science program.`),
            no(`Each laptop at Lakeside weighs about three pounds and comes with a charging cord.`, 'irrelevant-detail'),
            no(`The district technician drives a blue van from one school to the next.`, 'irrelevant-detail'),
            no(`Many adults use laptops every day at their jobs in offices and stores.`, 'too-general'),
          ],
          solution: `Sentence (6) says the desk builds skills that lead toward technology careers, and the Pine Hill volunteers show that path. The fact that adults use laptops does not show that help desk students learn anything.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `How does the writer answer the concern in sentence (7)?`,
          choices: [
            no(`by saying that parents do not understand how laptops work`, 'dismissive-tone'),
            no(`by admitting that a student help desk is probably a bad idea`, 'misreads-concession'),
            no(`by giving the percentage of quick repairs from the technician's log`, 'confuses-evidence-location'),
            ok(`by limiting the desk to simple tasks and pointing to a school where a similar desk caused no damage`),
          ],
          solution: `Sentences (8) and (9) answer the worry with a safety rule and an example from Pine Hill. The repair percentage in sentence (4) supports the claim but does not address possible damage.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Which sentence, if added after sentence (4), best explains how that evidence supports the claim?`,
          choices: [
            no(`The technician is a kind person who works very hard every single day.`, 'irrelevant-detail'),
            ok(`Since most repairs are this quick and simple, they do not require an expert, and trained students could handle them.`),
            no(`Ten minutes is about the same length as the morning break at our school.`, 'irrelevant-comparison'),
            no(`This proves that the technician should be replaced by students entirely.`, 'overstates-claim'),
          ],
          solution: `The correct sentence explains why quick repairs mean students can do the work, linking sentence (4) to the claim. The choice about replacing the technician goes far beyond what the writer argues.`,
        },
      ],
    },
    {
      code: 'wg7-argument-writing-p06',
      title: 'A New Language for Oakdale',
      body: `(1) Oakdale Middle School offers Spanish and French, but students who want to learn American Sign Language have no option. (2) Oakdale should add American Sign Language as a seventh grade elective. (3) Sign language allows students to communicate with deaf and hard of hearing people in our community. (4) Our town has a school for the deaf only three miles away, and its students often visit our library and parks. (5) Learning to sign also builds visual memory, because students must remember hand shapes, movements, and facial expressions. (6) Some students think sign language looks interesting.

(7) Some teachers argue that the school cannot afford to hire another language teacher. (8) This is a fair point. (9) However, the deaf school's outreach program has offered to send an instructor twice a week at no cost. (10) Our band concert last month raised money for new music stands.

(11) Sign language is a beautiful language. (12) It would be cool to learn.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not support the argument?`,
          choices: [
            ok(`sentence (10)`),
            no(`sentence (4)`, 'removes-key-evidence'),
            no(`sentence (8)`, 'removes-concession'),
            no(`sentence (9)`, 'removes-rebuttal'),
          ],
          solution: `The band concert has nothing to do with adding a sign language class. Sentence (8) should stay because it fairly admits the teachers have a point before the writer responds.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which choice best replaces sentences (11) and (12) with a formal conclusion that follows from the argument?`,
          choices: [
            no(`Sign language is beautiful and would be really cool to learn.`, 'keeps-informal-tone'),
            no(`Spanish and French are also beautiful languages that students enjoy.`, 'off-claim'),
            ok(`Because sign language would connect us with our neighbors and could be taught at no cost, Oakdale should offer it next fall.`),
            no(`Hiring a new teacher costs money, so the class may have to wait.`, 'contradicts-claim'),
          ],
          solution: `The correct choice is formal and sums up the main reason and the answer to the cost concern. The choice about waiting for money ignores the free instructor in sentence (9) and abandons the claim.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (6) to give stronger evidence for the claim?`,
          choices: [
            no(`Many people think sign language is fascinating to watch.`, 'vague-evidence'),
            no(`Sign language uses the hands and face instead of the voice.`, 'restates-without-evidence'),
            ok(`In a survey of 150 seventh graders, 92 said they would sign up for the class if it were offered.`),
            no(`My friend learned to sign the whole alphabet in one afternoon.`, 'weak-anecdote'),
          ],
          solution: `The survey gives specific numbers showing that many students want the class. The story about one friend is a single example and does not show wide interest.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `What is the purpose of sentence (8) in the argument?`,
          choices: [
            no(`It states the writer's main claim for the first time.`, 'misidentifies-claim'),
            ok(`It admits that the opposing claim has some merit before the writer answers it.`),
            no(`It gives evidence about how sign language builds memory.`, 'confuses-evidence-location'),
            no(`It shows that the writer now agrees the class should not be offered.`, 'misreads-concession'),
          ],
          solution: `Sentence (8) concedes the cost concern is fair, and sentence (9) then answers it. The writer does not change position, since sentence (9) shows the cost problem can be solved.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which sentence, if added after sentence (4), would best connect that fact to the writer's claim?`,
          choices: [
            no(`The school for the deaf was founded more than eighty years ago.`, 'irrelevant-history'),
            no(`Deaf students study many of the same subjects we do, such as math.`, 'shifts-focus'),
            no(`Therefore, every student in Oakdale must be required to learn sign language.`, 'overstates-claim'),
            ok(`Students who learn to sign could talk with these neighbors directly instead of relying on written notes.`),
          ],
          solution: `The correct sentence explains why living near the deaf school makes the class valuable, which links the fact to the claim. Requiring every student to learn sign language goes beyond the writer's claim about an elective.`,
        },
      ],
    },
    {
      code: 'wg7-argument-writing-p07',
      title: 'Play First, Then Eat',
      body: `(1) At Birchwood Middle School, students eat lunch first and then go outside for recess. (2) Many students rush through their food so they can get outside sooner, and full trays often end up in the trash. (3) Birchwood should switch the schedule so that recess comes before lunch. (4) When students play first, they arrive at lunch hungry and calm instead of eager to leave. (5) A school in a nearby district tried this change and measured how much food was thrown away. (6) After one month, food waste dropped by about one third. (7) Teachers there also said students were more settled in afternoon classes.

(8) Opponents say that students would be too sweaty or tired to eat after playing. (9) ______ students could wash their hands and get water before entering the cafeteria, which would give them a few minutes to cool down. (10) Recess at our school is usually around twenty minutes long.

(11) Changing the order of recess and lunch would cost the school nothing.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence states the writer's claim?`,
          choices: [
            no(`sentence (1)`, 'background-as-claim'),
            no(`sentence (2)`, 'problem-as-claim'),
            ok(`sentence (3)`),
            no(`sentence (4)`, 'reason-as-claim'),
          ],
          solution: `Sentence (3) states the position the essay argues for: recess before lunch. Sentence (2) describes the problem that leads to the claim but does not say what should be done.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence (9)?`,
          choices: [
            no(`As a result,`, 'cause-effect-for-response'),
            ok(`To address this concern,`),
            no(`Similarly,`, 'similarity-for-response'),
            no(`For example,`, 'example-for-response'),
          ],
          solution: `Sentence (9) offers a solution to the opponents' worry in sentence (8), so "To address this concern" makes that relationship clear. "As a result" would wrongly suggest that washing hands is caused by students being sweaty.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Why should the writer delete sentence (10)?`,
          choices: [
            no(`It contradicts the writer's claim that recess should come first.`, 'misreads-relevance'),
            no(`It repeats the statistic about food waste from sentence (6).`, 'confuses-evidence-location'),
            ok(`It states a fact that neither supports the claim nor answers the opposing concern.`),
            no(`It uses slang that is too informal for an argument essay.`, 'misidentifies-style-problem'),
          ],
          solution: `The length of recess does not help show that recess should come first or that students could eat afterward. The sentence is formal and does not contradict the claim; it is simply off point.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `The writer wants to add a final sentence after sentence (11). Which sentence best concludes the argument?`,
          choices: [
            ok(`Since playing first could cut waste and help students settle down, Birchwood should try recess before lunch this year.`),
            no(`Food waste is a problem all over the world, and everyone should help reduce it.`, 'too-general'),
            no(`Students who do not enjoy recess could stay inside and read in the library.`, 'introduces-new-topic'),
            no(`Lunch first has worked for many years, so it may be best to leave it alone.`, 'contradicts-claim'),
          ],
          solution: `The correct sentence restates the claim and sums up the main benefits from the body paragraph. The sentence about world food waste is related but too broad to conclude this specific argument.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which statement best explains how sentences (5) and (6) support the claim in sentence (3)?`,
          choices: [
            no(`They prove that every school in the country should move recess before lunch.`, 'overgeneralization'),
            no(`They show that Birchwood students waste food because lunch is too short.`, 'unsupported-inference'),
            ok(`They show that a real school that made the same change threw away less food, which suggests Birchwood could too.`),
            no(`They present the opposing side's reason for keeping lunch before recess.`, 'misidentifies-counterclaim'),
          ],
          solution: `Sentences (5) and (6) report the results of the same change at another school, which supports trying it at Birchwood. One school's results cannot prove what every school in the country should do.`,
        },
      ],
    },
    {
      code: 'wg7-argument-writing-p08',
      title: 'Choosing the Class Trip',
      body: `(1) Every spring, the seventh graders at Greenfield Middle School vote on a class trip, and this year the choices are a planetarium and a water park. (2) The planetarium is a good place. (3) Our science units this year cover the solar system, gravity, and the phases of the moon. (4) The planetarium's dome show would let us see these ideas instead of just reading about them. (5) Its staff also offers a free workshop where students build and launch small air-powered rockets.

(6) Many students prefer the water park because it sounds more fun. (7) Fun matters, and a class trip should be enjoyable. (8) ______ the planetarium is fun too, since last year's class rated the rocket workshop the best part of their whole year. (9) The water park also costs 45 dollars per student, while the planetarium costs only 12 dollars.

(10) For these reasons, the planetarium is the better choice.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence (8)?`,
          choices: [
            no(`As a result,`, 'cause-effect-for-contrast'),
            no(`Likewise,`, 'similarity-for-contrast'),
            no(`For instance,`, 'example-for-contrast'),
            ok(`Even so,`),
          ],
          solution: `Sentence (7) grants that fun matters, and sentence (8) pushes back by showing the planetarium is fun too, so "Even so" fits. "As a result" is wrong because sentence (8) is not caused by sentence (7).`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which revision of sentence (2) states the claim most clearly and precisely?`,
          choices: [
            ok(`Our class should vote for the planetarium because it connects to our science lessons and costs less.`),
            no(`The planetarium is a building where people go to look at the stars.`, 'fact-not-claim'),
            no(`Both trips have good points and bad points for our class.`, 'no-position'),
            no(`I think the planetarium is way better, and that is obvious.`, 'keeps-informal-tone'),
          ],
          solution: `The correct revision takes a clear position and previews the reasons the essay develops. The informal choice takes a side but gives no reasons and uses casual wording.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `The writer wants to begin sentence (9) with a transition. Which choice best shows that the sentence gives another reason for the claim?`,
          choices: [
            no(`On the other hand,`, 'contrast-for-addition'),
            ok(`In addition,`),
            no(`Instead,`, 'replacement-for-addition'),
            no(`For instance,`, 'example-for-addition'),
          ],
          solution: `Sentence (9) adds the lower cost as another reason to choose the planetarium, so "In addition" fits. "On the other hand" would signal a point against the planetarium, which the sentence is not.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Which change would most improve sentence (10) as a conclusion?`,
          choices: [
            no(`Add a new argument that the bus ride to the planetarium is shorter.`, 'new-evidence-in-conclusion'),
            no(`Remove the claim so the ending sounds less forceful to readers.`, 'removes-claim'),
            ok(`Add a brief summary of the reasons: the link to science class, the hands-on workshop, and the lower cost.`),
            no(`Add that the class could choose the water park next year instead.`, 'weakens-claim'),
          ],
          solution: `A strong conclusion follows from the argument by pulling together the reasons already given. Adding a new point about the bus ride brings in an idea the essay never developed.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Why does including sentence (7) make the argument stronger rather than weaker?`,
          choices: [
            no(`It shows that the writer has decided the water park is the better trip.`, 'misreads-concession'),
            no(`It provides evidence comparing the cost of the two trips.`, 'confuses-evidence-location'),
            no(`It states the writer's claim for the first time in the essay.`, 'misidentifies-claim'),
            ok(`It treats the other side's view fairly, which makes the writer's response in sentence (8) more convincing.`),
          ],
          solution: `By admitting that fun matters, the writer shows fairness and then answers the point in sentence (8). The writer still supports the planetarium, so the concession does not mean a change of position.`,
        },
      ],
    },
  ],
}

export default skill
