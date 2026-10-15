-- ===========================================================================
-- 0037_school_provided_billing_guard.sql
--
-- Accounts a school provides for are never sold anything. One answer, in the
-- database, that the three paid routes (create-checkout, purchase-prep,
-- update-seats) and the billing screens all use.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once. Idempotent. Then run 0037_school_provided_billing_guard_verify.sql.
-- Deploy the app only after both: the new build calls my_school_provided().
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES
-- ---------------------------------------------------------------------------
--  school_provided_reason(user)  Why this account must not be billed, or null
--                       when it may be. In this order:
--                         'platform_admin'   on platform_admins
--                         'school_staff'     an active school_staff row, by
--                                            user id or by email
--                         'covered_student'  owns a school-covered student
--                         'school_domain'    email at a domain in school_domains
--                       Service role only: it takes any user id.
--  my_school_provided()  The same answer for the signed-in caller, for the
--                       billing panel, the paywall, the prep purchase panel and
--                       the add-child seat prompt.
--
-- A school_staff row that is no longer active does not count: a former teacher
-- who is also a parent can subscribe like anyone else. The server also refuses
-- addresses at a domain in SCHOOL_DOMAIN_MAP (api/billing-guard.ts), which the
-- database cannot see.
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (by hand)
-- ---------------------------------------------------------------------------
--  begin;
--  drop function if exists public.my_school_provided();
--  drop function if exists public.school_provided_reason(uuid);
--  commit;
-- ===========================================================================

begin;

create or replace function public.school_provided_reason(p_user uuid)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select case
    when p_user is null then null
    when exists (select 1 from public.platform_admins pa where pa.user_id = p_user)
      then 'platform_admin'
    when exists (
      select 1
        from public.school_staff ss
        left join auth.users u on u.id = p_user
       where ss.active
         and (ss.user_id = p_user
              or (u.email is not null and lower(btrim(ss.email)) = lower(btrim(u.email)))))
      then 'school_staff'
    when exists (select 1 from public.students s where s.parent_id = p_user and s.school_covered)
      then 'covered_student'
    when exists (
      select 1
        from auth.users u
        join public.school_domains d on d.domain = lower(btrim(split_part(u.email, '@', 2)))
       where u.id = p_user)
      then 'school_domain'
    else null
  end;
$$;

create or replace function public.my_school_provided()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select public.school_provided_reason(auth.uid());
$$;

-- Grants (CLAUDE.md: revoke from public and anon, grant explicitly).
revoke all on function public.school_provided_reason(uuid) from public, anon, authenticated;
revoke all on function public.my_school_provided() from public, anon;
grant execute on function public.school_provided_reason(uuid) to service_role;
grant execute on function public.my_school_provided() to authenticated, service_role;

commit;
