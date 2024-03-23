import React, {useEffect, useState} from "react";
import Task from "../../../models/Task";
import { formatDistance } from 'date-fns';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faUser, faBookmark} from '@fortawesome/free-solid-svg-icons'

const TaskInfo: React.FC<{task: Task}> = ({task}) => {
    {{ /* <button className={"task-info-toggle"}><FontAwesomeIcon icon={faMinimize} /></button> */ }}
    return (
        <div className="flex flex-col bg-terminal-color p-[1.5rem] rounded w-[100%] lg:flex-1 justify-between h-full">
            <div>
                <div className="flex flex-row w-100 text-sm font-semibold justify-between">
                    <div>
                        <p className="inline-block mr-3 text-merit-credits-color"><span>{task.reward} MC</span></p>
                    </div>
                </div>
                <h3 className="text-xl font-bold my-[0.5rem] leading-7">{task.title}</h3>

                <p className="leading-6 my-5">{task.instructions}</p>
                <ul className="flex gap-2">
                    {task.allowedLanguages.map((language)=>{
                        return <li className="inline-block px-4 py-1.5 font-medium bg-[#555764] rounded-lg text-sm" key={language}>{language}</li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default TaskInfo;