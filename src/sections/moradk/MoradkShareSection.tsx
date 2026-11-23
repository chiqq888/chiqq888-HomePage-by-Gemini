import { useRef } from 'react'
import shareReviewImg from '../../assets/moradk/share-review.webp'
import AnimatedHeading from '../../components/motion/AnimatedHeading'
import RevealParagraph from '../../components/motion/RevealParagraph'
import { gsap, useGSAP } from '../../lib/gsap'

const steps = [
  {
    index: '01',
    title: 'Select Subject',
    description: 'Search and lock onto official course names and subject codes to keep threads unified.',
  },
  {
    index: '02',
    title: 'Write Your Review',
    description: 'Pair a concise topic header with candid insight on workload, projects, and exams.',
  },
  {
    index: '03',
    title: 'Attach Resources',
    description: 'Upload PDF study guides, visual summaries, or link external course references.',
  },
  {
    index: '04',
    title: 'Submit to Community',
    description: 'Publish through quick moderation so future students benefit each registration cycle.',
  },
]

function MoradkShareSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const stepEls = section.querySelectorAll<HTMLElement>('[data-share-step]')
        const handEl = section.querySelector<HTMLElement>('[data-share-hand]')

        if (stepEls.length) {
          gsap.fromTo(
            stepEls,
            { x: -24, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: stepEls[0],
                start: 'top 85%',
                once: true,
              },
            },
          )
        }

        if (handEl) {
          gsap.fromTo(
            handEl,
            { x: 56, y: 36, opacity: 0 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 76%',
                once: true,
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
      id="share"
      aria-labelledby="moradk-share-heading"
      className="relative w-full scroll-mt-20 overflow-hidden border-y border-ink/12 bg-[#f3f3f3] md:scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="pt-20 pb-10 md:pt-28 md:pb-14 lg:w-[46%] lg:py-32">
          <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-ink/50">
            [05 / Contribution Flow]
          </p>
          <AnimatedHeading
            as="h2"
            id="moradk-share-heading"
            className="text-[clamp(30px,3.8vw,52px)] leading-[1.06] tracking-tight"
          >
            SHARE YOUR EXPERIENCE
          </AnimatedHeading>

          <RevealParagraph className="mt-4 max-w-[50ch] text-xs font-medium leading-relaxed text-ink/70 sm:text-sm md:text-[15px]">
            Writing a helpful review takes less than two minutes. A guided single-column form lowers friction
            {' '}for first-time contributors while keeping every submission structured and legible.
          </RevealParagraph>

          <ol className="mt-8 divide-y divide-ink/12 border-y border-ink/12">
            {steps.map(({ index, title, description }) => (
              <li
                key={index}
                data-share-step
                className="grid grid-cols-[44px_1fr] items-start gap-3 py-4"
              >
                <span className="inline-flex h-7 w-9 items-center justify-center bg-ink text-[11px] font-bold tracking-wider text-white">
                  {index}
                </span>
                <div>
                  <h3 className="text-xs font-bold tracking-wide uppercase text-ink sm:text-sm">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-ink/65">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="ml-auto flex w-[92%] max-w-[540px] justify-end lg:pointer-events-none lg:absolute lg:right-0 lg:bottom-0 lg:w-[52%] lg:max-w-[820px]">
        <img
          data-share-hand
          src={shareReviewImg}
          alt="Hand holding iPhone displaying MORADK Add Review submission form with orange Submit your Review button"
          width={1900}
          height={1608}
          loading="lazy"
          className="block h-auto w-full object-contain object-right-bottom"
        />
      </div>
    </section>
  )
}

export default MoradkShareSection
