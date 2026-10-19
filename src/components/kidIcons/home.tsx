import type { KidIconDrawing } from './types'

export const ICONS: Record<string, KidIconDrawing> = {
  bed: {
    fill: '#3b7de5',
    svg: (
      <>
        {/* headboard and footboard posts */}
        <rect x="6" y="10" width="7" height="46" rx="2" fill="#8a5a34" />
        <rect x="51" y="22" width="7" height="34" rx="2" fill="#8a5a34" />
        {/* mattress frame */}
        <rect x="10" y="38" width="44" height="9" fill="#8a5a34" />
        {/* blanket */}
        <path d="M24 26h28a2 2 0 0 1 2 2v12H24z" />
        {/* pillow */}
        <rect x="11" y="26" width="15" height="12" rx="5" fill="#fff" stroke="#b8bfca" strokeWidth="1.5" />
      </>
    ),
  },
  chair: {
    fill: '#e5443b',
    svg: (
      <>
        {/* back */}
        <rect x="18" y="6" width="6" height="50" rx="2" />
        <rect x="18" y="8" width="26" height="6" rx="2" />
        <rect x="18" y="18" width="26" height="5" rx="2" />
        <rect x="40" y="6" width="5" height="28" rx="2" />
        {/* seat */}
        <rect x="16" y="32" width="32" height="7" rx="2" fill="#c0332b" />
        {/* front leg */}
        <rect x="41" y="36" width="6" height="20" rx="2" />
      </>
    ),
  },
  table: {
    fill: '#b07a4a',
    svg: (
      <>
        {/* top */}
        <rect x="6" y="22" width="52" height="7" rx="2" />
        <rect x="10" y="29" width="44" height="4" fill="#8a5a34" />
        {/* legs */}
        <rect x="11" y="29" width="6" height="27" rx="2" fill="#8a5a34" />
        <rect x="47" y="29" width="6" height="27" rx="2" fill="#8a5a34" />
      </>
    ),
  },
  book: {
    fill: '#2ca9a1',
    svg: (
      <>
        {/* pages edge */}
        <rect x="16" y="10" width="36" height="46" rx="3" fill="#f4ecd8" stroke="#c9b98f" strokeWidth="1.5" />
        {/* cover */}
        <rect x="12" y="8" width="36" height="46" rx="3" />
        {/* spine */}
        <rect x="12" y="8" width="7" height="46" rx="3" fill="#1f7f79" />
        {/* label */}
        <rect x="25" y="18" width="17" height="10" rx="2" fill="#f4b400" />
      </>
    ),
  },
  box: {
    // Plain cardboard box with open flaps and tape (no ribbon or bow, unlike 'gift').
    fill: '#c8955a',
    svg: (
      <>
        {/* open flaps */}
        <path d="M10 26L4 16h22l6 10z" fill="#ddb07a" />
        <path d="M54 26l6-10H38l-6 10z" fill="#ddb07a" />
        {/* box body */}
        <rect x="10" y="26" width="44" height="30" rx="1" />
        {/* dark inside rim */}
        <rect x="10" y="26" width="44" height="4" fill="#9c6c38" />
        {/* tape strip */}
        <rect x="28" y="30" width="8" height="10" fill="#e9d3a8" />
      </>
    ),
  },
  bag: {
    fill: '#e58a24',
    svg: (
      <>
        {/* top handle */}
        <path d="M24 16v-4a8 8 0 0 1 16 0v4" fill="none" stroke="#b5631a" strokeWidth="4" strokeLinecap="round" />
        {/* backpack body */}
        <rect x="14" y="14" width="36" height="44" rx="12" />
        {/* front pocket */}
        <rect x="20" y="36" width="24" height="16" rx="5" fill="#c46f17" />
        <rect x="20" y="36" width="24" height="4" rx="2" fill="#b5631a" />
        {/* zip pull */}
        <rect x="30" y="41" width="4" height="6" rx="1.5" fill="#f4b400" />
        {/* top flap seam */}
        <path d="M18 28h28" stroke="#c46f17" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },
  bell: {
    fill: '#f4b400',
    svg: (
      <>
        {/* hanger loop */}
        <circle cx="32" cy="10" r="4" fill="none" stroke="#c98f00" strokeWidth="3" />
        {/* bell body */}
        <path d="M32 13c-11 0-16 9-16 20v10l-6 6h44l-6-6V33c0-11-5-20-16-20z" />
        {/* rim */}
        <rect x="9" y="47" width="46" height="5" rx="2.5" fill="#d99a00" />
        {/* clapper */}
        <circle cx="32" cy="55" r="5" fill="#c98f00" />
        {/* shine */}
        <path d="M23 24c-2 3-3 7-3 11" fill="none" stroke="#fff6c8" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },
  lamp: {
    fill: '#3b7de5',
    svg: (
      <>
        {/* shade */}
        <path d="M20 8h24l8 22H12z" />
        {/* stem */}
        <rect x="29" y="30" width="6" height="20" fill="#8a8f98" />
        {/* base */}
        <rect x="16" y="50" width="32" height="7" rx="3" fill="#5c6270" />
        {/* light glow below the shade */}
        <ellipse cx="32" cy="31" rx="12" ry="2.5" fill="#f4b400" />
      </>
    ),
  },
  alarm_clock: {
    fill: '#e5443b',
    svg: (
      <>
        {/* bells */}
        <circle cx="15" cy="15" r="8" fill="#f4b400" />
        <circle cx="49" cy="15" r="8" fill="#f4b400" />
        <rect x="29" y="8" width="6" height="6" rx="2" fill="#5c6270" />
        {/* feet */}
        <path d="M18 50l-6 8M46 50l6 8" stroke="#5c6270" strokeWidth="4" strokeLinecap="round" />
        {/* body and face */}
        <circle cx="32" cy="35" r="21" />
        <circle cx="32" cy="35" r="16" fill="#fff" />
        {/* hour marks */}
        <circle cx="32" cy="22" r="1.6" fill="#5c6270" />
        <circle cx="45" cy="35" r="1.6" fill="#5c6270" />
        <circle cx="32" cy="48" r="1.6" fill="#5c6270" />
        <circle cx="19" cy="35" r="1.6" fill="#5c6270" />
        {/* hands */}
        <path d="M32 35V25M32 35l7 5" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="35" r="2" fill="#2b2b2b" />
      </>
    ),
  },
  shoe: {
    fill: '#3b7de5',
    svg: (
      <>
        {/* upper */}
        <path d="M6 44V24c0-3 2-5 5-5h10c2 0 3 1 4 3l4 6c6 2 18 6 24 9 4 2 5 4 5 7v0z" />
        {/* sole */}
        <rect x="4" y="44" width="56" height="9" rx="4" fill="#fff" stroke="#b8bfca" strokeWidth="1.5" />
        {/* laces */}
        <path d="M27 28l-4 4M33 30l-4 4M39 32l-4 4" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        {/* toe cap */}
        <path d="M46 36c6 2 11 4 12 8H44z" fill="#2a5fb8" />
        {/* heel stripe */}
        <rect x="6" y="24" width="6" height="20" fill="#e5443b" />
      </>
    ),
  },
  comb: {
    fill: '#e5679b',
    svg: (
      <>
        {/* spine */}
        <rect x="6" y="18" width="52" height="10" rx="4" />
        {/* teeth */}
        {[10, 15, 20, 25, 30, 35, 40, 45, 50].map((x) => (
          <rect key={x} x={x} y="26" width="3" height="20" rx="1.5" />
        ))}
      </>
    ),
  },
  brush: {
    // Side view of a hairbrush: bristles standing up from a long-handled head
    // (kept side-on so it is not confused with a round 'pan').
    fill: '#8a5aa8',
    svg: (
      <>
        {/* bristles */}
        {[7, 12, 17, 22, 27, 32, 37, 42].map((x) => (
          <g key={x}>
            <rect x={x} y="12" width="3.5" height="22" rx="1" fill="#5c6270" />
            <circle cx={x + 1.75} cy="12" r="2.8" fill="#f4b400" />
          </g>
        ))}
        {/* cushion */}
        <rect x="4" y="31" width="44" height="6" rx="2" fill="#2b2b2b" />
        {/* head */}
        <rect x="2" y="36" width="46" height="10" rx="5" />
        {/* handle */}
        <path d="M44 37h14a4.5 4.5 0 0 1 0 9H44z" />
      </>
    ),
  },
}
