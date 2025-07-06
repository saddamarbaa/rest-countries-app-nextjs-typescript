'use client'

import { Button } from '@/components'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { startTransition, useEffect } from 'react'

export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	const router = useRouter()

	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	const reload = () => {
		startTransition(() => {
			router.refresh()
			reset()
		})
	}

	return (
		<div className="grid place-items-center  px-4  py-12 sm:py-32">
			<div className="max-w-md text-center">
				<h1 className="mb-4  text-4xl font-bold">404</h1>
				<p className="font-semibold mb-6 sm:text-2xl text-red-500">
					{error?.message || 'Unknown error occurred.'}
				</p>
				<p className="mb-10 text-lg ">
					Were sorry. The page you requested could not be found. Please go back
					to the homepage or contact us.
				</p>
				<div className="flex w-full items-center justify-center space-x-6">
					<Link href="/" className="w-40">
						<Button> Back to home</Button>
					</Link>
					<div className="w-40">
						<Button type="button" onClick={reload}>
							Try again
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
