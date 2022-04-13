import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { CountryType } from '../../types/index'

type Props = {
	countries: CountryType[]
}

const MainContent = ({ countries }: Props) => {
	const [data, setData] = useState<CountryType[]>(countries)
	const [searchTerm, setSearchTerm] = useState<string | ''>('')
	const [region, setRegion] = useState<string | ''>('')

	useEffect(() => {
		let url = 'https://restcountries.com/v3.1/all'
		if (searchTerm) {
			url = `https://restcountries.com/v3.1/name/${searchTerm}`
		} else if (region) {
			url = `https://restcountries.com/v3.1/region/${region}`
		}

		if (searchTerm || region) {
			fetch(url)
				.then((response) => {
					if (response.ok) {
						return response.json()
					} else {
						// throw new Error(response.statusText);
						throw new Error('Something went wrong')
					}
				})
				.then((data) => {
					setData(data)
				})
				.catch((error) => {
					setData([])
				})
		}
	}, [searchTerm, region])

	return (
		<>
			<div className="sm:flex justify-between pt-[2rem] pb-[2rem]  sm:space-y-0">
				<div className="mb-3 xl:w-96 max-w-[90%]">
					<input
						type="search"
						className="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white shadow bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
						placeholder="Search for country"
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
					/>
				</div>
				<div className="mb-3 max-w-[90%] cursor-pointer">
					<select
						onChange={(event) => setRegion(event.target.value)}
						className="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-xl font-normal text-gray-700  bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-[1.2rem] shadow cursor-pointer"
						aria-label="form-select-lg">
						<option selected disabled>
							Filter by region
						</option>
						<option value="Africa">Africa</option>
						<option value="Asia">Asia</option>
						<option value="America">America</option>
						<option value="Europe">Europe</option>
						<option value="Oceania">Oceania</option>
					</select>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
				{data.length > 0 &&
					data.map((country: CountryType, index: number) => (
						<Link href={`/${country?.name?.official}`}>
							<div
								key={index}
								className="rounded-lg bg-white cursor-pointer shadow-md w-full  max-w-[90%] sm:max-w-[300px]">
								<div className="h-[150px]">
									<img
										className="w-full h-full object-cover mt-4 mb-2"
										src={country.flags.png}
										alt={country?.name?.official}
									/>
								</div>
								<div className="p-4 flex flex-col space-y-2">
									<div className="font-bold text-[1.1rem] text-gray-900">
										{country?.name?.official}
									</div>
									<div>
										<span className="font-bold text-gray-600">
											Population:{' '}
										</span>
										<span className="text-gray-600">{country.population}</span>
									</div>
									<div>
										<span className="font-bold text-gray-600">Region: </span>
										<span className="text-gray-600">{country.region}</span>
									</div>
									<div>
										<span className="font-bold text-gray-600">Capital: </span>
										<span className="text-gray-600">{country.capital}</span>
									</div>
								</div>
							</div>
						</Link>
					))}
			</div>
			{data.length === 0 && (
				<div className="bg-white shadow  p-4 py-6 w-full">No Data Found</div>
			)}
		</>
	)
}

export default MainContent
