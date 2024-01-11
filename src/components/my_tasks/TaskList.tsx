import React from "react";
import Task from "./Task";
import TaskPreview from "../../models/TaskPreview";


const TaskList: React.FC<{ tasks: TaskPreview[] }> = ({ tasks }) => {
    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <Task key={task.taskID} task={task} />
            ))}
        </ul>
    );
};


export default TaskList;