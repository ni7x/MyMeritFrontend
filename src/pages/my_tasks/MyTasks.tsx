import React, {useEffect, useState} from "react";
import "./my_tasks.css";
import TaskPreview from "../../models/TaskPreview";
import {getUserTasks} from "../../services/TaskService";
import TaskList from "../../components/my_tasks/TaskList";
import SortPanel from "../../components/my_tasks/SortPanel";
import FilterPanel from "../../components/my_tasks/FilterPanel";

const MyTasks: React.FC = () => {
    const [ tasks, setTasks ] = useState<TaskPreview[]>([]);
    const [ filteredTasks, setFilteredTasks ] = useState<TaskPreview[]>([]);

    useEffect(()=>{
        const tasks_json = getUserTasks(0)
        setTasks(tasks_json);
        setFilteredTasks(tasks_json);

    }, [])

    return (
        <div className="user-tasks">
            <div className="left-panel">
                <FilterPanel tasks={tasks} setFilteredTasks={setFilteredTasks}/>
            </div>
            <div className="right-panel">
                <SortPanel tasks={filteredTasks}/>
                <TaskList tasks={filteredTasks}/>
            </div>
        </div>
    );
};

export default MyTasks;