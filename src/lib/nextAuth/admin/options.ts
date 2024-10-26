import type { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { userCertification } from '@/hooks/login';
// googleとgithubでのログイン実装時に活性化
// import GitHubProvider from 'next-auth/providers/github'
// import GoogleProvider from 'next-auth/providers/google'

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Eメール',
          type: 'text',
        },
        password: {
          label: 'パスワード',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password required');
        }

        // emailを使用しユーザーを取得
        const user = await userCertification(credentials?.email);

        // ユーザーかパスワードがない場合にエラーを返す
        if (!user.data || !user.data.password) {
          throw new Error('メールアドレスが一致しません');
        }

        // パスワードのハッシュをデコードし確認
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.data.password,
        );

        // パスワードが一致しない場合はエラーを返す
        if (!isCorrectPassword) {
          throw new Error('パスワードが一致しません');
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET_ADMIN,
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      // adminディレクトリのクッキー名
      name: 'admin-session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/error',
  },
};

export default options;
