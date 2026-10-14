-- ===========================================================================
-- 0030_school_staff_pallotti_seed.sql
--
-- Staff roster for St. Vincent Pallotti High School, for the /staff progress
-- view. Run AFTER 0030_staff_progress_access.sql has committed and its verify
-- has PASSED. Paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq
-- (tutoring). Idempotent: re-running updates role and active for an email
-- that is already listed, and never touches user_id.
--
-- HOW TO FILL IT
--   Copy each staff member from the console roster as one line in the values
--   list below: ('email', 'role'). Use their school sign-in email.
--   role is one of:
--     teacher        progress only
--     guidance       progress and test scores (test scores UI comes in step 3)
--     admin          progress and test scores
--     academic_dean  progress and test scores
--   Emails are lowercased and trimmed on insert, so case does not matter.
--   To remove someone, set active = false in a later run rather than deleting
--   the row, so the history of who had access stays visible.
--
-- user_id is left null. It is linked the first time that person signs in and
-- opens /staff, with any sign-in method, as long as the email is confirmed.
-- ===========================================================================

begin;

insert into public.school_staff (school_id, email, role, active)
select 'addc2fb2-8b81-4d11-90ec-cf358c56be07'::uuid,
       lower(btrim(v.email)),
       v.role,
       true
  from (values
    ('ptomlin@pallottihs.info',      'admin'),
    ('phillip.tomlin@dmvdream.org',  'admin'),
    ('demo.teacher@pallottihs.info', 'teacher')
    -- , ('first.last@pallottihs.info', 'teacher')
    -- , ('counselor@pallottihs.info',  'guidance')
  ) as v(email, role)
on conflict (school_id, email) do update
   set role   = excluded.role,
       active = excluded.active;

commit;

-- Check what landed (read only):
-- select email, role, active, user_id is not null as signed_in
--   from public.school_staff
--  where school_id = 'addc2fb2-8b81-4d11-90ec-cf358c56be07'
--  order by role, email;
