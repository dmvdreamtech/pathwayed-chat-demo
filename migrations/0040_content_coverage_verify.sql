-- ===========================================================================
-- 0040_content_coverage_verify.sql
--
-- Checks for migration 0040. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0040 has committed, and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report and rolling back every fixture:
--
--     VERIFY 0040 PASSED: N of N checks
--     VERIFY 0040 FAILED: 2 of N checks failed
--
-- DENIED = no privilege or row security said no; REFUSED = a server rule raised.
-- ===========================================================================

do $verify$
declare
  v_u_admin  uuid := gen_random_uuid();
  v_u_parent uuid := gen_random_uuid();
  v_skill    uuid := gen_random_uuid();
  v_parent   uuid;
  v_math     uuid := gen_random_uuid();
  v_mparent  uuid;
  v_good     jsonb := '[{"text":"right","is_correct":true},{"text":"wrong a","is_correct":false,"misconception_token":"x"},{"text":"wrong b","is_correct":false,"misconception_token":"y"},{"text":"wrong c","is_correct":false,"misconception_token":"z"}]';
  v_t        text;
  v_report   text := '';
  v_total    integer := 0;
  v_failed   integer := 0;
begin
  execute $fn$
    create function pg_temp.v0040_as(p_uid uuid, p_sql text)
    returns text
    language plpgsql
    as $body$
    declare
      v_out text;
    begin
      if p_uid is null then
        perform set_config('request.jwt.claims', '{"role":"anon"}', true);
        perform set_config('request.jwt.claim.sub', '', true);
        execute 'set local role anon';
      else
        perform set_config('request.jwt.claims',
          json_build_object('sub', p_uid, 'role', 'authenticated')::text, true);
        perform set_config('request.jwt.claim.sub', p_uid::text, true);
        execute 'set local role authenticated';
      end if;
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
  values
    (v_u_admin,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0040-admin@verify0040.test',  now(), '{}', '{}', now(), now()),
    (v_u_parent, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0040-parent@verify0040.test', now(), '{}', '{}', now(), now());
  insert into public.platform_admins (user_id, note) values (v_u_admin, 'verify 0040');

  -- A skill at one planned target slug, with: 2 published and reviewed, 1
  -- published not reviewed, 2 drafts that fail the checks (a dash; a stem with
  -- no question mark), 1 retired.
  select id into v_parent from public.skills where level = 'subject' and subject = 'reading' order by created_at limit 1;
  insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, ccss_grade, ccss_grade_num)
  values (v_skill, 'skill', v_parent, 'reading', 'Verify Theme', 'read-g8-theme-summary', '6-8', '8', 8)
  on conflict (slug) do nothing;
  select id into v_skill from public.skills where slug = 'read-g8-theme-summary';
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status, reviewed_by, reviewed_at) values
    (v_skill, 'easy', 'Which theme fits best?', v_good, 'right', 'Because the text says so.', 'published', 'verify', now()),
    (v_skill, 'easy', 'Which summary fits best?', v_good, 'right', 'Because the text says so.', 'published', 'verify', now()),
    (v_skill, 'easy', 'Which detail matters most?', v_good, 'right', 'Because the text says so.', 'published', null, null),
    (v_skill, 'easy', 'Which idea, if any, is central?', replace(v_good::text, 'wrong a', 'wrong a — dash')::jsonb, 'right', 'Because.', 'draft', null, null),
    (v_skill, 'easy', 'Pick the main idea', v_good, 'right', 'Because the text says so.', 'draft', null, null),
    (v_skill, 'easy', 'Old item?', v_good, 'right', 'Because the text says so.', 'retired', null, null);

  -- A math skill: a spaced minus inside $...$ is math, not a dash; outside it is a dash.
  select id into v_mparent from public.skills where level = 'subject' and subject = 'math' order by created_at limit 1;
  insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, ccss_grade, ccss_grade_num)
  values (v_math, 'skill', v_mparent, 'math', 'Verify Quadratics', 'v0040-verify-math', '9-12', '9', 9);
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status) values
    (v_math, 'easy', 'What is $x$ if $x - 3 = 4$?', v_good, 'right', 'Add 3: $x = 4 + 3$, so $x = 7$.', 'draft'),
    (v_math, 'easy', 'Which value works - and why?', v_good, 'right', 'Add 3 to both sides of the equation.', 'draft'),
    (v_math, 'easy', 'Solve for $x$: $2x = 8$.', v_good, 'right', 'Divide by 2: 8 - 4 = 4 is not the step; 8 / 2 = 4.', 'draft'),
    (v_math, 'easy', 'As used here, the word most nearly means', v_good, 'right', 'Because the text says so.', 'draft');
  -- A K-2 audio-picture item: three tile choices and a spoken instruction.
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status, render_mode) values
    (v_math, 'easy', 'Tap the group with more.',
     '[{"text":"5","is_correct":true},{"text":"2","is_correct":false,"misconception_token":"x"},{"text":"3","is_correct":false,"misconception_token":"y"}]',
     '5', 'Five is more than two or three.', 'draft', 'audio_picture');

  create temp table v0040_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  insert into v0040_results (name, expected, actual) values
  ('targets: 455 skills K to 12', '455',
     (select count(*)::text from public.coverage_targets)),
  ('targets: Reading 183, Writing 114, Math 158', '183/114/158',
     (select count(*) filter (where subject = 'reading') || '/' || count(*) filter (where subject = 'writing') || '/'
             || count(*) filter (where subject = 'math') from public.coverage_targets)),
  ('targets: every grade K to 12 in every subject', '39',
     (select count(distinct (subject, grade))::text from public.coverage_targets)),
  ('checks: a clean item has no issues', '0',
     (select cardinality(public.question_issues(q))::text from public.generated_questions q
       where q.skill_id = v_skill and q.stem = 'Which theme fits best?')),
  ('checks: a dash is caught', 'no_dashes',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_skill and q.stem = 'Which idea, if any, is central?')),
  ('checks: math, a spaced minus inside $...$ is not a dash', '0',
     (select cardinality(public.question_issues(q))::text from public.generated_questions q
       where q.skill_id = v_math and q.stem like 'What is%')),
  ('checks: math, a dash in the prose is still caught', 'no_dashes',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_math and q.stem like 'Which value%')),
  ('checks: math, an instruction ending in a period with a minus between numbers passes', '0',
     (select cardinality(public.question_issues(q))::text from public.generated_questions q
       where q.skill_id = v_math and q.stem like 'Solve for%')),
  ('checks: a lead-in with no closing punctuation is caught', 'stem_ends',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_math and q.stem like 'As used here%')),
  ('checks: an audio-picture item with three tiles passes', '0',
     (select cardinality(public.question_issues(q))::text from public.generated_questions q
       where q.skill_id = v_math and q.stem like 'Tap the group%')),
  ('checks: a stem without a question mark or colon is caught', 'stem_ends',
     (select array_to_string(public.question_issues(q), ',') from public.generated_questions q
       where q.skill_id = v_skill and q.stem = 'Pick the main idea')),
  ('admin: counts for the target (exists/drafted/checks/reviewed/published/published and reviewed)', 'true/5/3/2/3/2',
     pg_temp.v0040_as(v_u_admin,
       'select skill_exists || ''/'' || drafted || ''/'' || checks_passing || ''/'' || reviewed || ''/'' || published || ''/'' || published_reviewed
          from public.content_coverage() where subject = ''reading'' and grade = 8 and name = ''Theme and summary''')),
  ('admin: a target with no skill yet shows as missing', 'false/0',
     pg_temp.v0040_as(v_u_admin,
       'select skill_exists || ''/'' || drafted from public.content_coverage() where subject = ''reading'' and grade = 12 and name = ''Context clues''')),
  ('admin: a live skill is counted under its target (pythagorean-theorem, when present)',
     (select exists (select 1 from public.skills where slug = 'pythagorean-theorem'))::text,
     pg_temp.v0040_as(v_u_admin,
       'select skill_exists::text from public.content_coverage() where subject = ''math'' and grade = 8 and name = ''Pythagorean theorem''')),
  ('parent: refused', 'DENIED',
     pg_temp.v0040_as(v_u_parent, 'select count(*)::text from public.content_coverage()')),
  ('anon: refused', 'DENIED',
     pg_temp.v0040_as(null, 'select count(*)::text from public.content_coverage()')),
  ('signed in: the targets table is unreadable', 'DENIED',
     pg_temp.v0040_as(v_u_admin, 'select count(*)::text from public.coverage_targets')),
  ('signed in: the checks function is not callable', 'DENIED',
     pg_temp.v0040_as(v_u_admin, 'select count(*)::text from public.generated_questions q where cardinality(public.question_issues(q)) >= 0'));

  -- -------------------------------------------------------------------------
  -- Report, then roll everything back.
  -- -------------------------------------------------------------------------
  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0040_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0040 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0040 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
