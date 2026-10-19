# Live content checks

Measured 2026-10-17 against the live database (papiowjjoyhnbyhgtbxq), read only.
Nothing was unpublished or edited. Fixes are drafts waiting for review.

## What was checked

Every **published** question was run through the same checks that `/admin/coverage`
uses (`public.question_issues`). Live has 0040 as first applied; migration **0044**
replaces the checks so they accept formats that live questions use on purpose:

- K-2 picture-tap items (`render_mode = audio_picture`) may have 2 to 4 tile choices,
  a spoken instruction for a stem, and no named mistake on wrong tiles. By design a
  wrong tap gets warm spoken feedback, not a hint (`src/lib/preReaderTemplates.ts`).
- Stems may end in an instruction ("Tap the picture.", "Solve: ...", "Find $x$."),
  or in a fill-in blank (`___`).
- In math and test-prep math (prep-quant, prep-sat-math), a spaced hyphen between
  numbers or letters is a minus sign, not a dash.
- An item flagged `teaches_punctuation` (it teaches dashes) skips the no-dash check.
  0044 sets the flag on the 6 live dash-teaching items.

The following still fail: em dashes, en dashes, double hyphens, lead-in stems that
stop with no closing punctuation, and, on text items, wrong choices with no
misconception tag. The authoring checker (`content/checks.ts`) stays stricter than
this for new drafts.

## Results (measured 2026-10-17, counted under 0044)

2,850 questions are published. Under the first 0040 checks 446 failed. Under 0044,
**130 fail**: the 310 picture items that failed only for missing mistake tags pass by
design, and the 6 dash-teaching items pass on their flag.

Why the 130 fail (one question can fail more than one check):

| Check       | Questions | What it means |
|-------------|----------:|---------------|
| no_dashes   | 77        | An em dash or en dash in a stem, choice or solution. 6 of these are K-2 picture items, with the dash in the spoken stem or solution. |
| stem_ends   | 55        | A lead-in such as "As used in the passage, 'keen' most nearly means" with nothing after it (math 34, reading 21). |

No live question failed on: four choices, exactly one correct choice, the answer
matching a choice, having a solution, or distinct choices.

## Fixes (drafts, not live)

- `seeds/live-fixes/01_live_fixes.sql`: **130 drafts**, one for every failing item.
  Each one copies its original (skill, passage, render mode, prompt, picture tiles)
  and changes only what the check needed:
  - 77 had the dash rewritten as a comma, colon, parentheses, or a math expression
    in `$...$`. For the 6 picture items only the spoken stem or solution changed:
    their tiles and labels are identical and they gain no mistake tags.
  - 55 had a colon or question mark added to the lead-in.
- An earlier version also drafted mistake tags for 310 K-2 picture items. Those were
  dropped: they would have shown K-2 children mistake hints, against the design.
- Each draft is linked to its original in `question_fix_drafts` (migration 0042) with
  the reasons. The original stays published until a reviewer approves the fix.
- On the replica, with 0040 to 0044 applied, all 130 drafts pass `question_issues`,
  every draft matches its original's skill, render mode and prompt, and no published
  row changed.
- While a fix waits for review, `/admin/coverage` leaves it out of the counts (0042),
  so a skill's totals do not double.

### Kept as is (6)

These questions teach how to use a dash, so they keep it. 0044 marks each one
`teaches_punctuation`, item by item (their skills also teach commas and end marks,
so the exemption is not skill-wide):

- advanced-punctuation: 2a343190, 9f79c586, a3ac0b54, a13ea13e, 20017b4e
- punctuation-basics: bb32f457

### Worth a look in review


- Solutions with dollar amounts (e.g. "$50 - $10") were reworded ("$50 minus $10"),
  because `$` there is money, not math.
- A few stems in the 30-60-90 and 45-45-90 triangle items were reworded to "a
  triangle with angles $30^\circ$, $60^\circ$, and $90^\circ$".
