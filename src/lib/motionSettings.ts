export const SCROLL_LERP = 0.13

export const PARAGRAPH_REVEAL = {
  duration: 0.9,
  ease: 'power3.inOut',
  start: 'top 92%',
} as const

export const HEADING_REVEAL = {
  duration: 0.9,
  stagger: 0.1,
  start: 'top 95%',
} as const

export const BOX_REVEAL = {
  duration: 0.85,
  stagger: 0.06,
  start: 'top 92%',
} as const

export const MENU_MOTION = {
  enterDuration: 0.6,
  exitDuration: 0.6,
  textDuration: 1,
  stagger: 0,
  textStart: 0,
  backdropBlur: '0.75rem',
  ease: 'menu-panel',
  overlayEase: 'menu-overlay',
} as const
