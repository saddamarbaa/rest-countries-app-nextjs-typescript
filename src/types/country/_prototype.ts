export type CountryType = {
  name: {
    official: string;
    nativeName?: {
      ara: {
        official: string;
      };
    };
  };
  region: string;
  population: number;
  capital: string[];
  flags: {
    png: string;
  };
  languages?: any;
  currencies?: any;
  subregion?: string;
  borders?: string[];
};

export interface _countryReducerState {
  countries: CountryType[];
  getCountriesIsLoading: boolean;
  getCountriesIsSuccess: boolean;
  getCountriesItIsError: boolean;
  getCountriesMessage: string;

  country: CountryType[];
  getSingleIsLoading: boolean;
  getSingleIsSuccess: boolean;
  getSingleIsError: boolean;
  getSingleIsMessage: string;
}

export interface storeType {
  countries: _countryReducerState;
}

export default storeType;
