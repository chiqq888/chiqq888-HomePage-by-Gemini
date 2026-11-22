import { useEffect, useRef } from 'react'

type BackgroundVideoProps = {
  src: string
  poster: string
  className: string
  eagerPoster?: boolean
}

function BackgroundVideo({ src, poster, className, eagerPoster = false }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const visibilityThreshold = 0.01
    let inView = false

    const updatePlayback = () => {
      if (motion.matches && video.hasAttribute('src')) {
        video.removeAttribute('src')
        video.load()
      }

      if (!inView || document.hidden || motion.matches) {
        if (!video.paused) video.pause()
        return
      }

      if (video.getAttribute('src') !== src) video.src = src
      if (video.paused) {
        void video.play().catch(() => { /* Keep the poster when playback is unavailable. */ })
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= visibilityThreshold
      if (inView && video.getAttribute('poster') !== poster) video.poster = poster
      updatePlayback()
    }, { threshold: visibilityThreshold })

    observer.observe(video)
    motion.addEventListener('change', updatePlayback)
    document.addEventListener('visibilitychange', updatePlayback)

    return () => {
      observer.disconnect()
      motion.removeEventListener('change', updatePlayback)
      document.removeEventListener('visibilitychange', updatePlayback)
      video.pause()
    }
  }, [src, poster])

  return (
    <video
      ref={videoRef}
      poster={eagerPoster ? poster : undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={className}
    />
  )
}

export default BackgroundVideo
