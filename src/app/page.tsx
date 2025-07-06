import SearchResult from '@/components/country/Results'
import { API_BASE, FIELDS } from '@/lib/countryFields'
// import { serverSideFunction } from '@/lib/server-utils'
// import { delay } from '@/lib'
import { CountryType } from '@/types'

export default async function Home() {
	// await delay(); // Delay for 2000 milliseconds (2 seconds) by default
	const response = await fetch(`${API_BASE}/all?fields=${FIELDS}`)

	if (!response.ok) {
		throw new Error('Error fetching data')
	}

	const results: CountryType[] = await response.json()

	// serverSideFunction()
	return <SearchResult initialCountries={results} />
}
