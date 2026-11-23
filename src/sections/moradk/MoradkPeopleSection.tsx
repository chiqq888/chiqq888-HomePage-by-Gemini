import { useRef } from 'react'
import peopleProfilesImg from '../../assets/moradk/people-profiles.webp'
import AnimatedBox from '../../components/motion/AnimatedBox'
import AnimatedHeading from '../../components/motion/AnimatedHeading'
import CursorTooltip from '../../components/motion/CursorTooltip'
import RevealParagraph from '../../components/motion/RevealParagraph'
import { BOX_REVEAL } from '../../lib/motionSettings'
import { gsap, useGSAP } from '../../lib/gsap'

const profileCards = [
  {
    index: '07.A / PROFESSOR PROFILE',
    title: 'Verified Faculty Directory',
    description:
      'Surfaces official academic rank, department affiliation, campus building and office room, phone extension, and verified KMITL faculty email.',
  },
  {
    index: '07.B / AUTHOR PROFILE',
    title: 'Trusted Student Contributors',
    description:
      'Highlights verified student badges, optional social handles, and a chronological archive of past course reviews with community star ratings.',
  },
]

function MoradkPeopleSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const entrance = section.querySelector<HTMLElement>('[data-people-entrance]')
        const floatEl = section.querySelector<HTMLElement>('[data-people-float]')

        if (entrance) {
          gsap.fromTo(
            entrance,
            { y: 44, scale: 0.96, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: entrance,
                start: 'top 82%',
                once: true,
              },
            },
          )
        }

        if (floatEl) {
          gsap.fromTo(
            floatEl,
            { yPercent: 2 },
            {
              yPercent: -4,
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
      id="people"
      aria-labelledby="moradk-people-heading"
      className="relative w-full scroll-mt-20 bg-white py-20 md:scroll-mt-24 md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="border-b border-ink/12 pb-8 md:pb-10">
          <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-ink/50">
            [07 / Community &amp; Identity]
          </p>
          <AnimatedHeading
            as="h2"
            id="moradk-people-heading"
            className="text-[clamp(30px,4vw,56px)] leading-[1.05] tracking-tight"
          >
            PEOPLE BEHIND THE EXPERIENCE
          </AnimatedHeading>
          <RevealParagraph className="mt-4 max-w-[62ch] text-xs font-medium leading-relaxed text-ink/70 sm:text-sm md:text-[15px]">
            Credible course feedback relies on real academic context. Dedicated profile screens connect
            {' '}every review to official faculty directories and verified KMITL student authors.
          </RevealParagraph>
        </div>

        <div
          data-cursor-label="Faculty & Student Profiles"
          className="mt-12 overflow-hidden border border-ink/12 bg-[#f5f5f5] p-6 sm:p-10 lg:p-14"
        >
          <div data-people-entrance className="flex justify-center">
            <img
              data-people-float
              src={peopleProfilesImg}
              alt="MORADK Professor and Student Author profile screens displayed on floating iPhone 16 Pro frames"
              width={2000}
              height={1934}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-[780px] object-contain"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {profileCards.map(({ index, title, description }, idx) => (
            <AnimatedBox
              key={index}
              as="article"
              className="h-full"
              contentClassName="flex h-full flex-col justify-between bg-ink p-6 text-white md:p-8"
              delay={idx * BOX_REVEAL.stagger}
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/55">
                    {index}
                  </span>
                  <span aria-hidden="true" className="size-2 bg-[#f16322]" />
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-white sm:text-xl">
                  {title}
                </h3>
              </div>
              <p className="mt-3 text-xs font-medium leading-relaxed text-white/70 sm:text-sm">
                {description}
              </p>
            </AnimatedBox>
          ))}
        </div>
      </div>

      <CursorTooltip containerRef={sectionRef} />
    </section>
  )
}

export default MoradkPeopleSection
