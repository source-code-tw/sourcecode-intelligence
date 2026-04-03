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
   Animated workflow diagram (SVG)
   ────────────────────────────────────────── */

function WorkflowDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Concentric rings + node connections
  const rings = [120, 90, 60];
  const nodes = [
    { cx: 0, cy: -120, label: 'CEO' },
    { cx: 104, cy: 60, label: 'Agent 1' },
    { cx: -104, cy: 60, label: 'Agent 2' },
    { cx: 0, cy: 0, label: 'Agent 3' },
  ];

  return (
    <div ref={ref} className="relative flex items-center justify-center w-full max-w-[340px] mx-auto aspect-square">
      <svg viewBox="-160 -160 320 320" className="w-full h-full">
        {/* Concentric rings */}
        {rings.map((r, i) => (
          <motion.circle
            key={r}
            cx={0}
            cy={0}
            r={r}
            fill="none"
            stroke="var(--accent-gold)"
            strokeWidth={0.5}
            strokeOpacity={0.2 - i * 0.04}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 + i * 0.2, ease: 'easeOut' }}
          />
        ))}

        {/* Connecting lines between nodes */}
        {nodes.slice(0, -1).map((from, i) =>
          nodes.slice(i + 1).map((to, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="var(--accent-gold)"
              strokeWidth={0.5}
              strokeOpacity={0.15}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1 + i * 0.15, ease: 'easeOut' }}
            />
          )),
        )}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            {/* Pulse ring */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={18}
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth={0.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                inView
                  ? {
                      scale: [1, 1.6, 1],
                      opacity: [0.4, 0, 0.4],
                    }
                  : {}
              }
              transition={{
                duration: 3,
                delay: 1.2 + i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
            />
            {/* Dot */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={6}
              fill="var(--accent-gold)"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 1 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
            />
            {/* Label */}
            <motion.text
              x={node.cx}
              y={node.cy + 28}
              textAnchor="middle"
              fill="var(--text-on-dark-secondary)"
              fontSize={10}
              fontFamily="var(--font-space-mono), monospace"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.3 + i * 0.15 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}

        {/* Orbiting particle */}
        <motion.circle
          r={3}
          fill="var(--accent-gold)"
          opacity={0.6}
          initial={{ opacity: 0 }}
          animate={
            inView
              ? {
                  opacity: [0, 0.6, 0.6, 0],
                  cx: [0, 104, -104, 0],
                  cy: [-120, 60, 60, -120],
                }
              : {}
          }
          transition={{
            duration: 4,
            delay: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────
   Main component
   ────────────────────────────────────────── */

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="section-dark py-[var(--section-gap)] relative overflow-hidden">
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

        {/* Content grid: timeline + diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-24 items-center">
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

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6">
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

                  <h3 className="font-display text-body-lg text-text-on-dark font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-body-sm text-text-on-dark-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Workflow diagram */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <WorkflowDiagram />
          </motion.div>
        </div>

        {/* Mobile diagram (below timeline) */}
        <motion.div
          className="mt-16 lg:hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <WorkflowDiagram />
        </motion.div>
      </div>
    </section>
  );
}
