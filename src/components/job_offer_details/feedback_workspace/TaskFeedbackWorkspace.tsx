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
// import Modal from "./Modal";
import FeedbackModal from "./FeedbackModal";

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
  const currentFile = files[currentFileIndex];
  const { accessToken } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const [currentLanguage, setCurrentLanguage] = useState<string>();

  useEffect(() => {
    const initializeFiles = async () => {
      const solution = await downloadSolutionFiles(solutionId, accessToken!);
      const feedback = await downloadFeedbackFiles(solutionId, accessToken!);
      if (solution.ok) {
        const fetchedSOlution = await solution.json();
        console.log(fetchedSOlution);
        setCurrentLanguage(fetchedSOlution.language);
        setIsAlreadyRated(fetchedSOlution.isAlreadyRated);
        setOriginalFiles(fetchedSOlution.files);
        setFiles(fetchedSOlution.files);
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
    if (filesFetched && files)
      cookies.set(
        "solution-" + solutionId,
        serializeFiles(files, task.jobId, solutionId, mainFileIndex),
        {}
      );
  }, [files, mainFileIndex]);

  const submit = (reward: number, comment: string) => {
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

  const submitWithData = (reward, comment) => {
    submit(reward, comment);
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
            currentLanguage={currentLanguage}
            mainFileIndex={mainFileIndex}
            task={task}
            submitComponent={
              isEditable ? (
                !isAlreadyRated ? (
                  <FeedbackButton submit={toggleModal} />
                ) : (
                  <p>user</p>
                )
              ) : null
            }
          />
        </div>
      )}
    </div>
  );
};

export default TaskFeedbackWorkspace;
