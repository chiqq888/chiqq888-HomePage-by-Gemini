import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import {
  CHIQQ_ACCENT_MARKS,
  CHIQQ_LOGO_VIEWBOX,
  CHIQQ_MAIN_STROKES,
} from './chiqqLogoPaths'

type ChiqqLogoProps = {
  className?: string
}

function ChiqqLogo({ className = '' }: ChiqqLogoProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)
  const replayRef = useRef<(() => void) | null>(null)
  const hoverRef = useRef<(() => void) | null>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: reduce)', () => {
        replayRef.current = null
        hoverRef.current = null

        const letters = container.querySelectorAll<SVGGElement>('[data-logo-letter]')
        const strokes = container.querySelectorAll<SVGPathElement>('[data-logo-stroke]')
        const accents = container.querySelectorAll<SVGPathElement>('[data-logo-accent]')

        gsap.set(letters, { x: 0, y: 0, rotation: 0, scale: 1 })
        gsap.set(strokes, {
          fillOpacity: 1,
          strokeOpacity: 0,
          strokeDasharray: 'none',
          strokeDashoffset: 0,
        })
        gsap.set(accents, { opacity: 1, x: 0, y: 0, scale: 1 })
      })

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const letters = Array.from(
          container.querySelectorAll<SVGGElement>('[data-logo-letter]'),
        )
        const strokeEntries = CHIQQ_MAIN_STROKES.map(({ id }) => {
          const letter = container.querySelector<SVGGElement>(
            `[data-logo-letter="${id}"]`,
          )
          const stroke = container.querySelector<SVGPathElement>(
            `[data-logo-stroke="${id}"]`,
          )
          const measuredLength = stroke?.getTotalLength() ?? 0
          return {
            letter,
            stroke,
            length: measuredLength > 0 ? measuredLength : 6000,
          }
        })

        const iDot = container.querySelector<SVGPathElement>(
          '[data-logo-accent="iDot"]',
        )
        const q1Arc = container.querySelector<SVGPathElement>(
          '[data-logo-accent="q1Arc"]',
        )
        const q1Dot = container.querySelector<SVGPathElement>(
          '[data-logo-accent="q1Dot"]',
        )
        const q2Arc = container.querySelector<SVGPathElement>(
          '[data-logo-accent="q2Arc"]',
        )
        const q2Dot = container.querySelector<SVGPathElement>(
          '[data-logo-accent="q2Dot"]',
        )
        const qAccents = [q1Arc, q1Dot, q2Arc, q2Dot].filter(
          (node): node is SVGPathElement => node !== null,
        )

        let revealTl: gsap.core.Timeline | null = null
        let hoverTl: gsap.core.Timeline | null = null
        let visibilityTrigger: ScrollTrigger | null = null

        const playReveal = () => {
          revealTl?.kill()
          hoverTl?.kill()
          hoverTl = null

          if (letters.length) {
            gsap.set(letters, {
              x: 0,
              y: 28,
              rotation: -2.5,
              scale: 1,
              transformOrigin: '50% 60%',
            })
          }

          for (const { stroke, length } of strokeEntries) {
            if (!stroke) continue
            gsap.set(stroke, {
              strokeDasharray: length,
              strokeDashoffset: length,
              strokeOpacity: 0.9,
              fillOpacity: 0,
            })
          }

          if (iDot) {
            gsap.set(iDot, {
              opacity: 0,
              scale: 0,
              y: -44,
              transformOrigin: 'center center',
            })
          }

          if (qAccents.length) {
            gsap.set(qAccents, {
              opacity: 0,
              scale: 0.35,
              y: 0,
              transformOrigin: 'center center',
            })
          }

          const tl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            repeatDelay: 0.25,
          })
          revealTl = tl

          strokeEntries.forEach(({ letter, stroke }, idx) => {
            const t = idx * 0.13
            if (stroke) {
              tl.to(
                stroke,
                {
                  strokeDashoffset: 0,
                  duration: 0.72,
                  ease: 'power2.inOut',
                },
                t,
              )
            }
            if (letter) {
              tl.to(
                letter,
                {
                  y: 0,
                  rotation: 0,
                  duration: 0.68,
                  ease: 'power3.out',
                },
                t,
              )
            }
            if (stroke) {
              tl.to(
                stroke,
                {
                  fillOpacity: 1,
                  duration: 0.42,
                  ease: 'power2.out',
                },
                t + 0.32,
              ).to(
                stroke,
                {
                  strokeOpacity: 0,
                  duration: 0.34,
                  ease: 'power2.out',
                },
                t + 0.46,
              )
            }
          })

          if (iDot) {
            tl.to(
              iDot,
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: 'back.out(2.6)',
              },
              0.56,
            )
          }

          if (q1Arc) {
            tl.to(
              q1Arc,
              {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(2.2)',
              },
              0.7,
            )
          }

          if (q1Dot) {
            tl.to(
              q1Dot,
              {
                opacity: 1,
                scale: 1,
                duration: 0.36,
                ease: 'back.out(2.6)',
              },
              0.8,
            )
          }

          if (q2Arc) {
            tl.to(
              q2Arc,
              {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(2.2)',
              },
              0.84,
            )
          }

          if (q2Dot) {
            tl.to(
              q2Dot,
              {
                opacity: 1,
                scale: 1,
                duration: 0.36,
                ease: 'back.out(2.6)',
              },
              0.94,
            )
          }

          // Hold the completed solid wordmark before yoyo reverses back out.
          tl.to({}, { duration: 0.75 }, 1.3)
          return tl
        }

        const playHover = () => {
          if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return
          }

          hoverTl?.kill()
          hoverTl = gsap.timeline()

          if (letters.length) {
            hoverTl
              .to(
                letters,
                {
                  scale: 1.05,
                  duration: 0.2,
                  stagger: 0.05,
                  ease: 'power2.out',
                },
                0,
              )
              .to(
                letters,
                {
                  scale: 1,
                  duration: 0.38,
                  stagger: 0.05,
                  ease: 'elastic.out(1, 0.55)',
                },
                0.2,
              )
          }
        }

        replayRef.current = playReveal
        hoverRef.current = playHover
        const initialTimeline = playReveal()

        visibilityTrigger = ScrollTrigger.create({
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => revealTl?.play(),
          onEnterBack: () => revealTl?.play(),
          onLeave: () => revealTl?.pause(),
          onLeaveBack: () => revealTl?.pause(),
        })
        if (!visibilityTrigger.isActive) initialTimeline.pause()

        return () => {
          visibilityTrigger?.kill()
          revealTl?.kill()
          hoverTl?.kill()
          replayRef.current = null
          hoverRef.current = null
        }
      })

      return () => {
        media.revert()
      }
    },
    { scope: containerRef },
  )

  return (
    <h1 ref={containerRef} className={className}>
      <span className="sr-only">chiqq</span>
      <button
        type="button"
        onClick={() => replayRef.current?.()}
        onMouseEnter={() => hoverRef.current?.()}
        aria-label="Replay chiqq logo animation"
        className="block w-full cursor-pointer border-0 bg-transparent p-0 text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <svg
          viewBox={CHIQQ_LOGO_VIEWBOX}
          fill="none"
          aria-hidden="true"
          className="block h-auto w-full overflow-visible"
        >
          {CHIQQ_MAIN_STROKES.map(({ id, d }) => (
            <g key={id} data-logo-letter={id}>
              <path
                data-logo-stroke={id}
                d={d}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={16}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}
          {CHIQQ_ACCENT_MARKS.map(({ id, d }) => (
            <path key={id} data-logo-accent={id} d={d} fill="currentColor" />
          ))}
        </svg>
      </button>
    </h1>
  )
}

export default ChiqqLogo
