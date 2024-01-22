
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Auth() {
  
  return (
    <div className="w-fit">
       <SignedIn>
          <UserButton afterSignOutUrl='/' />
      </SignedIn>
      
        <SignedOut>
          <SignInButton mode='modal'>
             <Button className="lowercase py-2 text-lg">Sign In</Button>
          </SignInButton>
        </SignedOut>
  </div>
  )
}