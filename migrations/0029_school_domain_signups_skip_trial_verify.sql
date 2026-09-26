-- ===========================================================================
-- 0029_school_domain_signups_skip_trial_verify.sql
--
-- Read-only checks for migration 0029. Paste the whole file into the Supabase
-- SQL editor AFTER 0029 has committed and run it. It is ONE statement, so the
-- editor shows ONE result: verify_results, one row per check, with the check
-- name, what was expected, what was found, and PASSED or FAILED. Nothing here
-- writes.
--
-- Check 8 is the coverage state of the account from the incident. Its row also
-- says WHEN the school_covered row was created relative to that account's
-- trial_end and to the "trial ended" mail, which is what decides whether the
-- Sept 2 cron could have skipped it: the coverage rule only sees a row that
-- existed, and was active, when the cron ran.
-- ===========================================================================

with
incident as (
  -- The account from the incident, resolved once and reused by checks 7 and 8.
  select u.id, p.subscription_status, p.trial_end, p.has_trialed,
         p.trial_reminder_sent_at, p.trial_ended_email_sent_at, p.stripe_customer_id
    from auth.users u
    left join public.profiles p on p.id = u.id
   where lower(btrim(u.email)) = 'arkin.kukadia27@pallottihs.info'
),
school_profiles as (
  -- Every profile at a domain in school_domains, with the state 0029 leaves it in.
  select p.id,
         lower(btrim(split_part(u.email, '@', 2))) as domain,
         p.subscription_status, p.trial_end, p.has_trialed,
         p.stripe_customer_id is not null as has_stripe,
         (p.subscription_status = 'inactive' and p.trial_end is null and p.has_trialed = false) as cleared
    from public.profiles p
    join auth.users u on u.id = p.id
   where lower(btrim(split_part(u.email, '@', 2))) in (select domain from public.school_domains)
),
coverage as (
  -- Check 8, kept as it was: the incident account's students rows, plus when
  -- each was created against the trial_end and the ended-mail stamp.
  select s.id, s.first_name, s.grade, s.active, s.school_covered,
         s.dean_student_id is not null as linked_to_dean,
         s.created_at,
         i.trial_end,
         i.trial_ended_email_sent_at
    from public.students s
    join incident i on i.id = s.parent_id
),
verify_results as (

  -- 1) The trigger is present and enabled on profiles.
  select 1 as n,
         '1_trigger' as check_,
         'profiles_start_trial on public.profiles, tgenabled = O' as expected,
         coalesce((select 'tgenabled = ' || t.tgenabled
                     from pg_trigger t
                    where t.tgrelid = 'public.profiles'::regclass
                      and t.tgname  = 'profiles_start_trial'),
                  'trigger missing') as actual,
         exists (select 1 from pg_trigger t
                  where t.tgrelid = 'public.profiles'::regclass
                    and t.tgname  = 'profiles_start_trial'
                    and t.tgenabled = 'O') as passed

  union all

  -- 2) The function is SECURITY DEFINER with an empty search_path.
  select 2,
         '2_function',
         'prosecdef = true, proconfig contains search_path=""',
         coalesce((select 'prosecdef = ' || p.prosecdef || ', proconfig = ' || coalesce(p.proconfig::text, 'null')
                     from pg_proc p
                     join pg_namespace ns on ns.oid = p.pronamespace
                    where ns.nspname = 'public' and p.proname = 'pathwayed_start_trial'),
                  'function missing'),
         exists (select 1
                   from pg_proc p
                   join pg_namespace ns on ns.oid = p.pronamespace
                  where ns.nspname = 'public'
                    and p.proname = 'pathwayed_start_trial'
                    and p.prosecdef
                    and exists (select 1 from unnest(p.proconfig) c
                                 where c in ('search_path=', 'search_path=""')))

  union all

  -- 3) The seeded domains are present. Every SCHOOL_DOMAIN_MAP key you added
  --    should also appear in `actual`; that part is read by eye.
  select 3,
         '3_domains',
         'includes pallottihs.info and covered.pathwayed.local',
         coalesce((select string_agg(d.domain, ', ' order by d.domain) from public.school_domains d), 'table empty'),
         (select count(*) from public.school_domains d
           where d.domain in ('pallottihs.info', 'covered.pathwayed.local')) = 2

  union all

  -- 4) Client roles hold no privilege on school_domains. Asked with
  --    has_table_privilege rather than information_schema, whose grant views
  --    only list roles enabled for the current session and can pass vacuously.
  select 4,
         '4_grants',
         '0 privileges for anon or authenticated',
         (select count(*) from (values ('anon'), ('authenticated')) r(role_name)
                              cross join (values ('SELECT'), ('INSERT'), ('UPDATE'), ('DELETE')) pv(priv)
           where has_table_privilege(r.role_name, 'public.school_domains', pv.priv))::text || ' privileges',
         (select count(*) from (values ('anon'), ('authenticated')) r(role_name)
                              cross join (values ('SELECT'), ('INSERT'), ('UPDATE'), ('DELETE')) pv(priv)
           where has_table_privilege(r.role_name, 'public.school_domains', pv.priv)) = 0

  union all

  -- 5) The backfill left nothing behind: no school-domain account is still on a
  --    trial or expired without Stripe. This is the backfill's own WHERE clause.
  select 5,
         '5_backfill',
         '0 remaining',
         (select count(*) from school_profiles sp
           where sp.subscription_status in ('free_trial', 'expired') and not sp.has_stripe)::text || ' remaining',
         (select count(*) from school_profiles sp
           where sp.subscription_status in ('free_trial', 'expired') and not sp.has_stripe) = 0

  union all

  -- 6) Every school-domain profile without Stripe is in the cleared state
  --    (inactive, null trial_end, has_trialed false). Profiles with a Stripe
  --    customer were left alone on purpose and are only counted.
  select 6,
         '6_school_profiles',
         'every school-domain profile without Stripe is cleared',
         (select count(*) from school_profiles)::text || ' school-domain profiles, '
           || (select count(*) from school_profiles sp where not sp.has_stripe and not sp.cleared)::text || ' not cleared, '
           || (select count(*) from school_profiles sp where sp.has_stripe)::text || ' with Stripe (left alone)',
         (select count(*) from school_profiles sp where not sp.has_stripe and not sp.cleared) = 0

  union all

  -- 7) The account from the incident. trial_ended_email_sent_at stays set: that
  --    mail did go out on 2026-09-15 and the stamp records it.
  select 7,
         '7_incident',
         'inactive, trial_end null, has_trialed false',
         coalesce((select 'status = ' || coalesce(i.subscription_status, 'null')
                       || ', trial_end = ' || coalesce(i.trial_end::text, 'null')
                       || ', has_trialed = ' || coalesce(i.has_trialed::text, 'null')
                       || ', ended mail sent ' || coalesce(i.trial_ended_email_sent_at::text, 'never')
                     from incident i),
                  'no auth user at that address'),
         exists (select 1 from incident i
                  where i.subscription_status = 'inactive'
                    and i.trial_end is null
                    and i.has_trialed = false)

  union all

  -- 8) Whether that student is actually covered, and since when. PASSED means
  --    one active students row with school_covered = true linked to Dean.
  --    FAILED with zero rows, or school_covered = false, means they are not on
  --    the roster (or the domain was not in SCHOOL_DOMAIN_MAP at sign-in), so
  --    they have no access until Dean resolves them, which is the designed
  --    behaviour for an unmapped student.
  --
  --    `actual` also places the row's created_at against the trial_end and the
  --    ended-mail stamp. "created AFTER the ended mail" means the Sept 2 cron
  --    could not have seen the coverage; only the domain rule could have
  --    skipped him, and only if pallottihs.info was a SCHOOL_DOMAIN_MAP key.
  select 8,
         '8_coverage',
         '1 active row, school_covered = true, linked to Dean',
         coalesce((select string_agg(
                     'id ' || c.id
                       || ' (' || coalesce(c.first_name, '?') || ', grade ' || coalesce(c.grade, '?') || ')'
                       || ': active = ' || c.active
                       || ', school_covered = ' || c.school_covered
                       || ', linked_to_dean = ' || c.linked_to_dean
                       || ', created ' || c.created_at::text
                       || case
                            when c.trial_end is null then ' (no trial_end to compare)'
                            when c.created_at < c.trial_end then ' (BEFORE trial_end ' || c.trial_end::text || ')'
                            else ' (AFTER trial_end ' || c.trial_end::text || ')'
                          end
                       || case
                            when c.trial_ended_email_sent_at is null then ', ended mail never sent'
                            when c.created_at < c.trial_ended_email_sent_at then ', BEFORE the ended mail ' || c.trial_ended_email_sent_at::text
                            else ', AFTER the ended mail ' || c.trial_ended_email_sent_at::text
                          end,
                     ' | ' order by c.created_at)
                     from coverage c),
                  'no students rows for that account'),
         (select count(*) from coverage c where c.active and c.school_covered) = 1
)
select check_,
       expected,
       actual,
       case when passed then 'PASSED' else 'FAILED' end as result
  from verify_results
 order by n;
