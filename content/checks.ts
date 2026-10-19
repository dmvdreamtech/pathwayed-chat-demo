import { pictureIssues, tileLabel } from '../src/lib/pictureModel'
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
/** A top-up adds to a live skill that already has 20 questions, bringing it to 40. */
export const TOPUP_ITEMS = 20
export const requiredItems = (skill: ContentSkill) => skill.topUpItems ?? (skill.extends ? TOPUP_ITEMS : TARGET_ITEMS)

/** Passage length (words) and longest allowed average sentence (words), by grade. */
export function passageLimits(grade: number): { min: number; max: number; avgSentence: number } {
  if (grade <= 2) return { min: 30, max: 160, avgSentence: 12 }
  if (grade <= 5) return { min: 90, max: 320, avgSentence: 18 }
  if (grade <= 8) return { min: 140, max: 420, avgSentence: 23 }
  return { min: 180, max: 500, avgSentence: 28 }
}

const DASHES = /[‒–—―−]|\s-\s|--/
const TOKEN = /^[a-z][a-z0-9-]*$/
const BY_POSITION = {
  test: (s: string) =>
    /\b(?:first|second|third|fourth|last|final) (?:choice|option|answer)s?\b/i.test(s) ||
    /\b(?:[Cc]hoice|[Oo]ption|[Aa]nswer) [A-D]\b/.test(s) ||
    // A capital letter in parentheses, not math like f(x) or 4(2)(c).
    /(?<![A-Za-z0-9)$\\])\([A-D]\)/.test(s),
}
const SLUG = /^(read|write|math)-g(k|[0-9]|1[0-2])-[a-z0-9-]+$/

// Math skills write expressions as $...$ (rendered by MathText), where a spaced
// minus sign is normal; the dash rule applies only to the prose around them.
const MATH_SPAN = /\$[^$]*\$/g
// '\frac' or '\times' written with one backslash in a TypeScript string becomes
// a form feed or a tab, and KaTeX then shows garbage.
const CONTROL = { test: (s: string) => [...s].some((ch) => ch.charCodeAt(0) < 0x20 && ch !== '\n' && ch !== '\r') }
// '\square' or '\sqrt' with one backslash loses it silently ('\s' is just 's'),
// so a bare command name inside $...$ means the backslash was dropped.
const BARE_COMMAND = /(?<![\\A-Za-z])(?:square|sqrt|frac|dfrac|times|div|cdot|circ|text|left|right|approx|infty|angle|triangle|overline)(?![A-Za-z])/
const bareCommand = (text: string) => (text.match(MATH_SPAN) ?? []).some((span) => BARE_COMMAND.test(span))
const prose = (text: string, math: boolean) => (math ? text.replace(MATH_SPAN, ' ') : text)

export const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length
export const sentences = (s: string) => s.split(/[.!?]+(?:["')\]]*)\s+|[.!?]+["')\]]*$/).map((x) => x.trim()).filter(Boolean)

function itemIssues(where: string, item: ContentItem, math = false): string[] {
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
  // The seed shuffles the choices, so "the first choice" or "choice B" would point at the wrong one.
  if (BY_POSITION.test(item.solution)) out.push(`${at}: solution names a choice by its position (quote the choice instead)`)
  for (const [label, text] of [['stem', item.stem], ['solution', item.solution], ...item.choices.map((c) => ['choice', c.text])]) {
    if (DASHES.test(prose(text, math))) out.push(`${at}: ${label} has a dash (em dash, en dash, or spaced hyphen)`)
    if (math && CONTROL.test(text)) out.push(`${at}: ${label} has a control character (a single backslash, like '\\frac', in the source?)`)
    if (math && bareCommand(text)) out.push(`${at}: ${label} has a LaTeX command with no backslash inside $...$ (a single backslash in the source?)`)
    if (math && (text.match(/\$/g) ?? []).length % 2) out.push(`${at}: ${label} has an unpaired $ (math goes in $...$; write money as dollars)`)
  }
  if (!['easy', 'medium', 'hard'].includes(item.difficulty)) out.push(`${at}: difficulty must be easy, medium or hard`)
  return out
}

// The seed shuffles picture tiles too, so a spoken stem cannot point at a place on the screen.
const BY_PLACE = /\b(?:left|right|top|bottom|first|second|third|fourth|last|middle) (?:one|tile|picture|box|answer|choice)\b/i
const spokenWords = (s: string) => s.split(/\s+/).filter(Boolean).length

/**
 * A K-2 picture item: the stem is SPOKEN, each choice is a tile the child taps.
 * 2 to 4 tiles, exactly one right, each a picture the app can draw, and no
 * misconception tokens (a wrong tap gets the warm spoken solution, never a hint).
 */
function pictureItemIssues(where: string, item: ContentItem): string[] {
  const out: string[] = []
  const at = `${where} slot ${item.slot}`
  if (!Number.isInteger(item.slot) || item.slot < 1) out.push(`${at}: slot must be a positive whole number`)
  const stem = item.stem.trim()
  if (!stem) out.push(`${at}: the spoken stem is empty`)
  if (!/[.?!]["')]*$/.test(stem)) out.push(`${at}: the spoken stem must end with a full stop, question mark or exclamation mark`)
  if (spokenWords(stem) > 90) out.push(`${at}: the spoken stem is ${spokenWords(stem)} words, keep it to 90`)
  if (item.choices.length < 2 || item.choices.length > 4) out.push(`${at}: needs 2 to 4 tiles, has ${item.choices.length}`)
  const correct = item.choices.filter((c) => c.is_correct)
  if (correct.length !== 1) out.push(`${at}: needs exactly one correct tile, has ${correct.length}`)
  const texts = item.choices.map((c) => c.text.trim())
  if (new Set(texts).size !== texts.length) out.push(`${at}: two tiles have the same spoken label`)
  if (texts.some((t) => !t)) out.push(`${at}: a tile has no spoken label`)
  const tiles = item.choices.map((c) => JSON.stringify(c.tile ?? null))
  if (new Set(tiles).size !== tiles.length) out.push(`${at}: two tiles show the same picture`)
  for (const c of item.choices) {
    if (!c.tile) {
      out.push(`${at}: tile "${c.text}" has no picture`)
      continue
    }
    for (const p of pictureIssues(c.tile, 'tile')) out.push(`${at}: tile "${c.text}": ${p}`)
    const label = tileLabel(c.tile)
    if (label !== undefined && label !== c.text) out.push(`${at}: tile "${c.text}" shows "${label}", so its spoken label must be "${label}"`)
    if (c.misconception_token) out.push(`${at}: picture items carry no misconception_token (tile "${c.text}")`)
  }
  if (item.prompt) for (const p of pictureIssues(item.prompt, 'prompt')) out.push(`${at}: ${p}`)
  const sol = item.solution.trim()
  if (sol.length < 10) out.push(`${at}: the spoken solution is missing or too short`)
  if (spokenWords(sol) > 40) out.push(`${at}: the spoken solution is ${spokenWords(sol)} words, keep it to 40`)
  const spoken: [string, string][] = [['stem', stem], ['solution', sol], ...item.choices.map((c) => ['tile', c.text] as [string, string])]
  for (const [label, text] of spoken) {
    if (DASHES.test(text)) out.push(`${at}: ${label} has a dash (em dash, en dash, or spaced hyphen)`)
    if (text.includes('$')) out.push(`${at}: ${label} has a $ (spoken text has no math markup; say "plus", "dollars")`)
  }
  for (const [label, text] of [['stem', stem], ['solution', sol]]) {
    if (BY_PLACE.test(text) || BY_POSITION.test(text)) out.push(`${at}: ${label} points at a tile by its place (tiles are shuffled)`)
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
  const math = skill.subject === 'math'
  const picture = skill.renderMode === 'audio_picture'
  if (skill.renderMode !== undefined && !picture) out.push(`${where}: renderMode must be 'audio_picture' or left out`)
  if (picture && skill.grade > 2) out.push(`${where}: picture skills are for grades K to 2`)
  if (picture && skill.passages?.length) out.push(`${where}: picture skills have no passages (the story goes in the spoken stem)`)
  if (skill.topUpItems !== undefined && (!skill.extends || !Number.isInteger(skill.topUpItems) || skill.topUpItems < 1)) {
    out.push(`${where}: topUpItems is a positive whole number, on a top-up (extends) only`)
  }
  for (const item of skill.items ?? []) out.push(...(picture ? pictureItemIssues(where, item) : itemIssues(where, item, math)))

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
    if (DASHES.test(prose(p.body, math)) || (p.title && DASHES.test(p.title))) out.push(`${pw}: has a dash (em dash, en dash, or spaced hyphen)`)
    if (!p.items.length) out.push(`${pw}: a passage needs at least one question`)
    for (const item of p.items) out.push(...itemIssues(pw, item, math))
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
  if (items.length < requiredItems(skill)) {
    out.push(`${where}: ${items.length} items, a ${skill.extends ? 'top-up' : 'skill'} needs at least ${requiredItems(skill)}`)
  }
  if (skill.extends !== undefined && !/^[a-z0-9-]+$/.test(skill.extends)) out.push(`${where}: extends must be a live skill slug`)
  return out
}

export const itemCount = (skill: ContentSkill) =>
  (skill.items?.length ?? 0) + (skill.passages ?? []).reduce((n, p) => n + p.items.length, 0)
