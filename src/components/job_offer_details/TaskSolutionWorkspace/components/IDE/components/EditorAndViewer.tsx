import React from "react";
import MyFile from "../../../../../../models/MyFile";
import {ContentType} from "../../../utils/fileUtils";
import MyDocViewer from "./MyDocViewer";
import MyEditor from "./MyEditor";

interface MyEditorProps{
    files: MyFile[],
    currentFileIndex: number,
    setFiles: (files: MyFile[]) => void;
    isEditable: boolean;
}

const EditorAndViewer: React.FC<MyEditorProps> = ({isFeedbackView, userFiles, files, currentFileIndex, setFiles, isEditable}) => {
    const currentFile = files[currentFileIndex];

    if(currentFile.type === ContentType.TXT){
        return (
            <MyEditor
                currentFileIndex={currentFileIndex}
                userFiles={userFiles}
                setFiles={setFiles}
                isEditable={isEditable}
                files={files}
                isFeedbackView={isFeedbackView}
            />
        )
    }else{
        return (
            <MyDocViewer currentFile={currentFile}/>
        )
    }

};

export default EditorAndViewer;