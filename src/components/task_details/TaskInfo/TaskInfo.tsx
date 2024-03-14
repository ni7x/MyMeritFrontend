import React from "react";
import Task from "../../../models/Task";
import { formatDistance } from 'date-fns';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faUser, faBookmark} from '@fortawesome/free-solid-svg-icons'

const TaskInfo: React.FC<{task: Task}> = ({task}) => {
console.log(task)
    const relativeDate = formatDistance(task.closesAt, new Date(), { addSuffix: false })

    {{ /* <button className={"task-info-toggle"}><FontAwesomeIcon icon={faMinimize} /></button> */ }}
    return (
        <div className="flex flex-col bg-terminal-color p-[1.5rem] rounded-lg w-[100%] lg:w-[35%] justify-between">
            <div>
                <div className="flex flex-row w-100 text-sm font-semibold justify-between">
                    <div>
                        <p className="inline-block mr-3 text-merit-credits-color"><span>{task.reward} MC</span></p>
                        <p className="inline-block"><FontAwesomeIcon icon={faUser} /> {task.solutionCount}</p>
                    </div>
                    <p className=" inline-block"><FontAwesomeIcon icon={faBookmark} /> </p>
                </div>
                <h3 className="text-xl font-bold my-[0.5rem] leading-7">{task.title}</h3>
                <p className="text-sm text-task-lighter font-medium"><FontAwesomeIcon icon={faClock} />  {relativeDate} remaining</p>
                <p className="leading-6 my-5">{task.instructions}</p>
                <ul>
                    {task.allowedLanguages.map((language)=>{
                        return <li className="inline-block px-5 py-3 font-medium bg-[#555764] mr-3 rounded-lg text-sm" key={language}>{language}</li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default TaskInfo;