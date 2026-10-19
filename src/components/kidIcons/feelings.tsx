import type { KidIconDrawing } from './types'

const FACE = '#f7c62f'
const INK = '#3a2a1a'

export const ICONS: Record<string, KidIconDrawing> = {
  face_happy: {
    fill: FACE,
    svg: (
      <>
        <circle cx="32" cy="32" r="26" />
        <circle cx="23" cy="25" r="3.5" fill={INK} />
        <circle cx="41" cy="25" r="3.5" fill={INK} />
        <path d="M16 35h32c0 10-7 16-16 16s-16-6-16-16z" fill={INK} />
        <path d="M24 46c4-3 12-3 16 0-2 3-5 5-8 5s-6-2-8-5z" fill="#e5443b" />
        <circle cx="15" cy="33" r="3.5" fill="#f08a5d" />
        <circle cx="49" cy="33" r="3.5" fill="#f08a5d" />
      </>
    ),
  },
  face_sad: {
    fill: FACE,
    svg: (
      <>
        <circle cx="32" cy="32" r="26" />
        <path d="M16 21l10-5M48 21l-10-5" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <circle cx="23" cy="26" r="3.5" fill={INK} />
        <circle cx="41" cy="26" r="3.5" fill={INK} />
        <path d="M20 48c6-9 18-9 24 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <path d="M22 31c-3 5-5 9-5 12a5 5 0 0 0 10 0c0-3-2-7-5-12z" fill="#3b9be5" />
      </>
    ),
  },
  face_mad: {
    fill: FACE,
    svg: (
      <>
        <circle cx="32" cy="32" r="26" />
        <path d="M14 17l14 8M50 17l-14 8" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="23" cy="30" r="3.5" fill={INK} />
        <circle cx="41" cy="30" r="3.5" fill={INK} />
        <rect x="19" y="40" width="26" height="11" rx="4" fill={INK} />
        <path d="M21 45.5h22M26 42v7M32 42v7M38 42v7" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="15" cy="38" r="3.5" fill="#e5443b" opacity="0.7" />
        <circle cx="49" cy="38" r="3.5" fill="#e5443b" opacity="0.7" />
      </>
    ),
  },
  face_scared: {
    fill: FACE,
    svg: (
      <>
        <circle cx="32" cy="32" r="26" />
        <path d="M14 15c3-4 8-5 12-3M50 15c-3-4-8-5-12-3" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <circle cx="22" cy="26" r="7.5" fill="#fff" stroke={INK} strokeWidth="1.5" />
        <circle cx="42" cy="26" r="7.5" fill="#fff" stroke={INK} strokeWidth="1.5" />
        <circle cx="22" cy="27" r="2.5" fill={INK} />
        <circle cx="42" cy="27" r="2.5" fill={INK} />
        <path d="M17 46c2.5-4 5-4 7.5 0s5 4 7.5 0 5-4 7.5 0 5 4 7.5 0" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  face_surprised: {
    fill: FACE,
    svg: (
      <>
        <circle cx="32" cy="32" r="26" />
        <path d="M15 16c3-4 8-4 11-2M49 16c-3-4-8-4-11-2" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="22" cy="25" rx="3.5" ry="5" fill={INK} />
        <ellipse cx="42" cy="25" rx="3.5" ry="5" fill={INK} />
        <ellipse cx="32" cy="44" rx="7" ry="9" fill={INK} />
      </>
    ),
  },
  cube: {
    fill: '#e5443b',
    svg: (
      <>
        <path d="M32 7l23 12-23 12L9 19z" fill="#f28a80" />
        <path d="M9 19l23 12v26L9 45z" fill="#e5443b" />
        <path d="M55 19L32 31v26l23-12z" fill="#a8261f" />
      </>
    ),
  },
  cone: {
    fill: '#f4b400',
    svg: (
      <>
        <path d="M32 6L12 50a20 7 0 0 0 40 0z" fill="#f4b400" />
        <path d="M32 6l20 44a20 7 0 0 1-14 6.7z" fill="#c98a00" />
        <path d="M32 6L18 49c2 2 4 3 6 4z" fill="#ffd45c" />
      </>
    ),
  },
  cylinder: {
    fill: '#3b7de5',
    svg: (
      <>
        <path d="M14 16v32a18 6 0 0 0 36 0V16z" fill="#3b7de5" />
        <path d="M41 21.3V53.3a18 6 0 0 0 9-5.3V16a18 6 0 0 1-9 5.3z" fill="#2557a8" />
        <ellipse cx="32" cy="16" rx="18" ry="6" fill="#8fb8f5" />
      </>
    ),
  },
  sphere: {
    fill: '#8e5bd0',
    svg: (
      <>
        <ellipse cx="33" cy="57" rx="15" ry="3" fill="#cfcfd6" />
        <circle cx="32" cy="30" r="24" fill="#5e3699" />
        <circle cx="29.5" cy="27.5" r="20.5" fill="#8e5bd0" />
        <ellipse cx="23" cy="19" rx="7" ry="4.5" fill="#c5a6f0" transform="rotate(-30 23 19)" />
      </>
    ),
  },
  school: {
    fill: '#f2b632',
    svg: (
      <>
        <rect x="24" y="9" width="16" height="18" fill="#f2b632" />
        <rect x="27" y="11" width="10" height="9" rx="1" fill={INK} />
        <path d="M32 12c-3 0-4 2.5-4 5v2h8v-2c0-2.5-1-5-4-5z" fill="#f4d03f" />
        <path d="M21 10L32 2l11 8z" fill="#8a4b2a" />
        <rect x="8" y="32" width="48" height="25" fill="#f2b632" />
        <path d="M4 34L32 20l28 14z" fill="#8a4b2a" />
        <rect x="12" y="38" width="9" height="9" fill="#8fc9f5" stroke="#fff" strokeWidth="1.5" />
        <rect x="43" y="38" width="9" height="9" fill="#8fc9f5" stroke="#fff" strokeWidth="1.5" />
        <rect x="26" y="41" width="12" height="16" fill="#8a4b2a" />
        <rect x="6" y="56" width="52" height="3" fill="#9a9aa3" />
      </>
    ),
  },
  barn: {
    fill: '#c8362e',
    svg: (
      <>
        <path d="M8 57V30l8-12 16-8 16 8 8 12v27z" fill="#c8362e" />
        <path d="M8 30l8-12 16-8 16 8 8 12" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
        <rect x="27" y="19" width="10" height="8" fill="#5a1a14" stroke="#fff" strokeWidth="2" />
        <rect x="19" y="34" width="26" height="23" fill="#9e2a22" stroke="#fff" strokeWidth="2.5" />
        <path d="M19 34l26 23M45 34L19 57M32 34v23" fill="none" stroke="#fff" strokeWidth="2.5" />
      </>
    ),
  },
  face_tired: {
    fill: FACE,
    svg: (
      <>
        <circle cx="32" cy="32" r="26" />
        <path d="M15 25h14M35 25h14" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <path d="M17 25a5 5 0 0 0 10 0z" fill={INK} />
        <path d="M37 25a5 5 0 0 0 10 0z" fill={INK} />
        <ellipse cx="32" cy="44" rx="11" ry="9" fill={INK} />
        <path d="M23 48c3-3 15-3 18 0-2 3-5 5-9 5s-7-2-9-5z" fill="#e5443b" />
      </>
    ),
  },
}
