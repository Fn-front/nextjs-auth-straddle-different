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
  },
  cookies: {
    sessionToken: {
      name: 'user-session-token', // ディレクトリ1用のクッキー名
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {},
};

export default options;
