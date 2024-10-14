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
        if (!user || !user.password) {
          throw new Error('メールアドレスが一致しません');
        }

        // パスワードのハッシュをデコードし確認
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password,
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
