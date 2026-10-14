-- ===========================================================================
-- 0031_server_decides_results_verify.sql
--
-- Checks for migration 0031. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0031 has committed, and run it once.
--
-- It is ONE statement (a DO block). It builds throwaway fixtures (a family on
-- a free trial with three children, a second family, a paid family, a
-- school-covered student with their own sign-in, a teacher at that school,
-- questions, answers, a timed section, an essay, a session, a consent, a
-- readiness score), then signs in as each of them in turn and tries every
-- write a browser could attempt, exactly as PostgREST would run it.
--
-- IT ALWAYS ENDS WITH AN ERROR, ON PURPOSE. The final RAISE carries the report
-- and rolls the whole block back, so no fixture survives. Read the message:
--
--     VERIFY 0031 PASSED: N of N checks
--     VERIFY 0031 FAILED: 2 of N checks failed
--
-- followed by one line per check: PASS or FAIL, the check name, expected, and
-- actual. Any OTHER error text means the verify itself could not run (most
-- likely 0031 has not been applied); nothing was written in that case either.
--
-- How a probe reports:
--   DENIED   the role has no privilege, or row security refused the row
--   REFUSED  a server rule (trigger or function) raised an error
--   anything else is the probe's own result
-- ===========================================================================

do $verify$
declare
  v_school   uuid := gen_random_uuid();   -- a temporary school

  -- auth users
  v_u_parent  uuid := gen_random_uuid();  -- family on a free trial (cap 2)
  v_u_other   uuid := gen_random_uuid();  -- a second family
  v_u_paid    uuid := gen_random_uuid();  -- paid family, 3 seats
  v_u_cov     uuid := gen_random_uuid();  -- school-covered student's own sign-in
  v_u_teacher uuid := gen_random_uuid();  -- teacher at v_school

  v_kid1     uuid;   -- parent's child, active, grade 5
  v_kid2     uuid;   -- parent's child, active
  v_kid3     uuid;   -- parent's child, paused
  v_okid     uuid;   -- other family's child
  v_pkid1    uuid;   -- paid family's children
  v_pkid2    uuid;
  v_cov      uuid;   -- covered student row

  v_skill    uuid;   -- practice skill
  v_skill2   uuid;   -- placement-only skill
  v_q        uuid;   -- question on v_skill: option 0 right, option 1 wrong
  v_q2       uuid;   -- question on v_skill2: option 0 right, option 1 wrong
  v_strand1  uuid;   -- the only two skills at grade 5 in a throwaway subject
  v_strand2  uuid;
  v_prep     uuid;
  v_essay    uuid;
  v_oatt     uuid;   -- an answer belonging to the other family
  v_ids      uuid[];
  v_col      text;
  v_t        text;

  v_report text := '';
  v_total  integer := 0;
  v_failed integer := 0;
begin
  -- -------------------------------------------------------------------------
  -- Probe runner: run one statement as a given user (null = anon) and return
  -- its single value as text. DENIED = no privilege or row security said no.
  -- REFUSED = a server rule raised.
  -- -------------------------------------------------------------------------
  execute $fn$
    create function pg_temp.v0031_as(p_uid uuid, p_sql text)
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

  -- -------------------------------------------------------------------------
  -- Fixtures, as the SQL editor's role (trusted, so no guard applies here).
  -- -------------------------------------------------------------------------
  insert into auth.users (id, instance_id, aud, role, email, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values
    (v_u_parent,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0031-parent@verify0031.test',  now(), '{}', '{}', now(), now()),
    (v_u_other,   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0031-other@verify0031.test',   now(), '{}', '{}', now(), now()),
    (v_u_paid,    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0031-paid@verify0031.test',    now(), '{}', '{}', now(), now()),
    (v_u_cov,     '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0031-cov@verify0031.test',     now(), '{}', '{}', now(), now()),
    (v_u_teacher, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0031-teacher@verify0031.test', now(), '{}', '{}', now(), now());

  -- handle_new_user made the profiles; the trial trigger put them on a trial.
  update public.profiles
     set subscription_status = 'free_trial', trial_end = now() + interval '7 days',
         plan = null, paid_seats = null, display_name = 'V0031 Parent'
   where id in (v_u_parent, v_u_other, v_u_cov);
  update public.profiles
     set subscription_status = 'active', plan = 'high', paid_seats = 3
   where id = v_u_paid;

  insert into public.students (parent_id, first_name, grade, active) values (v_u_parent, 'Vone', '5', true)  returning id into v_kid1;
  insert into public.students (parent_id, first_name, grade, active) values (v_u_parent, 'Vtwo', '5', true)  returning id into v_kid2;
  insert into public.students (parent_id, first_name, grade, active) values (v_u_parent, 'Vthree', '5', false) returning id into v_kid3;
  insert into public.students (parent_id, first_name, grade, active) values (v_u_other, 'Vother', '5', true)  returning id into v_okid;
  insert into public.students (parent_id, first_name, grade, active) values (v_u_paid, 'Vpaidone', '9', true) returning id into v_pkid1;
  insert into public.students (parent_id, first_name, grade, active) values (v_u_paid, 'Vpaidtwo', '9', true) returning id into v_pkid2;
  insert into public.students (parent_id, first_name, grade, level, active, school_covered,
                               dean_student_id, school_id, above_grade_ok)
  values (v_u_cov, 'Vcovered', '10', 'on', true, true, 'v0031-dean-cov', v_school, false)
  returning id into v_cov;

  insert into public.school_staff (school_id, email, user_id, role, active)
  values (v_school, 'v0031-teacher@verify0031.test', v_u_teacher, 'teacher', true);

  insert into public.skills (level, subject, name, slug, ccss_grade_num)
  values ('skill', 'math', 'V0031 practice skill', 'v0031-practice', 9) returning id into v_skill;
  insert into public.skills (level, subject, name, slug, ccss_grade_num)
  values ('skill', 'math', 'V0031 placement skill', 'v0031-placement', 9) returning id into v_skill2;
  -- A throwaway subject whose only grade-5 skills are these two, so the
  -- working-grade check has a strand the fixture child can actually clear.
  insert into public.skills (level, subject, name, slug, ccss_grade_num)
  values ('skill', 'v0031strand', 'V0031 strand one', 'v0031-strand-1', 5) returning id into v_strand1;
  insert into public.skills (level, subject, name, slug, ccss_grade_num)
  values ('skill', 'v0031strand', 'V0031 strand two', 'v0031-strand-2', 5) returning id into v_strand2;

  insert into public.generated_questions (skill_id, sat_alignment, difficulty, stem, choices, correct_answer, status)
  values (v_skill, 'v0031-domain', 'easy', 'V0031 two plus two',
          '[{"text":"4","is_correct":true},{"text":"5","is_correct":false,"misconception_token":"v0031-off-by-one"}]',
          '4', 'published')
  returning id into v_q;
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, status)
  values (v_skill2, 'easy', 'V0031 three plus three',
          '[{"text":"6","is_correct":true},{"text":"7","is_correct":false}]', '6', 'published')
  returning id into v_q2;
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, status) values
    (v_strand1, 'easy', 'V0031 strand q1', '[{"text":"a","is_correct":true}]', 'a', 'published'),
    (v_strand2, 'easy', 'V0031 strand q2', '[{"text":"b","is_correct":true}]', 'b', 'published');

  -- The other family's answer, and the covered student's, as trusted fixtures.
  insert into public.question_attempts (student_id, generated_question_id, skill_id, is_correct, chosen_choice_index, time_ms, is_diagnostic)
  values (v_okid, v_q, v_skill, true, 0, 20000, false) returning id into v_oatt;
  insert into public.question_attempts (student_id, generated_question_id, skill_id, is_correct, chosen_choice_index, time_ms, is_diagnostic)
  values (v_cov, v_q, v_skill, true, 0, 20000, false);

  insert into public.prep_attempts (student_id, module_id, section_id, mode, status, time_limit_sec, question_ids, answers)
  values (v_kid1, 'v0031', 'reading', 'timed_section', 'in_progress', 1500, jsonb_build_array(v_q::text), '{}')
  returning id into v_prep;
  insert into public.prep_essay_attempts (student_id, prompt_id, essay_text, time_limit_sec)
  values (v_kid1, 'v0031-prompt', '', 1800)
  returning id into v_essay;

  insert into public.sessions (student_id, subject, messages) values (v_kid1, 'math', '[]');
  insert into public.consents (parent_id, parent_name, method, consent_version) values (v_u_parent, 'V0031 Parent', 'web_checkbox', '1.0');
  insert into public.feedback (student_id, subject, rating) values (v_kid1, 'math', 'great');
  insert into public.readiness_scores (student_id, readiness_type, score) values (v_kid1, 'pathway', 40);
  insert into public.student_focus_skills (student_id, skill_id, source) values (v_kid1, v_skill, 'v0031');

  create temp table v0031_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  -- -------------------------------------------------------------------------
  -- Catalog: grants, policies, functions, defaults, stored data.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('data: advanced or mastered rows missing advanced_at', '0',
     (select count(*)::text from public.student_skill_mastery m
       where m.status in ('advanced', 'mastered') and m.advanced_at is null)),
  ('data: check keeps advanced_at filled', '1',
     (select count(*)::text from pg_constraint c
       where c.conrelid = 'public.student_skill_mastery'::regclass
         and c.conname = 'student_skill_mastery_advanced_has_date')),
  ('anon: privileges on any public table', '0',
     (select count(*)::text
        from pg_class c join pg_namespace n on n.oid = c.relnamespace
       cross join (values ('SELECT'), ('INSERT'), ('UPDATE'), ('DELETE'), ('TRUNCATE'), ('REFERENCES'), ('TRIGGER')) p(priv)
       where n.nspname = 'public' and c.relkind in ('r', 'p', 'v', 'm')
         and has_table_privilege('anon', c.oid, p.priv))),
  ('anon: column privileges on any public table', '0',
     (select count(*)::text
        from pg_attribute a join pg_class c on c.oid = a.attrelid join pg_namespace n on n.oid = c.relnamespace
       cross join (values ('SELECT'), ('INSERT'), ('UPDATE'), ('REFERENCES')) p(priv)
       where n.nspname = 'public' and c.relkind in ('r', 'p', 'v', 'm')
         and a.attnum > 0 and not a.attisdropped
         and has_column_privilege('anon', c.oid, a.attnum, p.priv))),
  ('anon: executable public functions', '0',
     (select count(*)::text
        from pg_proc p join pg_namespace n on n.oid = p.pronamespace
       where n.nspname = 'public' and has_function_privilege('anon', p.oid, 'EXECUTE'))),
  ('PUBLIC: executable public functions', '0',
     (select count(*)::text
        from pg_proc p join pg_namespace n on n.oid = p.pronamespace
       cross join lateral aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
       where n.nspname = 'public' and a.grantee = 0 and a.privilege_type = 'EXECUTE')),
  ('authenticated: TRUNCATE, TRIGGER or REFERENCES on any public table', '0',
     (select count(*)::text
        from pg_class c join pg_namespace n on n.oid = c.relnamespace
       cross join (values ('TRUNCATE'), ('REFERENCES'), ('TRIGGER')) p(priv)
       where n.nspname = 'public' and c.relkind in ('r', 'p')
         and has_table_privilege('authenticated', c.oid, p.priv))),
  ('authenticated: executes exactly the 24 allowed functions', '24/0',
     (select count(*) filter (where p.proname in (
               'owns_student', 'staff_role_for', 'can_view_test_scores', 'staff_can_view_student',
               'staff_can_view_student_scores', 'link_staff_account', 'staff_search_students',
               'staff_student_profile', 'staff_student_sessions', 'set_student_pin', 'clear_student_pin',
               'verify_student_pin', 'set_parent_pin', 'clear_parent_pin', 'verify_parent_pin',
               'prep_start_section', 'prep_remaining_seconds', 'prep_finalize_attempt', 'prep_essay_start',
               'prep_essay_remaining_seconds', 'prep_essay_finalize', 'record_practice_result',
               'seed_placement_mastery', 'raise_working_grade_if_earned'))::text
             || '/' ||
             count(*) filter (where p.proname not in (
               'owns_student', 'staff_role_for', 'can_view_test_scores', 'staff_can_view_student',
               'staff_can_view_student_scores', 'link_staff_account', 'staff_search_students',
               'staff_student_profile', 'staff_student_sessions', 'set_student_pin', 'clear_student_pin',
               'verify_student_pin', 'set_parent_pin', 'clear_parent_pin', 'verify_parent_pin',
               'prep_start_section', 'prep_remaining_seconds', 'prep_finalize_attempt', 'prep_essay_start',
               'prep_essay_remaining_seconds', 'prep_essay_finalize', 'record_practice_result',
               'seed_placement_mastery', 'raise_working_grade_if_earned'))::text
        from pg_proc p join pg_namespace n on n.oid = p.pronamespace
       where n.nspname = 'public' and has_function_privilege('authenticated', p.oid, 'EXECUTE'))),
  ('policies: none still apply to anon or every role', '0',
     (select count(*)::text from pg_policies pp
       where pp.schemaname = 'public'
         and (pp.roles && array['public', 'anon']::name[]))),
  ('policies: every policy has a matching grant to authenticated', '0',
     (select count(*)::text
        from pg_policies pp
       cross join lateral (
         select unnest(case pp.cmd when 'ALL' then array['SELECT', 'INSERT', 'UPDATE', 'DELETE']
                                   else array[pp.cmd] end) as priv
       ) c
       where pp.schemaname = 'public'
         and 'authenticated' = any(pp.roles)
         and not (case when c.priv in ('INSERT', 'UPDATE')
                       then has_any_column_privilege('authenticated', format('public.%I', pp.tablename), c.priv)
                       else has_table_privilege('authenticated', format('public.%I', pp.tablename), c.priv) end))),
  ('grants: browser cannot write a result column', '0',
     (select count(*)::text
        from (values
          ('profiles', 'subscription_status'), ('profiles', 'plan'), ('profiles', 'paid_seats'),
          ('profiles', 'extra_kids'), ('profiles', 'trial_end'), ('profiles', 'current_period_end'),
          ('profiles', 'has_trialed'), ('profiles', 'stripe_customer_id'), ('profiles', 'parent_pin_hash'),
          ('profiles', 'billing_period'), ('profiles', 'trial_reminder_sent_at'),
          ('profiles', 'trial_ended_email_sent_at'), ('profiles', 'admissions_season_email_sent_at'),
          ('students', 'school_covered'), ('students', 'school_id'), ('students', 'dean_student_id'),
          ('students', 'pin_hash'), ('students', 'pin'), ('students', 'working_grade'),
          ('students', 'working_grade_updated_at'), ('students', 'working_grade_reason'),
          ('student_skill_mastery', 'status'), ('student_skill_mastery', 'advanced_at'),
          ('student_skill_mastery', 'evidence_accuracy'), ('student_skill_mastery', 'attempts_counted'),
          ('student_skill_mastery', 'first_bar_met_at'), ('student_skill_mastery', 'recheck_passed_at'),
          ('student_skill_mastery', 'mastery_percentage'),
          ('question_attempts', 'created_at'), ('question_attempts', 'id'),
          ('readiness_scores', 'score'), ('readiness_scores', 'recommendations'),
          ('prep_attempts', 'score'), ('prep_attempts', 'status'), ('prep_attempts', 'submitted_at'),
          ('prep_attempts', 'time_limit_sec'), ('prep_attempts', 'question_ids'),
          ('prep_essay_attempts', 'nikki_feedback'), ('prep_essay_attempts', 'submitted_at'),
          ('sessions', 'transcript'), ('sessions', 'questions_correct'), ('sessions', 'started_at'),
          ('mastery_snapshots', 'payload'), ('prep_entitlements', 'status')
        ) t(tbl, col)
       cross join (values ('INSERT'), ('UPDATE')) p(priv)
       where has_column_privilege('authenticated', format('public.%I', t.tbl), t.col, p.priv))),
  ('storage: no buckets, so no files to read', '0',
     (select count(*)::text from storage.buckets));

  -- Objects created from now on: nothing for anon, no EXECUTE for PUBLIC.
  -- Created inside this block, so the final rollback removes them.
  create table public.v0031_probe_table (x integer);
  create function public.v0031_probe_fn() returns integer language sql as 'select 1';
  insert into v0031_results (name, expected, actual) values
  ('defaults: a new table grants anon nothing', 'false',
     (select (has_table_privilege('anon', 'public.v0031_probe_table', 'SELECT')
           or has_table_privilege('anon', 'public.v0031_probe_table', 'INSERT'))::text)),
  ('defaults: a new table grants authenticated no TRUNCATE', 'false',
     (select has_table_privilege('authenticated', 'public.v0031_probe_table', 'TRUNCATE')::text)),
  ('defaults: a new function is not executable by anon', 'false',
     (select has_function_privilege('anon', 'public.v0031_probe_fn()', 'EXECUTE')::text));

  -- -------------------------------------------------------------------------
  -- anon: no reads, no writes, no functions.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('anon: read students', 'DENIED',
     pg_temp.v0031_as(null, 'select count(*)::text from public.students')),
  ('anon: read profiles', 'DENIED',
     pg_temp.v0031_as(null, 'select count(*)::text from public.profiles')),
  ('anon: read answers', 'DENIED',
     pg_temp.v0031_as(null, 'select count(*)::text from public.question_attempts')),
  ('anon: read mastery', 'DENIED',
     pg_temp.v0031_as(null, 'select count(*)::text from public.student_skill_mastery')),
  ('anon: read sessions', 'DENIED',
     pg_temp.v0031_as(null, 'select count(*)::text from public.sessions')),
  ('anon: read questions', 'DENIED',
     pg_temp.v0031_as(null, 'select count(*)::text from public.generated_questions')),
  ('anon: insert an answer', 'DENIED',
     pg_temp.v0031_as(null, format(
       'with w as (insert into public.question_attempts (student_id, generated_question_id, chosen_choice_index) values (%L, %L, 0) returning 1) select count(*)::text from w',
       v_kid1, v_q))),
  ('anon: add a student', 'DENIED',
     pg_temp.v0031_as(null, format(
       'with w as (insert into public.students (parent_id, first_name, grade) values (%L, ''x'', ''5'') returning 1) select count(*)::text from w',
       v_u_parent))),
  ('anon: record_practice_result', 'DENIED',
     pg_temp.v0031_as(null, format('select public.record_practice_result(%L, %L, ''{}'')::text', v_kid1, v_skill))),
  ('anon: prep_essay_save_feedback', 'DENIED',
     pg_temp.v0031_as(null, format('select public.prep_essay_save_feedback(%L, ''x'')::text', v_essay))),
  ('anon: stored files visible', 'none',
     (select case when r in ('0', 'DENIED') then 'none' else r end
        from pg_temp.v0031_as(null, 'select count(*)::text from storage.objects') r));

  -- -------------------------------------------------------------------------
  -- H1. Parent cannot touch billing or account fields; display_name still saves.
  -- -------------------------------------------------------------------------
  foreach v_col in array array['subscription_status', 'plan', 'paid_seats', 'extra_kids', 'trial_end',
                               'current_period_end', 'has_trialed', 'stripe_customer_id', 'parent_pin_hash',
                               'billing_period', 'trial_reminder_sent_at', 'admissions_season_email_sent_at']
  loop
    insert into v0031_results (name, expected, actual) values
    ('parent: write profiles.' || v_col, 'DENIED',
       pg_temp.v0031_as(v_u_parent, format(
         'with w as (update public.profiles set %I = %s where id = %L returning 1) select count(*)::text from w',
         v_col,
         case v_col
           when 'subscription_status' then '''active'''
           when 'plan' then '''high'''
           when 'paid_seats' then '99'
           when 'extra_kids' then '99'
           when 'has_trialed' then 'false'
           when 'stripe_customer_id' then '''cus_v0031'''
           when 'parent_pin_hash' then '''x'''
           when 'billing_period' then '''annual'''
           else 'now() + interval ''1 year''' end,
         v_u_parent)));
  end loop;
  insert into v0031_results (name, expected, actual) values
  ('parent: update display_name', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.profiles set display_name = ''V0031 Renamed'' where id = %L returning 1) select count(*)::text from w',
       v_u_parent))),
  ('parent: insert a profile', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.profiles (id) values (%L) returning 1) select count(*)::text from w', v_u_parent))),
  ('parent: delete own profile', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (delete from public.profiles where id = %L returning 1) select count(*)::text from w', v_u_parent)));
  insert into v0031_results (name, expected, actual) values
  ('parent: billing fields unchanged afterwards', 'free_trial/null/null',
     (select p.subscription_status || '/' || coalesce(p.plan, 'null') || '/' || coalesce(p.paid_seats::text, 'null')
        from public.profiles p where p.id = v_u_parent)),
  ('parent: display_name saved', 'V0031 Renamed',
     (select p.display_name from public.profiles p where p.id = v_u_parent));

  -- -------------------------------------------------------------------------
  -- H2. Answers: the server grades them, whatever the browser claims.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('student: wrong option sent as correct is accepted', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.question_attempts (student_id, generated_question_id, chosen_choice_index, time_ms, is_diagnostic, is_correct, skill_id, sat_alignment, chosen_misconception_token)
                   values (%L, %L, 1, 999999999, false, true, %L, ''forged'', ''v0031-forged'') returning 1) select count(*)::text from w',
       v_kid1, v_q, v_skill2))),
  ('student: right option with no result fields is accepted', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.question_attempts (student_id, generated_question_id, chosen_choice_index, time_ms) values (%L, %L, 0, 15000) returning 1) select count(*)::text from w',
       v_kid1, v_q))),
  ('student: backdate created_at', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.question_attempts (student_id, generated_question_id, chosen_choice_index, created_at) values (%L, %L, 0, now() - interval ''10 days'') returning 1) select count(*)::text from w',
       v_kid1, v_q))),
  ('student: answer without a question', 'REFUSED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.question_attempts (student_id, skill_id, is_correct) values (%L, %L, true) returning 1) select count(*)::text from w',
       v_kid1, v_skill))),
  ('student: answer for another family''s child', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.question_attempts (student_id, generated_question_id, chosen_choice_index) values (%L, %L, 0) returning 1) select count(*)::text from w',
       v_okid, v_q))),
  ('student: update an answer', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.question_attempts set is_correct = true where student_id = %L returning 1) select count(*)::text from w',
       v_kid1))),
  ('student: delete an answer', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (delete from public.question_attempts where student_id = %L returning 1) select count(*)::text from w',
       v_kid1)));
  insert into v0031_results (name, expected, actual) values
  ('stored: forged answer graded wrong, real skill, real token, time capped', 'false/math-skill/v0031-domain/v0031-off-by-one/3600000',
     (select qa.is_correct::text || '/' || case when qa.skill_id = v_skill then 'math-skill' else qa.skill_id::text end
             || '/' || coalesce(qa.sat_alignment, 'null') || '/' || coalesce(qa.chosen_misconception_token, 'null')
             || '/' || coalesce(qa.time_ms::text, 'null')
        from public.question_attempts qa
       where qa.student_id = v_kid1 and qa.chosen_choice_index = 1)),
  ('stored: right answer graded right', 'true',
     (select string_agg(qa.is_correct::text, ',') from public.question_attempts qa
       where qa.student_id = v_kid1 and qa.chosen_choice_index = 0)),
  ('stored: answers carry the server clock', '0',
     (select count(*)::text from public.question_attempts qa
       where qa.student_id = v_kid1 and qa.created_at < now() - interval '1 minute'));

  -- -------------------------------------------------------------------------
  -- H3. Mastery: no browser writes. The server functions use server grades.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('student: insert a mastered skill', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.student_skill_mastery (student_id, skill_id, status, advanced_at) values (%L, %L, ''mastered'', now()) returning 1) select count(*)::text from w',
       v_kid1, v_skill2))),
  ('student: delete mastery', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (delete from public.student_skill_mastery where student_id = %L returning 1) select count(*)::text from w', v_kid1)));
  foreach v_col in array array['status', 'advanced_at', 'recheck_passed_at', 'first_bar_met_at',
                               'evidence_accuracy', 'attempts_counted', 'mastery_percentage']
  loop
    insert into v0031_results (name, expected, actual) values
    ('student: write mastery.' || v_col, 'DENIED',
       pg_temp.v0031_as(v_u_parent, format(
         'with w as (update public.student_skill_mastery set %I = %s where student_id = %L returning 1) select count(*)::text from w',
         v_col,
         case v_col when 'status' then '''mastered'''
                    when 'evidence_accuracy' then '100'
                    when 'attempts_counted' then '50'
                    when 'mastery_percentage' then '100'
                    else 'now() - interval ''30 days''' end,
         v_kid1)));
  end loop;

  select array_agg(qa.id) into v_ids from public.question_attempts qa
   where qa.student_id = v_kid1 and qa.is_diagnostic = false;
  insert into v0031_results (name, expected, actual) values
  -- The engine already made this skill's row (accuracy 0, attempts 0), so the
  -- ramp blends from it exactly as the browser did: 0 * 0.6 + 50 * 0.4 = 20.
  ('student: practice result comes from server grades (1 right of 2)', '1/20/5',
     pg_temp.v0031_as(v_u_parent, format(
       'select r->>''attempts'' || ''/'' || (r->>''accuracy'')::numeric::int || ''/'' || (r->>''mastery_percentage'')::numeric::int
          from (select public.record_practice_result(%L, %L, %L::uuid[]) r) s', v_kid1, v_skill, v_ids))),
  ('student: practice result ignores another family''s answers', 'null',
     pg_temp.v0031_as(v_u_parent, format(
       'select public.record_practice_result(%L, %L, %L::uuid[])::text', v_kid1, v_skill, array[v_oatt]))),
  ('student: practice result for another family''s child', 'REFUSED',
     pg_temp.v0031_as(v_u_parent, format(
       'select public.record_practice_result(%L, %L, %L::uuid[])::text', v_okid, v_skill, array[v_oatt])));

  -- Placement: a wrong placement answer on a skill with no practice seeds 25;
  -- the practice skill is left alone.
  insert into v0031_results (name, expected, actual) values
  ('student: placement answer recorded', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.question_attempts (student_id, generated_question_id, chosen_choice_index, is_diagnostic, is_correct) values (%L, %L, 1, true, true) returning 1) select count(*)::text from w',
       v_kid1, v_q2)));
  insert into v0031_results (name, expected, actual) values
  ('student: placement seeds only the unpracticed skill', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'select public.seed_placement_mastery(%L, %L::uuid[])::text', v_kid1, array[v_skill, v_skill2]))),
  ('student: placement for another family''s child', 'REFUSED',
     pg_temp.v0031_as(v_u_parent, format(
       'select public.seed_placement_mastery(%L, %L::uuid[])::text', v_okid, array[v_skill2])));
  insert into v0031_results (name, expected, actual) values
  ('stored: placement seed used the server grade (wrong = 25)', '25/0/not_started',
     (select m.mastery_percentage::int::text || '/' || m.accuracy::int::text || '/' || m.status
        from public.student_skill_mastery m where m.student_id = v_kid1 and m.skill_id = v_skill2)),
  ('stored: practice skill status still from the engine', 'practicing/50',
     (select m.status || '/' || m.evidence_accuracy::int::text
        from public.student_skill_mastery m where m.student_id = v_kid1 and m.skill_id = v_skill));

  -- -------------------------------------------------------------------------
  -- H4 and M8. Server-only functions.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('student: write essay feedback', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format('select public.prep_essay_save_feedback(%L, ''great essay'')::text', v_essay))),
  ('student: score a timed section mid-test', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format('select public.prep_compute_score(%L)::text', v_prep))),
  ('student: run the mastery engine', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'select count(*)::text from (select public.recompute_skill_mastery(%L, %L)) s', v_kid1, v_skill)));
  insert into v0031_results (name, expected, actual) values
  ('stored: essay feedback still empty', 'null',
     (select coalesce(e.nikki_feedback, 'null') from public.prep_essay_attempts e where e.id = v_essay));

  -- -------------------------------------------------------------------------
  -- M1. Readiness: browsers read it, never write it.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('student: insert readiness', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.readiness_scores (student_id, readiness_type, score) values (%L, ''sat'', 99) returning 1) select count(*)::text from w', v_kid1))),
  ('student: raise readiness score', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.readiness_scores set score = 99 where student_id = %L returning 1) select count(*)::text from w', v_kid1))),
  ('student: read own readiness', '1',
     pg_temp.v0031_as(v_u_parent, format('select count(*)::text from public.readiness_scores where student_id = %L', v_kid1)));

  -- -------------------------------------------------------------------------
  -- M2. Working grade: only earned, never written from the browser.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('student: write working_grade', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.students set working_grade = 12 where id = %L returning 1) select count(*)::text from w', v_kid1))),
  ('student: write working_grade_reason', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.students set working_grade_reason = ''x'' where id = %L returning 1) select count(*)::text from w', v_kid1))),
  ('student: promotion before the strand is cleared', 'null',
     pg_temp.v0031_as(v_u_parent, format('select public.raise_working_grade_if_earned(%L)::text', v_kid1))),
  ('student: promotion for another family''s child', 'REFUSED',
     pg_temp.v0031_as(v_u_parent, format('select public.raise_working_grade_if_earned(%L)::text', v_okid)));

  insert into public.student_skill_mastery (student_id, skill_id, status, evidence_accuracy, attempts_counted, advanced_at)
  values (v_kid1, v_strand1, 'advanced', 90, 6, now()),
         (v_kid1, v_strand2, 'mastered', 95, 9, now());
  insert into v0031_results (name, expected, actual) values
  ('student: promotion once every grade-5 skill in a strand is cleared', '5->6',
     pg_temp.v0031_as(v_u_parent, format(
       'select (r->>''from'') || ''->'' || (r->>''to'') from (select public.raise_working_grade_if_earned(%L) r) s', v_kid1)));
  insert into v0031_results (name, expected, actual) values
  ('stored: working grade raised with its reason', '6/cleared every grade 5 v0031strand skill',
     (select s.working_grade::text || '/' || s.working_grade_reason from public.students s where s.id = v_kid1));

  -- -------------------------------------------------------------------------
  -- M3. Seat cap. Free trial = 2 seats; kid1 and kid2 are on, kid3 paused.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('parent: turn on a third child on a 2-seat trial', 'REFUSED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.students set active = true where id = %L returning 1) select count(*)::text from w', v_kid3))),
  ('parent: add a third active child on a 2-seat trial', 'REFUSED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.students (parent_id, first_name, grade) values (%L, ''Vfour'', ''5'') returning 1) select count(*)::text from w', v_u_parent)));
  insert into v0031_results (name, expected, actual) values
  ('parent: pause a child', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.students set active = false where id = %L returning 1) select count(*)::text from w', v_kid2)));
  insert into v0031_results (name, expected, actual) values
  ('parent: turn the paused child on once a seat is free', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.students set active = true where id = %L returning 1) select count(*)::text from w', v_kid3)));
  insert into v0031_results (name, expected, actual) values
  ('paid parent: add a third child on 3 paid seats', '1',
     pg_temp.v0031_as(v_u_paid, format(
       'with w as (insert into public.students (parent_id, first_name, grade) values (%L, ''Vpaidthree'', ''9'') returning 1) select count(*)::text from w', v_u_paid)));
  insert into v0031_results (name, expected, actual) values
  ('paid parent: add a fourth child on 3 paid seats', 'REFUSED',
     pg_temp.v0031_as(v_u_paid, format(
       'with w as (insert into public.students (parent_id, first_name, grade) values (%L, ''Vpaidfour'', ''9'') returning 1) select count(*)::text from w', v_u_paid)));

  -- -------------------------------------------------------------------------
  -- M7 and L7. School-covered student: the school owns these fields.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('covered student: change grade', 'REFUSED',
     pg_temp.v0031_as(v_u_cov, format(
       'with w as (update public.students set grade = ''12'' where id = %L returning 1) select count(*)::text from w', v_cov))),
  ('covered student: change first_name', 'REFUSED',
     pg_temp.v0031_as(v_u_cov, format(
       'with w as (update public.students set first_name = ''Other'' where id = %L returning 1) select count(*)::text from w', v_cov))),
  ('covered student: change level', 'REFUSED',
     pg_temp.v0031_as(v_u_cov, format(
       'with w as (update public.students set level = ''advanced'' where id = %L returning 1) select count(*)::text from w', v_cov))),
  ('covered student: consent to SAT framing', 'REFUSED',
     pg_temp.v0031_as(v_u_cov, format(
       'with w as (update public.students set above_grade_ok = true where id = %L returning 1) select count(*)::text from w', v_cov))),
  ('covered student: change school fields', 'DENIED',
     pg_temp.v0031_as(v_u_cov, format(
       'with w as (update public.students set school_covered = false, school_id = null where id = %L returning 1) select count(*)::text from w', v_cov))),
  ('covered student: delete own row', 'REFUSED',
     pg_temp.v0031_as(v_u_cov, format(
       'with w as (delete from public.students where id = %L returning 1) select count(*)::text from w', v_cov))),
  ('covered student: save unchanged details with a new avatar', '1',
     pg_temp.v0031_as(v_u_cov, format(
       'with w as (update public.students set first_name = ''Vcovered'', grade = ''10'', level = ''on'', avatar_mode = ''orb'' where id = %L returning 1) select count(*)::text from w', v_cov))),
  ('covered student: answers are graded by the server too', '1',
     pg_temp.v0031_as(v_u_cov, format(
       'with w as (insert into public.question_attempts (student_id, generated_question_id, chosen_choice_index, is_correct) values (%L, %L, 1, true) returning 1) select count(*)::text from w',
       v_cov, v_q)));
  insert into v0031_results (name, expected, actual) values
  ('stored: covered row unchanged except the avatar', 'Vcovered/10/on/false/orb/true',
     (select s.first_name || '/' || s.grade || '/' || s.level || '/' || s.above_grade_ok::text || '/' || s.avatar_mode || '/' || s.school_covered::text
        from public.students s where s.id = v_cov)),
  ('stored: covered student''s forged answer graded wrong', 'false',
     (select string_agg(qa.is_correct::text, ',') from public.question_attempts qa
       where qa.student_id = v_cov and qa.chosen_choice_index = 1));

  -- -------------------------------------------------------------------------
  -- Timed prep and M4 deletes.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('student: start a section by direct insert', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.prep_attempts (student_id, module_id, section_id, mode, status) values (%L, ''v0031'', ''math'', ''timed_section'', ''in_progress'') returning 1) select count(*)::text from w', v_kid1))),
  ('student: start a section through the RPC', 'in_progress',
     pg_temp.v0031_as(v_u_parent, format(
       'select public.prep_start_section(%L, ''v0031'', ''math'', 600, ''[]''::jsonb)->>''status''', v_kid1))),
  ('student: save answers mid-test', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.prep_attempts set answers = ''{"a":1}'' where id = %L returning 1) select count(*)::text from w', v_prep))),
  ('student: write a section score', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.prep_attempts set score = 1 where id = %L returning 1) select count(*)::text from w', v_prep))),
  ('student: mark a section submitted', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.prep_attempts set status = ''submitted'' where id = %L returning 1) select count(*)::text from w', v_prep))),
  ('student: delete a section result', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (delete from public.prep_attempts where id = %L returning 1) select count(*)::text from w', v_prep))),
  ('student: save an essay draft', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.prep_essay_attempts set essay_text = ''draft'' where id = %L returning 1) select count(*)::text from w', v_essay))),
  ('student: write essay feedback directly', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.prep_essay_attempts set nikki_feedback = ''x'' where id = %L returning 1) select count(*)::text from w', v_essay))),
  ('student: start an essay by direct insert', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.prep_essay_attempts (student_id, prompt_id) values (%L, ''x'') returning 1) select count(*)::text from w', v_kid1))),
  ('student: delete an essay', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (delete from public.prep_essay_attempts where id = %L returning 1) select count(*)::text from w', v_essay))),
  ('student: delete a session', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (delete from public.sessions where student_id = %L returning 1) select count(*)::text from w', v_kid1))),
  ('student: delete feedback', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (delete from public.feedback where student_id = %L returning 1) select count(*)::text from w', v_kid1))),
  ('parent: delete consent', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (delete from public.consents where parent_id = %L returning 1) select count(*)::text from w', v_u_parent)));

  -- -------------------------------------------------------------------------
  -- L3. Inputs only, server clock.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('student: save transcript with backdated times', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.sessions (student_id, subject, messages, updated_at, ended_at)
                   values (%L, ''math'', ''[]'', ''2000-01-01'', ''2000-01-01'')
                   on conflict (student_id, subject) do update
                     set student_id = excluded.student_id, subject = excluded.subject, messages = excluded.messages,
                         updated_at = excluded.updated_at, ended_at = excluded.ended_at
                   returning 1) select count(*)::text from w', v_kid1))),
  ('student: save session summary', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.sessions set skills_practiced = ''["fractions"]'', mastery_updates = ''[]'' where student_id = %L and subject = ''math'' returning 1) select count(*)::text from w', v_kid1))),
  ('student: write session question totals', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.sessions set questions_correct = 99 where student_id = %L returning 1) select count(*)::text from w', v_kid1))),
  ('parent: record consent with a backdated time', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.consents (parent_id, parent_name, method, consent_version, consented_at) values (%L, ''V0031 Parent'', ''web_checkbox'', ''1.0'', ''2000-01-01'') returning 1) select count(*)::text from w', v_u_parent))),
  ('parent: edit a consent', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.consents set parent_name = ''x'' where parent_id = %L returning 1) select count(*)::text from w', v_u_parent))),
  ('student: leave feedback', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.feedback (student_id, subject, rating, note) values (%L, ''math'', ''ok'', null) returning 1) select count(*)::text from w', v_kid1))),
  ('student: backdate feedback', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (insert into public.feedback (student_id, subject, rating, created_at) values (%L, ''math'', ''ok'', ''2000-01-01'') returning 1) select count(*)::text from w', v_kid1))),
  ('student: edit feedback', 'DENIED',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.feedback set rating = ''x'' where student_id = %L returning 1) select count(*)::text from w', v_kid1))),
  ('student: resolve a focus skill with a backdated time', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (update public.student_focus_skills set resolved_at = ''2000-01-01'' where student_id = %L returning 1) select count(*)::text from w', v_kid1)));
  insert into v0031_results (name, expected, actual) values
  ('stored: session times are the server clock', 'server',
     (select case when se.updated_at > now() - interval '1 minute' and se.ended_at > now() - interval '1 minute'
                  then 'server' else se.updated_at::text || ' ' || coalesce(se.ended_at::text, 'null') end
        from public.sessions se where se.student_id = v_kid1 and se.subject = 'math')),
  ('stored: consent time is the server clock', '0',
     (select count(*)::text from public.consents c
       where c.parent_id = v_u_parent and c.consented_at < now() - interval '1 minute')),
  ('stored: focus resolved time is the server clock', '0',
     (select count(*)::text from public.student_focus_skills f
       where f.student_id = v_kid1 and f.resolved_at < now() - interval '1 minute'));

  -- -------------------------------------------------------------------------
  -- Cross-family reads: the other parent sees none of this family's data.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('other parent: reads of the first family', '0/0/0/0/0/0/0/0/0/0/0/0',
     pg_temp.v0031_as(v_u_other, format(
       'select concat_ws(''/'',
          (select count(*) from public.students where parent_id = %1$L),
          (select count(*) from public.profiles where id = %1$L),
          (select count(*) from public.question_attempts where student_id = %2$L),
          (select count(*) from public.student_skill_mastery where student_id = %2$L),
          (select count(*) from public.readiness_scores where student_id = %2$L),
          (select count(*) from public.sessions where student_id = %2$L),
          (select count(*) from public.prep_attempts where student_id = %2$L),
          (select count(*) from public.prep_essay_attempts where student_id = %2$L),
          (select count(*) from public.feedback where student_id = %2$L),
          (select count(*) from public.student_focus_skills where student_id = %2$L),
          (select count(*) from public.consents where parent_id = %1$L),
          (select count(*) from public.mastery_snapshots where student_id = %2$L))', v_u_parent, v_kid1))),
  ('other parent: PIN check on the first family''s child', 'false',
     pg_temp.v0031_as(v_u_other, format('select public.verify_student_pin(%L, ''0000'')::text', v_kid1))),
  ('other parent: rename the first family''s child', '0',
     pg_temp.v0031_as(v_u_other, format(
       'with w as (update public.students set first_name = ''x'' where id = %L returning 1) select count(*)::text from w', v_kid1))),
  ('other parent: remaining time on the first family''s section', 'null',
     pg_temp.v0031_as(v_u_other, format('select public.prep_remaining_seconds(%L)::text', v_prep))),
  ('other parent: stored files visible', 'none',
     (select case when r in ('0', 'DENIED') then 'none' else r end
        from pg_temp.v0031_as(v_u_other, 'select count(*)::text from storage.objects') r));

  -- -------------------------------------------------------------------------
  -- Nothing broke: the first family and staff still read what they need.
  -- -------------------------------------------------------------------------
  insert into v0031_results (name, expected, actual) values
  ('parent: own data still readable', '3/1/4/1',
     pg_temp.v0031_as(v_u_parent, format(
       'select concat_ws(''/'',
          (select count(*) from public.question_attempts where student_id = %1$L),
          (select count(*) from public.sessions where student_id = %1$L),
          (select count(*) from public.student_skill_mastery where student_id = %1$L),
          (select count(*) from public.profiles where id = %2$L))', v_kid1, v_u_parent))),
  ('parent: billing view fields still readable', 'free_trial',
     pg_temp.v0031_as(v_u_parent, format('select subscription_status from public.profiles where id = %L', v_u_parent))),
  ('teacher: covered student still in search', '1',
     pg_temp.v0031_as(v_u_teacher, format(
       'select count(*)::text from public.staff_search_students('''') where student_id = %L', v_cov))),
  ('teacher: covered student''s answers still readable', '2',
     pg_temp.v0031_as(v_u_teacher, format(
       'select count(*)::text from public.question_attempts where student_id = %L', v_cov))),
  ('teacher: covered student''s mastery still readable', '1',
     pg_temp.v0031_as(v_u_teacher, format(
       'select count(*)::text from public.student_skill_mastery where student_id = %L', v_cov))),
  ('teacher: profile header still loads', 'Vcovered/10',
     pg_temp.v0031_as(v_u_teacher, format(
       'select first_name || ''/'' || grade from public.staff_student_profile(%L)', v_cov))),
  ('parent: remove own child', '1',
     pg_temp.v0031_as(v_u_parent, format(
       'with w as (delete from public.students where id = %L returning 1) select count(*)::text from w', v_kid2)));

  -- -------------------------------------------------------------------------
  -- Report, then roll everything back.
  -- -------------------------------------------------------------------------
  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0031_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0031 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0031 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
