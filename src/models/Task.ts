import Company from "./Company";

class Task {
    constructor(
        public id: string,
        public topic: string,
        public description: string,
        public startDate: Date,
        public endDate: Date,
        public credits: number,
        public company: Company,
        public solutionCount: number,
        public allowedTechnologies: string[]
    ) {}
}

export default Task;