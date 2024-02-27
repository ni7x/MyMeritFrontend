import React from "react";
import {Task as TaskDTO} from "../../models/Task";
import {formatDistance} from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faUser} from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/logo-placeholder.png';

const  Task: React.FC<{task: TaskDTO}> = ({task})=> {
    const relativeDate = formatDistance(task.endDate, new Date(), { addSuffix: false })

    return (
        <div className="flex-column bg-secondary-bg-color rounded mb-5 max-w-[35rem] xl:max-w-full">
            <div className="mb-5 pt-3 px-6 pb-0">
                <div className="text-[0.825rem] font-semibold mt-1 flex justify-between items-center flex-wrap gap-2">
                    <div className="flex-row items-center ">
                        <span className="text-merit-credits-color mr-3">{task.credits} MC</span>
                        <span className="text-task-lighter"><FontAwesomeIcon icon={faUser} /> {task.solutionCount}</span>
                    </div>
                    <span className="text-task-lighter text-[0.825rem] font-medium truncate max-w-[12rem]"><FontAwesomeIcon icon={faClock} className="mr-1"/>{relativeDate} remaining</span>
                    <div className="flex items-center justify-end font-semibold text-sm max-w-[12rem]">
                        <span className="font-medium">by</span>
                        <img className="h-6 w-6 rounded-[50%] mx-2" src={logo}/>
                        <a href={"/company/" + task.company.id} className="truncate">{task.company.name}</a>
                    </div>
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
                    return <li className="mr-3 px-5 py-2.5 text-sm rounded-lg bg-[#5c5e68]">{technology}</li>
                })}
            </ul>


        </div>
    );

};

export default Task;