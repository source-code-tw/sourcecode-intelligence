'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Types ─── */

type Status = '已上線' | '運行中' | '已發布' | '開發中' | '規劃中';

interface Product {
  name: string;
  description: string;
  status: Status;
  tags: string[];
}

/* ─── Data ─── */

const PRODUCTS: Product[] = [
  {
    name: '社區管理 SaaS',
    description: '取代大樓秘書的智慧管理平台',
    status: '開發中',
    tags: ['Next.js', 'Supabase'],
  },
  {
    name: '豪車配對 APP',
    description: '豪華車共乘媒合平台',
    status: '開發中',
    tags: ['Flutter', 'Supabase'],
  },
  {
    name: 'GuardianAI',
    description: '被動式人身安全偵測',
    status: '開發中',
    tags: ['Flutter', 'ML'],
  },
  {
    name: '派遣管理後台',
    description: '演唱會/人力派遣管理系統',
    status: '規劃中',
    tags: ['Next.js', 'Supabase'],
  },
  {
    name: '覓食 AI',
    description: 'LINE Bot 智慧美食推薦',
    status: '已上線',
    tags: ['Python', 'LINE API'],
  },
  {
    name: 'NG_Gold',
    description: 'XAUUSD 自動交易系統',
    status: '運行中',
    tags: ['MQL5', 'MT5'],
  },
  {
    name: 'AI 金融研究工具',
    description: '交易記憶與策略進化引擎',
    status: '開發中',
    tags: ['Python', 'MCP'],
  },
  {
    name: 'idea-reality-mcp',
    description: '開源 Pre-build 驗證工具',
    status: '已發布',
    tags: ['Python', 'PyPI'],
  },
];

const FILTERS: { label: string; match: Status[] | null }[] = [
  { label: '全部', match: null },
  { label: '已上線', match: ['已上線', '運行中', '已發布'] },
  { label: '開發中', match: ['開發中'] },
  { label: '規劃中', match: ['規劃中'] },
];

const STATUS_COLORS: Record<Status, string> = {
  已上線: '#22c55e',
  運行中: '#22c55e',
  已發布: '#22c55e',
  開發中: '#eab308',
  規劃中: '#8A8A82',
};

/* ─── ProductCard ─── */

function ProductCard({ product, index, inView }: { product: Product; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02,1.02,1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex h-full flex-col gap-3 rounded-[var(--radius-lg)] border border-border-light bg-bg-card p-5 transition-[transform,box-shadow] duration-500"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transitionTimingFunction: 'var(--ease-out-expo)',
        }}
      >
        {/* Hover gradient border glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[var(--radius-lg)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(135deg, rgba(200,165,92,0.25), transparent 60%, rgba(200,165,92,0.15))',
            zIndex: -1,
          }}
        />

        {/* Status badge */}
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: STATUS_COLORS[product.status] }}
          />
          <span className="text-xs font-medium text-text-tertiary">{product.status}</span>
        </div>

        {/* Name + Description */}
        <h3 className="font-sans text-base font-bold text-text-primary leading-snug">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">{product.description}</p>

        {/* Tags */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border-light px-2.5 py-0.5 text-[0.6875rem] font-medium text-text-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Products Section ─── */

export default function Products() {
  const [activeFilter, setActiveFilter] = useState<string>('全部');
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  const filtered =
    activeFilter === '全部'
      ? PRODUCTS
      : PRODUCTS.filter((p) => {
          const f = FILTERS.find((f) => f.label === activeFilter);
          return f?.match?.includes(p.status);
        });

  return (
    <section
      className="w-full"
      style={{ paddingBlock: 'var(--section-gap)' }}
    >
      <div
        ref={sectionRef}
        className="mx-auto"
        style={{
          maxWidth: 'var(--container-max)',
          paddingInline: 'var(--container-padding)',
        }}
      >
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-display-md font-display text-text-primary mb-3">
            我們打造的產品
          </h2>
          <p className="text-body-md text-text-secondary">
            從概念到上線，每一個都是真實運行的產品
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-8 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {FILTERS.map((f) => {
            const isActive = f.label === activeFilter;
            return (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                className="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-300"
                style={{
                  borderColor: isActive ? 'var(--accent-gold)' : 'var(--border-light)',
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-tertiary)',
                  background: isActive ? 'rgba(200,165,92,0.08)' : 'transparent',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
