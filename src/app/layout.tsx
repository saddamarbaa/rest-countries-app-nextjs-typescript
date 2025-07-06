import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './styles/globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { Footer, Header } from '@/components/layouts'
// import { ClerkProvider } from '@clerk/nextjs'
import Providers from './Providers'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

// export const metadata: Metadata = {
// 	title: 'Rest Countries App',
// 	description: 'Country App build with React + Next Js + TypeScript',
// }

export const metadata: Metadata = {
	// metadataBase: new URL('https://rest-countries-api.example.com'),
	title: {
		default: 'Rest Countries App',
		template: `%s | REST Countries API`,
	},
	description:
		'Country App build with React + Next Js + TypeScript, Explore detailed information about countries worldwide using the REST Countries API. Built by Saddam Arbaa, this API provides data on population, currencies, languages, and more.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased transition-color flex min-h-screen flex-col bg-customWhite-100  text-gray-700 dark:bg-customBlack-900 dark:text-gray-300`}>
				<Providers>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange>
						<Header />
						<main className="flex flex-1 flex-col">{children}</main>
						<Footer />
					</ThemeProvider>
				</Providers>
			</body>
		</html>
	)
}
