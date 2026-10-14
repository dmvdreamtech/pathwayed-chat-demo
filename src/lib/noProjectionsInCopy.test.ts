import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import ts from 'typescript'

/**
 * GUARD: PathwayEd reports measured performance only. No projected scores, no
 * score ranges, no trajectories, in any copy a parent or student can see.
 *
 * Only the College Board, Scholastic Testing Service and ERB report SAT, HSPT and
 * ISEE scores. A number we "project" onto their scales reads to a family as a
 * score their child will get, and that is a claim we cannot back.
 *
 * HOW IT READS THE CODE. Each file is parsed with the TypeScript compiler, and
 * only the text a person can see is checked: string literals, template literal
 * text and JSX text. Identifiers (TrajectoryBlock), comments, import paths and
 * CSS class names (trc-trajectory) are not copy and are not checked, so the code
 * can keep its internal names.
 *
 * Measured history is allowed: "Up 7 points, from 38% to 45%" is two results the
 * child actually got. Percents are one or two digits, so the range rule below
 * (three and four digit numbers, the shape of every test scale) leaves it alone.
 *
 * Scope: src/components, src/pages, src/hooks and src/lib, except the question
 * banks and essay prompts, whose text legitimately says "estimate" or "predicted"
 * ("Estimate the sum", "Critics predicted that the film would vanish").
 */

const SRC = join(process.cwd(), 'src')
const DIRS = ['components', 'pages', 'hooks', 'lib'].map((d) => join(SRC, d))

// Question content, essay prompts and model prompts: not copy about a child's results.
const NOT_COPY = /(Templates|questionGen|misconceptions|transcriptionPrompt|database\.types|satTransitions|satWordsInContext|essayPrompts)\.ts$/

const BANNED_WORDS =
  /\b(projected|projection|projections|projecting|trajectory|trajectories|potential|estimated|estimate|estimates|could land|predicted|prediction|predict)\b/i
// A score range: two 3-4 digit numbers joined by a dash, an en dash entity, or "to".
const SCORE_RANGE = /\b[1-9]\d{2,3}\s*(?:-|–|—|&ndash;|&mdash;|to)\s*[1-9]\d{2,3}\b/
// A range written as {low}&ndash;{high} in JSX: the entity alone between two values.
const DASH_ENTITY = /&[nm]dash;/

// JSX attributes that never reach the page as words.
const NON_COPY_ATTRS = new Set(['className', 'key', 'id', 'style', 'role', 'htmlFor', 'type', 'name', 'src', 'href', 'to'])

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) sourceFiles(full, out)
    else if (/\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry) && !NOT_COPY.test(entry)) out.push(full)
  }
  return out
}

function insideNonCopyAttr(node: ts.Node): boolean {
  for (let n: ts.Node | undefined = node.parent; n; n = n.parent) {
    if (ts.isJsxAttribute(n)) return NON_COPY_ATTRS.has(n.name.getText())
    if (ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) return true
  }
  return false
}

interface Offence {
  where: string
  text: string
  rule: string
}

/** Every piece of visible text in one file that breaks the rule. */
export function offencesIn(fileName: string, code: string): Offence[] {
  const sf = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest, true, fileName.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const found: Offence[] = []
  const check = (node: ts.Node, text: string) => {
    if (!text.trim() || insideNonCopyAttr(node)) return
    const rule = BANNED_WORDS.test(text)
      ? 'projection wording'
      : SCORE_RANGE.test(text)
        ? 'score range'
        : DASH_ENTITY.test(text)
          ? 'dash entity (a range written as {low}&ndash;{high})'
          : null
    if (!rule) return
    const { line } = sf.getLineAndCharacterOfPosition(node.getStart())
    found.push({ where: `${fileName}:${line + 1}`, text: text.trim().slice(0, 140), rule })
  }
  const visit = (node: ts.Node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) check(node, node.text)
    else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) check(node, node.text)
    else if (ts.isJsxText(node)) check(node, node.getText())
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return found
}

describe('no projected scores, ranges or trajectories in user-facing copy', () => {
  it('finds none under src/', () => {
    const offences: string[] = []
    for (const dir of DIRS) {
      for (const file of sourceFiles(dir)) {
        for (const o of offencesIn(relative(process.cwd(), file), readFileSync(file, 'utf8'))) {
          offences.push(`${o.where}  [${o.rule}]  ${o.text}`)
        }
      }
    }
    expect(offences, `Report measured results only:\n${offences.join('\n')}`).toEqual([])
  })
})

describe('the rule itself', () => {
  const hits = (code: string, file = 'x.tsx') => offencesIn(file, code).map((o) => o.rule)

  it('flags projected wording in strings, templates and JSX text', () => {
    expect(hits(`const a = 'An estimated SAT range'`)).toEqual(['projection wording'])
    expect(hits('const a = `Junior-year potential for ${name}`')).toEqual(['projection wording'])
    expect(hits('const el = <p>Projected from demonstrated mastery.</p>')).toEqual(['projection wording'])
    expect(hits('const el = <span>Where they could land</span>')).toEqual(['projection wording'])
  })

  it('flags score ranges however they are written', () => {
    expect(hits(`const a = 'Estimated today 1050-1180'`).length).toBe(1)
    expect(hits(`const a = 'Reports scores from 400 to 1600.'`)).toEqual(['score range'])
    expect(hits(`const a = 'Scaled 760–940'`)).toEqual(['score range'])
    expect(hits('const el = <span>{low}&ndash;{high}</span>')).toEqual(['dash entity (a range written as {low}&ndash;{high})'])
  })

  it('allows measured history and plain percents', () => {
    expect(hits('const a = `Up ${points} points, from ${first}% to ${latest}%.`')).toEqual([])
    expect(hits(`const a = 'Up 7 points, from 38% to 45%.'`)).toEqual([])
    expect(hits(`const a = 'Math: 72% right on SAT-level practice, 48 answers across 5 skills'`)).toEqual([])
    expect(hits(`const a = 'Grades 9-12'`)).toEqual([])
  })

  it('ignores identifiers, class names, imports and comments', () => {
    expect(hits(`import { trajectorySummary } from '@/lib/prep/testTrajectory'`)).toEqual([])
    expect(hits('const el = <div className="trc-trajectory"><TrajectoryBlock /></div>')).toEqual([])
    expect(hits('// the old projected range\nconst trajectory = 1')).toEqual([])
  })
})
