'use client'

import { SearchIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { v4 as uuidv4 } from 'uuid'
import { useDebounce } from '../../components'

import { CountryT } from '../../types'

type Props = { list: CountryT[] }

export default function CountryList({ list }: Props) {
	const [countries, setCountries] = useState<CountryT[]>(list)
	const [region, setRegion] = useState<string | ''>('')
	const [searchTerm, setSearchTerm] = useState<string | ''>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const debouncedSearchTerm = useDebounce(searchTerm, 300)

	useEffect(() => {
		let url = 'https://restcountries.com/v3.1/all'
		if (debouncedSearchTerm) {
			url = `https://restcountries.com/v3.1/name/${debouncedSearchTerm}`
		} else if (region && region !== 'All') {
			url = `https://restcountries.com/v3.1/region/${region}`
		}

		if (debouncedSearchTerm || region) {
			setIsLoading(true)
			fetch(url)
				.then((response) => {
					if (response.ok) {
						return response.json()
					} else {
						return response.json().then((errorData) => {
							throw new Error(
								errorData.message ||
									'an error occurred, please try again later',
							)
						})
					}
				})
				.then((data) => {
					setIsLoading(false)
					setCountries(data)
				})
				.catch((error) => {
					setCountries([])
				})
		}
	}, [region, debouncedSearchTerm])

	return (
		<div className="mx-auto  w-full max-w-[82rem] p-4 ">
			<div className="flex w-full flex-col items-center">
				<div className="w-full max-w-[90%] justify-between space-y-8 pt-[2.2rem] pb-[2.2rem] sm:flex  sm:space-y-0 lg:max-w-[100%]">
					<div className="form-control dar:shadow-xl font-norma xl:max-w-96 mb-3 flex w-full items-center  rounded bg-white py-4 px-4 text-base shadow ring-1 ring-slate-900/5 dark:bg-slate-900 sm:w-96  ">
						<SearchIcon
							className="h-15 w-5 text-[1.1rem] tracking-tight  text-slate-500  dark:text-slate-400"
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
						<div className=" hidden w-full max-w-[300px] items-center  sm:flex ">
							<span className="mr-4 justify-center text-base font-bold  text-slate-500 dark:text-slate-200">
								Searching
							</span>
							<span className="pt-2">
								<BeatLoader color="#9B9B9B" />
							</span>
						</div>
					)}

					<div className="mb-3  cursor-pointer sm:ml-6">
						<select
							onChange={(event) => setRegion(event.target.value)}
							className="form-control dar:shadow-xl font-norma l dark:bg-dark-element-bg block w-full rounded bg-white px-4  py-4 text-base shadow ring-1 ring-slate-900/5 focus:outline-none dark:bg-slate-900 sm:text-[1.2rem]"
							aria-label="form-select-lg"
							defaultValue="Filter by region">
							<option disabled>Filter by region</option>
							<option value="All">Show All</option>
							<option value="Africa">Africa</option>
							<option value="Asia">Asia</option>
							<option value="America">America</option>
							<option value="Europe">Europe</option>
							<option value="Oceania">Oceania</option>
						</select>
					</div>
				</div>

				<div className="mb-8 grid w-full max-w-[90%] grid-cols-1 gap-16 sm:grid-cols-2 lg:max-w-[100%]  lg:grid-cols-3  xl:grid-cols-4 ">
					{countries.length > 0 &&
						countries.map((country: any) => (
							<Link href={`country/${country?.name?.official}`} key={uuidv4()}>
								<div
									className="w-full cursor-pointer overflow-hidden  rounded-lg bg-white  shadow-xl  
                ring-1 ring-slate-900/5 transition-transform duration-300 ease-out hover:scale-105 dark:bg-slate-900">
									<div className="relative h-[220px] w-full ">
										<Image
											className="rounded-t-lg"
											layout="fill"
											objectFit="cover"
											src={country.flags.png}
											placeholder="blur"
											blurDataURL={country.flags.png}
											alt={`The flag of ${country?.name?.official}`}
										/>
									</div>
									<div className="flex flex-col space-y-1 p-4">
										<h2 className="mb-1  mt-2 text-[1.1rem] font-bold tracking-tight text-slate-900 dark:text-white">
											{country?.name?.official}
										</h2>
										<div>
											<span className="font-bold  text-slate-500 dark:text-slate-400">
												Population:{' '}
											</span>
											<span className="text-slate-500 dark:text-slate-400">
												{country.population}
											</span>
										</div>
										<div>
											<span className="font-bold text-slate-500">Region: </span>
											<span className="text-slate-500 dark:text-slate-400">
												{country.region}
											</span>
										</div>
										<div>
											<span className="font-bold text-slate-500">
												Capital:{' '}
											</span>
											<span className="text-slate-500 dark:text-slate-400">
												{country.capital}
											</span>
										</div>
									</div>
								</div>
							</Link>
						))}
				</div>
				{countries.length === 0 && (
					<div className="w-full max-w-[90%] rounded-lg bg-white  p-4  py-6 text-center shadow-xl  ring-1 ring-slate-900/5  dark:bg-slate-900  dark:text-gray-100 dark:shadow-lg lg:max-w-[100%]">
						No Data Found
					</div>
				)}
			</div>
		</div>
	)
}
