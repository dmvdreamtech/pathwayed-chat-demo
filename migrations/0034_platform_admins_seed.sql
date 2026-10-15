-- ===========================================================================
-- 0034_platform_admins_seed.sql
--
-- Who may open /admin/sat-coverage. Run AFTER 0034 has committed and its verify
-- has PASSED, in the SQL editor for papiowjjoyhnbyhgtbxq. Idempotent.
--
-- Add a line per admin, by their sign-in email. The account must already exist
-- (they have signed in once). An email with no account is skipped and listed in
-- the result so you can see it.
-- To remove someone: delete from public.platform_admins where user_id = '...';
-- ===========================================================================

begin;

with wanted(email) as (
  values
    ('phillip.tomlin@dmvdream.org')
    -- , ('someone@pathwayed.org')
),
found as (
  select w.email, u.id
    from wanted w
    left join auth.users u on lower(u.email) = lower(w.email)
),
added as (
  insert into public.platform_admins (user_id, note)
  select f.id, 'platform admin: ' || f.email from found f where f.id is not null
  on conflict (user_id) do nothing
  returning user_id
)
select f.email,
       case when f.id is null then 'SKIPPED: no account with this email'
            when f.id in (select user_id from added) then 'added'
            else 'already an admin' end as result
  from found f;

commit;
