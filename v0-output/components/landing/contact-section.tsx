"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ContactSection() {
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
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            聯絡我們
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            有產品想法？
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
            不管是一個模糊的概念，還是完整的需求文件，我們都能幫你實現。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Contact Form */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  名字
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-transparent border border-foreground/20 focus:border-foreground/50 focus:outline-none transition-colors"
                  placeholder="你的名字"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-transparent border border-foreground/20 focus:border-foreground/50 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  簡述你的需求
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-transparent border border-foreground/20 focus:border-foreground/50 focus:outline-none transition-colors resize-none"
                  placeholder="告訴我們你想做什麼..."
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"
              >
                送出
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-mono text-muted-foreground mb-2">Email</h3>
                <a 
                  href="mailto:dev@mnemox.ai" 
                  className="text-xl hover:text-muted-foreground transition-colors"
                >
                  dev@mnemox.ai
                </a>
              </div>
              <div>
                <h3 className="text-sm font-mono text-muted-foreground mb-2">GitHub</h3>
                <a 
                  href="https://github.com/zychenpeng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl hover:text-muted-foreground transition-colors"
                >
                  github.com/zychenpeng
                </a>
              </div>
              <div>
                <h3 className="text-sm font-mono text-muted-foreground mb-2">地點</h3>
                <p className="text-xl">台灣台北</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
