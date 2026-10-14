import Anthropic from "@anthropic-ai/sdk"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { buildFlashcardsPrompt, type StudentContext } from "./prompts.js"
import { requireUser, requireLearningAccess } from "./require-auth.js"
import { rateLimit, FLASHCARDS_LIMIT } from "./rate-limit.js"

interface ImageInput {
  data: string // base64, without the data: prefix
  mediaType?: string
}

interface FlashcardsRequest {
  text?: string
  image?: ImageInput
  context?: StudentContext
}

interface Flashcard {
  front: string
  back: string
}

/** Defensively parse a JSON array of {front, back} from the model's reply. */
function parseCards(raw: string): Flashcard[] {
  let text = String(raw).replace(/```json|```/g, "").trim()
  const start = text.indexOf("[")
  const end = text.lastIndexOf("]")
  if (start >= 0 && end > start) text = text.slice(start, end + 1)
  try {
    const parsed: unknown = JSON.parse(text)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (c): c is Flashcard =>
          !!c &&
          typeof (c as Flashcard).front === "string" &&
          typeof (c as Flashcard).back === "string",
      )
      .map((c) => ({ front: c.front, back: c.back }))
      .slice(0, 24)
  } catch {
    return []
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // AUTHENTICATION. Same class as chat: an open LLM generation endpoint that also
  // accepts an image. No child is named in the request, so a session is the check.
  const auth = await requireUser(req, res)
  if (!auth) return
  // Learning features need an active plan, trial or school coverage (0033).
  if (!(await requireLearningAccess(res, auth))) return

  const limited = rateLimit(`flashcards:${auth.userId}`, FLASHCARDS_LIMIT)
  if (!limited.allowed) {
    res.setHeader("Retry-After", String(limited.retryAfterSec))
    return res.status(429).json({ error: "rate_limited", retry_after: limited.retryAfterSec })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: "Anthropic API key not configured" })
  }

  const anthropic = new Anthropic({ apiKey })

  try {
    const { text, image, context } = req.body as FlashcardsRequest

    const trimmed = text?.trim()
    if (!trimmed && !image?.data) {
      return res.status(400).json({ error: "Provide words/topic text or an image" })
    }

    const system = buildFlashcardsPrompt(context)
    const instruction = trimmed
      ? `Make flashcards from this: ${trimmed}`
      : image?.data
        ? "Make flashcards from the words or terms in this image."
        : "Choose a helpful set of grade-appropriate study words and make flashcards."

    const userContent: Anthropic.MessageParam["content"] = image?.data
      ? [
          {
            type: "image",
            source: {
              type: "base64",
              media_type:
                (image.mediaType as "image/png" | "image/jpeg" | "image/webp" | "image/gif") ||
                "image/png",
              data: image.data,
            },
          },
          { type: "text", text: instruction },
        ]
      : instruction

    // Non-streaming: get the full reply, parse JSON server-side, return cards.
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      temperature: 0.5,
      system,
      messages: [{ role: "user", content: userContent }],
    })

    const raw = message.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("")

    return res.status(200).json({ cards: parseCards(raw) })
  } catch (error) {
    console.error("Flashcards API error:", error)
    return res.status(500).json({ error: "Flashcards generation failed" })
  }
}
