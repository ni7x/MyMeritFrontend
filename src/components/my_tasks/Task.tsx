import TaskPreview from "../../models/TaskPreview";
import React from "react";
import Label from "./Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUser } from "@fortawesome/free-solid-svg-icons";

const Task: React.FC<{ task: TaskPreview }> = ({ task }) => {
  return (
    <li>
      <a
        className="flex flex-row gap-6 bg-terminal-color p-4 hover:bg-[#40424FFF]  items-center rounded"
        href={"/job/" + task.jobId + "/solution"}
      >
        {task.imageBase64 ? (
          <img
            src={task.imageBase64}
            className="w-[4.5rem] h-[4.5rem] rounded"
          />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className="w-[4.5rem] h-[4.5rem] !box-border p-2"
          />
        )}

        <div className="flex flex-col gap-1.5">
          <div className="flex font-semibold text-lg items-center gap-3 leading-0">
            <p>{task.taskName}</p>
            <p>
              {task.isRecentActivity ? (
                <p className="text-xs font-medium border-merit-credits-color border-2 text-merit-credits-color px-2 py-1 rounded">
                  RECENTLY RATED
                </p>
              ) : (
                <p
                  className={`font-semibold text-xs ${
                    task.feedback ? "text-[#40b0f3]" : "text-main-lighter"
                  }`}
                >
                  <FontAwesomeIcon icon={faComment} />{" "}
                  {task.feedback ? "VIEW FEEDBACK" : "NO FEEDBACK"}
                </p>
              )}
            </p>
          </div>
          <div className="flex gap-10 items-center">
            <Label
              label="SUBMITTED"
              value={new Date(task.submitDate).toLocaleDateString()}
            />
            <Label label="LANGUAGE" value={task.solutionLanguage} />
            {task.feedback && (
              <Label
                label="CREDITS RECEIVED"
                value={
                  <p className="text-merit-credits-color">
                    {task.feedback.credits} MC{" "}
                  </p>
                }
              />
            )}
          </div>
        </div>
      </a>
    </li>
  );
};

export default Task;
