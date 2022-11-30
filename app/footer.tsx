import Link from 'next/link'
import React from 'react'

type Props = {}

export default function footer({}: Props) {
	return (
		<footer className=" flex h-24 w-full items-center justify-center border-t pt-[3rem] pb-[3rem] text-slate-500 dark:border-t-slate-500 dark:text-slate-400">
			<span className="mr-2">© 2022 Copyright: </span>
			<Link
				className="flex cursor-pointer items-center justify-center gap-2"
				href="https://github.com/saddamarbaa/rest-countries-app-nextjs-typescript">
				👋 Check out github to learn more about how I made this.
			</Link>
		</footer>
	)
}
