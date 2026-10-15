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
  slug: 'read-g9-main-idea-summary',
  subject: 'reading',
  grade: 9,
  group: 'Informational text',
  name: 'Main Idea and Summary',
  standards: ['RI.9-10.2'],
  passages: [
    {
      code: 'rg9-main-idea-summary-p01',
      title: 'When Ice Came from Ponds',
      body: `Long before electric freezers, people in the fictional river town of Merrow Falls kept their food cold with ice cut from frozen ponds. Every January, when the ice on Fenwick Pond grew thicker than a foot, the town turned the pond into a busy workplace.\n\nThe harvest followed careful steps. First, workers cleared the snow so the ice would freeze evenly. Then a horse pulled a sharp plow that scored the surface into a grid of long lines. Workers with hand saws cut along the lines and floated the heavy blocks down a channel of open water to a ramp. From there, the blocks were hauled into a tall wooden icehouse beside the pond.\n\nThe icehouse was the secret to making winter last. Its thick walls were packed with sawdust, and every layer of blocks was covered with more sawdust or straw. Because these materials slowed the flow of heat, much of the ice stayed frozen until late summer. Families bought blocks from a delivery wagon and placed them in wooden iceboxes in their kitchens.\n\nThe work was cold and hard, but it gave the town steady winter jobs. According to records kept by the Merrow Falls Historical Society, more than eighty people worked the harvest in a good year. Local dairies depended on the ice to keep milk fresh, and the town's butcher used it to store meat through the hot months.\n\nThe pond harvest ended in the 1930s, when electric refrigerators became affordable and factories began making ice year round. Today the old icehouse is a small museum, where visitors can lift a pair of iron ice tongs and imagine how a frozen pond once kept a whole town supplied through the summer.`,
      items: [
        q(1, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Workers in Merrow Falls used a horse-drawn plow to score the ice on Fenwick Pond.`, 'too-narrow'),
          right(`Before refrigerators, Merrow Falls harvested and stored pond ice each winter, which kept food cold and gave people work.`),
          wrong(`Electric refrigerators were invented because ice harvesting was too dangerous for workers.`, 'unsupported-inference'),
          wrong(`The old icehouse in Merrow Falls is now one of the most popular museums in the region.`, 'overgeneralization'),
        ], `The passage explains how the town cut, stored and used pond ice and why it mattered, which the second choice sums up. The plow is just one step in the harvest described in paragraph 2.`),
        q(2, 'easy', `What is the main idea of the second paragraph?`, [
          wrong(`Horses were the most important workers during the ice harvest.`, 'too-narrow'),
          wrong(`The ice on Fenwick Pond had to be more than a foot thick.`, 'misreads-detail'),
          wrong(`Workers often fell into the open channel while moving the blocks.`, 'unsupported-inference'),
          right(`Harvesting the ice was a step-by-step process from clearing snow to storing blocks.`),
        ], `Paragraph 2 opens with "The harvest followed careful steps" and then lists them in order. The thickness of the ice is mentioned in paragraph 1, not as the point of paragraph 2.`),
        q(3, 'medium', `How does the third paragraph develop the central idea?`, [
          wrong(`It describes how families paid the delivery wagon for each block of ice.`, 'too-narrow'),
          wrong(`It argues that sawdust is a better material for walls than wood or stone.`, 'misreads-purpose'),
          right(`It explains how the icehouse kept winter ice frozen long enough to be used in summer.`),
          wrong(`It shows that most of the ice melted before families could use it.`, 'contradicts-text'),
        ], `The paragraph calls the icehouse "the secret to making winter last" and explains that sawdust and straw "slowed the flow of heat." It says much of the ice lasted until late summer, so it did not mostly melt.`),
        q(4, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Ice harvesting was a terrible job, and the people of Merrow Falls were lucky when refrigerators finally replaced it in the 1930s.`, 'includes-opinion'),
          wrong(`Workers cleared snow, scored the ice, sawed blocks and floated them to a ramp. Then they hauled the blocks into the icehouse.`, 'too-narrow'),
          wrong(`Merrow Falls became famous for selling its pond ice to cities around the world until factories took over the business.`, 'unsupported-inference'),
          right(`Each winter, Merrow Falls cut ice from a pond and stored it in an insulated icehouse. The ice kept food cold through summer and created jobs until refrigerators replaced it.`),
        ], `The last choice covers the harvest, the storage, its uses and its end without adding opinions. The first choice adds judgments such as "terrible" and "lucky" that the passage never states.`),
        q(5, 'hard', `How does the final paragraph contribute to the development of the central idea?`, [
          right(`It explains why the harvest ended and shows that the practice is now remembered as part of the town's history.`),
          wrong(`It shifts the focus to the invention of electric refrigerators and how they work.`, 'misreads-structure'),
          wrong(`It suggests that the town regrets giving up the pond harvest and hopes to bring it back.`, 'unsupported-inference'),
          wrong(`It adds a new argument that museums are the best way to teach young people about history.`, 'misreads-purpose'),
        ], `The final paragraph gives the reason the harvest stopped, affordable refrigerators and factory ice, and notes that the icehouse is now a museum. It never says the town wants the harvest back.`),
      ],
    },
    {
      code: 'rg9-main-idea-summary-p02',
      title: 'The Threads Beneath the Forest',
      body: `When people look at a forest, they usually notice trunks, branches and leaves. But some of the most important activity happens out of sight. In the soil, many trees are linked to fungi, living things that grow as networks of thin threads much finer than a human hair.\n\nThe partnership benefits both sides. The fungal threads wrap around or grow into the tips of tree roots. Because the threads spread far through the soil, they can collect water and minerals, such as phosphorus, that the roots would struggle to reach on their own. In return, the tree passes along some of the sugar it makes from sunlight. The fungi cannot make their own food, so this trade keeps them alive.\n\nIn a study in the fictional Larchmont Valley, forest scientist Amara Kovacs and her students tested how much young trees depended on these partners. They planted seedlings in two kinds of soil: one with the usual fungi and one in which the fungi had been removed. After two growing seasons, the seedlings in soil with fungi were, on average, almost twice as tall. They also survived a dry summer far better.\n\nKovacs is careful not to overstate the findings. Some reports claim that trees use the fungal threads to send warnings or share food with their neighbors on purpose. She notes that scientists are still debating how much material actually moves between trees through these threads, and why. What is clear, she says, is that many trees grow poorly without their fungal partners.\n\nThat lesson matters for people who replant forests after fires or logging. Crews in Larchmont Valley now test the soil before planting. Where fungi are missing, they add a small amount of healthy forest soil to each hole, giving the seedlings a partner from the start.`,
      items: [
        q(6, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Trees use underground threads to send warnings and share food with neighboring trees on purpose.`, 'contradicts-text'),
          wrong(`Seedlings in the Larchmont Valley study grew almost twice as tall in soil with fungi.`, 'too-narrow'),
          right(`Many trees depend on a hidden partnership with soil fungi, and understanding it helps people grow new forests.`),
          wrong(`Fungi are harmful to forests because they take sugar away from the trees they live on.`, 'misreads-relationship'),
        ], `The passage explains the trade between trees and fungi, gives evidence of its importance and applies it to replanting. The warning claim is one the scientist says is still being debated, so it is not the central idea.`),
        q(7, 'easy', `Which detail best supports the idea that the partnership benefits both the tree and the fungi?`, [
          wrong(`The fungal threads are much finer than a human hair.`, 'irrelevant-detail'),
          wrong(`Crews now test the soil before planting new trees.`, 'irrelevant-detail'),
          wrong(`Seedlings were planted in two different kinds of soil.`, 'too-narrow'),
          right(`The fungi gather water and minerals, and the tree passes along sugar.`),
        ], `Paragraph 2 describes a two-way trade: the fungi supply water and minerals, and the tree supplies sugar. The thread size describes the fungi but says nothing about a benefit.`),
        q(8, 'medium', `How does the Larchmont Valley study develop the central idea?`, [
          right(`It provides evidence that young trees grow and survive better when fungal partners are present in the soil.`),
          wrong(`It proves that fungi can make their own food from sunlight without help from trees.`, 'contradicts-text'),
          wrong(`It shows that dry summers are the main reason young trees fail to grow in forests.`, 'overgeneralization'),
          wrong(`It explains how fungal threads carry messages from one tree to another tree.`, 'unsupported-inference'),
        ], `The seedlings with fungi were "almost twice as tall" and "survived a dry summer far better," which shows the partnership matters. The passage states that fungi "cannot make their own food," so the second choice contradicts it.`),
        q(9, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Forests are full of amazing hidden secrets, and everyone should learn to respect the fungi that make all life on Earth possible.`, 'includes-opinion'),
          right(`Many trees trade sugar with soil fungi for water and minerals. A study found seedlings grew better with fungi, and although some claims are debated, crews now add fungi when replanting.`),
          wrong(`Amara Kovacs and her students planted seedlings in two soils, measured them after two seasons and found differences in their height.`, 'too-narrow'),
          wrong(`Trees warn one another through fungal threads, so crews now add forest soil to help seedlings hear these warnings.`, 'unsupported-inference'),
        ], `The second choice covers the trade, the study, the caution and the replanting practice in neutral words. The first choice adds praise and claims that do not appear in the passage.`),
        q(10, 'hard', `What is the purpose of the fourth paragraph in developing the central idea?`, [
          wrong(`It argues that the Larchmont Valley study was flawed and should not be trusted.`, 'overstates-limits'),
          wrong(`It introduces a new main idea about how trees communicate with each other.`, 'misreads-structure'),
          right(`It separates what is well supported, that trees need fungi, from popular claims that are still uncertain.`),
          wrong(`It shows that scientists agree completely about how material moves between trees.`, 'contradicts-text'),
        ], `Kovacs notes scientists "are still debating" how much moves between trees, but "What is clear" is that trees grow poorly without fungi. She questions outside reports, not her own study.`),
      ],
    },
    {
      code: 'rg9-main-idea-summary-p03',
      title: 'Running the Second Half Faster',
      body: `Most new cross-country runners make the same mistake. When the starting signal sounds, excitement takes over, and they sprint the first part of the race as if it were the whole race. By the final mile, their legs feel heavy, and runners who started more slowly pass them one by one.\n\nCoach Delphine Achterberg of the fictional Riverbend High School team wants her athletes to do the opposite. She teaches a plan called a negative split, which means running the second half of a race faster than the first. The idea sounds backward, but it rests on how the body uses energy. A runner who starts too fast builds up fatigue early and must slow down to recover. A runner who starts at a steady, controlled pace saves energy for a strong finish.\n\nLearning this plan takes practice. Achterberg has her runners wear simple watches during training and check their time at each half-mile marker. At first, many of them find the opening pace frustratingly slow. Over several weeks, they learn what an even effort feels like without looking at the watch. She also teaches them to pick out runners ahead and pass them steadily in the last part of the race.\n\nThe results have encouraged the team. During one season, Achterberg kept records of each runner's times. Runners who followed the plan improved their finishing times by an average of forty seconds. Just as important, she says, they enjoyed the races more because they felt strong at the end instead of exhausted.\n\nThe plan does not work perfectly in every race. Hilly courses and very hot days can upset even careful pacing. Still, Achterberg believes that learning patience at the start is one of the most valuable skills a young runner can gain.`,
      items: [
        q(11, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Runners at Riverbend High School wear simple watches during their training sessions.`, 'too-narrow'),
          wrong(`Hilly courses and hot days make cross-country races impossible to pace well.`, 'overstates-limits'),
          wrong(`Cross-country is a harder sport than other kinds of running events.`, 'unsupported-inference'),
          right(`Starting at a controlled pace and finishing faster helps runners race better, and one coach teaches this plan with good results.`),
        ], `The passage describes the common mistake, explains the negative split, shows how it is taught and reports the results. The watches are only one detail about how the plan is practiced.`),
        q(12, 'easy', `According to the passage, why does a runner who starts too fast often slow down later?`, [
          right(`The runner builds up fatigue early and must slow down to recover.`),
          wrong(`The runner forgets to check the time at each half-mile marker.`, 'misreads-detail'),
          wrong(`The runner gets distracted by passing other runners near the start.`, 'unsupported-inference'),
          wrong(`The runner usually chooses a course with too many steep hills.`, 'confuses-cause-effect'),
        ], `Paragraph 2 says a runner who starts too fast "builds up fatigue early and must slow down to recover." Checking times is part of the training, not the cause of slowing down.`),
        q(13, 'medium', `How does the third paragraph develop the central idea?`, [
          wrong(`It shows that most runners quickly give up on the negative split plan.`, 'contradicts-text'),
          right(`It explains how the coach trains runners to learn and hold an even pace.`),
          wrong(`It describes the history of the negative split and who first invented it.`, 'unsupported-inference'),
          wrong(`It proves that watches are the most important tool a runner can own.`, 'overgeneralization'),
        ], `Paragraph 3 begins "Learning this plan takes practice" and describes the watch checks and passing strategy. Runners find the pace frustrating "at first," but the passage says they learn it, not that they give up.`),
        q(14, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Coach Achterberg is the best coach in the region, and every runner should copy her plan if they want to win.`, 'includes-opinion'),
          wrong(`Runners check their watches at each half-mile marker and learn what an even effort feels like over several weeks.`, 'too-narrow'),
          right(`Many runners start too fast and fade. A coach teaches a negative split, running the second half faster, and her runners improved, though hills and heat can upset the plan.`),
          wrong(`Runners who start fast always lose, so the coach forbids her team from passing anyone until the final mile.`, 'overgeneralization'),
        ], `The third choice covers the problem, the plan, the results and the limits without adding judgments. The first choice gives opinions, such as "best coach," that the passage never states.`),
        q(15, 'hard', `How do the last two paragraphs work together to refine the central idea?`, [
          wrong(`The fourth paragraph praises the plan, and the fifth shows that it was a failure.`, 'overstates-limits'),
          wrong(`Both paragraphs repeat that the plan works perfectly in every kind of race.`, 'contradicts-text'),
          wrong(`The fourth gives a history of the team, and the fifth describes a new training plan.`, 'misreads-structure'),
          right(`The fourth gives evidence that the plan helps, and the fifth admits its limits while keeping its value.`),
        ], `Paragraph 4 reports an average improvement of forty seconds, and paragraph 5 notes that hills and heat can upset pacing but ends with "Still," keeping the plan's value. The plan is limited, not a failure.`),
      ],
    },
    {
      code: 'rg9-main-idea-summary-p04',
      title: 'Saving the Pages of the Kessler Gazette',
      body: `For ninety years, the fictional town of Kessler printed a weekly newspaper called the Kessler Gazette. It reported on school plays, harvest festivals, new bridges and the opening of every shop on Main Street. When the paper closed, its old issues were stored in the basement of the public library, stacked in boxes that few people ever opened.\n\nBy the time librarian Tomas Okonkwo-Reyes took a close look, the pages were in trouble. Old newspaper is made from cheap paper that turns yellow and brittle over time. Some pages cracked when they were turned. A leaking pipe had already ruined two years of issues. Okonkwo-Reyes realized that if nothing changed, much of the town's recorded history would simply crumble away.\n\nHis solution was to turn the pages into digital images. With a small grant, the library bought a scanner with a wide, flat bed that would not bend the fragile paper. Volunteers, including retirees and high school students, signed up for weekly shifts. They handled each page with clean cotton gloves, scanned it and saved it with the date and page number.\n\nThe project grew more useful than anyone expected. After the scans were finished, a computer program read the printed words so that people could search the whole collection by name or topic. Students used the archive for history projects. Families found wedding notices and sports scores from their grandparents' lives. A local museum used old advertisements to restore the original colors of a Main Street storefront.\n\nThe work took four years and more than eleven thousand pages. The original papers are now stored in acid-free boxes in a dry room, but most people never need to touch them. The town's history, once hidden in a damp basement, can now be read by anyone with a computer.`,
      items: [
        q(16, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Old newspaper is made from cheap paper that turns yellow and brittle over time.`, 'too-narrow'),
          wrong(`Small towns should stop printing newspapers and publish only online.`, 'unsupported-inference'),
          right(`A library saved a town's crumbling newspaper archive by scanning it, which made local history easy for everyone to use.`),
          wrong(`The Kessler Gazette was the most widely read weekly newspaper in its region.`, 'outside-knowledge'),
        ], `The passage moves from the danger to the old pages, to the scanning project, to its many uses, which the third choice sums up. The fact about cheap paper only explains why the pages were in danger.`),
        q(17, 'easy', `What is the main idea of the second paragraph?`, [
          wrong(`Librarians are responsible for fixing leaking pipes in library basements.`, 'misreads-purpose'),
          right(`The old newspapers were falling apart and at risk of being lost.`),
          wrong(`The newspaper reported on school plays and harvest festivals.`, 'misreads-detail'),
          wrong(`Newspapers are more valuable than books as historical records.`, 'unsupported-inference'),
        ], `Paragraph 2 says the pages "were in trouble," describes cracking paper and water damage, and warns history could "crumble away." The school plays are mentioned in paragraph 1.`),
        q(18, 'medium', `How does the fourth paragraph develop the central idea?`, [
          right(`It shows the many ways people used the searchable archive once it was finished.`),
          wrong(`It explains how volunteers handled each fragile page with cotton gloves.`, 'misreads-structure'),
          wrong(`It suggests that the museum paid for most of the scanning project.`, 'unsupported-inference'),
          wrong(`It argues that computers can read old newspapers better than people can.`, 'misreads-purpose'),
        ], `Paragraph 4 begins "The project grew more useful than anyone expected" and lists students, families and a museum using it. The gloves are described in paragraph 3, not paragraph 4.`),
        q(19, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`The Kessler Gazette printed stories about bridges, festivals and shops for ninety years before it finally closed its doors.`, 'too-narrow'),
          wrong(`Thanks to the heroic librarian, Kessler now has the finest history archive of any small town, and other towns should be jealous.`, 'includes-opinion'),
          wrong(`After a pipe leak destroyed all of the old newspapers, the library rebuilt the collection from family scrapbooks.`, 'contradicts-text'),
          right(`A town's old newspapers were decaying in a library basement. A librarian and volunteers scanned the pages over four years, creating a searchable archive that many people now use.`),
        ], `The last choice includes the problem, the solution and the result in neutral language. The leak ruined only two years of issues, so the third choice contradicts the passage.`),
        q(20, 'hard', `How does the final paragraph refine the central idea of the passage?`, [
          wrong(`It suggests the original papers were thrown away once they were scanned.`, 'contradicts-text'),
          wrong(`It shifts the focus to the cost of buying acid-free storage boxes.`, 'misreads-structure'),
          right(`It contrasts the hidden basement with open access today, showing that the project both protected and shared the history.`),
          wrong(`It argues that every library should spend four years scanning its collections.`, 'overgeneralization'),
        ], `The last sentence contrasts history "once hidden in a damp basement" with history anyone "can now read," and the originals are kept in a dry room. Nothing says the papers were thrown away.`),
      ],
    },
    {
      code: 'rg9-main-idea-summary-p05',
      title: 'The Return of the Hand-Painted Sign',
      body: `A century ago, almost every shop sign in the fictional city of Port Alder was painted by hand. Sign painters climbed ladders with brushes and cans of enamel, lettering the names of bakeries, barbershops and hardware stores in bold, careful strokes. Their work gave each street its own look.\n\nBy the 1980s, the trade had nearly disappeared. Machines could cut letters from vinyl sheets and print large signs quickly and cheaply. Shop owners chose the faster option, and most sign painters retired without training anyone to replace them.\n\nIn recent years, however, hand-painted signs have begun to return to Port Alder. Part of the reason is that some business owners want their shops to stand out. A sign painted by a skilled artist has small differences in each letter that a printed sign lacks. Lucia Fernhill, who owns a corner bakery, says customers often stop to photograph her painted window and then come inside.\n\nThe revival also depends on new painters learning old skills. Ingrid Matsuda, one of the last painters from the earlier era, began teaching evening classes at a community art center. Her students practice the same basic strokes for weeks before they paint a single word. They learn to mix paint so that it flows smoothly and to plan the spacing of letters so a sign can be read from across the street.\n\nThe trade remains small. A painted sign takes longer to make and costs more than a printed one, and not every shop can afford it. Yet Matsuda's students have now painted more than sixty signs around the city. For many residents, these signs are a reminder that a street can show the care of the people who work on it.`,
      items: [
        q(21, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Ingrid Matsuda teaches evening classes at a community art center in Port Alder.`, 'too-narrow'),
          right(`Hand-painted signs nearly vanished but are returning in Port Alder because owners value them and new painters are learning the craft.`),
          wrong(`Printed vinyl signs are poorly made and should be banned from city streets.`, 'unsupported-inference'),
          wrong(`Every shop in Port Alder has now replaced its printed sign with a painted one.`, 'overgeneralization'),
        ], `The passage traces the decline of hand-painted signs and the two reasons for their return. The classes are one of those reasons, so the first choice is too narrow.`),
        q(22, 'medium', `What is the main idea of the second paragraph?`, [
          wrong(`Sign painters retired because they no longer enjoyed climbing ladders.`, 'unsupported-inference'),
          wrong(`Vinyl signs looked better than painted signs to most customers.`, 'unsupported-inference'),
          right(`Faster, cheaper machine-made signs caused the painting trade to almost disappear.`),
          wrong(`Shop owners in Port Alder could not find anyone to paint signs.`, 'confuses-cause-effect'),
        ], `Paragraph 2 says machines made signs "quickly and cheaply," so owners chose them and painters retired. The lack of new painters was a result of this change, not its cause.`),
        q(23, 'medium', `How does the example of Lucia Fernhill's bakery develop the central idea?`, [
          wrong(`It shows that bakeries were the first shops to use painted signs a century ago.`, 'misreads-detail'),
          wrong(`It proves that painted signs always double a shop's number of customers.`, 'overgeneralization'),
          wrong(`It explains how Fernhill learned to paint her own window in an evening class.`, 'unsupported-inference'),
          right(`It illustrates one reason the trade is returning: a painted sign helps a shop stand out.`),
        ], `Paragraph 3 says owners "want their shops to stand out," and Fernhill's customers stop to photograph her window and then come in. The passage gives no numbers, so "always double" is not supported.`),
        q(24, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Hand-painted signs once filled Port Alder but faded when machines made signs cheaply. They are returning as owners seek distinctive shops and a veteran painter trains new artists, though cost keeps the trade small.`),
          wrong(`Port Alder is a beautiful city whose painted signs are far more charming than the boring printed signs found in other places.`, 'includes-opinion'),
          wrong(`Students in Ingrid Matsuda's class practice basic strokes for weeks and learn to mix paint and space letters properly.`, 'too-narrow'),
          wrong(`Machines made sign painting impossible, so Port Alder passed a law requiring every new sign to be painted by hand.`, 'unsupported-inference'),
        ], `The first choice covers the past, the decline, the two causes of the return and the limit. The fourth choice invents a law that the passage never mentions.`),
        q(25, 'hard', `How does the final paragraph shape the reader's understanding of the central idea?`, [
          wrong(`It shows that the revival has failed because painted signs are too expensive.`, 'overstates-limits'),
          right(`It balances the revival with its limits, then explains why the signs still matter to residents.`),
          wrong(`It introduces a new topic about the high cost of running a small business.`, 'misreads-structure'),
          wrong(`It predicts that printed signs will completely disappear within a few years.`, 'unsupported-inference'),
        ], `The paragraph admits the trade "remains small" and costly, then turns with "Yet" to the sixty signs and what they mean to residents. Calling the revival a failure ignores that turn.`),
      ],
    },
    {
      code: 'rg9-main-idea-summary-p06',
      title: 'Why Bread Rises',
      body: `A lump of bread dough can double in size while it sits on a kitchen counter. Nothing is added to it during that time, yet it grows soft and puffy. The change is the work of yeast, a tiny living fungus, and of a protein network that forms when flour and water are mixed.\n\nYeast feeds on sugars in the dough. Some of these sugars come from the flour itself, which contains starch that breaks down into simpler sugars when it gets wet. As the yeast feeds, it releases carbon dioxide gas. The gas forms tiny bubbles throughout the dough. On its own, however, the gas would simply escape into the air.\n\nThat is where the protein network comes in. When flour is mixed with water and kneaded, two proteins in the flour join to form gluten, a stretchy web of strands. Gluten acts like the rubber of a balloon. It stretches around each gas bubble and traps it inside, so the whole dough expands. Bakers knead dough for several minutes because the pushing and folding make the gluten stronger.\n\nTemperature affects how quickly all of this happens. Yeast is most active in a warm place, which is why recipes often say to let dough rise somewhere cozy. If the dough is too cold, the yeast works slowly. If it gets too hot, the yeast dies. When the risen loaf goes into the oven, the heat makes the bubbles expand one last time, then sets the gluten and starch into a firm structure.\n\nIn a fictional study, students at Halvorsen Middle School baked loaves from the same recipe but let them rise at different temperatures. The loaves kept in a warm room rose highest, while the ones kept in a cool hallway stayed small and dense. The experiment showed that a good loaf depends on both living yeast and the conditions that let it work.`,
      items: [
        q(26, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Bakers should always knead dough for several minutes before baking it.`, 'too-narrow'),
          wrong(`Students at Halvorsen Middle School baked loaves at different temperatures.`, 'too-narrow'),
          right(`Bread rises because yeast makes gas that a stretchy gluten network traps, and warmth controls how well this works.`),
          wrong(`Yeast is a harmful fungus that must be removed from flour before baking.`, 'contradicts-text'),
        ], `The passage explains the yeast, the gluten and the role of temperature, which the third choice combines. Kneading and the student study are supporting details, not the whole idea.`),
        q(27, 'medium', `What is the main purpose of the third paragraph?`, [
          wrong(`To explain where the sugars that yeast feeds on come from.`, 'misreads-structure'),
          right(`To explain how gluten traps the gas so the dough can expand.`),
          wrong(`To compare bread dough to the rubber used in toy balloons.`, 'too-narrow'),
          wrong(`To warn bakers that too much heat will kill the yeast.`, 'misreads-structure'),
        ], `Paragraph 3 begins "That is where the protein network comes in" and explains how gluten "traps" the bubbles. The balloon is only a comparison used to make that point.`),
        q(28, 'medium', `How does the comparison to a balloon help develop the central idea?`, [
          wrong(`It shows that bread dough is made partly from rubber.`, 'literal-reading'),
          wrong(`It suggests that dough will pop if it rises for too long.`, 'unsupported-inference'),
          wrong(`It explains why yeast needs a warm place in order to work.`, 'misreads-relationship'),
          right(`It helps readers picture how gluten stretches and holds in gas.`),
        ], `Gluten "acts like the rubber of a balloon" because it "stretches around each gas bubble and traps it." The comparison is a picture, not a claim that dough contains rubber.`),
        q(29, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Baking bread is easy and fun, and everyone should try making a loaf at home this weekend.`, 'includes-opinion'),
          wrong(`Gluten forms when two proteins join during kneading, and it stretches like the rubber of a balloon.`, 'too-narrow'),
          right(`Yeast feeds on sugars in dough and gives off gas, which stretchy gluten traps so the dough rises. Warmth speeds the yeast, and a student test showed warm dough rose highest.`),
          wrong(`Bread rises in the oven because heat creates gas bubbles from the starch in the flour.`, 'confuses-cause-effect'),
        ], `The third choice covers yeast, gluten, temperature and the study without opinions. The fourth choice wrongly says starch makes the gas in the oven, when the passage says yeast makes it as it feeds.`),
        q(30, 'hard', `How does the student study in the last paragraph contribute to the passage as a whole?`, [
          right(`It gives evidence that confirms the earlier explanation of how temperature affects yeast.`),
          wrong(`It introduces a new idea that gluten matters more than yeast in bread.`, 'misreads-structure'),
          wrong(`It shows that the explanation in the fourth paragraph was mistaken.`, 'contradicts-text'),
          wrong(`It proves that bread can only be baked in a warm kitchen.`, 'overgeneralization'),
        ], `Paragraph 4 says yeast works slowly in the cold, and the study's cool loaves "stayed small and dense," confirming it. The study supports the earlier explanation rather than overturning it.`),
      ],
    },
    {
      code: 'rg9-main-idea-summary-p07',
      title: 'How Salmon Find Their Way Home',
      body: `Many salmon begin life in a small stream, swim downstream to the ocean and spend years traveling hundreds or even thousands of miles. Then, when they are ready to lay eggs, most of them return to the very stream where they hatched. For a long time, people wondered how a fish could find such a small place after such a long journey.\n\nScientists now believe that smell plays a central role. Every stream has its own mix of chemicals from the rocks, soil and plants along its banks. When young salmon are living in their home stream, they seem to memorize this scent. Years later, as adults near the coast, they follow that remembered smell upstream, choosing the right branch at each fork in the river.\n\nSmell probably does not explain the ocean part of the journey, however. Far out at sea, a stream's scent is far too weak to follow. Researchers think salmon may use the Earth's magnetic field to find the general direction of their home coast. Once they reach the right river mouth, smell guides them the rest of the way.\n\nIn the fictional Copperline River, biologist Nadia Ferreira tested the smell idea. Her team raised young salmon in hatchery water mixed with a harmless chemical that has a distinct scent. Before the fish were released, a few drops of the same chemical were added to a small side stream. Years later, many of the returning adults swam into that side stream, even though they had never lived there.\n\nUnderstanding this homing ability matters for the salmon's future. Dams and pollution can change a stream's water or block the path upstream. Ferreira's results suggest that protecting the natural scent of each stream may be as important as keeping the river open.`,
      items: [
        q(31, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Salmon spend several years traveling through the ocean before they lay eggs.`, 'too-narrow'),
          wrong(`Dams are the only reason that salmon fail to return to their home streams.`, 'overgeneralization'),
          wrong(`Salmon find their home streams mainly by watching for familiar rocks and plants.`, 'misreads-detail'),
          right(`Salmon likely find their birth streams by memorizing their scent, with other senses guiding them at sea, and this knowledge can help protect them.`),
        ], `The passage explains the role of smell, the likely role of magnetism at sea, an experiment and why it matters. Rocks and plants matter only because they give each stream its scent, not because salmon see them.`),
        q(32, 'medium', `How does the third paragraph refine the explanation given in the second paragraph?`, [
          wrong(`It shows that smell plays no part at all in how salmon find their way.`, 'overstates-limits'),
          right(`It shows that smell guides salmon near home, but another sense likely guides them at sea.`),
          wrong(`It explains that salmon memorize the scent of the ocean as well as their stream.`, 'unsupported-inference'),
          wrong(`It describes how salmon choose the right branch at each fork in the river.`, 'misreads-structure'),
        ], `Paragraph 3 says smell "probably does not explain the ocean part," suggests the magnetic field for that part and says smell guides them "the rest of the way." So it limits the role of smell rather than rejecting it.`),
        q(33, 'medium', `How does Nadia Ferreira's experiment develop the central idea?`, [
          right(`It supports the smell idea, since salmon raised with a scent later returned to a stream with that scent.`),
          wrong(`It proves that salmon use the Earth's magnetic field to find their home coast.`, 'misreads-relationship'),
          wrong(`It shows that hatchery salmon cannot survive once they are released into rivers.`, 'contradicts-text'),
          wrong(`It shows that salmon prefer side streams to main rivers when they lay eggs.`, 'overgeneralization'),
        ], `Many adults "swam into that side stream, even though they had never lived there," because it carried the scent they grew up with. The experiment tested smell, not magnetism.`),
        q(34, 'hard', `Which is the best objective summary of the passage?`, [
          wrong(`Salmon are the smartest fish in the ocean, and it is amazing that they can remember their home after so many years away.`, 'includes-opinion'),
          wrong(`Ferreira raised salmon in scented water, added the same scent to a side stream and found that many adults later swam into it.`, 'too-narrow'),
          right(`Most salmon return to the streams where they hatched. They likely use magnetism at sea and a memorized stream scent near home, as an experiment supports, so protecting stream scents may help them.`),
          wrong(`Salmon smell their home stream from the open ocean and follow it all the way back, so dams do not affect them.`, 'contradicts-text'),
        ], `The third choice covers the homing behavior, both guiding senses, the experiment and the conservation point. The second choice is accurate but describes only the experiment.`),
        q(35, 'hard', `Why does the author end the passage with a paragraph about dams and pollution?`, [
          wrong(`To argue that all dams on salmon rivers should be removed immediately.`, 'overgeneralization'),
          wrong(`To change the topic from salmon to the problem of river pollution in general.`, 'misreads-structure'),
          wrong(`To prove that Ferreira's experiment was harmful to the river's water.`, 'unsupported-inference'),
          right(`To show why understanding how salmon use smell matters for protecting them.`),
        ], `The paragraph opens "Understanding this homing ability matters" and connects it to protecting "the natural scent of each stream." It does not call for removing every dam.`),
      ],
    },
    {
      code: 'rg9-main-idea-summary-p08',
      title: 'Every Student Should Learn to Speak Up',
      body: `At Thornbury High School, students study algebra, chemistry and history, but most of them will graduate without ever practicing one of the most useful skills of all: speaking clearly in front of a group. I believe every high school, including ours, should require a semester course in public speaking.\n\nThe first reason is that nearly everyone will need this skill. Students give presentations in college classes. Adults explain ideas at job interviews, at work meetings and at neighborhood gatherings. Yet many people feel so nervous about speaking that they avoid it entirely. A course would give students a safe place to practice while the stakes are still low.\n\nSecond, public speaking can be taught. Some people assume that good speakers are simply born confident, but that is not the whole story. Speaking well involves skills that improve with practice, such as organizing ideas, making eye contact and slowing down when nerves take over. Last spring, our school's debate club ran a six-week workshop for thirty ninth graders. In a survey before the workshop, only nine said they felt comfortable speaking to a class. Afterward, twenty-two did.\n\nSome people argue that the schedule is already too full and that students can learn to speak through regular class presentations. Those presentations help, but they are graded mostly on content, and students rarely receive advice on how they spoke. A dedicated course would focus on the speaking itself.\n\nA required course would not turn every student into a star speaker, and it does not need to. Its goal would be to help each student feel ready to share an idea out loud. That readiness would serve them in every class they take and every job they hold. Thornbury should add the course to next year's schedule.`,
      items: [
        q(36, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Thornbury's debate club ran a six-week workshop for thirty ninth graders last spring.`, 'too-narrow'),
          right(`High schools should require a public speaking course because the skill is widely needed and can be taught.`),
          wrong(`Students should stop giving presentations in their regular classes.`, 'contradicts-text'),
          wrong(`Good speakers are born confident, so schools cannot really teach speaking.`, 'contradicts-text'),
        ], `The writer states the claim in paragraph 1 and supports it with two reasons, which the second choice combines. The workshop is evidence for one reason, so it is too narrow.`),
        q(37, 'medium', `What is the main idea of the third paragraph?`, [
          wrong(`Most ninth graders at Thornbury already feel comfortable speaking to a class.`, 'misreads-detail'),
          wrong(`Making eye contact is the most important part of public speaking.`, 'too-narrow'),
          right(`Speaking well is a set of skills that students can improve with practice.`),
          wrong(`The debate club should replace regular classes with speaking workshops.`, 'unsupported-inference'),
        ], `The paragraph opens "Second, public speaking can be taught" and supports it with skills and survey results. Only nine of thirty felt comfortable before the workshop, so the first choice misreads the data.`),
        q(38, 'medium', `How does the fourth paragraph help develop the writer's central idea?`, [
          wrong(`It admits that regular presentations are enough, which weakens the main claim.`, 'misreads-relationship'),
          wrong(`It introduces a new argument that class schedules should be made shorter.`, 'misreads-structure'),
          wrong(`It shows that teachers give students too much advice on their speaking.`, 'contradicts-text'),
          right(`It answers an objection by explaining why regular presentations do not replace a course.`),
        ], `The writer presents the view that presentations are enough, then replies that they are "graded mostly on content" with little advice on speaking. The paragraph rejects the objection rather than accepting it.`),
        q(39, 'hard', `Which is the best objective summary of the passage?`, [
          wrong(`The writer wants Thornbury to add a course because nervous students are wasting their time in boring classes like algebra and chemistry.`, 'includes-opinion'),
          right(`The writer argues that schools should require public speaking because the skill is widely needed and can be taught, citing a workshop survey and replying that regular presentations are not enough.`),
          wrong(`Public speaking is the most important subject in school, and anyone who disagrees has never had to give a presentation at work.`, 'includes-opinion'),
          wrong(`A debate club workshop raised the number of comfortable speakers from nine to twenty-two out of thirty ninth graders.`, 'too-narrow'),
        ], `The second choice reports the writer's claim, reasons, evidence and counterargument without judging them. The first choice adds the idea that algebra and chemistry are boring, which the writer never says.`),
        q(40, 'hard', `How does the final paragraph refine the writer's central claim?`, [
          right(`It narrows the course's goal to helping every student feel ready to speak, not making everyone a star.`),
          wrong(`It admits that the course would probably fail to help most students speak better.`, 'overstates-limits'),
          wrong(`It shifts the argument from speaking skills to the need for more job training.`, 'misreads-structure'),
          wrong(`It claims that the course would make every student an excellent public speaker.`, 'contradicts-text'),
        ], `The writer says the course "would not turn every student into a star speaker" and that its goal is readiness to "share an idea out loud." This sets a realistic goal; it does not predict failure.`),
      ],
    },
  ],
}

export default skill
