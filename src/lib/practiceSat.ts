import { fetchPracticeQuestions, type PracticeQuestion } from '@/lib/questions'
import { gradeBand } from '@/lib/gradeBand'
import type { Student } from '@/lib/students'

/**
 * Practice SAT — Phase 3 (HIGH SCHOOL ONLY): Reading & Writing + Math.
 *
 * A shortened, deferred-scored practice test assembled entirely from our own
 * authored bank (published `generated_questions`) via the SAME serve path normal
 * practice uses — never real-SAT text. It runs a short Reading & Writing section
 * (passage-backed evidence-based reading + Standard-English-Conventions writing)
 * then the Math section, SAT-shaped at small scale. Scoring is raw correct/total
 * per section + overall — NO scaled 400–1600 score, because the R&W bank only
 * covers two of the four SAT R&W domains (see the counts below). Read-only apart
 * from writing missed skills into the focus mechanism (Phase 2).
 */

// The three HS math skills the Math section draws from (all SAT-aligned, 20
// published items each → 60 available).
export const SAT_MATH_SKILLS = ['algebra-2', 'advanced-functions', 'hs-geometry'] as const

// Reading & Writing skills (grade 9+, published, SAT-aligned):
//   reading  — evidence-based-reading (grade 9, passage-backed): 20 available
//   writing  — advanced-punctuation (grade 9, Standard English Conventions): 20
//              available. INTERIM: the only grade 9+ conventions skill with
//              published questions. Possessives (grade 5), modifier placement
//              (grade 7) and sentence boundaries (grade 6) were dropped as below
//              SAT level. The official Boundaries and Form, Structure, and Sense
//              skills replace this once they are published.
export const SAT_READING_SKILLS = ['evidence-based-reading'] as const
export const SAT_WRITING_SKILLS = ['advanced-punctuation'] as const

// SAT domain codes (the `sat_alignment` value) that belong to Reading & Writing;
// anything else (algebra, advanced-math, geometry-trigonometry, …) is Math. Used
// to tag each served question's section for the per-section score.
const RW_DOMAINS = new Set([
  'information-and-ideas',
  'craft-and-structure',
  'expression-of-ideas',
  'standard-english-conventions',
])

export type SatSection = 'rw' | 'math'

/** Which section a served question belongs to, by its SAT domain code. */
export function sectionOf(q: PracticeQuestion): SatSection {
  return q.sat_alignment && RW_DOMAINS.has(q.sat_alignment) ? 'rw' : 'math'
}

/** Target length of the practice Math section (bank supports 60). */
export const PRACTICE_SAT_MATH_LENGTH = 12

/** Target length of the R&W section: 4 reading + 4 conventions (bank: 20 + 20). */
export const PRACTICE_SAT_RW_LENGTH = 8
const PRACTICE_SAT_RW_READING = 4
const PRACTICE_SAT_RW_WRITING = 4

/**
 * Gate: only grades 9–12 AND families who've consented to SAT / above-grade
 * framing (`above_grade_ok`) may see or take the Practice SAT. Anyone failing
 * either check is hidden from the entry and redirected away from the route.
 */
export function canTakePracticeSat(student: Pick<Student, 'grade' | 'above_grade_ok'>): boolean {
  return gradeBand(student.grade) === '9-12' && student.above_grade_ok === true
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Interleave per-skill groups round-robin so the section is balanced across skills. */
function roundRobin<T>(groups: T[][]): T[] {
  const out: T[] = []
  const max = Math.max(0, ...groups.map((g) => g.length))
  for (let i = 0; i < max; i++) {
    for (const g of groups) if (i < g.length) out.push(g[i])
  }
  return out
}

/**
 * Assemble the practice Math section: pull published items from each HS math
 * skill (each already shuffled by the serve path), balance across skills, then
 * shuffle the final order and trim to `length`. Best-effort — returns whatever
 * the bank can supply (possibly fewer than `length`, or [] if nothing is ready).
 */
export async function assembleMathSection(length = PRACTICE_SAT_MATH_LENGTH): Promise<PracticeQuestion[]> {
  const perSkill = await Promise.all(SAT_MATH_SKILLS.map((slug) => fetchPracticeQuestions(slug, length)))
  const balanced = roundRobin(perSkill).slice(0, length)
  return shuffle(balanced)
}

/**
 * Assemble the Reading & Writing section: a few passage-backed evidence-based
 * reading items followed by Standard-English-Conventions writing items balanced
 * across the four conventions skills. Reading leads (each item carries its own
 * passage, rendered by the page); writing follows. If one strand is short we top
 * up from the other so the section still reaches its target where the bank allows.
 * Best-effort — returns whatever the bank can supply.
 */
export async function assembleReadingWritingSection(): Promise<PracticeQuestion[]> {
  const [readingGroups, writingGroups] = await Promise.all([
    Promise.all(SAT_READING_SKILLS.map((slug) => fetchPracticeQuestions(slug, PRACTICE_SAT_RW_LENGTH))),
    Promise.all(SAT_WRITING_SKILLS.map((slug) => fetchPracticeQuestions(slug, PRACTICE_SAT_RW_LENGTH))),
  ])
  const readingPool = shuffle(roundRobin(readingGroups))
  const writingPool = shuffle(roundRobin(writingGroups))

  const reading = readingPool.slice(0, PRACTICE_SAT_RW_READING)
  const writing = writingPool.slice(0, PRACTICE_SAT_RW_WRITING)

  // Top up toward the target from whichever strand still has items, so a thin
  // day on one strand doesn't shrink the whole section below what the bank holds.
  const filler = [...readingPool.slice(reading.length), ...writingPool.slice(writing.length)]
  const need = PRACTICE_SAT_RW_LENGTH - (reading.length + writing.length)

  // Reading first (passages read best up front), then conventions, then any filler.
  return [...reading, ...writing, ...filler.slice(0, Math.max(0, need))]
}
