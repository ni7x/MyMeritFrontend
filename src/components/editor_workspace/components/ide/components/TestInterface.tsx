import React, {useState} from "react";
import {errorToast} from "../../../../../main";
import {getTestToken} from "../../../../../services/JobOfferService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import Test from "../../../../../models/Test";

const TestInterface: React.FC= ({files, setTestOutput, setLoading, task}) => {
    const [currentLanguage, setCurrentLanguage] = useState<string>("c++");
    const [currentLanguageTests, setCurrentLanguageTests] = useState<Test>(null);

    const testCode = async () => {
        setLoading(true);
        try {
            const response = await getTestToken(files, currentLanguageTests.testFileBase64, task.id);
            setTestOutput(response);
        } catch (error) {
            errorToast("Error compiling code");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex w-full gap-2">
            <select className="text-black" onChange={e => setCurrentLanguage(e.currentTarget.value)}>
                <option value="python">PYTHON</option>
                <option value="python">JAVA</option>
                <option value="python">C++</option>
            </select>
            {currentLanguageTests ?
                <div>
                    <button
                        className="flex gap-2 justify-center items-center text-emerald-300 p-1 px-5 font-medium text-sm border-[3px] border-emerald-400 bg-transparent rounded"
                        onClick={testCode}
                    >
                        <FontAwesomeIcon icon={faPlay}/> Run all tests
                    </button>
                    {currentLanguageTests.testCases.map((test)=>{
                        return <button> <FontAwesomeIcon icon={faPlay}/> {test.name}</button>
                    })}
                </div>
                :
                <p>No tests for this language</p>

            }

        </div>

    );
};

export default TestInterface;
