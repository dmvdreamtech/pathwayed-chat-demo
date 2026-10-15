-- ===========================================================================
-- 0038_staff_rollout_verify.sql
--
-- Checks for migration 0038. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0038 has committed, and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report and rolling back every fixture:
--
--     VERIFY 0038 PASSED: N of N checks
--     VERIFY 0038 FAILED: 2 of N checks failed
--
-- DENIED = no privilege or row security said no; REFUSED = a server rule raised.
-- ===========================================================================

do $verify$
declare
  v_school   uuid := gen_random_uuid();
  v_other    uuid := gen_random_uuid();
  v_u_admin  uuid := gen_random_uuid();   -- platform admin
  v_u_teach  uuid := gen_random_uuid();   -- teacher at v_school
  v_u_guid   uuid := gen_random_uuid();   -- guidance at v_school
  v_u_sadmin uuid := gen_random_uuid();   -- school admin at v_school
  v_u_dean   uuid := gen_random_uuid();   -- academic dean at v_school
  v_u_away   uuid := gen_random_uuid();   -- guidance at another school
  v_u_parent uuid := gen_random_uuid();   -- a parent
  v_u_kid    uuid := gen_random_uuid();   -- the covered student's own account
  v_kid      uuid;
  v_math     uuid;
  v_sat      uuid;
  v_old_id   uuid;
  v_t        text;
  v_report   text := '';
  v_total    integer := 0;
  v_failed   integer := 0;
begin
  execute $fn$
    create function pg_temp.v0038_as(p_uid uuid, p_sql text)
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
         'v0038-' || n || '@verify0038.test', now(), '{}', '{}', now(), now()
    from (values (v_u_admin, 'admin'), (v_u_teach, 'teach'), (v_u_guid, 'guid'), (v_u_sadmin, 'sadmin'),
                 (v_u_dean, 'dean'), (v_u_away, 'away'), (v_u_parent, 'parent'), (v_u_kid, 'kid')) x(u, n);
  insert into public.platform_admins (user_id, note) values (v_u_admin, 'verify 0038');
  insert into public.school_domains (domain, note, school_id) values
    ('verify0038.test', 'Verify Academy, test only', v_school),
    ('away0038.test', 'Away School, test only', v_other);
  insert into public.school_staff (school_id, email, user_id, role, active, full_name) values
    (v_school, 'v0038-guid@verify0038.test',   v_u_guid,   'guidance', true, 'Gui Dance');
  insert into public.school_staff (school_id, email, user_id, role, active) values
    (v_school, 'v0038-teach@verify0038.test',  v_u_teach,  'teacher', true),
    (v_school, 'v0038-sadmin@verify0038.test', v_u_sadmin, 'admin', true),
    (v_school, 'v0038-dean@verify0038.test',   v_u_dean,   'academic_dean', true),
    (v_other,  'v0038-away@verify0038.test',   v_u_away,   'guidance', true);
  insert into public.school_staff (school_id, email, role, active)
  values (v_school, 'gone@verify0038.test', 'teacher', false) returning id into v_old_id;

  -- A covered student with placement answers (2 of 3 in math), one finished
  -- timed section (75%), and SAT practice on one official skill (1 of 2).
  insert into public.students (parent_id, first_name, grade, school_covered, dean_student_id, school_id, working_grade)
  values (v_u_kid, 'Vscore', '10', true, 'v0038-d1', v_school, 9) returning id into v_kid;
  select k.id into v_math from public.skills k where k.level = 'skill' and k.subject = 'math' order by k.slug limit 1;
  select k.id into v_sat from public.skills k where k.sat_skill_code = 'transitions';
  insert into public.question_attempts (student_id, skill_id, is_correct, is_diagnostic) values
    (v_kid, v_math, true, true), (v_kid, v_math, true, true), (v_kid, v_math, false, true);
  insert into public.question_attempts (student_id, skill_id, is_correct, is_diagnostic, sat_alignment) values
    (v_kid, v_sat, true, false, 'expression-of-ideas'), (v_kid, v_sat, false, false, 'expression-of-ideas');
  insert into public.prep_attempts (student_id, module_id, section_id, mode, status)
  values (v_kid, 'hspt', 'verbal-skills', 'timed_section', 'in_progress');
  perform set_config('app.prep_finalize', '1', true);
  update public.prep_attempts set status = 'submitted', submitted_at = now(), score = 0.75 where student_id = v_kid;
  perform set_config('app.prep_finalize', '', true);

  create temp table v0038_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  -- -------------------------------------------------------------------------
  -- /admin/staff, as the platform admin.
  -- -------------------------------------------------------------------------
  insert into v0038_results (name, expected, actual) values
  ('admin: schools list names the school and counts staff', 'Verify Academy/4 of 5',
     pg_temp.v0038_as(v_u_admin, format(
       'select name || ''/'' || staff_active || '' of '' || staff_total from public.admin_staff_schools() where school_id = %L', v_school))),
  ('admin: lists the school''s staff, active and not', '5',
     pg_temp.v0038_as(v_u_admin, format('select count(*)::text from public.admin_list_staff(%L)', v_school))),
  ('admin: CSV save adds, updates and reactivates in one go', '{"added": 1, "updated": 1, "unchanged": 1, "reactivated": 1}',
     pg_temp.v0038_as(v_u_admin, format(
       'select public.admin_save_staff(%L, %L::jsonb)::text', v_school,
       '[{"email":"New.Person@Verify0038.test","full_name":"New Person","role":"Teacher"},
         {"email":"v0038-sadmin@verify0038.test","full_name":"School Admin","role":"admin"},
         {"email":"v0038-guid@verify0038.test","full_name":"Gui Dance","role":"guidance"},
         {"email":"gone@verify0038.test","full_name":"Back Again","role":"teacher"}]')));
  insert into v0038_results (name, expected, actual) values
  ('admin: the save stored them normalized', 'new.person@verify0038.test/New Person/teacher',
     (select email || '/' || full_name || '/' || role from public.school_staff
       where school_id = v_school and email = 'new.person@verify0038.test')),
  ('admin: a bad email refuses the whole batch', 'REFUSED',
     pg_temp.v0038_as(v_u_admin, format('select public.admin_save_staff(%L, %L::jsonb)::text', v_school,
       '[{"email":"ok@verify0038.test","full_name":"Ok","role":"teacher"},{"email":"not an email","full_name":"X","role":"teacher"}]')));
  insert into v0038_results (name, expected, actual) values
  ('admin: ...and wrote nothing from it', '0',
     (select count(*)::text from public.school_staff where email = 'ok@verify0038.test')),
  ('admin: an unknown role is refused', 'REFUSED',
     pg_temp.v0038_as(v_u_admin, format('select public.admin_save_staff(%L, %L::jsonb)::text', v_school,
       '[{"email":"x@verify0038.test","full_name":"X","role":"principal"}]'))),
  ('admin: the same email twice is refused', 'REFUSED',
     pg_temp.v0038_as(v_u_admin, format('select public.admin_save_staff(%L, %L::jsonb)::text', v_school,
       '[{"email":"x@verify0038.test","full_name":"X","role":"teacher"},{"email":"X@verify0038.test","full_name":"X","role":"teacher"}]'))),
  ('admin: an unknown school is refused', 'REFUSED',
     pg_temp.v0038_as(v_u_admin, format('select public.admin_save_staff(%L, %L::jsonb)::text', gen_random_uuid(),
       '[{"email":"x@verify0038.test","full_name":"X","role":"teacher"}]'))),
  ('admin: change a role (call)', '',
     (select pg_temp.v0038_as(v_u_admin, format('select public.admin_set_staff_role(%L, %L)::text', id, 'admin'))
        from public.school_staff s where s.email = 'new.person@verify0038.test'));
  insert into v0038_results (name, expected, actual) values
  ('admin: change a role', 'admin',
     (select role from public.school_staff where email = 'new.person@verify0038.test')),
  ('admin: deactivate (call)', '',
     (select pg_temp.v0038_as(v_u_admin, format('select public.admin_set_staff_active(%L, false)::text', id))
        from public.school_staff s where s.email = 'new.person@verify0038.test'));
  insert into v0038_results (name, expected, actual) values
  ('admin: deactivate', 'false',
     (select active::text from public.school_staff where email = 'new.person@verify0038.test')),
  ('admin: every change is in the log', 'added,deactivated,reactivated,role_changed,updated',
     (select string_agg(distinct action, ',' order by action) from public.school_staff_events where school_id = v_school)),
  ('no hard deletes, even as the table owner', 'REFUSED', null);
  begin
    delete from public.school_staff where id = v_old_id;
    update v0038_results set actual = 'deleted' where name like 'no hard deletes%';
  exception when restrict_violation then
    update v0038_results set actual = 'REFUSED' where name like 'no hard deletes%';
  end;

  -- Nobody else manages staff.
  insert into v0038_results (name, expected, actual) values
  ('school admin: cannot list staff', 'DENIED',
     pg_temp.v0038_as(v_u_sadmin, format('select count(*)::text from public.admin_list_staff(%L)', v_school))),
  ('teacher: cannot add staff', 'DENIED',
     pg_temp.v0038_as(v_u_teach, format('select public.admin_save_staff(%L, %L::jsonb)::text', v_school,
       '[{"email":"x@verify0038.test","full_name":"X","role":"admin"}]'))),
  ('parent: cannot see schools', 'DENIED',
     pg_temp.v0038_as(v_u_parent, 'select count(*)::text from public.admin_staff_schools()')),
  ('anon: cannot deactivate anyone', 'DENIED',
     pg_temp.v0038_as(null, format('select public.admin_set_staff_active(%L, false)::text', v_old_id))),
  ('signed in: the change log is unreadable', 'DENIED',
     pg_temp.v0038_as(v_u_admin, 'select count(*)::text from public.school_staff_events')),
  ('signed in: cannot delete staff rows directly', 'DENIED',
     pg_temp.v0038_as(v_u_admin, format(
       'with d as (delete from public.school_staff where id = %L returning 1) select count(*)::text from d', v_old_id)));

  -- -------------------------------------------------------------------------
  -- Test Scores tab.
  -- -------------------------------------------------------------------------
  insert into v0038_results (name, expected, actual) values
  ('guidance: placement answers by subject and working grade', 'math 2 of 3, grade 9',
     pg_temp.v0038_as(v_u_guid, format(
       'select (p ->> ''subject'') || '' '' || (p ->> ''right'') || '' of '' || (p ->> ''answered'') || '', grade '' || (s ->> ''working_grade'')
          from public.staff_student_test_scores(%L) s, jsonb_array_elements(s -> ''placement'') p', v_kid))),
  ('guidance: timed section, percent right', 'hspt/verbal-skills 75%',
     pg_temp.v0038_as(v_u_guid, format(
       'select (t ->> ''module_id'') || ''/'' || (t ->> ''section_id'') || '' '' || (t ->> ''pct'') || ''%%''
          from public.staff_student_test_scores(%L) s, jsonb_array_elements(s -> ''timed'') t', v_kid))),
  ('guidance: SAT practice by section and domain, skills of 30', 'reading-writing 1 of 2; expression-of-ideas 1 of 2; 1 of 30',
     pg_temp.v0038_as(v_u_guid, format(
       'select (x ->> ''section'') || '' '' || (x ->> ''right'') || '' of '' || (x ->> ''answered'') || ''; ''
               || (d ->> ''domain'') || '' '' || (d ->> ''right'') || '' of '' || (d ->> ''answered'') || ''; ''
               || (s ->> ''sat_skills_practiced'') || '' of '' || (s ->> ''sat_skills_total'')
          from public.staff_student_test_scores(%L) s, jsonb_array_elements(s -> ''sat_sections'') x,
               jsonb_array_elements(s -> ''sat_domains'') d', v_kid))),
  ('school admin: may see scores', 'yes',
     pg_temp.v0038_as(v_u_sadmin, format('select case when public.staff_student_test_scores(%L) is not null then ''yes'' end', v_kid))),
  ('academic dean: may see scores', 'yes',
     pg_temp.v0038_as(v_u_dean, format('select case when public.staff_student_test_scores(%L) is not null then ''yes'' end', v_kid))),
  ('teacher: no scores', 'DENIED',
     pg_temp.v0038_as(v_u_teach, format('select public.staff_student_test_scores(%L)::text', v_kid))),
  ('guidance at another school: no scores', 'DENIED',
     pg_temp.v0038_as(v_u_away, format('select public.staff_student_test_scores(%L)::text', v_kid))),
  ('parent: no scores', 'DENIED',
     pg_temp.v0038_as(v_u_parent, format('select public.staff_student_test_scores(%L)::text', v_kid))),
  ('platform admin who is not school staff: no scores', 'DENIED',
     pg_temp.v0038_as(v_u_admin, format('select public.staff_student_test_scores(%L)::text', v_kid)));

  -- -------------------------------------------------------------------------
  -- Report, then roll everything back.
  -- -------------------------------------------------------------------------
  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0038_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0038 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0038 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
