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
  slug: 'read-g10-main-idea-summary',
  subject: 'reading',
  grade: 10,
  group: 'Informational text',
  name: 'Main Idea and Summary',
  standards: ['RI.9-10.2'],
  passages: [
    {
      code: 'rg10-main-idea-summary-p01',
      title: 'Listening to Night Migrants',
      body: `Each spring and fall, millions of small songbirds cross the sky at night, too high and too dark to be seen. For a long time, the only way to count them was to wait for morning and tally the tired birds that landed in parks and woodlots. That method missed most of the travelers, because many birds flew straight past without stopping.\n\nResearchers have found a better way to notice them: they listen. Many migrating birds give short, high calls while flying in the dark, possibly to keep in touch with nearby birds. Each species has its own call, often lasting less than a quarter of a second. A microphone pointed at the sky can record these calls all night, and trained listeners or computer programs can sort them by species.\n\nIn the fictional lakeside town of Harrowgate, a team led by ecologist Mireille Oduya placed twelve rooftop microphones across the region for three autumn seasons. The recordings captured more than forty thousand calls from at least thirty species. The team discovered that certain warblers passed over in large numbers on nights when almost none were seen the next morning. They also found that call counts rose sharply on nights after cold fronts, when north winds helped the birds along.\n\nListening has limits. A call does not reveal how many birds are flying silently, and rain or traffic noise can drown out the signal. Some species rarely call at all. For these reasons, Oduya's team compares its recordings with radar images and morning counts rather than relying on sound alone.\n\nStill, the microphones have changed what the town knows about its skies. Harrowgate now dims the lights on its tallest buildings during the busiest migration nights, which the recordings help predict. A practice that began as a way to count birds has become a way to protect them.`,
      items: [
        q(1, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Certain warblers pass over Harrowgate in large numbers on nights when almost none are seen the next morning.`, 'too-narrow'),
          right(`Recording night flight calls reveals migrating birds that morning counts miss, and despite its limits the method helps a town understand and protect them.`),
          wrong(`Microphones have replaced radar images and morning counts as the only reliable way to study bird migration.`, 'contradicts-text'),
          wrong(`Migrating songbirds call at night mainly to warn one another about tall buildings and bright lights.`, 'unsupported-inference'),
        ], `The passage explains the problem with morning counts, how listening solves it, the method's limits and its use in protecting birds, so the choice about recording night flight calls covers the whole text. The warbler finding is only one piece of evidence from paragraph 3.`),
        q(2, 'easy', `What problem described in the first paragraph does the rest of the passage respond to?`, [
          wrong(`Songbirds become too tired to finish their journey and must land in parks and woodlots.`, 'misreads-detail'),
          wrong(`Bright city lights confuse migrating birds and cause them to fly in the wrong direction.`, 'outside-knowledge'),
          right(`Counting birds that landed in the morning missed most migrants, because many flew past without stopping.`),
          wrong(`Scientists could not agree on which species of songbird migrate during the spring.`, 'unsupported-inference'),
        ], `Paragraph 1 ends by saying the morning method "missed most of the travelers," and the next paragraph begins "Researchers have found a better way." The tired birds are part of the old method, not the problem the passage solves.`),
        q(3, 'medium', `How do the findings from Harrowgate develop the central idea?`, [
          wrong(`They show that the microphones recorded fewer species than researchers had hoped to find.`, 'unsupported-inference'),
          wrong(`They explain why migrating birds give short, high calls while flying in the dark.`, 'misreads-structure'),
          wrong(`They prove that cold fronts are the main cause of songbird migration each autumn.`, 'overgeneralization'),
          right(`They give concrete evidence that listening detects birds that morning counts miss, such as warblers seen rarely by day.`),
        ], `The warblers that "passed over in large numbers on nights when almost none were seen the next morning" show exactly what listening adds. The passage says north winds "helped the birds along," not that cold fronts cause migration.`),
        q(4, 'medium', `Which is the best objective summary of the passage?`, [
          right(`Because many night migrants fly past unseen, researchers record their calls. A Harrowgate study detected birds morning counts missed, and though sound must be combined with other data, the results now guide efforts to protect birds.`),
          wrong(`Microphones are an amazing tool that every town should install. Harrowgate's clever team proved that listening is far better than any other method, and other cities are foolish not to copy it.`, 'includes-opinion'),
          wrong(`Harrowgate placed twelve rooftop microphones across the region. Over three autumns they recorded more than forty thousand calls from at least thirty different species of birds.`, 'too-narrow'),
          wrong(`Songbirds migrate at night to avoid predators. Researchers in Harrowgate found that bright buildings kill most migrating birds, so the town turned off all of its lights for the season.`, 'unsupported-inference'),
        ], `The summary beginning "Because many night migrants fly past unseen" covers the method, the evidence, the limits and the result without adding judgments. The summary beginning "Harrowgate placed twelve rooftop microphones" is accurate but leaves out why listening matters and what it changed.`),
        q(5, 'hard', `How does the fourth paragraph refine the central idea of the passage?`, [
          wrong(`It suggests that the Harrowgate recordings were mostly useless because of rain and traffic noise.`, 'overstates-limits'),
          right(`It qualifies the idea by showing that sound is one useful tool to be combined with others, not a complete count.`),
          wrong(`It shifts the passage's focus from bird migration to the problem of noise in growing towns.`, 'misreads-structure'),
          wrong(`It repeats the claim that listening is better than every other method of counting birds.`, 'contradicts-text'),
        ], `The paragraph lists what calls cannot show and says the team compares recordings "with radar images and morning counts rather than relying on sound alone." The final paragraph's "Still" shows the method remains valuable, so the limits do not make it useless.`),
      ],
    },
    {
      code: 'rg10-main-idea-summary-p02',
      title: 'Houses That Came by Rail',
      body: `In the early 1900s, a family in the fictional prairie county of Vellin could choose a house the way they chose a coat: from a catalog. Several lumber companies printed thick books of house designs, each with a drawing, a floor plan and a price. A buyer mailed in an order, and weeks later a railroad car arrived holding nearly everything needed to build the home, from numbered boards to doorknobs and window glass.\n\nThese kit houses solved a real problem. Many small towns in Vellin had no architect and few skilled carpenters. Lumber was expensive to ship in small amounts, and buying each piece separately from different suppliers took time. A kit bundled the design, the materials and the instructions into a single purchase. Because each board was cut and numbered at the factory, a family working with one experienced builder could often raise the frame in a few weeks.\n\nThe catalogs also shaped how towns looked. Since thousands of buyers chose from the same few dozen designs, the same porch or roofline appeared in towns hundreds of miles apart. Local historian Teodor Vasquez-Lund has identified more than three hundred surviving kit houses in Vellin County alone, many of which were once thought to be ordinary homes built by local hands. Vasquez-Lund matches them to catalog plans by measuring rooms and checking for faint numbers stamped on the beams.\n\nThe kits were not perfect. Buyers sometimes received missing or damaged pieces, and some designs suited a mild climate better than the prairie winters. Over time, as more towns gained lumberyards and trained builders, the business faded, and most companies stopped selling kits by the 1940s.\n\nYet the houses remain. For many Vellin families, a kit was the first home they owned, and the numbered beams in their attics still show how ordinary people used the railroad and the mail to build communities quickly.`,
      items: [
        q(6, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Teodor Vasquez-Lund has found more than three hundred kit houses by measuring rooms and checking beams.`, 'too-narrow'),
          wrong(`Kit houses were poorly made, which is why most companies stopped selling them by the 1940s.`, 'confuses-cause-effect'),
          wrong(`Railroads were the most important invention in the history of the American prairie.`, 'overgeneralization'),
          right(`Catalog kit houses shipped by rail let families without local builders put up homes quickly, and they left a lasting mark on their towns.`),
        ], `The passage explains the problem kits solved, how they shaped towns and why many still stand, which the choice about catalog kit houses shipped by rail sums up. The passage says the business faded because towns gained lumberyards and builders, not because the kits were poorly made.`),
        q(7, 'easy', `Which detail best supports the idea that kit houses solved a practical problem?`, [
          right(`Because each board was cut and numbered at the factory, a family with one experienced builder could raise the frame in weeks.`),
          wrong(`The same porch or roofline appeared in towns hundreds of miles apart.`, 'wrong-supporting-detail'),
          wrong(`Some designs suited a mild climate better than the prairie winters.`, 'wrong-supporting-detail'),
          wrong(`Most companies stopped selling kits by the 1940s.`, 'wrong-supporting-detail'),
        ], `Paragraph 2 says towns lacked architects and skilled carpenters, and precut, numbered boards let ordinary families build anyway. The repeated porches support a different idea, that kits shaped how towns looked.`),
        q(8, 'medium', `How does the third paragraph develop the central idea?`, [
          wrong(`It argues that kit houses were more beautiful than homes designed by local architects.`, 'unsupported-inference'),
          right(`It extends the idea from single families to whole towns, showing that kits shaped how places looked and can still be identified.`),
          wrong(`It explains the steps a family followed to order a house from a catalog.`, 'misreads-structure'),
          wrong(`It introduces the problems buyers faced, such as missing and damaged pieces.`, 'misreads-structure'),
        ], `The paragraph opens "The catalogs also shaped how towns looked" and describes a historian finding hundreds of surviving kit houses. The ordering steps appear in paragraph 1 and the problems in paragraph 4.`),
        q(9, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`In the early 1900s, families in Vellin ordered houses from catalogs. A railroad car brought numbered boards, doorknobs and window glass, and the family built the home with one experienced builder.`, 'too-narrow'),
          wrong(`Kit houses were a brilliant idea that showed how much better life was in the early 1900s. Modern families should be able to order homes this way instead of paying for expensive builders.`, 'includes-opinion'),
          right(`Early 1900s catalog companies shipped precut house kits by rail to places without architects or skilled builders. The kits spread the same designs across many towns, had some flaws, faded by the 1940s, and many houses still stand.`),
          wrong(`Lumber companies in Vellin tricked families into buying houses that fell apart in prairie winters. Historians are now finding the damaged homes by searching attics for numbered beams.`, 'distorts-text'),
        ], `The summary beginning "Early 1900s catalog companies" gives the main points of every paragraph in neutral words. The summary beginning "In the early 1900s, families in Vellin ordered houses" is accurate but covers only the ordering process and leaves out the kits' effects and decline.`),
        q(10, 'hard', `Which sentence should be left out of an objective summary of the passage?`, [
          wrong(`Kits bundled the design, materials and instructions into a single purchase.`, 'mistakes-fact-for-opinion'),
          wrong(`The business faded as more towns gained lumberyards and trained builders.`, 'mistakes-fact-for-opinion'),
          wrong(`Hundreds of kit houses still stand in Vellin County today.`, 'mistakes-fact-for-opinion'),
          right(`The kit companies cared more about their profits than about the families who bought from them.`),
        ], `An objective summary reports what the text says without adding judgments, and the passage never makes a claim about the companies' motives. The other three sentences restate facts from paragraphs 2, 4 and 3.`),
      ],
    },
    {
      code: 'rg10-main-idea-summary-p03',
      title: 'Reading Sound with Light',
      body: `Long before tape or digital files, some of the earliest sound recordings were cut into the surface of wax cylinders. A needle traced a groove that wiggled with the sound, and playing the cylinder meant running a needle through that groove again. The fictional Calloway Regional Archive holds about two thousand of these cylinders, including songs, speeches and family greetings recorded more than a century ago.\n\nThe archive faces a difficult choice. Many cylinders are cracked, moldy or so brittle that a single playing could destroy them. Yet if no one plays them, the sounds they hold will remain unheard, and the wax will keep slowly decaying on the shelf.\n\nTo escape this choice, the archive's engineer, Ananya Breckford, uses a method that never touches the groove. A camera with a powerful lens photographs the cylinder's surface in thousands of overlapping images as it turns slowly under a light. Software then builds a detailed three-dimensional map of the groove and calculates the sound that a needle would have produced. Because nothing scrapes the wax, even a cylinder broken into pieces can be scanned after the fragments are carefully fitted together.\n\nThe method has drawbacks. Scanning one cylinder can take several hours, and the resulting audio sometimes contains hiss where mold has filled the groove. Breckford's team also listens to every file and compares it with any surviving notes about the recording, because software can mistake a scratch for part of the sound.\n\nEven so, the results have been striking. Recordings that had not been heard in a hundred years, including a lullaby sung by a local farmer and a speech at the opening of the county's first bridge, are now available online. A technology built for measuring tiny surfaces has given the archive a way to preserve its fragile collection without destroying it.`,
      items: [
        q(11, 'easy', `What is the central idea of the passage?`, [
          right(`A scanning method that never touches the wax lets an archive recover sound from fragile cylinders without destroying them.`),
          wrong(`Wax cylinders were the earliest and most important way of recording sound.`, 'too-broad'),
          wrong(`The Calloway Regional Archive owns about two thousand recordings of songs and speeches.`, 'too-narrow'),
          wrong(`Software can mistake scratches for sound, so old recordings can never be trusted.`, 'overstates-limits'),
        ], `Every paragraph after the first builds toward or reports on the contact-free method that solves the archive's dilemma. The size of the collection is only background from paragraph 1.`),
        q(12, 'easy', `What problem does the second paragraph present?`, [
          wrong(`The archive does not have enough shelf space for its two thousand cylinders.`, 'unsupported-inference'),
          wrong(`No one at the archive knows how to operate the old needles that play cylinders.`, 'unsupported-inference'),
          right(`Playing a fragile cylinder could destroy it, but leaving it unplayed means its sound stays unheard while the wax decays.`),
          wrong(`The camera used to scan cylinders takes several hours to photograph each one.`, 'misreads-structure'),
        ], `Paragraph 2 describes a choice between two bad outcomes, which the scanning method then escapes. The scanning time is a drawback discussed later, in paragraph 4.`),
        q(13, 'medium', `How does the description of the scanning process in the third paragraph develop the central idea?`, [
          wrong(`It shows that the method is too slow and complicated to be useful for most archives.`, 'overstates-limits'),
          wrong(`It explains how needles once traced grooves that wiggled with the recorded sound.`, 'misreads-structure'),
          wrong(`It argues that cameras will soon replace microphones as the best way to record music.`, 'unsupported-inference'),
          right(`It explains why the method solves the dilemma: a camera and software map the groove, so nothing ever scrapes the wax.`),
        ], `The paragraph ends "Because nothing scrapes the wax, even a cylinder broken into pieces can be scanned," which is why the method preserves the collection. The needle description belongs to paragraph 1.`),
        q(14, 'medium', `Which detail would be least necessary to include in a brief summary of the passage?`, [
          wrong(`Playing a brittle cylinder with a needle can destroy it.`, 'misjudges-importance'),
          right(`The archive's engineer is named Ananya Breckford.`),
          wrong(`A camera and software map the groove and calculate the sound without touching it.`, 'misjudges-importance'),
          wrong(`The method is slow and needs people to check each file for errors.`, 'misjudges-importance'),
        ], `A brief summary needs the problem, the solution and its limits, but the engineer's name does not change the central idea. Each of the other details carries a main point of one paragraph.`),
        q(15, 'hard', `Which is the best objective summary of the passage?`, [
          wrong(`An archive in Calloway uses cameras and software to perfectly restore every wax cylinder in its collection. Because the method is automatic, the archive no longer needs people to check the recordings.`, 'contradicts-text'),
          wrong(`Wax cylinders hold songs and speeches from a century ago. The archive's wonderful new method is the most exciting thing to happen in sound history, and every listener will be moved by the lullaby.`, 'includes-opinion'),
          right(`An archive's wax cylinders are too fragile to play, so it photographs their grooves and uses software to calculate the sound. The method is slow and needs human checking, but it has recovered recordings unheard for a century.`),
          wrong(`Wax cylinders were made by cutting a groove with a needle. The Calloway archive holds about two thousand of them, and many are cracked, moldy or brittle after a hundred years.`, 'too-narrow'),
        ], `The summary beginning "An archive's wax cylinders are too fragile to play" covers the problem, the method, its limits and its results without adding opinions. The summary claiming the archive "no longer needs people to check the recordings" sounds neutral but contradicts paragraph 4, which describes hiss and a team that listens to every file.`),
      ],
    },
    {
      code: 'rg10-main-idea-summary-p04',
      title: 'Calm Water, Faster Swims',
      body: `Watch a swimming race from the stands and you might think the only thing slowing swimmers down is the water itself. In fact, swimmers also fight against waves, including the ones they create. Every stroke and kick pushes water outward, and in a crowded pool those waves bounce off walls and other swimmers. A pool that stays calm during a race is not an accident. It is the result of careful design.\n\nThe most visible feature is the lane line. Older lane dividers were simple ropes with floats, which marked the lanes but did little to stop waves. Modern racing lines are strings of plastic discs that spin as water hits them. The spinning breaks up waves and pushes their energy downward, so a wave from lane four loses much of its strength before it reaches lane five.\n\nThe edges of the pool matter too. In the fictional city of Port Sabelle, the new aquatic center was built with gutters that run along every wall at water level. When a wave reaches the side, it spills into the gutter instead of bouncing back toward the swimmers. The center's designer, Kwame Ostrander, also made the pool deeper than the old one, since waves that travel down into deep water have less force at the surface.\n\nCoaches in Port Sabelle noticed the difference quickly. Swimmers in the outside lanes, who once complained of choppy water, reported smoother races. A study by the city's swim club found that times in the outer lanes moved closer to times in the middle lanes after the switch.\n\nNone of this makes a slow swimmer fast. Training, technique and strength still decide most races. But by reducing waves, pool designers help make sure the result depends more on the swimmers than on the lane they happened to draw.`,
      items: [
        q(16, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Modern lane lines are strings of plastic discs that spin when water hits them.`, 'too-narrow'),
          right(`Pool features that reduce waves help make races fairer, so results depend more on swimmers than on their lanes.`),
          wrong(`Deep pools turn slow swimmers into fast ones by removing the force of the water.`, 'contradicts-text'),
          wrong(`Swimmers in the outside lanes usually lose races because they are less skilled.`, 'unsupported-inference'),
        ], `The passage explains several wave-reducing features and ends by saying they make results depend "more on the swimmers than on the lane." The spinning discs are one supporting detail, and the passage says nothing makes a slow swimmer fast.`),
        q(17, 'easy', `Which sentence from the first paragraph most directly introduces the central idea?`, [
          wrong(`"Every stroke and kick pushes water outward."`, 'too-narrow'),
          wrong(`"Watch a swimming race from the stands and you might think the only thing slowing swimmers down is the water itself."`, 'mistakes-hook-for-claim'),
          wrong(`"In fact, swimmers also fight against waves, including the ones they create."`, 'too-narrow'),
          right(`"A pool that stays calm during a race is not an accident."`),
        ], `This sentence, followed by "It is the result of careful design," states the idea the rest of the passage develops. The opening sentence is a hook describing a common assumption, not the central idea.`),
        q(18, 'medium', `How does the comparison between older and modern lane lines develop the central idea?`, [
          right(`It shows that lane lines changed from simple markers into designs built to break up waves between lanes.`),
          wrong(`It shows that older lane lines were dangerous and caused swimmers to be injured.`, 'unsupported-inference'),
          wrong(`It explains why swimmers prefer to race in the middle lanes of any pool.`, 'misreads-detail'),
          wrong(`It proves that the shape of the pool matters less than the lane lines.`, 'unsupported-inference'),
        ], `Older ropes "did little to stop waves," while modern discs spin and push wave energy downward, which is an example of design for calm water. The passage never ranks lane lines above the pool's edges or depth.`),
        q(19, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Port Sabelle built a new aquatic center with gutters along every wall. The designer, Kwame Ostrander, made the pool deeper than the old pool, and the city's coaches noticed the difference quickly.`, 'too-narrow'),
          wrong(`Swimmers lose races because of waves, not training. Every city should rebuild its pool the way Port Sabelle did, since a well-designed pool is the real secret to winning.`, 'includes-opinion'),
          wrong(`Swimmers create waves when they race, and those waves bounce off walls. Because of this, swimming is one of the hardest sports to judge fairly, and many results are not accurate.`, 'unsupported-inference'),
          right(`Swimmers' strokes create waves that slow racers. Spinning lane lines, edge gutters and greater depth reduce those waves, and in Port Sabelle outer lane times moved closer to middle lane times. Design cannot replace training, but it makes races fairer.`),
        ], `The summary beginning "Swimmers' strokes create waves" includes the problem, the solutions, the evidence and the final qualification without adding opinions. The summary beginning "Port Sabelle built a new aquatic center" is accurate but covers only details from paragraphs 3 and 4.`),
        q(20, 'hard', `How does the final paragraph refine the central idea?`, [
          wrong(`It suggests that pool design matters more than training, technique and strength.`, 'contradicts-text'),
          wrong(`It changes the topic from pool design to the best ways for swimmers to train.`, 'misreads-structure'),
          right(`It limits the claim, making clear that design does not create speed but reduces unfair differences between lanes.`),
          wrong(`It repeats the evidence from the swim club study using different words.`, 'misreads-structure'),
        ], `"None of this makes a slow swimmer fast" narrows the idea, and the last sentence states the real benefit, fairness across lanes. The choice saying pool design matters more than training reverses the paragraph, which says training and strength "still decide most races."`),
      ],
    },
    {
      code: 'rg10-main-idea-summary-p05',
      title: 'The Rule of Doing Less',
      body: `When a museum receives a damaged tapestry, visitors might expect conservators to make it look new again. They might picture bright fresh thread replacing faded patches and torn sections rewoven so neatly that no one could tell. Yet most textile conservators today work by a very different rule: do as little as possible, and make sure anything you do can be undone.\n\nThis rule grew out of hard lessons. In the past, well-meaning restorers often repainted faded areas, glued backings onto fragile cloth or replaced original threads with new ones. Decades later, those glues yellowed and stiffened, the new threads pulled against the weaker old ones, and some repairs caused more damage than the original tears. Worse, the changes made it difficult to tell which parts of an object were original.\n\nAt the fictional Linden Hall Museum, conservator Paloma Reyes-Whitcombe recently treated a two-hundred-year-old wall hanging with large holes along its lower edge. Instead of filling the holes with new weaving, Reyes-Whitcombe stitched the weak areas onto a panel of dyed linen chosen to match the background color. The stitches hold the loose threads in place, and the linen shows through the holes without pretending to be part of the design. If a better method appears in the future, the stitches can be snipped and the hanging lifted away unharmed.\n\nVisitors sometimes ask why the hanging still has gaps. Reyes-Whitcombe explains that a conservator's first duty is to the object, not to its appearance. A gap that is honest tells the truth about the hanging's long life, while a perfect-looking repair might hide it.\n\nThe rule of doing less can seem like doing nothing. In practice, it demands patience, careful research and great skill, because the goal is not to remake history but to keep it from falling apart.`,
      items: [
        q(21, 'easy', `What is the central idea of the passage?`, [
          wrong(`Old tapestries should be rewoven with fresh thread so that visitors can enjoy them as they first looked.`, 'contradicts-text'),
          wrong(`Paloma Reyes-Whitcombe stitched a wall hanging onto a panel of dyed linen at Linden Hall.`, 'too-narrow'),
          right(`Textile conservators follow a rule of minimal, reversible treatment that protects an object's original material and history.`),
          wrong(`Museums care more about the history of objects than about what their visitors want to see.`, 'overgeneralization'),
        ], `The passage states the rule in paragraph 1 and then explains its origin, an example and its purpose. The Linden Hall treatment is one example of the rule, not the central idea.`),
        q(22, 'medium', `How does the second paragraph contribute to the development of the central idea?`, [
          right(`It explains why the rule exists by describing past repairs that later caused damage and hid what was original.`),
          wrong(`It describes the step-by-step method conservators use today to repair tapestries.`, 'misreads-structure'),
          wrong(`It argues that restorers in the past were careless and did not care about the objects.`, 'contradicts-text'),
          wrong(`It shows that glue is the safest material for holding fragile cloth together.`, 'contradicts-text'),
        ], `The paragraph begins "This rule grew out of hard lessons" and lists repairs that yellowed, stiffened and damaged cloth. It calls the old restorers "well-meaning," so they were not described as careless.`),
        q(23, 'medium', `How does the example of the Linden Hall wall hanging develop the central idea?`, [
          wrong(`It shows that the rule is rarely followed, because most conservators fill holes with new weaving.`, 'contradicts-text'),
          wrong(`It shows that visitors were pleased the hanging had been made to look new again.`, 'misreads-detail'),
          wrong(`It explains how wall hangings were woven in the region two hundred years ago.`, 'unsupported-inference'),
          right(`It shows the rule in practice: the treatment supports the hanging, leaves honest gaps and can be undone later.`),
        ], `Reyes-Whitcombe stitched the hanging to linen instead of reweaving it, and "the stitches can be snipped," which matches both parts of the rule. Visitors asked why gaps remained, so the hanging was not made to look new.`),
        q(24, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Old repairs used glue and new thread. These repairs yellowed, stiffened and pulled against the old threads, and they made it hard to tell which parts of objects were original.`, 'too-narrow'),
          right(`Textile conservators now do as little as possible and keep treatments reversible, a rule learned from past repairs that caused harm. At Linden Hall, a hanging was stitched to linen, leaving honest gaps, an approach that takes great skill.`),
          wrong(`Conservators are the most patient and talented workers in any museum. Visitors who complain about gaps in old hangings simply do not understand art and should trust the experts.`, 'includes-opinion'),
          wrong(`Museums used to make tapestries look new, but they now leave them damaged. Conservators no longer repair holes at all, because doing nothing is always the safest choice.`, 'distorts-text'),
        ], `The summary beginning "Textile conservators now do as little as possible" covers the rule, its origin, the example and the conclusion neutrally. The summary claiming conservators "no longer repair holes at all" distorts the passage, which says doing less only "can seem like doing nothing" and still involves stitching and support.`),
        q(25, 'hard', `How does the final paragraph refine the central idea?`, [
          wrong(`It admits that the rule of doing less is mostly an excuse for avoiding difficult repairs.`, 'contradicts-text'),
          wrong(`It introduces a new rule that conservators should follow when the first rule fails.`, 'misreads-structure'),
          wrong(`It suggests that conservators should return to reweaving once they have done enough research.`, 'unsupported-inference'),
          right(`It corrects a likely misunderstanding, showing that doing less still demands skill because the aim is preservation, not renewal.`),
        ], `The paragraph raises the idea that the rule "can seem like doing nothing" and then answers it: the work "demands patience, careful research and great skill." The choice calling the rule "mostly an excuse" takes the misunderstanding as the writer's point.`),
      ],
    },
    {
      code: 'rg10-main-idea-summary-p06',
      title: 'Finding the Way at Calder General',
      body: `Anyone who has been lost in a large hospital knows the feeling: long hallways that all look alike, signs pointing in several directions, and a growing worry about missing an appointment. At the fictional Calder General Hospital, a survey found that nearly one in four visitors had asked a staff member for directions at least once during a single visit. Nurses and technicians were spending hours each week acting as guides instead of caring for patients.\n\nThe hospital asked a small design team led by Hamid Torres-Nakamura to study the problem. The team began by following visitors and watching where they hesitated. They learned that the old signs used medical terms many people did not know, such as "radiology," and that the building's three wings had been given confusing numbers over decades of expansion.\n\nThe team's changes were simple but connected. Each wing received a color and a plain name: the Garden Wing, the River Wing and the Hill Wing. Signs now used everyday words like "X-rays and scans" alongside the medical terms. Colored stripes on the floor led from the main entrance to each wing, and every elevator lobby displayed a map with a bold "you are here" marker. Appointment letters were rewritten to tell patients which entrance to use and which color to follow.\n\nA year later, the hospital repeated its survey. The share of visitors who needed to ask for directions had dropped to about one in ten, and late arrivals for appointments fell as well. Staff members reported that they could spend more of their time on their real work.\n\nThe team points out that the hospital did not need a new building. It needed to see the old one through the eyes of a confused visitor, and then to change the information that visitors received at every step.`,
      items: [
        q(26, 'easy', `Which statement best expresses the central idea of the passage?`, [
          wrong(`Hospitals should give every wing a color, because colors are easier to remember than numbers.`, 'too-narrow'),
          wrong(`Calder General needed a new building because its old hallways were too confusing to fix.`, 'contradicts-text'),
          wrong(`Nurses and technicians at large hospitals spend most of their time giving directions.`, 'overgeneralization'),
          right(`By studying where visitors got confused and redesigning the information they received, Calder General became much easier to navigate.`),
        ], `The passage moves from the problem to the team's observations, its connected changes and the improved survey results. The final paragraph says the hospital "did not need a new building," which rules out the choice saying Calder General needed a new building.`),
        q(27, 'medium', `How does the second paragraph develop the central idea?`, [
          right(`It identifies the causes of confusion, found by watching visitors, that the team's later changes were designed to fix.`),
          wrong(`It describes the colored stripes and maps that the team added to the hospital.`, 'misreads-structure'),
          wrong(`It shows that visitors were confused mainly because they arrived late for appointments.`, 'confuses-cause-effect'),
          wrong(`It argues that medical words should be removed from all hospital signs.`, 'contradicts-text'),
        ], `Paragraph 2 reports that unfamiliar terms and confusing wing numbers caused problems, and paragraph 3 answers each with plain names and everyday words. The new signs kept medical terms, adding everyday words "alongside" them.`),
        q(28, 'medium', `Which detail best supports the claim that the changes worked?`, [
          wrong(`Each wing received a color and a plain name, such as the Garden Wing.`, 'wrong-supporting-detail'),
          wrong(`The building's three wings had been given confusing numbers over decades.`, 'wrong-supporting-detail'),
          right(`The share of visitors who asked for directions fell from nearly one in four to about one in ten.`),
          wrong(`The team began by following visitors and watching where they hesitated.`, 'wrong-supporting-detail'),
        ], `Comparing the first survey with the second measures the result of the changes. The wing names describe a change, not evidence that the change succeeded.`),
        q(29, 'medium', `Which is the best objective summary of the passage?`, [
          wrong(`Hospitals are confusing and stressful places. Calder General's brilliant design team solved every problem, and all hospitals should hire them to fix their hallways right away.`, 'includes-opinion'),
          right(`Many Calder General visitors needed directions, taking staff from patient care. A design team watched visitors, found confusing terms and numbers, and added plain names, colors, floor stripes, maps and clearer letters. Requests for directions then dropped sharply.`),
          wrong(`At Calder General, each wing now has a color and a plain name. Floor stripes lead from the main entrance, and elevator lobbies display maps with a bold marker showing where visitors are standing.`, 'too-narrow'),
          wrong(`Calder General's staff refused to give visitors directions, so the hospital built new wings with clearer hallways. After the building was finished, fewer visitors were late for appointments.`, 'distorts-text'),
        ], `The summary beginning "Many Calder General visitors needed directions" includes the problem, the research, the changes and the result without judgment. The summary beginning "At Calder General, each wing now has a color" is accurate but leaves out the problem and the outcome.`),
        q(30, 'hard', `The final paragraph refines the central idea mainly by suggesting that:`, [
          wrong(`the hospital's design team could have saved more money by doing nothing at all.`, 'unsupported-inference'),
          wrong(`confused visitors are responsible for learning how to read medical signs.`, 'contradicts-text'),
          right(`the key to success was seeing the building from a visitor's point of view and changing information, not construction.`),
          wrong(`the hospital will soon need a new building to keep improving its survey results.`, 'contradicts-text'),
        ], `The team says the hospital "did not need a new building" but needed to see it "through the eyes of a confused visitor." The passage places responsibility on the hospital's information, not on visitors.`),
      ],
    },
    {
      code: 'rg10-main-idea-summary-p07',
      title: 'Gardeners with Six Legs',
      body: `In the forests of the fictional Ashcombe Hills, a small spring wildflower called the hollowbell faces a problem that every plant shares: it cannot move. Once its seeds ripen, they must somehow reach new ground, away from the parent plant's shade and from the many seed-eating mice and beetles that gather under it. The hollowbell's solution involves an unlikely partner, the forest ant.\n\nEach hollowbell seed carries a small, pale attachment that is rich in fats. Ants find these attachments irresistible. A worker ant grabs the seed by its fatty tip and carries it back to the nest, sometimes several meters away. Inside, the ants eat the attachment and feed it to their young, but they cannot crack the hard seed itself. They carry the leftover seed out to a waste pile near the nest, or simply leave it in an unused tunnel.\n\nFor the plant, this is an excellent arrangement. Botanist Yusuf Delacroix-Amari, who has studied the hollowbell for eight years, found that seeds carried by ants were far more likely to sprout than seeds that fell directly beneath the parent. The ant nests offered loose soil enriched by the ants' waste, and the seeds were hidden from mice. Delacroix-Amari's team also found that hollowbell patches spread outward in a pattern that matched the locations of old ant nests.\n\nThe partnership is fragile, however. In parts of the hills where an invasive ant species has pushed out the native ants, the newcomers eat the fatty tips on the spot and leave the seeds lying exposed. Hollowbell patches in those areas have been shrinking.\n\nDelacroix-Amari argues that protecting a wildflower like the hollowbell means protecting more than the plant itself. Its future depends on a relationship with a tiny animal that most hikers never notice.`,
      items: [
        q(31, 'easy', `What is the central idea of the passage?`, [
          wrong(`Forest ants feed the fatty parts of seeds to their young inside the nest.`, 'too-narrow'),
          wrong(`Invasive ants are the greatest threat facing every wildflower in the Ashcombe Hills.`, 'overgeneralization'),
          right(`The hollowbell depends on native ants to carry its seeds to safe, rich soil, so protecting it means protecting that partnership.`),
          wrong(`Mice and beetles eat so many seeds that wildflowers cannot survive in forests.`, 'unsupported-inference'),
        ], `The passage explains the plant's problem, the ants' role, the benefits, the threat and the conclusion about protecting the relationship. Feeding the young is one step in the process, not the central idea.`),
        q(32, 'medium', `How does the second paragraph develop the central idea?`, [
          wrong(`It shows that ants damage hollowbell seeds by eating them inside the nest.`, 'contradicts-text'),
          right(`It explains how the partnership works: the fatty attachment rewards the ants, who carry the seed away and leave it unharmed.`),
          wrong(`It describes the research methods Delacroix-Amari used over eight years.`, 'misreads-structure'),
          wrong(`It explains why mice and beetles gather under the parent plant.`, 'misreads-detail'),
        ], `The paragraph describes the attachment, the ants carrying the seed and the ants leaving the hard seed in a waste pile or tunnel. The ants "cannot crack the hard seed itself," so they do not damage it.`),
        q(33, 'medium', `Which finding best supports the idea that the arrangement benefits the plant?`, [
          wrong(`Ants find the fatty attachments on hollowbell seeds irresistible.`, 'wrong-supporting-detail'),
          wrong(`Invasive ants eat the fatty tips on the spot and leave the seeds exposed.`, 'wrong-supporting-detail'),
          wrong(`The hollowbell is a small wildflower that blooms in the spring.`, 'wrong-supporting-detail'),
          right(`Seeds carried by ants were far more likely to sprout than seeds that fell beneath the parent.`),
        ], `Higher sprouting rates are direct evidence that the plant gains from the ants' help. The ants' attraction to the attachment explains why ants take part, not how the plant benefits.`),
        q(34, 'hard', `How does the fourth paragraph shape the central idea?`, [
          right(`It shows that the benefit depends on the native ants in particular, which leads to the conclusion that the relationship itself needs protection.`),
          wrong(`It shows that the hollowbell no longer needs ants, since its seeds can sprout where they fall.`, 'contradicts-text'),
          wrong(`It shifts the passage's main topic from wildflowers to the spread of invasive insects.`, 'misreads-structure'),
          wrong(`It proves that invasive ants are more intelligent than native ants because they eat faster.`, 'unsupported-inference'),
        ], `Where invasive ants replaced native ones, seeds were left exposed and patches shrank, which sets up the final claim that the plant's future "depends on a relationship." The invasive ants are discussed only as they affect the partnership, so the topic does not shift.`),
        q(35, 'hard', `Which is the best objective summary of the passage?`, [
          wrong(`Hikers in the Ashcombe Hills carelessly ignore the ants that keep the forest alive. The invasive ants are destroying the hills, and people must act now before the hollowbell disappears forever.`, 'includes-opinion'),
          wrong(`The hollowbell grows in the Ashcombe Hills. Its seeds have fatty attachments, and ants carry them to their nests, where they eat the attachments and feed them to their young.`, 'too-narrow'),
          wrong(`Native ants and invasive ants compete for hollowbell seeds. A botanist found that the native ants plant the seeds on purpose so that more food will grow near their nests.`, 'unsupported-inference'),
          right(`Native ants carry hollowbell seeds to their nests for a fatty reward and discard the seeds in rich, hidden soil, where they sprout better. Where invasive ants have replaced native ones, the plant is declining, so its survival depends on that partnership.`),
        ], `The summary beginning "Native ants carry hollowbell seeds" covers how the partnership works, its benefit, the threat and the conclusion without opinions. The summary claiming native ants "plant the seeds on purpose" adds a purpose the passage never states, since the ants simply discard seeds they cannot eat.`),
      ],
    },
    {
      code: 'rg10-main-idea-summary-p08',
      title: 'Give Every Student a Field Notebook',
      body: `Our science classes at Westbrook High spend a great deal of time on worksheets and screens. Students read about ecosystems, label diagrams of leaves and watch videos of animals in faraway places. All of this has value. But I believe something important is missing, and it could be added with a pencil and a few dollars' worth of paper. Every ninth and tenth grade science student should keep a field notebook and use it outside at least once a week.\n\nA field notebook is simple. Students choose a spot, perhaps a corner of the school lawn or a tree by the parking lot, and return to it regularly. Each visit, they sketch what they see, note the weather and write down questions. Over months, the pages build a record of change: the first buds, the arrival of certain birds, the puddle that forms after every storm.\n\nThe strongest reason to keep these notebooks is that they teach students to observe carefully, which is where science begins. Drawing a leaf forces you to notice the shape of its edge and the pattern of its veins in a way that labeling a printed diagram does not. Last spring, during a pilot program at Westbrook, a student named Imani Castellanos sketched the same maple tree for ten weeks. Imani noticed that the tree's north side leafed out days later than its south side and then designed an experiment to find out why.\n\nSome teachers worry that outdoor time takes away from material on the test. That is a fair concern. Yet a weekly visit can take as little as fifteen minutes, and the questions students raise outside can lead directly into lessons on climate, plant growth and the methods of research.\n\nScreens and textbooks will always have a place in science class. Field notebooks would not replace them. They would give students what no screen can: the habit of looking closely at the world right outside the door.`,
      items: [
        q(36, 'easy', `What is the writer's central claim?`, [
          wrong(`Worksheets, screens and videos have no value in a high school science class.`, 'contradicts-text'),
          wrong(`Imani Castellanos discovered why one side of a maple tree leafs out later.`, 'too-narrow'),
          right(`Science students should keep weekly outdoor field notebooks because they build the careful observation that science depends on.`),
          wrong(`Westbrook High should spend most of its science time outdoors instead of preparing for tests.`, 'overstates-claim'),
        ], `The writer states the claim at the end of paragraph 1 and gives careful observation as "the strongest reason." The writer says screens and worksheets have value, and Imani designed an experiment but the passage does not say Imani found the answer.`),
        q(37, 'medium', `How does the example of Imani Castellanos support the central claim?`, [
          wrong(`It shows that students need expensive equipment to do real science outdoors.`, 'contradicts-text'),
          wrong(`It shows that maple trees grow better on their south side than on their north side.`, 'misses-purpose'),
          wrong(`It proves that every student who keeps a notebook will design an experiment.`, 'overgeneralization'),
          right(`It shows careful observation in a notebook leading a student to ask a question and plan an experiment.`),
        ], `Imani noticed a difference by sketching one tree for weeks and then "designed an experiment to find out why," which illustrates observation as "where science begins." The fact about the tree matters only as an example of what observation reveals.`),
        q(38, 'medium', `How does the fourth paragraph develop the writer's argument?`, [
          right(`It acknowledges a concern about lost class time and answers it by noting that visits are short and feed into lessons.`),
          wrong(`It admits that field notebooks would hurt test scores and should be optional.`, 'misreads-concession'),
          wrong(`It gives a second student example to prove that notebooks improve test scores.`, 'unsupported-inference'),
          wrong(`It explains how students should choose a spot and what they should write down.`, 'misreads-structure'),
        ], `The writer calls the worry "a fair concern" and then replies with "Yet," pointing to fifteen-minute visits and links to lessons. Calling a concern fair is not the same as agreeing that notebooks would hurt scores.`),
        q(39, 'hard', `Which is the most objective summary of the passage?`, [
          wrong(`Field notebooks are the best way to teach science. Weekly sketching makes students observe carefully, as Imani's maple tree shows, and teachers who worry about tests are simply wrong.`, 'presents-opinion-as-fact'),
          wrong(`The writer convincingly proves that field notebooks are better than screens. With a brilliant example and a strong reply to critics, the piece should persuade every science teacher at Westbrook.`, 'includes-opinion'),
          right(`The writer argues that science students should keep weekly outdoor field notebooks, mainly because sketching teaches careful observation, as in a student's maple tree study. The writer answers concerns about test time and says notebooks would add to screens, not replace them.`),
          wrong(`The writer describes a field notebook. Students pick a spot such as a tree or a lawn, return to it regularly, sketch what they see, note the weather and write questions over many months.`, 'too-narrow'),
        ], `An objective summary of an opinion piece reports the writer's claim and reasons without adopting or judging them, which the summary beginning "The writer argues" does. The summary beginning "Field notebooks are the best way" states the writer's opinion as fact and adds a judgment the writer did not make, since the writer called the concern "fair."`),
        q(40, 'hard', `How does the final paragraph refine the writer's central claim?`, [
          wrong(`It withdraws the claim, admitting that screens and textbooks are more useful than notebooks.`, 'misreads-concession'),
          wrong(`It adds a new argument that schools should buy fewer screens to save money.`, 'unsupported-inference'),
          wrong(`It repeats the details of how to keep a notebook so readers can begin right away.`, 'misreads-structure'),
          right(`It narrows the claim, presenting notebooks as an addition to screens and textbooks that builds a habit screens cannot.`),
        ], `"Field notebooks would not replace them" sets a limit on the proposal, while the last sentence restates its unique value. Granting screens "a place" does not withdraw the claim, because the writer still argues for adding notebooks.`),
      ],
    },
  ],
}

export default skill
