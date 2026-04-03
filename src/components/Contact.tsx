'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';

const CONTACT_INFO = [
  {
    label: 'Email',
    value: 'dev@mnemox.ai',
    href: 'mailto:dev@mnemox.ai',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/zychenpeng',
    href: 'https://github.com/zychenpeng',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2C5.58 2 2 5.58 2 10c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0018 10c0-4.42-3.58-8-8-8z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: '台灣',
    href: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 18s6-4.35 6-9A6 6 0 004 9c0 4.65 6 9 6 9z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.25);
      y.set((e.clientY - cy) * 0.25);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      type="submit"
      className="font-sans text-body-sm font-medium px-8 py-3.5 rounded-full transition-colors duration-200 cursor-pointer"
      style={{
        x,
        y,
        background: 'var(--accent-gold)',
        color: '#fff',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section
      id="contact"
      className="w-full"
      style={{ paddingBlock: 'var(--section-gap)' }}
    >
      <div
        ref={ref}
        className="mx-auto"
        style={{
          maxWidth: 'var(--container-max)',
          paddingInline: 'var(--container-padding)',
        }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-display-md font-display gradient-text mb-4">
            開始合作
          </h2>
          <p className="text-body-lg text-text-secondary max-w-xl mx-auto">
            有產品想法？需要技術夥伴？讓我們聊聊。
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <motion.form
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="你的名字"
                className="w-full bg-transparent font-sans text-body-md text-text-primary pb-3 border-b-[1.5px] outline-none transition-colors duration-300 placeholder:text-text-quaternary"
                style={{
                  borderColor:
                    focused === 'name'
                      ? 'var(--accent-gold)'
                      : 'var(--border-light)',
                }}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="電子郵件"
                className="w-full bg-transparent font-sans text-body-md text-text-primary pb-3 border-b-[1.5px] outline-none transition-colors duration-300 placeholder:text-text-quaternary"
                style={{
                  borderColor:
                    focused === 'email'
                      ? 'var(--accent-gold)'
                      : 'var(--border-light)',
                }}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                name="message"
                placeholder="想聊什麼？"
                rows={4}
                className="w-full bg-transparent font-sans text-body-md text-text-primary pb-3 border-b-[1.5px] outline-none transition-colors duration-300 placeholder:text-text-quaternary resize-none"
                style={{
                  borderColor:
                    focused === 'message'
                      ? 'var(--accent-gold)'
                      : 'var(--border-light)',
                }}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <div>
              <MagneticButton>送出訊息</MagneticButton>
            </div>
          </motion.form>

          {/* Contact info */}
          <motion.div
            className="flex flex-col gap-8 lg:pt-2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {CONTACT_INFO.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="text-accent-gold mt-0.5">{item.icon}</span>
                <div>
                  <span className="text-caption text-text-tertiary block mb-1">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-body-md text-text-primary hover:text-accent-gold transition-colors duration-200"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-body-md text-text-primary">{item.value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
