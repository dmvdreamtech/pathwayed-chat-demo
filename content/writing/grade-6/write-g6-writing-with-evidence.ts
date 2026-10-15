import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g6-writing-with-evidence',
  subject: 'writing',
  grade: 6,
  group: 'Composition',
  name: 'Writing About Texts with Evidence',
  standards: ['W.6.9'],
  passages: [
    {
      code: 'wg6-writing-with-evidence-p01',
      title: 'Draft: The Long Trip of the Monarchs',
      body: `(1) In the article "A Long Trip on Thin Wings," Ayesha Rahman explains how monarch butterflies travel thousands of miles each fall. (2) ____. (3) Rahman writes that monarchs fly south to the same mountain forests every year, even though no single butterfly has made the trip before. (4) She explains that the butterflies use the position of the sun to keep flying in the right direction. (5) This detail shows that monarchs are born with a kind of built-in compass.

(6) Monarchs also need help from the land along the way. (7) Rahman reports that the butterflies stop to drink nectar from fall flowers so they have enough energy to keep going. (8) My grandmother has a painting of a purple butterfly in her kitchen. (9) Rahman notes that in areas where fields of wildflowers were replaced by parking lots, fewer monarchs were counted. (10) ____, the trip depends on flowers being there when the butterflies need them.

(11) Monarchs are pretty.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (2) as the claim of the draft?`,
          choices: [
            ok(`Rahman shows that the monarchs' trip depends on their natural sense of direction and on finding flowers along the way.`),
            no(`Monarch butterflies are orange and black insects that live in many parts of North America.`, 'topic-not-claim'),
            no(`Rahman thinks that towns should stop building parking lots anywhere near open fields.`, 'unsupported-inference'),
            no(`Butterflies are my favorite insects to watch when I play outside in the summer.`, 'opinion-not-analysis'),
          ],
          solution: `Paragraph 1 is about the monarchs' sense of direction and paragraph 2 is about flowers along the route, so a claim naming both fits the draft. The draft never says Rahman wants towns to stop building parking lots, so that choice goes beyond the text.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not support the analysis of Rahman's article?`,
          choices: [
            ok(`Sentence 8`),
            no(`Sentence 3`, 'removes-key-evidence'),
            no(`Sentence 7`, 'removes-key-evidence'),
            no(`Sentence 9`, 'removes-key-evidence'),
          ],
          solution: `Sentence 8 is about a painting in the writer's family kitchen and says nothing about Rahman's article. Sentence 9 is evidence from the article that links lost flowers to fewer monarchs, so it should stay.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which words best fill blank (10)?`,
          choices: [
            ok(`In other words`),
            no(`For example`, 'wrong-transition-example'),
            no(`On the other hand`, 'wrong-transition-contrast'),
            no(`First of all`, 'wrong-transition-sequence'),
          ],
          solution: `Sentence 10 restates what the evidence in sentences 7 and 9 means, so "In other words" fits. "For example" is wrong because sentence 10 is an explanation of the evidence, not a new example.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Rahman's evidence shows that monarchs finish their trip only when their sense of direction is matched by flowers on the route.`),
            no(`Monarchs are pretty, and many people enjoy seeing them in their gardens every fall.`, 'opinion-not-analysis'),
            no(`Rahman writes that monarchs use the position of the sun to steer in the right direction.`, 'evidence-without-analysis'),
            no(`Some other butterflies, such as painted ladies, also travel long distances each year.`, 'off-topic-fact'),
          ],
          solution: `A strong conclusion sums up the analysis from both paragraphs, and only the first choice joins direction and flowers. Restating the detail about the sun repeats one piece of evidence without pulling the draft together.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Why is sentence 5 important to paragraph 1?`,
          choices: [
            ok(`It explains what the evidence in sentences 3 and 4 means, so readers see how it supports the claim.`),
            no(`It adds a new fact from the article that the writer has not mentioned anywhere else.`, 'confuses-analysis-evidence'),
            no(`It shares a personal experience that makes the paragraph more interesting to read.`, 'misreads-sentence-purpose'),
            no(`It names the title and author of the article that the whole draft is about.`, 'misreads-sentence-purpose'),
          ],
          solution: `Sentence 5 tells readers that returning to the same forests without a guide means monarchs have a built-in compass, which is analysis of sentences 3 and 4. It is tempting to call it a new fact, but the facts come from sentences 3 and 4 and sentence 5 explains them.`,
        },
      ],
    },
    {
      code: 'wg6-writing-with-evidence-p02',
      title: 'Draft: Paper Made by Hand',
      body: `(1) Mateo Okafor's article "From Bark to Page" describes how paper was made by hand long before there were paper factories. (2) Okafor shows that making paper by hand was slow, careful work that turned simple plants into something valuable. (3) He explains that workers soaked tree bark and old cloth in water for many days until the fibers became soft. (4) ____. (5) Okafor writes that "a single worker might make only a few hundred sheets in a full day." (6) This shows that every sheet took time and skill.

(7) Because paper took so long to make, people treated it with care. (8) Okafor reports that families often reused the backs of letters and saved scraps to patch old books. (9) Today I use way too much paper in my notebooks. (10) He also notes that some towns hired guards to protect their paper storehouses. (11) These details show ____.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (4) to continue the evidence about how paper was made?`,
          choices: [
            ok(`Next, the workers pounded the soft fibers into pulp and spread thin layers of it on screens to dry.`),
            no(`Paper is also made from old newspapers in many cities and towns today.`, 'off-topic-fact'),
            no(`Okafor thinks that handmade paper is much prettier than paper from a store.`, 'unsupported-inference'),
            no(`Bark is the tough outer layer of a tree that protects the wood inside.`, 'irrelevant-evidence'),
          ],
          solution: `Sentence 3 describes the first step, soaking, so the next step of making pulp and drying it continues the evidence about slow, careful work. The sentence about bark is true, but it does not come from Okafor's description of papermaking.`,
        },
        {
          slot: 7,
          difficulty: 'medium',
          stem: `Which sentence should be removed, and why?`,
          choices: [
            ok(`Sentence 9, because it describes the writer's own habits instead of Okafor's article.`),
            no(`Sentence 5, because a quotation should never be used in a response to an article.`, 'misunderstands-quotation'),
            no(`Sentence 10, because guards have nothing to do with how paper was treated.`, 'misjudges-relevance'),
            no(`Sentence 2, because the main point of a draft should not appear so early.`, 'misplaced-claim'),
          ],
          solution: `Sentence 9 is about the writer's notebooks today, so it does not support the analysis of the article. Sentence 10 should stay, because guarding paper storehouses shows how valuable paper was.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which words best complete sentence 11?`,
          choices: [
            ok(`that paper was so valuable that people saved it, reused it, and even guarded it.`),
            no(`that paper was made from soaked tree bark and pieces of old cloth.`, 'misplaced-evidence'),
            no(`that Okafor wrote a long and detailed article about paper.`, 'vague-analysis'),
            no(`that students today should try to use less paper at school.`, 'unsupported-inference'),
          ],
          solution: `Sentence 11 should explain what sentences 8 and 10 show, and the reusing and guarding both point to how valuable paper was. The detail about bark and cloth is accurate, but it belongs to paragraph 1, not to the point about treating paper with care.`,
        },
        {
          slot: 9,
          difficulty: 'hard',
          stem: `The writer wants to add one more piece of evidence to support sentence 7. Which detail from the article would work best?`,
          choices: [
            ok(`Okafor explains that students in some schools practiced writing on slates so they would not waste paper.`),
            no(`Okafor describes the large wooden screens that workers used to dry each wet sheet.`, 'supports-different-point'),
            no(`Okafor mentions that some paper was dyed red or blue with juice from plants.`, 'irrelevant-evidence'),
            no(`Okafor says that modern factories can make millions of sheets in one hour.`, 'supports-different-point'),
          ],
          solution: `Sentence 7 says people treated paper with care, and practicing on slates to save paper is another example of that care. The drying screens are part of how paper was made, which supports paragraph 1, not sentence 7.`,
        },
        {
          slot: 10,
          difficulty: 'easy',
          stem: `Which sentence states the writer's main claim about Okafor's article?`,
          choices: [
            ok(`Sentence 2`),
            no(`Sentence 1`, 'topic-not-claim'),
            no(`Sentence 3`, 'evidence-not-claim'),
            no(`Sentence 6`, 'explanation-not-claim'),
          ],
          solution: `Sentence 2 makes a point about the article that the rest of the draft supports: handmade paper was slow work that made something valuable. Sentence 1 only introduces the article and its topic without making a point about it.`,
        },
      ],
    },
    {
      code: 'wg6-writing-with-evidence-p03',
      title: 'Draft: Small Fields, Big Skills',
      body: `(1) In "Small Fields, Big Skills," Grace Mbeki explains why many youth soccer leagues now play on smaller fields with fewer players. (2) ____. (3) Mbeki writes that on a small field with four players on each team, every player touches the ball far more often. (4) She describes one league where players touched the ball "about three times as often" after the switch. (5) More touches mean more chances to practice dribbling, passing, and shooting.

(6) Small games also help players think quickly. (7) Mbeki explains that with less space, players must decide what to do with the ball in just a second or two. (8) ____, they learn to look up and notice their teammates before the ball arrives. (9) Soccer is played in almost every country in the world. (10) Mbeki adds that coaches saw young players making smarter passes by the end of the season.

(11) In conclusion, soccer is fun.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (2) as the claim of the draft?`,
          choices: [
            ok(`Mbeki argues that smaller games help young players build skills faster because they practice more and think quickly.`),
            no(`Soccer leagues for young players can be found in many towns and cities.`, 'topic-not-claim'),
            no(`Mbeki says that one league counted how often its players touched the ball.`, 'too-narrow'),
            no(`Mbeki believes that full-size soccer fields should no longer be used by anyone.`, 'unsupported-inference'),
          ],
          solution: `The draft gives evidence about more touches in paragraph 1 and quicker thinking in paragraph 2, so the claim must cover both. The league that counted touches is only one piece of evidence, so it is too narrow to be the claim.`,
        },
        {
          slot: 12,
          difficulty: 'medium',
          stem: `Which words best fill blank (8)?`,
          choices: [
            ok(`Because of this`),
            no(`Even so`, 'wrong-transition-contrast'),
            no(`Before that`, 'wrong-transition-sequence'),
            no(`Similarly`, 'wrong-transition-comparison'),
          ],
          solution: `Having only a second or two to decide is the reason players learn to look up early, so "Because of this" shows cause and effect. "Even so" signals a contrast, but sentence 8 follows from sentence 7 rather than going against it.`,
        },
        {
          slot: 13,
          difficulty: 'easy',
          stem: `Which sentence does not support the writer's analysis and should be removed?`,
          choices: [
            ok(`Sentence 9`),
            no(`Sentence 4`, 'removes-key-evidence'),
            no(`Sentence 7`, 'removes-key-evidence'),
            no(`Sentence 10`, 'removes-key-evidence'),
          ],
          solution: `Sentence 9 is a general fact about soccer around the world and does not help explain Mbeki's point about small fields. Sentence 10 shows the result of quick thinking, so removing it would weaken paragraph 2.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Mbeki's evidence shows that small fields give young players more touches and faster choices, which helps them grow.`),
            no(`In conclusion, soccer is fun, and every kid should try playing it at least once.`, 'opinion-not-analysis'),
            no(`In conclusion, Mbeki describes a league where players touched the ball three times as often.`, 'evidence-without-analysis'),
            no(`In conclusion, small fields cost towns less money to build and to keep mowed.`, 'unsupported-inference'),
          ],
          solution: `The best conclusion pulls together both reasons from the draft, more touches and faster choices. Repeating the league's numbers only restates one piece of evidence and does not wrap up the analysis.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence 10 that explains how it supports paragraph 2. Which sentence works best?`,
          choices: [
            ok(`This shows that the quick choices players practiced on small fields turned into better decisions during games.`),
            no(`This shows that coaches enjoy watching their young players at the end of a season.`, 'misreads-evidence'),
            no(`This shows that players touch the ball more often when they play on smaller fields.`, 'supports-different-point'),
            no(`This shows that every young player who uses a small field will become a star.`, 'overgeneralization'),
          ],
          solution: `Paragraph 2 is about thinking quickly, and smarter passes are evidence that quick decision practice paid off. The idea about more touches is true in the draft, but it explains paragraph 1, not sentence 10.`,
        },
      ],
    },
    {
      code: 'wg6-writing-with-evidence-p04',
      title: 'Draft: Messages from the Sky',
      body: `(1) Daniel Kowalczyk's article "Messages from the Sky" describes how large balloons filled with gas are sent into the sky each day to help forecasters understand the weather. (2) Kowalczyk shows that weather balloons give forecasters information they could not easily get any other way. (3) He explains that each balloon carries a small box of sensors that measures temperature, wind, and moisture as it rises. (4) According to Kowalczyk, the balloons climb much higher than most airplanes fly. (5) ____.

(6) The information is also shared quickly. (7) Kowalczyk writes that the box sends its readings back to the ground by radio every second or two. (8) Forecasters then feed these numbers into computers that use them to predict the weather for the next several days. (9) My uncle once found a fallen sensor box in his field. (10) Because the readings arrive so fast, forecasters can warn people about storms sooner.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (5) to explain the evidence in sentences 3 and 4?`,
          choices: [
            ok(`This means the balloons can measure high air that tools on the ground cannot reach.`),
            no(`Airplanes are one of the fastest ways to travel to other countries.`, 'off-topic-fact'),
            no(`Kowalczyk also writes a few sentences about the color of the balloons.`, 'irrelevant-evidence'),
            no(`This means that balloons are better than every other weather tool ever made.`, 'overgeneralization'),
          ],
          solution: `Sentences 3 and 4 say the sensors measure the air as the balloon climbs very high, so they gather information from places ground tools cannot reach. Saying balloons beat every other tool goes far beyond what the evidence shows.`,
        },
        {
          slot: 17,
          difficulty: 'medium',
          stem: `Why should the writer remove sentence 9?`,
          choices: [
            ok(`It tells a personal story that does not explain Kowalczyk's ideas about how balloons help forecasters.`),
            no(`It repeats the claim from sentence 2 almost word for word, so it is not needed.`, 'misreads-sentence'),
            no(`It is a quotation from the article, and quotations do not belong in a response.`, 'misunderstands-quotation'),
            no(`It gives the strongest evidence in the draft, so it should move to paragraph 1.`, 'misjudges-relevance'),
          ],
          solution: `Sentence 9 is about the writer's uncle, not about how Kowalczyk shows balloons help forecasters. It does not repeat sentence 2 and is not a quotation, so those reasons do not fit.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `Which sentence would best conclude the draft if added after sentence 10?`,
          choices: [
            ok(`Kowalczyk's details show that balloons help forecasters by reaching high air and sending readings fast enough for early warnings.`),
            no(`Weather balloons are usually made of a thin, stretchy material that grows as the balloon climbs.`, 'off-topic-fact'),
            no(`Kowalczyk writes that the sensor box sends its readings by radio every second or two.`, 'evidence-without-analysis'),
            no(`Everyone should learn how to read weather maps so they can make their own forecasts.`, 'unsupported-inference'),
          ],
          solution: `The first choice connects both paragraphs, reaching high air and sending readings fast, back to the claim in sentence 2. The choice about the radio readings only repeats sentence 7 without explaining the whole draft.`,
        },
        {
          slot: 19,
          difficulty: 'hard',
          stem: `Which detail from the article would best support the claim in sentence 2 if added to paragraph 1?`,
          choices: [
            ok(`Kowalczyk notes that satellites can see clouds from above but cannot directly measure the temperature inside them.`),
            no(`Kowalczyk notes that the balloons are released twice a day at the same times all over the country.`, 'irrelevant-evidence'),
            no(`Kowalczyk notes that the readings travel to the ground by radio every second or two.`, 'misplaced-evidence'),
            no(`Kowalczyk notes that people sometimes mistake a rising weather balloon for a lost kite.`, 'irrelevant-evidence'),
          ],
          solution: `Sentence 2 says balloons give information that is hard to get any other way, and the satellite detail shows another tool that cannot collect it. The radio detail is about speed, which already appears in paragraph 2, so it does not prove the information is hard to get.`,
        },
        {
          slot: 20,
          difficulty: 'easy',
          stem: `Which sentence is the topic sentence of paragraph 2?`,
          choices: [
            ok(`Sentence 6`),
            no(`Sentence 7`, 'evidence-not-claim'),
            no(`Sentence 8`, 'detail-not-main-point'),
            no(`Sentence 10`, 'explanation-not-claim'),
          ],
          solution: `Sentence 6 introduces the paragraph's point that the information is shared quickly, and the rest of the paragraph supports it. Sentence 10 explains why fast readings matter, but it comes at the end as analysis rather than introducing the paragraph.`,
        },
      ],
    },
    {
      code: 'wg6-writing-with-evidence-p05',
      title: 'Draft: Students Plan the Lunch Menu',
      body: `(1) In "What's for Lunch? Ask the Students," Rosa Delgado describes a middle school that let students help plan the cafeteria menu. (2) ____. (3) Delgado reports that before the change, the school threw away about forty pounds of food every day. (4) After students tasted new recipes and voted on them, the amount dropped to about fifteen pounds. (5) This drop shows that students ate more of the food once they had helped choose it.

(6) Delgado also shows that the plan taught students new skills. (7) Student planners had to keep each meal within a set budget and include a fruit or vegetable. (8) One student told Delgado that planning a week of lunches was "harder than any math worksheet." (9) Pizza is served on Fridays at my school. (10) These details show that the students learned to balance cost, health, and taste.

(11) ____.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (2) as the claim of the draft?`,
          choices: [
            ok(`Delgado shows that letting students help plan lunches cut food waste and taught them useful skills.`),
            no(`School cafeterias serve lunch to hundreds of hungry students every single day.`, 'topic-not-claim'),
            no(`Delgado says that the school used to throw away forty pounds of food a day.`, 'too-narrow'),
            no(`Delgado believes that cafeteria workers do not know how to cook good meals.`, 'unsupported-inference'),
          ],
          solution: `Paragraph 1 is about less food waste and paragraph 2 is about new skills, so the claim should name both. The forty pounds detail is a single piece of evidence, so it is too narrow to be the claim.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `How does sentence 5 help the draft?`,
          choices: [
            ok(`It explains what the numbers in sentences 3 and 4 mean for the writer's point about waste.`),
            no(`It introduces the title of the article and the name of its author.`, 'misreads-sentence-purpose'),
            no(`It gives a new number from the article that was not mentioned before.`, 'confuses-analysis-evidence'),
            no(`It shows that the writer disagrees with what Delgado reports.`, 'misreads-tone'),
          ],
          solution: `Sentence 5 tells readers that the drop from forty to fifteen pounds means students ate more, which connects the numbers to the claim. It does not add a new number; the numbers come from sentences 3 and 4.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which change would most improve paragraph 2?`,
          choices: [
            ok(`Remove sentence 9, because it is about the writer's school, not Delgado's article.`),
            no(`Remove sentence 8, because words from a student cannot count as evidence.`, 'misunderstands-quotation'),
            no(`Remove sentence 7, because rules about budgets are off the topic of lunch.`, 'misjudges-relevance'),
            no(`Remove sentence 10, because a paragraph should end with a piece of evidence.`, 'removes-analysis'),
          ],
          solution: `Sentence 9 describes the writer's own school and does not support the point about skills Delgado describes. Sentence 8 is a useful quotation from the article that shows how challenging the planning was, so it should stay.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `Which sentence best fills blank (11) as the conclusion of the draft?`,
          choices: [
            ok(`Delgado's article shows that when students share in planning lunch, they waste less and learn to make careful choices.`),
            no(`Pizza should be served every day because it is the lunch that most students like best.`, 'unsupported-inference'),
            no(`Delgado reports that the waste dropped from forty pounds to about fifteen pounds.`, 'evidence-without-analysis'),
            no(`Many schools around the world serve very different kinds of lunches to students.`, 'off-topic-fact'),
          ],
          solution: `The conclusion should bring together both points, less waste and new skills, and only the first choice does that. Restating the drop in pounds repeats evidence from paragraph 1 instead of closing the whole analysis.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `A classmate says sentence 4 does not prove students ate more, because the school might have simply cooked less food. Which detail from the article would best answer this concern?`,
          choices: [
            ok(`Delgado notes that the school cooked the same number of meals before and after the change.`),
            no(`Delgado notes that the new recipes included a bean soup and a rice bowl.`, 'irrelevant-evidence'),
            no(`Delgado notes that students voted on the recipes during their lunch period.`, 'does-not-address-concern'),
            no(`Delgado notes that each meal still had to cost less than three dollars.`, 'supports-different-point'),
          ],
          solution: `If the same number of meals was cooked and less was thrown away, then students really did eat more, which answers the classmate. Knowing when students voted does not show whether the amount of food cooked changed.`,
        },
      ],
    },
    {
      code: 'wg6-writing-with-evidence-p06',
      title: 'Draft: The Changing Colors of the Octopus',
      body: `(1) Kenji Watanabe's article "The Octopus Disappears" explains how and why octopuses can change the color and pattern of their skin so quickly. (2) Watanabe shows that an octopus changes color mainly to hide and to send messages. (3) He explains that the octopus's skin holds thousands of tiny sacs of color that it can open or squeeze shut in less than a second. (4) ____. (5) This detail shows that hiding is one of the main reasons for the color change.

(6) Color change also helps octopuses communicate. (7) Watanabe writes that an octopus may suddenly flash dark stripes across its body when another octopus comes too close to its den. (8) Octopuses have eight arms. (9) He adds that the other octopus usually turns and swims away soon after seeing the dark stripes appear. (10) ____, the stripes seem to work like a warning sign.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (4) with evidence that supports sentence 5?`,
          choices: [
            ok(`Watanabe describes an octopus resting on sand that turned pale and speckled to match the ground.`),
            no(`Watanabe describes the strong suction cups an octopus uses to grip slippery rocks.`, 'irrelevant-evidence'),
            no(`Watanabe describes an octopus flashing dark stripes at another octopus nearby.`, 'misplaced-evidence'),
            no(`Many people think that octopuses are the smartest animals in the whole sea.`, 'opinion-not-evidence'),
          ],
          solution: `Sentence 5 says the detail shows hiding, and an octopus matching the sand is an example of hiding. The stripes example is from the article, but it shows communication, which is the point of paragraph 2.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which words best fill blank (10)?`,
          choices: [
            ok(`Based on this evidence`),
            no(`For example`, 'wrong-transition-example'),
            no(`Meanwhile`, 'wrong-transition-time'),
            no(`Unlike this`, 'wrong-transition-contrast'),
          ],
          solution: `Sentence 10 draws a conclusion from sentences 7 and 9, so "Based on this evidence" fits. "For example" would signal a new example, but sentence 10 explains the evidence instead.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which sentence should be removed, and why?`,
          choices: [
            ok(`Sentence 8, because the number of arms has nothing to do with changing color.`),
            no(`Sentence 7, because it describes an event instead of stating an idea.`, 'removes-key-evidence'),
            no(`Sentence 3, because it explains how skin works, which is too scientific.`, 'misjudges-relevance'),
            no(`Sentence 2, because a claim should only appear at the end of a draft.`, 'misplaced-claim'),
          ],
          solution: `Sentence 8 is a fact about octopuses that does not support the analysis of color change. Sentence 7 is the key evidence for communication, so taking it out would leave paragraph 2 without support.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `Which sentence would best conclude the draft if added after sentence 10?`,
          choices: [
            ok(`Watanabe's examples show that an octopus uses its changing skin both to stay hidden and to send clear messages.`),
            no(`Octopuses are amazing animals, and I would love to see one up close someday.`, 'opinion-not-analysis'),
            no(`Watanabe explains that the color sacs can open or close in less than a second.`, 'evidence-without-analysis'),
            no(`This proves that octopuses change color whenever they feel happy or sad.`, 'unsupported-inference'),
          ],
          solution: `The first choice returns to both reasons named in the claim, hiding and messages. The detail about the color sacs is from the draft, but repeating it does not sum up the analysis.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `A classmate suggests replacing sentence 2 with "Watanabe describes octopus skin." Why is the original sentence 2 stronger?`,
          choices: [
            ok(`It makes a point about why octopuses change color that the evidence in both paragraphs can prove.`),
            no(`It uses shorter and simpler words than the classmate's sentence does.`, 'misjudges-claim-strength'),
            no(`It includes a direct quotation from Watanabe's article about the octopus.`, 'misreads-sentence'),
            no(`It covers only the first paragraph, which keeps the draft narrowly focused.`, 'too-narrow'),
          ],
          solution: `Sentence 2 names two reasons, hiding and messages, and each paragraph gives evidence for one of them; the classmate's sentence only names a topic. Sentence 2 covers both paragraphs, not just the first, so the last choice misreads it.`,
        },
      ],
    },
    {
      code: 'wg6-writing-with-evidence-p07',
      title: 'Draft: The Walking School Bus',
      body: `(1) In the article "All Aboard on Foot," Nadia Haddad describes a walking school bus, in which a group of children walks to school together with adult volunteers. (2) ____. (3) Haddad reports that in one town, the number of students who walked to school went from twelve to sixty in a single year. (4) Parents told her they felt safer because an adult always walked at the front and the back of the group. (5) This shows that the program made walking feel safe enough for families to try.

(6) Haddad also explains that the program helped students arrive ready to learn. (7) Teachers in the town noticed that walkers were more alert during first period. (8) Haddad notes that the walk took about twenty minutes, which gave students exercise before class. (9) I think buses are too crowded and loud anyway. (10) ____.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (2) as the claim of the draft?`,
          choices: [
            ok(`Haddad shows that a walking school bus got more children walking and helped them start the day ready to learn.`),
            no(`Some children walk to school each morning, and other children ride in cars.`, 'topic-not-claim'),
            no(`Haddad says that the walk to school in the town took about twenty minutes.`, 'too-narrow'),
            no(`Haddad believes that all school buses should be replaced with walking groups.`, 'unsupported-inference'),
          ],
          solution: `Paragraph 1 shows more children walking and paragraph 2 shows students arriving ready to learn, so the claim needs both ideas. The draft never says Haddad wants to replace all buses, so that choice is not supported.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which sentence should be removed, and why?`,
          choices: [
            ok(`Sentence 9, because it gives the writer's opinion about buses instead of evidence from Haddad.`),
            no(`Sentence 4, because what parents say about feeling safe cannot be used as evidence.`, 'misjudges-evidence'),
            no(`Sentence 7, because teachers are not part of the walking school bus program.`, 'misjudges-relevance'),
            no(`Sentence 3, because numbers make a response to an article harder to follow.`, 'removes-key-evidence'),
          ],
          solution: `Sentence 9 is the writer's own opinion and does not come from or explain Haddad's article. Sentence 4 reports what parents told Haddad, which is evidence from the article for why more families joined.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which sentence best fills blank (10) to explain the evidence in paragraph 2?`,
          choices: [
            ok(`These details suggest that the exercise from the morning walk helped students focus in class.`),
            no(`These details suggest that students should walk to school even during heavy rainstorms.`, 'unsupported-inference'),
            no(`These details suggest that sixty students joined the walking program in one year.`, 'supports-different-point'),
            no(`These details suggest that most teachers prefer to teach during first period.`, 'misreads-evidence'),
          ],
          solution: `Sentences 7 and 8 connect morning exercise with being alert in class, so the first choice explains that link. The number of students who joined is from paragraph 1 and does not explain why walkers were more alert.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `Which detail from the article would best strengthen paragraph 2?`,
          choices: [
            ok(`Haddad reports that teachers saw walkers finish their morning warm-up work faster than before.`),
            no(`Haddad reports that the adult volunteers wore bright yellow vests during every walk.`, 'supports-different-point'),
            no(`Haddad reports that the town later painted new crosswalks on the streets near school.`, 'irrelevant-evidence'),
            no(`Haddad reports that some parents liked to bring their dogs along on the walk.`, 'irrelevant-evidence'),
          ],
          solution: `Paragraph 2 argues that walking helped students arrive ready to learn, and finishing morning work faster is more proof of that. The yellow vests relate to safety, which is the point of paragraph 1, not paragraph 2.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `How does sentence 5 connect the evidence in sentence 4 to the claim?`,
          choices: [
            ok(`It explains that feeling safe is the reason more families let their children join the walk.`),
            no(`It adds a second number from the article about how many students walked.`, 'confuses-analysis-evidence'),
            no(`It argues that the adults should walk in the middle of the group instead.`, 'misreads-evidence'),
            no(`It shows that parents did not really trust the walking school bus.`, 'contradicts-text'),
          ],
          solution: `Sentence 4 reports that parents felt safer, and sentence 5 explains that this feeling is why families were willing to try walking, which supports the growth in walkers. Sentence 5 contains no new number, so it is analysis, not more evidence.`,
        },
      ],
    },
    {
      code: 'wg6-writing-with-evidence-p08',
      title: 'Draft: Why Scientists Still Sketch',
      body: `(1) Olivia Brennan's article "The Sketchbook Scientist" explains why some scientists still draw what they study, even though cameras are everywhere. (2) ____. (3) Brennan describes a scientist who drew the same leaf every day for a week. (4) By the third day, the scientist noticed tiny hairs on the stem that she had missed in her photographs. (5) This example shows that drawing makes a person look slowly and carefully.

(6) ____, Brennan explains that drawings help scientists remember what they see. (7) She writes that students who sketched insects in one class could describe them better a month later than students who only took photos. (8) Taking photos with a phone is easy and fast. (9) Brennan suggests that the act of drawing helps lock details into memory.

(10) In my opinion, everyone should take an art class.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (2) as the claim of the draft?`,
          choices: [
            ok(`Brennan shows that drawing helps scientists notice more details and remember them for longer.`),
            no(`Scientists study many different things, such as leaves, insects, and rocks.`, 'topic-not-claim'),
            no(`Brennan believes that cameras should not be allowed in any science class.`, 'unsupported-inference'),
            no(`Brennan describes a scientist who drew the same leaf for one whole week.`, 'too-narrow'),
          ],
          solution: `Paragraph 1 is about noticing details and paragraph 2 is about remembering them, so the claim should name both. The leaf example is only one piece of evidence, so it is too narrow to be the claim.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which words best fill blank (6)?`,
          choices: [
            ok(`In addition`),
            no(`Instead`, 'wrong-transition-contrast'),
            no(`For example`, 'wrong-transition-example'),
            no(`In conclusion`, 'wrong-transition-conclusion'),
          ],
          solution: `Paragraph 2 adds a second benefit of drawing, so "In addition" fits. "Instead" would suggest that remembering replaces noticing, but the draft presents both as benefits.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Why does sentence 8 weaken paragraph 2?`,
          choices: [
            ok(`It states a general fact about phones instead of explaining Brennan's point about memory.`),
            no(`It is a quotation from the article that the writer never explains.`, 'misreads-sentence'),
            no(`It is the only sentence in the draft that mentions photographs at all.`, 'factual-error'),
            no(`It gives the strongest evidence, so it should be the topic sentence.`, 'misjudges-relevance'),
          ],
          solution: `Sentence 8 interrupts the evidence about sketching and memory with a general comment about phones. It is not the only mention of photographs, since sentences 4 and 7 also mention them.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `Which revision of sentence 10 would best conclude the draft?`,
          choices: [
            ok(`Brennan's examples show that drawing is a useful science tool because slow looking leads to sharper noticing and stronger memory.`),
            no(`In my opinion, everyone should take an art class, and art class should last for the whole school day.`, 'opinion-not-analysis'),
            no(`Brennan explains that students who sketched insects could describe them better a month later.`, 'evidence-without-analysis'),
            no(`Brennan proves that photographs are useless and that scientists should never take pictures.`, 'overgeneralization'),
          ],
          solution: `The first choice ties both paragraphs back to the claim about noticing and remembering. The choice about photographs being useless goes too far, because Brennan only shows that drawing adds something photos can miss.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Sentence 4 gives evidence from the article. Which sentence explains how that evidence supports the claim?`,
          choices: [
            ok(`Sentence 5`),
            no(`Sentence 3`, 'confuses-setup-analysis'),
            no(`Sentence 7`, 'supports-different-point'),
            no(`Sentence 1`, 'topic-not-claim'),
          ],
          solution: `Sentence 5 tells what the missed stem hairs mean: drawing makes a person look slowly and carefully. Sentence 3 comes before the evidence and only sets up the example, so it does not explain it.`,
        },
      ],
    },
  ],
}

export default skill
