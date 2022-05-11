import { connect } from 'react-redux';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { Map } from '@/components';
import { nextReduxWrapperTS as wrapper, ReducerType } from '@/global-states';
import {
  _countryReducerState as ReducerState,
  CountriesActionType,
  CountryType,
} from '@/types';

// props passed in to the component
interface OwnProps {
  country: CountryType[];
}

// props from connect mapStateToProps
interface MapStateProps {
  listState: ReducerState;
}

// type PropsType = OwnProps & MapDispatchProps & MapStateProps;
type PropsType = OwnProps & MapStateProps;

function Index({ listState }: PropsType) {
  const { country, getSingleIsLoading } = listState;
  const router = useRouter();

  return (
    <>
      {country && country.length > 0 && (
        <Head>
          <title> {country[0]?.name?.official}</title>
          <meta
            name="description"
            content={country[0]?.name?.nativeName?.ara?.official}
          />
        </Head>
      )}
      <div className="mx-auto  w-full max-w-[82rem] p-4 ">
        <div className="item-center mt-[3rem] flex space-x-[4rem]">
          <div className=" max-w-[95%]  xl:w-96 ">
            <div
              className=" flex cursor-pointer  items-center justify-center   rounded p-3 shadow ring-1 ring-slate-900/5 dark:bg-slate-900 sm:max-w-[100px]"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon
                className="mr-2 h-4 w-4  text-slate-500  dark:text-slate-400"
                role="button"
                onClick={() => router.back()}
              />
              <button
                type="button"
                className="text-slate-500  dark:text-slate-400"
              >
                Back
              </button>
            </div>
          </div>
          {getSingleIsLoading && (
            <div className=" hidden w-full     p-3  text-base  font-semibold text-slate-500  dark:text-slate-200 sm:inline-flex">
              Searching ...
            </div>
          )}
        </div>

        {country && country.length > 0 && (
          <div className="mb-8 mt-8   dark:bg-[#212E37] dark:text-gray-100  ">
            <div className="w-full max-w-[95%]   rounded-lg  shadow-xl ring-1 ring-slate-900/5 transition-transform duration-300 ease-out   sm:rounded-none sm:shadow-none sm:ring-0">
              <div className="flex flex-col sm:flex lg:h-[400px] lg:flex-row lg:space-x-10 xl:space-x-20">
                <div className="relative h-[300px] lg:h-auto lg:basis-1/2">
                  <Image
                    src={country[0]?.flags.png}
                    placeholder="blur"
                    blurDataURL={country[0]?.flags.png}
                    alt={`The flag of ${country[0]?.name?.official}`}
                    layout="fill"
                    objectFit="cover"
                    className="overflow-hidden rounded"
                  />
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="sm:flex sm:space-x-5">
                    <div>
                      <div className="p-4 pb-0 text-[1.1rem] font-bold  tracking-tight text-slate-600 dark:text-white sm:pt-0">
                        {country[0]?.name?.official}
                      </div>
                      <div className="flex flex-col space-y-2 p-4">
                        <div>
                          <span className="font-bold  text-slate-500 dark:text-slate-400">
                            Native Name:{' '}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {country[0]?.name?.nativeName?.ara?.official}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">
                            Population:{' '}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {country[0]?.population}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">
                            Region:{' '}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {country[0]?.region}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">
                            Sub Region:{' '}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {country[0]?.subregion}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">
                            Capital:{' '}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {country[0]?.capital}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex  flex-col space-y-2 p-4 pt-0">
                      {country[0]?.currencies && (
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">
                            Currencies:{' '}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/*  @ts-ignore */}
                            {Object.values(country[0]?.currencies)[0]?.name}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-slate-500 dark:text-slate-400">
                          languages:{' '}
                        </span>
                        {country[0]?.languages &&
                          Object.values(country[0]?.languages).map(
                            (item: any) => (
                              <span
                                key={uuidv4()}
                                className="text-slate-500 dark:text-slate-400"
                                style={{ minWidth: '80px' }}
                              >
                                {item}{' '}
                              </span>
                            )
                          )}
                      </div>
                      <div>
                        {' '}
                        <a
                          key={uuidv4()}
                          style={{ minWidth: '80px' }}
                          className=" m-2 flex  max-w-[220px] cursor-pointer  items-center justify-center overflow-hidden rounded p-2 shadow ring-1 ring-slate-900/5 dark:bg-slate-900"
                          href={country[0].maps.googleMaps}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View On Google Map
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex  max-w-xl flex-col space-y-2 p-4 pt-0">
                    <div className="items-center sm:flex">
                      <span className="font-bold text-slate-500 dark:text-slate-400">
                        Borders Currencies:{' '}
                      </span>

                      <div className="flex flex-wrap items-center justify-between">
                        {country[0]?.borders?.map((item: string) => (
                          <a
                            key={uuidv4()}
                            style={{ minWidth: '80px' }}
                            className=" m-2  flex  max-w-[100px] cursor-pointer   items-center justify-center rounded p-2 shadow ring-1 ring-slate-900/5 dark:bg-slate-900"
                            href={`${window.location.origin}/country/${item}`}
                          >
                            {item}
                          </a>
                        ))}
                        {!country[0]?.borders && (
                          <p className="ml-4 text-slate-500 dark:text-slate-400">
                            None
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {country && !country.length && (
          <div className="mt-[3rem] w-full max-w-[90%] rounded-lg p-6 text-center shadow dark:bg-[#212E37] dark:text-gray-100 dark:shadow-lg sm:text-left">
            No Data Found
          </div>
        )}
      </div>
      {country && country.length > 0 && (
        <div>
          <Map
            latitude={country[0].capitalInfo.latlng[0]}
            longitude={country[0].capitalInfo.latlng[1]}
          />
        </div>
      )}
    </>
  );
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const { name } = query;

    // Fetch data from external API
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await response.json();

    if (!data) {
      store.dispatch({
        type: CountriesActionType.GET_SINGLE_COUNTRY_FAILED,
        payload: [],
      });
      return {
        notFound: true,
      };
    }

    store.dispatch({
      type: CountriesActionType.GET_SINGLE_COUNTRY_SUCCESS,
      payload: data,
    });

    // Pass data to the page via props
    return { props: { countries: data } };
  });

const mapStateToProps = (state: ReducerType) => ({
  listState: state.list,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
