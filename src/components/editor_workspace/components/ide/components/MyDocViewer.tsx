import React from "react";
import MyFile from "../../../../../models/MyFile";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

interface MyDocViewerProps{
    currentFile: MyFile
}

const MyDocViewer: React.FC<MyDocViewerProps> = ({currentFile}) => {
    return (
        <DocViewer
            documents={[{
                uri: ("data:" + currentFile.type + ";base64," + currentFile.contentBase64),
                fileName: currentFile.name,
            }]}
            config={{
                header: {
                    disableHeader: true,
                },
            }}
            theme= {{
                primary: "#8c8f9f",
                secondary: "#9f5afd",
                tertiary: "#3a3b46",
                textPrimary: "#ffffff",
                textSecondary: "#6ee7b7",
                textTertiary: "#fff",
                disableThemeScrollbar: false,
            }}
            style={{ }}
            pluginRenderers={DocViewerRenderers}
        />
    )
};

export default MyDocViewer;