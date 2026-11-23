import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import spaceLikedImg from '../../assets/moradk/space-liked.webp'
import spaceReviewsImg from '../../assets/moradk/space-reviews.webp'
import spaceSubmissionImg from '../../assets/moradk/space-submission.webp'
import AnimatedHeading from '../../components/motion/AnimatedHeading'
import CursorTooltip from '../../components/motion/CursorTooltip'
import RevealParagraph from '../../components/motion/RevealParagraph'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'

type SpaceIndex = 0 | 1 | 2

type SpaceSpec = {
  label: string
  value: string
}

type SpaceScreen = {
  id: string
  num: string
  shortLabel: string
  badge: string
  title: string
  description: string
  specs: readonly [SpaceSpec, SpaceSpec]
  stageNote: string
  image: string
  alt: string
}

const spaceScreens: readonly SpaceScreen[] = [
  {
    id: 'submission',
    num: '01',
    shortLabel: 'My Submission',
    badge: 'MODERATION TRACKING',
    title: 'Real-Time Review Approval Queue',
    description:
      'Monitor submitted reviews with transparent submission dates, approval timestamps, and verification status before they go live.',
    specs: [
      { label: 'STATUS', value: 'Approved · 24h' },
      { label: 'FILTERS', value: 'Newest · Oldest' },
    ],
    stageNote: '05506011 · Verified Submission Log',
    image: spaceSubmissionImg,
    alt: 'MORADK My Submission screen showing approved HCI course review status',
  },
  {
    id: 'reviews',
    num: '02',
    shortLabel: 'My Review',
    badge: 'PUBLISHED ARCHIVE',
    title: 'Author Impact & Comment Analytics',
    description:
      'Revisit every published course review in one archive with live discussion counts, star consensus, and quick add-review access.',
    specs: [
      { label: 'METRICS', value: '48 Replies · ★ 4.7' },
      { label: 'ACTION', value: '+ Add New Review' },
    ],
    stageNote: '05506011 · Published Review Metrics',
    image: spaceReviewsImg,
    alt: 'MORADK My Review screen showing published HCI review metrics and 4.7 star average',
  },
  {
    id: 'liked',
    num: '03',
    shortLabel: 'Saved & Liked',
    badge: 'COURSE BOOKMARKS',
    title: 'Registration Shortlist Collection',
    description:
      'Bookmark helpful course reviews throughout the semester so your shortlist of electives is ready when enrollment opens.',
    specs: [
      { label: 'SHORTLIST', value: '3 Pinned Courses' },
      { label: 'ACCESS', value: 'Bottom Dock Heart' },
    ],
    stageNote: 'English 101 · Linear · HCI Saved',
    image: spaceLikedImg,
    alt: 'MORADK Review you like screen showing bookmarked Foundation English, Linear Algebra, and HCI reviews',
  },
]

function getRelativeSlot(index: number, active: number): -1 | 0 | 1 {
  const diff = (index - active + 3) % 3
  if (diff === 0) return 0
  if (diff === 1) return 1
  return -1
}

function MoradkSpaceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState<SpaceIndex>(0)
  const activeIndexRef = useRef<SpaceIndex>(0)
  const enteredRef = useRef(false)
  const layoutPhonesRef = useRef<((active: number, animate: boolean) => void) | null>(null)
  const reducedMotionRef = useRef(false)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const desktopQuery = window.matchMedia('(min-width: 640px)')
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      const phones = Array.from(section.querySelectorAll<HTMLElement>('[data-space-phone]'))
      const rows = Array.from(section.querySelectorAll<HTMLElement>('[data-space-row]'))
      const stage = section.querySelector<HTMLElement>('[data-space-stage]')

      reducedMotionRef.current = motionQuery.matches

      const layoutPhones = (active: number, animate: boolean) => {
        const isDesktop = desktopQuery.matches
        const spread = isDesktop ? 66 : 48
        const shouldAnimate = animate && !motionQuery.matches

        phones.forEach((phone, index) => {
          const slot = getRelativeSlot(index, active)
          const target = {
            xPercent: slot * spread,
            y: slot === 0 ? 0 : 18,
            scale: slot === 0 ? 1 : isDesktop ? 0.8 : 0.78,
            rotation: slot * (isDesktop ? 5 : 4),
            opacity: slot === 0 ? 1 : 0.42,
            filter: slot === 0 ? 'brightness(1)' : 'brightness(0.72)',
          }

          gsap.set(phone, { zIndex: slot === 0 ? 30 : 10 })
          if (shouldAnimate) {
            gsap.to(phone, {
              ...target,
              duration: 0.68,
              ease: 'power3.out',
              overwrite: 'auto',
            })
          } else {
            gsap.set(phone, target)
          }
        })
      }

      layoutPhonesRef.current = layoutPhones

      let revealed = false
      let trigger: ScrollTrigger | undefined

      const reveal = () => {
        if (revealed) return
        revealed = true
        enteredRef.current = true
        layoutPhones(activeIndexRef.current, !motionQuery.matches)

        if (!motionQuery.matches && rows.length) {
          gsap.to(rows, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            overwrite: 'auto',
          })
        } else if (rows.length) {
          gsap.set(rows, { x: 0, opacity: 1 })
        }
      }

      if (motionQuery.matches) {
        reveal()
      } else {
        gsap.set(phones, {
          xPercent: 0,
          y: 40,
          scale: 0.9,
          rotation: 0,
          opacity: 0,
          filter: 'brightness(1)',
        })
        if (rows.length) {
          gsap.set(rows, { x: -18, opacity: 0 })
        }

        const triggerTarget = stage ?? section
        trigger = ScrollTrigger.create({
          trigger: triggerTarget,
          start: 'top 82%',
          once: true,
          onEnter: reveal,
        })

        const bounds = triggerTarget.getBoundingClientRect()
        if (window.scrollY >= trigger.start || (bounds.top < window.innerHeight && bounds.bottom > 0)) {
          reveal()
        }
      }

      const handleDesktopChange = () => {
        if (enteredRef.current) {
          layoutPhones(activeIndexRef.current, false)
        }
      }

      const handleMotionChange = () => {
        reducedMotionRef.current = motionQuery.matches
        if (motionQuery.matches) {
          reveal()
        }
      }

      desktopQuery.addEventListener('change', handleDesktopChange)
      motionQuery.addEventListener('change', handleMotionChange)

      return () => {
        trigger?.kill()
        gsap.killTweensOf(phones)
        gsap.killTweensOf(rows)
        desktopQuery.removeEventListener('change', handleDesktopChange)
        motionQuery.removeEventListener('change', handleMotionChange)
        enteredRef.current = false
        layoutPhonesRef.current = null
      }
    },
    { scope: sectionRef },
  )

  useEffect(() => {
    activeIndexRef.current = activeIndex
    if (!enteredRef.current) return

    layoutPhonesRef.current?.(activeIndex, true)

    const ghost = sectionRef.current?.querySelector<HTMLElement>('[data-space-ghost]')
    if (ghost && !reducedMotionRef.current) {
      gsap.fromTo(
        ghost,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out', overwrite: 'auto' },
      )
    }
  }, [activeIndex])

  const stepIndex = (delta: -1 | 1) => {
    setActiveIndex((prev) => ((prev + delta + 3) % 3) as SpaceIndex)
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: SpaceIndex) => {
    let nextIndex: SpaceIndex | null = null
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = ((index + 1) % 3) as SpaceIndex
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = ((index + 2) % 3) as SpaceIndex
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = 2
    }

    if (nextIndex !== null) {
      event.preventDefault()
      setActiveIndex(nextIndex)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  const activeScreen = spaceScreens[activeIndex]

  return (
    <section
      ref={sectionRef}
      id="your-space"
      data-nav-surface="dark"
      aria-labelledby="moradk-space-heading"
      className="relative isolate w-full scroll-mt-20 overflow-hidden bg-ink py-20 text-white md:scroll-mt-24 md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_52%,rgba(255,255,255,0.07),transparent_58%)]"
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-6 border-b border-white/12 pb-8 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-10">
          <div className="lg:col-span-7">
            <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-white/45">
              [06 / Personal Dashboard]
            </p>
            <AnimatedHeading
              as="h2"
              id="moradk-space-heading"
              className="text-[clamp(30px,4vw,56px)] leading-[1.05] tracking-tight"
            >
              YOUR SPACE
            </AnimatedHeading>
          </div>
          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <RevealParagraph className="max-w-[46ch] text-xs font-medium leading-relaxed text-white/65 sm:text-sm lg:text-right">
              Track moderation progress, revisit published contributions, and curate saved electives
              {' '}inside a personal dashboard tailored for registration season.
            </RevealParagraph>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-12">
          <div className="lg:col-span-5">
            <div
              role="tablist"
              aria-label="Personal dashboard views"
              aria-orientation="vertical"
              className="divide-y divide-white/12 border-y border-white/12"
            >
              {spaceScreens.map((screen, index) => {
                const slotIndex = index as SpaceIndex
                const isActive = activeIndex === slotIndex

                return (
                  <div key={screen.id} data-space-row>
                    <button
                      ref={(el) => {
                        tabRefs.current[slotIndex] = el
                      }}
                      id={`space-tab-${screen.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`space-panel-${screen.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveIndex(slotIndex)}
                      onKeyDown={(event) => handleTabKeyDown(event, slotIndex)}
                      className="group flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white sm:py-4.5"
                    >
                      <span className="flex items-baseline gap-3 sm:gap-4">
                        <span
                          className={`text-xs font-bold tracking-[0.16em] tabular-nums transition-colors ${
                            isActive ? 'text-[#f16322]' : 'text-white/35 group-hover:text-white/60'
                          }`}
                        >
                          {screen.num}
                        </span>
                        <span
                          className={`text-sm font-bold tracking-[0.12em] uppercase transition-colors sm:text-base ${
                            isActive ? 'text-white' : 'text-white/55 group-hover:text-white/85'
                          }`}
                        >
                          {screen.shortLabel}
                        </span>
                      </span>

                      <span className="flex shrink-0 items-center gap-3">
                        <span
                          className={`hidden text-[10px] font-medium tracking-[0.16em] uppercase transition-colors sm:inline ${
                            isActive ? 'text-white/65' : 'text-white/30 group-hover:text-white/50'
                          }`}
                        >
                          {screen.badge}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`size-2 transition-colors ${
                            isActive ? 'bg-[#f16322]' : 'bg-white/20 group-hover:bg-white/45'
                          }`}
                        />
                      </span>
                    </button>

                    <div
                      id={`space-panel-${screen.id}`}
                      role="tabpanel"
                      aria-labelledby={`space-tab-${screen.id}`}
                      aria-hidden={!isActive}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                        isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-5 pl-7 sm:pl-9">
                          <div className="border-l-2 border-[#f16322] pl-4">
                            <h3 className="text-sm font-bold tracking-tight text-white sm:text-base">
                              {screen.title}
                            </h3>
                            <p className="mt-2 text-xs font-medium leading-relaxed text-white/70 sm:text-[13px]">
                              {screen.description}
                            </p>
                            <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-3.5">
                              {screen.specs.map((spec) => (
                                <div key={spec.label}>
                                  <dt className="text-[10px] font-medium tracking-[0.16em] uppercase text-white/45">
                                    {spec.label}
                                  </dt>
                                  <dd className="mt-1 text-xs font-bold tracking-wide text-white/90">
                                    {spec.value}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-[0.18em] text-white/80 tabular-nums">
                  {activeScreen.num} / 03
                </span>
                <div aria-hidden="true" className="flex items-center gap-1.5">
                  {spaceScreens.map((screen, index) => (
                    <span
                      key={screen.id}
                      className={`h-[2px] w-7 transition-colors ${
                        activeIndex === index ? 'bg-[#f16322]' : 'bg-white/15'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous dashboard screen"
                  onClick={() => stepIndex(-1)}
                  className="flex size-10 cursor-pointer items-center justify-center border border-white/20 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  aria-label="Next dashboard screen"
                  onClick={() => stepIndex(1)}
                  className="flex size-10 cursor-pointer items-center justify-center border border-white/20 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              data-space-stage
              className="relative flex min-h-[470px] flex-col justify-between overflow-hidden border border-white/10 bg-[#171717]/90 px-4 pt-5 pb-4 sm:min-h-[540px] sm:px-8 sm:pt-6 sm:pb-5 lg:min-h-[580px]"
            >
              <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 size-3 border-t border-l border-white/25" />
              <span aria-hidden="true" className="pointer-events-none absolute top-0 right-0 size-3 border-t border-r border-white/25" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 size-3 border-b border-l border-white/25" />
              <span aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 size-3 border-r border-b border-white/25" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_52%,rgba(255,255,255,0.08),transparent_64%)]"
              />

              <div className="relative z-10 flex items-center justify-between gap-4 text-[10px] font-bold tracking-[0.18em] uppercase">
                <span className="inline-flex items-center gap-2 text-white/85">
                  <span aria-hidden="true" className="size-1.5 bg-[#f16322]" />
                  <span>{activeScreen.badge}</span>
                </span>
                <span className="text-white/45 tabular-nums">
                  MOBILE VIEW · {activeScreen.num} / 03
                </span>
              </div>

              <div className="relative z-10 mx-auto my-auto flex h-[370px] w-full max-w-[640px] items-center justify-center sm:h-[430px] lg:h-[450px] xl:h-[490px]">
                <span
                  data-space-ghost
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[clamp(140px,18vw,220px)] font-bold leading-none tracking-tighter text-white/[0.04]"
                >
                  {activeScreen.num}
                </span>

                {spaceScreens.map((screen, index) => {
                  const slotIndex = index as SpaceIndex
                  const isActive = activeIndex === slotIndex

                  return (
                    <button
                      key={screen.id}
                      type="button"
                      data-space-phone={index}
                      aria-label={`Inspect ${screen.num} / ${screen.shortLabel}: ${screen.title}`}
                      aria-pressed={isActive}
                      data-cursor-label={isActive ? screen.badge : `Inspect ${screen.shortLabel}`}
                      onClick={() => setActiveIndex(slotIndex)}
                      className="group absolute flex cursor-pointer items-center justify-center bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      <img
                        src={screen.image}
                        alt={screen.alt}
                        width={636}
                        height={1300}
                        loading="lazy"
                        className="block h-[340px] w-auto object-contain drop-shadow-[0_28px_54px_rgba(0,0,0,0.68)] sm:h-[400px] lg:h-[420px] xl:h-[465px]"
                      />
                    </button>
                  )
                })}
              </div>

              <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/10 pt-3.5 text-[10px] font-medium tracking-[0.16em] uppercase text-white/45">
                <span>{activeScreen.stageNote}</span>
                <span className="hidden sm:inline">Click side screen to focus</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CursorTooltip containerRef={sectionRef} />
    </section>
  )
}

export default MoradkSpaceSection
