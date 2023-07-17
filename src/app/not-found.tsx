'use client';

import { Button } from '@/components';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'Country App build with React + Next Js + TypeScript',
};

export default function PageNotFound() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className="grid place-items-center px-4 sm:px-6 py-12 sm:py-32">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl sm:text-5xl font-bold text-twitterBlue-500">
          404
        </h1>
        <p className="mb-6 text-xl sm:text-2xl font-semibold">
          Oops! Page not found
        </p>
        <p className="mb-10 text-lg">
          Were sorry. The page you requested could not be found. Please go back
          to the homepage or contact us.
        </p>
        <div className="flex w-full items-center justify-center">
          <Button className="max-w-sm sm:max-w-sm" onClick={handleClick}>
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
