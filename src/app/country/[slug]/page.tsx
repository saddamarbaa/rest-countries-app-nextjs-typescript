import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BiLeftArrowAlt } from 'react-icons/bi';

import { CountryType } from '@/types';
import { delay } from '@/lib';
import { Button, Map } from '@/components';

type Props = {
  params: {
    slug: string;
  };
};

export const dynamicParams = true;

async function getSingleCountryData(
  name: string
): Promise<CountryType[] | null> {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    let errorMessage = 'Failed to fetch data';

    if (res.status === 404) {
      errorMessage = 'Country not found';
    } else if (res.status === 500) {
      errorMessage = 'Server error';
    }

    throw new Error(errorMessage);
  }

  const countryData = await res.json();
  return countryData as CountryType[];
}

export default async function SingleCountryPage(props: Props) {
  // await delay(3000); // Delay for 3000 milliseconds (3 seconds)

  const country = (await getSingleCountryData(
    props.params.slug || ''
  )) as CountryType[];

  if (!country) {
    return notFound();
  }

  if (country && !country.length) {
    return (
      <div className="mx-auto w-full max-w-[82rem] p-4 flex-1 flex flex-col">
        <div className="flex w-full flex-col items-center flex-1">
          <div className="w-full max-w-[90%] rounded-lg bg-white p-4 my-auto py-6 shadow-md ring-1 ring-slate-900/5 dark:bg-slate-900 dark:text-gray-100 dark:shadow-lg lg:max-w-[100%] text-center">
            <p className="text-xl font-bold mb-4">No results found</p>
            <p className="text-lg text-gray-600 dark:text-gray-100">
              We couldnt find any results matching your search. Please try again
              with different keywords.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto  w-full max-w-[82rem] py-6  p-4 ">
        {country && country.length > 0 && (
          <div className="item-center mt-[3rem] flex space-x-[4rem]">
            <div className="w-full max-w-[95%]  xl:w-96 ">
              <Link
                className="flex cursor-pointer  items-center w-full"
                href="/"
              >
                <Button className="sm:max-w-[120px] px-2">
                  <BiLeftArrowAlt className="mr-4 text-2xl" role="button" />
                  <span> Back</span>
                </Button>
              </Link>
            </div>
          </div>
        )}

        {country && country.length > 0 && (
          <div className="mb-8 mt-8 bg-customWhite-100 dark:bg-customBlack-900  ">
            <div className="w-full max-w-[95%]   rounded-lg  shadow ring-1 ring-slate-900/5 transition-transform duration-300 ease-out sm:rounded-none sm:shadow-none sm:ring-0">
              <div className="flex flex-col sm:flex lg:flex-row space-y-4 lg:space-x-10 xl:space-x-20">
                <div className="relative h-[300px] lg:h-auto lg:basis-1/2 overflow-hidden rounded transition-transform duration-300 ease-out transform-gpu hover:scale-105 max-h-[400px]">
                  <Image
                    src={country[0]?.flags.png}
                    placeholder="blur"
                    blurDataURL={country[0]?.flags.png}
                    alt={`The flag of ${country[0]?.name?.official}`}
                    fill
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="sm:flex sm:space-x-5">
                    <div>
                      <div className="p-4 pb-0 text-[1.1rem] font-bold  tracking-tight sm:pt-0">
                        {country[0]?.name?.official}
                      </div>
                      <div className="flex flex-col space-y-2 p-4">
                        <div>
                          <span className="font-bold">Native Name: </span>
                          <span>
                            {country[0]?.name?.nativeName?.ara?.official}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold">Population: </span>
                          <span>{country[0]?.population}</span>
                        </div>
                        <div>
                          <span className="font-bold">Region: </span>
                          <span>{country[0]?.region}</span>
                        </div>
                        <div>
                          <span className="font-bold">Sub Region: </span>
                          <span>{country[0]?.subregion}</span>
                        </div>
                        <div>
                          <span className="font-bold">Capital: </span>
                          <span>{country[0]?.capital}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex  flex-col space-y-2 p-4 pt-0">
                      {country[0]?.currencies && (
                        <div>
                          <span className="font-bold">Currencies: </span>
                          <span>
                            {/*  @ts-ignore */}
                            {Object.values(country[0]?.currencies)[0]?.name}
                          </span>
                        </div>
                      )}
                      <div className="flex sm:flex-row sm:space-x-5 overflow-hidden">
                        <span className="font-bold">languages: </span>
                        {country[0]?.languages &&
                          Object.values(country[0]?.languages).map(
                            (item: any, index) => (
                              <span key={index} style={{ minWidth: '80px' }}>
                                {item}{' '}
                              </span>
                            )
                          )}
                      </div>

                      <div className="pt-4 sm:pt-0">
                        <a
                          href={country[0].maps.googleMaps}
                          target="_blank"
                          rel="noreferrer"
                          className="block"
                        >
                          <Button className="w-full whitespace-nowrap px-2">
                            View On Google Map
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex  max-w-xl flex-col space-y-2 p-4 pt-0">
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0  sm:space-x-5">
                      <span className="font-bold whitespace-nowrap mt-2">
                        Borders Currencies:{' '}
                      </span>

                      <div className="flex flex-wrap w-full">
                        {country[0]?.borders?.map((item: string, index) => (
                          <Link
                            key={index}
                            style={{ minWidth: '90px' }}
                            href={`/country/${item}`}
                            className="flex mb-5 sm:ml-4 w-full sm:w-fit"
                          >
                            <Button
                              isDisabled={false}
                              isLoading={false}
                              className="px-2"
                            >
                              {item}
                            </Button>
                          </Link>
                        ))}

                        {!country[0]?.borders && (
                          <Button className="ml-4">None Borders Found</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {country && country.length > 0 && (
        <div className="pt-8">
          <Map
            latitude={country[0]?.capitalInfo?.latlng[0] || 0}
            longitude={country[0]?.capitalInfo?.latlng[1] || 0}
          />
        </div>
      )}
    </>
  );
}
