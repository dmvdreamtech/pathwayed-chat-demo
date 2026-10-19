/**
 * KidIcon — the curated, controlled illustration set for K–2 pre-reader items.
 * Hand-drawn inline SVGs (no external files, no generation): safe, consistent,
 * offline, CSP-friendly, and crisp at any size. The first set lives here; the
 * rest are in src/components/kidIcons/, one file per group. Add a picture by
 * drawing it in a group file and adding its name to src/lib/kidImages.ts.
 */
import { EXTRA_ICONS } from './kidIcons'

type IconName =
  | 'apple' | 'star' | 'ball' | 'flower' | 'duck' | 'fish'
  // Phonics word pictures (beginning-sound proof).
  | 'cat' | 'gift' | 'hat' | 'key' | 'leaf' | 'moon' | 'pig' | 'ring' | 'sun' | 'tree' | 'van'
  // Deepening set — more familiar K words (clean single-consonant onsets).
  | 'house' | 'cap' | 'bus' | 'door' | 'jet' | 'net' | 'web' | 'yoyo' | 'sock' | 'mug' | 'pot' | 'kite' | 'tent'
  // 2-D shapes (K.G) — 'star' above is reused as a shape.
  | 'circle' | 'square' | 'triangle' | 'rectangle' | 'oval' | 'diamond' | 'hexagon' | 'heart'
  // Coins (2.MD money).
  | 'penny' | 'nickel' | 'dime' | 'quarter'

const PATHS: Record<IconName, { fill: string; svg: React.ReactNode }> = {
  apple: {
    fill: '#e5443b',
    svg: (
      <>
        <path d="M32 20c-4-6-12-6-16-2-5 5-4 16 2 24 3 4 7 8 14 8s11-4 14-8c6-8 7-19 2-24-4-4-12-4-16 2z" />
        <path d="M32 20c0-6 3-10 8-11" fill="none" stroke="#7a4a2b" strokeWidth="3" strokeLinecap="round" />
        <path d="M34 15c4-4 10-4 12 0-3 4-9 4-12 0z" fill="#5aa02c" />
      </>
    ),
  },
  star: {
    fill: '#f4b400',
    svg: <path d="M32 6l7 15 16 2-12 11 3 16-14-8-14 8 3-16L9 23l16-2z" />,
  },
  ball: {
    fill: '#3b7de5',
    svg: (
      <>
        <circle cx="32" cy="32" r="24" />
        <path d="M12 26c14 6 26 6 40 0M12 38c14-6 26-6 40 0M32 8v48" fill="none" stroke="#fff" strokeWidth="3" />
      </>
    ),
  },
  flower: {
    fill: '#e5679b',
    svg: (
      <>
        <circle cx="32" cy="14" r="9" />
        <circle cx="50" cy="32" r="9" />
        <circle cx="32" cy="50" r="9" />
        <circle cx="14" cy="32" r="9" />
        <circle cx="32" cy="32" r="8" fill="#f4b400" />
      </>
    ),
  },
  duck: {
    fill: '#f4b400',
    svg: (
      <>
        <ellipse cx="30" cy="40" rx="20" ry="13" />
        <circle cx="46" cy="26" r="10" />
        <path d="M54 25l8 2-8 4z" fill="#e58a24" />
        <circle cx="48" cy="24" r="2" fill="#2b2b2b" />
      </>
    ),
  },
  fish: {
    fill: '#2ca9a1',
    svg: (
      <>
        <ellipse cx="28" cy="32" rx="20" ry="12" />
        <path d="M48 32l14-9v18z" />
        <circle cx="18" cy="29" r="2.5" fill="#fff" />
      </>
    ),
  },
  cat: {
    fill: '#8a8f98',
    svg: (
      <>
        <path d="M14 22l3-12 12 9z" />
        <path d="M50 22l-3-12-12 9z" />
        <circle cx="32" cy="38" r="18" />
        <circle cx="26" cy="36" r="2.5" fill="#2b2b2b" />
        <circle cx="38" cy="36" r="2.5" fill="#2b2b2b" />
        <path d="M32 40l-3 4h6z" fill="#e5679b" />
      </>
    ),
  },
  gift: {
    fill: '#cc543c',
    svg: (
      <>
        <rect x="12" y="26" width="40" height="28" rx="2" />
        <rect x="28" y="26" width="8" height="28" fill="#f4b400" />
        <rect x="12" y="36" width="40" height="8" fill="#f4b400" />
        <circle cx="27" cy="22" r="6" fill="#f4b400" />
        <circle cx="37" cy="22" r="6" fill="#f4b400" />
      </>
    ),
  },
  hat: {
    fill: '#3b3f4a',
    svg: (
      <>
        <rect x="18" y="14" width="28" height="30" rx="2" />
        <rect x="18" y="36" width="28" height="7" fill="#cc543c" />
        <ellipse cx="32" cy="46" rx="26" ry="6" />
      </>
    ),
  },
  key: {
    fill: '#f4b400',
    svg: (
      <>
        <circle cx="20" cy="32" r="13" />
        <circle cx="20" cy="32" r="5" fill="#fff" />
        <rect x="30" y="28" width="28" height="8" />
        <rect x="50" y="36" width="5" height="9" />
        <rect x="42" y="36" width="5" height="9" />
      </>
    ),
  },
  leaf: {
    fill: '#5aa02c',
    svg: (
      <>
        <path d="M32 8C16 20 12 44 32 56 52 44 48 20 32 8z" />
        <path d="M32 12v42" fill="none" stroke="#3a7a1e" strokeWidth="2.5" />
      </>
    ),
  },
  moon: {
    fill: '#f4c84b',
    svg: <path d="M42 8a24 24 0 1 0 0 48A36 36 0 0 1 42 8z" />,
  },
  pig: {
    fill: '#e58aa0',
    svg: (
      <>
        <path d="M18 20l-3-9 11 5z" />
        <path d="M46 20l3-9-11 5z" />
        <circle cx="32" cy="36" r="18" />
        <ellipse cx="32" cy="42" rx="9" ry="6" fill="#d46a86" />
        <circle cx="29" cy="42" r="1.6" fill="#7a3a4a" />
        <circle cx="35" cy="42" r="1.6" fill="#7a3a4a" />
        <circle cx="26" cy="33" r="2" fill="#2b2b2b" />
        <circle cx="38" cy="33" r="2" fill="#2b2b2b" />
      </>
    ),
  },
  ring: {
    fill: '#f4b400',
    svg: (
      <>
        <circle cx="32" cy="40" r="16" fill="none" stroke="#f4b400" strokeWidth="6" />
        <path d="M32 8l9 11-9 9-9-9z" fill="#3b7de5" />
      </>
    ),
  },
  sun: {
    fill: '#f4b400',
    svg: (
      <>
        <g stroke="#f4b400" strokeWidth="4" strokeLinecap="round">
          <path d="M32 4v10M32 50v10M4 32h10M50 32h10M12 12l7 7M45 45l7 7M52 12l-7 7M19 45l-7 7" />
        </g>
        <circle cx="32" cy="32" r="14" />
      </>
    ),
  },
  tree: {
    fill: '#5aa02c',
    svg: (
      <>
        <rect x="28" y="36" width="8" height="20" fill="#7a4a2b" />
        <circle cx="32" cy="26" r="18" />
      </>
    ),
  },
  van: {
    fill: '#3b7de5',
    svg: (
      <>
        <rect x="8" y="24" width="48" height="22" rx="5" />
        <rect x="12" y="28" width="14" height="10" rx="2" fill="#bcd6f5" />
        <circle cx="20" cy="48" r="5" fill="#2b2b2b" />
        <circle cx="44" cy="48" r="5" fill="#2b2b2b" />
      </>
    ),
  },
  house: {
    fill: '#cc6b3a',
    svg: (
      <>
        <path d="M32 12 56 32H8z" />
        <rect x="16" y="30" width="32" height="22" />
        <rect x="28" y="40" width="9" height="12" fill="#7a4a2b" />
      </>
    ),
  },
  cap: {
    fill: '#c0392b',
    svg: (
      <>
        <path d="M16 38a16 15 0 0 1 32 0z" />
        <path d="M46 38h11a2 2 0 0 1 0 5H46z" />
        <circle cx="32" cy="24" r="2.5" />
      </>
    ),
  },
  bus: {
    fill: '#e0a52e',
    svg: (
      <>
        <rect x="8" y="18" width="48" height="28" rx="5" />
        <rect x="12" y="23" width="9" height="9" rx="1" fill="#cde6f5" />
        <rect x="25" y="23" width="9" height="9" rx="1" fill="#cde6f5" />
        <rect x="38" y="23" width="12" height="9" rx="1" fill="#cde6f5" />
        <circle cx="20" cy="48" r="5" fill="#2b2b2b" />
        <circle cx="44" cy="48" r="5" fill="#2b2b2b" />
      </>
    ),
  },
  door: {
    fill: '#8a5a2b',
    svg: (
      <>
        <rect x="18" y="10" width="28" height="46" rx="2" />
        <rect x="23" y="15" width="18" height="16" rx="1" fill="none" stroke="#5c3a1a" strokeWidth="2" />
        <rect x="23" y="35" width="18" height="16" rx="1" fill="none" stroke="#5c3a1a" strokeWidth="2" />
        <circle cx="40" cy="34" r="2.5" fill="#f4c84b" />
      </>
    ),
  },
  jet: {
    fill: '#5a8fb0',
    svg: (
      <path d="M32 6c2 0 4 5 4 12l16 11v5l-16-5v10l6 5v4l-10-3-10 3v-4l6-5V29L12 34v-5l16-11c0-7 2-12 4-12z" />
    ),
  },
  net: {
    fill: '#8a8f98',
    svg: (
      <>
        <circle cx="26" cy="22" r="14" fill="none" stroke="#8a8f98" strokeWidth="3" />
        <g stroke="#8a8f98" strokeWidth="1.4" fill="none">
          <path d="M14 22h24M20 12l12 20M20 32l12-20M16 28l20-12M16 16l20 12" />
        </g>
        <rect x="34" y="30" width="4" height="26" rx="2" transform="rotate(-30 36 43)" fill="#7a4a2b" />
      </>
    ),
  },
  web: {
    fill: '#9aa1ad',
    svg: (
      <g stroke="#9aa1ad" strokeWidth="1.6" fill="none">
        <path d="M32 6v52M6 32h52M13 13l38 38M51 13 13 51" />
        <path d="M32 14 46 32 32 50 18 32z" />
        <path d="M32 22 40 32 32 42 24 32z" />
        <path d="M32 28 36 32 32 36 28 32z" />
      </g>
    ),
  },
  yoyo: {
    fill: '#e0562e',
    svg: (
      <>
        <line x1="32" y1="6" x2="32" y2="26" stroke="#7a4a2b" strokeWidth="2" />
        <circle cx="32" cy="38" r="18" />
        <circle cx="32" cy="38" r="4" fill="#fff" />
      </>
    ),
  },
  sock: {
    fill: '#e05a8a',
    svg: (
      <>
        <path d="M25 10h11v20c0 3 1 5 4 7l9 5a5 5 0 0 1-4 9l-8-3c-9-4-14-9-14-19V10z" />
        <rect x="25" y="10" width="11" height="6" fill="#c0426a" />
      </>
    ),
  },
  mug: {
    fill: '#3b7de5',
    svg: (
      <>
        <rect x="16" y="20" width="26" height="28" rx="4" />
        <path d="M42 26h5a8 8 0 0 1 0 15h-5" fill="none" stroke="#3b7de5" strokeWidth="4" />
        <ellipse cx="29" cy="20" rx="13" ry="4" fill="#cde0fa" />
      </>
    ),
  },
  pot: {
    fill: '#7a8089',
    svg: (
      <>
        <rect x="14" y="28" width="36" height="22" rx="3" />
        <rect x="19" y="21" width="26" height="6" rx="2" />
        <circle cx="32" cy="19" r="2.5" />
        <rect x="7" y="32" width="8" height="4" rx="2" />
        <rect x="49" y="32" width="8" height="4" rx="2" />
      </>
    ),
  },
  kite: {
    fill: '#2ca9a1',
    svg: (
      <>
        <path d="M32 6 50 28 32 46 14 28z" />
        <path d="M32 6v40M14 28h36" fill="none" stroke="#fff" strokeWidth="1.4" />
        <path d="M32 46l-4 7 4-2 4 2z" fill="#f4b400" />
        <path d="M30 55l-3 6 3-1.5 3 1.5z" fill="#e0562e" />
      </>
    ),
  },
  tent: {
    fill: '#5aa02c',
    svg: (
      <>
        <path d="M32 12 56 50H8z" />
        <path d="M32 26 44 50H20z" fill="#3a7a1e" />
        <line x1="32" y1="14" x2="32" y2="8" stroke="#7a4a2b" strokeWidth="2" />
      </>
    ),
  },
  circle: { fill: '#3b7de5', svg: <circle cx="32" cy="32" r="22" /> },
  square: { fill: '#e0862e', svg: <rect x="12" y="12" width="40" height="40" rx="2" /> },
  triangle: { fill: '#5aa02c', svg: <path d="M32 10 54 52H10z" /> },
  rectangle: { fill: '#7b5ea7', svg: <rect x="8" y="20" width="48" height="24" rx="2" /> },
  oval: { fill: '#2ca9a1', svg: <ellipse cx="32" cy="32" rx="24" ry="15" /> },
  diamond: { fill: '#e05a8a', svg: <path d="M32 8 54 32 32 56 10 32z" /> },
  hexagon: { fill: '#e0b83e', svg: <path d="M20 12h24l12 20-12 20H20L8 32z" /> },
  heart: {
    fill: '#e0443b',
    svg: <path d="M32 54C12 40 8 26 18 20c6-3.5 12 0 14 4 2-4 8-7.5 14-4 10 6 6 20-14 30z" />,
  },
  // Coins (2.MD.C.8) — colour + size + value label distinguish them.
  penny: {
    fill: '#b87333',
    svg: (
      <>
        <circle cx="32" cy="32" r="20" />
        <text x="32" y="39" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#4a2a12">1¢</text>
      </>
    ),
  },
  nickel: {
    fill: '#a8a9ad',
    svg: (
      <>
        <circle cx="32" cy="32" r="22" />
        <text x="32" y="39" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#33343a">5¢</text>
      </>
    ),
  },
  dime: {
    fill: '#a8a9ad',
    svg: (
      <>
        <circle cx="32" cy="32" r="16" />
        <text x="32" y="37" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#33343a">10¢</text>
      </>
    ),
  },
  quarter: {
    fill: '#a8a9ad',
    svg: (
      <>
        <circle cx="32" cy="32" r="24" />
        <text x="32" y="39" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#33343a">25¢</text>
      </>
    ),
  },
}

/**
 * `size` fixes the icon at an exact px square, for callers that need one.
 * Omit it (the question surfaces do) to emit a viewBox-only SVG that CSS sizes
 * against its container, which is what lets picture items scale with the
 * question card instead of sitting at a fixed small size.
 */
export function KidIcon({ name, size }: { name: string; size?: number }) {
  const icon = PATHS[name as IconName] ?? EXTRA_ICONS[name]
  if (!icon) return null
  return (
    <svg
      {...(size === undefined ? {} : { width: size, height: size })}
      viewBox="0 0 64 64"
      fill={icon.fill}
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      {icon.svg}
    </svg>
  )
}
