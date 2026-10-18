-- ===========================================================================
-- 0042_question_fix_drafts.sql
--
-- Links a corrected DRAFT to the live question it would replace, so fixes to
-- published questions go through review instead of editing them in place.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once, AFTER 0040 and 0041 and BEFORE the seeds/live-fixes batches.
-- Idempotent. Then run 0042_question_fix_drafts_verify.sql.
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES
-- ---------------------------------------------------------------------------
--  question_fix_drafts   One row per correction: the draft, the published
--                        question it replaces, and which checks the original
--                        failed. The original stays published and untouched;
--                        a reviewer approves the draft (publish it, retire the
--                        original) or rejects it. No browser access.
--  content_coverage()    Leaves unapproved fix drafts out of every count, so
--                        a skill's totals do not double while a fix waits.
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (by hand)
-- ---------------------------------------------------------------------------
--  begin;
--  drop table if exists public.question_fix_drafts;   -- then re-run 0040's content_coverage()
--  commit;
-- ===========================================================================

begin;

create table if not exists public.question_fix_drafts (
  draft_id    uuid        primary key references public.generated_questions (id) on delete cascade,
  original_id uuid        not null references public.generated_questions (id) on delete cascade,
  reasons     text[]      not null check (cardinality(reasons) > 0),
  changes     text,
  created_at  timestamptz not null default now(),
  check (draft_id <> original_id)
);

create index if not exists question_fix_drafts_original on public.question_fix_drafts (original_id);

comment on table public.question_fix_drafts is
  'A draft that corrects a published question (original_id), with the checks the original failed. The original stays published until a reviewer approves the draft.';

alter table public.question_fix_drafts enable row level security;
revoke all on public.question_fix_drafts from public, anon, authenticated;
grant select, insert, update, delete on public.question_fix_drafts to service_role;

-- Unapproved fix drafts stay out of the counts (a waiting fix is not new coverage).
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
           count(q.id) filter (where q.status <> 'retired' and cardinality(public.question_issues(q)) = 0)::integer,
           count(q.id) filter (where q.status <> 'retired' and q.reviewed_at is not null)::integer,
           count(q.id) filter (where q.status = 'published')::integer,
           count(q.id) filter (where q.status = 'published' and q.reviewed_at is not null)::integer
      from public.coverage_targets t
      left join public.skills k on k.slug = any (t.skill_slugs)
      left join public.generated_questions q
        on q.skill_id = k.id
       and not (q.status = 'draft' and exists (select 1 from public.question_fix_drafts d where d.draft_id = q.id))
     group by t.subject, t.grade, t.grp, t.name, t.standards, t.skill_slugs, t.sort, t.target
     order by t.sort;
end;
$$;

revoke all on function public.content_coverage() from public, anon;
grant execute on function public.content_coverage() to authenticated, service_role;

commit;
