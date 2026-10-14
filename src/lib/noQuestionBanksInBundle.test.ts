import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import ts from 'typescript'

/**
 * GUARD: no question bank reaches the browser bundle.
 *
 * A bank file (the *Templates.ts files and the SAT prep banks) holds every item
 * with its correct answer and explanation. Anything the app imports, directly or
 * through another module, ships in the JavaScript bundle, where a student can read
 * the answers. Until migration 0033 that happened: src/lib/misconceptions.ts
 * imported eight prep banks just for their misconception labels, and the live
 * bundle carried complete items. The labels now live in small *Misconceptions.ts
 * files with no items in them.
 *
 * HOW IT WORKS. It walks the real import graph from the app's entry point,
 * src/main.tsx, following static imports, re-exports and dynamic import(), with
 * the `@/` alias resolved to src/. Banks may still be imported by the seed
 * builders in scripts/ and by tests, which never reach the bundle.
 */

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')
const ENTRY = join(SRC, 'main.tsx')

/** A question bank: items plus their answers. */
const BANK = /(Templates\.ts|[\\/]prep[\\/]satTransitions\.ts|[\\/]prep[\\/]satWordsInContext\.ts)$/

function resolveImport(from: string, spec: string): string | null {
  let base: string
  if (spec.startsWith('@/')) base = join(SRC, spec.slice(2))
  else if (spec.startsWith('.')) base = resolve(dirname(from), spec)
  else return null // a package, not our source
  const stripped = base.replace(/\.(js|ts|tsx)$/, '')
  for (const candidate of [base, `${stripped}.ts`, `${stripped}.tsx`, join(stripped, 'index.ts'), join(stripped, 'index.tsx')]) {
    if (existsSync(candidate) && statSync(candidate).isFile() && /\.tsx?$/.test(candidate)) return candidate
  }
  return null
}

function importsOf(file: string): string[] {
  const code = readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const specs: string[] = []
  const visit = (node: ts.Node) => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      // Type-only imports are erased and never ship.
      const typeOnly = ts.isImportDeclaration(node)
        ? !!node.importClause?.isTypeOnly
        : node.isTypeOnly
      if (!typeOnly) specs.push(node.moduleSpecifier.text)
    } else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const arg = node.arguments[0]
      if (arg && ts.isStringLiteral(arg)) specs.push(arg.text)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return specs
}

/** Every source file the browser bundle can reach, with the path that reached it. */
function reachable(): Map<string, string[]> {
  const seen = new Map<string, string[]>([[ENTRY, [ENTRY]]])
  const queue = [ENTRY]
  while (queue.length) {
    const file = queue.shift()!
    for (const spec of importsOf(file)) {
      const target = resolveImport(file, spec)
      if (!target || seen.has(target)) continue
      seen.set(target, [...seen.get(file)!, target])
      queue.push(target)
    }
  }
  return seen
}

describe('no question bank in the browser bundle', () => {
  const graph = reachable()

  it('walks the app from src/main.tsx', () => {
    // Sanity: the walk actually covers the app, so an empty result means something.
    expect(graph.size).toBeGreaterThan(100)
    expect([...graph.keys()].some((f) => f.endsWith(join('lib', 'misconceptions.ts')))).toBe(true)
  })

  it('reaches no bank file', () => {
    const leaks = [...graph.entries()]
      .filter(([file]) => BANK.test(file))
      .map(([, chain]) => chain.map((f) => relative(ROOT, f)).join('  ->  '))
    expect(leaks, `A question bank is reachable from the app, so its answers ship to the browser:\n${leaks.join('\n')}`).toEqual([])
  })
})
