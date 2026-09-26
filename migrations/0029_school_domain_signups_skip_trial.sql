-- ===========================================================================
-- 0029_school_domain_signups_skip_trial.sql
--
-- Stop the signup trigger stamping a free trial on an account at a school-owned
-- email domain, and take the trial back off the school-domain accounts it has
-- already stamped.
--
-- HOW TO APPLY: paste into the Supabase SQL editor and run against
-- papiowjjoyhnbyhgtbxq. Idempotent, and safe to re-run. The verify queries are
-- in 0029_school_domain_signups_skip_trial_verify.sql, a separate single paste,
-- so that nothing here depends on eyeballing a result mid-transaction.
--
-- ---------------------------------------------------------------------------
-- THE BUG
-- ---------------------------------------------------------------------------
-- A 9-12 student signs in with Google SSO at their school address. Supabase Auth
-- inserts the auth.users row, handle_new_user inserts the profiles row, and the
-- BEFORE INSERT trigger profiles_start_trial (migration 0014) stamps
--
--     subscription_status = 'free_trial'
--     trial_end           = now() + 7 days
--     has_trialed         = true
--
-- on every never-trialed profile, with no idea whose profile it is. The school
-- holds the licence, so none of those three values is true of a school account,
-- and seven days later the account is a candidate for the trial cron.
--
-- api/school-login.ts runs AFTER this and only writes students.school_covered
-- when Dean returns covered:true. A student who is not on the roster yet, or
-- whose domain is not mapped, keeps the trial the trigger wrote. That is the
-- Pallotti student who received the "trial ended" mail on 2026-09-15.
--
-- api/mint-session.ts already undoes the same stamp for minted K-8 identities,
-- after the fact, because the row exists before any server code can act. This
-- migration makes the trigger itself not write the stamp, for every school
-- domain, so there is nothing to undo.
--
-- ---------------------------------------------------------------------------
-- WHY A TABLE, AND HOW IT RELATES TO SCHOOL_DOMAIN_MAP
-- ---------------------------------------------------------------------------
-- The list of school-owned domains lives in the Vercel env SCHOOL_DOMAIN_MAP
-- (api/school-login.ts, api/email-core.ts). A trigger cannot read Vercel env, so
-- the same domains are recorded here in public.school_domains. The two lists
-- must be kept in step by hand: when a school is added to SCHOOL_DOMAIN_MAP, add
-- its domain here too. Only the DOMAIN is stored; the Dean school_id is not
-- needed to decide "no trial".
--
-- This table grants NOTHING. It only withholds a trial stamp, and the access
-- gate does not read it. Access for a school student still comes only from a
-- verified Dean resolve writing students.school_covered (migration 0025 locks
-- that column to the service role). A domain here is not coverage.
--
-- Seeded with the one domain this incident proved (pallottihs.info) and the
-- non-routable domain api/mint-session.ts mints K-8 identities under, which
-- makes that handler's take-back a no-op rather than a dependency. Add every
-- other key of SCHOOL_DOMAIN_MAP in the insert below before running.
--
-- ---------------------------------------------------------------------------
-- WHAT A SCHOOL-DOMAIN PROFILE LOOKS LIKE AFTER THIS
-- ---------------------------------------------------------------------------
--     subscription_status = 'inactive'   (the column default, no trial)
--     trial_end           = null
--     has_trialed         = false        (they never had one to spend)
--
-- exactly what api/mint-session.ts writes for a minted identity. 'inactive'
-- with a null trial_end is not a candidate for either trial cron query
-- (both filter subscription_status = 'free_trial'), so such an account is
-- never mailed and never flipped to 'expired', whether or not it is covered.
--
-- ---------------------------------------------------------------------------
-- WHY SECURITY DEFINER
-- ---------------------------------------------------------------------------
-- The trigger has to read auth.users.email for new.id. handle_new_user is a
-- SECURITY DEFINER function so the insert into profiles already runs with the
-- definer's rights, but a profiles insert from any other path (the SQL editor,
-- a future import) would run as the caller. Marking this function SECURITY
-- DEFINER with an empty search_path makes the email lookup work identically
-- from every path, and every object below is schema-qualified because of it.
-- ===========================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1) The school-owned domains, as data. Client roles get nothing on it.
-- ---------------------------------------------------------------------------
create table if not exists public.school_domains (
  domain      text primary key,
  note        text,
  created_at  timestamptz not null default now(),
  -- Stored exactly as the trigger will compare it: lowercase, no surrounding
  -- whitespace, and at least one dot so a bare word cannot be inserted by
  -- mistake and silently match nothing.
  constraint school_domains_domain_normalised
    check (domain = lower(btrim(domain)) and position('.' in domain) > 0)
);

revoke all on public.school_domains from anon, authenticated;

insert into public.school_domains (domain, note) values
  ('pallottihs.info',         'St. Vincent Pallotti High School, 9-12 SSO'),
  ('covered.pathwayed.local', 'minted K-8 covered identities, api/mint-session.ts')
on conflict (domain) do nothing;

-- ---------------------------------------------------------------------------
-- 2) The trigger function, now domain-aware.
--
-- Same guard as 0014 (never-trialed, status null or 'inactive'), with one new
-- branch before the stamp: a school-domain profile is left at the no-trial
-- state instead. Everything else is unchanged, so B2C signups get exactly the
-- trial they got yesterday.
-- ---------------------------------------------------------------------------
create or replace function public.pathwayed_start_trial()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  signup_domain text;
begin
  -- Not a brand-new, never-trialed profile: leave it alone (0014 guard).
  if coalesce(new.has_trialed, false) then
    return new;
  end if;
  if new.subscription_status is not null and new.subscription_status <> 'inactive' then
    return new;
  end if;

  -- The email lives on auth.users, not profiles. handle_new_user fires AFTER
  -- the auth.users insert, so the row is there by the time this runs. A profile
  -- with no matching auth user (an import) has no domain and is treated as a
  -- consumer, which is what 0014 did for every row.
  select lower(btrim(split_part(u.email, '@', 2)))
    into signup_domain
    from auth.users u
   where u.id = new.id;

  if coalesce(signup_domain, '') <> ''
     and exists (select 1 from public.school_domains d where d.domain = signup_domain) then
    -- School-affiliated: the school holds the licence, so there is no trial to
    -- start and none has been spent. Mirrors api/mint-session.ts exactly.
    new.subscription_status := 'inactive';
    new.trial_end           := null;
    new.has_trialed         := false;
    return new;
  end if;

  new.subscription_status := 'free_trial';
  new.trial_end           := now() + interval '7 days';
  new.has_trialed         := true;
  return new;
end;
$$;

drop trigger if exists profiles_start_trial on public.profiles;
create trigger profiles_start_trial
  before insert on public.profiles
  for each row
  execute function public.pathwayed_start_trial();

-- ---------------------------------------------------------------------------
-- 3) Backfill: take the stamp back off school-domain accounts already hit.
--
-- Scope is deliberately narrow. Only accounts at a domain in school_domains,
-- only those still carrying the trigger's stamp ('free_trial') or the cron's
-- flip of it ('expired'), and only those with no Stripe customer, so a school
-- staff member who chose to pay personally is not touched. The email stamps
-- (trial_reminder_sent_at, trial_ended_email_sent_at) are left as they are:
-- they record what was sent, and that did happen.
--
-- Re-runnable: a second run matches nothing.
-- ---------------------------------------------------------------------------
update public.profiles p
   set subscription_status = 'inactive',
       trial_end           = null,
       has_trialed         = false
  from auth.users u
 where u.id = p.id
   and lower(btrim(split_part(u.email, '@', 2))) in (select domain from public.school_domains)
   and p.subscription_status in ('free_trial', 'expired')
   and p.stripe_customer_id is null;

commit;
