class Task {
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
    ) {}
}

export default Task;