import React from "react";
import JobOfferHeader from "./JobOfferHeader";
import CompanyTooltip from "./CompanyTooltip";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";
import JobOfferDetailsList from "./JobOfferDetailsList";

const JobOffer: React.FC<{ jobOffer: JobOfferListedDTO, isFullView: boolean }> = ({ jobOffer, isFullView }) => {

  return (
      <div className={"bg-secondary-bg-color rounded xl:max-w-full border-[0px] border-main-border " + (isFullView ? "w-full": "w-full lg:w-[49%]")}>
        <div className="text-[0.8725rem]">
          <JobOfferHeader jobOffer={jobOffer} />
        </div>
          <JobOfferDetailsList jobOffer={jobOffer} isFullView={isFullView} />
        <CompanyTooltip jobOffer={jobOffer} />
      </div>
  );
};

export default JobOffer;
