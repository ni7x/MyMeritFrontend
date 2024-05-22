import React from "react";
import { differenceInMinutes, formatDistance } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faLocationDot,
  faTrophy,
  faGraduationCap,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";
import TaskStatus from "../../models/TaskStatus";
import MeritCoin from "../../assets/meritcoin.png";
import { Tooltip } from 'react-tooltip';

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
    TYPESCRIPT: "#46d595",
    PHP: "#c72eb3",
  };

  return (
      <div className="bg-secondary-bg-color rounded xl:max-w-full border-[0px] border-main-border">
        <div className="text-[0.8725rem]">
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
                          : "OPENS IN " +
                          formatDistance(new Date(), jobOffer.opensAt, {
                            addSuffix: false,
                          }).toUpperCase()}
                </span>
              </p>
            </span>
            </div>
            <span className="flex justify-start text-task-lighter font-medium">
            <FontAwesomeIcon icon={faBookmark} />
            <span className="block xs:hidden ml-2">ADD TO BOOKMARKS</span>
          </span>
          </div>
        </div>

        <div className="flex items-center px-4 pb-4 mt-1">
          <img
              src={jobOffer.company.imageBase64}
              className="hidden xs:block w-[4.5rem] h-[4.5rem] rounded object-cover img-anchor"
              alt={jobOffer.company.username}
          />
          <div className="flex flex-col h-full xs:pl-4 w-full gap-3 xs:gap-1">
            <h3 className="text-xl font-semibold w-full hover:underline">
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
            <div className="flex w-full sm:gap-6 xs:gap-4 gap-3 text-sm font-medium xs:justify-between flex-wrap">
              <div className="flex flex-wrap  sm:gap-x-7  gap-x-4 gap-y-4">
                <p className="flex items-center w-[20rem] xs:w-auto">
                  <img
                      src={jobOffer.company.imageBase64}
                      className="block xs:hidden w-[1.5rem] h-[1.5rem] rounded mr-2 object-cover img-anchor"
                      alt={jobOffer.company.username}
                  />
                  {jobOffer.company.username}
                </p>
                <div className="flex gap-2 text-task-lighter items-center">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <ul className="flex">
                    {jobOffer.workLocations.map((location, index) => (
                        <li key={location}>
                          {location.toUpperCase()}
                          {index !== jobOffer.workLocations.length - 1 && (
                              <span className="mx-1">/</span>
                          )}
                        </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 text-task-lighter items-center">
                  <FontAwesomeIcon icon={faGraduationCap} />
                  {jobOffer.experience}
                </div>
              </div>
              <ul className="flex h-full gap-x-4">
                {jobOffer.technologies.map((technology) => {
                  const color = languageColors[technology.toUpperCase()];
                  return (
                      <li
                          className="px-4 py-1.5 text-xs rounded-md font-semibold"
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
        </div>

        {jobOffer.company.description && (
            <Tooltip
                anchorSelect=".img-anchor"
                place="left"
                style={{ backgroundColor: "#434550", boxShadow: "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px" }}
                opacity={1}
            >
              <div className="flex py-2 gap-1">
                <div className="flex-col">
                  <img
                      src={jobOffer.company.imageBase64}
                      className="block w-[3rem] h-[3rem] rounded mr-2 object-cover"
                      alt={jobOffer.company.username}
                  />
                </div>
                <div className="w-[15rem] flex flex-col rounded gap-1">
                  <h3 className="text-[18px] font-medium">{jobOffer.company.username}</h3>
                  <p className="text-main-2 text-task-lighter">{jobOffer.company.description}</p>
                </div>
              </div>
            </Tooltip>
        )}
      </div>
  );
};

export default JobOffer;
