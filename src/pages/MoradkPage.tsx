import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import MoradkCreditsSection from '../sections/moradk/MoradkCreditsSection'
import MoradkDiscoverSection from '../sections/moradk/MoradkDiscoverSection'
import MoradkHeroSection from '../sections/moradk/MoradkHeroSection'
import MoradkOverviewSection from '../sections/moradk/MoradkOverviewSection'
import MoradkPeopleSection from '../sections/moradk/MoradkPeopleSection'
import MoradkReviewDetailSection from '../sections/moradk/MoradkReviewDetailSection'
import MoradkShareSection from '../sections/moradk/MoradkShareSection'
import MoradkSpaceSection from '../sections/moradk/MoradkSpaceSection'
import MoradkSystemSection from '../sections/moradk/MoradkSystemSection'

function MoradkPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [navHeight, setNavHeight] = useState(69)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const navbar = document.getElementById('navbar')
    let frame = 0

    const syncHeight = () => {
      if (navbar) setNavHeight(Math.round(navbar.getBoundingClientRect().height))
    }

    const syncScroll = () => {
      frame = 0
      setScrolled(window.scrollY > 12)
    }

    const scheduleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(syncScroll)
    }

    syncHeight()
    syncScroll()

    const observer = new ResizeObserver(syncHeight)
    if (navbar) observer.observe(navbar)
    window.addEventListener('resize', syncHeight)
    window.addEventListener('scroll', scheduleScroll, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', syncHeight)
      window.removeEventListener('scroll', scheduleScroll)
    }
  }, [])

  useGSAP(
    () => {
      const page = pageRef.current
      const progress = progressRef.current
      if (!page || !progress) return

      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: page,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          },
        )
      })

      return () => media.revert()
    },
    { scope: pageRef },
  )

  return (
    <div ref={pageRef} className="relative w-full">
      <div
        aria-hidden="true"
        style={{ top: `${navHeight}px` }}
        className={`pointer-events-none fixed inset-x-0 z-40 h-[2px] w-full bg-ink/10 transition-opacity duration-300 motion-reduce:hidden ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-[#f16322]" />
      </div>

      <MoradkHeroSection />
      <MoradkOverviewSection />
      <MoradkDiscoverSection />
      <MoradkReviewDetailSection />
      <MoradkSystemSection />
      <MoradkShareSection />
      <MoradkSpaceSection />
      <MoradkPeopleSection />
      <MoradkCreditsSection />
    </div>
  )
}

export default MoradkPage
