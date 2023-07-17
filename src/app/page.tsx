import SearchResult from '@/components/country/Results';
import { delay } from '@/lib';
import { CountryType } from '@/types';

export default async function Home() {
  // await delay(); // Delay for 2000 milliseconds (2 seconds) by default
  const response = await fetch(`https://restcountries.com/v3.1/all`);

  if (!response.ok) {
    throw new Error('Error fetching data');
  }

  const results: CountryType[] = await response.json();

  return <SearchResult initialCountries={results} />;
}
