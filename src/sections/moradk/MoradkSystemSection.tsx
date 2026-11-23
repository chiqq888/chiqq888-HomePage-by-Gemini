import { useRef } from 'react'
import detailAngleImg from '../../assets/moradk/detail-angle.webp'
import AnimatedHeading from '../../components/motion/AnimatedHeading'
import RevealParagraph from '../../components/motion/RevealParagraph'
import { gsap, useGSAP } from '../../lib/gsap'

const tokens = [
  {
    hex: '#FFFFFF',
    name: 'Canvas',
    role: 'Primary reading surface',
    swatchClassName: 'border border-white/25 bg-white',
  },
  {
    hex: '#1E1E1E',
    name: 'Ink',
    role: 'High-contrast typography & dock',
    swatchClassName: 'border border-white/30 bg-ink',
  },
  {
    hex: '#F16322',
    name: 'Signal',
    role: 'Ratings, likes & primary CTA',
    swatchClassName: 'bg-[#f16322]',
  },
]

function MoradkSystemSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const visual = section.querySelector<HTMLElement>('[data-system-visual]')
        const phone = section.querySelector<HTMLElement>('[data-system-phone]')

        if (visual) {
          gsap.fromTo(
            visual,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: visual,
                start: 'top 82%',
                once: true,
              },
            },
          )
        }

        if (phone) {
          gsap.fromTo(
            phone,
            { y: 24, rotate: -2 },
            {
              y: -24,
              rotate: 1.5,
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
      id="architecture"
      data-nav-surface="dark"
      aria-labelledby="moradk-system-heading"
      className="relative isolate w-full scroll-mt-20 overflow-hidden bg-ink py-20 text-white md:scroll-mt-24 md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_50%,rgba(255,255,255,0.08),transparent_56%)]"
      />

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 xl:px-16">
        <div className="lg:col-span-6">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-white/45">
            [04 / Design System]
          </p>
          <AnimatedHeading
            as="h2"
            id="moradk-system-heading"
            className="text-[clamp(30px,4vw,56px)] leading-[1.05] tracking-tight"
          >
            BUILT FOR CLARITY &amp; TRUST
          </AnimatedHeading>

          <div aria-hidden="true" className="my-7 h-px w-16 bg-white/25 md:my-8" />

          <RevealParagraph className="text-lg font-bold leading-snug text-white sm:text-xl md:text-2xl">
            High-contrast utility.
            <br />
            Zero visual noise.
          </RevealParagraph>

          <RevealParagraph className="mt-5 max-w-[54ch] text-xs font-medium leading-relaxed text-white/70 sm:text-sm md:text-base">
            During registration week, students compare dozens of courses back-to-back on mobile screens.
            {' '}A stark monochrome foundation keeps dense academic text effortless to scan, while one disciplined
            {' '}signal orange directs immediate attention to ratings, verified badges, and submission actions.
          </RevealParagraph>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/15 pt-6 sm:grid-cols-3">
            {tokens.map(({ hex, name, role, swatchClassName }) => (
              <div key={hex} className="border border-white/12 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold tracking-wider text-white">{hex}</span>
                  <span aria-hidden="true" className={`size-4 shrink-0 ${swatchClassName}`} />
                </div>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-white/90">{name}</p>
                <p className="mt-1 text-[11px] font-medium leading-relaxed text-white/55">{role}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-system-visual className="flex items-center justify-center lg:col-span-6">
          <img
            data-system-phone
            src={detailAngleImg}
            alt="Angled 3D iPhone mockup displaying MORADK Review Detail interface"
            width={1101}
            height={1600}
            loading="lazy"
            className="h-auto w-full max-w-[360px] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] sm:max-w-[420px] lg:max-w-[460px]"
          />
        </div>
      </div>
    </section>
  )
}

export default MoradkSystemSection
