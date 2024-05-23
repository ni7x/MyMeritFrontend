import React from "react";
import JobOffer from "./JobOffer";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";
import NoItemsFound from "../NoItemsFound";

const JobOfferList: React.FC<{ jobOffers: JobOfferListedDTO[], isFullView: boolean }> = ({ jobOffers, isFullView }) => {
  return (
    <div
      className={`w-full flex flex-row flex-wrap align-center gap-4`}
    >
      {!jobOffers || jobOffers.length === 0
        ? <div className="h-[32rem] w-full"><NoItemsFound itemName="tasks"/></div>
        : jobOffers.map((jobOffer) => <JobOffer isFullView={isFullView} key={jobOffer.id} jobOffer={jobOffer} />)}
    </div>
  );
};

export default JobOfferList;
