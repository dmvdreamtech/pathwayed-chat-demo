-- ===========================================================================
-- 0041_skill_standard_codes.sql
--
-- Standard codes per skill, by framework, so Maryland's 2025 math codes can be
-- added later as rows next to the Common Core ones, with no rebuild of skills
-- or questions.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once, AFTER 0040 and BEFORE the coverage seed batches (they tag every
-- skill they create). Idempotent. Then run 0041_skill_standard_codes_verify.sql.
--
-- ---------------------------------------------------------------------------
-- WHAT CHANGES
-- ---------------------------------------------------------------------------
--  skill_standard_codes  One row per (skill, framework, code).
--                        framework 'ccss'    = Common Core / Maryland 2010
--                                              (MCCRS), today's codes.
--                        framework 'md-2025' = Maryland's 2025 math standards,
--                                              to be added when the MSDE
--                                              crosswalks are in hand.
--                        No browser access; the service role and SQL only.
--  Backfill              Every existing skill with a ccss_code gets a 'ccss'
--                        row with that code exactly as stored.
--  skills.ccss_code      Unchanged. It stays the single code the app reads.
--
-- Adding a Maryland 2025 code later (example):
--   insert into public.skill_standard_codes (skill_id, framework, code)
--   select id, 'md-2025', '1.GR.C.6' from public.skills where slug = 'math-g1-money'
--   on conflict do nothing;
--
-- ---------------------------------------------------------------------------
-- ROLLBACK (by hand)
-- ---------------------------------------------------------------------------
--  begin;
--  drop table if exists public.skill_standard_codes;
--  commit;
-- ===========================================================================

begin;

create table if not exists public.skill_standard_codes (
  skill_id   uuid        not null references public.skills (id) on delete cascade,
  framework  text        not null check (framework in ('ccss', 'md-2025')),
  code       text        not null check (btrim(code) <> ''),
  created_at timestamptz not null default now(),
  primary key (skill_id, framework, code)
);

create index if not exists skill_standard_codes_lookup
  on public.skill_standard_codes (framework, code);

comment on table public.skill_standard_codes is
  'Standard codes per skill by framework: ccss (Common Core / MCCRS 2010) now, md-2025 (Maryland 2025 math) later. skills.ccss_code stays the code the app reads.';

alter table public.skill_standard_codes enable row level security;
revoke all on public.skill_standard_codes from public, anon, authenticated;
grant select, insert, update, delete on public.skill_standard_codes to service_role;

-- Backfill: today's code for every skill that has one.
insert into public.skill_standard_codes (skill_id, framework, code)
select s.id, 'ccss', btrim(s.ccss_code)
  from public.skills s
 where s.ccss_code is not null and btrim(s.ccss_code) <> ''
on conflict do nothing;

commit;
