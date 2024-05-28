import React, { useState } from "react";


const TestsAndInput: React.FC<{
  testInterface: JSX.Element;
  terminalInput: JSX.Element;
  areThereTests: boolean;
  templateFileNames?: string[];
}> = ({ testInterface, terminalInput, areThereTests, templateFileNames }) => {
  const [isTestView, setIsTestView] = useState(areThereTests);

  return (
    <div className="flex h-full">
      <div className="flex flex-col bg-terminal-color min-h-[5rem] flex-1 p-2 justify-between">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <button
                className={
                    "text-xs font-normal " +
                    (!isTestView ? "text-white" : "text-task-lighter")
                }
                onClick={() => setIsTestView(false)}
            >
              INPUT
            </button>
            <button
                className={
                    "text-xs font-normal " +
                    (isTestView ? "text-white" : "text-task-lighter")
                }
                onClick={() => setIsTestView(true)}
            >
              TESTS
            </button>
          </div>

          <p className="text-xs font-normal text-task-lighter overflow-x-auto  whitespace-nowrap max-w-[20rem]">
            FILES TESTED: {templateFileNames && templateFileNames.length !== 0 ? templateFileNames.join(", ") : "ALL"}
          </p>

        </div>
        <div className="flex flex-1 items-end">
          {isTestView ? testInterface : terminalInput}
        </div>
      </div>
    </div>
  );
};

export default TestsAndInput;
