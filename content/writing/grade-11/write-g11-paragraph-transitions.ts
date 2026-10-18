import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g11-paragraph-transitions',
  subject: 'writing',
  grade: 11,
  group: 'Sentence and paragraph',
  name: 'Paragraph Organization and Transitions',
  standards: ['W.11-12.2c'],
  passages: [
    {
      code: 'wg11-paragraph-transitions-p01',
      title: 'Lichens as Living Air Monitors',
      body: `(1) Lichens, the crusty patches of color that cling to tree bark and old stone walls, are easy to overlook, yet ecologists increasingly rely on them as indicators of air quality. (2) A lichen is not a single organism but a partnership between a fungus and an alga or cyanobacterium, which together form a body that has no roots and no waxy coating like the one that protects a leaf. (3) ____, a lichen absorbs water and dissolved nutrients directly from rain, fog, and the surrounding air. (4) This constant exposure makes lichens unusually sensitive to pollutants such as sulfur dioxide and excess nitrogen, which accumulate in their tissues rather than being filtered out. (5) Many hikers also enjoy photographing lichens because of their striking oranges and pale greens.

(6) Because different species tolerate pollution to different degrees, the mix of lichens growing in an area can tell researchers a great deal about the air there. (7) Leafy and shrubby species, which expose a large surface area to the air, tend to disappear first when pollution rises. (8) Flat, crusty species, by contrast, often survive in conditions that would eliminate their more delicate relatives. (9) ____, a city park dominated by crusty lichens probably has poorer air than a rural forest where shrubby lichens hang thickly from the branches.

(10) Lichen surveys do not replace electronic monitoring stations, which record precise concentrations of specific gases hour by hour. (11) Nevertheless, surveys offer advantages that machines cannot match. (12) They are inexpensive, they can cover large areas quickly, and they reveal the cumulative effect of pollution over many years rather than the conditions of a single afternoon.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 3?`,
          choices: [
            ok(`As a result,`),
            no(`In contrast,`, 'contrast-for-effect'),
            no(`For instance,`, 'example-for-effect'),
            no(`Meanwhile,`, 'time-for-effect'),
          ],
          solution: `Sentence 2 says a lichen has no roots and no waxy coating, and sentence 3 gives the consequence: it absorbs water directly from the air, so "As a result" fits. "In contrast" is wrong because sentence 3 follows from sentence 2 rather than opposing it.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the first paragraph?`,
          choices: [
            no(`Sentence 2`, 'removes-key-definition'),
            no(`Sentence 4`, 'removes-supporting-detail'),
            ok(`Sentence 5`),
            no(`Sentence 3`, 'removes-supporting-detail'),
          ],
          solution: `The first paragraph explains why lichens are sensitive to air pollution, and hikers photographing their colors has nothing to do with that idea. Sentence 4 belongs because it states the sensitivity that the whole passage depends on.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 9?`,
          choices: [
            ok(`Thus,`),
            no(`Nevertheless,`, 'contrast-for-inference'),
            no(`Similarly,`, 'comparison-for-inference'),
            no(`Before then,`, 'time-for-inference'),
          ],
          solution: `Sentence 9 draws a conclusion from the facts in sentences 7 and 8 about which species survive pollution, so "Thus" signals the inference. "Similarly" is wrong because sentence 9 does not describe a parallel case; it applies the earlier facts to reach a judgment.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `What is the function of "Nevertheless" at the beginning of sentence 11?`,
          choices: [
            no(`It introduces a further limitation of lichen surveys beyond the one in sentence 10.`, 'contrast-read-as-addition'),
            ok(`It acknowledges the limitation in sentence 10 and then turns to the strengths of lichen surveys.`),
            no(`It shows that sentence 11 is caused by the monitoring stations described in sentence 10.`, 'contrast-read-as-cause'),
            no(`It restates the idea of sentence 10 in simpler language for the reader.`, 'contrast-read-as-restatement'),
          ],
          solution: `Sentence 10 concedes that surveys cannot replace precise electronic stations, and "Nevertheless" pivots to the advantages listed in sentences 11 and 12. It does not add another limitation, since the sentences that follow describe benefits.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to add a concluding sentence after sentence 12. Which choice best concludes the passage?`,
          choices: [
            ok(`For communities that cannot afford a dense network of monitors, then, the humble lichen may be one of the most practical tools for tracking air quality.`),
            no(`Shrubby lichens are often found hanging from branches in old forests far from any city or highway.`, 'too-narrow'),
            no(`Some lichens have also been used for centuries to produce natural dyes for wool and other fabrics.`, 'introduces-new-topic'),
            no(`Therefore, cities should remove their electronic monitoring stations and rely entirely on lichen surveys instead.`, 'overstates-argument'),
          ],
          solution: `The correct choice ties together the passage's main idea (lichens reveal air quality) with the advantages in sentence 12, especially low cost. The choice about removing monitoring stations contradicts sentence 10, which says surveys do not replace those stations.`,
        },
      ],
    },
    {
      code: 'wg11-paragraph-transitions-p02',
      title: 'Saving Old Films',
      body: `(1) Many films made in the first half of the twentieth century survive only as fragile reels of nitrate or acetate stock, and archivists race to preserve them before they decay beyond repair. (2) Acetate film, for instance, can develop a condition nicknamed "vinegar syndrome," in which the base releases acetic acid and gradually shrinks, curls, and becomes brittle. (3) Once this process begins, it accelerates, because the acid released by the film speeds up further breakdown.

(4) Restoration typically begins with a careful physical inspection. (5) Technicians unwind each reel by hand, repair torn perforations, and clean away dust and mold with soft brushes and specialized solvents. (6) ____ the film is stable enough to run through a machine is it scanned frame by frame at very high resolution. (7) The resulting digital files then become the raw material for the most painstaking stage of the work. (8) Movie theaters of that era were often decorated with elaborate painted ceilings and velvet curtains.

(9) During digital restoration, specialists remove scratches, correct flickering brightness, and rebuild damaged frames using information from neighboring ones. (10) This work requires restraint as well as skill. (11) A restorer who smooths away every trace of grain may produce an image that looks cleaner than the original ever did, which misrepresents how audiences first experienced the film. (12) ____, the goal is not perfection but faithfulness: the restored film should look the way its makers intended on the day it premiered.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which choice best fills the blank at the beginning of sentence 6?`,
          choices: [
            ok(`Only after`),
            no(`Even though`, 'concession-for-sequence'),
            no(`Only before`, 'sequence-reversed'),
            no(`Unless`, 'condition-for-sequence'),
          ],
          solution: `Sentence 5 describes the repairs, and sentence 6 explains that scanning happens once those repairs make the film stable, so "Only after" shows the order. "Only before" reverses the sequence, since an unstable film cannot safely run through a machine.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it interrupts the logical flow of the second paragraph?`,
          choices: [
            no(`Sentence 5`, 'removes-supporting-detail'),
            no(`Sentence 7`, 'removes-bridge-sentence'),
            ok(`Sentence 8`),
            no(`Sentence 4`, 'removes-topic-sentence'),
          ],
          solution: `The second paragraph describes the steps of restoration, and the decoration of old theaters has nothing to do with those steps. Sentence 7 should stay because it links the scanning step to the digital work in the next paragraph.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 12?`,
          choices: [
            ok(`Ultimately,`),
            no(`For example,`, 'example-for-summary'),
            no(`Similarly,`, 'comparison-for-summary'),
            no(`Meanwhile,`, 'time-for-summary'),
          ],
          solution: `Sentence 12 states the overall principle that the warning in sentence 11 supports, so "Ultimately" signals a final, summarizing point. "For example" is wrong because sentence 12 is a general rule, not a specific instance of something stated earlier.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `What is the main function of sentence 7 in the passage?`,
          choices: [
            no(`It introduces a new problem with acetate film that the restorers must solve.`, 'misreads-bridge-as-new-topic'),
            ok(`It links the physical work of the second paragraph to the digital work described in the third paragraph.`),
            no(`It summarizes the dangers of vinegar syndrome explained in the first paragraph.`, 'wrong-paragraph-reference'),
            no(`It gives an example of how specialists remove scratches from damaged frames.`, 'misreads-bridge-as-example'),
          ],
          solution: `Sentence 7 refers back to the scanned files and forward to "the most painstaking stage," which paragraph 3 then describes, so it bridges the two paragraphs. It does not discuss vinegar syndrome, which appears only in the first paragraph.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `The writer wants to add this sentence: "Nitrate film poses an even greater danger, since it is highly flammable and must be stored in fireproof vaults." Where would it best be placed?`,
          choices: [
            ok(`After sentence 3`),
            no(`After sentence 5`, 'breaks-process-sequence'),
            no(`After sentence 9`, 'breaks-process-sequence'),
            no(`After sentence 11`, 'separates-claim-from-conclusion'),
          ],
          solution: `The first paragraph describes how old film stock decays, and the new sentence compares nitrate's danger to the acetate problem in sentences 2 and 3, as "even greater" signals. Placing it after sentence 5 would interrupt the step-by-step account of restoration.`,
        },
      ],
    },
    {
      code: 'wg11-paragraph-transitions-p03',
      title: 'Rowing as One',
      body: `(1) To spectators on the riverbank, a racing eight seems to glide effortlessly, but the smoothness of its motion depends on a coordination problem that rowers spend years trying to solve. (2) Each of the eight athletes pulls an oar, and the boat moves fastest when all eight blades enter and leave the water at precisely the same instant. (3) If one rower catches the water even a fraction of a second early, that blade acts briefly as a brake, and the hull loses speed before surging forward again. (4) ____, these tiny interruptions can cost a crew several seconds over a two-kilometer race, enough to separate first place from fourth.

(5) Coaches address the problem in several ways. (6) The most familiar is repetition: crews row thousands of strokes together until the shared rhythm feels automatic. (7) ____, many programs now attach small sensors to each oar that record the force and timing of every stroke. (8) By comparing these records, a coach may discover that one athlete consistently finishes the stroke late, a flaw nearly invisible from a following boat. (9) Some rowing clubs also host social gatherings for former members every spring.

(10) Yet technology alone cannot produce a unified crew. (11) Rowers must also learn to set aside their individual styles, matching a teammate's rhythm even when their own instinct suggests a different pace. (12) The stroke seat, the rower nearest the stern, sets this rhythm, and the others follow it closely. (13) A crew that masters this shared timing gains more speed than any single powerful rower could provide.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 4?`,
          choices: [
            ok(`Taken together,`),
            no(`On the other hand,`, 'contrast-for-accumulation'),
            no(`For instance,`, 'example-for-accumulation'),
            no(`Previously,`, 'time-for-accumulation'),
          ],
          solution: `Sentence 4 describes the combined effect of many small slowdowns like the one in sentence 3, so "Taken together" signals that accumulation. "On the other hand" is wrong because sentence 4 extends the problem rather than offering an opposing view.`,
        },
        {
          slot: 12,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 7?`,
          choices: [
            ok(`In addition,`),
            no(`As a result,`, 'addition-read-as-effect'),
            no(`Nevertheless,`, 'addition-read-as-contrast'),
            no(`In conclusion,`, 'conclusion-too-early'),
          ],
          solution: `Sentence 5 promises "several ways," and sentence 7 adds a second method after the repetition in sentence 6, so "In addition" fits. "As a result" is wrong because sensors are not a consequence of rowing many strokes.`,
        },
        {
          slot: 13,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 6`, 'removes-supporting-detail'),
            no(`Sentence 8`, 'removes-supporting-detail'),
            ok(`Sentence 9`),
            no(`Sentence 5`, 'removes-topic-sentence'),
          ],
          solution: `The second paragraph explains how coaches improve timing, and social gatherings for former members have nothing to do with that. Sentence 8 belongs because it shows what the oar sensors from sentence 7 can reveal.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `How does the word "Yet" in sentence 10 shape the relationship between the second and third paragraphs?`,
          choices: [
            no(`It signals that the third paragraph will give more examples of oar sensors.`, 'contrast-read-as-addition'),
            ok(`It signals a limit to the technical methods just described and shifts the focus to the rowers themselves.`),
            no(`It signals that the third paragraph is the result of the coaching methods in the second.`, 'contrast-read-as-cause'),
            no(`It signals that the writer is returning to the spectators described in sentence 1.`, 'misreads-reference'),
          ],
          solution: `"Yet" qualifies the sensor method in paragraph 2 and introduces the human element, the rowers' willingness to match one another, in paragraph 3. The third paragraph says nothing more about sensors, so it is not adding examples.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Which revision of sentence 10 most effectively connects the third paragraph to the second?`,
          choices: [
            ok(`Yet even the most detailed sensor data cannot, by itself, turn eight athletes into a unified crew.`),
            no(`Rowing is a demanding sport that challenges every athlete in the boat.`, 'generic-no-link'),
            no(`Sensors like these are also becoming common in cycling and distance running.`, 'tangent-from-previous-paragraph'),
            no(`As a result, sensor data alone now produces a perfectly unified crew.`, 'contradicts-following-paragraph'),
          ],
          solution: `The correct revision names the sensor data from paragraph 2 and states its limit, which paragraph 3 then develops. The choice about cycling mentions sensors but leads away from rowing instead of toward the paragraph's point about shared rhythm.`,
        },
      ],
    },
    {
      code: 'wg11-paragraph-transitions-p04',
      title: 'How the Railroads Changed the Clock',
      body: `(1) For most of history, every town kept its own time, setting its clocks so that noon fell at the moment the sun stood highest overhead. (2) Because the sun reaches that point slightly later as one travels west, two towns only a short distance apart might disagree by several minutes. (3) ____ travel was slow, such differences hardly mattered, since no one could cross the distance quickly enough to notice them.

(4) The arrival of the railroad changed this situation dramatically. (5) A train could now cover in a few hours a distance that had once taken days, and each station along its route might keep a different local time. (6) Printed schedules became bewildering documents, listing arrivals according to dozens of separate local clocks. (7) More seriously, confusion about the time could place two trains on the same single track at once. (8) Many early locomotives burned wood before they were converted to burn coal.

(9) ____, in the late nineteenth century, railroad companies agreed to divide the continent into a few broad time zones, each one hour apart. (10) Within each zone, every clock showed the same time, regardless of the local position of the sun. (11) Some communities initially resisted, objecting that their clocks should follow the sun rather than a railroad timetable. (12) Over the following decades, however, the convenience of a shared standard won out, and the zones eventually gained legal recognition. (13) Today the system is so familiar that few people realize it began as a practical answer to a very specific problem.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which choice best fills the blank at the beginning of sentence 3?`,
          choices: [
            ok(`As long as`),
            no(`Although`, 'concession-for-condition'),
            no(`Unless`, 'negated-condition'),
            no(`Whereas`, 'contrast-for-condition'),
          ],
          solution: `Sentence 3 explains that time differences did not matter under one condition, slow travel, so "As long as" fits. "Although" is wrong because slow travel is the reason the differences went unnoticed, not something that works against that idea.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 5`, 'removes-supporting-detail'),
            no(`Sentence 7`, 'removes-supporting-detail'),
            ok(`Sentence 8`),
            no(`Sentence 6`, 'removes-supporting-detail'),
          ],
          solution: `The second paragraph explains how railroads made local time a problem, and the fuel locomotives burned has nothing to do with timekeeping. Sentence 7 belongs because it shows the most serious result of the confusion.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 9?`,
          choices: [
            ok(`Eventually,`),
            no(`For example,`, 'example-for-sequence'),
            no(`In contrast,`, 'contrast-for-sequence'),
            no(`Likewise,`, 'comparison-for-sequence'),
          ],
          solution: `Sentence 9 describes the solution that came later in response to the problems in the second paragraph, so the time transition "Eventually" fits. "For example" is wrong because creating time zones is not an instance of the schedule confusion just described.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which statement best describes how the second paragraph relates to the first?`,
          choices: [
            no(`It offers a solution to the scheduling problem that the first paragraph describes.`, 'misreads-problem-solution'),
            ok(`It explains how a new technology turned the harmless situation in the first paragraph into a real problem.`),
            no(`It gives a second, unrelated example of how towns kept time before clocks existed.`, 'misreads-as-parallel-example'),
            no(`It argues that the local time system described in the first paragraph was never used.`, 'contradicts-text'),
          ],
          solution: `The first paragraph says local time differences "hardly mattered," and the second, beginning "The arrival of the railroad changed this situation," shows how they became dangerous. The solution does not appear until the third paragraph.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `What does the phrase "More seriously" at the beginning of sentence 7 show about the relationship between sentences 6 and 7?`,
          choices: [
            no(`Sentence 7 gives the cause of the confusing schedules described in sentence 6.`, 'escalation-read-as-cause'),
            no(`Sentence 7 contradicts the claim in sentence 6 that schedules were confusing.`, 'escalation-read-as-contrast'),
            ok(`Sentence 7 moves from an inconvenience in sentence 6 to a more dangerous consequence of the same problem.`),
            no(`Sentence 7 restates the point of sentence 6 using a more formal tone.`, 'escalation-read-as-restatement'),
          ],
          solution: `"More seriously" signals escalation: confusing schedules (sentence 6) were annoying, but trains on the same track (sentence 7) were dangerous. Sentence 7 is not the cause of sentence 6; both are effects of the many local times described in sentence 5.`,
        },
      ],
    },
    {
      code: 'wg11-paragraph-transitions-p05',
      title: 'Voices of the Neighborhood',
      body: `(1) Last spring, the public library in our town launched an oral history project to record the memories of longtime residents before those stories were lost. (2) Volunteers, most of them high school students, received training in interviewing, recording equipment, and the ethics of handling personal stories. (3) ____, each volunteer was paired with a resident who had agreed to share recollections of the neighborhood as it had been decades earlier.

(4) The interviews revealed details that no official record had captured. (5) One retired bus driver, Mr. Okonkwo, described the routes that once connected the riverside mills to the hillside neighborhoods, and he explained how the closing of the mills had reshaped those routes. (6) Another resident, Mrs. Lindqvist, recalled the weekly market that once filled the town square, where farmers, bakers, and knife sharpeners competed for customers' attention. (7) The library also offers free help with tax forms every winter. (8) Taken together, these accounts offered a picture of daily life far richer than the dates and statistics stored in the town archive.

(9) The project faced challenges as well. (10) Some residents hesitated to speak on record, worried that their memories were not important enough to preserve. (11) ____, transcribing hours of conversation proved far more time-consuming than the organizers had predicted. (12) Despite these obstacles, the volunteers completed more than forty interviews, which are now available to anyone who visits the library's local history room.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 3?`,
          choices: [
            ok(`After completing this training,`),
            no(`Before the training began,`, 'sequence-reversed'),
            no(`In contrast,`, 'contrast-for-sequence'),
            no(`For instance,`, 'example-for-sequence'),
          ],
          solution: `Sentence 2 describes the volunteers' training, and sentence 3 gives the next step, pairing them with residents, so "After completing this training" shows the order. "Before the training began" reverses the sequence, since the volunteers needed training to conduct interviews.`,
        },
        {
          slot: 22,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 5`, 'removes-supporting-detail'),
            no(`Sentence 6`, 'removes-supporting-detail'),
            ok(`Sentence 7`),
            no(`Sentence 8`, 'removes-concluding-sentence'),
          ],
          solution: `The second paragraph presents what the interviews revealed, and tax help at the library is unrelated to the oral history project. Sentence 8 belongs because it sums up the two examples.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 11?`,
          choices: [
            ok(`Moreover,`),
            no(`Therefore,`, 'addition-read-as-effect'),
            no(`Instead,`, 'addition-read-as-replacement'),
            no(`In conclusion,`, 'conclusion-too-early'),
          ],
          solution: `Sentence 11 adds a second challenge to the one in sentence 10, so "Moreover" signals addition. "Therefore" is wrong because slow transcription was not caused by residents' hesitation to speak.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `What is the function of sentence 8 within the second paragraph?`,
          choices: [
            no(`It introduces a third resident whose memories differ from those in sentences 5 and 6.`, 'misreads-summary-as-example'),
            ok(`It draws the examples in sentences 5 and 6 together to state the paragraph's main point.`),
            no(`It shifts the focus to the difficulties the project faced.`, 'wrong-paragraph-function'),
            no(`It explains why the town archive stopped collecting records.`, 'unsupported-inference'),
          ],
          solution: `"Taken together" signals a summary: sentence 8 combines the two interviews to show that personal accounts are richer than official records, echoing sentence 4. The shift to difficulties does not happen until sentence 9.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Why is "Despite these obstacles" a better way to begin sentence 12 than "As a result of these obstacles"?`,
          choices: [
            ok(`The interviews were completed in spite of the problems in sentences 10 and 11, not because of them, so a concession fits.`),
            no(`The obstacles caused the volunteers to work harder, so the phrase should show cause and effect.`, 'unsupported-cause-effect'),
            no(`Sentence 12 introduces a new set of obstacles, so it needs a phrase that adds information.`, 'misreads-reference'),
            no(`The two phrases mean the same thing, so the choice depends only on the writer's style.`, 'ignores-logical-relationship'),
          ],
          solution: `Sentences 10 and 11 describe problems that worked against the project, and sentence 12 reports success anyway, which calls for a concession like "Despite." The choice claiming the obstacles made volunteers work harder is not supported anywhere in the passage.`,
        },
      ],
    },
    {
      code: 'wg11-paragraph-transitions-p06',
      title: 'How Devices Fix Their Own Mistakes',
      body: `(1) Every time a file is saved, copied, or sent across a network, there is a small chance that some of its bits, the ones and zeros that encode it, will be flipped by electrical noise or physical wear. (2) A single flipped bit might turn a letter in a document into a different character or leave a visible blotch in a photograph. (3) ____, engineers have developed error-correcting codes that allow a device to detect and repair such mistakes automatically.

(4) The basic idea is to store slightly more information than the data strictly requires. (5) The simplest version, called a parity bit, adds one extra digit to each group of bits so that the total number of ones is always even. (6) If a single bit flips, the count becomes odd, and the device knows that something has gone wrong. (7) A parity bit can reveal that an error exists, ____ it cannot reveal which bit is wrong, so it cannot fix the problem on its own. (8) Early computers filled entire rooms and required teams of operators to run them.

(9) More sophisticated codes overcome this limitation by adding several carefully arranged extra bits. (10) Each extra bit checks a different, overlapping group of data bits, so the pattern of failed checks points to the exact location of the error. (11) The device can then flip that bit back, restoring the original data without the user ever noticing. (12) These codes are a quiet but essential part of modern technology, protecting everything from the files on a laptop to the signals sent home by distant space probes.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 3?`,
          choices: [
            ok(`To guard against this risk,`),
            no(`In contrast,`, 'contrast-for-purpose'),
            no(`For example,`, 'example-for-purpose'),
            no(`Meanwhile,`, 'time-for-purpose'),
          ],
          solution: `Sentences 1 and 2 describe the danger of flipped bits, and sentence 3 presents the engineers' response, so "To guard against this risk" makes the problem and solution relationship clear. "For example" is wrong because error-correcting codes are not an instance of a flipped bit.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which word best fills the blank in sentence 7?`,
          choices: [
            ok(`but`),
            no(`so`, 'contrast-read-as-effect'),
            no(`because`, 'contrast-read-as-cause'),
            no(`and`, 'contrast-read-as-addition'),
          ],
          solution: `Sentence 7 sets what a parity bit can do against what it cannot do, so the contrasting conjunction "but" fits. "and" is tempting because it joins the clauses grammatically, but it hides the limitation that sentence 9 goes on to address.`,
        },
        {
          slot: 28,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 5`, 'removes-supporting-detail'),
            no(`Sentence 6`, 'removes-supporting-detail'),
            no(`Sentence 7`, 'removes-bridge-sentence'),
            ok(`Sentence 8`),
          ],
          solution: `The second paragraph explains how a parity bit works and what it cannot do, and the size of early computers is unrelated to that explanation. Sentence 7 must stay because it sets up the limitation that the third paragraph solves.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `In sentence 9, how does the phrase "this limitation" help connect the third paragraph to the second?`,
          choices: [
            no(`It refers to the electrical noise described in sentence 1.`, 'wrong-antecedent'),
            ok(`It refers back to the parity bit's inability to locate an error, which the third paragraph then shows how to overcome.`),
            no(`It refers to the size of the early computers mentioned in sentence 8.`, 'wrong-antecedent'),
            no(`It introduces a new weakness of sophisticated codes that the passage does not explain.`, 'misreads-backward-reference'),
          ],
          solution: `"This limitation" points to the problem stated at the end of sentence 7, that a parity bit cannot tell which bit is wrong, and sentence 10 explains how better codes find the exact location. Electrical noise is the original cause of errors, not the parity bit's limitation.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `A reviewer suggests moving sentence 12 so that it opens the third paragraph. Why would this change weaken the passage?`,
          choices: [
            no(`Sentence 12 introduces the parity bit, so it must come before sentence 5.`, 'misreads-sentence-content'),
            no(`Sentence 12 contains the passage's only transition word, so moving it would leave the paragraphs unconnected.`, 'unsupported-claim'),
            ok(`Sentence 12 sums up the importance of the codes, so moving it would split "this limitation" from sentence 7 and leave the passage without a conclusion.`),
            no(`Sentence 12 describes a problem with error-correcting codes, so it should come after the solution.`, 'misreads-sentence-content'),
          ],
          solution: `Sentence 12 is a broad concluding statement, and sentence 9 must follow the second paragraph directly so that "this limitation" clearly refers to sentence 7. The claim that sentence 12 holds the only transition is false, since words like "then" and "More sophisticated" also link ideas.`,
        },
      ],
    },
  ],
  items: [
    {
      slot: 31,
      difficulty: 'medium',
      stem: `Read: "When glaciers on land melt, the water flows into the ocean and raises sea levels. ____, floating sea ice that melts has little effect on sea level, because it was already displacing water before it melted." Which transition best completes the sentences?`,
      choices: [
        ok(`By contrast,`),
        no(`Consequently,`, 'contrast-for-effect'),
        no(`Similarly,`, 'comparison-for-contrast'),
        no(`For instance,`, 'example-for-contrast'),
      ],
      solution: `The two sentences describe opposite outcomes, one kind of melting raises sea level and the other does not, so "By contrast" fits. "Similarly" is wrong because the second sentence describes a different result, not a parallel one.`,
    },
    {
      slot: 32,
      difficulty: 'medium',
      stem: `Read the sentences: (A) As a result, some birds in cities now sing at a higher pitch than members of the same species in the countryside. (B) Traffic and machinery produce a constant, low rumble in most cities. (C) This background noise can drown out birdsong that falls in the same low range. (D) Researchers suspect that the higher pitch helps the songs carry above the noise. Which is the most logical order?`,
      choices: [
        ok(`B, C, A, D`),
        no(`A, B, C, D`, 'effect-before-cause'),
        no(`B, A, C, D`, 'ignores-reference-words'),
        no(`C, B, D, A`, 'ignores-reference-words'),
      ],
      solution: `B introduces the noise, C ("This background noise") explains its effect on song, A ("As a result") gives the birds' response, and D explains why the response helps. Order A, B, C, D fails because "As a result" cannot open the paragraph before any cause is given.`,
    },
    {
      slot: 33,
      difficulty: 'medium',
      stem: `Read the paragraph: "____ Backdrops are painted with lines that converge toward a distant point, suggesting a long avenue. Doorways at the rear of the set are built noticeably smaller than those near the audience. Even the floor may slope gently upward toward the back wall." Which sentence is the best topic sentence for the paragraph?`,
      choices: [
        ok(`Stage designers often use forced perspective to make a shallow stage appear much deeper than it really is.`),
        no(`Many theater backdrops are painted on large sheets of heavy canvas.`, 'too-narrow'),
        no(`Theater has a long and varied history in many cultures around the world.`, 'too-broad'),
        no(`Actors must learn their lines and blocking well before opening night.`, 'off-topic'),
      ],
      solution: `All three supporting sentences describe tricks that create an illusion of depth, which the forced perspective sentence names. The canvas sentence is too narrow, since it fits only the backdrops and says nothing about depth.`,
    },
    {
      slot: 34,
      difficulty: 'medium',
      stem: `Read: "The new express bus line cut commute times sharply for residents of the east side. ____, ridership on the older local route that runs alongside it fell steeply, as many passengers switched to the faster option." Which transition best completes the sentences?`,
      choices: [
        ok(`Consequently,`),
        no(`Nevertheless,`, 'effect-read-as-contrast'),
        no(`Likewise,`, 'effect-read-as-comparison'),
        no(`In other words,`, 'effect-read-as-restatement'),
      ],
      solution: `Riders left the old route because the new line was faster, so the second sentence is a result of the first and "Consequently" fits. "Likewise" is tempting because both sentences describe a decrease, but the drop in ridership is caused by the new line, not parallel to it.`,
    },
    {
      slot: 35,
      difficulty: 'hard',
      stem: `A student's essay has one paragraph explaining how coral bleaching occurs and a second paragraph describing projects that help damaged reefs regrow. Which sentence would best open the second paragraph?`,
      choices: [
        ok(`Although bleaching can devastate a reef within weeks, scientists and volunteer divers are now testing ways to help damaged reefs recover.`),
        no(`Coral reefs are found in warm, shallow waters in many parts of the world.`, 'generic-no-link'),
        no(`Bleaching happens when stressed corals expel the tiny algae that live in their tissues.`, 'repeats-previous-paragraph'),
        no(`Therefore, restoration projects have now completely solved the problem of coral bleaching.`, 'overstated-claim'),
      ],
      solution: `The correct sentence refers back to bleaching (the first paragraph) and forward to recovery efforts (the second), creating a clear link. The sentence about corals expelling algae only repeats the first paragraph and does not introduce restoration.`,
    },
    {
      slot: 36,
      difficulty: 'hard',
      stem: `Read: "A survey found that students who kept a written study schedule reported less stress before exams. ____, the survey cannot show that the schedules caused the lower stress; students who were already calm may simply have been more likely to keep schedules." Which transition best completes the sentences?`,
      choices: [
        ok(`However,`),
        no(`In fact,`, 'intensifier-for-qualification'),
        no(`Specifically,`, 'detail-for-qualification'),
        no(`Therefore,`, 'qualification-read-as-effect'),
      ],
      solution: `The second sentence limits the conclusion a reader might draw from the first, so the contrasting "However" fits. "In fact" is tempting because it often follows a finding, but it would wrongly signal that the second sentence strengthens the first rather than qualifying it.`,
    },
    {
      slot: 37,
      difficulty: 'medium',
      stem: `Read the paragraph: "(1) Magnetic levitation trains float above their guideways rather than rolling on wheels. (2) Powerful magnets lift each car a short distance off the track and propel it forward. (3) Because nothing touches the rails, there is almost no friction to slow the train. (4) Tickets for long-distance trains are often cheaper when booked several weeks in advance. (5) This lack of friction allows the trains to reach very high speeds while running quietly." Which sentence should be removed?`,
      choices: [
        no(`Sentence 2`, 'removes-supporting-detail'),
        no(`Sentence 3`, 'removes-supporting-detail'),
        ok(`Sentence 4`),
        no(`Sentence 5`, 'removes-concluding-sentence'),
      ],
      solution: `The paragraph explains how levitation reduces friction and increases speed, and ticket prices have nothing to do with that explanation. Sentence 5 should stay because "This lack of friction" connects back to sentence 3 and completes the reasoning.`,
    },
    {
      slot: 38,
      difficulty: 'hard',
      stem: `A paragraph argues that towns should reduce unnecessary outdoor lighting. It explains that excess light hides the stars, confuses migrating birds, and wastes electricity. Which sentence best concludes the paragraph?`,
      choices: [
        ok(`By shielding fixtures and dimming lights late at night, a town could recover its view of the sky, protect wildlife, and lower its energy bills at the same time.`),
        no(`Migrating birds sometimes circle brightly lit buildings for hours until they are exhausted.`, 'too-narrow'),
        no(`Streetlights also help drivers see pedestrians and reduce accidents at busy crossings.`, 'introduces-counterpoint-at-end'),
        no(`Many cities are also working to plant more trees along their streets and parks.`, 'introduces-new-topic'),
      ],
      solution: `The correct sentence proposes a solution and gathers all three of the paragraph's reasons, stars, birds, and energy, into one closing statement. The sentence about birds circling buildings supports only one reason, so it works as a detail rather than a conclusion.`,
    },
    {
      slot: 39,
      difficulty: 'medium',
      stem: `Read: "Thick earthen walls have kept desert homes comfortable for centuries. ____, the walls absorb the sun's heat slowly during the day and release it at night, when the air outside turns cold." Which transition best completes the sentences?`,
      choices: [
        ok(`Specifically,`),
        no(`Instead,`, 'replacement-for-explanation'),
        no(`Even so,`, 'concession-for-explanation'),
        no(`Previously,`, 'time-for-explanation'),
      ],
      solution: `The second sentence explains in detail how the walls keep homes comfortable, so "Specifically" signals a closer look at the first sentence's claim. "Even so" is wrong because the second sentence supports the first instead of conceding a point against it.`,
    },
    {
      slot: 40,
      difficulty: 'hard',
      stem: `In which sentence does the transition express a relationship that does not fit the ideas it connects?`,
      choices: [
        no(`The museum extended its weekend hours; consequently, attendance on Sundays rose by nearly a third.`, 'misjudges-cause-effect'),
        no(`The archive's oldest maps are too fragile to handle; therefore, visitors view high-resolution scans instead.`, 'misjudges-cause-effect'),
        ok(`The exhibit drew record crowds; nevertheless, the gift shop sold out of its catalog within a week.`),
        no(`The curators expected little interest in the textile collection; however, it became the season's most visited gallery.`, 'misjudges-contrast'),
      ],
      solution: `Record crowds and a sold-out catalog fit together, so "nevertheless," which signals an unexpected contrast, is illogical there. The textile sentence correctly uses "however" because the gallery's popularity went against the curators' expectations.`,
    },
  ],
}

export default skill
