import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g10-narrative-writing',
  subject: 'writing',
  grade: 10,
  group: 'Composition',
  name: 'Narrative Writing',
  standards: ['W.9-10.3'],
  passages: [
    {
      code: 'wg10-narrative-writing-p01',
      title: 'The Heron in Crate Six',
      body: `(1) Every Saturday that spring, I fed a great blue heron that refused to look at me. (2) The heron had arrived at the Millbrook Wildlife Center in March with fishing line wrapped around one leg, and the staff called it Crate Six because of the crate it lived in. (3) My job was simple: drop thawed fish into a shallow pan, step back, and record whether the bird ate. (4) For six weeks, the answer on my clipboard was usually no.

(5) Dr. Amara Okafor, the center's veterinarian, said the heron was eating at night when no one watched. (6) "Herons are proud," she told me. (7) "They don't like an audience." (8) Herons can be found on every continent except Antarctica. (9) I wasn't sure I believed her, but the pan was always empty by Monday.

(10) Then, on the first warm Saturday in May, she handed me a pair of thick leather gloves. (11) "Release day," she said. (12) We drove the crate to the marsh behind Harlow Pond, where the cattails rattled in the wind and the mud smelled of rain and old leaves. (13) I unlatched the door and stepped back the way I always did. (14) Nothing happened for a full minute. (15) The heron folded its neck, studied the water, and finally stepped out, one careful leg at a time. (16) It walked to the edge of the pond, spread wings wider than my arms, and lifted off with three slow, heavy beats.

(17) I watched it until it was a gray speck above the trees. (18) Then we drove back to the center.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it interrupts the story with information that does not belong?`,
          choices: [
            no(`sentence 4`, 'removes-key-problem'),
            no(`sentence 7`, 'removes-dialogue'),
            ok(`sentence 8`),
            no(`sentence 14`, 'removes-pacing-detail'),
          ],
          solution: `Sentence 8 is a general fact about herons that breaks the story of the narrator and this one bird. Sentence 7 must stay because the doctor's words explain why the heron never ate while the narrator watched.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 18 as a conclusion that reflects on the experience?`,
          choices: [
            no(`Great blue herons usually return to the same wetlands every spring to build their nests.`, 'generic-fact-ending'),
            ok(`On the ride back, I realized the heron had never needed me to watch it; it had only needed me to keep showing up.`),
            no(`After that, we cleaned out the empty crate, hosed down the pan, and put away the leather gloves.`, 'flat-ending-no-reflection'),
            no(`The heron had come to the center in March with fishing line wrapped around one of its legs.`, 'restates-situation'),
          ],
          solution: `The correct choice reflects on what the narrator learned, linking the release to the weeks of feeding a bird that would not eat in front of anyone. The cleanup choice ends with actions but offers no reflection.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `What is the main purpose of the phrase "Then, on the first warm Saturday in May" at the start of sentence 10?`,
          choices: [
            no(`It shows that the weather caused the heron to recover from its injury.`, 'confuses-cause-effect'),
            ok(`It signals a jump forward in time from weeks of routine to the day of the release.`),
            no(`It shifts the point of view from the narrator to Dr. Okafor.`, 'false-pov-shift'),
            no(`It introduces a flashback to the day the heron first arrived at the center.`, 'misreads-time-order'),
          ],
          solution: `The phrase moves the story ahead from the repeated Saturdays in paragraph 1 to one important day. It does not claim the warm weather caused anything, and the narrator still tells the story.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `How do sentences 14 and 15 affect the pacing of the release scene?`,
          choices: [
            ok(`They slow the moment down by showing a pause and then each small movement the heron makes.`),
            no(`They speed the story up by skipping past the release to the drive home.`, 'misreads-pacing-speed'),
            no(`They interrupt the scene with background facts about the wildlife center.`, 'misidentifies-content'),
            no(`They use dialogue to reveal what the narrator is thinking during the release.`, 'no-dialogue-present'),
          ],
          solution: `The full minute of nothing and the careful steps stretch a few seconds into a suspenseful moment. Nothing is skipped, and neither sentence contains dialogue.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence 4 that develops the narrator's point of view toward the heron. Which sentence does this best?`,
          choices: [
            no(`The center also cared for two red foxes, a box turtle, and several owls that spring.`, 'off-topic-detail'),
            no(`Herons hunt by standing still in shallow water and striking quickly at passing fish.`, 'generic-fact-not-pov'),
            ok(`I started to take its silence personally, as if the bird had looked me over and found me boring.`),
            no(`My clipboard had a column for the date, the time, and the amount of fish in the pan.`, 'detail-without-feeling'),
          ],
          solution: `The correct sentence reveals how the narrator feels about the heron's refusal, which sets up the later realization. The clipboard detail describes the job but shows no attitude or feeling.`,
        },
      ],
    },
    {
      code: 'wg10-narrative-writing-p02',
      title: 'One Length Down',
      body: `(1) As coxswain of the Riverside junior eight, I was the only person in the boat facing forward, which meant I was the only one who could see how far behind we were. (2) At the halfway mark of the regional final, the Eastgate boat was a full length ahead, and its stern was pulling away. (3) My rowers could see only my face and the water sliding past their oars. (4) I had to decide how much of the truth to tell them.

(5) Our stroke seat, Mateo Ruiz, caught my eye. (6) His face was red, and his breath came in sharp bursts. (7) "Where are we?" he gasped. (8) I could have lied. (9) Instead I leaned into the microphone and said, "Down a length. Give me ten strokes, and I'll give you their bow." (10) The crew answered, and the hull began to hiss through the water. (11) The oars struck together, clean and quick, and the river smelled of mud and sunscreen.

(12) Racing shells are usually made of carbon fiber, which makes them light and stiff. (13) With five hundred meters left, I saw the Eastgate coxswain glance sideways at us. (14) Her rowers were rushing up the slide, and their blades splashed instead of biting. (15) I called the sprint, and we raised our rate by two beats, then two more. (16) Our bow crept past their stern, then their middle seats, then their coxswain. (17) We crossed the line half a second ahead.

(18) We won the race, and everyone was happy.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not move the story forward?`,
          choices: [
            no(`sentence 3`, 'removes-key-problem'),
            no(`sentence 8`, 'removes-internal-reaction'),
            ok(`sentence 12`),
            no(`sentence 14`, 'removes-turning-detail'),
          ],
          solution: `Sentence 12 gives a general fact about boat materials in the middle of the race. Sentence 14 must stay because it shows the rival crew tiring, which explains how Riverside catches up.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 18 as a reflective conclusion?`,
          choices: [
            no(`The Eastgate crew finished second, and a crew from Hollis Point finished third.`, 'flat-ending-no-reflection'),
            no(`Coxswains steer the boat and call commands, but they do not row at all.`, 'generic-fact-ending'),
            ok(`I still think about that moment at the halfway mark, when telling the truth turned out to be the strongest call I could make.`),
            no(`At the halfway mark of the regional final, we were a full length behind the Eastgate boat.`, 'restates-situation'),
          ],
          solution: `The correct choice reflects on the narrator's decision in sentence 4 and connects it to the win. The choice about the finishing order only reports results without any reflection.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `What do sentences 3 and 4 contribute to the opening of the narrative?`,
          choices: [
            no(`They describe the river so the reader can picture the race course.`, 'confuses-setting-with-problem'),
            ok(`They set up the narrator's problem: only the coxswain knows the crew is losing.`),
            no(`They introduce a disagreement between the narrator and Mateo.`, 'misidentifies-conflict'),
            no(`They reveal the outcome of the race before it happens.`, 'misreads-time-order'),
          ],
          solution: `Sentences 3 and 4 explain that the rowers cannot see the other boat, so the narrator must choose what to tell them. There is no argument with Mateo; he only asks a question.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `How does sentence 16 help the reader experience the end of the race?`,
          choices: [
            no(`It summarizes the whole sprint in a single general statement.`, 'misreads-pacing-speed'),
            no(`It shifts to the Eastgate coxswain's point of view.`, 'false-pov-shift'),
            ok(`It traces the boat's progress step by step, so the reader feels the gap closing.`),
            no(`It uses dialogue to show how the crew reacted to winning.`, 'no-dialogue-present'),
          ],
          solution: `The pattern "past their stern, then their middle seats, then their coxswain" lets the reader watch the boat creep forward. It is not a summary, and no one speaks in the sentence.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Why is the dialogue in sentence 9 more effective than the summary "I told them we were behind"?`,
          choices: [
            no(`It gives the exact distance between the two boats in meters.`, 'unsupported-detail'),
            no(`It shows that the narrator decided to lie to protect the crew.`, 'contradicts-text'),
            no(`It lets Mateo explain his own point of view about the race.`, 'wrong-speaker'),
            ok(`It shows the narrator choosing honesty and turning the bad news into a goal the crew can chase.`),
          ],
          solution: `The words "Give me ten strokes, and I'll give you their bow" reveal both the truth and a challenge, which a plain summary could not show. The narrator explicitly does not lie, as sentence 8 and the word "Instead" make clear.`,
        },
      ],
    },
    {
      code: 'wg10-narrative-writing-p03',
      title: 'Bridge Labor, 1931',
      body: `(1) I went to the Calloway County archive to find one fact for a history project, and I left with a story I had not been looking for. (2) My assignment was to learn when the old Pine Street bridge had been built. (3) The archivist, Ms. Delphine Arceneaux, brought me a stack of town ledgers bound in cracked brown leather. (4) The pages were old.

(5) For an hour I turned pages filled with slanted handwriting about road repairs and lumber prices. (6) Meanwhile, at home, my grandfather was sorting his boxes for a move to a smaller apartment, and he had texted me a photo of a bridge with three young men standing on it. (7) I did not think the two things were connected. (8) Then, on a page dated June 1931, I found a list of workers paid for "bridge labor." (9) The third name was Ezekiel Banda, my grandfather's father.

(10) I asked Ms. Arceneaux if I could photograph the page. (11) "Of course," she said, leaning over my shoulder. (12) "You'd be surprised how often people find their own families in here." (13) My hands were not quite steady as I lined up the shot. (14) Many county archives now scan their records so that people can search them online. (15) I sent the picture to my grandfather with a single question mark.

(16) His reply came before I reached the bus stop: "That's him in my photo. Second from the left." (17) I stood on the curb and zoomed in on the young man with rolled sleeves and a crooked grin. (18) The bridge was built in 1931.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it breaks the flow of events with unrelated information?`,
          choices: [
            no(`sentence 7`, 'removes-setup'),
            no(`sentence 13`, 'removes-internal-reaction'),
            ok(`sentence 14`),
            no(`sentence 17`, 'removes-key-image'),
          ],
          solution: `Sentence 14 is a general comment about archives that pulls the reader away from the moment of discovery. Sentence 13 must stay because it shows the narrator's emotion.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 18 as a reflective conclusion?`,
          choices: [
            no(`The Pine Street bridge is about ninety feet long and crosses a narrow creek.`, 'generic-fact-ending'),
            no(`I took the bus home, ate dinner, and started typing my project report.`, 'flat-ending-no-reflection'),
            no(`The archivist had brought me a stack of ledgers bound in cracked brown leather.`, 'restates-situation'),
            ok(`I had come looking for a date, but the bridge I crossed every day now carried my family's name.`),
          ],
          solution: `The correct choice reflects on how the narrator's view of the bridge changed, echoing sentence 1. The bus ride choice lists actions without any reflection.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `What is the purpose of the transition "Meanwhile, at home" in sentence 6?`,
          choices: [
            ok(`It signals a second plot line happening at the same time in a different place.`),
            no(`It shows that the narrator has left the archive and gone home.`, 'misreads-setting-shift'),
            no(`It introduces an event that happened many years before the story.`, 'misreads-time-order'),
            no(`It explains that the grandfather caused the narrator to visit the archive.`, 'confuses-cause-effect'),
          ],
          solution: `"Meanwhile" tells the reader that the grandfather's sorting happens while the narrator reads ledgers, setting up two plot lines that later meet. The narrator is still at the archive, as sentence 8 shows.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which revision of sentence 4 adds the most precise sensory detail?`,
          choices: [
            no(`The pages were very, very old and quite interesting.`, 'vague-intensifiers'),
            ok(`The pages smelled like dust and old coffee, and their edges crumbled under my thumb.`),
            no(`The pages were from a long time ago, back when the town was much smaller.`, 'no-sensory-detail'),
            no(`The pages were old, which is normal for an archive.`, 'adds-commentary-not-detail'),
          ],
          solution: `The correct choice appeals to smell and touch with specific images. The choice with "very, very old" only adds vague intensifiers.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Why does the writer include sentence 7 before the discovery in sentences 8 and 9?`,
          choices: [
            no(`To prove that the grandfather's photo had nothing to do with the project.`, 'literal-reading'),
            no(`To slow the story with a long description of the archive.`, 'misidentifies-content'),
            ok(`To set up a surprise, since the narrator expects the two plot lines to stay separate.`),
            no(`To show that the narrator already knew who built the bridge.`, 'contradicts-text'),
          ],
          solution: `Sentence 7 states the narrator's belief that the photo and the research are unrelated, which makes the name in sentence 9 a surprise. The story goes on to show the two are connected, so the literal reading is wrong.`,
        },
      ],
    },
    {
      code: 'wg10-narrative-writing-p04',
      title: 'The Edge of the Sky',
      body: `(1) Our physics club spent four months building a payload box for a weather balloon, and we lost it in under two hours. (2) The box held a small camera, a temperature sensor, and a tracker that was supposed to send its location every minute. (3) On launch morning, frost covered the soccer field, and our breath hung in the air as we filled the balloon. (4) Mr. Petrosyan counted down from ten, and the balloon rose so fast that we had to tilt our heads back to follow it.

(5) For ninety minutes, the dots on the laptop map climbed steadily east. (6) Then the dots stopped. (7) Priya refreshed the screen five times. (8) "It might just be out of range," she said, but her voice was thin. (9) Our club also sells baked goods every fall to pay for supplies. (10) The bus ride home was silent.

(11) A farmer named Mr. Lindqvist called the school. (12) He had found a foam box tangled in a fence on his property, sixty miles away, with our club's phone number written on the side. (13) That Saturday we drove out to collect it. (14) The box was dented, and one corner was torn, but the camera's memory card was dry. (15) Back in the lab, we crowded around the screen as the video played. (16) At first we saw only the soccer field shrinking below us. (17) Next came the clouds, then a thin blue line along the horizon, and finally the curve of the Earth against a black sky.

(18) That is what happened to our balloon.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not belong in the narrative?`,
          choices: [
            no(`sentence 7`, 'removes-pacing-detail'),
            ok(`sentence 9`),
            no(`sentence 10`, 'removes-mood-detail'),
            no(`sentence 14`, 'removes-key-detail'),
          ],
          solution: `Sentence 9 is about a bake sale and has nothing to do with the lost balloon. Sentence 10 stays because the silent ride shows how disappointed the club feels.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which phrase, added at the beginning of sentence 11, best signals the shift in time?`,
          choices: [
            ok(`Three days later,`),
            no(`In contrast,`, 'wrong-transition-type'),
            no(`For example,`, 'wrong-transition-type'),
            no(`Because of the frost,`, 'confuses-cause-effect'),
          ],
          solution: `"Three days later" tells the reader how much time passed between the silent bus ride and the phone call. "Because of the frost" wrongly suggests the weather caused the call.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `What is the effect of the short sentence 6 after the longer sentence 5?`,
          choices: [
            no(`It slows the story so the reader can enjoy a long description of the map.`, 'misreads-pacing-speed'),
            ok(`It creates an abrupt turn that matches the sudden loss of the signal.`),
            no(`It introduces a new character who will solve the problem.`, 'misidentifies-content'),
            no(`It explains the scientific reason the tracker stopped working.`, 'unsupported-inference'),
          ],
          solution: `After ninety calm minutes, the four-word sentence stops the reader just as the dots stop. The story never explains why the tracker failed, so the scientific reason choice is unsupported.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 18 as a conclusion that reflects on the experience?`,
          choices: [
            no(`Weather balloons can rise more than twenty miles before they finally burst.`, 'generic-fact-ending'),
            no(`Mr. Lindqvist said we could visit his farm again whenever we wanted.`, 'adds-new-plot-point'),
            ok(`We had thought the box was lost for good, but the dented foam had carried the one view none of us could ever reach.`),
            no(`The box held a camera, a temperature sensor, and a tracker that stopped sending.`, 'restates-situation'),
          ],
          solution: `The correct choice reflects on the shift from loss to wonder, tying back to sentence 1 and the video. The Mr. Lindqvist choice adds a new detail instead of closing the story.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Why are the details in sentences 16 and 17 arranged in this order?`,
          choices: [
            no(`They move from the most important image to the least important one.`, 'reversed-order'),
            ok(`They follow the balloon's climb, building from the field to the curve of the Earth as the story's high point.`),
            no(`They list what the club saw in the order they searched the farmer's fence.`, 'misreads-setting'),
            no(`They jump back in time to show the launch from Mr. Petrosyan's point of view.`, 'false-pov-shift'),
          ],
          solution: `The sequence "at first... next... then... finally" mirrors the balloon rising higher, so the story ends on its most striking image. The order builds toward the most important image rather than away from it.`,
        },
      ],
    },
    {
      code: 'wg10-narrative-writing-p05',
      title: 'Two Languages at Counter Three',
      body: `(1) My grandmother, Lola Remedios, has lived in this country for eleven years, but she still asks me to come with her to the pharmacy. (2) On Tuesday, the pharmacist said her blood pressure medicine had switched to a new maker, and Lola's face tightened. (3) She held the new bottle up to the light as if it might be a trick. (4) "These are white," she whispered to me in Tagalog. (5) "Mine are always yellow."

(6) I turned to the pharmacist, a tall man named Mr. Adeyemi, and repeated her worry in English. (7) He nodded patiently. (8) "Same medicine, same dose," he said. (9) "Different company, different color." (10) I translated, but Lola shook her head. (11) To her, I realized, the color was not a small detail. (12) It was the one thing she could check by herself without asking anyone for help.

(13) Behind us, the line was growing. (14) A man in a work jacket sighed loudly, and my cheeks went hot. (15) I wanted to tell Lola to just take the bottle so we could leave. (16) Instead, I asked Mr. Adeyemi if he could write the new color on the label. (17) He smiled, took a marker, and wrote in block letters: WHITE PILL, SAME AS YELLOW. (18) Lola traced the words with her finger and finally put the bottle in her purse.

(19) We walked home.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 19 as a reflective conclusion?`,
          choices: [
            no(`Blood pressure medicine is often made by several different companies.`, 'generic-fact-ending'),
            no(`We walked home slowly, stopping at the corner store to buy bread.`, 'flat-ending-no-reflection'),
            ok(`On the walk home, I thought about how often I translate words for Lola, and how rarely I stop to translate what she means.`),
            no(`My grandmother has lived in this country for eleven years and speaks Tagalog.`, 'restates-situation'),
          ],
          solution: `The correct choice reflects on what the narrator learned about understanding Lola's point of view. The corner store choice adds actions but no reflection.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `What is the main function of sentences 11 and 12?`,
          choices: [
            ok(`They show the narrator beginning to understand the situation from Lola's point of view.`),
            no(`They explain the science of how pill colors are chosen.`, 'unsupported-inference'),
            no(`They show that Mr. Adeyemi was wrong about the medicine.`, 'contradicts-text'),
            no(`They speed up the story by skipping ahead to the walk home.`, 'misreads-pacing-speed'),
          ],
          solution: `The words "I realized" mark a moment of reflection in which the narrator sees why the color matters to Lola. Nothing suggests the pharmacist was wrong; the medicine is the same.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `How do sentences 13 and 14 develop the narrative?`,
          choices: [
            no(`They describe the pharmacy's shelves to establish the setting.`, 'confuses-setting-with-conflict'),
            no(`They introduce the man in the work jacket as the main character.`, 'misidentifies-focus'),
            ok(`They add outside pressure that makes the narrator's choice in sentence 16 harder.`),
            no(`They end the conflict between Lola and the pharmacist.`, 'misreads-resolution'),
          ],
          solution: `The growing line and the loud sigh embarrass the narrator, which raises the stakes of choosing to help Lola instead of rushing her. The man is a minor figure, not the main character.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `What does the transition "Instead" at the start of sentence 16 show?`,
          choices: [
            no(`It shows that the narrator followed through on the wish in sentence 15.`, 'reverses-contrast'),
            ok(`It shows the narrator choosing a different action than the one described in sentence 15.`),
            no(`It shows that time has passed since the visit to the pharmacy.`, 'wrong-transition-type'),
            no(`It shows that Lola is now the one telling the story.`, 'false-pov-shift'),
          ],
          solution: `"Instead" signals a contrast: the narrator wanted to hurry Lola but chose to ask for help. It does not mark the passage of time.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `The writer wants to add a line of dialogue after sentence 18 that reveals Lola's point of view. Which line does this best?`,
          choices: [
            no(`"Next, please," Mr. Adeyemi called to the man in the work jacket.`, 'wrong-speaker'),
            no(`"Do you want a bag for that?" the cashier asked us.`, 'off-topic-detail'),
            no(`"I told you it was the same medicine," I said to Lola.`, 'narrator-pov-not-lola'),
            ok(`"Now I can read it myself," Lola said quietly, patting her purse.`),
          ],
          solution: `Lola's line shows that what she wanted was independence, which matches the narrator's realization in sentence 12. The narrator's line gives the narrator's view, not Lola's, and sounds impatient.`,
        },
      ],
    },
    {
      code: 'wg10-narrative-writing-p06',
      title: 'The A String',
      body: `(1) Four measures before my cello solo at the winter concert, my A string snapped with a sound like a rubber band hitting a desk. (2) The orchestra kept playing around me. (3) I stared at the loose string curled against the fingerboard and felt the stage lights burning on the back of my neck. (4) In the second row, I could see my little brother, Kofi, sitting up straight in his only collared shirt.

(5) Our conductor, Ms. Varga, glanced at me without stopping her baton. (6) At every rehearsal she had told us, "A concert is not a test. It is a conversation." (7) I had always thought that was the kind of thing adults say to make you less nervous. (8) Now I had three measures to decide what to do.

(9) The solo was written mostly on the A string, but I knew the same notes existed lower on the D string if I shifted my hand far up the neck. (10) I had practiced those positions only in scales, never in this piece. (11) The cello was first developed in Italy in the 1500s. (12) I took a breath, slid my left hand up the D string, and began.

(13) The first note wobbled. (14) The second was steadier. (15) By the fourth bar my bow was moving the way it did in my bedroom at night, slow and heavy, and the hall went quiet in a way I could feel through the floor. (16) When the violins came back in under me, I realized I had played the entire solo without thinking about the missing string once.

(17) Afterward, Kofi told me it was the best part of the concert. (18) He had not even noticed that the string was broken.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it interrupts the tension with unrelated information?`,
          choices: [
            no(`sentence 4`, 'removes-setup'),
            no(`sentence 10`, 'removes-key-problem'),
            ok(`sentence 11`),
            no(`sentence 13`, 'removes-pacing-detail'),
          ],
          solution: `Sentence 11 is a history fact about the cello that stops the story right before the narrator plays. Sentence 10 stays because it shows why switching strings is risky.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `What is the purpose of sentences 7 and 8?`,
          choices: [
            no(`They describe the concert hall so the reader can picture the audience.`, 'confuses-setting-with-conflict'),
            ok(`They show the narrator's doubt about the conductor's advice and remind the reader how little time is left.`),
            no(`They explain exactly how to play the solo on the D string.`, 'misidentifies-content'),
            no(`They reveal that the narrator decides not to play the solo at all.`, 'contradicts-text'),
        ],
          solution: `Sentence 7 shows the narrator's skepticism, and sentence 8 adds urgency with "three measures." The narrator does play, as sentence 12 shows.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `How do the short sentences 13 and 14 affect the pacing of the solo?`,
          choices: [
            ok(`They slow the opening of the solo note by note, so the reader feels the narrator's uncertainty.`),
            no(`They skip quickly over the solo to reach the end of the concert.`, 'misreads-pacing-speed'),
            no(`They switch to Kofi's point of view as he listens from the audience.`, 'false-pov-shift'),
            no(`They interrupt the solo with a flashback to earlier rehearsals.`, 'misreads-time-order'),
          ],
          solution: `Describing each of the first two notes on its own makes the reader live through the shaky start. The story stays in the narrator's point of view and does not flash back.`,
        },
        {
          slot: 29,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence 18, would best conclude the narrative with a reflection that connects to earlier events?`,
          choices: [
            no(`I replaced the A string the next morning and practiced my scales for an hour.`, 'flat-ending-no-reflection'),
            ok(`Maybe Ms. Varga was right: Kofi had not heard a mistake, only a cello answering the orchestra the best way it could.`),
            no(`The winter concert also included a choir and a short jazz band set after the intermission.`, 'off-topic-detail'),
            no(`Cello strings can break when they get old or when the weather turns dry and cold.`, 'generic-fact-ending'),
          ],
          solution: `The correct choice links Kofi's reaction to Ms. Varga's advice in sentence 6 and shows the narrator rethinking the doubt in sentence 7. The new string choice only reports a later action.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Why is it important that the writer introduces Kofi in sentence 4?`,
          choices: [
            no(`It shows that Kofi caused the string to break.`, 'confuses-cause-effect'),
            no(`It shifts the narrative so Kofi becomes the narrator.`, 'false-pov-shift'),
            no(`It describes the stage lights and the concert setting.`, 'misidentifies-content'),
            ok(`It raises the stakes early and prepares the reader for Kofi's reaction in the ending.`),
          ],
          solution: `Seeing a little brother in the audience adds pressure, and his comment in sentences 17 and 18 pays off that early detail. Sentence 3, not sentence 4, describes the stage lights.`,
        },
      ],
    },
    {
      code: 'wg10-narrative-writing-p07',
      title: 'Bread by Lantern',
      body: `(1) The power went out at our family bakery at four in the morning, two hours before our first customers and five hours before my chemistry final. (2) I had planned to study flashcards at the counter while my mother, Elena Sanchez, shaped the dough. (3) Instead, the ovens went silent and the mixers ground to a stop. (4) In the sudden dark, the only sound was the rain drumming on the front window.

(5) My mother lit two camping lanterns and studied the racks of rising loaves. (6) "If these sit too long, they'll overproof and collapse," she said. (7) "We have maybe an hour." (8) She called our neighbor, Mr. Yamada, who owned the pizza shop across the street and had a gas oven. (9) Within ten minutes he was standing in our doorway with an umbrella and a key.

(10) We carried trays across the street in the rain, one at a time, while the sky turned from black to dark blue. (11) Between trips, I mumbled the terms from my flashcards: molar mass, limiting reagent, percent yield. (12) Mr. Yamada's oven was smaller than ours, so we baked in four batches. (13) The kitchen filled with the warm, toasty smell of crust, and the rain hissed on the hot window glass.

(14) At six, the first customer arrived to find the bread on the shelves, a little uneven but golden. (15) At seven, the lights flickered back on. (16) At eight, I was sitting in room 214 with a pencil, still smelling faintly of yeast. (17) The third question asked about limiting reagents, and I almost laughed. (18) That was my morning.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 18 as a reflective conclusion?`,
          choices: [
            ok(`I had studied for weeks, but carrying bread through the rain taught me more about limits than any flashcard.`),
            no(`After the test, I took the bus back to the bakery to help clean up.`, 'flat-ending-no-reflection'),
            no(`Many bakeries keep a backup generator in case the power goes out.`, 'generic-fact-ending'),
            no(`The power had gone out at four in the morning on the day of my final.`, 'restates-situation'),
          ],
          solution: `The correct choice reflects on the connection between the bakery crisis and the exam. The bus choice simply adds another action with no reflection.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `How does sentence 11 help the narrative?`,
          choices: [
            no(`It shows that the narrator has stopped worrying about the test.`, 'contradicts-text'),
            ok(`It keeps the second plot line, the chemistry final, alive in the middle of the bakery crisis.`),
            no(`It explains why Mr. Yamada's oven is smaller than the bakery's ovens.`, 'misidentifies-content'),
            no(`It shifts the setting to the classroom where the test takes place.`, 'misreads-setting-shift'),
        ],
          solution: `By mumbling flashcard terms between trips, the narrator shows that the exam is still on the narrator's mind, so both plot lines run together. The classroom does not appear until sentence 16.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `What is the effect of beginning sentences 14, 15 and 16 with "At six," "At seven," and "At eight"?`,
          choices: [
            no(`They slow the story down to describe each hour in great detail.`, 'misreads-pacing-speed'),
            no(`They show that the events happened in a random order.`, 'misreads-time-order'),
            ok(`They move the story quickly through the morning in clear time order toward the exam.`),
            no(`They signal that each sentence is told by a different character.`, 'false-pov-shift'),
          ],
          solution: `The repeated time markers speed the story through three hours and lead straight to the test. Each sentence gets only a brief detail, so the pace is faster, not slower.`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `Why does the writer use the mother's dialogue in sentences 6 and 7 instead of writing "My mother said we had to hurry"?`,
          choices: [
            ok(`The dialogue explains exactly what could go wrong and how much time they have, which raises the tension.`),
            no(`The dialogue reveals that the mother is angry with the narrator.`, 'unsupported-inference'),
            no(`The dialogue gives background facts about the history of the bakery.`, 'misidentifies-content'),
            no(`The dialogue shows that the bread has already collapsed.`, 'contradicts-text'),
          ],
          solution: `Her words name the danger, collapsing loaves, and the deadline, "maybe an hour," which a summary would lose. Nothing in her words suggests anger at the narrator.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Why does the narrator "almost laugh" in sentence 17?`,
          choices: [
            no(`The test question is so easy that the narrator finds it silly.`, 'unsupported-inference'),
            no(`The narrator is nervous and laughs whenever a test begins.`, 'unsupported-inference'),
            ok(`The idea of a limiting reagent matches the morning, when the small oven limited how much bread they could bake.`),
            no(`The narrator remembers that Mr. Yamada is also a chemistry teacher.`, 'adds-unstated-detail'),
          ],
          solution: `Sentence 12 says the smaller oven forced them to bake in batches, which mirrors the idea of a limiting factor and ties the two plot lines together. The story never says the question was easy.`,
        },
      ],
    },
    {
      code: 'wg10-narrative-writing-p08',
      title: 'Tally Marks in the Snow',
      body: `(1) On the coldest morning of December, my cousin Nadia and I volunteered for the town's annual winter bird count. (2) Our assigned area was a mile of trail along Fenwick Creek, and our job was to record every bird we saw or heard in three hours. (3) Nadia is twelve and had been looking forward to the count for weeks. (4) I had signed up mainly because it counted toward my community service hours.

(5) For the first hour we saw almost nothing. (6) The snow muffled every sound, and our boots crunched so loudly that I was sure we were scaring everything away. (7) Nadia kept stopping to listen with her eyes closed. (8) "There," she whispered, pointing at a bare oak. (9) I saw only branches until a small gray bird with a black cap dropped to a lower limb. (10) "Chickadee," she said, and made a careful tally mark in our notebook.

(11) After that, I started to notice things. (12) A flash of red in the brush became a cardinal. (13) A tapping sound turned out to be a downy woodpecker working along a dead branch. (14) Near the creek, a pair of ducks paddled through a gap in the ice, leaving dark ripples behind them. (15) My fingers went numb inside my gloves, but I no longer cared about the time.

(16) Snow is made of ice crystals that form around tiny bits of dust. (17) By noon our notebook held fourteen kinds of birds and sixty-two birds in all. (18) We handed it in at the nature center.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not belong in the narrative?`,
          choices: [
            no(`sentence 6`, 'removes-key-problem'),
            no(`sentence 15`, 'removes-internal-reaction'),
            ok(`sentence 16`),
            no(`sentence 17`, 'removes-resolution-detail'),
          ],
          solution: `Sentence 16 is a science fact about snow that has nothing to do with the bird count. Sentence 15 stays because it shows the narrator's attitude changing.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `What do sentences 3 and 4 establish at the start of the narrative?`,
          choices: [
            no(`The exact route the cousins will follow along the creek.`, 'confuses-setting-with-pov'),
            ok(`Two different points of view: Nadia is excited, while the narrator is there out of duty.`),
            no(`A conflict between the narrator and the nature center staff.`, 'misidentifies-conflict'),
            no(`The final number of birds the cousins will count.`, 'misreads-time-order'),
          ],
          solution: `Sentence 3 shows Nadia's eagerness and sentence 4 shows the narrator's reluctance, a contrast the story later resolves. The route is described in sentence 2, not 3 and 4.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `What is the purpose of the transition "After that" in sentence 11?`,
          choices: [
            no(`It shows that the cousins returned to the nature center.`, 'misreads-setting-shift'),
            no(`It introduces a flashback to an earlier bird count.`, 'misreads-time-order'),
            no(`It shows a contrast between chickadees and cardinals.`, 'wrong-transition-type'),
            ok(`It marks the turning point when spotting the chickadee changes how the narrator pays attention.`),
          ],
          solution: `"After that" ties the narrator's new awareness directly to the chickadee moment in sentences 9 and 10. The cousins are still on the trail, so it does not signal a return to the center.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence 18 as a conclusion that reflects on the narrator's change in point of view?`,
          choices: [
            no(`The nature center would add our numbers to the totals from the rest of the town.`, 'flat-ending-no-reflection'),
            no(`Chickadees, cardinals, and woodpeckers all stay in the area through the winter.`, 'generic-fact-ending'),
            no(`We handed in the notebook and then drove home with the heat turned all the way up.`, 'adds-action-not-reflection'),
            ok(`I had come for the service hours, but I left having learned from a twelve-year-old that the birds were there all along; I just had not been listening.`),
          ],
          solution: `The correct choice contrasts the narrator's reason in sentence 4 with what the narrator learned from Nadia's careful listening in sentence 7. The other choices end with facts or actions and show no reflection.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Why does the writer present the discoveries in sentences 12 through 14 as a series of short, separate observations?`,
          choices: [
            ok(`The quick series of sights and sounds shows the narrator's attention sharpening, in contrast to the empty first hour.`),
            no(`The list shows that the cousins were hurrying to finish before the time ran out.`, 'contradicts-text'),
            no(`The sentences are told from Nadia's point of view to show what she noticed.`, 'false-pov-shift'),
            no(`The list explains how to tell the difference between common winter birds.`, 'misidentifies-purpose'),
          ],
          solution: `After an hour of seeing nothing, one sighting quickly follows another, which mirrors the narrator's new awareness. Sentence 15 says the narrator no longer cared about the time, so the cousins were not hurrying.`,
        },
      ],
    },
  ],
}

export default skill
