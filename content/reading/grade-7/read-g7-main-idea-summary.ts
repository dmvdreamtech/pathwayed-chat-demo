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
  slug: 'read-g7-main-idea-summary',
  subject: 'reading',
  grade: 7,
  group: 'Informational text',
  name: 'Main Idea and Summary',
  standards: ['RI.7.2'],
  passages: [
    {
      code: 'rg7-main-idea-summary-p01',
      title: 'The Hidden Workers in a Compost Pile',
      body: `A backyard compost pile can look like a heap of trash, but inside it a busy community of living things is hard at work. Composting is the process of breaking down food scraps, leaves and other once-living material into a dark, crumbly substance that helps plants grow. Understanding how it works can help anyone turn waste into something useful.\n\nThe real workers in a compost pile are tiny. Bacteria and fungi feed on the scraps and break them into simpler materials. Larger creatures such as earthworms, beetles and pill bugs tear the material into smaller pieces, which gives the microbes more surface to work on.\n\nThese organisms need the right conditions to do their job. They need a mix of "greens," such as fruit peels and grass clippings, and "browns," such as dry leaves and shredded paper. Greens supply nitrogen, while browns supply carbon. The pile also needs air and moisture. A gardener who turns the pile with a shovel every week or so lets in fresh oxygen. A pile that feels like a damp sponge has about the right amount of water.\n\nWhen conditions are good, the center of the pile heats up. The microbes release heat as they work, and a healthy pile can become warm enough to steam on a cool morning. This heat speeds up the process and kills many weed seeds.\n\nAfter a few months, the scraps are gone and the finished compost smells like soil. Gardeners mix it into flower beds and vegetable gardens to add nutrients and help the ground hold water. In this way, composting keeps material out of landfills and returns it to the earth.`,
      items: [
        q(1, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Earthworms and beetles are the most important creatures found in a backyard garden.`, 'too-narrow'),
          right(`Tiny living things break down scraps into rich soil when they have the right conditions.`),
          wrong(`Every family should start a compost pile instead of throwing away its food scraps.`, 'unsupported-inference'),
          wrong(`A compost pile becomes warm enough to steam on a cool morning when it is healthy.`, 'too-narrow'),
        ], `The passage explains who does the work in a compost pile, what conditions they need and what the finished compost is used for, which the second choice covers. The steam detail is true but comes from only one paragraph.`),
        q(2, 'easy', `Which detail best supports the idea that compost piles need air?`, [
          wrong(`Greens such as fruit peels and grass clippings supply nitrogen.`, 'wrong-supporting-detail'),
          wrong(`A pile that feels like a damp sponge has the right amount of water.`, 'wrong-supporting-detail'),
          right(`Turning the pile with a shovel every week or so lets in fresh oxygen.`),
          wrong(`Gardeners mix finished compost into flower beds and vegetable gardens.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 says turning the pile "lets in fresh oxygen," which is about air. The damp sponge detail is about the right conditions too, but it describes moisture, not air.`),
        q(3, 'medium', `How does the third paragraph develop the central idea?`, [
          wrong(`It describes the creatures that break down food scraps and leaves.`, 'misreads-structure'),
          wrong(`It explains why finished compost is useful in vegetable gardens.`, 'misreads-structure'),
          wrong(`It argues that gardeners should never add paper to a compost pile.`, 'contradicts-text'),
          right(`It explains the mix of materials, air and water the workers need.`),
        ], `Paragraph 3 begins "These organisms need the right conditions" and then lists greens and browns, air and moisture. The creatures themselves are described in paragraph 2, not paragraph 3.`),
        q(4, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Bacteria, fungi and small creatures break down scraps in a compost pile. With a mix of materials, air and water, the pile heats up and becomes soil that helps gardens grow.`),
          wrong(`Composting is the smartest thing a family can do for the planet. Anyone who throws food in the trash is being wasteful and should start a compost pile right away.`, 'includes-opinion'),
          wrong(`Greens such as fruit peels supply nitrogen, and browns such as dry leaves supply carbon. A gardener needs to add both kinds of material to a compost pile.`, 'too-narrow'),
          wrong(`A compost pile can look like a heap of trash. Earthworms and beetles live in it, and on cool mornings the pile sometimes gives off steam into the air.`, 'lists-minor-details'),
        ], `The first choice covers the workers, the conditions and the result without adding opinions. The second choice adds judgments such as "smartest" and "wasteful" that the passage never states.`),
        q(5, 'hard', `Which sentence would NOT belong in an objective summary of the passage?`, [
          wrong(`Microbes give off heat as they work, which speeds up the composting process.`, 'misidentifies-key-idea'),
          wrong(`Finished compost adds nutrients to soil and helps the ground hold water.`, 'misidentifies-key-idea'),
          right(`Composting is a fun hobby that makes gardening far more enjoyable for kids.`),
          wrong(`Bacteria and fungi break food scraps and leaves into simpler materials.`, 'misidentifies-key-idea'),
        ], `An objective summary leaves out personal opinions, and calling composting "a fun hobby" is a judgment the passage never makes. The other three choices restate key ideas from paragraphs 2, 4 and 5.`),
      ],
    },
    {
      code: 'rg7-main-idea-summary-p02',
      title: 'Lighting the Streets by Hand',
      body: `Long before electric streetlights, many cities depended on workers called lamplighters to keep their streets bright after dark. Their job was simple to describe but demanding to do, and for many years it shaped the rhythm of city life.\n\nIn the early 1800s, many large cities began installing gas lamps along their main streets. Each lamp sat on top of a tall iron post and burned gas that flowed through pipes under the road. The lamps did not turn on by themselves. Every evening near sunset, a lamplighter walked a set route, carrying a long pole with a small flame or a hook at the end. The worker reached up, opened the valve and lit the lamp, then moved quickly to the next post.\n\nThe work did not end at night. In the morning, lamplighters returned to turn each lamp off. They also cleaned the glass panes, which became coated with soot, and reported broken lamps so they could be repaired. A single worker might be responsible for dozens of lamps, in rain, snow and summer heat.\n\nLit streets changed how people lived. Shops could stay open later, and families felt more comfortable walking home after dark. Many residents came to know their local lamplighter by sight, since the same worker passed the same houses at the same time every day.\n\nBy the early 1900s, electric lights began to replace gas lamps in many places. Electric lamps could be switched on from a central station, so cities no longer needed workers to visit each post. The job slowly disappeared. Today, a few towns keep gas lamps on historic streets as a reminder of the workers who once lit the way.`,
      items: [
        q(6, 'easy', `What is the central idea of the passage?`, [
          wrong(`Gas lamps burned fuel that flowed through pipes buried under city roads.`, 'too-narrow'),
          wrong(`Electric lights are much safer and brighter than gas lamps ever were.`, 'unsupported-inference'),
          right(`Lamplighters did important daily work that shaped city life until electric lights replaced them.`),
          wrong(`Shops in the 1800s stayed open later than shops do in most towns today.`, 'unsupported-inference'),
        ], `The passage follows lamplighters from the start of gas lamps, through their daily duties and effects on city life, to the end of the job. The pipe detail is accurate but explains only how one part of a lamp worked.`),
        q(7, 'easy', `Which detail best supports the idea that the job was demanding?`, [
          right(`A single worker might care for dozens of lamps in rain, snow and summer heat.`),
          wrong(`Each lamp sat on top of a tall iron post along one of the main streets.`, 'wrong-supporting-detail'),
          wrong(`Electric lamps could be switched on from a central station instead.`, 'wrong-supporting-detail'),
          wrong(`A few towns keep gas lamps on historic streets as a reminder today.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 shows how hard the work was: many lamps, every day, in any weather. The iron post detail describes the lamps, not the difficulty of the job.`),
        q(8, 'medium', `How does the fourth paragraph contribute to the central idea?`, [
          wrong(`It explains the steps a lamplighter followed to light each lamp.`, 'misreads-structure'),
          right(`It shows that the lamplighters' work changed daily life in cities.`),
          wrong(`It describes how electric lights finally replaced the gas lamps.`, 'misreads-structure'),
          wrong(`It argues that cities should bring back gas lamps on every street.`, 'unsupported-inference'),
        ], `Paragraph 4 begins "Lit streets changed how people lived" and gives examples about shops and families walking home. The steps for lighting a lamp come earlier, in paragraph 2.`),
        q(9, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Lamplighters had one of the hardest and most admirable jobs in history. It is sad that electric lights put these hardworking people out of work.`, 'includes-opinion'),
          wrong(`Lamplighters carried long poles with a flame or hook at the end. In the morning they cleaned soot off the glass and reported any broken lamps.`, 'too-narrow'),
          right(`In the 1800s, lamplighters lit and cared for gas streetlamps every day, which let city life continue after dark. Electric lights later made the job unnecessary.`),
          wrong(`Gas lamps were installed in the 1800s and replaced in the 1900s. Today, a few towns still keep gas lamps on their historic streets for visitors.`, 'omits-central-idea'),
        ], `The third choice includes the job, its effect on cities and its end, with no opinions. The first choice adds judgments like "most admirable" and "sad," which an objective summary leaves out.`),
        q(10, 'hard', `Which idea from the first paragraph is developed most fully across the rest of the passage?`, [
          wrong(`Electric streetlights were invented to save cities a great deal of money.`, 'unsupported-inference'),
          wrong(`Gas lamps gave off a softer, warmer light than modern electric lamps.`, 'unsupported-inference'),
          wrong(`Lamplighters were the best known and most respected workers in a city.`, 'overgeneralization'),
          right(`The lamplighter's job was simple to describe but demanding, and it shaped city life.`),
        ], `Paragraphs 2 and 3 show the simple but demanding routine, and paragraph 4 shows how it shaped city life, so the opening claim is developed throughout. The idea about respect overstates paragraph 4, which says only that residents knew their lamplighter by sight.`),
      ],
    },
    {
      code: 'rg7-main-idea-summary-p03',
      title: 'Borrowing a Drill Like a Book',
      body: `When Rosa Delgado needed a ladder to clean her gutters, she did not buy one. She borrowed it from the Millbrook Tool Library, a small shop on Elm Street where residents check out tools the way they check out books.\n\nThe tool library opened four years ago in an empty storefront. A group of neighbors noticed that many families owned expensive tools they used only once or twice a year, while other families could not afford them at all. They asked people to donate tools they rarely used. Within a few months, the shelves held drills, rakes, saws, pressure washers and even a cider press.\n\nBorrowing works much like a regular library. Members sign up with a library card, pay a small yearly fee and can take home up to three tools for one week. Volunteers check each tool when it comes back, sharpen blades and replace worn parts.\n\nThe program also teaches skills. On Saturday mornings, volunteers such as Kwame Asante, a retired carpenter, lead free workshops on fixing a leaky faucet or building a simple bookshelf. Many members say these classes gave them the confidence to tackle repairs they once paid others to do.\n\nThe tool library has helped Millbrook in other ways, too. Sharing tools means fewer items are bought, stored and eventually thrown away. Neighbors who meet at workshops often end up helping one another with projects. Last spring, a group of members used borrowed tools to rebuild the benches at Riverside Park.\n\nOther towns have started to notice. Organizers from two nearby communities visited this fall to learn how Millbrook set up its program. For a town that started with a few donated rakes, the tool library has become a model of how sharing can save money and bring people together.`,
      items: [
        q(11, 'easy', `Which statement best expresses the central idea of the article?`, [
          right(`Millbrook's tool library saves residents money, teaches skills and brings neighbors together.`),
          wrong(`Rosa Delgado borrowed a ladder from the tool library to clean her house's gutters.`, 'too-narrow'),
          wrong(`Every town in the country should open a tool library in an empty storefront.`, 'overgeneralization'),
          wrong(`Retired carpenters are the best teachers for people who want to learn repairs.`, 'unsupported-inference'),
        ], `The article describes how the tool library works and the many ways it helps the town, as the last sentence sums up. Rosa's ladder is only the opening example.`),
        q(12, 'easy', `Which detail best supports the idea that the tool library teaches skills?`, [
          wrong(`Members can take home up to three tools for one week at a time.`, 'wrong-supporting-detail'),
          right(`Volunteers lead free workshops on fixing faucets and building shelves.`),
          wrong(`The shelves held drills, rakes, saws and even a cider press.`, 'wrong-supporting-detail'),
          wrong(`Organizers from two nearby towns visited to learn about the program.`, 'wrong-supporting-detail'),
        ], `Paragraph 4 says volunteers lead workshops on repairs, which is direct support for teaching skills. The borrowing rule explains how lending works, not how people learn.`),
        q(13, 'medium', `Why does the author begin the article with Rosa Delgado's ladder?`, [
          wrong(`To show that most people in Millbrook do not own ladders of their own`, 'overgeneralization'),
          wrong(`To prove that borrowing a tool is always cheaper than buying one`, 'unsupported-inference'),
          right(`To give a familiar example that introduces how the tool library works`),
          wrong(`To explain that the tool library was started by Rosa Delgado herself`, 'contradicts-text'),
        ], `Rosa's ladder is a quick, everyday example that leads into the description of the tool library. Paragraph 2 says a group of neighbors started it, so Rosa did not found it.`),
        q(14, 'medium', `Which is the best objective summary of the article?`, [
          wrong(`The Millbrook Tool Library is on Elm Street. It has drills, rakes and a cider press, and members can borrow three tools for a week.`, 'too-narrow'),
          wrong(`The Millbrook Tool Library is a wonderful idea that everyone should support. Buying tools is a waste of money when people can simply share them.`, 'includes-opinion'),
          wrong(`Kwame Asante is a retired carpenter who teaches workshops. He shows people how to fix a leaky faucet and build a bookshelf on Saturdays.`, 'too-narrow'),
          right(`Neighbors in Millbrook started a library that lends donated tools. It also offers free repair classes, reduces waste and brings people together, and other towns are studying it.`),
        ], `The last choice covers how the library began, what it offers and its effects, without opinions. The first choice is accurate but leaves out the classes and the benefits to the town.`),
        q(15, 'hard', `How do paragraphs 4 and 5 develop the central idea beyond the basic idea of lending tools?`, [
          right(`They show that the program also builds skills, reduces waste and strengthens friendships.`),
          wrong(`They explain the rules members must follow when they bring borrowed tools back.`, 'misreads-structure'),
          wrong(`They describe the problems the tool library faced when it first opened its doors.`, 'unsupported-inference'),
          wrong(`They compare the Millbrook program with programs in two other nearby towns.`, 'misreads-structure'),
        ], `Paragraph 4 is about workshops and paragraph 5 is about less waste and neighbors helping one another, which goes beyond simply lending tools. The return rules appear in paragraph 3, not in paragraphs 4 and 5.`),
      ],
    },
    {
      code: 'rg7-main-idea-summary-p04',
      title: 'Nature\'s Engineers',
      body: `Few animals change their surroundings as much as the beaver. By building dams across streams, beavers create ponds and wetlands that affect hundreds of other living things.\n\nA beaver builds a dam to protect itself. Beavers are slow on land but strong swimmers, so they feel safest in deep water. They cut down small trees with their sharp front teeth, drag branches into a stream and pack them with mud and stones. As the dam grows, water backs up behind it and forms a pond. In the middle, the beavers build a lodge with underwater entrances that predators cannot easily reach.\n\nThe new pond quickly becomes a home for other animals. Frogs and salamanders lay eggs in the calm water. Ducks and herons hunt for food along the edges. Fish find shelter among the sunken branches, and insects such as dragonflies multiply in the shallows.\n\nBeaver ponds also help the land around them. Because the dam slows the stream, water soaks into the ground instead of rushing away. This keeps nearby soil moist during dry summers and can reduce flooding downstream after heavy rain. Mud settles to the bottom of the pond, so the water that flows past the dam is often cleaner.\n\nBeavers do cause problems at times. Their dams can flood roads or farm fields, and they may cut down trees that people want to keep. Some communities now install pipes through dams to control water levels instead of removing the beavers. Scientists who study wetlands often describe beavers as nature's engineers, because their work shapes an entire ecosystem.`,
      items: [
        q(16, 'easy', `What is the central idea of the passage?`, [
          wrong(`Beavers cut down small trees with their sharp front teeth.`, 'too-narrow'),
          wrong(`Beavers are pests that should be removed from farm areas.`, 'contradicts-text'),
          wrong(`Frogs and salamanders need calm water to lay their eggs.`, 'too-narrow'),
          right(`Beaver dams create wetlands that shape a whole ecosystem.`),
        ], `The passage explains how beavers build dams and how the resulting ponds affect animals, soil and water. The tree cutting detail describes only one step in building a dam.`),
        q(17, 'easy', `Which detail best supports the idea that beaver ponds help the land around them?`, [
          wrong(`Beavers build lodges with underwater entrances that predators cannot easily reach.`, 'wrong-supporting-detail'),
          right(`Water soaks into the ground and keeps nearby soil moist during dry summers.`),
          wrong(`Ducks and herons hunt for food along the edges of the calm beaver pond.`, 'wrong-supporting-detail'),
          wrong(`Beavers are slow on land, so they feel safest when they are in deep water.`, 'wrong-supporting-detail'),
        ], `Paragraph 4 says the slowed water soaks into the ground and keeps soil moist, which helps the land. The ducks and herons detail shows the pond helping animals, which is a different supporting idea.`),
        q(18, 'medium', `How does the third paragraph develop the central idea?`, [
          right(`It shows that many other animals depend on the ponds that beavers create.`),
          wrong(`It explains why beavers build their dams in the first place.`, 'misreads-structure'),
          wrong(`It describes the problems beaver dams can cause for people.`, 'misreads-structure'),
          wrong(`It argues that frogs and fish need beavers in order to survive.`, 'overgeneralization'),
        ], `Paragraph 3 lists frogs, salamanders, ducks, herons, fish and insects that use the pond. It does not say these animals cannot survive without beavers, so the last choice goes too far.`),
        q(19, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Beavers are slow on land but strong swimmers. They build lodges in the middle of their ponds, and the lodges have underwater entrances that keep predators away.`, 'too-narrow'),
          wrong(`Beavers are amazing animals, and people should never complain about them. Flooded roads are a small price to pay for all the good that beavers do.`, 'includes-opinion'),
          right(`Beavers build dams that turn streams into ponds. These ponds shelter many animals, keep soil moist, reduce flooding and clean water, though dams can sometimes cause problems for people.`),
          wrong(`Beavers cause floods on roads and farm fields and cut down trees people want. Because of this, most communities now remove beavers from their land.`, 'contradicts-text'),
        ], `The third choice covers the dams, the benefits and the problems without adding opinions. The last choice contradicts paragraph 5, which says some communities install pipes instead of removing beavers.`),
        q(20, 'hard', `How does the final paragraph affect the development of the central idea?`, [
          wrong(`It shifts the passage's focus away from beavers to the work of wetland scientists.`, 'misreads-structure'),
          wrong(`It proves that the benefits described earlier are not as important as they seemed.`, 'contradicts-text'),
          right(`It admits beavers cause problems but ends by showing their work shapes an ecosystem.`),
          wrong(`It introduces the idea that beavers protect themselves by living in deep water.`, 'misreads-structure'),
        ], `Paragraph 5 notes flooding and tree loss but then explains a solution and calls beavers "nature's engineers," which returns to the central idea. Nothing in it says the earlier benefits matter less.`),
      ],
    },
    {
      code: 'rg7-main-idea-summary-p05',
      title: 'The Secret Training Tool',
      body: `Young athletes often think that getting better means practicing harder and longer. Practice matters, but sports scientists have found that rest, especially sleep, is just as important for improving performance.\n\nDuring deep sleep, the body repairs itself. Hard exercise causes tiny tears in muscle fibers. While an athlete sleeps, the body releases a substance called growth hormone, which helps rebuild those fibers so they come back stronger. Without enough sleep, this repair work is cut short, and muscles stay sore and tired.\n\nSleep also helps the brain learn new skills. When a basketball player practices a new shot or a swimmer works on a turn, the brain stores information about those movements. Researchers have found that the brain replays and strengthens this information during sleep. In several studies, people who slept after learning a physical task performed it more smoothly the next day than people who stayed awake.\n\nTired athletes make more mistakes. Lack of sleep slows reaction time, so a goalie may move a split second too late. It also makes it harder to focus and to make quick decisions. Some studies suggest that athletes who sleep too little are more likely to get injured.\n\nExperts recommend that teenagers get eight to ten hours of sleep each night. That can be hard with homework, early school start times and evening games. Coaches suggest a few simple habits: going to bed at the same time each night, putting screens away an hour before bed and keeping the bedroom cool and dark. An athlete who protects sleep is giving the body a chance to turn hard work into real progress.`,
      items: [
        q(21, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Young athletes should practice longer each day if they want to improve.`, 'contradicts-text'),
          wrong(`Goalies need fast reaction times to stop shots during a soccer game.`, 'too-narrow'),
          right(`Sleep is as important as practice because it helps athletes improve.`),
          wrong(`Teenagers should never use screens in the hour before they go to bed.`, 'too-narrow'),
        ], `The first paragraph states that sleep is "just as important" as practice, and each later paragraph explains a way sleep helps. The screens detail is one tip from the last paragraph, not the main point.`),
        q(22, 'medium', `Which two supporting ideas does the author use to explain why sleep improves performance?`, [
          right(`Sleep repairs muscles, and it helps the brain store new movements.`),
          wrong(`Sleep keeps the bedroom cool, and it reduces the need for homework.`, 'misreads-details'),
          wrong(`Sleep makes practice shorter, and it lets games start in the evening.`, 'unsupported-inference'),
          wrong(`Sleep replaces exercise, and it lets the body skip warming up.`, 'contradicts-text'),
        ], `Paragraph 2 explains muscle repair and paragraph 3 explains how the brain strengthens skills during sleep. The passage never says sleep replaces exercise; it says practice still matters.`),
        q(23, 'medium', `How does the fourth paragraph develop the central idea?`, [
          wrong(`It explains how the body rebuilds muscle fibers while an athlete sleeps.`, 'misreads-structure'),
          wrong(`It gives coaches' advice for building better habits before bedtime.`, 'misreads-structure'),
          wrong(`It argues that goalies need more sleep than players in other positions.`, 'unsupported-inference'),
          right(`It shows what goes wrong for athletes who do not get enough sleep.`),
        ], `Paragraph 4 describes slower reactions, poor focus and more injuries in tired athletes, showing the cost of missing sleep. The goalie is just one example, not a claim about goalies needing more sleep.`),
        q(24, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Teenagers should get eight to ten hours of sleep. Homework, early school start times and evening games can make getting enough sleep difficult.`, 'too-narrow'),
          right(`Sleep helps athletes improve because it repairs muscles and strengthens new skills, while too little sleep leads to mistakes and injuries. Simple habits can help teens rest.`),
          wrong(`Athletes who stay up late are making a foolish choice. Coaches should bench any player who does not get at least eight hours of sleep each night.`, 'includes-opinion'),
          wrong(`During deep sleep, the body releases growth hormone. This hormone helps rebuild tiny tears in the muscle fibers so that they come back stronger.`, 'too-narrow'),
        ], `The second choice includes the benefits of sleep, the costs of missing it and the habits that help, without opinions. The first choice is accurate but leaves out why sleep matters at all.`),
        q(25, 'hard', `How does the last sentence of the passage relate to the central idea?`, [
          wrong(`It introduces a new idea that hard work matters more than sleep does.`, 'contradicts-text'),
          right(`It restates the central idea by linking rest to turning practice into progress.`),
          wrong(`It shows that the author believes practice is no longer necessary for athletes.`, 'overgeneralization'),
          wrong(`It adds a statistic that proves how many hours of sleep athletes really need.`, 'misreads-details'),
        ], `The final sentence says sleep lets the body "turn hard work into real progress," which echoes the opening claim that sleep is as important as practice. It does not dismiss practice, since it still calls practice "hard work" that leads to progress.`),
      ],
    },
    {
      code: 'rg7-main-idea-summary-p06',
      title: 'Carving a Picture in Reverse',
      body: `Printmaking lets an artist make many copies of the same picture. One of the most popular methods for beginners is the linoleum block print, which uses a soft, rubbery sheet that can be carved by hand.\n\nThe process starts with a drawing. The artist sketches a design on paper and then transfers it to the block. Because the print will come out as a mirror image, any letters or numbers must be drawn backward. Forgetting this step is one of the most common beginner mistakes.\n\nNext comes carving. Using small tools called gouges, the artist cuts away parts of the block. The carved areas sit lower than the surface, so they will not touch the paper. The raised areas that remain will hold ink and become the dark parts of the picture. This means the artist must think in reverse, carving away whatever should stay white.\n\nWhen the carving is finished, the artist rolls a thin, even layer of ink over the block with a rubber roller called a brayer. A sheet of paper is laid on top and pressed firmly, either with a printing press or by rubbing the back with a wooden spoon. When the paper is peeled away, the image appears.\n\nOne carved block can produce dozens of prints. Artists often experiment by printing on colored paper or using several blocks, one for each color. Each print may look slightly different depending on how much ink was used and how hard the paper was pressed. For many students, this mix of careful planning and happy surprises is what makes printmaking so rewarding.`,
      items: [
        q(26, 'easy', `What is the central idea of the passage?`, [
          wrong(`A brayer is a rubber roller used to spread ink evenly over a block.`, 'too-narrow'),
          wrong(`Printing presses are better tools than wooden spoons for making prints.`, 'unsupported-inference'),
          wrong(`Beginners should avoid using letters or numbers in their designs.`, 'unsupported-inference'),
          right(`Making a linoleum print takes careful, reverse planning but rewards artists.`),
        ], `The passage walks through the steps of making a linoleum print, stresses thinking in reverse and ends by explaining why students find it rewarding. The brayer is only one tool used in one step.`),
        q(27, 'medium', `How is the central idea mainly developed in paragraphs 2 through 4?`, [
          right(`By explaining the steps of the process in the order an artist does them`),
          wrong(`By comparing linoleum prints with paintings and photographs`, 'misreads-structure'),
          wrong(`By telling the life story of one artist who made many prints`, 'misreads-structure'),
          wrong(`By listing reasons why schools should offer printmaking classes`, 'unsupported-inference'),
        ], `Paragraphs 2, 3 and 4 begin with "The process starts," "Next comes" and "When the carving is finished," which mark steps in order. The passage never compares prints with paintings or photographs.`),
        q(28, 'medium', `Which detail best supports the idea that an artist must "think in reverse"?`, [
          wrong(`One carved block can be used to produce dozens of prints.`, 'wrong-supporting-detail'),
          wrong(`The artist presses the paper with a press or a wooden spoon.`, 'wrong-supporting-detail'),
          right(`Letters must be drawn backward because the print is a mirror image.`),
          wrong(`Artists sometimes print on colored paper to experiment.`, 'wrong-supporting-detail'),
        ], `Drawing letters backward so they print correctly is a clear example of reverse thinking from paragraph 2. Pressing with a spoon is part of the process but has nothing to do with reversing the image.`),
        q(29, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Linoleum is a soft, rubbery sheet. Artists cut it with small tools called gouges, and many beginners forget to draw their letters backward on it.`, 'lists-minor-details'),
          wrong(`Printmaking is the most exciting kind of art a student can try. Anyone who enjoys drawing will love it far more than painting or sculpture.`, 'includes-opinion'),
          wrong(`Artists roll ink over a block with a brayer, lay paper on top and press it. When the paper is peeled away, the finished image appears on it.`, 'too-narrow'),
          right(`To make a linoleum print, an artist draws a reversed design, carves away the parts meant to stay white, inks the block and presses paper onto it. One block can make many slightly different prints.`),
        ], `The last choice covers all the main steps and the result without opinions. The third choice is accurate but describes only the printing step and skips drawing and carving.`),
        q(30, 'hard', `Which sentence from the passage best captures how the author wants readers to view printmaking as a whole?`, [
          wrong(`Forgetting this step is one of the most common beginner mistakes.`, 'too-narrow'),
          right(`For many students, this mix of careful planning and happy surprises is what makes printmaking so rewarding.`),
          wrong(`Using small tools called gouges, the artist cuts away parts of the block.`, 'too-narrow'),
          wrong(`When the paper is peeled away, the image appears.`, 'too-narrow'),
        ], `The final sentence pulls together the careful steps and the unexpected variety of prints into one overall view of printmaking. The sentence about beginner mistakes describes only one step of the drawing stage.`),
      ],
    },
    {
      code: 'rg7-main-idea-summary-p07',
      title: 'Fighting Sound with Sound',
      body: `On a noisy bus or airplane, some headphones can make the world seem almost silent. These noise-canceling headphones do not simply block sound. Instead, they use tiny microphones and quick calculations to fight sound with sound.\n\nTo understand how this works, it helps to know what sound is. Sound travels through the air as waves of pressure. Each wave has high points, where the air is squeezed together, and low points, where the air is spread apart. Our ears detect these changes in pressure and send signals to the brain.\n\nNoise-canceling headphones contain small microphones on the outside of each ear cup. These microphones pick up the steady sounds around the listener, such as the hum of an engine. A tiny computer chip inside the headphones then creates a new sound wave that is the exact opposite of the noise. Where the noise wave has a high point, the new wave has a low point.\n\nWhen the two waves meet, they cancel each other out. Scientists call this effect destructive interference. The listener hears much less of the engine, while music or a voice from the headphones comes through clearly.\n\nThe technology has limits. It works best on low, steady sounds like engines and air conditioners. Sudden or changing sounds, such as a dog barking or people talking, are harder to predict, so some of that noise still gets through. For this reason, most of these headphones also use thick, padded ear cups that physically block higher sounds. By combining padding with smart electronics, the headphones give listeners a quieter place to work, rest or enjoy music.`,
      items: [
        q(31, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Sound travels through the air as waves of high and low pressure.`, 'too-narrow'),
          wrong(`Airplanes and buses are among the noisiest places people travel.`, 'unsupported-inference'),
          right(`Noise-canceling headphones reduce noise mainly by making opposite sound waves.`),
          wrong(`Padded ear cups are the most important part of any pair of headphones.`, 'misidentifies-key-idea'),
        ], `The passage explains how the headphones create an opposite wave that cancels noise, plus the limits of this method. The sound wave detail is background that helps explain the main idea, not the main idea itself.`),
        q(32, 'medium', `Why does the author include the second paragraph about what sound is?`, [
          wrong(`To show that human ears are more sensitive than any microphone`, 'unsupported-inference'),
          right(`To give background needed to understand how the cancellation works`),
          wrong(`To explain the main limits of noise-canceling technology`, 'misreads-structure'),
          wrong(`To argue that loud noise can damage a listener's hearing`, 'unsupported-inference'),
        ], `Paragraph 2 explains high and low points in sound waves, which readers need in order to understand the "opposite" wave in paragraph 3. The limits of the technology are explained later, in paragraph 5.`),
        q(33, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Noise-canceling headphones are the best invention for travelers. Anyone who rides a bus or airplane should buy a pair before the next trip.`, 'includes-opinion'),
          wrong(`Sound is made of waves of pressure that have high and low points. Our ears notice these changes in pressure and send signals to the brain.`, 'too-narrow'),
          wrong(`Noise-canceling headphones block every kind of sound completely. Their microphones and padded ear cups keep out engines, voices and barking dogs.`, 'contradicts-text'),
          right(`Noise-canceling headphones use microphones and a chip to make sound waves opposite to steady noise, so the waves cancel. Padding helps block sudden sounds the electronics miss.`),
        ], `The last choice explains the cancellation and the role of padding without opinions. The third choice contradicts paragraph 5, which says some sudden noise still gets through.`),
        q(34, 'hard', `How does the final paragraph refine the central idea presented earlier?`, [
          right(`It shows the cancellation works mainly on steady sounds, so padding is also needed.`),
          wrong(`It shows that the cancellation method does not actually work in real situations.`, 'overgeneralization'),
          wrong(`It shows that microphones are no longer needed once headphones have padding.`, 'contradicts-text'),
          wrong(`It shows that the headphones work best on sudden sounds like barking dogs.`, 'contradicts-text'),
        ], `Paragraph 5 explains that the method works best on low, steady sounds and that padding blocks the rest, which narrows the earlier explanation. It does not say the method fails; it says the two features work together.`),
        q(35, 'hard', `A student summarized the passage this way: "Headphones use microphones to record sounds and then play them back louder." What is the main problem with this summary?`, [
          wrong(`It includes the writer's personal opinion about how useful the headphones are.`, 'misidentifies-error'),
          wrong(`It leaves out the fact that sound travels as waves through the air.`, 'too-narrow'),
          right(`It misstates the key idea, since the headphones create an opposite wave to cancel noise.`),
          wrong(`It focuses too much on padded ear cups instead of the electronic parts.`, 'misidentifies-error'),
        ], `Paragraph 3 says the chip makes a wave that is "the exact opposite of the noise," not a louder copy, so the summary gets the central process wrong. Leaving out the sound wave background is a small gap, but the larger problem is the inaccurate main idea.`),
      ],
    },
    {
      code: 'rg7-main-idea-summary-p08',
      title: 'Every Student Should Learn to Cook',
      body: `Every student learns to read, write and solve equations. Yet many young people finish school without knowing how to cook a simple, healthy meal. Middle schools should require a basic cooking class, because cooking is a life skill that supports health, independence and learning in other subjects.\n\nFirst, cooking helps students make healthier choices. Many packaged and fast foods contain large amounts of salt, sugar and fat. A student who knows how to make a vegetable stir-fry or a pot of soup has another option. Students who help prepare vegetables are also often more willing to try them.\n\nSecond, cooking builds independence. Teenagers will soon be living on their own, managing their own money and time. Knowing how to plan meals, follow a recipe and shop on a budget can save money and prevent stress. These are habits that are easier to build at twelve than at twenty-two.\n\nCooking also connects to subjects students already study. Doubling a recipe requires working with fractions. Watching bread rise is a lesson in chemistry. Reading a recipe carefully is practice in following written directions. A cooking class can make these ideas feel real instead of abstract.\n\nSome people argue that schools do not have the time or money for cooking classes. This concern is fair, but the class does not need an expensive kitchen. A few hot plates, basic tools and simple recipes are enough to start. A cooking unit could even fit inside an existing health or science course.\n\nSchools exist to prepare students for life. Teaching them how to feed themselves well is one of the most practical ways to do that.`,
      items: [
        q(36, 'easy', `What is the author's central claim in this opinion piece?`, [
          wrong(`Fast food contains too much salt, sugar and fat for growing teens.`, 'too-narrow'),
          right(`Middle schools should require cooking because it is a valuable life skill.`),
          wrong(`Students should learn chemistry by watching bread rise in the oven.`, 'too-narrow'),
          wrong(`Schools do not have enough money to pay for new classes or kitchens.`, 'confuses-counterclaim'),
        ], `The last sentence of paragraph 1 states the claim directly, and every later paragraph supports it. The point about money is a counterargument the author answers, not the author's own claim.`),
        q(37, 'medium', `Which three supporting reasons does the author give for the central claim?`, [
          wrong(`Cooking is fun, it is popular, and it is easy to grade.`, 'unsupported-inference'),
          wrong(`Cooking saves time, uses hot plates, and replaces science class.`, 'misreads-details'),
          wrong(`Cooking helps families, creates jobs, and reduces school costs.`, 'unsupported-inference'),
          right(`Cooking supports health, builds independence, and connects to other subjects.`),
        ], `The claim sentence names health, independence and learning in other subjects, and paragraphs 2, 3 and 4 develop each one. The passage suggests fitting cooking inside a science course, not replacing science.`),
        q(38, 'medium', `Which is the best objective summary of the opinion piece?`, [
          right(`The author argues that middle schools should require cooking because it promotes health, independence and learning in math and science. The author also says the class can be done cheaply.`),
          wrong(`Doubling a recipe uses fractions, and watching bread rise teaches chemistry. Reading a recipe is practice in following directions, so cooking connects to school.`, 'too-narrow'),
          wrong(`The author makes an excellent point, and every school in the country should add a cooking class next year. Students will be much happier if they can cook.`, 'includes-opinion'),
          wrong(`The author argues that schools should stop teaching reading and equations so that students have more time to learn how to cook healthy meals at home.`, 'contradicts-text'),
        ], `The first choice states the claim, the reasons and the response to cost, without the summarizer's own views. The third choice adds the summarizer's opinion, such as "excellent point," which does not belong in an objective summary.`),
        q(39, 'hard', `How does the fifth paragraph contribute to the development of the author's central claim?`, [
          wrong(`It adds a fourth reason that cooking makes students healthier.`, 'misreads-structure'),
          wrong(`It shows that the author has changed position on cooking classes.`, 'contradicts-text'),
          right(`It answers a likely objection, which makes the claim more convincing.`),
          wrong(`It proves that every school already owns the tools that it needs.`, 'overgeneralization'),
        ], `Paragraph 5 admits that time and money are a fair concern and then explains that the class can be simple and cheap, which strengthens the argument. The author still supports the class, so the position has not changed.`),
        q(40, 'hard', `Which sentence would be the weakest choice to include in a summary of the opinion piece?`, [
          wrong(`The author claims cooking helps teenagers manage money and time once they live on their own.`, 'misidentifies-key-idea'),
          wrong(`The author says a cooking class could fit inside an existing health or science course.`, 'misidentifies-key-idea'),
          wrong(`The author believes schools should require cooking because it is a practical life skill.`, 'misidentifies-key-idea'),
          right(`The author mentions that a vegetable stir-fry and a pot of soup are two simple meals to make.`),
        ], `The stir-fry and soup are small examples inside paragraph 2, so they add little to a summary. The other choices restate the claim, a main reason or the answer to the counterargument, which a summary should include.`),
      ],
    },
  ],
}

export default skill
