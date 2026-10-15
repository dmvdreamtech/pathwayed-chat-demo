# Review notes for the coverage drafts

Things a reviewer should check before publishing, beyond reading each item.
Every item already passes the automated checks; these are the parts a check
cannot judge.

## Facts to verify against a source

- `read-g7-comparing-texts`: the factual Text 2 in each passage uses general
  historical facts (dates, the length of the Pony Express route and the Erie
  Canal, about 600 million viewers of the 1969 Moon landing, Dust Bowl and
  Silk Road details). Written from general knowledge; confirm each figure.
- Any nonfiction passage with a date, a number or a scientific claim should be
  spot-checked. Items are answerable from the passage alone, but the passage
  itself must be accurate.

## Items the authors flagged as weaker

- `write-g8-grammar-usage` slot 4: two wrong choices name moods, not voices.
  Clearly wrong, but less tempting than they could be.
- `write-g8-argument-writing` slot 3: the answer "In addition," begins a
  sentence that already says "also". Correct, but reads slightly doubled.

- `write-g7-precise-language` slots 12 and 36 (and the grade 8 model it
  followed): the right answer replaces vague wording with an invented specific
  ("won the race by half a second", "in record time"). Each wrong choice has a
  clear flaw, but a reviewer may prefer answers that sharpen wording without
  adding facts.

- `read-g12-text-structure` slot 14: the answer relies on a point paragraph 3
  implies but does not state (an angle error carries along the chain of
  triangles). Slot 24: the correct choice is a little longer than the others.
- `read-g5-main-idea-summary` and `read-g9-connections`: difficulty mix came
  out 11/18/11 and 11/19/10 instead of 12/18/10.
- Grade 10 reading passages that portray a specific culture
  (`read-g10-literary-structure-pov` p04 and p07): worth a sensitivity read.

## Math

- Every math item writes expressions as `$...$` (rendered by MathText). The
  dash rule skips those spans for math skills only, in `content/checks.ts`
  and in 0040's `question_issues`.
- Each math skill is checked twice before commit: the author recomputes every
  answer with a script, then a second, independent agent re-solves all 40 and
  fixes anything wrong. So far the second pass found two ambiguous rounding
  stems (`math-g9-structure-of-expressions-and-factoring` slots 34 and 38),
  now fixed by asking for the nearest hundredth of a percent.
- `math-g9-rational-exponents-and-radicals` slots 9 and 39 take odd roots of a
  negative base, e.g. $(-32)^{3/5} = -8$, the usual grade 9 convention.

- More fixes from the independent math check, all applied before commit:
  - `math-g10-constructions` slot 39 described a step that cannot be done.
  - `math-g11-normal-distributions-and-inference` slot 23 had two defensible
    answers.
  - `math-g10-similarity` slots 29 and 31 had misconception tags that named
    the wrong mistake.

## Top-ups of live skills

Six live writing skills had 20 questions each. A file with
`extends: '<live slug>'` adds 20 original drafts to that skill; its seed never
touches the skill row. Each top-up's author read the existing 20 first and
covered what they left thin:

- `punctuation-basics`
- `possessives-and-apostrophes`
- `sentence-structure`
- `pronoun-agreement`
- `sentence-boundaries`
- `modifier-placement`

Note for review: in `write-g7-modifier-placement-more`, slot 15's wrong choice
("The history quiz felt easy to Dev after studying all weekend") is accepted by
some readers. It still dangles, because the quiz stays the subject.

## Publishing passage-based questions

A question with a passage needs its passage published too; both load as draft.
