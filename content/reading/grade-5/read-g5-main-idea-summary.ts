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
  slug: 'read-g5-main-idea-summary',
  subject: 'reading',
  grade: 5,
  group: 'Informational text',
  name: 'Main Idea and Summary',
  standards: ['RI.5.2'],
  passages: [
    {
      code: 'rg5-main-idea-summary-p01',
      title: 'Rivers of Ice',
      body: `A glacier is a huge sheet of ice that moves very slowly over land. Glaciers form in places where more snow falls in winter than melts in summer. Year after year, the snow piles up and presses down. The bottom layers slowly turn into solid ice.\n\nEven though glaciers seem frozen in place, they are always moving. Their great weight pushes them downhill, often just a few feet each day. As a glacier slides, it picks up rocks and soil underneath it.\n\nThese rocks work like sandpaper. They scrape and grind the ground as the glacier creeps along. Over thousands of years, a glacier can carve a narrow river valley into a wide valley shaped like the letter U.\n\nWhen a glacier finally melts, it leaves behind everything it carried. Long ridges of rock and gravel mark where the ice once stopped. Some of the holes it dug fill with water and become lakes. Many lakes in the northern part of North America were formed this way.\n\nToday, scientists study glaciers to learn how the land around us took its shape. The hills, valleys and lakes we see are often clues left by rivers of ice long ago.`,
      items: [
        q(1, 'easy', `Which two main ideas does the passage explain?`, [
          right(`Glaciers form from piled snow and move slowly, and as they move they reshape the land.`),
          wrong(`Glaciers are made of ice, and scientists enjoy visiting them in the summer months.`, 'unsupported-inference'),
          wrong(`Glaciers move a few feet each day, and their rocks feel rough like sandpaper.`, 'too-narrow'),
          wrong(`Snow falls in winter, and lakes are found in many parts of the world today.`, 'too-broad'),
        ], `The passage first tells how glaciers form and move, then explains how they carve valleys and leave ridges and lakes. The choice about moving a few feet each day and rocks feeling like sandpaper only lists small details instead of main ideas.`),
        q(2, 'easy', `Which detail best supports the idea that glaciers change the shape of the land?`, [
          wrong(`The bottom layers of snow slowly turn into solid ice.`, 'wrong-supporting-detail'),
          right(`A glacier can carve a narrow river valley into a wide valley shaped like the letter U.`),
          wrong(`Glaciers form where more snow falls in winter than melts in summer.`, 'wrong-supporting-detail'),
          wrong(`Scientists study glaciers to learn about the land around us.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 says a glacier carves a narrow valley into a U shape, which shows the land changing. The details about snow turning to ice tell how glaciers form, not how they change land.`),
        q(3, 'medium', `What is the main idea of paragraph 4?`, [
          wrong(`Glaciers slide downhill because they are very heavy.`, 'misreads-paragraph'),
          wrong(`Most lakes in the world were formed by melting glaciers.`, 'overgeneralizes'),
          right(`A melting glacier leaves behind ridges and lakes that mark where it was.`),
          wrong(`Rocks under a glacier scrape the ground like sandpaper.`, 'misreads-paragraph'),
        ], `Paragraph 4 describes the ridges and lakes a glacier leaves when it melts. The passage says many lakes in northern North America formed this way, not most lakes in the world.`),
        q(4, 'medium', `Which is the best summary of the passage?`, [
          wrong(`Glaciers are huge sheets of ice. They are beautiful and fun to look at, so everyone should visit one.`, 'includes-opinion'),
          wrong(`Rocks under glaciers grind the ground. This is the reason that every valley on Earth is shaped like a U.`, 'contradicts-text'),
          wrong(`Glaciers move just a few feet each day. They push downhill because they are heavy.`, 'too-narrow'),
          right(`Glaciers form from packed snow and slowly slide downhill. Along the way they carve valleys, and when they melt they leave ridges and lakes.`),
        ], `The correct summary covers how glaciers form, move and change the land, without opinions. The summary about moving a few feet each day leaves out how glaciers shape the land.`),
        q(5, 'hard', `Which sentence would NOT belong in a summary of the passage?`, [
          wrong(`Glaciers form when snow builds up and presses into ice.`, 'misidentifies-key-idea'),
          wrong(`Rocks carried by a glacier grind valleys into new shapes.`, 'misidentifies-key-idea'),
          right(`Glaciers are probably the most interesting things in nature.`),
          wrong(`Melting glaciers can leave behind ridges of rock and new lakes.`, 'misidentifies-key-idea'),
        ], `A summary gives only the important ideas from the text, so a personal opinion such as "the most interesting things in nature" does not belong. The sentences about how glaciers form, how their rocks grind valleys and what they leave when they melt all restate key ideas from the passage.`),
      ],
    },
    {
      code: 'rg5-main-idea-summary-p02',
      title: 'The Bumpy Start of the Bicycle',
      body: `The first bicycles looked very different from the ones we ride today. Early models, built about two hundred years ago, had no pedals at all. Riders sat on a wooden frame and pushed along the ground with their feet. These machines were heavy and hard to steer.\n\nLater, inventors added pedals to the front wheel. To go faster, some builders made the front wheel huge, sometimes as tall as a grown man. These high-wheel bikes could go quickly, but they were dangerous. A small bump in the road could send a rider flying over the handlebars.\n\nOver time, builders solved these problems one by one. They made both wheels the same size and connected the pedals to the back wheel with a chain. They added rubber tires filled with air, which made rides much smoother. Brakes made it easier to stop safely.\n\nThese changes made bicycles safer and easier to ride. Soon, many more people could use them. Workers rode bicycles to their jobs, and families rode them for fun on weekends. The bicycle became one of the most common ways to travel.`,
      items: [
        q(6, 'easy', `What is one main idea of the passage?`, [
          wrong(`High-wheel bikes had a front wheel as tall as a grown man.`, 'too-narrow'),
          wrong(`Bicycles are the best way for families to have fun together.`, 'includes-opinion'),
          right(`Early bicycles had serious problems that builders fixed over time.`),
          wrong(`Wooden machines were common in many places long ago.`, 'too-broad'),
        ], `Paragraphs 1 through 3 describe the problems with early bicycles and the changes that solved them. The tall front wheel is only one detail about one kind of bike.`),
        q(7, 'easy', `Which detail supports the idea that high-wheel bikes were dangerous?`, [
          right(`A small bump in the road could send a rider flying over the handlebars.`),
          wrong(`Riders sat on a wooden frame and pushed along with their feet.`, 'wrong-supporting-detail'),
          wrong(`Builders connected the pedals to the back wheel with a chain.`, 'wrong-supporting-detail'),
          wrong(`Families rode bicycles for fun on weekends.`, 'wrong-supporting-detail'),
        ], `Paragraph 2 says a small bump could throw a rider over the handlebars, which shows the danger. The wooden frame detail describes the earlier bikes with no pedals.`),
        q(8, 'medium', `Which two main ideas are both developed in the passage?`, [
          wrong(`Bicycles once had no pedals, and modern bikes are sold in many colors.`, 'unsupported-inference'),
          wrong(`Front wheels were once very large, and rubber tires were filled with air.`, 'too-narrow'),
          wrong(`Inventors like wood, and workers prefer to ride bikes to their jobs.`, 'unsupported-inference'),
          right(`Bicycles improved through a series of changes, and those changes helped bikes become popular.`),
        ], `The passage shows how bikes got better step by step, then explains that safer bikes were used by many more people. The choice about wheels and tires lists details, not main ideas.`),
        q(9, 'medium', `How do the details in paragraph 3 support the main idea of the passage?`, [
          wrong(`They explain why the first bicycles were made out of wood.`, 'misreads-paragraph'),
          right(`They list the changes, such as chains, air tires and brakes, that made bikes safer.`),
          wrong(`They show that high-wheel bikes were the fastest bikes ever made.`, 'unsupported-inference'),
          wrong(`They describe how workers and families used bicycles each week.`, 'misreads-paragraph'),
        ], `Paragraph 3 names the chain, air-filled tires and brakes that solved earlier problems. How workers and families used bikes is in paragraph 4, not paragraph 3.`),
        q(10, 'hard', `Which is the best summary of the passage?`, [
          wrong(`Early bicycles had no pedals. Riders pushed along with their feet, and the machines were heavy and hard to steer.`, 'too-narrow'),
          wrong(`The bicycle was invented to help workers get to their jobs. Families did not ride bikes until brakes were added.`, 'contradicts-text'),
          right(`Early bicycles were heavy, hard to steer or dangerous. Builders added chains, equal wheels, air tires and brakes, and the safer bikes became a common way to travel.`),
          wrong(`High-wheel bikes were exciting and fast. It is too bad people stopped riding them, because they were the most fun kind of bike.`, 'includes-opinion'),
        ], `The correct summary includes the early problems, the improvements and the result, which are the key ideas. The summary about early bicycles having no pedals only retells paragraph 1.`),
      ],
    },
    {
      code: 'rg5-main-idea-summary-p03',
      title: 'Why Cities Plant Street Trees',
      body: `Walk down a city street on a hot afternoon, and you may notice something. The blocks with tall trees feel much cooler than the blocks without them. That is one reason many cities are planting more trees along their sidewalks.\n\nTrees cool a street in two ways. First, their leaves block sunlight before it can heat the pavement. Second, trees give off water through their leaves, which cools the air around them. On summer days, a shady street can be several degrees cooler than a sunny one.\n\nStreet trees also help when it rains. Their roots soak up water, and the soil around them holds even more. This means less rainwater rushes into storm drains all at once, so streets are less likely to flood.\n\nPlanting trees in a city is not always easy, though. Roots need room to grow, and they can crack sidewalks if they are squeezed. Young trees need regular watering for their first few years. Some cities ask neighbors to help by watering the trees in front of their homes.\n\nWith care, a single street tree can last for many decades. Over that time, it keeps cooling the block and soaking up rain for everyone who lives nearby.`,
      items: [
        q(11, 'easy', `What is the main idea of paragraph 2?`, [
          wrong(`Summer days in a city are hotter than winter days.`, 'too-broad'),
          right(`Trees cool a street by shading it and by giving off water.`),
          wrong(`Pavement gets very hot when the sun shines on it.`, 'too-narrow'),
          wrong(`Cities should only build streets that have trees on them.`, 'unsupported-inference'),
        ], `Paragraph 2 explains two ways trees cool a street: shade and water from leaves. Hot pavement is only part of the first way, not the whole paragraph.`),
        q(12, 'medium', `Which two main ideas does the passage present?`, [
          wrong(`Trees have roots, and sidewalks are made of concrete.`, 'too-narrow'),
          wrong(`Neighbors enjoy watering trees, and young trees grow quickly.`, 'unsupported-inference'),
          right(`Street trees help cities in useful ways, and they need care to grow well.`),
          wrong(`Cities are crowded places, and many people live in them.`, 'too-broad'),
        ], `Paragraphs 2 and 3 show how trees cool streets and prevent flooding, and paragraph 4 explains the care they need. The passage never says neighbors enjoy watering or that young trees grow quickly.`),
        q(13, 'medium', `Which detail best supports the idea that street trees help prevent flooding?`, [
          wrong(`A shady street can be several degrees cooler than a sunny one.`, 'wrong-supporting-detail'),
          wrong(`Roots can crack sidewalks if they are squeezed.`, 'wrong-supporting-detail'),
          wrong(`A single street tree can last for many decades.`, 'wrong-supporting-detail'),
          right(`Less rainwater rushes into storm drains all at once.`),
        ], `Paragraph 3 says roots and soil hold water so less rushes into storm drains, which explains less flooding. The detail about shady streets supports the cooling idea instead.`),
        q(14, 'medium', `Why does the author include paragraph 4?`, [
          right(`To show that street trees bring some challenges along with their benefits.`),
          wrong(`To explain how trees give off water through their leaves.`, 'misreads-paragraph'),
          wrong(`To prove that street trees cause more problems than they solve.`, 'overgeneralizes'),
          wrong(`To describe how storm drains carry water away from streets.`, 'misreads-paragraph'),
        ], `Paragraph 4 begins with "not always easy" and lists cracked sidewalks and watering needs. The passage ends by praising trees, so it does not claim they cause more problems than they solve.`),
        q(15, 'hard', `Which summary best includes the key ideas of the passage?`, [
          wrong(`Trees block sunlight from the pavement. They also give off water through their leaves, which cools the air on summer days.`, 'too-narrow'),
          wrong(`City streets are hot and often flood. The only way to fix these problems is for every neighbor to plant a tree.`, 'contradicts-text'),
          wrong(`Trees are the best part of any city. People who live on streets with no trees are missing out on a lot.`, 'includes-opinion'),
          right(`Street trees cool city blocks and soak up rain that could cause floods. They need room for roots and regular watering, but with care they help for decades.`),
        ], `The correct summary covers the benefits, the challenges and the long life of street trees. The summary about trees blocking sunlight and giving off water only covers the cooling details from paragraph 2.`),
      ],
    },
    {
      code: 'rg5-main-idea-summary-p04',
      title: 'Masters of Disguise',
      body: `The octopus is one of the best hiders in the ocean. It has no shell and no bones, so it cannot protect itself with armor. Instead, it stays safe by staying out of sight.\n\nAn octopus can change its color in less than a second. Its skin holds thousands of tiny sacs filled with color. By squeezing or relaxing these sacs, the octopus can turn red, brown, white or speckled. It can match the sand, a rock or a patch of seaweed.\n\nColor is not the only trick. An octopus can also change the texture of its skin. It can raise small bumps to look like rough coral or keep its skin flat to look like smooth stone. Some octopuses even fold their arms to look like floating plants.\n\nWhen hiding does not work, an octopus has a backup plan. It can squirt a cloud of dark ink into the water. The ink hides the octopus for a moment while it jets away.\n\nBecause its body is so soft, an octopus can squeeze into tiny cracks. A large octopus can fit through a hole about the size of a coin. These skills together make the octopus very hard to catch.`,
      items: [
        q(16, 'easy', `What is the main idea of the whole passage?`, [
          wrong(`An octopus can squirt dark ink into the water.`, 'too-narrow'),
          wrong(`Many sea animals live near sand, rocks and seaweed.`, 'too-broad'),
          right(`An octopus uses several clever tricks to hide and stay safe.`),
          wrong(`An octopus is the fastest swimmer in the whole ocean.`, 'unsupported-inference'),
        ], `Each paragraph describes a different way the octopus hides or escapes, so the main idea is its many tricks for staying safe. The ink is only one of those tricks.`),
        q(17, 'easy', `Which detail supports the idea that an octopus can change its color?`, [
          wrong(`It has no shell and no bones.`, 'wrong-supporting-detail'),
          right(`Its skin holds thousands of tiny sacs filled with color.`),
          wrong(`It can fit through a hole about the size of a coin.`, 'wrong-supporting-detail'),
          wrong(`It can raise small bumps to look like rough coral.`, 'wrong-supporting-detail'),
        ], `Paragraph 2 explains that color sacs in the skin let the octopus change color. Raising bumps is about texture, not color.`),
        q(18, 'medium', `Paragraphs 2 and 3 both support which main idea?`, [
          right(`An octopus can change how its skin looks to blend in with its surroundings.`),
          wrong(`An octopus escapes danger by squirting ink and swimming away.`, 'misreads-paragraph'),
          wrong(`An octopus has a soft body that fits into very small spaces.`, 'misreads-paragraph'),
          wrong(`An octopus likes to live near coral more than near sand.`, 'unsupported-inference'),
        ], `Paragraph 2 is about changing color and paragraph 3 is about changing texture, and both help the octopus blend in. The ink is described in paragraph 4.`),
        q(19, 'medium', `Which two main ideas does the passage explain?`, [
          wrong(`An octopus has thousands of color sacs, and its ink is very dark.`, 'too-narrow'),
          wrong(`The ocean is very deep, and many animals live on its floor.`, 'too-broad'),
          wrong(`An octopus is soft and weak, and it is easy for enemies to catch.`, 'contradicts-text'),
          right(`An octopus hides by changing its skin, and it escapes by using ink and squeezing into cracks.`),
        ], `The passage describes blending in with color and texture, then escaping with ink and tight spaces. The choice saying octopuses are easy to catch contradicts the last sentence.`),
        q(20, 'hard', `Which is the best summary of the passage?`, [
          wrong(`An octopus can turn red, brown, white or speckled. It can match sand, rock or seaweed in less than a second.`, 'too-narrow'),
          right(`An octopus has no shell, so it stays safe by changing its color and skin texture to blend in. If that fails, it squirts ink or squeezes into tiny cracks.`),
          wrong(`An octopus is the coolest animal in the sea. Its tricks are amazing, and it would make a great pet for anyone.`, 'includes-opinion'),
          wrong(`An octopus has bones that are very small. It hides in coral during the day and hunts for food at night.`, 'contradicts-text'),
        ], `The correct summary names the main hiding and escaping tricks without opinions. The summary about turning red, brown, white or speckled only retells paragraph 2.`),
      ],
    },
    {
      code: 'rg5-main-idea-summary-p05',
      title: 'From Sand to Stained Glass',
      body: `Stained glass windows glow with bright color when sunlight shines through them. Making one takes skill, patience and many careful steps.\n\nThe process begins with glass. Glass is made by heating sand until it melts into a thick liquid. To give the glass color, glassmakers stir in small amounts of metal powders. A little copper can make the glass green or blue. Other metals create reds, purples and yellows.\n\nNext, an artist draws a full-size plan of the window. The plan shows where each color will go. Using the drawing as a guide, the artist cuts the colored glass into small pieces. Each piece must fit its spot exactly.\n\nThen the pieces are joined together. The artist wraps or frames each piece with thin strips of lead. Where the strips meet, the artist melts a little metal to hold them tight. The dark lines of lead outline the shapes, almost like lines in a coloring book.\n\nFinally, the finished panel is sealed so rain cannot leak through, and it is set into a window frame. A large window can take months to complete. When it is done, it may last for hundreds of years.`,
      items: [
        q(21, 'easy', `What is the main idea of the passage?`, [
          wrong(`Copper can turn glass green or blue.`, 'too-narrow'),
          wrong(`Sunlight makes many things look bright and warm.`, 'too-broad'),
          wrong(`Stained glass windows are too hard for most people to make.`, 'unsupported-inference'),
          right(`Making a stained glass window takes several careful steps.`),
        ], `The passage walks through making colored glass, planning, cutting, joining and setting the window. Copper coloring the glass is only a detail in paragraph 2.`),
        q(22, 'medium', `What is the main idea of paragraph 2?`, [
          right(`Colored glass is made by melting sand and adding metal powders.`),
          wrong(`Artists draw a full-size plan before cutting any glass.`, 'misreads-paragraph'),
          wrong(`Red is the hardest color of glass to make.`, 'unsupported-inference'),
          wrong(`Sand can be found on beaches all around the world.`, 'too-broad'),
        ], `Paragraph 2 explains melting sand into glass and adding metals for color. Drawing the plan is the main idea of paragraph 3.`),
        q(23, 'medium', `Which detail best supports the idea that stained glass takes patience?`, [
          wrong(`Glass is made by heating sand until it melts.`, 'wrong-supporting-detail'),
          wrong(`The dark lines of lead outline the shapes.`, 'wrong-supporting-detail'),
          right(`A large window can take months to complete.`),
          wrong(`Stained glass windows glow when sunlight shines through them.`, 'wrong-supporting-detail'),
        ], `Taking months to finish one window shows that the work requires patience. The glowing windows detail describes how they look, not how long they take.`),
        q(24, 'hard', `Which two main ideas does the passage develop?`, [
          wrong(`Glass comes from sand, and lead is a dark metal.`, 'too-narrow'),
          right(`Colored glass is made from sand and metals, and artists plan, cut and join it into a lasting window.`),
          wrong(`Stained glass is very old, and it is only found in large buildings.`, 'unsupported-inference'),
          wrong(`Artists like bright colors, and they draw pictures in coloring books.`, 'literal-reading'),
        ], `The passage first explains how colored glass is made, then how an artist turns it into a window that can last centuries. The coloring book is only a comparison, not something artists actually do in the text.`),
        q(25, 'hard', `Which is the best summary of the passage?`, [
          wrong(`Stained glass is the most beautiful kind of art. Every home should have at least one stained glass window.`, 'includes-opinion'),
          wrong(`Artists wrap each piece of glass with lead. They melt metal where the strips meet so the pieces hold tight.`, 'too-narrow'),
          right(`Glassmakers melt sand and add metals to make colored glass. An artist plans the design, cuts the pieces, joins them with lead and seals the window, which can last for centuries.`),
          wrong(`Artists heat sand on the beach to make a window. They paint colors onto clear glass after it is set in the frame.`, 'contradicts-text'),
        ], `The correct summary follows every main step in order without adding opinions. The summary about wrapping each piece with lead only retells paragraph 4.`),
      ],
    },
    {
      code: 'rg5-main-idea-summary-p06',
      title: 'Turning Sunlight into Power',
      body: `On many rooftops today, you can see dark, flat panels tilted toward the sky. These are solar panels. They turn sunlight into electricity that can power lights, computers and refrigerators.\n\nA solar panel is made of many small squares called cells. Each cell contains thin layers of a material called silicon. When sunlight hits a cell, it knocks tiny particles loose inside the silicon. Those moving particles create an electric current. Wires carry the current from the panel into the building.\n\nSolar power has some big advantages. Sunlight is free, and it will not run out. Solar panels also make electricity without smoke or loud noise, so they keep the air cleaner than some other power sources.\n\nSolar power has limits, too. Panels make no electricity at night and less on cloudy days. To solve this problem, some homes store extra power in large batteries during the day. Then they use the stored power after dark.\n\nEngineers keep working to make solar cells cheaper and better at catching light. As the panels improve, more families and schools are choosing to use the sun to meet their energy needs.`,
      items: [
        q(26, 'easy', `What is one main idea of the passage?`, [
          wrong(`Solar panels are dark and flat.`, 'too-narrow'),
          right(`Solar panels turn sunlight into electricity that people can use.`),
          wrong(`Refrigerators use more power than any other machine.`, 'unsupported-inference'),
          wrong(`People use electricity in many parts of their lives.`, 'too-broad'),
        ], `The first two paragraphs explain that solar panels change sunlight into electricity and how they do it. The panels being dark and flat is only a small detail.`),
        q(27, 'medium', `Which detail best supports the idea that solar power has advantages?`, [
          wrong(`Panels make no electricity at night.`, 'wrong-supporting-detail'),
          wrong(`Each cell contains thin layers of silicon.`, 'wrong-supporting-detail'),
          right(`Sunlight is free, and it will not run out.`),
          wrong(`Wires carry the current into the building.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 lists advantages, including that sunlight is free and will not run out. Making no power at night is a limit, not an advantage.`),
        q(28, 'medium', `What is the main idea of paragraph 4?`, [
          wrong(`Cloudy days happen more often in winter than in summer.`, 'unsupported-inference'),
          wrong(`Batteries are the most important part of a solar panel.`, 'overgeneralizes'),
          wrong(`Solar panels make electricity without smoke or noise.`, 'misreads-paragraph'),
          right(`Solar power has limits, but batteries can help solve them.`),
        ], `Paragraph 4 explains that panels make little power at night or on cloudy days and that batteries store extra power. Smoke and noise are discussed in paragraph 3.`),
        q(29, 'hard', `Which two main ideas are best supported by the passage?`, [
          right(`Solar panels make electricity from sunlight, and solar power has both benefits and limits.`),
          wrong(`Silicon is found in solar cells, and wires are used to carry electricity.`, 'too-narrow'),
          wrong(`Solar power is better than every other kind of power, and it never has problems.`, 'contradicts-text'),
          wrong(`Engineers work on many inventions, and schools need energy to run.`, 'too-broad'),
        ], `The passage explains how panels work and then gives both advantages and limits. Saying solar power never has problems ignores paragraph 4.`),
        q(30, 'hard', `Which sentence would NOT belong in a summary of the passage?`, [
          wrong(`Solar cells turn sunlight into an electric current.`, 'misidentifies-key-idea'),
          wrong(`Solar power is clean and free, but it does not work at night.`, 'misidentifies-key-idea'),
          wrong(`Batteries can store solar power for use after dark.`, 'misidentifies-key-idea'),
          right(`The panels on the rooftops are tilted toward the sky.`),
        ], `The tilt of the panels is a minor detail that does not help explain the main ideas, so it does not belong in a summary. The sentences about solar cells making a current, solar power being clean but not working at night, and batteries storing power all state key ideas.`),
      ],
    },
    {
      code: 'rg5-main-idea-summary-p07',
      title: 'A Sport Called Jump Rope',
      body: `Many people think of jumping rope as a playground game. But in gyms around the world, jump rope is also a serious sport with teams, coaches and contests.\n\nIn speed events, jumpers try to make as many jumps as they can in a set amount of time. Judges use counters to keep track. The best jumpers can land more than five jumps every second. Their feet barely leave the floor.\n\nIn freestyle events, jumpers perform routines set to music. They cross the rope, spin, do push-ups between turns and even flip in the air. Judges give points for difficulty and for how smoothly the moves connect.\n\nSome of the most exciting events use two long ropes turned in opposite directions. This is often called double Dutch. Two teammates turn the ropes while one or two others jump in the middle. Everyone must keep a steady rhythm, or the ropes will tangle.\n\nJump rope is also great exercise. It makes the heart stronger and improves balance and timing. A rope is cheap and easy to carry, so athletes can practice almost anywhere. For many young jumpers, a simple playground game has become a lifelong sport.`,
      items: [
        q(31, 'easy', `What is the main idea of the passage?`, [
          wrong(`Judges use counters to keep track of jumps.`, 'too-narrow'),
          wrong(`Children should spend more time on playgrounds.`, 'unsupported-inference'),
          right(`Jump rope is a real sport with different events, and it is good exercise.`),
          wrong(`There are many sports played in gyms around the world.`, 'too-broad'),
        ], `The passage describes speed, freestyle and double Dutch events and then explains the exercise benefits. Using counters is one detail from the speed events.`),
        q(32, 'medium', `Which detail supports the idea that freestyle events are difficult?`, [
          right(`They cross the rope, spin, do push-ups between turns and even flip in the air.`),
          wrong(`A rope is cheap and easy to carry.`, 'wrong-supporting-detail'),
          wrong(`Two teammates turn the ropes while others jump.`, 'wrong-supporting-detail'),
          wrong(`Many people think of jumping rope as a playground game.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 lists hard moves like spins and flips in freestyle routines. Turning two ropes describes double Dutch, a different event.`),
        q(33, 'medium', `What do paragraphs 2, 3 and 4 have in common?`, [
          wrong(`They each explain why jumping rope makes the heart stronger.`, 'misreads-paragraph'),
          wrong(`They each tell how to buy the right kind of rope.`, 'unsupported-inference'),
          wrong(`They each describe a game played only at recess.`, 'contradicts-text'),
          right(`They each describe a different kind of jump rope event.`),
        ], `Paragraph 2 covers speed, paragraph 3 covers freestyle and paragraph 4 covers double Dutch. Heart health is discussed only in paragraph 5.`),
        q(34, 'medium', `Which two main ideas does the passage explain?`, [
          wrong(`Jumpers wear special shoes, and contests are held only in big cities.`, 'unsupported-inference'),
          right(`Jump rope has several kinds of contest events, and it builds strength and skill.`),
          wrong(`Double Dutch uses two ropes, and speed jumpers make five jumps a second.`, 'too-narrow'),
          wrong(`Playground games are fun, and music makes exercise more enjoyable.`, 'too-broad'),
        ], `Paragraphs 2 through 4 describe the events and paragraph 5 explains the health benefits. The choice about two ropes and five jumps lists details, not main ideas.`),
        q(35, 'hard', `Which is the best summary of the passage?`, [
          wrong(`Double Dutch uses two long ropes turned in opposite directions. Everyone must keep a steady rhythm or the ropes will tangle.`, 'too-narrow'),
          wrong(`Jump rope is more fun than any other sport. Kids who do not jump rope are missing the best exercise there is.`, 'includes-opinion'),
          wrong(`Jump rope started in gyms and later moved to playgrounds. Only adults are allowed to enter jump rope contests.`, 'contradicts-text'),
          right(`Jump rope is a competitive sport with speed, freestyle and double Dutch events. It also builds a strong heart, balance and timing, and it can be practiced almost anywhere.`),
        ], `The correct summary covers the different events and the benefits of the sport. The summary about two long ropes keeping a steady rhythm only retells the double Dutch paragraph.`),
      ],
    },
    {
      code: 'rg5-main-idea-summary-p08',
      title: 'Recess Should Come Before Lunch',
      body: `At most schools, students eat lunch first and go to recess afterward. I believe schools should switch the order. Holding recess before lunch would help students eat better and learn more.\n\nFirst, students would eat more of their food. When recess comes right after lunch, many students rush through their meal so they can get outside sooner. They often throw away half of their sandwich or skip their fruit. After playing, students come in hungry and ready to sit down and eat.\n\nSecond, the lunchroom would be calmer. Students who have already run around and played are less restless. They can sit, eat and talk quietly with friends instead of watching the clock.\n\nFinally, students would return to class more ready to learn. After lunch, they would have had both exercise and a full meal. Teachers at one school that made the switch said their classes settled down faster in the afternoon.\n\nSome people worry that switching the schedule would be hard to arrange. However, it usually means only moving the times on a schedule, not adding any extra minutes to the day. Changing the order is a small step that could make a big difference.`,
      items: [
        q(36, 'easy', `What is the author's main idea?`, [
          wrong(`Students should get a longer recess every day.`, 'unsupported-inference'),
          right(`Schools should hold recess before lunch instead of after it.`),
          wrong(`Students often throw away part of their sandwiches.`, 'too-narrow'),
          wrong(`Lunch is the most important meal of the school day.`, 'too-broad'),
        ], `The author says in paragraph 1 that schools should switch the order and spends the rest of the piece giving reasons. The author never asks for a longer recess.`),
        q(37, 'medium', `Which detail best supports the idea that students would eat more if recess came first?`, [
          wrong(`The lunchroom would be calmer.`, 'wrong-supporting-detail'),
          wrong(`Classes settled down faster in the afternoon.`, 'wrong-supporting-detail'),
          right(`After playing, students come in hungry and ready to sit down and eat.`),
          wrong(`It usually means only moving the times on a schedule.`, 'wrong-supporting-detail'),
        ], `Paragraph 2 says students come in hungry after playing, which explains why they would eat more. Classes settling down supports the idea about learning, not eating.`),
        q(38, 'medium', `Which two main reasons does the author give for the change?`, [
          wrong(`Recess is too short, and lunch food should taste better.`, 'unsupported-inference'),
          wrong(`Students skip fruit, and teachers watch the clock.`, 'too-narrow'),
          wrong(`Schedules are hard to change, and extra minutes cost money.`, 'confuses-counterclaim'),
          right(`Students would eat more of their lunch, and they would be more ready to learn.`),
        ], `Paragraphs 2 and 4 give these reasons, along with a calmer lunchroom in paragraph 3. The schedule worry is an objection the author answers, not a reason for the change.`),
        q(39, 'hard', `Why does the author include paragraph 5?`, [
          right(`To answer a worry some people have and show the change would be simple.`),
          wrong(`To give another reason why students would eat more food.`, 'misreads-paragraph'),
          wrong(`To admit that switching recess and lunch is a bad idea.`, 'confuses-counterclaim'),
          wrong(`To explain how teachers plan their afternoon lessons.`, 'misreads-paragraph'),
        ], `Paragraph 5 mentions the worry that the switch is hard, then says it only means moving times on a schedule. The author does not agree that the idea is bad.`),
        q(40, 'hard', `Which is the best summary of the passage?`, [
          wrong(`Students rush through lunch to get to recess. They throw away half of their sandwiches and skip their fruit.`, 'too-narrow'),
          right(`The author argues that recess should come before lunch. Students would eat more, the lunchroom would be calmer and students would be more ready to learn, and the change is easy to make.`),
          wrong(`The author argues that recess should be removed so students have more time to eat and study in class.`, 'contradicts-text'),
          wrong(`Recess is the best part of the day. Every student loves recess more than lunch, so it should always come first.`, 'includes-opinion'),
        ], `The correct summary states the author's claim, the main reasons and the answer to the worry. The summary about rushing through lunch and throwing away sandwiches only retells one detail from paragraph 2.`),
      ],
    },
  ],
}

export default skill
