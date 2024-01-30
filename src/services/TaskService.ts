import TaskPreview from "../models/TaskPreview";
import TaskStatus from "../models/TaskStatus";
import Task from "../models/Task";

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
        false,
        { id: 5, name: "Sample Company", logoUrl: "/" },
        5,
        ["java", "python"]

    );
}



export  { getUserTasks, getTaskById }