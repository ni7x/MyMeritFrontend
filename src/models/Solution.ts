import User from "./User";

class Solution {
    constructor(
        public id: string,
        public user: User,
        public submitDate: Date,
        public files: string[]
    ) {}
}

export default Solution;