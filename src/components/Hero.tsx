export default function Hero() {
  return (
    <section className="relative pt-[calc(64px+clamp(4rem,10vw,8rem))] pb-section-padding text-center">
      <div className="noise-overlay" />

      <div className="container-optimus relative z-10">
        <p className="section-label mb-6">AI-Native Product Studio</p>

        <h1 className="text-hero text-balance mb-6">
          <span className="block">用 AI 重新定義</span>
          <span className="block text-gray-400">軟體開發的速度</span>
        </h1>

        <p className="text-body-muted max-w-[600px] mx-auto mb-10">
          3 位 AI Agent + 2 位人類，以天為單位交付世界級產品
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#products" className="btn-optimus-primary">
            探索產品 →
          </a>
          <a href="#methodology" className="btn-optimus-secondary">
            了解更多
          </a>
        </div>
      </div>
    </section>
  )
}
