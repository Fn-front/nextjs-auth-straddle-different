import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { withAuth } from 'next-auth/middleware';

/* eslint-disable */
export async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // ログインページ自体ではリダイレクトを行わないようにする
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // '/admin'以下のページにアクセスする際、認証トークンがなければカスタムログインページにリダイレクト
  if (pathname.startsWith('/admin')) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET_ADMIN,
    });

    // tokenが無い場合にリダイレクト
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
