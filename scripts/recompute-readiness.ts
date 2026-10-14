/**
 * Recompute every stored readiness row with the CURRENT engine, once.
 *
 *   bun run scripts/recompute-readiness.ts           dry run: reads only, prints what would change
 *   bun run scripts/recompute-readiness.ts --write   applies it, in one transaction
 *
 * WHY THIS EXISTS. A readiness row is normally recomputed by api/readiness.ts when
 * a child finishes practice or placement, or when a parent opens the dashboard on
 * a stale row. A child whose parent rarely visits keeps an old row for a long
 * time. After an engine change that matters (engine version 5: SAT results are
 * measured only, SAT-level skills only, no projected range), every row should
 * move at once, and old SAT rows read as empty until they do.
 *
 * WHAT IT DOES. For every student that has readiness_scores rows, it reads the
 * same evidence api/readiness.ts reads (student_skill_mastery evidence columns,
 * the student's skills, the SAT catalog), runs the same pure engine
 * (buildReadinessUpserts in src/lib/readinessEngine.ts), and upserts the same rows
 * on (student_id, readiness_type). Nothing else is touched, and nothing is
 * deleted.
 *
 * Connection: DATABASE_URL from your local .env (bun auto-loads it), the same as
 * bun run db:seed. The value is never printed.
 */
import { Client } from 'pg'
import {
  ENGINE_VERSION,
  buildReadinessUpserts,
  type ReadinessMasteryInput,
  type ReadinessSkillInput,
  type SatCatalogInput,
} from '../src/lib/readinessEngine.ts'

const write = process.argv.includes('--write')
const url = process.env.DATABASE_URL
if (!url) {
  console.error('ERROR: DATABASE_URL is not set. Add it to your local .env (see scripts/db-seed.ts).')
  process.exit(1)
}

interface StoredRow {
  student_id: string
  readiness_type: string
  engine_version: number
  schema: number | null
}

async function main() {
  const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } })
  await client.connect()
  try {
    await client.query(write ? 'begin' : 'begin read only')

    const stored = (
      await client.query<StoredRow>(
        `select student_id, readiness_type, engine_version,
                case when readiness_type = 'sat' then (recommendations ->> 'schemaVersion')::int end as schema
           from public.readiness_scores
          order by student_id, readiness_type`,
      )
    ).rows
    const studentIds = [...new Set(stored.map((r) => r.student_id))]

    const skills = (
      await client.query<ReadinessSkillInput & SatCatalogInput & { level: string }>(
        `select id, name, subject, slug, sat_alignment, ccss_grade_num, level::text as level from public.skills`,
      )
    ).rows
    const satCatalog: SatCatalogInput[] = skills.filter((s) => s.level === 'skill' && s.sat_alignment != null)

    const now = Date.now()
    let rowsWritten = 0
    let studentsWithNothing = 0
    for (const studentId of studentIds) {
      const mastery = (
        await client.query<ReadinessMasteryInput>(
          `select skill_id, status, evidence_accuracy, attempts_counted, last_practiced::text as last_practiced
             from public.student_skill_mastery where student_id = $1`,
          [studentId],
        )
      ).rows
      const mine = new Set(mastery.map((m) => m.skill_id))
      const upserts = buildReadinessUpserts(
        studentId,
        mastery,
        skills.filter((s) => mine.has(s.id)),
        satCatalog,
        now,
      )
      const before = stored.filter((r) => r.student_id === studentId)
      const sat = upserts.find((u) => u.readiness_type === 'sat')
      const satPayload = sat?.recommendations as { skillsPracticed?: number; skillsTotal?: number } | undefined
      console.log(
        `${studentId}  ${before.map((r) => `${r.readiness_type}@v${r.engine_version}${r.schema != null ? `/sat${r.schema}` : ''}`).join(' ')}` +
          `  ->  ${upserts.length ? upserts.map((u) => u.readiness_type).join(' ') : '(no evidence, unchanged)'}` +
          (sat ? `  sat: ${satPayload?.skillsPracticed ?? 0} of ${satPayload?.skillsTotal ?? 0} SAT-level skills practiced, ${sat.score}% right` : ''),
      )
      if (!upserts.length) {
        studentsWithNothing += 1
        continue
      }
      if (!write) continue
      for (const u of upserts) {
        await client.query(
          `insert into public.readiness_scores
             (student_id, readiness_type, score, strengths, gaps, next_skill_slug, recommendations, engine_version)
           values ($1, $2, $3, $4::jsonb, $5::jsonb, $6, $7::jsonb, $8)
           on conflict (student_id, readiness_type) do update set
             score = excluded.score,
             strengths = excluded.strengths,
             gaps = excluded.gaps,
             next_skill_slug = excluded.next_skill_slug,
             recommendations = excluded.recommendations,
             engine_version = excluded.engine_version`,
          [
            u.student_id,
            u.readiness_type,
            u.score,
            JSON.stringify(u.strengths),
            JSON.stringify(u.gaps),
            u.next_skill_slug,
            JSON.stringify(u.recommendations),
            u.engine_version,
          ],
        )
        rowsWritten += 1
      }
    }

    await client.query(write ? 'commit' : 'rollback')
    const changed = studentIds.length - studentsWithNothing
    console.log(
      write
        ? `\nWROTE ${rowsWritten} rows for ${changed} of ${studentIds.length} students at engine version ${ENGINE_VERSION}.`
        : `\nDRY RUN, nothing written. Would rewrite rows for ${changed} of ${studentIds.length} students at engine version ${ENGINE_VERSION}. Run again with --write to apply.`,
    )
  } catch (err) {
    await client.query('rollback').catch(() => {})
    console.error('ERROR:', (err as Error).message)
    process.exitCode = 1
  } finally {
    await client.end()
  }
}

void main()
