import React, {useState} from "react";
import {fileToBase64} from "../../../utils/fileUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileUpload, faPlus} from "@fortawesome/free-solid-svg-icons";

const AddFileButton: React.FC<{}> = ({addFile, getFileByName}) => {
    const [name, setName] = useState("");
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const [error, setError] = useState<string>("");

    const createFile = () => {
        if(!getFileByName(name)){
            addFile(name);
            setIsPopUpOpen(false);
        }else{
            setError("File already exists.")
        }

    }

    const togglePopup = () => {
        setIsPopUpOpen(isPopUpOpen => !isPopUpOpen);
        setError("");
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            createFile();
        }
    };

    const addLocalFile = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const fileContent = await fileToBase64(file);
                const fileName = file.name;
                addFile(fileName, fileContent);
                setIsPopUpOpen(false);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="h-full flex items-center">
            <div className='w-screen h-screen bg-black bg-opacity-60 fixed z-[1001] top-0 left-0 justify-center items-center z-[1001]' style={{display: isPopUpOpen? "flex":"none" }}>
                <div className="flex flex-col justify-center items-center bg-main-bg-color p-5 rounded">
                    {error != "" && <p className="pb-4 text-sm text-orange-400">{error}</p>}
                    <div className="mb-3 bg-secondary-bg-color rounded p-3 py-3">
                        <input
                            className="bg-secondary-bg-color outline-0 rounded text-sm"
                            placeholder="enter file name"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="hover:bg-main-lighter-2 w-[1.5rem] h-[1.5rem] rounded"
                            onClick={createFile}
                        >
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </div>

                    <div className="flex flex-row w-full">
                        <button
                            className="p-3 bg-secondary-bg-color font-bold text-xs text-task-lighter rounded w-[80%] hover:bg-red-500 hover:text-white hover:duration-150"
                            onClick={togglePopup}
                        >
                            CANCEL
                        </button>
                        <label htmlFor="fileInput" className="bg-emerald-500 w-[20%] ml-2 rounded p-3 text-center">
                            <FontAwesomeIcon icon={faFileUpload} />
                            <input
                                id="fileInput"
                                type="file"
                                className="hidden"
                                onChange={addLocalFile}
                            />
                        </label>
                    </div>


                </div>
            </div>
            <button
                onClick={togglePopup}
                className="bg-secondary-bg-color text-sm font-bold w-[1.75rem] h-[1.75rem] ml-[0.5rem] mb-1 rounded-full mr-2"
            >
                +
            </button>
        </div>
    );
};

export default AddFileButton;