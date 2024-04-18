import Solution from "../Solution";
import TaskStatus from "../TaskStatus";
import Feedback from "../Feedback";
import Test from "../Test";

class UserTaskDTO {
    constructor(
        public id: string,
        public title: string,
        public instructions: string,
        public opensAt: Date,
        public closesAt: Date,
        public reward: number,
        public allowedLanguages: string[],
        public memoryLimit: number,
        public timeLimit: number,
        public status: TaskStatus,
        public userSolution: Solution,
        public companyFeedback: Feedback,
        public tests: Test[]
    ) {}
}

export default UserTaskDTO;