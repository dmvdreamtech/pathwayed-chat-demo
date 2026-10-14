-- ===========================================================================
-- 0030_staff_progress_access.sql
--
-- Read-only access for school staff to their own school's tutoring progress.
--
-- HOW TO APPLY: paste into the Supabase SQL editor and run against
-- papiowjjoyhnbyhgtbxq (tutoring). NOT the console project. Idempotent, and
-- safe to re-run. The checks are in 0030_staff_progress_access_verify.sql, a
-- separate single paste, run after this commits. Staff rows are loaded by
-- 0030_school_staff_pallotti_seed.sql after the verify passes.
--
-- Schema read from the live database on 2026-10-14 before writing. The
-- recompute_skill_mastery body below is the live body (identical to section 3
-- of 0010; 0022 does not redefine it) with advanced_at added and nothing else
-- changed.
--
-- ---------------------------------------------------------------------------
-- WHAT THIS DOES
-- ---------------------------------------------------------------------------
--  1) students.school_id. Until now no table here stored which school a
--     covered student belongs to: the school_id was known only at sign-in
--     (SCHOOL_DOMAIN_MAP in api/school-login.ts, the request body in
--     api/school-pin-login.ts) and then dropped. The column is written ONLY by
--     the service role, beside school_covered. The 0025 column grants already
--     withhold INSERT and UPDATE on any column not on their list, so a client
--     cannot write it. Backfilled from school_domains.school_id by the sign-in
--     email domain. Only pallottihs.info is mapped; the dmvdream.org test
--     account is deliberately left null.
--  2) school_staff. One row per staff email per school. user_id is linked on
--     first sign-in by link_staff_account(). A signed-in user can read only
--     their own rows, so a student sees nothing.
--  3) Helpers: staff_role_for, can_view_test_scores, link_staff_account, and
--     the two row checks the policies use.
--  4) student_skill_mastery.advanced_at: the moment a skill first reached the
--     ADVANCE bar (>= 70% over >= 5 graded, non-diagnostic attempts). The
--     engine stamps it once and never clears it, like recheck_passed_at.
--     Backfilled by replaying each student's attempts in order.
--  5) Staff SELECT policies on student_skill_mastery and on the non-diagnostic
--     rows of question_attempts.
--  6) Test scores (diagnostic rows of question_attempts, prep_attempts,
--     readiness_scores): staff SELECT only when can_view_test_scores is true
--     (guidance, admin, academic_dean). The UI for these comes in step 3.
--  7) Three read functions that return only safe columns, because row security
--     cannot hide columns:
--       staff_search_students(query)    name, grade, email, last active
--       staff_student_profile(id)       the same plus days active this month
--       staff_student_sessions(id)      subject and timestamps only
--
-- ---------------------------------------------------------------------------
-- WHAT THIS DELIBERATELY DOES NOT DO
-- ---------------------------------------------------------------------------
--  * No staff policy on sessions. Chat is stored in sessions.transcript and
--    sessions.messages, and a row policy would expose both.
--  * No staff policy on profiles (parent_pin_hash, stripe_customer_id) or on
--    students (pin, pin_hash). Staff reach names, grades and emails only
--    through the functions in section 7.
--  * No staff access to prep_essay_attempts (essay text and tutor feedback).
--  * No change to any anon grant. That is a separate cleanup migration.
--
-- Every staff path requires ALL of: an active school_staff row whose user_id
-- is the caller, a student with school_covered = true, and the student's
-- school_id equal to the staff row's school_id. Teachers see the whole school
-- until class rosters exist.
-- ===========================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1) Which school a covered student belongs to.
-- ---------------------------------------------------------------------------
alter table public.students
  add column if not exists school_id uuid;

create index if not exists students_school_id_idx
  on public.students (school_id)
  where school_id is not null;

alter table public.school_domains
  add column if not exists school_id uuid;

update public.school_domains
   set school_id = 'addc2fb2-8b81-4d11-90ec-cf358c56be07'
 where domain = 'pallottihs.info'
   and school_id is null;

-- Backfill by the student's own sign-in email. Only mapped domains match, so
-- covered.pathwayed.local (no school_id) and dmvdream.org (not in the table)
-- stay null.
update public.students s
   set school_id = d.school_id
  from auth.users u, public.school_domains d
 where u.id = s.parent_id
   and d.domain = lower(btrim(split_part(u.email, '@', 2)))
   and d.school_id is not null
   and s.school_covered
   and s.school_id is null;

-- ---------------------------------------------------------------------------
-- 2) school_staff.
-- ---------------------------------------------------------------------------
create table if not exists public.school_staff (
  id          uuid primary key default gen_random_uuid(),
  school_id   uuid not null,
  email       text not null,
  user_id     uuid references auth.users (id) on delete set null,
  role        text not null,
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  constraint school_staff_email_normalised
    check (email = lower(btrim(email)) and position('@' in email) > 1),
  constraint school_staff_role_check
    check (role in ('teacher', 'guidance', 'admin', 'academic_dean')),
  constraint school_staff_school_email_key unique (school_id, email)
);

create index if not exists school_staff_user_id_idx
  on public.school_staff (user_id)
  where user_id is not null;

alter table public.school_staff enable row level security;

-- Default privileges in this project hand every new table to anon and
-- authenticated with full rights. Take all of it back, then grant the one
-- read the policy below allows. Writes are service role only.
revoke all on public.school_staff from public, anon, authenticated;
grant select on public.school_staff to authenticated;

drop policy if exists "staff read own rows" on public.school_staff;
create policy "staff read own rows"
  on public.school_staff
  for select
  to authenticated
  using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 3) Helpers. SECURITY DEFINER with an empty search_path, so every object is
--    schema-qualified. Default privileges also grant EXECUTE to anon, so each
--    is revoked from public and anon before the grant to authenticated.
-- ---------------------------------------------------------------------------

-- The caller's role at a school, or null. If one account holds two rows at a
-- school, the broadest role wins.
create or replace function public.staff_role_for(p_school_id uuid)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select ss.role
    from public.school_staff ss
   where ss.school_id = p_school_id
     and ss.user_id = auth.uid()
     and ss.active
   order by case ss.role
              when 'academic_dean' then 1
              when 'admin'         then 2
              when 'guidance'      then 3
              else 4
            end
   limit 1;
$$;

create or replace function public.can_view_test_scores(p_school_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    public.staff_role_for(p_school_id) in ('guidance', 'admin', 'academic_dean'),
    false
  );
$$;

-- Row checks used by the policies. True only for a covered student at a school
-- where the caller is active staff.
create or replace function public.staff_can_view_student(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
      from public.students s
     where s.id = p_student_id
       and s.school_covered
       and s.school_id is not null
       and public.staff_role_for(s.school_id) is not null
  );
$$;

create or replace function public.staff_can_view_student_scores(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
      from public.students s
     where s.id = p_student_id
       and s.school_covered
       and s.school_id is not null
       and public.can_view_test_scores(s.school_id)
  );
$$;

-- Link the caller's account to every unlinked staff row at their email. Any
-- auth provider counts; the email must be confirmed. Called by /staff on load.
-- Returns how many rows it linked (0 on every call after the first).
create or replace function public.link_staff_account()
returns integer
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_uid    uuid := auth.uid();
  v_email  text;
  v_linked integer;
begin
  if v_uid is null then
    return 0;
  end if;

  select lower(btrim(u.email))
    into v_email
    from auth.users u
   where u.id = v_uid
     and u.email_confirmed_at is not null;

  if v_email is null or v_email = '' then
    return 0;
  end if;

  update public.school_staff ss
     set user_id = v_uid
   where ss.email = v_email
     and ss.user_id is null;

  get diagnostics v_linked = row_count;
  return v_linked;
end;
$$;

revoke all on function public.staff_role_for(uuid)                from public, anon;
revoke all on function public.can_view_test_scores(uuid)          from public, anon;
revoke all on function public.staff_can_view_student(uuid)        from public, anon;
revoke all on function public.staff_can_view_student_scores(uuid) from public, anon;
revoke all on function public.link_staff_account()                from public, anon;
grant execute on function public.staff_role_for(uuid)                to authenticated;
grant execute on function public.can_view_test_scores(uuid)          to authenticated;
grant execute on function public.staff_can_view_student(uuid)        to authenticated;
grant execute on function public.staff_can_view_student_scores(uuid) to authenticated;
grant execute on function public.link_staff_account()                to authenticated;

-- ---------------------------------------------------------------------------
-- 4) advanced_at: when a skill first reached the ADVANCE bar.
-- ---------------------------------------------------------------------------
alter table public.student_skill_mastery
  add column if not exists advanced_at timestamptz;

create or replace function public.recompute_skill_mastery(p_student uuid, p_skill uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_all_n        int;
  v_all_correct  int;
  v_all_acc      numeric;
  v_q_n          int;   -- quality attempts (graded, non-diagnostic, not too fast)
  v_q_correct    int;
  v_q_acc        numeric;
  v_post_n       int;   -- quality attempts >= 3 days after first_bar_met_at
  v_existing_first timestamptz;
  v_first_met    timestamptz;
  v_recheck_at   timestamptz;
  v_status       text;
begin
  select first_bar_met_at into v_existing_first
    from public.student_skill_mastery
   where student_id = p_student and skill_id = p_skill;

  with atts as (
    select qa.generated_question_id, qa.is_correct, qa.time_ms, qa.created_at
    from public.question_attempts qa
    where qa.student_id = p_student
      and qa.skill_id = p_skill
      and qa.is_diagnostic = false
  ),
  med as (
    -- Per-question median time, only where >= 5 timed attempts exist to trust it.
    select q2.generated_question_id,
           percentile_cont(0.5) within group (order by q2.time_ms) as median_ms,
           count(*) as timed_n
    from public.question_attempts q2
    where q2.is_diagnostic = false
      and q2.time_ms is not null
      and q2.generated_question_id in (
        select distinct generated_question_id from atts where generated_question_id is not null
      )
    group by q2.generated_question_id
  ),
  flagged as (
    select a.*,
      (a.time_ms is not null and m.median_ms is not null and m.timed_n >= 5
         and a.time_ms < 0.4 * m.median_ms) as too_fast
    from atts a
    left join med m on m.generated_question_id = a.generated_question_id
  )
  select
    count(*),
    count(*) filter (where is_correct),
    count(*) filter (where not too_fast),
    count(*) filter (where not too_fast and is_correct),
    count(*) filter (where not too_fast
                       and v_existing_first is not null
                       and created_at >= v_existing_first + interval '3 days')
  into v_all_n, v_all_correct, v_q_n, v_q_correct, v_post_n
  from flagged;

  v_all_acc := case when v_all_n > 0 then round(100.0 * v_all_correct / v_all_n, 1) else null end;
  v_q_acc   := case when v_q_n   > 0 then round(100.0 * v_q_correct   / v_q_n,   1) else null end;

  -- MASTERED accuracy+count bar first met? Stamp first_bar_met_at once (persist).
  v_first_met := v_existing_first;
  if v_first_met is null and v_q_n >= 8 and v_q_acc >= 85 then
    v_first_met := now();
  end if;

  -- Spaced re-check passed? (>= 3 days after first bar, >= 2 further quality
  -- attempts, overall quality accuracy still >= 85%.)
  v_recheck_at := null;
  if v_first_met is not null and v_q_n >= 8 and v_q_acc >= 85
     and now() >= v_first_met + interval '3 days'
     and v_post_n >= 2 then
    v_recheck_at := now();
  end if;

  -- Status. mastered only after the spaced re-check; advanced is the ADVANCE bar.
  if v_all_n = 0 then
    v_status := 'not_started';
  elsif v_recheck_at is not null then
    v_status := 'mastered';
  elsif v_all_n >= 5 and v_all_acc >= 70 then
    v_status := 'advanced';
  else
    v_status := 'practicing';
  end if;

  insert into public.student_skill_mastery
    (student_id, skill_id, status, evidence_accuracy, attempts_counted,
     first_bar_met_at, recheck_passed_at, computed_at, last_practiced,
     advanced_at)
  values
    (p_student, p_skill, v_status, v_q_acc, v_q_n,
     v_first_met, v_recheck_at, now(), now(),
     case when v_status in ('advanced', 'mastered') then now() end)
  on conflict (student_id, skill_id) do update set
    status             = excluded.status,
    evidence_accuracy  = excluded.evidence_accuracy,
    attempts_counted   = excluded.attempts_counted,
    first_bar_met_at   = excluded.first_bar_met_at,
    -- mastered is durable: never clear a passed re-check on a later recompute.
    recheck_passed_at  = coalesce(public.student_skill_mastery.recheck_passed_at, excluded.recheck_passed_at),
    computed_at        = excluded.computed_at,
    last_practiced     = excluded.last_practiced,
    -- First time the ADVANCE bar was met. Stamped once, never cleared, so a
    -- later slip back to practicing keeps the date it was first earned.
    advanced_at        = coalesce(public.student_skill_mastery.advanced_at, excluded.advanced_at);
end;
$$;

revoke all on function public.recompute_skill_mastery(uuid, uuid) from public, anon, authenticated;

-- Backfill: replay each (student, skill)'s graded attempts in order and take
-- the first attempt at which the engine's own ADVANCE test held (>= 5 graded
-- attempts so far, accuracy so far >= 70 after the same rounding). A row with
-- no such attempt stays null, including any mastered row whose all-attempt
-- accuracy never crossed 70; Recent wins reads recheck_passed_at for those.
with ordered as (
  select qa.student_id,
         qa.skill_id,
         qa.created_at,
         count(*) over w                                as n_so_far,
         count(*) filter (where qa.is_correct) over w   as correct_so_far
    from public.question_attempts qa
   where qa.is_diagnostic = false
  window w as (
    partition by qa.student_id, qa.skill_id
    order by qa.created_at, qa.id
    rows between unbounded preceding and current row
  )
),
crossed as (
  select o.student_id, o.skill_id, min(o.created_at) as first_advanced_at
    from ordered o
   where o.n_so_far >= 5
     and round(100.0 * o.correct_so_far / o.n_so_far, 1) >= 70
   group by o.student_id, o.skill_id
)
update public.student_skill_mastery m
   set advanced_at = c.first_advanced_at
  from crossed c
 where m.student_id = c.student_id
   and m.skill_id = c.skill_id
   and m.advanced_at is null;

-- ---------------------------------------------------------------------------
-- 5) Staff reads of progress. Added beside the existing family policies,
--    which are untouched. Permissive policies OR together, so families keep
--    exactly the access they had.
-- ---------------------------------------------------------------------------
grant select on public.student_skill_mastery to authenticated;
grant select on public.question_attempts     to authenticated;

drop policy if exists "staff read school mastery" on public.student_skill_mastery;
create policy "staff read school mastery"
  on public.student_skill_mastery
  for select
  to authenticated
  using (public.staff_can_view_student(student_id));

drop policy if exists "staff read school check attempts" on public.question_attempts;
create policy "staff read school check attempts"
  on public.question_attempts
  for select
  to authenticated
  using (is_diagnostic = false and public.staff_can_view_student(student_id));

-- ---------------------------------------------------------------------------
-- 6) Test scores: guidance, admin and academic_dean only.
-- ---------------------------------------------------------------------------
grant select on public.prep_attempts    to authenticated;
grant select on public.readiness_scores to authenticated;

drop policy if exists "staff read school placement attempts" on public.question_attempts;
create policy "staff read school placement attempts"
  on public.question_attempts
  for select
  to authenticated
  using (is_diagnostic = true and public.staff_can_view_student_scores(student_id));

drop policy if exists "staff read school prep attempts" on public.prep_attempts;
create policy "staff read school prep attempts"
  on public.prep_attempts
  for select
  to authenticated
  using (public.staff_can_view_student_scores(student_id));

drop policy if exists "staff read school readiness" on public.readiness_scores;
create policy "staff read school readiness"
  on public.readiness_scores
  for select
  to authenticated
  using (public.staff_can_view_student_scores(student_id));

-- ---------------------------------------------------------------------------
-- 7) Safe-column reads. Each returns ONLY the columns named in its result, so
--    sessions.transcript, sessions.messages, profiles.parent_pin_hash,
--    profiles.stripe_customer_id, students.pin and students.pin_hash cannot
--    leave through them. K-8 minted accounts carry a placeholder address,
--    which is returned as null rather than shown as an email.
-- ---------------------------------------------------------------------------

-- Search across every school the caller is active staff at. An empty query
-- lists the whole school. Matches a first-name or email fragment, or an exact
-- grade ("9", "grade 9", "K").
create or replace function public.staff_search_students(p_query text)
returns table (
  student_id      uuid,
  school_id       uuid,
  first_name      text,
  grade           text,
  email           text,
  last_active_at  timestamptz
)
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
  )
  select s.id,
         s.school_id,
         s.first_name,
         s.grade,
         case when p.email ilike '%@covered.pathwayed.local' then null else p.email end,
         greatest(
           (select max(qa.created_at) from public.question_attempts qa where qa.student_id = s.id),
           (select max(se.updated_at) from public.sessions se where se.student_id = s.id)
         )
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
   order by lower(s.first_name), s.grade, s.id
   limit 200;
$$;

-- One student's header. Zero rows unless the caller may view the student.
-- Days are counted in the school's local time (America/New_York); a day counts
-- if it has a graded or placement answer or a saved tutoring session.
create or replace function public.staff_student_profile(p_student_id uuid)
returns table (
  student_id              uuid,
  school_id               uuid,
  first_name              text,
  grade                   text,
  email                   text,
  last_active_at          timestamptz,
  days_active_this_month  integer
)
language sql
stable
security definer
set search_path = ''
as $$
  with month_start as (
    select date_trunc('month', now() at time zone 'America/New_York') as local_start
  ),
  activity as (
    select qa.created_at as activity_at from public.question_attempts qa where qa.student_id = p_student_id
    union all
    select se.updated_at from public.sessions se where se.student_id = p_student_id
  )
  select s.id,
         s.school_id,
         s.first_name,
         s.grade,
         case when p.email ilike '%@covered.pathwayed.local' then null else p.email end,
         (select max(a.activity_at) from activity a),
         (select count(distinct (a.activity_at at time zone 'America/New_York')::date)::integer
            from activity a, month_start m
           where (a.activity_at at time zone 'America/New_York') >= m.local_start)
    from public.students s
    left join public.profiles p on p.id = s.parent_id
   where s.id = p_student_id
     and public.staff_can_view_student(s.id);
$$;

-- A student's tutoring sessions without their content. One row per subject,
-- as the table stores them.
create or replace function public.staff_student_sessions(p_student_id uuid)
returns table (
  subject     text,
  started_at  timestamptz,
  ended_at    timestamptz,
  updated_at  timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select se.subject, se.started_at, se.ended_at, se.updated_at
    from public.sessions se
   where se.student_id = p_student_id
     and public.staff_can_view_student(se.student_id)
   order by se.updated_at desc;
$$;

revoke all on function public.staff_search_students(text)  from public, anon;
revoke all on function public.staff_student_profile(uuid)  from public, anon;
revoke all on function public.staff_student_sessions(uuid) from public, anon;
grant execute on function public.staff_search_students(text)  to authenticated;
grant execute on function public.staff_student_profile(uuid)  to authenticated;
grant execute on function public.staff_student_sessions(uuid) to authenticated;

commit;

-- ===========================================================================
-- ROLLBACK (run by hand, in this order, only if 0030 must come out).
--
-- Before rolling back, revert the API change that writes students.school_id
-- (api/school-login.ts, api/mint-session.ts): once the column is gone those
-- writes fail, and the K-8 insert path returns a 500.
--
-- begin;
-- drop function if exists public.staff_student_sessions(uuid);
-- drop function if exists public.staff_student_profile(uuid);
-- drop function if exists public.staff_search_students(text);
-- drop policy if exists "staff read school readiness"           on public.readiness_scores;
-- drop policy if exists "staff read school prep attempts"       on public.prep_attempts;
-- drop policy if exists "staff read school placement attempts"  on public.question_attempts;
-- drop policy if exists "staff read school check attempts"      on public.question_attempts;
-- drop policy if exists "staff read school mastery"             on public.student_skill_mastery;
-- -- Restore the engine: re-run section 3 of migrations/0010_mastery_certainty.sql
-- -- (the create or replace of recompute_skill_mastery and its revoke) BEFORE
-- -- dropping the column, or every graded answer fails on the missing column.
-- alter table public.student_skill_mastery drop column if exists advanced_at;
-- drop function if exists public.link_staff_account();
-- drop function if exists public.staff_can_view_student_scores(uuid);
-- drop function if exists public.staff_can_view_student(uuid);
-- drop function if exists public.can_view_test_scores(uuid);
-- drop function if exists public.staff_role_for(uuid);
-- drop table if exists public.school_staff;
-- alter table public.school_domains drop column if exists school_id;
-- drop index if exists public.students_school_id_idx;
-- alter table public.students drop column if exists school_id;
-- commit;
--
-- The select grants re-stated in sections 5 and 6 were already held by
-- authenticated before 0030 and are left in place.
-- ===========================================================================
