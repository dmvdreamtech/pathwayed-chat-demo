import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g5-opinion-writing',
  subject: 'writing',
  grade: 5,
  group: 'Composition',
  name: 'Opinion Writing',
  standards: ['W.5.1'],
  passages: [
    {
      code: 'wg5-opinion-writing-p01',
      title: 'A Weather Station for Our School',
      body: `(1) Every morning, our class checks the weather on a tablet before recess. (2) I believe our school should build its own weather station on the roof of the gym. (3) First, a weather station would make science lessons more real. (4) Students could measure rainfall, wind speed, and temperature every day. (5) Specifically, our fifth grade weather unit asks us to graph data for two weeks. (6) Right now, we copy numbers from a website instead of collecting them ourselves.

(7) ______ a weather station would help the whole school stay safe. (8) The office could check the wind speed before deciding whether recess should be held outside. (9) Last spring, a strong gust knocked over the soccer goals while students were playing nearby. (10) My cousin lives in a town where it snows almost every winter.

(11) Some families may worry about the cost. (12) A basic weather station costs about the same as two new classroom rugs, and the parent club has already offered to help pay for it.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not support the opinion?`,
          choices: [
            no(`sentence (6)`, 'removes-supporting-detail'),
            no(`sentence (9)`, 'removes-supporting-detail'),
            ok(`sentence (10)`),
            no(`sentence (11)`, 'removes-opposing-idea'),
          ],
          solution: `Sentence (10) is about snow in a cousin's town, which has nothing to do with building a weather station at school. Sentence (9) should stay because it is a real event that supports the safety reason.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which linking words best fill the blank at the beginning of sentence (7)?`,
          choices: [
            no(`For example,`, 'example-for-new-reason'),
            no(`However,`, 'contrast-for-addition'),
            ok(`In addition,`),
            no(`Specifically,`, 'detail-signal-for-new-reason'),
          ],
          solution: `Sentence (7) begins a second reason, safety, after the science reason, so "In addition" fits. "For example" would signal an example of the science reason, but safety is a new reason.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which sentence states the writer's opinion?`,
          choices: [
            no(`sentence (1)`, 'confuses-fact-with-opinion'),
            ok(`sentence (2)`),
            no(`sentence (3)`, 'confuses-reason-with-opinion'),
            no(`sentence (8)`, 'confuses-detail-with-opinion'),
          ],
          solution: `Sentence (2) tells what the writer believes the school should do, and the whole draft supports it. Sentence (3) is the first reason for that opinion, not the opinion itself.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `The draft has no ending. Which sentence would make the best concluding statement?`,
          choices: [
            no(`Wind speed is measured with a small tool that spins in the breeze.`, 'off-topic-ending'),
            no(`Some students would still rather check the weather on a tablet.`, 'ends-with-opposing-idea'),
            no(`The parent club meets on the first Tuesday of every month.`, 'detail-not-conclusion'),
            ok(`A weather station would make science real and keep us safe, so our school should build one.`),
          ],
          solution: `The correct choice restates the opinion and sums up both reasons, science and safety. The sentence about the tablet ends on an opposing idea and weakens the argument instead of wrapping it up.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Why does the writer include sentence (9)?`,
          choices: [
            ok(`It gives a real event that shows why checking the wind could protect students.`),
            no(`It states the main opinion that the rest of the draft supports.`, 'confuses-detail-with-opinion'),
            no(`It answers the worry that families might have about the cost.`, 'misreads-purpose'),
            no(`It explains how students would graph data during the weather unit.`, 'wrong-reason-linked'),
          ],
          solution: `Sentence (9) describes soccer goals blowing over near students, a fact that supports the safety reason in sentence (7). The cost worry is answered later, in sentence (12), not in sentence (9).`,
        },
      ],
    },
    {
      code: 'wg5-opinion-writing-p02',
      title: 'A Trip to the Old Canal',
      body: `(1) Each year, the fifth grade takes a field trip to the city aquarium. (2) This year, we should visit the old canal and its lock house instead. (3) The canal connects directly to what we study in social studies. (4) In class, we are learning how goods moved from farms to cities before there were trains. (5) At the canal, guides show how mules pulled flat boats along a path beside the water. (6) Seeing the real locks fill with water would help us understand how boats climbed hills.

(7) The canal trip would also save money. (8) The canal park is only twenty minutes from school, while the aquarium is almost two hours away. (9) ______ the bus would cost less, and we would have more time to explore. (10) The lock house tour is free for school groups on weekdays.

(11) The aquarium is fun, but we already visited it when we were in third grade. (12) A canal trip would teach us something new.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence best states the writer's opinion?`,
          choices: [
            no(`sentence (1)`, 'confuses-fact-with-opinion'),
            no(`sentence (3)`, 'confuses-reason-with-opinion'),
            no(`sentence (5)`, 'confuses-detail-with-opinion'),
            ok(`sentence (2)`),
          ],
          solution: `Sentence (2) says what the writer thinks the class should do this year, which is the opinion. Sentence (3) is a reason that supports the canal trip, not the opinion itself.`,
        },
        {
          slot: 7,
          difficulty: 'medium',
          stem: `Which linking word best fills the blank at the beginning of sentence (9)?`,
          choices: [
            no(`However,`, 'contrast-for-result'),
            ok(`Consequently,`),
            no(`For example,`, 'example-for-result'),
            no(`First,`, 'sequence-for-result'),
          ],
          solution: `Sentence (9) tells what happens because the canal is so close, so "Consequently" shows cause and effect. "However" would signal a contrast, but sentence (9) agrees with sentence (8).`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence (5), would best support the reason in sentence (3)?`,
          choices: [
            no(`The aquarium has a large tank full of glowing jellyfish.`, 'supports-other-side'),
            ok(`Our social studies book has a whole chapter about canals and the goods they carried.`),
            no(`Mules are strong animals that can live for about thirty years.`, 'fact-not-linked-to-reason'),
            no(`The canal trip would be the greatest trip in the history of our school.`, 'unsupported-claim'),
          ],
          solution: `A whole chapter about canals is a fact that shows the trip connects to social studies, which is the reason in sentence (3). The fact about mules is true but does not show a link to what the class studies.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which sentence would be the strongest concluding statement to replace sentence (12)?`,
          choices: [
            no(`Long ago, workers dug canals by hand with shovels.`, 'off-topic-ending'),
            no(`The aquarium is also a great place to learn about fish.`, 'ends-with-opposing-idea'),
            ok(`Because the canal fits our lessons and costs less, it is the better choice for this year's trip.`),
            no(`Our class will vote on the field trip next Monday.`, 'detail-not-conclusion'),
          ],
          solution: `The correct choice restates the opinion and sums up both reasons, the link to lessons and the lower cost. Praising the aquarium would end the piece by supporting the other side.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `How does sentence (11) help the writer's argument?`,
          choices: [
            no(`It gives a second reason that the canal trip costs less money.`, 'misreads-purpose'),
            no(`It shows that the writer has changed opinions about the trip.`, 'misreads-counterclaim'),
            no(`It describes what students will see during the canal tour.`, 'confuses-purpose'),
            ok(`It admits the aquarium is fun but explains why it is not the best choice this year.`),
          ],
          solution: `Sentence (11) grants a point to the other side, then answers it by noting the class already visited the aquarium. The writer has not changed opinions, because sentence (12) still argues for the canal.`,
        },
      ],
    },
    {
      code: 'wg5-opinion-writing-p03',
      title: 'Shade Trees for the Playground',
      body: `(1) Our playground has a climbing dome, four swings, and almost no shade. (2) The school should plant a row of shade trees along the edge of the playground. (3) On hot days, the metal slide gets so warm that students cannot use it. (4) Last June, our class measured the blacktop with a thermometer, and it was much hotter than the grass under our only tree. (5) Trees would give students a cool place to rest and talk.

(6) Shade trees would also help the environment. (7) Trees give homes to birds and squirrels. (8) Their roots hold soil in place when heavy rain falls. (9) My favorite playground game is freeze tag.

(10) Some people say trees take too long to grow. (11) ______ a nursery near our town sells young trees that are already taller than a teacher. (12) Planting them now means students will have shade for many years.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence does not belong in this opinion piece?`,
          choices: [
            no(`sentence (4)`, 'removes-supporting-detail'),
            no(`sentence (7)`, 'removes-supporting-detail'),
            ok(`sentence (9)`),
            no(`sentence (10)`, 'removes-opposing-idea'),
          ],
          solution: `Sentence (9) names the writer's favorite game, which does not support planting trees. Sentence (10) should stay because the writer answers that worry in sentences (11) and (12).`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which linking word best fills the blank at the beginning of sentence (11)?`,
          choices: [
            ok(`However,`),
            no(`Consequently,`, 'cause-effect-for-contrast'),
            no(`In addition,`, 'addition-for-contrast'),
            no(`For example,`, 'example-for-contrast'),
          ],
          solution: `Sentence (11) argues against the worry in sentence (10), so the contrast word "However" fits. "In addition" would wrongly suggest that sentence (11) agrees with the worry.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which sentence gives a measured fact that supports the idea that the playground gets too hot?`,
          choices: [
            no(`sentence (2)`, 'confuses-opinion-with-evidence'),
            ok(`sentence (4)`),
            no(`sentence (8)`, 'wrong-reason-linked'),
            no(`sentence (12)`, 'confuses-conclusion-with-evidence'),
          ],
          solution: `Sentence (4) reports a thermometer reading that shows the blacktop is hotter than the shady grass. Sentence (2) is the opinion, so it cannot be the evidence that supports it.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which concluding statement would best end the draft after sentence (12)?`,
          choices: [
            no(`Squirrels can leap many times the length of their own bodies.`, 'off-topic-ending'),
            no(`Freeze tag is much more fun when the weather is cool.`, 'irrelevant-detail'),
            no(`Trees really do take many years to reach their full size.`, 'ends-with-opposing-idea'),
            ok(`Shade trees would keep students cool and help nature, so our school should plant them this year.`),
          ],
          solution: `The correct choice restates the opinion and both reasons, cooling and helping nature. Saying trees take many years to grow would bring back the worry the writer just answered.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence before sentence (3) to introduce the first reason. Which sentence works best?`,
          choices: [
            no(`Trees can live for more than one hundred years.`, 'fact-not-a-reason'),
            ok(`First, trees would protect students from the heat.`),
            no(`In conclusion, shade is important for everyone.`, 'misplaced-conclusion'),
            no(`Some students like to play in the bright sun.`, 'opposing-idea-as-topic'),
          ],
          solution: `Sentences (3) to (5) are all about heat, so a sentence naming heat as the first reason introduces them clearly. The fact about how long trees live is true but does not name the reason those sentences support.`,
        },
      ],
    },
    {
      code: 'wg5-opinion-writing-p04',
      title: 'Swimming Lessons in Gym Class',
      body: `(1) Our town has a public pool only three blocks from our school. (2) Every student should take swimming lessons during gym class at least once a year. (3) The most important reason is safety. (4) Knowing how to float and tread water can help a person stay calm after falling into a lake or pool. (5) Specifically, students would learn how to float on their backs and how to reach a friend with a pole instead of jumping in.

(6) Swimming is also great exercise. (7) It works the arms, legs, and heart all at the same time. (8) ______ students who have sore knees or ankles can still swim because the water supports their bodies. (9) The pool snack bar sells frozen fruit bars in the summer.

(10) Some students are nervous around deep water. (11) The lessons could start in the shallow end, where everyone can stand. (12) Every student deserves the chance to be safe and strong in the water.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not support the opinion?`,
          choices: [
            no(`sentence (5)`, 'removes-supporting-detail'),
            no(`sentence (7)`, 'removes-supporting-detail'),
            no(`sentence (11)`, 'removes-response-to-concern'),
            ok(`sentence (9)`),
          ],
          solution: `Sentence (9) is about snacks at the pool, which does not support swimming lessons. Sentence (11) should stay because it answers the worry about deep water in sentence (10).`,
        },
        {
          slot: 17,
          difficulty: 'medium',
          stem: `Which linking word best fills the blank at the beginning of sentence (8)?`,
          choices: [
            no(`However,`, 'contrast-for-addition'),
            ok(`Furthermore,`),
            no(`Consequently,`, 'cause-effect-for-addition'),
            no(`In conclusion,`, 'conclusion-signal-midparagraph'),
          ],
          solution: `Sentence (8) adds another point about exercise, so "Furthermore" fits. "Consequently" would mean sore knees are a result of sentence (7), which does not make sense.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Why does the writer use the words "The most important reason" in sentence (3)?`,
          choices: [
            ok(`to show that the reasons are ordered and that safety matters most`),
            no(`to state the writer's opinion for the very first time`, 'confuses-reason-with-opinion'),
            no(`to introduce a view that disagrees with the writer`, 'misreads-purpose'),
            no(`to signal that the opinion piece is about to end`, 'conclusion-signal-confusion'),
          ],
          solution: `The phrase tells readers that safety is the writer's strongest reason, which organizes the reasons in a logical order. The opinion was already stated in sentence (2), so sentence (3) is not introducing it.`,
        },
        {
          slot: 19,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (11), would best support it with a specific detail?`,
          choices: [
            no(`Deep water can feel scary to a lot of people.`, 'repeats-concern'),
            no(`The town pool was built more than forty years ago.`, 'fact-not-linked-to-reason'),
            ok(`The shallow end is three feet deep, and a teacher stands beside each swimmer.`),
            no(`Swimming is the most fun sport that anyone can learn.`, 'unsupported-claim'),
          ],
          solution: `The depth and the teacher beside each swimmer are specific details that show nervous students would feel safe. The sentence about deep water feeling scary only repeats the worry instead of answering it.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Which revision of sentence (12) makes the strongest concluding statement?`,
          choices: [
            no(`Every student deserves a chance to try the frozen fruit bars.`, 'off-topic-ending'),
            no(`Some students will never want to swim in deep water.`, 'ends-with-opposing-idea'),
            no(`Swimming lessons would happen at the public town pool.`, 'detail-not-conclusion'),
            ok(`Because swimming keeps students safe and healthy, every student should learn in gym class.`),
          ],
          solution: `The correct choice restates the opinion and sums up both reasons, safety and exercise. The sentence about deep water ends on the opposing worry and leaves the reader doubting the plan.`,
        },
      ],
    },
    {
      code: 'wg5-opinion-writing-p05',
      title: 'An Open Art Studio at Lunch',
      body: `(1) Our art teacher, Mr. Okafor, keeps the art room locked during lunch. (2) I think the art room should be open as a studio for students two days a week at lunch. (3) Students need more time to finish their projects. (4) In art class, we only have forty minutes, and clay projects often take three or four class periods. (5) ______ many students rush, and their sculptures crack before they are done.

(6) An open studio would also give quiet students a calm place to go. (7) The cafeteria is very loud, and some kids feel worn out by the end of lunch. (8) Drawing or painting quietly could help them feel ready for afternoon classes. (9) Mr. Okafor said he would be willing to supervise if a parent volunteer helps.

(10) Clay comes from the ground and is made of tiny bits of rock. (11) An open art studio would help students finish their work and feel calm, so our school should try it this spring.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which linking words best fill the blank at the beginning of sentence (5)?`,
          choices: [
            no(`For example,`, 'example-for-result'),
            ok(`As a result,`),
            no(`However,`, 'contrast-for-result'),
            no(`In addition,`, 'addition-for-result'),
          ],
          solution: `Students rush because class time is too short, so sentence (5) is a result of sentence (4) and "As a result" fits. "However" would signal a contrast, but sentence (5) follows from sentence (4).`,
        },
        {
          slot: 22,
          difficulty: 'easy',
          stem: `Which sentence does not belong in this opinion piece?`,
          choices: [
            no(`sentence (4)`, 'removes-supporting-detail'),
            no(`sentence (7)`, 'removes-supporting-detail'),
            ok(`sentence (10)`),
            no(`sentence (11)`, 'removes-conclusion'),
          ],
          solution: `Sentence (10) explains what clay is made of, which does not support opening the art room. Sentence (11) should stay because it is the concluding statement.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which sentence is the writer's concluding statement?`,
          choices: [
            no(`sentence (2)`, 'confuses-opinion-with-conclusion'),
            no(`sentence (6)`, 'confuses-reason-with-conclusion'),
            no(`sentence (9)`, 'detail-not-conclusion'),
            ok(`sentence (11)`),
          ],
          solution: `Sentence (11) comes at the end, restates the opinion, and sums up both reasons. Sentence (2) states the same opinion, but it introduces the piece rather than concluding it.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `What does sentence (9) add to the writer's argument?`,
          choices: [
            no(`It gives a reason why clay projects take a long time.`, 'wrong-reason-linked'),
            ok(`It shows the plan could work because an adult is willing to watch the room.`),
            no(`It explains why the cafeteria is too loud at lunch.`, 'misreads-purpose'),
            no(`It states a view the writer must argue against.`, 'misreads-counterclaim'),
          ],
          solution: `Sentence (9) shows that the art teacher would supervise, so the plan is practical. It does not disagree with the writer, so it is not an opposing view.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `The writer wants to add one more fact to support the reason in sentence (3). Which sentence is best?`,
          choices: [
            no(`Clay must be baked in a very hot oven called a kiln.`, 'fact-not-linked-to-reason'),
            no(`Many students in our class enjoy painting more than drawing.`, 'irrelevant-detail'),
            no(`Art is the most important subject in the whole school.`, 'unsupported-claim'),
            ok(`Last term, nine students in our class could not finish their clay bowls in time.`),
          ],
          solution: `Nine unfinished bowls is a specific fact that proves students need more time, the reason in sentence (3). The fact about the kiln is true but does not show that students run out of time.`,
        },
      ],
    },
    {
      code: 'wg5-opinion-writing-p06',
      title: 'Typing Lessons for Fifth Grade',
      body: `(1) Students in our school use laptops for reports, quizzes, and research. (2) However, no one ever teaches us how to type correctly. (3) Our school should add short typing lessons to fifth grade computer class. (4) Typing well saves time. (5) A student who types with all ten fingers can usually finish a page much faster than a student who uses two fingers. (6) Last month, my partner Priya typed our whole science report while I was still typing the title.

(7) Typing lessons would also help students do better on tests. (8) Many of our state tests are now taken on computers. (9) ______ students who type slowly may run out of time before they finish writing their answers. (10) Computers were once so large that they filled an entire room.

(11) Some teachers worry that typing lessons would take time away from other subjects. (12) The lessons could last only ten minutes at the start of each computer class.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not support the opinion?`,
          choices: [
            no(`sentence (6)`, 'removes-supporting-detail'),
            no(`sentence (8)`, 'removes-supporting-detail'),
            ok(`sentence (10)`),
            no(`sentence (12)`, 'removes-response-to-concern'),
          ],
          solution: `Sentence (10) is about the size of old computers, which does not support typing lessons. Sentence (12) should stay because it answers the teachers' worry in sentence (11).`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which linking word best fills the blank at the beginning of sentence (9)?`,
          choices: [
            ok(`Consequently,`),
            no(`In contrast,`, 'contrast-for-result'),
            no(`First,`, 'sequence-for-result'),
            no(`Meanwhile,`, 'time-for-result'),
          ],
          solution: `Because tests are taken on computers, slow typists may run out of time, so sentence (9) is a result and "Consequently" fits. "In contrast" would signal an opposite idea, but sentence (9) builds on sentence (8).`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which sentence states the writer's opinion?`,
          choices: [
            no(`sentence (1)`, 'confuses-fact-with-opinion'),
            no(`sentence (2)`, 'confuses-problem-with-opinion'),
            ok(`sentence (3)`),
            no(`sentence (4)`, 'confuses-reason-with-opinion'),
          ],
          solution: `Sentence (3) tells what the writer thinks the school should do, and every reason supports it. Sentence (2) describes the problem, but it does not say what should be done about it.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `The draft needs a concluding statement after sentence (12). Which sentence is best?`,
          choices: [
            no(`Priya is the fastest typist in our whole fifth grade class.`, 'detail-not-conclusion'),
            no(`Ten minutes is really not very long for a lesson.`, 'weakens-own-plan'),
            ok(`Typing lessons would save time and help on tests, so computer class should include them.`),
            no(`Old computers were much slower than the ones we use today.`, 'off-topic-ending'),
          ],
          solution: `The correct choice restates the opinion and sums up both reasons, saving time and helping on tests. The sentence about Priya is a single detail, so it does not wrap up the whole argument.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Sentence (5) uses the word "usually." Why is this a good choice in an opinion piece?`,
          choices: [
            no(`It shows the writer is not sure about the opinion in sentence (3).`, 'misreads-hedge-as-doubt'),
            ok(`It keeps the claim accurate, since not every ten-finger typist is faster.`),
            no(`It turns the detail into a conclusion for the whole draft.`, 'confuses-detail-with-conclusion'),
            no(`It links the reason to the teachers' worry in sentence (11).`, 'wrong-link'),
          ],
          solution: `"Usually" makes the claim true for most students without claiming it is true for everyone, which keeps the support believable. It does not mean the writer doubts the opinion, which is stated firmly in sentence (3).`,
        },
      ],
    },
    {
      code: 'wg5-opinion-writing-p07',
      title: 'Chores Are Good for Kids',
      body: `(1) In many homes, adults do most of the cooking, cleaning, and laundry. (2) Kids my age should have regular chores at home. (3) Chores teach responsibility. (4) When I feed our dog every morning, I know he depends on me. (5) If I forget, he waits by his empty bowl and whines.

(6) Chores also teach skills that kids will need later. (7) Specifically, sorting laundry, washing dishes, and making a grocery list are things every adult must know how to do. (8) My older brother Mateo said that his college roommate did not know how to wash his own clothes. (9) ______ the roommate turned all of his white socks pink.

(10) Some kids say they are too busy with homework and sports. (11) Most chores take only ten or fifteen minutes a day. (12) Dogs are loyal animals that make great pets.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence does not belong in this opinion piece?`,
          choices: [
            no(`sentence (5)`, 'removes-supporting-detail'),
            no(`sentence (8)`, 'removes-supporting-detail'),
            no(`sentence (10)`, 'removes-opposing-idea'),
            ok(`sentence (12)`),
          ],
          solution: `Sentence (12) praises dogs as pets, which does not support giving kids chores. Sentence (5) should stay because it shows why feeding the dog teaches responsibility.`,
        },
        {
          slot: 32,
          difficulty: 'easy',
          stem: `Which linking words best fill the blank at the beginning of sentence (9)?`,
          choices: [
            no(`In addition,`, 'addition-for-result'),
            ok(`As a result,`),
            no(`However,`, 'contrast-for-result'),
            no(`First of all,`, 'sequence-for-result'),
          ],
          solution: `The pink socks happened because the roommate did not know how to do laundry, so "As a result" shows the effect. "However" would signal a contrast, but sentence (9) follows from sentence (8).`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (3) to introduce the first reason more clearly?`,
          choices: [
            ok(`First, chores teach kids to be responsible for others.`),
            no(`Finally, chores teach kids about responsibility.`, 'wrong-order-signal'),
            no(`Dogs need to be fed at the same time every day.`, 'detail-as-topic'),
            no(`On the other hand, chores teach responsibility.`, 'contrast-for-reason'),
          ],
          solution: `Sentence (3) begins the first reason, so "First" signals the order clearly. "Finally" would wrongly tell readers this is the last reason, even though another reason follows in sentence (6).`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `How does sentence (11) help the writer's argument?`,
          choices: [
            no(`It gives an example of a skill kids will need as adults.`, 'wrong-reason-linked'),
            no(`It agrees that kids are too busy to do chores.`, 'misreads-counterclaim'),
            ok(`It answers sentence (10) by showing chores do not take much time.`),
            no(`It states the writer's opinion for the first time.`, 'confuses-reason-with-opinion'),
          ],
          solution: `Sentence (10) says kids are too busy, and sentence (11) answers that worry with a fact about how short chores are. It does not agree with the worry; it argues against it.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `After the writer removes the sentence that does not belong, which concluding statement would best end the draft?`,
          choices: [
            no(`Kids who play sports often have very busy afternoons.`, 'ends-with-opposing-idea'),
            no(`White socks can turn pink when washed with red clothes.`, 'detail-not-conclusion'),
            ok(`Since chores build responsibility and teach real skills, families should give kids jobs at home.`),
            no(`Chores are the only way for kids to learn anything useful.`, 'overstated-claim'),
          ],
          solution: `The correct choice restates the opinion and both reasons, responsibility and life skills. Saying chores are the only way to learn anything useful is an overstated claim that the draft does not support.`,
        },
      ],
    },
    {
      code: 'wg5-opinion-writing-p08',
      title: 'Turn Down the Lights',
      body: `(1) On a clear night in our town, you can see only a few stars. (2) Our town should turn off the bright lights at the sports fields and parking lots after ten o'clock at night. (3) First, darker skies would let people enjoy the stars again. (4) Last summer, my family visited a campground far from any city. (5) We saw thousands of stars stretched across the sky like a glittering river.

(6) ______ fewer lights would help wildlife. (7) Many birds fly at night and use the stars to find their way. (8) Bright lights can confuse them and pull them off course. (9) Baby sea turtles have a similar problem near beaches that are lit up at night.

(10) Some people think dark parking lots would be unsafe. (11) The town could keep a few dim lights on near sidewalks and doors. (12) Turning lights off after ten would also save the town money on its electric bill.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which linking words best fill the blank at the beginning of sentence (6)?`,
          choices: [
            no(`For example,`, 'example-for-new-reason'),
            no(`However,`, 'contrast-for-addition'),
            no(`As a result,`, 'cause-effect-for-addition'),
            ok(`In addition,`),
          ],
          solution: `Sentence (6) begins a second reason, helping wildlife, after the reason about stars, so "In addition" fits. "For example" would signal an example of the first reason, but wildlife is a new reason.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which sentence states the writer's opinion?`,
          choices: [
            no(`sentence (1)`, 'confuses-fact-with-opinion'),
            ok(`sentence (2)`),
            no(`sentence (3)`, 'confuses-reason-with-opinion'),
            no(`sentence (11)`, 'confuses-solution-with-opinion'),
          ],
          solution: `Sentence (2) tells what the writer thinks the town should do, and the reasons all support it. Sentence (11) suggests a way to handle a worry, but it is not the main opinion.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Why does the writer include sentences (4) and (5)?`,
          choices: [
            no(`to explain how bright lights confuse birds at night`, 'wrong-reason-linked'),
            no(`to answer the worry about unsafe parking lots`, 'misreads-purpose'),
            ok(`to give a real experience showing how many more stars dark skies reveal`),
            no(`to state the opinion that the whole piece supports`, 'confuses-detail-with-opinion'),
          ],
          solution: `Sentences (4) and (5) describe seeing thousands of stars far from city lights, which supports the reason in sentence (3). Birds are discussed later, in the second paragraph, not in these sentences.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Sentence (12) gives a new reason at the very end of the draft. What is the best way to revise it?`,
          choices: [
            no(`Delete it, because saving money has nothing to do with the opinion.`, 'misjudges-relevance'),
            ok(`Move it after sentence (9) as a new reason and add a fact about the cost.`),
            no(`Leave it at the end, because a new reason makes a strong ending.`, 'new-reason-as-conclusion'),
            no(`Move it before sentence (2) so that it becomes the opinion.`, 'confuses-reason-with-opinion'),
          ],
          solution: `Saving money does support turning off lights, so it belongs with the other reasons, backed by a fact, before the response to the worry. A concluding statement should sum up reasons, not introduce a new one.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Which sentence would make the best concluding statement for the draft?`,
          choices: [
            no(`Sea turtles hatch from eggs that are buried in the sand.`, 'off-topic-ending'),
            no(`Some parking lots may feel a little darker than before.`, 'ends-with-opposing-idea'),
            no(`Every town in the world must turn off all of its lights.`, 'overstated-claim'),
            ok(`Turning down the lights would bring back the stars and protect wildlife, so our town should do it.`),
          ],
          solution: `The correct choice restates the opinion and sums up the two main reasons, stars and wildlife. Saying every town must turn off all its lights goes far beyond the writer's actual opinion in sentence (2).`,
        },
      ],
    },
  ],
}

export default skill
