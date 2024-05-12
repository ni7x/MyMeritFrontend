import React, {useEffect, useState} from "react";
import MyFile from "../../../models/MyFile";
import Cookies from "universal-cookie";

import UserTaskDTO from "../../../models/dtos/UserTaskDTO";
import {useAuth} from "../../../hooks/useAuth";
import {downloadFiles, downloadFilesForJob, submitSolution} from "../../../services/JobOfferService";
import {ContentType} from "../../editor_workspace/utils/fileUtils";
import {errorToast, loadingToast, successToast} from "../../../main";
import {mergeFilesWithCookies, serializeFiles} from "../../editor_workspace/utils/cookieFunctions";
import EditorWorkspace from "../../editor_workspace/EditorWorkspace";
import SubmitButton from "./SubmitButton";

const cookies = new Cookies();

const TaskSolutionWorkspace: React.FC<{ jobId: string, task: UserTaskDTO, isEditable: boolean }> = ({ jobId, task, isEditable }) => {
    const {accessToken} = useAuth();
    const [currentLanguage, setCurrentLanguage] = useState<string>(
        task.templateFiles && Object.keys(task.templateFiles).length > 0
            ? Object.keys(task.templateFiles)[0]
            : (task.allowedLanguages[0] ?? "")
    );
    const currentTaskCookies = (cookies.get(jobId + "-" + currentLanguage ??  task?.allowedLanguages[0]));
    const [files, setFiles] = useState<MyFile[]>([]);
    const [filesFetched, setFilesFetched] = useState(false);
    const [mainFileIndex] = useState<number>(currentTaskCookies ? currentTaskCookies.mainFileIndex : 0);
    const [currentFileIndex] = useState<number>(currentTaskCookies ? currentTaskCookies.mainFileIndex : 0);

    const currentFile = files[currentFileIndex];

    useEffect(() => {
        const initializeFiles = async () => {
            if (task.userSolution) {
                try {
                    const response = await downloadFilesForJob(jobId, accessToken!);
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
                console.log(currentLanguage)
                setFiles(currentTaskCookies.files.map(file => new MyFile(file.name, file.type, file.contentBase64)));
                setFilesFetched(true);
            } else if(task.templateFiles && task.templateFiles[currentLanguage]){
                const filesToDownload = task.templateFiles[currentLanguage];
                const response = await downloadFiles(filesToDownload, accessToken!);
                if (response.ok) {
                    const fetchedFiles = await response.json();
                    setFiles(fetchedFiles);
                    setFilesFetched(true);
                } else {
                    console.error('Error downloading template files:', response.statusText);
                }
            }
            else{
                setFiles([new MyFile("main.cpp", ContentType.TXT, "")]);
                setFilesFetched(true);
            }
        };
        initializeFiles();
    }, [task, accessToken, currentLanguage]);

    useEffect(() => {
        if (filesFetched) {
            cookies.set(jobId + "-" + currentLanguage, serializeFiles(files, jobId, mainFileIndex, currentLanguage),  { expires: new Date(task.closesAt) });
        }
    }, [files, jobId, filesFetched, mainFileIndex]);




    const submit = () => {
        const id = loadingToast("Submitting your solution...");

        const fetchData = async () => {
            try {
                if (accessToken) {
                    const response = await submitSolution(jobId, files, accessToken, currentLanguage, files[mainFileIndex].name);
                    if (response.ok) {
                        successToast("Submitted successfully!", id);
                    } else {
                        errorToast("Something didn't work", id);
                    }
                } else {
                    errorToast("Invalid access token", id);
                }
            } catch (error) {
                errorToast("Credentials expired", id);
            }
        };

        fetchData();
    };

    console.log(task)

    return (
        <div className="flex flex-col w-full lg:w-[65%] items-end h-auto">
            {currentFile && (
                <div className="flex flex-col w-full h-full">
                    <EditorWorkspace
                        files={files}
                        setFiles={setFiles}
                        isEditable={isEditable}
                        isFeedbackView={task.companyFeedback !== null}
                        task={task}
                        currentLanguage={currentLanguage}
                        setCurrentLanguage={setCurrentLanguage}
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
