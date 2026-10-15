import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g9-argument-writing',
  subject: 'writing',
  grade: 9,
  group: 'Composition',
  name: 'Argument Writing',
  standards: ['W.9-10.1'],
  passages: [
    {
      code: 'wg9-argument-writing-p01',
      title: 'Bird-Safe Windows at Hollis High',
      body: `(1) The new science wing at Hollis High School has a wall of tall glass windows facing the wooded hill behind the track. (2) Since the wing opened last fall, the custodial staff have found more than sixty dead or stunned birds beneath that wall. (3) Birds are interesting animals that live almost everywhere on Earth. (4) Birds cannot see clear or reflective glass, so they fly toward the trees they see reflected in it. (5) A student survey team counted strikes for six weeks and found that nearly all of them happened along the same forty feet of glass.

(6) Some teachers worry that patterned window film would block the view and darken the classrooms. (7) This is a fair concern, since the view of the hill is one of the wing's best features. (8) However, the recommended film uses small white dots spaced two inches apart, which leaves more than ninety percent of the glass clear. (9) At the Brindle Nature Center, a similar film reduced bird strikes by about eighty percent in its first year, and staff said visitors rarely noticed the dots.

(10) The film would cost about $900 for the forty feet of glass where most strikes occur. (11) The Hollis Environmental Club has already raised $400 toward that cost with a spring plant sale. (12) Installing the film would give biology classes a chance to keep counting strikes and measure whether the change worked. (13) Anyway, birds are cool and the school should probably do something about it someday.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            no(`sentence (2)`, 'removes-key-evidence'),
            ok(`sentence (3)`),
            no(`sentence (5)`, 'removes-supporting-detail'),
            no(`sentence (11)`, 'removes-supporting-detail'),
          ],
          solution: `Sentence (3) makes a general remark about birds that has nothing to do with the windows at Hollis High. Sentence (2) must stay because it shows the size of the problem the writer wants solved.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence would best replace sentence (13) as a formal conclusion that follows from the argument?`,
          choices: [
            no(`In conclusion, birds are important to nature, and people should learn more about them.`, 'too-general'),
            no(`Anyone who cares more about a view than about birds should be ashamed.`, 'dismissive-tone'),
            ok(`Because the film would save many birds at a low cost and keep the view clear, Hollis High should install it.`),
            no(`The school should also plant more trees on the hill so birds have places to nest.`, 'introduces-new-topic'),
          ],
          solution: `The correct conclusion restates the writer's position and draws on the evidence about bird deaths, cost and the clear view. The general statement about birds drops the writer's actual proposal.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `The draft never states the writer's claim directly. Which sentence, added after sentence (2), would best state the claim?`,
          choices: [
            ok(`To protect birds and give students a real science project, Hollis High should apply bird-safe film to the science wing's windows.`),
            no(`Birds face many dangers in the modern world, and windows are only one of them.`, 'too-broad'),
            no(`Many students and teachers have noticed birds flying near the new science wing.`, 'fact-not-claim'),
            no(`Hollis High should close the science wing until the bird problem is completely solved.`, 'claim-not-supported'),
          ],
          solution: `The rest of the draft argues for window film, so the claim must name that solution and the reasons for it. Closing the wing is a position the draft never supports, and the sentence about noticing birds is a fact, not a claim.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `The writer wants to begin sentence (12) with a transition. Which choice best shows how sentence (12) relates to the sentences before it?`,
          choices: [
            no(`On the other hand,`, 'contrast-for-addition'),
            no(`For example,`, 'example-for-addition'),
            no(`As a result,`, 'cause-effect-for-addition'),
            ok(`In addition,`),
          ],
          solution: `Sentence (12) adds a new benefit, a science project for biology classes, so "In addition" fits. "As a result" is wrong because the project is not caused by the club's fundraising in sentence (11).`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (8), would best strengthen the writer's response to the teachers' concern?`,
          choices: [
            no(`Many people find a pattern of small dots pleasant and calming to look at.`, 'unsupported-generalization'),
            ok(`When the Brindle Nature Center measured light before and after installing the film, indoor light dropped by less than five percent.`),
            no(`Bird strikes happen most often during the spring and fall migration seasons.`, 'misses-counterclaim'),
            no(`The film can be ordered in several colors, including white, silver and gray.`, 'irrelevant-detail'),
          ],
          solution: `The teachers worry that the film would darken the classrooms, and the measured light readings answer that worry with evidence. The sentence about migration seasons is true to the topic but says nothing about light or the view.`,
        },
      ],
    },
    {
      code: 'wg9-argument-writing-p02',
      title: 'Keyboarding for Ninth Graders',
      body: `(1) At Marlowe High School, students type almost every major assignment, from lab reports to history essays. (2) Yet most ninth graders have never been taught to type, and many still search for each key using two fingers. (3) Marlowe should add a six-week keyboarding unit to the ninth-grade technology course. (4) Last spring, the technology teacher, Ms. Okafor, timed eighty ninth graders and found an average speed of only eighteen words per minute. (5) Students who had taken a typing class in middle school averaged forty-one words per minute. (6) Slow typing is a total pain on timed writing tests, where kids run out of time before they get their ideas down.

(7) Some students argue that typing lessons are unnecessary because they can simply speak into their devices and let software type for them. (8) Voice typing is certainly useful for homework at home. (9) It is not allowed during most school tests, though, and it would not work well in a crowded classroom where thirty students would be talking at once.

(10) A keyboarding unit would not require new equipment, since every classroom already has a laptop cart. (11) Free typing practice programs are available online, and Ms. Okafor has offered to design the lessons herself. (12) My cousin types really fast because she plays a lot of computer games. (13) For these reasons, a short keyboarding unit is a low-cost way to help ninth graders work faster and show what they know.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it is a personal story that does not support the claim?`,
          choices: [
            no(`sentence (4)`, 'removes-key-evidence'),
            no(`sentence (8)`, 'removes-concession'),
            no(`sentence (11)`, 'removes-supporting-detail'),
            ok(`sentence (12)`),
          ],
          solution: `Sentence (12) is a casual story about one relative and does not show that a school keyboarding unit would help. Sentence (8) should stay because it fairly grants a point before the writer responds in sentence (9).`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which transition, added to the beginning of sentence (5), best shows how it relates to sentence (4)?`,
          choices: [
            ok(`By comparison,`),
            no(`As a result,`, 'cause-effect-for-comparison'),
            no(`For example,`, 'example-for-comparison'),
            no(`Finally,`, 'sequence-for-comparison'),
          ],
          solution: `Sentence (5) sets the trained students' speed beside the average in sentence (4), so "By comparison" fits. "As a result" is wrong because the trained students' speed is not caused by the slow average.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `What is the main purpose of sentences (7) through (9)?`,
          choices: [
            no(`to give more evidence that students type slowly`, 'misreads-function'),
            ok(`to present an opposing view and explain why it falls short`),
            no(`to admit that keyboarding lessons are not really needed`, 'confuses-concession-with-reversal'),
            no(`to describe how the keyboarding unit would be taught`, 'misidentifies-structure'),
          ],
          solution: `Sentence (7) states the voice typing objection, and sentences (8) and (9) grant its value at home but show why it fails at school. The writer does not give up the claim, since sentence (9) explains the limits of voice typing.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which revision of sentence (6) best keeps the formal style of the essay?`,
          choices: [
            no(`Slow typing really stinks on timed writing tests, because kids can't finish.`, 'informal-tone'),
            no(`Typing slowly is bad, and tests are bad too, especially when they are timed.`, 'vague-wording'),
            ok(`Slow typing is a real disadvantage on timed writing tests, where students sometimes run out of time before finishing their ideas.`),
            no(`Honestly, everybody hates timed writing tests, and slow typing makes them even worse.`, 'informal-tone'),
          ],
          solution: `The correct revision keeps the point about timed tests while replacing slang such as "a total pain" and "kids" with formal wording. The "everybody hates" version is still casual and shifts to a claim about feelings.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Which piece of evidence would best support the writer's point that keyboarding lessons help students show what they know?`,
          choices: [
            no(`Typing quickly is a skill that many office jobs list as a requirement.`, 'off-target-evidence'),
            no(`Some students say they would rather write their essays by hand.`, 'supports-opposing-view'),
            no(`The first typing machines were sold to offices more than a century ago.`, 'irrelevant-detail'),
            ok(`At Danforth High, ninth graders who finished a keyboarding unit wrote essays about thirty percent longer on the district writing test.`),
          ],
          solution: `The Danforth result connects typing lessons directly to students producing more on a school writing test, which is what sentence (13) claims. The office job fact is about future careers, not about showing knowledge in school.`,
        },
      ],
    },
    {
      code: 'wg9-argument-writing-p03',
      title: 'The Kessler Park Bandstand',
      body: `(1) In the center of Kessler Park stands a wooden bandstand built in 1912, where town bands once played concerts every Sunday in summer. (2) Today its paint is peeling, two of its steps are cracked, and the town has fenced it off. (3) The bandstand is old. (4) A report by the county historical society lists it as the last bandstand of its kind in the county. (5) Older residents remember dancing there, and photographs in the town library show crowds of hundreds gathered on the lawn around it.

(6) Some council members argue that the town should tear down the bandstand and build a modern stage. (7) They point out that repairing the old structure would cost about $38,000. (8) A new stage, however, would cost nearly twice as much, according to estimates in the same council report. (9) Tearing down the bandstand would also erase a piece of local history that could never be rebuilt.

(10) A restored bandstand could serve the whole community again. (11) The Kessler High jazz band, the community choir and the library's summer story hour have all said they would hold events there. (12) Shops near the park have reported that their sales rise on evenings when the park hosts events. (13) So that is my opinion about the bandstand.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which revision of sentence (3) best states a clear claim for the essay?`,
          choices: [
            no(`The bandstand is very, very old and has been standing for a long time.`, 'fact-not-claim'),
            ok(`The town council should restore the Kessler Park bandstand instead of replacing it.`),
            no(`Some people like the bandstand, and some people do not like it.`, 'no-position'),
            no(`Kessler Park has many trees, benches and paths that visitors enjoy.`, 'off-topic'),
          ],
          solution: `A claim takes a position that the rest of the essay supports, and the draft argues for restoring the bandstand. Repeating that the bandstand is old states a fact, not a position.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which transition, added to the beginning of sentence (12), best connects it to sentence (11)?`,
          choices: [
            no(`However,`, 'contrast-for-addition'),
            no(`For instance,`, 'example-for-addition'),
            ok(`Furthermore,`),
            no(`Instead,`, 'contrast-for-addition'),
          ],
          solution: `Sentence (12) adds a second benefit, help for local shops, to the groups named in sentence (11), so "Furthermore" fits. "However" would wrongly signal that sentence (12) disagrees with sentence (11).`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (13) as a conclusion that follows from the argument?`,
          choices: [
            no(`In the end, music is an important part of every community's life.`, 'too-general'),
            no(`The council should also repave the paths and add new lights in the park.`, 'introduces-new-topic'),
            no(`Repairs cost $38,000, which is a lot of money for any small town.`, 'repeats-opposing-point'),
            ok(`Because restoration costs less than replacement, saves a rare landmark and would bring residents back to the park, the council should repair the bandstand.`),
          ],
          solution: `The correct conclusion gathers the cost, history and community reasons from all three paragraphs and restates the claim. The sentence about the $38,000 cost repeats the opponents' point without answering it.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which sentence answers the council members' cost argument by using evidence?`,
          choices: [
            no(`sentence (6)`, 'confuses-counterclaim-with-rebuttal'),
            no(`sentence (7)`, 'confuses-counterclaim-with-rebuttal'),
            ok(`sentence (8)`),
            no(`sentence (9)`, 'reasoning-not-evidence'),
          ],
          solution: `Sentence (8) uses cost estimates from the council report to show that a new stage would cost more than repairs. Sentence (9) responds too, but with a reason about history rather than evidence about cost.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Which choice best explains why sentence (9) belongs in the second paragraph?`,
          choices: [
            ok(`It adds a second reason against replacement that does not depend on cost.`),
            no(`It provides the numbers that prove the bandstand is cheaper to repair.`, 'misreads-function'),
            no(`It admits that the council members are right about the bandstand.`, 'confuses-concession-with-reversal'),
            no(`It introduces the community groups discussed in the next paragraph.`, 'misidentifies-structure'),
          ],
          solution: `After sentence (8) answers the cost argument, sentence (9) adds a separate point: replacing the bandstand would destroy history that money cannot bring back. The cost numbers appear in sentences (7) and (8), not in sentence (9).`,
        },
      ],
    },
    {
      code: 'wg9-argument-writing-p04',
      title: 'A Climbing Wall for Brenford High',
      body: `(1) Brenford High School's physical education program offers mostly team sports such as basketball, volleyball and flag football. (2) Students who do not enjoy competitive games often sit on the bleachers and do as little as possible. (3) Brenford should build an indoor climbing wall in the old auxiliary gym. (4) Climbing builds strength, balance and problem-solving skills, and students can progress at their own pace instead of competing against a team. (5) At Ridley Falls High, which added a wall three years ago, the share of students who said they enjoyed gym class rose from 48 percent to 70 percent. (6) Climbing is also fun.

(7) Parents may worry that climbing is dangerous. (8) That worry is understandable when people picture climbers high on a rocky cliff. (9) A school wall, however, would be only twelve feet high, students would wear harnesses, and every climb would be supervised by a certified teacher. (10) Ridley Falls has reported no serious injuries on its wall since it opened.

(11) The wall would cost about $15,000 to build and install. (12) A state fitness grant pays up to $10,000 for new physical education equipment, and the athletic boosters have offered to raise the rest.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence in the first paragraph is the weakest support and should be removed or developed?`,
          choices: [
            no(`sentence (4)`, 'removes-supporting-detail'),
            no(`sentence (5)`, 'removes-key-evidence'),
            ok(`sentence (6)`),
            no(`sentence (2)`, 'removes-problem-statement'),
          ],
          solution: `Sentence (6) is a vague opinion with no explanation or evidence. Sentence (5) is the paragraph's strongest support because it reports a measured change at another school.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which transition, added to the beginning of sentence (5), best shows its relationship to the claim?`,
          choices: [
            no(`In contrast,`, 'contrast-for-example'),
            ok(`For example,`),
            no(`Nevertheless,`, 'contrast-for-example'),
            no(`Instead,`, 'contrast-for-example'),
          ],
          solution: `Sentence (5) gives a real case of a school that benefited from a climbing wall, so "For example" fits. "In contrast" would wrongly suggest that Ridley Falls disproves the claim.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `How does sentence (8) help the argument?`,
          choices: [
            no(`It proves that climbing walls are completely safe for every student.`, 'overstates-function'),
            no(`It changes the writer's position to agree that the wall is too risky.`, 'confuses-concession-with-reversal'),
            ok(`It treats the parents' concern with respect before the writer answers it.`),
            no(`It adds a new reason why students would enjoy climbing.`, 'misreads-function'),
          ],
          solution: `Sentence (8) grants that the worry makes sense, which makes the reply in sentences (9) and (10) more convincing to doubtful readers. It does not prove anything about safety; the facts in sentences (9) and (10) do that.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `The draft ends without a conclusion. Which sentence would best conclude the argument?`,
          choices: [
            ok(`A climbing wall would get more students moving, it would be carefully supervised, and it could be paid for without new school funds.`),
            no(`After the climbing wall is built, Brenford should also consider adding a swimming pool.`, 'introduces-new-topic'),
            no(`Once the wall is built, every single student at Brenford will love gym class.`, 'overgeneralization'),
            no(`The wall would cost about $15,000, which the school would have to find somewhere.`, 'repeats-detail-only'),
          ],
          solution: `The correct conclusion sums up the three parts of the argument: participation, safety and funding. The claim that every student will love gym goes beyond the evidence, since Ridley Falls reached 70 percent, not 100.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (10), would best strengthen the writer's response to the safety concern?`,
          choices: [
            no(`Professional climbers often scale indoor walls that are more than fifty feet tall.`, 'irrelevant-comparison'),
            no(`Students at Ridley Falls said they enjoyed climbing more than playing volleyball.`, 'misses-counterclaim'),
            no(`Climbing harnesses come in many sizes, colors and styles for different users.`, 'irrelevant-detail'),
            ok(`A state school safety survey found fewer injuries per hour on supervised climbing walls than on school basketball courts.`),
          ],
          solution: `The survey compares climbing to a sport the school already offers, which directly answers the claim that climbing is dangerous. The sentence about enjoying climbing supports the first paragraph but does nothing to address safety.`,
        },
      ],
    },
    {
      code: 'wg9-argument-writing-p05',
      title: 'Student Interpreters at Larchmont High',
      body: `(1) At Larchmont High School, families speak more than twenty languages at home, including Spanish, Vietnamese, Amharic and Tagalog. (2) Yet the school has only two paid interpreters for its family conference nights, and many parents wait an hour or leave without speaking to a teacher. (3) The school should train bilingual juniors and seniors to serve as volunteer interpreters on conference nights. (4) Last year, the front office recorded that 140 families signed in for conferences but left before meeting any teacher. (5) Many of those families had requested an interpreter on their sign-up forms.

(6) Some people believe that students should not interpret because conversations about grades can be private. (7) This concern is serious. (8) For example, student interpreters would help only families who choose to accept them, and they would never interpret for a classmate's family or repeat what they hear. (9) The paid interpreters would still handle any meeting that a family or teacher considers sensitive.

(10) The program would help the volunteers as well. (11) Volunteers would earn service hours and practice a skill that many careers value, from medicine to business. (12) A similar program at Westbury High trained thirty students in its first year, and the share of families who met with at least one teacher rose from 61 percent to 83 percent. (13) My friend speaks three languages. (14) A trained team of student interpreters would help more families take part in their children's education while giving students meaningful experience.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            no(`sentence (5)`, 'removes-supporting-detail'),
            no(`sentence (9)`, 'removes-safeguard'),
            ok(`sentence (13)`),
            no(`sentence (4)`, 'removes-key-evidence'),
          ],
          solution: `Sentence (13) mentions one friend's languages and shows nothing about whether the program would work. Sentence (4) must stay because it measures how many families the current system fails.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `The phrase "For example" at the start of sentence (8) does not fit. Which transition should replace it?`,
          choices: [
            ok(`To address this concern,`),
            no(`As a result of this,`, 'cause-effect-for-response'),
            no(`In contrast to this,`, 'contrast-misplaced'),
            no(`Similarly,`, 'similarity-for-response'),
          ],
          solution: `Sentence (8) describes rules that answer the privacy worry in sentence (6), so "To address this concern" names that relationship. "As a result of this" wrongly suggests the rules are caused by the concern being serious rather than designed as a response.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `What is the purpose of sentence (7)?`,
          choices: [
            no(`It shows that the writer has decided to drop the proposal.`, 'confuses-concession-with-reversal'),
            ok(`It grants that the opposing view raises a real issue before the writer responds.`),
            no(`It supplies evidence that student interpreters protect privacy.`, 'misreads-function'),
            no(`It states the main claim of the whole essay.`, 'misidentifies-claim'),
          ],
          solution: `Sentence (7) acknowledges the privacy worry as serious, which prepares readers for the safeguards in sentences (8) and (9). The writer keeps the proposal, so the sentence is not a reversal.`,
        },
        {
          slot: 24,
          difficulty: 'hard',
          stem: `Sentence (12) gives evidence that the program helps families, but it appears in a paragraph about benefits to the volunteers. Where would it best be placed?`,
          choices: [
            no(`after sentence (1)`, 'evidence-before-problem'),
            ok(`after sentence (5)`),
            no(`after sentence (7)`, 'breaks-counterclaim-response'),
            no(`after sentence (9)`, 'misplaced-evidence'),
          ],
          solution: `Sentences (4) and (5) describe families leaving without help, so the Westbury result fits right after them as proof that the solution works. Placing it after sentence (7) would interrupt the response to the privacy concern.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (11), would best support the claim that the program benefits the volunteers?`,
          choices: [
            no(`Many hospitals and businesses hire people who can speak more than one language.`, 'repeats-without-evidence'),
            no(`Conference nights at Larchmont usually last from five until eight in the evening.`, 'irrelevant-detail'),
            ok(`In a survey of Westbury's volunteers, 85 percent said interpreting made them more confident speaking to adults.`),
            no(`Some parents would rather bring their own family members to interpret for them.`, 'supports-opposing-view'),
          ],
          solution: `The survey gives evidence about what volunteers actually gained, which supports sentence (10). The sentence about hospitals and businesses only restates the career point in sentence (11) without showing any benefit to student volunteers.`,
        },
      ],
    },
    {
      code: 'wg9-argument-writing-p06',
      title: 'The Orchard at Ventry Farm Museum',
      body: `(1) The Ventry Farm Museum shows visitors how families in the valley farmed a century ago. (2) Behind its barn stands an orchard of forty apple trees planted in the 1890s, including six varieties that are no longer sold by any nursery. (3) The museum board has proposed clearing the orchard to build a larger parking lot. (4) The board should keep the orchard and care for it as a living part of the museum's collection. (5) Old apple varieties carry traits that modern growers value, such as resistance to certain diseases and the ability to survive late frosts. (6) Researchers at Hadley Agricultural College have already asked to take cuttings from three of the Ventry trees for their seed bank. (7) Apples come in many colors, including red, yellow and green.

(8) The board says the current lot fills up on festival weekends, and visitors sometimes park along the narrow road. (9) That problem is real, but it happens on only about six weekends a year. (10) On those days, the museum could use the empty field across the road, which a neighbor has offered for overflow parking.

(11) The orchard could also become one of the museum's main attractions. (12) Each fall, school groups could pick apples, press cider and compare the old varieties to the ones sold in stores today. (13) Clearly, the board must protect the orchard, because history matters.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it distracts from the argument?`,
          choices: [
            no(`sentence (2)`, 'removes-key-evidence'),
            no(`sentence (6)`, 'removes-key-evidence'),
            no(`sentence (9)`, 'removes-concession'),
            ok(`sentence (7)`),
          ],
          solution: `Sentence (7) lists apple colors, which says nothing about why the orchard should be saved. Sentence (6) is strong evidence that the trees have scientific value, so it should stay.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Sentence (13) gives a vague reason. Which revision would make the conclusion follow most clearly from the argument?`,
          choices: [
            no(`Clearly, the board must protect the orchard, because old things are always worth keeping.`, 'overgeneralization'),
            ok(`Because the orchard holds rare trees that scientists want, the parking problem has a simple fix, and the trees could draw new visitors, the board should keep it.`),
            no(`Clearly, the board must protect the orchard, and anyone who disagrees does not understand history.`, 'dismissive-tone'),
            no(`The museum should also restore the old barn and add a gift shop that sells cider.`, 'introduces-new-topic'),
          ],
          solution: `The correct revision replaces "history matters" with the essay's three actual reasons from paragraphs one, two and three. Saying old things are always worth keeping is a broad rule the essay never argues.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `How does sentence (9) respond to the board's concern in sentence (8)?`,
          choices: [
            no(`It claims the board is wrong and that the lot never fills up.`, 'misreads-concession'),
            no(`It agrees that the orchard should be cleared for parking.`, 'confuses-concession-with-reversal'),
            ok(`It accepts that the problem exists but shows it is limited to a few days.`),
            no(`It offers evidence that visitors enjoy parking along the road.`, 'unsupported-inference'),
          ],
          solution: `Sentence (9) says the problem is real, then narrows it to about six weekends a year, which makes clearing the orchard seem out of proportion. The writer never says the lot does not fill up.`,
        },
        {
          slot: 29,
          difficulty: 'hard',
          stem: `Which sentence, added after sentence (12), would provide the most relevant evidence for sentence (11)?`,
          choices: [
            ok(`When the nearby Coleby Historical Farm began a fall apple day, its October attendance more than doubled.`),
            no(`Apple picking is a popular activity for many families in the autumn.`, 'unsupported-generalization'),
            no(`People have pressed apples into cider for hundreds of years.`, 'irrelevant-detail'),
            no(`A larger parking lot would also make it easier for more visitors to come.`, 'supports-opposing-view'),
          ],
          solution: `The Coleby result shows that a similar museum drew more visitors with an apple event, which supports the claim that the orchard could be an attraction. The general statement about apple picking is believable but offers no evidence about a museum like Ventry.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `A reader says paragraph two treats the board's concern too briefly. Which sentence, added after sentence (10), would best address this while keeping the writer's claim?`,
          choices: [
            no(`The board members have probably never even walked through the orchard.`, 'attacks-opponent'),
            no(`The museum could build the new lot on just half of the orchard instead.`, 'undercuts-claim'),
            ok(`Visitors do deserve safe parking, so volunteers could mark the field and guide cars there on festival weekends.`),
            no(`Parking is a common problem at museums in many parts of the country.`, 'too-general'),
          ],
          solution: `The correct sentence takes the board's safety goal seriously and shows how the overflow field would meet it, so the orchard can stay. Building on half the orchard would give up part of the writer's own claim.`,
        },
      ],
    },
    {
      code: 'wg9-argument-writing-p07',
      title: 'City Bus Passes for Gilmore Students',
      body: `(1) Students at Gilmore High School who live more than two miles away ride yellow school buses, but those buses leave at 3:10 every afternoon. (2) Students who stay for clubs, tutoring or sports practice must find their own way home. (3) The district should give every Gilmore student a free pass for the city bus system. (4) The city bus stops in front of the school every fifteen minutes until nine at night. (5) In a survey by the Gilmore student council, 210 students said they had skipped an after-school activity at least once because they had no ride home. (6) In Oak Mesa, a city in another state, schools began offering free passes to high school students, and attendance at after-school tutoring rose by a third in one year.

(7) Some people say passes are bad. (8) The program would cost the district about $45,000 a year. (9) That amount is less than the district spends running two afternoon activity buses, which carry only a dozen riders on most days. (10) Replacing those two buses with passes would save money while giving every student more choices.

(11) Free passes would also teach students to travel on their own before they graduate. (12) Many students will soon ride buses to jobs, college classes and internships, and learning the routes now will make that easier. (13) The bus seats are kind of uncomfortable, but it's no big deal. (14) In the end, free bus passes would let more students stay after school, cost less than the current system and prepare students for life after high school.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it is informal and does not support the claim?`,
          choices: [
            no(`sentence (2)`, 'removes-problem-statement'),
            no(`sentence (10)`, 'removes-reasoning'),
            no(`sentence (12)`, 'removes-supporting-detail'),
            ok(`sentence (13)`),
          ],
          solution: `Sentence (13) uses casual language and comments on seat comfort, which has nothing to do with the claim. Sentence (10) should stay because it explains what the cost comparison means.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which transition, added to the beginning of sentence (9), best shows how it relates to sentence (8)?`,
          choices: [
            no(`Similarly,`, 'similarity-for-contrast'),
            ok(`However,`),
            no(`For example,`, 'example-for-contrast'),
            no(`As a result,`, 'cause-effect-for-contrast'),
          ],
          solution: `Sentence (8) gives a cost that sounds large, and sentence (9) pushes back by comparing it to a bigger existing cost, so "However" fits. "As a result" is wrong because the bus spending is not caused by the price of passes.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which revision of sentence (7) states the opposing claim most clearly and fairly?`,
          choices: [
            ok(`Some school board members argue that free passes would cost more than the district can afford.`),
            no(`Some people think city buses are bad and that nobody should ride them.`, 'vague-counterclaim'),
            no(`Everyone knows that free passes would cost far too much money.`, 'overgeneralization'),
            no(`Some people argue that students should simply walk home instead.`, 'mismatched-counterclaim'),
          ],
          solution: `The writer's response in sentences (8) through (10) is about cost, so the opposing claim must be about affordability. The suggestion that students walk home is a different objection that the paragraph never answers.`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `What does sentence (10) add to the second paragraph?`,
          choices: [
            no(`It introduces a new opposing claim about bus safety.`, 'misreads-function'),
            no(`It provides survey data from Gilmore students.`, 'misreads-function'),
            no(`It admits that the program would cost too much.`, 'confuses-concession-with-reversal'),
            ok(`It draws a conclusion from the cost comparison in sentences (8) and (9).`),
          ],
          solution: `Sentence (10) explains what the numbers mean: swapping the nearly empty buses for passes would save money. The survey data appears in sentence (5), not in the second paragraph.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which added information would make the Oak Mesa evidence in sentence (6) more convincing for this argument?`,
          choices: [
            no(`how many years Oak Mesa's city bus system has been running`, 'irrelevant-detail'),
            ok(`how similar Oak Mesa's schools and bus routes are to Gilmore's`),
            no(`what a few Oak Mesa students posted online about their passes`, 'anecdotal-evidence'),
            no(`the total population of the state where Oak Mesa is located`, 'irrelevant-detail'),
          ],
          solution: `Evidence from another city is stronger when readers can see that the situation matches Gilmore's, so similar schools and routes would make the comparison fair. A few online posts are anecdotes and would not show that Oak Mesa's results apply to Gilmore.`,
        },
      ],
    },
    {
      code: 'wg9-argument-writing-p08',
      title: 'A Student Radio Station at Quinlan High',
      body: `(1) Every morning, Quinlan High School's announcements are read over a crackling speaker by whichever office worker has time. (2) Most students tune them out. (3) Quinlan should launch a student-run internet radio station that delivers the morning announcements and broadcasts student programs during lunch. (4) A station would give students real practice in writing, speaking and audio editing. (5) At Ferris Valley High, students in the radio club wrote and produced more than 300 short segments last year, from sports recaps to interviews with local artists. (6) Students would also learn teamwork, since every broadcast requires writers, hosts and technicians to work together on a tight schedule.

(7) Some teachers worry that the station would distract students from their classwork. (8) Programs would air only before first period and during lunch, so no class time would be lost. (9) Student staff members would also need to keep at least a C average to stay on the team.

(10) Starting the station would not be expensive. (11) The school already owns microphones and laptops from a video course that ended last year, and free software can stream audio to the school website. (12) Radio was invented more than a hundred years ago. (13) So yeah, radio is awesome and we should totally do it.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence should the writer delete because it does not support the argument?`,
          choices: [
            ok(`sentence (12)`),
            no(`sentence (11)`, 'removes-supporting-detail'),
            no(`sentence (9)`, 'removes-safeguard'),
            no(`sentence (5)`, 'removes-key-evidence'),
          ],
          solution: `Sentence (12) is a history fact about radio that does not show why Quinlan needs a station or how it could afford one. Sentence (11) should stay because it supports the claim that the station would be inexpensive.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which transition, added to the beginning of sentence (8), best connects it to sentence (7)?`,
          choices: [
            no(`For instance,`, 'example-for-contrast'),
            no(`Likewise,`, 'similarity-for-contrast'),
            ok(`However,`),
            no(`Consequently,`, 'cause-effect-for-contrast'),
          ],
          solution: `Sentence (8) answers the teachers' worry by showing the schedule avoids class time, so a contrast word like "However" fits. "Consequently" would wrongly suggest that the broadcast schedule results from the teachers' worry.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence (13) as a formal conclusion?`,
          choices: [
            no(`In conclusion, radio has a long history and is still enjoyed by many listeners.`, 'too-general'),
            no(`A radio station is the only way Quinlan students will ever learn to speak in public.`, 'overgeneralization'),
            no(`Quinlan should also start a school podcast and a weekly video show.`, 'introduces-new-topic'),
            ok(`Because a student station would build real skills without using class time or much money, Quinlan should launch one this year.`),
          ],
          solution: `The correct conclusion restates the claim in formal language and ties together the skills, schedule and cost points. The sentence about radio's history repeats the off-topic idea of sentence (12) instead of the writer's position.`,
        },
        {
          slot: 39,
          difficulty: 'medium',
          stem: `Which detail, added after sentence (2), would best support the writer's statement that most students tune out the announcements?`,
          choices: [
            ok(`In a hallway poll of 150 students, fewer than one in five could name a single item from that morning's announcements.`),
            no(`Many schools around the country read their announcements over speakers.`, 'irrelevant-detail'),
            no(`The office workers who read the announcements are very busy people.`, 'off-target-evidence'),
            no(`Some students say the announcements are sometimes useful and important.`, 'supports-opposing-view'),
          ],
          solution: `The poll measures how little students remember, which is direct evidence that they tune out. The detail about busy office workers explains why announcements sound rushed but does not show how students respond.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `How does sentence (9) strengthen the writer's response to the teachers in sentence (7)?`,
          choices: [
            no(`It proves that working at a radio station raises students' grades.`, 'overstates-evidence'),
            ok(`It adds a rule that protects students' grades, not just a schedule that avoids class time.`),
            no(`It admits that the teachers are right and the station should wait.`, 'confuses-concession-with-reversal'),
            no(`It gives evidence from Ferris Valley that radio clubs help students.`, 'misreads-source'),
          ],
          solution: `Sentence (8) handles class time, and sentence (9) adds a grade requirement so students cannot let their classwork slip. It sets a rule but does not prove that radio work raises grades.`,
        },
      ],
    },
  ],
}

export default skill
