import { type NikkiOrbState } from '@/components/NikkiOrb'
import { NikkiFace } from '@/components/NikkiFace'
import type { AvatarMode } from '@/lib/students'

export type CallState = NikkiOrbState // 'idle' | 'thinking' | 'speaking'

const LARGE = 240
const COMPACT = 40

/**
 * The Nikki "call stage" at the top of the chat pane. Nikki's visual presence
 * follows the child's chosen avatar mode (video / orb / voice nameplate) with
 * her name and a live status line beside or beneath it.
 *
 * Large before the conversation starts. Once there are messages the session
 * passes `compact`, and the stage shrinks to a header row so the chat feed
 * gets the height. The face is never remounted: it renders once at full size
 * and is scaled, so the video keeps playing and the speaking animation carries
 * on at the small size. `onToggle` adds the small button that switches sizes.
 */
export function CallStage({
  state,
  mode = 'video',
  compact = false,
  onToggle,
}: {
  state: CallState
  mode?: AvatarMode
  compact?: boolean
  onToggle?: () => void
}) {
  const status = state === 'thinking' ? 'Thinking…' : state === 'speaking' ? 'Speaking…' : 'Here with you'
  const scale = compact ? COMPACT / LARGE : 1

  return (
    <div className={`callstage${compact ? ' compact' : ''}`} data-state={state}>
      <div className="callstage-face" style={{ width: LARGE * scale, height: LARGE * scale }}>
        <div className="callstage-face-inner" style={{ transform: `scale(${scale})` }}>
          <NikkiFace mode={mode} size={LARGE} state={state} />
        </div>
      </div>
      <div className="callstage-text">
        <div className="callname">Nikki</div>
        <div className="navstatus" aria-live="polite">
          {status}
        </div>
      </div>
      {onToggle && (
        <button
          type="button"
          className="callstage-toggle"
          onClick={onToggle}
          aria-label={compact ? 'Show Nikki larger' : 'Make Nikki smaller'}
          title={compact ? 'Show Nikki larger' : 'Make Nikki smaller'}
          aria-expanded={!compact}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {compact ? <path d="M6 9l6 6 6-6" /> : <path d="M6 15l6-6 6 6" />}
          </svg>
        </button>
      )}
    </div>
  )
}
