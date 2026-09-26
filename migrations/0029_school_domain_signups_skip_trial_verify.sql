-- ===========================================================================
-- 0029_school_domain_signups_skip_trial_verify.sql
--
-- Read-only checks for migration 0029. Paste the whole file into the Supabase
-- SQL editor AFTER 0029 has committed and run it as one; each block is labelled
-- in its first column so the result grid reads top to bottom. Nothing here
-- writes.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 1) The trigger is present and enabled on profiles. Expect one row,
--    tgenabled = 'O'.
-- ---------------------------------------------------------------------------
select '1_trigger' as check_, t.tgname, t.tgenabled
  from pg_trigger t
 where t.tgrelid = 'public.profiles'::regclass
   and t.tgname  = 'profiles_start_trial';

-- ---------------------------------------------------------------------------
-- 2) The function is SECURITY DEFINER with an empty search_path. Expect one
--    row, prosecdef = true, proconfig = {search_path=}.
-- ---------------------------------------------------------------------------
select '2_function' as check_, p.proname, p.prosecdef, p.proconfig
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public'
   and p.proname = 'pathwayed_start_trial';

-- ---------------------------------------------------------------------------
-- 3) The seeded domains. Expect at least pallottihs.info and
--    covered.pathwayed.local, plus every key of SCHOOL_DOMAIN_MAP you added.
-- ---------------------------------------------------------------------------
select '3_domains' as check_, d.domain, d.note, d.created_at
  from public.school_domains d
 order by d.domain;

-- ---------------------------------------------------------------------------
-- 4) Client roles hold no privilege on school_domains. Expect ZERO rows.
-- ---------------------------------------------------------------------------
select '4_grants' as check_, grantee, privilege_type
  from information_schema.role_table_grants
 where table_schema = 'public'
   and table_name   = 'school_domains'
   and grantee in ('anon', 'authenticated');

-- ---------------------------------------------------------------------------
-- 5) No school-domain account is still on a trial or expired without Stripe.
--    Expect remaining = 0. This is the backfill's own WHERE clause.
-- ---------------------------------------------------------------------------
select '5_backfill' as check_, count(*) as remaining
  from public.profiles p
  join auth.users u on u.id = p.id
 where lower(btrim(split_part(u.email, '@', 2))) in (select domain from public.school_domains)
   and p.subscription_status in ('free_trial', 'expired')
   and p.stripe_customer_id is null;

-- ---------------------------------------------------------------------------
-- 6) What every school-domain account looks like now. Expect every row to show
--    subscription_status = 'inactive', trial_end null, has_trialed false,
--    unless it has a stripe_customer_id (left alone on purpose).
-- ---------------------------------------------------------------------------
select '6_school_profiles' as check_,
       p.id,
       lower(btrim(split_part(u.email, '@', 2))) as domain,
       p.subscription_status,
       p.trial_end,
       p.has_trialed,
       p.stripe_customer_id is not null          as has_stripe,
       p.trial_reminder_sent_at,
       p.trial_ended_email_sent_at
  from public.profiles p
  join auth.users u on u.id = p.id
 where lower(btrim(split_part(u.email, '@', 2))) in (select domain from public.school_domains)
 order by domain, p.id;

-- ---------------------------------------------------------------------------
-- 7) The account from the incident. Expect subscription_status = 'inactive',
--    trial_end null, has_trialed false. trial_ended_email_sent_at stays set;
--    that mail did go out on 2026-09-15 and the stamp records it.
-- ---------------------------------------------------------------------------
select '7_incident' as check_,
       p.id,
       p.subscription_status,
       p.trial_end,
       p.has_trialed,
       p.trial_ended_email_sent_at
  from public.profiles p
  join auth.users u on u.id = p.id
 where lower(btrim(u.email)) = 'arkin.kukadia27@pallottihs.info';

-- ---------------------------------------------------------------------------
-- 8) Whether that student is actually covered. Expect one active students row
--    with school_covered = true if Dean ever resolved them. Zero rows or
--    school_covered = false means they are not on the roster (or the domain was
--    not in SCHOOL_DOMAIN_MAP at sign-in), so they have no access until Dean
--    resolves them, which is the designed behaviour for an unmapped student.
-- ---------------------------------------------------------------------------
select '8_coverage' as check_,
       s.id,
       s.first_name,
       s.grade,
       s.active,
       s.school_covered,
       s.dean_student_id is not null as linked_to_dean
  from public.students s
  join auth.users u on u.id = s.parent_id
 where lower(btrim(u.email)) = 'arkin.kukadia27@pallottihs.info';
