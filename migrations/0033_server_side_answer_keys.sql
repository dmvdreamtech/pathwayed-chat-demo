-- ===========================================================================
-- 0033_server_side_answer_keys.sql
--
-- Answer keys become server-only, the server picks timed sections, and the
-- server checks learning access and prep entitlement.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once. Requires 0031 (request_is_from_client, the answer-grading trigger).
-- Idempotent. Then run 0033_server_side_answer_keys_verify.sql. Deploy the
-- security-0033 build RIGHT AFTER (see DEPLOY ORDER).
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES
-- ---------------------------------------------------------------------------
--  generated_questions  New column choices_public: the choices with is_correct
--                       and misconception_token removed (a wrong choice was the
--                       only kind that carried a token, so the token alone gave
--                       the answer away). The database fills it from choices.
--                       Browsers may read every column EXCEPT choices,
--                       correct_answer and solution.
--  question_templates   No browser read at all. Its specs hold the formulas that
--                       compute the answers, and nothing in the app reads them.
--  submit_answer()      The one way a browser answers a question. Records the
--                       answer (graded by the 0031 trigger) and returns the
--                       verdict: right or wrong, the correct choice, the
--                       misconception behind a wrong choice, and the solution.
--                       A placement answer returns right or wrong only.
--                       Practice needs learning access (or an active prep
--                       entitlement for a module that uses the skill);
--                       placement does not.
--  prep_section_config  Each timed section's question count, time limit and
--                       skills, generated from src/lib/prep (sectionConfig.ts).
--  prep_start_section() Now (student, module, section). The server checks
--                       entitlement, picks the questions, sets the time limit,
--                       and freezes them. The browser no longer sends either.
--  prep_essay_start()   Now (student, module, prompt). Time limit from config,
--                       entitlement checked.
--  prep_attempt_review() The answer keys for a finished timed section, for its
--                       owner, only once it is submitted or expired.
--  account_has_learning_access() / student_has_learning_access()
--                       The same rule as the app's SubscriptionGate: an active
--                       school-covered child on the account, a paid status, or a
--                       trial that has not ended. api/chat, api/flashcards,
--                       api/transcribe and api/tts call it.
--
-- ---------------------------------------------------------------------------
-- DEPLOY ORDER
-- ---------------------------------------------------------------------------
--  1. Run this file, then the verify file.
--  2. Deploy the security-0033 build immediately. A tab still open on the old
--     build cannot load NEW questions after step 1 (it asks for the hidden
--     columns), and the old build calls the old prep_start_section signature.
--     Answers it already has on screen still record. A reload fixes it.
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (manual; run as one script if ever needed, then redeploy the
-- pre-0033 build)
-- ---------------------------------------------------------------------------
-- begin;
-- grant select on public.generated_questions to authenticated;
-- grant select on public.question_templates to authenticated;
-- create policy "question_templates published readable" on public.question_templates
--   for select to authenticated using (status = 'published');
-- drop function if exists public.submit_answer(uuid, uuid, integer, integer, boolean);
-- drop function if exists public.prep_attempt_review(uuid);
-- drop function if exists public.prep_start_section(uuid, text, text);
-- drop function if exists public.prep_essay_start(uuid, text, text);
-- -- then re-create prep_start_section(uuid, text, text, integer, jsonb) and
-- -- prep_essay_start(uuid, text, integer) from migrations 0016 and 0018, and
-- -- grant execute on both to authenticated.
-- commit;
-- The choices_public column, the access functions and prep_section_config can
-- stay; nothing old depends on their absence.
-- ===========================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1) choices_public: the choices a student may see.
-- ---------------------------------------------------------------------------
create or replace function public.public_choices(p_choices jsonb)
returns jsonb
language sql
immutable
set search_path = ''
as $$
  select case
           when jsonb_typeof(p_choices) = 'array' then
             coalesce((select jsonb_agg((e.value - 'is_correct' - 'misconception_token') order by e.ordinality)
                         from jsonb_array_elements(p_choices) with ordinality as e(value, ordinality)), '[]'::jsonb)
           else '[]'::jsonb
         end;
$$;

alter table public.generated_questions
  add column if not exists choices_public jsonb
  generated always as (public.public_choices(choices)) stored;

revoke all on public.generated_questions from anon, authenticated;
grant select (id, template_id, skill_id, sat_alignment, difficulty, stem, choices_public,
              status, created_at, updated_at, passage_id, render_mode, prompt)
  on public.generated_questions to authenticated;
-- Kept: "generated_questions published readable" (select, authenticated).

revoke all on public.question_templates from anon, authenticated;
drop policy if exists "question_templates published readable" on public.question_templates;

-- ---------------------------------------------------------------------------
-- 2) Learning access and prep entitlement, decided by the server.
-- ---------------------------------------------------------------------------

-- Same rule as SubscriptionGate (hasLearningAccess + hasCoveredStudent in
-- src/lib/accessGate.ts). Change both together.
create or replace function public.account_has_learning_access(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
           select 1 from public.students s
            where s.parent_id = p_user_id and s.active and s.school_covered)
      or exists (
           select 1 from public.profiles p
            where p.id = p_user_id
              and (p.subscription_status in ('active', 'trialing', 'past_due')
                   or (p.trial_end is not null and p.trial_end > now())));
$$;

create or replace function public.student_has_learning_access(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select public.account_has_learning_access(s.parent_id)
                     from public.students s where s.id = p_student_id), false);
$$;

-- Same statuses as ACTIVE_PREP_STATUSES in src/lib/prep/access.ts.
create or replace function public.has_prep_access(p_student_id uuid, p_module_id text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.prep_entitlements e
     where e.student_id = p_student_id
       and e.module_id = p_module_id
       and e.status in ('active', 'past_due'));
$$;

-- ---------------------------------------------------------------------------
-- 3) Timed-section settings, generated from src/lib/prep (sectionConfig.ts).
--    sectionConfig.test.ts fails if this VALUES list drifts from the code.
-- ---------------------------------------------------------------------------
create table if not exists public.prep_section_config (
  module_id      text    not null,
  section_id     text    not null,
  question_count integer not null check (question_count > 0),
  time_limit_sec integer not null check (time_limit_sec > 0),
  skill_slugs    text[]  not null,
  is_essay       boolean not null default false,
  primary key (module_id, section_id)
);
alter table public.prep_section_config enable row level security;
revoke all on public.prep_section_config from anon, authenticated;
-- No policy and no grant: only the definer functions below read it.

insert into public.prep_section_config
  (module_id, section_id, question_count, time_limit_sec, skill_slugs, is_essay)
values
  ('hspt', 'verbal-skills', 60, 960, array['prep-synonyms', 'prep-antonyms', 'prep-analogies', 'prep-logic', 'prep-verbal-classification']::text[], false),
  ('hspt', 'quantitative-skills', 52, 1800, array['prep-number-series', 'prep-quantitative-comparison', 'decimal-operations', 'geometry']::text[], false),
  ('hspt', 'reading', 62, 1500, array['main-idea', 'author-purpose']::text[], false),
  ('hspt', 'mathematics', 64, 2700, array['expressions', 'linear-equations', 'multiplication', 'algebra-1-concepts', 'geometry']::text[], false),
  ('hspt', 'language', 60, 1500, array['modifier-placement', 'advanced-punctuation', 'author-purpose']::text[], false),
  ('isee', 'verbal-reasoning', 40, 1200, array['prep-synonyms', 'prep-sentence-completion']::text[], false),
  ('isee', 'quantitative-reasoning', 37, 2100, array['prep-quantitative-comparison']::text[], false),
  ('isee', 'reading-comprehension', 36, 2100, array['main-idea', 'evidence-based-reading', 'inference', 'author-purpose']::text[], false),
  ('isee', 'mathematics-achievement', 47, 2400, array['multiplication', 'algebra-1-concepts', 'geometry', 'data-analysis', 'linear-equations']::text[], false),
  ('isee', 'essay', 1, 1800, array['data-analysis']::text[], true),
  ('sat', 'reading-writing-1', 27, 1920, array['evidence-based-reading', 'prep-sat-words-in-context', 'prep-sat-transitions', 'advanced-punctuation']::text[], false),
  ('sat', 'reading-writing-2', 27, 1920, array['evidence-based-reading', 'prep-sat-words-in-context', 'prep-sat-transitions', 'advanced-punctuation']::text[], false),
  ('sat', 'math-1', 22, 2100, array['linear-equations', 'quadratic-functions', 'data-analysis', 'similarity-right-triangles']::text[], false),
  ('sat', 'math-2', 22, 2100, array['linear-equations', 'quadratic-functions', 'data-analysis', 'similarity-right-triangles']::text[], false)
on conflict (module_id, section_id) do update set
  question_count = excluded.question_count,
  time_limit_sec = excluded.time_limit_sec,
  skill_slugs    = excluded.skill_slugs,
  is_essay       = excluded.is_essay;

-- May this student practice this skill? Learning access, or an active prep
-- entitlement for a module whose sections use the skill (prep Train/Practice).
create or replace function public.can_practice_skill(p_student_id uuid, p_skill_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.student_has_learning_access(p_student_id)
      or exists (
           select 1
             from public.prep_entitlements e
             join public.prep_section_config c on c.module_id = e.module_id
             join public.skills k on k.slug = any(c.skill_slugs)
            where e.student_id = p_student_id
              and e.status in ('active', 'past_due')
              and k.id = p_skill_id);
$$;

-- ---------------------------------------------------------------------------
-- 4) submit_answer: record an answer and return the verdict.
-- ---------------------------------------------------------------------------
create or replace function public.submit_answer(
  p_student_id    uuid,
  p_question_id   uuid,
  p_choice_index  integer,
  p_time_ms       integer default null,
  p_is_diagnostic boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_q        record;
  v_choice   jsonb;
  v_correct  boolean;
  v_token    text;
  v_correct_index integer;
  v_id       uuid;
begin
  if not public.owns_student(p_student_id) then
    raise exception 'not authorized for this student';
  end if;

  select gq.skill_id, gq.sat_alignment, gq.choices, gq.correct_answer, gq.solution
    into v_q
    from public.generated_questions gq
   where gq.id = p_question_id;
  if not found then
    raise exception 'unknown question %', p_question_id;
  end if;

  -- Placement is open to every family (it is how a new child starts). Practice,
  -- check questions and Practice SAT need learning access or prep entitlement.
  if not coalesce(p_is_diagnostic, false)
     and not public.can_practice_skill(p_student_id, v_q.skill_id) then
    raise exception 'access_required: this account has no active plan or prep access for this skill';
  end if;

  -- Same grading as the 0031 trigger, written out here too so the row is right
  -- whoever calls (the trigger re-derives the same values for browser calls).
  if p_choice_index is not null and p_choice_index >= 0
     and jsonb_typeof(v_q.choices) = 'array'
     and p_choice_index < jsonb_array_length(v_q.choices) then
    v_choice := v_q.choices -> p_choice_index;
  end if;
  v_correct := coalesce((v_choice ->> 'is_correct') = 'true', false);
  v_token   := nullif(v_choice ->> 'misconception_token', '');

  insert into public.question_attempts
    (student_id, generated_question_id, skill_id, sat_alignment, is_correct,
     chosen_choice_index, chosen_misconception_token, time_ms, is_diagnostic)
  values
    (p_student_id, p_question_id, v_q.skill_id, v_q.sat_alignment, v_correct,
     p_choice_index, v_token,
     case when p_time_ms is null then null else least(greatest(p_time_ms, 0), 3600000) end,
     coalesce(p_is_diagnostic, false))
  returning id into v_id;

  if coalesce(p_is_diagnostic, false) then
    -- Silent scoring: placement learns right or wrong, never the answer.
    return jsonb_build_object('attempt_id', v_id, 'is_correct', v_correct);
  end if;

  select (e.ordinality - 1)::integer
    into v_correct_index
    from jsonb_array_elements(v_q.choices) with ordinality as e(value, ordinality)
   where (e.value ->> 'is_correct') = 'true'
   order by e.ordinality
   limit 1;

  return jsonb_build_object(
    'attempt_id', v_id,
    'is_correct', v_correct,
    'correct_index', v_correct_index,
    'correct_answer', v_q.correct_answer,
    'misconception_token', v_token,
    'solution', v_q.solution
  );
end;
$$;

-- ---------------------------------------------------------------------------
-- 5) Timed sections: the server picks the questions and the time limit.
-- ---------------------------------------------------------------------------
drop function if exists public.prep_start_section(uuid, text, text, integer, jsonb);

create or replace function public.prep_start_section(
  p_student_id uuid,
  p_module_id  text,
  p_section_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cfg public.prep_section_config;
  v_row public.prep_attempts;
  v_ids text[];
begin
  if not public.owns_student(p_student_id) then
    raise exception 'not authorized for this student';
  end if;

  select * into v_cfg
    from public.prep_section_config c
   where c.module_id = p_module_id and c.section_id = p_section_id and not c.is_essay;
  if not found then
    raise exception 'unknown prep section %/%', p_module_id, p_section_id;
  end if;

  if not public.has_prep_access(p_student_id, p_module_id) then
    raise exception 'prep_access_required: no active entitlement for %', p_module_id;
  end if;

  -- Resume: the in-progress attempt keeps its frozen questions and clock.
  select * into v_row
    from public.prep_attempts
   where student_id = p_student_id
     and module_id = p_module_id
     and section_id = p_section_id
     and status = 'in_progress'
   limit 1;
  if found then
    return public.prep_attempt_json(v_row);
  end if;

  -- Up to question_count published questions from each skill, then a random
  -- question_count of those: the same draw the browser used to make.
  select array_agg(x.id::text order by x.ord)
    into v_ids
    from (
      select y.id, random() as ord
        from (
          select g.id,
                 row_number() over (partition by g.skill_id order by random()) as rn
            from public.generated_questions g
            join public.skills k on k.id = g.skill_id
           where k.slug = any(v_cfg.skill_slugs)
             and g.status = 'published'
             and jsonb_typeof(g.choices) = 'array'
             and jsonb_array_length(g.choices) >= 2
        ) y
       where y.rn <= v_cfg.question_count
       order by random()
       limit v_cfg.question_count
    ) x;

  -- MIN_QUESTIONS in src/lib/prep/timedSection.ts.
  if coalesce(array_length(v_ids, 1), 0) < 5 then
    raise exception 'prep_not_enough_questions: % available', coalesce(array_length(v_ids, 1), 0);
  end if;

  insert into public.prep_attempts
    (student_id, module_id, section_id, mode, status, time_limit_sec, question_ids, answers)
  values
    (p_student_id, p_module_id, p_section_id, 'timed_section', 'in_progress',
     v_cfg.time_limit_sec, to_jsonb(v_ids), '{}'::jsonb)
  returning * into v_row;

  return public.prep_attempt_json(v_row);
end;
$$;

drop function if exists public.prep_essay_start(uuid, text, integer);

create or replace function public.prep_essay_start(
  p_student_id uuid,
  p_module_id  text,
  p_prompt_id  text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cfg public.prep_section_config;
  v_row public.prep_essay_attempts;
begin
  if not public.owns_student(p_student_id) then
    raise exception 'not authorized for this student';
  end if;

  select * into v_cfg
    from public.prep_section_config c
   where c.module_id = p_module_id and c.is_essay
   limit 1;
  if not found then
    raise exception 'module % has no essay section', p_module_id;
  end if;

  if not public.has_prep_access(p_student_id, p_module_id) then
    raise exception 'prep_access_required: no active entitlement for %', p_module_id;
  end if;

  select * into v_row
    from public.prep_essay_attempts
   where student_id = p_student_id
     and submitted_at is null
   limit 1;

  if not found then
    insert into public.prep_essay_attempts
      (student_id, prompt_id, essay_text, time_limit_sec)
    values
      (p_student_id, p_prompt_id, '', v_cfg.time_limit_sec)
    returning * into v_row;
  end if;

  return public.prep_essay_json(v_row);
end;
$$;

-- The keys for a finished timed section: per question, the correct choice, the
-- correct answer text, the solution, and each choice's misconception token.
create or replace function public.prep_attempt_review(p_attempt_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.prep_attempts;
begin
  select * into v_row from public.prep_attempts where id = p_attempt_id;
  if not found or not public.owns_student(v_row.student_id) then
    raise exception 'not authorized or attempt not found';
  end if;
  if v_row.status = 'in_progress' then
    raise exception 'attempt_in_progress: answers are shown once the section is finished';
  end if;
  if not public.has_prep_access(v_row.student_id, v_row.module_id) then
    raise exception 'prep_access_required: no active entitlement for %', v_row.module_id;
  end if;

  return jsonb_build_object(
    'attempt', public.prep_attempt_json(v_row),
    'keys', coalesce((
      select jsonb_agg(jsonb_build_object(
               'question_id', g.id,
               'correct_index', (select (e.ordinality - 1)::integer
                                   from jsonb_array_elements(g.choices) with ordinality as e(value, ordinality)
                                  where (e.value ->> 'is_correct') = 'true'
                                  order by e.ordinality limit 1),
               'correct_answer', g.correct_answer,
               'solution', g.solution,
               'tokens', (select jsonb_agg(e.value -> 'misconception_token' order by e.ordinality)
                            from jsonb_array_elements(g.choices) with ordinality as e(value, ordinality))
             ) order by q.ordinality)
        from jsonb_array_elements_text(v_row.question_ids) with ordinality as q(qid, ordinality)
        join public.generated_questions g on g.id = q.qid::uuid
    ), '[]'::jsonb)
  );
end;
$$;

-- ---------------------------------------------------------------------------
-- 6) Grants. Every new function: revoke from public and anon, then grant.
-- ---------------------------------------------------------------------------
revoke all on function public.public_choices(jsonb) from public, anon, authenticated;
revoke all on function public.account_has_learning_access(uuid) from public, anon, authenticated;
revoke all on function public.student_has_learning_access(uuid) from public, anon, authenticated;
revoke all on function public.has_prep_access(uuid, text) from public, anon, authenticated;
revoke all on function public.can_practice_skill(uuid, uuid) from public, anon, authenticated;
revoke all on function public.submit_answer(uuid, uuid, integer, integer, boolean) from public, anon;
revoke all on function public.prep_start_section(uuid, text, text) from public, anon;
revoke all on function public.prep_essay_start(uuid, text, text) from public, anon;
revoke all on function public.prep_attempt_review(uuid) from public, anon;

grant execute on function
  public.submit_answer(uuid, uuid, integer, integer, boolean),
  public.prep_start_section(uuid, text, text),
  public.prep_essay_start(uuid, text, text),
  public.prep_attempt_review(uuid)
to authenticated;

-- api/chat, api/flashcards, api/transcribe and api/tts ask with the service role.
grant execute on function
  public.public_choices(jsonb),
  public.account_has_learning_access(uuid),
  public.student_has_learning_access(uuid),
  public.has_prep_access(uuid, text),
  public.can_practice_skill(uuid, uuid),
  public.submit_answer(uuid, uuid, integer, integer, boolean),
  public.prep_start_section(uuid, text, text),
  public.prep_essay_start(uuid, text, text),
  public.prep_attempt_review(uuid)
to service_role;

commit;
