import React, { useEffect, useState } from "react";
import "./home.css";
import TaskList from "../../components/home_tasks/TaskList";
import Task from "../../models/Task";
import { getHomeTasks } from "../../services/TaskService";
import { useLocation } from "react-router-dom";
import Pagination from "../../components/home_tasks/Pagination";
import FilterPanel from "../../components/home_tasks/FilterPanel";
import QueryParams from "../../models/QueryParams";
import SortPanel from "../../components/home_tasks/SortPanel";
import SecondWrapper from "../../components/SecondWrapper";

const Home: React.FC = () => {
  const searchParams = new URLSearchParams(useLocation().search);
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

  const [maxPage, setMaxPage] = useState<number>(1);
  const [tasks, setTasks] = useState<Task[]>([]);

  const queryParams: QueryParams = {
    languages: languages,
    minCredits: minCredits,
    maxCredits: maxCredits,
  };

  useEffect(() => {
    const tasks_json = getHomeTasks(page, queryParams);
    setTasks(tasks_json._embedded.tasks);
    setMaxPage(tasks_json.page.totalPages);
  }, [page, languages, minCredits, maxCredits]);

  return (
    // <div className="flex flex-col justify-between w-full xl:w-[60%] mx-auto">
    <SecondWrapper>
      <div className="flex flex-col  gap-x-10 h-full items-center xl:items-baseline">
        <SortPanel />
        <div className="flex w-[70%] flex-col-reverse gap-x-10 xl:flex-row xl:w-[100%]">
          <TaskList tasks={tasks} />
          <FilterPanel queryParams={queryParams} tasks={tasks} />
        </div>
      </div>
      <div>
        <Pagination page={page} maxPages={maxPage} queryParams={queryParams} />
      </div>
    </SecondWrapper>
    // </div>
  );
};

export default Home;
