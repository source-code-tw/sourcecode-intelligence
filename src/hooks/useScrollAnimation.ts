'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type AnimationType = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleIn'

interface UseScrollAnimationOptions {
  type?: AnimationType
  delay?: number
  duration?: number
}

const animationPresets: Record<AnimationType, gsap.TweenVars> = {
  fadeUp: { y: 60, opacity: 0 },
  fadeLeft: { x: -60, opacity: 0 },
  fadeRight: { x: 60, opacity: 0 },
  scaleIn: { scale: 0.85, opacity: 0 },
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>({
  type = 'fadeUp',
  delay = 0,
  duration = 0.8,
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fromVars = animationPresets[type]

    gsap.set(el, fromVars)

    const tween = gsap.to(el, {
      ...Object.fromEntries(
        Object.keys(fromVars).map((key) => [key, key === 'opacity' ? 1 : key === 'scale' ? 1 : 0])
      ),
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [type, delay, duration])

  return ref
}
