import { useRef } from 'react'
import AnimatedHeading from '../../components/motion/AnimatedHeading'
import CursorTooltip from '../../components/motion/CursorTooltip'
import RevealParagraph from '../../components/motion/RevealParagraph'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { STORY_MARK_PATH, STORY_ROW_OFFSETS, STORY_WORDMARK_GLYPHS } from './moradkStoryPaths'

const etymologyItems = [
  { token: 'ม.', label: 'University', note: 'KMITL COHORT', accentDot: true },
  { token: 'รดก', label: 'Heritage', note: 'SHARED LEGACY', accentDot: false },
] as const

function MoradkOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const replayMarkRef = useRef<(() => void) | null>(null)
  const hoverMarkRef = useRef<((hovered: boolean) => void) | null>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: reduce)', () => {
        replayMarkRef.current = null
        hoverMarkRef.current = null

        const wipeWire = section.querySelector<SVGSVGElement>('[data-mark-wipe="wire"]')
        const wipeAccent = section.querySelector<SVGSVGElement>('[data-mark-wipe="accent"]')
        const wipeMain = section.querySelector<SVGSVGElement>('[data-mark-wipe="main"]')
        const shiftWire = section.querySelector<HTMLElement>('[data-mark-shift="wire"]')
        const shiftAccent = section.querySelector<HTMLElement>('[data-mark-shift="accent"]')
        const shiftMain = section.querySelector<HTMLElement>('[data-mark-shift="main"]')
        const enterRows = section.querySelectorAll<SVGGElement>('[data-story-row-enter]')

        if (wipeWire && wipeAccent && wipeMain) {
          gsap.set([wipeWire, wipeAccent, wipeMain], { clipPath: 'inset(0 0% 0 0)', opacity: 1 })
        }
        if (shiftMain) gsap.set(shiftMain, { x: 0, y: 0 })
        if (shiftAccent) gsap.set(shiftAccent, { x: -5, y: 4 })
        if (shiftWire) gsap.set(shiftWire, { x: 6, y: -5 })
        if (enterRows.length) gsap.set(enterRows, { x: 0, opacity: 1 })

        STORY_ROW_OFFSETS.forEach((_, rowIdx) => {
          const glyphs = section.querySelectorAll<SVGPathElement>(`[data-story-glyph="${rowIdx}"]`)
          const dot = section.querySelector<SVGPathElement>(`[data-story-dot="${rowIdx}"]`)
          const genDot = section.querySelector<HTMLElement>(`[data-story-gen-dot="${rowIdx}"]`)
          const isFeatured = rowIdx === 1

          if (glyphs.length) {
            gsap.set(glyphs, {
              fillOpacity: isFeatured ? 1 : 0,
              strokeOpacity: isFeatured ? 0 : 0.24,
            })
          }
          if (dot) {
            gsap.set(dot, {
              fillOpacity: isFeatured ? 1 : 0,
              strokeOpacity: isFeatured ? 0 : 0.24,
              scale: 1,
            })
          }
          if (genDot) {
            gsap.set(genDot, {
              backgroundColor: isFeatured ? '#f16322' : 'rgba(30, 30, 30, 0.2)',
              scaleX: isFeatured ? 1.4 : 1,
            })
          }
        })
      })

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const stage = section.querySelector<HTMLElement>('[data-story-stage]')
        const wipeWire = section.querySelector<SVGSVGElement>('[data-mark-wipe="wire"]')
        const wipeAccent = section.querySelector<SVGSVGElement>('[data-mark-wipe="accent"]')
        const wipeMain = section.querySelector<SVGSVGElement>('[data-mark-wipe="main"]')
        const shiftWire = section.querySelector<HTMLElement>('[data-mark-shift="wire"]')
        const shiftAccent = section.querySelector<HTMLElement>('[data-mark-shift="accent"]')
        const shiftMain = section.querySelector<HTMLElement>('[data-mark-shift="main"]')
        const enterRows = section.querySelectorAll<SVGGElement>('[data-story-row-enter]')
        const parallaxRows = section.querySelectorAll<SVGGElement>('[data-story-row-parallax]')

        let markRevealTl: gsap.core.Timeline | null = null
        let idleBeatTl: gsap.core.Timeline | null = null
        let loopTl: gsap.core.Timeline | null = null
        let enterTrigger: ScrollTrigger | null = null
        let revealed = false
        let isHovered = false

        const buildIdleBeat = () => {
          if (!shiftMain || !shiftAccent || !shiftWire) return
          idleBeatTl?.kill()
          idleBeatTl = gsap.timeline({
            repeat: -1,
            repeatDelay: 2.8,
            delay: 2.2,
            paused: isHovered,
          })

          idleBeatTl
            .to(shiftMain, { x: 3, y: -3, duration: 0.42, ease: 'power3.out' }, 0)
            .to(shiftAccent, { x: -9, y: 7, duration: 0.42, ease: 'power3.out' }, 0)
            .to(shiftWire, { x: 10, y: -8, duration: 0.42, ease: 'power3.out' }, 0)
            .to(
              [shiftMain, shiftAccent, shiftWire],
              { x: 0, y: 0, duration: 0.48, ease: 'power3.inOut' },
              0.97,
            )
        }

        const playMarkReveal = () => {
          if (!wipeAccent || !wipeMain || !wipeWire || !shiftMain || !shiftAccent || !shiftWire) {
            return
          }

          idleBeatTl?.kill()
          idleBeatTl = null
          markRevealTl?.kill()
          gsap.killTweensOf([shiftMain, shiftAccent, shiftWire])

          gsap.set([wipeAccent, wipeMain], { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
          gsap.set(wipeWire, { clipPath: 'inset(0 0% 0 0)', opacity: 0 })

          markRevealTl = gsap.timeline({
            onComplete: () => {
              if (!isHovered) buildIdleBeat()
            },
          })

          markRevealTl
            .to(wipeAccent, { clipPath: 'inset(0 0% 0 0)', duration: 0.58, ease: 'power4.inOut' }, 0)
            .to(wipeMain, { clipPath: 'inset(0 0% 0 0)', duration: 0.58, ease: 'power4.inOut' }, 0.14)
            .to(wipeWire, { opacity: 1, duration: 0.38, ease: 'power2.out' }, 0.34)

          if (!isHovered) {
            markRevealTl
              .fromTo(
                shiftAccent,
                { x: -12, y: 10 },
                { x: 0, y: 0, duration: 0.6, ease: 'power3.out' },
                0.2,
              )
              .fromTo(
                shiftWire,
                { x: 12, y: -10 },
                { x: 0, y: 0, duration: 0.6, ease: 'power3.out' },
                0.2,
              )
              .fromTo(
                shiftMain,
                { x: 4, y: -4 },
                { x: 0, y: 0, duration: 0.6, ease: 'power3.out' },
                0.2,
              )
          }
        }

        replayMarkRef.current = playMarkReveal

        hoverMarkRef.current = (hovered: boolean) => {
          isHovered = hovered
          if (!shiftMain || !shiftAccent || !shiftWire) return

          if (hovered) {
            idleBeatTl?.pause()
            gsap.to(shiftMain, { x: 4, y: -4, duration: 0.38, ease: 'power3.out', overwrite: 'auto' })
            gsap.to(shiftAccent, { x: -11, y: 9, duration: 0.38, ease: 'power3.out', overwrite: 'auto' })
            gsap.to(shiftWire, { x: 12, y: -10, duration: 0.38, ease: 'power3.out', overwrite: 'auto' })
          } else {
            gsap.to([shiftMain, shiftAccent, shiftWire], {
              x: 0,
              y: 0,
              duration: 0.45,
              ease: 'power3.out',
              overwrite: 'auto',
              onComplete: () => {
                if (!isHovered && revealed) buildIdleBeat()
              },
            })
          }
        }

        if (wipeAccent && wipeMain) {
          gsap.set([wipeAccent, wipeMain], { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
        }
        if (wipeWire) {
          gsap.set(wipeWire, { clipPath: 'inset(0 0% 0 0)', opacity: 0 })
        }
        if (enterRows.length) {
          gsap.set(enterRows, {
            x: (idx: number) => (idx % 2 === 0 ? -36 : 36),
            opacity: 0,
          })
        }

        const startGenerationalLoop = () => {
          loopTl?.kill()
          loopTl = gsap.timeline({ repeat: -1, delay: 0.35 })

          let t = 0
          STORY_ROW_OFFSETS.forEach((_, rowIdx) => {
            const glyphs = section.querySelectorAll<SVGPathElement>(`[data-story-glyph="${rowIdx}"]`)
            const dot = section.querySelector<SVGPathElement>(`[data-story-dot="${rowIdx}"]`)
            const genDot = section.querySelector<HTMLElement>(`[data-story-gen-dot="${rowIdx}"]`)

            if (glyphs.length) {
              loopTl?.to(
                glyphs,
                {
                  fillOpacity: 1,
                  strokeOpacity: 0,
                  duration: 0.42,
                  stagger: 0.045,
                  ease: 'power2.out',
                },
                t,
              )
            }

            if (dot) {
              loopTl?.to(
                dot,
                {
                  fillOpacity: 1,
                  strokeOpacity: 0,
                  scale: 1.18,
                  duration: 0.45,
                  ease: 'back.out(2)',
                },
                t + 0.06,
              )
            }

            if (genDot) {
              loopTl?.to(
                genDot,
                {
                  backgroundColor: '#f16322',
                  scaleX: 1.4,
                  duration: 0.35,
                  ease: 'power2.out',
                },
                t,
              )
            }

            const fadeOutAt = t + 1.35
            if (glyphs.length) {
              loopTl?.to(
                glyphs,
                {
                  fillOpacity: 0,
                  strokeOpacity: 0.22,
                  duration: 0.4,
                  ease: 'power2.inOut',
                },
                fadeOutAt,
              )
            }

            if (dot) {
              loopTl?.to(
                dot,
                {
                  fillOpacity: 0,
                  strokeOpacity: 0.22,
                  scale: 1,
                  duration: 0.4,
                  ease: 'power2.inOut',
                },
                fadeOutAt,
              )
            }

            if (genDot) {
              loopTl?.to(
                genDot,
                {
                  backgroundColor: 'rgba(30, 30, 30, 0.2)',
                  scaleX: 1,
                  duration: 0.35,
                  ease: 'power2.inOut',
                },
                fadeOutAt,
              )
            }

            t += 1.4
          })
        }

        const reveal = () => {
          if (revealed) return
          revealed = true

          playMarkReveal()

          if (enterRows.length) {
            gsap.to(enterRows, {
              x: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.09,
              ease: 'power3.out',
              overwrite: 'auto',
            })
          }

          startGenerationalLoop()
        }

        const triggerTarget = stage ?? section
        enterTrigger = ScrollTrigger.create({
          trigger: triggerTarget,
          start: 'top 82%',
          once: true,
          onEnter: reveal,
        })

        const bounds = triggerTarget.getBoundingClientRect()
        if (window.scrollY >= enterTrigger.start || (bounds.top < window.innerHeight && bounds.bottom > 0)) {
          reveal()
        }

        parallaxRows.forEach((row, idx) => {
          const fromX = idx % 2 === 0 ? -22 : 22
          gsap.fromTo(
            row,
            { x: fromX },
            {
              x: -fromX,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )
        })

        return () => {
          enterTrigger?.kill()
          markRevealTl?.kill()
          idleBeatTl?.kill()
          loopTl?.kill()
          replayMarkRef.current = null
          hoverMarkRef.current = null
        }
      })

      return () => media.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="brief"
      aria-labelledby="moradk-overview-heading"
      className="relative w-full scroll-mt-20 overflow-x-clip border-b border-ink/12 bg-white py-20 md:scroll-mt-24 md:py-24 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-12 xl:px-16">
        <div className="lg:col-span-5">
          <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-ink/50">
            [01 / The Story]
          </p>
          <AnimatedHeading
            as="h2"
            id="moradk-overview-heading"
            className="text-[clamp(30px,3.8vw,52px)] leading-[1.06] tracking-tight"
          >
            PASSING DOWN CAMPUS WISDOM
          </AnimatedHeading>

          <div aria-hidden="true" className="my-5 h-px w-14 bg-ink/20 md:my-6" />

          <RevealParagraph className="max-w-[44ch] text-sm font-bold leading-relaxed text-ink sm:text-base">
            From &ldquo;มรดก&rdquo; (heritage) to &ldquo;ม.รดก&rdquo; &mdash; turning fleeting campus advice into a lasting student archive.
          </RevealParagraph>

          <dl className="mt-7 divide-y divide-ink/12 border-y border-ink/12">
            {etymologyItems.map(({ token, label, note, accentDot }) => (
              <div
                key={token}
                className="grid grid-cols-[52px_1fr_auto] items-center gap-3 py-3 text-xs"
              >
                <dt className="text-sm font-bold tracking-tight text-ink">
                  {accentDot ? (
                    <>
                      <span>ม</span>
                      <span className="text-[#f16322]">.</span>
                    </>
                  ) : (
                    token
                  )}
                </dt>
                <dd className="font-bold tracking-wide text-ink/80">{label}</dd>
                <dd className="text-[10px] font-medium tracking-[0.16em] uppercase text-ink/45">
                  {note}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-story-stage className="grid grid-cols-1 gap-4 sm:grid-cols-12 lg:col-span-7">
          <button
            type="button"
            onClick={() => replayMarkRef.current?.()}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') hoverMarkRef.current?.(true)
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse') hoverMarkRef.current?.(false)
            }}
            data-cursor-label="Replay Mark"
            aria-label="Replay MORADK mark animation"
            className="group relative flex min-h-[340px] w-full cursor-pointer flex-col justify-between overflow-hidden border border-ink/15 bg-ink p-5 text-left text-white transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:col-span-5 sm:min-h-[450px] lg:min-h-[480px]"
          >
            <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 size-2.5 border-t border-l border-white/20" />
            <span aria-hidden="true" className="pointer-events-none absolute top-0 right-0 size-2.5 border-t border-r border-white/20" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 size-2.5 border-b border-l border-white/20" />
            <span aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 size-2.5 border-r border-b border-white/20" />

            <span className="relative z-10 flex w-full items-center justify-between border-b border-white/12 pb-3 text-[10px] font-bold tracking-[0.18em] uppercase">
              <span>01.A — MARK</span>
              <span aria-hidden="true" className="size-1.5 bg-[#f16322]" />
            </span>

            <span className="relative z-10 my-auto flex flex-1 items-center justify-center py-6">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-white/[0.07]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-white/[0.07]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute size-[196px] sm:size-[204px] lg:size-[216px]"
              >
                <span className="absolute top-0 left-0 size-2.5 border-t border-l border-white/15" />
                <span className="absolute top-0 right-0 size-2.5 border-t border-r border-white/15" />
                <span className="absolute bottom-0 left-0 size-2.5 border-b border-l border-white/15" />
                <span className="absolute right-0 bottom-0 size-2.5 border-r border-b border-white/15" />
              </span>

              <span className="relative block w-[164px] sm:w-[168px] lg:w-[182px]">
                <span data-mark-shift="wire" className="pointer-events-none absolute inset-0 block">
                  <svg
                    data-mark-wipe="wire"
                    aria-hidden="true"
                    viewBox="-16 -16 858 726"
                    className="block h-auto w-full overflow-visible"
                  >
                    <path
                      d={STORY_MARK_PATH}
                      fill="none"
                      stroke="rgba(255,255,255,0.28)"
                      strokeWidth="6"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span data-mark-shift="accent" className="pointer-events-none absolute inset-0 block">
                  <svg
                    data-mark-wipe="accent"
                    aria-hidden="true"
                    viewBox="-16 -16 858 726"
                    className="block h-auto w-full overflow-visible"
                  >
                    <path d={STORY_MARK_PATH} fill="#f16322" />
                  </svg>
                </span>

                <span data-mark-shift="main" className="relative z-10 block">
                  <svg
                    data-mark-wipe="main"
                    viewBox="-16 -16 858 726"
                    className="block h-auto w-full overflow-visible"
                    role="img"
                    aria-label="Calligraphic ม emblem for MORADK"
                  >
                    <path d={STORY_MARK_PATH} fill="#ffffff" />
                  </svg>
                </span>
              </span>
            </span>

            <span className="relative z-10 flex w-full items-center justify-between border-t border-white/12 pt-3 text-[10px] font-medium tracking-[0.16em] uppercase">
              <span className="text-white/55">BRAND MONOGRAM</span>
              <span className="font-bold text-white/85 transition-colors group-hover:text-[#f16322]">
                CLICK TO REPLAY
              </span>
            </span>
          </button>

          <div className="relative flex min-h-[380px] flex-col justify-between overflow-hidden border border-ink/12 bg-[#f5f5f5] p-5 text-ink sm:col-span-7 sm:min-h-[450px] lg:min-h-[480px]">
            <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 size-2.5 border-t border-l border-ink/20" />
            <span aria-hidden="true" className="pointer-events-none absolute top-0 right-0 size-2.5 border-t border-r border-ink/20" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 size-2.5 border-b border-l border-ink/20" />
            <span aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 size-2.5 border-r border-b border-ink/20" />

            <div className="relative z-10 flex w-full items-center justify-between border-b border-ink/12 pb-3 text-[10px] font-bold tracking-[0.18em] uppercase">
              <span>01.B — WORDMARK</span>
              <span className="font-medium text-ink/45">GENERATION LOOP</span>
            </div>

            <div className="relative z-10 my-auto flex flex-1 items-center justify-center py-4">
              <svg
                viewBox="-20 -20 1350 1716"
                className="h-[290px] w-auto max-w-full overflow-visible sm:h-[340px] lg:h-[370px]"
                role="img"
                aria-label="Animated 4-row stacked ม.รดก wordmark representing knowledge passed down across cohorts"
              >
                {STORY_ROW_OFFSETS.map((offsetY, rowIdx) => (
                  <g key={rowIdx} transform={`translate(0, ${offsetY})`}>
                    <g data-story-row-parallax={rowIdx}>
                      <g data-story-row-enter={rowIdx}>
                        {STORY_WORDMARK_GLYPHS.map((glyph) =>
                          glyph.isDot ? (
                            <path
                              key={glyph.id}
                              data-story-dot={rowIdx}
                              d={glyph.d}
                              fill="#f16322"
                              fillOpacity={0}
                              stroke="#1e1e1e"
                              strokeWidth={10}
                              strokeOpacity={0.22}
                              strokeLinejoin="round"
                              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                            />
                          ) : (
                            <path
                              key={glyph.id}
                              data-story-glyph={rowIdx}
                              d={glyph.d}
                              fill="#1e1e1e"
                              fillOpacity={0}
                              stroke="#1e1e1e"
                              strokeWidth={10}
                              strokeOpacity={0.22}
                              strokeLinejoin="round"
                            />
                          ),
                        )}
                      </g>
                    </g>
                  </g>
                ))}
              </svg>
            </div>

            <div className="relative z-10 flex w-full items-center justify-between border-t border-ink/12 pt-3 text-[10px] font-medium tracking-[0.16em] uppercase">
              <span className="text-ink/55">ม.รดก — HERITAGE</span>
              <div aria-hidden="true" className="flex items-center gap-1.5">
                {STORY_ROW_OFFSETS.map((_, rowIdx) => (
                  <span
                    key={rowIdx}
                    data-story-gen-dot={rowIdx}
                    className="h-[3px] w-4 origin-center bg-ink/20"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CursorTooltip containerRef={sectionRef} />
    </section>
  )
}

export default MoradkOverviewSection
