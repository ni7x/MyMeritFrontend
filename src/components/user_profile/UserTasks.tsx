import { useEffect, useState } from "react";
import { Task as TaskDto } from "../../types/Task";
import UserSection from "./UserSection";
import { getUserTasks } from "../../services/UserService";
import Task from "../../components/my_tasks/Task";
import Skeleton from "react-loading-skeleton";

const UserTasks = () => {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getUserTasks().then((tasksApi: TaskDto[]) => {
      setTasks(tasksApi);
      setIsLoading(false);
    });
  }, []);

  return (
    //<MyTasks/>
    <UserSection>
      <div className="px-12 py-4">
        <div className="w-full justify-start align-center flex flex-row gap-4 py-2">
          <div className="flex items-center">
            <p className="text-2xl">My tasks</p>
          </div>
        </div>
        <div className="w-full">
          {isLoading ? (
            <Skeleton count={5} />
          ) : (
            <>
              {tasks.length != 0 ? (
                tasks.map((task, index) => {
                  return <Task key={index} task={task} />;
                })
              ) : (
                <p className="absolute top-0 left-0 h-full w-full flex justify-center items-center text-sm text-gray-500 py-2">
                  You don't have any completed tasks yet.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </UserSection>
  );
};

export default UserTasks;
