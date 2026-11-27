import journeyBackground from '../assets/BG/JOURNEY_BG.webp'
import portraitLogo from '../assets/main_nnueh.webp'
import AnimatedHeading from '../components/motion/AnimatedHeading'
import RevealParagraph from '../components/motion/RevealParagraph'

function JourneySection() {
  return (
    <section
      id="journey"
      data-nav-surface="dark"
      aria-labelledby="journey-heading"
      className="relative z-10 isolate w-full scroll-mt-20 bg-ink text-white md:scroll-mt-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 -translate-y-1/2">
        <div className="mx-auto flex w-full max-w-[1280px] justify-end px-6 sm:px-10 md:px-14 lg:px-20">
          <img
            src={portraitLogo}
            alt=""
            loading="lazy"
            className="mr-4 w-20 object-contain sm:mr-6 sm:w-24 md:mr-8 md:w-28 lg:mr-10 lg:w-36"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_60%)]" />
        <img
          src={journeyBackground}
          alt=""
          aria-hidden="true"
          width={1740}
          height={1305}
          loading="lazy"
          className="absolute top-1/2 left-1/2 h-[542px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain sm:h-[132%] lg:left-[52%] lg:h-[144%] xl:h-[150%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_18%_82%,rgba(30,30,30,0.78)_0%,rgba(30,30,30,0.42)_42%,transparent_72%)] lg:block"
        />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[linear-gradient(to_top,rgba(30,30,30,1)_0%,rgba(30,30,30,0.95)_28%,rgba(30,30,30,0.72)_58%,rgba(30,30,30,0.28)_82%,transparent_100%)] lg:hidden" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[600px] w-full max-w-[1280px] flex-col justify-end px-6 pt-24 pb-10 sm:min-h-[520px] sm:px-10 sm:pt-28 sm:pb-12 md:min-h-[560px] md:px-14 lg:min-h-[600px] lg:px-20 lg:pb-14 xl:min-h-[620px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[54ch] drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] lg:max-w-[48%]">
            <RevealParagraph className="text-[11px] font-bold leading-snug text-white sm:text-xs lg:text-[13px]">
              The destination matters.
              {' '}
              <br />
              So does the journey.
            </RevealParagraph>

            <RevealParagraph className="mt-4 text-[10px] font-bold leading-relaxed text-white/95 sm:mt-5 sm:text-[11px] lg:mt-6 lg:text-xs">
              Every project begins with an idea and grows through exploration, experiments,
              {' '}and lessons learned. I care about the final result and the way it comes together.
              {' '}The choices, challenges, and discoveries along the way shape what I create
              {' '}and what I carry into the next project.
            </RevealParagraph>
          </div>

          <AnimatedHeading
            as="h2"
            id="journey-heading"
            className="shrink-0 text-left text-[clamp(28px,3.2vw,46px)] leading-none tracking-tight text-white lg:text-right"
          >
            OUR JOURNEY
          </AnimatedHeading>
        </div>
      </div>
    </section>
  )
}

export default JourneySection
