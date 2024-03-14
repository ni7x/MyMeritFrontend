import React from "react";
import {faLocationDot, faDollarSign, faUser, faBell} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logo from '../../../assets/logo-placeholder.png';
import {formatDistance} from "date-fns";

const JobOfferInfo = ({jobOffer}) => {
    const offerEnded = new Date() < new Date(jobOffer.closesAt) ;

    return (
        <div className="flex flex-col bg-terminal-color p-[1.5rem] p-x-[2rem] rounded w-[100%] lg:w-[45%] lg:max-w-[45rem]">
            <div>
                <h3 className="text-xl font-bold leading-7 mb-3">{jobOffer.jobTitle}</h3>
                <div className="flex gap-4">
                    <p><FontAwesomeIcon icon={faUser} className="mr-3 text-purple-400"/>{jobOffer.experience.toLowerCase()}</p>
                    <p><FontAwesomeIcon icon={faDollarSign} className="mr-3 text-purple-400"/>{jobOffer.salary} euro/month</p>
                    <ul className="flex justify-center items-center">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-3 text-purple-400"/>
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

                <p className="leading-6 my-5 mb-3">
                    {jobOffer.description}
                </p>

                <p className="py-3 font-medium">Must-haves</p>
                <ul className="flex gap-2 mb-3">
                    {jobOffer.requiredSkills.map((skill)=>{
                        return <li className="inline-block px-4 py-1.5 font-medium bg-purple-500 rounded-lg text-sm" key={skill}>{skill}</li>
                    })}
                </ul>
                <p className="py-3 font-medium">Nice-to-haves</p>
                <ul className="flex gap-2 mb-3">
                    {jobOffer.preferredSkills.map((skill)=>{
                        return <li className="inline-block px-4 py-1.5 font-medium bg-purple-500 rounded-lg text-sm" key={skill}>{skill}</li>
                    })}
                </ul>

                <div className="flex mt-8">
                    <img className="h-16 w-16 rounded mr-3" src={logo}/>
                    <div>
                        <div className="flex items-center">
                            <h2>
                                <a href={"/company/" + jobOffer.company.id} className="text-lg font-semibold mr-5">
                                    {jobOffer.company.name}
                                </a>
                            </h2>
                            <FontAwesomeIcon icon={faLocationDot}  className="mr-2 text-purple-400 font-medium text-sm"/> <span className="text-main-lighter font-medium text-sm">{jobOffer.company.location}</span>
                        </div>
                        <p className="text">{jobOffer.company.description}</p>
                    </div>
                </div>

                <div className=" flex justify-between items-center mt-5 rounded">
                    {!offerEnded ?
                        <>
                            <p>Task opens in {formatDistance(new Date(), jobOffer.opensAt, { addSuffix: false })}</p>
                            <button className="text-purple-400 p-3 px-5 bg-task-bck rounded">
                                <FontAwesomeIcon icon={faBell} className="mr-1"/>Remind me
                            </button>
                        </> :
                        <>
                            <p className="text-red-500">Closed</p>
                            <button className="text-purple-400 p-3 px-5 bg-task-bck rounded">
                                <FontAwesomeIcon icon={faBell} className="mr-2"/><span className="text-white">Stay updated on tasks from this company</span>
                            </button>
                        </>
                    }

                </div>
            </div>
        </div>
    );
}

export default JobOfferInfo;