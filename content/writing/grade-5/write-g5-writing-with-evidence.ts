import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g5-writing-with-evidence',
  subject: 'writing',
  grade: 5,
  group: 'Composition',
  name: 'Writing About Texts with Evidence',
  standards: ['W.5.9'],
  passages: [
    {
      code: 'wg5-writing-with-evidence-p01',
      title: 'Draft: Otters and the Kelp Forest',
      body: `(1) In the article "Guardians of the Kelp," Lena Haugen explains how sea otters and kelp forests live together along the coast. (2) ____. (3) Haugen writes that sea urchins chew through the bottom of kelp plants, which makes the tall plants float away. (4) She also explains that sea otters eat large numbers of sea urchins every day. (5) This shows that otters keep the urchins from destroying the forest.

(6) The kelp forest helps the otters, too. (7) Haugen reports that otters wrap themselves in strands of kelp so they do not drift away while they sleep. (8) My cousin saw a seal at the zoo last summer. (9) She adds that the kelp gives otters a calm place to hide from rough waves. (10) ____, the otters and the kelp need each other.

(11) Otters are cute.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (2) as the claim of the draft?`,
          choices: [
            no(`Sea otters are furry animals that spend most of their lives in the ocean.`, 'topic-not-claim'),
            ok(`Haugen shows that sea otters and kelp forests help each other survive.`),
            no(`Haugen thinks that people should never fish near a kelp forest.`, 'unsupported-inference'),
            no(`I would like to swim in a kelp forest someday with my family.`, 'opinion-not-analysis'),
          ],
          solution: `Paragraph 1 shows otters helping the kelp and paragraph 2 shows the kelp helping the otters, so a claim about helping each other fits. The draft never says Haugen wants to stop fishing, so that choice goes beyond the text.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not support the analysis of Haugen's article?`,
          choices: [
            no(`Sentence 4`, 'removes-key-evidence'),
            no(`Sentence 7`, 'removes-key-evidence'),
            ok(`Sentence 8`),
            no(`Sentence 9`, 'removes-key-evidence'),
          ],
          solution: `Sentence 8 is about the writer's cousin and a seal, not about Haugen's article. Sentence 9 is evidence from the article about the kelp protecting otters, so it should stay.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which words best fill blank (10)?`,
          choices: [
            no(`For instance`, 'wrong-transition-example'),
            no(`However`, 'wrong-transition-contrast'),
            no(`Before that`, 'wrong-transition-time'),
            ok(`All in all`),
          ],
          solution: `Sentence 10 sums up what all the evidence means, so "All in all" fits. "For instance" is wrong because sentence 10 is a summary, not a new example.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which revision of sentence 11 would best conclude the draft?`,
          choices: [
            ok(`Haugen's article shows that otters protect the kelp, and the kelp gives otters a safe home.`),
            no(`Otters are cute, and I hope I get to see one in the wild someday.`, 'opinion-not-analysis'),
            no(`Haugen writes that otters wrap themselves in kelp so they can sleep.`, 'evidence-without-analysis'),
            no(`Sea urchins are spiny animals that crawl along the sea floor.`, 'off-topic-fact'),
          ],
          solution: `A strong conclusion pulls together both paragraphs, and only the first choice names how each one helps the other. Repeating the detail about sleeping in kelp gives one piece of evidence but does not sum up the draft.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Which sentence best explains how sentence 7 supports the idea that the kelp helps the otters?`,
          choices: [
            no(`Because otters eat the urchins, the kelp is able to keep growing tall.`, 'wrong-direction-of-help'),
            ok(`Because the kelp holds the otters in place, they can sleep safely without floating away.`),
            no(`Otters need many hours of sleep every day to stay healthy and strong.`, 'unsupported-inference'),
            no(`Kelp is a kind of large seaweed that grows in cold ocean water.`, 'off-topic-fact'),
          ],
          solution: `Sentence 7 says otters wrap themselves in kelp so they do not drift away, which shows the kelp keeps them safe. The choice about eating urchins explains how otters help the kelp, which is the opposite direction from sentence 7.`,
        },
      ],
    },
    {
      code: 'wg5-writing-with-evidence-p02',
      title: 'Draft: Messages on Wings',
      body: `(1) In "Wings That Carried the News," Tomas Ferreira describes how people once used pigeons to send messages. (2) Ferreira shows that pigeons were useful messengers because they could always find their way home. (3) He explains that a pigeon was carried far from its home and then let go with a tiny note tied to its leg. (4) The bird would fly straight back home, sometimes from more than a hundred miles away. (5) ____.

(6) Ferreira also points out that pigeons were fast. (7) He writes that a pigeon could fly about fifty miles in one hour. (8) In those days, a rider on horseback might need a whole day to travel the same distance. (9) This comparison shows ____.

(10) Pigeons were not perfect messengers, however. (11) Ferreira notes that a pigeon could only fly to one place, its home. (12) Still, the evidence in the article shows that pigeons solved a real problem for people who needed news to travel quickly.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (5) to explain how sentences 3 and 4 support the claim?`,
          choices: [
            no(`Pigeons are gray birds that often live in busy city parks.`, 'off-topic-fact'),
            no(`Ferreira writes that the note was tied to the pigeon's leg.`, 'evidence-without-analysis'),
            ok(`These details show that people could trust a pigeon to bring a message home from far away.`),
            no(`This shows that pigeons were faster than any train or car.`, 'unsupported-inference'),
          ],
          solution: `Sentences 3 and 4 tell how pigeons flew home from far away, and the correct choice explains why that made them trustworthy messengers. The draft never mentions trains or cars, so that choice is not supported.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which words best complete sentence 9?`,
          choices: [
            ok(`that pigeons could carry news much faster than people could at that time.`),
            no(`that horses were not very good at carrying riders on long trips.`, 'misreads-comparison'),
            no(`that pigeons liked flying more than they liked walking.`, 'unsupported-inference'),
            no(`that riders did not want to deliver messages for other people.`, 'unsupported-inference'),
          ],
          solution: `Sentences 7 and 8 compare a pigeon's one hour with a rider's whole day, so the point is that pigeons were much faster. The comparison is about speed, not about horses being bad at their job.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which sentence gives evidence from Ferreira's article rather than the writer's own explanation?`,
          choices: [
            no(`Sentence 2`, 'confuses-claim-evidence'),
            no(`Sentence 9`, 'confuses-analysis-evidence'),
            ok(`Sentence 7`),
            no(`Sentence 12`, 'confuses-analysis-evidence'),
          ],
          solution: `Sentence 7 begins "He writes that" and reports a fact from the article. Sentence 9 begins "This comparison shows," which is the writer explaining the evidence, not the evidence itself.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Why does the writer include sentences 10 and 11?`,
          choices: [
            no(`To prove that pigeons were not useful messengers at all`, 'overstates-evidence'),
            no(`To share a personal story about raising pigeons at home`, 'misreads-sentence-purpose'),
            no(`To begin a new claim that horses were better than pigeons`, 'unsupported-inference'),
            ok(`To report a limit the article mentions so the response is accurate and fair`),
          ],
          solution: `Sentences 10 and 11 report a weakness that Ferreira notes, and sentence 12 shows the claim still holds. The writer does not say pigeons were useless, because sentence 12 says they solved a real problem.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence 11 that gives more evidence about the limit of pigeons. Which sentence fits best?`,
          choices: [
            no(`Ferreira says pigeons can see some colors that people cannot see.`, 'off-topic-fact'),
            ok(`Ferreira explains that people had to carry the birds away by wagon or ship before each message could be sent.`),
            no(`Ferreira explains that pigeons could still fly home through rain and strong wind.`, 'supports-wrong-point'),
            no(`I think pigeons are smarter than most other kinds of birds.`, 'opinion-not-analysis'),
          ],
          solution: `The limit is that pigeons only fly home, so people first had to haul them away, which the correct choice explains. Flying through rain and wind shows a strength of pigeons, so it does not fit a paragraph about a limit.`,
        },
      ],
    },
    {
      code: 'wg5-writing-with-evidence-p03',
      title: 'Draft: The Baton Pass',
      body: `(1) Nadia Kowalczyk's article "The Ten-Meter Secret" explains why the baton pass matters so much in a relay race. (2) A relay team has four runners, and each one carries a short stick called a baton. (3) ____.

(4) Kowalczyk explains that the pass must happen inside a zone that is only about ten meters long. (5) If a runner hands off the baton outside that zone, the whole team is disqualified. (6) She also writes that the runner receiving the baton starts moving before it arrives. (7) That way, the second runner is already at top speed during the pass. (8) ____ these details show that a smooth handoff can save time.

(9) Kowalczyk describes a school team that practiced handoffs for three weeks. (10) Their time in the race improved by almost two seconds, even though no one ran faster on their own. (11) I like running too, and I play soccer on weekends. (12) This evidence shows that teamwork can matter as much as speed.

(13) ____`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (3) as the claim of the draft?`,
          choices: [
            no(`Relay races are held at many track meets in the spring.`, 'topic-not-claim'),
            no(`Kowalczyk thinks that every school should start a track team.`, 'unsupported-inference'),
            ok(`Kowalczyk shows that a good baton pass can matter as much as how fast each runner is.`),
            no(`A baton is usually made of metal or hard plastic.`, 'detail-not-claim'),
          ],
          solution: `The whole draft explains how the handoff saves time, and sentence 12 says teamwork matters as much as speed, so this claim fits. The draft never says Kowalczyk wants every school to start a team.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not support the analysis?`,
          choices: [
            no(`Sentence 5`, 'removes-key-evidence'),
            ok(`Sentence 11`),
            no(`Sentence 10`, 'removes-key-evidence'),
            no(`Sentence 6`, 'removes-key-evidence'),
          ],
          solution: `Sentence 11 is about the writer's own hobbies and gives no evidence from the article. Sentence 10 is key evidence that practice improved the team's time, so it must stay.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Which word best fills blank (8)?`,
          choices: [
            ok(`Together,`),
            no(`Instead,`, 'wrong-transition-contrast'),
            no(`Meanwhile,`, 'wrong-transition-time'),
            no(`Even so,`, 'wrong-transition-contrast'),
          ],
          solution: `Sentence 8 combines the details from sentences 4 to 7 into one point, so "Together," fits. "Instead," and "Even so," signal a contrast, but sentence 8 agrees with the details before it.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `In sentence 10, why are the words "even though no one ran faster on their own" important to the writer's point?`,
          choices: [
            no(`They show that the runners did not try very hard in the race.`, 'unsupported-inference'),
            no(`They show that practicing handoffs did not help the team at all.`, 'misreads-evidence'),
            no(`They show that the race was shorter than the one before it.`, 'unsupported-inference'),
            ok(`They show that the better time came from the handoffs, not from faster running.`),
          ],
          solution: `If no single runner got faster, the two seconds must have come from the practiced handoffs, which supports sentence 12. The team's time improved, so the choice saying practice did not help misreads the evidence.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Which sentence would best fill blank (13) as the conclusion?`,
          choices: [
            no(`Kowalczyk writes that the passing zone is about ten meters long.`, 'evidence-without-analysis'),
            no(`Relay races are exciting, and I hope to run in one someday.`, 'opinion-not-analysis'),
            ok(`Kowalczyk's article shows that a relay can be won in the passing zone, because smooth handoffs save time.`),
            no(`Kowalczyk proves that speed does not matter at all in a relay race.`, 'overstates-evidence'),
          ],
          solution: `The correct conclusion restates the claim and the reason from the evidence. The choice saying speed does not matter at all goes too far, because sentence 12 says teamwork matters as much as speed, not instead of it.`,
        },
      ],
    },
    {
      code: 'wg5-writing-with-evidence-p04',
      title: 'Draft: Planning a Shadow Puppet Show',
      body: `(1) In "Stories in the Light," Kenji Watanabe explains how shadow puppet shows are made. (2) Watanabe shows that a shadow puppet show needs careful planning, not just a good story. (3) First, he explains that puppet makers cut figures from thick paper or thin leather. (4) They punch tiny holes in the figures so that dots of light shine through and show details like eyes and buttons. (5) ____.

(6) Watanabe also writes about the light. (7) The lamp must sit behind the puppets, and the screen must be in front of them. (8) If a puppet moves closer to the screen, its shadow gets sharper and smaller. (9) If it moves toward the lamp, the shadow grows bigger and blurrier. (10) Puppeteers use this trick to make a character seem to walk toward the audience.

(11) Finally, the puppeteers must practice together. (12) Watanabe describes one show where three people moved eleven puppets. (13) He says they rehearsed every scene until they could move without bumping into each other in the dark.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (5) to explain the evidence in sentences 3 and 4?`,
          choices: [
            no(`Leather is a strong material that is also used for shoes and belts.`, 'off-topic-fact'),
            ok(`These details show that makers plan each puppet so its shadow will have clear features.`),
            no(`Watanabe also writes that paper is made from trees.`, 'off-topic-fact'),
            no(`I made a paper puppet in art class once, and it was fun.`, 'personal-not-evidence'),
          ],
          solution: `Sentences 3 and 4 describe how makers cut figures and punch holes, and the correct choice explains that this planning gives the shadow clear details. A personal story about art class does not explain the article's evidence.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `Which sentence states the claim of the draft?`,
          choices: [
            no(`Sentence 1`, 'source-not-claim'),
            no(`Sentence 3`, 'detail-not-claim'),
            no(`Sentence 10`, 'detail-not-claim'),
            ok(`Sentence 2`),
          ],
          solution: `Sentence 2 states the point the whole draft supports: a show needs careful planning. Sentence 1 names the article and its topic, but it does not say what the writer will prove.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `The writer wants to add a sentence after sentence 10 to explain how paragraph 2 supports the claim. Which sentence fits best?`,
          choices: [
            ok(`This shows that puppeteers must plan exactly where to hold each puppet between the lamp and the screen.`),
            no(`Watanabe says the screen can be made from an old white sheet.`, 'evidence-without-analysis'),
            no(`This shows that the lamp is the only important part of any show.`, 'overstates-evidence'),
            no(`Lamps should always be turned off when the show is over.`, 'off-topic'),
          ],
          solution: `Paragraph 2 explains that a puppet's place changes its shadow, so planning where to hold it connects the evidence to the claim. Saying the lamp is the only important part ignores paragraphs 1 and 3.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which choice correctly paraphrases sentences 8 and 9?`,
          choices: [
            no(`A puppet near the screen makes a large, blurry shadow, and a puppet near the lamp makes a small, sharp one.`, 'reverses-detail'),
            no(`A puppet's shadow stays the same size no matter where the puppeteer holds it.`, 'contradicts-text'),
            ok(`A puppet near the screen makes a small, sharp shadow, and a puppet near the lamp makes a large, blurry one.`),
            no(`A puppet near the lamp makes a shadow that is both larger and sharper.`, 'partly-reverses-detail'),
          ],
          solution: `Sentence 8 says closer to the screen means sharper and smaller, and sentence 9 says closer to the lamp means bigger and blurrier. The first choice swaps the two, so it does not report the evidence accurately.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Which sentence would best conclude the draft?`,
          choices: [
            no(`Shadow puppet shows are fun to watch with family and friends.`, 'opinion-not-analysis'),
            no(`Watanabe describes a show in which three people moved eleven puppets.`, 'evidence-without-analysis'),
            no(`Watanabe shows that practice is the only thing that makes a show work.`, 'too-narrow'),
            ok(`Watanabe's article shows that every part of a shadow show, from the puppets to the light to the practice, must be planned.`),
          ],
          solution: `The draft covers puppets, light and practice, and the correct conclusion ties all three back to the claim about planning. The choice about practice only covers paragraph 3, so it is too narrow.`,
        },
      ],
    },
    {
      code: 'wg5-writing-with-evidence-p05',
      title: 'Draft: Bricks from Bottles',
      body: `(1) The article "Bottles Into Bricks" by Amara Osei describes a small factory that turns used plastic into building bricks. (2) ____. (3) Osei explains that workers wash and shred plastic bottles and old containers. (4) Then they melt the pieces with sand and press the mix into molds. (5) She writes that the finished bricks are lighter than clay bricks but just as strong.

(6) The bricks also help keep plastic out of nature. (7) Osei reports that the factory uses about two tons of plastic each week that would otherwise go to a landfill. (8) ____, neighbors now bring their plastic trash to the factory instead of throwing it away. (9) This shows that the project changed how people in the town think about waste.

(10) Osei does point out one problem. (11) The melting machines use a lot of electricity. (12) Even so, the article shows that plastic bricks can solve two problems at once.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (2) as the claim of the draft?`,
          choices: [
            no(`Plastic is used to make bottles, toys, and many other things.`, 'topic-not-claim'),
            no(`Osei shows that every new house should be built only from plastic.`, 'overstates-evidence'),
            no(`Osei shows that the bricks are made by melting plastic and sand.`, 'too-narrow'),
            ok(`Osei shows that plastic bricks are a good building material and a way to reduce plastic waste.`),
          ],
          solution: `Paragraph 1 is about the bricks as building material and paragraph 2 is about reducing waste, matching the "two problems" in sentence 12. The choice about melting plastic only describes how the bricks are made, so it is too narrow.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which words best fill blank (8)?`,
          choices: [
            no(`However`, 'wrong-transition-contrast'),
            ok(`In addition`),
            no(`In conclusion`, 'wrong-transition-conclusion'),
            no(`Long ago`, 'wrong-transition-time'),
          ],
          solution: `Sentence 8 adds a second piece of evidence about keeping plastic out of nature, so "In addition" fits. "However" signals a contrast, but sentence 8 agrees with sentence 7.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which sentence in paragraph 1 gives the best evidence that the bricks are a good building material?`,
          choices: [
            ok(`Sentence 5`),
            no(`Sentence 3`, 'describes-process-not-support'),
            no(`Sentence 4`, 'describes-process-not-support'),
            no(`Sentence 1`, 'source-not-claim'),
          ],
          solution: `Sentence 5 says the bricks are lighter than clay bricks but just as strong, which is a reason they are good for building. Sentence 4 only tells how the bricks are made, not whether they work well.`,
        },
        {
          slot: 24,
          difficulty: 'hard',
          stem: `Why does the writer include sentences 10 and 11 in a draft that praises the bricks?`,
          choices: [
            no(`To prove that the factory should close because it uses electricity`, 'overstates-evidence'),
            no(`To add the writer's own opinion about how much electricity costs`, 'confuses-evidence-opinion'),
            ok(`To report a problem the article mentions, while sentence 12 shows the main point still holds`),
            no(`To begin a new claim that clay bricks are better than plastic ones`, 'unsupported-inference'),
          ],
          solution: `A careful response reports what the article says, including a problem, and sentence 12 begins "Even so" to show the claim still stands. Nothing in the draft says the factory should close.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `Which detail from the article would best support sentence 9?`,
          choices: [
            no(`Osei explains that the bricks fit together like toy blocks.`, 'supports-wrong-point'),
            no(`Osei reports that the bricks cost less than clay bricks.`, 'supports-wrong-point'),
            no(`Osei writes that the molds at the factory are made of steel.`, 'irrelevant-detail'),
            ok(`Osei reports that the town's school now holds a contest to see which class collects the most plastic.`),
          ],
          solution: `Sentence 9 says people in town now think differently about waste, and a school plastic contest shows that change. The detail about cost is about the bricks as a product, not about how people think about waste.`,
        },
      ],
    },
    {
      code: 'wg5-writing-with-evidence-p06',
      title: 'Draft: The Library on Wheels',
      body: `(1) In "The Library on Wheels," Rosa Delgado writes about a bookmobile that visits small towns in her county. (2) A bookmobile is a large van filled with shelves of books. (3) Delgado shows that the bookmobile brings reading and more to families who live far from a library.

(4) ____. (5) Delgado explains that the nearest library is forty miles from some of the farms on the route. (6) Many families cannot make that drive every week. (7) The bookmobile stops in each town every Tuesday. (8) This means children can get new books as often as kids who live in the city.

(9) The bookmobile also offers more than books. (10) Delgado writes that it carries two laptops that visitors can use to do homework or look for jobs. (11) The driver also reads a story aloud at each stop. (12) My favorite book is about a dragon who learns to bake. (13) These details show that the bookmobile is a place for the whole community.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `Which sentence should the writer remove because it does not support the analysis of Delgado's article?`,
          choices: [
            no(`Sentence 10`, 'removes-key-evidence'),
            no(`Sentence 5`, 'removes-key-evidence'),
            ok(`Sentence 12`),
            no(`Sentence 11`, 'removes-key-evidence'),
          ],
          solution: `Sentence 12 is about the writer's favorite book and says nothing about the bookmobile. Sentence 11 is evidence that the bookmobile offers story time, which supports sentence 13.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which sentence best fills blank (4) as the topic sentence of paragraph 2?`,
          choices: [
            ok(`First, the bookmobile solves the problem of distance.`),
            no(`The bookmobile also has laptops for visitors to use.`, 'wrong-paragraph-focus'),
            no(`Farms grow many crops, such as corn and beans.`, 'off-topic'),
            no(`In conclusion, the bookmobile is very helpful.`, 'wrong-position-conclusion'),
          ],
          solution: `Paragraph 2 is about how far families live from a library and how the van comes to them, so a sentence about distance introduces it. The laptops are the topic of paragraph 3, not paragraph 2.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `What does sentence 8 do in paragraph 2?`,
          choices: [
            no(`It gives a new fact quoted directly from Delgado's article.`, 'confuses-analysis-evidence'),
            no(`It states the claim that the whole draft is about.`, 'confuses-claim'),
            ok(`It explains what the evidence in sentences 5 to 7 means for children.`),
            no(`It shares the writer's opinion about city libraries.`, 'confuses-evidence-opinion'),
          ],
          solution: `Sentence 8 begins "This means," so it explains how the distance and the weekly stops help children. It is not a new fact from the article; the facts are in sentences 5 to 7.`,
        },
        {
          slot: 29,
          difficulty: 'hard',
          stem: `The writer wants to add one more piece of evidence after sentence 11 to support sentence 13. Which detail fits best?`,
          choices: [
            no(`Delgado writes that the van has a bright blue stripe on each side.`, 'irrelevant-detail'),
            ok(`Delgado reports that grandparents, parents, and toddlers often wait together for the van to arrive.`),
            no(`Delgado explains that the van needs new tires every year.`, 'irrelevant-detail'),
            no(`Delgado says the van always stops on Tuesdays.`, 'repeats-evidence'),
          ],
          solution: `Sentence 13 says the bookmobile is a place for the whole community, and people of every age gathering there shows that. The Tuesday detail repeats sentence 7 and is about the schedule, not the community.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `Which sentence would best conclude the draft?`,
          choices: [
            no(`Delgado writes that the van stops in each town every Tuesday.`, 'evidence-without-analysis'),
            no(`Every county should buy ten bookmobiles right away.`, 'unsupported-inference'),
            no(`The bookmobile is good because it has many books for kids.`, 'too-narrow'),
            ok(`Delgado's article shows that the bookmobile gives faraway families both books and a place to gather.`),
          ],
          solution: `The correct conclusion joins paragraph 2 (books for families far away) and paragraph 3 (a place for the community). The choice about many books for kids leaves out the laptops and story time, so it is too narrow.`,
        },
      ],
    },
    {
      code: 'wg5-writing-with-evidence-p07',
      title: 'Draft: The Toughest Tiny Animal',
      body: `(1) In the article "The Toughest Tiny Animal," Farid Haddad describes tardigrades, which are animals smaller than a grain of sand. (2) ____.

(3) Haddad explains that tardigrades live in wet moss and damp leaves. (4) When their home dries out, they pull in their legs and curl into a dry ball. (5) He writes that a tardigrade can stay this way for many years. (6) When water returns, it uncurls and starts moving again within a few hours. (7) This shows that tardigrades can wait out a dry time instead of dying.

(8) Tardigrades can survive other hard conditions, too. (9) Haddad reports that scientists have found them living in freezing ice and in hot springs. (10) ____.

(11) My sister has a microscope, but it is broken. (12) In the end, Haddad shows that being small does not mean being weak.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Which sentence best fills blank (2) as the claim of the draft?`,
          choices: [
            no(`Tardigrades have eight short legs with tiny claws.`, 'detail-not-claim'),
            ok(`Haddad shows that tardigrades can survive conditions that would harm most living things.`),
            no(`Moss is a small green plant that grows in shady places.`, 'off-topic-fact'),
            no(`Haddad shows that tardigrades are the strongest animals on Earth.`, 'overstates-evidence'),
          ],
          solution: `Both body paragraphs describe hard conditions tardigrades survive, so this claim fits the draft. Nothing in the draft compares their strength with every animal on Earth, so that choice goes too far.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `Which words in sentence 7 signal that the writer is explaining evidence instead of reporting it?`,
          choices: [
            no(`instead of dying`, 'misreads-signal-words'),
            no(`a dry time`, 'misreads-signal-words'),
            ok(`This shows`),
            no(`can wait out`, 'misreads-signal-words'),
          ],
          solution: `"This shows" tells readers that the writer is about to explain what sentences 4 to 6 mean. "Instead of dying" is part of the explanation, but it does not signal that an explanation is coming.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which sentence best fills blank (10) to explain the evidence in sentence 9?`,
          choices: [
            no(`Hot springs are pools of warm water heated from deep underground.`, 'off-topic-fact'),
            no(`Haddad also says that tardigrades live in wet moss.`, 'repeats-evidence'),
            no(`This shows that tardigrades like hot springs better than ice.`, 'unsupported-inference'),
            ok(`This evidence shows that tardigrades can handle places that are very cold and very hot.`),
          ],
          solution: `Sentence 9 names both freezing ice and hot springs, and the correct choice explains what surviving both means. The draft never says which place tardigrades like better, so that choice is not supported.`,
        },
        {
          slot: 34,
          difficulty: 'medium',
          stem: `Why does sentence 11 not belong in the draft?`,
          choices: [
            ok(`It is about the writer's family and gives no evidence from Haddad's article.`),
            no(`It is a quotation from the article that needs quotation marks.`, 'misreads-sentence-purpose'),
            no(`It should be moved to the beginning as the claim of the draft.`, 'confuses-claim'),
            no(`It repeats the same evidence that is already given in sentence 9.`, 'misreads-sentence-purpose'),
          ],
          solution: `Sentence 11 tells about a broken microscope at home, which has nothing to do with Haddad's article. It does not repeat sentence 9, which is about ice and hot springs.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Which detail from the article would best support the conclusion in sentence 12?`,
          choices: [
            no(`Haddad explains that tardigrades are hard to see without a microscope.`, 'too-narrow'),
            no(`Haddad writes that tardigrades move slowly, like little bears.`, 'irrelevant-detail'),
            ok(`Haddad reports that tardigrades can survive conditions that would quickly harm a much larger animal, such as a mouse.`),
            no(`Haddad says scientists first found tardigrades in a patch of moss.`, 'irrelevant-detail'),
          ],
          solution: `Sentence 12 joins two ideas, small and not weak, and comparing tardigrades with a larger animal shows both. The microscope detail only proves they are small, not that they are strong.`,
        },
      ],
    },
    {
      code: 'wg5-writing-with-evidence-p08',
      title: 'Draft: What a Weather Journal Shows',
      body: `(1) In "Keeping a Weather Journal," Priya Raman explains how writing down the weather each day can help people notice patterns. (2) Raman shows that a weather journal turns everyday observations into useful information. (3) She suggests writing down the temperature, the type of clouds, and the wind at the same time every day. (4) ____, she explains, the notes are easy to compare from one day to the next.

(5) Raman describes a fifth-grade class that kept a journal for one whole spring. (6) By May, the students noticed that tall, puffy clouds in the morning often came before an afternoon storm. (7) They began to bring umbrellas on those days. (8) This shows that their notes helped them predict the weather on their own.

(9) Raman also says a journal can show changes over a longer time. (10) One family compared their notes from two springs. (11) They found that the first warm day came about a week earlier the second year. (12) ____.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Which sentence states the claim of the draft?`,
          choices: [
            no(`Sentence 1`, 'source-not-claim'),
            ok(`Sentence 2`),
            no(`Sentence 3`, 'detail-not-claim'),
            no(`Sentence 8`, 'analysis-not-claim'),
          ],
          solution: `Sentence 2 states the point the whole draft supports: a journal turns observations into useful information. Sentence 8 explains one piece of evidence, so it supports the claim but is not the claim.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Which words best fill blank (4)?`,
          choices: [
            no(`However`, 'wrong-transition-contrast'),
            no(`For example`, 'wrong-transition-example'),
            ok(`That way`),
            no(`Last of all`, 'wrong-transition-sequence'),
          ],
          solution: `Sentence 4 tells the result of taking notes the same way every day, so "That way" fits. "For example" is wrong because sentence 4 gives a result, not an example of sentence 3.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `Which sentence best fills blank (12) to explain the evidence in sentences 10 and 11?`,
          choices: [
            ok(`This evidence shows that a journal can help people notice slow changes they might otherwise miss.`),
            no(`The family also liked to go hiking together every spring.`, 'off-topic'),
            no(`This proves that every spring will start a week earlier from now on.`, 'overstates-evidence'),
            no(`Raman writes that the family kept notes for two springs.`, 'evidence-without-analysis'),
          ],
          solution: `Sentence 9 says journals show changes over a longer time, and the correct choice explains how the family's notes did that. Two years of notes cannot prove what every future spring will do, so that choice goes too far.`,
        },
        {
          slot: 39,
          difficulty: 'medium',
          stem: `Why is sentence 7 useful evidence for the claim?`,
          choices: [
            no(`It shows that the students forgot their umbrellas on most days.`, 'unsupported-inference'),
            no(`It tells which month the class started keeping the journal.`, 'misreads-detail'),
            no(`It gives the writer's own opinion about rainy weather.`, 'confuses-evidence-opinion'),
            ok(`It shows the students acted on what their notes taught them, so the notes were truly useful.`),
          ],
          solution: `Bringing umbrellas on cloudy mornings shows the students used their notes to make a choice, which supports the claim about useful information. Sentence 7 does not mention a starting month or the writer's opinion.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `A classmate suggests replacing sentence 6 with "The students learned a lot about clouds." Which statement best explains why sentence 6 is stronger evidence than the classmate's version?`,
          choices: [
            no(`Sentence 6 is longer, and longer sentences always make better evidence.`, 'length-not-quality'),
            ok(`Sentence 6 names a specific pattern from the article, so readers can see exactly how the notes helped.`),
            no(`Sentence 6 gives the writer's personal feelings about storms.`, 'confuses-evidence-opinion'),
            no(`Sentence 6 tells what happens at the very end of Raman's article.`, 'misreads-sentence-purpose'),
          ],
          solution: `Good evidence is specific, and sentence 6 tells exactly which clouds came before storms, which sets up sentences 7 and 8. Length alone does not make evidence strong; the classmate's version is weaker because it is vague.`,
        },
      ],
    },
  ],
}

export default skill
