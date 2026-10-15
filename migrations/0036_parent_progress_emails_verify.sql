-- ===========================================================================
-- 0036_parent_progress_emails_verify.sql
--
-- Checks for migration 0036. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0036 has committed, and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report and rolling back every fixture:
--
--     VERIFY 0036 PASSED: N of N checks
--     VERIFY 0036 FAILED: 2 of N checks failed
--
-- DENIED = no privilege or row security said no; REFUSED = a server rule raised.
-- ===========================================================================

do $verify$
declare
  v_u_parent uuid := gen_random_uuid();   -- paying parent with two children
  v_k_busy   uuid;                        -- "Vbusy": did things inside the window
  v_k_idle   uuid;                        -- "Vidle": last active before the window
  v_skill    uuid;
  v_from     timestamptz := now() - interval '7 days';
  v_to       timestamptz := now();
  v_t        text;
  v_report   text := '';
  v_total    integer := 0;
  v_failed   integer := 0;
begin
  execute $fn$
    create function pg_temp.v0036_as(p_uid uuid, p_sql text)
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
  values (v_u_parent, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
          'v0036-parent@verify0036.test', now(), '{}', '{}', now(), now());
  insert into public.students (parent_id, first_name, grade)
  values (v_u_parent, 'Vbusy', '10') returning id into v_k_busy;
  insert into public.students (parent_id, first_name, grade)
  values (v_u_parent, 'Vidle', '6') returning id into v_k_idle;

  select k.id into v_skill from public.skills k
   where k.level = 'skill' and k.subject = 'math' order by k.slug limit 1;

  -- Vbusy, inside the window: a reading session, 3 math check questions (2
  -- right), a diagnostic answer that must not count, a mastered skill and a
  -- finished SAT section.
  insert into public.sessions (student_id, subject, messages, updated_at)
  values (v_k_busy, 'reading', '[]', now() - interval '2 days');
  insert into public.question_attempts (student_id, skill_id, is_correct, created_at, is_diagnostic) values
    (v_k_busy, v_skill, true,  now() - interval '1 day', false),
    (v_k_busy, v_skill, true,  now() - interval '1 day', false),
    (v_k_busy, v_skill, false, now() - interval '1 day', false),
    (v_k_busy, v_skill, true,  now() - interval '1 day', true);
  insert into public.student_skill_mastery (student_id, skill_id, status, advanced_at, recheck_passed_at)
  values (v_k_busy, v_skill, 'mastered', now() - interval '10 days', now() - interval '1 day')
  on conflict (student_id, skill_id) do update
    set status = 'mastered', advanced_at = excluded.advanced_at, recheck_passed_at = excluded.recheck_passed_at;
  -- Attempts start in_progress, and only the finalize path (its flag, as
  -- prep_finalize_attempt sets it) may finish one (0016, 0017).
  insert into public.prep_attempts (student_id, module_id, section_id, mode, status)
  values (v_k_busy, 'sat', 'math-1', 'timed_section', 'in_progress'),
         (v_k_busy, 'sat', 'math-2', 'timed_section', 'in_progress');
  perform set_config('app.prep_finalize', '1', true);
  update public.prep_attempts set status = 'submitted', submitted_at = now() - interval '1 hour'
   where student_id = v_k_busy and section_id = 'math-1';
  perform set_config('app.prep_finalize', '', true);
  -- Vidle: active once, 20 days ago, outside the window.
  insert into public.sessions (student_id, subject, messages, updated_at)
  values (v_k_idle, 'math', '[]', now() - interval '20 days');

  create temp table v0036_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  create temp table v0036_act on commit drop as
    select * from public.parent_email_activity(v_from, v_to) a
     where a.student_id in (v_k_busy, v_k_idle);

  insert into v0036_results (name, expected, actual) values
  ('activity: both children listed', '2',
     (select count(*)::text from v0036_act)),
  ('activity: the busy child is active, the idle one is not', 'Vbusy:true,Vidle:false',
     (select string_agg(first_name || ':' || active, ',' order by first_name) from v0036_act)),
  ('activity: subjects from sessions and check questions', 'math,reading',
     (select array_to_string(subjects, ',') from v0036_act where student_id = v_k_busy)),
  ('activity: check questions exclude diagnostic answers', '2 of 3',
     (select checks_right || ' of ' || checks_answered from v0036_act where student_id = v_k_busy)),
  ('activity: the mastered skill is named', '1',
     (select cardinality(mastered)::text from v0036_act where student_id = v_k_busy)),
  ('activity: only the finished section counts as a test', 'sat/math-1',
     (select string_agg((t ->> 'module_id') || '/' || (t ->> 'section_id'), ',')
        from v0036_act a, jsonb_array_elements(a.tests) t where a.student_id = v_k_busy)),
  ('activity: the idle child carries their last active time', 'true',
     (select (last_active_at between now() - interval '21 days' and now() - interval '19 days')::text
        from v0036_act where student_id = v_k_idle)),
  ('activity: the account email comes along for the cron', 'v0036-parent@verify0036.test',
     (select distinct account_email from v0036_act)),
  ('activity: when each student was added comes along', '2',
     (select count(*)::text from v0036_act where created_at > now() - interval '1 minute'));

  -- -------------------------------------------------------------------------
  -- The send log and the suppression list.
  -- -------------------------------------------------------------------------
  insert into public.parent_email_sends (student_id, kind, period_start, period_end, recipient_type)
  values (v_k_busy, 'weekly', current_date - 7, current_date - 1, 'account');
  insert into v0036_results (name, expected, actual) values ('sends: a second weekly row for the same week is refused', 'REFUSED', null);
  begin
    insert into public.parent_email_sends (student_id, kind, period_start, period_end, recipient_type)
    values (v_k_busy, 'weekly', current_date - 7, current_date - 1, 'account');
    update v0036_results set actual = 'went through' where name like 'sends: a second%';
  exception when unique_violation then
    update v0036_results set actual = 'REFUSED' where name like 'sends: a second%';
  end;

  insert into v0036_results (name, expected, actual) values ('suppressions: a plain address is refused (hashes only)', 'REFUSED', null);
  begin
    insert into public.email_suppressions (email_hash) values ('someone@example.com');
    update v0036_results set actual = 'went through' where name like 'suppressions: a plain%';
  exception when check_violation then
    update v0036_results set actual = 'REFUSED' where name like 'suppressions: a plain%';
  end;
  insert into public.email_suppressions (email_hash)
  values (encode(extensions.digest('v0036-parent@verify0036.test', 'sha256'), 'hex'));
  insert into v0036_results (name, expected, actual) values
  ('suppressions: a SHA-256 hash is kept', '1',
     (select count(*)::text from public.email_suppressions
       where email_hash = encode(extensions.digest('v0036-parent@verify0036.test', 'sha256'), 'hex')));

  -- -------------------------------------------------------------------------
  -- Nobody but the service role reaches any of it.
  -- -------------------------------------------------------------------------
  insert into v0036_results (name, expected, actual) values
  ('parent: the activity function is refused', 'DENIED',
     pg_temp.v0036_as(v_u_parent, 'select count(*)::text from public.parent_email_activity(now() - interval ''7 days'', now())')),
  ('anon: the activity function is refused', 'DENIED',
     pg_temp.v0036_as(null, 'select count(*)::text from public.parent_email_activity(now() - interval ''7 days'', now())')),
  ('parent: the send log is unreadable', 'DENIED',
     pg_temp.v0036_as(v_u_parent, 'select count(*)::text from public.parent_email_sends')),
  ('parent: the suppression list is unreadable', 'DENIED',
     pg_temp.v0036_as(v_u_parent, 'select count(*)::text from public.email_suppressions')),
  ('parent: cannot unsubscribe someone else by writing the list', 'DENIED',
     pg_temp.v0036_as(v_u_parent, format(
       'with w as (insert into public.email_suppressions (email_hash) values (%L) returning 1) select count(*)::text from w',
       repeat('a', 64)))),
  ('service role: may run the activity function', 'true',
     has_function_privilege('service_role', 'public.parent_email_activity(timestamptz, timestamptz)', 'EXECUTE')::text);

  -- -------------------------------------------------------------------------
  -- Report, then roll everything back.
  -- -------------------------------------------------------------------------
  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0036_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0036 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0036 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
