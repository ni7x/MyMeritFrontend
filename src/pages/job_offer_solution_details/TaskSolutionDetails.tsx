import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import TaskInfo from "../../components/job_offer_details/task_info/TaskInfo";
import TaskSolutionWorkspace from "../../components/job_offer_details/task_solution_workspace/TaskSolutionWorkspace";
import { getJobOfferById } from "../../services/JobOfferService";
import { useAuth } from "../../hooks/useAuth";
import JobOfferDetailsDTO from "../../models/dtos/JobOfferDetailsDTO";
import TaskStatus from "../../models/TaskStatus";
import CompanySolutions from "../../components/job_offer_details/solution_list/CompanySolutions";
import TaskFeedbackWorkspace from "../../components/job_offer_details/feedback_workspace/TaskFeedbackWorkspace";

const TaskSolutionDetails: React.FC = () => {
    const {id: jobOfferId} = useParams<{ id: string }>();
    const {solutionId: solutionId} = useParams<{ solutionId: string }>();
    const [jobOffer, setJobOffer] = useState<JobOfferDetailsDTO | null>(null);
    const {accessToken} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (accessToken && jobOfferId) {
                    const response = await getJobOfferById(jobOfferId, accessToken);
                    setJobOffer(response);
                } else {
                    console.log("No access token provided or job offer ID missing");
                }
            } catch (error) {
                console.error("Error fetching job offer details:", error);
            }
        };
        fetchData();
    }, [accessToken, jobOfferId]);

    if (!jobOffer) {
        return <p>Loading...</p>;
    }

    const { task, solutions } = jobOffer;
    const feedback = task.companyFeedback;

    if (!task || (task.status !== TaskStatus.OPEN && !task.userSolution)) {
        return <Navigate to={`/job/${jobOfferId}`} />;
    }

    return (
        <div className="flex flex-col gap-[2rem] lg:flex-row w-[90%] mx-auto h-full lg:h-[calc(100vh-120px)]">
            <TaskInfo
                task={task}
                solutionId={jobOfferId}
            />
            {solutions ? (
                <CompanySolutions
                    solutions={solutions}
                />
            )
            : (
                feedback ? (
                    <TaskFeedbackWorkspace
                        jobId={jobOfferId!}
                        task={task}
                        isEditable={false}
                        originalUserFiles={task.userSolution}
                     solutionId={solutionId!}/>
                )
                :(
                    <TaskSolutionWorkspace
                        jobId={jobOfferId!}
                        task={task}
                        isEditable={task.status === TaskStatus.OPEN}
                    />
                )
            )}
        </div>
    );
};

export default TaskSolutionDetails;
