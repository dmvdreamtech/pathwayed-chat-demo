import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g4-opinion-writing',
  subject: 'writing',
  grade: 4,
  group: 'Composition',
  name: 'Opinion Writing',
  standards: ['W.4.1'],
  passages: [
    {
      code: 'wg4-opinion-writing-p01',
      title: 'Nature Walks at Recess',
      body: `(1) Every Friday, our class spends recess on the blacktop. (2) I think our school should take a short nature walk on the trail behind the field once a week instead. (3) Nature walks help students learn science outside the classroom. (4) For instance, last fall our class found three kinds of mushrooms and a nest made of mud. (5) We looked them up in our science books when we got back.

(6) ______ walking is good exercise. (7) A fifteen-minute walk gets everyone moving, even students who do not like ball games. (8) Our gym teacher, Ms. Abernathy, says that walking helps students feel calm and ready to learn. (9) My favorite color is green.

(10) Some people worry that students will get muddy on the trail. (11) Students could wear old sneakers on walk days.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not support the opinion?`,
          choices: [
            no(`sentence (5)`, 'removes-supporting-detail'),
            no(`sentence (8)`, 'removes-supporting-detail'),
            ok(`sentence (9)`),
            no(`sentence (10)`, 'removes-opposing-idea'),
          ],
          solution: `Sentence (9) is about the writer's favorite color, which has nothing to do with nature walks. Sentence (8) should stay because it supports the reason that walking is good for students.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which linking words best fill the blank at the beginning of sentence (6)?`,
          choices: [
            no(`For instance,`, 'example-for-new-reason'),
            ok(`In addition,`),
            no(`Instead,`, 'contrast-for-addition'),
            no(`As a result,`, 'cause-effect-for-addition'),
          ],
          solution: `Sentence (6) gives a second reason after the science reason, so "In addition" fits. "For instance" would signal an example of the science reason, but walking as exercise is a new reason.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which sentence states the writer's opinion?`,
          choices: [
            no(`sentence (1)`, 'confuses-fact-with-opinion'),
            ok(`sentence (2)`),
            no(`sentence (3)`, 'confuses-reason-with-opinion'),
            no(`sentence (7)`, 'confuses-detail-with-opinion'),
          ],
          solution: `Sentence (2) tells what the writer thinks the school should do, which is the opinion the whole piece supports. Sentence (3) is a reason that supports that opinion, not the opinion itself.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `The draft has no ending. Which sentence would make the best concluding statement?`,
          choices: [
            no(`Mushrooms grow in many shapes, sizes, and colors.`, 'off-topic-ending'),
            no(`Some students like playing on the blacktop better than walking.`, 'ends-with-opposing-idea'),
            ok(`A weekly nature walk would help us learn science and stay active, so our school should try it.`),
            no(`Ms. Abernathy teaches gym on Mondays and Wednesdays every week.`, 'detail-not-conclusion'),
          ],
          solution: `The correct choice repeats the opinion and sums up both reasons, science and exercise. Ending with students who prefer the blacktop would weaken the opinion instead of wrapping it up.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (11), would best answer the worry in sentence (10)?`,
          choices: [
            no(`Mud is made of soil and water mixed together.`, 'fact-not-linked-to-reason'),
            ok(`The trail also has a wooden walkway over its muddiest spot.`),
            no(`Some students really do not like getting muddy at all.`, 'repeats-concern'),
            no(`Nature walks are the best idea any school has ever had.`, 'unsupported-claim'),
          ],
          solution: `A wooden walkway over the muddy spot is a detail that shows students can stay mostly clean, so it answers the worry. The sentence about students not liking mud only repeats the worry instead of answering it.`,
        },
      ],
    },
    {
      code: 'wg4-opinion-writing-p02',
      title: 'A Chess Club for Kids',
      body: `(1) Our town library has books, computers, and a big table that sits empty after school. (2) The library should start a weekly chess club for kids. (3) Chess helps kids practice thinking ahead. (4) Each player has to plan several moves before touching a piece. (5) Planning ahead is a skill students also use in math.

(6) A chess club would also help kids make new friends. (7) Players from different schools could meet and learn from each other. (8) My neighbor Tomas joined a chess club in another town, and now Tomas plays with kids from three schools. (9) ______ the club would be cheap to run. (10) Volunteers from town could teach the games for free.

(11) Chess is fun, and it makes kids smarter. (12) The library also has some old maps hanging on the wall.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence does not belong in this opinion piece?`,
          choices: [
            no(`sentence (4)`, 'removes-supporting-detail'),
            no(`sentence (7)`, 'removes-supporting-detail'),
            no(`sentence (10)`, 'removes-supporting-detail'),
            ok(`sentence (12)`),
          ],
          solution: `Sentence (12) is about maps on the library wall, which does not support starting a chess club. Sentence (10) belongs because it explains why the club would be cheap to run.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which linking words best fill the blank at the beginning of sentence (9)?`,
          choices: [
            ok(`On top of that,`),
            no(`For example,`, 'example-for-new-reason'),
            no(`However,`, 'contrast-for-addition'),
            no(`A long time ago,`, 'time-word-for-addition'),
          ],
          solution: `Sentence (9) adds one more reason for the club, so "On top of that" links it to the reasons before it. "However" would wrongly signal that sentence (9) argues against the club.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `The writer wants to add a fact to support the reason in sentence (9). Which sentence would work best?`,
          choices: [
            no(`Chess pieces can be made of wood, plastic, or stone.`, 'related-but-not-supporting'),
            no(`Some kids would rather play soccer after school.`, 'off-topic-evidence'),
            ok(`The library already owns six chess sets that sit in a closet.`),
            no(`Chess is a very old game that people still enjoy.`, 'related-but-not-supporting'),
          ],
          solution: `If the library already owns six chess sets, it will not need to buy much, which shows the club would be cheap. The fact about what chess pieces are made of is about chess but says nothing about cost.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `What does sentence (8) add to the piece?`,
          choices: [
            no(`It states the writer's opinion about the library.`, 'confuses-detail-with-opinion'),
            ok(`It gives a real example that supports the reason in sentence (6).`),
            no(`It gives a reason why the library should not start a club.`, 'misreads-purpose'),
            no(`It sums up all of the writer's reasons at the end.`, 'confuses-detail-with-conclusion'),
          ],
          solution: `Tomas made friends from three schools through chess, which is an example of the reason in sentence (6) that a club helps kids make new friends. It does not state the opinion, which is in sentence (2).`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence (11) as the concluding statement?`,
          choices: [
            no(`Chess is the most fun game in the world, and everyone agrees.`, 'overgeneralization'),
            no(`Some people think checkers is easier to learn than chess is.`, 'new-topic-in-conclusion'),
            no(`Tomas plays chess every Saturday morning with friends from the club.`, 'detail-not-conclusion'),
            ok(`A chess club would help kids think ahead and make friends, and it would cost very little.`),
          ],
          solution: `The correct choice sums up all three reasons from the piece: thinking ahead, making friends, and low cost. Sentence (11) and the "everyone agrees" choice make big claims the piece never supports.`,
        },
      ],
    },
    {
      code: 'wg4-opinion-writing-p03',
      title: 'Band in Fourth Grade',
      body: `(1) At Cedar Hill Elementary, students cannot join the school band until fifth grade. (2) ______ (3) Learning an instrument teaches patience. (4) A student has to practice the same notes many times before a song sounds right. (5) Music also helps with math. (6) For instance, students count beats and split notes into halves and quarters. (7) Our music teacher, Mr. Delgado, says that young students often learn to read music quickly.

(8) Some families worry that instruments cost too much money. (9) The school could lend instruments to students who need them. (10) In fact, twenty violins are sitting in the music room closet right now.

(11) Last summer I went to the beach with my aunt. (12) Starting band in fourth grade would be fun.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence best fills the blank in sentence (2) to state the writer's opinion?`,
          choices: [
            no(`The school band played three songs at the spring concert.`, 'fact-not-opinion'),
            ok(`I think fourth graders should be allowed to join the band.`),
            no(`Some students at our school play the piano at home.`, 'fact-not-opinion'),
            no(`A band is a group of people who play instruments together.`, 'definition-not-opinion'),
          ],
          solution: `The correct choice tells what the writer believes should happen, and the rest of the piece gives reasons for it. The other choices are facts or a definition, not opinions.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove?`,
          choices: [
            no(`sentence (4)`, 'removes-supporting-detail'),
            no(`sentence (8)`, 'removes-opposing-idea'),
            ok(`sentence (11)`),
            no(`sentence (10)`, 'removes-supporting-detail'),
          ],
          solution: `Sentence (11) is about a beach trip, which has nothing to do with joining band. Sentence (8) should stay because the writer answers that worry in sentences (9) and (10).`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which sentence gives a detail that supports the reason in sentence (5)?`,
          choices: [
            no(`sentence (3)`, 'confuses-reason-with-detail'),
            ok(`sentence (6)`),
            no(`sentence (9)`, 'mismatched-support'),
            no(`sentence (1)`, 'mismatched-support'),
          ],
          solution: `Sentence (5) says music helps with math, and sentence (6) shows how: counting beats and splitting notes into halves and quarters. Sentence (3) is a different reason about patience.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Why does the writer include sentence (10)?`,
          choices: [
            ok(`to give a fact showing the school really could lend instruments`),
            no(`to state the writer's opinion about the school band`, 'confuses-detail-with-opinion'),
            no(`to argue that the violin is the best instrument to learn`, 'misreads-purpose'),
            no(`to show that families should buy their own instruments`, 'misreads-purpose'),
          ],
          solution: `Sentence (10) backs up sentence (9) with a fact: twenty violins are already in the closet, so the school has instruments to lend. It does not say the violin is the best instrument.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence (12) as the concluding statement?`,
          choices: [
            no(`Starting band in fourth grade would be really, really fun for us.`, 'too-vague'),
            no(`Some fifth graders in the band already play very well.`, 'detail-not-conclusion'),
            ok(`Because music teaches patience and helps with math, fourth graders should be able to join band.`),
            no(`Every family should buy an instrument for their child right away.`, 'new-claim-in-conclusion'),
          ],
          solution: `The correct choice restates the opinion and links it to the two reasons the writer gave. Sentence (12) and the "really, really fun" choice only say band is fun, which is not a reason the piece supports.`,
        },
      ],
    },
    {
      code: 'wg4-opinion-writing-p04',
      title: 'Shade Trees for the Playground',
      body: `(1) On sunny days, the slide on our playground gets too hot to touch. (2) Our school should plant shade trees around the playground. (3) Trees would keep students cooler during recess. (4) The shade under a large tree can feel much cooler than a sunny spot. (5) ______ trees would make the playground safer. (6) Students would not burn their hands on hot metal.

(7) Trees also give homes to birds and squirrels. (8) Our class could watch them and keep a nature journal. (9) Some people say trees take too long to grow. (10) It is true that small trees need a few years to get big. (11) Still, the trees we plant now will help students for many years. (12) I like the color of maple leaves in the fall.

(13) Planting shade trees would keep our playground cool, safe, and full of life. (14) Let's ask the principal to plant trees this spring.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence should the writer take out because it does not support the opinion?`,
          choices: [
            no(`sentence (6)`, 'removes-supporting-detail'),
            no(`sentence (8)`, 'removes-supporting-detail'),
            no(`sentence (10)`, 'removes-opposing-idea'),
            ok(`sentence (12)`),
          ],
          solution: `Sentence (12) only tells what leaf color the writer likes, which is not a reason to plant shade trees. Sentence (10) stays because it admits a fair point before the writer answers it in sentence (11).`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which sentence states the writer's opinion?`,
          choices: [
            no(`sentence (1)`, 'confuses-fact-with-opinion'),
            ok(`sentence (2)`),
            no(`sentence (4)`, 'confuses-detail-with-opinion'),
            no(`sentence (10)`, 'confuses-opposing-idea-with-opinion'),
          ],
          solution: `Sentence (2) tells what the writer thinks the school should do. Sentence (1) describes the problem that leads into the opinion but does not say what should be done.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which linking word best fills the blank at the beginning of sentence (5)?`,
          choices: [
            no(`Instead,`, 'contrast-for-addition'),
            no(`For example,`, 'example-for-new-reason'),
            ok(`Also,`),
            no(`Even so,`, 'contrast-for-addition'),
          ],
          solution: `Sentence (5) adds a new reason, safety, after the reason about staying cool, so "Also" fits. "For example" does not fit because safety is a separate reason, not an example of shade feeling cooler.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which fact would best support sentence (4)?`,
          choices: [
            ok(`One hot day, a thermometer in the sun read 95 degrees, but one in a tree's shade read 82.`),
            no(`Maple trees have leaves that are shaped a little like a hand.`, 'related-but-not-supporting'),
            no(`Some students like to play tag out in the sun the most.`, 'off-topic-evidence'),
            no(`Every tree needs water, soil, and sunlight in order to grow.`, 'related-but-not-supporting'),
          ],
          solution: `The thermometer readings show with numbers that shade is cooler, which is exactly what sentence (4) claims. The fact that trees need water is true but does not show anything about shade being cooler.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Why does the writer include sentence (10)?`,
          choices: [
            no(`to show that the writer no longer wants to plant trees`, 'mistakes-opposing-idea-for-opinion'),
            no(`to give another reason that trees help the playground`, 'misreads-purpose'),
            ok(`to admit part of the worry is true before answering it in sentence (11)`),
            no(`to end the piece by summing up the writer's reasons`, 'confuses-detail-with-conclusion'),
          ],
          solution: `Sentence (10) agrees that small trees take years to grow, and sentence (11) then explains why planting them is still worth it. The writer has not changed sides, as sentences (13) and (14) show.`,
        },
      ],
    },
    {
      code: 'wg4-opinion-writing-p05',
      title: 'Walk to School Day',
      body: `(1) Many students at Brookside School ride in cars, even when they live only a few blocks away. (2) ______ (3) First, walking is healthy. (4) Doctors say children need about an hour of exercise every day, and a walk to school is a good start.

(5) Second, fewer cars would make the air cleaner around our school. (6) In order to keep everyone safe, parent helpers could stand at each corner on walk days. (7) Walking also gives friends time to talk before class. (8) Students who walk together often arrive at school laughing and in a good mood.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence best fills the blank in sentence (2) to state the opinion?`,
          choices: [
            no(`Brookside School is three blocks away from the town park.`, 'fact-not-opinion'),
            no(`Some students at our school ride the bus every morning.`, 'fact-not-opinion'),
            ok(`Our school should hold a Walk to School Day once a month.`),
            no(`Walking means moving from place to place on your feet.`, 'definition-not-opinion'),
          ],
          solution: `The correct choice tells what the writer thinks the school should do, and sentences (3) through (8) support it. The other choices are facts or a definition that the reasons do not support.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which linking words does the writer use to show the order of the first two reasons?`,
          choices: [
            ok(`First and Second`),
            no(`In order to`, 'purpose-words-for-order'),
            no(`even when`, 'misidentifies-linking-words'),
            no(`also and together`, 'misidentifies-linking-words'),
          ],
          solution: `"First" begins sentence (3) and "Second" begins sentence (5), which shows the order of the two reasons. "In order to" in sentence (6) tells a purpose, not the order of reasons.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which fact would best support the reason in sentence (5)?`,
          choices: [
            no(`Walking shoes come in many different sizes and colors.`, 'off-topic-evidence'),
            ok(`Each morning, about eighty cars wait in our drop-off line with engines running.`),
            no(`Some students live too far away to walk to school at all.`, 'opposing-idea-not-support'),
            no(`Clean air is a really nice thing for everyone to have.`, 'vague-restatement'),
          ],
          solution: `Eighty cars running their engines near the school shows that cars add to dirty air there, so fewer cars would help. "Clean air is a really nice thing" only repeats the idea without giving a fact.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `What is the job of sentence (4) in this piece?`,
          choices: [
            no(`It states the writer's main opinion about walking.`, 'confuses-detail-with-opinion'),
            no(`It gives an idea that argues against walking to school.`, 'misreads-purpose'),
            no(`It sums up the reasons as a concluding statement.`, 'confuses-detail-with-conclusion'),
            ok(`It gives a fact that supports the reason that walking is healthy.`),
          ],
          solution: `Sentence (4) tells how much exercise doctors say children need, which backs up the reason in sentence (3) that walking is healthy. It is a supporting fact, not the opinion or the conclusion.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `The draft has no ending. Which sentence would make the best concluding statement?`,
          choices: [
            no(`Students who walk together are the happiest kids in the whole town.`, 'overgeneralization'),
            ok(`A monthly Walk to School Day would keep us healthy, clean our air, and bring friends together.`),
            no(`Some students will still need rides, and that is perfectly fine.`, 'new-idea-in-conclusion'),
            no(`Walking is the only good way for anyone to get to school.`, 'changes-the-opinion'),
          ],
          solution: `The correct choice restates the opinion and sums up the three reasons from the piece. "The only good way" changes the opinion from a monthly walk day into a much bigger claim the writer never supports.`,
        },
      ],
    },
    {
      code: 'wg4-opinion-writing-p06',
      title: 'Swimming in Gym Class',
      body: `(1) Our town has a lake, two rivers, and a public pool. (2) I believe every fourth grader should take swimming lessons during gym class. (3) Knowing how to swim helps kids stay safe near water. (4) Swimmers learn how to float and how to reach the edge of a pool. (5) Swimming is also great exercise. (6) It works the arms, the legs, and the heart all at the same time.

(7) The town pool is only a short bus ride from our school. (8) Some kids already took lessons, but many families cannot pay for them. (9) ______ lessons at school would give every student a fair chance to learn. (10) My older brother likes jumping off the diving board.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not support the opinion?`,
          choices: [
            no(`sentence (4)`, 'removes-supporting-detail'),
            no(`sentence (7)`, 'removes-supporting-detail'),
            no(`sentence (8)`, 'removes-supporting-detail'),
            ok(`sentence (10)`),
          ],
          solution: `Sentence (10) tells what the writer's brother likes, which is not a reason for lessons in gym class. Sentence (7) stays because it shows the pool is close enough for the school to use.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which linking words best fill the blank at the beginning of sentence (9)?`,
          choices: [
            no(`For instance,`, 'example-for-result'),
            ok(`For this reason,`),
            no(`On the other hand,`, 'contrast-for-result'),
            no(`Before that,`, 'time-word-for-result'),
          ],
          solution: `Sentence (8) explains that many families cannot pay, and sentence (9) tells what follows from that, so "For this reason" links them. "On the other hand" would wrongly signal an opposite idea.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which detail would best support the reason in sentence (3)?`,
          choices: [
            no(`The town pool has a blue slide and a snack stand.`, 'off-topic-evidence'),
            no(`Some people can swim much faster than others can.`, 'related-but-not-supporting'),
            ok(`Town lifeguards say kids who can swim are much less likely to get hurt in water.`),
            no(`Swimming is a fun thing to do on hot summer days.`, 'opinion-not-evidence'),
          ],
          solution: `What the lifeguards say connects knowing how to swim with staying safe, which is the reason in sentence (3). Saying swimming is fun is another opinion, not a detail about safety.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `What is the job of sentence (1)?`,
          choices: [
            ok(`It introduces the topic by showing there is a lot of water in town.`),
            no(`It states the writer's opinion about swimming lessons.`, 'confuses-introduction-with-opinion'),
            no(`It sums up the writer's reasons at the end.`, 'confuses-introduction-with-conclusion'),
            no(`It gives a reason why swimming is good exercise.`, 'mismatched-support'),
          ],
          solution: `Sentence (1) sets up the topic: with a lake, rivers, and a pool nearby, swimming matters in this town. The opinion itself comes next, in sentence (2).`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `The draft has no ending. Which sentence would make the best concluding statement?`,
          choices: [
            no(`My brother wants to try the high diving board next summer.`, 'detail-not-conclusion'),
            no(`Swimming lessons matter more than reading or math lessons do.`, 'new-claim-in-conclusion'),
            no(`The public pool opens at nine o'clock every morning.`, 'off-topic-ending'),
            ok(`Lessons in gym class would keep kids safe, keep them fit, and be fair to every family.`),
          ],
          solution: `The correct choice ties together the safety, exercise, and fairness reasons. Saying swimming matters more than reading adds a new claim the piece never supports.`,
        },
      ],
    },
    {
      code: 'wg4-opinion-writing-p07',
      title: 'A Weather Station in Every Class',
      body: `(1) Right now, our class checks the weather on the computer each morning. (2) Every classroom at Riverside School should have its own small weather station. (3) A weather station has tools like a thermometer, a rain gauge, and a wind vane.

(4) Students would learn science by reading these tools. (5) For instance, they could measure how much rain fell overnight. (6) Students could also practice math. (7) They could make graphs of the temperature each day and compare the weeks. (8) The weather was cloudy and gray yesterday. (9) In addition, weather stations make learning feel real. (10) Kids care more about facts they collect with their own hands.`,
      items: [
        {
          slot: 31,
          difficulty: 'medium',
          stem: `Which sentence is not needed to support the opinion?`,
          choices: [
            no(`sentence (3)`, 'removes-needed-explanation'),
            no(`sentence (5)`, 'removes-supporting-detail'),
            ok(`sentence (8)`),
            no(`sentence (10)`, 'removes-supporting-detail'),
          ],
          solution: `Sentence (8) mentions the weather but gives no reason for a classroom weather station, so it can go. Sentence (3) stays because it explains what a weather station is.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which reason does sentence (7) support?`,
          choices: [
            no(`Every classroom should have its own weather station.`, 'confuses-reason-with-opinion'),
            no(`Students would learn science by reading the tools.`, 'mismatched-support'),
            ok(`Students could also practice math.`),
            no(`Kids care more about facts they collect themselves.`, 'mismatched-support'),
          ],
          solution: `Making graphs and comparing weeks are math skills, so sentence (7) supports the reason in sentence (6). It is not about reading science tools, which sentence (5) supports.`,
        },
        {
          slot: 33,
          difficulty: 'hard',
          stem: `Which detail would best support sentence (10)?`,
          choices: [
            ok(`When Ms. Patel's class measured rain, students rushed to check the gauge every morning.`),
            no(`Rain gauges are often made of clear plastic with lines on the side.`, 'related-but-not-supporting'),
            no(`Some kids like math class more than they like science class.`, 'off-topic-evidence'),
            no(`Facts are pieces of information that can be shown to be true.`, 'definition-not-evidence'),
          ],
          solution: `Students rushing to check their own rain gauge shows that kids care about facts they collect themselves. The detail about clear plastic describes the tool but says nothing about how kids feel.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `What is the most important part missing from this draft?`,
          choices: [
            no(`a sentence that states the writer's opinion`, 'misses-existing-opinion'),
            no(`linking words that connect the reasons`, 'misses-existing-linking-words'),
            ok(`a concluding statement that sums up the opinion`),
            no(`reasons that are backed up by details`, 'misses-existing-support'),
          ],
          solution: `The draft ends with a detail in sentence (10) and never wraps up the opinion, so it needs a concluding statement. It already states the opinion in sentence (2) and uses linking words like "For instance" and "In addition."`,
        },
        {
          slot: 35,
          difficulty: 'easy',
          stem: `Which linking words in sentence (5) tell the reader that an example is coming?`,
          choices: [
            no(`how much`, 'misidentifies-linking-words'),
            ok(`For instance`),
            no(`fell overnight`, 'misidentifies-linking-words'),
            no(`could measure`, 'misidentifies-linking-words'),
          ],
          solution: `"For instance" tells the reader that sentence (5) gives an example of how students would learn science. The other choices are just parts of the sentence that do not link ideas.`,
        },
      ],
    },
    {
      code: 'wg4-opinion-writing-p08',
      title: 'Our Trip to the Train Depot',
      body: `(1) Our class gets to choose one field trip this year. (2) We should visit the old train depot museum in town. (3) The depot would help us learn local history. (4) More than one hundred years ago, trains brought mail, food, and visitors to our town through that station. (5) The museum has old tickets, lanterns, and a real conductor's hat.

(6) ______ the trip would be easy to plan. (7) The depot is only ten minutes from school by bus. (8) Entry is free for school groups on Tuesdays. (9) The aquarium is fun too, but it is a two-hour ride away.

(10) The depot museum would teach us about our town's past, and it would be simple to visit. (11) That is why our class should pick the train depot.`,
      items: [
        {
          slot: 36,
          difficulty: 'medium',
          stem: `Which sentence gives a fact that supports the reason in sentence (6)?`,
          choices: [
            no(`sentence (1)`, 'mismatched-support'),
            no(`sentence (4)`, 'mismatched-support'),
            no(`sentence (5)`, 'mismatched-support'),
            ok(`sentence (8)`),
          ],
          solution: `Free entry for school groups makes the trip easier to plan, which supports sentence (6). Sentences (4) and (5) support a different reason, that the depot teaches local history.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which linking words best fill the blank at the beginning of sentence (6)?`,
          choices: [
            no(`For example,`, 'example-for-new-reason'),
            no(`Long ago,`, 'time-word-for-addition'),
            ok(`Another reason is that`),
            no(`Instead,`, 'contrast-for-addition'),
          ],
          solution: `Sentence (6) begins a second reason after the history reason, so "Another reason is that" links them. "Long ago" would make sense in sentence (4), but the trip being easy to plan is about now.`,
        },
        {
          slot: 38,
          difficulty: 'hard',
          stem: `Why does the writer include sentence (9)?`,
          choices: [
            ok(`to compare the depot with another choice and show the depot is much closer`),
            no(`to show that the writer would now rather go to the aquarium`, 'mistakes-comparison-for-opinion'),
            no(`because it is an extra detail with nothing to do with the opinion`, 'misses-comparison-purpose'),
            no(`to give another fact about the history of the town`, 'misreads-purpose'),
          ],
          solution: `Sentence (9) points out that the aquarium is two hours away, which makes the ten-minute depot trip look easier. The writer does not switch to the aquarium, since sentence (11) still picks the depot.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (5), would best explain how the museum objects help students learn history?`,
          choices: [
            no(`Lanterns can shine very brightly on a dark night.`, 'related-but-not-supporting'),
            no(`Trains today are much faster than the old trains were.`, 'off-topic-evidence'),
            ok(`Seeing real objects from long ago helps us picture how people traveled.`),
            no(`The museum gift shop sells small toy trains and books.`, 'off-topic-evidence'),
          ],
          solution: `The correct choice links the objects in sentence (5) back to the reason in sentence (3) by explaining what students would learn from them. The sentence about bright lanterns describes an object but does not connect it to learning history.`,
        },
        {
          slot: 40,
          difficulty: 'easy',
          stem: `Which sentence states the writer's opinion near the beginning of the piece?`,
          choices: [
            no(`sentence (1)`, 'confuses-fact-with-opinion'),
            ok(`sentence (2)`),
            no(`sentence (4)`, 'confuses-detail-with-opinion'),
            no(`sentence (7)`, 'confuses-detail-with-opinion'),
          ],
          solution: `Sentence (2) tells which trip the writer thinks the class should take. Sentence (1) only explains that the class gets to choose a trip.`,
        },
      ],
    },
  ],
}

export default skill
