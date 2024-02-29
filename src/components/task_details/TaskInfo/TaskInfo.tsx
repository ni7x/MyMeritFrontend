import React, {useEffect, useState} from "react";
import {getTaskById} from "../../../services/TaskService";
import Task from "../../../models/Task";
import { formatDistance } from 'date-fns';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faUser, faBookmark} from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/logo-placeholder.png';

const TaskInfo: React.FC<{taskId: string}> = ({taskId}) => {
    const [ task, setTask ] = useState<Task|null>(null);

    useEffect(()=>{
        setTask(getTaskById(taskId));
    }, [])


    if(task == null){
        return <p>Loading...</p>
    }

    const relativeDate = formatDistance(task.endDate, new Date(), { addSuffix: false })

    {{ /* <button className={"task-info-toggle"}><FontAwesomeIcon icon={faMinimize} /></button> */ }}
    return (
        <div className="flex flex-col bg-terminal-color p-[1.5rem] rounded-lg w-[100%] lg:w-[35%] justify-between">
            <div>
                <div className="flex flex-row w-100 text-sm font-semibold justify-between">
                    <div>
                        <p className="inline-block mr-3 text-merit-credits-color"><span>{task.credits} MC</span></p>
                        <p className="inline-block"><FontAwesomeIcon icon={faUser} /> {task.solutionCount}</p>
                    </div>
                    <p className=" inline-block"><FontAwesomeIcon icon={faBookmark} /> </p>
                </div>
                <h3 className="text-xl font-bold my-[0.5rem] leading-7">{task.topic}</h3>
                <p className="text-sm text-task-lighter font-medium"><FontAwesomeIcon icon={faClock} />  {relativeDate} remaining</p>
                <p className="leading-6 my-5">{task.description}</p>
                <ul>
                    {task.allowedTechnologies.map((technology)=>{
                        return <li className="inline-block px-5 py-3 font-medium bg-[#555764] mr-3 rounded-lg text-sm" key={technology}>{technology}</li>
                    })}
                </ul>
            </div>
            <div>
                <div className="flex items-center font-semibold">
                     <img className="w-10 h-10 rounded-full mr-3" src={logo}/>
                     <a href={"/company/" + task.company.id}>{task.company.name}</a>
                </div>
            </div>
        </div>
    );
};

export default TaskInfo;