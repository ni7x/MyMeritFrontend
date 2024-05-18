import { Feedback } from "@types";

class SolutionPreview {
  constructor(
    public jobId: string,
    public taskName: string,
    public submitDate: Date,
    public solutionLanguage: string,
    public imageBase64: string,
    public credits: number,
    public feedback?: Feedback
  ) {}
}

export default SolutionPreview;
