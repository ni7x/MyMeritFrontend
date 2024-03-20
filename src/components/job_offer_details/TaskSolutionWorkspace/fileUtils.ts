import File from "../../../models/File";
import JSZip from "jszip";
import languagesData from "./extension-scripts-map.json";
import extensionToLanguage from "./language-extension-map.json";

const getFileExtension = (fileName: string): string => {
    const parts = fileName.split(".");
    return parts.length > 1 ? parts[parts.length - 1] : "plaintext";
};

const getFileNameWithoutExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf(".");
    return lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
};

const getLanguageFromFileExtension = (fileExtension: string) : string =>{
    const language = extensionToLanguage[fileExtension];
    return language ? language.toLowerCase() : "plaintext";
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

const generateScriptsContent = (languages, mainFileName) : Script[] => {
    const fileExtension = getFileExtension(mainFileName)
    console.log(fileExtension)
    const language = languagesData[fileExtension];

    if (!language) {
        console.error(`Language not found for file extension: ${fileExtension}`);
    }

    const { compile, run, source_file } = language;

    if (!compile && !run) {
        console.error(`Compile and run command not defined for language: ${source_file}`);
        return [];
    }

    const compileScriptContent = compile?.replace(source_file, " *." + fileExtension).replace(" %s ", "") ;
    const runScriptContent = run?.replace(getFileNameWithoutExtension(source_file), getFileNameWithoutExtension(mainFileName));
    console.log(compileScriptContent)
    console.log(runScriptContent)

    return [
        { name: "compile", content: compileScriptContent },
        { name: "run", content: runScriptContent }
    ];
}

const generateScriptsContent2 = (language, mainFileName) : Script[] => {
    let compileScriptContent,  runScriptContent;
    switch (language){
        case "java":
            compileScriptContent = `#!/bin/bash\n\n/usr/local/openjdk13/bin/javac *.java\n`;
            runScriptContent = `#!/bin/bash\n\n/usr/local/openjdk13/bin/java ${mainFileName}\n`;
            break;
        case "cpp":
            compileScriptContent = `#!/bin/bash\n\n/usr/local/gcc-9.2.0/bin/g++ *.cpp -o ${mainFileName}_out\n`;
            runScriptContent = `#!/bin/bash\n\nLD_LIBRARY_PATH=/usr/local/gcc-9.2.0/lib64 ./${mainFileName}_out\n`;
            break;
        default:
            compileScriptContent = "";
            runScriptContent = "";
            break;
    }
    return [
        { name: "compile", content: compileScriptContent },
        { name: "run", content: runScriptContent }
    ];
}

export const generateEncodedZip = (files: File[]): Promise<string> => {
    return new Promise((resolve, reject) => {
        const mainFileName = files.find((file) => file.isMain).name;
        if(!mainFileName){
            reject(new Error("No main file"));
        }
        const language = getLanguageFromFileName(mainFileName);

        const zip = new JSZip();

        files.forEach(file => {
            zip.file(file.name, file.content);
        });

        generateScriptsContent(language, mainFileName).forEach((script) => {
            zip.file(script.name, script.content);
        });

        zip.generateAsync({ type: "blob" }).then(content => {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    resolve(reader.result.split(',')[1]);
                } else {
                    reject(new Error("Encoding problem"));
                }
            };
            reader.onerror = (error) => {
                reject("Reader problem ", error);
            };
            reader.readAsDataURL(content);
        }).catch(error => {
            reject(error);
        });
    });
};


