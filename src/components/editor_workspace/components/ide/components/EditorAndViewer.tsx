import React from "react";
import MyFile from "../../../../../models/MyFile";
import {ContentType} from "../../../utils/fileUtils";
import MyDocViewer from "./MyDocViewer";
import MyEditor from "./MyEditor";
import MyDiffEditor from "./MyDiffEditor";

interface MyEditorProps{
    files: MyFile[],
    currentFileIndex: number,
    setFiles: (files: MyFile[]) => void;
    isEditable: boolean;
}

const EditorAndViewer: React.FC<MyEditorProps> = ({isFeedbackView, originalFiles, files, currentFileIndex, setFiles, isEditable}) => {
    const currentFile = files[currentFileIndex];

    if(currentFile.type === ContentType.TXT){
        if(isFeedbackView){
            return (
                <MyDiffEditor
                    originalFiles={originalFiles}
                    files={files}
                    currentFileIndex={currentFileIndex}
                    setFiles={setFiles}
                    isEditable={isEditable}
                />
            )
        }
        return (
            <MyEditor
                currentFileIndex={currentFileIndex}
                setFiles={setFiles}
                isEditable={isEditable}
                files={files}
                isFeedbackView={isFeedbackView}
            />
        )
    }else{
        return (
            <MyDocViewer
                currentFile={currentFile}
            />
        )
    }

};

export default EditorAndViewer;