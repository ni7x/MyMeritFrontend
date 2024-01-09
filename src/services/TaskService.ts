import TaskPreview from "../models/TaskPreview";
import TaskStatus from "../models/TaskStatus";

const getUserTasks = (userId: number) => {
    return [
        new TaskPreview(1, 'Task One', new Date() , TaskStatus.RATED, 10),
        new TaskPreview(2, 'Task Two', new Date(), TaskStatus.RATED, 9),
        new TaskPreview(3, 'Task Three', new Date() , TaskStatus.UNRATED, 5),
        new TaskPreview(4, 'Task Four', new Date(),TaskStatus.UNRATED, 2),
        new TaskPreview(5, 'Task Five', new Date(), TaskStatus.UNRATED, 12),
    ];
}

export  { getUserTasks }