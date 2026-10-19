-- ===========================================================================
-- 0045_stored_question_checks.sql
--
-- Stores each question's automated check results, so the review and coverage
-- pages read them instead of recomputing every check on every load.
--
-- WHY: with 16,034 coverage drafts loaded, review_queue() took 13.2 to 13.6 s
-- (measured on live, signed in as a platform admin). The API roles
-- (authenticated, authenticator) have statement_timeout = 8s, so /admin/review
-- failed on every load with "We could not load the review queue". Almost all of
-- the time was review_eligible() and question_issues() run once per draft: 11.1 s
-- and 1.7 s over the 16,048 drafts the queue scans. content_coverage()
-- (/admin/coverage) recomputed the same checks and took 2.0 s.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once, AFTER 0040 to 0044. Idempotent: running it again re-fills the stored
-- results and changes nothing else. Then run 0045_stored_question_checks_verify.sql.
-- The backfill computes the checks once for every question (about 19,000 today,
-- a few seconds).
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES
-- ---------------------------------------------------------------------------
--  question_checks   New table: one row per question, the issues question_issues()
--      returned for it, and when. Not readable from the browser.
--  Kept current by triggers:
--      - a question is inserted, or its stem, choices, answer, solution, render
--        mode, skill or teaches_punctuation flag changes: its row is recomputed;
--      - a skill's subject changes (the dash rule depends on it): every question
--        in that skill is recomputed.
--      Review decisions (status, reviewed_at) do not change the checks, so they
--      do not recompute.
--  review_queue(), review_eligible(q), content_coverage()   Read the stored
--      results. If a row were ever missing they compute it on the spot, so the
--      answers are the same as before; only the speed changes. Signatures,
--      columns and grants are unchanged, so the deployed pages need no change.
--  question_checks_refresh()   Service role only: recomputes every stored row,
--      for use after question_issues() itself is changed by a later migration.
--
-- The existing triggers on generated_questions (touch_updated_at and the SAT
-- publish guard) are not fired by this migration: the results live in their
-- own table, so filling it never updates a question row.
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (by hand): re-run the review_queue() and review_eligible() sections of
-- 0043 and the content_coverage() section of 0042, then
--   drop trigger if exists trg_question_checks_on_question on public.generated_questions;
--   drop trigger if exists trg_question_checks_on_skill on public.skills;
--   drop function if exists public.question_checks_on_question();
--   drop function if exists public.question_checks_on_skill();
--   drop function if exists public.question_checks_refresh();
--   drop table if exists public.question_checks;
-- ===========================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1) The stored results.
-- ---------------------------------------------------------------------------
create table if not exists public.question_checks (
  question_id uuid primary key references public.generated_questions (id) on delete cascade,
  issues      text[] not null,
  checked_at  timestamptz not null default now()
);

comment on table public.question_checks is
  'The automated check results (question_issues) for each question, kept current by triggers. Read by review_queue, review_eligible and content_coverage.';

alter table public.question_checks enable row level security;
revoke all on public.question_checks from public, anon, authenticated;
grant select, insert, update, delete on public.question_checks to service_role;

-- ---------------------------------------------------------------------------
-- 2) Keep them current.
-- ---------------------------------------------------------------------------
create or replace function public.question_checks_on_question()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.question_checks (question_id, issues, checked_at)
  values (new.id, public.question_issues(new), now())
  on conflict (question_id) do update
    set issues = excluded.issues, checked_at = excluded.checked_at;
  return null;
end;
$$;

drop trigger if exists trg_question_checks_on_question on public.generated_questions;
create trigger trg_question_checks_on_question
  after insert or update of stem, choices, correct_answer, solution, render_mode, skill_id, teaches_punctuation
  on public.generated_questions
  for each row execute function public.question_checks_on_question();

create or replace function public.question_checks_on_skill()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.question_checks (question_id, issues, checked_at)
  select q.id, public.question_issues(q), now()
    from public.generated_questions q
   where q.skill_id = new.id
  on conflict (question_id) do update
    set issues = excluded.issues, checked_at = excluded.checked_at;
  return null;
end;
$$;

drop trigger if exists trg_question_checks_on_skill on public.skills;
create trigger trg_question_checks_on_skill
  after update of subject on public.skills
  for each row
  when (old.subject is distinct from new.subject)
  execute function public.question_checks_on_skill();

create or replace function public.question_checks_refresh()
returns integer
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_n integer;
begin
  insert into public.question_checks (question_id, issues, checked_at)
  select q.id, public.question_issues(q), now()
    from public.generated_questions q
  on conflict (question_id) do update
    set issues = excluded.issues, checked_at = excluded.checked_at;
  get diagnostics v_n = row_count;
  return v_n;
end;
$$;

-- Fill it now, for every question already loaded.
select public.question_checks_refresh();

-- ---------------------------------------------------------------------------
-- 3) Read the stored results. Same signatures, columns and answers as before.
-- ---------------------------------------------------------------------------
create or replace function public.review_eligible(q public.generated_questions)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select q.status = 'draft'
     and q.reviewed_at is null
     and not exists (select 1 from public.question_fix_drafts d where d.draft_id = q.id)
     and cardinality(coalesce((select c.issues from public.question_checks c where c.question_id = q.id),
                              public.question_issues(q))) = 0;
$$;

create or replace function public.review_queue()
returns table (
  skill_id uuid, slug text, name text, subject text, grade integer,
  drafts integer, drafts_failing integer, state text, open_review_id uuid,
  last_reviewer text, last_decided_at timestamptz
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.is_platform_admin() then
    raise exception 'platform_admin_required' using errcode = 'insufficient_privilege';
  end if;
  return query
    with d as (
      -- review_eligible(q) written out: the same draft filters plus no stored issues.
      select q.skill_id,
             count(*) filter (where cardinality(coalesce(c.issues, public.question_issues(q))) = 0)::integer as ok,
             count(*) filter (where cardinality(coalesce(c.issues, public.question_issues(q))) > 0)::integer as bad
        from public.generated_questions q
        left join public.question_checks c on c.question_id = q.id
       where q.status = 'draft' and q.reviewed_at is null
         and not exists (select 1 from public.question_fix_drafts f where f.draft_id = q.id)
       group by q.skill_id
    ), last as (
      select distinct on (r.skill_id) r.skill_id, r.status, r.id, r.reviewer, r.decided_at
        from public.skill_reviews r
       order by r.skill_id, r.started_at desc
    )
    select k.id, k.slug, k.name, k.subject, k.ccss_grade_num::integer,
           d.ok, d.bad,
           coalesce(l.status, 'none'),
           case when l.status = 'open' then l.id end,
           l.reviewer, l.decided_at
      from d
      join public.skills k on k.id = d.skill_id
      left join last l on l.skill_id = k.id
     where d.ok > 0 or d.bad > 0
     order by k.subject, k.ccss_grade_num nulls last, k.slug;
end;
$$;

create or replace function public.content_coverage()
returns table (
  subject text, grade integer, grp text, name text, standards text[], skill_slugs text[], sort integer, target integer,
  skill_exists boolean, drafted integer, checks_passing integer, reviewed integer, published integer,
  published_reviewed integer
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.is_platform_admin() then
    raise exception 'platform_admin_required' using errcode = 'insufficient_privilege';
  end if;
  return query
    select t.subject, t.grade, t.grp, t.name, t.standards, t.skill_slugs, t.sort, t.target,
           exists (select 1 from public.skills k where k.slug = any (t.skill_slugs)),
           count(q.id) filter (where q.status <> 'retired')::integer,
           count(q.id) filter (where q.status <> 'retired'
                                 and cardinality(coalesce(c.issues, public.question_issues(q))) = 0)::integer,
           count(q.id) filter (where q.status <> 'retired' and q.reviewed_at is not null)::integer,
           count(q.id) filter (where q.status = 'published')::integer,
           count(q.id) filter (where q.status = 'published' and q.reviewed_at is not null)::integer
      from public.coverage_targets t
      left join public.skills k on k.slug = any (t.skill_slugs)
      left join public.generated_questions q
        on q.skill_id = k.id
       and not (q.status = 'draft' and exists (select 1 from public.question_fix_drafts d where d.draft_id = q.id))
      left join public.question_checks c on c.question_id = q.id
     group by t.subject, t.grade, t.grp, t.name, t.standards, t.skill_slugs, t.sort, t.target
     order by t.sort;
end;
$$;

-- ---------------------------------------------------------------------------
-- 4) Grants. The page functions keep exactly the grants they had.
-- ---------------------------------------------------------------------------
revoke all on function public.question_checks_on_question() from public, anon, authenticated;
revoke all on function public.question_checks_on_skill() from public, anon, authenticated;
revoke all on function public.question_checks_refresh() from public, anon, authenticated;
grant execute on function public.question_checks_refresh() to service_role;

revoke all on function public.review_eligible(public.generated_questions) from public, anon, authenticated;
grant execute on function public.review_eligible(public.generated_questions) to service_role;
revoke all on function public.review_queue() from public, anon;
grant execute on function public.review_queue() to authenticated, service_role;
revoke all on function public.content_coverage() from public, anon;
grant execute on function public.content_coverage() to authenticated, service_role;

commit;
