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
    <>
      <header className="pb-2">
        <h1 className="text-2xl">Your tasks</h1>
      </header>
      <div className="flex flex-col md:grid grid-cols-[200px_1fr] justify-center gap-8">
        <FilterPanel tasks={tasks} setFilteredTasks={setFilteredTasks} />
        <div className="list-none flex flex-col">
          <SortPanel
            filteredTasks={filteredTasks}
            setFilteredTasks={setFilteredTasks}
          />
          <TaskList tasks={filteredTasks} />
        </div>
      </div>
    </>
  );
};

export default MyTasks;
