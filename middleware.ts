// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Kill-switch to disable middleware quickly in CI/sandboxes
  if (process.env.NEXT_DISABLE_MIDDLEWARE === '1') {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  // Extra defensive: never touch framework/static assets
  if (
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/ai.txt' ||
    pathname.match(/\.(?:css|js|mjs|map|json|png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|txt)$/)
  ) {
    return NextResponse.next()
  }

  const hostname = request.headers.get('host') || ''

  // noindex preview/vercel hosts
  if (hostname.includes('vercel.app') || hostname.includes('preview')) {
    const res = NextResponse.next()
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return res
  }

  const res = NextResponse.next()
  res.headers.set('X-AI-Crawlable', 'true')
  res.headers.set(
    'X-Robots-Tag',
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  )
  return res
}

// Keep middleware off of assets via the matcher too
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|ai.txt|.*\\.(?:css|js|mjs|map|json|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|txt)).*)',
  ],
}