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

const STATUS_BG: Record<Status, string> = {
  已上線: 'rgba(34,197,94,0.12)',
  運行中: 'rgba(34,197,94,0.12)',
  已發布: 'rgba(34,197,94,0.12)',
  開發中: 'rgba(234,179,8,0.12)',
  規劃中: 'rgba(138,138,130,0.12)',
};

/* ─── Product Icons (inline SVG) ─── */

const PRODUCT_ICONS: Record<string, JSX.Element> = {
  '社區管理 SaaS': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="18" height="12" rx="2" /><path d="M3 9l9-6 9 6" /><path d="M9 21v-6h6v6" />
    </svg>
  ),
  '豪車配對 APP': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M6 9l1.5-4.5h9L18 9" /><rect x="3" y="9" width="18" height="8" rx="2" /><circle cx="7" cy="17" r="1.5" /><circle cx="17" cy="17" r="1.5" />
    </svg>
  ),
  'GuardianAI': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 4v5c0 4.5-3.5 8.5-8 10-4.5-1.5-8-5.5-8-10V7l8-4z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  '派遣管理後台': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6M9 11h6M9 15h4" /><path d="M9 3V1M15 3V1" />
    </svg>
  ),
  '覓食 AI': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M5 6v12a2 2 0 002 2h10a2 2 0 002-2V6" /><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" /><line x1="10" y1="11" x2="10" y2="15" /><line x1="14" y1="11" x2="14" y2="15" />
    </svg>
  ),
  'NG_Gold': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  'AI 金融研究工具': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 3a4.5 4.5 0 000 9 4.5 4.5 0 010 9" /><path d="M12 3a4.5 4.5 0 010 9 4.5 4.5 0 000 9" />
    </svg>
  ),
  'idea-reality-mcp': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
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
        className="group relative flex h-full flex-col gap-3 rounded-[var(--radius-lg)] border border-border-light bg-bg-card p-6 transition-[transform,box-shadow] duration-500 overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transitionTimingFunction: 'var(--ease-out-expo)',
        }}
      >
        {/* Left accent line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{ backgroundColor: STATUS_COLORS[product.status] }}
        />

        {/* Hover gradient border glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[var(--radius-lg)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(135deg, rgba(200,165,92,0.25), transparent 60%, rgba(200,165,92,0.15))',
            zIndex: -1,
          }}
        />

        {/* Icon */}
        <div className="text-text-tertiary mb-1">
          {PRODUCT_ICONS[product.name]}
        </div>

        {/* Name + Description */}
        <h3 className="font-sans text-base font-bold text-text-primary leading-snug">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">{product.description}</p>

        {/* Status pill badge */}
        <div className="flex items-center gap-2 mt-1">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{
              backgroundColor: STATUS_BG[product.status],
              color: STATUS_COLORS[product.status],
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: STATUS_COLORS[product.status] }}
            />
            {product.status}
          </span>
        </div>

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
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300"
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
