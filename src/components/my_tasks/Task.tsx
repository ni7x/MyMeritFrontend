import TaskPreview from "../../models/TaskPreview";
import React from "react";
import TaskStatus from "../../models/TaskStatus";

const Task: React.FC<{ task: TaskPreview }> = ({ task }) => {
  const getCreditStyle = (credits) => {
    if (credits >= 0 && credits < 3) {
      return "low";
    } else if (credits >= 3 && credits < 7) {
      return "medium";
    } else {
      return "high";
    }
  };

  return (
    <li>
      <a href={"tasks/" + task.taskID}>
        <p>
          <strong>
            {task.name.length > 30
              ? task.name.substring(0, 29) + "..."
              : task.name}
          </strong>
          {task.name.length > 30 ? (
            <span className="full-name">{task.name}</span>
          ) : (
            <></>
          )}
        </p>

        <p className="date">{task.submitDate.toLocaleDateString()}</p>

        <p className={task.status === TaskStatus.RATED ? "rated" : "unrated"}>
          {task.status}
        </p>
        <p>
          <span className={"credits " + getCreditStyle(task.credits)}>
            {task.credits}
          </span>
        </p>
      </a>
    </li>
  );
};

export default Task;
