import Company from "./Company";

class Task {
    constructor(
        public id: string,
        public title: string,
        public instructions: string,
        public opensAt: Date,
        public closesAt: Date,
        public reward: number,
        public company: Company,
        public solutionCount: number,
        public allowedLanguages: string[]
    ) {}
}

export default Task;