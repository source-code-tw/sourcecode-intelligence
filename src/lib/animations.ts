import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Animate text lines/words in with stagger.
 * Expects the element to contain child elements (e.g., spans wrapping each word/line).
 */
export function splitTextReveal(
  container: HTMLElement,
  options: { stagger?: number; duration?: number; y?: number } = {}
) {
  const { stagger = 0.05, duration = 0.8, y = 40 } = options
  const children = container.children

  if (!children.length) return

  gsap.set(children, { y, opacity: 0 })

  return gsap.to(children, {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      once: true,
    },
  })
}

/**
 * Stagger children in from bottom with fade.
 */
export function staggerReveal(
  container: HTMLElement,
  options: { stagger?: number; duration?: number; y?: number } = {}
) {
  const { stagger = 0.1, duration = 0.7, y = 50 } = options
  const children = container.children

  if (!children.length) return

  gsap.set(children, { y, opacity: 0 })

  return gsap.to(children, {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      once: true,
    },
  })
}

/**
 * Parallax effect: element moves at a different speed on scroll.
 */
export function parallaxSection(
  element: HTMLElement,
  options: { speed?: number } = {}
) {
  const { speed = 0.3 } = options

  return gsap.to(element, {
    y: () => ScrollTrigger.maxScroll(window) * speed * -0.1,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

/**
 * Magnetic effect: element subtly follows the cursor when hovered.
 * Call once per element; returns a cleanup function.
 */
export function magneticEffect(
  element: HTMLElement,
  options: { strength?: number; ease?: number } = {}
) {
  const { strength = 0.3, ease = 0.15 } = options
  let rafId: number
  let targetX = 0
  let targetY = 0
  let currentX = 0
  let currentY = 0
  let isHovering = false

  function animate() {
    if (!isHovering) {
      currentX += (0 - currentX) * ease
      currentY += (0 - currentY) * ease
    } else {
      currentX += (targetX - currentX) * ease
      currentY += (targetY - currentY) * ease
    }

    element.style.transform = `translate(${currentX}px, ${currentY}px)`

    rafId = requestAnimationFrame(animate)
  }

  function onMouseMove(e: MouseEvent) {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    targetX = (e.clientX - centerX) * strength
    targetY = (e.clientY - centerY) * strength
  }

  function onMouseEnter() {
    isHovering = true
  }

  function onMouseLeave() {
    isHovering = false
  }

  element.addEventListener('mousemove', onMouseMove)
  element.addEventListener('mouseenter', onMouseEnter)
  element.addEventListener('mouseleave', onMouseLeave)
  rafId = requestAnimationFrame(animate)

  return function cleanup() {
    cancelAnimationFrame(rafId)
    element.removeEventListener('mousemove', onMouseMove)
    element.removeEventListener('mouseenter', onMouseEnter)
    element.removeEventListener('mouseleave', onMouseLeave)
    element.style.transform = ''
  }
}
