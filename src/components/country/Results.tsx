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
	name: {
		common: string
	}
}

const getKey = (country: CountryKey): string =>
	country.cca3 || country.ccn3 || country.name.common

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
			setError('')

			try {
				let url = API_BASE + '/all'
				if (debouncedSearchTerm.trim()) {
					url = `${API_BASE}/name/${encodeURIComponent(
						debouncedSearchTerm.trim(),
					)}`
				} else if (region && region !== 'All') {
					url = `${API_BASE}/region/${encodeURIComponent(region)}`
				}

				const response = await fetch(`${url}?fields=${FIELDS}`, {
					signal: controller.signal,
				})

				if (!response.ok) {
					if (response.status === 404) {
						setCountries([])
						return
					}
					throw new Error(`HTTP ${response.status}`)
				}

				const data = await response.json()

				// Handle case where API returns error object instead of array
				if (data.status && data.status !== 200) {
					throw new Error(data.message || 'API Error')
				}

				setCountries(Array.isArray(data) ? data : [])
			} catch (error) {
				if (!controller.signal.aborted) {
					console.error('Search error:', error)
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

	return (
		<div className="flex flex-col flex-1 mx-auto p-4 w-full max-w-[82rem]">
			<div className="mx-auto w-full max-w-[82rem]">
				<div className="flex flex-col items-center w-full">
					<div className="sm:flex justify-between space-y-8 sm:space-y-0 pt-[2.2rem] pb-[2.2rem] w-full max-w-[90%] lg:max-w-[100%]">
						<div className="flex items-center bg-white dark:bg-slate-900 shadow dark:shadow-xl mb-3 p-3 rounded ring-1 ring-slate-900/5 w-full sm:w-96 xl:max-w-96 font-norma text-base form-control">
							<FiSearch
								className="w-5 h-5 text-[1.1rem] text-slate-500 dark:text-slate-400 tracking-tight"
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
							<div className="hidden sm:flex items-center w-full max-w-[300px]">
								<span className="justify-center mr-4 font-bold text-slate-500 dark:text-slate-200 text-base">
									Searching
								</span>
								{/* You can add a loader here like a spinner */}
							</div>
						)}

						{error && (
							<div className="hidden sm:flex items-center w-full max-w-[300px]">
								<span className="justify-center mr-4 font-bold text-red-500 dark:text-red-400 text-base">
									{error}
								</span>
							</div>
						)}

						<div className="mb-3 sm:ml-6 cursor-pointer">
							<select
								onChange={(event) => setRegion(event.target.value)}
								className="block bg-white dark:bg-dark-element-bg dark:bg-slate-900 shadow dark:shadow-xl p-3 rounded focus:outline-none ring-1 ring-slate-900/5 w-full font-norma sm:text-[1.2rem] text-base form-control l"
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
			<div className="flex flex-col flex-1 items-center w-full">
				{error && countries.length === 0 ? (
					<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 my-auto p-4 py-6 rounded-lg ring-1 ring-red-200 dark:ring-red-800 w-full max-w-[90%] lg:max-w-[100%] text-center">
						<p className="mb-4 font-bold text-xl text-red-600 dark:text-red-400">Error Loading Countries</p>
						<p className="text-red-600 dark:text-red-400 text-lg">
							{error}. Please try refreshing the page or check your internet connection.
						</p>
					</div>
				) : countries && countries.length === 0 ? (
					<div className="bg-white dark:bg-slate-900 shadow-md dark:shadow-lg my-auto p-4 py-6 rounded-lg ring-1 ring-slate-900/5 w-full max-w-[90%] lg:max-w-[100%] dark:text-gray-100 text-center">
						<p className="mb-4 font-bold text-xl">No results found</p>
						<p className="text-gray-600 dark:text-gray-100 text-lg">
							We couldn&apos;t find any results matching your search. Please try
							again with different keywords.
						</p>
					</div>
				) : null}
				<div className="gap-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8 w-full max-w-[90%] lg:max-w-[100%]">
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
