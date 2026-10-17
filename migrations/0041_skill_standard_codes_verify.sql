-- ===========================================================================
-- 0041_skill_standard_codes_verify.sql
--
-- Checks for migration 0041. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0041 has committed, and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report and rolling back every fixture:
--
--     VERIFY 0041 PASSED: N of N checks
--     VERIFY 0041 FAILED: 2 of N checks failed
--
-- DENIED = no privilege or row security said no; REFUSED = a server rule raised.
-- ===========================================================================

do $verify$
declare
  v_u      uuid := gen_random_uuid();
  v_skill  uuid := gen_random_uuid();
  v_parent uuid;
  v_t      text;
  v_report text := '';
  v_total  integer := 0;
  v_failed integer := 0;
begin
  execute $fn$
    create function pg_temp.v0041_as(p_uid uuid, p_sql text)
    returns text
    language plpgsql
    as $body$
    declare
      v_out text;
    begin
      if p_uid is null then
        perform set_config('request.jwt.claims', '{"role":"anon"}', true);
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

  select id into v_parent from public.skills where level = 'subject' and subject = 'math' order by created_at limit 1;
  insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, ccss_grade, ccss_grade_num, ccss_code)
  values (v_skill, 'skill', v_parent, 'math', 'Verify Money', 'v0041-verify-money', 'k-2', '1', 1, '1.MD.C.3');

  create temp table v0041_results (n serial, name text, expected text, actual text) on commit drop;

  insert into v0041_results (name, expected, actual) values
  ('backfill: every skill with a ccss_code has its ccss row (before this fixture)', '0',
     (select count(*)::text from public.skills s
       where s.ccss_code is not null and btrim(s.ccss_code) <> '' and s.id <> v_skill
         and not exists (select 1 from public.skill_standard_codes c
                          where c.skill_id = s.id and c.framework = 'ccss' and c.code = btrim(s.ccss_code))));

  insert into public.skill_standard_codes (skill_id, framework, code) values (v_skill, 'ccss', '1.MD.C.3');
  insert into public.skill_standard_codes (skill_id, framework, code) values (v_skill, 'ccss', '1.MD.C.3') on conflict do nothing;
  insert into public.skill_standard_codes (skill_id, framework, code) values (v_skill, 'md-2025', '1.GR.C.6');

  insert into v0041_results (name, expected, actual) values
  ('a duplicate tag is a no-op', '1',
     (select count(*)::text from public.skill_standard_codes where skill_id = v_skill and framework = 'ccss')),
  ('a Maryland 2025 code sits next to the Common Core one', 'ccss:1.MD.C.3,md-2025:1.GR.C.6',
     (select string_agg(framework || ':' || code, ',' order by framework) from public.skill_standard_codes where skill_id = v_skill)),
  ('an unknown framework is refused', 'REFUSED', null);
  -- The framework check, tested directly (as the owner, so only the constraint can refuse).
  begin
    insert into public.skill_standard_codes (skill_id, framework, code) values (v_skill, 'texas', 'X');
    update v0041_results set actual = 'ALLOWED' where name = 'an unknown framework is refused';
  exception when check_violation then
    update v0041_results set actual = 'REFUSED' where name = 'an unknown framework is refused';
  end;

  insert into v0041_results (name, expected, actual) values
  ('deleting the skill removes its tags', '0', null),
  ('signed in: unreadable', 'DENIED',
     pg_temp.v0041_as(v_u, 'select count(*)::text from public.skill_standard_codes')),
  ('anon: unreadable', 'DENIED',
     pg_temp.v0041_as(null, 'select count(*)::text from public.skill_standard_codes')),
  ('signed in: cannot add a tag', 'DENIED',
     pg_temp.v0041_as(v_u, format('insert into public.skill_standard_codes (skill_id, framework, code) values (%L, ''ccss'', ''Z'') returning code', v_skill)));

  delete from public.skills where id = v_skill;
  update v0041_results set actual = (select count(*)::text from public.skill_standard_codes where skill_id = v_skill)
   where name = 'deleting the skill removes its tags';

  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0041_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0041 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0041 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
