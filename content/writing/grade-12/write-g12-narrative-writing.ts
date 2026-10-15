import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g12-narrative-writing',
  subject: 'writing',
  grade: 12,
  group: 'Composition',
  name: 'Narrative Writing',
  standards: ['W.11-12.3'],
  passages: [
    {
      code: 'wg12-narrative-writing-p01',
      title: 'The Rebuttal',
      body: `(1) The final round of the regional debate tournament was held in the school auditorium, and the stage lights were so bright that I could not see a single face in the audience. (2) My partner, Priya Raman, and I had argued the same side of the same resolution six times that weekend: that our city should keep its public libraries open until midnight. (3) We had won five of those rounds, but the team across the stage had won all six. (4) Their first speaker, a calm junior named Elias Okafor, opened with a statistic about late-night library use that I had never seen before.

(5) I scribbled notes so fast that my pen tore through the paper. (6) Priya slid a folded card across the table. (7) It said, "He's citing a study about a different city." (8) The auditorium was built in 1962 and holds about nine hundred people.

(9) I stood up for the rebuttal with my hands shaking. (10) I explained, as evenly as I could, that the study came from a city three times our size with a completely different bus system. (11) Then I asked the judges to look at our own city's numbers, which we had gathered by visiting branches and counting visitors after eight o'clock. (12) Elias nodded slowly while I spoke, as if he were taking the point seriously.

(13) The judges voted two to one for the other team. (14) We lost.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it interrupts the narrative with information that does not belong?`,
          choices: [
            no(`sentence 3`, 'removes-stakes'),
            no(`sentence 7`, 'removes-key-dialogue'),
            ok(`sentence 8`),
            no(`sentence 12`, 'removes-character-reaction'),
          ],
          solution: `Sentence 8 is a fact about the building that stalls the tension right before the rebuttal. Sentence 7 must stay because Priya's note is what the narrator's rebuttal in sentence 10 is built on.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 14 as a conclusion that reflects on the experience?`,
          choices: [
            no(`The tournament ended later that afternoon, and the buses took every team back to their own schools.`, 'flat-ending-no-reflection'),
            ok(`On the bus home, Priya and I kept rereading her card, prouder of that one rebuttal than of all five wins.`),
            no(`Debate tournaments are held in many states, and thousands of students compete in them each year.`, 'generic-fact-ending'),
            no(`The resolution we argued said that our city should keep its public libraries open until midnight.`, 'restates-situation'),
          ],
          solution: `The correct choice reflects on what the round meant, linking back to Priya's card and the narrator's rebuttal. The bus ride choice ends with events but no reflection.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which phrase would best begin sentence 13 to show the passage of time and build suspense before the result?`,
          choices: [
            no(`In addition to that,`, 'additive-not-time'),
            no(`For example,`, 'example-not-time'),
            ok(`After a silence that seemed to last for an hour,`),
            no(`On the other hand,`, 'contrast-not-time'),
          ],
          solution: `The correct phrase marks time passing and stretches the wait so the verdict lands harder. "On the other hand" signals a contrast, not a shift in time.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `The writer wants to slow the pacing between sentence 9 and sentence 10 to show the narrator's nerves. Which sentence should be added there?`,
          choices: [
            ok(`For a moment the lights blurred, and I heard my own voice before I realized I had started talking.`),
            no(`Debaters usually have about four minutes to deliver a rebuttal speech in the final round.`, 'adds-unrelated-fact'),
            no(`Later that evening, my family asked me how the tournament had gone, and I told them everything.`, 'jumps-ahead-in-time'),
            no(`Elias had won a tournament the previous spring, and his partner had won one the year before.`, 'shifts-focus-from-narrator'),
          ],
          solution: `The correct sentence stays inside the narrator's experience and stretches a few seconds of nerves. The sentence about the family jumps forward in time instead of slowing the moment.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer considers moving sentence 3 so that it comes right after sentence 13. Why would this weaken the narrative?`,
          choices: [
            no(`Sentence 3 contains dialogue, and dialogue should only appear near the start of a narrative.`, 'misidentifies-dialogue'),
            no(`Sentence 3 describes the setting, and setting details must always come before any events.`, 'confuses-setting-with-stakes'),
            ok(`Sentence 3 tells the reader early that the other team is undefeated, which raises the stakes of every later event.`),
            no(`Sentence 3 is the narrator's final reflection, so it would repeat the meaning of the conclusion.`, 'misreads-function'),
          ],
          solution: `Knowing from the start that the opponents have won all six rounds makes the narrator's rebuttal feel like a long shot, which builds tension. Sentence 3 contains no setting description; sentence 1 sets the scene.`,
        },
      ],
    },
    {
      code: 'wg12-narrative-writing-p02',
      title: 'Box 19',
      body: `(1) Every Tuesday after school, I volunteered at the Harlow County Historical Society, a narrow brick building that had once been a bank. (2) My job was to scan letters from a donated collection and type a short summary of each one into a database. (3) Most of the letters were about crop prices or weather, and I had started to scan them without really reading.

(4) That changed in box 19. (5) The first letter in the folder was written in 1918 by a young woman named Clara Voss to her brother, who worked on a railroad survey crew in the mountains. (6) She described teaching twelve students in a one-room school and splitting firewood before dawn so the stove would be hot when they arrived. (7) Scanners use a moving light and a sensor to record an image one line at a time. (8) I read the next letter, and the one after that, until the building manager, Mr. Delgado, flicked the lights to tell me it was closing time.

(9) I went back on Tuesday. (10) I found that Clara had written to her brother for four years, and her letters grew longer as her school grew larger. (11) In the last letter, she mentioned that one of her former students had been accepted to a teachers' college. (12) I typed my summary of that letter.

(13) I asked Mr. Delgado if the society could display the letters. (14) He said yes.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not belong in the narrative?`,
          choices: [
            no(`sentence 3`, 'removes-starting-attitude'),
            no(`sentence 6`, 'removes-key-detail'),
            ok(`sentence 7`),
            no(`sentence 11`, 'removes-key-event'),
          ],
          solution: `Sentence 7 explains how scanners work, which pulls attention away from the narrator discovering Clara's letters. Sentence 6 must stay because it gives the vivid detail that hooks the narrator.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which revision of sentence 9 best signals the shift in time at the start of the third paragraph?`,
          choices: [
            no(`I went back on Tuesday because I had volunteered there every week.`, 'adds-cause-not-time'),
            ok(`The following Tuesday, I arrived an hour early and went straight to box 19.`),
            no(`Also, I went back on Tuesday, and I was there again after school.`, 'additive-not-time'),
            no(`I went back on Tuesday, which is a day of the week in the middle.`, 'irrelevant-detail'),
          ],
          solution: `"The following Tuesday" marks a clear jump in time, and arriving early shows the narrator's new interest. The choice beginning with "Also" adds an idea but does not mark when the scene takes place.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `What is the main purpose of sentence 3 in the narrative?`,
          choices: [
            no(`It explains the history of the building where the narrator volunteered.`, 'confuses-setting-with-attitude'),
            no(`It introduces Clara Voss as the main character of the narrative.`, 'misplaces-character-introduction'),
            no(`It provides a conclusion that sums up what the narrator learned.`, 'misreads-function'),
            ok(`It shows the narrator's boredom so the change in sentence 4 has meaning.`),
          ],
          solution: `Sentence 3 establishes that the narrator was scanning without reading, which makes "That changed in box 19" a real turning point. Clara is not introduced until sentence 5.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which revision of sentences 13 and 14 best uses dialogue to give the narrative a stronger ending?`,
          choices: [
            no(`"Can the society display the letters?" I asked. "Yes," Mr. Delgado said. "Yes, it can."`, 'dialogue-without-development'),
            no(`I asked Mr. Delgado about displaying the letters, and he agreed, and then I went home.`, 'removes-dialogue'),
            ok(`"She kept writing for four years," I told Mr. Delgado. "People should read her." He handed me the key to the display case.`),
            no(`"Clara Voss was born in the nineteenth century," I said, and Mr. Delgado wrote that down.`, 'dialogue-off-point'),
          ],
          solution: `The correct choice uses the narrator's words to show why Clara matters and ends with an action that answers the request. The first choice uses dialogue but only repeats a yes, adding nothing about the characters.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Which revision of sentence 12 best shows how the narrator has changed since the first paragraph?`,
          choices: [
            no(`I typed my summary of that letter quickly, since I had many more to finish.`, 'contradicts-change'),
            ok(`This time I read the letter twice before typing a word, trying to capture her pride.`),
            no(`I typed my summary of that letter into the database, which held many records.`, 'detail-without-change'),
            no(`I typed my summary of that letter while the scanner warmed up beside me.`, 'setting-not-character'),
          ],
          solution: `Reading the letter twice directly reverses sentence 3, where the narrator scanned without reading, so it shows growth. The choice about typing quickly suggests the narrator has not changed at all.`,
        },
      ],
    },
    {
      code: 'wg12-narrative-writing-p03',
      title: 'Riffle Count',
      body: `(1) Our environmental science class waded into Miller Creek on a gray October morning, each pair carrying a kick net and a white plastic tray. (2) Ms. Nakamura had explained the plan the day before: we would disturb the gravel upstream, let the current wash whatever lived there into our nets, and count the insects we caught. (3) Certain larvae, like mayflies and stoneflies, cannot survive in polluted water, so finding them would suggest the creek was healthy.

(4) My partner, Jun, held the net while I shuffled my boots through the rocks. (5) The water was so cold it made my ankles ache. (6) We lifted the net and dumped its contents into the tray. (7) Mud. (8) A leaf. (9) A single snail. (10) Many people enjoy fishing in creeks during the fall. (11) "Try the riffle," Ms. Nakamura called from the bank, pointing to a stretch where the water broke white over shallow stones.

(12) We moved and tried again. (13) This time, when the silt settled, the tray seemed to come alive. (14) Tiny flattened bodies with three tails crawled along the bottom, and a stonefly larva as long as my thumbnail clung to a twig. (15) Jun counted out loud while I recorded each one in the notebook, my handwriting shaky from the cold. (16) We found forty-one mayflies in that sample alone.

(17) The class results showed the creek was in good condition.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not belong in the narrative?`,
          choices: [
            no(`sentence 5`, 'removes-sensory-detail'),
            ok(`sentence 10`),
            no(`sentence 11`, 'removes-key-dialogue'),
            no(`sentence 15`, 'removes-key-action'),
          ],
          solution: `Sentence 10 is a general remark about fishing that has nothing to do with the sampling. Sentence 11 must stay because Ms. Nakamura's advice causes the successful second sample.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence 17 as a conclusion that reflects on the experience?`,
          choices: [
            no(`The class results showed the creek was in good condition, and we wrote our lab reports.`, 'flat-ending-no-reflection'),
            no(`Mayflies live for only a short time as adults, and some live for just a single day.`, 'generic-fact-ending'),
            no(`Our class went to Miller Creek in October with kick nets and white plastic trays.`, 'restates-situation'),
            ok(`Walking back with numb feet, I kept picturing those three tails, proof the creek was alive.`),
          ],
          solution: `The correct choice reflects on the meaning of the discovery and echoes the vivid detail in sentence 14. The first choice adds an event but no reflection.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `How do the short fragments in sentences 7, 8, and 9 affect the pacing of the narrative?`,
          choices: [
            ok(`They reveal the disappointing catch one item at a time, matching the narrator's letdown.`),
            no(`They speed past the first sample so the reader does not notice it happened.`, 'misreads-pacing-speed'),
            no(`They are grammatical errors that should be combined into one long sentence.`, 'treats-style-as-error'),
            no(`They shift the point of view so the reader sees the tray through Jun's eyes.`, 'false-pov-shift'),
          ],
          solution: `Listing mud, a leaf, and one snail as separate beats makes the reader feel the empty tray slowly, the way the narrator does. The fragments are a deliberate stylistic choice, not errors to be fixed.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Why is it important that sentence 3 appears early in the narrative?`,
          choices: [
            no(`It introduces the narrator's partner so the reader knows who holds the net.`, 'misplaces-character-introduction'),
            ok(`It explains why the larvae matter, so the count in sentence 16 feels meaningful.`),
            no(`It describes the cold water so the reader can feel the narrator's discomfort.`, 'confuses-sensory-with-context'),
            no(`It resolves the main conflict before the narrator ever steps into the creek.`, 'misreads-resolution'),
          ],
          solution: `Without sentence 3, forty-one mayflies would just be a number; with it, the reader understands they signal a healthy creek. Jun is introduced in sentence 4, not sentence 3.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Which revision of sentence 12 best signals both the shift in setting and the narrator's renewed effort?`,
          choices: [
            no(`We moved and tried again, because the first sample had not gone very well.`, 'cause-without-setting'),
            no(`Meanwhile, other pairs of students were also using nets in the creek.`, 'shifts-focus-from-narrator'),
            ok(`Twenty feet upstream, where the current quickened, we planted the net and kicked harder.`),
            no(`Afterward, we moved somewhere else in the creek and tried one more time.`, 'vague-setting'),
          ],
          solution: `The correct choice names the new location precisely and shows the narrator working harder, which leads into the full tray. The choice with "Afterward" marks a shift but leaves the new setting vague.`,
        },
      ],
    },
    {
      code: 'wg12-narrative-writing-p04',
      title: 'The Exchange Zone',
      body: `(1) In a sprint relay, the baton must pass between runners inside a zone just thirty meters long, and a single fumble can end a race. (2) I ran the third leg for our team, which meant I received the baton on the curve and handed it to our anchor, Dominique Asante. (3) All season, our handoffs had been clumsy. (4) At the state qualifier, we dropped the baton in the final exchange and did not finish.

(5) Coach Ferreira changed our practices after that. (6) Every afternoon for two weeks, Dominique and I ran nothing but handoffs, sometimes forty in a row. (7) She would start running when I reached a strip of tape on the track, and I would shout "Stick!" when I was close enough to place the baton in her open hand. (8) At first she started too early and I could not catch her. (9) Then she started too late and we nearly collided. (10) Slowly, we moved the tape until we found the right spot. (11) The track had been resurfaced the previous summer with a new rubber coating.

(12) It was the championship meet. (13) I came off the curve, saw the tape, and watched Dominique begin to run. (14) "Stick!" I shouted. (15) The baton smacked into her palm, and she was gone. (16) We finished second, our fastest time of the year.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it interrupts the narrative with information that does not belong?`,
          choices: [
            no(`sentence 4`, 'removes-earlier-failure'),
            no(`sentence 9`, 'removes-sequence-step'),
            ok(`sentence 11`),
            no(`sentence 14`, 'removes-key-dialogue'),
          ],
          solution: `Sentence 11 describes the track surface, which has no bearing on the handoffs. Sentence 9 must stay because it is one step in the trial and error that leads to the right tape spot.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which revision of sentence 12 best shows the shift in time and setting at the start of the final paragraph?`,
          choices: [
            ok(`Two weeks later, under the stadium lights at the championship meet, I took my place on the curve.`),
            no(`It was the championship meet, which is the most important meet of the whole season.`, 'explains-not-transitions'),
            no(`In contrast, it was the championship meet, and many teams had come to compete.`, 'contrast-not-time'),
            no(`For instance, it was the championship meet, and our team was ready to run.`, 'example-not-time'),
          ],
          solution: `"Two weeks later" marks time and "under the stadium lights" places the reader in the new setting. "In contrast" signals an opposing idea rather than a move forward in time.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `What do sentences 8, 9, and 10 contribute to the sequence of events?`,
          choices: [
            no(`They describe the championship race in slow motion to build suspense.`, 'misplaces-climax'),
            no(`They explain the official rules of the exchange zone in a sprint relay.`, 'confuses-narration-with-exposition'),
            ok(`They show gradual trial and error, so the clean handoff later feels earned.`),
            no(`They introduce a conflict between the narrator and Coach Ferreira.`, 'misidentifies-conflict'),
          ],
          solution: `Too early, then too late, then the right spot is a logical progression that prepares for the smooth handoff in sentence 15. These sentences happen at practice, not during the championship race.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 16, would best conclude the narrative with reflection?`,
          choices: [
            no(`The team that won first place had also won the championship the year before.`, 'shifts-focus-from-narrator'),
            ok(`I never touched the baton that night without thinking of all those afternoons with the tape.`),
            no(`After the race, we packed our bags and rode home on the team bus.`, 'flat-ending-no-reflection'),
            no(`A sprint relay requires four runners, and each runs about one hundred meters.`, 'generic-fact-ending'),
          ],
          solution: `The correct choice connects the race to the practice that made it possible, which gives the ending meaning. The bus ride adds an event without reflecting on it.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `A classmate suggests deleting sentence 4 to shorten the draft. Why should the writer keep it?`,
          choices: [
            no(`It is the only sentence that tells the reader which leg of the relay the narrator runs.`, 'misattributes-detail'),
            no(`It provides sensory description of the track that helps the reader picture the setting.`, 'confuses-setting-with-cause'),
            no(`It contains the narrative's only dialogue, which the story needs to feel realistic.`, 'misidentifies-dialogue'),
            ok(`It gives the failure that causes the new practices and makes the clean handoff a redemption.`),
          ],
          solution: `Sentence 4 explains why Coach Ferreira changes practice in sentence 5 and why the final handoff matters so much. The narrator's leg is stated in sentence 2, not sentence 4.`,
        },
      ],
    },
    {
      code: 'wg12-narrative-writing-p05',
      title: 'Six Seconds Behind',
      body: `(1) Two days before graduation, our principal asked the media club to add live captions to the ceremony's livestream so that relatives who were deaf or hard of hearing could follow along. (2) I was the only member who had ever set up captioning software, and I had done it once, for a ten-minute club meeting. (3) I said yes before I could think of a reason to say no.

(4) The software listened to the microphone feed and turned speech into text, but it struggled with names. (5) During the rehearsal, it typed "Mr. Abernathy" as "mister abner the tea." (6) My friend Lucia Marchetti suggested that we load the full list of graduates into the program's custom vocabulary. (7) Graduation ceremonies in many countries include a speech from a student. (8) We spent the whole evening typing three hundred and twelve names, checking each spelling against the printed program.

(9) On the morning of the ceremony, the captions ran six seconds behind the speakers. (10) I sat in the booth at the back of the gym, watching the words crawl across my monitor, my stomach tightening every time a new name was read. (11) Then the principal reached the graduates whose last names began with W, and the software spelled every one correctly. (12) Lucia squeezed my shoulder without saying anything.

(13) The ceremony ended at noon.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not belong in the narrative?`,
          choices: [
            no(`sentence 3`, 'removes-character-choice'),
            no(`sentence 5`, 'removes-concrete-example'),
            ok(`sentence 7`),
            no(`sentence 12`, 'removes-character-reaction'),
          ],
          solution: `Sentence 7 is a general fact about graduations that breaks the problem and solution sequence. Sentence 5 must stay because it shows exactly why the names had to be loaded.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 13 as a conclusion that reflects on the experience?`,
          choices: [
            no(`The ceremony ended at noon, and everyone went outside to take photographs.`, 'flat-ending-no-reflection'),
            no(`Captioning software has improved a great deal over the past several years.`, 'generic-fact-ending'),
            ok(`Somewhere, a grandparent had read every name correctly, and that was worth the late night.`),
            no(`There were three hundred and twelve graduates in the class that year.`, 'restates-detail'),
          ],
          solution: `The correct choice reflects on who benefited and ties the work in sentence 8 to the purpose in sentence 1. Photographs outside add an event but no reflection.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `What does sentence 5 add to the narrative?`,
          choices: [
            ok(`A concrete, slightly funny example that makes the problem with names clear and real.`),
            no(`A flashback to the narrator's earlier experience captioning the club meeting.`, 'misreads-time-order'),
            no(`The resolution of the conflict, showing that the software now works perfectly.`, 'misreads-resolution'),
            no(`A description of the gym setting where the ceremony will take place.`, 'confuses-setting-with-example'),
          ],
          solution: `Sentence 5 shows the error rather than just stating it, which raises the stakes for the ceremony. It happens during the rehearsal, so it is not a flashback to the club meeting.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `The writer wants to show more time passing between sentence 10 and sentence 11. Which revision of the beginning of sentence 11 does this best?`,
          choices: [
            no(`Then, because of this,`, 'cause-not-time'),
            no(`Then, on the other hand,`, 'contrast-not-time'),
            no(`Then, for example,`, 'example-not-time'),
            ok(`Nearly an hour and three hundred names later,`),
          ],
          solution: `The correct phrase makes clear that a long stretch of the ceremony passed, which explains how the list reached the W names. "Because of this" signals cause, not time.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `A classmate suggests adding dialogue to sentence 12, such as Lucia saying "We did it." What is the best reason to keep sentence 12 as it is?`,
          choices: [
            no(`Narratives written in the first person are not allowed to include dialogue from other characters.`, 'false-rule'),
            ok(`The silent gesture suits a quiet booth during a live ceremony and lets the reader infer their shared relief.`),
            no(`Lucia has not been introduced yet, so the reader would not know who was speaking.`, 'misreads-character-introduction'),
            no(`Sentence 12 is the narrative's conclusion, and conclusions should never include actions.`, 'misreads-function'),
          ],
          solution: `A squeeze on the shoulder shows the relief without stating it, and it fits a setting where talking would be out of place. Lucia is introduced in sentence 6, so the reader already knows her.`,
        },
      ],
    },
    {
      code: 'wg12-narrative-writing-p06',
      title: 'Line Set Twelve',
      body: `(1) During the spring musical, I worked on the fly crew, the team that raises and lowers scenery from the pipes above the stage. (2) Each piece of scenery hangs on a line set, a system of ropes and counterweights that lets one person move a heavy backdrop smoothly. (3) My line set, number twelve, held a painted city skyline that had to drop in during the final song of the first act.

(4) On opening night, the stage manager, Ms. Abiodun, called the cue over my headset. (5) I pulled the rope. (6) Nothing moved. (7) The lock that holds the rope in place was still half closed, and the rope was jammed against it. (8) The cast was already singing the last chorus. (9) Our school has performed a spring musical every year for decades.

(10) I flipped the lock fully open, braced my feet, and pulled again. (11) The skyline dropped so fast that I had to grip the rope with both hands to slow it. (12) It stopped two feet above the stage floor, exactly on its mark, just as the final note ended.

(13) At intermission, Ms. Abiodun found me in the wings. (14) I was sure she was going to tell me I had nearly ruined the act. (15) Instead, she said, "Everyone misses a lock once. Most people freeze when it happens." (16) After that night, I checked every lock twice before every cue.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it interrupts the narrative at its most tense moment?`,
          choices: [
            no(`sentence 6`, 'removes-turning-point'),
            no(`sentence 8`, 'removes-time-pressure'),
            ok(`sentence 9`),
            no(`sentence 11`, 'removes-key-action'),
          ],
          solution: `Sentence 9 is background about the school that stalls the action just as the narrator must fix the jam. Sentence 8 must stay because the chorus already underway is what makes the moment urgent.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `How do the very short sentences 5 and 6 affect the pacing?`,
          choices: [
            no(`They summarize several hours of rehearsal in just a few words.`, 'misreads-pacing-speed'),
            no(`They slow the narrative down so the reader can admire the scenery.`, 'misreads-purpose'),
            ok(`Their abrupt stop mirrors the jammed rope and creates a jolt of alarm.`),
            no(`They signal a shift from the narrator's point of view to Ms. Abiodun's.`, 'false-pov-shift'),
          ],
          solution: `"I pulled the rope. Nothing moved." stops the reader short just as the rope stops, so the form matches the event. The sentences cover a single second, not hours of rehearsal.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence 8, would best heighten the tension before the narrator acts?`,
          choices: [
            ok(`In about ten seconds, the skyline needed to be in place for the act's final image.`),
            no(`The skyline had been painted by the art club over three long weekends in March.`, 'detail-without-stakes'),
            no(`I remembered that my family was sitting somewhere in the fourth row of the audience.`, 'distracting-detail'),
            no(`The musical's second act would begin after a fifteen-minute intermission.`, 'releases-tension'),
          ],
          solution: `A ten-second deadline sharpens the pressure right before the narrator flips the lock. The detail about painting the skyline is description with nothing at stake.`,
        },
        {
          slot: 29,
          difficulty: 'hard',
          stem: `How does sentence 14 contribute to the ending of the narrative?`,
          choices: [
            no(`It resolves the conflict by showing that the skyline reached its mark on time.`, 'misattributes-resolution'),
            ok(`It sets up the narrator's fear so Ms. Abiodun's response in sentence 15 lands as a surprise.`),
            no(`It shifts the setting from the backstage area to the audience seating.`, 'false-setting-shift'),
            no(`It explains how a line set works for readers who are unfamiliar with theater.`, 'misreads-function'),
          ],
          solution: `By telling the reader what the narrator expects, sentence 14 makes "Instead" in sentence 15 a real turn. The skyline reaching its mark happens in sentence 12, not sentence 14.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `The writer considers deleting sentence 2 because it explains equipment instead of describing an event. What is the best advice?`,
          choices: [
            no(`Delete it, because a narrative should contain only actions and dialogue, never explanation.`, 'false-rule'),
            no(`Delete it, because the same information appears again in sentence 7.`, 'misreads-repetition'),
            no(`Keep it, but move it to the end so the narrative closes with technical information.`, 'weak-ending-placement'),
            ok(`Keep it, because it gives the background readers need to grasp the jam and the falling skyline.`),
          ],
          solution: `Without sentence 2, a reader new to theater would not understand why a lock could stop the rope or why the backdrop drops so fast. Sentence 7 describes the lock, not how a line set works, so the information is not repeated.`,
        },
      ],
    },
    {
      code: 'wg12-narrative-writing-p07',
      title: 'Pawns First',
      body: `(1) Last fall, the branch library near my apartment asked for volunteers to teach chess to children on Saturday mornings. (2) I signed up because I had played in tournaments since middle school and assumed teaching would be easy. (3) On the first Saturday, eleven kids between seven and ten years old sat in front of me, and within five minutes, two of them were using the knights as pretend horses.

(4) I had planned a lesson on opening strategy. (5) Nobody listened. (6) A boy named Tariq asked why pawns could only move forward, and a girl named Sofia Lindgren wanted to know if the king was "the weakest one or the most important one." (7) The library also offers knitting and coding classes on weekends. (8) I realized that I had never actually explained the rules to anyone; I had only played.

(9) The next week, I threw out my opening lesson. (10) We played a game using only pawns, and the first player to reach the other side won. (11) The kids shrieked whenever a pawn reached the last row. (12) Over the following weeks, we added one piece at a time: rooks, then bishops, then knights, and finally the queen and king.

(13) By December, Tariq had beaten me in a full game, though I suspect I was a little distracted. (14) That's how my volunteering went.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not belong in the narrative?`,
          choices: [
            no(`sentence 3`, 'removes-opening-situation'),
            no(`sentence 6`, 'removes-key-detail'),
            ok(`sentence 7`),
            no(`sentence 11`, 'removes-character-reaction'),
          ],
          solution: `Sentence 7 lists other library classes, which has nothing to do with the narrator's struggle to teach chess. Sentence 6 must stay because the children's questions lead to the realization in sentence 8.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 14 as a conclusion that reflects on the experience?`,
          choices: [
            no(`That was how my volunteering at the library went during the fall semester.`, 'restates-situation'),
            ok(`I had signed up to teach chess, but those kids had taught me how much I took for granted.`),
            no(`Chess is one of the oldest board games, and it is played all around the world.`, 'generic-fact-ending'),
            no(`After the game, Tariq put the pieces away and his mother picked him up.`, 'flat-ending-no-reflection'),
          ],
          solution: `The correct choice reflects on what the narrator learned and reverses the assumption in sentence 2. Tariq putting the pieces away adds an event without reflection.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `The writer wants sentence 5 to show the problem instead of telling it. Which revision does this best?`,
          choices: [
            no(`Nobody listened to me at all, which was a very frustrating problem.`, 'tells-not-shows'),
            no(`Nobody listened, and I felt that the lesson was not going very well.`, 'tells-not-shows'),
            ok(`When I said the word "opening," Tariq rolled a pawn across the table like a marble.`),
            no(`Nobody listened, because opening strategy is difficult for many players.`, 'adds-cause-not-detail'),
          ],
          solution: `The correct choice gives a specific action that lets the reader see the lesson falling apart. The other choices only restate that nobody listened or add a general explanation.`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `What does sentence 2 establish that the rest of the narrative reverses?`,
          choices: [
            no(`The narrator's belief that the library needed more volunteers on Saturdays.`, 'misreads-detail'),
            no(`The narrator's dislike of children, which changes by the end.`, 'unsupported-inference'),
            no(`The narrator's fear of losing a game to someone younger.`, 'unsupported-inference'),
            ok(`The narrator's assumption that being a strong player would make teaching easy.`),
          ],
          solution: `Sentence 2 says the narrator assumed teaching would be easy, and the children's questions prove otherwise. Nothing in the draft says the narrator disliked children.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which change would most weaken the logical sequence of events?`,
          choices: [
            ok(`Moving sentence 8 to after sentence 12, so the realization comes after the new method.`),
            no(`Moving sentence 3 into the second paragraph, right before sentence 4.`, 'minor-move-not-logic'),
            no(`Combining sentences 10 and 11 into a single sentence joined by a comma and "and."`, 'style-not-sequence'),
            no(`Changing "Last fall" in sentence 1 to "In September" to name the month.`, 'detail-not-sequence'),
          ],
          solution: `Sentence 8 is the realization that causes the narrator to throw out the lesson in sentence 9, so placing it after the new method breaks cause and effect. Combining sentences 10 and 11 changes style but not the order of events.`,
        },
      ],
    },
    {
      code: 'wg12-narrative-writing-p08',
      title: 'Counting Backward',
      body: `(1) When a storm brought down the old bur oak behind our school, the groundskeeper, Mr. Petrossian, saved a cross section of the trunk for our biology class. (2) It was nearly as wide as a bicycle wheel, and it smelled like wet sawdust. (3) Our teacher, Dr. Okonjo, asked us to estimate the tree's age by counting its rings. (4) Each ring represents one year of growth: a pale band from spring and a darker band from late summer.

(5) Aiyana and I started at the bark and worked inward with a magnifying glass and a pencil. (6) Near the edge, the rings were thin and crowded together, and we lost count twice. (7) Oak wood is often used to make furniture and barrels. (8) We started again, marking every tenth ring with a tiny dot. (9) Halfway to the center, we found a band of rings so narrow they almost disappeared. (10) Dr. Okonjo told us that narrow rings often mean a long dry period, when the tree could barely grow.

(11) We compared those narrow rings with a chart of local rainfall records that Dr. Okonjo had printed. (12) They lined up with a drought the town's records described about seventy years earlier. (13) The center ring was barely the size of a pencil eraser. (14) We counted one hundred and thirty-four rings in total.

(15) Then we cleaned up the lab.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it interrupts the narrative with information that does not belong?`,
          choices: [
            no(`sentence 4`, 'removes-needed-background'),
            no(`sentence 6`, 'removes-obstacle'),
            ok(`sentence 7`),
            no(`sentence 10`, 'removes-key-explanation'),
          ],
          solution: `Sentence 7 is about uses for oak wood, which has nothing to do with counting the rings. Sentence 6 must stay because losing count explains why the narrator starts marking every tenth ring.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 15 as a conclusion that reflects on the experience?`,
          choices: [
            no(`Then we cleaned up the lab, returned the magnifying glasses, and went to lunch.`, 'flat-ending-no-reflection'),
            no(`Bur oaks are found across much of the central and eastern United States.`, 'generic-fact-ending'),
            ok(`I had walked past that oak every day without knowing it was keeping a record of our town.`),
            no(`The cross section was nearly as wide as a bicycle wheel and smelled like sawdust.`, 'restates-detail'),
          ],
          solution: `The correct choice reflects on what the narrator now understands about the tree and the town's history. Cleaning up and going to lunch adds events but no reflection.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Which revision of sentence 10 best uses dialogue to develop Dr. Okonjo while keeping the information?`,
          choices: [
            no(`Dr. Okonjo said something to us about how narrow rings might be important.`, 'removes-information'),
            ok(`Dr. Okonjo leaned over the wood. "Narrow rings usually mean a dry stretch. What was this tree living through?"`),
            no(`"Hello," Dr. Okonjo said, and then told us that narrow rings mean a long dry period.`, 'dialogue-off-point'),
            no(`Narrow rings often mean a long dry period, when a tree can barely grow at all.`, 'removes-dialogue'),
          ],
          solution: `The correct choice keeps the fact about dry periods and uses a question to show Dr. Okonjo as a teacher who prompts thinking. The "Hello" choice adds dialogue, but the spoken words do nothing for the story.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence 12, best connects the scientific finding to the narrator's point of view?`,
          choices: [
            no(`Droughts can affect crops, rivers, and wildlife across very large regions.`, 'generic-fact'),
            no(`Aiyana wrote the drought year in the notebook and drew a box around it.`, 'action-without-perspective'),
            no(`The rainfall chart had been printed on a long sheet of paper by Dr. Okonjo.`, 'detail-without-perspective'),
            ok(`Holding my pencil over that pale band, I realized the tree had lived through a summer our town still talked about.`),
          ],
          solution: `The correct choice shows the narrator's personal reaction to the finding, linking the tree to the town's history. Aiyana's note is a logical action, but it does not reveal how the narrator feels.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Which revision of the beginning of sentence 9 best uses a transition to show both progress in the counting and a change in what the narrator notices?`,
          choices: [
            ok(`About sixty rings in, where the wood darkened toward the heart, we found`),
            no(`On the other hand, after we had marked several of the dots, we found`, 'contrast-not-time'),
            no(`In conclusion, while Aiyana held the magnifying glass for me, we found`, 'conclusion-not-transition'),
            no(`For example, at some point during the afternoon class, we found`, 'vague-time-marker'),
          ],
          solution: `"About sixty rings in" tracks how far the count has gone, and the darkening wood marks a new detail, which leads into the narrow band. "On the other hand" signals a contrast that does not fit the sequence.`,
        },
      ],
    },
  ],
}

export default skill
