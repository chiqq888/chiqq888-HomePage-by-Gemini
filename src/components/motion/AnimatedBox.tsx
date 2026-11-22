import { useCallback, useRef, type CSSProperties, type HTMLAttributes } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { BOX_REVEAL } from '../../lib/motionSettings'
import styles from './AnimatedBox.module.css'

type AnimatedBoxProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'article' | 'dt' | 'li'
  contentClassName?: string
  delay?: number
  maskColor?: string
  hoverEffect?: 'work' | 'stack-label' | 'stack-icon'
}

const hoverStyles = {
  work: styles.workHover,
  'stack-label': styles.stackLabelHover,
  'stack-icon': styles.stackIconHover,
}

function AnimatedBox({
  as: Box = 'div',
  children,
  className = '',
  contentClassName = '',
  delay = 0,
  maskColor = '#1e1e1e',
  hoverEffect,
  style,
  ...props
}: AnimatedBoxProps) {
  const boxRef = useRef<HTMLElement>(null)
  const setBoxRef = useCallback((element: HTMLElement | null) => {
    boxRef.current = element
  }, [])

  useGSAP(() => {
    const box = boxRef.current
    if (!box) return

    const originalState = box.getAttribute('data-box-motion')
    const restoreState = () => {
      if (originalState === null) box.removeAttribute('data-box-motion')
      else box.setAttribute('data-box-motion', originalState)
    }
    const media = gsap.matchMedia()

    media.add({ all: 'all', reduceMotion: '(prefers-reduced-motion: reduce)' }, (context) => {
      if (context.conditions?.reduceMotion) {
        box.dataset.boxMotion = 'revealed'
        return restoreState
      }

      let disposed = false
      let requested = false
      let startCall: gsap.core.Tween | undefined
      box.dataset.boxMotion = 'ready'

      const timeline = gsap.timeline({
        paused: true,
        onStart: () => {
          if (disposed || !requested) return
          box.dataset.boxMotion = 'playing'
        },
        onComplete: () => {
          if (!disposed && requested) box.dataset.boxMotion = 'revealed'
        },
      })
      // CSS owns the wipe; GSAP owns its scroll trigger and lifetime.
      timeline.to({}, { duration: BOX_REVEAL.duration })

      // Keep deferred work in this media lifetime, outside the parent GSAP context.
      const play = () => {
        if (disposed || requested) return
        requested = true
        // Defer even a zero-delay start so StrictMode can clean up its first setup.
        startCall = gsap.delayedCall(Math.max(0, delay), () => {
          startCall = undefined
          if (disposed || !requested) return
          timeline.play(0)
        })
      }
      const trigger = ScrollTrigger.create({
        trigger: box,
        start: BOX_REVEAL.start,
        end: 'bottom top',
        onEnter: play,
        once: true,
      })
      // A page opened past this entry point follows the same state as scrolling.
      if (window.scrollY >= trigger.start) play()

      return () => {
        disposed = true
        trigger.kill()
        startCall?.kill()
        timeline.kill()
        restoreState()
      }
    })

    return () => media.revert()
  }, { scope: boxRef, dependencies: [Box, delay], revertOnUpdate: true })

  return (
    <Box
      {...props}
      data-box-motion="ready"
      ref={setBoxRef}
      className={`${styles.box} ${hoverEffect ? hoverStyles[hoverEffect] : ''} ${className}`.trim()}
      style={{
        ...style,
        '--box-reveal-duration': `${BOX_REVEAL.duration}s`,
        '--box-reveal-color': maskColor,
      } as CSSProperties}
    >
      <div className={`${styles.content} ${contentClassName}`.trim()}>{children}</div>
      <span className={styles.mask} aria-hidden="true" />
    </Box>
  )
}

export default AnimatedBox
