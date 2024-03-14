import React, { useEffect, useState } from "react";
import JobOfferList from "../../components/home_job_offers/JobOfferList";
import Task from "../../models/Task";
import {getHomeJobOffers} from "../../services/JobOfferService";
import { useLocation } from "react-router-dom";
import Pagination from "../../components/home_job_offers/Pagination";
import FilterPanel from "../../components/home_job_offers/FilterPanel";
import QueryParams from "../../models/QueryParams";
import SecondWrapper from "../../components/SecondWrapper";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";

const Home: React.FC = () => {
  const searchParams = new URLSearchParams(useLocation().search);

  const page = searchParams.get("page")
      ? parseInt(searchParams.get("page"), 10)
      : 1;

  const languages = searchParams.get("languages");

  const minCredits = searchParams.get("minCredits")
      ? parseInt(searchParams.get("minCredits"))
      : undefined;
  const maxCredits = searchParams.get("maxCredits")
      ? parseInt(searchParams.get("maxCredits"))
      : undefined;

  const opensIn = searchParams.get("opensIn")
      ? parseInt(searchParams.get("opensIn"))
      : undefined;

  const sort = searchParams.get("sort")
      ? (searchParams.get("sort"))
      : undefined;

    const queryParams: QueryParams = {
        languages: languages,
        minCredits: minCredits,
        maxCredits:maxCredits,
        opensIn: opensIn,
        sort: sort
    };

  const [maxPage, setMaxPage] = useState<number>(1);
  const [jobOffers, setJobOffers] = useState<JobOfferListedDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHomeJobOffers(page, queryParams);
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
  }, [page, languages, minCredits, maxCredits, opensIn, sort]);


  return (
    // <div className="flex flex-col justify-between w-full xl:w-[60%] mx-auto">
    <SecondWrapper>
      <div className="flex flex-col gap-x-10 h-full w-[100%]  items-center lg:items-baseline">
        <div className="w-full flex flex-col-reverse gap-x-10 lg:flex-row justify-center">
          <div className="w-full lg:w-[70%] lg:max-w-[40rem]">
            <JobOfferList jobOffers={jobOffers} />
            <Pagination page={page} maxPages={maxPage} queryParams={queryParams} />
          </div>
          <FilterPanel queryParams={queryParams} tasks={jobOffers} />
        </div>
      </div>
    </SecondWrapper>
    // </div>
  );
};

export default Home;
