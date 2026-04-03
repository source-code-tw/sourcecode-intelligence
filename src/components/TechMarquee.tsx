'use client';

/* ──────────────────────────────────────────
   Tech Stack Marquee — infinite scroll
   ────────────────────────────────────────── */

const row1 = [
  'Claude Code',
  'Cursor',
  'Next.js',
  'Flutter',
  'Supabase',
  'Vercel',
  'Python',
  'TypeScript',
];

const row2 = [
  'MT5/MQL5',
  'PostgreSQL',
  'Docker',
  'GitHub Actions',
  'Framer Motion',
  'Tailwind CSS',
  'Three.js',
  'React',
];

function MarqueePill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-5 py-2 rounded-full border border-border-light font-mono text-sm text-text-secondary whitespace-nowrap transition-colors duration-300 hover:text-accent-gold hover:border-accent-gold/40 select-none">
      {label}
    </span>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  // Double items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden group">
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{
          background:
            'linear-gradient(to right, var(--bg-primary), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{
          background:
            'linear-gradient(to left, var(--bg-primary), transparent)',
        }}
      />

      <div
        className="marquee-track gap-4"
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
          animationDuration: '35s',
        }}
      >
        {doubled.map((item, i) => (
          <MarqueePill key={`${item}-${i}`} label={item} />
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section className="py-16 border-t border-b border-border-light overflow-hidden">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-padding)] mb-8">
        <p className="text-caption text-text-secondary tracking-widest">
          我們的技術武器庫
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
