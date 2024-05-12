import TaskPreview from "../../models/TaskPreview";
import React from "react";
import Label from "./Label";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-solid-svg-icons";

const Task: React.FC<{ task: TaskPreview }> = ({ task }) => {
  return (
      <li>
        <a
            className="flex flex-row gap-6 bg-terminal-color p-4 rounded hover:bg-[#40424FFF]  items-center rounded"
            href={"/job/" + task.jobId + "/solution"}
        >
          <img src={"data:image/png;base64," + task.imageBase64} className="w-[4.5rem] h-[4.5rem] rounded"/>
          <div className="flex flex-col gap-1.5">
            <div className="flex font-semibold text-lg items-center gap-3 leading-0">
              <p>{task.taskName}</p>
              <p
                  className={`font-semibold text-xs ${
                      task.feedback
                          ? "text-[#40b0f3]"
                          : "text-main-lighter"
                  }`}
              >
                  <FontAwesomeIcon icon={faComment}/>  {task.feedback ? "CLICK TO VIEW FEEDBACK" : "NO FEEDBACK"}
              </p>
            </div>
            <div className="flex gap-10">
                <Label label="SUBMITTED" value={new Date(task.submitDate).toLocaleDateString()} />
                <Label label="LANGUAGE" value={task.solutionLanguage} />
                {task.feedback &&
                    <Label label="CREDITS RECEIVED"
                           value={<p class="text-merit-credits-color">{task.feedback.credits} MC  </p>}
                        />
                }
            </div>
          </div>
        </a>
      </li>
  );
};


export default Task;
