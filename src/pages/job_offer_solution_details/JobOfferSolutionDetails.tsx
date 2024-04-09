import React, {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import TaskInfo from "../../components/job_offer_details/TaskInfo/TaskInfo";
import TaskSolutionWorkspace from "../../components/job_offer_details/TaskSolutionWorkspace/TaskSolutionWorkspace";
import {getJobOfferById} from "../../services/JobOfferService";
import {useAuth} from "../../hooks/useAuth";
import JobOfferDetailsDTO from "../../models/dtos/JobOfferDetailsDTO";
import TaskStatus from "../../models/TaskStatus";

const JobOfferSolutionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [ jobOffer, setJobOffer ] = useState<JobOfferDetailsDTO>();
    const { accessToken } = useAuth();
    console.log(jobOffer);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(accessToken){
                    const response = await getJobOfferById(id!, accessToken);
                    if (response.ok) {
                        setJobOffer(await response.json());
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

    if(jobOffer){
        if(!jobOffer.task){
            return <Navigate to={`/job/${id}`} />;
        }
        if(!jobOffer.task.userSolution && jobOffer.task.status !==  TaskStatus.OPEN){
            return <Navigate to={`/job/${id}`} />;
        }

        if(jobOffer.solutions) {
            return (
                <div className="flex flex-col gap-[2rem] lg:flex-row w-[90%] mx-auto h-full lg:h-[calc(100vh-120px)]">
                    <TaskInfo
                        task={jobOffer.task}
                        solutionId={id}
                    >
                    </TaskInfo>
                    {jobOffer.solutions.map(s => {
                        return <p>{s}</p>
                    })}

                </div>
            )
        }

        return (
            <div className="flex flex-col gap-[2rem] lg:flex-row w-[90%] mx-auto h-full lg:h-[calc(100vh-120px)]">
                <TaskInfo
                    task={jobOffer.task}
                    solutionId={id}
                >
                </TaskInfo>
                <TaskSolutionWorkspace
                    jobId={jobOffer.id}
                    task={jobOffer.task}
                    isEditable={jobOffer.task.status == TaskStatus.OPEN}
                >
                </TaskSolutionWorkspace>
            </div>
        );
    }
};

export default JobOfferSolutionDetails;
