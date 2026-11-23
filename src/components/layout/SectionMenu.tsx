import { useCallback, useRef, type MouseEvent, type RefObject } from 'react'
import passionLogo from '../../assets/main_byd.svg'
import portraitLogo from '../../assets/main_nnueh.webp'
import { gsap, useGSAP } from '../../lib/gsap'
import { MENU_MOTION } from '../../lib/motionSettings'
import { useRouter } from '../../lib/routerContext'
import { useScrollControls } from '../../lib/scrollControls'
import styles from './SectionMenu.module.css'

const homeSections = [
  { href: '#intro', label: 'Intro', index: '01' },
  { href: '#works', label: 'Works', index: '02' },
  { href: '#journey', label: 'Journey', index: '03' },
  { href: '#stack', label: 'Stack', index: '04' },
]

const moradkSections = [
  { href: '#overview', label: 'Overview', index: '01' },
  { href: '#discover', label: 'Discover', index: '02' },
  { href: '#review-detail', label: 'Review Detail', index: '03' },
  { href: '#architecture', label: 'Design System', index: '04' },
  { href: '#share', label: 'Share', index: '05' },
  { href: '#your-space', label: 'Your Space', index: '06' },
  { href: '#people', label: 'People', index: '07' },
]

type PendingTarget =
  | { kind: 'hash'; value: string }
  | { kind: 'route'; value: string }
  | null

type SectionMenuProps = {
  open: boolean
  anchorRef: RefObject<HTMLButtonElement | null>
  onRequestClose: () => void
}

function SectionMenu({ open, anchorRef, onRequestClose }: SectionMenuProps) {
  const { pathname, navigate } = useRouter()
  const isMoradkPage = pathname === '/projects/moradk'
  const sections = isMoradkPage ? moradkSections : homeSections

  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const animateRef = useRef<((nextOpen: boolean) => void) | null>(null)
  const releaseScrollRef = useRef<(() => void) | null>(null)
  const pendingTarget = useRef<PendingTarget>(null)
  const wantedOpen = useRef(false)
  const { lockScroll, scrollToHash } = useScrollControls()

  const finishClose = useCallback(() => {
    const dialog = dialogRef.current
    if (dialog?.open) dialog.close()
    releaseScrollRef.current?.()
    releaseScrollRef.current = null
    const target = pendingTarget.current
    pendingTarget.current = null
    // Release both scroll locks before navigating to the selected section or route.
    if (target?.kind === 'hash') scrollToHash(target.value)
    else if (target?.kind === 'route') navigate(target.value)
    else anchorRef.current?.focus({ preventScroll: true })
  }, [anchorRef, navigate, scrollToHash])

  useGSAP((_, contextSafe) => {
    const dialog = dialogRef.current
    const panel = panelRef.current
    const backdrop = backdropRef.current
    if (!dialog || !panel || !backdrop || !contextSafe) return

    const texts = Array.from(dialog.querySelectorAll<HTMLElement>('[data-menu-text]'))
    const horizontalLines = Array.from(dialog.querySelectorAll<HTMLElement>('[data-menu-line="horizontal"]'))
    const verticalLines = Array.from(dialog.querySelectorAll<HTMLElement>('[data-menu-line="vertical"]'))
    const brand = dialog.querySelector('[data-menu-brand]')
    const closeIcon = dialog.querySelector('[data-menu-close-icon]')
    const closedClip = 'inset(0 0 0 100%)'
    const openedClip = 'inset(0 0 0 0%)'
    let transitionId = 0

    const originalPanelStyle = panel.getAttribute('style')
    let measuredGeometry: number[] = []
    const updateLayout = () => {
      const anchor = anchorRef.current
      if (!dialog.open || !anchor) return false
      const surface = dialog.getBoundingClientRect()
      const button = anchor.getBoundingClientRect()
      const rightInset = Math.max(0, surface.right - button.right)
      const top = Math.max(0, button.top - surface.top)
      const availableWidth = Math.max(button.width, surface.width - rightInset * 2)
      const width = Math.min(availableWidth, Math.max(360, Math.min(480, surface.width * 0.32)))
      const height = Math.max(button.height, surface.height - top * 2)
      const left = Math.max(0, button.right - surface.left - width)
      const geometry = [left, top, width, height, button.width, button.height]
      if (geometry.every((value, index) => Math.abs(value - (measuredGeometry[index] ?? Infinity)) < 0.25)) return false
      measuredGeometry = geometry
      Object.assign(panel.style, {
        left: `${left}px`,
        right: 'auto',
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
      })
      panel.style.setProperty('--menu-button-width', `${button.width}px`)
      panel.style.setProperty('--menu-button-height', `${button.height}px`)
      return true
    }
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')

    const setContent = (shown: boolean) => {
      // Clear the pixel offset parsed from the CSS fallback before using percent.
      gsap.set(texts, { y: 0, yPercent: shown ? 0 : -100 })
      if (horizontalLines.length) gsap.set(horizontalLines, { scaleX: shown ? 1 : 0, transformOrigin: 'left center' })
      if (verticalLines.length) gsap.set(verticalLines, { scaleY: shown ? 1 : 0, transformOrigin: 'center top' })
      gsap.set(brand, { clipPath: shown ? openedClip : closedClip })
      gsap.set(closeIcon, { rotation: shown ? 0 : -45 })
    }
    gsap.set(panel, { clipPath: closedClip })
    gsap.set(backdrop, { opacity: 0, '--menu-backdrop-blur': MENU_MOTION.backdropBlur })
    setContent(false)

    const animate = contextSafe((nextOpen: boolean) => {
      // Only the latest transition owns completion and pending navigation.
      const id = ++transitionId
      timelineRef.current?.kill()
      timelineRef.current = null

      if (nextOpen) {
        pendingTarget.current = null
        if (!dialog.open) {
          dialog.showModal()
          releaseScrollRef.current = lockScroll()
          dialog.scrollLeft = 0
          dialog.scrollTop = 0
          panel.scrollTop = 0
          updateLayout()
          closeButtonRef.current?.focus({ preventScroll: true })
        }
        if (preference.matches) {
          gsap.set(panel, { clipPath: openedClip })
          gsap.set(backdrop, { opacity: 1 })
          setContent(true)
          return
        }

        const timeline = gsap.timeline()
          .to(panel, { clipPath: openedClip, duration: MENU_MOTION.enterDuration, ease: MENU_MOTION.ease }, 0)
          .to(backdrop, { opacity: 1, duration: MENU_MOTION.enterDuration, ease: MENU_MOTION.overlayEase }, 0)
          .to(texts, {
            yPercent: 0,
            duration: MENU_MOTION.textDuration,
            stagger: MENU_MOTION.stagger,
            ease: MENU_MOTION.ease,
          }, MENU_MOTION.textStart)
          .to(brand, { clipPath: openedClip, duration: MENU_MOTION.enterDuration, ease: MENU_MOTION.ease }, 0)
          .to(closeIcon, { rotation: 0, duration: MENU_MOTION.enterDuration, ease: MENU_MOTION.ease }, 0)
        if (horizontalLines.length) timeline.to(horizontalLines, {
          scaleX: 1, duration: MENU_MOTION.textDuration, stagger: MENU_MOTION.stagger, ease: MENU_MOTION.ease,
        }, MENU_MOTION.textStart)
        if (verticalLines.length) timeline.to(verticalLines, {
          scaleY: 1, duration: MENU_MOTION.textDuration, stagger: MENU_MOTION.stagger, ease: MENU_MOTION.ease,
        }, MENU_MOTION.textStart)
        timelineRef.current = timeline
      } else if (dialog.open) {
        // Even an interrupted entrance closes with fully revealed content.
        setContent(true)
        const complete = contextSafe(() => {
          if (id !== transitionId || wantedOpen.current) return
          setContent(false)
          finishClose()
        })
        if (preference.matches) {
          gsap.set(panel, { clipPath: closedClip })
          gsap.set(backdrop, { opacity: 0 })
          complete()
          return
        }
        // Exit is independent: never reverse the text or separator entrance.
        timelineRef.current = gsap.timeline({ onComplete: complete })
          .to(panel, { clipPath: closedClip, duration: MENU_MOTION.exitDuration, ease: MENU_MOTION.ease }, 0)
          .to(backdrop, { opacity: 0, duration: MENU_MOTION.exitDuration, ease: MENU_MOTION.overlayEase }, 0)
      }
    })
    animateRef.current = animate

    const handleResize = () => {
      // Percentage clips keep their progress when the panel width changes.
      updateLayout()
    }
    const observer = new ResizeObserver(handleResize)
    observer.observe(dialog)
    if (anchorRef.current) observer.observe(anchorRef.current)
    window.addEventListener('resize', handleResize)
    window.visualViewport?.addEventListener('resize', handleResize)

    const handlePreference = () => {
      if (preference.matches) animate(wantedOpen.current)
    }
    preference.addEventListener('change', handlePreference)

    return () => {
      preference.removeEventListener('change', handlePreference)
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      window.visualViewport?.removeEventListener('resize', handleResize)
      transitionId += 1
      timelineRef.current?.kill()
      timelineRef.current = null
      animateRef.current = null
      pendingTarget.current = null
      if (dialog.open) dialog.close()
      releaseScrollRef.current?.()
      releaseScrollRef.current = null
      if (originalPanelStyle === null) panel.removeAttribute('style')
      else panel.setAttribute('style', originalPanelStyle)
    }
  }, { scope: dialogRef, dependencies: [anchorRef, finishClose, lockScroll, pathname], revertOnUpdate: true })

  useGSAP(() => {
    wantedOpen.current = open
    animateRef.current?.(open)
  }, { scope: dialogRef, dependencies: [open, lockScroll, finishClose] })

  const chooseTarget = (event: MouseEvent<HTMLAnchorElement>, target: Exclude<PendingTarget, null>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    pendingTarget.current = target
    onRequestClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Section navigation"
      aria-modal="true"
      className={`${styles.dialog} fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0`}
      onCancel={(event) => {
        event.preventDefault()
        onRequestClose()
      }}
      onClose={() => {
        if (!dialogRef.current?.open) onRequestClose()
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current || event.target === backdropRef.current) onRequestClose()
      }}
    >
      <div ref={backdropRef} aria-hidden="true" className={`${styles.backdrop} absolute inset-0 bg-black/50`} />
      <div
        ref={panelRef}
        data-lenis-prevent
        className={`${styles.panel} absolute top-5 right-6 flex h-[calc(100%-40px)] w-[min(480px,calc(100%-48px))] flex-col overflow-hidden border border-ink/15 bg-white text-ink shadow-2xl`}
      >
        <div className="flex h-[var(--menu-button-height)] shrink-0 items-center justify-between border-b border-ink/10">
          <a
            href={isMoradkPage ? '/' : '#intro'}
            aria-label="chiqq888 home"
            data-menu-brand
            onClick={(event) =>
              chooseTarget(event, isMoradkPage ? { kind: 'route', value: '/' } : { kind: 'hash', value: '#intro' })}
            className="flex h-full w-fit items-center gap-3 px-5 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ink md:px-6"
          >
            <img src={passionLogo} alt="Design by Passion" className="h-7 w-auto md:h-8" />
            <img src={portraitLogo} alt="chiqq888 portrait logo" className="size-8 object-contain md:size-9" />
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close menu"
            onClick={onRequestClose}
            className="relative flex h-[var(--menu-button-height)] w-[var(--menu-button-width)] shrink-0 cursor-pointer items-center justify-center bg-ink text-white transition-colors duration-200 hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
          >
            <span data-menu-close-icon aria-hidden="true" className="relative flex size-5 items-center justify-center md:size-6">
              <span className="absolute h-0.5 w-full rotate-45 bg-current" />
              <span className="absolute h-0.5 w-full -rotate-45 bg-current" />
            </span>
          </button>
        </div>
        <div data-menu-scroll className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="flex min-h-full flex-col justify-center">
            {isMoradkPage && (
              <div className="border-b border-ink/10">
                <a
                  href="/#works"
                  onClick={(event) => chooseTarget(event, { kind: 'route', value: '/#works' })}
                  className="block px-5 py-3.5 text-xs font-bold tracking-[0.16em] uppercase text-ink/70 transition-colors hover:bg-ink/[0.04] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ink md:px-6"
                >
                  <span className={styles.textMask}>
                    <span data-menu-text className={styles.text}>
                      <span className="flex items-center justify-between gap-4">
                        <span>← Back to Works</span>
                        <span className="text-[10px] font-medium tracking-[0.18em] text-ink/40">INDEX</span>
                      </span>
                    </span>
                  </span>
                </a>
              </div>
            )}
            <ul
              id="section-menu"
              aria-label="Sections"
              className={
                isMoradkPage
                  ? 'py-4 text-[clamp(22px,2.2vw,30px)] leading-[1.15]'
                  : 'py-8 text-[clamp(30px,3vw,42px)] leading-[1.2]'
              }
            >
              {sections.map(({ href, label, index: sectionIndex }, index) => (
                <li key={href} data-menu-item className="relative border-b border-transparent last:border-b-0">
                  <a
                    href={href}
                    onClick={(event) => chooseTarget(event, { kind: 'hash', value: href })}
                    className={`block px-5 transition-all duration-200 hover:bg-ink/[0.04] hover:pl-7 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ink motion-reduce:transition-none md:px-6 md:hover:pl-8 ${
                      isMoradkPage ? 'py-2.5 md:py-3' : 'py-3.5 md:py-4'
                    }`}
                  >
                    <span className={styles.textMask}>
                      <span data-menu-text className={styles.text}>
                        <span className="flex items-baseline justify-between gap-4">
                          <span>{label}</span>
                          <span className="text-xs font-medium tracking-widest text-ink/40">{sectionIndex}</span>
                        </span>
                      </span>
                    </span>
                  </a>
                  {index < sections.length - 1 && (
                    <span aria-hidden="true" data-menu-line="horizontal" className={styles.divider} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-between border-t border-ink/10 px-5 py-4 text-[11px] font-medium text-ink/55 md:px-6">
          <a
            href="mailto:contact@chiqq888.me"
            className="underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            contact@chiqq888.me
          </a>
          <span>Thailand</span>
        </div>
      </div>
    </dialog>
  )
}

export default SectionMenu
