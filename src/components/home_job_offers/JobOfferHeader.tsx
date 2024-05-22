import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faTrophy, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { formatDistance } from "date-fns";
import { differenceInMinutes } from "date-fns";
import TaskStatus from "../../models/TaskStatus";
import MeritCoin from "../../assets/meritcoin.png";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";

const JobOfferHeader: React.FC<{ jobOffer: JobOfferListedDTO }> = ({ jobOffer }) => {
    const solvingTime = differenceInMinutes(new Date(jobOffer.closesAt), new Date(jobOffer.opensAt));

    return (
        <div className="font-semibold py-2.5 pt-3.5 px-4 flex flex-wrap xs:flex-row justify-between items-center gap-2 gap-y-4">
            <div className="flex gap-x-7 gap-y-3 flex-wrap xs:flex-nowrap">
                <div>
          <span className="flex items-center text-merit-credits-color font-medium">
            <FontAwesomeIcon icon={faTrophy} className="mr-2" />
              {jobOffer.reward}
              <img src={MeritCoin} className="w-3.5 h-3.5 ml-1" alt="MeritCoin" />
          </span>
                </div>
                <span className="flex items-center text-task-lighter truncate max-w-[12rem] gap-1">
          <FontAwesomeIcon icon={faClock} className="mr-1" />
          <span className="font-medium text-white">
            {solvingTime} MINUTES
          </span>
        </span>
                <span className="flex items-center text-task-lighter truncate max-w-[12rem] gap-1">
          <FontAwesomeIcon icon={faCalendar} className="mr-1" />
          <p>
            <span
                className={`font-medium ${
                    jobOffer.status === TaskStatus.OPEN
                        ? "text-emerald-400"
                        : jobOffer.status === TaskStatus.EXPIRED
                            ? "text-red-500"
                            : "text-orange-400"
                }`}
            >
              {jobOffer.status === TaskStatus.OPEN
                  ? "OPEN NOW"
                  : jobOffer.status === TaskStatus.EXPIRED
                      ? "CLOSED"
                      : "OPENS IN " + formatDistance(new Date(), jobOffer.opensAt, { addSuffix: false }).toUpperCase()}
            </span>
          </p>
        </span>
            </div>
            <span className="flex justify-start text-task-lighter font-medium">
        <FontAwesomeIcon icon={faBookmark} />
        <span className="block xs:hidden ml-2">ADD TO BOOKMARKS</span>
      </span>
        </div>
    );
};

export default JobOfferHeader;
