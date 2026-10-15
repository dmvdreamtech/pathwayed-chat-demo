-- ===========================================================================
-- 0035_student_last_names.sql
--
-- Last names for school-covered students, so staff can tell two students with
-- the same first name apart and search by last name.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once. Idempotent. Then run 0035_student_last_names_verify.sql. Deploy the
-- app only after both: the new build reads last_name from the staff functions.
-- Then run the one-time backfill (POST /api/backfill-last-names, see that file).
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES
-- ---------------------------------------------------------------------------
--  students.last_name   The console roster's last name (everything after the
--                       first word of the roster name). Written only by the
--                       server at school sign-in (api/school-login.ts,
--                       api/mint-session.ts) and by the one-time backfill, all
--                       from the console bridge. The browser has no insert or
--                       update grant on it.
--  students_last_name_covered_only  A row that is not school-covered never
--                       holds a last name. The trigger below clears it the
--                       moment coverage ends, so paying families never have one.
--  staff_search_students  Returns last_name, matches it ("lopez", "ana lopez"),
--                       and the A to Z order sorts by last name, then first.
--  staff_student_profile  Returns last_name.
--  Both staff functions keep their school check: staff see last names of
--  covered students at their own school only.
--
-- Return types change, so both functions are dropped and created again with
-- the same grants.
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (by hand)
-- ---------------------------------------------------------------------------
--  begin;
--  -- re-run staff_search_students from 0034 and staff_student_profile from
--  -- 0030 (drop each first: the return types differ), with their grants;
--  drop trigger if exists students_last_name_covered_only on public.students;
--  drop function if exists public.students_clear_last_name();
--  alter table public.students drop constraint if exists students_last_name_covered_only;
--  alter table public.students drop column if exists last_name;
--  commit;
-- ===========================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1) The column, and the rule that only covered rows hold one.
-- ---------------------------------------------------------------------------
alter table public.students add column if not exists last_name text;

create or replace function public.students_clear_last_name()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  -- Coverage ended (or never began): the school's name for this student goes.
  if not coalesce(new.school_covered, false) then
    new.last_name := null;
  else
    new.last_name := nullif(btrim(new.last_name), '');
  end if;
  return new;
end;
$$;

drop trigger if exists students_last_name_covered_only on public.students;
create trigger students_last_name_covered_only
  before insert or update of school_covered, last_name on public.students
  for each row execute function public.students_clear_last_name();

alter table public.students drop constraint if exists students_last_name_covered_only;
alter table public.students add constraint students_last_name_covered_only
  check (last_name is null or school_covered);

-- The browser's column grants from 0031 do not name last_name, so it stays
-- server-written. Restated here so a later grant edit has to see it.
revoke insert (last_name), update (last_name) on public.students from anon, authenticated;

-- ---------------------------------------------------------------------------
-- 2) Staff search: last name returned, searched and sorted.
--    Same as 0034 otherwise.
-- ---------------------------------------------------------------------------
drop function if exists public.staff_search_students(text, text);
create function public.staff_search_students(p_query text, p_order text default 'recent')
returns table (student_id uuid, school_id uuid, first_name text, last_name text, grade text, email text,
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
           s.last_name,
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
         or position(term.t in lower(s.first_name || ' ' || coalesce(s.last_name, ''))) > 0
         or position(term.t in lower(coalesce(s.last_name, ''))) > 0
         or (p.email not ilike '%@covered.pathwayed.local'
             and position(term.t in lower(coalesce(p.email, ''))) > 0)
         or lower(s.grade) = regexp_replace(term.t, '^grade\s*', '')
       )
  )
  select f.id, f.school_id, f.first_name, f.last_name, f.grade, f.email, f.last_active_at
    from found f
   order by case when p_order = 'name' then null else f.last_active_at end desc nulls last,
            lower(coalesce(f.last_name, f.first_name)), lower(f.first_name), f.grade, f.id
   limit 200;
$$;

-- ---------------------------------------------------------------------------
-- 3) Staff profile: last name returned. Same as 0030 otherwise.
-- ---------------------------------------------------------------------------
drop function if exists public.staff_student_profile(uuid);
create function public.staff_student_profile(p_student_id uuid)
returns table (
  student_id              uuid,
  school_id               uuid,
  first_name              text,
  last_name               text,
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
         s.last_name,
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

-- ---------------------------------------------------------------------------
-- 4) Grants (CLAUDE.md: revoke from public and anon, grant explicitly).
-- ---------------------------------------------------------------------------
revoke all on function public.students_clear_last_name() from public, anon, authenticated;
revoke all on function public.staff_search_students(text, text) from public, anon;
revoke all on function public.staff_student_profile(uuid) from public, anon;

grant execute on function public.staff_search_students(text, text) to authenticated, service_role;
grant execute on function public.staff_student_profile(uuid) to authenticated;

commit;
