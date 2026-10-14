/**
 * The four evidence states the mastery engine (recompute_skill_mastery) writes.
 * Its own file, with no imports, so the readiness engine can share it with
 * api/ (which cannot resolve `@/`). mastery.ts re-exports it.
 */
export type MasteryStatus = 'not_started' | 'practicing' | 'advanced' | 'mastered'
