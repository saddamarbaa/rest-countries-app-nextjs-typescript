import React from 'react'

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../ui'

export default function Auth() {
	return (
		<div className="w-fit">
			<SignedIn>
				<UserButton />
			</SignedIn>

			<SignedOut>
				<SignInButton mode="modal">
					<Button className="lowercase py-2 text-lg">Sign In</Button>
				</SignInButton>
			</SignedOut>
		</div>
	)
}
