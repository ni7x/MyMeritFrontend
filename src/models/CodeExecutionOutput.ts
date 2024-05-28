class CodeExecutionOutput {
  constructor(
    public stdout: string,
    public stderr: string,
    public compile_output: string | null,
    public status: Status,
    public exit_code: number | null,
    public time: number | null
  ) {}
}

class Status {
  constructor(public id: number, public description: string) {}
}

export default CodeExecutionOutput;
