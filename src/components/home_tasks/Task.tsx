import React from "react";
import {Task as TaskDTO} from "../../models/Task";
import {formatDistance} from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faUser} from "@fortawesome/free-solid-svg-icons";

const  Task: React.FC<{task: TaskDTO}> = ({task})=> {
    const relativeDate = formatDistance(task.endDate, new Date(), { addSuffix: false })

    return (
        <div className="flex-column bg-secondary-bg-color rounded mb-5">
            <div className="mb-5 pt-5 px-6 pb-0">
                <div className="text-[0.825rem] font-semibold mt-1 flex justify-between">
                    <div>
                        <span className="text-merit-credits-color mr-2">{task.credits} MC</span>
                        <span className="text-task-lighter"><FontAwesomeIcon icon={faUser} /> {task.solutionCount}</span>
                    </div>
                    <span className="text-task-lighter text-[0.825rem] font-medium "><FontAwesomeIcon icon={faClock} className="mr-1"/>{relativeDate} remaining</span>
                </div>

                <h3 className="text-lg font-bold  w-full py-2">
                    <a href={"tasks/" + task.id}>
                        {task.topic}
                    </a>
                </h3>
            </div>

            <p className="text-task-lighter mb-5 pt-0 mt-[-1rem] px-6 leading-[1.5]">{task.description}</p>
            <ul className="flex pb-4 px-6">
                {task.allowedTechnologies.map((technology)=>{
                    return <li className="mr-3 px-4 py-3 text-sm rounded-lg bg-[#5c5e68]">{technology}</li>
                })}
            </ul>
        </div>
    );

};

export default Task;