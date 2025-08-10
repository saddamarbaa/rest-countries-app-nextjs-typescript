import SearchResult from '@/components/country/Results'
import { API_BASE, FIELDS } from '@/lib/countryFields'
// import { serverSideFunction } from '@/lib/server-utils'
// import { delay } from '@/lib'
import { CountryType } from '@/types'

export default async function Home() {
	// await delay(); // Delay for 2000 milliseconds (2 seconds) by default
	try {
		const response = await fetch(`${API_BASE}/all?fields=${FIELDS}`)

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}

		const results: CountryType[] = await response.json()

		// serverSideFunction()
		return <SearchResult initialCountries={results} />
	} catch (error) {
		console.error('Failed to fetch countries:', error)
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-center">
					<h1 className="mb-4 font-bold text-red-600 text-2xl">
						Failed to Load Countries
					</h1>
					<p className="text-gray-600">
						Please check your internet connection and try again.
					</p>
				</div>
			</div>
		)
	}
}
