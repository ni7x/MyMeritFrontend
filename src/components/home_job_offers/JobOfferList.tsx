import React from "react";
import JobOffer from "./JobOffer";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";

const JobOfferList: React.FC<{ jobOffers: JobOfferListedDTO[] }> = ({ jobOffers }) => {
  return (
    <div
      className={`w-full flex flex-col align-center justify-center`}
    >
      {jobOffers.length === 0
        ? <p className="h-[32rem]">No tasks</p>
        : jobOffers.map((jobOffer) => <JobOffer key={jobOffer.id} jobOffer={jobOffer} />)}
    </div>
  );
};

export default JobOfferList;
