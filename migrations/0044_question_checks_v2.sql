-- ===========================================================================
-- 0044_question_checks_v2.sql
--
-- The automated question checks, second version. Live already has 0040 as it
-- was first applied; this replaces only question_issues(), so 0040 itself is
-- never re-run.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once, AFTER 0040, 0041, 0042 and 0043. Idempotent. Then run
-- 0044_question_checks_v2_verify.sql.
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES
-- ---------------------------------------------------------------------------
--  generated_questions.teaches_punctuation   New flag, default false. When
--      true, the no-dash check skips that one item, because the item teaches
--      dashes. Set here on the 6 live dash-teaching items (Advanced Punctuation
--      and Commas & End Punctuation). Not readable from the browser.
--  question_issues(q)   Accepts the formats live questions use on purpose:
--      - K-2 picture items (render_mode audio_picture): 2 to 4 tile choices, a
--        spoken instruction for a stem, and no named mistake on wrong tiles
--        (by design, a wrong tap gets warm spoken feedback, not a hint);
--      - fill-in-the-blank stems that end at the blank;
--      - instructions that end with a period ("Solve for $x$: ...");
--      - in math, a minus sign written between numbers or letters.
--      Every other check is unchanged. The authoring checker (content/checks.ts)
--      stays stricter for new text drafts.
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (by hand): re-run the question_issues() section of 0040, then
--  alter table public.generated_questions drop column if exists teaches_punctuation;
-- ===========================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1) The per-item dash exemption.
-- ---------------------------------------------------------------------------
alter table public.generated_questions
  add column if not exists teaches_punctuation boolean not null default false;

comment on column public.generated_questions.teaches_punctuation is
  'True when the item teaches dashes, so the no-dash check skips it. Set by hand, item by item.';

update public.generated_questions
   set teaches_punctuation = true
 where id in ('2a343190-abb3-57d3-a4d3-af5b38899819',
              '9f79c586-7960-5a19-b696-980cbea5e064',
              'a3ac0b54-c631-542a-9305-17f6e5a5fa3b',
              'a13ea13e-c70c-5098-a1b6-df4058e304ca',
              '20017b4e-7e18-53a6-a8d5-ac1388fa2634',
              'bb32f457-6eb2-59f2-adea-48efa02869cf')
   and teaches_punctuation is distinct from true;

-- ---------------------------------------------------------------------------
-- 2) The checks.
-- ---------------------------------------------------------------------------
create or replace function public.question_issues(q public.generated_questions)
returns text[]
language sql
stable
security definer
set search_path = ''
as $$
  with c as (
    select e.value as v, e.ordinality as i
      from jsonb_array_elements(case when jsonb_typeof(q.choices) = 'array' then q.choices else '[]'::jsonb end)
           with ordinality as e(value, ordinality)
  ),
  facts as (
    select
      (select count(*) from c) as n,
      (select count(*) from c where (c.v ->> 'is_correct') = 'true') as n_correct,
      (select count(*) from c where (c.v ->> 'is_correct') is distinct from 'true'
                                 and coalesce(btrim(c.v ->> 'misconception_token'), '') = '') as n_wrong_untagged,
      (select c.v ->> 'text' from c where (c.v ->> 'is_correct') = 'true' order by c.i limit 1) as correct_text,
      -- Exact text: capitalization items legitimately differ only in capital letters.
      (select count(distinct btrim(c.v ->> 'text')) from c) as n_distinct,
      (select string_agg(coalesce(c.v ->> 'text', ''), ' ') from c) as all_text,
      -- Math writes expressions as $...$, where a spaced minus is normal; the
      -- dash rule applies to the prose around them (content/checks.ts does the same).
      coalesce((select s.subject = 'math' from public.skills s where s.id = q.skill_id), false) as is_math,
      coalesce(q.render_mode, 'text') = 'audio_picture' as is_picture
  )
  select array_remove(array[
    case when (case when f.is_picture then f.n not between 2 and 4 else f.n <> 4 end)
         then 'four_choices' end,
    case when f.n_correct <> 1 then 'one_correct' end,
    case when f.n_wrong_untagged > 0 and not f.is_picture then 'distractor_misconceptions' end,
    case when f.correct_text is distinct from q.correct_answer then 'answer_matches_choice' end,
    case when coalesce(btrim(q.solution), '') = '' then 'has_solution' end,
    case when f.n_distinct <> f.n then 'distinct_choices' end,
    case when not coalesce(q.teaches_punctuation, false)
          and (case when f.is_math
                    then regexp_replace(
                           regexp_replace(concat_ws(' ', q.stem, f.all_text, q.solution, q.correct_answer), '\$[^$]*\$', ' ', 'g'),
                           '(?<=[0-9)])\s-\s(?=[0-9A-Za-z(])|(?<=[0-9A-Za-z)])\s-\s(?=[0-9(])', ' ', 'g')
                    else concat_ws(' ', q.stem, f.all_text, q.solution, q.correct_answer) end)
              ~ '[—–]|\s-\s|--' then 'no_dashes' end,
    case when not (
           btrim(coalesce(q.stem, '')) ~ '[?:]$'
           or f.is_picture
           or q.stem ~ '_{3,}'
           or (btrim(q.stem) ~ '[.$]$'
               and q.stem ~* '^\s*(solve|simplify|find|write|evaluate|factor|expand|compute|calculate|estimate|round|convert|graph|choose|select|complete|identify|name|order|compare|use|show|tap|pick|count|add|subtract|multiply|divide|rewrite|express|determine|list)\M')
         ) then 'stem_ends' end
  ], null)
  from facts f;
$$;

revoke all on function public.question_issues(public.generated_questions) from public, anon, authenticated;
grant execute on function public.question_issues(public.generated_questions) to service_role;

commit;
