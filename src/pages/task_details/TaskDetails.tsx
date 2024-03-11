import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import TaskInfo from "../../components/task_details/TaskInfo/TaskInfo";
import TaskSolutionWorkspace from "../../components/task_details/TaskSolutionWorkspace/TaskSolutionWorkspace";
import {getTaskById} from "../../services/TaskService";
import UserTask from "../../models/UserTask";
import {useAuth} from "../../hooks/useAuth";

const TaskDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [ task, setTask ] = useState<UserTask>();
    const { accessToken } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(accessToken){
                    const response = await getTaskById(id!, accessToken);
                    if (response.ok) {
                        setTask(await response.json());
                    }
                }else{
                    console.log("No token provided")
                }

            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchData();
    }, []);


    if(task){
        return (
            <div className="flex flex-col gap-[2rem] lg:flex-row w-[100%] ">
                <TaskInfo task={task}></TaskInfo>
                <TaskSolutionWorkspace task={task}></TaskSolutionWorkspace>
            </div>

        );
    }

};

export default TaskDetails;
