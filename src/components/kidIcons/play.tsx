import type { KidIconDrawing } from './types'

export const ICONS: Record<string, KidIconDrawing> = {
  drum: {
    fill: '#e5443b',
    svg: (
      <>
        <path d="M14 6l16 16M50 6L34 22" fill="none" stroke="#9a6234" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="13" cy="5.5" r="3.5" fill="#9a6234" />
        <circle cx="51" cy="5.5" r="3.5" fill="#9a6234" />
        <ellipse cx="32" cy="50" rx="23" ry="8" />
        <rect x="9" y="27" width="46" height="23" />
        <path d="M9 31l9.2 15 9.2-15 9.2 15 9.2-15 9.2 15" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M9 50a23 8 0 0 0 46 0v-4a23 8 0 0 1-46 0z" fill="#f4b400" />
        <ellipse cx="32" cy="27" rx="23" ry="8" fill="#f4b400" />
        <ellipse cx="32" cy="26" rx="21" ry="6.5" fill="#f6efdf" stroke="#d8c9a3" strokeWidth="1.5" />
      </>
    ),
  },
  pen: {
    fill: '#3b7de5',
    svg: (
      <g transform="rotate(40 32 32)">
        <rect x="2" y="26" width="42" height="12" rx="6" />
        <path d="M6 26v-4.5h16a2 2 0 0 1 0 4.5" fill="#8a8f98" />
        <rect x="26" y="26" width="3.5" height="12" fill="#2a5bb0" />
        <path d="M44 27l8 1.5v7l-8 1.5z" fill="#2b2b2b" />
        <path d="M52 28.5l10 3.5-10 3.5z" fill="#c9ced6" />
        <path d="M54 32h7" stroke="#6b7280" strokeWidth="1" />
      </g>
    ),
  },
  pencil: {
    fill: '#f4b400',
    svg: (
      <g transform="rotate(-45 32 32)">
        <rect x="2" y="24" width="11" height="16" rx="4" fill="#f08aa8" />
        <rect x="10" y="23.5" width="7" height="17" fill="#b8bec7" />
        <rect x="17" y="24" width="30" height="16" />
        <rect x="17" y="30" width="30" height="4" fill="#d99a00" />
        <path d="M47 24l14 8-14 8z" fill="#efcf9a" />
        <path d="M55.6 28.9l5.4 3.1-5.4 3.1z" fill="#2b2b2b" />
      </g>
    ),
  },
  crayon: {
    fill: '#e5443b',
    svg: (
      <g transform="rotate(35 32 32)">
        <path d="M24 21l5-13h6l5 13z" />
        <rect x="24" y="20" width="16" height="40" rx="2" />
        <rect x="24" y="26" width="16" height="28" fill="#a8241d" />
        <path d="M24 29.5l4-3 4 3 4-3 4 3M24 50.5l4 3 4-3 4 3 4-3" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        <path d="M27 37h10M27 43h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </g>
    ),
  },
  bat: {
    fill: '#c98f5a',
    svg: (
      <>
        <g transform="rotate(-45 30 30)">
          <circle cx="2" cy="30" r="5" fill="#9a6234" />
          <path d="M3 27h22c11 0 18-5 29-5a8 8 0 0 1 0 16c-11 0-18-5-29-5H3z" />
          <rect x="3" y="27" width="15" height="6" fill="#3a3a3a" />
        </g>
        <circle cx="49" cy="49" r="9" fill="#fff" stroke="#9aa3ad" strokeWidth="2" />
        <path d="M43.5 42.5c3 4 3 9 0 13M54.5 42.5c-3 4-3 9 0 13" fill="none" stroke="#e5443b" strokeWidth="2" strokeDasharray="2 1.6" />
      </>
    ),
  },
  top: {
    fill: '#e5443b',
    svg: (
      <>
        <rect x="28.5" y="6" width="7" height="16" rx="2.5" fill="#9a6234" />
        <path d="M8 30c0-6 11-10 24-10s24 4 24 10L35.5 55.5a4.5 4.5 0 0 1-7 0z" />
        <path d="M10.9 33.5h42.2l-4.2 5H15.1z" fill="#f4b400" />
        <path d="M19.3 43.5h25.4l-4.2 5H23.5z" fill="#3b7de5" />
        <path d="M4 44c-2-4-2-8 0-12M60 44c2-4 2-8 0-12" fill="none" stroke="#9aa3ad" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  },
  wagon: {
    fill: '#e5443b',
    svg: (
      <>
        <path d="M44 34L58 12" fill="none" stroke="#5b6270" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="53" y="7" width="10" height="5" rx="2.5" fill="#2b2b2b" transform="rotate(-57 58 9.5)" />
        <rect x="4" y="26" width="44" height="18" rx="2" />
        <rect x="4" y="26" width="44" height="5" fill="#b8261f" />
        <circle cx="14" cy="46" r="8" fill="#2b2b2b" />
        <circle cx="38" cy="46" r="8" fill="#2b2b2b" />
        <circle cx="14" cy="46" r="3" fill="#c9ced6" />
        <circle cx="38" cy="46" r="3" fill="#c9ced6" />
      </>
    ),
  },
  rocket: {
    fill: '#e9eef4',
    svg: (
      <>
        <path d="M26 46l6 15 6-15z" fill="#f4b400" />
        <path d="M29 46l3 8 3-8z" fill="#e58a24" />
        <path d="M23 30L11 46l12-2zM41 30l12 16-12-2z" fill="#e5443b" />
        <path d="M32 4c9 7 12 19 10 42H22C20 23 23 11 32 4z" stroke="#9aa6b4" strokeWidth="2" />
        <path d="M32 4c4.4 3.4 7.2 8 8.6 14H23.4C24.8 12 27.6 7.4 32 4z" fill="#e5443b" />
        <path d="M30 46h4v8h-4z" fill="#e5443b" />
        <circle cx="32" cy="29" r="5.5" fill="#3b7de5" stroke="#5b6270" strokeWidth="2" />
      </>
    ),
  },
  flag: {
    fill: '#3b7de5',
    svg: (
      <>
        <rect x="14" y="8" width="4" height="48" rx="1.5" fill="#8a8f98" />
        <circle cx="16" cy="7" r="3.5" fill="#f4b400" />
        <path d="M18 10l38 11-38 11z" />
        <ellipse cx="16" cy="57" rx="10" ry="3.5" fill="#5aa02c" />
      </>
    ),
  },
  map: {
    fill: '#f3e3b5',
    svg: (
      <>
        <path d="M6 14l17-5 18 5 17-5v41l-17 5-18-5-17 5z" stroke="#c9a860" strokeWidth="2" strokeLinejoin="round" />
        <path d="M23 9l18 5v41l-18-5z" fill="#e6cf8f" />
        <path d="M23 9v41M41 14v41" stroke="#c9a860" strokeWidth="2" />
        <path d="M11 34c3-5 7-6 9-3s-1 7-5 7-6-1-4-4z" fill="#8cc06a" />
        <path d="M44 41c3-3 8-3 9 0s-3 6-6 5-5-2-3-5z" fill="#8cc06a" />
        <path d="M12 46c6-2 8-10 16-10s8-10 14-14 8-2 9-3" fill="none" stroke="#e5443b" strokeWidth="2.5" strokeDasharray="2.5 3" strokeLinecap="round" />
        <path d="M47 15l7 7M54 15l-7 7" stroke="#e5443b" strokeWidth="3.5" strokeLinecap="round" />
      </>
    ),
  },
  ladder: {
    fill: '#b07a4a',
    svg: (
      <>
        <rect x="16" y="15" width="32" height="4" fill="#c98f5a" />
        <rect x="16" y="26" width="32" height="4" fill="#c98f5a" />
        <rect x="16" y="37" width="32" height="4" fill="#c98f5a" />
        <rect x="16" y="48" width="32" height="4" fill="#c98f5a" />
        <rect x="12" y="5" width="6" height="55" rx="2" />
        <rect x="46" y="5" width="6" height="55" rx="2" />
      </>
    ),
  },
  bucket: {
    fill: '#3b7de5',
    svg: (
      <>
        <path d="M11 22C11 3 53 3 53 22" fill="none" stroke="#8a8f98" strokeWidth="3" />
        <path d="M10 22h44l-6 34c-1 2-3 3-5 3H21c-2 0-4-1-5-3z" />
        <path d="M14.3 46h35.4l-1 5.5H15.3z" fill="#2a5bb0" />
        <ellipse cx="32" cy="22" rx="22" ry="6" fill="#2a5bb0" />
        <ellipse cx="32" cy="22.5" rx="19" ry="4.2" fill="#1e3f7a" />
        <circle cx="11" cy="22" r="2.5" fill="#8a8f98" />
        <circle cx="53" cy="22" r="2.5" fill="#8a8f98" />
      </>
    ),
  },
}
