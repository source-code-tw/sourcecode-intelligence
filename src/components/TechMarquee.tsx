const row1 = [
  'Claude Code',
  'Cursor',
  'Next.js',
  'Flutter',
  'Supabase',
  'Vercel',
  'Python',
  'TypeScript',
]

const row2 = [
  'MT5/MQL5',
  'PostgreSQL',
  'Docker',
  'GitHub Actions',
  'Tailwind CSS',
  'React',
  'Node.js',
  'Playwright',
]

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const text = items.join(' · ')
  // Repeat enough for seamless loop
  const repeated = `${text} · ${text} · ${text} · `

  return (
    <div className="overflow-hidden">
      <div
        className={`flex whitespace-nowrap font-mono text-sm text-gray-400 ${
          reverse ? 'animate-marquee-right' : 'animate-marquee-left'
        }`}
      >
        <span className="pr-4">{repeated}</span>
        <span className="pr-4">{repeated}</span>
      </div>
    </div>
  )
}

export default function TechMarquee() {
  return (
    <section className="py-8 border-t border-b border-gray-200 overflow-hidden">
      <div className="flex flex-col gap-3">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  )
}
