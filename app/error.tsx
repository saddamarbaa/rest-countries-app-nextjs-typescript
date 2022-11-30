'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div className="flex w-full flex-col items-center justify-center p-4 pb-[6rem] pt-[8rem]  ">
			<div className="max-w-md text-center">
				<h1 className="mb-4 text-6xl">Error</h1>
				<div className="text-grey-900 mb-8 text-center">
					We re sorry. Something went wrong!.
				</div>
				<div className="flex w-full items-center justify-center">
					<button
						onClick={() => reset()}
						className="flex w-full cursor-pointer  items-center justify-center rounded py-3  px-6 shadow ring-1 ring-slate-900/5 dark:bg-slate-900 sm:max-w-[150px]">
						Go back
					</button>
				</div>
			</div>
		</div>
	)
}
