import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { ContentSkill } from './types'

/** Every skill file under content/<subject>/grade-<n>/, sorted by path. */
export function contentFiles(root: string): string[] {
  const out: string[] = []
  const walk = (dir: string) => {
    for (const name of readdirSync(dir).sort()) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p)
      else if (/[\\/]grade-(k|\d+)[\\/][a-z0-9-]+\.ts$/.test(p) && !p.endsWith('.test.ts')) out.push(p)
    }
  }
  for (const subject of ['reading', 'writing', 'math']) {
    try {
      if (statSync(join(root, subject)).isDirectory()) walk(join(root, subject))
    } catch {
      // A subject with no content yet.
    }
  }
  return out
}

export async function loadSkills(root: string): Promise<{ file: string; skill: ContentSkill }[]> {
  const out: { file: string; skill: ContentSkill }[] = []
  for (const file of contentFiles(root)) {
    const mod = (await import(pathToFileURL(file).href)) as { default: ContentSkill }
    out.push({ file: relative(join(root, '..'), file).replace(/\\/g, '/'), skill: mod.default })
  }
  return out
}
