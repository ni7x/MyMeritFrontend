import React, {useEffect, useState} from "react";
import {errorToast} from "../../../../../main";
import {testAll} from "../../../../../services/JobOfferService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import Test from "../../../../../models/Test";
import UserTaskDTO from "../../../../../models/dtos/UserTaskDTO";
import TestOutput from "../../../../../models/TestOutput";

const TestInterface: React.FC<{task:UserTaskDTO}>= ({files, setTestOutput, setLoading, task, mainFileIndex}) => {
    const [currentLanguage, setCurrentLanguage] = useState<string>("c++");
    const [currentLanguageTests, setCurrentLanguageTests] = useState<Test>(null);

    const testCode = async () => {
        setLoading(true);
        try {
            const response = await testAll(files, currentLanguageTests.testFileBase64, task.id, currentLanguage, mainFileIndex);
            setTestOutput(response as TestOutput[]);
        } catch (error) {
            errorToast("Error compiling code");
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        setCurrentLanguageTests(task.tests.find(test => test.language === currentLanguage));
    }, [currentLanguage])

    return (
        <div className="flex w-full gap-2 justify-between flex-col h-full pt-3">
            <div className="flex justify-between">
                <button
                    className="flex gap-2 justify-center items-center text-emerald-300 p-1 px-5 font-medium text-sm border-[3px] border-emerald-400 bg-transparent rounded"
                    onClick={testCode}
                >
                    <FontAwesomeIcon icon={faPlay}/> Run all tests
                </button>
                <select className="text-black" onChange={e => setCurrentLanguage(e.currentTarget.value)}>
                    {task.tests && task.tests.map((test)=>{
                            return <option key={test.language} value={test.language}>{test.language}</option>
                        }
                    )}

                </select>

            </div>

            {currentLanguageTests ?
                <div>
                    {currentLanguageTests.testCases.map((test, index)=>{
                        return <button key={index}> <FontAwesomeIcon icon={faPlay}/> {test.name}</button>
                    })}
                </div>
                :
                <p>No tests for this language</p>
            }
        </div>

    );
};

export default TestInterface;
