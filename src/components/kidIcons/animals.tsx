import type { KidIconDrawing } from './types'

export const ICONS: Record<string, KidIconDrawing> = {
  // Side view, facing right: brown body, floppy dark ear, wagging tail.
  dog: {
    fill: '#b07a4a',
    svg: (
      <>
        <path d="M14 34C10 30 8 24 9 18" fill="none" stroke="#b07a4a" strokeWidth="4" strokeLinecap="round" />
        <rect x="15" y="40" width="6" height="16" rx="3" />
        <rect x="36" y="40" width="6" height="16" rx="3" />
        <ellipse cx="28" cy="38" rx="17" ry="10" />
        <circle cx="45" cy="25" r="11" />
        <ellipse cx="54" cy="30" rx="7" ry="5" fill="#d9a877" />
        <circle cx="60" cy="28" r="2.6" fill="#2b2b2b" />
        <circle cx="48" cy="21" r="2.2" fill="#2b2b2b" />
        <ellipse cx="39" cy="27" rx="4.5" ry="9" fill="#6e4426" transform="rotate(12 39 27)" />
      </>
    ),
  },
  // Side view: white body with big black patches, pink muzzle and udder.
  cow: {
    fill: '#ffffff',
    svg: (
      <>
        <path d="M10 28C6 32 6 40 7 44" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="13" y="40" width="6" height="16" rx="2" stroke="#555" strokeWidth="2" />
        <rect x="35" y="40" width="6" height="16" rx="2" stroke="#555" strokeWidth="2" />
        <rect x="13" y="52" width="6" height="4" fill="#2b2b2b" />
        <rect x="35" y="52" width="6" height="4" fill="#2b2b2b" />
        <ellipse cx="27" cy="48" rx="5" ry="3.5" fill="#f2a0b4" />
        <rect x="9" y="24" width="38" height="22" rx="9" stroke="#555" strokeWidth="2" />
        <path d="M14 26c4 0 9 3 8 8s-6 7-12 6V32c0-3 2-6 4-6z" fill="#2b2b2b" />
        <path d="M30 26h8c-1 5-5 9-10 8-2-3-1-6 2-8z" fill="#2b2b2b" />
        <ellipse cx="34" cy="40" rx="4" ry="3" fill="#2b2b2b" />
        <path d="M45 12c-3-1-5-4-4-7M57 12c3-1 5-4 4-7" fill="none" stroke="#c9b27a" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="42" cy="17" rx="5" ry="3" fill="#2b2b2b" />
        <rect x="43" y="10" width="16" height="24" rx="7" stroke="#555" strokeWidth="2" />
        <ellipse cx="51" cy="13" rx="5" ry="3" fill="#2b2b2b" />
        <ellipse cx="51" cy="31" rx="9" ry="6" fill="#f2a0b4" stroke="#555" strokeWidth="1.5" />
        <circle cx="48" cy="31" r="1.4" fill="#7a3a4a" />
        <circle cx="54" cy="31" r="1.4" fill="#7a3a4a" />
        <circle cx="47" cy="20" r="2" fill="#2b2b2b" />
        <circle cx="55" cy="20" r="2" fill="#2b2b2b" />
      </>
    ),
  },
  // Side view: long legs, long neck and head, dark mane and tail.
  horse: {
    fill: '#a0612e',
    svg: (
      <>
        <path d="M13 30C8 34 6 42 8 50" fill="none" stroke="#4a2c17" strokeWidth="5" strokeLinecap="round" />
        <rect x="13" y="36" width="5" height="22" rx="2" />
        <rect x="20" y="36" width="5" height="22" rx="2" />
        <rect x="33" y="36" width="5" height="22" rx="2" />
        <rect x="40" y="36" width="5" height="22" rx="2" />
        <rect x="13" y="54" width="5" height="4" fill="#3b2a1e" />
        <rect x="20" y="54" width="5" height="4" fill="#3b2a1e" />
        <rect x="33" y="54" width="5" height="4" fill="#3b2a1e" />
        <rect x="40" y="54" width="5" height="4" fill="#3b2a1e" />
        <ellipse cx="29" cy="33" rx="18" ry="10" />
        <path d="M36 28L42 10L52 12L47 34z" />
        <ellipse cx="51" cy="17" rx="10" ry="5.5" transform="rotate(35 51 17)" />
        <path d="M43 9l1-6 4 6z" />
        <path d="M42 8c-3 6-5 14-7 22" fill="none" stroke="#4a2c17" strokeWidth="5" strokeLinecap="round" />
        <circle cx="50" cy="14" r="1.8" fill="#2b2b2b" />
        <circle cx="57" cy="23" r="1.2" fill="#2b2b2b" />
      </>
    ),
  },
  // Side view: fluffy white wool (grey edge so it shows on white), dark face and legs.
  sheep: {
    fill: '#ffffff',
    svg: (
      <>
        <rect x="17" y="40" width="5" height="16" rx="2" fill="#3b3f4a" />
        <rect x="36" y="40" width="5" height="16" rx="2" fill="#3b3f4a" />
        <g fill="#9aa0a8">
          <circle cx="18" cy="27" r="9.5" />
          <circle cx="30" cy="23" r="9.5" />
          <circle cx="42" cy="27" r="9.5" />
          <circle cx="12" cy="37" r="9.5" />
          <circle cx="24" cy="42" r="9.5" />
          <circle cx="37" cy="42" r="9.5" />
          <circle cx="46" cy="36" r="9.5" />
        </g>
        <circle cx="18" cy="27" r="8" />
        <circle cx="30" cy="23" r="8" />
        <circle cx="42" cy="27" r="8" />
        <circle cx="12" cy="37" r="8" />
        <circle cx="24" cy="42" r="8" />
        <circle cx="37" cy="42" r="8" />
        <circle cx="46" cy="36" r="8" />
        <circle cx="29" cy="33" r="12" />
        <ellipse cx="46" cy="25" rx="5" ry="2.5" fill="#3b3f4a" transform="rotate(-20 46 25)" />
        <ellipse cx="53" cy="30" rx="7" ry="9" fill="#3b3f4a" />
        <circle cx="49" cy="20" r="5" fill="#ffffff" stroke="#9aa0a8" strokeWidth="1.5" />
        <circle cx="55" cy="28" r="2" fill="#ffffff" />
      </>
    ),
  },
  // Side view: grey-brown, curved horns, pointed beard, little upright tail.
  goat: {
    fill: '#b59f84',
    svg: (
      <>
        <path d="M13 32l-4-9 8 5z" />
        <rect x="14" y="38" width="5" height="18" rx="2" />
        <rect x="21" y="38" width="5" height="18" rx="2" />
        <rect x="33" y="38" width="5" height="18" rx="2" />
        <rect x="40" y="38" width="5" height="18" rx="2" />
        <ellipse cx="29" cy="36" rx="17" ry="9" />
        <path d="M37 33L42 17L50 19L47 38z" />
        <path d="M44 16C41 8 34 6 30 10" fill="none" stroke="#5a4632" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="51" cy="22" rx="10" ry="5.5" transform="rotate(30 51 22)" />
        <ellipse cx="41" cy="21" rx="5" ry="2.2" fill="#8f7a62" transform="rotate(20 41 21)" />
        <path d="M51 27l-1 12-5-10z" fill="#5a4632" />
        <circle cx="50" cy="19" r="1.8" fill="#2b2b2b" />
        <circle cx="58" cy="28" r="1.2" fill="#2b2b2b" />
      </>
    ),
  },
  // Side view: russet hen with red comb and wattle, yellow beak and feet.
  hen: {
    fill: '#c8642e',
    svg: (
      <>
        <path d="M28 50v7M36 50v7M24 57h8M32 57h8" fill="none" stroke="#e5a21f" strokeWidth="3" strokeLinecap="round" />
        <path d="M18 34L8 12L24 26z" fill="#8a3f1a" />
        <path d="M18 34L14 14L28 28z" />
        <ellipse cx="31" cy="38" rx="19" ry="14" />
        <circle cx="45" cy="22" r="10" />
        <circle cx="40" cy="12" r="3.5" fill="#e5443b" />
        <circle cx="45" cy="10.5" r="3.8" fill="#e5443b" />
        <circle cx="50" cy="12.5" r="3.5" fill="#e5443b" />
        <path d="M53 19l8 3-8 4z" fill="#f4b400" />
        <ellipse cx="52" cy="30" rx="2.5" ry="4" fill="#e5443b" />
        <circle cx="47" cy="20" r="2" fill="#2b2b2b" />
        <path d="M22 36c4 10 14 12 20 6" fill="none" stroke="#8a3f1a" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },
  // Front view: wide green frog, big bulging eyes, wide smile.
  frog: {
    fill: '#4caf3c',
    svg: (
      <>
        <ellipse cx="13" cy="53" rx="8" ry="4.5" fill="#3a8a2c" />
        <ellipse cx="51" cy="53" rx="8" ry="4.5" fill="#3a8a2c" />
        <ellipse cx="32" cy="40" rx="24" ry="16" />
        <circle cx="19" cy="21" r="10" />
        <circle cx="45" cy="21" r="10" />
        <circle cx="19" cy="21" r="6" fill="#ffffff" />
        <circle cx="45" cy="21" r="6" fill="#ffffff" />
        <circle cx="20" cy="22" r="3" fill="#2b2b2b" />
        <circle cx="44" cy="22" r="3" fill="#2b2b2b" />
        <path d="M18 40Q32 52 46 40" fill="none" stroke="#235c1a" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="32" cy="51" rx="11" ry="4" fill="#a6d96a" />
      </>
    ),
  },
  // Side view: small blue songbird perched on a branch, pointy orange beak.
  bird: {
    fill: '#3b7de5',
    svg: (
      <>
        <rect x="6" y="50" width="52" height="5" rx="2.5" fill="#8a5a33" />
        <path d="M30 44v7M36 44v7" fill="none" stroke="#e58a24" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 36L4 46L8 30z" fill="#2a5db0" />
        <ellipse cx="31" cy="34" rx="17" ry="12" />
        <circle cx="44" cy="22" r="10" />
        <ellipse cx="34" cy="39" rx="10" ry="6" fill="#9cc6f5" />
        <path d="M18 30c6-6 16-6 20 2-6 6-14 6-20-2z" fill="#2a5db0" />
        <path d="M53 19l8 3-8 4z" fill="#e58a24" />
        <circle cx="47" cy="20" r="2.2" fill="#2b2b2b" />
      </>
    ),
  },
  // Front view: round brown face, round ears, tan muzzle.
  bear: {
    fill: '#8b5a2b',
    svg: (
      <>
        <circle cx="14" cy="16" r="9" />
        <circle cx="50" cy="16" r="9" />
        <circle cx="14" cy="16" r="4.5" fill="#d9a877" />
        <circle cx="50" cy="16" r="4.5" fill="#d9a877" />
        <circle cx="32" cy="36" r="22" />
        <ellipse cx="32" cy="45" rx="11" ry="8.5" fill="#d9a877" />
        <ellipse cx="32" cy="41" rx="4.5" ry="3.2" fill="#2b2b2b" />
        <path d="M32 44v3M27 48q5 3 10 0" fill="none" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="32" r="2.5" fill="#2b2b2b" />
        <circle cx="40" cy="32" r="2.5" fill="#2b2b2b" />
      </>
    ),
  },
  // Front view: big orange scalloped mane around a yellow face.
  lion: {
    fill: '#d9792b',
    svg: (
      <>
        <g>
          <circle cx="51.0" cy="34.0" r="9" />
          <circle cx="48.5" cy="43.5" r="9" />
          <circle cx="41.5" cy="50.5" r="9" />
          <circle cx="32.0" cy="53.0" r="9" />
          <circle cx="22.5" cy="50.5" r="9" />
          <circle cx="15.5" cy="43.5" r="9" />
          <circle cx="13.0" cy="34.0" r="9" />
          <circle cx="15.5" cy="24.5" r="9" />
          <circle cx="22.5" cy="17.5" r="9" />
          <circle cx="32.0" cy="15.0" r="9" />
          <circle cx="41.5" cy="17.5" r="9" />
          <circle cx="48.5" cy="24.5" r="9" />
        </g>
        <circle cx="32" cy="34" r="20" />
        <circle cx="21" cy="22" r="4.5" fill="#f4c04b" />
        <circle cx="43" cy="22" r="4.5" fill="#f4c04b" />
        <circle cx="32" cy="35" r="15" fill="#f4c04b" />
        <ellipse cx="28" cy="42" rx="5" ry="4" fill="#fbe3a6" />
        <ellipse cx="36" cy="42" rx="5" ry="4" fill="#fbe3a6" />
        <path d="M28 37h8l-4 4z" fill="#7a4a2b" />
        <circle cx="26" cy="31" r="2.2" fill="#2b2b2b" />
        <circle cx="38" cy="31" r="2.2" fill="#2b2b2b" />
      </>
    ),
  },
  // Side view: little grey mouse, big pink ear, pointy nose, long curly tail.
  mouse: {
    fill: '#9b9ea6',
    svg: (
      <>
        <path d="M12 44C2 46 2 56 12 56s14-2 18-2" fill="none" stroke="#e58aa0" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="22" cy="51" rx="4" ry="2.2" fill="#e58aa0" />
        <ellipse cx="38" cy="51" rx="4" ry="2.2" fill="#e58aa0" />
        <ellipse cx="28" cy="40" rx="17" ry="12" />
        <path d="M36 30C44 26 54 30 60 37C54 42 44 46 36 44z" />
        <circle cx="41" cy="24" r="10" />
        <circle cx="41" cy="24" r="6.5" fill="#f2a0b4" />
        <circle cx="60" cy="37" r="2.6" fill="#e5679b" />
        <circle cx="50" cy="34" r="2" fill="#2b2b2b" />
        <path d="M56 40l6 3M56 40l5 6" fill="none" stroke="#6b6f78" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
  },
  // Front view: tan bunny face with tall long ears, pink nose, buck teeth.
  rabbit: {
    fill: '#cfa77c',
    svg: (
      <>
        <ellipse cx="23" cy="19" rx="6.5" ry="15" transform="rotate(-8 23 19)" />
        <ellipse cx="41" cy="19" rx="6.5" ry="15" transform="rotate(8 41 19)" />
        <ellipse cx="23" cy="20" rx="3" ry="10" fill="#f2a0b4" transform="rotate(-8 23 20)" />
        <ellipse cx="41" cy="20" rx="3" ry="10" fill="#f2a0b4" transform="rotate(8 41 20)" />
        <circle cx="32" cy="41" r="17" />
        <ellipse cx="32" cy="47" rx="9" ry="6" fill="#f3e3cf" />
        <rect x="29.5" y="47" width="5" height="5" rx="1" fill="#ffffff" stroke="#9aa0a8" strokeWidth="1" />
        <ellipse cx="32" cy="44" rx="3" ry="2.2" fill="#e5679b" />
        <circle cx="25" cy="37" r="2.4" fill="#2b2b2b" />
        <circle cx="39" cy="37" r="2.4" fill="#2b2b2b" />
      </>
    ),
  },
}
