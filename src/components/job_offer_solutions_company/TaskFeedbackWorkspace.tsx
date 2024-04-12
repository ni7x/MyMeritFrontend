import React, { useEffect, useState } from "react";
import MyFile from "../../models/MyFile";
import {errorToast, successToast} from "../../main";
import {downloadFiles, submitFeedback, submitSolution} from "../../services/JobOfferService";
import {mergeFilesWithCookies, serializeFiles} from "../job_offer_details/TaskSolutionWorkspace/solutionFunctions";
import {ContentType, decodeBase64, getContentType} from "../job_offer_details/TaskSolutionWorkspace/utils/fileUtils";
import FileTabManager from "../job_offer_details/TaskSolutionWorkspace/components/FileTabManager/FileTabManager";
import Ide from "../job_offer_details/TaskSolutionWorkspace/components/IDE/Ide";
import {useAuth} from "../../hooks/useAuth";
import Cookies from "universal-cookie";

interface TaskFeedbackWorkspaceProps {
    solutionFiles: MyFile[];
    solutionId: string;
    isEditable: boolean;
}

const cookies = new Cookies();

const TaskFeedbackWorkspace: React.FC<TaskFeedbackWorkspaceProps> = ({ solutionFiles, solutionId, isEditable }) => {
    const [files, setFiles] = useState<MyFile[]>([]);
    const [userFiles] = useState<MyFile[]>(solutionFiles);
    const [filesFetched, setFilesFetched] = useState(false);
    const [mainFileIndex, setMainFileIndex] = useState<number>( 0);
    const [currentFileIndex, setCurrentFileIndex] = useState<number>( 0);
    const currentFile = files[currentFileIndex];

    const { accessToken } = useAuth();

    useEffect(() => {
        const initializeFiles = async () => {
            const currentFeedbackCookies = cookies.get("solution-" + solutionId)
            if (currentFeedbackCookies) {
                    setFiles(currentFeedbackCookies.files.map(file => new MyFile(file.name, file.type, file.contentBase64)));
                    setFilesFetched(true)
            }else{
                setFiles(solutionFiles);
                setFilesFetched(true)
            }
        };
        initializeFiles();
    }, [solutionId, accessToken]);

    useEffect(() => {
        if(filesFetched)
            cookies.set("solution-" + solutionId, serializeFiles(files, solutionId, mainFileIndex), { });
    }, [files, mainFileIndex]);


    const getFileByName = (name: string) => {
        return files.find(file => file.name === name);
    };

    const setCurrentFileByName = (name: string) => {
        const index = files.findIndex(file => file.name === name);
        setCurrentFileIndex(index);
    };

    const addFile = (name: string, content: string=atob(" ")) => {
        if (!getFileByName(name)) {
            if(name.trim() != ""){
                const newFile = new MyFile(name, getContentType(name), content);
                setFiles(prevFiles => [...prevFiles, newFile]);
                setCurrentFileIndex(files.length);
            }else{
                errorToast("File must have name")
            }
        } else {
            errorToast("File with this name already exists")
        }
    };

    const removeFile = (name: string) => {
        const fileToRemove = getFileByName(name);
        const fileIndex = files.findIndex(f => f.name === fileToRemove.name);
        if(files.length === 1 || fileIndex == mainFileIndex){
            errorToast("Can't remove main file")
            return;
        }
        if (fileToRemove) {
            setCurrentFileIndex(0);
            setFiles(prevFiles => prevFiles.filter(file => file.name !== name));
        } else {
            console.log("File not found.");
        }
    };

    const setAsMain = (name: string) => {
        const fileIndex = files.findIndex(f => f.name === name);
        if (fileIndex !== -1) {
            setMainFileIndex(fileIndex);
        }
    };

    const renameFile = (name: string, newName: string) => {
        const fileToRename = getFileByName(name);
        if(!getFileByName(newName)){
            if (fileToRename) {
                setFiles(prevFiles => {
                    return prevFiles.map(file => {
                        if (file.name === name) {
                            return {...file, name: newName};
                        }
                        return file;
                    });
                });
            }
        }else{
            console.log("This file name already exists")
        }
    }

    const submit = () => {
        const fetchData = async () => {
            try {
                if(accessToken){
                    const response = await submitFeedback(solutionId, files, 500, accessToken);
                    if(response.ok)
                        successToast("Feedback submitted");
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
                    <FileTabManager
                        addFile={(addFile)}
                        removeFile={(removeFile)}
                        renameFile={(renameFile)}
                        currentFile={currentFile}
                        files={files}
                        mainFileIndex={mainFileIndex}
                        getFileByName={getFileByName}
                        setCurrentFileByName={(setCurrentFileByName)}
                    />
                    <Ide
                        files={files}
                        isFeedbackView={true}
                        userFiles={userFiles}
                        currentFileIndex={currentFileIndex}
                        setFiles={(setFiles)}
                        addFile={(addFile)}
                        mainFileIndex={mainFileIndex}
                        submitSolution={(submit)}
                        setAsMain={(setAsMain)}
                        isEditable={isEditable}
                    />
                </div>
            )}
        </div>
    );
};

export default TaskFeedbackWorkspace;
