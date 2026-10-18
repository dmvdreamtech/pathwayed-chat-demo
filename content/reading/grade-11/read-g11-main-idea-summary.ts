import type { ContentChoice, ContentItem, ContentSkill } from '../../types'

const right = (text: string): ContentChoice => ({ text, is_correct: true })
const wrong = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })
const q = (
  slot: number,
  difficulty: ContentItem['difficulty'],
  stem: string,
  choices: ContentChoice[],
  solution: string,
): ContentItem => ({ slot, difficulty, stem, choices, solution })

const skill: ContentSkill = {
  slug: 'read-g11-main-idea-summary',
  subject: 'reading',
  grade: 11,
  group: 'Informational text',
  name: 'Main Idea and Summary',
  standards: ['RI.11-12.2'],
  passages: [
    {
      code: 'rg11-main-idea-summary-p01',
      title: 'Reading the Air in Lichen',
      body: `On the stone walls and tree bark of almost any town, small crusty patches of gray, green or orange grow so slowly that most people never notice them. These are lichens, partnerships between a fungus and a partner that makes food from sunlight, usually an alga. The fungus builds the body and gathers moisture, while the partner supplies sugars. Because neither depends on soil, lichens can live on bare rock, rooftops and fence posts.\n\nThat same independence makes lichens unusually sensitive to the air around them. A lichen has no roots and no waxy outer layer to protect it. It absorbs water and dissolved minerals directly from rain, fog and dust, and it takes in whatever pollutants come along with them. Some kinds tolerate polluted air well, but others decline quickly when sulfur or nitrogen compounds build up.\n\nScientists have turned this weakness into a tool. By recording which lichen species grow in a place, and how large and healthy they are, researchers can estimate the quality of the air over many years, something a single day of instrument readings cannot show. In a survey in the fictional river city of Dunmore, volunteers mapped lichens on two hundred trees. Leafy and bushy lichens were common in parks far from the highway but almost absent along the busiest roads, where only flat, crusty species survived.\n\nLichen surveys do not replace air monitors. They cannot measure the exact amount of a specific pollutant, and a dry summer or a shady site can also change what grows. Yet they are inexpensive, they cover large areas, and they record conditions over long periods. For cities that cannot afford monitoring stations on every street, the patches on a tree trunk offer a living record that anyone trained to read them can use.`,
      items: [
        q(1, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`Because lichens absorb what is in the air, they can serve as a low-cost, long-term record of air quality.`),
          wrong(`Lichens are partnerships between a fungus and an alga that can grow on rock, rooftops and fence posts.`, 'too-narrow'),
          wrong(`Cities should replace their expensive air monitoring stations with volunteer surveys of tree lichens.`, 'contradicts-text'),
          wrong(`Leafy and bushy lichens are healthier and more valuable to scientists than flat, crusty lichens.`, 'unsupported-inference'),
        ], `The passage moves from how lichens live to why that makes them sensitive and useful as air records, so the choice about lichens as a low-cost, long-term record covers the whole text. The choice saying cities should replace their monitoring stations contradicts paragraph 4, which says lichen surveys "do not replace air monitors."`),
        q(2, 'easy', `Which two central ideas does the passage develop?`, [
          right(`Lichens take in water and minerals directly from rain, fog and dust, and scientists use this sensitivity to judge air quality over time.`),
          wrong(`Lichens grow very slowly, and most people walk past them every day without ever noticing them.`, 'too-narrow'),
          wrong(`Pollution from highways harms trees, and volunteers in Dunmore are working to plant new ones.`, 'unsupported-inference'),
          wrong(`Fungi and algae compete for sunlight, and the winner decides what color a lichen becomes.`, 'misreads-detail'),
        ], `Paragraphs 1 and 2 explain how lichens take in water and minerals from the air, and paragraphs 3 and 4 explain how scientists use that trait. The slow growth detail appears only in the first sentence and is not developed.`),
        q(3, 'medium', `How does the second paragraph build on the first?`, [
          right(`It shows that the trait letting lichens live without soil, taking water and minerals from the air, also makes them sensitive to pollution.`),
          wrong(`It introduces a new topic, the history of air pollution laws, that the rest of the passage then explains.`, 'misreads-structure'),
          wrong(`It repeats the description of where lichens grow, adding more examples of surfaces such as rock and bark.`, 'misreads-structure'),
          wrong(`It argues that lichens are harmed less by pollution than other plants because they have no roots.`, 'contradicts-text'),
        ], `Paragraph 2 opens with "That same independence," linking the soil-free life described in paragraph 1 to the sensitivity that makes lichens useful. It says the lack of roots and a waxy layer makes lichens more exposed, not less.`),
        q(4, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Lichens take water and minerals straight from the air, so they also absorb pollutants. By mapping which species grow where, scientists can estimate long-term air quality cheaply, though surveys cannot measure exact amounts.`),
          wrong(`Lichens are fascinating and overlooked organisms that deserve far more attention. Every city should train its residents to read them, since they are clearly better than any machine at tracking pollution.`, 'includes-opinion'),
          wrong(`In Dunmore, volunteers mapped lichens on two hundred trees. They found leafy and bushy lichens in parks far from the highway, while only flat, crusty lichens grew along the busiest roads.`, 'too-narrow'),
          wrong(`Lichens grow on stone walls and tree bark in nearly every town. They come in gray, green and orange, and they grow so slowly that most people never notice them as they walk by.`, 'too-narrow'),
        ], `The choice beginning "Lichens take water and minerals straight from the air" states how lichens absorb pollution, how scientists use them and the limits, with no added judgments. The Dunmore choice is accurate but covers only one example from paragraph 3.`),
        q(5, 'hard', `How does the final paragraph refine the central idea of the passage?`, [
          right(`It admits that lichen surveys cannot give exact measurements but argues that their low cost and long record keep them valuable.`),
          wrong(`It reverses the earlier claims by concluding that lichens are too easily affected by weather to be useful at all.`, 'misreads-structure'),
          wrong(`It shifts the focus from air quality to the problem of cities that cannot afford to plant enough trees.`, 'misreads-detail'),
          wrong(`It provides the first evidence in the passage that lichens respond to sulfur and nitrogen compounds.`, 'misreads-structure'),
        ], `Paragraph 4 begins with a limit ("Lichen surveys do not replace air monitors") and then turns with "Yet" to their strengths, which qualifies rather than reverses the central idea. Weather is named as a complication, not a reason to abandon surveys.`),
      ],
    },
    {
      code: 'rg11-main-idea-summary-p02',
      title: 'The Town with Two Clocks',
      body: `In the early nineteenth century, the fictional market town of Harrowgate kept time the way most towns of its era did: by the sun. Noon was the moment the sun stood highest over the town square, and the church clock and the shopkeepers' watches were set to match it. A town forty miles to the east kept its own noon a few minutes earlier, and nobody minded, because few people traveled between the two in a single day.\n\nThe arrival of the railway changed that. Trains ran on published timetables, and a timetable is only useful if everyone reading it means the same thing by eight o'clock. Each station along the line, however, kept its own local time. Passengers missed connections, and station workers had to keep careful records to keep trains on the single track safely apart.\n\nThe railway company's answer was to run every station on one standard time, taken from the clock at its main terminal in the capital. Harrowgate's station clock was moved forward eleven minutes. For several years the town lived with two times at once. The church clock still followed the sun, while the station clock followed the company, and some shops hung a second clock face so customers could check both.\n\nThe change was not purely practical. Some residents objected that the sun, not a distant company, ought to decide when noon arrived, and a few farmers ignored station time for decades. Gradually, though, newspapers, schools and the post office adopted it, because their business increasingly depended on the trains.\n\nBy the time Harrowgate's council made railway time official, the vote merely recognized what daily life had already decided. The story of the town's two clocks shows that a shared system of time was not a natural fact but an agreement, built slowly as new technology tied distant places together.`,
      items: [
        q(6, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`Harrowgate's slow move from sun time to railway time shows that standard time was an agreement driven by new technology.`),
          wrong(`Harrowgate's station clock was moved forward eleven minutes to match the clock at the terminal in the capital.`, 'too-narrow'),
          wrong(`Farmers in Harrowgate were right to ignore railway time, since the sun is the most accurate way to tell time.`, 'includes-opinion'),
          wrong(`Railway companies in the nineteenth century were careless about safety and caused many missed connections.`, 'unsupported-inference'),
        ], `The final paragraph states the central idea directly: shared time "was not a natural fact but an agreement, built slowly as new technology tied distant places together." The eleven minute change is one detail from paragraph 3.`),
        q(7, 'easy', `Which detail best supports the idea that Harrowgate lived with two times at once?`, [
          right(`Some shops hung a second clock face so customers could check both times.`),
          wrong(`A town forty miles east kept its own noon a few minutes earlier.`, 'wrong-supporting-detail'),
          wrong(`Trains ran on published timetables that passengers depended on.`, 'wrong-supporting-detail'),
          wrong(`The council eventually voted to make railway time official.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 says shops hung a second clock face so customers could see both the church time and the station time. The eastern town detail describes the period before the railway, when each town simply kept its own time.`),
        q(8, 'medium', `How do the passage's ideas about practical need and public resistance interact?`, [
          right(`Residents objected at first, but as newspapers, schools and the post office came to depend on trains, practical need won out.`),
          wrong(`Public resistance was so strong that the railway company finally returned every station to local sun time.`, 'contradicts-text'),
          wrong(`Practical need and resistance never met, because the residents did not learn about railway time for decades.`, 'misreads-detail'),
          wrong(`Resistance came only from the railway company, which wanted to protect its own timetables from change.`, 'misreads-detail'),
        ], `Paragraph 4 describes objections and then says "Gradually, though," institutions adopted railway time because their business depended on the trains. Nothing in the text says the company ever went back to local time.`),
        q(9, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Harrowgate once set its clocks by the sun, but the railway needed one shared time for its timetables. After years of two clocks and some objections, local institutions adopted railway time, and the council made it official.`),
          wrong(`Harrowgate's residents foolishly resisted railway time for years, clinging to the sun even though anyone could see that the railway's system was better. The council finally did the sensible thing.`, 'includes-opinion'),
          wrong(`Harrowgate's railway station kept a clock that was eleven minutes ahead of the church clock. Shops hung a second clock face, and a few farmers ignored station time for decades.`, 'too-narrow'),
          wrong(`The railway company forced Harrowgate to change its clocks overnight by passing a national law. Residents had no choice in the matter, and the council vote was simply a formality.`, 'contradicts-text'),
        ], `The choice beginning "Harrowgate once set its clocks by the sun" traces the whole sequence without adding judgments. The choice saying residents "foolishly resisted" uses loaded words such as "foolishly" and "sensible," which make it a biased summary rather than an objective one.`),
        q(10, 'hard', `How does the description of the council vote in the final paragraph contribute to the central idea?`, [
          right(`By saying the vote only recognized what daily life had decided, it shows that the shared time grew from use rather than from a law.`),
          wrong(`By showing that the council led the change, it suggests that government action is what made standard time possible.`, 'reverses-relationship'),
          wrong(`By ending with a vote, it suggests that most residents never accepted railway time and were simply outvoted.`, 'unsupported-inference'),
          wrong(`By placing the vote last, it shows that the council was the first group in town to adopt railway time.`, 'misreads-sequence'),
        ], `The text says the vote "merely recognized what daily life had already decided," so the law followed the change and supports the idea of a gradual agreement. The choice saying the council was the first group to adopt railway time reverses that order, since newspapers, schools and the post office had already adopted railway time.`),
      ],
    },
    {
      code: 'rg11-main-idea-summary-p03',
      title: 'Letting the Tide Back In',
      body: `For most of the last century, the low fields along the fictional Calder Bay were farmland protected by an earthen wall. The wall, built by hand generations ago, kept the tides out so that farmers could graze cattle on land that had once been salt marsh. By the time the last farm family sold its land to the regional parks office, the wall was crumbling, and repairing it would have cost more than the fields were worth.\n\nPlanners chose a different approach. Instead of rebuilding the wall, they cut three wide gaps in it and let the sea return. Within two years, tidal water flowed in and out twice a day through a network of new channels. Salt-tolerant grasses, which had survived in thin strips along the old wall, spread across the flats.\n\nThe returning marsh did more than change the view. Marshes slow incoming water, and the dense grasses trap sediment carried by the tide. Over time, this sediment raises the level of the marsh surface, which helps it keep pace with gradually rising seas. Surveys at Calder Bay found that the restored flats gained height every year, while a nearby concrete seawall required constant repair.\n\nWildlife followed the water. Wading birds that had not nested in the area for decades began feeding in the shallow channels, and young fish used the sheltered pools as nurseries before moving out into the open bay. Local fishing crews reported larger catches of several species within a few seasons.\n\nThe project had costs. Some neighbors missed the open pastures, and a footpath along the wall had to be moved inland. Still, Calder Bay has become a model that coastal planners from other regions visit. It suggests that, in the right places, stepping back and allowing a natural system to recover can protect a shoreline as well as, or better than, building ever higher walls.`,
      items: [
        q(11, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`Letting the sea back into Calder Bay restored a marsh that protects the shore and supports wildlife, offering a model for other coasts.`),
          wrong(`The earthen wall at Calder Bay was built by hand generations ago so that farmers could graze cattle on the land.`, 'too-narrow'),
          wrong(`Every coastal town should tear down its seawalls at once and allow the ocean to flood its low fields.`, 'overgeneralization'),
          wrong(`Fishing crews at Calder Bay persuaded the parks office to cut gaps in the wall so they could catch more fish.`, 'unsupported-inference'),
        ], `The passage explains the decision, the shoreline and wildlife benefits, and the project's value as a model. The final paragraph limits the claim to "the right places," so the "every coastal town" choice overstates it.`),
        q(12, 'medium', `How do the passage's ideas about shoreline protection and wildlife relate to each other?`, [
          right(`Both result from the single choice to let the tide return, and together they build the case that restoration has several benefits.`),
          wrong(`They compete with each other, since the sediment that protects the shore also fills the pools that young fish need.`, 'unsupported-inference'),
          wrong(`Wildlife is the main idea, and shoreline protection is mentioned only as a minor side effect that planners did not expect.`, 'misreads-emphasis'),
          wrong(`Shoreline protection caused the wildlife to return, because the birds came back only after the concrete seawall was repaired.`, 'confuses-cause-effect'),
        ], `Paragraphs 3 and 4 each describe a benefit of the returning marsh, and paragraph 5 draws on both to present Calder Bay as a model. The passage never says sediment harms the fish nurseries.`),
        q(13, 'medium', `How does the third paragraph develop the central idea?`, [
          right(`It explains how the marsh protects the shore: grasses trap sediment that raises the surface as seas rise.`),
          wrong(`It describes the history of the earthen wall and why farmers wanted to keep the tides out.`, 'misreads-structure'),
          wrong(`It lists the drawbacks of the project, including the lost pastures and the moved footpath.`, 'misreads-structure'),
          wrong(`It argues that concrete seawalls are useless and should be removed from every shoreline.`, 'overgeneralization'),
        ], `Paragraph 3 describes how marshes slow water and trap sediment so the surface "keep[s] pace with gradually rising seas." The drawbacks appear in paragraph 5, not paragraph 3.`),
        q(14, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Instead of repairing a failing wall, planners at Calder Bay let the tide return. The marsh that grew back builds up sediment against rising seas and draws birds and fish, and despite some costs it now serves as a model.`),
          wrong(`Planners at Calder Bay made a brilliant decision that every other coast should copy. Neighbors who complained about losing their pastures and footpath were being short-sighted about the future.`, 'includes-opinion'),
          wrong(`Wading birds returned to Calder Bay after decades away, and young fish used the new pools as nurseries. Fishing crews soon reported larger catches of several kinds of fish in the bay.`, 'too-narrow'),
          wrong(`Calder Bay was farmland for a century until the parks office bought it. The parks office then rebuilt the old wall with concrete so that the fields would stay dry for good.`, 'contradicts-text'),
        ], `The choice beginning "Instead of repairing a failing wall" covers the decision, both benefits, the costs and the conclusion without judgment. The wildlife choice is accurate but leaves out the shoreline protection and the decision itself.`),
        q(15, 'hard', `What is the effect of the final paragraph's discussion of the project's costs?`, [
          right(`It acknowledges real drawbacks, which makes the closing claim measured: restoration works well "in the right places," not everywhere.`),
          wrong(`It undercuts the rest of the passage by suggesting that the project's costs were greater than its benefits.`, 'misreads-structure'),
          wrong(`It shifts the central idea from coastal protection to the importance of keeping footpaths open to the public.`, 'misreads-emphasis'),
          wrong(`It shows that the planners ignored local residents, which is the main lesson other regions should learn.`, 'unsupported-inference'),
        ], `After naming the costs, the paragraph turns with "Still" and limits its conclusion to "the right places," so the costs make the claim more careful rather than overturning it. Nothing suggests the costs outweighed the benefits.`),
      ],
    },
    {
      code: 'rg11-main-idea-summary-p04',
      title: 'Under the Yellow Varnish',
      body: `Visitors to a museum often assume that an old painting looks the way it did the day the artist finished it. In many cases, it does not. Over decades, the protective coat of varnish that painters brushed over their work can yellow and darken, turning a clear blue sky into a muddy green and dulling bright skin tones to brown. What looks like the artist's style may actually be the effect of time.\n\nRemoving that old varnish is one of the most delicate jobs a conservator does. Varnish and paint can both dissolve in the same kinds of solvents, so the conservator must find a mixture strong enough to soften the varnish but too weak to disturb the paint below. Working under magnification, often with small cotton swabs, a conservator may spend months cleaning a single canvas a few square inches at a time.\n\nModern conservators also follow a principle that earlier restorers did not always respect: anything added to a painting should be removable. When a conservator fills a small loss in the paint, the new material is chosen so that a future expert could take it out without harm. New varnish is selected for the same reason and for its resistance to yellowing.\n\nThis careful approach grew out of hard lessons. At the fictional Ostrava Art Hall, records show that a restorer in the 1920s cleaned a landscape so aggressively that the cleaning removed thin glazes of color the artist had applied on purpose. The painting has looked flat ever since, and nothing can bring those glazes back.\n\nCleaning also raises a question with no simple answer: how far back should a painting be returned? Some conservators argue that a slight warm tone is part of a work's history and should stay. Others aim for the brightest original colors that can be safely recovered. In practice, most decisions are made one painting at a time, after study and discussion.`,
      items: [
        q(16, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`Restoring old paintings by removing yellowed varnish requires careful, reversible methods and difficult judgment about how far to go.`),
          wrong(`Conservators often use small cotton swabs and magnifying tools when they clean the surface of an old canvas.`, 'too-narrow'),
          wrong(`Museums should remove all old varnish from their paintings so that visitors can see the true original colors.`, 'contradicts-text'),
          wrong(`Painters in the past used poor-quality varnish that was designed to change the colors of their work over time.`, 'unsupported-inference'),
        ], `The passage covers why varnish changes paintings, how delicately it is removed, the rule of removability and the open question of how far to clean. The choice saying museums should remove all old varnish ignores paragraph 5, where some conservators argue a warm tone should stay.`),
        q(17, 'easy', `Which detail best supports the idea that aged varnish changes how a painting looks?`, [
          right(`A clear blue sky can turn a muddy green as the varnish yellows and darkens.`),
          wrong(`A conservator may spend months cleaning one canvas a few inches at a time.`, 'wrong-supporting-detail'),
          wrong(`New fill material is chosen so a future expert could take it out without harm.`, 'wrong-supporting-detail'),
          wrong(`Most decisions about cleaning are made one painting at a time after discussion.`, 'wrong-supporting-detail'),
        ], `Paragraph 1 gives the example of a blue sky turning "a muddy green," which directly shows the varnish changing the image. The months of cleaning show how delicate removal is, not how varnish alters color.`),
        q(18, 'medium', `How does the fourth paragraph develop the idea introduced in the third?`, [
          right(`It gives an example of permanent damage, showing why conservators now insist that their work be reversible.`),
          wrong(`It introduces the question of how bright a cleaned painting should be, which the passage leaves unanswered.`, 'misreads-structure'),
          wrong(`It explains the chemistry of why varnish and paint dissolve in the same kinds of solvents.`, 'misreads-structure'),
          wrong(`It shows that the Ostrava landscape was successfully restored to its original bright colors.`, 'contradicts-text'),
        ], `Paragraph 4 opens with "This careful approach grew out of hard lessons" and describes glazes that "nothing can bring back," which explains the removability rule in paragraph 3. The brightness question appears in paragraph 5.`),
        q(19, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Old varnish can yellow and hide a painting's colors. Conservators remove it slowly with carefully chosen solvents, make their own additions removable after past damage, and decide case by case how far to clean.`),
          wrong(`Early restorers were reckless and destroyed many great works of art. Today's conservators are far wiser, and museums should trust them completely to decide how every painting ought to look.`, 'includes-opinion'),
          wrong(`At the Ostrava Art Hall, a restorer in the 1920s cleaned a landscape too aggressively. The cleaning removed thin glazes of color, and the painting has looked flat ever since.`, 'too-narrow'),
          wrong(`Varnish protects paintings from damage, so conservators add a fresh coat every few years. They choose bright varnish that makes old colors look newer than they were.`, 'contradicts-text'),
        ], `The choice beginning "Old varnish can yellow" covers the problem, the method, the principle and the open question without judgment. The Ostrava choice is accurate but summarizes only one example from paragraph 4.`),
        q(20, 'hard', `How do the passage's two central ideas, technical skill and judgment, interact over the course of the text?`, [
          right(`The passage first shows cleaning as a careful technical process, then reveals that even perfect technique cannot settle how far a painting should be returned.`),
          wrong(`The passage argues that technical skill matters more than judgment, since a skilled conservator never needs to discuss decisions.`, 'contradicts-text'),
          wrong(`The passage treats judgment as the cause of all past damage and technical skill as the cure that has solved every problem.`, 'oversimplifies'),
          wrong(`The passage keeps the two ideas separate, discussing judgment only in the opening and technique only at the end.`, 'misreads-structure'),
        ], `Paragraphs 2 through 4 focus on methods and the lessons behind them, and paragraph 5 adds a question "with no simple answer" that requires study and discussion. The final paragraph says decisions follow discussion, so the choice saying a skilled conservator never needs to discuss decisions contradicts the text.`),
      ],
    },
    {
      code: 'rg11-main-idea-summary-p05',
      title: 'Give Westmere Back Its Stars',
      body: `Ask anyone who grew up in the fictional town of Westmere about summer nights, and you will probably hear about the stars. Older residents describe lying in the field behind the school and tracing the pale band of the galaxy across the sky. Today a child in the same field would struggle to find more than a few dozen stars. The sky has not changed. Our lighting has.\n\nWestmere should adopt a dark-sky lighting standard for all new and replaced outdoor lights. This would not mean turning off streetlights or leaving sidewalks dark. It would mean using fixtures that point light down where people need it instead of up and sideways, choosing warmer, dimmer bulbs where bright white ones are unnecessary, and putting timers on lights that shine all night over empty parking lots.\n\nThe first reason is simple waste. A light that shines into the sky illuminates nothing anyone uses, yet the town still pays for the electricity. The town's own energy report found that a third of the lighting budget goes to fixtures that scatter much of their light upward. Shielded fixtures would let the town use lower-power bulbs and still light the ground just as well.\n\nThe second reason is the effect on living things. Night-flying insects gather around unshielded lights by the thousands, and many never leave. Migrating birds can be pulled off course by brightly lit buildings. Even people sleep less deeply when strong light leaks through bedroom windows.\n\nSome residents worry that less light will mean less safety. That concern deserves a serious answer. Glare from unshielded lights actually makes it harder to see into shadows, while shielded lights spread even light across a sidewalk without blinding drivers or walkers. Safety depends on light reaching the right places, not on the total amount poured into the night.\n\nA lighting standard asks little of anyone and offers a great deal back: lower bills, healthier wildlife and, on clear nights, a sky our grandparents would recognize.`,
      items: [
        q(21, 'easy', `Which statement best expresses the writer's central claim?`, [
          right(`Westmere should adopt a dark-sky lighting standard because it saves money and protects wildlife without reducing safety.`),
          wrong(`Westmere should turn off its streetlights at night so that residents can see the stars from every street.`, 'contradicts-text'),
          wrong(`Older residents of Westmere remember seeing the pale band of the galaxy from the field behind the school.`, 'too-narrow'),
          wrong(`Night-flying insects gather around lights by the thousands, and many of them never manage to leave.`, 'too-narrow'),
        ], `Paragraph 2 states the claim, and paragraphs 3 through 5 give the reasons and answer the safety concern. The writer says the standard "would not mean turning off streetlights," so the choice about turning off streetlights contradicts the text.`),
        q(22, 'easy', `Which two reasons does the writer develop to support the central claim?`, [
          right(`Upward light wastes money, and unshielded light harms insects, birds and people's sleep.`),
          wrong(`Bright lights cause traffic accidents, and dim lights help the town attract tourists.`, 'unsupported-inference'),
          wrong(`Stars are beautiful, and the school field is the best place in town to see them.`, 'misreads-emphasis'),
          wrong(`Warm bulbs last longer, and timers are easy for the town to install in parking lots.`, 'misreads-detail'),
        ], `Paragraph 3 begins "The first reason is simple waste," and paragraph 4 begins "The second reason is the effect on living things." The stars appear as framing in the opening and closing, not as one of the two stated reasons.`),
        q(23, 'medium', `How does the fifth paragraph contribute to the development of the writer's argument?`, [
          right(`It answers the safety objection by arguing that shielded lights help people see better than glaring ones.`),
          wrong(`It admits that the proposal will make Westmere less safe but argues that the stars are worth the risk.`, 'contradicts-text'),
          wrong(`It adds a third reason for the standard: that dimmer streets will encourage people to stay home at night.`, 'unsupported-inference'),
          wrong(`It summarizes the energy report's findings about how much of the lighting budget is wasted each year.`, 'misreads-structure'),
        ], `Paragraph 5 names the worry about safety and replies that glare "makes it harder to see into shadows" while shielded lights spread even light. The writer never concedes that the town will be less safe.`),
        q(24, 'medium', `Which is the best objective summary of the passage?`, [
          right(`The writer argues that Westmere should require downward, dimmer and timed outdoor lights. The writer says this would cut wasted energy and harm to wildlife, and claims shielded lights are as safe as glaring ones.`),
          wrong(`Westmere has wasted a third of its lighting budget for years and ruined the night sky. The town must act now, and anyone who opposes the standard simply does not care about wildlife or the stars.`, 'includes-opinion'),
          wrong(`Older people in Westmere remember a sky full of stars, but children today can see only a few dozen. The writer misses the way the town used to look at night.`, 'too-narrow'),
          wrong(`The writer argues that Westmere should remove all outdoor lighting because studies prove that lighting does not improve safety and only harms insects and birds.`, 'distorts-claim'),
        ], `An objective summary of an argument reports what the writer claims without taking sides, as the choice beginning "The writer argues that Westmere should require downward" does. The choice saying anyone who opposes the standard "simply does not care" adopts the writer's position and adds its own attack on opponents.`),
        q(25, 'hard', `How do the opening paragraph and the final sentence work together to shape the argument?`, [
          right(`The opening describes a lost sky, and the ending presents the standard as a way to recover it, framing the practical reasons with a shared sense of loss.`),
          wrong(`The opening states that the sky itself has changed, and the ending admits that lighting cannot restore what has been lost.`, 'contradicts-text'),
          wrong(`The opening and ending focus on cost, which shows that saving money is the writer's only real concern.`, 'misreads-emphasis'),
          wrong(`The opening introduces the safety objection, and the ending proves that the objection was correct all along.`, 'misreads-structure'),
        ], `The first paragraph ends "The sky has not changed. Our lighting has," and the last sentence promises "a sky our grandparents would recognize," so the two frame the money and wildlife reasons. The choice saying the opening states that the sky itself has changed contradicts the opening's statement that the sky has not changed.`),
      ],
    },
    {
      code: 'rg11-main-idea-summary-p06',
      title: 'Eight Rowers, One Rhythm',
      body: `To a spectator on the riverbank, a rowing crew looks like eight people pulling as hard as they can. Strength matters, but coaches will tell you that the fastest boats are not always the strongest. They are the boats in which every rower moves in the same rhythm, so that the boat runs smoothly between strokes instead of lurching.\n\nThe reason lies in how a racing shell moves. The boat is long, narrow and light, and it slows down every time the rowers slide forward to take the next stroke. If one rower's blade enters the water a fraction of a second early, it acts briefly as a brake. If another pulls out late, the boat tips to one side and the others must correct it, wasting effort. A crew of powerful but unmatched rowers can lose to a weaker crew that moves as one.\n\nFor this reason, training focuses heavily on timing. Crews spend long sessions rowing at low pressure, concentrating on matching the moment each blade catches the water. Many boats carry a small device that records the boat's speed many times per second, and coaches study the graphs for dips that reveal when a rower is out of time. The person sitting nearest the stern, called the stroke, sets the rhythm, and everyone else follows that rower's movements.\n\nAt the fictional Linwood Rowing Club, coaches tested this idea over one season. Instead of selecting their top eight athletes by strength scores alone, they rotated rowers through lineups and kept the combination whose speed graph was smoothest. That crew included two rowers with below-average strength scores, yet it finished the season with the club's fastest times.\n\nThe lesson reaches beyond rowing. In many group efforts, from orchestras to relay teams, the combined result depends not only on what each member can do alone but on how well their efforts fit together.`,
      items: [
        q(26, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`In rowing, and in many group efforts, how well members work in rhythm can matter more than raw strength.`),
          wrong(`The rower who sits nearest the stern of the boat is called the stroke and sets the rhythm for the crew.`, 'too-narrow'),
          wrong(`Strength does not matter at all in rowing, so coaches should choose crews only by timing and rhythm.`, 'overgeneralization'),
          wrong(`Rowing is the most difficult team sport, because a single mistake by any rower can tip the boat over.`, 'unsupported-inference'),
        ], `The passage explains why timing matters, how crews train for it, a test at Linwood and a broader lesson. The text says "Strength matters," so the claim that it does not matter at all goes too far.`),
        q(27, 'medium', `How does the second paragraph develop the central idea?`, [
          right(`It explains the physical reason timing matters: a blade in early acts as a brake and a late one tips the boat.`),
          wrong(`It describes how coaches use speed graphs to discover which rowers are out of time with the crew.`, 'misreads-structure'),
          wrong(`It reports the results of a season-long test in which a smoother crew beat a stronger one.`, 'misreads-structure'),
          wrong(`It argues that racing shells should be redesigned to be heavier so they do not slow between strokes.`, 'unsupported-inference'),
        ], `Paragraph 2 opens "The reason lies in how a racing shell moves" and explains how early or late blades waste speed. The speed graphs appear in paragraph 3 and the season test in paragraph 4.`),
        q(28, 'medium', `Which detail best supports the idea that coordination can outweigh strength?`, [
          right(`A Linwood crew with two below-average rowers posted the club's fastest times.`),
          wrong(`Crews spend long sessions rowing at low pressure to practice their timing.`, 'wrong-supporting-detail'),
          wrong(`A racing shell is long, narrow and light, and it slows between strokes.`, 'wrong-supporting-detail'),
          wrong(`Spectators often think a crew is simply eight people pulling very hard.`, 'wrong-supporting-detail'),
        ], `The Linwood result in paragraph 4 shows a smoother crew with weaker members beating stronger lineups. Low-pressure practice shows that coaches value timing but does not show timing winning over strength.`),
        q(29, 'medium', `Which is the best objective summary of the passage?`, [
          right(`A racing shell loses speed when rowers are out of time, so crews train hard to match their strokes. At one club, the smoothest lineup was fastest despite weaker members, a lesson that applies to other group efforts.`),
          wrong(`Rowing coaches have wrongly focused on strength for too long. Every coach should follow Linwood's excellent example and stop choosing athletes by how strong they are.`, 'includes-opinion'),
          wrong(`Many racing boats carry a device that records speed many times per second. Coaches look at the graphs for dips, and the stroke sets the rhythm for everyone else.`, 'too-narrow'),
          wrong(`Strong rowers often tip the boat, so coaches at Linwood removed their strongest athletes. The crew with no strong rowers then won every race of the season.`, 'distorts-detail'),
        ], `The choice beginning "A racing shell loses speed" covers the cause, the training, the Linwood test and the broader lesson without judgment. The choice saying the crew "won every race" distorts paragraph 4, which says only two rowers had below-average scores and the crew had the club's fastest times, not that it won every race.`),
        q(30, 'hard', `How does the final paragraph extend the central idea developed in the rest of the passage?`, [
          right(`It turns a point about rowing into a general principle that a group's result depends on how members' efforts fit together.`),
          wrong(`It introduces a contrasting idea, that in orchestras and relay teams individual skill matters more than teamwork.`, 'contradicts-text'),
          wrong(`It narrows the focus to the stroke, showing that one leader decides the success of any group.`, 'misreads-emphasis'),
          wrong(`It repeats the Linwood results in more detail to prove that the experiment was carried out fairly.`, 'misreads-structure'),
        ], `The final paragraph says "The lesson reaches beyond rowing" and applies it to orchestras and relay teams, broadening the idea. It says results depend on how efforts "fit together," which is the opposite of the choice claiming individual skill matters more than teamwork.`),
      ],
    },
    {
      code: 'rg11-main-idea-summary-p07',
      title: 'Why Bridges Have Gaps',
      body: `Drive across a long highway bridge and you may feel a soft thump every few hundred feet as your tires roll over a metal strip set into the road. Those strips cover expansion joints, gaps that engineers leave on purpose. Without them, the bridge would slowly tear itself apart.\n\nThe problem is temperature. Steel and concrete expand as they warm and contract as they cool. The change in any single foot of material is tiny, but across a span hundreds of feet long, it adds up. A steel bridge deck in a climate with hot summers and cold winters can change length by several inches over a year. If both ends were fixed solidly in place, that movement would have nowhere to go, and the stress would crack the concrete, buckle the deck or push against the supports.\n\nExpansion joints give the movement a place to happen. Some joints are simple, with interlocking steel teeth that slide past one another like the fingers of two hands. Larger bridges use joints made of several rubber seals and steel beams that can open and close over a wide range. Under the deck, bearings let the bridge slide slightly on its supports instead of dragging them along.\n\nThe joints solve one problem but create another. Because they are gaps, they let water, road salt and grit fall onto the structure below, where they can rust steel and weaken concrete. Joints also wear out faster than most other parts of a bridge, and replacing one usually means closing lanes. For this reason, engineers designing shorter bridges increasingly try to avoid joints entirely, building the deck and supports as one flexible unit that bends slightly as temperatures change.\n\nWhether engineers add joints or design around them, the goal is the same: a structure that accepts the fact that its materials move. A bridge stays standing not by resisting every force but by allowing for the ones it cannot stop.`,
      items: [
        q(31, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`Because bridge materials expand and shrink with temperature, engineers design bridges to allow that movement rather than resist it.`),
          wrong(`Drivers can feel a soft thump every few hundred feet as their tires roll over metal strips on long bridges.`, 'too-narrow'),
          wrong(`Expansion joints are a poor design choice, and engineers have stopped using them on every kind of bridge.`, 'overgeneralization'),
          wrong(`Road salt is the greatest danger to bridges, because it causes steel to rust and concrete to weaken.`, 'misreads-emphasis'),
        ], `The final paragraph states the idea that ties the passage together: a bridge must accept "the fact that its materials move." Paragraph 4 says only shorter bridges increasingly avoid joints, so the choice saying engineers have stopped using joints on every kind of bridge overstates it.`),
        q(32, 'medium', `How do the ideas in the third and fourth paragraphs interact?`, [
          right(`Paragraph 3 presents joints as the answer to thermal movement, and paragraph 4 shows that this answer brings new problems, leading some engineers toward jointless designs.`),
          wrong(`Paragraph 3 argues that joints are unnecessary, and paragraph 4 provides evidence that bridges without joints never need any repairs.`, 'contradicts-text'),
          wrong(`Paragraph 3 explains why concrete cracks in winter, and paragraph 4 explains why steel buckles in the heat of summer.`, 'misreads-structure'),
          wrong(`Paragraph 3 and paragraph 4 describe the same kind of joint in two different climates, one wet and one dry.`, 'misreads-detail'),
        ], `Paragraph 3 begins "Expansion joints give the movement a place to happen," and paragraph 4 begins "The joints solve one problem but create another." Nothing in the passage says jointless bridges need no repairs.`),
        q(33, 'medium', `What role does the second paragraph play in developing the central idea?`, [
          right(`It explains the cause that makes joints necessary: small temperature changes add up to inches of movement across a long span.`),
          wrong(`It describes the different kinds of joints, from interlocking steel teeth to rubber seals and steel beams.`, 'misreads-structure'),
          wrong(`It warns drivers that bridges are unsafe in very hot summers and very cold winters.`, 'unsupported-inference'),
          wrong(`It shows that engineers prefer flexible, jointless designs for shorter bridges today.`, 'misreads-structure'),
        ], `Paragraph 2 opens "The problem is temperature" and explains how expansion adds up over a long deck. The kinds of joints come in paragraph 3, after this cause has been established.`),
        q(34, 'hard', `Which is the best objective summary of the passage?`, [
          right(`Bridges change length as temperatures rise and fall, so engineers add joints and bearings that let them move. Since joints let in water and wear out, some shorter bridges are built as flexible units without them.`),
          wrong(`Bridges change length as temperatures rise and fall, which is why every bridge is now built as one flexible unit. Old joints let in water and wear out, so engineers are removing them everywhere.`, 'overgeneralization'),
          wrong(`Bridges change length as temperatures rise and fall, and this movement is a serious danger to drivers. Anyone crossing a long bridge in winter should worry about cracks and buckling decks.`, 'includes-opinion'),
          wrong(`Bridge joints use interlocking steel teeth that slide past each other like fingers. Larger bridges use rubber seals and steel beams, and bearings let the deck slide on its supports.`, 'too-narrow'),
        ], `The choice ending "some shorter bridges are built as flexible units without them" covers the cause, the solution, its drawbacks and the newer approach accurately. The choice ending "engineers are removing them everywhere" sounds similar but claims "every bridge" is now jointless, while paragraph 4 says only shorter bridges increasingly avoid joints.`),
        q(35, 'hard', `Which statement best describes how the central idea is developed across the whole passage?`, [
          right(`The passage moves from a familiar experience, to its cause, to a solution and its tradeoffs, and ends with a principle that connects them.`),
          wrong(`The passage begins with a general principle, then gives a single extended example that proves the principle beyond doubt.`, 'misreads-structure'),
          wrong(`The passage compares two engineers' opposing views and concludes by explaining why one of them is correct.`, 'misreads-structure'),
          wrong(`The passage lists bridge parts in order from the road surface down to the supports, with no larger point.`, 'misses-central-idea'),
        ], `The passage opens with the thump drivers feel, explains temperature in paragraph 2, joints in paragraph 3, drawbacks in paragraph 4 and the principle of allowing movement in paragraph 5. The principle comes at the end, not the beginning.`),
      ],
    },
    {
      code: 'rg11-main-idea-summary-p08',
      title: 'Voices of Brackenridge',
      body: `When the fictional mill town of Brackenridge marked its two hundredth anniversary, the public library's local history room held hundreds of documents: deeds, council minutes, newspaper clippings and the payroll books of the old textile mill. What it lacked were the voices of the people who had actually worked the looms, run the corner shops and raised families in the brick row houses along the river.\n\nA group of high school students set out to fill that gap. With help from a librarian, they spent a school year recording interviews with forty older residents. Before each interview, the students studied the topic, prepared open questions, and learned to let silences stretch so that speakers had time to remember. Each recording was then transcribed, checked with the speaker, and stored in the library with a short summary.\n\nThe interviews added details that no official record contained. The mill's payroll books listed wages and hours, but former workers described the roar of the machines, the system of hand signals they used because no one could hear over the noise, and the lunch hours spent on the riverbank. One woman explained how families pooled money to help a neighbor whose house had flooded, an event the newspaper had covered in a single sentence.\n\nOral histories have limits, and the students learned to treat them carefully. Memories fade and sometimes shift over decades, and two residents might describe the same event in different ways. The students compared interviews with each other and with written records, noting where accounts agreed and where they differed rather than choosing one version as the truth.\n\nThe collection is now among the most requested materials in the library. Teachers use it in local history units, and families visit to hear a grandparent's voice. The project showed that a town's history lives not only in its files but in its people, and that gathering those voices responsibly takes patience, preparation and a habit of checking.`,
      items: [
        q(36, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`The students' oral history project showed that people's memories add to a town's history, if they are gathered and checked with care.`),
          wrong(`The Brackenridge library held deeds, council minutes, newspaper clippings and the payroll books of the old mill.`, 'too-narrow'),
          wrong(`Written records are unreliable, so towns should base their histories only on the memories of older residents.`, 'contradicts-text'),
          wrong(`Former mill workers in Brackenridge used hand signals because the machines were too loud for them to hear.`, 'too-narrow'),
        ], `The final paragraph states both parts of the idea: history lives "in its people," and gathering it "responsibly takes patience, preparation and a habit of checking." The students checked interviews against written records, so the choice saying written records are unreliable contradicts the text.`),
        q(37, 'medium', `Which two central ideas does the passage develop?`, [
          right(`Oral histories capture details missing from official records, and they must be collected and compared carefully because memory changes.`),
          wrong(`Textile mills were loud and difficult places to work, and their payroll books show that wages were very low.`, 'unsupported-inference'),
          wrong(`Libraries are more popular than they used to be, and teachers now prefer recordings to printed sources.`, 'overgeneralization'),
          wrong(`High school students are better historians than adults, and librarians should let them run local archives.`, 'unsupported-inference'),
        ], `Paragraph 3 shows the details that "no official record contained," and paragraph 4 explains why the students treated memories carefully. The passage never comments on whether wages were low.`),
        q(38, 'medium', `How does the third paragraph develop the central idea?`, [
          right(`It gives concrete examples, such as hand signals and a neighbor's flood, of what the interviews added to written records.`),
          wrong(`It explains the steps the students followed to prepare questions and transcribe each recording.`, 'misreads-structure'),
          wrong(`It shows that the newspaper made serious errors when it reported on the flood in Brackenridge.`, 'unsupported-inference'),
          wrong(`It describes how teachers and families now use the collection after it was placed in the library.`, 'misreads-structure'),
        ], `Paragraph 3 opens "The interviews added details that no official record contained" and then gives examples. The newspaper covered the flood "in a single sentence," which shows brevity, not error.`),
        q(39, 'hard', `How does the fourth paragraph interact with the third to shape the central idea?`, [
          right(`After the third paragraph shows the value of personal accounts, the fourth adds that they need checking, so the central idea joins value with caution.`),
          wrong(`The fourth paragraph cancels the third by showing that the interviews were too unreliable to be kept in the library.`, 'misreads-structure'),
          wrong(`The fourth paragraph proves that the written records were wrong whenever they disagreed with what residents remembered.`, 'contradicts-text'),
          wrong(`The fourth paragraph repeats the examples from the third, adding more details about lunch hours on the riverbank.`, 'misreads-structure'),
        ], `Paragraph 4 says memories "fade and sometimes shift," and the students noted agreements and differences "rather than choosing one version as the truth," which qualifies the value shown in paragraph 3. The collection was kept and is heavily used, so the choice saying the interviews were too unreliable to keep is wrong.`),
        q(40, 'hard', `Which is the best objective summary of the passage?`, [
          right(`Brackenridge's library had many documents but few personal voices, so students recorded forty residents. The interviews added details missing from records, and the students compared accounts because memories can change.`),
          wrong(`Brackenridge's library had many documents but few personal voices, so students recorded forty residents. Their interviews finally revealed the true story of the town that the official records had hidden.`, 'distorts-claim'),
          wrong(`Brackenridge's students did remarkable and inspiring work that every town should copy. Their recordings are far more meaningful than the dull deeds and council minutes in the library.`, 'includes-opinion'),
          wrong(`Former mill workers described the roar of the machines, their hand signals and lunch hours by the river. One woman told how families pooled money to help a flooded neighbor.`, 'too-narrow'),
        ], `The choice ending "the students compared accounts because memories can change" covers the gap, the project, what it added and the careful checking without judgment. The choice ending "the true story of the town" begins the same way but claims the interviews revealed "the true story," which ignores paragraph 4, where students declined to choose one version as the truth.`),
      ],
    },
  ],
}

export default skill
