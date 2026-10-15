import { describe, it, expect } from 'vitest'
import { join } from 'node:path'
import { TARGET_ITEMS, itemCount, passageLimits, skillIssues } from './checks'
import { loadSkills } from './load'
import { orderedChoices, skillSeed } from '../scripts/build-coverage-seeds'
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

describe('every content file', async () => {
  const loaded = await loadSkills(join(__dirname))

  it('passes the automated checks', () => {
    const problems = loaded.flatMap(({ skill }) => skillIssues(skill))
    expect(problems).toEqual([])
  })

  it('uses a slug no other file uses', () => {
    const slugs = loaded.map(({ skill }) => skill.slug)
    expect(slugs.filter((s, i) => slugs.indexOf(s) !== i)).toEqual([])
  })

  it('lives in the folder for its subject and grade', () => {
    for (const { file, skill } of loaded) {
      expect(file).toBe(`content/${skill.subject}/grade-${skill.grade === 0 ? 'k' : skill.grade}/${skill.slug}.ts`)
      expect(itemCount(skill)).toBeGreaterThanOrEqual(TARGET_ITEMS)
    }
  })
})
