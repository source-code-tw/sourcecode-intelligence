'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const line1Chars = '用 AI 重新定義'.split('')
const line2Chars = '軟體開發的速度'.split('')

const charVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.3 + i * 0.05,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const line2StartDelay = line1Chars.length

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* Background — subtle gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 25% 0%, rgba(26, 26, 46, 0.06) 0%, transparent 70%),
              radial-gradient(ellipse 40% 60% at 75% 100%, rgba(26, 26, 46, 0.04) 0%, transparent 60%),
              var(--bg-primary)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 mx-auto w-full" style={{ maxWidth: '960px' }}>

        {/* Eyebrow */}
        <motion.p
          className="font-mono text-caption text-text-tertiary mb-10 md:mb-14 tracking-[0.2em]"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          AI-Native Product Studio
        </motion.p>

        {/* Headline */}
        <h1 className="font-display mb-12 md:mb-16">
          {/* Line 1 */}
          <span className="block overflow-hidden" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            fontWeight: 700,
          }}>
            {line1Chars.map((char, i) => (
              <motion.span
                key={`l1-${i}`}
                className="inline-block"
                custom={i}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={charVariants}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>

          {/* Line 2 — same solid color, no gradient */}
          <span className="block overflow-hidden mt-2 md:mt-3" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            fontWeight: 700,
          }}>
            {line2Chars.map((char, i) => (
              <motion.span
                key={`l2-${i}`}
                className="inline-block"
                custom={line2StartDelay + i}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={charVariants}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="font-sans text-text-secondary mx-auto mb-14 md:mb-16 text-center"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            lineHeight: 1.7,
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          3 位 AI Agent + 2 位人類
          <br />
          以天為單位交付世界級產品
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#products"
            className="font-sans font-medium px-8 py-3.5 rounded-full bg-text-primary text-bg-primary hover:opacity-80 transition-opacity duration-200"
            style={{ fontSize: '0.9375rem', letterSpacing: '0.01em' }}
          >
            探索我們的產品
          </a>
          <a
            href="#methodology"
            className="font-sans font-medium px-8 py-3.5 rounded-full border text-text-primary hover:text-text-secondary transition-colors duration-200"
            style={{ fontSize: '0.9375rem', letterSpacing: '0.01em', borderColor: 'var(--border-medium)' }}
          >
            了解工作方式
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-text-quaternary flex items-start justify-center p-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-text-tertiary"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
