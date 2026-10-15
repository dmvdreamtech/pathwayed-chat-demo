// Whether Nikki's avatar in a tutoring session stays large once the
// conversation has started. Per device, like the voice mute preference.
//
// The default is compact: once there is a message, the avatar shrinks to a
// header row so the chat gets the height. A child who taps to make Nikki
// larger keeps that choice on this device until they tap to shrink her again.

const KEY = 'pathwayed.sessionAvatarLarge'

export function getAvatarLarge(): boolean {
  try {
    return typeof localStorage !== 'undefined' && localStorage.getItem(KEY) === '1'
  } catch {
    // localStorage unavailable (private mode): the compact default applies.
    return false
  }
}

export function setAvatarLarge(large: boolean): void {
  try {
    localStorage.setItem(KEY, large ? '1' : '0')
  } catch {
    // Not remembered, but the choice still applies for this visit.
  }
}

/** Compact once the conversation has started, unless the child chose large. */
export function isAvatarCompact(hasMessages: boolean, large: boolean): boolean {
  return hasMessages && !large
}
