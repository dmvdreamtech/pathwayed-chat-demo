import type { KidIconDrawing } from './types'

export const ICONS: Record<string, KidIconDrawing> = {
  banana: {
    fill: '#f7d23e',
    svg: (
      <>
        <path d="M14 12 C8 36 24 58 56 48 C56 43 53 41 49 42 C30 46 21 32 21 12 Z" />
        <path d="M20 18 C20 34 30 44 46 44" fill="none" stroke="#e0b520" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="14" y="6" width="7" height="8" rx="2" fill="#7a5a2b" />
        <circle cx="55" cy="46" r="2.5" fill="#5a4220" />
      </>
    ),
  },
  carrot: {
    fill: '#f28a1e',
    svg: (
      <>
        <path d="M27 20 C24 14 20 10 15 8 C20 12 23 16 25 21 Z" fill="#4c9a2a" />
        <path d="M32 21 C31 14 32 9 35 5 C35 11 35 16 34 21 Z" fill="#5aa02c" />
        <path d="M37 21 C40 14 44 10 50 8 C45 13 42 17 39 22 Z" fill="#4c9a2a" />
        <path d="M18 24 Q32 16 46 24 L34 58 Q32 61 30 58 Z" />
        <path d="M22 32 L28 32 M36 38 L41 38 M25 44 L30 44 M34 50 L37 50" stroke="#c96a10" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  },
  egg: {
    fill: '#fdf8ec',
    svg: (
      <>
        <path
          d="M32 7 C44 7 52 25 52 38 C52 50 43 58 32 58 C21 58 12 50 12 38 C12 25 20 7 32 7 Z"
          stroke="#b9a98a"
          strokeWidth="3"
        />
        <ellipse cx="24" cy="26" rx="3" ry="6" fill="#ffffff" transform="rotate(20 24 26)" />
      </>
    ),
  },
  cake: {
    fill: '#f08fb0',
    svg: (
      <>
        <ellipse cx="32" cy="56" rx="27" ry="4" fill="#b8c0cc" />
        <rect x="9" y="38" width="46" height="17" rx="3" />
        <rect x="13" y="25" width="38" height="15" rx="3" fill="#f6b6cb" />
        <path d="M13 28 Q13 25 16 25 L48 25 Q51 25 51 28 L51 31 Q48 34 45 31 Q42 34 39 31 Q36 34 33 31 Q30 34 27 31 Q24 34 21 31 Q18 34 15 31 L13 30 Z" fill="#fff4f8" stroke="#e9b8c8" strokeWidth="1" />
        <rect x="9" y="38" width="46" height="4" rx="2" fill="#fff4f8" />
        <circle cx="18" cy="48" r="2" fill="#e5443b" />
        <circle cx="32" cy="48" r="2" fill="#3b7de5" />
        <circle cx="46" cy="48" r="2" fill="#f4b400" />
        <rect x="29.5" y="12" width="5" height="13" rx="1.5" fill="#3b7de5" />
        <path d="M32 3 C35 7 36 9 32 11 C28 9 29 7 32 3 Z" fill="#f4a020" />
      </>
    ),
  },
  cookie: {
    fill: '#d9a05b',
    svg: (
      <>
        <circle cx="32" cy="32" r="25" />
        <circle cx="32" cy="32" r="25" fill="none" stroke="#b97e3c" strokeWidth="2" />
        <circle cx="22" cy="21" r="3.5" fill="#4a2a14" />
        <circle cx="38" cy="18" r="3" fill="#4a2a14" />
        <circle cx="45" cy="31" r="3.5" fill="#4a2a14" />
        <circle cx="30" cy="32" r="3" fill="#4a2a14" />
        <circle cx="18" cy="38" r="3" fill="#4a2a14" />
        <circle cx="36" cy="44" r="3.5" fill="#4a2a14" />
        <circle cx="25" cy="49" r="2.5" fill="#4a2a14" />
        <circle cx="47" cy="44" r="2.5" fill="#4a2a14" />
      </>
    ),
  },
  pie: {
    fill: '#e0a356',
    svg: (
      <>
        <path d="M5 30 L12 52 Q32 60 52 52 L59 30 Z" fill="#9aa3b0" />
        <ellipse cx="32" cy="30" rx="27" ry="16" />
        <ellipse cx="32" cy="30" rx="22" ry="12" fill="#c8323c" />
        <path d="M20 21 L20 39 M28 19 L28 41 M36 19 L36 41 M44 21 L44 39" stroke="#efb96a" strokeWidth="4" strokeLinecap="round" />
        <path d="M14 25 L50 25 M12 30 L52 30 M14 35 L50 35" stroke="#efb96a" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="32" cy="30" rx="24.5" ry="14" fill="none" stroke="#d08f42" strokeWidth="3.5" strokeDasharray="3 2" />
      </>
    ),
  },
  milk: {
    fill: '#ffffff',
    svg: (
      <>
        <rect x="21" y="6" width="22" height="5" fill="#e8eef6" stroke="#8fa3bd" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 24 L21 11 L43 11 L36 24 Z" fill="#f3f6fa" stroke="#8fa3bd" strokeWidth="2" strokeLinejoin="round" />
        <path d="M36 24 L43 11 L50 24 Z" fill="#c9d8ea" stroke="#8fa3bd" strokeWidth="2" strokeLinejoin="round" />
        <rect x="14" y="24" width="22" height="34" stroke="#8fa3bd" strokeWidth="2" strokeLinejoin="round" />
        <rect x="36" y="24" width="14" height="34" fill="#c9d8ea" stroke="#8fa3bd" strokeWidth="2" strokeLinejoin="round" />
        <rect x="15" y="34" width="20" height="16" fill="#3b7de5" />
        <rect x="37" y="34" width="12" height="16" fill="#2c62b8" />
        <path d="M25 37 C28 41 30 43 30 45 C30 48 28 49 25 49 C22 49 20 48 20 45 C20 43 22 41 25 37 Z" fill="#ffffff" />
      </>
    ),
  },
  bread: {
    fill: '#d9954a',
    svg: (
      <>
        <path d="M6 34 C6 18 18 11 32 11 C46 11 58 18 58 34 L58 50 Q58 56 52 56 L12 56 Q6 56 6 50 Z" />
        <path d="M6 42 L58 42 L58 50 Q58 56 52 56 L12 56 Q6 56 6 50 Z" fill="#c27c35" />
        <path d="M16 30 L23 20 M28 29 L35 18 M40 29 L47 20" stroke="#f3c98a" strokeWidth="4" strokeLinecap="round" />
      </>
    ),
  },
  cheese: {
    fill: '#f7c531',
    svg: (
      <>
        <path d="M6 34 L44 14 L58 30 L58 34 Z" fill="#fde07a" />
        <path d="M6 34 L58 34 L58 54 L6 54 Z" />
        <path d="M58 30 L58 54" stroke="#e0a800" strokeWidth="2" />
        <circle cx="17" cy="42" r="4" fill="#e0a800" />
        <circle cx="33" cy="47" r="5" fill="#e0a800" />
        <circle cx="48" cy="41" r="3.5" fill="#e0a800" />
        <circle cx="24" cy="51" r="2" fill="#e0a800" />
        <ellipse cx="38" cy="25" rx="4" ry="2" fill="#f0bd2a" />
        <ellipse cx="24" cy="30" rx="3" ry="1.5" fill="#f0bd2a" />
      </>
    ),
  },
  corn: {
    fill: '#f6c829',
    svg: (
      <>
        <ellipse cx="32" cy="27" rx="11" ry="22" />
        <path d="M24 12 L40 12 M22 19 L42 19 M21 26 L43 26 M21 33 L43 33 M22 40 L42 40" stroke="#dba516" strokeWidth="1.8" />
        <path d="M28 6 L27 46 M32 5 L32 48 M36 6 L37 46" stroke="#dba516" strokeWidth="1.8" />
        <path d="M30 59 C16 52 12 38 15 22 C20 32 24 42 33 52 Z" fill="#5aa02c" />
        <path d="M34 59 C48 52 52 38 49 22 C44 32 40 42 31 52 Z" fill="#4c9a2a" />
        <path d="M30 52 L34 52 L33 60 L31 60 Z" fill="#3e7d22" />
      </>
    ),
  },
  grapes: {
    fill: '#8a4fc0',
    svg: (
      <>
        <path d="M32 16 C32 11 34 7 37 5" fill="none" stroke="#6b4a2b" strokeWidth="3" strokeLinecap="round" />
        <path d="M34 10 C38 4 48 4 52 8 C48 14 39 15 34 10 Z" fill="#5aa02c" />
        <circle cx="17" cy="22" r="6.5" />
        <circle cx="27" cy="20" r="6.5" />
        <circle cx="37" cy="20" r="6.5" />
        <circle cx="47" cy="22" r="6.5" />
        <circle cx="22" cy="32" r="6.5" fill="#7a42ae" />
        <circle cx="32" cy="31" r="6.5" />
        <circle cx="42" cy="32" r="6.5" fill="#7a42ae" />
        <circle cx="27" cy="42" r="6.5" />
        <circle cx="37" cy="42" r="6.5" fill="#7a42ae" />
        <circle cx="32" cy="52" r="6.5" />
        <circle cx="25" cy="18" r="1.8" fill="#c9a6ea" />
        <circle cx="30" cy="29" r="1.8" fill="#c9a6ea" />
        <circle cx="25" cy="40" r="1.8" fill="#c9a6ea" />
        <circle cx="30" cy="50" r="1.8" fill="#c9a6ea" />
      </>
    ),
  },
  orange: {
    fill: '#f7931e',
    svg: (
      <>
        <circle cx="32" cy="35" r="23" />
        <circle cx="22" cy="28" r="1.2" fill="#e07a0a" />
        <circle cx="30" cy="22" r="1.2" fill="#e07a0a" />
        <circle cx="42" cy="26" r="1.2" fill="#e07a0a" />
        <circle cx="46" cy="38" r="1.2" fill="#e07a0a" />
        <circle cx="38" cy="47" r="1.2" fill="#e07a0a" />
        <circle cx="26" cy="49" r="1.2" fill="#e07a0a" />
        <circle cx="18" cy="40" r="1.2" fill="#e07a0a" />
        <circle cx="33" cy="36" r="1.2" fill="#e07a0a" />
        <ellipse cx="21" cy="25" rx="4" ry="2.5" fill="#fbb45c" transform="rotate(-35 21 25)" />
        <circle cx="32" cy="13" r="2.5" fill="#5a7a2b" />
        <path d="M33 13 C36 6 45 5 49 8 C46 14 38 16 33 13 Z" fill="#4c9a2a" />
      </>
    ),
  },
}
