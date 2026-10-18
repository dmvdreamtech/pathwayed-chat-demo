-- ===========================================================================
-- 0043_skill_review_verify.sql
--
-- Checks for migration 0043. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0043 has committed, and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report and rolling back every fixture:
--
--     VERIFY 0043 PASSED: N of N checks
--     VERIFY 0043 FAILED: 2 of N checks failed
-- ===========================================================================

do $verify$
declare
  v_admin  uuid := gen_random_uuid();
  v_admin2 uuid := gen_random_uuid();
  v_parent uuid := gen_random_uuid();
  v_pskill uuid;
  v_a      uuid := gen_random_uuid();   -- skill approved by a clean sample
  v_b      uuid := gen_random_uuid();   -- skill sent to full review
  v_c      uuid := gen_random_uuid();   -- skill with too few drafts
  v_rev    uuid;
  v_rev2   uuid;
  v_revb   uuid;
  v_flag   uuid;
  v_bad    uuid := gen_random_uuid();
  v_badb   uuid := gen_random_uuid();
  v_late   uuid := gen_random_uuid();
  v_orig   uuid := gen_random_uuid();
  v_fix    uuid := gen_random_uuid();
  v_orig2  uuid := gen_random_uuid();
  v_fix2   uuid := gen_random_uuid();
  v_good   jsonb := '[{"text":"right","is_correct":true},{"text":"wrong a","is_correct":false,"misconception_token":"x"},{"text":"wrong b","is_correct":false,"misconception_token":"y"},{"text":"wrong c","is_correct":false,"misconception_token":"z"}]';
  v_t      text;
  v_report text := '';
  v_total  integer := 0;
  v_failed integer := 0;
begin
  execute $fn$
    create function pg_temp.v0043_as(p_uid uuid, p_sql text)
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
        when others then v_out := 'REFUSED: ' || split_part(sqlerrm, ':', 1);
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
    (v_admin,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0043-admin@verify0043.test',  now(), '{}', '{}', now(), now()),
    (v_admin2, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0043-admin2@verify0043.test', now(), '{}', '{}', now(), now()),
    (v_parent, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'v0043-parent@verify0043.test', now(), '{}', '{}', now(), now());
  insert into public.platform_admins (user_id, note) values (v_admin, 'verify 0043'), (v_admin2, 'verify 0043');

  select id into v_pskill from public.skills where level = 'subject' and subject = 'math' order by created_at limit 1;
  insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, ccss_grade, ccss_grade_num) values
    (v_a, 'skill', v_pskill, 'math', 'Verify A', 'v0043-a', 'k-2', '1', 1),
    (v_b, 'skill', v_pskill, 'math', 'Verify B', 'v0043-b', 'k-2', '1', 1),
    (v_c, 'skill', v_pskill, 'math', 'Verify C', 'v0043-c', 'k-2', '1', 1);

  -- Skill A: 8 clean drafts, 1 failing draft, 1 live fix. Skill B: 6 clean. Skill C: 3 clean.
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status, created_at)
    select v_a, 'easy', 'Question A' || g || '?', v_good, 'right', 'Because.', 'draft', now() - interval '1 hour' from generate_series(1, 8) g;
  insert into public.generated_questions (id, skill_id, difficulty, stem, choices, correct_answer, solution, status, created_at)
    values (v_bad, v_a, 'easy', 'Question with a dash — here?', v_good, 'right', 'Because.', 'draft', now() - interval '1 hour');
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status, created_at)
    select v_b, 'easy', 'Question B' || g || '?', v_good, 'right', 'Because.', 'draft', now() - interval '1 hour' from generate_series(1, 6) g;
  insert into public.generated_questions (id, skill_id, difficulty, stem, choices, correct_answer, solution, status, created_at)
    values (v_badb, v_b, 'easy', 'Skill B question with a dash — here?', v_good, 'right', 'Because.', 'draft', now() - interval '1 hour');
  insert into public.generated_questions (skill_id, difficulty, stem, choices, correct_answer, solution, status, created_at)
    select v_c, 'easy', 'Question C' || g || '?', v_good, 'right', 'Because.', 'draft', now() - interval '1 hour' from generate_series(1, 3) g;
  insert into public.generated_questions (id, skill_id, difficulty, stem, choices, correct_answer, solution, status, created_at) values
    (v_orig,  v_a, 'easy', 'Live — question', v_good, 'right', 'Because.', 'published', now() - interval '1 hour'),
    (v_fix,   v_a, 'easy', 'Live question?',  v_good, 'right', 'Because.', 'draft',     now() - interval '1 hour'),
    (v_orig2, v_a, 'easy', 'Live — other',    v_good, 'right', 'Because.', 'published', now() - interval '1 hour'),
    (v_fix2,  v_a, 'easy', 'Live other?',     v_good, 'right', 'Because.', 'draft',     now() - interval '1 hour');
  insert into public.question_fix_drafts (draft_id, original_id, reasons) values
    (v_fix, v_orig, array['no_dashes']), (v_fix2, v_orig2, array['no_dashes']);

  create temp table v0043_results (n serial, name text, expected text, actual text) on commit drop;

  -- Access.
    insert into v0043_results (name, expected, actual) values ('parent: review queue refused', 'DENIED', pg_temp.v0043_as(v_parent, 'select count(*)::text from public.review_queue()'));
  insert into v0043_results (name, expected, actual) values ('anon: review queue refused', 'DENIED', pg_temp.v0043_as(null, 'select count(*)::text from public.review_queue()'));
  insert into v0043_results (name, expected, actual) values ('parent: cannot start a review', 'DENIED',
     pg_temp.v0043_as(v_parent, format('select public.start_skill_review(%L, %L)::text', v_a, 'Pat')));
  insert into v0043_results (name, expected, actual) values ('signed in: review log unreadable', 'DENIED', pg_temp.v0043_as(v_parent, 'select count(*)::text from public.skill_reviews'));
  insert into v0043_results (name, expected, actual) values ('admin: queue counts skill A drafts (fixes and failing apart)', '8 1 none',
     pg_temp.v0043_as(v_admin, format('select drafts || '' '' || drafts_failing || '' '' || state from public.review_queue() where skill_id = %L', v_a)));
  insert into v0043_results (name, expected, actual) values ('a review needs a reviewer name', 'REFUSED: reviewer_name_required',
     pg_temp.v0043_as(v_admin, format('select public.start_skill_review(%L, %L)::text', v_a, '  ')));
  insert into v0043_results (name, expected, actual) values ('too few drafts cannot be sampled', 'REFUSED: not_enough_drafts',
     pg_temp.v0043_as(v_admin, format('select public.start_skill_review(%L, %L)::text', v_c, 'Pat Lee')));

  -- Skill A: sample, reopen, approve.
  v_rev := pg_temp.v0043_as(v_admin, format('select public.start_skill_review(%L, %L)::text', v_a, 'Pat Lee'))::uuid;
  v_rev2 := pg_temp.v0043_as(v_admin, format('select public.start_skill_review(%L, %L)::text', v_a, 'Pat Lee'))::uuid;
  -- A draft added after the review started is not covered by it.
  insert into public.generated_questions (id, skill_id, difficulty, stem, choices, correct_answer, solution, status, created_at)
    values (v_late, v_a, 'easy', 'Late question?', v_good, 'right', 'Because.', 'draft', now() + interval '1 minute');

    insert into v0043_results (name, expected, actual) values ('a sample is 5 distinct passing drafts', '5',
     (select count(distinct s)::text from public.skill_reviews r, unnest(r.sampled_ids) s
       join public.generated_questions q on q.id = s
      where r.id = v_rev and cardinality(public.question_issues(q)) = 0 and q.skill_id = v_a));
  insert into v0043_results (name, expected, actual) values ('the sample never includes a live fix', '0',
     (select count(*)::text from public.skill_reviews r where r.id = v_rev and (v_fix = any (r.sampled_ids) or v_fix2 = any (r.sampled_ids))));
  insert into v0043_results (name, expected, actual) values ('reopening returns the same sample', 'true', (v_rev = v_rev2)::text);
  insert into v0043_results (name, expected, actual) values ('the review logs the reviewer and the sample', 'Pat Lee 5',
     (select reviewer || ' ' || cardinality(sampled_ids) from public.skill_reviews where id = v_rev));
  insert into v0043_results (name, expected, actual) values ('review items come back in sample order with the key', '5 right',
     pg_temp.v0043_as(v_admin, format('select count(*) || '' '' || min(correct_answer) from public.skill_review_items(%L)', v_rev)));
  insert into v0043_results (name, expected, actual) values ('another admin cannot finish it', 'REFUSED: only_the_reviewer_can_finish',
     pg_temp.v0043_as(v_admin2, format('select status from public.finish_skill_review(%L, %L::jsonb)', v_rev, '{}')));
  insert into v0043_results (name, expected, actual) values ('a flag outside the sample is refused', 'REFUSED: flag_not_in_sample',
     pg_temp.v0043_as(v_admin, format('select status from public.finish_skill_review(%L, %L::jsonb)', v_rev,
       json_build_object(v_bad::text, 'bad')::text)));
  insert into v0043_results (name, expected, actual) values ('5 clean approves and publishes the passing drafts', 'approved 8',
     pg_temp.v0043_as(v_admin, format('select status || '' '' || published from public.finish_skill_review(%L, %L::jsonb)', v_rev, '{}')));
  insert into v0043_results (name, expected, actual) values ('published drafts carry the reviewer and time', '8',
     (select count(*)::text from public.generated_questions where skill_id = v_a and status = 'published'
         and reviewed_by = 'Pat Lee' and reviewed_at is not null));
  insert into v0043_results (name, expected, actual) values ('the failing draft stays a draft', 'draft', (select status::text from public.generated_questions where id = v_bad));
  insert into v0043_results (name, expected, actual) values ('a draft added after the review started stays a draft', 'draft', (select status::text from public.generated_questions where id = v_late));
  insert into v0043_results (name, expected, actual) values ('live fixes are untouched by the skill approval', 'draft draft',
     (select string_agg(status::text, ' ') from public.generated_questions where id in (v_fix, v_fix2)));
  insert into v0043_results (name, expected, actual) values ('the approval logs 5 approved questions', '5',
     (select count(*)::text from public.question_reviews where skill_review_id = v_rev and outcome = 'approved'));
  insert into v0043_results (name, expected, actual) values ('a decided review cannot be finished again', 'REFUSED: review_already_decided',
     pg_temp.v0043_as(v_admin, format('select status from public.finish_skill_review(%L, %L::jsonb)', v_rev, '{}')));

  -- Skill B: one flag sends the whole skill to full review.
  v_revb := pg_temp.v0043_as(v_admin, format('select public.start_skill_review(%L, %L)::text', v_b, 'Pat Lee'))::uuid;
  select sampled_ids[1] into v_flag from public.skill_reviews where id = v_revb;
    insert into v0043_results (name, expected, actual) values ('a flag needs a note', 'REFUSED: flag_needs_a_note',
     pg_temp.v0043_as(v_admin, format('select status from public.finish_skill_review(%L, %L::jsonb)', v_revb,
       json_build_object(v_flag::text, ' ')::text)));
  insert into v0043_results (name, expected, actual) values ('one flag sends the skill to full review, nothing published', 'full_review 0 1',
     pg_temp.v0043_as(v_admin, format('select status || '' '' || published || '' '' || flagged from public.finish_skill_review(%L, %L::jsonb)', v_revb,
       json_build_object(v_flag::text, 'the key is wrong')::text)));
  insert into v0043_results (name, expected, actual) values ('skill B has no published questions', '0',
     (select count(*)::text from public.generated_questions where skill_id = v_b and status = 'published'));
  insert into v0043_results (name, expected, actual) values ('the flag is logged with its note', 'the key is wrong',
     (select note from public.question_reviews where question_id = v_flag and outcome = 'flagged'));
  insert into v0043_results (name, expected, actual) values ('a full-review skill cannot be resampled', 'REFUSED: skill_in_full_review',
     pg_temp.v0043_as(v_admin, format('select public.start_skill_review(%L, %L)::text', v_b, 'Pat Lee')));
  insert into v0043_results (name, expected, actual) values ('full review lists every waiting draft with the last flag', '7 the key is wrong',
     pg_temp.v0043_as(v_admin, format('select count(*) || '' '' || max(last_flag) from public.full_review_items(%L)', v_b)));
  insert into v0043_results (name, expected, actual) values ('full review approves one question', 'published',
     pg_temp.v0043_as(v_admin, format('select public.review_question(%L, %L, true)',
       (select id from public.generated_questions where skill_id = v_b and id <> v_flag and status = 'draft' limit 1), 'Pat Lee')));
  insert into v0043_results (name, expected, actual) values ('full review flags one question with a note', 'flagged',
     pg_temp.v0043_as(v_admin, format('select public.review_question(%L, %L, false, %L)', v_flag, 'Pat Lee', 'still wrong')));
  insert into v0043_results (name, expected, actual) values ('a flagged question stays a draft', 'draft', (select status::text from public.generated_questions where id = v_flag));
  insert into v0043_results (name, expected, actual) values ('single review is refused outside full review', 'REFUSED: skill_not_in_full_review',
     pg_temp.v0043_as(v_admin, format('select public.review_question(%L, %L, true)',
       (select id from public.generated_questions where skill_id = v_c limit 1), 'Pat Lee')));
  insert into v0043_results (name, expected, actual) values ('a draft that fails the checks cannot be approved', 'REFUSED: fails_checks',
     pg_temp.v0043_as(v_admin, format('select public.review_question(%L, %L, true)', v_badb, 'Pat Lee')));

  -- Live fixes.
    insert into v0043_results (name, expected, actual) values ('fix queue lists both fixes', '2',
     pg_temp.v0043_as(v_admin, 'select count(*)::text from public.fix_draft_queue() where skill_slug = ''v0043-a'''));
  insert into v0043_results (name, expected, actual) values ('approving a fix publishes it', 'published',
     pg_temp.v0043_as(v_admin, format('select public.decide_fix_draft(%L, %L, true)', v_fix, 'Pat Lee')));
  insert into v0043_results (name, expected, actual) values ('approving a fix retires the original', 'retired', (select status::text from public.generated_questions where id = v_orig));
  insert into v0043_results (name, expected, actual) values ('a rejected fix needs a note', 'REFUSED: flag_needs_a_note',
     pg_temp.v0043_as(v_admin, format('select public.decide_fix_draft(%L, %L, false)', v_fix2, 'Pat Lee')));
  insert into v0043_results (name, expected, actual) values ('rejecting a fix retires the draft', 'rejected',
     pg_temp.v0043_as(v_admin, format('select public.decide_fix_draft(%L, %L, false, %L)', v_fix2, 'Pat Lee', 'meaning changed')));
  insert into v0043_results (name, expected, actual) values ('rejecting a fix keeps the original published', 'published retired',
     (select (select status::text from public.generated_questions where id = v_orig2) || ' ' ||
             (select status::text from public.generated_questions where id = v_fix2)));
  insert into v0043_results (name, expected, actual) values ('a decided fix cannot be decided again', 'REFUSED: fix_already_decided',
     pg_temp.v0043_as(v_admin, format('select public.decide_fix_draft(%L, %L, true)', v_fix, 'Pat Lee')));
  insert into v0043_results (name, expected, actual) values ('parent: cannot decide a fix', 'DENIED',
     pg_temp.v0043_as(v_parent, format('select public.decide_fix_draft(%L, %L, true)', v_fix2, 'Pat')));
  insert into v0043_results (name, expected, actual) values ('fix decisions are logged', 'fix_approved,fix_rejected',
     (select string_agg(outcome, ',' order by outcome) from public.question_reviews where question_id in (v_fix, v_fix2)));

  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0043_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0043 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0043 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
