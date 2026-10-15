-- ===========================================================================
-- 0035_student_last_names_verify.sql
--
-- Checks for migration 0035. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0035 has committed, and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report and rolling back every fixture:
--
--     VERIFY 0035 PASSED: N of N checks
--     VERIFY 0035 FAILED: 2 of N checks failed
--
-- DENIED = no privilege or row security said no; REFUSED = a server rule raised.
-- ===========================================================================

do $verify$
declare
  v_school   uuid := gen_random_uuid();
  v_other    uuid := gen_random_uuid();
  v_u_staff  uuid := gen_random_uuid();   -- teacher at v_school
  v_u_away   uuid := gen_random_uuid();   -- teacher at v_other
  v_u_parent uuid := gen_random_uuid();   -- a paying parent
  v_u_s1     uuid := gen_random_uuid();   -- covered "Ana Lopez", active 10 days ago
  v_u_s2     uuid := gen_random_uuid();   -- covered "Zoe Adams", active an hour ago
  v_k1       uuid;
  v_k2       uuid;
  v_k3       uuid;
  v_t        text;
  v_report   text := '';
  v_total    integer := 0;
  v_failed   integer := 0;
begin
  execute $fn$
    create function pg_temp.v0035_as(p_uid uuid, p_sql text)
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
    (v_u_staff,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0035-staff@verify0035.test',  now(), '{}', '{}', now(), now()),
    (v_u_away,   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0035-away@verify0035.test',   now(), '{}', '{}', now(), now()),
    (v_u_parent, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0035-parent@verify0035.test', now(), '{}', '{}', now(), now()),
    (v_u_s1,     '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0035-s1@verify0035.test',     now(), '{}', '{}', now(), now()),
    (v_u_s2,     '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0035-s2@verify0035.test',     now(), '{}', '{}', now(), now());
  insert into public.school_staff (school_id, email, user_id, role, active) values
    (v_school, 'v0035-staff@verify0035.test', v_u_staff, 'teacher', true),
    (v_other,  'v0035-away@verify0035.test',  v_u_away,  'teacher', true);
  -- As the server writes them: the service path, not the browser.
  insert into public.students (parent_id, first_name, last_name, grade, school_covered, dean_student_id, school_id)
  values (v_u_s1, 'Ana', '  Lopez ', '10', true, 'v0035-d1', v_school) returning id into v_k1;
  insert into public.students (parent_id, first_name, last_name, grade, school_covered, dean_student_id, school_id)
  values (v_u_s2, 'Zoe', 'Adams', '10', true, 'v0035-d2', v_school) returning id into v_k2;
  -- A paying family's child: a last name is never kept.
  insert into public.students (parent_id, first_name, last_name, grade)
  values (v_u_parent, 'Vpaid', 'Kept', '7') returning id into v_k3;
  insert into public.sessions (student_id, subject, messages, updated_at) values
    (v_k1, 'math', '[]', now() - interval '10 days'),
    (v_k2, 'math', '[]', now() - interval '1 hour');

  create temp table v0035_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  -- -------------------------------------------------------------------------
  -- The column and its rule.
  -- -------------------------------------------------------------------------
  insert into v0035_results (name, expected, actual) values
  ('column: students.last_name exists', '1',
     (select count(*)::text from information_schema.columns
       where table_schema = 'public' and table_name = 'students' and column_name = 'last_name')),
  ('column: stored trimmed', 'Lopez',
     (select last_name from public.students where id = v_k1)),
  ('rule: a paying family''s child never keeps a last name', 'null',
     coalesce((select last_name from public.students where id = v_k3), 'null')),
  ('rule: the check constraint is in place', '1',
     (select count(*)::text from pg_constraint
       where conname = 'students_last_name_covered_only' and conrelid = 'public.students'::regclass)),
  ('browser: no insert or update grant on last_name', 'false/false',
     has_column_privilege('authenticated', 'public.students', 'last_name', 'INSERT')::text || '/'
     || has_column_privilege('authenticated', 'public.students', 'last_name', 'UPDATE')::text),
  ('browser: the student cannot change their own last name', 'DENIED',
     pg_temp.v0035_as(v_u_s1, format(
       'with w as (update public.students set last_name = %L where id = %L returning 1) select count(*)::text from w',
       'Changed', v_k1))),
  ('browser: a parent cannot add a child with a last name', 'DENIED',
     pg_temp.v0035_as(v_u_parent, format(
       'with w as (insert into public.students (parent_id, first_name, last_name, grade) values (%L, %L, %L, %L) returning 1) select count(*)::text from w',
       v_u_parent, 'Vnew', 'Sneaky', '7')));

  -- -------------------------------------------------------------------------
  -- Staff functions.
  -- -------------------------------------------------------------------------
  insert into v0035_results (name, expected, actual) values
  ('staff search: returns last names', 'Adams,Lopez',
     pg_temp.v0035_as(v_u_staff,
       'select string_agg(last_name, '','' order by last_name) from public.staff_search_students('''')')),
  ('staff search: finds by last name', 'Ana',
     pg_temp.v0035_as(v_u_staff, 'select string_agg(first_name, '','') from public.staff_search_students(''lopez'')')),
  ('staff search: finds by first and last name', 'Ana',
     pg_temp.v0035_as(v_u_staff, 'select string_agg(first_name, '','') from public.staff_search_students(''ana lop'')')),
  ('staff search: first name still works', 'Zoe',
     pg_temp.v0035_as(v_u_staff, 'select string_agg(first_name, '','') from public.staff_search_students(''zoe'')')),
  ('staff search: default order is still most recently active first', 'Zoe,Ana',
     pg_temp.v0035_as(v_u_staff,
       'select string_agg(first_name, '','' order by ord) from (select first_name, row_number() over () as ord from public.staff_search_students('''')) x')),
  ('staff search: A to Z sorts by last name', 'Adams,Lopez',
     pg_temp.v0035_as(v_u_staff,
       'select string_agg(last_name, '','' order by ord) from (select last_name, row_number() over () as ord from public.staff_search_students('''', ''name'')) x')),
  ('staff profile: returns the last name', 'Lopez',
     pg_temp.v0035_as(v_u_staff, format('select last_name from public.staff_student_profile(%L)', v_k1))),
  ('staff at another school: search finds nothing', '0',
     pg_temp.v0035_as(v_u_away, 'select count(*)::text from public.staff_search_students(''lopez'')')),
  ('staff at another school: profile is empty', '0',
     pg_temp.v0035_as(v_u_away, format('select count(*)::text from public.staff_student_profile(%L)', v_k1))),
  ('parent: staff search returns nothing', '0',
     pg_temp.v0035_as(v_u_parent, 'select count(*)::text from public.staff_search_students(''lopez'')')),
  ('anon: staff search is refused', 'DENIED',
     pg_temp.v0035_as(null, 'select count(*)::text from public.staff_search_students('''')')),
  ('anon: staff profile is refused', 'DENIED',
     pg_temp.v0035_as(null, format('select count(*)::text from public.staff_student_profile(%L)', v_k1)));

  -- -------------------------------------------------------------------------
  -- Coverage ends: the last name goes with it.
  -- -------------------------------------------------------------------------
  update public.students set school_covered = false, school_id = null where id = v_k1;
  insert into v0035_results (name, expected, actual) values
  ('coverage ends: the last name is cleared', 'null',
     coalesce((select last_name from public.students where id = v_k1), 'null')),
  ('coverage ends: staff no longer find the student', '0',
     pg_temp.v0035_as(v_u_staff, 'select count(*)::text from public.staff_search_students(''lopez'')'));

  -- -------------------------------------------------------------------------
  -- Report, then roll everything back.
  -- -------------------------------------------------------------------------
  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0035_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0035 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0035 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
