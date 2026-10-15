-- ===========================================================================
-- 0037_school_provided_billing_guard_verify.sql
--
-- Checks for migration 0037. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0037 has committed, and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report and rolling back every fixture:
--
--     VERIFY 0037 PASSED: N of N checks
--     VERIFY 0037 FAILED: 2 of N checks failed
--
-- Signed in as a staff member, a covered student, a platform admin and a
-- paying parent, it asks the question every paid route and billing screen asks
-- (my_school_provided). The routes' own refusal is tested in
-- api/billing-guard.test.ts; this proves the database answer they rely on.
--
-- DENIED = no privilege or row security said no; REFUSED = a server rule raised.
-- ===========================================================================

do $verify$
declare
  v_school    uuid := gen_random_uuid();
  v_u_staff   uuid := gen_random_uuid();   -- teacher, linked by user id
  v_u_staff2  uuid := gen_random_uuid();   -- admin, listed by email only (not yet linked)
  v_u_former  uuid := gen_random_uuid();   -- a staff row that is no longer active
  v_u_covered uuid := gen_random_uuid();   -- a covered student's own account
  v_u_admin   uuid := gen_random_uuid();   -- platform admin at a consumer address
  v_u_domain  uuid := gen_random_uuid();   -- an address at a mapped school domain
  v_u_parent  uuid := gen_random_uuid();   -- a normal paying parent
  v_domain    text;
  v_t         text;
  v_report    text := '';
  v_total     integer := 0;
  v_failed    integer := 0;
begin
  execute $fn$
    create function pg_temp.v0037_as(p_uid uuid, p_sql text)
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

  select d.domain into v_domain from public.school_domains d
   where d.domain <> 'covered.pathwayed.local' order by d.domain limit 1;
  if v_domain is null then
    raise exception 'no school domain is listed, so the school_domain check cannot be tested';
  end if;

  insert into auth.users (id, instance_id, aud, role, email, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values
    (v_u_staff,   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0037-staff@verify0037.test',   now(), '{}', '{}', now(), now()),
    (v_u_staff2,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'V0037-Admin@verify0037.test',   now(), '{}', '{}', now(), now()),
    (v_u_former,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0037-former@verify0037.test',  now(), '{}', '{}', now(), now()),
    (v_u_covered, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0037-covered@verify0037.test', now(), '{}', '{}', now(), now()),
    (v_u_admin,   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0037-admin@verify0037.test',   now(), '{}', '{}', now(), now()),
    (v_u_domain,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0037-x@' || v_domain,          now(), '{}', '{}', now(), now()),
    (v_u_parent,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0037-parent@verify0037.test',  now(), '{}', '{}', now(), now());

  insert into public.school_staff (school_id, email, user_id, role, active) values
    (v_school, 'v0037-staff@verify0037.test', v_u_staff, 'teacher', true),
    (v_school, 'v0037-admin@verify0037.test', null, 'admin', true),
    (v_school, 'v0037-former@verify0037.test', v_u_former, 'teacher', false);
  insert into public.platform_admins (user_id, note) values (v_u_admin, 'verify 0037');
  insert into public.students (parent_id, first_name, grade, school_covered, dean_student_id, school_id)
  values (v_u_covered, 'Vcov', '10', true, 'v0037-d1', v_school);
  insert into public.students (parent_id, first_name, grade) values (v_u_parent, 'Vkid', '5');

  create temp table v0037_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  insert into v0037_results (name, expected, actual) values
  -- Signed in as each one: what every paid route and billing screen asks.
  ('staff member (linked): no billing', 'school_staff',
     pg_temp.v0037_as(v_u_staff, 'select public.my_school_provided()')),
  ('staff member (listed by email, any case, not yet linked): no billing', 'school_staff',
     pg_temp.v0037_as(v_u_staff2, 'select public.my_school_provided()')),
  ('covered student: no billing', 'covered_student',
     pg_temp.v0037_as(v_u_covered, 'select public.my_school_provided()')),
  ('platform admin: no billing', 'platform_admin',
     pg_temp.v0037_as(v_u_admin, 'select public.my_school_provided()')),
  ('address at a mapped school domain: no billing', 'school_domain',
     pg_temp.v0037_as(v_u_domain, 'select public.my_school_provided()')),
  ('normal paying parent: may buy', 'null',
     pg_temp.v0037_as(v_u_parent, 'select public.my_school_provided()')),
  ('former staff (row no longer active): may buy', 'null',
     pg_temp.v0037_as(v_u_former, 'select public.my_school_provided()')),
  -- The server's form of the same question.
  ('service role: the same answers for all seven', 'school_staff,school_staff,covered_student,platform_admin,school_domain,null,null',
     (select string_agg(coalesce(public.school_provided_reason(x.u), 'null'), ',' order by x.o)
        from unnest(array[v_u_staff, v_u_staff2, v_u_covered, v_u_admin, v_u_domain, v_u_parent, v_u_former])
             with ordinality as x(u, o))),
  -- Nobody can ask about someone else.
  ('parent: cannot ask about another account', 'DENIED',
     pg_temp.v0037_as(v_u_parent, format('select public.school_provided_reason(%L)', v_u_staff))),
  ('anon: cannot ask at all', 'DENIED',
     pg_temp.v0037_as(null, 'select public.my_school_provided()')),
  ('grants: service role may run both', 'true/true',
     has_function_privilege('service_role', 'public.school_provided_reason(uuid)', 'EXECUTE')::text || '/'
     || has_function_privilege('service_role', 'public.my_school_provided()', 'EXECUTE')::text);

  -- -------------------------------------------------------------------------
  -- Report, then roll everything back.
  -- -------------------------------------------------------------------------
  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0037_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0037 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0037 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
