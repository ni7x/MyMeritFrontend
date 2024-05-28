class TestOutput {
    constructor(
        public name: string,
        public passed: boolean,
        public errorMessage?: string
    ) {}
}

export default TestOutput;
