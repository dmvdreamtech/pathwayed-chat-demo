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
  slug: 'read-g7-evidence-inference',
  subject: 'reading',
  grade: 7,
  group: 'Informational text',
  name: 'Key Details, Evidence and Inference',
  standards: ['RI.7.1'],
  passages: [
    {
      code: 'rg7-evidence-inference-p01',
      title: 'How Honeybees Keep Their Hive Comfortable',
      body: `A honeybee colony can contain tens of thousands of insects, yet the hive stays close to the same temperature for most of the year. The center of the nest, where young bees develop, is usually kept near 35 degrees Celsius. Bees manage this without any machines. They rely on teamwork and a few simple behaviors.\n\nWhen the hive grows too warm, worker bees gather near the entrance and fan their wings. The moving air pushes hot air out and draws cooler air in. On very hot days, other workers collect drops of water and spread them over the wax combs. As the water evaporates, it lowers the temperature inside.\n\nCold weather calls for a different plan. In winter, the bees form a tight cluster around their queen. Bees on the inside shiver their flight muscles without moving their wings, which produces heat. Bees on the outer layer pack closely together and act like a blanket. Over time, the bees trade places, so no single bee stays on the chilly outside for too long.\n\nBeekeepers have learned to watch for signs of trouble. A large crowd of bees fanning at the entrance on a mild day may mean the hive is overcrowded. A weak cluster in winter may mean the colony did not store enough honey, since bees burn honey for energy when they shiver.\n\nScientists who study bees point out that no single bee is in charge of the temperature. Each worker responds to the conditions around her. Together, those small actions keep the whole colony safe.`,
      items: [
        q(1, 'easy', `According to the passage, what do bees do when the hive becomes too warm?`, [
          right(`Workers fan their wings at the entrance and spread water over the combs.`),
          wrong(`Workers form a tight cluster around the queen and shiver their muscles.`, 'confuses-details'),
          wrong(`Workers leave the hive and wait outside until the air inside cools.`, 'unsupported-inference'),
          wrong(`Workers eat extra honey so that their bodies give off less heat.`, 'misreads-detail'),
        ], `Paragraph 2 says workers fan their wings near the entrance and spread water on the combs. Clustering and shivering are what bees do in cold weather, not hot weather.`),
        q(2, 'easy', `Which sentence from the passage best supports the idea that bees take turns staying warm in winter?`, [
          right(`"Over time, the bees trade places, so no single bee stays on the chilly outside for too long."`),
          wrong(`"In winter, the bees form a tight cluster around their queen."`, 'wrong-supporting-detail'),
          wrong(`"Bees on the outer layer pack closely together and act like a blanket."`, 'wrong-supporting-detail'),
          wrong(`"Cold weather calls for a different plan."`, 'too-general'),
        ], `Only the sentence about bees trading places shows them taking turns on the cold outside. The sentence about the outer layer describes the blanket of bees but says nothing about switching places.`),
        q(3, 'medium', `Based on the passage, what can the reader infer about a colony that stored very little honey before winter?`, [
          right(`It may struggle to stay warm, because bees use honey for energy when they shiver.`),
          wrong(`It will fan its wings more often to push the cold air out of the hive.`, 'confuses-cause-effect'),
          wrong(`It will move into a warmer hive that the beekeeper builds for it.`, 'unsupported-inference'),
          wrong(`It will become overcrowded, with too many bees gathered at the entrance.`, 'confuses-details'),
        ], `Paragraph 4 says a weak winter cluster may mean too little honey was stored, "since bees burn honey for energy when they shiver." Overcrowding is linked to fanning on a mild day, not to a shortage of honey.`),
        q(4, 'medium', `Which detail best supports the inference that a beekeeper can learn about a hive's health just by watching it?`, [
          right(`A crowd of bees fanning at the entrance on a mild day may mean overcrowding.`),
          wrong(`The center of the nest is usually kept near 35 degrees Celsius all year.`, 'wrong-supporting-detail'),
          wrong(`Bees inside the winter cluster shiver their flight muscles to make heat.`, 'wrong-supporting-detail'),
          wrong(`Some workers spread drops of water over the wax combs on hot days.`, 'wrong-supporting-detail'),
        ], `Paragraph 4 explains that a beekeeper who sees bees fanning on a mild day can suspect overcrowding, which is learning about the hive by watching. The temperature detail is true but does not show what a beekeeper observes.`),
        q(5, 'hard', `Which pair of details together best supports the conclusion that the hive's temperature depends on cooperation rather than on one leader?`, [
          right(`No single bee is in charge of the temperature, and each worker responds to the conditions around her.`),
          wrong(`The bees form a cluster around their queen, and the queen stays in the warm center all winter.`, 'unsupported-inference'),
          wrong(`The hive stays near the same temperature, and the center of the nest is kept near 35 degrees.`, 'restates-without-support'),
          wrong(`Beekeepers watch for signs of trouble, and a weak cluster may mean too little honey.`, 'wrong-supporting-detail'),
        ], `The final paragraph directly says no bee is in charge and each worker reacts to her surroundings, which shows cooperation. The choice about the queen adds a claim the passage never makes, since it does not say the queen controls anything.`),
      ],
    },
    {
      code: 'rg7-evidence-inference-p02',
      title: 'The Lamplighters',
      body: `Before electric lights became common, many city streets were lit by gas lamps. Each lamp stood on a tall post and had to be lit by hand every evening. The workers who did this job were called lamplighters.\n\nA lamplighter usually carried a long pole with a small flame or a hook at the end. Walking a set route, he would open a valve on each lamp and reach up to light the gas. Near dawn, he walked the same route again to turn the lamps off. In a large city, hundreds of these workers might be out at the same time, each responsible for dozens of lamps.\n\nThe job involved more than lighting flames. Lamplighters cleaned the glass panes, which grew black with soot, and they reported broken posts or leaking pipes. Because they walked the streets at dusk and dawn, they often noticed problems before anyone else did. Residents came to know the lamplighter on their street, and children sometimes followed him on his rounds.\n\nGas lighting changed city life. Shops could stay open later, and people felt safer walking after dark. Yet the system had limits. Gas lamps gave off a dim, flickering glow, and leaks could be dangerous.\n\nWhen electric streetlights spread in the early 1900s, cities began switching them on from a central station. Within a few decades, the lamplighter's evening walk had nearly disappeared. A few towns still keep gas lamps in their historic districts. Some even hire a lamplighter for special occasions, as a reminder of how streets once glowed.`,
      items: [
        q(6, 'easy', `According to the passage, what did a lamplighter do near dawn?`, [
          right(`He walked his route again to turn the lamps off.`),
          wrong(`He switched the lamps off from a central station.`, 'confuses-time-period'),
          wrong(`He lit the lamps again to brighten the morning.`, 'misreads-detail'),
          wrong(`He reported every lamp to the electric company.`, 'unsupported-inference'),
        ], `Paragraph 2 says that near dawn the lamplighter "walked the same route again to turn the lamps off." A central station was used later for electric lights, not by lamplighters.`),
        q(7, 'easy', `Which detail best supports the idea that a lamplighter's job included more than lighting flames?`, [
          right(`Lamplighters cleaned sooty glass panes and reported broken posts or leaking pipes.`),
          wrong(`Lamplighters carried a long pole with a small flame or a hook at the end.`, 'wrong-supporting-detail'),
          wrong(`Hundreds of lamplighters might be out at the same time in a large city.`, 'wrong-supporting-detail'),
          wrong(`Electric streetlights were later switched on from a central station.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 lists cleaning glass and reporting damage as extra duties. The pole is a tool for lighting the lamps, so it does not show work beyond lighting.`),
        q(8, 'medium', `Based on the passage, what can the reader infer about why gas lighting let shops stay open later?`, [
          right(`Shoppers were more willing to be out in the evening once the streets were lit.`),
          wrong(`Shop owners paid the lamplighters to keep their lamps burning all night.`, 'unsupported-inference'),
          wrong(`Gas lamps inside shops were brighter than the electric lights that came later.`, 'contradicts-text'),
          wrong(`Shops were required to close when the lamplighter turned the lamps off.`, 'unsupported-inference'),
        ], `The passage says shops stayed open later and "people felt safer walking after dark," so lit streets likely brought evening customers. Nothing in the text says shop owners paid lamplighters.`),
        q(9, 'medium', `Which evidence best supports the inference that electric lights reduced the need for lamplighters?`, [
          right(`Cities began switching electric streetlights on from a central station.`),
          wrong(`Gas lamps gave off a dim, flickering glow, and leaks could be dangerous.`, 'wrong-supporting-detail'),
          wrong(`Residents came to know the lamplighter who worked on their street.`, 'wrong-supporting-detail'),
          wrong(`A few towns still keep gas lamps in their historic districts today.`, 'wrong-supporting-detail'),
        ], `If one central station turned on the lights, no one had to walk from post to post, so lamplighters were no longer needed. The dim glow and leaks explain why gas had limits, but not why the workers themselves were not needed.`),
        q(10, 'hard', `Which conclusion is best supported by the passage as a whole?`, [
          right(`Lamplighters did useful work their neighbors noticed, but central control of lighting made the job unnecessary.`),
          wrong(`Gas lamps were removed mainly because their leaks caused serious danger in most cities.`, 'overstates-evidence'),
          wrong(`Lamplighters worked together to stop cities from switching over to electric streetlights.`, 'unsupported-inference'),
          wrong(`Most towns today still rely on gas lamps and hire lamplighters to light them each night.`, 'overgeneralization'),
        ], `The passage shows lamplighters cleaning, reporting problems and being known by residents, then explains that central switching ended their walks. Leaks are mentioned as one limit, but the text never says they were the main reason lamps were removed.`),
      ],
    },
    {
      code: 'rg7-evidence-inference-p03',
      title: 'Borrowing More Than Books',
      body: `At the Millbrook Public Library, the most popular item last spring was not a book. It was a pressure washer. The library had added it to a new collection called the Library of Things, which lends out tools, games and equipment the same way it lends novels.\n\nThe idea began with a survey. Librarian Adaeze Okafor asked residents what they had bought, used once and then stored away. Many people listed the same items: ladders, sewing machines, camping tents and cake pans in unusual shapes.\n\nOkafor and a team of volunteers collected donations and bought a few items with a small grant. Each object received a barcode and a sturdy bin. Borrowers can keep most items for one week. Larger tools, like the pressure washer, must be returned in three days so more people get a turn.\n\nThe collection has grown to more than 150 objects. A waiting list for the telescope now stretches into the summer. Teenagers borrow the electric keyboard and the video camera for school projects. A local builder teaches a monthly class on using the power drill safely, and only people who complete the class may borrow it.\n\nNot everything has worked. A popcorn machine came back broken twice, and the library removed it. Staff also learned that some kits, such as a board game with dozens of pieces, need a checklist. The list lets borrowers confirm that every piece is returned.\n\nOkafor says the program saves money and space for families. It has also brought new visitors through the doors. Several people who came in to borrow a tool left with their first library card.`,
      items: [
        q(11, 'easy', `According to the passage, how did the Library of Things get started?`, [
          right(`A librarian surveyed residents about items they had used only once.`),
          wrong(`A local builder donated his power tools to the public library.`, 'misreads-detail'),
          wrong(`Teenagers asked the library for equipment for school projects.`, 'confuses-details'),
          wrong(`A resident gave the library a pressure washer as a gift.`, 'unsupported-inference'),
        ], `Paragraph 2 says "The idea began with a survey" in which Okafor asked what people had used once. The builder teaches a drill class, but the text never says he donated tools or started the program.`),
        q(12, 'easy', `Which detail best supports the idea that the collection is popular with borrowers?`, [
          right(`The waiting list for the telescope stretches into the summer.`),
          wrong(`Each object in the collection received a barcode and a bin.`, 'wrong-supporting-detail'),
          wrong(`A popcorn machine came back broken twice and was removed.`, 'wrong-supporting-detail'),
          wrong(`Borrowers can keep most of the items for one full week.`, 'wrong-supporting-detail'),
        ], `A long waiting list shows that many people want to borrow an item. The barcode detail explains how items are organized, not how many people use them.`),
        q(13, 'medium', `What can the reader infer from the rule about borrowing the power drill?`, [
          right(`The library wants borrowers to know how to use risky tools safely before taking them home.`),
          wrong(`The drill is the most expensive object in the library's whole collection.`, 'unsupported-inference'),
          wrong(`The library plans to stop lending the drill once the classes are finished.`, 'unsupported-inference'),
          wrong(`The builder owns the drill and lends it only to people he has already met.`, 'unsupported-inference'),
        ], `The class teaches "using the power drill safely," and only people who finish it may borrow the drill, which points to a concern for safety. The text gives no prices, so a claim about cost is not supported.`),
        q(14, 'medium', `Which evidence best supports the inference that the program helped the library gain new members?`, [
          right(`Several people who came in to borrow a tool left with their first library card.`),
          wrong(`Okafor says the program saves money and space for the families who use it.`, 'wrong-supporting-detail'),
          wrong(`The collection has grown from a few donations to more than 150 objects.`, 'wrong-supporting-detail'),
          wrong(`Teenagers borrow the electric keyboard and video camera for school projects.`, 'wrong-supporting-detail'),
        ], `Getting a first library card means becoming a new member, so the last sentence is direct support. Saving money and space is a benefit of the program, but it says nothing about new members.`),
        q(15, 'hard', `The library removed the popcorn machine and added checklists to some kits. What do these details together suggest?`, [
          right(`The staff adjust the program when they notice problems with certain items.`),
          wrong(`The program is failing and will probably be closed down within a year.`, 'overgeneralization'),
          wrong(`Most borrowers are careless and do not return items in good condition.`, 'overgeneralization'),
          wrong(`The library has decided to lend only items that have very few parts.`, 'unsupported-inference'),
        ], `Both details show staff responding to a specific problem with a specific fix. The passage also describes a growing collection and waiting lists, so the idea that the program is failing goes against the evidence.`),
      ],
    },
    {
      code: 'rg7-evidence-inference-p04',
      title: 'Nature\'s Engineers',
      body: `Beavers are sometimes called nature's engineers. With strong front teeth and steady effort, a family of beavers can cut down small trees and build a dam across a stream. The dam slows the water and creates a pond. In that pond, the beavers build a lodge, a dome of sticks and mud. Its underwater entrances help keep predators out.\n\nFor many years, people treated beaver dams mostly as a nuisance. Dams can flood roads and farm fields, and beavers chew through trees that landowners want to keep. In many areas, beavers were trapped or removed.\n\nScientists now view beaver ponds in a more complicated way. A pond spreads water across a wide area instead of letting it rush downstream. Some of that water soaks into the ground and refills underground supplies. During dry summers, streams below beaver dams often keep flowing longer than streams without them.\n\nThe ponds also become homes for other creatures. Frogs lay eggs in the calm water. Ducks and herons feed along the edges. Young fish can hide among the drowned branches. In one study area, researchers counted more kinds of birds near beaver ponds than along nearby stretches of stream without dams.\n\nSome communities have started working with beavers instead of against them. Workers install pipes through dams so that pond levels stay low enough to protect roads. Others wrap the trunks of valuable trees with wire. These methods let the beavers stay while limiting the damage.\n\nBeavers have not changed their behavior. What has changed is how people understand the effects of that behavior.`,
      items: [
        q(16, 'easy', `According to the passage, how does a lodge help protect beavers?`, [
          right(`Its underwater entrances help keep predators out.`),
          wrong(`It is built on dry land far from the stream.`, 'contradicts-text'),
          wrong(`Its trunks are wrapped in wire to stop chewing.`, 'confuses-details'),
          wrong(`It floods nearby roads so that people stay away.`, 'misreads-detail'),
        ], `Paragraph 1 says the lodge's "underwater entrances help keep predators out." Wire is wrapped around valuable trees by people, not around the lodge.`),
        q(17, 'easy', `Which detail best supports the idea that beaver ponds provide homes for other animals?`, [
          right(`Frogs lay eggs in the calm water, and young fish hide among drowned branches.`),
          wrong(`Some of the pond water soaks into the ground and refills underground supplies.`, 'wrong-supporting-detail'),
          wrong(`Beavers use their strong front teeth to cut down small trees for their dams.`, 'wrong-supporting-detail'),
          wrong(`Workers install pipes through dams so pond levels stay low enough for roads.`, 'wrong-supporting-detail'),
        ], `Frogs and fish living in the pond show other animals using it as a home. The detail about underground water is a benefit of ponds, but it is about water supply, not animals.`),
        q(18, 'medium', `Which detail best supports the inference that beaver dams can help an area during a drought?`, [
          right(`Streams below beaver dams often keep flowing longer during dry summers.`),
          wrong(`Beaver dams can flood roads and farm fields that people depend on.`, 'wrong-supporting-detail'),
          wrong(`In many areas, beavers were trapped or removed from their streams.`, 'wrong-supporting-detail'),
          wrong(`Ducks and herons feed along the edges of the ponds that beavers build.`, 'wrong-supporting-detail'),
        ], `A drought is a long dry period, and paragraph 3 says streams below dams keep flowing longer in dry summers. The flooding detail shows a problem dams cause, not a benefit in dry weather.`),
        q(19, 'medium', `What can the reader infer about why beavers were trapped or removed in many areas?`, [
          right(`People saw the flooding and tree damage as problems and did not yet know about the benefits.`),
          wrong(`Scientists had proven that beaver ponds harmed the birds living near streams.`, 'contradicts-text'),
          wrong(`Beavers had started attacking farm animals that grazed near their ponds.`, 'unsupported-inference'),
          wrong(`Beavers had stopped building dams and were no longer useful to anyone.`, 'contradicts-text'),
        ], `Paragraph 2 names flooding and chewed trees as reasons people saw dams as a nuisance, and paragraph 3 says scientists only "now" see the benefits. The bird study actually found more kinds of birds near ponds, so the choice "Scientists had proven that beaver ponds harmed the birds living near streams" contradicts the text.`),
        q(20, 'hard', `The passage ends by saying "What has changed is how people understand the effects of that behavior." Which evidence best supports this statement?`, [
          right(`People once saw dams mostly as a nuisance, but scientists now see benefits like stored water and wildlife homes.`),
          wrong(`A family of beavers can cut down small trees and build a dam that slows the water in a stream.`, 'describes-behavior-not-change'),
          wrong(`Dams can flood roads and farm fields, and beavers chew through trees that landowners want to keep.`, 'too-narrow'),
          wrong(`Frogs lay their eggs in calm pond water, and ducks and herons feed along the edges of the pond.`, 'too-narrow'),
        ], `The statement is about a change in understanding, so the best evidence shows both the old view and the new one. The flooding detail shows only the old view, so by itself it cannot show that anything changed.`),
      ],
    },
    {
      code: 'rg7-evidence-inference-p05',
      title: 'Riding in Someone\'s Shadow',
      body: `Watch a long-distance bicycle race, and you will notice that riders rarely spread out across the road. Instead, they line up close behind one another or ride in a large pack. This habit, called drafting, is one of the most important tactics in the sport.\n\nDrafting works because of air resistance. A cyclist moving at racing speed must push a large amount of air out of the way. The rider at the front does most of that work. Riders tucked behind face less air pushing against them, so they can keep the same speed while pedaling with less effort. Studies in wind tunnels have found that a rider in the middle of a pack may need far less energy than a rider alone.\n\nBecause the front position is so tiring, teammates take turns. One rider leads for a short stretch, then moves aside and drops to the back of the line. The next rider takes over. By sharing the hardest job, the whole group can travel faster than any single rider could manage alone.\n\nDrafting also shapes race strategy. A team may protect its strongest rider by keeping her sheltered for most of the race. Near the finish, teammates who have done the hard work at the front peel away. The sheltered rider then sprints for the line with the energy she has saved.\n\nDrafting has a few risks. Riders must stay only inches apart, so a sudden brake or a wobble can cause a crash. Riders in a pack also have a harder time seeing the road ahead. For these reasons, young cyclists usually practice drafting slowly with a coach before trying it in a race.`,
      items: [
        q(21, 'easy', `According to the passage, why does the rider at the front work the hardest?`, [
          right(`That rider pushes most of the air out of the way for the group.`),
          wrong(`That rider must watch the road and steer for everyone behind.`, 'unsupported-inference'),
          wrong(`That rider is always the strongest member of the whole team.`, 'contradicts-text'),
          wrong(`That rider pedals at a faster speed than the riders behind.`, 'misreads-detail'),
        ], `Paragraph 2 says a cyclist must push air out of the way and "the rider at the front does most of that work." Teammates take turns at the front, so it is not always the strongest rider.`),
        q(22, 'medium', `Which evidence best supports the claim that drafting saves energy?`, [
          right(`Wind tunnel studies found a rider in the middle of a pack may need far less energy than a rider alone.`),
          wrong(`Riders in long races line up close behind one another or ride in a large pack.`, 'describes-not-supports'),
          wrong(`Young cyclists usually practice drafting slowly with a coach before a race.`, 'wrong-supporting-detail'),
          wrong(`Riders in a pack have a harder time seeing the road ahead of them.`, 'wrong-supporting-detail'),
        ], `The wind tunnel studies measured energy and found pack riders need less of it. The fact that riders line up describes what drafting looks like but does not prove that it saves energy.`),
        q(23, 'medium', `Based on the passage, what can the reader infer about a rider who stayed at the front for an entire race?`, [
          right(`She would probably tire sooner than riders who took turns or stayed sheltered.`),
          wrong(`She would use less energy because no other riders would be in her way.`, 'confuses-cause-effect'),
          wrong(`She would be breaking a rule that requires riders to change places.`, 'unsupported-inference'),
          wrong(`She would have the most energy saved for the sprint at the finish line.`, 'contradicts-text'),
        ], `The text says the front position is "so tiring" that teammates take turns, so a rider who never left it would wear out faster. Being in front means facing the most air, not using less energy.`),
        q(24, 'medium', `Which sentence best explains why young cyclists practice drafting with a coach first?`, [
          right(`Riders must stay only inches apart, so a sudden brake or a wobble can cause a crash.`),
          wrong(`One rider leads for a short stretch, then moves aside and drops to the back of the line.`, 'wrong-supporting-detail'),
          wrong(`Drafting is one of the most important tactics in long-distance bicycle racing.`, 'wrong-supporting-detail'),
          wrong(`A team may protect its strongest rider by keeping her sheltered for most of the race.`, 'wrong-supporting-detail'),
        ], `The last paragraph lists the crash risk and then says "For these reasons" young riders practice with a coach. The sentence about taking turns explains how drafting works, not why it needs careful practice.`),
        q(25, 'hard', `Based on the passage, what can the reader infer about the teammates who "peel away" near the finish?`, [
          right(`They used up their own energy at the front so a sheltered teammate could sprint to win.`),
          wrong(`They never drafted during the race, so they were too tired to keep riding hard.`, 'unsupported-inference'),
          wrong(`They leave the group near the finish mainly to avoid crashing in a crowded sprint.`, 'confuses-cause-effect'),
          wrong(`They are the fastest sprinters on the team and are saving their speed for later.`, 'contradicts-text'),
        ], `Paragraph 4 says these teammates "have done the hard work at the front" while the sheltered rider saved energy, so they spent their strength helping her. The crash risk is real, but the text links peeling away to the team's strategy, not to safety.`),
      ],
    },
    {
      code: 'rg7-evidence-inference-p06',
      title: 'Bringing a Faded Mural Back',
      body: `For forty years, a painted mural has covered the side wall of the community center on Alder Street. It shows a river winding past houses, gardens and a busy market. By last year, much of it had faded to pale blues and grays. Several sections had cracked, and in one corner the paint had peeled away entirely.\n\nA team of art conservators was hired to repair it. Their first step was not painting. Instead, they spent two weeks studying the wall. They photographed every section, tested small spots to identify the original paints and searched the center's files for the artist's sketches. They wanted to learn what the mural had looked like when it was new.\n\nThe sketches turned out to be important. In the peeling corner, the photographs showed only blank plaster. The sketches revealed that the corner once held a group of children flying kites. Without them, the team would have had to guess.\n\nNext, the conservators cleaned the wall with soft brushes and mild soap. Strong chemicals could have removed dirt faster, but they might also have removed original paint. The team then filled the cracks. They matched each color by mixing small test batches until the new paint looked right beside the old.\n\nLead conservator Tomas Reyes-Lindqvist explained that the goal was to repair the mural, not to improve it. The team did not add new figures or change the colors to suit modern tastes. Once the work was finished, they coated the surface with a clear layer that blocks sunlight.`,
      items: [
        q(26, 'easy', `According to the passage, what did the conservators do before they did any painting?`, [
          right(`They studied the wall, tested the paints and searched for the artist's sketches.`),
          wrong(`They coated the whole surface with a clear layer that blocks sunlight.`, 'wrong-sequence'),
          wrong(`They cleaned the wall quickly with strong chemicals to remove the dirt.`, 'contradicts-text'),
          wrong(`They added new figures to the blank corner to suit modern tastes.`, 'contradicts-text'),
        ], `Paragraph 2 says their first step "was not painting" and describes two weeks of study. The clear coating came last, after the work was finished.`),
        q(27, 'medium', `Which evidence best supports the idea that the artist's sketches were important to the repair?`, [
          right(`The sketches showed children flying kites in a corner where photographs showed only plaster.`),
          wrong(`The team photographed every section of the wall before beginning any of the repairs.`, 'wrong-supporting-detail'),
          wrong(`The conservators cleaned the wall with soft brushes and mild soap instead of chemicals.`, 'wrong-supporting-detail'),
          wrong(`The finished mural was coated with a clear layer that protects it from sunlight.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 shows the sketches supplied an image nothing else could, so the team did not have to guess. The photographs are part of the study, but in that corner they showed only blank plaster.`),
        q(28, 'medium', `What can the reader infer from the team's choice to clean with mild soap instead of strong chemicals?`, [
          right(`They cared more about protecting the original paint than about finishing quickly.`),
          wrong(`The community center did not allow any chemicals to be used on its walls.`, 'unsupported-inference'),
          wrong(`They believed the chemicals would fade the new colors they planned to add.`, 'misreads-detail'),
          wrong(`They had run out of money and could not afford to buy stronger cleaners.`, 'unsupported-inference'),
        ], `The text says chemicals "could have removed dirt faster" but might remove original paint, so the team chose safety over speed. Nothing in the passage mentions rules from the community center.`),
        q(29, 'medium', `Based on the passage, what most likely helped cause the mural to fade?`, [
          right(`Sunlight, since the team finished by adding a layer that blocks it.`),
          wrong(`Strong chemicals that earlier workers had used to clean the wall.`, 'unsupported-inference'),
          wrong(`Poor paints that the artist chose when the mural was first made.`, 'unsupported-inference'),
          wrong(`Cracks in the plaster that slowly drained the color from the paint.`, 'confuses-cause-effect'),
        ], `The team protected the repaired mural with a coating "that blocks sunlight," which suggests sunlight had damaged it before. The passage never says anyone used chemicals on the wall in the past.`),
        q(30, 'hard', `Which pair of details best supports the conclusion that the team tried to keep the mural true to the artist's original work?`, [
          right(`They matched each color beside the old paint, and they did not add figures or change colors.`),
          wrong(`They filled the cracks in the wall, and they coated the surface with a clear layer.`, 'wrong-supporting-detail'),
          wrong(`The mural shows a river and a market, and it has covered the wall for forty years.`, 'irrelevant-detail'),
          wrong(`Much of the mural had faded, and in one corner the paint had peeled away entirely.`, 'describes-problem-not-solution'),
        ], `Matching old colors and refusing to add or change anything both show the team staying faithful to the original. Filling cracks and coating the wall repair and protect the mural, but they do not show faithfulness to the artist's choices.`),
      ],
    },
    {
      code: 'rg7-evidence-inference-p07',
      title: 'The Weather Station on the Roof',
      body: `Last fall, a seventh-grade science club at Fairmont Middle School set out to answer a simple question. Is the weather at our school the same as the weather in the forecast? The nearest official weather station sits at an airport about twenty miles away. The students suspected that conditions on their hilltop campus might be different.\n\nWith help from their teacher, Ms. Priya Natarajan, the club built a small weather station from a kit. It included sensors for temperature, humidity, wind speed and rainfall. The sensors connected to a tiny computer that recorded a reading every ten minutes. After getting permission from the principal, the students mounted the station on the roof of the gym.\n\nThe first weeks were frustrating. The temperature readings jumped several degrees every afternoon, even on cloudy days. Club member Darnell Brooks noticed that the station sat near a metal air vent that blew warm air from the gym. The students moved the station to the opposite corner of the roof, and the strange jumps stopped.\n\nBy spring, the club had collected months of data. They compared their records with the airport's. Their campus was usually two or three degrees cooler. It was also windier, and on several days it recorded rain when the airport recorded none.\n\nThe students shared their findings with the school's athletic director. Coaches now check the club's website before outdoor practices, especially on windy days. Next year, the club plans to add a sensor that measures air quality.`,
      items: [
        q(31, 'easy', `According to the passage, why did the science club build a weather station?`, [
          right(`To find out whether the weather at school matched the airport forecast.`),
          wrong(`To give the coaches wind readings that they had asked the club for.`, 'wrong-sequence'),
          wrong(`To measure air quality around the school for the principal's report.`, 'confuses-details'),
          wrong(`To replace the airport station after it stopped working last fall.`, 'unsupported-inference'),
        ], `Paragraph 1 states the club's question about whether school weather matched the forecast. The coaches began using the data only after the club shared its findings.`),
        q(32, 'medium', `Which detail best supports the inference that the air vent caused the strange temperature readings?`, [
          right(`After the station was moved to the opposite corner of the roof, the jumps stopped.`),
          wrong(`The readings jumped several degrees every afternoon, even on cloudy days.`, 'incomplete-evidence'),
          wrong(`The sensors connected to a tiny computer that recorded a reading every ten minutes.`, 'wrong-supporting-detail'),
          wrong(`The students mounted the station on the roof of the gym with the principal's permission.`, 'wrong-supporting-detail'),
        ], `Moving the station away from the vent made the problem disappear, which points to the vent as the cause. The cloudy day detail shows the jumps were not from sunshine, but it does not connect them to the vent.`),
        q(33, 'medium', `What can the reader infer about why coaches check the club's website before practice?`, [
          right(`The club's data show conditions at the school more accurately than the airport does.`),
          wrong(`The airport has stopped reporting weather for the area around the school.`, 'unsupported-inference'),
          wrong(`The website shows air quality readings that coaches need before practice.`, 'contradicts-text'),
          wrong(`The athletic director requires students to post a forecast every morning.`, 'unsupported-inference'),
        ], `The club found the campus cooler, windier and sometimes rainier than the airport, so its own readings fit the school better. The air quality sensor is only planned for next year, so the website cannot show those readings yet.`),
        q(34, 'hard', `Which conclusion about the students' original suspicion is best supported by evidence in the passage?`, [
          right(`It was correct, because their campus was cooler, windier and sometimes rainier than the airport.`),
          wrong(`It was wrong, because the two stations recorded rain on exactly the same days all spring.`, 'contradicts-text'),
          wrong(`It could not be tested, because the sensors gave faulty readings for the entire school year.`, 'overstates-problem'),
          wrong(`It was correct, because the temperature readings jumped several degrees every afternoon.`, 'uses-flawed-evidence'),
        ], `Paragraph 4 compares months of data and shows real differences from the airport. The afternoon jumps were caused by the vent, so they are flawed evidence and cannot support any conclusion about the weather.`),
        q(35, 'hard', `What does the passage suggest about how the students handled the problem with the temperature readings?`, [
          right(`They looked for a physical cause near the station and tested a fix by moving it.`),
          wrong(`They threw out all of their early data and started again with a brand new kit.`, 'unsupported-inference'),
          wrong(`They asked the airport staff to explain why the afternoon readings kept jumping.`, 'unsupported-inference'),
          wrong(`They decided that cloudy weather was the cause and ignored the cloudy afternoons.`, 'contradicts-text'),
        ], `Darnell noticed the vent near the station, and the club moved the station, after which the jumps stopped. The text never mentions a new kit or contact with the airport staff.`),
      ],
    },
    {
      code: 'rg7-evidence-inference-p08',
      title: 'Our Lunch Scraps Could Feed Our Garden',
      body: `Every day after lunch, the trash cans in our cafeteria fill with apple cores, banana peels and half-eaten sandwiches. All of it goes to a landfill. I believe our school should start a compost program, and I think the evidence shows it would be worth the effort.\n\nFirst, food scraps make up a large share of what we throw away. Last month, the student council sorted one day's cafeteria trash. By weight, more than half of it was food. Paper napkins and trays made up most of the rest. Only a small amount was plastic.\n\nSecond, composting turns waste into something useful. When food scraps break down with leaves and soil, they become a dark, rich material that helps plants grow. Our school already has a vegetable garden behind the science wing. Right now, the garden club buys bags of compost every spring. With our own compost, the club could spend that money on seeds and tools instead.\n\nSome people worry that compost bins will smell or attract pests. These are fair concerns. However, a covered bin that is turned regularly and mixed with dry leaves usually stays clean. Two nearby elementary schools have run compost programs for years without these problems.\n\nFinally, a compost program would teach us something. Students would learn how decomposition works by watching it happen. They would also see how much food they waste, which might encourage them to take only what they will eat.\n\nStarting this program would require a few bins, clear signs and student volunteers to sort scraps. The council has already found twelve volunteers. I hope the principal will give us the chance to try it for one semester.`,
      items: [
        q(36, 'easy', `According to the author, what did the student council find when it sorted the cafeteria trash?`, [
          right(`More than half of the trash, by weight, was food.`),
          wrong(`Most of the trash, by weight, was made of plastic.`, 'contradicts-text'),
          wrong(`Paper napkins made up more than half of the trash.`, 'misreads-detail'),
          wrong(`The trash smelled bad and had attracted some pests.`, 'confuses-details'),
        ], `Paragraph 2 states that "more than half of it was food." Paper napkins and trays made up most of the rest, not most of the total.`),
        q(37, 'medium', `Which evidence does the author use to respond to the worry about smell and pests?`, [
          right(`Two nearby elementary schools have run compost programs for years without these problems.`),
          wrong(`The student council has already found twelve volunteers to help sort the scraps.`, 'wrong-supporting-detail'),
          wrong(`The garden club buys bags of compost for the vegetable garden every spring.`, 'wrong-supporting-detail'),
          wrong(`Students would see how much food they waste and might take less at lunch.`, 'wrong-supporting-detail'),
        ], `Right after naming the worry, paragraph 4 points to two schools that have composted for years without smell or pests. The volunteers show the program has helpers, but they do not answer the concern about smell.`),
        q(38, 'medium', `What can the reader infer about the garden club from the passage?`, [
          right(`It spends some money each year on compost that the school could make itself.`),
          wrong(`It has already asked the principal to start a compost program this year.`, 'unsupported-inference'),
          wrong(`It already makes compost from leaves it collects behind the science wing.`, 'contradicts-text'),
          wrong(`It does not have enough members to take care of the vegetable garden.`, 'unsupported-inference'),
        ], `The club "buys bags of compost every spring," and the author says school compost would free that money for seeds and tools. If the club already made its own compost, it would not need to buy it.`),
        q(39, 'hard', `Which idea does the author present as a possibility rather than support with evidence?`, [
          right(`Seeing their food waste might encourage students to take only what they will eat.`),
          wrong(`More than half of one day's cafeteria trash, measured by weight, was food.`, 'treats-evidence-as-speculation'),
          wrong(`The garden club currently buys bags of compost for the garden every spring.`, 'treats-evidence-as-speculation'),
          wrong(`The student council has already found twelve volunteers to help sort scraps.`, 'treats-evidence-as-speculation'),
        ], `The author says seeing waste "might encourage" students but gives no data or example to show it. The food finding comes from the council's actual trash sort, so it is presented as evidence.`),
        q(40, 'hard', `Based on the passage, what can the reader infer about why the author asks for a one-semester trial?`, [
          right(`A short trial would let the school test the program before making a long commitment.`),
          wrong(`The compost bins the council wants can only be used for a single semester.`, 'unsupported-inference'),
          wrong(`The twelve volunteers are only able to help for one semester before leaving.`, 'unsupported-inference'),
          wrong(`The principal has already approved the program for exactly one semester.`, 'contradicts-text'),
        ], `The author admits there are "fair concerns," and asking for a limited trial lets the school see if the program works before keeping it. The author only "hopes" the principal will agree, so approval has not happened yet.`),
      ],
    },
  ],
}

export default skill
