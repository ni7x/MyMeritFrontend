import { useEffect, useState } from "react";
import {getUserSolutions} from "../../services/JobOfferService";
import TaskList from "../../components/my_tasks/TaskList";
import SortPanel from "../../components/my_tasks/SortPanel";
import FilterPanel from "../../components/my_tasks/FilterPanel";
import {useAuth} from "../../hooks/useAuth";
import SolutionPreview from "../../models/TaskPreview";

const MyTasks = () => {
  const [tasks, setTasks] = useState<SolutionPreview[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<SolutionPreview[]>([]);
  const {accessToken} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(accessToken){
          const response = await getUserSolutions(accessToken);
          setTasks(response);
          setFilteredTasks(response)
        }else{
          console.log("No token provided")
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <header className="pb-2">
        <h1 className="text-xl font-bold">YOUR SOLUTIONS</h1>
      </header>
      <div className="flex flex-col md:grid grid-cols-[200px_1fr]  gap-4">
        {tasks && <>
          <div>
            <FilterPanel tasks={tasks} setFilteredTasks={setFilteredTasks} />
          </div>
          <div className="list-none flex flex-col">
            <TaskList tasks={filteredTasks} />
          </div>
        </>}

      </div>
    </>
  );
};

export default MyTasks;
