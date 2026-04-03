import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authEnabled = process.env.AUTH_ENABLED === 'true';

  // If authentication is disabled, skip everything
  if (!authEnabled) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth-token')?.value;

  // Paths that should not be protected
  const isPublicFile = pathname.startsWith('/_next') || 
                       pathname.startsWith('/api') || 
                       pathname.includes('.') ||
                       pathname === '/favicon.ico';

  const isAuthPage = pathname === '/auth';

  // If not authenticated and not on the auth page, redirect to auth
  if (!authToken && !isAuthPage && !isPublicFile) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  // If already authenticated and on the auth page, redirect to home
  if (authToken && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
