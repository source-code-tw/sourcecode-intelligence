'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: '產品', href: '#products' },
  { label: '方法論', href: '#methodology' },
  { label: '團隊', href: '#team' },
  { label: '招募', href: '#careers' },
  { label: '聯絡', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);
      setVisible(currentY < lastScrollY.current || currentY < 80);
      lastScrollY.current = currentY;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[10000] transition-colors duration-300 ${
          scrolled
            ? 'bg-bg-primary/80 backdrop-blur-md border-b border-border-light'
            : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'py-3 px-6' : 'py-5 px-8'
          }`}
          style={{ maxWidth: 'var(--container-max)' }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <span className="font-display text-xl font-bold tracking-tight text-text-primary">
              SCI
            </span>
            <span className="hidden md:inline font-sans text-body-sm text-text-tertiary border-l border-border-medium pl-3">
              SourceCode Intelligence
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-body-sm text-text-secondary hover:text-text-primary transition-colors duration-200 py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-sans text-body-sm font-medium px-6 py-3 rounded-full bg-text-primary text-bg-primary hover:opacity-80 transition-colors duration-200"
            >
              開始合作
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="absolute w-5 h-[1.5px] bg-text-primary rounded-full"
              animate={{
                rotate: mobileOpen ? 45 : 0,
                y: mobileOpen ? 0 : -4,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute w-5 h-[1.5px] bg-text-primary rounded-full"
              animate={{
                opacity: mobileOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute w-5 h-[1.5px] bg-text-primary rounded-full"
              animate={{
                rotate: mobileOpen ? -45 : 0,
                y: mobileOpen ? 0 : 4,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-bg-primary flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="font-display text-display-sm text-text-primary"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="mt-4 font-sans text-body-md font-medium px-8 py-3 rounded-full bg-text-primary text-bg-primary hover:opacity-80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: navLinks.length * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => setMobileOpen(false)}
            >
              開始合作
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
