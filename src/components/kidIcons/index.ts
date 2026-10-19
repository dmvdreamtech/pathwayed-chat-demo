import { ICONS as animals } from './animals'
import { ICONS as animals2 } from './animals2'
import { ICONS as clothes } from './clothes'
import { ICONS as feelings } from './feelings'
import { ICONS as food } from './food'
import { ICONS as home } from './home'
import { ICONS as kitchen } from './kitchen'
import { ICONS as kids } from './kids'
import { ICONS as nature } from './nature'
import { ICONS as phonics } from './phonics'
import { ICONS as play } from './play'
import type { KidIconDrawing } from './types'

/** Every picture beyond the first set, by name (see src/lib/kidImages.ts). */
export const EXTRA_ICONS: Record<string, KidIconDrawing> = {
  ...animals,
  ...animals2,
  ...food,
  ...kitchen,
  ...home,
  ...clothes,
  ...play,
  ...nature,
  ...phonics,
  ...kids,
  ...feelings,
}
