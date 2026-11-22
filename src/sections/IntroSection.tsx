import introBackground from '../assets/BG/MAIN_BG.webp'
import introVideo from '../assets/BG/INTRO_BG.optimized.mp4'
import introLogo from '../assets/intro_chiqq.webp'
import LogoMarquee from '../components/intro/LogoMarquee'
import BackgroundVideo from '../components/motion/BackgroundVideo'
import RevealParagraph from '../components/motion/RevealParagraph'

function IntroSection() {
  return (
    <section
      id="intro"
      aria-label="About chiqq888"
      className="flex min-h-[calc(100svh-68px)] w-full scroll-mt-20 flex-col justify-between overflow-x-clip bg-white md:min-h-[calc(100svh-76px)] md:scroll-mt-24 lg:h-[calc(100svh-76px)] lg:min-h-[620px] lg:max-h-[960px]"
    >
      <div className="relative flex flex-1 flex-col justify-between lg:flex-row lg:items-center">
        <div className="relative h-[220px] w-full shrink-0 overflow-hidden sm:h-[280px] lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-0 lg:z-0 lg:h-full lg:w-[66%] xl:w-[64%]">
          <BackgroundVideo
            src={introVideo}
            poster={introBackground}
            eagerPoster
            className="h-full w-full object-cover object-[85%_center] lg:object-contain lg:object-right"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[34%] bg-linear-to-r from-white via-white/85 to-transparent lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-12 bg-linear-to-t from-white to-transparent lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white via-white/75 to-transparent lg:hidden"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 items-center px-6 pt-4 pb-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16">
          <div className="flex w-full max-w-[540px] flex-col items-start lg:max-w-[520px] xl:max-w-[560px]">
            <img
              src={introLogo}
              alt="chiqq"
              width={870}
              height={402}
              className="mb-6 h-auto w-44 sm:w-52 lg:mb-8 lg:w-[250px] xl:w-[285px]"
            />
            <RevealParagraph className="text-xs font-bold tracking-[0.16em] uppercase text-ink/60 lg:text-sm">
              [Code &amp; Design]
            </RevealParagraph>
            <RevealParagraph className="mt-3 text-base font-bold leading-snug text-ink sm:text-lg lg:text-xl">
              A developer and designer based in Thailand.
            </RevealParagraph>
            <RevealParagraph className="mt-3 max-w-[52ch] text-xs font-medium leading-relaxed text-ink/70 sm:text-sm lg:text-[15px]">
              I turn ideas into websites and digital experiences,
              {' '}bringing together thoughtful design, clean code, and a personal touch.
            </RevealParagraph>
            <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-8">
              <a
                href="#works"
                className="inline-flex items-center gap-2.5 bg-ink px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase text-white transition-colors hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                Explore Works <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0">
        <div className="border-t border-ink/12 bg-white">
          <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-6 py-3.5 text-[11px] font-medium tracking-wide text-ink/75 sm:grid sm:grid-cols-3 sm:px-8 sm:text-xs md:py-4 lg:px-12 lg:text-sm xl:px-16">
            <RevealParagraph className="sm:text-left">No titles, just vibes.</RevealParagraph>
            <RevealParagraph className="sm:text-center">Form follows vibe.</RevealParagraph>
            <RevealParagraph className="sm:text-right">Creating with intent.</RevealParagraph>
          </div>
        </div>
        <LogoMarquee />
      </div>
    </section>
  )
}

export default IntroSection
