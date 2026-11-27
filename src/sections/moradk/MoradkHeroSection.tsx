import { useRef } from 'react'
import moradkLogo from '../../assets/ALL SVG WHITE/svg_moradk.svg'
import heroHandImg from '../../assets/moradk/hero-hand.webp'
import AnimatedHeading from '../../components/motion/AnimatedHeading'
import RevealParagraph from '../../components/motion/RevealParagraph'
import { gsap, useGSAP } from '../../lib/gsap'

const BEHANCE_URL =
  'https://www.behance.net/gallery/255584129/-(MORADK)-Student-Powered-Course-Review-App'

const metadataItems = [
  { label: 'ROLE', value: 'UI/UX Design & Frontend' },
  { label: 'PLATFORM', value: 'Mobile-First Web App' },
  { label: 'CONTEXT', value: 'KMITL · School of Science' },
  { label: 'STATUS', value: 'Design Preview', hasSignalDot: true },
]

const marqueePhrases = [
  'STUDENT-POWERED COURSE REVIEWS',
  'PASS DOWN CAMPUS WISDOM',
  'VERIFIED KMITL EXPERIENCE',
  'TRANSPARENT PEER INSIGHTS',
]

function MoradkHeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const heroVisual = section.querySelector<HTMLElement>('[data-hero-visual]')
        const heroBadges = section.querySelectorAll<HTMLElement>('[data-hero-badge]')
        const heroParallax = section.querySelector<HTMLElement>('[data-hero-parallax]')

        if (heroVisual) {
          gsap.fromTo(
            heroVisual,
            { y: 48, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
          )
        }

        if (heroBadges.length) {
          gsap.fromTo(
            heroBadges,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.12,
              delay: 0.35,
              ease: 'power3.out',
            },
          )
        }

        if (heroParallax) {
          gsap.fromTo(
            heroParallax,
            { scale: 1 },
            {
              scale: 1.035,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top top',
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
      id="overview"
      aria-labelledby="moradk-hero-heading"
      className="w-full scroll-mt-20 overflow-x-clip bg-white md:scroll-mt-24 lg:flex lg:h-[670px] lg:flex-col xl:h-[700px] 2xl:h-[824px]"
    >
      <div className="mx-auto flex w-full max-w-[1440px] px-6 sm:px-8 lg:min-h-0 lg:flex-1 lg:px-12 xl:px-16">
        <div className="grid w-full flex-1 min-h-0 grid-cols-1 items-end gap-10 pt-8 sm:pt-10 lg:h-full lg:grid-cols-12 lg:grid-rows-1 lg:items-stretch lg:gap-8 lg:pt-0">
          <div className="flex flex-col items-start justify-center pb-2 lg:col-span-6 lg:py-8">
            <p className="mb-4 text-xs font-bold tracking-[0.16em] uppercase text-ink/60 lg:text-sm">
              [05 / Mobile Web &amp; UI/UX Design]
            </p>
            <img
              src={moradkLogo}
              alt="ม.รดก wordmark"
              className="mb-4 h-9 w-auto object-contain brightness-0 sm:h-11"
            />
            <AnimatedHeading
              as="h1"
              id="moradk-hero-heading"
              className="text-[clamp(40px,5.2vw,74px)] leading-none tracking-tight"
            >
              MORADK
            </AnimatedHeading>

            <RevealParagraph className="mt-4 text-base font-bold leading-snug text-ink sm:text-lg lg:text-xl">
              Student-Powered Course Review Platform.
            </RevealParagraph>

            <RevealParagraph className="mt-3 max-w-[54ch] text-xs font-medium leading-relaxed text-ink/70 sm:text-sm lg:text-[15px]">
              A mobile-first platform built for KMITL students to discover honest course reviews,
              {' '}browse verified faculty profiles, share study sheets, and pass down academic wisdom every semester.
            </RevealParagraph>

            <div className="mt-7 flex flex-wrap items-center gap-3 lg:mt-8">
              <a
                href="#discover"
                className="inline-flex items-center gap-2.5 bg-ink px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase text-white transition-colors hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                Explore Case Study <span aria-hidden="true">↓</span>
              </a>
              <a
                href={BEHANCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-ink/25 bg-white px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                View on Behance <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="relative flex min-h-0 items-end justify-center overflow-hidden pt-4 lg:col-span-6 lg:h-full lg:pt-3">
            <div
              data-hero-badge
              className="pointer-events-none absolute top-[5%] left-0 z-20 hidden items-center gap-2 border border-ink/15 bg-white/95 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] uppercase text-ink sm:flex"
            >
              <span aria-hidden="true" className="size-1.5 bg-[#f16322]" />
              <span>KMITL COURSE LEGACY</span>
            </div>

            <div
              data-hero-badge
              className="pointer-events-none absolute top-[13%] right-0 z-20 hidden items-center gap-2 border border-ink/15 bg-ink px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] uppercase text-white sm:flex"
            >
              <span>05506011 · HCI REVIEW</span>
            </div>

            <div data-hero-visual className="relative z-10 flex w-full justify-center lg:h-full lg:min-h-0 lg:items-end">
              <div data-hero-parallax className="flex w-full origin-bottom justify-center lg:h-full lg:min-h-0 lg:items-end">
                <img
                  src={heroHandImg}
                  alt="Hand holding iPhone displaying MORADK Review Detail screen for Human-Computer Interaction"
                  width={1309}
                  height={1800}
                  className="block h-auto w-[86%] max-w-[430px] object-contain object-bottom sm:max-w-[480px] lg:h-full lg:max-h-full lg:w-auto lg:max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:shrink-0">
        <div className="border-t border-ink/12 bg-white">
          <dl className="mx-auto grid w-full max-w-[1440px] grid-cols-2 divide-ink/12 px-6 sm:px-8 lg:grid-cols-4 lg:divide-x lg:px-12 xl:px-16">
            {metadataItems.map(({ label, value, hasSignalDot }, index) => (
              <div
                key={label}
                className={`py-3.5 lg:py-4 xl:py-5 ${
                  index % 2 === 0 ? 'pr-4' : 'pl-4'
                } ${
                  index >= 2 ? 'border-t border-ink/12 lg:border-t-0' : ''
                } lg:px-6 lg:first:pl-0 lg:last:pr-0`}
              >
                <dt className="text-[10px] font-medium tracking-[0.18em] uppercase text-ink/45">
                  {label}
                </dt>
                <dd className="mt-1.5 flex items-center gap-2 text-xs font-bold tracking-wide text-ink sm:text-sm">
                  {hasSignalDot && <span aria-hidden="true" className="size-2 shrink-0 bg-[#f16322]" />}
                  <span>{value}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-nav-surface="dark" className="logo-marquee w-full overflow-hidden bg-ink py-3.5 text-white md:py-4">
          <div className="logo-marquee-track flex w-max">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-label={copy === 0 ? 'MORADK highlights' : undefined}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex min-h-6 min-w-[100vw] shrink-0 items-center gap-10 pr-10 text-xs font-bold tracking-[0.18em] uppercase md:min-h-7"
              >
                {marqueePhrases.map((phrase) => (
                  <li key={phrase} className="flex shrink-0 items-center gap-6">
                    <img
                      src={moradkLogo}
                      alt={copy === 0 ? 'ม.รดก' : ''}
                      className="h-5 w-auto object-contain opacity-90 md:h-6"
                    />
                    <span aria-hidden="true" className="size-1.5 bg-[#f16322]" />
                    <span className="text-white/90">{phrase}</span>
                    <span aria-hidden="true" className="text-white/30">·</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MoradkHeroSection
