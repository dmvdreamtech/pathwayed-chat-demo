// Approved per-subject scope & sequence (curriculum ordering signed off).
//
// For each grade band and subject, the ordered list of skill slugs a student
// progresses through. lessonPath walks this in order, skips mastered skills, and
// loops on the first unmastered one — mastery sets the pace, so a ready kid moves
// ahead and is never held to grade pace.
//
// Tracks are per-subject and independent. For bands 3-5/6-8/9-12 every slug is a
// real focus-area slug from focusAreas.ts (verified against it before wiring).
// The k-2 band uses the real published Kindergarten skill slugs from the DB
// (audio-picture pre-reader lessons); there is no writing track at K yet.
// Science has no track and falls back to the "skills building coming soon" →
// homework state.

export type ScopeBand = 'k-2' | '3-5' | '6-8' | '9-12'
export type ScopeSubject = 'math' | 'reading' | 'writing'

export const scopeSequence: Record<ScopeBand, Record<ScopeSubject, string[]>> = {
  'k-2': {
    // Kindergarten pre-reader tracks. Exact published DB slugs: counting (K.CC)
    // and letter-sounds (RF.K). Number sense before letter sounds.
    math: ['counting'],
    reading: ['letter-sounds'],
    writing: [],
  },
  '3-5': {
    // Grade-3 (seed 0004) then grade-4 (seed 0013) skills — every slug here is
    // question-backed by a seed in this repo, so the walk carries no cross-seed
    // dependency. (The gap-math grade-3/5 skills in seed 0009 stay placement-only
    // for now; wire them in once 0009 is confirmed applied — see OVERNIGHT-NOTES.)
    math: [
      'multiplication',
      'division',
      'fractions',
      'geometry',
      'multi-digit-multiplication',
      'multi-digit-division',
      'factors-multiples',
      'fraction-equivalence',
      'fraction-operations-4',
      'area-perimeter',
      'numerical-expressions',
      'multiply-divide-whole-5',
      'decimal-place-value',
      'decimal-operations',
      'add-subtract-fractions-unlike',
      'multiply-divide-fractions',
      'coordinate-plane',
    ],
    reading: ['vocabulary', 'main-idea', 'reading-comprehension', 'story-elements'],
    // Every slug has published questions (grade 4-5 conventions), except
    // paragraph-writing: the Nikki writing studio, coached with no question bank.
    // It goes last because it can never be marked known. Removed 2026-11-09
    // (no published questions, so the walk stalled on them): sentence-writing,
    // short-response, creative-writing.
    writing: [
      'punctuation-basics',
      'sentence-structure',
      'subject-verb-agreement',
      'verb-tense-and-form',
      'paragraph-writing',
    ],
  },
  '6-8': {
    // Grade-7 skills (rational-number-operations … probability-models) added with
    // a real 20-question bank (seed 0011) so placement AND this walk share one set.
    // Removed empty placeholders 'statistics', 'geometry', 'pre-algebra' (no question
    // bank; logged for the Phase-2 grade-6/8 build).
    math: [
      'ratios',
      'percentages',
      'expressions',
      'data-analysis',
      'integers-rational-numbers',
      'divide-fractions',
      'one-step-equations',
      'area-surface-volume-6',
      'proportional-reasoning',
      'rational-number-operations',
      'percent-applications',
      'two-step-equations',
      'angles-area-volume',
      'probability-models',
      'linear-thinking',
      'algebra-1-concepts',
      'functions',
      'exponents-scientific-notation',
      'pythagorean-theorem',
      'transformations-8',
    ],
    // Removed 2026-11-09, no skill row at all, so the walk stalled on them:
    // inference, text-analysis, author-purpose (reading); essay-writing,
    // research-skills, persuasive-writing, narrative-writing (writing). Add them
    // back as each gets a published set. Writing is the grade 6-7 conventions
    // skills that have one.
    reading: ['read-g6-vocabulary-in-context'],
    writing: ['pronoun-agreement', 'sentence-boundaries', 'modifier-placement'],
  },
  '9-12': {
    // Full HS band, grade-ordered, every slug question-backed (seeds 0011 + 0012):
    // grade 9 Algebra 1, grade 10 Geometry, grade 11 Algebra 2, grade 12 Precalc.
    // The backlogged placeholders are now real skills (algebra → the Algebra 1 set;
    // statistics-probability → data-statistics/combinatorics-probability;
    // geometry-proofs authored). Placement (grade-anchored) and this walk share one set.
    math: [
      'functions',
      'linear-equations',
      'linear-inequalities',
      'graphing-linear-functions',
      'systems-linear',
      'exponent-rules',
      'data-statistics',
      'hs-geometry',
      'geometry-proofs',
      'triangle-congruence',
      'similarity-right-triangles',
      'circle-geometry',
      'coordinate-geometry',
      'algebra-2',
      'polynomial-operations',
      'rational-radical-expressions',
      'quadratic-functions',
      'systems-of-equations',
      'exponential-logarithmic',
      'advanced-functions',
      'trigonometric-functions',
      'sequences-series',
      'rational-functions',
      'conic-sections',
      'combinatorics-probability',
    ],
    // Removed 2026-11-09, no skill row (the walk stalled on them): critical-analysis,
    // rhetorical-analysis, source-evaluation, literary-devices.
    reading: ['evidence-based-reading', 'read-g9-vocabulary-in-context'],
    writing: [
      // Standard-English-Conventions skills lead the HS writing track: these are
      // the only HS writing skills with a published question bank (20 each), so
      // they're what actually gets served — and it lets Practice-SAT conventions
      // misses surface here through the focus mechanism, mirroring how SAT math
      // misses surface under math.
      'advanced-punctuation',
      'possessives-and-apostrophes',
      'modifier-placement',
      'sentence-boundaries',
      // Removed 2026-11-09: writing-structure (0 published), thesis-development,
      // argumentative-essays, analytical-writing, research-papers (no skill row).
    ],
  },
}
