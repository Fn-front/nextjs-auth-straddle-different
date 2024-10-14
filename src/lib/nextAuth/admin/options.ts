import type { NextAuthOptions } from 'next-auth';
// googleとgithubでのログイン実装時に活性化
// import GitHubProvider from 'next-auth/providers/github'
// import GoogleProvider from 'next-auth/providers/google'

const options: NextAuthOptions = {
  providers: [],
  debug: process.env.NODE_ENV === 'development',
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    // クッキーの有効期限（秒）例: 7日間
    // maxAge: 7 * 24 * 60 * 60,
    // クッキーの更新頻度（秒）例: 1日
    // updateAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: 'admin-session-token', // ディレクトリ1用のクッキー名
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET_ADMIN,
  callbacks: {},
};

export default options;
