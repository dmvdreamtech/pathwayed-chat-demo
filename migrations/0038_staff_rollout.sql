-- ===========================================================================
-- 0038_staff_rollout.sql
--
-- What the teacher rollout needs in the tutoring database: platform admins
-- manage each school's staff list from /admin/staff, and guidance, admins and
-- academic deans see a Test Scores tab on /staff.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once. Idempotent. Then run 0038_staff_rollout_verify.sql. Deploy the app
-- only after both: the new build calls these functions.
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES
-- ---------------------------------------------------------------------------
--  school_staff.full_name   The person's name, as the admin typed or uploaded it.
--  school_staff_events      Every add, update, role change, deactivation and
--                           reactivation: who, when, before and after. No
--                           browser access.
--  school_staff_no_delete   A staff row is deactivated, never deleted.
--
--  Platform admins only (is_platform_admin, migration 0034); everyone else is
--  refused with 42501:
--    admin_staff_schools()          the schools staff can belong to (those with
--                                   a school_domains row carrying a school id)
--    admin_list_staff(school)       that school's staff, active or not
--    admin_save_staff(school, rows) add or update many at once (the CSV upload
--                                   and "add one person"); all or nothing, every
--                                   row checked first. Returns counts.
--    admin_set_staff_role(id, role)
--    admin_set_staff_active(id, active)
--
--  staff_student_test_scores(student)  The Test Scores tab, measured only:
--                           placement answers by subject and the working grade,
--                           timed practice sections (percent right, date), and
--                           SAT practice by section and domain with skills
--                           practiced of the 30 official ones. Only for
--                           guidance, admin and academic_dean at the student's
--                           school (staff_can_view_student_scores, 0030).
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (by hand)
-- ---------------------------------------------------------------------------
--  begin;
--  drop function if exists public.staff_student_test_scores(uuid);
--  drop function if exists public.admin_set_staff_active(uuid, boolean);
--  drop function if exists public.admin_set_staff_role(uuid, text);
--  drop function if exists public.admin_save_staff(uuid, jsonb);
--  drop function if exists public.admin_list_staff(uuid);
--  drop function if exists public.admin_staff_schools();
--  drop trigger if exists school_staff_no_delete on public.school_staff;
--  drop function if exists public.school_staff_no_delete();
--  drop table if exists public.school_staff_events;
--  alter table public.school_staff drop column if exists full_name;
--  commit;
-- ===========================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1) Names, the change log, and no deletes.
-- ---------------------------------------------------------------------------
alter table public.school_staff add column if not exists full_name text;
alter table public.school_staff drop constraint if exists school_staff_full_name_length;
alter table public.school_staff add constraint school_staff_full_name_length
  check (full_name is null or char_length(full_name) between 1 and 120);

create table if not exists public.school_staff_events (
  id         uuid primary key default gen_random_uuid(),
  staff_id   uuid not null references public.school_staff (id),
  school_id  uuid not null,
  action     text not null check (action in ('added', 'updated', 'role_changed', 'deactivated', 'reactivated')),
  before     jsonb,
  after      jsonb,
  actor      uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists school_staff_events_staff on public.school_staff_events (staff_id, created_at desc);
alter table public.school_staff_events enable row level security;
revoke all on public.school_staff_events from public, anon, authenticated;
grant select on public.school_staff_events to service_role;

create or replace function public.school_staff_no_delete()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'school staff are deactivated, never deleted'
    using errcode = 'restrict_violation';
end;
$$;
drop trigger if exists school_staff_no_delete on public.school_staff;
create trigger school_staff_no_delete
  before delete on public.school_staff
  for each row execute function public.school_staff_no_delete();
revoke delete on public.school_staff from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- 2) Platform admin: schools and their staff.
-- ---------------------------------------------------------------------------
create or replace function public.admin_require_platform_admin()
returns void
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.is_platform_admin() then
    raise exception 'platform_admin_required' using errcode = 'insufficient_privilege';
  end if;
end;
$$;

-- Schools are the school ids in school_domains; the note is the school's name
-- as written there ("St. Vincent Pallotti High School, 9-12 SSO").
create or replace function public.admin_staff_schools()
returns table (school_id uuid, name text, domains text[], staff_active integer, staff_total integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform public.admin_require_platform_admin();
  return query
    select d.school_id,
           coalesce(nullif(btrim(split_part(min(d.note), ',', 1)), ''), d.school_id::text),
           array_agg(d.domain order by d.domain),
           (select count(*)::integer from public.school_staff ss where ss.school_id = d.school_id and ss.active),
           (select count(*)::integer from public.school_staff ss where ss.school_id = d.school_id)
      from public.school_domains d
     where d.school_id is not null
     group by d.school_id
     order by 2;
end;
$$;

create or replace function public.admin_list_staff(p_school uuid)
returns table (id uuid, email text, full_name text, role text, active boolean, linked boolean, created_at timestamptz)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform public.admin_require_platform_admin();
  return query
    select ss.id, ss.email, ss.full_name, ss.role, ss.active, ss.user_id is not null, ss.created_at
      from public.school_staff ss
     where ss.school_id = p_school
     order by ss.active desc, lower(coalesce(ss.full_name, ss.email)), ss.email;
end;
$$;

-- p_rows: [{"email": ..., "full_name": ..., "role": ...}, ...]. Every row is
-- checked before anything is written; the first bad row refuses the batch with
-- its row number (1-based), so the preview and the save can never disagree
-- silently. An existing email updates name and role and reactivates the row.
create or replace function public.admin_save_staff(p_school uuid, p_rows jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  r          jsonb;
  i          integer := 0;
  v_email    text;
  v_name     text;
  v_role     text;
  v_seen     text[] := '{}';
  v_old      public.school_staff;
  v_new      public.school_staff;
  v_added    integer := 0;
  v_updated  integer := 0;
  v_react    integer := 0;
  v_same     integer := 0;
begin
  perform public.admin_require_platform_admin();
  if not exists (select 1 from public.school_domains d where d.school_id = p_school) then
    raise exception 'unknown school' using errcode = 'check_violation';
  end if;
  if p_rows is null or jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) = 0 then
    raise exception 'no rows to save' using errcode = 'check_violation';
  end if;
  if jsonb_array_length(p_rows) > 500 then
    raise exception 'at most 500 rows at a time' using errcode = 'check_violation';
  end if;

  -- Check every row first.
  for r in select value from jsonb_array_elements(p_rows) loop
    i := i + 1;
    v_email := lower(btrim(coalesce(r ->> 'email', '')));
    v_name  := btrim(coalesce(r ->> 'full_name', ''));
    v_role  := lower(btrim(coalesce(r ->> 'role', '')));
    if v_email !~ '^[^@\s,;]+@[^@\s,;]+\.[a-z]{2,}$' then
      raise exception 'row %: % is not an email address', i, coalesce(nullif(v_email, ''), '(blank)')
        using errcode = 'check_violation';
    end if;
    if v_name = '' or char_length(v_name) > 120 then
      raise exception 'row %: a name is required (at most 120 characters)', i using errcode = 'check_violation';
    end if;
    if v_role not in ('teacher', 'guidance', 'admin', 'academic_dean') then
      raise exception 'row %: role must be teacher, guidance, admin or academic_dean', i
        using errcode = 'check_violation';
    end if;
    if v_email = any (v_seen) then
      raise exception 'row %: % appears twice', i, v_email using errcode = 'check_violation';
    end if;
    v_seen := v_seen || v_email;
  end loop;

  -- Then write.
  for r in select value from jsonb_array_elements(p_rows) loop
    v_email := lower(btrim(r ->> 'email'));
    v_name  := btrim(r ->> 'full_name');
    v_role  := lower(btrim(r ->> 'role'));
    select * into v_old from public.school_staff ss where ss.school_id = p_school and ss.email = v_email;
    if not found then
      insert into public.school_staff (school_id, email, full_name, role, active)
      values (p_school, v_email, v_name, v_role, true)
      returning * into v_new;
      insert into public.school_staff_events (staff_id, school_id, action, before, after, actor)
      values (v_new.id, p_school, 'added', null,
              jsonb_build_object('email', v_email, 'full_name', v_name, 'role', v_role, 'active', true), auth.uid());
      v_added := v_added + 1;
    elsif v_old.full_name is not distinct from v_name and v_old.role = v_role and v_old.active then
      v_same := v_same + 1;
    else
      update public.school_staff ss set full_name = v_name, role = v_role, active = true
       where ss.id = v_old.id returning * into v_new;
      insert into public.school_staff_events (staff_id, school_id, action, before, after, actor)
      values (v_old.id, p_school, case when v_old.active then 'updated' else 'reactivated' end,
              jsonb_build_object('full_name', v_old.full_name, 'role', v_old.role, 'active', v_old.active),
              jsonb_build_object('full_name', v_name, 'role', v_role, 'active', true), auth.uid());
      if v_old.active then v_updated := v_updated + 1; else v_react := v_react + 1; end if;
    end if;
  end loop;

  return jsonb_build_object('added', v_added, 'updated', v_updated, 'reactivated', v_react, 'unchanged', v_same);
end;
$$;

create or replace function public.admin_set_staff_role(p_staff_id uuid, p_role text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_old public.school_staff;
  v_role text := lower(btrim(coalesce(p_role, '')));
begin
  perform public.admin_require_platform_admin();
  if v_role not in ('teacher', 'guidance', 'admin', 'academic_dean') then
    raise exception 'role must be teacher, guidance, admin or academic_dean' using errcode = 'check_violation';
  end if;
  select * into v_old from public.school_staff where id = p_staff_id for update;
  if not found then
    raise exception 'no such staff member' using errcode = 'no_data_found';
  end if;
  if v_old.role = v_role then
    return;
  end if;
  update public.school_staff set role = v_role where id = p_staff_id;
  insert into public.school_staff_events (staff_id, school_id, action, before, after, actor)
  values (p_staff_id, v_old.school_id, 'role_changed',
          jsonb_build_object('role', v_old.role), jsonb_build_object('role', v_role), auth.uid());
end;
$$;

create or replace function public.admin_set_staff_active(p_staff_id uuid, p_active boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_old public.school_staff;
begin
  perform public.admin_require_platform_admin();
  if p_active is null then
    raise exception 'say whether the person is active' using errcode = 'check_violation';
  end if;
  select * into v_old from public.school_staff where id = p_staff_id for update;
  if not found then
    raise exception 'no such staff member' using errcode = 'no_data_found';
  end if;
  if v_old.active = p_active then
    return;
  end if;
  update public.school_staff set active = p_active where id = p_staff_id;
  insert into public.school_staff_events (staff_id, school_id, action, before, after, actor)
  values (p_staff_id, v_old.school_id, case when p_active then 'reactivated' else 'deactivated' end,
          jsonb_build_object('active', v_old.active), jsonb_build_object('active', p_active), auth.uid());
end;
$$;

-- ---------------------------------------------------------------------------
-- 3) The Test Scores tab.
-- ---------------------------------------------------------------------------
create or replace function public.staff_student_test_scores(p_student_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_out jsonb;
begin
  if not public.staff_can_view_student_scores(p_student_id) then
    raise exception 'scores_not_allowed' using errcode = 'insufficient_privilege';
  end if;

  with placement as (
    select k.subject,
           count(*)::integer as answered,
           count(*) filter (where qa.is_correct)::integer as right_n,
           min(qa.created_at) as first_at,
           max(qa.created_at) as last_at
      from public.question_attempts qa
      join public.skills k on k.id = qa.skill_id
     where qa.student_id = p_student_id and qa.is_diagnostic
     group by k.subject
  ),
  timed as (
    select pa.module_id,
           pa.section_id,
           pa.status,
           round(coalesce(pa.score, 0) * 100)::integer as pct,
           coalesce(jsonb_array_length(pa.question_ids), 0) as questions,
           coalesce(pa.submitted_at, pa.started_at + make_interval(secs => coalesce(pa.time_limit_sec, 0))) as done_at
      from public.prep_attempts pa
     where pa.student_id = p_student_id
       and pa.status in ('submitted', 'expired')
  ),
  sat_domain_section as (
    select distinct o.domain, o.section from public.sat_official_skills o
  ),
  sat as (
    select qa.sat_alignment as domain,
           coalesce(ds.section, 'unknown') as section,
           count(*)::integer as answered,
           count(*) filter (where qa.is_correct)::integer as right_n
      from public.question_attempts qa
      left join sat_domain_section ds on ds.domain = qa.sat_alignment
     where qa.student_id = p_student_id
       and not qa.is_diagnostic
       and qa.sat_alignment is not null
     group by qa.sat_alignment, ds.section
  )
  select jsonb_build_object(
    'working_grade', (select s.working_grade from public.students s where s.id = p_student_id),
    'placement', coalesce((select jsonb_agg(jsonb_build_object(
        'subject', p.subject, 'answered', p.answered, 'right', p.right_n,
        'first_at', p.first_at, 'last_at', p.last_at) order by p.subject) from placement p), '[]'::jsonb),
    'timed', coalesce((select jsonb_agg(jsonb_build_object(
        'module_id', t.module_id, 'section_id', t.section_id, 'status', t.status,
        'pct', t.pct, 'questions', t.questions, 'at', t.done_at) order by t.done_at desc) from timed t), '[]'::jsonb),
    'sat_sections', coalesce((select jsonb_agg(jsonb_build_object(
        'section', x.section, 'answered', x.answered, 'right', x.right_n) order by x.section)
        from (select section, sum(answered)::integer as answered, sum(right_n)::integer as right_n
                from sat group by section) x), '[]'::jsonb),
    'sat_domains', coalesce((select jsonb_agg(jsonb_build_object(
        'domain', s.domain, 'section', s.section, 'answered', s.answered, 'right', s.right_n)
        order by s.section, s.domain) from sat s), '[]'::jsonb),
    'sat_skills_practiced', (select count(distinct k.sat_skill_code)::integer
                               from public.question_attempts qa
                               join public.skills k on k.id = qa.skill_id
                              where qa.student_id = p_student_id
                                and not qa.is_diagnostic
                                and k.sat_skill_code is not null),
    'sat_skills_total', (select count(*)::integer from public.sat_official_skills)
  ) into v_out;
  return v_out;
end;
$$;

-- ---------------------------------------------------------------------------
-- 4) Grants (CLAUDE.md: revoke from public and anon, grant explicitly).
-- ---------------------------------------------------------------------------
revoke all on function public.school_staff_no_delete() from public, anon, authenticated;
revoke all on function public.admin_require_platform_admin() from public, anon;
revoke all on function public.admin_staff_schools() from public, anon;
revoke all on function public.admin_list_staff(uuid) from public, anon;
revoke all on function public.admin_save_staff(uuid, jsonb) from public, anon;
revoke all on function public.admin_set_staff_role(uuid, text) from public, anon;
revoke all on function public.admin_set_staff_active(uuid, boolean) from public, anon;
revoke all on function public.staff_student_test_scores(uuid) from public, anon;

grant execute on function
  public.admin_require_platform_admin(),
  public.admin_staff_schools(),
  public.admin_list_staff(uuid),
  public.admin_save_staff(uuid, jsonb),
  public.admin_set_staff_role(uuid, text),
  public.admin_set_staff_active(uuid, boolean),
  public.staff_student_test_scores(uuid)
to authenticated, service_role;

commit;
