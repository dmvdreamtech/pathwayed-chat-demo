-- ===========================================================================
-- 0033_server_side_answer_keys_verify.sql
--
-- Checks for migration 0033. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0033 has committed, and run it once.
--
-- One statement (a DO block). It builds throwaway fixtures (a family on a free
-- trial, a family whose trial has ended, an ended-trial family with a prep
-- entitlement, a school-covered student, a second family, a throwaway prep
-- module with its own section settings and questions), signs in as each of them
-- and tries to read answer keys, answer questions, and start, resume, finish
-- and review a timed section, exactly as PostgREST would run it.
--
-- IT ALWAYS ENDS WITH AN ERROR, ON PURPOSE. The final RAISE carries the report
-- and rolls the whole block back, so no fixture survives:
--
--     VERIFY 0033 PASSED: N of N checks
--     VERIFY 0033 FAILED: 2 of N checks failed
--
-- DENIED  = no privilege, or row security said no
-- REFUSED = a server rule raised an error
-- ===========================================================================

do $verify$
declare
  v_u_trial   uuid := gen_random_uuid();  -- parent, trial running
  v_u_expired uuid := gen_random_uuid();  -- parent, trial ended, no plan
  v_u_prep    uuid := gen_random_uuid();  -- parent, trial ended, prep entitlement
  v_u_cov     uuid := gen_random_uuid();  -- school-covered student's own sign-in
  v_u_other   uuid := gen_random_uuid();  -- a second family

  v_k_trial   uuid;
  v_k_expired uuid;
  v_k_prep    uuid;
  v_k_cov     uuid;
  v_k_other   uuid;

  v_skill     uuid;   -- in the throwaway module's section
  v_skill2    uuid;   -- in no prep module
  v_q         uuid;   -- one of six questions on v_skill: choice 0 right
  v_q2        uuid;   -- the question on v_skill2
  v_i         integer;
  v_t         text;
  v_report    text := '';
  v_total     integer := 0;
  v_failed    integer := 0;
begin
  execute $fn$
    create function pg_temp.v0033_as(p_uid uuid, p_sql text)
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
  -- Fixtures (trusted role).
  -- -------------------------------------------------------------------------
  insert into auth.users (id, instance_id, aud, role, email, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values
    (v_u_trial,   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0033-trial@verify0033.test',   now(), '{}', '{}', now(), now()),
    (v_u_expired, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0033-expired@verify0033.test', now(), '{}', '{}', now(), now()),
    (v_u_prep,    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0033-prep@verify0033.test',    now(), '{}', '{}', now(), now()),
    (v_u_cov,     '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0033-cov@verify0033.test',     now(), '{}', '{}', now(), now()),
    (v_u_other,   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0033-other@verify0033.test',   now(), '{}', '{}', now(), now());

  update public.profiles set subscription_status = 'free_trial', trial_end = now() + interval '5 days'
   where id in (v_u_trial, v_u_other);
  update public.profiles set subscription_status = 'expired', trial_end = now() - interval '5 days'
   where id in (v_u_expired, v_u_prep);
  update public.profiles set subscription_status = 'inactive', trial_end = null where id = v_u_cov;

  insert into public.students (parent_id, first_name, grade) values (v_u_trial, 'Vtrial', '9') returning id into v_k_trial;
  insert into public.students (parent_id, first_name, grade) values (v_u_expired, 'Vexpired', '9') returning id into v_k_expired;
  insert into public.students (parent_id, first_name, grade) values (v_u_prep, 'Vprep', '9') returning id into v_k_prep;
  insert into public.students (parent_id, first_name, grade) values (v_u_other, 'Vother', '9') returning id into v_k_other;
  insert into public.students (parent_id, first_name, grade, school_covered, dean_student_id)
  values (v_u_cov, 'Vcov', '10', true, 'v0033-dean') returning id into v_k_cov;

  insert into public.skills (level, subject, name, slug, ccss_grade_num)
  values ('skill', 'math', 'V0033 skill', 'v0033-skill', 9) returning id into v_skill;
  insert into public.skills (level, subject, name, slug, ccss_grade_num)
  values ('skill', 'math', 'V0033 other skill', 'v0033-other', 9) returning id into v_skill2;

  for v_i in 1..6 loop
    insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status)
    values (v_skill, 'easy', 'V0033 question ' || v_i,
            '[{"text":"A","is_correct":true},{"text":"B","is_correct":false,"misconception_token":"v0033-wrong"},{"text":"C","is_correct":false,"misconception_token":"v0033-other-wrong"}]',
            'A', 'Because A', 'published')
    returning id into v_q;
  end loop;
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status)
  values (v_skill2, 'easy', 'V0033 other question',
          '[{"text":"X","is_correct":true},{"text":"Y","is_correct":false}]', 'X', 'Because X', 'published')
  returning id into v_q2;

  insert into public.prep_section_config (module_id, section_id, question_count, time_limit_sec, skill_slugs, is_essay) values
    ('v0033mod', 'v0033sec',   6, 600, array['v0033-skill'], false),
    ('v0033mod', 'v0033essay', 1, 900, array['v0033-skill'], true);

  insert into public.prep_entitlements (student_id, module_id, status) values
    (v_k_trial, 'v0033mod', 'active'),
    (v_k_prep,  'v0033mod', 'active');

  create temp table v0033_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  -- -------------------------------------------------------------------------
  -- Catalog.
  -- -------------------------------------------------------------------------
  insert into v0033_results (name, expected, actual) values
  ('grants: browser cannot read choices, correct_answer or solution', '0',
     (select count(*)::text from (values ('choices'), ('correct_answer'), ('solution')) c(col)
       where has_column_privilege('authenticated', 'public.generated_questions', c.col, 'SELECT'))),
  ('grants: browser can read choices_public', 'true',
     has_column_privilege('authenticated', 'public.generated_questions', 'choices_public', 'SELECT')::text),
  ('grants: browser cannot read question_templates', 'false',
     has_table_privilege('authenticated', 'public.question_templates', 'SELECT')::text),
  ('grants: browser cannot read prep_section_config', 'false',
     has_table_privilege('authenticated', 'public.prep_section_config', 'SELECT')::text),
  ('data: no public choice anywhere carries a key or a token', '0',
     (select count(*)::text from public.generated_questions g, jsonb_array_elements(g.choices_public) e
       where e ? 'is_correct' or e ? 'misconception_token')),
  ('data: public choices keep every choice, in order', '0',
     (select count(*)::text from public.generated_questions g
       where jsonb_array_length(g.choices_public) <> jsonb_array_length(g.choices)
          or exists (select 1 from jsonb_array_elements(g.choices) with ordinality a(v, i)
                      where a.v ->> 'text' is distinct from g.choices_public -> (a.i::int - 1) ->> 'text'))),
  ('data: section settings seeded for all three tests', '14',
     (select count(*)::text from public.prep_section_config where module_id in ('hspt', 'isee', 'sat'))),
  ('functions: browser can call the four new entry points', '4',
     (select count(*)::text from (values
        ('public.submit_answer(uuid,uuid,integer,integer,boolean)'), ('public.prep_start_section(uuid,text,text)'),
        ('public.prep_essay_start(uuid,text,text)'), ('public.prep_attempt_review(uuid)')) f(sig)
       where has_function_privilege('authenticated', f.sig, 'EXECUTE')
         and not has_function_privilege('anon', f.sig, 'EXECUTE'))),
  ('functions: browser cannot call the access checks directly', '0',
     (select count(*)::text from (values
        ('public.account_has_learning_access(uuid)'), ('public.student_has_learning_access(uuid)'),
        ('public.has_prep_access(uuid,text)'), ('public.can_practice_skill(uuid,uuid)')) f(sig)
       where has_function_privilege('authenticated', f.sig, 'EXECUTE'))),
  ('functions: the browser-chosen time limit and question list are gone', '0',
     (select count(*)::text from pg_proc p join pg_namespace n on n.oid = p.pronamespace
       where n.nspname = 'public'
         and ((p.proname = 'prep_start_section' and p.pronargs = 5)
           or (p.proname = 'prep_essay_start' and pg_get_function_identity_arguments(p.oid) like '%integer%')))),
  ('access: trial, ended trial, prep-only, covered', 'true/false/false/true',
     (select public.account_has_learning_access(v_u_trial)::text || '/' || public.account_has_learning_access(v_u_expired)::text
             || '/' || public.account_has_learning_access(v_u_prep)::text || '/' || public.account_has_learning_access(v_u_cov)::text));

  -- -------------------------------------------------------------------------
  -- Reading answer keys, as a signed-in family.
  -- -------------------------------------------------------------------------
  insert into v0033_results (name, expected, actual) values
  ('student: read choices', 'DENIED',
     pg_temp.v0033_as(v_u_trial, format('select choices::text from public.generated_questions where id = %L', v_q))),
  ('student: read correct_answer', 'DENIED',
     pg_temp.v0033_as(v_u_trial, format('select correct_answer from public.generated_questions where id = %L', v_q))),
  ('student: read solution', 'DENIED',
     pg_temp.v0033_as(v_u_trial, format('select solution from public.generated_questions where id = %L', v_q))),
  ('student: select * from questions', 'DENIED',
     pg_temp.v0033_as(v_u_trial, format('select g::text from public.generated_questions g where id = %L', v_q))),
  ('student: read question_templates', 'DENIED',
     pg_temp.v0033_as(v_u_trial, 'select count(*)::text from public.question_templates')),
  ('student: read section settings', 'DENIED',
     pg_temp.v0033_as(v_u_trial, 'select count(*)::text from public.prep_section_config')),
  ('student: public choices show text only', '["A", "B", "C"]/false',
     pg_temp.v0033_as(v_u_trial, format(
       'select (select jsonb_agg(e ->> ''text'') from jsonb_array_elements(choices_public) e)::text || ''/''
            || (choices_public::text like ''%%is_correct%%'' or choices_public::text like ''%%v0033-wrong%%'')::text
          from public.generated_questions where id = %L', v_q))),
  ('student: ended-trial family can still read question text (placement)', '1',
     pg_temp.v0033_as(v_u_expired, format('select count(*)::text from public.generated_questions where id = %L', v_q))),
  ('anon: read questions', 'DENIED',
     pg_temp.v0033_as(null, 'select count(*)::text from public.generated_questions')),
  ('anon: submit an answer', 'DENIED',
     pg_temp.v0033_as(null, format('select public.submit_answer(%L, %L, 0)::text', v_k_trial, v_q)));

  -- -------------------------------------------------------------------------
  -- Answering: the verdict comes back only after the answer is recorded.
  -- -------------------------------------------------------------------------
  insert into v0033_results (name, expected, actual) values
  ('student: wrong answer returns the verdict', 'false/0/A/v0033-wrong/Because A',
     pg_temp.v0033_as(v_u_trial, format(
       'select (r->>''is_correct'') || ''/'' || (r->>''correct_index'') || ''/'' || (r->>''correct_answer'') || ''/''
            || (r->>''misconception_token'') || ''/'' || (r->>''solution'')
          from (select public.submit_answer(%L, %L, 1, 12000) r) s', v_k_trial, v_q))),
  ('student: right answer returns correct', 'true',
     pg_temp.v0033_as(v_u_trial, format(
       'select public.submit_answer(%L, %L, 0, 9000) ->> ''is_correct''', v_k_trial, v_q))),
  ('student: placement answer returns right or wrong only', 'false/false/false',
     pg_temp.v0033_as(v_u_trial, format(
       'select (r->>''is_correct'') || ''/'' || (r ? ''correct_index'')::text || ''/'' || (r ? ''solution'')::text
          from (select public.submit_answer(%L, %L, 2, 9000, true) r) s', v_k_trial, v_q))),
  ('student: answer for another family''s child', 'REFUSED',
     pg_temp.v0033_as(v_u_trial, format('select public.submit_answer(%L, %L, 0)::text', v_k_other, v_q))),
  ('ended trial: practice answer', 'REFUSED',
     pg_temp.v0033_as(v_u_expired, format('select public.submit_answer(%L, %L, 0)::text', v_k_expired, v_q))),
  ('ended trial: placement answer still works', 'true',
     pg_temp.v0033_as(v_u_expired, format('select public.submit_answer(%L, %L, 0, 5000, true) ->> ''is_correct''', v_k_expired, v_q))),
  ('prep-only: practice on a skill its module uses', 'true',
     pg_temp.v0033_as(v_u_prep, format('select public.submit_answer(%L, %L, 0) ->> ''is_correct''', v_k_prep, v_q))),
  ('prep-only: practice on a skill no entitled module uses', 'REFUSED',
     pg_temp.v0033_as(v_u_prep, format('select public.submit_answer(%L, %L, 0)::text', v_k_prep, v_q2))),
  ('covered student: practice answer', 'false',
     pg_temp.v0033_as(v_u_cov, format('select public.submit_answer(%L, %L, 1) ->> ''is_correct''', v_k_cov, v_q)));
  insert into v0033_results (name, expected, actual) values
  ('stored: answers graded by the server, with server time', 'false,true/0',
     (select string_agg(qa.is_correct::text, ',' order by qa.chosen_choice_index desc) || '/'
             || count(*) filter (where qa.created_at < now() - interval '1 minute')::text
        from public.question_attempts qa
       where qa.student_id = v_k_trial and not qa.is_diagnostic));

  -- -------------------------------------------------------------------------
  -- Timed sections: the server picks questions and time; keys only at the end.
  -- -------------------------------------------------------------------------
  insert into v0033_results (name, expected, actual) values
  ('ended trial without entitlement: start a section', 'REFUSED',
     pg_temp.v0033_as(v_u_expired, format('select public.prep_start_section(%L, ''v0033mod'', ''v0033sec'')::text', v_k_expired))),
  ('student: send a time limit and question list (old call)', 'REFUSED',
     pg_temp.v0033_as(v_u_trial, format(
       'select public.prep_start_section(%L, ''v0033mod'', ''v0033sec'', 99999, ''[]''::jsonb)::text', v_k_trial))),
  ('student: start a section', 'in_progress/600/6/6',
     pg_temp.v0033_as(v_u_trial, format(
       'select (r->>''status'') || ''/'' || (r->>''time_limit_sec'') || ''/'' || jsonb_array_length(r->''question_ids'')::text || ''/''
            || (select count(*) from jsonb_array_elements_text(r->''question_ids'') q
                 join public.generated_questions g on g.id = q::uuid where g.skill_id = %L)::text
          from (select public.prep_start_section(%L, ''v0033mod'', ''v0033sec'') r) s', v_skill, v_k_trial))),
  ('student: unknown section', 'REFUSED',
     pg_temp.v0033_as(v_u_trial, format('select public.prep_start_section(%L, ''v0033mod'', ''nope'')::text', v_k_trial)));
  insert into v0033_results (name, expected, actual) values
  ('student: starting again resumes the same attempt', 'same',
     (select case when pg_temp.v0033_as(v_u_trial, format(
               'select public.prep_start_section(%L, ''v0033mod'', ''v0033sec'') ->> ''id''', v_k_trial)) = a.id::text
             then 'same' else 'different' end
        from public.prep_attempts a where a.student_id = v_k_trial and a.module_id = 'v0033mod')),
  ('student: review keys while the section is running', 'REFUSED',
     (select pg_temp.v0033_as(v_u_trial, format('select public.prep_attempt_review(%L)::text', a.id))
        from public.prep_attempts a where a.student_id = v_k_trial and a.module_id = 'v0033mod'));
  insert into v0033_results (name, expected, actual) values
  ('student: finish the section', 'submitted',
     (select pg_temp.v0033_as(v_u_trial, format('select public.prep_finalize_attempt(%L) ->> ''status''', a.id))
        from public.prep_attempts a where a.student_id = v_k_trial and a.module_id = 'v0033mod'));
  insert into v0033_results (name, expected, actual) values
  ('student: review keys once finished', '6/0/A/3',
     (select pg_temp.v0033_as(v_u_trial, format(
               'select jsonb_array_length(r->''keys'')::text || ''/'' || (r->''keys''->0->>''correct_index'') || ''/''
                    || (r->''keys''->0->>''correct_answer'') || ''/'' || jsonb_array_length(r->''keys''->0->''tokens'')::text
                  from (select public.prep_attempt_review(%L) r) s', a.id))
        from public.prep_attempts a where a.student_id = v_k_trial and a.module_id = 'v0033mod')),
  ('other family: review someone else''s section', 'REFUSED',
     (select pg_temp.v0033_as(v_u_other, format('select public.prep_attempt_review(%L)::text', a.id))
        from public.prep_attempts a where a.student_id = v_k_trial and a.module_id = 'v0033mod')),
  ('student: start the essay, time from the server', '900',
     pg_temp.v0033_as(v_u_trial, format(
       'select public.prep_essay_start(%L, ''v0033mod'', ''v0033-prompt'') ->> ''time_limit_sec''', v_k_trial))),
  ('ended trial without entitlement: start the essay', 'REFUSED',
     pg_temp.v0033_as(v_u_expired, format(
       'select public.prep_essay_start(%L, ''v0033mod'', ''v0033-prompt'')::text', v_k_expired))),
  ('student: send an essay time limit (old call)', 'REFUSED',
     pg_temp.v0033_as(v_u_trial, format(
       'select public.prep_essay_start(%L, ''v0033-prompt'', 99999)::text', v_k_trial)));

  -- -------------------------------------------------------------------------
  -- Report, then roll everything back.
  -- -------------------------------------------------------------------------
  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0033_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0033 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0033 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
