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
  slug: 'read-g8-main-idea-summary',
  subject: 'reading',
  grade: 8,
  group: 'Informational text',
  name: 'Main Idea and Summary',
  standards: ['RI.8.2'],
  passages: [
    {
      code: 'rg8-main-idea-summary-p01',
      title: 'Why Cities Run Hot',
      body: `On a summer afternoon, a downtown street can be several degrees warmer than a field just outside the city. Scientists call this pattern an urban heat island. It happens because cities change the surfaces that sunlight lands on, and those surfaces store and release heat differently than plants and soil do.\n\nDark materials are a big part of the problem. Asphalt roads and tar roofs absorb most of the sunlight that hits them instead of reflecting it. They warm up during the day and then slowly give off that heat at night, so city neighborhoods often stay warm long after sunset.\n\nCities also lose a natural cooling system when trees and grass are removed. Plants pull water from the ground and release it through their leaves. As that water evaporates, it carries heat away from the air, much like sweat cools a runner. A parking lot cannot do this.\n\nBuildings add to the effect as well. Tall walls trap warm air between them and block breezes that might carry it away. Air conditioners, cars and machines release extra heat directly into the streets.\n\nThe good news is that the same knowledge points toward solutions. Some towns now paint roofs white or light gray so they reflect sunlight. Others plant trees along sidewalks and build small parks on empty lots. In one study of a midsize city, blocks with more shade trees stayed noticeably cooler during heat waves than nearby blocks without them. Understanding why cities trap heat helps planners design neighborhoods that stay safer and more comfortable.`,
      items: [
        q(1, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`Cities trap extra heat because of their surfaces and design, and knowing why helps people cool them.`),
          wrong(`Asphalt roads absorb more of the sunlight that hits them than they reflect back into the sky.`, 'too-narrow'),
          wrong(`People who live in cities should move to the countryside during the hottest summer months.`, 'unsupported-inference'),
          wrong(`Trees are the most important living things in any neighborhood, whether in a city or a town.`, 'overgeneralization'),
        ], `The passage explains several causes of urban heat islands and ends with ways to reduce them, so the choice about surfaces, design and cooling cities covers the whole text. The asphalt detail is true but describes only one cause in paragraph 2.`),
        q(2, 'easy', `Which detail best supports the idea that plants help cool the air?`, [
          right(`Water released through leaves evaporates and carries heat away from the air.`),
          wrong(`Tar roofs warm up during the day and give off their heat at night.`, 'wrong-supporting-detail'),
          wrong(`Tall walls block breezes that might carry warm air out of the streets.`, 'wrong-supporting-detail'),
          wrong(`Some towns paint their roofs white or light gray to reflect sunlight.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 says that water from leaves evaporates and "carries heat away from the air," which is how plants cool. The roof color detail is about cooling too, but it involves paint, not plants.`),
        q(3, 'medium', `How does the second paragraph develop the central idea?`, [
          right(`It explains one cause of heat islands: dark surfaces store heat and release it at night.`),
          wrong(`It describes the solutions that some towns are using to cool their streets.`, 'misreads-structure'),
          wrong(`It argues that new roads should no longer be built from asphalt at all.`, 'unsupported-inference'),
          wrong(`It compares city temperatures with temperatures in fields outside the city.`, 'misreads-structure'),
        ], `Paragraph 2 shows how asphalt and tar roofs absorb sunlight and give off heat at night, which is one cause of the heat island. Solutions do not appear until the final paragraph.`),
        q(4, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Cities are often warmer than nearby areas because dark surfaces store heat, plants are removed and buildings trap warm air. Light roofs and more trees can reduce the effect.`),
          wrong(`Cities are miserable in summer, and planners have done a poor job of protecting the people who live there. Everyone should demand that their city build more parks.`, 'includes-opinion'),
          wrong(`Air conditioners, cars and machines release heat into city streets. This extra heat is the main reason city neighborhoods stay warm long after the sun sets.`, 'too-narrow'),
          wrong(`Plants pull water from the ground and release it through their leaves. As the water evaporates, it cools the air in the same way that sweat cools a runner.`, 'too-narrow'),
        ], `The choice about dark surfaces, removed plants and trapped air states the causes and the solutions without adding opinions. The choice calling cities "miserable" adds judgments, such as "miserable" and "poor job," which do not belong in an objective summary.`),
        q(5, 'hard', `How does the final paragraph relate to the rest of the passage?`, [
          right(`It shows that the causes explained earlier also point to ways of reducing city heat.`),
          wrong(`It introduces a new problem that the earlier paragraphs did not mention.`, 'misreads-structure'),
          wrong(`It proves that heat islands no longer exist in any city that has parks.`, 'overstates-claim'),
          wrong(`It repeats the cause from the first paragraph using different words.`, 'misreads-structure'),
        ], `The last paragraph begins "the same knowledge points toward solutions" and then matches fixes like light roofs and trees to causes described earlier. It says shade trees kept blocks "noticeably cooler," not that heat islands disappeared.`),
      ],
    },
    {
      code: 'rg8-main-idea-summary-p02',
      title: 'When Every Town Had Its Own Time',
      body: `For most of history, people set their clocks by the sun. When the sun reached its highest point in the sky, it was noon. Because the sun moves across the sky from east to west, noon arrived a few minutes earlier in an eastern town than in a town farther west. Each community kept its own local time, and for a long while this caused few problems.\n\nRailroads changed that. A train could travel between dozens of towns in a single day, and each town might show a slightly different time on its station clock. Railroad companies had to print timetables that listed departures in many local times at once. Passengers grew confused, and workers struggled to keep trains on schedule. A traveler who misread a timetable could miss a connection by several minutes.\n\nTo solve the problem, railroad companies began to divide the country into a small number of time zones. Inside each zone, every clock would show the same time, even if it did not match the sun exactly. Towns near the edge of a zone had to accept that noon on their clocks no longer lined up with the sun overhead.\n\nNot everyone welcomed the change at first. Some townspeople felt that the railroads had no right to decide what time it was. Over the following years, however, schools, banks and businesses found that shared time made planning easier. Eventually, governments made time zones official.\n\nToday, most people never think about who decided what time it is. Yet the clocks on our phones still follow a system that grew out of the need to run trains safely and on time.`,
      items: [
        q(6, 'easy', `What is the central idea of the passage?`, [
          right(`Railroad travel led communities to replace local sun time with shared time zones.`),
          wrong(`Trains in the past were often late because railroad workers were careless.`, 'unsupported-inference'),
          wrong(`Noon is the moment when the sun reaches its highest point in the sky.`, 'too-narrow'),
          wrong(`Phones today show the time more accurately than old station clocks did.`, 'unsupported-inference'),
        ], `Every paragraph builds toward how railroads caused the switch from local time to time zones. The definition of noon is only a supporting detail from the first paragraph.`),
        q(7, 'easy', `Which detail best supports the idea that local time caused trouble for railroads?`, [
          right(`Timetables had to list departures in many different local times at once.`),
          wrong(`Noon arrived a few minutes earlier in eastern towns than in western ones.`, 'misses-connection'),
          wrong(`Schools, banks and businesses found shared time useful for planning.`, 'wrong-supporting-detail'),
          wrong(`Most people today never think about who decided what time it is.`, 'wrong-supporting-detail'),
        ], `Paragraph 2 says timetables listed "many local times at once," which confused passengers and workers. The detail about eastern and western towns explains why local times differed, but it does not show the trouble railroads had.`),
        q(8, 'medium', `How does the first paragraph help develop the central idea?`, [
          right(`It explains how local time worked, which sets up the problem railroads later faced.`),
          wrong(`It describes the main argument people made against creating time zones.`, 'misreads-structure'),
          wrong(`It shows that local time was confusing even before trains were invented.`, 'contradicts-text'),
          wrong(`It explains how governments eventually made time zones official.`, 'misreads-structure'),
        ], `The first paragraph describes sun time and how it differed from town to town, which the railroads later found to be a problem. It says local time "caused few problems" at first, so it does not show early confusion.`),
        q(9, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Towns once kept local time based on the sun. Because this confused train schedules, railroads created time zones, which spread to other areas of life and later became official.`),
          wrong(`Towns once kept local time based on the sun. The railroads unfairly forced their own system on everyone, and it was a mistake that people still live with today.`, 'includes-opinion'),
          wrong(`Railroad timetables listed departures in many local times. Passengers grew confused, and a traveler could miss a connection by several minutes.`, 'too-narrow'),
          wrong(`Governments decided that every town should follow the sun more closely. Railroads then printed new timetables to match each town's local time.`, 'contradicts-text'),
        ], `The choice about railroads creating time zones covers the whole sequence from sun time to official time zones without judging it. The choice saying railroads "unfairly" forced their system adds opinions ("unfairly," "a mistake") that the passage never states.`),
        q(10, 'hard', `Why does the author include the detail that some townspeople felt the railroads "had no right to decide what time it was"?`, [
          right(`To show that the shift to time zones met resistance before it was widely accepted.`),
          wrong(`To prove that time zones were a poor idea that should be reversed.`, 'misreads-purpose'),
          wrong(`To explain why railroads first began dividing the country into zones.`, 'confuses-cause-effect'),
          wrong(`To suggest that the townspeople were right and the governments were wrong.`, 'unsupported-inference'),
        ], `The paragraph begins "Not everyone welcomed the change at first" and then explains that people came to find shared time useful, so the detail shows early resistance. The railroads created zones because of confusing schedules, not because of these complaints.`),
      ],
    },
    {
      code: 'rg8-main-idea-summary-p03',
      title: 'The Tool Library',
      body: `Most households own a drill that gets used for only a few minutes each year. It sits in a drawer or a garage, waiting for the next shelf to hang. In a growing number of neighborhoods, people have decided there is a better way. They have started tool libraries, where members borrow equipment the same way they would borrow a book.\n\nA tool library works on a simple plan. Neighbors donate tools they rarely use, or the group buys them with small membership fees. Members can then check out a ladder, a saw or a set of garden shears for a week at a time. Volunteers keep track of what has been borrowed and make small repairs when something breaks.\n\nThe benefits reach beyond saving money. When fewer people buy tools that sit unused, fewer tools end up in landfills. Many tool libraries also hold free workshops on fixing a bike tire or building a planter box, so members learn skills along with borrowing equipment.\n\nTool libraries can also bring neighbors together. In one city neighborhood, a retired carpenter named Mr. Delacroix volunteers every Saturday. Teenagers who come in to borrow a sander often stay to ask him for advice, and some have joined him to repair benches at the local park.\n\nRunning a tool library is not always easy. Volunteers must find a space to store everything, and a few borrowers return items late or damaged. Still, organizers say these problems are small compared with what the community gains. A shared shelf of tools turns into a shared set of skills and friendships.`,
      items: [
        q(11, 'easy', `Which sentence best states the central idea of the passage?`, [
          right(`Tool libraries let neighbors share equipment, which saves resources and builds community.`),
          wrong(`Most households own a drill that is used for only a few minutes each year.`, 'too-narrow'),
          wrong(`Volunteers at tool libraries spend most of their time fixing broken tools.`, 'unsupported-inference'),
          wrong(`Every family should stop buying tools and join a tool library instead.`, 'overstates-claim'),
        ], `The passage explains how tool libraries work and how they reduce waste and connect neighbors. The drill detail is only the opening hook that introduces the topic.`),
        q(12, 'medium', `How does the fourth paragraph develop the central idea?`, [
          right(`It gives an example of a tool library helping people of different ages connect.`),
          wrong(`It explains how members pay for the tools the library lends out.`, 'misreads-structure'),
          wrong(`It describes a problem that makes tool libraries hard to run well.`, 'misreads-structure'),
          wrong(`It shows that only skilled carpenters should be allowed to borrow tools.`, 'unsupported-inference'),
        ], `Paragraph 4 describes teenagers learning from a retired carpenter and repairing park benches with him, which supports the idea that tool libraries bring neighbors together. Problems are described in the final paragraph, not here.`),
        q(13, 'easy', `Which detail supports the idea that tool libraries help the environment?`, [
          right(`When fewer people buy tools that sit unused, fewer tools end up in landfills.`),
          wrong(`Members can check out a ladder or a saw for a week at a time.`, 'wrong-supporting-detail'),
          wrong(`Volunteers must find a space to store all of the shared tools.`, 'wrong-supporting-detail'),
          wrong(`Teenagers often stay to ask a volunteer for advice on projects.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 links sharing tools to fewer tools in landfills, which is an environmental benefit. The other details describe how the library works, a challenge, or a social benefit.`),
        q(14, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Tool libraries let members borrow equipment instead of buying it. They reduce waste, teach skills and connect neighbors, though they face problems such as storage and late returns.`),
          wrong(`Tool libraries let members borrow equipment instead of buying it. They are the best idea any neighborhood has ever had, and every city should pay to open one.`, 'includes-opinion'),
          wrong(`A retired carpenter volunteers at a tool library every Saturday. Teenagers ask him for advice, and some help him repair benches at the local park.`, 'too-narrow'),
          wrong(`Tool libraries are hard to run because borrowers damage tools. Most organizers have decided that these problems are too large to manage.`, 'contradicts-text'),
        ], `The choice about reducing waste, teaching skills and facing storage problems covers how tool libraries work, their benefits and their challenges without adding opinions. The choice saying the problems are too large reverses the text, which says organizers think the problems are "small compared with what the community gains."`),
        q(15, 'hard', `Why does the author include the paragraph about the difficulties of running a tool library?`, [
          right(`To give a balanced view before concluding that the benefits outweigh the problems.`),
          wrong(`To argue that tool libraries are not worth the effort that they require.`, 'contradicts-text'),
          wrong(`To explain why neighborhoods started tool libraries in the first place.`, 'confuses-cause-effect'),
          wrong(`To show that the volunteers are not doing their jobs carefully enough.`, 'unsupported-inference'),
        ], `The paragraph names real challenges but then says "these problems are small compared with what the community gains," which keeps the central idea positive. It does not argue that tool libraries are not worth it.`),
      ],
    },
    {
      code: 'rg8-main-idea-summary-p04',
      title: 'Engineers of the Stream',
      body: `Few animals change their surroundings as much as the beaver does. By cutting down trees and piling up branches, mud and stones, a beaver family can turn a narrow stream into a wide pond. Scientists sometimes call beavers ecosystem engineers because their building projects reshape the land and the lives of many other creatures.\n\nA beaver dam slows the flow of water. Behind it, a pond forms, and the ground around the pond becomes soggy wetland. These wet areas act like sponges. During heavy rain they soak up extra water, which can reduce flooding downstream. During dry spells they release water slowly, helping streams keep flowing.\n\nThe new ponds and wetlands also become homes. Frogs lay eggs in the calm water. Ducks and herons hunt for food along the edges. Young fish find shelter among the sunken branches, safe from strong currents. A stretch of stream that once supported a few kinds of animals may soon support dozens.\n\nBeaver dams can cause trouble, too. Sometimes the rising water floods a road, a farm field or a backyard. In the past, landowners often removed beavers entirely. Today, some communities try a different approach. They install pipes through dams to control how high the water rises, letting the beavers stay while protecting nearby property.\n\nSome land managers have even started bringing beavers back to areas where they had disappeared. They have found that a single beaver family can restore a damaged stream faster and more cheaply than human crews. The beaver's busy building, once seen mainly as a nuisance, is now valued as a natural tool for healthier waterways.`,
      items: [
        q(16, 'easy', `What is the central idea of the passage?`, [
          right(`Beaver dams reshape streams in ways that help water and wildlife, and people now value them.`),
          wrong(`Beavers have strong front teeth that let them chew through tree trunks quickly.`, 'outside-knowledge'),
          wrong(`Frogs and ducks are the animals that benefit most from beaver ponds.`, 'too-narrow'),
          wrong(`Beaver dams flood roads and farms, so beavers should be removed from them.`, 'contradicts-text'),
        ], `The passage explains how dams change streams, help water flow and wildlife, and are now valued as "a natural tool." The choice about teeth is never mentioned in the passage, so it cannot be its central idea.`),
        q(17, 'easy', `Which detail best supports the idea that beaver ponds create homes for other animals?`, [
          right(`Young fish shelter among the sunken branches, safe from strong currents.`),
          wrong(`Wetlands soak up extra water during heavy rain and reduce flooding.`, 'wrong-supporting-detail'),
          wrong(`Pipes through a dam can control how high the water behind it rises.`, 'wrong-supporting-detail'),
          wrong(`Beavers pile up branches, mud and stones to build their dams.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 says young fish find shelter among the branches, which shows the pond becoming a home. The wetland detail is about flood control, a different supporting idea.`),
        q(18, 'medium', `How does the second paragraph develop the central idea?`, [
          right(`It explains how beaver wetlands help control both flooding and dry spells.`),
          wrong(`It lists the different animals that move into new beaver ponds.`, 'misreads-structure'),
          wrong(`It describes the problems that beaver dams cause for landowners.`, 'misreads-structure'),
          wrong(`It explains how beavers decide where along a stream to build.`, 'unsupported-inference'),
        ], `Paragraph 2 says wetlands "soak up extra water" in heavy rain and "release water slowly" in dry spells. The animals that use the ponds are described in paragraph 3.`),
        q(19, 'medium', `Which statement would NOT belong in an objective summary of the passage?`, [
          right(`Beavers are the most impressive animals that anyone could ever hope to see.`),
          wrong(`Beaver dams slow the flow of water and create ponds and wetlands.`, 'misjudges-objectivity'),
          wrong(`Some communities use pipes so beavers can stay without flooding property.`, 'misjudges-objectivity'),
          wrong(`Land managers have brought beavers back to help restore damaged streams.`, 'misjudges-objectivity'),
        ], `An objective summary leaves out personal opinions, and "the most impressive animals" is a judgment the passage never makes. The other three statements restate facts from the passage.`),
        q(20, 'hard', `How do the last two paragraphs develop the central idea?`, [
          right(`They show that people have moved from removing beavers to working with them and bringing them back.`),
          wrong(`They show that beaver dams cause more harm than good for most of the communities near them.`, 'contradicts-text'),
          wrong(`They explain the scientific reason that beavers build dams across streams in the first place.`, 'misreads-structure'),
          wrong(`They prove that human work crews are no longer able to repair any damaged streams.`, 'overstates-claim'),
        ], `Paragraph 4 says landowners once removed beavers but now install pipes, and paragraph 5 says managers are bringing beavers back. The passage says beavers restore streams "faster and more cheaply," not that people cannot do it at all.`),
      ],
    },
    {
      code: 'rg8-main-idea-summary-p05',
      title: 'The Practice That Happens in Bed',
      body: `Athletes spend hours running drills, lifting weights and studying game film. Yet one of the most important parts of training happens when they are not moving at all. Research on sleep suggests that rest is not time away from practice. It is part of how the body and brain improve.\n\nDuring deep sleep, the body releases substances that help repair muscles. Hard exercise creates tiny tears in muscle fibers, and the repair work that follows is what makes muscles stronger. When an athlete skips sleep, that repair has less time to happen, and sore muscles may stay sore longer.\n\nSleep also helps the brain store new skills. When a basketball player practices a new shot, the brain builds connections that guide the movement. Studies have found that people who sleep after learning a physical task often perform it more smoothly the next day than people who stay awake. In other words, some of the learning from practice is finished at night.\n\nA tired athlete also makes more mistakes. Reaction times slow down, and it becomes harder to focus on a play or remember a coach's instructions. Some studies of young athletes have found that those who regularly slept fewer than eight hours were more likely to get hurt.\n\nFor these reasons, many coaches now treat sleep as part of the training plan. They encourage players to keep a regular bedtime, put screens away before sleeping and avoid late practices when possible. One high school track coach, Ms. Oyelaran, even asks her runners to log their sleep alongside their running times. A good night's rest, she tells them, is a workout they cannot afford to skip.`,
      items: [
        q(21, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`Sleep is an essential part of athletic training because it helps the body and brain improve.`),
          wrong(`Basketball players must practice a new shot many times before they use it in a game.`, 'too-narrow'),
          wrong(`Athletes should stop lifting weights and spend their training time resting instead.`, 'overstates-claim'),
          wrong(`Coaches today care more about how their players sleep than about winning games.`, 'unsupported-inference'),
        ], `The passage shows how sleep repairs muscles, stores skills and prevents mistakes, so sleep is part of training. It never says athletes should replace exercise with rest.`),
        q(22, 'medium', `How does the third paragraph develop the central idea?`, [
          right(`It explains that sleep helps the brain lock in physical skills learned during practice.`),
          wrong(`It explains how sleep helps repair the tiny tears in an athlete's muscle fibers.`, 'misreads-structure'),
          wrong(`It describes the rules coaches set to help their players sleep better at night.`, 'misreads-structure'),
          wrong(`It shows that athletes who sleep less are more likely to get hurt in games.`, 'misreads-structure'),
        ], `Paragraph 3 says people who sleep after learning a task "perform it more smoothly the next day," so sleep finishes some of the learning. Muscle repair is the focus of paragraph 2, not paragraph 3.`),
        q(23, 'medium', `Which detail best supports the claim that a lack of sleep can hurt an athlete's performance during a game?`, [
          right(`Reaction times slow down, and it becomes harder to focus on a play.`),
          wrong(`Athletes spend many hours studying game film during each season.`, 'wrong-supporting-detail'),
          wrong(`Coaches encourage players to put their screens away before bed.`, 'wrong-supporting-detail'),
          wrong(`Deep sleep releases substances that help the body repair muscles.`, 'misses-connection'),
        ], `Paragraph 4 says tired athletes have slower reactions and trouble focusing on a play, which directly affects a game. The muscle repair detail shows a benefit of sleep for recovery, not what goes wrong during play.`),
        q(24, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Sleep helps athletes repair muscles, store new skills, and stay focused and safe. Because of this, many coaches now include sleep habits in their training plans.`),
          wrong(`Sleep helps athletes repair muscles and learn skills. Any athlete who stays up late is lazy and does not deserve a spot on a school team.`, 'includes-opinion'),
          wrong(`A track coach asks her runners to record their sleep with their running times. She tells them rest is a workout they cannot skip.`, 'too-narrow'),
          wrong(`Athletes get hurt mainly because coaches hold practices too late at night. Moving practices earlier would prevent nearly all sports injuries.`, 'unsupported-inference'),
        ], `The choice about repairing muscles, storing skills and coaches' training plans states each supporting idea and the coaches' response without judgment. The coach example is accurate, but it covers only one detail from the last paragraph.`),
        q(25, 'hard', `What is the purpose of the opening paragraph's claim that rest "is part of how the body and brain improve"?`, [
          right(`It introduces the central idea, which later paragraphs support with specific effects of sleep.`),
          wrong(`It sums up a coach's advice that is explained in detail at the end of the passage.`, 'misreads-structure'),
          wrong(`It presents a common belief that the author later argues is mistaken.`, 'contradicts-text'),
          wrong(`It gives the main reason that athletes spend so many hours studying game film.`, 'misreads-structure'),
        ], `The claim states the central idea, and paragraphs 2 through 4 support it with body repair, skill learning and focus. The author agrees with the claim throughout, so it is not a view the author argues against.`),
      ],
    },
    {
      code: 'rg8-main-idea-summary-p06',
      title: 'Bringing a Mural Back',
      body: `For forty years, a painted mural of a river and a crowd of fishing boats covered the side of the community center in Port Alder. Over time, sun and rain faded its blues into gray, and patches of paint peeled away. When the town decided to restore the mural, it hired a conservator named Ana Kowalczyk. Her job was not to paint a new picture. It was to bring back the original one as faithfully as possible.\n\nRestoration begins with careful study. Kowalczyk photographed every section of the wall and compared the images with old photos from the town archive. She tested tiny paint samples to learn what materials the first artist had used. These steps helped her see which areas had faded, which had been painted over and which were still in good shape.\n\nNext came cleaning and repair. Using soft brushes and mild cleaners, her team removed dirt without scrubbing away the original paint. They filled cracks in the wall and glued loose flakes of paint back into place before adding anything new.\n\nOnly then did the team begin repainting. They matched colors to the old photographs and added paint only where the original was missing. Kowalczyk kept a detailed record of every change, so future conservators would know which brushstrokes were new.\n\nFinally, the team covered the mural with a clear coating that blocks some sunlight and makes graffiti easier to remove. The restoration took most of a summer. When it was finished, longtime residents said the boats looked the way they remembered from childhood. The careful, step-by-step process had given the town back a piece of its history rather than a copy of it.`,
      items: [
        q(26, 'easy', `What is the central idea of the passage?`, [
          right(`Restoring a mural is a careful, step-by-step process meant to preserve the original artwork.`),
          wrong(`The mural in Port Alder shows a river crowded with many fishing boats.`, 'too-narrow'),
          wrong(`Old murals should be painted over with new designs every few decades.`, 'contradicts-text'),
          wrong(`Sun and rain are the greatest dangers to every kind of outdoor art.`, 'overgeneralization'),
        ], `The passage walks through each stage of restoration and stresses bringing back "the original one as faithfully as possible." The subject of the mural is a detail, not the central idea.`),
        q(27, 'medium', `How does the second paragraph contribute to the development of the central idea?`, [
          right(`It shows that restoration starts with research into the mural's original condition.`),
          wrong(`It describes how the team protected the mural after the work was finished.`, 'misreads-structure'),
          wrong(`It explains why the town chose Kowalczyk instead of another conservator.`, 'unsupported-inference'),
          wrong(`It shows that the original artist used poor materials that faded quickly.`, 'unsupported-inference'),
        ], `Paragraph 2 describes photographing the wall, studying archive photos and testing paint samples before any work begins. The protective coating is described in the final paragraph.`),
        q(28, 'medium', `Which detail best supports the idea that the team tried to protect the original paint?`, [
          right(`They removed dirt with soft brushes and mild cleaners instead of scrubbing.`),
          wrong(`The restoration of the mural took most of a summer to complete.`, 'wrong-supporting-detail'),
          wrong(`Residents said the boats looked the way they did years before.`, 'wrong-supporting-detail'),
          wrong(`The mural had covered the community center wall for forty years.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 says the team cleaned "without scrubbing away the original paint," which shows care for the original. How long the work took does not show how the team treated the paint.`),
        q(29, 'medium', `Which is the best objective summary of the passage?`, [
          right(`A conservator restored a faded mural by studying it, cleaning and repairing it, repainting only missing areas and sealing it. The process preserved the original work.`),
          wrong(`A conservator restored a faded mural in Port Alder. It is now the most beautiful mural in the region, and other towns should be jealous of it.`, 'includes-opinion'),
          wrong(`A conservator tested paint samples and compared photographs of a mural. She learned which materials the first artist had used on the wall.`, 'too-narrow'),
          wrong(`A conservator replaced an old, faded mural with a brand new painting of boats. Residents liked the new design better than the old one.`, 'contradicts-text'),
        ], `The choice about studying, cleaning, repairing and sealing the mural names every stage and the goal of preserving the original, with no opinions. The choice about a brand new painting of boats contradicts the text, which says her job "was not to paint a new picture."`),
        q(30, 'hard', `Why does the author note that Kowalczyk "kept a detailed record of every change"?`, [
          right(`It reinforces that restoration respects the original by keeping new work clearly identified.`),
          wrong(`It shows that the team did not trust Kowalczyk to remember her own work.`, 'unsupported-inference'),
          wrong(`It explains why the restoration took most of a summer to finish.`, 'confuses-cause-effect'),
          wrong(`It suggests that the mural will need to be fully repainted again soon.`, 'unsupported-inference'),
        ], `The record lets future conservators "know which brushstrokes were new," which supports the central idea of protecting the original. The passage never connects the record to how long the project took.`),
      ],
    },
    {
      code: 'rg8-main-idea-summary-p07',
      title: 'How Your Map Knows Where You Are',
      body: `When you open a map on a phone, a small dot shows exactly where you are standing. That dot depends on a system of satellites circling high above Earth. Understanding how the system works reveals that finding a location is really a problem of measuring time.\n\nEach satellite carries an extremely accurate clock. It constantly sends out a signal that says, in effect, which satellite it is and exactly when the signal left. A receiver in a phone picks up the signal and notes when it arrived. Because radio signals travel at a known speed, the tiny delay tells the receiver how far away that satellite is.\n\nOne distance is not enough. Knowing you are a certain distance from one satellite only places you somewhere on a huge imaginary sphere. With signals from several satellites, the receiver can find the single point where all those distances agree. Receivers usually need at least four satellites to pin down a location and correct for errors in the phone's own clock.\n\nTiming has to be extraordinarily precise. Signals travel so fast that an error of one millionth of a second could throw the location off by hundreds of meters. That is why the satellites' clocks are so carefully built and checked.\n\nThe system is not perfect. Tall buildings can block or bounce signals, and a phone indoors may struggle to find enough satellites. To help, phones often combine satellite data with information from nearby cell towers and wireless networks. Still, the basic idea remains the same. Every time the dot moves on your map, it is the result of a fast and careful calculation of time and distance.`,
      items: [
        q(31, 'easy', `Which statement best expresses the central idea of the passage?`, [
          right(`Phones find their location by measuring how long satellite signals take to arrive.`),
          wrong(`Tall buildings in a city can block or bounce signals sent from satellites.`, 'too-narrow'),
          wrong(`Phone maps work more accurately indoors than they do outside on a street.`, 'contradicts-text'),
          wrong(`Satellites were built mainly so that people could use map apps on phones.`, 'unsupported-inference'),
        ], `The passage says finding a location "is really a problem of measuring time" and explains how signal delays become distances. Blocked signals are one limitation, not the central idea.`),
        q(32, 'medium', `How does the third paragraph develop the central idea?`, [
          right(`It explains why signals from several satellites are needed to find one exact point.`),
          wrong(`It explains how each satellite's clock is carefully built and checked.`, 'misreads-structure'),
          wrong(`It describes the problems that happen when a phone is used indoors.`, 'misreads-structure'),
          wrong(`It shows that a single satellite is enough to locate a phone exactly.`, 'contradicts-text'),
        ], `Paragraph 3 says "one distance is not enough" and explains that the receiver finds the point where several distances agree. It directly rejects the idea that one satellite is enough.`),
        q(33, 'medium', `Which detail best supports the idea that timing must be extremely precise?`, [
          right(`An error of one millionth of a second could move the location by hundreds of meters.`),
          wrong(`A small dot on the map shows exactly where the phone's user is standing.`, 'wrong-supporting-detail'),
          wrong(`Phones often combine satellite data with information from cell towers.`, 'wrong-supporting-detail'),
          wrong(`Tall buildings can block or bounce satellite signals in a crowded city.`, 'wrong-supporting-detail'),
        ], `Paragraph 4 shows that a tiny timing error causes a large location error, which is why precision matters. The cell tower detail explains a backup source of data, not timing.`),
        q(34, 'hard', `Which is the best objective summary of the passage?`, [
          right(`Satellites send timed signals, and a phone uses the delays from several of them to calculate its position. Precise clocks are essential, and other data helps when signals are blocked.`),
          wrong(`Satellites send timed signals that phones use to find their position. This clever system is easily the greatest invention of modern times and deserves more praise.`, 'includes-opinion'),
          wrong(`A phone receives a signal from one satellite and uses it to find its exact position. Tall buildings and indoor spaces never interfere with this process.`, 'contradicts-text'),
          wrong(`Phones mostly use cell towers and wireless networks to find their location. Satellites are used only as a backup when those networks are not available.`, 'confuses-main-and-minor'),
        ], `The choice about delays from several satellites covers signal timing, the need for several satellites, precise clocks and backup data without opinion. The choice saying satellites are only a backup reverses the roles, since the passage says phones add tower data "to help," not that satellites are the backup.`),
        q(35, 'hard', `The author says finding a location "is really a problem of measuring time." How does the rest of the passage develop this idea?`, [
          right(`It shows that each step, from signal delays to clock accuracy, depends on measuring time precisely.`),
          wrong(`It shows that the clocks inside phones keep better time than the clocks on satellites.`, 'contradicts-text'),
          wrong(`It argues that people spend far too much of their time looking at map apps on phones.`, 'unsupported-inference'),
          wrong(`It explains how the satellites were launched into space one at a time over many years.`, 'misreads-structure'),
        ], `Later paragraphs turn signal delays into distances and stress that a millionth of a second matters, so time is at the center of each step. The passage mentions "errors in the phone's own clock," so phone clocks are not better.`),
      ],
    },
    {
      code: 'rg8-main-idea-summary-p08',
      title: 'Cooking Belongs in Every School',
      body: `Many students can solve equations and write essays, yet they cannot cook a simple meal. Schools should change that by offering basic cooking classes to every student before high school graduation. Cooking is a practical skill that supports health, independence and learning in other subjects.\n\nFirst, cooking helps young people make healthier choices. A student who knows how to prepare a bowl of soup or a stir-fry is less likely to depend on fast food or snacks from a vending machine. Learning to read recipes and nutrition labels also teaches students what is actually in their food.\n\nSecond, cooking builds independence. Within a few years, many students will live on their own for the first time. Knowing how to plan meals, follow a budget at the grocery store and store leftovers safely can save money and stress. These are skills that adults use every week.\n\nCooking also connects to other classes. Doubling a recipe requires fractions. Baking bread shows how yeast produces gas that makes dough rise. Exploring dishes from different cultures can lead to lessons about geography and history. A kitchen can be a lab, a math room and a social studies class all at once.\n\nSome people argue that schools do not have the time or money for cooking classes. That concern is reasonable, since kitchens and ingredients cost money. However, a class does not require a fancy kitchen. Portable burners, shared ingredients and partnerships with local farms can keep costs low. Even a short unit within an existing health class would be a strong start.\n\nStudents leave school prepared to take tests. They should also leave prepared to feed themselves.`,
      items: [
        q(36, 'easy', `What is the author's central claim?`, [
          right(`Schools should teach every student basic cooking because it is a valuable life skill.`),
          wrong(`Students today are much worse at math than students were in the past.`, 'unsupported-inference'),
          wrong(`Fast food and vending machine snacks should be banned from all schools.`, 'overstates-claim'),
          wrong(`Baking bread is the best possible way for students to learn about science.`, 'too-narrow'),
        ], `The second sentence states the claim directly: schools should offer cooking classes to every student. Baking bread is one example in paragraph 4, not the main point.`),
        q(37, 'medium', `How does the fourth paragraph support the central claim?`, [
          right(`It shows that cooking can strengthen learning in subjects such as math, science and history.`),
          wrong(`It explains several ways that cooking classes could be offered at a low cost.`, 'misreads-structure'),
          wrong(`It argues that cooking helps students make healthier choices about their food.`, 'misreads-structure'),
          wrong(`It shows that cooking is more important than every other subject in school.`, 'overstates-claim'),
        ], `Paragraph 4 connects recipes to fractions, bread to science, and dishes to geography and history. Low costs are discussed in paragraph 5, not paragraph 4.`),
        q(38, 'medium', `Which detail best supports the idea that cooking builds independence?`, [
          right(`Planning meals and following a grocery budget can save money and stress.`),
          wrong(`Baking bread shows how yeast produces gas that makes dough rise.`, 'wrong-supporting-detail'),
          wrong(`Portable burners can help keep the cost of a cooking class low.`, 'wrong-supporting-detail'),
          wrong(`Dishes from different cultures can lead to lessons about history.`, 'wrong-supporting-detail'),
        ], `Paragraph 3, which is about independence, says planning meals and budgeting help students who will soon live on their own. The bread detail supports the point about other subjects instead.`),
        q(39, 'hard', `Which is the best objective summary of the passage?`, [
          right(`The author argues that schools should teach cooking because it supports health, independence and other subjects, and offers low-cost answers to concerns about time and money.`),
          wrong(`The author argues that schools should teach cooking. Anyone who disagrees with this plan simply does not care about students or about their futures after graduation.`, 'includes-opinion'),
          wrong(`The author explains that doubling a recipe requires fractions and that yeast makes bread rise. The passage shows that cooking is mainly a way to teach math and science.`, 'too-narrow'),
          wrong(`The author argues that schools cannot afford cooking classes right now and should drop the idea until every school has built a new, fully equipped kitchen.`, 'contradicts-text'),
        ], `An objective summary of an argument reports the claim and reasons without adding new judgments, which the choice about health, independence and low-cost answers does. The choice saying anyone who disagrees "does not care about students" adds a harsh opinion the author never states; the author calls the cost concern "reasonable."`),
        q(40, 'hard', `How does the paragraph about time and money contribute to the development of the author's central claim?`, [
          right(`It answers a likely objection, which makes the argument for cooking classes stronger.`),
          wrong(`It shows that the author has changed position and no longer supports cooking classes.`, 'contradicts-text'),
          wrong(`It provides the main reason that the author believes students should learn to cook.`, 'misreads-structure'),
          wrong(`It proves that every school already has a working kitchen that students can use.`, 'contradicts-text'),
        ], `Paragraph 5 admits the cost concern is reasonable and then explains low-cost options, which addresses the objection and keeps the claim strong. The author's reasons for cooking appear in paragraphs 2 through 4, not here.`),
      ],
    },
  ],
}

export default skill
