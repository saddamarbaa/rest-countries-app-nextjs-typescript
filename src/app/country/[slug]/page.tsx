import Map from '@/components/map'
import { Button } from '@/components/ui'
import { CountryType } from '@/types'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'

type Props = {
	params: Promise<{
		slug: string
	}>
}

export const dynamicParams = true

async function getSingleCountryData(
	name: string,
): Promise<CountryType[] | null> {
	// Try multiple search methods for better results
	const searchMethods = [
		`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`,
		`https://restcountries.com/v3.1/alpha/${encodeURIComponent(name)}`,
		`https://restcountries.com/v3.1/name/${encodeURIComponent(
			name,
		)}?fullText=true`,
	]

	for (const url of searchMethods) {
		try {
			const res = await fetch(url, {
				next: { revalidate: 60 },
			})

			if (res.ok) {
				return res.json()
			}
		} catch (error) {
			console.error(`Failed to fetch from ${url}:`, error)
			continue
		}
	}

	// If all methods fail, throw an error
	throw new Error('Country not found')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const { slug } = await params
		const country = await getSingleCountryData(slug)

		if (!country || country.length === 0) {
			return {
				title: 'Country Not Found',
				description: 'The requested country could not be found',
			}
		}

		return {
			title: country[0]?.name?.common || 'Country Not Found',
			description: country[0]?.name?.official || 'No description available',
		}
	} catch (error) {
		console.error(`Error generating metadata for slug: ${params}`, error)
		return {
			title: 'Country Not Found',
			description: 'The requested country could not be found',
		}
	}
}

export default async function SingleCountryPage({ params }: Props) {
	const { slug } = await params

	try {
		const country = await getSingleCountryData(slug)

		if (!country || country.length === 0) {
			console.log(`No country found for slug: ${slug}`)
			return notFound()
		}

		const countryData = country[0]
		console.log(
			`Found country: ${countryData.name?.common} (${countryData.name?.official})`,
		)

		return (
			<>
				<div className="mx-auto p-4 py-6 w-full max-w-[82rem]">
					{countryData && (
						<div className="flex space-x-[4rem] mt-[3rem] item-center">
							<div className="w-full xl:w-96 max-w-[95%]">
								<Link
									href="/"
									className="flex items-center w-full cursor-pointer">
									<Button className="px-2 sm:max-w-[120px]">
										<BiLeftArrowAlt className="mr-4 text-2xl" role="button" />
										<span>Back</span>
									</Button>
								</Link>
							</div>
						</div>
					)}

					{countryData && (
						<div className="bg-customWhite-100 dark:bg-customBlack-900 mt-8 mb-8">
							<div className="shadow sm:shadow-none rounded-lg sm:rounded-none ring-1 ring-slate-900/5 sm:ring-0 w-full max-w-[95%] transition-transform duration-300 ease-out">
								<div className="flex sm:flex lg:flex-row flex-col lg:space-x-10 xl:space-x-20 space-y-4">
									<div className="relative rounded h-[300px] lg:h-auto max-h-[400px] overflow-hidden transform-gpu hover:scale-105 transition-transform duration-300 ease-out lg:basis-1/2">
										<Image
											src={countryData.flags?.png || '/placeholder-image.png'}
											placeholder="blur"
											blurDataURL={countryData.flags?.png || ''}
											alt={`The flag of ${
												countryData.name?.official ||
												countryData.name?.common ||
												'Unknown Country'
											}`}
											fill
											style={{
												objectFit: 'cover',
												width: '100%',
												height: '100%',
											}}
										/>
									</div>

									<div className="flex flex-col space-y-4">
										<div className="sm:flex sm:space-x-5">
											<div>
												<div className="p-4 sm:pt-0 pb-0 font-bold text-[1.1rem] tracking-tight">
													{countryData.name?.official}
												</div>
												<div className="flex flex-col space-y-2 p-4">
													<div>
														<span className="font-bold">Native Name: </span>
														<span>
															{countryData.name?.nativeName
																? Object.values(countryData.name.nativeName)[0]
																		?.official
																: 'N/A'}
														</span>
													</div>
													<div>
														<span className="font-bold">Population: </span>
														<span>
															{countryData.population?.toLocaleString() ||
																'N/A'}
														</span>
													</div>
													<div>
														<span className="font-bold">Region: </span>
														<span>{countryData.region || 'N/A'}</span>
													</div>
													<div>
														<span className="font-bold">Sub Region: </span>
														<span>{countryData.subregion || 'N/A'}</span>
													</div>
													<div>
														<span className="font-bold">Capital: </span>
														<span>{countryData.capital?.[0] || 'N/A'}</span>
													</div>
												</div>
											</div>

											<div className="flex flex-col space-y-2 p-4 pt-0">
												{countryData.currencies && (
													<div>
														<span className="font-bold">Currencies: </span>
														<span>
															{Object.values(countryData.currencies)[0]?.name ||
																'N/A'}
														</span>
													</div>
												)}
												<div className="flex sm:flex-row sm:space-x-5 overflow-hidden">
													<span className="font-bold">Languages: </span>
													{countryData.languages
														? Object.values(countryData.languages).map(
																(item, index) => (
																	<span
																		key={index}
																		style={{ minWidth: '80px' }}>
																		{item}{' '}
																	</span>
																),
														  )
														: 'N/A'}
												</div>

												<div className="pt-4 sm:pt-0">
													<a
														href={countryData.maps?.googleMaps || '#'}
														target="_blank"
														rel="noreferrer"
														className="block">
														<Button className="px-2 w-full whitespace-nowrap">
															View On Google Map
														</Button>
													</a>
												</div>
											</div>
										</div>
										<div className="flex flex-col space-y-2 p-4 pt-0 max-w-xl">
											<div className="flex sm:flex-row flex-col sm:space-x-5 space-y-3 sm:space-y-0">
												<span className="mt-2 font-bold whitespace-nowrap">
													Border Countries:{' '}
												</span>

												<div className="flex flex-wrap w-full">
													{countryData.borders &&
													countryData.borders.length > 0 ? (
														countryData.borders.map((item, index) => (
															<Link
																key={index}
																style={{ minWidth: '90px' }}
																href={`/country/${item}`}
																className="flex mb-5 sm:ml-4 w-full sm:w-fit">
																<Button
																	isDisabled={false}
																	isLoading={false}
																	className="px-2">
																	{item}
																</Button>
															</Link>
														))
													) : (
														<Button className="ml-4" disabled>
															No Borders Found
														</Button>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				{country && country.length > 0 && (
					<div>
						<Map
							latitude={
								country[0]?.capitalInfo?.latlng?.[0] ||
								country[0]?.latlng?.[0] ||
								37.7749
							}
							longitude={
								country[0]?.capitalInfo?.latlng?.[1] ||
								country[0]?.latlng?.[1] ||
								-122.4194
							}
						/>
					</div>
				)}
			</>
		)
	} catch (error) {
		console.error(`Error fetching country data for slug: ${slug}`, error)
		return notFound()
	}
}
