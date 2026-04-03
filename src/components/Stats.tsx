'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 8, suffix: '+', prefix: '', label: '產品線' },
  { value: 3, suffix: '', prefix: '', label: 'AI Agents' },
  { value: 5, suffix: '天', prefix: '', label: '平均交付' },
  { value: 24, suffix: '/7', prefix: '', label: 'AI 不休息' },
];

function useCountUp(target: number, trigger: boolean, duration = 1.6) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);

      if (current !== start) {
        start = current;
        setCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    }

    requestAnimationFrame(step);
  }, [trigger, target, duration]);

  return count;
}

function StatCard({ stat, index, inView }: { stat: StatItem; index: number; inView: boolean }) {
  const count = useCountUp(stat.value, inView);

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <span className="text-display-lg font-display text-text-primary" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        {stat.prefix}
        {count}
        {stat.suffix}
      </span>
      <span className="text-caption text-text-tertiary">{stat.label}</span>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="w-full" style={{ paddingBlock: 'calc(var(--section-gap) * 1.2)' }}>
      {/* Gradient top border */}
      <div
        className="mx-auto h-px"
        style={{
          maxWidth: 'var(--container-max)',
          background:
            'linear-gradient(90deg, transparent 0%, var(--accent-gold) 50%, transparent 100%)',
          opacity: 0.4,
          marginBottom: 'calc(var(--section-gap) * 1.2)',
        }}
      />

      <div
        className="mx-auto"
        style={{
          maxWidth: 'var(--container-max)',
          paddingInline: 'var(--container-padding)',
        }}
      >
        <div
          ref={ref}
          className="grid grid-cols-2 gap-y-12 gap-x-6 md:grid-cols-4 rounded-2xl border border-border-light py-12 px-6 md:py-14 md:px-10"
          style={{ backgroundColor: 'var(--bg-secondary, rgba(255,255,255,0.02))' }}
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
