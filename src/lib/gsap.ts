import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP)

CustomEase.create('menu-panel', '0.53, 0, 0, 1')
CustomEase.create('menu-overlay', '0.25, 0.1, 0.25, 1')

export { gsap, ScrollTrigger, useGSAP }
