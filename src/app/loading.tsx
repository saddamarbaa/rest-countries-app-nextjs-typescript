import React from "react";

export default function LoadingSkeleton() {
  const loadingItems = Array(12).fill(null);

  return (
    <div className="mx-auto flex w-full max-w-[82rem] flex-1 flex-col p-4">
      <div className="mx-auto w-full max-w-[82rem] p-4">
        <div className="flex w-full flex-col items-center">
          <div className="w-full max-w-[90%] justify-between space-y-8 pb-[2.2rem] pt-[2.2rem] sm:flex sm:space-y-0 lg:max-w-[100%]">
            <div className="form-control dar:shadow-xl font-norma xl:max-w-96 mb-3 flex w-full items-center rounded bg-white px-4 py-4 text-base shadow ring-1 ring-slate-900/5 dark:bg-slate-900 sm:w-96">
              <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-500"></div>
              <div className="ml-2 h-8 flex-1 rounded bg-gray-200 dark:bg-gray-500"></div>
            </div>
            <div className="hidden w-full max-w-[300px] items-center sm:flex">
              <div className="mr-4 justify-center text-base font-bold text-slate-500 dark:text-slate-200">
                Searching
              </div>
              <div className="flex items-center">
                <div className="ml-1 h-4 w-4 rounded-full bg-amber-500"></div>
                <div className="ml-1 h-4 w-4 rounded-full bg-amber-500"></div>
                <div className="ml-1 h-4 w-4 rounded-full bg-amber-500"></div>
              </div>
            </div>
            <div className="mb-3 cursor-pointer sm:ml-6">
              <div className="form-control dar:shadow-xl font-norma l dark:bg-dark-element-bg block w-full rounded bg-white px-4 py-4 text-base shadow ring-1 ring-slate-900/5 focus:outline-none dark:bg-slate-900 sm:text-[1.2rem] ">
                <div className="h-8 w-40 rounded bg-gray-200 dark:bg-gray-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col items-center">
        <div className="mb-8 grid w-full max-w-[90%] grid-cols-1 gap-16 sm:grid-cols-2 lg:max-w-[100%] lg:grid-cols-3 xl:grid-cols-4">
          {loadingItems.map((_, index) => (
            <div
              key={index}
              className="group m-4 mb-6 flex animate-pulse cursor-pointer flex-col rounded-lg border border-slate-400 p-4 shadow-md transition-shadow duration-200 hover:shadow-slate-400 dark:bg-gray-800 sm:m-2 sm:mb-2 sm:p-3"
            >
              <div className="h-64 w-full rounded-lg bg-gray-200 transition-opacity duration-200 group-hover:opacity-80 dark:bg-gray-500 sm:rounded-t-lg"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-500"></div>
                <div className="space-y-2">
                  <div className="h-4 rounded bg-gray-200 dark:bg-gray-500"></div>
                  <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
