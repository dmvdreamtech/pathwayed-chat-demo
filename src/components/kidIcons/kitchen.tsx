import type { KidIconDrawing } from './types'

export const ICONS: Record<string, KidIconDrawing> = {
  pear: {
    fill: '#a8c536',
    svg: (
      <>
        <path d="M32 14c-6 0-8 5-8 10 0 5-3 8-7 13-6 8-3 21 15 21s21-13 15-21c-4-5-7-8-7-13 0-5-2-10-8-10z" />
        <path d="M32 15c0-4 1-7 3-9" fill="none" stroke="#7a4a2b" strokeWidth="3" strokeLinecap="round" />
        <path d="M35 11c4-4 10-4 12 0-3 4-9 4-12 0z" fill="#4f8f22" />
        <ellipse cx="24" cy="44" rx="3" ry="5" fill="#cfe06a" />
      </>
    ),
  },
  lemon: {
    fill: '#f7d417',
    svg: (
      <>
        <ellipse cx="32" cy="36" rx="22" ry="16" />
        <path d="M11 32l-5 4 5 4zM53 32l5 4-5 4z" />
        <path d="M36 21c2-7 8-11 15-10-2 7-8 11-15 10z" fill="#5aa02c" />
        <ellipse cx="23" cy="30" rx="7" ry="3.5" fill="#fbe878" transform="rotate(-15 23 30)" />
      </>
    ),
  },
  cupcake: {
    fill: '#e98ab8',
    svg: (
      <>
        <path d="M16 36h32l-5 22H21z" fill="#3b7de5" />
        <path d="M24 37l2 21M32 37v21M40 37l-2 21" fill="none" stroke="#2b5fb3" strokeWidth="2" />
        <path d="M13 37c-2-7 3-12 8-12 0-7 6-11 11-11s11 4 11 11c5 0 10 5 8 12z" />
        <path d="M20 28c4 2 8 2 12 0s8-2 12 0" fill="none" stroke="#f6b9d6" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="11" r="5" fill="#e5443b" />
        <path d="M33 7c1-3 3-4 5-5" fill="none" stroke="#5aa02c" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  pizza: {
    fill: '#f6c445',
    svg: (
      <>
        <path d="M10 14q22-8 44 0L32 60z" />
        <path d="M9 12q23-9 46 0l-2 7q-21-8-42 0z" fill="#c98a3e" />
        <circle cx="25" cy="27" r="4.5" fill="#d23c2e" />
        <circle cx="39" cy="29" r="4.5" fill="#d23c2e" />
        <circle cx="32" cy="42" r="4" fill="#d23c2e" />
      </>
    ),
  },
  sandwich: {
    fill: '#e8b765',
    svg: (
      <>
        <rect x="8" y="40" width="48" height="12" rx="5" />
        <rect x="9" y="35" width="46" height="6" rx="2" fill="#f4b400" />
        <path d="M8 34c3 4 6 4 8 0s5 4 8 0 5 4 8 0 5 4 8 0 5 4 8 0 5 4 8 0v-3H8z" fill="#5aa02c" />
        <rect x="11" y="27" width="42" height="5" rx="2.5" fill="#e5443b" />
        <path d="M8 26c0-10 10-14 24-14s24 4 24 14z" />
        <path d="M8 26c0-10 10-14 24-14s24 4 24 14" fill="none" stroke="#b0773a" strokeWidth="2.5" />
        <rect x="8" y="40" width="48" height="12" rx="5" fill="none" stroke="#b0773a" strokeWidth="2.5" />
      </>
    ),
  },
  jam: {
    fill: '#c8213a',
    svg: (
      <>
        <rect x="16" y="20" width="32" height="38" rx="7" />
        <rect x="14" y="8" width="36" height="12" rx="3" fill="#f4b400" />
        <path d="M14 14h36" stroke="#d99a00" strokeWidth="2" />
        <rect x="16" y="31" width="32" height="15" fill="#f6e7c1" />
        <path d="M32 35c-3-3-7 0-5 4l5 4 5-4c2-4-2-7-5-4z" fill="#e5443b" />
        <rect x="20" y="23" width="4" height="6" rx="2" fill="#e8687a" />
      </>
    ),
  },
  nut: {
    fill: '#d9a86c',
    svg: (
      <>
        <path d="M32 6c-10 0-15 8-13 16 1 4 3 6 3 10s-2 6-3 10c-2 8 3 16 13 16s15-8 13-16c-1-4-3-6-3-10s2-6 3-10c2-8-3-16-13-16z" transform="rotate(-30 32 32)" />
        <g fill="#b07d45" transform="rotate(-30 32 32)">
          <circle cx="27" cy="15" r="1.8" /><circle cx="37" cy="15" r="1.8" /><circle cx="32" cy="20" r="1.8" />
          <circle cx="26" cy="24" r="1.8" /><circle cx="38" cy="24" r="1.8" />
          <circle cx="27" cy="42" r="1.8" /><circle cx="37" cy="42" r="1.8" /><circle cx="32" cy="46" r="1.8" />
          <circle cx="26" cy="50" r="1.8" /><circle cx="38" cy="50" r="1.8" />
        </g>
        <path d="M22 32h20" fill="none" stroke="#a8763e" strokeWidth="2" strokeLinecap="round" transform="rotate(-30 32 32)" />
      </>
    ),
  },
  acorn: {
    fill: '#c4823f',
    svg: (
      <>
        <path d="M16 28h32c0 16-6 26-16 30-10-4-16-14-16-30z" />
        <path d="M11 30c0-11 9-17 21-17s21 6 21 17z" fill="#7a4a2b" />
        <path d="M17 22l8 8M25 16l12 14M37 15l10 15M47 22l-8 8M39 16l-12 14M27 15l-10 15" fill="none" stroke="#5c3720" strokeWidth="1.6" />
        <path d="M32 14c0-4 2-7 5-8" fill="none" stroke="#5c3720" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="25" cy="38" rx="3" ry="6" fill="#dca061" />
      </>
    ),
  },
  bowl: {
    fill: '#e0562e',
    svg: (
      <>
        <path d="M6 28h52c0 15-11 24-26 24S6 43 6 28z" />
        <ellipse cx="32" cy="28" rx="26" ry="6" fill="#a8391b" />
        <rect x="22" y="51" width="20" height="5" rx="2" fill="#b8411f" />
        <path d="M14 36c2 5 6 8 10 9" fill="none" stroke="#f08a66" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },
  spoon: {
    fill: '#9aa3ad',
    svg: (
      <>
        <g transform="rotate(40 32 32)">
          <ellipse cx="32" cy="16" rx="10" ry="13" />
          <ellipse cx="32" cy="17" rx="6" ry="9" fill="#bfc6ce" />
          <rect x="29" y="27" width="6" height="32" rx="3" />
        </g>
      </>
    ),
  },
  cup: {
    fill: '#e86a9a',
    svg: (
      <>
        <ellipse cx="32" cy="52" rx="26" ry="6" fill="#f2a3c2" />
        <ellipse cx="32" cy="50" rx="12" ry="2.5" fill="#c94f7e" />
        <path d="M44 28h3a7 7 0 0 1 0 14h-5" fill="none" stroke="#e86a9a" strokeWidth="4" />
        <path d="M12 22h36c0 15-6 27-18 27S12 37 12 22z" transform="translate(2 0)" />
        <ellipse cx="32" cy="22" rx="18" ry="4" fill="#8a4a2b" />
        <path d="M15 31h34" fill="none" stroke="#fff" strokeWidth="3.5" />
      </>
    ),
  },
  jar: {
    fill: '#dcefff',
    svg: (
      <>
        <path d="M20 20h24v4c5 2 6 5 6 9v19c0 4-3 6-7 6H21c-4 0-7-2-7-6V33c0-4 1-7 6-9z" stroke="#6f9fc4" strokeWidth="3" strokeLinejoin="round" />
        <rect x="17" y="7" width="30" height="12" rx="2" fill="#7a8089" />
        <path d="M17 11h30M17 15h30" stroke="#5c6168" strokeWidth="1.5" />
        <rect x="20" y="32" width="5" height="18" rx="2.5" fill="#fff" />
        <rect x="28" y="34" width="3" height="10" rx="1.5" fill="#fff" />
      </>
    ),
  },
}
