import Company from "./Company";
import User from "./User";
import SolutionFile from "./SolutionFile";

class Solution {
    constructor(
        public id: string,
        public user: User,
        public files: SolutionFile[]
    ) {}
}

export default Solution;