"use client";

import { useEffect, useState, useRef } from "react";

const techCategories = [
  { category: "前端", techs: "Next.js · React · Flutter" },
  { category: "後端", techs: "Supabase · Python · Node.js" },
  { category: "AI", techs: "Claude Code · Cursor · MCP Protocol" },
  { category: "部署", techs: "Vercel · Docker · GitHub Actions" },
  { category: "資料庫", techs: "PostgreSQL · Supabase" },
  { category: "其他", techs: "MT5/MQL5 · LINE API" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              技術能力
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              全端技術覆蓋。
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              從前端到後端，從 AI 到量化交易，我們的技術棧覆蓋完整產品生命週期。
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">10+</div>
                <div className="text-sm text-muted-foreground">技術框架</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">5天</div>
                <div className="text-sm text-muted-foreground">MVP 交付</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">100%</div>
                <div className="text-sm text-muted-foreground">AI-Native</div>
              </div>
            </div>
          </div>

          {/* Right: Tech categories table */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Header */}
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">Tech Stack</span>
                <span className="flex items-center gap-2 text-xs font-mono text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Production ready
                </span>
              </div>

              {/* Tech categories */}
              <div>
                {techCategories.map((item, index) => (
                  <div
                    key={item.category}
                    className={`px-6 py-5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      index === 0 ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-2 h-2 rounded-full bg-foreground/20" />
                      <div className="font-medium w-20">{item.category}</div>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">{item.techs}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
