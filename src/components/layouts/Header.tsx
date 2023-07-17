import Link from 'next/link';
import DarkModSwitch from '../ui/DarkModSwitch';
import { FaGlobe } from 'react-icons/fa';

import Auth from '../auth/Auth';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow dark:border-gray-700 dark:bg-[#212E37] dark:shadow-lg">
      <div className="mx-auto flex w-full max-w-[82rem] items-center justify-between p-4 py-6">
        <div className="cursor-pointer whitespace-nowrap font-sans text-[1.2rem] font-bold tracking-tight text-slate-900 dark:text-white">
          <Link href="/">
            <h1 className="flex cursor-pointer select-none items-center text-lg font-bold sm:text-2xl">
              <FaGlobe
                className="mr-4 h-6 w-6 sm:h-10 sm:w-10 sm:text-4xl text-gray-900 dark:text-white"
                role="button"
              />
              <span className="hidden sm:inline-block">
                {' '}
                Where in the world?
              </span>
            </h1>
          </Link>
        </div>
        <div className="items-center justify-end space-x-10  w-full flex">
          <DarkModSwitch />
          <Auth />
        </div>
      </div>
    </header>
  );
}

export default Header;
