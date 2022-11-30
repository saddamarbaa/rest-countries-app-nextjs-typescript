export async function getAllCountriesData() {
	const res = await fetch(`https://restcountries.com/v3.1/all`)
	return res.json()
}
