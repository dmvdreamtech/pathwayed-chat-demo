import { supabase } from '@/lib/supabase'
import { resolveSkillIdsBySlug } from '@/lib/skills'
import { getActiveFocusSkillIds } from '@/lib/focusSkills'
import { gradeBand } from '@/lib/gradeBand'
import { focusAreasByGrade } from '@/lib/focusAreas'
import { scopeSequence, type ScopeBand, type ScopeSubject } from '@/lib/scopeSequence'
import { isRecheckDue } from '@/lib/mastery'
import { canPromoteToNextBand, type LadderStudent } from '@/lib/gradeLadder'
import { listPracticeableSkills, fetchSkillEvidence, fetchPracticeableSlugs } from '@/lib/questions'
import { isCompositionSkill } from '@/lib/writingComposition'

/**
 * Learning path — picks the day's lesson by walking the approved per-subject
 * scope & sequence, using stored mastery to set the pace: skip skills already
 * known, loop on the first not-yet-known one. Mastery is truth, so a ready kid
 * moves ahead and is never held to grade pace.
 */

export const SCOPE_SUBJECTS: ScopeSubject[] = ['math', 'reading', 'writing']

/** The three subjects that have a real skills-building track. */
export function isScopeSubject(subject: string): subject is ScopeSubject {
  return subject === 'math' || subject === 'reading' || subject === 'writing'
}

/** Grade → the band that has a track. Every band now has one (k-2 = counting +
 *  phonics), so this is non-null in practice; the null guard is a safety net. */
export function scopeBandForGrade(grade?: string): ScopeBand | null {
  const b = gradeBand(grade)
  return b === 'k-2' || b === '3-5' || b === '6-8' || b === '9-12' ? b : null
}

/** Subjects that actually have a track for this band (non-empty sequence). K has
 *  math (counting) + reading (letter-sounds) but no writing yet. */
export function scopeSubjectsForBand(band: ScopeBand): ScopeSubject[] {
  return SCOPE_SUBJECTS.filter((s) => scopeSequence[band][s].length > 0)
}

/** Display labels for the K-2 pre-reader skills (focusAreas.ts covers 3-12 only). */
const K2_SKILL_LABELS: Record<string, string> = {
  counting: 'Counting',
  'letter-sounds': 'Letter Sounds',
}

export interface Lesson {
  slug: string
  label: string
  subject: ScopeSubject
  band: ScopeBand
  /** True when every skill in this subject's track is already mastered. */
  trackComplete: boolean
  /** True when this lesson was surfaced from the student's focus list (a skill
   *  missed on the practice SAT), ahead of the normal sequence walk. */
  fromFocus: boolean
  /** True when surfaced as a spaced re-check: the mastered accuracy/count bar was
   *  met and the ≥3-day re-check is now due, so the durable claim can be confirmed. */
  fromRecheck?: boolean
  /** True when this lesson comes from the band ABOVE the student's own: they
   *  finished their band's track and earned the crossing. */
  fromPromotion?: boolean
}

/** Display label for a slug, from focusAreas (the source of truth for names).
 *  K-2 slugs aren't in focusAreas, so they use the K-2 label map. */
export function skillLabel(band: ScopeBand, subject: ScopeSubject, slug: string): string {
  if (band === 'k-2') return K2_SKILL_LABELS[slug] ?? slug
  return focusAreasByGrade[band][subject].find((f) => f.value === slug)?.label ?? slug
}

/**
 * The next lesson for a subject. Focus skills come FIRST: if the student missed
 * any of this subject's skills on the practice SAT (active student_focus_skills),
 * we serve the earliest such skill in sequence order — ahead of the normal walk
 * and regardless of its mastery (a missed skill may already be ≥60). This is
 * non-destructive: mastery is never lowered to force it.
 *
 * Otherwise the normal walk: skip mastered skills, return the first not-yet-
 * mastered one (the student loops on it until mastered). If the whole track is
 * mastered, returns the last skill with trackComplete=true (kept for review).
 * Returns null only when the grade has no track (k-2).
 */
/**
 * The track without slugs that cannot be taught to mastery: a skill counts as
 * known only on graded evidence, and evidence needs published questions, so a
 * slug with no skill row or no published set would hold the walk on itself
 * forever. Writing-studio skills (COMPOSITION_SKILLS) are Nikki-coached with no
 * question bank by design and stay in. If the read fails, the track is used
 * as written (Practice's Nikki fallback still covers any gap).
 */
export async function teachableSequence(seq: string[]): Promise<string[]> {
  const practiceable = await fetchPracticeableSlugs(seq.filter((s) => !isCompositionSkill(s)))
  if (!practiceable) return seq
  return seq.filter((s) => isCompositionSkill(s) || practiceable.has(s))
}

export async function nextLesson(
  studentId: string,
  student: LadderStudent,
  subject: ScopeSubject,
): Promise<Lesson | null> {
  const band = scopeBandForGrade(student.grade)
  if (!band) return null
  const seq = await teachableSequence(scopeSequence[band][subject])
  if (!seq.length) return null

  const [idBySlug, focusIds, masteryRes] = await Promise.all([
    resolveSkillIdsBySlug(seq),
    getActiveFocusSkillIds(studentId),
    supabase
      .from('student_skill_mastery')
      .select('skill_id, status, first_bar_met_at, recheck_passed_at')
      .eq('student_id', studentId),
  ])
  if (masteryRes.error) console.error('nextLesson: mastery read failed', masteryRes.error)

  // Evidence-driven mastery only (migration 0010). mastery_percentage is no longer
  // read here; see known() below.
  const statusById = new Map<string, string>()
  const recheckDueIds = new Set<string>()
  for (const m of masteryRes.data ?? []) {
    statusById.set(m.skill_id, (m.status as string) ?? 'not_started')
    if (isRecheckDue(m)) recheckDueIds.add(m.skill_id)
  }

  // Focus skills ahead of the walk, in scope-sequence order. A focus skill only
  // surfaces here for the subject it belongs to (SAT misses are math skills, so
  // they appear when the kid picks math).
  if (focusIds.size) {
    const focusSlug = seq.find((s) => {
      const id = idBySlug.get(s)
      return id ? focusIds.has(id) : false
    })
    if (focusSlug) {
      return {
        slug: focusSlug,
        label: skillLabel(band, subject, focusSlug),
        subject,
        band,
        trackComplete: false,
        fromFocus: true,
      }
    }
  }

  // Spaced re-checks next: a skill whose mastered accuracy/count bar was met but
  // whose ≥3-day re-check is now due is served ahead of the normal walk, so the
  // durable claim can be confirmed. Additive — only fires when a re-check is due.
  const recheckSlug = seq.find((s) => {
    const id = idBySlug.get(s)
    return id ? recheckDueIds.has(id) : false
  })
  if (recheckSlug) {
    return {
      slug: recheckSlug,
      label: skillLabel(band, subject, recheckSlug),
      subject,
      band,
      trackComplete: false,
      fromFocus: false,
      fromRecheck: true,
    }
  }

  // Normal walk. A skill is KNOWN only on evidence: status 'advanced' (>=70% over
  // >=5 graded attempts) or 'mastered'.
  //
  // The legacy mastery_percentage fallback is deliberately gone. One correct answer
  // on the placement diagnostic seeds that column to exactly 60, which was enough to
  // skip a skill the student had answered a single question about. Against the live
  // database, 52 of the 58 rows that fallback was carrying had ZERO counted attempts.
  // Skills skipped on that basis will reappear in the walk, which is correct: they
  // were never taught.
  const known = (slug: string): boolean => {
    const id = idBySlug.get(slug)
    if (!id) return false
    const st = statusById.get(id)
    return st === 'advanced' || st === 'mastered'
  }

  const nextSlug = seq.find((s) => !known(s))
  if (nextSlug) {
    return { slug: nextSlug, label: skillLabel(band, subject, nextSlug), subject, band, trackComplete: false, fromFocus: false }
  }

  // The band track is finished. Rather than parking the student on its last skill
  // forever, try to cross into the next band. Permission comes from the same grade
  // ladder the picker uses, so a student must have EARNED the widening; the content
  // age pin rides along, which is what stops a strong young reader from being
  // promoted into older material.
  const promoted = await promoteBand(studentId, student, subject, band, known)
  if (promoted) return promoted

  const last = seq[seq.length - 1]
  return { slug: last, label: skillLabel(band, subject, last), subject, band, trackComplete: true, fromFocus: false }
}

/**
 * Cross a completed band track into the next band's track, returning the first
 * skill there the student does not already know. Returns null when the ladder does
 * not permit the crossing, when the next band has no track for this subject, or
 * when every skill in it is already known (a genuinely finished subject).
 *
 * Deliberately lazy: only runs on the completed-track path, so the everyday walk
 * pays nothing for it.
 */
async function promoteBand(
  studentId: string,
  student: LadderStudent,
  subject: ScopeSubject,
  band: ScopeBand,
  known: (slug: string) => boolean,
): Promise<Lesson | null> {
  const [skills, evidence] = await Promise.all([
    listPracticeableSkills(),
    fetchSkillEvidence(studentId),
  ])
  const next = canPromoteToNextBand(student, band, subject, skills, evidence)
  if (!next) return null

  const nextSeq = await teachableSequence(scopeSequence[next][subject])
  if (!nextSeq.length) return null

  const idBySlug = await resolveSkillIdsBySlug(nextSeq)
  const knownInNext = (slug: string): boolean => {
    const id = idBySlug.get(slug)
    if (!id) return false
    const st = evidence.get(id)?.status
    return st === 'advanced' || st === 'mastered' || known(slug)
  }
  const slug = nextSeq.find((s) => !knownInNext(s))
  if (!slug) return null

  return {
    slug,
    label: skillLabel(next, subject, slug),
    subject,
    band: next,
    trackComplete: false,
    fromFocus: false,
    fromPromotion: true,
  }
}

