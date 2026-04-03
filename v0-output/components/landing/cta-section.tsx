"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section id="careers" ref={sectionRef} className="relative py-24 lg:py-32 bg-foreground text-background overflow-hidden">
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6">
            <span className="w-8 h-px bg-background/30" />
            加入我們
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            我們在找和 AI 一起工作的
            <br />
            <span className="text-background/50">下一代工程師</span>
          </h2>
        </div>

        {/* Job Card */}
        <div
          className={`relative border border-background/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1), transparent 40%)`
            }}
          />
          
          <div className="relative z-10 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Job Info */}
              <div>
                <h3 className="text-3xl lg:text-4xl font-display mb-4">AI 應用開發工程師</h3>
                <div className="flex flex-wrap gap-4 mb-8 text-sm">
                  <span className="px-3 py-1 border border-background/20">月薪 NT$50,000 - 80,000 + 專案結案獎金</span>
                  <span className="px-3 py-1 border border-background/20">台北辦公室</span>
                  <span className="px-3 py-1 border border-background/20">兼職/全職皆可</span>
                </div>

                <div className="mb-8">
                  <h4 className="font-medium mb-4 text-background/80">職責</h4>
                  <ul className="space-y-2 text-background/60">
                    <li className="flex items-start gap-2">
                      <span className="text-background/40">·</span>
                      使用 Claude Code、Cursor 等 AI 工具進行產品全程開發
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-background/40">·</span>
                      以極速節奏交付可運行的 Web/App 產品（小型專案 2-5 天內完成初版）
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-background/40">·</span>
                      與 CTO 密切協作，獨立負責模組或完整專案
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right: Requirements */}
              <div>
                <div className="mb-8">
                  <h4 className="font-medium mb-4 text-background/80">條件</h4>
                  <ul className="space-y-2 text-background/60">
                    <li className="flex items-start gap-2">
                      <span className="text-background/40">·</span>
                      熟悉至少一種 AI 輔助開發工具，有實際專案產出
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-background/40">·</span>
                      具備 Web 開發能力（React/Next.js 或 Python）
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-background/40">·</span>
                      {"認同「AI 優先」的開發理念"}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-background/40">·</span>
                      可到台北辦公室上班
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="font-medium mb-4 text-background/80">加分</h4>
                  <ul className="space-y-2 text-background/60">
                    <li className="flex items-start gap-2">
                      <span className="text-background/40">·</span>
                      有 Claude Code / Cursor 完整專案經驗
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-background/40">·</span>
                      有個人 side project 或開源貢獻
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-background/40">·</span>
                      熟悉 Flutter 跨平台開發
                    </li>
                  </ul>
                </div>

                <Button
                  size="lg"
                  className="bg-background hover:bg-background/90 text-foreground px-8 h-14 text-base rounded-full group"
                  asChild
                >
                  <a href="mailto:dev@mnemox.ai">
                    投遞履歷
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>

            <p className="text-sm text-background/40 mt-8 font-mono">
              作品不用完美，重點是你有在用 AI 做東西，而且做得出來。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
