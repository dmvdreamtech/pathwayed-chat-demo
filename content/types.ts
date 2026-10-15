/**
 * Question source for the K-12 Reading and Writing coverage build.
 *
 * NEVER IMPORTED BY THE APP. These files hold every item with its correct
 * answer. Only scripts/build-coverage-seeds.ts and tests read them, and
 * src/lib/noQuestionBanksInBundle.test.ts fails if anything under content/
 * becomes reachable from src/main.tsx.
 *
 * One file per skill: content/<subject>/grade-<n>/<slug>.ts, default-exporting
 * a ContentSkill. Everything it produces loads as DRAFT; a reviewer publishes.
 * All passages and items are original, written for the grade.
 */

export type Subject = 'reading' | 'writing' | 'math'
export type Difficulty = 'easy' | 'medium' | 'hard'

export type ReadingGroup = 'Literature' | 'Informational text' | 'Vocabulary and word study'
export type WritingGroup = 'Conventions' | 'Sentence and paragraph' | 'Composition'

export interface ContentChoice {
  text: string
  is_correct: boolean
  /** Required on every wrong choice: the mistake it represents, kebab-case. */
  misconception_token?: string
}

export interface ContentItem {
  /** Stable key, unique within the skill. Never reuse a slot for a different item. */
  slot: number
  difficulty: Difficulty
  /** The question. Ends with a question mark or a colon. */
  stem: string
  /** Exactly four: one correct, three wrong, all different. */
  choices: ContentChoice[]
  /** Why the answer is right, and why the tempting wrong answer is not. */
  solution: string
}

export interface ContentPassage {
  /** Stable key, unique across all content, e.g. 'r8-theme-p01'. */
  code: string
  title?: string
  /** Original text written for the grade. Paragraphs separated by a blank line. */
  body: string
  items: ContentItem[]
}

export interface ContentSkill {
  /** e.g. 'read-g8-theme-summary'. Unique across the catalog. */
  slug: string
  subject: Subject
  /** 0 = Kindergarten. */
  grade: number
  group: ReadingGroup | WritingGroup | string
  /** Skill name shown to students and staff, e.g. 'Theme and Summary'. */
  name: string
  /** Common Core codes this skill covers, e.g. ['RL.8.2']. The first is stored as ccss_code. */
  standards: string[]
  /** Passage-based items (reading, and writing revision sets). */
  passages?: ContentPassage[]
  /** Standalone items (most writing and vocabulary items). */
  items?: ContentItem[]
  /**
   * Slug of an existing LIVE skill this file adds questions to (a top-up),
   * e.g. 'punctuation-basics'. The seed then attaches its drafts to that skill
   * and never creates or edits a skill row. A top-up needs TOPUP_ITEMS items.
   */
  extends?: string
}
