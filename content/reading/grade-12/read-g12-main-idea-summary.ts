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
  slug: 'read-g12-main-idea-summary',
  subject: 'reading',
  grade: 12,
  group: 'Informational text',
  name: 'Main Idea and Summary',
  standards: ['RI.11-12.2'],
  passages: [
    {
      code: 'rg12-main-idea-summary-p01',
      title: 'Water from the Morning Fog',
      body: `Along the dry coast near the fictional village of Alto Seco, rain falls only a few days each year, yet thick fog rolls in from the ocean on most mornings. For generations, residents watched that moisture drift past their homes without any way to keep it. Water arrived by truck, and families stored it in barrels that had to last until the next delivery.\n\nAbout fifteen years ago, a cooperative of farmers and an engineer named Teodora Quispe began testing a simple idea. They stretched fine plastic mesh between tall poles on a ridge facing the sea. As fog passes through the mesh, tiny droplets collide with the threads, merge into larger drops, and run down into a gutter. From there, pipes carry the water to a covered tank in the village.\n\nThe early results were modest. A single panel collected only a few buckets on a good day, and strong winds tore several nets during the first winter. Rather than abandon the project, the cooperative adjusted the design. They switched to a double layer of mesh, angled the panels toward the prevailing wind, and added cables so the frames could flex instead of snapping. Within three years, the ridge held forty panels that together supplied enough water for drinking and for a small greenhouse.\n\nThe nets have limits that the cooperative is careful to acknowledge. They work only where fog is frequent and the wind is steady, and the yield drops sharply in the clear months of late summer. Each panel also needs regular cleaning, because dust and salt clog the mesh. The village still pays for a truck delivery during the driest weeks.\n\nEven so, the project changed daily life in Alto Seco. Families spend less on water, the greenhouse grows vegetables that once came from far inland, and young residents have learned to repair the panels. Visitors from other coastal towns now come to study the ridge, not because fog nets solve every water problem, but because the village showed how patient adjustment can turn a local resource into a dependable one.`,
      items: [
        q(1, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`By patiently refining a simple mesh design, Alto Seco turned frequent fog into a useful, though limited, water supply.`),
          wrong(`Fog nets collect water when tiny droplets strike plastic threads, merge into drops, and run into a gutter.`, 'too-narrow'),
          wrong(`Fog nets have now replaced truck deliveries and solved the water problems of every dry coastal town.`, 'contradicts-text'),
          wrong(`Strong coastal winds make fog collection impossible, so villages should rely on trucks and barrels.`, 'contradicts-text'),
        ], `The passage traces the village from no way to use fog, through failures and adjustments, to a dependable but limited supply. The second choice describes only the mechanism in paragraph 2, not the passage as a whole.`),
        q(2, 'easy', `Which detail from the passage most directly supports the idea that adjustments made the project succeed?`, [
          right(`The cooperative switched to a double layer of mesh, angled the panels, and added cables so frames could flex.`),
          wrong(`For generations, residents watched the fog drift past their homes without any way to keep it.`, 'irrelevant-detail'),
          wrong(`Each panel needs regular cleaning, because dust and salt clog the fine plastic mesh.`, 'confuses-limit-with-support'),
          wrong(`Visitors from other coastal towns now come to the village to study the ridge.`, 'confuses-effect-with-cause'),
        ], `Paragraph 3 lists the specific changes that followed the early failures and led to forty working panels. The cleaning detail describes a limit of the nets, not a reason they succeeded.`),
        q(3, 'medium', `How does the fourth paragraph contribute to the development of the central idea?`, [
          right(`It qualifies the success story by naming the conditions and upkeep the nets require, so the claim stays balanced.`),
          wrong(`It reverses the central idea by showing that the project failed and the village returned to truck deliveries.`, 'overstates-contrast'),
          wrong(`It explains the scientific process by which droplets merge on the mesh and run into the gutter.`, 'misreads-structure'),
          wrong(`It introduces a new central idea about the dangers of dust and salt for coastal communities.`, 'misreads-structure'),
        ], `Paragraph 4 admits that the nets need fog, wind and cleaning, and that trucks still come in dry weeks, which limits rather than cancels the success. The village did not return to trucks entirely, as paragraph 5 shows.`),
        q(4, 'medium', `Which is the best objective summary of the passage?`, [
          right(`A dry coastal village began catching fog with mesh panels. After early failures, design changes made the nets productive enough for drinking water and a greenhouse, though they depend on weather and upkeep.`),
          wrong(`A dry coastal village built a brilliant system of fog nets that every desert town should copy. The engineer's clever design proves that technology can solve any shortage if people work hard enough.`, 'includes-opinion'),
          wrong(`A coastal village stretched plastic mesh between poles on a ridge facing the sea. Fog droplets collide with the threads, merge into drops, and run down into a gutter that leads to a tank.`, 'too-narrow'),
          wrong(`A coastal village tried fog nets, but strong winds tore them in the first winter. Because the yield drops in late summer, the village decided that trucks remain its only reliable source.`, 'misreads-outcome'),
        ], `The first choice covers the problem, the adjustments, the results and the limits without judgment. The second adds praise and a claim the passage never makes.`),
        q(5, 'hard', `How does the final sentence refine the central idea of the passage?`, [
          right(`It shifts the lesson from the nets themselves to the process of patient adjustment that made a local resource reliable.`),
          wrong(`It suggests that the main achievement of the project was attracting visitors and tourism to the village.`, 'literal-reading'),
          wrong(`It claims that fog nets are the best solution for water shortages in all coastal regions.`, 'contradicts-text'),
          wrong(`It implies that the village regrets depending on fog and wants to return to delivered water.`, 'unsupported-inference'),
        ], `The sentence says visitors come "not because fog nets solve every water problem" but because of "patient adjustment," which names the deeper lesson. The visitors are evidence for that lesson, not the achievement itself.`),
      ],
    },
    {
      code: 'rg12-main-idea-summary-p02',
      title: 'When Every Town Kept Its Own Time',
      body: `Before the railways reached the fictional province of Merrow, each town set its clocks by the sun. Noon was the moment the sun stood highest over the town square, so a clock in the eastern port of Calder ran several minutes ahead of one in the western mill town of Fenwick. Nobody minded, because few people traveled far enough or fast enough to notice the difference.\n\nThe railway changed that. When the Merrow Line opened, a single train might stop in a dozen towns, each with its own version of the time. Printed timetables became nearly impossible to read, since a departure listed for nine o'clock meant something different at every station. Passengers missed connections, and on single tracks, where trains in opposite directions had to wait for each other, confusion about the time created real hazards.\n\nIn response, the railway company adopted one standard time for its whole network, based on the clock at its headquarters in Calder. Station clocks displayed railway time, and conductors carried watches set to it. For a while, many towns kept two clocks side by side, one for the railway and one for the sun, and residents had to think about which one an appointment meant.\n\nThe change met resistance. Some people argued that time belonged to the sun and to each community, not to a business. A newspaper in Fenwick complained that its readers were being told to eat lunch by a clock in another city. Yet the convenience of a shared time slowly won out. Shops, schools and courts began to follow railway time, and two decades after the line opened, the provincial assembly made it the legal time for all of Merrow.\n\nThe episode shows how a new technology can quietly reshape habits that once seemed natural. Local solar time had made sense when communities lived mostly apart. Once fast travel tied those communities together, they needed a common measure, and the clock on the wall came to reflect the network rather than the sky.`,
      items: [
        q(6, 'easy', `What is the central idea of the passage?`, [
          right(`The railway's need for coordinated schedules led Merrow to replace local sun time with one shared standard time.`),
          wrong(`Clocks in the eastern port of Calder ran several minutes ahead of clocks in the western town of Fenwick.`, 'too-narrow'),
          wrong(`Newspapers in Merrow successfully defended local sun time against the demands of the railway company.`, 'contradicts-text'),
          wrong(`Railway travel in Merrow was dangerous because the company's trains frequently collided on single tracks.`, 'overgeneralization'),
        ], `Each paragraph follows the move from sun time to railway time and then to legal standard time. The difference between Calder and Fenwick is one example used to explain the starting situation.`),
        q(7, 'easy', `Which detail best supports the idea that local time caused problems for the railway?`, [
          right(`A departure listed for nine o'clock meant something different at every station, so passengers missed connections.`),
          wrong(`Noon was the moment the sun stood highest over each town square in the province.`, 'irrelevant-detail'),
          wrong(`Shops, schools and courts gradually began following railway time in their daily business.`, 'confuses-effect-with-cause'),
          wrong(`Some people argued that time belonged to the sun and to each community, not a business.`, 'confuses-objection-with-support'),
        ], `Paragraph 2 explains that timetables became confusing and connections were missed because each station kept its own time. The detail about noon only defines sun time and shows no problem.`),
        q(8, 'medium', `How does the third paragraph develop the central idea?`, [
          right(`It describes the company's first solution and shows that, for a time, sun time and railway time existed side by side.`),
          wrong(`It explains why travelers before the railway never noticed the small differences between town clocks.`, 'misreads-structure'),
          wrong(`It presents the provincial law that made railway time the legal time for all of Merrow.`, 'misplaces-detail'),
          wrong(`It argues that conductors were responsible for most of the confusion about departure times.`, 'unsupported-inference'),
        ], `Paragraph 3 introduces the company's standard time and the period of "two clocks side by side," a step between local time and the later law. The law appears in paragraph 4, not paragraph 3.`),
        q(9, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Merrow's towns once set clocks by the sun. Railway schedules made this confusing and unsafe, so the company used one standard time, which spread despite objections and later became law.`),
          wrong(`Merrow's towns once set clocks by the sun, which was a wiser and more natural system. The railway company forced its own time on the province, and residents lost something valuable.`, 'includes-opinion'),
          wrong(`The Merrow Line stopped in a dozen towns, and its timetables were hard to read. Passengers missed connections, and trains waiting on single tracks faced real hazards.`, 'too-narrow'),
          wrong(`Merrow's towns set clocks by the sun until a Fenwick newspaper proposed a shared time. The assembly agreed at once, and the railway then adjusted its schedules.`, 'confuses-sequence'),
        ], `The first choice gives the full sequence from sun time to law without judging it. The second adds the opinion that sun time was "wiser" and that residents "lost something valuable," which the passage does not state.`),
        q(10, 'hard', `How does the final paragraph relate the specific history of Merrow to a broader idea?`, [
          right(`It treats the Merrow story as an example of how new technology can reshape habits that once seemed natural.`),
          wrong(`It suggests that Merrow should restore local sun time now that fewer people travel by train.`, 'unsupported-inference'),
          wrong(`It repeats the timeline of events so the reader can memorize the order in which they happened.`, 'misreads-structure'),
          wrong(`It argues that businesses should never be allowed to influence how a community measures time.`, 'includes-opinion'),
        ], `The final paragraph begins "The episode shows how a new technology can quietly reshape habits," generalizing beyond Merrow. The view that businesses should not influence time belongs to the objectors in paragraph 4, not to the author.`),
      ],
    },
    {
      code: 'rg12-main-idea-summary-p03',
      title: 'Cooling a City from the Rooftops',
      body: `On a summer afternoon, a dark rooftop can become far hotter than the air around it. Asphalt shingles and tar absorb most of the sunlight that strikes them and release that energy as heat, both into the building below and into the surrounding streets. Multiply that effect across thousands of roofs, and an entire city can stay several degrees warmer than nearby farmland, especially at night.\n\nIn the fictional city of Corvana, planners decided to test whether lighter roofs could reduce that extra heat. With funding from the city, crews applied a pale reflective coating to three hundred roofs in two neighborhoods, including apartment buildings, a library and several small stores. Researchers placed sensors on those roofs and on similar dark roofs nearby, then compared readings over two summers.\n\nThe results were striking. On the hottest days, coated roofs stayed much cooler at the surface than uncoated ones, and the top floors beneath them were noticeably more comfortable. Residents of coated apartment buildings used their air conditioners less, which lowered their electric bills. Street temperatures in the test neighborhoods dropped slightly, though the change was smaller than the change on the roofs themselves.\n\nThe study also revealed trade-offs. In winter, the coated buildings lost some of the free warmth that dark roofs would have absorbed, so heating costs rose a little. The coatings gathered dirt and needed washing or reapplication every few years to stay reflective. A few neighbors in taller buildings complained about glare from the bright surfaces below their windows.\n\nThe planners concluded that reflective roofs are a useful tool but not a complete answer. Because the benefit to streets was modest, they recommended pairing coatings with shade trees and with pale paving in parking lots. Corvana now offers small grants for roof coatings while expanding its tree planting program, treating the rooftop project as one part of a wider effort to keep the city livable as summers grow hotter.`,
      items: [
        q(11, 'easy', `Which statement best captures the central idea of the passage?`, [
          right(`Corvana's test showed that reflective roofs reduce heat in useful ways but work best as one part of a broader cooling plan.`),
          wrong(`Dark asphalt shingles and tar absorb most of the sunlight that strikes them and release it as heat.`, 'too-narrow'),
          wrong(`Reflective roof coatings are too costly and inconvenient for cities to use, so Corvana abandoned them.`, 'contradicts-text'),
          wrong(`Planting shade trees is the only effective way for a city to lower its summer temperatures.`, 'overgeneralization'),
        ], `The passage explains the problem, describes the test, weighs results and trade-offs, and ends with coatings as "one part of a wider effort." The second choice is only the opening explanation.`),
        q(12, 'easy', `Which detail best supports the claim that the coatings helped residents?`, [
          right(`Residents of coated apartment buildings used their air conditioners less and paid lower electric bills.`),
          wrong(`Crews applied the coating to apartment buildings, a library and several small stores.`, 'irrelevant-detail'),
          wrong(`In winter, coated buildings lost some free warmth, so heating costs rose a little.`, 'confuses-limit-with-support'),
          wrong(`Researchers placed sensors on coated roofs and on similar dark roofs nearby.`, 'confuses-method-with-result'),
        ], `Paragraph 3 reports lower air conditioning use and lower bills, a direct benefit to residents. The sensor detail explains how the study was done, not what it found.`),
        q(13, 'medium', `How do the third and fourth paragraphs work together to develop the central idea?`, [
          right(`The third reports the benefits of the coatings, and the fourth presents costs, which together support a measured conclusion.`),
          wrong(`The third describes the study's method, and the fourth reports its single main result.`, 'misreads-structure'),
          wrong(`Both paragraphs list benefits, which shows the coatings had no meaningful disadvantages.`, 'contradicts-text'),
          wrong(`The third presents the planners' opinion, and the fourth presents the residents' opposing opinion.`, 'misreads-structure'),
        ], `Paragraph 3 opens "The results were striking" and lists gains, while paragraph 4 opens "The study also revealed trade-offs." Together they lead to the balanced conclusion in paragraph 5.`),
        q(14, 'medium', `Which statement would NOT belong in an objective summary of the passage?`, [
          right(`Corvana's planners wisely refused to waste money on a flashy rooftop experiment that only partly worked.`),
          wrong(`Corvana coated three hundred roofs and compared them with nearby dark roofs over two summers.`, 'belongs-in-summary'),
          wrong(`Coated roofs stayed cooler and lowered cooling costs, but heating costs and upkeep rose somewhat.`, 'belongs-in-summary'),
          wrong(`The city now pairs grants for coatings with tree planting to keep neighborhoods cooler.`, 'belongs-in-summary'),
        ], `An objective summary avoids judgments like "wisely" and "flashy," and this statement also misstates the outcome, since Corvana still offers grants for coatings. The other three choices accurately restate key points.`),
        q(15, 'hard', `Why does the passage mention that the drop in street temperature was smaller than the drop on the roofs?`, [
          right(`It prepares the planners' conclusion that coatings must be paired with trees and pale paving to cool streets.`),
          wrong(`It shows that the sensors in the study were placed incorrectly and gave unreliable readings.`, 'unsupported-inference'),
          wrong(`It proves that reflective coatings have no effect on the temperature of a city at all.`, 'overgeneralization'),
          wrong(`It explains why residents in taller buildings complained about glare from the roofs below.`, 'confuses-cause-effect'),
        ], `Paragraph 5 says "Because the benefit to streets was modest," the planners recommended trees and pale paving, linking the detail to the central idea. Streets did cool slightly, so the coatings were not without effect.`),
      ],
    },
    {
      code: 'rg12-main-idea-summary-p04',
      title: 'Playing the Sound of a Healthy Reef',
      body: `A healthy coral reef is a noisy place. Shrimp snap their claws, fish grunt and chatter, and waves move across the rough surface of the coral. For young fish drifting in open water after hatching, this sound appears to work like a beacon. Many species seem to follow it when they choose a reef on which to settle and grow.\n\nWhen a reef is damaged by storms or by warm water that bleaches the coral, it grows quiet. Fewer animals live there, so there is less to hear, and young fish may pass it by. That silence can trap a damaged reef in a cycle: without new fish to graze on seaweed and keep the coral clean, recovery becomes even slower.\n\nMarine biologist Nadia Ferreira and her team, working at a fictional research station off the island of Pelandra, wondered whether sound itself could help break that cycle. They recorded the noise of a thriving reef using underwater microphones. Then they placed small speakers on patches of damaged reef and played the recordings every night for six weeks. Other damaged patches nearby received silent speakers so the team could compare the results.\n\nThe patches with sound attracted about twice as many young fish as the silent patches, and the new arrivals included many different species, not just a few. Some of those species graze on seaweed, the very work a struggling reef needs. Ferreira's team cautioned, however, that sound cannot rebuild coral on its own. If the water stays too warm or polluted, fish that arrive may not survive, and the coral may continue to decline.\n\nThe researchers describe the speakers as a way to give recovery a head start rather than a cure. They suggest combining sound with coral replanting and with efforts to protect water quality. Still, the experiment changes how scientists think about restoration. A reef is not only something to see but something to hear, and restoring its voice may help bring back the life that made it noisy in the first place.`,
      items: [
        q(16, 'easy', `What is the central idea of the passage?`, [
          right(`Playing recordings of healthy reefs can draw young fish to damaged reefs and help start recovery, though it is no cure.`),
          wrong(`Healthy coral reefs are noisy because shrimp snap their claws and fish grunt and chatter.`, 'too-narrow'),
          wrong(`Underwater speakers can fully restore damaged coral reefs without any other kind of help.`, 'contradicts-text'),
          wrong(`Warm water and storms have permanently destroyed most of the coral reefs near Pelandra.`, 'unsupported-inference'),
        ], `The passage builds from why sound matters, to the experiment, to results and limits, ending with sound as "a head start rather than a cure." The noisy reef detail only sets up the idea.`),
        q(17, 'easy', `Which detail most directly supports the idea that sound attracted young fish?`, [
          right(`Patches with sound drew about twice as many young fish as the patches with silent speakers.`),
          wrong(`The team recorded a thriving reef using underwater microphones before the experiment began.`, 'confuses-method-with-result'),
          wrong(`Damaged reefs grow quiet because fewer animals live there to make noise.`, 'irrelevant-detail'),
          wrong(`If the water stays too warm, fish that arrive may not survive on the reef.`, 'confuses-limit-with-support'),
        ], `Paragraph 4 compares the sound and silent patches and reports twice as many fish with sound. The recording detail describes how the experiment was prepared, not its outcome.`),
        q(18, 'medium', `How does the second paragraph contribute to the development of the central idea?`, [
          right(`It explains the cycle of silence and slow recovery that the experiment was designed to break.`),
          wrong(`It reports the results of the experiment conducted at the research station off Pelandra.`, 'misplaces-detail'),
          wrong(`It argues that storms are a greater threat to coral reefs than warm water is.`, 'unsupported-inference'),
          wrong(`It describes the many species of fish that young reefs attract after hatching.`, 'misreads-detail'),
        ], `Paragraph 2 describes how a quiet reef loses fish and recovers more slowly, and paragraph 3 says the team wanted to "break that cycle." The results come later, in paragraph 4.`),
        q(19, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Young fish seem to follow reef sounds, and damaged reefs grow quiet. Playing healthy reef recordings on damaged patches doubled young fish arrivals, but researchers say sound must be combined with other restoration efforts.`),
          wrong(`Young fish follow reef sounds, so Ferreira's team placed speakers on damaged reefs. This creative and moving experiment proves that people can rescue the oceans if they simply listen.`, 'includes-opinion'),
          wrong(`Ferreira's team played recordings of a thriving reef every night for six weeks. Other damaged patches nearby received silent speakers so the team could compare the results.`, 'too-narrow'),
          wrong(`Young fish follow reef sounds, but damaged reefs grow quiet. Researchers found that speakers repaired the coral within six weeks, so replanting is no longer needed.`, 'misreads-outcome'),
        ], `The first choice covers the cause, the test, the result and the caution without judgment. The fourth invents a claim that speakers repaired coral, which paragraph 4 directly denies.`),
        q(20, 'hard', `How does the final paragraph refine the central idea?`, [
          right(`It frames sound as a starting point for recovery and suggests a new view of reefs as places to hear as well as see.`),
          wrong(`It withdraws the earlier findings by admitting that the speakers had no measurable effect on the fish.`, 'contradicts-text'),
          wrong(`It shifts the focus to coral replanting as a better method that should replace the sound experiment.`, 'overstates-contrast'),
          wrong(`It summarizes the experiment's method so that other scientists can repeat it exactly.`, 'misreads-structure'),
        ], `The paragraph calls the speakers "a head start rather than a cure" and says restoration involves hearing a reef. It recommends combining sound with replanting, not replacing it.`),
      ],
    },
    {
      code: 'rg12-main-idea-summary-p05',
      title: 'The Chair That Changed the Game',
      body: `Early wheelchair basketball looked very different from the fast game played today. In its first decades, athletes used heavy everyday chairs designed for hospital hallways, not for sprinting, turning and colliding. The chairs had tall backs, large handles and wheels set straight up and down. Players could push forward well enough, but sharp turns were slow and a hard bump could tip a chair over.\n\nChange came largely from the athletes themselves. In the fictional city of Larkmoor, a player named Darius Okafor began working with a local welder in the evenings, asking for small changes after every practice. They lowered the seat to give him more stability, removed the handles he never used, and replaced the steel frame with lighter tubing. Teammates noticed how quickly he moved and asked for chairs of their own.\n\nThe most important change was the tilt of the wheels. By angling the tops of the wheels inward, a design called camber, the builders gave the chair a wider base at the floor. That wider base made it far harder to tip and allowed tighter, quicker turns. A small extra wheel at the back kept players from falling backward when they leaned to shoot or reach for a rebound.\n\nThese improvements did more than make players comfortable. They changed how the sport was played. Lighter, more stable chairs allowed faster breaks down the court, tighter defense and plays that had once been impossible. Coaches developed new strategies, and the game became more exciting to watch, which helped attract new players and fans.\n\nToday, sports chairs are often fitted to each athlete's body, much as a runner's shoes are chosen for a particular foot. Manufacturers still invite players to test new designs and suggest changes. The history of the basketball chair shows that good equipment often comes from close cooperation between the people who build it and the people who use it, and that better tools can reshape the very activity they were made for.`,
      items: [
        q(21, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`Wheelchair basketball chairs improved through cooperation between athletes and builders, and those improvements reshaped the sport.`),
          wrong(`Early basketball chairs had tall backs, large handles and wheels set straight up and down.`, 'too-narrow'),
          wrong(`Darius Okafor was the greatest wheelchair basketball player in the history of Larkmoor.`, 'unsupported-inference'),
          wrong(`Wheelchair basketball has become less exciting because modern chairs make the game too easy.`, 'contradicts-text'),
        ], `The passage traces how player feedback led to design changes and how those changes transformed play, as the final sentence states. The second choice is only a detail from paragraph 1.`),
        q(22, 'medium', `How does the second paragraph develop the central idea?`, [
          right(`It gives an example of an athlete shaping his own chair through repeated requests to a builder.`),
          wrong(`It explains the physics of camber and why a wider base makes a chair harder to tip.`, 'misplaces-detail'),
          wrong(`It describes how coaches created new strategies once chairs became faster.`, 'misplaces-detail'),
          wrong(`It shows that hospital chairs were preferred by most players because they were familiar.`, 'contradicts-text'),
        ], `Paragraph 2 shows Okafor asking a welder "for small changes after every practice," which illustrates cooperation between users and builders. Camber is explained in paragraph 3.`),
        q(23, 'medium', `Which detail best supports the claim that better chairs changed how the sport was played?`, [
          right(`Lighter, more stable chairs allowed faster breaks, tighter defense and plays that were once impossible.`),
          wrong(`The builders replaced the steel frame of Okafor's chair with lighter tubing.`, 'confuses-cause-effect'),
          wrong(`Today's sports chairs are often fitted to each athlete's body like running shoes.`, 'irrelevant-detail'),
          wrong(`Early players could push forward well enough in their heavy everyday chairs.`, 'irrelevant-detail'),
        ], `Paragraph 4 directly describes changes in play caused by the new chairs. The lighter tubing is a design change, a cause, not evidence of how the game itself changed.`),
        q(24, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Early wheelchair basketball used heavy hospital chairs. Athletes worked with builders to create lighter chairs with lower seats and angled wheels, which made play faster and changed the sport's strategies.`),
          wrong(`Early wheelchair basketball used heavy hospital chairs, which was unfair to athletes. Thanks to heroic players like Okafor, the sport finally became worth watching for fans everywhere.`, 'includes-opinion'),
          wrong(`Angling the tops of a chair's wheels inward, called camber, widens its base at the floor. This makes the chair harder to tip and allows tighter turns.`, 'too-narrow'),
          wrong(`Early wheelchair basketball used heavy hospital chairs until manufacturers designed new ones on their own and then taught players how to use them.`, 'contradicts-text'),
        ], `The first choice covers the starting point, the cooperative changes and their effect on the game. The fourth reverses the passage, which says change "came largely from the athletes themselves."`),
        q(25, 'hard', `How do the two central ideas in the final sentence relate to each other?`, [
          right(`Cooperation between builders and users produces better tools, and those tools in turn transform the activity they serve.`),
          wrong(`Builders and users often disagree, and these disagreements usually prevent new tools from being adopted.`, 'contradicts-text'),
          wrong(`Better tools matter only for comfort, while the rules of a sport determine how it is played.`, 'contradicts-text'),
          wrong(`Users invent tools on their own, and builders later copy those tools for profit.`, 'unsupported-inference'),
        ], `The final sentence links cooperation (the source of good equipment) to its result (reshaping the activity), echoing paragraphs 2 through 4. Paragraph 4 says the improvements "did more than make players comfortable," which rules out the comfort-only choice.`),
      ],
    },
    {
      code: 'rg12-main-idea-summary-p06',
      title: 'Hearing Old Voices with Light',
      body: `More than a century ago, before flat records became common, many sounds were captured on wax cylinders. A needle traced vibrations into a spiral groove on the surface of a small tube, and a second needle could later play them back. Families, traveling researchers and local musicians used cylinders to record songs, speeches and stories that were never written down.\n\nToday, many of those cylinders sit in archives such as the fictional Halvorsen Sound Archive, and they are in trouble. Wax grows brittle with age, and many cylinders are cracked, warped or covered with mold. Playing one with a needle, the only method once available, can scrape away part of the groove and damage it further. Some cylinders are so fragile that they cannot be played at all.\n\nA newer method avoids touching the cylinder. Engineers at the archive place a cylinder on a slowly turning stand and scan its surface with a focused beam of light. A camera measures the exact depth and shape of the groove at thousands of points, building a detailed three-dimensional map. Software then calculates how a needle would have moved through that groove and turns the movement into sound.\n\nThe results can be remarkable. The archive has recovered recordings from cylinders broken into several pieces by scanning each piece and joining the maps digitally. Software can also skip over cracks that would have made a needle jump. Among the first recordings restored were work songs from a fishing village that no longer exists, sung by people whose names survive only on handwritten labels.\n\nThe method is slow and costly, and the archive can scan only a few cylinders each week. The recovered sound is also limited by the original recording, which was often faint and scratchy. Still, the archivists argue that the effort is worth it. Each scan preserves a recording before the wax decays further, and it does so without causing the very damage that playback once did.`,
      items: [
        q(26, 'easy', `What is the central idea of the passage?`, [
          right(`Scanning wax cylinders with light lets archives recover fragile old recordings without damaging them further.`),
          wrong(`Wax cylinders were used more than a century ago, before flat records became common.`, 'too-narrow'),
          wrong(`Old cylinder recordings are too faint and scratchy to be worth the cost of preserving.`, 'contradicts-text'),
          wrong(`Needles remain the safest and most reliable way to play old wax cylinder recordings.`, 'contradicts-text'),
        ], `The passage moves from the problem of decaying cylinders to the light scanning method, its results and its costs, concluding that it preserves sound "without causing the very damage that playback once did." The first fact is only background.`),
        q(27, 'medium', `How does the second paragraph prepare the reader for the central idea?`, [
          right(`It shows why playing cylinders with needles is risky, creating the need for a method that does not touch them.`),
          wrong(`It describes how a camera builds a three-dimensional map of each cylinder's groove.`, 'misplaces-detail'),
          wrong(`It lists the kinds of songs and stories that families recorded on cylinders.`, 'misplaces-detail'),
          wrong(`It argues that archives should stop collecting cylinders because the wax decays.`, 'unsupported-inference'),
        ], `Paragraph 2 explains brittle wax and needle damage, which sets up paragraph 3's method that "avoids touching the cylinder." The mapping process is described later, in paragraph 3.`),
        q(28, 'medium', `Which detail best supports the claim that the scanning method can recover sound a needle could not?`, [
          right(`The archive recovered recordings from cylinders broken into pieces by scanning each piece and joining the maps.`),
          wrong(`The archive can scan only a few cylinders each week because the method is slow.`, 'confuses-limit-with-support'),
          wrong(`A needle traced vibrations into a spiral groove on the surface of a small tube.`, 'irrelevant-detail'),
          wrong(`Families and traveling researchers recorded songs that were never written down.`, 'irrelevant-detail'),
        ], `A needle cannot play a cylinder broken into several pieces, but paragraph 4 says scanning recovered such recordings. The slow pace is a limitation, not evidence of the method's power.`),
        q(29, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Many old wax cylinders are too fragile to play safely with needles. An archive now scans them with light and uses software to rebuild their sound, a slow method that preserves recordings without harm.`),
          wrong(`Many old wax cylinders are fragile, and it is a tragedy that so many were neglected. Every museum has a duty to fund light scanning before these priceless voices are lost forever.`, 'includes-opinion'),
          wrong(`A camera measures the depth of a cylinder's groove at thousands of points. Software calculates how a needle would move and converts that motion into sound.`, 'too-narrow'),
          wrong(`Many old wax cylinders are fragile, so the archive copies them by playing each one very slowly with a softer needle before the wax decays.`, 'misreads-detail'),
        ], `The first choice states the problem, the solution and its trade-off without opinion. The fourth misstates the method, which uses light and never touches the cylinder.`),
        q(30, 'hard', `How does the final paragraph shape the central idea of the passage?`, [
          right(`It weighs the method's slowness and the limits of old recordings against its main advantage, preserving sound without harm.`),
          wrong(`It concludes that the method's cost outweighs its benefits, so the archive plans to stop scanning.`, 'contradicts-text'),
          wrong(`It introduces a new problem, faint original recordings, that becomes the passage's main focus.`, 'misreads-structure'),
          wrong(`It suggests that software will soon make old recordings sound as clear as modern ones.`, 'unsupported-inference'),
        ], `The paragraph names drawbacks and then says "Still, the archivists argue that the effort is worth it," ending on the method's key benefit. Nothing suggests the archive will stop.`),
      ],
    },
    {
      code: 'rg12-main-idea-summary-p07',
      title: 'Bring Back the Benches',
      body: `Three years ago, the town of Ashgrove removed most of the public benches along its main street. The council explained that the benches were costly to repair and repaint, and that few people seemed to use them. The decision saved a modest amount of money. I believe it was a mistake, and the town should put the benches back.\n\nA bench is easy to overlook until you need one. For older residents, parents with small children and anyone recovering from an injury, a walk of a few blocks is possible only if there is somewhere to rest along the way. Since the benches disappeared, several neighbors of mine have told me they now drive to the pharmacy instead of walking, or they skip the trip entirely. A town that wants people to stay active should make walking easier, not harder.\n\nBenches also support local business. A shopper who can sit for a few minutes is more likely to visit a second or third store before heading home. When the town of Merrin Falls added seating along its shopping street, store owners there reported that customers stayed longer. Ashgrove's merchants deserve the same advantage, especially as more people shop online.\n\nFinally, benches give people a reason to linger and talk. Some of the most ordinary conversations in a town happen between strangers sharing a seat while they wait for a bus or rest in the shade. Those small exchanges help neighbors recognize one another and make a street feel welcoming rather than empty.\n\nThe council's concerns about cost are real, but they can be met. Benches made of recycled materials need less upkeep than painted wood. Local businesses or community groups could sponsor individual benches and help maintain them. The council's claim that few people used the old benches may also reflect their poor condition and awkward placement. Well-made benches in shady, useful spots would likely be used far more. Returning them would be a small investment in health, commerce and community.`,
      items: [
        q(31, 'easy', `What is the author's central claim in the passage?`, [
          right(`Ashgrove should restore its main street benches because they support walking, local business and community.`),
          wrong(`Ashgrove's council saved a modest amount of money by removing benches from its main street.`, 'too-narrow'),
          wrong(`Benches made from recycled materials need less upkeep than benches made from painted wood.`, 'too-narrow'),
          wrong(`Ashgrove should stop spending money on its main street and focus on online shopping instead.`, 'contradicts-text'),
        ], `The author states "the town should put the benches back" and supports this with three reasons. The money detail is part of the background the author argues against.`),
        q(32, 'medium', `How do the second, third and fourth paragraphs develop the author's central claim?`, [
          right(`Each presents a separate benefit of benches: easier walking, support for shops and more neighborly contact.`),
          wrong(`They trace the history of the benches from installation to removal in time order.`, 'misreads-structure'),
          wrong(`They present the council's reasons for removing the benches and agree with each one.`, 'contradicts-text'),
          wrong(`They describe three towns that removed benches and the problems each one faced.`, 'misreads-detail'),
        ], `Paragraphs 2, 3 and 4 open with distinct reasons, health and mobility, business ("Benches also support"), and conversation ("Finally"). The council's reasons appear in paragraphs 1 and 5, and the author disagrees with them.`),
        q(33, 'medium', `Which is the best objective summary of the passage?`, [
          right(`The author argues that Ashgrove should restore its removed benches, citing benefits for walkers, local stores and community life, and suggests ways to reduce their cost.`),
          wrong(`The author shows that Ashgrove's council foolishly destroyed its main street, and that only selfish officials would care more about paint than about their own neighbors.`, 'includes-opinion'),
          wrong(`The author reports that store owners in Merrin Falls said customers stayed longer after the town added seating along its shopping street.`, 'too-narrow'),
          wrong(`The author agrees with the council that benches cost too much, but suggests building a few new ones far from the main street.`, 'contradicts-text'),
        ], `An objective summary of an argument reports the author's claim and reasons without adding new judgments, as the first choice does. The second inserts harsh opinions the author never expresses.`),
        q(34, 'hard', `How does the final paragraph strengthen the author's central claim?`, [
          right(`It addresses the council's objections about cost and low use, showing that the author's proposal is practical.`),
          wrong(`It admits that the council was right and that the benches should probably stay removed.`, 'contradicts-text'),
          wrong(`It introduces a new benefit of benches that is more important than the earlier ones.`, 'misreads-structure'),
          wrong(`It proves with exact figures that new benches would cost less than the old ones.`, 'unsupported-inference'),
        ], `The paragraph begins "The council's concerns about cost are real, but they can be met," then answers both the cost and the low-use concerns. It offers suggestions, not exact figures.`),
        q(35, 'hard', `Which statement best explains how the author treats the council's claim that few people used the old benches?`, [
          right(`The author suggests low use may have come from poor condition and placement, not from a lack of need.`),
          wrong(`The author accepts the claim fully and uses it to argue for fewer benches.`, 'contradicts-text'),
          wrong(`The author ignores the claim and focuses only on the cost of repairs.`, 'misreads-detail'),
          wrong(`The author proves the claim false by counting bench users before removal.`, 'unsupported-inference'),
        ], `The final paragraph says low use "may also reflect their poor condition and awkward placement," reframing the evidence rather than denying it. The author offers no count of users.`),
      ],
    },
    {
      code: 'rg12-main-idea-summary-p08',
      title: 'Pens, Keyboards and the Work of Listening',
      body: `Many students bring laptops to lectures, confident that typing lets them capture more of what they hear. A study at the fictional Brennick College tested whether that confidence is justified. Researchers asked one group of students to take notes by hand and another to type them while watching the same recorded lecture. A week later, both groups answered questions about the material.\n\nThe typists produced longer notes, often copying the speaker's sentences nearly word for word. Yet on questions that required understanding ideas rather than recalling facts, the handwriting group scored noticeably higher. The researchers proposed an explanation. Because writing by hand is slower, students cannot record everything, so they must decide what matters and put it in their own words. That extra mental work seems to help them learn.\n\nThe story did not end there. A second team, led by psychologist Ines Valborg, wondered whether the tool itself was responsible or the way students used it. In a follow-up study, Valborg gave some typists a simple instruction: summarize the lecture in your own words instead of copying it. Those students wrote shorter notes, and their scores on understanding questions rose to nearly match those of the handwriting group.\n\nValborg's results suggest that the important difference is not between paper and keyboard but between copying and thinking. A pen happens to force students to condense and rephrase, while a keyboard makes copying easy. Students who type can still learn well if they deliberately slow down and process ideas as they write.\n\nThese findings matter for classrooms that are moving toward digital tools. Banning laptops may not be necessary, and it could harm students who rely on typing for good reasons. Teaching students how to take notes, however, may matter more than which device they hold. Whatever the tool, the notes that help most are the ones that require the learner to think.`,
      items: [
        q(36, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`Notes help learning most when students process ideas in their own words, whether they write by hand or type.`),
          wrong(`Students who type their notes write longer notes than students who write their notes by hand.`, 'too-narrow'),
          wrong(`Laptops should be banned from all lectures because handwriting always leads to better learning.`, 'contradicts-text'),
          wrong(`Recorded lectures are more effective for learning than lectures delivered in person.`, 'unsupported-inference'),
        ], `The passage moves from the first study to Valborg's follow-up and concludes that "the important difference is not between paper and keyboard but between copying and thinking." Paragraph 5 says banning laptops may not be necessary.`),
        q(37, 'medium', `How does the third paragraph change the direction of the passage?`, [
          right(`It introduces a follow-up study testing whether the way students take notes, not the tool, explains the difference.`),
          wrong(`It confirms the first study's conclusion that handwriting alone causes better understanding.`, 'misreads-structure'),
          wrong(`It shows that the first study was poorly designed and that its results should be ignored.`, 'overstates-contrast'),
          wrong(`It describes the questions that students answered a week after watching the lecture.`, 'misplaces-detail'),
        ], `Paragraph 3 opens "The story did not end there" and describes Valborg testing "whether the tool itself was responsible." It refines the first study's explanation rather than dismissing its results.`),
        q(38, 'medium', `Which detail best supports the idea that rephrasing, rather than handwriting itself, improves understanding?`, [
          right(`Typists told to summarize in their own words scored nearly as well as the handwriting group.`),
          wrong(`The typists in the first study produced longer notes than the handwriting group.`, 'confuses-cause-effect'),
          wrong(`Many students bring laptops to lectures, confident that typing captures more.`, 'irrelevant-detail'),
          wrong(`Both groups answered questions about the lecture material a week later.`, 'confuses-method-with-result'),
        ], `Valborg's typists changed only their method, not their tool, and their scores rose, which isolates rephrasing as the key factor. Longer notes show copying but do not separate tool from method.`),
        q(39, 'hard', `Which is the best objective summary of the passage?`, [
          right(`One study found handwritten notes led to better understanding than typed notes, possibly because handwriting forces rephrasing. A follow-up found typists who summarized in their own words did nearly as well, suggesting method matters more than tool.`),
          wrong(`One study found handwritten notes led to better understanding than typed notes. This proves that laptops harm learning, and schools that still allow them are making a serious mistake.`, 'ignores-later-evidence'),
          wrong(`A follow-up study gave some typists an instruction to summarize the lecture in their own words. Those students wrote shorter notes, and their scores rose to nearly match the handwriting group.`, 'too-narrow'),
          wrong(`Research shows that typing is now the best way to take notes, since typists who summarize score higher than any students who write by hand on paper.`, 'overstates-finding'),
        ], `The first choice covers both studies and the conclusion without judgment. The second stops at the first study and adds an opinion that the passage's later evidence contradicts.`),
        q(40, 'hard', `How does the final paragraph extend the central idea of the passage?`, [
          right(`It applies the research to classrooms, suggesting that teaching note-taking methods matters more than restricting devices.`),
          wrong(`It returns to the first study's conclusion and recommends that schools replace laptops with paper.`, 'contradicts-text'),
          wrong(`It introduces new evidence that students who type learn better than students who write by hand.`, 'unsupported-inference'),
          wrong(`It argues that classrooms should stop using digital tools until more studies are complete.`, 'contradicts-text'),
        ], `Paragraph 5 says banning laptops "may not be necessary" and that teaching students how to take notes "may matter more than which device they hold." It offers no new evidence favoring typing.`),
      ],
    },
  ],
}

export default skill
