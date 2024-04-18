import React, {useEffect, useState} from "react";
import { DiffEditor } from '@monaco-editor/react';
import MyFile from "../../../../../models/MyFile";
import {getLanguageFromFileName} from "../../../utils/fileUtils";

interface MyEditorProps{
    files: MyFile[],
    originalFiles: MyFile[],
    currentFileIndex: number,
    setFiles: (files: MyFile[]) => void;
    isEditable: boolean;
}

const MyDiffEditor: React.FC<MyEditorProps> = ({originalFiles, files, currentFileIndex, setFiles, isEditable}) => {
    const currentFile = files[currentFileIndex];
    const currentOriginalFile = originalFiles[currentFileIndex];

    const [modifiedContent, setModifiedContent] = useState(atob(currentFile.contentBase64));

    const handleEditorChange = (value: string) => {
        const updatedFiles = [...files];
        updatedFiles[currentFileIndex].contentBase64 = btoa(value);
        setFiles(updatedFiles);
    }

    const handleEditorMount = (editor) => {
        const modifiedEditor = editor.getModifiedEditor();
        modifiedEditor.onDidChangeModelContent(() => {
            setModifiedContent(modifiedEditor.getValue())
        });
    };

    useEffect(()=>{
        handleEditorChange(modifiedContent);
    }, [modifiedContent])


    return(
        <DiffEditor
            theme="customTheme"
            height="100%"
            className="min-h-[40vh]"
            path={currentOriginalFile.name}
            language={getLanguageFromFileName(currentOriginalFile.name)}
            modified={atob(currentFile.contentBase64)}
            original={atob(currentOriginalFile.contentBase64)}
            onMount={handleEditorMount}
            options={{
                minimap: { enabled: false },
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
                readOnly: !isEditable
            }}

        />
    )
};

export default MyDiffEditor;