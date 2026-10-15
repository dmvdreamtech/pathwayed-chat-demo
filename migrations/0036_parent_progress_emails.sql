-- ===========================================================================
-- 0036_parent_progress_emails.sql
--
-- What the weekly and monthly parent progress emails (api/parent-emails.ts)
-- read and write. Nothing here is reachable from the browser.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once. Idempotent. Then run 0036_parent_progress_emails_verify.sql.
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES
-- ---------------------------------------------------------------------------
--  email_suppressions   Addresses that unsubscribed, kept as the SHA-256 of
--                       the lower-cased address, never the address itself, so
--                       a school guardian's email is not stored here even
--                       after they unsubscribe. Every progress email checks it
--                       first.
--  parent_email_sends   One row per student per email kind per period once a
--                       progress email covering that student has gone out. It
--                       stops a repeat send, and it is how a family that got a
--                       weekly email for a week overlapping a month is kept
--                       from also getting that month's email. No addresses.
--  parent_email_activity(from, to)  Per active student, what they did in the
--                       window, measured only: subjects tutored, check
--                       questions answered and right, skills mastered,
--                       practice test sections finished, essays submitted,
--                       when they were last active, and when the student was
--                       added (a monthly email is only about a month the
--                       child was on PathwayEd for). Plus the account's
--                       email, status and the student's school fields so the
--                       cron can group families. Service role only.
--
-- Activity counts sessions (by their last touch), graded check questions
-- (diagnostic placement questions are not counted), skills mastered (passed
-- the recheck), finished practice test sections and submitted essays.
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (by hand)
-- ---------------------------------------------------------------------------
--  begin;
--  drop function if exists public.parent_email_activity(timestamptz, timestamptz);
--  drop table if exists public.parent_email_sends;
--  drop table if exists public.email_suppressions;
--  commit;
-- ===========================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1) Unsubscribed addresses, hashed.
-- ---------------------------------------------------------------------------
create table if not exists public.email_suppressions (
  email_hash text primary key check (email_hash ~ '^[0-9a-f]{64}$'),
  source     text not null default 'unsubscribe_link'
             check (source in ('unsubscribe_link', 'one_click', 'support')),
  created_at timestamptz not null default now()
);
alter table public.email_suppressions enable row level security;
revoke all on public.email_suppressions from public, anon, authenticated;
grant select, insert, delete on public.email_suppressions to service_role;

-- ---------------------------------------------------------------------------
-- 2) What has been sent.
-- ---------------------------------------------------------------------------
create table if not exists public.parent_email_sends (
  id             uuid primary key default gen_random_uuid(),
  student_id     uuid not null references public.students (id) on delete cascade,
  kind           text not null check (kind in ('weekly', 'monthly')),
  -- School-local dates (America/New_York): Monday to Sunday, or a whole month.
  period_start   date not null,
  period_end     date not null check (period_end >= period_start),
  -- 'account': the paying family's own address. 'guardian': a school
  -- guardian's address from the console, which is not kept.
  recipient_type text not null check (recipient_type in ('account', 'guardian')),
  recipients     integer not null default 1 check (recipients >= 1),
  sent_at        timestamptz not null default now(),
  unique (student_id, kind, period_start, recipient_type)
);
create index if not exists parent_email_sends_period
  on public.parent_email_sends (kind, period_start);
alter table public.parent_email_sends enable row level security;
revoke all on public.parent_email_sends from public, anon, authenticated;
grant select, insert on public.parent_email_sends to service_role;

-- ---------------------------------------------------------------------------
-- 3) What each active student did in a window.
-- ---------------------------------------------------------------------------
create or replace function public.parent_email_activity(p_from timestamptz, p_to timestamptz)
returns table (
  student_id          uuid,
  parent_id           uuid,
  first_name          text,
  grade               text,
  above_grade_ok      boolean,
  school_covered      boolean,
  school_id           uuid,
  dean_student_id     text,
  account_email       text,
  subscription_status text,
  subjects            text[],
  checks_answered     integer,
  checks_right        integer,
  mastered            text[],
  tests               jsonb,
  essays              integer,
  active              boolean,
  last_active_at      timestamptz,
  created_at          timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  with kids as (
    select s.*
      from public.students s
     where s.active
  ),
  sess as (
    select se.student_id, array_agg(distinct se.subject) as subjects
      from public.sessions se
     where se.updated_at >= p_from and se.updated_at < p_to
     group by se.student_id
  ),
  checks as (
    select qa.student_id,
           count(*)::integer as answered,
           count(*) filter (where qa.is_correct)::integer as right_n,
           array_agg(distinct k.subject) filter (where k.subject is not null) as subjects
      from public.question_attempts qa
      left join public.skills k on k.id = qa.skill_id
     where not coalesce(qa.is_diagnostic, false)
       and qa.created_at >= p_from and qa.created_at < p_to
     group by qa.student_id
  ),
  wins as (
    select m.student_id, array_agg(k.name order by m.recheck_passed_at, k.name) as names
      from public.student_skill_mastery m
      join public.skills k on k.id = m.skill_id
     where m.status = 'mastered'
       and m.recheck_passed_at >= p_from and m.recheck_passed_at < p_to
     group by m.student_id
  ),
  finished as (
    select pa.student_id,
           pa.module_id,
           pa.section_id,
           coalesce(pa.submitted_at, pa.started_at + make_interval(secs => coalesce(pa.time_limit_sec, 0))) as done_at
      from public.prep_attempts pa
     where pa.status in ('submitted', 'expired')
  ),
  tests as (
    select f.student_id,
           jsonb_agg(jsonb_build_object('module_id', f.module_id, 'section_id', f.section_id, 'at', f.done_at)
                     order by f.done_at) as list
      from finished f
     where f.done_at >= p_from and f.done_at < p_to
     group by f.student_id
  ),
  essays as (
    select e.student_id, count(*)::integer as n
      from public.prep_essay_attempts e
     where e.submitted_at >= p_from and e.submitted_at < p_to
     group by e.student_id
  ),
  last_seen as (
    select x.student_id, max(x.at) as at
      from (
        select qa.student_id, qa.created_at as at from public.question_attempts qa
         where not coalesce(qa.is_diagnostic, false) and qa.created_at < p_to
        union all
        select se.student_id, se.updated_at from public.sessions se where se.updated_at < p_to
        union all
        select f.student_id, f.done_at from finished f where f.done_at < p_to
        union all
        select e.student_id, e.submitted_at from public.prep_essay_attempts e where e.submitted_at < p_to
      ) x
     group by x.student_id
  )
  select k.id,
         k.parent_id,
         k.first_name,
         k.grade,
         coalesce(k.above_grade_ok, false),
         coalesce(k.school_covered, false),
         k.school_id,
         k.dean_student_id,
         u.email::text,
         p.subscription_status,
         coalesce((select array_agg(distinct x order by x)
                     from unnest(coalesce(sess.subjects, '{}') || coalesce(checks.subjects, '{}')) as x), '{}'),
         coalesce(checks.answered, 0),
         coalesce(checks.right_n, 0),
         coalesce(wins.names, '{}'),
         coalesce(tests.list, '[]'::jsonb),
         coalesce(essays.n, 0),
         (sess.student_id is not null or checks.student_id is not null or wins.student_id is not null
          or tests.student_id is not null or essays.student_id is not null),
         last_seen.at,
         k.created_at
    from kids k
    left join auth.users u on u.id = k.parent_id
    left join public.profiles p on p.id = k.parent_id
    left join sess on sess.student_id = k.id
    left join checks on checks.student_id = k.id
    left join wins on wins.student_id = k.id
    left join tests on tests.student_id = k.id
    left join essays on essays.student_id = k.id
    left join last_seen on last_seen.student_id = k.id;
$$;

-- ---------------------------------------------------------------------------
-- 4) Grants (CLAUDE.md: revoke from public and anon, grant explicitly).
--    The cron runs as the service role; nothing here is for the browser.
-- ---------------------------------------------------------------------------
revoke all on function public.parent_email_activity(timestamptz, timestamptz) from public, anon, authenticated;
grant execute on function public.parent_email_activity(timestamptz, timestamptz) to service_role;

commit;
