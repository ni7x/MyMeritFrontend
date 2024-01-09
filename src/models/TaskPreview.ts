import TaskStatus from "./TaskStatus";

class TaskPreview {
    constructor(
        public taskID: number,
        public name: string,
        public submitDate: Date,
        public status: TaskStatus,
        public credits: number
    ) {}
}

export default TaskPreview;