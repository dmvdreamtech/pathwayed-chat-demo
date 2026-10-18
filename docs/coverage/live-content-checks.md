# Live content checks

Measured 2026-10-17 against the live database (papiowjjoyhnbyhgtbxq), read only.
Nothing was unpublished or edited. Fixes are drafts waiting for review.

## What was checked

Every **published** question was run through the same checks that `/admin/coverage`
uses (`public.question_issues` in migration 0040). Before the run, 0040 was adjusted
so it accepts formats that live questions use on purpose:

- K-2 picture-tap items (`render_mode = audio_picture`) may have 2 to 4 choices.
- Stems may end in an instruction ("Tap the picture.", "Solve: ...", "Find $x$."),
  or in a fill-in blank (`___`).
- In math, a spaced hyphen between numbers or parentheses is a minus sign, not a dash.

The following still fail: em dashes, en dashes, double hyphens, lead-in stems that
stop with no closing punctuation, and wrong choices with no misconception tag.
The authoring checker (`content/checks.ts`) stays stricter than this for new drafts.

## Results

2,850 questions are published. 2,404 pass. 446 fail.

| Subject     | Published | Failing |
|-------------|----------:|--------:|
| math        | 1,662     | 272     |
| reading     | 206       | 152     |
| writing     | 180       | 13      |
| prep-verbal | 538       | 7       |
| prep-quant  | 168       | 1       |
| prep-sat-rw | 96        | 1       |

Why they fail (one question can fail more than one check):

| Check                      | Questions | What it means |
|----------------------------|----------:|---------------|
| distractor_misconceptions  | 316       | Wrong choices with no tag naming the mistake. All 316 are K-2 picture-tap items (math 210, reading 106). |
| no_dashes                  | 83        | An em dash or en dash in a stem, choice or solution (reading 32, math 29, writing 13, prep-verbal 7, prep-quant 1, prep-sat-rw 1). |
| stem_ends                  | 55        | A lead-in such as "As used in the passage, 'keen' most nearly means" with nothing after it (math 34, reading 21). |

No live question failed on: four choices, exactly one correct choice, the answer
matching a choice, having a solution, or distinct choices.

## Fixes (drafts, not live)

- `seeds/live-fixes/01_live_fixes.sql`, `02_live_fixes.sql`: **440 drafts**.
  Each one copies its original (skill, passage, render mode, prompt, picture tiles)
  and changes only what the check needed:
  - 316 got misconception tags. Their text is identical to the original.
  - 77 had the dash rewritten as a comma, colon, parentheses, or a math expression in `$...$`.
  - 55 had a colon or question mark added to the lead-in.
- Each draft is linked to its original in `question_fix_drafts` (migration 0042) with
  the reasons. The original stays published until a reviewer approves the fix.
- On the replica, all 440 drafts pass `question_issues`, every draft matches its
  original's skill, render mode and prompt, and no published row changed.
- While a fix waits for review, `/admin/coverage` leaves it out of the counts (0042),
  so a skill's totals do not double.

### Held for a person (6)

These questions teach how to use a dash, so removing the dash would change what
they test. They were not rewritten:

- advanced-punctuation: 2a343190, 9f79c586, a3ac0b54, a13ea13e, 20017b4e
- punctuation-basics: bb32f457

The options are to accept them as is (an exception to the no-dash rule) or to
rewrite them around a different mark.

### Worth a look in review

- Solutions with dollar amounts (e.g. "$50 - $10") were reworded ("$50 minus $10"),
  because `$` there is money, not math.
- A few stems in the 30-60-90 and 45-45-90 triangle items were reworded to "a
  triangle with angles $30^\circ$, $60^\circ$, and $90^\circ$".
