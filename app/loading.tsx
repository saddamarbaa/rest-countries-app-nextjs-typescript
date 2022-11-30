import React from 'react'
import { BeatLoader } from 'react-spinners'
type Props = {}

export default function loading({}: Props) {
	return (
		<div className=" mx-auto w-full  max-w-[82rem]  items-center p-4 sm:flex">
			<div className="mb-[1.2rem] flex w-full  items-center justify-center py-24">
				<span className="mr-4 text-base font-bold text-slate-500 dark:text-slate-200">
					Loading
				</span>
				<span className="pt-2">
					<BeatLoader color="#9B9B9B" />
				</span>
			</div>
		</div>
	)
}
