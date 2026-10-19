/**
 * Seed builder for the K-12 Reading and Writing coverage content (run with Bun):
 *
 *   bun run scripts/build-coverage-seeds.ts                 every skill
 *   bun run scripts/build-coverage-seeds.ts content/...ts   just these
 *
 * Reads every skill file under content/ and writes one seed per skill to
 * seeds/coverage/<slug>.sql. NOTHING HERE PUBLISHES:
 *
 *  - A new skill row is created under a domain row for its group (Literature,
 *    Informational text, ...). A skill with only draft questions is invisible
 *    to students: the app offers a skill only when it has a published question.
 *  - Passages and questions are inserted as draft.
 *  - Re-running a seed updates a question only while it is still an unreviewed
 *    draft, and never changes any status. Reviewed or published items are left
 *    exactly as they are.
 *
 * Every skill must pass content/checks.ts first; the builder stops on any issue.
 * Content files are imported only here and in tests, never by the app
 * (src/lib/noQuestionBanksInBundle.test.ts).
 */
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { itemCount, skillIssues } from '../content/checks'
import { loadSkills } from '../content/load'
import type { ContentChoice, ContentItem, ContentSkill } from '../content/types'

const here = dirname(fileURLToPath(import.meta.url))
const ROOT = join(here, '..')
const OUT = join(ROOT, 'seeds', 'coverage')

const qq = (s: string) => `'${s.replace(/'/g, "''")}'`
function dq(s: string): string {
  let tag = 'q'
  while (s.includes(`$${tag}$`)) tag += 'q'
  return `$${tag}$${s}$${tag}$`
}
const jsonb = (v: unknown) => `${dq(JSON.stringify(v))}::jsonb`

/** Stable v5-style UUID from a string, so re-runs upsert by id. */
export function deterministicId(input: string): string {
  const b = createHash('sha1').update(`pe-coverage:${input}`).digest().subarray(0, 16)
  b[6] = (b[6] & 0x0f) | 0x50
  b[8] = (b[8] & 0x3f) | 0x80
  const h = b.toString('hex')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`
}

function mulberry32(a: number) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Deterministic order per item, so the answer is not always in one place and a re-run is identical. */
export function orderedChoices(slug: string, item: ContentItem): ContentChoice[] {
  const seed = createHash('sha1').update(`${slug}:${item.slot}`).digest().readUInt32BE(0)
  const rng = mulberry32(seed)
  const c = [...item.choices]
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[c[i], c[j]] = [c[j], c[i]]
  }
  return c
}

const band = (g: number) => (g <= 2 ? 'k-2' : g <= 5 ? '3-5' : g <= 8 ? '6-8' : '9-12')
const gradeText = (g: number) => (g === 0 ? 'K' : String(g))
const groupKey = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function question(skill: ContentSkill, item: ContentItem, passageId: string | null): string {
  const id = deterministicId(`${skill.slug}:${item.slot}`)
  const choices = orderedChoices(skill.slug, item)
  const correct = choices.find((c) => c.is_correct)!.text
  const owner = `(select id from public.skills where slug = ${qq(skill.extends ?? skill.slug)})`
  if (skill.renderMode === 'audio_picture') {
    // K-2 picture item: spoken stem, tiles, optional picture prompt, no tokens.
    const tiles = choices.map((c) => ({ text: c.text, is_correct: c.is_correct, tile: c.tile }))
    return `insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id, render_mode, prompt)
values
  (${qq(id)}, null, ${owner}, null, ${qq(item.difficulty)},
   ${dq(item.stem)}, ${jsonb(tiles)}, ${dq(correct)}, ${dq(item.solution)}, 'draft', null, 'audio_picture', ${item.prompt ? jsonb(item.prompt) : 'null'})
on conflict (id) do update set
  difficulty     = excluded.difficulty,
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution,
  render_mode    = excluded.render_mode,
  prompt         = excluded.prompt
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
`
  }
  return `insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status, passage_id)
values
  (${qq(id)}, null, ${owner}, null, ${qq(item.difficulty)},
   ${dq(item.stem)}, ${jsonb(choices)}, ${dq(correct)}, ${dq(item.solution)}, 'draft', ${passageId ? qq(passageId) : 'null'})
on conflict (id) do update set
  difficulty     = excluded.difficulty,
  stem           = excluded.stem,
  choices        = excluded.choices,
  correct_answer = excluded.correct_answer,
  solution       = excluded.solution,
  passage_id     = excluded.passage_id
where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null;
`
}

export function skillSeed(skill: ContentSkill, file: string): string {
  const domainId = deterministicId(`domain:${skill.subject}:${groupKey(skill.group)}`)
  const skillId = deterministicId(`skill:${skill.slug}`)
  const owner = skill.extends ?? skill.slug
  let sql = `-- ${skill.slug}: ${skill.name}, ${skill.subject} grade ${gradeText(skill.grade)} (${skill.standards.join(', ')})
-- GENERATED by scripts/build-coverage-seeds.ts from ${file}. Do not edit by hand.
-- ${itemCount(skill)} ${skill.renderMode === 'audio_picture' ? 'K-2 picture-tap ' : ''}questions, all DRAFT. Nothing here publishes or changes a status;
-- re-running updates only unreviewed drafts. A draft-only skill is invisible to students.${
    skill.extends ? `
-- TOP-UP: adds drafts to the live skill '${skill.extends}' and never edits that skill's row.` : ''
  }

begin;
${skill.extends ? topUpGuard(skill.extends) : skillRows(skill, domainId, skillId)}`
  for (const p of skill.passages ?? []) {
    const passageId = deterministicId(`passage:${p.code}`)
    sql += `
-- Passage ${p.code}
insert into public.passages (id, code, skill_id, sat_alignment, grade_band, title, body, status)
values (${qq(passageId)}, ${qq(p.code)}, (select id from public.skills where slug = ${qq(owner)}), null,
        ${qq(band(skill.grade))}, ${p.title ? dq(p.title) : 'null'}, ${dq(p.body)}, 'draft')
on conflict (id) do update set title = excluded.title, body = excluded.body
where public.passages.status = 'draft';
`
    for (const item of p.items) sql += question(skill, item, passageId)
  }
  if (skill.items?.length) sql += '\n-- Standalone questions\n'
  for (const item of skill.items ?? []) sql += question(skill, item, null)
  return sql + '\ncommit;\n'
}

/** A top-up never creates a skill: it stops if the live skill is not there. */
function topUpGuard(slug: string): string {
  return `
-- The live skill must already exist; this seed only adds draft questions to it.
do $guard$ begin
  if not exists (select 1 from public.skills where slug = ${qq(slug)} and level = 'skill') then
    raise exception 'top-up: live skill % is missing', ${qq(slug)};
  end if;
end $guard$;
`
}

function skillRows(skill: ContentSkill, domainId: string, skillId: string): string {
  return `
-- Domain row for the group, under the subject.
insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment, prerequisite_skills)
values (${qq(domainId)}, 'domain',
        (select id from public.skills where level = 'subject' and subject = ${qq(skill.subject)} order by created_at limit 1),
        ${qq(skill.subject)}, ${dq(skill.group)}, null, null, null, '{}')
on conflict (id) do nothing;

-- The skill.
insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, ccss_grade, ccss_grade_num, ccss_code,
                           sat_alignment, prerequisite_skills)
values (${qq(skillId)}, 'skill', ${qq(domainId)}, ${qq(skill.subject)}, ${dq(skill.name)}, ${qq(skill.slug)},
        ${qq(band(skill.grade))}, ${qq(gradeText(skill.grade))}, ${skill.grade}, ${dq(skill.standards[0])}, null, '{}')
on conflict (slug) do update set
  name = excluded.name, grade_band = excluded.grade_band, ccss_grade = excluded.ccss_grade,
  ccss_grade_num = excluded.ccss_grade_num, ccss_code = excluded.ccss_code;
${standardTags(skill)}`
}

/** Standard codes by framework (0041): every Common Core code now, Maryland 2025 codes when a file lists them. */
function standardTags(skill: ContentSkill): string {
  const tags = [
    ...skill.standards.map((code) => ['ccss', code] as const),
    ...(skill.md2025 ?? []).map((code) => ['md-2025', code] as const),
  ]
  return `
-- Standard codes (0041).
insert into public.skill_standard_codes (skill_id, framework, code)
select s.id, t.framework, t.code
  from public.skills s
 cross join (values ${tags.map(([f, c]) => `(${qq(f)}, ${dq(c)})`).join(', ')}) as t (framework, code)
 where s.slug = ${qq(skill.slug)}
on conflict do nothing;
`
}

if (import.meta.main) {
  // With file arguments, build just those skills; otherwise every file under content/.
  const args = process.argv.slice(2)
  const loaded = args.length
    ? await Promise.all(
        args.map(async (a) => {
          const abs = resolve(ROOT, a)
          const mod = (await import(pathToFileURL(abs).href)) as { default: ContentSkill }
          return { file: relative(ROOT, abs).split(sep).join('/'), skill: mod.default }
        }),
      )
    : await loadSkills(join(ROOT, 'content'))
  const problems = loaded.flatMap(({ skill }) => skillIssues(skill))
  const slugs = loaded.map(({ skill }) => skill.slug)
  const dup = slugs.filter((s, i) => slugs.indexOf(s) !== i)
  if (dup.length) problems.push(`slug used by two files: ${[...new Set(dup)].join(', ')}`)
  if (problems.length) {
    console.error(`Not written. ${problems.length} problem(s):\n${problems.join('\n')}`)
    process.exit(1)
  }
  mkdirSync(OUT, { recursive: true })
  for (const { file, skill } of loaded) writeFileSync(join(OUT, `${skill.slug}.sql`), skillSeed(skill, file))
  console.log(`Wrote ${loaded.length} seed(s) to seeds/coverage, ${loaded.reduce((n, l) => n + itemCount(l.skill), 0)} draft questions.`)
}
