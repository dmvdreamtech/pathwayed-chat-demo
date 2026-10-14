import Anthropic from "@anthropic-ai/sdk"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { getCombinedSystemPrompt, type Mode, type StudentContext } from "./prompts.js"
import { requireUser, requireOwnedStudent, requireLearningAccess } from "./require-auth.js"
import { rateLimit } from "./rate-limit.js"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface ImageInput {
  data: string // base64, without the data: prefix
  mediaType?: string
}

interface ChatRequest {
  messages: ChatMessage[]
  mode: Mode
  context?: StudentContext
  image?: ImageInput
  /** The child this conversation is about. Required for kid-tutor mode. */
  studentId?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // Validate API key
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: "Anthropic API key not configured" })
  }

  // AUTHENTICATION. This endpoint used to accept any POST from anyone, which made
  // it an open LLM proxy on a production domain. Every caller must now present a
  // valid Supabase session. One check covers all three identity paths (B2C, school
  // SSO, and the minted K-8 PIN identity) because all three are ordinary Supabase
  // sessions by the time a request is made — see require-auth.ts.
  const auth = await requireUser(req, res)
  if (!auth) return
  // Learning features need an active plan, trial or school coverage (0033).
  if (!(await requireLearningAccess(res, auth))) return

  // Per-user cap. Cheap, in-memory, per-instance; see rate-limit.ts for what that
  // does and does not buy.
  const limited = rateLimit(auth.userId)
  if (!limited.allowed) {
    res.setHeader("Retry-After", String(limited.retryAfterSec))
    return res.status(429).json({ error: "rate_limited", retry_after: limited.retryAfterSec })
  }

  const anthropic = new Anthropic({
    apiKey,
  })

  try {
    const { messages, mode, context, image, studentId } = req.body as ChatRequest

    // Validate request body
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" })
    }
    if (!mode) {
      return res.status(400).json({ error: "Mode is required" })
    }

    // AUTHORIZATION. A tutoring turn is ABOUT a specific child, and the prompt is
    // built from that child's name, grade, and level. Confirm the caller owns them
    // before Nikki says anything, and then take those three fields from the
    // DATABASE rather than from the request body, so a caller cannot authorize with
    // their own child's id while passing another child's details.
    let effectiveContext = context
    if (mode === "kid-tutor") {
      if (!(await requireOwnedStudent(res, auth, studentId))) return
      const { data: row } = await auth.svc
        .from("students")
        .select("first_name, grade, level")
        .eq("id", studentId as string)
        .maybeSingle()
      if (row && context) {
        effectiveContext = {
          ...context,
          childName: row.first_name ?? context.childName,
          grade: row.grade ?? context.grade,
          level: row.level ?? context.level,
        }
      }
    }

    // Claude takes the system prompt in a dedicated top-level field — only
    // user/assistant turns go in the messages array.
    const systemPrompt = getCombinedSystemPrompt(mode, effectiveContext)

    const anthropicMessages: Anthropic.MessageParam[] = messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }))

    // Attach an optional image to the final user turn so vision works. The
    // base64 stays bound to this server request; the API key never leaves here.
    if (image?.data && anthropicMessages.length > 0) {
      const lastIndex = anthropicMessages.length - 1
      const last = anthropicMessages[lastIndex]
      if (last.role === "user") {
        const text = typeof last.content === "string" ? last.content : ""
        const mediaType =
          (image.mediaType as "image/png" | "image/jpeg" | "image/webp" | "image/gif") || "image/png"
        anthropicMessages[lastIndex] = {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: image.data } },
            { type: "text", text },
          ],
        }
      }
    }

    // Set up SSE headers
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    // Stream from Claude (Sonnet 4.6, no extended thinking) and translate the
    // text deltas into the existing `data: {content}` / `data: [DONE]` SSE shape
    // so the frontend and useNikkiChat hook are untouched.
    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      temperature: 0.7,
      system: systemPrompt,
      messages: anthropicMessages,
    })

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        const content = event.delta.text
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`)
        }
      }
    }

    res.write("data: [DONE]\n\n")
    res.end()
  } catch (error) {
    console.error("Chat API error:", error)

    // Check if headers already sent (streaming started)
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`)
      res.end()
      return
    }

    return res.status(500).json({ error: "Internal server error" })
  }
}
