import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import TaskInfo from "../../components/task_details/TaskInfo/TaskInfo";
import TaskSolutionWorkspace from "../../components/task_details/TaskSolutionWorkspace/TaskSolutionWorkspace";
import {getJobOfferById} from "../../services/JobOfferService";
import {useAuth} from "../../hooks/useAuth";
import JobOfferDetailsDTO from "../../models/dtos/JobOfferDetailsDTO";

const JobOfferDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [ jobOffer, setJobOffer ] = useState<JobOfferDetailsDTO>();
    const { accessToken } = useAuth();

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
        if(jobOffer.task){
            return (
                <div className="flex flex-col gap-[2rem] lg:flex-row w-[100%] ">
                    <TaskInfo task={jobOffer.task}></TaskInfo>
                    <TaskSolutionWorkspace task={jobOffer.task}></TaskSolutionWorkspace>
                </div>
            );
        }else{
            return (
                <div className="flex flex-col gap-[2rem] lg:flex-row w-[100%] ">
                    Job details
                </div>

            );
        }

    }

};

export default JobOfferDetails;
