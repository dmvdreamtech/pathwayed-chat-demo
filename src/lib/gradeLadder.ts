import { gradeBand, type GradeBand } from '@/lib/gradeBand'
import { isCleared, type SkillEvidence } from '@/lib/pickNextSkill'

/**
 * The grade ladder — how far UP a student may reach, and when they have earned
 * another rung. Pure and dependency-free (gradeBand has zero imports), so every
 * rule here is unit-tested without a database.
 *
 * Two principles, both from the product brief:
 *
 *   MASTERY IS TRUTH. Grade is a default, never a cap. A student who has cleared
 *   the ADVANCE bar on everything at their working grade gets the next grade up.
 *
 *   CEILING ONLY, NO FLOOR. There is deliberately no symmetric lower bound: a hard
 *   floor would re-trap a struggling student, and it would break the prep engine,
 *   which routes a grade 9 student to grade 3 Multiplication for HSPT arithmetic on
 *   purpose. Downward reach stays available, it just is not the DEFAULT: below the
 *   student's own band a skill must justify itself with evidence.
 */

/** K = 0 through grade 12. Nothing may be served above this. */
export const MAX_GRADE = 12

/**
 * How far above the student's CHRONOLOGICAL grade age-carrying content may go.
 *
 * PINNED AT ZERO ON PURPOSE, AND NOT A TUNING KNOB. Skill difficulty is allowed to
 * run ahead of a student's age, because that is what it means to be good at
 * something. Reading MATERIAL is different: a seven-year-old who decodes at a
 * fifth-grade level is still seven, and the themes, situations, and vocabulary of
 * fifth-grade passages are written for eleven-year-olds. Advancing the skill must
 * never advance the subject matter.
 *
 * So this ceiling is anchored to students.grade, NEVER to students.working_grade,
 * and it moves only when the child actually gets older. Raising it above 0 means
 * deciding that some children should be served material written for older children.
 * Do not change it to unblock a content gap; author content at the right age instead.
 */
export const CONTENT_AGE_CEILING_OFFSET = 0

/** Subjects whose questions carry age-bearing subject matter regardless of passages. */
const AGE_CARRYING_SUBJECTS = new Set(['reading'])

export interface LadderStudent {
  /** Chronological grade: 'K', '1' .. '12'. The anchor for the content age ceiling. */
  grade: string
  /** Earned skill grade, null until the student is promoted. Defaults to `grade`. */
  working_grade: number | null
  /** Parent consent to above-grade framing. Also a manual widening opt-in. */
  above_grade_ok: boolean
}

export interface LadderSkill {
  skill_id: string
  slug: string
  name: string
  subject: string
  ccss_grade_num: number | null
  /** True when at least one published question for this skill is passage-backed. */
  has_passages: boolean
  /** skills.prerequisite_skills (text[] of slugs), null or empty for most skills. */
  prerequisite_skills: string[] | null
}

function clampGrade(n: number): number {
  return Math.max(0, Math.min(MAX_GRADE, Math.trunc(n)))
}

/**
 * A grade string as an orderable number. 'K' and anything unrecognized map to 0,
 * matching gradeBand()'s conservative default: an unknown grade is treated as the
 * youngest, so age safeguards apply rather than being skipped.
 */
export function gradeNum(grade?: string | null): number {
  if (!grade || grade === 'K') return 0
  const n = parseInt(grade, 10)
  return Number.isNaN(n) ? 0 : clampGrade(n)
}

/** The student's earned skill grade. Defaults to their chronological grade. */
export function workingGradeNum(student: LadderStudent): number {
  return student.working_grade == null ? gradeNum(student.grade) : clampGrade(student.working_grade)
}

/** The hard age ceiling for age-carrying content. Anchored to chronological grade. */
export function contentAgeCeiling(student: LadderStudent): number {
  return clampGrade(gradeNum(student.grade) + CONTENT_AGE_CEILING_OFFSET)
}

/** Does this skill carry age-bearing subject matter? Reading, or anything with passages. */
export function isAgePinned(skill: LadderSkill): boolean {
  return AGE_CARRYING_SUBJECTS.has(skill.subject) || skill.has_passages
}

/** The lowest true grade inside a scope band. */
export function bandFloorGrade(band: GradeBand): number {
  switch (band) {
    case 'k-2':
      return 0
    case '3-5':
      return 3
    case '6-8':
      return 6
    case '9-12':
      return 9
  }
}

/** The band above this one, or null at the top. */
export function nextBand(band: GradeBand): GradeBand | null {
  switch (band) {
    case 'k-2':
      return '3-5'
    case '3-5':
      return '6-8'
    case '6-8':
      return '9-12'
    case '9-12':
      return null
  }
}

/**
 * Every published skill at the student's working grade in one subject strand is
 * cleared (advanced or mastered). Requires at least one such skill: a strand with
 * no content at that grade has proved nothing and must not widen on a vacuous truth.
 */
export function strandClearedAtWorkingGrade(
  student: LadderStudent,
  skills: LadderSkill[],
  evidence: Map<string, SkillEvidence>,
  subject: string,
): boolean {
  const target = workingGradeNum(student)
  const atGrade = skills.filter((s) => s.subject === subject && s.ccss_grade_num === target)
  if (!atGrade.length) return false
  return atGrade.every((s) => isCleared(evidence.get(s.skill_id)))
}

/**
 * May this strand reach one grade above the working grade? Either the parent has
 * opted in (above_grade_ok), or the student has cleared everything at their working
 * grade in this strand. Consent is a shortcut, not a requirement: earned is earned.
 */
export function canWiden(
  student: LadderStudent,
  skills: LadderSkill[],
  evidence: Map<string, SkillEvidence>,
  subject: string,
): boolean {
  if (student.above_grade_ok) return true
  return strandClearedAtWorkingGrade(student, skills, evidence, subject)
}

/**
 * The highest ccss_grade_num this student may be served for one skill.
 * Never more than one grade above the working grade, and never above the content
 * age ceiling for age-carrying material.
 */
export function skillCeiling(student: LadderStudent, skill: LadderSkill, widened: boolean): number {
  const base = clampGrade(workingGradeNum(student) + (widened ? 1 : 0))
  return isAgePinned(skill) ? Math.min(base, contentAgeCeiling(student)) : base
}

export interface EligibilityInput {
  student: LadderStudent
  skills: LadderSkill[]
  evidence: Map<string, SkillEvidence>
  /** Unresolved student_focus_skills rows — justifies reaching below band. */
  focusSkillIds?: Set<string>
  /** Skills with a prior incorrect graded attempt — justifies reaching below band. */
  missedSkillIds?: Set<string>
}

/**
 * The skills this student may practice right now.
 *
 *   1. Drop anything already cleared (advanced or mastered). Nothing they have
 *      moved past is ever "available" again through this path.
 *   2. Apply the upper bound per strand: ccss_grade_num <= working_grade, or
 *      working_grade + 1 once the strand has earned the widening. Age-carrying
 *      skills are additionally capped at the chronological content ceiling.
 *   3. In-band and above-band skills are available by default.
 *   4. Below-band skills are available ONLY with evidence: an unresolved focus row,
 *      a prior wrong answer on that skill, or being an unmet prerequisite of a skill
 *      that IS in band. No hard floor, but no drifting downward by default either.
 *   5. Per strand, if those rules leave nothing but the strand does have
 *      ceiling-eligible skills, fall back to the ceiling-eligible set. Reading has
 *      no published skills at grades 4 through 8, so a grade 6 student would
 *      otherwise be handed an empty reading list.
 *
 * Untagged skills (ccss_grade_num null) are kept: an unknown grade is not evidence
 * of being too hard, and dropping them would silently remove real content.
 */
export function eligibleSkills(input: EligibilityInput): LadderSkill[] {
  const { student, skills, evidence } = input
  const focusSkillIds = input.focusSkillIds ?? new Set<string>()
  const missedSkillIds = input.missedSkillIds ?? new Set<string>()
  const floor = bandFloorGrade(gradeBand(student.grade))

  const open = skills.filter((s) => !isCleared(evidence.get(s.skill_id)))

  const bySubject = new Map<string, LadderSkill[]>()
  for (const s of open) {
    const arr = bySubject.get(s.subject) ?? []
    arr.push(s)
    bySubject.set(s.subject, arr)
  }

  const out: LadderSkill[] = []
  for (const [subject, strandSkills] of bySubject) {
    const widened = canWiden(student, skills, evidence, subject)
    const underCeiling = strandSkills.filter(
      (s) => s.ccss_grade_num == null || s.ccss_grade_num <= skillCeiling(student, s, widened),
    )

    const inBand = underCeiling.filter((s) => s.ccss_grade_num == null || s.ccss_grade_num >= floor)
    const belowBand = underCeiling.filter((s) => s.ccss_grade_num != null && s.ccss_grade_num < floor)

    // Prerequisites of the skills the student is actually working toward. Only an
    // UNMET prerequisite justifies reaching down, and `belowBand` is already free of
    // cleared skills, so membership alone is enough.
    const neededPrereqs = new Set<string>()
    for (const s of inBand) for (const p of s.prerequisite_skills ?? []) neededPrereqs.add(p)

    const justifiedBelow = belowBand.filter(
      (s) =>
        focusSkillIds.has(s.skill_id) || missedSkillIds.has(s.skill_id) || neededPrereqs.has(s.slug),
    )

    const picked = [...inBand, ...justifiedBelow]
    out.push(...(picked.length ? picked : underCeiling))
  }
  return out
}

export interface WorkingGradeRaise {
  from: number
  to: number
  /** Stored in students.working_grade_reason so the promotion is auditable. */
  reason: string
}

/** Stable order so a multi-strand clear always reports the same reason. */
const STRAND_ORDER = ['math', 'reading', 'writing', 'science']

function strandRank(subject: string): number {
  const i = STRAND_ORDER.indexOf(subject)
  return i === -1 ? STRAND_ORDER.length : i
}

/**
 * Should this student's working grade go up? Yes when they have cleared the ADVANCE
 * bar on every published skill at their working grade in ANY subject strand.
 *
 * Always exactly +1: never skip a rung, never lower. Returns null at grade 12 and
 * whenever no strand has been cleared, so the caller writes nothing.
 *
 * The WRITE uses the database's copy of this rule, raise_working_grade_if_earned
 * (migration 0031), so a browser cannot promote itself. This is the readable,
 * unit-tested statement of the same rule. Change both together.
 */
export function shouldRaiseWorkingGrade(
  student: LadderStudent,
  skills: LadderSkill[],
  evidence: Map<string, SkillEvidence>,
): WorkingGradeRaise | null {
  const from = workingGradeNum(student)
  if (from >= MAX_GRADE) return null

  const subjects = [...new Set(skills.map((s) => s.subject))]
    .filter((s) => !s.startsWith('prep-'))
    .sort((a, b) => strandRank(a) - strandRank(b) || a.localeCompare(b))

  for (const subject of subjects) {
    if (strandClearedAtWorkingGrade(student, skills, evidence, subject)) {
      const label = from === 0 ? 'kindergarten' : `grade ${from}`
      return { from, to: from + 1, reason: `cleared every ${label} ${subject} skill` }
    }
  }
  return null
}

/**
 * May this student's learning path cross from a completed band track into the next
 * band? Only when the next band's floor grade is inside their ceiling, which means
 * they must have earned the widening first. The age pin rides along automatically:
 * an age-carrying strand is capped at the chronological grade, so a student never
 * promotes into older reading material by being good at decoding.
 */
export function canPromoteToNextBand(
  student: LadderStudent,
  band: GradeBand,
  subject: string,
  skills: LadderSkill[],
  evidence: Map<string, SkillEvidence>,
): GradeBand | null {
  const next = nextBand(band)
  if (!next) return null
  const widened = canWiden(student, skills, evidence, subject)
  const agePinned = AGE_CARRYING_SUBJECTS.has(subject)
  const base = clampGrade(workingGradeNum(student) + (widened ? 1 : 0))
  const ceiling = agePinned ? Math.min(base, contentAgeCeiling(student)) : base
  return bandFloorGrade(next) <= ceiling ? next : null
}
