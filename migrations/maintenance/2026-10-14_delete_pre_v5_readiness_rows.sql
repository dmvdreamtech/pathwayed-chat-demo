-- ===========================================================================
-- 2026-10-14_delete_pre_v5_readiness_rows.sql
--
-- One-off data cleanup, not a schema migration (so it takes no number and the
-- answer-key work keeps 0033).
--
-- Deletes every readiness row still written by the old engine (engine_version
-- below 5). A scan of papiowjjoyhnbyhgtbxq on 2026-10-14, after
-- scripts/recompute-readiness.ts --write, found exactly these five:
--
--   student                               type      engine  written      score
--   f58cd009-c320-4448-b39c-9f31877acc52  math      3       2026-07-20   60
--   f58cd009-c320-4448-b39c-9f31877acc52  pathway   3       2026-07-20   60
--   f58cd009-c320-4448-b39c-9f31877acc52  sat       3       2026-07-20   60
--   6df838f0-fc86-41ce-bf43-962e031a574c  reading   3       2026-06-30   75
--   6df838f0-fc86-41ce-bf43-962e031a574c  writing   3       2026-06-30   75
--
-- WHY THE RECOMPUTE LEFT THEM. It upserts the rows the current engine produces
-- and never deletes. f58cd009 (Peyton, grade 11) has no mastery rows and no
-- answers, so nothing was produced and all three rows stayed; the sat row still
-- holds the old projected SAT ranges. 6df838f0 (Peyton) was recomputed, but the
-- engine no longer produces reading or writing rows for them because they have
-- no counted evidence in those subjects, so a June reading and writing score of
-- 75 was left showing as current.
--
-- WHAT A FAMILY SEES AFTERWARDS. f58cd009's dashboard shows its normal "no
-- results yet" state. 6df838f0 keeps their current pathway, math and sat rows
-- and simply has no reading or writing score until they practice those. The next
-- practice set or placement writes fresh rows through api/readiness.ts.
--
-- SAFE TO RE-RUN. Each delete names the student, the type, AND requires
-- engine_version < 5, so it can never remove a row the current engine wrote.
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once. It reports the rows removed (expect 5 on the first run, 0 after).
-- Then run 2026-10-14_delete_pre_v5_readiness_rows_verify.sql.
--
-- ROLLBACK: none by design. These rows are derived results, not source data,
-- and restoring them would put a projected SAT range and stale scores back. To
-- rebuild readiness from current evidence at any time:
--   bun run scripts/recompute-readiness.ts --write
-- ===========================================================================

begin;

with targets (student_id, readiness_type) as (
  values
    ('f58cd009-c320-4448-b39c-9f31877acc52'::uuid, 'math'),
    ('f58cd009-c320-4448-b39c-9f31877acc52'::uuid, 'pathway'),
    ('f58cd009-c320-4448-b39c-9f31877acc52'::uuid, 'sat'),
    ('6df838f0-fc86-41ce-bf43-962e031a574c'::uuid, 'reading'),
    ('6df838f0-fc86-41ce-bf43-962e031a574c'::uuid, 'writing')
),
removed as (
  delete from public.readiness_scores r
   using targets t
   where r.student_id = t.student_id
     and r.readiness_type = t.readiness_type
     and r.engine_version < 5
  returning r.student_id, r.readiness_type
)
select count(*) as rows_removed,
       coalesce(string_agg(left(student_id::text, 8) || ' ' || readiness_type, ', '
                           order by student_id, readiness_type), 'none') as removed
  from removed;

commit;
