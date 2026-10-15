-- ===========================================================================
-- 2026-10-14_reset_owner_trial.sql
--
-- One-time data fix: phillip.tomlin@dmvdream.org still carries a free trial from
-- before school domains skipped the trial (trial_end 2026-08-30, has_trialed).
-- Clear it so the account shows no trial and no countdown. The account is a
-- platform admin and school staff, so after 0037 it is never offered a
-- subscription either.
--
-- dmvdream.org is NOT added to any school domain list: it is not a Pallotti
-- domain.
--
-- HOW TO APPLY: run after 0037, in the SQL editor for papiowjjoyhnbyhgtbxq. The
-- last statement shows the row afterwards; expect inactive / null / false.
-- Only touches the row if it has never had a Stripe customer.
-- ===========================================================================

begin;

update public.profiles p
   set subscription_status = 'inactive',
       trial_end           = null,
       has_trialed         = false
  from auth.users u
 where u.id = p.id
   and lower(u.email) = 'phillip.tomlin@dmvdream.org'
   and p.stripe_customer_id is null;

commit;

select p.subscription_status, p.trial_end, p.has_trialed, p.stripe_customer_id
  from public.profiles p
  join auth.users u on u.id = p.id
 where lower(u.email) = 'phillip.tomlin@dmvdream.org';
