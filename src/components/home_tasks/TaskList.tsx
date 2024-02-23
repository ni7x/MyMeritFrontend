import React from "react";
import {Task as TaskDTO} from "../../models/Task";
import Task from "./Task";

const TaskList: React.FC<{tasks: TaskDTO[]}> = ({tasks}) => {
    if(tasks.length == 0){
        return (
            <div className="w-[60%] justify-center align-center flex h-full">
               No tasks
            </div>
        );
    }
    return (
        <div className="w-[60%]">
            {tasks.map(task=>{
                return <Task task={task}/>
            })}
        </div>
    );

};

export default TaskList;