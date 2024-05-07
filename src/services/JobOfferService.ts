import TaskPreview from "../models/TaskPreview";
import { QueryParams } from "../models/QueryParams";
import MyFile from "../models/MyFile";
import { buildURL } from "../components/home_job_offers/URLHelper";
import {
  ContentType,
  generateEncodedZip,
} from "../components/editor_workspace/utils/fileUtils";
import { errorToast } from "../main";
import CodeExecutionOutput from "../models/CodeExecutionOutput";
import { httpCall, httpCallWithAuthorization } from "../api/HttpClient";
import JobOfferDetailsDTO from "../models/dtos/JobOfferDetailsDTO";
import { JobOffer } from "@types";

const getHomeJobOffers = async (params: QueryParams): Promise<Response> => {
  const URL = import.meta.env.VITE_API_URL + buildURL(params);
  return await httpCall<Response>({
    url: URL,
    method: "GET",
  });
};

const getUserTasks = (userId: string): TaskPreview[] => {
  return [];
};

const getJobOfferById = async (
  jobOfferId: string,
  token: string
): Promise<JobOfferDetailsDTO> => {
  const URL = import.meta.env.VITE_API_URL + "/job/" + jobOfferId;

  return await httpCallWithAuthorization<JobOfferDetailsDTO>({
    token,
    url: URL,
    method: "GET",
  });
};

export const testAll = async (
  files: MyFile[],
  testFileContent: string,
  taskId: string,
  language: string,
  mainFileIndex: number
) => {
  try {
    const filez = [...files];
    filez.splice(mainFileIndex, 1);
    const testFile = new MyFile(
      "testmain.cpp",
      ContentType.TXT,
      testFileContent
    );
    const filesToCompile = [...filez, testFile];

    let fileContentBase64;
    try {
      fileContentBase64 = await generateEncodedZip(filesToCompile, testFile);
    } catch (zipError) {
      errorToast("Main file is not compilable");
      return null;
    }

    const response = await fetch(
      "http://localhost:8080/test/task/" + taskId + "/language/" + language,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: "testmain.cpp",
          fileContentBase64: fileContentBase64,
        }),
      }
    );

    if (!response.ok) {
      console.log(response);
      errorToast("Error fetching token");
      return null;
    }

    return await response.json();
  } catch (error) {
    errorToast("Error fetching token");
    return null;
  }
};

export const testSingle = async (
  files: MyFile[],
  testFileContent: string,
  taskId: string,
  language: string,
  mainFileIndex: number,
  testIndex: number
) => {
  try {
    const filez = [...files];
    filez.splice(mainFileIndex, 1);
    const testFile = new MyFile(
      "testmain.cpp",
      ContentType.TXT,
      testFileContent
    );
    const filesToCompile = [...filez, testFile];

    let fileContentBase64;
    try {
      fileContentBase64 = await generateEncodedZip(filesToCompile, testFile);
    } catch (zipError) {
      errorToast("Main file is not compilable");
      return null;
    }

    const response = await fetch(
      "http://localhost:8080/test/task/" +
        taskId +
        "/language/" +
        language +
        "/" +
        testIndex,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: "testmain.cpp",
          fileContentBase64: fileContentBase64,
        }),
      }
    );

    if (!response.ok) {
      console.log(response);
      errorToast("Error fetching token");
      return null;
    }

    return await response.json();
  } catch (error) {
    errorToast("Error fetching token");
    return null;
  }
};

export const getToken = async (
  userInput: string,
  files: MyFile[],
  mainFileIndex: number,
  file: MyFile,
  timeLimit: number,
  memoryLimit: number
) => {
  try {
    const stdin =
      userInput && userInput.trim().length > 0 ? btoa(userInput) : null;
    let fileContentBase64;
    try {
      fileContentBase64 = await generateEncodedZip(files, files[mainFileIndex]);
      console.log(fileContentBase64);
    } catch (zipError) {
      errorToast("Main file is not compilable");
      return null;
    }

    const response = await fetch("http://localhost:8080/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
        fileContentBase64: fileContentBase64,
        stdin: stdin,
        timeLimit: timeLimit,
        memoryLimit: memoryLimit,
      }),
    });

    if (!response.ok) {
      errorToast("Error fetching token");
      return null;
    }

    return await response.text();
  } catch (error) {
    errorToast("Error fetching token");
    return null;
  }
};

export const getCompilation = async (token: string) => {
  try {
    const response = await fetch("http://localhost:8080/token/" + token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      errorToast("Compilation problem");
      return null;
    }

    return (await response.json()) as CodeExecutionOutput;
  } catch (error) {
    errorToast("Compilation problem");
    return null;
  }
};

const b64toBlob = (base64, type = "application/octet-stream") =>
  fetch(`data:${type};base64,${base64}`).then((res) => res.blob());

const submitSolution = async (
  jobId: string,
  files: MyFile[],
  token: string
) => {
  const URL = import.meta.env.VITE_API_URL + "/job/" + jobId + "/solution";
  const data = new FormData();

  for (const file of files) {
    const fileBlob = await b64toBlob(file.contentBase64, file.type);
    const fileObject = new File([fileBlob], file.name, { type: file.type });
    data.append("files", fileObject);
  }
  try {
    return await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

const downloadFilesForJob = async (jobId: string, token: string): Promise<Response> => {
    const URL = import.meta.env.VITE_API_URL+ "/job/" + jobId + "/solution";
    try {
        return await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

const downloadFiles = async (fileIds: string[], token: string): Promise<Response> => {
    const URL = import.meta.env.VITE_API_URL+ "/file/download/";
    try {
        return await fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileIDS: fileIds
            })
        });
    } catch (error) {
        console.error('Error:', error);
    }
}



const downloadSolutionFiles = async (solutionId: string, token: string): Promise<Response> => {
    const URL = import.meta.env.VITE_API_URL+ "/solution/" + solutionId;
    try {
        return await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

const downloadSolutionFiles = async (
  solutionId: string,
  token: string
): Promise<Response> => {
  const URL = import.meta.env.VITE_API_URL + "/solution/" + solutionId;
  try {
    return await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

const downloadFeedbackFiles = async (
  solutionId: string,
  token: string
): Promise<Response> => {
  const URL =
    import.meta.env.VITE_API_URL + "/solution/" + solutionId + "/feedback";
  try {
    return await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const submitJobOffer = async (data: JobOffer) => {
  const URL = import.meta.env.VITE_API_URL + "/job";
  try {
    const response = await httpCall({ url: URL, method: "POST", body: data });
    return response;
  } catch (error) {}
};

export  { getUserTasks, getJobOfferById, getHomeJobOffers, submitSolution, downloadFilesForJob, downloadSolutionFiles, submitFeedback, downloadFeedbackFiles, downloadFiles }
