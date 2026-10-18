import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g6-narrative-writing',
  subject: 'writing',
  grade: 6,
  group: 'Composition',
  name: 'Narrative Writing',
  standards: ['W.6.3'],
  passages: [
    {
      code: 'wg6-narrative-writing-p01',
      title: 'The Kite That Would Not Fly',
      body: `(1) Every spring, our town holds a kite festival on Harlow Hill, and this year my cousin Mateo and I entered a kite we had built ourselves. (2) We had made it from paper, two thin sticks, and a long tail of ribbon scraps. (3) When we reached the top of the hill, the sky was already full of dragons, fish, and giant diamonds. (4) Mateo held the kite while I backed away with the string. (5) I shouted, and he let go. (6) The kite rose a few feet, spun in a circle, and crashed into the grass. (7) We tried again and again, but it kept diving nose first. (8) Paper is made from wood pulp that is pressed into thin sheets. (9) A woman flying a red box kite nearby walked over to watch us. (10) "Your tail is too short," she said kindly. "It needs more weight to keep the kite steady."

(11) Mateo and I looked at each other. (12) We tied on every extra ribbon from my backpack, plus the string from Mateo's hoodie. (13) This time, when he let go, the kite climbed straight up. (14) It wobbled once, then settled high above the hill beside the dragons and fish.

(15) We went home at four o'clock.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not fit the events of the story?`,
          choices: [
            no(`sentence 3`, 'removes-setting-detail'),
            ok(`sentence 8`),
            no(`sentence 9`, 'removes-key-event'),
            no(`sentence 12`, 'removes-solution'),
          ],
          solution: `Sentence 8 is a fact about how paper is made, and it interrupts the moment when the kite keeps crashing. Sentence 9 must stay because it brings in the woman who gives the helpful advice.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which phrase would best begin sentence 14 to show that time is passing?`,
          choices: [
            ok(`After a few seconds,`),
            no(`For instance,`, 'example-not-time'),
            no(`In other words,`, 'restatement-not-time'),
            no(`Even so,`, 'contrast-not-time'),
          ],
          solution: `"After a few seconds" tells the reader when the kite settled after climbing. "Even so" signals a contrast, but settling in the sky does not contrast with climbing straight up.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 15 as a conclusion that reflects on the experience?`,
          choices: [
            no(`Kites have been flown in many countries for hundreds of years.`, 'generic-fact-ending'),
            ok(`Watching our kite float with the others, I realized that one small fix can change everything.`),
            no(`Mateo and I had built a kite from paper, sticks, and ribbon scraps.`, 'restates-situation'),
            no(`The next day, Mateo and I started building a giant dragon kite.`, 'starts-new-event'),
          ],
          solution: `The correct choice ties the ending to the fixed tail and shows what the narrator learned. The choice about the paper and sticks only repeats sentence 2 and gives no reflection.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which revision of sentence 6 uses the most precise description to show how the kite fell?`,
          choices: [
            no(`The kite went up and then it came back down onto the ground.`, 'vague-language'),
            no(`The kite did something bad and did not work very well.`, 'vague-language-telling'),
            ok(`The kite jerked upward, twirled like a falling leaf, and smacked into the grass.`),
            no(`The kite, which was made of paper and sticks, fell to the ground.`, 'repeats-old-detail'),
          ],
          solution: `Precise verbs like "jerked," "twirled," and "smacked," plus the comparison to a falling leaf, help the reader picture the crash. The choice about paper and sticks repeats information from sentence 2 instead of describing the fall.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to replace sentence 11 with dialogue that moves the plot forward. Which choice does this best?`,
          choices: [
            no(`"I really like your red box kite," Mateo told the woman.`, 'dialogue-off-focus'),
            ok(`Mateo grinned. "My hoodie string is long," he said. "Let's add it."`),
            no(`"We will never fly this kite," Mateo groaned, so we packed up and left.`, 'contradicts-later-events'),
            no(`"Hello, my name is Mateo," he said to the woman.`, 'dialogue-no-purpose'),
          ],
          solution: `Mateo's idea to add his hoodie string leads straight into sentence 12, where the cousins fix the tail. The choice where they pack up is tempting because it has strong feeling, but it contradicts the rest of the story.`,
        },
      ],
    },
    {
      code: 'wg6-narrative-writing-p02',
      title: 'The Number 9 Bus',
      body: `(1) Last Saturday, Mom let me ride the Number 9 bus to the library without her for the first time. (2) My little sister, Ama, begged to come, so Mom said I was in charge of both of us. (3) I had the route memorized: six stops, then get off at Maple Street. (4) We sat in the second row, right behind the driver. (5) At each stop, I counted on my fingers. (6) Ama kept asking me questions about the people getting on. (7) Kofi felt proud of himself for remembering everything. (8) At the fourth stop, the driver announced that the bus was taking a detour because of road work. (9) My stomach dropped. (10) The bus turned left onto a street I had never seen.

(11) I took a deep breath and looked out the window for anything I knew. (12) Then I spotted the tall clock on the bank, the one Mom always points out. (13) The library was only two blocks past it. (14) I pressed the stop button, and we stepped off onto the sidewalk.

(15) Ama took my hand as we walked the last two blocks. (16) The library is a good place.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence breaks the story's first-person point of view and should be revised?`,
          choices: [
            no(`sentence 3`, 'misses-pov-shift'),
            no(`sentence 5`, 'misses-pov-shift'),
            ok(`sentence 7`),
            no(`sentence 9`, 'misses-pov-shift'),
          ],
          solution: `The story is told by the narrator using "I," but sentence 7 suddenly calls the narrator "Kofi" and "himself." Sentence 9 is in first person with "My stomach," so it fits.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `The writer wants to add dialogue after sentence 6 to show Ama's curiosity. Which sentence does this best?`,
          choices: [
            ok(`"Where is that man going with a tuba?" Ama whispered.`),
            no(`Ama was very curious about the other people on the bus.`, 'summary-not-dialogue'),
            no(`"I want to go home right now," Ama said.`, 'dialogue-off-mood'),
            no(`"The library opens at nine," the driver said.`, 'wrong-speaker'),
          ],
          solution: `Ama's question about the man with the tuba shows her curiosity through her own words. The sentence saying she was curious only tells the feeling, so it is a summary rather than dialogue.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which sentence would best be added after sentence 9 to slow the pacing and show the narrator's worry?`,
          choices: [
            no(`The bus had about forty seats and a blue stripe on the side.`, 'irrelevant-detail'),
            no(`Then we got to the library and picked out our books.`, 'rushes-past-conflict'),
            ok(`I gripped the seat and tried to remember what Mom said to do if the plan changed.`),
            no(`Road work happens often in cities during the summer.`, 'generic-fact'),
          ],
          solution: `Gripping the seat and searching for Mom's advice lets the reader stay in the worried moment. The choice about getting to the library is tempting because it moves the story along, but it skips right past the problem.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 16 as a conclusion to the narrative?`,
          choices: [
            no(`The library has many books, computers, and a large reading room.`, 'generic-fact-ending'),
            ok(`When Ama checked out her first book, I felt like I could find my way anywhere.`),
            no(`The Number 9 bus runs every twenty minutes on Saturdays.`, 'off-topic-fact'),
            no(`Then we went home and ate dinner with Mom.`, 'flat-ending-no-reflection'),
          ],
          solution: `The correct choice shows how the narrator feels after solving the detour problem, which wraps up the story. The choice about going home ends the events but gives no reflection.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Why is sentence 3 important to the rest of the narrative?`,
          choices: [
            ok(`It sets up the narrator's plan, so the reader understands why the detour is a problem.`),
            no(`It shows that the narrator does not know which stop is the right one.`, 'contradicts-text'),
            no(`It explains how the narrator and Ama will get back home later.`, 'unsupported-inference'),
            no(`It shows that Ama is afraid of riding the bus.`, 'misreads-character'),
          ],
          solution: `Sentence 3 tells the exact route the narrator memorized, so when the bus turns onto an unknown street in sentence 10, the reader feels the plan fall apart. The choice saying the narrator does not know the right stop contradicts sentence 3, which names Maple Street as the stop.`,
        },
      ],
    },
    {
      code: 'wg6-narrative-writing-p03',
      title: 'Waiting for Crystals',
      body: `(1) On Monday, Mr. Okafor handed each of us a jar, a pencil, a piece of string, and a cup of very warm water. (2) We were going to grow salt crystals. (3) I stirred spoon after spoon of salt into my water until no more would dissolve. (4) Then I tied the string to the pencil, rested the pencil across the top of the jar, and let the string hang in the water. (5) I put my jar on the windowsill beside my lab partner Lucia's jar. (6) The next morning, I rushed into the room. (7) Lucia's string was covered in tiny white cubes. (8) Mine looked like a plain wet string. (9) The school cafeteria serves tacos every Tuesday. (10) I wanted to dump out my jar and start over.

(11) "Maybe yours just needs more time," Lucia said. (12) I decided to wait. (13) I checked the jar every day. (14) Finally, a few small cubes appeared near the bottom of my string. (15) By Friday, they had grown into a lumpy cluster that sparkled when the sun hit it.

(16) Lucia's crystals were bigger than mine.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not belong in the story?`,
          choices: [
            no(`sentence 5`, 'removes-setting-detail'),
            no(`sentence 8`, 'removes-key-detail'),
            ok(`sentence 9`),
            no(`sentence 14`, 'removes-key-event'),
          ],
          solution: `Sentence 9 is about the cafeteria menu and has nothing to do with growing crystals. Sentence 8 must stay because it shows the narrator's problem: no crystals yet.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which phrase would best begin sentence 13 to show how time passes?`,
          choices: [
            no(`For example,`, 'example-not-time'),
            ok(`For the next two days,`),
            no(`However,`, 'contrast-not-time'),
            no(`In conclusion,`, 'ending-not-time'),
          ],
          solution: `"For the next two days" tells how long the narrator kept checking before the cubes appeared. "However" signals a contrast, but checking the jar does not contrast with deciding to wait.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 16 as a conclusion that reflects on what the narrator learned?`,
          choices: [
            no(`Salt crystals form in the shape of cubes.`, 'generic-fact-ending'),
            no(`Lucia and I put our jars back in the supply cabinet.`, 'flat-ending-no-reflection'),
            ok(`My crystals were small and lumpy, but I was glad I had waited instead of giving up.`),
            no(`On Monday, we each got a jar, a pencil, and some string.`, 'restates-situation'),
          ],
          solution: `The correct choice connects to sentence 10, when the narrator almost gave up, and shows the lesson about patience. The original sentence 16 and the cabinet choice only report what happened without any reflection.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which revision of sentence 8 best uses description to show the narrator's disappointment?`,
          choices: [
            ok(`Mine was just a limp, dripping string with nothing on it at all.`),
            no(`Mine was not exactly the same as hers.`, 'vague-language'),
            no(`My jar was made of glass and held about two cups.`, 'irrelevant-detail'),
            no(`Mine was covered in big, shiny crystals.`, 'contradicts-story'),
          ],
          solution: `Words like "limp," "dripping," and "nothing on it at all" help the reader see why the narrator feels let down. The choice about big, shiny crystals contradicts sentence 14, where cubes only appear later.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Lucia's dialogue in sentence 11 is important to the plot because:`,
          choices: [
            no(`it shows that Lucia knows more about science than Mr. Okafor does.`, 'unsupported-inference'),
            ok(`it leads the narrator to decide to wait instead of starting over.`),
            no(`it explains to the reader how salt dissolves in warm water.`, 'misreads-dialogue'),
            no(`it ends the story by solving every problem the narrator has.`, 'overstates-role'),
          ],
          solution: `Right after Lucia speaks, the narrator says "I decided to wait" in sentence 12, so Lucia's words turn the story away from dumping out the jar. Nothing in the text compares Lucia's knowledge with Mr. Okafor's.`,
        },
      ],
    },
    {
      code: 'wg6-narrative-writing-p04',
      title: 'The Schoolhouse Bell',
      body: `(1) Our class took a field trip to the Pinecrest Historical Society, which is inside a one-room schoolhouse built in 1890. (2) A volunteer named Mrs. Haddad met us at the door. (3) She showed us the wooden desks, the slates students once wrote on, and an iron stove in the corner. (4) Then she pointed to a thick rope hanging from the ceiling. (5) "Long ago, a student rang this bell every morning," she said. "Would anyone like to try?" (6) Every hand shot up, including mine. (7) She picked me. (8) I grabbed the rope and pulled as hard as I could. (9) Nothing happened. (10) My classmates giggled, and my cheeks turned warm.

(11) Mrs. Haddad smiled. (12) "It's not about pulling hard," she said. "It's about rhythm." (13) She showed me how to pull, let the rope rise, and pull again. (14) I tried it her way. (15) The rope swung up, and a deep DONG rolled across the room. (16) Some museums have gift shops near the exit. (17) Everyone clapped.

(18) That was the end of the field trip.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence interrupts the action and should be removed?`,
          choices: [
            no(`sentence 10`, 'removes-key-detail'),
            no(`sentence 13`, 'removes-solution'),
            ok(`sentence 16`),
            no(`sentence 17`, 'removes-key-event'),
          ],
          solution: `Sentence 16 is a general fact about museums, and it breaks up the moment between the bell ringing and the class clapping. Sentence 13 must stay because it shows how the narrator learns to ring the bell.`,
        },
        {
          slot: 17,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 14 to show a shift in time?`,
          choices: [
            no(`On the contrary,`, 'contrast-not-time'),
            ok(`After a few practice swings,`),
            no(`To summarize,`, 'ending-not-time'),
            no(`For instance,`, 'example-not-time'),
          ],
          solution: `"After a few practice swings" shows that some time passed while the narrator learned the rhythm. "To summarize" signals a wrap-up, which does not fit in the middle of the action.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which sentence would best be added after sentence 3 to help the reader picture the setting?`,
          choices: [
            no(`Our permission slips for the trip were due on Friday.`, 'off-topic-detail'),
            ok(`Sunlight came through tall windows and lit up the dusty rows of desks.`),
            no(`Schools today have many classrooms and computers.`, 'generic-comparison'),
            no(`The room was nice and pretty interesting to see.`, 'vague-language'),
          ],
          solution: `Sensory details like sunlight, tall windows, and dusty desks help readers see the old schoolhouse. The choice calling the room "nice" is about the setting, but it is too vague to create a picture.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 18 as a conclusion to the narrative?`,
          choices: [
            no(`The schoolhouse was built in 1890 and has wooden desks.`, 'restates-situation'),
            no(`Next year, our class will take a field trip to a farm.`, 'starts-new-topic'),
            ok(`On the bus home, I wondered if the students long ago had to practice their rhythm too.`),
            no(`Mrs. Haddad is a volunteer at the historical society.`, 'restates-detail'),
          ],
          solution: `The correct choice reflects on the bell and links the narrator to students from the past. The choice about the farm trip is tempting because it looks ahead, but it starts a new topic instead of closing this story.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Which revision of sentence 9 best builds suspense by slowing the pace at this moment?`,
          choices: [
            no(`Nothing happened, so I let go and went back to my seat.`, 'rushes-past-conflict'),
            ok(`The rope stretched, the bell above me creaked once, and then the room went silent.`),
            no(`Nothing happened because old bells are heavy and made of metal.`, 'explains-instead-of-shows'),
            no(`Nothing happened, and the rest of the field trip went on as planned.`, 'skips-ahead'),
          ],
          solution: `The correct choice stretches the moment with small details of the rope, the creak, and the silence, which makes the reader wait. The choice about heavy bells gives an explanation instead of showing the moment, and it does not match the real reason given in sentence 12.`,
        },
      ],
    },
    {
      code: 'wg6-narrative-writing-p05',
      title: 'The Anchor Leg',
      body: `(1) The last event of the swim meet was the relay, and I was swimming the final leg. (2) Our team, the Riverside Otters, was tied with the Hillcrest Herons for first place. (3) As I stood behind the starting block, my knees felt like jelly. (4) Then our first swimmer, Grace, dove in. (5) The whistle blew. (6) She pulled ahead by half a body length. (7) Our second and third swimmers kept the lead, but the Herons were catching up. (8) Pools are usually kept at about the same temperature all year. (9) When our third swimmer touched the wall, I launched myself off the block.

(10) The water roared in my ears. (11) I kicked harder than I ever had in practice. (12) At the turn, I could see the Herons' swimmer right next to me. (13) I stretched my arm as far as it would go and slapped the wall.

(14) I looked up at the scoreboard. (15) We won.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which change would make the order of events in sentences 4 and 5 logical?`,
          choices: [
            ok(`Switch sentences 4 and 5 so the whistle blows before Grace dives in.`),
            no(`Move sentence 8 so that it comes before sentence 4.`, 'ignores-sequence-error'),
            no(`Delete sentence 5 so that no whistle is mentioned.`, 'removes-key-event'),
            no(`Move sentence 3 to the very end of the story.`, 'breaks-sequence'),
          ],
          solution: `A swimmer dives in after the whistle, so sentence 5 should come before sentence 4. Moving sentence 8 does not fix the order of the whistle and the dive.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which sentence should be removed because it interrupts the action of the race?`,
          choices: [
            no(`sentence 2`, 'removes-situation'),
            no(`sentence 7`, 'removes-rising-tension'),
            ok(`sentence 8`),
            no(`sentence 12`, 'removes-key-detail'),
          ],
          solution: `Sentence 8 is a fact about pool temperature that stops the race just as the Herons are catching up. Sentence 2 is background, but it is needed because the tie explains why the race matters.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which revision of sentence 15 best shows the narrator's feelings instead of just stating the result?`,
          choices: [
            no(`We won the relay race at the swim meet that day.`, 'restates-result'),
            ok(`Our team's name was at the top, and I punched the water and cheered until my throat hurt.`),
            no(`The scoreboard was large and had bright yellow lights.`, 'detail-not-feeling'),
            no(`Winning a race is important to every swimmer.`, 'generic-statement'),
          ],
          solution: `Punching the water and cheering shows the narrator's joy through actions. The choice about the scoreboard's lights adds description, but it shows nothing about how the narrator feels.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `Which line of dialogue could be added after sentence 3 to show a teammate supporting the narrator?`,
          choices: [
            no(`"The Herons are really fast," Grace said, and she walked away.`, 'dialogue-off-mood'),
            no(`"I am so nervous," I thought to myself.`, 'wrong-speaker'),
            ok(`Grace squeezed my shoulder. "Just swim your own race," she said.`),
            no(`"Did you remember to bring a snack?" Grace asked.`, 'dialogue-off-focus'),
          ],
          solution: `Grace's squeeze and her calm advice show a teammate encouraging the nervous narrator. The line about the Herons being fast comes from a teammate, but it adds worry instead of support.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `In the second paragraph, the writer uses short sentences that each describe one quick moment. What is the main effect of this choice?`,
          choices: [
            ok(`It makes the race feel fast and tense, as if the reader is swimming with the narrator.`),
            no(`It slows the story down so the reader can learn facts about the pool.`, 'misreads-pacing'),
            no(`It shows that the narrator is bored and wants the race to end.`, 'misreads-character'),
            no(`It explains the rules of a relay race to readers who do not swim.`, 'misreads-purpose'),
          ],
          solution: `Quick sentences about roaring water, hard kicks, and slapping the wall speed up the pace to match the race. The paragraph does not slow down or give facts about the pool, so that choice gets the effect backward.`,
        },
      ],
    },
    {
      code: 'wg6-narrative-writing-p06',
      title: 'The Lantern Handle',
      body: `(1) I am not an actor, but I love working on the stage crew for our school plays. (2) This year we put on a play about a family crossing the prairie in a covered wagon. (3) My job was to hand each actor the right prop before they walked onstage. (4) The most important prop was a tin lantern that the main character, played by Diego, carried in the second act. (5) During the break between acts, I picked up the lantern from the prop table. (6) The handle snapped off in my hand. (7) Diego was supposed to walk on in three minutes. (8) I looked around the dark backstage area for anything that could help. (9) Then I saw the roll of silver tape our director kept for emergencies. (10) I wrapped the tape around the handle three times and squeezed it tight. (11) Silver tape can also be used to fix tents and backpacks. (12) I handed the lantern to Diego just as the lights came up.

(13) He carried it across the stage, and the handle held. (14) Nobody in the audience knew anything had gone wrong.

(15) The play was about a covered wagon.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not move the story forward?`,
          choices: [
            no(`sentence 6`, 'removes-problem'),
            no(`sentence 9`, 'removes-turning-point'),
            ok(`sentence 11`),
            no(`sentence 14`, 'removes-result'),
          ],
          solution: `Sentence 11 lists other uses for tape, which pulls the reader away from the rush to fix the lantern. Sentence 9 must stay because it is the moment the narrator finds the solution.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 8 to show how quickly the narrator acts?`,
          choices: [
            ok(`Without wasting a second,`),
            no(`At the beginning of the play,`, 'wrong-time-order'),
            no(`On the other hand,`, 'contrast-not-time'),
            no(`For example,`, 'example-not-time'),
          ],
          solution: `"Without wasting a second" shows the narrator reacting right away, which fits the three minute deadline. "At the beginning of the play" names a time, but the wrong one, since this happens between acts.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 15 as a conclusion to the narrative?`,
          choices: [
            no(`Covered wagons carried families across the prairie long ago.`, 'generic-fact-ending'),
            ok(`As the curtain closed, I slipped the silver tape into my pocket, ready for whatever broke next.`),
            no(`Diego is one of the best actors at our school.`, 'off-focus-ending'),
            no(`I work on the stage crew because I am not an actor.`, 'restates-situation'),
          ],
          solution: `The correct choice closes the scene and shows the narrator's new confidence as a problem solver. The choice about stage crew only repeats sentence 1 and gives no sense of what the night meant.`,
        },
        {
          slot: 29,
          difficulty: 'hard',
          stem: `The story is told in first person by a member of the stage crew. Which detail should NOT be added, because this narrator could not know it?`,
          choices: [
            no(`The audience grew quiet as Diego walked onto the stage.`, 'confuses-observable-detail'),
            no(`The tape felt sticky and cold against my fingers.`, 'confuses-observable-detail'),
            ok(`Diego was secretly worried that he would forget his lines.`),
            no(`From across the stage, the director gave me a thumbs up.`, 'confuses-observable-detail'),
          ],
          solution: `A first-person narrator can report only what they see, hear, feel, or are told, so they cannot know Diego's secret worry. The quiet audience, the sticky tape, and the director's thumbs up are all things the narrator could hear, touch, or see from backstage.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which revision of sentence 7 best increases the tension while keeping the events in order?`,
          choices: [
            ok(`Through the curtain, I could hear the music that meant Diego would walk on in three minutes.`),
            no(`Earlier that week, Diego had practiced walking with the lantern twice.`, 'breaks-sequence'),
            no(`Diego walked on three minutes later, carrying the fixed lantern.`, 'gives-away-ending'),
            no(`Diego was one of the tallest actors in the whole play.`, 'irrelevant-detail'),
          ],
          solution: `Hearing the music reminds the reader that time is running out while the handle is still broken. The choice where Diego walks on with the fixed lantern jumps ahead and gives away the solution before it happens.`,
        },
      ],
    },
    {
      code: 'wg6-narrative-writing-p07',
      title: 'Pebble the Snail',
      body: `(1) For the technology fair, my friend Amara and I decided to make a short stop-motion movie. (2) Our star was a clay snail named Pebble, who was trying to cross a garden path. (3) We set a tablet on a stack of books, pointed it at the path, and took our first photo. (4) Then we moved Pebble a tiny bit and took another. (5) We did this over and over for two whole afternoons. (6) When we finally played our movie, I groaned. (7) Pebble did not glide smoothly. (8) He jumped around the screen, and in some pictures the whole path seemed to shake. (9) "The tablet moves every time we tap it," Amara said. (10) Clay comes in many bright colors at the craft store.

(11) We had to start over. (12) This time, we taped the tablet to the books so it could not budge. (13) We also used a timer so we never had to touch the screen. (14) The next week, we played our new movie for the class. (15) Pebble slid across the path as smoothly as a real snail.

(16) That is how we made our movie.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not fit the events of the story?`,
          choices: [
            no(`sentence 5`, 'removes-key-detail'),
            no(`sentence 9`, 'removes-cause'),
            ok(`sentence 10`),
            no(`sentence 13`, 'removes-solution'),
          ],
          solution: `Sentence 10 is about clay colors at a store and has nothing to do with the shaky movie. Sentence 9 must stay because it explains what caused the problem.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 uses dialogue to show the characters' feelings about starting over?`,
          choices: [
            no(`We felt pretty bad about it, so we decided to start over.`, 'summary-not-dialogue'),
            ok(`"Two afternoons, gone," I moaned, but Amara was already reaching for the tape.`),
            no(`"I really like snails," Amara said with a smile.`, 'dialogue-off-focus'),
            no(`"Our movie is perfect already," I told Amara.`, 'contradicts-story'),
          ],
          solution: `The narrator's moan shows frustration, and Amara reaching for tape shows Amara is ready to fix it. The choice "We felt pretty bad about it" states their feeling but contains no dialogue.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 16 as a conclusion that reflects on the experience?`,
          choices: [
            no(`Stop-motion movies are made from many separate photos.`, 'generic-fact-ending'),
            no(`Amara and I made a snail out of clay for the fair.`, 'restates-situation'),
            ok(`Pebble's trip lasted twenty seconds, but it taught us that a steady camera matters most.`),
            no(`After that, Amara and I went to the cafeteria for lunch.`, 'flat-ending-no-reflection'),
          ],
          solution: `The correct choice reflects on the lesson from the shaky first movie and the taped tablet. The choice about the clay snail only repeats the situation from sentence 2.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `Sentence 14 jumps ahead in time. Which sentence would best be added before sentence 14 to show what happened between the fix and the class showing?`,
          choices: [
            ok(`Over three more afternoons, we photographed Pebble's whole trip again, one tiny step at a time.`),
            no(`Before the fair, Amara and I had never made a movie of any kind.`, 'backtracks-in-time'),
            no(`Pebble was the best clay snail in our whole class.`, 'irrelevant-detail'),
            no(`The tablet has a camera on both the front and the back.`, 'off-topic-fact'),
          ],
          solution: `The correct choice fills the gap by showing the second round of photos, so the new movie in sentence 14 makes sense. The choice about never making a movie goes backward in time instead of bridging the gap.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `What is the main purpose of sentence 9 in the narrative?`,
          choices: [
            no(`It introduces a new character who has not been mentioned before.`, 'misreads-character'),
            ok(`It uses dialogue to reveal the cause of the problem, which leads to the fix in sentences 12 and 13.`),
            no(`It describes the setting where the friends filmed their movie.`, 'misreads-purpose'),
            no(`It concludes the story by stating the lesson the friends learned.`, 'misreads-structure'),
          ],
          solution: `Amara's words explain why the movie shakes, and the friends then tape the tablet and use a timer. Amara is not new, since she is named in sentence 1.`,
        },
      ],
    },
    {
      code: 'wg6-narrative-writing-p08',
      title: 'Counting Birds with Grandpa',
      body: `(1) Every February, people around the country count the birds they see in their own yards. (2) This year, Grandpa Teodoro invited me to help him with his count. (3) We sat at his kitchen window with a notebook, a pair of binoculars, and two mugs of cocoa. (4) For the first half hour, we saw only one sparrow. (5) I started to wonder if this would be the most boring morning of my life. (6) Grandpa scattered a handful of sunflower seeds on the snowy railing. (7) Within minutes, two cardinals landed. (8) Then came three chickadees, a blue jay, and a woodpecker with a red cap. (9) I wrote down each bird as fast as I could. (10) Grandpa's house has three bedrooms and a garage.

(11) By lunchtime, we had counted twenty-two birds of nine different kinds. (12) Grandpa showed me how to send our list to the scientists who study bird populations.

(13) I counted birds.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not belong in the story?`,
          choices: [
            no(`sentence 3`, 'removes-setting-detail'),
            no(`sentence 6`, 'removes-turning-point'),
            no(`sentence 8`, 'removes-key-detail'),
            ok(`sentence 10`),
          ],
          solution: `Sentence 10 describes the rooms in Grandpa's house, which has nothing to do with counting birds. Sentence 6 must stay because the seeds are what bring the birds.`,
        },
        {
          slot: 37,
          difficulty: 'easy',
          stem: `Which phrase would best begin sentence 6 to show a shift in time?`,
          choices: [
            no(`In conclusion,`, 'ending-not-time'),
            no(`For example,`, 'example-not-time'),
            ok(`Just then,`),
            no(`Similarly,`, 'comparison-not-time'),
          ],
          solution: `"Just then" marks the moment when the boring wait ends and Grandpa acts. "In conclusion" signals the end of a piece, but the story is only halfway through.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 13 as a conclusion to the narrative?`,
          choices: [
            no(`Cardinals are bright red birds that live in many places.`, 'generic-fact-ending'),
            ok(`I had expected a boring morning, but now I was asking Grandpa if we could count again next year.`),
            no(`We counted twenty-two birds of nine different kinds.`, 'restates-detail'),
            no(`Grandpa Teodoro has a big window in his kitchen.`, 'off-focus-ending'),
          ],
          solution: `The correct choice looks back at sentence 5 and shows how the narrator's feelings changed. The choice about twenty-two birds only repeats sentence 11 without reflection.`,
        },
        {
          slot: 39,
          difficulty: 'medium',
          stem: `Which revision of sentence 7 adds the most vivid description?`,
          choices: [
            no(`Within minutes, some birds came to the railing.`, 'vague-language'),
            no(`Within minutes, two cardinals landed, which was good.`, 'vague-language-telling'),
            no(`Within minutes, two cardinals landed on the railing of the house.`, 'adds-no-description'),
            ok(`Within minutes, two cardinals swooped down, their feathers glowing red against the snow.`),
          ],
          solution: `"Swooped" and "glowing red against the snow" let the reader see the birds' color and motion. The choice about landing on the railing adds a location but no sensory detail.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `The narrator's feelings change during the story. Which pair of sentences best shows this change?`,
          choices: [
            no(`sentences 1 and 2`, 'confuses-situation-with-feeling'),
            no(`sentences 3 and 12`, 'confuses-setting-with-feeling'),
            ok(`sentences 5 and 9`),
            no(`sentences 4 and 11`, 'confuses-events-with-feeling'),
          ],
          solution: `Sentence 5 shows the narrator expecting boredom, and sentence 9 shows eager excitement as they write as fast as they can. Sentences 4 and 11 are tempting, but they show a change in the number of birds, not in the narrator's feelings.`,
        },
      ],
    },
  ],
}

export default skill
