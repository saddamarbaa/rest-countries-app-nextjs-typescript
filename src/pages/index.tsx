import React from 'react';
import { connect } from 'react-redux';
import { GetServerSideProps } from 'next';

import { nextReduxWrapperTS as wrapper, ReducerType } from '@/global-states';
import MainContent from '@/page-components/home-page/index';
import { CountriesActionType, CountryType } from '@/types';

type Props = {
  countries: CountryType[];
  store: ReducerType;
};

function HomePageIndex({ store, countries }: Props) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(store.list.countries, countries);
  }

  return <MainContent />;
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    // Fetch data from external API
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();

    if (!data) {
      store.dispatch({
        type: CountriesActionType.GET_COUNTRIES_LIST_FAILED,
        payload: [],
      });
      return {
        notFound: true,
      };
    }

    store.dispatch({
      type: CountriesActionType.GET_COUNTRIES_LIST_SUCCESS,
      payload: data,
    });

    // Pass data to the page via props
    return { props: { countries: data } };
  });

// you can also use Redux `useSelector` and other hooks instead of `connect()
const mapStateToProps = (state: ReducerType) => ({
  store: state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageIndex);
