import CodeTest from "./CodeTest";
import Solution from "./Solution";

type Task = {
  id: string;
  title: string;
  instructions: string;
  opensAt: string;
  closesAt: string;
  reward: number;
  allowedLanguages: string[];
  memoryLimit: number;
  timeLimit: number;
  tests: CodeTest[];
  solutions: Solution[];
};

export default Task;
