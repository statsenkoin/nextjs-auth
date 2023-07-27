export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    // '/:path*',
    // '/profile/:path*',
    // '/about/:path*'
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
};

// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
// paths that require authentication or authorization
const requireAuth = ['/'];
export async function middleware(request) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  if (requireAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.SECRET,
    });
    //check not logged in
    if (!token) {
      const url = new URL(`/auth/login`, request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    // //check if not authorized
    // if (token.role !== 'admin') {
    //   const url = new URL(`/403`, request.url);
    //   return NextResponse.rewrite(url);
    // }
  }
  return res;
}
