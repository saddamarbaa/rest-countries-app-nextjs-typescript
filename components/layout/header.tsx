import React from 'react'
import { MoonIcon } from '@heroicons/react/outline'

const Header = () => {
	return (
		<header className="bg-white shadow sticky top-0 z-50">
			<div className="w-full max-w-[82rem] mx-auto flex items-center justify-between p-4 py-6 ">
				<div className="font-bold cursor-pointer text-[1.2rem]">
					Where in the world?
				</div>
				<div className="flex items-center space-x-2">
					<MoonIcon className="h-5 cursor-pointer mt-1" />
					<p className="cursor-pointer text-gray-700">Dark Mode</p>
				</div>
			</div>
		</header>
	)
}

export default Header
