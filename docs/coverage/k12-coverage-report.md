# K-12 coverage: Reading, Writing and Math (Phase A report)

Read from the live tutoring database (papiowjjoyhnbyhgtbxq) on 2026-10-14. No writes.

**Goal.** Every grade K to 12 has the skills its standards expect, and every skill has at least 40 published, reviewed questions at that grade.

**Standards used.** Common Core ELA and Math. Maryland's standards (MCCRS) match Common Core one for one in ELA. Maryland's revised math standards keep the Common Core progression, with Maryland refinements, mainly more estimation, and a few standards moved between grades. Before building grade-level math, those moves should be checked against the MSDE math standards document, which I could not read here. High school math follows the usual Maryland course order: grade 9 Algebra I, grade 10 Geometry, grade 11 Algebra II, grade 12 Precalculus and Statistics. Grade 12 is mostly Common Core "plus" standards, since Maryland requires Algebra I and Geometry but not a fixed grade 12 course.

**What a skill is here.** One skill is one assessable cluster of standards that can be checked with graded multiple-choice questions, for example "Theme and summary" (RL.6.2) or "Ratios and unit rates" (6.RP.A). Standards about speaking, research projects or reading range are left out because they can't be measured this way. Writing composition skills (opinion, informative, narrative) are measured with revising and editing questions about a short draft, the way state tests do, and can also use Nikki's writing feedback.

## 1. Headline numbers

| | Skills needed | Skills that exist | Questions needed (40 each) | Published, counted up to 40 a skill | Published and reviewed |
|---|---|---|---|---|---|
| Reading | 183 | 9 | 7,320 | 206 | 0 |
| Writing | 114 | 13 | 4,560 | 180 | 0 |
| Math | 158 | 75 | 6,320 | 1,630 | 0 |
| **Total** | **455** | **97** | **18,200** | **2,016** | **0** |

- **Complete skills: 0 of 455.** No skill has 40 reviewed questions. The review fields only arrived with migration 0034, and none of the 2,048 published Reading, Writing and Math questions has a named reviewer yet. Even on published counts alone, no skill reaches 40; most have 20.
- 98 live skills map onto 97 of the needed skills. Two grade 5 grammar skills (Subject-Verb Agreement, Verb Tense & Form) both cover "Grammar and usage".
- Five Writing skills have no questions at all: Sentence Writing (grade 2), Paragraph Writing (3), Creative Writing (4), Short Response (4) and Writing Structure (9). They run through Nikki's writing practice, not graded questions.
- Several live skills sit at a different grade than the standard they cite. For example, Possessives & Apostrophes is grade 5 but cites L.2.2.C, and Sentence Structure is grade 5 but cites L.4.1.F. The tables count each at its live grade. A re-level pass should fix the codes or the grades.

## 2. Worst grades

**Reading** has skills only at K, 1, 2, 3 and 9. Grades 4 to 8 and 10 to 12 have none, and grades 1, 2 and 9 have one skill each.

**Writing** has nothing at K, 1, 8, 10, 11 or 12. Grade 2 and grade 3 each have one skill, and it has no questions.

**Math** exists at every grade, but thinly. K to 2 have 2 or 3 of the 8 to 12 skills their standards need. Every grade from 3 up has about half its skills, each with 20 questions.

## 3. Which gaps hurt current students most

Active students: 103. Of them, 91 are in grades 9 to 12 (grade 9: 41, grade 10: 15, grade 11: 20, grade 12: 15), and 84 are school-covered at Pallotti. Working grade is empty for every active student, so placement level is read from the skills they practice and their mastery rows.

1. **High school Reading and Writing, grades 9 to 12.** These students have one reading skill and one gradable writing skill at their level. Reading has nothing between grade 3 and grade 9, so a high school student whose reading places below grade 9 drops straight to grade 3: 60 answers on grade 3 reading come from 8 students. Writing has nothing at 10 to 12.
2. **Reading and Writing, grades 4 to 8.** This is the missing middle that causes the drop to grade 3. Filling it gives placement and the lesson path a real ladder.
3. **High school Math depth.** Grades 8 to 12 carry most math practice (266 of 384 math answers), but each grade has 6 skills of 20 questions. Key Algebra I and Geometry topics are missing: quadratics, function notation, exponential models, constructions and circle equations.
4. **The review backlog.** No published question is reviewed, so no skill can count as complete until the existing 2,048 are reviewed.
5. **K to 2** matters for later families but no active student is in K to 2 today except one kindergartner.

## 4. How the pipeline should build them

Same pattern as the SAT work in 0034, extended to every subject.

- **Source in `content/`.** One TypeScript file per skill under `content/<subject>/grade-<n>/`, imported only by the seed builder and tests, never by the app. `noQuestionBanksInBundle.test.ts` is extended to fail if anything under `content/` reaches the browser.
- **Math.** Templates where the math is procedural: a generator with seeded numbers, a worked solution and distractors built from named mistakes (the existing `gen_templates` approach). Word problems and geometry items are written one at a time. Every item is rendered to a stored question, so it can be reviewed before publishing.
- **Reading.** Original passages written for the grade (word count and sentence length checked against the grade band), with 4 to 6 questions each spread across the grade's skills. Passages are stored once in `public.passages` and linked by `passage_id`. No copyrighted or adapted text.
- **Writing.** Conventions and sentence items are single sentences or short paragraphs with an edit choice. Composition skills use a short student-style draft with revising questions: best thesis, best evidence, best transition, best conclusion.
- **Automated checks on every item**, failing the build:
  - exactly 4 choices, one correct, all different;
  - every wrong choice tagged with a named misconception;
  - a non-empty explanation;
  - no em dashes, en dashes or spaced hyphens;
  - passage length and average sentence length within the grade band;
  - no duplicate stems within a skill;
  - stems that end in a question mark or a colon;
  - at least 40 items per skill before it is called drafted.
- **Everything loads as draft.** The builder writes a seed that upserts the skill rows (new skills get a domain row per group), the passages and the questions, all with status draft. A draft skill is invisible to students: the app only offers skills with at least one published question.
- **Review before publish.** A reviewer approves each question, recorded in `reviewed_by` and `reviewed_at`, and only then is it published. Migration 0034's guard enforces this for SAT skills only today. A new migration should apply the same guard to Reading, Writing and Math, so nothing new publishes without a named reviewer.

## 5. `/admin/coverage`

Extends `/admin/sat-coverage` to every subject and grade, with the same live counts.

- **A targets table**, `coverage_targets` (subject, grade, group, name, standards, `skill_slug`), seeded from this report's skill list. Every needed skill shows, including ones not built yet.
- **`content_coverage()`**, platform admins only. Per target it returns: exists, drafted, checks passing, reviewed, published and the target (40). "Checks passing" comes from a general `question_issues(q)`, the SAT checks extended to all subjects.
- **The page.**
  - Subject tabs (Reading, Writing, Math, SAT), with each grade expandable to its skills.
  - Each row shows exists, drafted, checks passing, reviewed, published, target, and either Complete or how many to go.
  - Top line: "X of 455 skills complete. Y of 18,200 questions published and reviewed", where published counts each skill up to 40.
  - A line per subject and per grade.
- `/admin/sat-coverage` stays as it is and can redirect to the SAT tab later.

## 6. Phased plan, ordered by what helps current students first

The build order below follows your instruction: Reading and Writing 4 to 8, then 10 to 12, then Math gaps, then the page. Inside each band, the highest-enrollment grades go first: 8, 7, 6, 4, 5, then 11, 10, 12. Grade 9 Reading and Writing should come right after 10 to 12, since grade 9 has the most students.

**Phase 1. Reading and Writing, grades 4 to 8** (70 Reading and 47 Writing skills, about 4,700 questions)
- [ ] Skills, passages and items for grade 8, then 7, 6, 4 and 5, all as drafts
- [ ] Every item passes the automated checks
- [ ] Seed reviewed by you, then run as draft

**Phase 2. Reading and Writing, grades 10 to 12, then grade 9** (56 Reading and 36 Writing skills, about 3,700 questions)

**Phase 3. Math gaps** (83 missing skills at 40 questions each, 3,320 questions, plus 1,370 to bring existing skills up to 40)
- [ ] Grades 9 to 12 first (Algebra I, Geometry, Algebra II, Precalculus), then 8 to 6, then K to 5
- [ ] Check the Maryland grade moves before finishing K to 8

**Phase 4. `/admin/coverage`** (the migration and page above)

**Phase 5. Review and publish**
- [ ] Review the 2,048 published questions that already exist, so they count
- [ ] Review new drafts skill by skill, then publish
- [ ] Extend the publish guard to all subjects

**Phase 6. K to 3 Reading and Writing**, last, because almost no active students are in those grades

## 7. Per-grade detail

"Exists today as" lists the live skill that covers it. Published is that skill's published question count; "reviewed" is 0 everywhere today.

## Reading


### Reading, grade K: 2 of 12 skills exist, 54 of 480 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.K.1 | missing | 0 | 0 | 40 |
| Literature | Retelling stories | RL.K.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.K.3 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.K.1 | missing | 0 | 0 | 40 |
| Informational text | Main topic | RI.K.2 | missing | 0 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.K.3 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Letter naming and print concepts | RF.K.1 | `letter-naming` | 26 | 0 | 40 |
| Vocabulary and word study | Phonological awareness | RF.K.2 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Letter sounds | RF.K.3 | `letter-sounds` | 28 | 0 | 40 |
| Vocabulary and word study | High-frequency words and fluency | RF.K.3, RF.K.4 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.K.4a | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word meanings and relationships | L.K.5 | missing | 0 | 0 | 40 |

### Reading, grade 1: 1 of 15 skills exist, 26 of 600 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.1.1 | missing | 0 | 0 | 40 |
| Literature | Retelling stories | RL.1.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.1.3 | missing | 0 | 0 | 40 |
| Literature | Structure and point of view in literature | RL.1.5, RL.1.6 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.1.1 | missing | 0 | 0 | 40 |
| Informational text | Main idea and summary | RI.1.2 | `main-idea-1` | 26 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.1.3 | missing | 0 | 0 | 40 |
| Informational text | Text structure and features | RI.1.5 | missing | 0 | 0 | 40 |
| Informational text | Author's purpose and point of view | RI.1.6 | missing | 0 | 0 | 40 |
| Informational text | Reasons, evidence and argument | RI.1.8 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Phonological awareness | RF.1.2 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Phonics and decoding | RF.1.3 | missing | 0 | 0 | 40 |
| Vocabulary and word study | High-frequency words and fluency | RF.1.3, RF.1.4 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.1.4a | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word meanings and relationships | L.1.5 | missing | 0 | 0 | 40 |

### Reading, grade 2: 1 of 16 skills exist, 26 of 640 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.2.1 | missing | 0 | 0 | 40 |
| Literature | Theme and summary | RL.2.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.2.3 | missing | 0 | 0 | 40 |
| Literature | Structure and point of view in literature | RL.2.5, RL.2.6 | missing | 0 | 0 | 40 |
| Literature | Comparing stories and poems | RL.2.9 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.2.1 | `reading-comprehension-2` | 26 | 0 | 40 |
| Informational text | Main idea and summary | RI.2.2 | missing | 0 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.2.3 | missing | 0 | 0 | 40 |
| Informational text | Text structure and features | RI.2.5 | missing | 0 | 0 | 40 |
| Informational text | Author's purpose and point of view | RI.2.6 | missing | 0 | 0 | 40 |
| Informational text | Reasons, evidence and argument | RI.2.8 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Phonics and decoding | RF.2.3 | missing | 0 | 0 | 40 |
| Vocabulary and word study | High-frequency words and fluency | RF.2.3, RF.2.4 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.2.4a | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word parts: roots and affixes | L.2.4b, L.2.4c | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word meanings and relationships | L.2.5 | missing | 0 | 0 | 40 |

### Reading, grade 3: 4 of 14 skills exist, 80 of 560 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.3.1 | missing | 0 | 0 | 40 |
| Literature | Theme and summary | RL.3.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.3.3 | `story-elements` | 20 | 0 | 40 |
| Literature | Structure and point of view in literature | RL.3.5, RL.3.6 | missing | 0 | 0 | 40 |
| Literature | Comparing stories and poems | RL.3.9 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.3.1 | `reading-comprehension` | 20 | 0 | 40 |
| Informational text | Main idea and summary | RI.3.2 | `main-idea` | 20 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.3.3 | missing | 0 | 0 | 40 |
| Informational text | Text structure and features | RI.3.5 | missing | 0 | 0 | 40 |
| Informational text | Author's purpose and point of view | RI.3.6 | missing | 0 | 0 | 40 |
| Informational text | Reasons, evidence and argument | RI.3.8 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.3.4a | `vocabulary` | 20 | 0 | 40 |
| Vocabulary and word study | Word parts: roots and affixes | L.3.4b, L.3.4c | missing | 0 | 0 | 40 |
| Vocabulary and word study | Figurative language and word relationships | L.3.5 | missing | 0 | 0 | 40 |

### Reading, grade 4: 0 of 14 skills exist, 0 of 560 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.4.1 | missing | 0 | 0 | 40 |
| Literature | Theme and summary | RL.4.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.4.3 | missing | 0 | 0 | 40 |
| Literature | Structure and point of view in literature | RL.4.5, RL.4.6 | missing | 0 | 0 | 40 |
| Literature | Comparing stories and poems | RL.4.9 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.4.1 | missing | 0 | 0 | 40 |
| Informational text | Main idea and summary | RI.4.2 | missing | 0 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.4.3 | missing | 0 | 0 | 40 |
| Informational text | Text structure and features | RI.4.5 | missing | 0 | 0 | 40 |
| Informational text | Author's purpose and point of view | RI.4.6 | missing | 0 | 0 | 40 |
| Informational text | Reasons, evidence and argument | RI.4.8 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.4.4a | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word parts: roots and affixes | L.4.4b, L.4.4c | missing | 0 | 0 | 40 |
| Vocabulary and word study | Figurative language and word relationships | L.4.5 | missing | 0 | 0 | 40 |

### Reading, grade 5: 0 of 14 skills exist, 0 of 560 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.5.1 | missing | 0 | 0 | 40 |
| Literature | Theme and summary | RL.5.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.5.3 | missing | 0 | 0 | 40 |
| Literature | Structure and point of view in literature | RL.5.5, RL.5.6 | missing | 0 | 0 | 40 |
| Literature | Comparing stories and poems | RL.5.9 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.5.1 | missing | 0 | 0 | 40 |
| Informational text | Main idea and summary | RI.5.2 | missing | 0 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.5.3 | missing | 0 | 0 | 40 |
| Informational text | Text structure and features | RI.5.5 | missing | 0 | 0 | 40 |
| Informational text | Author's purpose and point of view | RI.5.6 | missing | 0 | 0 | 40 |
| Informational text | Reasons, evidence and argument | RI.5.8 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.5.4a | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word parts: roots and affixes | L.5.4b, L.5.4c | missing | 0 | 0 | 40 |
| Vocabulary and word study | Figurative language and word relationships | L.5.5 | missing | 0 | 0 | 40 |

### Reading, grade 6: 0 of 14 skills exist, 0 of 560 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.6.1 | missing | 0 | 0 | 40 |
| Literature | Theme and summary | RL.6.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.6.3 | missing | 0 | 0 | 40 |
| Literature | Structure and point of view in literature | RL.6.5, RL.6.6 | missing | 0 | 0 | 40 |
| Literature | Comparing stories and poems | RL.6.9 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.6.1 | missing | 0 | 0 | 40 |
| Informational text | Main idea and summary | RI.6.2 | missing | 0 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.6.3 | missing | 0 | 0 | 40 |
| Informational text | Text structure and features | RI.6.5 | missing | 0 | 0 | 40 |
| Informational text | Author's purpose and point of view | RI.6.6 | missing | 0 | 0 | 40 |
| Informational text | Reasons, evidence and argument | RI.6.8 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.6.4a | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word parts: roots and affixes | L.6.4b, L.6.4c | missing | 0 | 0 | 40 |
| Vocabulary and word study | Figurative language and word relationships | L.6.5 | missing | 0 | 0 | 40 |

### Reading, grade 7: 0 of 14 skills exist, 0 of 560 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.7.1 | missing | 0 | 0 | 40 |
| Literature | Theme and summary | RL.7.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.7.3 | missing | 0 | 0 | 40 |
| Literature | Structure and point of view in literature | RL.7.5, RL.7.6 | missing | 0 | 0 | 40 |
| Literature | Comparing stories and poems | RL.7.9 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.7.1 | missing | 0 | 0 | 40 |
| Informational text | Main idea and summary | RI.7.2 | missing | 0 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.7.3 | missing | 0 | 0 | 40 |
| Informational text | Text structure and features | RI.7.5 | missing | 0 | 0 | 40 |
| Informational text | Author's purpose and point of view | RI.7.6 | missing | 0 | 0 | 40 |
| Informational text | Reasons, evidence and argument | RI.7.8 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.7.4a | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word parts: roots and affixes | L.7.4b, L.7.4c | missing | 0 | 0 | 40 |
| Vocabulary and word study | Figurative language and word relationships | L.7.5 | missing | 0 | 0 | 40 |

### Reading, grade 8: 0 of 14 skills exist, 0 of 560 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.8.1 | missing | 0 | 0 | 40 |
| Literature | Theme and summary | RL.8.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.8.3 | missing | 0 | 0 | 40 |
| Literature | Structure and point of view in literature | RL.8.5, RL.8.6 | missing | 0 | 0 | 40 |
| Literature | Comparing stories and poems | RL.8.9 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.8.1 | missing | 0 | 0 | 40 |
| Informational text | Main idea and summary | RI.8.2 | missing | 0 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.8.3 | missing | 0 | 0 | 40 |
| Informational text | Text structure and features | RI.8.5 | missing | 0 | 0 | 40 |
| Informational text | Author's purpose and point of view | RI.8.6 | missing | 0 | 0 | 40 |
| Informational text | Reasons, evidence and argument | RI.8.8 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.8.4a | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word parts: roots and affixes | L.8.4b, L.8.4c | missing | 0 | 0 | 40 |
| Vocabulary and word study | Figurative language and word relationships | L.8.5 | missing | 0 | 0 | 40 |

### Reading, grade 9: 1 of 14 skills exist, 20 of 560 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.9-10.1 | missing | 0 | 0 | 40 |
| Literature | Theme and summary | RL.9-10.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.9-10.3 | missing | 0 | 0 | 40 |
| Literature | Structure and point of view in literature | RL.9-10.5, RL.9-10.6 | missing | 0 | 0 | 40 |
| Literature | Comparing stories and poems | RL.9-10.9 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.9-10.1 | `evidence-based-reading` | 20 | 0 | 40 |
| Informational text | Main idea and summary | RI.9-10.2 | missing | 0 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.9-10.3 | missing | 0 | 0 | 40 |
| Informational text | Text structure and features | RI.9-10.5 | missing | 0 | 0 | 40 |
| Informational text | Author's purpose and point of view | RI.9-10.6 | missing | 0 | 0 | 40 |
| Informational text | Reasons, evidence and argument | RI.9-10.8 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.9-10.4a | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word parts: roots and affixes | L.9-10.4b, L.9-10.4c | missing | 0 | 0 | 40 |
| Vocabulary and word study | Figurative language and word relationships | L.9-10.5 | missing | 0 | 0 | 40 |

### Reading, grade 10: 0 of 14 skills exist, 0 of 560 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.9-10.1 | missing | 0 | 0 | 40 |
| Literature | Theme and summary | RL.9-10.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.9-10.3 | missing | 0 | 0 | 40 |
| Literature | Structure and point of view in literature | RL.9-10.5, RL.9-10.6 | missing | 0 | 0 | 40 |
| Literature | Comparing stories and poems | RL.9-10.9 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.9-10.1 | missing | 0 | 0 | 40 |
| Informational text | Main idea and summary | RI.9-10.2 | missing | 0 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.9-10.3 | missing | 0 | 0 | 40 |
| Informational text | Text structure and features | RI.9-10.5 | missing | 0 | 0 | 40 |
| Informational text | Author's purpose and point of view | RI.9-10.6 | missing | 0 | 0 | 40 |
| Informational text | Reasons, evidence and argument | RI.9-10.8 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.9-10.4a | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word parts: roots and affixes | L.9-10.4b, L.9-10.4c | missing | 0 | 0 | 40 |
| Vocabulary and word study | Figurative language and word relationships | L.9-10.5 | missing | 0 | 0 | 40 |

### Reading, grade 11: 0 of 14 skills exist, 0 of 560 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.11-12.1 | missing | 0 | 0 | 40 |
| Literature | Theme and summary | RL.11-12.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.11-12.3 | missing | 0 | 0 | 40 |
| Literature | Structure and point of view in literature | RL.11-12.5, RL.11-12.6 | missing | 0 | 0 | 40 |
| Literature | Comparing stories and poems | RL.11-12.9 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.11-12.1 | missing | 0 | 0 | 40 |
| Informational text | Main idea and summary | RI.11-12.2 | missing | 0 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.11-12.3 | missing | 0 | 0 | 40 |
| Informational text | Text structure and features | RI.11-12.5 | missing | 0 | 0 | 40 |
| Informational text | Author's purpose and point of view | RI.11-12.6 | missing | 0 | 0 | 40 |
| Informational text | Reasons, evidence and argument | RI.11-12.8 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.11-12.4a | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word parts: roots and affixes | L.11-12.4b, L.11-12.4c | missing | 0 | 0 | 40 |
| Vocabulary and word study | Figurative language and word relationships | L.11-12.5 | missing | 0 | 0 | 40 |

### Reading, grade 12: 0 of 14 skills exist, 0 of 560 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Literature | Key details and inference in stories | RL.11-12.1 | missing | 0 | 0 | 40 |
| Literature | Theme and summary | RL.11-12.2 | missing | 0 | 0 | 40 |
| Literature | Characters, setting and plot | RL.11-12.3 | missing | 0 | 0 | 40 |
| Literature | Structure and point of view in literature | RL.11-12.5, RL.11-12.6 | missing | 0 | 0 | 40 |
| Literature | Comparing stories and poems | RL.11-12.9 | missing | 0 | 0 | 40 |
| Informational text | Key details, evidence and inference | RI.11-12.1 | missing | 0 | 0 | 40 |
| Informational text | Main idea and summary | RI.11-12.2 | missing | 0 | 0 | 40 |
| Informational text | Connections between events and ideas | RI.11-12.3 | missing | 0 | 0 | 40 |
| Informational text | Text structure and features | RI.11-12.5 | missing | 0 | 0 | 40 |
| Informational text | Author's purpose and point of view | RI.11-12.6 | missing | 0 | 0 | 40 |
| Informational text | Reasons, evidence and argument | RI.11-12.8 | missing | 0 | 0 | 40 |
| Vocabulary and word study | Context clues | L.11-12.4a | missing | 0 | 0 | 40 |
| Vocabulary and word study | Word parts: roots and affixes | L.11-12.4b, L.11-12.4c | missing | 0 | 0 | 40 |
| Vocabulary and word study | Figurative language and word relationships | L.11-12.5 | missing | 0 | 0 | 40 |

## Writing


### Writing, grade K: 0 of 7 skills exist, 0 of 280 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.K.1 | missing | 0 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.K.2 | missing | 0 | 0 | 40 |
| Conventions | Spelling | L.K.2 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Complete sentences | L.K.1 | missing | 0 | 0 | 40 |
| Composition | Opinion writing | W.K.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.K.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.K.3 | missing | 0 | 0 | 40 |

### Writing, grade 1: 0 of 7 skills exist, 0 of 280 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.1.1 | missing | 0 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.1.2 | missing | 0 | 0 | 40 |
| Conventions | Spelling | L.1.2 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Complete sentences | L.1.1 | missing | 0 | 0 | 40 |
| Composition | Opinion writing | W.1.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.1.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.1.3 | missing | 0 | 0 | 40 |

### Writing, grade 2: 1 of 8 skills exist, 0 of 320 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.2.1 | missing | 0 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.2.2 | missing | 0 | 0 | 40 |
| Conventions | Spelling | L.2.2 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Complete sentences | L.2.1 | `sentence-writing` | 0 | 0 | 40 |
| Sentence and paragraph | Paragraph organization and transitions | W.2.2 | missing | 0 | 0 | 40 |
| Composition | Opinion writing | W.2.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.2.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.2.3 | missing | 0 | 0 | 40 |

### Writing, grade 3: 1 of 9 skills exist, 0 of 360 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.3.1 | missing | 0 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.3.2 | missing | 0 | 0 | 40 |
| Conventions | Spelling | L.3.2 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Sentence structure and boundaries | L.3.1 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Paragraph organization and transitions | W.3.2 | `paragraph-writing` | 0 | 0 | 40 |
| Sentence and paragraph | Precise language and style | L.3.3 | missing | 0 | 0 | 40 |
| Composition | Opinion writing | W.3.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.3.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.3.3 | missing | 0 | 0 | 40 |

### Writing, grade 4: 3 of 10 skills exist, 20 of 400 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.4.1 | missing | 0 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.4.2 | `punctuation-basics` | 20 | 0 | 40 |
| Conventions | Spelling | L.4.2 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Sentence structure and boundaries | L.4.1 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Paragraph organization and transitions | W.4.2c | missing | 0 | 0 | 40 |
| Sentence and paragraph | Precise language and style | L.4.3 | missing | 0 | 0 | 40 |
| Composition | Opinion writing | W.4.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.4.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.4.3 | `creative-writing` | 0 | 0 | 40 |
| Composition | Writing about texts with evidence | W.4.9 | `short-response` | 0 | 0 | 40 |

### Writing, grade 5: 3 of 10 skills exist, 80 of 400 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.5.1 | `subject-verb-agreement`, `verb-tense-and-form` | 40 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.5.2 | `possessives-and-apostrophes` | 20 | 0 | 40 |
| Conventions | Spelling | L.5.2 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Sentence structure and boundaries | L.5.1 | `sentence-structure` | 20 | 0 | 40 |
| Sentence and paragraph | Paragraph organization and transitions | W.5.2c | missing | 0 | 0 | 40 |
| Sentence and paragraph | Precise language and style | L.5.3 | missing | 0 | 0 | 40 |
| Composition | Opinion writing | W.5.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.5.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.5.3 | missing | 0 | 0 | 40 |
| Composition | Writing about texts with evidence | W.5.9 | missing | 0 | 0 | 40 |

### Writing, grade 6: 2 of 9 skills exist, 40 of 360 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.6.1 | `pronoun-agreement` | 20 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.6.2 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Sentence structure and boundaries | L.6.1 | `sentence-boundaries` | 20 | 0 | 40 |
| Sentence and paragraph | Paragraph organization and transitions | W.6.2c | missing | 0 | 0 | 40 |
| Sentence and paragraph | Precise language and style | L.6.3 | missing | 0 | 0 | 40 |
| Composition | Argument writing | W.6.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.6.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.6.3 | missing | 0 | 0 | 40 |
| Composition | Writing about texts with evidence | W.6.9 | missing | 0 | 0 | 40 |

### Writing, grade 7: 1 of 9 skills exist, 20 of 360 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.7.1 | `modifier-placement` | 20 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.7.2 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Sentence structure and boundaries | L.7.1 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Paragraph organization and transitions | W.7.2c | missing | 0 | 0 | 40 |
| Sentence and paragraph | Precise language and style | L.7.3 | missing | 0 | 0 | 40 |
| Composition | Argument writing | W.7.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.7.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.7.3 | missing | 0 | 0 | 40 |
| Composition | Writing about texts with evidence | W.7.9 | missing | 0 | 0 | 40 |

### Writing, grade 8: 0 of 9 skills exist, 0 of 360 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.8.1 | missing | 0 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.8.2 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Sentence structure and boundaries | L.8.1 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Paragraph organization and transitions | W.8.2c | missing | 0 | 0 | 40 |
| Sentence and paragraph | Precise language and style | L.8.3 | missing | 0 | 0 | 40 |
| Composition | Argument writing | W.8.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.8.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.8.3 | missing | 0 | 0 | 40 |
| Composition | Writing about texts with evidence | W.8.9 | missing | 0 | 0 | 40 |

### Writing, grade 9: 2 of 9 skills exist, 20 of 360 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.9-10.1 | missing | 0 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.9-10.2 | `advanced-punctuation` | 20 | 0 | 40 |
| Sentence and paragraph | Sentence structure and boundaries | L.9-10.1 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Paragraph organization and transitions | W.9-10.2c | `writing-structure` | 0 | 0 | 40 |
| Sentence and paragraph | Precise language and style | L.9-10.3 | missing | 0 | 0 | 40 |
| Composition | Argument writing | W.9-10.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.9-10.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.9-10.3 | missing | 0 | 0 | 40 |
| Composition | Writing about texts with evidence | W.9-10.9 | missing | 0 | 0 | 40 |

### Writing, grade 10: 0 of 9 skills exist, 0 of 360 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.9-10.1 | missing | 0 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.9-10.2 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Sentence structure and boundaries | L.9-10.1 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Paragraph organization and transitions | W.9-10.2c | missing | 0 | 0 | 40 |
| Sentence and paragraph | Precise language and style | L.9-10.3 | missing | 0 | 0 | 40 |
| Composition | Argument writing | W.9-10.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.9-10.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.9-10.3 | missing | 0 | 0 | 40 |
| Composition | Writing about texts with evidence | W.9-10.9 | missing | 0 | 0 | 40 |

### Writing, grade 11: 0 of 9 skills exist, 0 of 360 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.11-12.1 | missing | 0 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.11-12.2 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Sentence structure and boundaries | L.11-12.1 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Paragraph organization and transitions | W.11-12.2c | missing | 0 | 0 | 40 |
| Sentence and paragraph | Precise language and style | L.11-12.3 | missing | 0 | 0 | 40 |
| Composition | Argument writing | W.11-12.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.11-12.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.11-12.3 | missing | 0 | 0 | 40 |
| Composition | Writing about texts with evidence | W.11-12.9 | missing | 0 | 0 | 40 |

### Writing, grade 12: 0 of 9 skills exist, 0 of 360 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Conventions | Grammar and usage | L.11-12.1 | missing | 0 | 0 | 40 |
| Conventions | Capitalization and punctuation | L.11-12.2 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Sentence structure and boundaries | L.11-12.1 | missing | 0 | 0 | 40 |
| Sentence and paragraph | Paragraph organization and transitions | W.11-12.2c | missing | 0 | 0 | 40 |
| Sentence and paragraph | Precise language and style | L.11-12.3 | missing | 0 | 0 | 40 |
| Composition | Argument writing | W.11-12.1 | missing | 0 | 0 | 40 |
| Composition | Informative writing | W.11-12.2 | missing | 0 | 0 | 40 |
| Composition | Narrative writing | W.11-12.3 | missing | 0 | 0 | 40 |
| Composition | Writing about texts with evidence | W.11-12.9 | missing | 0 | 0 | 40 |

## Math


### Math, grade K: 3 of 8 skills exist, 80 of 320 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Counting and Cardinality | Counting sequence to 100 | K.CC.A | missing | 0 | 0 | 40 |
| Counting and Cardinality | Counting objects | K.CC.B | `counting` | 28 | 0 | 40 |
| Counting and Cardinality | Comparing numbers | K.CC.C | `comparing-numbers` | 26 | 0 | 40 |
| Operations and Algebraic Thinking | Addition and subtraction within 10 | K.OA.A | missing | 0 | 0 | 40 |
| Number and Operations in Base Ten | Teen numbers as ten and ones | K.NBT.A | missing | 0 | 0 | 40 |
| Measurement and Data | Comparing and sorting by attributes | K.MD.A, K.MD.B | missing | 0 | 0 | 40 |
| Geometry | Naming and describing shapes | K.G.A | `shapes` | 26 | 0 | 40 |
| Geometry | Building and comparing shapes | K.G.B | missing | 0 | 0 | 40 |

### Math, grade 1: 3 of 12 skills exist, 78 of 480 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Operations and Algebraic Thinking | Word problems within 20 | 1.OA.A | missing | 0 | 0 | 40 |
| Operations and Algebraic Thinking | Properties of addition | 1.OA.B | missing | 0 | 0 | 40 |
| Operations and Algebraic Thinking | Addition within 20 | 1.OA.C | `addition-within-20` | 26 | 0 | 40 |
| Operations and Algebraic Thinking | Subtraction within 20 | 1.OA.C | `subtraction-within-20` | 26 | 0 | 40 |
| Operations and Algebraic Thinking | Equations and the equal sign | 1.OA.D | missing | 0 | 0 | 40 |
| Number and Operations in Base Ten | Counting to 120 | 1.NBT.A | missing | 0 | 0 | 40 |
| Number and Operations in Base Ten | Place value to 100 | 1.NBT.B | `place-value-to-100` | 26 | 0 | 40 |
| Number and Operations in Base Ten | Adding and subtracting tens | 1.NBT.C | missing | 0 | 0 | 40 |
| Measurement and Data | Length | 1.MD.A | missing | 0 | 0 | 40 |
| Measurement and Data | Telling time | 1.MD.B | missing | 0 | 0 | 40 |
| Measurement and Data | Organizing data | 1.MD.C | missing | 0 | 0 | 40 |
| Geometry | Shapes, halves and fourths | 1.G.A | missing | 0 | 0 | 40 |

### Math, grade 2: 2 of 10 skills exist, 52 of 400 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Operations and Algebraic Thinking | Word problems within 100 | 2.OA.A | missing | 0 | 0 | 40 |
| Operations and Algebraic Thinking | Fluency within 20 | 2.OA.B | missing | 0 | 0 | 40 |
| Operations and Algebraic Thinking | Equal groups and arrays | 2.OA.C | missing | 0 | 0 | 40 |
| Number and Operations in Base Ten | Place value to 1,000 | 2.NBT.A | missing | 0 | 0 | 40 |
| Number and Operations in Base Ten | Addition within 100 | 2.NBT.B.5 | `addition-within-100` | 26 | 0 | 40 |
| Number and Operations in Base Ten | Adding and subtracting within 1,000 | 2.NBT.B.7 | missing | 0 | 0 | 40 |
| Measurement and Data | Measuring length | 2.MD.A, 2.MD.B | missing | 0 | 0 | 40 |
| Measurement and Data | Time and money | 2.MD.C | `money-place-value` | 26 | 0 | 40 |
| Measurement and Data | Picture graphs, bar graphs and line plots | 2.MD.D | missing | 0 | 0 | 40 |
| Geometry | Shapes and equal shares | 2.G.A | missing | 0 | 0 | 40 |

### Math, grade 3: 9 of 15 skills exist, 220 of 600 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Operations and Algebraic Thinking | Meaning of multiplication and division | 3.OA.A | missing | 0 | 0 | 40 |
| Operations and Algebraic Thinking | Properties of multiplication | 3.OA.B | missing | 0 | 0 | 40 |
| Operations and Algebraic Thinking | Multiplication facts within 100 | 3.OA.C | `multiplication` | 48 | 0 | 40 |
| Operations and Algebraic Thinking | Division facts within 100 | 3.OA.C | `division` | 20 | 0 | 40 |
| Operations and Algebraic Thinking | Two-step word problems and patterns | 3.OA.D | missing | 0 | 0 | 40 |
| Number and Operations in Base Ten | Rounding | 3.NBT.A.1 | `rounding` | 20 | 0 | 40 |
| Number and Operations in Base Ten | Adding and subtracting within 1,000 | 3.NBT.A.2 | `multi-digit-add-subtract` | 20 | 0 | 40 |
| Number and Operations in Base Ten | Multiplying by multiples of 10 | 3.NBT.A.3 | `place-value` | 20 | 0 | 40 |
| Number and Operations: Fractions | Fractions as numbers | 3.NF.A.1, 3.NF.A.2 | `fractions` | 48 | 0 | 40 |
| Number and Operations: Fractions | Equivalent and comparing fractions | 3.NF.A.3 | missing | 0 | 0 | 40 |
| Measurement and Data | Time, mass and liquid volume | 3.MD.A | `measurement-and-data` | 20 | 0 | 40 |
| Measurement and Data | Graphs and line plots | 3.MD.B | missing | 0 | 0 | 40 |
| Measurement and Data | Area | 3.MD.C | `geometry` | 20 | 0 | 40 |
| Measurement and Data | Perimeter | 3.MD.D | missing | 0 | 0 | 40 |
| Geometry | Shape categories and partitioning | 3.G.A | `early-geometry` | 20 | 0 | 40 |

### Math, grade 4: 6 of 16 skills exist, 120 of 640 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Operations and Algebraic Thinking | Multiplicative comparison and multi-step problems | 4.OA.A | missing | 0 | 0 | 40 |
| Operations and Algebraic Thinking | Factors and multiples | 4.OA.B | `factors-multiples` | 20 | 0 | 40 |
| Operations and Algebraic Thinking | Patterns | 4.OA.C | missing | 0 | 0 | 40 |
| Number and Operations in Base Ten | Place value and rounding multi-digit numbers | 4.NBT.A | missing | 0 | 0 | 40 |
| Number and Operations in Base Ten | Multi-digit addition and subtraction | 4.NBT.B.4 | missing | 0 | 0 | 40 |
| Number and Operations in Base Ten | Multi-digit multiplication | 4.NBT.B.5 | `multi-digit-multiplication` | 20 | 0 | 40 |
| Number and Operations in Base Ten | Multi-digit division | 4.NBT.B.6 | `multi-digit-division` | 20 | 0 | 40 |
| Number and Operations: Fractions | Fraction equivalence and comparison | 4.NF.A | `fraction-equivalence` | 20 | 0 | 40 |
| Number and Operations: Fractions | Adding and subtracting fractions and mixed numbers | 4.NF.B.3 | `fraction-operations-4` | 20 | 0 | 40 |
| Number and Operations: Fractions | Multiplying a fraction by a whole number | 4.NF.B.4 | missing | 0 | 0 | 40 |
| Number and Operations: Fractions | Decimal notation for fractions | 4.NF.C | missing | 0 | 0 | 40 |
| Measurement and Data | Measurement conversions | 4.MD.A.1, 4.MD.A.2 | missing | 0 | 0 | 40 |
| Measurement and Data | Area and perimeter | 4.MD.A.3 | `area-perimeter` | 20 | 0 | 40 |
| Measurement and Data | Line plots with fractions | 4.MD.B | missing | 0 | 0 | 40 |
| Measurement and Data | Measuring angles | 4.MD.C | missing | 0 | 0 | 40 |
| Geometry | Lines, angles and symmetry | 4.G.A | missing | 0 | 0 | 40 |

### Math, grade 5: 8 of 14 skills exist, 160 of 560 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Operations and Algebraic Thinking | Numerical expressions | 5.OA.A | `numerical-expressions` | 20 | 0 | 40 |
| Operations and Algebraic Thinking | Patterns and relationships | 5.OA.B | missing | 0 | 0 | 40 |
| Number and Operations in Base Ten | Place value and powers of 10 | 5.NBT.A.1, 5.NBT.A.2 | missing | 0 | 0 | 40 |
| Number and Operations in Base Ten | Decimal place value, comparing and rounding | 5.NBT.A.3, 5.NBT.A.4 | `decimal-place-value` | 20 | 0 | 40 |
| Number and Operations in Base Ten | Multi-digit multiplication and division | 5.NBT.B.5, 5.NBT.B.6 | `multiply-divide-whole-5` | 20 | 0 | 40 |
| Number and Operations in Base Ten | Decimal operations | 5.NBT.B.7 | `decimal-operations` | 20 | 0 | 40 |
| Number and Operations: Fractions | Adding and subtracting unlike fractions | 5.NF.A | `add-subtract-fractions-unlike` | 20 | 0 | 40 |
| Number and Operations: Fractions | Multiplying fractions | 5.NF.B.4, 5.NF.B.5, 5.NF.B.6 | `multiply-divide-fractions` | 20 | 0 | 40 |
| Number and Operations: Fractions | Dividing with unit fractions | 5.NF.B.7 | missing | 0 | 0 | 40 |
| Measurement and Data | Measurement conversions | 5.MD.A | missing | 0 | 0 | 40 |
| Measurement and Data | Line plots | 5.MD.B | missing | 0 | 0 | 40 |
| Measurement and Data | Volume | 5.MD.C | `volume` | 20 | 0 | 40 |
| Geometry | Coordinate plane | 5.G.A | `coordinate-plane` | 20 | 0 | 40 |
| Geometry | Classifying two-dimensional figures | 5.G.B | missing | 0 | 0 | 40 |

### Math, grade 6: 8 of 12 skills exist, 200 of 480 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Ratios and Proportional Relationships | Ratios and unit rates | 6.RP.A.1, 6.RP.A.2, 6.RP.A.3 | `ratios` | 20 | 0 | 40 |
| Ratios and Proportional Relationships | Percents | 6.RP.A.3c | `percentages` | 48 | 0 | 40 |
| The Number System | Dividing fractions | 6.NS.A | `divide-fractions` | 20 | 0 | 40 |
| The Number System | Multi-digit and decimal computation | 6.NS.B.2, 6.NS.B.3 | missing | 0 | 0 | 40 |
| The Number System | Factors, multiples, GCF and LCM | 6.NS.B.4 | missing | 0 | 0 | 40 |
| The Number System | Integers, rational numbers and absolute value | 6.NS.C | `integers-rational-numbers` | 20 | 0 | 40 |
| Expressions and Equations | Exponents and expressions | 6.EE.A | `expressions` | 20 | 0 | 40 |
| Expressions and Equations | One-step equations and inequalities | 6.EE.B | `one-step-equations` | 20 | 0 | 40 |
| Expressions and Equations | Dependent and independent variables | 6.EE.C | missing | 0 | 0 | 40 |
| Geometry | Area, surface area and volume | 6.G.A | `area-surface-volume-6` | 20 | 0 | 40 |
| Statistics and Probability | Statistical questions and distributions | 6.SP.A | missing | 0 | 0 | 40 |
| Statistics and Probability | Summarizing data | 6.SP.B | `data-analysis` | 48 | 0 | 40 |

### Math, grade 7: 6 of 13 skills exist, 120 of 520 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Ratios and Proportional Relationships | Unit rates with fractions | 7.RP.A.1 | missing | 0 | 0 | 40 |
| Ratios and Proportional Relationships | Proportional relationships | 7.RP.A.2 | `proportional-reasoning` | 20 | 0 | 40 |
| Ratios and Proportional Relationships | Percent applications | 7.RP.A.3 | `percent-applications` | 20 | 0 | 40 |
| The Number System | Adding and subtracting rational numbers | 7.NS.A.1 | `rational-number-operations` | 20 | 0 | 40 |
| The Number System | Multiplying and dividing rational numbers | 7.NS.A.2 | missing | 0 | 0 | 40 |
| The Number System | Rational number word problems | 7.NS.A.3 | missing | 0 | 0 | 40 |
| Expressions and Equations | Equivalent expressions | 7.EE.A | missing | 0 | 0 | 40 |
| Expressions and Equations | Two-step equations and inequalities | 7.EE.B | `two-step-equations` | 20 | 0 | 40 |
| Geometry | Scale drawings and constructions | 7.G.A | missing | 0 | 0 | 40 |
| Geometry | Angles, circles, area and volume | 7.G.B | `angles-area-volume` | 20 | 0 | 40 |
| Statistics and Probability | Sampling and inference | 7.SP.A | missing | 0 | 0 | 40 |
| Statistics and Probability | Comparing two populations | 7.SP.B | missing | 0 | 0 | 40 |
| Statistics and Probability | Probability | 7.SP.C | `probability-models` | 20 | 0 | 40 |

### Math, grade 8: 6 of 11 skills exist, 120 of 440 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| The Number System | Irrational numbers | 8.NS.A | missing | 0 | 0 | 40 |
| Expressions and Equations | Exponents, roots and scientific notation | 8.EE.A | `exponents-scientific-notation` | 20 | 0 | 40 |
| Expressions and Equations | Proportional relationships and slope | 8.EE.B | `linear-thinking` | 20 | 0 | 40 |
| Expressions and Equations | Linear equations in one variable | 8.EE.C.7 | `algebra-1-concepts` | 20 | 0 | 40 |
| Expressions and Equations | Systems of linear equations | 8.EE.C.8 | missing | 0 | 0 | 40 |
| Functions | Defining and comparing functions | 8.F.A | `functions` | 20 | 0 | 40 |
| Functions | Modeling with linear functions | 8.F.B | missing | 0 | 0 | 40 |
| Geometry | Transformations, congruence and similarity | 8.G.A | `transformations-8` | 20 | 0 | 40 |
| Geometry | Pythagorean theorem | 8.G.B | `pythagorean-theorem` | 20 | 0 | 40 |
| Geometry | Volume of cylinders, cones and spheres | 8.G.C | missing | 0 | 0 | 40 |
| Statistics and Probability | Bivariate data and scatter plots | 8.SP.A | missing | 0 | 0 | 40 |

### Math, grade 9: 6 of 13 skills exist, 120 of 520 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Number and Quantity | Rational exponents and radicals | N-RN.A | missing | 0 | 0 | 40 |
| Algebra | Structure of expressions and factoring | A-SSE.A, A-SSE.B | missing | 0 | 0 | 40 |
| Algebra | Creating equations | A-CED.A | missing | 0 | 0 | 40 |
| Algebra | Linear equations and inequalities in one variable | A-REI.B.3 | `linear-equations` | 20 | 0 | 40 |
| Algebra | Systems of linear equations | A-REI.C.6 | `systems-linear` | 20 | 0 | 40 |
| Algebra | Linear inequalities and graphs | A-REI.D | `linear-inequalities` | 20 | 0 | 40 |
| Algebra | Solving quadratic equations | A-REI.B.4 | missing | 0 | 0 | 40 |
| Algebra | Exponent rules | A-SSE.A.2, N-RN.A | `exponent-rules` | 20 | 0 | 40 |
| Functions | Function notation and interpreting functions | F-IF.A, F-IF.B | missing | 0 | 0 | 40 |
| Functions | Graphing linear and quadratic functions | F-IF.C | `graphing-linear-functions` | 20 | 0 | 40 |
| Functions | Building functions | F-BF.A | missing | 0 | 0 | 40 |
| Functions | Linear and exponential models | F-LE.A | missing | 0 | 0 | 40 |
| Statistics and Probability | One-variable and two-variable data | S-ID.A, S-ID.B, S-ID.C | `data-statistics` | 20 | 0 | 40 |

### Math, grade 10: 6 of 12 skills exist, 120 of 480 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Geometry | Transformations | G-CO.A | missing | 0 | 0 | 40 |
| Geometry | Triangle congruence | G-CO.B | `triangle-congruence` | 20 | 0 | 40 |
| Geometry | Geometric proofs | G-CO.C | `geometry-proofs` | 20 | 0 | 40 |
| Geometry | Constructions | G-CO.D | missing | 0 | 0 | 40 |
| Geometry | Similarity | G-SRT.A, G-SRT.B | missing | 0 | 0 | 40 |
| Geometry | Right triangle trigonometry | G-SRT.C | `similarity-right-triangles` | 20 | 0 | 40 |
| Geometry | Circles | G-C.A, G-C.B | `circle-geometry` | 20 | 0 | 40 |
| Geometry | Coordinate geometry | G-GPE.B | `coordinate-geometry` | 20 | 0 | 40 |
| Geometry | Equations of circles | G-GPE.A.1 | missing | 0 | 0 | 40 |
| Geometry | Volume and cross sections | G-GMD.A, G-GMD.B | `hs-geometry` | 20 | 0 | 40 |
| Geometry | Modeling with geometry | G-MG.A | missing | 0 | 0 | 40 |
| Statistics and Probability | Conditional probability | S-CP.A, S-CP.B | missing | 0 | 0 | 40 |

### Math, grade 11: 6 of 12 skills exist, 120 of 480 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Number and Quantity | Complex numbers | N-CN.A, N-CN.C | missing | 0 | 0 | 40 |
| Algebra | Polynomial operations and zeros | A-APR.A, A-APR.B | `polynomial-operations` | 20 | 0 | 40 |
| Algebra | Polynomial identities and factoring | A-APR.C, A-SSE.A | missing | 0 | 0 | 40 |
| Algebra | Rational expressions | A-APR.D | `rational-radical-expressions` | 20 | 0 | 40 |
| Algebra | Radical and rational equations | A-REI.A.2 | `algebra-2` | 20 | 0 | 40 |
| Algebra | Systems including nonlinear equations | A-REI.C.7, A-REI.D.11 | `systems-of-equations` | 20 | 0 | 40 |
| Algebra | Geometric series | A-SSE.B.4 | missing | 0 | 0 | 40 |
| Functions | Quadratic functions | F-IF.C.7a, F-IF.C.8a | `quadratic-functions` | 20 | 0 | 40 |
| Functions | Transformations and inverse functions | F-BF.B | missing | 0 | 0 | 40 |
| Functions | Exponential and logarithmic functions | F-LE.A.4, F-IF.C.8b | `exponential-logarithmic` | 20 | 0 | 40 |
| Functions | Trigonometric functions and the unit circle | F-TF.A, F-TF.B | missing | 0 | 0 | 40 |
| Statistics and Probability | Normal distributions and inference | S-ID.A.4, S-IC.A, S-IC.B | missing | 0 | 0 | 40 |

### Math, grade 12: 6 of 10 skills exist, 120 of 400 questions published toward target, 0 reviewed

| Group | Skill | Standards | Exists today as | Published | Reviewed | Gap to 40 reviewed |
|---|---|---|---|---|---|---|
| Functions | Analyzing advanced functions | F-IF.A.2, F-IF.C.7 | `advanced-functions` | 20 | 0 | 40 |
| Functions | Polynomial and rational functions | F-IF.C.7d, A-APR.D.7 | `rational-functions` | 20 | 0 | 40 |
| Functions | Trigonometric identities and equations | F-TF.C | `trigonometric-functions` | 20 | 0 | 40 |
| Functions | Sequences and series | F-BF.A.2, F-IF.A.3 | `sequences-series` | 20 | 0 | 40 |
| Number and Quantity | Vectors | N-VM.A, N-VM.B | missing | 0 | 0 | 40 |
| Number and Quantity | Matrices | N-VM.C | missing | 0 | 0 | 40 |
| Geometry | Conic sections | G-GPE.A.2, G-GPE.A.3 | `conic-sections` | 20 | 0 | 40 |
| Geometry | Laws of sines and cosines | G-SRT.D | missing | 0 | 0 | 40 |
| Statistics and Probability | Combinatorics and probability | S-CP.B.9, S-MD.A | `combinatorics-probability` | 20 | 0 | 40 |
| Statistics and Probability | Using probability to make decisions | S-MD.B | missing | 0 | 0 | 40 |
