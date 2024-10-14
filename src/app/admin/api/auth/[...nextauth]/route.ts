import NextAuth from 'next-auth/next';

import options from '@/lib/nextAuth//admin/options';

const handler = NextAuth(options);

export { handler as GET, handler as POST };
