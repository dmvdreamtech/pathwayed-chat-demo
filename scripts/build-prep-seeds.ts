/**
 * Authoring script (Bun): emits the iteration-2 PREP question seeds from the
 * curated pools in src/lib/prep/*Templates.ts, so stored content can't drift from
 * source. NOT run at request time.
 *
 *   bun run scripts/build-prep-seeds.ts
 *
 * Writes (each SELF-CONTAINED: subject + domain + skill(s) + questions, idempotent
 * deterministic ids):
 *   seeds/0016_prep_analogy_questions.sql
 *   seeds/0017_prep_sentence_completion_questions.sql
 *   seeds/0018_prep_number_series_questions.sql
 *   seeds/0019_prep_quant_compare_questions.sql
 *   seeds/0020_prep_logic_questions.sql
 * Apply each with: bun run db:seed seeds/00XX_....sql
 * (Synonyms/antonyms stay in scripts/build-prep-verbal-seeds.ts -> 0015.)
 */
import { createHash } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  PREP_VERBAL_SUBJECT,
  PREP_VERBAL_DOMAIN,
  buildPrepQuestion,
  seedForSlot,
  type PrepSkill,
} from '../src/lib/prep/verbalTemplates'
import { PREP_ANALOGY_SKILLS } from '../src/lib/prep/analogyTemplates'
import { PREP_SENTENCE_COMPLETION_SKILLS } from '../src/lib/prep/sentenceCompletionTemplates'
import { PREP_NUMBER_SERIES_SKILLS } from '../src/lib/prep/numberSeriesTemplates'
import { PREP_QUANT_COMPARE_SKILLS } from '../src/lib/prep/quantCompareTemplates'
import { PREP_LOGIC_SKILLS } from '../src/lib/prep/logicTemplates'
import { PREP_SAT_TRANSITIONS_SKILLS } from '../src/lib/prep/satTransitions'
import { PREP_SAT_WORDS_IN_CONTEXT_SKILLS } from '../src/lib/prep/satWordsInContext'

const here = dirname(fileURLToPath(import.meta.url))
const seedsDir = join(here, '..', 'seeds')

const qq = (s: string) => `'${s.replace(/'/g, "''")}'`
function dq(s: string): string {
  let tag = 'q'
  while (s.includes(`$${tag}$`)) tag += 'q'
  return `$${tag}$${s}$${tag}$`
}
const jsonb = (v: unknown) => `${dq(JSON.stringify(v))}::jsonb`
const md5uuid = (key: string) => `md5('pe-aos:${key.replace(/'/g, "''")}')::uuid`
function deterministicId(input: string): string {
  const b = createHash('sha1').update(input).digest().subarray(0, 16)
  b[6] = (b[6] & 0x0f) | 0x50
  b[8] = (b[8] & 0x3f) | 0x80
  const h = b.toString('hex')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`
}

// Isolated prep taxonomy. Verbal types reuse the synonyms/antonyms subject/domain;
// quantitative types get their own subject/domain.
const VERBAL = { subjectKey: PREP_VERBAL_SUBJECT.key, subjectVal: PREP_VERBAL_SUBJECT.subject, subjectName: PREP_VERBAL_SUBJECT.name, domainKey: PREP_VERBAL_DOMAIN.key, domainName: PREP_VERBAL_DOMAIN.name }
const QUANT = { subjectKey: 'subj-prep-quant', subjectVal: 'prep-quant', subjectName: 'Test Prep — Quantitative', domainKey: 'dom-prep-quant', domainName: 'Quantitative Reasoning' }

// The SAT Reading and Writing subject from migration 0034. Its skills sit under
// their own SAT domain rows, so the seed writes exactly what 0034 writes.
const SAT_RW = { subjectKey: 'subj-prep-sat-rw', subjectVal: 'prep-sat-rw', subjectName: 'Test Prep, SAT Reading and Writing', domainKey: '', domainName: '' }
const SAT_DOMAIN_OF: Record<string, { key: string; name: string }> = {
  'prep-sat-transitions': { key: 'dom-prep-sat-expression-of-ideas', name: 'Expression of Ideas' },
  'prep-sat-words-in-context': { key: 'dom-prep-sat-craft-and-structure', name: 'Craft and Structure' },
}

interface Group {
  file: string
  label: string
  tax: typeof VERBAL
  skills: PrepSkill[]
  /** Per-skill domain rows, when the group's skills do not share one domain. */
  domainOf?: Record<string, { key: string; name: string }>
}

const GROUPS: Group[] = [
  { file: '0016_prep_analogy_questions.sql', label: 'analogies', tax: VERBAL, skills: PREP_ANALOGY_SKILLS },
  { file: '0017_prep_sentence_completion_questions.sql', label: 'sentence completions', tax: VERBAL, skills: PREP_SENTENCE_COMPLETION_SKILLS },
  { file: '0018_prep_number_series_questions.sql', label: 'number series', tax: QUANT, skills: PREP_NUMBER_SERIES_SKILLS },
  { file: '0019_prep_quant_compare_questions.sql', label: 'quantitative comparisons', tax: QUANT, skills: PREP_QUANT_COMPARE_SKILLS },
  { file: '0020_prep_logic_questions.sql', label: 'logic + verbal classification', tax: VERBAL, skills: PREP_LOGIC_SKILLS },
  // SAT-specific authored R&W skills (transitions, words-in-context). The other SAT
  // domains lean on existing banks (already seeded), so only these two need a seed.
  { file: '0021_prep_sat_questions.sql', label: 'SAT reading & writing', tax: SAT_RW, domainOf: SAT_DOMAIN_OF, skills: [...PREP_SAT_TRANSITIONS_SKILLS, ...PREP_SAT_WORDS_IN_CONTEXT_SKILLS] },
]

for (const g of GROUPS) {
  const t = g.tax
  let sql = `-- PathwayEd — Question Engine: PREP ${g.label} skills + questions (GENERATED).
--
-- DO NOT EDIT BY HAND — produced by scripts/build-prep-seeds.ts from the curated
-- pools in src/lib/prep/*Templates.ts. HOW TO APPLY (self-contained — creates the
-- isolated prep subject + domain + skills, then the questions):
--   bun run db:seed seeds/${g.file}
-- Idempotent (deterministic ids). Depends on migration 0004 (generated_questions).
-- Prep subjects are isolated from the K-12 tree; the prep engine reaches these by slug.
--
-- 100% ORIGINAL grade 6-8 items. Every item has 4 choices, one correct, and three
-- distractors that are each a specific wrong path (with a mapped misconception).

begin;

insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment, prerequisite_skills)
values (${md5uuid(t.subjectKey)}, 'subject', null, ${qq(t.subjectVal)}, ${qq(t.subjectName)}, null, null, null, '{}')
on conflict (id) do update set level=excluded.level, parent_id=excluded.parent_id, subject=excluded.subject, name=excluded.name;
`
  const domains = g.domainOf
    ? [...new Map(Object.values(g.domainOf).map((d) => [d.key, d])).values()]
    : [{ key: t.domainKey, name: t.domainName }]
  for (const d of domains) {
    sql += `insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment, prerequisite_skills)
values (${md5uuid(d.key)}, 'domain', ${md5uuid(t.subjectKey)}, ${qq(t.subjectVal)}, ${qq(d.name)}, null, null, null, '{}')
on conflict (id) do update set level=excluded.level, parent_id=excluded.parent_id, subject=excluded.subject, name=excluded.name;
`
  }
  for (const skill of g.skills) {
    const domainKey = g.domainOf?.[skill.slug]?.key ?? t.domainKey
    sql += `insert into public.skills (id, level, parent_id, subject, name, slug, grade_band, sat_alignment, prerequisite_skills)
values (${md5uuid('skill-' + skill.slug)}, 'skill', ${md5uuid(domainKey)}, ${qq(t.subjectVal)}, ${qq(skill.name)}, ${qq(skill.slug)}, ${qq(skill.gradeBand)}, null, '{}')
on conflict (id) do update set level=excluded.level, parent_id=excluded.parent_id, subject=excluded.subject, name=excluded.name, slug=excluded.slug, grade_band=excluded.grade_band;\n`
  }

  let count = 0
  for (const skill of g.skills) {
    sql += `\n-- ${skill.slug} (${skill.name}) — ${skill.items.length} items\n`
    for (const item of skill.items) {
      const gq = buildPrepQuestion(item, seedForSlot(item.slot))
      const id = deterministicId(`${skill.slug}:${item.slot}`)
      sql += `insert into public.generated_questions
  (id, template_id, skill_id, sat_alignment, difficulty, stem, choices, correct_answer, solution, status)
values
  (${qq(id)}, null, (select id from public.skills where slug = ${qq(skill.slug)}), null, ${qq(gq.difficulty)},
   ${dq(gq.stem)}, ${jsonb(gq.choices)}, ${dq(gq.correct_answer)}, ${dq(gq.solution)}, 'published')
on conflict (id) do update set
  template_id=excluded.template_id, skill_id=excluded.skill_id, sat_alignment=excluded.sat_alignment,
  difficulty=excluded.difficulty, stem=excluded.stem, choices=excluded.choices,
  correct_answer=excluded.correct_answer, solution=excluded.solution, status=excluded.status;\n`
      count++
    }
  }
  sql += '\ncommit;\n'
  writeFileSync(join(seedsDir, g.file), sql)
  console.log(`Wrote seeds/${g.file} (${count} ${g.label} questions across ${g.skills.length} skill(s)).`)
}
