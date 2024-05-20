import React, { useEffect, useState } from "react";
import MyFile from "../../../models/MyFile";
import { errorToast, successToast } from "../../../main";
import {
    downloadFeedbackFiles,
    downloadSolutionFiles,
    submitFeedback,
} from "../../../services/JobOfferService";
import { serializeFiles } from "../../editor_workspace/utils/cookieFunctions";
import { useAuth } from "../../../hooks/useAuth";
import Cookies from "universal-cookie";
import EditorWorkspace from "../../editor_workspace/EditorWorkspace";
import FeedbackButton from "./FeedbackButton";
import UserTaskDTO from "../../../models/dtos/UserTaskDTO";
import FeedbackModal from "./FeedbackModal";
import {User} from "@types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileDownload, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import JSZip from "jszip";
import { saveAs } from 'file-saver';

interface TaskFeedbackWorkspaceProps {
    solutionId: string;
    isEditable: boolean;
    task: UserTaskDTO;
}

const cookies = new Cookies();

const TaskFeedbackWorkspace: React.FC<TaskFeedbackWorkspaceProps> = ({
                                                                         solutionId,
                                                                         isEditable,
                                                                         task,
                                                                     }) => {
    const [files, setFiles] = useState<MyFile[]>([]);
    const [originalFiles, setOriginalFiles] = useState<MyFile[]>([]);
    const [filesFetched, setFilesFetched] = useState(false);
    const [mainFileIndex] = useState<number>(0);
    const [currentFileIndex] = useState<number>(0);
    const [isAlreadyRated, setIsAlreadyRated] = useState(false);
    const [solutionAuthor, setSolutionAuthor] = useState<User>(null);
    const currentFile = files[currentFileIndex];
    const { accessToken } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState<string>();

    useEffect(() => {
        const initializeFiles = async () => {
            const solution = await downloadSolutionFiles(solutionId, accessToken!);
            const feedback = await downloadFeedbackFiles(solutionId, accessToken!);
            if (solution.ok) {
                const fetchedSolution = await solution.json();
                console.log(fetchedSolution);
                setCurrentLanguage(fetchedSolution.language);
                setIsAlreadyRated(fetchedSolution.isAlreadyRated);
                setSolutionAuthor(fetchedSolution.user);//sry za ten caly burdel xd
                setOriginalFiles(fetchedSolution.files);
                setFiles(fetchedSolution.files);
            }
            if (feedback.ok) {
                const fetchedFiles = await feedback.json();
                if (fetchedFiles.length > 0) {
                    setFiles(fetchedFiles);
                }
            }
            const currentFeedbackCookies = cookies.get("solution-" + solutionId);
            if (currentFeedbackCookies) {
                setFiles(
                    currentFeedbackCookies.files.map(
                        (file: MyFile) =>
                            new MyFile(file.name, file.type, file.contentBase64)
                    )
                );
            }
        };
        initializeFiles().then(() => setFilesFetched(true));
    }, [solutionId, accessToken]);

    useEffect(() => {
        if (filesFetched && files && currentLanguage)
            cookies.set(
                "solution-" + solutionId,
                serializeFiles(files, task.jobId, mainFileIndex, currentLanguage),
                {}
            );
    }, [files, mainFileIndex, filesFetched, currentLanguage, solutionId, task.jobId]);

    const submitWithData = (reward: number, comment: string) => {
        const fetchData = async () => {
            try {
                if (accessToken) {
                    const response = (await submitFeedback(
                        solutionId,
                        files,
                        reward,
                        comment,
                        accessToken
                    )) as Response;
                    if (response.ok) {
                        setIsAlreadyRated(true);
                        successToast("Feedback submitted");
                    }
                } else {
                    errorToast("Invalid access token");
                }
            } catch (error) {
                errorToast("Credentials expired");
            }
        };
        fetchData();
    };

    const handleDownload = (files: MyFile[]) => {
        const zip = new JSZip();

        files.forEach(file => {
            zip.file(file.name, file.contentBase64, { base64: true });
        });

        zip.generateAsync({ type: 'blob' })
            .then(blob => {
                saveAs(blob, 'files.zip');
            })
            .catch(error => {
                console.error('Error generating zip:', error);
            });
    };

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <div className="flex flex-col w-full items-end h-auto">
            <FeedbackModal
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
                toggleModal={toggleModal}
                submit={submitWithData}
            />
            {currentFile && (
                <div className="flex flex-col w-full h-full">
                    <EditorWorkspace
                        files={files}
                        setFiles={setFiles}
                        isEditable={isEditable}
                        isFeedbackView={true}
                        originalFiles={originalFiles}
                        currentLanguage={currentLanguage!}
                        mainFileIndex={mainFileIndex}
                        task={task}
                        submitComponent={
                            isEditable ? (
                                !isAlreadyRated ? (
                                    <>
                                        <button onClick={()=>handleDownload(originalFiles)} className="flex bg-terminal-color rounded text-base font-semibold items-center px-4">
                                            <FontAwesomeIcon icon={faFileDownload}/>
                                        </button>
                                        <FeedbackButton submit={toggleModal} />
                                    </>

                                ) : (
                                    <div className="flex bg-terminal-color rounded text-xs font-semibold items-center flex-1">
                                        <img
                                            src={solutionAuthor.imageBase64}
                                            className="h-[3rem] w-[3rem] rounded"
                                            alt="User"
                                        />
                                        <div className="flex flex-col px-3 flex-1">
                                            <p className="text-xs font-medium text-task-lighter mb-[-1px]">
                                                SOLVED BY
                                            </p>
                                            <a
                                                href={"/profile/" + solutionAuthor.id}
                                                className="text-base font-normal"
                                            >
                                                {solutionAuthor.username}
                                            </a>
                                        </div>
                                    </div>
                                )
                            ) : <div className="flex flex-1 gap-3">
                                    <button onClick={()=>handleDownload(files)} className="flex bg-terminal-color rounded text-base font-semibold items-center px-4">
                                        <FontAwesomeIcon icon={faFileDownload}/>
                                    </button>
                                    <button className="flex border-2 items-center border-red-500 rounded text-xs font-semibold justify-center  px-4 flex-1 text-red-500">
                                        <p>REPORT A PROBLEM <FontAwesomeIcon icon={faTriangleExclamation} className="ml-2"/></p>
                                    </button>
                                  </div>
                        }
                        setCurrentLanguage={setCurrentLanguage}
                    />
                </div>
            )}
        </div>
    );
};

export default TaskFeedbackWorkspace;
