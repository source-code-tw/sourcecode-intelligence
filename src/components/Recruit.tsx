'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const REQUIREMENTS = [
  '熟悉 TypeScript/Python',
  '有 AI 工具使用經驗',
  '對產品有熱情',
  '能獨立思考解決問題',
];

const FLOATING_CODE = [
  'const agent = await claude.init();',
  'function buildProduct(idea: Idea) {',
  'export type Strategy = "ship-fast";',
  'await deploy({ env: "production" });',
  'if (ai.ready && human.ready) ship();',
  'import { memory } from "@mnemox/core";',
];

export default function Recruit() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="careers"
      className="section-dark w-full relative overflow-hidden"
      style={{ paddingBlock: 'var(--section-gap)' }}
    >
      {/* Floating code background */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {FLOATING_CODE.map((line, i) => (
          <motion.span
            key={i}
            className="absolute font-mono text-sm whitespace-nowrap"
            style={{
              color: 'var(--text-on-dark)',
              opacity: 0.04,
              top: `${12 + i * 14}%`,
              left: `${5 + (i % 3) * 30}%`,
            }}
            initial={{ x: -20, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 0.04 } : { x: -20, opacity: 0 }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          >
            {line}
          </motion.span>
        ))}
      </div>

      <div
        ref={ref}
        className="mx-auto relative z-10"
        style={{
          maxWidth: 'var(--container-max)',
          paddingInline: 'var(--container-padding)',
        }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-display-md font-display gradient-text-dark mb-4">
            加入我們
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto" style={{ color: 'var(--text-on-dark-secondary)' }}>
            我們正在尋找和 AI 一起工作的下一代工程師
          </p>
        </motion.div>

        {/* Job Card */}
        <motion.div
          className="mx-auto max-w-2xl rounded-[var(--radius-xl)] p-8 md:p-10"
          style={{
            background: 'var(--bg-card-dark)',
            border: '1px solid rgba(237, 236, 232, 0.08)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Position header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-on-dark)' }}>
                AI 應用開發工程師
              </h3>
              <p className="text-body-sm mt-1" style={{ color: 'var(--accent-gold)' }}>
                NT$50,000 - 80,000/月
              </p>
            </div>
            <div className="flex gap-2">
              <span
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(200, 165, 92, 0.1)',
                  color: 'var(--accent-gold)',
                  border: '1px solid rgba(200, 165, 92, 0.15)',
                }}
              >
                全職
              </span>
              <span
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(237, 236, 232, 0.05)',
                  color: 'var(--text-on-dark-secondary)',
                  border: '1px solid rgba(237, 236, 232, 0.08)',
                }}
              >
                台灣
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full mb-6"
            style={{ background: 'rgba(237, 236, 232, 0.08)' }}
          />

          {/* Requirements */}
          <h4
            className="text-caption mb-4"
            style={{ color: 'var(--text-on-dark-secondary)' }}
          >
            Requirements
          </h4>
          <ul className="space-y-3 mb-8">
            {REQUIREMENTS.map((req, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-body-sm"
                style={{ color: 'var(--text-on-dark)' }}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: 'var(--accent-gold)' }}
                />
                {req}
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="mailto:dev@mnemox.ai?subject=AI 應用開發工程師 — 履歷投遞"
            className="inline-flex items-center gap-2 font-sans text-body-sm font-medium px-6 py-3 rounded-full transition-colors duration-200"
            style={{
              background: 'var(--accent-gold)',
              color: '#fff',
            }}
            whileHover={{ scale: 1.04, backgroundColor: '#9A7D3A' }}
            whileTap={{ scale: 0.97 }}
          >
            投遞履歷
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
