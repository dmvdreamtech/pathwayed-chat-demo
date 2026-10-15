// Unsubscribe from the parent progress emails.
//
//   GET  /api/email-unsubscribe?t=<token>   a page with one button (link
//        scanners open links in email, so a GET never unsubscribes anyone)
//   POST /api/email-unsubscribe?t=<token>   unsubscribes: the page's button,
//        and the mail app's one-click unsubscribe (RFC 8058, the
//        List-Unsubscribe-Post header every progress email carries)
//
// The token names the address only by its SHA-256 hash and is signed with
// UNSUBSCRIBE_SECRET, so a link cannot be forged for someone else's address
// and the address itself is never stored (email_suppressions, migration 0036).
import { createClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { verifyUnsubscribeToken } from "./parent-emails-core.js"

function page(title: string, body: string, form = ""): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title></head>
<body style="margin:0;background:#F7F2EA;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1C2230">
<div style="max-width:480px;margin:0 auto;padding:48px 20px">
<div style="background:#fff;border:1px solid #ECE4D8;border-radius:20px;padding:28px">
<h1 style="font-size:20px;color:#003078;margin:0 0 12px">${title}</h1>
<p style="font-size:15px;line-height:1.55;margin:0">${body}</p>${form}
</div></div></body></html>`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = typeof req.query.t === "string" ? req.query.t : ""
  const hash = verifyUnsubscribeToken(token, process.env.UNSUBSCRIBE_SECRET ?? "")
  res.setHeader("Content-Type", "text/html; charset=utf-8")
  res.setHeader("Cache-Control", "no-store")

  if (!hash) {
    return res
      .status(400)
      .send(page("This link does not work", "This unsubscribe link is not valid. Use the link in your most recent email from PathwayEd."))
  }

  if (req.method === "GET") {
    return res.status(200).send(
      page(
        "Unsubscribe",
        "Stop the weekly and monthly PathwayEd progress emails to this address?",
        `<form method="post" action="/api/email-unsubscribe?t=${encodeURIComponent(token)}">
<button type="submit" style="margin-top:18px;background:#CC543C;color:#fff;font:inherit;font-weight:700;border:0;padding:12px 22px;border-radius:999px;cursor:pointer">Unsubscribe</button></form>`,
      ),
    )
  }
  if (req.method !== "POST") return res.status(405).send(page("Unsubscribe", "Use the button on the unsubscribe page."))

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) return res.status(500).send(page("Something went wrong", "Please try the link again later."))

  const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {})
  const source = body.includes("List-Unsubscribe=One-Click") ? "one_click" : "unsubscribe_link"
  const { error } = await createClient(supabaseUrl, serviceKey)
    .from("email_suppressions")
    .upsert({ email_hash: hash, source }, { onConflict: "email_hash", ignoreDuplicates: true })
  if (error) {
    console.error("email-unsubscribe write failed:", error.message)
    return res.status(500).send(page("Something went wrong", "We could not unsubscribe you just now. Please try the link again later."))
  }
  return res
    .status(200)
    .send(page("You are unsubscribed", "This address will not get PathwayEd progress emails again."))
}
