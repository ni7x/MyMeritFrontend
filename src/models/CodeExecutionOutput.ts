class CodeExecutionOutput {
    constructor(
        public stdout: string,
        public stderr: number,
        public compile_output: string | null,
        public status: Status
    ) {}
}

class Status {
    constructor(
        public id: number,
        public description: string
    ) {}
}

export default CodeExecutionOutput;