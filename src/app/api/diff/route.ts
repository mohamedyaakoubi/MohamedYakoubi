import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const ENGINE_URL = 'https://structural-diff-engine.onrender.com/v1/diff'

// ── In-memory rate limit store ────────────────────────────────────
const LIMIT = 10            // max requests
const WINDOW_MS = 30 * 60 * 1000  // 30 minutes

interface RateLimitEntry {
  count: number
  windowStart: number
}

const store = new Map<string, RateLimitEntry>()

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now })
    return { allowed: true, remaining: LIMIT - 1, resetMs: now + WINDOW_MS }
  }

  if (entry.count >= LIMIT) {
    return { allowed: false, remaining: 0, resetMs: entry.windowStart + WINDOW_MS }
  }

  entry.count += 1
  return { allowed: true, remaining: LIMIT - entry.count, resetMs: entry.windowStart + WINDOW_MS }
}

// ── Route handler ─────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const { allowed, remaining, resetMs } = checkRateLimit(ip)

  if (!allowed) {
    const retryAfterSec = Math.ceil((resetMs - Date.now()) / 1000)
    return NextResponse.json(
      { message: `Rate limit exceeded. You may make ${LIMIT} requests per 30 minutes. Try again in ${Math.ceil(retryAfterSec / 60)} minute(s).` },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfterSec),
          'X-RateLimit-Limit': String(LIMIT),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(resetMs / 1000)),
        },
      }
    )
  }

  // Forward the request to the engine
  const apiKey = req.headers.get('x-api-key') ?? ''
  const requestId = req.headers.get('x-request-id')

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const upstreamHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  }
  if (requestId) upstreamHeaders['x-request-id'] = requestId

  try {
    const upstream = await fetch(ENGINE_URL, {
      method: 'POST',
      headers: upstreamHeaders,
      body: JSON.stringify(body),
    })

    const data: unknown = await upstream.json().catch(() => ({}))

    return NextResponse.json(data, {
      status: upstream.status,
      headers: {
        'X-RateLimit-Limit': String(LIMIT),
        'X-RateLimit-Remaining': String(remaining),
        'X-RateLimit-Reset': String(Math.ceil(resetMs / 1000)),
      },
    })
  } catch {
    return NextResponse.json({ message: 'Failed to reach the diff engine.' }, { status: 502 })
  }
}
