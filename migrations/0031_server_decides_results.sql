-- ===========================================================================
-- 0031_server_decides_results.sql
--
-- Students and parents send inputs: answers, choices, drafts, names. The
-- server decides results: grades, mastery, readiness, working grade, seats,
-- school fields. After this migration nothing the browser sends can write a
-- result, and the anonymous role can read or write nothing at all.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq
-- (tutoring) and run once. Requires 0030 (students.school_id, school_staff,
-- the staff_* functions). Idempotent: a second run changes nothing. Then run
-- 0031_server_decides_results_verify.sql. Deploy the matching app build right
-- after (see DEPLOY ORDER).
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES, BY TABLE
-- ---------------------------------------------------------------------------
--  question_attempts   The browser still inserts one row per answer, but only
--                      the inputs count: question, chosen option, time taken,
--                      placement flag. A trigger grades it from the stored
--                      question and overwrites is_correct, skill_id,
--                      sat_alignment and the misconception token, and stamps
--                      created_at with the server clock. A forged
--                      is_correct = true on a wrong option is stored as false.
--                      Old app builds still open in a tab keep working: they
--                      send the result fields too, and the trigger ignores them.
--  student_skill_mastery  No browser insert or update. The mastery engine
--                      (recompute_skill_mastery, fired by the answer trigger)
--                      was already the only writer of status and evidence.
--                      The two legacy browser writes become functions that
--                      read server-graded answers: record_practice_result and
--                      seed_placement_mastery.
--  readiness_scores    No browser insert or update. api/readiness.ts computes
--                      it with the service role from server data only.
--  profiles            The browser may update display_name and nothing else.
--                      Plan, seats, trial, Stripe and email stamps are written
--                      only by the server (Stripe webhook, crons, PIN RPCs).
--  students            working_grade is no longer client-writable;
--                      raise_working_grade_if_earned promotes on evidence.
--                      On a school-covered row the browser cannot change
--                      first_name, grade, level or above_grade_ok, and cannot
--                      delete the row. Turning a child on, or adding one,
--                      beyond the account's seat cap is refused.
--  prep_attempts /     Browser may only update answers / essay_text while the
--  prep_essay_attempts existing guards allow it. No insert (the start RPCs do
--                      that) and no delete.
--  sessions, consents, Only the columns the app writes, server timestamps,
--  feedback,           no deletes.
--  student_focus_skills
--  every table         anon loses every privilege. authenticated loses
--                      TRUNCATE, TRIGGER and REFERENCES. Every remaining
--                      policy is matched by an explicit grant.
--  functions           Nothing in public is executable by anon or PUBLIC.
--                      prep_essay_save_feedback and prep_compute_score become
--                      service-role only.
--  default privileges  New tables, sequences and functions created by postgres
--                      no longer grant anything to anon, new functions no
--                      longer grant EXECUTE to PUBLIC, and new tables no longer
--                      grant TRUNCATE, TRIGGER or REFERENCES to authenticated.
--                      authenticated still gets the rest by default, so a new
--                      table still needs row security and its own grants.
--
-- Also: every advanced or mastered skill row gets an advanced_at (0030's
-- backfill missed 3 rows, all on the hand-seeded Demo Student, which has
-- mastery rows but no answers to replay), and a check keeps it that way.
--
-- ---------------------------------------------------------------------------
-- WHO COUNTS AS "THE BROWSER"
-- ---------------------------------------------------------------------------
-- request_is_from_client() is true when the request's verified JWT carries
-- role authenticated or anon, which is every PostgREST call made with the
-- publishable key or a user session, including minted K-8 tokens. The service
-- role and the SQL editor are trusted and pass through the guards unchanged,
-- which is what lets school-login, mint-session, the webhook and the crons
-- keep writing exactly what they write today.
--
-- ---------------------------------------------------------------------------
-- DEPLOY ORDER
-- ---------------------------------------------------------------------------
--  1. Run this file, then the verify file.
--  2. Deploy the security-0031 app build. The new build relies on the answer
--     trigger (it no longer sends is_correct) and on the new functions, so it
--     must not go live before this migration.
--  3. Redeploy the school-progress edge function (it now filters by
--     students.school_id).
-- Between steps 1 and 2 an already-open old tab still records answers and
-- still reads everything. Its best-effort writes that now belong to the server
-- (legacy practice numbers, placement seed, readiness, working grade) fail
-- quietly and are logged in that tab's console, exactly like a network error.
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (manual; run as one script in the SQL editor if ever needed)
-- ---------------------------------------------------------------------------
-- begin;
-- drop trigger if exists question_attempts_server_grade on public.question_attempts;
-- drop trigger if exists students_client_guard on public.students;
-- drop trigger if exists sessions_server_clock on public.sessions;
-- drop trigger if exists consents_server_clock on public.consents;
-- drop trigger if exists feedback_server_clock on public.feedback;
-- drop trigger if exists student_focus_skills_server_clock on public.student_focus_skills;
-- drop function if exists public.question_attempts_server_grade();
-- drop function if exists public.students_client_guard();
-- drop function if exists public.sessions_server_clock();
-- drop function if exists public.consents_server_clock();
-- drop function if exists public.feedback_server_clock();
-- drop function if exists public.student_focus_skills_server_clock();
-- drop function if exists public.record_practice_result(uuid, uuid, uuid[]);
-- drop function if exists public.seed_placement_mastery(uuid, uuid[]);
-- drop function if exists public.raise_working_grade_if_earned(uuid);
-- drop function if exists public.account_seat_cap(uuid);
-- drop function if exists public.request_is_from_client();
-- alter table public.student_skill_mastery drop constraint if exists student_skill_mastery_advanced_has_date;
-- -- Restore the pre-0031 client writes (the old app build needs these):
-- grant insert, update on public.student_skill_mastery to authenticated;
-- create policy "insert own children mastery" on public.student_skill_mastery for insert to authenticated with check (public.owns_student(student_id));
-- create policy "update own children mastery" on public.student_skill_mastery for update to authenticated using (public.owns_student(student_id)) with check (public.owns_student(student_id));
-- grant insert, update on public.readiness_scores to authenticated;
-- create policy "insert own children readiness" on public.readiness_scores for insert to authenticated with check (public.owns_student(student_id));
-- create policy "update own children readiness" on public.readiness_scores for update to authenticated using (public.owns_student(student_id)) with check (public.owns_student(student_id));
-- grant insert, update, delete on public.profiles to authenticated;
-- grant update (working_grade, working_grade_updated_at, working_grade_reason) on public.students to authenticated;
-- grant insert, delete on public.prep_attempts, public.prep_essay_attempts to authenticated;
-- grant update on public.prep_attempts, public.prep_essay_attempts, public.sessions, public.student_focus_skills to authenticated;
-- grant update, delete on public.consents, public.feedback to authenticated;
-- grant execute on function public.prep_essay_save_feedback(uuid, text), public.prep_compute_score(uuid) to authenticated;
-- commit;
-- The anon revocations are deliberately not in the rollback: nothing in the
-- app signs in as anon against these tables, and restoring them helps nobody.
-- The advanced_at values written by section 1 are correct data and stay.
-- ===========================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1) advanced_at for every advanced or mastered row, and a check to keep it.
--    0030 replayed graded answers to find when the ADVANCE bar was first met.
--    Rows with no answers to replay (the hand-seeded Demo Student: 2 mastered
--    and 1 advanced row, written by migrations/demo/seed_demo_student.sql
--    before advanced_at existed) were left null. Fall back to the first bar
--    date, then last practice, then the row's own timestamps, which are never
--    null, so no such row can stay empty.
-- ---------------------------------------------------------------------------
update public.student_skill_mastery m
   set advanced_at = coalesce(m.first_bar_met_at, m.last_practiced, m.computed_at,
                              m.updated_at, m.created_at)
 where m.status in ('advanced', 'mastered')
   and m.advanced_at is null;

alter table public.student_skill_mastery
  drop constraint if exists student_skill_mastery_advanced_has_date;
alter table public.student_skill_mastery
  add constraint student_skill_mastery_advanced_has_date
  check (status not in ('advanced', 'mastered') or advanced_at is not null);

-- ---------------------------------------------------------------------------
-- 2) Who is asking. True for a PostgREST request made as a signed-in user or
--    with the publishable key; false for the service role and the SQL editor.
--    Reads the verified JWT claims, which a client cannot set.
-- ---------------------------------------------------------------------------
create or replace function public.request_is_from_client()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(
           nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role',
           nullif(current_setting('request.jwt.claim.role', true), ''),
           ''
         ) in ('authenticated', 'anon');
$$;

-- ---------------------------------------------------------------------------
-- 3) Answers are graded by the server.
-- ---------------------------------------------------------------------------
create or replace function public.question_attempts_server_grade()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_q      record;
  v_choice jsonb;
begin
  if not public.request_is_from_client() then
    return new;
  end if;

  if new.generated_question_id is null then
    raise exception 'an answer must name the question it answers';
  end if;

  -- Any status: a question retired while a child had it open still grades.
  select gq.skill_id, gq.sat_alignment, gq.choices
    into v_q
    from public.generated_questions gq
   where gq.id = new.generated_question_id;
  if not found then
    raise exception 'unknown question %', new.generated_question_id;
  end if;

  -- Same rule as scoreChoice in src/lib/questions.ts: a missing or out of
  -- range option is a wrong answer with no misconception.
  if new.chosen_choice_index is not null
     and new.chosen_choice_index >= 0
     and jsonb_typeof(v_q.choices) = 'array'
     and new.chosen_choice_index < jsonb_array_length(v_q.choices) then
    v_choice := v_q.choices -> new.chosen_choice_index;
  end if;

  new.is_correct                := coalesce((v_choice ->> 'is_correct') = 'true', false);
  new.chosen_misconception_token := nullif(v_choice ->> 'misconception_token', '');
  new.skill_id                  := v_q.skill_id;
  new.sat_alignment             := v_q.sat_alignment;
  new.created_at                := now();
  new.time_ms                   := case when new.time_ms is null then null
                                        else least(greatest(new.time_ms, 0), 3600000) end;
  return new;
end;
$$;

drop trigger if exists question_attempts_server_grade on public.question_attempts;
create trigger question_attempts_server_grade
  before insert on public.question_attempts
  for each row execute function public.question_attempts_server_grade();

revoke all on public.question_attempts from anon, authenticated;
grant select on public.question_attempts to authenticated;
-- The result columns stay in the grant only so an old open tab, which still
-- sends them, is not refused. The trigger overwrites every one of them.
grant insert (student_id, generated_question_id, chosen_choice_index, time_ms, is_diagnostic,
              is_correct, skill_id, sat_alignment, chosen_misconception_token)
  on public.question_attempts to authenticated;
-- Policies kept: "question_attempts insert own", "question_attempts select own",
-- and the two staff read policies from 0030.

-- ---------------------------------------------------------------------------
-- 4) Mastery: read only for browsers. Two legacy writes move here.
-- ---------------------------------------------------------------------------
revoke all on public.student_skill_mastery from anon, authenticated;
grant select on public.student_skill_mastery to authenticated;
drop policy if exists "insert own children mastery" on public.student_skill_mastery;
drop policy if exists "update own children mastery" on public.student_skill_mastery;
-- Kept: "read own children mastery", "staff read school mastery".

-- The end of a Practice set. Writes the legacy self-rating ramp
-- (mastery_percentage, accuracy, attempts) exactly as nextMastery in
-- src/lib/skills.ts did, but from the server's grades of the answers named,
-- not from a number the browser sends. Only this student's graded answers on
-- this skill from the last day count. Nothing reads these three columns for a
-- decision (status and evidence_accuracy drive everything); they are kept
-- current for history and the nightly snapshot.
create or replace function public.record_practice_result(
  p_student_id  uuid,
  p_skill_id    uuid,
  p_attempt_ids uuid[]
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_n        integer;
  v_correct  integer;
  v_signal   numeric;
  v_prior    record;
  v_attempts integer;
  v_accuracy numeric;
  v_mastery  numeric;
begin
  if not public.owns_student(p_student_id) then
    raise exception 'not authorized for this student';
  end if;

  select count(*), count(*) filter (where qa.is_correct)
    into v_n, v_correct
    from public.question_attempts qa
   where qa.id = any(coalesce(p_attempt_ids, '{}'::uuid[]))
     and qa.student_id = p_student_id
     and qa.skill_id = p_skill_id
     and qa.is_diagnostic = false
     and qa.created_at > now() - interval '1 day';
  if v_n = 0 then
    return null;
  end if;

  -- summarizeAttempts: Math.round(100 * correct / total).
  v_signal := round(100.0 * v_correct / v_n);

  select m.accuracy, m.attempts
    into v_prior
    from public.student_skill_mastery m
   where m.student_id = p_student_id and m.skill_id = p_skill_id
   for update;

  -- nextMastery: recency weight 0.4, full credit after 4 attempts.
  if found then
    v_attempts := coalesce(v_prior.attempts, 0) + 1;
    v_accuracy := least(100, greatest(0, round(v_prior.accuracy * 0.6 + v_signal * 0.4)));
  else
    v_attempts := 1;
    v_accuracy := least(100, greatest(0, v_signal));
  end if;
  v_mastery := least(100, greatest(0, round(v_accuracy * least(1, v_attempts / 4.0))));

  insert into public.student_skill_mastery
    (student_id, skill_id, mastery_percentage, accuracy, attempts, last_practiced)
  values
    (p_student_id, p_skill_id, v_mastery, v_accuracy, v_attempts, now())
  on conflict (student_id, skill_id) do update set
    mastery_percentage = excluded.mastery_percentage,
    accuracy           = excluded.accuracy,
    attempts           = excluded.attempts,
    last_practiced     = excluded.last_practiced;

  return jsonb_build_object(
    'skill_id', p_skill_id,
    'attempts', v_attempts,
    'accuracy', v_accuracy,
    'mastery_percentage', v_mastery
  );
end;
$$;

-- The end of a placement run. For each skill named, takes this student's most
-- recent server-graded placement answer and seeds the legacy numbers the way
-- seedDiagnosticMastery did (right 60, wrong 25). A skill the student never
-- answered in placement is skipped, and a skill with any real practice is
-- never touched, so earned history is never reset. Returns rows written.
create or replace function public.seed_placement_mastery(
  p_student_id uuid,
  p_skill_ids  uuid[]
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_written integer;
begin
  if not public.owns_student(p_student_id) then
    raise exception 'not authorized for this student';
  end if;

  with latest as (
    select distinct on (qa.skill_id) qa.skill_id, qa.is_correct
      from public.question_attempts qa
     where qa.student_id = p_student_id
       and qa.is_diagnostic
       and qa.skill_id = any(coalesce(p_skill_ids, '{}'::uuid[]))
     order by qa.skill_id, qa.created_at desc, qa.id desc
  ),
  eligible as (
    select l.skill_id, l.is_correct
      from latest l
     where not exists (
       select 1 from public.question_attempts p
        where p.student_id = p_student_id
          and p.skill_id = l.skill_id
          and p.is_diagnostic = false
     )
  )
  insert into public.student_skill_mastery
    (student_id, skill_id, mastery_percentage, accuracy, attempts, last_practiced)
  select p_student_id, e.skill_id,
         case when e.is_correct then 60 else 25 end,
         case when e.is_correct then 100 else 0 end,
         1, now()
    from eligible e
  on conflict (student_id, skill_id) do update set
    mastery_percentage = excluded.mastery_percentage,
    accuracy           = excluded.accuracy,
    attempts           = excluded.attempts,
    last_practiced     = excluded.last_practiced;

  get diagnostics v_written = row_count;
  return v_written;
end;
$$;

-- ---------------------------------------------------------------------------
-- 5) Readiness: read only for browsers. api/readiness.ts writes it.
-- ---------------------------------------------------------------------------
revoke all on public.readiness_scores from anon, authenticated;
grant select on public.readiness_scores to authenticated;
drop policy if exists "insert own children readiness" on public.readiness_scores;
drop policy if exists "update own children readiness" on public.readiness_scores;
-- Kept: "read own children readiness", "staff read school readiness".

-- ---------------------------------------------------------------------------
-- 6) Profiles: display_name is the only browser-writable column.
-- ---------------------------------------------------------------------------
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (display_name) on public.profiles to authenticated;
drop policy if exists "profiles_self" on public.profiles;
drop policy if exists "profiles_self_select" on public.profiles;
drop policy if exists "profiles_self_update" on public.profiles;
create policy "profiles_self_select" on public.profiles
  for select to authenticated using (id = auth.uid());
create policy "profiles_self_update" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- ---------------------------------------------------------------------------
-- 7) Students.
-- ---------------------------------------------------------------------------

-- The seat cap, the same rule as seatCap in src/lib/accessGate.ts: a paid
-- status gets paid_seats (or the plan's included seats when unset); anything
-- else gets the trial cap of 2. Included seats mirror PLANS in
-- src/lib/billing.ts. Change both places together.
create or replace function public.account_seat_cap(p_parent_id uuid)
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((
    select case
             when p.subscription_status in ('active', 'trialing', 'past_due') then
               case when coalesce(p.paid_seats, 0) > 0 then p.paid_seats
                    else case p.plan when 'elementary' then 1
                                     when 'middle'     then 2
                                     when 'high'       then 2
                                     else 1 end
               end
             else 2
           end
      from public.profiles p
     where p.id = p_parent_id
  ), 2);
$$;

create or replace function public.students_client_guard()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_in_use integer;
begin
  if not public.request_is_from_client() then
    return case when tg_op = 'DELETE' then old else new end;
  end if;

  -- The school owns these fields on a covered row. Students never consent to
  -- SAT framing for themselves.
  if tg_op = 'DELETE' then
    if old.school_covered then
      raise exception 'school_managed: a school-covered student cannot be removed here';
    end if;
    return old;
  end if;

  if tg_op = 'UPDATE' and old.school_covered and (
       new.first_name     is distinct from old.first_name
    or new.grade          is distinct from old.grade
    or new.level          is distinct from old.level
    or new.above_grade_ok is distinct from old.above_grade_ok) then
    raise exception 'school_managed: the school sets this student''s name, grade, level and SAT framing';
  end if;

  -- Seat cap: adding an active child, or turning a paused one back on.
  -- Covered children never count; their school holds the licence.
  if not new.school_covered and new.active
     and (tg_op = 'INSERT' or not old.active) then
    perform pg_advisory_xact_lock(hashtextextended('pathwayed-seats:' || new.parent_id::text, 0));
    select count(*) into v_in_use
      from public.students s
     where s.parent_id = new.parent_id
       and s.active
       and not s.school_covered
       and s.id <> new.id;
    if v_in_use + 1 > public.account_seat_cap(new.parent_id) then
      raise exception 'seat_cap_reached: every seat on this account is in use';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists students_client_guard on public.students;
create trigger students_client_guard
  before insert or update or delete on public.students
  for each row execute function public.students_client_guard();

revoke all on public.students from anon, authenticated;
grant select, delete on public.students to authenticated;
grant insert (parent_id, first_name, grade, level, avatar_mode) on public.students to authenticated;
grant update (first_name, grade, level, avatar_mode, above_grade_ok, active) on public.students to authenticated;
-- Same rule as before, now scoped to signed-in users instead of every role.
alter policy "students_own" on public.students to authenticated;

-- Working grade: promoted on evidence, never from a number the browser sends.
-- Mirrors the ladder rule in src/lib/gradeLadder.ts: when every practiceable
-- skill (has a published question, has a slug, not a prep-* subject) at the
-- student's working grade in one subject is advanced or mastered, the working
-- grade goes up by exactly one. Subjects are tried in the order math, reading,
-- writing, science, then the rest by name. Never lowers, never skips, stops
-- at 12. Returns {from, to, reason} when it promoted, else null.
create or replace function public.raise_working_grade_if_earned(p_student_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_student record;
  v_from    integer;
  v_subject text;
  v_reason  text;
begin
  if not public.owns_student(p_student_id) then
    raise exception 'not authorized for this student';
  end if;

  select s.grade, s.working_grade into v_student
    from public.students s where s.id = p_student_id;

  -- workingGradeNum: working_grade when set, else the grade ('K' and anything
  -- unrecognised are 0), clamped to 0..12.
  v_from := least(12, greatest(0, coalesce(
              v_student.working_grade,
              case when v_student.grade ~ '^[0-9]+$' then v_student.grade::integer else 0 end)));
  if v_from >= 12 then
    return null;
  end if;

  select sk.subject into v_subject
    from public.skills sk
   where sk.slug is not null
     and sk.name is not null
     and sk.subject not like 'prep-%'
     and sk.ccss_grade_num = v_from
     and exists (select 1 from public.generated_questions gq
                  where gq.skill_id = sk.id and gq.status = 'published')
   group by sk.subject
  having bool_and(exists (select 1 from public.student_skill_mastery m
                           where m.student_id = p_student_id
                             and m.skill_id = sk.id
                             and m.status in ('advanced', 'mastered')))
   order by coalesce(array_position(array['math', 'reading', 'writing', 'science'], sk.subject), 5),
            sk.subject
   limit 1;
  if v_subject is null then
    return null;
  end if;

  v_reason := format('cleared every %s %s skill',
                     case when v_from = 0 then 'kindergarten' else 'grade ' || v_from end,
                     v_subject);
  update public.students s
     set working_grade = v_from + 1,
         working_grade_updated_at = now(),
         working_grade_reason = v_reason
   where s.id = p_student_id
     and (s.working_grade is null or s.working_grade < v_from + 1);
  if not found then
    return null;
  end if;
  return jsonb_build_object('from', v_from, 'to', v_from + 1, 'reason', v_reason);
end;
$$;

-- ---------------------------------------------------------------------------
-- 8) Timed prep: only the student's draft input changes from the browser.
--    The 0016-0018 guards still decide everything else.
-- ---------------------------------------------------------------------------
revoke all on public.prep_attempts from anon, authenticated;
grant select on public.prep_attempts to authenticated;
grant update (answers) on public.prep_attempts to authenticated;
drop policy if exists "insert own children prep attempts" on public.prep_attempts;
drop policy if exists "delete own children prep attempts" on public.prep_attempts;
-- Kept: "read own children prep attempts", "update own children prep attempts",
-- "staff read school prep attempts".

revoke all on public.prep_essay_attempts from anon, authenticated;
grant select on public.prep_essay_attempts to authenticated;
grant update (essay_text) on public.prep_essay_attempts to authenticated;
drop policy if exists "insert own children prep essay attempts" on public.prep_essay_attempts;
drop policy if exists "delete own children prep essay attempts" on public.prep_essay_attempts;
-- Kept: "read own children prep essay attempts", "update own children prep essay attempts".

-- No owner check inside either; only the server may call them.
revoke all on function public.prep_essay_save_feedback(uuid, text) from public, anon, authenticated;
revoke all on function public.prep_compute_score(uuid) from public, anon, authenticated;
grant execute on function public.prep_essay_save_feedback(uuid, text) to service_role;
grant execute on function public.prep_compute_score(uuid) to service_role;

-- ---------------------------------------------------------------------------
-- 9) Sessions, consents, feedback, focus skills: inputs only, server clock.
-- ---------------------------------------------------------------------------
create or replace function public.sessions_server_clock()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.request_is_from_client() then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.started_at := now();
    new.ended_at   := case when new.ended_at is null then null else now() end;
  else
    new.started_at := old.started_at;
    new.ended_at   := case when new.ended_at is null then null
                           when new.ended_at is not distinct from old.ended_at then old.ended_at
                           else now() end;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists sessions_server_clock on public.sessions;
create trigger sessions_server_clock
  before insert or update on public.sessions
  for each row execute function public.sessions_server_clock();

revoke all on public.sessions from anon, authenticated;
grant select on public.sessions to authenticated;
-- The transcript upsert sends student_id and subject in its update set too.
grant insert (student_id, subject, messages, updated_at, ended_at)
  on public.sessions to authenticated;
grant update (student_id, subject, messages, updated_at, ended_at, skills_practiced, mastery_updates)
  on public.sessions to authenticated;
drop policy if exists "sessions_own" on public.sessions;
drop policy if exists "sessions_own_select" on public.sessions;
drop policy if exists "sessions_own_insert" on public.sessions;
drop policy if exists "sessions_own_update" on public.sessions;
create policy "sessions_own_select" on public.sessions
  for select to authenticated using (public.owns_student(student_id));
create policy "sessions_own_insert" on public.sessions
  for insert to authenticated with check (public.owns_student(student_id));
create policy "sessions_own_update" on public.sessions
  for update to authenticated using (public.owns_student(student_id))
  with check (public.owns_student(student_id));

create or replace function public.consents_server_clock()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if public.request_is_from_client() then
    new.consented_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists consents_server_clock on public.consents;
create trigger consents_server_clock
  before insert on public.consents
  for each row execute function public.consents_server_clock();

revoke all on public.consents from anon, authenticated;
grant select on public.consents to authenticated;
-- consented_at stays in the grant so an old tab is not refused; the trigger
-- replaces it with the server clock.
grant insert (parent_id, parent_name, method, consent_version, consented_at)
  on public.consents to authenticated;
drop policy if exists "consents_own" on public.consents;
drop policy if exists "consents_own_select" on public.consents;
drop policy if exists "consents_own_insert" on public.consents;
create policy "consents_own_select" on public.consents
  for select to authenticated using (parent_id = auth.uid());
create policy "consents_own_insert" on public.consents
  for insert to authenticated with check (parent_id = auth.uid());

create or replace function public.feedback_server_clock()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if public.request_is_from_client() then
    new.created_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists feedback_server_clock on public.feedback;
create trigger feedback_server_clock
  before insert on public.feedback
  for each row execute function public.feedback_server_clock();

revoke all on public.feedback from anon, authenticated;
grant select on public.feedback to authenticated;
grant insert (session_id, student_id, subject, rating, note) on public.feedback to authenticated;
drop policy if exists "feedback_own" on public.feedback;
drop policy if exists "feedback_own_select" on public.feedback;
drop policy if exists "feedback_own_insert" on public.feedback;
create policy "feedback_own_select" on public.feedback
  for select to authenticated using (public.owns_student(student_id));
create policy "feedback_own_insert" on public.feedback
  for insert to authenticated with check (public.owns_student(student_id));

create or replace function public.student_focus_skills_server_clock()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.request_is_from_client() then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.created_at := now();
  else
    new.created_at := old.created_at;
  end if;
  new.resolved_at := case when new.resolved_at is null then null
                          when tg_op = 'UPDATE' and new.resolved_at is not distinct from old.resolved_at
                            then old.resolved_at
                          else now() end;
  return new;
end;
$$;

drop trigger if exists student_focus_skills_server_clock on public.student_focus_skills;
create trigger student_focus_skills_server_clock
  before insert or update on public.student_focus_skills
  for each row execute function public.student_focus_skills_server_clock();

revoke all on public.student_focus_skills from anon, authenticated;
grant select on public.student_focus_skills to authenticated;
-- The SAT-miss upsert sends every column in its update set.
grant insert (student_id, skill_id, source, resolved_at) on public.student_focus_skills to authenticated;
grant update (student_id, skill_id, source, resolved_at) on public.student_focus_skills to authenticated;
-- Kept: "insert own children focus", "read own children focus", "update own children focus".

-- ---------------------------------------------------------------------------
-- 10) The rest, restated so every policy has its grant and nothing more.
-- ---------------------------------------------------------------------------
revoke all on public.prep_settings from anon, authenticated;
grant select, insert, update, delete on public.prep_settings to authenticated;

revoke all on public.prep_entitlements from anon, authenticated;
grant select on public.prep_entitlements to authenticated;

revoke all on public.mastery_snapshots from anon, authenticated;
grant select on public.mastery_snapshots to authenticated;

revoke all on public.skills from anon, authenticated;
grant select on public.skills to authenticated;
revoke all on public.generated_questions from anon, authenticated;
grant select on public.generated_questions to authenticated;
revoke all on public.passages from anon, authenticated;
grant select on public.passages to authenticated;
revoke all on public.question_templates from anon, authenticated;
grant select on public.question_templates to authenticated;

revoke all on public.school_staff from anon, authenticated;
grant select on public.school_staff to authenticated;

revoke all on public.school_domains from anon, authenticated;
revoke all on public.stripe_events from anon, authenticated;

-- ---------------------------------------------------------------------------
-- 11) anon and PUBLIC: nothing in public, now or later.
-- ---------------------------------------------------------------------------
revoke all on all tables    in schema public from anon;
revoke all on all sequences in schema public from anon;
revoke all on all functions in schema public from public, anon;

-- Functions a signed-in browser calls, or that a policy calls on its behalf.
-- Everything else in public (trigger functions, internal helpers, the mastery
-- engine) runs only as its owner.
revoke all on all functions in schema public from authenticated;
grant execute on function
  public.owns_student(uuid),
  public.staff_role_for(uuid),
  public.can_view_test_scores(uuid),
  public.staff_can_view_student(uuid),
  public.staff_can_view_student_scores(uuid),
  public.link_staff_account(),
  public.staff_search_students(text),
  public.staff_student_profile(uuid),
  public.staff_student_sessions(uuid),
  public.set_student_pin(uuid, text),
  public.clear_student_pin(uuid),
  public.verify_student_pin(uuid, text),
  public.set_parent_pin(text),
  public.clear_parent_pin(),
  public.verify_parent_pin(text),
  public.prep_start_section(uuid, text, text, integer, jsonb),
  public.prep_remaining_seconds(uuid),
  public.prep_finalize_attempt(uuid, boolean),
  public.prep_essay_start(uuid, text, integer),
  public.prep_essay_remaining_seconds(uuid),
  public.prep_essay_finalize(uuid, text, boolean),
  public.record_practice_result(uuid, uuid, uuid[]),
  public.seed_placement_mastery(uuid, uuid[]),
  public.raise_working_grade_if_earned(uuid)
to authenticated;

-- The service role keeps execute on everything it had. The new functions get
-- it explicitly, since the default privileges below no longer hand it out.
grant execute on function
  public.request_is_from_client(),
  public.question_attempts_server_grade(),
  public.record_practice_result(uuid, uuid, uuid[]),
  public.seed_placement_mastery(uuid, uuid[]),
  public.account_seat_cap(uuid),
  public.students_client_guard(),
  public.raise_working_grade_if_earned(uuid),
  public.sessions_server_clock(),
  public.consents_server_clock(),
  public.feedback_server_clock(),
  public.student_focus_skills_server_clock()
to service_role;

-- Signed-in users never need these on any table.
revoke truncate, trigger, references on all tables in schema public from authenticated;

-- Objects postgres creates from now on. The supabase_admin defaults cannot be
-- changed from the SQL editor; postgres creates every object in this repo.
alter default privileges for role postgres in schema public revoke all on tables    from anon;
alter default privileges for role postgres in schema public revoke all on sequences from anon;
alter default privileges for role postgres in schema public revoke all on functions from anon;
alter default privileges for role postgres in schema public
  revoke truncate, trigger, references on tables from authenticated;
alter default privileges for role postgres revoke execute on functions from public;

commit;
