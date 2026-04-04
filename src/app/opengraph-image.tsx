import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = '原始碼智慧 - AI-Native Product Studio'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #16213e 0%, transparent 50%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              SC
            </div>
          </div>
          
          {/* Company Name */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-2px',
            }}
          >
            原始碼智慧
          </div>
          
          {/* English Name */}
          <div
            style={{
              fontSize: '32px',
              color: '#888888',
              letterSpacing: '4px',
            }}
          >
            SOURCECODE INTELLIGENCE
          </div>
          
          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                padding: '12px 24px',
                borderRadius: '100px',
                fontSize: '24px',
                color: 'white',
                fontWeight: '600',
              }}
            >
              AI-Native Product Studio
            </div>
          </div>
          
          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '48px',
              marginTop: '32px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#888888' }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>5天</span>
              <span style={{ fontSize: '18px' }}>MVP 交付</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#888888' }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>10+</span>
              <span style={{ fontSize: '18px' }}>現代框架</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#888888' }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>AI-First</span>
              <span style={{ fontSize: '18px' }}>開發流程</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
