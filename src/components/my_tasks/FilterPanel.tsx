import React, { useState } from "react";
import TaskPreview from "../../models/TaskPreview";
import FilterButton from "./FilterButton";
import JobOfferListedDTO from "src/models/dtos/JobOfferListedDTO";

const FilterPanel: React.FC<{
  tasks: TaskPreview[];
  setFilteredTasks: (tasks: TaskPreview[]) => void;
  bookmarkedJobs: JobOfferListedDTO[];
  setIsBookmarkedTab: (isBookmarkedTab: boolean) => void;
  setIsSolutionTab: (isSolutionTab: boolean) => void;
}> = ({
  tasks,
  setFilteredTasks,
  bookmarkedJobs,
  setIsBookmarkedTab,
  setIsSolutionTab,
}) => {
  const [lastClickedButton, setLastClickedButton] = useState<string>("all");

  const getCount = (filteredTasks: TaskPreview[]) => {
    return filteredTasks.length;
  };

  const showRecent = () => {
    setLastClickedButton("recent");
    setIsSolutionTab(true);
    setFilteredTasks(
        tasks.filter(
            (task) => task.isRecentActivity
        )
    );
  };

  const showAll = () => {
    setIsBookmarkedTab(true);
    setIsSolutionTab(true);
    setLastClickedButton("all");
    setFilteredTasks(tasks);
  };

  const showRated = () => {
    setIsBookmarkedTab(false);
    setIsSolutionTab(true);
    setLastClickedButton("rated");
    setFilteredTasks(
      tasks.filter(
        (task) => task.feedback !== null && task.feedback !== undefined
      )
    );
  };

  const showUnrated = () => {
    setIsBookmarkedTab(false);
    setIsSolutionTab(true);
    setLastClickedButton("unrated");
    setFilteredTasks(
      tasks.filter(
        (task) => task.feedback === null || task.feedback === undefined
      )
    );
  };

  const showBookmarked = () => {
    setLastClickedButton("bookmarked");
    setIsBookmarkedTab(true);
    setIsSolutionTab(false);
  };

  return (
    <ul className="bg-ide-color list-none border-main-border border-[1px] border-solid w-full p-0 text-sm rounded-lg h-auto">
      <li>
        <FilterButton
          className={`rounded-t-lg text-[#e5ce54] 
            ${
              lastClickedButton === "recent"
                ? "bg-secondary-bg-color font-semibold"
                : "font-medium "
            }
          `}
          onClick={showRecent}
        >
          <span>RECENT ACTIVITY</span>
        </FilterButton>
      </li>
      <li>
        <FilterButton
          className={
            lastClickedButton === "all"
              ? "bg-secondary-bg-color font-semibold"
              : "font-medium "
          }
          onClick={showAll}
        >
          <span>ALL</span>
          <span>{getCount(tasks)}</span>
        </FilterButton>
      </li>
      <li>
        <FilterButton
          className={
            lastClickedButton === "unrated"
              ? "bg-secondary-bg-color font-semibold"
              : "font-medium "
          }
          onClick={showUnrated}
        >
          <span>UNRATED</span>
          <span>
            {getCount(
              tasks.filter(
                (task) => task.feedback === null || task.feedback === undefined
              )
            )}
          </span>
        </FilterButton>
      </li>
      <li>
        <FilterButton
          className={
            lastClickedButton === "rated"
              ? "bg-secondary-bg-color font-semibold"
              : "font-medium "
          }
          onClick={showRated}
        >
          <span>RATED </span>
          <span>
            {getCount(
              tasks.filter(
                (task) => task.feedback !== null && task.feedback !== undefined
              )
            )}
          </span>
        </FilterButton>
      </li>
      <li>
        <FilterButton
          className={`rounded-b-lg border-none
            ${
              lastClickedButton === "bookmarked"
                ? "bg-secondary-bg-color font-semibold"
                : "font-medium "
            }
          `}
          onClick={showBookmarked}
        >
          <span>BOOKMARKED</span>
          <span>{bookmarkedJobs.length}</span>
        </FilterButton>
      </li>
    </ul>
  );
};

export default FilterPanel;
