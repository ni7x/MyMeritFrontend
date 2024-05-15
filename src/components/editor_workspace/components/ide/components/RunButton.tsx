import React from "react";
import MyFile from "../../../../../models/MyFile";
import CodeExecutionOutput from "../../../../../models/CodeExecutionOutput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { errorToast } from "../../../../../main";
import { getToken } from "../../../../../services/JobOfferService";
import { useAuth } from "../../../../../hooks/useAuth";
import UserTaskDTO from "src/models/dtos/UserTaskDTO";

const RunButton: React.FC<{
  isFeedbackView: boolean;
  file: MyFile;
  setCodeOutput: (output: CodeExecutionOutput) => void;
  setLoading: (loading: boolean) => void;
  userInput: string;
  mainFileIndex: number;
  task: UserTaskDTO;
  currentLanguage: string;
  originalFiles: MyFile[];
  files: MyFile[];
}> = ({
  isFeedbackView,
  originalFiles,
  currentLanguage,
  files,
  setCodeOutput,
  setLoading,
  userInput,
  mainFileIndex,
  task,
}) => {
  const { accessToken } = useAuth();
  const compileCode = async () => {
    setLoading(true);
    try {
      const compiledFiles = isFeedbackView ? originalFiles : files;
      if (!accessToken) {
        errorToast("No access token");
        return;
      }
      const token = await getToken(
        accessToken,
        compiledFiles,
        mainFileIndex,
        currentLanguage,
        userInput,
        task.timeLimit,
        task.memoryLimit
      );

      // DC added to remove type problem
      if (!token) {
        errorToast("No token");
        return;
      }
      // DC end

      setCodeOutput(token);
    } catch (error) {
      errorToast("Error compiling code" + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full gap-2">
      <button
        className="text-emerald-400 py-2.5 w-full border-[3px] border-emerald-400 rounded hover:bg-emerald-400 hover:text-black hover:duration-150 "
        onClick={compileCode}
      >
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </div>
  );
};

export default RunButton;
