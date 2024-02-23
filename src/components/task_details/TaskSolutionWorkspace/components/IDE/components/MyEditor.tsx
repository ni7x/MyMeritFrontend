import React, {useEffect} from "react";
import Editor from '@monaco-editor/react';
import File from "../../../../../../models/File";

interface MyEditorProps{
    files: File[],
    currentFileIndex: number,
    setFiles: (files: File[]) => void;
}

const MyEditor: React.FC<MyEditorProps> = ({files, currentFileIndex, setFiles}) => {
    const currentFile = files[currentFileIndex];

    function handleEditorValidation(markers) {
        markers.forEach(marker => console.log('onValidate:', marker.message));
    }

    const handleEditorChange = (value: string) => {
        const updatedFiles = [...files];
        updatedFiles[currentFileIndex].content = value;
        setFiles(updatedFiles);
    }

    return (
        <Editor
            height="50vh"
            theme="customTheme"
            path={currentFile.name}
            defaultLanguage={currentFile.language}
            value={currentFile.content}
            onChange={handleEditorChange}
            onValidate={handleEditorValidation}
            options={{
                minimap: { enabled: false },
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
            }}
        />
    );
};

export default MyEditor;