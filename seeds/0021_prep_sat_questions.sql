-- PathwayEd — Question Engine: PREP SAT reading & writing skills + questions (GENERATED).
--
-- DO NOT EDIT BY HAND — produced by scripts/build-prep-seeds.ts from the curated
-- pools in src/lib/prep/*Templates.ts. HOW TO APPLY (self-contained — creates the
-- isolated prep subject + domain + skills, then the questions):
--   bun run db:seed seeds/0021_prep_sat_questions.sql
-- Idempotent (deterministic ids). Depends on migration 0004 (generated_questions).
-- Prep subjects are isolated from the K-12 tree; the prep engine reaches these by slug.
--
-- 100% ORIGINAL grade 6-8 items. Every item has 4 choices, one correct, and three
-- distractors that are each a specific wrong path (with a mapped misconception).

begin;

insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment, prerequisite_skills)
values (md5('pe-aos:subj-prep-sat-rw')::uuid, 'subject', null, 'prep-sat-rw', 'Test Prep, SAT Reading and Writing', null, null, null, '{}')
on conflict (id) do update set level=excluded.level, parent_id=excluded.parent_id, subject=excluded.subject, name=excluded.name;
insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment, prerequisite_skills)
values (md5('pe-aos:dom-prep-sat-expression-of-ideas')::uuid, 'domain', md5('pe-aos:subj-prep-sat-rw')::uuid, 'prep-sat-rw', 'Expression of Ideas', null, null, null, '{}')
on conflict (id) do update set level=excluded.level, parent_id=excluded.parent_id, subject=excluded.subject, name=excluded.name;
insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment, prerequisite_skills)
values (md5('pe-aos:dom-prep-sat-craft-and-structure')::uuid, 'domain', md5('pe-aos:subj-prep-sat-rw')::uuid, 'prep-sat-rw', 'Craft and Structure', null, null, null, '{}')
on conflict (id) do update set level=excluded.level, parent_id=excluded.parent_id, subject=excluded.subject, name=excluded.name;
insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment, prerequisite_skills)
values (md5('pe-aos:skill-prep-sat-transitions')::uuid, 'skill', md5('pe-aos:dom-prep-sat-expression-of-ideas')::uuid, 'prep-sat-rw', 'SAT Transitions', 'prep-sat-transitions', '9-12', null, '{}')
on conflict (id) do update set level=excluded.level, parent_id=excluded.parent_id, subject=excluded.subject, name=excluded.name, slug=excluded.slug, grade_band=excluded.grade_band;
insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment, prerequisite_skills)
values (md5('pe-aos:skill-prep-sat-words-in-context')::uuid, 'skill', md5('pe-aos:dom-prep-sat-craft-and-structure')::uuid, 'prep-sat-rw', 'SAT Words in Context', 'prep-sat-words-in-context', '9-12', null, '{}')
on conflict (id) do update set level=excluded.level, parent_id=excluded.parent_id, subject=excluded.subject, name=excluded.name, slug=excluded.slug, grade_band=excluded.grade_band;

-- prep-sat-transitions (SAT Transitions) — 48 items
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('9bb547c3-1600-5397-ac44-a77c2a37868c', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$The city promised that the new bridge would ease the morning traffic. ______ commuters found their drive downtown just as slow as before.$q$, $q$[{"text":"Similarly,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"However,","is_correct":true},{"text":"As a result,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For example,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$However,$q$, $q$The second sentence contradicts the promise in the first (traffic did not improve), so the contrast transition "However," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('ddf86b36-45cd-53ce-ade4-051534297ff2', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$A sudden cold snap swept through the orchard overnight. ______ many of the young apple blossoms froze and dropped to the ground.$q$, $q$[{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"As a result,","is_correct":true},{"text":"Meanwhile,","is_correct":false,"misconception_token":"sat-trans-wrong-sequence"}]$q$::jsonb, $q$As a result,$q$, $q$The freeze CAUSED the blossoms to die, so the result transition "As a result," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('7a9aaf87-ed7d-5fde-902d-b3607892a8d5', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$Some animals have surprising ways of staying cool in the heat. ______ elephants flap their huge ears to release extra body warmth.$q$, $q$[{"text":"In contrast,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"In addition,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"For example,","is_correct":true}]$q$::jsonb, $q$For example,$q$, $q$The elephant is a specific example of the surprising cooling methods, so "For example," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('3bead9aa-b8c1-5999-87b1-f303d4213fe8', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$The volunteers spent Saturday morning clearing trash from the riverbank. ______ they planted dozens of young trees along the trail.$q$, $q$[{"text":"In addition,","is_correct":true},{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"}]$q$::jsonb, $q$In addition,$q$, $q$The second sentence adds another thing the volunteers did, so the addition transition "In addition," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('6b2a50b0-e0be-5e5c-ac38-a7aef3d36c69', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$Reading the recipe, Mateo expected the dish to be difficult. ______ it turned out to be one of the easiest meals he had ever made.$q$, $q$[{"text":"Likewise,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"However,","is_correct":true},{"text":"Consequently,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For example,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$However,$q$, $q$What actually happened is the opposite of what Mateo expected, so the contrast transition "However," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('5a1a4538-54cf-5deb-afba-551b658157a5', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$Nadia practiced her free throws every day after school for months. ______ she calmly sank the game-winning shot in the championship.$q$, $q$[{"text":"Nevertheless,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"As a result,","is_correct":true},{"text":"Similarly,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"}]$q$::jsonb, $q$As a result,$q$, $q$Her daily practice CAUSED her success under pressure, so the result transition "As a result," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('5c6493de-afd2-5903-adca-7c018f06a76e', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$The museum displays tools from many ancient trades. ______ visitors can see the heavy hammers and tongs once used by village blacksmiths.$q$, $q$[{"text":"On the other hand,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Moreover,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"For instance,","is_correct":true}]$q$::jsonb, $q$For instance,$q$, $q$The blacksmith tools are a specific example of the ancient trade tools, so "For instance," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('70d0cccf-1507-5cfe-a741-9a0be8addbbb', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$The new library lets residents borrow thousands of e-books for free. ______ it hosts free coding classes for teenagers on weekends.$q$, $q$[{"text":"In addition,","is_correct":true},{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"As a result,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For example,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$In addition,$q$, $q$The coding classes are a second, separate service the library offers, so the addition transition "In addition," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('a31f3e68-0cd7-55e1-a6e9-b829a6939b0c', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$The forecast called for clear skies all weekend long. ______ a heavy thunderstorm rolled in on Saturday afternoon.$q$, $q$[{"text":"Similarly,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"However,","is_correct":true},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Meanwhile,","is_correct":false,"misconception_token":"sat-trans-wrong-sequence"}]$q$::jsonb, $q$However,$q$, $q$The storm is the opposite of the clear skies that were predicted, so the contrast transition "However," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('7508cf42-1015-563b-97d9-d5a10c8029ea', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$The little bakery used only the freshest local ingredients in everything it made. ______ customers lined up around the block every morning.$q$, $q$[{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"As a result,","is_correct":true},{"text":"Likewise,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"}]$q$::jsonb, $q$As a result,$q$, $q$The bakery's quality CAUSED the crowds, so the result transition "As a result," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('0f6d4424-e54e-5c8f-b02b-8267bb9c9cbb', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$Many everyday objects were first invented for space travel. ______ the memory foam in your mattress was designed to cushion astronauts at launch.$q$, $q$[{"text":"In contrast,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Consequently,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Afterward,","is_correct":false,"misconception_token":"sat-trans-wrong-sequence"},{"text":"For example,","is_correct":true}]$q$::jsonb, $q$For example,$q$, $q$Memory foam is a specific example of an everyday object born from space travel, so "For example," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('fca3c08c-92a8-5743-bdec-28e86d4e89cd', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$The coach praised the team for its stubborn, well-organized defense. ______ she pointed out how quickly the players moved the ball upfield.$q$, $q$[{"text":"In addition,","is_correct":true},{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$In addition,$q$, $q$The coach adds a second thing she praised, so the addition transition "In addition," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('0931dc1c-66e2-5a77-ab4b-afce95969094', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$The chef carefully seared the vegetables in a screaming-hot pan. ______ she lowered the heat and let them simmer for a full hour.$q$, $q$[{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Then,","is_correct":true},{"text":"As a result,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For example,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$Then,$q$, $q$The two sentences describe cooking steps done in time order, so the sequence transition "Then," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('293cf2b7-31d1-5ef8-bb9e-66ae4d56ad7a', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$Penguins are birds, so you might expect them to be able to fly. ______ they use their stiff wings as flippers to swim instead.$q$, $q$[{"text":"Similarly,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"However,","is_correct":true},{"text":"For example,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$However,$q$, $q$The second sentence overturns what you would expect of a bird, so the contrast transition "However," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('e04321f3-1f9b-54aa-a2f5-d4a189202351', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$A thick layer of ash from the eruption blanketed the surrounding fields. ______ the farmers could not plant their crops that spring.$q$, $q$[{"text":"Nevertheless,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"In addition,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"As a result,","is_correct":true}]$q$::jsonb, $q$As a result,$q$, $q$The ash CAUSED the planting to fail, so the result transition "As a result," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('397bf77f-36bd-5f2c-8281-df10ff953d7b', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'easy',
   $q$Coral reefs support an astonishing variety of ocean life. ______ a single healthy reef can shelter thousands of different fish species.$q$, $q$[{"text":"For example,","is_correct":true},{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Subsequently,","is_correct":false,"misconception_token":"sat-trans-wrong-sequence"}]$q$::jsonb, $q$For example,$q$, $q$The single reef sheltering thousands of species is a specific example of that variety, so "For example," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('afb0a167-40e1-52c9-a130-3ae7b968825f', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$Solar panels were once so expensive that only wealthy homeowners could afford them. ______ falling manufacturing costs have made them a practical choice for ordinary families.$q$, $q$[{"text":"Moreover,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"However,","is_correct":true},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"Meanwhile,","is_correct":false,"misconception_token":"sat-trans-wrong-sequence"}]$q$::jsonb, $q$However,$q$, $q$The second sentence reverses the first (once out of reach, now affordable), so the contrast transition "However," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('4aa8622f-6896-52e8-b96b-97757843d55f', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$The company shifted its entire staff to permanent remote work. ______ it no longer needed to pay rent on a downtown office.$q$, $q$[{"text":"Nevertheless,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For example,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"Consequently,","is_correct":true},{"text":"Similarly,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"}]$q$::jsonb, $q$Consequently,$q$, $q$Going remote CAUSED the office to become unnecessary, so the result transition "Consequently," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('d91e718b-b4ad-5e38-9402-84f818c44595', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$The documentary reveals how drifting plastic waste harms nesting ocean birds. ______ it shows the damage that same waste inflicts on coral reefs.$q$, $q$[{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"Moreover,","is_correct":true}]$q$::jsonb, $q$Moreover,$q$, $q$The reef damage is a second piece of harm the film documents, so the addition transition "Moreover," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('ae5c47f4-5648-50ef-a12b-37e64f03f3b5', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$Ancient Roman engineers built structures designed to last for many centuries. ______ the Pantheon still stands with the largest unreinforced concrete dome on Earth.$q$, $q$[{"text":"For instance,","is_correct":true},{"text":"On the other hand,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Thus,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Likewise,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"}]$q$::jsonb, $q$For instance,$q$, $q$The Pantheon is a specific example of a long-lasting Roman structure, so "For instance," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('eb1e4468-219f-5d8c-bc90-a502e2ce78ec', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$Critics predicted that the tiny independent film would vanish from theaters within a week. ______ it became the most talked-about movie of the entire year.$q$, $q$[{"text":"In addition,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"However,","is_correct":true},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Afterward,","is_correct":false,"misconception_token":"sat-trans-wrong-sequence"}]$q$::jsonb, $q$However,$q$, $q$The outcome is the opposite of the critics' prediction, so the contrast transition "However," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('3c75815d-3267-57cd-a429-c8b122bf0b56', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$Years of overfishing had emptied the once-teeming bay of nearly every catch. ______ the local fishing families were forced to seek work in other towns.$q$, $q$[{"text":"Even so,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"As a result,","is_correct":true},{"text":"Furthermore,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"}]$q$::jsonb, $q$As a result,$q$, $q$The empty bay CAUSED the families to leave, so the result transition "As a result," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('dd34fe0f-a742-5fb8-873c-b2a97c73ed9e', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$Regular aerobic exercise strengthens the muscles of the heart. ______ it improves the body's ability to deliver oxygen to every tissue.$q$, $q$[{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"As a result,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For example,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"Furthermore,","is_correct":true}]$q$::jsonb, $q$Furthermore,$q$, $q$The second sentence lists another parallel benefit of exercise, so the addition transition "Furthermore," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('b3ebfc3b-b8ab-5223-a9e8-cb8f0fb394f8', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$Some plants have evolved clever tricks to survive the punishing desert. ______ the barrel cactus stores months of water inside its thick, pleated stem.$q$, $q$[{"text":"For example,","is_correct":true},{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Consequently,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Meanwhile,","is_correct":false,"misconception_token":"sat-trans-wrong-sequence"}]$q$::jsonb, $q$For example,$q$, $q$The barrel cactus is a specific example of a desert survival trick, so "For example," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('d65cb624-2960-593d-b3a3-8661103f3d0d', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$The new check-in policy was designed to shorten the wait at the clinic. ______ patients reported waiting even longer than they had before.$q$, $q$[{"text":"Similarly,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"However,","is_correct":true},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$However,$q$, $q$The result clashes with the policy's goal, so the contrast transition "However," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('d59c2094-51d6-5632-91e3-f984ecbf92da', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$The bridge inspectors found dangerous cracks running through the main support beams. ______ the city closed the span to all traffic that same night.$q$, $q$[{"text":"Nevertheless,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For example,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"Therefore,","is_correct":true},{"text":"Moreover,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"}]$q$::jsonb, $q$Therefore,$q$, $q$The dangerous cracks CAUSED the closure, so the result transition "Therefore," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('88a22a52-a194-5e87-90af-9079cde31ba7', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$The archaeologists first mapped the entire site from the air using drones. ______ they began the slow, painstaking work of digging by hand.$q$, $q$[{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"As a result,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"Afterward,","is_correct":true}]$q$::jsonb, $q$Afterward,$q$, $q$The two sentences describe steps of the dig in time order, so the sequence transition "Afterward," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('a0069bab-cb47-5428-9dc6-5ae5f11f1cbc', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$The scholarship covers the full cost of tuition for four years. ______ it provides a yearly stipend for books and living expenses.$q$, $q$[{"text":"In addition,","is_correct":true},{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Thus,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$In addition,$q$, $q$The stipend is a second, added benefit of the scholarship, so the addition transition "In addition," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('11f5aefc-a65a-5c85-9da0-3f20d6a949f5', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$On paper, the two job candidates had nearly identical qualifications. ______ their interviews revealed strikingly different attitudes toward teamwork.$q$, $q$[{"text":"Likewise,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"However,","is_correct":true},{"text":"Consequently,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Subsequently,","is_correct":false,"misconception_token":"sat-trans-wrong-sequence"}]$q$::jsonb, $q$However,$q$, $q$The interviews reveal a difference that contradicts how alike they looked on paper, so "However," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('e778d913-799c-5be3-9e9d-dbb57f3ad4e1', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$The factory switched to machines that run entirely on captured rainwater. ______ its demand for city water dropped by nearly half.$q$, $q$[{"text":"Still,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For example,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"As a result,","is_correct":true},{"text":"Similarly,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"}]$q$::jsonb, $q$As a result,$q$, $q$The new machines CAUSED the drop in water demand, so the result transition "As a result," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('cd330335-16ff-5909-a51d-b8907fc9b260', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$Bird migrations can cover truly astonishing distances across the globe. ______ the Arctic tern flies from the North Pole to the South Pole and back every year.$q$, $q$[{"text":"On the other hand,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Moreover,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"For instance,","is_correct":true}]$q$::jsonb, $q$For instance,$q$, $q$The Arctic tern is a specific example of an astonishing migration, so "For instance," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('5e5ecd59-100b-5fce-9d48-fbc5e2c213fb', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'medium',
   $q$The health app lets users track how much water they drink each day. ______ it reminds them to stand up and stretch after long stretches of sitting.$q$, $q$[{"text":"Moreover,","is_correct":true},{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"As a result,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$Moreover,$q$, $q$The stretch reminders are a second feature the app offers, so the addition transition "Moreover," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('b1806907-a9e8-52d3-bffb-a4e8bd551975', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$The senator's memoir presents her as a tireless champion of the working poor. ______ the voting record from her years in office tells a far more complicated story.$q$, $q$[{"text":"Moreover,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"However,","is_correct":true},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$However,$q$, $q$The voting record complicates and pushes against the memoir's flattering picture, so "However," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('9cb23344-1e69-5c22-88ac-256293717a0f', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$The editor cut nearly a third of the manuscript's tangents and repetitions. ______ the argument that survived was leaner and far more persuasive.$q$, $q$[{"text":"On the other hand,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For example,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"Consequently,","is_correct":true},{"text":"Meanwhile,","is_correct":false,"misconception_token":"sat-trans-wrong-sequence"}]$q$::jsonb, $q$Consequently,$q$, $q$The cutting CAUSED the sharper argument, so the result transition "Consequently," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('5c9bd356-90c0-5d87-a1f3-cda43180f309', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$Rising sea temperatures push many fish species toward the cooler poles. ______ they shrink the range of the warm-water corals those same fish once depended on.$q$, $q$[{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"As a result,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"Furthermore,","is_correct":true}]$q$::jsonb, $q$Furthermore,$q$, $q$The second sentence adds another effect of warming seas alongside the first, so the addition transition "Furthermore," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('b0b22e10-376a-5653-9783-fdbe5c57cad4', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$Great inventions often emerge not from a single flash of genius but from decades of incremental tinkering. ______ the light bulb was the product of countless experiments by many rival inventors.$q$, $q$[{"text":"For instance,","is_correct":true},{"text":"On the other hand,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Likewise,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"}]$q$::jsonb, $q$For instance,$q$, $q$The light bulb is a specific example of invention through slow tinkering, so "For instance," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('3e3f1078-52cd-5b87-ab9a-d27dc8ae0aa2', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$Economists had long assumed that raising the local minimum wage would sharply reduce the number of available jobs. ______ several recent studies have found little to no effect on hiring.$q$, $q$[{"text":"Similarly,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"However,","is_correct":true},{"text":"Consequently,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Afterward,","is_correct":false,"misconception_token":"sat-trans-wrong-sequence"}]$q$::jsonb, $q$However,$q$, $q$The recent findings contradict the long-held assumption, so the contrast transition "However," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('82ffef63-f91c-5940-9f56-a221bccff2cb', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$The vaccine had to be stored at temperatures far colder than any ordinary freezer can reach. ______ distributing it to remote rural clinics posed an enormous logistical challenge.$q$, $q$[{"text":"Even so,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"As a result,","is_correct":true},{"text":"Moreover,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"}]$q$::jsonb, $q$As a result,$q$, $q$The extreme cold requirement CAUSED the distribution problem, so the result transition "As a result," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('b0a646f1-e667-511a-8637-6970184f240e', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$The proposed regulation would force chemical plants to disclose every pollutant they release. ______ it would impose steep fines on any company that falsifies its reports.$q$, $q$[{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Thus,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"Moreover,","is_correct":true}]$q$::jsonb, $q$Moreover,$q$, $q$The fines are a second provision the regulation adds, so the addition transition "Moreover," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('fec1fe73-5658-54eb-85f4-468f177af4be', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$Languages constantly borrow words from one another as cultures meet and mingle. ______ English took "kindergarten" from German and "safari" from Swahili.$q$, $q$[{"text":"For example,","is_correct":true},{"text":"Nevertheless,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Subsequently,","is_correct":false,"misconception_token":"sat-trans-wrong-sequence"}]$q$::jsonb, $q$For example,$q$, $q$The borrowed English words are a specific example of languages borrowing from one another, so "For example," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('66b6f834-cce3-5a3f-b233-b884f267b183', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$The startup's founders were certain that customers wanted still more features packed into the app. ______ user surveys made it plain that people were longing for something simpler.$q$, $q$[{"text":"Likewise,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"However,","is_correct":true},{"text":"As a result,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$However,$q$, $q$What users wanted turned out to be the opposite of what the founders assumed, so "However," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('100539f4-3d4b-5280-9963-4e601ae7db1f', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$The novelist refused every interview and let her books speak entirely for themselves. ______ readers came to imagine her as a figure of deep and deliberate mystery.$q$, $q$[{"text":"On the other hand,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For example,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"Consequently,","is_correct":true},{"text":"Similarly,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"}]$q$::jsonb, $q$Consequently,$q$, $q$Her silence CAUSED the mysterious image readers formed, so the result transition "Consequently," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('926a7a95-fad7-5f70-96d4-a834433199ed', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$The committee spent months gathering testimony from every affected department. ______ it retreated behind closed doors to draft its final recommendations.$q$, $q$[{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"Afterward,","is_correct":true}]$q$::jsonb, $q$Afterward,$q$, $q$The two sentences describe stages of the committee's work in time order, so the sequence transition "Afterward," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('4cb4370e-f8f2-5824-aad4-1e5fe164149c', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$The report documents how the long drought devastated the region's wheat harvest. ______ it details the sharp rise in food prices that swept the country soon after.$q$, $q$[{"text":"In addition,","is_correct":true},{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Thus,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$In addition,$q$, $q$The price data is a second thing the report covers alongside the harvest, so the addition transition "In addition," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('4ac716d2-65f8-54e3-8916-3e446566f816', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$In theory, handing every student a laptop should have widened their access to information. ______ in the poorest districts the missing piece was never the hardware but a reliable internet connection.$q$, $q$[{"text":"Moreover,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"However,","is_correct":true},{"text":"Consequently,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Meanwhile,","is_correct":false,"misconception_token":"sat-trans-wrong-sequence"}]$q$::jsonb, $q$However,$q$, $q$Reality in the poorest districts undercuts the hopeful theory, so the contrast transition "However," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('130d156d-5249-5c54-9b80-98a92a4d8f6f', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$The museum quietly returned the looted artifacts to their country of origin. ______ its reputation among international scholars rose to new heights.$q$, $q$[{"text":"Nevertheless,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"},{"text":"As a result,","is_correct":true},{"text":"Likewise,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"}]$q$::jsonb, $q$As a result,$q$, $q$The return of the artifacts CAUSED the museum's rising reputation, so the result transition "As a result," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('17e5be0e-e3f1-5742-8a8c-c9bbd8dc0b1d', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$Throughout history, ordinary materials have occasionally become more precious than gold. ______ in the 1800s aluminum was so hard to refine that emperors dined from aluminum plates.$q$, $q$[{"text":"On the other hand,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"Therefore,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"Moreover,","is_correct":false,"misconception_token":"sat-trans-wrong-continuation"},{"text":"For instance,","is_correct":true}]$q$::jsonb, $q$For instance,$q$, $q$The story of aluminum is a specific example of an ordinary material once prized above gold, so "For instance," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('7016cd3e-fdc6-5787-8fe0-d10310d8d467', null, (select id from public.skills where slug = 'prep-sat-transitions'), null, 'hard',
   $q$The treaty commits each signing nation to cut its carbon emissions by a third within a decade. ______ it establishes a shared fund to help poorer countries adapt to a warming climate.$q$, $q$[{"text":"Furthermore,","is_correct":true},{"text":"However,","is_correct":false,"misconception_token":"sat-trans-wrong-contrast"},{"text":"As a result,","is_correct":false,"misconception_token":"sat-trans-wrong-cause"},{"text":"For instance,","is_correct":false,"misconception_token":"sat-trans-wrong-example"}]$q$::jsonb, $q$Furthermore,$q$, $q$The shared fund is a second commitment the treaty adds, so the addition transition "Furthermore," fits.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;

-- prep-sat-words-in-context (SAT Words in Context) — 48 items
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('8fd9f98a-9fad-5821-9aee-b5d9095b0f79', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$The museum's newest exhibit was so ______ that visitors lingered for hours, reluctant to leave.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"pleasant","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"captivating","is_correct":true},{"text":"tiresome","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"costly","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$captivating$q$, $q$The clue "lingered for hours, reluctant to leave" signals a strongly engaging exhibit, so "captivating" is precise, not merely "pleasant."$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('b365ac58-2d5c-5aeb-9c73-40d2c9d6391f', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$After days of heavy rain, the hiking trail became so ______ that our boots sank deep into the mud.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"dusty","is_correct":false,"misconception_token":"sat-wic-wrong-sense"},{"text":"rugged","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"soggy","is_correct":true},{"text":"scenic","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$soggy$q$, $q$The example "boots sank deep into the mud" points to waterlogged ground, so "soggy" fits; "dusty" is the wrong (dry) sense.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('4a9daca2-6fc8-5274-aacf-10d758e6b6ef', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$The instructions were so ______ that even a first-time user assembled the shelf without any confusion.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"complicated","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"brief","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"colorful","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"clear","is_correct":true}]$q$::jsonb, $q$clear$q$, $q$Because a first-timer finished "without any confusion," the instructions must be "clear," not complicated or merely brief.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('4642ac94-9f09-5953-ba59-069e01f8ddd4', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$The comedian was famous for his ______ wit, delivering jokes so fast the audience could barely keep up.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"quick","is_correct":true},{"text":"dull","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"clever","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"loud","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$quick$q$, $q$The clue "so fast the audience could barely keep up" is about speed, so "quick" is precise; "clever" is related but not what the clue measures.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('d8ded4ed-9bf5-575a-aff0-8688e4132a23', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$The old floorboards were so ______ that they creaked loudly with every step we took.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"worn","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"loose","is_correct":true},{"text":"sturdy","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"ancient","is_correct":false,"misconception_token":"sat-wic-too-extreme"}]$q$::jsonb, $q$loose$q$, $q$Boards that "creaked loudly with every step" are "loose"; "worn" is related but imprecise and "ancient" overstates their age.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('d5eb2cf3-7268-5403-9d2c-7fe3027ba88a', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$Because she had skipped both breakfast and lunch, Mara felt absolutely ______ by dinnertime.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"full","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"tired","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"starving","is_correct":true},{"text":"cheerful","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"}]$q$::jsonb, $q$starving$q$, $q$Skipping breakfast and lunch makes "starving" the precise fit for how Mara feels; "full" ignores the clue entirely.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('729c58b4-9d80-574b-b160-7abd0e67d5cd', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$The library reading room was completely ______, so I could hear the faint tick of the wall clock.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"crowded","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"noisy","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"empty","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"silent","is_correct":true}]$q$::jsonb, $q$silent$q$, $q$Hearing "the faint tick of the wall clock" shows the room was "silent," not merely empty or (contradicting the clue) noisy.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('8e3411e2-b995-529b-bba3-b8c46058eac4', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$The puppy was so ______ that it wagged its tail and greeted every stranger who walked by.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"friendly","is_correct":true},{"text":"shy","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"fluffy","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"obedient","is_correct":false,"misconception_token":"sat-wic-related-not-precise"}]$q$::jsonb, $q$friendly$q$, $q$Greeting every stranger with a wagging tail shows the puppy is "friendly"; "obedient" is a related trait the clue does not demonstrate.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('27d58444-1128-5969-8250-b7553f5d934f', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$The soup was far too ______ for me; even a single spoonful left my mouth burning from the chili.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"bland","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"spicy","is_correct":true},{"text":"salty","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"cold","is_correct":false,"misconception_token":"sat-wic-wrong-sense"}]$q$::jsonb, $q$spicy$q$, $q$"Mouth burning from the chili" points to "spicy"; "cold" mistakes "burning" for temperature rather than heat.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('1c164fb6-937d-53ca-b930-4d8e465fbaf6', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$The twins looked so ______ that even their own teacher often mixed up their names.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"different","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"familiar","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"alike","is_correct":true},{"text":"close","is_correct":false,"misconception_token":"sat-wic-wrong-sense"}]$q$::jsonb, $q$alike$q$, $q$Because the teacher "mixed up their names," the twins must look "alike"; "close" uses the wrong sense (emotional nearness, not resemblance).$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('26c70178-0a2b-59e8-bbd6-b4778cbc3e11', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$After the long drought, the farmers were ______ when steady rain finally soaked their fields.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"furious","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"curious","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"hopeful","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"relieved","is_correct":true}]$q$::jsonb, $q$relieved$q$, $q$Rain ending a long drought makes the farmers "relieved"; "hopeful" is related but wrong in timing, since the rain has already come.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('fed9dc65-da28-5d7b-96de-34a059f538f9', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$The trail was so ______ that we reached the summit without stopping to rest even once.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"easy","is_correct":true},{"text":"steep","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"exhausting","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"long","is_correct":false,"misconception_token":"sat-wic-related-not-precise"}]$q$::jsonb, $q$easy$q$, $q$Reaching the summit "without stopping to rest" shows the trail was "easy"; "long" is a trail trait but not what the clue proves.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('a59b0fee-5b04-5dec-bb7b-cb48e56be562', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$The witness gave such a ______ description of the car that the police identified it within minutes.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"vague","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"detailed","is_correct":true},{"text":"lengthy","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"false","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$detailed$q$, $q$Police identifying the car "within minutes" shows the description was "detailed"; a merely "lengthy" one need not be precise.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('713f7e42-f2b6-5b82-8e86-0d807e0bc81e', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$My grandfather is a ______ storyteller; relatives gather every holiday just to hear his tales.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"forgetful","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"loud","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"gifted","is_correct":true},{"text":"frequent","is_correct":false,"misconception_token":"sat-wic-wrong-sense"}]$q$::jsonb, $q$gifted$q$, $q$Relatives gathering "just to hear his tales" shows he is a "gifted" storyteller; "frequent" answers how often, not how well.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('88ae5359-ca6c-5901-b727-6cdc56c089a5', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$The lake was so ______ that we could see straight down to the smooth pebbles on the bottom.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"murky","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"deep","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"frozen","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"clear","is_correct":true}]$q$::jsonb, $q$clear$q$, $q$Seeing "straight down to the pebbles" shows the water was "clear"; depth is related but not why the bottom is visible.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('6dca8a22-4549-5e3b-a746-00d3ed2896d1', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'easy',
   $q$Because the deadline was only an hour away, the reporter typed with ______ speed.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"frantic","is_correct":true},{"text":"leisurely","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"steady","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"careful","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$frantic$q$, $q$An hour from the deadline makes "frantic" the precise word for the reporter's speed; "steady" understates the pressure.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('192bb169-5c9a-5b99-9138-d190cbd0b292', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$The critic's review was ______: she praised the film's visuals in one paragraph and condemned its plot in the next.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"enthusiastic","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"contradictory","is_correct":true},{"text":"lengthy","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"balanced","is_correct":false,"misconception_token":"sat-wic-related-not-precise"}]$q$::jsonb, $q$contradictory$q$, $q$Praising the visuals but condemning the plot makes the review "contradictory"; "balanced" implies fair harmony, not the clash described.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('132b49eb-2717-5df2-9ecf-5fe60644f75e', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$Though the negotiations dragged on for months, the two sides finally reached a ______ that satisfied everyone.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"stalemate","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"argument","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"compromise","is_correct":true},{"text":"agreement","is_correct":false,"misconception_token":"sat-wic-related-not-precise"}]$q$::jsonb, $q$compromise$q$, $q$Long talks ending so everyone is satisfied point to a "compromise," the precise give-and-take; "agreement" is broader and less exact.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('b2268165-6430-5d8c-b770-d128400b99a5', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$The manager's tone stayed ______; she never raised her voice, even when the project fell apart.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"hostile","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"quiet","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"timid","is_correct":false,"misconception_token":"sat-wic-wrong-sense"},{"text":"calm","is_correct":true}]$q$::jsonb, $q$calm$q$, $q$Not raising her voice in a crisis shows a "calm" tone; "timid" misreads composure as fearfulness.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('35323809-8a2f-5ff8-9aab-ef156d4e4981', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$The scientist remained ______ about the new theory, neither endorsing it nor dismissing it until more data arrived.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"neutral","is_correct":true},{"text":"enthusiastic","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"confused","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"certain","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$neutral$q$, $q$"Neither endorsing nor dismissing" shows the scientist stayed "neutral"; withholding judgment is deliberate, not "confused."$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('ffb8a303-4dcf-501a-aff9-89655ca836e2', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$Volunteers described the flood damage as ______, with entire neighborhoods reduced to rubble.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"minor","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"severe","is_correct":true},{"text":"recent","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"noticeable","is_correct":false,"misconception_token":"sat-wic-related-not-precise"}]$q$::jsonb, $q$severe$q$, $q$"Entire neighborhoods reduced to rubble" makes "severe" precise; "noticeable" is far too mild for the clue.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('e59b372a-7113-52c9-9457-1c7513917585', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$His apology sounded ______; he mumbled it while staring at his phone and walking away.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"heartfelt","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"brief","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"insincere","is_correct":true},{"text":"loud","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$insincere$q$, $q$Mumbling an apology while distracted makes it "insincere"; its being "brief" is not what the clue reveals.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('f4726a14-7a09-55f4-b4d3-45b9530cd6f6', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$The ancient manuscript was so ______ that curators handled it with gloves, fearing the pages would crumble.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"valuable","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"sturdy","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"damp","is_correct":false,"misconception_token":"sat-wic-wrong-sense"},{"text":"fragile","is_correct":true}]$q$::jsonb, $q$fragile$q$, $q$Handling it gently lest "the pages crumble" shows it is "fragile"; "valuable" is related but not what the crumbling clue names.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('8dd769cf-5a8c-538c-b892-8333ab02751d', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$The senator gave an ______ answer, using many words yet somehow revealing nothing about her actual position.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"evasive","is_correct":true},{"text":"honest","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"brief","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"thoughtful","is_correct":false,"misconception_token":"sat-wic-related-not-precise"}]$q$::jsonb, $q$evasive$q$, $q$Many words that reveal "nothing about her position" make the answer "evasive"; "brief" contradicts "using many words."$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('7e2bc850-f2bb-56c7-9477-a798a59c9a29', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$The city's growth has been ______: its population has doubled in just five years.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"steady","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"rapid","is_correct":true},{"text":"sudden","is_correct":false,"misconception_token":"sat-wic-wrong-sense"},{"text":"stagnant","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"}]$q$::jsonb, $q$rapid$q$, $q$Doubling in five years makes the growth "rapid"; "sudden" wrongly implies an instant rather than a fast span.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('a86b9263-3c3a-5e60-8e0d-bbbb9259d7b4', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$Although the recipe looked complicated, the chef made it seem ______, finishing the dish in minutes without one glance at the instructions.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"exhausting","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"quick","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"effortless","is_correct":true},{"text":"impossible","is_correct":false,"misconception_token":"sat-wic-too-extreme"}]$q$::jsonb, $q$effortless$q$, $q$Finishing in minutes without checking the recipe makes it look "effortless"; "quick" captures speed but not the ease emphasized.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('c17bff13-fc9c-542d-87c1-2995fb7bfca5', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$The documentary aimed to be ______, presenting both supporters and critics of the policy without taking a side.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"biased","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"thorough","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"boring","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"impartial","is_correct":true}]$q$::jsonb, $q$impartial$q$, $q$Presenting both sides "without taking a side" makes the film "impartial"; "thorough" is about completeness, not fairness.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('e91bac10-dd9d-5f3e-9481-94f01d4e9c87', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$By the end of the marathon, the runner's pace had grown ______, each step slower and heavier than the last.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"sluggish","is_correct":true},{"text":"swift","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"tired","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"steady","is_correct":false,"misconception_token":"sat-wic-wrong-sense"}]$q$::jsonb, $q$sluggish$q$, $q$Steps "slower and heavier than the last" make the pace "sluggish"; "steady" would mean unchanging, but the pace is worsening.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('f571049e-7e7b-5016-bd5d-048de5815128', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$The teacher praised Dana's essay as ______, noting that every claim was backed by evidence and logic.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"creative","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"convincing","is_correct":true},{"text":"lengthy","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"flimsy","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"}]$q$::jsonb, $q$convincing$q$, $q$Claims "backed by evidence and logic" make the essay "convincing"; "creative" praises imagination, not the soundness cited.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('8c5e7dcd-2fd3-59a1-811d-764d6ed192a6', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$The old radio gave off a ______ signal, fading in and out so often that whole sentences were lost.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"strong","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"steady","is_correct":false,"misconception_token":"sat-wic-wrong-sense"},{"text":"weak","is_correct":true},{"text":"modern","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$weak$q$, $q$A signal "fading in and out" until sentences are lost is "weak"; "steady" contradicts the fading described.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('d36e7b9a-001b-5a50-935f-e1dbbf9ca2be', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$The coach's instructions were ______: run to the cone, turn left, and pass the ball — nothing was left to guesswork.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"vague","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"harsh","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"lengthy","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"precise","is_correct":true}]$q$::jsonb, $q$precise$q$, $q$Steps with "nothing left to guesswork" are "precise"; "lengthy" describes length, not the exactness the clue shows.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('61744047-3f1c-535b-8cd3-6ab19e830dff', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'medium',
   $q$The volunteers were ______ in their efforts, showing up before dawn and staying long after dark.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"tireless","is_correct":true},{"text":"reluctant","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"occasional","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"skilled","is_correct":false,"misconception_token":"sat-wic-related-not-precise"}]$q$::jsonb, $q$tireless$q$, $q$Arriving before dawn and staying past dark makes the volunteers "tireless"; "occasional" contradicts their constant hours.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('c37c1e2e-8458-5547-986d-3fae67fba72c', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$The architect was ______ in her planning, checking every measurement three times before approving the blueprints.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"careless","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"meticulous","is_correct":true},{"text":"confident","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"hurried","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$meticulous$q$, $q$Checking "every measurement three times" shows the architect is "meticulous"; "confident" is a related trait the clue does not name.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('f252d4c7-6f88-5ccf-9b94-a133d719fd5e', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$Offered his dream job in a distant city, Marcus felt ______, torn between excitement and the fear of leaving home.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"overjoyed","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"indifferent","is_correct":false,"misconception_token":"sat-wic-wrong-sense"},{"text":"ambivalent","is_correct":true},{"text":"certain","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$ambivalent$q$, $q$"Torn between excitement and fear" makes Marcus "ambivalent"; "indifferent" means not caring, but he cares on both sides.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('f90ba716-cddc-5cb5-a878-c82892084c08', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$The fashion trend proved ______: wildly popular one summer and completely forgotten by the next.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"enduring","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"sudden","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"expensive","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"ephemeral","is_correct":true}]$q$::jsonb, $q$ephemeral$q$, $q$Popular one summer and forgotten the next, the trend was "ephemeral"; "sudden" describes its start, not how briefly it lasted.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('9047bfe1-b5f0-5c9b-901d-7389ab5c85fe', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$Rather than chase an ideal that could never work, the mayor took a ______ approach, choosing the solution that was realistic and affordable.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"pragmatic","is_correct":true},{"text":"idealistic","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"reckless","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"cautious","is_correct":false,"misconception_token":"sat-wic-related-not-precise"}]$q$::jsonb, $q$pragmatic$q$, $q$Choosing the "realistic and affordable" option over an ideal makes the approach "pragmatic"; "idealistic" is the very thing rejected.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('282f5fac-71b4-579d-8508-d5e0a295d99e', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$The essay offered a ______ view of the issue, acknowledging the subtle trade-offs that simpler arguments ignored.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"simplistic","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"nuanced","is_correct":true},{"text":"lengthy","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"balanced","is_correct":false,"misconception_token":"sat-wic-related-not-precise"}]$q$::jsonb, $q$nuanced$q$, $q$Acknowledging "subtle trade-offs" makes the view "nuanced"; "balanced" is related but does not capture the fine distinctions.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('2b9f8390-b72f-5cb8-9e4b-fb694f0d9aff', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$The critic's praise was ______, so overstated that readers suspected she was exaggerating for effect.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"measured","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"sincere","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"hyperbolic","is_correct":true},{"text":"brief","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$hyperbolic$q$, $q$Praise "so overstated" it seems exaggerated is "hyperbolic"; "measured" is its opposite, restrained tone.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('1530efc4-ecfb-5695-8ef8-f7a218bae46e', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$Witnesses gave ______ accounts of the accident, each one flatly contradicting the others.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"identical","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"detailed","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"delayed","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"conflicting","is_correct":true}]$q$::jsonb, $q$conflicting$q$, $q$Accounts "flatly contradicting the others" are "conflicting"; "identical" is ruled out by the contradiction.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('d92443f1-1d3f-5505-9748-67bfb0835a75', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$The professor's lectures were famously ______, wandering from topic to topic with no clear point.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"meandering","is_correct":true},{"text":"focused","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"brief","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"lively","is_correct":false,"misconception_token":"sat-wic-related-not-precise"}]$q$::jsonb, $q$meandering$q$, $q$Lectures "wandering from topic to topic with no clear point" are "meandering"; "brief" contradicts the aimless wandering.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('b934b5fb-fefc-5022-9055-a691b8c03f35', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$The evidence against the theory was ______; not a single expert could find a flaw in it.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"flimsy","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"solid","is_correct":true},{"text":"disputed","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"technical","is_correct":false,"misconception_token":"sat-wic-related-not-precise"}]$q$::jsonb, $q$solid$q$, $q$Evidence in which "not a single expert could find a flaw" is "solid"; "disputed" contradicts that unanimous acceptance.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('d5a4293e-26a7-5109-b0be-8071edc31a63', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$The billionaire was surprisingly ______, donating most of his fortune to schools and hospitals.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"selfish","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"wealthy","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"generous","is_correct":true},{"text":"reluctant","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$generous$q$, $q$Donating "most of his fortune" shows he is "generous"; "wealthy" describes having money, not the giving the clue highlights.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('17c3e547-02f8-5e29-9caf-da2290468f8b', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$The peace talks collapsed because neither side would ______, each insisting on every one of its original demands.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"negotiate","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"surrender","is_correct":false,"misconception_token":"sat-wic-too-extreme"},{"text":"listen","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"concede","is_correct":true}]$q$::jsonb, $q$concede$q$, $q$Refusing to give ground on any demand means neither side would "concede"; "surrender" overstates it as total defeat.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('ea3233a9-b7d1-55b8-a469-6f606d744ea8', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$The novel's hero is deeply ______, capable of great kindness one moment and shocking cruelty the next.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"complex","is_correct":true},{"text":"predictable","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"gentle","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"fictional","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$complex$q$, $q$Swinging between "great kindness" and "shocking cruelty" makes the hero "complex"; "gentle" captures only one half.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('9de72b5d-7ae6-5979-9900-c362a2cbd304', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$The reforms brought only ______ change; within a year the old problems had returned exactly as before.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"lasting","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"temporary","is_correct":true},{"text":"radical","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"sudden","is_correct":false,"misconception_token":"sat-wic-wrong-sense"}]$q$::jsonb, $q$temporary$q$, $q$Change after which "the old problems had returned" was "temporary"; "sudden" describes speed of onset, not that it faded.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('a4e01582-5e8b-5251-967e-b186d1227137', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$The diplomat chose her words with great ______, careful never to offend either delegation.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"haste","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"honesty","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"tact","is_correct":true},{"text":"hostility","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"}]$q$::jsonb, $q$tact$q$, $q$Choosing words so as "never to offend" shows "tact"; "honesty" is a virtue, but not the diplomatic care the clue names.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('4bf97769-bbe3-57b5-8c87-b268e145fc57', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$Faced with the same crisis every winter, the town grew ______, having long since stopped reacting with alarm.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"alarmed","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"prepared","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"curious","is_correct":false,"misconception_token":"sat-wic-off-context"},{"text":"numb","is_correct":true}]$q$::jsonb, $q$numb$q$, $q$A town that "stopped reacting with alarm" has grown "numb"; "prepared" is related but describes readiness, not the emotional flatness.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;
insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  ('2579eeac-64a3-5992-8db8-b19785f3aae8', null, (select id from public.skills where slug = 'prep-sat-words-in-context'), null, 'hard',
   $q$The memo was intentionally ______, worded so vaguely that each department read it to mean something different.

Which choice completes the text with the most logical and precise word?$q$, $q$[{"text":"ambiguous","is_correct":true},{"text":"precise","is_correct":false,"misconception_token":"sat-wic-wrong-connotation"},{"text":"brief","is_correct":false,"misconception_token":"sat-wic-related-not-precise"},{"text":"hostile","is_correct":false,"misconception_token":"sat-wic-off-context"}]$q$::jsonb, $q$ambiguous$q$, $q$Wording so vague that "each department read it differently" makes the memo "ambiguous"; "precise" is its opposite.$q$, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;

commit;
