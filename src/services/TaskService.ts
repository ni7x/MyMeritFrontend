import TaskPreview from "../models/TaskPreview";
import TaskStatus from "../models/TaskStatus";
import Task from "../models/Task";
import Company from "../models/Company";
import QueryParams from "../models/QueryParams";

const getHomeTasks = (pageNum: number = 0, params: QueryParams): any => {
    const tasks =  [
        new Task("1abc", "Zaimplementuj operacje na macierzach w c++ (matrix.ccp) 1abc", "Description of Task One", new Date(), new Date(), 10, new Company(1, "Company 1", "logo1.png"), 5, ["Java", "Cpp"]),
        new Task("2", "Task Two", "Description of Task Two", new Date(), new Date(), 6, new Company(2, "Company 2", "logo2.png"), 8, ["Cpp", "C"]),
        new Task("3", "Task Three", "Description of Task Three", new Date(), new Date(), 8, new Company(1, "Company 1", "logo1.png"), 5, ["Java", "C"]),
        new Task("4", "Task Four", "Description of Task Four", new Date(), new Date(), 10, new Company(1, "Company 1", "logo1.png"), 5, ["Java", "Cpp"]),
        new Task("5", "Task Five", "Description of Task Five", new Date(), new Date(), 12, new Company(2, "Company 2", "logo2.png"), 8, ["Java", "C"]),
        new Task("6", "Task Six", "Description of Task Six", new Date(), new Date(), 20, new Company(1, "Company 1", "logo1.png"), 5, ["Cpp", "C"]),
    ];


    const { languages, minCredits, maxCredits } = params;

    let filteredTasks = tasks;

    if (languages && languages.length > 0) {
        const languageArray = languages.split(",").map(lang => lang.trim());
        filteredTasks = filteredTasks.filter(task => task.allowedTechnologies.some(tech => languageArray.includes(tech)));
    }

    if (minCredits) {
        filteredTasks = filteredTasks.filter(task => task.credits >= minCredits);
    }
    if (maxCredits) {
        filteredTasks = filteredTasks.filter(task => task.credits <= maxCredits);
    }

    const pageSize = 3;
    const totalPages = Math.ceil(filteredTasks.length / pageSize);
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const tasksForPage = filteredTasks.slice(startIndex, endIndex);

    return { //xd idk tak bylo w dokumentacji sping ze to wyglada
        "_links": {
            "self": {
                "href": `http://localhost:8080/tasks?page=${pageNum}&size=${pageSize}`,
                "templated": true
            },
            "next": {
                "href": `http://localhost:8080/tasks?page=${pageNum + 1}&size=${pageSize}`,
                "templated": true
            }
        },
        "_embedded": {
            "tasks": tasksForPage
        },
        "page": {
            "size": pageSize,
            "totalElements": filteredTasks.length,
            "totalPages": totalPages,
            "number": pageNum - 1
        }
    };
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

function getTaskById(taskId: string): Task {
    return new Task(
        taskId,
        "Zaimplementuj operacje na macierzach \n" +
        "w c++ (matrix.ccp) " + taskId,
        "Twoim zadaniem jest stworzenie programu w języku C++, który będzie zawierał zestaw operacji na macierzach. Program powinien umożliwiać użytkownikowi wykonywanie podstawowych operacji na macierzach, takich jak dodawanie, odejmowanie, mnożenie, transpozycja itp.",
        new Date(),
        new Date((new Date()).getTime() + 86400000),
        5,
        { id: 5, name: "Sample Company", logoUrl: "/" },
        5,
        ["java", "python"]

    );
}



export  { getUserTasks, getTaskById, getHomeTasks }