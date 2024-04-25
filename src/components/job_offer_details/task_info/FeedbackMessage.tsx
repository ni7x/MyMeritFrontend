import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

const FeedbackMessage = ({feedback}) => {
    const [isCommentShown, setIsCommentShown] = useState(false);
    return (
        <div className="bg-emerald-450 rounded p-2 text-sm mb-3">
            <div className="bg-emerald-450">
                Your solution has been reviewed.
                You got <span className="font-semibold">{feedback?.credits} MC</span>!
            </div>
            <button
                onClick={()=>setIsCommentShown(!isCommentShown)}
                className=" text-xs font-semibold pt-1"
            >
                SHOW COMMENT <FontAwesomeIcon icon={faChevronDown}/>
            </button>
            <div className={isCommentShown ? "block": "hidden"}>
                {feedback?.comment}
            </div>
        </div>
    )
}

export default FeedbackMessage;