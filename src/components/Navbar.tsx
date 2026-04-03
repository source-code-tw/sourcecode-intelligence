'use client'

import { useState, useEffect, useCallback } from 'react'

const NAV_LINKS = [
  { label: '產品', href: '#products' },
  { label: '方法論', href: '#methodology' },
  { label: '團隊', href: '#team' },
  { label: '招募', href: '#careers' },
  { label: '聯絡', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <nav className={`navbar-glass transition-all duration-200 ${scrolled ? 'scrolled' : ''}`}>
        <div className="container-optimus h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-base font-semibold text-gray-950">
            原始碼智慧
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-optimus-primary text-sm">
              開始合作
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`absolute w-5 h-[1.5px] bg-gray-950 rounded-full transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'
              }`}
            />
            <span
              className={`absolute w-5 h-[1.5px] bg-gray-950 rounded-full transition-opacity duration-200 ${
                mobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute w-5 h-[1.5px] bg-gray-950 rounded-full transition-all duration-300 ${
                mobileOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-2xl font-semibold text-gray-950"
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="mt-4 btn-optimus-primary"
          onClick={() => setMobileOpen(false)}
        >
          開始合作
        </a>
      </div>
    </>
  )
}
