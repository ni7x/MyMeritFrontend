import React from "react";
import { differenceInMinutes, formatDistance } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faLocationDot,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";
import TaskStatus from "../../models/TaskStatus";


const JobOffer: React.FC<{ jobOffer: JobOfferListedDTO }> = ({ jobOffer }) => {
  const solvingTime = differenceInMinutes( new Date(jobOffer.closesAt),  new Date(jobOffer.opensAt));

  return (
      <div className="flex-column bg-secondary-bg-color rounded xl:max-w-full">
        <div className="pt-2.5 px-4 text-[0.8725rem]">
          <div className="font-semibold mt-1 pb-4 flex justify-between items-center flex-wrap gap-2">
            <div className="flex gap-6">
              <div className="flex-row items-center">
                            <span className="flex items-center text-merit-credits-color font-semibold">
                                <FontAwesomeIcon icon={faTrophy} className="mr-2"/>
                              {jobOffer.reward} MC
                            </span>
              </div>
              <span className="flex items-center text-task-lighter truncate max-w-[12rem] gap-1">
                            <FontAwesomeIcon icon={faClock} className="mr-1"/>
                            <span className="font-semibold text-white">{solvingTime} MINUTES</span>
                        </span>
              <span className="flex items-center text-task-lighter  truncate max-w-[12rem] gap-1">
                            <FontAwesomeIcon icon={faCalendar} className="mr-1"/>
                            <p>
                                <span className={`font-semibold ${jobOffer.status == TaskStatus.OPEN ? "text-green-400" : jobOffer.status == TaskStatus.EXPIRED ? "text-red-500" : "text-white"}`}>
                                    {jobOffer.status == TaskStatus.OPEN ? "OPEN NOW" : jobOffer.status == TaskStatus.EXPIRED ? "CLOSED" : "OPENS IN" + formatDistance(new Date(), jobOffer.opensAt, { addSuffix: false })}
                                </span>
                            </p>
                        </span>
            </div>
          </div>
        </div>
        <div className="flex px-4">
          <img
              src={"data:image/png;base64," + jobOffer.company.imageBase64}
              className="w-[4.5rem] h-[4.5rem] rounded"
          />
          <div>
            <h3 className="text-2xl font-medium  w-full  px-4">
              <a href={"job/" + jobOffer.id + (jobOffer.status === TaskStatus.NOT_YET_OPEN ? "" : "/solution")}>
                {jobOffer.jobTitle}
              </a>
            </h3>

            <ul className="flex pt-2 pb-4 px-4">
              {jobOffer.technologies.map((technology) => {
                return (
                    <li
                        className="mr-3 px-3 py-1 text-sm rounded-md bg-transparent border-[1px] border-task-lighter text-task-lighter font-medium"
                        key={technology}
                    >
                      {technology}
                    </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm pb-2.5 px-4 w-full font-medium" >
          <p>
            {jobOffer.company.username}
          </p>
          <div className="flex gap-2 text-task-lighter items-center">
            <FontAwesomeIcon icon={faLocationDot}/>
            <ul className="flex">
              {jobOffer.workLocations.map((location, index) => (
                  <li key={location}>
                    {location}
                    {index !== jobOffer.workLocations.length - 1 &&
                        <span className="mx-1">/</span>
                    }
                  </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
};

export default JobOffer;
