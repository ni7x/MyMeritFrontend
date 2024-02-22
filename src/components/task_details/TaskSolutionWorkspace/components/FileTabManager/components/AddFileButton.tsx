import React, {useEffect, useState} from "react";
import {getLanguageFromFileName} from "../../../fileUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileUpload, faPlus} from "@fortawesome/free-solid-svg-icons";

const AddFileButton: React.FC<{}> = ({addFile, getFileByName}) => {
    const [name, setName] = useState("");
    const [language, setLanguage] = useState("plaintext");
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const [error, setError] = useState<string>("");

    const createFile = () => {
        if(!getFileByName(name)){
            addFile(name, language);
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
            reader.onload = (event) => {
                const fileContent = event.target?.result as string;
                const fileName = file.name;
                const fileLanguage = "plaintext";
                addFile(fileName, fileLanguage, fileContent);
            };
            reader.readAsText(file);
        }
    };

    useEffect(() => {
        setLanguage(getLanguageFromFileName(name))
    }, [name]);

    return (
        <div>
            <div className='w-screen h-screen bg-black bg-opacity-60 fixed z-[1] top-0 left-0 justify-center items-center' style={{display: isPopUpOpen? "flex":"none" }}>
                <div className="flex flex-col justify-center items-center bg-main-bg-color p-5 rounded">
                    {error != "" && <p className="pb-4 text-sm text-orange-400">{error}</p>}
                    <div className="mb-3 bg-secondary-bg-color rounded p-3">
                        <input className=" bg-secondary-bg-color outline-0 rounded text-sm px-1" placeholder="enter file name" type={"text"} name={"name"} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown}/>
                        <button className=" bg-secondary-bg-color rounded" onClick={createFile}><FontAwesomeIcon icon={faPlus}/></button>
                    </div>

                    <div className="flex flex-row w-full">
                        <label htmlFor="fileInput" className="bg-secondary-bg-color  w-[20%] mr-2 rounded p-3 text-center">
                            <FontAwesomeIcon icon={faFileUpload} />
                            <input id="fileInput" type="file" onChange={addLocalFile} />
                        </label>
                        <button className="p-3 bg-red-500 rounded w-full" onClick={togglePopup}>Cancel</button>
                    </div>


                </div>
            </div>
            <button onClick={togglePopup} class="bg-secondary-bg-color text-sm font-bold w-7 h-7 ml-2 rounded-full">
                +
            </button>
        </div>
    );
};

export default AddFileButton;