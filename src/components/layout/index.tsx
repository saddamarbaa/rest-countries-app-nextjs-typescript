import React from 'react';

import Footer from './footer';
import Header from './header';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="mb-[2re] min-h-[50vh] w-full">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
