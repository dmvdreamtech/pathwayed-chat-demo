import { PictureFigure } from '@/components/PictureFigure'
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
 * The K–2 pre-reader answer UI: a big picture prompt (optional) and large
 * tap-target tiles (a giant numeral, or a group of picture icons). No text the
 * child must read — the prompt is spoken by Nikki (auto-read). Scoring is by the
 * tapped tile index, exactly like the text choices.
 */
export function PictureQuestion({ prompt, choices, answered, selected, correctIndex, onPick, showState }: PictureQuestionProps) {
  return (
    <div className="picq">
      {/* The picture above the tiles: a word-picture, a group to count, a clock, ... */}
      {prompt && (
        <div className="picq-prompt">
          <PictureFigure figure={prompt} place="prompt" />
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
              {tile ? <PictureFigure figure={tile} place="tile" label={c.text} /> : <span className="picq-num">{c.text}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
