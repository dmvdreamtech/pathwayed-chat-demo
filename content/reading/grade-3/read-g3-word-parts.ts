import type { ContentChoice, ContentSkill } from '../../types'

const right = (text: string): ContentChoice => ({ text, is_correct: true })
const wrong = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'read-g3-word-parts',
  subject: 'reading',
  grade: 3,
  group: 'Vocabulary and word study',
  name: 'Word Parts: Roots and Affixes',
  standards: ['L.3.4b', 'L.3.4c'],
  passages: [
    {
      code: 'rg3-word-parts-p01',
      title: 'Plot Number Nine',
      body: `Every Saturday, Amara walks to the community garden on Pine Street. The garden has twenty small plots, and each family takes care of one. Amara's family has plot number nine.\n\nThis spring, plot nine looked sad. A storm had knocked down the bean poles, and half the rows were still unplanted. Amara felt hopeless at first. There was so much work to do!\n\nMr. Okafor, who has the plot next door, came over to help. "Let's replant the beans along the fence," he said. "They will be safer there." Mr. Okafor was very helpful. He showed Amara how to tie the new poles so they would not wobble.\n\nThen Amara made a mistake. While pulling weeds, Amara pulled up a tiny pepper plant too. "I was careless," Amara said. Mr. Okafor smiled. "That is fixable. We can put it back in the soil gently."\n\nBy June, plot nine was full of green leaves. Amara picked the first beans and shared them with Mr. Okafor. Being a good gardener takes patience, Amara thought, and so does being a good neighbor.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `In the second paragraph, half the rows were "unplanted." What does "unplanted" mean?`,
          choices: [
            right(`not planted yet`),
            wrong(`planted again`, 'confuses-un-with-re'),
            wrong(`planted very well`, 'ignores-prefix'),
            wrong(`planted too early`, 'invents-affix-meaning'),
          ],
          solution: `The prefix un- means "not," so "unplanted" means not planted. "Planted again" would need the prefix re-, as in "replant."`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Mr. Okafor says, "Let's replant the beans along the fence." What does "replant" mean?`,
          choices: [
            wrong(`to not plant`, 'confuses-re-with-un'),
            right(`to plant again`),
            wrong(`to plant before`, 'confuses-re-with-pre'),
            wrong(`to plant the wrong way`, 'confuses-re-with-mis'),
          ],
          solution: `The prefix re- means "again," so "replant" means to plant again. The beans had been knocked down and needed to go back in the ground, not stay out of it.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Amara felt "hopeless" at first. The suffix -less helps you know that "hopeless" means:`,
          choices: [
            wrong(`full of hope`, 'confuses-less-with-ful'),
            wrong(`hoping again`, 'invents-affix-meaning'),
            right(`without hope`),
            wrong(`hoping a lot`, 'ignores-suffix'),
          ],
          solution: `The suffix -less means "without," so "hopeless" means without hope, which fits how Amara felt looking at so much work. "Full of hope" would be "hopeful," with the suffix -ful.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Amara says, "I was careless," after pulling up a pepper plant. What does "careless" mean in this sentence?`,
          choices: [
            right(`not taking care`),
            wrong(`taking great care`, 'confuses-less-with-ful'),
            wrong(`caring for plants`, 'ignores-suffix'),
            wrong(`careful once more`, 'invents-affix-meaning'),
          ],
          solution: `"Careless" is care plus -less, which means "without," so it means not taking care. Amara pulled a plant by mistake, which shows a lack of care, not great care.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Mr. Okafor says, "That is fixable." Using the suffix -able, what does "fixable" mean?`,
          choices: [
            wrong(`already fixed`, 'wrong-tense'),
            wrong(`not able to be fixed`, 'reverses-meaning'),
            wrong(`a person who fixes`, 'confuses-able-with-er'),
            right(`able to be fixed`),
          ],
          solution: `The suffix -able means "can be," so "fixable" means able to be fixed. Mr. Okafor says they can put the plant back in the soil, so the problem can be fixed, not that it cannot.`,
        },
      ],
    },
    {
      code: 'rg3-word-parts-p02',
      title: 'The Lamplighters',
      body: `Long ago, before cities had electric lights, streets were dark at night. Many towns hired workers called lamplighters. Each evening, a lamplighter walked from post to post with a long pole.\n\nAt the top of each post was a glass lamp that burned gas or oil. The lamplighter used the pole to open the lamp and light the flame. This was a nightly job. Lamplighters worked every single evening, even in rain and snow.\n\nThe work had to be done with care. A flame that was unsafe could start a fire. Lamplighters checked each lamp and cleaned the smoky glass so the light could shine through.\n\nIn the morning, the lamplighters came back. They put out each flame so no fuel was wasted. If a lamp had blown out in the wind, they would relight it the next evening.\n\nToday, most streetlights turn on by themselves. Still, some towns keep a few old gas lamps. People enjoy them because they are a reminder of the past. The soft glow brings a feeling of calmness to the street.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `The passage says lighting lamps "was a nightly job." What does "nightly" mean?`,
          choices: [
            wrong(`happening on only one night`, 'too-narrow'),
            right(`happening every night`),
            wrong(`happening without any night`, 'invents-affix-meaning'),
            wrong(`happening in the daytime`, 'reverses-meaning'),
          ],
          solution: `The suffix -ly added to "night" means happening each night, and the next sentence says lamplighters "worked every single evening." That rules out a job done on only one night.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `The passage says, "A flame that was unsafe could start a fire." What does "unsafe" mean?`,
          choices: [
            wrong(`safe again`, 'confuses-un-with-re'),
            wrong(`very safe`, 'ignores-prefix'),
            wrong(`safe before`, 'confuses-un-with-pre'),
            right(`not safe`),
          ],
          solution: `The prefix un- means "not," so "unsafe" means not safe. A flame that could start a fire is dangerous, so it cannot mean very safe.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `If a lamp blew out, the lamplighters "would relight it the next evening." What does "relight" mean?`,
          choices: [
            right(`to light again`),
            wrong(`to put out a light`, 'reverses-meaning'),
            wrong(`to light for the first time`, 'ignores-prefix'),
            wrong(`to light the wrong lamp`, 'confuses-re-with-mis'),
          ],
          solution: `The prefix re- means "again," and the lamp had already been lit once before it blew out. So "relight" means to light again, not to light for the first time.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `The passage tells about workers called "lamplighters." Using the word parts lamp, light and -er, what is a "lamplighter"?`,
          choices: [
            wrong(`a lamp that weighs less`, 'literal-reading'),
            wrong(`the act of lighting a lamp`, 'ignores-suffix'),
            right(`a person who lights lamps`),
            wrong(`a lamp that gives more light`, 'confuses-er-with-comparative'),
          ],
          solution: `Here the suffix -er means "a person who," so a lamplighter is a person who lights lamps, and the passage calls them "workers." It does not mean a lamp that is lighter in weight.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `The old lamps bring "a feeling of calmness to the street." What does "calmness" mean?`,
          choices: [
            wrong(`without any calm`, 'confuses-ness-with-less'),
            right(`the state of being calm`),
            wrong(`a person who is calm`, 'confuses-ness-with-er'),
            wrong(`in a calm way`, 'confuses-ness-with-ly'),
          ],
          solution: `The suffix -ness turns "calm" into a thing, the state of being calm, which matches "a feeling of" in the sentence. "Without any calm" would need the suffix -less.`,
        },
      ],
    },
    {
      code: 'rg3-word-parts-p03',
      title: 'The Rainy Game',
      body: `The Comets soccer team had a big game on Saturday. Rain fell all morning, and the field was muddy and slippery. Kenji and Talia, who are teammates, waited under a tent with the rest of the team.\n\n"Maybe the game will be canceled," Kenji said. Talia disagreed. "The rain is getting lighter. I think we will play."\n\nTalia was right. The referee said the field was playable. The players ran out, but the ball kept sliding in the mud. Kenji kicked it hard, and it rolled the wrong way. Kenji had misjudged how fast the ball would move on the wet grass.\n\nAt halftime, the Comets were losing by one goal. Coach Delgado gathered the team. "Do not worry about the mud," the coach said. "Take small steps and pass the ball softly."\n\nIn the second half, the Comets played carefully. Talia passed the ball to Kenji, and Kenji scored! The game ended in a tie. The players were muddy from head to toe, but nobody was unhappy. It had been a wonderful, messy day.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `At the end of the story, "nobody was unhappy." What does "unhappy" mean?`,
          choices: [
            wrong(`happy again`, 'confuses-un-with-re'),
            wrong(`very happy`, 'ignores-prefix'),
            right(`not happy`),
            wrong(`happy before`, 'confuses-un-with-pre'),
          ],
          solution: `The prefix un- means "not," so "unhappy" means not happy. The sentence says nobody felt that way, which fits a "wonderful" day.`,
        },
        {
          slot: 12,
          difficulty: 'medium',
          stem: `Kenji thinks the game will be canceled, but "Talia disagreed." What does "disagreed" mean?`,
          choices: [
            right(`did not agree`),
            wrong(`agreed again`, 'confuses-dis-with-re'),
            wrong(`agreed very strongly`, 'ignores-prefix'),
            wrong(`agreed first`, 'invents-affix-meaning'),
          ],
          solution: `The prefix dis- means "not" or "the opposite of," so "disagreed" means did not agree. Talia says "I think we will play," which is the opposite of what Kenji said.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `The story says, "Kenji had misjudged how fast the ball would move." What does "misjudged" mean?`,
          choices: [
            wrong(`judged again`, 'confuses-mis-with-re'),
            wrong(`judged correctly`, 'reverses-meaning'),
            wrong(`judged ahead of time`, 'confuses-mis-with-pre'),
            right(`judged wrongly`),
          ],
          solution: `The prefix mis- means "wrongly," so "misjudged" means judged wrongly. The ball "rolled the wrong way," so Kenji did not judge correctly.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `Kenji and Talia are "teammates." The word "team" is a clue. What are "teammates"?`,
          choices: [
            wrong(`players on different teams`, 'reverses-meaning'),
            right(`people on the same team`),
            wrong(`people who coach a team`, 'unsupported-inference'),
            wrong(`games played by two teams`, 'confuses-person-with-event'),
          ],
          solution: `A mate is a partner, so teammates are people on the same team, and Kenji and Talia both play for the Comets. They are not on different teams, since Talia passes the ball to Kenji.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `The referee said "the field was playable." Using the suffix -able, what does "playable" mean?`,
          choices: [
            wrong(`too wet to play on`, 'reverses-meaning'),
            wrong(`a person who plays`, 'confuses-able-with-er'),
            right(`able to be played on`),
            wrong(`already played on`, 'wrong-tense'),
          ],
          solution: `The suffix -able means "can be," so "playable" means able to be played on, and the players then "ran out" to start the game. If the field were too wet to play on, the game would have been canceled.`,
        },
      ],
    },
    {
      code: 'rg3-word-parts-p04',
      title: 'Kites in the Sky',
      body: `People have been flying kites for a very long time. Many experts think the first kites were made in China more than two thousand years ago.

A kite needs wind to fly. On a breezy day, the moving air pushes up on the kite and lifts it into the sky. When there is no wind at all, a kite is unable to stay up, and it falls to the ground.

Many kites are colorful. Some are bright red, yellow and blue. Others look like birds, fish or dragons. Bright colors make a kite easy to see high above.

A long tail can be useful, too. The tail helps keep the kite steady so it does not spin in circles.

Kite flying is fun, but it must be done with care. A kite in an open field is harmless. A kite near power lines is not, because the string can touch the wires. Always fly a kite far away from wires, roads and trees.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `The passage says, "Many kites are colorful." What does "colorful" mean?`,
          choices: [
            right(`full of color`),
            wrong(`without color`, 'confuses-ful-with-less'),
            wrong(`colored again`, 'invents-affix-meaning'),
            wrong(`one plain color`, 'ignores-suffix'),
          ],
          solution: `The suffix -ful means "full of," so "colorful" means full of color, and the next sentence names "bright red, yellow and blue." "Without color" would be "colorless."`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `The passage says, "A kite in an open field is harmless." What does "harmless" mean?`,
          choices: [
            wrong(`full of harm`, 'confuses-less-with-ful'),
            right(`not causing harm`),
            wrong(`harming again`, 'invents-affix-meaning'),
            wrong(`harming a lot`, 'ignores-suffix'),
          ],
          solution: `The suffix -less means "without," so "harmless" means without harm, or not causing harm. The next sentence says a kite near power lines is "not" harmless, which shows the open field is the safe place to fly.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `The passage says, "A long tail can be useful, too." What does "useful" mean?`,
          choices: [
            wrong(`having no use`, 'confuses-ful-with-less'),
            wrong(`used one more time`, 'confuses-ful-with-re'),
            right(`helpful or full of use`),
            wrong(`used up already`, 'wrong-tense'),
          ],
          solution: `The suffix -ful means "full of," so "useful" means full of use, or helpful, and the next sentence says the tail "helps keep the kite steady." "Having no use" would be "useless."`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `With no wind, "a kite is unable to stay up." What does "unable" mean?`,
          choices: [
            wrong(`able again`, 'confuses-un-with-re'),
            wrong(`very able`, 'ignores-prefix'),
            wrong(`able before`, 'confuses-un-with-pre'),
            right(`not able`),
          ],
          solution: `The prefix un- means "not," so "unable" means not able. The same sentence says the kite "falls to the ground," so it is not able to stay up.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `A kite can fly "on a breezy day." The suffix -y means "having." What does "breezy" mean?`,
          choices: [
            right(`having some wind blowing`),
            wrong(`having no wind at all`, 'reverses-meaning'),
            wrong(`having rain all day`, 'unsupported-inference'),
            wrong(`a tool that makes wind`, 'confuses-y-with-er'),
          ],
          solution: `A breeze is a soft wind, and -y means "having," so "breezy" means having some wind blowing. The passage says the moving air lifts the kite on that day, and with no wind at all a kite falls, so a day with no wind does not fit.`,
        },
      ],
    },
    {
      code: 'rg3-word-parts-p05',
      title: 'The Clay Bowl',
      body: `On Tuesday, the art club tried something new. Ms. Ferreira set a lump of wet clay in front of each student. "Today we are making bowls," she said.\n\nRohan had never touched clay before. It felt cold and sticky, and at first Rohan was uncomfortable with the mess. Rohan's friend Esi laughed. "Clay is supposed to be messy. That is the fun part!"\n\nRohan pressed a thumb into the middle of the clay and began to pinch the sides. The bowl came out lopsided. Ms. Ferreira showed Rohan how to reshape it. "Wet your fingers and smooth the edge slowly," she said.\n\nThe second try was much better. Rohan worked carefully, turning the bowl a little at a time. Soon the bowl had round, even sides.\n\nNext week, the bowls will be baked in a hot oven called a kiln. Then the students will paint them. Esi wants to paint stars. Rohan plans to paint blue waves and give the bowl to Grandpa. In one afternoon, Rohan had gone from a nervous beginner to a proud artist.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `At first, Rohan "was uncomfortable with the mess." What does "uncomfortable" mean?`,
          choices: [
            wrong(`comfortable again`, 'confuses-un-with-re'),
            right(`not comfortable`),
            wrong(`very comfortable`, 'ignores-prefix'),
            wrong(`comfortable before`, 'confuses-un-with-pre'),
          ],
          solution: `The prefix un- means "not," so "uncomfortable" means not comfortable. The clay felt "cold and sticky," which shows Rohan did not feel at ease, not that Rohan felt very comfortable.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Ms. Ferreira showed Rohan how to "reshape" the lopsided bowl. What does "reshape" mean?`,
          choices: [
            wrong(`to break apart`, 'unsupported-inference'),
            wrong(`to shape wrongly`, 'confuses-re-with-mis'),
            wrong(`to leave unshaped`, 'confuses-re-with-un'),
            right(`to shape again`),
          ],
          solution: `The prefix re- means "again," so "reshape" means to shape again. Rohan smooths the bowl and makes a "second try," which is shaping it again, not breaking it apart.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `The story says, "Rohan worked carefully." The suffix -ly tells how something is done. What does "carefully" mean?`,
          choices: [
            right(`in a way that shows care`),
            wrong(`in a way that shows no care`, 'confuses-ful-with-less'),
            wrong(`a person who gives care`, 'confuses-ly-with-er'),
            wrong(`in a fast and hurried way`, 'unsupported-inference'),
          ],
          solution: `"Carefully" is care plus -ful plus -ly, so it means in a way that shows care. Rohan turned the bowl "a little at a time," which shows care, not a lack of it.`,
        },
        {
          slot: 24,
          difficulty: 'medium',
          stem: `Rohan started the day as "a nervous beginner." Using the word "begin" and the suffix -er, what is a "beginner"?`,
          choices: [
            wrong(`the first part of a lesson`, 'confuses-person-with-event'),
            right(`a person who is just starting to learn`),
            wrong(`a person who is an expert`, 'reverses-meaning'),
            wrong(`a person who stops a project`, 'unrelated-meaning'),
          ],
          solution: `"Begin" means start, and -er means "a person who," so a beginner is a person who is just starting. Rohan "had never touched clay before," so Rohan was not an expert.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `By the end, Rohan was "a proud artist." The root word "art" is a clue. What is an "artist"?`,
          choices: [
            wrong(`a room where art is kept`, 'confuses-person-with-place'),
            wrong(`a kind of paint for bowls`, 'confuses-person-with-thing'),
            right(`a person who makes art`),
            wrong(`a person who buys art`, 'unsupported-inference'),
          ],
          solution: `The root "art" plus the suffix -ist means a person who makes art, and Rohan made a clay bowl in art club. Rohan plans to give the bowl away, not buy art.`,
        },
      ],
    },
    {
      code: 'rg3-word-parts-p06',
      title: 'A Second Life for Old Things',
      body: `Every week, families throw away bags of trash. Much of it ends up in a landfill, a huge pile of garbage covered with dirt. But many things we throw out are not really useless. They can have a second life.\n\nOne way to help is to reuse things. A glass jar can hold pencils. An old shirt can become a cleaning rag. Reusing means using something again instead of buying something new.\n\nAnother way is to recycle. Paper, cans and some plastics can be melted or mashed and made into new things. Many towns give families special bins. Workers sort the items so each kind goes to the right place.\n\nSome unwanted things can be given away. A jacket that is too small for one child may fit another child perfectly. Toys, books and games can be given to a school or a shelter.\n\nSmall changes make a big difference. When people reuse, recycle and give, they keep trash out of landfills. That makes the planet a cleaner place for everyone.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `The passage says, "One way to help is to reuse things." What does "reuse" mean?`,
          choices: [
            right(`to use again`),
            wrong(`to use wrongly`, 'confuses-re-with-mis'),
            wrong(`to not use`, 'confuses-re-with-un'),
            wrong(`to use before`, 'confuses-re-with-pre'),
          ],
          solution: `The prefix re- means "again," so "reuse" means to use again, and the passage says reusing means "using something again." A jar holding pencils is being used again, not used wrongly.`,
        },
        {
          slot: 27,
          difficulty: 'easy',
          stem: `Many things we throw out "are not really useless." What does "useless" mean?`,
          choices: [
            wrong(`full of use`, 'confuses-less-with-ful'),
            wrong(`used again`, 'invents-affix-meaning'),
            right(`having no use`),
            wrong(`used a lot`, 'ignores-suffix'),
          ],
          solution: `The suffix -less means "without," so "useless" means having no use. The passage says these things are NOT useless because they can have a second life; "full of use" would be "useful."`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `"Some unwanted things can be given away." What does "unwanted" mean?`,
          choices: [
            wrong(`wanted very much`, 'ignores-prefix'),
            wrong(`wanted again`, 'confuses-un-with-re'),
            wrong(`wanted by everyone`, 'unsupported-inference'),
            right(`not wanted`),
          ],
          solution: `The prefix un- means "not," so "unwanted" means not wanted, like a jacket that is "too small" for one child. Something wanted very much would not be given away.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `Recycling "makes the planet a cleaner place." In this sentence, what does "cleaner" mean?`,
          choices: [
            wrong(`a person who cleans`, 'confuses-comparative-with-person'),
            right(`more clean`),
            wrong(`not clean at all`, 'reverses-meaning'),
            wrong(`cleaned before`, 'wrong-tense'),
          ],
          solution: `Here -er means "more," so "a cleaner place" is a place that is more clean. The word describes the planet, so it cannot mean a person who cleans.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `The passage explains how to "recycle." Using the prefix re- and the passage, what does "recycle" mean?`,
          choices: [
            wrong(`to ride a bicycle around once again`, 'literal-reading'),
            wrong(`to throw something away forever`, 'reverses-meaning'),
            right(`to make used things into new things to use again`),
            wrong(`to use something in the wrong way`, 'confuses-re-with-mis'),
          ],
          solution: `The prefix re- means "again," and the passage says recycled items are "made into new things" so they can be used again. It has nothing to do with riding a bike, even though "cycle" can name one.`,
        },
      ],
    },
    {
      code: 'rg3-word-parts-p07',
      title: 'Wagons on the Trail',
      body: `Long ago, many families moved west across the country in covered wagons. The trip took months. The trail was bumpy, and the weather could change quickly.\n\nFamilies did not usually travel alone. They joined a large company of wagons that moved together. Each traveler had a companion to share the work. Being in a group made the long trip safer and less lonely.\n\nBefore leaving, some groups would prepay a guide to lead them on the trail. Families also bought and packed flour, beans, tools and blankets. Space in a wagon was small, so they had to choose carefully.\n\nOn the trail, travelers worked as a team. When a wagon wheel cracked, people helped rebuild it. At night, they untied the oxen from the wagons so the animals could rest and eat grass.\n\nSometimes the trail seemed to disappear under tall grass or snow. Guides helped the group find the way again. After many months, the wagons finally reached their new homes.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `At night, the travelers "untied the oxen from the wagons." What does "untied" mean?`,
          choices: [
            wrong(`tied more tightly`, 'ignores-prefix'),
            wrong(`tied once again`, 'confuses-un-with-re'),
            right(`undid the ties that held them`),
            wrong(`tied the wrong way`, 'confuses-un-with-mis'),
          ],
          solution: `Before an action word, un- means "undo," so "untied" means undid the ties that held them. The oxen were set free "so the animals could rest and eat grass," which they could not do if tied more tightly.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `When a wheel cracked, "people helped rebuild it." What does "rebuild" mean?`,
          choices: [
            right(`to build again`),
            wrong(`to build for the first time`, 'ignores-prefix'),
            wrong(`to take apart for good`, 'reverses-meaning'),
            wrong(`to build the wrong way`, 'confuses-re-with-mis'),
          ],
          solution: `The prefix re- means "again," so "rebuild" means to build again. The wheel already existed and had cracked, so it was not being built for the first time.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `"Sometimes the trail seemed to disappear under tall grass or snow." What does "disappear" mean?`,
          choices: [
            wrong(`to appear again`, 'confuses-dis-with-re'),
            wrong(`to appear very clearly`, 'ignores-prefix'),
            wrong(`to appear ahead of time`, 'confuses-dis-with-pre'),
            right(`to go out of sight`),
          ],
          solution: `The prefix dis- means "the opposite of," so "disappear" is the opposite of appear: to go out of sight. Guides had to help the group "find the way again," so the trail was hard to see, not clear.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `Families traveled in "a large company of wagons," and each traveler had a "companion." Using "company" as a clue, what is a "companion"?`,
          choices: [
            wrong(`a store that sells supplies`, 'wrong-sense-of-root'),
            right(`a person who goes along with you`),
            wrong(`a person who travels alone`, 'reverses-meaning'),
            wrong(`a wheel for a covered wagon`, 'unrelated-meaning'),
          ],
          solution: `In this passage, a company is a group that travels together, so a companion is a person who goes along with you, and the companion helps "share the work." The word "company" can also mean a business, but that sense does not fit this passage.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `"Before leaving, some groups would prepay a guide." What does "prepay" mean?`,
          choices: [
            wrong(`to pay again`, 'confuses-pre-with-re'),
            wrong(`to not pay`, 'confuses-pre-with-un'),
            right(`to pay ahead of time`),
            wrong(`to pay the wrong amount`, 'confuses-pre-with-mis'),
          ],
          solution: `The prefix pre- means "before," so "prepay" means to pay ahead of time, which matches "Before leaving." Paying again would need the prefix re-.`,
        },
      ],
    },
    {
      code: 'rg3-word-parts-p08',
      title: 'Pancake Morning',
      body: `On Sunday morning, Lena and Grandma Bea decided to make pancakes. Grandma Bea asked Lena to preheat the pan while they mixed the batter.\n\nLena read the recipe out loud. "Two cups of salt," Lena said. Grandma Bea laughed. "Look again. I think you misread it." Lena looked closer. The recipe said two cups of flour and just a pinch of salt!\n\nLena's little brother, Theo, wanted to help too. At first Theo was disagreeable. He wanted chocolate chips, and there were none. Then Grandma Bea found a bag of blueberries. Theo became much more agreeable and dropped the berries into the batter one by one.\n\nThe first pancake stuck to the pan. The second one was perfect, golden and fluffy. Lena flipped it high into the air and caught it.\n\nWhen breakfast was ready, everyone sat down together. Theo said he was thankful for the blueberries. Lena was thankful for Grandma Bea's kindness and patience. It was the tastiest breakfast of the whole week.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `Grandma Bea asked Lena to "preheat the pan." What does "preheat" mean?`,
          choices: [
            wrong(`to heat again`, 'confuses-pre-with-re'),
            right(`to heat before using`),
            wrong(`to not heat`, 'confuses-pre-with-un'),
            wrong(`to heat the wrong way`, 'confuses-pre-with-mis'),
          ],
          solution: `The prefix pre- means "before," so "preheat" means to heat the pan before cooking in it, while the batter is being mixed. Heating again would need the prefix re-.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `Grandma Bea says, "I think you misread it." What does "misread" mean?`,
          choices: [
            right(`read wrongly`),
            wrong(`read again`, 'confuses-mis-with-re'),
            wrong(`read very well`, 'reverses-meaning'),
            wrong(`did not read at all`, 'confuses-mis-with-un'),
          ],
          solution: `The prefix mis- means "wrongly," so "misread" means read wrongly. Lena did read the recipe, but said "salt" when it said "flour," so it was not a case of not reading at all.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `"Theo said he was thankful for the blueberries." What does "thankful" mean?`,
          choices: [
            wrong(`without any thanks`, 'confuses-ful-with-less'),
            wrong(`thanked one more time`, 'confuses-ful-with-re'),
            wrong(`a person who thanks`, 'confuses-ful-with-er'),
            right(`full of thanks`),
          ],
          solution: `The suffix -ful means "full of," so "thankful" means full of thanks, or glad and grateful. Theo was happy about the blueberries, so "without any thanks" does not fit.`,
        },
        {
          slot: 39,
          difficulty: 'hard',
          stem: `At first Theo "was disagreeable," but later Theo "became much more agreeable." What does "disagreeable" mean?`,
          choices: [
            wrong(`easy to get along with`, 'ignores-prefix'),
            right(`grumpy and hard to please`),
            wrong(`able to agree once more`, 'confuses-dis-with-re'),
            wrong(`agreeing with everyone`, 'reverses-meaning'),
          ],
          solution: `"Agreeable" means pleasant and easy to get along with, and the prefix dis- means "the opposite of," so "disagreeable" means grumpy and hard to please. Theo was upset about the chocolate chips, so "easy to get along with" describes Theo only later, when Theo became agreeable.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `Lena was thankful for Grandma Bea's "kindness." What does "kindness" mean?`,
          choices: [
            wrong(`a lack of being kind`, 'confuses-ness-with-less'),
            wrong(`in a kind way`, 'confuses-ness-with-ly'),
            right(`the quality of being kind`),
            wrong(`a person who is kind`, 'confuses-ness-with-er'),
          ],
          solution: `The suffix -ness turns "kind" into a thing, the quality of being kind, and it is something Lena is "thankful for" along with patience. "In a kind way" would be "kindly," with the suffix -ly.`,
        },
      ],
    },
  ],
}

export default skill
