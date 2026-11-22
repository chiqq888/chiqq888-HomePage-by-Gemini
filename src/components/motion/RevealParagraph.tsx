import { useRef, type ComponentPropsWithoutRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { PARAGRAPH_REVEAL } from '../../lib/motionSettings'

type RevealParagraphProps = ComponentPropsWithoutRef<'p'>

function RevealParagraph({ children, ...props }: RevealParagraphProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const revealedRef = useRef(false)

  useGSAP(
    () => {
      const paragraph = paragraphRef.current
      if (!paragraph) return

      const media = gsap.matchMedia()

      media.add(
        {
          all: 'all',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          if (context.conditions?.reduceMotion || revealedRef.current) {
            // Preference changes never conceal text that has already appeared.
            revealedRef.current = true
            gsap.set(paragraph, { clipPath: 'inset(0 0% 0 0)' })
            return
          }

          const tween = gsap.fromTo(
            paragraph,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: PARAGRAPH_REVEAL.duration,
              ease: PARAGRAPH_REVEAL.ease,
              scrollTrigger: {
                trigger: paragraph,
                start: PARAGRAPH_REVEAL.start,
                toggleActions: 'play none none none',
                once: true,
              },
              onComplete: () => {
                revealedRef.current = true
              },
            },
          )

          // Initial viewport content should reveal even below the entry threshold.
          const bounds = paragraph.getBoundingClientRect()
          if (bounds.top < window.innerHeight && bounds.bottom > 0) {
            tween.scrollTrigger?.kill(false, true)
            tween.play()
          }
        },
      )

      return () => media.revert()
    },
    { scope: paragraphRef },
  )

  return (
    <p ref={paragraphRef} {...props}>
      {children}
    </p>
  )
}

export default RevealParagraph
