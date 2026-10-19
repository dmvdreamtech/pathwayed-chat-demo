/**
 * Load the coverage seed files into the database, in order, as drafts.
 *
 *   bun run db:load-coverage            check only: list the files and run the guard
 *   bun run db:load-coverage --go       check, then load
 *
 * Order: seeds/coverage-batches/NN_*.sql, then seeds/k2-batches/NN_*.sql (when
 * present), then seeds/live-fixes/NN_*.sql, each in number order.
 *
 * Before anything connects, every file passes the drafts-only guard
 * (scripts/seed-guard.ts): no schema or permission changes, no deletes, no plain
 * updates, and no status other than 'draft' is ever written. Any problem stops the
 * run before the first file.
 *
 * Connection: DATABASE_URL (bun auto-loads .env). The value is never printed.
 * Before the first file it checks that migrations 0040 to 0044 are applied.
 *
 * Each file runs as written (its own begin/commit blocks). The run stops at the
 * first error and says which file failed. Every file is safe to re-run, so after
 * a fix, run the whole thing again: loaded files change nothing the second time.
 *
 * Per file it reports the rows written per table (inserted or updated drafts),
 * from row counts taken before and after the file, plus the statement row total.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Client } from 'pg'
import { checkSeedSql } from './seed-guard'

const DIRS = ['seeds/coverage-batches', 'seeds/k2-batches', 'seeds/live-fixes']
const go = process.argv.includes('--go')

const files: string[] = []
for (const dir of DIRS) {
  let names: string[]
  try {
    names = readdirSync(dir)
  } catch {
    continue
  }
  const sql = names.filter((f) => /^\d{2}_.*\.sql$/.test(f)).sort()
  sql.forEach((f, k) => {
    if (Number(f.slice(0, 2)) !== k + 1) {
      console.error(`ERROR: ${dir} is not numbered 01, 02, ... without gaps (found ${f} at position ${k + 1}).`)
      process.exit(1)
    }
  })
  for (const f of sql) files.push(join(dir, f))
}
if (!files.length) {
  console.error('ERROR: no seed files found.')
  process.exit(1)
}

// 1) The guard, over every file, before any connection.
let refused = 0
for (const f of files) {
  const problems = checkSeedSql(readFileSync(f, 'utf8'))
  for (const p of problems.slice(0, 5)) console.error(`REFUSED ${f}:${p.line} ${p.message}`)
  if (problems.length > 5) console.error(`REFUSED ${f}: and ${problems.length - 5} more`)
  if (problems.length) refused++
}
if (refused) {
  console.error(`\n${refused} file(s) refused by the drafts-only guard. Nothing was loaded.`)
  process.exit(1)
}
console.log(`Guard passed: ${files.length} files, data only, drafts only.`)
for (const f of files) console.log(`  ${f}`)
if (!go) {
  console.log('\nCheck only. Nothing was loaded. Run again with --go to load.')
  process.exit(0)
}

const url = process.env.DATABASE_URL
if (!url) {
  console.error('ERROR: DATABASE_URL is not set. Add the Supabase URI connection string to your local .env.')
  process.exit(1)
}

const TABLES = ['skills', 'passages', 'skill_standard_codes', 'generated_questions', 'question_fix_drafts'] as const
const COUNT_SQL = `select
  (select count(*) from public.skills)::int as skills,
  (select count(*) from public.passages)::int as passages,
  (select count(*) from public.skill_standard_codes)::int as skill_standard_codes,
  (select count(*) from public.generated_questions where status = 'draft')::int as generated_questions,
  (select count(*) from public.question_fix_drafts)::int as question_fix_drafts,
  (select count(*) from public.generated_questions where status = 'published')::int as published`

// Supabase requires SSL (encrypted; CA not pinned, as in db-seed.ts). A local
// test database can opt out with ?sslmode=disable in the URL.
const client = new Client({ connectionString: url, ssl: /sslmode=disable/.test(url) ? false : { rejectUnauthorized: false } })
client.on('notice', (n) => console.log(`  NOTICE: ${n.message ?? n}`))

try {
  await client.connect()

  // 2) The migrations these files need.
  const need = await client.query(`select
    to_regclass('public.coverage_targets') is not null as m0040,
    to_regclass('public.skill_standard_codes') is not null as m0041,
    to_regclass('public.question_fix_drafts') is not null as m0042,
    to_regclass('public.skill_reviews') is not null as m0043,
    exists (select 1 from information_schema.columns where table_schema = 'public'
              and table_name = 'generated_questions' and column_name = 'teaches_punctuation') as m0044`)
  const missing = Object.entries(need.rows[0]).filter(([, ok]) => !ok).map(([k]) => k.slice(1))
  if (missing.length) {
    console.error(`ERROR: apply migration(s) ${missing.join(', ')} first. Nothing was loaded.`)
    process.exitCode = 1
  } else {
    const start = (await client.query(COUNT_SQL)).rows[0]
    let before = start
    console.log(`Connected. Loading ${files.length} files.\n`)
    for (const f of files) {
      let result
      try {
        result = await client.query(readFileSync(f, 'utf8'))
      } catch (err) {
        console.error(`\nFAILED ${f}: ${(err as Error).message}`)
        // A file stops inside one of its begin/commit blocks: undo that block only.
        await client.query('rollback').catch(() => {})
        console.error('Stopped. Earlier files are loaded. Fix the problem and run again; loaded files are safe to re-run.')
        process.exitCode = 1
        break
      }
      const results = Array.isArray(result) ? result : [result]
      const touched = results.reduce((n, r) => n + (r.command === 'INSERT' || r.command === 'UPDATE' ? (r.rowCount ?? 0) : 0), 0)
      const after = (await client.query(COUNT_SQL)).rows[0]
      const added = TABLES.map((t) => `${t} +${after[t] - before[t]}`).join(', ')
      console.log(`OK ${f}: ${touched} rows written (new rows: ${added})`)
      if (after.published !== start.published) {
        console.error(`\nSTOP: the published count changed (${start.published} to ${after.published}). This should never happen.`)
        process.exitCode = 1
        break
      }
      before = after
    }
    if (!process.exitCode) {
      const end = (await client.query(COUNT_SQL)).rows[0]
      console.log(`\nDone. New rows in total: ${TABLES.map((t) => `${t} +${end[t] - start[t]}`).join(', ')}.`)
      console.log(`Published questions: ${end.published} (unchanged).`)
    }
  }
} catch (err) {
  console.error(`ERROR: ${(err as Error).message}`)
  process.exitCode = 1
} finally {
  await client.end()
}
