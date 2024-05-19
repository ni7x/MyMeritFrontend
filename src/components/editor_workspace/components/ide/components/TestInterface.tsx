import React, { useEffect, useState } from "react";
import { errorToast } from "../../../../../main";
import { testAll, testSingle } from "../../../../../services/JobOfferService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Test from "../../../../../models/Test";
import UserTaskDTO from "../../../../../models/dtos/UserTaskDTO";
import TestOutput from "../../../../../models/TestOutput";

const TestInterface: React.FC<{
  task: UserTaskDTO;
  files: any[];
  setTestOutput: (output: TestOutput[]) => void;
  setLoading: (loading: boolean) => void;
  currentLanguage: string;
}> = ({ files, setTestOutput, setLoading, task, currentLanguage }) => {
  const [currentLanguageTests, setCurrentLanguageTests] = useState<
    Test | null
  >(null);

  const runAllTests = async () => {
    setLoading(true);
    try {
      const response = await testAll(files, task.id, currentLanguage);
      setTestOutput(response as TestOutput[]);
    } catch (error) {
      errorToast("Error compiling code");
    } finally {
      setLoading(false);
    }
  };

  const runSingleTest = async (testId: number) => {
    setLoading(true);
    try {
      const response = await testSingle(
        files,
        task.id,
        currentLanguage,
        testId
      );
      setTestOutput(response as TestOutput[]);
    } catch (error) {
      errorToast("Error compiling code");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentLanguageTests(
      task.tests.find((test) => test.language === currentLanguage)
    );
  }, [currentLanguage]);

  return (
    <div className="flex w-full gap-5 flex-col h-full pt-3 text-task-lighter font-medium text-xs">
      {currentLanguageTests ? (
        <>
          <div className="flex justify-between">
            <button
              className="flex gap-2 justify-center items-center text-emerald-300 p-2 px-5 font-medium text-sm border-[3px] border-emerald-400 bg-transparent rounded hover:bg-emerald-450 hover:text-white hover:border-emerald-450"
              onClick={runAllTests}
            >
              <FontAwesomeIcon icon={faPlay} /> RUN ALL TESTS
            </button>
          </div>
          <div className="flex flex-col gap-3 w-full justify-start items-start">
            {currentLanguageTests.testCases.map((test, index) => {
              return (
                <button
                  key={index}
                  className="hover:text-emerald-400"
                  onClick={() => runSingleTest(index)}
                >
                  <FontAwesomeIcon icon={faPlay} className="mr-2" />
                  {test.name.toUpperCase()}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-[14px]">
          No tests available for{" "}
          <span className="font-semibold">{currentLanguage}</span> language
        </p>
      )}
    </div>
  );
};

export default TestInterface;
