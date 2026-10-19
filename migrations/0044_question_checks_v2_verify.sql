-- ===========================================================================
-- 0044_question_checks_v2_verify.sql
--
-- Checks for migration 0044. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0044 has committed, and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report and rolling back every fixture:
--
--     VERIFY 0044 PASSED: N of N checks
--     VERIFY 0044 FAILED: 2 of N checks failed
--
-- DENIED = no privilege or row security said no; REFUSED = a server rule raised.
-- ===========================================================================

do $verify$
declare
  v_u_admin  uuid := gen_random_uuid();
  v_skill    uuid := gen_random_uuid();
  v_parent   uuid;
  v_math     uuid := gen_random_uuid();
  v_mparent  uuid;
  v_prep     uuid := gen_random_uuid();
  v_good     jsonb := '[{"text":"right","is_correct":true},{"text":"wrong a","is_correct":false,"misconception_token":"x"},{"text":"wrong b","is_correct":false,"misconception_token":"y"},{"text":"wrong c","is_correct":false,"misconception_token":"z"}]';
  v_tiles    jsonb := '[{"text":"5","is_correct":true,"tile":{"kind":"number","value":"5"}},{"text":"2","is_correct":false,"tile":{"kind":"number","value":"2"}},{"text":"3","is_correct":false,"tile":{"kind":"number","value":"3"}}]';
  v_t        text;
  v_report   text := '';
  v_total    integer := 0;
  v_failed   integer := 0;
begin
  execute $fn$
    create function pg_temp.v0044_as(p_uid uuid, p_sql text)
    returns text
    language plpgsql
    as $body$
    declare
      v_out text;
    begin
      perform set_config('request.jwt.claims',
        json_build_object('sub', p_uid, 'role', 'authenticated')::text, true);
      perform set_config('request.jwt.claim.sub', p_uid::text, true);
      execute 'set local role authenticated';
      begin
        execute p_sql into v_out;
      exception
        when insufficient_privilege then v_out := 'DENIED';
        when others then v_out := 'REFUSED';
      end;
      execute 'reset role';
      perform set_config('request.jwt.claims', '', true);
      perform set_config('request.jwt.claim.sub', '', true);
      return coalesce(v_out, 'null');
    end;
    $body$
  $fn$;

  insert into auth.users (id, instance_id, aud, role, email, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values (v_u_admin, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
          'v0044-admin@verify0044.test', now(), '{}', '{}', now(), now());
  insert into public.platform_admins (user_id, note) values (v_u_admin, 'verify 0044');

  select id into v_parent from public.skills where level = 'subject' and subject = 'writing' order by created_at limit 1;
  insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, ccss_grade, ccss_grade_num)
  values (v_skill, 'skill', v_parent, 'writing', 'Verify Punctuation', 'v0044-verify-writing', '9-12', '9', 9);
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status, teaches_punctuation) values
    (v_skill, 'easy', 'Which choice is punctuated correctly?', v_good, 'right', 'Because the text says so.', 'draft', false),
    (v_skill, 'easy', 'The lead ______ a biologist, spoke first. Which choice completes the sentence?',
       replace(v_good::text, 'wrong a', 'wrong a — dash')::jsonb, 'right', 'A dash sets off the phrase.', 'draft', true),
    (v_skill, 'easy', 'The team ______ all four of them, won. Which choice completes the sentence?',
       replace(v_good::text, 'wrong a', 'wrong a — dash')::jsonb, 'right', 'A dash sets off the phrase.', 'draft', false),
    (v_skill, 'easy', 'Which mark ends the sentence?', replace(v_good::text, 'wrong a', 'wrong a — dash')::jsonb, 'right', '', 'draft', true),
    (v_skill, 'easy', 'Pick the main idea', v_good, 'right', 'Because the text says so.', 'draft', false),
    (v_skill, 'easy', 'Which word is a noun?',
       '[{"text":"right","is_correct":true},{"text":"wrong a","is_correct":false},{"text":"wrong b","is_correct":false,"misconception_token":"y"},{"text":"wrong c","is_correct":false,"misconception_token":"z"}]',
       'right', 'A noun names a thing.', 'draft', false);

  select id into v_mparent from public.skills where level = 'subject' and subject = 'math' order by created_at limit 1;
  insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, ccss_grade, ccss_grade_num)
  values (v_math, 'skill', v_mparent, 'math', 'Verify Counting', 'v0044-verify-math', 'k-2', 'K', 0);
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status, render_mode) values
    (v_math, 'easy', 'What is $x$ if $x - 3 = 4$?', v_good, 'right', 'Add 3: $x = 4 + 3$, so $x = 7$.', 'draft', 'text'),
    (v_math, 'easy', 'Which value works - and why?', v_good, 'right', 'Add 3 to both sides of the equation.', 'draft', 'text'),
    (v_math, 'easy', 'Solve for $x$: $2x = 8$.', v_good, 'right', 'Divide by 2: 8 - 4 = 4 is not the step; 8 / 2 = 4.', 'draft', 'text'),
    (v_math, 'easy', 'As used here, the word most nearly means', v_good, 'right', 'Because the text says so.', 'draft', 'text'),
    (v_math, 'easy', 'Tap the group with more.', v_tiles, '5', 'Five is more than two or three.', 'draft', 'audio_picture'),
    (v_math, 'easy', 'Tap the biggest number.',
       '[{"text":"5","is_correct":true,"tile":{"kind":"number","value":"5"}},{"text":"2","is_correct":false,"tile":{"kind":"number","value":"2"}},{"text":"3","is_correct":false,"tile":{"kind":"number","value":"3"}},{"text":"4","is_correct":false,"tile":{"kind":"number","value":"4"}},{"text":"1","is_correct":false,"tile":{"kind":"number","value":"1"}}]',
       '5', 'Five is the biggest.', 'draft', 'audio_picture'),
    (v_math, 'easy', 'Tap the number that comes next.',
       '[{"text":"5","is_correct":true,"tile":{"kind":"number","value":"5"}},{"text":"5","is_correct":false,"tile":{"kind":"number","value":"5"}},{"text":"3","is_correct":false,"tile":{"kind":"number","value":"3"}}]',
       '5', 'Five comes next.', 'draft', 'audio_picture'),
    (v_math, 'easy', 'Which group has more?',
       '[{"text":"5","is_correct":true},{"text":"2","is_correct":false},{"text":"3","is_correct":false}]',
       '5', 'Five is more.', 'draft', 'text');

  insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, ccss_grade, ccss_grade_num)
  values (v_prep, 'skill', v_mparent, 'prep-quant', 'Verify Prep Quant', 'v0044-verify-prep', '6-8', '7', 7);
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status) values
    (v_prep, 'easy', 'Given $x = 5$, which is greater, $2x + 3$ or $3x - 2$?', v_good, 'right', 'Both are $13$: $3x - 2 = 13$.', 'draft');

  create temp table v0044_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  insert into v0044_results (name, expected, actual) values
  ('column: teaches_punctuation exists, not null, default false', 'boolean/NO/false',
     (select data_type || '/' || is_nullable || '/' || column_default from information_schema.columns
       where table_schema = 'public' and table_name = 'generated_questions' and column_name = 'teaches_punctuation')),
  ('flag: the live dash-teaching items present are all marked', 'true',
     (select (count(*) filter (where teaches_punctuation) = count(*))::text from public.generated_questions
       where id in ('2a343190-abb3-57d3-a4d3-af5b38899819', '9f79c586-7960-5a19-b696-980cbea5e064',
                    'a3ac0b54-c631-542a-9305-17f6e5a5fa3b', 'a13ea13e-c70c-5098-a1b6-df4058e304ca',
                    '20017b4e-7e18-53a6-a8d5-ac1388fa2634', 'bb32f457-6eb2-59f2-adea-48efa02869cf'))),
  ('flag: no other live item is marked', '0',
     (select count(*)::text from public.generated_questions
       where teaches_punctuation and skill_id not in (v_skill, v_math)
         and id not in ('2a343190-abb3-57d3-a4d3-af5b38899819', '9f79c586-7960-5a19-b696-980cbea5e064',
                        'a3ac0b54-c631-542a-9305-17f6e5a5fa3b', 'a13ea13e-c70c-5098-a1b6-df4058e304ca',
                        '20017b4e-7e18-53a6-a8d5-ac1388fa2634', 'bb32f457-6eb2-59f2-adea-48efa02869cf'))),
  ('checks: a clean item has no issues', '0',
     (select cardinality(public.question_issues(q))::text from public.generated_questions q
       where q.skill_id = v_skill and q.stem = 'Which choice is punctuated correctly?')),
  ('dash flag: a flagged item with a dash passes', '0',
     (select cardinality(public.question_issues(q))::text from public.generated_questions q
       where q.skill_id = v_skill and q.stem like 'The lead%')),
  ('dash flag: the same item unflagged is still caught', 'no_dashes',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_skill and q.stem like 'The team%')),
  ('dash flag: a flagged item still gets every other check', 'has_solution',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_skill and q.stem = 'Which mark ends the sentence?')),
  ('checks: a stem without a question mark or colon is caught', 'stem_ends',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_skill and q.stem = 'Pick the main idea')),
  ('checks: a text item with an untagged wrong choice is caught', 'distractor_misconceptions',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_skill and q.stem = 'Which word is a noun?')),
  ('checks: math, a spaced minus inside $...$ is not a dash', '0',
     (select cardinality(public.question_issues(q))::text from public.generated_questions q
       where q.skill_id = v_math and q.stem like 'What is%')),
  ('checks: test-prep math, a spaced minus inside $...$ is not a dash', '0',
     (select cardinality(public.question_issues(q))::text from public.generated_questions q
       where q.skill_id = v_prep)),
  ('checks: math, a dash in the prose is still caught', 'no_dashes',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_math and q.stem like 'Which value%')),
  ('checks: math, an instruction ending in a period with a minus between numbers passes', '0',
     (select cardinality(public.question_issues(q))::text from public.generated_questions q
       where q.skill_id = v_math and q.stem like 'Solve for%')),
  ('checks: a lead-in with no closing punctuation is caught', 'stem_ends',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_math and q.stem like 'As used here%')),
  ('picture: three tiles, a spoken instruction and no named mistakes passes', '0',
     (select cardinality(public.question_issues(q))::text from public.generated_questions q
       where q.skill_id = v_math and q.stem = 'Tap the group with more.')),
  ('picture: five tiles is caught', 'four_choices',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_math and q.stem = 'Tap the biggest number.')),
  ('picture: two tiles the same is caught', 'distinct_choices',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_math and q.stem = 'Tap the number that comes next.')),
  ('text: three untagged choices is still caught', 'four_choices,distractor_misconceptions',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_math and q.stem = 'Which group has more?')),
  ('live picture items: none flagged for missing named mistakes', '0',
     (select count(*)::text from public.generated_questions q
       where q.render_mode = 'audio_picture' and q.skill_id <> v_math
         and 'distractor_misconceptions' = any (public.question_issues(q)))),
  ('signed in: the flag is unreadable from the browser', 'DENIED',
     pg_temp.v0044_as(v_u_admin, 'select count(*)::text from public.generated_questions where teaches_punctuation')),
  ('signed in: the checks function is not callable', 'DENIED',
     pg_temp.v0044_as(v_u_admin, 'select count(*)::text from public.generated_questions q where cardinality(public.question_issues(q)) >= 0'));

  -- -------------------------------------------------------------------------
  -- Report, then roll everything back.
  -- -------------------------------------------------------------------------
  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0044_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0044 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0044 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
