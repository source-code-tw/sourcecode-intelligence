'use client';

import { motion } from 'framer-motion';

const FOOTER_LINKS = [
  { label: '產品', href: '#products' },
  { label: '方法論', href: '#methodology' },
  { label: '團隊', href: '#team' },
  { label: '招募', href: '#careers' },
];

export default function Footer() {
  return (
    <footer className="w-full py-16 md:py-20">
      {/* Gradient top border */}
      <div
        className="mx-auto h-px mb-12"
        style={{
          maxWidth: 'var(--container-max)',
          background:
            'linear-gradient(90deg, transparent 0%, var(--accent-gold) 50%, transparent 100%)',
          opacity: 0.3,
        }}
      />

      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start"
        style={{
          maxWidth: 'var(--container-max)',
          paddingInline: 'var(--container-padding)',
        }}
      >
        {/* Left — Logo + description */}
        <motion.div
          className="flex flex-col gap-3 text-center md:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-display-sm font-display text-text-primary tracking-tight">
            SCI
          </span>
          <p className="text-body-sm text-text-tertiary leading-relaxed">
            AI 驅動的軟體開發公司，從概念到產品的全程技術夥伴。
          </p>
          <p className="text-body-sm text-text-quaternary mt-1">
            &copy; 2026 原始碼智慧股份有限公司
          </p>
        </motion.div>

        {/* Center links */}
        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors duration-200 py-2"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Right */}
        <motion.p
          className="text-body-sm text-text-quaternary text-center md:text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Built with AI. Powered by humans.
        </motion.p>
      </div>
    </footer>
  );
}
