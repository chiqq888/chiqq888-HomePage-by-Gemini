import { createContext, useContext } from 'react'

export type ScrollControls = {
  lockScroll: () => () => void
  scrollToHash: (hash: string) => boolean
}

export const ScrollControlsContext = createContext<ScrollControls | null>(null)

export function useScrollControls() {
  const controls = useContext(ScrollControlsContext)
  if (!controls) throw new Error('Scroll controls require SmoothScrollProvider')
  return controls
}
