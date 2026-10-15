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
  slug: 'read-g4-evidence-inference',
  subject: 'reading',
  grade: 4,
  group: 'Informational text',
  name: 'Key Details, Evidence and Inference',
  standards: ['RI.4.1'],
  passages: [
    {
      code: 'rg4-evidence-inference-p01',
      title: 'How a Hot Air Balloon Flies',
      body: `A hot air balloon has three main parts. There is a giant cloth bag called the envelope. There is a basket where people stand. Between them is a burner that makes a big flame.\n\nThe balloon flies because hot air is lighter than cool air. When the pilot turns on the burner, the air inside the envelope gets hot. The hot air pushes the balloon up into the sky. To come down, the pilot lets the air cool off. The balloon then sinks slowly toward the ground.\n\nA pilot cannot steer a balloon the way a driver steers a car. There is no wheel and no motor to push it sideways. Instead, the pilot moves the balloon up or down to find winds blowing in different directions. A wind near the ground might blow east, while a wind higher up might blow north.\n\nMost balloon flights take place early in the morning or near sunset. At those times, the winds are usually calm and gentle. A crew on the ground follows the balloon in a truck. When the balloon lands, the crew helps fold the envelope and pack everything away.`,
      items: [
        q(1, 'easy', `According to the passage, what makes a hot air balloon rise?`, [
          right(`The burner heats the air inside the envelope.`),
          wrong(`A motor under the basket pushes it upward.`, 'misreads-detail'),
          wrong(`The crew lifts it from the ground with a truck.`, 'misreads-detail'),
          wrong(`Cool morning air fills the big cloth bag.`, 'confuses-cause-effect'),
        ], `Paragraph 2 says the burner heats the air in the envelope and "the hot air pushes the balloon up." Cool air is what makes the balloon sink, not rise.`),
        q(2, 'easy', `Which detail from the passage tells how a pilot brings the balloon down?`, [
          right(`The pilot lets the air inside cool off.`),
          wrong(`The pilot turns the burner flame higher.`, 'opposite-detail'),
          wrong(`The crew follows the balloon in a truck.`, 'wrong-supporting-detail'),
          wrong(`The pilot looks for a wind blowing east.`, 'wrong-supporting-detail'),
        ], `The passage says, "To come down, the pilot lets the air cool off." Turning up the burner would make the air hotter and push the balloon higher.`),
        q(3, 'medium', `What can the reader infer about where a balloon will land?`, [
          right(`The pilot cannot know the exact spot ahead of time.`),
          wrong(`It always lands back where it first took off.`, 'unsupported-inference'),
          wrong(`The pilot picks the spot and drives straight to it.`, 'contradicts-text'),
          wrong(`It lands wherever the crew parks the truck first.`, 'confuses-cause-effect'),
        ], `The balloon goes where the winds carry it, and the crew has to follow it in a truck, so the pilot cannot plan an exact landing spot. The text says a balloon cannot be steered like a car, so the pilot cannot drive straight to a spot.`),
        q(4, 'medium', `Which sentence best supports the idea that a pilot must know about the wind?`, [
          right(`"Instead, the pilot moves the balloon up or down to find winds blowing in different directions."`),
          wrong(`"There is a basket where people stand."`, 'wrong-supporting-detail'),
          wrong(`"The balloon flies because hot air is lighter than cool air."`, 'wrong-supporting-detail'),
          wrong(`"When the balloon lands, the crew helps fold the envelope."`, 'wrong-supporting-detail'),
        ], `The pilot uses winds at different heights to change direction, so knowing the wind is part of flying. The sentence about hot air explains rising, not where the balloon goes.`),
        q(5, 'hard', `Why do most balloon flights happen early in the morning or near sunset? Choose the answer the passage best supports:`, [
          right(`Calm, gentle winds make the flight safer and easier to control.`),
          wrong(`The burner flame is easier to see when the sky is dark.`, 'unsupported-inference'),
          wrong(`The crew needs the middle of the day to drive the truck.`, 'unsupported-inference'),
          wrong(`Hot air rises only when the air outside is very cold.`, 'overgeneralizes'),
        ], `Paragraph 4 says that at those times "the winds are usually calm and gentle," and paragraph 3 shows wind controls where a balloon goes. Nothing in the passage says the flame needs a dark sky.`),
      ],
    },
    {
      code: 'rg4-evidence-inference-p02',
      title: 'Riders of the Mail Trail',
      body: `Long ago, sending a letter across the western United States could take weeks. In 1860, a company started a fast mail service with riders on horseback. People called it the Pony Express.\n\nThe trail stretched nearly two thousand miles. Small stations stood along the way. At each station, a rider jumped onto a fresh horse and kept going. Tired horses could not run fast, so the switch saved a lot of time. After many hours, a rider handed the mail bag to the next rider.\n\nThe riders had to travel light. They carried the mail in a leather cover that fit over the saddle. Letters were written on very thin paper to keep the load small. Sending one letter cost a lot of money, so most people could not afford it.\n\nWith this system, mail crossed the trail in about ten days. That was much faster than before. But the Pony Express lasted only about a year and a half. In 1861, workers finished a telegraph line across the country. Now messages could travel by wire in minutes. The riders were no longer needed.`,
      items: [
        q(6, 'easy', `According to the passage, why did riders switch to a fresh horse at each station?`, [
          right(`Tired horses could not run fast.`),
          wrong(`The horses had to carry the mail bag home.`, 'unsupported-inference'),
          wrong(`Each station owned only one horse.`, 'unsupported-inference'),
          wrong(`The riders wanted to rest and sleep.`, 'misreads-detail'),
        ], `Paragraph 2 says, "Tired horses could not run fast, so the switch saved a lot of time." The passage never says the switch was so riders could rest.`),
        q(7, 'easy', `How long did mail take to cross the trail by Pony Express?`, [
          right(`About ten days`),
          wrong(`A few minutes`, 'confuses-details'),
          wrong(`Several weeks`, 'confuses-details'),
          wrong(`A year and a half`, 'confuses-details'),
        ], `Paragraph 4 says mail "crossed the trail in about ten days." A few minutes was the telegraph, and weeks was the time before the Pony Express.`),
        q(8, 'medium', `Which detail best supports the idea that riders tried to keep their load light?`, [
          right(`Letters were written on very thin paper.`),
          wrong(`Small stations stood along the way.`, 'wrong-supporting-detail'),
          wrong(`The trail stretched nearly two thousand miles.`, 'wrong-supporting-detail'),
          wrong(`Sending one letter cost a lot of money.`, 'wrong-supporting-detail'),
        ], `The passage says thin paper was used "to keep the load small." The high cost is a true detail, but it is about price, not weight.`),
        q(9, 'medium', `What can the reader infer about who used the Pony Express?`, [
          right(`Mostly people who had important news and money to pay.`),
          wrong(`Almost every family sent letters by it each week.`, 'contradicts-text'),
          wrong(`Only the riders and their families used it.`, 'unsupported-inference'),
          wrong(`Mainly children who wanted to write to friends.`, 'unsupported-inference'),
        ], `The text says one letter "cost a lot of money, so most people could not afford it," so the users were people who could pay for fast news. That rules out almost every family using it every week.`),
        q(10, 'hard', `Which two details together best explain why the Pony Express ended?`, [
          right(`A telegraph line was finished, and it sent messages in minutes.`),
          wrong(`Riders used fresh horses, and stations were along the trail.`, 'supports-different-claim'),
          wrong(`Letters cost a lot, and they were written on thin paper.`, 'too-narrow'),
          wrong(`The trail was long, and riders handed off the mail bag.`, 'supports-different-claim'),
        ], `Paragraph 4 says the telegraph sent messages "in minutes," so "the riders were no longer needed." The cost of letters is true, but the passage does not give it as the reason the service ended.`),
      ],
    },
    {
      code: 'rg4-evidence-inference-p03',
      title: 'A Sea Turtle Nest',
      body: `On warm summer nights, a mother sea turtle crawls out of the ocean onto a sandy beach. She moves slowly because her flippers are made for swimming, not walking. Above the high tide line, she digs a deep hole with her back flippers. Then she lays about one hundred eggs, each about the size of a ping-pong ball.\n\nWhen she is done, the mother covers the eggs with sand. She returns to the sea and does not come back for them. The warm sand keeps the eggs safe while the babies grow inside.\n\nAbout two months later, the tiny turtles hatch. They usually dig out at night, when the sand is cooler. Then they scramble toward the water. The hatchlings find the sea by heading toward the brightest light. On a natural beach, that light is the moon and stars shining on the waves.\n\nBright lights from buildings can confuse the hatchlings and lead them the wrong way. For this reason, some beach towns ask people to turn off outdoor lights during nesting season. Volunteers also put small fences around nests so that no one steps on them.`,
      items: [
        q(11, 'easy', `Where does the mother turtle dig her nest?`, [
          right(`Above the high tide line on the beach`),
          wrong(`Under the waves near the shore`, 'misreads-detail'),
          wrong(`Inside a fence that volunteers build`, 'confuses-sequence'),
          wrong(`Next to bright lights from buildings`, 'misreads-detail'),
        ], `Paragraph 1 says she digs "above the high tide line." Volunteers put up fences after the nest is made, so the fence does not come first.`),
        q(12, 'medium', `Which detail shows that the baby turtles take care of themselves after hatching?`, [
          right(`The mother returns to the sea and does not come back.`),
          wrong(`The mother lays about one hundred eggs in one nest.`, 'wrong-supporting-detail'),
          wrong(`The eggs are each about the size of a ping-pong ball.`, 'wrong-supporting-detail'),
          wrong(`The mother moves slowly when she crawls on the sand.`, 'wrong-supporting-detail'),
        ], `Since the mother "does not come back for them," the hatchlings must find the sea on their own. The number of eggs is a true detail, but it says nothing about who cares for the babies.`),
        q(13, 'medium', `Why do some beach towns ask people to turn off outdoor lights?`, [
          right(`Bright lights can lead the hatchlings the wrong way.`),
          wrong(`Bright lights make the sand too hot for the eggs.`, 'unsupported-inference'),
          wrong(`Bright lights wake the mother turtles in the sea.`, 'unsupported-inference'),
          wrong(`Bright lights make it hard for volunteers to see.`, 'confuses-cause-effect'),
        ], `Paragraph 4 says lights from buildings "can confuse the hatchlings and lead them the wrong way." The passage never says lights heat the sand.`),
        q(14, 'hard', `What can the reader infer about the hatchlings that dig out of the sand at night?`, [
          right(`The cooler sand and the moonlit waves help them reach the sea.`),
          wrong(`They wait on the beach until their mother returns for them.`, 'contradicts-text'),
          wrong(`They need the volunteers to carry them down to the water.`, 'unsupported-inference'),
          wrong(`They hatch at night because the eggs are hidden by fences.`, 'confuses-cause-effect'),
        ], `The text says the sand is cooler at night and hatchlings head toward the moon and stars on the waves, so night is a good time to reach the sea. The mother never comes back, so they do not wait for her.`),
        q(15, 'hard', `A student says, "People can help sea turtles survive." Which pair of details best supports this?`, [
          right(`Towns turn off outdoor lights, and volunteers put fences around nests.`),
          wrong(`The mother digs with her back flippers, and she covers the eggs.`, 'supports-different-claim'),
          wrong(`The eggs hatch in two months, and the babies dig out at night.`, 'supports-different-claim'),
          wrong(`Hatchlings head toward light, and buildings have bright lights.`, 'too-narrow'),
        ], `Turning off lights and fencing nests are things people do to protect turtles, as paragraph 4 explains. The details about light alone show a danger but not how people help.`),
      ],
    },
    {
      code: 'rg4-evidence-inference-p04',
      title: 'The Shape of a Snowflake',
      body: `Every snowflake begins high up in a cloud. The air there is very cold. A tiny bit of dust or pollen floats in the cloud. Water vapor, which is water in the form of a gas, freezes onto this speck. A small ice crystal begins to form.\n\nAs the crystal falls, more water vapor freezes onto it. The crystal grows arms. Almost every snowflake has six sides or six arms. This happens because of the way water freezes into ice.\n\nThe shape of each arm depends on the air the crystal falls through. Colder or wetter air can give the arms a different pattern. Two crystals hardly ever travel through exactly the same air. That is why no two snowflakes look exactly alike.\n\nScientists study snowflakes by catching them on dark cloth. They look at them through a magnifying lens before they melt. Some people even take close-up photos. By looking at a snowflake's shape, a scientist can learn about the air high above the ground.`,
      items: [
        q(16, 'easy', `According to the passage, what does a snowflake form around?`, [
          right(`A tiny bit of dust or pollen`),
          wrong(`A drop of melted snow`, 'misreads-detail'),
          wrong(`A piece of dark cloth`, 'confuses-details'),
          wrong(`A small raindrop from the ground`, 'misreads-detail'),
        ], `Paragraph 1 says water vapor freezes onto "a tiny bit of dust or pollen." The dark cloth is what scientists use to catch snowflakes later.`),
        q(17, 'medium', `Which sentence best explains why no two snowflakes look exactly alike?`, [
          right(`"Two crystals hardly ever travel through exactly the same air."`),
          wrong(`"Almost every snowflake has six sides or six arms."`, 'wrong-supporting-detail'),
          wrong(`"The air there is very cold."`, 'wrong-supporting-detail'),
          wrong(`"Some people even take close-up photos."`, 'wrong-supporting-detail'),
        ], `Paragraph 3 explains that the air shapes each arm, and each crystal falls through different air. Having six arms is something snowflakes share, so it cannot explain why they differ.`),
        q(18, 'medium', `Why do scientists catch snowflakes on dark cloth? Choose the answer best supported by the text:`, [
          right(`So the white flakes are easy to see before they melt`),
          wrong(`So the flakes grow more arms while they rest`, 'unsupported-inference'),
          wrong(`So the dust inside each flake falls out`, 'unsupported-inference'),
          wrong(`So the flakes can be saved for many years`, 'contradicts-text'),
        ], `The text says scientists look at the flakes "before they melt," so they must see them fast, and white snow stands out on dark cloth. The flakes do not last, so they cannot be saved for years.`),
        q(19, 'hard', `A scientist finds snowflakes with unusual arms. What can the scientist most likely learn from them?`, [
          right(`Something about the air the flakes fell through`),
          wrong(`How many snowflakes fell during the storm`, 'unsupported-inference'),
          wrong(`Which kind of pollen grows best in winter`, 'unsupported-inference'),
          wrong(`How fast the snow will melt on the ground`, 'unsupported-inference'),
        ], `Paragraph 4 says a snowflake's shape tells "about the air high above the ground," and paragraph 3 says the air shapes each arm. The passage never links arm shape to how many flakes fell.`),
        q(20, 'medium', `Which detail supports the idea that snowflakes grow as they fall?`, [
          right(`More water vapor freezes onto the crystal as it falls.`),
          wrong(`Scientists look at snowflakes through a magnifying lens.`, 'wrong-supporting-detail'),
          wrong(`Every snowflake begins high up inside a cloud.`, 'too-general'),
          wrong(`Water vapor is water in the form of a gas.`, 'wrong-supporting-detail'),
        ], `Paragraph 2 says that as the crystal falls, "more water vapor freezes onto it," which adds to its size. Starting in a cloud tells where it begins, not how it grows.`),
      ],
    },
    {
      code: 'rg4-evidence-inference-p05',
      title: 'Wheelchair Basketball',
      body: `Wheelchair basketball is a fast and exciting team sport. Players use special wheelchairs instead of running up and down the court. The court, the hoop and the ball are the same size as in other basketball games.\n\nThe chairs are built just for this sport. Their wheels tilt inward at the bottom. This shape helps players turn quickly without tipping over. A small extra wheel at the back keeps the chair steady. Many chairs also have a bar in front to protect the players' feet.\n\nPlayers must push their wheels and handle the ball at the same time. A player may push the wheels twice while holding the ball. After that, the player must pass, shoot or bounce the ball. Strong arms and quick hands are very important.\n\nTeams practice many hours each week. They work on passing, shooting and moving their chairs into open spaces. Some teams include players with and without disabilities. Today, wheelchair basketball is played in many countries. Top players even compete in a large international sports event every four years.`,
      items: [
        q(21, 'easy', `What does the passage say is the same in wheelchair basketball as in other basketball games?`, [
          right(`The size of the court, hoop and ball`),
          wrong(`The way players run down the court`, 'contradicts-text'),
          wrong(`The kind of chairs the players use`, 'misreads-detail'),
          wrong(`The number of hours teams practice`, 'unsupported-inference'),
        ], `Paragraph 1 says the court, hoop and ball "are the same size as in other basketball games." Players do not run, since they use wheelchairs.`),
        q(22, 'easy', `According to the passage, why do the wheels on the chairs tilt inward?`, [
          right(`To help players turn quickly without tipping`),
          wrong(`To protect the players' feet from the ball`, 'confuses-details'),
          wrong(`To make the chairs lighter to carry`, 'unsupported-inference'),
          wrong(`To make the chairs look like race cars`, 'unsupported-inference'),
        ], `Paragraph 2 says the tilted shape "helps players turn quickly without tipping over." The front bar, not the wheels, protects the feet.`),
        q(23, 'medium', `Which detail best supports the idea that players need strong arms?`, [
          right(`Players push their wheels and handle the ball at the same time.`),
          wrong(`A small extra wheel at the back keeps the chair steady.`, 'wrong-supporting-detail'),
          wrong(`Wheelchair basketball is played in many countries today.`, 'wrong-supporting-detail'),
          wrong(`The hoop is the same size as in other basketball games.`, 'wrong-supporting-detail'),
        ], `Pushing the wheels and handling the ball both use the arms, which is why the text says "strong arms and quick hands are very important." The back wheel is part of the chair, not the player.`),
        q(24, 'medium', `What would most likely happen if a player pushed the wheels three times while holding the ball?`, [
          right(`The player would be breaking a rule of the game.`),
          wrong(`The player would score two extra points.`, 'unsupported-inference'),
          wrong(`The chair would tip over onto the court.`, 'confuses-cause-effect'),
          wrong(`The player would be allowed one more push.`, 'contradicts-text'),
        ], `Paragraph 3 says a player may push twice while holding the ball and then "must pass, shoot or bounce" it, so a third push breaks the rule. Nothing in the text says extra pushes tip the chair.`),
        q(25, 'medium', `Which detail shows that wheelchair basketball is a serious, popular sport?`, [
          right(`Top players compete in a large international event every four years.`),
          wrong(`Many chairs have a bar in front to protect the players' feet.`, 'wrong-supporting-detail'),
          wrong(`A player may push the wheels twice while holding the ball.`, 'wrong-supporting-detail'),
          wrong(`Players use special wheelchairs instead of running on the court.`, 'too-general'),
        ], `Playing in many countries and in a large international event shows the sport is widely played and taken seriously. The foot bar is about safety, not popularity.`),
      ],
    },
    {
      code: 'rg4-evidence-inference-p06',
      title: 'Making Paper by Hand',
      body: `Ms. Okafor's art class learned to make new paper from old paper. First, the students tore scrap paper into small pieces. They soaked the pieces in a tub of warm water overnight. By morning, the paper was soft and mushy.\n\nNext, a helper used a blender to turn the wet paper into a thick mix called pulp. The students poured the pulp into a big tub of water and stirred it. Then each student dipped a screen in a wooden frame into the tub. When they lifted it out, a thin layer of pulp lay on top of the screen.\n\nThe students pressed the pulp with a sponge to squeeze out water. They flipped the wet sheet onto a towel and peeled the screen away. Some students pressed flower petals or bits of colored thread into their sheets.\n\nThe sheets dried for two whole days. The finished paper was bumpy and thicker than notebook paper. Jamal said his sheet was perfect for a birthday card. Lucia noticed that her sheet had a light blue color, because she had used old blue paper.`,
      items: [
        q(26, 'easy', `What did the students do first to make the paper?`, [
          right(`They tore scrap paper into small pieces.`),
          wrong(`They dipped a screen into a tub of pulp.`, 'confuses-sequence'),
          wrong(`They pressed petals into the wet sheets.`, 'confuses-sequence'),
          wrong(`They let the sheets dry for two days.`, 'confuses-sequence'),
        ], `Paragraph 1 says, "First, the students tore scrap paper into small pieces." Dipping the screen came later, after the pulp was made.`),
        q(27, 'medium', `Why did the students press the pulp with a sponge?`, [
          right(`To squeeze out water from the sheet`),
          wrong(`To add color to the new paper`, 'unsupported-inference'),
          wrong(`To turn the old paper into pulp`, 'confuses-details'),
          wrong(`To make the sheet thicker than before`, 'unsupported-inference'),
        ], `Paragraph 3 says they pressed the pulp "with a sponge to squeeze out water." The blender, not the sponge, turned the paper into pulp.`),
        q(28, 'medium', `What can the reader infer from the detail about Lucia's sheet?`, [
          right(`The color of the old paper affects the color of the new paper.`),
          wrong(`Every sheet the class made turned out light blue.`, 'overgeneralizes'),
          wrong(`Lucia added blue thread to her sheet to color it.`, 'unsupported-inference'),
          wrong(`The water in the tub was dyed blue by Ms. Okafor.`, 'unsupported-inference'),
        ], `Lucia's sheet was light blue "because she had used old blue paper," so the starting paper changes the color. Nothing says every student's sheet was blue.`),
        q(29, 'hard', `Which detail best explains why the students needed to wait before using their paper?`, [
          right(`The sheets dried for two whole days.`),
          wrong(`The finished paper was bumpy and thick.`, 'wrong-supporting-detail'),
          wrong(`They soaked the pieces in water overnight.`, 'too-narrow'),
          wrong(`Some students used bits of colored thread.`, 'wrong-supporting-detail'),
        ], `The sheets were wet when flipped onto towels, and they needed "two whole days" to dry before use. Soaking overnight was a wait too, but it happened before the paper was made, not before it could be used.`),
        q(30, 'hard', `Jamal thought his sheet was perfect for a birthday card. Which detail best supports his idea?`, [
          right(`The finished paper was thicker than notebook paper.`),
          wrong(`A helper used a blender to make the pulp.`, 'wrong-supporting-detail'),
          wrong(`The students stirred the pulp in a big tub.`, 'wrong-supporting-detail'),
          wrong(`The students soaked the paper in warm water.`, 'wrong-supporting-detail'),
        ], `A card needs to be stiff, and the passage says the paper was "thicker than notebook paper." The blender detail explains how the paper was made, not why it suits a card.`),
      ],
    },
    {
      code: 'rg4-evidence-inference-p07',
      title: 'The Library on Wheels',
      body: `In the town of Millbrook, the library is far from many homes. Some families do not have a car, and the bus does not stop near every street. So the library sends books out on a big blue truck called the bookmobile.\n\nThe bookmobile has shelves along both walls. It holds about two thousand books, plus some audiobooks and puzzles. Every Tuesday it parks at the senior center. On Thursdays it visits two apartment buildings. On Saturdays it stops at the park near the ball fields.\n\nMr. Delgado drives the bookmobile and helps visitors find books. He keeps a notebook of requests. If someone asks for a book that is not on the truck, he brings it from the main library the next week.\n\nLast summer, the bookmobile added a new stop at the town pool. Children could return their books, pick out new ones, and then go swimming. The number of children who read over the summer went up that year. The library now plans to add a second truck.`,
      items: [
        q(31, 'easy', `According to the passage, where does the bookmobile park on Tuesdays?`, [
          right(`At the senior center`),
          wrong(`At the town pool`, 'confuses-details'),
          wrong(`At the apartment buildings`, 'confuses-details'),
          wrong(`At the park by the ball fields`, 'confuses-details'),
        ], `Paragraph 2 says, "Every Tuesday it parks at the senior center." The apartment buildings are the Thursday stop.`),
        q(32, 'medium', `Which detail best explains why Millbrook needs a bookmobile?`, [
          right(`Some families do not have a car, and the bus does not stop everywhere.`),
          wrong(`The bookmobile holds about two thousand books on its shelves.`, 'wrong-supporting-detail'),
          wrong(`Mr. Delgado keeps a notebook of the books people ask for.`, 'wrong-supporting-detail'),
          wrong(`The library now plans to add a second truck to its service.`, 'confuses-cause-effect'),
        ], `Paragraph 1 says many people live far from the library and cannot easily get there, so the library brings the books to them. The second truck is a result of the bookmobile's success, not the reason it was needed.`),
        q(33, 'medium', `What can the reader infer about Mr. Delgado from the passage?`, [
          right(`He works to make sure visitors get the books they want.`),
          wrong(`He decided by himself to build the bookmobile.`, 'unsupported-inference'),
          wrong(`He drives the truck only on summer days.`, 'contradicts-text'),
          wrong(`He wrote most of the books on the shelves.`, 'unsupported-inference'),
        ], `He keeps a notebook of requests and brings missing books the next week, which shows he works to get people what they ask for. The truck runs on Tuesdays, Thursdays and Saturdays, not only in summer.`),
        q(34, 'hard', `Why does the library most likely plan to add a second truck?`, [
          right(`The bookmobile helped more people read, so the library wants to reach more.`),
          wrong(`The first truck is too old, and it can no longer drive to every stop.`, 'unsupported-inference'),
          wrong(`Mr. Delgado wants to stop driving, and someone else needs a truck.`, 'unsupported-inference'),
          wrong(`The pool asked for more books, and the first truck had too few puzzles.`, 'unsupported-inference'),
        ], `The passage says that after the pool stop was added, more children read over the summer, and then it says the library plans a second truck. Nothing in the text says the first truck is old or broken.`),
        q(35, 'hard', `Which detail best supports the idea that the pool stop was a good choice?`, [
          right(`The number of children who read over the summer went up.`),
          wrong(`Children could go swimming after picking out books.`, 'too-narrow'),
          wrong(`The bookmobile also carries audiobooks and puzzles.`, 'wrong-supporting-detail'),
          wrong(`On Saturdays the bookmobile stops near the ball fields.`, 'wrong-supporting-detail'),
        ], `More children reading that summer shows the new stop worked. Swimming after choosing books explains why children came, but it does not show any result.`),
      ],
    },
    {
      code: 'rg4-evidence-inference-p08',
      title: 'Every Student Should Learn to Swim',
      body: `I believe every student in our town should learn to swim before fifth grade. Swimming is a skill that keeps people safe, and it is also a lot of fun.\n\nFirst, swimming helps people stay safe near water. Our town sits next to a lake, and many families go boating in the summer. A child who can swim and float is better prepared if he or she falls in. Knowing how to swim also helps a person stay calm in the water.\n\nSecond, swimming is great exercise. It makes the heart and lungs stronger. It works the arms, the legs and the belly muscles all at once. People of almost any age can swim, so it is a skill that lasts a whole life.\n\nSome people say lessons cost too much. However, the town pool already has an empty hour every weekday morning. The school could use that time for free classes taught by the pool's lifeguards.\n\nWhen I learned to swim, I was nervous at first. By the end of the lessons, I was jumping off the side of the pool. Every student deserves to feel that proud.`,
      items: [
        q(36, 'easy', `What is the author's main opinion in the passage?`, [
          right(`Every student should learn to swim before fifth grade.`),
          wrong(`Families should not go boating on the lake.`, 'unsupported-inference'),
          wrong(`The town pool should close in the mornings.`, 'contradicts-text'),
          wrong(`Lifeguards should teach classes about boats.`, 'misreads-detail'),
        ], `The first sentence says, "I believe every student in our town should learn to swim before fifth grade." The author mentions boating as a reason to swim, not as something to stop.`),
        q(37, 'medium', `Which detail does the author use to show that swimming is good exercise?`, [
          right(`It works the arms, the legs and the belly muscles at once.`),
          wrong(`Many families in town go boating on the lake in summer.`, 'supports-different-claim'),
          wrong(`The town pool has an empty hour every weekday morning.`, 'supports-different-claim'),
          wrong(`The author felt nervous at the start of swim lessons.`, 'wrong-supporting-detail'),
        ], `In paragraph 3, the author says swimming makes the heart and lungs stronger and works many muscles. Boating on the lake supports the safety reason, not the exercise reason.`),
        q(38, 'medium', `How does the author answer people who say lessons cost too much?`, [
          right(`The school could use the pool's empty hour for free classes.`),
          wrong(`Families who go boating could pay for everyone's lessons.`, 'unsupported-inference'),
          wrong(`Students could teach each other to swim in the lake.`, 'unsupported-inference'),
          wrong(`Lessons cost less than other sports, so they are fine.`, 'unsupported-inference'),
        ], `Paragraph 4 says the pool has an empty hour each weekday morning that could be used for free classes with the pool's lifeguards. The author never compares swimming to the cost of other sports.`),
        q(39, 'hard', `Why does the author most likely mention that the town sits next to a lake?`, [
          right(`To show that children in this town are often near deep water`),
          wrong(`To suggest that swim classes should be held in the lake`, 'unsupported-inference'),
          wrong(`To explain why the town pool is empty in the mornings`, 'confuses-cause-effect'),
          wrong(`To prove that boating is better exercise than swimming`, 'supports-different-claim'),
        ], `The lake detail appears in the paragraph about safety, right before the author says a child who can swim is better prepared if he or she falls in. The author suggests classes at the pool, not in the lake.`),
        q(40, 'hard', `What can the reader infer from the last paragraph?`, [
          right(`The author's own lessons helped build confidence in the water.`),
          wrong(`The author never enjoyed swimming, even after lessons.`, 'contradicts-text'),
          wrong(`The author learned to swim in the lake, not at a pool.`, 'contradicts-text'),
          wrong(`The author thinks jumping is the only skill that matters.`, 'overgeneralizes'),
        ], `The author went from "nervous at first" to "jumping off the side of the pool" and calls the feeling proud, which shows growing confidence. The author mentions the pool, so the lessons were not in the lake.`),
      ],
    },
  ],
}

export default skill
