"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="hero"
      aria-label="原始碼智慧 - AI-Native 軟體開發工作室首頁"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Hidden SEO content for AI crawlers */}
      <div className="sr-only">
        <h1>原始碼智慧股份有限公司 - SourceCode Intelligence</h1>
        <p>
          原始碼智慧是台灣領先的 AI-Native 軟體開發工作室。我們使用 Claude Code、Cursor 等 AI Agent 作為核心生產力，
          能在 5 天內交付 MVP，專精於 SaaS 開發、Mobile App、AI 應用整合與客製化軟體。
          我們的服務包括：SaaS 平台開發、跨平台行動應用開發（Flutter）、AI 應用整合（GPT、Claude API、MCP 協議）、
          以及客製化軟體開發（ERP、CRM、內部工具）。
          聯絡方式：Email - ArcTeaOffice@gmail.com，GitHub - github.com/ArcTeaOffice，地址 - 106臺北市大安區市民大道三段198號。
        </p>
      </div>
      {/* Animated sphere background */}
      <div className="absolute right-[-100px] lg:right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] xl:w-[800px] xl:h-[800px] opacity-50 pointer-events-none z-0">
        <AnimatedSphere />
      </div>
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        {/* Eyebrow */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            AI-Native Product Studio
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-12">
          <h1 
            className={`text-[clamp(3rem,10vw,8rem)] font-display leading-[0.9] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">從概念到產品</span>
            <span className="block text-muted-foreground">以天為單位交付。</span>
          </h1>
        </div>
        
        {/* Description */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <p 
            className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            我們是 AI-Native 開發團隊，用 AI Agent 作為核心生產力。不是用 AI 輔助開發，是讓 AI 驅動整個產品生命週期。
          </p>
          
          {/* CTAs */}
          <div 
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button 
              size="lg" 
              className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"
              asChild
            >
              <a href="#services">
                了解我們的服務
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5"
              asChild
            >
              <a href="#contact">聯絡我們</a>
            </Button>
          </div>
        </div>
        
      </div>
      
      {/* Stats marquee - full width outside container */}
      <div 
        className={`absolute bottom-24 left-0 right-0 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-16 marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {[
                { value: "5天", label: "平均交付", company: "VELOCITY" },
                { value: "10+", label: "技術框架", company: "TECH STACK" },
                { value: "24/7", label: "AI 不休息", company: "UPTIME" },
                { value: "2", label: "已發布開源套件", company: "OPEN SOURCE" },
              ].map((stat) => (
                <div key={`${stat.company}-${i}`} className="flex items-baseline gap-4">
                  <span className="text-4xl lg:text-5xl font-display">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                    <span className="block font-mono text-xs mt-1">{stat.company}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
