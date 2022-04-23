import { CountriesActionType } from 'types';
import { apiRequests } from 'utils';

export function getCountries(url = '') {
  return async function (dispatch: any) {
    dispatch({ type: CountriesActionType.GET_COUNTRIES_LIST_LOADING });

    try {
      const response = await apiRequests({
        method: 'get',
        url,
      });
      dispatch({
        type: CountriesActionType.GET_COUNTRIES_LIST_SUCCESS,
        payload: response,
      });
    } catch (error: any) {
      dispatch({
        type: CountriesActionType.GET_COUNTRIES_LIST_FAILED,
      });
    }
  };
}

export const getSingleCountry =
  (name: string | string[]) => async (dispatch: any) => {
    dispatch({ type: CountriesActionType.GET_SINGLE_COUNTRY_LOADING });
    try {
      const response = await apiRequests({
        method: 'get',
        url: `https://restcountries.com/v3.1/name/${name}`,
      });
      dispatch({
        type: CountriesActionType.GET_SINGLE_COUNTRY_SUCCESS,
        payload: response,
      });
    } catch (error: any) {
      dispatch({
        type: CountriesActionType.GET_SINGLE_COUNTRY_FAILED,
      });
    }
  };

// export const getCountries = (url: string) => async (dispatch: any) => {
//   dispatch({ type: CountriesActionType.GET_COUNTRIES_LIST_LOADING });
//   try {
//     const response = await apiRequests({
//       method: 'get',
//       url,
//     });
//     dispatch({
//       type: CountriesActionType.GET_COUNTRIES_LIST_SUCCESS,
//       payload: response,
//     });
//   } catch (error: any) {
//     dispatch({
//       type: CountriesActionType.GET_COUNTRIES_LIST_FAILED,
//     });
//   }
// };
