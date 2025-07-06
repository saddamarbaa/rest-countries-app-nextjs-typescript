'use client'

import { ClerkProvider } from '@clerk/nextjs'
import React, { ReactNode } from 'react'
import { Toaster as ToastProvider } from 'react-hot-toast'

type Props = {
	children: ReactNode
}

export default function Providers({ children }: Props) {
	return (
		<ClerkProvider>
			{children}
			<ToastProvider position="top-right" />
		</ClerkProvider>
	)
}
