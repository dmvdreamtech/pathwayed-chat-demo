import type { ReactNode } from 'react'

/** One hand-drawn picture: the main fill colour and the shapes, on a 0 0 64 64 viewBox. */
export interface KidIconDrawing {
  fill: string
  svg: ReactNode
}
