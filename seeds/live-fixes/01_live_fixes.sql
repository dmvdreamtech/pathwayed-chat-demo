-- ===========================================================================
-- seeds/live-fixes/01_live_fixes.sql  (part 1 of 1; generated, do not edit)
--
-- Corrected DRAFT copies of published questions that fail the content checks.
-- Each draft copies its original (skill, passage, render mode, prompt, tiles)
-- with only the fixed text or the missing misconception tags changed, and is
-- linked to it in question_fix_drafts. The originals stay published and are
-- not touched. A reviewer approves each fix later.
--
-- Run AFTER migration 0042. Safe to re-run: a draft someone already reviewed
-- is never overwritten, and an original that is no longer published is skipped.
-- ===========================================================================

begin;

do $guard$
begin
  if to_regclass('public.question_fix_drafts') is null then
    raise exception 'Run migration 0042_question_fix_drafts.sql before this file.';
  end if;
end
$guard$;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9546c941-ed00-57e0-8081-67e133974051', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A circle has circumference 31.4 (use $\pi \approx 3.14$). What is its radius?$q$, $q$[{"text": "10", "is_correct": false, "misconception_token": "found-diameter"}, {"text": "15.7", "is_correct": false, "misconception_token": "divided-by-pi-only"}, {"text": "5", "is_correct": true}, {"text": "9.87", "is_correct": false, "misconception_token": "used-area-relationship"}]$q$::jsonb, $q$5$q$, $q$C = 2πr, so r = 31.4 ÷ (2 × 3.14) = 31.4 ÷ 6.28 = 5.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '08225b08-f811-53a2-842c-f7df3fb434ea' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9546c941-ed00-57e0-8081-67e133974051', '08225b08-f811-53a2-842c-f7df3fb434ea', array['stem_ends']::text[], $q$Moved the pi note before the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '9546c941-ed00-57e0-8081-67e133974051')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'bd40baa3-3c22-50a1-89a4-830bf12ea76c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A semicircle has radius 4 (use $\pi \approx 3.14$). What is its area?$q$, $q$[{"text": "25.12", "is_correct": true}, {"text": "50.24", "is_correct": false, "misconception_token": "forgot-to-halve"}, {"text": "100.48", "is_correct": false, "misconception_token": "used-diameter-as-radius"}, {"text": "12.56", "is_correct": false, "misconception_token": "found-half-circumference"}]$q$::jsonb, $q$25.12$q$, $q$Full circle = 3.14 × 16 = 50.24; a semicircle is half: 25.12.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '10032f17-f8fb-581f-a11e-9addbad88734' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'bd40baa3-3c22-50a1-89a4-830bf12ea76c', '10032f17-f8fb-581f-a11e-9addbad88734', array['stem_ends']::text[], $q$Moved the pi note before the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = 'bd40baa3-3c22-50a1-89a4-830bf12ea76c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '60fa419a-3e68-5b97-a779-d69246ff6d54', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A circle has diameter 10 (use $\pi \approx 3.14$). What is its area?$q$, $q$[{"text": "78.5", "is_correct": true}, {"text": "314", "is_correct": false, "misconception_token": "used-diameter-as-radius"}, {"text": "157", "is_correct": false, "misconception_token": "forgot-to-square-took-double"}, {"text": "31.4", "is_correct": false, "misconception_token": "found-circumference"}]$q$::jsonb, $q$78.5$q$, $q$Radius = 5, so A = πr² = 3.14 × 25 = 78.5.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '17d34c17-05c6-5a5b-948a-0685eb318361' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '60fa419a-3e68-5b97-a779-d69246ff6d54', '17d34c17-05c6-5a5b-948a-0685eb318361', array['stem_ends']::text[], $q$Moved the pi note before the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '60fa419a-3e68-5b97-a779-d69246ff6d54')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '00ed8ed9-fe97-509c-a71b-f0ba438e2b87', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A circle has radius 6 (use $\pi \approx 3.14$). What is its area?$q$, $q$[{"text": "226.08", "is_correct": false, "misconception_token": "used-diameter-as-radius"}, {"text": "37.68", "is_correct": false, "misconception_token": "found-circumference"}, {"text": "113.04", "is_correct": true}, {"text": "18.84", "is_correct": false, "misconception_token": "forgot-to-square"}]$q$::jsonb, $q$113.04$q$, $q$A = πr² = 3.14 × 36 = 113.04.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '22cd76e9-8ec7-5db3-86fa-2a867c1f2310' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '00ed8ed9-fe97-509c-a71b-f0ba438e2b87', '22cd76e9-8ec7-5db3-86fa-2a867c1f2310', array['stem_ends']::text[], $q$Moved the pi note before the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '00ed8ed9-fe97-509c-a71b-f0ba438e2b87')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f108b099-753d-5c5b-a9b1-9b09e865904c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A circle has radius 5 (use $\pi \approx 3.14$). What is its circumference?$q$, $q$[{"text": "10", "is_correct": false, "misconception_token": "forgot-pi"}, {"text": "31.4", "is_correct": true}, {"text": "15.7", "is_correct": false, "misconception_token": "used-radius-not-diameter"}, {"text": "78.5", "is_correct": false, "misconception_token": "used-area-formula"}]$q$::jsonb, $q$31.4$q$, $q$C = 2πr = 2 × 3.14 × 5 = 31.4.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '49f048e0-72a0-599e-a021-d049e175b439' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f108b099-753d-5c5b-a9b1-9b09e865904c', '49f048e0-72a0-599e-a021-d049e175b439', array['stem_ends']::text[], $q$Moved the pi note before the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = 'f108b099-753d-5c5b-a9b1-9b09e865904c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3ee5ed9e-be9e-51a8-9d4a-696f7c85befb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A circle has radius 7 (use $\pi \approx 3.14$). What is its circumference?$q$, $q$[{"text": "21.98", "is_correct": false, "misconception_token": "used-radius-not-diameter"}, {"text": "153.86", "is_correct": false, "misconception_token": "used-area-formula"}, {"text": "43.96", "is_correct": true}, {"text": "14", "is_correct": false, "misconception_token": "forgot-pi"}]$q$::jsonb, $q$43.96$q$, $q$C = 2πr = 2 × 3.14 × 7 = 43.96.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '6f8480c4-f3e0-54ca-b482-f745be9b3ead' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3ee5ed9e-be9e-51a8-9d4a-696f7c85befb', '6f8480c4-f3e0-54ca-b482-f745be9b3ead', array['stem_ends']::text[], $q$Moved the pi note before the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '3ee5ed9e-be9e-51a8-9d4a-696f7c85befb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3776cd56-0d50-5ff3-938c-b5ed80b6b3ff', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A circle has radius 3 (use $\pi \approx 3.14$). What is its area?$q$, $q$[{"text": "28.26", "is_correct": true}, {"text": "9.42", "is_correct": false, "misconception_token": "forgot-to-square"}, {"text": "18.84", "is_correct": false, "misconception_token": "used-circumference-formula"}, {"text": "9", "is_correct": false, "misconception_token": "forgot-pi"}]$q$::jsonb, $q$28.26$q$, $q$A = πr² = 3.14 × 3² = 3.14 × 9 = 28.26.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '9c887cc7-724f-588c-ac5c-98e463282268' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3776cd56-0d50-5ff3-938c-b5ed80b6b3ff', '9c887cc7-724f-588c-ac5c-98e463282268', array['stem_ends']::text[], $q$Moved the pi note before the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '3776cd56-0d50-5ff3-938c-b5ed80b6b3ff')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd5e265b8-8032-5ae9-8869-3120829fa3eb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Three angles lie on a straight line: $40^\circ$, $x$, and $90^\circ$. What is $x$?$q$, $q$[{"text": "$230^\\circ$", "is_correct": false, "misconception_token": "added-instead-of-subtracting"}, {"text": "$130^\\circ$", "is_correct": false, "misconception_token": "used-90-total"}, {"text": "$40^\\circ$", "is_correct": false, "misconception_token": "guessed-equal"}, {"text": "$50^\\circ$", "is_correct": true}]$q$::jsonb, $q$$50^\circ$$q$, $q$Angles on a line add to 180°: 180 - 40 - 90 = 50°.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a9db9112-731e-5524-b609-bede4c5211ae' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd5e265b8-8032-5ae9-8869-3120829fa3eb', 'a9db9112-731e-5524-b609-bede4c5211ae', array['stem_ends']::text[], $q$Turned "Find $x$." into the question "What is $x$?".$q$
 where exists (select 1 from public.generated_questions where id = 'd5e265b8-8032-5ae9-8869-3120829fa3eb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5d1d5092-3fd5-5ee5-a7d2-3af4d22cf611', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 3.$q$, $q$[{"text": "2", "tile": {"kind": "object_group", "count": 2, "image": "star"}, "is_correct": false}, {"text": "3", "tile": {"kind": "object_group", "count": 3, "image": "star"}, "is_correct": true}, {"text": "4", "tile": {"kind": "object_group", "count": 4, "image": "star"}, "is_correct": false}]$q$::jsonb, $q$3$q$, $q$Let's count each group. One, two, three. This group shows 3!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ed91c523-8921-5cbe-8f18-417e2049de9c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5d1d5092-3fd5-5ee5-a7d2-3af4d22cf611', 'ed91c523-8921-5cbe-8f18-417e2049de9c', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = '5d1d5092-3fd5-5ee5-a7d2-3af4d22cf611')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f8b99d52-2235-5062-a6d7-92c71b7c5c24', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A rectangle is split into 4 parts that are NOT the same size. Can one part be called 1/4?$q$, $q$[{"text": "Yes, each part is 1/2", "is_correct": false, "misconception_token": "part-size-too-big"}, {"text": "Yes, any 4 parts make fourths", "is_correct": false, "misconception_token": "wrong-attribute"}, {"text": "No, the parts must be equal to be fourths", "is_correct": true}, {"text": "No, it must be split into halves", "is_correct": false, "misconception_token": "miscounted-sides"}]$q$::jsonb, $q$No, the parts must be equal to be fourths$q$, $q$A fraction like 1/4 means one of 4 EQUAL parts. Unequal parts cannot be called fourths.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'df15c51f-2827-564c-801b-c9390146d12c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f8b99d52-2235-5062-a6d7-92c71b7c5c24', 'df15c51f-2827-564c-801b-c9390146d12c', array['no_dashes']::text[], $q$Replaced the em dashes in three choices with commas and updated correct_answer to match.$q$
 where exists (select 1 from public.generated_questions where id = 'f8b99d52-2235-5062-a6d7-92c71b7c5c24')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b6e93fe2-762a-58f9-a26a-a4df62a346a1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A data center stores 74,000,000,000 bytes of information. How is this number written in scientific notation?$q$, $q$[{"text": "$7.4 \\times 10^9$", "is_correct": false, "misconception_token": "miscounted-places"}, {"text": "$7.4 \\times 10^{10}$", "is_correct": true}, {"text": "$7.4 \\times 10^{11}$", "is_correct": false, "misconception_token": "overcounted-places"}, {"text": "$74 \\times 10^9$", "is_correct": false, "misconception_token": "coefficient-not-between-one-and-ten"}]$q$::jsonb, $q$$7.4 \times 10^{10}$$q$, $q$Move the decimal 10 places: $74000000000 = 7.4 \times 10^{10}$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '2b59e350-acfe-5dac-bfca-7937f1c0f4f8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b6e93fe2-762a-58f9-a26a-a4df62a346a1', '2b59e350-acfe-5dac-bfca-7937f1c0f4f8', array['stem_ends']::text[], $q$Turned the instruction into a question.$q$
 where exists (select 1 from public.generated_questions where id = 'b6e93fe2-762a-58f9-a26a-a4df62a346a1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '6700de32-5373-5f10-b7a9-920b653ca2a6', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A virus particle measures about 0.00000012 meters across. How is this number written in scientific notation?$q$, $q$[{"text": "$12 \\times 10^{-8}$", "is_correct": false, "misconception_token": "coefficient-not-between-one-and-ten"}, {"text": "$1.2 \\times 10^{7}$", "is_correct": false, "misconception_token": "wrong-sign-exponent"}, {"text": "$1.2 \\times 10^{-7}$", "is_correct": true}, {"text": "$1.2 \\times 10^{-6}$", "is_correct": false, "misconception_token": "miscounted-places"}]$q$::jsonb, $q$$1.2 \times 10^{-7}$$q$, $q$Move the decimal 7 places to the right: $0.00000012 = 1.2 \times 10^{-7}$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '40bd74f2-0c8c-5609-b52c-53116a25851d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '6700de32-5373-5f10-b7a9-920b653ca2a6', '40bd74f2-0c8c-5609-b52c-53116a25851d', array['stem_ends']::text[], $q$Turned the instruction into a question.$q$
 where exists (select 1 from public.generated_questions where id = '6700de32-5373-5f10-b7a9-920b653ca2a6')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '96f6ef27-cbed-57ff-85f7-8168e12822e7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is the missing numerator in $\frac{?}{9} = \frac{20}{45}$?$q$, $q$[{"text": "5", "is_correct": false, "misconception_token": "used-scale-factor-as-answer"}, {"text": "20", "is_correct": false, "misconception_token": "kept-original-numerator"}, {"text": "4", "is_correct": true}, {"text": "11", "is_correct": false, "misconception_token": "subtracted-denominator"}]$q$::jsonb, $q$4$q$, $q$Since $45 \div 9 = 5$, divide the numerator by 5: $20 \div 5 = 4$, so $\frac{4}{9} = \frac{20}{45}$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '17975710-6ed8-5a49-87e1-f5ef0b1c36c6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '96f6ef27-cbed-57ff-85f7-8168e12822e7', '17975710-6ed8-5a49-87e1-f5ef0b1c36c6', array['stem_ends']::text[], $q$Turned the instruction into a question.$q$
 where exists (select 1 from public.generated_questions where id = '96f6ef27-cbed-57ff-85f7-8168e12822e7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5780536c-a1fd-5156-88ed-ac76f7076dd5', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is the missing numerator in $\frac{1}{3} = \frac{?}{6}$?$q$, $q$[{"text": "2", "is_correct": true}, {"text": "1", "is_correct": false, "misconception_token": "kept-numerator-unchanged"}, {"text": "3", "is_correct": false, "misconception_token": "used-half-of-denominator"}, {"text": "4", "is_correct": false, "misconception_token": "added-denominator-difference"}]$q$::jsonb, $q$2$q$, $q$The denominator was multiplied by 2 to get from 3 to 6, so the numerator is $1 \times 2 = 2$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '28df7d9c-d474-59b9-82d2-c86d10cf4c82' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5780536c-a1fd-5156-88ed-ac76f7076dd5', '28df7d9c-d474-59b9-82d2-c86d10cf4c82', array['stem_ends']::text[], $q$Turned the instruction into a question.$q$
 where exists (select 1 from public.generated_questions where id = '5780536c-a1fd-5156-88ed-ac76f7076dd5')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c6f40549-c0e6-5ec2-80d3-d0862a6885f7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is the missing denominator in $\frac{3}{5} = \frac{12}{?}$?$q$, $q$[{"text": "8", "is_correct": false, "misconception_token": "added-numerator-to-denominator"}, {"text": "14", "is_correct": false, "misconception_token": "added-numerator-difference"}, {"text": "20", "is_correct": true}, {"text": "60", "is_correct": false, "misconception_token": "multiplied-denominator-by-numerator"}]$q$::jsonb, $q$20$q$, $q$The numerator was multiplied by 4 to get from 3 to 12, so the denominator is $5 \times 4 = 20$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7c0fe599-6348-58d3-b027-49313b48466a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c6f40549-c0e6-5ec2-80d3-d0862a6885f7', '7c0fe599-6348-58d3-b027-49313b48466a', array['stem_ends']::text[], $q$Turned the instruction into a question.$q$
 where exists (select 1 from public.generated_questions where id = 'c6f40549-c0e6-5ec2-80d3-d0862a6885f7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5bcaac84-7f42-51f1-960d-5616432207c5', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is the missing numerator in $\frac{2}{5} = \frac{?}{15}$?$q$, $q$[{"text": "2", "is_correct": false, "misconception_token": "kept-numerator-unchanged"}, {"text": "3", "is_correct": false, "misconception_token": "used-multiplier-as-numerator"}, {"text": "12", "is_correct": false, "misconception_token": "added-denominator-difference"}, {"text": "6", "is_correct": true}]$q$::jsonb, $q$6$q$, $q$The denominator was multiplied by 3 to get from 5 to 15, so the numerator is $2 \times 3 = 6$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd9c50f33-0e24-5409-915c-ff7c3c9b2bdc' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5bcaac84-7f42-51f1-960d-5616432207c5', 'd9c50f33-0e24-5409-915c-ff7c3c9b2bdc', array['stem_ends']::text[], $q$Turned the instruction into a question.$q$
 where exists (select 1 from public.generated_questions where id = '5bcaac84-7f42-51f1-960d-5616432207c5')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c106f0bf-c176-56ef-a42b-6f7624ed91a9', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$The length of a garden is 48 feet, which is one-third longer than its width. What is the width, in feet?$q$, $q$[{"text": "36", "is_correct": true}, {"text": "32", "is_correct": false, "misconception_token": "subtracted-fraction-of-total"}, {"text": "64", "is_correct": false, "misconception_token": "multiplied-instead-of-divided"}, {"text": "16", "is_correct": false, "misconception_token": "took-fraction-of-total"}]$q$::jsonb, $q$36$q$, $q$Let width be $w$. One-third longer means $w + \frac{1}{3}w = 48$, so $\frac{4}{3}w = 48$ and $w = 48 \times \frac{3}{4} = 36$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'bb4752a5-5461-536a-8278-db1512892da5' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c106f0bf-c176-56ef-a42b-6f7624ed91a9', 'bb4752a5-5461-536a-8278-db1512892da5', array['stem_ends']::text[], $q$Turned the instruction into a question.$q$
 where exists (select 1 from public.generated_questions where id = 'c106f0bf-c176-56ef-a42b-6f7624ed91a9')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '74becec5-faa9-581e-9d1c-2aae08b40c29', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A bottle holds 2 liters of water (1 liter = 1,000 milliliters). How many milliliters is that?$q$, $q$[{"text": "200", "is_correct": false, "misconception_token": "place-value-off-by-one"}, {"text": "2,000", "is_correct": true}, {"text": "4,000", "is_correct": false, "misconception_token": "wrong-scale"}, {"text": "2", "is_correct": false, "misconception_token": "wrong-measure-unit"}]$q$::jsonb, $q$2,000$q$, $q$2 liters times 1,000 = 2,000 milliliters. 200 is ten times too small, and 2 forgets to convert.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7d6c9acb-74d3-588c-b8f3-a77ccbe2c106' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '74becec5-faa9-581e-9d1c-2aae08b40c29', '7d6c9acb-74d3-588c-b8f3-a77ccbe2c106', array['stem_ends']::text[], $q$Moved the conversion note before the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '74becec5-faa9-581e-9d1c-2aae08b40c29')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'eb04041f-4a82-5df8-b8fe-264b17b1343f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What are the quotient and remainder for $623 \div 3$?$q$, $q$[{"text": "217 R2", "is_correct": false, "misconception_token": "wrong-partial-quotient"}, {"text": "27 R2", "is_correct": false, "misconception_token": "dropped-middle-zero"}, {"text": "207 R2", "is_correct": true}, {"text": "207 R1", "is_correct": false, "misconception_token": "wrong-remainder"}]$q$::jsonb, $q$207 R2$q$, $q$Dividing by place: $6 \div 3 = 2$, then $2 \div 3 = 0$ remainder 2, then $23 \div 3 = 7$ remainder 2, giving 207 R2.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0d4b963d-5484-5ffb-9fc0-ddb68304ed5d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'eb04041f-4a82-5df8-b8fe-264b17b1343f', '0d4b963d-5484-5ffb-9fc0-ddb68304ed5d', array['stem_ends']::text[], $q$Merged into one question ending with ?.$q$
 where exists (select 1 from public.generated_questions where id = 'eb04041f-4a82-5df8-b8fe-264b17b1343f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b7908aa9-be8f-5c19-87ed-42e4ffbe98ac', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What are the quotient and remainder for $4926 \div 8$?$q$, $q$[{"text": "615 R6", "is_correct": true}, {"text": "605 R6", "is_correct": false, "misconception_token": "skipped-middle-digit"}, {"text": "616 R6", "is_correct": false, "misconception_token": "quotient-too-big"}, {"text": "615 R2", "is_correct": false, "misconception_token": "wrong-remainder"}]$q$::jsonb, $q$615 R6$q$, $q$Dividing by place: $49 \div 8 = 6$ remainder 1, then $12 \div 8 = 1$ remainder 4, then $46 \div 8 = 5$ remainder 6, giving 615 R6.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5c612b97-cae7-5f2d-9002-768485cbdab3' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b7908aa9-be8f-5c19-87ed-42e4ffbe98ac', '5c612b97-cae7-5f2d-9002-768485cbdab3', array['stem_ends']::text[], $q$Merged into one question ending with ?.$q$
 where exists (select 1 from public.generated_questions where id = 'b7908aa9-be8f-5c19-87ed-42e4ffbe98ac')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '6db8a189-004e-53c0-b759-25dd927cced0', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What are the quotient and remainder for $47 \div 5$?$q$, $q$[{"text": "9 R3", "is_correct": false, "misconception_token": "wrong-remainder"}, {"text": "9 R5", "is_correct": false, "misconception_token": "remainder-equals-divisor"}, {"text": "8 R2", "is_correct": false, "misconception_token": "quotient-too-small"}, {"text": "9 R2", "is_correct": true}]$q$::jsonb, $q$9 R2$q$, $q$The largest multiple of 5 below 47 is $5 \times 9 = 45$, and $47 - 45 = 2$, so the answer is 9 R2.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '714d91db-faaf-5d6c-8e53-569de3c55810' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '6db8a189-004e-53c0-b759-25dd927cced0', '714d91db-faaf-5d6c-8e53-569de3c55810', array['stem_ends']::text[], $q$Merged into one question ending with ?.$q$
 where exists (select 1 from public.generated_questions where id = '6db8a189-004e-53c0-b759-25dd927cced0')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '15a5597e-7af9-54d4-9149-a312f9a92044', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What are the quotient and remainder for $38 \div 4$?$q$, $q$[{"text": "10 R2", "is_correct": false, "misconception_token": "quotient-too-big"}, {"text": "9 R1", "is_correct": false, "misconception_token": "wrong-remainder"}, {"text": "8 R6", "is_correct": false, "misconception_token": "remainder-too-big"}, {"text": "9 R2", "is_correct": true}]$q$::jsonb, $q$9 R2$q$, $q$The largest multiple of 4 below 38 is $4 \times 9 = 36$, and $38 - 36 = 2$, so the answer is 9 R2.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ace4be4b-fbc8-5caf-9033-a11b12b1596f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '15a5597e-7af9-54d4-9149-a312f9a92044', 'ace4be4b-fbc8-5caf-9033-a11b12b1596f', array['stem_ends']::text[], $q$Merged into one question ending with ?.$q$
 where exists (select 1 from public.generated_questions where id = '15a5597e-7af9-54d4-9149-a312f9a92044')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'fab60806-0a09-5280-97b7-631a58a29546', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number goes in the box in $\square \times 5 = 20$?$q$, $q$[{"text": "4", "is_correct": true}, {"text": "3", "is_correct": false, "misconception_token": "quotient-too-low"}, {"text": "15", "is_correct": false, "misconception_token": "subtracted-instead-of-divided"}, {"text": "5", "is_correct": false, "misconception_token": "quotient-too-high"}]$q$::jsonb, $q$4$q$, $q$Ask how many $5$s make $20$: $20 \div 5 = 4$, and $4 \times 5 = 20$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '49ff72da-9f56-571b-a697-cd5a1d51b569' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'fab60806-0a09-5280-97b7-631a58a29546', '49ff72da-9f56-571b-a697-cd5a1d51b569', array['stem_ends']::text[], $q$Moved the equation into the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = 'fab60806-0a09-5280-97b7-631a58a29546')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a62c4151-8982-5b66-867e-d2e059331720', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number goes in the box in $\square \times 8 = 64$?$q$, $q$[{"text": "8", "is_correct": true}, {"text": "7", "is_correct": false, "misconception_token": "quotient-too-low"}, {"text": "56", "is_correct": false, "misconception_token": "subtracted-instead-of-divided"}, {"text": "9", "is_correct": false, "misconception_token": "quotient-too-high"}]$q$::jsonb, $q$8$q$, $q$Ask how many $8$s make $64$: $64 \div 8 = 8$, and $8 \times 8 = 64$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '62e6adc2-5f6b-5026-83aa-118943df58e2' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a62c4151-8982-5b66-867e-d2e059331720', '62e6adc2-5f6b-5026-83aa-118943df58e2', array['stem_ends']::text[], $q$Moved the equation into the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = 'a62c4151-8982-5b66-867e-d2e059331720')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ca89fb3e-604c-59bc-b8b4-7d59fafe8cfb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number goes in the box in $\square \times 3 = 30$?$q$, $q$[{"text": "9", "is_correct": false, "misconception_token": "quotient-too-low"}, {"text": "27", "is_correct": false, "misconception_token": "subtracted-instead-of-divided"}, {"text": "10", "is_correct": true}, {"text": "11", "is_correct": false, "misconception_token": "quotient-too-high"}]$q$::jsonb, $q$10$q$, $q$Ask how many $3$s make $30$: $30 \div 3 = 10$, and $10 \times 3 = 30$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7c16ef96-a1bd-5566-85e4-a9fc195a8644' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ca89fb3e-604c-59bc-b8b4-7d59fafe8cfb', '7c16ef96-a1bd-5566-85e4-a9fc195a8644', array['stem_ends']::text[], $q$Moved the equation into the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = 'ca89fb3e-604c-59bc-b8b4-7d59fafe8cfb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '25c02549-7e23-5404-8c54-e60f56f2aad7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number goes in the box in $\square \times 4 = 36$?$q$, $q$[{"text": "9", "is_correct": true}, {"text": "8", "is_correct": false, "misconception_token": "quotient-too-low"}, {"text": "10", "is_correct": false, "misconception_token": "quotient-too-high"}, {"text": "32", "is_correct": false, "misconception_token": "subtracted-instead-of-divided"}]$q$::jsonb, $q$9$q$, $q$Ask how many $4$s make $36$: $36 \div 4 = 9$, and $9 \times 4 = 36$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '896e95b5-fe50-5e79-a745-0d2c0470e797' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '25c02549-7e23-5404-8c54-e60f56f2aad7', '896e95b5-fe50-5e79-a745-0d2c0470e797', array['stem_ends']::text[], $q$Moved the equation into the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '25c02549-7e23-5404-8c54-e60f56f2aad7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '277fa6af-93c9-5dcc-89dd-567c495a0a26', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number goes in the box in $\square \times 6 = 42$?$q$, $q$[{"text": "6", "is_correct": false, "misconception_token": "quotient-too-low"}, {"text": "8", "is_correct": false, "misconception_token": "quotient-too-high"}, {"text": "36", "is_correct": false, "misconception_token": "subtracted-instead-of-divided"}, {"text": "7", "is_correct": true}]$q$::jsonb, $q$7$q$, $q$Ask how many $6$s make $42$: $42 \div 6 = 7$, and $7 \times 6 = 42$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '90186726-10ec-5c62-86f9-ca37f6fb924b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '277fa6af-93c9-5dcc-89dd-567c495a0a26', '90186726-10ec-5c62-86f9-ca37f6fb924b', array['stem_ends']::text[], $q$Moved the equation into the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '277fa6af-93c9-5dcc-89dd-567c495a0a26')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '916fcfda-d039-5933-b0ef-f65345c6e3bd', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number goes in the box in $\square \times 4 = 32$?$q$, $q$[{"text": "8", "is_correct": true}, {"text": "9", "is_correct": false, "misconception_token": "quotient-too-high"}, {"text": "28", "is_correct": false, "misconception_token": "subtracted-instead-of-divided"}, {"text": "7", "is_correct": false, "misconception_token": "quotient-too-low"}]$q$::jsonb, $q$8$q$, $q$Ask how many $4$s make $32$: $32 \div 4 = 8$, and $8 \times 4 = 32$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a8f277da-88c0-595b-b76e-8005770e376a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '916fcfda-d039-5933-b0ef-f65345c6e3bd', 'a8f277da-88c0-595b-b76e-8005770e376a', array['stem_ends']::text[], $q$Moved the equation into the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '916fcfda-d039-5933-b0ef-f65345c6e3bd')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '6057b9c9-c949-51d4-844d-2b6e8f8b800a', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number goes in the box in $\square \times 6 = 24$?$q$, $q$[{"text": "3", "is_correct": false, "misconception_token": "quotient-too-low"}, {"text": "18", "is_correct": false, "misconception_token": "subtracted-instead-of-divided"}, {"text": "4", "is_correct": true}, {"text": "5", "is_correct": false, "misconception_token": "quotient-too-high"}]$q$::jsonb, $q$4$q$, $q$Ask how many $6$s make $24$: $24 \div 6 = 4$, and $4 \times 6 = 24$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ab002f6a-6e3d-574f-93db-84f9c5124c0f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '6057b9c9-c949-51d4-844d-2b6e8f8b800a', 'ab002f6a-6e3d-574f-93db-84f9c5124c0f', array['stem_ends']::text[], $q$Moved the equation into the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '6057b9c9-c949-51d4-844d-2b6e8f8b800a')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '21ae2cf2-3f72-5142-9024-b96da2318ea3', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number goes in the box in $\square \times 9 = 81$?$q$, $q$[{"text": "72", "is_correct": false, "misconception_token": "subtracted-instead-of-divided"}, {"text": "10", "is_correct": false, "misconception_token": "quotient-too-high"}, {"text": "9", "is_correct": true}, {"text": "8", "is_correct": false, "misconception_token": "quotient-too-low"}]$q$::jsonb, $q$9$q$, $q$Ask how many $9$s make $81$: $81 \div 9 = 9$, and $9 \times 9 = 81$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c399c21b-b35d-580d-a652-27af4cb97cae' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '21ae2cf2-3f72-5142-9024-b96da2318ea3', 'c399c21b-b35d-580d-a652-27af4cb97cae', array['stem_ends']::text[], $q$Moved the equation into the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '21ae2cf2-3f72-5142-9024-b96da2318ea3')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4c5a1b51-40e6-5739-89de-73c00b95cf65', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number goes in the box in $\square \times 7 = 63$?$q$, $q$[{"text": "9", "is_correct": true}, {"text": "10", "is_correct": false, "misconception_token": "quotient-too-high"}, {"text": "56", "is_correct": false, "misconception_token": "subtracted-instead-of-divided"}, {"text": "8", "is_correct": false, "misconception_token": "quotient-too-low"}]$q$::jsonb, $q$9$q$, $q$Ask how many $7$s make $63$: $63 \div 7 = 9$, and $9 \times 7 = 63$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd17ed4d6-4c9d-55d2-b461-2d579057ee30' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4c5a1b51-40e6-5739-89de-73c00b95cf65', 'd17ed4d6-4c9d-55d2-b461-2d579057ee30', array['stem_ends']::text[], $q$Moved the equation into the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '4c5a1b51-40e6-5739-89de-73c00b95cf65')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '117747a6-a5ba-5fa6-b6f4-d2cdd74cbd4b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number goes in the box in $\square \times 10 = 40$?$q$, $q$[{"text": "3", "is_correct": false, "misconception_token": "quotient-too-low"}, {"text": "5", "is_correct": false, "misconception_token": "quotient-too-high"}, {"text": "4", "is_correct": true}, {"text": "30", "is_correct": false, "misconception_token": "subtracted-instead-of-divided"}]$q$::jsonb, $q$4$q$, $q$Ask how many $10$s make $40$: $40 \div 10 = 4$, and $4 \times 10 = 40$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e61374df-fd09-5c4a-b2a8-c7baf831cfc0' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '117747a6-a5ba-5fa6-b6f4-d2cdd74cbd4b', 'e61374df-fd09-5c4a-b2a8-c7baf831cfc0', array['stem_ends']::text[], $q$Moved the equation into the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '117747a6-a5ba-5fa6-b6f4-d2cdd74cbd4b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4513ceb1-6ab0-5eec-a99e-d031b177c851', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number goes in the box in $\square \times 6 = 30$?$q$, $q$[{"text": "6", "is_correct": false, "misconception_token": "quotient-too-high"}, {"text": "5", "is_correct": true}, {"text": "4", "is_correct": false, "misconception_token": "quotient-too-low"}, {"text": "24", "is_correct": false, "misconception_token": "subtracted-instead-of-divided"}]$q$::jsonb, $q$5$q$, $q$Ask how many $6$s make $30$: $30 \div 6 = 5$, and $5 \times 6 = 30$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'eb42b3b4-0c0d-5b04-b7b5-2996e89a4b27' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4513ceb1-6ab0-5eec-a99e-d031b177c851', 'eb42b3b4-0c0d-5b04-b7b5-2996e89a4b27', array['stem_ends']::text[], $q$Moved the equation into the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '4513ceb1-6ab0-5eec-a99e-d031b177c851')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '872dc22c-ddc7-5ef0-94d5-40379d4df22e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number goes in the box in $\square \times 8 = 56$?$q$, $q$[{"text": "6", "is_correct": false, "misconception_token": "quotient-too-low"}, {"text": "8", "is_correct": false, "misconception_token": "quotient-too-high"}, {"text": "48", "is_correct": false, "misconception_token": "subtracted-instead-of-divided"}, {"text": "7", "is_correct": true}]$q$::jsonb, $q$7$q$, $q$Ask how many $8$s make $56$: $56 \div 8 = 7$, and $7 \times 8 = 56$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'fce8cbea-a0dc-5e8a-a898-2a79a71de0c2' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '872dc22c-ddc7-5ef0-94d5-40379d4df22e', 'fce8cbea-a0dc-5e8a-a898-2a79a71de0c2', array['stem_ends']::text[], $q$Moved the equation into the question so the stem ends with ?.$q$
 where exists (select 1 from public.generated_questions where id = '872dc22c-ddc7-5ef0-94d5-40379d4df22e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a0c8e6f5-7243-5593-b9a2-1b51094c37cf', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What are the quotient and remainder for $1348 \div 24$?$q$, $q$[{"text": "55 R28", "is_correct": false, "misconception_token": "remainder-larger-than-divisor"}, {"text": "56 R0", "is_correct": false, "misconception_token": "ignored-remainder"}, {"text": "56 R4", "is_correct": true}, {"text": "56 R8", "is_correct": false, "misconception_token": "subtraction-error"}]$q$::jsonb, $q$56 R4$q$, $q$$24 \times 56 = 1344$ and $1348 - 1344 = 4$, and $4 < 24$, so $1348 \div 24 = 56$ remainder $4$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7fde300d-4675-51aa-bcc4-f106bf14fe56' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a0c8e6f5-7243-5593-b9a2-1b51094c37cf', '7fde300d-4675-51aa-bcc4-f106bf14fe56', array['stem_ends']::text[], $q$Merged into one question ending with ?.$q$
 where exists (select 1 from public.generated_questions where id = 'a0c8e6f5-7243-5593-b9a2-1b51094c37cf')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '8e1964bb-4a25-5950-8a3e-f62060ec8fad', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What are the quotient and remainder for $50 \div 15$?$q$, $q$[{"text": "3 R0", "is_correct": false, "misconception_token": "ignored-remainder"}, {"text": "5 R3", "is_correct": false, "misconception_token": "swapped-quotient-and-remainder"}, {"text": "2 R20", "is_correct": false, "misconception_token": "remainder-larger-than-divisor"}, {"text": "3 R5", "is_correct": true}]$q$::jsonb, $q$3 R5$q$, $q$$15 \times 3 = 45$ and $50 - 45 = 5$, and $5 < 15$, so $50 \div 15 = 3$ remainder $5$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'bebe1251-bc33-5c7e-bbff-3ec8b8641051' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '8e1964bb-4a25-5950-8a3e-f62060ec8fad', 'bebe1251-bc33-5c7e-bbff-3ec8b8641051', array['stem_ends']::text[], $q$Merged into one question ending with ?.$q$
 where exists (select 1 from public.generated_questions where id = '8e1964bb-4a25-5950-8a3e-f62060ec8fad')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3d735f93-31d6-59f0-93d2-ae6f1b308a64', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A $50 jacket is 20% off. What is the sale price?$q$, $q$[{"text": "$40", "is_correct": true}, {"text": "$30", "is_correct": false, "misconception_token": "took-double-the-discount"}, {"text": "$60", "is_correct": false, "misconception_token": "added-instead-of-subtracting"}, {"text": "$10", "is_correct": false, "misconception_token": "found-discount-not-price"}]$q$::jsonb, $q$$40$q$, $q$20% of $50 is $10 off, so $50 minus $10 is $40.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e16cbd47-fc49-5bd2-b5b2-5ed0378dcfb8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3d735f93-31d6-59f0-93d2-ae6f1b308a64', 'e16cbd47-fc49-5bd2-b5b2-5ed0378dcfb8', array['no_dashes']::text[], $q$Reworded the plain-text minus as 'minus' because $ is used for currency here.$q$
 where exists (select 1 from public.generated_questions where id = '3d735f93-31d6-59f0-93d2-ae6f1b308a64')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4629d8d8-84a4-5366-9ccb-05e525a4d156', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 400 + 30 + 8?$q$, $q$[{"text": "4,308", "is_correct": false, "misconception_token": "kept-the-zeros"}, {"text": "15", "is_correct": false, "misconception_token": "added-the-parts"}, {"text": "483", "is_correct": false, "misconception_token": "digits-reversed"}, {"text": "438", "is_correct": true}]$q$::jsonb, $q$438$q$, $q$400 + 30 + 8 combines to 438 (4 hundreds, 3 tens, 8 ones). 4,308 keeps the zeros, 483 swaps the tens and ones, and 15 just adds the digits.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0351efff-2cf5-50b8-8cb7-ab4d7102120d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4629d8d8-84a4-5366-9ccb-05e525a4d156', '0351efff-2cf5-50b8-8cb7-ab4d7102120d', array['no_dashes']::text[], $q$Replaced the em dash in the solution with parentheses.$q$
 where exists (select 1 from public.generated_questions where id = '4629d8d8-84a4-5366-9ccb-05e525a4d156')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd2fa64c1-2db0-5119-8e00-ff4a9008501c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 10 more than 495?$q$, $q$[{"text": "595", "is_correct": false, "misconception_token": "added-to-wrong-place"}, {"text": "496", "is_correct": false, "misconception_token": "wrong-amount-changed"}, {"text": "505", "is_correct": true}, {"text": "485", "is_correct": false, "misconception_token": "subtracted-instead"}]$q$::jsonb, $q$505$q$, $q$495 + 10 = 505: the 9 tens and the new ten make a whole new hundred. 496 adds only one, 595 adds a hundred, and 485 is ten less.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '14de1971-9e73-596e-b552-3ef3912d3932' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd2fa64c1-2db0-5119-8e00-ff4a9008501c', '14de1971-9e73-596e-b552-3ef3912d3932', array['no_dashes']::text[], $q$Replaced the em dash in the solution with a colon.$q$
 where exists (select 1 from public.generated_questions where id = 'd2fa64c1-2db0-5119-8e00-ff4a9008501c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3416e4da-e5f0-5c13-94f7-c4bdf642dfad', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$In the number 405, what is the value of the digit 0?$q$, $q$[{"text": "5", "is_correct": false, "misconception_token": "read-wrong-digit"}, {"text": "10", "is_correct": false, "misconception_token": "zero-place-misread"}, {"text": "0", "is_correct": true}, {"text": "45", "is_correct": false, "misconception_token": "ignored-zero-placeholder"}]$q$::jsonb, $q$0$q$, $q$The 0 is in the tens place, so its value is 0. It holds the spot so the 4 stays in the hundreds and 5 in the ones. It is not 10, you cannot skip it (that would make 45), and 5 is the ones digit.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '448084de-e08c-5252-a042-499593f26a47' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3416e4da-e5f0-5c13-94f7-c4bdf642dfad', '448084de-e08c-5252-a042-499593f26a47', array['no_dashes']::text[], $q$Split the solution sentence at the em dash into two sentences.$q$
 where exists (select 1 from public.generated_questions where id = '3416e4da-e5f0-5c13-94f7-c4bdf642dfad')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '57f5da0a-fcbd-526a-9bad-1878f58ddb71', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which of these numbers is the greatest: 519, 591, or 195?$q$, $q$[{"text": "519", "is_correct": false, "misconception_token": "compared-wrong-place"}, {"text": "591", "is_correct": true}, {"text": "They are all equal", "is_correct": false, "misconception_token": "thought-equal"}, {"text": "195", "is_correct": false, "misconception_token": "picked-smallest"}]$q$::jsonb, $q$591$q$, $q$591 has 5 hundreds and 9 tens, which is the most. 519 has only 1 ten, 195 has just 1 hundred (the smallest), and the same digits in different places are not equal.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'eb3f7b38-d196-59a5-a48f-77dd22dd790a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '57f5da0a-fcbd-526a-9bad-1878f58ddb71', 'eb3f7b38-d196-59a5-a48f-77dd22dd790a', array['no_dashes']::text[], $q$Replaced the em dash in the solution with a comma.$q$
 where exists (select 1 from public.generated_questions where id = '57f5da0a-fcbd-526a-9bad-1878f58ddb71')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4b327058-16ac-5e95-9caa-eacbd9c0ffaf', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Multiply: $(x + 2)(x^2 - 3x + 1)$.$q$, $q$[{"text": "$x^3 - 5x^2 - 5x + 2$", "is_correct": false, "misconception_token": "combined-x2-terms-wrong"}, {"text": "$x^3 - x^2 + 5x + 2$", "is_correct": false, "misconception_token": "x-term-sign-error"}, {"text": "$x^3 - x^2 - 5x + 2$", "is_correct": true}, {"text": "$x^3 - x^2 - 5x - 2$", "is_correct": false, "misconception_token": "constant-sign-error"}]$q$::jsonb, $q$$x^3 - x^2 - 5x + 2$$q$, $q$$x^3 - 3x^2 + x + 2x^2 - 6x + 2 = x^3 - x^2 - 5x + 2$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '2ccb1e6a-87a7-55fe-a3a7-7c66a40dfe88' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4b327058-16ac-5e95-9caa-eacbd9c0ffaf', '2ccb1e6a-87a7-55fe-a3a7-7c66a40dfe88', array['no_dashes']::text[], $q$Put the plain-text polynomial expression in the solution inside $...$ (superscripts written as ^).$q$
 where exists (select 1 from public.generated_questions where id = '4b327058-16ac-5e95-9caa-eacbd9c0ffaf')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '8aaa567f-25e6-5715-a067-d4783f82b12f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Factor: $x^2 - 9$.$q$, $q$[{"text": "$(x - 3)^2$", "is_correct": false, "misconception_token": "treated-as-perfect-square"}, {"text": "$(x - 3)(x + 3)$", "is_correct": true}, {"text": "$(x - 9)(x + 1)$", "is_correct": false, "misconception_token": "wrong-factor-pair"}, {"text": "$(x + 3)^2$", "is_correct": false, "misconception_token": "sign-error"}]$q$::jsonb, $q$$(x - 3)(x + 3)$$q$, $q$Difference of squares: $x^2 - 9 = (x - 3)(x + 3)$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '55ffce9f-ac40-51fc-8d20-57d8f65ab4bf' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '8aaa567f-25e6-5715-a067-d4783f82b12f', '55ffce9f-ac40-51fc-8d20-57d8f65ab4bf', array['no_dashes']::text[], $q$Put the plain-text polynomial expression in the solution inside $...$ (superscripts written as ^).$q$
 where exists (select 1 from public.generated_questions where id = '8aaa567f-25e6-5715-a067-d4783f82b12f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4be04d7e-6466-51f9-8206-e0967daa218c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Subtract: $(5x^2 - 3x) - (2x^2 + x)$.$q$, $q$[{"text": "$3x^2 - 4x$", "is_correct": true}, {"text": "$7x^2 - 4x$", "is_correct": false, "misconception_token": "added-first-terms"}, {"text": "$3x^2 - 2x$", "is_correct": false, "misconception_token": "did-not-distribute-minus"}, {"text": "$3x^2 + 4x$", "is_correct": false, "misconception_token": "sign-error"}]$q$::jsonb, $q$$3x^2 - 4x$$q$, $q$Distribute the minus: $5x^2 - 3x - 2x^2 - x = 3x^2 - 4x$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '9dd6d073-d50b-5cdd-b215-7bbad881f8fd' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4be04d7e-6466-51f9-8206-e0967daa218c', '9dd6d073-d50b-5cdd-b215-7bbad881f8fd', array['no_dashes']::text[], $q$Put the plain-text polynomial expression in the solution inside $...$ (superscripts written as ^).$q$
 where exists (select 1 from public.generated_questions where id = '4be04d7e-6466-51f9-8206-e0967daa218c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9dd25850-56ba-5c61-8190-77f40d097671', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$By the Remainder Theorem, what is the remainder when $P(x) = x^2 - 4$ is divided by $(x - 3)$?$q$, $q$[{"text": "5", "is_correct": true}, {"text": "13", "is_correct": false, "misconception_token": "added-instead-of-subtracting"}, {"text": "1", "is_correct": false, "misconception_token": "arithmetic-slip"}, {"text": "6", "is_correct": false, "misconception_token": "used-3x-not-x-squared"}]$q$::jsonb, $q$5$q$, $q$Remainder $= P(3) = 3^2 - 4 = 9 - 4 = 5$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b701ce1f-f9ee-58a8-a3d3-8db8bb59d26a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9dd25850-56ba-5c61-8190-77f40d097671', 'b701ce1f-f9ee-58a8-a3d3-8db8bb59d26a', array['no_dashes']::text[], $q$Put the plain-text polynomial expression in the solution inside $...$ (superscripts written as ^).$q$
 where exists (select 1 from public.generated_questions where id = '9dd25850-56ba-5c61-8190-77f40d097671')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0e2bc0d0-4c00-58e3-924f-22d74d12e747', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Multiply: $(x - 5)(x + 5)$.$q$, $q$[{"text": "$x^2 - 10x + 25$", "is_correct": false, "misconception_token": "treated-as-square"}, {"text": "$x^2 + 25$", "is_correct": false, "misconception_token": "sign-error"}, {"text": "$x^2 - 25$", "is_correct": true}, {"text": "$x^2 - 10$", "is_correct": false, "misconception_token": "added-instead-of-multiplying"}]$q$::jsonb, $q$$x^2 - 25$$q$, $q$Difference of squares: $x^2 - 25$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f1a1bbd6-fc02-5358-ac9c-d1cf73f31451' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0e2bc0d0-4c00-58e3-924f-22d74d12e747', 'f1a1bbd6-fc02-5358-ac9c-d1cf73f31451', array['no_dashes']::text[], $q$Put the plain-text polynomial expression in the solution inside $...$ (superscripts written as ^).$q$
 where exists (select 1 from public.generated_questions where id = '0e2bc0d0-4c00-58e3-924f-22d74d12e747')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4d33fee0-9a57-58c8-be9c-e09f22df2aa9', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Cards numbered 1 to 10 are shuffled; one is drawn. What is the probability of a multiple of 3?$q$, $q$[{"text": "$\\frac{3}{10}$", "is_correct": true}, {"text": "$\\frac{1}{3}$", "is_correct": false, "misconception_token": "used-3-in-denominator"}, {"text": "$\\frac{4}{10}$", "is_correct": false, "misconception_token": "included-ten"}, {"text": "$\\frac{1}{10}$", "is_correct": false, "misconception_token": "counted-one"}]$q$::jsonb, $q$$\frac{3}{10}$$q$, $q$Multiples of 3 from 1 to 10 are 3, 6, 9, which is three of ten: 3/10.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '3be72c08-4f2a-50aa-afa9-0ae6458ceb19' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4d33fee0-9a57-58c8-be9c-e09f22df2aa9', '3be72c08-4f2a-50aa-afa9-0ae6458ceb19', array['no_dashes']::text[], $q$Rewrote the solution sentence without the en dash and em dash.$q$
 where exists (select 1 from public.generated_questions where id = '4d33fee0-9a57-58c8-be9c-e09f22df2aa9')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '63db4348-0c2d-504f-a476-aa7a761dfde8', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A die is rolled. What is the probability of an even number?$q$, $q$[{"text": "$\\frac{1}{6}$", "is_correct": false, "misconception_token": "counted-one-even"}, {"text": "$\\frac{2}{3}$", "is_correct": false, "misconception_token": "overcounted"}, {"text": "$\\frac{1}{3}$", "is_correct": false, "misconception_token": "miscounted-evens"}, {"text": "$\\frac{1}{2}$", "is_correct": true}]$q$::jsonb, $q$$\frac{1}{2}$$q$, $q$Even faces are 2, 4, 6: 3 of 6, so P = 3/6 = 1/2.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '59ac5a3b-ede6-5551-84d0-eb43684fa188' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '63db4348-0c2d-504f-a476-aa7a761dfde8', '59ac5a3b-ede6-5551-84d0-eb43684fa188', array['no_dashes']::text[], $q$Replaced the em dash in the solution with a colon.$q$
 where exists (select 1 from public.generated_questions where id = '63db4348-0c2d-504f-a476-aa7a761dfde8')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3db74682-0240-53de-ae4d-30e7f71d0bed', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A die is rolled. What is the probability of a number greater than 4?$q$, $q$[{"text": "$\\frac{1}{6}$", "is_correct": false, "misconception_token": "counted-one-face"}, {"text": "$\\frac{1}{2}$", "is_correct": false, "misconception_token": "included-four"}, {"text": "$\\frac{1}{3}$", "is_correct": true}, {"text": "$\\frac{2}{3}$", "is_correct": false, "misconception_token": "used-complement"}]$q$::jsonb, $q$$\frac{1}{3}$$q$, $q$Greater than 4 means 5 or 6: 2 of 6, so 2/6 = 1/3.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8418ff1a-1453-50b4-9414-f461fb8ab4c3' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3db74682-0240-53de-ae4d-30e7f71d0bed', '8418ff1a-1453-50b4-9414-f461fb8ab4c3', array['no_dashes']::text[], $q$Replaced the em dash in the solution with a colon.$q$
 where exists (select 1 from public.generated_questions where id = '3db74682-0240-53de-ae4d-30e7f71d0bed')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '35c48197-fdd7-516f-bbc5-977bca9e64a1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Find the vertex of $y = x^2 + 4x + 1$ by completing the square.$q$, $q$[{"text": "$(2, -3)$", "is_correct": false, "misconception_token": "x-sign-error"}, {"text": "$(-2, 3)$", "is_correct": false, "misconception_token": "y-sign-error"}, {"text": "$(-2, -3)$", "is_correct": true}, {"text": "$(-4, 1)$", "is_correct": false, "misconception_token": "used-b-and-c"}]$q$::jsonb, $q$$(-2, -3)$$q$, $q$$x^2 + 4x + 1 = (x + 2)^2 - 3$, so the vertex is $(-2, -3)$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '21e9739d-7879-5fb3-85bc-2e359199c660' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '35c48197-fdd7-516f-bbc5-977bca9e64a1', '21e9739d-7879-5fb3-85bc-2e359199c660', array['no_dashes']::text[], $q$Put the plain-text completed-square expression in the solution inside math.$q$
 where exists (select 1 from public.generated_questions where id = '35c48197-fdd7-516f-bbc5-977bca9e64a1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '1bbf5a44-5805-5075-af5c-8a01602abde7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is the vertex of $y = x^2 - 6x + 5$?$q$, $q$[{"text": "$(3, 4)$", "is_correct": false, "misconception_token": "y-sign-error"}, {"text": "$(-3, -4)$", "is_correct": false, "misconception_token": "x-sign-error"}, {"text": "$(3, -4)$", "is_correct": true}, {"text": "$(3, 5)$", "is_correct": false, "misconception_token": "used-constant-as-y"}]$q$::jsonb, $q$$(3, -4)$$q$, $q$$x = 3$; $y = 3^2 - 6 \cdot 3 + 5 = 9 - 18 + 5 = -4$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '4be45d38-1d60-5319-9155-0db68ef15008' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '1bbf5a44-5805-5075-af5c-8a01602abde7', '4be45d38-1d60-5319-9155-0db68ef15008', array['no_dashes']::text[], $q$Put the plain-text minus expressions in the solution inside math.$q$
 where exists (select 1 from public.generated_questions where id = '1bbf5a44-5805-5075-af5c-8a01602abde7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '89bf8120-cf0b-54bb-80fe-d9a307488bc5', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Write $y = (x - 3)^2$ in standard form.$q$, $q$[{"text": "$y = x^2 - 6x + 9$", "is_correct": true}, {"text": "$y = x^2 - 9$", "is_correct": false, "misconception_token": "sign-and-middle-error"}, {"text": "$y = x^2 - 6x - 9$", "is_correct": false, "misconception_token": "constant-sign-error"}, {"text": "$y = x^2 + 9$", "is_correct": false, "misconception_token": "forgot-middle-term"}]$q$::jsonb, $q$$y = x^2 - 6x + 9$$q$, $q$$(x - 3)^2 = x^2 - 6x + 9$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b68ab298-ded7-5163-9c2f-1db6337cddf3' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '89bf8120-cf0b-54bb-80fe-d9a307488bc5', 'b68ab298-ded7-5163-9c2f-1db6337cddf3', array['no_dashes']::text[], $q$Put the plain-text expansion in the solution inside math.$q$
 where exists (select 1 from public.generated_questions where id = '89bf8120-cf0b-54bb-80fe-d9a307488bc5')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9c8c9aa4-aec3-5563-8846-004be13e673f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is the vertex of $y = x^2 + 3$?$q$, $q$[{"text": "$(-3, 0)$", "is_correct": false, "misconception_token": "swapped-and-sign"}, {"text": "$(0, 3)$", "is_correct": true}, {"text": "$(3, 0)$", "is_correct": false, "misconception_token": "swapped-coordinates"}, {"text": "$(0, -3)$", "is_correct": false, "misconception_token": "sign-error"}]$q$::jsonb, $q$$(0, 3)$$q$, $q$y = x² + 3 has vertex at (0, 3), shifted up 3.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c5986ec4-7d39-5875-a90b-ee66231d7757' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9c8c9aa4-aec3-5563-8846-004be13e673f', 'c5986ec4-7d39-5875-a90b-ee66231d7757', array['no_dashes']::text[], $q$Replaced the em dash in the solution with a comma.$q$
 where exists (select 1 from public.generated_questions where id = '9c8c9aa4-aec3-5563-8846-004be13e673f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ea27df93-64a9-5697-a0db-71ccde3d3b43', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is the vertex of $y = (x - 2)^2 + 5$?$q$, $q$[{"text": "$(5, 2)$", "is_correct": false, "misconception_token": "swapped-coordinates"}, {"text": "$(2, -5)$", "is_correct": false, "misconception_token": "sign-of-k-error"}, {"text": "$(-2, 5)$", "is_correct": false, "misconception_token": "sign-of-h-error"}, {"text": "$(2, 5)$", "is_correct": true}]$q$::jsonb, $q$$(2, 5)$$q$, $q$Vertex form $y = (x - h)^2 + k$ gives vertex (2, 5).$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e0e2280f-ecfc-5be3-b4b1-be0584e6991a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ea27df93-64a9-5697-a0db-71ccde3d3b43', 'e0e2280f-ecfc-5be3-b4b1-be0584e6991a', array['no_dashes']::text[], $q$Put the plain-text vertex-form expression in the solution inside math.$q$
 where exists (select 1 from public.generated_questions where id = 'ea27df93-64a9-5697-a0db-71ccde3d3b43')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a59c823d-f576-573a-ba3b-a87791388d63', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Simplify (for $x \neq 3$): $\dfrac{x^2 - 9}{x - 3}$.$q$, $q$[{"text": "$x + 3$", "is_correct": true}, {"text": "$x - 3$", "is_correct": false, "misconception_token": "sign-error"}, {"text": "$3$", "is_correct": false, "misconception_token": "cancelled-terms-not-factors"}, {"text": "$x + 9$", "is_correct": false, "misconception_token": "kept-constant"}]$q$::jsonb, $q$$x + 3$$q$, $q$$x^2 - 9 = (x - 3)(x + 3)$; cancel $(x - 3)$ to get $x + 3$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0722da24-2953-5e4e-9cc7-32bb9b34f577' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a59c823d-f576-573a-ba3b-a87791388d63', '0722da24-2953-5e4e-9cc7-32bb9b34f577', array['no_dashes']::text[], $q$Put the plain-text factoring expressions in the solution inside math.$q$
 where exists (select 1 from public.generated_questions where id = 'a59c823d-f576-573a-ba3b-a87791388d63')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '83822cf8-c6ce-506d-8557-8ec09ccce3dc', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$In a triangle with angles $30^\circ$, $60^\circ$, and $90^\circ$, the hypotenuse has length $10$. What is the length of the side opposite the $30^\circ$ angle?$q$, $q$[{"text": "20", "is_correct": false, "misconception_token": "doubled-hypotenuse"}, {"text": "$10\\sqrt{3}$", "is_correct": false, "misconception_token": "multiplied-by-root-three"}, {"text": "5", "is_correct": true}, {"text": "$5\\sqrt{3}$", "is_correct": false, "misconception_token": "used-long-leg"}]$q$::jsonb, $q$5$q$, $q$The side opposite the $30^\circ$ angle is half the hypotenuse: $\frac{10}{2} = 5$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '074b5447-bad0-5274-ae8b-ed60d93532a7' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '83822cf8-c6ce-506d-8557-8ec09ccce3dc', '074b5447-bad0-5274-ae8b-ed60d93532a7', array['no_dashes']::text[], $q$Reworded the triangle name in the stem as a list of angles so no bare hyphen sits between math spans.$q$
 where exists (select 1 from public.generated_questions where id = '83822cf8-c6ce-506d-8557-8ec09ccce3dc')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '74256a2e-2a70-5285-948e-318ccdf8d296', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$In a triangle with angles $30^\circ$, $60^\circ$, and $90^\circ$, the hypotenuse has length $8$. What is the length of the side opposite the $60^\circ$ angle?$q$, $q$[{"text": "$4\\sqrt{2}$", "is_correct": false, "misconception_token": "used-45-45-90-ratio"}, {"text": "$8\\sqrt{3}$", "is_correct": false, "misconception_token": "multiplied-hypotenuse-by-root-three"}, {"text": "4", "is_correct": false, "misconception_token": "used-short-leg"}, {"text": "$4\\sqrt{3}$", "is_correct": true}]$q$::jsonb, $q$$4\sqrt{3}$$q$, $q$The side opposite $60^\circ$ is $8 \sin 60^\circ = 8 \times \frac{\sqrt{3}}{2} = 4\sqrt{3}$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c9c39b78-adde-512f-8aec-aed4877cd68c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '74256a2e-2a70-5285-948e-318ccdf8d296', 'c9c39b78-adde-512f-8aec-aed4877cd68c', array['no_dashes']::text[], $q$Reworded the triangle name in the stem as a list of angles so no bare hyphen sits between math spans.$q$
 where exists (select 1 from public.generated_questions where id = '74256a2e-2a70-5285-948e-318ccdf8d296')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '039bf16d-9e55-57b1-ad44-0722a0f915f2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$A triangle with angles $45^\circ$, $45^\circ$, and $90^\circ$ has legs of length $7$. What is the length of the hypotenuse?$q$, $q$[{"text": "7", "is_correct": false, "misconception_token": "used-leg-length"}, {"text": "14", "is_correct": false, "misconception_token": "doubled-leg"}, {"text": "$7\\sqrt{2}$", "is_correct": true}, {"text": "$\\frac{7}{\\sqrt{2}}$", "is_correct": false, "misconception_token": "divided-by-root-two"}]$q$::jsonb, $q$$7\sqrt{2}$$q$, $q$In a triangle with angles $45^\circ$, $45^\circ$, and $90^\circ$, the hypotenuse is a leg times $\sqrt{2}$, so it is $7\sqrt{2}$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f176703f-e552-5a5b-b2f5-4e3faf6b0467' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '039bf16d-9e55-57b1-ad44-0722a0f915f2', 'f176703f-e552-5a5b-b2f5-4e3faf6b0467', array['no_dashes']::text[], $q$Reworded the triangle name in the stem and solution as a list of angles so no bare hyphen sits between math spans.$q$
 where exists (select 1 from public.generated_questions where id = '039bf16d-9e55-57b1-ad44-0722a0f915f2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '63987b4d-43da-52b1-b14b-52efbb97bc6c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Solve: $y = x^2 - 1$ and $y = 3$.$q$, $q$[{"text": "$x = \\pm 4$", "is_correct": false, "misconception_token": "did-not-take-root"}, {"text": "$x = \\pm \\sqrt{3}$", "is_correct": false, "misconception_token": "forgot-the-minus-one"}, {"text": "$x = 2$ only", "is_correct": false, "misconception_token": "missed-negative-root"}, {"text": "$x = 2$ and $x = -2$", "is_correct": true}]$q$::jsonb, $q$$x = 2$ and $x = -2$$q$, $q$$x^2 - 1 = 3 \to x^2 = 4 \to x = \pm 2$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '117c6fb7-f4b8-57d1-af8d-92b3a0f46b9e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '63987b4d-43da-52b1-b14b-52efbb97bc6c', '117c6fb7-f4b8-57d1-af8d-92b3a0f46b9e', array['no_dashes']::text[], $q$Put the plain-text solving steps in the solution inside math.$q$
 where exists (select 1 from public.generated_questions where id = '63987b4d-43da-52b1-b14b-52efbb97bc6c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9b4e3695-ef6a-5957-ae07-e36d9bd3aae1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Solve: $x + y = 5$ and $2x + 2y = 10$.$q$, $q$[{"text": "$(5, 0)$", "is_correct": false, "misconception_token": "picked-one-point"}, {"text": "no solution", "is_correct": false, "misconception_token": "assumed-parallel"}, {"text": "one solution", "is_correct": false, "misconception_token": "assumed-single-point"}, {"text": "infinitely many solutions", "is_correct": true}]$q$::jsonb, $q$infinitely many solutions$q$, $q$The second equation is twice the first (the same line), so infinitely many solutions.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'cac0f9ce-c54e-5ebf-bb7e-b93c22f13aa5' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9b4e3695-ef6a-5957-ae07-e36d9bd3aae1', 'cac0f9ce-c54e-5ebf-bb7e-b93c22f13aa5', array['no_dashes']::text[], $q$Replaced the paired em dashes in the solution with parentheses.$q$
 where exists (select 1 from public.generated_questions where id = '9b4e3695-ef6a-5957-ae07-e36d9bd3aae1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'da3147cf-987c-5029-8b70-dd3d56b0dd77', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Solve the linear-quadratic system: $y = x^2$ and $y = 2x + 3$.$q$, $q$[{"text": "$x = 3$ only", "is_correct": false, "misconception_token": "missed-a-root"}, {"text": "$x = 1$ and $x = -3$", "is_correct": false, "misconception_token": "sign-error-in-factoring"}, {"text": "$x = 3$ and $x = -1$", "is_correct": true}, {"text": "$x = \\pm 3$", "is_correct": false, "misconception_token": "ignored-linear-term"}]$q$::jsonb, $q$$x = 3$ and $x = -1$$q$, $q$$x^2 = 2x + 3 \to x^2 - 2x - 3 = 0 \to (x - 3)(x + 1) = 0 \to x = 3$ or $x = -1$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'da9576bf-e050-52c4-aadb-82a3849c1dc9' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'da3147cf-987c-5029-8b70-dd3d56b0dd77', 'da9576bf-e050-52c4-aadb-82a3849c1dc9', array['no_dashes']::text[], $q$Put the plain-text solving steps in the solution inside math.$q$
 where exists (select 1 from public.generated_questions where id = 'da3147cf-987c-5029-8b70-dd3d56b0dd77')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'bf0efc73-8b48-535e-8c61-3ae61de0ae3b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Solve the linear-quadratic system: $y = x^2 - 2x$ and $y = x$.$q$, $q$[{"text": "$x = 0$ and $x = 3$", "is_correct": true}, {"text": "$x = 0$ and $x = -3$", "is_correct": false, "misconception_token": "sign-error"}, {"text": "$x = \\pm 3$", "is_correct": false, "misconception_token": "ignored-a-root"}, {"text": "$x = 3$ only", "is_correct": false, "misconception_token": "divided-out-x"}]$q$::jsonb, $q$$x = 0$ and $x = 3$$q$, $q$$x^2 - 2x = x \to x^2 - 3x = 0 \to x(x - 3) = 0 \to x = 0$ or $x = 3$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e7d88333-e9c6-5977-9a75-d9ea54bdcea5' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'bf0efc73-8b48-535e-8c61-3ae61de0ae3b', 'e7d88333-e9c6-5977-9a75-d9ea54bdcea5', array['no_dashes']::text[], $q$Put the plain-text solving steps in the solution inside math.$q$
 where exists (select 1 from public.generated_questions where id = 'bf0efc73-8b48-535e-8c61-3ae61de0ae3b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4de64988-f49c-5595-8122-407d9b5730c1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Solve: $y = x^2$ and $y = x$.$q$, $q$[{"text": "$x = 1$ only", "is_correct": false, "misconception_token": "divided-out-x"}, {"text": "$x = 0$ and $x = 1$", "is_correct": true}, {"text": "$x = -1$ and $x = 1$", "is_correct": false, "misconception_token": "sign-error"}, {"text": "$x = 0$ only", "is_correct": false, "misconception_token": "missed-second-root"}]$q$::jsonb, $q$$x = 0$ and $x = 1$$q$, $q$$x^2 = x \to x^2 - x = 0 \to x(x - 1) = 0 \to x = 0$ or $x = 1$.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'fcd95ee3-9b9a-53ea-bbc8-157fdea88e52' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4de64988-f49c-5595-8122-407d9b5730c1', 'fcd95ee3-9b9a-53ea-bbc8-157fdea88e52', array['no_dashes']::text[], $q$Put the plain-text solving steps in the solution inside math.$q$
 where exists (select 1 from public.generated_questions where id = '4de64988-f49c-5595-8122-407d9b5730c1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e55b4e90-ac8b-5b4b-bf3c-596e4daaa693', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Given $x = 5$, Column A: $2x + 3$.  Column B: $3x - 2$.  Which is greater?$q$, $q$[{"text": "Column A is greater", "is_correct": false, "misconception_token": "qc-off-by-arithmetic"}, {"text": "Column B is greater", "is_correct": false, "misconception_token": "qc-misread-expression"}, {"text": "It cannot be determined from the information given", "is_correct": false, "misconception_token": "qc-ignored-condition"}, {"text": "The two are equal", "is_correct": true}]$q$::jsonb, $q$The two are equal$q$, $q$With $x = 5$: $2x + 3 = 13$ and $3x - 2 = 13$, so the two are equal.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '424954ca-6c25-51b9-8fb2-cd3a3f51bc9b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e55b4e90-ac8b-5b4b-bf3c-596e4daaa693', '424954ca-6c25-51b9-8fb2-cd3a3f51bc9b', array['no_dashes']::text[], $q$Put the plain-text expressions in the stem and solution inside math.$q$
 where exists (select 1 from public.generated_questions where id = 'e55b4e90-ac8b-5b4b-bf3c-596e4daaa693')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'dc17bc0c-4d2c-5d57-9081-a2910583fde6', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$The coach's instructions were ______: run to the cone, turn left, and pass the ball. Nothing was left to guesswork.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text": "vague", "is_correct": false, "misconception_token": "sat-wic-wrong-connotation"}, {"text": "harsh", "is_correct": false, "misconception_token": "sat-wic-off-context"}, {"text": "lengthy", "is_correct": false, "misconception_token": "sat-wic-related-not-precise"}, {"text": "precise", "is_correct": true}]$q$::jsonb, $q$precise$q$, $q$Steps with "nothing left to guesswork" are "precise"; "lengthy" describes length, not the exactness the clue shows.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd36e7b9a-001b-5a50-935f-e1dbbf9ca2be' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'dc17bc0c-4d2c-5d57-9081-a2910583fde6', 'd36e7b9a-001b-5a50-935f-e1dbbf9ca2be', array['no_dashes']::text[], $q$Split the stem sentence at the em dash into two sentences.$q$
 where exists (select 1 from public.generated_questions where id = 'dc17bc0c-4d2c-5d57-9081-a2910583fde6')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'acd14e51-5ae7-5acc-b7aa-67c1df847fae', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$If the alarm rings, everyone must leave. The alarm did NOT ring. What must happen?$q$, $q$[{"text": "Everyone must leave anyway", "is_correct": false, "misconception_token": "logic-overgeneralized"}, {"text": "Nothing is required; they may stay", "is_correct": true}, {"text": "The alarm rang because they left", "is_correct": false, "misconception_token": "logic-reversed-implication"}, {"text": "They must leave a little later", "is_correct": false, "misconception_token": "logic-unstated-assumption"}]$q$::jsonb, $q$Nothing is required; they may stay$q$, $q$The rule only says what happens WHEN the alarm rings. It did not ring, so nothing is required.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '04890d32-b021-52ac-a829-c0d1633ca291' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'acd14e51-5ae7-5acc-b7aa-67c1df847fae', '04890d32-b021-52ac-a829-c0d1633ca291', array['no_dashes']::text[], $q$Replaced the em dash in the correct choice with a semicolon and updated correct_answer.$q$
 where exists (select 1 from public.generated_questions where id = 'acd14e51-5ae7-5acc-b7aa-67c1df847fae')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '8650aeb0-ef1f-504c-818f-569eac1fe4d1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$All sharks are fish. Some fish live in rivers. Can we be sure all sharks live in rivers?$q$, $q$[{"text": "Yes, all sharks live in rivers", "is_correct": false, "misconception_token": "logic-overgeneralized"}, {"text": "Yes, since all river fish are sharks", "is_correct": false, "misconception_token": "logic-reversed-implication"}, {"text": "Yes, sharks need river water", "is_correct": false, "misconception_token": "logic-unstated-assumption"}, {"text": "No", "is_correct": true}]$q$::jsonb, $q$No$q$, $q$Only SOME fish live in rivers, so we cannot say every shark does. The word "some" does not cover all.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0b2463af-4fb2-5965-87be-8ce414855e5f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '8650aeb0-ef1f-504c-818f-569eac1fe4d1', '0b2463af-4fb2-5965-87be-8ce414855e5f', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = '8650aeb0-ef1f-504c-818f-569eac1fe4d1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f26b203f-3d02-5608-bb88-a6574dd0857d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Everyone in the chess club can play chess. Tom can play chess. Is Tom definitely in the chess club?$q$, $q$[{"text": "Yes, he must be a member", "is_correct": false, "misconception_token": "logic-reversed-implication"}, {"text": "Yes, everyone who can play is a member", "is_correct": false, "misconception_token": "logic-overgeneralized"}, {"text": "No, playing chess does not prove he is a member", "is_correct": true}, {"text": "Yes, the club made him learn", "is_correct": false, "misconception_token": "logic-unstated-assumption"}]$q$::jsonb, $q$No, playing chess does not prove he is a member$q$, $q$Members can all play, but the rule does not say only members can play, so Tom might not be in the club.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0fd9a87d-cd35-5281-87e2-d877f2b52c21' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f26b203f-3d02-5608-bb88-a6574dd0857d', '0fd9a87d-cd35-5281-87e2-d877f2b52c21', array['no_dashes']::text[], $q$Replaced the em dash in the correct choice with a comma and updated correct_answer.$q$
 where exists (select 1 from public.generated_questions where id = 'f26b203f-3d02-5608-bb88-a6574dd0857d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a81e4475-0fec-5e77-b69a-67d5dfe5e65e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Some students play soccer. All soccer players wear cleats. Does every student wear cleats?$q$, $q$[{"text": "Yes, all students wear cleats", "is_correct": false, "misconception_token": "logic-overgeneralized"}, {"text": "Yes, since all cleat-wearers are students", "is_correct": false, "misconception_token": "logic-reversed-implication"}, {"text": "No", "is_correct": true}, {"text": "Yes, the school hands them out", "is_correct": false, "misconception_token": "logic-unstated-assumption"}]$q$::jsonb, $q$No$q$, $q$Only SOME students play soccer, so only those students must wear cleats, not every student.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f63cc4d2-d18b-5898-8b4f-2ac7ea509e89' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a81e4475-0fec-5e77-b69a-67d5dfe5e65e', 'f63cc4d2-d18b-5898-8b4f-2ac7ea509e89', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = 'a81e4475-0fec-5e77-b69a-67d5dfe5e65e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7ea10631-4eb2-59b2-b786-5cd77f2b0065', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$The guide was ___; that is, he was ___ and eager to help everyone.$q$, $q$[{"text": "kind . . . unhelpful", "is_correct": false, "misconception_token": "sc-second-blank-mismatch"}, {"text": "mean . . . helpful", "is_correct": false, "misconception_token": "sc-first-blank-mismatch"}, {"text": "kind . . . helpful", "is_correct": true}, {"text": "harsh . . . cold", "is_correct": false, "misconception_token": "sc-ignored-restatement"}]$q$::jsonb, $q$kind . . . helpful$q$, $q$The phrase "that is" signals RESTATEMENT: both blanks must describe a friendly guide: kind and helpful.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '1f6519b0-58bd-5a44-8270-0efa9f8894f2' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7ea10631-4eb2-59b2-b786-5cd77f2b0065', '1f6519b0-58bd-5a44-8270-0efa9f8894f2', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = '7ea10631-4eb2-59b2-b786-5cd77f2b0065')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'fe5708e1-9546-5c39-b7be-911aaa7533eb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$The scholar was ___; that is, she was ___ and reluctant to boast of her many achievements.$q$, $q$[{"text": "modest . . . humble", "is_correct": true}, {"text": "modest . . . boastful", "is_correct": false, "misconception_token": "sc-second-blank-mismatch"}, {"text": "arrogant . . . humble", "is_correct": false, "misconception_token": "sc-first-blank-mismatch"}, {"text": "vain . . . proud", "is_correct": false, "misconception_token": "sc-ignored-restatement"}]$q$::jsonb, $q$modest . . . humble$q$, $q$The phrase "that is" signals RESTATEMENT: both blanks describe someone who will not boast: modest and humble.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a30ae127-ae72-512d-bc87-2b670e47429c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'fe5708e1-9546-5c39-b7be-911aaa7533eb', 'a30ae127-ae72-512d-bc87-2b670e47429c', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = 'fe5708e1-9546-5c39-b7be-911aaa7533eb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '529b8f70-64e9-50ef-954f-1f23103770d1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$The witness gave a ___ account; that is, a report that was ___ and easy to follow.$q$, $q$[{"text": "coherent . . . clear", "is_correct": true}, {"text": "coherent . . . muddled", "is_correct": false, "misconception_token": "sc-second-blank-mismatch"}, {"text": "rambling . . . clear", "is_correct": false, "misconception_token": "sc-first-blank-mismatch"}, {"text": "confusing . . . vague", "is_correct": false, "misconception_token": "sc-ignored-restatement"}]$q$::jsonb, $q$coherent . . . clear$q$, $q$The phrase "that is" signals RESTATEMENT: both blanks describe an easy-to-follow account: coherent and clear.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd8392c04-cda1-5132-bb5e-47d721ba63f7' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '529b8f70-64e9-50ef-954f-1f23103770d1', 'd8392c04-cda1-5132-bb5e-47d721ba63f7', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = '529b8f70-64e9-50ef-954f-1f23103770d1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '237af88d-8253-5bf6-8c2a-5d995bb557d6', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which choice best states the author's main point?$q$, $q$[{"text": "Riverside parks are more valuable than factories.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "The city does not need any new parks at all.", "is_correct": false, "misconception_token": "too-broad"}, {"text": "The mayor's plan will clearly succeed in helping the city's workers.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "The park plan is flawed because it ignores the workers who would lose their jobs.", "is_correct": true}]$q$::jsonb, $q$The park plan is flawed because it ignores the workers who would lose their jobs.$q$, $q$The author calls the park a 'hollow gift' precisely because it ignores the four hundred workers. That is the main point. The author doesn't reject parks in general, doesn't say the plan helps workers (the opposite), and doesn't compare the value of parks and factories.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0f33fba7-601b-5753-8d87-197de25c4af0' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '237af88d-8253-5bf6-8c2a-5d995bb557d6', '0f33fba7-601b-5753-8d87-197de25c4af0', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = '237af88d-8253-5bf6-8c2a-5d995bb557d6')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '75827fb6-c977-57ab-b3e1-8a962b98b518', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which choice most logically follows from the study's findings?$q$, $q$[{"text": "Menu labels change the behavior of nearly all diners.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "Removing calorie counts would help people eat more healthily.", "is_correct": false, "misconception_token": "reverses-relationship"}, {"text": "Whether menu labels change behavior depends largely on a diner's existing goals.", "is_correct": true}, {"text": "Calorie labels are the single most effective public-health tool available.", "is_correct": false, "misconception_token": "too-broad"}]$q$::jsonb, $q$Whether menu labels change behavior depends largely on a diner's existing goals.$q$, $q$The split result (little average effect but a real effect for motivated diners) points to behavior depending on the diner's goals. Labels don't move nearly all diners, removing them wouldn't help health, and the passage never ranks labels against other tools.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '3b54933f-51ec-5f84-9d4f-60bcf921736e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '75827fb6-c977-57ab-b3e1-8a962b98b518', '3b54933f-51ec-5f84-9d4f-60bcf921736e', array['no_dashes']::text[], $q$Replaced the paired em dashes in the solution with parentheses.$q$
 where exists (select 1 from public.generated_questions where id = '75827fb6-c977-57ab-b3e1-8a962b98b518')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b36dba8b-2b36-549f-83e8-871f0d549500', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which finding, if true, would most support the researchers' conclusion?$q$, $q$[{"text": "The invasive mussel is originally native to another continent.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "The lake's water became a little clearer in each of the ten years.", "is_correct": false, "misconception_token": "wrong-evidence"}, {"text": "Most people had expected the pollution limits to work.", "is_correct": false, "misconception_token": "plausible-but-unstated"}, {"text": "In a nearby lake with the same pollution limits but no mussels, the water stayed cloudy.", "is_correct": true}]$q$::jsonb, $q$In a nearby lake with the same pollution limits but no mussels, the water stayed cloudy.$q$, $q$A comparison lake with the same limits but no mussels staying cloudy isolates the mussel as the cause, which is strong support. That the water cleared each year shows the effect but not its cause; the mussel's origin and people's expectations are irrelevant.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '56cba3ab-6ab1-587e-8771-b0d755725d99' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b36dba8b-2b36-549f-83e8-871f0d549500', '56cba3ab-6ab1-587e-8771-b0d755725d99', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = 'b36dba8b-2b36-549f-83e8-871f0d549500')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '1b6cfe48-58f2-59ef-981a-10c07b34c165', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which choice best captures the distinction the passage draws between the two views?$q$, $q$[{"text": "The newer view holds that the fish will eventually regrow their eyes.", "is_correct": false, "misconception_token": "unsupported-inference"}, {"text": "The older view claimed that eyes cost too much energy to maintain.", "is_correct": false, "misconception_token": "partly-right"}, {"text": "Both views agree that losing their eyes harmed the cave fish.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "The older view saw eye loss as passive decay; the newer view sees it as an advantage that was actively favored.", "is_correct": true}]$q$::jsonb, $q$The older view saw eye loss as passive decay; the newer view sees it as an advantage that was actively favored.$q$, $q$The contrast is between eye loss as passive decay (older) and as an energy-saving advantage that was favored (newer). The newer view says the loss helped (not harmed), says nothing about regrowing eyes, and it is the newer view, not the older, that stresses energy cost.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '58bad1b7-ec78-587d-b763-8bdf135fdc3f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '1b6cfe48-58f2-59ef-981a-10c07b34c165', '58bad1b7-ec78-587d-b763-8bdf135fdc3f', array['no_dashes']::text[], $q$Replaced the paired em dashes in the solution with commas.$q$
 where exists (select 1 from public.generated_questions where id = '1b6cfe48-58f2-59ef-981a-10c07b34c165')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ddb61b1f-486f-5060-884e-6ce3dd51b57e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which choice best states the main idea of the text?$q$, $q$[{"text": "A bee's dance shows other bees how much food a patch contains.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "The waggle dance lets one bee tell others where food is located.", "is_correct": true}, {"text": "Honeybees prefer flowers that grow close to the hive.", "is_correct": false, "misconception_token": "plausible-but-unstated"}, {"text": "The waggle dance is the only way bees can ever find food.", "is_correct": false, "misconception_token": "too-broad"}]$q$::jsonb, $q$The waggle dance lets one bee tell others where food is located.$q$, $q$The passage explains that the dance's direction and length tell other bees where the food is. That is its main point. It never says bees prefer nearby flowers, that the dance is the only method, or that it signals how much food there is.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5ca4ebd1-b219-55f1-aeea-0a80441899c0' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ddb61b1f-486f-5060-884e-6ce3dd51b57e', '5ca4ebd1-b219-55f1-aeea-0a80441899c0', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = 'ddb61b1f-486f-5060-884e-6ce3dd51b57e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd9dd719f-3fe2-5586-97a0-80df6f4f0d5e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which choice best states the conclusion the planners reached?$q$, $q$[{"text": "Safety concerns, more than a lack of bicycles, keep many residents from biking to work.", "is_correct": true}, {"text": "Protected bike lanes reduce traffic congestion for cars.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "Most residents do not own bicycles.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "Cities should replace all of their car lanes with bike lanes.", "is_correct": false, "misconception_token": "too-broad"}]$q$::jsonb, $q$Safety concerns, more than a lack of bicycles, keep many residents from biking to work.$q$, $q$The passage says residents already own bikes but avoid traffic, and a separated lane removes that reason, so safety, not a lack of bikes, is the barrier. It never claims most lack bikes, discusses car traffic, or calls for replacing all car lanes.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '929e9465-8689-5751-a2c9-60c0a9674b40' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd9dd719f-3fe2-5586-97a0-80df6f4f0d5e', '929e9465-8689-5751-a2c9-60c0a9674b40', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = 'd9dd719f-3fe2-5586-97a0-80df6f4f0d5e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '2e4a0138-beea-50f1-bfcd-eb264bf1a56f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which choice best states the main idea of the text?$q$, $q$[{"text": "Sea otters prefer kelp forests to every other habitat.", "is_correct": false, "misconception_token": "plausible-but-unstated"}, {"text": "Kelp forests survive by feeding on the local sea urchins.", "is_correct": false, "misconception_token": "reverses-relationship"}, {"text": "Kelp forests grow best in places where sea otters have disappeared.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "By keeping urchins in check, sea otters help kelp forests thrive.", "is_correct": true}]$q$::jsonb, $q$By keeping urchins in check, sea otters help kelp forests thrive.$q$, $q$The passage shows that otters eating urchins keeps urchin numbers down so kelp can thrive; otters protect the kelp indirectly. Kelp does worse without otters, urchins eat kelp (not the reverse), and the passage never says otters prefer kelp habitats.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '9a9cf70c-4fb7-5d1e-8260-63fa9eb9dceb' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '2e4a0138-beea-50f1-bfcd-eb264bf1a56f', '9a9cf70c-4fb7-5d1e-8260-63fa9eb9dceb', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = '2e4a0138-beea-50f1-bfcd-eb264bf1a56f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c02c470e-d396-5df3-a866-d6fa23d70260', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which choice most logically completes the text's explanation of the design?$q$, $q$[{"text": "smooth wing edges reduce noise better than frayed ones do.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "the new design makes the machines fly noticeably faster than before.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "the jagged edge quiets the machines by disrupting the airflow that would otherwise create noise.", "is_correct": true}, {"text": "owls are the quietest of all flying animals.", "is_correct": false, "misconception_token": "plausible-but-unstated"}]$q$::jsonb, $q$the jagged edge quiets the machines by disrupting the airflow that would otherwise create noise.$q$, $q$The passage says owl feathers' frayed edges 'break up the rushing air' to muffle sound, and the wing copies that, so the jagged edge quiets noise by disrupting airflow. Speed isn't mentioned, owls aren't ranked against other animals, and frayed (not smooth) edges reduce the noise.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd6248a24-708f-5d3b-80ca-e6b9f86ed043' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c02c470e-d396-5df3-a866-d6fa23d70260', 'd6248a24-708f-5d3b-80ca-e6b9f86ed043', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = 'c02c470e-d396-5df3-a866-d6fa23d70260')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '25307660-5159-547a-a368-7219b76462b6', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$According to the text, why did few ordinary citizens own books in the 1850s?$q$, $q$[{"text": "Books were treated as a civic necessity.", "is_correct": false, "misconception_token": "partly-right"}, {"text": "Most towns had banned the sale of books.", "is_correct": false, "misconception_token": "plausible-but-unstated"}, {"text": "Books were expensive and were held mostly by wealthy people.", "is_correct": true}, {"text": "Reformers actively discouraged citizens from reading.", "is_correct": false, "misconception_token": "contradicts-text"}]$q$::jsonb, $q$Books were expensive and were held mostly by wealthy people.$q$, $q$The text states books were expensive and owned mainly by the wealthy. No ban is mentioned, reformers encouraged reading, and 'civic necessity' describes the reformers' view of libraries, not the reason books were scarce.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e5d31f57-5449-5965-ba76-a02f3e6aff01' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '25307660-5159-547a-a368-7219b76462b6', 'e5d31f57-5449-5965-ba76-a02f3e6aff01', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = '25307660-5159-547a-a368-7219b76462b6')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b6e269e5-c63d-58e0-924c-7e5b3ad355d4', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which choice best describes what helps Mara recover?$q$, $q$[{"text": "She decides to make up new lines instead of the ones she rehearsed.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "Her brother calls out the opening line to remind her of it.", "is_correct": false, "misconception_token": "plausible-but-unstated"}, {"text": "The stage lights dim so that she can finally see the audience.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "Seeing a familiar, encouraging face calms her enough to remember her line.", "is_correct": true}]$q$::jsonb, $q$Seeing a familiar, encouraging face calms her enough to remember her line.$q$, $q$The rehearsed line returns the moment she sees her brother's encouraging grin, so a familiar face steadies her. She doesn't invent new lines, the lights don't change, and her brother only grins (he doesn't feed her the line).$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ee51cb12-58e5-5971-9873-6b539817a323' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b6e269e5-c63d-58e0-924c-7e5b3ad355d4', 'ee51cb12-58e5-5971-9873-6b539817a323', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = 'b6e269e5-c63d-58e0-924c-7e5b3ad355d4')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd2c577a0-c1cd-5c84-8577-9bd90331c24c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As it is used in the text, the phrase 'a hollow kind of gift' primarily serves to:$q$, $q$[{"text": "underscore that the plan's benefits are undercut by what it overlooks.", "is_correct": true}, {"text": "suggest that the finished park will be physically empty and unused.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "propose a specific alternative to building the park.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "praise the mayor for a generous and well-designed plan.", "is_correct": false, "misconception_token": "misreads-tone"}]$q$::jsonb, $q$underscore that the plan's benefits are undercut by what it overlooks.$q$, $q$'Hollow gift' turns the praise ('a gift') against itself, stressing that ignoring the workers empties the plan of real value. It isn't praise, doesn't mean the park is literally empty, and offers no alternative.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f49e736b-6210-5d91-a1cf-f3459233c7e7' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd2c577a0-c1cd-5c84-8577-9bd90331c24c', 'f49e736b-6210-5d91-a1cf-f3459233c7e7', array['stem_ends']::text[], $q$Added a colon to end the lead-in stem.$q$
 where exists (select 1 from public.generated_questions where id = 'd2c577a0-c1cd-5c84-8577-9bd90331c24c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '6cd4dbb5-7e67-5b21-91dd-bb963c768574', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter c.$q$, $q$[{"text": "c", "tile": {"kind": "letter", "value": "c"}, "is_correct": true}, {"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false}]$q$::jsonb, $q$c$q$, $q$Yes, little c! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '1ba654da-02c2-5bad-9026-7a299bea01b5' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '6cd4dbb5-7e67-5b21-91dd-bb963c768574', '1ba654da-02c2-5bad-9026-7a299bea01b5', array['no_dashes']::text[], $q$Added misconception tokens to 2 wrong choices; replaced the em dash in the solution with a comma.$q$
 where exists (select 1 from public.generated_questions where id = '6cd4dbb5-7e67-5b21-91dd-bb963c768574')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7da29c5b-dfff-5789-b492-b7cfef47c9fa', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter O? Tap it.$q$, $q$[{"text": "O", "tile": {"kind": "letter", "value": "O"}, "is_correct": true}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false}]$q$::jsonb, $q$O$q$, $q$That's O, the round one! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '451a97eb-270f-59e6-856a-351bd32f9ed8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7da29c5b-dfff-5789-b492-b7cfef47c9fa', '451a97eb-270f-59e6-856a-351bd32f9ed8', array['no_dashes']::text[], $q$Added misconception tokens to 2 wrong choices; replaced the em dash in the solution with a comma.$q$
 where exists (select 1 from public.generated_questions where id = '7da29c5b-dfff-5789-b492-b7cfef47c9fa')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7bd42eee-b838-56a0-b2df-8421c6fce58f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter o.$q$, $q$[{"text": "o", "tile": {"kind": "letter", "value": "o"}, "is_correct": true}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false}, {"text": "t", "tile": {"kind": "letter", "value": "t"}, "is_correct": false}, {"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false}]$q$::jsonb, $q$o$q$, $q$That's little o, nice and round! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '59b6a979-e532-52af-a04e-b5e5f84ce067' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7bd42eee-b838-56a0-b2df-8421c6fce58f', '59b6a979-e532-52af-a04e-b5e5f84ce067', array['no_dashes']::text[], $q$Added misconception tokens to 3 wrong choices; replaced the dash in the solution with a comma.$q$
 where exists (select 1 from public.generated_questions where id = '7bd42eee-b838-56a0-b2df-8421c6fce58f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '31f9b2ad-2f9e-5097-85b0-cdcb3dbcef5e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter a.$q$, $q$[{"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false}, {"text": "a", "tile": {"kind": "letter", "value": "a"}, "is_correct": true}]$q$::jsonb, $q$a$q$, $q$Yes, that's little a! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e7d7fe8f-63c9-56c9-bb99-aee653451a81' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '31f9b2ad-2f9e-5097-85b0-cdcb3dbcef5e', 'e7d7fe8f-63c9-56c9-bb99-aee653451a81', array['no_dashes']::text[], $q$Added misconception tokens to 2 wrong choices; replaced the em dash in the solution with a comma.$q$
 where exists (select 1 from public.generated_questions where id = '31f9b2ad-2f9e-5097-85b0-cdcb3dbcef5e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4978230d-766b-56a1-9e29-5834fb27d7f1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter Z? Tap it.$q$, $q$[{"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false}, {"text": "Z", "tile": {"kind": "letter", "value": "Z"}, "is_correct": true}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false}]$q$::jsonb, $q$Z$q$, $q$That's Z, the very last letter! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'fef69164-4772-5e21-a811-d0ec67df5504' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4978230d-766b-56a1-9e29-5834fb27d7f1', 'fef69164-4772-5e21-a811-d0ec67df5504', array['no_dashes']::text[], $q$Added misconception tokens to 3 wrong choices; replaced the em dash in the solution with a comma.$q$
 where exists (select 1 from public.generated_questions where id = '4978230d-766b-56a1-9e29-5834fb27d7f1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '1d8992e4-88eb-5ac5-97ba-3402d975ebeb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which choice best states the main idea of the text?$q$, $q$[{"text": "Owls do their hunting during the day.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "Mice are the smartest of all animals.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "Owls have very large eyes.", "is_correct": false, "misconception_token": "detail-not-main-idea"}, {"text": "Owls have special features that make them skilled hunters at night.", "is_correct": true}]$q$::jsonb, $q$Owls have special features that make them skilled hunters at night.$q$, $q$The passage explains how owls' eyes and feathers make them good night hunters. That's the main idea. Large eyes are one detail, owls hunt at night (not day), and nothing is said about mice being smart.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'bca9167d-d5ef-58db-982f-c80dba9094a6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '1d8992e4-88eb-5ac5-97ba-3402d975ebeb', 'bca9167d-d5ef-58db-982f-c80dba9094a6', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = '1d8992e4-88eb-5ac5-97ba-3402d975ebeb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3bb80cb3-f567-5c4c-8a10-d1625dab900a', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How does Ravi help Jena?$q$, $q$[{"text": "He eats her lunch for her.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "He drives her home to get her lunch.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "He buys her a brand-new lunch.", "is_correct": false, "misconception_token": "plausible-but-unstated"}, {"text": "He shares his own food with her.", "is_correct": true}]$q$::jsonb, $q$He shares his own food with her.$q$, $q$Ravi shares his sandwich and apple with Jena. He does not buy lunch, take her home, or eat her lunch. She forgot hers.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '09499e5a-3262-5854-9c18-a844bd31bc3e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3bb80cb3-f567-5c4c-8a10-d1625dab900a', '09499e5a-3262-5854-9c18-a844bd31bc3e', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = '3bb80cb3-f567-5c4c-8a10-d1625dab900a')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f0dea936-2c79-5034-b694-7d770c6ffb22', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What does Biscuit do after chasing the ball?$q$, $q$[{"text": "He waits for Sam to go find the ball.", "is_correct": false, "misconception_token": "reverses-relationship"}, {"text": "He brings it back and drops it at Sam's feet.", "is_correct": true}, {"text": "He hides the ball somewhere in the yard.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "He chews the ball into little pieces.", "is_correct": false, "misconception_token": "plausible-but-unstated"}]$q$::jsonb, $q$He brings it back and drops it at Sam's feet.$q$, $q$The passage says Biscuit brings the ball back and drops it at Sam's feet. He doesn't hide or chew it, and Sam doesn't have to find it; Biscuit returns it.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '18f00b81-2ba3-5869-a6bb-a2dd722de89a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f0dea936-2c79-5034-b694-7d770c6ffb22', '18f00b81-2ba3-5869-a6bb-a2dd722de89a', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = 'f0dea936-2c79-5034-b694-7d770c6ffb22')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '37d29608-04a3-5b54-bc9c-29a6fc414c1e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What do Ana's actions show about her?$q$, $q$[{"text": "She is patient and willing to wait for good results.", "is_correct": true}, {"text": "She gives up easily when things are slow.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "She thinks the tree will never grow any fruit.", "is_correct": false, "misconception_token": "unsupported-inference"}, {"text": "She cares only about apples and nothing else.", "is_correct": false, "misconception_token": "out-of-scope"}]$q$::jsonb, $q$She is patient and willing to wait for good results.$q$, $q$Ana waited three years and kept watering, then shared the apples, which shows patience. She didn't give up, she kept caring for the tree (so she didn't think it hopeless), and 'cares only about apples' isn't supported.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7d4e4b91-02d3-5574-a8c2-527a2b30caea' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '37d29608-04a3-5b54-bc9c-29a6fc414c1e', '7d4e4b91-02d3-5574-a8c2-527a2b30caea', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = '37d29608-04a3-5b54-bc9c-29a6fc414c1e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a0795a3c-1ff3-5119-a3b9-f94f80302eac', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What do a camel's humps store?$q$, $q$[{"text": "Food that the camel finds along the way.", "is_correct": false, "misconception_token": "partly-right"}, {"text": "Water for the camel to drink later.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "Sand from the desert floor.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "Fat that the camel's body uses for energy.", "is_correct": true}]$q$::jsonb, $q$Fat that the camel's body uses for energy.$q$, $q$The humps store fat for energy, not water. They do not hold water, sand, or food. The stored fat is what the body uses when food is scarce.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b3d14201-0cce-562b-acd8-e9326035a88c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a0795a3c-1ff3-5119-a3b9-f94f80302eac', 'b3d14201-0cce-562b-acd8-e9326035a88c', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = 'a0795a3c-1ff3-5119-a3b9-f94f80302eac')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '39054859-d410-5199-a7d5-5ed044c2a85e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is the main lesson of Nadia's story?$q$, $q$[{"text": "Saving a little at a time can add up to something big.", "is_correct": true}, {"text": "Bicycles cost too much for anyone to buy.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "Birthdays are the best time to get gifts.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "You should never spend any of your money.", "is_correct": false, "misconception_token": "too-broad"}]$q$::jsonb, $q$Saving a little at a time can add up to something big.$q$, $q$Nadia saved half her allowance over months until she could buy the bike: saving a little adds up. She still spent some money, the bike was not unaffordable, and the lesson is not about birthdays.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c0ff8df0-9189-51de-9dcb-59f61fcd733d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '39054859-d410-5199-a7d5-5ed044c2a85e', 'c0ff8df0-9189-51de-9dcb-59f61fcd733d', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = '39054859-d410-5199-a7d5-5ed044c2a85e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd351b8b8-5453-56ef-9559-28ca2e171b37', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How does Rosa feel at the beginning of the story?$q$, $q$[{"text": "Angry at the judges.", "is_correct": false, "misconception_token": "plausible-but-unstated"}, {"text": "Nervous and unsure of herself.", "is_correct": true}, {"text": "Proud and confident.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "Bored and sleepy.", "is_correct": false, "misconception_token": "misreads-tone"}]$q$::jsonb, $q$Nervous and unsure of herself.$q$, $q$At the start, her shaking hands and doubt show Rosa is nervous and unsure. She is not bored, angry, or confident (confidence comes later).$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '191b14ab-0374-55e9-98f3-38dff2669a76' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd351b8b8-5453-56ef-9559-28ca2e171b37', '191b14ab-0374-55e9-98f3-38dff2669a76', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = 'd351b8b8-5453-56ef-9559-28ca2e171b37')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'beb91dae-a8ac-5651-96c0-8fe0db2fdf2b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How does Captain Lin solve her problem?$q$, $q$[{"text": "She sails farther out into the open sea.", "is_correct": false, "misconception_token": "reverses-relationship"}, {"text": "She jumps into the water and swims to shore.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "She steers to a nearby island and reaches a calm cove.", "is_correct": true}, {"text": "She waits for someone else to come rescue her.", "is_correct": false, "misconception_token": "plausible-but-unstated"}]$q$::jsonb, $q$She steers to a nearby island and reaches a calm cove.$q$, $q$She steers toward the island and into a calm cove before the storm. She does not swim, wait for rescue, or sail farther out. She heads to safety.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '26053bf4-2ec4-5f2e-9304-53c2139c9dd7' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'beb91dae-a8ac-5651-96c0-8fe0db2fdf2b', '26053bf4-2ec4-5f2e-9304-53c2139c9dd7', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = 'beb91dae-a8ac-5651-96c0-8fe0db2fdf2b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'afa9230b-4f97-5d8f-b5e7-74b5c14104e7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What does Jonah learn in the story?$q$, $q$[{"text": "He should never take care of any animal again.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "It is perfectly fine to break a promise.", "is_correct": false, "misconception_token": "reverses-relationship"}, {"text": "He should find a way to remember his responsibilities.", "is_correct": true}, {"text": "His mom should do all of his chores for him.", "is_correct": false, "misconception_token": "out-of-scope"}]$q$::jsonb, $q$He should find a way to remember his responsibilities.$q$, $q$Jonah decides to write a note so he will not forget again, so he learns to remember his responsibilities. He does not swear off animals, does not think breaking promises is fine, and does not hand his chores to his mom.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '42479890-a7c8-535e-86b0-a6cc5af41afc' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'afa9230b-4f97-5d8f-b5e7-74b5c14104e7', '42479890-a7c8-535e-86b0-a6cc5af41afc', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = 'afa9230b-4f97-5d8f-b5e7-74b5c14104e7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5c4778ad-c64a-5709-9676-d3df54f44b44', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What does the story mainly show about Lila?$q$, $q$[{"text": "She is kind and helps others without expecting a reward.", "is_correct": true}, {"text": "She only helps people who pay her.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "She dislikes reading out loud.", "is_correct": false, "misconception_token": "plausible-but-unstated"}, {"text": "She wants the old man's painting from the very start.", "is_correct": false, "misconception_token": "unsupported-inference"}]$q$::jsonb, $q$She is kind and helps others without expecting a reward.$q$, $q$Lila reads to her neighbor daily and asks for nothing, so she is kind and giving. She does not require payment, and she does not start out wanting the painting; it is a surprise.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '467f2424-f0ab-58ae-9b4f-cf5b4b598773' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5c4778ad-c64a-5709-9676-d3df54f44b44', '467f2424-f0ab-58ae-9b4f-cf5b4b598773', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = '5c4778ad-c64a-5709-9676-d3df54f44b44')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9a6ca477-6730-5c32-87c0-61244c497888', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is the weather like during the game?$q$, $q$[{"text": "So foggy that no one can see.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "Sunny and hot.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "Rainy and wet.", "is_correct": true}, {"text": "Cold and snowy.", "is_correct": false, "misconception_token": "plausible-but-unstated"}]$q$::jsonb, $q$Rainy and wet.$q$, $q$It is rainy and wet: the field is muddy and full of puddles. It is not sunny, snowy, or too foggy to see.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '6412e332-37f1-5bdc-8d1c-f5bd54fff3df' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9a6ca477-6730-5c32-87c0-61244c497888', '6412e332-37f1-5bdc-8d1c-f5bd54fff3df', array['no_dashes']::text[], $q$Replaced the em dash in the solution with other punctuation.$q$
 where exists (select 1 from public.generated_questions where id = '9a6ca477-6730-5c32-87c0-61244c497888')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ea9e8537-e691-5f72-88e5-ae909cfb76d2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Where does this story take place?$q$, $q$[{"text": "In a real cave.", "is_correct": false, "misconception_token": "plausible-but-unstated"}, {"text": "In the living room.", "is_correct": true}, {"text": "At school.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "Outside in the rain.", "is_correct": false, "misconception_token": "contradicts-text"}]$q$::jsonb, $q$In the living room.$q$, $q$The story happens in the living room, where they built the fort. Not at school, outside, or a real cave: the rain is outside the window.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '67921b24-9888-5076-ac4a-fcf8367644ed' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ea9e8537-e691-5f72-88e5-ae909cfb76d2', '67921b24-9888-5076-ac4a-fcf8367644ed', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = 'ea9e8537-e691-5f72-88e5-ae909cfb76d2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5dc5bae4-547a-564d-a556-9b741b4d6976', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How does Sanjay feel when he first stands up to speak?$q$, $q$[{"text": "Angry at the crowd.", "is_correct": false, "misconception_token": "plausible-but-unstated"}, {"text": "Calm and relaxed.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "Excited to show off.", "is_correct": false, "misconception_token": "misreads-tone"}, {"text": "Frozen with fear.", "is_correct": true}]$q$::jsonb, $q$Frozen with fear.$q$, $q$Sanjay freezes and the silence feels endless, so he is afraid at first. He is not calm, showing off, or angry. Relief comes only at the end.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '85ed45bb-e97c-52db-8240-747d66243ab5' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5dc5bae4-547a-564d-a556-9b741b4d6976', '85ed45bb-e97c-52db-8240-747d66243ab5', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = '5dc5bae4-547a-564d-a556-9b741b4d6976')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a0fc557b-7612-59bd-b27c-621edf83ecdb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is the problem in the story?$q$, $q$[{"text": "Theo cannot find his other shoe.", "is_correct": true}, {"text": "Theo is going to be late for school.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "His puppy has run away and is lost.", "is_correct": false, "misconception_token": "plausible-but-unstated"}, {"text": "Theo has far too many shoes.", "is_correct": false, "misconception_token": "contradicts-text"}]$q$::jsonb, $q$Theo cannot find his other shoe.$q$, $q$The problem is the missing shoe. His puppy is not lost, he is not late for school, and he does not have too many shoes. He is missing one.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '99ed9504-b6d3-5ea0-bdcf-8b2d34d98b81' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a0fc557b-7612-59bd-b27c-621edf83ecdb', '99ed9504-b6d3-5ea0-bdcf-8b2d34d98b81', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = 'a0fc557b-7612-59bd-b27c-621edf83ecdb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '608bae64-9064-54ab-a573-35ae693b97ae', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How is the problem in the story solved?$q$, $q$[{"text": "Mia climbs the tree and grabs the kite herself.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "Her brother uses a rope and a ball to shake the kite loose.", "is_correct": true}, {"text": "Mia buys a brand-new kite instead.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "The wind blows the kite down all on its own.", "is_correct": false, "misconception_token": "plausible-but-unstated"}]$q$::jsonb, $q$Her brother uses a rope and a ball to shake the kite loose.$q$, $q$Her brother's rope-and-ball trick shakes the kite loose, and that solves it. Mia does not climb up, the wind does not free it, and she does not buy a new one.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e80c8779-05ee-5933-8bfc-0cbfbdac81b2' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '608bae64-9064-54ab-a573-35ae693b97ae', 'e80c8779-05ee-5933-8bfc-0cbfbdac81b2', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = '608bae64-9064-54ab-a573-35ae693b97ae')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '57185aa5-438a-5235-a5f4-85cce4ee5f99', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'fearlessly' most nearly means:$q$, $q$[{"text": "with great fear.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "very carefully.", "is_correct": false, "misconception_token": "partly-right"}, {"text": "very quietly.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "without being afraid.", "is_correct": true}]$q$::jsonb, $q$without being afraid.$q$, $q$'Fearlessly' means without being afraid, matching the knight's valor. Careful is not the meaning, 'with great fear' is the opposite, and 'quietly' does not fit.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '064aaa10-f304-5c16-992e-080c820f0f3a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '57185aa5-438a-5235-a5f4-85cce4ee5f99', '064aaa10-f304-5c16-992e-080c820f0f3a', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = '57185aa5-438a-5235-a5f4-85cce4ee5f99')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f40887ab-6782-52ac-826a-4b2fca7e9f4b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'bland' most nearly means:$q$, $q$[{"text": "much too spicy.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "having little flavor.", "is_correct": true}, {"text": "frozen.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "very hot in temperature.", "is_correct": false, "misconception_token": "wrong-word-meaning"}]$q$::jsonb, $q$having little flavor.$q$, $q$Grandpa added flavor because the soup was bland, so it means having little flavor. It is the opposite of spicy, and it is not about temperature or being frozen.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '36c1326a-8c26-557b-a791-239ac7e42082' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f40887ab-6782-52ac-826a-4b2fca7e9f4b', '36c1326a-8c26-557b-a791-239ac7e42082', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = 'f40887ab-6782-52ac-826a-4b2fca7e9f4b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '93bca46a-2c53-55fe-ae7f-13bb747fb173', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'keen' most nearly means:$q$, $q$[{"text": "very loud.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "sharp and quick to notice.", "is_correct": true}, {"text": "eager to leave.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "dull and slow.", "is_correct": false, "misconception_token": "contradicts-text"}]$q$::jsonb, $q$sharp and quick to notice.$q$, $q$Her sharp eye caught what others missed, so 'keen' means sharp and quick to notice. It is not dull (the opposite) or loud, and the 'eager' meaning of keen does not fit here.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '48c0bcfd-5eeb-5214-9121-0800768769ea' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '93bca46a-2c53-55fe-ae7f-13bb747fb173', '48c0bcfd-5eeb-5214-9121-0800768769ea', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = '93bca46a-2c53-55fe-ae7f-13bb747fb173')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '82b237c5-710f-5c28-bd41-3080a63e8178', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'weary' most nearly means:$q$, $q$[{"text": "very tired.", "is_correct": true}, {"text": "hungry.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "full of energy.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "lost.", "is_correct": false, "misconception_token": "out-of-scope"}]$q$::jsonb, $q$very tired.$q$, $q$Aching legs and drooping eyes show 'weary' means very tired. It is not full of energy (the opposite), hungry, or lost.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '53a67b14-5e2c-5253-af54-ba3cf58e0fe6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '82b237c5-710f-5c28-bd41-3080a63e8178', '53a67b14-5e2c-5253-af54-ba3cf58e0fe6', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = '82b237c5-710f-5c28-bd41-3080a63e8178')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd67628b7-f622-507a-b5b9-1214eb9699ab', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'steady' most nearly means:$q$, $q$[{"text": "brand new.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "shaking and weak.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "calm and constant.", "is_correct": true}, {"text": "extremely loud.", "is_correct": false, "misconception_token": "partly-right"}]$q$::jsonb, $q$calm and constant.$q$, $q$Her steady voice kept the runners going, so 'steady' means calm and constant. It is not shaking, it describes constancy rather than loudness, and it has nothing to do with being new.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5503e7c2-27fc-5842-a8cd-7fe098d5555a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd67628b7-f622-507a-b5b9-1214eb9699ab', '5503e7c2-27fc-5842-a8cd-7fe098d5555a', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = 'd67628b7-f622-507a-b5b9-1214eb9699ab')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'bb9d7fdd-b928-5979-95e7-a1af6b75bd18', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'cautious' most nearly means:$q$, $q$[{"text": "careful to avoid danger.", "is_correct": true}, {"text": "careless and rushed.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "curious about the ice.", "is_correct": false, "misconception_token": "partly-right"}, {"text": "excited and cheerful.", "is_correct": false, "misconception_token": "out-of-scope"}]$q$::jsonb, $q$careful to avoid danger.$q$, $q$Testing each step and holding the railing shows 'cautious' means careful to avoid danger. It is the opposite of careless, is not about being cheerful, and means careful rather than merely curious.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '56fcb1ca-47c8-5b63-901f-5f13c8ba0bf4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'bb9d7fdd-b928-5979-95e7-a1af6b75bd18', '56fcb1ca-47c8-5b63-901f-5f13c8ba0bf4', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = 'bb9d7fdd-b928-5979-95e7-a1af6b75bd18')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '89fccb08-18d3-5275-9b04-dec96110c928', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'valor' most nearly means:$q$, $q$[{"text": "great wealth.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "great fear.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "great courage.", "is_correct": true}, {"text": "great speed.", "is_correct": false, "misconception_token": "out-of-scope"}]$q$::jsonb, $q$great courage.$q$, $q$The knight rode fearlessly into danger, so 'valor' means great courage. It is the opposite of fear and does not mean wealth or speed.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5f306707-c0b6-5887-915c-ce6cec0638d9' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '89fccb08-18d3-5275-9b04-dec96110c928', '5f306707-c0b6-5887-915c-ce6cec0638d9', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = '89fccb08-18d3-5275-9b04-dec96110c928')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b1214539-60f3-52e7-bb11-88130efc833b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'spotless' most nearly means:$q$, $q$[{"text": "covered in spots.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "brightly painted.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "perfectly clean.", "is_correct": true}, {"text": "very large.", "is_correct": false, "misconception_token": "out-of-scope"}]$q$::jsonb, $q$perfectly clean.$q$, $q$No crumb or speck of dust was left, so 'spotless' means perfectly clean. It is not covered in spots (the opposite), painted, or large.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '625a7daf-8fe7-5219-bd91-8f04c61a13fc' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b1214539-60f3-52e7-bb11-88130efc833b', '625a7daf-8fe7-5219-bd91-8f04c61a13fc', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = 'b1214539-60f3-52e7-bb11-88130efc833b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a7b83efd-8ecd-5553-bc32-8211205db078', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'generous' most nearly means:$q$, $q$[{"text": "very colorful.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "very tiny.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "giving very little.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "giving a lot.", "is_correct": true}]$q$::jsonb, $q$giving a lot.$q$, $q$Aunt Rosa gave more than expected, so 'generous' means giving a lot. It is the opposite of giving little, and it is not about color or size.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '6513528e-c1ef-559c-87a5-e2e88d846174' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a7b83efd-8ecd-5553-bc32-8211205db078', '6513528e-c1ef-559c-87a5-e2e88d846174', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = 'a7b83efd-8ecd-5553-bc32-8211205db078')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'bab57858-867f-5b60-b754-7db15c8d47e6', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'barren' most nearly means:$q$, $q$[{"text": "full of color.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "cold and icy.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "crowded with plants.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "empty and bare.", "is_correct": true}]$q$::jsonb, $q$empty and bare.$q$, $q$With no trees, grass, or water, 'barren' means empty and bare. It is the opposite of full of plants, and it does not mean icy or colorful.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '86552310-c6f6-502b-83cf-54d1a322c2a4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'bab57858-867f-5b60-b754-7db15c8d47e6', '86552310-c6f6-502b-83cf-54d1a322c2a4', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = 'bab57858-867f-5b60-b754-7db15c8d47e6')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5215909d-e919-5463-b506-2a9f3d6315a8', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, the phrase 'dead end' most nearly means:$q$, $q$[{"text": "a point where there is no way forward.", "is_correct": true}, {"text": "the end of a rope.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "an easy path straight to the answer.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "the death of a person.", "is_correct": false, "misconception_token": "wrong-word-meaning"}]$q$::jsonb, $q$a point where there is no way forward.$q$, $q$Clues leading to a 'dead end' means they went nowhere, with no way forward. It does not refer to a real death or a rope, and it is the opposite of an easy path.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '86ad1c16-5bae-531e-9244-2d4c286c4135' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5215909d-e919-5463-b506-2a9f3d6315a8', '86ad1c16-5bae-531e-9244-2d4c286c4135', array['no_dashes', 'stem_ends']::text[], $q$Replaced the dash in the solution; added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = '5215909d-e919-5463-b506-2a9f3d6315a8')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'db3e2f30-e5a3-5b3e-bd0c-7193197d6c3b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'observation' most nearly means:$q$, $q$[{"text": "something noticed by watching closely.", "is_correct": true}, {"text": "a rule that must be followed.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "a loud complaint.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "a wild guess.", "is_correct": false, "misconception_token": "contradicts-text"}]$q$::jsonb, $q$something noticed by watching closely.$q$, $q$The observation was what she noticed by watching the plants, so it means something seen by close watching. It is not a rule, a complaint, or a guess. She took careful notes.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8aa1c894-b3f5-5345-9053-c516480258f7' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'db3e2f30-e5a3-5b3e-bd0c-7193197d6c3b', '8aa1c894-b3f5-5345-9053-c516480258f7', array['no_dashes', 'stem_ends']::text[], $q$Replaced the dash in the solution; added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = 'db3e2f30-e5a3-5b3e-bd0c-7193197d6c3b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4c31beb7-a838-578b-b0b2-c0a884658e30', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'vague' most nearly means:$q$, $q$[{"text": "unclear.", "is_correct": true}, {"text": "very detailed.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "loud.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "colorful.", "is_correct": false, "misconception_token": "out-of-scope"}]$q$::jsonb, $q$unclear.$q$, $q$The instructions did not say how much or how long, so 'vague' means unclear. It is the opposite of detailed, and it is not about color or sound.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '94872b83-ef4f-5822-a80b-e1ceae324171' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4c31beb7-a838-578b-b0b2-c0a884658e30', '94872b83-ef4f-5822-a80b-e1ceae324171', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = '4c31beb7-a838-578b-b0b2-c0a884658e30')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '52e069e2-23c4-58eb-b06b-74cd22dfddc0', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'timid' most nearly means:$q$, $q$[{"text": "bold and friendly.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "playful.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "hungry.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "shy and easily frightened.", "is_correct": true}]$q$::jsonb, $q$shy and easily frightened.$q$, $q$The puppy hid from strangers, so 'timid' means shy and easily frightened. 'Bold and friendly' is the opposite, and hungry and playful do not fit.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a7bb8ca8-6b8c-5237-b9dd-57a867db39b9' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '52e069e2-23c4-58eb-b06b-74cd22dfddc0', 'a7bb8ca8-6b8c-5237-b9dd-57a867db39b9', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = '52e069e2-23c4-58eb-b06b-74cd22dfddc0')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'cc1d3047-6d14-557e-8373-943dd137ca55', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'sincere' most nearly means:$q$, $q$[{"text": "truly meant and honest.", "is_correct": true}, {"text": "very quiet.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "polite but not really meant.", "is_correct": false, "misconception_token": "partly-right"}, {"text": "fake and pretend.", "is_correct": false, "misconception_token": "contradicts-text"}]$q$::jsonb, $q$truly meant and honest.$q$, $q$She truly meant every word, so 'sincere' means honest and heartfelt. It is the opposite of fake, is not about being quiet, and the passage says she was more than just polite.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a918f472-1235-5042-acbc-1ae7a25ecba6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'cc1d3047-6d14-557e-8373-943dd137ca55', 'a918f472-1235-5042-acbc-1ae7a25ecba6', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = 'cc1d3047-6d14-557e-8373-943dd137ca55')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'aa2673f9-093a-5b4f-a3e2-7be046198a69', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'urged' most nearly means:$q$, $q$[{"text": "gently carried.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "quietly ignored.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "strongly encouraged.", "is_correct": true}, {"text": "carefully measured.", "is_correct": false, "misconception_token": "out-of-scope"}]$q$::jsonb, $q$strongly encouraged.$q$, $q$The coach pushed the runners to keep going, so 'urged' means strongly encouraged. She did not ignore them, carry them, or measure them.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b3eedfd4-6bb8-5f5e-992a-66d95ee4ecc3' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'aa2673f9-093a-5b4f-a3e2-7be046198a69', 'b3eedfd4-6bb8-5f5e-992a-66d95ee4ecc3', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = 'aa2673f9-093a-5b4f-a3e2-7be046198a69')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ec4a2ed2-ef4d-5db7-ad55-e8fe89922659', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'persistent' most nearly means:$q$, $q$[{"text": "friendly.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "quick to quit.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "very forgetful.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "refusing to give up.", "is_correct": true}]$q$::jsonb, $q$refusing to give up.$q$, $q$The detective kept working night after night, so 'persistent' means refusing to give up. It is the opposite of quitting and does not mean forgetful or friendly.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'bce27bfa-60e8-5abe-bee1-ab6ddd796b63' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ec4a2ed2-ef4d-5db7-ad55-e8fe89922659', 'bce27bfa-60e8-5abe-bee1-ab6ddd796b63', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = 'ec4a2ed2-ef4d-5db7-ad55-e8fe89922659')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '8f028df6-2257-568f-86e7-ac5e47a03efa', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'enormous' most nearly means:$q$, $q$[{"text": "very old.", "is_correct": false, "misconception_token": "out-of-scope"}, {"text": "very small.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "very large.", "is_correct": true}, {"text": "very quiet.", "is_correct": false, "misconception_token": "wrong-word-meaning"}]$q$::jsonb, $q$very large.$q$, $q$The crowd filled the streets for blocks, so 'enormous' means very large. It is the opposite of small and does not mean quiet or old.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c1aa8d5f-8d08-551b-988a-b92ba9371344' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '8f028df6-2257-568f-86e7-ac5e47a03efa', 'c1aa8d5f-8d08-551b-988a-b92ba9371344', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = '8f028df6-2257-568f-86e7-ac5e47a03efa')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '587edfcd-965d-5906-bb77-a153949b988c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'swelled' most nearly means:$q$, $q$[{"text": "dried up.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "hurt and ached.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "grew larger.", "is_correct": true}, {"text": "froze solid.", "is_correct": false, "misconception_token": "out-of-scope"}]$q$::jsonb, $q$grew larger.$q$, $q$The stream became a wide river, so 'swelled' means grew larger. It did not dry up (the opposite); the 'ache' meaning of swell and 'froze' do not fit.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'cf99e3ed-20f2-50e1-a7f8-abd5cb89c8eb' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '587edfcd-965d-5906-bb77-a153949b988c', 'cf99e3ed-20f2-50e1-a7f8-abd5cb89c8eb', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = '587edfcd-965d-5906-bb77-a153949b988c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '17a53948-0e77-5ac1-a29d-a17225ced979', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$As used in the passage, 'fragile' most nearly means:$q$, $q$[{"text": "strong and safe.", "is_correct": false, "misconception_token": "contradicts-text"}, {"text": "easily broken.", "is_correct": true}, {"text": "very heavy.", "is_correct": false, "misconception_token": "wrong-word-meaning"}, {"text": "brightly colored.", "is_correct": false, "misconception_token": "out-of-scope"}]$q$::jsonb, $q$easily broken.$q$, $q$The bridge could crack from a small push, so 'fragile' means easily broken. It does not mean heavy or colorful, and 'strong and safe' is the opposite.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e6e7245f-0881-5c7a-8c4e-6cd6fb19ee09' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '17a53948-0e77-5ac1-a29d-a17225ced979', 'e6e7245f-0881-5c7a-8c4e-6cd6fb19ee09', array['stem_ends']::text[], $q$Added a colon to end the stem.$q$
 where exists (select 1 from public.generated_questions where id = '17a53948-0e77-5ac1-a29d-a17225ced979')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '2ec7aa5a-7d83-5ac0-95fb-b66ec9f22fd5', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$For the experiment, each group will ______ a beaker, a thermometer, and a stopwatch.$q$, $q$[{"text": "need", "is_correct": true}, {"text": "need;", "is_correct": false, "misconception_token": "semicolon-misused"}, {"text": "need,", "is_correct": false, "misconception_token": "unnecessary-comma"}, {"text": "need:", "is_correct": false, "misconception_token": "colon-after-incomplete-clause"}]$q$::jsonb, $q$need$q$, $q$A colon can't follow a verb like "need," because the words before a colon must form a complete sentence. Here the list is the verb's object, so no mark is needed.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '755ed808-2653-5713-a874-e5865d5dd892' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '2ec7aa5a-7d83-5ac0-95fb-b66ec9f22fd5', '755ed808-2653-5713-a874-e5865d5dd892', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = '2ec7aa5a-7d83-5ac0-95fb-b66ec9f22fd5')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'acc730ca-61f3-5040-8634-4cd1824b4ad7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$The mentor ______ the students admired most had once been a struggling student herself.$q$, $q$[{"text": "which", "is_correct": false, "misconception_token": "which-for-person"}, {"text": "who", "is_correct": false, "misconception_token": "wrong-pronoun-case"}, {"text": "whose", "is_correct": false, "misconception_token": "wrong-pronoun-type"}, {"text": "whom", "is_correct": true}]$q$::jsonb, $q$whom$q$, $q$"The students admired [whom]": the pronoun is the object of "admired," so "whom." "Who" is a subject form, "which" is for things, and "whose" shows possession.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '2c0f9b4f-abd1-5e8b-93de-3dd9d25227ba' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'acc730ca-61f3-5040-8634-4cd1824b4ad7', '2c0f9b4f-abd1-5e8b-93de-3dd9d25227ba', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = 'acc730ca-61f3-5040-8634-4cd1824b4ad7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '2f7f64e1-a75e-55e7-a624-fd73814b8bc1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$The award for best design went to ______ students who had stayed late every night.$q$, $q$[{"text": "us", "is_correct": true}, {"text": "ourselves", "is_correct": false, "misconception_token": "reflexive-misuse"}, {"text": "our", "is_correct": false, "misconception_token": "wrong-pronoun-type"}, {"text": "we", "is_correct": false, "misconception_token": "wrong-pronoun-case"}]$q$::jsonb, $q$us$q$, $q$"To us students": after the preposition "to," use the object pronoun "us." "We" is a subject form, "ourselves" is reflexive, and "our" is possessive.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '347b697b-5012-565f-8824-63d8079ebaa2' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '2f7f64e1-a75e-55e7-a624-fd73814b8bc1', '347b697b-5012-565f-8824-63d8079ebaa2', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = '2f7f64e1-a75e-55e7-a624-fd73814b8bc1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '853b0f5c-9b27-55ec-b898-f2668a168acd', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$The scientist ______ the committee selected for the grant had studied glaciers for over a decade.$q$, $q$[{"text": "which", "is_correct": false, "misconception_token": "which-for-person"}, {"text": "whom", "is_correct": true}, {"text": "what", "is_correct": false, "misconception_token": "wrong-pronoun-type"}, {"text": "who", "is_correct": false, "misconception_token": "wrong-pronoun-case"}]$q$::jsonb, $q$whom$q$, $q$"The committee selected [whom]": the pronoun is the object of "selected," so "whom" is correct. "Who" is a subject pronoun, and "which"/"what" don't refer to a person.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '6a880dc8-27d9-5712-82e0-08e06abd9b35' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '853b0f5c-9b27-55ec-b898-f2668a168acd', '6a880dc8-27d9-5712-82e0-08e06abd9b35', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = '853b0f5c-9b27-55ec-b898-f2668a168acd')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f277612c-5810-5595-af51-acefb1cc0849', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$The novelist ______ the critics had once dismissed became the most celebrated writer of her generation.$q$, $q$[{"text": "whom", "is_correct": true}, {"text": "who", "is_correct": false, "misconception_token": "wrong-pronoun-case"}, {"text": "what", "is_correct": false, "misconception_token": "wrong-pronoun-type"}, {"text": "which", "is_correct": false, "misconception_token": "which-for-person"}]$q$::jsonb, $q$whom$q$, $q$"The critics had once dismissed [whom]": object of "dismissed," so "whom." "Who" is a subject form, "which" is for things, and "what" does not refer to a person.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '701190bb-2e87-5334-acd4-0e97db19198b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f277612c-5810-5595-af51-acefb1cc0849', '701190bb-2e87-5334-acd4-0e97db19198b', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = 'f277612c-5810-5595-af51-acefb1cc0849')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '58e53034-690c-506f-8319-3c24e1430c59', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$The old ______ which has guided ships for over a century, will finally be restored this year.$q$, $q$[{"text": "lighthouse:", "is_correct": false, "misconception_token": "colon-needs-complete-clause"}, {"text": "lighthouse", "is_correct": false, "misconception_token": "missing-comma"}, {"text": "lighthouse,", "is_correct": true}, {"text": "lighthouse;", "is_correct": false, "misconception_token": "semicolon-misused"}]$q$::jsonb, $q$lighthouse,$q$, $q$The "which" clause adds nonessential information, so it is set off with commas, so a comma opens it after "lighthouse."$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '945f9586-8f24-52f2-9eff-07c2136967a6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '58e53034-690c-506f-8319-3c24e1430c59', '945f9586-8f24-52f2-9eff-07c2136967a6', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = '58e53034-690c-506f-8319-3c24e1430c59')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '27d65cd1-802d-5816-8d03-aa75c953a253', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$The committee ______ its final recommendations to the school board on Friday.$q$, $q$[{"text": "presents", "is_correct": true}, {"text": "presenting", "is_correct": false, "misconception_token": "nonfinite-verb"}, {"text": "present", "is_correct": false, "misconception_token": "treated-collective-as-plural"}, {"text": "to present", "is_correct": false, "misconception_token": "used-infinitive"}]$q$::jsonb, $q$presents$q$, $q$A collective noun like "committee" acting as one unit takes a singular verb (and "its" confirms it), so "presents" is correct.$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'acfb56cf-8a9c-513d-a723-46e561601118' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '27d65cd1-802d-5816-8d03-aa75c953a253', 'acfb56cf-8a9c-513d-a723-46e561601118', array['no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = '27d65cd1-802d-5816-8d03-aa75c953a253')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

commit;
