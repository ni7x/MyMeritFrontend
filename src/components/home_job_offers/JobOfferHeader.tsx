import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faTrophy, faBookmark } from "@fortawesome/free-solid-svg-icons";
import {formatDistance, formatDistanceToNow} from "date-fns";
import { differenceInMinutes } from "date-fns";
import TaskStatus from "../../models/TaskStatus";
import MeritCoin from "../../assets/meritcoin.png";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";
import {useAuth} from "../../hooks/useAuth";
import {errorToast, successToast} from "../../main";
import {addToBookmarks} from "../../services/JobOfferService";

const JobOfferHeader: React.FC<{ jobOffer: JobOfferListedDTO }> = ({ jobOffer }) => {
    const solvingTime = differenceInMinutes(new Date(jobOffer.closesAt), new Date(jobOffer.opensAt));
    const {userData, accessToken} = useAuth();
    const addJobToBookmarks = () =>{
       if(userData){
           if(accessToken) addToBookmarks(accessToken, jobOffer.id).then(r => successToast("Bookmark added!"))
           else{
               errorToast("Login to add this job to bookmarks")
           }
       }else{
           errorToast("Login to add this job to bookmarks")
       }
    }

    return (
        <div className="font-semibold  py-2.5 pt-3.5 px-4 flex flex-wrap xs:flex-row justify-between items-center gap-2 gap-y-4 w-full truncate">
            <div className="flex gap-x-7 gap-y-3 flex-wrap xs:flex-nowrap w-[90%]">
                <div>
                  <span className="flex items-center text-merit-credits-color font-medium">
                    <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                      {jobOffer.reward}
                      <img src={MeritCoin} className="w-3.5 h-3.5 ml-1" alt="MeritCoin" />
                  </span>
                </div>
                <span className="flex items-center text-task-lighter  gap-1 truncate">
                  <FontAwesomeIcon icon={faClock} className="mr-1" />
                  <span className="font-medium text-white">
                    {solvingTime} MINUTES
                  </span>
                </span>
                <span className="flex items-center text-task-lighter gap-1  truncate">
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
                      : "OPENS IN " + formatDistanceToNow( jobOffer.opensAt ).toUpperCase()}
            </span>
          </p>
        </span>
            </div>
            <span className="flex justify-start text-task-lighter font-medium xs:bg-transparent xs:p-0 bg-ide-color px-3 py-2 rounded">
                <button onClick={addJobToBookmarks}>
                        <FontAwesomeIcon icon={faBookmark} />
                         <span className="inline xs:hidden ml-2">ADD TO BOOKMARKS</span>
                </button>

      </span>
        </div>
    );
};

export default JobOfferHeader;
