'use client'

import React, { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { IconType } from 'react-icons'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string
	isLoading?: boolean
	isDisabled?: boolean
	Icon?: IconType
}

export const Button: React.FC<ButtonProps> = ({
	children,
	className,
	Icon,
	isLoading = false,
	isDisabled = false,
	...props
}) => {
	const disabledClass = isDisabled
		? 'opacity-50 cursor-not-allowed dark:cursor-not-allowed dark:opacity-50'
		: 'hover:bg-gray-200 dark:hover:bg-slate-700'
	const loadingClass = isLoading ? 'animate-pulse' : ''

	const buttonStyles = twMerge(
		`flex items-center justify-center rounded p-3 shadow ring-1 ring-slate-900/5 bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300 dark:hover:text-gray-100  w-full  transition-colors duration-300 ease-in-out py-3 px-5 text-md font-bold ${disabledClass} ${loadingClass}`,
		className,
	)

	return (
		<button className={buttonStyles} {...props}>
			{Icon && <Icon className="mr-5 text-2xl font-bold" />}
			{isLoading ? (
				<div>
					<Image
						src="/images/svg/Spinner-1s-200px.svg"
						alt="Loading"
						width={30}
						height={30}
					/>
				</div>
			) : (
				children
			)}
		</button>
	)
}

export default Button
