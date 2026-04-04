import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting (use Redis in production)
const rateLimit = new Map<string, { count: number; timestamp: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5 // Max 5 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimit.get(ip)
  
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, timestamp: now })
    return false
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return true
  }
  
  record.count++
  return false
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, 1000) // Limit length
}

// Detect spam patterns
function isSpam(message: string): boolean {
  const spamPatterns = [
    /\b(viagra|casino|lottery|winner|click here|free money)\b/i,
    /\b(http|https):\/\/[^\s]+/gi, // URLs
    /(.)\1{5,}/g, // Repeated characters
  ]
  
  return spamPatterns.some(pattern => pattern.test(message))
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: '請求過於頻繁，請稍後再試' },
        { status: 429 }
      )
    }
    
    const body = await request.json()
    
    // Validate required fields
    const { name, email, message, honeypot } = body
    
    // Honeypot check (spam bots fill this hidden field)
    if (honeypot) {
      // Silently reject but return success to not alert the bot
      return NextResponse.json({ success: true })
    }
    
    // Field validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: '請輸入有效的名字（至少 2 個字元）' },
        { status: 400 }
      )
    }
    
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: '請輸入有效的 Email 地址' },
        { status: 400 }
      )
    }
    
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: '請輸入訊息（至少 10 個字元）' },
        { status: 400 }
      )
    }
    
    // Sanitize inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedMessage = sanitizeInput(message)
    
    // Spam detection
    if (isSpam(sanitizedMessage)) {
      return NextResponse.json(
        { error: '訊息內容被偵測為垃圾郵件' },
        { status: 400 }
      )
    }
    
    // In production, you would:
    // 1. Send email via SendGrid/Resend/etc.
    // 2. Store in database
    // 3. Send to Slack/Discord webhook
    
    // For now, log the contact (in production, remove this)
    console.log('[Contact Form Submission]', {
      name: sanitizedName,
      email: email.toLowerCase().trim(),
      message: sanitizedMessage,
      timestamp: new Date().toISOString(),
      ip: ip.substring(0, 20), // Truncate for privacy
    })
    
    return NextResponse.json({
      success: true,
      message: '感謝您的來信！我們會盡快回覆您。'
    })
    
  } catch (error) {
    console.error('[Contact Form Error]', error)
    return NextResponse.json(
      { error: '伺服器發生錯誤，請稍後再試' },
      { status: 500 }
    )
  }
}

// Reject other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
