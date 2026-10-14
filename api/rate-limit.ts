/**
 * Per-user rate limiting for the LLM endpoints.
 *
 * IN-MEMORY, AND HONEST ABOUT WHAT THAT BUYS. State lives in the serverless
 * instance, so the effective ceiling is (limit x number of warm instances) rather
 * than a hard global cap, and it resets on cold start. That is a real limitation,
 * not a detail: this stops a runaway client, a stuck retry loop, and casual abuse.
 * It does NOT stop a determined attacker who can force fan-out across instances.
 *
 * It is deliberately the cheap version: no table, no migration, no Redis
 * dependency, no extra round trip on a latency-sensitive streaming path. Combined
 * with requiring a valid Supabase session it removes the open-endpoint problem;
 * a durable global limiter is a separate, larger piece of work (see the report).
 */

interface Window {
  count: number
  resetAt: number
}

const buckets = new Map<string, Window>()

/** Requests allowed per user per window. */
export const CHAT_LIMIT = 30
/** Window length. A tutoring turn every 2 seconds sustained is already abnormal. */
export const CHAT_WINDOW_MS = 60_000

/**
 * Speech is chattier than chat by design: one tutoring turn can fire a streamed
 * read, a replay, and the prefetch of several common phrases, and the K-2
 * audio-picture flows read every question and every answer tile aloud.
 */
export const TTS_LIMIT = 120
/** Each call is a recorded utterance, so this tracks how fast a child can talk. */
export const TRANSCRIBE_LIMIT = 40
/** A deck is generated in one shot; nobody needs many per minute. */
export const FLASHCARDS_LIMIT = 10
/** Checkout and the billing portal are not hot paths. A human clicks these once. */
export const BILLING_LIMIT = 5
/**
 * Keyed per ESSAY, not per user. One essay earns a few feedback runs however many
 * times it is re-requested, and grading an essay is the most expensive single LLM
 * call in the product.
 */
export const ESSAY_FEEDBACK_LIMIT = 3
/**
 * A readiness recompute runs after a practice set, a placement, and when a parent
 * opens the dashboard on stale rows. A parent with several children paging
 * through them stays well under this.
 */
export const READINESS_LIMIT = 30

/** Drop expired buckets so a long-lived instance does not grow unboundedly. */
function sweep(now: number) {
  if (buckets.size < 512) return
  for (const [k, w] of buckets) if (w.resetAt <= now) buckets.delete(k)
}

export interface RateLimitResult {
  allowed: boolean
  /** Seconds until the window resets, for a Retry-After header. */
  retryAfterSec: number
  remaining: number
}

/**
 * Consume one unit for `key`. Returns whether the call is allowed and how long
 * until the window resets.
 */
export function rateLimit(
  key: string,
  limit: number = CHAT_LIMIT,
  windowMs: number = CHAT_WINDOW_MS,
  now: number = Date.now(),
): RateLimitResult {
  sweep(now)
  const existing = buckets.get(key)
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterSec: 0, remaining: limit - 1 }
  }
  existing.count += 1
  const retryAfterSec = Math.max(1, Math.ceil((existing.resetAt - now) / 1000))
  if (existing.count > limit) {
    return { allowed: false, retryAfterSec, remaining: 0 }
  }
  return { allowed: true, retryAfterSec, remaining: Math.max(0, limit - existing.count) }
}

/** Test seam: forget all windows. */
export function resetRateLimits() {
  buckets.clear()
}
