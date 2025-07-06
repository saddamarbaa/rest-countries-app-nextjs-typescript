'use client'

import React, { useState } from 'react'
type Props = {
	children: React.ReactNode
}
export default function ClientComponent({ children }: Props) {
	const [name] = useState(' tets bane')
	return (
		<div>
			<p>ClientComponent {name} </p>
			{children}
		</div>
	)
}
