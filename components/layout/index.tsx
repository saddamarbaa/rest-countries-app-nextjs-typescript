import React, { Fragment } from 'react'
import Header from './header'

type LayoutProps = {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
	return (
		<Fragment>
			<Header />
			<main className=" w-full mx-auto max-w-[82rem] p-4 ">
				{props.children}
			</main>
		</Fragment>
	)
}

export default Layout
