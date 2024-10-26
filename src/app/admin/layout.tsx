'use client'

import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = '/admin/'
  const basePath = '/admin'
  return (
    <SessionProvider baseUrl={baseUrl} basePath={`${basePath}/api/auth`}>
      {children}
    </SessionProvider>
  );
}