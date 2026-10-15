import type { ContentChoice, ContentSkill } from '../../types'

const ok = (text: string): ContentChoice => ({ text, is_correct: true })
const no = (text: string, misconception_token: string): ContentChoice => ({ text, is_correct: false, misconception_token })

const skill: ContentSkill = {
  slug: 'write-g10-paragraph-transitions',
  subject: 'writing',
  grade: 10,
  group: 'Sentence and paragraph',
  name: 'Paragraph Organization and Transitions',
  standards: ['W.9-10.2c'],
  passages: [
    {
      code: 'wg10-paragraph-transitions-p01',
      title: 'When Railroads Set the Clocks',
      body: `(1) Before the late 1800s, every town in the United States kept its own time, setting its clocks so that noon fell at the moment the sun stood highest overhead. (2) For farmers and shopkeepers, this local system worked well enough, since few people traveled far enough in a single day to notice the difference. (3) ____, the spread of railroads turned this patchwork of local times into a serious problem. (4) A train leaving one city might pass through dozens of towns, each with a slightly different idea of what time it was. (5) Some busy stations displayed several clocks side by side, each one showing the time used by a different rail company.

(6) Railroad managers eventually agreed on a solution that seems obvious today. (7) They divided the country into a small number of zones, each one hour apart, and every station within a zone would keep the same time. (8) On the chosen day in 1883, clocks in many towns were reset by a few minutes, and some residents joked that their town had experienced two noons in a single day. (9) Steam engines of that era burned large amounts of coal and wood. (10) ____, not every community welcomed the change, and a few local newspapers complained that private companies had no right to decide what time it was.

(11) Over the following decades, the zone system spread from the rails into ordinary life. (12) Schools, banks, and factories found that a shared time made schedules far easier to coordinate across long distances. (13) ____, the national government made the zones official law in 1918, long after most citizens had already adopted them in their daily routines.`,
      items: [
        {
          slot: 1,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 3?`,
          choices: [
            ok(`However,`),
            no(`For example,`, 'example-for-contrast'),
            no(`Similarly,`, 'comparison-for-contrast'),
            no(`In other words,`, 'restatement-for-contrast'),
          ],
          solution: `Sentence 2 says the local system worked well enough, and sentence 3 says railroads turned it into a problem, so "However" signals the contrast. "For example" is wrong because sentence 3 does not illustrate sentence 2; it reverses it.`,
        },
        {
          slot: 2,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 7`, 'removes-key-detail'),
            no(`Sentence 8`, 'removes-supporting-detail'),
            ok(`Sentence 9`),
            no(`Sentence 10`, 'removes-supporting-detail'),
          ],
          solution: `The second paragraph describes how the time zones were created and how people reacted, and the fuel that steam engines burned has nothing to do with that. Sentence 8 belongs because it shows the change actually taking place in towns.`,
        },
        {
          slot: 3,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 10?`,
          choices: [
            ok(`Even so,`),
            no(`Therefore,`, 'cause-for-concession'),
            no(`For instance,`, 'example-for-concession'),
            no(`Likewise,`, 'comparison-for-concession'),
          ],
          solution: `Sentences 7 and 8 describe the zones being adopted, and sentence 10 admits that some communities objected, so "Even so" introduces a point that cuts against the success just described. "Therefore" is wrong because the complaints were not caused by people joking about two noons.`,
        },
        {
          slot: 4,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 13?`,
          choices: [
            ok(`Eventually,`),
            no(`On the other hand,`, 'contrast-for-sequence'),
            no(`For example,`, 'example-for-sequence'),
            no(`In contrast,`, 'contrast-for-sequence'),
          ],
          solution: `Sentence 13 describes the final step in a process that unfolded "over the following decades," so "Eventually" fits the time order of the paragraph. "On the other hand" is wrong because making the zones law agrees with, rather than opposes, their spread into daily life.`,
        },
        {
          slot: 5,
          difficulty: 'hard',
          stem: `The writer wants to add a concluding sentence after sentence 13. Which choice best concludes the passage?`,
          choices: [
            ok(`A system invented to keep trains on schedule had quietly become the way an entire nation measured its days.`),
            no(`Some of the old station clocks from that era are now displayed in museums across the country.`, 'too-narrow'),
            no(`Railroads also changed how mail, newspapers, and fresh food traveled between distant cities.`, 'introduces-new-topic'),
            no(`Therefore, every town should have refused to change its clocks until the government acted.`, 'contradicts-passage'),
          ],
          solution: `The correct choice ties together the whole passage, from the railroads' problem to the nation's adoption of the zones. The sentence about other things railroads changed is tempting because it mentions railroads, but it opens a new topic instead of closing the one the passage developed.`,
        },
      ],
    },
    {
      code: 'wg10-paragraph-transitions-p02',
      title: 'Cooler Cities from the Top Down',
      body: `(1) On a summer afternoon, a dark asphalt roof can become far hotter than the air around it, sometimes hot enough to burn a bare hand. (2) Dark surfaces absorb most of the sunlight that strikes them and convert that energy into heat. (3) ____, the buildings beneath them warm up, and their air conditioners must run longer to keep the rooms comfortable. (4) When thousands of roofs in a city behave this way, they help create what scientists call an urban heat island, a zone that stays noticeably warmer than the surrounding countryside.

(5) One response to this problem is the cool roof, a roof covered with a light-colored or specially coated material that reflects much of the incoming sunlight. (6) ____ a dark roof might reflect only a small fraction of the light that reaches it, a bright white coating can send most of that energy back toward the sky. (7) The difference shows up indoors, where top-floor rooms stay cooler and electricity bills often drop during the hottest months. (8) Some older buildings also have decorative stone carvings above their front doors.

(9) Cool roofs are not the right choice for every place, however. (10) In regions with long, cold winters, a building may actually benefit from the heat a dark roof absorbs, so a reflective roof could raise heating costs. (11) White coatings also need regular cleaning, because dust and grime gradually reduce how much light they reflect. (12) ____, city planners in hot climates increasingly see cool roofs as one of the simplest ways to make neighborhoods more livable.`,
      items: [
        {
          slot: 6,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 3?`,
          choices: [
            ok(`As a result,`),
            no(`In contrast,`, 'contrast-for-effect'),
            no(`For example,`, 'example-for-effect'),
            no(`Despite this,`, 'concession-for-effect'),
          ],
          solution: `Sentence 2 explains that dark roofs turn sunlight into heat, and sentence 3 gives the effect on the buildings below, so "As a result" fits. "Despite this" is wrong because the warming happens because of the heat, not in spite of it.`,
        },
        {
          slot: 7,
          difficulty: 'easy',
          stem: `Which sentence should be removed because it does not support the main idea of its paragraph?`,
          choices: [
            no(`Sentence 5`, 'removes-topic-sentence'),
            no(`Sentence 6`, 'removes-key-detail'),
            no(`Sentence 7`, 'removes-supporting-detail'),
            ok(`Sentence 8`),
          ],
          solution: `The second paragraph explains how cool roofs reflect sunlight and keep buildings cooler, and stone carvings above doors have nothing to do with that. Sentence 7 stays because it shows the practical benefit of the reflection described in sentence 6.`,
        },
        {
          slot: 8,
          difficulty: 'medium',
          stem: `Which word best fills the blank at the beginning of sentence 6?`,
          choices: [
            ok(`Whereas`),
            no(`Because`, 'cause-for-contrast'),
            no(`Unless`, 'condition-for-contrast'),
            no(`Until`, 'time-for-contrast'),
          ],
          solution: `Sentence 6 compares a dark roof that reflects little light with a white coating that reflects most of it, so "Whereas" sets up the contrast. "Because" is wrong since a dark roof's poor reflection does not cause a white coating to reflect well.`,
        },
        {
          slot: 9,
          difficulty: 'medium',
          stem: `What is the main function of sentence 9 in the passage?`,
          choices: [
            ok(`It shifts the passage from the benefits of cool roofs to their limitations.`),
            no(`It gives an example of how a cool roof lowers electricity bills.`, 'misreads-function'),
            no(`It restates the definition of a cool roof from sentence 5.`, 'restatement-confusion'),
            no(`It explains what causes an urban heat island to form.`, 'wrong-paragraph-focus'),
          ],
          solution: `After a paragraph about how cool roofs help, sentence 9 announces that they are not right for every place, and sentences 10 and 11 then give the drawbacks. It does not give an example of savings, since that idea belongs to sentence 7.`,
        },
        {
          slot: 10,
          difficulty: 'hard',
          stem: `Which transition best fills the blank at the beginning of sentence 12?`,
          choices: [
            ok(`Despite these drawbacks,`),
            no(`Because of these drawbacks,`, 'confuses-cause-effect'),
            no(`To illustrate these drawbacks,`, 'example-for-concession'),
            no(`In addition to these drawbacks,`, 'addition-for-concession'),
          ],
          solution: `Sentences 10 and 11 list problems with cool roofs, yet sentence 12 says planners still favor them, so "Despite these drawbacks" signals that the support holds in spite of the problems. "Because of these drawbacks" is tempting since it refers back to the same sentences, but the drawbacks could not be the reason planners like cool roofs.`,
        },
      ],
    },
    {
      code: 'wg10-paragraph-transitions-p03',
      title: 'Eight Rowers, One Rhythm',
      body: `(1) To a spectator on the riverbank, a racing shell with eight rowers seems to glide forward with almost no effort. (2) In reality, that smooth motion depends on a level of coordination that takes crews months to develop. (3) Every rower must place the oar blade in the water at exactly the same instant, pull with matching force, and lift the blade out together. (4) If even one rower is a fraction of a second early or late, the boat rocks to one side and loses speed.

(5) Because rowers sit facing backward, toward the stern of the boat, they cannot see where they are going. (6) ____, the crew relies on the coxswain, a small team member who sits at the stern facing forward. (7) The coxswain steers the boat, calls out the rhythm of the strokes, and tells the crew when to push harder. (8) ____, a good coxswain also watches the other boats and decides when the crew should try to pass a rival. (9) This is why the coxswain is often described as a coach who travels inside the boat.

(10) Crews build their timing through hours of drills on the water and on rowing machines in the gym. (11) In one common drill, only half the crew pulls while the others hold their oars flat to keep the boat balanced. (12) The rowing season usually ends with a championship race in late spring. (13) Exercises like this train each athlete to feel the rhythm of the boat rather than simply counting strokes.`,
      items: [
        {
          slot: 11,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 6?`,
          choices: [
            ok(`For this reason,`),
            no(`However,`, 'contrast-for-effect'),
            no(`For instance,`, 'example-for-effect'),
            no(`Similarly,`, 'comparison-for-effect'),
          ],
          solution: `Sentence 5 explains that rowers cannot see where they are going, and sentence 6 gives the result: they depend on the coxswain. "However" is wrong because relying on the coxswain follows from the problem instead of contradicting it.`,
        },
        {
          slot: 12,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 8?`,
          choices: [
            ok(`Beyond these duties,`),
            no(`Instead of these duties,`, 'replacement-for-addition'),
            no(`Because of these duties,`, 'cause-for-addition'),
            no(`Before these duties,`, 'time-for-addition'),
          ],
          solution: `Sentence 7 lists the coxswain's basic jobs, and sentence 8 adds another one, planning when to pass, so "Beyond these duties" signals addition. "Instead of these duties" is wrong because the coxswain does not stop steering or calling the rhythm in order to watch rivals.`,
        },
        {
          slot: 13,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the third paragraph?`,
          choices: [
            no(`Sentence 10`, 'removes-topic-sentence'),
            no(`Sentence 11`, 'removes-supporting-detail'),
            ok(`Sentence 12`),
            no(`Sentence 13`, 'removes-concluding-sentence'),
          ],
          solution: `The third paragraph explains how drills build timing, and the date of the season's final race does not relate to that. Sentence 11 belongs because it describes one of the drills the paragraph is about.`,
        },
        {
          slot: 14,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence at the beginning of the second paragraph to link it to the first. Which choice does this best?`,
          choices: [
            ok(`Perfect timing is only part of the challenge, however, because the crew must also keep the boat on course.`),
            no(`Rowing has been a popular sport at colleges and clubs for well over a century.`, 'no-link-to-previous'),
            no(`When one rower is early or late, the boat rocks to one side and slows down.`, 'repeats-without-advancing'),
            no(`The coxswain is usually the lightest member of the team.`, 'too-narrow'),
          ],
          solution: `The correct choice looks back to the timing discussed in paragraph 1 and points ahead to steering, the problem paragraph 2 solves. The sentence about rocking only repeats sentence 4 and gives no hint of the new topic.`,
        },
        {
          slot: 15,
          difficulty: 'medium',
          stem: `In sentence 9, the phrase "This is why" connects the sentence to which idea?`,
          choices: [
            ok(`The range of jobs the coxswain performs, described in sentences 7 and 8`),
            no(`The backward-facing seats of the rowers, described in sentence 5`, 'wrong-referent'),
            no(`The timing problems that slow the boat, described in sentence 4`, 'wrong-referent'),
            no(`The drills on rowing machines, described in sentence 10`, 'wrong-referent'),
          ],
          solution: `The coxswain is called a coach inside the boat because of the steering, rhythm calling, and race planning listed in sentences 7 and 8. Sentence 5 explains why a coxswain is needed, but it does not explain the coaching role that "This" refers to.`,
        },
      ],
    },
    {
      code: 'wg10-paragraph-transitions-p04',
      title: 'Learning Stop-Motion the Hard Way',
      body: `(1) Stop-motion animation creates the illusion of movement from thousands of still photographs. (2) An animator positions a clay figure or puppet, takes a picture, moves the figure a tiny amount, and takes another picture. (3) When the photographs are played back quickly, usually at twelve to twenty-four frames per second, the viewer's eye blends them into smooth motion. (4) ____, a single second of film can require two dozen separate poses, each one adjusted by hand.

(5) Our school's animation club learned this lesson during our first project, a ninety-second film about a paper boat sailing through a storm. (6) We began by sketching a storyboard, a series of rough drawings showing each shot in order. (7) Next, we built the boat, the waves, and a small cardboard harbor. (8) ____, we spent almost three weeks of afternoons filming. (9) ____, the most frustrating problem turned out to be the lighting rather than the puppets. (10) Each time a cloud passed outside the window, the brightness of the room changed, and the finished frames flickered like a broken television.

(11) For our second film, we covered the windows with black paper and used only lamps we could control. (12) We also taped the camera tripod to the floor so that no one could bump it between shots. (13) Modeling clay is made from fine mineral particles mixed with water or oil. (14) These small changes made the new film look far more polished than the first, even though we had not become much faster at moving the puppets.`,
      items: [
        {
          slot: 16,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 4?`,
          choices: [
            ok(`Consequently,`),
            no(`In contrast,`, 'contrast-for-effect'),
            no(`Meanwhile,`, 'time-for-effect'),
            no(`On the other hand,`, 'contrast-for-effect'),
          ],
          solution: `Because film plays at up to twenty-four frames per second, one second needs up to two dozen poses, so sentence 4 states a consequence of sentence 3. "In contrast" is wrong because sentence 4 follows from sentence 3 instead of opposing it.`,
        },
        {
          slot: 17,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 9?`,
          choices: [
            ok(`Surprisingly,`),
            no(`Therefore,`, 'cause-for-unexpected'),
            no(`For example,`, 'example-for-unexpected'),
            no(`Similarly,`, 'comparison-for-unexpected'),
          ],
          solution: `Sentence 9 says the biggest problem was the lighting "rather than the puppets," which the club did not expect, so "Surprisingly" fits. "Therefore" is wrong because nothing in sentence 8 about the length of filming causes lighting to become the main problem.`,
        },
        {
          slot: 18,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the third paragraph?`,
          choices: [
            no(`Sentence 11`, 'removes-supporting-detail'),
            no(`Sentence 12`, 'removes-supporting-detail'),
            ok(`Sentence 13`),
            no(`Sentence 14`, 'removes-concluding-sentence'),
          ],
          solution: `The third paragraph describes the changes the club made to fix its filming problems, and what clay is made of is unrelated to those fixes. Sentence 12 belongs because taping the tripod down is one of the changes.`,
        },
        {
          slot: 19,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 8?`,
          choices: [
            ok(`After that,`),
            no(`Instead,`, 'replacement-for-sequence'),
            no(`For instance,`, 'example-for-sequence'),
            no(`In contrast,`, 'contrast-for-sequence'),
          ],
          solution: `Sentences 6 and 7 list the steps of the project in order, using "began" and "Next," so sentence 8 needs a time transition that continues the sequence. "Instead" is wrong because filming did not replace building the set; it came after it.`,
        },
        {
          slot: 20,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence before sentence 11 to introduce the third paragraph. Which choice does this best?`,
          choices: [
            ok(`The flickering taught us that controlling the set mattered as much as moving the figures.`),
            no(`Our first film was shown at a school assembly in the spring.`, 'no-link-to-previous'),
            no(`Black paper is easy to find in most art supply closets.`, 'too-narrow'),
            no(`Some professional studios spend years making a single animated film.`, 'introduces-new-topic'),
          ],
          solution: `The correct choice links the flickering problem from sentence 10 to the solutions in sentences 11 and 12, and it states the lesson the paragraph develops. The sentence about black paper is tempting because black paper appears in sentence 11, but it covers only one detail and does not connect the two paragraphs.`,
        },
      ],
    },
    {
      code: 'wg10-paragraph-transitions-p05',
      title: 'The Hidden Web Under the Forest',
      body: `(1) Beneath the floor of many forests lies a vast web of fungal threads that most visitors never see. (2) These threads, called hyphae, are far thinner than a human hair, yet a single handful of forest soil can contain many meters of them. (3) Many of the fungi form partnerships with the roots of trees, wrapping around root tips or even growing inside root cells.

(4) The partnership benefits both sides. (5) The fungal threads reach into tiny spaces in the soil that roots cannot enter, gathering water and minerals such as phosphorus for the tree. (6) ____, the tree supplies the fungus with sugars it produces through photosynthesis, food the fungus cannot make for itself. (7) Because the threads can connect the roots of several neighboring trees, some scientists describe the arrangement as an underground network.

(8) Researchers have tried to measure how much material actually moves through these networks. (9) In some experiments, they have tagged carbon in one tree and later detected it in nearby seedlings. (10) ____, other researchers argue that such results are hard to interpret, because the carbon could have traveled through the soil itself rather than through the fungi. (11) The disagreement has encouraged scientists to design more careful studies before drawing broad conclusions about how forests share resources.`,
      items: [
        {
          slot: 21,
          difficulty: 'easy',
          stem: `Which transition best fills the blank at the beginning of sentence 6?`,
          choices: [
            ok(`In return,`),
            no(`For example,`, 'example-for-exchange'),
            no(`Before this,`, 'time-for-exchange'),
            no(`Otherwise,`, 'condition-for-exchange'),
          ],
          solution: `Sentence 5 describes what the fungus gives the tree, and sentence 6 describes what the tree gives back, so "In return" shows the exchange. "For example" is wrong because the tree's sugars are not an example of the fungus gathering water and minerals.`,
        },
        {
          slot: 22,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 10?`,
          choices: [
            ok(`However,`),
            no(`Consequently,`, 'cause-for-contrast'),
            no(`Likewise,`, 'comparison-for-contrast'),
            no(`For instance,`, 'example-for-contrast'),
          ],
          solution: `Sentence 9 reports evidence that carbon moves through the network, and sentence 10 presents researchers who doubt that evidence, so "However" signals the opposing view. "Likewise" is wrong because the second group does not agree with the first.`,
        },
        {
          slot: 23,
          difficulty: 'medium',
          stem: `Which choice best describes the role of sentence 4 in the second paragraph?`,
          choices: [
            ok(`It states the main idea that sentences 5 and 6 go on to explain.`),
            no(`It gives a specific example of a mineral the fungus gathers.`, 'detail-for-topic'),
            no(`It concludes the paragraph by summarizing the research debate.`, 'wrong-paragraph-focus'),
            no(`It introduces a disagreement between two groups of scientists.`, 'wrong-paragraph-focus'),
          ],
          solution: `Sentence 4 says both partners benefit, and sentences 5 and 6 then show what each side gains, which makes sentence 4 the topic sentence. It does not introduce a disagreement, since the debate appears only in the third paragraph.`,
        },
        {
          slot: 24,
          difficulty: 'hard',
          stem: `The writer wants to add a sentence at the end of the second paragraph that leads into the third. Which choice does this best?`,
          choices: [
            ok(`How much the trees actually share through this network, however, is still an open question.`),
            no(`Phosphorus is one of the most important nutrients for healthy plant growth.`, 'too-narrow'),
            no(`Fungi also produce mushrooms, which many forest animals eat.`, 'introduces-new-topic'),
            no(`Every tree in every forest is therefore connected to every other tree.`, 'overgeneralization'),
          ],
          solution: `The correct choice builds on the idea of a network in sentence 7 and raises the question that the research in paragraph 3 tries to answer. The claim that every tree is connected overstates sentence 7, which says only that some neighboring trees can be linked.`,
        },
      ],
    },
    {
      code: 'wg10-paragraph-transitions-p06',
      title: 'Students on the Air',
      body: `(1) Every weekday morning at seven, students at Riverside High run a small radio station that broadcasts to the surrounding neighborhood. (2) The station began six years ago as a single microphone in a storage closet, and it now operates from a converted classroom with a soundproof booth. (3) Students write the scripts, operate the mixing board, and host every program. (4) ____ the station has become a training ground for students interested in journalism, music, and engineering.

(5) The morning show follows a fixed structure that listeners have come to expect. (6) It opens with local weather and traffic reports, which students gather by calling the city information line. (7) ____, a different student reads short community announcements, such as library events or road closures. (8) The final segment features an interview with a neighbor, from a bakery owner to a retired bus driver. (9) Many radios from the early twentieth century were built inside heavy wooden cabinets.

(10) Running a station has taught the students lessons that reach beyond broadcasting. (11) When a guest cancels at the last minute, the hosts must fill the time without sounding unprepared. (12) When equipment fails, the student engineers must solve the problem quickly while the station stays on the air. (13) ____, the students learn to stay calm under pressure, a skill that will serve them in almost any career.`,
      items: [
        {
          slot: 25,
          difficulty: 'easy',
          stem: `Which sentence does not belong in the second paragraph?`,
          choices: [
            no(`Sentence 6`, 'removes-supporting-detail'),
            no(`Sentence 7`, 'removes-supporting-detail'),
            no(`Sentence 8`, 'removes-supporting-detail'),
            ok(`Sentence 9`),
          ],
          solution: `The second paragraph walks through the segments of the morning show, and old radio cabinets have nothing to do with that structure. Sentence 8 belongs because it describes the show's final segment.`,
        },
        {
          slot: 26,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 7?`,
          choices: [
            ok(`Next,`),
            no(`However,`, 'contrast-for-sequence'),
            no(`As a result,`, 'cause-for-sequence'),
            no(`In conclusion,`, 'conclusion-for-sequence'),
          ],
          solution: `The paragraph moves through the show in order, from the opening reports to "the final segment," so sentence 7 needs a sequence word like "Next." "As a result" is wrong because the announcements are not caused by the weather and traffic reports.`,
        },
        {
          slot: 27,
          difficulty: 'medium',
          stem: `Which transition best fills the blank at the beginning of sentence 13?`,
          choices: [
            ok(`In both situations,`),
            no(`Unlike these situations,`, 'contrast-for-summary'),
            no(`Before these situations,`, 'time-for-summary'),
            no(`Instead of these situations,`, 'replacement-for-summary'),
          ],
          solution: `Sentences 11 and 12 describe two emergencies, and sentence 13 names the lesson both of them teach, so "In both situations" gathers them together. "Unlike these situations" is wrong because staying calm is what those situations require, not something different from them.`,
        },
        {
          slot: 28,
          difficulty: 'medium',
          stem: `Which choice best fills the blank at the beginning of sentence 4?`,
          choices: [
            ok(`Because students handle every job themselves,`),
            no(`Although students handle every job themselves,`, 'concession-for-cause'),
            no(`Unless students handle every job themselves,`, 'condition-for-cause'),
            no(`Until students handle every job themselves,`, 'time-for-cause'),
          ],
          solution: `Sentence 3 lists the jobs students do, and sentence 4 explains that this hands-on work is why the station trains future journalists and engineers, so "Because" shows the cause. "Although" is wrong because doing every job does not work against the station's role as a training ground; it creates that role.`,
        },
      ],
    },
  ],
  items: [
    {
      slot: 29,
      difficulty: 'easy',
      stem: `Read: "The new footbridge was designed to sway slightly in strong winds. ____, the engineers told the city that walkers might feel some movement on gusty days." Which transition best completes the sentences?`,
      choices: [
        ok(`Accordingly,`),
        no(`Nevertheless,`, 'contrast-for-effect'),
        no(`For example,`, 'example-for-effect'),
        no(`In contrast,`, 'contrast-for-effect'),
      ],
      solution: `The engineers' warning follows directly from the bridge's design, so "Accordingly" shows the result. "Nevertheless" is wrong because the warning matches the design instead of going against it.`,
    },
    {
      slot: 30,
      difficulty: 'medium',
      stem: `Read: "Jazz soloists often seem to invent melodies on the spot. ____, most of them have spent years practicing the scales and patterns they draw on during a performance." Which transition best completes the sentences?`,
      choices: [
        ok(`In reality,`),
        no(`Therefore,`, 'cause-for-contrast'),
        no(`Similarly,`, 'comparison-for-contrast'),
        no(`As an illustration,`, 'example-for-contrast'),
      ],
      solution: `The first sentence describes how soloing appears, and the second reveals what actually lies behind it, so "In reality" marks the contrast between appearance and fact. "Therefore" is wrong because seeming to invent melodies does not cause years of practice.`,
    },
    {
      slot: 31,
      difficulty: 'medium',
      stem: `Read the sentences. (A) After the breeding season, the terns head south along the coasts of Europe and Africa. (B) Each spring, Arctic terns nest in the far north, raising their chicks in the long summer daylight. (C) Finally, they reach the waters near Antarctica, where it is summer once again. (D) Along the way, they stop to feed in rich ocean areas, sometimes for weeks at a time. Which order makes the paragraph most logical?`,
      choices: [
        ok(`B, A, D, C`),
        no(`A, B, D, C`, 'ignores-time-order'),
        no(`B, D, C, A`, 'ignores-transition-cues'),
        no(`C, B, A, D`, 'ignores-transition-cues'),
      ],
      solution: `Sentence B introduces the terns at their nesting grounds, A starts the trip south, D describes stops "along the way," and C uses "Finally" to end the journey. Starting with A fails because "the terns" and "the breeding season" need sentence B to introduce them first.`,
    },
    {
      slot: 32,
      difficulty: 'medium',
      stem: `Read: "____ Old phones contain small amounts of gold, silver, and copper in their circuits. Their batteries can be processed to recover lithium and cobalt. Even the plastic cases can be ground up and molded into new products." Which sentence best fills the blank as the topic sentence?`,
      choices: [
        ok(`A discarded phone is a surprisingly rich source of materials that can be used again.`),
        no(`Gold is used in phone circuits because it conducts electricity well.`, 'too-narrow'),
        no(`Technology has changed the way people live in many different ways.`, 'too-broad'),
        no(`Many people replace their phones every two or three years.`, 'off-topic'),
      ],
      solution: `Every supporting sentence names a part of a phone that can be recovered and reused, and the correct choice states that shared idea. The sentence about gold is tempting because it matches the first detail, but it does not cover the batteries or the plastic cases.`,
    },
    {
      slot: 33,
      difficulty: 'hard',
      stem: `Read: "(1) A solar oven is a box lined with reflective panels that concentrate sunlight onto a dark pot. (2) The dark pot absorbs the light and turns it into heat, while a clear lid keeps that heat inside. (3) On a sunny day, a well-built solar oven can become hot enough to bake bread or cook rice." Which sentence would best conclude this paragraph?`,
      choices: [
        ok(`Because it needs no fuel beyond sunlight, a solar oven offers a practical way to cook where firewood or electricity is scarce.`),
        no(`Some solar ovens are painted bright colors on the outside so they are easy to spot.`, 'too-narrow'),
        no(`People in many cultures have cooked food over open fires for thousands of years.`, 'introduces-new-topic'),
        no(`For this reason, solar ovens are completely useless and should never be used at all.`, 'contradicts-paragraph'),
      ],
      solution: `The correct choice draws a conclusion from the paragraph's explanation of how the oven works and why that matters. The sentence about open fires is tempting because it mentions cooking, but it shifts to a new subject instead of closing the one the paragraph built.`,
    },
    {
      slot: 34,
      difficulty: 'medium',
      stem: `Read: "(1) In tournament chess, each player has a limited amount of time for the whole game. (2) A chess clock has two faces, one for each player, and only one clock runs at a time. (3) After moving, a player presses a button that stops that player's clock and starts the opponent's. (4) The knight is the only chess piece that can jump over other pieces. (5) If a player's time runs out, that player usually loses, no matter how strong the position on the board." Which sentence does not belong?`,
      choices: [
        no(`Sentence 2`, 'removes-key-detail'),
        no(`Sentence 3`, 'removes-supporting-detail'),
        ok(`Sentence 4`),
        no(`Sentence 5`, 'removes-supporting-detail'),
      ],
      solution: `The paragraph explains how time limits and chess clocks work, and the way a knight moves has nothing to do with timing. Sentence 5 belongs because it explains what happens when a player's time runs out.`,
    },
    {
      slot: 35,
      difficulty: 'hard',
      stem: `Read: "The museum's new exhibit attracted record crowds. The museum had spent almost nothing on advertising." Which choice best combines these sentences to show the relationship between the ideas?`,
      choices: [
        ok(`The museum's new exhibit attracted record crowds even though the museum had spent almost nothing on advertising.`),
        no(`The museum's new exhibit attracted record crowds because the museum had spent almost nothing on advertising.`, 'confuses-cause-effect'),
        no(`The museum had spent almost nothing on advertising, so the new exhibit attracted record crowds.`, 'confuses-cause-effect'),
        no(`The museum's new exhibit attracted record crowds, and the museum had also spent almost nothing on advertising.`, 'addition-hides-contrast'),
      ],
      solution: `Large crowds are unexpected when a museum barely advertises, so "even though" shows the contrast between the ideas. The "because" version is tempting, but spending almost nothing on advertising would not cause crowds to grow.`,
    },
    {
      slot: 36,
      difficulty: 'hard',
      stem: `A writer has finished a paragraph explaining how 3D printers build objects one thin layer at a time. The next paragraph explains how hospitals use 3D printing to make custom splints for injured patients. Which sentence best begins the second paragraph?`,
      choices: [
        ok(`Because this layered process can produce almost any shape, hospitals have begun using it to make splints that fit a single patient.`),
        no(`Hospitals treat thousands of broken wrists and ankles every year.`, 'no-link-to-previous'),
        no(`Each layer of plastic is usually thinner than a sheet of paper.`, 'repeats-without-advancing'),
        no(`In contrast to 3D printing, hospitals rely on doctors and nurses.`, 'false-contrast'),
      ],
      solution: `The correct sentence refers back to the layered process from the first paragraph and explains how that feature leads to the hospital use in the second. The sentence about broken wrists introduces the new topic but gives no link to the printing process just described.`,
    },
    {
      slot: 37,
      difficulty: 'hard',
      stem: `Read: "Caravanserais along the old trade routes were simple buildings, often little more than a walled courtyard surrounded by rooms. ____ they played an enormous role in trade, giving merchants a safe place to rest, store goods, and exchange news." Which choice best fills the blank?`,
      choices: [
        ok(`Modest as they were,`),
        no(`Because they were modest,`, 'cause-for-concession'),
        no(`Just as modestly,`, 'comparison-for-concession'),
        no(`Once they were modest,`, 'time-for-concession'),
      ],
      solution: `The first sentence stresses how plain the buildings were, and the second says they mattered greatly anyway, so "Modest as they were" concedes the plainness before stating their importance. "Because they were modest" is wrong because simplicity is not what made them important to trade.`,
    },
    {
      slot: 38,
      difficulty: 'easy',
      stem: `Read: "Paper folding has influenced modern engineering. ____, designers have used folding patterns to pack large solar panels tightly enough to fit inside a rocket." Which transition best completes the sentences?`,
      choices: [
        ok(`For instance,`),
        no(`However,`, 'contrast-for-example'),
        no(`Otherwise,`, 'condition-for-example'),
        no(`In conclusion,`, 'conclusion-for-example'),
      ],
      solution: `The second sentence gives a specific case of folding influencing engineering, so "For instance" introduces the example. "However" is wrong because the solar panel example supports the first sentence instead of contradicting it.`,
    },
    {
      slot: 39,
      difficulty: 'hard',
      stem: `Read the sentences. (A) However, a rain garden works only if its plants are chosen carefully, since many species cannot survive both flooding and drought. (B) A rain garden is a shallow, planted hollow designed to catch water that runs off roofs and driveways. (C) Instead of rushing into storm drains, that water soaks slowly into the soil, where roots and microbes filter out pollutants. (D) For this reason, designers usually choose native plants that are adapted to the local cycle of wet and dry seasons. Which order makes the paragraph most logical?`,
      choices: [
        ok(`B, C, A, D`),
        no(`B, A, C, D`, 'ignores-transition-cues'),
        no(`C, B, D, A`, 'ignores-reference-words'),
        no(`B, C, D, A`, 'ignores-transition-cues'),
      ],
      solution: `B defines a rain garden, C explains what happens to "that water," A turns with "However" to a limitation, and D gives the solution "For this reason." Placing D before A fails because D's choice of hardy native plants answers the problem of flooding and drought that only A raises.`,
    },
    {
      slot: 40,
      difficulty: 'medium',
      stem: `Read: "Many desert plants survive on very little water; cacti, for example, store moisture in thick, waxy stems." What is the purpose of the phrase "for example" in this sentence?`,
      choices: [
        ok(`It shows that cacti are a specific case of the general idea about desert plants.`),
        no(`It shows that cacti are different from other desert plants.`, 'example-read-as-contrast'),
        no(`It shows that desert plants survive because cacti store water.`, 'example-read-as-cause'),
        no(`It shows that the writer is ending the discussion of desert plants.`, 'example-read-as-conclusion'),
      ],
      solution: `"For example" signals that the cactus illustrates the broader claim that desert plants survive on little water. It does not mark a contrast, since cacti are presented as one of those plants rather than an exception.`,
    },
  ],
}

export default skill
