import React from "react";
import Task from "./Task";
import TaskPreview from "../../models/TaskPreview";

const TaskList: React.FC<{ tasks: TaskPreview[] }> = ({ tasks }) => {
  return (
    <ul className="flex flex-col p-0 m-0 list-none">
      {tasks.map((task) => (
        <Task key={task.taskID} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
