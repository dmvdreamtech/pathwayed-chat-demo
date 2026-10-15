import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g8-narrative-writing',
  subject: 'writing',
  grade: 8,
  group: 'Composition',
  name: 'Narrative Writing',
  standards: ['W.8.3'],
  passages: [
    {
      code: 'wg8-narrative-writing-p01',
      title: 'The Robot That Would Not Turn',
      body: `(1) The gym smelled like floor wax and nervous energy on the morning of the regional robotics competition. (2) My teammate Kenji and I had spent six weeks building a robot named Pebble, and today it had to push three foam blocks into a goal in under two minutes. (3) We set Pebble on the practice mat for one last test. (4) It rolled forward perfectly, but when it reached the first block, it spun in a slow circle instead of turning left. (5) Kenji groaned. (6) The gym was built in 1985 and has a scoreboard on the north wall. (7) I grabbed the laptop and scrolled through our code, line by line. (8) My hands were shaking so much that I could barely type.

(9) "Found it," I said at last. (10) One of us had typed a 9 where a 90 should have been, so Pebble was turning nine degrees instead of ninety. (11) I fixed the number and uploaded the program. (12) We carried Pebble to the competition table. (13) The judge blew a whistle, and Pebble rolled toward the first block. (14) It turned left, nudged the block into the goal, and went back for the second. (15) When the buzzer sounded, all three blocks sat in the goal with eleven seconds to spare.

(16) We didn't win first place, but that was okay.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not belong in the narrative?`,
          choices: [
            no(`sentence 1`, 'removes-setting'),
            no(`sentence 4`, 'removes-key-event'),
            ok(`sentence 6`),
            no(`sentence 8`, 'removes-key-detail'),
          ],
          solution: `Sentence 6 gives facts about the gym's history that interrupt the tense search for the problem in the code. Sentence 8 should stay because the shaking hands show the narrator's nerves.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `The writer wants to use dialogue to show Kenji's worry in sentence 5. Which revision does this best?`,
          choices: [
            ok(`Kenji groaned. "We go on in twenty minutes," he said, staring at the clock.`),
            no(`Kenji told me that he was very worried about how much time we had left.`, 'summary-not-dialogue'),
            no(`"I really like building robots," Kenji said with a cheerful smile.`, 'dialogue-off-mood'),
            no(`Kenji groaned, and a few seconds later he groaned one more time.`, 'repetition-no-new-info'),
          ],
          solution: `The first choice uses Kenji's own words and the clock to show his worry about the time. The second choice only reports his feeling, so it summarizes instead of using dialogue.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 12 to show a shift in time?`,
          choices: [
            no(`However,`, 'contrast-not-time'),
            no(`For example,`, 'example-not-time'),
            no(`In conclusion,`, 'conclusion-not-time'),
            ok(`With four minutes left before our turn,`),
          ],
          solution: `"With four minutes left before our turn" tells the reader how much time has passed and adds pressure. "However" signals a contrast, but carrying Pebble to the table does not contrast with fixing the code.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 16 as a conclusion that reflects on the experience?`,
          choices: [
            no(`Robotics competitions are held in many states every single year.`, 'generic-fact-ending'),
            ok(`We placed fourth, but I knew that finding one wrong number under pressure mattered more to me than a trophy.`),
            no(`After that, we packed up our things, went home, and ate dinner.`, 'flat-ending-no-reflection'),
            no(`Pebble is a robot that pushes foam blocks into a goal.`, 'restates-situation'),
          ],
          solution: `The correct choice tells the result and shows what the experience meant to the narrator, which ties back to fixing the code. The choice about going home ends the story without any reflection.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to slow the pacing at the most suspenseful moment by adding sensory detail. Where would this detail be most effective?`,
          choices: [
            no(`after sentence 2, explaining how the team chose the name Pebble`, 'slows-wrong-moment'),
            no(`after sentence 11, describing the color and size of the laptop`, 'irrelevant-detail'),
            ok(`after sentence 13, describing Pebble creeping toward the first block while the narrator holds her breath`),
            no(`after sentence 15, listing the robots built by the other teams`, 'pacing-after-climax'),
          ],
          solution: `Sentence 13 is the moment the fix is tested, when the reader wonders whether Pebble will turn, so slowing down there builds suspense. Details about the name in sentence 2 come before any tension exists.`,
        },
      ],
    },
    {
      code: 'wg8-narrative-writing-p02',
      title: 'Seeds in the Vacant Lot',
      body: `(1) It started with a vacant lot. (2) For three years, the corner of Elm Street and Fourth Avenue had held nothing but weeds, broken bottles, and a sagging fence. (3) Malik walked past it every day on his way to school. (4) One afternoon in March, he noticed a small sign zip-tied to the fence: "Community Garden Meeting, Saturday, 10 a.m."

(5) On Saturday, Malik showed up and found only four other people. (6) Mrs. Delgado, who lived above the laundromat, held a clipboard. (7) A college student named Priya had brought a box of seed packets. (8) They spent the morning pulling weeds. (9) By noon, Malik's palms were blistered and his sneakers were caked with mud.

(10) The first sprouts appeared in late April. (11) Malik had planted a row of beans along the fence, and he checked on them every morning before school. (12) In July, the beans climbed all the way to the top of the fence. (13) Malik also likes to play basketball. (14) Mrs. Delgado said the garden was nice. (15) More neighbors joined every week.

(16) The garden was good.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not connect to the events of the story?`,
          choices: [
            no(`sentence 3`, 'removes-key-detail'),
            no(`sentence 9`, 'removes-description'),
            no(`sentence 11`, 'removes-key-event'),
            ok(`sentence 13`),
          ],
          solution: `Sentence 13 is about basketball, which has nothing to do with the garden, and it also shifts into present tense. Sentence 11 must stay because the beans become an important detail.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Sentence 14 tells about Mrs. Delgado's opinion instead of showing it. Which revision uses dialogue and detail to show it?`,
          choices: [
            no(`Mrs. Delgado said that she thought the garden was really very nice.`, 'still-telling'),
            ok(`Mrs. Delgado knelt beside the bean row. "I haven't grown anything since I was a girl," she said softly.`),
            no(`"Nice," someone said, though it was hard to tell who.`, 'unclear-speaker'),
            no(`Mrs. Delgado said the garden was nice, and it really was nice.`, 'adds-no-detail'),
          ],
          solution: `The correct choice shows Mrs. Delgado's action and her own words, which reveal what the garden means to her. The first choice still reports her opinion without dialogue or detail.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which revision of sentence 1 would best establish the situation and draw the reader in?`,
          choices: [
            ok(`Everyone on Elm Street called the corner lot "the dump," and nobody expected it to grow anything but weeds.`),
            no(`This is a story about a garden that some people in a city decided to plant.`, 'announces-topic'),
            no(`Gardens need sunlight, water, and rich soil in order to grow healthy plants.`, 'general-fact-opening'),
            no(`Malik liked beans more than any other vegetable he had ever eaten.`, 'too-narrow'),
          ],
          solution: `The correct choice shows how the neighborhood viewed the lot, which sets up the change the story will describe. The choice that says "This is a story about" announces the topic instead of establishing the situation.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 8 to show the order of events at the meeting?`,
          choices: [
            no(`Meanwhile, in July,`, 'wrong-time-order'),
            no(`As a result,`, 'confuses-cause-effect'),
            ok(`After a quick round of introductions,`),
            no(`On the other hand,`, 'contrast-not-time'),
          ],
          solution: `"After a quick round of introductions" moves the reader from meeting the group in sentences 6 and 7 to the work that came next. "Meanwhile, in July" jumps months ahead while the paragraph is still about one Saturday.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 16 as a conclusion that connects to the beginning of the story?`,
          choices: [
            no(`In conclusion, gardens are good for every community everywhere.`, 'generic-moral'),
            no(`Malik planted beans, Priya brought seeds, and Mrs. Delgado had a clipboard.`, 'summary-list'),
            no(`The next year, Malik and his family moved away to another city.`, 'new-unresolved-event'),
            ok(`By the end of summer, Malik could no longer see the sagging fence at all, only green leaves and neighbors.`),
          ],
          solution: `The correct choice brings back the sagging fence from sentence 2 and shows how much the lot has changed. The list of characters only repeats facts and does not show what the change means.`,
        },
      ],
    },
    {
      code: 'wg8-narrative-writing-p03',
      title: 'The Bird Count',
      body: `(1) At six in the morning, Grandpa Teodor and I stood at the edge of Hollow Creek Marsh with binoculars, a notebook, and a thermos of cocoa. (2) It was the day of the winter bird count, and our job was to record every bird we saw in our section. (3) I had never done it before. (4) Grandpa had done it for twenty-two years.

(5) For the first hour, I saw nothing but cattails and gray sky. (6) Grandpa, on the other hand, kept calling out names. (7) "Song sparrow. Two mallards. Red-winged blackbird." (8) I wrote them down, but secretly I wondered if he was making some of them up. (9) Grandpa thought I was bored and wished he had come alone.

(10) Then something moved in the reeds. (11) It was a tall brown bird standing perfectly still with its beak pointed at the sky. (12) I nudged Grandpa. (13) He lowered his binoculars slowly. (14) "A bittern," he whispered. (15) "In twenty-two years, I have seen one only twice."

(16) I wrote the name in the notebook.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Sentence 9 tells what Grandpa is thinking, which the first-person narrator cannot know. Which revision keeps the narrator's point of view?`,
          choices: [
            no(`Grandpa thought I was bored, and he also wished he had come by himself.`, 'pov-shift-unfixed'),
            ok(`Grandpa glanced at me and asked if I wanted to head back to the car.`),
            no(`You could tell that Grandpa thought I was bored out of my mind.`, 'second-person-shift'),
            no(`Grandpa felt tired of waiting and wanted to be home in his chair.`, 'pov-shift-unfixed'),
          ],
          solution: `The narrator can see Grandpa glance and hear his question, so the correct choice stays in first person. The other choices still report Grandpa's private thoughts or feelings, or switch to "you."`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Why does the writer most likely begin sentence 10 with the word "Then"?`,
          choices: [
            no(`to show that the bird appeared because the narrator was bored`, 'confuses-cause-effect'),
            no(`to compare the bittern with the song sparrow`, 'contrast-misread'),
            no(`to show that the story moves to a new place far from the marsh`, 'setting-shift-misread'),
            ok(`to signal a sudden change after the long, quiet wait`),
          ],
          solution: `"Then" marks a shift in time from the slow first hour to the moment something moves in the reeds. The setting does not change, since the bird is still in the same marsh.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 11, would best help the reader picture the bird?`,
          choices: [
            ok(`Its streaked feathers matched the reeds so closely that it almost disappeared when the wind blew.`),
            no(`Birds are warm-blooded animals that hatch from eggs and have feathers.`, 'general-fact-not-description'),
            no(`It was a bird, and it was standing in the marsh near the water.`, 'vague-detail'),
            no(`Grandpa's thermos was still about half full of warm cocoa.`, 'detail-off-focus'),
          ],
          solution: `The correct choice gives a precise visual detail about the bird's feathers and shows why it was hard to spot. The fact about warm-blooded animals is true but does not describe this bird in this scene.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `What does the dialogue in sentences 14 and 15 mainly reveal?`,
          choices: [
            no(`Grandpa is annoyed that the narrator interrupted him.`, 'misreads-tone'),
            no(`The narrator was the one who identified the bird.`, 'wrong-speaker'),
            ok(`The sighting is rare and exciting even for Grandpa.`),
            no(`The bird count is finished for the whole day.`, 'unsupported-inference'),
          ],
          solution: `Grandpa whispers and says he has seen this bird only twice in twenty-two years, which shows how rare and special the moment is. Grandpa, not the narrator, names the bird.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Which revision of sentence 16 would best conclude the narrative by showing how the narrator has changed?`,
          choices: [
            no(`The bird count is held every winter in many places around the country.`, 'generic-fact-ending'),
            no(`Then I wrote down another song sparrow and two more mallards.`, 'anticlimax-no-reflection'),
            no(`Grandpa had done the bird count for twenty-two years before that day.`, 'repeats-earlier-detail'),
            ok(`As I wrote the name in my neatest handwriting, I stopped doubting Grandpa and started searching the reeds myself.`),
          ],
          solution: `The correct choice connects to sentence 8, where the narrator doubted Grandpa, and shows that the doubt is gone. Repeating that Grandpa did the count for twenty-two years only restates sentence 4.`,
        },
      ],
    },
    {
      code: 'wg8-narrative-writing-p04',
      title: 'The Last Hill',
      body: `(1) Daniela Reyes had run the Pine Ridge course a dozen times in practice, but never in a real race. (2) The final mile included a hill that the older runners called "the Wall." (3) At the starting line, two hundred runners crowded together, bouncing on their toes in the cold air. (4) The starting gun cracked, and the pack surged forward.

(5) For the first two miles, Daniela stayed in the middle of the group. (6) She focused on her breathing: in for three steps, out for three steps. (7) She crossed the finish line in twenty-first place. (8) Then the course turned uphill. (9) Her legs felt like they were filled with wet sand. (10) A runner in a green jersey passed her, then another.

(11) Daniela remembered what Coach Abernathy had said at practice. (12) She pumped her arms and shortened her stride. (13) Halfway up the hill, she passed the runner in green. (14) At the top, she could see the finish line, a white banner flapping between two poles.

(15) That was the race.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which change would best fix the order of events in the narrative?`,
          choices: [
            ok(`Move sentence 7 so that it comes after sentence 14.`),
            no(`Move sentence 4 so that it comes before sentence 3.`, 'breaks-starting-sequence'),
            no(`Move sentence 2 so that it comes after sentence 14.`, 'misplaces-setup'),
            no(`Move sentence 10 so that it comes before sentence 8.`, 'misplaces-event'),
          ],
          solution: `Sentence 7 tells about the finish before Daniela even reaches the hill, so it belongs after she sees the finish line in sentence 14. Moving sentence 4 would fire the starting gun before the runners line up.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Sentence 11 summarizes what the coach said. Which revision uses dialogue that best fits this moment?`,
          choices: [
            no(`"Good luck out there," a stranger called from the crowd.`, 'dialogue-off-moment'),
            no(`Daniela remembered that Coach Abernathy had said something at practice once.`, 'summary-not-dialogue'),
            ok(`Coach Abernathy's voice echoed in her head: "Short steps on hills. Let your arms do the work."`),
            no(`"I really love this hill," Daniela said to herself with a laugh.`, 'contradicts-scene'),
          ],
          solution: `The coach's words about short steps and arms lead directly into sentence 12, where Daniela pumps her arms and shortens her stride. The stranger's line is dialogue, but it has nothing to do with how she climbs the hill.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which revision of sentence 8 best uses description to build tension?`,
          choices: [
            no(`Then the course turned uphill, which happens on many cross-country courses.`, 'generic-detail'),
            ok(`Then the Wall rose in front of her, steep and muddy and laced with roots.`),
            no(`Then the course turned uphill for a while, and it kept going up.`, 'vague-detail'),
            no(`Then the course turned uphill, and Daniela started thinking about lunch.`, 'detail-breaks-tension'),
          ],
          solution: `Naming the Wall and describing it as steep, muddy and full of roots shows the challenge Daniela faces. Saying that hills happen on many courses adds a general fact instead of building tension in this scene.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `The writer covers the first two miles in two sentences but uses several sentences for the hill. Why is this an effective pacing choice?`,
          choices: [
            no(`It shows that the first two miles were not really part of the race.`, 'literal-reading'),
            no(`It is a mistake, because every part of a story should get equal space.`, 'equal-pacing-myth'),
            no(`It makes the reader unsure about the order in which events happened.`, 'misreads-pacing'),
            ok(`It spends the most time on the hardest and most important part of the race.`),
          ],
          solution: `Writers slow down for the moments that matter most, and the hill is where Daniela struggles and then succeeds. Stories do not need equal space for every part, so the second choice is a false rule.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Suppose sentence 7 has been moved to its correct place. Which sentence would best replace sentence 15 as the conclusion?`,
          choices: [
            no(`Cross-country races in middle school are usually about two or three miles long.`, 'generic-fact-ending'),
            no(`Daniela crossed the finish line in twenty-first place.`, 'repeats-sentence'),
            ok(`As she bent over to catch her breath, Daniela grinned, because this time the Wall had not beaten her.`),
            no(`The next week, Daniela's family adopted a puppy from the shelter.`, 'new-unrelated-event'),
          ],
          solution: `The correct choice shows Daniela's feeling after the race and connects back to the Wall named in sentence 2. Once sentence 7 is moved, the finish place has already been told, so repeating it adds nothing.`,
        },
      ],
    },
    {
      code: 'wg8-narrative-writing-p05',
      title: 'The Letters in the Attic',
      body: `(1) Our history teacher, Mr. Nakamura, assigned a project about a family member's past, and I had no idea where to start. (2) My mom suggested I look in the attic. (3) The attic was hot and dusty. (4) Behind a stack of holiday decorations, I found a metal box with a rusty latch. (5) Inside was a bundle of letters tied with faded blue ribbon.

(6) The top letter was dated 1912. (7) It was written by my great-great-grandmother, Giulia, to her sister back in Sicily. (8) She described her first week working in a textile mill in Massachusetts. (9) She wrote that the machines were so loud she could not hear her own voice. (10) She also wrote that she was saving every coin to bring her sister to America.

(11) I sat on the attic floor and read until the light through the small window turned orange. (12) My mom climbed the ladder to check on me. (13) I told her about the letters. (14) She said she knew about them.

(15) I presented my project to the class. (16) I got an A.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which revision of sentence 3 best uses sensory details to describe the setting?`,
          choices: [
            no(`The attic was an attic at the top of our house.`, 'circular-description'),
            no(`Attics are often used by families for storing old things.`, 'general-fact-not-description'),
            ok(`The attic air was thick and hot, and each step sent dust swirling through a beam of sunlight.`),
            no(`The attic was hot and dusty, and it was also very hot.`, 'repetitive-detail'),
          ],
          solution: `The correct choice appeals to touch and sight with thick, hot air and swirling dust. The choice about storing old things is a general fact and does not describe this attic.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Sentences 13 and 14 summarize a conversation. Which revision uses dialogue to reveal something new?`,
          choices: [
            ok(`"Did you know these were up here?" I asked. Mom sat down beside me. "Grandma used to read them to me."`),
            no(`I told my mom all about the letters, and she told me she already knew.`, 'summary-not-dialogue'),
            no(`"Letters," I said to her. "Yes, letters," she said back to me.`, 'dialogue-reveals-nothing'),
            no(`"I am definitely going to get an A on this," I told her proudly.`, 'dialogue-off-focus'),
          ],
          solution: `The correct choice uses real dialogue and reveals that the letters were shared across generations. The second choice still summarizes the talk instead of letting the characters speak.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 15 to show a shift in both time and setting?`,
          choices: [
            no(`Back up in the attic,`, 'wrong-setting'),
            ok(`A week later, in Mr. Nakamura's classroom,`),
            no(`Because of this,`, 'confuses-cause-effect'),
            no(`Two years earlier,`, 'illogical-time-order'),
          ],
          solution: `"A week later, in Mr. Nakamura's classroom" tells the reader both when and where the next scene happens. "Back up in the attic" names the wrong place, since the project is presented at school.`,
        },
        {
          slot: 24,
          difficulty: 'hard',
          stem: `The writer wants to add this sentence to show how the letters affect the narrator: "For the first time, Giulia felt like a real person to me, not just a name on a family tree." Where should it be added?`,
          choices: [
            no(`after sentence 1`, 'before-discovery'),
            no(`after sentence 4`, 'before-discovery'),
            no(`after sentence 6`, 'before-reading-letter'),
            ok(`after sentence 11`),
          ],
          solution: `The narrator can only feel this way after reading the letters, and sentence 11 shows that long reading time ending. After sentence 6 the narrator has seen only a date, so the reaction would come too soon.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 16 as a conclusion that shows the significance of the experience?`,
          choices: [
            no(`I got an A, which is the best grade anyone can get on a project.`, 'focus-on-grade'),
            no(`Textile mills were common in Massachusetts in the early 1900s.`, 'generic-fact-ending'),
            no(`Then I put the letters back in the box and forgot about them.`, 'contradicts-significance'),
            ok(`When I finished reading Giulia's words aloud, the room was silent, and the project felt like a story I would keep telling.`),
          ],
          solution: `The correct choice shows the class's reaction and what the letters now mean to the narrator. Ending on the grade keeps the focus on the assignment instead of on Giulia and her story.`,
        },
      ],
    },
    {
      code: 'wg8-narrative-writing-p06',
      title: 'The Solo',
      body: `(1) Tariq had practiced the cello solo for the spring concert every night for a month. (2) He knew every note by heart. (3) But when Ms. Lindqvist announced that the solo would be performed in front of the whole school, his stomach dropped. (4) The concert is in the auditorium. (5) On the night of the concert, Tariq waited backstage with the rest of the orchestra.

(6) Tariq walked onto the stage. (7) The lights were bright and hot. (8) He sat down, set his bow on the strings, and began to play. (9) His first note came out thin and shaky. (10) Somewhere in the audience, a chair squeaked. (11) He closed his eyes and pictured his bedroom, where he had played the solo thirty times without a single mistake. (12) The next note came out full and warm. (13) He played the rest of the piece. (14) When he lifted his bow, the auditorium was silent for one long second. (15) Then the applause began.

(16) Afterward, Tariq felt good.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it adds no new information and shifts into present tense?`,
          choices: [
            no(`sentence 2`, 'removes-key-detail'),
            ok(`sentence 4`),
            no(`sentence 9`, 'removes-turning-point'),
            no(`sentence 11`, 'removes-key-detail'),
          ],
          solution: `Sentence 4 uses "is" in a story told in past tense, and the auditorium is mentioned later anyway. Sentence 9 must stay because the shaky note is the problem Tariq has to overcome.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 6 to move the story from backstage to the stage?`,
          choices: [
            no(`In addition,`, 'addition-not-time'),
            no(`Earlier that month,`, 'illogical-time-order'),
            ok(`When Ms. Lindqvist finally nodded toward him,`),
            no(`For instance,`, 'example-not-time'),
          ],
          solution: `The correct phrase shows the moment that sends Tariq from backstage onto the stage. "Earlier that month" would jump back in time, even though he is already waiting backstage on concert night.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Sentence 13 rushes past an important moment. Which revision best slows the pacing with description?`,
          choices: [
            no(`He played the rest of the piece as quickly as he possibly could.`, 'speeds-up-pacing'),
            no(`He played the rest of the piece, and then he was done playing.`, 'summary-no-detail'),
            no(`He played the rest of the piece, which was written over a century ago.`, 'off-focus-detail'),
            ok(`His bow glided through the slow middle section, and the final high note rang clear across the dark room.`),
          ],
          solution: `The correct choice describes the music as it happens, so the reader stays inside the performance. Adding the age of the piece gives a fact that does not slow down or deepen this moment.`,
        },
        {
          slot: 29,
          difficulty: 'hard',
          stem: `What is the main purpose of sentence 10 in the narrative?`,
          choices: [
            ok(`It adds a small, realistic sound that increases the tension right after the shaky note.`),
            no(`It shows that people are leaving the concert because the solo is going badly.`, 'unsupported-inference'),
            no(`It introduces a new character who will become important later in the story.`, 'overreads-detail'),
            no(`It marks a jump in time to the moment after the concert has ended.`, 'misreads-sequence'),
          ],
          solution: `The squeak comes right after Tariq's shaky first note and makes the silent room feel tense and noticeable. Nothing in the text says anyone is leaving, so that choice goes beyond the evidence.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 16 by showing Tariq's feelings and connecting to the opening?`,
          choices: [
            no(`Afterward, Tariq felt very, very good about how everything had gone.`, 'tells-not-shows'),
            ok(`Backstage, Tariq's hands still trembled, but he was smiling at the solo that had once made his stomach drop.`),
            no(`Afterward, the members of the orchestra folded up their music stands.`, 'flat-ending-no-reflection'),
            no(`The cello is the second largest instrument in the string family.`, 'generic-fact-ending'),
          ],
          solution: `The correct choice shows Tariq's emotion through his hands and smile and links to sentence 3, where his stomach dropped. Adding "very, very" still only tells the reader how he felt.`,
        },
      ],
    },
    {
      code: 'wg8-narrative-writing-p07',
      title: 'Waiting for the Comet',
      body: `(1) My neighbor, Mr. Achterberg, told me a comet would be visible for only three nights in October. (2) I had never seen a comet, so I begged my dad to drive us out of the city, where the sky would be darker. (3) We packed a borrowed telescope, two folding chairs, and a star map. (4) We parked in a field outside town.

(5) At first, all I could see were airplanes and one bright star that turned out to be a planet. (6) I pointed the telescope where the star map said the comet should be. (7) There was nothing. (8) I checked the map again. (9) My dad yawned. (10) He said we should go home. (11) I asked for five more minutes.

(12) Then I saw it. (13) It was a fuzzy smudge of light with a faint tail stretching away from it, like a thumbprint on a window. (14) I couldn't breathe. (15) Comets are made of ice, dust, and rock. (16) My dad leaned over to look, and for a long moment neither of us said anything.

(17) We drove home.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it interrupts the most exciting moment of the story?`,
          choices: [
            no(`sentence 2`, 'removes-situation'),
            no(`sentence 11`, 'removes-motivation'),
            no(`sentence 13`, 'removes-key-description'),
            ok(`sentence 15`),
          ],
          solution: `Sentence 15 is a science fact dropped between the narrator's amazement and the dad's reaction, so it breaks the moment. Sentence 13 must stay because it shows what the comet looks like.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Sentences 9 through 11 summarize a conversation. Which revision uses dialogue to build suspense?`,
          choices: [
            no(`My dad yawned and said it was late, and I said that I wanted to stay longer.`, 'summary-not-dialogue'),
            ok(`My dad yawned. "It's almost midnight. Maybe the comet stayed home tonight." "Five more minutes," I begged.`),
            no(`"Comets are the most amazing thing in the sky," my dad said happily.`, 'dialogue-contradicts-scene'),
            no(`"Okay," said my dad. "Okay," I said back to him.`, 'dialogue-reveals-nothing'),
          ],
          solution: `The correct choice lets both characters speak and shows the dad ready to quit while the narrator pleads, which raises suspense. The first choice reports the same talk without any actual dialogue.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which revision of sentence 4 best shows a shift in both time and setting?`,
          choices: [
            ok(`About an hour later, we parked in a dark field where the city lights were only a glow on the horizon.`),
            no(`Meanwhile, back at home, we parked our car in a field outside of town.`, 'contradictory-setting'),
            no(`Similarly, we parked our car in a quiet field somewhere outside of town.`, 'comparison-not-time'),
            no(`As a result of the star map, we parked in a field outside of town.`, 'confuses-cause-effect'),
          ],
          solution: `"About an hour later" marks the time that passed, and the dark field with a distant glow shows the new setting. "Meanwhile, back at home" contradicts the fact that they have driven out of the city.`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `In sentence 13, how does the comparison "like a thumbprint on a window" help the narrative?`,
          choices: [
            no(`It shows that the telescope lens was dirty and needed cleaning.`, 'literal-reading'),
            no(`It suggests that the comet was very close to the field.`, 'unsupported-inference'),
            ok(`It helps the reader picture how faint and blurry the comet looked.`),
            no(`It shows that the narrator felt disappointed by the comet.`, 'misreads-tone'),
          ],
          solution: `A thumbprint on glass is a soft, hazy smudge, so the simile shows how the comet appeared. Reading it as a real thumbprint on the lens takes the comparison literally.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 17 as a conclusion that reflects on the experience?`,
          choices: [
            no(`We drove home, and the trip back took about an hour.`, 'flat-ending-no-reflection'),
            no(`Some comets return only once every several hundred years.`, 'generic-fact-ending'),
            ok(`On the drive home, I kept my face pressed to the window, watching a sky I had never bothered to look at before.`),
            no(`That night I decided to become a famous scientist and win every award there is.`, 'overstated-ending'),
          ],
          solution: `The correct choice shows a believable change in the narrator, who now pays attention to the night sky. Deciding to win every award is a huge leap that the events of one night do not support.`,
        },
      ],
    },
    {
      code: 'wg8-narrative-writing-p08',
      title: 'Letting Go',
      body: `(1) My little brother, Kofi, is seven, and all summer he refused to ride a bike without training wheels. (2) He said two wheels were "for big kids." (3) Then one evening in August, he walked into the garage, pointed at his bike, and said, "Take them off."

(4) I unscrewed the training wheels while he watched. (5) We walked the bike to the empty parking lot behind the library. (6) I held the back of the seat as he pedaled. (7) He wobbled. (8) He wobbled more. (9) He yelled at me not to let go.

(10) We tried for almost an hour. (11) The streetlights flickered on. (12) Each time I let go, Kofi tipped sideways and caught himself with his foot. (13) I ran beside him, holding the seat, and then I opened my hand without telling him. (14) He rode ten feet, then twenty, then all the way to the curb. (15) Kofi looked back and saw me standing far behind him.

(16) He fell over.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which revision of sentence 9 best uses dialogue to show Kofi's fear?`,
          choices: [
            no(`He yelled something at me that I could not really hear.`, 'vague-summary'),
            no(`He told me that he wanted me to keep holding on to the seat.`, 'summary-not-dialogue'),
            ok(`"Don't let go!" he shouted. "Don't you dare let go!"`),
            no(`"Let go whenever you want," he said in a calm voice.`, 'contradicts-character'),
          ],
          solution: `Kofi's repeated, shouted words let the reader hear his fear directly. The second choice reports what he wanted instead of giving his actual words.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Sentences 7 and 8 are short and repetitive. Which revision best combines them using precise description?`,
          choices: [
            ok(`The front wheel jerked left, then right, and his knuckles turned pale on the handlebars.`),
            no(`He wobbled, and he wobbled, and then he wobbled some more.`, 'repetition-no-detail'),
            no(`He wobbled because bikes are hard for young kids to balance.`, 'explains-instead-of-shows'),
            no(`He wobbled, which is something all new riders do sometimes.`, 'generic-aside'),
          ],
          solution: `The correct choice shows the wobbling through specific movements and Kofi's tight grip. The choice explaining that bikes are hard to balance tells a general reason instead of showing the scene.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 13 to show that this is a later, final attempt?`,
          choices: [
            no(`Before we unscrewed the training wheels,`, 'illogical-time-order'),
            no(`In contrast,`, 'contrast-not-time'),
            ok(`On what we agreed would be the last try,`),
            no(`For this reason,`, 'confuses-cause-effect'),
          ],
          solution: `"On what we agreed would be the last try" signals that time has passed and the key moment is coming. "Before we unscrewed the training wheels" would move the event back to before they reached the parking lot.`,
        },
        {
          slot: 39,
          difficulty: 'medium',
          stem: `The story is told by Kofi's older sibling. Which sentence, if added after sentence 14, would break the first-person point of view?`,
          choices: [
            no(`I could hear his tires humming on the pavement.`, 'misreads-pov'),
            no(`My hand was still stretched out in the empty air.`, 'misreads-pov'),
            no(`I held my breath and waited for him to tip over.`, 'misreads-pov'),
            ok(`Kofi secretly thought his sibling was the best teacher ever.`),
          ],
          solution: `A first-person narrator cannot know another character's secret thoughts, so that sentence breaks the point of view. The other sentences describe what the narrator hears, sees or does, which a first-person narrator can report.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 16 as a conclusion that resolves the story?`,
          choices: [
            no(`He fell over, and then we walked the bike back home.`, 'flat-ending-no-reflection'),
            no(`I realized that teaching someone takes patience, and that is the lesson of this story.`, 'tells-moral-directly'),
            ok(`His eyes went wide and he tipped into the grass, but he came up laughing. "Again! Don't hold on this time!"`),
            no(`Kofi got a brand new bike for his birthday the next year.`, 'new-unrelated-event'),
          ],
          solution: `The correct choice resolves Kofi's fear by showing him eager to ride without help, which contrasts with his shouting in sentence 9. The choice that states "the lesson of this story" tells the meaning outright instead of showing it.`,
        },
      ],
    },
  ],
}

export default skill
