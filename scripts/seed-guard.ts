/**
 * Drafts-only guard for the coverage seed files (scripts/load-coverage-seeds.ts).
 *
 * A seed file may only add or update data, and only as drafts. Before anything
 * connects to a database, every file is scanned and refused if it:
 *   - changes the schema or permissions (create, alter, drop, grant, revoke,
 *     truncate, comment on, vacuum, reindex, cluster, copy);
 *   - deletes rows, or runs a plain UPDATE (seeds upsert with
 *     "on conflict ... do update", which only ever touches unreviewed drafts);
 *   - writes any status other than 'draft' ('published' or 'retired' may only
 *     appear in a WHERE condition, e.g. "o.status = 'published'");
 *   - sets a status inside an upsert ("do update set ... status = ...").
 *
 * Text inside dollar quotes that hold data ($q$ ... $q$) is skipped, because
 * questions and passages contain ordinary words like "update" or "drop".
 * The body of a DO block is code, so it is scanned like everything else.
 */

export interface GuardProblem {
  line: number
  message: string
}

/** Blank out comments and data strings, keeping line breaks so line numbers still match. */
export function codeOnly(sql: string): string {
  const parts: string[] = []
  let tail = ''
  const push = (t: string) => {
    parts.push(t)
    tail = (tail + t).slice(-40)
  }
  let i = 0
  const keepBreaks = (s: string) => s.replace(/[^\n]/g, ' ')
  while (i < sql.length) {
    const ch = sql[i]
    if (ch === '-' && sql[i + 1] === '-') {
      const end = sql.indexOf('\n', i)
      const stop = end === -1 ? sql.length : end
      push(keepBreaks(sql.slice(i, stop)))
      i = stop
      continue
    }
    if (ch === '/' && sql[i + 1] === '*') {
      const end = sql.indexOf('*/', i + 2)
      const stop = end === -1 ? sql.length : end + 2
      push(keepBreaks(sql.slice(i, stop)))
      i = stop
      continue
    }
    if (ch === '$') {
      const m = /^\$([A-Za-z_][A-Za-z0-9_]*)?\$/.exec(sql.slice(i))
      if (m) {
        const tag = m[0]
        const close = sql.indexOf(tag, i + tag.length)
        const stop = close === -1 ? sql.length : close + tag.length
        const isCode = /\bdo\s*$/i.test(tail)
        if (isCode) {
          // Keep the delimiters out, scan the body as code.
          push(' '.repeat(tag.length) + codeOnly(sql.slice(i + tag.length, close === -1 ? sql.length : close)))
          push(close === -1 ? '' : ' '.repeat(tag.length))
        } else {
          push(keepBreaks(sql.slice(i, stop)))
        }
        i = stop
        continue
      }
    }
    // Copy a plain run of code in one piece.
    let j = i + 1
    while (j < sql.length && sql[j] !== '-' && sql[j] !== '/' && sql[j] !== '$') j++
    push(sql.slice(i, j))
    i = j
  }
  return parts.join('')
}

const FORBIDDEN: Array<[RegExp, string]> = [
  [/\b(create|alter|drop|truncate|grant|revoke|vacuum|reindex|cluster)\b/i, 'changes the schema or permissions'],
  [/\bcomment\s+on\b/i, 'changes the schema (comment on)'],
  [/\bcopy\s+[a-z_."]+\s*(\(|from|to)\b/i, 'bulk copy'],
  [/\bdelete\s+from\b/i, 'deletes rows'],
  [/(^|;)\s*update\s+[a-z_."]+\s+set\b/im, 'runs a plain UPDATE (seeds may only upsert)'],
  [/\bset\s+(local\s+)?role\b/i, 'changes the role'],
]

export function checkSeedSql(sql: string): GuardProblem[] {
  const code = codeOnly(sql)
  // Messages in single quotes (raise exception '...') are not code either.
  const bare = code.replace(/'(?:[^']|'')*'/g, (q) => q.replace(/[^\n]/g, ' '))
  const lines = bare.split('\n')
  const problems: GuardProblem[] = []
  const lineOf = (index: number) => code.slice(0, index).split('\n').length

  lines.forEach((text, n) => {
    for (const [re, message] of FORBIDDEN) {
      if (re.test(text)) problems.push({ line: n + 1, message: `${message}: ${text.trim().slice(0, 120)}` })
    }
  })

  // Any status literal other than 'draft' must be a WHERE condition.
  const statusWord = /'(published|retired|archived|approved|live)'/gi
  for (const m of code.matchAll(statusWord)) {
    const before = code.slice(Math.max(0, m.index! - 60), m.index!)
    if (!/\b(where|and|or)\s+[a-z_."]*status\s*(=|<>|!=|is\s+distinct\s+from)\s*$/i.test(before)) {
      problems.push({ line: lineOf(m.index!), message: `writes a status other than 'draft': ${m[0]}` })
    }
  }

  // An upsert must never set the status.
  for (const m of code.matchAll(/do\s+update\s+set\b([\s\S]*?)(;|\bwhere\b)/gi)) {
    if (/\bstatus\s*=/.test(m[1])) problems.push({ line: lineOf(m.index!), message: 'an upsert sets the status' })
  }

  // Every row written to generated_questions must be a draft.
  for (const m of code.matchAll(/insert\s+into\s+public\.generated_questions\b([\s\S]*?);/gi)) {
    if (!/'draft'/.test(m[1])) problems.push({ line: lineOf(m.index!), message: 'a question insert has no draft status' })
  }
  return problems
}
