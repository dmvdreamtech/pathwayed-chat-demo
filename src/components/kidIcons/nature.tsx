import type { KidIconDrawing } from './types'

export const ICONS: Record<string, KidIconDrawing> = {
  rock: {
    fill: '#8a8f98',
    svg: (
      <>
        <path d="M8 48c-2-8 2-16 8-20 3-8 11-13 19-11 7-2 14 2 17 9 6 4 8 12 5 20-1 4-4 6-8 6H14c-3 0-5-1-6-4z" />
        <path d="M36 17c-2 8 0 14 6 19 6 4 12 4 15 4-1-8-4-12-9-15-3-5-7-8-12-8z" fill="#767b84" />
        <path d="M17 33c2-5 6-9 11-10" fill="none" stroke="#b4b9c1" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="8" y="51" width="48" height="3" rx="1.5" fill="#6c7079" />
      </>
    ),
  },
  shell: {
    fill: '#f2a07b',
    svg: (
      <>
        <path d="M32 54L8 30c0-12 11-22 24-22s24 10 24 22z" />
        <path d="M32 54L14 22M32 54L23 13M32 54V9M32 54l9-41M32 54l18-32" fill="none" stroke="#d9714a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 52h16l-3 6H27z" fill="#d9714a" />
      </>
    ),
  },
  nest: {
    fill: '#9a6a3c',
    svg: (
      <>
        <ellipse cx="22" cy="34" rx="7" ry="9" fill="#7cc6e8" />
        <ellipse cx="42" cy="34" rx="7" ry="9" fill="#7cc6e8" />
        <ellipse cx="32" cy="31" rx="7" ry="9" fill="#a8dcf2" />
        <path d="M6 36h52c0 12-11 20-26 20S6 48 6 36z" />
        <path d="M9 42c12 4 34 4 46 0M13 49c10 3 28 3 38 0" fill="none" stroke="#6e4826" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M6 36c8 2 44 2 52 0" fill="none" stroke="#b98450" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },
  cloud: {
    fill: '#ffffff',
    svg: (
      <>
        <path
          d="M16 46c-6 0-10-4-10-9s4-9 10-9c1-8 7-13 15-13 7 0 12 4 14 10 7 0 13 5 13 11s-5 10-12 10z"
          stroke="#7aa7d6"
          strokeWidth="3.5"
          strokeLinejoin="round"
          fill="#eef6ff"
        />
      </>
    ),
  },
  rain: {
    fill: '#8a9bb0',
    svg: (
      <>
        <path d="M15 36c-5 0-9-3-9-8s4-8 9-8c1-7 7-12 14-12 6 0 11 4 13 9 7 0 12 4 12 10s-5 9-11 9z" />
        <path d="M18 42l-3 7a3 3 0 1 0 6 0z" fill="#3b7de5" />
        <path d="M32 44l-3 7a3 3 0 1 0 6 0z" fill="#3b7de5" />
        <path d="M46 42l-3 7a3 3 0 1 0 6 0z" fill="#3b7de5" />
        <path d="M25 52l-2.5 5a2.5 2.5 0 1 0 5 0z" fill="#3b7de5" />
        <path d="M39 52l-2.5 5a2.5 2.5 0 1 0 5 0z" fill="#3b7de5" />
      </>
    ),
  },
  snow: {
    fill: '#4aa3df',
    svg: (
      <>
        <g fill="none" stroke="#4aa3df" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 32V6M25 11l7 6 7-6M27 20l5 4 5-4" />
          <g transform="rotate(60 32 32)"><path d="M32 32V6M25 11l7 6 7-6M27 20l5 4 5-4" /></g>
          <g transform="rotate(120 32 32)"><path d="M32 32V6M25 11l7 6 7-6M27 20l5 4 5-4" /></g>
          <g transform="rotate(180 32 32)"><path d="M32 32V6M25 11l7 6 7-6M27 20l5 4 5-4" /></g>
          <g transform="rotate(240 32 32)"><path d="M32 32V6M25 11l7 6 7-6M27 20l5 4 5-4" /></g>
          <g transform="rotate(300 32 32)"><path d="M32 32V6M25 11l7 6 7-6M27 20l5 4 5-4" /></g>
        </g>
        <circle cx="32" cy="32" r="4" />
      </>
    ),
  },
  snowman: {
    fill: '#ffffff',
    svg: (
      <>
        <g stroke="#9aa6b5" strokeWidth="2.5">
          <circle cx="32" cy="45" r="13" />
          <circle cx="32" cy="23" r="10" />
        </g>
        <rect x="24" y="5" width="16" height="9" rx="1" fill="#3b3f4a" />
        <rect x="20" y="12" width="24" height="4" rx="2" fill="#3b3f4a" />
        <circle cx="28" cy="21" r="2" fill="#2b2b2b" />
        <circle cx="36" cy="21" r="2" fill="#2b2b2b" />
        <path d="M32 24l9 3-9 1z" fill="#e58a24" />
        <path d="M22 32h20v4H22z" fill="#e5443b" />
        <path d="M36 34l4 9h-5z" fill="#e5443b" />
        <circle cx="32" cy="42" r="1.8" fill="#2b2b2b" />
        <circle cx="32" cy="49" r="1.8" fill="#2b2b2b" />
        <path d="M19 40l-11-7M45 40l11-7M10 34l-2-5M54 34l2-5" fill="none" stroke="#7a4a2b" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  },
  rainbow: {
    fill: 'none',
    svg: (
      <>
        <g fill="none" strokeWidth="5">
          <path d="M6 48a26 26 0 0 1 52 0" stroke="#e5443b" />
          <path d="M11 48a21 21 0 0 1 42 0" stroke="#f08c2a" />
          <path d="M16 48a16 16 0 0 1 32 0" stroke="#f4c400" />
          <path d="M21 48a11 11 0 0 1 22 0" stroke="#4caf50" />
          <path d="M26 48a6 6 0 0 1 12 0" stroke="#3b7de5" />
        </g>
        <g fill="#eef6ff" stroke="#9fc0e0" strokeWidth="2">
          <path d="M4 54c0-4 3-6 6-6 1-3 4-5 7-4 2-2 6-2 8 1 3 0 5 3 4 6 0 2-1 3-3 3H7c-2 0-3-1-3-0z" />
          <path d="M35 54c0-3 2-6 6-6 1-3 4-5 7-4 2-2 6-2 8 1 3 0 5 3 4 6 0 2-1 3-3 3H38c-2 0-3-1-3 0z" />
        </g>
      </>
    ),
  },
  mountain: {
    fill: '#6b7a99',
    svg: (
      <>
        <path d="M4 54L27 10l13 22 6-8 14 30z" strokeLinejoin="round" />
        <path d="M27 10l4 44H4z" fill="#566480" />
        <path d="M27 10L17 29l5 4 5-5 5 5 5-3z" fill="#ffffff" stroke="#c9d3e0" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M46 24l-5 8 3 2 2-2 3 2 2-2z" fill="#ffffff" stroke="#c9d3e0" strokeWidth="1.5" strokeLinejoin="round" />
      </>
    ),
  },
  pond: {
    fill: '#3b9be0',
    svg: (
      <>
        <ellipse cx="32" cy="36" rx="28" ry="18" />
        <path d="M10 32c4-2 8-2 12 0M14 44c4-2 8-2 12 0" fill="none" stroke="#a8dcf2" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M44 36a14 10 0 1 1-4-9l-10 9z" fill="#4caf50" />
        <path d="M30 36l-8-4M30 36l-9 4M30 36l3 8" fill="none" stroke="#3d8f40" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="45" cy="42" r="5" fill="#e5679b" />
        <circle cx="45" cy="42" r="2" fill="#f4b400" />
      </>
    ),
  },
  seed: {
    fill: '#a8703e',
    svg: (
      <>
        <rect x="6" y="50" width="52" height="8" rx="4" fill="#7a4a2b" />
        <ellipse cx="32" cy="44" rx="14" ry="9" transform="rotate(-15 32 44)" />
        <path d="M24 40c4-3 9-4 13-3" fill="none" stroke="#c99263" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 38c0-10 0-16 0-22" fill="none" stroke="#4caf50" strokeWidth="4" strokeLinecap="round" />
        <path d="M32 22C26 22 19 18 17 11c7-1 13 3 15 11z" fill="#5aa02c" />
        <path d="M32 18c4-6 10-9 16-7-2 7-9 9-16 7z" fill="#6cc04a" />
      </>
    ),
  },
  grass: {
    fill: '#4caf50',
    svg: (
      <>
        <path d="M10 56C10 44 8 34 4 26c8 6 12 16 13 30z" fill="#3d8f40" />
        <path d="M16 56c0-16 2-30 8-44 2 14 1 30 0 44z" />
        <path d="M26 56c0-14 3-34 8-48 4 14 4 34 2 48z" fill="#5cc160" />
        <path d="M36 56c2-14 8-28 16-36-4 12-6 24-6 36z" />
        <path d="M46 56c2-10 6-18 14-22-5 6-7 14-8 22z" fill="#3d8f40" />
        <rect x="6" y="54" width="52" height="4" rx="2" fill="#3d8f40" />
      </>
    ),
  },
}
