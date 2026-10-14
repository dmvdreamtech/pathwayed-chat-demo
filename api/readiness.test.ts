import { describe, it, expect } from "vitest"
import type { SupabaseClient } from "@supabase/supabase-js"
import { recomputeReadiness } from "./readiness.js"
import { ENGINE_VERSION } from "../src/lib/readinessEngine.js"

/**
 * The server recompute reads ONLY database-computed evidence and writes the rows
 * the browser used to write. A thenable stub stands in for the service client.
 */
function stubClient(opts: {
  mastery: unknown[]
  skills: unknown[]
  satCatalog: unknown[]
  masteryError?: { message: string } | null
}) {
  const upserts: { rows: Record<string, unknown>[]; onConflict: string }[] = []
  const selects: { table: string; cols: string }[] = []
  const from = (table: string) => {
    let cols = ""
    let filteredBySat = false
    const result = () => {
      if (table === "student_skill_mastery") return { data: opts.mastery, error: opts.masteryError ?? null }
      if (table === "skills") return { data: filteredBySat ? opts.satCatalog : opts.skills, error: null }
      return { data: [], error: null }
    }
    const b: Record<string, unknown> = {
      select: (c: string) => {
        cols = c
        selects.push({ table, cols })
        return b
      },
      eq: () => b,
      in: () => b,
      not: () => {
        filteredBySat = true
        return b
      },
      then: (res: (v: unknown) => unknown) => res(result()),
      upsert: async (rows: Record<string, unknown>[], o: { onConflict: string }) => {
        upserts.push({ rows, onConflict: o.onConflict })
        return { error: null }
      },
    }
    return b
  }
  return { client: { from } as unknown as SupabaseClient, upserts, selects }
}

const NOW = Date.parse("2026-10-14T12:00:00Z")

describe("recomputeReadiness (api/readiness.ts)", () => {
  it("writes pathway, subject and SAT rows from the evidence columns", async () => {
    const { client, upserts, selects } = stubClient({
      mastery: [
        { skill_id: "s1", status: "advanced", evidence_accuracy: "80.0", attempts_counted: 6, last_practiced: "2026-10-13T00:00:00Z" },
      ],
      skills: [{ id: "s1", name: "Linear equations", subject: "math", slug: "linear-equations" }],
      satCatalog: [{ id: "s1", slug: "linear-equations", name: "Linear equations", subject: "math", sat_alignment: "heart-of-algebra" }],
    })
    const written = await recomputeReadiness(client, "stu-1", NOW)

    expect(written).toBe(3)
    expect(upserts).toHaveLength(1)
    expect(upserts[0].onConflict).toBe("student_id,readiness_type")
    expect(upserts[0].rows.map((r) => r.readiness_type).sort()).toEqual(["math", "pathway", "sat"])
    for (const r of upserts[0].rows) {
      expect(r.student_id).toBe("stu-1")
      expect(r.engine_version).toBe(ENGINE_VERSION)
    }
    // Evidence only: the legacy self-rating columns are never read.
    const masteryCols = selects.find((s) => s.table === "student_skill_mastery")?.cols ?? ""
    expect(masteryCols).toContain("evidence_accuracy")
    expect(masteryCols).not.toContain("mastery_percentage")
  })

  it("writes nothing for a student with no mastery rows", async () => {
    const { client, upserts } = stubClient({ mastery: [], skills: [], satCatalog: [] })
    expect(await recomputeReadiness(client, "stu-1", NOW)).toBe(0)
    expect(upserts).toHaveLength(0)
  })

  it("throws when the evidence cannot be read, so the route answers 500", async () => {
    const { client, upserts } = stubClient({
      mastery: [],
      skills: [],
      satCatalog: [],
      masteryError: { message: "boom" },
    })
    await expect(recomputeReadiness(client, "stu-1", NOW)).rejects.toThrow("mastery read failed")
    expect(upserts).toHaveLength(0)
  })
})
