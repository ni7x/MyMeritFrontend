import React, { useState } from "react";
import Task from "../../../models/Task";
import MDEditor from "@uiw/react-md-editor/nohighlight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faClock,
  faDownLeftAndUpRightToCenter,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { differenceInHours } from "date-fns";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import MeritCoin from "../../../assets/meritcoin.png";

const TaskInfo: React.FC<{
  task: Task;
  jobId: string | undefined;
  feedbackElement?: JSX.Element;
  withToggle: boolean;
}> = ({ task, jobId, feedbackElement, withToggle }) => {
  const [isHidden, setHidden] = useState(false);
  const toggleHidden = () => {
    setHidden(!isHidden);
  };
  const customStyles = {
    "--color-fg-subtle": "#8a949d",
    "--color-canvas-default": "#444c56",
    "--color-canvas-subtle": "#2d313a",
    "--color-border-default": "#6c7580",
    "--color-border-muted": "#687179",
    background: "transparent",
    color: "white",
  };

  if (isHidden) {
    return (
      <div className="flex flex-col rounded flex-1 h-full overflow-x-auto max-w-[35px]">
        <button
          onClick={toggleHidden}
          className="bg-terminal-color p-2 rounded hover:bg-main-lighter-2"
        >
          <FontAwesomeIcon
            icon={faUpRightAndDownLeftFromCenter}
            className="text-main-lighter"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      {feedbackElement}
      <div className="flex flex-col bg-terminal-color rounded w-[100%] h-full overflow-x-auto">
        <div className="p-[1.5rem]">
          <div className="flex flex-row w-100 text-sm font-medium gap-4">
            <div>
              <p className="inline-block text-merit-credits-color">
                <span className="flex flex-row items-center">
                  <FontAwesomeIcon icon={faTrophy} className="mr-1.5" />
                  {task.reward}{" "}
                  <img
                    src={MeritCoin}
                    className="ml-1 w-3.5 h-3.5 inline"
                    alt="Merit Coin"
                  />
                </span>
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p className="inline-block text-task-lighter">
                <FontAwesomeIcon icon={faClock} />
                <span className="ml-1.5">
                  {differenceInHours(
                    new Date(task.closesAt),
                    new Date(task.opensAt)
                  )}
                  h
                </span>
              </p>
            </div>
          </div>
          <h3 className="text-2xl font-semibold my-[0.4rem]">{task.title}</h3>
          <div className="text-sm text-task-lighter flex gap-3">
            <p>
              Memory limit{" "}
              <span className="text-white">{task.memoryLimit}kb</span>
            </p>
            <p>
              Time limit <span className="text-white">{task.timeLimit}s</span>
            </p>
          </div>
          <div className="my-5">
            <div className="wmde-markdown-var">
              <MDEditor.Markdown
                source={task.instructions}
                style={customStyles}
              />
            </div>
          </div>
          <ul className="flex gap-2.5">
            {task.allowedLanguages.map((language) => {
              return (
                <li
                  className="inline-block text-sm rounded-lg bg-transparent p-1.5 px-3 border-[1px] border-task-lighter text-task-lighter font-medium"
                  key={language}
                >
                  {language}
                </li>
              );
            })}
          </ul>
          <div className="flex mt-5 justify-between">
            <a
              className="flex bg-emerald-500 gap-2 p-2 px-3 text-center rounded-b rounded text-xs  font-semibold text-white"
              href={`/job/${jobId}`}
            >
              SEE RELATED JOB OFFER
              <div>
                <FontAwesomeIcon icon={faChevronRight} />
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </a>
            {withToggle === true ? (
              <button
                onClick={toggleHidden}
                className="bg-task-bck p-2 rounded hover:bg-main-lighter-2"
              >
                <FontAwesomeIcon
                  icon={faDownLeftAndUpRightToCenter}
                  className="text-main-lighter"
                />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
