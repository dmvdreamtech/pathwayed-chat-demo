// Drawing data, not a component module: the helpers below build one shared child figure.
/* eslint-disable react-refresh/only-export-components */
import type { KidIconDrawing } from './types'

// One shared child figure: round yellow emoji head, blue top, navy legs.
// Only the pose and props change from picture to picture.
const SKIN = '#f6c431'
const BODY = '#3b7de5'
const LEGS = '#2b4a8a'
const INK = '#2b2b2b'
const SHOE = '#cc543c'

type Mouth = 'smile' | 'open' | 'big' | 'sleep'

function Head({ x, y, mouth = 'smile' }: { x: number; y: number; mouth?: Mouth }) {
  return (
    <>
      <circle cx={x} cy={y} r="9" fill={SKIN} />
      {mouth === 'sleep' ? (
        <path
          d={`M${x - 5.5} ${y - 1}q2 2 4 0M${x + 1.5} ${y - 1}q2 2 4 0`}
          fill="none"
          stroke={INK}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <>
          <circle cx={x - 3.5} cy={y - 1.5} r="1.5" fill={INK} />
          <circle cx={x + 3.5} cy={y - 1.5} r="1.5" fill={INK} />
        </>
      )}
      {mouth === 'smile' && (
        <path d={`M${x - 3.5} ${y + 3}q3.5 3 7 0`} fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
      )}
      {mouth === 'open' && <ellipse cx={x} cy={y + 4} rx="2" ry="1.8" fill={INK} />}
      {mouth === 'big' && <ellipse cx={x} cy={y + 4} rx="3" ry="3.2" fill={INK} />}
    </>
  )
}

/** A thick rounded limb along a polyline of points. */
function Limb({ d, color = BODY, w = 6 }: { d: string; color?: string; w?: number }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
}

function Hand({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="3.2" fill={SKIN} />
}

function Shoe({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return <ellipse cx={flip ? x - 2 : x + 2} cy={y} rx="5" ry="3" fill={SHOE} />
}

function Torso({ x, y, w = 16, h = 18, rotate = 0 }: { x: number; y: number; w?: number; h?: number; rotate?: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="6"
      fill={BODY}
      transform={rotate ? `rotate(${rotate} ${x + w / 2} ${y + h / 2})` : undefined}
    />
  )
}

const MOTION = { fill: 'none', stroke: '#9aa3ad', strokeWidth: 3, strokeLinecap: 'round' as const }

export const ICONS: Record<string, KidIconDrawing> = {
  kid_wave: {
    fill: BODY,
    svg: (
      <>
        <Limb d="M28 42L27 55" color={LEGS} />
        <Limb d="M36 42L37 55" color={LEGS} />
        <Shoe x={26} y={57} flip />
        <Shoe x={38} y={57} />
        <Limb d="M26 28L19 41" />
        <Hand x={18} y={42} />
        <Limb d="M38 28L46 22L48 12" />
        <Hand x={48} y={10} />
        <path d="M53 6q4 4 0 9M57 3q6 7 0 15" {...MOTION} />
        <Torso x={24} y={24} />
        <Head x={32} y={14} />
      </>
    ),
  },
  kid_run: {
    fill: BODY,
    svg: (
      <>
        <path d="M4 26h9M2 34h10M5 42h8" {...MOTION} />
        <Limb d="M31 41L22 46L16 42" color={LEGS} />
        <Shoe x={15} y={44} flip />
        <Limb d="M33 41L42 47L44 55" color={LEGS} />
        <Shoe x={46} y={57} />
        <Limb d="M29 28L21 33L18 27" />
        <Hand x={17} y={25} />
        <Torso x={26} y={23} rotate={18} />
        <Limb d="M38 28L46 32L51 26" />
        <Hand x={52} y={24} />
        <Head x={38} y={14} />
      </>
    ),
  },
  kid_jump: {
    fill: BODY,
    svg: (
      <>
        <ellipse cx="32" cy="60" rx="14" ry="2.5" fill="#cfd4da" />
        <path d="M22 52v4M32 51v5M42 52v4" {...MOTION} />
        <Limb d="M28 41L22 45L25 49" color={LEGS} />
        <Limb d="M36 41L42 45L39 49" color={LEGS} />
        <Shoe x={23} y={50} flip />
        <Shoe x={41} y={50} />
        <Limb d="M26 27L17 19L13 9" />
        <Limb d="M38 27L47 19L51 9" />
        <Hand x={13} y={7} />
        <Hand x={51} y={7} />
        <Torso x={24} y={24} />
        <Head x={32} y={15} mouth="open" />
      </>
    ),
  },
  kid_sit: {
    fill: BODY,
    svg: (
      <>
        <Limb d="M18 42L16 59M38 42L40 59" color="#a35f22" w={4} />
        <path d="M17 52h22" stroke="#a35f22" strokeWidth="3" />
        <rect x="12" y="37" width="32" height="6" rx="3" fill="#c8742c" />
        <Limb d="M26 36L44 36L44 53" color={LEGS} />
        <Limb d="M30 36L40 37L40 53" color={LEGS} />
        <Shoe x={45} y={55} />
        <Torso x={18} y={18} />
        <Limb d="M30 23L38 30L44 31" />
        <Hand x={45} y={31} />
        <Head x={26} y={9} />
      </>
    ),
  },
  kid_sleep: {
    fill: BODY,
    svg: (
      <>
        <rect x="4" y="26" width="6" height="32" rx="2" fill="#a35f22" />
        <rect x="54" y="36" width="6" height="22" rx="2" fill="#a35f22" />
        <rect x="6" y="44" width="52" height="8" rx="2" fill="#c8742c" />
        <rect x="9" y="30" width="16" height="10" rx="4" fill="#fff" stroke="#c4cad2" strokeWidth="1.5" />
        <Head x={18} y={30} mouth="sleep" />
        <path d="M24 46V36q0-4 6-5h22q4 0 4 5v10z" fill="#5aa02c" />
        <path d="M24 38h32" stroke="#4a8a22" strokeWidth="2" />
        <path d="M30 8h8l-8 9h8" fill="none" stroke={BODY} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M42 4h6l-6 6h6" fill="none" stroke={BODY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  kid_eat: {
    fill: BODY,
    svg: (
      <>
        <Limb d="M28 42L27 55" color={LEGS} />
        <Limb d="M36 42L37 55" color={LEGS} />
        <Shoe x={26} y={57} flip />
        <Shoe x={38} y={57} />
        <Torso x={24} y={24} />
        <Limb d="M26 28L20 36L26 38" />
        <ellipse cx="22" cy="36" rx="10" ry="3" fill="#f4b400" />
        <path d="M11 36h22a11 9 0 0 1-22 0z" fill="#e5443b" />
        <Limb d="M38 28L46 32L44 24" />
        <path d="M44 24L37 21" stroke="#8a8f98" strokeWidth="2.5" strokeLinecap="round" />
        <Hand x={44} y={24} />
        <Head x={30} y={13} mouth="open" />
        <ellipse cx="35.5" cy="18.5" rx="3.5" ry="2.4" fill="#8a8f98" />
      </>
    ),
  },
  kid_read: {
    fill: BODY,
    svg: (
      <>
        <Limb d="M28 42L27 55" color={LEGS} />
        <Limb d="M36 42L37 55" color={LEGS} />
        <Shoe x={26} y={57} flip />
        <Shoe x={38} y={57} />
        <Torso x={24} y={24} />
        <Head x={32} y={14} />
        <path d="M32 30L12 26V44L32 48L52 44V26z" fill="#e5443b" />
        <path d="M32 31L15 28V42L32 45z" fill="#fff" stroke="#c4cad2" strokeWidth="1" />
        <path d="M32 31L49 28V42L32 45z" fill="#fff" stroke="#c4cad2" strokeWidth="1" />
        <path d="M18 32l10 2M18 36l10 2M36 34l10-2M36 38l10-2" stroke="#9aa3ad" strokeWidth="1.5" strokeLinecap="round" />
        <Hand x={13} y={38} />
        <Hand x={51} y={38} />
      </>
    ),
  },
  kid_swim: {
    fill: BODY,
    svg: (
      <>
        <Limb d="M30 36Q36 14 50 26" />
        <Hand x={51} y={28} />
        <Head x={22} y={30} />
        <path d="M2 38q5-5 10 0t10 0 10 0 10 0 10 0 10 0V60H2z" fill="#4fb3e8" />
        <path d="M6 48q5-4 10 0t10 0 10 0 10 0 10 0" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="56" cy="22" r="2" fill="#4fb3e8" />
        <circle cx="58" cy="30" r="1.6" fill="#4fb3e8" />
        <circle cx="47" cy="18" r="1.6" fill="#4fb3e8" />
      </>
    ),
  },
  kid_sing: {
    fill: BODY,
    svg: (
      <>
        <Limb d="M24 42L23 55" color={LEGS} />
        <Limb d="M32 42L33 55" color={LEGS} />
        <Shoe x={22} y={57} flip />
        <Shoe x={34} y={57} />
        <Limb d="M22 28L12 34L8 28" />
        <Hand x={7} y={26} />
        <Limb d="M34 28L42 34" />
        <Hand x={43} y={35} />
        <Torso x={20} y={24} />
        <Head x={28} y={14} mouth="big" />
        <g fill="#8e44ad">
          <ellipse cx="42" cy="20" rx="3.5" ry="2.8" />
          <rect x="44" y="6" width="2" height="14" />
          <path d="M46 6q5 2 4 7q-1-3-4-3z" />
          <ellipse cx="52" cy="30" rx="3" ry="2.4" />
          <ellipse cx="60" cy="27" rx="3" ry="2.4" />
          <rect x="54" y="17" width="1.8" height="13" />
          <rect x="61.2" y="14" width="1.8" height="13" />
          <path d="M54 17l9-3v3l-9 3z" />
        </g>
      </>
    ),
  },
  kid_paint: {
    fill: BODY,
    svg: (
      <>
        <Limb d="M44 36L36 58M50 36L58 58M47 36V56" color="#a35f22" w={3.5} />
        <rect x="34" y="8" width="26" height="28" rx="1.5" fill="#fff" stroke="#a35f22" strokeWidth="2.5" />
        <circle cx="52" cy="17" r="4" fill="#f4b400" />
        <path d="M37 32l7-9 5 6 4-4 5 7z" fill="#5aa02c" />
        <path d="M38 14q3-3 6 0" fill="none" stroke="#e5443b" strokeWidth="2.5" strokeLinecap="round" />
        <Limb d="M14 42L13 55" color={LEGS} />
        <Limb d="M22 42L23 55" color={LEGS} />
        <Shoe x={12} y={57} flip />
        <Shoe x={24} y={57} />
        <Limb d="M12 28L8 40" />
        <Hand x={8} y={41} />
        <Torso x={10} y={24} />
        <Limb d="M24 28L30 28L32 24" />
        <path d="M32 24L39 18" stroke="#a35f22" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M39 18l3-3" stroke="#e5443b" strokeWidth="3.5" strokeLinecap="round" />
        <Hand x={32} y={24} />
        <Head x={18} y={14} />
      </>
    ),
  },
  kid_dig: {
    fill: BODY,
    svg: (
      <>
        <path d="M2 58h60" stroke="#6b4220" strokeWidth="3" strokeLinecap="round" />
        <Limb d="M18 42L16 55" color={LEGS} />
        <Limb d="M26 42L28 55" color={LEGS} />
        <Shoe x={15} y={56} flip />
        <Shoe x={29} y={56} />
        <Torso x={14} y={24} />
        <path d="M14 18L42 48M10 21.5L18 14.5" stroke="#a35f22" strokeWidth="3.5" strokeLinecap="round" />
        <g transform="rotate(-43 44 50)">
          <path d="M37 45h14v7q-7 9-14 0z" fill="#8a8f98" />
        </g>
        <path d="M42 58q2-13 10-14t10 14z" fill="#8b5a2b" />
        <circle cx="47" cy="54" r="1.6" fill="#6b4220" />
        <circle cx="54" cy="50" r="1.6" fill="#6b4220" />
        <circle cx="57" cy="55" r="1.6" fill="#6b4220" />
        <circle cx="54" cy="36" r="2" fill="#8b5a2b" />
        <circle cx="59" cy="40" r="1.6" fill="#8b5a2b" />
        <Limb d="M17 28L20 25" />
        <Limb d="M28 29L29 34" />
        <Hand x={20} y={24.5} />
        <Hand x={29} y={34} />
        <Head x={22} y={14} />
      </>
    ),
  },
  kid_kick: {
    fill: BODY,
    svg: (
      <>
        <Limb d="M24 42L22 56" color={LEGS} />
        <Shoe x={21} y={57} flip />
        <Limb d="M30 41L38 48L44 46" color={LEGS} />
        <Shoe x={45} y={46} />
        <path d="M36 54q4 3 9 1M33 58q6 3 12 0" {...MOTION} />
        <Limb d="M20 28L12 36" />
        <Hand x={11} y={37} />
        <Limb d="M32 28L40 22" />
        <Hand x={41} y={21} />
        <Torso x={18} y={24} rotate={-8} />
        <Head x={24} y={14} />
        <circle cx="54" cy="45" r="9" fill="#e5443b" />
        <path d="M46 42c5 2 11 2 16 0M46 48c5-2 11-2 16 0" fill="none" stroke="#fff" strokeWidth="2" />
      </>
    ),
  },
}
