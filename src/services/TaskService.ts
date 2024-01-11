import TaskPreview from "../models/TaskPreview";
import TaskStatus from "../models/TaskStatus";

const getUserTasks = (userId: number) => {
    return [
        new TaskPreview(1, 'Task One', new Date() , TaskStatus.RATED, 10, true, false),
        new TaskPreview(2, 'Task Two', new Date(), TaskStatus.RATED, 9, false, true),
        new TaskPreview(3, 'Task Three', new Date() , TaskStatus.UNRATED, 5, false, true),
        new TaskPreview(4, 'Task Four', new Date(),TaskStatus.UNRATED, 2, true, true),
        new TaskPreview(5, 'Task Five', new Date(2024, 0, 1), TaskStatus.UNRATED, 12, false, false),
        new TaskPreview(6, 'Abc', new Date(2024, 2, 15), TaskStatus.RATED, 8, true, false),
        new TaskPreview(8, 'Task Eight', new Date(2024, 4, 5), TaskStatus.UNRATED, 6, false, false),
        new TaskPreview(7, 'Aaa', new Date(2024, 2, 15), TaskStatus.RATED, 11, false, true),
        new TaskPreview(9, 'ZZZZ', new Date(2024, 6, 10), TaskStatus.UNRATED, 3, true, true),
    ];
}

export  { getUserTasks }