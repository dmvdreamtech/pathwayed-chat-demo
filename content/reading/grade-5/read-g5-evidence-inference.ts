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
  slug: 'read-g5-evidence-inference',
  subject: 'reading',
  grade: 5,
  group: 'Informational text',
  name: 'Key Details, Evidence and Inference',
  standards: ['RI.5.1'],
  passages: [
    {
      code: 'rg5-evidence-inference-p01',
      title: 'Rivers of Ice',
      body: `A glacier is a huge body of ice that moves very slowly over land. It forms in places where more snow falls in winter than melts in summer. Year after year, the snow piles up and presses down on the layers below. Over time, the bottom layers turn into thick, solid ice.\n\nWhen a glacier grows heavy enough, it begins to slide downhill. Most glaciers move only a few inches or feet each day. That is too slow for a person to notice by watching. Scientists track the movement by placing markers on the ice and measuring them again weeks later.\n\nAs a glacier moves, it acts like a giant scraper. Rocks frozen into the bottom of the ice grind against the ground. They leave long scratches on the bedrock below. These scratches all point in the same direction, the direction the ice traveled.\n\nGlaciers also change the shape of whole valleys. A river usually cuts a narrow valley shaped like the letter V. A glacier is much wider, so it carves a broad valley shaped like the letter U. Some U-shaped valleys are found in places that have no ice today.\n\nWhen a glacier melts, it drops the rocks and soil it was carrying. Sometimes a single boulder ends up sitting alone in a field, far from any rock like it. Geologists call these boulders erratics, because they seem to have wandered away from home.`,
      items: [
        q(1, 'easy', `According to the passage, how does a glacier form?`, [
          right(`Snow piles up for years, and the weight turns the bottom layers into ice.`),
          wrong(`A river freezes solid during a cold winter and then starts to slide.`, 'unsupported-inference'),
          wrong(`Rocks and soil freeze together on a mountain and harden into ice.`, 'misreads-detail'),
          wrong(`Snow melts each summer and refreezes into ice on the valley floor.`, 'confuses-cause-effect'),
        ], `Paragraph 1 says snow "piles up and presses down on the layers below" until "the bottom layers turn into thick, solid ice." The passage says glaciers form where more snow falls than melts, so melting is not what builds them.`),
        q(2, 'easy', `Which quotation from the passage explains how scientists know that a glacier is moving?`, [
          right(`"Scientists track the movement by placing markers on the ice and measuring them again weeks later."`),
          wrong(`"That is too slow for a person to notice by watching."`, 'wrong-supporting-detail'),
          wrong(`"When a glacier grows heavy enough, it begins to slide downhill."`, 'wrong-supporting-detail'),
          wrong(`"As a glacier moves, it acts like a giant scraper."`, 'too-general'),
        ], `Only the sentence about markers tells how scientists measure the movement. The sentence about watching explains why people cannot see the movement, not how scientists check it.`),
        q(3, 'medium', `What can the reader infer about a U-shaped valley in a place that has no ice today?`, [
          right(`A glacier probably moved through the valley long ago.`),
          wrong(`A river probably cut the valley in the last few years.`, 'contradicts-text'),
          wrong(`The valley will probably fill with ice again next winter.`, 'unsupported-inference'),
          wrong(`The valley was probably shaped by people using machines.`, 'unsupported-inference'),
        ], `The passage says a glacier "carves a broad valley shaped like the letter U," so a U shape is a clue that ice was once there. A river "usually cuts a narrow valley shaped like the letter V," not a U.`),
        q(4, 'medium', `Which quotation best supports the idea that glaciers can carry heavy objects a long way?`, [
          right(`"Sometimes a single boulder ends up sitting alone in a field, far from any rock like it."`),
          wrong(`"Most glaciers move only a few inches or feet each day."`, 'wrong-supporting-detail'),
          wrong(`"They leave long scratches on the bedrock below."`, 'wrong-supporting-detail'),
          wrong(`"Over time, the bottom layers turn into thick, solid ice."`, 'wrong-supporting-detail'),
        ], `A boulder left "far from any rock like it" shows the ice moved it a long distance. The scratches show rocks dragging along the ground, but not how far anything was carried.`),
        q(5, 'hard', `A hiker finds long scratches on flat bedrock, and all of them run from north to south. Based on the passage, which conclusion is best supported?`, [
          right(`A glacier once moved across this rock in a north and south direction.`),
          wrong(`A river once flowed over this rock and cut the scratches into it.`, 'confuses-cause-effect'),
          wrong(`A glacier is still sitting on top of this rock under the ground.`, 'unsupported-inference'),
          wrong(`An erratic boulder rolled across the rock after the ice melted.`, 'misapplies-detail'),
        ], `Paragraph 3 says rocks in a glacier leave scratches that "all point in the same direction, the direction the ice traveled." The passage connects rivers to V-shaped valleys, not to scratches on bedrock.`),
      ],
    },
    {
      code: 'rg5-evidence-inference-p02',
      title: 'Libraries on Wheels',
      body: `More than a hundred years ago, many families lived far from any town. Children on farms might never visit a library. A few librarians decided that if people could not come to the books, the books would go to the people.\n\nThe earliest traveling libraries were simple. A librarian loaded wooden boxes of books onto a horse-drawn wagon. The wagon stopped at farms, general stores and country schools. Families chose a few books and kept them until the wagon came back, often a month later.\n\nLater, libraries used trucks with shelves built inside. These were called bookmobiles. A bookmobile could carry far more books than a wagon. It could also travel greater distances in one day. Some had small desks and stools, so readers could step inside and browse as if they were in a tiny library.\n\nBookmobile drivers learned what their regular readers liked. A driver might save a new adventure book for a boy who had finished every other one on the shelves. Some readers waited at the end of a dirt road for an hour before the bookmobile arrived.\n\nBookmobiles still travel today. Some visit neighborhoods without a nearby library branch. Others stop at senior centers or summer camps. Many now carry tablets and offer internet access along with printed books.`,
      items: [
        q(6, 'easy', `According to the passage, how long did families usually keep the books from the wagon?`, [
          right(`Until the wagon came back, which was often a month later`),
          wrong(`Only for the afternoon while the wagon was parked nearby`, 'misreads-detail'),
          wrong(`For a whole year, until the next school year started`, 'unsupported-inference'),
          wrong(`Forever, because the books were gifts from the librarian`, 'unsupported-inference'),
        ], `Paragraph 2 says families "kept them until the wagon came back, often a month later." Nothing in the passage says the books were kept for only an afternoon or given away.`),
        q(7, 'easy', `Which quotation shows that bookmobiles were an improvement over wagons?`, [
          right(`"A bookmobile could carry far more books than a wagon."`),
          wrong(`"The earliest traveling libraries were simple."`, 'wrong-supporting-detail'),
          wrong(`"These were called bookmobiles."`, 'too-general'),
          wrong(`"Bookmobiles still travel today."`, 'wrong-supporting-detail'),
        ], `Carrying "far more books than a wagon" directly compares the two and shows the truck was better. "These were called bookmobiles" only names the trucks.`),
        q(8, 'medium', `Some readers "waited at the end of a dirt road for an hour" for the bookmobile. What can the reader infer from this detail?`, [
          right(`The bookmobile visits were very important to those readers.`),
          wrong(`The bookmobile drivers were often lost on the dirt roads.`, 'unsupported-inference'),
          wrong(`The readers did not like the books the driver brought.`, 'contradicts-text'),
          wrong(`The readers lived right next door to a large library.`, 'contradicts-text'),
        ], `People would only wait an hour on a dirt road for something they cared about a great deal. The passage never says drivers got lost, so that choice is not supported.`),
        q(9, 'medium', `Which quotation best shows that the first traveling libraries were meant to solve a problem of distance?`, [
          right(`"if people could not come to the books, the books would go to the people."`),
          wrong(`"Some had small desks and stools, so readers could step inside and browse."`, 'wrong-supporting-detail'),
          wrong(`"Bookmobile drivers learned what their regular readers liked."`, 'wrong-supporting-detail'),
          wrong(`"Many now carry tablets and offer internet access along with printed books."`, 'wrong-supporting-detail'),
        ], `The librarians decided to bring books to people who lived too far away to come to a library. The desks and stools describe what bookmobiles were like inside, not why they were started.`),
        q(10, 'hard', `Based on the passage, which statement about bookmobiles today is best supported?`, [
          right(`They still serve people who cannot easily reach a library, and they offer more than books.`),
          wrong(`They have replaced library buildings, so most towns no longer need a library branch.`, 'overgeneralization'),
          wrong(`They now visit only farms, because farm families live the farthest from town.`, 'outdated-detail'),
          wrong(`They no longer carry printed books, because readers now use tablets instead.`, 'misreads-detail'),
        ], `The last paragraph says bookmobiles visit places "without a nearby library branch" and offer internet access "along with printed books." "Along with" means printed books are still carried, so the tablet choice misreads the text.`),
      ],
    },
    {
      code: 'rg5-evidence-inference-p03',
      title: 'A Long Trip for a Tiny Bird',
      body: `The ruby-throated hummingbird weighs less than a nickel. Yet each fall, many of these tiny birds fly from the eastern part of North America to Central America. Some cross a wide stretch of sea without stopping. That trip is about five hundred miles over open water.\n\nTo get ready, a hummingbird eats and eats. In the weeks before it leaves, it may nearly double its weight. The extra weight is stored fat, which the bird burns like fuel during the long flight. A bird that sets out too thin may not have enough energy to finish.\n\nHummingbirds travel alone, not in flocks. Young birds make the trip for the first time without an adult to follow. Scientists are still studying how the young birds know which way to go. Many believe the birds are born with a sense of direction.\n\nPeople can help hummingbirds along the way. Flowers such as bee balm and trumpet vine give them nectar. Some people hang feeders filled with sugar water. Experts suggest leaving feeders up for a few weeks after the last bird is seen. A late traveler passing through may still need a meal.`,
      items: [
        q(11, 'easy', `According to the passage, why does a hummingbird gain weight before it migrates?`, [
          right(`The extra fat gives it energy to burn during the long flight.`),
          wrong(`The extra weight keeps the strong sea winds from blowing it away.`, 'unsupported-inference'),
          wrong(`The extra fat keeps it warm while it rests in cold places.`, 'unsupported-inference'),
          wrong(`The extra weight helps it scare other birds away from feeders.`, 'unsupported-inference'),
        ], `Paragraph 2 says the fat is something "the bird burns like fuel during the long flight." The passage never mentions wind or warmth as reasons for gaining weight.`),
        q(12, 'easy', `Which quotation shows that hummingbirds do not migrate in groups?`, [
          right(`"Hummingbirds travel alone, not in flocks."`),
          wrong(`"To get ready, a hummingbird eats and eats."`, 'wrong-supporting-detail'),
          wrong(`"People can help hummingbirds along the way."`, 'wrong-supporting-detail'),
          wrong(`"Some cross a wide stretch of sea without stopping."`, 'wrong-supporting-detail'),
        ], `The sentence "Hummingbirds travel alone, not in flocks" says directly that they do not fly in groups. Crossing the sea without stopping tells about the route, not whether the birds travel together.`),
        q(13, 'medium', `Young hummingbirds "make the trip for the first time without an adult to follow." What can the reader infer from this detail?`, [
          right(`Young birds must find the way south without being shown.`),
          wrong(`Young birds stay behind until an adult comes back for them.`, 'contradicts-text'),
          wrong(`Young birds take a shorter path than the adult birds take.`, 'unsupported-inference'),
          wrong(`Young birds learn the route by watching people's feeders.`, 'unsupported-inference'),
        ], `If no adult leads them, young birds have to find the route on their own, which is why scientists wonder how they "know which way to go." Nothing in the passage says young birds take a shorter path.`),
        q(14, 'medium', `Which quotation best explains why experts suggest leaving feeders up after the last bird is seen?`, [
          right(`"A late traveler passing through may still need a meal."`),
          wrong(`"Flowers such as bee balm and trumpet vine give them nectar."`, 'wrong-supporting-detail'),
          wrong(`"In the weeks before it leaves, it may nearly double its weight."`, 'wrong-supporting-detail'),
          wrong(`"Many believe the birds are born with a sense of direction."`, 'wrong-supporting-detail'),
        ], `The sentence right after the advice gives the reason: a late bird may still pass by and need food. The flower sentence tells another way to feed birds, but not why feeders should stay up longer.`),
        q(15, 'hard', `Which two details from the passage together best support the idea that migration is risky for a hummingbird?`, [
          right(`It may fly about five hundred miles over open water, and a bird that is too thin may not finish.`),
          wrong(`It weighs less than a nickel, and people hang feeders filled with sugar water.`, 'wrong-supporting-detail'),
          wrong(`It travels alone instead of in a flock, and bee balm and trumpet vine give it nectar.`, 'wrong-supporting-detail'),
          wrong(`Scientists are still studying its sense of direction, and experts suggest feeders.`, 'too-narrow'),
        ], `A long flight over water with no place to stop, plus the warning that a thin bird "may not have enough energy to finish," both point to danger. Feeders and flowers are ways people help, not signs of risk.`),
      ],
    },
    {
      code: 'rg5-evidence-inference-p04',
      title: 'How a Suspension Bridge Hangs',
      body: `A suspension bridge can stretch across a wide river or bay. The road seems to float in the air. It is really held up by a clever system of cables and towers.\n\nFirst, builders put up two tall towers, one near each shore. Then they string two main cables over the tops of the towers. The ends of the main cables are fastened into huge blocks of concrete on land. These blocks are called anchorages, and they keep the cables from pulling loose.\n\nNext, workers hang many thinner cables straight down from the main cables. These are called suspenders. The road deck is attached to the bottom of the suspenders. The weight of the road and the cars pulls down on the suspenders. The suspenders pass that pull to the main cables, and the main cables pass it to the towers and anchorages.\n\nA main cable is not one thick rope of steel. It is made of thousands of thin steel wires bundled together. If a few wires wear out, the others still share the load. Crews check the cables often and replace worn parts.\n\nWind is a special challenge for long bridges. Engineers test small models in wind tunnels before building. Many newer bridges have a road deck shaped to let air flow smoothly around it.`,
      items: [
        q(16, 'easy', `According to the passage, what is the job of the anchorages?`, [
          right(`They keep the ends of the main cables from pulling loose.`),
          wrong(`They hold up the middle of the road deck over the water.`, 'misreads-detail'),
          wrong(`They let air flow smoothly around the road during storms.`, 'misreads-detail'),
          wrong(`They connect the thin suspenders to the bottom of the road.`, 'misreads-detail'),
        ], `Paragraph 2 says the anchorages "keep the cables from pulling loose." Letting air flow around the bridge is the job of the deck's shape, not the anchorages.`),
        q(17, 'easy', `Which choice accurately quotes the passage to tell what the road deck is attached to?`, [
          right(`"The road deck is attached to the bottom of the suspenders."`),
          wrong(`"The road deck is attached to the top of the main cables."`, 'misquotes-text'),
          wrong(`"The road deck is attached to the bottom of the towers."`, 'misquotes-text'),
          wrong(`"The road deck is attached to the blocks of concrete."`, 'misquotes-text'),
        ], `Paragraph 3 says, "The road deck is attached to the bottom of the suspenders." The other choices change words, so they are not accurate quotations.`),
        q(18, 'medium', `What can the reader infer about why a main cable is made of thousands of wires instead of one thick piece?`, [
          right(`It is safer, because the cable still holds if a few wires wear out.`),
          wrong(`It is cheaper, because thin wires cost nothing to make or replace.`, 'unsupported-inference'),
          wrong(`It is lighter, because thin wires have no weight to carry at all.`, 'unsupported-inference'),
          wrong(`It is quicker, because crews never have to check the cable again.`, 'contradicts-text'),
        ], `The passage says, "If a few wires wear out, the others still share the load," which shows the design keeps the bridge safe. It also says crews "check the cables often," so the choice about never checking the cable again goes against the text.`),
        q(19, 'medium', `Which quotation best supports the idea that engineers plan for wind before a bridge is built?`, [
          right(`"Engineers test small models in wind tunnels before building."`),
          wrong(`"Wind is a special challenge for long bridges."`, 'too-general'),
          wrong(`"Crews check the cables often and replace worn parts."`, 'wrong-supporting-detail'),
          wrong(`"First, builders put up two tall towers, one near each shore."`, 'wrong-supporting-detail'),
        ], `Testing models "before building" shows planning ahead for wind. The sentence that wind is a challenge names the problem but does not show any planning.`),
        q(20, 'hard', `A student says, "The towers hold up the whole bridge all by themselves." Which quotation best shows that this statement is not accurate?`, [
          right(`"The suspenders pass that pull to the main cables, and the main cables pass it to the towers and anchorages."`),
          wrong(`"First, builders put up two tall towers, one near each shore."`, 'supports-wrong-claim'),
          wrong(`"Then they string two main cables over the tops of the towers."`, 'too-narrow'),
          wrong(`"The road seems to float in the air."`, 'wrong-supporting-detail'),
        ], `This sentence shows the load goes to the towers "and anchorages," so the towers share the work. The sentence about stringing cables over the towers mentions towers but does not show where the weight goes.`),
      ],
    },
    {
      code: 'rg5-evidence-inference-p05',
      title: 'Basketball on Wheels',
      body: `Wheelchair basketball is played on the same size court as regular basketball. The hoop is the same height, ten feet off the floor. Players shoot, pass and dribble, just like in any other game. The big difference is that every player moves in a sport wheelchair.\n\nA sport wheelchair looks different from an everyday one. Its wheels tilt inward at the bottom, which makes the chair harder to tip over during quick turns. A small extra wheel sticks out the back to keep the chair from flipping backward. Many chairs also have a metal bumper at the front.\n\nSome rules are changed to fit the chairs. A player may push the wheels twice while holding the ball. After that, the player must pass, shoot or bounce the ball. Taking a third push is a traveling foul.\n\nThe sport has grown over the years. Today, teams play in schools, colleges and community leagues. Some teams include players who can walk but have injuries to their knees or ankles.\n\nShooting from a seated position takes strong arms and shoulders. A player cannot jump to add power to a shot. Many players say the hardest skill to learn is pushing the chair and handling the ball at the same time.`,
      items: [
        q(21, 'easy', `According to the passage, what happens if a player pushes the wheels a third time while holding the ball?`, [
          right(`The player is called for a traveling foul.`),
          wrong(`The player must leave the game for good.`, 'unsupported-inference'),
          wrong(`The other team gets two extra points.`, 'unsupported-inference'),
          wrong(`The player is allowed one more push.`, 'contradicts-text'),
        ], `Paragraph 3 says, "Taking a third push is a traveling foul." The passage gives no other penalty, so the choices about points or leaving the game are not supported.`),
        q(22, 'medium', `Which quotation best supports the idea that sport wheelchairs are designed with safety in mind?`, [
          right(`"A small extra wheel sticks out the back to keep the chair from flipping backward."`),
          wrong(`"A sport wheelchair looks different from an everyday one."`, 'too-general'),
          wrong(`"Today, teams play in schools, colleges and community leagues."`, 'wrong-supporting-detail'),
          wrong(`"Players shoot, pass and dribble, just like in any other game."`, 'wrong-supporting-detail'),
        ], `The extra wheel exists to stop the chair from "flipping backward," which is a safety feature. Saying the chair "looks different" is true but does not explain anything about safety.`),
        q(23, 'medium', `What can the reader infer about a player who makes many long shots in wheelchair basketball?`, [
          right(`The player has probably built strong arms and shoulders.`),
          wrong(`The player probably jumps higher than the other players.`, 'contradicts-text'),
          wrong(`The player probably uses a hoop that is set lower.`, 'contradicts-text'),
          wrong(`The player probably never pushes the wheels at all.`, 'unsupported-inference'),
        ], `The passage says seated shooting "takes strong arms and shoulders" and that a player "cannot jump to add power." It also says the hoop is the same ten feet high, so a lower hoop is not possible.`),
        q(24, 'medium', `Which quotation best supports the idea that wheelchair basketball is a lot like regular basketball?`, [
          right(`"The hoop is the same height, ten feet off the floor."`),
          wrong(`"Some rules are changed to fit the chairs."`, 'opposite-claim'),
          wrong(`"Many chairs also have a metal bumper at the front."`, 'wrong-supporting-detail'),
          wrong(`"A player cannot jump to add power to a shot."`, 'opposite-claim'),
        ], `A hoop at the "same height" shows something that does not change between the two games. The sentence about changed rules shows a difference, which is the opposite of the idea.`),
        q(25, 'hard', `A reader claims, "Only people who cannot walk play wheelchair basketball." Which quotation best shows that this claim is not accurate?`, [
          right(`"Some teams include players who can walk but have injuries to their knees or ankles."`),
          wrong(`"The big difference is that every player moves in a sport wheelchair."`, 'supports-wrong-claim'),
          wrong(`"Today, teams play in schools, colleges and community leagues."`, 'too-general'),
          wrong(`"The sport has grown over the years."`, 'too-general'),
        ], `The passage directly says some players "can walk," which shows the claim is wrong. The sentence that every player uses a wheelchair is true, but it says nothing about whether players can walk.`),
      ],
    },
    {
      code: 'rg5-evidence-inference-p06',
      title: 'Paper Made by Hand',
      body: `Long ago, paper was made one sheet at a time by hand. In many places, the main ingredient was old cloth. Papermakers collected worn shirts and sheets made of cotton or linen. They cut the cloth into small pieces and soaked it in water for days.\n\nNext, the soaked cloth was beaten until the threads broke apart into tiny fibers. The fibers floated in a big tub of water. This made a thin, cloudy mixture called pulp.\n\nTo form a sheet, the papermaker dipped a screen set in a wooden frame into the tub. The papermaker lifted it out level and gave it a gentle shake. The water drained through the screen, and a thin layer of fibers stayed on top. Shaking the screen side to side helped the fibers lock together.\n\nThe wet sheet was flipped onto a piece of felt. Workers stacked sheets and felts into a tall pile. Then they squeezed out more water with a heavy press. Finally, the sheets were hung up to dry.\n\nBecause rags were the main ingredient, paper was often hard to get. Some towns asked families to save every scrap of cloth. Later, people learned to make paper from wood. Wood was far easier to find, and paper became much cheaper.`,
      items: [
        q(26, 'easy', `According to the passage, what was the main ingredient in handmade paper in many places?`, [
          right(`Old cloth made of cotton or linen`),
          wrong(`Fresh wood cut from nearby trees`, 'outdated-detail'),
          wrong(`Felt pieces pressed into thin sheets`, 'misreads-detail'),
          wrong(`Cloudy water scooped from a river`, 'misreads-detail'),
        ], `Paragraph 1 says "the main ingredient was old cloth," such as cotton or linen. Wood was used only "later," so it was not the main ingredient for handmade paper long ago.`),
        q(27, 'medium', `Which quotation explains why the papermaker shook the screen?`, [
          right(`"Shaking the screen side to side helped the fibers lock together."`),
          wrong(`"The water drained through the screen, and a thin layer of fibers stayed on top."`, 'wrong-supporting-detail'),
          wrong(`"The wet sheet was flipped onto a piece of felt."`, 'wrong-supporting-detail'),
          wrong(`"The fibers floated in a big tub of water."`, 'wrong-supporting-detail'),
        ], `This sentence gives the reason for the shaking: it helped the fibers "lock together." The sentence about water draining describes what happens on the screen but does not explain the shaking.`),
        q(28, 'medium', `What can the reader infer about why some towns asked families to save every scrap of cloth?`, [
          right(`Papermakers needed rags, and there were not always enough of them.`),
          wrong(`Families were not allowed to wear old shirts made of cotton.`, 'unsupported-inference'),
          wrong(`Towns wanted to sell the cloth to people who made wood paper.`, 'unsupported-inference'),
          wrong(`Cloth scraps were used to build the frames for the screens.`, 'unsupported-inference'),
        ], `The passage says rags were the main ingredient and paper "was often hard to get," so saving cloth helped supply the papermakers. Nothing in the passage connects the cloth to wood paper or to the frames.`),
        q(29, 'medium', `Which detail best supports the idea that making handmade paper took a long time?`, [
          right(`The cloth was soaked in water for days before it was beaten.`),
          wrong(`The papermaker lifted the screen out level from the tub.`, 'wrong-supporting-detail'),
          wrong(`The wet sheet was flipped onto a piece of felt.`, 'wrong-supporting-detail'),
          wrong(`The pulp was a thin, cloudy mixture of fibers.`, 'wrong-supporting-detail'),
        ], `Soaking "for days" before the next step even starts shows the process was slow. Flipping a sheet onto felt is a step, but it says nothing about how long the work took.`),
        q(30, 'hard', `The passage says paper "became much cheaper" once people made it from wood. Which two details together best explain why?`, [
          right(`Paper made from rags was often hard to get, and wood was far easier to find.`),
          wrong(`Paper was made one sheet at a time, and the sheets were hung up to dry.`, 'wrong-supporting-detail'),
          wrong(`The cloth was cut into pieces, and then it was beaten into tiny fibers.`, 'wrong-supporting-detail'),
          wrong(`Workers used a heavy press, and they stacked felts into a tall pile.`, 'wrong-supporting-detail'),
        ], `The last paragraph explains that rags were scarce while wood "was far easier to find," so paper cost less. The other pairs describe steps of the process and do not explain any change in price.`),
      ],
    },
    {
      code: 'rg5-evidence-inference-p07',
      title: 'Our Class Needs a Weather Station',
      body: `Our school has a science lab, a row of tomato plants and a fish tank. What it does not have is a weather station. I believe every fifth-grade class should build and run one.\n\nA simple station does not cost much. It needs a rain gauge, a thermometer that records the high and low each day, and a wind vane. Students can even build the rain gauge from a clear plastic bottle and a ruler.\n\nA weather station would turn science class into real research. Instead of reading about rainfall in a textbook, students would measure it themselves. They would record numbers every morning and look for patterns over the season. Did the coldest mornings come after clear nights? Did the wind change before a storm? Questions like these make students think like scientists.\n\nSome people worry that the equipment would be broken or forgotten. That is a fair concern. However, classes could take turns as station keepers, one week at a time. A sign-up chart would make sure someone checks the station every school day.\n\nThe data could help the whole school, too. The garden club could check the rain gauge before deciding whether to water the tomatoes. Coaches could look at the wind and temperature before outdoor practice. A weather station is a small project that would teach big lessons.`,
      items: [
        q(31, 'easy', `According to the author, what equipment does a simple weather station need?`, [
          right(`A rain gauge, a thermometer and a wind vane`),
          wrong(`A computer, a camera and a weather balloon`, 'unsupported-inference'),
          wrong(`A fish tank, a ruler and some tomato plants`, 'misreads-detail'),
          wrong(`A textbook, a sign-up chart and a calendar`, 'misreads-detail'),
        ], `Paragraph 2 lists "a rain gauge, a thermometer" and "a wind vane." The fish tank and tomato plants are things the school already has, not parts of the station.`),
        q(32, 'medium', `Which quotation best supports the author's claim that a weather station would not be expensive?`, [
          right(`"Students can even build the rain gauge from a clear plastic bottle and a ruler."`),
          wrong(`"Our school has a science lab, a row of tomato plants and a fish tank."`, 'wrong-supporting-detail'),
          wrong(`"They would record numbers every morning and look for patterns over the season."`, 'supports-different-claim'),
          wrong(`"A sign-up chart would make sure someone checks the station every school day."`, 'supports-different-claim'),
        ], `Building a rain gauge from a bottle and a ruler shows the parts can be cheap. The sentence about recording numbers supports a different claim, that the station would make science into real research.`),
        q(33, 'medium', `Which quotation shows the author answering a reason someone might give against the idea?`, [
          right(`"However, classes could take turns as station keepers, one week at a time."`),
          wrong(`"I believe every fifth-grade class should build and run one."`, 'states-claim-not-response'),
          wrong(`"Did the wind change before a storm?"`, 'wrong-supporting-detail'),
          wrong(`"A simple station does not cost much."`, 'wrong-supporting-detail'),
        ], `After admitting people "worry that the equipment would be broken or forgotten," the author answers with a plan for taking turns. "I believe every fifth-grade class should build and run one" states the author's opinion but does not answer a worry.`),
        q(34, 'hard', `What can the reader infer about how the author compares reading a textbook with measuring weather?`, [
          right(`The author thinks measuring weather yourself teaches more than only reading about it.`),
          wrong(`The author thinks textbooks are better because their numbers are always correct.`, 'opposite-claim'),
          wrong(`The author thinks students should stop using science textbooks for the whole year.`, 'overgeneralization'),
          wrong(`The author thinks reading and measuring teach exactly the same lessons to students.`, 'unsupported-inference'),
        ], `The author says a station would "turn science class into real research" and help students "think like scientists," so measuring is seen as better. The author never says to stop using textbooks completely, so that choice goes too far.`),
        q(35, 'hard', `Which statement accurately describes how the author supports the claim that the data "could help the whole school"?`, [
          right(`The author gives examples of the garden club and coaches using the readings.`),
          wrong(`The author explains that a rain gauge can be made from a plastic bottle.`, 'supports-different-claim'),
          wrong(`The author describes a sign-up chart for choosing weekly station keepers.`, 'supports-different-claim'),
          wrong(`The author lists questions students could ask about cold mornings and wind.`, 'supports-different-claim'),
        ], `Right after the claim, the author explains how the garden club and coaches could use the data. The sign-up chart answers the worry about broken equipment, which is a different point.`),
      ],
    },
    {
      code: 'rg5-evidence-inference-p08',
      title: 'Stories Told in Shadows',
      body: `Shadow puppet theater is one of the oldest forms of storytelling. It has been performed in many parts of the world for hundreds of years. The idea is simple. A light shines on a screen, and puppets held behind the screen cast shadows the audience can see.\n\nTraditional shadow puppets are flat. Many are cut from heavy paper or thin, dried animal hide. Puppet makers punch tiny holes in patterns across the figure. When light passes through the holes, the shadow shows details like the lace on a dress or the feathers on a bird. Some puppets are colored and partly see-through, so their shadows glow in soft shades of red, green and gold.\n\nEach puppet is moved with thin rods. One rod holds up the body. Others are attached to the arms, so a puppet can wave, point or bow. A skilled performer may work two or three puppets at once.\n\nThe distance between the puppet and the light matters. When a puppet moves closer to the light, its shadow grows larger and blurrier. When it presses against the screen, the shadow becomes small and sharp. Performers use this trick to make a giant appear or a bird fly away into the distance.\n\nMany shows include music and a narrator. In some traditions, one performer speaks every character's voice while also moving the puppets.`,
      items: [
        q(36, 'easy', `According to the passage, how do puppet makers show small details in a puppet's shadow?`, [
          right(`They punch tiny holes in patterns across the figure.`),
          wrong(`They paint the details on the screen with bright colors.`, 'unsupported-inference'),
          wrong(`They attach extra rods to the puppet's arms and legs.`, 'confuses-purpose'),
          wrong(`They move the puppet closer to the light behind it.`, 'contradicts-text'),
        ], `Paragraph 2 says light passing through tiny holes shows "details like the lace on a dress." Moving a puppet closer to the light makes the shadow "blurrier," which would hide details.`),
        q(37, 'medium', `Which quotation explains how a shadow puppet is able to wave or point?`, [
          right(`"Others are attached to the arms, so a puppet can wave, point or bow."`),
          wrong(`"Traditional shadow puppets are flat."`, 'wrong-supporting-detail'),
          wrong(`"One rod holds up the body."`, 'too-narrow'),
          wrong(`"A skilled performer may work two or three puppets at once."`, 'wrong-supporting-detail'),
        ], `The rods attached to the arms are what let the puppet "wave, point or bow." The rod that holds up the body supports the puppet but does not move its arms.`),
        q(38, 'medium', `Based on the passage, what would a performer most likely do to make a bird look like it is flying far away?`, [
          right(`Move the puppet toward the screen so its shadow gets smaller and sharper.`),
          wrong(`Move the puppet toward the light so its shadow gets larger and blurrier.`, 'reverses-relationship'),
          wrong(`Turn off the light so the bird's shadow fades slowly from the screen.`, 'unsupported-inference'),
          wrong(`Punch more holes in the bird so its feathers show on the screen.`, 'confuses-purpose'),
        ], `The passage says a puppet pressed against the screen makes a "small and sharp" shadow, and performers use this to make "a bird fly away into the distance." Moving toward the light does the opposite and makes the shadow larger.`),
        q(39, 'hard', `Which quotation best supports the inference that performing shadow puppet shows can take a great deal of skill?`, [
          right(`"In some traditions, one performer speaks every character's voice while also moving the puppets."`),
          wrong(`"Traditional shadow puppets are flat."`, 'wrong-supporting-detail'),
          wrong(`"Many shows include music and a narrator."`, 'wrong-supporting-detail'),
          wrong(`"It has been performed in many parts of the world for hundreds of years."`, 'wrong-supporting-detail'),
        ], `Doing every voice while also moving the puppets shows a performer handling many hard jobs at once. That music is included tells what a show has, not how hard the performing is.`),
        q(40, 'hard', `A student writes, "Shadow puppets can only make plain black shadows." Which quotation best shows that this statement is not accurate?`, [
          right(`"Some puppets are colored and partly see-through, so their shadows glow in soft shades of red, green and gold."`),
          wrong(`"When light passes through the holes, the shadow shows details like the lace on a dress or the feathers on a bird."`, 'too-narrow'),
          wrong(`"When a puppet moves closer to the light, its shadow grows larger and blurrier."`, 'wrong-supporting-detail'),
          wrong(`"A light shines on a screen, and puppets held behind the screen cast shadows the audience can see."`, 'wrong-supporting-detail'),
        ], `Shadows that "glow in soft shades of red, green and gold" are not plain black. The sentence about holes shows detail in the shadow, but it does not say anything about color.`),
      ],
    },
  ],
}

export default skill
