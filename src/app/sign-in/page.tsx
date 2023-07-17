'use client';

import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <div className="flex min-h-screen flex-col pb-64">
      {status !== 'loading' ? (
        <div className="p-5 flex-1 flex items-center">
          <section className="py-8 max-w-sm mx-auto w-full flex flex-col space-y-5 border border-gray-200 p-4 rounded mt-12 dark:border-gray-700">
            <h1 className="text-center text-3xl font-bold dark:text-white">
              Sign In
            </h1>
            <Button
              onClick={() => signIn('google')}
              isLoading={false}
              Icon={FcGoogle}
              className="uppercase"
            >
              Sign Up with Google
            </Button>
            <Button
              onClick={() => signIn('github')}
              isLoading={false}
              Icon={BsGithub}
              className="uppercase"
            >
              Sign Up with GitHub
            </Button>
          </section>
        </div>
      ) : (
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center px-6 py-12 w-full">
          <p className="mt-8 w-full max-w-lg rounded border bg-white dark:bg-gray-800 p-6 text-center font-bold text-gray-900 dark:text-gray-100">
            Initializing User...
          </p>
        </div>
      )}
    </div>
  );
}
