"use client";

import { CountryType } from "@/types";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BeatLoader } from "react-spinners";

import Card from "./Card";
import { useDebounce } from "@/hooks";

type Props = {
  initialCountries: CountryType[];
};

export function Results({ initialCountries }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [region, setRegion] = useState("");
  const [countries, setCountries] = useState(initialCountries || []);
  const [error, setError] = useState("");

  // Debounce the search term to reduce API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const getCountries = async (url: string) => {
      try {
        setIsLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = (await response.json()) || [];
        setCountries(data);
        setError("");
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    let url = "https://restcountries.com/v3.1/all";
    if (debouncedSearchTerm) {
      url = `https://restcountries.com/v3.1/name/${debouncedSearchTerm}`;
    } else if (region && region !== "All") {
      url = `https://restcountries.com/v3.1/region/${region}`;
    }

    if (searchTerm || region) {
      getCountries(url);
    }
  }, [region, debouncedSearchTerm]);

  return (
    <div className="mx-auto flex w-full max-w-[82rem] flex-1 flex-col p-4">
      <div className="mx-auto w-full max-w-[82rem] p-4">
        <div className="flex w-full flex-col items-center">
          <div className="w-full max-w-[90%] justify-between space-y-8 pb-[2.2rem] pt-[2.2rem] sm:flex sm:space-y-0 lg:max-w-[100%]">
            <div className="form-control dar:shadow-xl font-norma xl:max-w-96 mb-3 flex w-full items-center rounded bg-white px-4 py-4 text-base shadow ring-1 ring-slate-900/5 dark:bg-slate-900 sm:w-96">
              <FiSearch
                className="h-5 w-5 text-[1.1rem] tracking-tight text-slate-500 dark:text-slate-400"
                role="button"
              />
              <input
                type="search"
                className="flex-1 bg-transparent px-4 focus:outline-none"
                placeholder="Search for country"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            {isLoading && (
              <div className="hidden w-full max-w-[300px] items-center sm:flex">
                <span className="mr-4 justify-center text-base font-bold text-slate-500 dark:text-slate-200">
                  Searching
                </span>
                <span className="pt-2">
                  <BeatLoader color="#FFA500" />
                </span>
              </div>
            )}

            <div className="mb-3 cursor-pointer sm:ml-6">
              <select
                onChange={(event) => setRegion(event.target.value)}
                className="form-control dar:shadow-xl font-norma l dark:bg-dark-element-bg block w-full rounded bg-white px-4 py-4 text-base shadow ring-1 ring-slate-900/5 focus:outline-none dark:bg-slate-900 sm:text-[1.2rem]"
                aria-label="form-select-lg"
                defaultValue="Filter by region"
                value={region}
              >
                <option value="" disabled>
                  Filter by region
                </option>
                <option value="All">Show All</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="America">America</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col items-center">
        {countries && countries.length === 0 ? (
          <div className="my-auto w-full max-w-[90%] rounded-lg bg-white p-4 py-6 text-center shadow-md ring-1 ring-slate-900/5 dark:bg-slate-900 dark:text-gray-100 dark:shadow-lg lg:max-w-[100%]">
            <p className="mb-4 text-xl font-bold">No results found</p>
            <p className="text-lg text-gray-600 dark:text-gray-100">
              We couldnt find any results matching your search. Please try again
              with different keywords.
            </p>
          </div>
        ) : null}
        <div className="mb-8 grid w-full max-w-[90%] grid-cols-1 gap-16 sm:grid-cols-2 lg:max-w-[100%] lg:grid-cols-3 xl:grid-cols-4">
          {countries.length > 0 &&
            countries.map((country) => (
              <Card key={country.cca3} country={country} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
