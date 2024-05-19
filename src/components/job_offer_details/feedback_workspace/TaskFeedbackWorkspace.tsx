import React, { useEffect, useState } from "react";
import MyFile from "../../../models/MyFile";
import {errorToast, successToast} from "../../../main";
import {downloadFeedbackFiles, downloadSolutionFiles, submitFeedback} from "../../../services/JobOfferService";
import {serializeFiles} from "../../editor_workspace/utils/cookieFunctions";
import {useAuth} from "../../../hooks/useAuth";
import Cookies from "universal-cookie";
import EditorWorkspace from "../../editor_workspace/EditorWorkspace";
import FeedbackButton from "./FeedbackButton";
import UserTaskDTO from "../../../models/dtos/UserTaskDTO";
// import Modal from "./Modal";
import FeedbackModal from "./FeedbackModal";

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
    const {accessToken} = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);
    const [userSolution, setUserSolution] = useState();


    useEffect(() => {
        const initializeFiles = async () => {
            const solution = await downloadSolutionFiles(solutionId, accessToken!);
            const feedback = await downloadFeedbackFiles(solutionId, accessToken!);
            if (solution.ok) {
                const fetchedSOlution = await solution.json();
                setUserSolution(fetchedSOlution)
                setOriginalFiles(fetchedSOlution.files);
                setFiles(fetchedSOlution.files)
            }
            if (feedback.ok) {
                const fetchedFiles = await feedback.json();
                if(fetchedFiles.length > 0){
                    setFiles(fetchedFiles);
                }
            }
            const currentFeedbackCookies = cookies.get("solution-" + solutionId)
            if (currentFeedbackCookies) {
                    setFiles(currentFeedbackCookies.files.map(file => new MyFile(file.name, file.type, file.contentBase64)));
            }

        };
        initializeFiles().then(()=> setFilesFetched(true));
    }, [solutionId, accessToken]);

    useEffect(() => {
        if(filesFetched && files)
            cookies.set("solution-" + solutionId, serializeFiles(files, task.jobId, solutionId, mainFileIndex), { });
    }, [files, mainFileIndex]);


    const submit = (reward, comment) => {
        const fetchData = async () => {
            try {
                if(accessToken){
                    const response = await submitFeedback(solutionId, files, reward, comment, accessToken);
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

    const submitWithData = (reward, comment) => {
        submit(reward, comment)
    }

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    }

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
                        currentLanguage={userSolution.language}
                        mainFileIndex={mainFileIndex}
                        task={task}
                        submitComponent={
                            isEditable ?
                                !userSolution.isAlreadyRated ?
                                    <FeedbackButton
                                        submit={toggleModal}
                                    />:
                                    <>
                                        <div className="flex bg-terminal-color rounded text-xs font-semibold items-center flex-1">
                                            <img src={userSolution.user.imageBase64} className="h-[3rem] w-[3rem] rounded"/>
                                            <div className="flex flex-col px-3 flex-1">
                                                <p  className="text-xs font-medium text-task-lighter mb-[-1px]">SOLVED BY</p>
                                                <a href={"/profile/" + userSolution.user.id} className=" text-base font-normal">{userSolution.user.username}</a>
                                            </div>

                                        </div>
                                    </>
                                :
                                null
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default TaskFeedbackWorkspace;
