import type { ContentItem, ContentSkill } from './types'

/**
 * Automated checks every coverage item must pass before it can be seeded.
 * The seed builder refuses a skill with any issue, and content.test.ts runs
 * the same checks over every file, so nothing unchecked reaches a seed.
 *
 * These are mechanical checks. They do not replace review: a reviewer still
 * reads every item before it is published.
 */

export const TARGET_ITEMS = 40

/** Passage length (words) and longest allowed average sentence (words), by grade. */
export function passageLimits(grade: number): { min: number; max: number; avgSentence: number } {
  if (grade <= 2) return { min: 30, max: 160, avgSentence: 12 }
  if (grade <= 5) return { min: 90, max: 320, avgSentence: 18 }
  if (grade <= 8) return { min: 140, max: 420, avgSentence: 23 }
  return { min: 180, max: 500, avgSentence: 28 }
}

const DASHES = /[‒–—―−]|\s-\s|--/
const TOKEN = /^[a-z][a-z0-9-]*$/
const SLUG = /^(read|write|math)-g(k|[0-9]|1[0-2])-[a-z0-9-]+$/

export const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length
export const sentences = (s: string) => s.split(/[.!?]+(?:["')\]]*)\s+|[.!?]+["')\]]*$/).map((x) => x.trim()).filter(Boolean)

function itemIssues(where: string, item: ContentItem): string[] {
  const out: string[] = []
  const at = `${where} slot ${item.slot}`
  if (!Number.isInteger(item.slot) || item.slot < 1) out.push(`${at}: slot must be a positive whole number`)
  if (!/[?:]\s*$/.test(item.stem.trim())) out.push(`${at}: stem must end with a question mark or a colon`)
  if (item.choices.length !== 4) out.push(`${at}: needs exactly 4 choices, has ${item.choices.length}`)
  const correct = item.choices.filter((c) => c.is_correct)
  if (correct.length !== 1) out.push(`${at}: needs exactly one correct choice, has ${correct.length}`)
  // Exact text: capitalization items legitimately differ only in capital letters.
  const texts = item.choices.map((c) => c.text.trim())
  if (new Set(texts).size !== texts.length) out.push(`${at}: two choices are the same`)
  if (texts.some((t) => !t)) out.push(`${at}: a choice is empty`)
  for (const c of item.choices) {
    if (!c.is_correct && !(c.misconception_token && TOKEN.test(c.misconception_token))) {
      out.push(`${at}: wrong choice "${c.text}" needs a kebab-case misconception_token`)
    }
    if (c.is_correct && c.misconception_token) out.push(`${at}: the correct choice must not carry a misconception_token`)
  }
  if (item.solution.trim().length < 20) out.push(`${at}: solution is missing or too short`)
  for (const [label, text] of [['stem', item.stem], ['solution', item.solution], ...item.choices.map((c) => ['choice', c.text])]) {
    if (DASHES.test(text)) out.push(`${at}: ${label} has a dash (em dash, en dash, or spaced hyphen)`)
  }
  if (!['easy', 'medium', 'hard'].includes(item.difficulty)) out.push(`${at}: difficulty must be easy, medium or hard`)
  return out
}

/** Every problem with one skill, in plain words. Empty when it can be seeded. */
export function skillIssues(skill: ContentSkill): string[] {
  const out: string[] = []
  const where = skill.slug
  if (!SLUG.test(skill.slug)) out.push(`${where}: slug must look like read-g8-theme-summary`)
  const prefix = { reading: 'read', writing: 'write', math: 'math' }[skill.subject]
  if (!skill.slug.startsWith(`${prefix}-g${skill.grade === 0 ? 'k' : skill.grade}-`)) {
    out.push(`${where}: slug must start with ${prefix}-g${skill.grade === 0 ? 'k' : skill.grade}-`)
  }
  if (!Number.isInteger(skill.grade) || skill.grade < 0 || skill.grade > 12) out.push(`${where}: grade must be 0 to 12`)
  if (!skill.name.trim() || DASHES.test(skill.name)) out.push(`${where}: name is missing or has a dash`)
  if (!skill.standards.length) out.push(`${where}: list at least one standard`)

  const items: ContentItem[] = [...(skill.items ?? []), ...(skill.passages ?? []).flatMap((p) => p.items)]
  for (const item of skill.items ?? []) out.push(...itemIssues(where, item))

  const limits = passageLimits(skill.grade)
  const codes = new Set<string>()
  for (const p of skill.passages ?? []) {
    const pw = `${where} passage ${p.code}`
    if (codes.has(p.code)) out.push(`${pw}: passage code used twice`)
    codes.add(p.code)
    if (!/^[a-z0-9-]+$/.test(p.code)) out.push(`${pw}: code must be lowercase letters, digits and hyphens`)
    const n = words(p.body)
    if (n < limits.min || n > limits.max) out.push(`${pw}: ${n} words, grade ${skill.grade} passages are ${limits.min} to ${limits.max}`)
    const sents = sentences(p.body)
    const avg = sents.length ? n / sents.length : n
    if (avg > limits.avgSentence) {
      out.push(`${pw}: sentences average ${avg.toFixed(1)} words, grade ${skill.grade} limit is ${limits.avgSentence}`)
    }
    if (DASHES.test(p.body) || (p.title && DASHES.test(p.title))) out.push(`${pw}: has a dash (em dash, en dash, or spaced hyphen)`)
    if (!p.items.length) out.push(`${pw}: a passage needs at least one question`)
    for (const item of p.items) out.push(...itemIssues(pw, item))
  }

  const slots = items.map((i) => i.slot)
  const dupSlots = slots.filter((s, i) => slots.indexOf(s) !== i)
  if (dupSlots.length) out.push(`${where}: slot(s) used twice: ${[...new Set(dupSlots)].join(', ')}`)
  const stems = items.map((i) => i.stem.trim().toLowerCase())
  const passageStems = new Set((skill.passages ?? []).flatMap((p) => p.items.map((i) => i.stem.trim().toLowerCase())))
  // Passage questions may share a stem ("What is the main idea?") across passages;
  // standalone items may not repeat.
  const standalone = stems.filter((s) => !passageStems.has(s))
  const dupStems = standalone.filter((s, i) => standalone.indexOf(s) !== i)
  if (dupStems.length) out.push(`${where}: the same question appears twice: "${dupStems[0]}"`)
  if (items.length < TARGET_ITEMS) out.push(`${where}: ${items.length} items, a skill needs at least ${TARGET_ITEMS}`)
  return out
}

export const itemCount = (skill: ContentSkill) =>
  (skill.items?.length ?? 0) + (skill.passages ?? []).reduce((n, p) => n + p.items.length, 0)
