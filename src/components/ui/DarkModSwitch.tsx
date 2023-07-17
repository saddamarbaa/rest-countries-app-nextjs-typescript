'use client'

import React, { useEffect, useState } from 'react'
import { FiSun } from 'react-icons/fi'
import { useTheme } from 'next-themes'
import { BsFillMoonFill } from 'react-icons/bs'

export default function DarkModeSwitch() {
	const { systemTheme, theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const renderThemeChanger = () => {
		if (!mounted) return null

		const currentTheme = theme === 'system' ? systemTheme : theme

		const handleThemeToggle = () => {
			const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
			setTheme(newTheme)
		}

		if (currentTheme === 'dark') {
			return (
				<FiSun
					className="h-7 w-7 text-yellow-500 sm:text-2xl cursor-pointer transition-colors hover:text-amber-500 focus:outline-none focus:text-amber-500 mt-4"
					role="button"
					onClick={handleThemeToggle}
					aria-label="Switch to light mode"
				/>
			)
		}

		return (
			<BsFillMoonFill
				className="h-6 w-6 text-gray-900 sm:text-2xl  cursor-pointer transition-colors hover:text-gray-700 focus:outline-none focus:text-gray-700 mt-4"
				role="button"
				onClick={handleThemeToggle}
				aria-label="Switch to dark mode"
			/>
		)
	}

	return <div>{renderThemeChanger()}</div>
}
