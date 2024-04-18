import React, { useEffect, useState } from "react";
import MyFile from "../../../models/MyFile";
import {errorToast, successToast} from "../../../main";
import {submitFeedback} from "../../../services/JobOfferService";
import {mergeFilesWithCookies, serializeFiles} from "../../editor_workspace/utils/cookieFunctions";
import {useAuth} from "../../../hooks/useAuth";
import Cookies from "universal-cookie";
import EditorWorkspace from "../../editor_workspace/EditorWorkspace";
import FeedbackButton from "./FeedbackButton";
import UserTaskDTO from "../../../models/dtos/UserTaskDTO";

interface TaskFeedbackWorkspaceProps {
    originalUserFiles: MyFile[];
    solutionId: string;
    isEditable: boolean;
    task: UserTaskDTO;
}

const cookies = new Cookies();

const TaskFeedbackWorkspace: React.FC<TaskFeedbackWorkspaceProps> = ({ originalUserFiles, solutionId, isEditable, task }) => {
    const [files, setFiles] = useState<MyFile[]>([]);
    const [originalFiles] = useState<MyFile[]>(originalUserFiles);
    const [filesFetched, setFilesFetched] = useState(false);
    const [mainFileIndex] = useState<number>( 0);
    const [currentFileIndex] = useState<number>( 0);
    const currentFile = files[currentFileIndex];

    const { accessToken } = useAuth();

    useEffect(() => {
        const initializeFiles = async () => {
            const currentFeedbackCookies = cookies.get("solution-" + solutionId)
            if (currentFeedbackCookies) {
                    setFiles(currentFeedbackCookies.files.map(file => new MyFile(file.name, file.type, file.contentBase64)));
                    setFilesFetched(true)
            }else{
                setFiles(originalUserFiles);
                setFilesFetched(true)
            }
        };
        initializeFiles();
    }, [solutionId, accessToken]);

    useEffect(() => {
        if(filesFetched)
            cookies.set("solution-" + solutionId, serializeFiles(files, solutionId, mainFileIndex), { });
    }, [files, mainFileIndex]);


    const submit = () => {
        const fetchData = async () => {
            try {
                if(accessToken){
                    const response = await submitFeedback(solutionId, files, 0, accessToken);
                    if (response.ok) {
                        successToast("Solution submitted");
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
        <div className="flex flex-col w-full lg:w-[65%] items-end h-auto">
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
                            <FeedbackButton
                                submit={submit}
                            />
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default TaskFeedbackWorkspace;
