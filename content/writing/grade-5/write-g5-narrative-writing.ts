import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g5-narrative-writing',
  subject: 'writing',
  grade: 5,
  group: 'Composition',
  name: 'Narrative Writing',
  standards: ['W.5.3'],
  passages: [
    {
      code: 'wg5-narrative-writing-p01',
      title: 'My First Clay Cup',
      body: `(1) On Saturday morning, my aunt Rosalind took me to a pottery studio for my first lesson. (2) The room smelled like wet earth, and shelves of drying bowls lined every wall. (3) The teacher, Mr. Okafor, showed me how to press a lump of clay onto the center of the wheel. (4) I pushed the pedal, and the wheel began to spin. (5) My clay wobbled and fell to one side. (6) Clay is a kind of soil made of tiny bits of rock. (7) I tried again, but the clay slid off the wheel and landed with a splat. (8) "Keep your elbows on your knees," Mr. Okafor said. "Hold your hands still and let the wheel do the work."

(9) I took a deep breath and tucked my elbows in tight. (10) The clay rose slowly between my fingers like a tiny tower. (11) I pressed my thumbs into the top and opened it into a small cup.

(12) Then we cleaned up.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not fit the events of the story?`,
          choices: [
            no(`sentence 2`, 'removes-setting-detail'),
            ok(`sentence 6`),
            no(`sentence 8`, 'removes-key-dialogue'),
            no(`sentence 10`, 'removes-key-event'),
          ],
          solution: `Sentence 6 is a science fact about clay, and it interrupts the moment when the narrator is struggling at the wheel. Sentence 8 must stay because Mr. Okafor's advice is what helps the narrator succeed.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which phrase would best begin sentence 7 to show the order of events?`,
          choices: [
            no(`For example,`, 'example-not-time'),
            ok(`A moment later,`),
            no(`In conclusion,`, 'ending-word-in-middle'),
            no(`On the other hand,`, 'contrast-not-time'),
          ],
          solution: `"A moment later" tells the reader that the second try happened right after the first one. "For example" is used to give an example, not to move the story forward in time.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which revision of sentence 5 uses the most precise description to show what happened to the clay?`,
          choices: [
            no(`My clay did something strange and did not work well.`, 'vague-language'),
            no(`My clay, which was on the wheel, moved in a way.`, 'vague-language'),
            ok(`My clay wobbled like jelly, then sagged and flopped onto its side.`),
            no(`My clay was from the pottery studio on Saturday.`, 'repeats-old-detail'),
          ],
          solution: `Exact verbs like "sagged" and "flopped" and the comparison to jelly help the reader picture the clay. The choice about the studio on Saturday repeats information from sentence 1 and does not describe the clay at all.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 12 as a conclusion that follows from the events?`,
          choices: [
            no(`People have been making pots from clay for thousands of years.`, 'generic-fact-ending'),
            no(`My aunt Rosalind took me to a pottery studio on Saturday.`, 'restates-situation'),
            ok(`Holding my lopsided little cup, I knew that staying calm had made all the difference.`),
            no(`The next week, I signed up for a painting class at the library.`, 'starts-new-event'),
          ],
          solution: `This ending connects to the turning point in sentences 8 and 9, when the narrator calms down and keeps still. The sentence about Aunt Rosalind only repeats the opening and does not wrap up what happened.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence 7 that shows the narrator's feelings and keeps the same point of view. Which sentence does this best?`,
          choices: [
            ok(`My cheeks burned, and I wondered if I would ever get it right.`),
            no(`The narrator felt embarrassed and wanted to give up on pottery.`, 'shifts-point-of-view'),
            no(`Mr. Okafor secretly thought I was the worst student he had ever had.`, 'narrator-knows-others-thoughts'),
            no(`Pottery wheels have been used in many countries for a very long time.`, 'off-topic-fact'),
          ],
          solution: `The story is told by "I," so the narrator should share their own feelings, as this choice does with burning cheeks and a worried thought. The choice using "the narrator" switches to an outside point of view, and a first person narrator cannot know Mr. Okafor's secret thoughts.`,
        },
      ],
    },
    {
      code: 'wg5-narrative-writing-p02',
      title: 'Where Is Pepper?',
      body: `(1) On a windy Tuesday afternoon, our neighbor Mrs. Delgado knocked on our door. (2) Her orange cat, Pepper, had slipped outside while she carried in the groceries. (3) My brother Theo and I promised to help her look. (4) We checked under the porch, behind the recycling bins, and inside the empty flowerpots. (5) Theo shook a bag of cat treats while I called Pepper's name. (6) We searched for a long time.

(7) Then I heard a tiny meow coming from above our heads. (8) Pepper was sitting on a high branch of the maple tree, looking very proud of herself. (9) Theo ran home for the step ladder, and Dad came out to hold it steady. (10) I climbed up three steps and held out a treat. (11) Pepper sniffed it, then crept down into my arms.

(12) Mrs. Delgado hugged Pepper tightly. (13) That is what happened.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which revision of sentence 6 tells most clearly how much time passed?`,
          choices: [
            ok(`We searched until the streetlights flickered on.`),
            no(`We searched for a really, really long time.`, 'vague-language'),
            no(`We searched, and it was very hard to do.`, 'vague-language-telling'),
            no(`We searched because Pepper was lost.`, 'cause-not-time'),
          ],
          solution: `Streetlights flickering on is a concrete detail that shows hours have passed and evening has come. Adding "really, really" still leaves the amount of time vague.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `The writer wants to add dialogue after sentence 12 to show how Mrs. Delgado feels. Which choice does this best?`,
          choices: [
            no(`"Do you two like orange cats?" she asked.`, 'dialogue-no-purpose'),
            ok(`"Thank you both so much," she said, her voice shaking. "I was so worried."`),
            no(`"I bought apples at the store today," she said.`, 'dialogue-off-focus'),
            no(`"Pepper is still lost somewhere," she said sadly.`, 'contradicts-events'),
          ],
          solution: `Her thanks and her shaking voice show relief after a scary afternoon. The choice saying Pepper is still lost does show a feeling, but it contradicts sentence 11, where Pepper is safely found.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which word or phrase would best begin sentence 4 to show the order of events?`,
          choices: [
            no(`On the other hand,`, 'contrast-not-time'),
            no(`In conclusion,`, 'ending-word-in-middle'),
            ok(`First,`),
            no(`Instead,`, 'contrast-not-time'),
          ],
          solution: `"First" shows that checking the porch, bins, and flowerpots was the start of the search. "Instead" would suggest the children did something different from what they promised, which is not true.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 13 as a conclusion?`,
          choices: [
            no(`Many cats like to climb trees and sit up high.`, 'generic-fact-ending'),
            no(`The next week, our family adopted a puppy named Rocket.`, 'starts-new-event'),
            no(`Mrs. Delgado knocked on our door on a windy Tuesday.`, 'restates-situation'),
            ok(`As Theo and I walked home, we agreed that sometimes the answer is right above your head.`),
          ],
          solution: `This ending grows out of the events, since Pepper was finally found up in the tree. The choice about Mrs. Delgado knocking only repeats sentence 1 and does not close the story.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence between sentences 7 and 8 to slow down the most exciting moment. Which sentence does this best?`,
          choices: [
            no(`Cats can hear many sounds that people cannot hear.`, 'off-topic-fact'),
            ok(`I froze, tipped my head back, and searched the leaves until I spotted a flash of orange.`),
            no(`Earlier that morning, I had eaten oatmeal for breakfast.`, 'breaks-sequence'),
            no(`Then we found Pepper and took her home.`, 'rushes-pacing'),
          ],
          solution: `Breaking the moment into small actions (freezing, looking up, spotting orange) slows the pacing right when the reader wants to know where the meow came from. "Then we found Pepper and took her home" speeds past the exciting part instead of slowing it down.`,
        },
      ],
    },
    {
      code: 'wg5-narrative-writing-p03',
      title: 'A Bite Out of the Sun',
      body: `(1) On the morning of the partial solar eclipse, Grandpa Hiroshi and I made a pinhole viewer from a cereal box. (2) We cut a small square in one end and taped foil over it. (3) Then Grandpa poked a tiny hole in the foil with a pin. (4) "Never look straight at the sun," he reminded me. "We will watch its light on the paper instead." (5) At noon, we carried the box out to the backyard. (6) I stood with my back to the sun and peeked through the viewing hole.

(7) At first, I saw only a small white circle on the paper inside. (8) I thought the eclipse was boring. (9) Slowly, a dark bite appeared on one edge of the circle. (10) The bite grew bigger and bigger until the sun looked like a glowing crescent moon. (11) The air turned cooler, and the birds in the hedge grew quiet. (12) Our neighbor has a blue car.

(13) After about an hour, the bite shrank away, and the circle was whole again. (14) I put the viewer on my shelf.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not belong in the story?`,
          choices: [
            no(`sentence 4`, 'removes-key-dialogue'),
            no(`sentence 11`, 'removes-sensory-detail'),
            ok(`sentence 12`),
            no(`sentence 13`, 'removes-key-event'),
          ],
          solution: `The neighbor's car has nothing to do with watching the eclipse. Sentence 11 should stay because the cool air and quiet birds help the reader feel the moment.`,
        },
        {
          slot: 12,
          difficulty: 'medium',
          stem: `Sentence 8 tells the reader how the narrator feels. Which revision best shows the feeling instead?`,
          choices: [
            no(`I felt very bored about the eclipse.`, 'still-telling'),
            ok(`I tapped my foot and sighed. "Is that all?" I asked.`),
            no(`Everyone in the world thought eclipses were boring.`, 'overgeneralizes'),
            no(`Grandpa felt excited about the eclipse.`, 'changes-character-focus'),
          ],
          solution: `Tapping a foot, sighing, and asking "Is that all?" let the reader see the boredom through actions and dialogue. "I felt very bored" still simply tells the feeling.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which sentence is the best example of the writer slowing down to describe an important moment?`,
          choices: [
            no(`sentence 2`, 'minor-step-not-key-moment'),
            no(`sentence 5`, 'minor-step-not-key-moment'),
            ok(`sentence 10`),
            no(`sentence 14`, 'minor-step-not-key-moment'),
          ],
          solution: `Sentence 10 describes the high point of the eclipse with detail, as the bite grows until the sun looks like a glowing crescent. Sentence 5 only moves the characters outside and does not describe a key moment.`,
        },
        {
          slot: 14,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 14 as a conclusion that follows from the events?`,
          choices: [
            no(`An eclipse happens when the moon passes between Earth and the sun.`, 'generic-fact-ending'),
            ok(`Now, whenever I see that cereal box on my shelf, I remember the day the sun turned into a crescent.`),
            no(`Grandpa Hiroshi and I made a pinhole viewer from a cereal box.`, 'restates-situation'),
            no(`The next week, Grandpa and I built a telescope from a paper towel tube.`, 'starts-new-event'),
          ],
          solution: `This ending links the viewer to the narrator's memory of the crescent sun, so it grows out of the story. The sentence about making the viewer only repeats sentence 1.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `The writer wants to add Grandpa's words after sentence 10. Which dialogue best fits the events and moves the story forward?`,
          choices: [
            no(`"It is almost time for lunch," Grandpa said.`, 'dialogue-no-purpose'),
            no(`"Quick, look straight up at the sun now!" Grandpa said.`, 'contradicts-earlier-detail'),
            ok(`"This is the biggest the bite will get," Grandpa whispered. "Soon it will shrink."`),
            no(`"Look, the sun is completely covered!" Grandpa said.`, 'contradicts-events'),
          ],
          solution: `Grandpa's words fit the crescent moment and prepare the reader for sentence 13, when the bite shrinks away. The choice telling the narrator to look at the sun is tempting because it sounds exciting, but it goes against Grandpa's warning in sentence 4.`,
        },
      ],
    },
    {
      code: 'wg5-narrative-writing-p04',
      title: 'The Third Leg',
      body: `(1) Field day at Brookside Elementary was finally here, and I was running the third leg of the fifth-grade relay. (2) My teammates were Lucia, Omar, and Wren. (3) We had practiced handing off the baton every day at recess for two weeks. (4) The whistle blew, and Lucia shot forward. (5) She passed the baton to Omar, who raced around the curve. (6) My heart pounded as he got closer.

(7) I reached back, but the baton slipped through my fingers and bounced on the track. (8) I grabbed it and ran as fast as I could. (9) Two runners had already passed us. (10) I caught one of them right before I handed off to Wren. (11) Wren ran like the wind and crossed the finish line in second place. (12) Our class cheered.

(13) Second place is good.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which phrase would best begin sentence 8 to show how quickly the narrator acted?`,
          choices: [
            no(`For example,`, 'example-not-time'),
            ok(`Without wasting a second,`),
            no(`In conclusion,`, 'ending-word-in-middle'),
            no(`On the other hand,`, 'contrast-not-time'),
          ],
          solution: `"Without wasting a second" shows that the narrator grabbed the baton right away. "On the other hand" signals a contrast, which does not fit picking up the dropped baton.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which revision of sentence 12 uses the most vivid sensory details?`,
          choices: [
            no(`Our class was happy about the race.`, 'vague-language'),
            ok(`Our class jumped up and down, and their cheers rang across the field.`),
            no(`Our class cheered because of what happened.`, 'vague-language'),
            no(`Our class, which has twenty-four students, cheered.`, 'unimportant-detail'),
          ],
          solution: `Jumping up and down and cheers ringing across the field help the reader see and hear the celebration. The number of students is a fact, not a sensory detail.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which sentence would best be added after sentence 7 to show the narrator's feelings?`,
          choices: [
            no(`Relay batons are usually made of metal or plastic.`, 'off-topic-fact'),
            no(`Lucia felt nervous during the whole race.`, 'changes-character-focus'),
            ok(`My face burned, and for one terrible second, I froze.`),
            no(`Then our team won the race easily.`, 'contradicts-events'),
          ],
          solution: `A burning face and a frozen moment show the narrator's panic right after the drop. The sentence about Lucia shifts away from the narrator at the most important moment, and the narrator cannot know what Lucia felt the whole time.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 13 as a conclusion that follows from the events?`,
          choices: [
            ok(`As Wren hugged me, I realized that one mistake does not have to decide how a race ends.`),
            no(`Relay races have four runners who each run one part.`, 'generic-fact-ending'),
            no(`I was running the third leg of the fifth-grade relay.`, 'restates-situation'),
            no(`After lunch, we played a game of tug of war.`, 'starts-new-event'),
          ],
          solution: `This ending reflects on the dropped baton and the strong finish, so it follows from the events. The tug of war sentence starts a new event instead of closing this one.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `The writer wants to add Wren's words to sentence 10 during the handoff. Which dialogue best fits the events and keeps the action moving?`,
          choices: [
            no(`"I really like your new sneakers," Wren said.`, 'dialogue-no-purpose'),
            no(`"Don't drop it again," Wren said, walking off slowly.`, 'contradicts-events'),
            ok(`"Got it!" Wren shouted, grabbing the baton and sprinting away.`),
            no(`"We practiced for two weeks," Wren said.`, 'repeats-old-detail'),
          ],
          solution: `Wren's quick shout and sprint keep the race moving and lead into sentence 11, where Wren runs like the wind. The choice where Wren walks off slowly contradicts how fast Wren runs in sentence 11.`,
        },
      ],
    },
    {
      code: 'wg5-narrative-writing-p05',
      title: 'The Tiny Hole',
      body: `(1) My bike tire went flat the day before our class bike ride. (2) I was sad. (3) Then my grandma, Nana Ifeoma, rolled up her sleeves and said, "Bring it to the garage."

(4) She flipped the bike upside down so it rested on the seat and handlebars. (5) Next, she used two plastic levers to pry the tire off the rim. (6) She pulled out the thin rubber tube inside and pumped a little air into it. (7) We held the tube near my ear and listened for a hiss. (8) "There it is," Nana said, pointing to a tiny hole. (9) She rubbed the spot with sandpaper, spread on some glue, and pressed a round patch over it. (10) Bicycles were invented more than two hundred years ago. (11) Finally, we tucked the tube back in, pumped up the tire, and spun the wheel. (12) It held its air.

(13) The next morning, I rode with my class.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not fit the events of the story?`,
          choices: [
            no(`sentence 7`, 'removes-key-event'),
            no(`sentence 8`, 'removes-key-dialogue'),
            ok(`sentence 10`),
            no(`sentence 12`, 'removes-key-event'),
          ],
          solution: `Sentence 10 is a history fact that interrupts the steps of fixing the tire. Sentence 7 must stay because listening for the hiss is how they find the hole.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which revision of sentence 2 best shows how the narrator felt about the flat tire?`,
          choices: [
            ok(`My stomach sank as I pictured my class riding off without me.`),
            no(`I was very, very sad about it.`, 'still-telling'),
            no(`Nana Ifeoma thought I would have to stay home.`, 'changes-character-focus'),
            no(`Flat tires happen to many riders.`, 'off-topic-fact'),
          ],
          solution: `A sinking stomach and the picture of classmates riding away show the narrator's worry instead of just naming it. Adding "very, very" still only tells the feeling.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 6 to show the order of the steps?`,
          choices: [
            no(`In contrast,`, 'contrast-not-time'),
            no(`For instance,`, 'example-not-time'),
            ok(`After that,`),
            no(`In conclusion,`, 'ending-word-in-middle'),
          ],
          solution: `"After that" shows that pulling out the tube came right after prying off the tire. "For instance" introduces an example, but sentence 6 is the next step, not an example.`,
        },
        {
          slot: 24,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 13 as a conclusion that follows from the events?`,
          choices: [
            no(`Most bike tires have a rubber tube inside them.`, 'generic-fact-ending'),
            no(`My bike tire went flat the day before our class bike ride.`, 'restates-situation'),
            ok(`The next morning, I pedaled beside my class, proud that I now knew how to fix a flat myself.`),
            no(`Later that year, Nana Ifeoma taught me how to bake bread.`, 'starts-new-event'),
          ],
          solution: `This ending shows the narrator joining the ride and reflects on what they learned from Nana, so it wraps up the story. The sentence about the flat tire only repeats sentence 1.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Sentence 12 is the moment when the narrator learns the repair worked. Which change would best help the reader feel the importance of this moment?`,
          choices: [
            no(`Delete sentence 12 because the story is already long enough.`, 'removes-key-event'),
            ok(`Expand it: "We waited one minute, then two. I squeezed the tire, and it stayed firm."`),
            no(`Move sentence 12 to the very beginning of the story.`, 'breaks-sequence'),
            no(`Add a sentence after it about how rubber is made.`, 'off-topic-fact'),
          ],
          solution: `Waiting, counting minutes, and squeezing the tire slow the pacing so the reader shares the suspense before the success. Moving sentence 12 to the beginning would tell the outcome before the problem, which breaks the order of events.`,
        },
      ],
    },
    {
      code: 'wg5-narrative-writing-p06',
      title: 'Letters Under the Flagpole',
      body: `(1) Our school turned fifty years old this year, and Principal Nakamura announced a surprise. (2) A time capsule had been buried under the flagpole when the school first opened. (3) On a sunny Friday, every class gathered on the field to watch the custodian, Mr. Bello, dig it up. (4) The metal box was old, and it opened. (5) Inside, we found a class photo, a stack of letters, and a cassette tape. (6) My favorite lunch is tomato soup. (7) Principal Nakamura read one letter out loud.

(8) It was written by a fifth grader named Ruthie in the year the school opened. (9) She wrote that she hoped future students would still play kickball at recess. (10) Everyone laughed, because we had played kickball that very morning. (11) Later, our class wrote our own letters for a new time capsule. (12) I wrote about our tablets, our class turtle, and our favorite games.

(13) The time capsule was buried again.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not belong in the story?`,
          choices: [
            no(`sentence 3`, 'removes-setting-detail'),
            no(`sentence 5`, 'removes-key-event'),
            ok(`sentence 6`),
            no(`sentence 9`, 'removes-key-event'),
          ],
          solution: `The narrator's favorite lunch has nothing to do with opening the time capsule. Sentence 9 should stay because Ruthie's hope about kickball is what makes everyone laugh in sentence 10.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which revision of sentence 4 uses the most precise sensory details?`,
          choices: [
            no(`The metal box was very old and kind of interesting.`, 'vague-language'),
            ok(`The metal box was crusted with orange rust, and its lid gave a long, sharp squeal as Mr. Bello pried it open.`),
            no(`The metal box, which had been buried, was opened by Mr. Bello.`, 'repeats-old-detail'),
            no(`The box was old, and it was opened, and we looked.`, 'vague-language'),
          ],
          solution: `Orange rust and a long, sharp squeal help the reader see and hear the box opening. The choice saying the box had been buried repeats sentence 2 without adding any description.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 7 to connect it to the events before it?`,
          choices: [
            no(`For example,`, 'example-not-time'),
            no(`On the other hand,`, 'contrast-not-time'),
            no(`Instead of that,`, 'contrast-not-time'),
            ok(`After everyone had a look,`),
          ],
          solution: `"After everyone had a look" shows that the reading happened once the class had seen what was inside. "Instead of that" wrongly suggests the principal read a letter in place of opening the box.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `The writer wants to replace sentence 7 with dialogue that moves the story forward. Which choice does this best?`,
          choices: [
            ok(`Principal Nakamura unfolded a yellowed page. "Listen to this," the principal said, and began to read.`),
            no(`"Good morning, students," Principal Nakamura said.`, 'dialogue-no-purpose'),
            no(`"Please go back to your classrooms now," Principal Nakamura said.`, 'contradicts-events'),
            no(`"This box is made of metal," Principal Nakamura said.`, 'repeats-old-detail'),
          ],
          solution: `This choice shows the principal starting to read, which leads straight into Ruthie's letter in sentences 8 and 9. Sending the students back to class would not fit, because they stay to hear the letter and laugh.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 13 as a conclusion that follows from the events?`,
          choices: [
            no(`Time capsules are often buried under buildings or statues.`, 'generic-fact-ending'),
            no(`Our school turned fifty years old this year.`, 'restates-situation'),
            ok(`As Mr. Bello lowered the new box into the ground, I wondered if a fifth grader fifty years from now would laugh at my letter, too.`),
            no(`The next Monday, we had a spelling test in class.`, 'starts-new-event'),
          ],
          solution: `This ending connects the new capsule to the laughter over Ruthie's letter, so it grows out of the story's events. The sentence about the school turning fifty only repeats the opening.`,
        },
      ],
    },
    {
      code: 'wg5-narrative-writing-p07',
      title: 'The Frog That Jumped Too Far',
      body: `(1) For our school's game design night, my sister Marisol and I decided to code a simple game on the family laptop. (2) In our game, a little frog had to hop across lily pads to reach a fly. (3) We worked on it every evening for a week. (4) On the first night, we drew the frog and the lily pads. (5) On the second night, we wrote the code to make the frog hop.

(6) But when I pressed the arrow key, the frog hopped straight off the screen! (7) Marisol laughed so hard she snorted. (8) We looked through our code line by line. (9) Finally, Marisol pointed at one number. (10) "We told it to jump five hundred steps instead of fifty," she said. (11) I fixed the number, and the frog landed neatly on the next lily pad.

(12) On game night, a lot of kids were there. (13) A first grader named Bao played our game four times in a row. (14) It was a fun week.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence best establishes the situation by telling who the characters are and what they are doing?`,
          choices: [
            ok(`sentence 1`),
            no(`sentence 6`, 'chooses-problem-not-situation'),
            no(`sentence 11`, 'chooses-solution-not-situation'),
            no(`sentence 13`, 'chooses-late-event'),
          ],
          solution: `Sentence 1 introduces the narrator and Marisol and explains that they are coding a game for game design night. Sentence 6 is the problem in the middle of the story, not the starting situation.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 8 to show the order of events?`,
          choices: [
            no(`For example,`, 'example-not-time'),
            ok(`When she finally stopped laughing,`),
            no(`In conclusion,`, 'ending-word-in-middle'),
            no(`On the other hand,`, 'contrast-not-time'),
          ],
          solution: `"When she finally stopped laughing" links sentence 7 to the next action and shows time moving forward. "In conclusion" signals an ending, but the problem has not been solved yet.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which sentence would best be added after sentence 11 to show the time that passed before game night?`,
          choices: [
            no(`Frogs can jump many times the length of their own bodies.`, 'off-topic-fact'),
            no(`On the first night, we drew the frog and the lily pads.`, 'breaks-sequence'),
            ok(`For the rest of the week, we added more lily pads and a timer to make the game harder.`),
            no(`Then the frog hopped off the screen all over again.`, 'contradicts-events'),
          ],
          solution: `"For the rest of the week" bridges the gap between the second night and game night and tells what the narrator and Marisol did. The sentence about the first night goes backward in time and repeats sentence 4.`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `Which revision of sentence 12 uses the most concrete details?`,
          choices: [
            no(`On game night, a whole lot of people came to the school.`, 'vague-language'),
            no(`On game night, things went pretty well for us.`, 'vague-language'),
            ok(`On game night, six kids lined up behind our laptop, waiting to make the frog hop.`),
            no(`On game night, which was a night, kids were there.`, 'redundant-wording'),
          ],
          solution: `Six kids lining up behind the laptop is a specific picture the reader can see. "A whole lot of people" is still vague and does not show interest in the game.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 14 as a conclusion that follows from the events?`,
          choices: [
            ok(`Watching Bao cheer each time the frog caught the fly, I knew all our hard work had been worth it.`),
            no(`Many people around the world enjoy coding their own games.`, 'generic-fact-ending'),
            no(`My sister Marisol and I decided to code a game on the family laptop.`, 'restates-situation'),
            no(`The next day, Marisol and I started learning to play chess.`, 'starts-new-event'),
          ],
          solution: `This ending ties Bao's joy on game night to the week of work and the fixed mistake, so it follows from the events. The sentence about deciding to code only repeats sentence 1.`,
        },
      ],
    },
    {
      code: 'wg5-narrative-writing-p08',
      title: 'Quiet on Silver Lake',
      body: `(1) Last summer, my uncle Kwame took me canoeing on Silver Lake for the first time. (2) He sat in the back, and I sat in the front with a paddle that felt too big for my hands. (3) At first, we zigzagged across the water. (4) "Paddle on the same side as me," Uncle Kwame called.

(5) Soon, we glided past a patch of tall reeds. (6) Uncle Kwame suddenly lifted his paddle and pointed. (7) A tall gray heron was standing in the shallow water, as still as a statue. (8) Neither of us made a sound. (9) The heron lowered its long neck, and quick as a flash, it snatched a little fish. (10) Then it spread its huge wings and flapped away over the trees. (11) My favorite subject in school is math.

(12) We paddled back to the dock.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not fit the events of the story?`,
          choices: [
            no(`sentence 3`, 'removes-key-event'),
            no(`sentence 8`, 'removes-key-detail'),
            no(`sentence 9`, 'removes-key-event'),
            ok(`sentence 11`),
          ],
          solution: `The narrator's favorite school subject has nothing to do with the canoe trip. Sentence 8 should stay because the silence helps build the quiet moment with the heron.`,
        },
        {
          slot: 37,
          difficulty: 'easy',
          stem: `Which revision of sentence 8 adds a sensory detail that fits the quiet moment?`,
          choices: [
            ok(`Neither of us made a sound, and the only noise was water lapping softly against the canoe.`),
            no(`Neither of us made a sound, and we were happy.`, 'vague-language'),
            no(`Uncle Kwame shouted, "Look at that bird over there!"`, 'contradicts-events'),
            no(`Neither of us made a sound because herons are birds.`, 'illogical-cause'),
          ],
          solution: `Water lapping softly is a sound detail that makes the silence feel real. Uncle Kwame shouting would break the quiet that the story describes.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `The story never shows how the zigzagging in sentence 3 is fixed. Which sentence would best be added after sentence 4?`,
          choices: [
            no(`Canoes have been used for travel for thousands of years.`, 'off-topic-fact'),
            ok(`Once I copied his strokes, the canoe stopped wobbling and slid straight ahead.`),
            no(`My uncle Kwame took me canoeing on Silver Lake.`, 'restates-situation'),
            no(`We kept zigzagging all afternoon and never went straight.`, 'contradicts-events'),
          ],
          solution: `This sentence shows the narrator following the advice and the canoe moving smoothly, which leads into gliding past the reeds in sentence 5. Zigzagging all afternoon would not fit with the smooth gliding that comes next.`,
        },
        {
          slot: 39,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 12 to show a shift in both time and setting?`,
          choices: [
            no(`For example,`, 'example-not-time'),
            no(`In addition,`, 'adds-not-time'),
            ok(`When the sky over the lake turned pink and orange,`),
            no(`Most importantly,`, 'importance-not-time'),
          ],
          solution: `A pink and orange sky over the lake shows that evening has come and helps the reader picture the scene. "In addition" only adds an idea and says nothing about time or place.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Which sentence would best be added after sentence 12 as a conclusion that follows from the events?`,
          choices: [
            no(`Herons are wading birds that eat fish, frogs, and insects.`, 'generic-fact-ending'),
            no(`The next morning, I went to a baseball game with my friends.`, 'starts-new-event'),
            ok(`Climbing onto the dock, I realized the lake's best surprise came only after we learned to paddle together and stay quiet.`),
            no(`Last summer, I went canoeing on Silver Lake with Uncle Kwame.`, 'restates-situation'),
          ],
          solution: `This ending reflects on both parts of the trip, learning to paddle together and staying silent for the heron. The heron fact is about the topic, but it does not wrap up the narrator's experience.`,
        },
      ],
    },
  ],
}

export default skill
