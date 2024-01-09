import React, {useEffect, useState} from "react";
import "./user_tasks.css";
import TaskPreview from "../../models/TaskPreview";
import {getUserTasks} from "../../services/TaskService";
import UserTaskList from "../../components/user_task_list/UserTaskList";

const UserTasks: React.FC = () => {
    const [ tasks, setTasks ] = useState<TaskPreview[]>([]);

    useEffect(()=>{
        setTasks(getUserTasks(0));
    }, [])

    return (
        <div className="user-tasks">
            {tasks.length > 0  ?
                <UserTaskList tasks={tasks}/>
                    :
                <p>No tasks to be found...</p>
            }
        </div>
    );
};

export default UserTasks;