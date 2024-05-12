import TaskPreview from "../../models/TaskPreview";
import React from "react";
import meritCoin from "../../assets/meritcoin.png";

const Task: React.FC<{ task: TaskPreview }> = ({ task }) => {
  const Label = ({ label, value }) => {
    return (
        <div className="text-main-lighter">
          <p className="text-xs font-semibold">
            {label}
          </p>
          <p className="text-white font-medium">
            {value}
          </p>
        </div>
    );
  };

  return (
      <li>
        <a
            className="flex flex-row gap-6 bg-terminal-color p-6 rounded items-center "
            href={"/job/" + task.jobId + "/solution"}
        >
          <img src={"data:image/png;base64," + task.imageBase64} className="w-[4.5rem] h-[4.5rem] rounded"/>
          <div className="flex flex-col gap-2.5">
            <div className="flex font-bold text-lg items-center gap-3 leading-0">
              <p>{task.taskName}</p>
              <p
                  className={`font-semibold text-xs mt-1 ${
                      task.feedback
                          ? "text-[#40b0f3]"
                          : "text-main-lighter"
                  }`}
              >
                {task.feedback ? "CLICK TO VIEW FEEDBACK" : "NO FEEDBACK"}
              </p>
            </div>
            <div className="flex gap-10 bg-terminal-color rounded">
                <Label label="SUBMITTED" value={new Date(task.submitDate).toLocaleDateString()} />
                <Label label="LANGUAGE" value={task.solutionLanguage} />
                {task.feedback &&
                    <Label label="CREDITS RECEIVED"
                           value={<p>{task.feedback.credits} <span className="text-credits-color">MC </span> </p>}
                        />
                }
            </div>
          </div>
        </a>
      </li>
  );
};


export default Task;
