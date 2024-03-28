import Solution from "../Solution";

class UserTaskDTO {
    constructor(
        public id: string,
        public title: string,
        public instructions: string,
        public opensAt: Date,
        public closesAt: Date,
        public reward: number,
        public allowedLanguages: string[],
        public solution: Solution,
        public memoryLimit: number,
        public timeLimit: number,
    ) {}
}

export default UserTaskDTO;