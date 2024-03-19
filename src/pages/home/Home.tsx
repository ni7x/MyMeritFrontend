import React, { useEffect, useState } from "react";
import TaskList from "../../components/home_tasks/TaskList";
import Task from "../../models/Task";
import { getHomeTasks } from "../../services/TaskService";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../../components/home_tasks/Pagination";
import FilterPanel from "../../components/home_tasks/FilterPanel";
import QueryParams from "../../models/QueryParams";
import SortPanel from "../../components/home_tasks/SortPanel";
import SecondWrapper from "../../components/SecondWrapper";

const Home: React.FC = () => {
  // const searchParams = new URLSearchParams(useLocation().search);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"), 10)
    : 1;

  const languages = searchParams.get("languages");

  const minCredits = searchParams.get("minCredits")
    ? parseInt(searchParams.get("minCredits"))
    : undefined;
  const maxCredits = searchParams.get("maxCredits")
    ? parseInt(searchParams.get("maxCredits"))
    : undefined;

  const timeLeft = searchParams.get("timeLeft")
    ? parseInt(searchParams.get("timeLeft"))
    : undefined;

  const [maxPage, setMaxPage] = useState<number>(1);
  const [tasks, setTasks] = useState<Task[]>([]);

  const queryParams: QueryParams = {
    languages: languages,
    minCredits: minCredits,
    maxCredits: maxCredits,
    timeLeft: timeLeft,
  };

  useEffect(() => {
    const tasks_json = getHomeTasks(page, queryParams);
    setTasks(tasks_json._embedded.tasks);
    setMaxPage(tasks_json.page.totalPages);
  }, [page, languages, minCredits, maxCredits, timeLeft]);

  return (
    <SecondWrapper>
      <div className="flex flex-col gap-x-10 h-full w-[100%] items-center lg:items-baseline">
        <div className="flex flex-col-reverse gap-x-10 lg:flex-row w-full">
          <div className="lg:w-[70%]">
            <TaskList tasks={tasks} />
            <Pagination
              page={page}
              maxPages={maxPage}
              queryParams={queryParams}
            />
          </div>
          <FilterPanel queryParams={queryParams} />
        </div>
      </div>
    </SecondWrapper>
  );
};

export default Home;
