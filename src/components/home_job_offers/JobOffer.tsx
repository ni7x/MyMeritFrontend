import React from "react";
import { differenceInMinutes, formatDistance } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faLocationDot,
  faTrophy,
    faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";
import TaskStatus from "../../models/TaskStatus";
import MeritCoin from "../../assets/meritcoin.png";
import { Tooltip } from 'react-tooltip'



const JobOffer: React.FC<{ jobOffer: JobOfferListedDTO }> = ({ jobOffer }) => {
  const solvingTime = differenceInMinutes(
    new Date(jobOffer.closesAt),
    new Date(jobOffer.opensAt)
  );

  const languageColors: { [key: string]: string } = {
    JAVA: "#ec9b2a",
    PYTHON: "#40a5f8",
    JAVASCRIPT: "#f1e05a",
    CPP: "#f34b7d",
    GO: "#00ADD8",
    KOTLIN: "#A97BFF",
    TYPESCRIPT: "#2b7489",
    PHP: "#4F5D95",
  };

  return (
    <div className="flex-column bg-secondary-bg-color  rounded xl:max-w-full border-[0px] border-main-border">
      <div className="pt-2.5 px-4 text-[0.8725rem]">
        <div className="font-semibold mt-1 pb-4 flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-x-6 gap-y-3 flex-wrap">
            <div className="flex-row items-center">
              <span className="flex items-center text-merit-credits-color font-medium">
                <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                {jobOffer.reward}{" "}
                <img src={MeritCoin} className="w-3.5 h-3.5 ml-1" alt="MeritCoin" />
              </span>
            </div>
            <span className="flex items-center text-task-lighter truncate max-w-[12rem] gap-1">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              <span className="font-medium text-white">
                {solvingTime} MINUTES
              </span>
            </span>
            <span className="flex items-center text-task-lighter  truncate max-w-[12rem] gap-1">
              <FontAwesomeIcon icon={faCalendar} className="mr-1" />
              <p>
                <span
                  className={`font-medium ${
                    jobOffer.status == TaskStatus.OPEN
                      ? "text-emerald-400"
                      : jobOffer.status == TaskStatus.EXPIRED
                      ? "text-red-500"
                      : "text-orange-400"
                  }`}
                >
                  {jobOffer.status == TaskStatus.OPEN
                    ? "OPEN NOW"
                    : jobOffer.status == TaskStatus.EXPIRED
                    ? "CLOSED"
                    : "OPENS IN " +
                      formatDistance(new Date(), jobOffer.opensAt, {
                        addSuffix: false,
                      }).toUpperCase()}
                </span>
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="flex">
        <img
          src={jobOffer.company.imageBase64}
          className="hidden min-[400px]:block w-[4.5rem] h-[4.5rem] rounded ml-4 object-cover img-anchor"
        />
        <div>
          <h3 className="text-2xl font-medium  w-full  px-4 hover:underline">
            <a
              href={
                "job/" +
                jobOffer.id +
                (jobOffer.status === TaskStatus.NOT_YET_OPEN ? "" : "/solution")
              }
            >
              {jobOffer.jobTitle}
            </a>
          </h3>

          <ul className="flex pt-2 pb-4 px-4">
            {jobOffer.technologies.map((technology) => {
              const color = languageColors[technology.toUpperCase()];
              return (
                <li
                  className="mr-3 px-3 py-1 text-sm rounded-md font-medium"
                  style={{
                    backgroundColor: "transparent",
                    border: `2px solid ${color}`,
                    color: color,
                  }}
                  key={technology}
                >
                  {technology}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-x-6 gap-y-3 text-sm pb-2.5 px-4 w-full font-medium flex-wrap">

        <p className="flex items-center">
          <img
            src={jobOffer.company.imageBase64}
            className="block min-[400px]:hidden w-[1.5rem] h-[1.5rem] rounded mr-2 object-cover img-anchor"
          />

          {jobOffer.company.username}
        </p>
        <div className="flex gap-2 text-task-lighter items-center">
          <FontAwesomeIcon icon={faLocationDot} />
          <ul className="flex">
            {jobOffer.workLocations.map((location, index) => (
              <li key={location}>
                {location}
                {index !== jobOffer.workLocations.length - 1 && (
                  <span className="mx-1">/</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {jobOffer.company.description && jobOffer.company.description.length > 0 &&
          <Tooltip anchorSelect=".img-anchor" place="left" style={{ backgroundColor: "#555764"}} opacity={1}>
            <div className="flex py-2 gap-1">
              <div className="flex-col">
                <img
                    src={jobOffer.company.imageBase64}
                    className="block  w-[3rem] h-[3rem] rounded mr-2 object-cover img-anchor"
                />
              </div>

              <div className="w-[15rem] flex  flex-col rounded gap-1">
                <h3 className="text-[18px] font-medium">{jobOffer.company.username}</h3>
                <p className="text-main-2 text-[#9ca0b2] ">{jobOffer.company.description}</p>

              </div>
            </div>
          </Tooltip>
      }

    </div>
  );
};

export default JobOffer;
