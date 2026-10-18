-- ===========================================================================
-- 0042_question_fix_drafts_verify.sql
--
-- Checks for migration 0042. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0042 has committed, and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report and rolling back every fixture:
--
--     VERIFY 0042 PASSED: N of N checks
--     VERIFY 0042 FAILED: 2 of N checks failed
-- ===========================================================================

do $verify$
declare
  v_u      uuid := gen_random_uuid();
  v_skill  uuid := gen_random_uuid();
  v_parent uuid;
  v_orig   uuid := gen_random_uuid();
  v_draft  uuid := gen_random_uuid();
  v_good   jsonb := '[{"text":"right","is_correct":true},{"text":"wrong a","is_correct":false,"misconception_token":"x"},{"text":"wrong b","is_correct":false,"misconception_token":"y"},{"text":"wrong c","is_correct":false,"misconception_token":"z"}]';
  v_t      text;
  v_report text := '';
  v_total  integer := 0;
  v_failed integer := 0;
begin
  execute $fn$
    create function pg_temp.v0042_as(p_uid uuid, p_sql text)
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
  insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, ccss_grade, ccss_grade_num)
  values (v_skill, 'skill', v_parent, 'math', 'Verify Fix', 'v0042-verify-fix', 'k-2', '1', 1);
  insert into public.generated_questions (id, skill_id, difficulty, stem, choices, correct_answer, solution, status) values
    (v_orig,  v_skill, 'easy', 'What is 2 + 2 — the sum', v_good, 'right', 'Because the text says so.', 'published'),
    (v_draft, v_skill, 'easy', 'What is the sum of 2 and 2?', v_good, 'right', 'Because the text says so.', 'draft');

  create temp table v0042_results (n serial, name text, expected text, actual text) on commit drop;

  insert into public.question_fix_drafts (draft_id, original_id, reasons, changes)
  values (v_draft, v_orig, array['no_dashes', 'stem_ends'], 'Removed the dash and ended with a question mark.');

  insert into v0042_results (name, expected, actual) values
  ('a fix draft links to its original', 'no_dashes,stem_ends',
     (select array_to_string(reasons, ',') from public.question_fix_drafts where draft_id = v_draft)),
  ('the original is still published', 'published',
     (select status::text from public.generated_questions where id = v_orig)),
  ('a draft cannot replace itself', 'REFUSED', null),
  ('a fix needs at least one reason', 'REFUSED', null),
  ('signed in: unreadable', 'DENIED',
     pg_temp.v0042_as(v_u, 'select count(*)::text from public.question_fix_drafts')),
  ('anon: unreadable', 'DENIED',
     pg_temp.v0042_as(null, 'select count(*)::text from public.question_fix_drafts')),
  ('deleting the draft removes the link', '0', null);

  begin
    insert into public.question_fix_drafts (draft_id, original_id, reasons) values (v_orig, v_orig, array['x']);
    update v0042_results set actual = 'ALLOWED' where name = 'a draft cannot replace itself';
  exception when check_violation then
    update v0042_results set actual = 'REFUSED' where name = 'a draft cannot replace itself';
  end;
  begin
    insert into public.question_fix_drafts (draft_id, original_id, reasons) values (v_orig, v_draft, array[]::text[]);
    update v0042_results set actual = 'ALLOWED' where name = 'a fix needs at least one reason';
  exception when check_violation then
    update v0042_results set actual = 'REFUSED' where name = 'a fix needs at least one reason';
  end;

  delete from public.generated_questions where id = v_draft;
  update v0042_results set actual = (select count(*)::text from public.question_fix_drafts where draft_id = v_draft)
   where name = 'deleting the draft removes the link';

  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0042_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0042 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0042 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: it rolls back every fixture)\n\n' || v_report;
end
$verify$;
