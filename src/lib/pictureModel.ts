/**
 * The K-2 picture-tap model: what a tile (an answer the child taps) and a prompt
 * (the picture shown above the tiles) can be. One definition, used by the app
 * (parsing and rendering), by the content checker and by the seed builder, so a
 * draft that passes the checks always renders.
 *
 * Every kind is drawn by the app itself (inline SVG, no image files):
 *   number / letter   a big numeral or letter
 *   word              a word or a short sentence (grade 1-2 reading and writing)
 *   object_group      N copies of one picture (KidIcon)
 *   clock             an analog clock at hour:minute
 *   base_ten          hundreds flats, tens rods and ones cubes
 *   array             rows x cols of one picture
 *   fraction          a circle, square or rectangle cut into parts, some shaded
 *   measure           a picture with a row of unit cubes under it (length)
 *   object_rows       rows of pictures, one row per kind: a picture graph (each row
 *                     starts with a faded label), or with labels: false just the
 *                     groups ("3 apples and 5 pears")
 */
import { KID_IMAGES, type KidImage } from './kidImages'

export type FractionShape = 'circle' | 'square' | 'rectangle'

export type PictureTile =
  | { kind: 'number' | 'letter' | 'word'; value: string }
  | { kind: 'object_group'; image: string; count: number }
  | { kind: 'clock'; hour: number; minute: number }
  | { kind: 'base_ten'; hundreds?: number; tens: number; ones: number }
  | { kind: 'array'; image: string; rows: number; cols: number }
  | { kind: 'fraction'; shape: FractionShape; parts: number; shaded: number; equal?: boolean }
  | { kind: 'measure'; image: string; units: number }

export type PicturePrompt =
  | Exclude<PictureTile, { kind: 'number' | 'letter' }>
  | { kind: 'object_rows'; rows: { image: string; count: number }[]; labels?: boolean }

const isInt = (v: unknown, lo: number, hi: number): v is number => typeof v === 'number' && Number.isInteger(v) && v >= lo && v <= hi
const isImage = (v: unknown): v is KidImage => typeof v === 'string' && (KID_IMAGES as readonly string[]).includes(v)
const isShape = (v: unknown): v is FractionShape => v === 'circle' || v === 'square' || v === 'rectangle'

/** The picture as it is stored, or undefined when it is not one the app can draw. */
export function parsePictureTile(raw: unknown): PictureTile | undefined {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return undefined
  const t = raw as Record<string, unknown>
  switch (t.kind) {
    case 'number':
    case 'letter':
    case 'word':
      return typeof t.value === 'string' && t.value.trim() ? { kind: t.kind, value: t.value } : undefined
    case 'object_group':
      return isImage(t.image) && isInt(t.count, 1, 20) ? { kind: 'object_group', image: t.image, count: t.count } : undefined
    case 'clock':
      return isInt(t.hour, 1, 12) && isInt(t.minute, 0, 59) ? { kind: 'clock', hour: t.hour, minute: t.minute } : undefined
    case 'base_ten':
      return isInt(t.tens, 0, 9) && isInt(t.ones, 0, 19) && (t.hundreds === undefined || isInt(t.hundreds, 0, 9))
        ? { kind: 'base_ten', tens: t.tens, ones: t.ones, ...(t.hundreds ? { hundreds: t.hundreds as number } : {}) }
        : undefined
    case 'array':
      return isImage(t.image) && isInt(t.rows, 1, 5) && isInt(t.cols, 1, 5)
        ? { kind: 'array', image: t.image, rows: t.rows, cols: t.cols }
        : undefined
    case 'fraction':
      return isShape(t.shape) && isInt(t.parts, 1, 8) && isInt(t.shaded, 0, t.parts as number)
        ? { kind: 'fraction', shape: t.shape, parts: t.parts as number, shaded: t.shaded as number, ...(t.equal === false ? { equal: false } : {}) }
        : undefined
    case 'measure':
      return isImage(t.image) && isInt(t.units, 1, 12) ? { kind: 'measure', image: t.image, units: t.units } : undefined
    default:
      return undefined
  }
}

export function parsePicturePrompt(raw: unknown): PicturePrompt | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const p = raw as Record<string, unknown>
  if (p.kind === 'object_rows') {
    if (!Array.isArray(p.rows) || p.rows.length < 1 || p.rows.length > 4) return null
    const rows = p.rows.map((r) => (r && typeof r === 'object' ? (r as Record<string, unknown>) : {}))
    return rows.every((r) => isImage(r.image) && isInt(r.count, 0, 10))
      ? { kind: 'object_rows', rows: rows.map((r) => ({ image: r.image as string, count: r.count as number })), ...(p.labels === false ? { labels: false } : {}) }
      : null
  }
  if (p.kind === 'number' || p.kind === 'letter') return null
  return (parsePictureTile(p) as PicturePrompt | undefined) ?? null
}

/** Why a stored tile or prompt would not render, in plain words (empty when it will). */
export function pictureIssues(raw: unknown, as: 'tile' | 'prompt'): string[] {
  const kind = raw && typeof raw === 'object' ? (raw as { kind?: unknown }).kind : undefined
  const ok = as === 'tile' ? parsePictureTile(raw) !== undefined : parsePicturePrompt(raw) !== null
  if (ok) {
    if (kind === 'word' && String((raw as { value: string }).value).length > 60) return [`a word ${as} is over 60 characters`]
    return []
  }
  if (typeof kind !== 'string') return [`the ${as} has no kind`]
  const img = (raw as { image?: unknown; rows?: { image?: unknown }[] }).image
  if (img !== undefined && !isImage(img)) return [`the ${as} uses the picture "${String(img)}", which is not in KID_IMAGES`]
  if (kind === 'object_rows') {
    const bad = ((raw as { rows?: { image?: unknown }[] }).rows ?? []).find((r) => !isImage(r?.image))
    if (bad) return [`the ${as} uses the picture "${String(bad?.image)}", which is not in KID_IMAGES`]
  }
  return [`the ${as} (${kind}) is not one the app can draw, or a number in it is out of range`]
}

/** The spoken label a tile should carry, when it has one fixed by its picture. */
export function tileLabel(t: PictureTile): string | undefined {
  switch (t.kind) {
    case 'number':
    case 'letter':
    case 'word':
      return t.value
    default:
      return undefined
  }
}

/**
 * What the app SAYS for a K-2 picture item: the stem, then "Your choices are: ..."
 * ONLY when every tile is a single named picture (dog, cat, ball), so a child who
 * cannot read hears what the pictures are. Every other tile is the thing being
 * read: a numeral, a letter, a word, a counted group, blocks, a clock. Saying its
 * label in tile order would give the answer away ("Tap the word the" then "the,
 * and, to"; "How many?" then "3, 4, 5"), so those labels stay silent.
 */
export function spokenPictureItem(stem: string, choices: { text: string; tile?: PictureTile }[]): string {
  const named = choices.length > 0 && choices.every((c) => c.tile?.kind === 'object_group' && c.tile.count === 1)
  const labels = choices.map((c) => c.text).filter(Boolean)
  return named && labels.length ? `${stem} Your choices are: ${labels.join(', ')}.` : stem
}
