import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { CountryType } from '../types/index'

type Props = {
	country: CountryType[]
}

const Index = ({ country }: Props) => {
	const router = useRouter()

	return (
		<>
			{country.length > 0 && (
				<Head>
					<title> {country[0]?.name?.official}</title>
					<meta
						name="description"
						content={country[0]?.name?.nativeName?.ara?.official}
					/>
				</Head>
			)}
			<div className="mb-3 xl:w-96 max-w-[90%] mt-4">
				<div>
					<button
						onClick={() => router.back()}
						style={{ minWidth: '90px' }}
						className="bg-white  text-gray-800 font-semibold py-2  border border-gray-300 rounded text-center  shadow-lg">
						Back
					</button>
				</div>
			</div>
			{country.length > 0 && (
				<div className="mb-8 mt-8 ">
					<div className="rounded-lg  cursor-pointer">
						<div className="sm:flex  sm:space-x-[3rem] ">
							<div className="h-[15rem]  relative w-full   max-w-[95%]  sm:max-w-[300px] mb-2">
								<Image
									src={country[0]?.flags.png}
									alt={country[0]?.name?.official}
									layout="fill"
									objectFit="cover"
								/>
							</div>
							<div className="flex flex-col space-y-4">
								<div className="sm:flex sm:space-x-5">
									<div>
										<div className="font-bold text-[1.1rem] text-gray-900 p-4 sm:pt-0 pb-0">
											{country[0]?.name?.official}
										</div>
										<div className="p-4 flex flex-col space-y-2">
											<div>
												<span className="font-bold text-gray-600">
													Native Name:{' '}
												</span>
												<span className="text-gray-600">
													{country[0]?.name?.nativeName?.ara?.official}
												</span>
											</div>
											<div>
												<span className="font-bold text-gray-600">
													Population:{' '}
												</span>
												<span className="text-gray-600">
													{country[0]?.population}
												</span>
											</div>
											<div>
												<span className="font-bold text-gray-600">
													Region:{' '}
												</span>
												<span className="text-gray-600">
													{country[0]?.region}
												</span>
											</div>
											<div>
												<span className="font-bold text-gray-600">
													Sub Region:{' '}
												</span>
												<span className="text-gray-600">
													{country[0]?.subregion}
												</span>
											</div>
											<div>
												<span className="font-bold text-gray-600">
													Capital:{' '}
												</span>
												<span className="text-gray-600">
													{country[0]?.capital}
												</span>
											</div>
										</div>
									</div>

									<div className="p-4  pt-0 flex flex-col space-y-2">
										{country[0]?.currencies && (
											<div>
												<span className="font-bold text-gray-600">
													Currencies:{' '}
												</span>
												<span className="text-gray-600">
													{/*  @ts-ignore */}
													{Object.values(country[0]?.currencies)[0]?.name}
												</span>
											</div>
										)}
										<div>
											<span className="font-bold text-gray-600">
												languages:{' '}
											</span>
											{country[0]?.languages &&
												Object.values(country[0]?.languages).map(
													(item: any, index) => {
														return (
															<span
																className="text-gray-600"
																key={index}
																style={{ minWidth: '80px' }}>
																{item}{' '}
															</span>
														)
													},
												)}
										</div>
									</div>
								</div>
								<div className="p-4  pt-0 flex flex-col space-y-2 max-w-xl">
									<div className="sm:flex items-center">
										<span className="font-bold text-gray-600">
											Borders Currencies:{' '}
										</span>

										<div className="flex items-center justify-between flex-wrap">
											{country[0]?.borders?.map((item: string, index) => (
												<span
													key={index}
													style={{ minWidth: '80px' }}
													className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2  border border-gray-400 rounded text-center  shadow:md m-2">
													{item}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{country.length === 0 && (
				<div className="bg-white  text-gray-800 font-semibold py-2  border border-gray-300 rounded  shadow-lg mt-6 p-6">
					No Data Found
				</div>
			)}
		</>
	)
}
// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
	const { name } = context.query
	// Fetch data from external API
	const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
	const data = await res.json()

	if (!data) {
		return {
			notFound: true,
		}
	}

	// Pass data to the page via props
	return { props: { country: data } }
}

export default Index
