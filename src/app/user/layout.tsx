'use client'

import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = '/user/'
  const basePath = '/user'
  return (
    <SessionProvider baseUrl={baseUrl} basePath={`${basePath}/api/auth`}>
      {children}
    </SessionProvider>
  );
}