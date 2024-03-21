import { useEffect, useState } from "react";
import TaskPreview from "../../models/TaskPreview";
import { getUserTasks } from "../../services/JobOfferService";
import TaskList from "../../components/my_tasks/TaskList";
import SortPanel from "../../components/my_tasks/SortPanel";
import FilterPanel from "../../components/my_tasks/FilterPanel";

const MyTasks = () => {
  const [tasks, setTasks] = useState<TaskPreview[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskPreview[]>([]);

  useEffect(() => {
    const tasks_json = getUserTasks("0");
    setTasks(tasks_json);
    setFilteredTasks(tasks_json);
  }, []);

  return (
    <div className="flex flex-col justify-center md:flex-row gap-8">
      <div className="w-[100%] m-0 min-w-[150px] md:w-[25%] md:mx-8 lg:w-[15%]">
        <FilterPanel tasks={tasks} setFilteredTasks={setFilteredTasks} />
      </div>
      <div className="list-none flex flex-col w-full md:w-[60%] lg:w-[50%]">
        <SortPanel
          filteredTasks={filteredTasks}
          setFilteredTasks={setFilteredTasks}
        />
        <TaskList tasks={filteredTasks} />
      </div>
    </div>
  );
};

export default MyTasks;
