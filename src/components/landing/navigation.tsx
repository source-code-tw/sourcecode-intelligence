"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const navLinks = [
  { name: "服務", href: "#services" },
  { name: "實績", href: "#portfolio" },
  { name: "方法論", href: "#methodology" },
  { name: "團隊", href: "#team" },
  { name: "加入我們", href: "#careers" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(`#${currentSection}`);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-foreground"
      >
        跳到主要內容
      </a>

      <header
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled 
            ? "top-4 left-4 right-4" 
            : "top-0 left-0 right-0"
        }`}
        role="banner"
      >
        <nav 
          className={`mx-auto transition-all duration-500 ${
            isScrolled || isMobileMenuOpen
              ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
              : "bg-transparent max-w-[1400px]"
          }`}
          role="navigation"
          aria-label="主要導航"
        >
          <div 
            className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
              isScrolled ? "h-14" : "h-20"
            }`}
          >
            {/* Logo */}
            <a 
              href="#" 
              className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 rounded-sm"
              aria-label="原始碼智慧 - 回到首頁"
              onClick={(e) => scrollToSection(e, '#hero')}
            >
              <Logo size={isScrolled ? "sm" : "md"} />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10" role="menubar">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-sm transition-colors duration-300 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 rounded-sm ${
                    activeSection === link.href 
                      ? 'text-foreground' 
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  role="menuitem"
                  aria-current={activeSection === link.href ? 'page' : undefined}
                >
                  {link.name}
                  <span 
                    className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                      activeSection === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                size="sm"
                className={`bg-foreground hover:bg-foreground/90 text-background rounded-full transition-all duration-500 focus-visible:ring-2 focus-visible:ring-offset-2 ${isScrolled ? "px-4 h-8 text-xs" : "px-6"}`}
                asChild
              >
                <a 
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                >
                  聯絡我們
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 rounded-md"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "關閉選單" : "開啟選單"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
        
        {/* Mobile Menu - Full Screen Overlay */}
        <div
          id="mobile-menu"
          className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
            isMobileMenuOpen 
              ? "opacity-100 pointer-events-auto" 
              : "opacity-0 pointer-events-none"
          }`}
          style={{ top: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="行動裝置導航選單"
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="flex flex-col h-full px-8 pt-28 pb-8">
            {/* Navigation Links */}
            <nav 
              className="flex-1 flex flex-col justify-center gap-8"
              role="navigation"
              aria-label="行動裝置導航"
            >
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-4xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 focus:outline-none focus-visible:underline ${
                    isMobileMenuOpen 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            
            {/* Bottom CTAs */}
            <div 
              className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
                isMobileMenuOpen 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
            >
              <Button 
                className="flex-1 bg-foreground text-background rounded-full h-14 text-base"
                asChild
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <a 
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                >
                  聯絡我們
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
