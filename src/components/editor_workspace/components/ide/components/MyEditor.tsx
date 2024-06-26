import React from "react";
import Editor from "@monaco-editor/react";
import MyFile from "../../../../../models/MyFile";
import { getLanguageFromFileName } from "../../../utils/fileUtils";

interface MyEditorProps {
  files: MyFile[];
  currentFileIndex: number;
  setFiles: (files: MyFile[]) => void;
  isEditable: boolean;
  isFeedbackView: boolean;
}

const MyEditor: React.FC<MyEditorProps> = ({
  files,
  currentFileIndex,
  setFiles,
  isEditable,
}) => {
  const currentFile = files[currentFileIndex];

  const handleEditorChange = (value?: string) => {
    if (value === undefined) return;
    const updatedFiles = [...files];
    updatedFiles[currentFileIndex].contentBase64 = btoa(value);
    setFiles(updatedFiles);
  };

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
        readOnly: !isEditable,
      }}
    />
  );
};

export default MyEditor;
