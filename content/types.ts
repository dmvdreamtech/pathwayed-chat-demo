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

import type { PicturePrompt, PictureTile } from '../src/lib/pictureModel'

export type { PicturePrompt, PictureTile }

export type Subject = 'reading' | 'writing' | 'math'
export type Difficulty = 'easy' | 'medium' | 'hard'

export type ReadingGroup = 'Literature' | 'Informational text' | 'Vocabulary and word study'
export type WritingGroup = 'Conventions' | 'Sentence and paragraph' | 'Composition'

export interface ContentChoice {
  /** The answer as spoken and scored. On a picture tile, its spoken label ("3", "cat", "the"). */
  text: string
  is_correct: boolean
  /**
   * Required on every wrong choice of a TEXT item: the mistake it represents, kebab-case.
   * Never on a picture item: a K-2 wrong tap gets warm spoken feedback, not a hint.
   */
  misconception_token?: string
  /** Picture items only: what the child sees and taps (src/lib/pictureModel.ts). */
  tile?: PictureTile
}

export interface ContentItem {
  /** Stable key, unique within the skill. Never reuse a slot for a different item. */
  slot: number
  difficulty: Difficulty
  /** The question. Ends with a question mark or a colon. */
  stem: string
  /** Exactly four: one correct, three wrong, all different. */
  choices: ContentChoice[]
  /**
   * Why the answer is right, and why the tempting wrong answer is not. On a
   * picture item this is SPOKEN after a tap: short and warm ("Let's count
   * together: one, two, three. Three apples!").
   */
  solution: string
  /** Picture items only: the picture shown above the tiles, or null for audio only. */
  prompt?: PicturePrompt | null
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
  /**
   * Common Core codes this skill covers, e.g. ['RL.8.2']. The first is stored as
   * ccss_code; all are tagged in skill_standard_codes under framework 'ccss'.
   */
  standards: string[]
  /** Maryland 2025 math codes, e.g. ['1.GR.C.6'], once known. Tagged under 'md-2025'. */
  md2025?: string[]
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
  /**
   * 'audio_picture' for K-2 picture-tap skills: each stem is SPOKEN (never read
   * by the child), each choice is a tile, 2 to 4 tiles, no passages and no
   * misconception tokens. Omit for text skills.
   */
  renderMode?: 'audio_picture'
  /** A top-up of a live skill that already has some questions: how many this adds to reach 40. */
  topUpItems?: number
}
