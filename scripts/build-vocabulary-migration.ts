/**
 * Builds migrations/0046_vocabulary_coverage.sql (run with Bun):
 *
 *   bun run scripts/build-vocabulary-migration.ts
 *
 * Vocabulary had published questions for grade 3 only, so a student in any
 * other band who opened Vocabulary practice (ISEE/HSPT "Vocabulary in context"
 * most of all) hit an empty Practice screen. This publishes one original set
 * per missing band, written in the coverage format and passing content/checks.ts:
 *
 *   read-gk-vocabulary             K-2, picture taps (audio_picture)
 *   read-g6-vocabulary-in-context  6-8, words in context
 *   read-g9-vocabulary-in-context  9-12, words in context
 *
 * Unlike scripts/build-coverage-seeds.ts (which only ever writes drafts), these
 * rows are PUBLISHED: the sets fix a live dead end. Ids and choice order come
 * from the coverage builder, so a later coverage-seed run updates nothing here
 * (it touches only unreviewed drafts).
 *
 * It also re-seeds public.prep_section_config from src/lib/prep (sectionConfig.ts),
 * because prep "Vocabulary in context" now points at read-g6-vocabulary-in-context
 * and the server lets a prep-only family answer only on a section's listed skills.
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { itemCount, skillIssues } from '../content/checks'
import type { ContentItem, ContentSkill } from '../content/types'
import { deterministicId, orderedChoices } from './build-coverage-seeds'
import { prepSectionConfigValuesSql } from '../src/lib/prep/sectionConfig'

const here = dirname(fileURLToPath(import.meta.url))
const ROOT = join(here, '..')
const OUT = join(ROOT, 'migrations', '0046_vocabulary_coverage.sql')

export const VOCAB_FILES = [
  'content/reading/grade-k/read-gk-vocabulary.ts',
  'content/reading/grade-6/read-g6-vocabulary-in-context.ts',
  'content/reading/grade-9/read-g9-vocabulary-in-context.ts',
]

const qq = (s: string) => `'${s.replace(/'/g, "''")}'`
function dq(s: string): string {
  let tag = 'q'
  while (s.includes(`$${tag}$`)) tag += 'q'
  return `$${tag}$${s}$${tag}$`
}
const jsonb = (v: unknown) => `${dq(JSON.stringify(v))}::jsonb`
const band = (g: number) => (g <= 2 ? 'k-2' : g <= 5 ? '3-5' : g <= 8 ? '6-8' : '9-12')
const gradeText = (g: number) => (g === 0 ? 'K' : String(g))
const groupKey = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function skillRows(skill: ContentSkill): string {
  const domainId = deterministicId(`domain:${skill.subject}:${groupKey(skill.group)}`)
  const skillId = deterministicId(`skill:${skill.slug}`)
  const tags = skill.standards.map((code) => `('ccss', ${dq(code)})`).join(', ')
  return `
-- ---- ${skill.slug}: ${skill.name}, grade ${gradeText(skill.grade)} (${band(skill.grade)}), ${itemCount(skill)} questions ----
insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment, prerequisite_skills)
values (${qq(domainId)}, 'domain',
        (select id from public.skills where level = 'subject' and subject = ${qq(skill.subject)} order by created_at limit 1),
        ${qq(skill.subject)}, ${dq(skill.group)}, null, null, null, '{}')
on conflict (id) do nothing;

insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, ccss_grade, ccss_grade_num, ccss_code,
                           sat_alignment, prerequisite_skills)
values (${qq(skillId)}, 'skill', ${qq(domainId)}, ${qq(skill.subject)}, ${dq(skill.name)}, ${qq(skill.slug)},
        ${qq(band(skill.grade))}, ${qq(gradeText(skill.grade))}, ${skill.grade}, ${dq(skill.standards[0])}, null, '{}')
on conflict (slug) do update set
  name = excluded.name, grade_band = excluded.grade_band, ccss_grade = excluded.ccss_grade,
  ccss_grade_num = excluded.ccss_grade_num, ccss_code = excluded.ccss_code;

insert into public.skill_standard_codes (skill_id, framework, code)
select s.id, t.framework, t.code
  from public.skills s
 cross join (values ${tags}) as t (framework, code)
 where s.slug = ${qq(skill.slug)}
on conflict do nothing;
`
}

function questionRow(skill: ContentSkill, item: ContentItem): string {
  const id = deterministicId(`${skill.slug}:${item.slot}`)
  const choices = orderedChoices(skill.slug, item)
  const correct = choices.find((c) => c.is_correct)!.text
  const picture = skill.renderMode === 'audio_picture'
  const stored = picture ? choices.map((c) => ({ text: c.text, is_correct: c.is_correct, tile: c.tile })) : choices
  return `  (${qq(id)}, (select id from public.skills where slug = ${qq(skill.slug)}), ${qq(item.difficulty)},
   ${dq(item.stem)}, ${jsonb(stored)}, ${dq(correct)}, ${dq(item.solution)},
   ${qq(picture ? 'audio_picture' : 'text')}, ${picture && item.prompt ? jsonb(item.prompt) : 'null::jsonb'})`
}

function questions(skill: ContentSkill): string {
  const rows = (skill.items ?? []).map((item) => questionRow(skill, item)).join(',\n')
  return `
insert into public.generated_questions
  (id, skill_id, difficulty, stem, choices, correct_answer, solution, render_mode, prompt, status, template_id, sat_alignment, passage_id)
select v.id::uuid, v.skill_id, v.difficulty::public.question_difficulty, v.stem, v.choices, v.correct_answer, v.solution,
       v.render_mode, v.prompt, 'published', null, null, null
  from (values
${rows}
  ) as v (id, skill_id, difficulty, stem, choices, correct_answer, solution, render_mode, prompt)
on conflict (id) do update set
  skill_id       = excluded.skill_id,
  difficulty     = excluded.difficulty,
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution,
  render_mode    = excluded.render_mode,
  prompt         = excluded.prompt,
  status         = excluded.status;
`
}

const HEADER = `-- ===========================================================================
-- 0046_vocabulary_coverage.sql
-- GENERATED by scripts/build-vocabulary-migration.ts. Do not edit by hand.
--
-- Fixes the "No practice questions are ready yet" dead end on Vocabulary.
-- Before this, only grade 3 Vocabulary had published questions, and prep
-- (ISEE/HSPT) "Vocabulary in context" pointed at 'author-purpose', a skill that
-- does not exist, so its Practice tab always opened an empty set.
--
-- WHAT IT DOES
--  1. Publishes three ORIGINAL vocabulary sets, 40 questions each, one per band
--     that had none: read-gk-vocabulary (K-2 picture taps),
--     read-g6-vocabulary-in-context (6-8), read-g9-vocabulary-in-context (9-12).
--     Written in the coverage format; every item passes content/checks.ts.
--  2. Re-seeds prep_section_config from src/lib/prep, so the server lets an
--     ISEE/HSPT-only family answer on read-g6-vocabulary-in-context
--     (can_practice_skill reads this table).
--
-- HOW TO APPLY: paste into the Supabase SQL editor for papiowjjoyhnbyhgtbxq and
-- run once. Idempotent. Then run 0046_vocabulary_coverage_verify.sql.
-- Deploy the app AFTER this has committed (the app's maps name these slugs).
--
-- ROLLBACK (by hand):
--   update public.generated_questions set status = 'draft'
--    where skill_id in (select id from public.skills where slug in
--      ('read-gk-vocabulary', 'read-g6-vocabulary-in-context', 'read-g9-vocabulary-in-context'));
--   then re-run the prep_section_config insert from 0033.
-- ===========================================================================

begin;
`

if (import.meta.main) {
  const skills: ContentSkill[] = []
  for (const f of VOCAB_FILES) {
    const mod = (await import(pathToFileURL(join(ROOT, f)).href)) as { default: ContentSkill }
    skills.push(mod.default)
  }
  const problems = skills.flatMap((s) => skillIssues(s))
  if (problems.length) {
    console.error(`Not written. ${problems.length} problem(s):\n${problems.join('\n')}`)
    process.exit(1)
  }
  let sql = HEADER
  for (const s of skills) sql += skillRows(s) + questions(s)
  sql += `
-- ---- prep_section_config, regenerated from src/lib/prep (sectionConfig.ts) ----
insert into public.prep_section_config
  (module_id, section_id, question_count, time_limit_sec, skill_slugs, is_essay)
values
${prepSectionConfigValuesSql()}
on conflict (module_id, section_id) do update set
  question_count = excluded.question_count,
  time_limit_sec = excluded.time_limit_sec,
  skill_slugs    = excluded.skill_slugs,
  is_essay       = excluded.is_essay;

commit;
`
  writeFileSync(OUT, sql)
  console.log(`Wrote migrations/0046_vocabulary_coverage.sql: ${skills.map((s) => `${s.slug} (${itemCount(s)})`).join(', ')}`)
}
