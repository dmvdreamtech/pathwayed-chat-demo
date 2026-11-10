-- ===========================================================================
-- 0046_vocabulary_coverage_verify.sql
--
-- Checks for migration 0046. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0046 has committed, and run it once.
--
-- One statement (a DO block). It ALWAYS ends with an error, on purpose, carrying
-- the report, so nothing it does can persist:
--
--     VERIFY 0046 PASSED: N of N checks
--     VERIFY 0046 FAILED: k of N checks failed | <each failure>
--
-- It writes nothing. The read-as-a-student check switches to the authenticated
-- role for one query and switches back.
-- ===========================================================================

do $verify$
declare
  v_total   int := 0;
  v_failed  int := 0;
  v_report  text := '';
  v_n       int;
  v_role    text := current_user;
  r         record;
begin
  -- ---- 1. The three skills, with the right band and grade ------------------
  for r in
    select * from (values
      ('read-gk-vocabulary',            'k-2',  'K', 0, 'audio_picture'),
      ('read-g6-vocabulary-in-context', '6-8',  '6', 6, 'text'),
      ('read-g9-vocabulary-in-context', '9-12', '9', 9, 'text')
    ) as t (slug, band, grade, grade_num, render_mode)
  loop
    v_total := v_total + 1;
    select count(*) into v_n from public.skills s
     where s.slug = r.slug and s.level = 'skill' and s.subject = 'reading'
       and s.grade_band::text = r.band and s.ccss_grade = r.grade and s.ccss_grade_num = r.grade_num
       and s.sat_skill_code is null;
    if v_n <> 1 then
      v_failed := v_failed + 1;
      v_report := v_report || format(' | %s: skill row missing or wrong band/grade', r.slug);
    end if;

    -- ---- 2. Exactly 40 questions, all published --------------------------
    v_total := v_total + 1;
    select count(*) into v_n from public.generated_questions q
      join public.skills s on s.id = q.skill_id
     where s.slug = r.slug and q.status = 'published';
    if v_n <> 40 then
      v_failed := v_failed + 1;
      v_report := v_report || format(' | %s: %s published questions, expected 40', r.slug, v_n);
    end if;

    -- ---- 3. Format: render mode, one correct choice, key matches it -------
    v_total := v_total + 1;
    select count(*) into v_n from public.generated_questions q
      join public.skills s on s.id = q.skill_id
     where s.slug = r.slug
       and (coalesce(q.render_mode, 'text') <> r.render_mode
            or (select count(*) from jsonb_array_elements(q.choices) c where (c ->> 'is_correct')::boolean) <> 1
            or not exists (select 1 from jsonb_array_elements(q.choices) c
                            where (c ->> 'is_correct')::boolean and c ->> 'text' = q.correct_answer)
            or jsonb_array_length(q.choices) not between 2 and 4
            or (r.render_mode = 'text' and jsonb_array_length(q.choices) <> 4)
            or q.passage_id is not null);
    if v_n <> 0 then
      v_failed := v_failed + 1;
      v_report := v_report || format(' | %s: %s questions with a bad format or answer key', r.slug, v_n);
    end if;

    -- ---- 4. The browser copy of the choices hides the answer --------------
    v_total := v_total + 1;
    select count(*) into v_n from public.generated_questions q
      join public.skills s on s.id = q.skill_id
     where s.slug = r.slug
       and (q.choices_public is null
            or jsonb_array_length(q.choices_public) <> jsonb_array_length(q.choices)
            or exists (select 1 from jsonb_array_elements(q.choices_public) c
                        where c ? 'is_correct' or c ? 'misconception_token'));
    if v_n <> 0 then
      v_failed := v_failed + 1;
      v_report := v_report || format(' | %s: %s questions leak the answer in choices_public', r.slug, v_n);
    end if;

    -- ---- 5. The automated question checks (0040/0044) find nothing --------
    v_total := v_total + 1;
    select count(*) into v_n from public.generated_questions q
      join public.skills s on s.id = q.skill_id
     where s.slug = r.slug and cardinality(public.question_issues(q)) > 0;
    if v_n <> 0 then
      v_failed := v_failed + 1;
      v_report := v_report || format(' | %s: %s questions fail question_issues()', r.slug, v_n);
    end if;
  end loop;

  -- ---- 6. A signed-in student can read the sets (grant + policy) -----------
  v_total := v_total + 1;
  perform set_config('role', 'authenticated', true);
  select count(*) into v_n from public.generated_questions q
   where q.skill_id in (select id from public.skills
                         where slug in ('read-gk-vocabulary', 'read-g6-vocabulary-in-context', 'read-g9-vocabulary-in-context'));
  perform set_config('role', v_role, true);
  if v_n <> 120 then
    v_failed := v_failed + 1;
    v_report := v_report || format(' | authenticated read sees %s of 120 questions', v_n);
  end if;

  -- ---- 7. ...but never the answer key column -------------------------------
  v_total := v_total + 1;
  if has_column_privilege('authenticated', 'public.generated_questions', 'correct_answer', 'select')
     or has_column_privilege('authenticated', 'public.generated_questions', 'choices', 'select') then
    v_failed := v_failed + 1;
    v_report := v_report || ' | authenticated can read correct_answer or choices';
  end if;

  -- ---- 8. Prep: HSPT and ISEE reading sections list the new skill ----------
  v_total := v_total + 1;
  select count(*) into v_n from public.prep_section_config
   where (module_id, section_id) in (('hspt', 'reading'), ('isee', 'reading-comprehension'))
     and 'read-g6-vocabulary-in-context' = any (skill_slugs);
  if v_n <> 2 then
    v_failed := v_failed + 1;
    v_report := v_report || format(' | prep_section_config: %s of 2 reading sections list read-g6-vocabulary-in-context', v_n);
  end if;

  -- ---- 9. Prep: no section names a skill that does not exist ---------------
  v_total := v_total + 1;
  select count(*) into v_n
    from public.prep_section_config c, unnest(c.skill_slugs) as u(slug)
   where not exists (select 1 from public.skills s where s.slug = u.slug);
  if v_n <> 0 then
    v_failed := v_failed + 1;
    v_report := v_report || format(' | prep_section_config names %s missing skill slug(s)', v_n);
  end if;

  -- ---- 10. Prep: all 14 sections (HSPT, ISEE, SAT) still list skills ---------
  v_total := v_total + 1;
  select count(*) into v_n from public.prep_section_config where cardinality(skill_slugs) > 0;
  if v_n <> 14 then
    v_failed := v_failed + 1;
    v_report := v_report || format(' | prep_section_config: %s of 14 sections have skills', v_n);
  end if;

  -- ---- 11. The reported case: grade 6-8 now has published vocabulary --------
  v_total := v_total + 1;
  select count(*) into v_n from public.generated_questions q
    join public.skills s on s.id = q.skill_id
   where s.grade_band = '6-8' and s.subject = 'reading' and q.status = 'published'
     and s.slug = 'read-g6-vocabulary-in-context';
  if v_n < 40 then
    v_failed := v_failed + 1;
    v_report := v_report || format(' | grade 6-8 vocabulary has %s published questions', v_n);
  end if;

  if v_failed = 0 then
    raise exception 'VERIFY 0046 PASSED: % of % checks', v_total, v_total;
  else
    raise exception 'VERIFY 0046 FAILED: % of % checks failed%', v_failed, v_total, v_report;
  end if;
end
$verify$;
