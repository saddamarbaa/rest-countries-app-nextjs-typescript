import './globals.css'
import Header from './header'
import Footer from './footer'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head />
			<body className="bg-[#FAFAFA] text-gray-900 dark:bg-[#212E37] dark:text-gray-100">
				<Header />
				<main className="mb-[2rem] min-h-[50vh] w-full">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
