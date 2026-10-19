import type { ContentSkill } from '../../types'

const skill: ContentSkill = {
  slug: 'write-g3-narrative-writing',
  subject: 'writing',
  grade: 3,
  group: 'Composition',
  name: 'Narrative Writing',
  standards: ['W.3.3'],
  passages: [
    {
      code: 'wg3-narrative-writing-p01',
      title: 'The Wobbly Skater',
      body:
        '(1) Last Saturday, my aunt took me ice skating for the very first time. (2) The rink was bright and cold, and music played from speakers on the walls. (3) I laced up my rented skates and stepped onto the ice. (4) My feet slid in two different directions right away! (5) I grabbed the wall so hard that my fingers hurt.\n\n' +
        '(6) Aunt Rosa skated over and held out her hand. (7) "Bend your knees and take tiny steps," she said. (8) I tried it, but I still fell down twice. (9) My cheeks felt hot because I thought everyone was watching me. (10) Then I saw a little boy fall, laugh, and get right back up. (11) After that, I kept trying too.\n\n' +
        '(12) By the end of the afternoon, I could skate all the way around the rink without the wall. (13) The snack bar sold popcorn and hot cocoa.',
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: 'Which sentence should be removed because it does not tell part of the skating story?',
          choices: [
            { text: 'Sentence 13', is_correct: true },
            { text: 'Sentence 9', is_correct: false, misconception_token: 'removes-feelings' },
            { text: 'Sentence 7', is_correct: false, misconception_token: 'removes-dialogue' },
            { text: 'Sentence 10', is_correct: false, misconception_token: 'removes-key-event' },
          ],
          solution:
            'Sentence 13 is about the snack bar, not about learning to skate, so it does not belong. Sentence 9 should stay because it shows how the writer felt after falling.',
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: 'The writer wants to add a word at the start of sentence 3 to show the order of events. Which word is best?',
          choices: [
            { text: 'First,', is_correct: true },
            { text: 'Finally,', is_correct: false, misconception_token: 'wrong-order-word' },
            { text: 'Yesterday,', is_correct: false, misconception_token: 'contradicts-time' },
            { text: 'At the end of the day,', is_correct: false, misconception_token: 'wrong-order-word' },
          ],
          solution:
            'Lacing up skates is the first thing the writer does at the rink, so "First," fits. "Finally," would wrongly signal the end of the story.',
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: 'After sentence 13 is removed, which sentence would best come after sentence 12 to give the story a sense of closure?',
          choices: [
            { text: 'I smiled at Aunt Rosa, proud that falling down had not made me quit.', is_correct: true },
            { text: 'The rink opens at nine o\'clock every weekend morning.', is_correct: false, misconception_token: 'off-topic-detail' },
            { text: 'Someday I want to try skiing, which looks much harder.', is_correct: false, misconception_token: 'starts-new-topic' },
            { text: 'The music from the speakers was very loud that day.', is_correct: false, misconception_token: 'detail-not-closure' },
          ],
          solution:
            'The smile at Aunt Rosa wraps up the story by showing the writer\'s pride in not quitting. The skiing sentence moves to a new topic instead of finishing this one.',
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: 'Which revision of sentence 5 best adds a thought that shows how the writer felt?',
          choices: [
            { text: 'I grabbed the wall and thought, "I will never be able to do this."', is_correct: true },
            { text: 'I grabbed the wall, which was painted white and blue.', is_correct: false, misconception_token: 'detail-not-feeling' },
            { text: 'I grabbed the wall that went all around the ice rink.', is_correct: false, misconception_token: 'detail-not-feeling' },
            { text: 'I grabbed the wall, and Aunt Rosa grabbed it too.', is_correct: false, misconception_token: 'action-not-thought' },
          ],
          solution:
            'Only the revision with "I will never be able to do this" tells what the writer was thinking, which shows a worried feeling. The revisions about the wall\'s colors, the wall going around the rink, and Aunt Rosa grabbing the wall add facts, not the writer\'s thoughts.',
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: 'Why is sentence 10 important to the story?',
          choices: [
            { text: 'It shows what made the writer decide to keep trying.', is_correct: true },
            { text: 'It explains the steps for how to skate on ice.', is_correct: false, misconception_token: 'misreads-purpose' },
            { text: 'It introduces the main character of the story.', is_correct: false, misconception_token: 'wrong-character-role' },
            { text: 'It tells how the whole story ends for the writer.', is_correct: false, misconception_token: 'confuses-event-with-ending' },
          ],
          solution:
            'Seeing the boy fall and get up leads straight to sentence 11, "After that, I kept trying too." It is a turning point in the middle, not the ending, which comes in sentence 12.',
        },
      ],
    },
    {
      code: 'wg3-narrative-writing-p02',
      title: 'Stars Over Our Heads',
      body:
        '(1) On Tuesday, my class rode a bus to the city planetarium. (2) We walked into a round room with a giant dome for a ceiling. (3) Our guide, Mr. Adebayo, asked us to lean back in our seats. (4) The lights went dark. (5) Suddenly, thousands of tiny stars sparkled above us. (6) My friend Kenji whispered, "It looks like the real sky at camp!"\n\n' +
        '(7) Mr. Adebayo pointed a beam of light at a group of stars shaped like a big spoon. (8) He told us it is called the Big Dipper. (9) I learned that sailors long ago used stars to find their way.\n\n' +
        '(10) ________ the lights came back on, and we blinked in the bright room. (11) On the bus ride home, I drew the Big Dipper in my notebook so I would never forget it.',
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: 'Which phrase best fills the blank at the start of sentence 10?',
          choices: [
            { text: 'At the end of the show,', is_correct: true },
            { text: 'Before the show started,', is_correct: false, misconception_token: 'wrong-order-word' },
            { text: 'Every morning at school,', is_correct: false, misconception_token: 'wrong-time-frame' },
            { text: 'Long before the trip,', is_correct: false, misconception_token: 'wrong-order-word' },
          ],
          solution:
            'The lights coming back on happens after the star show, so "At the end of the show," keeps the events in order. "Before the show started," does not fit because the show already happened in sentences 5 to 9.',
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: 'Which sentence tells the reader when and where the story begins?',
          choices: [
            { text: 'Sentence 1', is_correct: true },
            { text: 'Sentence 5', is_correct: false, misconception_token: 'picks-exciting-event' },
            { text: 'Sentence 9', is_correct: false, misconception_token: 'picks-fact' },
            { text: 'Sentence 11', is_correct: false, misconception_token: 'picks-ending' },
          ],
          solution:
            'Sentence 1 names the day (Tuesday) and the place (the city planetarium), which sets up the situation. Sentence 5 is an exciting event, but it does not tell when or where.',
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: 'The writer wants to show a feeling after sentence 4. Which sentence is best to add?',
          choices: [
            { text: 'My heart beat fast, and I held my breath to see what would happen.', is_correct: true },
            { text: 'The room had about one hundred seats in neat rows.', is_correct: false, misconception_token: 'fact-not-feeling' },
            { text: 'The bus driver waited for us out in the parking lot.', is_correct: false, misconception_token: 'off-topic-detail' },
            { text: 'Many large cities around the world have planetariums.', is_correct: false, misconception_token: 'general-fact' },
          ],
          solution:
            'A fast heartbeat and held breath show the writer\'s excitement in the dark room. The sentence about the seats is a fact about the room, not a feeling.',
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: 'What does the dialogue in sentence 6 add to the story?',
          choices: [
            { text: 'It shows how Kenji reacted to seeing the stars.', is_correct: true },
            { text: 'It tells the reader where the planetarium is.', is_correct: false, misconception_token: 'misreads-purpose' },
            { text: 'It explains what the Big Dipper looks like.', is_correct: false, misconception_token: 'wrong-sentence' },
            { text: 'It tells the reader the trip is over.', is_correct: false, misconception_token: 'confuses-event-with-ending' },
          ],
          solution:
            'Kenji\'s whisper shows amazement at how real the stars look. The Big Dipper is described later, in sentence 7, not in the dialogue.',
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: 'Which sentence could be added after sentence 9 to show the writer\'s thought, not just a fact?',
          choices: [
            { text: 'I wondered if I could ever find my way home using only the stars.', is_correct: true },
            { text: 'Sailors also used maps and other tools on their ships.', is_correct: false, misconception_token: 'fact-not-thought' },
            { text: 'Some stars are much bigger than our own sun.', is_correct: false, misconception_token: 'fact-not-thought' },
            { text: 'Mr. Adebayo said that the show was almost over.', is_correct: false, misconception_token: 'reports-speech-not-thought' },
          ],
          solution:
            '"I wondered" shows what was going on in the writer\'s mind and connects to the sailors in sentence 9. The sailors\' maps sentence is related, but it is only another fact.',
        },
      ],
    },
    {
      code: 'wg3-narrative-writing-p03',
      title: 'The Flat Tire',
      body:
        '(1) On Saturday, my bike had a flat tire, and our neighbor Mr. Haddad came over to help me fix it. (2) First, we turned the bike upside down on the driveway. (3) Mr. Haddad pulled the soft rubber tube out of the tire. (4) Then he showed me how to find the tiny hole in the tube. (5) We pumped a little air into the tube and dunked it in a bucket of water. (6) A line of bubbles came out, so we dried that spot, pressed a sticky patch over it, and waited.\n\n' +
        '(7) I was surprised when the patched tube held air without a single bubble. (8) "Good as new," Mr. Haddad said with a grin. (9) We tucked the tube back inside the tire and pumped it up. (10) The tire felt hard and firm when I squeezed it. (11) My best friend has a pet turtle named Pickles. (12) When we were done, Mr. Haddad let me take the first ride down the street.',
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: 'Which sentence does not belong in the story about fixing the bike?',
          choices: [
            { text: 'Sentence 11', is_correct: true },
            { text: 'Sentence 3', is_correct: false, misconception_token: 'removes-key-event' },
            { text: 'Sentence 8', is_correct: false, misconception_token: 'removes-dialogue' },
            { text: 'Sentence 10', is_correct: false, misconception_token: 'removes-description' },
          ],
          solution:
            'Sentence 11 is about a pet turtle, which has nothing to do with fixing the tire. Sentence 10 should stay because it describes how the tire felt after it was fixed.',
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: 'The writer wants to add a phrase at the start of sentence 7 to show that time passed. Which phrase is best?',
          choices: [
            { text: 'A few minutes later,', is_correct: true },
            { text: 'Before we found the hole,', is_correct: false, misconception_token: 'wrong-order-word' },
            { text: 'Last winter,', is_correct: false, misconception_token: 'contradicts-time' },
            { text: 'The night before,', is_correct: false, misconception_token: 'wrong-order-word' },
          ],
          solution:
            'In sentence 6, they wait for the patch to stick, so "A few minutes later," shows time passing in the right order. "Before we found the hole," is wrong because the tube could not be patched before the hole was found.',
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: 'Which sentence would best end the story after sentence 12?',
          choices: [
            { text: 'I rode to the corner and back, proud that I had helped fix my own bike.', is_correct: true },
            { text: 'Then we drove to the store to buy a new bell for the bike.', is_correct: false, misconception_token: 'starts-new-event' },
            { text: 'People ride bikes in many different countries.', is_correct: false, misconception_token: 'general-fact' },
            { text: 'The bucket of water was still sitting on the driveway.', is_correct: false, misconception_token: 'detail-not-closure' },
          ],
          solution:
            'Riding the bike and feeling proud of helping wraps up the whole day of fixing it. The trip to the store starts a new event instead of closing the story.',
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: 'Which sentence tells how the writer felt?',
          choices: [
            { text: 'Sentence 7', is_correct: true },
            { text: 'Sentence 2', is_correct: false, misconception_token: 'action-not-feeling' },
            { text: 'Sentence 5', is_correct: false, misconception_token: 'action-not-feeling' },
            { text: 'Sentence 9', is_correct: false, misconception_token: 'action-not-feeling' },
          ],
          solution:
            'Sentence 7 says "I was surprised," which names a feeling. Sentences 2, 5 and 9 only tell actions, like turning the bike over, dunking the tube and pumping up the tire.',
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: 'The writer wants to add dialogue after sentence 4 that helps the reader understand what Mr. Haddad is teaching. Which is best?',
          choices: [
            { text: '"Put in a little air, then dunk it and watch for bubbles," Mr. Haddad said.', is_correct: true },
            { text: '"This is a very nice driveway," Mr. Haddad said.', is_correct: false, misconception_token: 'off-topic-dialogue' },
            { text: '"We will eat lunch at noon today," Mr. Haddad said.', is_correct: false, misconception_token: 'off-topic-dialogue' },
            { text: '"Your bike has a flat tire," Mr. Haddad said.', is_correct: false, misconception_token: 'repeats-known-fact' },
          ],
          solution:
            'Only "Put in a little air, then dunk it and watch for bubbles" tells the steps for finding the hole that Mr. Haddad shows in sentence 4. The flat tire is already stated in sentence 1, so that line does not teach anything new.',
        },
      ],
    },
    {
      code: 'wg3-narrative-writing-p04',
      title: 'The Missing Puppy',
      body:
        '(1) My cousin Amara and I took Biscuit, Amara\'s new puppy, to the park on Saturday. (2) We tossed a ball across the grass, and Biscuit chased it with floppy ears flying. (3) Then a squirrel ran past, and Biscuit slipped right out of the collar! (4) The puppy dashed behind a row of bushes.\n\n' +
        '(5) Amara\'s eyes filled with tears. (6) We called and called, but Biscuit did not come back. (7) Then I had an idea. (8) "Biscuit loves the squeaky ball," I said. (9) I squeezed the ball as hard as I could. (10) A moment later, a brown nose poked out of the bushes. (11) Biscuit ran straight into Amara\'s arms.\n\n' +
        '(12) ________',
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: 'Which sentence tells the problem in the story?',
          choices: [
            { text: 'Sentence 3', is_correct: true },
            { text: 'Sentence 2', is_correct: false, misconception_token: 'picks-setup' },
            { text: 'Sentence 8', is_correct: false, misconception_token: 'picks-solution' },
            { text: 'Sentence 11', is_correct: false, misconception_token: 'picks-ending' },
          ],
          solution:
            'In sentence 3, Biscuit slips out of the collar, which causes the problem. Sentence 8 is part of the solution, when the writer thinks of the squeaky ball.',
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: 'Which sentence begins with a time phrase that shows what happened next?',
          choices: [
            { text: 'Sentence 10', is_correct: true },
            { text: 'Sentence 5', is_correct: false, misconception_token: 'not-a-time-word' },
            { text: 'Sentence 9', is_correct: false, misconception_token: 'not-a-time-word' },
            { text: 'Sentence 11', is_correct: false, misconception_token: 'not-a-time-word' },
          ],
          solution:
            'Sentence 10 begins with "A moment later," which tells when the nose poked out. Sentences 5, 9 and 11 begin with names or "I," not time words.',
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: 'Which sentence best fills the blank as sentence 12 to end the story?',
          choices: [
            { text: 'On the walk home, Amara held the leash tightly, and we both felt relieved.', is_correct: true },
            { text: 'Squirrels can climb all the way to the tops of tall trees.', is_correct: false, misconception_token: 'off-topic-detail' },
            { text: 'Then Biscuit ran away again and hid under a bench.', is_correct: false, misconception_token: 'starts-new-problem' },
            { text: 'The park also has a big slide and two swings.', is_correct: false, misconception_token: 'detail-not-closure' },
          ],
          solution:
            'Holding the leash tightly and feeling relieved shows the problem is solved and the day is over. Having Biscuit run away again starts a new problem instead of ending the story.',
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: 'The writer wants sentence 4 to help the reader picture where Biscuit went. Which revision is best?',
          choices: [
            { text: 'The puppy dashed behind a row of thick green bushes by the fence.', is_correct: true },
            { text: 'The puppy dashed away to some place in the park.', is_correct: false, misconception_token: 'less-specific' },
            { text: 'The puppy dashed behind the bushes, and puppies are cute.', is_correct: false, misconception_token: 'adds-opinion-not-detail' },
            { text: 'The puppy dashed behind a row of bushes very fast.', is_correct: false, misconception_token: 'detail-not-about-place' },
          ],
          solution:
            '"Thick green bushes by the fence" gives details about the place, so the reader can picture it. "Very fast" adds a detail about speed, not about where Biscuit went.',
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: 'Why does the writer include sentence 7, "Then I had an idea"?',
          choices: [
            { text: 'It signals a turn in the story, from the problem to how it gets solved.', is_correct: true },
            { text: 'It tells the reader that the story is now over.', is_correct: false, misconception_token: 'confuses-middle-with-end' },
            { text: 'It brings a new character into the story.', is_correct: false, misconception_token: 'wrong-character-role' },
            { text: 'It describes what the park looked like that day.', is_correct: false, misconception_token: 'misreads-purpose' },
          ],
          solution:
            'Before sentence 7, calling does not work; after it, the squeaky ball brings Biscuit back, so the sentence marks the turn toward the solution. The story does not end there, because Biscuit has not come back yet.',
        },
      ],
    },
    {
      code: 'wg3-narrative-writing-p05',
      title: 'The Bridge That Held',
      body:
        '(1) Our teacher, Ms. Okafor, gave every group a challenge: build a bridge out of paper and tape. (2) The bridge had to hold ten pennies. (3) My partner, Diego, and I taped flat strips of paper across two books. (4) When we added the third penny, the bridge sagged and crashed to the desk. (5) Diego groaned, and I felt like giving up.\n\n' +
        '(6) Then I remembered a picture of a real bridge with zigzag shapes on its sides. (7) "What if we fold the paper back and forth like a fan?" I asked. (8) We tried it, and it worked better. (9) We built a new bridge with folded strips.\n\n' +
        '(10) One by one, we stacked the pennies on top. (11) Ms. Okafor counted out loud as the class watched. (12) The bridge held all ten pennies, plus five more!',
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: 'Which sentence tells the challenge the characters must solve?',
          choices: [
            { text: 'Sentence 1', is_correct: true },
            { text: 'Sentence 4', is_correct: false, misconception_token: 'picks-setback' },
            { text: 'Sentence 8', is_correct: false, misconception_token: 'picks-solution' },
            { text: 'Sentence 12', is_correct: false, misconception_token: 'picks-ending' },
          ],
          solution:
            'Sentence 1 sets up the situation: each group must build a bridge out of paper and tape. Sentence 4 is a setback that happens while the characters work on that challenge.',
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: 'Which sentence would best come after sentence 12 to give the story a sense of closure?',
          choices: [
            { text: 'Diego and I gave each other a high five, glad we had not given up.', is_correct: true },
            { text: 'Next week, our class will build a tower out of straws.', is_correct: false, misconception_token: 'starts-new-topic' },
            { text: 'Pennies are made of metal and are a kind of coin.', is_correct: false, misconception_token: 'general-fact' },
            { text: 'The tape we used was clear and a little bit shiny.', is_correct: false, misconception_token: 'detail-not-closure' },
          ],
          solution:
            'The high five shows how the characters feel about their success and connects back to sentence 5, when the writer felt like giving up. The straw tower sentence moves to a different project.',
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: 'The writer wants to add a phrase at the start of sentence 9 to show this is the second try. Which phrase is best?',
          choices: [
            { text: 'This time,', is_correct: true },
            { text: 'Long ago,', is_correct: false, misconception_token: 'wrong-time-frame' },
            { text: 'Before we began,', is_correct: false, misconception_token: 'wrong-order-word' },
            { text: 'Every summer,', is_correct: false, misconception_token: 'wrong-time-frame' },
          ],
          solution:
            '"This time," tells the reader that the new bridge is a second try after the first one crashed. "Before we began," does not fit, because the first bridge was already built and had fallen.',
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: 'What do sentences 4 and 5 add to the story?',
          choices: [
            { text: 'They show a problem and how the characters felt about it.', is_correct: true },
            { text: 'They tell how the story ends for the class.', is_correct: false, misconception_token: 'confuses-event-with-ending' },
            { text: 'They describe what the classroom looks like.', is_correct: false, misconception_token: 'misreads-purpose' },
            { text: 'They explain how real bridges are built in cities.', is_correct: false, misconception_token: 'unsupported-inference' },
          ],
          solution:
            'Sentence 4 shows the bridge crashing, and sentence 5 shows Diego groaning and the writer wanting to give up. The story does not end there, because the second bridge is built afterward.',
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: 'Sentence 8 only tells that the idea "worked better." Which revision best shows what happened through actions and details?',
          choices: [
            { text: 'We folded a strip back and forth, pressed it down, and it would not bend.', is_correct: true },
            { text: 'We tried it, and it was really, really good this time.', is_correct: false, misconception_token: 'tells-not-shows' },
            { text: 'We tried it, and Ms. Okafor was sitting at her desk.', is_correct: false, misconception_token: 'irrelevant-detail' },
            { text: 'We tried it, and folding paper is a kind of art.', is_correct: false, misconception_token: 'off-topic-detail' },
          ],
          solution:
            'Folding, pressing and seeing that the strip would not bend shows the reader why the idea worked. "Really, really good" still only tells, without any actions or details.',
        },
      ],
    },
    {
      code: 'wg3-narrative-writing-p06',
      title: 'My Big Line',
      body:
        '(1) Our class put on a play about a town that lost its music. (2) I played the mayor, and I had one very important line. (3) For two weeks, I practiced it in front of the bathroom mirror. (4) On the night of the play, the gym was packed with families.\n\n' +
        '(5) When it was my turn, I stepped into the bright light. (6) My mind went completely blank. (7) I could hear my own heart thumping. (8) Then I saw my friend Priya behind the curtain, mouthing the first word. (9) "Let the music play again!" I shouted, and the crowd clapped. (10) Our costumes were made from old bedsheets.',
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: 'Which sentence should be removed because it does not help tell what happened with the big line?',
          choices: [
            { text: 'Sentence 10', is_correct: true },
            { text: 'Sentence 7', is_correct: false, misconception_token: 'removes-feelings' },
            { text: 'Sentence 3', is_correct: false, misconception_token: 'removes-key-event' },
            { text: 'Sentence 8', is_correct: false, misconception_token: 'removes-key-event' },
          ],
          solution:
            'Sentence 10 is about costumes, which has nothing to do with the writer forgetting and remembering the line. Sentence 8 must stay because it shows how the writer remembered.',
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: 'Which sentence best shows how the writer felt while standing on stage?',
          choices: [
            { text: 'Sentence 7', is_correct: true },
            { text: 'Sentence 3', is_correct: false, misconception_token: 'action-not-feeling' },
            { text: 'Sentence 4', is_correct: false, misconception_token: 'setting-not-feeling' },
            { text: 'Sentence 2', is_correct: false, misconception_token: 'fact-not-feeling' },
          ],
          solution:
            'A thumping heart shows that the writer was nervous on stage. Sentence 4 describes the crowded gym, which is setting, not a feeling.',
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: 'After sentence 10 is removed, which sentence would best end the story?',
          choices: [
            { text: 'After the play, I hugged Priya and said thank you for saving my big moment.', is_correct: true },
            { text: 'Next year, our class might put on a play about pirates.', is_correct: false, misconception_token: 'starts-new-topic' },
            { text: 'Then my mind went blank again, and I forgot everything.', is_correct: false, misconception_token: 'starts-new-problem' },
            { text: 'The gym has a shiny wooden floor and tall windows.', is_correct: false, misconception_token: 'detail-not-closure' },
          ],
          solution:
            'Thanking Priya wraps up the story by connecting back to how the writer was helped in sentence 8. A play about pirates is a new topic, so it does not close this story.',
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: 'Which time phrase in the story shows that a lot of time passed before the play?',
          choices: [
            { text: 'For two weeks', is_correct: true },
            { text: 'When it was my turn', is_correct: false, misconception_token: 'short-time-phrase' },
            { text: 'Then', is_correct: false, misconception_token: 'short-time-phrase' },
            { text: 'On the night of the play', is_correct: false, misconception_token: 'names-moment-not-length' },
          ],
          solution:
            '"For two weeks" in sentence 3 tells how long the writer practiced before the play. "On the night of the play" tells when the show happened, not how much time passed.',
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: 'The writer wants to add a sentence between sentences 8 and 9 that shows the writer\'s thought. Which is best?',
          choices: [
            { text: 'I thought, "Now I remember how my line goes!"', is_correct: true },
            { text: 'Priya was wearing a green shirt that night.', is_correct: false, misconception_token: 'detail-not-thought' },
            { text: 'The curtain behind the stage was dark red.', is_correct: false, misconception_token: 'detail-not-thought' },
            { text: 'Priya had a part in the play too.', is_correct: false, misconception_token: 'fact-not-thought' },
          ],
          solution:
            'Only "I thought" tells what is in the writer\'s mind, and it links Priya\'s help to the shouted line in sentence 9. The choices about the green shirt, the dark red curtain, and Priya having a part only add facts.',
        },
      ],
    },
    {
      code: 'wg3-narrative-writing-p07',
      title: 'The Tide Pool',
      body:
        '(1) Last summer, my family drove to a beach to explore tide pools. (2) Mom told us to step only on dry rocks so we would not slip. (3) I knelt beside a pool of clear, cold water. (4) At first, it looked empty. (5) Then a tiny crab scuttled sideways out from under a rock. (6) I gasped and pointed.\n\n' +
        '(7) My brother Tariq leaned so close that his nose almost touched the water. (8) Beside the crab, a purple sea star clung to the rock. (9) ________ (10) We watched for a long time without saying a word. (11) Finally, the tide came back in, and we had to leave.',
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: 'Which word in sentence 5 tells the reader the order of events?',
          choices: [
            { text: 'Then', is_correct: true },
            { text: 'tiny', is_correct: false, misconception_token: 'picks-describing-word' },
            { text: 'sideways', is_correct: false, misconception_token: 'picks-action-word' },
            { text: 'under', is_correct: false, misconception_token: 'picks-place-word' },
          ],
          solution:
            '"Then" is a time word that shows the crab appeared after the pool looked empty. "Sideways" tells how the crab moved, not when.',
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: 'Which line of dialogue best fills the blank as sentence 9?',
          choices: [
            { text: '"Wow, I have never seen a real sea star before," Tariq whispered.', is_correct: true },
            { text: '"I am bored, so let\'s go get some lunch now," Tariq said.', is_correct: false, misconception_token: 'contradicts-story' },
            { text: '"My shoes are getting wet," Tariq said.', is_correct: false, misconception_token: 'off-topic-dialogue' },
            { text: '"Our car is parked over by the road," Tariq said.', is_correct: false, misconception_token: 'off-topic-dialogue' },
          ],
          solution:
            'Tariq\'s quiet amazement fits sentence 8, which shows the sea star, and sentence 10, where they watch silently for a long time. Saying "I am bored" does not fit, because the children keep watching until the tide comes in.',
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: 'Which revision of sentence 1 best helps the reader picture the beach?',
          choices: [
            { text: 'Last summer, my family drove to a beach where waves splashed over black rocks.', is_correct: true },
            { text: 'Last summer, my family drove to a beach that was very far away.', is_correct: false, misconception_token: 'detail-not-visual' },
            { text: 'Last summer, my family drove to a beach, which is a place by water.', is_correct: false, misconception_token: 'definition-not-detail' },
            { text: 'Last summer, my family drove to a beach during the summer.', is_correct: false, misconception_token: 'repeats-information' },
          ],
          solution:
            'Waves splashing over black rocks gives sights the reader can picture. "Very far away" tells about the drive, not what the beach looked like.',
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: 'Which revision of sentence 11 gives the story the strongest sense of closure?',
          choices: [
            { text: 'Finally, the tide came back in, and as we left, I whispered goodbye to the little crab.', is_correct: true },
            { text: 'Finally, the tide came back in, and we went to a restaurant for a big dinner.', is_correct: false, misconception_token: 'starts-new-event' },
            { text: 'Finally, the tide came back in, so the tide pools were filled with water again.', is_correct: false, misconception_token: 'detail-not-closure' },
            { text: 'Finally, the tide came back in, and tides at most beaches happen twice a day.', is_correct: false, misconception_token: 'adds-fact-not-closure' },
          ],
          solution:
            'Saying goodbye to the crab ties the ending back to the creature the writer discovered, which closes the story. The restaurant revision starts a new event instead of finishing the tide pool visit.',
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: 'Why does the writer include sentence 4, "At first, it looked empty"?',
          choices: [
            { text: 'It sets up a surprise, so finding the crab feels more exciting.', is_correct: true },
            { text: 'It shows that the trip to the beach was boring.', is_correct: false, misconception_token: 'literal-reading' },
            { text: 'It tells the reader how the story will end.', is_correct: false, misconception_token: 'confuses-event-with-ending' },
            { text: 'It describes what Tariq is doing at the pool.', is_correct: false, misconception_token: 'wrong-character' },
          ],
          solution:
            'Because the pool seems empty, the crab in sentence 5 and the gasp in sentence 6 feel like a surprise. The trip was not boring, since the writer gasps and watches for a long time.',
        },
      ],
    },
    {
      code: 'wg3-narrative-writing-p08',
      title: 'A School From Long Ago',
      body:
        '(1) On Friday, our class visited a schoolhouse that is more than one hundred years old. (2) It had only one room, with a wood stove in the middle. (3) A guide named Mrs. Lindqvist rang a big brass bell to start the day. (4) We sat on hard wooden benches and wrote on small slate boards with chalk. (5) My slate squeaked every time I made a letter.\n\n' +
        '(6) Mrs. Lindqvist said that children of every age once learned together in this room. (7) I tried to imagine my little sister and me sitting side by side in class. (8) Next, we each took a turn pumping water from an old pump outside. (9) The handle was so heavy that I had to use both hands. (10) My favorite color is blue.',
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: 'Which sentence should be removed because it does not belong in the story?',
          choices: [
            { text: 'Sentence 10', is_correct: true },
            { text: 'Sentence 5', is_correct: false, misconception_token: 'removes-description' },
            { text: 'Sentence 7', is_correct: false, misconception_token: 'removes-thought' },
            { text: 'Sentence 9', is_correct: false, misconception_token: 'removes-description' },
          ],
          solution:
            'Sentence 10 is about the writer\'s favorite color, which has nothing to do with the visit. Sentence 7 should stay because it shows what the writer imagined.',
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: 'Which sentence shows what the writer was thinking during the visit?',
          choices: [
            { text: 'Sentence 7', is_correct: true },
            { text: 'Sentence 2', is_correct: false, misconception_token: 'setting-not-thought' },
            { text: 'Sentence 4', is_correct: false, misconception_token: 'action-not-thought' },
            { text: 'Sentence 8', is_correct: false, misconception_token: 'action-not-thought' },
          ],
          solution:
            'In sentence 7, the writer "tried to imagine" sharing a class with a little sister, which is a thought. Sentence 4 tells actions the class did, like sitting and writing.',
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: 'After sentence 10 is removed, which sentence would best end the story?',
          choices: [
            { text: 'As the bus pulled away, I looked back and felt glad I had seen how school used to be.', is_correct: true },
            { text: 'My school today has a computer lab and a big gym with a stage.', is_correct: false, misconception_token: 'shifts-topic' },
            { text: 'The next week, our class visited a farm and fed some goats.', is_correct: false, misconception_token: 'starts-new-event' },
            { text: 'The bell that Mrs. Lindqvist rang was made of shiny brass.', is_correct: false, misconception_token: 'repeats-detail' },
          ],
          solution:
            'Leaving on the bus and feeling glad about what was learned closes the visit. The farm trip is a new event, so it opens a new story instead of ending this one.',
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: 'Sentence 8 begins with "Next." Why is this a good word to use there?',
          choices: [
            { text: 'It shows that pumping water came after the class time inside the room.', is_correct: true },
            { text: 'It shows that pumping water was the most important part of the trip.', is_correct: false, misconception_token: 'confuses-order-with-importance' },
            { text: 'It shows that the story took place more than one hundred years ago.', is_correct: false, misconception_token: 'confuses-setting-time' },
            { text: 'It tells the reader that the story is ending right there.', is_correct: false, misconception_token: 'confuses-transition-with-closing' },
          ],
          solution:
            '"Next" moves the story from the benches and slates inside to the pump outside, keeping the events in order. It does not mean the pump was most important, only that it came later.',
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: 'The writer wants to add dialogue after sentence 6 that shows how a classmate reacted to what Mrs. Lindqvist said. Which is best?',
          choices: [
            { text: '"Even the big kids and the little kids, all in one room?" Nadia asked in surprise.', is_correct: true },
            { text: '"The stove in the middle of the room is black," Nadia said.', is_correct: false, misconception_token: 'detail-not-reaction' },
            { text: '"I am getting hungry for lunch," Nadia said.', is_correct: false, misconception_token: 'off-topic-dialogue' },
            { text: '"Our school starts at eight o\'clock," Nadia said.', is_correct: false, misconception_token: 'off-topic-dialogue' },
          ],
          solution:
            'Nadia\'s surprised question responds directly to the idea that children of every age learned together. The comment about the stove describes the room, but it is not a reaction to what Mrs. Lindqvist said.',
        },
      ],
    },
  ],
}

export default skill
