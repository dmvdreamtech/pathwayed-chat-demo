import { describe, it, expect } from 'vitest'
import katex from 'katex'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { TARGET_ITEMS, TOPUP_ITEMS, itemCount, passageLimits, requiredItems, skillIssues } from './checks'
import { loadSkills } from './load'
import { orderedChoices, skillSeed } from '../scripts/build-coverage-seeds'
import { BATCHES, MAX_BYTES, buildBatches, orderSeeds, readSeeds } from '../scripts/build-coverage-batches'
import type { ContentItem, ContentSkill } from './types'

const item = (slot: number, over: Partial<ContentItem> = {}): ContentItem => ({
  slot,
  difficulty: 'medium',
  stem: `Which word best completes sentence ${slot}?`,
  choices: [
    { text: `right ${slot}`, is_correct: true },
    { text: `wrong a ${slot}`, is_correct: false, misconception_token: 'confuses-meaning' },
    { text: `wrong b ${slot}`, is_correct: false, misconception_token: 'ignores-context' },
    { text: `wrong c ${slot}`, is_correct: false, misconception_token: 'sounds-similar' },
  ],
  solution: 'The right word fits the meaning of the whole sentence.',
  ...over,
})

const good: ContentSkill = {
  slug: 'write-g6-test-skill',
  subject: 'writing',
  grade: 6,
  group: 'Conventions',
  name: 'Test Skill',
  standards: ['L.6.1'],
  items: Array.from({ length: TARGET_ITEMS }, (_, i) => item(i + 1)),
}

describe('the automated checks', () => {
  it('pass a well-formed skill', () => {
    expect(skillIssues(good)).toEqual([])
  })

  it('catch each kind of bad item', () => {
    const bad: ContentSkill = {
      ...good,
      items: [
        item(1, { stem: 'No question mark' }),
        item(2, { choices: good.items![0].choices.slice(0, 3) }),
        item(3, { choices: good.items![0].choices.map((c) => ({ ...c, is_correct: true, misconception_token: undefined })) }),
        item(4, { choices: [...good.items![0].choices.slice(0, 3), { text: 'right 1', is_correct: false, misconception_token: 'x' }] }),
        item(5, { choices: good.items![0].choices.map((c, i) => (i === 1 ? { ...c, misconception_token: undefined } : c)) }),
        item(6, { solution: 'short' }),
        item(7, { stem: 'Which one — this or that?' }),
        item(7),
      ],
    }
    const issues = skillIssues(bad).join('\n')
    for (const expected of [
      'slot 1: stem must end',
      'slot 2: needs exactly 4 choices',
      'slot 3: needs exactly one correct',
      'slot 4: two choices are the same',
      'slot 5: wrong choice',
      'slot 6: solution is missing',
      'slot 7: stem has a dash',
      'slot(s) used twice: 7',
      'items, a skill needs at least 40',
    ]) {
      expect(issues).toContain(expected)
    }
  })

  it('check passage length and sentence length for the grade', () => {
    const long = Array.from({ length: 60 }, () => 'This sentence keeps going and going and going without ever stopping for a breath at all').join(' and ') + '.'
    const skill: ContentSkill = { ...good, items: [], passages: [{ code: 'p1', body: 'Too short.', items: good.items! }, { code: 'p2', body: long, items: [] }] }
    const issues = skillIssues(skill).join('\n')
    expect(issues).toContain(`passage p1: 2 words, grade 6 passages are ${passageLimits(6).min}`)
    expect(issues).toContain('passage p2: a passage needs at least one question')
    expect(issues).toMatch(/passage p2: sentences average|passage p2: \d+ words/)
  })

  it('treat a spaced minus inside $...$ as math, not a dash, for math skills only', () => {
    const mathItem = item(1, { stem: 'What is $x$ if $x - 3 = 4$?', solution: 'Add 3 to both sides: $x = 4 + 3 = 7$.' })
    const math: ContentSkill = { ...good, slug: 'math-g9-test-skill', subject: 'math', grade: 9, items: [mathItem, ...good.items!.slice(1)] }
    expect(skillIssues(math)).toEqual([])
    const prose: ContentSkill = { ...math, items: [item(1, { stem: 'Which value works - and why?' }), ...good.items!.slice(1)] }
    expect(skillIssues(prose).join()).toContain('slot 1: stem has a dash')
    expect(skillIssues({ ...good, items: [mathItem, ...good.items!.slice(1)] }).join()).toContain('slot 1: stem has a dash')
  })

  it('catch a lost backslash and an unpaired $ in math', () => {
    const math: ContentSkill = { ...good, slug: 'math-g9-test-skill', subject: 'math', grade: 9 }
    const lost = item(1, { stem: 'What is $\frac{1}{2} + \frac{1}{4}$?' }) // one backslash: a form feed
    const unpaired = item(2, { stem: 'A ticket costs $5. How many can she buy with 20 dollars?' })
    const issues = skillIssues({ ...math, items: [lost, unpaired, ...good.items!.slice(2)] }).join('\n')
    expect(issues).toContain('slot 1: stem has a control character')
    expect(issues).toContain('slot 2: stem has an unpaired $')
  })

  it('require the slug to name the subject and grade', () => {
    expect(skillIssues({ ...good, slug: 'read-g6-test-skill' }).join()).toContain('slug must start with write-g6-')
  })
})

describe('the seed', () => {
  const sql = skillSeed(good, 'content/writing/grade-6/write-g6-test-skill.ts')

  it('loads everything as draft and never publishes', () => {
    expect(sql).toContain(`'draft'`)
    expect(sql).not.toMatch(/'published'|'reviewed'/)
    expect((sql.match(/insert into public\.generated_questions/g) ?? []).length).toBe(TARGET_ITEMS)
  })

  it('updates only unreviewed drafts on a re-run, and never a status', () => {
    expect(sql).toContain("where public.generated_questions.status = 'draft' and public.generated_questions.reviewed_at is null")
    expect(sql).not.toMatch(/status\s*=\s*excluded\.status/)
  })

  it('spreads the right answer across positions, the same way every time', () => {
    const positions = good.items!.map((i) => orderedChoices(good.slug, i).findIndex((c) => c.is_correct))
    expect(new Set(positions).size).toBe(4)
    expect(good.items!.map((i) => orderedChoices(good.slug, i).findIndex((c) => c.is_correct))).toEqual(positions)
  })
})

describe('a top-up of a live skill', () => {
  const topUp: ContentSkill = { ...good, slug: 'write-g4-test-topup', grade: 4, standards: ['L.4.2'], extends: 'punctuation-basics', items: good.items!.slice(0, TOPUP_ITEMS) }
  const sql = skillSeed(topUp, 'content/writing/grade-4/write-g4-test-topup.ts')

  it('needs 20 items, not 40', () => {
    expect(skillIssues(topUp)).toEqual([])
    expect(skillIssues({ ...topUp, items: good.items!.slice(0, TOPUP_ITEMS - 1) }).join()).toContain('a top-up needs at least 20')
  })

  it('attaches drafts to the live skill and never creates or edits a skill row', () => {
    expect(sql).not.toMatch(/insert into public\.skills/)
    expect(sql).toContain("raise exception 'top-up: live skill % is missing', 'punctuation-basics'")
    expect(sql).toContain("(select id from public.skills where slug = 'punctuation-basics')")
    expect(sql).not.toContain("where slug = 'write-g4-test-topup'")
    expect((sql.match(/insert into public\.generated_questions/g) ?? []).length).toBe(TOPUP_ITEMS)
    expect(sql).not.toMatch(/'published'|'reviewed'/)
  })
})

describe('the seed batches for the SQL editor', () => {
  const seeds = readSeeds()
  const batches = buildBatches(seeds)

  it('hold every seed exactly once, top-ups after the skills, each under the size cap', () => {
    const inBatches = batches.flatMap((b) => [...b.sql.matchAll(/^-- Contains: (.*)$/gm)].flatMap((m) => m[1].split(', ')))
    expect(inBatches.sort()).toEqual(seeds.map((s) => s.name.replace(/\.sql$/, '')).sort())
    for (const b of batches) expect(Buffer.byteLength(b.sql)).toBeLessThanOrEqual(MAX_BYTES + 20_000)
    const order = orderSeeds(seeds).map((s) => s.sql.includes('-- TOP-UP:'))
    expect(order.indexOf(true) === -1 || !order.slice(order.indexOf(true)).includes(false)).toBe(true)
  })

  it('are up to date with seeds/coverage (run build-coverage-batches.ts)', () => {
    const onDisk = readdirSync(BATCHES).filter((f) => f.endsWith('.sql')).sort()
    expect(onDisk).toEqual(batches.map((b) => b.file))
    // Git may check files out with CRLF on Windows; compare line content only.
    const lf = (t: string) => t.replace(/
/g, '
')
    for (const b of batches) expect(lf(readFileSync(join(BATCHES, b.file), 'utf8'))).toBe(lf(b.sql))
  })
})

describe('every content file', async () => {
  const loaded = await loadSkills(join(__dirname))

  it('passes the automated checks', () => {
    const problems = loaded.flatMap(({ skill }) => skillIssues(skill))
    expect(problems).toEqual([])
  })

  it('renders every math span with KaTeX, read the way MathText reads it', () => {
    const MATH_RE = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g
    const problems: string[] = []
    for (const { skill } of loaded.filter((l) => l.skill.subject === 'math')) {
      const items = [...(skill.items ?? []), ...(skill.passages ?? []).flatMap((p) => p.items)]
      for (const it of items) {
        for (const text of [it.stem, it.solution, ...it.choices.map((c) => c.text)]) {
          for (const m of text.matchAll(MATH_RE)) {
            // $$ means two spans touched: MathText would show one display block.
            if (m[1] !== undefined) problems.push(`${skill.slug} slot ${it.slot}: two math spans touch: ${m[0]}`)
            else {
              try {
                katex.renderToString(m[2], { throwOnError: true })
              } catch (e) {
                problems.push(`${skill.slug} slot ${it.slot}: ${(e as Error).message}`)
              }
            }
          }
        }
      }
    }
    expect(problems).toEqual([])
  })

  it('uses a slug no other file uses', () => {
    const slugs = loaded.map(({ skill }) => skill.slug)
    expect(slugs.filter((s, i) => slugs.indexOf(s) !== i)).toEqual([])
  })

  it('lives in the folder for its subject and grade', () => {
    for (const { file, skill } of loaded) {
      expect(file).toBe(`content/${skill.subject}/grade-${skill.grade === 0 ? 'k' : skill.grade}/${skill.slug}.ts`)
      expect(itemCount(skill)).toBeGreaterThanOrEqual(requiredItems(skill))
    }
  })
})
