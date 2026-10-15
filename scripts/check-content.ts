/**
 * Check coverage content files before committing (run with Bun):
 *
 *   bun run scripts/check-content.ts                      every file under content/
 *   bun run scripts/check-content.ts content/reading/grade-8/read-g8-theme-summary.ts
 *
 * Prints each problem, or the item count when a file is clean. Exits 1 on any problem.
 */
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { itemCount, skillIssues } from '../content/checks'
import { loadSkills } from '../content/load'
import type { ContentSkill } from '../content/types'

const args = process.argv.slice(2)
const files: { file: string; skill: ContentSkill }[] = args.length
  ? await Promise.all(
      args.map(async (f) => ({ file: f, skill: ((await import(pathToFileURL(resolve(f)).href)) as { default: ContentSkill }).default })),
    )
  : await loadSkills(resolve('content'))
let bad = 0
for (const { file, skill } of files) {
  const issues = skillIssues(skill)
  if (issues.length) {
    bad++
    console.log(`FAIL ${file}\n  ${issues.join('\n  ')}`)
  } else {
    console.log(`ok   ${file}: ${itemCount(skill)} items, ${skill.passages?.length ?? 0} passages`)
  }
}
process.exit(bad ? 1 : 0)
