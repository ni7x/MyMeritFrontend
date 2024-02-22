class File {
    constructor(
        public name: string,
        public language: string,
        public content: string,
        public isMain: boolean,
    ) {}
}

export default File;