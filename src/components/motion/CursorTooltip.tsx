import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import styles from './CursorTooltip.module.css'

type CursorTooltipProps = {
  containerRef: RefObject<HTMLElement | null>
}

function CursorTooltip({ containerRef }: CursorTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef<(() => void) | null>(null)
  const [tooltip, setTooltip] = useState({ name: '', visible: false })

  useEffect(() => {
    const container = containerRef.current
    const element = tooltipRef.current
    if (!container || !element) return

    let activeName: string | null = null
    let frame = 0
    let pointer = { x: 0, y: 0 }
    const position = () => {
      const margin = 8
      const width = element.offsetWidth
      const height = element.offsetHeight
      let x = pointer.x + 16
      let y = pointer.y + 18
      if (x + width > window.innerWidth - margin) x = pointer.x - width - 16
      if (y + height > window.innerHeight - margin) y = pointer.y - height - 18
      x = Math.max(margin, Math.min(x, window.innerWidth - width - margin))
      y = Math.max(margin, Math.min(y, window.innerHeight - height - margin))
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    positionRef.current = position

    const hide = () => {
      activeName = null
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      // Keep the last name and position in place while opacity fades out.
      setTooltip(current => current.visible ? { ...current, visible: false } : current)
    }
    const getName = (target: EventTarget | null) => {
      const icon = target instanceof Element ? target.closest<HTMLElement>('[data-cursor-label]') : null
      return icon && container.contains(icon) ? icon.dataset.cursorLabel ?? null : null
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        hide()
        return
      }
      const name = getName(event.target)
      if (!name) {
        hide()
        return
      }
      pointer = { x: event.clientX, y: event.clientY }
      if (name !== activeName) {
        activeName = name
        setTooltip({ name, visible: true })
      }
      // Moving the cursor updates only its position, without React renders.
      if (!frame) frame = window.requestAnimationFrame(() => {
        frame = 0
        if (activeName) position()
      })
    }
    const leave = (event: PointerEvent) => {
      if (!getName(event.relatedTarget)) hide()
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hide()
    }

    container.addEventListener('pointerover', move)
    container.addEventListener('pointermove', move)
    container.addEventListener('pointerout', leave)
    container.addEventListener('pointerleave', hide)
    window.addEventListener('scroll', hide, { capture: true, passive: true })
    window.addEventListener('resize', hide)
    window.addEventListener('blur', hide)
    document.addEventListener('keydown', handleKey)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      positionRef.current = null
      container.removeEventListener('pointerover', move)
      container.removeEventListener('pointermove', move)
      container.removeEventListener('pointerout', leave)
      container.removeEventListener('pointerleave', hide)
      window.removeEventListener('scroll', hide, true)
      window.removeEventListener('resize', hide)
      window.removeEventListener('blur', hide)
      document.removeEventListener('keydown', handleKey)
    }
  }, [containerRef])

  useLayoutEffect(() => {
    if (tooltip.visible) positionRef.current?.()
  }, [tooltip.name, tooltip.visible])

  // Image alt text already supplies the accessible name; this is its visual label.
  return createPortal(
    <div
      ref={tooltipRef}
      data-cursor-tooltip
      data-visible={tooltip.visible}
      aria-hidden="true"
      className={styles.tooltip}
    >
      {tooltip.name}
    </div>,
    document.body,
  )
}

export default CursorTooltip
