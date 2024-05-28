import React from "react";
import CodeExecutionOutput from "../../../../../models/CodeExecutionOutput";
import { decodeBase64 } from "../../../utils/fileUtils";
import TestOutput from "../../../../../models/TestOutput";
import { Oval } from "react-loader-spinner";

const TerminalOutput: React.FC<{
  output: CodeExecutionOutput | null;
  testOutput: TestOutput[] | null;
  loading: boolean;
  // setOutput: React.Dispatch<React.SetStateAction<CodeExecutionOutput>>;
  setOutput: (inp: CodeExecutionOutput | null) => void;
}> = ({ output, testOutput, loading, setOutput }) => {
  const renderErrorMessage = (message: string) => (
    <span className="text-red-500">{message}</span>
  );
  console.log(output);

  const renderOutput = (output: CodeExecutionOutput) => {
    const stdoutMessage = output.stdout ? decodeBase64(output.stdout) : null;
    const compileOutputMessage = output.compile_output
      ? decodeBase64(output.compile_output)
      : null;
    const stderrMessage = output.stderr ? decodeBase64(output.stderr) : null;
    let defaultMessage;
    if(output.status.id === 12){
          defaultMessage = "Memory Limit Exception / " + output.status.description;
    }else{
        defaultMessage  = output.status.description;
    }
    const allOutputsNull =
      !stdoutMessage && !compileOutputMessage && !stderrMessage;
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          {stdoutMessage && <div>{stdoutMessage}</div>}
          {compileOutputMessage && (
            <div>{renderErrorMessage(compileOutputMessage)}</div>
          )}
          {stderrMessage && <div>{renderErrorMessage(stderrMessage)}</div>}
          {allOutputsNull && output.status.id > 3 && (
            <div>{renderErrorMessage(defaultMessage)}</div>
          )}
        </div>
        <div className="flex justify-between w-full">
          {output.time && (
            <div className="text-task-lighter">
              Execution time <span className="font-medium">{output.time}s</span>
            </div>
          )}
          {(output.exit_code || output.exit_code === 0) && (
            <div className="text-task-lighter">
              Exited with{" "}
              <span className="font-medium">{output.exit_code}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTestOutput = (testOutput: TestOutput[]) => {
    if (!Array.isArray(testOutput) || testOutput.length === 0) return <></>;
    const totalPassed = testOutput.filter((test) => test.passed).length;
    return (
      <div className="flex flex-col h-full gap-1 justify-between">
        <div>
          {testOutput.map((test) => {
            return (
              <p
                className={
                  "w-full flex gap-1 " +
                  (test.passed ? "text-emerald-400" : "text-red-500")
                }
              >
                <span>
                  <span className="font-medium text-xs italic">
                    {test.name.toUpperCase()}
                  </span>
                </span>
                {test.passed ? "passed" : "failed"}
              </p>
            );
          })}
        </div>
        <div className="flex justify-between w-full text-task-lighter text-xs">
          <p
            className={
              totalPassed == testOutput.length
                ? "text-emerald-400"
                : "text-red-500"
            }
          >
            TESTS {totalPassed}/{testOutput.length} PASSED
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col bg-terminal-color overflow-hidden rounded">
      <div className="flex justify-between text-task-lighter text-xs font-normal mx-4 mt-4 md:mx-2 md:mt-2">
        <p>OUTPUT</p>
        <button
          onClick={() => setOutput(null)}
          className="text-merit-credits-color hover:underline"
        >
          CLEAR
        </button>
      </div>
      <div className="flex flex-1 max-h-[27vh] bg-blue w-full text-wrap break-all">
        <pre className="leading-[1.25rem] font-sans font-normal overflow-x-hidden overflow-y-auto text-sm w-full text-wrap break-all md:px-2 md:mt-1 md:mx-2 md:ml-0 p-4 md:p-0">
          {loading ? (
            <div className="h-full w-full flex flex-col text-task-lighter  gap-2 items-center justify-center pb-5">
              <Oval
                visible={true}
                height="45"
                width="45"
                color="#8c8f9f"
                secondaryColor="3a3b46"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
              Compiling..
            </div>
          ) : testOutput ? (
            renderTestOutput(testOutput)
          ) : output ? (
            renderOutput(output)
          ) : (
            ""
          )}
        </pre>
      </div>
    </div>
  );
};

export default TerminalOutput;
