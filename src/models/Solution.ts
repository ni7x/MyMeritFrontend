import User from "./User";
import Feedback from "./Feedback";

class Solution {
    constructor(
        public id: string,
        public user: User,
        public submitDate: Date,
        public files: string[],
    ) {}
}

export default Solution;