import TaskStatus from "./TaskStatus";

class TaskPreview {
    constructor(
        public taskID: number,
        public name: string,
        public submitDate: Date,
        public status: TaskStatus,
        public credits: number,
        public isRecent: boolean,
        public isBookmarked: boolean,
        public isRated: boolean,
    ) {}
}

export default TaskPreview;