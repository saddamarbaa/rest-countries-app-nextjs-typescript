import { CountryType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
	country: CountryType
}

export default function Card({ country }: Props) {
	return (
		<div
			className={`w-full transform-gpu cursor-pointer overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-slate-900/5 transition-transform duration-300 ease-out hover:scale-105 dark:bg-slate-900`}
			role="link"
			tabIndex={0}>
			<Link href={`/country/${country?.name?.common}`}>
				<div className="relative w-full h-[220px]">
					<Image
						className="rounded-t-lg"
						src={country.flags.png}
						placeholder="blur"
						blurDataURL={country.flags.png}
						alt={`The flag of ${country?.name?.official}`}
						fill
						style={{ objectFit: 'cover' }}
						loading="lazy"
						// priority
					/>
				</div>
				<div className="flex flex-col space-y-1 p-4">
					<h2 className="mt-2 mb-1 font-bold text-[1.1rem] text-gray-700 dark:text-gray-300 tracking-tight">
						{country?.name?.official || 'Unknown'}
					</h2>
					<div>
						<span className="font-bold text-gray-700 dark:text-gray-300">
							Population:{' '}
						</span>
						<span className="text-gray-700 dark:text-gray-300">
							{country.population}
						</span>
					</div>
					<div>
						<span className="font-bold text-gray-700 dark:text-gray-300">
							Region:{' '}
						</span>
						<span className="text-gray-700 dark:text-gray-300">
							{country.region}
						</span>
					</div>
					<div className="flex items-center">
						<span className="mr-1 font-bold text-gray-700 dark:text-gray-300">
							Capital:
						</span>
						<span className="text-gray-700 dark:text-gray-300">
							{country.capital}
						</span>
					</div>
				</div>
			</Link>
		</div>
	)
}
