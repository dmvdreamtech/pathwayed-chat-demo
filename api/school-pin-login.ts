import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"
import { deanPost, type ResolveResponse } from "./school-bridge.js"
import { provisionAndMint } from "./mint-session.js"

// K-8 staff-supervised PIN login. Requires a Dean staff session token (validated
// by Dean, which also checks the staff belongs to school_id). On covered:true the
// server mints/reuses the student's tutoring identity and returns a short-lived
// session for the client to adopt. The PIN is forwarded to Dean and NEVER cached,
// logged, or returned; the catch handler never logs req.body.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" })

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey || !process.env.SUPABASE_JWT_SECRET) {
    return res.status(500).json({ error: "not_configured" })
  }

  try {
    const body = (req.body ?? {}) as {
      school_id?: string
      pin?: string
      staff_session_token?: string
    }
    if (typeof body.school_id !== "string" || !UUID_RE.test(body.school_id)) {
      return res.status(400).json({ error: "invalid_input" })
    }
    // Staff session is the gate — enforced here AND by Dean. No staff token => stop
    // before touching the PIN at all.
    if (!body.staff_session_token || typeof body.staff_session_token !== "string") {
      return res.status(401).json({ error: "staff_session_required" })
    }
    if (!body.pin || typeof body.pin !== "string") {
      return res.status(400).json({ error: "invalid_input" })
    }

    const r = await deanPost<ResolveResponse>("resolve-student", {
      school_id: body.school_id,
      product: "tutoring",
      pin: body.pin,
      staff_session_token: body.staff_session_token,
    })
    if (!r.ok) {
      return res
        .status(r.status === 0 ? 503 : r.status)
        .json({ error: r.status === 0 ? "resolve_unavailable" : r.error })
    }
    if (!r.data.covered) return res.status(200).json({ covered: false })

    const svc = createClient(supabaseUrl, serviceKey)
    const minted = await provisionAndMint(svc, r.data, body.school_id)
    if ("error" in minted) return res.status(500).json({ error: minted.error })

    return res.status(200).json({
      covered: true,
      student_id: minted.localId,
      first_name: r.data.first_name,
      grade: r.data.grade,
      session: { access_token: minted.accessToken, expires_at: minted.expiresAt },
    })
  } catch (error) {
    // Never log req.body — it holds the PIN.
    console.error("school-pin-login error:", error)
    return res.status(500).json({ error: "server_error" })
  }
}
