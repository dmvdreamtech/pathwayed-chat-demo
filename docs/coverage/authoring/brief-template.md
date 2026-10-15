You are writing ONE skill of original practice questions for PathwayEd, a K-12 tutoring app. Repo: C:\Users\rphil\pathwayed-chat-demo (branch coverage-content). Work only in that repo.

YOUR SKILL
{SKILL}

WHAT TO WRITE
Create exactly one file: {FILE}
Format (TypeScript, read content/types.ts first for the exact types):

    import type { ContentSkill } from '../../types'

    const skill: ContentSkill = {
      slug: '{SLUG}',
      subject: '{SUBJECT}',
      grade: {GRADE},
      group: '{GROUP}',
      name: '{NAME_TITLE}',
      standards: {STANDARDS},
      passages: [ ... ]   // and/or
      items: [ ... ]
    }

    export default skill

Each item: { slot, difficulty, stem, choices: [4 choices, exactly one { is_correct: true }, three wrong ones each with misconception_token], solution }.

HOW MANY AND WHAT SHAPE
{SHAPE}
Exactly 40 items in total, slots 1 to 40, each slot used once. Difficulty mix: about 12 easy, 18 medium, 10 hard.
Every question must test THIS skill ({STANDARDS_TEXT}) at grade {GRADE_TEXT} level, not a neighbouring skill.

RULES (all enforced or reviewed)
1. Everything is ORIGINAL. Write your own passages and questions. Do not copy, adapt or paraphrase any published text, test item, book, poem, song or article. No quotations from real people. No brand names. Fictional names only, from a wide range of backgrounds.
2. Grade level: vocabulary, sentence length and topics a typical grade {GRADE_TEXT} student meets in class. School-appropriate, no violence, romance, politics, religion or scary content. Topics varied: science, history, community, nature, sports, arts, technology, everyday life.
3. NO DASHES anywhere: no em dash, no en dash, no spaced hyphen, no double hyphen. Use commas, colons, parentheses or separate sentences. Ordinary hyphenated words (well-known, ninth-grade) are fine.
4. Stems end with a question mark or a colon.
5. Four choices, all clearly different, one clearly correct and defensible from the text; wrong choices plausible but clearly wrong for a stated reason. Similar lengths so the answer is not given away by length. Never "all of the above" or "none of the above".
6. misconception_token on every wrong choice: short kebab-case name of the mistake, e.g. too-narrow, unsupported-inference, confuses-cause-effect, wrong-tense, comma-splice-unfixed, literal-reading.
7. solution: one or two sentences saying why the answer is right and why the most tempting wrong answer is not. Point to the text when there is one.
8. Passages (if used): {PASSAGE_LIMITS}. Paragraphs separated by a blank line (\n\n in the string). Give each passage a short title and a unique code like '{CODE_PREFIX}-p01', '{CODE_PREFIX}-p02'.
9. Use plain ASCII quotes and apostrophes inside strings; escape as needed for TypeScript.

CHECK YOUR WORK
From C:\Users\rphil\pathwayed-chat-demo run:
    bun run scripts/check-content.ts {FILE}
Fix every problem it lists and run it again until it prints "ok". Then re-read your items once for accuracy: exactly one defensible answer each, no answer that depends on outside knowledge, no typos.

DO NOT run git, do not edit any other file, do not run SQL, do not start a server.

When done, reply with: the file path, the item count and passage count from the check output, and one sentence on the topics you used.
