class CodeExecutionOutput {
  constructor(
    public stdout: string,
    public stderr: string,
    public compile_output: string | null,
    public status: Status,
    public exit_code: number,
    public time: number
  ) {}
}

class Status {
  constructor(public id: number, public description: string) {}
}

export default CodeExecutionOutput;
