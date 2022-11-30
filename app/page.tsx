import CountryList from '../page-components/home-page'

async function getData() {
	const res = await fetch('https://restcountries.com/v3.1/all', {
		next: { revalidate: 10 },
	})

	return res.json()
}

export default async function Page() {
	const countries = await getData()
	// @ts-ignore
	return <CountryList list={countries} />
}
