import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g11-narrative-writing',
  subject: 'writing',
  grade: 11,
  group: 'Composition',
  name: 'Narrative Writing',
  standards: ['W.11-12.3'],
  passages: [
    {
      code: 'wg11-narrative-writing-p01',
      title: 'Under the Red Light',
      body: `(1) The darkroom at Westbrook High was barely larger than a closet, and under the red safelight everything looked as if it had been dipped in cranberry juice. (2) I had one evening left to print the final photograph for my portfolio, a portrait of my neighbor Mrs. Okonkwo feeding pigeons on her fire escape. (3) My teacher, Mr. Halvorsen, had warned me that the enlarger on the left side tended to drift out of focus. (4) I ignored him and used it anyway because it was closer to the sink.

(5) My first print came out of the developer looking like gray fog. (6) My second was sharper, but her face was too dark to read. (7) Photography was invented in the early nineteenth century, and the first cameras required very long exposures. (8) I checked the clock: forty minutes until the building closed.

(9) Mr. Halvorsen knocked and slipped inside, careful not to let in any light. (10) He studied my ruined prints laid out on the counter. (11) "You're blaming the paper," he said. (12) "Try blaming the enlarger." (13) I wanted to argue, but the sharp smell of fixer and my own frustration made it hard to think. (14) I moved to the right-hand enlarger, refocused on the grain of the negative, and cut a test strip into five sections. (15) Each section got two more seconds of light than the one before. (16) When I slid the strip into the tray, the image rose slowly from the blank paper: first the iron railing, then the pigeons, then the soft lines around her eyes. (17) The fourth section was perfect.

(18) I made the final print with three minutes to spare. (19) The end.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it interrupts the narrative with information that does not belong?`,
          choices: [
            no(`sentence 4`, 'removes-cause-of-conflict'),
            ok(`sentence 7`),
            no(`sentence 13`, 'removes-internal-reaction'),
            no(`sentence 16`, 'removes-key-image'),
          ],
          solution: `Sentence 7 is a general history fact that breaks the tension of the narrator racing the clock. Sentence 4 must stay because it explains why the first prints failed, which Mr. Halvorsen points out in sentence 12.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 19 as a conclusion that reflects on the experience?`,
          choices: [
            no(`Darkrooms are becoming rare because most photographers now use digital cameras instead of film.`, 'generic-fact-ending'),
            no(`After that I cleaned the trays, turned off the safelight, locked the door, and walked home for dinner.`, 'flat-ending-no-reflection'),
            ok(`Walking home with the print in a folder, I realized the hardest part had been admitting that someone saw my mistake first.`),
            no(`The photograph showed Mrs. Okonkwo feeding pigeons on her fire escape, which is what I had planned to print.`, 'restates-situation'),
          ],
          solution: `The correct choice reflects on what the narrator learned, tying back to ignoring the warning and needing Mr. Halvorsen's help. The choice about cleaning up ends the story with actions but no reflection.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Why is sentence 4 important to the way the events are sequenced?`,
          choices: [
            ok(`It plants the cause of the blurry prints so that Mr. Halvorsen's advice in sentence 12 makes sense.`),
            no(`It describes the darkroom setting so the reader can picture the red light and the cramped space.`, 'confuses-setting-with-cause'),
            no(`It introduces a conflict between the narrator and Mrs. Okonkwo that the ending must resolve.`, 'misidentifies-conflict'),
            no(`It slows the pacing at the climax so that the reader feels the suspense of the final print.`, 'misplaces-climax'),
          ],
          solution: `Sentence 4 shows the narrator choosing the faulty enlarger, which explains the failures and sets up the turn in sentence 12. It does not describe the setting; sentence 1 does that.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `How does sentence 16 control the pacing of the narrative at that moment?`,
          choices: [
            no(`It skips ahead in time so the reader does not have to wait through the slow chemical process.`, 'misreads-pacing-speed'),
            ok(`It lists details in the order they appear, so the reader watches the image emerge along with the narrator.`),
            no(`It uses dialogue to reveal how the narrator feels about the teacher's advice.`, 'no-dialogue-present'),
            no(`It shifts the point of view so the reader sees the darkroom through Mr. Halvorsen's eyes.`, 'false-pov-shift'),
          ],
          solution: `The colon and the sequence "first... then... then" slow the moment so the photograph appears piece by piece. The sentence does not skip time; it stretches a few seconds out.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to raise the tension just before Mr. Halvorsen enters. Which revision of sentence 8 does this best?`,
          choices: [
            no(`I checked the clock, which hung above the door and had a cracked plastic cover from years of use.`, 'detail-without-stakes'),
            ok(`I checked the clock: forty minutes until the custodian locked up, and I had already used half my paper.`),
            no(`I checked the clock, and then I decided to take a short break and sit down for a few minutes.`, 'releases-tension'),
            no(`I checked the clock and thought about how much I had learned in photography class this year.`, 'premature-reflection'),
          ],
          solution: `Adding the shrinking supply of paper to the deadline doubles the pressure right before help arrives. The cracked clock cover adds description but nothing at stake.`,
        },
      ],
    },
    {
      code: 'wg11-narrative-writing-p02',
      title: 'Nineteen Miles North',
      body: `(1) Our physics class had spent a month building a payload box out of foam and tape, and on a cold March morning we finally released our weather balloon from the soccer field. (2) Inside the box were a small camera, a temperature sensor, and a tracker that would report the box's location once it fell back to earth. (3) Ms. Adeyemi-Clarke counted down from ten, and the white balloon rose so fast that within a minute it was only a dot against the clouds.

(4) The tracker updated every five minutes on Tomas's laptop. (5) We followed the dots north as the balloon drifted over farms, a reservoir, and finally a long ridge of pine forest. (6) Then the dots stopped. (7) "Maybe it's still climbing out of range," Tomas said, though his voice did not sound convinced.

(8) We drove toward the last location, ate lunch, and waited. (9) Two hours later, the laptop chimed. (10) The box had landed in an orchard nineteen miles away, and the signal was strong.

(11) The farmer who owned the orchard, a tall woman named Ruth Lindqvist, met us at her gate. (12) She had already found the box tangled in the branches of an apple tree. (13) "I thought somebody's science project had escaped," she said, handing it over with a grin.

(14) That night, we watched the footage in the classroom. (15) The camera showed the curve of the earth, a thin blue band of atmosphere, and then a black sky. (16) Some apple trees produce fruit for more than fifty years.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not belong in the narrative?`,
          choices: [
            no(`sentence 6`, 'removes-turning-point'),
            no(`sentence 12`, 'removes-key-event'),
            no(`sentence 15`, 'removes-key-image'),
            ok(`sentence 16`),
          ],
          solution: `Sentence 16 is an unrelated fact about apple trees that pulls attention from the footage, the payoff of the story. Sentence 15 must stay because it shows what the class finally saw.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which phrase would best begin sentence 8 to signal a shift in time and setting?`,
          choices: [
            ok(`Piling into two cars by noon,`),
            no(`In contrast to this,`, 'contrast-not-time'),
            no(`For instance,`, 'example-not-time'),
            no(`As a final point,`, 'conclusion-not-time'),
          ],
          solution: `"Piling into two cars by noon" tells the reader when the scene happens and that the class has left the field. "In contrast to this" signals an opposing idea, which driving after the balloon is not.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `The writer wants sentence 8 to slow down and show the suspense of waiting. Which revision does this best?`,
          choices: [
            no(`We drove toward the last location, ate our lunch quickly, and then waited for a pretty long time.`, 'vague-not-vivid'),
            ok(`We parked below the ridge and ate in silence, each of us refreshing the tracker and pretending not to.`),
            no(`We drove toward the last location, which was about nineteen miles north of the school.`, 'adds-fact-not-suspense'),
            no(`We drove, ate, and waited, and then the box was found and everything turned out fine.`, 'rushes-resolution'),
          ],
          solution: `The silence and the secret refreshing show the group's anxiety through action, stretching the wait. The "pretty long time" choice tells the reader time passed but gives nothing to see or feel.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 1, would best establish why the launch matters to the narrator?`,
          choices: [
            no(`Weather balloons are filled with helium and can rise more than twenty miles into the sky.`, 'fact-not-significance'),
            no(`The soccer field was muddy that morning, and several people had forgotten their gloves.`, 'detail-not-significance'),
            ok(`It was the first experiment we had designed entirely ourselves, and none of us knew whether it would work.`),
            no(`Our teacher had done this project with other classes, and it had always gone smoothly.`, 'undercuts-stakes'),
          ],
          solution: `The correct choice gives the stakes: the students own this experiment and its success is uncertain. The note that it always went smoothly removes the doubt that makes the lost signal tense.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `After sentence 16 is removed, which sentence would make the strongest conclusion for the narrative?`,
          choices: [
            no(`The next day we wrote a lab report about the temperature data and turned it in to Ms. Adeyemi-Clarke.`, 'flat-ending-no-reflection'),
            no(`Ruth Lindqvist told us she would watch for our balloon again next year if we decided to launch another one.`, 'ends-on-minor-thread'),
            no(`Weather balloons help scientists learn about the upper atmosphere, which makes them very useful tools.`, 'generic-fact-ending'),
            ok(`Staring at that black sky, I understood that something we built from foam and tape had gone farther than any of us ever would.`),
          ],
          solution: `The correct choice reflects on the meaning of the footage and connects back to the homemade box in sentence 1. The lab report choice reports the next step but never says what the experience meant.`,
        },
      ],
    },
    {
      code: 'wg11-narrative-writing-p03',
      title: 'Seat Three',
      body: `(1) At five-forty in the morning, the river was the color of pewter, and mist hung so low over the water that I could not see the far bank. (2) Our boat, a long white shell we called the Heron, sat on its rack while the eight of us stretched in silence. (3) I was rowing in seat three for the first time, replacing Danielle, who had sprained her wrist the week before. (4) Our coxswain, Priya, would steer and call the strokes from the stern.

(5) For two weeks I had been late on the catch, dropping my oar into the water a fraction of a second after everyone else. (6) Each time, the boat lurched slightly to one side. (7) Nobody said anything, but I could feel the hull wobble and knew it was my fault.

(8) The race started. (9) Priya's voice cut through the mist: "Lengthen! Stay together!" (10) By the halfway marker we were even with the crew from Lakeview. (11) My legs burned, and my lungs felt as if they were full of sand. (12) Then I stopped watching my own oar and watched the back of Marco's shoulders in seat four instead. (13) When he moved, I moved. (14) The Heron stopped wobbling and seemed to lift, gliding between strokes.

(15) We crossed the line half a length ahead of Lakeview. (16) We were very happy.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 16 as a conclusion that reflects on what the narrator experienced?`,
          choices: [
            no(`Then we rowed back to the dock, lifted the Heron out of the water, and put it back on its rack.`, 'flat-ending-no-reflection'),
            ok(`Carrying the Heron back to its rack, I realized I had spent two weeks fixing my rowing alone when the answer sat right in front of me.`),
            no(`Rowing is one of the oldest sports in the world and is popular at many high schools and colleges.`, 'generic-fact-ending'),
            no(`Everyone on the team was extremely happy, and we all agreed that it had been a really great race.`, 'tells-emotion-vaguely'),
          ],
          solution: `The correct choice reflects on the lesson of the race, linking back to the narrator's private struggle in sentences 5 through 7 and the solution in sentence 12. The "extremely happy" choice only restates sentence 16 with more words.`,
        },
        {
          slot: 12,
          difficulty: 'medium',
          stem: `Which revision of sentence 8 best signals the shift in time and setting from the dock to the race?`,
          choices: [
            no(`However, the race started after that.`, 'contrast-not-time'),
            no(`The race started, and it was a race on the river.`, 'redundant-no-transition'),
            ok(`An hour later, the mist had thinned, and we sat at the starting line beside five other boats, waiting for the horn.`),
            no(`The race started, just like every other race we had ever rowed in before.`, 'deflates-tension'),
          ],
          solution: `"An hour later" marks the time shift, and the starting line with other boats shows the new setting and builds anticipation. "However" signals a contrast that does not exist.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `What is the main purpose of sentences 5 through 7 in the narrative?`,
          choices: [
            no(`They explain the rules of rowing so that readers unfamiliar with the sport can follow the race.`, 'mistakes-purpose-as-informative'),
            ok(`They establish the narrator's private problem so that the change in sentences 12 through 14 feels earned.`),
            no(`They show that the other rowers are angry with the narrator and plan to replace her.`, 'unsupported-inference'),
            no(`They describe the river setting and the weather on the morning of the race.`, 'confuses-setting-with-conflict'),
          ],
          solution: `Sentences 5 through 7 set up the narrator's timing problem, which is solved when she follows Marco and the boat stops wobbling. The text says "Nobody said anything," so there is no evidence the others are angry.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `What does the dialogue in sentence 9 add to the narrative?`,
          choices: [
            ok(`It places the reader inside the race with urgent, clipped commands that show Priya's role as coxswain.`),
            no(`It reveals that Priya doubts the narrator and wishes Danielle were rowing instead.`, 'unsupported-inference'),
            no(`It provides background on how the team trained during the two weeks before the race.`, 'misreads-dialogue-purpose'),
            no(`It resolves the main conflict by telling the narrator exactly how to fix her timing.`, 'misplaces-resolution'),
          ],
          solution: `The short shouted commands create urgency and show what a coxswain does. They do not fix the narrator's timing; she finds that solution herself in sentence 12.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `The writer wants to develop the minor plot line about Danielle so it connects to the ending. Which sentence would best be added after sentence 15?`,
          choices: [
            no(`Danielle's wrist would heal in about three weeks, according to the doctor she had visited.`, 'fact-without-connection'),
            no(`Danielle had rowed in seat three for two full seasons and was one of the best rowers on the team.`, 'backstory-at-wrong-point'),
            ok(`On the dock, Danielle was waving her wrapped wrist over her head, shouting my name louder than anyone.`),
            no(`Afterward I wondered whether Danielle would be upset that we had won without her in the boat.`, 'contradicts-tone'),
          ],
          solution: `Danielle cheering for her replacement ties her thread to the victory and adds warmth to the ending. The doctor's estimate mentions her but does nothing to connect her to the race or its outcome.`,
        },
      ],
    },
    {
      code: 'wg11-narrative-writing-p04',
      title: 'The Conductor\'s Watch',
      body: `(1) For our history class's oral history project, each of us had to interview someone who had lived in Carver Falls for at least fifty years. (2) I chose Mr. Benedict Asante, who had worked as a conductor on the regional passenger train until the line closed in 1989. (3) I expected a short, polite conversation in the lobby of his apartment building. (4) Instead, he invited me upstairs, poured two glasses of lemonade, and set a heavy brass pocket watch on the table between us.

(5) "This watch kept the whole line on time," he said. (6) "If I was a minute late, three hundred people were a minute late." (7) He described the morning rush, the smell of diesel and wet wool coats, and a winter when snowdrifts buried the tracks up to the platform edge. (8) I was writing so fast that my notes became almost unreadable, so I switched on the recorder on my phone.

(9) Meanwhile, my partner Lucia was struggling with her own interview across town. (10) Her subject, a retired seamstress, would only answer yes or no. (11) Lucia texted me twice asking what questions I was using.

(12) When I finally stood up to leave, Mr. Asante opened the watch and showed me a tiny engraving inside the lid: a train and the date the line opened. (13) He said his father had given it to him. (14) Then he closed it and pressed it into my hand for a moment before taking it back. (15) "Somebody should remember the times," he said.

(16) I took the bus home.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which phrase would best begin sentence 12 to show how much time has passed?`,
          choices: [
            no(`Similarly,`, 'comparison-not-time'),
            ok(`Nearly two hours later,`),
            no(`On the other hand,`, 'contrast-not-time'),
            no(`To illustrate,`, 'example-not-time'),
          ],
          solution: `"Nearly two hours later" marks the passing of time and shows how far the short visit has stretched. "Similarly" compares ideas and says nothing about when the narrator leaves.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 16 as a conclusion that reflects on the experience?`,
          choices: [
            no(`The bus was crowded, so I had to stand for the whole ride back to my side of town.`, 'flat-ending-no-reflection'),
            no(`Oral history projects are a good way for students to learn about the past in their communities.`, 'generic-fact-ending'),
            no(`Mr. Asante worked as a conductor until the line closed, and he owns a brass pocket watch.`, 'restates-situation'),
            ok(`On the bus, I replayed his voice and realized the project had stopped being homework somewhere around the second glass of lemonade.`),
          ],
          solution: `The correct choice reflects on how the narrator's view of the assignment changed, echoing the lemonade from sentence 4. The crowded bus choice adds an event but no reflection.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `How do sentences 9 through 11 contribute to the narrative?`,
          choices: [
            no(`They explain the rules of the assignment that the teacher gave the class.`, 'misreads-purpose'),
            no(`They show that the narrator is a better student than Lucia.`, 'unsupported-inference'),
            ok(`They add a second plot line that contrasts with the narrator's talkative, generous subject.`),
            no(`They move the story forward to the day the projects were presented in class.`, 'confuses-sequence'),
          ],
          solution: `Lucia's one-word interview runs at the same time ("Meanwhile") and contrasts with Mr. Asante's rich storytelling. Nothing in the text compares the two students' ability, so the "better student" claim is unsupported.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `The writer wants to replace the summary in sentence 13 with dialogue. Which revision does this best?`,
          choices: [
            ok(`"My father gave me this the day I took the job," he said, running his thumb across the engraving.`),
            no(`He told me that the watch had once belonged to his father many years ago.`, 'summary-not-dialogue'),
            no(`"Do you like lemonade?" he asked, pouring me another glass.`, 'dialogue-off-topic'),
            no(`The watch, I learned, had been in his family for a very long time.`, 'summary-not-dialogue'),
          ],
          solution: `The correct choice uses Mr. Asante's own words plus a gesture to show what the watch means to him. "He told me that..." still reports his words instead of letting him speak.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `The writer includes sentence 3 mainly to:`,
          choices: [
            no(`describe the apartment building so the reader can picture where the interview took place.`, 'confuses-setting-with-purpose'),
            ok(`set up an expectation that sentence 4 overturns, signaling the visit will matter more than planned.`),
            no(`show that the narrator did not want to do the assignment and planned to rush through it.`, 'overstates-inference'),
            no(`introduce the main conflict of the story, which is a disagreement with Mr. Asante.`, 'misidentifies-conflict'),
          ],
          solution: `Sentence 3 gives a modest expectation, and "Instead" in sentence 4 overturns it, hinting the interview will be meaningful. Expecting a short conversation does not prove the narrator wanted to rush, so that choice reads too much into it.`,
        },
      ],
    },
    {
      code: 'wg11-narrative-writing-p05',
      title: 'Tag Number 4417',
      body: `(1) The meadow behind the county nature center was so loud with crickets that I could hear it before I saw it. (2) I had signed up to help Dr. Farah Siddiqui, a biologist who tags migrating monarch butterflies each September. (3) Each tag is a tiny round sticker with a code, placed on the underside of a wing so that anyone who finds the butterfly later can report where it traveled. (4) My job was to hold the net and hand her the tags in order.

(5) My first three swings caught nothing but goldenrod. (6) Dr. Siddiqui laughed. (7) "Slow down," she said, "and let them come to the flowers." (8) I stood still for what felt like ten minutes, sweat running into my eyes, until a monarch landed on a thistle near my elbow.

(9) Butterflies taste with their feet. (10) Afterwards, I swept the net in one smooth arc. (11) The butterfly fluttered against the mesh, orange and black and impossibly light. (12) Dr. Siddiqui showed me how to hold it gently by the closed wings and press the sticker, number 4417, onto the wing.

(13) I opened my fingers. (14) For a second, the monarch just sat on my palm. (15) Then it lifted, circled once above the goldenrod, and drifted south over the treetops.

(16) In conclusion, monarchs are interesting insects.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it interrupts the sequence of events?`,
          choices: [
            no(`sentence 5`, 'removes-key-event'),
            no(`sentence 8`, 'removes-turning-point'),
            ok(`sentence 9`),
            no(`sentence 14`, 'removes-key-moment'),
          ],
          solution: `Sentence 9 drops a general fact between the monarch landing and the narrator's swing, breaking the suspense. Sentence 8 must stay because it shows the narrator finally following the advice to wait.`,
        },
        {
          slot: 22,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 16 as a conclusion that reflects on the experience?`,
          choices: [
            ok(`Weeks later I still thought about that monarch, and about how catching it had depended on my learning to stand still.`),
            no(`Monarch butterflies are orange and black, and many of them migrate south every single autumn.`, 'generic-fact-ending'),
            no(`Then Dr. Siddiqui and I packed up the nets and the tags and walked back to the nature center.`, 'flat-ending-no-reflection'),
            no(`I helped Dr. Siddiqui tag monarch butterflies in a meadow behind the county nature center.`, 'restates-situation'),
          ],
          solution: `The correct choice reflects on the lesson of patience that runs from sentence 7 to the catch. The choice about packing up ends with action but no meaning.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which phrase should replace "Afterwards," at the start of sentence 10?`,
          choices: [
            no(`Several days later,`, 'wrong-time-gap'),
            ok(`Holding my breath,`),
            no(`In addition,`, 'adds-not-sequences'),
            no(`As a result of the heat,`, 'false-cause-effect'),
          ],
          solution: `"Holding my breath" keeps the swing in the same tense moment as the monarch landing and adds physical detail. "Several days later" breaks the sequence, since the narrator swings at the butterfly that just landed.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 4, would best establish the narrator's point of view going into the experience?`,
          choices: [
            no(`The nature center has walking trails, a pond, and a small museum about local wildlife.`, 'setting-not-pov'),
            no(`Monarchs travel thousands of miles each fall to spend the winter in warmer places.`, 'fact-not-pov'),
            no(`Dr. Siddiqui has been tagging butterflies for many years and has published several papers.`, 'focuses-on-wrong-character'),
            ok(`I had read about the migration for years, but I had never touched a monarch, and I worried I would hurt one.`),
          ],
          solution: `The correct choice shows the narrator's eagerness and fear, which shape how the reader feels when the narrator later holds the butterfly. The other choices give facts about the place, the insect or the scientist instead of the narrator.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Why does the writer use three short sentences, sentences 13 through 15, for the release?`,
          choices: [
            no(`To hurry past the release so the story can quickly reach its conclusion.`, 'misreads-pacing-speed'),
            no(`To show that the narrator is confused and unsure what to do next.`, 'unsupported-inference'),
            ok(`To break the release into separate beats so the reader lingers on each moment of the departure.`),
            no(`To summarize the entire migration of the monarch to its winter home.`, 'overstates-scope'),
          ],
          solution: `Each sentence holds one beat (opening the hand, the pause, the flight), which slows the moment rather than rushing it. Nothing in the text suggests confusion; the narrator acts calmly after being shown what to do.`,
        },
      ],
    },
    {
      code: 'wg11-narrative-writing-p06',
      title: 'The Last Shovel',
      body: `(1) My first week working at Pell's Hardware happened to be the week of the biggest snowstorm in a decade. (2) By Thursday afternoon, the parking lot had become a gray sea of slush, and the line at the register stretched past the paint aisle. (3) Mr. Pell, who had owned the store for thirty years, moved between the aisles with a clipboard, calmly telling customers what was left. (4) I was running the register by myself for the first time.

(5) At four o'clock, we sold our last bag of rock salt. (6) At four-fifteen, we sold our last snow shovel to a man who needed it for his mother's driveway. (7) Then a teenager about my age came in, stamping snow off his boots, and asked whether we had any shovels left. (8) I told him no.

(9) He did not leave. (10) He explained that his family had just moved from a city where it almost never snowed, and they did not own a single winter tool. (11) His name was Emeka, and he looked as if the storm had personally insulted him.

(12) I glanced toward the back room, where I knew a dented shovel with a cracked handle sat waiting to be returned to the supplier. (13) I found Mr. Pell and asked whether we could sell it. (14) He thought for a moment, wrapped tape around the crack, and handed it to me. (15) "No charge," he said. (16) "Tell him to come back in spring for a real one."

(17) Emeka came back in April. (18) He bought a rake.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `The writer wants to use dialogue in sentence 8. Which revision does this best?`,
          choices: [
            no(`I told him that unfortunately we were completely out of snow shovels.`, 'summary-not-dialogue'),
            ok(`"Sorry," I said, nodding at the empty rack by the door. "That man just took the last one."`),
            no(`"Have you tried the grocery store?" he asked me with a confused look.`, 'gives-line-to-wrong-speaker'),
            no(`I shook my head no, and he looked at the floor for a while.`, 'no-dialogue'),
          ],
          solution: `The correct choice lets the narrator speak and points to the empty rack, connecting to sentence 6. The first choice still summarizes the answer instead of giving the narrator's words.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `What is the effect of the time markers in sentences 5 and 6?`,
          choices: [
            ok(`They speed up the pacing and show supplies vanishing, building pressure before Emeka arrives.`),
            no(`They slow the narrative down so the reader can picture every customer in the line.`, 'misreads-pacing-speed'),
            no(`They show that the narrator is bored and keeps checking the clock during the shift.`, 'unsupported-inference'),
            no(`They signal a flashback to the narrator's first day of training at the store.`, 'false-flashback'),
          ],
          solution: `Two quick, parallel sentences with clock times move the story along and show the store emptying, which makes Emeka's request harder to meet. Nothing suggests boredom; the store is busy.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 4, would best establish the narrator's point of view and the pressure of the situation?`,
          choices: [
            no(`The register was a newer model that Mr. Pell had bought two years earlier.`, 'detail-without-stakes'),
            no(`Hardware stores often sell more supplies during storms than at any other time.`, 'generic-fact'),
            ok(`Every time the cash drawer stuck, I could feel the line behind me growing more impatient.`),
            no(`Mr. Pell had once worked at a larger store in another city before opening his own.`, 'focuses-on-wrong-character'),
          ],
          solution: `The correct choice puts the reader inside the narrator's nervous first shift alone. The register's age is a detail about the machine, not about how the narrator feels.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 18, would best conclude the narrative with reflection?`,
          choices: [
            no(`The rake was on sale that week, so he saved a few dollars on his purchase.`, 'trivial-detail-ending'),
            no(`Spring is usually a busy season for hardware stores because people start working in their yards.`, 'generic-fact-ending'),
            no(`Mr. Pell never did return the cracked shovel to the supplier after the storm.`, 'ends-on-minor-detail'),
            ok(`Ringing up that rake, I thought about Mr. Pell's tape and understood that he had sold Emeka a reason to come back.`),
          ],
          solution: `The correct choice reflects on what Mr. Pell's small act of kindness accomplished, tying the ending to sentences 14 through 16. The sale price detail adds information but no meaning.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which sentence is the turning point that moves the narrative from the problem toward its resolution?`,
          choices: [
            no(`sentence 7, when Emeka enters the store and asks about shovels`, 'confuses-problem-with-turn'),
            ok(`sentence 12, when the narrator remembers the damaged shovel in the back room`),
            no(`sentence 15, when Mr. Pell says the shovel is free`, 'confuses-resolution-with-turn'),
            no(`sentence 17, when Emeka returns to the store in April`, 'confuses-epilogue-with-turn'),
          ],
          solution: `Sentence 12 is where the narrator first sees a way to help, shifting the story from "no shovels" toward a solution. Sentence 7 introduces the problem rather than turning it.`,
        },
      ],
    },
    {
      code: 'wg11-narrative-writing-p07',
      title: 'A Gap in the Clouds',
      body: `(1) The forecast promised clear skies, so on Friday night the astronomy club hauled two telescopes, a cooler of cocoa, and a pile of folding chairs to the top of Harmon Hill. (2) A comet was supposed to be visible low in the western sky for one more week, and after that it would not return for thousands of years. (3) Our club president, Ines, had been talking about it since August.

(4) By nine o'clock, a bank of clouds had rolled in from the west. (5) We waited. (6) Ines kept checking the weather radar on her phone, then looking at the sky as though she could argue it open. (7) Meanwhile, my younger brother, Kofi, who had come along only because our parents insisted, fell asleep in a folding chair under two blankets.

(8) At ten-thirty, half the club packed up and left. (9) I almost went with them. (10) The telescope cost about four hundred dollars. (11) Then, just before eleven, a gap opened in the clouds, ragged at the edges, exactly where the comet should be.

(12) Ines swung the telescope toward the gap. (13) There it was: a smudge of pale green light with a faint tail spreading behind it. (14) She stepped back to let me look, and I forgot about the cold.

(15) I shook Kofi awake. (16) He looked through the eyepiece for a long time without saying a word. (17) The comet was visible.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not belong in the narrative?`,
          choices: [
            no(`sentence 6`, 'removes-character-detail'),
            no(`sentence 8`, 'removes-key-event'),
            ok(`sentence 10`),
            no(`sentence 13`, 'removes-climax'),
          ],
          solution: `The price of the telescope interrupts the tense moment between the narrator's doubt and the clouds opening. Sentence 8 should stay because the departing members raise the pressure to give up.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `The writer wants sentence 5 to slow the pacing and use sensory detail. Which revision does this best?`,
          choices: [
            ok(`We waited while the wind picked up, the cocoa went lukewarm, and the stars disappeared one by one.`),
            no(`We waited for a long time, which was very boring for everyone on the hill.`, 'tells-not-shows'),
            no(`We waited, and soon enough the comet appeared right where it was supposed to be.`, 'rushes-resolution'),
            no(`We waited, since waiting is an important part of astronomy as a science.`, 'generic-explanation'),
          ],
          solution: `The wind, cooling cocoa and vanishing stars let the reader feel time passing and hope fading. "Very boring" tells a feeling without any details to see or feel.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Why is sentence 7 important to the narrative as a whole?`,
          choices: [
            no(`It explains why the club chose Harmon Hill as its viewing spot.`, 'misreads-purpose'),
            ok(`It starts a second thread, a reluctant Kofi, that the ending resolves when he looks through the eyepiece.`),
            no(`It shows that the club members were careless about watching younger guests.`, 'unsupported-inference'),
            no(`It provides the reason that half the club decided to leave at ten-thirty.`, 'false-cause-effect'),
          ],
          solution: `Kofi begins uninterested and asleep, and in sentence 16 he stares through the eyepiece in silence, so his thread pays off in the ending. Nothing links his nap to the others leaving.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 17 as a conclusion that reflects on the experience and both plot lines?`,
          choices: [
            no(`The comet was green and had a tail, and it was in the western sky where the forecast had said it would be.`, 'restates-situation'),
            no(`Ines wrote a report about the night for the club newsletter, and it was printed the following week.`, 'ends-on-minor-thread'),
            ok(`When he finally looked up, Kofi asked if we could come back tomorrow, and I realized the clouds had made the comet worth more.`),
            no(`Comets are made of ice and dust, and their tails always point away from the sun as they travel.`, 'generic-fact-ending'),
          ],
          solution: `The correct choice resolves Kofi's thread (he now wants to return) and reflects on how the wait gave the sighting its value. The newsletter choice ends on a side detail and offers no reflection.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which revision of sentence 9 best builds tension by revealing the narrator's internal conflict?`,
          choices: [
            no(`I almost went with them, but I did not, because I stayed on the hill instead.`, 'circular-no-conflict'),
            no(`I almost went with them, and later I was glad that I had not.`, 'reveals-outcome-early'),
            no(`Some of them were in my chemistry class, and we often studied together after school.`, 'irrelevant-detail'),
            ok(`I folded my chair, then unfolded it again, telling myself I would give the sky ten more minutes.`),
          ],
          solution: `Folding and unfolding the chair shows the narrator torn between leaving and staying, and the deadline adds tension. "Later I was glad" gives away the outcome before the clouds part.`,
        },
      ],
    },
    {
      code: 'wg11-narrative-writing-p08',
      title: 'Third Gear',
      body: `(1) My grandmother, Rosalind Mbatha, has driven the same faded green pickup truck for twenty-two years, and she has never once let anyone else drive it. (2) So when she handed me the keys the summer I turned seventeen, I assumed she had made a mistake. (3) "Your mother learned in this truck," she said. (4) "So will you."

(5) The truck had a manual transmission, which meant a clutch pedal, a gearshift, and about a thousand ways to stall. (6) On the first afternoon, in the empty lot behind the feed store, I stalled eleven times. (7) Each time, the truck jolted forward and died with a shudder, and each time my grandmother simply said, "Again."

(8) That night I complained to my mother on the phone. (9) She laughed so hard she had to put the phone down. (10) Then she told me that she had stalled the same truck at a stop sign in front of the entire high school marching band.

(11) On the fourth afternoon, something changed. (12) I stopped thinking about my left foot and started listening to the engine, which rose to a hum just before it wanted to shift. (13) I eased off the clutch, pressed the gas, and the truck rolled smoothly into second gear, then third. (14) My grandmother did not say anything. (15) She just rolled down her window and rested her elbow on the door, the way she does when she is driving herself.

(16) I learned how to drive a manual transmission.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 16 as a conclusion that reflects on the experience?`,
          choices: [
            no(`A manual transmission requires the driver to use a clutch pedal and shift gears by hand.`, 'generic-fact-ending'),
            no(`After the lesson, we drove back home, parked the truck, and went inside to eat dinner.`, 'flat-ending-no-reflection'),
            ok(`I still stall sometimes, but when I do, I hear her say "Again" and know it was never a scolding but an invitation.`),
            no(`It took me four afternoons in the empty lot behind the feed store to learn how to do it.`, 'restates-situation'),
          ],
          solution: `The correct choice reflects on the meaning of the grandmother's repeated word from sentence 7. The choice about driving home lists actions but does not reflect on the experience.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `How do sentences 8 through 10 contribute to the narrative?`,
          choices: [
            no(`They interrupt the story with an unrelated memory and should be removed.`, 'misses-connection'),
            no(`They show that the narrator's mother disapproves of the driving lessons.`, 'unsupported-inference'),
            no(`They move the story ahead to the day the narrator passes the driving test.`, 'confuses-sequence'),
            ok(`They add a second plot line linking the narrator's struggle to the mother's, echoing sentence 3.`),
          ],
          solution: `The mother's own stalling story connects back to "Your mother learned in this truck" and shows struggle is part of a family pattern. Her laughter is affectionate, not disapproving, and the story is about her own lessons.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `What does sentence 15 suggest about the grandmother?`,
          choices: [
            ok(`She shows approval and trust through relaxed body language instead of words.`),
            no(`She is bored with the lesson and wants to go home as soon as possible.`, 'misreads-gesture'),
            no(`She is still nervous about letting the narrator drive her truck.`, 'contradicts-text'),
            no(`She is too hot and needs fresh air from the open window.`, 'literal-reading'),
          ],
          solution: `The writer says she sits this way "when she is driving herself," so the gesture shows she is as comfortable with the narrator driving as with driving herself. Reading it as simply needing air ignores that comparison.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `The writer wants to make sentence 2 more vivid while keeping the same point of view and purpose. Which revision does this best?`,
          choices: [
            no(`So when she handed her grandchild the keys that summer, the grandchild assumed she had made a mistake.`, 'shifts-point-of-view'),
            ok(`So when she dropped the keys into my palm the summer I turned seventeen, I stared at them as if they belonged to someone else.`),
            no(`So when she hands me the keys this summer, I will probably assume that she has made a mistake.`, 'shifts-tense'),
            no(`So when she gave me the keys, I felt something about it, and it seemed strange in some way.`, 'vague-language'),
          ],
          solution: `The correct choice keeps the first person and past tense while adding a precise action and image that show the narrator's disbelief. The first choice switches to third person, breaking the narrator's point of view.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence 7 that builds the narrator's frustration without breaking the sequence of events. Which sentence does this best?`,
          choices: [
            no(`By the fourth afternoon, I could shift into third gear without any trouble at all.`, 'breaks-sequence'),
            no(`Manual transmissions were far more common in cars sold several decades ago.`, 'irrelevant-fact'),
            no(`My grandmother had bought the truck from a neighbor the year before I was born.`, 'backstory-interrupts'),
            ok(`By the eleventh stall, my calf was trembling, and my face burned whenever someone walked out of the feed store.`),
          ],
          solution: `The trembling calf and burning face show frustration and embarrassment during the first afternoon, so the order stays intact. The fourth afternoon choice jumps ahead and gives away the resolution in sentence 13.`,
        },
      ],
    },
  ],
}

export default skill
