import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import listReducer from './countryReducer';

export const rootReducer = combineReducers({
  list: listReducer,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const masterReducer = (state, action) => {
  if (action.type && action.type === HYDRATE) {
    // console.log('action.type', action.payload?.list?.countries);
    const nextState = {
      ...state,
      list: {
        countries: [
          ...new Set([
            ...action.payload.list.countries,
            ...state.list.countries,
          ]),
        ],
        country: [
          ...new Set([...action.payload.list.country, ...state.list.country]),
        ],
        getCountriesIsLoading: false,
        getCountriesIsSuccess: true,
        getCountriesItIsError: false,
        getCountriesMessage: '',
        getSingleIsLoading: false,
        getSingleIsSuccess: true,
        getSingleIsError: false,
        getSingleIsMessage: '',
      },
    };
    return nextState;
  }

  return rootReducer(state, action);
};

// RootState[type]
export type ReducerType = ReturnType<typeof masterReducer>;

export default masterReducer;
