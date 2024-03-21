import React, { useEffect, useState } from "react";
import JobOfferList from "../../components/home_job_offers/JobOfferList";
import {getHomeJobOffers} from "../../services/JobOfferService";
import { useLocation } from "react-router-dom";
import Pagination from "../../components/home_job_offers/Pagination";
import FilterPanel from "../../components/home_job_offers/FilterPanel";
import {defaultQueryParams, QueryParams} from "../../models/QueryParams";
import SecondWrapper from "../../components/SecondWrapper";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";
import SearchBar from "../../components/home_job_offers/SearchBar";
import SortPanel from "../../components/home_job_offers/SortPanel";

const Home: React.FC = () => {
  const searchParams = new URLSearchParams(useLocation().search);

  const initializeQueryParams = (): QueryParams => ({
    search: searchParams.get("q") ? searchParams.get("q") : defaultQueryParams.search,
    languages: searchParams.get("languages")?.split(",") || defaultQueryParams.languages,
    minCredits: searchParams.get("minCredits") ? parseInt(searchParams.get("minCredits")) : defaultQueryParams.minCredits,
    maxCredits: searchParams.get("maxCredits") ? parseInt(searchParams.get("maxCredits")) : defaultQueryParams.maxCredits,
    minSalary: searchParams.get("minSalary") ? parseInt(searchParams.get("minSalary")) : defaultQueryParams.minSalary,
    maxSalary: searchParams.get("maxSalary") ? parseInt(searchParams.get("maxSalary")) : defaultQueryParams.maxSalary,
    minOpensIn: searchParams.get("minOpensIn") ? (searchParams.get("minOpensIn")) : defaultQueryParams.minOpensIn,
    maxOpensIn: searchParams.get("maxOpensIn") ? (searchParams.get("maxOpensIn")) : defaultQueryParams.maxOpensIn,
    sort: searchParams.get("sort") || defaultQueryParams.sort,
    page: searchParams.get("page") ? parseInt(searchParams.get("page")) : defaultQueryParams.page
  }) as QueryParams;

  const [queryParams, setQueryParams] = useState<QueryParams>(initializeQueryParams);

  const handleQueryParamChange = (key: string, value: any) => {
    setQueryParams(prevParams => ({ ...prevParams, [key]: value }));
  };

  const [maxPage, setMaxPage] = useState<number>(1);

  const [jobOffers, setJobOffers] = useState<JobOfferListedDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHomeJobOffers(queryParams);
        if (response.ok) {
          const json = await response.json();

          setMaxPage(json.totalPages);
          setJobOffers(json.content);

        }
      } catch (error) {
        console.error("Error fetching jobOffers:", error);
      }
    };

    fetchData();
  }, [queryParams]);


  return (
    // <div className="flex flex-col justify-between w-full xl:w-[60%] mx-auto">
    <SecondWrapper>
      <div className="flex flex-col gap-x-10 h-full w-[100%]  items-center lg:items-baseline">
        <div className="w-full flex flex-col-reverse gap-x-10 lg:flex-row justify-center">
          <div className="w-full lg:w-[70%] lg:max-w-[40rem]">
            <div className="flex justify-between mb-3 gap-4">
              <SearchBar
                  searchValue={queryParams.search}
                  handleQueryParamChange={handleQueryParamChange}
              />
              <SortPanel
                  sortValue={queryParams.sort}
                  handleQueryParamChange={handleQueryParamChange}
              />
            </div>

            <JobOfferList
                jobOffers={jobOffers}
            />
            <Pagination
                maxPages={maxPage}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
            />
          </div>
          <FilterPanel
              queryParams={queryParams}
              tasks={jobOffers}
              handleChange={handleQueryParamChange}
          />
        </div>
      </div>
    </SecondWrapper>
    // </div>
  );
};

export default Home;
