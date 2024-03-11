import React from "react";
import {Task as TaskDTO} from "../../models/Task";
import Task from "./Task";

const TaskList: React.FC<{ tasks: TaskDTO[] }> = ({ tasks }) => {
  return (
    <div
      className={`w-full flex flex-col align-center justify-center}`}
    >
      {tasks.length === 0
        ? <p className="h-[32rem]">No tasks</p>
        : tasks.map((task) => <Task key={task.id} task={task} />)}
    </div>
  );
};

export default TaskList;
