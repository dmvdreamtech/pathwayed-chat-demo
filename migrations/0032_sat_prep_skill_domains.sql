-- ===========================================================================
-- 0032_sat_prep_skill_domains.sql
--
-- Maps the two SAT-specific prep skills to their digital-SAT domains, so the
-- SAT results card counts them and no SAT domain is left empty:
--
--   prep-sat-words-in-context  "SAT Words in Context"  -> craft-and-structure
--   prep-sat-transitions       "SAT Transitions"       -> expression-of-ideas
--
-- These are the skills the SAT prep module already serves for those two
-- domains (src/lib/prep/prepSkills.ts: craft_and_structure and
-- expression_of_ideas). Until now their sat_alignment was null, so the SAT card
-- could not see them.
--
-- WHY IT MATTERS NOW. From engine version 5 the SAT card counts only SAT-level
-- skills: a known SAT domain AND (Common Core grade 6 or above, OR a test-prep
-- skill mapped to an SAT domain on purpose). At that floor Craft & Structure had
-- no skills at all; its only mapped skill was grade 3 Vocabulary.
--
-- Final SAT-level skills per domain after this migration (live, 2026-10-14):
--   Advanced Math 13, Algebra 12, Geometry & Trigonometry 10,
--   Problem-Solving & Data Analysis 9, Standard English Conventions 4,
--   Expression of Ideas 2, Information & Ideas 1, Craft & Structure 1.
--   Total 52.
--
-- Nothing else reads skills.sat_alignment (questions carry their own), and prep
-- skills are excluded from the practice picker and the grade ladder by subject,
-- so this changes the SAT card and nothing else. Data only: no function, no
-- grant, no policy.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once. Idempotent. Then run 0032_sat_prep_skill_domains_verify.sql.
--
-- ROLLBACK (manual):
-- begin;
-- update public.skills set sat_alignment = null
--  where slug in ('prep-sat-words-in-context', 'prep-sat-transitions');
-- commit;
-- ===========================================================================

begin;

update public.skills
   set sat_alignment = 'craft-and-structure'
 where slug = 'prep-sat-words-in-context'
   and sat_alignment is distinct from 'craft-and-structure';

update public.skills
   set sat_alignment = 'expression-of-ideas'
 where slug = 'prep-sat-transitions'
   and sat_alignment is distinct from 'expression-of-ideas';

commit;
