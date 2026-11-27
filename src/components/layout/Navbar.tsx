import { useCallback, useEffect, useRef, useState } from 'react'
import passionLogo from '../../assets/main_byd.svg'
import portraitLogo from '../../assets/main_nnueh.webp'
import menuIcon from '../../assets/ICON/fi-rr-menu-burger.svg'
import { useRouter } from '../../lib/routerContext'
import Link from '../routing/Link'
import SectionMenu from './SectionMenu'

function Navbar() {
  const { pathname } = useRouter()
  const navbarRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [overDarkSection, setOverDarkSection] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const navbar = navbarRef.current
    if (!navbar) return

    let animationFrame = 0

    const updateTheme = () => {
      animationFrame = 0
      const navbarBounds = navbar.getBoundingClientRect()
      const sampleY = navbarBounds.bottom + 1
      const darkSurfaces = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-surface="dark"]'))

      setScrolled(window.scrollY > 12)
      setOverDarkSection(darkSurfaces.some((surface) => {
        const bounds = surface.getBoundingClientRect()
        return bounds.top <= sampleY && bounds.bottom > sampleY
      }))
    }

    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateTheme)
    }

    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(navbar)
    resizeObserver.observe(document.getElementById('root')!)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    scheduleUpdate()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [pathname])

  const surfaceClassName = !scrolled
    ? 'border-transparent bg-transparent'
    : overDarkSection
      ? 'border-white/10 bg-ink/85 backdrop-blur-md'
      : 'border-ink/10 bg-white/85 backdrop-blur-md'

  const brandClassName = `flex w-fit items-center gap-3 md:gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 ${overDarkSection ? 'focus-visible:outline-white' : 'focus-visible:outline-ink'}`
  const brandContent = (
    <>
      <img
        src={passionLogo}
        alt="Design by Passion"
        className={`h-8 w-auto transition-[filter] duration-300 md:h-9 ${overDarkSection ? 'brightness-0 invert' : ''}`}
      />
      <img src={portraitLogo} alt="chiqq888 portrait logo" className="size-9 object-contain md:size-10" />
    </>
  )

  return (
    <nav
      ref={navbarRef}
      id="navbar"
      data-theme={overDarkSection ? 'dark' : 'light'}
      aria-label="Main navigation"
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${surfaceClassName}`}
    >
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-6 py-3 sm:px-10 md:gap-8 md:px-14 md:py-3.5 lg:px-20">
        {pathname === '/' ? (
          <a href="#intro" aria-label="chiqq888 home" className={brandClassName}>
            {brandContent}
          </a>
        ) : (
          <Link to="/" aria-label="chiqq888 home" className={brandClassName}>
            {brandContent}
          </Link>
        )}

        <div
          aria-hidden="true"
          className={`h-px w-full max-w-[44%] justify-self-center transition-colors duration-300 lg:w-[44%] lg:max-w-[480px] ${overDarkSection ? 'bg-white/40' : 'bg-ink/25'}`}
        />

        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="section-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className={`flex size-9 cursor-pointer items-center justify-center justify-self-end transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 md:size-10 ${overDarkSection ? 'bg-white hover:bg-white/90 focus-visible:outline-white' : 'bg-ink hover:bg-ink/85 focus-visible:outline-ink'}`}
        >
          <img src={menuIcon} alt="" className={`size-4 brightness-0 md:size-5 ${overDarkSection ? '' : 'invert'}`} />
        </button>
      </div>

      <SectionMenu open={menuOpen} anchorRef={menuButtonRef} onRequestClose={closeMenu} />
    </nav>
  )
}

export default Navbar
