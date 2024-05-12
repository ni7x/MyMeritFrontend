import React from "react";
import Task from "./Task";
import TaskPreview from "../../models/TaskPreview";

const TaskList: React.FC<{ tasks: TaskPreview[] }> = ({ tasks }) => {
  return (
    <ul className="flex flex-col p-0 m-0 list-none gap-4">
      {tasks.map((task) => (
        <Task key={task.taskName} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
