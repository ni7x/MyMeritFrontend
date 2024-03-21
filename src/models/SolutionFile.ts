
class SolutionFile {
    constructor(
        public id: string,
        public name: string,
        public content: string,
        public isMain: boolean,
    ) {}
}

export default SolutionFile;