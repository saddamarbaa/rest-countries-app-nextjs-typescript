'use client'

import { useDebounce } from '@/hooks'
import { CountryType } from '@/types'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Card from './Card'
import { API_BASE, FIELDS } from '@/lib/countryFields'

type Props = {
	initialCountries: CountryType[]
}

// 1. First try official codes (cca3 > ccn3 > cioc)
interface CountryKey {
	cca3?: string
	ccn3?: string
	cioc?: string
	name: {
		common: string
	}
}

const getKey = (country: CountryKey): string =>
	country.cca3 || country.ccn3 || country.cioc || country.name.common

export function Results({ initialCountries }: Props) {
	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [region, setRegion] = useState('')
	const [countries, setCountries] = useState(initialCountries || [])
	const [error, setError] = useState('')

	// Debounce the search term to reduce API calls
	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	// Inside component
	useEffect(() => {
		const controller = new AbortController()

		const getCountries = async () => {
			setIsLoading(true)

			try {
				let url = API_BASE + '/all'
				if (debouncedSearchTerm) url = `${API_BASE}/name/${debouncedSearchTerm}`
				else if (region && region !== 'All')
					url = `${API_BASE}/region/${region}`

				const response = await fetch(`${url}?fields=${FIELDS}`, {
					signal: controller.signal,
				})

				if (!response.ok) throw new Error(`HTTP ${response.status}`)

				const data = await response.json()
				setCountries(Array.isArray(data) ? data : [])
			} catch {
				if (!controller.signal.aborted) {
					setError('Failed to load countries')
					setCountries([])
				}
			} finally {
				if (!controller.signal.aborted) setIsLoading(false)
			}
		}

		getCountries()
		return () => controller.abort()
	}, [region, debouncedSearchTerm])

	console.log(error)

	return (
		<div className="mx-auto flex w-full max-w-[82rem] flex-1 flex-col p-4">
			<div className="mx-auto w-full max-w-[82rem] ">
				<div className="flex w-full flex-col items-center">
					<div className="w-full max-w-[90%] justify-between space-y-8 pb-[2.2rem] pt-[2.2rem] sm:flex sm:space-y-0 lg:max-w-[100%]">
						<div className="form-control dark:shadow-xl font-norma xl:max-w-96 mb-3 flex w-full items-center rounded bg-white p-3  text-base shadow ring-1 ring-slate-900/5 dark:bg-slate-900 sm:w-96">
							<FiSearch
								className="h-5 w-5 text-[1.1rem] tracking-tight text-slate-500 dark:text-slate-400"
								role="button"
							/>
							<input
								type="search"
								className="flex-1 bg-transparent px-4 focus:outline-none"
								placeholder="Search for country"
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
							/>
						</div>

						{isLoading && (
							<div className="hidden w-full max-w-[300px] items-center sm:flex">
								<span className="mr-4 justify-center text-base font-bold text-slate-500 dark:text-slate-200">
									Searching
								</span>
								{/* You can add a loader here like a spinner */}
							</div>
						)}

						<div className="mb-3 cursor-pointer sm:ml-6">
							<select
								onChange={(event) => setRegion(event.target.value)}
								className="form-control dark:shadow-xl font-norma l dark:bg-dark-element-bg block w-full rounded bg-white p-3 text-base shadow ring-1 ring-slate-900/5 focus:outline-none dark:bg-slate-900 sm:text-[1.2rem]"
								aria-label="form-select-lg"
								value={region}>
								<option value="" disabled>
									Filter by region
								</option>
								<option value="All">Show All</option>
								<option value="Africa">Africa</option>
								<option value="Asia">Asia</option>
								<option value="America">America</option>
								<option value="Europe">Europe</option>
								<option value="Oceania">Oceania</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div className="flex w-full flex-1 flex-col items-center">
				{countries && countries.length === 0 ? (
					<div className="my-auto w-full max-w-[90%] rounded-lg bg-white p-4 py-6 text-center shadow-md ring-1 ring-slate-900/5 dark:bg-slate-900 dark:text-gray-100 dark:shadow-lg lg:max-w-[100%]">
						<p className="mb-4 text-xl font-bold">No results found</p>
						<p className="text-lg text-gray-600 dark:text-gray-100">
							We couldn&apos;t find any results matching your search. Please try
							again with different keywords.
						</p>
					</div>
				) : null}
				<div className="mb-8 grid w-full max-w-[90%] grid-cols-1 gap-16 sm:grid-cols-2 lg:max-w-[100%] lg:grid-cols-3 xl:grid-cols-4">
					{countries.length > 0 &&
						countries.map((country) => (
							<Card key={getKey(country)} country={country} />
						))}
				</div>
			</div>
		</div>
	)
}

export default Results
