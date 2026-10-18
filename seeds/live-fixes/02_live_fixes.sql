-- ===========================================================================
-- seeds/live-fixes/02_live_fixes.sql  (part 2 of 2; generated, do not edit)
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
select '4bcdebb8-99ea-5028-ba5f-67cbf1b65394', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The family went camping. They set up a tent in the woods. They slept inside it. Where did the family sleep? Tap the picture.$q$, $q$[{"text": "tent", "tile": {"kind": "object_group", "count": 1, "image": "tent"}, "is_correct": true}, {"text": "house", "tile": {"kind": "object_group", "count": 1, "image": "house"}, "is_correct": false, "misconception_token": "picked-usual-sleeping-place"}, {"text": "van", "tile": {"kind": "object_group", "count": 1, "image": "van"}, "is_correct": false, "misconception_token": "picked-vehicle-not-in-story"}]$q$::jsonb, $q$tent$q$, $q$They slept in the tent! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'cc1de10d-13c1-5ce1-a44a-c6cac153acb3' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '4bcdebb8-99ea-5028-ba5f-67cbf1b65394', 'cc1de10d-13c1-5ce1-a44a-c6cac153acb3', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '4bcdebb8-99ea-5028-ba5f-67cbf1b65394')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '0d03e5c9-2364-5186-bea6-07164675e5ec', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A cat chased a ball across the room. The ball rolled under the bed. What did the cat chase? Tap the picture.$q$, $q$[{"text": "fish", "tile": {"kind": "object_group", "count": 1, "image": "fish"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": true}, {"text": "duck", "tile": {"kind": "object_group", "count": 1, "image": "duck"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}]$q$::jsonb, $q$ball$q$, $q$The cat chased the ball! Great!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'cd5b2e28-eba6-5d1f-8aa8-5b9b30db0ba1' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '0d03e5c9-2364-5186-bea6-07164675e5ec', 'cd5b2e28-eba6-5d1f-8aa8-5b9b30db0ba1', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '0d03e5c9-2364-5186-bea6-07164675e5ec')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '9fcc29da-78a8-58fa-9b6d-7946561149f0', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A yo-yo spun down the string and back up again. The kids clapped. What spun down the string? Tap the picture.$q$, $q$[{"text": "yoyo", "tile": {"kind": "object_group", "count": 1, "image": "yoyo"}, "is_correct": true}, {"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "picked-other-round-toy"}, {"text": "ring", "tile": {"kind": "object_group", "count": 1, "image": "ring"}, "is_correct": false, "misconception_token": "matched-round-shape"}]$q$::jsonb, $q$yoyo$q$, $q$The yo-yo spun down the string! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd0ec12c8-6baf-5043-a5ea-3ba359a51c0c' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '9fcc29da-78a8-58fa-9b6d-7946561149f0', 'd0ec12c8-6baf-5043-a5ea-3ba359a51c0c', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '9fcc29da-78a8-58fa-9b6d-7946561149f0')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ec16c588-e027-5ab6-8fac-14b13caebc6d', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Nia lost her sock. She looked in the box and under the mug. She found it in her shoe. What did Nia lose? Tap the picture.$q$, $q$[{"text": "sock", "tile": {"kind": "object_group", "count": 1, "image": "sock"}, "is_correct": true}, {"text": "hat", "tile": {"kind": "object_group", "count": 1, "image": "hat"}, "is_correct": false, "misconception_token": "picked-other-clothing"}, {"text": "mug", "tile": {"kind": "object_group", "count": 1, "image": "mug"}, "is_correct": false, "misconception_token": "picked-place-she-looked"}]$q$::jsonb, $q$sock$q$, $q$Nia lost her sock! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'd92c97f4-a310-5d65-87c3-1e24bfcadec4' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ec16c588-e027-5ab6-8fac-14b13caebc6d', 'd92c97f4-a310-5d65-87c3-1e24bfcadec4', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ec16c588-e027-5ab6-8fac-14b13caebc6d')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'dd4fad3a-a3b9-5546-aac4-5f1a26e55f92', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Tom wore a warm cap and a scarf. The cap kept his ears warm. What kept Tom’s ears warm? Tap the picture.$q$, $q$[{"text": "sock", "tile": {"kind": "object_group", "count": 1, "image": "sock"}, "is_correct": false, "misconception_token": "picked-other-clothing"}, {"text": "mug", "tile": {"kind": "object_group", "count": 1, "image": "mug"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "cap", "tile": {"kind": "object_group", "count": 1, "image": "cap"}, "is_correct": true}]$q$::jsonb, $q$cap$q$, $q$The cap kept his ears warm! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'e82270af-a016-5b6a-ad44-af21c675e13a' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'dd4fad3a-a3b9-5546-aac4-5f1a26e55f92', 'e82270af-a016-5b6a-ad44-af21c675e13a', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'dd4fad3a-a3b9-5546-aac4-5f1a26e55f92')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '34dc25be-30a5-53d5-aefd-3d768d358741', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. The kite got stuck in the tall tree. Dad reached up and got it down. Where did the kite get stuck? Tap the picture.$q$, $q$[{"text": "tent", "tile": {"kind": "object_group", "count": 1, "image": "tent"}, "is_correct": false, "misconception_token": "picked-other-place"}, {"text": "house", "tile": {"kind": "object_group", "count": 1, "image": "house"}, "is_correct": false, "misconception_token": "picked-other-place"}, {"text": "tree", "tile": {"kind": "object_group", "count": 1, "image": "tree"}, "is_correct": true}]$q$::jsonb, $q$tree$q$, $q$The kite got stuck in the tree! Nice!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'eb677fef-8a97-5a6f-98dc-01ee9f599efa' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '34dc25be-30a5-53d5-aefd-3d768d358741', 'eb677fef-8a97-5a6f-98dc-01ee9f599efa', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '34dc25be-30a5-53d5-aefd-3d768d358741')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select '205db05c-36b9-529f-94ab-1d8dbb4cc970', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. A jet flew over the house. It was loud and fast. The cat hid under the bed. What flew over the house? Tap the picture.$q$, $q$[{"text": "jet", "tile": {"kind": "object_group", "count": 1, "image": "jet"}, "is_correct": true}, {"text": "bus", "tile": {"kind": "object_group", "count": 1, "image": "bus"}, "is_correct": false, "misconception_token": "picked-other-vehicle"}, {"text": "kite", "tile": {"kind": "object_group", "count": 1, "image": "kite"}, "is_correct": false, "misconception_token": "picked-other-thing-that-flies"}]$q$::jsonb, $q$jet$q$, $q$A jet flew over! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'fb504df0-0e4e-5078-a65c-903e82df67c0' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select '205db05c-36b9-529f-94ab-1d8dbb4cc970', 'fb504df0-0e4e-5078-a65c-903e82df67c0', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = '205db05c-36b9-529f-94ab-1d8dbb4cc970')
on conflict (draft_id) do update set reasons = excluded.reasons, changes = excluded.changes;

insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
select 'ce60320f-e14a-55ab-8e02-d743b0dda9da', o.template_id, o.skill_id, o.sat_alignment, o.difficulty,
       $q$Listen. Lin got a gift in a box. Inside was a soft hat. She put it on her head. What was inside the gift box? Tap the picture.$q$, $q$[{"text": "gift", "tile": {"kind": "object_group", "count": 1, "image": "gift"}, "is_correct": false, "misconception_token": "picked-the-box-not-what-was-inside"}, {"text": "ball", "tile": {"kind": "object_group", "count": 1, "image": "ball"}, "is_correct": false, "misconception_token": "picked-picture-not-in-story"}, {"text": "hat", "tile": {"kind": "object_group", "count": 1, "image": "hat"}, "is_correct": true}]$q$::jsonb, $q$hat$q$, $q$A hat was inside! Well done!$q$,
       'draft', o.passage_id, o.render_mode, o.prompt
  from public.generated_questions o
 where o.id = 'fccd756b-08f4-5bca-a9b7-e9f1376f02f0' and o.status = 'published'
on conflict (id) do update set
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
select 'ce60320f-e14a-55ab-8e02-d743b0dda9da', 'fccd756b-08f4-5bca-a9b7-e9f1376f02f0', array['distractor_misconceptions']::text[], $q$Named the mistake behind each wrong choice.$q$
 where exists (select 1 from public.generated_questions where id = 'ce60320f-e14a-55ab-8e02-d743b0dda9da')
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
