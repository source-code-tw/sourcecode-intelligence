import React from "react"
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://sourcecode-intelligence.vercel.app'),
  title: {
    default: '原始碼智慧 SourceCode Intelligence | AI-Native 軟體開發工作室',
    template: '%s | 原始碼智慧'
  },
  description: '原始碼智慧是台灣領先的 AI-Native 軟體開發工作室。我們用 Claude Code、Cursor 等 AI Agent 作為核心生產力，5天內交付 MVP，專精 SaaS、Mobile App、AI 應用整合與客製化軟體開發。',
  keywords: [
    '原始碼智慧',
    'SourceCode Intelligence',
    'AI 軟體開發',
    'AI-Native 開發',
    'SaaS 開發',
    'Mobile App 開發',
    'AI 應用整合',
    '客製化軟體',
    'MVP 開發',
    '快速軟體開發',
    'Claude Code',
    'Cursor AI',
    'Next.js 開發',
    'Flutter 開發',
    '台灣軟體公司',
    '新創技術夥伴',
    'AI Agent 開發',
    'MCP 協議',
  ],
  authors: [{ name: '原始碼智慧股份有限公司', url: 'https://sourcecode-intelligence.vercel.app' }],
  creator: '原始碼智慧股份有限公司',
  publisher: '原始碼智慧股份有限公司',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'technology',
  classification: 'Software Development',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    alternateLocale: 'en_US',
    url: 'https://sourcecode-intelligence.vercel.app',
    siteName: '原始碼智慧 SourceCode Intelligence',
    title: '原始碼智慧 | AI-Native 軟體開發工作室 - 5天交付 MVP',
    description: '我們是 AI-Native 開發團隊，用 AI Agent 作為核心生產力。從概念到產品，以天為單位交付。專精 SaaS、Mobile App、AI 應用整合。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '原始碼智慧 - AI-Native Product Studio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '原始碼智慧 | AI-Native 軟體開發工作室',
    description: '用 AI Agent 作為核心生產力，5天內交付 MVP。專精 SaaS、Mobile App、AI 應用整合與客製化軟體開發。',
    images: ['/og-image.png'],
    creator: '@ArcTeaOffice',
    site: '@ArcTeaOffice',
  },
  alternates: {
    canonical: 'https://sourcecode-intelligence.vercel.app',
    languages: {
      'zh-TW': 'https://sourcecode-intelligence.vercel.app',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://sourcecode-intelligence.vercel.app/#organization',
        name: '原始碼智慧股份有限公司',
        alternateName: ['SourceCode Intelligence', '原始碼智慧', 'SCI'],
        url: 'https://sourcecode-intelligence.vercel.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://sourcecode-intelligence.vercel.app/logo.png',
          width: 512,
          height: 512,
        },
        description: '台灣領先的 AI-Native 軟體開發工作室，專精於快速 MVP 開發、SaaS 平台、Mobile App 及 AI 應用整合。',
        foundingDate: '2024',
        founders: [
          {
            '@type': 'Person',
            name: 'Sean Peng',
            jobTitle: 'CTO & Co-Founder',
            sameAs: ['https://github.com/peng-xiao-shuai'],
          },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Taipei',
          addressRegion: 'Taiwan',
          addressCountry: 'TW',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'ArcTeaOffice@gmail.com',
          contactType: 'customer service',
          availableLanguage: ['zh-TW', 'en'],
        },
        sameAs: [
          'https://github.com/ArcTeaOffice',
          'https://twitter.com/ArcTeaOffice',
        ],
        knowsAbout: [
          'AI Software Development',
          'SaaS Development',
          'Mobile App Development',
          'Claude Code',
          'Cursor AI',
          'Next.js',
          'Flutter',
          'AI Agent Development',
          'MCP Protocol',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sourcecode-intelligence.vercel.app/#website',
        url: 'https://sourcecode-intelligence.vercel.app',
        name: '原始碼智慧 SourceCode Intelligence',
        description: 'AI-Native 軟體開發工作室官方網站',
        publisher: { '@id': 'https://sourcecode-intelligence.vercel.app/#organization' },
        inLanguage: ['zh-TW', 'en'],
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://sourcecode-intelligence.vercel.app/#service',
        name: '原始碼智慧 軟體開發服務',
        provider: { '@id': 'https://sourcecode-intelligence.vercel.app/#organization' },
        serviceType: 'Software Development',
        areaServed: {
          '@type': 'Place',
          name: 'Worldwide',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '軟體開發服務',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'SaaS 開發',
                description: '從 0 到 1 打造完整 SaaS 產品，包含用戶系統、訂閱付費、數據分析等核心功能。',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mobile App 開發',
                description: '使用 Flutter 跨平台框架，一次開發同時上架 iOS 與 Android。',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI 應用整合',
                description: '將 GPT、Claude 等大型語言模型整合到現有系統，打造智慧化工作流程。',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '客製化軟體',
                description: '針對企業特殊需求開發專屬系統，包含 ERP、CRM、內部工具等。',
              },
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://sourcecode-intelligence.vercel.app/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: '原始碼智慧是什麼公司？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '原始碼智慧是台灣的 AI-Native 軟體開發工作室。我們使用 Claude Code、Cursor 等 AI Agent 作為核心生產力，能在 5 天內交付 MVP，專精於 SaaS 開發、Mobile App、AI 應用整合與客製化軟體。',
            },
          },
          {
            '@type': 'Question',
            name: '原始碼智慧的開發速度為什麼這麼快？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '我們採用 AI-Native 工作流程，團隊日常使用 AI Agent（Claude Code、Cursor）進行開發，同時運用 10+ 現代框架與工具（Next.js、Flutter、Supabase 等），實現 5 天交付 MVP 的高效開發。',
            },
          },
          {
            '@type': 'Question',
            name: '原始碼智慧提供哪些服務？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '我們提供四大服務：1) SaaS 開發 - 完整產品包含用戶系統、訂閱付費、數據分析；2) Mobile App - Flutter 跨平台開發；3) AI 應用整合 - GPT、Claude 等 LLM 整合；4) 客製化軟體 - ERP、CRM、內部工具開發。',
            },
          },
          {
            '@type': 'Question',
            name: '如何聯繫原始碼智慧？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '您可以透過 Email: ArcTeaOffice@gmail.com 聯繫我們，或訪問我們的 GitHub: github.com/ArcTeaOffice 查看開源專案。',
            },
          },
          {
            '@type': 'Question',
            name: '什麼是 AI-Native 開發？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'AI-Native 開發是指從專案一開始就將 AI 工具（如 Claude Code、Cursor、GitHub Copilot）整合到開發流程中，讓 AI 協助程式撰寫、程式碼審查、測試等工作，大幅提升開發效率。',
            },
          },
        ],
      },
    ],
  }

  return (
    <html lang="zh-TW">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
