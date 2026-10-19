import { supabase } from '@/lib/supabase'
import type { Json } from '@/lib/database.types'
import { parsePicturePrompt, parsePictureTile, type PicturePrompt, type PictureTile } from '@/lib/pictureModel'

/**
 * /admin/review: skill-level review before publishing (migration 0043).
 *
 * A named reviewer opens a skill and the database draws 5 drafts at random.
 * All 5 clean publishes the skill's passing drafts; any flag sends the whole
 * skill to full review, one question at a time. Fixes to live questions (0042)
 * are approved or rejected one at a time. Every function refuses anyone but a
 * platform admin, so this page only renders what the database allows.
 */

export interface QueueRow {
  skillId: string
  slug: string
  name: string
  subject: string
  grade: number | null
  drafts: number
  draftsFailing: number
  state: 'none' | 'open' | 'approved' | 'full_review'
  openReviewId: string | null
  lastReviewer: string | null
  lastDecidedAt: string | null
}

export interface Choice {
  text: string
  correct: boolean
  misconception: string | null
  /** K-2 picture items: the tile the child taps. */
  tile?: PictureTile
}

export interface ReviewItem {
  id: string
  stem: string
  choices: Choice[]
  correctAnswer: string
  solution: string
  difficulty: string
  /** 'audio_picture' for K-2 picture-tap items (spoken stem, tiles). */
  renderMode: string
  prompt: PicturePrompt | null
  passageTitle: string | null
  passageBody: string | null
  issues: string[]
  lastFlag: string | null
}

export interface FixRow {
  draftId: string
  originalId: string
  slug: string
  reasons: string[]
  changes: string | null
  original: { stem: string; choices: Choice[]; solution: string }
  draft: { stem: string; choices: Choice[]; solution: string }
  draftIssues: string[]
}

export type Load<T> = { ok: true; data: T } | { ok: false; reason: 'not_admin' | 'failed'; message?: string }

/** Pure: the jsonb choices array as the page shows it. Tiles show their label. */
export function parseChoices(raw: Json | null | undefined): Choice[] {
  if (!Array.isArray(raw)) return []
  return raw.map((c) => {
    const o = (c ?? {}) as Record<string, Json>
    const tile = (o.tile ?? null) as Record<string, Json> | null
    const text = typeof o.text === 'string' && o.text !== '' ? o.text : typeof tile?.label === 'string' ? tile.label : ''
    const picture = parsePictureTile(o.tile)
    return {
      text,
      correct: o.is_correct === true,
      misconception: typeof o.misconception_token === 'string' ? o.misconception_token : null,
      ...(picture ? { tile: picture } : {}),
    }
  })
}

/** Pure: the flags object finish_skill_review takes, keeping only real notes. */
export function buildFlags(notes: Record<string, string>, flagged: Record<string, boolean>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [id, on] of Object.entries(flagged)) {
    if (!on) continue
    out[id] = (notes[id] ?? '').trim()
  }
  return out
}

/** Pure: why the Finish button is disabled, or null when it can be pressed. */
export function finishBlocker(ids: string[], flagged: Record<string, boolean>, notes: Record<string, string>, read: Record<string, boolean>): string | null {
  const unread = ids.filter((id) => !read[id] && !flagged[id]).length
  if (unread > 0) return `Mark ${unread} more ${unread === 1 ? 'question' : 'questions'} clean or flagged.`
  const empty = ids.filter((id) => flagged[id] && (notes[id] ?? '').trim() === '').length
  if (empty > 0) return `Write what is wrong for ${empty} flagged ${empty === 1 ? 'question' : 'questions'}.`
  return null
}

/** Pure: the reviewer's plain-words state for a queue row. */
export function queueStatus(r: QueueRow): string {
  if (r.state === 'open') return 'Sample open'
  if (r.state === 'full_review') return r.drafts + r.draftsFailing > 0 ? 'Full review' : 'Full review done'
  if (r.drafts < 5) return r.drafts === 0 ? 'Nothing passing to review' : `${r.drafts} passing, needs 5`
  if (r.state === 'approved') return 'New drafts since approval'
  return 'Ready to sample'
}

function fail<T>(error: { code?: string; message?: string }, what: string): Load<T> {
  const notAdmin = error.code === '42501' || /platform_admin_required|permission denied/i.test(error.message ?? '')
  if (!notAdmin) console.error(`${what} failed`, error)
  return { ok: false, reason: notAdmin ? 'not_admin' : 'failed', message: error.message }
}

export async function loadQueue(): Promise<Load<QueueRow[]>> {
  const { data, error } = await supabase.rpc('review_queue')
  if (error) return fail(error, 'review_queue')
  return {
    ok: true,
    data: (data ?? []).map((r) => ({
      skillId: r.skill_id,
      slug: r.slug,
      name: r.name,
      subject: r.subject,
      grade: r.grade,
      drafts: r.drafts,
      draftsFailing: r.drafts_failing,
      state: r.state as QueueRow['state'],
      openReviewId: r.open_review_id,
      lastReviewer: r.last_reviewer,
      lastDecidedAt: r.last_decided_at,
    })),
  }
}

export async function startReview(skillId: string, reviewer: string): Promise<Load<string>> {
  const { data, error } = await supabase.rpc('start_skill_review', { p_skill_id: skillId, p_reviewer: reviewer })
  if (error) return fail(error, 'start_skill_review')
  return { ok: true, data: data as string }
}

export async function loadSample(reviewId: string): Promise<Load<ReviewItem[]>> {
  const { data, error } = await supabase.rpc('skill_review_items', { p_review_id: reviewId })
  if (error) return fail(error, 'skill_review_items')
  return {
    ok: true,
    data: (data ?? []).map((r) => ({
      id: r.id,
      stem: r.stem,
      choices: parseChoices(r.choices),
      correctAnswer: r.correct_answer,
      solution: r.solution,
      difficulty: r.difficulty,
      renderMode: r.render_mode ?? 'text',
      prompt: parsePicturePrompt(r.prompt),
      passageTitle: r.passage_title,
      passageBody: r.passage_body,
      issues: [],
      lastFlag: null,
    })),
  }
}

export async function finishReview(reviewId: string, flags: Record<string, string>): Promise<Load<{ status: string; published: number; flagged: number }>> {
  const { data, error } = await supabase.rpc('finish_skill_review', { p_review_id: reviewId, p_flags: flags })
  if (error) return fail(error, 'finish_skill_review')
  const row = (data ?? [])[0]
  return { ok: true, data: row ?? { status: 'unknown', published: 0, flagged: 0 } }
}

export async function loadFullReview(skillId: string): Promise<Load<ReviewItem[]>> {
  const { data, error } = await supabase.rpc('full_review_items', { p_skill_id: skillId })
  if (error) return fail(error, 'full_review_items')
  return {
    ok: true,
    data: (data ?? []).map((r) => ({
      id: r.id,
      stem: r.stem,
      choices: parseChoices(r.choices),
      correctAnswer: r.correct_answer,
      solution: r.solution,
      difficulty: r.difficulty,
      renderMode: r.render_mode ?? 'text',
      prompt: parsePicturePrompt(r.prompt),
      passageTitle: r.passage_title,
      passageBody: r.passage_body,
      issues: r.issues ?? [],
      lastFlag: r.last_flag,
    })),
  }
}

export async function reviewQuestion(id: string, reviewer: string, approve: boolean, note: string): Promise<Load<string>> {
  const { data, error } = await supabase.rpc('review_question', {
    p_question_id: id,
    p_reviewer: reviewer,
    p_approve: approve,
    p_note: note.trim() || null,
  })
  if (error) return fail(error, 'review_question')
  return { ok: true, data: data as string }
}

export async function loadFixes(): Promise<Load<FixRow[]>> {
  const { data, error } = await supabase.rpc('fix_draft_queue')
  if (error) return fail(error, 'fix_draft_queue')
  return {
    ok: true,
    data: (data ?? []).map((r) => ({
      draftId: r.draft_id,
      originalId: r.original_id,
      slug: r.skill_slug,
      reasons: r.reasons,
      changes: r.changes,
      original: { stem: r.original_stem, choices: parseChoices(r.original_choices), solution: r.original_solution },
      draft: { stem: r.draft_stem, choices: parseChoices(r.draft_choices), solution: r.draft_solution },
      draftIssues: r.draft_issues ?? [],
    })),
  }
}

export async function decideFix(draftId: string, reviewer: string, approve: boolean, note: string): Promise<Load<string>> {
  const { data, error } = await supabase.rpc('decide_fix_draft', {
    p_draft_id: draftId,
    p_reviewer: reviewer,
    p_approve: approve,
    p_note: note.trim() || null,
  })
  if (error) return fail(error, 'decide_fix_draft')
  return { ok: true, data: data as string }
}
