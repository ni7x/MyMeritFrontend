import File from "../../../models/File";
import JSZip from "jszip";

const getFileExtension = (fileName: string): string => {
    const parts = fileName.split(".");
    return parts.length > 1 ? parts[parts.length - 1] : "plaintext";
};

const getLanguageFromFileExtension = (fileExtension: string) : string =>{
    switch (fileExtension){
        case "js":
            return "javascript";
        case "cpp":
            return "cpp";
        case "c":
            return "c";
        case "java":
            return "java";
        case "py":
            return "python";
        case "sh":
            return "bash";
        default:
            return "plaintext"
    }
}


export const getLanguageFromFileName = (fileName: string) : string => {
    return getLanguageFromFileExtension(getFileExtension(fileName));
}

export const decodeBase64 = (base64) => { //uzywanie samego atob nie konwerowalo wszystkich znakow specialnych ascii
    const text = atob(base64);
    const length = text.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = text.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
}

interface Script {
    name: string;
    content: string;
}

const generateScriptsContent = (language, mainFileName) : Script[] => {
    let compileScriptContent = "",  runScriptContent = "";
    switch (language){
        case "java":
             compileScriptContent = `#!/bin/bash\n\n/usr/local/openjdk13/bin/javac *.java\n`;
             runScriptContent = `#!/bin/bash\n\n/usr/local/openjdk13/bin/java ${mainFileName}\n`;
             break;
        case "cpp":
            compileScriptContent = `#!/bin/bash\n\n/usr/local/gcc-9.2.0/bin/g++ *.cpp -o ${mainFileName}_out\n`;
            runScriptContent = `#!/bin/bash\n\nLD_LIBRARY_PATH=/usr/local/gcc-9.2.0/lib64 ./${mainFileName}_out\n`;
            break;
        case "c":
            compileScriptContent = `#!/bin/bash\n\n/usr/local/gcc-9.2.0/bin/g++ *.c -o ${mainFileName}_out\n`;
            runScriptContent = `#!/bin/bash\n\nLD_LIBRARY_PATH=/usr/local/gcc-9.2.0/lib64 ./${mainFileName}_out\n`;
            break;
        case "python":
            runScriptContent = `#!/bin/bash\n\n/usr/local/python-3.8.1/bin/python3 ${mainFileName}`
            break;
    }
}
