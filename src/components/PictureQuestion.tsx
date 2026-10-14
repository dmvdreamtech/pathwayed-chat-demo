import { KidIcon } from '@/components/KidIcon'
import type { PracticeChoice, PicturePrompt } from '@/lib/questions'

interface PictureQuestionProps {
  /** The visual prompt (a group to count), or null for audio-only prompts. */
  prompt: PicturePrompt | null
  /** The answer tiles — numerals or object groups. */
  choices: PracticeChoice[]
  answered: boolean
  selected: number | null
  /** The right tile, from the server's verdict. Null until it arrives, and always
   *  null in the silent diagnostic. */
  correctIndex: number | null
  onPick: (index: number) => void
  /** Practice colors correct/wrong after a tap; the silent diagnostic does not. */
  showState: boolean
}

/**
 * A row of picture icons. `variant` selects the CSS sizing band rather than a
 * pixel size: the icons are viewBox-only SVGs, so `.picq-group svg` scales them
 * against the question card and they stay crisp at any size. Sizing lives in
 * app-screens.css so the evaluation and lesson flows cannot drift apart.
 */
function group(image: string, count: number, variant: 'solo' | 'count' | 'tile') {
  return (
    <span className={`picq-group picq-group-${variant}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <KidIcon key={i} name={image} />
      ))}
    </span>
  )
}

/**
 * The K–2 pre-reader answer UI: a big picture prompt (optional) and large
 * tap-target tiles (a giant numeral, or a group of picture icons). No text the
 * child must read — the prompt is spoken by Nikki (auto-read). Scoring is by the
 * tapped tile index, exactly like the text choices.
 */
export function PictureQuestion({ prompt, choices, answered, selected, correctIndex, onPick, showState }: PictureQuestionProps) {
  return (
    <div className="picq">
      {/* A single word-picture (phonics) shows large; a counting group shows smaller. */}
      {prompt && (
        <div className="picq-prompt">
          {group(prompt.image, prompt.count, prompt.count === 1 ? 'solo' : 'count')}
        </div>
      )}
      <div className="picq-tiles" data-count={choices.length}>
        {choices.map((c, i) => {
          const tile = c.tile
          const state = !showState || !answered ? '' : i === correctIndex ? 'correct' : i === selected ? 'chosen-wrong' : 'dim'
          return (
            <button
              key={i}
              type="button"
              className={`picq-tile ${state}`}
              disabled={answered || selected !== null}
              aria-label={c.text}
              onClick={() => onPick(i)}
            >
              {tile?.kind === 'number' || tile?.kind === 'letter' ? (
                <span className="picq-num">{tile.value}</span>
              ) : tile?.kind === 'object_group' ? (
                group(tile.image, tile.count, 'tile')
              ) : (
                <span className="picq-num">{c.text}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
