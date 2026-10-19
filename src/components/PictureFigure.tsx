import { KidIcon } from '@/components/KidIcon'
import type { PicturePrompt, PictureTile } from '@/lib/pictureModel'

/**
 * Draws one K-2 picture: a tile the child taps, or the prompt above the tiles.
 * Everything is inline SVG or a KidIcon, so nothing loads from outside and each
 * picture scales with the card (see the .picq rules in app-screens.css).
 *
 * `place` picks the sizing band: 'prompt' is large, 'tile' fits a 2-column grid.
 */
type Place = 'prompt' | 'tile'

const NAVY = '#1e3a6e'

function Group({ image, count, variant }: { image: string; count: number; variant: 'solo' | 'count' | 'tile' }) {
  return (
    <span className={`picq-group picq-group-${variant}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <KidIcon key={i} name={image} />
      ))}
    </span>
  )
}

function Clock({ hour, minute }: { hour: number; minute: number }) {
  const minAngle = (minute / 60) * 360
  const hourAngle = ((hour % 12) / 12) * 360 + (minute / 60) * 30
  const hand = (angle: number, length: number) => {
    const r = (angle - 90) * (Math.PI / 180)
    return { x2: 50 + length * Math.cos(r), y2: 50 + length * Math.sin(r) }
  }
  return (
    <svg className="picq-svg" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="#fff" stroke={NAVY} strokeWidth="4" />
      {Array.from({ length: 60 }, (_, i) => {
        const r = (i * 6 - 90) * (Math.PI / 180)
        const inner = i % 5 === 0 ? 37 : 40
        return (
          <line key={i} x1={50 + inner * Math.cos(r)} y1={50 + inner * Math.sin(r)} x2={50 + 42 * Math.cos(r)} y2={50 + 42 * Math.sin(r)}
            stroke={NAVY} strokeWidth={i % 5 === 0 ? 2 : 0.8} />
        )
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const n = i + 1
        const r = (n * 30 - 90) * (Math.PI / 180)
        return (
          <text key={n} x={50 + 29 * Math.cos(r)} y={50 + 29 * Math.sin(r) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={NAVY}>
            {n}
          </text>
        )
      })}
      <line x1="50" y1="50" {...hand(hourAngle, 20)} stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
      <line x1="50" y1="50" {...hand(minAngle, 33)} stroke="#e85a24" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="50" r="3.5" fill={NAVY} />
    </svg>
  )
}

function BaseTen({ hundreds = 0, tens, ones }: { hundreds?: number; tens: number; ones: number }) {
  const U = 6
  const parts: React.ReactNode[] = []
  let x = 2
  for (let h = 0; h < hundreds; h++) {
    parts.push(
      <g key={`h${h}`}>
        {Array.from({ length: 100 }, (_, k) => (
          <rect key={k} x={x + (k % 10) * U} y={2 + Math.floor(k / 10) * U} width={U} height={U} fill="#7cb5f0" stroke={NAVY} strokeWidth="0.6" />
        ))}
      </g>,
    )
    x += 10 * U + 5
  }
  for (let t = 0; t < tens; t++) {
    parts.push(
      <g key={`t${t}`}>
        {Array.from({ length: 10 }, (_, k) => (
          <rect key={k} x={x} y={2 + k * U} width={U} height={U} fill="#f6c443" stroke={NAVY} strokeWidth="0.6" />
        ))}
      </g>,
    )
    x += U + 4
  }
  const onesStart = x + (tens || hundreds ? 3 : 0)
  for (let o = 0; o < ones; o++) {
    const col = Math.floor(o / 5)
    const row = o % 5
    parts.push(<rect key={`o${o}`} x={onesStart + col * (U + 3)} y={2 + 10 * U - (row + 1) * (U + 3) + 3} width={U} height={U} fill="#7bd389" stroke={NAVY} strokeWidth="0.6" />)
  }
  const width = onesStart + (ones ? (Math.floor((ones - 1) / 5) + 1) * (U + 3) : 0) + 2
  return (
    <svg className="picq-svg picq-svg-wide" viewBox={`0 0 ${Math.max(width, 20)} ${10 * U + 4}`} aria-hidden="true">
      {parts}
    </svg>
  )
}

function ArrayOf({ image, rows, cols }: { image: string; rows: number; cols: number }) {
  return (
    <span className="picq-array" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }} aria-hidden="true">
      {Array.from({ length: rows * cols }, (_, i) => (
        <KidIcon key={i} name={image} />
      ))}
    </span>
  )
}

/** A shape cut into parts. Equal parts are wedges (circle) or strips; unequal
 *  parts use deliberately different widths, for "which shows halves?" items. */
function Fraction({ shape, parts, shaded, equal = true }: { shape: 'circle' | 'square' | 'rectangle'; parts: number; shaded: number; equal?: boolean }) {
  const fillOf = (i: number) => (i < shaded ? '#f6a33a' : '#fff')
  const w = shape === 'rectangle' ? 140 : 100
  const h = 100
  if (shape === 'circle') {
    const cuts = equal ? Array.from({ length: parts + 1 }, (_, i) => (i / parts) * 360) : unequalCuts(parts).map((f) => f * 360)
    const pt = (deg: number) => {
      const r = (deg - 90) * (Math.PI / 180)
      return `${50 + 45 * Math.cos(r)} ${50 + 45 * Math.sin(r)}`
    }
    return (
      <svg className="picq-svg" viewBox="0 0 100 100" aria-hidden="true">
        {parts === 1 ? (
          <circle cx="50" cy="50" r="45" fill={fillOf(0)} stroke={NAVY} strokeWidth="2.5" />
        ) : (
          cuts.slice(0, -1).map((a, i) => (
            <path key={i} d={`M50 50 L${pt(a)} A45 45 0 ${cuts[i + 1] - a > 180 ? 1 : 0} 1 ${pt(cuts[i + 1])} Z`} fill={fillOf(i)} stroke={NAVY} strokeWidth="2.5" />
          ))
        )}
      </svg>
    )
  }
  const cuts = equal ? Array.from({ length: parts + 1 }, (_, i) => i / parts) : unequalCuts(parts)
  return (
    <svg className="picq-svg" viewBox={`0 0 ${w + 10} ${h + 10}`} aria-hidden="true">
      {cuts.slice(0, -1).map((c, i) => (
        <rect key={i} x={5 + c * w} y={5} width={(cuts[i + 1] - c) * w} height={h} fill={fillOf(i)} stroke={NAVY} strokeWidth="2.5" />
      ))}
    </svg>
  )
}

/** Cut points for visibly unequal parts (fractions of the whole, 0 to 1). */
function unequalCuts(parts: number): number[] {
  const weights = Array.from({ length: parts }, (_, i) => (i % 2 === 0 ? 1 : 2.2))
  const total = weights.reduce((a, b) => a + b, 0)
  const out = [0]
  weights.forEach((wt) => out.push(out[out.length - 1] + wt / total))
  out[out.length - 1] = 1
  return out
}

/** Length: a bar exactly `units` cubes long, labelled with its picture, over a
 *  row of unit cubes on the same 12-cube scale, so the child counts the cubes. */
function Measure({ image, units }: { image: string; units: number }) {
  const U = 10
  return (
    <svg className="picq-svg picq-measure" viewBox={`0 0 ${12 * U + 2} 40`} aria-hidden="true">
      <rect x="1" y="2" width={units * U} height="16" rx="5" fill="#f6c443" stroke={NAVY} strokeWidth="1.5" />
      <g transform={`translate(${1 + (units * U) / 2 - 8} 1)`}>
        <KidIcon name={image} size={18} />
      </g>
      {Array.from({ length: units }, (_, i) => (
        <rect key={i} x={1 + i * U + 0.5} y="24" width={U - 1} height={U - 1} rx="1.5" fill="#7bd389" stroke={NAVY} strokeWidth="1" />
      ))}
    </svg>
  )
}

function Rows({ rows, labels = true }: { rows: { image: string; count: number }[]; labels?: boolean }) {
  return (
    <span className="picq-rows" aria-hidden="true">
      {rows.map((r, i) => (
        <span key={i} className="picq-row">
          {labels && (
            <span className="picq-row-key">
              <KidIcon name={r.image} />
            </span>
          )}
          <span className="picq-row-items">
            {Array.from({ length: r.count }, (_, k) => (
              <KidIcon key={k} name={r.image} />
            ))}
          </span>
        </span>
      ))}
    </span>
  )
}

export function PictureFigure({ figure, place, label }: { figure: PictureTile | PicturePrompt; place: Place; label?: string }) {
  switch (figure.kind) {
    case 'number':
    case 'letter':
      return <span className="picq-num">{figure.value}</span>
    case 'word':
      return <span className={`picq-word ${figure.value.length > 8 ? 'picq-word-long' : ''}`}>{figure.value}</span>
    case 'object_group':
      return <Group image={figure.image} count={figure.count} variant={place === 'tile' ? 'tile' : figure.count === 1 ? 'solo' : 'count'} />
    case 'clock':
      return <Clock hour={figure.hour} minute={figure.minute} />
    case 'base_ten':
      return <BaseTen hundreds={figure.hundreds} tens={figure.tens} ones={figure.ones} />
    case 'array':
      return <ArrayOf image={figure.image} rows={figure.rows} cols={figure.cols} />
    case 'fraction':
      return <Fraction shape={figure.shape} parts={figure.parts} shaded={figure.shaded} equal={figure.equal !== false} />
    case 'measure':
      return <Measure image={figure.image} units={figure.units} />
    case 'object_rows':
      return <Rows rows={figure.rows} labels={figure.labels !== false} />
    default:
      return <span className="picq-num">{label ?? ''}</span>
  }
}
