import React from "react";
import CodeExecutionOutput from "../../../../../../models/CodeExecutionOutput";
import { decodeBase64 } from "../../../utils/fileUtils";

const TerminalOutput: React.FC<{ output: CodeExecutionOutput; loading: boolean; setOutput: React.Dispatch<React.SetStateAction<CodeExecutionOutput | null>> }> = ({ output, loading, setOutput }) => {
    const renderErrorMessage = (message) => <span className="text-red-500">{message}</span>;

    const renderOutput = (output: CodeExecutionOutput) => {
        const stdoutMessage = output.stdout ? decodeBase64(output.stdout) : null;
        const compileOutputMessage = output.compile_output ? decodeBase64(output.compile_output) : null;
        const stderrMessage = output.stderr ? decodeBase64(output.stderr) : null;
        const defaultMessage = output.status.description;
        console.log(output)
        const allOutputsNull = !stdoutMessage && !compileOutputMessage && !stderrMessage;

        return (
            <div className="flex flex-col h-full justify-between">
                <div>
                    {stdoutMessage && <div>{stdoutMessage}</div>}
                    {compileOutputMessage && <div>{renderErrorMessage(compileOutputMessage)}</div>}
                    {stderrMessage && <div>{renderErrorMessage(output.status.id === 11 ? "Memory limit exceeded " : stderrMessage)}</div>}
                    {allOutputsNull && output.status.id > 3 && <div>{renderErrorMessage(defaultMessage)}</div>}
                </div>
                <div className="flex justify-between w-full">
                    {output.time && (
                        <div className="text-task-lighter">
                            Execution time <span className="font-medium">{output.time}s</span>
                        </div>
                    )}
                    {(output.exit_code || output.exit_code === 0) && (
                        <div className="text-task-lighter">
                            Exited with <span className="font-medium">{output.exit_code}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-1 flex-col bg-terminal-color overflow-hidden rounded">
            <div className="flex justify-between text-task-lighter text-xs font-normal mx-4 mt-4 md:mx-2 md:mt-2">
                <p>OUTPUT</p>
                <button onClick={() => setOutput(null)} className="text-merit-credits-color hover:underline">
                    CLEAR
                </button>
            </div>
            <div className="flex flex-1 max-h-[27vh] text-wrap bg-blue w-full text-wrap break-all">
                <pre className="leading-[1.25rem] font-sans font-normal overflow-x-hidden overflow-y-auto text-sm w-full text-wrap break-all md:px-2 md:mt-1 md:mx-2 md:ml-0 p-4 md:p-0">
                    {loading ? "Loading please wait..." : output ? renderOutput(output) : ""}
                </pre>

            </div>

        </div>
    );
};

export default TerminalOutput;
