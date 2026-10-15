import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g7-narrative-writing',
  subject: 'writing',
  grade: 7,
  group: 'Composition',
  name: 'Narrative Writing',
  standards: ['W.7.3'],
  passages: [
    {
      code: 'wg7-narrative-writing-p01',
      title: 'The Pizza Box Oven',
      body: `(1) Our science teacher, Ms. Adeyemi, gave every pair of students the same challenge: build an oven that could melt chocolate using only sunlight. (2) My partner Tomas and I lined a pizza box with foil and taped plastic wrap over a window in the lid. (3) We set our oven on the blacktop at ten o'clock and placed a square of chocolate inside. (4) Then we waited. (5) After twenty minutes, the chocolate looked exactly the same. (6) Tomas poked the plastic wrap and sighed. (7) Other groups were already cheering as their chocolate turned glossy and soft. (8) Chocolate is made from the seeds of the cacao tree. (9) I knelt down beside our box and noticed that its shadow stretched out to the left. (10) The sun had moved, and our foil flap was no longer catching the light.

(11) "We have to aim it again," I said. (12) We tilted the box and propped the flap with a ruler so the foil reflected sunlight straight through the window. (13) Every few minutes we checked the shadow and turned the box a little more. (14) Just before the bell, Tomas lifted the lid. (15) The chocolate had slumped into a shiny puddle.

(16) The experiment was over.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not fit the events of the narrative?`,
          choices: [
            no(`sentence 3`, 'removes-key-event'),
            no(`sentence 7`, 'removes-key-detail'),
            ok(`sentence 8`),
            no(`sentence 10`, 'removes-turning-point'),
          ],
          solution: `Sentence 8 is a fact about where chocolate comes from, and it interrupts the moment when the narrator figures out the problem. Sentence 10 must stay because it explains why the oven was not working.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `The writer wants to add dialogue after sentence 6 to show that Tomas is frustrated. Which sentence does this best?`,
          choices: [
            ok(`"Everyone else's chocolate is melting," he muttered. "Ours isn't even warm."`),
            no(`Tomas told me that he was frustrated with how our oven was working.`, 'summary-not-dialogue'),
            no(`"This is the best science project ever," Tomas said with a grin.`, 'dialogue-off-mood'),
            no(`"Your chocolate looks great," Tomas called to another group happily.`, 'dialogue-off-focus'),
          ],
          solution: `The first choice uses Tomas's own words to compare their oven with the others, which shows his frustration. The second choice only reports his feeling, so it is a summary rather than dialogue.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 13 to show how time passes?`,
          choices: [
            no(`On the other hand,`, 'contrast-not-time'),
            ok(`For the rest of the class period,`),
            no(`As an example of this,`, 'example-not-time'),
            no(`In addition to the oven,`, 'addition-not-time'),
          ],
          solution: `"For the rest of the class period" tells the reader how long the students kept adjusting the box. "On the other hand" signals a contrast, but checking the shadow does not contrast with tilting the box.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 16 as a conclusion that reflects on the experience?`,
          choices: [
            no(`Solar ovens can be built from many different kinds of boxes and materials.`, 'generic-fact-ending'),
            no(`After that, we threw the box away and walked back inside for lunch.`, 'flat-ending-no-reflection'),
            ok(`Our oven melted the chocolate last, but we were the only pair who learned to follow the sun.`),
            no(`Tomas and I built an oven from a pizza box, some foil, and plastic wrap.`, 'restates-situation'),
          ],
          solution: `The correct choice gives the result and shows what the narrator learned from turning the box, which ties back to sentences 9 through 13. The choice about walking inside ends the story without any reflection.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Which revision of sentence 7 best shows the narrator's feelings while keeping the first-person point of view?`,
          choices: [
            no(`Tomas secretly wished that he had chosen a different partner for the project.`, 'shifts-point-of-view'),
            ok(`Across the blacktop, other groups were already cheering, and my face grew hot.`),
            no(`You could hear the other groups cheering as their chocolate started to melt.`, 'shifts-to-second-person'),
            no(`Other groups cheered, and the narrator watched their chocolate turn soft.`, 'shifts-to-third-person'),
          ],
          solution: `The correct choice stays in the narrator's "I" voice and shows embarrassment through a physical detail. The choice about Tomas's secret wish is tempting, but a first-person narrator cannot know another character's hidden thoughts.`,
        },
      ],
    },
    {
      code: 'wg7-narrative-writing-p02',
      title: 'A Room Full of Wires',
      body: `(1) For our history project, each student had to interview an older relative about a job from the past. (2) I chose my grandmother, Nana Rose, because she always said her first job was "a room full of wires." (3) On Saturday afternoon, I sat across from her at the kitchen table with my notebook open. (4) She pulled out a black-and-white photograph of a long row of women wearing headsets. (5) "That was the telephone exchange in 1964," she said. (6) "Every call in town came through our hands." (7) She explained that operators connected callers by plugging cords into a giant board full of holes. (8) I had always pictured phones working by themselves, so I could hardly imagine it. (9) My cousin has a new phone with a bright purple case.

(10) Nana Rose said the busiest night was the evening of a huge snowstorm, when hundreds of families called to check on each other. (11) She worked until midnight without a break. (12) I asked whether she had been scared of making mistakes. (13) She laughed and said her hands moved so fast that she didn't have time to be scared.

(14) I wrote down everything she said.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it distracts from the interview?`,
          choices: [
            no(`sentence 4`, 'removes-key-detail'),
            no(`sentence 8`, 'removes-narrator-reaction'),
            ok(`sentence 9`),
            no(`sentence 11`, 'removes-key-event'),
          ],
          solution: `Sentence 9 describes a cousin's phone case, which has nothing to do with Nana Rose's job. Sentence 8 should stay because it shows the narrator's reaction to what Nana Rose explains.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which revision of sentence 11 best uses descriptive detail to show the busy night?`,
          choices: [
            ok(`She plugged in cord after cord until midnight while tiny lights blinked all over the board.`),
            no(`She worked very, very hard that night until it was extremely late.`, 'vague-intensifiers'),
            no(`She worked until midnight, which is the time when one day turns into the next.`, 'redundant-fact'),
            no(`The snowstorm that night dropped almost a foot of snow on the whole town.`, 'shifts-focus'),
          ],
          solution: `The correct choice adds sights and actions from the switchboard, so the reader can picture the busy night. The choice with "very, very hard" only adds vague words instead of details.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `The writer wants to turn sentence 12 into dialogue. Which revision fits best with sentence 13?`,
          choices: [
            no(`I asked her a question about being scared, and then she answered it.`, 'summary-not-dialogue'),
            ok(`"Were you ever scared of plugging a call into the wrong hole?" I asked.`),
            no(`"Why did you decide to stop working as an operator?" I asked.`, 'dialogue-mismatch'),
            no(`"Were you ever scared of making a mistake?" Nana Rose asked me.`, 'wrong-speaker'),
          ],
          solution: `The correct choice is the narrator's question in quotation marks, and sentence 13 answers it. The question about why she stopped working does not match Nana Rose's answer about being scared.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which words would best begin sentence 10 to show a shift from general facts to one specific memory?`,
          choices: [
            no(`As a result,`, 'cause-not-shift'),
            no(`In the same way,`, 'comparison-not-shift'),
            no(`Before the photograph,`, 'illogical-time-order'),
            ok(`Of all her memories, though,`),
          ],
          solution: `"Of all her memories, though" tells the reader that the story is narrowing to one special night. "As a result" is tempting, but the snowstorm night was not caused by the facts about plugging in cords.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 14 as a conclusion that connects back to the beginning of the narrative?`,
          choices: [
            no(`Telephones have changed a great deal since the 1960s, and they will keep changing.`, 'generic-fact-ending'),
            ok(`As I closed my notebook, I realized her "room full of wires" had really been a room full of people.`),
            no(`Then I went upstairs and started typing up my history project on the computer.`, 'flat-ending-no-reflection'),
            no(`Nana Rose was a telephone operator who worked in a room with many wires.`, 'restates-situation'),
          ],
          solution: `The correct choice echoes the phrase from sentence 2 and shows what the narrator now understands about the job. The choice about Nana Rose being an operator only repeats the situation without any new insight.`,
        },
      ],
    },
    {
      code: 'wg7-narrative-writing-p03',
      title: 'Thirty Cents',
      body: `(1) Every spring, the Maple Hill library holds a used book sale to raise money for new shelves. (2) This year, Mr. Haddad, the librarian, put me in charge of the children's table. (3) I arranged the picture books by color so the table looked like a rainbow. (4) The doors opened at nine, and a crowd of families poured in. (5) A small boy in a green raincoat walked straight to my table and picked up a thick book about sharks. (6) He studied the price sticker for a long time. (7) Then he opened his fist and counted three coins onto the table.

(8) The book cost one dollar, and he had only thirty cents. (9) Sharks have lived in the ocean for millions of years. (10) I didn't know what to do, because I wasn't supposed to change any prices. (11) I asked Mr. Haddad, and he told me to use my judgment. (12) I walked back and told the boy that the shark book was on a special sale. (13) His face lit up.

(14) The sale raised four hundred dollars, and I went home.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the narrative and should be deleted?`,
          choices: [
            no(`sentence 3`, 'removes-setting'),
            ok(`sentence 9`),
            no(`sentence 10`, 'removes-conflict'),
            no(`sentence 13`, 'removes-key-detail'),
          ],
          solution: `Sentence 9 is a fact about sharks that interrupts the narrator's problem at the table. Sentence 10 must stay because it states the narrator's conflict about changing the price.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which revision of sentence 11 uses dialogue to show what Mr. Haddad told the narrator?`,
          choices: [
            no(`Mr. Haddad said that I should use my own judgment about the problem.`, 'indirect-not-dialogue'),
            ok(`Mr. Haddad smiled and said, "You're in charge of that table. Use your judgment."`),
            no(`"Use your judgment," I said to the small boy in the green raincoat.`, 'wrong-speaker'),
            no(`Mr. Haddad frowned and said, "No books leave this room for less than a dollar."`, 'dialogue-contradicts-events'),
          ],
          solution: `The correct choice puts Mr. Haddad's exact words in quotation marks and matches what happens next. The first choice reports his words indirectly, so it is not dialogue.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `The writer wants to slow down sentence 6 to build tension. Which revision does this best?`,
          choices: [
            ok(`He turned the book over, ran a finger along the sticker, and chewed his lip while the crowd bustled past.`),
            no(`He looked at the price sticker on the book, and then he looked at it one more time.`, 'repetition-no-new-info'),
            no(`All of the price stickers at the sale were round, bright orange, and easy to read.`, 'detail-not-tension'),
            no(`He glanced at the sticker very quickly and then looked over at the next book.`, 'speeds-up-pacing'),
          ],
          solution: `The correct choice stretches the moment with small actions that show the boy's worry, which builds suspense. The choice that repeats "looked at" takes more words but adds no new detail.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 12 to show a shift in time and the narrator's decision?`,
          choices: [
            no(`For instance,`, 'example-not-time'),
            no(`On the contrary,`, 'contrast-not-time'),
            ok(`After a deep breath,`),
            no(`In summary,`, 'conclusion-not-time'),
          ],
          solution: `"After a deep breath" shows that a moment has passed and that the narrator has made up her mind. "On the contrary" signals an opposite idea, but walking back to the table does not contradict asking Mr. Haddad.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 14 as a conclusion that reflects on what the experience meant?`,
          choices: [
            no(`The library uses the money from the sale to buy new shelves every single year.`, 'generic-fact-ending'),
            no(`The boy left with his shark book, and I sold many more books after he left.`, 'flat-ending-no-reflection'),
            no(`In the end, I learned that rules should be broken whenever you feel like it.`, 'wrong-lesson'),
            ok(`We raised four hundred dollars that day, but the number I remember most is thirty cents.`),
          ],
          solution: `The correct choice gives the result and shows that the moment with the boy mattered most, echoing the title. The choice about breaking rules is tempting, but the narrator asked permission first, so that lesson does not fit the story.`,
        },
      ],
    },
    {
      code: 'wg7-narrative-writing-p04',
      title: 'Counting in Fives',
      body: `(1) At six in the morning, my aunt Marisol and I stood at the edge of Willow Marsh with binoculars, a clipboard, and two thermoses of cocoa. (2) We were volunteers for the winter bird count, which meant we had to record every bird we saw in one hour. (3) My breath made small clouds in the cold air. (4) For the first ten minutes, we saw nothing but brown reeds. (5) Then a flock of small gray birds with white bellies landed on the path. (6) "Juncos," Aunt Marisol whispered.

(7) I started counting, but they kept hopping around, and I lost track at fourteen. (8) Aunt Marisol showed me a trick. (9) Instead of counting single birds, I could count groups of five and multiply. (10) My binoculars were a birthday present from my uncle two years ago. (11) I tried again and counted six groups, which made thirty juncos. (12) We counted a heron, two cardinals, and a woodpecker. (13) When the hour ended, our list had eleven kinds of birds on it.

(14) Birds are fun.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it interrupts the sequence of events?`,
          choices: [
            no(`sentence 4`, 'removes-pacing-detail'),
            no(`sentence 7`, 'removes-conflict'),
            no(`sentence 9`, 'removes-key-detail'),
            ok(`sentence 10`),
          ],
          solution: `Sentence 10 tells where the binoculars came from, which breaks into the moment when the narrator learns the counting trick. Sentence 7 must stay because it shows the problem the trick solves.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which revision of sentence 8 uses dialogue to show the trick?`,
          choices: [
            no(`Aunt Marisol taught me something very useful about counting birds that day.`, 'summary-not-dialogue'),
            no(`"Juncos have always been my favorite bird," Aunt Marisol said with a smile.`, 'dialogue-off-topic'),
            ok(`"Don't count each bird," Aunt Marisol said. "Count them in fives, then multiply."`),
            no(`"Count them in fives, then multiply," I whispered to Aunt Marisol.`, 'wrong-speaker'),
          ],
          solution: `The correct choice lets Aunt Marisol explain the trick in her own words. The choice about juncos being her favorite bird is dialogue, but it does not show the trick.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 12 to show a shift in time?`,
          choices: [
            ok(`Over the next forty minutes,`),
            no(`Similarly,`, 'comparison-not-time'),
            no(`Because of the juncos,`, 'false-cause'),
            no(`In contrast,`, 'contrast-not-time'),
          ],
          solution: `"Over the next forty minutes" tells the reader that time has passed since the juncos. "Because of the juncos" is wrong because the juncos did not cause the other birds to appear.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 3, would best use sensory details to build the setting?`,
          choices: [
            no(`Willow Marsh covers about forty acres just outside of our town.`, 'fact-not-sensory'),
            ok(`Frost crunched under our boots, and water trickled somewhere under the ice.`),
            no(`I felt excited and ready to start counting as many birds as I could.`, 'feeling-not-setting'),
            no(`Later that day, we ate a warm lunch together at a diner downtown.`, 'out-of-sequence'),
          ],
          solution: `The correct choice uses sound and touch to show the cold marsh at dawn. The choice about forty acres describes the place, but it gives a fact rather than a sensory detail.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 14 as a conclusion that shows how the narrator changed?`,
          choices: [
            no(`Bird counts help scientists learn how bird populations change over time.`, 'generic-fact-ending'),
            no(`Aunt Marisol and I went to Willow Marsh to count birds on a cold morning.`, 'restates-situation'),
            ok(`On the walk back, I counted a flock of geese overhead in fives without even thinking.`),
            no(`We drove home after the count, and I took a long nap on the couch.`, 'flat-ending-no-reflection'),
          ],
          solution: `The correct choice shows the narrator using the new trick on her own, which proves she has changed since sentence 7. The fact about scientists is tempting, but it ends the story with information instead of the narrator's experience.`,
        },
      ],
    },
    {
      code: 'wg7-narrative-writing-p05',
      title: 'The Last Hill',
      body: `(1) The Riverside cross-country course is famous for one thing: a steep hill right before the finish. (2) I had run the course twice in practice, and both times I had walked up that hill. (3) On the day of the league meet, Coach Benally pulled me aside before the start. (4) "Run your own race," she said. (5) "Save something for the hill."

(6) The starting horn blasted, and sixty runners surged across the grass. (7) I got caught up in the crowd and sprinted the first mile with the leaders. (8) By the second mile, my legs felt heavy and my side ached. (9) Our team bus is yellow with a blue stripe. (10) Then I saw the hill. (11) I remembered Coach Benally's words and shortened my steps. (12) I kept my eyes on the ground just ahead of my shoes. (13) I passed one runner and then another. (14) I reached the top and coasted down to the finish line.

(15) I finished the race.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not belong in the narrative?`,
          choices: [
            no(`sentence 2`, 'removes-background'),
            no(`sentence 8`, 'removes-key-detail'),
            ok(`sentence 9`),
            no(`sentence 11`, 'removes-turning-point'),
          ],
          solution: `Sentence 9 describes the team bus in the middle of the race, which has nothing to do with the hill. Sentence 2 should stay because it explains why the hill is a challenge for the narrator.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which revision of sentence 13 best uses description to slow the pacing at the most important moment?`,
          choices: [
            no(`I passed one runner, then another runner, and then I passed some more runners.`, 'vague-repetition'),
            ok(`Halfway up, I heard a runner in red gasping beside me, and I edged past her.`),
            no(`I passed two runners, which is something that happens in almost every race.`, 'generic-aside'),
            no(`Quickly, I passed a couple of runners and kept going toward the finish.`, 'speeds-up-pacing'),
          ],
          solution: `The correct choice adds a sound and a specific runner, which slows the reader down during the climb. The first choice is longer, but it repeats words without adding any detail.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 14 to show a shift in time and place?`,
          choices: [
            no(`For example,`, 'example-not-time'),
            no(`On the other hand,`, 'contrast-not-time'),
            ok(`At last, gasping at the crest,`),
            no(`Even though,`, 'creates-fragment'),
          ],
          solution: `"At last, gasping at the crest" shows that time has passed and that the narrator has reached the top. "Even though" would turn the sentence into an incomplete thought and does not show time.`,
        },
        {
          slot: 24,
          difficulty: 'hard',
          stem: `The writer wants sentence 7 to show clearly that the narrator ignored the advice in sentences 4 and 5. Which revision does this best?`,
          choices: [
            ok(`I forgot every word of Coach Benally's advice and sprinted the first mile with the leaders.`),
            no(`I got caught up in the crowd, which was made up of runners from six different schools.`, 'irrelevant-detail'),
            no(`I ran the first mile at a steady pace, exactly the way Coach Benally had told me to.`, 'contradicts-later-events'),
            no(`Coach Benally changed her mind and shouted at me to sprint the first mile.`, 'misreads-sequence'),
          ],
          solution: `The correct choice links the fast start to the forgotten advice, which explains why the narrator is tired in sentence 8. The steady pace choice contradicts the heavy legs and aching side that come next.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 15 as a conclusion that connects to the beginning of the narrative?`,
          choices: [
            no(`Cross-country races for middle school students are usually about two miles long.`, 'generic-fact-ending'),
            no(`Before the race, Coach Benally had told me to run my own race and save energy.`, 'restates-event'),
            no(`After the race, I ate an orange slice and pulled on my warm team sweatshirt.`, 'flat-ending-no-reflection'),
            ok(`I finished twenty-third, my best place ever, and for once I had run every step of that hill.`),
          ],
          solution: `The correct choice gives the result and contrasts it with sentence 2, where the narrator always walked the hill. The choice repeating Coach Benally's advice goes back in time instead of resolving the story.`,
        },
      ],
    },
    {
      code: 'wg7-narrative-writing-p06',
      title: 'Centering the Clay',
      body: `(1) The first time I sat at the pottery wheel in art club, I thought making a bowl would take five minutes. (2) Mr. Nakamura slapped a lump of wet clay onto the center of the wheel and stepped back. (3) I pressed my foot on the pedal, and the wheel began to spin. (4) As soon as I touched the clay, it wobbled and flung a gray splatter across my apron. (5) Some clay is dug from riverbanks in several states. (6) I pushed harder, but the lump only leaned farther to one side.

(7) Mr. Nakamura watched me struggle. (8) He told me to brace my elbows against my knees and let the wheel do the work. (9) I tried it. (10) Slowly, the wobble shrank until the clay spun smooth and still under my palms. (11) Then I pressed my thumbs into the center and pulled the walls upward. (12) My bowl was lopsided and a little thick on one side. (13) Still, it was mine.

(14) That is what happened at pottery.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not fit the narrative?`,
          choices: [
            no(`sentence 1`, 'removes-situation'),
            no(`sentence 4`, 'removes-conflict'),
            ok(`sentence 5`),
            no(`sentence 12`, 'removes-key-detail'),
          ],
          solution: `Sentence 5 gives a fact about where clay comes from, which interrupts the narrator's struggle at the wheel. Sentence 4 must stay because it shows the first problem the narrator faces.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which revision of sentence 8 uses dialogue in a way that fits the events that follow?`,
          choices: [
            no(`Mr. Nakamura gave me some helpful advice about how to sit at the wheel.`, 'summary-not-dialogue'),
            no(`"Push harder and use all of your strength," Mr. Nakamura said.`, 'dialogue-contradicts-events'),
            ok(`"Lock your elbows on your knees," Mr. Nakamura said. "Let the wheel work."`),
            no(`"Let the wheel do the work," I told Mr. Nakamura with a nod.`, 'wrong-speaker'),
          ],
          solution: `The correct choice gives Mr. Nakamura's own words, and the next sentences show the narrator following them. The choice telling her to push harder contradicts the story, since pushing harder is what failed in sentence 6.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `The writer wants sentence 7 to show how much time passes. Which revision does this best?`,
          choices: [
            ok(`For almost ten minutes, Mr. Nakamura watched me struggle without saying a word.`),
            no(`Mr. Nakamura, who has taught art at our school, watched me struggle.`, 'adds-unrelated-detail'),
            no(`Mr. Nakamura will watch me struggle with the clay on the wheel.`, 'wrong-tense'),
            no(`Mr. Nakamura watched me, and then he watched me some more.`, 'vague-repetition'),
          ],
          solution: `"For almost ten minutes" tells the reader exactly how long the struggle lasts. The choice with "will watch" changes the tense, which confuses the order of events in a story told in the past.`,
        },
        {
          slot: 29,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence 4, best shows the narrator's feelings while keeping the first-person point of view?`,
          choices: [
            no(`Everyone in the room silently decided that I was the worst potter in the club.`, 'shifts-point-of-view'),
            no(`You always feel embarrassed when wet clay flies all over the place.`, 'shifts-to-second-person'),
            no(`The narrator felt embarrassed about the gray mess on the apron.`, 'shifts-to-third-person'),
            ok(`My cheeks burned as I glanced around to see if anyone had noticed the mess.`),
          ],
          solution: `The correct choice stays in the "I" voice and shows embarrassment through actions and a physical feeling. The choice about everyone's silent decision is tempting, but the narrator cannot know what others are thinking.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 14 as a conclusion that reflects on the lesson of the experience?`,
          choices: [
            no(`People in many parts of the world have used pottery wheels for thousands of years.`, 'generic-fact-ending'),
            ok(`Now that bowl holds my pencils and reminds me that patience shapes clay better than force.`),
            no(`In art club, I sat down at the pottery wheel and made a bowl out of wet gray clay.`, 'restates-situation'),
            no(`After that, I washed the clay off my hands and walked down the hall to my next class.`, 'flat-ending-no-reflection'),
          ],
          solution: `The correct choice connects to the turning point, when gentle pressure worked and pushing harder did not. The choice about washing up ends with an event but gives no reflection.`,
        },
      ],
    },
    {
      code: 'wg7-narrative-writing-p07',
      title: 'The Monkey Who Fell',
      body: `(1) My little sister Amina loves jungle animals, so I decided to code a game for her eighth birthday. (2) In the game, a monkey jumps from vine to vine to collect bananas. (3) I worked on it every evening for two weeks after finishing my homework. (4) The night before her birthday, I pressed the start button for one final test. (5) The monkey jumped onto the first vine and fell straight through it. (6) My stomach dropped.

(7) I checked the code for the jump, and it looked fine. (8) I checked the code for the bananas, and that looked fine too. (9) Bananas are a good source of potassium. (10) It was almost ten o'clock, and Mom called upstairs that it was time for bed. (11) I noticed that the edges of the vine were a lighter green than the color the monkey was supposed to touch. (12) I recolored the vine, held my breath, and clicked start. (13) The monkey landed, swung, and grabbed a banana.

(14) The game worked.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not belong in the narrative?`,
          choices: [
            no(`sentence 3`, 'removes-background'),
            no(`sentence 6`, 'removes-narrator-reaction'),
            no(`sentence 8`, 'removes-key-detail'),
            ok(`sentence 9`),
          ],
          solution: `Sentence 9 is a health fact about bananas that breaks into the search for the bug. Sentence 6 should stay because it shows how the narrator feels when the game fails.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 11 to show a shift in time?`,
          choices: [
            no(`For example,`, 'example-not-time'),
            ok(`Just as I reached to close the laptop,`),
            no(`As a result of bedtime,`, 'false-cause'),
            no(`In addition,`, 'addition-not-time'),
          ],
          solution: `"Just as I reached to close the laptop" shows the discovery happening at the last moment, which adds suspense. "As a result of bedtime" is wrong because bedtime did not cause the narrator to notice the color.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which revision of sentence 10 uses dialogue to add pressure to the scene?`,
          choices: [
            no(`Mom told me that it was getting late and that I should go to bed soon.`, 'indirect-not-dialogue'),
            no(`"Lights out in five minutes!" I called down the stairs to Mom.`, 'wrong-speaker'),
            no(`"Your game looks perfect already!" Mom called up the stairs.`, 'dialogue-contradicts-events'),
            ok(`"Lights out in five minutes!" Mom called up the stairs.`),
          ],
          solution: `The correct choice gives Mom's exact words and a deadline, which makes the narrator's search more urgent. The first choice reports what Mom said instead of quoting her, so it is not dialogue.`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `Sentences 7 and 8 follow the same pattern. What is the best reason for the writer to keep them?`,
          choices: [
            ok(`The repeated pattern shows the narrator checking step by step and builds frustration.`),
            no(`The sentences give the reader new facts about how bananas grow in a jungle.`, 'misreads-purpose'),
            no(`The sentences show that the bug in the game has already been solved.`, 'misreads-sequence'),
            no(`The sentences make the narrative longer, and longer stories are always better.`, 'length-equals-quality'),
          ],
          solution: `The matching pattern shows each failed check, so the reader feels the narrator's growing frustration. The bug is not solved until sentence 12, so the choice saying it is already solved misreads the order of events.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 14 to resolve the story and connect back to the reason the narrator made the game?`,
          choices: [
            no(`Coding is a useful skill that many people use every day at their jobs.`, 'generic-fact-ending'),
            no(`I coded a monkey game for my sister because she loves jungle animals.`, 'restates-situation'),
            ok(`The next day, Amina played the game nine times in a row, giggling at every banana.`),
            no(`Then I closed the laptop, brushed my teeth, and went straight to sleep.`, 'flat-ending-no-reflection'),
          ],
          solution: `The correct choice shows the gift reaching Amina, which resolves the birthday plan from sentence 1. The choice about why the narrator coded the game only restates the beginning and does not resolve anything.`,
        },
      ],
    },
    {
      code: 'wg7-narrative-writing-p08',
      title: 'The Wrong Stop',
      body: `(1) Last October, I rode the city bus by myself for the first time. (2) My plan was simple: take the Number 12 bus to Pine Street and walk one block to my grandfather's apartment. (3) I sat by the window and watched the stores slide past. (4) I was so busy reading a comic book that I forgot to count the stops. (5) When I finally looked up, nothing outside looked familiar. (6) My heart started to pound. (7) Comic books often have bright colors and speech bubbles.

(8) I made myself take three slow breaths. (9) Then I remembered what my dad had told me that morning: if you get lost, ask the driver. (10) I walked to the front of the bus and spoke to the driver. (11) She told me to stay on, because the bus would loop back to Pine Street in ten minutes. (12) I sat right behind her. (13) I watched every street sign carefully until Pine Street appeared.

(14) I got to my grandfather's apartment.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence interrupts the narrative and should be deleted?`,
          choices: [
            ok(`sentence 7`),
            no(`sentence 4`, 'removes-cause'),
            no(`sentence 8`, 'removes-narrator-reaction'),
            no(`sentence 9`, 'removes-turning-point'),
          ],
          solution: `Sentence 7 is a general fact about comic books that breaks into the narrator's panic. Sentence 4 must stay because it explains why the narrator missed the stop.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 uses dialogue that fits the events of the story?`,
          choices: [
            no(`The driver explained that I could stay on the bus until it came back around.`, 'indirect-not-dialogue'),
            ok(`"Stay right where you are," the driver said. "We loop back to Pine in ten minutes."`),
            no(`"Get off at the next stop and walk back," the driver said, pointing at the door.`, 'dialogue-contradicts-events'),
            no(`"Does this bus go back to Pine Street?" the driver asked me with a frown.`, 'wrong-speaker'),
          ],
          solution: `The correct choice quotes the driver's advice, and sentence 12 shows the narrator following it by staying on. The choice telling the narrator to get off contradicts the rest of the story.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 13 to show how time passes?`,
          choices: [
            no(`On the contrary,`, 'contrast-not-time'),
            no(`For instance,`, 'example-not-time'),
            ok(`For the rest of the ride,`),
            no(`Before I got on the bus,`, 'illogical-time-order'),
          ],
          solution: `"For the rest of the ride" shows that the narrator stayed alert the whole way back. "Before I got on the bus" is a time phrase, but it puts the event in the wrong order.`,
        },
        {
          slot: 39,
          difficulty: 'medium',
          stem: `Which revision of sentence 5 best uses description to show that the setting has changed?`,
          choices: [
            no(`When I finally looked up, I could see some things outside the window.`, 'vague-detail'),
            no(`When I finally looked up, I felt hungry and wanted a snack.`, 'detail-off-focus'),
            no(`When I finally looked up, the bus was already at Pine Street.`, 'contradicts-events'),
            ok(`When I finally looked up, the shops were gone and warehouses lined the street.`),
          ],
          solution: `The correct choice replaces the stores from sentence 3 with warehouses, so the reader sees that the narrator is somewhere new. The choice about seeing "some things" is too vague to show the change.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 14 as a conclusion that reflects on the narrator's mistake?`,
          choices: [
            no(`City buses carry thousands of riders to work and school every single day.`, 'generic-fact-ending'),
            no(`In the end, I learned that riding the bus alone is far too dangerous for kids.`, 'wrong-lesson'),
            ok(`Grandpa hugged me at the door, and I decided my comic book would stay in my bag next time.`),
            no(`Grandpa and I ate soup for lunch, and then we watched a movie together.`, 'flat-ending-no-reflection'),
          ],
          solution: `The correct choice resolves the trip and connects to the cause of the mistake in sentence 4. The lesson about the bus being too dangerous does not fit, because the narrator stayed calm and solved the problem safely.`,
        },
      ],
    },
  ],
}

export default skill
