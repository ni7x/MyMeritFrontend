import React from "react";
import { Task as TaskDTO } from "../../models/Task";
import Task from "./Task";
import SecondWrapper from "../SecondWrapper";

const TaskList: React.FC<{ tasks: TaskDTO[] }> = ({ tasks }) => {
  return (
    <div
      className={`w-[100%] flex flex-col align-center justify-center ${
        tasks.length === 0 ? "justify-center align-center flex h-full" : ""
      }`}
    >
      {tasks.length === 0
        ? "No tasks"
        : tasks.map((task) => <Task task={task} />)}
    </div>
  );
};

export default TaskList;
