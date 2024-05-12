import {Feedback} from "@types";

class SolutionPreview {
  constructor(
    public jobId: string,
    public taskName: string,
    public submitDate: Date,
    public feedback: Feedback,
    public solutionLanguage: string,
    public imageBase64: string
  ) {}
}

export default SolutionPreview;
