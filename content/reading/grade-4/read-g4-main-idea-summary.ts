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
  slug: 'read-g4-main-idea-summary',
  subject: 'reading',
  grade: 4,
  group: 'Informational text',
  name: 'Main Idea and Summary',
  standards: ['RI.4.2'],
  passages: [
    {
      code: 'rg4-main-idea-summary-p01',
      title: 'From Tree to Pancake',
      body: `Maple syrup comes from the sap of maple trees. Making it takes careful work, lots of time, and the right kind of weather.\n\nSap starts to flow in late winter. The best days are warm and sunny, while the nights are still below freezing. This change in temperature pushes sap up and down inside the tree. Farmers watch the weather closely so they know when to begin.\n\nTo collect sap, a farmer drills a small hole in the trunk. A short tube called a tap goes into the hole. Sap drips out through the tap and into a bucket or a long plastic line. Fresh sap looks like water and tastes only a little sweet.\n\nNext, the sap is boiled in a wide, flat pan. As it boils, the water turns to steam and floats away. The sap slowly gets thicker, darker, and sweeter. It takes about forty gallons of sap to make just one gallon of syrup.\n\nFinally, the syrup is strained to remove bits of grit. Then it is poured into bottles while it is still hot. When you pour maple syrup on your pancakes, you are tasting weeks of patient work.`,
      items: [
        q(1, 'easy', `What is the main idea of the passage?`, [
          wrong(`It takes about forty gallons of sap to make one gallon of syrup.`, 'too-narrow'),
          right(`Maple syrup is made by collecting sap from trees and boiling it down.`),
          wrong(`Many of the foods that people eat come from trees and plants.`, 'too-broad'),
          wrong(`Maple syrup tastes better than any other topping for pancakes.`, 'unsupported-inference'),
        ], `Every paragraph describes a step in turning tree sap into syrup, so "Maple syrup is made by collecting sap from trees and boiling it down" is the main idea. The forty gallons fact is only one detail from paragraph 4.`),
        q(2, 'easy', `Which detail supports the idea that making syrup needs the right kind of weather?`, [
          wrong(`A short tube called a tap goes into the hole.`, 'wrong-supporting-detail'),
          wrong(`Then it is poured into bottles while it is still hot.`, 'wrong-supporting-detail'),
          right(`The best days are warm and sunny, while the nights are still below freezing.`),
          wrong(`Fresh sap looks like water and tastes only a little sweet.`, 'wrong-supporting-detail'),
        ], `Paragraph 2 explains that warm days and freezing nights make the sap flow, which is about weather. The other details are true, but they describe tools, bottling, or how sap looks.`),
        q(3, 'medium', `What is the main idea of paragraph 4?`, [
          wrong(`Farmers drill holes in maple trees and put taps in them.`, 'wrong-paragraph'),
          wrong(`Steam rises from the pan and floats away into the air.`, 'too-narrow'),
          wrong(`Syrup is strained and poured into bottles while it is hot.`, 'wrong-paragraph'),
          right(`Boiling removes water from the sap and turns it into syrup.`),
        ], `Paragraph 4 explains that boiling sends the water away as steam and leaves thick, sweet syrup. Drilling holes is in paragraph 3 and bottling is in paragraph 5.`),
        q(4, 'medium', `Which is the best summary of the passage?`, [
          right(`In late winter, farmers tap maple trees to collect sap. They boil the sap until most of the water is gone, then strain and bottle the syrup.`),
          wrong(`Maple syrup is the best breakfast food in the world. Every family should visit a maple farm to watch the farmers work in winter.`, 'includes-opinion'),
          wrong(`Sap drips out of a tap into a bucket or a long plastic line. Fresh sap looks like water and tastes only a little sweet.`, 'too-narrow'),
          wrong(`Farmers make syrup in the summer by squeezing maple leaves. The juice is mixed with sugar and poured into bottles to sell.`, 'contradicts-text'),
        ], `The summary about tapping trees, boiling the sap, and bottling the syrup tells the main steps in order without adding opinions. The summary about sap dripping into a bucket is accurate but only covers paragraph 3, so it leaves out most of the process.`),
        q(5, 'hard', `Why does the author include the fact that forty gallons of sap make only one gallon of syrup?`, [
          wrong(`To explain how farmers know when the sap will start to flow`, 'misreads-purpose'),
          right(`To show how much work and time it takes to make syrup`),
          wrong(`To prove that maple trees are running out of sap each year`, 'unsupported-inference'),
          wrong(`To describe what fresh sap looks and tastes like in a bucket`, 'misreads-purpose'),
        ], `The fact shows that a huge amount of sap must be boiled for a little syrup, which supports the idea that making syrup takes careful work and lots of time. Nothing in the passage says trees are running out of sap.`),
      ],
    },
    {
      code: 'rg4-main-idea-summary-p02',
      title: 'How a Hot Air Balloon Rises',
      body: `A hot air balloon can float high above fields and towns. It has no engine or wings. Instead, it rises because of one simple fact: hot air is lighter than cool air.\n\nA hot air balloon has three main parts. The big cloth bag on top is called the envelope. Under it hangs a basket where the pilot and riders stand. Between them is a burner that makes a strong flame.\n\nWhen the pilot turns on the burner, the flame heats the air inside the envelope. As the air warms, it spreads out and becomes lighter. Soon the warm air inside is lighter than the cool air outside. That difference lifts the whole balloon off the ground.\n\nTo go down, the pilot lets the air inside cool off. The pilot can also open a small flap at the top to let some hot air escape. Then the balloon sinks slowly back toward the earth.\n\nA pilot cannot steer a balloon the way a driver steers a car. The wind decides which way it goes. Pilots learn that winds blow in different directions at different heights. By rising or sinking, they can catch a wind that moves the right way.`,
      items: [
        q(6, 'easy', `What is the main idea of the passage?`, [
          wrong(`A hot air balloon has a basket where the pilot and riders stand.`, 'too-narrow'),
          wrong(`Riding in a hot air balloon is more fun than riding in a car.`, 'unsupported-inference'),
          right(`A hot air balloon moves up and down by heating and cooling air.`),
          wrong(`People have invented many different machines that can fly.`, 'too-broad'),
        ], `The passage explains that heating the air makes the balloon rise and cooling it makes the balloon sink. The basket is only one small detail about the parts.`),
        q(7, 'easy', `Which detail best supports the idea that hot air is lighter than cool air?`, [
          right(`As the air warms, it spreads out and becomes lighter.`),
          wrong(`The big cloth bag on top is called the envelope.`, 'wrong-supporting-detail'),
          wrong(`A hot air balloon can float high above fields and towns.`, 'wrong-supporting-detail'),
          wrong(`The wind decides which way it goes.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 says warm air spreads out and becomes lighter, which directly supports the idea. The name of the envelope and the wind do not explain why hot air is lighter.`),
        q(8, 'medium', `What is paragraph 5 mostly about?`, [
          wrong(`How the burner heats the air inside the envelope`, 'wrong-paragraph'),
          right(`How pilots use the wind to choose a direction`),
          wrong(`How a pilot lets hot air out through a flap`, 'wrong-paragraph'),
          wrong(`How a driver steers a car down a busy road`, 'literal-reading'),
        ], `Paragraph 5 explains that the wind moves the balloon and that pilots rise or sink to catch a helpful wind. The car is mentioned only as a comparison, not as the topic.`),
        q(9, 'medium', `Which is the best summary of the passage?`, [
          wrong(`A hot air balloon has an envelope, a basket, and a burner. The basket hangs under the envelope, and the burner sits between them.`, 'too-narrow'),
          wrong(`Hot air balloons are the most beautiful things in the sky. Everyone should take a balloon ride at least once in their life.`, 'includes-opinion'),
          wrong(`A balloon rises when its engine starts. The pilot uses a steering wheel to turn left and right, just like a car.`, 'contradicts-text'),
          right(`A burner heats the air inside a balloon, making it lighter so the balloon rises. Cooling the air brings it down, and pilots use winds to travel.`),
        ], `The summary about the burner heating the air covers rising, sinking, and steering with the wind, which are the key ideas. The summary listing the envelope, basket, and burner is true but only tells about the parts from paragraph 2.`),
        q(10, 'hard', `Which sentence from the passage best states its central idea?`, [
          wrong(`Under it hangs a basket where the pilot and riders stand.`, 'too-narrow'),
          wrong(`Then the balloon sinks slowly back toward the earth.`, 'too-narrow'),
          right(`Instead, it rises because of one simple fact: hot air is lighter than cool air.`),
          wrong(`A pilot cannot steer a balloon the way a driver steers a car.`, 'too-narrow'),
        ], `This sentence names the big idea that the rest of the passage explains: heating and cooling the air controls the balloon. The other sentences each describe one part or one step.`),
      ],
    },
    {
      code: 'rg4-main-idea-summary-p03',
      title: 'Sea Otters Protect the Kelp Forest',
      body: `Along some rocky coasts, tall seaweed called kelp grows in thick underwater forests. Fish hide among its long leaves. Crabs, snails, and seals live there too. A small, furry animal helps keep this forest healthy: the sea otter.\n\nSea otters eat many kinds of sea animals, but one favorite is the sea urchin. A sea urchin is a round, spiny creature that crawls along the sea floor. Urchins eat kelp. They chew through the bottom of the plant, and then the whole plant floats away.\n\nWhen there are plenty of otters, they eat lots of urchins. The number of urchins stays small, so the kelp can grow tall. When otters disappear from an area, urchins can spread quickly. In a few years, they may eat a whole kelp forest down to bare rock.\n\nScientists have seen this happen. In some places, otters became rare, and the kelp vanished. Later, when otters returned, the kelp forests grew back. Fish and other animals came back as well.\n\nThis shows how one animal can matter to a whole community of living things. By eating urchins, sea otters help protect a home for hundreds of other creatures.`,
      items: [
        q(11, 'easy', `What is the main idea of the passage?`, [
          wrong(`Sea urchins are round, spiny creatures that crawl on the sea floor.`, 'too-narrow'),
          right(`Sea otters keep kelp forests healthy by eating the urchins that eat kelp.`),
          wrong(`The ocean is home to many kinds of fish, crabs, snails, and seals.`, 'too-broad'),
          wrong(`Sea otters should be kept in zoos so that people can visit them.`, 'unsupported-inference'),
        ], `The passage explains how otters eat urchins, which lets kelp grow and gives other animals a home. The description of urchins is only one supporting detail.`),
        q(12, 'easy', `Which detail explains why sea urchins are a problem for kelp?`, [
          wrong(`Fish hide among its long leaves.`, 'wrong-supporting-detail'),
          wrong(`Crabs, snails, and seals live there too.`, 'wrong-supporting-detail'),
          wrong(`Fish and other animals came back as well.`, 'wrong-supporting-detail'),
          right(`They chew through the bottom of the plant, and then the whole plant floats away.`),
        ], `Paragraph 2 says urchins chew through the bottom of the kelp so it floats away, which explains the harm they do. The other details are about animals that live in the forest.`),
        q(13, 'medium', `How does paragraph 4 support the central idea?`, [
          right(`It gives real examples showing that kelp returned when otters returned.`),
          wrong(`It describes what a sea urchin looks like and where it lives.`, 'misreads-structure'),
          wrong(`It explains what sea otters like to eat besides sea urchins.`, 'misreads-structure'),
          wrong(`It shows that scientists want to remove all urchins from the sea.`, 'unsupported-inference'),
        ], `Paragraph 4 tells what scientists saw: kelp vanished when otters left and grew back when they returned. This is proof for the central idea. The look of urchins is in paragraph 2.`),
        q(14, 'medium', `Which is the best summary of the passage?`, [
          wrong(`Kelp is a tall seaweed. Fish hide in its leaves, and crabs, snails, and seals live there too.`, 'too-narrow'),
          right(`Sea otters eat urchins, which eat kelp. With otters around, kelp forests stay healthy and give many animals a home.`),
          wrong(`Sea otters eat kelp all day long. When there are too many otters, the kelp forests disappear.`, 'contradicts-text'),
          wrong(`Sea otters are the cutest animals in the ocean. People should never let anything bad happen to them.`, 'includes-opinion'),
        ], `The summary "Sea otters eat urchins, which eat kelp" tells how otters, urchins, and kelp are connected and why it matters. The summary saying otters eat kelp all day gets the facts backward, since urchins, not otters, eat the kelp.`),
        q(15, 'hard', `Which detail is LEAST important to include in a summary of the passage?`, [
          wrong(`Sea otters eat sea urchins.`, 'misidentifies-key-idea'),
          wrong(`Urchins can eat a kelp forest down to bare rock.`, 'misidentifies-key-idea'),
          right(`A sea urchin is round and covered with spines.`),
          wrong(`When otters returned, the kelp forests grew back.`, 'misidentifies-key-idea'),
        ], `What an urchin looks like does not help explain how otters protect the kelp, so it can be left out. The other three details are steps in the chain that make up the central idea.`),
      ],
    },
    {
      code: 'rg4-main-idea-summary-p04',
      title: 'The Bicycle Changes Over Time',
      body: `The bicycles people ride today took many years to develop. Early inventors tried many ideas before they found a design that was safe and easy to ride.\n\nOne of the first bikes was built about two hundred years ago. It had two wheels and a seat, but no pedals. Riders sat on it and pushed along the ground with their feet. It was fun on smooth paths, but slow and hard on bumpy roads.\n\nLater, makers added pedals to the front wheel. To go faster, they made the front wheel bigger and bigger. Some front wheels were almost as tall as a grown person! These high bikes were fast, but riders sat far above the ground. A small rock could make a rider tumble forward.\n\nThen came a design called the safety bicycle. Its two wheels were the same size. A chain connected the pedals to the back wheel. Riders sat lower, so they could put their feet on the ground. Soon, air-filled rubber tires made rides much smoother.\n\nThe safety bicycle quickly became popular. Workers rode to their jobs, and children rode to school. The basic shape of that bike is still used today, more than one hundred years later.`,
      items: [
        q(16, 'easy', `What is the main idea of the passage?`, [
          wrong(`Some old bicycles had front wheels almost as tall as a grown person.`, 'too-narrow'),
          wrong(`Riding a bicycle is a healthy way to get to work or school.`, 'unsupported-inference'),
          wrong(`People have invented many ways to travel from place to place.`, 'too-broad'),
          right(`The bicycle changed over many years until it became safe and easy to ride.`),
        ], `The passage follows the bicycle from a bike with no pedals to the safety bicycle used today. The tall front wheel is one detail from paragraph 3.`),
        q(17, 'easy', `Which detail shows that the high bikes were not safe?`, [
          right(`A small rock could make a rider tumble forward.`),
          wrong(`Later, makers added pedals to the front wheel.`, 'wrong-supporting-detail'),
          wrong(`Its two wheels were the same size.`, 'wrong-supporting-detail'),
          wrong(`Workers rode to their jobs, and children rode to school.`, 'wrong-supporting-detail'),
        ], `Paragraph 3 says a small rock could make a rider tumble, which shows the danger. The same-size wheels describe the later safety bicycle instead.`),
        q(18, 'medium', `What is paragraph 2 mostly about?`, [
          wrong(`Why riders liked the high bikes with giant front wheels`, 'wrong-paragraph'),
          right(`An early bike that riders moved by pushing with their feet`),
          wrong(`How a chain connects the pedals to the back wheel`, 'wrong-paragraph'),
          wrong(`Why smooth paths are more fun than bumpy roads`, 'too-narrow'),
        ], `Paragraph 2 describes one of the first bikes, which had no pedals, so riders pushed along the ground. The chain belongs to the safety bicycle in paragraph 4.`),
        q(19, 'medium', `Which is the best summary of the passage?`, [
          wrong(`The safety bicycle had a chain and two wheels of the same size. Later it got air-filled rubber tires.`, 'too-narrow'),
          wrong(`The first bicycle was the safety bicycle. Later, makers made the front wheel much bigger to make it safer.`, 'wrong-sequence'),
          right(`Early bikes had no pedals, and later ones had huge, risky front wheels. The safety bicycle fixed these problems and is still used today.`),
          wrong(`Bicycles are much better than cars. Everyone should ride a bike instead of driving to work each day.`, 'includes-opinion'),
        ], `The summary that starts with early bikes having no pedals tells the main changes in order and how the story ends. The summary saying the first bicycle was the safety bicycle mixes up the order, since the safety bicycle came after the high bikes.`),
        q(20, 'hard', `How does the author develop the central idea of the passage?`, [
          wrong(`By comparing bicycles with cars and explaining which is faster`, 'misreads-structure'),
          wrong(`By giving the author's reasons that everyone should ride bikes`, 'misreads-structure'),
          right(`By describing bike designs in time order, each fixing a problem`),
          wrong(`By explaining step by step how to repair a broken bicycle`, 'misreads-structure'),
        ], `Each paragraph describes the next design and the problem it solved, from no pedals, to high wheels, to the safety bicycle. The passage does not argue an opinion or compare bikes with cars.`),
      ],
    },
    {
      code: 'rg4-main-idea-summary-p05',
      title: 'Wheelchair Basketball',
      body: `Wheelchair basketball is a fast and exciting sport. Players who use wheelchairs, as well as some who have leg injuries, can all play. The game is a lot like regular basketball, but a few rules are changed to fit the chairs.\n\nThe court and the hoop are the same size as in other basketball games. The ball is the same, too. Players still pass, dribble, and shoot at a basket ten feet high. Shooting from a seated position takes strong arms and lots of practice.\n\nSome rules are different. A player may push the wheels twice while holding the ball. After that, the player must pass, shoot, or bounce the ball. Players can bump chairs a little, but they may not crash into each other on purpose.\n\nThe chairs are special, too. Sports wheelchairs are light and low to the ground. Their wheels tilt outward at the bottom. This shape helps players turn quickly without tipping over.\n\nToday, wheelchair basketball is played in schools, clubs, and big international games. Teams practice hard and play with great skill. The sport shows that with a few smart changes, a game can welcome many more players.`,
      items: [
        q(21, 'easy', `What is the main idea of the passage?`, [
          wrong(`Sports wheelchairs have wheels that tilt outward at the bottom.`, 'too-narrow'),
          right(`Wheelchair basketball is like basketball, with a few changes for chairs.`),
          wrong(`Many sports are played in schools, clubs, and international games.`, 'too-broad'),
          wrong(`Wheelchair basketball is harder to learn than any other sport.`, 'unsupported-inference'),
        ], `The passage explains what stays the same, which rules change, and how the chairs are built for the game. The tilted wheels are one detail from paragraph 4.`),
        q(22, 'medium', `What is the main idea of paragraph 3?`, [
          wrong(`The ball and the hoop are the same as in other basketball games.`, 'wrong-paragraph'),
          wrong(`Players may push their wheels exactly two times while holding the ball.`, 'too-narrow'),
          right(`Some rules in wheelchair basketball are changed to fit the chairs.`),
          wrong(`Sports wheelchairs are light and sit low to the ground.`, 'wrong-paragraph'),
        ], `Paragraph 3 begins by saying some rules are different and then gives examples. The two pushes rule is one of those examples, not the main idea of the whole paragraph.`),
        q(23, 'medium', `Which detail best supports the idea that the game is a lot like regular basketball?`, [
          right(`Players still pass, dribble, and shoot at a basket ten feet high.`),
          wrong(`A player may push the wheels twice while holding the ball.`, 'wrong-supporting-detail'),
          wrong(`Their wheels tilt outward at the bottom.`, 'wrong-supporting-detail'),
          wrong(`Players can bump chairs a little, but they may not crash.`, 'wrong-supporting-detail'),
        ], `Passing, dribbling, and shooting at a ten foot basket are the same as in regular basketball. The pushing rule is tempting, but it shows a difference, not a likeness.`),
        q(24, 'medium', `Which is the best summary of the passage?`, [
          wrong(`Sports wheelchairs are light and low. Their tilted wheels help players turn quickly without tipping over during a game.`, 'too-narrow'),
          wrong(`Wheelchair basketball uses a smaller court and a lower hoop so that players can reach the basket from their seats.`, 'contradicts-text'),
          wrong(`Wheelchair basketball is the best sport ever invented. Every school should have a team and play it every single day.`, 'includes-opinion'),
          right(`Wheelchair basketball uses the same court, ball, and hoop as basketball. Some rules change, and special chairs help players move fast.`),
        ], `The summary about the same court, ball, and hoop includes what is the same, what changes, and the special chairs. The summary about a smaller court and a lower hoop is wrong because the passage says the court and hoop are the same size.`),
        q(25, 'hard', `How does the last paragraph connect to the central idea of the passage?`, [
          wrong(`It adds a new topic about how teams travel to international games.`, 'misreads-structure'),
          right(`It sums up that small changes let many more players enjoy the game.`),
          wrong(`It explains the rule about how many times players may push their wheels.`, 'wrong-paragraph'),
          wrong(`It argues that regular basketball should use wheelchairs as well.`, 'unsupported-inference'),
        ], `The last sentence says a few smart changes help a game welcome more players, which ties together the rules and chairs described earlier. It does not start a new topic about travel.`),
      ],
    },
    {
      code: 'rg4-main-idea-summary-p06',
      title: 'The Art of Shadow Puppets',
      body: `Shadow puppetry is one of the oldest kinds of storytelling. People in many parts of the world have used it for hundreds of years. All it needs is a light, a screen, and some puppets.\n\nThe puppets are flat cutouts. Long ago, makers often cut them from dried animal skin. Today, many are made from stiff paper or cardboard. Tiny holes and cut shapes let light shine through to show eyes, clothing patterns, and other details. Thin sticks are attached so the puppeteer can move the arms and legs.\n\nFor a show, a bright light is placed behind a white cloth screen. The puppeteer holds the puppets between the light and the screen. The audience sits on the other side. They do not see the puppets themselves, only their dark shadows.\n\nPuppeteers use clever tricks. Moving a puppet closer to the light makes its shadow grow larger. Moving it toward the screen makes the shadow smaller and sharper. Music and voices help bring each story to life.\n\nBecause the tools are simple, almost anyone can try shadow puppetry. Students can make puppets in art class and put on a show with a flashlight and a bedsheet.`,
      items: [
        q(26, 'easy', `What is the main idea of the passage?`, [
          wrong(`Shadow puppets were once cut from dried animal skin.`, 'too-narrow'),
          wrong(`Shadow puppet shows are more fun to watch than movies.`, 'unsupported-inference'),
          right(`Shadow puppetry is an old art that tells stories with light and shadows.`),
          wrong(`People all over the world enjoy many kinds of art and music.`, 'too-broad'),
        ], `The passage explains how shadow puppets are made, how a show works, and why anyone can try it. Animal skin puppets are one detail from paragraph 2.`),
        q(27, 'medium', `What is paragraph 2 mostly about?`, [
          right(`How shadow puppets are made and moved`),
          wrong(`Where the audience sits during a show`, 'wrong-paragraph'),
          wrong(`How music helps bring a story to life`, 'wrong-paragraph'),
          wrong(`Why stiff paper is better than animal skin`, 'unsupported-inference'),
        ], `Paragraph 2 describes what puppets are made of, the holes that show details, and the sticks that move them. The audience is described in paragraph 3.`),
        q(28, 'medium', `Which detail best supports the idea that puppeteers use clever tricks?`, [
          wrong(`The puppets are flat cutouts.`, 'wrong-supporting-detail'),
          wrong(`The audience sits on the other side.`, 'wrong-supporting-detail'),
          right(`Moving a puppet closer to the light makes its shadow grow larger.`),
          wrong(`People in many parts of the world have used it for hundreds of years.`, 'wrong-supporting-detail'),
        ], `Changing a shadow's size by moving the puppet is one of the tricks paragraph 4 describes. That the puppets are flat is a fact about their shape, not a trick.`),
        q(29, 'medium', `Which is the best summary of the passage?`, [
          wrong(`Shadow puppets have tiny holes that show eyes and clothing. Thin sticks are attached to move the arms and legs.`, 'too-narrow'),
          right(`Shadow puppetry is an old way to tell stories. Puppeteers hold flat puppets between a light and a screen, and the audience watches the shadows.`),
          wrong(`In a shadow puppet show, the audience sits behind the light and watches the colorful puppets move on a small stage.`, 'contradicts-text'),
          wrong(`Shadow puppetry is the most wonderful art in the world. Every student should give up painting and make puppets instead.`, 'includes-opinion'),
        ], `The summary "Shadow puppetry is an old way to tell stories" tells what shadow puppetry is and how a show works. The summary about colorful puppets on a small stage is wrong because the audience sits on the other side of the screen and sees only shadows.`),
        q(30, 'hard', `Which sentence would NOT belong in an objective summary of the passage?`, [
          wrong(`The audience sees the puppets' shadows on a cloth screen.`, 'misidentifies-key-idea'),
          wrong(`Puppeteers move puppets to make shadows bigger or smaller.`, 'misidentifies-key-idea'),
          wrong(`Shadow puppetry has been used for hundreds of years.`, 'misidentifies-key-idea'),
          right(`Shadow puppets are much more interesting than toy dolls.`),
        ], `An objective summary leaves out personal opinions, and the passage never compares puppets with dolls. The other three sentences restate facts from the passage.`),
      ],
    },
    {
      code: 'rg4-main-idea-summary-p07',
      title: 'How Smart Traffic Lights Work',
      body: `Some traffic lights change on a timer. They turn green and red after the same number of seconds, all day long. But many newer traffic lights are smarter. They can sense cars and change when they are needed.\n\nOne common tool is a loop of wire buried under the road. Electricity runs through the wire. When a car stops on top of it, the metal in the car changes the signal. The traffic light then knows a car is waiting.\n\nOther lights use small cameras mounted on poles. A computer looks at the pictures and counts the cars in each lane. If one street has a long line, the light can stay green there a little longer.\n\nSmart lights help people in several ways. Drivers spend less time sitting at empty red lights. Cars waste less fuel while waiting. Many crossings also have buttons for people walking. When someone presses the button, the light knows to give them time to cross.\n\nEngineers keep improving these systems. In some cities, nearby lights share information with each other. That way, a line of cars can roll through several green lights in a row.`,
      items: [
        q(31, 'easy', `What is the main idea of the passage?`, [
          wrong(`Some traffic lights use a loop of wire buried under the road.`, 'too-narrow'),
          wrong(`Cities should get rid of all the old traffic lights right away.`, 'unsupported-inference'),
          wrong(`Cities use many machines to keep their streets safe and clean.`, 'too-broad'),
          right(`Smart traffic lights sense cars and people so they change when needed.`),
        ], `The passage explains how smart lights sense traffic with wires, cameras, and buttons, and how this helps people. The wire loop is just one of those tools.`),
        q(32, 'medium', `What is the main idea of paragraph 4?`, [
          right(`Smart lights help drivers and people walking in several ways.`),
          wrong(`Cameras on poles count the cars waiting in each lane.`, 'wrong-paragraph'),
          wrong(`People walking can press a button at many crossings.`, 'too-narrow'),
          wrong(`Nearby lights in some cities share information.`, 'wrong-paragraph'),
        ], `Paragraph 4 opens by saying smart lights help people in several ways and then lists them. The button is only one of the ways, so it is too narrow.`),
        q(33, 'medium', `Which detail supports the idea that smart lights can sense cars?`, [
          wrong(`They turn green and red after the same number of seconds.`, 'wrong-supporting-detail'),
          right(`When a car stops on top of it, the metal in the car changes the signal.`),
          wrong(`Engineers keep improving these systems.`, 'wrong-supporting-detail'),
          wrong(`Cars waste less fuel while waiting.`, 'wrong-supporting-detail'),
        ], `Paragraph 2 explains that a car's metal changes the signal in the wire, which is how the light senses it. The timer detail describes old lights that do not sense cars.`),
        q(34, 'hard', `Which is the best summary of the passage?`, [
          wrong(`A computer looks at pictures from cameras and counts the cars in each lane. If one line is long, the light stays green longer there.`, 'too-narrow'),
          wrong(`Traffic lights all change on timers. Engineers are trying to make the timers faster so that drivers never have to wait.`, 'contradicts-text'),
          right(`Unlike timer lights, smart lights use wires, cameras, and buttons to sense traffic. This saves time and fuel, and engineers keep improving them.`),
          wrong(`Smart traffic lights are the greatest invention ever made. Every town should spend all of its money on new lights.`, 'includes-opinion'),
        ], `The summary that starts "Unlike timer lights" covers how smart lights sense traffic, how they help, and how they are improving. The summary about cameras counting cars is accurate but only retells paragraph 3.`),
        q(35, 'hard', `Why does the author begin the passage by describing lights that change on a timer?`, [
          wrong(`To show that timer lights are the newest kind of traffic light`, 'contradicts-text'),
          wrong(`To explain how a loop of wire under the road senses a car`, 'misreads-purpose'),
          right(`To set up a contrast that shows what makes smart lights different`),
          wrong(`To argue that timer lights cause drivers to waste more fuel`, 'misreads-purpose'),
        ], `Timer lights change the same way all day, so describing them first helps readers see that smart lights are different because they sense traffic. The wire loop is explained later, in paragraph 2.`),
      ],
    },
    {
      code: 'rg4-main-idea-summary-p08',
      title: 'Why Our School Needs a Walking Club',
      body: `Our school should start a walking club that meets before classes begin. A walking club would help students be healthier, happier, and ready to learn.\n\nFirst, walking is good exercise. Doctors say children need to move their bodies every day. Many students ride to school in a bus or a car and then sit for hours. A short walk around the field each morning would give everyone a healthy start.\n\nSecond, walking helps students feel calm and focused. After moving outside in fresh air, many people find it easier to pay attention. Our teachers have noticed that students are often restless in the first class of the day. A walk could help with that.\n\nThird, a walking club would help students make friends. Walking side by side is a great time to talk. Students from different grades could meet each other and share ideas.\n\nSome people may worry that a club would cost too much money. However, walking needs no special equipment. All we need is the school field, a few parent helpers, and comfortable shoes.\n\nFor all these reasons, our school should start a walking club. Let's take the first step together!`,
      items: [
        q(36, 'easy', `What is the main idea of the passage?`, [
          wrong(`Students from different grades could meet each other on walks.`, 'too-narrow'),
          right(`The school should start a morning walking club to help students.`),
          wrong(`Exercise is important for people of every age around the world.`, 'too-broad'),
          wrong(`Students are restless because they ride the bus to school.`, 'confuses-cause-effect'),
        ], `The writer states this claim in the first and last paragraphs and gives reasons for it in between. Meeting students from other grades is only one supporting point.`),
        q(37, 'medium', `Which reason does the writer give to support the main idea?`, [
          wrong(`A walking club would help the school win sports trophies.`, 'unsupported-inference'),
          wrong(`Walking would let students skip their first class of the day.`, 'contradicts-text'),
          right(`Walking would help students feel calm and focused before class.`),
          wrong(`A walking club would raise money to buy new sports equipment.`, 'unsupported-inference'),
        ], `Paragraph 3 says walking helps students feel calm and focused. The writer never mentions trophies or skipping class, so those choices are not supported.`),
        q(38, 'medium', `How does paragraph 5 support the writer's main idea?`, [
          wrong(`It gives a new reason about making friends on the walk.`, 'wrong-paragraph'),
          right(`It answers a worry about cost by showing a club is cheap.`),
          wrong(`It explains why students need to move every single day.`, 'wrong-paragraph'),
          wrong(`It suggests that the school should buy special shoes.`, 'literal-reading'),
        ], `Paragraph 5 admits some people may worry about money, then explains that walking needs no special equipment. Making friends is the reason in paragraph 4.`),
        q(39, 'hard', `Which is the best summary of the passage?`, [
          right(`The writer thinks the school should start a morning walking club. It would help students be healthy, focused, and friendly, and it would cost very little.`),
          wrong(`Doctors say children need to move every day. Many students ride to school and then sit for hours, so a walk would give them a healthy start.`, 'too-narrow'),
          wrong(`The school already has a walking club that meets after school. Parent helpers bring special equipment so students can walk around the field.`, 'contradicts-text'),
          wrong(`The writer thinks students should stop riding the bus and walk all the way to school each morning so they can meet new friends.`, 'misreads-claim'),
        ], `The summary about the writer wanting a morning walking club states the claim and all the main reasons, including the answer about cost. The summary about doctors saying children need to move is accurate but only covers the first reason from paragraph 2.`),
        q(40, 'hard', `How does the writer develop the central idea of the passage?`, [
          wrong(`By telling a story about one student's first day in the club`, 'misreads-structure'),
          wrong(`By explaining the history of walking clubs at other schools`, 'misreads-structure'),
          wrong(`By comparing walking with other sports such as soccer and running`, 'misreads-structure'),
          right(`By giving three reasons in order and then answering a worry`),
        ], `The writer uses "First," "Second," and "Third" to give reasons, then answers the worry about cost before restating the claim. The passage does not tell a story or give any history.`),
      ],
    },
  ],
}

export default skill
