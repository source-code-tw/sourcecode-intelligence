const METRICS = [
  { value: '8+', label: '產品線', brand: 'PORTFOLIO' },
  { value: '3', label: 'AI Agents', brand: 'WORKFORCE' },
  { value: '5天', label: '平均交付', brand: 'VELOCITY' },
  { value: '24/7', label: 'AI 不休息', brand: 'UPTIME' },
  { value: '1', label: '開源套件', brand: 'OPEN SOURCE' },
];

function MetricItem({ value, label, brand }: (typeof METRICS)[number]) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-6 bg-white min-w-[200px]">
      <span className="metric-value text-gray-950">{value}</span>
      <span className="text-sm font-medium text-gray-500 mt-2">{label}</span>
      <span className="text-[0.625rem] font-semibold text-gray-400 tracking-wider uppercase mt-2">
        {brand}
      </span>
    </div>
  );
}

export default function Stats() {
  /* Duplicate items for seamless loop */
  const doubled = [...METRICS, ...METRICS];

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-optimus">
        {/* Grid variant: static metrics with 1px border dividers */}
        <div
          className="hidden md:grid overflow-hidden rounded-xl border border-gray-200"
          style={{
            gridTemplateColumns: `repeat(${METRICS.length}, 1fr)`,
            gap: 0,
            background: 'var(--optimus-gray-200)',
          }}
        >
          {METRICS.map((m) => (
            <MetricItem key={m.label} {...m} />
          ))}
        </div>

        {/* Mobile: horizontal scrolling marquee */}
        <div className="md:hidden overflow-hidden rounded-xl border border-gray-200">
          <div className="flex animate-marquee-left" style={{ width: 'max-content' }}>
            {doubled.map((m, i) => (
              <MetricItem key={`${m.label}-${i}`} {...m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
