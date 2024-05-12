import React from "react";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";
import Label from "./Label";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../hooks/useAuth";
import {removeFromBookmarks} from "../../services/JobOfferService";
import {successToast} from "../../main";

const Bookmark: React.FC<{ bookmarkedJob: JobOfferListedDTO }> = ({ bookmarkedJob, removeFromBookmarkList }) => {
    const {accessToken} = useAuth();

    const removeJobFromBookmarks = () => {
        removeFromBookmarks(accessToken!, bookmarkedJob.id)
            .then(r => {
                if(r.success){
                    removeFromBookmarkList(bookmarkedJob.id)
                    successToast("Bookmark removed")
                }
            })
    }
    return (
        <li className="flex flex-row gap-6 bg-terminal-color p-4 hover:bg-[#40424FFF] cursor-pointer rounded">
                <img
                    src={"data:image/png;base64," + bookmarkedJob.company.imageBase64}
                    className="w-[4.5rem] h-[4.5rem] rounded"
                />
                <div className="flex flex-col gap-1.5">
                    <div className="flex font-semibold text-lg items-center gap-3 leading-0">
                        <a  href={"/job/" + bookmarkedJob.id + "/solution"}>
                            {bookmarkedJob.jobTitle}
                        </a>
                        <button
                            className="flex items-center focus:outline-none text-task-lighter text-xs hover:text-red-500"
                            onClick={removeJobFromBookmarks}
                        >
                            <FontAwesomeIcon icon={faBookmark} className="mr-1" />
                            <span>
                                BOOKMARKED
                            </span>
                        </button>
                    </div>
                    <div className="flex gap-10 rounded">
                        <Label label="OPENS" value={new Date(bookmarkedJob.opensAt).toLocaleDateString()} />
                    </div>
                </div>
        </li>
    );
};


export default Bookmark;