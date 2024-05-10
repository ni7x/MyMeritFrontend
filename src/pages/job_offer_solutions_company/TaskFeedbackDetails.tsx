import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {getJobOfferById} from "../../services/JobOfferService";
import {useAuth} from "../../hooks/useAuth";
import TaskFeedbackWorkspace from "../../components/job_offer_details/feedback_workspace/TaskFeedbackWorkspace";
import UserTaskDTO from "../../models/dtos/UserTaskDTO";
import TaskInfo from "../../components/job_offer_details/task_info/TaskInfo";


const TaskFeedbackDetails: React.FC = () => {
    const { solutionId } = useParams<{ solutionId: string }>();
    const { jobId } = useParams<{ jobId: string }>();
    const [ task, setTask] = useState<UserTaskDTO>();
    const { accessToken } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (accessToken && jobId) {
                    const response = await getJobOfferById(jobId, accessToken);
                    if (response) {
                        setTask(response.task);
                    }
                } else {
                    console.log("No access token provided or job offer ID missing");
                }
            } catch (error) {
                console.error("Error fetching job offer details:", error);
            }
        };
        fetchData();
    }, [accessToken, jobId]);

    console.log(task)
    if(task){
        return(
            <div className="flex flex-col gap-3 lg:flex-row w-[90%] mx-auto h-full lg:h-[calc(100vh-120px)]">
                <div className="w-[100%] lg:flex-1">
                    <TaskInfo
                        task={task}
                        jobId={jobId}
                    />
                </div>
                <TaskFeedbackWorkspace
                    solutionId={solutionId!}
                    isEditable={true}
                    task={task}
                />
            </div>
        )
    }
    return (
        <>
        </>
    )
};

export default TaskFeedbackDetails;
