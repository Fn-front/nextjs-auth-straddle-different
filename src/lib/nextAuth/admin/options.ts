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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {},
};

export default options;
