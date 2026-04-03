const STEPS = [
  {
    numeral: 'I',
    title: '需求定義',
    description: 'CEO 定義方向，AI 驗證市場。在寫第一行 code 前，先確認這件事值得做。',
  },
  {
    numeral: 'II',
    title: '架構開發',
    description: 'CTO 架構設計，3 AI Agents 平行開發不同模組。24/7 不間斷。',
  },
  {
    numeral: 'III',
    title: '交付上線',
    description: '自動測試部署，以天為單位迭代。不是月，是天。',
  },
];

const CODE_BLOCK = `// deploy.ts
import { agents } from "@sourcecode/core";

const pipeline = agents.create({
  architect: "claude-opus",
  developers: 3,
  qa: "automated",
});

await pipeline.deploy({
  target: "production",
  tests: true,
  monitoring: true,
});

// Average time: 5 days
console.log("shipped.");`;

export default function HowWeWork() {
  return (
    <section className="bg-section-dark section-padding">
      <div className="container-optimus relative z-10">
        {/* Section header */}
        <p className="section-label section-label-dark mb-6">方法論</p>
        <h2 className="text-section-title mb-16">
          <span className="text-white">三個步驟。</span>
          <br />
          <span className="text-gray-400">無限可能。</span>
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Steps */}
          <div>
            {STEPS.map((step, i) => (
              <div
                key={step.numeral}
                className={`py-8 ${i < STEPS.length - 1 ? 'border-b border-gray-800' : ''}`}
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-sm font-semibold text-gray-500 min-w-[2rem]">
                    {step.numeral}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Code block */}
          <div className="rounded-xl border border-gray-800 bg-gray-950 overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
              <span className="w-3 h-3 rounded-full bg-gray-700" />
              <span className="w-3 h-3 rounded-full bg-gray-700" />
              <span className="w-3 h-3 rounded-full bg-gray-700" />
              <span className="ml-3 text-xs text-gray-500 font-mono">deploy.ts</span>
            </div>
            {/* Code */}
            <pre className="p-5 overflow-x-auto text-sm leading-relaxed font-mono text-gray-300">
              <code>{CODE_BLOCK}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
