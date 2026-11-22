import journeyBackground from '../assets/BG/JOURNEY_BG.webp'
import AnimatedHeading from '../components/motion/AnimatedHeading'
import RevealParagraph from '../components/motion/RevealParagraph'

function JourneySection() {
  return (
    <section
      id="journey"
      data-nav-surface="dark"
      aria-labelledby="journey-heading"
      className="relative isolate w-full scroll-mt-20 overflow-hidden bg-ink py-20 text-white md:scroll-mt-24 md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_50%,rgba(255,255,255,0.08),transparent_56%)]"
      />

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 xl:px-16">
        <div className="lg:col-span-6">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-white/45">
            [02 / Process]
          </p>
          <AnimatedHeading
            as="h2"
            id="journey-heading"
            className="text-[clamp(34px,4.2vw,64px)] leading-none tracking-tight"
          >
            OUR JOURNEY
          </AnimatedHeading>

          <div aria-hidden="true" className="my-7 h-px w-16 bg-white/25 md:my-8" />

          <RevealParagraph className="text-lg font-bold leading-snug text-white sm:text-xl md:text-2xl">
            The destination matters.
            <br />
            So does the journey.
          </RevealParagraph>

          <RevealParagraph className="mt-5 max-w-[54ch] text-xs font-medium leading-relaxed text-white/70 sm:text-sm md:text-base">
            Every project begins with an idea and grows through exploration, experiments,
            {' '}and lessons learned. I care about the final result and the way it comes together.
            {' '}The choices, challenges, and discoveries along the way shape what I create
            {' '}and what I carry into the next project.
          </RevealParagraph>
        </div>

        <div className="flex items-center justify-center lg:col-span-6">
          <img
            src={journeyBackground}
            alt=""
            aria-hidden="true"
            width={1740}
            height={1305}
            loading="lazy"
            className="h-auto w-full max-w-[420px] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)] sm:max-w-[480px] lg:max-w-[580px]"
          />
        </div>
      </div>
    </section>
  )
}

export default JourneySection
