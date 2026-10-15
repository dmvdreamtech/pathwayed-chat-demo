-- ===========================================================================
-- 0039_staff_dashboard_verify.sql
--
-- Checks for migration 0039. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0039 has committed, and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report and rolling back every fixture:
--
--     VERIFY 0039 PASSED: N of N checks
--     VERIFY 0039 FAILED: 2 of N checks failed
--
-- Two schools, each with staff and students. Every section a staff member gets
-- must name only their own school's students.
--
-- DENIED = no privilege or row security said no; REFUSED = a server rule raised.
-- ===========================================================================

do $verify$
declare
  v_a        uuid := gen_random_uuid();
  v_b        uuid := gen_random_uuid();
  v_u_staffa uuid := gen_random_uuid();
  v_u_staffb uuid := gen_random_uuid();
  v_u_former uuid := gen_random_uuid();   -- staff at A, no longer active
  v_u_parent uuid := gen_random_uuid();
  v_u_a1     uuid := gen_random_uuid();
  v_u_a2     uuid := gen_random_uuid();
  v_u_a3     uuid := gen_random_uuid();
  v_u_b1     uuid := gen_random_uuid();
  v_a1 uuid; v_a2 uuid; v_a3 uuid; v_b1 uuid; v_paid uuid;
  v_s1 uuid; v_s2 uuid; v_s3 uuid;
  v_mon      timestamptz := (date_trunc('week', now() at time zone 'America/New_York')::timestamp at time zone 'America/New_York');
  v_t        text;
  v_report   text := '';
  v_total    integer := 0;
  v_failed   integer := 0;
begin
  execute $fn$
    create function pg_temp.v0039_as(p_uid uuid, p_sql text)
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
  select u, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'v0039-' || n || '@verify0039.test', now(), '{}', '{}', now(), now()
    from (values (v_u_staffa, 'staffa'), (v_u_staffb, 'staffb'), (v_u_former, 'former'), (v_u_parent, 'parent'),
                 (v_u_a1, 'a1'), (v_u_a2, 'a2'), (v_u_a3, 'a3'), (v_u_b1, 'b1')) x(u, n);
  insert into public.school_staff (school_id, email, user_id, role, active) values
    (v_a, 'v0039-staffa@verify0039.test', v_u_staffa, 'teacher', true),
    (v_b, 'v0039-staffb@verify0039.test', v_u_staffb, 'guidance', true),
    (v_a, 'v0039-former@verify0039.test', v_u_former, 'teacher', false);

  insert into public.students (parent_id, first_name, last_name, grade, school_covered, dean_student_id, school_id)
  values (v_u_a1, 'Vaone', 'Alpha', '10', true, 'v0039-a1', v_a) returning id into v_a1;
  insert into public.students (parent_id, first_name, last_name, grade, school_covered, dean_student_id, school_id)
  values (v_u_a2, 'Vatwo', 'Alpha', '10', true, 'v0039-a2', v_a) returning id into v_a2;
  insert into public.students (parent_id, first_name, last_name, grade, school_covered, dean_student_id, school_id)
  values (v_u_a3, 'Vathree', 'Alpha', '10', true, 'v0039-a3', v_a) returning id into v_a3;
  insert into public.students (parent_id, first_name, last_name, grade, school_covered, dean_student_id, school_id)
  values (v_u_b1, 'Vbone', 'Beta', '10', true, 'v0039-b1', v_b) returning id into v_b1;
  -- A paying family's child with the same school id must never count.
  insert into public.students (parent_id, first_name, grade, school_id)
  values (v_u_parent, 'Vpaid', '10', null) returning id into v_paid;

  select k.id into v_s1 from public.skills k where k.level = 'skill' and k.subject = 'math' order by k.slug limit 1;
  select k.id into v_s2 from public.skills k where k.level = 'skill' and k.subject = 'math' order by k.slug offset 1 limit 1;
  select k.id into v_s3 from public.skills k where k.level = 'skill' and k.subject = 'reading' order by k.slug limit 1;

  -- This week: A1 on three days (4 graded), A2 on one day (5 graded, 1 right
  -- on s1; 3 of 5 on s2), B1 on two days (6 graded, 1 right). A3 nothing.
  insert into public.question_attempts (student_id, skill_id, is_correct, created_at) values
    (v_a1, v_s3, true, v_mon + interval '12 hours'), (v_a1, v_s3, true, v_mon + interval '36 hours'),
    (v_a1, v_s3, true, v_mon + interval '60 hours'), (v_a1, v_s3, false, v_mon + interval '60 hours'),
    (v_a2, v_s1, true,  v_mon + interval '12 hours'), (v_a2, v_s1, false, v_mon + interval '12 hours'),
    (v_a2, v_s1, false, v_mon + interval '12 hours'), (v_a2, v_s1, false, v_mon + interval '12 hours'),
    (v_a2, v_s1, false, v_mon + interval '12 hours'),
    (v_a2, v_s2, true,  v_mon + interval '13 hours'), (v_a2, v_s2, true, v_mon + interval '13 hours'),
    (v_a2, v_s2, true,  v_mon + interval '13 hours'), (v_a2, v_s2, false, v_mon + interval '13 hours'),
    (v_a2, v_s2, false, v_mon + interval '13 hours'),
    (v_b1, v_s1, true,  v_mon + interval '12 hours'), (v_b1, v_s1, false, v_mon + interval '36 hours'),
    (v_b1, v_s1, false, v_mon + interval '36 hours'), (v_b1, v_s1, false, v_mon + interval '36 hours'),
    (v_b1, v_s1, false, v_mon + interval '36 hours'), (v_b1, v_s1, false, v_mon + interval '36 hours');
  -- A placement answer last week does not count as activity this week.
  insert into public.question_attempts (student_id, skill_id, is_correct, created_at, is_diagnostic)
  values (v_a3, v_s1, true, v_mon - interval '3 days', true);

  -- Levels. A1 mastered s3 two days ago; A2 still practicing s1 and s2;
  -- A3 reached Ready to move on 20 days ago (too old); B1 practicing s1.
  insert into public.student_skill_mastery (student_id, skill_id, status, advanced_at, recheck_passed_at) values
    (v_a1, v_s3, 'mastered', now() - interval '9 days', now() - interval '2 days'),
    (v_a2, v_s1, 'practicing', null, null),
    (v_a2, v_s2, 'practicing', null, null),
    (v_a3, v_s1, 'advanced', now() - interval '20 days', null),
    (v_b1, v_s1, 'practicing', null, null)
  on conflict (student_id, skill_id) do update
    set status = excluded.status, advanced_at = excluded.advanced_at, recheck_passed_at = excluded.recheck_passed_at;

  create temp table v0039_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  insert into v0039_results (name, expected, actual) values
  -- School A's staff.
  ('A staff: most active, days and questions, own school only', 'Vaone 3d/4q, Vatwo 1d/10q',
     pg_temp.v0039_as(v_u_staffa, 'select string_agg((x ->> ''first_name'') || '' '' || (x ->> ''days'') || ''d/'' || (x ->> ''questions'') || ''q'', '', '' order by o)
        from jsonb_array_elements(public.staff_dashboard() -> ''most_active'') with ordinality as t(x, o)')),
  ('A staff: recent wins are the last 14 days, own school only', 'Vaone mastered',
     pg_temp.v0039_as(v_u_staffa, 'select string_agg((x ->> ''first_name'') || '' '' || (x ->> ''level''), '', '')
        from jsonb_array_elements(public.staff_dashboard() -> ''recent_wins'') x')),
  ('A staff: stuck shows each student once, at their weakest skill', 'Vatwo 1 of 5',
     pg_temp.v0039_as(v_u_staffa, 'select string_agg((x ->> ''first_name'') || '' '' || (x ->> ''right'') || '' of '' || (x ->> ''answered''), '', '')
        from jsonb_array_elements(public.staff_dashboard() -> ''stuck'') x')),
  ('A staff: snapshot (active this week / students / mastered this month)', '2/3/1',
     pg_temp.v0039_as(v_u_staffa, 'select (s ->> ''active_this_week'') || ''/'' || (s ->> ''students'') || ''/'' || (s ->> ''mastered_this_month'')
        from (select public.staff_dashboard() -> ''snapshot'' as s) z')),
  ('A staff: no school B student appears anywhere', 'false',
     pg_temp.v0039_as(v_u_staffa, format('select (public.staff_dashboard()::text like %L)::text', '%' || v_b1 || '%'))),
  -- School B's staff.
  ('B staff: sees only their own student', 'Vbone',
     pg_temp.v0039_as(v_u_staffb, 'select string_agg(x ->> ''first_name'', '','') from jsonb_array_elements(public.staff_dashboard() -> ''most_active'') x')),
  ('B staff: stuck is their own student', 'Vbone 1 of 6',
     pg_temp.v0039_as(v_u_staffb, 'select string_agg((x ->> ''first_name'') || '' '' || (x ->> ''right'') || '' of '' || (x ->> ''answered''), '','')
        from jsonb_array_elements(public.staff_dashboard() -> ''stuck'') x')),
  ('B staff: no wins of school A', '0',
     pg_temp.v0039_as(v_u_staffb, 'select jsonb_array_length(public.staff_dashboard() -> ''recent_wins'')::text')),
  ('B staff: snapshot counts only school B', '1/1/0',
     pg_temp.v0039_as(v_u_staffb, 'select (s ->> ''active_this_week'') || ''/'' || (s ->> ''students'') || ''/'' || (s ->> ''mastered_this_month'')
        from (select public.staff_dashboard() -> ''snapshot'' as s) z')),
  ('B staff: no school A student appears anywhere', 'false',
     pg_temp.v0039_as(v_u_staffb, format('select (public.staff_dashboard()::text ~ %L)::text', v_a1 || '|' || v_a2 || '|' || v_a3))),
  -- Everyone else.
  ('former staff (row deactivated): refused', 'DENIED',
     pg_temp.v0039_as(v_u_former, 'select public.staff_dashboard()::text')),
  ('a parent: refused', 'DENIED',
     pg_temp.v0039_as(v_u_parent, 'select public.staff_dashboard()::text')),
  ('a covered student: refused', 'DENIED',
     pg_temp.v0039_as(v_u_a1, 'select public.staff_dashboard()::text')),
  ('anon: refused', 'DENIED',
     pg_temp.v0039_as(null, 'select public.staff_dashboard()::text')),
  ('grants: security definer, authenticated may run it, anon may not', 'true/true/false',
     (select p.prosecdef::text from pg_proc p where p.oid = 'public.staff_dashboard()'::regprocedure) || '/'
     || has_function_privilege('authenticated', 'public.staff_dashboard()', 'EXECUTE')::text || '/'
     || has_function_privilege('anon', 'public.staff_dashboard()', 'EXECUTE')::text);

  -- -------------------------------------------------------------------------
  -- Report, then roll everything back.
  -- -------------------------------------------------------------------------
  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0039_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0039 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0039 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
