import EditorAndViewer from "./components/EditorAndViewer";
import TerminalOutput from "./components/TerminalOutput";
import React, { useState } from "react";
import MyFile from "../../../../models/MyFile";
import TerminalInput from "./components/TerminalInput";
import CodeExecutionOutput from "../../../../models/CodeExecutionOutput";
import SolutionControls from "./components/SolutionControls";
import FileControls from "./components/FileControls";
import RunButton from "./components/RunButton";
import Timer from "./components/Timer";
import TestsAndInput from "./components/TestsAndInput";
import TestInterface from "./components/TestInterface";
import TestOutput from "../../../../models/TestOutput";
import UserTaskDTO from "src/models/dtos/UserTaskDTO";

interface IdeProps {
  files: MyFile[];
  currentFileIndex: number;
  setFiles: (files: MyFile[]) => void;
  currentLanguage: string;
  setAsMain: (index: string) => void;
  mainFileIndex: number;
  isEditable: boolean;
  isFeedbackView: boolean;
  //   originalFiles: MyFile[];
  originalFiles: any;
  submitComponent: JSX.Element | null;
  task: UserTaskDTO;
  submitSolution: () => void;
}

const Ide: React.FC<IdeProps> = ({
  isFeedbackView,
  originalFiles,
  submitComponent,
  files,
  currentFileIndex,
  setFiles,
  currentLanguage,
  setAsMain,
  mainFileIndex,
  isEditable,
  task,
}) => {
  const [output, setCOutput] = useState<CodeExecutionOutput | null>(
    null
  );
  const [testOutput, setTOutput] = useState<TestOutput[] | null>(null);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMaxSize, setIsMaxSize] = useState(false);
  // const [isClosed, setIsClosed] = useState(false);
  const currentFile = files[currentFileIndex];

  const setCodeOutput = (inp: CodeExecutionOutput | null) => {
    setCOutput(inp);
    setTOutput(null);
  };

  const setTestOutput = (inp: TestOutput[]) => {
    setTOutput(inp);
    setCOutput(null);
  };

  return (
    <div className="flex flex-col md:flex-col flex-grow flex-1 gap-3 h-full max-h-[calc(100%-40px)] ">
      <div className="min-h-[40vh] flex-1">
        <EditorAndViewer
          files={files}
          originalFiles={originalFiles}
          currentFileIndex={currentFileIndex}
          setFiles={setFiles}
          //   isMaxSize={isMaxSize}
          isEditable={isEditable}
          isFeedbackView={isFeedbackView}
        />
        <FileControls
          currentFile={currentFile}
          currentFileIndex={currentFileIndex}
          mainFileIndex={mainFileIndex}
          setIsMaxSize={setIsMaxSize}
          setAsMain={setAsMain}
          isMaxSize={isMaxSize}
        />
      </div>
      <div
        className={
          "flex w-full gap-3 h-[40%] flex-col md:flex-row " +
          (isMaxSize ? " flex lg:hidden " : " flex")
        }
      >
        <TerminalOutput
          output={output}
          loading={loading}
          testOutput={testOutput}
          setOutput={setCodeOutput}
        />
        <div className="flex md:flex-col flex-col-reverse w-full md:w-1/2 gap-3 h-full">
          <SolutionControls
            timer={
              isFeedbackView ? undefined : (
                <Timer
                  taskClosesAt={task.closesAt} /* setIsClosed={setIsClosed} */
                />
              )
            }
            runButton={
              <RunButton
                file={currentFile}
                isFeedbackView={isFeedbackView}
                originalFiles={originalFiles}
                setCodeOutput={setCodeOutput}
                setLoading={setLoading}
                files={files}
                userInput={input}
                mainFileIndex={mainFileIndex}
                task={task}
                currentLanguage={currentLanguage}
              />
            }
            submitButton={submitComponent}
          />
          <TestsAndInput
            areThereTests={task.tests && task.tests.find((test) => test.language === currentLanguage) !== undefined}
            terminalInput={<TerminalInput setInput={setInput} input={input} />}
            testInterface={
              <TestInterface
                files={files}
                setTestOutput={setTestOutput}
                setLoading={setLoading}
                task={task}
                // mainFileIndex={mainFileIndex}
                currentLanguage={currentLanguage}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Ide;
