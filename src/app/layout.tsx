import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
})

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
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
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansTC.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  )
}
