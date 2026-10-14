import OpenAI, { toFile } from "openai"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { SESSION_LANGUAGE } from "./prompts.js"
import { requireUser, requireLearningAccess } from "./require-auth.js"
import { rateLimit, TRANSCRIBE_LIMIT } from "./rate-limit.js"

interface TranscribeRequest {
  audio: string // base64-encoded audio
  mimeType: string
  /** Optional context-biasing prompt (child's name + subject vocabulary) to
   *  improve accuracy on short, soft kid utterances. Whisper-family models use
   *  roughly the last 224 tokens, so callers keep this short. */
  prompt?: string
}

// Stock phrases the Whisper-family models emit when handed silence or noise.
// They are memorized from the YouTube-heavy training set, not heard in the
// audio. Matched case-insensitively as substrings.
const HALLUCINATION_PHRASES = [
  "thank you for watching",
  "please subscribe",
  "thanks for watching",
]

// Characters that legitimately appear in an English tutoring answer. Anything
// outside this set (Japanese kana, Devanagari, CJK) is the model language-hopping
// on unclear audio rather than transcribing what the child said.
// The en and em dash code points are emitted by the model in real
// English transcripts, so they count as Latin rather than pushing a line under
// the ratio. Written as escapes to keep literal dash characters out of the source.
const LATIN_CHAR = /[A-Za-z0-9\s.,!?'"()[\]{}\-\u2013\u2014:;/\\%$&+=*@#°^|~`]/
const MIN_LATIN_RATIO = 0.7

/**
 * True when a transcript should be treated as "no speech" rather than returned
 * to the child's chat: empty, mostly non-Latin, or a known hallucination.
 */
export function isNoSpeech(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed) return true

  const lower = trimmed.toLowerCase()
  if (HALLUCINATION_PHRASES.some((phrase) => lower.includes(phrase))) return true

  // Count by code point so a single CJK/emoji character is not double-counted.
  const chars = Array.from(trimmed)
  const latin = chars.filter((c) => LATIN_CHAR.test(c)).length
  return latin / chars.length < MIN_LATIN_RATIO
}

/** Map MIME types to file extensions for the OpenAI API */
function getExtension(mimeType: string): string {
  if (mimeType.startsWith("audio/webm")) return "webm"
  if (mimeType.startsWith("audio/mp4")) return "m4a"
  if (mimeType.startsWith("audio/wav")) return "wav"
  if (mimeType.startsWith("audio/mpeg")) return "mp3"
  return "webm"
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // AUTHENTICATION. This was an open Whisper proxy billed per second of audio, and
  // it accepts a 25MB upload, so it was the most expensive open endpoint per call.
  // A transcription request names no child (audio in, text out), so there is no
  // ownership check to make; the session requirement is what closes it.
  const auth = await requireUser(req, res)
  if (!auth) return
  // Learning features need an active plan, trial or school coverage (0033).
  if (!(await requireLearningAccess(res, auth))) return

  const limited = rateLimit(`transcribe:${auth.userId}`, TRANSCRIBE_LIMIT)
  if (!limited.allowed) {
    res.setHeader("Retry-After", String(limited.retryAfterSec))
    return res.status(429).json({ error: "rate_limited", retry_after: limited.retryAfterSec })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: "OpenAI API key not configured" })
  }

  const openai = new OpenAI({ apiKey })

  try {
    const { audio, mimeType, prompt } = req.body as TranscribeRequest

    if (!audio || !mimeType) {
      return res.status(400).json({ error: "audio (base64) and mimeType are required" })
    }

    // Defensive cap: the model only reads ~224 tokens of prompt, and callers aim
    // for under ~200. A client sending more would just be truncated by the API,
    // but trim it anyway (~800 chars is comfortably under the token ceiling).
    const biasPrompt = typeof prompt === "string" ? prompt.trim().slice(0, 800) : ""

    const buffer = Buffer.from(audio, "base64")

    // Validate size (25MB limit for Whisper)
    if (buffer.length > 25 * 1024 * 1024) {
      return res.status(400).json({ error: "Audio file too large. Maximum size is 25MB." })
    }

    const ext = getExtension(mimeType)
    const file = await toFile(buffer, `recording.${ext}`, { type: mimeType })

    const transcription = await openai.audio.transcriptions.create({
      file,
      // gpt-4o-transcribe (the full model, not the mini) is OpenAI's most accurate
      // transcription model, and its edge over mini shows up precisely on the hard
      // audio here: soft/disfluent young-kid speech and short numeric utterances
      // (bare "9"/"32" and operation phrases like "subtract five"). Same request
      // shape as before — file + language + prompt, returns { text } by default —
      // so the rest of the pipeline is untouched.
      model: "gpt-4o-transcribe",
      // Locked to the session language (see SESSION_LANGUAGE) — auto-detect on
      // short kid utterances is a known source of wrong-language transcripts.
      language: SESSION_LANGUAGE.whisper,
      // Context biasing: the child's name and the active lesson's vocabulary,
      // so homophones and proper nouns resolve toward this lesson's words.
      ...(biasPrompt ? { prompt: biasPrompt } : {}),
    })

    // Gate the transcript before it can reach the chat. A rejected transcript
    // comes back as { noSpeech: true } with no text, so the client shows the
    // retry cue instead of sending a hallucinated message to Nikki.
    const text = transcription.text ?? ""
    if (isNoSpeech(text)) {
      console.warn("Transcribe rejected as no-speech:", JSON.stringify(text.slice(0, 120)))
      return res.status(200).json({ noSpeech: true })
    }

    return res.status(200).json({ text })
  } catch (error) {
    console.error("Transcribe API error:", error)
    return res.status(500).json({ error: "Transcription failed" })
  }
}
