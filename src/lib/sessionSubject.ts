/**
 * Tutoring sessions are stored under a key, not a plain subject: "math" for an
 * open session, "math:functions" for one focused on a skill (the skill's slug).
 * Anything shown to people uses the part before the colon, with the skill's
 * name in parentheses when the slug is a known skill: "Math (Functions)".
 *
 * Used by the parent progress emails (api/parent-emails-core.ts) and the staff
 * Recent activity table (staffProgress.ts), which each bring their own subject
 * names.
 */

export interface SessionKey {
  /** "math" */
  subject: string
  /** "functions", or null for an open session. */
  skillSlug: string | null
}

export function splitSessionKey(key: string): SessionKey {
  const i = key.indexOf(':')
  if (i < 0) return { subject: key, skillSlug: null }
  const slug = key.slice(i + 1).trim()
  return { subject: key.slice(0, i), skillSlug: slug || null }
}

/** The skill slugs a list of session keys mention, for one name lookup. */
export function sessionSkillSlugs(keys: string[]): string[] {
  return [...new Set(keys.map((k) => splitSessionKey(k).skillSlug).filter((s): s is string => !!s))]
}

/**
 * "Math", or "Math (Expressions, Functions)" when skills are known. Slugs that
 * are not a known skill are left out rather than shown raw.
 */
export function subjectWithSkills(subjectName: string, slugs: Iterable<string>, skillNames: Map<string, string>): string {
  const names = [...new Set([...slugs].map((s) => skillNames.get(s)).filter((n): n is string => !!n))].sort()
  return names.length ? `${subjectName} (${names.join(', ')})` : subjectName
}

/**
 * Group session keys by subject, in first-seen order: math:expressions,
 * reading, math:functions → [{math, [expressions, functions]}, {reading, []}].
 */
export function groupSessionKeys(keys: string[]): { subject: string; slugs: string[] }[] {
  const out = new Map<string, Set<string>>()
  for (const k of keys) {
    const { subject, skillSlug } = splitSessionKey(k)
    const set = out.get(subject) ?? new Set<string>()
    if (skillSlug) set.add(skillSlug)
    out.set(subject, set)
  }
  return [...out].map(([subject, slugs]) => ({ subject, slugs: [...slugs] }))
}
