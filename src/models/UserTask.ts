import Company from "./Company";
import Solution from "./Solution";

class UserTask {
    constructor(
        public id: string,
        public topic: string,
        public description: string,
        public releaseDate: Date,
        public expiryDate: Date,
        public rewards: number,
        public solution: Solution,
        public company: Company,
        public solutionCount: number,
        public allowedTechnologies: string[]
    ) {}
}

export default UserTask;