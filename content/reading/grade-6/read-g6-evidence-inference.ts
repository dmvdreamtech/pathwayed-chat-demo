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
  slug: 'read-g6-evidence-inference',
  subject: 'reading',
  grade: 6,
  group: 'Informational text',
  name: 'Key Details, Evidence and Inference',
  standards: ['RI.6.1'],
  passages: [
    {
      code: 'rg6-evidence-inference-p01',
      title: 'Harvesting Salt from the Sea',
      body: `Along some warm, flat coastlines, workers make salt with help from the sun and the wind. The process uses a series of shallow ponds. Seawater flows from one pond to the next over many months. Each step leaves the water saltier than before.\n\nThe first ponds hold water that looks much like the ocean. As the sun heats the surface, some of the water evaporates into the air. The salt stays behind, so the water that remains becomes more concentrated. Workers then open small gates and let this saltier water move into the next pond.\n\nThe ponds often change color along the way. Tiny living things called algae grow in the very salty water, and some of them turn the ponds pink or orange. Visitors flying overhead sometimes mistake the bright ponds for paint spills. To the workers, though, the colors are a helpful sign. A deep pink pond usually means the water is almost ready.\n\nIn the final ponds, salt crystals form on the bottom and along the edges. Workers wait for a dry stretch of weather before they gather the crystals. A heavy rain at the wrong time can dissolve days of progress. For that reason, many salt farms are found in places with long, dry summers.\n\nAfter harvesting, the salt is washed, dried and sorted by size. Some of it is sold for cooking. Much more is used to melt ice on winter roads or to make other products. The method is very old, but it still works because it needs little more than seawater, sunshine and patience.`,
      items: [
        q(1, 'easy', `According to the passage, why does the water in the ponds become saltier over time?`, [
          right(`The sun makes some water evaporate, and the salt stays behind.`),
          wrong(`Workers pour extra salt into each pond before opening the gates.`, 'unsupported-inference'),
          wrong(`The algae in the ponds produce salt as they grow and change color.`, 'confuses-cause-effect'),
          wrong(`Fresh seawater from the deep ocean is pumped into the last ponds.`, 'misreads-detail'),
        ], `Paragraph 2 says the sun heats the water, some evaporates, and "the salt stays behind." The algae are described as changing the color of salty water, not making the salt.`),
        q(2, 'easy', `Which sentence from the passage best supports the idea that the pond colors are useful to workers?`, [
          right(`"A deep pink pond usually means the water is almost ready."`),
          wrong(`"Visitors flying overhead sometimes mistake the bright ponds for paint spills."`, 'wrong-supporting-detail'),
          wrong(`"The ponds often change color along the way."`, 'too-general'),
          wrong(`"The first ponds hold water that looks much like the ocean."`, 'wrong-supporting-detail'),
        ], `The sentence about deep pink ponds shows workers using color to judge when the water is ready. The sentence that the ponds change color is true, but it does not say how the color helps anyone.`),
        q(3, 'medium', `What can the reader infer about a salt farm in a place where it often rains in summer?`, [
          right(`It would have trouble collecting crystals, since rain can dissolve them.`),
          wrong(`It would make more salt, since the rain adds water to every pond.`, 'confuses-cause-effect'),
          wrong(`It would have brighter pink ponds, since rain helps the algae grow.`, 'unsupported-inference'),
          wrong(`It would sell its salt only for cooking instead of for melting ice.`, 'unsupported-inference'),
        ], `Paragraph 4 says a heavy rain "can dissolve days of progress" and that salt farms are usually in places with dry summers. Adding rainwater does not add salt, so more water would not mean more salt.`),
        q(4, 'medium', `Which detail best supports the inference that making salt this way is a slow process?`, [
          right(`Seawater flows from one pond to the next over many months.`),
          wrong(`Workers open small gates to let the saltier water move along.`, 'wrong-supporting-detail'),
          wrong(`After harvesting, the salt is washed, dried and sorted by size.`, 'wrong-supporting-detail'),
          wrong(`Some of the salt is sold for cooking and some is used on roads.`, 'wrong-supporting-detail'),
        ], `"Over many months" tells how long the process takes. Opening gates is a step in the process, but it says nothing about how much time the process needs.`),
        q(5, 'hard', `The author says the method still works because it needs "little more than seawater, sunshine and patience." Which pair of details best supports this claim?`, [
          right(`The sun evaporates the water, and workers wait months and watch for dry weather.`),
          wrong(`Algae turn the ponds pink, and visitors mistake them for paint spills.`, 'wrong-supporting-detail'),
          wrong(`Some salt is sold for cooking, and much more is used on icy winter roads.`, 'supports-different-claim'),
          wrong(`Workers wash the finished salt, and then they sort the crystals by size.`, 'too-narrow'),
        ], `The sun doing the evaporating and the long wait for months and dry weather match "sunshine and patience." The uses of salt are true details, but they describe what happens after the method, not what the method needs.`),
      ],
    },
    {
      code: 'rg6-evidence-inference-p02',
      title: 'The Old Ice Harvest',
      body: `Long before electric refrigerators, families still found ways to keep food cold. In many northern towns during the 1800s, the answer came from frozen lakes and ponds. Each winter, crews cut large blocks of ice and stored them for use in warmer months.\n\nThe work began when the ice grew thick enough to hold horses and workers. Crews first scraped away snow so the ice could freeze more evenly. Then they marked the surface in a grid and cut along the lines with long saws. The heavy blocks were floated through open channels of water toward the shore.\n\nOn land, workers slid the blocks into tall wooden icehouses. They packed sawdust or straw between the blocks and around the walls. This packing slowed the melting a great deal. A well-built icehouse could keep much of its ice frozen until late summer.\n\nIn warm weather, ice wagons carried blocks through town. Homes kept the ice in wooden boxes lined with metal, with food stored on the shelves below. Families placed a card in the window to show how much ice they wanted that day. Children often followed the wagon, hoping for a cool chip of ice on a hot afternoon.\n\nThe ice trade grew into a large business. Some ships even carried ice to warm ports far away. By the early 1900s, however, machines that could make ice became more common. Electric refrigerators later arrived in many homes. Within a few decades, the busy winter harvests on frozen lakes had mostly disappeared.`,
      items: [
        q(6, 'easy', `According to the passage, why did workers pack sawdust or straw around the ice blocks?`, [
          right(`The packing slowed down how fast the ice melted.`),
          wrong(`The packing made the blocks easier to slide on land.`, 'unsupported-inference'),
          wrong(`The packing helped the horses walk safely on the lake.`, 'confuses-details'),
          wrong(`The packing kept the blocks clean enough to eat.`, 'unsupported-inference'),
        ], `Paragraph 3 says, "This packing slowed the melting a great deal." The horses are mentioned only in connection with thick ice on the lake, not the packing.`),
        q(7, 'easy', `Which sentence from the passage best supports the idea that stored ice could last for months?`, [
          right(`"A well-built icehouse could keep much of its ice frozen until late summer."`),
          wrong(`"Each winter, crews cut large blocks of ice and stored them."`, 'too-general'),
          wrong(`"The heavy blocks were floated through open channels of water toward the shore."`, 'wrong-supporting-detail'),
          wrong(`"In warm weather, ice wagons carried blocks through town."`, 'wrong-supporting-detail'),
        ], `Ice cut in winter and still frozen in late summer lasted for months. The sentence about storing the ice says it was kept, but not how long it lasted.`),
        q(8, 'medium', `Based on the passage, why did crews most likely wait for the ice to grow thick before cutting?`, [
          right(`Thin ice could not safely hold the horses, workers and heavy blocks.`),
          wrong(`Thick ice was easier to see once the snow was scraped away.`, 'unsupported-inference'),
          wrong(`Thick ice melted faster, so it was easier to cut with saws.`, 'contradicts-text'),
          wrong(`Buyers in town would only pay for ice that looked cloudy.`, 'unsupported-inference'),
        ], `Paragraph 2 says work began when the ice was "thick enough to hold horses and workers," so thinner ice would not be safe. Nothing in the text says thick ice melts faster; the passage is about keeping ice from melting.`),
        q(9, 'medium', `Which detail best supports the inference that ice deliveries were matched to what each family needed?`, [
          right(`Families placed a card in the window to show how much ice they wanted.`),
          wrong(`Children followed the wagon, hoping for a cool chip of ice.`, 'wrong-supporting-detail'),
          wrong(`Homes kept the ice in wooden boxes lined with metal.`, 'wrong-supporting-detail'),
          wrong(`Some ships carried ice to warm ports far away from the lakes.`, 'wrong-supporting-detail'),
        ], `The window card told the driver how much ice each home wanted that day. The children following the wagon shows ice was a treat, not how deliveries were planned.`),
        q(10, 'hard', `Which inference about the end of the ice harvest is best supported by the text?`, [
          right(`New machines and refrigerators made lake ice much less needed.`),
          wrong(`Northern lakes stopped freezing thick enough for crews to cut.`, 'unsupported-inference'),
          wrong(`The ice trade had always been too small to earn much money.`, 'contradicts-text'),
          wrong(`Families decided that they no longer wanted to keep food cold.`, 'unsupported-inference'),
        ], `The last paragraph names ice-making machines and electric refrigerators just before saying the harvests "mostly disappeared." The trade was not small: the text calls it "a large business" that shipped ice to far ports.`),
      ],
    },
    {
      code: 'rg6-evidence-inference-p03',
      title: 'How an Octopus Changes Its Look',
      body: `An octopus has no shell and no sharp spines to protect it. Even so, it survives in oceans full of hungry fish, seals and sharks. One of its best defenses is its ability to change how it looks in less than a second.\n\nThe secret lies in its skin. An octopus has thousands of tiny color sacs just under the surface. Each sac is surrounded by small muscles. When the muscles pull, the sac stretches and shows more color. When they relax, the sac shrinks and the color nearly disappears. By controlling many sacs at once, the octopus can make spots, stripes or patches that match the rocks around it.\n\nColor is only part of the trick. An octopus can also raise small bumps on its skin to copy the rough texture of coral or seaweed. A smooth octopus resting on a bumpy rock would stand out. A bumpy one blends right in.\n\nScientists find this skill puzzling for one reason. Many studies suggest that octopuses do not see colors the way people do. Yet they still match their surroundings closely. Some researchers think the skin itself may sense light. Others think the octopus judges brightness and patterns rather than exact colors. The question has not been settled.\n\nOctopuses use their color changes for more than hiding. A startled octopus may flash dark colors suddenly, which can confuse an attacker for a moment. That brief pause may give the octopus time to squirt ink and jet away.`,
      items: [
        q(11, 'easy', `According to the passage, what happens when the muscles around a color sac pull?`, [
          right(`The sac stretches and shows more color.`),
          wrong(`The sac shrinks and the color fades away.`, 'reverses-detail'),
          wrong(`The skin raises small bumps like coral.`, 'confuses-details'),
          wrong(`The octopus squirts ink and jets away.`, 'confuses-details'),
        ], `Paragraph 2 says that when the muscles pull, "the sac stretches and shows more color." Shrinking and fading is what happens when the muscles relax.`),
        q(12, 'easy', `Which sentence from the passage best supports the idea that an octopus can change its texture as well as its color?`, [
          right(`"An octopus can also raise small bumps on its skin to copy the rough texture of coral or seaweed."`),
          wrong(`"Color is only part of the trick."`, 'too-general'),
          wrong(`"Each sac is surrounded by small muscles."`, 'wrong-supporting-detail'),
          wrong(`"An octopus has no shell and no sharp spines to protect it."`, 'wrong-supporting-detail'),
        ], `The sentence about raising bumps directly describes a change in texture. "Color is only part of the trick" hints at something more but does not say what it is.`),
        q(13, 'medium', `Based on paragraph 4, what can the reader infer about scientists' understanding of octopus camouflage?`, [
          right(`They still do not fully know how octopuses match colors they may not see.`),
          wrong(`They have proven that the skin senses light and controls every color.`, 'overstates-evidence'),
          wrong(`They have shown that octopuses see colors more clearly than people.`, 'contradicts-text'),
          wrong(`They believe octopuses do not really match their surroundings at all.`, 'contradicts-text'),
        ], `Paragraph 4 gives two possible explanations and says, "The question has not been settled." The skin idea is only what "some researchers think," so calling it proven goes beyond the text.`),
        q(14, 'medium', `Which detail best supports the inference that an octopus depends on disguise to stay safe?`, [
          right(`An octopus has no shell and no sharp spines to protect it.`),
          wrong(`An octopus has thousands of tiny color sacs under its skin.`, 'wrong-supporting-detail'),
          wrong(`Many studies suggest octopuses do not see colors like people.`, 'wrong-supporting-detail'),
          wrong(`Some researchers think the octopus judges brightness instead.`, 'wrong-supporting-detail'),
        ], `Without a shell or spines, the octopus has no body armor, so disguise matters for its safety. The color sacs explain how disguise works, not why the octopus needs it.`),
        q(15, 'hard', `A student claims that color changes help an octopus escape, not only hide. Which evidence best supports this claim?`, [
          right(`A sudden dark flash can confuse an attacker, giving time to squirt ink and leave.`),
          wrong(`Controlling many sacs at once lets the octopus match the rocks around it.`, 'supports-different-claim'),
          wrong(`Raising bumps on its skin helps an octopus blend in on rough coral.`, 'supports-different-claim'),
          wrong(`Some researchers think the octopus skin may be able to sense light.`, 'wrong-supporting-detail'),
        ], `Paragraph 5 says a dark flash can confuse an attacker so the octopus can "squirt ink and jet away," which is escaping. Matching the rocks is real evidence, but it supports hiding, not escaping.`),
      ],
    },
    {
      code: 'rg6-evidence-inference-p04',
      title: 'Rolling on the Court',
      body: `On Saturday mornings, the gym at Ridgeview Recreation Center fills with the squeak of rubber tires. The Ridgeview Rollers, a youth wheelchair basketball team, practice there every week. Some players use wheelchairs in daily life. Others do not, but they join because they enjoy the game.\n\nWheelchair basketball follows most of the same rules as the standing game. The hoop is the same height, and the court is the same size. A few rules are different, however. A player may push the wheels twice while holding the ball, but then must pass, shoot or bounce it. Players who push three times are called for traveling.\n\nThe chairs used on the court are not ordinary wheelchairs. Their wheels tilt outward at the bottom, which makes the chair harder to tip over during quick turns. A small wheel at the back keeps players from falling backward. Coach Teresa Okafor says new players are often surprised by how light the chairs are.\n\nThe team's practices focus on skills that standing players may never think about. Players learn to stop by grabbing the wheels and to spin in tight circles. They practice shooting from a seated position, which means the power must come from the arms and shoulders rather than the legs. Okafor reminds them that a strong shot from the chair takes months of practice.\n\nLast season, the Rollers won only two games. This year they have already won five, and attendance at home games has doubled. Several players credit the extra practice time the center added in the fall.`,
      items: [
        q(16, 'easy', `According to the passage, what happens when a player pushes the wheels three times while holding the ball?`, [
          right(`The player is called for traveling.`),
          wrong(`The player must sit out the quarter.`, 'unsupported-inference'),
          wrong(`The player must shoot a free throw.`, 'misreads-detail'),
          wrong(`The player earns one extra push.`, 'misreads-detail'),
        ], `Paragraph 2 says, "Players who push three times are called for traveling." The passage never mentions sitting out or free throws.`),
        q(17, 'easy', `Which sentence from the passage best shows that the court itself is not changed for wheelchair basketball?`, [
          right(`"The hoop is the same height, and the court is the same size."`),
          wrong(`"A few rules are different, however."`, 'wrong-supporting-detail'),
          wrong(`"The chairs used on the court are not ordinary wheelchairs."`, 'wrong-supporting-detail'),
          wrong(`"Players learn to stop by grabbing the wheels."`, 'wrong-supporting-detail'),
        ], `Only the sentence about the hoop and court size describes the court staying the same. The sentence about different rules points to changes, not to the court.`),
        q(18, 'medium', `Based on the passage, why are the wheels on game chairs tilted outward at the bottom?`, [
          right(`Players make fast, sharp turns that could tip over an ordinary chair.`),
          wrong(`The tilt lets players roll faster when they move in a straight line.`, 'unsupported-inference'),
          wrong(`The tilt makes the chair heavier so it stays still during a shot.`, 'contradicts-text'),
          wrong(`The tilt makes the chair more comfortable for long trips outdoors.`, 'unsupported-inference'),
        ], `Paragraph 3 says the tilt makes the chair "harder to tip over during quick turns," which shows players turn sharply. The chair is not heavier: the coach says new players are surprised by how light the chairs are.`),
        q(19, 'medium', `Which sentence from the passage best supports the idea that shooting well from a wheelchair is especially difficult?`, [
          right(`"Okafor reminds them that a strong shot from the chair takes months of practice."`),
          wrong(`"Players learn to stop by grabbing the wheels and to spin in tight circles."`, 'wrong-supporting-detail'),
          wrong(`"A small wheel at the back keeps players from falling backward."`, 'wrong-supporting-detail'),
          wrong(`"Coach Teresa Okafor says new players are often surprised by how light the chairs are."`, 'wrong-supporting-detail'),
        ], `Needing months of practice for a strong shot shows that shooting from the chair is hard. Stopping and spinning are skills too, but that sentence is about moving the chair, not shooting.`),
        q(20, 'hard', `Which two details together best support the inference that the extra practice time paid off for the Rollers?`, [
          right(`The team has already won five games, and players credit the extra practice.`),
          wrong(`Home attendance has doubled, and the hoop is the same height as usual.`, 'wrong-supporting-detail'),
          wrong(`The team won two games last season, and the game chairs are very light.`, 'wrong-supporting-detail'),
          wrong(`The team practices on Saturdays, and some players do not use wheelchairs.`, 'wrong-supporting-detail'),
        ], `Winning more games shows improvement, and the players linking it to the added practice connects the two. The detail about attendance shows more fans, but the hoop height has nothing to do with practice.`),
      ],
    },
    {
      code: 'rg6-evidence-inference-p05',
      title: 'Making Paper by Hand',
      body: `Most paper today comes from huge machines in factories. Yet some artists still make paper one sheet at a time, using a method that is hundreds of years old. The process takes patience, but it lets the maker control the color, thickness and texture of every page.\n\nThe first step is to make pulp. Papermakers tear plant fibers or old cotton rags into small pieces and soak them in water. Then they beat the mixture until the fibers separate and float freely. The result looks a bit like thin oatmeal.\n\nNext comes the mold, a wooden frame with a fine screen stretched across it. The papermaker dips the mold into a vat of pulp and lifts it out flat. Water drains through the screen, leaving a thin layer of fibers on top. A gentle shake from side to side helps the fibers lock together. If the papermaker tilts the mold while lifting, the sheet will be thicker on one side.\n\nThe wet sheet is then flipped onto a piece of felt. Sheets and felts are stacked and pressed to squeeze out more water. Finally, the sheets are hung or laid out to dry, which can take a day or longer.\n\nHandmade paper often has rough, feathery edges, and no two sheets are exactly alike. Some makers add flower petals or colored threads to the pulp before dipping the mold. Teachers at Brightwater Community Arts Center say students are usually surprised that their first sheets come out uneven. Most improve after a few tries, once they learn to lift the mold slowly and evenly.`,
      items: [
        q(21, 'easy', `According to the passage, why do papermakers beat the soaked fibers?`, [
          right(`To separate the fibers so they float freely in the water.`),
          wrong(`To press the water out of the sheets before they dry.`, 'confuses-details'),
          wrong(`To add color by mixing in petals and colored threads.`, 'confuses-details'),
          wrong(`To smooth the rough, feathery edges of each sheet.`, 'unsupported-inference'),
        ], `Paragraph 2 says they beat the mixture "until the fibers separate and float freely." Pressing out water is a later step done with stacked felts.`),
        q(22, 'medium', `Which sentence from the passage best supports the idea that the way the mold is lifted affects the finished sheet?`, [
          right(`"If the papermaker tilts the mold while lifting, the sheet will be thicker on one side."`),
          wrong(`"Water drains through the screen, leaving a thin layer of fibers on top."`, 'wrong-supporting-detail'),
          wrong(`"The papermaker dips the mold into a vat of pulp and lifts it out flat."`, 'too-general'),
          wrong(`"Some makers add flower petals or colored threads to the pulp."`, 'wrong-supporting-detail'),
        ], `The tilting sentence shows a change in lifting causing a change in the sheet. The sentence about lifting the mold out flat describes the step but does not show any effect on the paper.`),
        q(23, 'medium', `What can the reader infer about why the sheets are pressed between felts before drying?`, [
          right(`Pressing removes water that would otherwise make drying take longer.`),
          wrong(`Pressing pushes the flower petals deep into the middle of each sheet.`, 'unsupported-inference'),
          wrong(`Pressing trims the rough edges so every sheet looks exactly the same.`, 'contradicts-text'),
          wrong(`Pressing allows the papermaker to use the same felt again and again.`, 'unsupported-inference'),
        ], `Paragraph 4 says pressing squeezes out water, and drying can already take a day or longer, so less water means faster drying. The text says handmade sheets keep rough edges and are never exactly alike.`),
        q(24, 'medium', `Based on the passage, why might an artist choose to make paper by hand instead of buying factory paper?`, [
          right(`Making it by hand lets the artist control the color, thickness and texture.`),
          wrong(`Making it by hand is faster than running a large machine in a factory.`, 'contradicts-text'),
          wrong(`Making it by hand gives perfectly even sheets with smooth, straight edges.`, 'contradicts-text'),
          wrong(`Making it by hand uses no water, so it is easier to do in a small space.`, 'contradicts-text'),
        ], `Paragraph 1 says the method "lets the maker control the color, thickness and texture of every page." The text says the process "takes patience," so it is not faster.`),
        q(25, 'hard', `Which evidence best supports the inference that making good handmade paper is a skill learned with practice?`, [
          right(`Most students improve after a few tries, once they learn to lift slowly.`),
          wrong(`No two handmade sheets are exactly alike, even from the same maker.`, 'wrong-supporting-detail'),
          wrong(`The finished sheets are hung or laid out to dry for a day or longer.`, 'wrong-supporting-detail'),
          wrong(`The method used to make the paper is hundreds of years old.`, 'wrong-supporting-detail'),
        ], `Students getting better after a few tries shows that skill grows with practice. Sheets differing from one another describes handmade paper in general, not a maker's improvement.`),
      ],
    },
    {
      code: 'rg6-evidence-inference-p06',
      title: 'Counting the Rain',
      body: `Weather forecasters use satellites, radar and computer models to track storms. Still, some of the most useful rain records come from ordinary people with plastic tubes in their backyards. Across many regions, volunteers measure rain and snow every morning and share their numbers online.\n\nThe equipment is simple. A rain gauge is a clear tube marked with lines, much like a measuring cup. It is placed in an open spot, away from trees and roofs that could block or add water. Each morning at about the same time, the volunteer reads the level, records it and empties the tube.\n\nWhy do these backyard numbers matter when radar exists? Radar estimates rainfall from high above, and the estimates can be off. A thunderstorm might drop heavy rain on one neighborhood and barely touch another a few miles away. A network of gauges on the ground shows those differences clearly.\n\nThe records are used in many ways. Farmers check them to decide when to water their fields. Scientists compare them with radar to make future estimates more accurate. City workers study them after storms to learn which streets flood most easily.\n\nVolunteer Malik Haddad has measured rain in his yard for six years. He began after a summer storm flooded his street while the official weather station across town recorded only a light shower. He now trains new volunteers at the public library twice a year. He tells them that a missed day is fine, but a guessed number is not, because one wrong number can mislead everyone who uses the data.`,
      items: [
        q(26, 'easy', `According to the passage, where should a rain gauge be placed?`, [
          right(`In an open spot, away from trees and roofs.`),
          wrong(`Under a tree, where it is shaded from the sun.`, 'contradicts-text'),
          wrong(`On a roof, where it is closest to the clouds.`, 'contradicts-text'),
          wrong(`Inside the library, where volunteers can see it.`, 'confuses-details'),
        ], `Paragraph 2 says the gauge goes "in an open spot, away from trees and roofs that could block or add water." The library is where Haddad trains volunteers, not where gauges go.`),
        q(27, 'medium', `Which sentence from the passage best supports the idea that rainfall can vary a great deal over a short distance?`, [
          right(`"A thunderstorm might drop heavy rain on one neighborhood and barely touch another a few miles away."`),
          wrong(`"Radar estimates rainfall from high above, and the estimates can be off."`, 'wrong-supporting-detail'),
          wrong(`"Across many regions, volunteers measure rain and snow every morning."`, 'wrong-supporting-detail'),
          wrong(`"Farmers check them to decide when to water their fields."`, 'wrong-supporting-detail'),
        ], `The thunderstorm sentence directly compares two places only a few miles apart. The radar sentence says estimates can be wrong, but it does not describe rain differing from place to place.`),
        q(28, 'medium', `What can the reader infer from the event that led Malik Haddad to start measuring rain?`, [
          right(`He saw that one distant station could miss how much rain fell on his street.`),
          wrong(`He wanted to replace the official weather station with his own gauge.`, 'unsupported-inference'),
          wrong(`He believed that radar always gave a perfect count of the rainfall.`, 'contradicts-text'),
          wrong(`He hoped to become a forecaster who works on television someday.`, 'unsupported-inference'),
        ], `His street flooded while the station across town recorded only a light shower, so the station missed his area's rain. Nothing in the text says he wanted to replace the station; he added his own records to it.`),
        q(29, 'medium', `Based on paragraph 4, what can the reader infer about the volunteer rain records?`, [
          right(`They are useful to people with very different kinds of jobs.`),
          wrong(`They are only useful to scientists who study storm radar.`, 'too-narrow'),
          wrong(`They have completely replaced radar in weather forecasting.`, 'overstates-evidence'),
          wrong(`They are mostly used to measure snow rather than rain.`, 'unsupported-inference'),
        ], `Paragraph 4 shows farmers, scientists and city workers all using the records. Scientists are only one of the three groups named, so "only" scientists is too narrow.`),
        q(30, 'hard', `Haddad warns that a guessed number can "mislead everyone who uses the data." Which detail from the passage best supports this warning?`, [
          right(`Farmers check the records to decide when to water their fields.`),
          wrong(`A rain gauge is a clear tube marked with lines like a measuring cup.`, 'wrong-supporting-detail'),
          wrong(`Haddad trains new volunteers at the public library twice a year.`, 'wrong-supporting-detail'),
          wrong(`Volunteers read the gauge at about the same time every morning.`, 'wrong-supporting-detail'),
        ], `If farmers make watering choices from the records, a guessed number could lead them to the wrong choice. The detail about training volunteers shows Haddad's work, but not how a wrong number could cause harm.`),
      ],
    },
    {
      code: 'rg6-evidence-inference-p07',
      title: 'Our Playground Needs Shade Trees',
      body: `Every spring, our school's playground turns into a griddle. The blacktop soaks up the sun, and by lunchtime the slide is too hot to touch. Students crowd into the thin strip of shade beside the building, and many stop playing altogether. I believe our school should plant a row of shade trees along the edge of the playground.\n\nShade makes a real difference in temperature. Last May, our science class measured the ground in several spots at noon. The open blacktop read 51 degrees Celsius. The grass under the one old maple near the fence read 29 degrees. That is a difference of more than twenty degrees in the same yard at the same moment.\n\nTrees would also help students stay active. When the playground is too hot, students sit instead of running. Our physical education teacher, Mr. Delgado, has noticed that recess games end early on hot days. More shade would let students play longer and more safely.\n\nSome people worry about cost and care. Young trees do cost money, and they need water during their first few summers. However, our parent group has offered to raise funds, and the eighth graders' service club has volunteered to water the trees. A nearby plant nursery has also offered a discount for schools.\n\nTrees take years to grow tall, so the best time to plant them is now. If we start this fall, students in the younger grades will enjoy real shade before they leave our school. I urge our principal and school leaders to approve the plan at their next meeting.\n\nPriya Raman, Grade 8`,
      items: [
        q(31, 'easy', `According to the passage, who has volunteered to water the young trees?`, [
          right(`The eighth graders' service club`),
          wrong(`The school's parent group members`, 'confuses-details'),
          wrong(`The workers from a nearby nursery`, 'confuses-details'),
          wrong(`The students in Mr. Delgado's class`, 'unsupported-inference'),
        ], `Paragraph 4 says "the eighth graders' service club has volunteered to water the trees." The parent group offered to raise money, not to water.`),
        q(32, 'medium', `Which sentence from the passage best supports the writer's claim that heat keeps students from being active?`, [
          right(`"Our physical education teacher, Mr. Delgado, has noticed that recess games end early on hot days."`),
          wrong(`"The open blacktop read 51 degrees Celsius."`, 'supports-different-claim'),
          wrong(`"Young trees do cost money, and they need water during their first few summers."`, 'wrong-supporting-detail'),
          wrong(`"A nearby plant nursery has also offered a discount for schools."`, 'wrong-supporting-detail'),
        ], `Games ending early on hot days shows that heat cuts down on activity. The blacktop temperature shows the playground is hot, but it says nothing about what students do.`),
        q(33, 'medium', `Based on paragraph 4, what can the reader infer about the writer's view of the cost and care concerns?`, [
          right(`The writer thinks the community has already found ways to handle them.`),
          wrong(`The writer thinks the concerns are serious enough to stop the plan.`, 'contradicts-text'),
          wrong(`The writer thinks the trees will need no water after they are planted.`, 'contradicts-text'),
          wrong(`The writer thinks the school should pay for everything on its own.`, 'unsupported-inference'),
        ], `After naming the concerns, the writer lists the parent group, the service club and the nursery discount as answers to them. The writer admits young trees need water, so saying they need none goes against the text.`),
        q(34, 'hard', `Which inference is best supported by the final paragraph?`, [
          right(`The writer's own class may not benefit much, but younger students will.`),
          wrong(`Trees planted this fall will give full shade by the next spring.`, 'contradicts-text'),
          wrong(`The principal and school leaders have already approved the plan.`, 'contradicts-text'),
          wrong(`The writer would rather wait a few years before planting trees.`, 'contradicts-text'),
        ], `The writer is in grade 8 and says trees take years to grow, and only "younger grades" will enjoy shade before leaving. The trees cannot give full shade by spring, since the writer says they "take years to grow tall."`),
        q(35, 'hard', `Which piece of evidence most directly supports the writer's claim that "shade makes a real difference in temperature"?`, [
          right(`At noon, the grass under the maple read 29 degrees while the blacktop read 51.`),
          wrong(`At lunchtime, students crowd into the thin strip of shade by the building.`, 'weaker-evidence'),
          wrong(`By lunchtime in spring, the slide on the playground is too hot to touch.`, 'too-narrow'),
          wrong(`On hot days, recess games end early according to the physical education teacher.`, 'supports-different-claim'),
        ], `Only the class measurements compare a shaded spot and a sunny spot at the same moment, which directly shows the temperature difference. Students crowding into shade suggests it feels cooler, but it gives no measurement to prove it.`),
      ],
    },
    {
      code: 'rg6-evidence-inference-p08',
      title: 'Telling Time Before Clocks',
      body: `Long ago, people had no watches or phones to tell them the time. Still, they needed to know when to plant crops, when to meet and when to rest. Over thousands of years, people in many parts of the world invented clever tools to measure the passing day.\n\nOne of the earliest tools was the sundial. A sundial has a flat face and an upright piece that casts a shadow. As the sun moves across the sky, the shadow moves too, pointing to marks on the face. A sundial works well on a clear afternoon. It is useless at night, however, and it struggles on cloudy days.\n\nTo solve that problem, people built water clocks. A simple water clock is a container with a tiny hole near the bottom. Water drips out at a steady rate, and lines on the inside show how much time has passed as the level drops. Some water clocks were used to time speeches or meetings, so that each speaker received a fair turn.\n\nWater clocks had weaknesses of their own. As the water level dropped, there was less weight pushing down, so the water dripped more slowly. Makers learned to shape their containers wider at the top and narrower at the bottom to balance this effect. In cold places, the water could also freeze.\n\nOther inventors tried candles marked with lines and glass timers filled with sand. Each tool fixed one problem but created another. Only when mechanical clocks with gears and weights appeared did people have a steady way to measure time day and night, in any weather.`,
      items: [
        q(36, 'easy', `According to the passage, how does a sundial show the time?`, [
          right(`A shadow moves with the sun and points to marks.`),
          wrong(`Water drips out and the level falls past lines.`, 'confuses-details'),
          wrong(`A candle burns down past lines along its side.`, 'confuses-details'),
          wrong(`Gears and weights turn hands around a face.`, 'confuses-details'),
        ], `Paragraph 2 says the shadow moves as the sun moves, "pointing to marks on the face." Dripping water describes a water clock, a different tool.`),
        q(37, 'medium', `Which sentence from the passage best supports the idea that people needed a tool other than the sundial?`, [
          right(`"It is useless at night, however, and it struggles on cloudy days."`),
          wrong(`"A sundial works well on a clear afternoon."`, 'opposite-evidence'),
          wrong(`"A sundial has a flat face and an upright piece that casts a shadow."`, 'wrong-supporting-detail'),
          wrong(`"In cold places, the water could also freeze."`, 'confuses-details'),
        ], `The sundial's failure at night and on cloudy days explains why another tool was needed. Working well on a clear afternoon is a strength, so it does not show any need for something else.`),
        q(38, 'medium', `What can the reader infer about water clock containers that were wider at the top?`, [
          right(`They helped the clock keep more even time as the water level fell.`),
          wrong(`They kept the water from freezing during the coldest months.`, 'confuses-details'),
          wrong(`They made the clock easier to carry from one place to another.`, 'unsupported-inference'),
          wrong(`They let the clock run all night without any water in it.`, 'unsupported-inference'),
        ], `Paragraph 4 says water dripped more slowly as the level dropped, and the wide top and narrow bottom were shaped "to balance this effect." Freezing is mentioned as a separate weakness that the shape did not fix.`),
        q(39, 'hard', `Which detail best supports the inference that water clocks were valued for fairness, not just for telling the hour?`, [
          right(`Some were used to time speeches so each speaker received a fair turn.`),
          wrong(`Lines on the inside showed how much time had passed as water fell.`, 'wrong-supporting-detail'),
          wrong(`Water dripped out of a tiny hole near the bottom at a steady rate.`, 'wrong-supporting-detail'),
          wrong(`They could be used at night, when sundials were of no help at all.`, 'supports-different-claim'),
        ], `Timing speeches so each speaker got "a fair turn" shows the clocks were used to treat people equally. Working at night is a real advantage, but it is about telling time, not fairness.`),
        q(40, 'hard', `Which conclusion about early timekeeping tools is best supported by the passage as a whole?`, [
          right(`Each tool had limits, so people kept inventing better ways to measure time.`),
          wrong(`The sundial was the most accurate timekeeping tool that people ever made.`, 'contradicts-text'),
          wrong(`Water clocks quickly replaced every other tool and were used everywhere.`, 'overstates-evidence'),
          wrong(`People did not care about knowing the time until mechanical clocks appeared.`, 'contradicts-text'),
        ], `The passage moves from sundials to water clocks to candles and sand timers, noting that "each tool fixed one problem but created another." Paragraph 1 says people needed to know the time long ago, so they did care before mechanical clocks.`),
      ],
    },
  ],
}

export default skill
