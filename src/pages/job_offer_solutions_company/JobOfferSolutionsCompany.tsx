import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {downloadSolutionFiles} from "../../services/JobOfferService";
import { useAuth } from "../../hooks/useAuth";
import TaskFeedbackWorkspace from "../../components/job_offer_solutions_company/TaskFeedbackWorkspace";
import MyFile from "../../models/MyFile";


const JobOfferSolutionsCompany: React.FC = () => {
    const { solutionId } = useParams<{ solutionId: string }>();
    const { accessToken } = useAuth();
    const [ solutionFiles, setSolutionFiles] = useState<MyFile[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (accessToken && solutionId) {
                    const response = await downloadSolutionFiles(solutionId, accessToken);
                    if (response.ok) {
                        const fetchedFiles = await response.json();
                        setSolutionFiles(fetchedFiles);
                    } else {
                        console.error('Error downloading files:', response.statusText);
                    }
                } else {
                    console.log("No access token provided or job offer ID missing");
                }
            } catch (error) {
                console.error("Error fetching job offer details:", error);
            }
        };
        fetchData();
    }, [accessToken, solutionId]);


    if(solutionFiles){
        return(
            <div className="flex flex-col gap-[2rem] lg:flex-row w-[90%] mx-auto h-full lg:h-[calc(100vh-120px)]">
                <TaskFeedbackWorkspace
                    solutionFiles={solutionFiles}
                    solutionId={solutionId!}
                    isEditable={false}
                />
            </div>
        )
    }
    return (
        <>
        </>
    )
};

export default JobOfferSolutionsCompany;
