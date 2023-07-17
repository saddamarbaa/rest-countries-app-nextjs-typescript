import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';


import { authOptions } from '@/lib/session';
import Providers from './Providers';
import '../styles/globals.css';
import { Footer, Header } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Rest Countries App',
  description: 'Country App build with React + Next Js + TypeScript',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(' session', session);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
