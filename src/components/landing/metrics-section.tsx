"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    name: "idea-reality-mcp",
    tagline: "Pre-build 市場驗證工具",
    description: "在寫第一行 code 前，用 AI 掃描市場確認你的點子是否值得做",
    badges: ["已發布在 PyPI", "GitHub 開源", "MCP Protocol"],
    links: [
      { label: "GitHub", href: "https://github.com/mnemox-ai/idea-reality-mcp" },
      { label: "PyPI", href: "https://pypi.org/project/idea-reality-mcp/" },
    ],
  },
  {
    name: "TradeMemory Protocol",
    tagline: "交易記憶 MCP Server",
    description: "讓 AI Agent 記住每一筆交易的決策脈絡，用記憶進化策略",
    badges: ["已發布", "1,293 tests", "OWM 記憶架構"],
    links: [
      { label: "GitHub", href: "https://github.com/mnemox-ai/tradememory-protocol" },
      { label: "文件", href: "https://github.com/mnemox-ai/tradememory-protocol#readme" },
    ],
  },
];

export function MetricsSection() {
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
    <section id="portfolio" ref={sectionRef} className="relative py-24 lg:py-32 border-y border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            實績
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            已交付的成果。
          </h2>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className={`border border-foreground/10 p-8 lg:p-10 transition-all duration-700 hover:border-foreground/30 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                <h3 className="text-2xl lg:text-3xl font-display mb-2">{project.name}</h3>
                <p className="text-lg text-foreground/80">{project.tagline}</p>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 text-xs font-mono bg-foreground/5 text-foreground/70 border border-foreground/10"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                {project.links.map((link) => (
                  <Button
                    key={link.label}
                    variant="outline"
                    size="sm"
                    className="rounded-full border-foreground/20 hover:bg-foreground/5"
                    asChild
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
