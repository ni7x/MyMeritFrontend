class CodeExecutionOutput {
    constructor(
        public stdout: string,
        public status_id: number | null,
        public language_id: number,
        public stderr: number,
        public compile_output: string | null,
    ) {}
}

export default CodeExecutionOutput;