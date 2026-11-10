import { describe, it, expect, vi, afterEach } from "vitest"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import {
  bearerToken,
  ownsStudent,
  requireCronSecret,
  requireLearningAccess,
  requireLearningOrAnyPrepAccess,
  requireLearningOrPrepSkillAccess,
  requireOwnedStudent,
  type AuthedCaller,
} from "./require-auth.js"

const req = (headers: Record<string, string>) => ({ headers }) as unknown as VercelRequest

function fakeRes() {
  const sent: { status?: number; body?: unknown } = {}
  const res = {
    status(code: number) {
      sent.status = code
      return this
    },
    json(body: unknown) {
      sent.body = body
      return this
    },
  } as unknown as VercelResponse
  return { res, sent }
}

/** Minimal stand-in for the students-table read ownsStudent performs. */
function fakeSvc(result: { data: unknown; error: unknown }) {
  const maybeSingle = vi.fn().mockResolvedValue(result)
  const eq2 = vi.fn().mockReturnValue({ maybeSingle })
  const eq1 = vi.fn().mockReturnValue({ eq: eq2 })
  const select = vi.fn().mockReturnValue({ eq: eq1 })
  const from = vi.fn().mockReturnValue({ select })
  return { client: { from } as never, from, select, eq1, eq2 }
}

describe("bearerToken", () => {
  it("reads a bearer token", () => {
    expect(bearerToken(req({ authorization: "Bearer abc.def.ghi" }))).toBe("abc.def.ghi")
  })

  it("is case insensitive on the scheme", () => {
    expect(bearerToken(req({ authorization: "bearer tok" }))).toBe("tok")
    expect(bearerToken(req({ authorization: "BEARER tok" }))).toBe("tok")
  })

  it("returns empty for a missing or non-bearer header", () => {
    expect(bearerToken(req({}))).toBe("")
    expect(bearerToken(req({ authorization: "Basic abc" }))).toBe("")
  })
})

describe("requireCronSecret", () => {
  const original = process.env.CRON_SECRET
  afterEach(() => {
    if (original === undefined) delete process.env.CRON_SECRET
    else process.env.CRON_SECRET = original
  })

  it("FAILS CLOSED when the secret is not configured", () => {
    // The old guard was `if (CRON_SECRET && header !== ...)`, so an unset secret
    // skipped the check and left endpoints that read every profile wide open.
    delete process.env.CRON_SECRET
    const { res, sent } = fakeRes()
    expect(requireCronSecret(req({ authorization: "Bearer anything" }), res)).toBe(false)
    expect(sent.status).toBe(503)
    expect(sent.body).toEqual({ error: "cron_secret_not_configured" })
  })

  it("rejects a missing or wrong bearer token", () => {
    process.env.CRON_SECRET = "s3cret"
    const a = fakeRes()
    expect(requireCronSecret(req({}), a.res)).toBe(false)
    expect(a.sent.status).toBe(401)

    const b = fakeRes()
    expect(requireCronSecret(req({ authorization: "Bearer wrong" }), b.res)).toBe(false)
    expect(b.sent.status).toBe(401)
  })

  it("passes the real cron caller", () => {
    process.env.CRON_SECRET = "s3cret"
    const { res, sent } = fakeRes()
    expect(requireCronSecret(req({ authorization: "Bearer s3cret" }), res)).toBe(true)
    expect(sent.status).toBeUndefined()
  })
})

describe("ownsStudent", () => {
  it("filters on BOTH the student id and the owning uid", async () => {
    const svc = fakeSvc({ data: { id: "stu-1" }, error: null })
    expect(await ownsStudent(svc.client, "uid-1", "stu-1")).toBe(true)
    expect(svc.from).toHaveBeenCalledWith("students")
    expect(svc.eq1).toHaveBeenCalledWith("id", "stu-1")
    // The uid filter is the whole point: without it any authenticated caller
    // could name any child.
    expect(svc.eq2).toHaveBeenCalledWith("parent_id", "uid-1")
  })

  it("is false when the child belongs to someone else", async () => {
    const svc = fakeSvc({ data: null, error: null })
    expect(await ownsStudent(svc.client, "uid-1", "someone-elses")).toBe(false)
  })

  it("fails closed on a read error", async () => {
    const svc = fakeSvc({ data: null, error: { message: "boom" } })
    expect(await ownsStudent(svc.client, "uid-1", "stu-1")).toBe(false)
  })

  it("is false for an empty student id without querying", async () => {
    const svc = fakeSvc({ data: { id: "x" }, error: null })
    expect(await ownsStudent(svc.client, "uid-1", "")).toBe(false)
    expect(svc.from).not.toHaveBeenCalled()
  })
})

describe("requireOwnedStudent", () => {
  it("400s when no student id is supplied", async () => {
    const { res, sent } = fakeRes()
    const svc = fakeSvc({ data: null, error: null })
    const ok = await requireOwnedStudent(res, { userId: "u", email: "parent@example.com", svc: svc.client }, undefined)
    expect(ok).toBe(false)
    expect(sent.status).toBe(400)
    expect(sent.body).toEqual({ error: "student_id_required" })
  })

  it("403s for another user's child, and does not leak whether it exists", async () => {
    const { res, sent } = fakeRes()
    const svc = fakeSvc({ data: null, error: null })
    const ok = await requireOwnedStudent(res, { userId: "u", email: "parent@example.com", svc: svc.client }, "stu-9")
    expect(ok).toBe(false)
    expect(sent.status).toBe(403)
    expect(sent.body).toEqual({ error: "not_your_student" })
  })

  it("passes for the caller's own child", async () => {
    const { res, sent } = fakeRes()
    const svc = fakeSvc({ data: { id: "stu-1" }, error: null })
    const ok = await requireOwnedStudent(res, { userId: "u", email: "parent@example.com", svc: svc.client }, "stu-1")
    expect(ok).toBe(true)
    expect(sent.status).toBeUndefined()
  })

  it("rejects a non-string student id", async () => {
    const { res, sent } = fakeRes()
    const svc = fakeSvc({ data: null, error: null })
    expect(await requireOwnedStudent(res, { userId: "u", email: "parent@example.com", svc: svc.client }, 42)).toBe(false)
    expect(sent.status).toBe(400)
  })
})

describe("requireLearningAccess", () => {
  const caller = (result: { data: unknown; error: unknown }) => {
    const rpc = vi.fn().mockResolvedValue(result)
    return { auth: { userId: "u1", email: null, svc: { rpc } as never } as AuthedCaller, rpc }
  }

  it("lets an account with access through, asking the database by user id", async () => {
    const { auth, rpc } = caller({ data: true, error: null })
    const { res, sent } = fakeRes()
    expect(await requireLearningAccess(res, auth)).toBe(true)
    expect(rpc).toHaveBeenCalledWith("account_has_learning_access", { p_user_id: "u1" })
    expect(sent.status).toBeUndefined()
  })

  it("answers 403 when the trial has ended and there is no plan", async () => {
    const { auth } = caller({ data: false, error: null })
    const { res, sent } = fakeRes()
    expect(await requireLearningAccess(res, auth)).toBe(false)
    expect(sent).toEqual({ status: 403, body: { error: "subscription_required" } })
  })

  it("FAILS CLOSED when the check itself fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    const { auth } = caller({ data: null, error: { message: "boom" } })
    const { res, sent } = fakeRes()
    expect(await requireLearningAccess(res, auth)).toBe(false)
    expect(sent.status).toBe(503)
  })
})

// ---------------------------------------------------------------------------
// Prep-only access (prep Train lessons and the voice/flashcard helpers)
// ---------------------------------------------------------------------------

type Result = { data: unknown; error: unknown }

/**
 * A service client stand-in: rpc(name) answers from `rpcs`, and from(table)
 * returns a chain (select/eq/in/limit) that resolves to `tables[table]`, awaited
 * or via maybeSingle. `calls` records which rpc names were called.
 */
function prepSvc(rpcs: Record<string, Result>, tables: Record<string, Result>) {
  const calls: string[] = []
  const chain = (r: Result) => {
    const c: Record<string, unknown> = {}
    for (const m of ["select", "eq", "in", "limit"]) c[m] = () => c
    c.maybeSingle = () => Promise.resolve(r)
    c.then = (ok: (v: Result) => unknown, bad?: (e: unknown) => unknown) => Promise.resolve(r).then(ok, bad)
    return c
  }
  const client = {
    rpc: (name: string) => {
      calls.push(name)
      return Promise.resolve(rpcs[name] ?? { data: null, error: { message: `unexpected rpc ${name}` } })
    },
    from: (table: string) => chain(tables[table] ?? { data: null, error: { message: `unexpected table ${table}` } }),
  }
  return { client: client as never, calls }
}

const caller = (svc: never): AuthedCaller => ({ userId: "parent-1", email: null, svc })
const NO_PLAN = { data: false, error: null }

describe("requireLearningOrPrepSkillAccess", () => {
  it("lets a subscriber through without any prep reads", async () => {
    const { client, calls } = prepSvc({ account_has_learning_access: { data: true, error: null } }, {})
    const { res, sent } = fakeRes()
    expect(await requireLearningOrPrepSkillAccess(res, caller(client), "kid-1", "main-idea")).toBe(true)
    expect(sent.status).toBeUndefined()
    expect(calls).toEqual(["account_has_learning_access"])
  })

  it("lets a prep-only family through for a skill its module uses", async () => {
    const { client, calls } = prepSvc(
      { account_has_learning_access: NO_PLAN, can_practice_skill: { data: true, error: null } },
      { students: { data: { id: "kid-1" }, error: null }, skills: { data: { id: "skill-1" }, error: null } },
    )
    const { res, sent } = fakeRes()
    expect(await requireLearningOrPrepSkillAccess(res, caller(client), "kid-1", "read-g6-vocabulary-in-context")).toBe(true)
    expect(sent.status).toBeUndefined()
    expect(calls).toEqual(["account_has_learning_access", "can_practice_skill"])
  })

  it("refuses a prep-only family on a skill outside its module", async () => {
    const { client } = prepSvc(
      { account_has_learning_access: NO_PLAN, can_practice_skill: { data: false, error: null } },
      { students: { data: { id: "kid-1" }, error: null }, skills: { data: { id: "skill-1" }, error: null } },
    )
    const { res, sent } = fakeRes()
    expect(await requireLearningOrPrepSkillAccess(res, caller(client), "kid-1", "quadratic-functions")).toBe(false)
    expect(sent).toEqual({ status: 403, body: { error: "subscription_required" } })
  })

  it("refuses without a skill (homework and open chat need a plan)", async () => {
    const { client, calls } = prepSvc({ account_has_learning_access: NO_PLAN }, {})
    const { res, sent } = fakeRes()
    expect(await requireLearningOrPrepSkillAccess(res, caller(client), "kid-1", undefined)).toBe(false)
    expect(sent.status).toBe(403)
    expect(calls).toEqual(["account_has_learning_access"])
  })

  it("refuses someone else's child before asking about the skill", async () => {
    const { client, calls } = prepSvc(
      { account_has_learning_access: NO_PLAN, can_practice_skill: { data: true, error: null } },
      { students: { data: null, error: null } },
    )
    const { res, sent } = fakeRes()
    expect(await requireLearningOrPrepSkillAccess(res, caller(client), "not-mine", "main-idea")).toBe(false)
    expect(sent.status).toBe(403)
    expect(calls).not.toContain("can_practice_skill")
  })

  it("FAILS CLOSED when a check errors", async () => {
    const planDown = prepSvc({ account_has_learning_access: { data: null, error: { message: "down" } } }, {})
    const a = fakeRes()
    expect(await requireLearningOrPrepSkillAccess(a.res, caller(planDown.client), "kid-1", "main-idea")).toBe(false)
    expect(a.sent).toEqual({ status: 503, body: { error: "access_check_failed" } })

    const prepDown = prepSvc(
      { account_has_learning_access: NO_PLAN, can_practice_skill: { data: null, error: { message: "down" } } },
      { students: { data: { id: "kid-1" }, error: null }, skills: { data: { id: "skill-1" }, error: null } },
    )
    const b = fakeRes()
    expect(await requireLearningOrPrepSkillAccess(b.res, caller(prepDown.client), "kid-1", "main-idea")).toBe(false)
    expect(b.sent.status).toBe(503)
  })
})

describe("requireLearningOrAnyPrepAccess", () => {
  it("lets a subscriber through", async () => {
    const { client } = prepSvc({ account_has_learning_access: { data: true, error: null } }, {})
    const { res } = fakeRes()
    expect(await requireLearningOrAnyPrepAccess(res, caller(client))).toBe(true)
  })

  it("lets an account with an active prep entitlement through", async () => {
    const { client } = prepSvc(
      { account_has_learning_access: NO_PLAN },
      { students: { data: [{ id: "kid-1" }], error: null }, prep_entitlements: { data: [{ id: "e-1" }], error: null } },
    )
    const { res, sent } = fakeRes()
    expect(await requireLearningOrAnyPrepAccess(res, caller(client))).toBe(true)
    expect(sent.status).toBeUndefined()
  })

  it("refuses an account with no plan and no active prep", async () => {
    const { client } = prepSvc(
      { account_has_learning_access: NO_PLAN },
      { students: { data: [{ id: "kid-1" }], error: null }, prep_entitlements: { data: [], error: null } },
    )
    const { res, sent } = fakeRes()
    expect(await requireLearningOrAnyPrepAccess(res, caller(client))).toBe(false)
    expect(sent).toEqual({ status: 403, body: { error: "subscription_required" } })
  })

  it("FAILS CLOSED when the entitlement read errors", async () => {
    const { client } = prepSvc(
      { account_has_learning_access: NO_PLAN },
      { students: { data: [{ id: "kid-1" }], error: null }, prep_entitlements: { data: null, error: { message: "down" } } },
    )
    const { res, sent } = fakeRes()
    expect(await requireLearningOrAnyPrepAccess(res, caller(client))).toBe(false)
    expect(sent.status).toBe(503)
  })
})
