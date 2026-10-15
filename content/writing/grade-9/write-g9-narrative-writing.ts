import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g9-narrative-writing',
  subject: 'writing',
  grade: 9,
  group: 'Composition',
  name: 'Narrative Writing',
  standards: ['W.9-10.3'],
  passages: [
    {
      code: 'wg9-narrative-writing-p01',
      title: 'Lake Ice',
      body: `(1) For three weeks, I had been working on a blue bowl for the spring art show at Westfield High. (2) It was the first piece I had ever shaped on the pottery wheel without Mr. Adeyemi's hands steadying mine, and its walls were thin and even. (3) On Thursday, I dipped it in a glaze called Lake Ice and set it on the kiln shelf with everyone else's work.

(4) On Friday morning, the whole class crowded around the kiln as Mr. Adeyemi lifted the lid. (5) Warm air rolled out and fogged my glasses. (6) One by one, he passed out mugs, tiles, and small vases. (7) Then he held up my bowl, and the room went quiet. (8) A crack ran from the rim almost to the base, thin as a hair.

(9) "It happens," he said. (10) "Clay remembers everything, even an air bubble you never saw." (11) I wanted to drop the bowl in the trash and walk out of the room. (12) Instead, I turned it slowly in my hands and noticed how the glaze had pooled inside the crack, turning it a deeper blue than the rest of the bowl. (13) The art room also has a supply closet full of paint, yarn, and old magazines.

(14) That weekend, I wrote a small card to sit beside the bowl at the show. (15) It said, "Lake Ice, with one fault line." (16) The show was on Tuesday.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not belong in the story?`,
          choices: [
            no(`sentence 5`, 'removes-sensory-detail'),
            no(`sentence 10`, 'removes-dialogue'),
            ok(`sentence 13`),
            no(`sentence 15`, 'removes-resolution'),
          ],
          solution: `Sentence 13 describes a supply closet that has nothing to do with the cracked bowl. Sentence 10 should stay because the teacher's words explain the crack and hint that a flaw can carry meaning.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 16 as a conclusion that reflects on the experience?`,
          choices: [
            no(`The art show had paintings, drawings, and photographs from every grade in the school.`, 'generic-fact-ending'),
            no(`I had spent three weeks working on the bowl before it went into the kiln.`, 'restates-situation'),
            ok(`At the show, people stopped longest at my bowl, and I stopped wishing the crack away.`),
            no(`After the show, I wrapped the bowl in newspaper and carried it home on the bus.`, 'flat-ending-no-reflection'),
          ],
          solution: `The correct choice shows how the narrator's feelings about the crack changed, which completes the story. Wrapping the bowl in newspaper is an action that offers no reflection.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `What is the main purpose of the word "Instead" at the beginning of sentence 12?`,
          choices: [
            ok(`It signals that the narrator chose a different reaction from the one described in sentence 11.`),
            no(`It shows that time has passed since the class opened the kiln.`, 'misreads-time-order'),
            no(`It introduces a new character who helps the narrator fix the bowl.`, 'invents-character'),
            no(`It shows that the crack was caused by the glaze the narrator chose.`, 'confuses-cause-effect'),
          ],
          solution: `"Instead" contrasts the urge to throw the bowl away in sentence 11 with the narrator looking at it more closely. The word marks a change in reaction, not a jump in time.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `How do sentences 6 and 7 affect the pacing of the scene at the kiln?`,
          choices: [
            no(`They speed the story up by skipping ahead to the day of the art show.`, 'misreads-pacing-speed'),
            ok(`They build suspense by showing the other pieces first and then pausing on the narrator's bowl.`),
            no(`They slow the story down by explaining how a kiln heats clay.`, 'misidentifies-content'),
            no(`They use dialogue to reveal how the other students felt about their work.`, 'no-dialogue-present'),
          ],
          solution: `Handing out the other pieces one by one delays the moment the bowl appears, and the quiet room in sentence 7 makes readers wait for the reveal. The sentences contain no dialogue and no explanation of how a kiln works.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `How does the card described in sentence 15 develop the narrator's point of view?`,
          choices: [
            no(`It shows that the narrator wants to hide the crack from the people at the show.`, 'contradicts-text'),
            no(`It shows that the narrator blames Mr. Adeyemi for the damage to the bowl.`, 'unsupported-inference'),
            no(`It explains the scientific reason that air bubbles cause clay to crack.`, 'misidentifies-purpose'),
            ok(`It shows that the narrator now treats the crack as part of the bowl's identity rather than a mistake.`),
          ],
          solution: `By naming the bowl "with one fault line," the narrator presents the crack openly, which shows acceptance. The card points the crack out, so it cannot mean the narrator is hiding it.`,
        },
      ],
    },
    {
      code: 'wg9-narrative-writing-p02',
      title: 'The Shell in the Shale',
      body: `(1) Our earth science class spent the last Friday of September at Pell Creek, where a road crew had cut through a hillside and left layers of gray shale exposed. (2) Ms. Castellano gave each pair of students a rock hammer, a soft brush, and one rule. (3) "Tap, don't smash," she said. (4) My partner, Rafi Nakamura, split rocks quickly and found three shell fossils in the first hour. (5) I found mud.

(6) By lunch, I was tired of mud. (7) I sat on a flat slab to eat my sandwich, and that was when I noticed the ridges under my hand. (8) They were thin and curved, like the ribs of a tiny fan. (9) I brushed away the dust, and a whole shell appeared, wider than my palm. (10) Lunch in our school cafeteria is usually pizza on Fridays.

(11) "Rafi," I whispered, as if the shell might hear me and disappear. (12) He looked over, and his eyebrows shot up. (13) Ms. Castellano knelt beside the slab with a hand lens. (14) She said it was a brachiopod, an animal that had lived in a shallow sea that once covered the valley. (15) She said it was about four hundred million years old.

(16) We photographed the slab, measured it, and left it where it was, because the site belonged to the state. (17) It was a good field trip.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it interrupts the story?`,
          choices: [
            no(`sentence 5`, 'removes-key-problem'),
            no(`sentence 8`, 'removes-sensory-detail'),
            no(`sentence 12`, 'removes-character-reaction'),
            ok(`sentence 10`),
          ],
          solution: `Sentence 10 tells what the cafeteria serves on Fridays, which has nothing to do with the field trip. Sentence 5 must stay because it sets up the narrator's frustration before the discovery.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 17 to give the story a stronger ending?`,
          choices: [
            ok(`On the bus home, I kept staring at the photo, amazed that I had spent all morning searching for something I ended up sitting on.`),
            no(`Pell Creek is about forty minutes from our school, so the bus ride took most of the afternoon.`, 'generic-fact-ending'),
            no(`Rafi found three shell fossils in the first hour, and I found only mud that morning.`, 'restates-situation'),
            no(`When we got back to school, we returned the rock hammers and brushes to the supply room.`, 'flat-ending-no-reflection'),
          ],
          solution: `The correct choice reflects on the surprise of the discovery and ties back to the narrator's long, empty morning. Returning the tools is an action that does not reflect on the experience.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `The writer wants to revise sentences 14 and 15 to use dialogue. Which revision does this best?`,
          choices: [
            no(`She told us what it was and how old it was, and we were both surprised.`, 'removes-key-detail'),
            ok(`"A brachiopod," she said. "It lived in a shallow sea that covered this valley about four hundred million years ago."`),
            no(`Brachiopods lived in shallow seas, and many of them lived about four hundred million years ago.`, 'no-dialogue-present'),
            no(`I asked her what it was, and she told me that it was very old and from the sea.`, 'vague-summary'),
          ],
          solution: `The correct revision turns the teacher's explanation into her own spoken words while keeping every detail. The other choices still summarize what she said instead of letting readers hear her.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `What is the effect of the short sentence "I found mud" in sentence 5?`,
          choices: [
            no(`It tells readers that the field trip was canceled because of rain.`, 'literal-reading'),
            no(`It shows that Rafi was a better student than the narrator in every class.`, 'overgeneralizes'),
            ok(`It creates a blunt contrast with Rafi's success and shows the narrator's frustration.`),
            no(`It shifts the story from the narrator's point of view to Rafi's point of view.`, 'false-pov-shift'),
          ],
          solution: `Placed right after Rafi's three fossils, the three-word sentence sharply shows how little the narrator had found. Nothing in the text says it rained or that the trip was canceled.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Which sentence marks the turning point of the narrative?`,
          choices: [
            no(`sentence 4`, 'mistakes-setup-for-turn'),
            ok(`sentence 7`),
            no(`sentence 13`, 'mistakes-reaction-for-turn'),
            no(`sentence 16`, 'mistakes-resolution-for-turn'),
          ],
          solution: `In sentence 7, the narrator stops searching and notices the ridges, which changes the story from frustration to discovery. Sentence 13 is a reaction to a discovery that has already happened.`,
        },
      ],
    },
    {
      code: 'wg9-narrative-writing-p03',
      title: 'The Letter in the Ledger',
      body: `(1) Last summer, I volunteered at the Dunmore County Historical Society, scanning old store ledgers so researchers could read them online. (2) The work was slow. (3) Each page had to be laid flat, scanned, checked, and turned with cotton gloves. (4) Mrs. Halvorsen, the director, said patience was the only skill the job required.

(5) On my third Tuesday, I opened a ledger from 1912, and a folded letter slid out onto the table. (6) The paper was the color of weak tea, and the ink had faded to brown. (7) It was written by a girl named Lotte to her older brother, who had moved west to work for a railroad. (8) She described the new schoolhouse, a calf born during a snowstorm, and the price of flour at the store. (9) Flour is made by grinding wheat or other grains into a fine powder.

(10) I called Mrs. Halvorsen over. (11) She read the letter twice without speaking. (12) Then she said, "Someone used this as a bookmark and forgot it for over a century." (13) We searched the society's records that afternoon and found Lotte's name in a census from 1920. (14) She had become a teacher in the same schoolhouse she had described to her brother.

(15) Today, the letter rests in a clear sleeve in the front case of the museum. (16) Then I went back to scanning.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it adds information that does not fit the story?`,
          choices: [
            no(`sentence 3`, 'removes-pacing-detail'),
            ok(`sentence 9`),
            no(`sentence 11`, 'removes-character-reaction'),
            no(`sentence 14`, 'removes-resolution'),
          ],
          solution: `Sentence 9 explains how flour is made, which pulls the reader away from the discovery of the letter. Sentence 14 should stay because it reveals what happened to Lotte, a key payoff of the story.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 16 as the conclusion?`,
          choices: [
            no(`The historical society is open to visitors on weekends and most holidays.`, 'generic-fact-ending'),
            no(`Then I took off my cotton gloves and went home for the rest of the day.`, 'flat-ending-no-reflection'),
            no(`The letter was written in 1912 by a girl whose brother worked for a railroad.`, 'restates-situation'),
            ok(`I still scan pages slowly, but now I check every one twice, wondering whose story might be folded inside.`),
          ],
          solution: `The correct choice shows how the discovery changed the way the narrator thinks about the job. Going home is an action that gives no sense of what the experience meant.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `What does the description in sentence 6 add to the narrative?`,
          choices: [
            ok(`It uses visual details to help readers see how old and fragile the letter is.`),
            no(`It explains why Lotte's brother decided to move west for work.`, 'confuses-cause-effect'),
            no(`It shows that the narrator damaged the letter while scanning it.`, 'unsupported-inference'),
            no(`It speeds up the story by skipping over the narrator's reaction.`, 'misreads-pacing-speed'),
          ],
          solution: `Comparing the paper to weak tea and noting the faded ink lets readers picture a very old letter. Nothing in the sentence suggests the narrator damaged it.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `The writer wants to add a sentence after sentence 4 that shows the narrator's attitude toward the job before the discovery. Which sentence does this best?`,
          choices: [
            no(`The ledgers listed what customers bought, such as nails, sugar, and lamp oil.`, 'detail-without-feeling'),
            ok(`By the end of my second week, I was starting to doubt that anything interesting would ever turn up.`),
            no(`The historical society keeps its oldest records in a room with a cool, steady temperature.`, 'off-topic-detail'),
            no(`Mrs. Halvorsen has worked at the historical society for more than twenty years.`, 'focuses-wrong-character'),
          ],
          solution: `The correct sentence reveals the narrator's boredom, which makes the surprise of the letter stronger. The ledger contents describe the job but show no feeling about it.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `How do sentences 2 and 3 work together to shape the pacing of the story?`,
          choices: [
            no(`They use dialogue to show how Mrs. Halvorsen trained the volunteers.`, 'no-dialogue-present'),
            no(`They jump forward in time to the moment the letter is found.`, 'misreads-time-order'),
            ok(`The short statement and the list of repeated steps create a slow routine that makes the discovery stand out.`),
            no(`They explain why the ledgers had to be scanned before they fell apart.`, 'unsupported-inference'),
          ],
          solution: `Sentence 2 states the work was slow, and sentence 3 lists each careful step, so readers feel the routine before the letter interrupts it. Neither sentence contains dialogue or a jump in time.`,
        },
      ],
    },
    {
      code: 'wg9-narrative-writing-p04',
      title: 'Point Fifteen',
      body: `(1) The score was tied at fourteen, and the next point would decide the city ultimate championship. (2) I was the smallest player on the Harbor Street team, and for most of the season I had watched big games from the sideline. (3) Coach Ibarra pointed at me and said, "You're in for Dev." (4) My legs felt like they were filled with sand.

(5) We lined up on our goal line while the other team waited across the field. (6) The pull, a long throw that starts every point, floated high and landed near our end zone. (7) Our handler, Kalani, picked up the disc and looked for an open teammate. (8) For the first few passes, I mostly tried to stay out of the way. (9) Then I noticed that the defender guarding me kept watching the disc instead of me.

(10) I faked a step toward the sideline, then sprinted deep. (11) Kalani saw me and let the disc go, a long, curving throw that hung in the air for what felt like a full minute. (12) The wind pushed it left, and I adjusted, my cleats tearing at the grass. (13) I jumped, and the disc smacked into both of my hands just inside the end zone line. (14) My teammates rushed onto the field before my feet even touched the ground.

(15) Ultimate is played with seven players on each side of the field. (16) After the trophy photos, Coach Ibarra handed me the game disc, and I ran my thumb along the scuffs on its edge.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not move the story forward?`,
          choices: [
            no(`sentence 4`, 'removes-internal-reaction'),
            no(`sentence 9`, 'removes-turning-detail'),
            no(`sentence 12`, 'removes-pacing-detail'),
            ok(`sentence 15`),
          ],
          solution: `Sentence 15 is a general rule of the sport placed right after the winning catch, so it breaks the moment. Sentence 9 must stay because it shows the opening that lets the narrator get free.`,
        },
        {
          slot: 17,
          difficulty: 'medium',
          stem: `What is the effect of the phrase "for what felt like a full minute" in sentence 11?`,
          choices: [
            no(`It tells readers exactly how long the throw stayed in the air.`, 'literal-reading'),
            ok(`It stretches out a few seconds to show the narrator's suspense as the disc flies.`),
            no(`It speeds up the story by skipping ahead to the end of the game.`, 'misreads-pacing-speed'),
            no(`It shows that Kalani threw the disc poorly and too slowly.`, 'unsupported-inference'),
          ],
          solution: `The phrase exaggerates how long the throw lasted to show how slowly time seemed to pass for the narrator. It is not a literal measurement, since no throw would actually hang for a minute.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Why does the writer include the phrase "a long throw that starts every point" in sentence 6?`,
          choices: [
            no(`To show that the other team made a mistake on the throw`, 'unsupported-inference'),
            no(`To introduce a flashback to an earlier game in the season`, 'misreads-time-order'),
            ok(`To explain a sports term for readers who may not know the game`),
            no(`To reveal the narrator's feelings about entering the game`, 'misidentifies-purpose'),
          ],
          solution: `The phrase defines "pull" so readers unfamiliar with ultimate can follow the action. It describes the throw itself and says nothing about the narrator's feelings, which appear in sentence 4.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 16, would best conclude the story by connecting to its beginning?`,
          choices: [
            ok(`For the first time all season, I did not feel like the player who watched big games from the sideline.`),
            no(`The championship game was held at Riverside Park, and about two hundred people came to watch.`, 'off-topic-detail'),
            no(`Kalani threw the disc, and I caught it just inside the end zone line to win the game.`, 'restates-plot'),
            no(`The other team shook our hands, and then everyone walked to the parking lot together.`, 'flat-ending-no-reflection'),
          ],
          solution: `The correct choice links back to sentence 2, where the narrator had spent the season on the sideline, and shows how that changed. Restating the catch repeats the plot without reflecting on it.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `What role does sentence 9 play in the sequence of events?`,
          choices: [
            no(`It resolves the conflict by showing the narrator scoring the winning point.`, 'mistakes-turn-for-resolution'),
            no(`It describes the setting before the point begins.`, 'misidentifies-content'),
            no(`It reveals Coach Ibarra's reason for choosing the narrator.`, 'unsupported-inference'),
            ok(`It marks the shift from the narrator avoiding the play to spotting a chance to act.`),
          ],
          solution: `Sentence 8 shows the narrator staying out of the way, and sentence 9 shows the narrator noticing the defender's mistake, which leads to the cut in sentence 10. The point is not won until sentence 13.`,
        },
      ],
    },
    {
      code: 'wg9-narrative-writing-p05',
      title: 'Off by One Hour',
      body: `(1) For two months, I had been building an app that showed when city buses would reach the stop outside Lakeview High. (2) The idea came from a cold morning in January, when I waited forty minutes for a bus that had already passed. (3) Demo night for the coding club was Thursday at seven, and parents, teachers, and two people from the city transit office had promised to come.

(4) At six fifteen, I opened the app for one last test. (5) Every arrival time was wrong by exactly one hour. (6) My stomach dropped. (7) I scrolled through hundreds of lines of code while the gym filled with folding chairs and the smell of popcorn. (8) My laptop has a sticker of a cartoon octopus on the lid.

(9) My friend Priyanka leaned over my shoulder. (10) "When did the clocks change?" she asked. (11) I stared at her. (12) Daylight saving time had started on Sunday, and my code still used the old setting. (13) I changed one number, saved the file, and refreshed the screen. (14) The 6:42 bus appeared at 6:42.

(15) At seven, I stood at the front of the gym with my laptop connected to the projector. (16) My voice shook at first, but it steadied once the map appeared and the little bus icons began to crawl along the streets.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it distracts from the problem in the story?`,
          choices: [
            no(`sentence 6`, 'removes-internal-reaction'),
            ok(`sentence 8`),
            no(`sentence 11`, 'removes-character-reaction'),
            no(`sentence 14`, 'removes-resolution'),
          ],
          solution: `The octopus sticker has nothing to do with the bug or the demo, so it interrupts the rising tension. Sentence 14 should stay because it shows the bug is fixed.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 16, would best conclude the narrative with a reflection?`,
          choices: [
            no(`The demo lasted about ten minutes, and then the next club member set up a project.`, 'flat-ending-no-reflection'),
            ok(`I had spent two months writing code, but the bug that nearly ruined the night was solved by one good question.`),
            no(`Daylight saving time moves the clocks forward by one hour every spring.`, 'generic-fact-ending'),
            no(`The app showed when city buses would reach the stop outside Lakeview High.`, 'restates-situation'),
          ],
          solution: `The correct choice reflects on what the narrator learned from Priyanka's question in sentence 10. The other choices report events or facts without showing what the night meant.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `What is the main purpose of sentence 2?`,
          choices: [
            no(`It describes the gym where the demo takes place.`, 'misidentifies-setting'),
            no(`It introduces the bug that the narrator must fix.`, 'misreads-time-order'),
            no(`It shows why the transit office decided to attend the demo.`, 'unsupported-inference'),
            ok(`It gives background that explains why the narrator built the app.`),
          ],
          solution: `Sentence 2 recalls a frustrating wait at a bus stop, which gives the narrator's reason for the project. The bug does not appear until sentence 5.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `How does the detail about the gym in sentence 7 affect the story?`,
          choices: [
            ok(`It shows time running out as the audience arrives, which raises the pressure on the narrator.`),
            no(`It explains how the narrator found the mistake in the code.`, 'confuses-cause-effect'),
            no(`It shifts the story to a new setting several days later.`, 'misreads-time-order'),
            no(`It shows that the narrator would rather eat popcorn than fix the app.`, 'literal-reading'),
          ],
          solution: `While the narrator searches the code, the chairs and popcorn signal that the demo is about to begin, so tension builds. The mistake is found later, after Priyanka's question.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Why is it effective that Priyanka asks a question in sentence 10 rather than explaining the problem?`,
          choices: [
            no(`It shows that Priyanka does not understand how the app works.`, 'unsupported-inference'),
            no(`It shifts the point of view so the rest of the story is told by Priyanka.`, 'false-pov-shift'),
            ok(`It lets readers figure out the cause along with the narrator, making the discovery in sentence 12 more satisfying.`),
            no(`It slows the story down with a long description of daylight saving time.`, 'misreads-pacing-speed'),
          ],
          solution: `The question hints at the answer, and the pause in sentence 11 lets readers make the connection just as the narrator does. The narrator, not Priyanka, continues telling the story.`,
        },
      ],
    },
    {
      code: 'wg9-narrative-writing-p06',
      title: 'Sale in the Community Room',
      body: `(1) Every June, the Friends of the Ashby Library hold a book sale on the front lawn, and this year I was in charge of the children's tables. (2) I had spent two Saturdays sorting picture books, chapter books, and comics into labeled boxes. (3) At eight in the morning, the sky was clear. (4) By eight thirty, it was not.

(5) The first raindrops tapped on the canvas awnings, and then the storm arrived all at once. (6) Volunteers grabbed boxes and ran for the doors. (7) Mr. Osei, who organized the sale, stood on the library steps holding a soggy sign. (8) "We can't sell wet books," he said. (9) I looked through the window at the library's community room, which was empty except for stacked chairs.

(10) "What if we move everything inside?" I asked. (11) He hesitated, then nodded. (12) For the next hour, a line of volunteers passed boxes hand to hand from the lawn to the community room. (13) The library was built in 1923 with money raised by local families. (14) We pushed tables against the walls and taped the labels back on.

(15) At ten o'clock, we opened the doors. (16) Families shook off their umbrellas and came in, and the room filled with the sound of children reading titles aloud to each other. (17) We sold more books than the year before.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not belong in the story?`,
          choices: [
            no(`sentence 2`, 'removes-background'),
            no(`sentence 8`, 'removes-dialogue'),
            ok(`sentence 13`),
            no(`sentence 16`, 'removes-sensory-detail'),
          ],
          solution: `Sentence 13 gives a fact about the library's history in the middle of the rush to move the sale. Sentence 8 should stay because it states the problem the narrator solves.`,
        },
        {
          slot: 27,
          difficulty: 'easy',
          stem: `Which detail in sentence 16 most helps readers hear the scene?`,
          choices: [
            no(`families shook off their umbrellas`, 'confuses-sight-sound'),
            no(`came in`, 'action-not-sensory'),
            ok(`the sound of children reading titles aloud`),
            no(`the room filled`, 'too-vague'),
          ],
          solution: `Children reading titles aloud is a sound readers can imagine hearing. Shaking off umbrellas is something readers would mainly see.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `What is the effect of placing the short sentences 3 and 4 side by side?`,
          choices: [
            ok(`The sudden contrast signals that something has gone wrong and creates a shift in the story.`),
            no(`They slow the story down with detailed description of the weather.`, 'misreads-pacing-speed'),
            no(`They explain why the sale was held outside on the lawn.`, 'confuses-cause-effect'),
            no(`They show that the narrator arrived at the sale half an hour late.`, 'unsupported-inference'),
          ],
          solution: `"The sky was clear" followed by "it was not" quickly turns a calm morning into a problem, which pulls readers into the storm. The sentences are brief, not detailed, and say nothing about the narrator being late.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 17 as a conclusion that reflects on the experience?`,
          choices: [
            no(`The Friends of the Ashby Library hold the sale every June to raise money.`, 'restates-situation'),
            no(`After the sale, we folded the tables and carried the empty boxes to the recycling bin.`, 'flat-ending-no-reflection'),
            ok(`I had planned every box for a sunny lawn, but the best part of the day came from a plan made in the rain.`),
            no(`Rain is common in June because warm, moist air rises and forms storm clouds.`, 'generic-fact-ending'),
          ],
          solution: `The correct choice contrasts the narrator's careful preparation in sentence 2 with the quick idea in sentence 10, showing what the day meant. Folding tables is an action, not a reflection.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which revision of sentence 9 best shows the narrator's thinking as the idea forms?`,
          choices: [
            no(`I looked through the window at the library's community room, which had gray carpet and tall windows.`, 'detail-without-purpose'),
            ok(`I looked through the window at the library's community room, empty except for stacked chairs, and started counting how many tables could fit along its walls.`),
            no(`I looked through the window at the library's community room, and I felt very sad about the rain.`, 'tells-not-shows'),
            no(`I looked through the window at the library's community room, where the library holds meetings every month.`, 'off-topic-detail'),
          ],
          solution: `Counting tables shows the narrator already planning the move, which leads naturally to the question in sentence 10. Describing the carpet adds detail but does not reveal any thinking.`,
        },
      ],
    },
    {
      code: 'wg9-narrative-writing-p07',
      title: 'Control Six',
      body: `(1) My first orienteering meet took place in Greystone State Forest on a cool October morning. (2) Each runner got a map, a compass, and a list of ten control points, which were orange and white flags hidden among the trees. (3) The goal was to find all ten in order as quickly as possible. (4) I had practiced reading maps in our school gym, but the gym did not have hills.

(5) The first four controls went smoothly. (6) I followed a stream to control five and found the flag beside a fallen oak. (7) At control six, everything changed. (8) The map showed a small pond, but in front of me was only a muddy field of reeds. (9) I turned in a slow circle. (10) Every tree looked like every other tree.

(11) I could have kept running and hoped to get lucky. (12) Instead, I sat on a stump, took a breath, and laid the map flat on my knee. (13) I lined the compass up with north and traced my route from control five. (14) That was when I realized the dry summer had shrunk the pond to mud. (15) I was in the right place after all. (16) The flag was hanging on a birch tree twenty steps away.

(17) Some people prefer hiking because it is more relaxing than racing. (18) I finished the course.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not fit the narrative?`,
          choices: [
            no(`sentence 4`, 'removes-foreshadowing'),
            no(`sentence 10`, 'removes-internal-reaction'),
            no(`sentence 14`, 'removes-key-realization'),
            ok(`sentence 17`),
          ],
          solution: `Sentence 17 is a general opinion about hiking that has nothing to do with the narrator's race. Sentence 14 must stay because it explains why the pond was missing.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `What is the main purpose of sentence 7?`,
          choices: [
            no(`It describes the forest so readers can picture the setting.`, 'misidentifies-content'),
            ok(`It acts as a transition that signals the start of the narrator's problem.`),
            no(`It shows that the narrator gave up and left the course.`, 'contradicts-text'),
            no(`It jumps back in time to the practice sessions in the gym.`, 'misreads-time-order'),
          ],
          solution: `After four smooth controls, sentence 7 warns readers that trouble is coming, and sentence 8 reveals the missing pond. The narrator does not quit, since the flag is found in sentence 16.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `How do sentences 9 and 10 help develop the narrator's experience?`,
          choices: [
            no(`They explain how to use a compass to find north.`, 'misidentifies-purpose'),
            no(`They show that the narrator has found control six.`, 'misreads-time-order'),
            ok(`They show the narrator's confusion by describing what it feels like to be lost.`),
            no(`They introduce another runner who helps the narrator.`, 'invents-character'),
          ],
          solution: `Turning in a circle and seeing trees that all look alike show that the narrator feels lost. The flag is not found until sentence 16, and no other runner appears.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 18 by connecting the ending to the choice the narrator makes in sentences 11 and 12?`,
          choices: [
            no(`I finished the course in fifty-two minutes and then ate an orange at the finish tent.`, 'flat-ending-no-reflection'),
            no(`I finished the course after finding all ten control points in the forest.`, 'restates-plot'),
            no(`I finished the course, and next year the meet will be held in a different forest.`, 'off-topic-detail'),
            ok(`I finished in the middle of the results list, but I left knowing that stopping to think can be faster than running in circles.`),
          ],
          solution: `The correct choice reflects on the narrator's decision to sit down and read the map instead of running and hoping. The choice about the finish time adds detail but no reflection on that decision.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `How does sentence 4 prepare readers for later events in the story?`,
          choices: [
            ok(`It hints that indoor practice may not be enough, which sets up the narrator getting lost in real terrain.`),
            no(`It shows that the narrator is an expert runner who will win the meet.`, 'contradicts-text'),
            no(`It explains that the meet was moved indoors because of bad weather.`, 'literal-reading'),
            no(`It introduces the conflict between the narrator and a rival runner.`, 'invents-conflict'),
          ],
          solution: `By noting that the gym had no hills, sentence 4 suggests the narrator is not fully ready for the forest, which foreshadows the trouble at control six. The meet clearly takes place outdoors in a state forest.`,
        },
      ],
    },
    {
      code: 'wg9-narrative-writing-p08',
      title: 'Three Steps on an Index Card',
      body: `(1) My grandmother, whom everyone calls Lola, had owned a tablet for a year and used it only as a very expensive clock. (2) In May, my cousin Marisol was graduating from college in another state, and Lola could not make the long trip. (3) The ceremony would be shown online, and the family decided I would be the one to teach Lola how to watch it and call in afterward.

(4) Our first lesson did not go well. (5) Lola tapped the screen so hard that she opened four apps at once. (6) "This machine does not like me," she said, frowning at it. (7) I tried to explain everything at once: the camera, the microphone, the volume, and the link. (8) By the end of the afternoon, we were both tired, and she had not made a single call.

(9) The next Sunday, I tried a different plan. (10) I wrote three steps on an index card in large letters and taped it to the kitchen table. (11) We practiced only the first step until she could do it without looking at the card. (12) Then we added the second step, and later the third. (13) On the fourth Sunday, she called me from her bedroom while I sat in the kitchen, and her laughing face filled my screen.

(14) On graduation day, Lola watched the whole ceremony, and when Marisol crossed the stage, she waved at the tablet as if Marisol could see her. (15) The tablet's battery lasts for about ten hours on a full charge.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not develop the story?`,
          choices: [
            no(`sentence 5`, 'removes-key-problem'),
            no(`sentence 9`, 'removes-transition'),
            no(`sentence 12`, 'removes-sequence-step'),
            ok(`sentence 15`),
          ],
          solution: `The battery fact in sentence 15 adds nothing to the story about Lola learning to use the tablet. Sentence 9 should stay because it signals the shift to a new plan.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `What is the main purpose of sentence 9?`,
          choices: [
            no(`It describes the kitchen where the lessons take place.`, 'misidentifies-content'),
            no(`It shows that Lola decided to stop taking lessons.`, 'contradicts-text'),
            ok(`It moves the story forward in time and signals a change in the narrator's approach.`),
            no(`It jumps back to explain why Lola bought the tablet.`, 'misreads-time-order'),
          ],
          solution: `"The next Sunday" shifts the time, and "a different plan" tells readers the narrator will try something new after the failed first lesson. Lola keeps practicing, so she did not quit.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `What does the dialogue in sentence 6 reveal about Lola?`,
          choices: [
            ok(`She is frustrated with the tablet but expresses it with a bit of humor.`),
            no(`She believes the tablet is broken and wants a new one.`, 'literal-reading'),
            no(`She is angry at the narrator for being a poor teacher.`, 'unsupported-inference'),
            no(`She already knows how to use the camera and microphone.`, 'contradicts-text'),
          ],
          solution: `Saying the machine "does not like me" shows frustration in a playful way, as if the tablet had feelings. Nothing suggests Lola thinks it is broken or blames the narrator.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence 14, would best conclude the narrative with a reflection?`,
          choices: [
            no(`After the ceremony, Marisol called Lola and thanked her for watching from home.`, 'flat-ending-no-reflection'),
            ok(`Teaching Lola taught me something too: a hard task gets easier when you stop rushing and take it one step at a time.`),
            no(`Many colleges now show their graduation ceremonies online for family members who live far away.`, 'generic-fact-ending'),
            no(`Lola had owned the tablet for a year before she learned how to use it to make calls.`, 'restates-situation'),
          ],
          solution: `The correct choice reflects on the lesson behind the index card, linking the ending to the change between the first and later lessons. Marisol's phone call adds an event but no reflection.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Why does the writer contrast sentence 7 with sentences 10 through 12?`,
          choices: [
            no(`To show that Lola learned faster when the narrator explained more information at once`, 'contradicts-text'),
            no(`To show that the index card was more expensive than the tablet`, 'literal-reading'),
            no(`To shift the point of view from the narrator to Lola`, 'false-pov-shift'),
            ok(`To show that breaking the task into small steps is what finally led to Lola's success`),
          ],
          solution: `Explaining everything at once in sentence 7 fails, while teaching one step at a time in sentences 10 through 12 leads to the successful call in sentence 13. The first choice reverses what happened.`,
        },
      ],
    },
  ],
}

export default skill
