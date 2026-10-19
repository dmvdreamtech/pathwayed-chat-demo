import type { KidIconDrawing } from './types'

export const ICONS: Record<string, KidIconDrawing> = {
  fan: {
    fill: '#e5443b',
    svg: (
      <>
        <rect x="29" y="50" width="6" height="11" rx="3" fill="#8a5a32" />
        <path d="M32 54 L5 21.8 A42 42 0 0 1 13.15 16.47 Z" />
        <path d="M32 54 L13.15 16.47 A42 42 0 0 1 22.31 13.13 Z" fill="#f4b400" />
        <path d="M32 54 L22.31 13.13 A42 42 0 0 1 32 12 Z" />
        <path d="M32 54 L32 12 A42 42 0 0 1 41.69 13.13 Z" fill="#f4b400" />
        <path d="M32 54 L41.69 13.13 A42 42 0 0 1 50.85 16.47 Z" />
        <path d="M32 54 L50.85 16.47 A42 42 0 0 1 59 21.8 Z" fill="#f4b400" />
        <circle cx="32" cy="53" r="3" fill="#8a5a32" />
      </>
    ),
  },
  lid: {
    fill: '#2f8fd8',
    svg: (
      <>
        <rect x="28" y="24" width="8" height="8" rx="2" fill="#1f5f99" />
        <ellipse cx="32" cy="23" rx="10" ry="5" fill="#1f5f99" />
        <path d="M6 46 C8 30 56 30 58 46 Z" />
        <path d="M14 40 C18 36 23 34 29 33.5" fill="none" stroke="#9fd0f5" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="32" cy="46" rx="28" ry="5" fill="#1f5f99" />
      </>
    ),
  },
  log: {
    fill: '#8a5a32',
    svg: (
      <>
        <rect x="9" y="20" width="40" height="26" />
        <ellipse cx="9" cy="33" rx="5" ry="13" />
        <rect x="24" y="12" width="7" height="10" />
        <ellipse cx="27.5" cy="12" rx="3.5" ry="2" fill="#e8be86" />
        <path d="M14 27h14M20 36h18M13 41h10M31 28h10" fill="none" stroke="#6b4223" strokeWidth="2.2" strokeLinecap="round" />
        <ellipse cx="49" cy="33" rx="9" ry="13" fill="#e8be86" stroke="#6b4223" strokeWidth="2.5" />
        <ellipse cx="49" cy="33" rx="5.5" ry="8.5" fill="none" stroke="#b07a4a" strokeWidth="2" />
        <ellipse cx="49" cy="33" rx="2.2" ry="3.5" fill="none" stroke="#b07a4a" strokeWidth="2" />
      </>
    ),
  },
  mop: {
    fill: '#3d7bd9',
    svg: (
      <>
        <rect x="30" y="4" width="5" height="34" rx="2.5" />
        <rect x="18" y="36" width="29" height="6" rx="3" fill="#f4b400" />
        <path d="M21 42c-2 6 1 10-1 16M26 42c-1 6 2 10 0 16M31 42c-1 6 2 10 0 16M36 42c-1 6 2 10 0 16M41 42c-1 6 2 10 0 16M45 42c1 6-1 10 1 15" fill="none" stroke="#8fa3b8" strokeWidth="4" strokeLinecap="round" />
      </>
    ),
  },
  pan: {
    fill: '#3a3f47',
    svg: (
      <>
        <rect x="42" y="30" width="20" height="7" rx="3.5" fill="#1f2228" />
        <circle cx="25" cy="34" r="20" />
        <circle cx="25" cy="34" r="15" fill="#5a6270" />
        <path d="M15 28c2-4 6-6 10-6" fill="none" stroke="#8a93a1" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  },
  pin: {
    fill: '#e5443b',
    svg: (
      <>
        <path d="M30 44 L32 61 L34 44 Z" fill="#9aa0a8" />
        <rect x="27" y="30" width="10" height="10" fill="#b8302a" />
        <ellipse cx="32" cy="41" rx="13" ry="4" />
        <circle cx="32" cy="19" r="14" />
        <circle cx="27" cy="14" r="3.5" fill="#f59a92" />
      </>
    ),
  },
  rug: {
    fill: '#d9534f',
    svg: (
      <>
        <path d="M4 14h7M4 19h7M4 24h7M4 29h7M4 34h7M4 39h7M4 44h7M4 49h7M53 14h7M53 19h7M53 24h7M53 29h7M53 34h7M53 39h7M53 44h7M53 49h7" fill="none" stroke="#c99a5e" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="10" y="11" width="44" height="42" rx="2" />
        <rect x="17" y="11" width="6" height="42" fill="#f4b400" />
        <rect x="29" y="11" width="6" height="42" fill="#3d7bd9" />
        <rect x="41" y="11" width="6" height="42" fill="#f4b400" />
      </>
    ),
  },
  leg: {
    fill: '#f2c18f',
    svg: (
      <>
        <path d="M19 12 H41 C41 22 39 27 40 33 C41 39 38 43 37 47 C46 47 55 49 57 54 C58 58 55 60 51 60 H23 C19 60 19 56 20 53 C21 46 19 40 21 34 C22 28 19 20 19 12 Z" />
        <rect x="16" y="4" width="28" height="13" rx="3" fill="#3d7bd9" />
        <path d="M50 54.5c1.5 1 2.5 2.5 2.5 4" fill="none" stroke="#d99f68" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M33 30c3 0 5 1 6 3" fill="none" stroke="#d99f68" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  wig: {
    fill: '#b84fd1',
    svg: (
      <>
        <rect x="20" y="54" width="24" height="5" rx="2.5" fill="#8a93a1" />
        <rect x="28" y="46" width="8" height="9" fill="#b5bcc6" />
        <ellipse cx="32" cy="34" rx="12" ry="15" fill="#d7dce3" />
        <circle cx="32" cy="15" r="7" />
        <circle cx="24" cy="16" r="7" />
        <circle cx="40" cy="16" r="7" />
        <circle cx="17" cy="21" r="7" />
        <circle cx="47" cy="21" r="7" />
        <circle cx="14" cy="29" r="6.5" />
        <circle cx="50" cy="29" r="6.5" />
        <circle cx="14" cy="37" r="6" />
        <circle cx="50" cy="37" r="6" />
        <circle cx="16" cy="44" r="5.5" />
        <circle cx="48" cy="44" r="5.5" />
        <circle cx="28" cy="22" r="5" />
        <circle cx="36" cy="22" r="5" />
        <circle cx="24" cy="15" r="2" fill="#d98ae8" />
        <circle cx="40" cy="15" r="2" fill="#d98ae8" />
        <circle cx="17" cy="20" r="2" fill="#d98ae8" />
        <circle cx="47" cy="20" r="2" fill="#d98ae8" />
      </>
    ),
  },
  tub: {
    fill: '#6cbbe8',
    svg: (
      <>
        <circle cx="22" cy="20" r="6" fill="#fff" stroke="#9fc9e6" strokeWidth="2" />
        <circle cx="33" cy="16" r="7" fill="#fff" stroke="#9fc9e6" strokeWidth="2" />
        <circle cx="44" cy="21" r="5" fill="#fff" stroke="#9fc9e6" strokeWidth="2" />
        <circle cx="27" cy="26" r="5" fill="#fff" stroke="#9fc9e6" strokeWidth="2" />
        <circle cx="39" cy="27" r="4.5" fill="#fff" stroke="#9fc9e6" strokeWidth="2" />
        <circle cx="47" cy="11" r="3" fill="#fff" stroke="#9fc9e6" strokeWidth="1.5" />
        <path d="M12 30 V14 C12 10 18 10 18 14" fill="none" stroke="#8a93a1" strokeWidth="3" strokeLinecap="round" />
        <circle cx="17" cy="56" r="3.5" fill="#f4b400" />
        <circle cx="47" cy="56" r="3.5" fill="#f4b400" />
        <path d="M8 32 H56 V37 C56 47 48 52 40 52 H24 C16 52 8 47 8 37 Z" />
        <rect x="5" y="29" width="54" height="6" rx="3" fill="#3d8fcf" />
      </>
    ),
  },
  bib: {
    fill: '#5bb3e6',
    svg: (
      <>
        <ellipse cx="21" cy="17" rx="7" ry="10" />
        <ellipse cx="43" cy="17" rx="7" ry="10" />
        <circle cx="32" cy="40" r="19" />
        <circle cx="32" cy="17" r="8.5" fill="#fff" />
        <circle cx="32" cy="41" r="13" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M32 47c-6-4-8-7-8-9.5 0-2.5 2-4 4-4 1.7 0 3 1 4 2.5 1-1.5 2.3-2.5 4-2.5 2 0 4 1.5 4 4 0 2.5-2 5.5-8 9.5z" fill="#f28ab0" />
      </>
    ),
  },
  fin: {
    fill: '#6d7d8c',
    svg: (
      <>
        <path d="M18 46 C28 34 34 22 46 8 C43 22 44 34 50 46 Z" />
        <path d="M40 18 C39 28 40 36 44 46" fill="none" stroke="#56636f" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M4 44 q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 V58 H4 Z" fill="#3d8be0" />
        <path d="M10 52 q4 -3 8 0 M36 53 q4 -3 8 0" fill="none" stroke="#9fd0f5" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
}
