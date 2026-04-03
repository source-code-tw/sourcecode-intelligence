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
    <footer className="w-full" style={{ paddingBottom: '2rem' }}>
      {/* Gradient top border */}
      <div
        className="mx-auto h-px mb-8"
        style={{
          maxWidth: 'var(--container-max)',
          background:
            'linear-gradient(90deg, transparent 0%, var(--accent-gold) 50%, transparent 100%)',
          opacity: 0.3,
        }}
      />

      <div
        className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        style={{
          maxWidth: 'var(--container-max)',
          paddingInline: 'var(--container-padding)',
        }}
      >
        {/* Left */}
        <motion.p
          className="text-body-sm text-text-tertiary text-center md:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          &copy; 2026 原始碼智慧股份有限公司
        </motion.p>

        {/* Center links */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors duration-200"
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
