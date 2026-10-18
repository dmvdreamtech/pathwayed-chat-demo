import type { ContentChoice, ContentSkill } from '../../types'

const right = (text: string): ContentChoice => ({ text, is_correct: true })
const wrong = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'read-g6-literary-structure-pov',
  subject: 'reading',
  grade: 6,
  group: 'Literature',
  name: 'Structure and Point of View in Literature',
  standards: ['RL.6.5', 'RL.6.6'],
  passages: [
    {
      code: 'rg6-literary-structure-pov-p01',
      title: 'The Third Chair',
      body: `I had practiced the trumpet solo every night for three weeks, so when Ms. Okafor posted the band seating chart, I walked straight to the top of the list. My name was not there. It was not second either. I found it third, right under Lucia Ferreira, the new girl who had moved here in October.

I told myself I did not care. During rehearsal I played my part loudly, maybe too loudly, and I did not look at the first chair even once. When Lucia missed an entrance, I felt a small, mean flash of happiness. I am not proud of that.

After practice, I stayed behind to stack the music stands. That was when I heard her. Lucia was alone in the practice room, playing the opening of the solo again and again. She cracked on the same high note each time and started over. Through the little window, I could see her wiping her eyes with her sleeve.

I almost left. Instead, I knocked.

"You're pushing too hard on that note," I said. "Try more air and less pressure. It took me a month to figure that out."

She tried it. The note came out clear and round, and she laughed in surprise.

Walking home, I realized something strange. The seating chart had not changed at all, but I no longer felt like I had lost anything.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `From whose point of view is this story told?`,
          choices: [
            right(`A band member who was placed in third chair, telling the story firsthand`),
            wrong(`Lucia Ferreira, the new student who earned the first chair spot`, 'confuses-narrator-with-character'),
            wrong(`Ms. Okafor, the band teacher who posted the seating chart`, 'confuses-narrator-with-character'),
            wrong(`An outside narrator who shares the thoughts of every character`, 'confuses-first-and-third-person'),
          ],
          solution: `The narrator uses "I" and says "I found it third, right under Lucia," so the narrator is the third chair player telling the story firsthand. Lucia is described from the outside, so she is not the narrator.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence shows the narrator admitting that a feeling was unkind?`,
          choices: [
            wrong(`"I told myself I did not care."`, 'misreads-character'),
            right(`"I am not proud of that."`),
            wrong(`"I almost left."`, 'too-narrow'),
            wrong(`"She tried it."`, 'misreads-character'),
          ],
          solution: `Right after describing a "small, mean flash of happiness," the narrator says "I am not proud of that," which admits the feeling was unkind. "I told myself I did not care" shows the narrator pretending, not admitting fault.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `How does the paragraph about the practice room fit into the structure of the story?`,
          choices: [
            wrong(`It introduces the conflict by revealing the band seating chart.`, 'wrong-plot-stage'),
            wrong(`It gives background about why Lucia moved to town in October.`, 'unsupported-inference'),
            right(`It is the turning point, when seeing Lucia struggle changes the narrator.`),
            wrong(`It is the resolution, when the narrator wins back the first chair.`, 'contradicts-text'),
          ],
          solution: `In this paragraph the narrator sees Lucia practicing and crying, and right after it the narrator chooses to help instead of leaving, so it is the turning point. The conflict was already introduced in the first paragraph, where the chart is posted.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `How does the narrator's view of Lucia change over the course of the story?`,
          choices: [
            wrong(`The narrator first admires Lucia, then grows jealous after hearing her play.`, 'reverses-sequence'),
            right(`The narrator first sees Lucia as a rival, then sees her as someone to help.`),
            wrong(`The narrator first ignores Lucia, then decides Lucia does not deserve first chair.`, 'contradicts-text'),
            wrong(`The narrator first fears Lucia, then learns that Lucia is a weaker player.`, 'unsupported-inference'),
          ],
          solution: `Early on the narrator refuses to look at Lucia and is glad when she makes a mistake, but later the narrator knocks and gives Lucia advice. The narrator never says Lucia does not deserve the chair, and instead gives Lucia a tip that helps her play the solo.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `Why does the author end the story by pointing out that "the seating chart had not changed at all"?`,
          choices: [
            wrong(`To hint that Ms. Okafor will change the chart once she hears the narrator.`, 'unsupported-inference'),
            wrong(`To show that the narrator is still upset about losing the solo to Lucia.`, 'contradicts-text'),
            wrong(`To remind readers of the setting so they know the story takes place at school.`, 'misreads-purpose'),
            right(`To show that the real change happened inside the narrator, not in the ranking.`),
          ],
          solution: `The chart is the same, yet the narrator "no longer felt like I had lost anything," so the ending stresses that the narrator's attitude changed, which develops the theme. Nothing in the text suggests the teacher will change the chart.`,
        },
      ],
    },
    {
      code: 'rg6-literary-structure-pov-p02',
      title: 'Kite Day',
      body: `The wind came early to the hill.
It tugged my jacket, tossed my hair.
My brother held the string so still.
Our paper kite just hung in air.

We ran. We tripped. We ran once more.
The kite would lift, then dip, then fall.
It scraped the grass. It bumped the floor
of rocks and roots beside the wall.

My brother sighed and checked the clock.
My knees were green, my hands were sore.
I sat down hard upon a rock
and wondered what we came here for.

My brother said, "Let's just go home."
I said, "One more." I don't know why.
I let the string run loose and roam.
The wind swept in. The kite climbed high.

It soared above the hill and flew,
a speck of red, a stubborn spark.
My brother grinned. I grinned there too.
We watched it dance until the dark.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Who is the speaker of the poem?`,
          choices: [
            right(`A child who is trying to fly a kite with a brother`),
            wrong(`The brother who wants to give up and go home`, 'confuses-narrator-with-character'),
            wrong(`The wind that sweeps across the hill all day`, 'literal-reading'),
            wrong(`A parent watching two children from far away`, 'unsupported-inference'),
          ],
          solution: `The speaker uses "my brother" and "I" and takes part in the running and falling, so the speaker is a child flying the kite. The brother is a separate character, since the speaker reports what he says.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `What happens in the second stanza?`,
          choices: [
            wrong(`The kite finally rises high above the hill.`, 'wrong-stanza'),
            wrong(`The brother decides that it is time to leave.`, 'wrong-stanza'),
            right(`The kite keeps lifting a little and then falling.`),
            wrong(`The wind arrives and tugs at the speaker's hair.`, 'wrong-stanza'),
          ],
          solution: `The second stanza says the kite "would lift, then dip, then fall" and "scraped the grass." The kite does not climb high until the fourth stanza.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `How does the third stanza add to the structure of the poem?`,
          choices: [
            wrong(`It describes the setting of the hill for the very first time.`, 'wrong-stanza'),
            right(`It shows the lowest, most tired moment before the kite succeeds.`),
            wrong(`It explains how the speaker learned to fly kites last summer.`, 'unsupported-inference'),
            wrong(`It shows the brother and speaker celebrating their success.`, 'reverses-sequence'),
          ],
          solution: `In the third stanza the brother sighs, the speaker's hands are sore, and the speaker wonders "what we came here for," which is the low point just before the success. The setting was already introduced in the first stanza.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `Which line marks the turning point of the poem?`,
          choices: [
            wrong(`"Our paper kite just hung in air."`, 'wrong-plot-stage'),
            wrong(`"My knees were green, my hands were sore."`, 'wrong-plot-stage'),
            wrong(`"We watched it dance until the dark."`, 'wrong-plot-stage'),
            right(`"I said, 'One more.' I don't know why."`),
          ],
          solution: `When the speaker decides to try "One more" time instead of going home, the events change and the kite finally flies. The line about sore knees comes before the decision and still describes the struggle.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `How does calling the kite "a stubborn spark" in the last stanza help develop the theme?`,
          choices: [
            right(`It links the kite to the speaker's refusal to quit, showing that persistence pays off.`),
            wrong(`It suggests the kite is dangerous and could start a fire on the dry hill.`, 'literal-reading'),
            wrong(`It shows the speaker is annoyed that the kite will not come back down.`, 'misreads-tone'),
            wrong(`It reveals that the brother was the one who wanted to keep trying all along.`, 'contradicts-text'),
          ],
          solution: `The speaker was stubborn by saying "One more" when the brother wanted to leave, so calling the kite stubborn connects its success to that persistence. The word "spark" describes the bright red color, not a real fire.`,
        },
      ],
    },
    {
      code: 'rg6-literary-structure-pov-p03',
      title: 'The Squirrel Who Made a Map',
      body: `In a forest of tall oaks lived two squirrels named Pip and Bramble. Every autumn, both of them gathered acorns and buried them in the ground for winter.

Pip worked fast. He raced from tree to tree, digging a hole wherever he happened to stop. "Why waste time thinking?" he chattered. "I will remember."

Bramble worked slowly. After burying each acorn, she set a small white pebble on top of the spot. Then she climbed to her branch and scratched a mark into the bark, one mark for every hiding place, arranged just like the forest floor below.

Pip laughed at her. "You will spend the whole autumn drawing pictures, and you will go hungry by the first snow."

Bramble only smiled and kept working.

Winter came early that year. Snow covered the ground in a thick white blanket, and every patch of ground looked exactly the same. Pip dug here and there until his paws were numb. He found nothing but frozen dirt.

Bramble studied the marks on her branch. Then she brushed the snow away from one spot after another, and each time she found a white pebble with an acorn beneath it.

That evening, a hungry Pip knocked on her door. Bramble opened it and handed him a pile of acorns. "Next autumn," she said, "I will teach you to read the bark."

Moral: Careful work done today is a gift to your future self.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which statement best describes the narrator of this fable?`,
          choices: [
            wrong(`Pip tells the story using "I" to describe his own mistakes.`, 'confuses-first-and-third-person'),
            wrong(`Bramble tells the story using "I" to explain her method.`, 'confuses-first-and-third-person'),
            right(`A narrator outside the story describes both squirrels' actions.`),
            wrong(`A forest animal who watched both squirrels tells what it saw.`, 'unsupported-inference'),
          ],
          solution: `The fable calls the squirrels "he" and "she" and reports what each one does and says, so the narrator is outside the story. The squirrels only say "I" inside their own dialogue.`,
        },
        {
          slot: 12,
          difficulty: 'easy',
          stem: `What is the purpose of the last line, which begins with "Moral"?`,
          choices: [
            wrong(`It describes what happens to the squirrels the next autumn.`, 'misreads-purpose'),
            right(`It states the lesson that the events of the fable have shown.`),
            wrong(`It introduces a new character who will appear in the next fable.`, 'unsupported-inference'),
            wrong(`It repeats the first sentence so the fable ends where it began.`, 'contradicts-text'),
          ],
          solution: `A moral at the end of a fable states the lesson, here that careful work today helps you later, which is what Bramble's success shows. It does not tell what happens the next autumn.`,
        },
        {
          slot: 13,
          difficulty: 'medium',
          stem: `Why does the author include the paragraph in which Pip laughs at Bramble?`,
          choices: [
            wrong(`It shows that Pip is the wiser squirrel and will win in the end.`, 'misreads-character'),
            wrong(`It explains how Bramble learned to scratch marks into the bark.`, 'unsupported-inference'),
            wrong(`It describes the weather that makes the winter come so early.`, 'wrong-paragraph'),
            right(`It sets up a prediction that the winter events will prove wrong.`),
          ],
          solution: `Pip predicts that Bramble "will go hungry by the first snow," and the winter section shows the opposite: Pip is the one who goes hungry. The paragraph builds the contrast that the ending reverses, rather than showing Pip as wise.`,
        },
        {
          slot: 14,
          difficulty: 'medium',
          stem: `How does the paragraph that begins "Winter came early that year" move the plot forward?`,
          choices: [
            right(`It shows the result of Pip's rushed method when he cannot find his acorns.`),
            wrong(`It shows Bramble deciding to stop drawing marks and start digging faster.`, 'contradicts-text'),
            wrong(`It introduces the two squirrels and tells where in the forest they live.`, 'wrong-plot-stage'),
            wrong(`It shows Pip finally learning to read the marks on Bramble's branch.`, 'reverses-sequence'),
          ],
          solution: `In this paragraph the snow makes every spot look the same, and Pip finds "nothing but frozen dirt," which is the consequence of not planning. Learning to read the bark is only promised for next autumn at the very end.`,
        },
        {
          slot: 15,
          difficulty: 'hard',
          stem: `Why might the author end the fable with Bramble offering to teach Pip instead of turning him away?`,
          choices: [
            wrong(`To show that Bramble regrets all the time she spent making her map.`, 'contradicts-text'),
            wrong(`To suggest that the moral is wrong and planning ahead is not needed.`, 'misreads-theme'),
            right(`To show that careful work can be shared and that Pip still has a chance to change.`),
            wrong(`To explain that Bramble has run out of acorns and needs Pip's help.`, 'unsupported-inference'),
          ],
          solution: `Bramble gives Pip acorns and offers to teach him "next autumn," so the ending shows her planning helps others and gives Pip a way to plan better. She has plenty of acorns to share, so she is not asking for help.`,
        },
      ],
    },
    {
      code: 'rg6-literary-structure-pov-p04',
      title: 'The Red Moon',
      body: `Arjun did not understand why anyone would stay up past midnight to look at the moon. He had seen the moon hundreds of times. It was round, it was white, and it was always there.

But his grandmother had set two folding chairs on the flat roof of their apartment building, and she had brought a thermos of hot cocoa. So Arjun climbed the stairs, yawning, and sat down beside her.

"Watch the left edge," Nani said, pointing.

At first, nothing happened. Arjun checked the time on his watch. Then he noticed a thin, dark curve creeping across the moon, like a bite taken out of a cracker. He sat up a little straighter.

The shadow kept moving. Nani explained that it was the shadow of the earth itself, falling across the moon as the earth passed between the moon and the sun. Arjun thought about that. Right now, he was sitting on the very thing that was making the shadow.

Then came the strangest part. When the shadow covered the whole moon, the moon did not disappear. It glowed a deep, coppery red, like a coal in a campfire. The street below was quiet. Arjun forgot about his watch completely.

"Why is it red?" he whispered.

"Sunlight bending around the earth," Nani said. "Every sunrise and sunset in the world, all at once, shining on the moon."

Arjun stared until his neck hurt. He decided he would have to look at the moon much more carefully from now on.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which choice best describes the point of view of this story?`,
          choices: [
            wrong(`Arjun tells the story himself, using the words "I" and "me."`, 'confuses-first-and-third-person'),
            right(`A third-person narrator shares Arjun's thoughts and feelings.`),
            wrong(`Nani tells the story, describing how her grandson reacted.`, 'confuses-narrator-with-character'),
            wrong(`A third-person narrator shares only Nani's private thoughts.`, 'wrong-character-focus'),
          ],
          solution: `The narrator calls Arjun "he" but tells us what he thinks, such as that he "did not understand" the fuss about the moon. We only learn what Nani says aloud, never her private thoughts.`,
        },
        {
          slot: 17,
          difficulty: 'easy',
          stem: `How does Arjun feel about watching the moon at the beginning of the story?`,
          choices: [
            wrong(`He is excited because he has never seen the moon before.`, 'contradicts-text'),
            wrong(`He is nervous about sitting on the roof so late at night.`, 'unsupported-inference'),
            wrong(`He is curious because his grandmother told him about the red color.`, 'reverses-sequence'),
            right(`He doubts that it is worth staying up past midnight to see it.`),
          ],
          solution: `The first paragraph says he "did not understand why anyone would stay up" because he had seen the moon "hundreds of times." He learns about the red color only near the end.`,
        },
        {
          slot: 18,
          difficulty: 'medium',
          stem: `What does the detail about Arjun's watch, first checked and later forgotten, show?`,
          choices: [
            right(`His feelings change from boredom to deep interest as the eclipse goes on.`),
            wrong(`He is worried about getting enough sleep before school the next day.`, 'unsupported-inference'),
            wrong(`The eclipse lasts a much shorter time than his grandmother expected.`, 'unsupported-inference'),
            wrong(`His watch stops working once the moon turns a coppery red color.`, 'literal-reading'),
          ],
          solution: `Checking the time early shows he is waiting for it to be over, and forgetting the watch when the moon turns red shows he is now absorbed. Nothing in the story mentions school or sleep the next day.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `How does the paragraph that begins "The shadow kept moving" contribute to the story?`,
          choices: [
            wrong(`It introduces the setting of the rooftop and the folding chairs.`, 'wrong-paragraph'),
            wrong(`It shows Arjun deciding to go back downstairs to bed early.`, 'contradicts-text'),
            right(`It deepens Arjun's interest as he realizes he is part of the event.`),
            wrong(`It resolves the story by explaining why the moon turns red.`, 'wrong-plot-stage'),
          ],
          solution: `Arjun thinks about the fact that he is "sitting on the very thing that was making the shadow," which builds his growing wonder. The reason for the red color is explained later, near the end.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `Why is it effective for the story to follow Arjun's thoughts rather than Nani's?`,
          choices: [
            wrong(`Nani does not know anything about the eclipse, so she could not explain it.`, 'contradicts-text'),
            wrong(`Arjun is the only character who speaks, so readers can only hear from him.`, 'contradicts-text'),
            wrong(`Following Nani would let the author skip the explanation of the shadow.`, 'misreads-purpose'),
            right(`Readers start out doubtful like Arjun, so they share his growing sense of wonder.`),
          ],
          solution: `Because the story stays with Arjun, readers move with him from "it was always there" to deciding to look "much more carefully." Nani clearly knows a lot, since she explains both the shadow and the red color.`,
        },
      ],
    },
    {
      code: 'rg6-literary-structure-pov-p05',
      title: 'The Old Ferry Speaks',
      body: `For sixty years I carried them across.
Farmers came with baskets of peaches.
Children pressed their noses to my rails.
A doctor rode me every Tuesday, holding a black bag.

I knew the river better than anyone.
I knew where the sandbars hid in August.
I knew how the fog rolled in on spring mornings,
thick as wool, and how to wait it out.

Then the workers came with steel and concrete.
Season after season, I watched the bridge grow,
one gray arch at a time, across my river.

Now cars hum above me all day long.
They cross in two minutes, not twenty.
No one presses a nose to a bridge rail.
No one waves at a bridge.

They tied me to the dock and painted me white.
A sign beside me tells my story to visitors.
Sometimes a child reads it out loud,
and I feel the river shift beneath me,
as if it remembers too.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Who is the speaker of this poem?`,
          choices: [
            wrong(`A doctor who rode across the river every Tuesday`, 'confuses-narrator-with-character'),
            right(`The old ferry boat that once carried people across`),
            wrong(`A child who reads the sign beside the dock`, 'confuses-narrator-with-character'),
            wrong(`A worker who helped build the new bridge`, 'unsupported-inference'),
          ],
          solution: `The speaker says "I carried them across" and "They tied me to the dock," so the speaker is the ferry itself. The doctor and the child are people the ferry describes, not the speaker.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `How does the second stanza develop the speaker's point of view?`,
          choices: [
            right(`It shows the ferry's pride in knowing the river well.`),
            wrong(`It shows the ferry's fear of the fog and sandbars.`, 'misreads-tone'),
            wrong(`It shows the ferry's anger at the bridge workers.`, 'wrong-stanza'),
            wrong(`It shows the ferry's wish to be painted white.`, 'unsupported-inference'),
          ],
          solution: `The repeated phrase "I knew" and the claim to know the river "better than anyone" show pride in its skill. The ferry knew how "to wait it out," so it was not afraid of the fog.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `What is the role of the third stanza in the structure of the poem?`,
          choices: [
            wrong(`It describes the people who rode the ferry in its busy years.`, 'wrong-stanza'),
            wrong(`It ends the poem by showing how visitors remember the ferry.`, 'wrong-plot-stage'),
            right(`It marks the shift from the ferry's working life to a time of change.`),
            wrong(`It explains why the ferry was always slower than the cars.`, 'unsupported-inference'),
          ],
          solution: `The word "Then" and the building of the bridge in the third stanza move the poem from the ferry's busy past to its replacement. The riders are described in the first stanza, not the third.`,
        },
        {
          slot: 24,
          difficulty: 'hard',
          stem: `The lines "No one presses a nose to a bridge rail. / No one waves at a bridge." connect to the first stanza in order to show:`,
          choices: [
            wrong(`that the bridge is less safe than the ferry because of its rails.`, 'literal-reading'),
            wrong(`that children no longer live in the town near the river.`, 'unsupported-inference'),
            wrong(`that the ferry is happy to have a long rest from its work.`, 'misreads-tone'),
            right(`that the ferry believes the people lost a personal connection.`),
          ],
          solution: `In the first stanza children "pressed their noses to my rails," and these lines say no one does that with a bridge, so the ferry feels something personal was lost. Nothing in the poem says the bridge is unsafe.`,
        },
        {
          slot: 25,
          difficulty: 'hard',
          stem: `How does the final stanza change the feeling of the poem?`,
          choices: [
            wrong(`It turns the ferry's sadness into anger at the visitors.`, 'misreads-tone'),
            right(`It moves from loss toward comfort that the ferry is remembered.`),
            wrong(`It reveals that the ferry will soon return to carrying riders.`, 'unsupported-inference'),
            wrong(`It shifts the speaker from the ferry to the river itself.`, 'confuses-narrator-with-character'),
          ],
          solution: `A sign "tells my story," and when a child reads it the ferry feels the river "remembers too," which softens the sense of loss. The ferry is still the speaker; the river is only described as if it remembers.`,
        },
      ],
    },
    {
      code: 'rg6-literary-structure-pov-p06',
      title: 'Two Views of the Finish Line',
      body: `KENJI

The hill nearly finished me. Halfway up, my legs turned to sand, and three runners slipped past me like I was standing still. I could hear my own breathing, loud and ragged, and I was sure everyone on the sidelines could hear it too.

By the time I crossed the finish line, I did not even look at the clock. I walked to the edge of the field, sat down in the grass, and put my head on my knees. I had trained all summer, and I still could not handle one hill. The team had counted on me, and I had let them down.

HANA

I was standing near the finish with my dad when my brother came around the last corner. He looked awful, his face red and his arms flopping. But there was a runner in a green jersey just ahead of him, and Kenji's eyes locked onto that jersey.

He caught the green runner ten steps before the line. Our whole team screamed. Coach Adeyemi jumped so high that her clipboard flew out of her hand.

Later, the results went up on the board. Our team had finished in third place, just one point ahead of the green team. That one point was Kenji's.

I ran across the field to tell him. He was sitting alone with his head down, and he did not even know yet.`,
      items: [
        {
          slot: 26,
          difficulty: 'easy',
          stem: `How is this story organized?`,
          choices: [
            wrong(`It is one section told by Coach Adeyemi after the race.`, 'confuses-narrator-with-character'),
            wrong(`It is a list of race results followed by a short summary.`, 'misreads-structure'),
            right(`It is two sections, each told by a different character.`),
            wrong(`It is two sections, both told by Kenji on different days.`, 'misreads-structure'),
          ],
          solution: `The headings KENJI and HANA show that the first part is told by Kenji and the second by his sister Hana. Both sections describe the same race, not different days.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `How does Kenji view his own race?`,
          choices: [
            right(`He believes he let the team down because the hill slowed him.`),
            wrong(`He is proud that he passed the runner in the green jersey.`, 'confuses-narrators'),
            wrong(`He thinks the hill was easy because he trained all summer.`, 'contradicts-text'),
            wrong(`He is angry at the coach for placing him in a hard race.`, 'unsupported-inference'),
          ],
          solution: `Kenji says "the hill nearly finished me" and "I had let them down." Passing the green runner is only reported in Hana's section, and Kenji never mentions it.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `What does Hana's section reveal that Kenji's section does not?`,
          choices: [
            wrong(`Three runners passed Kenji while he was climbing the hill.`, 'confuses-narrators'),
            wrong(`Kenji trained for the race during the entire summer.`, 'confuses-narrators'),
            wrong(`Kenji sat at the edge of the field with his head down.`, 'too-narrow'),
            right(`Kenji passed a runner at the end and earned the deciding point.`),
          ],
          solution: `Only Hana tells us that Kenji "caught the green runner" and that "that one point was Kenji's." The runners passing him on the hill and his summer training come from Kenji's own section.`,
        },
        {
          slot: 29,
          difficulty: 'medium',
          stem: `Why does Hana mention that Coach Adeyemi's clipboard flew out of her hand?`,
          choices: [
            wrong(`To show that the coach was clumsy and often dropped things.`, 'literal-reading'),
            right(`To show how exciting and important Kenji's final pass was.`),
            wrong(`To explain why the race results were posted so late.`, 'confuses-cause-effect'),
            wrong(`To show that the coach was upset with how Kenji ran.`, 'misreads-tone'),
          ],
          solution: `The coach "jumped so high" right after Kenji caught the green runner, while the whole team screamed, which shows how thrilling the moment was. The detail is about joy, not clumsiness or anger.`,
        },
        {
          slot: 30,
          difficulty: 'hard',
          stem: `How does placing Kenji's section before Hana's affect the story?`,
          choices: [
            wrong(`It lets readers learn the final score first, so the ending is no surprise.`, 'reverses-sequence'),
            wrong(`It shows that Hana understands running better than her brother does.`, 'unsupported-inference'),
            right(`Readers share Kenji's disappointment first, so Hana's news becomes a surprising reversal.`),
            wrong(`It proves that Kenji's account of the hill is false and should be ignored.`, 'overstates-claim'),
          ],
          solution: `Kenji's section ends with him sure he failed, and Hana's section then shows he earned the deciding point, so the order creates a surprise and shows he judged himself too harshly. Hana does not say the hill was easy; she agrees he "looked awful."`,
        },
      ],
    },
    {
      code: 'rg6-literary-structure-pov-p07',
      title: 'The Kitchen Table Mystery',
      body: `My sister Nia has been acting very strange since Grandpa Felix moved in with us.

Every afternoon, the two of them sit at the kitchen table with Nia's old tablet. They whisper. They giggle. When I walk in, Nia snaps the cover shut and says, "Go do your homework, Theo." I already did my homework. I always do my homework first.

Yesterday I saw Grandpa carrying a shoebox full of old photographs from his room. When he spotted me, he pushed it behind his back, which is not easy to do with a shoebox. I think they are playing some kind of game, and they do not want me to join because I am only eight.

At dinner, Grandpa asked me, out of nowhere, what my favorite song was. I told him it was the one about the dancing raccoon that Mom sings in the car. Nia kicked him under the table. I saw it.

Today Nia asked Grandpa, "Did you remember how to add the music?" Grandpa said, "Tap the little note, then pick the song." Then they both looked at me and stopped talking.

I am going to find out what this game is. My birthday is on Saturday, so I will be too busy to investigate then. I will start on Sunday.`,
      items: [
        {
          slot: 31,
          difficulty: 'easy',
          stem: `Who is the narrator of this story?`,
          choices: [
            wrong(`Nia, an older sister who is helping her grandfather`, 'confuses-narrator-with-character'),
            wrong(`Grandpa Felix, who has just moved in with the family`, 'confuses-narrator-with-character'),
            right(`Theo, an eight-year-old boy who is watching his family`),
            wrong(`Mom, who sings songs to her children in the car`, 'confuses-narrator-with-character'),
          ],
          solution: `Nia calls the narrator "Theo," and he says "I am only eight," so Theo is telling the story. Nia is described from the outside, through what Theo sees.`,
        },
        {
          slot: 32,
          difficulty: 'medium',
          stem: `What does Theo believe Nia and Grandpa are doing?`,
          choices: [
            right(`Playing a secret game that they want to keep him out of`),
            wrong(`Planning a surprise party for their mother on Saturday`, 'unsupported-inference'),
            wrong(`Helping Grandpa unpack the boxes from his old house`, 'too-narrow'),
            wrong(`Finishing a homework project that Nia was assigned`, 'unsupported-inference'),
          ],
          solution: `Theo says, "I think they are playing some kind of game, and they do not want me to join." He never mentions a party for Mom or a homework project.`,
        },
        {
          slot: 33,
          difficulty: 'medium',
          stem: `Which detail most helps the reader figure out something Theo has not figured out?`,
          choices: [
            wrong(`Theo always finishes his homework before doing anything else.`, 'irrelevant-detail'),
            wrong(`Grandpa Felix has recently moved in with Theo's family.`, 'irrelevant-detail'),
            wrong(`Mom likes to sing songs to the children in the car.`, 'irrelevant-detail'),
            right(`Nia asks Grandpa whether he remembered how to add the music.`),
          ],
          solution: `Adding music, together with the photos and the question about Theo's favorite song, points to a slideshow being made for Theo. Theo's homework habit tells us about him but gives no clue about the secret.`,
        },
        {
          slot: 34,
          difficulty: 'hard',
          stem: `How does the author create a difference between what Theo understands and what the reader understands?`,
          choices: [
            wrong(`Theo leaves out the clues, so the reader must guess from nothing at all.`, 'contradicts-text'),
            right(`Theo reports the clues accurately but does not connect them, while the reader can.`),
            wrong(`Theo knows the secret already but pretends not to, which tricks the reader.`, 'misreads-character'),
            wrong(`The narrator switches to Nia at the end, and she explains the whole secret.`, 'misreads-structure'),
          ],
          solution: `Theo honestly describes the photos, the song question, the music, and his birthday, but he decides it is just a game; readers can connect these clues to a birthday surprise. The story is told only by Theo and never switches to Nia.`,
        },
        {
          slot: 35,
          difficulty: 'hard',
          stem: `Why is the final paragraph humorous?`,
          choices: [
            wrong(`Theo admits that he already knows about the slideshow but will act surprised.`, 'misreads-character'),
            wrong(`Theo decides to quit investigating because the game seems too boring.`, 'contradicts-text'),
            right(`Theo plans to investigate after his birthday, when the secret is likely to be revealed.`),
            wrong(`Theo realizes that Nia and Grandpa are playing a game about detectives.`, 'unsupported-inference'),
          ],
          solution: `The clues suggest the surprise is for his birthday on Saturday, so Theo's plan to start investigating on Sunday is funny because it will probably be too late. He never says he knows about a slideshow.`,
        },
      ],
    },
    {
      code: 'rg6-literary-structure-pov-p08',
      title: 'Field Notes from Fossil Week',
      body: `Monday, July 8

Today was the first day of Fossil Week at the natural history museum. I was hoping we would dig up a dinosaur. Instead, Dr. Varga handed each of us a bucket of gravel, a sieve, and a magnifying glass. Our job is to sort the gravel, grain by grain, looking for tiny fossils. After three hours, I had found nothing but sore fingers. I am starting to think this week was a mistake.

Wednesday, July 10

Something happened today. I was shaking my sieve for the hundredth time when I noticed a speck shaped like a coiled ribbon. I almost brushed it away. Dr. Varga looked at it under the microscope and said it was the shell of a sea creature smaller than a grain of rice. It lived here long ago, when this whole area was covered by a shallow ocean. An ocean! Right where the parking lot is now. I could not stop thinking about that all afternoon.

Friday, July 12

Today we labeled our finds for the museum collection. My little shell got its own glass vial and a tag with my name on it. Dr. Varga said scientists learn about ancient oceans from thousands of tiny fossils like mine, not just from big bones. On the bus home, I looked out the window at the gravel along the road. I used to think it was just rocks. Now I wonder what is hiding in it.`,
      items: [
        {
          slot: 36,
          difficulty: 'easy',
          stem: `How is this passage organized?`,
          choices: [
            wrong(`As a set of instructions for finding fossils in gravel`, 'misreads-structure'),
            right(`As dated journal entries written over one week, in time order`),
            wrong(`As a conversation between a student and Dr. Varga`, 'misreads-structure'),
            wrong(`As journal entries that begin on Friday and move backward`, 'reverses-sequence'),
          ],
          solution: `Each section begins with a date, Monday, Wednesday, then Friday, so the passage is a journal in time order. It is not a set of steps, even though it describes sorting gravel.`,
        },
        {
          slot: 37,
          difficulty: 'medium',
          stem: `How does the narrator feel at the end of the Monday entry?`,
          choices: [
            wrong(`Thrilled, because the narrator has already found a dinosaur bone`, 'contradicts-text'),
            wrong(`Curious, because Dr. Varga promised a big discovery soon`, 'unsupported-inference'),
            right(`Disappointed, because the work is slow and nothing has been found`),
            wrong(`Proud, because the narrator's shell was chosen for the museum collection`, 'reverses-sequence'),
          ],
          solution: `The narrator writes "I had found nothing but sore fingers" and thinks "this week was a mistake." The shell is not found until Wednesday and is labeled on Friday.`,
        },
        {
          slot: 38,
          difficulty: 'medium',
          stem: `What role does the Wednesday entry play in the structure of the passage?`,
          choices: [
            right(`It is the turning point, when a discovery starts to change the narrator's attitude.`),
            wrong(`It introduces the setting and explains what Fossil Week will involve.`, 'wrong-plot-stage'),
            wrong(`It ends the passage by showing how the narrator now sees the world.`, 'wrong-plot-stage'),
            wrong(`It gives background about how Dr. Varga became a museum scientist.`, 'unsupported-inference'),
          ],
          solution: `On Wednesday the narrator finds the tiny shell and "could not stop thinking about" the ancient ocean, which begins the change. The setting and the task are introduced on Monday, not Wednesday.`,
        },
        {
          slot: 39,
          difficulty: 'medium',
          stem: `Why does writing the passage as the narrator's own journal suit this story?`,
          choices: [
            wrong(`It lets the reader hear what every student in the program was thinking.`, 'confuses-first-and-third-person'),
            wrong(`It allows Dr. Varga to explain the science in Dr. Varga's own words and voice.`, 'confuses-narrator-with-character'),
            wrong(`It hides the narrator's feelings so the reader must guess them alone.`, 'contradicts-text'),
            right(`It shows the narrator's private feelings changing from one day to the next.`),
          ],
          solution: `Journal entries let the narrator share thoughts such as "this week was a mistake" and "Now I wonder," so readers can trace the narrator's change across the week. A journal shows only the narrator's thoughts, not every student's.`,
        },
        {
          slot: 40,
          difficulty: 'hard',
          stem: `How does the last part of the Friday entry, about the gravel along the road, connect to the Monday entry?`,
          choices: [
            wrong(`It shows that the narrator still finds sorting gravel just as dull as on Monday.`, 'misreads-character'),
            right(`Gravel that bored the narrator on Monday now sparks wonder about hidden fossils.`),
            wrong(`It shows that the narrator plans to quit Fossil Week and collect road gravel instead.`, 'unsupported-inference'),
            wrong(`It repeats Monday's complaint about sore fingers to show the narrator's hard work.`, 'too-narrow'),
          ],
          solution: `On Monday the gravel gave the narrator "nothing but sore fingers," but on Friday the narrator writes, "I used to think it was just rocks. Now I wonder what is hiding in it." This shows the narrator's view has completely changed, not stayed the same.`,
        },
      ],
    },
  ],
}

export default skill
