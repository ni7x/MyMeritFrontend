import React from "react";
import {Task as TaskDTO} from "../../models/Task";
import Task from "./Task";

const TaskList: React.FC<{tasks: TaskDTO[]}> = ({tasks}) => {
    return (
        <div className="w-[60%]">
            {tasks.map(task=>{
                return <Task task={task}/>
            })}
        </div>
    );

};

export default TaskList;