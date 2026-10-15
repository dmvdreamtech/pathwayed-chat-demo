-- ===========================================================================
-- 0034_sat_official_skills.sql
--
-- The 30 official College Board SAT skills, a platform-admin coverage report
-- that counts live from the database, and a staff search that can sort by most
-- recent activity.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once. Idempotent. Then run 0034_sat_official_skills_verify.sql, then
-- 0034_platform_admins_seed.sql (who may open /admin/sat-coverage).
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES
-- ---------------------------------------------------------------------------
--  sat_official_skills  The 30 official skills (11 Reading and Writing, 19 Math,
--                       8 domains), each with its publishing target: Math 60,
--                       Reading and Writing 40. A check pins the 30 codes.
--  skills.sat_skill_code  Which official skill a skill row IS. Foreign key to
--                       the table above, unique.
--  skills               Two subjects (prep-sat-rw, prep-sat-math), the 8 SAT
--                       domains under them, and the 30 skills, slug
--                       prep-sat-<code>. The two existing SAT prep skills ARE
--                       two of them: SAT Words in Context (words-in-context) and
--                       SAT Transitions (transitions) move under the new subject
--                       and get their codes. Their ids, slugs, questions and
--                       history are unchanged.
--                       The 28 new skills have NO sat_alignment yet, so the SAT
--                       card and the timed sections do not see them until a
--                       domain is switched over (all its skills published).
--  generated_questions  reviewed_by / reviewed_at. A question on an official SAT
--                       skill cannot BECOME published without a named reviewer.
--                       (The 96 already published stay as they are, unreviewed.)
--  sat_question_issues()  The automated checks a SAT question must pass.
--  sat_coverage()       Per official skill: exists, drafted, checks passing,
--                       reviewed, published, target. Platform admins only.
--  platform_admins      Who is a PathwayEd platform admin. No browser access;
--                       is_platform_admin() answers for the caller.
--  staff_search_students(p_query, p_order)  'recent' (default: most recently
--                       active first) or 'name' (A to Z). Same columns and rows.
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (manual; run as one script if ever needed)
-- ---------------------------------------------------------------------------
-- begin;
-- drop trigger if exists generated_questions_sat_publish_guard on public.generated_questions;
-- drop function if exists public.generated_questions_sat_publish_guard();
-- drop function if exists public.sat_coverage();
-- drop function if exists public.sat_question_issues(public.generated_questions);
-- drop function if exists public.is_platform_admin();
-- drop function if exists public.staff_search_students(text, text);
-- -- re-create staff_search_students(text) from migration 0030 and grant it to authenticated
-- update public.skills set subject = 'prep-verbal', parent_id = md5('pe-aos:dom-prep-verbal')::uuid,
--        grade_band = '6-8', sat_skill_code = null
--  where slug in ('prep-sat-words-in-context', 'prep-sat-transitions');
-- delete from public.skills where sat_skill_code is not null;          -- the 28 new skills
-- delete from public.skills where subject in ('prep-sat-rw', 'prep-sat-math');
-- alter table public.skills drop column if exists sat_skill_code;
-- alter table public.generated_questions drop column if exists reviewed_by, drop column if exists reviewed_at;
-- drop table if exists public.sat_official_skills;
-- drop table if exists public.platform_admins;
-- commit;
-- ===========================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1) Platform admins.
-- ---------------------------------------------------------------------------
create table if not exists public.platform_admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  note       text,
  created_at timestamptz not null default now()
);
alter table public.platform_admins enable row level security;
revoke all on public.platform_admins from anon, authenticated;

create or replace function public.is_platform_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.platform_admins a where a.user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- 2) The 30 official SAT skills.
-- ---------------------------------------------------------------------------
create table if not exists public.sat_official_skills (
  code    text primary key,
  section text not null check (section in ('reading-writing', 'math')),
  domain  text not null check (domain in (
            'information-and-ideas', 'craft-and-structure', 'expression-of-ideas',
            'standard-english-conventions', 'algebra', 'advanced-math',
            'problem-solving-data-analysis', 'geometry-trigonometry')),
  name    text not null,
  target  integer not null check (target > 0),
  sort    integer not null,
  constraint sat_official_skills_code_official check (code in (
    'central-ideas-and-details', 'command-of-evidence-textual', 'command-of-evidence-quantitative',
    'inferences', 'words-in-context', 'text-structure-and-purpose', 'cross-text-connections',
    'rhetorical-synthesis', 'transitions', 'boundaries', 'form-structure-and-sense',
    'linear-equations-one-variable', 'linear-functions', 'linear-equations-two-variables',
    'systems-of-linear-equations', 'linear-inequalities', 'nonlinear-functions',
    'nonlinear-equations-and-systems', 'equivalent-expressions', 'ratios-rates-proportions-units',
    'percentages', 'one-variable-data', 'two-variable-data', 'probability-conditional-probability',
    'inference-sample-statistics', 'evaluating-statistical-claims', 'area-and-volume',
    'lines-angles-triangles', 'right-triangles-trigonometry', 'circles'))
);
alter table public.sat_official_skills enable row level security;
revoke all on public.sat_official_skills from anon, authenticated;

insert into public.sat_official_skills (code, section, domain, name, target, sort) values
  ('central-ideas-and-details',         'reading-writing', 'information-and-ideas',         'Central Ideas and Details', 40, 1),
  ('command-of-evidence-textual',       'reading-writing', 'information-and-ideas',         'Command of Evidence: Textual', 40, 2),
  ('command-of-evidence-quantitative',  'reading-writing', 'information-and-ideas',         'Command of Evidence: Quantitative', 40, 3),
  ('inferences',                        'reading-writing', 'information-and-ideas',         'Inferences', 40, 4),
  ('words-in-context',                  'reading-writing', 'craft-and-structure',           'Words in Context', 40, 5),
  ('text-structure-and-purpose',        'reading-writing', 'craft-and-structure',           'Text Structure and Purpose', 40, 6),
  ('cross-text-connections',            'reading-writing', 'craft-and-structure',           'Cross-Text Connections', 40, 7),
  ('rhetorical-synthesis',              'reading-writing', 'expression-of-ideas',           'Rhetorical Synthesis', 40, 8),
  ('transitions',                       'reading-writing', 'expression-of-ideas',           'Transitions', 40, 9),
  ('boundaries',                        'reading-writing', 'standard-english-conventions',  'Boundaries', 40, 10),
  ('form-structure-and-sense',          'reading-writing', 'standard-english-conventions',  'Form, Structure, and Sense', 40, 11),
  ('linear-equations-one-variable',     'math', 'algebra',                       'Linear equations in one variable', 60, 12),
  ('linear-functions',                  'math', 'algebra',                       'Linear functions', 60, 13),
  ('linear-equations-two-variables',    'math', 'algebra',                       'Linear equations in two variables', 60, 14),
  ('systems-of-linear-equations',       'math', 'algebra',                       'Systems of two linear equations in two variables', 60, 15),
  ('linear-inequalities',               'math', 'algebra',                       'Linear inequalities in one or two variables', 60, 16),
  ('nonlinear-functions',               'math', 'advanced-math',                 'Nonlinear functions', 60, 17),
  ('nonlinear-equations-and-systems',   'math', 'advanced-math',                 'Nonlinear equations in one variable and systems of equations in two variables', 60, 18),
  ('equivalent-expressions',            'math', 'advanced-math',                 'Equivalent expressions', 60, 19),
  ('ratios-rates-proportions-units',    'math', 'problem-solving-data-analysis', 'Ratios, rates, proportional relationships, and units', 60, 20),
  ('percentages',                       'math', 'problem-solving-data-analysis', 'Percentages', 60, 21),
  ('one-variable-data',                 'math', 'problem-solving-data-analysis', 'One-variable data: distributions and measures of center and spread', 60, 22),
  ('two-variable-data',                 'math', 'problem-solving-data-analysis', 'Two-variable data: models and scatterplots', 60, 23),
  ('probability-conditional-probability', 'math', 'problem-solving-data-analysis', 'Probability and conditional probability', 60, 24),
  ('inference-sample-statistics',       'math', 'problem-solving-data-analysis', 'Inference from sample statistics and margin of error', 60, 25),
  ('evaluating-statistical-claims',     'math', 'problem-solving-data-analysis', 'Evaluating statistical claims: observational studies and experiments', 60, 26),
  ('area-and-volume',                   'math', 'geometry-trigonometry',         'Area and volume', 60, 27),
  ('lines-angles-triangles',            'math', 'geometry-trigonometry',         'Lines, angles, and triangles', 60, 28),
  ('right-triangles-trigonometry',      'math', 'geometry-trigonometry',         'Right triangles and trigonometry', 60, 29),
  ('circles',                           'math', 'geometry-trigonometry',         'Circles', 60, 30)
on conflict (code) do update set
  section = excluded.section, domain = excluded.domain, name = excluded.name,
  target = excluded.target, sort = excluded.sort;

alter table public.skills add column if not exists sat_skill_code text;
alter table public.skills drop constraint if exists skills_sat_skill_code_fkey;
alter table public.skills
  add constraint skills_sat_skill_code_fkey foreign key (sat_skill_code)
  references public.sat_official_skills(code) on update cascade;
create unique index if not exists skills_sat_skill_code_key
  on public.skills (sat_skill_code) where sat_skill_code is not null;

-- ---------------------------------------------------------------------------
-- 3) The SAT taxonomy rows. Ids follow the seed builders' convention,
--    md5('pe-aos:<key>'), so scripts/build-prep-seeds.ts writes the same rows.
-- ---------------------------------------------------------------------------
insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment, prerequisite_skills) values
  (md5('pe-aos:subj-prep-sat-rw')::uuid,   'subject', null, 'prep-sat-rw',   'Test Prep, SAT Reading and Writing', null, null, null, '{}'),
  (md5('pe-aos:subj-prep-sat-math')::uuid, 'subject', null, 'prep-sat-math', 'Test Prep, SAT Math',                 null, null, null, '{}')
on conflict (id) do update set level = excluded.level, parent_id = excluded.parent_id,
  subject = excluded.subject, name = excluded.name;

insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment, prerequisite_skills)
select md5('pe-aos:dom-prep-sat-' || d.domain)::uuid, 'domain',
       md5('pe-aos:subj-' || d.subject)::uuid, d.subject, d.label, null, null, null, '{}'
  from (values
    ('information-and-ideas',         'prep-sat-rw',   'Information and Ideas'),
    ('craft-and-structure',           'prep-sat-rw',   'Craft and Structure'),
    ('expression-of-ideas',           'prep-sat-rw',   'Expression of Ideas'),
    ('standard-english-conventions',  'prep-sat-rw',   'Standard English Conventions'),
    ('algebra',                       'prep-sat-math', 'Algebra'),
    ('advanced-math',                 'prep-sat-math', 'Advanced Math'),
    ('problem-solving-data-analysis', 'prep-sat-math', 'Problem-Solving and Data Analysis'),
    ('geometry-trigonometry',         'prep-sat-math', 'Geometry and Trigonometry')
  ) as d(domain, subject, label)
on conflict (id) do update set level = excluded.level, parent_id = excluded.parent_id,
  subject = excluded.subject, name = excluded.name;

-- All 30 skills, by slug. For the two that exist, only the taxonomy fields move:
-- subject, parent domain, grade band and code. Their sat_alignment (0032) and
-- every question stay. New skills start with no sat_alignment (not live yet).
insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment,
                           prerequisite_skills, sat_skill_code)
select md5('pe-aos:skill-prep-sat-' || o.code)::uuid, 'skill',
       md5('pe-aos:dom-prep-sat-' || o.domain)::uuid,
       case o.section when 'math' then 'prep-sat-math' else 'prep-sat-rw' end,
       'SAT ' || o.name, 'prep-sat-' || o.code, '9-12', null, '{}', o.code
  from public.sat_official_skills o
on conflict (slug) do update set
  level          = excluded.level,
  parent_id      = excluded.parent_id,
  subject        = excluded.subject,
  grade_band     = excluded.grade_band,
  sat_skill_code = excluded.sat_skill_code;

-- ---------------------------------------------------------------------------
-- 4) Review before publish, for official SAT questions.
-- ---------------------------------------------------------------------------
alter table public.generated_questions add column if not exists reviewed_by text;
alter table public.generated_questions add column if not exists reviewed_at timestamptz;

create or replace function public.generated_questions_sat_publish_guard()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status = 'published'
     and (tg_op = 'INSERT' or old.status is distinct from 'published')
     and exists (select 1 from public.skills k where k.id = new.skill_id and k.sat_skill_code is not null)
     and (new.reviewed_at is null or coalesce(btrim(new.reviewed_by), '') = '') then
    raise exception 'sat_review_required: a named reviewer must approve this SAT question before it is published';
  end if;
  return new;
end;
$$;

drop trigger if exists generated_questions_sat_publish_guard on public.generated_questions;
create trigger generated_questions_sat_publish_guard
  before insert or update on public.generated_questions
  for each row execute function public.generated_questions_sat_publish_guard();

-- ---------------------------------------------------------------------------
-- 5) Automated checks, and the coverage report.
-- ---------------------------------------------------------------------------

-- Names of the checks a question FAILS; empty means it passes them all.
create or replace function public.sat_question_issues(q public.generated_questions)
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
      (select count(distinct lower(btrim(c.v ->> 'text'))) from c) as n_distinct,
      (select string_agg(coalesce(c.v ->> 'text', ''), ' ') from c) as all_text,
      (select array_length(regexp_split_to_array(btrim(p.body), '\s+'), 1)
         from public.passages p where p.id = q.passage_id) as passage_words
  )
  select array_remove(array[
    case when f.n <> 4 then 'four_choices' end,
    case when f.n_correct <> 1 then 'one_correct' end,
    case when f.n_wrong_untagged > 0 then 'distractor_misconceptions' end,
    case when f.correct_text is distinct from q.correct_answer then 'answer_matches_choice' end,
    case when coalesce(btrim(q.solution), '') = '' then 'has_solution' end,
    case when f.n_distinct <> f.n then 'distinct_choices' end,
    case when concat_ws(' ', q.stem, f.all_text, q.solution, q.correct_answer) ~ '[—–]' then 'no_dashes' end,
    case when q.passage_id is not null and coalesce(f.passage_words, 0) not between 25 and 150
         then 'passage_length' end
  ], null)
  from facts f;
$$;

create or replace function public.sat_coverage()
returns table (
  code text, name text, section text, domain text, sort integer, target integer,
  skill_id uuid, skill_slug text,
  drafted integer, checks_passing integer, reviewed integer, published integer
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.is_platform_admin() then
    raise exception 'platform_admin_required';
  end if;
  return query
  select o.code, o.name, o.section, o.domain, o.sort, o.target, k.id, k.slug,
         count(g.id) filter (where g.status <> 'retired')::integer,
         count(g.id) filter (where g.status <> 'retired'
                               and cardinality(public.sat_question_issues(g)) = 0)::integer,
         count(g.id) filter (where g.status <> 'retired' and g.reviewed_at is not null)::integer,
         count(g.id) filter (where g.status = 'published')::integer
    from public.sat_official_skills o
    left join public.skills k on k.sat_skill_code = o.code
    left join public.generated_questions g on g.skill_id = k.id
   group by o.code, o.name, o.section, o.domain, o.sort, o.target, k.id, k.slug
   order by o.sort;
end;
$$;

-- ---------------------------------------------------------------------------
-- 6) Staff search, sortable. Same rows and columns as 0030; the order and the
--    200-row cap now follow p_order, so "most recent" is right past 200 too.
-- ---------------------------------------------------------------------------
drop function if exists public.staff_search_students(text);

create or replace function public.staff_search_students(p_query text, p_order text default 'recent')
returns table (student_id uuid, school_id uuid, first_name text, grade text, email text,
               last_active_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  with term as (
    select nullif(lower(btrim(coalesce(p_query, ''))), '') as t
  ),
  my_schools as (
    select distinct ss.school_id
      from public.school_staff ss
     where ss.user_id = auth.uid()
       and ss.active
  ),
  found as (
    select s.id,
           s.school_id,
           s.first_name,
           s.grade,
           case when p.email ilike '%@covered.pathwayed.local' then null else p.email end as email,
           greatest(
             (select max(qa.created_at) from public.question_attempts qa where qa.student_id = s.id),
             (select max(se.updated_at) from public.sessions se where se.student_id = s.id)
           ) as last_active_at
      from public.students s
      join my_schools ms on ms.school_id = s.school_id
      left join public.profiles p on p.id = s.parent_id
     cross join term
     where s.school_covered
       and (
         term.t is null
         or position(term.t in lower(s.first_name)) > 0
         or (p.email not ilike '%@covered.pathwayed.local'
             and position(term.t in lower(coalesce(p.email, ''))) > 0)
         or lower(s.grade) = regexp_replace(term.t, '^grade\s*', '')
       )
  )
  select f.id, f.school_id, f.first_name, f.grade, f.email, f.last_active_at
    from found f
   order by case when p_order = 'name' then null else f.last_active_at end desc nulls last,
            lower(f.first_name), f.grade, f.id
   limit 200;
$$;

-- ---------------------------------------------------------------------------
-- 7) Grants (CLAUDE.md: revoke from public and anon, grant explicitly).
-- ---------------------------------------------------------------------------
revoke all on function public.is_platform_admin() from public, anon;
revoke all on function public.generated_questions_sat_publish_guard() from public, anon, authenticated;
revoke all on function public.sat_question_issues(public.generated_questions) from public, anon, authenticated;
revoke all on function public.sat_coverage() from public, anon;
revoke all on function public.staff_search_students(text, text) from public, anon;

grant execute on function
  public.is_platform_admin(),
  public.sat_coverage(),
  public.staff_search_students(text, text)
to authenticated;

grant execute on function
  public.is_platform_admin(),
  public.generated_questions_sat_publish_guard(),
  public.sat_question_issues(public.generated_questions),
  public.sat_coverage(),
  public.staff_search_students(text, text)
to service_role;

-- reviewed_by / reviewed_at are not in the browser's column grant from 0033,
-- so students cannot see who reviewed a question.

commit;
