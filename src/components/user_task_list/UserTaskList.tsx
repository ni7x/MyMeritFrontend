import React from "react";
import UserTaskItem from "./UserTaskItem";
import TaskPreview from "../../models/TaskPreview";


const UserTaskList: React.FC<{ tasks: TaskPreview[] }> = ({ tasks }) => {
    return (
        <ul>
            {tasks.map((task) => (
                <UserTaskItem key={task.taskID} task={task} />
            ))}
        </ul>
    );
};


export default UserTaskList;