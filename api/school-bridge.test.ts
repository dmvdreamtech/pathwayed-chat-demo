import { describe, it, expect } from "vitest"
import { lastNameUpdate } from "./school-bridge"

describe("lastNameUpdate", () => {
  it("writes the console's last name, trimmed", () => {
    expect(lastNameUpdate({ last_name: " Ann Lopez " })).toEqual({ last_name: "Ann Lopez" })
  })
  it("stores a one-word roster name as no last name", () => {
    expect(lastNameUpdate({ last_name: "" })).toEqual({ last_name: null })
  })
  it("leaves the column alone when an older console sends no last name", () => {
    expect(lastNameUpdate({})).toEqual({})
    expect(lastNameUpdate({ last_name: null })).toEqual({})
  })
})
