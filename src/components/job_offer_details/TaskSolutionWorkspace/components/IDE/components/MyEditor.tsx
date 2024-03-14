import React from "react";
import Editor from '@monaco-editor/react';
import File from "../../../../../../models/File";
import {getLanguageFromFileName} from "../../../fileUtils";

interface MyEditorProps{
    files: File[],
    currentFileIndex: number,
    setFiles: (files: File[]) => void;
}

const MyEditor: React.FC<MyEditorProps> = ({files, currentFileIndex, setFiles}) => {
    const currentFile = files[currentFileIndex];

    const handleEditorChange = (value: string) => {
        const updatedFiles = [...files];
        updatedFiles[currentFileIndex].content = value;
        setFiles(updatedFiles);
    }

    return (
        <Editor
            height="45vh"
            theme="customTheme"
            path={currentFile.name}
            language={getLanguageFromFileName(currentFile.name)}
            value={currentFile.content}
            onChange={handleEditorChange}
            className="border-b-[1px] border-task-lighter"
            options={{
                minimap: { enabled: false },
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
            }}
        />
    );
};

export default MyEditor;