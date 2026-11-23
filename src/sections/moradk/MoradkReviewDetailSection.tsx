import { useRef } from 'react'
import reviewDetailPairImg from '../../assets/moradk/review-detail-pair.webp'
import AnimatedHeading from '../../components/motion/AnimatedHeading'
import RevealParagraph from '../../components/motion/RevealParagraph'
import { gsap, useGSAP } from '../../lib/gsap'

const leftCallouts = [
  {
    index: '01',
    title: 'Review Content',
    description: 'Structured course code, semester, rating & written review',
  },
  {
    index: '02',
    title: 'Professor Card',
    description: 'Tap-through link to verified faculty profile',
  },
  {
    index: '03',
    title: 'Study Attachments',
    description: 'Downloadable .PDF notes & .PNG summaries',
  },
]

const rightCallouts = [
  {
    index: '04',
    title: 'Rating & Comment',
    description: '5-star review form with masked KMITL student ID',
  },
  {
    index: '05',
    title: 'Student Discussion',
    description: 'Community comment feed & consensus rating (48 · ★ 4.7)',
  },
]

const allCallouts = [...leftCallouts, ...rightCallouts]

function MoradkReviewDetailSection() {
  const stageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const stage = stageRef.current
      if (!stage) return

      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const phones = stage.querySelector<HTMLElement>('[data-detail-phones]')
        const lines = stage.querySelectorAll<HTMLElement>('[data-callout-line]')
        const boxes = stage.querySelectorAll<HTMLElement>('[data-callout-box]')
        const dots = stage.querySelectorAll<HTMLElement>('[data-callout-dot]')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top 78%',
            once: true,
          },
        })

        if (phones) {
          tl.fromTo(
            phones,
            { y: 44, scale: 0.96, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out' },
            0,
          )
        }

        if (lines.length) {
          tl.fromTo(
            lines,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
            0.35,
          )
        }

        if (boxes.length) {
          tl.fromTo(
            boxes,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
            0.4,
          )
        }

        if (dots.length) {
          tl.fromTo(
            dots,
            { scale: 0 },
            { scale: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(2)' },
            0.35,
          )
        }
      })

      return () => media.revert()
    },
    { scope: stageRef },
  )

  return (
    <section
      id="review-detail"
      aria-labelledby="moradk-detail-heading"
      className="w-full scroll-mt-20 bg-white py-20 md:scroll-mt-24 md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="border-b border-ink/12 pb-8 md:pb-10">
          <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-ink/50">
            [03 / Reading &amp; Discussion]
          </p>
          <AnimatedHeading
            as="h2"
            id="moradk-detail-heading"
            className="text-[clamp(30px,4vw,56px)] leading-[1.05] tracking-tight"
          >
            REVIEW DETAILS
          </AnimatedHeading>
          <RevealParagraph className="mt-4 max-w-[62ch] text-xs font-medium leading-relaxed text-ink/70 sm:text-sm md:text-[15px]">
            Every review entry unifies long-form student writing, verified instructor attribution,
            {' '}downloadable PDF/PNG study sheets, and community rating consensus in one continuous flow.
          </RevealParagraph>
        </div>

        <div ref={stageRef} className="mt-12">
          <div className="lg:grid lg:grid-cols-[minmax(200px,1fr)_minmax(0,560px)_minmax(200px,1fr)] lg:items-center lg:gap-4">
            <div className="hidden flex-col justify-between gap-14 py-10 lg:flex">
              {leftCallouts.map(({ index, title, description }) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    data-callout-box
                    className="w-full max-w-[270px] border border-ink/15 bg-[#f7f7f7] p-4"
                  >
                    <span className="inline-block bg-ink px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] uppercase text-white">
                      {index} / {title}
                    </span>
                    <p className="mt-2.5 text-xs font-medium leading-relaxed text-ink/75">
                      {description}
                    </p>
                  </div>
                  <div aria-hidden="true" className="flex flex-1 items-center">
                    <span data-callout-line className="h-px flex-1 origin-left bg-ink/25" />
                    <span data-callout-dot className="size-2 shrink-0 bg-[#f16322]" />
                  </div>
                </div>
              ))}
            </div>

            <div data-detail-phones className="flex justify-center">
              <img
                src={reviewDetailPairImg}
                alt="Dual iPhone mockup displaying MORADK Review Detail screen alongside the Rating and Comment screen"
                width={1434}
                height={1900}
                loading="lazy"
                className="h-auto w-full max-w-[540px] object-contain"
              />
            </div>

            <div className="hidden flex-col justify-center gap-24 py-14 lg:flex">
              {rightCallouts.map(({ index, title, description }) => (
                <div key={index} className="flex items-center gap-3">
                  <div aria-hidden="true" className="flex flex-1 items-center">
                    <span data-callout-dot className="size-2 shrink-0 bg-[#f16322]" />
                    <span data-callout-line className="h-px flex-1 origin-right bg-ink/25" />
                  </div>
                  <div
                    data-callout-box
                    className="w-full max-w-[270px] border border-ink/15 bg-[#f7f7f7] p-4"
                  >
                    <span className="inline-block bg-ink px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] uppercase text-white">
                      {index} / {title}
                    </span>
                    <p className="mt-2.5 text-xs font-medium leading-relaxed text-ink/75">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {allCallouts.map(({ index, title, description }) => (
              <div key={index} className="border border-ink/15 bg-[#f7f7f7] p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-ink px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] uppercase text-white">
                    {index} / {title}
                  </span>
                  <span aria-hidden="true" className="size-2 bg-[#f16322]" />
                </div>
                <p className="mt-2.5 text-xs font-medium leading-relaxed text-ink/75">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MoradkReviewDetailSection
