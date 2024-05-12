import React, { useState } from "react";
import TaskPreview from "../../models/TaskPreview";
import TaskStatus from "../../models/TaskStatus";
import FilterButton from "./FilterButton";

const FilterPanel: React.FC<{ tasks: TaskPreview[]; setFilteredTasks }> = ({
  tasks,
  setFilteredTasks,
}) => {
  const [lastClickedButton, setLastClickedButton] = useState<string>("all");

  const getCount = (filteredTasks: TaskPreview[]) => {
    return filteredTasks.length;
  };

  const showRecent = () => {
    setLastClickedButton("recent");
  };

  const showAll = () => {
    setLastClickedButton("all");
    setFilteredTasks(tasks);
  };

  const showRated = () => {
    setLastClickedButton("rated");
    setFilteredTasks(tasks.filter((task) => task.feedback != null));
  };

  const showUnrated = () => {
    setLastClickedButton("unrated");
    setFilteredTasks(
      tasks.filter((task) => task.feedback == null)
    );
  };

  const showBookmarked = () => {
    setLastClickedButton("bookmarked");
    setFilteredTasks(tasks.filter((task) => task.isBookmarked));
  };

  return (
    <ul className="bg-ide-color list-none border-main-border border-[1px] border-solid w-full p-0 text-sm rounded-lg h-auto">
      <li>
        {/* <button className={lastClickedButton === "recent" ? "bg-secondary-bg-color" : ""} onClick={showRecent}  > */}
        <FilterButton
          className={`rounded-t-lg text-[#e5ce54] 
            ${lastClickedButton === "recent" ? "bg-secondary-bg-color" : ""}
          `}
          onClick={showRecent}
        >
          <span>recent activity</span>

        </FilterButton>
        {/* </button> */}
      </li>
      <li>
        <FilterButton
          className={lastClickedButton === "all" ? "bg-secondary-bg-color" : ""}
          onClick={showAll}
        >
          <span>all</span>
          <span>{getCount(tasks)}</span>
        </FilterButton>
      </li>
      <li>
        <FilterButton
          className={
            lastClickedButton === "unrated" ? "bg-secondary-bg-color" : ""
          }
          onClick={showUnrated}
        >
          <span>unrated </span>
          <span>
            {getCount(
              tasks.filter((task) => task.feedback != null)
            )}
          </span>
        </FilterButton>
      </li>
      <li>
        <FilterButton
          className={
            lastClickedButton === "rated" ? "bg-secondary-bg-color" : ""
          }
          onClick={showRated}
        >
          <span>rated </span>
          <span>
            {getCount(tasks.filter((task) => task.feedback != null))}
          </span>
        </FilterButton>
      </li>
      <li>
        <FilterButton
          className={`rounded-b-lg border-none
            ${lastClickedButton === "bookmarked" ? "bg-secondary-bg-color" : ""}
          `}
          onClick={showBookmarked}
        >
          <span>bookmarked</span>
          <span>{getCount(tasks.filter((task) => task.isBookmarked))}</span>
        </FilterButton>
      </li>
    </ul>
  );
};

export default FilterPanel;
