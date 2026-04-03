"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "SaaS 平台開發",
    description: "企業級 Web 應用。管理後台、儀表板、訂閱制系統。",
    tech: "Next.js · Supabase · Vercel",
    visual: "saas",
  },
  {
    number: "02",
    title: "Mobile App 開發",
    description: "跨平台行動應用。iOS + Android 一次搞定。",
    tech: "Flutter · Firebase",
    visual: "mobile",
  },
  {
    number: "03",
    title: "AI 應用整合",
    description: "LINE Bot、Chatbot、AI 工作流自動化。串接 LLM API，打造智慧應用。",
    tech: "Python · Claude API · MCP",
    visual: "ai",
  },
  {
    number: "04",
    title: "客製化軟體開發",
    description: "任何你能想到的軟體需求。交易系統、資料分析、爬蟲、自動化工具。",
    tech: "依需求配置",
    visual: "custom",
  },
];

function SaaSVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <defs>
        <clipPath id="saasClip">
          <rect x="30" y="20" width="140" height="120" rx="4" />
        </clipPath>
      </defs>
      
      {/* Container */}
      <rect x="30" y="20" width="140" height="120" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      
      {/* Dashboard grid */}
      <g clipPath="url(#saasClip)">
        <rect x="40" y="30" width="55" height="40" rx="2" fill="currentColor" opacity="0.1">
          <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="105" y="30" width="55" height="40" rx="2" fill="currentColor" opacity="0.15">
          <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" begin="0.3s" repeatCount="indefinite" />
        </rect>
        <rect x="40" y="80" width="120" height="50" rx="2" fill="currentColor" opacity="0.08">
          <animate attributeName="opacity" values="0.08;0.2;0.08" dur="2s" begin="0.6s" repeatCount="indefinite" />
        </rect>
      </g>
    </svg>
  );
}

function MobileVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Phone frame */}
      <rect x="70" y="10" width="60" height="140" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
      
      {/* Screen */}
      <rect x="75" y="25" width="50" height="110" rx="2" fill="currentColor" opacity="0.05" />
      
      {/* App content */}
      <rect x="80" y="35" width="40" height="8" rx="1" fill="currentColor" opacity="0.2">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite" />
      </rect>
      <rect x="80" y="50" width="40" height="30" rx="2" fill="currentColor" opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur="1.5s" begin="0.2s" repeatCount="indefinite" />
      </rect>
      <rect x="80" y="90" width="40" height="8" rx="1" fill="currentColor" opacity="0.2">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" begin="0.4s" repeatCount="indefinite" />
      </rect>
      <rect x="80" y="105" width="40" height="20" rx="2" fill="currentColor" opacity="0.1">
        <animate attributeName="opacity" values="0.1;0.3;0.1" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
      </rect>
      
      {/* Notch */}
      <rect x="90" y="15" width="20" height="4" rx="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function AIVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Central node */}
      <circle cx="100" cy="80" r="12" fill="currentColor">
        <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Orbiting nodes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const radius = 50;
        return (
          <g key={i}>
            {/* Connection line */}
            <line
              x1="100"
              y1="80"
              x2={100 + Math.cos(angle) * radius}
              y2={80 + Math.sin(angle) * radius}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </line>
            
            {/* Outer node */}
            <circle
              cx={100 + Math.cos(angle) * radius}
              cy={80 + Math.sin(angle) * radius}
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <animate
                attributeName="r"
                values="6;8;6"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
      
      {/* Pulse rings */}
      <circle cx="100" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="20;60" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function CustomVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Gear 1 */}
      <g transform="translate(70, 60)">
        <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="2">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="8" fill="currentColor" opacity="0.3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={angle}
            x="-4"
            y="-28"
            width="8"
            height="10"
            fill="currentColor"
            transform={`rotate(${angle})`}
          >
            <animateTransform attributeName="transform" type="rotate" from={`${angle}`} to={`${angle + 360}`} dur="8s" repeatCount="indefinite" />
          </rect>
        ))}
      </g>
      
      {/* Gear 2 */}
      <g transform="translate(130, 100)">
        <circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" strokeWidth="2">
          <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="5" fill="currentColor" opacity="0.3" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <rect
            key={angle}
            x="-3"
            y="-21"
            width="6"
            height="8"
            fill="currentColor"
            transform={`rotate(${angle})`}
          >
            <animateTransform attributeName="transform" type="rotate" from={`${angle + 360}`} to={`${angle}`} dur="6s" repeatCount="indefinite" />
          </rect>
        ))}
      </g>
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "saas":
      return <SaaSVisual />;
    case "mobile":
      return <MobileVisual />;
    case "ai":
      return <AIVisual />;
    case "custom":
      return <CustomVisual />;
    default:
      return <SaaSVisual />;
  }
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-foreground/10">
        {/* Number */}
        <div className="shrink-0">
          <span className="font-mono text-sm text-muted-foreground">{feature.number}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {feature.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {feature.description}
            </p>
            <p className="text-sm font-mono text-muted-foreground">
              {feature.tech}
            </p>
          </div>
          
          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-40 text-foreground">
              <AnimatedVisual type={feature.visual} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            服務項目
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            我們能打造什麼
            <br />
            <span className="text-muted-foreground">你的想法，我們實現。</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
            從 Web 平台到 Mobile App，從 AI 應用到量化交易系統，全端技術覆蓋。
          </p>
        </div>

        {/* Features List */}
        <div>
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
