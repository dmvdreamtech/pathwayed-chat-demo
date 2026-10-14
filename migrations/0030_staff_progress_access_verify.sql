-- ===========================================================================
-- 0030_staff_progress_access_verify.sql
--
-- Checks for migration 0030. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0030 has committed, and run it once.
--
-- It is ONE statement (a DO block). It builds throwaway fixtures (auth users,
-- staff rows in Pallotti AND in a temporary second school, a covered student
-- in each school, sessions holding a marker string, graded and placement
-- answers, a scored prep section, a readiness score), then signs in as each
-- role in turn and runs every probe as that role, exactly as PostgREST would.
--
-- IT ALWAYS ENDS WITH AN ERROR, ON PURPOSE. The final RAISE carries the report
-- and rolls the whole block back, so no fixture survives. Read the message:
--
--     VERIFY 0030 PASSED: 65 of 65 checks
--     VERIFY 0030 FAILED: 2 of 65 checks failed
--
-- followed by one line per check: PASS or FAIL, the check name, expected, and
-- actual. Any OTHER error text means the verify itself could not run (most
-- likely 0030 has not been applied); nothing was written in that case either.
--
-- Roles are switched with SET LOCAL ROLE plus the request.jwt.claims setting
-- that auth.uid() reads, so row security applies exactly as for a real user.
-- A probe that hits "permission denied" reports DENIED rather than aborting.
-- ===========================================================================

do $verify$
declare
  c_pallotti   constant uuid := 'addc2fb2-8b81-4d11-90ec-cf358c56be07';
  v_other      uuid := gen_random_uuid();   -- the temporary second school

  -- auth users
  v_u_teacher   uuid := gen_random_uuid();  -- Pallotti teacher, linked
  v_u_guidance  uuid := gen_random_uuid();  -- Pallotti guidance, linked
  v_u_inactive  uuid := gen_random_uuid();  -- Pallotti teacher, active = false
  v_u_other     uuid := gen_random_uuid();  -- second-school teacher
  v_u_link      uuid := gen_random_uuid();  -- staff row unlinked, email confirmed
  v_u_unconf    uuid := gen_random_uuid();  -- staff row unlinked, email NOT confirmed
  v_u_stu_a     uuid := gen_random_uuid();  -- Pallotti student's own account
  v_u_stu_b     uuid := gen_random_uuid();  -- second-school student's account
  v_u_stu_c     uuid := gen_random_uuid();  -- not covered, school_id forged to Pallotti

  v_stu_a  uuid;
  v_stu_b  uuid;
  v_stu_c  uuid;
  v_skill  uuid;
  v_prep_a uuid;
  v_prep_b uuid;
  v_i      integer;
  v_t      text;

  c_secret constant text := 'V0030-CHAT-SECRET';
  v_report text := '';
  v_total  integer := 0;
  v_failed integer := 0;
begin
  -- -------------------------------------------------------------------------
  -- Probe runner: run one query as a given user (null = anon) and return its
  -- single value as text, or DENIED if the role lacks the privilege.
  -- -------------------------------------------------------------------------
  execute $fn$
    create function pg_temp.v0030_as(p_uid uuid, p_sql text)
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
      exception when insufficient_privilege then
        v_out := 'DENIED';
      end;
      execute 'reset role';
      perform set_config('request.jwt.claims', '', true);
      perform set_config('request.jwt.claim.sub', '', true);
      return coalesce(v_out, 'null');
    end;
    $body$
  $fn$;

  -- -------------------------------------------------------------------------
  -- Fixtures (as the SQL editor's role, so row security does not apply here).
  -- -------------------------------------------------------------------------
  insert into auth.users (id, instance_id, aud, role, email, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values
    (v_u_teacher,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0030-teacher@verify0030.test',  now(), '{}', '{}', now(), now()),
    (v_u_guidance, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0030-guidance@verify0030.test', now(), '{}', '{}', now(), now()),
    (v_u_inactive, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0030-inactive@verify0030.test', now(), '{}', '{}', now(), now()),
    (v_u_other,    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0030-other@verify0030.test',    now(), '{}', '{}', now(), now()),
    -- mixed case on purpose: linking must match the lowercase staff email
    (v_u_link,     '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'V0030-Link@Verify0030.test',     now(), '{}', '{}', now(), now()),
    (v_u_unconf,   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0030-unconf@verify0030.test',   null,  '{}', '{}', now(), now()),
    (v_u_stu_a,    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0030-stu-a@verify0030.test',    now(), '{}', '{}', now(), now()),
    (v_u_stu_b,    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0030-stu-b@verify0030.test',    now(), '{}', '{}', now(), now()),
    (v_u_stu_c,    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0030-stu-c@verify0030.test',    now(), '{}', '{}', now(), now());

  -- handle_new_user created the profiles rows. Give student A's profile the
  -- secrets staff must never reach.
  update public.profiles
     set parent_pin_hash = 'V0030-PIN-HASH', stripe_customer_id = 'cus_V0030'
   where id = v_u_stu_a;

  insert into public.school_staff (school_id, email, user_id, role, active) values
    (c_pallotti, 'v0030-teacher@verify0030.test',  v_u_teacher,  'teacher',  true),
    (c_pallotti, 'v0030-guidance@verify0030.test', v_u_guidance, 'guidance', true),
    (c_pallotti, 'v0030-inactive@verify0030.test', v_u_inactive, 'teacher',  false),
    (v_other,    'v0030-other@verify0030.test',    v_u_other,    'teacher',  true),
    (c_pallotti, 'v0030-link@verify0030.test',     null,         'teacher',  true),
    (c_pallotti, 'v0030-unconf@verify0030.test',   null,         'teacher',  true);

  insert into public.students (parent_id, first_name, grade, level, school_covered,
                               dean_student_id, school_id, pin_hash)
  values (v_u_stu_a, 'Vzeroalpha', '9', 'on', true, 'v0030-dean-a', c_pallotti, 'V0030-STUDENT-PIN-HASH')
  returning id into v_stu_a;
  insert into public.students (parent_id, first_name, grade, level, school_covered,
                               dean_student_id, school_id)
  values (v_u_stu_b, 'Vzerobravo', '9', 'on', true, 'v0030-dean-b', v_other)
  returning id into v_stu_b;
  insert into public.students (parent_id, first_name, grade, level, school_covered, school_id)
  values (v_u_stu_c, 'Vzerocharlie', '9', 'on', false, c_pallotti)
  returning id into v_stu_c;

  insert into public.sessions (student_id, subject, transcript, messages) values
    (v_stu_a, 'math', jsonb_build_array(jsonb_build_object('role', 'user', 'content', c_secret)),
                      jsonb_build_array(jsonb_build_object('role', 'user', 'content', c_secret))),
    (v_stu_b, 'math', jsonb_build_array(jsonb_build_object('role', 'user', 'content', c_secret)),
                      jsonb_build_array(jsonb_build_object('role', 'user', 'content', c_secret)));

  select sk.id into v_skill
    from public.skills sk
   where sk.subject = 'math' and sk.level::text = 'skill'
   order by sk.id
   limit 1;

  -- Five right graded answers each (the engine trigger marks the skill
  -- advanced and stamps advanced_at), plus one placement answer each.
  for v_i in 1..5 loop
    insert into public.question_attempts (student_id, skill_id, is_correct, time_ms, is_diagnostic)
    values (v_stu_a, v_skill, true, 20000, false),
           (v_stu_b, v_skill, true, 20000, false);
  end loop;
  insert into public.question_attempts (student_id, skill_id, is_correct, time_ms, is_diagnostic)
  values (v_stu_a, v_skill, true, 20000, true),
         (v_stu_b, v_skill, true, 20000, true);

  -- A scored prep section each. The guard only allows a new attempt in
  -- progress and only finalizes under app.prep_finalize, as the real path does.
  insert into public.prep_attempts (student_id, module_id, section_id, mode, status, time_limit_sec)
  values (v_stu_a, 'hspt', 'reading', 'timed_section', 'in_progress', 1500)
  returning id into v_prep_a;
  insert into public.prep_attempts (student_id, module_id, section_id, mode, status, time_limit_sec)
  values (v_stu_b, 'hspt', 'reading', 'timed_section', 'in_progress', 1500)
  returning id into v_prep_b;
  perform set_config('app.prep_finalize', '1', true);
  update public.prep_attempts set status = 'submitted', score = 50, submitted_at = now()
   where id in (v_prep_a, v_prep_b);
  perform set_config('app.prep_finalize', '', true);

  insert into public.readiness_scores (student_id, readiness_type, score) values
    (v_stu_a, 'sat', 40),
    (v_stu_b, 'sat', 40);

  create temp table v0030_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  -- -------------------------------------------------------------------------
  -- Catalog: objects, row security, grants.
  -- -------------------------------------------------------------------------
  insert into v0030_results (name, expected, actual) values
  ('catalog: school_staff has row security on', 'true',
     (select c.relrowsecurity::text from pg_class c where c.oid = 'public.school_staff'::regclass)),
  ('catalog: students.school_id exists', '1',
     (select count(*)::text from information_schema.columns
       where table_schema = 'public' and table_name = 'students' and column_name = 'school_id')),
  ('catalog: student_skill_mastery.advanced_at exists', '1',
     (select count(*)::text from information_schema.columns
       where table_schema = 'public' and table_name = 'student_skill_mastery' and column_name = 'advanced_at')),
  ('catalog: mastery engine writes advanced_at', 'true',
     (select (pg_get_functiondef('public.recompute_skill_mastery(uuid,uuid)'::regprocedure) like '%advanced_at%')::text)),
  ('grants: anon has no privilege on school_staff', '0',
     (select count(*)::text
        from (values ('SELECT'), ('INSERT'), ('UPDATE'), ('DELETE'), ('TRUNCATE'), ('REFERENCES'), ('TRIGGER')) p(priv)
       where has_table_privilege('anon', 'public.school_staff', p.priv))),
  ('grants: authenticated may only SELECT school_staff', 'SELECT',
     (select coalesce(string_agg(p.priv, ',' order by p.priv), 'none')
        from (values ('SELECT'), ('INSERT'), ('UPDATE'), ('DELETE'), ('TRUNCATE')) p(priv)
       where has_table_privilege('authenticated', 'public.school_staff', p.priv))),
  ('grants: anon cannot execute any 0030 function', '0',
     (select count(*)::text
        from (values ('public.staff_role_for(uuid)'), ('public.can_view_test_scores(uuid)'),
                     ('public.staff_can_view_student(uuid)'), ('public.staff_can_view_student_scores(uuid)'),
                     ('public.link_staff_account()'), ('public.staff_search_students(text)'),
                     ('public.staff_student_profile(uuid)'), ('public.staff_student_sessions(uuid)')) f(sig)
       where has_function_privilege('anon', f.sig, 'EXECUTE'))),
  ('grants: authenticated can execute all 8 0030 functions', '8',
     (select count(*)::text
        from (values ('public.staff_role_for(uuid)'), ('public.can_view_test_scores(uuid)'),
                     ('public.staff_can_view_student(uuid)'), ('public.staff_can_view_student_scores(uuid)'),
                     ('public.link_staff_account()'), ('public.staff_search_students(text)'),
                     ('public.staff_student_profile(uuid)'), ('public.staff_student_sessions(uuid)')) f(sig)
       where has_function_privilege('authenticated', f.sig, 'EXECUTE'))),
  ('grants: clients cannot write students.school_id', '0',
     (select count(*)::text
        from (values ('anon'), ('authenticated')) r(role_name)
       cross join (values ('INSERT'), ('UPDATE')) p(priv)
       where has_column_privilege(r.role_name, 'public.students', 'school_id', p.priv))),
  ('grants: clients cannot read or write school_domains', '0',
     (select count(*)::text
        from (values ('anon'), ('authenticated')) r(role_name)
       cross join (values ('SELECT'), ('INSERT'), ('UPDATE'), ('DELETE')) p(priv)
       where has_table_privilege(r.role_name, 'public.school_domains', p.priv))),
  ('backfill: school_domains pallottihs.info carries Pallotti', c_pallotti::text,
     (select coalesce(d.school_id::text, 'null') from public.school_domains d where d.domain = 'pallottihs.info')),
  ('backfill: covered pallottihs.info students missing school_id', '0',
     (select count(*)::text
        from public.students s join auth.users u on u.id = s.parent_id
       where s.school_covered
         and lower(split_part(u.email, '@', 2)) = 'pallottihs.info'
         and s.school_id is distinct from c_pallotti)),
  ('backfill: dmvdream.org test account school_id left null', '0',
     (select count(*)::text
        from public.students s join auth.users u on u.id = s.parent_id
       where lower(btrim(u.email)) = 'phillip.tomlin@dmvdream.org'
         and s.school_id is not null)),
  ('backfill: advanced skills missing advanced_at', '0',
     (select count(*)::text from public.student_skill_mastery m
       where m.status = 'advanced' and m.advanced_at is null)),
  ('engine: a new advanced skill gets advanced_at', 'advanced/stamped',
     (select m.status || '/' || case when m.advanced_at is null then 'null' else 'stamped' end
        from public.student_skill_mastery m
       where m.student_id = v_stu_a and m.skill_id = v_skill)),
  -- "Any path": no client-executable function in public returns a chat or
  -- secret column, or a whole sessions/profiles/students row.
  ('paths: no client function returns chat or secret columns', '0',
     (select count(*)::text
        from pg_proc p join pg_namespace ns on ns.oid = p.pronamespace
       where ns.nspname = 'public'
         and has_function_privilege('authenticated', p.oid, 'EXECUTE')
         and (pg_get_function_result(p.oid) ~* '(transcript|messages|parent_pin_hash|stripe_customer_id|pin_hash|\mpin\M)'
              or p.prorettype in ('public.sessions'::regtype, 'public.profiles'::regtype, 'public.students'::regtype)))),
  ('paths: no view exposes chat or secret columns', '0',
     (select count(*)::text from information_schema.view_column_usage v
       where v.table_schema = 'public'
         and ((v.table_name = 'sessions' and v.column_name in ('transcript', 'messages'))
           or (v.table_name = 'profiles' and v.column_name in ('parent_pin_hash', 'stripe_customer_id'))
           or (v.table_name = 'students' and v.column_name in ('pin', 'pin_hash'))))),
  ('paths: no staff policy on sessions, profiles or students', '0',
     (select count(*)::text from pg_policies pp
       where pp.schemaname = 'public'
         and pp.tablename in ('sessions', 'profiles', 'students')
         and (pp.qual ilike '%staff%' or coalesce(pp.with_check, '') ilike '%staff%')));

  -- -------------------------------------------------------------------------
  -- anon
  -- -------------------------------------------------------------------------
  insert into v0030_results (name, expected, actual) values
  ('anon: read school_staff', 'DENIED',
     pg_temp.v0030_as(null, 'select count(*)::text from public.school_staff')),
  ('anon: staff_search_students', 'DENIED',
     pg_temp.v0030_as(null, 'select count(*)::text from public.staff_search_students('''')')),
  ('anon: link_staff_account', 'DENIED',
     pg_temp.v0030_as(null, 'select public.link_staff_account()::text'));

  -- -------------------------------------------------------------------------
  -- Pallotti teacher: sees progress, not scores, not chat, not the other school.
  -- -------------------------------------------------------------------------
  insert into v0030_results (name, expected, actual) values
  ('teacher: role at Pallotti', 'teacher',
     pg_temp.v0030_as(v_u_teacher, format('select public.staff_role_for(%L)', c_pallotti))),
  ('teacher: can_view_test_scores', 'false',
     pg_temp.v0030_as(v_u_teacher, format('select public.can_view_test_scores(%L)::text', c_pallotti))),
  ('teacher: search lists the Pallotti student', '1',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.staff_search_students('''') where student_id = %L', v_stu_a))),
  ('teacher: search by name fragment', '1',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.staff_search_students(''zeroALP'') where student_id = %L', v_stu_a))),
  ('teacher: search by grade', '1',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.staff_search_students(''Grade 9'') where student_id = %L', v_stu_a))),
  ('teacher: search by email fragment', '1',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.staff_search_students(''v0030-stu-a'') where student_id = %L', v_stu_a))),
  ('teacher: search hides the uncovered student', '0',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.staff_search_students('''') where student_id = %L', v_stu_c))),
  ('teacher: profile header', 'Vzeroalpha/9/v0030-stu-a@verify0030.test',
     pg_temp.v0030_as(v_u_teacher, format('select first_name || ''/'' || grade || ''/'' || email from public.staff_student_profile(%L)', v_stu_a))),
  ('teacher: mastery rows for the Pallotti student', '1',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.student_skill_mastery where student_id = %L', v_stu_a))),
  ('teacher: graded answers for the Pallotti student', '5',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.question_attempts where student_id = %L', v_stu_a))),
  ('teacher: placement answers (test score)', '0',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.question_attempts where student_id = %L and is_diagnostic', v_stu_a))),
  ('teacher: prep sections (test score)', '0',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.prep_attempts where student_id = %L', v_stu_a))),
  ('teacher: readiness scores (test score)', '0',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.readiness_scores where student_id = %L', v_stu_a))),
  ('teacher: sessions rows (chat)', '0',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.sessions where student_id = %L', v_stu_a))),
  ('teacher: profiles row (pin hash, Stripe id)', '0',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.profiles where id = %L', v_u_stu_a))),
  ('teacher: students row (pin, pin_hash)', '0',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.students where id = %L', v_stu_a))),
  ('teacher: staff_student_sessions returns rows without chat', '1/false',
     pg_temp.v0030_as(v_u_teacher, format(
       'select count(*)::text || ''/'' || coalesce(bool_or(t::text like %L), false)::text from public.staff_student_sessions(%L) t',
       '%' || c_secret || '%', v_stu_a))),
  ('teacher: no secret in any function output', 'false',
     pg_temp.v0030_as(v_u_teacher, format(
       'select (exists (select 1 from public.staff_student_profile(%1$L) t where t::text ~ %2$L)
             or exists (select 1 from public.staff_search_students('''') t where t::text ~ %2$L))::text',
       v_stu_a, 'V0030'))),
  ('teacher: other school student in search', '0',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.staff_search_students('''') where student_id = %L', v_stu_b))),
  ('teacher: other school student profile', '0',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.staff_student_profile(%L)', v_stu_b))),
  ('teacher: other school student sessions', '0',
     pg_temp.v0030_as(v_u_teacher, format('select count(*)::text from public.staff_student_sessions(%L)', v_stu_b))),
  ('teacher: other school mastery and answers', '0',
     pg_temp.v0030_as(v_u_teacher, format(
       'select ((select count(*) from public.student_skill_mastery where student_id = %1$L)
              + (select count(*) from public.question_attempts where student_id = %1$L))::text', v_stu_b))),
  ('teacher: reads only own school_staff row', '1',
     pg_temp.v0030_as(v_u_teacher, 'select count(*)::text from public.school_staff'));

  -- -------------------------------------------------------------------------
  -- Pallotti guidance: test scores at own school only, still no chat.
  -- -------------------------------------------------------------------------
  insert into v0030_results (name, expected, actual) values
  ('guidance: can_view_test_scores', 'true',
     pg_temp.v0030_as(v_u_guidance, format('select public.can_view_test_scores(%L)::text', c_pallotti))),
  ('guidance: placement answers', '1',
     pg_temp.v0030_as(v_u_guidance, format('select count(*)::text from public.question_attempts where student_id = %L and is_diagnostic', v_stu_a))),
  ('guidance: prep sections', '1',
     pg_temp.v0030_as(v_u_guidance, format('select count(*)::text from public.prep_attempts where student_id = %L', v_stu_a))),
  ('guidance: readiness scores', '1',
     pg_temp.v0030_as(v_u_guidance, format('select count(*)::text from public.readiness_scores where student_id = %L', v_stu_a))),
  ('guidance: other school test scores', '0',
     pg_temp.v0030_as(v_u_guidance, format(
       'select ((select count(*) from public.prep_attempts where student_id = %1$L)
              + (select count(*) from public.readiness_scores where student_id = %1$L)
              + (select count(*) from public.question_attempts where student_id = %1$L))::text', v_stu_b))),
  ('guidance: sessions, profiles, students rows', '0',
     pg_temp.v0030_as(v_u_guidance, format(
       'select ((select count(*) from public.sessions where student_id = %1$L)
              + (select count(*) from public.profiles where id = %2$L)
              + (select count(*) from public.students where id = %1$L))::text', v_stu_a, v_u_stu_a)));

  -- -------------------------------------------------------------------------
  -- Second-school teacher, inactive teacher.
  -- -------------------------------------------------------------------------
  insert into v0030_results (name, expected, actual) values
  ('other school: sees own student', '1',
     pg_temp.v0030_as(v_u_other, format('select count(*)::text from public.staff_search_students('''') where student_id = %L', v_stu_b))),
  ('other school: sees nothing of Pallotti', '0',
     pg_temp.v0030_as(v_u_other, format(
       'select ((select count(*) from public.staff_search_students('''') where student_id = %1$L)
              + (select count(*) from public.staff_student_profile(%1$L))
              + (select count(*) from public.staff_student_sessions(%1$L))
              + (select count(*) from public.student_skill_mastery where student_id = %1$L)
              + (select count(*) from public.question_attempts where student_id = %1$L))::text', v_stu_a))),
  ('other school: no role at Pallotti', 'null',
     pg_temp.v0030_as(v_u_other, format('select public.staff_role_for(%L)', c_pallotti))),
  ('inactive teacher: sees nothing', '0',
     pg_temp.v0030_as(v_u_inactive, format(
       'select ((select count(*) from public.staff_search_students(''''))
              + (select count(*) from public.staff_student_profile(%1$L))
              + (select count(*) from public.student_skill_mastery where student_id = %1$L))::text', v_stu_a))),
  ('inactive teacher: no role', 'null',
     pg_temp.v0030_as(v_u_inactive, format('select public.staff_role_for(%L)', c_pallotti)));

  -- -------------------------------------------------------------------------
  -- Student: no staff data, own data unchanged.
  -- -------------------------------------------------------------------------
  insert into v0030_results (name, expected, actual) values
  ('student: read school_staff', '0',
     pg_temp.v0030_as(v_u_stu_a, 'select count(*)::text from public.school_staff')),
  ('student: no staff role', 'null',
     pg_temp.v0030_as(v_u_stu_a, format('select public.staff_role_for(%L)', c_pallotti))),
  ('student: staff functions return nothing', '0',
     pg_temp.v0030_as(v_u_stu_a, format(
       'select ((select count(*) from public.staff_search_students(''''))
              + (select count(*) from public.staff_student_profile(%1$L))
              + (select count(*) from public.staff_student_sessions(%1$L)))::text', v_stu_b))),
  ('student: own mastery, answers, session still readable', '1/6/1',
     pg_temp.v0030_as(v_u_stu_a, format(
       'select (select count(*) from public.student_skill_mastery where student_id = %1$L)::text
          || ''/'' || (select count(*) from public.question_attempts where student_id = %1$L)::text
          || ''/'' || (select count(*) from public.sessions where student_id = %1$L)::text', v_stu_a)));

  -- -------------------------------------------------------------------------
  -- Linking on first sign-in.
  -- -------------------------------------------------------------------------
  insert into v0030_results (name, expected, actual) values
  ('link: confirmed email links its row', '1',
     pg_temp.v0030_as(v_u_link, 'select public.link_staff_account()::text')),
  ('link: second call links nothing', '0',
     pg_temp.v0030_as(v_u_link, 'select public.link_staff_account()::text')),
  ('link: unconfirmed email links nothing', '0',
     pg_temp.v0030_as(v_u_unconf, 'select public.link_staff_account()::text'));

  -- Read the result in a later statement: a plain subquery in the statement
  -- that called link_staff_account() still sees the snapshot from before it.
  insert into v0030_results (name, expected, actual) values
  ('link: linked row carries the user id', 'linked',
     (select case when ss.user_id = v_u_link then 'linked' else coalesce(ss.user_id::text, 'null') end
        from public.school_staff ss
       where ss.school_id = c_pallotti and ss.email = 'v0030-link@verify0030.test')),
  ('link: newly linked teacher sees the student', '1',
     pg_temp.v0030_as(v_u_link, format('select count(*)::text from public.staff_search_students('''') where student_id = %L', v_stu_a))),
  ('link: unconfirmed row stays unlinked', 'null',
     (select coalesce(ss.user_id::text, 'null')
        from public.school_staff ss
       where ss.school_id = c_pallotti and ss.email = 'v0030-unconf@verify0030.test'));

  -- -------------------------------------------------------------------------
  -- Report, then roll everything back.
  -- -------------------------------------------------------------------------
  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0030_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0030 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0030 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
