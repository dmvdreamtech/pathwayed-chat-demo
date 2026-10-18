-- ===========================================================================
-- 0043_skill_review.sql
--
-- Skill-level review before publishing, for the /admin/review page.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once, AFTER 0040, 0041 and 0042. Idempotent. Then run
-- 0043_skill_review_verify.sql.
--
-- ---------------------------------------------------------------------------
-- HOW A SKILL IS REVIEWED
-- ---------------------------------------------------------------------------
--  1. A named reviewer opens a skill. The database picks 5 of its drafts at
--     random (drafts that pass every automated check) and keeps that sample:
--     reopening the skill shows the same 5, so a sample cannot be redrawn.
--  2. All 5 clean: the skill is approved. Every passing draft that existed when
--     the review started is published, signed with the reviewer and the time.
--  3. Any flag: nothing is published and the skill goes to full review. Each
--     draft is then approved or flagged one at a time (review_question).
--  Every decision is logged: the reviewer, the date, the 5 sampled ids, and
--  each flag with its note.
--
--  Fixes to live questions (0042) are reviewed one at a time: approving a fix
--  publishes the draft and retires the original; rejecting retires the draft.
--  They never count toward a skill sample.
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES
-- ---------------------------------------------------------------------------
--  skill_reviews        One row per sampled review: reviewer, sampled ids,
--                       outcome (open, approved, full_review), flags, counts.
--  question_reviews     One row per decision on a single question.
--  review_queue()               Skills with drafts waiting, and their state.
--  start_skill_review(skill, reviewer)   Opens (or reopens) the sample.
--  skill_review_items(review)   The sampled questions, with keys and passages.
--  finish_skill_review(review, flags)    Approves and publishes, or sends the
--                                        skill to full review.
--  full_review_items(skill)     Drafts still waiting in a full-review skill.
--  review_question(question, reviewer, approve, note)   One at a time.
--  fix_draft_queue()            Live fixes waiting, original beside draft.
--  decide_fix_draft(draft, reviewer, approve, note)
--  All are platform admins only, and the tables have no browser access.
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (by hand)
-- ---------------------------------------------------------------------------
--  begin;
--  drop function if exists public.decide_fix_draft(uuid, text, boolean, text);
--  drop function if exists public.fix_draft_queue();
--  drop function if exists public.review_question(uuid, text, boolean, text);
--  drop function if exists public.full_review_items(uuid);
--  drop function if exists public.finish_skill_review(uuid, jsonb);
--  drop function if exists public.skill_review_items(uuid);
--  drop function if exists public.start_skill_review(uuid, text);
--  drop function if exists public.review_queue();
--  drop function if exists public.review_eligible(public.generated_questions);
--  drop table if exists public.question_reviews;
--  drop table if exists public.skill_reviews;
--  commit;
-- ===========================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1) Logs.
-- ---------------------------------------------------------------------------
create table if not exists public.skill_reviews (
  id              uuid        primary key default gen_random_uuid(),
  skill_id        uuid        not null references public.skills (id) on delete cascade,
  reviewer        text        not null check (btrim(reviewer) <> ''),
  reviewer_user   uuid,
  sampled_ids     uuid[]      not null check (cardinality(sampled_ids) = 5),
  status          text        not null default 'open' check (status in ('open', 'approved', 'full_review')),
  flags           jsonb       not null default '{}'::jsonb,
  published_count integer,
  started_at      timestamptz not null default now(),
  decided_at      timestamptz
);
create unique index if not exists skill_reviews_one_open on public.skill_reviews (skill_id) where status = 'open';
create index if not exists skill_reviews_skill on public.skill_reviews (skill_id, started_at desc);

comment on table public.skill_reviews is
  'Sampled skill reviews: a named reviewer reads 5 random drafts. All clean publishes the skill; any flag sends it to full review.';

create table if not exists public.question_reviews (
  id              uuid        primary key default gen_random_uuid(),
  question_id     uuid        not null references public.generated_questions (id) on delete cascade,
  skill_review_id uuid        references public.skill_reviews (id) on delete set null,
  reviewer        text        not null check (btrim(reviewer) <> ''),
  reviewer_user   uuid,
  outcome         text        not null check (outcome in ('approved', 'flagged', 'fix_approved', 'fix_rejected')),
  note            text,
  created_at      timestamptz not null default now(),
  check (outcome not in ('flagged', 'fix_rejected') or coalesce(btrim(note), '') <> '')
);
create index if not exists question_reviews_question on public.question_reviews (question_id, created_at desc);

comment on table public.question_reviews is
  'Every single-question decision: flags from a sample, full-review approvals and flags, and live-fix decisions.';

alter table public.skill_reviews enable row level security;
alter table public.question_reviews enable row level security;
revoke all on public.skill_reviews, public.question_reviews from public, anon, authenticated;
grant select, insert, update, delete on public.skill_reviews, public.question_reviews to service_role;

-- ---------------------------------------------------------------------------
-- 2) Which drafts a skill review covers: unreviewed drafts that pass every
--    check and are not fixes to a live question.
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
     and cardinality(public.question_issues(q)) = 0;
$$;

-- The latest review state of a skill: none, open, approved, full_review.
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
      select q.skill_id,
             count(*) filter (where public.review_eligible(q))::integer as ok,
             count(*) filter (where cardinality(public.question_issues(q)) > 0)::integer as bad
        from public.generated_questions q
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

-- ---------------------------------------------------------------------------
-- 3) Sampled review.
-- ---------------------------------------------------------------------------
create or replace function public.start_skill_review(p_skill_id uuid, p_reviewer text)
returns uuid
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_id     uuid;
  v_last   text;
  v_sample uuid[];
begin
  if not public.is_platform_admin() then
    raise exception 'platform_admin_required' using errcode = 'insufficient_privilege';
  end if;
  if coalesce(btrim(p_reviewer), '') = '' then
    raise exception 'reviewer_name_required';
  end if;
  perform 1 from public.skills where id = p_skill_id for update;
  if not found then
    raise exception 'skill_not_found';
  end if;

  -- Reopening returns the same sample.
  select id into v_id from public.skill_reviews where skill_id = p_skill_id and status = 'open';
  if v_id is not null then
    return v_id;
  end if;

  select status into v_last from public.skill_reviews where skill_id = p_skill_id order by started_at desc limit 1;
  if v_last = 'full_review' then
    raise exception 'skill_in_full_review: review its drafts one at a time';
  end if;

  select array_agg(x.id) into v_sample
    from (select q.id from public.generated_questions q
           where q.skill_id = p_skill_id and public.review_eligible(q)
           order by random() limit 5) x;
  if coalesce(cardinality(v_sample), 0) < 5 then
    raise exception 'not_enough_drafts: a sample needs 5 drafts that pass the checks';
  end if;

  insert into public.skill_reviews (skill_id, reviewer, reviewer_user, sampled_ids)
  values (p_skill_id, btrim(p_reviewer), auth.uid(), v_sample)
  returning id into v_id;
  return v_id;
end;
$$;

create or replace function public.skill_review_items(p_review_id uuid)
returns table (
  id uuid, n integer, stem text, choices jsonb, correct_answer text, solution text,
  difficulty text, render_mode text, prompt jsonb, passage_title text, passage_body text
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
    select q.id, s.n::integer, q.stem, q.choices, q.correct_answer, q.solution,
           q.difficulty::text, q.render_mode, q.prompt, p.title, p.body
      from public.skill_reviews r
      cross join lateral unnest(r.sampled_ids) with ordinality s(qid, n)
      join public.generated_questions q on q.id = s.qid
      left join public.passages p on p.id = q.passage_id
     where r.id = p_review_id
     order by s.n;
end;
$$;

-- p_flags: {"<sampled question id>": "what is wrong", ...}. Empty approves.
create or replace function public.finish_skill_review(p_review_id uuid, p_flags jsonb default '{}'::jsonb)
returns table (status text, published integer, flagged integer)
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  r       public.skill_reviews;
  v_flags jsonb := coalesce(p_flags, '{}'::jsonb);
  v_n     integer := 0;
  v_key   text;
begin
  if not public.is_platform_admin() then
    raise exception 'platform_admin_required' using errcode = 'insufficient_privilege';
  end if;
  if jsonb_typeof(v_flags) <> 'object' then
    raise exception 'flags_must_be_an_object';
  end if;

  select * into r from public.skill_reviews where id = p_review_id for update;
  if not found then
    raise exception 'review_not_found';
  end if;
  if r.status <> 'open' then
    raise exception 'review_already_decided';
  end if;
  if r.reviewer_user is distinct from auth.uid() then
    raise exception 'only_the_reviewer_can_finish: % started this review', r.reviewer;
  end if;

  for v_key in select jsonb_object_keys(v_flags) loop
    if v_key !~ '^[0-9a-f-]{36}$' or not (v_key::uuid = any (r.sampled_ids)) then
      raise exception 'flag_not_in_sample: %', v_key;
    end if;
    if coalesce(btrim(v_flags ->> v_key), '') = '' then
      raise exception 'flag_needs_a_note: %', v_key;
    end if;
  end loop;

  if v_flags = '{}'::jsonb then
    update public.generated_questions q
       set status = 'published', reviewed_by = r.reviewer, reviewed_at = now()
     where q.skill_id = r.skill_id
       and q.created_at <= r.started_at
       and public.review_eligible(q);
    get diagnostics v_n = row_count;
    insert into public.question_reviews (question_id, skill_review_id, reviewer, reviewer_user, outcome)
      select s, r.id, r.reviewer, r.reviewer_user, 'approved' from unnest(r.sampled_ids) s;
    update public.skill_reviews
       set status = 'approved', published_count = v_n, decided_at = now()
     where id = r.id;
    return query select 'approved'::text, v_n, 0;
  else
    insert into public.question_reviews (question_id, skill_review_id, reviewer, reviewer_user, outcome, note)
      select e.key::uuid, r.id, r.reviewer, r.reviewer_user, 'flagged', btrim(e.value #>> '{}')
        from jsonb_each(v_flags) e;
    update public.skill_reviews
       set status = 'full_review', flags = v_flags, published_count = 0, decided_at = now()
     where id = r.id;
    return query select 'full_review'::text, 0, (select count(*)::integer from jsonb_object_keys(v_flags));
  end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- 4) Full review, one question at a time.
-- ---------------------------------------------------------------------------
create or replace function public.full_review_items(p_skill_id uuid)
returns table (
  id uuid, stem text, choices jsonb, correct_answer text, solution text, difficulty text,
  render_mode text, prompt jsonb, passage_title text, passage_body text, issues text[], last_flag text
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
    select q.id, q.stem, q.choices, q.correct_answer, q.solution, q.difficulty::text,
           q.render_mode, q.prompt, p.title, p.body, public.question_issues(q),
           (select v.note from public.question_reviews v
             where v.question_id = q.id and v.outcome = 'flagged' order by v.created_at desc limit 1)
      from public.generated_questions q
      left join public.passages p on p.id = q.passage_id
     where q.skill_id = p_skill_id and q.status = 'draft' and q.reviewed_at is null
       and not exists (select 1 from public.question_fix_drafts f where f.draft_id = q.id)
     order by q.passage_id nulls last, q.created_at, q.id;
end;
$$;

create or replace function public.review_question(p_question_id uuid, p_reviewer text, p_approve boolean, p_note text default null)
returns text
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  q public.generated_questions;
begin
  if not public.is_platform_admin() then
    raise exception 'platform_admin_required' using errcode = 'insufficient_privilege';
  end if;
  if coalesce(btrim(p_reviewer), '') = '' then
    raise exception 'reviewer_name_required';
  end if;
  select * into q from public.generated_questions where id = p_question_id for update;
  if not found or q.status <> 'draft' or q.reviewed_at is not null then
    raise exception 'not_a_waiting_draft';
  end if;
  if exists (select 1 from public.question_fix_drafts d where d.draft_id = q.id) then
    raise exception 'live_fix: use decide_fix_draft';
  end if;
  if not exists (select 1 from public.skill_reviews r where r.skill_id = q.skill_id and r.status = 'full_review') then
    raise exception 'skill_not_in_full_review: start a sampled review first';
  end if;

  if p_approve then
    if cardinality(public.question_issues(q)) > 0 then
      raise exception 'fails_checks: %', array_to_string(public.question_issues(q), ', ');
    end if;
    update public.generated_questions
       set status = 'published', reviewed_by = btrim(p_reviewer), reviewed_at = now()
     where id = q.id;
    insert into public.question_reviews (question_id, reviewer, reviewer_user, outcome, note)
    values (q.id, btrim(p_reviewer), auth.uid(), 'approved', nullif(btrim(p_note), ''));
    return 'published';
  end if;
  if coalesce(btrim(p_note), '') = '' then
    raise exception 'flag_needs_a_note';
  end if;
  insert into public.question_reviews (question_id, reviewer, reviewer_user, outcome, note)
  values (q.id, btrim(p_reviewer), auth.uid(), 'flagged', btrim(p_note));
  return 'flagged';
end;
$$;

-- ---------------------------------------------------------------------------
-- 5) Fixes to live questions (0042).
-- ---------------------------------------------------------------------------
create or replace function public.fix_draft_queue()
returns table (
  draft_id uuid, original_id uuid, skill_slug text, reasons text[], changes text,
  original_stem text, original_choices jsonb, original_solution text,
  draft_stem text, draft_choices jsonb, draft_solution text, draft_issues text[], render_mode text
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
    select d.draft_id, d.original_id, k.slug, d.reasons, d.changes,
           o.stem, o.choices, o.solution, n.stem, n.choices, n.solution,
           public.question_issues(n), n.render_mode
      from public.question_fix_drafts d
      join public.generated_questions n on n.id = d.draft_id
      join public.generated_questions o on o.id = d.original_id
      join public.skills k on k.id = n.skill_id
     where n.status = 'draft' and n.reviewed_at is null
     order by k.subject, k.slug, d.created_at, d.draft_id;
end;
$$;

create or replace function public.decide_fix_draft(p_draft_id uuid, p_reviewer text, p_approve boolean, p_note text default null)
returns text
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  d public.question_fix_drafts;
  n public.generated_questions;
begin
  if not public.is_platform_admin() then
    raise exception 'platform_admin_required' using errcode = 'insufficient_privilege';
  end if;
  if coalesce(btrim(p_reviewer), '') = '' then
    raise exception 'reviewer_name_required';
  end if;
  select * into d from public.question_fix_drafts where draft_id = p_draft_id;
  if not found then
    raise exception 'not_a_fix_draft';
  end if;
  select * into n from public.generated_questions where id = d.draft_id for update;
  if n.status <> 'draft' or n.reviewed_at is not null then
    raise exception 'fix_already_decided';
  end if;

  if p_approve then
    if cardinality(public.question_issues(n)) > 0 then
      raise exception 'fails_checks: %', array_to_string(public.question_issues(n), ', ');
    end if;
    update public.generated_questions
       set status = 'published', reviewed_by = btrim(p_reviewer), reviewed_at = now()
     where id = n.id;
    update public.generated_questions set status = 'retired'
     where id = d.original_id and status = 'published';
    insert into public.question_reviews (question_id, reviewer, reviewer_user, outcome, note)
    values (n.id, btrim(p_reviewer), auth.uid(), 'fix_approved', nullif(btrim(p_note), ''));
    return 'published';
  end if;
  if coalesce(btrim(p_note), '') = '' then
    raise exception 'flag_needs_a_note';
  end if;
  update public.generated_questions set status = 'retired' where id = n.id;
  insert into public.question_reviews (question_id, reviewer, reviewer_user, outcome, note)
  values (n.id, btrim(p_reviewer), auth.uid(), 'fix_rejected', btrim(p_note));
  return 'rejected';
end;
$$;

-- ---------------------------------------------------------------------------
-- 6) Grants (CLAUDE.md: revoke from public and anon, grant explicitly).
-- ---------------------------------------------------------------------------
revoke all on function public.review_eligible(public.generated_questions) from public, anon, authenticated;
grant execute on function public.review_eligible(public.generated_questions) to service_role;

revoke all on function public.review_queue() from public, anon;
revoke all on function public.start_skill_review(uuid, text) from public, anon;
revoke all on function public.skill_review_items(uuid) from public, anon;
revoke all on function public.finish_skill_review(uuid, jsonb) from public, anon;
revoke all on function public.full_review_items(uuid) from public, anon;
revoke all on function public.review_question(uuid, text, boolean, text) from public, anon;
revoke all on function public.fix_draft_queue() from public, anon;
revoke all on function public.decide_fix_draft(uuid, text, boolean, text) from public, anon;
grant execute on function public.review_queue() to authenticated, service_role;
grant execute on function public.start_skill_review(uuid, text) to authenticated, service_role;
grant execute on function public.skill_review_items(uuid) to authenticated, service_role;
grant execute on function public.finish_skill_review(uuid, jsonb) to authenticated, service_role;
grant execute on function public.full_review_items(uuid) to authenticated, service_role;
grant execute on function public.review_question(uuid, text, boolean, text) to authenticated, service_role;
grant execute on function public.fix_draft_queue() to authenticated, service_role;
grant execute on function public.decide_fix_draft(uuid, text, boolean, text) to authenticated, service_role;

commit;
