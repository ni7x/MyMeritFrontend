import User from "./User";
import SolutionFile from "./SolutionFile";

class Solution {
    constructor(
        public id: string,
        public user: User,
        public files: string[]
    ) {}
}

export default Solution;