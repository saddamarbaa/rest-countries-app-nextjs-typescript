import {
  _countryReducerState as ReducerState,
  CountriesAction,
  CountriesActionType,
} from 'types';

export const initialState: ReducerState = {
  countries: [],
  getCountriesIsLoading: false,
  getCountriesIsSuccess: false,
  getCountriesItIsError: false,
  getCountriesMessage: '',

  country: [],
  getSingleIsLoading: false,
  getSingleIsSuccess: false,
  getSingleIsError: false,
  getSingleIsMessage: '',
};

export default function countryReducer(
  state = initialState,
  action: CountriesAction
) {
  switch (action?.type) {
    case CountriesActionType.GET_COUNTRIES_LIST_LOADING:
      return {
        ...state,
        getCountriesIsLoading: true,
        getCountriesIsSuccess: false,
        getCountriesItIsError: false,
        getCountriesMessage: 'loading',
      };
    case CountriesActionType.GET_COUNTRIES_LIST_SUCCESS:
      return {
        ...state,
        countries: action.payload || [],
        getCountriesIsLoading: false,
        getCountriesIsSuccess: true,
        getCountriesItIsError: false,
        getCountriesMessage: 'success',
      };
    case CountriesActionType.GET_COUNTRIES_LIST_FAILED:
      return {
        ...state,
        countries: [],
        getCountriesIsLoading: false,
        getCountriesIsSuccess: false,
        getCountriesItIsError: true,
        getCountriesMessage: 'error',
      };
    case CountriesActionType.GET_COUNTRIES_LIST_REST:
      return {
        ...state,
        countries: [],
        getCountriesIsLoading: false,
        getCountriesIsSuccess: false,
        getCountriesItIsError: false,
        getCountriesMessage: '',
      };
    case CountriesActionType.GET_SINGLE_COUNTRY_LOADING:
      return {
        ...state,
        getSingleIsLoading: true,
        getSingleIsSuccess: false,
        getSingleIsError: false,
        getSingleIsMessage: 'loading',
      };
    case CountriesActionType.GET_SINGLE_COUNTRY_SUCCESS:
      return {
        ...state,
        country: action.payload || [],
        getSingleIsLoading: false,
        getSingleIsSuccess: true,
        getSingleIsError: false,
        getSingleIsMessage: 'success',
      };
    case CountriesActionType.GET_SINGLE_COUNTRY_FAILED:
      return {
        ...state,
        country: [],
        getSingleIsLoading: false,
        getSingleIsSuccess: false,
        getSingleIsError: true,
        getSingleIsMessage: 'error',
      };
    default:
      return state;
  }
}
