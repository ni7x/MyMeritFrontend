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
import { User } from "@types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";

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
  const [solutionAuthor, setSolutionAuthor] = useState<User>({} as User);
  const currentFile = files[currentFileIndex];
  const { accessToken } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>();

  useEffect(() => {
    const initializeFiles = async () => {
      try {
        // Fetch solution and feedback files concurrently
        const [solutionResponse, feedbackResponse] = await Promise.all([
          downloadSolutionFiles(solutionId, accessToken!),
          downloadFeedbackFiles(solutionId, accessToken!),
        ]);

        let newFiles = [];

        if (solutionResponse.ok) {
          const fetchedSolution = await solutionResponse.json();
          setCurrentLanguage(fetchedSolution.language);
          setIsAlreadyRated(fetchedSolution.isAlreadyRated);
          setSolutionAuthor(fetchedSolution.user);
          newFiles = fetchedSolution.files;
          setOriginalFiles(fetchedSolution.files);
        }

        if (feedbackResponse.ok) {
          const fetchedFeedbackFiles = await feedbackResponse.json();
          if (fetchedFeedbackFiles.length > 0) {
            newFiles = fetchedFeedbackFiles;
          }
        }

        const currentFeedbackCookies = cookies.get("solution-" + solutionId);
        if (currentFeedbackCookies) {
          newFiles = currentFeedbackCookies.files.map(
            (file: MyFile) =>
              new MyFile(file.name, file.type, file.contentBase64)
          );
        }

        setFiles(newFiles);
      } catch (error) {
        console.error("Error initializing files:", error);
        // Handle errors if necessary
      } finally {
        setFilesFetched(true);
      }
    };

    initializeFiles();
  }, [solutionId, accessToken]);

  useEffect(() => {
    if (filesFetched && files && currentLanguage)
      cookies.set(
        "solution-" + solutionId,
        serializeFiles(files, task.jobId, mainFileIndex, currentLanguage),
        {}
      );
  }, [
    files,
    mainFileIndex,
    filesFetched,
    currentLanguage,
    solutionId,
    task.jobId,
  ]);

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

    files.forEach((file) => {
      zip.file(file.name, file.contentBase64, { base64: true });
    });

    zip
      .generateAsync({ type: "blob" })
      .then((blob) => {
        saveAs(blob, "files.zip");
      })
      .catch((error) => {
        console.error("Error generating zip:", error);
      });
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const submitProblem = () => {
    const formData = new FormData();
    formData.append("Task ID", task.id);
    formData.append("User ID", task.userSolution.user.id);

    fetch(import.meta.env.VITE_REPORT_PROBLEM, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          successToast("Problem submitted");
        } else {
          errorToast("Couldn't submit your problem");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
            isEditable={false}
            isFeedbackView={true}
            isCodeEditable={!isAlreadyRated}
            originalFiles={originalFiles}
            currentLanguage={currentLanguage!}
            mainFileIndex={mainFileIndex}
            task={task}
            submitComponent={
              isEditable ? (
                !isAlreadyRated ? (
                  <>
                    <button
                      onClick={() => handleDownload(originalFiles)}
                      className="flex bg-terminal-color rounded text-base font-semibold items-center px-4"
                    >
                      <FontAwesomeIcon icon={faFileDownload} />
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
                      <Link
                        to={"/profile/" + solutionAuthor.id}
                        className="text-base font-normal"
                      >
                        {solutionAuthor.username}
                      </Link>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex flex-1 gap-3">
                  <button
                    onClick={() => handleDownload(files)}
                    className="flex bg-terminal-color rounded text-base font-semibold items-center px-4"
                  >
                    <FontAwesomeIcon icon={faFileDownload} />
                  </button>
                  <button
                    onClick={submitProblem}
                    className="flex border-2 items-center border-orange-500 rounded text-xs font-semibold justify-center  px-4 flex-1 text-orange-500"
                  >
                    <p>REPORT LOW QUALITY FEEDBACK</p>
                  </button>
                </div>
              )
            }
            setCurrentLanguage={setCurrentLanguage}
          />
        </div>
      )}
    </div>
  );
};

export default TaskFeedbackWorkspace;
