'use client'

import * as React from 'react'
import {
	ThemeProvider as NextThemesProvider,
	ThemeProviderProps,
} from 'next-themes'
import { clientSideFunction } from '@/lib/client-utils'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	clientSideFunction()

	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
