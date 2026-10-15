import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g12-paragraph-transitions',
  subject: 'writing',
  grade: 12,
  group: 'Sentence and paragraph',
  name: 'Paragraph Organization and Transitions',
  standards: ['W.11-12.2c'],
  passages: [
    {
      code: 'wg12-paragraph-transitions-p01',
      title: 'Reading the Climate in Ancient Ice',
      body: `(1) In the interior of Greenland and Antarctica, snow has fallen year after year for hundreds of thousands of years without ever fully melting. (2) As each new layer settles on top of the last, its weight slowly compresses the snow beneath it into dense glacial ice. (3) Tiny bubbles of air become sealed inside that ice during the process, preserving samples of the atmosphere as it existed when the snow first fell. (4) ____, a cylinder of ice drilled from deep within a glacier works something like a frozen archive, with the oldest records stored at the bottom.

(5) Extracting those records requires patience as well as specialized equipment. (6) Drilling teams lower a hollow drill through the ice in short runs, lifting out sections a few meters long and labeling each one with its exact depth. (7) The sections are then shipped in freezers to laboratories, where researchers slice them into thin samples. (8) Some polar research stations also host visiting artists who paint the surrounding landscape. (9) In the laboratory, scientists measure the gases trapped in the bubbles and the chemical makeup of the ice itself.

(10) The results have reshaped scientists' understanding of how the climate changes over long periods. (11) By comparing the amount of carbon dioxide in each layer with evidence of past temperatures, researchers have shown that the two have risen and fallen together across many ice ages. (12) Layers of volcanic ash, ____, allow scientists to match specific bands of ice to eruptions recorded in history, which helps confirm the age of the core. (13) Ice cores, in short, let researchers read a record that no human witness could have kept.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 4?`,
          choices: [
            ok(`As a result,`),
            no(`In contrast,`, 'contrast-for-effect'),
            no(`For instance,`, 'example-for-effect'),
            no(`Even so,`, 'concession-for-effect'),
          ],
          solution: `Sentences 1 to 3 explain how snow becomes layered ice that traps old air, and sentence 4 states the outcome of that process, so "As a result" fits. "In contrast" is wrong because sentence 4 builds on the earlier sentences instead of opposing them.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 6`, 'removes-supporting-detail'),
            no(`Sentence 9`, 'removes-supporting-detail'),
            no(`Sentence 5`, 'removes-topic-sentence'),
            ok(`Sentence 8`),
          ],
          solution: `The second paragraph describes how ice cores are collected and studied, and visiting artists have nothing to do with that process. Sentence 5 must stay because it is the topic sentence that introduces the paragraph.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which choice best fills the blank in sentence 12?`,
          choices: [
            ok(`in addition,`),
            no(`however,`, 'contrast-for-addition'),
            no(`for instance,`, 'example-for-addition'),
            no(`therefore,`, 'cause-for-addition'),
          ],
          solution: `Sentence 12 adds a second kind of evidence found in ice cores, so "in addition" signals another point in the same list. "For instance" is tempting, but volcanic ash is not an example of the carbon dioxide finding in sentence 11; it is a separate use of the ice.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `What is the main function of sentence 5 in the passage?`,
          choices: [
            ok(`It introduces the second paragraph's focus on how ice cores are collected and studied.`),
            no(`It concludes the first paragraph's explanation of how falling snow becomes ice.`, 'misreads-topic-as-conclusion'),
            no(`It gives an example of the climate findings described in the third paragraph.`, 'wrong-paragraph-reference'),
            no(`It contrasts modern drilling methods with older ways of studying glaciers.`, 'invents-contrast'),
          ],
          solution: `Sentence 5 refers back to "those records" and then announces the topic of extraction, which sentences 6, 7, and 9 describe step by step. It does not compare older and newer methods, since no older method is mentioned.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence 9 that links the second paragraph to the third. Which choice best accomplishes this goal?`,
          choices: [
            ok(`These measurements, gathered layer by layer, form the evidence that has changed how scientists think about climate.`),
            no(`The hollow drill must be kept cold so that the ice does not crack as it rises to the surface.`, 'looks-back-only'),
            no(`Future drilling projects hope to reach ice that is more than a million years old.`, 'introduces-new-topic'),
            no(`The artists who visit the stations often display their paintings in museums back home.`, 'extends-irrelevant-detail'),
          ],
          solution: `The correct choice refers back to the laboratory measurements and points forward to the climate findings that open paragraph 3, so it bridges the two. The sentence about keeping the drill cold only adds another collection detail and does not lead into the results.`,
        },
      ],
    },
    {
      code: 'wg12-paragraph-transitions-p02',
      title: 'The Box That Changed Trade',
      body: `(1) For most of the history of ocean shipping, loading a cargo ship was slow and costly work. (2) Dockworkers carried sacks, barrels, and crates aboard one at a time, fitting each piece into the hold wherever it would go. (3) A single ship could sit in port for a week or more while its cargo was packed and later unpacked by hand. (4) ____, goods were often damaged or lost during the many times they were handled between the factory and the store.

(5) The solution that emerged in the middle of the twentieth century was surprisingly simple: a steel box of standard size that could be filled at the factory and sealed shut. (6) Cranes could lift the box from a truck or train directly onto a ship, and at the destination the process ran in reverse. (7) Because every box had the same dimensions and the same corner fittings, any crane in any port equipped for containers could handle it. (8) ____, ships could be designed with cells that held stacked containers securely, allowing a single vessel to carry thousands of them.

(9) The effects reached far beyond the docks. (10) Loading time dropped from days to hours, and the cost of moving goods across oceans fell sharply. (11) Manufacturers could now build factories far from their customers and still ship products cheaply. (12) Some of the earliest containers were painted in bright colors so that they could be identified from a distance. (13) Over time, this shift helped create the global supply chains that stock store shelves today, linking producers and buyers on opposite sides of the world.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 4?`,
          choices: [
            ok(`In addition,`),
            no(`In other words,`, 'restatement-for-addition'),
            no(`Despite this,`, 'concession-for-addition'),
            no(`Instead,`, 'replacement-for-addition'),
          ],
          solution: `Sentences 2 and 3 describe the slowness of hand loading, and sentence 4 adds a second problem, damaged and lost goods, so "In addition" fits. "In other words" is wrong because sentence 4 introduces a new problem rather than restating the delay.`,
        },
        {
          slot: 7,
          difficulty: 'medium',
          stem: `Which choice best fills the blank at the beginning of sentence 8?`,
          choices: [
            ok(`Because the boxes were uniform`),
            no(`Although the boxes were uniform`, 'concession-for-cause'),
            no(`Before the boxes were uniform`, 'sequence-reversed'),
            no(`Unless the boxes were uniform`, 'condition-for-cause'),
          ],
          solution: `Sentence 7 stresses that every box had identical dimensions, and sentence 8 explains what that sameness made possible, so a cause phrase fits. "Although" wrongly suggests that uniform boxes worked against the design of container ships.`,
        },
        {
          slot: 8,
          difficulty: 'easy',
          stem: `Which sentence interrupts the logical flow of the third paragraph and should be removed?`,
          choices: [
            no(`Sentence 11`, 'removes-supporting-detail'),
            ok(`Sentence 12`),
            no(`Sentence 13`, 'removes-concluding-sentence'),
            no(`Sentence 10`, 'removes-supporting-detail'),
          ],
          solution: `The third paragraph explains how containers changed trade, and the color of early boxes is unrelated to those effects. Sentence 13 must stay because it concludes the paragraph and the passage.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `The writer wants to replace sentence 9 with a topic sentence that previews the paragraph more precisely. Which choice best does this?`,
          choices: [
            ok(`The container did more than speed up loading; it changed where goods were made and how they reached buyers.`),
            no(`Cranes at container ports grew steadily taller as ships became wider and carried more cargo.`, 'too-narrow'),
            no(`New inventions have always changed the way people live and work in surprising ways.`, 'too-broad'),
            no(`Dockworkers in many ports had to learn new skills once the old loading methods disappeared.`, 'off-topic'),
          ],
          solution: `The paragraph covers faster loading, lower costs, distant factories, and global supply chains, and the correct choice previews both the speed and the wider economic change. The sentence about inventions in general is too broad, since it says nothing about containers or trade.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `The writer wants to add this sentence: "Theft was also common, since open crates made it easy to remove a few items without anyone noticing." Where would it best be placed?`,
          choices: [
            ok(`After sentence 4`),
            no(`After sentence 2`, 'breaks-cause-chain'),
            no(`After sentence 7`, 'wrong-paragraph-focus'),
            no(`After sentence 11`, 'wrong-paragraph-focus'),
          ],
          solution: `Sentence 4 mentions goods that were "lost" during handling, and the new sentence extends that list of problems with theft, so it belongs right after it. Placing it after sentence 2 would interrupt the link between hand loading and the long delays in sentence 3.`,
        },
      ],
    },
    {
      code: 'wg12-paragraph-transitions-p03',
      title: 'Strategy on Two Wheels',
      body: `(1) Wheelchair basketball looks familiar to anyone who knows the standing game, since the court, the hoop, and the ball are all the same size. (2) The rules, however, have been adapted in ways that reward a distinct set of skills. (3) A player may push the wheels twice before dribbling, passing, or shooting, and a third push without dribbling counts as traveling. (4) ____, success depends as much on controlling the chair as on handling the ball.

(5) Each player is assigned a classification number based on functional ability, ranging from low numbers for athletes with the most limited trunk movement to higher numbers for those with greater mobility. (6) This limit forces coaches to balance their lineups rather than simply sending out the five players with the greatest mobility. (7) The five players on the court together may not exceed a set total of points. (8) As a result, athletes with very different abilities all have meaningful roles on the team.

(9) Watching a skilled team in action reveals how much strategy the sport involves. (10) Players with high classification numbers often lean far out of their chairs to grab rebounds, while teammates set picks by positioning their chairs to block defenders. (11) Players also learn to tip their chairs onto one wheel to gain extra reach on a shot. (12) ____, the athletes who excel are those who treat the chair not as an obstacle but as part of their game. (13) Many players also compete in track events during the off season.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 4?`,
          choices: [
            ok(`Consequently,`),
            no(`Nevertheless,`, 'concession-for-effect'),
            no(`For example,`, 'example-for-effect'),
            no(`Similarly,`, 'comparison-for-effect'),
          ],
          solution: `Sentence 3 describes a rule that limits pushes, and sentence 4 states the result, that controlling the chair becomes as important as handling the ball. "Nevertheless" is wrong because sentence 4 follows from the rule instead of going against it.`,
        },
        {
          slot: 12,
          difficulty: 'medium',
          stem: `Which order of the sentences in the second paragraph is most logical?`,
          choices: [
            ok(`5, 7, 6, 8`),
            no(`5, 6, 7, 8`, 'keeps-unclear-reference'),
            no(`7, 5, 6, 8`, 'detail-before-context'),
            no(`5, 6, 8, 7`, 'conclusion-before-support'),
          ],
          solution: `Sentence 6 refers to "This limit," which only makes sense after sentence 7 introduces the point limit, so 7 must come before 6. The current order, 5, 6, 7, 8, leaves "This limit" pointing to nothing.`,
        },
        {
          slot: 13,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it strays from the focus of the passage?`,
          choices: [
            no(`Sentence 11`, 'removes-supporting-detail'),
            no(`Sentence 12`, 'removes-concluding-sentence'),
            ok(`Sentence 13`),
            no(`Sentence 9`, 'removes-topic-sentence'),
          ],
          solution: `The passage is about the rules and strategy of wheelchair basketball, so track events in the off season are off topic. Sentence 12 should stay because it sums up the third paragraph's point about using the chair.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 12?`,
          choices: [
            ok(`In the end,`),
            no(`For instance,`, 'example-for-summary'),
            no(`On the contrary,`, 'contrast-for-summary'),
            no(`Meanwhile,`, 'time-for-summary'),
          ],
          solution: `Sentences 10 and 11 give examples of chair skills, and sentence 12 draws a general conclusion from them, so "In the end" signals a summing up. "For instance" is wrong because sentence 12 is a general claim, not another specific example.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `What relationship does the word "however" in sentence 2 signal?`,
          choices: [
            ok(`It contrasts the familiar equipment described in sentence 1 with the rules that make the sport different.`),
            no(`It shows that the adapted rules are the cause of the identical court and ball sizes.`, 'confuses-cause-effect'),
            no(`It introduces an example of a rule that the standing game and wheelchair game share.`, 'misreads-contrast-as-example'),
            no(`It signals that the writer disagrees with people who find the sport familiar.`, 'misreads-contrast-as-rebuttal'),
          ],
          solution: `Sentence 1 stresses what is the same as the standing game, and sentence 2 turns to what is different, the adapted rules, so "however" marks that contrast. It does not signal disagreement with readers, since sentence 1 accepts that the sport looks familiar.`,
        },
      ],
    },
    {
      code: 'wg12-paragraph-transitions-p04',
      title: 'Charting the Ocean Floor',
      body: `(1) Until the twentieth century, sailors who wanted to know the depth of the sea relied on a weighted rope. (2) They lowered it over the side until it struck bottom, then measured how much line had been let out. (3) The method was slow, and in deep water a single reading could take hours. (4) ____, the ocean floor remained largely a mystery, and many people imagined it as a flat, featureless plain.

(5) Echo sounding changed that picture. (6) A ship sends a pulse of sound downward and records how long the echo takes to return from the seafloor. (7) Since sound travels through seawater at a fairly steady speed, the delay reveals the depth. (8) Ships could now record thousands of soundings in a single voyage, ____ the rope had produced only a handful.

(9) When researchers plotted these measurements, they discovered a landscape more dramatic than anything on land. (10) Long mountain ranges wind through the middle of the oceans, and some trenches plunge deeper than the tallest peaks rise. (11) Some fish that live near the bottom produce their own light. (12) The mapmakers who drew the first detailed charts had to join scattered readings into continuous shapes, a task that required careful calculation as well as informed judgment.

(13) Even with modern instruments that sweep a wide strip of seafloor at once, only a portion of the ocean floor has been mapped in fine detail. (14) The deep sea, in other words, still holds plenty of territory for future explorers to chart.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 4?`,
          choices: [
            ok(`For this reason,`),
            no(`In contrast,`, 'contrast-for-effect'),
            no(`Likewise,`, 'comparison-for-effect'),
            no(`To illustrate,`, 'example-for-effect'),
          ],
          solution: `Sentence 3 explains that the rope method was slow, and sentence 4 gives the result, that the ocean floor stayed a mystery, so "For this reason" fits. "In contrast" is wrong because the slow method and the lack of knowledge go together rather than oppose each other.`,
        },
        {
          slot: 17,
          difficulty: 'medium',
          stem: `Which word best fills the blank in sentence 8?`,
          choices: [
            ok(`whereas`),
            no(`because`, 'cause-for-contrast'),
            no(`so that`, 'purpose-for-contrast'),
            no(`unless`, 'condition-for-contrast'),
          ],
          solution: `Sentence 8 compares thousands of soundings with the rope's handful of readings, so "whereas" signals that contrast. "Because" is wrong since the rope's few readings did not cause ships to record thousands.`,
        },
        {
          slot: 18,
          difficulty: 'easy',
          stem: `Which sentence in the third paragraph does not support the paragraph's main idea?`,
          choices: [
            no(`Sentence 10`, 'removes-supporting-detail'),
            ok(`Sentence 11`),
            no(`Sentence 12`, 'removes-supporting-detail'),
            no(`Sentence 9`, 'removes-topic-sentence'),
          ],
          solution: `The third paragraph is about the shape of the seafloor revealed by mapping, and glowing fish have nothing to do with landforms or charts. Sentence 9 should stay because it states the paragraph's main idea.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `How does sentence 9 connect the second paragraph to the third?`,
          choices: [
            ok(`It refers back to the echo soundings and introduces what those measurements revealed.`),
            no(`It explains how sound travels through seawater before the paragraph turns to mapmakers.`, 'misplaces-detail'),
            no(`It contrasts the rope method with echo sounding to show which was more accurate.`, 'invents-contrast'),
            no(`It summarizes the whole passage before the writer adds a final example.`, 'misreads-bridge-as-summary'),
          ],
          solution: `The phrase "these measurements" points back to the soundings in paragraph 2, and the rest of the sentence announces the dramatic landscape that paragraph 3 describes. It does not explain how sound travels, which sentence 7 already did.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `If the writer replaced sentence 14, which choice would best keep its role as the passage's conclusion?`,
          choices: [
            ok(`Long after sailors first dropped weighted ropes into the waves, the work of revealing the ocean floor is far from finished.`),
            no(`The deepest trenches are so far down that sunlight never reaches the water at the bottom of them.`, 'too-narrow'),
            no(`Ocean currents, which carry warm and cold water around the globe, are another subject of research.`, 'introduces-new-topic'),
            no(`Sailors in earlier centuries had no way of measuring the sea quickly, so they relied on ropes.`, 'restates-only-introduction'),
          ],
          solution: `The correct choice echoes the opening image of the weighted rope and restates the point of sentence 13, that mapping is unfinished, which ties the whole passage together. The sentence about sailors in earlier centuries repeats only the first paragraph and ignores the unfinished work.`,
        },
      ],
    },
    {
      code: 'wg12-paragraph-transitions-p05',
      title: 'The Quiet Craft of Subtitles',
      body: `(1) Viewers rarely notice good subtitles, which is exactly what translators hope for. (2) A subtitle must convey what a character says in a limited space, usually no more than two short lines at the bottom of the screen. (3) ____, translators often cut words and condense phrases, since most people cannot read as quickly as actors speak.

(4) Jokes and wordplay present an especially difficult challenge. (5) A pun that depends on two meanings of a word in one language rarely works when it is translated word for word. (6) ____, a translator may replace the original joke with a different one that produces a similar laugh. (7) Some critics argue that this approach changes the film too much, but supporters reply that a joke nobody understands is no longer a joke.

(8) Timing matters as much as wording. (9) Each subtitle has to appear when the character begins speaking and disappear before the scene cuts away, or viewers lose track of who is talking. (10) Translators work with software that displays the sound wave of the dialogue, so they can match each line to the exact moment it is spoken. (11) Some film festivals also award prizes for the best costume design. (12) ____, the best subtitles let viewers forget they are reading at all, so that their attention stays on the story.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which choice best fills the blank at the beginning of sentence 3?`,
          choices: [
            ok(`To fit within these limits,`),
            no(`Despite these limits,`, 'concession-for-purpose'),
            no(`Before these limits existed,`, 'sequence-for-purpose'),
            no(`Instead of these limits,`, 'replacement-for-purpose'),
          ],
          solution: `Sentence 2 describes the small space a subtitle has, and sentence 3 explains what translators do to work within it, so "To fit within these limits" fits. "Despite these limits" is wrong because cutting words is a response to the limits, not something done in spite of them.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 6?`,
          choices: [
            ok(`Instead,`),
            no(`Similarly,`, 'comparison-for-alternative'),
            no(`In other words,`, 'restatement-for-alternative'),
            no(`Even so,`, 'concession-for-alternative'),
          ],
          solution: `Sentence 5 says a word-for-word translation of a pun fails, and sentence 6 offers a different approach, so "Instead" signals the alternative. "In other words" is wrong because replacing the joke is a new solution, not a restatement of the problem.`,
        },
        {
          slot: 23,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not belong in the passage?`,
          choices: [
            no(`Sentence 7`, 'removes-counterargument'),
            no(`Sentence 10`, 'removes-supporting-detail'),
            no(`Sentence 8`, 'removes-topic-sentence'),
            ok(`Sentence 11`),
          ],
          solution: `The passage is about how translators write and time subtitles, so a prize for costume design is unrelated. Sentence 7 may look like a digression, but it discusses the joke replacement described in sentence 6, so it stays on topic.`,
        },
        {
          slot: 24,
          difficulty: 'hard',
          stem: `The writer wants to add this sentence: "Even a perfectly worded line fails if it flashes by before the viewer can finish reading it." Where would it best be placed?`,
          choices: [
            ok(`After sentence 8`),
            no(`After sentence 3`, 'wrong-paragraph-focus'),
            no(`After sentence 6`, 'breaks-claim-and-response'),
            no(`After sentence 12`, 'detail-after-conclusion'),
          ],
          solution: `Sentence 8 claims that timing matters as much as wording, and the new sentence explains why by showing that good wording alone is not enough, which leads naturally into sentence 9. Placing it after sentence 3 would add a timing point to a paragraph that is about fitting words into a small space.`,
        },
      ],
    },
    {
      code: 'wg12-paragraph-transitions-p06',
      title: 'A Bus Schedule Built by Students',
      body: `(1) Last year, our town's youth advisory council took on a question that affected hundreds of students: why did so few teenagers ride the public bus? (2) The council began by surveying more than four hundred students at the two high schools. (3) The responses pointed to a clear pattern. (4) Most students did not describe the buses as unsafe or uncomfortable; ____, they said the buses simply did not run at the times students needed them, especially after practices and club meetings ended.

(5) Armed with these results, the council met with the transit planners. (6) The planners explained that adding late buses would cost money the agency did not have. (7) ____, they agreed to study whether shifting existing trips later in the afternoon would serve more riders without adding expense. (8) Council members helped by counting riders at three stops over two weeks. (9) The council also organized a car wash to raise money for the school library's book fair.

(10) The trial schedule began in January, with the last two afternoon buses leaving forty minutes later than before. (11) Within two months, afternoon ridership among students had nearly doubled, and adult riders who worked late shifts benefited from the later trips as well.`,
      items: [
        {
          slot: 25,
          difficulty: 'easy',
          stem: `Which word best fills the blank in sentence 4?`,
          choices: [
            ok(`rather`),
            no(`for example`, 'example-for-correction'),
            no(`similarly`, 'comparison-for-correction'),
            no(`therefore`, 'cause-for-correction'),
          ],
          solution: `Sentence 4 rejects one explanation, unsafe buses, and replaces it with the real one, poor timing, so "rather" fits. "Similarly" is wrong because the two parts of the sentence differ instead of matching.`,
        },
        {
          slot: 26,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 7?`,
          choices: [
            ok(`Instead,`),
            no(`Similarly,`, 'comparison-for-alternative'),
            no(`For example,`, 'example-for-alternative'),
            no(`In other words,`, 'restatement-for-alternative'),
          ],
          solution: `Sentence 6 rules out adding new buses, and sentence 7 describes a different plan, moving existing trips, so "Instead" signals the alternative. "In other words" is wrong because shifting trips is a new idea, not a restatement of the cost problem.`,
        },
        {
          slot: 27,
          difficulty: 'easy',
          stem: `Which sentence should be deleted because it is unrelated to the main idea of the passage?`,
          choices: [
            no(`Sentence 8`, 'removes-supporting-detail'),
            ok(`Sentence 9`),
            no(`Sentence 6`, 'removes-supporting-detail'),
            no(`Sentence 2`, 'removes-supporting-detail'),
          ],
          solution: `The passage follows the council's work on the bus schedule, and a car wash for a book fair has nothing to do with that effort. Sentence 8 stays because counting riders helped the planners study the schedule change.`,
        },
        {
          slot: 28,
          difficulty: 'hard',
          stem: `The writer wants to add a concluding sentence after sentence 11. Which choice best concludes the passage?`,
          choices: [
            ok(`By gathering evidence and proposing a change that cost nothing, the council showed that students can improve a service the whole town depends on.`),
            no(`Next year, the council hopes to survey students about the lunch menu and the length of passing periods between classes.`, 'introduces-new-topic'),
            no(`The adult riders who worked late shifts said the later buses made their evenings much less stressful.`, 'too-narrow'),
            no(`Public transportation has existed in some form in cities around the world for well over a century.`, 'too-broad'),
          ],
          solution: `The correct sentence sums up the council's survey, its cost-free proposal, and the town-wide benefit, so it closes the whole passage. The sentence about adult riders only extends one detail from sentence 11 and does not reflect the council's role.`,
        },
      ],
    },
  ],
  items: [
    {
      slot: 29,
      difficulty: 'medium',
      stem: `Read: "The orchestra's new conductor shortened each rehearsal by twenty minutes. ____, the musicians reported feeling better prepared for concerts, since every remaining minute was spent on the hardest passages." Which transition best completes the sentences?`,
      choices: [
        ok(`Even so,`),
        no(`Similarly,`, 'comparison-for-concession'),
        no(`For instance,`, 'example-for-concession'),
        no(`Previously,`, 'time-for-concession'),
      ],
      solution: `Shorter rehearsals would normally leave musicians less prepared, so "Even so" signals the unexpected result that follows. "Previously" is wrong because the musicians' improved preparation came after the change, not before it.`,
    },
    {
      slot: 30,
      difficulty: 'medium',
      stem: `Read: "(1) Once the glaze has dried, the pieces return to the kiln for a second, hotter firing. (2) A potter first shapes the clay on a wheel and lets it dry until it is firm but not brittle. (3) After this first firing, the hardened pieces are dipped in glaze. (4) The dried pieces are then fired at a moderate temperature to drive out any remaining moisture." Which order of the sentences creates the most logical paragraph?`,
      choices: [
        ok(`2, 4, 3, 1`),
        no(`2, 3, 4, 1`, 'ignores-sequence-signal'),
        no(`4, 2, 3, 1`, 'misplaces-first-step'),
        no(`2, 4, 1, 3`, 'misplaces-last-step'),
      ],
      solution: `Sentence 2 says "first," sentence 4 refers to "the dried pieces," sentence 3 follows "this first firing," and sentence 1 describes the "second" firing, so the order is 2, 4, 3, 1. The order 2, 3, 4, 1 fails because sentence 3 mentions a first firing that has not happened yet.`,
    },
    {
      slot: 31,
      difficulty: 'medium',
      stem: `A paragraph explains that online visitors can zoom in on brushstrokes too small to see in a gallery, that researchers abroad can study objects without traveling, and that fragile items too delicate to display can still be viewed. Which topic sentence best introduces the paragraph?`,
      choices: [
        ok(`Digitizing a museum's collection opens it to audiences and uses that a gallery alone cannot serve.`),
        no(`High-resolution cameras can capture brushstrokes in remarkable detail when the lighting is right.`, 'too-narrow'),
        no(`Museums have collected and displayed valuable objects for many centuries in many countries.`, 'too-broad'),
        no(`Many museums charge admission fees to help pay for guards, lighting, and repairs.`, 'off-topic'),
      ],
      solution: `All three details describe new audiences or uses made possible by digital collections, and the correct choice names that shared idea. The sentence about cameras and brushstrokes fits only the first detail, so it is too narrow to introduce the whole paragraph.`,
    },
    {
      slot: 32,
      difficulty: 'hard',
      stem: `Read: "(1) Three years ago, the town restored a drained wetland on the edge of the river. (2) During heavy rains, the wetland now absorbs water that once flooded nearby streets. (3) It also filters runoff before that water reaches the river. (4) Wetlands in many regions were drained centuries ago to create farmland. (5) Birdwatchers have reported several species returning to the area for the first time in decades." Which sentence should be removed because it does not support the paragraph's main idea?`,
      choices: [
        no(`Sentence 1`, 'removes-topic-sentence'),
        no(`Sentence 3`, 'removes-supporting-detail'),
        ok(`Sentence 4`),
        no(`Sentence 5`, 'misjudges-relevant-benefit'),
      ],
      solution: `Sentences 2, 3, and 5 each describe a benefit the town has gained from its restored wetland, while sentence 4 is general history about other places. Sentence 5 may seem different because it concerns birds rather than water, but returning wildlife is still a benefit of the restoration.`,
    },
    {
      slot: 33,
      difficulty: 'medium',
      stem: `Read: "Solar panels produce the most electricity around midday. ____, demand for power in many homes peaks in the early evening, when families return from work and school." Which transition best completes the sentences?`,
      choices: [
        ok(`However,`),
        no(`Therefore,`, 'cause-for-contrast'),
        no(`For example,`, 'example-for-contrast'),
        no(`In addition,`, 'addition-for-contrast'),
      ],
      solution: `The two sentences describe a mismatch between when panels produce power and when homes need it, so "However" signals the contrast. "Therefore" is wrong because midday production does not cause evening demand.`,
    },
    {
      slot: 34,
      difficulty: 'hard',
      stem: `In which sentence does the transition express a relationship that does not fit the ideas it connects?`,
      choices: [
        no(`The library added evening hours; as a result, more working adults began borrowing books.`, 'misjudges-cause-effect'),
        ok(`The bridge was closed for repairs; similarly, drivers took a longer route along the river.`),
        no(`The trail is steep near the summit; nonetheless, many beginners complete it each summer.`, 'misjudges-concession'),
        no(`The choir rehearsed for months; consequently, its spring concert ran smoothly.`, 'misjudges-cause-effect'),
      ],
      solution: `The bridge closure caused drivers to take a longer route, so a cause word such as "consequently" is needed; "similarly" wrongly suggests the two facts are parallel. The trail sentence correctly uses "nonetheless" because beginners succeed despite the steep climb.`,
    },
    {
      slot: 35,
      difficulty: 'medium',
      stem: `A paragraph argues that runners should add swimming to their training. It explains that swimming builds endurance, strengthens muscles that running neglects, and reduces the pounding on knees and ankles. Which sentence best concludes the paragraph?`,
      choices: [
        ok(`A few laps each week can make a runner stronger and more durable without adding strain to the joints.`),
        no(`Some swimmers prefer the backstroke because it allows them to breathe more easily.`, 'off-topic'),
        no(`Knees and ankles absorb several times a runner's body weight with every stride on pavement.`, 'too-narrow'),
        no(`Running on soft trails is another way to protect the joints during long workouts.`, 'introduces-new-topic'),
      ],
      solution: `The correct sentence pulls together endurance, strength, and joint protection, the three reasons the paragraph gives, and restates the argument. The sentence about knees and ankles supports only one reason, so it reads as a detail rather than a conclusion.`,
    },
    {
      slot: 36,
      difficulty: 'medium',
      stem: `One paragraph ends: "For decades, weather forecasters relied on reports sent by telegraph from distant observation stations." Which sentence best opens the next paragraph, which describes how satellites changed forecasting?`,
      choices: [
        ok(`Those reports covered only the stations themselves, but satellites later showed entire storm systems at once.`),
        no(`Satellites orbit the planet at different heights depending on the jobs they are designed to do.`, 'ignores-previous-paragraph'),
        no(`Telegraph operators had to learn a code of short and long signals to send each message.`, 'ignores-next-paragraph'),
        no(`Weather forecasts are now available on phones, televisions, and radios throughout the day.`, 'skips-logical-step'),
      ],
      solution: `The correct sentence points back to the telegraph reports and names their limit, then introduces satellites as the improvement, so it links both paragraphs. The sentence about satellite orbits introduces the new topic but drops the connection to the telegraph reports.`,
    },
    {
      slot: 37,
      difficulty: 'medium',
      stem: `Read: "Some animals change color for reasons other than hiding from predators. ____, certain lizards turn darker on cool mornings so that their skin absorbs more of the sun's heat." Which transition best completes the sentences?`,
      choices: [
        ok(`For instance,`),
        no(`Nonetheless,`, 'concession-for-example'),
        no(`In conclusion,`, 'summary-for-example'),
        no(`Otherwise,`, 'condition-for-example'),
      ],
      solution: `The second sentence gives a specific case of an animal changing color for a reason other than hiding, so "For instance" introduces it as an example. "Nonetheless" is wrong because the lizard example supports the first sentence instead of working against it.`,
    },
    {
      slot: 38,
      difficulty: 'medium',
      stem: `Read: "(1) Orienteering races test navigation as much as fitness. (2) Runners receive a map at the start line and must find a series of checkpoints in order. (3) ____ (4) A fast runner who misreads the map can easily lose to a slower one who plans carefully." Which sentence best fills blank 3?`,
      choices: [
        ok(`Because the route between checkpoints is not marked, each runner must decide which path to take.`),
        no(`Orienteering began as a training exercise and later became a popular sport in many countries.`, 'introduces-new-topic'),
        no(`The checkpoints are usually marked with orange and white flags that hang from posts or trees.`, 'too-narrow'),
        no(`For this reason, the fastest runners nearly always win the race by a wide margin.`, 'contradicts-following-sentence'),
      ],
      solution: `The correct sentence explains why navigation matters, which sets up sentence 4's point that a careful planner can beat a faster runner. The sentence claiming the fastest runners nearly always win contradicts sentence 4.`,
    },
    {
      slot: 39,
      difficulty: 'hard',
      stem: `Read: "Warmer ocean water holds less dissolved oxygen. ____ fish that need oxygen-rich water move toward cooler areas. ____ the fishing fleets that depend on those fish must travel farther from port." Which pair of transitions best completes the sentences?`,
      choices: [
        ok(`As a result, / In turn,`),
        no(`However, / Therefore,`, 'contrast-for-effect'),
        no(`As a result, / Nevertheless,`, 'concession-breaks-chain'),
        no(`For example, / Similarly,`, 'example-for-effect'),
      ],
      solution: `Each sentence is caused by the one before it, so "As a result" and "In turn" keep the chain of effects clear. "As a result, / Nevertheless" starts correctly but then wrongly treats the fleets' longer trips as a contrast instead of the next effect.`,
    },
    {
      slot: 40,
      difficulty: 'hard',
      stem: `Read: "(1) The city should build protected bike lanes on Harbor Avenue. (2) Collisions between cars and cyclists on the avenue have risen in each of the past three years. (3) Protected lanes separate the two with raised curbs, which makes such collisions far less likely. (4) Yet studies of similar streets suggest that customers who arrive by bike tend to visit shops more often. (5) A safer, busier avenue would benefit everyone who uses it." Where should this sentence be added: "Some shop owners worry that losing parking spaces will drive customers away"?`,
      choices: [
        ok(`After sentence 3`),
        no(`After sentence 1`, 'concern-before-claim-support'),
        no(`After sentence 4`, 'concern-after-rebuttal'),
        no(`After sentence 5`, 'concern-after-conclusion'),
      ],
      solution: `Sentence 4 begins with "Yet" and answers a worry about customers, so the shop owners' concern must come right before it, after sentence 3. Placing it after sentence 4 would put the objection after the reply, leaving "Yet" with nothing to answer.`,
    },
  ],
}

export default skill
