import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Head>
				<title> Rest Countries App</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="author" content="Saddam Arbaa" />
				<meta
					name="description"
					content="Country App build with React + Next Js + TypeScript"
				/>
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
