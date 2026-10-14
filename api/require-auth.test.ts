import { describe, it, expect, vi, afterEach } from "vitest"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import {
  bearerToken,
  ownsStudent,
  requireCronSecret,
  requireLearningAccess,
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
