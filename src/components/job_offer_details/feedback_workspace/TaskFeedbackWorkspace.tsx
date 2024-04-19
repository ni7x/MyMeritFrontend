import React, { useEffect, useState } from "react";
import MyFile from "../../../models/MyFile";
import {errorToast, successToast} from "../../../main";
import {downloadFeedbackFiles, downloadSolutionFiles, submitFeedback} from "../../../services/JobOfferService";
import {mergeFilesWithCookies, serializeFiles} from "../../editor_workspace/utils/cookieFunctions";
import {useAuth} from "../../../hooks/useAuth";
import Cookies from "universal-cookie";
import EditorWorkspace from "../../editor_workspace/EditorWorkspace";
import FeedbackButton from "./FeedbackButton";
import UserTaskDTO from "../../../models/dtos/UserTaskDTO";

interface TaskFeedbackWorkspaceProps {

    solutionId: string;
    isEditable: boolean;
    task: UserTaskDTO;
}

const cookies = new Cookies();

const TaskFeedbackWorkspace: React.FC<TaskFeedbackWorkspaceProps> = ({ solutionId, isEditable, task }) => {
    const [files, setFiles] = useState<MyFile[]>([]);
    const [originalFiles, setOriginalFiles] = useState<MyFile[]>([]);
    const [filesFetched, setFilesFetched] = useState(false);
    const [mainFileIndex] = useState<number>( 0);
    const [currentFileIndex] = useState<number>( 0);
    const currentFile = files[currentFileIndex];

    const { accessToken } = useAuth();

    useEffect(() => {
        const initializeFiles = async () => {
            const response = await downloadSolutionFiles(solutionId, accessToken);
            const feedback = await downloadFeedbackFiles(solutionId, accessToken);
            if (response.ok) {
                const fetchedFiles = await response.json();
                console.log(fetchedFiles)
                setOriginalFiles(fetchedFiles);
            }
            if (feedback.ok) {
                const fetchedFiles = await feedback.json();
                setFiles(fetchedFiles);
            }

            const currentFeedbackCookies = cookies.get("solution-" + solutionId)
            if (currentFeedbackCookies) {
                    setFiles(currentFeedbackCookies.files.map(file => new MyFile(file.name, file.type, file.contentBase64)));
                    setFilesFetched(true)
            }

            if(files.length == 0){
                setFiles(originalFiles)
            }
        };
        initializeFiles();
    }, [solutionId, accessToken]);

    useEffect(() => {
        console.log(originalFiles)
        if(filesFetched && files)
            cookies.set("solution-" + solutionId, serializeFiles(files, solutionId, mainFileIndex), { });
    }, [files, mainFileIndex]);


    const submit = () => {
        const fetchData = async () => {
            try {
                if(accessToken){
                    const response = await submitFeedback(solutionId, files, 0, accessToken);
                    if (response.ok) {
                        successToast("Feedback submitted");
                    }
                }else{
                    errorToast("Invalid access token");
                }
            } catch (error) {
                errorToast("Credentials expired");
            }
        };
        fetchData();
    };

    return (
        <div className="flex flex-col w-full  items-end h-auto">
            {currentFile && (
                <div className="flex flex-col w-full h-full">
                    <EditorWorkspace
                        files={files}
                        setFiles={setFiles}
                        isEditable={isEditable}
                        isFeedbackView={true}
                        originalFiles={originalFiles}
                        task={task}
                        submitComponent={
                            isEditable ?
                                <FeedbackButton
                                    submit={submit}
                                />
                                :
                                <p className="flex  gap-1 justify-center items-center bg-terminal-color text-sm font-medium rounded w-1/2 text-white"
                                >
                                     <span className="text-merit-credits-color">{task.companyFeedback?.credits}  MC</span>
                                </p>
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default TaskFeedbackWorkspace;
