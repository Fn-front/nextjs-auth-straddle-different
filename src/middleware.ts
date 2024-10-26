import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { withAuth } from 'next-auth/middleware';

/* eslint-disable */
export async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  console.log(pathname);
  // console.log(!!pathname.match('/user/api/'));

  // ログイン関係ではリダイレクトを行わないようにする
  if (
    pathname === '/admin/login' ||
    !!pathname.match('/admin/api/') ||
    pathname === '/user/login' ||
    !!pathname.match('/user/api/') ||
    pathname === '/api/auth/_log'
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
  } else if (pathname.startsWith('/user')) {
    // '/user'以下のページにアクセスする際、認証トークンがなければカスタムログインページにリダイレクト
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET_USER,
      cookieName: 'user-session-token',
    });

    // tokenが無い場合にリダイレクト
    if (!token) {
      return NextResponse.redirect(new URL('/user/login', req.url));
    }
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ['/admin/:path*'],
// };
