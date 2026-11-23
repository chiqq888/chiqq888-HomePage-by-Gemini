import { useRef } from 'react'
import discoverResultsImg from '../../assets/moradk/discover-results.webp'
import discoverSearchImg from '../../assets/moradk/discover-search.webp'
import AnimatedHeading from '../../components/motion/AnimatedHeading'
import CursorTooltip from '../../components/motion/CursorTooltip'
import RevealParagraph from '../../components/motion/RevealParagraph'
import { gsap, useGSAP } from '../../lib/gsap'

function MoradkDiscoverSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = section.querySelectorAll<HTMLElement>('[data-discover-card]')
        const leftPhone = section.querySelector<HTMLElement>('[data-discover-parallax="left"]')
        const rightPhone = section.querySelector<HTMLElement>('[data-discover-parallax="right"]')

        if (cards.length) {
          gsap.fromTo(
            cards,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.14,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cards[0],
                start: 'top 84%',
                once: true,
              },
            },
          )
        }

        if (leftPhone) {
          gsap.fromTo(
            leftPhone,
            { y: 16 },
            {
              y: -16,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )
        }

        if (rightPhone) {
          gsap.fromTo(
            rightPhone,
            { y: -16 },
            {
              y: 16,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )
        }
      })

      return () => media.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="discover"
      aria-labelledby="moradk-discover-heading"
      className="relative w-full scroll-mt-20 bg-[#f5f5f5] py-20 md:scroll-mt-24 md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="border-b border-ink/12 pb-8 md:pb-10">
          <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-ink/50">
            [02 / Discovery Flow]
          </p>
          <AnimatedHeading
            as="h2"
            id="moradk-discover-heading"
            className="text-[clamp(30px,4vw,56px)] leading-[1.05] tracking-tight"
          >
            DISCOVER COURSES &amp; REVIEWS
          </AnimatedHeading>
          <RevealParagraph className="mt-4 max-w-[62ch] text-xs font-medium leading-relaxed text-ink/70 sm:text-sm md:text-[15px]">
            Students can search immediately by course name or code, switch between Most Reviewed,
            {' '}Popularity, and Rating pills, and scan concise semester-tagged review cards before diving deeper.
          </RevealParagraph>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-2">
          <article
            data-discover-card="left"
            data-cursor-label="Search & Filter Courses"
            className="flex flex-col border border-ink/12 bg-[#e9e9e9]"
          >
            <header className="flex items-center justify-between border-b border-ink/12 px-5 py-3.5 text-[11px] font-bold tracking-[0.16em] uppercase text-ink">
              <span>02.A — LIVE COURSE SEARCH</span>
              <span aria-hidden="true" className="size-2 bg-[#f16322]" />
            </header>
            <div className="flex min-h-[380px] flex-1 items-center justify-center overflow-hidden p-8 sm:min-h-[460px] sm:p-12">
              <img
                data-discover-parallax="left"
                src={discoverSearchImg}
                alt="MORADK live course search interface showing filter chips and review counts per subject"
                width={651}
                height={1500}
                loading="lazy"
                className="h-[340px] w-auto object-contain drop-shadow-[0_24px_36px_rgba(30,30,30,0.16)] sm:h-[420px]"
              />
            </div>
            <p className="border-t border-ink/12 bg-white/80 px-5 py-4 text-xs font-medium text-ink/75">
              Instant search with filter pills and live review count badges.
            </p>
          </article>

          <article
            data-discover-card="right"
            data-cursor-label="Ranked Review Feed"
            className="flex flex-col border border-ink/12 bg-white"
          >
            <header className="flex items-center justify-between border-b border-ink/12 px-5 py-3.5 text-[11px] font-bold tracking-[0.16em] uppercase text-ink">
              <span>02.B — RANKED REVIEW FEED</span>
              <span className="text-[10px] font-medium text-ink/45">SORTED BY RATING</span>
            </header>
            <div className="flex min-h-[380px] flex-1 items-center justify-center overflow-hidden p-8 sm:min-h-[460px] sm:p-12">
              <img
                data-discover-parallax="right"
                src={discoverResultsImg}
                alt="MORADK search results interface displaying Foundation English review cards with star ratings"
                width={652}
                height={1070}
                loading="lazy"
                className="h-[340px] w-auto object-contain sm:h-[420px]"
              />
            </div>
            <p className="border-t border-ink/12 bg-[#fafafa] px-5 py-4 text-xs font-medium text-ink/75">
              Review cards surfacing semester tags, engagement counts, and star scores.
            </p>
          </article>
        </div>
      </div>

      <CursorTooltip containerRef={sectionRef} />
    </section>
  )
}

export default MoradkDiscoverSection
