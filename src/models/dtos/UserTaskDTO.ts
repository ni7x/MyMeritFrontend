import Solution from "../Solution";
import Feedback from "../Feedback";
import Test from "../Test";
import { templateFile } from "../../types/";

class UserTaskDTO {
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
    public status: "OPEN" | "NOT_YET_OPEN" | "EXPIRED",
    public userSolution: Solution,
    public tests: Test[],
    public jobId: string,
    public companyFeedback?: Feedback,
    // public templateFiles?: Map<string, Array<{ name: string, contentBase64: string }>>
    public templateFiles?: templateFile[]
  ) {}
}

export default UserTaskDTO;
