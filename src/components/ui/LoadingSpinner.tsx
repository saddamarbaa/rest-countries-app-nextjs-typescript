import Image from 'next/image'
import React from 'react'

export function LoadingSpinner() {
	return (
		<div className="flex justify-center">
			<Image
				className="h-96"
				src="/images/svg/spinner.svg"
				alt="loading..."
				width={390}
				height={390}
			/>
		</div>
	)
}

export default LoadingSpinner
