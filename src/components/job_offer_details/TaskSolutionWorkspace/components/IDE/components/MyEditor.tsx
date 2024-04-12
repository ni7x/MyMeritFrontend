import React, {useEffect, useState} from "react";
import Editor from '@monaco-editor/react';
import { DiffEditor } from '@monaco-editor/react';
import MyFile from "../../../../../../models/MyFile";
import {getLanguageFromFileName} from "../../../utils/fileUtils";

interface MyEditorProps{
    files: MyFile[],
    currentFileIndex: number,
    setFiles: (files: MyFile[]) => void;
    isEditable: boolean;
}

const MyEditor: React.FC<MyEditorProps> = ({isFeedbackView, userFiles, files, currentFileIndex, setFiles, isEditable}) => {
    const currentFile = files[currentFileIndex];
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


    if(isFeedbackView){
        const currentUserFile = userFiles[currentFileIndex];
        return(
            <DiffEditor
                theme="customTheme"

                height="100%"
                className="min-h-[40vh]"
                path={currentFile.name}
                language={getLanguageFromFileName(currentFile.name)}
                modified={atob(currentFile.contentBase64)}
                original={atob(currentUserFile.contentBase64)}
                onMount={handleEditorMount}
                options={{
                    minimap: { enabled: false },
                    overviewRulerBorder: false,
                    hideCursorInOverviewRuler: true,
                }}

            />
        )
    }
    return (
        <Editor
            theme="customTheme"
            height="100%"
            className="min-h-[40vh]"
            path={currentFile.name}
            language={getLanguageFromFileName(currentFile.name)}
            value={atob(currentFile.contentBase64)}
            onChange={handleEditorChange}
            options={{
                minimap: { enabled: false },
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
                readOnly: !isEditable
            }}
        />
    );
};

export default MyEditor;