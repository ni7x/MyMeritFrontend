import React, {useEffect, useState} from "react";
import {getTaskById} from "../../services/TaskService";
import Task from "../../models/Task";
import { formatDistance } from 'date-fns';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faUser, faBookmark, faLeftLong, faMinimize, faWindowMinimize} from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/logo-placeholder.png';
import "./TaskInfo/task_info.css";

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
        <div className="task-info">
            <div>
                <div className="top-part">
                    <div>
                        <p><span>{task.credits} MC</span></p>
                        <p><FontAwesomeIcon icon={faUser} /> {task.solutionCount}</p>
                    </div>
                    <p className="bookmark"><FontAwesomeIcon icon={faBookmark} /> </p>
                </div>
                <h3>{task.topic}</h3>
                <p className="date"><FontAwesomeIcon icon={faClock} />  {relativeDate} remaining</p>
                <p className="description">{task.description}</p>
                <ul>
                    {task.allowedTechnologies.map((technology)=>{
                        return <li key={technology}>{technology}</li>
                    })}
                </ul>
            </div>
            <div className="company">
                <div>
                     <img src={logo}/>
                     <a href={"/company/" + task.company.id}>{task.company.name}</a>
                </div>
            </div>
        </div>
    );
};

export default TaskInfo;