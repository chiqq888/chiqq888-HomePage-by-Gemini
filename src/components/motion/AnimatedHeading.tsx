import { useRef, type HTMLAttributes } from 'react'
import SplitType from 'split-type'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { HEADING_REVEAL } from '../../lib/motionSettings'
import styles from './AnimatedHeading.module.css'

type AnimatedHeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3'
}

function AnimatedHeading({
  as: Heading = 'h2',
  children,
  className = '',
  ...props
}: AnimatedHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const revealed = useRef(false)

  useGSAP((_context, contextSafe) => {
    const heading = headingRef.current
    if (!heading || !contextSafe) return

    let disposed = false
    let fontsReady = false
    let split: SplitType | undefined
    let trigger: ScrollTrigger | undefined
    let timeline: gsap.core.Timeline | undefined
    let resizeCall: gsap.core.Tween | undefined
    let measuredWidth = heading.getBoundingClientRect().width
    const parent = heading.parentElement
    let measuredParentWidth = parent?.getBoundingClientRect().width ?? measuredWidth
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const originalLabel = heading.getAttribute('aria-label')
    const originalState = heading.getAttribute('data-heading-motion')
    const originalWidth = heading.style.width
    const originalHeight = heading.style.height

    const restoreLabel = () => {
      if (originalLabel === null) heading.removeAttribute('aria-label')
      else heading.setAttribute('aria-label', originalLabel)
    }

    const revertSplit = () => {
      trigger?.kill()
      timeline?.kill()
      trigger = undefined
      timeline = undefined
      split?.revert()
      split = undefined
      // SplitType restores its dimensions; retain any author-provided styles.
      heading.style.width = originalWidth
      heading.style.height = originalHeight
      restoreLabel()
    }

    const showImmediately = () => {
      revealed.current = true
      revertSplit()
      heading.dataset.headingMotion = 'revealed'
    }

    const splitHeading = contextSafe(() => {
      if (disposed || !fontsReady) return
      revertSplit()

      if (media.matches) {
        showImmediately()
        return
      }

      const label = heading.textContent?.replace(/\s+/g, ' ').trim() ?? ''
      if (!label) {
        heading.dataset.headingMotion = 'revealed'
        return
      }

      split = new SplitType(heading, {
        types: 'lines',
        tagName: 'span',
        lineClass: 'line',
      })

      const lines = split.lines ?? []
      const alignment = window.getComputedStyle(heading).textAlign

      for (const line of lines) {
        const inner = document.createElement('span')
        inner.className = 'line--inner'
        inner.append(...Array.from(line.childNodes))

        const mask = document.createElement('span')
        mask.className = 'line--mask'
        mask.setAttribute('aria-hidden', 'true')

        line.setAttribute('aria-hidden', 'true')
        line.style.width = 'fit-content'
        line.style.setProperty('--heading-reveal-duration', `${HEADING_REVEAL.duration}s`)
        if (alignment === 'right' || alignment === 'end') line.style.marginLeft = 'auto'
        if (alignment === 'center') line.style.marginInline = 'auto'
        line.append(inner, mask)
      }

      // Keep one accessible heading name instead of announcing each visual line.
      if (!heading.hasAttribute('aria-labelledby')) {
        heading.setAttribute('aria-label', originalLabel ?? label)
      }

      measuredWidth = heading.getBoundingClientRect().width
      measuredParentWidth = parent?.getBoundingClientRect().width ?? measuredWidth
      heading.dataset.headingMotion = revealed.current ? 'revealed' : 'ready'
      if (revealed.current || !lines.length) return

      timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (!disposed) heading.dataset.headingMotion = 'revealed'
        },
      })

      lines.forEach((line, index) => {
        timeline?.call(() => line.classList.add('animated--line'), [], index * HEADING_REVEAL.stagger)
      })
      // Keep the class stagger and CSS animation in the same GSAP lifetime.
      timeline.to({}, {
        duration: HEADING_REVEAL.duration,
      }, Math.max(0, lines.length - 1) * HEADING_REVEAL.stagger)

      const play = () => {
        if (disposed || revealed.current) return
        revealed.current = true
        heading.dataset.headingMotion = 'playing'
        timeline?.play(0)
      }

      trigger = ScrollTrigger.create({
        trigger: heading,
        start: HEADING_REVEAL.start,
        once: true,
        onEnter: play,
      })
      // Restored scroll positions and headings already in view should play too.
      const bounds = heading.getBoundingClientRect()
      if (window.scrollY >= trigger.start || (bounds.top < window.innerHeight && bounds.bottom > 0)) play()
    })

    const observer = new ResizeObserver(contextSafe(() => {
      if (disposed || !fontsReady) return
      const width = heading.getBoundingClientRect().width
      const parentWidth = parent?.getBoundingClientRect().width ?? width
      if (Math.abs(width - measuredWidth) < 0.5 && Math.abs(parentWidth - measuredParentWidth) < 0.5) return
      measuredWidth = width
      measuredParentWidth = parentWidth
      resizeCall?.kill()
      // Ignore height changes from the line wrappers and coalesce width changes.
      resizeCall = gsap.delayedCall(0.1, splitHeading)
    }))

    const handlePreference = contextSafe(() => {
      if (disposed) return
      resizeCall?.kill()
      if (media.matches) showImmediately()
      else splitHeading()
    })

    media.addEventListener('change', handlePreference)
    if (media.matches) showImmediately()
    else heading.dataset.headingMotion = revealed.current ? 'revealed' : 'pending'

    const afterFonts = contextSafe(() => {
      if (disposed) return
      fontsReady = true
      splitHeading()
      observer.observe(heading)
      if (parent) observer.observe(parent)
    })
    void document.fonts.ready.then(afterFonts)

    return () => {
      disposed = true
      observer.disconnect()
      media.removeEventListener('change', handlePreference)
      resizeCall?.kill()
      revertSplit()
      if (originalState === null) heading.removeAttribute('data-heading-motion')
      else heading.setAttribute('data-heading-motion', originalState)
    }
  }, { scope: headingRef, dependencies: [Heading, children], revertOnUpdate: true })

  return (
    <Heading {...props} ref={headingRef} className={`${styles.heading} ${className}`.trim()}>
      {children}
    </Heading>
  )
}

export default AnimatedHeading
