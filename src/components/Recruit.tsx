const REQUIREMENTS = [
  '熟悉 TypeScript / Python',
  '有 AI 工具（Claude Code、Cursor 等）使用經驗',
  '對產品開發有熱情',
  '能獨立思考與解決問題',
]

export default function Recruit() {
  return (
    <section id="careers" className="bg-section-dark section-padding">
      <div className="container-optimus relative z-10">
        <p className="section-label section-label-dark mb-6">招募</p>
        <h2 className="text-section-title mb-16">
          <span className="text-white">加入我們</span>
        </h2>

        <div className="max-w-2xl bg-gray-900 rounded-2xl border border-gray-800 p-8 md:p-10">
          {/* Position header */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white">
              AI 應用開發工程師
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              NT$50,000 - 80,000/月
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gray-800 mb-6" />

          {/* Requirements */}
          <h4 className="text-xs font-medium tracking-wider text-gray-500 uppercase mb-4">
            Requirements
          </h4>
          <ul className="space-y-3 mb-8">
            {REQUIREMENTS.map((req) => (
              <li key={req} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                {req}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="mailto:dev@mnemox.ai?subject=AI 應用開發工程師 — 履歷投遞"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            投遞履歷
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
