"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";
import { Toaster as ToastProvider } from "react-hot-toast";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ClerkProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        <div className="transition-color flex min-h-screen flex-col bg-customWhite-100  text-gray-700 dark:bg-customBlack-900 dark:text-gray-300">
          <ToastProvider position="top-right" />
          {children}
        </div>
      </ThemeProvider>
    </ClerkProvider>
  );
}
