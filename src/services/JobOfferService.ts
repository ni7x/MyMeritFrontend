import TaskPreview from "../models/TaskPreview";
import TaskStatus from "../models/TaskStatus";
import QueryParams from "../models/QueryParams";
import File from "../models/File";

const getHomeJobOffers = async (pageNum = 1, params: QueryParams) : Promise<Response> => {
    const URL = import.meta.env.VITE_API_URL+ "/jobs?"
        + (params.languages ? "languages=" + params.languages+ "&" : "")
        + (params.minCredits ? "minCredits=" + params.minCredits + "&" : "" )
        + (params.maxCredits ? "maxCredits=" + params.maxCredits + "&" : "")
        + (params.opensIn != null ? "opensIn=" + params.opensIn  + "&": "")
        + (params.sort != null ? "sort=" + params.sort  + "&": "")
        + "page=" + (pageNum - 1)
    ;

    try {
        return await fetch(URL, {
            method: 'GET',
        });
    } catch (error) {
        console.error('Error:', error);
    }
};


const getUserTasks = (userId: string): TaskPreview[] => {
    return [
        new TaskPreview("1abc", 'Task One sdfsdf sdfdssdfs dfsdsfsdfdsfds ffffffff ffffffffffffff', new Date() , TaskStatus.RATED, 10, true, false),
        new TaskPreview("2", 'Task Two', new Date(), TaskStatus.RATED, 9, false, true),
        new TaskPreview("3", 'Task Three', new Date() , TaskStatus.UNRATED, 5, false, true),
        new TaskPreview("4", 'Task Four', new Date(),TaskStatus.UNRATED, 2, true, true),
        new TaskPreview("5", 'Task Five', new Date(2024, 0, 1), TaskStatus.UNRATED, 12, false, false),
        new TaskPreview("6", 'Abc', new Date(2024, 2, 15), TaskStatus.RATED, 8, true, false),
        new TaskPreview("7", 'Task Eight', new Date(2024, 4, 5), TaskStatus.UNRATED, 6, false, false),
        new TaskPreview("8", 'Aaa', new Date(2024, 2, 15), TaskStatus.RATED, 11, false, true),
        new TaskPreview("9", 'ZZZZ', new Date(2024, 6, 10), TaskStatus.UNRATED, 3, true, true),
    ];
}

const getJobOfferById = async (jobOfferId: string, token: string): Promise<Response> => {
    const URL = import.meta.env.VITE_API_URL+ "/job/" + jobOfferId;
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

const submitSolution = async (taskId: string, files: File[], token: string) => {
    const URL = import.meta.env.VITE_API_URL + "/task/" + taskId + "/solution";
    try {
        return await fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(files)
        });
    } catch (error) {
        console.error('Error:', error);
    }
}




export  { getUserTasks, getJobOfferById, getHomeJobOffers, submitSolution }
