import React from "react";
import {differenceInMinutes, formatDistance} from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faCalendar, faClock, faTrophy} from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/logo-placeholder.png';
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";
import TaskStatus from "../../models/TaskStatus";

const  JobOffer: React.FC<{jobOffer: JobOfferListedDTO}> = ({jobOffer})=> {
    const solvingTime = differenceInMinutes( new Date(jobOffer.closesAt),  new Date(jobOffer.opensAt));
    return (
        <div className="flex-column bg-secondary-bg-color rounded mb-5 xl:max-w-full">
            <div className="pt-2.5 px-4 text-sm">
                <div className="font-semibold mt-1 pb-3 flex justify-between items-center flex-wrap gap-2">
                    <div className="flex-row items-center ">
                        <span className="flex items-center text-merit-credits-color font-semibold mr-3">
                            <FontAwesomeIcon icon={faTrophy} className="mr-2"/>
                            {jobOffer.reward} MC
                        </span>
                    </div>
                    <div className="flex gap-8">
                        <span className="flex items-center text-task-lighter  truncate max-w-[12rem] gap-1">
                            <FontAwesomeIcon icon={faClock} className="mr-1"/>
                            <span className="font-medium text-white">{solvingTime} minutes</span>
                        </span>
                            <span className="flex items-center text-task-lighter  truncate max-w-[12rem] gap-1">
                            <FontAwesomeIcon icon={faCalendar} className="mr-1"/>
                            <p>
                                <span className={`font-medium ${jobOffer.status == TaskStatus.OPEN ? "text-green-400" : jobOffer.status == TaskStatus.EXPIRED ? "text-red-500" : "text-white"}`}>
                                    {jobOffer.status == TaskStatus.OPEN ? "open" : jobOffer.status == TaskStatus.EXPIRED ? "closed" : "opens in " + formatDistance(new Date(), jobOffer.opensAt, { addSuffix: false })}
                                </span>
                            </p>
                        </span>
                            <span className="flex items-center text-task-lighter truncate max-w-[12rem]">
                            <FontAwesomeIcon icon={faBell} className="mr-2"/>
                        </span>
                    </div>
                </div>
                <h3 className="text-xl font-bold  w-full">
                    <a href={"job/" + jobOffer.id + (jobOffer.status === TaskStatus.NOT_YET_OPEN ? "" : "/solution")}>
                        {jobOffer.jobTitle}
                    </a>
                </h3>
            </div>
            <ul className="flex py-5 pb-6 px-4">
                {jobOffer.technologies.map((technology) => {
                    return (
                        <li
                            className="mr-3 px-4 py-1 text-sm rounded-lg bg-transparent border-[1px] border-task-lighter text-task-lighter font-medium"
                            key={technology}
                        >
                            {technology}
                        </li>
                    )
                })}
            </ul>
            <div className="flex items-center justify-between text-sm pb-2.5 px-4 w-full font-medium" >
                <div className="flex justify-center items-center">
                    <img className="h-6 w-6 rounded mr-2" src={logo}/>
                    <a href={"/company/" + jobOffer.company.id} className="truncate">{jobOffer.company.name}</a>
                </div>
                <ul className="flex text-task-lighter">
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
    );
};

export default JobOffer;