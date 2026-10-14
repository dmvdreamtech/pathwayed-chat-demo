-- ===========================================================================
-- 2026-10-14_delete_pre_v5_readiness_rows_verify.sql
--
-- Read only. Run in papiowjjoyhnbyhgtbxq after the cleanup has committed.
-- Returns one table; every row should read PASSED.
-- ===========================================================================

select 'no readiness row anywhere below engine version 5' as check_name,
       case when count(*) = 0 then 'PASSED' else 'FAILED' end as result,
       count(*)::text || ' row(s) below version 5' as detail
  from public.readiness_scores
 where engine_version < 5

union all

select 'no SAT row anywhere still holds a projected range',
       case when count(*) = 0 then 'PASSED' else 'FAILED' end,
       count(*)::text || ' sat row(s) with today, trajectory, gate or timeline'
  from public.readiness_scores
 where readiness_type = 'sat'
   and (recommendations ? 'today' or recommendations ? 'trajectory'
        or recommendations ? 'gate' or recommendations ? 'timeline')

union all

select 'every SAT row is the measured format (schema 2)',
       case when count(*) filter (where coalesce(recommendations ->> 'schemaVersion', '') <> '2') = 0
            then 'PASSED' else 'FAILED' end,
       count(*)::text || ' sat row(s), '
         || count(*) filter (where coalesce(recommendations ->> 'schemaVersion', '') <> '2')::text || ' not schema 2'
  from public.readiness_scores
 where readiness_type = 'sat'

union all

select '6df838f0 keeps its current pathway, math and sat rows',
       case when count(*) = 3 then 'PASSED' else 'FAILED' end,
       coalesce(string_agg(readiness_type || ' v' || engine_version, ', ' order by readiness_type), 'none')
  from public.readiness_scores
 where student_id = '6df838f0-fc86-41ce-bf43-962e031a574c'

union all

select 'both students still exist',
       case when count(*) = 2 then 'PASSED' else 'FAILED' end,
       count(*)::text || ' of 2 student rows'
  from public.students
 where id in ('f58cd009-c320-4448-b39c-9f31877acc52', '6df838f0-fc86-41ce-bf43-962e031a574c');
