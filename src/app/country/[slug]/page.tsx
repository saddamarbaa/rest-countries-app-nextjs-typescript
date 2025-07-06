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
	const res = await fetch(`https://restcountries.com/v3.1/name/${name}`, {
		next: { revalidate: 60 },
	})

	if (!res.ok) {
		let errorMessage = 'Failed to fetch data'

		if (res.status === 404) {
			errorMessage = 'Country not found'
		} else if (res.status === 500) {
			errorMessage = 'Server error'
		}

		throw new Error(errorMessage)
	}

	return res.json()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const country = await getSingleCountryData(slug)

	if (!country || country.length === 0) {
		return notFound()
	}

	return {
		title: country[0]?.name?.common || 'Country Not Found',
		description: country[0]?.name?.official || 'No description available',
	}
}

export default async function SingleCountryPage({ params }: Props) {
	const { slug } = await params
	const country = await getSingleCountryData(slug)

	if (!country || country.length === 0) {
		return notFound()
	}

	const countryData = country[0]

	return (
		<>
			<div className="mx-auto w-full max-w-[82rem] p-4 py-6">
				{countryData && (
					<div className="item-center mt-[3rem] flex space-x-[4rem]">
						<div className="w-full max-w-[95%] xl:w-96">
							<Link
								href="/"
								className="flex w-full cursor-pointer items-center">
								<Button className="px-2 sm:max-w-[120px]">
									<BiLeftArrowAlt className="mr-4 text-2xl" role="button" />
									<span>Back</span>
								</Button>
							</Link>
						</div>
					</div>
				)}

				{countryData && (
					<div className="mb-8 mt-8 bg-customWhite-100 dark:bg-customBlack-900">
						<div className="w-full max-w-[95%] rounded-lg shadow ring-1 ring-slate-900/5 transition-transform duration-300 ease-out sm:rounded-none sm:shadow-none sm:ring-0">
							<div className="flex flex-col space-y-4 sm:flex lg:flex-row lg:space-x-10 xl:space-x-20">
								<div className="relative h-[300px] max-h-[400px] transform-gpu overflow-hidden rounded transition-transform duration-300 ease-out hover:scale-105 lg:h-auto lg:basis-1/2">
									<Image
										src={countryData.flags?.png || '/placeholder-image.png'}
										placeholder="blur"
										blurDataURL={countryData.flags?.png || ''}
										alt={`The flag of ${countryData.name?.official}`}
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
											<div className="p-4 pb-0 text-[1.1rem] font-bold tracking-tight sm:pt-0">
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
														{countryData.population?.toLocaleString() || 'N/A'}
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
											<div className="flex overflow-hidden sm:flex-row sm:space-x-5">
												<span className="font-bold">Languages: </span>
												{countryData.languages
													? Object.values(countryData.languages).map(
															(item, index) => (
																<span key={index} style={{ minWidth: '80px' }}>
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
													<Button className="w-full whitespace-nowrap px-2">
														View On Google Map
													</Button>
												</a>
											</div>
										</div>
									</div>
									<div className="flex max-w-xl flex-col space-y-2 p-4 pt-0">
										<div className="flex flex-col space-y-3 sm:flex-row sm:space-x-5 sm:space-y-0">
											<span className="mt-2 whitespace-nowrap font-bold">
												Border Countries:{' '}
											</span>

											<div className="flex w-full flex-wrap">
												{countryData.borders?.map((item, index) => (
													<Link
														key={index}
														style={{ minWidth: '90px' }}
														href={`/country/${item}`}
														className="mb-5 flex w-full sm:ml-4 sm:w-fit">
														<Button
															isDisabled={false}
															isLoading={false}
															className="px-2">
															{item}
														</Button>
													</Link>
												))}

												{!countryData.borders && (
													<Button className="ml-4">No Borders Found</Button>
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
		</>
	)
}
