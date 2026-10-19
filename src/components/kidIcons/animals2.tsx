import type { KidIconDrawing } from './types'

export const ICONS: Record<string, KidIconDrawing> = {
  turtle: {
    fill: '#4f9d3a',
    svg: (
      <>
        <ellipse cx="14" cy="46" rx="5" ry="4" fill="#8cc152" />
        <ellipse cx="42" cy="46" rx="5" ry="4" fill="#8cc152" />
        <path d="M5 38l-2 3 6 1z" fill="#8cc152" />
        <circle cx="52" cy="34" r="8" fill="#8cc152" />
        <circle cx="55" cy="32" r="1.8" fill="#2b2b2b" />
        <path d="M6 42a22 22 0 0 1 44 0z" />
        <path d="M28 22l7 6-3 8h-8l-3-8z M14 34l6-3 3 8-4 3h-6z M42 34l-6-3-3 8 4 3h6z" fill="#3a7a2a" />
        <rect x="5" y="40" width="46" height="4" rx="2" fill="#3a7a2a" />
      </>
    ),
  },
  snake: {
    fill: '#5cb85c',
    svg: (
      <>
        <path
          d="M8 52c8 4 20 4 24-2s-4-10-10-12-8-10 0-14 18-2 22-6"
          fill="none"
          stroke="#5cb85c"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path d="M14 53l3-2 M24 53l2-3 M20 40l3-2 M17 29l3-1" stroke="#f4d03f" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="48" cy="16" rx="10" ry="8" />
        <circle cx="46" cy="13" r="2.4" fill="#fff" />
        <circle cx="46.5" cy="13" r="1.3" fill="#2b2b2b" />
        <circle cx="52" cy="13" r="2.4" fill="#fff" />
        <circle cx="52.5" cy="13" r="1.3" fill="#2b2b2b" />
        <path d="M45 19q4 3 8 0" fill="none" stroke="#2b2b2b" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M58 17l4 0 M61 17l1.5-2 M61 17l1.5 2" stroke="#e5443b" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  owl: {
    fill: '#8b5a2b',
    svg: (
      <>
        <path d="M14 10l8 8h20l8-8 2 22c0 16-9 26-20 26S12 48 12 32z" />
        <ellipse cx="32" cy="44" rx="11" ry="11" fill="#d9b382" />
        <circle cx="23" cy="26" r="8" fill="#fff" />
        <circle cx="41" cy="26" r="8" fill="#fff" />
        <circle cx="23" cy="26" r="4" fill="#2b2b2b" />
        <circle cx="41" cy="26" r="4" fill="#2b2b2b" />
        <path d="M29 32h6l-3 6z" fill="#f4a300" />
        <path d="M25 58h4 M35 58h4" stroke="#f4a300" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },
  ant: {
    fill: '#3b2a24',
    svg: (
      <>
        <g stroke="#3b2a24" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d="M28 36l-6 10-4 2 M32 36l0 12-3 2 M36 36l6 10 4 2" />
          <path d="M28 34l-8-8 M36 34l8-8" />
          <path d="M50 26l2-8 4-4 M54 28l6-6 2-6" />
        </g>
        <ellipse cx="16" cy="34" rx="11" ry="9" />
        <ellipse cx="33" cy="33" rx="7" ry="5" />
        <circle cx="49" cy="31" r="7" />
        <circle cx="51" cy="29" r="1.8" fill="#fff" />
      </>
    ),
  },
  bug: {
    fill: '#e5302a',
    svg: (
      <>
        <path d="M24 14l-4-6 M40 14l4-6" stroke="#2b2b2b" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="18" r="9" fill="#2b2b2b" />
        <circle cx="28" cy="16" r="2" fill="#fff" />
        <circle cx="36" cy="16" r="2" fill="#fff" />
        <circle cx="32" cy="38" r="21" />
        <path d="M32 17v42" stroke="#2b2b2b" strokeWidth="2.5" />
        <circle cx="22" cy="30" r="4" fill="#2b2b2b" />
        <circle cx="42" cy="30" r="4" fill="#2b2b2b" />
        <circle cx="21" cy="44" r="4" fill="#2b2b2b" />
        <circle cx="43" cy="44" r="4" fill="#2b2b2b" />
      </>
    ),
  },
  crab: {
    fill: '#e8582a',
    svg: (
      <>
        <g stroke="#e8582a" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M14 42l-8 4-2 6 M14 46l-6 8 M50 42l8 4 2 6 M50 46l6 8" />
          <path d="M18 34l-6-10 M46 34l6-10" />
          <path d="M27 30v-10 M37 30v-10" />
        </g>
        <path d="M4 18a8 8 0 0 1 14-6l-6 6 8 2a8 8 0 0 1-16-2z" />
        <path d="M60 18a8 8 0 0 0-14-6l6 6-8 2a8 8 0 0 0 16-2z" />
        <ellipse cx="32" cy="42" rx="20" ry="13" />
        <circle cx="27" cy="19" r="3.5" fill="#fff" />
        <circle cx="27" cy="19" r="2" fill="#2b2b2b" />
        <circle cx="37" cy="19" r="3.5" fill="#fff" />
        <circle cx="37" cy="19" r="2" fill="#2b2b2b" />
        <path d="M26 45q6 5 12 0" fill="none" stroke="#7a2a10" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  fox: {
    fill: '#f07a1a',
    svg: (
      <>
        <path d="M8 6l16 14H40L56 6l-2 24-22 28L10 30z" />
        <path d="M13 12l7 8-6 4z M51 12l-7 8 6 4z" fill="#7a3a10" />
        <path d="M10 30l14 5 8 19z M54 30l-14 5-8 19z" fill="#fff" />
        <circle cx="23" cy="28" r="3" fill="#2b2b2b" />
        <circle cx="41" cy="28" r="3" fill="#2b2b2b" />
        <path d="M28 49h8l-4 6z" fill="#2b2b2b" />
      </>
    ),
  },
  monkey: {
    fill: '#8b5a2b',
    svg: (
      <>
        <circle cx="11" cy="32" r="8" />
        <circle cx="53" cy="32" r="8" />
        <circle cx="11" cy="32" r="4.5" fill="#e8c39e" />
        <circle cx="53" cy="32" r="4.5" fill="#e8c39e" />
        <circle cx="32" cy="32" r="22" />
        <path d="M32 24c-3-6-14-6-14 4 0 4 2 6 2 8-2 3-3 6-1 10 3 6 10 8 13 8s10-2 13-8c2-4 1-7-1-10 0-2 2-4 2-8 0-10-11-10-14-4z" fill="#e8c39e" />
        <circle cx="25" cy="29" r="3" fill="#2b2b2b" />
        <circle cx="39" cy="29" r="3" fill="#2b2b2b" />
        <circle cx="29" cy="38" r="1.3" fill="#5a3a1a" />
        <circle cx="35" cy="38" r="1.3" fill="#5a3a1a" />
        <path d="M25 44q7 6 14 0" fill="none" stroke="#5a3a1a" strokeWidth="2.2" strokeLinecap="round" />
      </>
    ),
  },
  elephant: {
    fill: '#8e9aab',
    svg: (
      <>
        <rect x="14" y="40" width="8" height="16" rx="3" />
        <rect x="34" y="40" width="8" height="16" rx="3" />
        <ellipse cx="30" cy="36" rx="22" ry="15" />
        <path d="M4 36l-2 6" stroke="#8e9aab" strokeWidth="3" strokeLinecap="round" />
        <circle cx="46" cy="26" r="12" />
        <path d="M54 30c4 6 4 14 2 20 0 3 4 3 5 1" fill="none" stroke="#8e9aab" strokeWidth="7" strokeLinecap="round" />
        <path d="M36 16c-10 0-12 18-2 22 6 2 8-4 8-10s-1-12-6-12z" fill="#6f7c8f" />
        <circle cx="50" cy="24" r="2.2" fill="#2b2b2b" />
        <path d="M52 34q4 2 3 6" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  },
  butterfly: {
    fill: '#9b59d0',
    svg: (
      <>
        <path d="M31 30C24 14 6 6 5 18c-1 10 10 14 26 14z" />
        <path d="M33 30C40 14 58 6 59 18c1 10-10 14-26 14z" />
        <path d="M31 34C18 34 8 42 13 52c4 6 14 2 18-14z" fill="#f4a300" />
        <path d="M33 34c13 0 23 8 18 18-4 6-14 2-18-14z" fill="#f4a300" />
        <circle cx="17" cy="19" r="4" fill="#f9d56e" />
        <circle cx="47" cy="19" r="4" fill="#f9d56e" />
        <circle cx="19" cy="45" r="3" fill="#fff4c2" />
        <circle cx="45" cy="45" r="3" fill="#fff4c2" />
        <rect x="29" y="20" width="6" height="34" rx="3" fill="#3b2a24" />
        <path d="M31 21l-5-10 M33 21l5-10" stroke="#3b2a24" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="26" cy="10" r="2" fill="#3b2a24" />
        <circle cx="38" cy="10" r="2" fill="#3b2a24" />
      </>
    ),
  },
  whale: {
    fill: '#3a7bd5',
    svg: (
      <>
        <path d="M32 18v-6 M32 13c-3-5-8-6-10-4 M32 13c3-5 8-6 10-4" stroke="#7cc4f4" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M6 40c0-12 10-20 24-20 14 0 20 10 24 16l6-8c2 4 2 12-2 16 2 2 2 4 0 6-6 0-8-4-10-6-4 8-12 12-22 12C14 56 6 50 6 40z" />
        <path d="M8 44c4 8 12 10 22 10 8 0 14-3 18-8-10 2-26 2-40-2z" fill="#a9d4f5" />
        <circle cx="18" cy="36" r="2.5" fill="#2b2b2b" />
        <path d="M10 42q4 3 10 1" fill="none" stroke="#1f4f8f" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  worm: {
    fill: '#ef7fa0',
    svg: (
      <>
        <path
          d="M10 46c5-11 10-11 14 0s9 11 14 0 9-13 12-13"
          fill="none"
          stroke="#ef7fa0"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path d="M14 39l3 4 M21 39l-2 4 M30 50l2-4 M36 49l-2-4 M43 38l3 3" stroke="#c9547a" strokeWidth="2" strokeLinecap="round" />
        <circle cx="52" cy="31" r="9" />
        <circle cx="50" cy="28" r="2.6" fill="#fff" />
        <circle cx="50.5" cy="28" r="1.4" fill="#2b2b2b" />
        <circle cx="55.5" cy="28" r="2.2" fill="#fff" />
        <circle cx="56" cy="28" r="1.2" fill="#2b2b2b" />
        <path d="M49 34q4 3 7 0" fill="none" stroke="#7a2a44" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
}
