import React from "react";
import TaskPreview from "../../models/TaskPreview";
import SortButton from "./SortButton";

const SortPanel: React.FC<{
  filteredTasks: TaskPreview[];
  setFilteredTasks: (tasks: TaskPreview[]) => void;
}> = ({ filteredTasks, setFilteredTasks }) => {
  const sortByName = (isAscending: boolean) => {
    const tasks = [...filteredTasks];
    if (isAscending) {
      setFilteredTasks(tasks.sort((t1, t2) => t1.name.localeCompare(t2.name)));
    } else {
      setFilteredTasks(tasks.sort((t1, t2) => t2.name.localeCompare(t1.name)));
    }
  };

  const sortByDate = (isAscending: boolean) => {
    const tasks = [...filteredTasks];
    if (isAscending) {
      setFilteredTasks(
        tasks.sort(
          (t1, t2) => t1.submitDate.getTime() - t2.submitDate.getTime()
        )
      );
    } else {
      setFilteredTasks(
        tasks.sort(
          (t1, t2) => t2.submitDate.getTime() - t1.submitDate.getTime()
        )
      );
    }
  };

  const sortByCredits = (isAscending: boolean) => {
    const tasks = [...filteredTasks];
    if (isAscending) {
      setFilteredTasks(
        tasks.sort(
          (t1: TaskPreview, t2: TaskPreview) => t1.credits - t2.credits
        )
      );
    } else {
      setFilteredTasks(tasks.sort((t1, t2) => t2.credits - t1.credits));
    }
  };

  return (
    <ul className="w-full list-none flex justify-between pt-2 pl-2 pr-2 pb-0 font-semibold">
      <SortButton name={"task name"} sortFunction={sortByName} />
      <SortButton name={"date solved"} sortFunction={sortByDate} />
      <SortButton name={"status"} />
      <SortButton name={"mc"} sortFunction={sortByCredits} />
    </ul>
  );
};

export default SortPanel;
