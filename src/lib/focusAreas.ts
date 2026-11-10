import type { GradeBand } from './types'

export const focusAreasByGrade: Record<GradeBand, {
  math: { value: string; label: string }[]
  reading: { value: string; label: string }[]
  writing: { value: string; label: string }[]
}> = {
  '3-5': {
    math: [
      // Grade-3 (seed 0004) + grade-4 (seed 0013); lockstep with scopeSequence['3-5'].
      { value: 'multiplication', label: 'Multiplication' },
      { value: 'division', label: 'Division' },
      { value: 'fractions', label: 'Fractions' },
      { value: 'geometry', label: 'Geometry' },
      { value: 'multi-digit-multiplication', label: 'Multi-Digit Multiplication' },
      { value: 'multi-digit-division', label: 'Multi-Digit Division' },
      { value: 'factors-multiples', label: 'Factors & Multiples' },
      { value: 'fraction-equivalence', label: 'Fraction Equivalence & Comparison' },
      { value: 'fraction-operations-4', label: 'Fraction Operations' },
      { value: 'area-perimeter', label: 'Area & Perimeter' },
      { value: 'numerical-expressions', label: 'Numerical Expressions' },
      { value: 'multiply-divide-whole-5', label: 'Multiply & Divide Whole Numbers' },
      { value: 'decimal-place-value', label: 'Decimal Place Value' },
      { value: 'decimal-operations', label: 'Decimal Operations' },
      { value: 'add-subtract-fractions-unlike', label: 'Add & Subtract Fractions' },
      { value: 'multiply-divide-fractions', label: 'Multiply & Divide Fractions' },
      { value: 'coordinate-plane', label: 'Coordinate Plane' },
    ],
    reading: [
      { value: 'main-idea', label: 'Main Idea' },
      { value: 'vocabulary', label: 'Vocabulary' },
      { value: 'reading-comprehension', label: 'Reading Comprehension' },
      { value: 'story-elements', label: 'Story Elements' },
    ],
    // Lockstep with scopeSequence['3-5'].writing. Paragraph Writing is the Nikki
    // writing studio (no question bank by design); the rest have published sets.
    writing: [
      { value: 'punctuation-basics', label: 'Commas & End Punctuation' },
      { value: 'sentence-structure', label: 'Sentence Structure' },
      { value: 'subject-verb-agreement', label: 'Subject-Verb Agreement' },
      { value: 'verb-tense-and-form', label: 'Verb Tense & Form' },
      { value: 'paragraph-writing', label: 'Paragraph Writing' },
    ],
  },
  '6-8': {
    math: [
      // Grade-7 skills (seed 0011) — real 20-question banks; placement + lesson
      // path share one set. Removed empty 'pre-algebra','geometry','statistics'.
      { value: 'ratios', label: 'Ratios & Proportions' },
      { value: 'percentages', label: 'Percentages' },
      { value: 'expressions', label: 'Expressions' },
      { value: 'data-analysis', label: 'Data Analysis' },
      { value: 'integers-rational-numbers', label: 'Integers & Rational Numbers' },
      { value: 'divide-fractions', label: 'Dividing Fractions' },
      { value: 'one-step-equations', label: 'One-Step Equations' },
      { value: 'area-surface-volume-6', label: 'Area, Surface Area & Volume' },
      { value: 'proportional-reasoning', label: 'Proportional Reasoning' },
      { value: 'rational-number-operations', label: 'Operations with Rational Numbers' },
      { value: 'percent-applications', label: 'Percent Applications' },
      { value: 'two-step-equations', label: 'Two-Step Equations & Inequalities' },
      { value: 'angles-area-volume', label: 'Angles, Area & Volume' },
      { value: 'probability-models', label: 'Probability' },
      { value: 'linear-thinking', label: 'Linear Thinking' },
      { value: 'algebra-1-concepts', label: 'Algebra 1 Concepts' },
      { value: 'functions', label: 'Functions' },
      { value: 'exponents-scientific-notation', label: 'Exponents & Scientific Notation' },
      { value: 'pythagorean-theorem', label: 'Pythagorean Theorem' },
      { value: 'transformations-8', label: 'Transformations' },
    ],
    // Only skills with a published set (2026-11-09). Inference, Text Analysis,
    // Author's Purpose and the essay, persuasive, research and narrative writing
    // entries had no skill row; add them back as each gets one.
    reading: [{ value: 'read-g6-vocabulary-in-context', label: 'Vocabulary in Context' }],
    writing: [
      { value: 'pronoun-agreement', label: 'Pronoun-Antecedent Agreement' },
      { value: 'sentence-boundaries', label: 'Sentence Boundaries' },
      { value: 'modifier-placement', label: 'Modifier Placement' },
    ],
  },
  '9-12': {
    math: [
      // Full HS band (seeds 0011 + 0012), grade-ordered; every slug question-backed.
      // In lockstep with scopeSequence['9-12'].math — placement + lesson path, one set.
      { value: 'functions', label: 'Functions' },
      { value: 'linear-equations', label: 'Linear Equations' },
      { value: 'linear-inequalities', label: 'Linear Inequalities' },
      { value: 'graphing-linear-functions', label: 'Graphing Linear Functions' },
      { value: 'systems-linear', label: 'Systems of Linear Equations' },
      { value: 'exponent-rules', label: 'Exponent Rules' },
      { value: 'data-statistics', label: 'Data & Statistics' },
      { value: 'hs-geometry', label: 'Geometry (HS)' },
      { value: 'geometry-proofs', label: 'Geometry Proofs' },
      { value: 'triangle-congruence', label: 'Triangle Congruence' },
      { value: 'similarity-right-triangles', label: 'Similarity & Right Triangles' },
      { value: 'circle-geometry', label: 'Circle Geometry' },
      { value: 'coordinate-geometry', label: 'Coordinate Geometry' },
      { value: 'algebra-2', label: 'Algebra 2' },
      { value: 'polynomial-operations', label: 'Polynomial Operations' },
      { value: 'rational-radical-expressions', label: 'Rational & Radical Expressions' },
      { value: 'quadratic-functions', label: 'Quadratic Functions' },
      { value: 'systems-of-equations', label: 'Systems of Equations' },
      { value: 'exponential-logarithmic', label: 'Exponential & Logarithmic' },
      { value: 'advanced-functions', label: 'Advanced Functions' },
      { value: 'trigonometric-functions', label: 'Trigonometric Functions' },
      { value: 'sequences-series', label: 'Sequences & Series' },
      { value: 'rational-functions', label: 'Rational Functions' },
      { value: 'conic-sections', label: 'Conic Sections' },
      { value: 'combinatorics-probability', label: 'Combinatorics & Probability' },
    ],
    // Only skills with a published set (2026-11-09). Critical Analysis, Rhetorical
    // Analysis, Literary Devices, Source Evaluation and the essay and research
    // writing entries had no skill row; Writing Structure had no published questions.
    reading: [
      // SAT 6-12 ladder (seed 0002)
      { value: 'evidence-based-reading', label: 'Evidence-Based Reading' },
      { value: 'read-g9-vocabulary-in-context', label: 'Vocabulary in Context' },
    ],
    writing: [
      // Standard-English-Conventions (seed 0005/0007) — the served HS writing bank
      { value: 'advanced-punctuation', label: 'Advanced Punctuation' },
      { value: 'possessives-and-apostrophes', label: 'Possessives & Apostrophes' },
      { value: 'modifier-placement', label: 'Modifier Placement' },
      { value: 'sentence-boundaries', label: 'Sentence Boundaries' },
    ],
  },
}
