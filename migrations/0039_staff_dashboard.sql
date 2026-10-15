-- ===========================================================================
-- 0039_staff_dashboard.sql
--
-- The /staff dashboard: one read, counted by the database, for the signed-in
-- staff member's own school (or schools). Measured results only.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once. Idempotent. Then run 0039_staff_dashboard_verify.sql. Deploy the
-- app only after both: the new /staff calls staff_dashboard().
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES
-- ---------------------------------------------------------------------------
--  staff_dashboard()  For the caller's active school_staff rows, over that
--                     school's school-covered students:
--    week_start       Monday of this week, New York time.
--    most_active      Top 10 by days active this week (a day with a check
--                     question or a tutoring session), with check questions
--                     answered this week. Ties: more questions, then name.
--    recent_wins      The latest 10 skills that reached Ready to move on
--                     (advanced_at) or Mastered (recheck_passed_at) in the last
--                     14 days and are still at that level or higher.
--    stuck            Up to 10 students, each with their weakest skill that is
--                     still Practicing after 5 or more graded answers and under
--                     70% right. Worst first. The same rule as the student
--                     page's Stuck on card.
--    snapshot         Students active this week, total students, and skills
--                     mastered this month (New York time).
--                     Anyone who is not active school staff is refused (42501).
--
-- Graded answers are question_attempts that are not placement questions.
-- Names are first and last name as the school's roster gives them.
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (by hand)
-- ---------------------------------------------------------------------------
--  drop function if exists public.staff_dashboard();
-- ===========================================================================

begin;

create or replace function public.staff_dashboard()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_week_start  date := date_trunc('week', (now() at time zone 'America/New_York'))::date;
  v_week_from   timestamptz := (v_week_start::timestamp at time zone 'America/New_York');
  v_month_from  timestamptz := (date_trunc('month', now() at time zone 'America/New_York') at time zone 'America/New_York');
  v_out         jsonb;
begin
  if not exists (select 1 from public.school_staff ss where ss.user_id = auth.uid() and ss.active) then
    raise exception 'staff_only' using errcode = 'insufficient_privilege';
  end if;

  with my_schools as (
    select distinct ss.school_id from public.school_staff ss where ss.user_id = auth.uid() and ss.active
  ),
  kids as (
    select s.id, s.first_name, s.last_name
      from public.students s
      join my_schools m on m.school_id = s.school_id
     where s.school_covered and s.active
  ),
  week_activity as (
    select qa.student_id, (qa.created_at at time zone 'America/New_York')::date as day, not qa.is_diagnostic as graded
      from public.question_attempts qa
      join kids k on k.id = qa.student_id
     where qa.created_at >= v_week_from
    union all
    select se.student_id, (se.updated_at at time zone 'America/New_York')::date, false
      from public.sessions se
      join kids k on k.id = se.student_id
     where se.updated_at >= v_week_from
  ),
  active as (
    select w.student_id,
           count(distinct w.day)::integer as days,
           count(*) filter (where w.graded)::integer as questions
      from week_activity w
     group by w.student_id
  ),
  most_active as (
    select k.id, k.first_name, k.last_name, a.days, a.questions
      from active a join kids k on k.id = a.student_id
     order by a.days desc, a.questions desc, lower(k.first_name), k.id
     limit 10
  ),
  wins as (
    select k.id, k.first_name, k.last_name, sk.name as skill,
           case when m.status = 'mastered' and m.recheck_passed_at >= now() - interval '14 days'
                then 'mastered' else 'advanced' end as level,
           case when m.status = 'mastered' and m.recheck_passed_at >= now() - interval '14 days'
                then m.recheck_passed_at else m.advanced_at end as at
      from public.student_skill_mastery m
      join kids k on k.id = m.student_id
      join public.skills sk on sk.id = m.skill_id
     where (m.status = 'mastered' and m.recheck_passed_at >= now() - interval '14 days')
        or (m.status in ('advanced', 'mastered') and m.advanced_at >= now() - interval '14 days')
     order by 6 desc
     limit 10
  ),
  tallies as (
    select qa.student_id, qa.skill_id,
           count(*)::integer as answered,
           count(*) filter (where qa.is_correct)::integer as right_n
      from public.question_attempts qa
      join kids k on k.id = qa.student_id
     where not qa.is_diagnostic
     group by qa.student_id, qa.skill_id
  ),
  stuck_skills as (
    select t.student_id, t.skill_id, t.answered, t.right_n,
           row_number() over (partition by t.student_id
                              order by t.right_n::numeric / t.answered, t.answered desc, t.skill_id) as rn
      from tallies t
      join public.student_skill_mastery m on m.student_id = t.student_id and m.skill_id = t.skill_id
     where m.status = 'practicing'
       and t.answered >= 5
       and t.right_n::numeric / t.answered < 0.70
  ),
  stuck as (
    select k.id, k.first_name, k.last_name, sk.name as skill, x.answered, x.right_n
      from stuck_skills x
      join kids k on k.id = x.student_id
      join public.skills sk on sk.id = x.skill_id
     where x.rn = 1
     order by x.right_n::numeric / x.answered, x.answered desc, lower(k.first_name), k.id
     limit 10
  )
  select jsonb_build_object(
    'week_start', v_week_start,
    'most_active', coalesce((select jsonb_agg(jsonb_build_object(
        'student_id', a.id, 'first_name', a.first_name, 'last_name', a.last_name,
        'days', a.days, 'questions', a.questions)
        order by a.days desc, a.questions desc, lower(a.first_name), a.id) from most_active a), '[]'::jsonb),
    'recent_wins', coalesce((select jsonb_agg(jsonb_build_object(
        'student_id', w.id, 'first_name', w.first_name, 'last_name', w.last_name,
        'skill', w.skill, 'level', w.level, 'at', w.at) order by w.at desc) from wins w), '[]'::jsonb),
    'stuck', coalesce((select jsonb_agg(jsonb_build_object(
        'student_id', s.id, 'first_name', s.first_name, 'last_name', s.last_name,
        'skill', s.skill, 'answered', s.answered, 'right', s.right_n)
        order by s.right_n::numeric / s.answered, s.answered desc, lower(s.first_name), s.id) from stuck s), '[]'::jsonb),
    'snapshot', jsonb_build_object(
        'active_this_week', (select count(*)::integer from active),
        'students', (select count(*)::integer from kids),
        'mastered_this_month', (select count(*)::integer
                                  from public.student_skill_mastery m
                                  join kids k on k.id = m.student_id
                                 where m.status = 'mastered' and m.recheck_passed_at >= v_month_from))
  ) into v_out;
  return v_out;
end;
$$;

-- Grants (CLAUDE.md: revoke from public and anon, grant explicitly).
revoke all on function public.staff_dashboard() from public, anon;
grant execute on function public.staff_dashboard() to authenticated, service_role;

commit;
