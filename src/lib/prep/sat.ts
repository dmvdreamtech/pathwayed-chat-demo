import type { PrepModule } from './types.js'

/**
 * SAT structure — the DIGITAL SAT (current College Board format, Bluebook).
 *
 * The digital SAT is section-adaptive with two sections, each delivered in two
 * equal-length, back-to-back modules:
 *   Reading and Writing — 2 modules × 27 questions × 32 min  (54 q, 64 min)
 *   Math                — 2 modules × 22 questions × 35 min  (44 q, 70 min)
 * Total 98 questions, 134 minutes, with a short break between the two sections
 * (after Reading and Writing, before Math). A handful of questions per section are
 * unscored pretest items indistinguishable to the test-taker; the counts here are
 * the totals a student actually sees per module, which is what we model.
 *
 * We model each module as its own timed section (the timed engine grades one
 * section at a time). We do NOT implement the between-module adaptivity (module 2's
 * difficulty keyed to module 1) — that is out of scope for the practice engine; each
 * module is an independent timed run drawn from the section's question types.
 *
 * questionTypes are the four official content domains per section, used by the prep
 * engine's stand-in mapping (PREP_SKILLS). SAT-specific R&W formats (transitions,
 * words-in-context) are authored prep skills; the rest lean on close existing banks.
 */
export const SAT: PrepModule = {
  id: 'sat',
  name: 'SAT',
  // Purchase eligibility gate: SAT is High-tier only (grades 9-12). planQualifiesForBand
  // uses band[0]=9, so a Middle-only plan (top grade 8) does NOT qualify — only a High plan.
  gradeBand: [9, 12],
  sections: [
    {
      id: 'reading-writing-1',
      name: 'Reading and Writing, Module 1',
      questionCount: 27,
      timeLimitSec: 1920,
      questionTypes: ['information_and_ideas', 'craft_and_structure', 'expression_of_ideas', 'standard_english_conventions'],
    },
    {
      id: 'reading-writing-2',
      name: 'Reading and Writing, Module 2',
      questionCount: 27,
      timeLimitSec: 1920,
      questionTypes: ['information_and_ideas', 'craft_and_structure', 'expression_of_ideas', 'standard_english_conventions'],
    },
    {
      id: 'math-1',
      name: 'Math, Module 1',
      questionCount: 22,
      timeLimitSec: 2100,
      questionTypes: ['sat_algebra', 'advanced_math', 'problem_solving_data_analysis', 'geometry_trigonometry'],
    },
    {
      id: 'math-2',
      name: 'Math, Module 2',
      questionCount: 22,
      timeLimitSec: 2100,
      questionTypes: ['sat_algebra', 'advanced_math', 'problem_solving_data_analysis', 'geometry_trigonometry'],
    },
  ],
  // Official digital-SAT order. A short break falls AFTER Reading and Writing (both
  // modules) and BEFORE Math — i.e. between reading-writing-2 and math-1.
  fullTestComposition: [
    'reading-writing-1',
    'reading-writing-2', // break after this section (end of Reading and Writing)
    'math-1',
    'math-2',
  ],
}
