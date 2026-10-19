import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { checkSeedSql } from './seed-guard'

const draftInsert = `insert into public.generated_questions (id, stem, status) values ('a', $q$Which word drops in? Delete from the list. Update set.$q$, 'draft')
on conflict (id) do update set stem = excluded.stem
where public.generated_questions.status = 'draft';`

describe('drafts-only seed guard', () => {
  it('accepts a draft upsert, even when the question text says delete or update', () => {
    expect(checkSeedSql(draftInsert)).toEqual([])
  })
  it('accepts published in a WHERE condition and a DO guard that raises', () => {
    const sql = `do $guard$ begin
  if to_regclass('public.coverage_targets') is null then raise exception 'Run migration 0040 to create it.'; end if;
end $guard$;
insert into public.generated_questions (id, stem, status) select 'b', o.stem, 'draft' from public.generated_questions o
 where o.id = 'x' and o.status = 'published';`
    expect(checkSeedSql(sql)).toEqual([])
  })
  it('refuses schema changes, deletes and plain updates', () => {
    expect(checkSeedSql('alter table public.skills add column x int;')).not.toEqual([])
    expect(checkSeedSql('delete from public.generated_questions;')).not.toEqual([])
    expect(checkSeedSql("update public.generated_questions set stem = 'x';")).not.toEqual([])
    expect(checkSeedSql('grant select on public.skills to anon;')).not.toEqual([])
  })
  it('refuses DDL hidden in a DO block', () => {
    expect(checkSeedSql('do $$ begin execute 1; drop table public.skills; end $$;')).not.toEqual([])
  })
  it('refuses any status other than draft', () => {
    expect(checkSeedSql("insert into public.generated_questions (id, status) values ('c', 'published');")).not.toEqual([])
    expect(
      checkSeedSql("insert into public.generated_questions (id, status) values ('c', 'draft') on conflict (id) do update set status = excluded.status;"),
    ).not.toEqual([])
    expect(checkSeedSql("insert into public.generated_questions (id, stem) values ('d', 'x');")).not.toEqual([])
  })
  it('passes every committed seed file', () => {
    for (const dir of ['seeds/coverage-batches', 'seeds/live-fixes', 'seeds/k2-batches']) {
      let files: string[] = []
      try {
        files = readdirSync(dir).filter((f) => f.endsWith('.sql'))
      } catch {
        continue
      }
      for (const f of files) expect([f, checkSeedSql(readFileSync(join(dir, f), 'utf8'))]).toEqual([f, []])
    }
  })
})
