import React, {useRef, useState} from "react";
import SecondWrapper from "../../components/SecondWrapper.tsx";

const TaskAddingBasic: React.FC = () => {
    const languages = ["Java", "Cpp", "C", "Python"];
    const tags = ["DSA", "Greedy Algorithms", "Databases", "Machine Learning"];
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [unitTests, setTests] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const testInputRef = useRef<HTMLInputElement>(null);

    const toggleLanguageSelection = (language: string) => {
        if (selectedLanguages.includes(language)) {
            setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
        } else {
            setSelectedLanguages([...selectedLanguages, language]);
        }
    };

    const isLanguageSelected = (language: string) => {
        return selectedLanguages.includes(language);
    };

    const addTag = () => {
        if (selectedTag && !selectedTags.includes(selectedTag)) {
            setSelectedTags([...selectedTags, selectedTag]);
            setSelectedTag("");
        }
    };

    const removeTag = (index: number) => {
        const newTags = selectedTags.filter((_, idx) => idx !== index);
        setSelectedTags(newTags);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files) {
            setFiles([...files, ...Array.from(event.target.files)]);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, idx) => idx !== index);
        setFiles(newFiles);
    };

    const handleTestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setTests([...unitTests, ...Array.from(event.target.files)]);
        }
    };

    const removeTest = (index: number) => {
        const newTests = unitTests.filter((_, idx) => idx !== index);
        setTests(newTests);
    };

    const handleButtonClick = (ref) => {
        ref.current?.click();
    };

    return (
        <SecondWrapper>
            <div className="flex justify-center flex-col items-start w-full max-w-7xl mx-auto space-x-8">
                <h1 className="text-main-font-color text-3xl font-bold mb-9 text-center w-full">Task Creation</h1>
                <div className="flex justify-center items-start w-full max-w-7xl mx-auto space-x-8">
                    <div className="w-5/6">
                        <form
                            className="bg-secondary-bg-color flex-col justify-center px-5 py-10 rounded">
                            <div className="mb-5">
                                <label
                                    className="block text-main-font-color text-sm font-medium mb-3">
                                    Task Title:
                                </label>
                                <input type="text" id="exerciseTitle" name="exerciseTitle"
                                       className="bg-main-lighter-2 rounded w-full py-2 px-3 text-main-font-color leading-tight focus:outline-none focus:shadow-outline mb-3"
                                       placeholder="Please enter the task title..."/>
                            </div>
                            <div className="mb-5">
                                <label
                                    className="block text-main-font-color text-sm font-medium mb-4">
                                    Task Description:
                                </label>
                                <textarea id="taskDescription" name="taskDescription"
                                          className="bg-main-lighter-2 rounded w-full py-2 px-3 text-main-font-color leading-tight focus:outline-none focus:shadow-outline h-40 mb-3"
                                          placeholder="Enter detailed task description"></textarea>
                            </div>
                            <div className="mb-5">
                                <label
                                    className="block text-main-font-color text-sm font-medium mb-4">
                                    MeritRewards amount upon completion:
                                </label>
                                <input type="text" id="meritRewardsAmount" name="meritRewardsAmount"
                                       className="bg-main-lighter-2 rounded w-full py-2 px-3 text-main-font-color leading-tight focus:outline-none focus:shadow-outline mb-1"
                                       placeholder="Please enter the amount of MeritRewards given for completing the task..."/>
                            </div>
                            <div className="mb-5">
                                <label
                                    className="block text-main-font-color text-sm font-medium mb-4">
                                    Amount of slots:
                                </label>
                                <input type="text" id="meritRewardsAmountppl" name="meritRewardsAmountppl mb-10"
                                       className="bg-main-lighter-2 rounded w-full py-2 px-3 text-main-font-color leading-tight focus:outline-none focus:shadow-outline"
                                       placeholder="Please enter the amount of people that will get MeritRewards for completing the task..."/>
                            </div>
                            <div className="flex mb-5 items-center space-x-10">
                                <div className="flex flex-col mx-15 pt-2 pb-2 items-center lg:items-stretch">
                                    <label className="pb-5 lg:pb-2 text-sm font-medium">Opening Date:</label>
                                    <input
                                        type="date"
                                        className="outline-none mt-1 p-2 px-3 w-[100%] rounded bg-main-lighter-2"
                                    />
                                </div>
                                <div className="flex flex-col mx-15 pt-2 pb-2 items-center lg:items-stretch">
                                    <label className="pb-5 lg:pb-2 text-sm font-medium">Closure Date:</label>
                                    <input
                                        type="date"
                                        className="outline-none mt-1 p-2 px-3 w-[100%] rounded bg-main-lighter-2"
                                    />
                                </div>
                            </div>
                            <div className="mb-10">
                                <label
                                    className="block text-main-font-color text-sm font-medium mb-4">
                                    Do you want to add any unit tests for this task?
                                </label>
                                <div className="mb-5">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        onChange={handleTestChange}
                                        multiple
                                        // className="bg-main-lighter-2 rounded w-full py-2 px-3 text-main-font-color leading-tight focus:outline-none focus:shadow-outline mb-3"
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleButtonClick(fileInputRef)}
                                        className="bg-main-lighter-2 hover:bg-task-lighter text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Add Unit Tests
                                    </button>
                                </div>
                                <div className="flex flex-wrap">
                                    {unitTests.map((test, index) => (
                                        <div key={index} className="flex items-center mr-4 mb-2">
                                            <span className="text-main-font-color mr-2">{test.name}</span>
                                            <button
                                                onClick={() => removeTest(index)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-10">
                                <label
                                    className="block text-main-font-color text-sm font-medium mb-4">
                                    Do you want to add any files necessary to solve the task?
                                </label>
                                <div className="mb-5">
                                    <input
                                        ref={testInputRef}
                                        type="file"
                                        onChange={handleFileChange}
                                        multiple
                                        // className="bg-main-lighter-2 rounded w-full py-2 px-3 text-main-font-color leading-tight focus:outline-none focus:shadow-outline mb-3"
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleButtonClick(testInputRef)}
                                        className="bg-main-lighter-2 hover:bg-task-lighter text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Add Files
                                    </button>
                                </div>
                                <div className="flex flex-wrap">
                                    {files.map((file, index) => (
                                        <div key={index} className="flex items-center mr-4 mb-2">
                                            <span className="text-main-font-color mr-2">{file.name}</span>
                                            <button
                                                onClick={() => removeFile(index)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <button type="submit"
                                        className="bg-emerald-400 hover:bg-emerald-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Submit
                                </button>
                                <div></div>
                            </div>
                        </form>
                    </div>
                    <div className="w-1/3"> {/* popup replacement */}
                        <form
                            className="bg-secondary-bg-color py-10 px-5 rounded-lg shadow-md flex-col justify-center w-3/4">
                            <div className="flex flex-wrap text-sm font-medium">
                                <label htmlFor="exerciseTitle"
                                       className="block text-main-font-color text-sm font-bold mb-4">
                                    Allowed languages:
                                </label>
                                <div className="flex flex-wrap text-sm font-medium">
                                    {languages.map((language) => {
                                        return (
                                            <button
                                                key={language}
                                                onClick={() => toggleLanguageSelection(language)}
                                                className={`px-5 py-2 rounded mr-2 mb-3 ${isLanguageSelected(language) ? "border-2 border-emerald-400 text-emerald-300" : "bg-main-lighter-2 border-2 border-main-lighter-2"}`}
                                                type="button"
                                            >
                                                {language}
                                            </button>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                            <div className="flex flex-wrap text-sm font-medium">
                                <label htmlFor="exerciseTitle"
                                       className="block text-main-font-color text-sm font-bold mb-4">
                                    Select tags:
                                </label>
                                <select
                                    id="languageDropdown"
                                    value={selectedTag}
                                    onChange={(e) => setSelectedTag(e.target.value)}
                                    className="bg-main-lighter-2 rounded w-full py-2 px-3 text-main-font-color leading-tight focus:outline-none focus:shadow-outline mb-3"
                                >
                                    <option value="">Select a tag</option>
                                    {tags.map((tag) => (
                                        <option key={tag} value={tag}>
                                            {tag}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="mt-4 bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Add Tag
                                </button>
                            </div>
                            <div className="flex flex-wrap mt-4">
                                {selectedTags.map((tag, index) => (
                                    <button
                                        key={index}
                                        onClick={() => removeTag(index)}
                                        className="bg-main-lighter-2 text-main-font-color px-5 py-2 rounded mr-2 mb-3 border-2 border-main-lighter-2"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </SecondWrapper>
    );
};

export default TaskAddingBasic;
