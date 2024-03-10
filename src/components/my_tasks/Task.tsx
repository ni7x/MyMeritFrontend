import TaskPreview from "../../models/TaskPreview";
import React from "react";
import TaskStatus from "../../models/TaskStatus";

const Task: React.FC<{ task: TaskPreview }> = ({ task }) => {
  const getCreditStyle = (credits: number) => {
    if (credits >= 3 && credits < 7) {
      return "bg-[#ecc52b]";
    } else if (credits >= 7) {
      return "bg-[#fd448e]";
    }
  };

  return (
    <li>
      <a
        className="w-full bg-secondary-bg-color my-2 mx-0 flex justify-between items-center rounded-md p-2 cursor-pointer text-main-font-color"
        href={"tasks/" + task.taskID}
      >
        <P className="group">
          <strong>
            {task.name.length > 30
              ? task.name.substring(0, 29) + "..."
              : task.name}
          </strong>
          {task.name.length > 30 ? (
            <span className="group-hover:inline-block hidden bg-[#6a6c76] border-[1px] border-solid border-[#777882] py-1 px-2 absolute rounded ml-[-5px] leading-snug max-w-32 mt-7 text-xs">
              {task.name}
            </span>
          ) : (
            <></>
          )}
        </P>

        <P className="text-main-lighter">
          {task.submitDate.toLocaleDateString()}
        </P>

        <P
          className={`font-semibold italic ${
            task.status === TaskStatus.RATED
              ? "text-[#40b0f3]"
              : "text-main-lighter"
          }`}
        >
          {task.status}
        </P>

        <P className="flex-[0.25] mr-0">
          <span
            className={`bg-[#50515d] py-1 px-3 rounded-2xl font-semibold w-full text-center
              ${getCreditStyle(task.credits)}`}
          >
            {task.credits}
          </span>
        </P>
      </a>
    </li>
  );
};

const P = ({
  className,
  children,
}: {
  className?: string;
  children: string | JSX.Element | JSX.Element[];
}) => {
  return (
    <p
      className={`flex-[1] flex m-0 py-1 px-2 ${
        className !== undefined ? className : ""
      }`}
    >
      {children}
    </p>
  );
};

export default Task;
