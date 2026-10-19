import type { KidIconDrawing } from './types'

export const ICONS: Record<string, KidIconDrawing> = {
  shirt: {
    fill: '#2fae60',
    svg: (
      <>
        <path d="M23 10 8 18l5 11 6-3v30h26V26l6 3 5-11-15-8c-2 4-5 6-9 6s-7-2-9-6z" />
        <path d="M23 10c2 4 5 6 9 6s7-2 9-6" fill="none" stroke="#1f7d44" strokeWidth="2.5" />
      </>
    ),
  },
  dress: {
    fill: '#9b59d0',
    svg: (
      <>
        <path d="M23 7h4l3 9h4l3-9h4l-1 12c0 3 1 5 3 7l10 30H10l10-30c2-2 3-4 3-7z" />
        <rect x="21" y="25" width="22" height="4" rx="1" fill="#f4c84b" />
      </>
    ),
  },
  coat: {
    fill: '#2f6fd0',
    svg: (
      <>
        <path d="M19 12 8 20v32h9V26z" fill="#2659ad" />
        <path d="M45 12l11 8v32h-9V26z" fill="#2659ad" />
        <rect x="17" y="10" width="30" height="48" rx="3" />
        <path d="M24 10l8 10 8-10z" fill="#1d4689" />
        <rect x="31" y="20" width="2" height="38" fill="#1d4689" />
        <circle cx="37" cy="28" r="2.5" fill="#f4c84b" />
        <circle cx="37" cy="38" r="2.5" fill="#f4c84b" />
        <circle cx="37" cy="48" r="2.5" fill="#f4c84b" />
        <rect x="8" y="49" width="9" height="5" fill="#e6e6e6" />
        <rect x="47" y="49" width="9" height="5" fill="#e6e6e6" />
      </>
    ),
  },
  mitten: {
    fill: '#e2483d',
    svg: (
      <>
        <ellipse cx="17" cy="32" rx="6" ry="10" transform="rotate(-30 17 32)" />
        <path d="M22 46V22a13 13 0 0 1 26 0v24z" />
        <rect x="20" y="44" width="30" height="13" rx="3" fill="#f4c84b" />
        <path d="M24 47v7M29 47v7M34 47v7M39 47v7M44 47v7" stroke="#d9a92e" strokeWidth="2" />
      </>
    ),
  },
  umbrella: {
    fill: '#6c5ce7',
    svg: (
      <>
        <path d="M32 32v18a4 4 0 0 1-8 0" fill="none" stroke="#3b3b3b" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M6 32a26 23 0 0 1 52 0a6.5 5 0 0 0-13 0a6.5 5 0 0 0-13 0a6.5 5 0 0 0-13 0a6.5 5 0 0 0-13 0z" />
        <path d="M32 9c-6 6-6.5 15-6.5 23a6.5 5 0 0 1 13 0c0-8-.5-17-6.5-23z" fill="#a29bfe" />
        <rect x="30.5" y="5" width="3" height="5" rx="1" fill="#3b3b3b" />
      </>
    ),
  },
  glasses: {
    fill: '#2d5be3',
    svg: (
      <>
        <path d="M8 30 4 22M56 30l4-8" stroke="#2d5be3" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="18" cy="34" r="12" fill="#cfe8ff" stroke="#2d5be3" strokeWidth="4" />
        <circle cx="46" cy="34" r="12" fill="#cfe8ff" stroke="#2d5be3" strokeWidth="4" />
        <path d="M29 32q3-4 6 0" fill="none" stroke="#2d5be3" strokeWidth="3.5" />
        <path d="M12 30q3-4 7-4M40 30q3-4 7-4" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  },
  car: {
    fill: '#e0352b',
    svg: (
      <>
        <path d="M16 32l6-11c1-1 2-2 4-2h13c2 0 3 1 4 2l7 11z" />
        <path d="M22 31l4-8h7v8zM36 31v-8h4l5 8z" fill="#cde6f5" />
        <rect x="5" y="30" width="54" height="15" rx="6" />
        <rect x="53" y="34" width="5" height="4" rx="1" fill="#f4c84b" />
        <circle cx="18" cy="46" r="7" fill="#2b2b2b" />
        <circle cx="46" cy="46" r="7" fill="#2b2b2b" />
        <circle cx="18" cy="46" r="3" fill="#bfc4cc" />
        <circle cx="46" cy="46" r="3" fill="#bfc4cc" />
      </>
    ),
  },
  truck: {
    fill: '#ef8a22',
    svg: (
      <>
        <rect x="4" y="12" width="36" height="32" rx="2" />
        <path d="M42 22h8c2 0 3 1 4 2l5 8v12H42z" fill="#27ae60" />
        <path d="M45 25h5l4 7h-9z" fill="#cde6f5" />
        <rect x="4" y="42" width="55" height="5" fill="#555b63" />
        <circle cx="14" cy="49" r="6" fill="#2b2b2b" />
        <circle cx="28" cy="49" r="6" fill="#2b2b2b" />
        <circle cx="50" cy="49" r="6" fill="#2b2b2b" />
        <circle cx="14" cy="49" r="2.5" fill="#bfc4cc" />
        <circle cx="28" cy="49" r="2.5" fill="#bfc4cc" />
        <circle cx="50" cy="49" r="2.5" fill="#bfc4cc" />
      </>
    ),
  },
  bike: {
    fill: '#16a085',
    svg: (
      <>
        <circle cx="15" cy="42" r="11" fill="none" stroke="#2b2b2b" strokeWidth="3.5" />
        <circle cx="49" cy="42" r="11" fill="none" stroke="#2b2b2b" strokeWidth="3.5" />
        <path d="M15 42h16L24 25zM24 25h19L31 42M43 25l6 17M43 25l-2-7h6" fill="none" stroke="#16a085" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
        <rect x="18" y="20" width="11" height="4" rx="2" fill="#2b2b2b" />
        <circle cx="31" cy="42" r="3" fill="#2b2b2b" />
      </>
    ),
  },
  train: {
    fill: '#4757d6',
    svg: (
      <>
        <circle cx="16" cy="9" r="4" fill="#c8ccd2" />
        <circle cx="22" cy="6" r="3" fill="#c8ccd2" />
        <rect x="12" y="13" width="8" height="12" fill="#2b2b2b" />
        <rect x="6" y="24" width="32" height="18" rx="3" />
        <rect x="36" y="14" width="22" height="28" rx="2" fill="#d63a3a" />
        <rect x="34" y="11" width="26" height="5" rx="2" fill="#2b2b2b" />
        <rect x="41" y="19" width="12" height="10" rx="1" fill="#cde6f5" />
        <path d="M6 40 1 50h7z" fill="#8a8f98" />
        <rect x="6" y="40" width="52" height="5" fill="#2b2b2b" />
        <circle cx="16" cy="49" r="6" fill="#2b2b2b" />
        <circle cx="30" cy="49" r="6" fill="#2b2b2b" />
        <circle cx="48" cy="48" r="8" fill="#2b2b2b" />
        <circle cx="16" cy="49" r="2.5" fill="#f4c84b" />
        <circle cx="30" cy="49" r="2.5" fill="#f4c84b" />
        <circle cx="48" cy="48" r="3" fill="#f4c84b" />
      </>
    ),
  },
  plane: {
    fill: '#4fa3e0',
    svg: (
      <>
        <path d="M6 30 4 13h7l12 15z" fill="#2d6ea8" />
        <path d="M6 29c0-3 2-5 6-5h34c6 0 12 4 12 8s-6 8-12 8H14c-5 0-8-5-8-11z" />
        <path d="M50 26c3 0 6 2 7 4h-8z" fill="#1f3b5c" />
        <path d="M24 35h12L28 52h-6z" fill="#2d6ea8" />
        <path d="M5 30h12l-8 5H5z" fill="#2d6ea8" />
        <g fill="#ffffff">
          <circle cx="20" cy="31" r="1.6" />
          <circle cx="25" cy="31" r="1.6" />
          <circle cx="30" cy="31" r="1.6" />
          <circle cx="35" cy="31" r="1.6" />
          <circle cx="40" cy="31" r="1.6" />
          <circle cx="45" cy="31" r="1.6" />
        </g>
      </>
    ),
  },
  boat: {
    fill: '#2c5d9e',
    svg: (
      <>
        <rect x="30" y="6" width="3" height="38" fill="#7a4a2b" />
        <path d="M28 8v32H10z" fill="#f1c40f" />
        <path d="M35 14v26h16z" fill="#e67e22" />
        <path d="M5 42h54l-9 12H14z" />
        <path d="M4 58q5-4 10 0t10 0 10 0 10 0 10 0 10 0" fill="none" stroke="#5dade2" strokeWidth="2.5" />
      </>
    ),
  },
}
