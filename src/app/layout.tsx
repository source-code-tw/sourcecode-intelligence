import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Noto_Sans_TC, Space_Mono, Syne } from 'next/font/google'
import { SmoothScroll } from '@/components/SmoothScroll'
import { CustomCursor } from '@/components/CustomCursor'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
})

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '原始碼智慧 | SourceCode Intelligence',
  description: 'AI-Native Product Studio — 用 AI Agent 團隊以天為單位交付產品',
  openGraph: {
    title: '原始碼智慧 | SourceCode Intelligence',
    description: 'AI-Native Product Studio — 用 AI Agent 團隊以天為單位交付產品',
    locale: 'zh_TW',
    type: 'website',
    siteName: 'SourceCode Intelligence',
  },
  twitter: {
    card: 'summary_large_image',
    title: '原始碼智慧 | SourceCode Intelligence',
    description: 'AI-Native Product Studio — 用 AI Agent 團隊以天為單位交付產品',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A08',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${spaceGrotesk.variable} ${notoSansTC.variable} ${spaceMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
