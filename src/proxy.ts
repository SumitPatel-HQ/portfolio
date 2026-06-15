import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { device } = userAgent(request);
  const isMobile = device.type === 'mobile';
  const { pathname } = request.nextUrl;

  // 1. Mobile users on /about -> redirect to /
  if (isMobile && pathname === '/about') {
    return NextResponse.redirect(new URL('/', request.url), 302);
  }

  // 2. Desktop/Tablet users on /services -> redirect to /about
  if (!isMobile && pathname === '/services') {
    return NextResponse.redirect(new URL('/about', request.url), 302);
  }

  // 3. Desktop/Tablet users on /projects/[name] -> redirect to /projects
  // Matches paths like /projects/querycraft but not /projects itself
  if (!isMobile && pathname.startsWith('/projects/') && pathname !== '/projects') {
    return NextResponse.redirect(new URL('/projects', request.url), 302);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to /about, /services, and /projects/:name
    // This avoids running it on static files or API routes unnecessarily.
    '/about',
    '/services',
    '/projects/:path*',
  ],
};
