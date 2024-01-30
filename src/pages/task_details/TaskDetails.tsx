import React from "react";
import "./task_details.css";
import { useParams } from "react-router-dom";
import TaskInfo from "../../components/task_details/TaskInfo";
import TaskSolutionWorkspace from "../../components/task_details/TaskSolutionWorkspace";

const TaskDetails: React.FC = () => {

    const { id } = useParams<{ id: string }>();

    return (
        <div className={"task-details"}>
            <TaskInfo taskId={id!}></TaskInfo>
            <TaskSolutionWorkspace taskId={id!}></TaskSolutionWorkspace>
        </div>
    );
};

export default TaskDetails;