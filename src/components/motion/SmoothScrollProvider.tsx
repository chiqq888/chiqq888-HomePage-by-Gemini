import { useCallback, useMemo, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { SCROLL_LERP } from '../../lib/motionSettings'
import { ScrollControlsContext } from '../../lib/scrollControls'

const ANCHOR_SCROLL_DURATION = 0.9

type GsapMediaEvent = 'matchMediaInit' | 'matchMedia'

// GSAP exposes these lifecycle events at runtime but omits them from its types.
const gsapMediaEvents = gsap as typeof gsap & {
  addEventListener(event: GsapMediaEvent, listener: () => void): void
  removeEventListener(event: GsapMediaEvent, listener: () => void): void
}

function getHashTarget(hash: string): HTMLElement | number | null {
  if (!hash || hash === '#' || hash === '#root' || hash === '#navbar') return 0

  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)))
  } catch {
    return null
  }
}

function scrollToNativeTarget(target: HTMLElement | number) {
  if (target instanceof HTMLElement) target.scrollIntoView({ behavior: 'auto', block: 'start' })
  else window.scrollTo({ top: target, behavior: 'auto' })
}

function focusTarget(target: HTMLElement) {
  const hadTabIndex = target.hasAttribute('tabindex')
  const restore = () => {
    if (!hadTabIndex) target.removeAttribute('tabindex')
    target.removeEventListener('blur', restore)
  }
  if (!hadTabIndex) target.setAttribute('tabindex', '-1')
  if (!hadTabIndex) target.addEventListener('blur', restore, { once: true })
  target.focus({ preventScroll: true })
  // Keep the temporary tabindex until focus leaves, otherwise Chromium blurs it.
  if (document.activeElement !== target) restore()
  return restore
}

function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const activeRef = useRef(false)
  const clearTargetFocus = useRef<(() => void) | null>(null)
  const lockCount = useRef(0)
  const lockedStyles = useRef<{
    htmlOverflow: string
    bodyOverflow: string
    scrollbarGutter: string
  } | null>(null)

  const restoreScrolling = useCallback(() => {
    const saved = lockedStyles.current
    if (saved) {
      document.documentElement.style.overflow = saved.htmlOverflow
      document.body.style.overflow = saved.bodyOverflow
      document.documentElement.style.scrollbarGutter = saved.scrollbarGutter
      lockedStyles.current = null
    }
    lockCount.current = 0
    lenisRef.current?.start()
  }, [])

  const lockScroll = useCallback(() => {
    lockCount.current += 1
    if (lockCount.current === 1) {
      const html = document.documentElement
      lockedStyles.current = {
        htmlOverflow: html.style.overflow,
        bodyOverflow: document.body.style.overflow,
        scrollbarGutter: html.style.scrollbarGutter,
      }
      // Reserve the scrollbar space so opening the menu keeps the layout steady.
      html.style.scrollbarGutter = 'stable'
      html.style.overflow = 'hidden'
      // Unlike hidden, clip preserves the sticky navbar's scroll container.
      document.body.style.overflow = 'clip'
      lenisRef.current?.stop()
    }
    let released = false
    return () => {
      if (released) return
      released = true
      lockCount.current = Math.max(0, lockCount.current - 1)
      if (lockCount.current === 0) restoreScrolling()
    }
  }, [restoreScrolling])

  const scrollToHash = useCallback((hash: string) => {
    if (!activeRef.current) return false
    const target = getHashTarget(hash)
    if (target === null) return false
    if (hash !== window.location.hash) window.history.pushState(window.history.state, '', hash)
    const focusElement = target instanceof HTMLElement ? target : document.getElementById('root')
    const focusSection = () => {
      if (!focusElement) return
      clearTargetFocus.current?.()
      clearTargetFocus.current = focusTarget(focusElement)
    }
    const instance = lenisRef.current
    if (instance) {
      instance.scrollTo(target, {
        // A fixed duration lets Lenis complete at fractional scroll offsets.
        duration: ANCHOR_SCROLL_DURATION,
        onComplete: () => {
          if (activeRef.current && lenisRef.current === instance) focusSection()
        },
      })
    } else {
      scrollToNativeTarget(target)
      focusSection()
    }
    return true
  }, [])

  const controls = useMemo(() => ({ lockScroll, scrollToHash }), [lockScroll, scrollToHash])

  useGSAP(() => {
    let active = true
    activeRef.current = true
    let lenis: Lenis | null = null
    let refreshTimer = 0
    let hashTimer = 0
    let mediaScrollY = 0
    const media = gsap.matchMedia()

    const requestRefresh = () => {
      if (!active) return
      window.clearTimeout(refreshTimer)
      refreshTimer = window.setTimeout(() => {
        if (!active) return
        lenis?.resize()
        ScrollTrigger.refresh()
      }, 100)
    }

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const instance = new Lenis({
        lerp: SCROLL_LERP,
        autoRaf: false,
        anchors: false,
        smoothWheel: true,
      })
      lenis = instance
      lenisRef.current = instance
      if (lockCount.current > 0) instance.stop()
      const unsubscribe = instance.on('scroll', ScrollTrigger.update)
      const tick = (time: number) => instance.raf(time * 1000)

      // Lenis uses only this GSAP ticker; its own autoRaf stays disabled.
      gsap.ticker.lagSmoothing(0)
      gsap.ticker.add(tick)
      requestRefresh()

      return () => {
        gsap.ticker.remove(tick)
        unsubscribe()
        instance.destroy()
        if (lenis === instance) lenis = null
        if (lenisRef.current === instance) lenisRef.current = null
        gsap.ticker.lagSmoothing(500, 33)
      }
    })

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return
      if (scrollToHash(url.hash)) event.preventDefault()
    }

    const syncHashPosition = () => {
      window.clearTimeout(hashTimer)
      hashTimer = window.setTimeout(() => {
        if (!active || lockCount.current > 0 || !window.location.hash) return
        const target = getHashTarget(window.location.hash)
        if (target === null) return
        if (lenis) lenis.scrollTo(target, { immediate: true })
        else scrollToNativeTarget(target)
      }, 0)
    }

    const handleImageLoad = (event: Event) => {
      if (event.target instanceof HTMLImageElement) requestRefresh()
    }
    const rememberMediaScroll = () => {
      mediaScrollY = window.scrollY
    }
    const restoreMediaScroll = () => {
      // ScrollTrigger can lose its saved position when replacing media-specific triggers.
      if (window.scrollY === mediaScrollY) return
      scrollToNativeTarget(mediaScrollY)
      lenis?.resize()
    }
    const resizeObserver = new ResizeObserver(requestRefresh)
    const root = document.getElementById('root')
    if (root) resizeObserver.observe(root)

    document.addEventListener('click', handleAnchorClick)
    document.addEventListener('load', handleImageLoad, true)
    window.addEventListener('popstate', syncHashPosition)
    window.addEventListener('hashchange', syncHashPosition)
    window.addEventListener('load', requestRefresh)
    gsapMediaEvents.addEventListener('matchMediaInit', rememberMediaScroll)
    gsapMediaEvents.addEventListener('matchMedia', restoreMediaScroll)
    void document.fonts.ready.then(requestRefresh)
    // React can mount the section after the browser first resolves the fragment.
    syncHashPosition()

    return () => {
      active = false
      activeRef.current = false
      clearTargetFocus.current?.()
      clearTargetFocus.current = null
      window.clearTimeout(refreshTimer)
      window.clearTimeout(hashTimer)
      resizeObserver.disconnect()
      document.removeEventListener('click', handleAnchorClick)
      document.removeEventListener('load', handleImageLoad, true)
      window.removeEventListener('popstate', syncHashPosition)
      window.removeEventListener('hashchange', syncHashPosition)
      window.removeEventListener('load', requestRefresh)
      gsapMediaEvents.removeEventListener('matchMediaInit', rememberMediaScroll)
      gsapMediaEvents.removeEventListener('matchMedia', restoreMediaScroll)
      media.revert()
      restoreScrolling()
    }
  }, [restoreScrolling, scrollToHash])

  return <ScrollControlsContext.Provider value={controls}>{children}</ScrollControlsContext.Provider>
}

export default SmoothScrollProvider
