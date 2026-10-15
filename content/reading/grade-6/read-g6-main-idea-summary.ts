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
  slug: 'read-g6-main-idea-summary',
  subject: 'reading',
  grade: 6,
  group: 'Informational text',
  name: 'Main Idea and Summary',
  standards: ['RI.6.2'],
  passages: [
    {
      code: 'rg6-main-idea-summary-p01',
      title: 'How Bats Hunt with Sound',
      body: `Many bats hunt at night, when it is too dark to see insects clearly. Instead of relying only on their eyes, these bats use sound to find their way and catch food. This skill is called echolocation, and it works almost like a built-in sonar system.\n\nA hunting bat makes a series of very high clicks or calls, often through its mouth or nose. Most of these sounds are too high for human ears to hear. The sound waves travel outward until they strike an object, such as a tree branch or a moth. Then they bounce back toward the bat as echoes.\n\nThe bat's large, sensitive ears catch the returning echoes. Its brain uses them to judge how far away the object is, how big it is and which way it is moving. An echo that returns quickly means the object is close. An echo that returns slowly means it is farther away.\n\nAs a bat closes in on an insect, it calls faster and faster. Scientists who record these calls hear them speed up into a rapid buzz just before the catch. The quicker calls give the bat fresh information many times each second, so it can follow a moth that twists and dives.\n\nEcholocation lets bats do things that would otherwise be impossible. They can weave through thick forests and dark caves without crashing. They can catch hundreds of small insects in one night, which helps keep insect numbers in balance. A sound that people cannot even hear turns out to be one of the most useful tools in the animal world.`,
      items: [
        q(1, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Bats call faster and faster as they get closer to an insect they are chasing.`, 'too-narrow'),
          right(`Many bats use echoes from their own calls to find their way and catch food in the dark.`),
          wrong(`Bats would be much better hunters if they had sharper eyesight for the night.`, 'unsupported-inference'),
          wrong(`Many animals have special senses that help them survive in the natural world.`, 'too-broad'),
        ], `The whole passage explains how bats send out calls, read the echoes and use them to fly and hunt, which the second choice states. The faster calls are only one detail from paragraph 4.`),
        q(2, 'easy', `Which detail best supports the idea that a bat can tell how far away an object is?`, [
          wrong(`Most of these sounds are too high for human ears to hear.`, 'wrong-supporting-detail'),
          wrong(`They can catch hundreds of small insects in one night.`, 'wrong-supporting-detail'),
          wrong(`Many bats hunt at night, when it is too dark to see insects.`, 'wrong-supporting-detail'),
          right(`An echo that returns quickly means the object is close.`),
        ], `Paragraph 3 says a quick echo means the object is close and a slow echo means it is farther away, which is about distance. The other details are true but say nothing about judging distance.`),
        q(3, 'medium', `How does paragraph 4 develop the central idea?`, [
          right(`It shows how bats change their calls to track a moving insect during the final chase.`),
          wrong(`It explains how sound waves travel outward and bounce off branches and moths.`, 'misreads-structure'),
          wrong(`It describes how bats help keep insect numbers in balance in their habitats.`, 'misreads-structure'),
          wrong(`It argues that scientists should spend more time recording the calls of bats.`, 'unsupported-inference'),
        ], `Paragraph 4 says the calls speed up into a buzz so the bat can follow a twisting moth, which shows echolocation at work during the catch. How sound bounces back is explained in paragraph 2, not paragraph 4.`),
        q(4, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Bats are the most amazing animals on Earth. Everyone should protect them because their hunting skills are better than anything people have invented.`, 'includes-opinion'),
          wrong(`Scientists record bat calls at night. Just before a bat catches a moth, its calls speed up into a rapid buzz that people can hear on the recordings.`, 'too-narrow'),
          right(`Bats send out high calls and listen for the echoes. The echoes tell them where objects are, so they can fly safely and catch insects in the dark.`),
          wrong(`Bats cannot see at all, so they must make loud calls that people hear at night. The calls scare insects out of trees so the bats can catch them.`, 'contradicts-text'),
        ], `The third choice covers how echolocation works and what it lets bats do, without adding opinions. The first choice adds the summarizer's own judgments, such as "most amazing," which do not belong in an objective summary.`),
        q(5, 'hard', `Which sentence would NOT belong in an objective summary of the passage?`, [
          wrong(`A bat's brain uses echoes to judge the size, distance and movement of objects.`, 'misidentifies-key-idea'),
          wrong(`Bats speed up their calls as they close in on an insect so they can follow it.`, 'misidentifies-key-idea'),
          wrong(`Echolocation lets bats fly through dark places and catch many insects each night.`, 'misidentifies-key-idea'),
          right(`Echolocation is far more impressive than any tool that humans have ever built.`),
        ], `An objective summary leaves out the summarizer's opinions, and the last choice is a personal judgment the passage never makes. The other three sentences restate key ideas from paragraphs 3, 4 and 5.`),
      ],
    },
    {
      code: 'rg6-main-idea-summary-p02',
      title: 'When Ice Came from Lakes',
      body: `Long before kitchens had refrigerators, people still found ways to keep food cold in summer. In many northern towns in the 1800s, the answer came from frozen lakes and ponds. Ice harvesting grew into a large business that changed how families stored food.\n\nThe work began in the coldest weeks of winter, once the ice was thick enough to hold workers and horses. Crews first cleared snow from the surface. Then they marked the ice into a grid of large blocks. Workers cut along the lines with long saws and used poles to float the blocks through open channels toward shore.\n\nNext, the blocks had to last until summer. Workers stacked them inside icehouses, which were buildings with thick walls. They packed sawdust or straw between the blocks. This material slowed the flow of heat, so much of the ice stayed frozen for months.\n\nIn warm weather, ice wagons carried blocks through town. Families placed them in wooden iceboxes, which were cabinets lined with metal. Milk, butter and meat stayed fresh longer. Some ice was even shipped to warm places far away.\n\nThe business did not last forever. In the early 1900s, factories learned to make ice with machines, and later, electric refrigerators arrived in homes. Natural ice could also be dirty, while machine ice was clean and available all year. Within a few decades, most ice harvesting had ended. Still, for about a century, frozen lakes helped people eat fresher food in every season.`,
      items: [
        q(6, 'easy', `What is the central idea of the passage?`, [
          wrong(`Workers used long saws to cut frozen lakes into a grid of large blocks.`, 'too-narrow'),
          wrong(`Food kept cold with lake ice tasted better than food kept in refrigerators.`, 'unsupported-inference'),
          right(`Harvesting lake ice was once an important way to keep food cold, until machines replaced it.`),
          wrong(`Many old jobs have disappeared over time because of new inventions.`, 'too-broad'),
        ], `The passage explains how ice was cut, stored and delivered to keep food cold, and then how machines ended the business. The sawing detail is only one step described in paragraph 2.`),
        q(7, 'easy', `Which detail best supports the idea that winter ice could last until summer?`, [
          right(`Workers packed sawdust or straw between the blocks to slow the flow of heat.`),
          wrong(`Crews cleared the snow from the surface of the lake before cutting began.`, 'wrong-supporting-detail'),
          wrong(`In warm weather, ice wagons carried blocks of ice through the town.`, 'wrong-supporting-detail'),
          wrong(`In the early 1900s, factories learned to make ice with machines.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 says the sawdust or straw "slowed the flow of heat, so much of the ice stayed frozen for months." The ice wagons show ice being used in summer but do not explain how it lasted that long.`),
        q(8, 'medium', `What is the main idea of the last paragraph?`, [
          wrong(`Natural ice taken from lakes was sometimes too dirty to use.`, 'too-narrow'),
          right(`New ice machines and refrigerators brought ice harvesting to an end.`),
          wrong(`Families no longer needed to keep their food cold after 1900.`, 'contradicts-text'),
          wrong(`Ice harvesting lasted longer than any other business in history.`, 'unsupported-inference'),
        ], `The last paragraph explains that machine ice and home refrigerators replaced natural ice, so the business ended. Dirty natural ice is one reason given, not the main idea of the whole paragraph.`),
        q(9, 'medium', `How does paragraph 3 support the central idea of the passage?`, [
          wrong(`It describes how crews cut the ice and moved the blocks toward shore.`, 'misreads-structure'),
          wrong(`It explains how families used iceboxes to keep milk and butter fresh.`, 'misreads-structure'),
          wrong(`It compares natural lake ice with the clean ice made by machines.`, 'misreads-structure'),
          right(`It explains how stored ice was kept frozen so it could be used in warm months.`),
        ], `Paragraph 3 begins "the blocks had to last until summer" and describes icehouses packed with sawdust or straw. Cutting the ice is paragraph 2, and iceboxes are paragraph 4.`),
        q(10, 'hard', `Which is the best objective summary of the passage?`, [
          wrong(`Ice harvesting was cold, hard work that no one should have had to do. Refrigerators were the greatest invention of the 1900s because they ended it.`, 'includes-opinion'),
          wrong(`Crews cleared snow from frozen lakes and marked the ice into a grid. Then workers cut blocks with saws and floated them through channels to shore.`, 'too-narrow'),
          right(`In the 1800s, workers cut ice from frozen lakes, stored it in insulated icehouses and delivered it in summer to keep food cold. Machines and refrigerators later ended the business.`),
          wrong(`Families made ice in their own iceboxes during winter and saved it for summer. Later, factories began selling refrigerators, so the iceboxes were thrown away.`, 'contradicts-text'),
        ], `The third choice covers cutting, storing, delivering and the end of the business in neutral words. The fourth choice sounds complete but is wrong, because workers cut ice from lakes, not inside family iceboxes.`),
      ],
    },
    {
      code: 'rg6-main-idea-summary-p03',
      title: 'A New Life for Old Paper',
      body: `When you drop a sheet of paper in a recycling bin, its story is not over. Recycled paper goes through several steps that turn it back into material for new products. Each step removes something unwanted or rebuilds the paper's fibers.\n\nPaper is made of tiny plant fibers, mostly from wood. At a recycling center, workers and machines first sort paper by type. Newspapers, cardboard and office paper are kept apart because their fibers differ in length and strength.\n\nNext, the sorted paper goes into a huge tank called a pulper. Water and machinery churn the paper until it breaks apart into a soupy mix of fibers called pulp. Screens then remove staples, tape and bits of plastic.\n\nThe pulp still contains ink. To lift it out, the mill adds soapy chemicals and blows air through the mixture. The ink sticks to the air bubbles, which rise to the top as foam that can be skimmed away. Cleaner pulp is left behind.\n\nFinally, the pulp is sprayed onto a moving screen. Water drains away, and heated rollers press and dry the fibers into a long sheet. That sheet is rolled up and later cut into products such as cereal boxes, tissues and notebook paper.\n\nPaper cannot be recycled forever. Each trip through the process makes the fibers shorter and weaker. After about five to seven rounds, they are too short to hold together. Even so, recycling paper several times saves trees, water and energy compared with making paper from new wood.`,
      items: [
        q(11, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Air bubbles carry ink to the top of the pulp, where it is skimmed off as foam.`, 'too-narrow'),
          wrong(`Recycling helps the planet in many ways, from saving metal to reducing plastic.`, 'too-broad'),
          wrong(`Recycled paper is always stronger and smoother than paper made from new wood.`, 'contradicts-text'),
          right(`Used paper goes through a series of steps that clean its fibers and form new paper.`),
        ], `The passage walks through sorting, pulping, removing ink and pressing new sheets, which the last choice sums up. The ink detail is true but covers only paragraph 4.`),
        q(12, 'easy', `Which detail best supports the idea that paper cannot be recycled forever?`, [
          wrong(`Newspapers, cardboard and office paper are kept apart during sorting.`, 'wrong-supporting-detail'),
          right(`Each trip through the process makes the fibers shorter and weaker.`),
          wrong(`Heated rollers press and dry the fibers into a long, thin sheet.`, 'wrong-supporting-detail'),
          wrong(`Screens remove staples, tape and bits of plastic from the pulp.`, 'wrong-supporting-detail'),
        ], `Paragraph 6 explains that fibers get shorter and weaker each time until they cannot hold together. Sorting by type is mentioned because fibers differ, but it does not show a limit on recycling.`),
        q(13, 'medium', `What is the purpose of paragraph 4 in the passage?`, [
          wrong(`It explains how paper is sorted into groups at the recycling center.`, 'misreads-structure'),
          wrong(`It describes how the clean pulp is pressed and dried into a new sheet.`, 'misreads-structure'),
          right(`It explains the step that removes ink so the pulp can be used again.`),
          wrong(`It explains why paper is made mostly from plant fibers taken from wood.`, 'misreads-structure'),
        ], `Paragraph 4 starts with "The pulp still contains ink" and tells how bubbles lift the ink away, which is one step in the process. Pressing and drying happen in paragraph 5.`),
        q(14, 'medium', `Which sentence from the passage best states its central idea?`, [
          right(`"Recycled paper goes through several steps that turn it back into material for new products."`),
          wrong(`"Paper is made of tiny plant fibers, mostly from wood."`, 'supporting-detail-not-main'),
          wrong(`"Screens then remove staples, tape and bits of plastic."`, 'too-narrow'),
          wrong(`"After about five to seven rounds, they are too short to hold together."`, 'too-narrow'),
        ], `The first choice names the whole process the passage explains step by step. The other sentences are supporting details about one step or one fact.`),
        q(15, 'hard', `Which is the best objective summary of the passage?`, [
          wrong(`Recycling paper is the most important chore a family can do. People who throw paper in the trash are not doing their part to save the forests.`, 'includes-opinion'),
          wrong(`Paper is sorted by type and then mixed with water in a big tank called a pulper. Screens take out staples and tape from the pulp.`, 'too-narrow'),
          wrong(`Paper is sorted, turned into pulp, cleaned and pressed into new sheets. Because the fibers never wear out, the same paper can be recycled again and again.`, 'contradicts-text'),
          right(`Recycled paper is sorted, made into pulp, cleaned of trash and ink, then pressed into new sheets. Its fibers weaken each time, so it can be recycled only several times.`),
        ], `The last choice covers every major step and the limit on recycling in neutral words. The third choice looks complete but says fibers never wear out, which paragraph 6 contradicts.`),
      ],
    },
    {
      code: 'rg6-main-idea-summary-p04',
      title: 'Every Student Should Learn to Type',
      body: `Students today write essays, research reports and science notes on computers. Yet many of them type with two fingers, hunting for each key. Middle schools should teach keyboarding as a regular class, because strong typing skills help students in almost every subject.\n\nThe first reason is speed. A student who types with all ten fingers can often write much faster than one who searches for each letter. When typing is quick, students can spend more of their class time thinking about ideas instead of searching the keyboard.\n\nTyping well also improves the quality of student writing. When fingers keep up with thoughts, students are less likely to lose an idea halfway through a sentence. They also have more time left to reread, revise and fix mistakes before they turn in their work.\n\nSome people argue that students will simply pick up typing on their own by using phones and computers at home. However, habits formed without instruction are often slow and hard to change. A few weeks of practice with a teacher can build correct finger positions that last for years.\n\nFinally, typing is a skill that students will use long after school ends. Many jobs, from nursing to engineering, require people to write reports, emails and records on a keyboard. Learning the skill early saves time for the rest of a person's life.\n\nSchools already teach young students how to hold a pencil. Teaching older students how to use a keyboard is the natural next step. A short daily typing lesson is a small investment that pays off in every class.`,
      items: [
        q(16, 'medium', `Which statement best expresses the author's central idea?`, [
          wrong(`Students who type with ten fingers write faster than students who use two.`, 'too-narrow'),
          wrong(`Students learn to type well on their own by using computers and phones at home.`, 'confuses-counterclaim'),
          right(`Middle schools should teach typing because it helps students in school and later in life.`),
          wrong(`Computers have changed the way students learn and work in every school subject.`, 'too-broad'),
        ], `The author states the claim in paragraph 1 and supports it with reasons about speed, writing quality and jobs. The second choice is the opposing view the author argues against in paragraph 4.`),
        q(17, 'medium', `How does paragraph 4 develop the author's central idea?`, [
          right(`It answers an opposing view by explaining why self-taught typing habits cause problems.`),
          wrong(`It gives a reason about how typing skills will help students in their future jobs.`, 'misreads-structure'),
          wrong(`It explains that fast typing gives students more time to think about their ideas.`, 'misreads-structure'),
          wrong(`It admits that a typing class is not really needed for most middle school students.`, 'contradicts-text'),
        ], `Paragraph 4 begins "Some people argue" and then responds with "However, habits formed without instruction are often slow and hard to change." Jobs are discussed in paragraph 5, not paragraph 4.`),
        q(18, 'medium', `Which detail best supports the author's point that typing improves the quality of writing?`, [
          wrong(`Many jobs require people to write reports, emails and records on a keyboard.`, 'wrong-supporting-detail'),
          wrong(`Schools already teach young students how to hold a pencil correctly.`, 'wrong-supporting-detail'),
          right(`Students have more time left to reread, revise and fix their mistakes.`),
          wrong(`Students today write essays, reports and science notes on computers.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 says good typists have time to "reread, revise and fix mistakes," which connects directly to better writing. The jobs detail supports a different reason, about life after school.`),
        q(19, 'hard', `Which is the best objective summary of the passage?`, [
          wrong(`The author makes a convincing case, and any student who still types with two fingers is wasting time. Schools that skip typing classes are letting their students down.`, 'includes-opinion'),
          right(`The author argues that middle schools should teach typing because it makes students faster, improves their writing and prepares them for jobs. The author also claims self-taught habits are hard to fix.`),
          wrong(`Typing classes make students write faster and earn better grades in every subject. Students who take these classes also get better jobs as nurses and engineers.`, 'adds-unsupported-detail'),
          wrong(`Many students type with two fingers. Some people believe students learn to type at home, and many jobs today require people to write on a keyboard.`, 'misses-central-claim'),
        ], `The second choice states the author's claim and main reasons and labels them as the author's views. The fourth choice lists details but never says what the author is arguing.`),
        q(20, 'hard', `Which sentence would NOT belong in an objective summary of the passage?`, [
          wrong(`The author claims that quick typing lets students focus on their ideas.`, 'misidentifies-key-idea'),
          wrong(`The author says typing is a skill people will use in many future jobs.`, 'misidentifies-key-idea'),
          right(`The author's plan is clearly the smartest way to improve every school.`),
          wrong(`The author argues that lessons build habits that self-teaching may not.`, 'misidentifies-key-idea'),
        ], `The third choice gives the summarizer's own judgment ("clearly the smartest"), which an objective summary leaves out. The others fairly report the author's reasons from paragraphs 2, 4 and 5.`),
      ],
    },
    {
      code: 'rg6-main-idea-summary-p05',
      title: 'Making a Fresh Sheet of Ice',
      body: `At a hockey game or a public skating session, the ice starts out smooth and glossy. After an hour of skating, though, it is covered in scratches, ruts and loose snow. Rinks keep their ice in good shape through careful building and regular resurfacing.\n\nA rink's ice begins with a cold floor. Pipes run beneath a concrete slab, carrying a very cold liquid that chills the concrete below freezing. Workers then spray thin layers of water onto the slab, letting each layer freeze before adding the next. The lines and team logos are painted onto an early layer and then covered with more ice. In the end, the ice is usually only about an inch thick.\n\nSkating wears this surface down quickly. Sharp blades carve grooves and shave off fine snow. Bumpy, snowy ice is slower and can make skaters stumble.\n\nThat is why a resurfacing machine circles the rink between periods or sessions. A blade underneath shaves a thin layer off the top of the ice. A spinning screw collects the shavings and moves them into a storage tank. Next, the machine washes the surface with water to rinse dirt out of the grooves. Finally, a cloth towel at the back spreads a thin layer of warm water. Warm water melts the top of the old ice slightly, so the new layer bonds tightly as it freezes.\n\nThe whole process takes about ten to fifteen minutes. When the machine leaves, skaters return to a surface that is almost as smooth as glass. Every fresh sheet of ice is the result of cold engineering and careful timing.`,
      items: [
        q(21, 'easy', `What is the central idea of the passage?`, [
          wrong(`Team logos are painted onto an early layer of ice and then covered up.`, 'too-narrow'),
          right(`Rinks build ice in thin layers and use machines to keep the surface smooth.`),
          wrong(`Hockey is a fast sport that depends on skilled players and good teamwork.`, 'too-broad'),
          wrong(`Skaters should stay off the ice until it has been resurfaced two times.`, 'unsupported-inference'),
        ], `The passage explains how rink ice is built and how resurfacing repairs the damage from skating. The logo detail is only one fact from paragraph 2.`),
        q(22, 'easy', `Which detail best supports the idea that skating damages the ice?`, [
          wrong(`Pipes run beneath a concrete slab and carry a very cold liquid.`, 'wrong-supporting-detail'),
          wrong(`The whole resurfacing process takes about ten to fifteen minutes.`, 'wrong-supporting-detail'),
          wrong(`In the end, the ice is usually only about an inch thick.`, 'wrong-supporting-detail'),
          right(`Sharp blades carve grooves and shave off fine snow.`),
        ], `Paragraph 3 says blades "carve grooves and shave off fine snow," which shows how skating wears the ice down. The other details describe building or resurfacing, not damage.`),
        q(23, 'medium', `Which statement best summarizes paragraph 4?`, [
          wrong(`A spinning screw moves the ice shavings into a storage tank.`, 'too-narrow'),
          wrong(`Workers spray thin layers of water onto a chilled concrete slab.`, 'misreads-structure'),
          right(`A machine shaves, washes and floods the ice to form a smooth new layer.`),
          wrong(`A machine uses cold water so the new layer stays apart from the old ice.`, 'contradicts-text'),
        ], `Paragraph 4 describes each job of the resurfacing machine: shaving, washing and spreading warm water. The last choice is wrong because the passage says warm water helps the new layer bond to the old ice.`),
        q(24, 'medium', `How does paragraph 3 connect to the paragraph that follows it?`, [
          right(`It describes the problem of worn ice that the resurfacing machine then solves.`),
          wrong(`It explains how ice is first frozen onto the concrete floor of the rink.`, 'misreads-structure'),
          wrong(`It tells how long the machine takes to finish its trip around the rink.`, 'misreads-structure'),
          wrong(`It argues that skaters should use duller blades to protect the ice.`, 'unsupported-inference'),
        ], `Paragraph 3 explains that skating leaves grooves and snow, and paragraph 4 begins "That is why a resurfacing machine circles the rink." Building the ice is described earlier, in paragraph 2.`),
        q(25, 'hard', `Which is the best objective summary of the passage?`, [
          wrong(`Watching the resurfacing machine is the best part of any hockey game. It is much more fun than the skating, and every rink should run it more often.`, 'includes-opinion'),
          wrong(`Pipes under a concrete slab chill the floor of a rink. Workers spray thin layers of water and paint lines and logos onto an early layer of the ice.`, 'too-narrow'),
          right(`Rink ice is built in thin frozen layers over chilled concrete. Because skating roughs it up, a machine regularly shaves, washes and floods it so a smooth layer forms.`),
          wrong(`Rink ice is a thick block frozen outdoors and moved inside. Each night, workers smooth it by hand with warm towels so it is ready the next day.`, 'contradicts-text'),
        ], `The third choice covers both how the ice is built and how it is kept smooth, without opinions. The second choice is accurate but describes only paragraph 2 and leaves out resurfacing.`),
      ],
    },
    {
      code: 'rg6-main-idea-summary-p06',
      title: 'From Lump to Bowl',
      body: `A handmade clay bowl may look simple, but it goes through a long journey before it reaches a table. Potters shape, dry and fire their work in careful stages. Skipping or rushing any stage can ruin the piece.\n\nThe process begins with wedging. A potter kneads a lump of wet clay on a table, pressing and folding it many times. Wedging pushes out trapped air bubbles. If air stays inside, it can expand in the heat later and crack the bowl.\n\nNext comes throwing on the potter's wheel. The potter presses the spinning clay into the center of the wheel, a step called centering. Then the potter pushes a thumb into the middle and slowly pulls the walls upward and outward. Wet hands keep the clay from sticking or tearing.\n\nAfter shaping, the bowl must dry slowly for several days. When it is firm but not yet hard, the potter trims extra clay from the bottom to form a neat base. Then the bowl dries completely until it turns pale and light.\n\nThe first trip into the kiln, a very hot oven, is called the bisque firing. It turns soft clay into hard ceramic. The potter then dips the bowl in glaze, a liquid coating made of minerals. In a second, even hotter firing, the glaze melts into a glassy layer that makes the bowl shiny and waterproof.\n\nFrom start to finish, a single bowl can take two weeks or more. Each step depends on the one before it, so a potter must be patient at every stage.`,
      items: [
        q(26, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`A clay bowl is made in careful steps of shaping, drying and firing.`),
          wrong(`Wedging pushes trapped air bubbles out of a lump of wet clay.`, 'too-narrow'),
          wrong(`Art can be made from many materials, such as paint, wood and clay.`, 'too-broad'),
          wrong(`Bowls made on a wheel are stronger than bowls shaped by hand.`, 'unsupported-inference'),
        ], `Paragraph 1 says potters "shape, dry and fire their work in careful stages," and the rest of the passage explains those stages. Wedging is only the first step.`),
        q(27, 'easy', `Which detail best supports the idea that skipping a stage can ruin the piece?`, [
          wrong(`Wet hands keep the clay from sticking or tearing on the wheel.`, 'wrong-supporting-detail'),
          right(`If air stays inside, it can expand in the heat later and crack the bowl.`),
          wrong(`Glaze is a liquid coating made of minerals that the bowl is dipped in.`, 'wrong-supporting-detail'),
          wrong(`From start to finish, a single bowl can take two weeks or more.`, 'wrong-supporting-detail'),
        ], `The second choice shows what happens if wedging is skipped: trapped air can crack the bowl. The two weeks detail shows the process is long, not that skipping a step causes damage.`),
        q(28, 'medium', `What is the main idea of paragraph 5?`, [
          wrong(`Glaze is a liquid coating that is made from minerals.`, 'too-narrow'),
          wrong(`A bowl dries slowly for several days before it is trimmed.`, 'misreads-structure'),
          wrong(`The bowl is glazed first and then fired in the kiln only once.`, 'contradicts-text'),
          right(`Two firings in a kiln harden the clay and make the glaze shiny.`),
        ], `Paragraph 5 describes the bisque firing that hardens the clay and the second firing that melts the glaze. The glaze definition is just one detail in that paragraph.`),
        q(29, 'medium', `How do paragraphs 2 through 5 develop the central idea?`, [
          wrong(`They compare the styles of several famous potters from different places.`, 'misreads-structure'),
          right(`They describe each stage in order, showing how one step prepares the next.`),
          wrong(`They give reasons why people should buy handmade bowls instead of others.`, 'unsupported-inference'),
          wrong(`They tell the history of pottery from ancient times up to the present.`, 'misreads-structure'),
        ], `Paragraphs 2 through 5 move from wedging to throwing to drying to firing, using words like "Next" and "After shaping." The passage never compares potters or tells the history of pottery.`),
        q(30, 'hard', `Which is the best objective summary of the passage?`, [
          wrong(`A potter centers spinning clay on the wheel, pushes a thumb into the middle and pulls the walls up. Wet hands keep the clay from tearing.`, 'too-narrow'),
          wrong(`A potter glazes the wet clay, fires it once to harden it and then shapes and trims it on the wheel. The bowl is finished in a single day.`, 'wrong-sequence'),
          right(`A potter wedges clay to remove air, shapes it on a wheel, dries and trims it, then fires it twice, adding glaze before the second firing. Each step depends on the last.`),
          wrong(`Making pottery is the most relaxing hobby there is. Anyone who has the patience to wait two weeks will love making beautiful bowls at home.`, 'includes-opinion'),
        ], `The third choice includes every stage in the correct order and the idea that steps depend on each other. The second choice puts the steps in the wrong order and contradicts the two weeks the passage gives.`),
      ],
    },
    {
      code: 'rg6-main-idea-summary-p07',
      title: 'How Traffic Signals Decide',
      body: `A traffic light might seem to change colors on a simple timer. Many signals do follow a fixed schedule, but others are smarter than they look. Modern traffic signals use sensors and planning to move cars and people safely and with less waiting.\n\nThe simplest signals run on timers. Engineers study how many vehicles use each street at different hours. Then they set how long each light stays green. A busy main road might get a long green, while a quiet side street gets a short one.\n\nOther signals respond to traffic as it arrives. Some intersections have wire loops buried under the pavement. When a car stops over a loop, its metal changes the loop's magnetic field, and the signal's controller notices that a vehicle is waiting. Other intersections use small cameras or radar units mounted on poles. If no car is waiting on a side street, the main road can keep its green light.\n\nSignals can also work as a team. On a long avenue, engineers can link lights together so they turn green one after another. A driver moving at the speed limit may then pass through several green lights in a row. This pattern is often called a green wave.\n\nPeople on foot are part of the plan too. Push buttons at crosswalks tell the controller that someone wants to cross. Many signals give walkers a few seconds head start before cars get a green light, which makes walkers easier for drivers to see.\n\nAll of these tools share one goal. By reacting to real traffic, signals help reduce waiting, wasted fuel and crashes.`,
      items: [
        q(31, 'easy', `What is the central idea of the passage?`, [
          wrong(`Wire loops under the pavement can tell when a car is waiting at a light.`, 'too-narrow'),
          wrong(`Cities should replace every timer signal with cameras and radar units.`, 'unsupported-inference'),
          right(`Traffic signals use timers, sensors and linked patterns to move people safely.`),
          wrong(`Cars and roads have changed a great deal since they were first invented.`, 'too-broad'),
        ], `Each paragraph describes one way signals manage traffic, and paragraph 1 says they "use sensors and planning to move cars and people safely." The wire loops are only one example of a sensor.`),
        q(32, 'easy', `Which detail best supports the idea that some signals respond to traffic as it arrives?`, [
          right(`When a car stops over a buried loop, the controller notices that it is waiting.`),
          wrong(`Engineers study how many vehicles use each street at different hours of the day.`, 'wrong-supporting-detail'),
          wrong(`Many signals give walkers a few seconds head start before cars get a green.`, 'wrong-supporting-detail'),
          wrong(`On a long avenue, engineers can link several lights to turn green in order.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 explains that a loop senses a waiting car right away. Studying traffic at different hours is how timers are set ahead of time, so it does not show a signal reacting in the moment.`),
        q(33, 'medium', `What is the main idea of paragraph 4?`, [
          wrong(`The pattern of lights on an avenue is called a green wave.`, 'too-narrow'),
          wrong(`Push buttons let walkers tell a signal that they want to cross.`, 'misreads-structure'),
          right(`Linked signals turn green in order so drivers pass several lights.`),
          wrong(`Drivers must go over the speed limit to catch every green light.`, 'contradicts-text'),
        ], `Paragraph 4 explains that linked lights turn green one after another so a driver can pass through several in a row. The name "green wave" is a detail, and the passage says drivers move at the speed limit.`),
        q(34, 'medium', `Which detail is LEAST important to include in a summary of the passage?`, [
          wrong(`Some signals run on fixed timers that engineers set for each street.`, 'misidentifies-key-idea'),
          wrong(`Some signals use sensors to detect when a vehicle is waiting.`, 'misidentifies-key-idea'),
          wrong(`Signals can be linked so that they turn green one after another.`, 'misidentifies-key-idea'),
          right(`Some cameras and radar units are mounted on poles above the road.`),
        ], `Where the cameras are mounted is a small detail that does not change the main point about how signals work. The other three choices each state one of the key ways signals manage traffic.`),
        q(35, 'hard', `Which is the best objective summary of the passage?`, [
          wrong(`Traffic lights are annoying, and waiting at a red light is a waste of everyone's time. Engineers need to work much harder to fix the problem.`, 'includes-opinion'),
          wrong(`Wire loops under the pavement sense the metal in cars. Cameras and radar on poles can also tell when a car is waiting on a side street.`, 'too-narrow'),
          wrong(`All traffic signals now use cameras, so timers and buried loops are no longer used. The cameras also decide when walkers may cross the street.`, 'contradicts-text'),
          right(`Some traffic signals run on timers, while others use sensors to detect waiting cars. Signals can be linked into green waves and give walkers a head start, all to reduce waiting and crashes.`),
        ], `The last choice covers timers, sensors, linked signals, walkers and the shared goal. The second choice is accurate but covers only paragraph 3, so it leaves out most of the central idea.`),
      ],
    },
    {
      code: 'rg6-main-idea-summary-p08',
      title: 'The Snow Shovel Squad',
      body: `Every winter, the town of Maple Hollow gets several heavy snowstorms. For most families, a snowy morning means an hour of shoveling. For older neighbors and people with injuries, though, a blocked sidewalk can mean being stuck at home for days. Three years ago, a group of students decided to do something about it.\n\nThe idea started in Ms. Okafor's sixth-grade class. During a lesson about community service, a student named Rafael Ortiz mentioned that his grandmother had missed a doctor's visit because her front steps were buried. Classmates shared similar stories. Together, the class created the Snow Shovel Squad.\n\nThe squad works through a simple sign-up system. Neighbors who need help call the town library and leave their address. Librarians add each request to a list and share it with the squad's adult leaders. After a storm, teams of students and parent volunteers are assigned to nearby houses. Each team clears walkways, steps and the space around mailboxes.\n\nSafety rules are an important part of the program. Students work only in daylight, always with an adult, and take a break every thirty minutes. They are taught to lift small scoops of snow and to bend their knees instead of their backs.\n\nThe program has grown each year. In the first winter, the squad helped twelve households. Last winter, more than sixty volunteers cleared paths for over ninety homes. Several neighbors have written thank-you notes, and some now bake treats for the teams.\n\nThe squad has changed the students too. Many say they have met neighbors they never knew before. What started as one class project has become a winter tradition that helps the whole town stay connected.`,
      items: [
        q(36, 'medium', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Students in the squad take a break every thirty minutes while shoveling.`, 'too-narrow'),
          wrong(`Rafael Ortiz's grandmother missed a doctor's visit after a big storm.`, 'too-narrow'),
          right(`A class project grew into a town tradition of clearing snow for neighbors.`),
          wrong(`Older people in Maple Hollow should move to a town with less snow.`, 'unsupported-inference'),
        ], `The passage tells how the squad began, how it works, how it has grown and how it connects the town. The grandmother's story is the spark for the idea, not the central idea of the whole passage.`),
        q(37, 'medium', `How does paragraph 2 contribute to the passage?`, [
          right(`It explains the problem that led one class to start the squad.`),
          wrong(`It describes how neighbors sign up for help through the library.`, 'misreads-structure'),
          wrong(`It lists the safety rules students follow while they are shoveling.`, 'misreads-structure'),
          wrong(`It gives numbers that show how much the program has grown.`, 'misreads-structure'),
        ], `Paragraph 2 tells about the missed doctor's visit and similar stories that led the class to create the squad. The sign-up system is described in paragraph 3.`),
        q(38, 'medium', `Which detail best supports the idea that the program has grown?`, [
          wrong(`Neighbors who need help call the town library and leave their address.`, 'wrong-supporting-detail'),
          wrong(`Students work only in daylight and always with an adult nearby.`, 'wrong-supporting-detail'),
          right(`Last winter, more than sixty volunteers cleared paths for over ninety homes.`),
          wrong(`During a lesson, Rafael mentioned his grandmother's buried front steps.`, 'wrong-supporting-detail'),
        ], `Paragraph 5 compares twelve households in the first winter with over ninety last winter, which shows growth. The sign-up detail explains how the program works, not how much it has grown.`),
        q(39, 'hard', `Which is the best objective summary of the passage?`, [
          wrong(`The Snow Shovel Squad is the kindest group of students in the whole country. Every school should copy Maple Hollow and start its own squad right away.`, 'includes-opinion'),
          right(`After learning that snowy sidewalks trapped some neighbors at home, a sixth-grade class formed the Snow Shovel Squad. Using a library sign-up list and safety rules, it has grown to help over ninety homes.`),
          wrong(`Students in the squad work only in daylight and always with an adult. They take a break every thirty minutes and bend their knees when lifting snow.`, 'too-narrow'),
          wrong(`Librarians lead teams of students who shovel at night after each storm. The library pays them for each home, and the program has stayed the same size.`, 'contradicts-text'),
        ], `The second choice covers why the squad started, how it works and how it has grown, without opinions. The third choice is accurate but sums up only the safety paragraph.`),
        q(40, 'hard', `How does the last paragraph develop the central idea?`, [
          wrong(`It explains how volunteers are assigned to houses after a storm.`, 'misreads-structure'),
          wrong(`It gives numbers that prove the squad helps more homes each year.`, 'misreads-structure'),
          wrong(`It suggests that other towns should start programs just like it.`, 'unsupported-inference'),
          right(`It shows that the program helps the student volunteers, not just neighbors.`),
        ], `The last paragraph says "The squad has changed the students too" and that they met new neighbors, which extends the idea that the squad connects the town. The growth numbers appear in paragraph 5, not the last paragraph.`),
      ],
    },
  ],
}

export default skill
