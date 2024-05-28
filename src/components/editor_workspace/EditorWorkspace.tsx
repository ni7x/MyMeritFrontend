import MyFile from "../../models/MyFile";
import UserTaskDTO from "../../models/dtos/UserTaskDTO";
import React, { useState } from "react";
import { getContentType } from "./utils/fileUtils";
import FileTabManager from "./components/file_tab_manager/FileTabManager";
import Ide from "./components/ide/Ide";
import { errorToast } from "../../main";
import LanguageToggleButton from "./components/ide/components/LanguageToggleButton";

interface EditorWorkspaceProps {
  files: MyFile[];
  setFiles: React.Dispatch<React.SetStateAction<MyFile[]>>;
  originalFiles?: MyFile[];
  task: UserTaskDTO;
  isEditable: boolean;
  isFeedbackView: boolean;
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  submitComponent: JSX.Element | null;
  mainFileIndex: number;
  isCodeEditable?: boolean;
}

const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({
  files,
  setFiles,
  originalFiles,
  currentLanguage,
  setCurrentLanguage,
  isEditable,
  isCodeEditable = isEditable,
  isFeedbackView = false,
  task,
  submitComponent,
}) => {
  const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
  const [mainFileIndex, setMainFileIndex] = useState<number>(0);
  const currentFile = files[currentFileIndex];

  const withErrorHandling = (func: (...args: string[]) => void) => {
    return (...args: string[]) => {
      try {
        if (!isEditable) {
          errorToast("Solution is read only");
          return;
        }
        func(...args);
      } catch (error) {
        errorToast("An error occurred while executing the operation");
      }
    };
  };

  const getFileByName = (name: string) => {
    return files.find((file) => file.name === name);
  };

  const setCurrentFileByName = (name: string) => {
    const index = files.findIndex((file) => file.name === name);
    setCurrentFileIndex(index);
  };

  const addFile = (name: string, content: string = atob(" ")) => {
    if (!getFileByName(name)) {
      if (name.trim() != "") {
        const newFile = new MyFile(name, getContentType(name), content);
        setFiles((prevFiles: MyFile[]) => [...prevFiles, newFile]);
        setCurrentFileIndex(files.length);
      } else {
        errorToast("File must have name");
      }
    } else {
      errorToast("File with this name already exists");
    }
  };

  const removeFile = (name: string) => {
    const fileToRemove = getFileByName(name);
    if (!fileToRemove) return;
    const fileIndex = files.findIndex((f) => f.name === fileToRemove.name);
    if (files.length === 1 || fileIndex == mainFileIndex) {
      errorToast("Can't remove main file");
      return;
    }
    if (fileToRemove) {
      setCurrentFileIndex(0);
      setFiles((prevFiles: MyFile[]) =>
        prevFiles.filter((file) => file.name !== name)
      );
    } else {
      console.log("File not found.");
    }
  };

  const setAsMain = (name: string) => {
    const fileIndex = files.findIndex((f) => f.name === name);
    if (fileIndex !== -1) {
      setMainFileIndex(fileIndex);
    }
  };

  const renameFile = (name: string, newName: string) => {
    const fileToRename = getFileByName(name);
    if (!getFileByName(newName)) {
      if (fileToRename) {
        setFiles((prevFiles: MyFile[]) => {
          return prevFiles.map((file) =>
            file.name === name
              ? new MyFile(newName, file.type, file.contentBase64)
              : file
          );
        });
      }
    } else {
      console.log("This file name already exists");
    }
  };

  const submit = () => {
    const fetchData = async () => {
      try {
        // Logic to submit solution or feedback based on isFeedbackView
      } catch (error) {
        errorToast("An error occurred while submitting");
      }
    };
    fetchData();
  };

  return (
    <div className="flex flex-col w-full items-end h-full ">
      {currentFile && (
        <div className="flex flex-col w-full h-full">
          <div className="flex justify-between w-full items-center">
            <FileTabManager
              addFile={withErrorHandling(addFile)}
              removeFile={withErrorHandling(removeFile)}
              renameFile={withErrorHandling(renameFile)}
              currentFile={currentFile}
              files={files}
              mainFileIndex={mainFileIndex}
              getFileByName={getFileByName}
              setCurrentFileByName={setCurrentFileByName}
            />
            <LanguageToggleButton
              languages={task ? task.allowedLanguages : []}
              setCurrentLanguage={setCurrentLanguage}
              currentLanguage={currentLanguage}
            />
          </div>
          <Ide
            files={files}
            originalFiles={originalFiles}
            isFeedbackView={isFeedbackView}
            currentFileIndex={currentFileIndex}
            setFiles={setFiles}
            submitComponent={submitComponent}
            mainFileIndex={mainFileIndex}
            submitSolution={submit}
            task={task}
            setAsMain={setAsMain}
            currentLanguage={currentLanguage}
            isEditable={isCodeEditable}
          />
        </div>
      )}
    </div>
  );
};

export default EditorWorkspace;
