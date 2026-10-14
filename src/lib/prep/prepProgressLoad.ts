import type { PrepModule } from '@/lib/prep/types'
import { prepSkillFor } from '@/lib/prep/prepSkills'
import { listAttempts } from '@/lib/prep/timedSection'
import { getSkillMastery } from '@/lib/mastery'
import { resolveSkillIdsBySlug } from '@/lib/skills'
import {
  computePrepProgress,
  type PracticeEvidence,
  type PrepProgress,
  type PrepAttemptLite,
} from '@/lib/prep/prepProgress'

/**
 * I/O orchestration for computePrepProgress (the pure engine). Reads the child's
 * finalized timed attempts and per-slug practice mastery — both already visible to
 * the parent under RLS (owns_student on prep_attempts + student_skill_mastery) — and
 * folds them into a PrepProgress. Kept out of prepProgress.ts so the pure engine and
 * its unit test stay free of Supabase imports.
 */
export async function loadPrepProgress(studentId: string, module: PrepModule): Promise<PrepProgress> {
  const slugs = Array.from(
    new Set(
      module.sections.flatMap((sec) =>
        sec.questionTypes.map((t) => prepSkillFor(t)?.slug).filter((s): s is string => !!s),
      ),
    ),
  )

  const [attempts, idBySlug, mastery] = await Promise.all([
    listAttempts(studentId, module.id),
    slugs.length ? resolveSkillIdsBySlug(slugs) : Promise.resolve(new Map<string, string>()),
    getSkillMastery(studentId),
  ])

  const evById = new Map<string, PracticeEvidence | null>(
    mastery.map((m) => [
      m.skill_id,
      m.attempts_counted > 0 && m.accuracy != null ? { accuracy: m.accuracy, answers: m.attempts_counted } : null,
    ]),
  )
  const clearedIds = new Set(
    mastery.filter((m) => m.status === 'advanced' || m.status === 'mastered').map((m) => m.skill_id),
  )
  const slugEvidence = new Map<string, PracticeEvidence | null>()
  const clearedSlugs = new Set<string>()
  for (const slug of slugs) {
    const skillId = idBySlug.get(slug)
    slugEvidence.set(slug, skillId ? evById.get(skillId) ?? null : null)
    if (skillId && clearedIds.has(skillId)) clearedSlugs.add(slug)
  }

  const lite: PrepAttemptLite[] = attempts
    .filter((a) => a.status === 'submitted' || a.status === 'expired')
    .map((a) => ({
      sectionId: a.sectionId,
      status: a.status as 'submitted' | 'expired',
      score: a.score,
      startedAt: a.startedAt,
    }))

  return computePrepProgress(module, lite, slugEvidence, clearedSlugs)
}
