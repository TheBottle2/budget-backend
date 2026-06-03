import { NextResponse } from 'next/server';

const rateLimitMap = new Map();

function rateLimit(ip, limit = 10, windowMs = 60 * 1000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requests = rateLimitMap.get(ip).filter((time) => time > windowStart);
  requests.push(now);
  rateLimitMap.set(ip, requests);

  return requests.length <= limit;
}

export function middleware(request) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/api/auth/')) {
    if (!rateLimit(ip, 10, 60 * 1000)) {
      return NextResponse.json(
        { mesaj: 'Çok fazla istek. Lütfen bir dakika sonra tekrar deneyin.' },
        { status: 429 }
      );
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';"
    );
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};
