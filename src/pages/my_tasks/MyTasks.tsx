import React, {useEffect, useState} from "react";
import "./my_tasks.css";
import TaskPreview from "../../models/TaskPreview";
import {getUserTasks} from "../../services/TaskService";
import TaskList from "../../components/my_tasks/TaskList";
import SortPanel from "../../components/my_tasks/SortPanel";
import FilterPanel from "../../components/my_tasks/FilterPanel";

const MyTasks: React.FC = () => {
    const [ tasks, setTasks ] = useState<TaskPreview[]>([]);

    useEffect(()=>{
        setTasks(getUserTasks(0));
    }, [])

    return (
        <div className="user-tasks">
            <div className="left-panel">
                <FilterPanel tasks={tasks}/>
            </div>
            <div className="right-panel">
                <SortPanel tasks={tasks}/>
                <TaskList tasks={tasks}/>
            </div>
        </div>
    );
};

export default MyTasks;