"use client";

import { useEffect, useRef, useState } from "react";

const team = [
  {
    name: "Sean Peng",
    role: "CTO & Co-Founder",
    description: "AI-Native 產品架構師。Claude Max 重度使用者，同時管理多條產品線。擅長用 AI Agent 做為核心生產力，以天為單位交付。",
  },
  {
    name: "Co-Founder",
    role: "CEO",
    description: "資金營運行銷，商業策略。負責客戶拓展與市場推廣。",
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
