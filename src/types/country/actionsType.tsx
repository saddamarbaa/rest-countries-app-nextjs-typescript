// REDUX ACTION TYPES

import { Action } from 'redux';

import { CountryType } from './_prototype';

export enum CountriesActionType {
  GET_COUNTRIES_LIST_LOADING = 'GET_COUNTRIES_LIST_LOADING',
  GET_COUNTRIES_LIST_SUCCESS = 'GET_COUNTRIES_LIST_SUCCESS',
  GET_COUNTRIES_LIST_FAILED = 'GET_COUNTRIES_LIST_FAILED',
  GET_COUNTRIES_LIST_REST = 'GET_COUNTRIES_LIST_REST',
  GET_SINGLE_COUNTRY_LOADING = 'GET_SINGLE_COUNTRY_LOADING',
  GET_SINGLE_COUNTRY_SUCCESS = 'GET_SINGLE_COUNTRY_SUCCESS',
  GET_SINGLE_COUNTRY_FAILED = 'GET_SINGLE_COUNTRY_FAILED',
  HYDRATE = 'HYDRATE',
}

export interface actionGetCountriesIsPending extends Action {
  type: CountriesActionType.GET_COUNTRIES_LIST_LOADING;
}

export interface actionGetCountriesIsSuccess extends Action {
  type: CountriesActionType.GET_COUNTRIES_LIST_SUCCESS;
  payload: CountryType[];
}

export interface actionGetCountriesIsError extends Action {
  type: CountriesActionType.GET_COUNTRIES_LIST_FAILED;
  payload: string;
}

export interface actionGetCountriesIsRest extends Action {
  type: CountriesActionType.GET_COUNTRIES_LIST_REST;
}

export interface actionGetSingleCountryIsPending extends Action {
  type: CountriesActionType.GET_SINGLE_COUNTRY_LOADING;
}

export interface actionGetSingleCountryIsSuccess extends Action {
  type: CountriesActionType.GET_SINGLE_COUNTRY_SUCCESS;
  payload: CountryType[];
}

export interface actionGetSingleCountryIsError extends Action {
  type: CountriesActionType.GET_SINGLE_COUNTRY_FAILED;
}

export interface actionHYDRATE extends Action {
  type: '__NEXT_REDUX_WRAPPER_HYDRATE__';
  payload: {
    list: CountryType[];
    getCountriesIsLoading: boolean;
    getCountriesIsSuccess: boolean;
    getCountriesItIsError: boolean;
    getCountriesMessage: string;

    country: CountryType[];
    getSingleIsLoading: boolean;
    getSingleIsSuccess: boolean;
    getSingleIsError: boolean;
    getSingleIsMessage: string;
  };
}

export type CountriesAction =
  | actionGetCountriesIsPending
  | actionGetCountriesIsSuccess
  | actionGetCountriesIsError
  | actionGetCountriesIsRest
  | actionGetSingleCountryIsPending
  | actionGetSingleCountryIsSuccess
  | actionGetSingleCountryIsError
  | actionHYDRATE;
