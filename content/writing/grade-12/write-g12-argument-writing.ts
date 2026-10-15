import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g12-argument-writing',
  subject: 'writing',
  grade: 12,
  group: 'Composition',
  name: 'Argument Writing',
  standards: ['W.11-12.1'],
  passages: [
    {
      code: 'wg12-argument-writing-p01',
      title: 'Letting the Roadsides Bloom',
      body: `(1) Halvorsen County mows the grassy shoulders of its rural roads four times each summer, a schedule that cuts down milkweed, clover and aster before most of them can bloom. (2) Mowing is something that happens in a lot of places. (3) A two-year trial run by the county extension office on eleven miles of Route 9 found that shoulders mowed only once, in late September, supported nearly three times as many pollinating insects as shoulders mowed on the regular schedule. (4) The same trial recorded a 31 percent drop in fuel and labor costs on the test miles. (5) The county's first mowing machine was purchased in 1952 and is now displayed at the fairgrounds.

(6) Road safety officials have raised a fair objection: tall vegetation near intersections and curves can block a driver's view of oncoming traffic. (7) This concern deserves a serious answer, because no benefit to insects would justify a higher risk of collisions. (8) The trial plan kept a six-foot strip beside the pavement, along with the full sight area at every intersection, mowed on the regular schedule. (9) During the trial, the sheriff's office reported no change in the number of crashes on the test miles.

(10) Delayed mowing is basically a no-brainer. (11) Everyone should care about bugs.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence (2) as a clear statement of the writer's claim?`,
          choices: [
            no(`Insects play many important roles in nature, and people should learn more about them.`, 'too-general'),
            no(`The county should stop mowing its roadsides entirely and let every shoulder grow wild.`, 'overstated-claim'),
            ok(`The county should adopt a single late-season mowing on rural shoulders while keeping safety zones near the pavement trimmed.`),
            no(`Some people may prefer less mowing, while others may prefer the current schedule.`, 'hedged-no-position'),
          ],
          solution: `The correct choice states a specific, arguable position that matches the trial evidence and the safety plan in sentence (8). Ending all mowing overreaches and contradicts the writer's own concession about sight lines.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            ok(`sentence (5)`),
            no(`sentence (4)`, 'removes-key-evidence'),
            no(`sentence (7)`, 'removes-concession'),
            no(`sentence (9)`, 'removes-rebuttal-evidence'),
          ],
          solution: `Sentence (5) is a historical detail about an old machine that has nothing to do with whether the schedule should change. Sentence (4) should stay because lower costs are a second reason to adopt the plan.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which transition, added to the beginning of sentence (8), best shows how it relates to sentence (7)?`,
          choices: [
            no(`Meanwhile,`, 'time-for-cause'),
            ok(`For that reason,`),
            no(`For example,`, 'example-for-response'),
            no(`In contrast,`, 'contrast-for-cause'),
          ],
          solution: `The safety strip in sentence (8) exists because of the concern described in sentence (7), so "For that reason" names the relationship. "For example" is wrong because the plan is a response to the concern, not an example of it.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `The writer wants to add evidence after sentence (9) to strengthen the response to the safety officials. Which sentence is most relevant?`,
          choices: [
            no(`Many drivers say they enjoy seeing wildflowers along quiet country roads in summer.`, 'irrelevant-appeal'),
            no(`Pollinating insects are responsible for much of the fruit grown on farms in the region.`, 'off-point-evidence'),
            no(`One resident told the county that the unmowed test miles looked untidy and neglected.`, 'undercuts-argument'),
            ok(`County engineers measured sight distances at all fourteen test intersections and found every one met the state minimum.`),
          ],
          solution: `The objection is about drivers' view of traffic, and measured sight distances answer it directly. The fact about fruit supports the benefits of pollinators but does nothing to address the safety concern.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Which choice would best replace sentences (10) and (11) as a conclusion that follows from the argument?`,
          choices: [
            no(`In conclusion, roads are important, and the county should always put drivers first.`, 'too-general'),
            ok(`Because the trial increased pollinators and cut costs without raising crash rates, the county should extend late-season mowing to all of its rural roads.`),
            no(`The county should also plant flower gardens in every town park to help insects even more.`, 'introduces-new-topic'),
            no(`Anyone who still wants four mowings a summer simply has not looked at the facts.`, 'dismissive-tone'),
          ],
          solution: `The correct conclusion restates the claim and draws together the three findings the essay presents: more pollinators, lower costs and no change in crashes. Proposing park gardens introduces a new idea instead of concluding the argument.`,
        },
      ],
    },
    {
      code: 'wg12-argument-writing-p02',
      title: 'Internship Credit at Brightwater High',
      body: `(1) Brightwater High requires every senior to complete six elective credits, but it offers no way to earn any of them outside the school building. (2) The school should allow seniors to earn one elective credit through a supervised semester internship with a local employer or nonprofit. (3) At Carver Ridge High, a nearby school that adopted a similar policy five years ago, 68 percent of interns reported that the experience helped them choose a college major or training program. (4) Internships teach habits that classrooms rarely require, such as answering to a supervisor, managing a commute and solving problems alongside adults who are not teachers. (5) I think internships are really fun and everyone would love them.

(6) Some teachers worry that students will treat the internship as an easy credit and learn little. (7) The worry is understandable, since a poorly designed program could become a semester of filing papers. (8) Brightwater could prevent this by requiring a weekly reflection journal, a midterm visit from a faculty advisor and a final presentation graded against a published rubric. (9) Carver Ridge uses these same requirements, and in five years its advisors removed only three placements for lack of meaningful work.

(10) Internships are common in many countries around the world.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence states the writer's main claim?`,
          choices: [
            no(`sentence (1)`, 'background-as-claim'),
            ok(`sentence (2)`),
            no(`sentence (6)`, 'counterclaim-as-claim'),
            no(`sentence (8)`, 'rebuttal-as-claim'),
          ],
          solution: `Sentence (2) states the position the whole essay defends: seniors should be able to earn elective credit through internships. Sentence (1) only describes the current rule that the claim responds to.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which revision of sentence (5) best maintains a formal style and connects to the claim?`,
          choices: [
            no(`Honestly, internships are awesome, and pretty much every senior would want one.`, 'keeps-informal-tone'),
            no(`Internships can be enjoyable, and enjoyment is something everyone deserves.`, 'vague-reasoning'),
            no(`Students who prefer classrooms are free to ignore internships if they want.`, 'off-point'),
            ok(`Because these skills carry directly into college and work, an internship would serve students as well as many traditional electives do.`),
          ],
          solution: `The correct revision uses formal wording and explains why the skills in sentence (4) justify the credit. The choice about enjoyment is less slangy but still offers feeling instead of reasoning.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which transition, added to the beginning of sentence (4), best shows its relationship to sentence (3)?`,
          choices: [
            ok(`In addition,`),
            no(`Nevertheless,`, 'contrast-for-addition'),
            no(`As a result,`, 'cause-effect-for-addition'),
            no(`For instance,`, 'example-for-addition'),
          ],
          solution: `Sentence (4) offers a second, separate benefit of internships, so "In addition" fits. "As a result" is wrong because learning workplace habits is not caused by interns choosing a major.`,
        },
        {
          slot: 9,
          difficulty: 'hard',
          stem: `A skeptical reader might say that sentence (3) proves little, since students who seek internships may already be unusually focused. Which revision of sentence (3) best answers this concern?`,
          choices: [
            no(`At Carver Ridge High, a large share of interns said the program was helpful in planning their futures.`, 'vaguer-evidence'),
            ok(`At Carver Ridge High, 68 percent of interns, compared with 41 percent of seniors with similar grades who did not intern, said they had chosen a major or training program.`),
            no(`At Carver Ridge High, nearly every intern said the experience changed their life in remarkable ways.`, 'overstated-evidence'),
            no(`At Carver Ridge High, 68 percent of the enthusiastic interns reported that the program helped them choose a path.`, 'emotional-wording'),
          ],
          solution: `Comparing interns with similar seniors who did not intern helps show the internship, not the students' prior focus, made the difference. The vaguer choice removes the number and does nothing to address the reader's doubt.`,
        },
        {
          slot: 10,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (10) as the conclusion?`,
          choices: [
            no(`Internships are one of many ways that students can learn, along with clubs, sports and travel.`, 'too-general'),
            no(`Teachers who doubt internships should visit Carver Ridge before judging the idea.`, 'dismissive-tone'),
            ok(`With journals, advisor visits and graded presentations in place, an internship credit would give seniors real workplace experience without becoming an easy grade.`),
            no(`Brightwater should also let juniors take internships during their summer vacation.`, 'introduces-new-topic'),
          ],
          solution: `The correct conclusion restates the claim and shows that the safeguards in sentence (8) answer the teachers' worry. The choice about juniors brings in a new proposal instead of concluding this one.`,
        },
      ],
    },
    {
      code: 'wg12-argument-writing-p03',
      title: 'Opening the Pellam Mill Ledgers',
      body: `(1) In the basement of the Pellam Historical Society sit forty-two leather ledgers recording the wages, purchases and hours of workers at the Pellam Woolen Mill between 1861 and 1904. (2) Because the handwriting is faded and impossible to search, almost no researcher has used them in the past decade. (3) The society has applied three times for a state grant to hire a professional transcriber and has been turned down each time. (4) Rather than wait for a fourth attempt, the society should invite trained volunteers to transcribe the ledgers through a shared online platform. (5) The Dorsey County Archive used this approach for its ship registers and finished 6,000 pages in eighteen months, a task its staff had estimated would take a single professional seven years. (6) Volunteer projects also build public interest in local history.

(7) Some archivists caution that volunteers make more errors than professionals, and a careless transcription could mislead future researchers. (8) Those people are just being snobs about who gets to touch old books. (9) Dorsey County had every page transcribed independently by two volunteers, and a staff member reviewed any line where the two versions disagreed. (10) An audit of 500 randomly chosen pages found an error rate below one percent, close to the rate expected from a single professional.

(11) The ledgers have waited long enough.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence states the writer's main claim?`,
          choices: [
            no(`sentence (2)`, 'problem-as-claim'),
            no(`sentence (3)`, 'background-as-claim'),
            ok(`sentence (4)`),
            no(`sentence (7)`, 'counterclaim-as-claim'),
          ],
          solution: `Sentence (4) states what the society should do, which is the position the rest of the essay supports. Sentence (2) describes the problem but does not propose a solution.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which revision of sentence (8) best keeps a formal style and an objective tone?`,
          choices: [
            no(`Those archivists clearly just want to keep history locked away for themselves.`, 'dismissive-tone'),
            ok(`Accuracy is a fair concern, but a careful review process can address it.`),
            no(`Honestly, worrying about a few typos seems kind of silly to me.`, 'keeps-informal-tone'),
            no(`Archivists have many opinions, and all of them are worth hearing.`, 'vague-wording'),
          ],
          solution: `The correct revision grants that accuracy matters and leads into the review process in sentences (9) and (10). The first choice is more formal than the original but still attacks the archivists' motives instead of their reasoning.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence (6), would best support the point it makes?`,
          choices: [
            ok(`At Dorsey County, four in ten volunteers later booked a research appointment to learn more about the families named in the registers.`),
            no(`Many people enjoy volunteering because it lets them meet new friends in their community.`, 'off-point-evidence'),
            no(`The Pellam Woolen Mill was once the largest employer in the county.`, 'irrelevant-detail'),
            no(`Professional transcribers usually charge by the page, which can make large projects costly.`, 'supports-other-point'),
          ],
          solution: `Sentence (6) claims that volunteer projects build interest in history, and research appointments by former volunteers show that interest directly. The fact about professional fees supports a different point about cost.`,
        },
        {
          slot: 14,
          difficulty: 'hard',
          stem: `Which choice best explains why the writer should keep sentence (7)?`,
          choices: [
            no(`It provides the main evidence that volunteers can finish the work faster than staff.`, 'misreads-function'),
            no(`It shows that the writer agrees the ledgers should remain untranscribed.`, 'concession-as-reversal'),
            ok(`It states a reasonable opposing claim that sentences (9) and (10) then answer with evidence.`),
            no(`It adds variety by switching to a new topic before the conclusion.`, 'misreads-structure'),
          ],
          solution: `Sentence (7) fairly presents the accuracy concern, and the double transcription and audit in sentences (9) and (10) answer it, which makes the argument more credible. Acknowledging the concern does not mean the writer has given up the claim.`,
        },
        {
          slot: 15,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (11) as a conclusion that follows from the argument?`,
          choices: [
            no(`History is important, and everyone should take time to visit their local museum.`, 'too-general'),
            no(`If the grant is denied again, the society should sell the ledgers to a university.`, 'introduces-new-topic'),
            no(`Volunteers are always better than professionals at every kind of archive work.`, 'overgeneralizes'),
            ok(`A checked volunteer project could make the mill ledgers searchable within two years, with accuracy close to a professional's and no grant required.`),
          ],
          solution: `The correct conclusion ties the claim to the speed and accuracy evidence from Dorsey County. The claim that volunteers are always better overreaches, since the essay only shows their accuracy was close to a professional's.`,
        },
      ],
    },
    {
      code: 'wg12-argument-writing-p04',
      title: 'Measuring Heat at Orland Valley',
      body: `(1) Orland Valley High cancels outdoor practices only when the air temperature reaches 95 degrees, a rule that ignores humidity, sunshine and wind. (2) The athletic department should instead base its decisions on a wet-bulb globe temperature reading, a measurement that combines all four conditions into a single number. (3) According to the state athletic trainers' association, an afternoon of 88 degrees with high humidity can place more strain on the body than a dry afternoon of 96 degrees. (4) A handheld meter costs about 300 dollars, less than the price of one set of new uniforms. (5) The football team won the regional title in 2019.

(6) Some coaches argue that a more complicated system would lead to frequent, unpredictable cancellations and cost teams valuable preparation time. (7) However, the wet-bulb system does not simply cancel practices; it sets levels that call for longer water breaks, lighter equipment or a move to the early morning before a session is called off. (8) Last fall, the Brennick Conference used this tiered system at nine schools and canceled fewer practices than it had under its old air-temperature rule, because the tiers let teams adjust rather than stop.

(9) The district says it cares about athletes. (10) Now it is time to show it.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            no(`sentence (3)`, 'removes-key-evidence'),
            no(`sentence (4)`, 'removes-cost-point'),
            ok(`sentence (5)`),
            no(`sentence (6)`, 'removes-counterclaim'),
          ],
          solution: `A past championship has nothing to do with how practices should be measured for heat, so sentence (5) should go. Sentence (4) stays because a low cost answers a practical question a reader would have.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `In sentence (7), the writer begins with "However" in order to:`,
          choices: [
            no(`introduce a second opposing view from a different group of coaches.`, 'misreads-transition'),
            ok(`signal a response to the coaches' objection in sentence (6).`),
            no(`show that sentence (7) is an example of the objection in sentence (6).`, 'contrast-as-example'),
            no(`indicate that the writer now agrees with the coaches.`, 'reverses-meaning'),
          ],
          solution: `"However" marks a turn from the coaches' worry about cancellations to the writer's answer that the system adjusts practices rather than ending them. The writer does not agree with the coaches; sentence (7) disputes their prediction.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which sentence, added after sentence (3), best explains how that evidence supports the claim?`,
          choices: [
            no(`Humidity is the amount of water vapor present in the air at a given time.`, 'definition-not-reasoning'),
            no(`Many athletes feel tired and thirsty during long practices in late summer.`, 'vague-support'),
            ok(`Under the current rule, practice would continue on the more dangerous of those two afternoons and be canceled on the safer one.`),
            no(`Some schools in other states have already switched to newer measuring tools.`, 'new-evidence-not-reasoning'),
          ],
          solution: `The correct sentence links the fact in sentence (3) to the flaw in the current rule, showing why a better measurement is needed. The sentence about other schools adds a new fact but does not explain the evidence already given.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which choice would best replace sentences (9) and (10) as the conclusion?`,
          choices: [
            ok(`A single meter would let Orland Valley protect athletes on humid days that the current rule misses, while keeping more practices on the schedule.`),
            no(`Coaches who resist this change are putting trophies ahead of the health of their players.`, 'dismissive-tone'),
            no(`Sports teach teamwork and discipline, and every student should try at least one.`, 'too-general'),
            no(`The district should also build an indoor field house so that heat is never a problem.`, 'introduces-new-topic'),
          ],
          solution: `The correct conclusion restates the claim and brings together both strands of the argument: better protection and fewer cancellations. Accusing coaches of misplaced priorities replaces reasoning with an attack.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `A reader suspects that the Brennick Conference canceled fewer practices in sentence (8) simply because last fall was cooler than usual. Which addition would best answer this doubt?`,
          choices: [
            no(`Coaches in the conference said they were very pleased with how the season went.`, 'opinion-not-evidence'),
            no(`The conference plans to keep using the tiered system for at least three more years.`, 'irrelevant-to-doubt'),
            no(`Cooler weather is common in some years and can make practices more pleasant.`, 'concedes-without-answer'),
            ok(`Conference records show that the number of days above 90 degrees last fall was nearly the same as the year before.`),
          ],
          solution: `If the weather was about as hot as the previous year, the drop in cancellations is more likely due to the new system. Coaches' satisfaction is an opinion and says nothing about the temperatures.`,
        },
      ],
    },
    {
      code: 'wg12-argument-writing-p05',
      title: 'Keeping the Darkroom at Linden Hall',
      body: `(1) Linden Hall's art department has proposed converting the school's film darkroom into a storage closet, arguing that digital cameras have made it obsolete. (2) The darkroom should be repaired and kept, because it teaches lessons about light, chemistry and patience that a digital screen cannot. (3) In a darkroom, students must calculate exposure times and mix developer at precise temperatures, which turns abstract ideas from physics and chemistry class into visible results. (4) Each print takes many minutes, so students learn to plan an image carefully instead of taking two hundred shots and hoping one works. (5) Last spring, 46 students signed up for the darkroom elective, more than for any other art course.

(6) The art department's concerns are not unreasonable. (7) Repairing the ventilation fan and the enlarger would cost roughly 2,400 dollars, and the chemicals require careful handling and disposal. (8) A local photography club has offered to donate a used enlarger, and the district's science supply contract already includes safe chemical disposal for the chemistry labs. (9) The storage the department needs could go in an unused classroom on the third floor.

(10) Digital photography is great too, and phones take really good pictures nowadays.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which transition, added to the beginning of sentence (8), best shows its relationship to sentence (7)?`,
          choices: [
            no(`Therefore,`, 'cause-effect-for-contrast'),
            no(`Likewise,`, 'similarity-for-contrast'),
            ok(`Still,`),
            no(`In summary,`, 'summary-for-contrast'),
          ],
          solution: `Sentence (7) admits costs and risks, and sentence (8) shows how they can be reduced, so a contrasting transition like "Still" fits. "Therefore" is wrong because the club's donation is not a result of the repair costs.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which detail, added after sentence (3), would best support the point that sentence makes?`,
          choices: [
            no(`The darkroom was built in 1971, when film was the only option for school photographers.`, 'irrelevant-detail'),
            ok(`During a joint lesson last year, students compared development times at two temperatures and graphed how warmer developer darkened their prints.`),
            no(`Several students said the darkroom's red light gives the room a calm, relaxing atmosphere.`, 'off-point-evidence'),
            no(`Film cameras can often be bought secondhand for much less than new digital ones.`, 'supports-other-point'),
          ],
          solution: `Sentence (3) says darkroom work turns science concepts into visible results, and graphing development times at different temperatures is a concrete example of that. The comment about the calm atmosphere is about mood, not about learning science.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Why should the writer revise sentence (10)?`,
          choices: [
            no(`It is too long and should be split into two shorter sentences.`, 'surface-fix-only'),
            no(`It introduces an opposing claim that the essay never mentioned before.`, 'misidentifies-problem'),
            no(`It repeats the evidence from sentence (5) without adding anything.`, 'misreads-sentence'),
            ok(`It ends the essay by praising the alternative in informal language instead of restating why the darkroom should stay.`),
          ],
          solution: `A conclusion should follow from the argument, but sentence (10) drifts to praising digital photography in casual wording and never returns to the claim. The essay did mention the digital alternative in sentence (1), so the problem is not that the idea is new.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (10) as the conclusion?`,
          choices: [
            no(`Art is a valuable part of every school, and students should take as many art classes as they can.`, 'too-general'),
            no(`The school should also start a film club that meets on weekends.`, 'introduces-new-topic'),
            ok(`With donated equipment and existing disposal services, Linden Hall can keep a room that teaches science, planning and patience at a modest cost.`),
            no(`Anyone who wants to turn the darkroom into a closet does not understand real photography.`, 'dismissive-tone'),
          ],
          solution: `The correct conclusion restates the claim and draws on both the benefits from paragraph one and the cost solutions from paragraph two. The weekend club adds a new proposal instead of closing the argument.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `A critic notes that sentence (5) shows only that the elective is popular, not that it teaches anything valuable. Which revision of sentence (5) best connects this evidence to the claim in sentence (2)?`,
          choices: [
            ok(`Last spring, 46 students took the darkroom elective, and their teacher found that they explained exposure on the final exam more accurately than students in the digital course.`),
            no(`Last spring, a remarkable 46 students eagerly signed up for the darkroom elective, a truly impressive number.`, 'emotional-wording'),
            no(`Last spring, more students signed up for the darkroom elective than ever before in the school's history.`, 'still-popularity-only'),
            no(`Last spring, 46 students signed up for the darkroom elective, though some later switched to other courses.`, 'undercuts-argument'),
          ],
          solution: `Exam results about exposure show learning, which is what sentence (2) claims the darkroom provides. The record enrollment choice still measures only popularity, so it does not answer the critic.`,
        },
      ],
    },
    {
      code: 'wg12-argument-writing-p06',
      title: 'Air Sensors for Tilbury Bus Stops',
      body: `(1) Thousands of Tilbury residents wait at bus stops beside heavy traffic each day, yet the city measures air quality at only one monitoring station, located in a park two miles from downtown. (2) The city should install low-cost air sensors at its twenty busiest bus stops and publish the readings on a public website. (3) A student project at Tilbury Technical College placed four borrowed sensors at downtown stops for a month and found rush-hour fine particle levels that were often twice those reported by the park station. (4) With readings from each stop, the transit department could see which routes expose riders to the worst air and target shelters, plantings or schedule changes there. (5) Sensors are cool gadgets.

(6) Environmental engineers note that low-cost sensors are less accurate than the city's official monitor, especially in humid weather. (7) This limitation is real, and the city should not use the sensors to issue official health warnings. (8) The sensors could be checked each season against the park station, a method the college students used to keep their readings within about ten percent of the official values. (9) Even approximate readings would reveal which stops are worst, and that comparison is exactly what the city needs.

(10) In conclusion, air pollution is bad.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it adds nothing to the argument?`,
          choices: [
            no(`sentence (3)`, 'removes-key-evidence'),
            no(`sentence (4)`, 'removes-reasoning'),
            no(`sentence (7)`, 'removes-concession'),
            ok(`sentence (5)`),
          ],
          solution: `Sentence (5) is an informal opinion that gives no reason or evidence for installing sensors. Sentence (4) should stay because it explains how the city would use the readings.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which transition, added to the beginning of sentence (8), best shows its relationship to sentence (7)?`,
          choices: [
            no(`Consequently,`, 'cause-effect-for-contrast'),
            ok(`However,`),
            no(`For example,`, 'example-for-contrast'),
            no(`Similarly,`, 'similarity-for-contrast'),
          ],
          solution: `Sentence (7) admits a limitation, and sentence (8) turns to a way of reducing it, so "However" signals the shift. "Consequently" is wrong because seasonal checks are not a result of the city avoiding health warnings.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Why does sentence (7) make the argument more convincing?`,
          choices: [
            ok(`It admits a real weakness and narrows the claim so the sensors are used for comparison, not official warnings.`),
            no(`It proves that the low-cost sensors are just as accurate as the official monitor.`, 'misreads-concession'),
            no(`It shows that the writer has decided the sensors are not worth installing.`, 'concession-as-reversal'),
            no(`It introduces new evidence from the college project for the first time.`, 'misreads-function'),
          ],
          solution: `By granting the accuracy concern and limiting how the sensors would be used, the writer appears fair and keeps the claim defensible. Sentence (7) does not say the sensors are as accurate as the official monitor; it says the opposite.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (10) as the conclusion?`,
          choices: [
            no(`Everyone should try to drive less and take the bus more often.`, 'introduces-new-topic'),
            no(`The city should immediately warn riders at every downtown stop that the air is unsafe.`, 'contradicts-reasoning'),
            ok(`A calibrated sensor network would show Tilbury where riders breathe the worst air, giving the transit department a basis for targeted fixes.`),
            no(`Air quality is a complicated subject that scientists are still studying.`, 'too-general'),
          ],
          solution: `The correct conclusion restates the claim and its purpose of comparing stops to guide fixes. Issuing warnings contradicts sentence (7), where the writer agreed the sensors should not be used for official health warnings.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence (3) that addresses a weakness in that evidence without abandoning the claim. Which choice does this best?`,
          choices: [
            no(`These results prove that the air at every bus stop in Tilbury is unsafe to breathe.`, 'overgeneralizes'),
            no(`Because the study was so small, its findings should probably be ignored by the city.`, 'abandons-claim'),
            ok(`Four stops over a single month is a small sample, which is why a citywide network is needed to see whether the pattern holds across seasons.`),
            no(`The students who ran the project were very hardworking and deserve recognition.`, 'irrelevant-praise'),
          ],
          solution: `The correct choice admits the sample is small and turns that limit into a reason for the proposed network. Saying the findings should be ignored names the weakness but gives up the evidence instead of answering it.`,
        },
      ],
    },
    {
      code: 'wg12-argument-writing-p07',
      title: 'Returnable Containers at Saltmarsh Market',
      body: `(1) Every Saturday, vendors at the Saltmarsh Farmers Market hand out roughly 1,800 disposable takeout containers, most of which end up in the overflowing bins by the parking lot. (2) The market should launch a deposit system in which customers pay two dollars for a sturdy reusable container and get the money back when they return it to a washing station. (3) The market committee sorted its trash last July and found that disposable containers made up nearly half of it by volume. (4) Similar programs have worked elsewhere. (5) At the Greyfield Night Market, a deposit program begun two years ago now recovers 92 percent of its containers each week, and the market's trash hauling bill has fallen by a third.

(6) Some vendors fear that customers will find the deposit annoying and buy less food. (7) This is a reasonable concern, since vendors depend on quick sales. (8) Greyfield vendors reported no drop in sales after the first month, and several said regulars visited more often because they came back to return containers. (9) Washing would be handled by a paid crew of local high school students, so vendors would not lose time at their stalls.

(10) Obviously anyone who is against this just likes making a mess.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence presents an opposing claim?`,
          choices: [
            no(`sentence (3)`, 'evidence-as-counterclaim'),
            no(`sentence (5)`, 'evidence-as-counterclaim'),
            ok(`sentence (6)`),
            no(`sentence (8)`, 'rebuttal-as-counterclaim'),
          ],
          solution: `Sentence (6) states the vendors' view that a deposit would hurt sales, which opposes the writer's claim. Sentence (8) is the writer's answer to that view, not the view itself.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which transition, added to the beginning of sentence (8), best shows its relationship to sentence (7)?`,
          choices: [
            no(`Therefore,`, 'cause-effect-for-contrast'),
            no(`Likewise,`, 'similarity-for-contrast'),
            no(`For instance,`, 'example-for-contrast'),
            ok(`Nevertheless,`),
          ],
          solution: `Sentence (7) grants that the concern is reasonable, and sentence (8) shows the feared drop in sales did not happen, so "Nevertheless" marks the contrast. "For instance" is wrong because the Greyfield results do not illustrate the concern; they challenge it.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which sentence provides the most direct evidence that a deposit program can actually work?`,
          choices: [
            no(`sentence (1)`, 'problem-as-solution-evidence'),
            no(`sentence (3)`, 'problem-as-solution-evidence'),
            ok(`sentence (5)`),
            no(`sentence (7)`, 'concession-as-evidence'),
          ],
          solution: `Sentence (5) reports the results of a working deposit program: a high return rate and lower hauling costs. Sentence (3) shows how large the trash problem is, but it says nothing about whether the solution succeeds.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `Sentence (9) answers a concern the writer never states. Which sentence, added after sentence (6), would best set up sentence (9)?`,
          choices: [
            ok(`They also worry that collecting and washing containers would pull them away from serving customers.`),
            no(`They also worry that reusable containers may cost more to buy at the start of the program.`, 'mismatched-concern'),
            no(`Many shoppers, however, say they would gladly pay a small deposit to reduce trash.`, 'evidence-not-concern'),
            no(`The vendors at Saltmarsh have sold food there for many years and know their customers well.`, 'irrelevant-detail'),
          ],
          solution: `Sentence (9) explains that a paid crew would do the washing so vendors keep their time, which answers a concern about labor at the stalls. The concern about purchase cost is reasonable but is not the one sentence (9) responds to.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence (10) as a conclusion that follows from the argument?`,
          choices: [
            no(`The market should ban all disposable containers next season and fine vendors who use them.`, 'contradicts-reasoning'),
            no(`Reducing waste is everyone's responsibility, at home, at school and at work.`, 'too-general'),
            ok(`Greyfield's results suggest a deposit system could cut Saltmarsh's largest source of trash without costing vendors sales or time.`),
            no(`The market should also add more benches and shade so shoppers stay longer.`, 'introduces-new-topic'),
          ],
          solution: `The correct conclusion restates the claim and answers both vendor concerns using the evidence from Greyfield. A ban with fines goes beyond the voluntary deposit system the essay argued for and ignores the vendors' worries.`,
        },
      ],
    },
    {
      code: 'wg12-argument-writing-p08',
      title: 'A Wash Station for Lake Tarrow',
      body: `(1) Lake Tarrow has so far remained free of invasive mussels, which have clogged water intakes and crowded out native species in at least six lakes within a day's drive. (2) The lake authority should require every boat entering from the public launch to pass through a free washing station during the summer season. (3) Mussel larvae are too small to see and can survive for several days in water left in a boat's motor, so a quick visual inspection cannot catch them. (4) At Pinecrest Reservoir, which installed a mandatory wash station eight years ago, regular surveys have found no mussels, while two unprotected lakes nearby became infested in the same period. (5) Removing mussels after they arrive costs far more than keeping them out; the town of Ellery spends about 140,000 dollars a year clearing its water intake pipes.

(6) Some anglers object that waiting for a wash will delay early morning launches, when fishing is best. (7) This objection matters, because a rule that people resent is a rule people will try to avoid. (8) The authority could open the station at 4:30 in the morning and add a second wash lane on weekends, when lines are longest. (9) With two lanes, the average wait at Pinecrest is under seven minutes.

(10) In the end, there are many lakes in the state, and all of them are special.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which transition, added to the beginning of sentence (5), best shows how it relates to the reasons before it?`,
          choices: [
            ok(`Moreover,`),
            no(`However,`, 'contrast-for-addition'),
            no(`Instead,`, 'replacement-for-addition'),
            no(`For example,`, 'example-for-addition'),
          ],
          solution: `Sentence (5) adds a new reason, the high cost of removal, to the reasons already given, so "Moreover" fits. "However" is wrong because the cost point supports the claim rather than contrasting with it.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Why does the comparison in sentence (4) strengthen the argument?`,
          choices: [
            no(`It shows that Pinecrest Reservoir is larger and more popular than Lake Tarrow.`, 'unsupported-inference'),
            no(`It proves that wash stations will keep every lake in the state free of mussels forever.`, 'overgeneralizes'),
            ok(`It suggests the wash station, not luck, kept Pinecrest clean, since nearby lakes without one became infested.`),
            no(`It explains why mussel larvae are too small to see during an inspection.`, 'misreads-function'),
          ],
          solution: `Pairing Pinecrest with nearby unprotected lakes over the same period makes the wash station the likely reason for the difference. The comparison supports the claim but does not prove a permanent result for every lake.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `The writer wants to add a sentence after sentence (9) to complete the response to the anglers. Which choice is best?`,
          choices: [
            no(`Anglers who complain about a short wait are not thinking about the future of the lake.`, 'dismissive-tone'),
            ok(`A delay that short, with the station open before sunrise, is unlikely to cost anglers the early hours they value.`),
            no(`Fishing is a popular pastime that brings many visitors to the region every summer.`, 'off-point'),
            no(`Pinecrest also sells fishing licenses at its wash station for the convenience of visitors.`, 'irrelevant-detail'),
          ],
          solution: `The correct choice explains how the evidence in sentences (8) and (9) answers the anglers' specific concern about early launches. Blaming anglers dismisses the objection that sentence (7) said deserved an answer.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (1), would best show that the threat to Lake Tarrow is urgent rather than merely possible?`,
          choices: [
            no(`Invasive species have been studied by biologists for well over a century.`, 'too-general'),
            no(`Lake Tarrow is known for its clear water and excellent trout fishing.`, 'irrelevant-detail'),
            no(`Some experts believe mussels could someday spread to lakes across the region.`, 'hedged-evidence'),
            ok(`Last summer, boats that had recently been in two of those infested lakes were logged at Tarrow's public launch more than 300 times.`),
          ],
          solution: `Hundreds of recorded visits from infested lakes show that mussels are already arriving at the launch, which makes the risk immediate. The expert prediction is about what could happen someday, so it makes the threat sound less urgent, not more.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Which sentence would best replace sentence (10) as a conclusion that follows from the argument?`,
          choices: [
            no(`The authority should close the public launch entirely until a permanent solution is found.`, 'contradicts-reasoning'),
            no(`Protecting nature is important, and everyone should do their part to help.`, 'too-general'),
            ok(`A required wash, open early and staffed for weekend crowds, would protect Lake Tarrow at a fraction of the cost of removing mussels later.`),
            no(`The state should also study whether other invasive plants are spreading in its rivers.`, 'introduces-new-topic'),
          ],
          solution: `The correct conclusion restates the claim, includes the answer to the anglers, and recalls the cost argument from sentence (5). Closing the launch contradicts the writer's effort to keep early morning fishing available.`,
        },
      ],
    },
  ],
}

export default skill
