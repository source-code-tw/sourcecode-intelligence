'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ──────────────────────────────────────────
   Data
   ────────────────────────────────────────── */

const steps = [
  {
    num: '01',
    title: '需求分析',
    desc: 'CEO 定義產品方向，AI Agent 做市場調研驗證',
  },
  {
    num: '02',
    title: '架構設計',
    desc: 'CTO 設計系統架構，AI Agent 產出技術方案',
  },
  {
    num: '03',
    title: '平行開發',
    desc: '3 位 AI Agent 同時開發不同模組，24/7 不間斷',
  },
  {
    num: '04',
    title: '交付上線',
    desc: '自動測試、部署、監控，以天為單位迭代',
  },
];

/* ──────────────────────────────────────────
   Main component
   ────────────────────────────────────────── */

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="section-dark py-20 md:py-32 relative overflow-hidden">
      <div
        className="mx-auto max-w-[var(--container-max)] px-[var(--container-padding)]"
      >
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <motion.h2
            className="font-display text-display-md gradient-text-dark mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            AI-Native 開發模式
          </motion.h2>
          <motion.p
            className="text-body-md text-text-on-dark-secondary"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            不是用 AI 輔助開發，而是讓 AI Agent 成為團隊核心成員
          </motion.p>
        </div>

        {/* Timeline steps */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            className="absolute left-[19px] top-0 bottom-0 w-px origin-top lg:hidden"
            style={{ background: 'linear-gradient(to bottom, var(--accent-gold), transparent)' }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Desktop horizontal line */}
          <motion.div
            className="absolute top-[19px] left-0 right-0 h-px origin-left hidden lg:block"
            style={{ background: 'linear-gradient(to right, var(--accent-gold), transparent)' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative pl-14 lg:pl-0"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Step number circle */}
                <div
                  className="absolute left-0 top-0 lg:relative lg:mb-6 w-[38px] h-[38px] rounded-full border border-accent-gold/30 flex items-center justify-center"
                  style={{ background: 'var(--bg-dark)' }}
                >
                  <span className="font-mono text-xs text-accent-gold">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-display text-xl text-text-on-dark font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-base text-text-on-dark-secondary leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
