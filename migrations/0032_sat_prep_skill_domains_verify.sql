-- ===========================================================================
-- 0032_sat_prep_skill_domains_verify.sql
--
-- Checks for migration 0032. Paste the whole file into the Supabase SQL editor
-- for papiowjjoyhnbyhgtbxq AFTER 0032 has committed, and run it once.
--
-- One statement (a DO block) that only reads. It ends with an error ON PURPOSE,
-- carrying the report:
--
--     VERIFY 0032 PASSED: 6 of 6 checks
--     VERIFY 0032 FAILED: 1 of 6 checks failed
--
-- followed by one line per check. "SAT-level" is the engine's rule
-- (isSatLevelSkill in src/lib/readinessEngine.ts): a skill-level row with a
-- known SAT domain that is grade 6 or above, or a prep-* skill mapped to an SAT
-- domain.
-- ===========================================================================

do $verify$
declare
  v_report text := '';
  v_total  integer := 0;
  v_failed integer := 0;
  v_t      text;
begin
  create temp table v0032_results (
    n        serial,
    name     text,
    expected text,
    actual   text
  ) on commit drop;

  create temp table v0032_sat_level on commit drop as
  select s.slug, s.sat_alignment
    from public.skills s
   where s.level = 'skill'
     and s.sat_alignment in ('algebra', 'advanced-math', 'problem-solving-data-analysis',
                             'geometry-trigonometry', 'information-and-ideas', 'craft-and-structure',
                             'expression-of-ideas', 'standard-english-conventions')
     and (s.subject like 'prep-%' or coalesce(s.ccss_grade_num, -1) >= 6);

  insert into v0032_results (name, expected, actual) values
  ('SAT Words in Context maps to Craft & Structure', 'craft-and-structure',
     (select coalesce(s.sat_alignment, 'null') from public.skills s where s.slug = 'prep-sat-words-in-context')),
  ('SAT Transitions maps to Expression of Ideas', 'expression-of-ideas',
     (select coalesce(s.sat_alignment, 'null') from public.skills s where s.slug = 'prep-sat-transitions')),
  ('no other prep skill gained an SAT domain', '2',
     (select count(*)::text from public.skills s where s.subject like 'prep-%' and s.sat_alignment is not null)),
  ('every SAT domain has at least one SAT-level skill', '8',
     (select count(distinct v.sat_alignment)::text from v0032_sat_level v)),
  ('SAT-level skills per domain',
     'advanced-math 13, algebra 12, craft-and-structure 1, expression-of-ideas 2, geometry-trigonometry 10, information-and-ideas 1, problem-solving-data-analysis 9, standard-english-conventions 4',
     (select string_agg(x.sat_alignment || ' ' || x.n, ', ' order by x.sat_alignment)
        from (select v.sat_alignment, count(*)::text as n from v0032_sat_level v group by 1) x)),
  ('SAT-level skills in total', '52',
     (select count(*)::text from v0032_sat_level));

  select count(*), count(*) filter (where r.actual is distinct from r.expected),
         string_agg(
           case when r.actual is not distinct from r.expected then 'PASS  ' else 'FAIL  ' end
             || r.name || '  (expected ' || r.expected || ', got ' || coalesce(r.actual, 'null') || ')',
           E'\n' order by r.n)
    into v_total, v_failed, v_report
    from v0032_results r;

  if v_failed = 0 then
    v_t := format('VERIFY 0032 PASSED: %s of %s checks', v_total, v_total);
  else
    v_t := format('VERIFY 0032 FAILED: %s of %s checks failed', v_failed, v_total);
  end if;

  raise exception '%', v_t || E'\n(this error is expected: the verify only reads, and rolls back its temp objects)\n\n' || v_report;
end
$verify$;
