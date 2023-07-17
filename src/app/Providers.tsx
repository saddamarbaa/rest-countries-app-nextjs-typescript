'use client';

import { ThemeProvider } from 'next-themes';
import React, { ReactNode } from 'react';
import { Toaster as ToastProvider } from 'react-hot-toast';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: ReactNode;
  session: Session | null;
};

export default function Providers({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <div className="transition-color flex min-h-screen flex-col bg-customWhite-100  dark:bg-customBlack-900 text-gray-700 dark:text-gray-300">
          <ToastProvider position="top-right" />
          {children}
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}
