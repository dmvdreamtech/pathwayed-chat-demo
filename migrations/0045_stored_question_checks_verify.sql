-- ===========================================================================
-- 0045_stored_question_checks_verify.sql
--
-- Checks for migration 0045. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0045 has committed, and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report and rolling back every fixture:
--
--     VERIFY 0045 PASSED: N of N checks
--     VERIFY 0045 FAILED: 2 of N checks failed
--
-- It runs on the full live data: every stored result is compared with a fresh
-- question_issues() call, review_queue() and content_coverage() are compared
-- with the old, recomputing formulas, and both are timed as a signed-in
-- platform admin. The API cancels a call after 8 s; this file requires each
-- page call to finish in under 2 s. (A timeout set inside one statement does
-- not apply to it, so the time is measured, not enforced.) The report lines
-- carry the measured times.
--
-- DENIED = no privilege or row security said no; REFUSED = a server rule raised.
-- ===========================================================================

do $verify$
declare
  v_u_admin  uuid := gen_random_uuid();
  v_skill    uuid := gen_random_uuid();
  v_parent   uuid;
  v_a        uuid := gen_random_uuid();
  v_b        uuid := gen_random_uuid();
  v_c        uuid := gen_random_uuid();
  v_good     jsonb := '[{"text":"right","is_correct":true},{"text":"wrong a","is_correct":false,"misconception_token":"x"},{"text":"wrong b","is_correct":false,"misconception_token":"y"},{"text":"wrong c","is_correct":false,"misconception_token":"z"}]';
  v_before   timestamptz;
  v_ms       text;
  v_t        text;
  v_report   text := '';
  v_total    integer := 0;
  v_failed   integer := 0;
begin
  -- Runs p_sql as a signed-in user and returns its single text result.
  execute $fn$
    create function pg_temp.v0045_as(p_uid uuid, p_sql text)
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

  -- Runs p_sql as a signed-in user and returns how long it took, in ms.
  execute $fn$
    create function pg_temp.v0045_ms(p_uid uuid, p_sql text)
    returns text
    language plpgsql
    as $body$
    declare
      v_start timestamptz := clock_timestamp();
      v_out   text;
    begin
      v_out := pg_temp.v0045_as(p_uid, p_sql);
      if v_out in ('DENIED', 'REFUSED') then return v_out; end if;
      return round(extract(epoch from clock_timestamp() - v_start) * 1000)::text;
    end;
    $body$
  $fn$;

  insert into auth.users (id, instance_id, aud, role, email, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values (v_u_admin, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
          'v0045-admin@verify0045.test', now(), '{}', '{}', now(), now());
  insert into public.platform_admins (user_id, note) values (v_u_admin, 'verify 0045');

  -- A reading skill with three drafts: A is clean, B has a spaced minus (a dash
  -- in reading, fine in math), C becomes blank-solution below.
  select id into v_parent from public.skills where level = 'subject' and subject = 'reading' order by created_at limit 1;
  insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, ccss_grade, ccss_grade_num)
  values (v_skill, 'skill', v_parent, 'reading', 'Verify Stored Checks', 'v0045-verify-stored-checks', 'k-2', '2', 2);
  insert into public.generated_questions (id, skill_id, difficulty, stem, choices, correct_answer, solution, status) values
    (v_a, v_skill, 'easy', 'Which word is a noun?', v_good, 'right', 'A noun names a thing.', 'draft'),
    (v_b, v_skill, 'easy', 'What is $3 - 2$?', v_good, 'right', 'Take away: $3 - 2 = 1$.', 'draft'),
    (v_c, v_skill, 'easy', 'Which word is a verb?', v_good, 'right', 'A verb names an action.', 'draft');

  create temp table v0045_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  -- Each check is its own statement, so it sees the changes made before it.
  insert into v0045_results (name, expected, actual) values
  ('table: question_checks exists with row security on', 'true',
     (select relrowsecurity::text from pg_class where oid = 'public.question_checks'::regclass));
  insert into v0045_results (name, expected, actual) values
  ('triggers: on questions and on skills', '2',
     (select count(*)::text from pg_trigger
       where tgname in ('trg_question_checks_on_question', 'trg_question_checks_on_skill') and not tgisinternal));
  insert into v0045_results (name, expected, actual) values
  ('stored: every question has a stored result', '0',
     (select count(*)::text from public.generated_questions q
       where not exists (select 1 from public.question_checks c where c.question_id = q.id)));
  insert into v0045_results (name, expected, actual) values
  ('stored: every stored result equals a fresh question_issues() (full data)', '0',
     (select count(*)::text from public.generated_questions q
        join public.question_checks c on c.question_id = q.id
       where c.issues is distinct from public.question_issues(q)));
  insert into v0045_results (name, expected, actual) values
  ('insert: a clean new draft is stored with no issues', '0',
     (select cardinality(issues)::text from public.question_checks where question_id = v_a));
  insert into v0045_results (name, expected, actual) values
  ('insert: a reading draft with a spaced minus is stored as a dash', 'no_dashes',
     (select array_to_string(issues, ',') from public.question_checks where question_id = v_b));

  update public.generated_questions set solution = '' where id = v_c;
  insert into v0045_results (name, expected, actual) values
  ('update: blanking a solution is stored at once', 'has_solution',
     (select array_to_string(issues, ',') from public.question_checks where question_id = v_c));

  select checked_at into v_before from public.question_checks where question_id = v_a;
  update public.generated_questions set difficulty = 'medium' where id = v_a;
  insert into v0045_results (name, expected, actual) values
  ('update: a change the checks do not read does not recompute', 'true',
     (select (checked_at = v_before)::text from public.question_checks where question_id = v_a));

  update public.skills set subject = 'math' where id = v_skill;
  insert into v0045_results (name, expected, actual) values
  ('skill: changing the subject to math recomputes (the minus is no longer a dash)', '0',
     (select cardinality(issues)::text from public.question_checks where question_id = v_b));

  insert into v0045_results (name, expected, actual) values
  ('queue: the fixture skill shows 2 ready and 1 failing', '2/1',
     pg_temp.v0045_as(v_u_admin,
       format('select drafts || ''/'' || drafts_failing from public.review_queue() where skill_id = %L', v_skill)));

  -- The new review_queue() gives the same counts as the old formula, on all
  -- data: one line per skill (id:ready/failing), compared as a whole.
  insert into v0045_results (name, expected, actual) values
  ('queue: same ready and failing counts as recomputing every check (full data)', 'same',
     (select case when old_fp is not distinct from new_fp then 'same'
                  else 'different (' || coalesce(length(old_fp), 0) || ' vs ' || coalesce(length(new_fp), 0) || ' chars)' end
        from (select
          (select string_agg(skill_id || ':' || ok || '/' || bad, ',' order by skill_id)
             from (select q.skill_id,
                          count(*) filter (where cardinality(public.question_issues(q)) = 0) as ok,
                          count(*) filter (where cardinality(public.question_issues(q)) > 0) as bad
                     from public.generated_questions q
                    where q.status = 'draft' and q.reviewed_at is null
                      and not exists (select 1 from public.question_fix_drafts f where f.draft_id = q.id)
                    group by q.skill_id) o) as old_fp,
          pg_temp.v0045_as(v_u_admin,
            'select string_agg(skill_id || '':'' || drafts || ''/'' || drafts_failing, '','' order by skill_id) from public.review_queue()') as new_fp
        ) f));

  -- Same for content_coverage(): the checks-passing totals match the old formula.
  insert into v0045_results (name, expected, actual) values
  ('coverage: checks passing match recomputing every check (full data)', 'same',
     (select case when old_n is not distinct from new_n then 'same' else old_n || ' vs ' || new_n end
        from (select
          (select sum(n)::text from (
             select count(q.id) filter (where q.status <> 'retired' and cardinality(public.question_issues(q)) = 0) as n
               from public.coverage_targets t
               left join public.skills k on k.slug = any (t.skill_slugs)
               left join public.generated_questions q
                 on q.skill_id = k.id
                and not (q.status = 'draft' and exists (select 1 from public.question_fix_drafts d where d.draft_id = q.id))
              group by t.subject, t.grade, t.grp, t.name, t.standards, t.skill_slugs, t.sort, t.target) s) as old_n,
          pg_temp.v0045_as(v_u_admin, 'select sum(checks_passing)::text from public.content_coverage()') as new_n
        ) f));

  -- Timing, as a signed-in platform admin, on the full data.
  v_ms := pg_temp.v0045_ms(v_u_admin, 'select count(*)::text from public.review_queue()');
  insert into v0045_results (name, expected, actual) values
  (format('speed: review_queue() as a signed-in admin, under 2 s (took %s ms; the API limit is 8 s)', v_ms), 'under 2 s',
     case when v_ms ~ '^\d+$' and v_ms::integer < 2000 then 'under 2 s' else v_ms || ' ms' end);
  v_ms := pg_temp.v0045_ms(v_u_admin, 'select count(*)::text from public.content_coverage()');
  insert into v0045_results (name, expected, actual) values
  (format('speed: content_coverage() as a signed-in admin, under 2 s (took %s ms)', v_ms), 'under 2 s',
     case when v_ms ~ '^\d+$' and v_ms::integer < 2000 then 'under 2 s' else v_ms || ' ms' end);

  insert into v0045_results (name, expected, actual) values
  ('grants: the pages can still call review_queue and content_coverage', 'true/true',
     has_function_privilege('authenticated', 'public.review_queue()', 'execute')::text || '/' ||
     has_function_privilege('authenticated', 'public.content_coverage()', 'execute')::text);
  insert into v0045_results (name, expected, actual) values
  ('signed in: stored results are unreadable from the browser', 'DENIED',
     pg_temp.v0045_as(v_u_admin, 'select count(*)::text from public.question_checks'));
  insert into v0045_results (name, expected, actual) values
  ('signed in: the refresh function is not callable', 'DENIED',
     pg_temp.v0045_as(v_u_admin, 'select public.question_checks_refresh()::text'));

  -- -------------------------------------------------------------------------
  -- Report, then roll everything back.
  -- -------------------------------------------------------------------------
  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0045_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0045 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0045 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
