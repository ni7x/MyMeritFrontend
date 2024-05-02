import Feedback from "./Feedback";
import Task from "./Task";
import User from "./User";

type Solution = {
  id: string;
  task: Task;
  submitDate: Date;
  user: User;
  files: string[];
  feedback: Feedback;
};

export default Solution;
