"use client";

import { useEffect, useRef, useState } from "react";

const team = [
  {
    name: "Kevin Chen",
    role: "CEO & Co-Founder",
    description: "連續創業者，10 年以上企業營運與商業開發經驗。專精 B2B 銷售策略、客戶成功管理與跨產業資源整合。負責公司整體營運方向、資金規劃與市場拓展。",
  },
  {
    name: "Sean Peng",
    role: "CTO & Co-Founder",
    description: "全端技術架構師，深耕 AI-Native 開發流程。擅長以 Claude Code、Cursor 等 AI 工具驅動產品開發，同時管理多條產品線。7 年量化交易系統開發經驗，橫跨 Web、Mobile、MQL5 多技術領域。",
  },
];

export function PricingSection() {
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
    <section id="team" ref={sectionRef} className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
            團隊
          </span>
          <h2 className={`font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            創辦團隊
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            以 AI-Native 方法打造產品的創辦團隊
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`p-8 lg:p-10 border border-foreground/10 transition-all duration-700 hover:border-foreground/30 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-1">{member.name}</h3>
                <p className="text-sm font-mono text-muted-foreground">{member.role}</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        {/* AI Team Note */}
        <p className={`text-center text-sm text-muted-foreground font-mono transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          + AI Agent 團隊（Claude Code · Cursor）全天候協作
        </p>
      </div>
    </section>
  );
}
