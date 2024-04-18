import React, {useEffect, useState} from "react";
import MyFile from "../../../models/MyFile";
import Cookies from "universal-cookie";

import UserTaskDTO from "../../../models/dtos/UserTaskDTO";
import {useAuth} from "../../../hooks/useAuth";
import {downloadFiles, submitSolution} from "../../../services/JobOfferService";
import {ContentType} from "../../editor_workspace/utils/fileUtils";
import {errorToast, successToast} from "../../../main";
import {mergeFilesWithCookies, serializeFiles} from "../../editor_workspace/utils/cookieFunctions";
import EditorWorkspace from "../../editor_workspace/EditorWorkspace";
import SubmitButton from "./SubmitButton";

const cookies = new Cookies();

const TaskSolutionWorkspace: React.FC<{ jobId: string, task: UserTaskDTO, isEditable: boolean }> = ({ jobId, task, isEditable }) => {
    const {accessToken} = useAuth();
    const currentTaskCookies = cookies.get(jobId);

    const [files, setFiles] = useState<MyFile[]>([]);
    const [filesFetched, setFilesFetched] = useState(false);
    const [mainFileIndex] = useState<number>(currentTaskCookies ? currentTaskCookies.mainFileIndex : 0);
    const [currentFileIndex] = useState<number>(currentTaskCookies ? currentTaskCookies.mainFileIndex : 0);

    const currentFile = files[currentFileIndex];

    useEffect(() => {
        const initializeFiles = async () => {
            if (task.userSolution) {
                try {
                    const response = await downloadFiles(jobId, accessToken);
                    if (response.ok) {
                        const fetchedFiles = await response.json();
                        const mergedFiles = currentTaskCookies ? mergeFilesWithCookies(fetchedFiles, currentTaskCookies) : fetchedFiles;
                        setFiles(mergedFiles);
                        setFilesFetched(true);
                    } else {
                        console.error('Error downloading files:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching solution files:', error);
                }
            } else if (currentTaskCookies) {
                setFiles(currentTaskCookies.files.map(file => new MyFile(file.name, file.type, file.contentBase64)));
                setFilesFetched(true);
            }else{
                setFiles([new MyFile("main.cpp", ContentType.TXT, "")]);
                setFilesFetched(true);
            }
        };
        initializeFiles();
    }, [task, accessToken]);

    useEffect(() => {
        if (filesFetched) {
            cookies.set(jobId, serializeFiles(files, jobId, mainFileIndex),  { expires: new Date(task.closesAt) });
        }
    }, [files, jobId, filesFetched, mainFileIndex]);


    const submit = () => {
        const fetchData = async () => {
            try {
                if(accessToken){
                    const response = await submitSolution(jobId, files, accessToken);
                    console.log(response)
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
                        isFeedbackView={false}
                        task={task}
                        submitComponent={
                            <SubmitButton
                                submitSolution={submit}
                                isClosed={false}
                            />
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default TaskSolutionWorkspace;
