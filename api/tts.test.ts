import { describe, it, expect } from "vitest"
import { resolveVoiceId } from "./tts.js"

const RACHEL = "21m00Tcm4TlvDq8ikWAM"

describe("resolveVoiceId (voiceId goes into the ElevenLabs URL path)", () => {
  it("uses the configured Nikki voice when none is requested", () => {
    expect(resolveVoiceId(undefined, "nikkiVoice123")).toBe("nikkiVoice123")
    expect(resolveVoiceId("", "nikkiVoice123")).toBe("nikkiVoice123")
  })

  it("falls back to the default voice when none is configured", () => {
    expect(resolveVoiceId(undefined, undefined)).toBe(RACHEL)
  })

  it("accepts the configured voice and the default by name", () => {
    expect(resolveVoiceId("nikkiVoice123", "nikkiVoice123")).toBe("nikkiVoice123")
    expect(resolveVoiceId(RACHEL, "nikkiVoice123")).toBe(RACHEL)
  })

  it("refuses anything else, including path tricks", () => {
    expect(resolveVoiceId("someOtherVoice", "nikkiVoice123")).toBeNull()
    expect(resolveVoiceId("../../v1/user", undefined)).toBeNull()
    expect(resolveVoiceId({ id: RACHEL }, undefined)).toBeNull()
  })
})
