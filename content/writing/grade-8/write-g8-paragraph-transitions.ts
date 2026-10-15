import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g8-paragraph-transitions',
  subject: 'writing',
  grade: 8,
  group: 'Sentence and paragraph',
  name: 'Paragraph Organization and Transitions',
  standards: ['W.8.2c'],
  passages: [
    {
      code: 'wg8-paragraph-transitions-p01',
      title: 'The Garden Behind the School',
      body: `(1) Last spring, the empty lot behind Harmon Middle School became a community garden. (2) At first, only a few neighbors showed up on Saturdays to pull weeds and haul away broken bricks. (3) More than thirty families had signed up for raised beds of their own. (4) Each family agreed to water its plot twice a week and to share any extra vegetables with the local food pantry. (5) My cousin has a small garden in her backyard, and she mostly grows roses.

(6) The garden soon changed the neighborhood in ways nobody had expected. (7) Older residents began teaching younger ones how to save seeds and turn food scraps into rich compost. (8) Students from Harmon used the beds to measure plant growth for their science projects. (9) People who had lived on the same street for years finally learned each other's names. (10) The lot that once collected trash now grows tomatoes, beans, and friendships.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not support the main idea of the first paragraph?`,
          choices: [
            no(`Sentence 1`, 'removes-topic-sentence'),
            no(`Sentence 2`, 'removes-supporting-detail'),
            no(`Sentence 4`, 'removes-supporting-detail'),
            ok(`Sentence 5`),
          ],
          solution: `The first paragraph is about how the community garden got started, and sentence 5 is about a cousin's private rose garden, so it does not belong. Sentence 4 explains the rules for the garden families, so it supports the main idea.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which transition would best be added to the beginning of sentence 3?`,
          choices: [
            ok(`Before long,`),
            no(`For instance,`, 'example-for-sequence'),
            no(`Similarly,`, 'similarity-for-change'),
            no(`In conclusion,`, 'conclusion-too-early'),
          ],
          solution: `Sentence 2 says only a few neighbors came at first, and sentence 3 tells what happened later, so a time transition like "Before long" fits. "For instance" is wrong because thirty families signing up is not an example of a few neighbors pulling weeds.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which transition would best be added to the beginning of sentence 9?`,
          choices: [
            no(`For this reason,`, 'false-cause'),
            ok(`Best of all,`),
            no(`On the contrary,`, 'contrast-for-addition'),
            no(`Before that,`, 'wrong-time-order'),
          ],
          solution: `Sentence 9 adds one more change the garden brought, and the most meaningful one, so "Best of all" fits. "For this reason" is wrong because students measuring plants (sentence 8) did not cause neighbors to learn each other's names.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which sentence serves as the topic sentence of the second paragraph?`,
          choices: [
            ok(`Sentence 6`),
            no(`Sentence 7`, 'detail-as-topic'),
            no(`Sentence 9`, 'detail-as-topic'),
            no(`Sentence 10`, 'concluding-for-topic'),
          ],
          solution: `Sentence 6 introduces the idea that the garden changed the neighborhood, and sentences 7 through 9 give examples of those changes. Sentence 10 wraps up the paragraph, so it is the concluding sentence, not the topic sentence.`,
        },
      ],
    },
    {
      code: 'wg8-paragraph-transitions-p02',
      title: 'How an Ocean Island Is Born',
      body: `(1) Some islands in the middle of the ocean began as nothing more than cracks in the seafloor. (2) Deep below the crust, a pocket of melted rock, called magma, pushes slowly upward. (3) When the magma breaks through a crack, the cold seawater cools it, and it hardens into dark rock. (4) At last, the top of the rocky pile rises above the waves, and a new island appears. (5) Over thousands of years, eruption after eruption adds new layers on top of the old ones.

(6) Bare rock is not a friendly home for living things. (7) Seeds drift in on ocean currents, ride on the wind, or travel tucked in the feathers of birds. (8) Hardy plants take root in cracks where rainwater collects and bits of soil build up. (9) Insects and birds soon follow, because the plants offer them food and shelter. (10) Over time, the gray rock turns green as more and more living things arrive and settle in.`,
      items: [
        {
          slot: 5,
          difficulty: 'easy',
          stem: `Sentence 4 is out of place. Where should it be moved to make the order of events logical?`,
          choices: [
            no(`Before sentence 1`, 'displaces-topic-sentence'),
            no(`After sentence 2`, 'ignores-time-order'),
            ok(`After sentence 5`),
            no(`After sentence 8`, 'moves-across-paragraphs'),
          ],
          solution: `The island can only rise above the waves after thousands of years of eruptions build up layers, so sentence 4 belongs after sentence 5. Placing it after sentence 2 would have the island appear before the magma even breaks through the seafloor.`,
        },
        {
          slot: 6,
          difficulty: 'medium',
          stem: `Which transition would best be added to the beginning of sentence 7 to link it to sentence 6?`,
          choices: [
            no(`For this reason,`, 'false-cause'),
            no(`Similarly,`, 'similarity-for-contrast'),
            ok(`Even so,`),
            no(`First of all,`, 'sequence-for-contrast'),
          ],
          solution: `Sentence 6 says bare rock is a poor home for life, and sentence 7 shows life arriving anyway, so a contrast transition like "Even so" fits. "For this reason" is wrong because a harsh home does not cause seeds to arrive.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `In sentence 9, the word "because" shows which relationship between ideas?`,
          choices: [
            no(`It shows a contrast between two ideas.`, 'contrast-for-cause'),
            ok(`It shows a cause and its effect.`),
            no(`It shows the order of events in time.`, 'time-for-cause'),
            no(`It introduces an example of an idea.`, 'example-for-cause'),
          ],
          solution: `"Because" explains why insects and birds arrive: the plants give them food and shelter, which is a cause and effect. The word "soon" shows time in that sentence, but "because" does not.`,
        },
        {
          slot: 8,
          difficulty: 'hard',
          stem: `The writer wants to add one final sentence after sentence 10 to conclude the whole passage. Which sentence would work best?`,
          choices: [
            ok(`In this slow way, a crack in the seafloor can become a living island.`),
            no(`Some volcanoes on land are even taller than the mountains around them.`, 'off-topic-conclusion'),
            no(`Magma is the name for melted rock that lies deep below the crust.`, 'repeats-minor-detail'),
            no(`Birds are the most important animals that live on any ocean island.`, 'new-unsupported-claim'),
          ],
          solution: `The correct sentence ties together both paragraphs, how the rock forms and how life arrives, and echoes the crack mentioned in sentence 1. The sentence about magma only repeats one detail from sentence 2 instead of wrapping up the whole passage.`,
        },
      ],
    },
    {
      code: 'wg8-paragraph-transitions-p03',
      title: 'From Push Bike to Bicycle',
      body: `(1) The bicycle did not appear all at once; it changed shape many times over several decades. (2) The earliest version had two wheels and a seat but no pedals at all. (3) Riders pushed against the ground with their feet, a little like children on scooters. (4) For example, inventors attached pedals directly to the front wheel. (5) This design was faster, but the ride was so rough on stone streets that people nicknamed it the "boneshaker."

(6) To go even faster, makers built a front wheel that was taller than an adult. (7) These high wheelers were thrilling, yet a rider who hit a rock could tumble headfirst over the handlebars. (8) Finally, a safer design arrived with two wheels of the same size and a chain that turned the back wheel. (9) Today's bicycles still follow that basic plan.`,
      items: [
        {
          slot: 9,
          difficulty: 'medium',
          stem: `The transition "For example" in sentence 4 does not fit. Which transition should replace it?`,
          choices: [
            no(`In addition,`, 'addition-for-sequence'),
            ok(`Later,`),
            no(`Similarly,`, 'similarity-for-sequence'),
            no(`In other words,`, 'restatement-for-sequence'),
          ],
          solution: `Sentence 4 describes the next stage in the bicycle's history, after the version with no pedals, so a time transition like "Later" fits. "In other words" is wrong because adding pedals is a new change, not a restatement of pushing with your feet.`,
        },
        {
          slot: 10,
          difficulty: 'easy',
          stem: `Which word in sentence 7 signals a contrast between two ideas?`,
          choices: [
            no(`These`, 'pointer-for-contrast'),
            no(`who`, 'relative-pronoun-for-contrast'),
            ok(`yet`),
            no(`over`, 'preposition-for-contrast'),
          ],
          solution: `"Yet" sets the thrill of the high wheelers against the danger of falling, so it signals contrast. "These" only points back to the bicycles described in sentence 6.`,
        },
        {
          slot: 11,
          difficulty: 'medium',
          stem: `Why does the writer begin sentence 8 with the word "Finally"?`,
          choices: [
            ok(`To show that this design was the last change in the series`),
            no(`To show that the paragraph is ending with a summary`, 'finally-as-summary'),
            no(`To show that the high wheeler caused the safer design`, 'false-cause'),
            no(`To introduce one example of a high wheeler bicycle`, 'example-for-sequence'),
          ],
          solution: `The passage traces the bicycle through a series of designs, and "Finally" marks the last design in that series, the one still used today. Sentence 8 does not summarize; it adds a new design, so "Finally" is not signaling a summary.`,
        },
        {
          slot: 12,
          difficulty: 'hard',
          stem: `Which revision of sentence 9 would make the strongest concluding sentence for the passage?`,
          choices: [
            no(`Today's bicycles come in many bright colors and fun styles for riders.`, 'new-detail-conclusion'),
            ok(`After many changes, each fixing a problem with the last, the bicycle reached the shape we still ride.`),
            no(`Many families still enjoy riding their bicycles together on weekends.`, 'off-topic-conclusion'),
            no(`The boneshaker was surely the bumpiest bicycle that was ever built.`, 'narrow-detail-conclusion'),
          ],
          solution: `The passage shows each design solving a problem with the one before (no pedals, rough rides, dangerous falls), and the correct choice sums up that pattern. The boneshaker sentence focuses on one detail from sentence 5 and adds an opinion the passage does not support.`,
        },
      ],
    },
    {
      code: 'wg8-paragraph-transitions-p04',
      title: 'Our School Needs a Cross-Country Team',
      body: `(1) Westbrook Middle School should start a cross-country team next fall. (2) Unlike soccer or basketball, cross-country does not cut anyone from the roster, so every student who wants to run can join. (3) The sport also costs very little to run. (4) Runners need only good shoes, and the school already owns stopwatches from gym class. (5) A dirt trail already circles the park behind the school, so the team would not need to build a new field or track.

(6) Some people worry that no coach would be available. (7) Mr. Delgado, the science teacher, has run three marathons and has offered to coach the team as a volunteer. (8) My favorite sport to watch on television is tennis. (9) Cross-country would give more students a chance to stay active, make friends, and represent our school at meets across the county.`,
      items: [
        {
          slot: 13,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the passage?`,
          choices: [
            no(`Sentence 3`, 'removes-supporting-detail'),
            no(`Sentence 5`, 'removes-supporting-detail'),
            no(`Sentence 6`, 'counterclaim-as-off-topic'),
            ok(`Sentence 8`),
          ],
          solution: `The passage argues for a cross-country team, and the writer's favorite television sport has nothing to do with that argument. Sentence 6 may seem off topic, but it raises a concern that the writer answers in sentence 7.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Which transition would best be added to the beginning of sentence 7?`,
          choices: [
            no(`In addition,`, 'addition-for-rebuttal'),
            no(`As a result,`, 'false-cause'),
            ok(`However,`),
            no(`Likewise,`, 'similarity-for-contrast'),
          ],
          solution: `Sentence 6 states a worry that no coach is available, and sentence 7 answers it with a volunteer coach, so a contrast transition like "However" fits. "In addition" is wrong because sentence 7 does not add to the worry; it pushes back against it.`,
        },
        {
          slot: 15,
          difficulty: 'medium',
          stem: `Which transition would best be added to the beginning of sentence 5?`,
          choices: [
            ok(`Besides that,`),
            no(`In contrast,`, 'contrast-for-addition'),
            no(`For this reason,`, 'false-cause'),
            no(`Instead,`, 'replacement-for-addition'),
          ],
          solution: `Sentence 5 adds another reason the team would be easy to start, a trail the team can use for free, so an addition transition like "Besides that" fits. "For this reason" is wrong because owning stopwatches does not cause the trail to exist.`,
        },
        {
          slot: 16,
          difficulty: 'hard',
          stem: `Why is it effective for the writer to place sentence 6 directly before sentence 7?`,
          choices: [
            no(`It shows that the writer agrees no coach can be found for the team.`, 'misreads-counterclaim'),
            ok(`It lets the writer answer a reader's concern right away with evidence.`),
            no(`It serves as the topic sentence for the whole argument in the passage.`, 'detail-as-topic'),
            no(`It finishes the writer's point about how little the sport will cost.`, 'misplaced-function'),
          ],
          solution: `Sentence 6 raises a worry that readers might have, and sentence 7 immediately answers it with a volunteer coach, which makes the argument stronger. The writer does not agree with the worry; sentence 7 shows it is not a real problem.`,
        },
      ],
    },
    {
      code: 'wg8-paragraph-transitions-p05',
      title: 'Painting the Hallway Mural',
      body: `(1) In September, the art club at Riverside Middle School voted to paint a mural on the long, gray wall outside the cafeteria. (2) The members wanted the design to show the many cultures of the students who walk past that wall every day. (3) They sent a survey to every homeroom asking students to name a symbol, food, or tradition from their families. (4) More than four hundred students answered, and the club used their ideas to sketch a map of the world surrounded by recipes, musical instruments, and festival lanterns.

(5) The club had to raise money for paint and brushes. (6) Members sold homemade bookmarks at the fall concert and held a car wash in the school parking lot. (7) A neighborhood hardware store donated drop cloths and rollers. (8) By January, the club had collected enough supplies to begin. (9) The painting itself took six weekends, with members taking turns on ladders and scaffolds.`,
      items: [
        {
          slot: 17,
          difficulty: 'medium',
          stem: `Which sentence would best replace sentence 5 to connect the second paragraph to the first?`,
          choices: [
            ok(`Once the design was ready, the club faced a new challenge: paying for supplies.`),
            no(`Paint and brushes can be very expensive at most stores in the area.`, 'no-link-to-previous'),
            no(`Meanwhile, the club was still waiting for the survey results to come in.`, 'contradicts-sequence'),
            no(`In conclusion, the club wanted the mural to celebrate many cultures.`, 'conclusion-misplaced'),
          ],
          solution: `The correct sentence points back to the finished design from paragraph 1 and introduces the money problem that paragraph 2 explains. The "Meanwhile" choice contradicts sentence 4, which already says the survey answers came in and the sketch was made.`,
        },
        {
          slot: 18,
          difficulty: 'easy',
          stem: `Which transition would best be added to the beginning of sentence 6?`,
          choices: [
            no(`In spite of this,`, 'concession-for-purpose'),
            ok(`To earn that money,`),
            no(`Similarly,`, 'similarity-for-purpose'),
            no(`In the end,`, 'conclusion-too-early'),
          ],
          solution: `Sentence 6 tells how the club raised the money mentioned in sentence 5, so "To earn that money" links the two. "In spite of this" is wrong because selling bookmarks was not done in spite of needing money; it was done because of it.`,
        },
        {
          slot: 19,
          difficulty: 'easy',
          stem: `Which sentence is the topic sentence of the first paragraph?`,
          choices: [
            ok(`Sentence 1`),
            no(`Sentence 2`, 'detail-as-topic'),
            no(`Sentence 3`, 'detail-as-topic'),
            no(`Sentence 4`, 'detail-as-topic'),
          ],
          solution: `Sentence 1 introduces the main idea of the paragraph: the art club decided to paint a mural. Sentence 2 explains what the members wanted the design to show, which is a detail about that decision.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence after sentence 9 to conclude the whole passage. Which sentence would work best?`,
          choices: [
            no(`Six weekends is a very long time to spend on any one school project.`, 'narrow-detail-conclusion'),
            no(`Next year, the club might paint a second mural in the gym instead.`, 'new-topic-conclusion'),
            ok(`When the last coat dried, the gray wall had become a picture of the whole school.`),
            no(`Bookmarks were the best-selling item at the fall concert that year.`, 'minor-detail-conclusion'),
          ],
          solution: `The correct sentence returns to the gray wall from sentence 1 and the goal of showing every student's culture, so it wraps up both paragraphs. The sentence about six weekends only comments on one detail from sentence 9.`,
        },
      ],
    },
    {
      code: 'wg8-paragraph-transitions-p06',
      title: 'Learning to Use the 3D Printer',
      body: `(1) Last month, our class learned how to use the 3D printer in the school makerspace. (2) First, each student designed a simple object, such as a keychain or a phone stand, on a computer. (3) The printer heats a thin plastic thread until it melts. (4) Next, we saved the design as a special file that the printer could read. (5) The nozzle then lays down the melted plastic one thin layer at a time, building the object from the bottom up. (6) A small keychain took about forty minutes, while a phone stand took almost three hours.

(7) The makerspace also has a sewing machine that the drama club uses for costumes. (8) Some of our early prints came out lopsided because the bottom layer did not stick to the printer bed. (9) Our teacher showed us how to level the bed and wipe it clean before each print. (10) After that, almost every print came out smooth and even.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not fit the passage?`,
          choices: [
            no(`Sentence 6`, 'removes-supporting-detail'),
            ok(`Sentence 7`),
            no(`Sentence 8`, 'removes-supporting-detail'),
            no(`Sentence 9`, 'removes-supporting-detail'),
          ],
          solution: `The passage is about learning to use the 3D printer, and the drama club's sewing machine has nothing to do with printing. Sentence 8 belongs because it begins the explanation of a printing problem and how the class solved it.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Sentence 3 is out of order. Where should it be placed to make the steps logical?`,
          choices: [
            no(`Before sentence 2`, 'ignores-sequence-words'),
            ok(`After sentence 4`),
            no(`After sentence 5`, 'ignores-sequence-words'),
            no(`After sentence 6`, 'ignores-sequence-words'),
          ],
          solution: `The plastic must melt after the design file is saved (sentence 4) and before the nozzle lays down melted plastic (sentence 5), so sentence 3 belongs after sentence 4. Placing it after sentence 5 would have the nozzle use melted plastic before the plastic melts.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `In sentence 6, what relationship does the word "while" show?`,
          choices: [
            ok(`A contrast between two printing times`),
            no(`A cause and the effect it produced`, 'contrast-read-as-cause'),
            no(`Two events happening at the same time`, 'literal-reading'),
            no(`An example of a general rule`, 'contrast-read-as-example'),
          ],
          solution: `Here "while" sets the short keychain time against the long phone stand time, so it shows contrast. It does not mean "during the same time," because the sentence compares two separate prints rather than saying they happened together.`,
        },
        {
          slot: 24,
          difficulty: 'hard',
          stem: `Once sentence 7 is removed, which transition would best begin sentence 8 to show a shift from the printing steps to a problem the class faced?`,
          choices: [
            no(`As a result,`, 'false-cause'),
            no(`In the same way,`, 'similarity-for-contrast'),
            no(`To sum up,`, 'summary-too-early'),
            ok(`At first, however,`),
          ],
          solution: `"At first, however" signals a turn from smooth steps to a problem, and "At first" sets up the later fix in sentence 10. "As a result" is wrong because the printing times in sentence 6 did not cause the prints to come out lopsided.`,
        },
      ],
    },
  ],
  items: [
    {
      slot: 25,
      difficulty: 'easy',
      stem: `Read: "Kenji studied the trail map carefully before the hike. ____, he still took a wrong turn at the river." Which transition best completes the sentences?`,
      choices: [
        no(`Therefore,`, 'cause-for-contrast'),
        ok(`Even so,`),
        no(`For example,`, 'example-for-contrast'),
        no(`Similarly,`, 'similarity-for-contrast'),
      ],
      solution: `Kenji's careful study would lead you to expect no mistakes, but he made one anyway, so the contrast transition "Even so" fits. "Therefore" is wrong because studying the map would not cause a wrong turn.`,
    },
    {
      slot: 26,
      difficulty: 'easy',
      stem: `Read: "Rain fell on the town for three days straight. ____, the soccer field was too muddy for Saturday's game." Which transition best completes the sentences?`,
      choices: [
        no(`However,`, 'contrast-for-cause'),
        no(`For instance,`, 'example-for-cause'),
        ok(`As a result,`),
        no(`In contrast,`, 'contrast-for-cause'),
      ],
      solution: `Three days of rain caused the muddy field, so the cause and effect transition "As a result" fits. "However" is wrong because a muddy field is exactly what you would expect after heavy rain, not a surprise.`,
    },
    {
      slot: 27,
      difficulty: 'easy',
      stem: `Amara writes, "Many animals change their behavior to survive the winter." Her next sentence describes how bears sleep through the coldest months. Which transition should begin that next sentence?`,
      choices: [
        ok(`For example,`),
        no(`In conclusion,`, 'conclusion-too-early'),
        no(`Nevertheless,`, 'contrast-for-example'),
        no(`On the other hand,`, 'contrast-for-example'),
      ],
      solution: `Bears sleeping through winter is one case of an animal changing its behavior, so "For example" fits. "In conclusion" is wrong because Amara is just beginning to support her idea, not ending her paragraph.`,
    },
    {
      slot: 28,
      difficulty: 'medium',
      stem: `Read the sentences: (A) Once the glue had dried, she sanded the rough corners. (B) Lina measured and cut four pieces of wood for her birdhouse. (C) Finally, she painted the roof bright blue. (D) Next, she glued the pieces together to form the walls. Which is the most logical order for these sentences?`,
      choices: [
        no(`B, A, D, C`, 'ignores-transition-cues'),
        ok(`B, D, A, C`),
        no(`D, B, A, C`, 'ignores-transition-cues'),
        no(`B, D, C, A`, 'ignores-finally'),
      ],
      solution: `Lina must cut the wood first, then glue it ("Next"), then sand once the glue dries, and paint last ("Finally"). Order B, A, D, C is wrong because sentence A refers to glue that has dried, which cannot happen before the gluing in sentence D.`,
    },
    {
      slot: 29,
      difficulty: 'medium',
      stem: `Read: "Bats eat thousands of insects each night. Some bats spread seeds that help forests regrow. Other bats carry pollen between the flowers of fruit trees." Which topic sentence best introduces these supporting details?`,
      choices: [
        no(`Many different kinds of animals are active at night.`, 'too-broad'),
        no(`Some bats eat thousands of insects every single night.`, 'too-narrow'),
        ok(`Bats play several important roles in the natural world.`),
        no(`Bats can be found living on nearly every continent.`, 'unrelated-topic'),
      ],
      solution: `Each detail names a different helpful job that bats do, so a topic sentence about bats' important roles covers all three. The sentence about insects is too narrow because it matches only the first detail.`,
    },
    {
      slot: 30,
      difficulty: 'medium',
      stem: `Read the paragraph: "(1) Walking to school has real benefits for students. (2) A morning walk wakes up the body and the brain before the first class. (3) Walkers also get time to talk with friends on the way. (4) Many school buses are painted a bright shade of yellow. (5) Finally, walking produces no exhaust, so it helps keep the air clean." Which sentence does not belong?`,
      choices: [
        no(`Sentence 2`, 'removes-supporting-detail'),
        no(`Sentence 3`, 'removes-supporting-detail'),
        ok(`Sentence 4`),
        no(`Sentence 5`, 'removes-supporting-detail'),
      ],
      solution: `Every other sentence gives a benefit of walking to school, but sentence 4 describes the color of buses, which does not support the main idea. Sentence 5 belongs because clean air is another benefit, and "Finally" marks it as the last one.`,
    },
    {
      slot: 31,
      difficulty: 'medium',
      stem: `Read: "The Elmwood Library's summer reading challenge kept kids reading all season. Participants logged their reading minutes on a chart at the front desk. Every five hundred minutes earned a ticket for an end-of-summer raffle. By August, children had read more than ten thousand minutes in total." Which sentence best concludes this paragraph?`,
      choices: [
        no(`The raffle tickets were printed on bright orange paper.`, 'minor-detail-conclusion'),
        ok(`Clearly, the challenge made summer a season of steady reading.`),
        no(`Next year, the library may add a short story contest.`, 'new-idea-conclusion'),
        no(`Some children like reading comic books more than novels.`, 'off-topic-conclusion'),
      ],
      solution: `The correct sentence restates the main idea, that the challenge kept kids reading, and the ten thousand minutes support "Clearly." The sentence about a story contest brings in a new idea instead of wrapping up this one.`,
    },
    {
      slot: 32,
      difficulty: 'medium',
      stem: `Read: "Practicing scales helps pianists move their fingers quickly. ____, running drills helps soccer players react faster on the field." Which transition best shows that the second sentence makes a similar point?`,
      choices: [
        no(`On the contrary,`, 'contrast-for-similarity'),
        no(`As a result,`, 'cause-for-similarity'),
        no(`Instead,`, 'replacement-for-similarity'),
        ok(`In the same way,`),
      ],
      solution: `Both sentences describe practice that builds speed in a skill, so "In the same way" shows the comparison. "As a result" is wrong because a pianist's scales do not cause soccer players to react faster.`,
    },
    {
      slot: 33,
      difficulty: 'medium',
      stem: `A paragraph ends with this sentence: "For these reasons, solar panels can lower a family's electric bill." The next paragraph is about the drawbacks of solar panels. Which sentence would best begin it?`,
      choices: [
        ok(`Solar panels do have drawbacks, however, starting with their high cost.`),
        no(`In addition, solar panels lower electric bills even more as years pass.`, 'ignores-shift'),
        no(`For example, one family saved a great deal on its bill last winter.`, 'example-for-shift'),
        no(`As a result, every home in the country should install solar panels.`, 'false-cause'),
      ],
      solution: `The new paragraph turns from benefits to drawbacks, and the correct sentence uses "however" to signal that shift and names the first drawback. The "In addition" choice keeps talking about benefits, so it does not lead into a paragraph about drawbacks.`,
    },
    {
      slot: 34,
      difficulty: 'medium',
      stem: `Read: "____ the museum was crowded, Tomas found a quiet bench near the fossil exhibit." Which word best completes the sentence?`,
      choices: [
        no(`Because`, 'cause-for-concession'),
        ok(`Although`),
        no(`Unless`, 'condition-for-concession'),
        no(`Until`, 'time-for-concession'),
      ],
      solution: `Finding a quiet spot is unexpected in a crowded museum, so "Although" shows that contrast. "Because" is wrong since a crowd would not cause Tomas to find a quiet bench.`,
    },
    {
      slot: 35,
      difficulty: 'medium',
      stem: `Read the sentences: (A) For one thing, it would let students walk to school safely. (B) The town should build a footbridge over Miller Creek. (C) It would also connect two neighborhoods that are now cut off from each other. (D) Most important, it would give fire trucks a faster route across town. Which sentence should come first in a paragraph built from these sentences?`,
      choices: [
        no(`Sentence A`, 'detail-as-topic'),
        ok(`Sentence B`),
        no(`Sentence C`, 'detail-as-topic'),
        no(`Sentence D`, 'detail-as-topic'),
      ],
      solution: `Sentence B states the main claim, and the word "it" in the other sentences refers back to the footbridge it names. Sentence A cannot come first because "For one thing" and "it" both depend on a claim that has not been stated yet.`,
    },
    {
      slot: 36,
      difficulty: 'hard',
      stem: `Read: "Spiders are often mistaken for insects. ____, they belong to a different group of animals, since they have eight legs instead of six." Which transition best completes the sentences?`,
      choices: [
        no(`Likewise,`, 'similarity-for-correction'),
        no(`As a result,`, 'false-cause'),
        ok(`In reality,`),
        no(`For example,`, 'example-for-correction'),
      ],
      solution: `The second sentence corrects the mistaken belief in the first, so "In reality" fits. "As a result" is wrong because people mistaking spiders for insects does not cause spiders to belong to a different group.`,
    },
    {
      slot: 37,
      difficulty: 'hard',
      stem: `Read the paragraph: "(1) Honeybees share information through movement. (2) For instance, a bee that finds flowers performs a special dance for its hive. (3) The angle of the dance shows the direction of the food. (4) In contrast, the length of the dance shows how far away the food is. (5) As a result, other bees can fly straight to the flowers. (6) In this way, one dance can help feed a whole hive." Which transition is used incorrectly?`,
      choices: [
        no(`"For instance" in sentence 2`, 'flags-correct-transition'),
        ok(`"In contrast" in sentence 4`),
        no(`"As a result" in sentence 5`, 'flags-correct-transition'),
        no(`"In this way" in sentence 6`, 'flags-correct-transition'),
      ],
      solution: `Sentence 4 adds a second piece of information the dance carries; it does not contrast with sentence 3, so "In addition" would fit better than "In contrast." "As a result" is correct because knowing the direction and distance is what lets the bees fly straight to the food.`,
    },
    {
      slot: 38,
      difficulty: 'hard',
      stem: `Read the sentences: (A) That vapor rises and cools high in the sky. (B) The sun warms the water in oceans and lakes, turning some of it into vapor. (C) Eventually, the droplets grow heavy enough to fall as rain or snow. (D) As it cools, the vapor forms tiny droplets that gather into clouds. Which is the most logical order for these sentences?`,
      choices: [
        no(`B, D, A, C`, 'ignores-reference-cues'),
        no(`A, B, D, C`, 'ignores-reference-cues'),
        ok(`B, A, D, C`),
        no(`B, A, C, D`, 'ignores-reference-cues'),
      ],
      solution: `Sentence B creates the vapor, A says "That vapor" rises and cools, D tells what happens "As it cools," and C says "the droplets" fall. Order B, D, A, C is wrong because D describes cooling before A explains that the vapor rises and cools.`,
    },
    {
      slot: 39,
      difficulty: 'hard',
      stem: `Which sentence uses a transition that correctly shows the relationship between its ideas?`,
      choices: [
        ok(`Ravi practiced free throws every night; consequently, his shooting improved.`),
        no(`Ravi practiced free throws every night; however, his shooting improved.`, 'contrast-for-cause'),
        no(`The gym was closed for repairs; for example, the team practiced outside.`, 'example-for-cause'),
        no(`It was raining very heavily; nevertheless, the game was canceled.`, 'concession-for-cause'),
      ],
      solution: `Nightly practice leads to better shooting, so "consequently" correctly shows cause and effect. "However" is wrong because improvement is the expected result of practice, not a surprise.`,
    },
    {
      slot: 40,
      difficulty: 'hard',
      stem: `A paragraph begins, "Our town once had no place for teenagers to gather after school." The third sentence is "Today, the center is open five afternoons a week and full of students." Which sentence best fits between them?`,
      choices: [
        no(`Many teenagers enjoy playing board games with their friends.`, 'off-topic-bridge'),
        ok(`Two years ago, parents and students turned an empty store into a youth center.`),
        no(`The new youth center is planned to open sometime next year.`, 'contradicts-sequence'),
        no(`In addition, the town has two public parks and a pool.`, 'addition-off-topic'),
      ],
      solution: `The missing sentence must explain how the town went from having no place to having "the center," and only the correct choice introduces the center and when it began. The sentence saying it will open next year contradicts the third sentence, which says the center is already open.`,
    },
  ],
}

export default skill
