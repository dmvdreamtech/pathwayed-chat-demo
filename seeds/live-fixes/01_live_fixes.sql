-- ===========================================================================
-- seeds/live-fixes/01_live_fixes.sql  (part 1 of 2; generated, do not edit)
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
select '93e5ade5-4264-5ec9-b4ba-d9ac2f0d9f33', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 46 plus 27? Tap the answer.$q$, $q$[{"text": "73", "tile": {"kind": "number", "value": "73"}, "is_correct": true}, {"text": "72", "tile": {"kind": "number", "value": "72"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "74", "tile": {"kind": "number", "value": "74"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "63", "tile": {"kind": "number", "value": "63"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}]$q$::jsonb, $q$73$q$, $q$46 plus 27 is 73! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '077be90d-3427-5902-b0e8-534ebe281f02' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '93e5ade5-4264-5ec9-b4ba-d9ac2f0d9f33', '077be90d-3427-5902-b0e8-534ebe281f02', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '93e5ade5-4264-5ec9-b4ba-d9ac2f0d9f33')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '93c5a63f-75ce-5702-b127-18dcb4c8423d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 28 plus 15? Tap the answer.$q$, $q$[{"text": "44", "tile": {"kind": "number", "value": "44"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "33", "tile": {"kind": "number", "value": "33"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}, {"text": "43", "tile": {"kind": "number", "value": "43"}, "is_correct": true}, {"text": "42", "tile": {"kind": "number", "value": "42"}, "is_correct": false, "misconception_token": "counted-one-short"}]$q$::jsonb, $q$43$q$, $q$28 plus 15 is 43! Great regrouping!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '106e3826-6073-5955-9ed6-6fb883d0795e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '93c5a63f-75ce-5702-b127-18dcb4c8423d', '106e3826-6073-5955-9ed6-6fb883d0795e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '93c5a63f-75ce-5702-b127-18dcb4c8423d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c7a90a34-4329-5376-bb01-109b2904efb2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 27 plus 12? Tap the answer.$q$, $q$[{"text": "49", "tile": {"kind": "number", "value": "49"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}, {"text": "38", "tile": {"kind": "number", "value": "38"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "39", "tile": {"kind": "number", "value": "39"}, "is_correct": true}, {"text": "29", "tile": {"kind": "number", "value": "29"}, "is_correct": false, "misconception_token": "dropped-a-ten"}]$q$::jsonb, $q$39$q$, $q$27 plus 12 is 39! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '1eb2d4db-0daa-57b2-8000-d724a55893ee' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c7a90a34-4329-5376-bb01-109b2904efb2', '1eb2d4db-0daa-57b2-8000-d724a55893ee', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c7a90a34-4329-5376-bb01-109b2904efb2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '25cbd0c3-db9c-5899-b0f4-9cb8f03359cf', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 58 plus 14? Tap the answer.$q$, $q$[{"text": "72", "tile": {"kind": "number", "value": "72"}, "is_correct": true}, {"text": "62", "tile": {"kind": "number", "value": "62"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}, {"text": "73", "tile": {"kind": "number", "value": "73"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "71", "tile": {"kind": "number", "value": "71"}, "is_correct": false, "misconception_token": "counted-one-short"}]$q$::jsonb, $q$72$q$, $q$58 plus 14 is 72! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '240269b9-b421-5434-a574-07952e1f0781' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '25cbd0c3-db9c-5899-b0f4-9cb8f03359cf', '240269b9-b421-5434-a574-07952e1f0781', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '25cbd0c3-db9c-5899-b0f4-9cb8f03359cf')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c8d15856-321a-5dd5-b3c6-befc895f557a', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 53 plus 24? Tap the answer.$q$, $q$[{"text": "77", "tile": {"kind": "number", "value": "77"}, "is_correct": true}, {"text": "76", "tile": {"kind": "number", "value": "76"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "87", "tile": {"kind": "number", "value": "87"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}, {"text": "67", "tile": {"kind": "number", "value": "67"}, "is_correct": false, "misconception_token": "dropped-a-ten"}]$q$::jsonb, $q$77$q$, $q$53 plus 24 is 77! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '29b54bbf-7af2-5c54-af97-942101b40de4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c8d15856-321a-5dd5-b3c6-befc895f557a', '29b54bbf-7af2-5c54-af97-942101b40de4', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c8d15856-321a-5dd5-b3c6-befc895f557a')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '480c76d0-722e-532d-99bb-31c3a4020a6b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 26 plus 49? Tap the answer.$q$, $q$[{"text": "74", "tile": {"kind": "number", "value": "74"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "65", "tile": {"kind": "number", "value": "65"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}, {"text": "76", "tile": {"kind": "number", "value": "76"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "75", "tile": {"kind": "number", "value": "75"}, "is_correct": true}]$q$::jsonb, $q$75$q$, $q$26 plus 49 is 75! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '2e03fb98-dbf7-58de-9fca-e0866d1df1d4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '480c76d0-722e-532d-99bb-31c3a4020a6b', '2e03fb98-dbf7-58de-9fca-e0866d1df1d4', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '480c76d0-722e-532d-99bb-31c3a4020a6b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b338933e-9f02-5d05-8881-49f638a2e22c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 25 plus 25? Tap the answer.$q$, $q$[{"text": "60", "tile": {"kind": "number", "value": "60"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}, {"text": "49", "tile": {"kind": "number", "value": "49"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "50", "tile": {"kind": "number", "value": "50"}, "is_correct": true}, {"text": "40", "tile": {"kind": "number", "value": "40"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}]$q$::jsonb, $q$50$q$, $q$25 plus 25 is 50! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '34418548-3505-5179-87ff-3f9c48458769' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b338933e-9f02-5d05-8881-49f638a2e22c', '34418548-3505-5179-87ff-3f9c48458769', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'b338933e-9f02-5d05-8881-49f638a2e22c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ed0cd59e-14be-5b64-a7ec-638c42b656be', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 35 plus 29? Tap the answer.$q$, $q$[{"text": "54", "tile": {"kind": "number", "value": "54"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}, {"text": "63", "tile": {"kind": "number", "value": "63"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "64", "tile": {"kind": "number", "value": "64"}, "is_correct": true}, {"text": "65", "tile": {"kind": "number", "value": "65"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$64$q$, $q$35 plus 29 is 64! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '3acb5395-97e3-593a-bc9c-7faaa1fb3d3b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ed0cd59e-14be-5b64-a7ec-638c42b656be', '3acb5395-97e3-593a-bc9c-7faaa1fb3d3b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ed0cd59e-14be-5b64-a7ec-638c42b656be')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9c55e46d-a74e-58dd-b33c-725aef7e2157', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 37 plus 18? Tap the answer.$q$, $q$[{"text": "56", "tile": {"kind": "number", "value": "56"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "45", "tile": {"kind": "number", "value": "45"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}, {"text": "54", "tile": {"kind": "number", "value": "54"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "55", "tile": {"kind": "number", "value": "55"}, "is_correct": true}]$q$::jsonb, $q$55$q$, $q$37 plus 18 is 55! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5a8dffc8-fa68-5a60-96e0-793612ae8c36' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9c55e46d-a74e-58dd-b33c-725aef7e2157', '5a8dffc8-fa68-5a60-96e0-793612ae8c36', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '9c55e46d-a74e-58dd-b33c-725aef7e2157')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '54e37cb2-e138-520b-bb94-27b32c49f466', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 18 plus 18? Tap the answer.$q$, $q$[{"text": "36", "tile": {"kind": "number", "value": "36"}, "is_correct": true}, {"text": "37", "tile": {"kind": "number", "value": "37"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "35", "tile": {"kind": "number", "value": "35"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "26", "tile": {"kind": "number", "value": "26"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}]$q$::jsonb, $q$36$q$, $q$18 plus 18 is 36! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5e79f6d2-0f66-52b6-9c82-e4f2a224cd3a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '54e37cb2-e138-520b-bb94-27b32c49f466', '5e79f6d2-0f66-52b6-9c82-e4f2a224cd3a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '54e37cb2-e138-520b-bb94-27b32c49f466')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '853f403a-e7d2-5886-984a-25a8525a0d39', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 64 plus 28? Tap the answer.$q$, $q$[{"text": "91", "tile": {"kind": "number", "value": "91"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "92", "tile": {"kind": "number", "value": "92"}, "is_correct": true}, {"text": "82", "tile": {"kind": "number", "value": "82"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}, {"text": "93", "tile": {"kind": "number", "value": "93"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$92$q$, $q$64 plus 28 is 92! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7283cf8b-19ca-5271-bb88-73c25402726b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '853f403a-e7d2-5886-984a-25a8525a0d39', '7283cf8b-19ca-5271-bb88-73c25402726b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '853f403a-e7d2-5886-984a-25a8525a0d39')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0c97c645-32aa-555e-9760-775ce94745b2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 45 plus 14? Tap the answer.$q$, $q$[{"text": "49", "tile": {"kind": "number", "value": "49"}, "is_correct": false, "misconception_token": "dropped-a-ten"}, {"text": "69", "tile": {"kind": "number", "value": "69"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}, {"text": "58", "tile": {"kind": "number", "value": "58"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "59", "tile": {"kind": "number", "value": "59"}, "is_correct": true}]$q$::jsonb, $q$59$q$, $q$45 plus 14 is 59! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7d1b811f-902e-5d13-ab5f-55c65f251980' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0c97c645-32aa-555e-9760-775ce94745b2', '7d1b811f-902e-5d13-ab5f-55c65f251980', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '0c97c645-32aa-555e-9760-775ce94745b2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3898f186-8813-51be-b055-19032f3b278c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 42 plus 16? Tap the answer.$q$, $q$[{"text": "68", "tile": {"kind": "number", "value": "68"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}, {"text": "58", "tile": {"kind": "number", "value": "58"}, "is_correct": true}, {"text": "48", "tile": {"kind": "number", "value": "48"}, "is_correct": false, "misconception_token": "dropped-a-ten"}, {"text": "57", "tile": {"kind": "number", "value": "57"}, "is_correct": false, "misconception_token": "counted-one-short"}]$q$::jsonb, $q$58$q$, $q$42 plus 16 is 58! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7f5ee9ce-3481-58a6-86e2-8a51ad7ee00b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3898f186-8813-51be-b055-19032f3b278c', '7f5ee9ce-3481-58a6-86e2-8a51ad7ee00b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '3898f186-8813-51be-b055-19032f3b278c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '246e5ccb-bd76-5410-a266-1595da86b416', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 50 plus 25? Tap the answer.$q$, $q$[{"text": "74", "tile": {"kind": "number", "value": "74"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "85", "tile": {"kind": "number", "value": "85"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}, {"text": "75", "tile": {"kind": "number", "value": "75"}, "is_correct": true}, {"text": "65", "tile": {"kind": "number", "value": "65"}, "is_correct": false, "misconception_token": "dropped-a-ten"}]$q$::jsonb, $q$75$q$, $q$50 plus 25 is 75! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '825405e6-2ceb-594f-a1e6-48338bdb1cda' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '246e5ccb-bd76-5410-a266-1595da86b416', '825405e6-2ceb-594f-a1e6-48338bdb1cda', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '246e5ccb-bd76-5410-a266-1595da86b416')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd673adb6-b40c-50bf-b642-fd8ac4935935', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 34 plus 23? Tap the answer.$q$, $q$[{"text": "47", "tile": {"kind": "number", "value": "47"}, "is_correct": false, "misconception_token": "dropped-a-ten"}, {"text": "56", "tile": {"kind": "number", "value": "56"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "57", "tile": {"kind": "number", "value": "57"}, "is_correct": true}, {"text": "67", "tile": {"kind": "number", "value": "67"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}]$q$::jsonb, $q$57$q$, $q$34 plus 23 is 57! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '86e0390d-1dce-5978-bd0d-d8ae83e0a816' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd673adb6-b40c-50bf-b642-fd8ac4935935', '86e0390d-1dce-5978-bd0d-d8ae83e0a816', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'd673adb6-b40c-50bf-b642-fd8ac4935935')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9df567fa-c2c9-5d88-9f48-03500e70a776', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 33 plus 33? Tap the answer.$q$, $q$[{"text": "76", "tile": {"kind": "number", "value": "76"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}, {"text": "65", "tile": {"kind": "number", "value": "65"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "56", "tile": {"kind": "number", "value": "56"}, "is_correct": false, "misconception_token": "dropped-a-ten"}, {"text": "66", "tile": {"kind": "number", "value": "66"}, "is_correct": true}]$q$::jsonb, $q$66$q$, $q$33 plus 33 is 66! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '886bc358-61a6-5867-b8f8-258527584ff0' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9df567fa-c2c9-5d88-9f48-03500e70a776', '886bc358-61a6-5867-b8f8-258527584ff0', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '9df567fa-c2c9-5d88-9f48-03500e70a776')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0f974f16-094f-5a45-b83b-b865a6289143', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 24 plus 13? Tap the answer.$q$, $q$[{"text": "27", "tile": {"kind": "number", "value": "27"}, "is_correct": false, "misconception_token": "dropped-a-ten"}, {"text": "37", "tile": {"kind": "number", "value": "37"}, "is_correct": true}, {"text": "36", "tile": {"kind": "number", "value": "36"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "47", "tile": {"kind": "number", "value": "47"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}]$q$::jsonb, $q$37$q$, $q$24 plus 13 is 37! Nice adding!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8cd8792f-b4bd-57de-9bb4-ff71619161ef' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0f974f16-094f-5a45-b83b-b865a6289143', '8cd8792f-b4bd-57de-9bb4-ff71619161ef', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '0f974f16-094f-5a45-b83b-b865a6289143')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '6de0ff9a-6f92-509d-a860-99f039a29983', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 16 plus 22? Tap the answer.$q$, $q$[{"text": "38", "tile": {"kind": "number", "value": "38"}, "is_correct": true}, {"text": "37", "tile": {"kind": "number", "value": "37"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "28", "tile": {"kind": "number", "value": "28"}, "is_correct": false, "misconception_token": "dropped-a-ten"}, {"text": "48", "tile": {"kind": "number", "value": "48"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}]$q$::jsonb, $q$38$q$, $q$16 plus 22 is 38! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '9cd47af5-62e6-57e0-bbf4-797b8adc412b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '6de0ff9a-6f92-509d-a860-99f039a29983', '9cd47af5-62e6-57e0-bbf4-797b8adc412b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '6de0ff9a-6f92-509d-a860-99f039a29983')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'cc8fb01e-aa5d-543d-b24d-10227becb7a9', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 55 plus 27? Tap the answer.$q$, $q$[{"text": "82", "tile": {"kind": "number", "value": "82"}, "is_correct": true}, {"text": "72", "tile": {"kind": "number", "value": "72"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}, {"text": "83", "tile": {"kind": "number", "value": "83"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "81", "tile": {"kind": "number", "value": "81"}, "is_correct": false, "misconception_token": "counted-one-short"}]$q$::jsonb, $q$82$q$, $q$55 plus 27 is 82! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a28d4934-12f8-57bc-8e8f-8ac23b56a56b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'cc8fb01e-aa5d-543d-b24d-10227becb7a9', 'a28d4934-12f8-57bc-8e8f-8ac23b56a56b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'cc8fb01e-aa5d-543d-b24d-10227becb7a9')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '27558da6-0d06-5088-a3b3-0b7d0698b620', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 20 plus 30? Tap the answer.$q$, $q$[{"text": "40", "tile": {"kind": "number", "value": "40"}, "is_correct": false, "misconception_token": "dropped-a-ten"}, {"text": "51", "tile": {"kind": "number", "value": "51"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "60", "tile": {"kind": "number", "value": "60"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}, {"text": "50", "tile": {"kind": "number", "value": "50"}, "is_correct": true}]$q$::jsonb, $q$50$q$, $q$20 plus 30 is 50! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a624ddb5-7c43-55d6-abd8-0c719a524403' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '27558da6-0d06-5088-a3b3-0b7d0698b620', 'a624ddb5-7c43-55d6-abd8-0c719a524403', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '27558da6-0d06-5088-a3b3-0b7d0698b620')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3aaba5c1-054a-504c-bb24-8f423f0682bf', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 47 plus 38? Tap the answer.$q$, $q$[{"text": "85", "tile": {"kind": "number", "value": "85"}, "is_correct": true}, {"text": "84", "tile": {"kind": "number", "value": "84"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "86", "tile": {"kind": "number", "value": "86"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "75", "tile": {"kind": "number", "value": "75"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}]$q$::jsonb, $q$85$q$, $q$47 plus 38 is 85! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a8e0de8d-96a4-5d75-a6a0-11aa0da72605' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3aaba5c1-054a-504c-bb24-8f423f0682bf', 'a8e0de8d-96a4-5d75-a6a0-11aa0da72605', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '3aaba5c1-054a-504c-bb24-8f423f0682bf')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7ba5f241-598f-5f1c-b8b2-ec740e8462a3', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 31 plus 25? Tap the answer.$q$, $q$[{"text": "56", "tile": {"kind": "number", "value": "56"}, "is_correct": true}, {"text": "66", "tile": {"kind": "number", "value": "66"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}, {"text": "55", "tile": {"kind": "number", "value": "55"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "46", "tile": {"kind": "number", "value": "46"}, "is_correct": false, "misconception_token": "dropped-a-ten"}]$q$::jsonb, $q$56$q$, $q$31 plus 25 is 56! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a927b21a-bf8e-5dd1-bf62-85c42013c21e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7ba5f241-598f-5f1c-b8b2-ec740e8462a3', 'a927b21a-bf8e-5dd1-bf62-85c42013c21e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7ba5f241-598f-5f1c-b8b2-ec740e8462a3')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '70d17628-67ba-59ea-87d2-462919e2716b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 39 plus 43? Tap the answer.$q$, $q$[{"text": "82", "tile": {"kind": "number", "value": "82"}, "is_correct": true}, {"text": "72", "tile": {"kind": "number", "value": "72"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}, {"text": "83", "tile": {"kind": "number", "value": "83"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "81", "tile": {"kind": "number", "value": "81"}, "is_correct": false, "misconception_token": "counted-one-short"}]$q$::jsonb, $q$82$q$, $q$39 plus 43 is 82! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b781418d-5ad5-519f-aedf-10a8cefacb09' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '70d17628-67ba-59ea-87d2-462919e2716b', 'b781418d-5ad5-519f-aedf-10a8cefacb09', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '70d17628-67ba-59ea-87d2-462919e2716b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '619af2bf-51cc-5bcd-bec4-88c95fe13b90', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 60 plus 35? Tap the answer.$q$, $q$[{"text": "95", "tile": {"kind": "number", "value": "95"}, "is_correct": true}, {"text": "94", "tile": {"kind": "number", "value": "94"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "85", "tile": {"kind": "number", "value": "85"}, "is_correct": false, "misconception_token": "dropped-a-ten"}, {"text": "96", "tile": {"kind": "number", "value": "96"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$95$q$, $q$60 plus 35 is 95! Great adding!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ccf7b176-01c4-5a29-9d59-39575e3135af' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '619af2bf-51cc-5bcd-bec4-88c95fe13b90', 'ccf7b176-01c4-5a29-9d59-39575e3135af', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '619af2bf-51cc-5bcd-bec4-88c95fe13b90')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3af625e1-f036-5df0-aef9-6fbcc6a516db', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 29 plus 26? Tap the answer.$q$, $q$[{"text": "54", "tile": {"kind": "number", "value": "54"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "56", "tile": {"kind": "number", "value": "56"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "45", "tile": {"kind": "number", "value": "45"}, "is_correct": false, "misconception_token": "forgot-to-carry-the-ten"}, {"text": "55", "tile": {"kind": "number", "value": "55"}, "is_correct": true}]$q$::jsonb, $q$55$q$, $q$29 plus 26 is 55! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e7c654ec-ab3a-585e-8d45-1a88c2f376f7' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3af625e1-f036-5df0-aef9-6fbcc6a516db', 'e7c654ec-ab3a-585e-8d45-1a88c2f376f7', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '3af625e1-f036-5df0-aef9-6fbcc6a516db')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '83099bc1-02b6-5f09-af4a-6bf24c6e48d8', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 40 plus 40? Tap the answer.$q$, $q$[{"text": "70", "tile": {"kind": "number", "value": "70"}, "is_correct": false, "misconception_token": "dropped-a-ten"}, {"text": "80", "tile": {"kind": "number", "value": "80"}, "is_correct": true}, {"text": "81", "tile": {"kind": "number", "value": "81"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "90", "tile": {"kind": "number", "value": "90"}, "is_correct": false, "misconception_token": "added-an-extra-ten"}]$q$::jsonb, $q$80$q$, $q$40 plus 40 is 80! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ecfaf607-3705-593c-9960-14d0eacbeba9' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '83099bc1-02b6-5f09-af4a-6bf24c6e48d8', 'ecfaf607-3705-593c-9960-14d0eacbeba9', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '83099bc1-02b6-5f09-af4a-6bf24c6e48d8')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0ab9592c-c2d7-5f27-98d4-23fd47f2202a', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 7 plus 7? Tap the answer.$q$, $q$[{"text": "14", "tile": {"kind": "number", "value": "14"}, "is_correct": true}, {"text": "15", "tile": {"kind": "number", "value": "15"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "12", "tile": {"kind": "number", "value": "12"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "13", "tile": {"kind": "number", "value": "13"}, "is_correct": false, "misconception_token": "counted-one-short"}]$q$::jsonb, $q$14$q$, $q$7 plus 7 is 14! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '01d70ce5-fe5f-59f3-a930-3f5f0c32e3e9' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0ab9592c-c2d7-5f27-98d4-23fd47f2202a', '01d70ce5-fe5f-59f3-a930-3f5f0c32e3e9', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '0ab9592c-c2d7-5f27-98d4-23fd47f2202a')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c94e60a9-bd2a-5009-a094-b6ffd7a9885e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Here are 3 balls. Add 3 more. How many in all? Tap the answer.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": true}]$q$::jsonb, $q$6$q$, $q$3 and 3 more is 6! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0629682d-3d01-574f-bbf3-935508a56332' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c94e60a9-bd2a-5009-a094-b6ffd7a9885e', '0629682d-3d01-574f-bbf3-935508a56332', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c94e60a9-bd2a-5009-a094-b6ffd7a9885e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'aeae9e27-dc4a-5c2a-8442-0aa5ca174280', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 4 plus 4? Tap the answer.$q$, $q$[{"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": true}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-two-extra"}]$q$::jsonb, $q$8$q$, $q$4 plus 4 is 8! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '076596e3-2fdf-5a58-9df3-4a78ef4eab69' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'aeae9e27-dc4a-5c2a-8442-0aa5ca174280', '076596e3-2fdf-5a58-9df3-4a78ef4eab69', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'aeae9e27-dc4a-5c2a-8442-0aa5ca174280')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '35754237-1810-5400-ac4e-4cdb02b041f3', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 8 plus 8? Tap the answer.$q$, $q$[{"text": "16", "tile": {"kind": "number", "value": "16"}, "is_correct": true}, {"text": "15", "tile": {"kind": "number", "value": "15"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "14", "tile": {"kind": "number", "value": "14"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "17", "tile": {"kind": "number", "value": "17"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$16$q$, $q$8 plus 8 is 16! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '08bca523-218c-5bcb-a4fd-dd0dd63123c5' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '35754237-1810-5400-ac4e-4cdb02b041f3', '08bca523-218c-5bcb-a4fd-dd0dd63123c5', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '35754237-1810-5400-ac4e-4cdb02b041f3')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '708dbc1a-48c1-5c14-8b0a-47af54334c2d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 9 plus 7? Tap the answer.$q$, $q$[{"text": "17", "tile": {"kind": "number", "value": "17"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "16", "tile": {"kind": "number", "value": "16"}, "is_correct": true}, {"text": "15", "tile": {"kind": "number", "value": "15"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "14", "tile": {"kind": "number", "value": "14"}, "is_correct": false, "misconception_token": "counted-two-short"}]$q$::jsonb, $q$16$q$, $q$9 plus 7 is 16! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0ee21f82-1c69-551b-b34c-1cc3dc4c5e4a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '708dbc1a-48c1-5c14-8b0a-47af54334c2d', '0ee21f82-1c69-551b-b34c-1cc3dc4c5e4a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '708dbc1a-48c1-5c14-8b0a-47af54334c2d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '15f58c01-9848-55b6-9726-296120d04296', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 3 plus 2? Tap the answer.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": true}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$5$q$, $q$3 plus 2 is 5! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '2059ed1e-75d0-5118-98c0-37081589bb04' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '15f58c01-9848-55b6-9726-296120d04296', '2059ed1e-75d0-5118-98c0-37081589bb04', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '15f58c01-9848-55b6-9726-296120d04296')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '6f344b27-53df-5b1e-9f57-51b3cc440fee', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 9 plus 4? Tap the answer.$q$, $q$[{"text": "12", "tile": {"kind": "number", "value": "12"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "14", "tile": {"kind": "number", "value": "14"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "13", "tile": {"kind": "number", "value": "13"}, "is_correct": true}, {"text": "11", "tile": {"kind": "number", "value": "11"}, "is_correct": false, "misconception_token": "counted-two-short"}]$q$::jsonb, $q$13$q$, $q$9 plus 4 is 13! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '4b103b3f-6a2e-5fc5-b508-0e79c20b92a1' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '6f344b27-53df-5b1e-9f57-51b3cc440fee', '4b103b3f-6a2e-5fc5-b508-0e79c20b92a1', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '6f344b27-53df-5b1e-9f57-51b3cc440fee')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '02cf7da9-3f35-5def-9504-2a21a1798989', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 5 plus 4? Tap the answer.$q$, $q$[{"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": true}]$q$::jsonb, $q$9$q$, $q$5 plus 4 is 9! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '4d2452ce-e25c-5024-b7e4-c7a4af322702' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '02cf7da9-3f35-5def-9504-2a21a1798989', '4d2452ce-e25c-5024-b7e4-c7a4af322702', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '02cf7da9-3f35-5def-9504-2a21a1798989')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ebcaae24-12fd-55c2-a9ab-6a46921ff027', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 6 plus 6? Tap the answer.$q$, $q$[{"text": "13", "tile": {"kind": "number", "value": "13"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "11", "tile": {"kind": "number", "value": "11"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "12", "tile": {"kind": "number", "value": "12"}, "is_correct": true}]$q$::jsonb, $q$12$q$, $q$6 plus 6 is 12! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '4de5cdd9-abd1-5eaf-ac94-fffebbd0eabf' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ebcaae24-12fd-55c2-a9ab-6a46921ff027', '4de5cdd9-abd1-5eaf-ac94-fffebbd0eabf', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ebcaae24-12fd-55c2-a9ab-6a46921ff027')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5e9570e2-6701-571d-b867-ec63a8580ee1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 7 plus 2? Tap the answer.$q$, $q$[{"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": true}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "kept-first-number-did-not-add"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$9$q$, $q$7 plus 2 is 9! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '61e87ac2-c604-5c03-a7af-97478814c9d7' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5e9570e2-6701-571d-b867-ec63a8580ee1', '61e87ac2-c604-5c03-a7af-97478814c9d7', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '5e9570e2-6701-571d-b867-ec63a8580ee1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '97e6a30d-0bf3-5901-93be-9544a88d9a33', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 8 plus 2? Tap the answer.$q$, $q$[{"text": "11", "tile": {"kind": "number", "value": "11"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": true}, {"text": "12", "tile": {"kind": "number", "value": "12"}, "is_correct": false, "misconception_token": "counted-two-extra"}]$q$::jsonb, $q$10$q$, $q$8 plus 2 is 10! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '662591d2-ec4a-5be0-981e-3784ef4a9037' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '97e6a30d-0bf3-5901-93be-9544a88d9a33', '662591d2-ec4a-5be0-981e-3784ef4a9037', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '97e6a30d-0bf3-5901-93be-9544a88d9a33')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '8d6f646f-5a5b-54bd-a60b-907a5b917286', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 7 plus 3? Tap the answer.$q$, $q$[{"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": true}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "11", "tile": {"kind": "number", "value": "11"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$10$q$, $q$7 plus 3 is 10! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '66935b73-7061-5f44-bb80-926071287164' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '8d6f646f-5a5b-54bd-a60b-907a5b917286', '66935b73-7061-5f44-bb80-926071287164', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '8d6f646f-5a5b-54bd-a60b-907a5b917286')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '310b6a77-48c9-57f3-be72-c3ec4c4aebd9', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 5 plus 2? Tap the answer.$q$, $q$[{"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": true}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$7$q$, $q$5 plus 2 is 7! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '6f5b36a5-8707-5334-a3d6-421e3c1df24c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '310b6a77-48c9-57f3-be72-c3ec4c4aebd9', '6f5b36a5-8707-5334-a3d6-421e3c1df24c', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '310b6a77-48c9-57f3-be72-c3ec4c4aebd9')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '38cdf99b-2718-5dae-b8a1-9e5d488b00cd', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 9 plus 9? Tap the answer.$q$, $q$[{"text": "18", "tile": {"kind": "number", "value": "18"}, "is_correct": true}, {"text": "19", "tile": {"kind": "number", "value": "19"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "17", "tile": {"kind": "number", "value": "17"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "16", "tile": {"kind": "number", "value": "16"}, "is_correct": false, "misconception_token": "counted-two-short"}]$q$::jsonb, $q$18$q$, $q$9 plus 9 is 18! Great adding!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '75f0ff45-f255-51ee-a697-afd8ad02b402' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '38cdf99b-2718-5dae-b8a1-9e5d488b00cd', '75f0ff45-f255-51ee-a697-afd8ad02b402', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '38cdf99b-2718-5dae-b8a1-9e5d488b00cd')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'aa8d7caf-aa1d-59ef-b0da-d950a5448dfd', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 8 plus 5? Tap the answer.$q$, $q$[{"text": "13", "tile": {"kind": "number", "value": "13"}, "is_correct": true}, {"text": "12", "tile": {"kind": "number", "value": "12"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "11", "tile": {"kind": "number", "value": "11"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "14", "tile": {"kind": "number", "value": "14"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$13$q$, $q$8 plus 5 is 13! Nice adding!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '776a0b83-237d-5369-b059-43511a0742db' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'aa8d7caf-aa1d-59ef-b0da-d950a5448dfd', '776a0b83-237d-5369-b059-43511a0742db', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'aa8d7caf-aa1d-59ef-b0da-d950a5448dfd')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3d27ba67-c992-545b-a564-fdf49b65ebd1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Here are 2 apples. Add 1 more. How many in all? Tap the answer.$q$, $q$[{"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": true}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "kept-first-number-did-not-add"}]$q$::jsonb, $q$3$q$, $q$2 and 1 more is 3! Nice adding!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8828796c-2e13-5acd-a067-91f9891e3e54' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3d27ba67-c992-545b-a564-fdf49b65ebd1', '8828796c-2e13-5acd-a067-91f9891e3e54', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '3d27ba67-c992-545b-a564-fdf49b65ebd1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b789c933-a095-59eb-8c33-d5cc3b7c69ae', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Here are 4 stars. Add 3 more. How many in all? Tap the answer.$q$, $q$[{"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": true}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-one-short"}]$q$::jsonb, $q$7$q$, $q$4 and 3 more is 7! Nice counting on!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '9dda5856-533a-5bc0-a50a-3934502f012d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b789c933-a095-59eb-8c33-d5cc3b7c69ae', '9dda5856-533a-5bc0-a50a-3934502f012d', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'b789c933-a095-59eb-8c33-d5cc3b7c69ae')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e6144b91-1e04-53d3-bae3-ab076236a155', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 6 plus 2? Tap the answer.$q$, $q$[{"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "kept-first-number-did-not-add"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": true}]$q$::jsonb, $q$8$q$, $q$6 plus 2 is 8! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a043bfa5-e40e-57fc-86d1-e024d8aefec7' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e6144b91-1e04-53d3-bae3-ab076236a155', 'a043bfa5-e40e-57fc-86d1-e024d8aefec7', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e6144b91-1e04-53d3-bae3-ab076236a155')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '083d6b1e-210c-5a12-80d5-d204e672f33f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 8 plus 6? Tap the answer.$q$, $q$[{"text": "15", "tile": {"kind": "number", "value": "15"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "13", "tile": {"kind": "number", "value": "13"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "12", "tile": {"kind": "number", "value": "12"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "14", "tile": {"kind": "number", "value": "14"}, "is_correct": true}]$q$::jsonb, $q$14$q$, $q$8 plus 6 is 14! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a634f3be-d8df-5353-b81e-21817bea5a4d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '083d6b1e-210c-5a12-80d5-d204e672f33f', 'a634f3be-d8df-5353-b81e-21817bea5a4d', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '083d6b1e-210c-5a12-80d5-d204e672f33f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4b9b39e5-058c-51e4-985d-96b7a6c25dba', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 9 plus 8? Tap the answer.$q$, $q$[{"text": "17", "tile": {"kind": "number", "value": "17"}, "is_correct": true}, {"text": "15", "tile": {"kind": "number", "value": "15"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "18", "tile": {"kind": "number", "value": "18"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "16", "tile": {"kind": "number", "value": "16"}, "is_correct": false, "misconception_token": "counted-one-short"}]$q$::jsonb, $q$17$q$, $q$9 plus 8 is 17! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b1b6100f-9cde-5d7a-9064-64a73dcffb6a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4b9b39e5-058c-51e4-985d-96b7a6c25dba', 'b1b6100f-9cde-5d7a-9064-64a73dcffb6a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '4b9b39e5-058c-51e4-985d-96b7a6c25dba')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c6006f6a-657d-5296-9b68-d261ec27bff5', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 7 plus 5? Tap the answer.$q$, $q$[{"text": "12", "tile": {"kind": "number", "value": "12"}, "is_correct": true}, {"text": "13", "tile": {"kind": "number", "value": "13"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "14", "tile": {"kind": "number", "value": "14"}, "is_correct": false, "misconception_token": "counted-two-extra"}, {"text": "11", "tile": {"kind": "number", "value": "11"}, "is_correct": false, "misconception_token": "counted-one-short"}]$q$::jsonb, $q$12$q$, $q$7 plus 5 is 12! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b89e03e4-0e52-5730-964d-348da8c803d4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c6006f6a-657d-5296-9b68-d261ec27bff5', 'b89e03e4-0e52-5730-964d-348da8c803d4', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c6006f6a-657d-5296-9b68-d261ec27bff5')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a141d194-7d52-5493-9cff-7db665452608', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 9 plus 3? Tap the answer.$q$, $q$[{"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "11", "tile": {"kind": "number", "value": "11"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "13", "tile": {"kind": "number", "value": "13"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "12", "tile": {"kind": "number", "value": "12"}, "is_correct": true}]$q$::jsonb, $q$12$q$, $q$9 plus 3 is 12! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c7f3a930-9175-5126-8994-f4381a11bf57' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a141d194-7d52-5493-9cff-7db665452608', 'c7f3a930-9175-5126-8994-f4381a11bf57', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'a141d194-7d52-5493-9cff-7db665452608')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7a4887c9-aab8-5ec0-84f9-17cd93ab2d34', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 8 plus 4? Tap the answer.$q$, $q$[{"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "11", "tile": {"kind": "number", "value": "11"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "12", "tile": {"kind": "number", "value": "12"}, "is_correct": true}, {"text": "13", "tile": {"kind": "number", "value": "13"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$12$q$, $q$8 plus 4 is 12! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'cdc76b65-a1c0-56de-b967-7a5f58f60e7a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7a4887c9-aab8-5ec0-84f9-17cd93ab2d34', 'cdc76b65-a1c0-56de-b967-7a5f58f60e7a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7a4887c9-aab8-5ec0-84f9-17cd93ab2d34')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7d9092f0-440f-54d3-9307-77ea7d82e456', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 5 plus 5? Tap the answer.$q$, $q$[{"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": true}, {"text": "11", "tile": {"kind": "number", "value": "11"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$10$q$, $q$5 plus 5 is 10! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e05543df-f1c6-5533-874e-630b6ba97e84' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7d9092f0-440f-54d3-9307-77ea7d82e456', 'e05543df-f1c6-5533-874e-630b6ba97e84', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7d9092f0-440f-54d3-9307-77ea7d82e456')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '2af25901-1fb9-5a2b-b6af-029b7afaa4ab', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 6 plus 3? Tap the answer.$q$, $q$[{"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": true}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-two-short"}]$q$::jsonb, $q$9$q$, $q$6 plus 3 is 9! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f08e43dc-af25-5eaa-a08d-0f74f1799f56' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '2af25901-1fb9-5a2b-b6af-029b7afaa4ab', 'f08e43dc-af25-5eaa-a08d-0f74f1799f56', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '2af25901-1fb9-5a2b-b6af-029b7afaa4ab')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '714aff93-e543-50d2-8536-76cf94ce08d7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 9 plus 6? Tap the answer.$q$, $q$[{"text": "15", "tile": {"kind": "number", "value": "15"}, "is_correct": true}, {"text": "14", "tile": {"kind": "number", "value": "14"}, "is_correct": false, "misconception_token": "counted-one-short"}, {"text": "13", "tile": {"kind": "number", "value": "13"}, "is_correct": false, "misconception_token": "counted-two-short"}, {"text": "16", "tile": {"kind": "number", "value": "16"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$15$q$, $q$9 plus 6 is 15! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f6b5be8e-aa44-5ec2-a80e-25e2bfefe92b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '714aff93-e543-50d2-8536-76cf94ce08d7', 'f6b5be8e-aa44-5ec2-a80e-25e2bfefe92b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '714aff93-e543-50d2-8536-76cf94ce08d7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

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
select '42577be9-586f-5853-b66f-0636e2238fc7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has fewer? Tap the group with fewer.$q$, $q$[{"text": "7", "tile": {"kind": "object_group", "count": 7, "image": "ball"}, "is_correct": false, "misconception_token": "picked-more-not-fewer"}, {"text": "2", "tile": {"kind": "object_group", "count": 2, "image": "ball"}, "is_correct": true}]$q$::jsonb, $q$2$q$, $q$Two is fewer than seven! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '00c64f34-4d5a-53f5-8fb8-83b3f2af6bde' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '42577be9-586f-5853-b66f-0636e2238fc7', '00c64f34-4d5a-53f5-8fb8-83b3f2af6bde', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '42577be9-586f-5853-b66f-0636e2238fc7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'df1f46b7-4945-5d98-9d20-476caf008161', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has more? Tap the group with more.$q$, $q$[{"text": "7", "tile": {"kind": "object_group", "count": 7, "image": "flower"}, "is_correct": true}, {"text": "4", "tile": {"kind": "object_group", "count": 4, "image": "flower"}, "is_correct": false, "misconception_token": "picked-fewer-not-more"}]$q$::jsonb, $q$7$q$, $q$Seven is more than four! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '123a1af8-dae9-5f11-9e3a-7cc3d836b87f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'df1f46b7-4945-5d98-9d20-476caf008161', '123a1af8-dae9-5f11-9e3a-7cc3d836b87f', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'df1f46b7-4945-5d98-9d20-476caf008161')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5518d237-6d39-59f6-bd1b-1d96d9bc37eb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has more? Tap the group with more.$q$, $q$[{"text": "6", "tile": {"kind": "object_group", "count": 6, "image": "star"}, "is_correct": true}, {"text": "3", "tile": {"kind": "object_group", "count": 3, "image": "star"}, "is_correct": false, "misconception_token": "picked-fewer-not-more"}]$q$::jsonb, $q$6$q$, $q$Six is more than three! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '135f9181-1d81-550a-b061-e6b561ea5510' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5518d237-6d39-59f6-bd1b-1d96d9bc37eb', '135f9181-1d81-550a-b061-e6b561ea5510', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '5518d237-6d39-59f6-bd1b-1d96d9bc37eb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4c851b60-9733-5756-abab-0bee47507e71', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has the most? Tap it.$q$, $q$[{"text": "8", "tile": {"kind": "object_group", "count": 8, "image": "apple"}, "is_correct": true}, {"text": "2", "tile": {"kind": "object_group", "count": 2, "image": "apple"}, "is_correct": false, "misconception_token": "picked-fewer-not-more"}, {"text": "5", "tile": {"kind": "object_group", "count": 5, "image": "apple"}, "is_correct": false, "misconception_token": "picked-fewer-not-more"}]$q$::jsonb, $q$8$q$, $q$Eight is the most! Great counting!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '1423d490-51c4-5241-97a5-c43c02821aea' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4c851b60-9733-5756-abab-0bee47507e71', '1423d490-51c4-5241-97a5-c43c02821aea', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '4c851b60-9733-5756-abab-0bee47507e71')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f8d62888-96eb-5b43-a379-bbc3130853be', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has more? Tap the group with more.$q$, $q$[{"text": "4", "tile": {"kind": "object_group", "count": 4, "image": "duck"}, "is_correct": true}, {"text": "1", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": false, "misconception_token": "picked-fewer-not-more"}]$q$::jsonb, $q$4$q$, $q$Four is more than one! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '1897af5b-6af3-5c4b-98f0-85594d676b81' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f8d62888-96eb-5b43-a379-bbc3130853be', '1897af5b-6af3-5c4b-98f0-85594d676b81', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f8d62888-96eb-5b43-a379-bbc3130853be')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a4171943-36ca-5e17-9574-54e560330ec2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is bigger? Tap it.$q$, $q$[{"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": true}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "picked-smaller-not-bigger"}]$q$::jsonb, $q$9$q$, $q$9 is bigger than 2! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '241a834d-897a-5d6d-9bb5-2bc5e799c2dc' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a4171943-36ca-5e17-9574-54e560330ec2', '241a834d-897a-5d6d-9bb5-2bc5e799c2dc', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'a4171943-36ca-5e17-9574-54e560330ec2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '58aacc85-4cf3-5344-b86d-e40f558cc5e6', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has more? Tap the group with more.$q$, $q$[{"text": "5", "tile": {"kind": "object_group", "count": 5, "image": "cat"}, "is_correct": false, "misconception_token": "picked-fewer-not-more"}, {"text": "8", "tile": {"kind": "object_group", "count": 8, "image": "cat"}, "is_correct": true}]$q$::jsonb, $q$8$q$, $q$Eight is more than five! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '28f439ca-4650-595a-af03-4ef779fd37e4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '58aacc85-4cf3-5344-b86d-e40f558cc5e6', '28f439ca-4650-595a-af03-4ef779fd37e4', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '58aacc85-4cf3-5344-b86d-e40f558cc5e6')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '979f8b50-cac4-511a-aa0b-439d15cef393', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has fewer? Tap the group with fewer.$q$, $q$[{"text": "2", "tile": {"kind": "object_group", "count": 2, "image": "hat"}, "is_correct": true}, {"text": "6", "tile": {"kind": "object_group", "count": 6, "image": "hat"}, "is_correct": false, "misconception_token": "picked-more-not-fewer"}]$q$::jsonb, $q$2$q$, $q$Two is fewer than six! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '36d7f93f-ce67-5e7b-8d2f-5b26e6595512' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '979f8b50-cac4-511a-aa0b-439d15cef393', '36d7f93f-ce67-5e7b-8d2f-5b26e6595512', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '979f8b50-cac4-511a-aa0b-439d15cef393')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'bcb5a79c-e912-5344-a665-629cb4c7ef77', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has fewer? Tap the group with fewer.$q$, $q$[{"text": "8", "tile": {"kind": "object_group", "count": 8, "image": "fish"}, "is_correct": false, "misconception_token": "picked-more-not-fewer"}, {"text": "3", "tile": {"kind": "object_group", "count": 3, "image": "fish"}, "is_correct": true}]$q$::jsonb, $q$3$q$, $q$Three is fewer than eight! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '3c03e3fa-8d2a-5a3a-b7d7-79ee11df42cf' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'bcb5a79c-e912-5344-a665-629cb4c7ef77', '3c03e3fa-8d2a-5a3a-b7d7-79ee11df42cf', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'bcb5a79c-e912-5344-a665-629cb4c7ef77')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '04c3bc41-fb5c-55f6-a44a-1a6be657aff2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is smaller? Tap it.$q$, $q$[{"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": true}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "picked-bigger-not-smaller"}]$q$::jsonb, $q$3$q$, $q$3 is smaller than 7! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '3e866c91-c789-5614-a491-03416a26da53' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '04c3bc41-fb5c-55f6-a44a-1a6be657aff2', '3e866c91-c789-5614-a491-03416a26da53', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '04c3bc41-fb5c-55f6-a44a-1a6be657aff2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '2f227c48-44d4-55ee-94be-cdbf30f8a91f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is smaller? Tap it.$q$, $q$[{"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": true}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "picked-bigger-not-smaller"}]$q$::jsonb, $q$4$q$, $q$4 is smaller than 9! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '400b6201-1ed5-575f-b495-60688d24ba8a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '2f227c48-44d4-55ee-94be-cdbf30f8a91f', '400b6201-1ed5-575f-b495-60688d24ba8a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '2f227c48-44d4-55ee-94be-cdbf30f8a91f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e4916357-5d6a-5765-8151-793128fbb36f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is bigger? Tap it.$q$, $q$[{"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": true}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "picked-smaller-not-bigger"}]$q$::jsonb, $q$7$q$, $q$7 is bigger than 5! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '553ea53b-298f-5104-a2a3-03b02721f5e4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e4916357-5d6a-5765-8151-793128fbb36f', '553ea53b-298f-5104-a2a3-03b02721f5e4', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e4916357-5d6a-5765-8151-793128fbb36f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e244f148-8bcd-5b9f-875c-aa444011a063', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has more? Tap the group with more.$q$, $q$[{"text": "6", "tile": {"kind": "object_group", "count": 6, "image": "sun"}, "is_correct": true}, {"text": "3", "tile": {"kind": "object_group", "count": 3, "image": "sun"}, "is_correct": false, "misconception_token": "picked-fewer-not-more"}]$q$::jsonb, $q$6$q$, $q$Six is more than three! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5fa09e00-f9da-50ba-9d01-6779b5dface8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e244f148-8bcd-5b9f-875c-aa444011a063', '5fa09e00-f9da-50ba-9d01-6779b5dface8', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e244f148-8bcd-5b9f-875c-aa444011a063')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5ebc276c-045b-5d86-a3e4-af7b8bce1003', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has more? Tap the group with more.$q$, $q$[{"text": "5", "tile": {"kind": "object_group", "count": 5, "image": "apple"}, "is_correct": true}, {"text": "2", "tile": {"kind": "object_group", "count": 2, "image": "apple"}, "is_correct": false, "misconception_token": "picked-fewer-not-more"}]$q$::jsonb, $q$5$q$, $q$This group has 5 and this one has 2. Five is more! Great looking!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5fd6daa1-a1ca-5b22-9efd-8dff924ae46f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5ebc276c-045b-5d86-a3e4-af7b8bce1003', '5fd6daa1-a1ca-5b22-9efd-8dff924ae46f', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '5ebc276c-045b-5d86-a3e4-af7b8bce1003')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '85f81fe7-d3c8-5da2-bc60-8302b948fd57', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is bigger? Tap it.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "picked-smaller-not-bigger"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": true}]$q$::jsonb, $q$8$q$, $q$8 is bigger than 5! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '62d1e5a6-9d52-5afd-9ece-af47e85eb9f6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '85f81fe7-d3c8-5da2-bc60-8302b948fd57', '62d1e5a6-9d52-5afd-9ece-af47e85eb9f6', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '85f81fe7-d3c8-5da2-bc60-8302b948fd57')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e92253d0-d9f2-58ab-9d3c-d6088f48d920', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is the biggest? Tap it.$q$, $q$[{"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": true}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "picked-smaller-not-bigger"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "picked-smaller-not-bigger"}]$q$::jsonb, $q$9$q$, $q$9 is the biggest! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '85e861ee-ac7d-5ff3-97ff-7d9eff2332c0' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e92253d0-d9f2-58ab-9d3c-d6088f48d920', '85e861ee-ac7d-5ff3-97ff-7d9eff2332c0', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e92253d0-d9f2-58ab-9d3c-d6088f48d920')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '31e73c41-ad73-5919-a6e6-4c3966fdd678', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is bigger? Tap it.$q$, $q$[{"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": true}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "picked-smaller-not-bigger"}]$q$::jsonb, $q$10$q$, $q$10 is bigger than 6! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '9008b0be-9a06-59d4-8772-4b579029c935' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '31e73c41-ad73-5919-a6e6-4c3966fdd678', '9008b0be-9a06-59d4-8772-4b579029c935', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '31e73c41-ad73-5919-a6e6-4c3966fdd678')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '32cc8d23-892f-51de-9dfa-807e4a289a69', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has fewer? Tap the group with fewer.$q$, $q$[{"text": "1", "tile": {"kind": "object_group", "count": 1, "image": "tree"}, "is_correct": true}, {"text": "5", "tile": {"kind": "object_group", "count": 5, "image": "tree"}, "is_correct": false, "misconception_token": "picked-more-not-fewer"}]$q$::jsonb, $q$1$q$, $q$One is the fewest! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '9858a336-a25d-5ca9-904e-cd4956910e83' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '32cc8d23-892f-51de-9dfa-807e4a289a69', '9858a336-a25d-5ca9-904e-cd4956910e83', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '32cc8d23-892f-51de-9dfa-807e4a289a69')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '67c88fcc-0d1d-5829-b536-7ac18937bdc0', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is bigger? Tap it.$q$, $q$[{"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "picked-smaller-not-bigger"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": true}]$q$::jsonb, $q$6$q$, $q$6 is bigger than 4! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b2abfb20-a59d-5e57-a1d6-27b931b58128' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '67c88fcc-0d1d-5829-b536-7ac18937bdc0', 'b2abfb20-a59d-5e57-a1d6-27b931b58128', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '67c88fcc-0d1d-5829-b536-7ac18937bdc0')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f390aedd-3840-5597-8156-b398a12703b9', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has more? Tap the group with more.$q$, $q$[{"text": "9", "tile": {"kind": "object_group", "count": 9, "image": "pig"}, "is_correct": true}, {"text": "6", "tile": {"kind": "object_group", "count": 6, "image": "pig"}, "is_correct": false, "misconception_token": "picked-fewer-not-more"}]$q$::jsonb, $q$9$q$, $q$Nine is more than six! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b419508a-ba93-581f-ba06-772cee1d18a6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f390aedd-3840-5597-8156-b398a12703b9', 'b419508a-ba93-581f-ba06-772cee1d18a6', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f390aedd-3840-5597-8156-b398a12703b9')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '8c0e05d1-8dfb-512e-bf12-2e13628ddc12', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which group has fewer? Tap the group with fewer.$q$, $q$[{"text": "9", "tile": {"kind": "object_group", "count": 9, "image": "ring"}, "is_correct": false, "misconception_token": "picked-more-not-fewer"}, {"text": "4", "tile": {"kind": "object_group", "count": 4, "image": "ring"}, "is_correct": true}]$q$::jsonb, $q$4$q$, $q$Four is fewer than nine! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'bede3ba7-5268-5ac0-ba2e-5707b8f25d36' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '8c0e05d1-8dfb-512e-bf12-2e13628ddc12', 'bede3ba7-5268-5ac0-ba2e-5707b8f25d36', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '8c0e05d1-8dfb-512e-bf12-2e13628ddc12')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ea3ea7ff-f673-5e3e-ab12-165b65b27a44', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is bigger? Tap it.$q$, $q$[{"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": true}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "picked-smaller-not-bigger"}]$q$::jsonb, $q$7$q$, $q$7 is bigger than 3! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd5316548-671d-5963-95a7-29de278e597a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ea3ea7ff-f673-5e3e-ab12-165b65b27a44', 'd5316548-671d-5963-95a7-29de278e597a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ea3ea7ff-f673-5e3e-ab12-165b65b27a44')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '1ee4120c-4568-5bc9-809a-40f3a5b4db4a', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is smaller? Tap it.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "picked-bigger-not-smaller"}, {"text": "1", "tile": {"kind": "number", "value": "1"}, "is_correct": true}]$q$::jsonb, $q$1$q$, $q$1 is the smallest! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd668f9bd-9f18-5846-a038-4d73b963a847' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '1ee4120c-4568-5bc9-809a-40f3a5b4db4a', 'd668f9bd-9f18-5846-a038-4d73b963a847', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '1ee4120c-4568-5bc9-809a-40f3a5b4db4a')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0013ecd7-685b-5536-b43e-1eee4d484d96', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is bigger? Tap it.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "picked-smaller-not-bigger"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": true}]$q$::jsonb, $q$9$q$, $q$9 is bigger than 5! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'dc552392-88ec-5491-a8e7-4f6a89fe9319' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0013ecd7-685b-5536-b43e-1eee4d484d96', 'dc552392-88ec-5491-a8e7-4f6a89fe9319', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '0013ecd7-685b-5536-b43e-1eee4d484d96')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '6dba3ec1-24ea-538f-ad7d-75463abbdaeb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is smaller? Tap it.$q$, $q$[{"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "picked-bigger-not-smaller"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": true}]$q$::jsonb, $q$6$q$, $q$6 is smaller than 10! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ed8f070a-51f0-5b64-a382-c643cb3ad5d0' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '6dba3ec1-24ea-538f-ad7d-75463abbdaeb', 'ed8f070a-51f0-5b64-a382-c643cb3ad5d0', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '6dba3ec1-24ea-538f-ad7d-75463abbdaeb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'cd6a6d24-0e4f-5c97-9bf6-ffbf41fd5a40', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which number is smaller? Tap it.$q$, $q$[{"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "picked-bigger-not-smaller"}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": true}]$q$::jsonb, $q$2$q$, $q$2 is smaller than 8! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ed9bb3fe-b90a-5be1-96d1-eda428309829' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'cd6a6d24-0e4f-5c97-9bf6-ffbf41fd5a40', 'ed9bb3fe-b90a-5be1-96d1-eda428309829', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'cd6a6d24-0e4f-5c97-9bf6-ffbf41fd5a40')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '50a9ba30-8409-5367-9be8-9a79e3d26f2a', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 10.$q$, $q$[{"text": "8", "tile": {"kind": "object_group", "count": 8, "image": "van"}, "is_correct": false, "misconception_token": "skipped-two-objects"}, {"text": "10", "tile": {"kind": "object_group", "count": 10, "image": "van"}, "is_correct": true}, {"text": "9", "tile": {"kind": "object_group", "count": 9, "image": "van"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "11", "tile": {"kind": "object_group", "count": 11, "image": "van"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$10$q$, $q$Let's count all the way to ten. The group with ten vans shows 10!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '00ee6aa0-5fb8-580b-ba8a-c1384cce32c7' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '50a9ba30-8409-5367-9be8-9a79e3d26f2a', '00ee6aa0-5fb8-580b-ba8a-c1384cce32c7', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '50a9ba30-8409-5367-9be8-9a79e3d26f2a')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'fed80817-6f3a-5a0e-ae71-3cfa9e017c56', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many balls do you see? Tap the number.$q$, $q$[{"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": true}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "skipped-two-objects"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$8$q$, $q$Let's count the balls all the way to eight. There are 8 balls!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '02cb6fc8-fdb1-5df5-a373-bfd19e67245c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'fed80817-6f3a-5a0e-ae71-3cfa9e017c56', '02cb6fc8-fdb1-5df5-a373-bfd19e67245c', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'fed80817-6f3a-5a0e-ae71-3cfa9e017c56')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '107b485e-50ab-5a26-8ef2-58589ef7a2f6', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many pigs do you see? Tap the number.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": true}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-two-extra"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$5$q$, $q$Let's count the pigs: one, two, three, four, five. There are 5 pigs!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '051859e7-e13a-5b70-b7bd-744da6d24154' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '107b485e-50ab-5a26-8ef2-58589ef7a2f6', '051859e7-e13a-5b70-b7bd-744da6d24154', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '107b485e-50ab-5a26-8ef2-58589ef7a2f6')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f7c7c226-d548-57d1-b3cc-e41f6f0143b1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many flowers do you see? Tap the number.$q$, $q$[{"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": true}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "skipped-two-objects"}]$q$::jsonb, $q$7$q$, $q$Let's touch each flower and count: one, two, three, four, five, six, seven. There are 7 flowers!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '18c7d144-ce07-590c-971b-700a027b3b5c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f7c7c226-d548-57d1-b3cc-e41f6f0143b1', '18c7d144-ce07-590c-971b-700a027b3b5c', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f7c7c226-d548-57d1-b3cc-e41f6f0143b1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '315a722b-09ea-5af9-bd88-8f86f220cb71', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 4.$q$, $q$[{"text": "3", "tile": {"kind": "object_group", "count": 3, "image": "apple"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "4", "tile": {"kind": "object_group", "count": 4, "image": "apple"}, "is_correct": true}, {"text": "5", "tile": {"kind": "object_group", "count": 5, "image": "apple"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$4$q$, $q$Let's count each group. The group with four apples is the one that shows 4!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '203eb671-e0bd-5643-8d39-ef6eb38902af' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '315a722b-09ea-5af9-bd88-8f86f220cb71', '203eb671-e0bd-5643-8d39-ef6eb38902af', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '315a722b-09ea-5af9-bd88-8f86f220cb71')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0e7d6f6f-dc16-561e-859f-b68cf3269547', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many leaves do you see? Tap the number.$q$, $q$[{"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": true}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "skipped-two-objects"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$8$q$, $q$Let's touch each leaf and count all the way to eight. There are 8 leaves!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '258b5200-d60b-596c-9f2e-26a6a59cbc7e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0e7d6f6f-dc16-561e-859f-b68cf3269547', '258b5200-d60b-596c-9f2e-26a6a59cbc7e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '0e7d6f6f-dc16-561e-859f-b68cf3269547')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '869184ee-c163-5144-9302-06677b7a237b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 6.$q$, $q$[{"text": "6", "tile": {"kind": "object_group", "count": 6, "image": "tree"}, "is_correct": true}, {"text": "7", "tile": {"kind": "object_group", "count": 7, "image": "tree"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "5", "tile": {"kind": "object_group", "count": 5, "image": "tree"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "4", "tile": {"kind": "object_group", "count": 4, "image": "tree"}, "is_correct": false, "misconception_token": "skipped-two-objects"}]$q$::jsonb, $q$6$q$, $q$Let's count each group. The group with six trees shows 6!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '313f936e-eb87-51d7-b395-9bd7b9715137' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '869184ee-c163-5144-9302-06677b7a237b', '313f936e-eb87-51d7-b395-9bd7b9715137', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '869184ee-c163-5144-9302-06677b7a237b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5a9d1841-1f42-596b-9a5c-1e5c63ec5326', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 2.$q$, $q$[{"text": "1", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "3", "tile": {"kind": "object_group", "count": 3, "image": "duck"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "2", "tile": {"kind": "object_group", "count": 2, "image": "duck"}, "is_correct": true}]$q$::jsonb, $q$2$q$, $q$Let's count. The group with two ducks shows 2!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '33610dde-d1f2-5c02-a1a8-d2647f0ed437' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5a9d1841-1f42-596b-9a5c-1e5c63ec5326', '33610dde-d1f2-5c02-a1a8-d2647f0ed437', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '5a9d1841-1f42-596b-9a5c-1e5c63ec5326')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e8668e77-3315-5797-a958-e48772b5021d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many balls do you see? Tap the number.$q$, $q$[{"text": "1", "tile": {"kind": "number", "value": "1"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": true}]$q$::jsonb, $q$2$q$, $q$Let's count the balls: one, two. There are 2 balls!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '4e8a201d-7a45-5740-9b73-7be83e99c460' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e8668e77-3315-5797-a958-e48772b5021d', '4e8a201d-7a45-5740-9b73-7be83e99c460', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e8668e77-3315-5797-a958-e48772b5021d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4d914b11-7cac-51c8-a610-15a76885119c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 5.$q$, $q$[{"text": "7", "tile": {"kind": "object_group", "count": 7, "image": "flower"}, "is_correct": false, "misconception_token": "counted-two-extra"}, {"text": "4", "tile": {"kind": "object_group", "count": 4, "image": "flower"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "5", "tile": {"kind": "object_group", "count": 5, "image": "flower"}, "is_correct": true}, {"text": "6", "tile": {"kind": "object_group", "count": 6, "image": "flower"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$5$q$, $q$Let's count. The group with five flowers shows 5!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5d9b5415-09fb-5870-a2a8-21e69fce2c10' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4d914b11-7cac-51c8-a610-15a76885119c', '5d9b5415-09fb-5870-a2a8-21e69fce2c10', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '4d914b11-7cac-51c8-a610-15a76885119c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f6cb759e-f084-506d-bfbd-d97152026ac7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many stars do you see? Tap the number.$q$, $q$[{"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "1", "tile": {"kind": "number", "value": "1"}, "is_correct": true}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "counted-two-extra"}]$q$::jsonb, $q$1$q$, $q$There is just one star. The answer is 1!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '789e617b-d9d9-59d3-9c73-c146f4f1a6a3' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f6cb759e-f084-506d-bfbd-d97152026ac7', '789e617b-d9d9-59d3-9c73-c146f4f1a6a3', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f6cb759e-f084-506d-bfbd-d97152026ac7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '79b8bd3a-840f-533e-a634-15c74d5c6a55', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many keys do you see? Tap the number.$q$, $q$[{"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": true}]$q$::jsonb, $q$3$q$, $q$Let's count the keys: one, two, three. There are 3 keys!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '83e062aa-48aa-5fc5-8ce6-4908be2b5c08' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '79b8bd3a-840f-533e-a634-15c74d5c6a55', '83e062aa-48aa-5fc5-8ce6-4908be2b5c08', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '79b8bd3a-840f-533e-a634-15c74d5c6a55')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'cdc2d079-c29c-51ec-8794-65f75785f2c6', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 1.$q$, $q$[{"text": "2", "tile": {"kind": "object_group", "count": 2, "image": "apple"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "3", "tile": {"kind": "object_group", "count": 3, "image": "apple"}, "is_correct": false, "misconception_token": "counted-two-extra"}, {"text": "1", "tile": {"kind": "object_group", "count": 1, "image": "apple"}, "is_correct": true}]$q$::jsonb, $q$1$q$, $q$The group with just one apple shows 1!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '927888c9-f1fa-5aef-984f-ad5b84351b33' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'cdc2d079-c29c-51ec-8794-65f75785f2c6', '927888c9-f1fa-5aef-984f-ad5b84351b33', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'cdc2d079-c29c-51ec-8794-65f75785f2c6')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '104f27fa-ca89-516f-9548-e3fbe12ad64c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many hats do you see? Tap the number.$q$, $q$[{"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": true}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "skipped-two-objects"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "skipped-one-object"}]$q$::jsonb, $q$6$q$, $q$Let's count the hats: one, two, three, four, five, six. There are 6 hats!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '9bf22865-0524-5239-856b-f1c739cb035b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '104f27fa-ca89-516f-9548-e3fbe12ad64c', '9bf22865-0524-5239-856b-f1c739cb035b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '104f27fa-ca89-516f-9548-e3fbe12ad64c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7bbaff56-0116-512c-8a5d-02c8d7a6f2fe', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 2.$q$, $q$[{"text": "1", "tile": {"kind": "object_group", "count": 1, "image": "sun"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "2", "tile": {"kind": "object_group", "count": 2, "image": "sun"}, "is_correct": true}, {"text": "3", "tile": {"kind": "object_group", "count": 3, "image": "sun"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$2$q$, $q$Let's count. The group with two suns shows 2!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'aa0d6cd3-8094-5d77-8fcb-57ebf3234ef4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7bbaff56-0116-512c-8a5d-02c8d7a6f2fe', 'aa0d6cd3-8094-5d77-8fcb-57ebf3234ef4', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7bbaff56-0116-512c-8a5d-02c8d7a6f2fe')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7e1cb385-ad43-5d59-96ff-71298d04525f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many cats do you see? Tap the number.$q$, $q$[{"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": true}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$4$q$, $q$Let's count the cats: one, two, three, four. There are 4 cats!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ad173963-ae90-55f3-ab0e-b4f1b28aa78b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7e1cb385-ad43-5d59-96ff-71298d04525f', 'ad173963-ae90-55f3-ab0e-b4f1b28aa78b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7e1cb385-ad43-5d59-96ff-71298d04525f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'eaa9c5bc-7f57-564b-b184-768497975c27', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 10.$q$, $q$[{"text": "10", "tile": {"kind": "object_group", "count": 10, "image": "star"}, "is_correct": true}, {"text": "11", "tile": {"kind": "object_group", "count": 11, "image": "star"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "8", "tile": {"kind": "object_group", "count": 8, "image": "star"}, "is_correct": false, "misconception_token": "skipped-two-objects"}, {"text": "9", "tile": {"kind": "object_group", "count": 9, "image": "star"}, "is_correct": false, "misconception_token": "skipped-one-object"}]$q$::jsonb, $q$10$q$, $q$Let's count each group of stars all the way to ten. The group of 10 is the answer!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c3b86a3e-faee-52c3-9d25-be2de00a49ee' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'eaa9c5bc-7f57-564b-b184-768497975c27', 'c3b86a3e-faee-52c3-9d25-be2de00a49ee', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'eaa9c5bc-7f57-564b-b184-768497975c27')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '453a4613-e914-566d-9809-02caafcf463f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many fish do you see? Tap the number.$q$, $q$[{"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-two-extra"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": true}]$q$::jsonb, $q$6$q$, $q$Let's count the fish: one, two, three, four, five, six. There are 6 fish!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c9129883-6ffa-5ea6-94ee-2bada94c8ac0' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '453a4613-e914-566d-9809-02caafcf463f', 'c9129883-6ffa-5ea6-94ee-2bada94c8ac0', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '453a4613-e914-566d-9809-02caafcf463f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c28355ea-5653-5c80-bf79-634709b5a826', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 8.$q$, $q$[{"text": "6", "tile": {"kind": "object_group", "count": 6, "image": "fish"}, "is_correct": false, "misconception_token": "skipped-two-objects"}, {"text": "7", "tile": {"kind": "object_group", "count": 7, "image": "fish"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "9", "tile": {"kind": "object_group", "count": 9, "image": "fish"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "8", "tile": {"kind": "object_group", "count": 8, "image": "fish"}, "is_correct": true}]$q$::jsonb, $q$8$q$, $q$Let's count each group all the way. The group with eight fish shows 8!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd5588902-ba11-5faf-9b52-78ccf498d033' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c28355ea-5653-5c80-bf79-634709b5a826', 'd5588902-ba11-5faf-9b52-78ccf498d033', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c28355ea-5653-5c80-bf79-634709b5a826')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '402b4912-6f03-5ddb-b3e8-e15a950ff17e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many apples do you see? Tap the number.$q$, $q$[{"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": true}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "skipped-two-objects"}]$q$::jsonb, $q$9$q$, $q$Let's touch each apple and count all the way to nine. There are 9 apples!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'de089fd5-0c9d-5de7-ad09-5af418a0f7fe' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '402b4912-6f03-5ddb-b3e8-e15a950ff17e', 'de089fd5-0c9d-5de7-ad09-5af418a0f7fe', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '402b4912-6f03-5ddb-b3e8-e15a950ff17e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ca13b2ab-36cc-5b36-a732-fe814000b077', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 5.$q$, $q$[{"text": "5", "tile": {"kind": "object_group", "count": 5, "image": "cat"}, "is_correct": true}, {"text": "4", "tile": {"kind": "object_group", "count": 4, "image": "cat"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "6", "tile": {"kind": "object_group", "count": 6, "image": "cat"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$5$q$, $q$Let's count each group. The group with five cats shows 5!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'df1c0142-dc84-50fb-a137-7e6da2c10030' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ca13b2ab-36cc-5b36-a732-fe814000b077', 'df1c0142-dc84-50fb-a137-7e6da2c10030', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ca13b2ab-36cc-5b36-a732-fe814000b077')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f11305f1-efd4-5757-9f91-d62884b319fe', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 7.$q$, $q$[{"text": "7", "tile": {"kind": "object_group", "count": 7, "image": "duck"}, "is_correct": true}, {"text": "6", "tile": {"kind": "object_group", "count": 6, "image": "duck"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "5", "tile": {"kind": "object_group", "count": 5, "image": "duck"}, "is_correct": false, "misconception_token": "skipped-two-objects"}, {"text": "8", "tile": {"kind": "object_group", "count": 8, "image": "duck"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$7$q$, $q$Let's count each group. The group with seven ducks shows 7!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e3a5791d-7d69-5c87-bdd5-40fc2085224b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f11305f1-efd4-5757-9f91-d62884b319fe', 'e3a5791d-7d69-5c87-bdd5-40fc2085224b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f11305f1-efd4-5757-9f91-d62884b319fe')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0a1dbfe7-57ff-56a2-9999-ec5bf9dd57b7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many stars do you see? Tap the number.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": true}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$5$q$, $q$Let's count the stars: one, two, three, four, five. There are 5 stars!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ebc180c1-d2a8-523f-bcd5-461b6cb4a64d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0a1dbfe7-57ff-56a2-9999-ec5bf9dd57b7', 'ebc180c1-d2a8-523f-bcd5-461b6cb4a64d', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '0a1dbfe7-57ff-56a2-9999-ec5bf9dd57b7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5d1d5092-3fd5-5ee5-a7d2-3af4d22cf611', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 3.$q$, $q$[{"text": "2", "tile": {"kind": "object_group", "count": 2, "image": "star"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "3", "tile": {"kind": "object_group", "count": 3, "image": "star"}, "is_correct": true}, {"text": "4", "tile": {"kind": "object_group", "count": 4, "image": "star"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$3$q$, $q$Let's count each group. One, two, three. This group shows 3!$q$,
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
select '5d1d5092-3fd5-5ee5-a7d2-3af4d22cf611', 'ed91c523-8921-5cbe-8f18-417e2049de9c', array['distractor_misconceptions', 'no_dashes']::text[], $q$Replaced the dash in the solution.$q$
 where exists (select 1 from public.generated_questions where id = '5d1d5092-3fd5-5ee5-a7d2-3af4d22cf611')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '1a895151-e17b-5de5-ac99-9627c2027d8b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 6.$q$, $q$[{"text": "5", "tile": {"kind": "object_group", "count": 5, "image": "ball"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "6", "tile": {"kind": "object_group", "count": 6, "image": "ball"}, "is_correct": true}, {"text": "4", "tile": {"kind": "object_group", "count": 4, "image": "ball"}, "is_correct": false, "misconception_token": "skipped-two-objects"}, {"text": "7", "tile": {"kind": "object_group", "count": 7, "image": "ball"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$6$q$, $q$Let's count each group carefully. The group with six balls shows 6!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f14f2ddb-c24c-50d7-a68a-c222cd09fbc2' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '1a895151-e17b-5de5-ac99-9627c2027d8b', 'f14f2ddb-c24c-50d7-a68a-c222cd09fbc2', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '1a895151-e17b-5de5-ac99-9627c2027d8b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7292716d-ad2c-5dde-8c11-7e5eb7c2750e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many ducks do you see? Tap the number.$q$, $q$[{"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "skipped-one-object"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-two-extra"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": true}]$q$::jsonb, $q$4$q$, $q$Let's count the ducks: one, two, three, four. There are 4 ducks!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f969cfe8-06fb-5b99-9736-24386fc80a28' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7292716d-ad2c-5dde-8c11-7e5eb7c2750e', 'f969cfe8-06fb-5b99-9736-24386fc80a28', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7292716d-ad2c-5dde-8c11-7e5eb7c2750e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '1721c496-08ed-5e92-badd-abb06c9af13d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many apples do you see? Tap the number.$q$, $q$[{"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": true}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "skipped-one-object"}]$q$::jsonb, $q$3$q$, $q$Let's count the apples together: one, two, three. There are 3 apples!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'fa403660-7cd4-5242-9e9d-8deb738f6b0b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '1721c496-08ed-5e92-badd-abb06c9af13d', 'fa403660-7cd4-5242-9e9d-8deb738f6b0b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '1721c496-08ed-5e92-badd-abb06c9af13d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ada8b86d-7861-5695-b043-32735d614a96', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the group that shows 9.$q$, $q$[{"text": "9", "tile": {"kind": "object_group", "count": 9, "image": "ring"}, "is_correct": true}, {"text": "7", "tile": {"kind": "object_group", "count": 7, "image": "ring"}, "is_correct": false, "misconception_token": "skipped-two-objects"}, {"text": "10", "tile": {"kind": "object_group", "count": 10, "image": "ring"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "8", "tile": {"kind": "object_group", "count": 8, "image": "ring"}, "is_correct": false, "misconception_token": "skipped-one-object"}]$q$::jsonb, $q$9$q$, $q$Let's count carefully. The group with nine rings shows 9!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'fd135798-ecbd-580e-827b-8cb2027a994c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ada8b86d-7861-5695-b043-32735d614a96', 'fd135798-ecbd-580e-827b-8cb2027a994c', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ada8b86d-7861-5695-b043-32735d614a96')
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
select 'c5da703f-f831-5c8f-85cb-da263d633c64', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Skip count by 2: 2, 4, 6, and then? Tap the next number.$q$, $q$[{"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": true}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "added-three-not-two"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "skipped-ahead-one-step"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-by-ones-not-twos"}]$q$::jsonb, $q$8$q$, $q$After 6 comes 8! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0779be3a-3ef6-5e2d-87da-cbec3053fd2f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c5da703f-f831-5c8f-85cb-da263d633c64', '0779be3a-3ef6-5e2d-87da-cbec3053fd2f', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c5da703f-f831-5c8f-85cb-da263d633c64')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'fbdfad8d-3065-5833-82ee-4a98ef9a65e2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many cents is a quarter worth? Tap the number.$q$, $q$[{"text": "25", "tile": {"kind": "number", "value": "25"}, "is_correct": true}, {"text": "1", "tile": {"kind": "number", "value": "1"}, "is_correct": false, "misconception_token": "confused-quarter-with-penny"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "confused-quarter-with-nickel"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "confused-quarter-with-dime"}]$q$::jsonb, $q$25$q$, $q$A quarter is 25 cents! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '09df0422-e01f-5176-a9e5-471d45d0e17e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'fbdfad8d-3065-5833-82ee-4a98ef9a65e2', '09df0422-e01f-5176-a9e5-471d45d0e17e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'fbdfad8d-3065-5833-82ee-4a98ef9a65e2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '563790d2-e506-5761-9617-a0d43fb71a4a', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Skip count by 10: 10, 20, 30, and then? Tap the next number.$q$, $q$[{"text": "35", "tile": {"kind": "number", "value": "35"}, "is_correct": false, "misconception_token": "counted-by-fives-not-tens"}, {"text": "40", "tile": {"kind": "number", "value": "40"}, "is_correct": true}, {"text": "31", "tile": {"kind": "number", "value": "31"}, "is_correct": false, "misconception_token": "counted-by-ones-not-tens"}, {"text": "50", "tile": {"kind": "number", "value": "50"}, "is_correct": false, "misconception_token": "skipped-ahead-one-step"}]$q$::jsonb, $q$40$q$, $q$After 30 comes 40! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0df4d15b-9b5b-53e3-a84e-8e422a371d88' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '563790d2-e506-5761-9617-a0d43fb71a4a', '0df4d15b-9b5b-53e3-a84e-8e422a371d88', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '563790d2-e506-5761-9617-a0d43fb71a4a')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4225e0e4-9de9-58f1-a061-ae0f4f87f8a5', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which coin is worth the most? Tap it.$q$, $q$[{"text": "penny", "tile": {"kind": "object_group", "count": 1, "image": "penny"}, "is_correct": false, "misconception_token": "picked-least-not-most"}, {"text": "dime", "tile": {"kind": "object_group", "count": 1, "image": "dime"}, "is_correct": false, "misconception_token": "thought-dime-worth-more-than-quarter"}, {"text": "quarter", "tile": {"kind": "object_group", "count": 1, "image": "quarter"}, "is_correct": true}]$q$::jsonb, $q$quarter$q$, $q$The quarter is worth the most! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '109ee3a0-9015-5c7c-a62b-df5a0e1a61c8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4225e0e4-9de9-58f1-a061-ae0f4f87f8a5', '109ee3a0-9015-5c7c-a62b-df5a0e1a61c8', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '4225e0e4-9de9-58f1-a061-ae0f4f87f8a5')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd5c5b3e8-cb0b-50f3-8f78-9df106e6e0e0', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 1 hundred, 2 tens, and 3 ones? Tap it.$q$, $q$[{"text": "132", "tile": {"kind": "number", "value": "132"}, "is_correct": false, "misconception_token": "swapped-tens-and-ones"}, {"text": "120", "tile": {"kind": "number", "value": "120"}, "is_correct": false, "misconception_token": "dropped-the-ones"}, {"text": "321", "tile": {"kind": "number", "value": "321"}, "is_correct": false, "misconception_token": "reversed-digit-order"}, {"text": "123", "tile": {"kind": "number", "value": "123"}, "is_correct": true}]$q$::jsonb, $q$123$q$, $q$1 hundred, 2 tens, 3 ones make 123! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '196570d0-4491-56da-9543-25aea390b5c9' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd5c5b3e8-cb0b-50f3-8f78-9df106e6e0e0', '196570d0-4491-56da-9543-25aea390b5c9', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'd5c5b3e8-cb0b-50f3-8f78-9df106e6e0e0')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5a9f685e-10c8-5baa-ba58-e0b37dad400b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Skip count by 5: 5, 10, 15, and then? Tap the next number.$q$, $q$[{"text": "20", "tile": {"kind": "number", "value": "20"}, "is_correct": true}, {"text": "16", "tile": {"kind": "number", "value": "16"}, "is_correct": false, "misconception_token": "counted-by-ones-not-fives"}, {"text": "30", "tile": {"kind": "number", "value": "30"}, "is_correct": false, "misconception_token": "skipped-ahead-two-steps"}, {"text": "25", "tile": {"kind": "number", "value": "25"}, "is_correct": false, "misconception_token": "skipped-ahead-one-step"}]$q$::jsonb, $q$20$q$, $q$After 15 comes 20! Great skip counting!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '230ab6f2-f78b-52a3-9de4-e33840cc33f5' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5a9f685e-10c8-5baa-ba58-e0b37dad400b', '230ab6f2-f78b-52a3-9de4-e33840cc33f5', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '5a9f685e-10c8-5baa-ba58-e0b37dad400b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd0d60bab-d2de-598b-b4fa-2fba38b98a39', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 100 more than 300? Tap the number.$q$, $q$[{"text": "301", "tile": {"kind": "number", "value": "301"}, "is_correct": false, "misconception_token": "added-one-not-a-hundred"}, {"text": "200", "tile": {"kind": "number", "value": "200"}, "is_correct": false, "misconception_token": "subtracted-instead-of-added"}, {"text": "500", "tile": {"kind": "number", "value": "500"}, "is_correct": false, "misconception_token": "added-two-hundreds-not-one"}, {"text": "400", "tile": {"kind": "number", "value": "400"}, "is_correct": true}]$q$::jsonb, $q$400$q$, $q$100 more than 300 is 400! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '276a962b-6c43-5c3a-ba59-c7d0487e4ef1' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd0d60bab-d2de-598b-b4fa-2fba38b98a39', '276a962b-6c43-5c3a-ba59-c7d0487e4ef1', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'd0d60bab-d2de-598b-b4fa-2fba38b98a39')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd13b1b96-8ee5-5c3a-82b1-8354ac07a130', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 2 hundreds, 0 tens, and 5 ones? Tap it.$q$, $q$[{"text": "205", "tile": {"kind": "number", "value": "205"}, "is_correct": true}, {"text": "250", "tile": {"kind": "number", "value": "250"}, "is_correct": false, "misconception_token": "swapped-tens-and-ones"}, {"text": "502", "tile": {"kind": "number", "value": "502"}, "is_correct": false, "misconception_token": "reversed-digit-order"}, {"text": "25", "tile": {"kind": "number", "value": "25"}, "is_correct": false, "misconception_token": "dropped-zero-placeholder"}]$q$::jsonb, $q$205$q$, $q$2 hundreds and 5 ones make 205! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '31803c58-615f-539d-87bc-01cc07eb504a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd13b1b96-8ee5-5c3a-82b1-8354ac07a130', '31803c58-615f-539d-87bc-01cc07eb504a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'd13b1b96-8ee5-5c3a-82b1-8354ac07a130')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f01b36cc-492f-504d-8133-c7319436b917', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which coin is worth the least? Tap it.$q$, $q$[{"text": "penny", "tile": {"kind": "object_group", "count": 1, "image": "penny"}, "is_correct": true}, {"text": "dime", "tile": {"kind": "object_group", "count": 1, "image": "dime"}, "is_correct": false, "misconception_token": "thought-smaller-coin-worth-less"}, {"text": "quarter", "tile": {"kind": "object_group", "count": 1, "image": "quarter"}, "is_correct": false, "misconception_token": "picked-most-not-least"}]$q$::jsonb, $q$penny$q$, $q$The penny is worth the least! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '43706284-ae55-5d45-8004-175080303660' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f01b36cc-492f-504d-8133-c7319436b917', '43706284-ae55-5d45-8004-175080303660', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f01b36cc-492f-504d-8133-c7319436b917')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5057e6ef-9710-527c-a3b4-8297ec25c2e4', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Here are 4 pennies. How many cents in all? Tap the number.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "counted-one-fewer"}, {"text": "40", "tile": {"kind": "number", "value": "40"}, "is_correct": false, "misconception_token": "counted-pennies-as-dimes"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": true}]$q$::jsonb, $q$4$q$, $q$4 pennies is 4 cents! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '59063cb1-7646-5a1e-b277-f3b60c47de90' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5057e6ef-9710-527c-a3b4-8297ec25c2e4', '59063cb1-7646-5a1e-b277-f3b60c47de90', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '5057e6ef-9710-527c-a3b4-8297ec25c2e4')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e3373b9b-8d4a-5556-be05-ee65329352b5', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Here are 2 dimes. How many cents in all? Tap the number.$q$, $q$[{"text": "20", "tile": {"kind": "number", "value": "20"}, "is_correct": true}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-only-one-dime"}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "counted-coins-not-cents"}, {"text": "25", "tile": {"kind": "number", "value": "25"}, "is_correct": false, "misconception_token": "confused-dimes-with-quarter"}]$q$::jsonb, $q$20$q$, $q$2 dimes is 20 cents! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5b53c093-17c8-5b4f-b449-4252f4744ece' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e3373b9b-8d4a-5556-be05-ee65329352b5', '5b53c093-17c8-5b4f-b449-4252f4744ece', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e3373b9b-8d4a-5556-be05-ee65329352b5')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '1be64ffe-9d20-514b-8df9-b15270747cef', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which coin is worth 10 cents? Tap it.$q$, $q$[{"text": "nickel", "tile": {"kind": "object_group", "count": 1, "image": "nickel"}, "is_correct": false, "misconception_token": "thought-bigger-coin-worth-more"}, {"text": "penny", "tile": {"kind": "object_group", "count": 1, "image": "penny"}, "is_correct": false, "misconception_token": "confused-dime-with-penny"}, {"text": "dime", "tile": {"kind": "object_group", "count": 1, "image": "dime"}, "is_correct": true}]$q$::jsonb, $q$dime$q$, $q$The dime is worth 10 cents! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5e1a0aa7-8dff-5359-ac4b-80ad6b9bf50c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '1be64ffe-9d20-514b-8df9-b15270747cef', '5e1a0aa7-8dff-5359-ac4b-80ad6b9bf50c', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '1be64ffe-9d20-514b-8df9-b15270747cef')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '14a50f34-f9e4-5923-bd4e-36a16e79079d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Here are 2 quarters. How many cents in all? Tap the number.$q$, $q$[{"text": "25", "tile": {"kind": "number", "value": "25"}, "is_correct": false, "misconception_token": "counted-only-one-quarter"}, {"text": "50", "tile": {"kind": "number", "value": "50"}, "is_correct": true}, {"text": "20", "tile": {"kind": "number", "value": "20"}, "is_correct": false, "misconception_token": "counted-quarters-as-dimes"}, {"text": "75", "tile": {"kind": "number", "value": "75"}, "is_correct": false, "misconception_token": "counted-one-extra-quarter"}]$q$::jsonb, $q$50$q$, $q$2 quarters is 50 cents! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '847bb43d-6064-5ad3-a223-6400b2b0792a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '14a50f34-f9e4-5923-bd4e-36a16e79079d', '847bb43d-6064-5ad3-a223-6400b2b0792a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '14a50f34-f9e4-5923-bd4e-36a16e79079d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '251d2d79-e88b-544d-ae45-4497dbc527c4', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which coin is worth 1 cent? Tap it.$q$, $q$[{"text": "nickel", "tile": {"kind": "object_group", "count": 1, "image": "nickel"}, "is_correct": false, "misconception_token": "confused-penny-with-nickel"}, {"text": "penny", "tile": {"kind": "object_group", "count": 1, "image": "penny"}, "is_correct": true}, {"text": "dime", "tile": {"kind": "object_group", "count": 1, "image": "dime"}, "is_correct": false, "misconception_token": "confused-penny-with-dime"}]$q$::jsonb, $q$penny$q$, $q$The penny is worth 1 cent! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '84ecf226-9ece-55c2-92fa-105c81abdcc8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '251d2d79-e88b-544d-ae45-4497dbc527c4', '84ecf226-9ece-55c2-92fa-105c81abdcc8', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '251d2d79-e88b-544d-ae45-4497dbc527c4')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b4876e09-e312-543d-8e48-7145271d4d03', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 4 hundreds, 5 tens, and 6 ones? Tap it.$q$, $q$[{"text": "456", "tile": {"kind": "number", "value": "456"}, "is_correct": true}, {"text": "465", "tile": {"kind": "number", "value": "465"}, "is_correct": false, "misconception_token": "swapped-tens-and-ones"}, {"text": "654", "tile": {"kind": "number", "value": "654"}, "is_correct": false, "misconception_token": "reversed-digit-order"}, {"text": "450", "tile": {"kind": "number", "value": "450"}, "is_correct": false, "misconception_token": "dropped-the-ones"}]$q$::jsonb, $q$456$q$, $q$4 hundreds, 5 tens, 6 ones make 456! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '89e47a40-9550-5173-a3a3-d12568551c4a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b4876e09-e312-543d-8e48-7145271d4d03', '89e47a40-9550-5173-a3a3-d12568551c4a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'b4876e09-e312-543d-8e48-7145271d4d03')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b1c18932-9989-5f89-a2a2-bd4515b5ce1e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which coin is worth 5 cents? Tap it.$q$, $q$[{"text": "penny", "tile": {"kind": "object_group", "count": 1, "image": "penny"}, "is_correct": false, "misconception_token": "confused-nickel-with-penny"}, {"text": "dime", "tile": {"kind": "object_group", "count": 1, "image": "dime"}, "is_correct": false, "misconception_token": "confused-nickel-with-dime"}, {"text": "nickel", "tile": {"kind": "object_group", "count": 1, "image": "nickel"}, "is_correct": true}]$q$::jsonb, $q$nickel$q$, $q$The nickel is worth 5 cents! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '9a6a982d-fe8d-57bb-8417-7aeeccdc4e6a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b1c18932-9989-5f89-a2a2-bd4515b5ce1e', '9a6a982d-fe8d-57bb-8417-7aeeccdc4e6a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'b1c18932-9989-5f89-a2a2-bd4515b5ce1e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '68532442-e652-5de6-a684-70ad57d9e6ee', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Here are 2 nickels. How many cents in all? Tap the number.$q$, $q$[{"text": "15", "tile": {"kind": "number", "value": "15"}, "is_correct": false, "misconception_token": "counted-one-extra-nickel"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-only-one-nickel"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": true}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "counted-coins-not-cents"}]$q$::jsonb, $q$10$q$, $q$2 nickels is 10 cents! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a6c97c96-0cb6-5a9c-bf5e-26b3ca9e6294' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '68532442-e652-5de6-a684-70ad57d9e6ee', 'a6c97c96-0cb6-5a9c-bf5e-26b3ca9e6294', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '68532442-e652-5de6-a684-70ad57d9e6ee')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '96878c48-80a9-575b-ba22-06556dd07db4', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Which coin is worth 25 cents? Tap it.$q$, $q$[{"text": "dime", "tile": {"kind": "object_group", "count": 1, "image": "dime"}, "is_correct": false, "misconception_token": "confused-quarter-with-dime"}, {"text": "quarter", "tile": {"kind": "object_group", "count": 1, "image": "quarter"}, "is_correct": true}, {"text": "nickel", "tile": {"kind": "object_group", "count": 1, "image": "nickel"}, "is_correct": false, "misconception_token": "confused-quarter-with-nickel"}]$q$::jsonb, $q$quarter$q$, $q$The quarter is worth 25 cents! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b1bfe031-a8b0-50dd-9608-9f18f7f25dfa' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '96878c48-80a9-575b-ba22-06556dd07db4', 'b1bfe031-a8b0-50dd-9608-9f18f7f25dfa', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '96878c48-80a9-575b-ba22-06556dd07db4')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b471ac21-5bd9-5620-850c-f24ac05441f9', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many cents is a nickel worth? Tap the number.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": true}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "confused-nickel-with-dime"}, {"text": "1", "tile": {"kind": "number", "value": "1"}, "is_correct": false, "misconception_token": "confused-nickel-with-penny"}, {"text": "25", "tile": {"kind": "number", "value": "25"}, "is_correct": false, "misconception_token": "confused-nickel-with-quarter"}]$q$::jsonb, $q$5$q$, $q$A nickel is 5 cents! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b71b41d7-018b-5323-baf0-b06967296b08' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b471ac21-5bd9-5620-850c-f24ac05441f9', 'b71b41d7-018b-5323-baf0-b06967296b08', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'b471ac21-5bd9-5620-850c-f24ac05441f9')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '2969da7d-6b84-5cc1-baf4-6d03281ebc9c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Here are 3 nickels. How many cents in all? Tap the number.$q$, $q$[{"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-by-fives-one-short"}, {"text": "20", "tile": {"kind": "number", "value": "20"}, "is_correct": false, "misconception_token": "counted-by-fives-one-extra"}, {"text": "15", "tile": {"kind": "number", "value": "15"}, "is_correct": true}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "counted-coins-not-cents"}]$q$::jsonb, $q$15$q$, $q$3 nickels is 15 cents! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'cf231d99-4c8e-59e4-bf81-00636e9d3a12' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '2969da7d-6b84-5cc1-baf4-6d03281ebc9c', 'cf231d99-4c8e-59e4-bf81-00636e9d3a12', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '2969da7d-6b84-5cc1-baf4-6d03281ebc9c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c304c110-8697-5b68-ae30-cac6f8d99782', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many cents is a penny worth? Tap the number.$q$, $q$[{"text": "25", "tile": {"kind": "number", "value": "25"}, "is_correct": false, "misconception_token": "confused-penny-with-quarter"}, {"text": "1", "tile": {"kind": "number", "value": "1"}, "is_correct": true}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "confused-penny-with-nickel"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "confused-penny-with-dime"}]$q$::jsonb, $q$1$q$, $q$A penny is 1 cent! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'dfb82122-bd12-5d33-bacf-7e6c6dbd5a89' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c304c110-8697-5b68-ae30-cac6f8d99782', 'dfb82122-bd12-5d33-bacf-7e6c6dbd5a89', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c304c110-8697-5b68-ae30-cac6f8d99782')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '44fd772e-4195-5151-9b3a-6182941437f0', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 3 hundreds, 4 tens, and 0 ones? Tap it.$q$, $q$[{"text": "304", "tile": {"kind": "number", "value": "304"}, "is_correct": false, "misconception_token": "swapped-tens-and-ones"}, {"text": "34", "tile": {"kind": "number", "value": "34"}, "is_correct": false, "misconception_token": "dropped-zero-placeholder"}, {"text": "340", "tile": {"kind": "number", "value": "340"}, "is_correct": true}, {"text": "430", "tile": {"kind": "number", "value": "430"}, "is_correct": false, "misconception_token": "swapped-hundreds-and-tens"}]$q$::jsonb, $q$340$q$, $q$3 hundreds and 4 tens make 340! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e5bc9b49-fba3-58ac-81dd-e145741780f8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '44fd772e-4195-5151-9b3a-6182941437f0', 'e5bc9b49-fba3-58ac-81dd-e145741780f8', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '44fd772e-4195-5151-9b3a-6182941437f0')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '8dfb5014-4bd6-51a9-bb55-99f68f533107', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Here are 3 dimes. How many cents in all? Tap the number.$q$, $q$[{"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "counted-coins-not-cents"}, {"text": "20", "tile": {"kind": "number", "value": "20"}, "is_correct": false, "misconception_token": "counted-one-fewer-dime"}, {"text": "30", "tile": {"kind": "number", "value": "30"}, "is_correct": true}, {"text": "40", "tile": {"kind": "number", "value": "40"}, "is_correct": false, "misconception_token": "counted-one-extra-dime"}]$q$::jsonb, $q$30$q$, $q$3 dimes is 30 cents! Great counting!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ea61ab1a-77a5-57d9-9c07-dff0b518d562' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '8dfb5014-4bd6-51a9-bb55-99f68f533107', 'ea61ab1a-77a5-57d9-9c07-dff0b518d562', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '8dfb5014-4bd6-51a9-bb55-99f68f533107')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '1dde2872-95b0-5995-add9-43ac780d6c7e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many cents is a dime worth? Tap the number.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "confused-dime-with-nickel"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": true}, {"text": "25", "tile": {"kind": "number", "value": "25"}, "is_correct": false, "misconception_token": "confused-dime-with-quarter"}, {"text": "1", "tile": {"kind": "number", "value": "1"}, "is_correct": false, "misconception_token": "confused-dime-with-penny"}]$q$::jsonb, $q$10$q$, $q$A dime is 10 cents! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f817e3a9-42fa-56f8-b24d-c45b8ec10561' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '1dde2872-95b0-5995-add9-43ac780d6c7e', 'f817e3a9-42fa-56f8-b24d-c45b8ec10561', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '1dde2872-95b0-5995-add9-43ac780d6c7e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e1fe4feb-6abb-5ae6-929a-b4d246976f9c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 10 more than 240? Tap the number.$q$, $q$[{"text": "250", "tile": {"kind": "number", "value": "250"}, "is_correct": true}, {"text": "230", "tile": {"kind": "number", "value": "230"}, "is_correct": false, "misconception_token": "subtracted-instead-of-added"}, {"text": "340", "tile": {"kind": "number", "value": "340"}, "is_correct": false, "misconception_token": "added-a-hundred-not-ten"}, {"text": "241", "tile": {"kind": "number", "value": "241"}, "is_correct": false, "misconception_token": "added-one-not-ten"}]$q$::jsonb, $q$250$q$, $q$10 more than 240 is 250! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f91a0625-fd7c-55f3-a69a-736831c6aa85' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e1fe4feb-6abb-5ae6-929a-b4d246976f9c', 'f91a0625-fd7c-55f3-a69a-736831c6aa85', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e1fe4feb-6abb-5ae6-929a-b4d246976f9c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4a76abdb-5c87-5d41-8000-bb53bff2fba2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many hundreds are in 500? Tap the number.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": true}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "500", "tile": {"kind": "number", "value": "500"}, "is_correct": false, "misconception_token": "gave-whole-number-not-hundreds"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-one-short"}]$q$::jsonb, $q$5$q$, $q$There are 5 hundreds in 500! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'fe672a27-ccdf-5d23-97bf-6eec39c89653' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4a76abdb-5c87-5d41-8000-bb53bff2fba2', 'fe672a27-ccdf-5d23-97bf-6eec39c89653', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '4a76abdb-5c87-5d41-8000-bb53bff2fba2')
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
select '95f57be8-c090-54e7-9e57-049e41f18dec', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many ones are in 51? Tap the number.$q$, $q$[{"text": "1", "tile": {"kind": "number", "value": "1"}, "is_correct": true}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "0", "tile": {"kind": "number", "value": "0"}, "is_correct": false, "misconception_token": "thought-there-are-no-ones"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "gave-tens-digit-not-ones"}]$q$::jsonb, $q$1$q$, $q$51 has 1 one! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '08a8ad8c-9014-526f-870e-e56bee8a0c4e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '95f57be8-c090-54e7-9e57-049e41f18dec', '08a8ad8c-9014-526f-870e-e56bee8a0c4e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '95f57be8-c090-54e7-9e57-049e41f18dec')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b6980e43-4f07-5f64-b8a1-130e9cb22e56', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number comes right after 49? Tap it.$q$, $q$[{"text": "50", "tile": {"kind": "number", "value": "50"}, "is_correct": true}, {"text": "48", "tile": {"kind": "number", "value": "48"}, "is_correct": false, "misconception_token": "picked-before-not-after"}, {"text": "59", "tile": {"kind": "number", "value": "59"}, "is_correct": false, "misconception_token": "added-ten-not-one"}, {"text": "40", "tile": {"kind": "number", "value": "40"}, "is_correct": false, "misconception_token": "went-back-to-start-of-decade"}]$q$::jsonb, $q$50$q$, $q$After 49 comes 50! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0d5b43a4-0c43-5421-b92b-72551a474666' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b6980e43-4f07-5f64-b8a1-130e9cb22e56', '0d5b43a4-0c43-5421-b92b-72551a474666', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'b6980e43-4f07-5f64-b8a1-130e9cb22e56')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '22d449ff-f3b2-529d-8a4e-f359aae91cb3', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many tens are in 50? Tap the number.$q$, $q$[{"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-one-fewer"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": true}, {"text": "50", "tile": {"kind": "number", "value": "50"}, "is_correct": false, "misconception_token": "gave-whole-number-not-tens"}]$q$::jsonb, $q$5$q$, $q$There are 5 tens in 50! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '149ddcf6-119c-5c1c-9abf-48688330195d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '22d449ff-f3b2-529d-8a4e-f359aae91cb3', '149ddcf6-119c-5c1c-9abf-48688330195d', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '22d449ff-f3b2-529d-8a4e-f359aae91cb3')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '2ef3e8e8-4ca8-5c48-b55d-0c23c81adc3c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 6 tens and 0 ones? Tap it.$q$, $q$[{"text": "50", "tile": {"kind": "number", "value": "50"}, "is_correct": false, "misconception_token": "counted-one-ten-fewer"}, {"text": "16", "tile": {"kind": "number", "value": "16"}, "is_correct": false, "misconception_token": "wrote-one-ten-and-six-ones"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-tens-as-ones"}, {"text": "60", "tile": {"kind": "number", "value": "60"}, "is_correct": true}]$q$::jsonb, $q$60$q$, $q$6 tens and no ones make 60! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '2b55c591-e6cb-5309-a13d-868e71edd4bd' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '2ef3e8e8-4ca8-5c48-b55d-0c23c81adc3c', '2b55c591-e6cb-5309-a13d-868e71edd4bd', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '2ef3e8e8-4ca8-5c48-b55d-0c23c81adc3c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '60e8a5b4-fd7a-5fbb-a1dc-3777651abf52', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 10 less than 28? Tap the number.$q$, $q$[{"text": "18", "tile": {"kind": "number", "value": "18"}, "is_correct": true}, {"text": "38", "tile": {"kind": "number", "value": "38"}, "is_correct": false, "misconception_token": "added-instead-of-subtracted"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "subtracted-twenty-not-ten"}, {"text": "27", "tile": {"kind": "number", "value": "27"}, "is_correct": false, "misconception_token": "subtracted-one-not-ten"}]$q$::jsonb, $q$18$q$, $q$10 less than 28 is 18! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '33e51dcd-2dda-57e3-9242-2ab7ca361dfd' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '60e8a5b4-fd7a-5fbb-a1dc-3777651abf52', '33e51dcd-2dda-57e3-9242-2ab7ca361dfd', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '60e8a5b4-fd7a-5fbb-a1dc-3777651abf52')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e51d6863-23d6-561d-95f4-f35a284aa32a', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 1 ten and 7 ones? Tap it.$q$, $q$[{"text": "71", "tile": {"kind": "number", "value": "71"}, "is_correct": false, "misconception_token": "swapped-tens-and-ones"}, {"text": "18", "tile": {"kind": "number", "value": "18"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "dropped-the-ones"}, {"text": "17", "tile": {"kind": "number", "value": "17"}, "is_correct": true}]$q$::jsonb, $q$17$q$, $q$1 ten and 7 ones make 17! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '376c2ec1-e759-5ad7-8b7d-cdb3d1c5a02d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e51d6863-23d6-561d-95f4-f35a284aa32a', '376c2ec1-e759-5ad7-8b7d-cdb3d1c5a02d', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e51d6863-23d6-561d-95f4-f35a284aa32a')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '94b021f0-165f-539e-938a-77840a81a9a4', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 5 tens and 6 ones? Tap it.$q$, $q$[{"text": "56", "tile": {"kind": "number", "value": "56"}, "is_correct": true}, {"text": "65", "tile": {"kind": "number", "value": "65"}, "is_correct": false, "misconception_token": "swapped-tens-and-ones"}, {"text": "50", "tile": {"kind": "number", "value": "50"}, "is_correct": false, "misconception_token": "dropped-the-ones"}, {"text": "55", "tile": {"kind": "number", "value": "55"}, "is_correct": false, "misconception_token": "wrote-digit-twice"}]$q$::jsonb, $q$56$q$, $q$5 tens and 6 ones make 56! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '42f335e7-55aa-5714-8b46-6b9ccef8982e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '94b021f0-165f-539e-938a-77840a81a9a4', '42f335e7-55aa-5714-8b46-6b9ccef8982e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '94b021f0-165f-539e-938a-77840a81a9a4')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '584739e5-b183-5f5c-947f-c2fe4b65c357', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 10 more than 30? Tap the number.$q$, $q$[{"text": "20", "tile": {"kind": "number", "value": "20"}, "is_correct": false, "misconception_token": "subtracted-instead-of-added"}, {"text": "31", "tile": {"kind": "number", "value": "31"}, "is_correct": false, "misconception_token": "added-one-not-ten"}, {"text": "40", "tile": {"kind": "number", "value": "40"}, "is_correct": true}, {"text": "50", "tile": {"kind": "number", "value": "50"}, "is_correct": false, "misconception_token": "added-twenty-not-ten"}]$q$::jsonb, $q$40$q$, $q$10 more than 30 is 40! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '43426cd6-59b3-5858-8910-27ca2bbf4cdc' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '584739e5-b183-5f5c-947f-c2fe4b65c357', '43426cd6-59b3-5858-8910-27ca2bbf4cdc', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '584739e5-b183-5f5c-947f-c2fe4b65c357')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '58203f8c-c4aa-56af-8821-9e2089f20d97', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many tens are in 24? Tap the number.$q$, $q$[{"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "gave-ones-digit-not-tens"}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": true}, {"text": "24", "tile": {"kind": "number", "value": "24"}, "is_correct": false, "misconception_token": "gave-whole-number-not-tens"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$2$q$, $q$24 has 2 tens! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '4940d686-d0fa-5ebd-ba25-07b3e24b04e6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '58203f8c-c4aa-56af-8821-9e2089f20d97', '4940d686-d0fa-5ebd-ba25-07b3e24b04e6', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '58203f8c-c4aa-56af-8821-9e2089f20d97')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e2b660f8-1db1-50b2-a02c-e116225c51a2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many ones are in 38? Tap the number.$q$, $q$[{"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-one-fewer"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "gave-tens-digit-not-ones"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": true}]$q$::jsonb, $q$8$q$, $q$38 has 8 ones! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '4d645a02-c5be-55b8-8a0d-78436b98d698' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e2b660f8-1db1-50b2-a02c-e116225c51a2', '4d645a02-c5be-55b8-8a0d-78436b98d698', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e2b660f8-1db1-50b2-a02c-e116225c51a2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7936ac38-74f2-527b-902b-7f58c0449aec', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 8 tens? Tap the number.$q$, $q$[{"text": "80", "tile": {"kind": "number", "value": "80"}, "is_correct": true}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-tens-as-ones"}, {"text": "88", "tile": {"kind": "number", "value": "88"}, "is_correct": false, "misconception_token": "wrote-digit-twice"}, {"text": "18", "tile": {"kind": "number", "value": "18"}, "is_correct": false, "misconception_token": "wrote-one-ten-and-eight-ones"}]$q$::jsonb, $q$80$q$, $q$8 tens is 80! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '75590fb9-ba4b-5589-bc34-bb3976aa566e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7936ac38-74f2-527b-902b-7f58c0449aec', '75590fb9-ba4b-5589-bc34-bb3976aa566e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7936ac38-74f2-527b-902b-7f58c0449aec')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e0356083-4887-5321-a3af-cf3652c2db12', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many tens are in 70? Tap the number.$q$, $q$[{"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-one-fewer"}, {"text": "70", "tile": {"kind": "number", "value": "70"}, "is_correct": false, "misconception_token": "gave-whole-number-not-tens"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": true}]$q$::jsonb, $q$7$q$, $q$There are 7 tens in 70! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7db8ed2f-8844-57be-af60-504ff25f68a5' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e0356083-4887-5321-a3af-cf3652c2db12', '7db8ed2f-8844-57be-af60-504ff25f68a5', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e0356083-4887-5321-a3af-cf3652c2db12')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '63199320-fe7b-5b6f-9d36-fc4319927d77', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 2 tens and 3 ones? Tap it.$q$, $q$[{"text": "25", "tile": {"kind": "number", "value": "25"}, "is_correct": false, "misconception_token": "counted-two-extra-ones"}, {"text": "23", "tile": {"kind": "number", "value": "23"}, "is_correct": true}, {"text": "32", "tile": {"kind": "number", "value": "32"}, "is_correct": false, "misconception_token": "swapped-tens-and-ones"}, {"text": "20", "tile": {"kind": "number", "value": "20"}, "is_correct": false, "misconception_token": "dropped-the-ones"}]$q$::jsonb, $q$23$q$, $q$2 tens and 3 ones make 23! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7e2c75a3-3fd7-5b01-91f8-4b3f0aeff281' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '63199320-fe7b-5b6f-9d36-fc4319927d77', '7e2c75a3-3fd7-5b01-91f8-4b3f0aeff281', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '63199320-fe7b-5b6f-9d36-fc4319927d77')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3cc618ef-8bb2-5065-b843-9a11101cec2c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 3 tens and 4 ones? Tap it.$q$, $q$[{"text": "34", "tile": {"kind": "number", "value": "34"}, "is_correct": true}, {"text": "30", "tile": {"kind": "number", "value": "30"}, "is_correct": false, "misconception_token": "dropped-the-ones"}, {"text": "43", "tile": {"kind": "number", "value": "43"}, "is_correct": false, "misconception_token": "swapped-tens-and-ones"}, {"text": "35", "tile": {"kind": "number", "value": "35"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$34$q$, $q$3 tens and 4 ones make 34! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '835643cd-c4ac-5ee3-93f5-ffa7228e4c4c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3cc618ef-8bb2-5065-b843-9a11101cec2c', '835643cd-c4ac-5ee3-93f5-ffa7228e4c4c', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '3cc618ef-8bb2-5065-b843-9a11101cec2c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd3c9a85b-bae4-5844-a739-cff219f8635a', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number comes right before 30? Tap it.$q$, $q$[{"text": "29", "tile": {"kind": "number", "value": "29"}, "is_correct": true}, {"text": "20", "tile": {"kind": "number", "value": "20"}, "is_correct": false, "misconception_token": "went-back-ten-not-one"}, {"text": "28", "tile": {"kind": "number", "value": "28"}, "is_correct": false, "misconception_token": "went-back-two-not-one"}, {"text": "31", "tile": {"kind": "number", "value": "31"}, "is_correct": false, "misconception_token": "picked-after-not-before"}]$q$::jsonb, $q$29$q$, $q$Before 30 comes 29! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '852b8aa9-5baf-59a2-bf0c-4904f084ce03' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd3c9a85b-bae4-5844-a739-cff219f8635a', '852b8aa9-5baf-59a2-bf0c-4904f084ce03', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'd3c9a85b-bae4-5844-a739-cff219f8635a')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '1af2ec77-5e99-565c-bcc1-9dd1ff3c05d5', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many tens are in 30? Tap the number.$q$, $q$[{"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "counted-one-fewer"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-one-extra"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": true}, {"text": "30", "tile": {"kind": "number", "value": "30"}, "is_correct": false, "misconception_token": "gave-whole-number-not-tens"}]$q$::jsonb, $q$3$q$, $q$There are 3 tens in 30! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '86e4819f-6d35-53b8-bd54-a9e80a728b46' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '1af2ec77-5e99-565c-bcc1-9dd1ff3c05d5', '86e4819f-6d35-53b8-bd54-a9e80a728b46', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '1af2ec77-5e99-565c-bcc1-9dd1ff3c05d5')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0a381b1d-5ba3-5515-b4ab-47095f8267cd', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 7 tens and 2 ones? Tap it.$q$, $q$[{"text": "70", "tile": {"kind": "number", "value": "70"}, "is_correct": false, "misconception_token": "dropped-the-ones"}, {"text": "27", "tile": {"kind": "number", "value": "27"}, "is_correct": false, "misconception_token": "swapped-tens-and-ones"}, {"text": "72", "tile": {"kind": "number", "value": "72"}, "is_correct": true}, {"text": "73", "tile": {"kind": "number", "value": "73"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$72$q$, $q$7 tens and 2 ones make 72! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8889e524-2731-5ff5-8d68-163c20f778e2' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0a381b1d-5ba3-5515-b4ab-47095f8267cd', '8889e524-2731-5ff5-8d68-163c20f778e2', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '0a381b1d-5ba3-5515-b4ab-47095f8267cd')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '016d8de1-2146-53c7-b205-05b18856b41f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 3 tens and 8 ones? Tap it.$q$, $q$[{"text": "38", "tile": {"kind": "number", "value": "38"}, "is_correct": true}, {"text": "30", "tile": {"kind": "number", "value": "30"}, "is_correct": false, "misconception_token": "dropped-the-ones"}, {"text": "83", "tile": {"kind": "number", "value": "83"}, "is_correct": false, "misconception_token": "swapped-tens-and-ones"}, {"text": "28", "tile": {"kind": "number", "value": "28"}, "is_correct": false, "misconception_token": "counted-one-ten-fewer"}]$q$::jsonb, $q$38$q$, $q$3 tens and 8 ones make 38! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8e27d5f6-d538-5130-ac2e-e5aac76f98ec' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '016d8de1-2146-53c7-b205-05b18856b41f', '8e27d5f6-d538-5130-ac2e-e5aac76f98ec', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '016d8de1-2146-53c7-b205-05b18856b41f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4a92b302-4b76-512c-81e3-0f23fce16074', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 4 tens and 1 one? Tap it.$q$, $q$[{"text": "40", "tile": {"kind": "number", "value": "40"}, "is_correct": false, "misconception_token": "dropped-the-ones"}, {"text": "41", "tile": {"kind": "number", "value": "41"}, "is_correct": true}, {"text": "44", "tile": {"kind": "number", "value": "44"}, "is_correct": false, "misconception_token": "wrote-digit-twice"}, {"text": "14", "tile": {"kind": "number", "value": "14"}, "is_correct": false, "misconception_token": "swapped-tens-and-ones"}]$q$::jsonb, $q$41$q$, $q$4 tens and 1 one make 41! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8e385059-d08a-5c0a-bd95-673104847adc' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4a92b302-4b76-512c-81e3-0f23fce16074', '8e385059-d08a-5c0a-bd95-673104847adc', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '4a92b302-4b76-512c-81e3-0f23fce16074')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c327ba30-89aa-5fcc-929b-5c8591099905', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number comes right after 79? Tap it.$q$, $q$[{"text": "70", "tile": {"kind": "number", "value": "70"}, "is_correct": false, "misconception_token": "went-back-to-start-of-decade"}, {"text": "80", "tile": {"kind": "number", "value": "80"}, "is_correct": true}, {"text": "78", "tile": {"kind": "number", "value": "78"}, "is_correct": false, "misconception_token": "picked-before-not-after"}, {"text": "89", "tile": {"kind": "number", "value": "89"}, "is_correct": false, "misconception_token": "added-ten-not-one"}]$q$::jsonb, $q$80$q$, $q$After 79 comes 80! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'abd25e4a-5986-5c79-a45a-9e79b43d1274' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c327ba30-89aa-5fcc-929b-5c8591099905', 'abd25e4a-5986-5c79-a45a-9e79b43d1274', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c327ba30-89aa-5fcc-929b-5c8591099905')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'cc3334b2-50ff-52ef-8f34-055b13069e04', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$How many ones are in 46? Tap the number.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-one-fewer"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "gave-tens-digit-not-ones"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": true}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-one-extra"}]$q$::jsonb, $q$6$q$, $q$46 has 6 ones! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b732ae0c-914a-5733-b0a4-3ad94cc30d58' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'cc3334b2-50ff-52ef-8f34-055b13069e04', 'b732ae0c-914a-5733-b0a4-3ad94cc30d58', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'cc3334b2-50ff-52ef-8f34-055b13069e04')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '592bb7b8-8cf0-59f9-a71b-5bfaebc09304', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 4 tens? Tap the number.$q$, $q$[{"text": "14", "tile": {"kind": "number", "value": "14"}, "is_correct": false, "misconception_token": "wrote-one-ten-and-four-ones"}, {"text": "44", "tile": {"kind": "number", "value": "44"}, "is_correct": false, "misconception_token": "wrote-digit-twice"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-tens-as-ones"}, {"text": "40", "tile": {"kind": "number", "value": "40"}, "is_correct": true}]$q$::jsonb, $q$40$q$, $q$4 tens is 40! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c623fdf4-e96f-53c0-9bd7-20254895e8cb' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '592bb7b8-8cf0-59f9-a71b-5bfaebc09304', 'c623fdf4-e96f-53c0-9bd7-20254895e8cb', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '592bb7b8-8cf0-59f9-a71b-5bfaebc09304')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e96e4656-c425-5d39-99ac-5547e89c6963', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 10 more than 45? Tap the number.$q$, $q$[{"text": "55", "tile": {"kind": "number", "value": "55"}, "is_correct": true}, {"text": "46", "tile": {"kind": "number", "value": "46"}, "is_correct": false, "misconception_token": "added-one-not-ten"}, {"text": "44", "tile": {"kind": "number", "value": "44"}, "is_correct": false, "misconception_token": "subtracted-one-not-added-ten"}, {"text": "35", "tile": {"kind": "number", "value": "35"}, "is_correct": false, "misconception_token": "subtracted-instead-of-added"}]$q$::jsonb, $q$55$q$, $q$10 more than 45 is 55! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c7103b69-3293-57e0-9ecb-cf9293156fb1' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e96e4656-c425-5d39-99ac-5547e89c6963', 'c7103b69-3293-57e0-9ecb-cf9293156fb1', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e96e4656-c425-5d39-99ac-5547e89c6963')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '49738502-cadf-581a-91c3-6a90ab666f0f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 9 tens and 9 ones? Tap it.$q$, $q$[{"text": "99", "tile": {"kind": "number", "value": "99"}, "is_correct": true}, {"text": "90", "tile": {"kind": "number", "value": "90"}, "is_correct": false, "misconception_token": "dropped-the-ones"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "wrote-only-one-digit"}, {"text": "89", "tile": {"kind": "number", "value": "89"}, "is_correct": false, "misconception_token": "counted-one-ten-fewer"}]$q$::jsonb, $q$99$q$, $q$9 tens and 9 ones make 99! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd9a35f04-477a-57e1-9de2-3cf35ce098ec' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '49738502-cadf-581a-91c3-6a90ab666f0f', 'd9a35f04-477a-57e1-9de2-3cf35ce098ec', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '49738502-cadf-581a-91c3-6a90ab666f0f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '151363bf-bf30-5ad5-8486-6d2e2a010519', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What number is 8 tens and 5 ones? Tap it.$q$, $q$[{"text": "88", "tile": {"kind": "number", "value": "88"}, "is_correct": false, "misconception_token": "wrote-digit-twice"}, {"text": "58", "tile": {"kind": "number", "value": "58"}, "is_correct": false, "misconception_token": "swapped-tens-and-ones"}, {"text": "85", "tile": {"kind": "number", "value": "85"}, "is_correct": true}, {"text": "80", "tile": {"kind": "number", "value": "80"}, "is_correct": false, "misconception_token": "dropped-the-ones"}]$q$::jsonb, $q$85$q$, $q$8 tens and 5 ones make 85! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'dd2c9c56-fa7d-54ef-84dd-24a3ff4dc4b3' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '151363bf-bf30-5ad5-8486-6d2e2a010519', 'dd2c9c56-fa7d-54ef-84dd-24a3ff4dc4b3', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '151363bf-bf30-5ad5-8486-6d2e2a010519')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '359f6a53-2b9e-5537-b8cb-ecdfb7f78215', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 10 less than 60? Tap the number.$q$, $q$[{"text": "59", "tile": {"kind": "number", "value": "59"}, "is_correct": false, "misconception_token": "subtracted-one-not-ten"}, {"text": "70", "tile": {"kind": "number", "value": "70"}, "is_correct": false, "misconception_token": "added-instead-of-subtracted"}, {"text": "40", "tile": {"kind": "number", "value": "40"}, "is_correct": false, "misconception_token": "subtracted-twenty-not-ten"}, {"text": "50", "tile": {"kind": "number", "value": "50"}, "is_correct": true}]$q$::jsonb, $q$50$q$, $q$10 less than 60 is 50! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e7b8e0b8-9abd-5ba2-a954-cba6beaaaf62' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '359f6a53-2b9e-5537-b8cb-ecdfb7f78215', 'e7b8e0b8-9abd-5ba2-a954-cba6beaaaf62', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '359f6a53-2b9e-5537-b8cb-ecdfb7f78215')
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
select 'cc69c628-710f-5022-a2b4-0c30804e2cc7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the triangle? Tap it.$q$, $q$[{"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-triangle-with-circle"}, {"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": false, "misconception_token": "confused-triangle-with-square"}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": true}]$q$::jsonb, $q$triangle$q$, $q$Yes! A triangle has three sides. Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0aa1a233-4fb6-56d3-9537-3aa879a35808' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'cc69c628-710f-5022-a2b4-0c30804e2cc7', '0aa1a233-4fb6-56d3-9537-3aa879a35808', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'cc69c628-710f-5022-a2b4-0c30804e2cc7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f669803c-5329-59eb-b248-ef66a19fa119', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the hexagon? Tap it.$q$, $q$[{"text": "hexagon", "tile": {"kind": "object_group", "count": 1, "image": "hexagon"}, "is_correct": true}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-hexagon-with-triangle"}, {"text": "heart", "tile": {"kind": "object_group", "count": 1, "image": "heart"}, "is_correct": false, "misconception_token": "confused-hexagon-with-heart"}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-hexagon-with-circle"}]$q$::jsonb, $q$hexagon$q$, $q$The hexagon has six sides! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0e8fdd11-6508-5023-807a-7665ce92f091' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f669803c-5329-59eb-b248-ef66a19fa119', '0e8fdd11-6508-5023-807a-7665ce92f091', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f669803c-5329-59eb-b248-ef66a19fa119')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '1199864b-27e1-5661-bee2-a2d2591f0d2d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the square? Tap it.$q$, $q$[{"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "confused-square-with-star"}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-square-with-triangle"}, {"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": true}, {"text": "heart", "tile": {"kind": "object_group", "count": 1, "image": "heart"}, "is_correct": false, "misconception_token": "confused-square-with-heart"}]$q$::jsonb, $q$square$q$, $q$The square has four equal sides! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '17cd028c-8d3d-50ed-81e2-9ca3f5e30c37' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '1199864b-27e1-5661-bee2-a2d2591f0d2d', '17cd028c-8d3d-50ed-81e2-9ca3f5e30c37', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '1199864b-27e1-5661-bee2-a2d2591f0d2d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e4560531-3866-5ad5-acb6-cc6867992767', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the shape with six sides.$q$, $q$[{"text": "hexagon", "tile": {"kind": "object_group", "count": 1, "image": "hexagon"}, "is_correct": true}, {"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": false, "misconception_token": "confused-hexagon-with-square"}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-hexagon-with-circle"}]$q$::jsonb, $q$hexagon$q$, $q$A hexagon has six sides! Nice counting!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '19ce25dd-93d0-5c05-972a-b62bfb8122b7' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e4560531-3866-5ad5-acb6-cc6867992767', '19ce25dd-93d0-5c05-972a-b62bfb8122b7', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e4560531-3866-5ad5-acb6-cc6867992767')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '8743026b-66d4-5c44-8e0d-7a3701f04ede', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the square? Tap it.$q$, $q$[{"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": true}, {"text": "heart", "tile": {"kind": "object_group", "count": 1, "image": "heart"}, "is_correct": false, "misconception_token": "confused-square-with-heart"}, {"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "confused-square-with-star"}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-square-with-circle"}]$q$::jsonb, $q$square$q$, $q$That's the square! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '24713976-313b-56a5-8654-47acaeff3555' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '8743026b-66d4-5c44-8e0d-7a3701f04ede', '24713976-313b-56a5-8654-47acaeff3555', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '8743026b-66d4-5c44-8e0d-7a3701f04ede')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f25069fe-113c-5b63-942f-760bfd93c70f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the heart? Tap it.$q$, $q$[{"text": "heart", "tile": {"kind": "object_group", "count": 1, "image": "heart"}, "is_correct": true}, {"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "confused-heart-with-star"}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-heart-with-triangle"}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-heart-with-circle"}]$q$::jsonb, $q$heart$q$, $q$That's the heart! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '2f8c2176-053f-5dcd-a234-63ec0256dfa1' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f25069fe-113c-5b63-942f-760bfd93c70f', '2f8c2176-053f-5dcd-a234-63ec0256dfa1', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f25069fe-113c-5b63-942f-760bfd93c70f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '559f726a-ad62-53ca-980b-671f8adc5423', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the diamond? Tap it.$q$, $q$[{"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-diamond-with-circle"}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-diamond-with-triangle"}, {"text": "diamond", "tile": {"kind": "object_group", "count": 1, "image": "diamond"}, "is_correct": true}]$q$::jsonb, $q$diamond$q$, $q$Yes! That's a diamond. Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '33e590a3-bca6-5fb8-b39c-565b509249f4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '559f726a-ad62-53ca-980b-671f8adc5423', '33e590a3-bca6-5fb8-b39c-565b509249f4', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '559f726a-ad62-53ca-980b-671f8adc5423')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd4eea005-966a-5ceb-9e3b-46bfc8945368', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the rectangle? Tap it.$q$, $q$[{"text": "rectangle", "tile": {"kind": "object_group", "count": 1, "image": "rectangle"}, "is_correct": true}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-rectangle-with-circle"}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-rectangle-with-triangle"}]$q$::jsonb, $q$rectangle$q$, $q$Yes! A rectangle is like a long box. Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '3daa7a56-9ab4-565b-9586-860e2be9fbcf' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd4eea005-966a-5ceb-9e3b-46bfc8945368', '3daa7a56-9ab4-565b-9586-860e2be9fbcf', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'd4eea005-966a-5ceb-9e3b-46bfc8945368')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '2a9cd3c9-2e57-50a6-9118-812be1da6aa2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the square? Tap it.$q$, $q$[{"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": true}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-square-with-circle"}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-square-with-triangle"}]$q$::jsonb, $q$square$q$, $q$Yes! A square has four equal sides. Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '44eaa01a-a044-5a03-8c87-2fb03bdc3015' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '2a9cd3c9-2e57-50a6-9118-812be1da6aa2', '44eaa01a-a044-5a03-8c87-2fb03bdc3015', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '2a9cd3c9-2e57-50a6-9118-812be1da6aa2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '942ac97b-4814-5be0-bab5-e18d3a433ec8', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the oval? Tap it.$q$, $q$[{"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": false, "misconception_token": "confused-oval-with-square"}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-oval-with-triangle"}, {"text": "oval", "tile": {"kind": "object_group", "count": 1, "image": "oval"}, "is_correct": true}, {"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "confused-oval-with-star"}]$q$::jsonb, $q$oval$q$, $q$That's the oval! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '4f13891e-bf94-51e4-908f-ad58e79d8e38' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '942ac97b-4814-5be0-bab5-e18d3a433ec8', '4f13891e-bf94-51e4-908f-ad58e79d8e38', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '942ac97b-4814-5be0-bab5-e18d3a433ec8')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ac23eb1c-73ff-5aca-ae80-9a792c411507', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the circle? Tap it.$q$, $q$[{"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-circle-with-triangle"}, {"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "confused-circle-with-star"}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": true}, {"text": "heart", "tile": {"kind": "object_group", "count": 1, "image": "heart"}, "is_correct": false, "misconception_token": "confused-circle-with-heart"}]$q$::jsonb, $q$circle$q$, $q$That round shape is the circle! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5abe6f36-ba87-5918-99db-2b7ac750be57' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ac23eb1c-73ff-5aca-ae80-9a792c411507', '5abe6f36-ba87-5918-99db-2b7ac750be57', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ac23eb1c-73ff-5aca-ae80-9a792c411507')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '35814c7c-e3bc-5324-b432-bed3af5a0812', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the circle? Tap it.$q$, $q$[{"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-circle-with-triangle"}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": true}, {"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": false, "misconception_token": "confused-circle-with-square"}]$q$::jsonb, $q$circle$q$, $q$Yes! That round shape is a circle. Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5bbdd273-c1dd-54b2-ad7a-2be19600d638' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '35814c7c-e3bc-5324-b432-bed3af5a0812', '5bbdd273-c1dd-54b2-ad7a-2be19600d638', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '35814c7c-e3bc-5324-b432-bed3af5a0812')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7b59048c-b2cf-5719-b8ec-df49dc2cc1b9', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the star? Tap it.$q$, $q$[{"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-star-with-circle"}, {"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": false, "misconception_token": "confused-star-with-square"}, {"text": "heart", "tile": {"kind": "object_group", "count": 1, "image": "heart"}, "is_correct": false, "misconception_token": "confused-star-with-heart"}, {"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": true}]$q$::jsonb, $q$star$q$, $q$That's the star! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '693883bf-50bf-5ebf-8a81-1002fa2d3ef5' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7b59048c-b2cf-5719-b8ec-df49dc2cc1b9', '693883bf-50bf-5ebf-8a81-1002fa2d3ef5', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7b59048c-b2cf-5719-b8ec-df49dc2cc1b9')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c5294af3-0cfd-5de6-ac19-83c80eb5df34', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the round shape.$q$, $q$[{"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": false, "misconception_token": "confused-circle-with-square"}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-circle-with-triangle"}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": true}]$q$::jsonb, $q$circle$q$, $q$A circle is perfectly round! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7137c9c9-3416-5f28-b487-d194f78ca583' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c5294af3-0cfd-5de6-ac19-83c80eb5df34', '7137c9c9-3416-5f28-b487-d194f78ca583', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c5294af3-0cfd-5de6-ac19-83c80eb5df34')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '6ffc714a-a3fd-58c2-9d4e-bf3bbb9af546', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the shape that is stretched like an egg.$q$, $q$[{"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-oval-with-triangle"}, {"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": false, "misconception_token": "confused-oval-with-square"}, {"text": "oval", "tile": {"kind": "object_group", "count": 1, "image": "oval"}, "is_correct": true}]$q$::jsonb, $q$oval$q$, $q$An oval is like a stretched circle! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a1fe3031-f22e-517c-a8bc-d7e5df26014d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '6ffc714a-a3fd-58c2-9d4e-bf3bbb9af546', 'a1fe3031-f22e-517c-a8bc-d7e5df26014d', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '6ffc714a-a3fd-58c2-9d4e-bf3bbb9af546')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '017d1f64-c89d-5798-abea-28873e4304a7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the star? Tap it.$q$, $q$[{"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-star-with-circle"}, {"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": true}, {"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": false, "misconception_token": "confused-star-with-square"}]$q$::jsonb, $q$star$q$, $q$Yes! That's a star. Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a6059f1c-fde6-5a41-936c-9dee016199e2' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '017d1f64-c89d-5798-abea-28873e4304a7', 'a6059f1c-fde6-5a41-936c-9dee016199e2', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '017d1f64-c89d-5798-abea-28873e4304a7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '1ec277e1-8363-50ec-8f32-9c3074a6a06e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the triangle? Tap it.$q$, $q$[{"text": "rectangle", "tile": {"kind": "object_group", "count": 1, "image": "rectangle"}, "is_correct": false, "misconception_token": "confused-triangle-with-rectangle"}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-triangle-with-circle"}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": true}, {"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "confused-triangle-with-star"}]$q$::jsonb, $q$triangle$q$, $q$The triangle has three sides! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b5f5e878-db23-53cc-923f-27680753f5c4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '1ec277e1-8363-50ec-8f32-9c3074a6a06e', 'b5f5e878-db23-53cc-923f-27680753f5c4', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '1ec277e1-8363-50ec-8f32-9c3074a6a06e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '759810fa-ef6b-5afd-a6a4-9f00d06b4d5c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the heart? Tap it.$q$, $q$[{"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "confused-heart-with-star"}, {"text": "heart", "tile": {"kind": "object_group", "count": 1, "image": "heart"}, "is_correct": true}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-heart-with-circle"}]$q$::jsonb, $q$heart$q$, $q$That's the heart! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b8c22f83-264c-5c42-8bb6-6d553093926e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '759810fa-ef6b-5afd-a6a4-9f00d06b4d5c', 'b8c22f83-264c-5c42-8bb6-6d553093926e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '759810fa-ef6b-5afd-a6a4-9f00d06b4d5c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '593e8e9b-1c64-51d9-a960-978dcaeee55e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the shape that looks like a long box.$q$, $q$[{"text": "rectangle", "tile": {"kind": "object_group", "count": 1, "image": "rectangle"}, "is_correct": true}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-rectangle-with-circle"}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-rectangle-with-triangle"}]$q$::jsonb, $q$rectangle$q$, $q$A rectangle is like a long box! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c3d1cbb3-8fc5-5439-8523-89c9a4dac952' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '593e8e9b-1c64-51d9-a960-978dcaeee55e', 'c3d1cbb3-8fc5-5439-8523-89c9a4dac952', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '593e8e9b-1c64-51d9-a960-978dcaeee55e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '626778c2-bfd8-5e07-ae3d-be57e1725124', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the diamond? Tap it.$q$, $q$[{"text": "heart", "tile": {"kind": "object_group", "count": 1, "image": "heart"}, "is_correct": false, "misconception_token": "confused-diamond-with-heart"}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-diamond-with-circle"}, {"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "confused-diamond-with-star"}, {"text": "diamond", "tile": {"kind": "object_group", "count": 1, "image": "diamond"}, "is_correct": true}]$q$::jsonb, $q$diamond$q$, $q$That's the diamond! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c5bcc324-1cd8-55e6-a0d3-5636036ccd96' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '626778c2-bfd8-5e07-ae3d-be57e1725124', 'c5bcc324-1cd8-55e6-a0d3-5636036ccd96', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '626778c2-bfd8-5e07-ae3d-be57e1725124')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '28372587-0e4a-5be8-bee7-1f8e192d9513', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the triangle? Tap it.$q$, $q$[{"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "confused-triangle-with-star"}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-triangle-with-circle"}, {"text": "heart", "tile": {"kind": "object_group", "count": 1, "image": "heart"}, "is_correct": false, "misconception_token": "confused-triangle-with-heart"}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": true}]$q$::jsonb, $q$triangle$q$, $q$The triangle has three corners! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'cc643032-4c8a-5ba9-b0df-a2ec22814ff6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '28372587-0e4a-5be8-bee7-1f8e192d9513', 'cc643032-4c8a-5ba9-b0df-a2ec22814ff6', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '28372587-0e4a-5be8-bee7-1f8e192d9513')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '6d7cc656-f354-5468-baf2-222b391524e2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the hexagon? Tap it.$q$, $q$[{"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-hexagon-with-circle"}, {"text": "hexagon", "tile": {"kind": "object_group", "count": 1, "image": "hexagon"}, "is_correct": true}, {"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": false, "misconception_token": "confused-hexagon-with-square"}]$q$::jsonb, $q$hexagon$q$, $q$Yes! A hexagon has six sides. Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd3727cf5-729a-5550-bca2-30fe79dcd61e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '6d7cc656-f354-5468-baf2-222b391524e2', 'd3727cf5-729a-5550-bca2-30fe79dcd61e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '6d7cc656-f354-5468-baf2-222b391524e2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '8f326cf7-8aab-5589-ad25-d6529f83d476', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the shape with three corners.$q$, $q$[{"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": true}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-triangle-with-circle"}, {"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": false, "misconception_token": "confused-triangle-with-square"}]$q$::jsonb, $q$triangle$q$, $q$A triangle has three corners! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd41254db-7dfc-5541-9b66-62b7a7dd2dc8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '8f326cf7-8aab-5589-ad25-d6529f83d476', 'd41254db-7dfc-5541-9b66-62b7a7dd2dc8', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '8f326cf7-8aab-5589-ad25-d6529f83d476')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c43b2f8a-a599-54b9-981e-3dc1b06d3c4e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the oval? Tap it.$q$, $q$[{"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-oval-with-triangle"}, {"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": false, "misconception_token": "confused-oval-with-square"}, {"text": "oval", "tile": {"kind": "object_group", "count": 1, "image": "oval"}, "is_correct": true}]$q$::jsonb, $q$oval$q$, $q$Yes! An oval is like a stretched circle. Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd424c8bb-87b0-5dbf-9a13-dcb24b4fb0c0' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c43b2f8a-a599-54b9-981e-3dc1b06d3c4e', 'd424c8bb-87b0-5dbf-9a13-dcb24b4fb0c0', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c43b2f8a-a599-54b9-981e-3dc1b06d3c4e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '43170119-92bd-55eb-a126-4350d11284ee', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the rectangle? Tap it.$q$, $q$[{"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-rectangle-with-triangle"}, {"text": "rectangle", "tile": {"kind": "object_group", "count": 1, "image": "rectangle"}, "is_correct": true}, {"text": "circle", "tile": {"kind": "object_group", "count": 1, "image": "circle"}, "is_correct": false, "misconception_token": "confused-rectangle-with-circle"}, {"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "confused-rectangle-with-star"}]$q$::jsonb, $q$rectangle$q$, $q$That's the rectangle! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e63bd904-4738-59b0-9675-3281c8a9d2b5' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '43170119-92bd-55eb-a126-4350d11284ee', 'e63bd904-4738-59b0-9675-3281c8a9d2b5', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '43170119-92bd-55eb-a126-4350d11284ee')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7c6baaf5-d737-5e70-a4dd-3ff64fca53a8', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the heart? Tap it.$q$, $q$[{"text": "heart", "tile": {"kind": "object_group", "count": 1, "image": "heart"}, "is_correct": true}, {"text": "square", "tile": {"kind": "object_group", "count": 1, "image": "square"}, "is_correct": false, "misconception_token": "confused-heart-with-square"}, {"text": "triangle", "tile": {"kind": "object_group", "count": 1, "image": "triangle"}, "is_correct": false, "misconception_token": "confused-heart-with-triangle"}]$q$::jsonb, $q$heart$q$, $q$Yes! That's a heart. Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f7748c42-6193-567b-84e5-78dd3dc4cd5c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7c6baaf5-d737-5e70-a4dd-3ff64fca53a8', 'f7748c42-6193-567b-84e5-78dd3dc4cd5c', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7c6baaf5-d737-5e70-a4dd-3ff64fca53a8')
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
select '2978a2af-f5c2-5c6e-aad2-203f102262d8', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 10 minus 3? Tap the answer.$q$, $q$[{"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-back-two-too-few"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": true}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}]$q$::jsonb, $q$7$q$, $q$10 minus 3 is 7! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '04ed1acf-6f8f-5e3f-ab7f-6c2b0e34811e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '2978a2af-f5c2-5c6e-aad2-203f102262d8', '04ed1acf-6f8f-5e3f-ab7f-6c2b0e34811e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '2978a2af-f5c2-5c6e-aad2-203f102262d8')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c0c37a58-9094-5090-b137-0d7d306ab2f2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 9 minus 3? Tap the answer.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": true}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-back-two-too-many"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}]$q$::jsonb, $q$6$q$, $q$9 minus 3 is 6! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '059f4369-b85c-5fcf-9bbc-9f370962c875' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c0c37a58-9094-5090-b137-0d7d306ab2f2', '059f4369-b85c-5fcf-9bbc-9f370962c875', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c0c37a58-9094-5090-b137-0d7d306ab2f2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5863c9c4-edcf-5282-9488-8790a154a705', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 18 minus 9? Tap the answer.$q$, $q$[{"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": true}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-back-two-too-many"}]$q$::jsonb, $q$9$q$, $q$18 minus 9 is 9! Great subtracting!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '1241d35d-c7b6-54fd-ba87-8b36ff755ed4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5863c9c4-edcf-5282-9488-8790a154a705', '1241d35d-c7b6-54fd-ba87-8b36ff755ed4', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '5863c9c4-edcf-5282-9488-8790a154a705')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7f1759d5-3585-5e4f-90c1-7bcf7e2a1ff9', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 6 minus 3? Tap the answer.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-back-two-too-few"}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": true}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}]$q$::jsonb, $q$3$q$, $q$6 minus 3 is 3! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '31493eda-a6cc-5786-bb2d-01df25724381' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7f1759d5-3585-5e4f-90c1-7bcf7e2a1ff9', '31493eda-a6cc-5786-bb2d-01df25724381', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7f1759d5-3585-5e4f-90c1-7bcf7e2a1ff9')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '81d9c049-3ed8-50a7-b25f-e7d5a44517a9', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 10 minus 4? Tap the answer.$q$, $q$[{"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": true}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-back-two-too-few"}]$q$::jsonb, $q$6$q$, $q$10 minus 4 is 6! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '32b5f71a-341c-5880-8dc1-87c83adff1fe' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '81d9c049-3ed8-50a7-b25f-e7d5a44517a9', '32b5f71a-341c-5880-8dc1-87c83adff1fe', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '81d9c049-3ed8-50a7-b25f-e7d5a44517a9')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c8abbe94-8384-59ae-a2f7-bfecdfea8408', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 14 minus 5? Tap the answer.$q$, $q$[{"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": true}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-back-two-too-many"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}]$q$::jsonb, $q$9$q$, $q$14 minus 5 is 9! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '34cd9044-fee3-5a0b-8c05-bce9020c280c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c8abbe94-8384-59ae-a2f7-bfecdfea8408', '34cd9044-fee3-5a0b-8c05-bce9020c280c', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c8abbe94-8384-59ae-a2f7-bfecdfea8408')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '23101104-136a-5364-9873-7fc9e223e206', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 4 minus 1? Tap the answer.$q$, $q$[{"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": true}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "did-not-take-any-away"}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "added-instead-of-subtracted"}]$q$::jsonb, $q$3$q$, $q$4 minus 1 is 3! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '3f635a6d-aa17-5b71-b931-ec6e122d91dd' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '23101104-136a-5364-9873-7fc9e223e206', '3f635a6d-aa17-5b71-b931-ec6e122d91dd', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '23101104-136a-5364-9873-7fc9e223e206')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'e3d62185-e920-5d31-a237-4579d75daae6', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 14 minus 6? Tap the answer.$q$, $q$[{"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": true}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-back-two-too-few"}]$q$::jsonb, $q$8$q$, $q$14 minus 6 is 8! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '4393e70e-e998-5315-9d5f-06cce13122cd' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'e3d62185-e920-5d31-a237-4579d75daae6', '4393e70e-e998-5315-9d5f-06cce13122cd', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'e3d62185-e920-5d31-a237-4579d75daae6')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '747a7727-cae2-5b89-bbaa-0ef21f7f4d00', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 8 minus 5? Tap the answer.$q$, $q$[{"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "chose-number-taken-away"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": true}]$q$::jsonb, $q$3$q$, $q$8 minus 5 is 3! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '475146dd-7a33-58e6-9ca8-e853c256ffeb' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '747a7727-cae2-5b89-bbaa-0ef21f7f4d00', '475146dd-7a33-58e6-9ca8-e853c256ffeb', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '747a7727-cae2-5b89-bbaa-0ef21f7f4d00')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '84ffe340-8039-5a11-97a0-037ccab89402', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 11 minus 5? Tap the answer.$q$, $q$[{"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": true}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-back-two-too-few"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "chose-number-taken-away"}]$q$::jsonb, $q$6$q$, $q$11 minus 5 is 6! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '4c589fae-7443-5c1a-8d51-2035949c463b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '84ffe340-8039-5a11-97a0-037ccab89402', '4c589fae-7443-5c1a-8d51-2035949c463b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '84ffe340-8039-5a11-97a0-037ccab89402')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'bde90a9b-e451-56f4-a427-d2a4e2b2d741', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 11 minus 4? Tap the answer.$q$, $q$[{"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-back-two-too-few"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": true}]$q$::jsonb, $q$7$q$, $q$11 minus 4 is 7! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '504c4f4f-f1e6-50b7-a246-9ac2c94aa26e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'bde90a9b-e451-56f4-a427-d2a4e2b2d741', '504c4f4f-f1e6-50b7-a246-9ac2c94aa26e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'bde90a9b-e451-56f4-a427-d2a4e2b2d741')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f83cb6dd-eaad-5c91-99e4-2cce6c6d5aa6', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 8 minus 2? Tap the answer.$q$, $q$[{"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": true}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-back-two-too-many"}]$q$::jsonb, $q$6$q$, $q$8 minus 2 is 6! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '6ec0cfbd-528a-5557-a8ce-aa350a918904' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f83cb6dd-eaad-5c91-99e4-2cce6c6d5aa6', '6ec0cfbd-528a-5557-a8ce-aa350a918904', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f83cb6dd-eaad-5c91-99e4-2cce6c6d5aa6')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f4d27d9a-c3c8-5de7-8d91-66f1e6b6416b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 13 minus 6? Tap the answer.$q$, $q$[{"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": true}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "chose-number-taken-away"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-back-two-too-few"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}]$q$::jsonb, $q$7$q$, $q$13 minus 6 is 7! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '74de75ee-4fad-5a35-8184-ab3524a11ede' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f4d27d9a-c3c8-5de7-8d91-66f1e6b6416b', '74de75ee-4fad-5a35-8184-ab3524a11ede', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f4d27d9a-c3c8-5de7-8d91-66f1e6b6416b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a92014ca-5e2a-5217-8bdb-565b5f2b9edf', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 7 minus 3? Tap the answer.$q$, $q$[{"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-back-two-too-few"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "chose-number-taken-away"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": true}]$q$::jsonb, $q$4$q$, $q$7 minus 3 is 4! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '801d1e91-50a9-5365-8dfb-edebdfb29242' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a92014ca-5e2a-5217-8bdb-565b5f2b9edf', '801d1e91-50a9-5365-8dfb-edebdfb29242', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'a92014ca-5e2a-5217-8bdb-565b5f2b9edf')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '065b3a01-ebfb-5ced-b14e-e5585e99b6de', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 3 minus 1? Tap the answer.$q$, $q$[{"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "did-not-take-any-away"}, {"text": "1", "tile": {"kind": "number", "value": "1"}, "is_correct": false, "misconception_token": "chose-number-taken-away"}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": true}]$q$::jsonb, $q$2$q$, $q$3 minus 1 is 2! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8bc81653-3629-5537-973c-bf6a090f5ee3' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '065b3a01-ebfb-5ced-b14e-e5585e99b6de', '8bc81653-3629-5537-973c-bf6a090f5ee3', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '065b3a01-ebfb-5ced-b14e-e5585e99b6de')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4634b32a-4cd9-5f1a-b3c8-5a0122f56b06', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 10 minus 6? Tap the answer.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": true}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "chose-number-taken-away"}]$q$::jsonb, $q$4$q$, $q$10 minus 6 is 4! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8f416d86-53f5-5685-bd19-32a38ca21a32' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4634b32a-4cd9-5f1a-b3c8-5a0122f56b06', '8f416d86-53f5-5685-bd19-32a38ca21a32', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '4634b32a-4cd9-5f1a-b3c8-5a0122f56b06')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '6d440360-9437-5b16-a92f-96e322b8143d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 5 minus 1? Tap the answer.$q$, $q$[{"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": true}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "did-not-take-any-away"}]$q$::jsonb, $q$4$q$, $q$5 minus 1 is 4! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '9042e38d-d264-50a0-9269-d4be839a1edc' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '6d440360-9437-5b16-a92f-96e322b8143d', '9042e38d-d264-50a0-9269-d4be839a1edc', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '6d440360-9437-5b16-a92f-96e322b8143d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '475a9aa4-195e-541e-8143-bcb5bc5ab0ab', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 7 minus 2? Tap the answer.$q$, $q$[{"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": true}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "counted-back-two-too-many"}]$q$::jsonb, $q$5$q$, $q$7 minus 2 is 5! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a41d0f8a-0396-5525-8109-33c07eb0c3dd' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '475a9aa4-195e-541e-8143-bcb5bc5ab0ab', 'a41d0f8a-0396-5525-8109-33c07eb0c3dd', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '475a9aa4-195e-541e-8143-bcb5bc5ab0ab')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '56bf5182-9296-53c4-ba11-b70be04240ad', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 13 minus 4? Tap the answer.$q$, $q$[{"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-back-two-too-many"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": true}]$q$::jsonb, $q$9$q$, $q$13 minus 4 is 9! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a58e49cb-59a9-5fa0-9f53-4e4175e246c9' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '56bf5182-9296-53c4-ba11-b70be04240ad', 'a58e49cb-59a9-5fa0-9f53-4e4175e246c9', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '56bf5182-9296-53c4-ba11-b70be04240ad')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f0f19a8b-a502-5360-a4bc-245b0c3cf1a0', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 12 minus 4? Tap the answer.$q$, $q$[{"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-back-two-too-few"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": true}]$q$::jsonb, $q$8$q$, $q$12 minus 4 is 8! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b7369737-39d6-5dcd-a905-80ba1ee9cf44' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f0f19a8b-a502-5360-a4bc-245b0c3cf1a0', 'b7369737-39d6-5dcd-a905-80ba1ee9cf44', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f0f19a8b-a502-5360-a4bc-245b0c3cf1a0')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '08f18fac-3d25-50c9-a917-8caeeb295a3c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 16 minus 8? Tap the answer.$q$, $q$[{"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": true}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "10", "tile": {"kind": "number", "value": "10"}, "is_correct": false, "misconception_token": "counted-back-two-too-few"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}]$q$::jsonb, $q$8$q$, $q$16 minus 8 is 8! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'bfdaa3b2-e857-5ab4-ba2c-d46ebbba02f7' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '08f18fac-3d25-50c9-a917-8caeeb295a3c', 'bfdaa3b2-e857-5ab4-ba2c-d46ebbba02f7', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '08f18fac-3d25-50c9-a917-8caeeb295a3c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a14104b6-789e-5852-a4a5-040ebde269a2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Here are 6 balls. Take away 2. How many are left? Tap the answer.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": true}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "did-not-take-any-away"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}]$q$::jsonb, $q$4$q$, $q$6 take away 2 is 4! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c00b4411-7ae5-5940-a380-49b45cea8fc2' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a14104b6-789e-5852-a4a5-040ebde269a2', 'c00b4411-7ae5-5940-a380-49b45cea8fc2', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'a14104b6-789e-5852-a4a5-040ebde269a2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ef404ff3-6f81-5891-9de8-378991171798', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 15 minus 7? Tap the answer.$q$, $q$[{"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": true}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-back-two-too-many"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "chose-number-taken-away"}]$q$::jsonb, $q$8$q$, $q$15 minus 7 is 8! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c2d3566e-5214-5407-a40f-7a4674a6f494' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ef404ff3-6f81-5891-9de8-378991171798', 'c2d3566e-5214-5407-a40f-7a4674a6f494', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ef404ff3-6f81-5891-9de8-378991171798')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0266437f-2c21-5204-8a58-412d2a8f5fe7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Here are 5 apples. Take away 2. How many are left? Tap the answer.$q$, $q$[{"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}, {"text": "3", "tile": {"kind": "number", "value": "3"}, "is_correct": true}, {"text": "2", "tile": {"kind": "number", "value": "2"}, "is_correct": false, "misconception_token": "chose-number-taken-away"}]$q$::jsonb, $q$3$q$, $q$5 take away 2 is 3! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c54f48fc-f8ca-5044-ba4d-108cd26cc2ed' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0266437f-2c21-5204-8a58-412d2a8f5fe7', 'c54f48fc-f8ca-5044-ba4d-108cd26cc2ed', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '0266437f-2c21-5204-8a58-412d2a8f5fe7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '48689003-2cc5-5c7d-a255-a490f528629b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 9 minus 4? Tap the answer.$q$, $q$[{"text": "5", "tile": {"kind": "number", "value": "5"}, "is_correct": true}, {"text": "4", "tile": {"kind": "number", "value": "4"}, "is_correct": false, "misconception_token": "chose-number-taken-away"}, {"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": false, "misconception_token": "counted-back-two-too-few"}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}]$q$::jsonb, $q$5$q$, $q$9 minus 4 is 5! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'dcfb7c77-6908-581c-945c-138597c5c13b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '48689003-2cc5-5c7d-a255-a490f528629b', 'dcfb7c77-6908-581c-945c-138597c5c13b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '48689003-2cc5-5c7d-a255-a490f528629b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '41b618c3-98d5-5e71-91c4-bc28eacf99f4', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$What is 12 minus 5? Tap the answer.$q$, $q$[{"text": "7", "tile": {"kind": "number", "value": "7"}, "is_correct": true}, {"text": "6", "tile": {"kind": "number", "value": "6"}, "is_correct": false, "misconception_token": "counted-back-one-too-many"}, {"text": "9", "tile": {"kind": "number", "value": "9"}, "is_correct": false, "misconception_token": "counted-back-two-too-few"}, {"text": "8", "tile": {"kind": "number", "value": "8"}, "is_correct": false, "misconception_token": "counted-back-one-too-few"}]$q$::jsonb, $q$7$q$, $q$12 minus 5 is 7! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f8cdf0af-b625-518b-a786-9e290f8bdfd8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '41b618c3-98d5-5e71-91c4-bc28eacf99f4', 'f8cdf0af-b625-518b-a786-9e290f8bdfd8', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '41b618c3-98d5-5e71-91c4-bc28eacf99f4')
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
select 'd9d75583-a0d2-5d18-a200-7b54bc3dced5', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter H? Tap it.$q$, $q$[{"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "confused-h-and-t"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-h-and-m"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-h-and-s"}, {"text": "H", "tile": {"kind": "letter", "value": "H"}, "is_correct": true}]$q$::jsonb, $q$H$q$, $q$That's H! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '03066060-8491-5c29-bd39-3442c0764e4c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd9d75583-a0d2-5d18-a200-7b54bc3dced5', '03066060-8491-5c29-bd39-3442c0764e4c', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'd9d75583-a0d2-5d18-a200-7b54bc3dced5')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '6cd4dbb5-7e67-5b21-91dd-bb963c768574', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter c.$q$, $q$[{"text": "c", "tile": {"kind": "letter", "value": "c"}, "is_correct": true}, {"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false, "misconception_token": "confused-c-and-m"}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false, "misconception_token": "confused-c-and-s"}]$q$::jsonb, $q$c$q$, $q$Yes, little c! Great!$q$,
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
select '6cd4dbb5-7e67-5b21-91dd-bb963c768574', '1ba654da-02c2-5bad-9026-7a299bea01b5', array['distractor_misconceptions', 'no_dashes']::text[], $q$Added misconception tokens to 2 wrong choices; replaced the em dash in the solution with a comma.$q$
 where exists (select 1 from public.generated_questions where id = '6cd4dbb5-7e67-5b21-91dd-bb963c768574')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4ff9cd32-5f37-5485-9b5f-f4899d5d301b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter E? Tap it.$q$, $q$[{"text": "E", "tile": {"kind": "letter", "value": "E"}, "is_correct": true}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-e-and-s"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-e-and-m"}]$q$::jsonb, $q$E$q$, $q$That's E! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '223248c0-b385-5812-ac0c-80aa133c8cac' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4ff9cd32-5f37-5485-9b5f-f4899d5d301b', '223248c0-b385-5812-ac0c-80aa133c8cac', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '4ff9cd32-5f37-5485-9b5f-f4899d5d301b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '03c15fa0-e7ff-521d-8319-ddf2e9c20c72', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter r.$q$, $q$[{"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false, "misconception_token": "confused-little-r-with-m"}, {"text": "r", "tile": {"kind": "letter", "value": "r"}, "is_correct": true}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false, "misconception_token": "confused-little-r-with-s"}, {"text": "t", "tile": {"kind": "letter", "value": "t"}, "is_correct": false, "misconception_token": "confused-little-r-with-t"}]$q$::jsonb, $q$r$q$, $q$That's little r! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '2ab67b1c-d09b-5f83-9d27-62b7d23f8a2d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '03c15fa0-e7ff-521d-8319-ddf2e9c20c72', '2ab67b1c-d09b-5f83-9d27-62b7d23f8a2d', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '03c15fa0-e7ff-521d-8319-ddf2e9c20c72')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '394ca95f-158d-590a-a6b6-12afba6c1f3a', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter m.$q$, $q$[{"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": true}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false, "misconception_token": "confused-little-m-with-s"}, {"text": "a", "tile": {"kind": "letter", "value": "a"}, "is_correct": false, "misconception_token": "confused-little-m-with-a"}, {"text": "t", "tile": {"kind": "letter", "value": "t"}, "is_correct": false, "misconception_token": "confused-little-m-with-t"}]$q$::jsonb, $q$m$q$, $q$That's little m! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '2e1b1e5c-44e6-573a-bb20-839d731bd61d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '394ca95f-158d-590a-a6b6-12afba6c1f3a', '2e1b1e5c-44e6-573a-bb20-839d731bd61d', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '394ca95f-158d-590a-a6b6-12afba6c1f3a')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd70b7413-114e-5b48-8f96-cb4ee4b3a5a9', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter W? Tap it.$q$, $q$[{"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-w-and-s"}, {"text": "W", "tile": {"kind": "letter", "value": "W"}, "is_correct": true}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "confused-w-and-t"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-w-and-m"}]$q$::jsonb, $q$W$q$, $q$That's W! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '34ac4077-470f-59e6-af63-904255f70b47' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd70b7413-114e-5b48-8f96-cb4ee4b3a5a9', '34ac4077-470f-59e6-af63-904255f70b47', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'd70b7413-114e-5b48-8f96-cb4ee4b3a5a9')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '2f25caa3-d924-5eff-8fcd-733864929e94', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter C? Tap it.$q$, $q$[{"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-c-and-m"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-c-and-s"}, {"text": "C", "tile": {"kind": "letter", "value": "C"}, "is_correct": true}]$q$::jsonb, $q$C$q$, $q$That's C! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '3a4aaf0b-587e-5e13-875f-ae3b1deb4833' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '2f25caa3-d924-5eff-8fcd-733864929e94', '3a4aaf0b-587e-5e13-875f-ae3b1deb4833', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '2f25caa3-d924-5eff-8fcd-733864929e94')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7da29c5b-dfff-5789-b492-b7cfef47c9fa', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter O? Tap it.$q$, $q$[{"text": "O", "tile": {"kind": "letter", "value": "O"}, "is_correct": true}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-o-and-s"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-o-and-m"}]$q$::jsonb, $q$O$q$, $q$That's O, the round one! Great!$q$,
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
select '7da29c5b-dfff-5789-b492-b7cfef47c9fa', '451a97eb-270f-59e6-856a-351bd32f9ed8', array['distractor_misconceptions', 'no_dashes']::text[], $q$Added misconception tokens to 2 wrong choices; replaced the em dash in the solution with a comma.$q$
 where exists (select 1 from public.generated_questions where id = '7da29c5b-dfff-5789-b492-b7cfef47c9fa')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7bd42eee-b838-56a0-b2df-8421c6fce58f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter o.$q$, $q$[{"text": "o", "tile": {"kind": "letter", "value": "o"}, "is_correct": true}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false, "misconception_token": "confused-little-o-with-s"}, {"text": "t", "tile": {"kind": "letter", "value": "t"}, "is_correct": false, "misconception_token": "confused-little-o-with-t"}, {"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false, "misconception_token": "confused-little-o-with-m"}]$q$::jsonb, $q$o$q$, $q$That's little o, nice and round! Nice!$q$,
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
select '7bd42eee-b838-56a0-b2df-8421c6fce58f', '59b6a979-e532-52af-a04e-b5e5f84ce067', array['distractor_misconceptions', 'no_dashes']::text[], $q$Added misconception tokens to 3 wrong choices; replaced the dash in the solution with a comma.$q$
 where exists (select 1 from public.generated_questions where id = '7bd42eee-b838-56a0-b2df-8421c6fce58f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3c516b8e-29b5-5533-b04b-95d20036b294', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter h.$q$, $q$[{"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false, "misconception_token": "confused-little-h-with-s"}, {"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false, "misconception_token": "confused-little-h-with-m"}, {"text": "h", "tile": {"kind": "letter", "value": "h"}, "is_correct": true}, {"text": "t", "tile": {"kind": "letter", "value": "t"}, "is_correct": false, "misconception_token": "confused-little-h-with-t"}]$q$::jsonb, $q$h$q$, $q$That's little h! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '60de5db2-b369-5f68-95dc-8ebde0142e37' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3c516b8e-29b5-5533-b04b-95d20036b294', '60de5db2-b369-5f68-95dc-8ebde0142e37', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '3c516b8e-29b5-5533-b04b-95d20036b294')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ec66a98f-d867-5ecd-8268-1eba118e2e02', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter S? Tap it.$q$, $q$[{"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "confused-s-and-t"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-s-and-m"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": true}, {"text": "B", "tile": {"kind": "letter", "value": "B"}, "is_correct": false, "misconception_token": "confused-s-and-b"}]$q$::jsonb, $q$S$q$, $q$That's S! Nice finding!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '6d176fa6-c510-5119-b222-6c650bf61077' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ec66a98f-d867-5ecd-8268-1eba118e2e02', '6d176fa6-c510-5119-b222-6c650bf61077', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ec66a98f-d867-5ecd-8268-1eba118e2e02')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'bdecf99e-6dd7-5072-8b54-4fc9ed835894', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter T? Tap it.$q$, $q$[{"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-letter-t-with-m"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-letter-t-with-s"}, {"text": "B", "tile": {"kind": "letter", "value": "B"}, "is_correct": false, "misconception_token": "confused-letter-t-with-b"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": true}]$q$::jsonb, $q$T$q$, $q$That's T! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8a6621fe-a233-564f-afbd-46a17a23dcf3' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'bdecf99e-6dd7-5072-8b54-4fc9ed835894', '8a6621fe-a233-564f-afbd-46a17a23dcf3', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'bdecf99e-6dd7-5072-8b54-4fc9ed835894')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9017af33-8c25-5e3c-920e-0e5f26b71f17', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter B? Tap it.$q$, $q$[{"text": "B", "tile": {"kind": "letter", "value": "B"}, "is_correct": true}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-b-and-s"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "confused-b-and-t"}]$q$::jsonb, $q$B$q$, $q$That's B! Nice work!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8ac2ca7f-05a5-5fbb-85af-b06d6792239a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9017af33-8c25-5e3c-920e-0e5f26b71f17', '8ac2ca7f-05a5-5fbb-85af-b06d6792239a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '9017af33-8c25-5e3c-920e-0e5f26b71f17')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '584e82f7-a09c-5b7c-85eb-657ed38c221f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter F? Tap it.$q$, $q$[{"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-f-and-s"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-f-and-m"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "confused-f-and-t"}, {"text": "F", "tile": {"kind": "letter", "value": "F"}, "is_correct": true}]$q$::jsonb, $q$F$q$, $q$That's F! Nice finding!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8ff2959f-d738-50cc-859b-66e4e75c6825' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '584e82f7-a09c-5b7c-85eb-657ed38c221f', '8ff2959f-d738-50cc-859b-66e4e75c6825', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '584e82f7-a09c-5b7c-85eb-657ed38c221f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '70b757d8-54df-5f5e-8c7f-74f6243fb4dc', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter A? Tap it.$q$, $q$[{"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-a-and-m"}, {"text": "A", "tile": {"kind": "letter", "value": "A"}, "is_correct": true}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-a-and-s"}]$q$::jsonb, $q$A$q$, $q$That's A! Great finding!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '909e8627-fcf8-5b87-b3e3-92ea2303a919' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '70b757d8-54df-5f5e-8c7f-74f6243fb4dc', '909e8627-fcf8-5b87-b3e3-92ea2303a919', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '70b757d8-54df-5f5e-8c7f-74f6243fb4dc')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'da17f757-4f6e-503b-94e7-58618239f65b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter s.$q$, $q$[{"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": true}, {"text": "a", "tile": {"kind": "letter", "value": "a"}, "is_correct": false, "misconception_token": "confused-little-s-with-a"}, {"text": "t", "tile": {"kind": "letter", "value": "t"}, "is_correct": false, "misconception_token": "confused-little-s-with-t"}, {"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false, "misconception_token": "confused-little-s-with-m"}]$q$::jsonb, $q$s$q$, $q$That's little s! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '9f545263-ff79-5f60-bddc-817b57fac245' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'da17f757-4f6e-503b-94e7-58618239f65b', '9f545263-ff79-5f60-bddc-817b57fac245', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'da17f757-4f6e-503b-94e7-58618239f65b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '98d590fc-f465-5af4-bcad-902059a15a7e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter t.$q$, $q$[{"text": "t", "tile": {"kind": "letter", "value": "t"}, "is_correct": true}, {"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false, "misconception_token": "confused-little-t-with-m"}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false, "misconception_token": "confused-little-t-with-s"}, {"text": "a", "tile": {"kind": "letter", "value": "a"}, "is_correct": false, "misconception_token": "confused-little-t-with-a"}]$q$::jsonb, $q$t$q$, $q$That's little t! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'a406a226-fa62-5b7a-a5c9-57a98ccc056a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '98d590fc-f465-5af4-bcad-902059a15a7e', 'a406a226-fa62-5b7a-a5c9-57a98ccc056a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '98d590fc-f465-5af4-bcad-902059a15a7e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '88505b7b-a09b-560e-a1bf-fbb9cd5d53c2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter R? Tap it.$q$, $q$[{"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-r-and-s"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-r-and-m"}, {"text": "R", "tile": {"kind": "letter", "value": "R"}, "is_correct": true}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "confused-r-and-t"}]$q$::jsonb, $q$R$q$, $q$That's R! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ba6d88e9-143f-55ed-8b8c-f72083b1cc8f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '88505b7b-a09b-560e-a1bf-fbb9cd5d53c2', 'ba6d88e9-143f-55ed-8b8c-f72083b1cc8f', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '88505b7b-a09b-560e-a1bf-fbb9cd5d53c2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9cb3ae86-3950-54bd-961c-12d48a75003d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter K? Tap it.$q$, $q$[{"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-k-and-m"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-k-and-s"}, {"text": "K", "tile": {"kind": "letter", "value": "K"}, "is_correct": true}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "confused-k-and-t"}]$q$::jsonb, $q$K$q$, $q$That's K! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'bd16af21-10a7-5a58-8040-dbcc20ce60af' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9cb3ae86-3950-54bd-961c-12d48a75003d', 'bd16af21-10a7-5a58-8040-dbcc20ce60af', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '9cb3ae86-3950-54bd-961c-12d48a75003d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'adae8173-15e8-552b-a072-9fd2a7142372', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter f.$q$, $q$[{"text": "f", "tile": {"kind": "letter", "value": "f"}, "is_correct": true}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false, "misconception_token": "confused-little-f-with-s"}, {"text": "t", "tile": {"kind": "letter", "value": "t"}, "is_correct": false, "misconception_token": "confused-little-f-with-t"}, {"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false, "misconception_token": "confused-little-f-with-m"}]$q$::jsonb, $q$f$q$, $q$That's little f! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c888f749-bf6e-5367-94ff-f636241f9ea6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'adae8173-15e8-552b-a072-9fd2a7142372', 'c888f749-bf6e-5367-94ff-f636241f9ea6', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'adae8173-15e8-552b-a072-9fd2a7142372')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '82ae1120-2076-55f7-bb50-4b192313c3c6', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter L? Tap it.$q$, $q$[{"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "confused-l-and-t"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-l-and-s"}, {"text": "L", "tile": {"kind": "letter", "value": "L"}, "is_correct": true}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-l-and-m"}]$q$::jsonb, $q$L$q$, $q$That's L! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd50d1519-3f1d-5f61-b85e-fd6f70f06bf8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '82ae1120-2076-55f7-bb50-4b192313c3c6', 'd50d1519-3f1d-5f61-b85e-fd6f70f06bf8', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '82ae1120-2076-55f7-bb50-4b192313c3c6')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '31f9b2ad-2f9e-5097-85b0-cdcb3dbcef5e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter a.$q$, $q$[{"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false, "misconception_token": "confused-a-and-m"}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false, "misconception_token": "confused-a-and-s"}, {"text": "a", "tile": {"kind": "letter", "value": "a"}, "is_correct": true}]$q$::jsonb, $q$a$q$, $q$Yes, that's little a! Nice!$q$,
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
select '31f9b2ad-2f9e-5097-85b0-cdcb3dbcef5e', 'e7d7fe8f-63c9-56c9-bb99-aee653451a81', array['distractor_misconceptions', 'no_dashes']::text[], $q$Added misconception tokens to 2 wrong choices; replaced the em dash in the solution with a comma.$q$
 where exists (select 1 from public.generated_questions where id = '31f9b2ad-2f9e-5097-85b0-cdcb3dbcef5e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9d94a030-a93a-5f5f-8a26-23451f8aa8bb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter l.$q$, $q$[{"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false, "misconception_token": "confused-little-l-with-m"}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false, "misconception_token": "confused-little-l-with-s"}, {"text": "a", "tile": {"kind": "letter", "value": "a"}, "is_correct": false, "misconception_token": "confused-little-l-with-a"}, {"text": "l", "tile": {"kind": "letter", "value": "l"}, "is_correct": true}]$q$::jsonb, $q$l$q$, $q$That's little l! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'eb72e5d2-096b-5284-90ac-6d062234c014' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9d94a030-a93a-5f5f-8a26-23451f8aa8bb', 'eb72e5d2-096b-5284-90ac-6d062234c014', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '9d94a030-a93a-5f5f-8a26-23451f8aa8bb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0f5548ed-9edd-5a63-907e-5a6366d5f740', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter k.$q$, $q$[{"text": "k", "tile": {"kind": "letter", "value": "k"}, "is_correct": true}, {"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false, "misconception_token": "confused-little-k-with-m"}, {"text": "t", "tile": {"kind": "letter", "value": "t"}, "is_correct": false, "misconception_token": "confused-little-k-with-t"}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false, "misconception_token": "confused-little-k-with-s"}]$q$::jsonb, $q$k$q$, $q$That's little k! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ec86c0bb-1b89-5dde-95ee-7b4b1e202c00' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0f5548ed-9edd-5a63-907e-5a6366d5f740', 'ec86c0bb-1b89-5dde-95ee-7b4b1e202c00', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '0f5548ed-9edd-5a63-907e-5a6366d5f740')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '76fb6a1d-4012-5b47-a31b-f3d44f280f1f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Tap the little letter e.$q$, $q$[{"text": "m", "tile": {"kind": "letter", "value": "m"}, "is_correct": false, "misconception_token": "confused-e-and-m"}, {"text": "t", "tile": {"kind": "letter", "value": "t"}, "is_correct": false, "misconception_token": "confused-e-and-t"}, {"text": "s", "tile": {"kind": "letter", "value": "s"}, "is_correct": false, "misconception_token": "confused-e-and-s"}, {"text": "e", "tile": {"kind": "letter", "value": "e"}, "is_correct": true}]$q$::jsonb, $q$e$q$, $q$That's little e! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f41546b7-7d6f-5985-87a6-fbed777e1753' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '76fb6a1d-4012-5b47-a31b-f3d44f280f1f', 'f41546b7-7d6f-5985-87a6-fbed777e1753', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '76fb6a1d-4012-5b47-a31b-f3d44f280f1f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4978230d-766b-56a1-9e29-5834fb27d7f1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Can you find the letter Z? Tap it.$q$, $q$[{"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "confused-z-and-t"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "confused-z-and-s"}, {"text": "Z", "tile": {"kind": "letter", "value": "Z"}, "is_correct": true}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "confused-z-and-m"}]$q$::jsonb, $q$Z$q$, $q$That's Z, the very last letter! Great!$q$,
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
select '4978230d-766b-56a1-9e29-5834fb27d7f1', 'fef69164-4772-5e21-a811-d0ec67df5504', array['distractor_misconceptions', 'no_dashes']::text[], $q$Added misconception tokens to 3 wrong choices; replaced the em dash in the solution with a comma.$q$
 where exists (select 1 from public.generated_questions where id = '4978230d-766b-56a1-9e29-5834fb27d7f1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '1525c3bf-b032-5866-a22a-95cb13228869', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: moon. Which letter does moon start with?$q$, $q$[{"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": true}]$q$::jsonb, $q$M$q$, $q$Moon starts with mmm… M! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0b5db5ca-815b-5d41-ae5b-2c9f8554d05e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '1525c3bf-b032-5866-a22a-95cb13228869', '0b5db5ca-815b-5d41-ae5b-2c9f8554d05e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '1525c3bf-b032-5866-a22a-95cb13228869')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '670abcf5-65e8-5aa4-931e-97697168602c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: cat. Which letter does cat start with?$q$, $q$[{"text": "C", "tile": {"kind": "letter", "value": "C"}, "is_correct": true}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$C$q$, $q$Cat starts with kuh… C! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '13cf7853-a8e9-5d98-888e-447f09ae2665' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '670abcf5-65e8-5aa4-931e-97697168602c', '13cf7853-a8e9-5d98-888e-447f09ae2665', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '670abcf5-65e8-5aa4-931e-97697168602c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '330bdec2-fc98-588c-9b1f-028cd08777a9', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: door. Which letter does door start with?$q$, $q$[{"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "D", "tile": {"kind": "letter", "value": "D"}, "is_correct": true}, {"text": "F", "tile": {"kind": "letter", "value": "F"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$D$q$, $q$Door starts with duh… D! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '21b815de-adf0-5996-b0c8-ce0d475f3b1f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '330bdec2-fc98-588c-9b1f-028cd08777a9', '21b815de-adf0-5996-b0c8-ce0d475f3b1f', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '330bdec2-fc98-588c-9b1f-028cd08777a9')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '952c2199-0b18-5510-b763-b88db6c4e86d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: net. Which letter does net start with?$q$, $q$[{"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "picked-sound-later-in-word"}, {"text": "N", "tile": {"kind": "letter", "value": "N"}, "is_correct": true}]$q$::jsonb, $q$N$q$, $q$Net starts with nnn… N! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '45f7ab53-c421-5743-81e2-725d46746976' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '952c2199-0b18-5510-b763-b88db6c4e86d', '45f7ab53-c421-5743-81e2-725d46746976', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '952c2199-0b18-5510-b763-b88db6c4e86d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0a08b8cd-cace-5cce-8aa5-3cfdd5181a4f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: leaf. Which letter does leaf start with?$q$, $q$[{"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "L", "tile": {"kind": "letter", "value": "L"}, "is_correct": true}, {"text": "F", "tile": {"kind": "letter", "value": "F"}, "is_correct": false, "misconception_token": "picked-sound-later-in-word"}]$q$::jsonb, $q$L$q$, $q$Leaf starts with lll… L! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '489d38b1-0ccd-56e3-90e7-55fabbce3d07' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0a08b8cd-cace-5cce-8aa5-3cfdd5181a4f', '489d38b1-0ccd-56e3-90e7-55fabbce3d07', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '0a08b8cd-cace-5cce-8aa5-3cfdd5181a4f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '283732d5-2f6a-5031-a22f-7dc8e15f77df', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: key. Which letter does key start with?$q$, $q$[{"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "K", "tile": {"kind": "letter", "value": "K"}, "is_correct": true}]$q$::jsonb, $q$K$q$, $q$Key starts with kuh… K! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '583736ed-e04b-5b0e-bb52-72cd1a4137bd' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '283732d5-2f6a-5031-a22f-7dc8e15f77df', '583736ed-e04b-5b0e-bb52-72cd1a4137bd', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '283732d5-2f6a-5031-a22f-7dc8e15f77df')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b317f32b-2530-5cb2-b3c7-0ea15b94cffb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: mug. Which letter does mug start with?$q$, $q$[{"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": true}, {"text": "B", "tile": {"kind": "letter", "value": "B"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$M$q$, $q$Mug starts with mmm… M! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '59aaef58-08ce-5f9a-b896-2e6b2a38ffd5' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b317f32b-2530-5cb2-b3c7-0ea15b94cffb', '59aaef58-08ce-5f9a-b896-2e6b2a38ffd5', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'b317f32b-2530-5cb2-b3c7-0ea15b94cffb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '421861c7-0617-5c03-be08-98cfd62c082e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: duck. Which letter does duck start with?$q$, $q$[{"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "D", "tile": {"kind": "letter", "value": "D"}, "is_correct": true}]$q$::jsonb, $q$D$q$, $q$Duck starts with duh… D! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5dbb6561-f57b-5bc2-b80e-7833de7ed794' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '421861c7-0617-5c03-be08-98cfd62c082e', '5dbb6561-f57b-5bc2-b80e-7833de7ed794', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '421861c7-0617-5c03-be08-98cfd62c082e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '74f639da-0dbc-5825-98e8-04b6dfe497eb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: sock. Which letter does sock start with?$q$, $q$[{"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": true}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "B", "tile": {"kind": "letter", "value": "B"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$S$q$, $q$Sock starts with sss… S! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '60c2ab36-a75c-5131-af42-42ed49b8bc1c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '74f639da-0dbc-5825-98e8-04b6dfe497eb', '60c2ab36-a75c-5131-af42-42ed49b8bc1c', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '74f639da-0dbc-5825-98e8-04b6dfe497eb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ce1af14d-ef99-5609-a36d-93a78cde572d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: van. Which letter does van start with?$q$, $q$[{"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "V", "tile": {"kind": "letter", "value": "V"}, "is_correct": true}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$V$q$, $q$Van starts with vvv… V! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '638252e6-a33e-5322-9eac-60bf74d9ddd6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ce1af14d-ef99-5609-a36d-93a78cde572d', '638252e6-a33e-5322-9eac-60bf74d9ddd6', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ce1af14d-ef99-5609-a36d-93a78cde572d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c2a7dbac-3851-5542-a20f-901293938650', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: tree. Which letter does tree start with?$q$, $q$[{"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": true}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$T$q$, $q$Tree starts with tuh… T! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '63cc0ddb-e590-5822-9857-414017ff86f3' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c2a7dbac-3851-5542-a20f-901293938650', '63cc0ddb-e590-5822-9857-414017ff86f3', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c2a7dbac-3851-5542-a20f-901293938650')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '00f89ce9-8ece-5971-b812-cac9b9a7a63f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: kite. Which letter does kite start with?$q$, $q$[{"text": "K", "tile": {"kind": "letter", "value": "K"}, "is_correct": true}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "picked-sound-later-in-word"}]$q$::jsonb, $q$K$q$, $q$Kite starts with kuh… K! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '63d214d9-a340-55e6-9860-e145a4079589' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '00f89ce9-8ece-5971-b812-cac9b9a7a63f', '63d214d9-a340-55e6-9860-e145a4079589', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '00f89ce9-8ece-5971-b812-cac9b9a7a63f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7ea7dbd9-b786-5d8d-a03a-196fdcec40ba', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: yo-yo. Which letter does yo-yo start with?$q$, $q$[{"text": "Y", "tile": {"kind": "letter", "value": "Y"}, "is_correct": true}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$Y$q$, $q$Yo-yo starts with yuh… Y! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7429f144-ae5c-527f-881b-a0ba828b8b0b' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7ea7dbd9-b786-5d8d-a03a-196fdcec40ba', '7429f144-ae5c-527f-881b-a0ba828b8b0b', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7ea7dbd9-b786-5d8d-a03a-196fdcec40ba')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'db19fd17-17e6-5ec2-8bba-415e8f8808d5', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: fish. Which letter does fish start with?$q$, $q$[{"text": "F", "tile": {"kind": "letter", "value": "F"}, "is_correct": true}, {"text": "L", "tile": {"kind": "letter", "value": "L"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$F$q$, $q$Fish starts with fff… F! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7d519a0b-56c6-5195-bbd3-403d1578bf5f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'db19fd17-17e6-5ec2-8bba-415e8f8808d5', '7d519a0b-56c6-5195-bbd3-403d1578bf5f', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'db19fd17-17e6-5ec2-8bba-415e8f8808d5')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '3eb895c9-9963-5065-959f-8426d75bbbf8', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: hat. Which letter does hat start with?$q$, $q$[{"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "H", "tile": {"kind": "letter", "value": "H"}, "is_correct": true}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "picked-sound-later-in-word"}]$q$::jsonb, $q$H$q$, $q$Hat starts with hhh… H! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '854cc072-9017-590c-be9a-2367c010518d' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '3eb895c9-9963-5065-959f-8426d75bbbf8', '854cc072-9017-590c-be9a-2367c010518d', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '3eb895c9-9963-5065-959f-8426d75bbbf8')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'b18b99f4-73ee-5175-9ded-7e551b96b2a8', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: jet. Which letter does jet start with?$q$, $q$[{"text": "J", "tile": {"kind": "letter", "value": "J"}, "is_correct": true}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "picked-sound-later-in-word"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$J$q$, $q$Jet starts with juh… J! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '87720d9a-fdd7-579a-81e9-f558e6235025' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'b18b99f4-73ee-5175-9ded-7e551b96b2a8', '87720d9a-fdd7-579a-81e9-f558e6235025', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'b18b99f4-73ee-5175-9ded-7e551b96b2a8')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9f744de7-1514-5431-93dc-f5df6967c359', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: ball. Which letter does ball start with?$q$, $q$[{"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "B", "tile": {"kind": "letter", "value": "B"}, "is_correct": true}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$B$q$, $q$Ball starts with buh… B! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '904df15a-724a-5574-a290-5a3114e353bf' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9f744de7-1514-5431-93dc-f5df6967c359', '904df15a-724a-5574-a290-5a3114e353bf', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '9f744de7-1514-5431-93dc-f5df6967c359')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9670564f-3380-5db0-8c19-193ee97e6ae4', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: bus. Which letter does bus start with?$q$, $q$[{"text": "B", "tile": {"kind": "letter", "value": "B"}, "is_correct": true}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "picked-sound-later-in-word"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$B$q$, $q$Bus starts with buh… B! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '97ee16b3-f1b2-5132-9882-93fae020d074' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9670564f-3380-5db0-8c19-193ee97e6ae4', '97ee16b3-f1b2-5132-9882-93fae020d074', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '9670564f-3380-5db0-8c19-193ee97e6ae4')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f8b21967-99e3-5bf0-a0a0-194f432dfeb8', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: web. Which letter does web start with?$q$, $q$[{"text": "W", "tile": {"kind": "letter", "value": "W"}, "is_correct": true}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$W$q$, $q$Web starts with wuh… W! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ab1b9d85-2c36-56ee-aaca-003d0f6016a8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f8b21967-99e3-5bf0-a0a0-194f432dfeb8', 'ab1b9d85-2c36-56ee-aaca-003d0f6016a8', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f8b21967-99e3-5bf0-a0a0-194f432dfeb8')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a5771caf-d46b-5134-b400-600753b75421', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: pig. Which letter does pig start with?$q$, $q$[{"text": "P", "tile": {"kind": "letter", "value": "P"}, "is_correct": true}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$P$q$, $q$Pig starts with puh… P! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'abf92ea7-c44f-5377-a8b3-b1b7360bae6f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a5771caf-d46b-5134-b400-600753b75421', 'abf92ea7-c44f-5377-a8b3-b1b7360bae6f', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'a5771caf-d46b-5134-b400-600753b75421')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'fbfcc375-d084-542c-bb02-a644bd3246c4', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: cap. Which letter does cap start with?$q$, $q$[{"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "C", "tile": {"kind": "letter", "value": "C"}, "is_correct": true}]$q$::jsonb, $q$C$q$, $q$Cap starts with kuh… C! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b160b54b-15e0-5dcb-9338-63b3c5005a1a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'fbfcc375-d084-542c-bb02-a644bd3246c4', 'b160b54b-15e0-5dcb-9338-63b3c5005a1a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'fbfcc375-d084-542c-bb02-a644bd3246c4')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f3d835ee-108e-55c1-b6c6-35565d1d1b7c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: tent. Which letter does tent start with?$q$, $q$[{"text": "B", "tile": {"kind": "letter", "value": "B"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": true}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$T$q$, $q$Tent starts with tuh… T! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b73a5306-fdab-57af-b12a-a4e865b4b83a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f3d835ee-108e-55c1-b6c6-35565d1d1b7c', 'b73a5306-fdab-57af-b12a-a4e865b4b83a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f3d835ee-108e-55c1-b6c6-35565d1d1b7c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '53f8d3ca-8cc6-5674-b8d1-b1fcce72c7e2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: sun. Which letter does sun start with?$q$, $q$[{"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "B", "tile": {"kind": "letter", "value": "B"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": true}]$q$::jsonb, $q$S$q$, $q$Sun starts with sss… S! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b8e7a377-1f26-5a0d-86fc-0ed8b3023d2c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '53f8d3ca-8cc6-5674-b8d1-b1fcce72c7e2', 'b8e7a377-1f26-5a0d-86fc-0ed8b3023d2c', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '53f8d3ca-8cc6-5674-b8d1-b1fcce72c7e2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '231f71e2-7e61-5aec-8ee4-916827cf3fcc', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: pot. Which letter does pot start with?$q$, $q$[{"text": "P", "tile": {"kind": "letter", "value": "P"}, "is_correct": true}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "picked-sound-later-in-word"}]$q$::jsonb, $q$P$q$, $q$Pot starts with puh… P! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'bd17905c-1e0b-5935-a5e6-cdfa21665bb9' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '231f71e2-7e61-5aec-8ee4-916827cf3fcc', 'bd17905c-1e0b-5935-a5e6-cdfa21665bb9', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '231f71e2-7e61-5aec-8ee4-916827cf3fcc')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5e191e68-b15f-532b-a22d-88847e1c6919', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: house. Which letter does house start with?$q$, $q$[{"text": "H", "tile": {"kind": "letter", "value": "H"}, "is_correct": true}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "picked-sound-later-in-word"}]$q$::jsonb, $q$H$q$, $q$House starts with hhh… H! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c0f4cdbc-c341-52c5-bcce-22f53b1b3d19' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5e191e68-b15f-532b-a22d-88847e1c6919', 'c0f4cdbc-c341-52c5-bcce-22f53b1b3d19', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '5e191e68-b15f-532b-a22d-88847e1c6919')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '52445fa8-ca60-5310-b75b-8cec847e3228', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: apple. Which letter does apple start with?$q$, $q$[{"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "E", "tile": {"kind": "letter", "value": "E"}, "is_correct": false, "misconception_token": "confused-vowel-sounds"}, {"text": "O", "tile": {"kind": "letter", "value": "O"}, "is_correct": false, "misconception_token": "confused-vowel-sounds"}, {"text": "A", "tile": {"kind": "letter", "value": "A"}, "is_correct": true}]$q$::jsonb, $q$A$q$, $q$Apple starts with A… aaa, apple! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c2e8b678-2aee-5f5f-b6b0-92e6e1558551' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '52445fa8-ca60-5310-b75b-8cec847e3228', 'c2e8b678-2aee-5f5f-b6b0-92e6e1558551', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '52445fa8-ca60-5310-b75b-8cec847e3228')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '234af449-c3ce-56ae-98f4-e62145303fdb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: ring. Which letter does ring start with?$q$, $q$[{"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "R", "tile": {"kind": "letter", "value": "R"}, "is_correct": true}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}]$q$::jsonb, $q$R$q$, $q$Ring starts with rrr… R! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c6bda05f-ed22-57c2-9056-95b4666e9de1' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '234af449-c3ce-56ae-98f4-e62145303fdb', 'c6bda05f-ed22-57c2-9056-95b4666e9de1', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '234af449-c3ce-56ae-98f4-e62145303fdb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '32df783d-ab2b-5376-b956-e18bba6e6559', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen: gift. Which letter does gift start with?$q$, $q$[{"text": "S", "tile": {"kind": "letter", "value": "S"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "G", "tile": {"kind": "letter", "value": "G"}, "is_correct": true}, {"text": "M", "tile": {"kind": "letter", "value": "M"}, "is_correct": false, "misconception_token": "matched-wrong-first-sound"}, {"text": "T", "tile": {"kind": "letter", "value": "T"}, "is_correct": false, "misconception_token": "picked-sound-later-in-word"}]$q$::jsonb, $q$G$q$, $q$Gift starts with guh… G! Nice listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e8dfa0e0-4dd7-5ac6-bdf0-ee252eaaced2' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '32df783d-ab2b-5376-b956-e18bba6e6559', 'e8dfa0e0-4dd7-5ac6-bdf0-ee252eaaced2', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '32df783d-ab2b-5376-b956-e18bba6e6559')
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
select 'ba174905-90dd-5018-940d-adc5b1026222', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A ring sparkles on Mom’s hand. It is shiny and gold. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "ring", "tile": {"kind": "object_group", "count": 1, "image": "ring"}, "is_correct": true}, {"text": "bus", "tile": {"kind": "object_group", "count": 1, "image": "bus"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "apple", "tile": {"kind": "object_group", "count": 1, "image": "apple"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$ring$q$, $q$The story is all about the ring! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0655551b-038b-5d64-9bdc-fdd1221bff64' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ba174905-90dd-5018-940d-adc5b1026222', '0655551b-038b-5d64-9bdc-fdd1221bff64', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ba174905-90dd-5018-940d-adc5b1026222')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '2a7dc425-8c93-5a8f-8d3f-2ed295dbd4ab', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A pot of soup cooks on the stove. It smells so good. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "duck", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "pot", "tile": {"kind": "object_group", "count": 1, "image": "pot"}, "is_correct": true}]$q$::jsonb, $q$pot$q$, $q$The story is all about the pot! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0c56d008-c34c-5b31-bd64-39e9e75aefdb' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '2a7dc425-8c93-5a8f-8d3f-2ed295dbd4ab', '0c56d008-c34c-5b31-bd64-39e9e75aefdb', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '2a7dc425-8c93-5a8f-8d3f-2ed295dbd4ab')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '34cbbe26-26bc-520f-bee7-b6fcefda00e5', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The key opens the little box. Inside is a surprise! What is the story mostly about? Tap the picture.$q$, $q$[{"text": "key", "tile": {"kind": "object_group", "count": 1, "image": "key"}, "is_correct": true}, {"text": "sun", "tile": {"kind": "object_group", "count": 1, "image": "sun"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "pig", "tile": {"kind": "object_group", "count": 1, "image": "pig"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$key$q$, $q$The story is all about the key! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0e04cb74-c8a0-54e8-b7f0-4bafa43738eb' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '34cbbe26-26bc-520f-bee7-b6fcefda00e5', '0e04cb74-c8a0-54e8-b7f0-4bafa43738eb', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '34cbbe26-26bc-520f-bee7-b6fcefda00e5')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '34aa8797-16a2-5d3e-b723-76105f28ae48', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The sun is bright today. It makes the sky warm and yellow. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "fish", "tile": {"kind": "object_group", "count": 1, "image": "fish"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "hat", "tile": {"kind": "object_group", "count": 1, "image": "hat"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "sun", "tile": {"kind": "object_group", "count": 1, "image": "sun"}, "is_correct": true}]$q$::jsonb, $q$sun$q$, $q$The story is all about the sun! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0e89a81b-8dfc-5c69-ad57-08575da5d237' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '34aa8797-16a2-5d3e-b723-76105f28ae48', '0e89a81b-8dfc-5c69-ad57-08575da5d237', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '34aa8797-16a2-5d3e-b723-76105f28ae48')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '588601d6-d53d-5f18-8fff-97c3736408f1', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A van drives down the road. It carries lots of boxes. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "sun", "tile": {"kind": "object_group", "count": 1, "image": "sun"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "fish", "tile": {"kind": "object_group", "count": 1, "image": "fish"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "van", "tile": {"kind": "object_group", "count": 1, "image": "van"}, "is_correct": true}]$q$::jsonb, $q$van$q$, $q$The story is all about the van! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '15320d94-abf3-53a6-9bbe-d152b861dcf8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '588601d6-d53d-5f18-8fff-97c3736408f1', '15320d94-abf3-53a6-9bbe-d152b861dcf8', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '588601d6-d53d-5f18-8fff-97c3736408f1')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '20c6d734-8dc8-54fe-b5d4-293b5207331c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A jet flies across the sky. It leaves a long white trail. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "jet", "tile": {"kind": "object_group", "count": 1, "image": "jet"}, "is_correct": true}, {"text": "cat", "tile": {"kind": "object_group", "count": 1, "image": "cat"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$jet$q$, $q$The story is all about the jet! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '20938188-19ff-5e09-b6f9-273393933a72' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '20c6d734-8dc8-54fe-b5d4-293b5207331c', '20938188-19ff-5e09-b6f9-273393933a72', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '20c6d734-8dc8-54fe-b5d4-293b5207331c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7e1deea2-3d55-5cec-9ede-460277064830', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The bus takes the kids to school. It is big and yellow. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "pig", "tile": {"kind": "object_group", "count": 1, "image": "pig"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "bus", "tile": {"kind": "object_group", "count": 1, "image": "bus"}, "is_correct": true}, {"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$bus$q$, $q$The story is all about the bus! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '30229263-6d53-541c-8fc8-3ea5a1b1714e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7e1deea2-3d55-5cec-9ede-460277064830', '30229263-6d53-541c-8fc8-3ea5a1b1714e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7e1deea2-3d55-5cec-9ede-460277064830')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a16237ef-7e0c-5d57-9a2a-62b947453a39', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A little duck swims in the pond. It says quack, quack. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "duck", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": true}, {"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "sun", "tile": {"kind": "object_group", "count": 1, "image": "sun"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$duck$q$, $q$The story is all about the duck! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '346161e7-8122-52ca-aa06-7079bea27986' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a16237ef-7e0c-5d57-9a2a-62b947453a39', '346161e7-8122-52ca-aa06-7079bea27986', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'a16237ef-7e0c-5d57-9a2a-62b947453a39')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd2746449-9fb7-5645-9bdb-d66ca1969d91', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Lily builds a house with blocks. It has a door and a roof. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "fish", "tile": {"kind": "object_group", "count": 1, "image": "fish"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "house", "tile": {"kind": "object_group", "count": 1, "image": "house"}, "is_correct": true}]$q$::jsonb, $q$house$q$, $q$The story is all about the house! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '355f7cd5-02ef-5e1b-902f-479cd14c7698' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd2746449-9fb7-5645-9bdb-d66ca1969d91', '355f7cd5-02ef-5e1b-902f-479cd14c7698', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'd2746449-9fb7-5645-9bdb-d66ca1969d91')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '596e63e8-0974-50ef-a45c-ea7bd974e33e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A flower opens in the garden. Bees come to say hello. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "sock", "tile": {"kind": "object_group", "count": 1, "image": "sock"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "moon", "tile": {"kind": "object_group", "count": 1, "image": "moon"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "flower", "tile": {"kind": "object_group", "count": 1, "image": "flower"}, "is_correct": true}]$q$::jsonb, $q$flower$q$, $q$The story is all about the flower! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '4ab4f346-a803-5bbf-b165-50ee2bd521ec' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '596e63e8-0974-50ef-a45c-ea7bd974e33e', '4ab4f346-a803-5bbf-b165-50ee2bd521ec', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '596e63e8-0974-50ef-a45c-ea7bd974e33e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '924d7e83-dd44-532a-9994-ce8e00e31596', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Tim wears his hat. It keeps the sun off his head. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "duck", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "hat", "tile": {"kind": "object_group", "count": 1, "image": "hat"}, "is_correct": true}, {"text": "tree", "tile": {"kind": "object_group", "count": 1, "image": "tree"}, "is_correct": false, "misconception_token": "linked-shade-to-tree-not-topic"}]$q$::jsonb, $q$hat$q$, $q$The story is all about the hat! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '4b5b801e-222e-522c-a8a0-5874b1041d70' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '924d7e83-dd44-532a-9994-ce8e00e31596', '4b5b801e-222e-522c-a8a0-5874b1041d70', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '924d7e83-dd44-532a-9994-ce8e00e31596')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '424d051b-9049-5f89-bfe9-f00515d1ce6f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The fish swims in the tank. It blows tiny bubbles. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "tree", "tile": {"kind": "object_group", "count": 1, "image": "tree"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "fish", "tile": {"kind": "object_group", "count": 1, "image": "fish"}, "is_correct": true}, {"text": "van", "tile": {"kind": "object_group", "count": 1, "image": "van"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$fish$q$, $q$The story is all about the fish! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '5ed42aff-9a8b-5cab-98b8-e58c263c13c3' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '424d051b-9049-5f89-bfe9-f00515d1ce6f', '5ed42aff-9a8b-5cab-98b8-e58c263c13c3', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '424d051b-9049-5f89-bfe9-f00515d1ce6f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '88ada874-623d-517d-aaa6-04bf3c160d85', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The cat naps on the mat. It is soft and warm. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "bus", "tile": {"kind": "object_group", "count": 1, "image": "bus"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "cat", "tile": {"kind": "object_group", "count": 1, "image": "cat"}, "is_correct": true}]$q$::jsonb, $q$cat$q$, $q$The story is all about the cat! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '628a0071-fa7f-53d7-ba97-268c5c30c92e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '88ada874-623d-517d-aaa6-04bf3c160d85', '628a0071-fa7f-53d7-ba97-268c5c30c92e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '88ada874-623d-517d-aaa6-04bf3c160d85')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '8c6ef3d1-2fec-555f-897c-1d7880d14a07', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Ana flies a kite. It goes high up in the wind. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "apple", "tile": {"kind": "object_group", "count": 1, "image": "apple"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "kite", "tile": {"kind": "object_group", "count": 1, "image": "kite"}, "is_correct": true}, {"text": "fish", "tile": {"kind": "object_group", "count": 1, "image": "fish"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$kite$q$, $q$The story is all about the kite! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '6c8eb26e-af51-5bbf-aae0-3ad25c02601e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '8c6ef3d1-2fec-555f-897c-1d7880d14a07', '6c8eb26e-af51-5bbf-aae0-3ad25c02601e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '8c6ef3d1-2fec-555f-897c-1d7880d14a07')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a5ee2c66-6f76-597c-916d-f22cfa8bc3e4', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A pig rolls in the mud. It is happy and messy. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "kite", "tile": {"kind": "object_group", "count": 1, "image": "kite"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "moon", "tile": {"kind": "object_group", "count": 1, "image": "moon"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "pig", "tile": {"kind": "object_group", "count": 1, "image": "pig"}, "is_correct": true}]$q$::jsonb, $q$pig$q$, $q$The story is all about the pig! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '710118fe-cf52-5924-a76a-37c12774bcd6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a5ee2c66-6f76-597c-916d-f22cfa8bc3e4', '710118fe-cf52-5924-a76a-37c12774bcd6', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'a5ee2c66-6f76-597c-916d-f22cfa8bc3e4')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ce136224-d091-5977-aeac-8e95111b0a74', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A tent stands in the yard. The kids camp inside it. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "tent", "tile": {"kind": "object_group", "count": 1, "image": "tent"}, "is_correct": true}, {"text": "duck", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "apple", "tile": {"kind": "object_group", "count": 1, "image": "apple"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$tent$q$, $q$The story is all about the tent! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '833db85d-d6ea-5876-935c-34cf707395ad' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ce136224-d091-5977-aeac-8e95111b0a74', '833db85d-d6ea-5876-935c-34cf707395ad', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ce136224-d091-5977-aeac-8e95111b0a74')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '8d0999fc-d310-53a9-80ec-d3a3e5c20b52', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A leaf falls from the tree. It floats down to the ground. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "leaf", "tile": {"kind": "object_group", "count": 1, "image": "leaf"}, "is_correct": true}, {"text": "duck", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$leaf$q$, $q$The story is all about the leaf! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8973d4b9-fa48-5692-851c-b3e3e0dbd7f7' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '8d0999fc-d310-53a9-80ec-d3a3e5c20b52', '8973d4b9-fa48-5692-851c-b3e3e0dbd7f7', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '8d0999fc-d310-53a9-80ec-d3a3e5c20b52')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5886b496-e150-5e88-a285-5e263e1ba736', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The yo-yo goes down and up on its string. Round and round! What is the story mostly about? Tap the picture.$q$, $q$[{"text": "fish", "tile": {"kind": "object_group", "count": 1, "image": "fish"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "yoyo", "tile": {"kind": "object_group", "count": 1, "image": "yoyo"}, "is_correct": true}, {"text": "tree", "tile": {"kind": "object_group", "count": 1, "image": "tree"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$yoyo$q$, $q$The story is all about the yo-yo! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '935dcade-20ea-57e5-8322-907078078610' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5886b496-e150-5e88-a285-5e263e1ba736', '935dcade-20ea-57e5-8322-907078078610', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '5886b496-e150-5e88-a285-5e263e1ba736')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ff3a8a18-3820-5a18-9448-4f06c6741526', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The mug is full of warm milk. It keeps Nia cozy. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "tree", "tile": {"kind": "object_group", "count": 1, "image": "tree"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "mug", "tile": {"kind": "object_group", "count": 1, "image": "mug"}, "is_correct": true}]$q$::jsonb, $q$mug$q$, $q$The story is all about the mug! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '9e04491f-fba2-5be8-a483-f553edfa54c4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ff3a8a18-3820-5a18-9448-4f06c6741526', '9e04491f-fba2-5be8-a483-f553edfa54c4', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ff3a8a18-3820-5a18-9448-4f06c6741526')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '16378a8a-69b0-5c5e-a13c-07f40b3720b2', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. An apple grows on the tree. It turns red and sweet. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "apple", "tile": {"kind": "object_group", "count": 1, "image": "apple"}, "is_correct": true}, {"text": "cat", "tile": {"kind": "object_group", "count": 1, "image": "cat"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$apple$q$, $q$The story is all about the apple! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ac29c6bf-da11-50e8-af3e-6a9dfc297799' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '16378a8a-69b0-5c5e-a13c-07f40b3720b2', 'ac29c6bf-da11-50e8-af3e-6a9dfc297799', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '16378a8a-69b0-5c5e-a13c-07f40b3720b2')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'aef7757d-8d56-5501-ba1e-5314b7df7cb5', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Ben gets a gift. He opens the box and smiles big. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "gift", "tile": {"kind": "object_group", "count": 1, "image": "gift"}, "is_correct": true}, {"text": "sun", "tile": {"kind": "object_group", "count": 1, "image": "sun"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "duck", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$gift$q$, $q$The story is all about the gift! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c9a434d4-5475-53d1-a5be-7b67c89b36e4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'aef7757d-8d56-5501-ba1e-5314b7df7cb5', 'c9a434d4-5475-53d1-a5be-7b67c89b36e4', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'aef7757d-8d56-5501-ba1e-5314b7df7cb5')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0d3f5806-471a-53fa-8cd9-ff87b2d903f7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A sock is missing! Ravi looks under the bed for it. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "sun", "tile": {"kind": "object_group", "count": 1, "image": "sun"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "fish", "tile": {"kind": "object_group", "count": 1, "image": "fish"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "sock", "tile": {"kind": "object_group", "count": 1, "image": "sock"}, "is_correct": true}]$q$::jsonb, $q$sock$q$, $q$The story is all about the sock! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'cfed7006-6a4b-5712-98a9-b373c185dfdd' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0d3f5806-471a-53fa-8cd9-ff87b2d903f7', 'cfed7006-6a4b-5712-98a9-b373c185dfdd', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '0d3f5806-471a-53fa-8cd9-ff87b2d903f7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd4a04896-9bd5-559d-adb9-5d586566807b', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The moon shines at night. It is round and white. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "moon", "tile": {"kind": "object_group", "count": 1, "image": "moon"}, "is_correct": true}, {"text": "cat", "tile": {"kind": "object_group", "count": 1, "image": "cat"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "matched-round-shape-not-topic"}]$q$::jsonb, $q$moon$q$, $q$The story is all about the moon! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e24aa5a3-22f6-52a9-99b0-63c2e708e0b8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd4a04896-9bd5-559d-adb9-5d586566807b', 'e24aa5a3-22f6-52a9-99b0-63c2e708e0b8', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'd4a04896-9bd5-559d-adb9-5d586566807b')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5489fe74-14d3-57d2-9ab0-861a122c8bb0', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Sam plants a tree. He gives it water so it can grow tall. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "tree", "tile": {"kind": "object_group", "count": 1, "image": "tree"}, "is_correct": true}, {"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "duck", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$tree$q$, $q$The story is all about the tree! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'f1848308-6aae-5d64-87c0-41b29cdef47a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5489fe74-14d3-57d2-9ab0-861a122c8bb0', 'f1848308-6aae-5d64-87c0-41b29cdef47a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '5489fe74-14d3-57d2-9ab0-861a122c8bb0')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '83e5e2bb-af12-5814-997c-2ca7f1cdd615', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The star twinkles in the dark sky. It is far, far away. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": true}, {"text": "kite", "tile": {"kind": "object_group", "count": 1, "image": "kite"}, "is_correct": false, "misconception_token": "linked-sky-to-kite-not-topic"}, {"text": "pig", "tile": {"kind": "object_group", "count": 1, "image": "pig"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$star$q$, $q$The story is all about the star! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'fec469f3-1489-5cbc-8058-78ef6cd054b2' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '83e5e2bb-af12-5814-997c-2ca7f1cdd615', 'fec469f3-1489-5cbc-8058-78ef6cd054b2', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '83e5e2bb-af12-5814-997c-2ca7f1cdd615')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '37874c7b-df86-53fa-917d-0475b17cef36', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen to the story. Meg has a red ball. She bounces it up and down all day. What is the story mostly about? Tap the picture.$q$, $q$[{"text": "tree", "tile": {"kind": "object_group", "count": 1, "image": "tree"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": true}, {"text": "cat", "tile": {"kind": "object_group", "count": 1, "image": "cat"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$ball$q$, $q$This story is all about the ball! Great listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ff4954b2-4475-5217-9be8-581dd26fef04' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '37874c7b-df86-53fa-917d-0475b17cef36', 'ff4954b2-4475-5217-9be8-581dd26fef04', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '37874c7b-df86-53fa-917d-0475b17cef36')
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
select '313424bc-afd0-51b5-9b51-8087d420a649', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Mom drove the van to the store. She bought a big pot for soup. At home she made dinner. What did Mom buy? Tap the picture.$q$, $q$[{"text": "pot", "tile": {"kind": "object_group", "count": 1, "image": "pot"}, "is_correct": true}, {"text": "van", "tile": {"kind": "object_group", "count": 1, "image": "van"}, "is_correct": false, "misconception_token": "picked-vehicle-mom-drove"}, {"text": "hat", "tile": {"kind": "object_group", "count": 1, "image": "hat"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$pot$q$, $q$Mom bought a pot! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0172bf36-c01f-5192-94ef-1d8486ee5686' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '313424bc-afd0-51b5-9b51-8087d420a649', '0172bf36-c01f-5192-94ef-1d8486ee5686', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '313424bc-afd0-51b5-9b51-8087d420a649')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '2b752a16-9c19-57bd-be29-e0cdb58c756f', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A cat and a duck went to the pond. The duck jumped in and swam. The cat sat by the water and watched. Who swam in the pond? Tap the picture.$q$, $q$[{"text": "pig", "tile": {"kind": "object_group", "count": 1, "image": "pig"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "duck", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": true}, {"text": "cat", "tile": {"kind": "object_group", "count": 1, "image": "cat"}, "is_correct": false, "misconception_token": "mixed-up-cat-and-duck"}]$q$::jsonb, $q$duck$q$, $q$The duck swam in the pond! Great listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '0676cda2-3655-5cb5-bfef-89863b1b6bb9' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '2b752a16-9c19-57bd-be29-e0cdb58c756f', '0676cda2-3655-5cb5-bfef-89863b1b6bb9', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '2b752a16-9c19-57bd-be29-e0cdb58c756f')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'c476c1f7-97a1-5225-94ac-d11f12aa4c57', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Ben had an apple and a ball. He ate the apple for a snack. Then he played with the ball. What did Ben eat? Tap the picture.$q$, $q$[{"text": "apple", "tile": {"kind": "object_group", "count": 1, "image": "apple"}, "is_correct": true}, {"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "picked-other-object-in-story"}, {"text": "fish", "tile": {"kind": "object_group", "count": 1, "image": "fish"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$apple$q$, $q$Ben ate the apple! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '1e05d21e-da22-5d77-83d5-196e8287d893' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'c476c1f7-97a1-5225-94ac-d11f12aa4c57', '1e05d21e-da22-5d77-83d5-196e8287d893', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'c476c1f7-97a1-5225-94ac-d11f12aa4c57')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '5648815b-a174-5d54-830c-3982f07199eb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A pig and a duck are friends. The pig likes the mud. The duck likes the water. Who likes the mud? Tap the picture.$q$, $q$[{"text": "cat", "tile": {"kind": "object_group", "count": 1, "image": "cat"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "duck", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": false, "misconception_token": "mixed-up-pig-and-duck"}, {"text": "pig", "tile": {"kind": "object_group", "count": 1, "image": "pig"}, "is_correct": true}]$q$::jsonb, $q$pig$q$, $q$The pig likes the mud! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '27700151-0317-587e-88b7-965388c9b32f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '5648815b-a174-5d54-830c-3982f07199eb', '27700151-0317-587e-88b7-965388c9b32f', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '5648815b-a174-5d54-830c-3982f07199eb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '852cf771-8df1-5b4a-8399-8043a220c843', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The kids went to the park. They flew a kite up high. Then it rained, so they ran home. What did the kids fly? Tap the picture.$q$, $q$[{"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "picked-other-toy"}, {"text": "duck", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "kite", "tile": {"kind": "object_group", "count": 1, "image": "kite"}, "is_correct": true}]$q$::jsonb, $q$kite$q$, $q$The kids flew a kite! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '345e9636-ea04-5404-ab06-5359640a984e' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '852cf771-8df1-5b4a-8399-8043a220c843', '345e9636-ea04-5404-ab06-5359640a984e', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '852cf771-8df1-5b4a-8399-8043a220c843')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '367ec732-eb35-5f17-9c4e-539f7da22900', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Sam has a red ball and a blue kite. On windy days he flies the kite. On sunny days he kicks the ball. What does Sam fly on windy days? Tap the picture.$q$, $q$[{"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "mixed-up-windy-and-sunny-days"}, {"text": "kite", "tile": {"kind": "object_group", "count": 1, "image": "kite"}, "is_correct": true}, {"text": "sun", "tile": {"kind": "object_group", "count": 1, "image": "sun"}, "is_correct": false, "misconception_token": "picked-weather-word"}]$q$::jsonb, $q$kite$q$, $q$Sam flies the kite on windy days! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '3765518b-45bc-5228-bd06-21bdd4286236' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '367ec732-eb35-5f17-9c4e-539f7da22900', '3765518b-45bc-5228-bd06-21bdd4286236', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '367ec732-eb35-5f17-9c4e-539f7da22900')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd3d333c6-3d28-564d-97b5-de41f3ca0919', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Ana picked a flower and a leaf in the garden. She gave the flower to her mom. What did Ana give to her mom? Tap the picture.$q$, $q$[{"text": "leaf", "tile": {"kind": "object_group", "count": 1, "image": "leaf"}, "is_correct": false, "misconception_token": "picked-other-thing-ana-picked"}, {"text": "apple", "tile": {"kind": "object_group", "count": 1, "image": "apple"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "flower", "tile": {"kind": "object_group", "count": 1, "image": "flower"}, "is_correct": true}]$q$::jsonb, $q$flower$q$, $q$Ana gave the flower! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '51aaa119-315d-5a0a-bd5d-c37567807088' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd3d333c6-3d28-564d-97b5-de41f3ca0919', '51aaa119-315d-5a0a-bd5d-c37567807088', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'd3d333c6-3d28-564d-97b5-de41f3ca0919')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '86015d96-3309-55e5-9dbf-43511391ffbb', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The sun came up in the morning. It was bright and warm. The flowers opened up. What came up in the morning? Tap the picture.$q$, $q$[{"text": "moon", "tile": {"kind": "object_group", "count": 1, "image": "moon"}, "is_correct": false, "misconception_token": "picked-other-sky-object"}, {"text": "sun", "tile": {"kind": "object_group", "count": 1, "image": "sun"}, "is_correct": true}, {"text": "star", "tile": {"kind": "object_group", "count": 1, "image": "star"}, "is_correct": false, "misconception_token": "picked-other-sky-object"}]$q$::jsonb, $q$sun$q$, $q$The sun came up! Great listening!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '526a39ab-a7fa-5a7e-a348-c0ed763ae316' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '86015d96-3309-55e5-9dbf-43511391ffbb', '526a39ab-a7fa-5a7e-a348-c0ed763ae316', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '86015d96-3309-55e5-9dbf-43511391ffbb')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4b0eb0c0-6def-5cc3-aa7e-928e75de15f7', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The cat was cold. It found a warm house and went inside. It slept by the door. Where did the cat go? Tap the picture.$q$, $q$[{"text": "tree", "tile": {"kind": "object_group", "count": 1, "image": "tree"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "house", "tile": {"kind": "object_group", "count": 1, "image": "house"}, "is_correct": true}, {"text": "bus", "tile": {"kind": "object_group", "count": 1, "image": "bus"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$house$q$, $q$The cat went into the house! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '6c6a5919-5c89-5bdd-9018-ef5fc97f31e0' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4b0eb0c0-6def-5cc3-aa7e-928e75de15f7', '6c6a5919-5c89-5bdd-9018-ef5fc97f31e0', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '4b0eb0c0-6def-5cc3-aa7e-928e75de15f7')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '4a24c77e-674a-5eef-9110-04a3f2d80db6', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The tree had red apples. Ben climbed up and picked one. Then he took a big bite. What did Ben pick from the tree? Tap the picture.$q$, $q$[{"text": "apple", "tile": {"kind": "object_group", "count": 1, "image": "apple"}, "is_correct": true}, {"text": "flower", "tile": {"kind": "object_group", "count": 1, "image": "flower"}, "is_correct": false, "misconception_token": "picked-other-garden-thing"}, {"text": "leaf", "tile": {"kind": "object_group", "count": 1, "image": "leaf"}, "is_correct": false, "misconception_token": "picked-other-part-of-tree"}]$q$::jsonb, $q$apple$q$, $q$Ben picked an apple! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7db1bdcc-cf6a-5c17-896a-ab312311b8b8' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4a24c77e-674a-5eef-9110-04a3f2d80db6', '7db1bdcc-cf6a-5c17-896a-ab312311b8b8', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '4a24c77e-674a-5eef-9110-04a3f2d80db6')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '87e576ff-7ba7-5bd7-9d47-e4225883b484', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Meg made soup in a big pot. She added carrots and beans. It smelled great. What did Meg make the soup in? Tap the picture.$q$, $q$[{"text": "mug", "tile": {"kind": "object_group", "count": 1, "image": "mug"}, "is_correct": false, "misconception_token": "picked-other-container"}, {"text": "pot", "tile": {"kind": "object_group", "count": 1, "image": "pot"}, "is_correct": true}, {"text": "hat", "tile": {"kind": "object_group", "count": 1, "image": "hat"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$pot$q$, $q$Meg made soup in the pot! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '7df9c110-1907-5fc4-9638-0309f1207c32' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '87e576ff-7ba7-5bd7-9d47-e4225883b484', '7df9c110-1907-5fc4-9638-0309f1207c32', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '87e576ff-7ba7-5bd7-9d47-e4225883b484')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'd419326f-cc79-549c-b7f2-d7d6fedfeddd', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A ring rolled off the table. It rolled under the door. Dad found it there. What rolled under the door? Tap the picture.$q$, $q$[{"text": "ring", "tile": {"kind": "object_group", "count": 1, "image": "ring"}, "is_correct": true}, {"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "picked-other-thing-that-rolls"}, {"text": "key", "tile": {"kind": "object_group", "count": 1, "image": "key"}, "is_correct": false, "misconception_token": "picked-other-small-object"}]$q$::jsonb, $q$ring$q$, $q$The ring rolled under the door! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '86a61e76-4b76-528a-8462-4c09d0f409dc' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'd419326f-cc79-549c-b7f2-d7d6fedfeddd', '86a61e76-4b76-528a-8462-4c09d0f409dc', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'd419326f-cc79-549c-b7f2-d7d6fedfeddd')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '436169cc-2311-52cc-ba01-1ae6b9b4a113', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. It was dark out. Ravi looked up at the round, white moon in the sky. What did Ravi look at? Tap the picture.$q$, $q$[{"text": "moon", "tile": {"kind": "object_group", "count": 1, "image": "moon"}, "is_correct": true}, {"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "matched-round-shape"}, {"text": "sun", "tile": {"kind": "object_group", "count": 1, "image": "sun"}, "is_correct": false, "misconception_token": "picked-other-sky-object"}]$q$::jsonb, $q$moon$q$, $q$Ravi looked at the moon! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '8ac41bb7-a9e3-5a05-a9bc-a986c3fa7dbb' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '436169cc-2311-52cc-ba01-1ae6b9b4a113', '8ac41bb7-a9e3-5a05-a9bc-a986c3fa7dbb', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '436169cc-2311-52cc-ba01-1ae6b9b4a113')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'daf1dc8d-2a93-50b9-aaa8-05c77fe3859d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A pig sat in the sun. It got too hot, so it went to sit under a tree. Where did the pig go to cool off? Tap the picture.$q$, $q$[{"text": "tent", "tile": {"kind": "object_group", "count": 1, "image": "tent"}, "is_correct": false, "misconception_token": "picked-other-place"}, {"text": "house", "tile": {"kind": "object_group", "count": 1, "image": "house"}, "is_correct": false, "misconception_token": "picked-other-place"}, {"text": "tree", "tile": {"kind": "object_group", "count": 1, "image": "tree"}, "is_correct": true}]$q$::jsonb, $q$tree$q$, $q$The pig went under the tree! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = '93519954-bd6c-55a2-bfb2-26da893fae5f' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'daf1dc8d-2a93-50b9-aaa8-05c77fe3859d', '93519954-bd6c-55a2-bfb2-26da893fae5f', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'daf1dc8d-2a93-50b9-aaa8-05c77fe3859d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a7139918-9d8a-5f8d-96ce-3df7dc89de2e', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The key was tiny and gold. It opened the little door on the toy house. What did the key open? Tap the picture.$q$, $q$[{"text": "gift", "tile": {"kind": "object_group", "count": 1, "image": "gift"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "tent", "tile": {"kind": "object_group", "count": 1, "image": "tent"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "door", "tile": {"kind": "object_group", "count": 1, "image": "door"}, "is_correct": true}]$q$::jsonb, $q$door$q$, $q$The key opened the door! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'ae612a39-54ab-5359-aa1d-a27f5e19b734' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a7139918-9d8a-5f8d-96ce-3df7dc89de2e', 'ae612a39-54ab-5359-aa1d-a27f5e19b734', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'a7139918-9d8a-5f8d-96ce-3df7dc89de2e')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'a31f684f-ede4-59c0-aa8a-4e3ec061340c', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The duck and the fish live in the pond. The duck swims on top. The fish swims down deep. Who swims down deep? Tap the picture.$q$, $q$[{"text": "pig", "tile": {"kind": "object_group", "count": 1, "image": "pig"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "duck", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": false, "misconception_token": "mixed-up-duck-and-fish"}, {"text": "fish", "tile": {"kind": "object_group", "count": 1, "image": "fish"}, "is_correct": true}]$q$::jsonb, $q$fish$q$, $q$The fish swims down deep! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'b6c3960b-c109-553d-a038-9b4c2d7c00b6' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'a31f684f-ede4-59c0-aa8a-4e3ec061340c', 'b6c3960b-c109-553d-a038-9b4c2d7c00b6', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'a31f684f-ede4-59c0-aa8a-4e3ec061340c')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '7858d7d5-6527-5a4b-abc7-91d1f437b42a', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The bus was full of kids. It stopped at the school. The kids got off and went inside. What was full of kids? Tap the picture.$q$, $q$[{"text": "van", "tile": {"kind": "object_group", "count": 1, "image": "van"}, "is_correct": false, "misconception_token": "picked-similar-vehicle"}, {"text": "bus", "tile": {"kind": "object_group", "count": 1, "image": "bus"}, "is_correct": true}, {"text": "house", "tile": {"kind": "object_group", "count": 1, "image": "house"}, "is_correct": false, "misconception_token": "picked-place-not-vehicle"}]$q$::jsonb, $q$bus$q$, $q$The bus was full of kids! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c0c52b39-b5da-5f9f-91a5-a447df2782a0' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '7858d7d5-6527-5a4b-abc7-91d1f437b42a', 'c0c52b39-b5da-5f9f-91a5-a447df2782a0', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '7858d7d5-6527-5a4b-abc7-91d1f437b42a')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'f800a785-09b5-54b5-8e90-c9bee4488121', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A duck made a nest under the tree. It kept its eggs warm there. Where did the duck make its nest? Tap the picture.$q$, $q$[{"text": "house", "tile": {"kind": "object_group", "count": 1, "image": "house"}, "is_correct": false, "misconception_token": "picked-other-place"}, {"text": "tree", "tile": {"kind": "object_group", "count": 1, "image": "tree"}, "is_correct": true}, {"text": "tent", "tile": {"kind": "object_group", "count": 1, "image": "tent"}, "is_correct": false, "misconception_token": "picked-other-shelter"}]$q$::jsonb, $q$tree$q$, $q$Under the tree! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'c1568e2c-d1f0-5653-92b6-37d2847bbc15' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'f800a785-09b5-54b5-8e90-c9bee4488121', 'c1568e2c-d1f0-5653-92b6-37d2847bbc15', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'f800a785-09b5-54b5-8e90-c9bee4488121')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

commit;
