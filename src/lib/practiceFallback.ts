import { supabase } from '@/lib/supabase'
import { scopeSequence, type ScopeSubject } from '@/lib/scopeSequence'
import { focusAreasByGrade } from '@/lib/focusAreas'
import { PREP_SKILLS } from '@/lib/prep/prepSkills'

/**
 * Where a student goes when Practice has no published questions for a skill:
 * a Nikki-led lesson on that same skill, never a dead end.
 *
 * Nikki teaches from the skill's name, not from the question bank, so a lesson
 * works for any skill, including one whose practice set is not written yet.
 */

export interface NikkiLesson {
  /** Session subject (math | reading | writing), or null when the slug is unknown everywhere. */
  subject: ScopeSubject | null
  /** A name to show the student, e.g. "Vocabulary in Context". */
  label: string
}

const SESSION_SUBJECTS: ScopeSubject[] = ['math', 'reading', 'writing']

/** Map a taxonomy subject (including prep-* subjects) to a Session subject. */
export function sessionSubjectFor(subject: string | null | undefined): ScopeSubject | null {
  if (!subject) return null
  if ((SESSION_SUBJECTS as string[]).includes(subject)) return subject as ScopeSubject
  if (subject.startsWith('prep-')) return /math|quant/.test(subject) ? 'math' : 'reading'
  return null
}

/** The subject and label for a slug from the app's own lists (no network). */
function fromStaticLists(slug: string): NikkiLesson | null {
  for (const subjects of Object.values(focusAreasByGrade)) {
    for (const subject of SESSION_SUBJECTS) {
      const hit = subjects[subject].find((f) => f.value === slug)
      if (hit) return { subject, label: hit.label }
    }
  }
  for (const subjects of Object.values(scopeSequence)) {
    for (const subject of SESSION_SUBJECTS) {
      if (subjects[subject].includes(slug)) return { subject, label: humanize(slug) }
    }
  }
  const prep = Object.values(PREP_SKILLS).find((r) => r.slug === slug)
  if (prep) return { subject: sessionSubjectFor(prep.sessionSubject), label: humanize(slug) }
  return null
}

/** "read-g6-vocabulary-in-context" -> "Vocabulary in context". */
export function humanize(slug: string): string {
  const words = slug.replace(/^(read|write|math)-g(k|\d+)-/, '').replace(/^prep-(sat-)?/, '').split('-').filter(Boolean)
  if (!words.length) return slug
  const s = words.join(' ')
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * Resolve the Nikki lesson for a slug. The taxonomy (skills row) wins, since it
 * has the real name and subject; the app's static lists cover slugs that have
 * no skill row yet. Never throws.
 */
export async function nikkiLessonFor(slug: string): Promise<NikkiLesson> {
  try {
    const { data } = await supabase.from('skills').select('name, subject').eq('slug', slug).maybeSingle()
    if (data) {
      const subject = sessionSubjectFor(data.subject) ?? fromStaticLists(slug)?.subject ?? null
      return { subject, label: data.name || humanize(slug) }
    }
  } catch (err) {
    console.error('nikkiLessonFor: skills read failed', err)
  }
  return fromStaticLists(slug) ?? { subject: null, label: humanize(slug) }
}

/** The Session URL for a Nikki lesson on this skill, or the learning path when the subject is unknown. */
export function nikkiLessonPath(studentId: string, slug: string, subject: ScopeSubject | null): string {
  if (!subject) return `/students/${studentId}/learn`
  return `/students/${studentId}/session/${subject}?skill=${encodeURIComponent(slug)}&from=practice`
}
