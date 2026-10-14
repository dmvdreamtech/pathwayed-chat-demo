-- ===========================================================================
-- seed_demo_student.sql  --  DEMO DATA ONLY. Run by hand in the SQL editor.
-- Project: papiowjjoyhnbyhgtbxq  (tutoring / pathwayed-chat-demo)
--
-- Creates ONE child profile named "Demo Student" on the family account
-- phillip.tomlin@dmvdream.org, grade 10, with placement already done: a spread
-- of mastery rows (strong, middling, weak), one in-progress focus skill, and a
-- little session history. Pairs with teardown_demo_student.sql.
--
-- IDENTIFYING THE DEMO ROWS
--   The child is the students row with first_name = 'Demo Student' owned by
--   that parent. Everything else is deleted by student_id, so teardown is exact.
--   No other child, and no other family, is touched.
--
-- WHY EACH PIECE IS HERE (do not trim these away)
--   * Mastery rows suppress the placement offer. KidHome calls hasAnyMastery()
--     and only offers the diagnostic when a grades 3-12 child has NO mastery
--     rows. Seeding mastery is what makes the diagnostic prompt disappear.
--     Note it is an OFFER, never forced, so this is belt and braces.
--   * above_grade_ok = true turns on SAT framing for a 9-12 student, and is
--     also what gates the Practice SAT entry point (see practiceSat.ts).
--   * active = true so the child is visible in the picker.
--   * school_covered stays FALSE. That column is not what bypasses billing:
--     the bypass reads isSchoolCovered() out of sessionStorage, which is only
--     written after a real Dean resolve. Setting it here would do nothing for
--     the gate and would misrepresent a B2C child as school licensed.
-- ===========================================================================

begin;

do $$
declare
  v_parent   uuid;
  v_student  uuid;
  v_skill    uuid;
  v_count    int;
begin
  -- --- Resolve the parent account ----------------------------------------
  select id into v_parent
  from public.profiles
  where lower(email) = 'phillip.tomlin@dmvdream.org'
  limit 1;

  if v_parent is null then
    raise exception
      'No profile for phillip.tomlin@dmvdream.org. Sign in once, then re-run.';
  end if;

  -- --- Guard against double-seeding --------------------------------------
  if exists (
    select 1 from public.students
    where parent_id = v_parent and first_name = 'Demo Student'
  ) then
    raise exception
      'Demo Student already exists. Run teardown_demo_student.sql first.';
  end if;

  -- --- The child ----------------------------------------------------------
  insert into public.students
    (parent_id, first_name, grade, level, above_grade_ok, avatar_mode, active, school_covered)
  values
    (v_parent, 'Demo Student', '10', 'on', true, 'video', true, false)
  returning id into v_student;

  raise notice 'Created Demo Student %', v_student;

  -- =======================================================================
  -- MASTERY
  -- Selected dynamically by subject and CCSS grade rather than by hardcoded
  -- uuid, so this runs correctly whatever the skill ids are on this project.
  -- Only rows carrying a slug are used: those are the Skill-level rows mastery
  -- is tracked against (see migration 0001).
  --
  -- status drives the parent/school-facing display. evidence_accuracy and
  -- attempts_counted are the authoritative signals from migration 0010; the
  -- mastery_percentage/accuracy/attempts trio is the legacy self-rated set and
  -- is filled consistently so nothing reads as contradictory.
  -- =======================================================================

  -- --- STRONG: two mastered math skills ----------------------------------
  for v_skill in
    select id from public.skills
    where subject = 'math' and level = 'skill' and slug is not null
      and ccss_grade_num between 8 and 9
    order by ccss_grade_num, name
    limit 2
  loop
    insert into public.student_skill_mastery
      (student_id, skill_id, status, evidence_accuracy, attempts_counted,
       mastery_percentage, accuracy, attempts, last_practiced,
       first_bar_met_at, recheck_passed_at, computed_at, advanced_at)
    values
      (v_student, v_skill, 'mastered', 92, 14,
       92, 92, 14, now() - interval '4 days',
       now() - interval '20 days', now() - interval '6 days', now() - interval '4 days',
       now() - interval '20 days')
    on conflict do nothing;
  end loop;

  -- --- STRONG: one advanced reading skill --------------------------------
  for v_skill in
    select id from public.skills
    where subject = 'reading' and level = 'skill' and slug is not null
    order by ccss_grade_num desc nulls last, name
    limit 1
  loop
    insert into public.student_skill_mastery
      (student_id, skill_id, status, evidence_accuracy, attempts_counted,
       mastery_percentage, accuracy, attempts, last_practiced,
       first_bar_met_at, computed_at, advanced_at)
    values
      (v_student, v_skill, 'advanced', 84, 11,
       84, 84, 11, now() - interval '2 days',
       now() - interval '9 days', now() - interval '2 days', now() - interval '9 days')
    on conflict do nothing;
  end loop;

  -- --- MIDDLING: three practicing skills across subjects -----------------
  for v_skill in
    select id from public.skills
    where subject in ('math', 'reading', 'writing')
      and level = 'skill' and slug is not null
      and ccss_grade_num = 10
    order by subject, name
    limit 3
  loop
    insert into public.student_skill_mastery
      (student_id, skill_id, status, evidence_accuracy, attempts_counted,
       mastery_percentage, accuracy, attempts, last_practiced, computed_at)
    values
      (v_student, v_skill, 'practicing', 61, 8,
       61, 61, 8, now() - interval '1 day', now() - interval '1 day')
    on conflict do nothing;
  end loop;

  -- --- WEAK: two low-accuracy skills. These are the gaps the dashboard
  --     should surface and the learning path should serve next. -----------
  for v_skill in
    select id from public.skills
    where subject = 'math' and level = 'skill' and slug is not null
      and ccss_grade_num between 10 and 11
    order by ccss_grade_num desc, name
    limit 2
  loop
    insert into public.student_skill_mastery
      (student_id, skill_id, status, evidence_accuracy, attempts_counted,
       mastery_percentage, accuracy, attempts, last_practiced, computed_at)
    values
      (v_student, v_skill, 'practicing', 34, 9,
       34, 34, 9, now() - interval '3 days', now() - interval '3 days')
    on conflict do nothing;

    -- One of these becomes the active focus skill, so the learning path has a
    -- genuine "in progress" target instead of picking one cold.
    if not exists (
      select 1 from public.student_focus_skills
      where student_id = v_student and resolved_at is null
    ) then
      insert into public.student_focus_skills (student_id, skill_id, source, created_at)
      values (v_student, v_skill, 'demo_seed', now() - interval '3 days');
    end if;
  end loop;

  select count(*) into v_count
  from public.student_skill_mastery where student_id = v_student;
  raise notice 'Seeded % mastery rows', v_count;

  if v_count = 0 then
    raise exception
      'No mastery rows were created, so the placement prompt WILL still appear. The skills taxonomy is probably not seeded on this project. Check: select count(*) from public.skills where level = ''skill'' and slug is not null;';
  end if;

  -- =======================================================================
  -- SESSION HISTORY
  -- Two short finished sessions so any surface showing recent activity has
  -- something real to render. messages is the same shape the app writes.
  -- =======================================================================
  insert into public.sessions
    (student_id, subject, messages, started_at, ended_at, updated_at, skills_practiced, mastery_updates)
  values
    (v_student, 'math',
     '[{"id":"greeting","role":"assistant","content":"Hi! Ready to work on some algebra today?"},{"id":"m1","role":"user","content":"yes"},{"id":"m2","role":"assistant","content":"Great. Let us start with solving for x."}]'::jsonb,
     now() - interval '4 days', now() - interval '4 days' + interval '18 minutes',
     now() - interval '4 days' + interval '18 minutes', '[]'::jsonb, '[]'::jsonb),
    (v_student, 'reading',
     '[{"id":"greeting","role":"assistant","content":"Let us look at the main idea of this passage."},{"id":"m1","role":"user","content":"ok"},{"id":"m2","role":"assistant","content":"Nice work finding the topic sentence."}]'::jsonb,
     now() - interval '1 day', now() - interval '1 day' + interval '12 minutes',
     now() - interval '1 day' + interval '12 minutes', '[]'::jsonb, '[]'::jsonb);

end $$;

commit;

-- ===========================================================================
-- ACCESS CHECK  --  run this BEFORE the demo and read it carefully.
--
-- SubscriptionGate locks every learning session for the whole account when the
-- app-managed trial has ended and there is no paid subscription. It is checked
-- per account, NOT per child, so the demo child inherits whatever state this
-- account is in. The seed cannot cause this by itself (the trial trigger fires
-- on profiles insert, and this script inserts no profiles row), but an already
-- expired trial will lock the demo.
--
-- verdict tells you what happens tomorrow.
-- ===========================================================================
select
  email,
  subscription_status,
  trial_end,
  has_trialed,
  paid_seats,
  (select count(*) from public.students s
    where s.parent_id = p.id and s.active) as active_children,
  case
    when subscription_status in ('active', 'trialing', 'past_due')
      then 'OK: paid status, no lock possible'
    when trial_end is not null and trial_end > now()
      then 'OK: trial still running, expires ' || trial_end::text
    else 'LOCK RISK: run the trial extension below before the demo'
  end as verdict
from public.profiles p
where lower(email) = 'phillip.tomlin@dmvdream.org';

-- ---------------------------------------------------------------------------
-- TRIAL EXTENSION  --  run ONLY if the verdict above says LOCK RISK.
-- Commented out deliberately. It pushes trial_end out 14 days and touches
-- nothing else: no plan, no seats, no Stripe customer, no has_trialed reset.
-- The guard means a paid subscription is never modified. Reversible by the
-- restore line in teardown_demo_student.sql.
-- ---------------------------------------------------------------------------
-- update public.profiles
--    set trial_end = now() + interval '14 days'
--  where lower(email) = 'phillip.tomlin@dmvdream.org'
--    and coalesce(subscription_status, '') not in ('active', 'trialing', 'past_due');

-- --- Verify the child ------------------------------------------------------
select s.id, s.first_name, s.grade, s.level, s.above_grade_ok, s.active,
       (select count(*) from public.student_skill_mastery m where m.student_id = s.id) as mastery_rows,
       (select count(*) from public.student_focus_skills f
         where f.student_id = s.id and f.resolved_at is null) as active_focus_skills,
       (select count(*) from public.sessions x where x.student_id = s.id) as sessions
from public.students s
join public.profiles p on p.id = s.parent_id
where lower(p.email) = 'phillip.tomlin@dmvdream.org'
  and s.first_name = 'Demo Student';

-- Mastery spread. Expect roughly: 2 mastered, 1 advanced, 5 practicing.
select m.status, count(*)
from public.student_skill_mastery m
join public.students s on s.id = m.student_id
where s.first_name = 'Demo Student'
group by m.status
order by m.status;
