import React, {useEffect, useState} from "react";

const AddFileButton: React.FC = ({addFile}) => {
    const [name, setName] = useState("");
    const [language, setLanguage] = useState("plaintext");
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const togglePopup = () => {
        setIsPopUpOpen(isPopUpOpen => !isPopUpOpen);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addFile(name, language);
            setIsPopUpOpen(false);
        }
    };

    useEffect(() => {
        const setLanguageFromFileName = () => {
            const extension = name.split('.').pop();
            switch (extension) {
                case 'js':
                    setLanguage('javascript');
                    break;
                case 'css':
                    setLanguage('css');
                    break;
                case 'html':
                    setLanguage('html');
                    break;
                default:
                    setLanguage('plaintext');
            }
        };
        setLanguageFromFileName();
    }, [name]);

    return (
        <div className="add-file">
            <div className="add-file-popup" style={{display: isPopUpOpen? "block":"none" }}>
                <p>File Name</p>
                <input type={"text"} name={"name"} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown}/>
            </div>
            <button onClick={togglePopup}>
                +
            </button>
        </div>
    );
};

export default AddFileButton;