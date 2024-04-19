import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {downloadSolutionFiles, getJobOfferById} from "../../services/JobOfferService";
import { useAuth } from "../../hooks/useAuth";
import TaskFeedbackWorkspace from "../../components/job_offer_details/feedback_workspace/TaskFeedbackWorkspace";
import MyFile from "../../models/MyFile";
import UserTaskDTO from "../../models/dtos/UserTaskDTO";


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


    if(task){
        return(
            <div className="flex flex-col gap-[2rem] lg:flex-row w-[90%] mx-auto h-full lg:h-[calc(100vh-120px)]">
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
