-- ===========================================================================
-- 0034_sat_official_skills_verify.sql
--
-- Checks for migration 0034. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0034 has committed (the platform admin seed is
-- not needed: the verify makes its own throwaway admin), and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report and rolling back every fixture:
--
--     VERIFY 0034 PASSED: N of N checks
--     VERIFY 0034 FAILED: 2 of N checks failed
--
-- DENIED = no privilege or row security said no; REFUSED = a server rule raised.
-- ===========================================================================

do $verify$
declare
  v_school   uuid := gen_random_uuid();
  v_u_admin  uuid := gen_random_uuid();   -- platform admin
  v_u_parent uuid := gen_random_uuid();   -- an ordinary signed-in parent
  v_u_staff  uuid := gen_random_uuid();   -- teacher at v_school
  v_u_s1     uuid := gen_random_uuid();   -- covered student "Vaaron", active today
  v_u_s2     uuid := gen_random_uuid();   -- covered student "Vzed", active 10 days ago
  v_k1       uuid;
  v_k2       uuid;
  v_skill    uuid;
  v_t        text;
  v_report   text := '';
  v_total    integer := 0;
  v_failed   integer := 0;
begin
  execute $fn$
    create function pg_temp.v0034_as(p_uid uuid, p_sql text)
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
    (v_u_admin,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0034-admin@verify0034.test',  now(), '{}', '{}', now(), now()),
    (v_u_parent, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0034-parent@verify0034.test', now(), '{}', '{}', now(), now()),
    (v_u_staff,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0034-staff@verify0034.test',  now(), '{}', '{}', now(), now()),
    (v_u_s1,     '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0034-s1@verify0034.test',     now(), '{}', '{}', now(), now()),
    (v_u_s2,     '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0034-s2@verify0034.test',     now(), '{}', '{}', now(), now());
  insert into public.platform_admins (user_id, note) values (v_u_admin, 'verify 0034');
  insert into public.school_staff (school_id, email, user_id, role, active)
  values (v_school, 'v0034-staff@verify0034.test', v_u_staff, 'teacher', true);
  insert into public.students (parent_id, first_name, grade, school_covered, dean_student_id, school_id)
  values (v_u_s1, 'Vaaron', '10', true, 'v0034-d1', v_school) returning id into v_k1;
  insert into public.students (parent_id, first_name, grade, school_covered, dean_student_id, school_id)
  values (v_u_s2, 'Vzed', '10', true, 'v0034-d2', v_school) returning id into v_k2;
  -- Vzed (later in A to Z) was active more recently than Vaaron.
  insert into public.sessions (student_id, subject, messages, updated_at) values
    (v_k1, 'math', '[]', now() - interval '10 days'),
    (v_k2, 'math', '[]', now() - interval '1 hour');

  select k.id into v_skill from public.skills k where k.sat_skill_code = 'boundaries';

  create temp table v0034_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  -- -------------------------------------------------------------------------
  -- Taxonomy.
  -- -------------------------------------------------------------------------
  insert into v0034_results (name, expected, actual) values
  ('official skills: 30 codes', '30',
     (select count(*)::text from public.sat_official_skills)),
  ('official skills: 11 Reading and Writing, 19 Math', '11/19',
     (select count(*) filter (where section = 'reading-writing')::text || '/' || count(*) filter (where section = 'math')::text
        from public.sat_official_skills)),
  ('official skills: 8 domains', '8',
     (select count(distinct domain)::text from public.sat_official_skills)),
  ('official skills: targets are Math 60, Reading and Writing 40', '0',
     (select count(*)::text from public.sat_official_skills
       where target <> case section when 'math' then 60 else 40 end)),
  ('skills: one skill per official code', '30/30',
     (select count(*)::text || '/' || count(distinct sat_skill_code)::text
        from public.skills where sat_skill_code is not null)),
  ('skills: every official skill under prep-sat-rw or prep-sat-math, slug prep-sat-<code>', '0',
     (select count(*)::text from public.skills k join public.sat_official_skills o on o.code = k.sat_skill_code
       where k.slug <> 'prep-sat-' || o.code
          or k.subject <> case o.section when 'math' then 'prep-sat-math' else 'prep-sat-rw' end
          or k.level <> 'skill')),
  ('skills: each official skill sits under its domain row', '0',
     (select count(*)::text from public.skills k join public.sat_official_skills o on o.code = k.sat_skill_code
       where k.parent_id is distinct from md5('pe-aos:dom-prep-sat-' || o.domain)::uuid)),
  ('re-keyed: Words in Context keeps its id, gets its code', 'words-in-context/same id',
     (select k.sat_skill_code || '/' || case when k.id = 'e6c13310-8886-6b51-c477-9f21126477ca' then 'same id' else 'new id' end
        from public.skills k where k.slug = 'prep-sat-words-in-context')),
  ('re-keyed: Transitions keeps its id, gets its code', 'transitions/same id',
     (select k.sat_skill_code || '/' || case when k.id = '705ceee1-32b3-7711-b9e9-70e69b04a7cd' then 'same id' else 'new id' end
        from public.skills k where k.slug = 'prep-sat-transitions')),
  ('re-keyed: both keep their SAT domain from 0032 (Transitions, Words in Context)', 'expression-of-ideas/craft-and-structure',
     (select string_agg(k.sat_alignment, '/' order by k.slug) from public.skills k
       where k.slug in ('prep-sat-words-in-context', 'prep-sat-transitions'))),
  ('re-keyed: both keep their 48 published questions', '48/48',
     (select string_agg(c::text, '/') from (
        select count(*) filter (where g.status = 'published') as c
          from public.skills k join public.generated_questions g on g.skill_id = k.id
         where k.slug in ('prep-sat-words-in-context', 'prep-sat-transitions')
         group by k.slug order by k.slug) x)),
  ('new skills: not live on the SAT card yet (no sat_alignment)', '28',
     (select count(*)::text from public.skills
       where sat_skill_code is not null and sat_alignment is null)),
  ('codes: a 31st code is refused', 'REFUSED', null);
  -- The 31st-code probe needs its own block (an error would end the statement).
  begin
    insert into public.sat_official_skills (code, section, domain, name, target, sort)
    values ('v0034-not-official', 'math', 'algebra', 'x', 60, 99);
    update v0034_results set actual = 'accepted' where name = 'codes: a 31st code is refused';
  exception when check_violation then
    update v0034_results set actual = 'REFUSED' where name = 'codes: a 31st code is refused';
  end;

  -- Review before publish, on an official skill.
  insert into v0034_results (name, expected, actual) values
  ('review: publishing without a reviewer', 'REFUSED', null),
  ('review: publishing with a named reviewer', 'published', null);
  begin
    insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status)
    values (v_skill, 'easy', 'V0034 unreviewed',
            '[{"text":"a","is_correct":true},{"text":"b","is_correct":false,"misconception_token":"x"}]', 'a', 's', 'published');
    update v0034_results set actual = 'accepted' where name = 'review: publishing without a reviewer';
  exception when others then
    update v0034_results set actual = 'REFUSED' where name = 'review: publishing without a reviewer';
  end;
  begin
    insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status,
                                            reviewed_by, reviewed_at)
    values (v_skill, 'easy', 'V0034 reviewed',
            '[{"text":"a","is_correct":true},{"text":"b","is_correct":false,"misconception_token":"x"},{"text":"c","is_correct":false,"misconception_token":"x"},{"text":"d","is_correct":false,"misconception_token":"x"}]',
            'a', 'Because a', 'published', 'V0034 Reviewer', now());
    update v0034_results set actual = 'published' where name = 'review: publishing with a named reviewer';
  exception when others then
    update v0034_results set actual = 'REFUSED: ' || sqlerrm where name = 'review: publishing with a named reviewer';
  end;
  -- One draft that fails checks (two choices, an em dash).
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status)
  values (v_skill, 'easy', 'V0034 draft — bad',
          '[{"text":"a","is_correct":true},{"text":"b","is_correct":false}]', 'a', '', 'draft');

  -- -------------------------------------------------------------------------
  -- Who can read the coverage data.
  -- -------------------------------------------------------------------------
  insert into v0034_results (name, expected, actual) values
  ('admin: coverage lists 30 skills', '30',
     pg_temp.v0034_as(v_u_admin, 'select count(*)::text from public.sat_coverage()')),
  ('admin: counts for Boundaries (drafted/checks/reviewed/published)', '2/1/1/1',
     pg_temp.v0034_as(v_u_admin,
       'select drafted || ''/'' || checks_passing || ''/'' || reviewed || ''/'' || published
          from public.sat_coverage() where code = ''boundaries''')),
  ('admin: Words in Context shows its 48 published', '48',
     pg_temp.v0034_as(v_u_admin, 'select published::text from public.sat_coverage() where code = ''words-in-context''')),
  ('parent: coverage', 'REFUSED',
     pg_temp.v0034_as(v_u_parent, 'select count(*)::text from public.sat_coverage()')),
  ('staff: coverage', 'REFUSED',
     pg_temp.v0034_as(v_u_staff, 'select count(*)::text from public.sat_coverage()')),
  ('anon: coverage', 'DENIED',
     pg_temp.v0034_as(null, 'select count(*)::text from public.sat_coverage()')),
  ('parent: read the official skills table', 'DENIED',
     pg_temp.v0034_as(v_u_parent, 'select count(*)::text from public.sat_official_skills')),
  ('parent: read platform_admins', 'DENIED',
     pg_temp.v0034_as(v_u_parent, 'select count(*)::text from public.platform_admins')),
  ('parent: make themselves an admin', 'DENIED',
     pg_temp.v0034_as(v_u_parent, format(
       'with w as (insert into public.platform_admins (user_id) values (%L) returning 1) select count(*)::text from w', v_u_parent))),
  ('is_platform_admin: admin / parent', 'true/false',
     pg_temp.v0034_as(v_u_admin, 'select public.is_platform_admin()::text') || '/' ||
     pg_temp.v0034_as(v_u_parent, 'select public.is_platform_admin()::text')),
  ('student: cannot see who reviewed a question', 'DENIED',
     pg_temp.v0034_as(v_u_parent, 'select count(reviewed_by)::text from public.generated_questions'));

  -- -------------------------------------------------------------------------
  -- Staff search order.
  -- -------------------------------------------------------------------------
  insert into v0034_results (name, expected, actual) values
  ('staff: default order is most recently active first', 'Vzed,Vaaron',
     pg_temp.v0034_as(v_u_staff,
       'select string_agg(first_name, '','' order by ord) from (select first_name, row_number() over () as ord from public.staff_search_students('''')) x')),
  ('staff: name order is A to Z', 'Vaaron,Vzed',
     pg_temp.v0034_as(v_u_staff,
       'select string_agg(first_name, '','' order by ord) from (select first_name, row_number() over () as ord from public.staff_search_students('''', ''name'')) x')),
  ('parent: staff search returns nothing', '0',
     pg_temp.v0034_as(v_u_parent, 'select count(*)::text from public.staff_search_students('''')'));

  -- -------------------------------------------------------------------------
  -- Report, then roll everything back.
  -- -------------------------------------------------------------------------
  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0034_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0034 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0034 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
