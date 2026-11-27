import introBackground from '../assets/BG/MAIN_BG.webp'
import introVideo from '../assets/BG/INTRO_BG.optimized.mp4'
import ChiqqLogo from '../components/intro/ChiqqLogo'
import LogoMarquee from '../components/intro/LogoMarquee'
import BackgroundVideo from '../components/motion/BackgroundVideo'
import RevealParagraph from '../components/motion/RevealParagraph'

function IntroSection() {
  return (
    <section
      id="intro"
      aria-label="About chiqq888"
      className="w-full scroll-mt-20 overflow-x-clip bg-white md:scroll-mt-24 lg:flex lg:min-h-[clamp(680px,calc(100svh-69px),1040px)] lg:flex-col"
    >
      <div className="relative flex min-h-[max(680px,calc(100svh-136px))] flex-col sm:min-h-[720px] md:min-h-[760px] lg:min-h-0 lg:flex-1">
        <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[72%] xl:w-[70%] 2xl:w-[66%]">
          <BackgroundVideo
            src={introVideo}
            poster={introBackground}
            eagerPoster
            className="h-full w-full origin-right scale-[1.25] object-cover object-[80%_center] brightness-[1.01] lg:scale-100 lg:object-contain lg:object-right"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-white via-white/85 to-transparent lg:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[10%] bg-linear-to-r from-white to-transparent lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-8 bg-linear-to-t from-white to-transparent lg:block"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-6 pt-6 pb-5 sm:px-10 sm:pt-8 md:px-14 lg:px-20 lg:pt-8 lg:pb-8 xl:pt-10 xl:pb-10">
          <div className="flex flex-1 items-end pt-8 lg:items-center lg:py-0">
            <ChiqqLogo className="w-44 sm:w-56 lg:w-[290px] xl:w-[330px] 2xl:w-[360px]" />
          </div>

          <div className="max-w-[76ch] shrink-0 pt-10 lg:pt-6">
            <RevealParagraph className="text-[11px] font-bold text-ink sm:text-xs lg:text-[13px]">
              [Code &amp; Design]
            </RevealParagraph>
            <RevealParagraph className="mt-3.5 text-[11px] font-bold leading-relaxed text-ink sm:text-xs lg:mt-4 lg:text-[13px]">
              A developer and designer based in Thailand.
            </RevealParagraph>
            <RevealParagraph className="mt-2.5 text-[11px] font-bold leading-relaxed text-ink sm:text-xs lg:mt-3 lg:text-[13px]">
              I turn ideas into websites and digital experiences,
              <br className="hidden sm:inline" />
              {' '}bringing together thoughtful design, clean code, and a personal touch.
            </RevealParagraph>
          </div>
        </div>
      </div>

      <div className="lg:shrink-0">
        <div className="bg-white">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-x-2 px-6 py-2.5 text-[clamp(8px,2.2vw,10px)] font-bold whitespace-nowrap text-ink sm:grid-cols-3 sm:gap-x-6 sm:px-10 sm:text-[11px] md:px-14 md:py-3 lg:px-20 lg:text-xs">
            <RevealParagraph className="text-left">No titles, just vibes.</RevealParagraph>
            <RevealParagraph className="text-center">Form follows vibe.</RevealParagraph>
            <RevealParagraph className="text-right">Creating with intent.</RevealParagraph>
          </div>
        </div>
        <LogoMarquee />
      </div>
    </section>
  )
}

export default IntroSection
