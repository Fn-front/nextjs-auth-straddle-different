import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { withAuth } from 'next-auth/middleware';

/* eslint-disable */
export async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // ログイン関係ではリダイレクトを行わないようにする
  if (
    pathname === '/admin/login' ||
    pathname === '/admin/api/auth/' ||
    pathname === '/admin/api/auth/callback/credentials' ||
    pathname === '/admin/api/auth/providers' ||
    pathname === '/admin/api/auth/csrf' ||
    pathname === '/api/auth/_log' ||
    pathname === '/admin/api/auth/session'
  ) {
    return NextResponse.next();
  }

  // '/admin'以下のページにアクセスする際、認証トークンがなければカスタムログインページにリダイレクト
  if (pathname.startsWith('/admin')) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET_ADMIN,
      cookieName: 'admin-session-token',
    });

    // tokenが無い場合にリダイレクト
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ['/admin/:path*'],
// };
